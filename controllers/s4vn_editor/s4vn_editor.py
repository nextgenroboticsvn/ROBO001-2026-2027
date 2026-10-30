"""S4VN world editor (prototype): adds catalog items to the running simulation on request.

The web page (or a robot window) sends, through the Webots stream:
    robot:{"name":"s4vn_editor","message":"<CMD>:<json>"}
  SPAWN:{"item","x","y","yaw"?}  add an object/robot at a floor point (yaw in degrees)
  ATTACH:{"item","x","y"}        mount a sensor on the robot nearest to the floor point, on that side;
                                 motion items: wheels (2 motors + 2 casters), servo arm, turret, physics body;
                                 Robot tự lắp (kit_*): lift, claw, wheel sets, tracks (attach_kit)
  PHYSICS:{"node","mass"|"remove"}  give a robot/object a Physics node (auto bounding box) or change its mass
  MOVE:{"node","x","y","end"?}   drag a movable node (node = Webots id, same as the viewer's "n<id>")
  ROTATE:{"id"|"node","deg"}     turn an added object/robot, or any movable node
  REMOVE:{"id"}                  delete an added node (sensor: its robot controller restarts)
  WATCH:{"node"} / UNWATCH       stream physics data (PHYS:{...}) of one node ~15 times per second
  FORCE:{"node","point","vec","torque"?}  Alt+drag: apply a force at a world point (torque: about the
                                 centre of mass), same law as Webots desktop: |F| = dragForceScale*mass*|d|^3
  FORCE_END                      stop the force (also stops by itself 1 s after the last FORCE)
  RESTART:{"robot"}              restart a robot controller (runs the code just edited in the IDE, keeps the scene)
  Robot tự lắp (node = its Webots id): COLOR:{"node","part","color"} (chassis / frame / claw), RENAME:{"node","name"},
  SPEED:{"node","speed"} (% of the wheels' max velocity), LOGO:{"node","data","place"} (base64 PNG / JPEG, top / front)
                                 or {"node","remove"}; SENSOR:{"id","params"}: new parameters of a sensor (catalog "params")
  EXPORT                         the scene (added nodes as VRML, poses and mass edits of the world's own robots and
                                 objects) and the controller code, for a saved project: OK {action: "export", ...}
  FILE:{"path","content"}        write a controller file (path under controllers/, e.g. "clawbot_controller/x.py")
  SCENE:{"nodes","poses","edits"}  replace what was added by a saved scene, then restart the robot controllers
  LIST                           send the current state
  PING                           keepalive, ignored
Replies (wwiSendText, ASCII JSON): OK:{...}  ERR:{...}  LIST:{...}

Only items listed in catalog.json can be added; the robot running this controller must have
`supervisor TRUE` and `window "<none>"` (the default <generic> robot window swallows the messages).
"""
import base64
import ctypes
import json
import math
import os
import re
from string import Template

from controller import Field, Supervisor
from controller.wb import wb   # Node.addTorque/addForceWithOffset call the wrong C function (R2023b..R2025a)

HERE = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(HERE, 'catalog.json'), encoding='utf-8') as f:
    CATALOG = {item['id']: item for item in json.load(f)['items']}

MAX_ITEMS = 40
LIMIT = 50.0                                   # m, clamp for requested coordinates
ATTACH_RANGE = 1.0                             # m, max distance between the drop point and the robot
SLOT_FIELDS = ('children', 'extensionSlot', 'bodySlot', 'turretSlot')
SIDES = ('front', 'left', 'back', 'right')
SIDE_YAW = {'front': 0.0, 'left': math.pi / 2, 'back': math.pi, 'right': -math.pi / 2}
DEFAULT_DENSITY = 500.0                        # kg/m3, mass estimate of a robot body that has none

sv = Supervisor()
ts = int(sv.getBasicTimeStep())
self_node = sv.getSelf()
root = sv.getRoot().getField('children')
added = {}                                     # id -> {node, item, label, kind, name, yaw, robot, slot}
seq = 0


def finite(value):
    """NaN/inf (exploded physics) would make the JSON unreadable in the browser: send null instead."""
    if isinstance(value, float):
        return value if math.isfinite(value) else None
    if isinstance(value, dict):
        return {k: finite(v) for k, v in value.items()}
    if isinstance(value, (list, tuple)):
        return [finite(v) for v in value]
    return value


def reply(kind, **data):
    # ensure_ascii: the Python binding sends len(text) bytes, so non-ASCII text would be truncated
    sv.wwiSendText(kind + ':' + json.dumps(finite(data), ensure_ascii=True, allow_nan=False))


def say(text):
    print('[s4vn_editor] ' + text, flush=True)


def num(value, default=0.0):
    try:
        value = float(value)
    except (TypeError, ValueError):
        return default
    return value if math.isfinite(value) else default


def clamp(value, limit=LIMIT):
    return max(-limit, min(limit, value))


def fmt(value):
    return f'{value:.4f}'


def arena_bounds(margin=0.08):
    """[xmin, xmax, ymin, ymax] of the first arena with a floorSize field (RectangleArena...), else None."""
    for i in range(root.getCount()):
        node = root.getMFNode(i)
        field = node.getField('floorSize') if node else None
        if field is not None and field.getType() == Field.SF_VEC2F:
            sx, sy = field.getSFVec2f()
            cx, cy, _ = node.getPosition()
            return [cx - sx / 2 + margin, cx + sx / 2 - margin, cy - sy / 2 + margin, cy + sy / 2 - margin]
    return None


def floor_height():
    for i in range(root.getCount()):
        node = root.getMFNode(i)
        if node and node.getField('floorSize') is not None:
            return node.getPosition()[2]
    return 0.0


BOUNDS = arena_bounds()
FLOOR_Z = floor_height()


def clamp_xy(x, y):
    """Keep added/dragged objects on the arena floor (nothing holds them outside the walls)."""
    x, y = clamp(x), clamp(y)
    if BOUNDS:
        x = min(max(x, BOUNDS[0]), BOUNDS[1])
        y = min(max(y, BOUNDS[2]), BOUNDS[3])
    return x, y


def robot_name(node):
    field = node.getField('name')
    return field.getSFString() if field else node.getTypeName()


def slot_of(node):
    """MF_NODE field a sensor can be imported into (plain Robot: children; PROTO robots: an exposed slot)."""
    for name in SLOT_FIELDS:
        field = node.getField(name)
        if field is not None and field.getType() == Field.MF_NODE:
            return name, field
    return None, None


def attachable_robots():
    robots = []
    for i in range(root.getCount()):
        node = root.getMFNode(i)
        if node is None or node.getBaseTypeName() != 'Robot' or node.getId() == self_node.getId():
            continue
        slot, _ = slot_of(node)
        if slot:
            robots.append(node)
    return robots


def heading(node):
    r = node.getOrientation()                  # row-major 3x3
    return math.atan2(r[3], r[0])


def base_field(node, name):
    """Field of the node a PROTO expands to: getProtoField up to R2023b, getBaseNodeField from R2024a."""
    get = getattr(node, 'getBaseNodeField', None) or getattr(node, 'getProtoField', None)
    try:
        return get(name) if get else None
    except Exception:
        return None


def has_physics(node):
    field = node.getField('physics')
    if field is None and node.isProto():
        field = base_field(node, 'physics')      # PROTO objects (WoodenBox...) keep physics internal
    return field is not None and field.getSFNode() is not None


def physics_node(node):
    field = node.getField('physics')
    if field is None and node.isProto():
        field = base_field(node, 'physics')
    return field.getSFNode() if field is not None else None


def mass_of(node):
    """Mass in kg from the Physics node, None when only a density is given (or no physics)."""
    ph = physics_node(node)
    if ph is None:
        return None
    field = ph.getField('mass')
    if field is None:
        field = base_field(ph, 'mass')
    m = field.getSFFloat() if field is not None else -1
    return m if m > 0 else None


def world_info_value(name, default):
    for i in range(root.getCount()):
        node = root.getMFNode(i)
        if node and node.getTypeName() == 'WorldInfo':
            field = node.getField(name)
            return field.getSFFloat() if field is not None else default
    return default


GRAVITY = world_info_value('gravity', 9.81)
DRAG_FORCE_SCALE = world_info_value('dragForceScale', 30.0)
DRAG_TORQUE_SCALE = world_info_value('dragTorqueScale', 5.0)
TELEMETRY_STEPS = max(1, round(64 / ts))            # ~15 Hz
FORCE_TIMEOUT = 1.0                                 # s without FORCE update -> stop (page resends every 150 ms)
# Safety limits for students (Webots desktop has none). Measured without them: a 50 g ball reached
# 124 m/s and 10000 rad/s; at 3 m/s it went through the 1 cm arena wall and rolled away on the infinite floor.
MAX_ACCEL_G = 2.0          # |F| <= 2 m g
MAX_PUSH_SPEED = 1.5       # m/s: stop pushing along F beyond this speed (no tunnelling through thin walls)
MAX_SPIN = 20.0            # rad/s: angular speed clamped to this while a force/torque is applied
MIN_LEVER = 0.06           # m: closer to the centre of mass than this, push at the centre (no extra spin)
MAX_TWIST_SPEED = 15.0     # rad/s: angular speed clamped to this while a torque is applied


def to_local(node, point):
    p, r = node.getPosition(), node.getOrientation()
    d = [point[i] - p[i] for i in range(3)]
    return [r[0] * d[0] + r[3] * d[1] + r[6] * d[2], r[1] * d[0] + r[4] * d[1] + r[7] * d[2],
            r[2] * d[0] + r[5] * d[1] + r[8] * d[2]]


def to_world(node, local):
    p, r = node.getPosition(), node.getOrientation()
    return [p[i] + r[3 * i] * local[0] + r[3 * i + 1] * local[1] + r[3 * i + 2] * local[2] for i in range(3)]


def movable(node):
    """Root-level robots, physical objects and added items can be dragged; floors, arenas, walls cannot."""
    if node is None or node.getId() == self_node.getId():
        return False
    parent = node.getParentNode()
    if parent is None or parent.getId() != sv.getRoot().getId():
        return False
    base = node.getBaseTypeName()
    if base == 'Robot' or node.getDef().startswith('S4VN_ADD_'):
        return True
    return base == 'Solid' and has_physics(node)


def movable_nodes():
    nodes = []
    for i in range(root.getCount()):
        node = root.getMFNode(i)
        if movable(node):
            nodes.append(node)
    return nodes


def rebuild_registry():
    """After a reset/restart, re-adopt nodes added earlier (DEF S4VN_ADD_n / S4VN_SENSOR_n)."""
    global seq
    for i in range(root.getCount()):
        node = root.getMFNode(i)
        d = node.getDef() if node else ''
        if d.startswith('S4VN_ADD_'):
            name = robot_name(node)
            item = CATALOG.get('kit_base') if is_kit(node) else                 next((it for it in CATALOG.values() if name.startswith(it['id'] + '_')), None)   # renamed kit too
            added[d] = dict(node=node, item=item['id'] if item else '?', label=item['label'] if item else name,
                            kind=item['category'] if item else 'object', name=name, yaw=heading(node), robot=None, slot=None)
            seq = max(seq, int(d.rsplit('_', 1)[1]))
    for robot in attachable_robots():
        slot, field = slot_of(robot)
        nodes = [field.getMFNode(j) for j in range(field.getCount())]
        if is_kit(robot):                      # Robot tự lắp: its claw is on the lift's link
            for node in list(nodes):
                item = kit_item_of(node) if node is not None and node.getDef().startswith('S4VN_MOTION_') else None
                if item and item['kind'] == 'kit_tower':
                    nodes += sub_nodes(node.getField('endPoint').getSFNode().getField('children'))
        for node in nodes:
            d = node.getDef() if node else ''
            if d.startswith('S4VN_SENSOR_'):
                name = robot_name(node)
                item = next((it for it in CATALOG.values() if it['category'] == 'sensor'
                             and name.startswith(it['device'] + '_')), None)
                added[d] = dict(node=node, item=item['id'] if item else '?', label=item['label'] if item else name,
                                kind='sensor', name=name, yaw=0.0, robot=robot, slot=slot,
                                params=read_params(item, node) if item else {})
                seq = max(seq, int(d.rsplit('_', 1)[1]))
            elif d.startswith('S4VN_MOTION_'):
                parts = d[len('S4VN_MOTION_'):].split('_')        # "<seq>" (first joint) or "<seq>_<k>" (others)
                oid = 'S4VN_MOTION_' + parts[0]
                entry = added.setdefault(oid, dict(node=None, extra=[], item='?', label='?', kind='motion', name='',
                                                   yaw=0.0, robot=robot, slot=slot, devices=[]))
                if len(parts) == 1:
                    entry['node'] = node
                else:
                    entry['extra'].append(node)
                seq = max(seq, int(parts[0]))
    for oid, a in list(added.items()):
        if a['kind'] != 'motion':
            continue
        if a['node'] is None:
            del added[oid]
            continue
        a['devices'] = [n for joint in [a['node']] + a['extra'] for n in joint_devices(joint)]
        kit = kit_item_of(a['node'])
        if kit:                                # Robot tự lắp parts: named after their item
            a.update(item=kit['id'], label=kit['label'], name=', '.join(a['devices']) or kit['label'])
            continue
        first = a['devices'][0] if a['devices'] else ''
        item = next((it for it in CATALOG.values() if it['category'] == 'motion' and it.get('kind') != 'physics'
                     and first.startswith(it.get('device', 'motor_'))), None)
        a.update(item=item['id'] if item else '?', label=item['label'] if item else first, name=', '.join(a['devices']))


def state():
    items = []
    for oid, a in added.items():
        p = (a['robot'] if a['kind'] == 'motion' else a['node']).getPosition()   # a joint has no position
        items.append(dict(id=oid, item=a['item'], label=a['label'], kind=a['kind'], name=a['name'],
                          x=round(p[0], 3), y=round(p[1], 3),
                          robot=robot_name(a['robot']) if a['robot'] else None,
                          **({'params': a['params']} if a.get('params') else {})))
    robots = []
    for node in attachable_robots():
        p = node.getPosition()
        robots.append(dict(name=robot_name(node), x=round(p[0], 3), y=round(p[1], 3), yaw=round(heading(node), 3),
                           slot=slot_of(node)[0], controller=sf_string(node, 'controller'),
                           window=sf_string(node, 'window'), motion=accepts_motion(node), kit=is_kit(node),
                           node=node.getId(), **({'custom': kit_custom(node)} if is_kit(node) else {})))
    labels = {a['node'].getId(): a['label'] for a in added.values()}
    movables = []
    for node in movable_nodes():
        p = node.getPosition()
        movables.append(dict(node=node.getId(), name=robot_name(node), label=labels.get(node.getId(), robot_name(node)),
                             robot=node.getBaseTypeName() == 'Robot', dynamic=physics_node(node) is not None,
                             x=round(p[0], 3), y=round(p[1], 3), z=round(p[2], 3)))
    return dict(items=items, robots=robots, movable=movables, bounds=BOUNDS, max=MAX_ITEMS)


def sf_string(node, name):
    field = node.getField(name)
    return field.getSFString() if field is not None and field.getType() == Field.SF_STRING else None


def send_list():
    reply('LIST', **state())


def spawn(d):
    global seq
    item = CATALOG.get(d.get('item'))
    if not item or item['category'] in ('sensor', 'motion'):
        return reply('ERR', error='unknown_item', item=d.get('item'))
    if len(added) >= MAX_ITEMS:
        return reply('ERR', error='too_many', max=MAX_ITEMS)
    x, y = clamp_xy(num(d.get('x')), num(d.get('y')))
    yaw = math.radians(num(d.get('yaw')))
    seq += 1
    oid, name = f'S4VN_ADD_{seq}', f"{item['id']}_{seq}"
    extra = {}
    if item.get('kit') == 'base':              # Robot tự lắp: the chassis on its 4 ClawBot wheels
        extra = dict(wheels=' '.join(default_wheel_strings()), window=KIT_WINDOW)
        ensure_kit_contacts()
    node_str = f'DEF {oid} ' + Template(item['node']).substitute(
        x=fmt(x), y=fmt(y), z=fmt(num(item.get('z'))), yaw=fmt(yaw), name=name, **extra)
    before = root.getCount()
    root.importMFNodeFromString(-1, node_str)
    node = sv.getFromDef(oid)
    if root.getCount() != before + 1 or node is None:
        return reply('ERR', error='import_failed', item=item['id'],
                     hint='PROTO not declared IMPORTABLE EXTERNPROTO' if item.get('proto') else None)
    added[oid] = dict(node=node, item=item['id'], label=item['label'], kind=item['category'], name=name, yaw=yaw,
                      robot=None, slot=None)
    say(f"them {item['id']} '{name}' tai x={x:.2f} y={y:.2f}")
    reply('OK', action='spawn', id=oid, item=item['id'], name=name, x=round(x, 3), y=round(y, 3))
    send_list()


def nearest_robot(x, y, kit=False):
    """Robot closest to a floor point (kit: a Robot tự lắp), or None after replying the error."""
    robots = [r for r in attachable_robots() if is_kit(r)] if kit else attachable_robots()
    if not robots:
        return reply('ERR', error='not_kit' if kit else 'no_robot')
    robot = min(robots, key=lambda n: math.hypot(n.getPosition()[0] - x, n.getPosition()[1] - y))
    p = robot.getPosition()
    if math.hypot(p[0] - x, p[1] - y) > ATTACH_RANGE:
        return reply('ERR', error='too_far', robot=robot_name(robot), range=ATTACH_RANGE)
    return robot


def named_robot(node_id, kit=False):
    """The robot the page names (its + button: the pose the page has may be old), if it can take the item."""
    for robot in attachable_robots():
        if robot.getId() == node_id and (is_kit(robot) or not kit):
            return robot
    return None


def drop_side(robot, x, y):
    """(yaw, distance, side) of a floor point in the robot frame (R^T * (point - position))."""
    p, r = robot.getPosition(), robot.getOrientation()
    dx, dy, dz = x - p[0], y - p[1], -p[2]
    lx = r[0] * dx + r[3] * dy + r[6] * dz
    ly = r[1] * dx + r[4] * dy + r[7] * dz
    yaw = math.atan2(ly, lx)
    return yaw, math.hypot(lx, ly), SIDES[int(((yaw + math.pi / 4) % (2 * math.pi)) // (math.pi / 2))]


def attach(d):
    global seq
    item = CATALOG.get(d.get('item'))
    if not item or item['category'] not in ('sensor', 'motion'):
        return reply('ERR', error='unknown_item', item=d.get('item'))
    if len(added) >= MAX_ITEMS and item.get('kind') != 'physics':
        return reply('ERR', error='too_many', max=MAX_ITEMS)
    x, y = clamp(num(d.get('x'))), clamp(num(d.get('y')))
    kit = str(item.get('kind', '')).startswith('kit_')                               # kit parts: on a Robot tự lắp
    robot = (named_robot(d.get('robot'), kit) if d.get('center') else None) or nearest_robot(x, y, kit=kit)
    if robot is None:
        return
    if item['category'] == 'motion':
        return attach_motion(item, robot, x, y)
    slot, field = slot_of(robot)
    if slot == 'children':                     # plain Robot: on its body, see mount_point
        pos, rot, side = mount_point(robot, item, x, y, bool(d.get('center')))
        yaw = 0.0
    else:                                      # PROTO robot: in its extension slot, 5-30 cm out, on top of it
        yaw, dist, side = drop_side(robot, x, y)
        dist = max(0.05, min(0.3, dist))
        pos, rot = [dist * math.cos(yaw), dist * math.sin(yaw), 0.02], [0.0, 0.0, 1.0, yaw]
    used = {a['name'] for a in added.values() if a['robot'] is not None and a['robot'].getId() == robot.getId()}
    dev = f"{item['device']}_{side}"
    k = 2
    while dev in used:
        dev, k = f"{item['device']}_{side}_{k}", k + 1
    seq += 1
    oid = f'S4VN_SENSOR_{seq}'
    params = param_values(item)
    node_str = f'DEF {oid} ' + sensor_string(item, pos, rot, dev, params)
    before = field.getCount()
    field.importMFNodeFromString(-1, node_str)
    if field.getCount() != before + 1:
        return reply('ERR', error='import_failed', item=item['id'],
                     hint='PROTO not declared IMPORTABLE EXTERNPROTO' if item.get('proto') else None)
    node = field.getMFNode(-1)
    added[oid] = dict(node=node, item=item['id'], label=item['label'], kind='sensor', name=dev, yaw=yaw,
                      robot=robot, slot=slot, params=params)
    robot.restartController()                  # the robot program only sees new devices after a restart
    say(f"gan {item['id']} '{dev}' vao robot '{robot_name(robot)}' ({side}), controller khoi dong lai")
    reply('OK', action='attach', id=oid, item=item['id'], device=dev, robot=robot_name(robot), side=side)
    send_list()


def sensor_string(item, pos, rot, name, params):
    return Template(item['node']).substitute(x=fmt(pos[0]), y=fmt(pos[1]), z=fmt(pos[2]), yaw=fmt(rot[3]),
                                             rot=' '.join(fmt(v) for v in rot), name=name,
                                             **template_params(item, params))


def node_from_request(d):
    """Movable node addressed by 'id' (added item) or 'node' (Webots id from the viewer pick)."""
    a = added.get(d.get('id'))
    if a and a['kind'] != 'sensor':
        return a['node']
    try:
        node = sv.getFromId(int(d.get('node')))
    except (TypeError, ValueError):
        return None
    return node if movable(node) else None


def move(d):
    node = node_from_request(d)
    if node is None:
        return reply('ERR', error='not_movable', node=d.get('node'))
    field = node.getField('translation')
    z = field.getSFVec3f()[2]                  # keep the height: dragging slides on the floor
    x, y = clamp_xy(num(d.get('x')), num(d.get('y')))
    field.setSFVec3f([x, y, z])
    node.resetPhysics()                        # no velocity left from the drag
    if d.get('end'):
        say(f"doi '{robot_name(node)}' toi x={x:.2f} y={y:.2f}")
        send_list()


def rotate(d):
    node = node_from_request(d)
    if node is None:
        return reply('ERR', error='unknown_id', id=d.get('id') or d.get('node'))
    # about the world's vertical axis, keeping the node's own tilt: ClawBot V2 is a Y-up model turned 90 deg about x,
    # and setting "rotation 0 0 1 yaw" laid it on its side
    turn = axis_angle_matrix([0.0, 0.0, 1.0, math.radians(num(d.get('deg'), 90))])
    current = axis_angle_matrix(node.getField('rotation').getSFRotation())
    node.getField('rotation').setSFRotation(matrix_axis_angle(mat_mul(turn, current)))
    node.resetPhysics()
    a = added.get(d.get('id'))
    if a:
        a['yaw'] = heading(node)
    reply('OK', action='rotate', id=d.get('id') or d.get('node'))


def remove(d):
    oid = d.get('id')
    a = added.pop(oid, None)
    if not a:
        return reply('ERR', error='unknown_id', id=oid)
    robot = a['robot']
    kind = CATALOG.get(a['item'], {}).get('kind')
    if kind == 'kit_tower':                    # the claw sits on the lift's link: it goes with it
        for claw, _ in kit_entries(robot, ('kit_claw',)):
            added.pop(claw)
    if robot is None:                          # a robot: the parts mounted on it go with it
        for part in [k for k, b in added.items() if b['robot'] is not None and b['robot'].getId() == a['node'].getId()]:
            forget_watch(added.pop(part)['node'])
    speed = kit_speed(robot) if kind in KIT_WHEEL_KINDS and is_kit(robot) else 100
    forget_watch(a['node'])
    for extra in a.get('extra', []):
        extra.remove()
    a['node'].remove()
    if kind in KIT_WHEEL_KINDS and is_kit(robot):
        restore_wheels(robot, speed)           # Robot tự lắp keeps rolling on the ClawBot wheels
    if watch['node'] is not None and robot is not None and watch['node'].getId() == robot.getId():
        watch['joints'] = None                 # rebuilt on the next telemetry
    if robot is not None:
        robot.restartController()
    say(f"xoa '{a['name']}'")
    reply('OK', action='remove', id=oid)
    send_list()


# ---------- robot body: bounding box, physics, motion components ----------
def axis_angle_matrix(r):
    x, y, z, a = r
    n = math.sqrt(x * x + y * y + z * z) or 1.0
    x, y, z = x / n, y / n, z / n
    c, s, t = math.cos(a), math.sin(a), 1 - math.cos(a)
    return [[t * x * x + c, t * x * y - s * z, t * x * z + s * y],
            [t * x * y + s * z, t * y * y + c, t * y * z - s * x],
            [t * x * z - s * y, t * y * z + s * x, t * z * z + c]]


def mat_mul(a, b):
    return [[sum(a[i][k] * b[k][j] for k in range(3)) for j in range(3)] for i in range(3)]


def matrix_axis_angle(m):
    """Axis-angle [x, y, z, angle] of a rotation matrix."""
    angle = math.acos(max(-1.0, min(1.0, (m[0][0] + m[1][1] + m[2][2] - 1) / 2)))
    if angle < 1e-9:
        return [0.0, 0.0, 1.0, 0.0]
    if math.pi - angle < 1e-6:                 # half turn: the axis from the diagonal
        axis = [math.sqrt(max(0.0, (m[i][i] + 1) / 2)) for i in range(3)]
        k = max(range(3), key=lambda i: axis[i])
        for i in range(3):
            if i != k:
                axis[i] = math.copysign(axis[i], m[k][i] + m[i][k])
        return axis + [angle]
    s = 2 * math.sin(angle)
    return [(m[2][1] - m[1][2]) / s, (m[0][2] - m[2][0]) / s, (m[1][0] - m[0][1]) / s, angle]


def mat_vec(m, v):
    return [sum(m[i][k] * v[k] for k in range(3)) for i in range(3)]


IDENTITY = [[1.0, 0.0, 0.0], [0.0, 1.0, 0.0], [0.0, 0.0, 1.0]]


def geometry_size(geom):
    t = geom.getTypeName()
    if t == 'Box':
        return list(geom.getField('size').getSFVec3f())
    if t in ('Cylinder', 'Capsule'):
        r, h = geom.getField('radius').getSFFloat(), geom.getField('height').getSFFloat()
        return [2 * r, 2 * r, h + (2 * r if t == 'Capsule' else 0)]
    if t == 'Sphere':
        return [2 * geom.getField('radius').getSFFloat()] * 3
    return None


def collect_boxes(node, offset, rot, out):
    """Axis-aligned boxes (centre, half size) of the plain geometry under node, in the robot frame.
    Only Pose/Transform/Group/Shape are followed: devices, joints and added parts are not the body."""
    if node is None or node.getDef().startswith('S4VN_'):
        return
    base = node.getBaseTypeName()
    if base in ('Pose', 'Transform'):
        t = node.getField('translation').getSFVec3f()
        offset = [offset[i] + mat_vec(rot, t)[i] for i in range(3)]
        rot = mat_mul(rot, axis_angle_matrix(node.getField('rotation').getSFRotation()))
    if base in ('Pose', 'Transform', 'Group'):
        field = node.getField('children')
        for i in range(field.getCount()):
            collect_boxes(field.getMFNode(i), offset, rot, out)
        return
    geom = node.getField('geometry').getSFNode() if base == 'Shape' else node
    size = geometry_size(geom) if geom is not None else None
    if size:
        half = [sum(abs(rot[i][k]) * size[k] / 2 for k in range(3)) for i in range(3)]
        out.append((offset, half))


def body_box(robot):
    """(centre, size) of the robot body in its own frame: its boundingObject, else its visible shapes."""
    boxes = []
    bo = robot.getField('boundingObject')
    if bo is not None:
        collect_boxes(bo.getSFNode(), [0.0, 0.0, 0.0], IDENTITY, boxes)
    if not boxes:
        children = robot.getField('children')
        for i in range(children.getCount() if children else 0):
            collect_boxes(children.getMFNode(i), [0.0, 0.0, 0.0], IDENTITY, boxes)
    if not boxes:
        return [0.0, 0.0, 0.05], [0.2, 0.15, 0.08]
    lo = [min(c[i] - h[i] for c, h in boxes) for i in range(3)]
    hi = [max(c[i] + h[i] for c, h in boxes) for i in range(3)]
    return [(lo[i] + hi[i]) / 2 for i in range(3)], [hi[i] - lo[i] for i in range(3)]


def dot(a, b):
    return sum(a[i] * b[i] for i in range(3))


def cross(a, b):
    return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]


def mount_axes(robot):
    """(forward, left, up) of a robot standing on the floor, in its own frame: up is the local axis closest to the
    world's up (z for most robots, y for the Y-up ClawBot V2 model), forward its local x (Webots FLU)."""
    r = robot.getOrientation()                 # row-major, world = R * local: its third row is world up, local
    k = max(range(3), key=lambda i: abs(r[6 + i]))
    up = [0.0, 0.0, 0.0]
    up[k] = 1.0 if r[6 + k] > 0 else -1.0
    forward = [1.0, 0.0, 0.0] if k != 0 else [0.0, 1.0, 0.0]
    return forward, cross(up, forward), up


def frame_rotation(x_axis, y_axis, z_axis):
    """Axis-angle of the frame whose x, y, z axes are these robot-frame vectors."""
    return matrix_axis_angle([[x_axis[i], y_axis[i], z_axis[i]] for i in range(3)])


FACE_HEIGHT = 0.05                             # m above the bottom of the body: sensors on the side faces


def mount_point(robot, item, x, y, centered=False):
    """(position, rotation, side) of a sensor on the robot's body (its bounding box): on the face of the side it was
    dropped on (keeping where along that face), facing out, 5 cm above the body's bottom; or on top (item mount
    "top"), facing forward. Before: 5-30 cm from the robot origin wherever the drop was, which left sensors floating
    in front of Robot tự lắp and tilted on ClawBot V2 (its frame is Y-up). centered: in the middle of the front face
    (the page's + button: the robot origin is not the middle of every body, ClawBot V2's is its front-left wheel, and
    the page may still have the pose of a robot that has driven since)."""
    f, l, u = mount_axes(robot)
    center, size = body_box(robot)
    ext = lambda v: sum(abs(v[i]) * size[i] for i in range(3)) / 2       # half size of the box along v
    d = to_local(robot, [x, y, FLOOR_Z])
    lx, ly = dot(d, f), dot(d, l)
    mid = lambda axis, value: dot(center, axis) if centered else value
    yaw = math.atan2(ly, lx)
    side = 'front' if centered else SIDES[int(((yaw + math.pi / 4) % (2 * math.pi)) // (math.pi / 2))]
    depth = num(item.get('depth'), 0.0)

    def along(pos, axis, value, margin):
        """pos moved along axis to value, kept within the box's extent on that axis (minus margin)."""
        limit = max(0.0, ext(axis) - margin)
        target = max(dot(center, axis) - limit, min(dot(center, axis) + limit, value))
        return [pos[i] + axis[i] * (target - dot(pos, axis)) for i in range(3)]

    if item.get('mount') == 'top':
        pos = [center[i] + u[i] * (ext(u) + depth) for i in range(3)]
        pos = along(along(pos, f, mid(f, lx), 0.03), l, mid(l, ly), 0.03)   # where the drop was, on the top
        return pos, frame_rotation(f, l, u), side
    n = {'front': f, 'left': l, 'back': [-c for c in f], 'right': [-c for c in l]}[side]
    t = cross(u, n)                                    # along the face
    height = dot(center, u) - ext(u) + min(FACE_HEIGHT, 2 * ext(u) * 0.75)
    pos = [center[i] + n[i] * (ext(n) + depth) for i in range(3)]
    pos = along(pos, u, height, 0.0)
    lateral = mid(t, dot(d, t))
    pos = along(pos, t, lateral, 0.02)
    # another sensor already there: slide along the face
    taken = [a['node'].getField('translation').getSFVec3f() for a in added.values()
             if a['kind'] == 'sensor' and a['robot'] is not None and a['robot'].getId() == robot.getId()]
    for k in range(1, 8):
        if all(math.dist(pos, p) > 0.025 for p in taken):
            break
        pos = along(pos, t, lateral + 0.03 * ((k + 1) // 2) * (1 if k % 2 else -1), 0.02)
    return pos, frame_rotation(n, cross(u, n), u), side


# ---------- sensor parameters (catalog "params"): range, resolution, field of view... ----------
def param_values(item, given=None):
    """The sensor's parameters, from `given` (clamped to the catalog's limits) or the catalog's defaults."""
    out = {}
    for p in item.get('params', []):
        v = min(p['max'], max(p['min'], num((given or {}).get(p['key']), p['default'])))
        out[p['key']] = int(round(v)) if p.get('int') else round(v, 4)
    return out


def template_params(item, values):
    """Template values: degrees -> radians, integers as such."""
    return {p['key']: (fmt(math.radians(values[p['key']])) if p.get('deg') else
                       str(values[p['key']]) if p.get('int') else fmt(values[p['key']])) for p in item.get('params', [])}


def read_params(item, node):
    """Current parameters of a sensor node (after a reload or an opened project), else the defaults."""
    out = param_values(item)
    for p in item.get('params', []):
        field = node.getField(p['field'])
        try:
            if p['field'] == 'lookupTable':
                value = field.getMFVec3f(field.getCount() - 1)[0]
            elif field.getType() == Field.SF_INT32:
                value = field.getSFInt32()
            else:
                value = field.getSFFloat()
        except Exception:
            continue
        out[p['key']] = round(math.degrees(value), 1) if p.get('deg') else value
    return out


def physics_field(node):
    field = node.getField('physics')
    return field if field is not None and field.getType() == Field.SF_NODE else None


def editable_kind(node):
    """'physics': Solid/Robot with its own physics field; 'mass': PROTO object exposing a mass parameter."""
    if physics_field(node) is not None:
        return 'physics'
    field = node.getField('mass')
    if field is not None and field.getType() == Field.SF_FLOAT:
        return 'mass'
    return None


def ensure_physics(node, mass=None):
    """Give node a Physics (and a bounding box if it has none). Returns True when physics was added."""
    field = physics_field(node)
    ph = field.getSFNode()
    if ph is None:
        center, size = body_box(node)
        bo = node.getField('boundingObject')
        if bo is not None and bo.getSFNode() is None:
            bo.importSFNodeFromString('Pose { translation %s children [ Box { size %s } ] }' % (
                ' '.join(fmt(c) for c in center), ' '.join(fmt(max(0.002, v)) for v in size)))
        if mass is None:
            mass = round(min(5.0, max(0.1, size[0] * size[1] * size[2] * DEFAULT_DENSITY)), 2)
        field.importSFNodeFromString(f'Physics {{ density -1 mass {fmt(mass)} }}')
        return True
    if mass is not None:
        ph.getField('density').setSFFloat(-1)
        ph.getField('mass').setSFFloat(mass)
    return False


def own_motors(robot):
    """Motors a robot came with (ClawBot wheels and lift...), not those this editor added."""
    found = []

    def scan(nodes):
        for node in nodes:
            if node is None or node.getDef().startswith(('S4VN_MOTION_', 'S4VN_SENSOR_')):
                continue
            base = node.getBaseTypeName()
            if base in ('HingeJoint', 'SliderJoint', 'Hinge2Joint'):
                found.extend(sf_string(d, 'name') for d in sub_nodes(node.getField('device'))
                             if d is not None and d.getBaseTypeName() in ('RotationalMotor', 'LinearMotor'))
                scan([node.getField('endPoint').getSFNode()])
            elif base in ('Pose', 'Transform', 'Group', 'Solid'):
                scan(sub_nodes(node.getField('children')))
    scan(sub_nodes(robot.getField('children')))
    return found


def accepts_motion(robot):
    """Robot tự lắp, or a plain Robot (children slot, physics field) without motors of its own: parts go there."""
    return is_kit(robot) or (slot_of(robot)[0] == 'children' and physics_field(robot) is not None
                             and not own_motors(robot))


def has_motion(robot):
    return any(a['kind'] == 'motion' and a['robot'] is not None and a['robot'].getId() == robot.getId()
               for a in added.values())


def set_top_field(node_str, field, value):
    """node_str with `field value` on its outer node (replaced when present, else added)."""
    depth, out, i = 0, [], 0
    tokens = list(re.finditer(r'"[^"]*"|[{}\[\]]|[^\s{}\[\]"]+', node_str))
    for k, tok in enumerate(tokens):
        t = tok.group()
        if t in '{[':
            depth += 1
        elif t in '}]':
            depth -= 1
        elif depth == 1 and t == field and k + 1 < len(tokens):
            nxt = tokens[k + 1]
            return node_str[:nxt.start()] + value + node_str[nxt.end():]
    last = node_str.rindex('}')
    return node_str[:last].rstrip() + f' {field} {value} ' + node_str[last:]


def replace_with_mass(node, mass):
    """New mass for a PROTO object that only exposes a `mass` parameter (WoodenBox, Ball...).

    Changing that parameter makes Webots rebuild a template PROTO in place, which crashed Webots R2025a on the
    server (segfault). Instead: remove the node and import it again from the catalog template with the new mass,
    same DEF, name, position and heading. Only for nodes this editor added; returns the new node or None."""
    oid = node.getDef()
    a = added.get(oid)
    item = a and CATALOG.get(a['item'])
    if not item:
        return None
    t = node.getField('translation').getSFVec3f()
    yaw = heading(node)
    forget_watch(node)
    node.remove()
    extra_step()                                # the old node (same DEF) must be gone before the import
    node_str = f'DEF {oid} ' + Template(item['node']).substitute(
        x=fmt(t[0]), y=fmt(t[1]), z=fmt(t[2]), yaw=fmt(yaw), name=a['name'])
    root.importMFNodeFromString(-1, set_top_field(node_str, 'mass', fmt(mass)))
    new = sv.getFromDef(oid)
    if new is None:
        added.pop(oid, None)
        return None
    a['node'] = new
    return new


def physics_cmd(d):
    node = node_from_request(d)
    if node is None:
        return reply('ERR', error='not_movable', node=d.get('node'))
    kind = editable_kind(node)
    if kind is None:
        return reply('ERR', error='not_editable', node=d.get('node'))
    mass = d.get('mass')
    mass = None if mass is None else min(100.0, max(0.01, num(mass, 1.0)))
    if d.get('remove'):
        if kind != 'physics' or physics_field(node).getSFNode() is None:
            return reply('ERR', error='not_editable', node=d.get('node'))
        if has_motion(node) or is_kit(node):              # wheel joints need their parent body's physics
            return reply('ERR', error='has_motion', node=d.get('node'))
        rewatch = forget_watch(node, notify=False)       # no contact tracking on a body losing its physics
        physics_field(node).removeSF()
        if rewatch:
            watch_cmd({'node': node.getId()})
        action = 'physics_off'
    elif kind == 'mass':
        node = replace_with_mass(node, mass if mass is not None else 1.0)
        if node is None:
            return reply('ERR', error='not_editable', node=d.get('node'))
        action = 'mass'
    else:
        action = 'physics_on' if ensure_physics(node, mass) else 'mass'
    node.resetPhysics()
    if watch['node'] is not None and watch['node'].getId() == node.getId():
        watch_cmd({'node': node.getId()})     # contact tracking needs physics
    say(f"{action} '{robot_name(node)}'" + (f' m={mass} kg' if mass else ''))
    reply('OK', action=action, node=node.getId(), name=robot_name(node), mass=mass_of(node))
    send_list()


def sub_nodes(field):
    if field is None:
        return []
    if field.getType() == Field.SF_NODE:
        return [field.getSFNode()]
    return [field.getMFNode(i) for i in range(field.getCount())]


def device_names(node, out=None):
    """Names of every named node under a robot (devices, sub-solids), to keep new names unique."""
    out = set() if out is None else out
    for fname in ('children', 'device', 'endPoint'):
        for child in sub_nodes(node.getField(fname)):
            if child is None:
                continue
            name = child.getField('name')
            if name is not None and name.getType() == Field.SF_STRING:
                out.add(name.getSFString())
            device_names(child, out)
    return out


def unique(name, used):
    candidate, k = name, 2
    while candidate in used:
        candidate, k = f'{name}_{k}', k + 1
    used.add(candidate)
    return candidate


def joint_devices(joint):
    return [n.getField('name').getSFString() for n in sub_nodes(joint.getField('device'))
            if n is not None and n.getBaseTypeName() in ('RotationalMotor', 'LinearMotor')]


def attach_motion(item, robot, x, y):
    global seq
    kind = item.get('kind')
    if (kind or '').startswith('kit_'):
        return attach_kit(item, robot)
    slot, children = slot_of(robot)
    if physics_field(robot) is None or slot != 'children':
        # PROTO robots (e-puck...) come with their own wheels and motors
        return reply('ERR', error='not_supported', robot=robot_name(robot))
    if kind == 'physics':
        added_now = ensure_physics(robot)
        robot.resetPhysics()
        say(f"vat ly cho '{robot_name(robot)}': m={mass_of(robot)} kg")
        reply('OK', action='physics_on' if added_now else 'mass', node=robot.getId(), name=robot_name(robot),
              mass=mass_of(robot))
        return send_list()
    motors = own_motors(robot) if kind != 'physics' else []
    if motors:                                 # ClawBot...: extra wheels/joints would fight its own
        return reply('ERR', error='has_motors', robot=robot_name(robot), motors=motors[:4])
    if kind in ('wheels', 'turret') and any(a['robot'] is not None and a['robot'].getId() == robot.getId()
                                            and a['item'] == item['id'] for a in added.values()):
        return reply('ERR', error='already', item=item['id'], robot=robot_name(robot))
    center, size = body_box(robot)             # before anything is added
    ensure_physics(robot)                      # a joint needs a parent body with physics
    used = device_names(robot)
    top, bottom = center[2] + size[2] / 2, center[2] - size[2] / 2
    nodes = []                                 # (template, values)
    lift = None
    if kind == 'wheels':
        r, w, c = item['radius'], item['width'], item['clearance']
        floor = bottom - c                     # floor height in the robot frame once on its wheels
        yw = size[1] / 2 + w / 2 + 0.004
        for side, sign in (('left', 1), ('right', -1)):
            nodes.append((item['node'], dict(x=center[0], y=center[1] + sign * yw, z=floor + r, r=r, w=w, spoke=1.6 * r,
                                             hubw=w + 0.003, motor=unique(f'motor_{side}', used),
                                             sensor=unique(f'enc_{side}', used), name=unique(f'wheel_{side}', used))))
        rc = c / 2
        for side, sign in (('front', 1), ('back', -1)):
            nodes.append((item['caster'], dict(x=center[0] + sign * (size[0] / 2 - rc - 0.01), y=center[1],
                                               z=floor + rc, r=rc, name=unique(f'caster_{side}', used))))
        lift = floor
    elif kind == 'arm':
        _, _, side = drop_side(robot, x, y)
        yaw = SIDE_YAW[side]
        reach = (size[0] if side in ('front', 'back') else size[1]) / 2 - 0.015
        length = item['length']
        motor = unique(item['device'], used)
        nodes.append((item['node'], dict(x=center[0] + reach * math.cos(yaw), y=center[1] + reach * math.sin(yaw),
                                         z=top + 0.014, ax=-math.sin(yaw), ay=math.cos(yaw), yaw=yaw, len=length,
                                         half=length / 2, tip=length - 0.006, motor=motor,
                                         sensor=unique(motor + '_pos', used), name=unique(motor + '_link', used))))
    elif kind == 'turret':
        motor = unique(item['device'], used)
        nodes.append((item['node'], dict(x=center[0], y=center[1], z=top, zc=top + 0.008, motor=motor,
                                         sensor=unique(motor + '_pos', used), name=unique(motor + '_link', used))))
    else:
        return reply('ERR', error='unknown_item', item=item['id'])
    seq += 1
    oid = f'S4VN_MOTION_{seq}'
    imported = []
    for k, (template, values) in enumerate(nodes):
        values = {key: fmt(v) if isinstance(v, float) else v for key, v in values.items()}
        before = children.getCount()
        children.importMFNodeFromString(-1, (f'DEF {oid} ' if k == 0 else f'DEF {oid}_{k + 1} ') +
                                        Template(template).substitute(values))
        if children.getCount() != before + 1:
            for node in imported:
                node.remove()
            return reply('ERR', error='import_failed', item=item['id'])
        imported.append(children.getMFNode(-1))
    if lift is not None:                       # stand the robot on its new wheels, upright
        p = robot.getPosition()
        robot.getField('translation').setSFVec3f([p[0], p[1], FLOOR_Z - lift])
        robot.getField('rotation').setSFRotation([0, 0, 1, heading(robot)])
    robot.resetPhysics()
    devices = [n for node in imported for n in joint_devices(node)]
    added[oid] = dict(node=imported[0], extra=imported[1:], item=item['id'], label=item['label'], kind='motion',
                      name=', '.join(devices), yaw=0.0, robot=robot, slot=slot, devices=devices)
    if watch['node'] is not None and watch['node'].getId() == robot.getId():
        watch['joints'] = None
    robot.restartController()
    say(f"gan {item['id']} ({', '.join(devices)}) vao robot '{robot_name(robot)}', controller khoi dong lai")
    reply('OK', action='motion', id=oid, item=item['id'], devices=devices, robot=robot_name(robot),
          node=robot.getId())
    send_list()


# ---------- Robot tự lắp (kit_*): ClawBot V2 split into parts (kit/build_kit.py, kit/kit_catalog.py) ----------
# The base (kit_base, customData "s4vn-kit") is the ClawBot chassis on its 4 wheels (DEF S4VN_KITW_<k>). Parts mount
# on it: the lift (a SliderJoint), the claw on the lift's link, another wheel set (4 joints with the ClawBot motor
# names, so clawbot.py drives them) or 2 caterpillar tracks. Like the other parts: DEF S4VN_MOTION_<n>[_<k>].
KIT_TAG = 's4vn-kit'
KIT_WHEEL_DEF = 'S4VN_KITW_'
KIT_WHEELS = (('front_left', 1, 1), ('front_right', 1, -1), ('back_left', -1, 1), ('back_right', -1, -1))
KIT_WHEEL_X = 0.125                            # m, front / back axles
KIT_WHEEL_KINDS = ('kit_wheels', 'kit_track')
# Friction of the kit wheels (ClawBot world's own, youBot mecanum wheels, Webots track sample), added to WorldInfo
KIT_CONTACTS = (
    ('clawbot_wheel', 'ContactProperties { material2 "clawbot_wheel" coulombFriction [ 8 ] softCFM 1e-05 }'),
    ('s4vn_kit_grip', 'ContactProperties { material2 "s4vn_kit_grip" coulombFriction [ 15 ] softCFM 1e-05 }'),
    ('s4vn_kit_mecanum_a', 'ContactProperties { material1 "s4vn_kit_mecanum_a" coulombFriction [ 0, 2, 0 ] '
                           'frictionRotation -0.785398 0 bounce 0 forceDependentSlip [ 10, 0 ] }'),
    ('s4vn_kit_mecanum_b', 'ContactProperties { material1 "s4vn_kit_mecanum_b" coulombFriction [ 0, 2, 0 ] '
                           'frictionRotation 0.785398 0 bounce 0 forceDependentSlip [ 10, 0 ] }'),
    ('s4vn_kit_track', 'ContactProperties { material2 "s4vn_kit_track" coulombFriction [ 500 ] softCFM 0.0001 }'),
)
# ClawBot's robot window (Điều khiển nâng cao) when the project has it (the beta world), else none
KIT_WINDOW = ('LiemsStudio' if os.path.isdir(os.path.join(os.path.dirname(os.path.dirname(HERE)), 'plugins',
                                                          'robot_windows', 'LiemsStudio')) else '<none>')


def is_kit(robot):
    return robot is not None and sf_string(robot, 'customData') == KIT_TAG


def kit_wheel_strings(item, defs, speed=100):
    """VRML of the 4 wheel joints of a wheel item; defs(k) is the DEF of the k-th one; speed: % (Tùy chỉnh)."""
    w = item['wheel']
    pick = lambda v, pos: v[pos] if isinstance(v, dict) else v          # mecanum: per wheel
    out = []
    for k, (pos, sx, sy) in enumerate(KIT_WHEELS):
        # left wheels turn about -y, right ones about +y: clawbot.set_wheels drives them forwards that way
        out.append(f'DEF {defs(k)} ' + Template(item['node']).substitute(
            pos=pos, x=fmt(sx * KIT_WHEEL_X), y=fmt(sy * w['y']), ay=-sy, yaw=fmt(0.0 if sy > 0 else math.pi),
            name=f"{item['id']}_{pos}", visual=pick(w['visual'], pos), material=pick(w['material'], pos),
            r=fmt(w['r']), w=fmt(w['w']), mass=fmt(w['mass']), vmax=fmt(KIT_WHEEL_VMAX * speed / 100)))
    return out


def kit_track_strings(item, defs, speed=100):
    return [f'DEF {defs(k)} ' + Template(item['node']).substitute(
        y=fmt(sy * item['track']['y']), name=f"{item['id']}_{side}", motor=f'clawbot_track_{side}_motor',
        vmax=fmt(KIT_TRACK_VMAX * speed / 100))
        for k, (side, sy) in enumerate((('left', 1), ('right', -1)))]


def default_wheel_strings(speed=100):
    return kit_wheel_strings(CATALOG['kit_wheel_std'], lambda k: f'{KIT_WHEEL_DEF}{k + 1}', speed)


def kit_entries(robot, kinds):
    return [(oid, a) for oid, a in added.items() if a['kind'] == 'motion' and a['robot'] is not None
            and a['robot'].getId() == robot.getId() and CATALOG.get(a['item'], {}).get('kind') in kinds]


def part_name(node):
    """Name of the solid of an added part: a joint's endPoint, else the node itself (claw, track)."""
    end = node.getField('endPoint')
    solid = end.getSFNode() if end is not None else node
    return robot_name(solid) if solid is not None else ''


def kit_item_of(node):
    name = part_name(node)
    return next((it for it in CATALOG.values() if it.get('kind', '').startswith('kit_')
                 and (name == it['id'] or name.startswith(it['id'] + '_'))), None)


def import_all(field, strings):
    """Import the node strings at the end of field, all or none: the new nodes, or None."""
    nodes = []
    for text in strings:
        before = field.getCount()
        field.importMFNodeFromString(-1, text)
        if field.getCount() != before + 1:
            for node in nodes:
                node.remove()
            return None
        nodes.append(field.getMFNode(-1))
    return nodes


def stand(robot, z):
    """Upright on the floor, the wheel axles (robot origin) at height z."""
    p = robot.getPosition()
    robot.getField('translation').setSFVec3f([p[0], p[1], FLOOR_Z + z])
    robot.getField('rotation').setSFRotation([0, 0, 1, heading(robot)])
    robot.resetPhysics()


def wheel_height(item):
    return item['wheel']['r'] if 'wheel' in item else item['track']['z']


def ensure_kit_contacts():
    info = next((n for n in (root.getMFNode(i) for i in range(root.getCount()))
                 if n is not None and n.getTypeName() == 'WorldInfo'), None)
    field = info.getField('contactProperties') if info is not None else None
    if field is None:
        return
    have = {sf_string(n, m) for n in sub_nodes(field) if n is not None for m in ('material1', 'material2')}
    for material, vrml in KIT_CONTACTS:
        if material not in have:
            field.importMFNodeFromString(-1, vrml)


def restore_wheels(robot, speed=100):
    """Back on the 4 ClawBot wheels (after its wheel set or tracks were removed), at the speed it had."""
    extra_step()                               # the removed motors (same names) gone first
    if import_all(robot.getField('children'), default_wheel_strings(speed)) is not None:
        stand(robot, wheel_height(CATALOG['kit_wheel_std']))


def attach_kit(item, robot):
    global seq
    if not is_kit(robot):
        return reply('ERR', error='not_kit', robot=robot_name(robot))
    kind = item['kind']
    if kind in ('kit_tower', 'kit_claw') and kit_entries(robot, (kind,)):
        return reply('ERR', error='already', item=item['id'], robot=robot_name(robot))
    field = robot.getField('children')
    if kind == 'kit_claw':                     # on the lift's link: it moves up and down with it
        towers = kit_entries(robot, ('kit_tower',))
        if not towers:
            return reply('ERR', error='need_tower', robot=robot_name(robot))
        field = towers[0][1]['node'].getField('endPoint').getSFNode().getField('children')
    seq += 1
    oid = f'S4VN_MOTION_{seq}'
    defs = lambda k: oid if k == 0 else f'{oid}_{k + 1}'
    speed = kit_speed(robot)                   # the new wheels keep the speed set in Tùy chỉnh
    if kind == 'kit_wheels':
        strings = kit_wheel_strings(item, defs, speed)
    elif kind == 'kit_track':
        strings = kit_track_strings(item, defs, speed)
    else:                                      # lift (+ its fixed mast), claw
        strings = [f'DEF {oid} ' + item['node']] + ([f'DEF {oid}_2 ' + item['fixed']] if item.get('fixed') else [])
    if kind in KIT_WHEEL_KINDS:                # a wheel set replaces the wheels on the robot (same motor names)
        for old, a in kit_entries(robot, KIT_WHEEL_KINDS):
            added.pop(old)
            for node in [a['node']] + a.get('extra', []):
                node.remove()
        for node in [n for n in sub_nodes(field) if n is not None and n.getDef().startswith(KIT_WHEEL_DEF)]:
            node.remove()
        extra_step()
    ensure_kit_contacts()
    nodes = import_all(field, strings)
    if nodes is None:
        if kind in KIT_WHEEL_KINDS:
            restore_wheels(robot, speed)
        return reply('ERR', error='import_failed', item=item['id'], hint='PROTO not declared IMPORTABLE EXTERNPROTO')
    if kind in KIT_WHEEL_KINDS:
        stand(robot, wheel_height(item))
    devices = [n for node in nodes for n in joint_devices(node)]
    added[oid] = dict(node=nodes[0], extra=nodes[1:], item=item['id'], label=item['label'], kind='motion',
                      name=', '.join(devices) or item['label'], yaw=0.0, robot=robot, slot='children', devices=devices)
    if watch['node'] is not None and watch['node'].getId() == robot.getId():
        watch['joints'] = None
    robot.restartController()
    say(f"gan {item['id']} vao robot tu lap '{robot_name(robot)}', controller khoi dong lai")
    reply('OK', action='kit', id=oid, item=item['id'], label=item['label'], devices=devices, robot=robot_name(robot),
          node=robot.getId())
    send_list()


# ---------- Robot tự lắp: customisation (Tùy chỉnh panel): colours, name, speed, logo; sensor parameters ----------
KIT_WHEEL_VMAX, KIT_TRACK_VMAX = 10.0, 0.4    # 100 % speed: rad/s of a wheel, m/s of a track
NAME_RE = re.compile(r'[\w\- ]{1,24}')
LOGO_DEF = 'S4VN_LOGO_'                       # + TOP / FRONT: where it is
LOGO_FILE = re.compile(r's4vn_logo_[a-z0-9_]{1,40}\.(png|jpg)')
LOGO_URL = re.compile(r'textures/(s4vn_logo_[a-z0-9_]{1,40}\.(?:png|jpg))')
MAX_LOGO_BYTES = 300 * 1024
PROJECT_DIR = os.path.dirname(os.path.dirname(HERE))


def kit_children(robot):
    return [n for n in sub_nodes(robot.getField('children')) if n is not None]


def kit_color_nodes(robot):
    """{part: [PROTO nodes with a `color` field]}: chassis, frame (the lift and its mast), claw."""
    parts = {'chassis': [n for n in kit_children(robot) if n.getTypeName() == 'S4vnKitChassis']}
    for _, a in kit_entries(robot, ('kit_tower',)):
        link = a['node'].getField('endPoint').getSFNode()
        parts['frame'] = [n for n in sub_nodes(link.getField('children')) if n and n.getTypeName() == 'S4vnKitTower'] + \
            [n for n in a.get('extra', []) if n.getTypeName() == 'S4vnKitMast']
    for _, a in kit_entries(robot, ('kit_claw',)):
        parts['claw'] = [n for n in sub_nodes(a['node'].getField('children')) if n and n.getTypeName() == 'S4vnKitClaw']
    return {k: v for k, v in parts.items() if v}


def kit_motors(robot):
    """[(motor node, its 100 % max velocity)] of the wheels or tracks of a Robot tự lắp."""
    out = []
    for node in kit_children(robot):
        for dev in sub_nodes(node.getField('device')):           # wheel joints and tracks hold their motor
            if dev is None or dev.getBaseTypeName() not in ('RotationalMotor', 'LinearMotor'):
                continue                                         # not their position sensors (same name prefix)
            name = sf_string(dev, 'name') or ''
            if name.startswith('clawbot_wheel_'):
                out.append((dev, KIT_WHEEL_VMAX))
            elif name.startswith('clawbot_track_'):
                out.append((dev, KIT_TRACK_VMAX))
    return out


def kit_speed(robot):
    motors = kit_motors(robot)
    return round(100 * motors[0][0].getField('maxVelocity').getSFFloat() / motors[0][1]) if motors else 100


def kit_logo(robot):
    node = next((n for n in kit_children(robot) if n.getDef().startswith(LOGO_DEF)), None)
    return None if node is None else node.getDef()[len(LOGO_DEF):].lower()


def kit_custom(robot):
    """What the page's Tùy chỉnh panel shows for a Robot tự lắp."""
    return dict(colors={part: [round(c, 3) for c in nodes[0].getField('color').getSFColor()]
                        for part, nodes in kit_color_nodes(robot).items()},
                speed=kit_speed(robot), logo=kit_logo(robot), mass=mass_of(robot),
                tower=bool(kit_entries(robot, ('kit_tower',))), claw=bool(kit_entries(robot, ('kit_claw',))))


def kit_robot(d):
    node = node_from_request(d)
    if node is None or not is_kit(node):
        reply('ERR', error='not_kit', node=d.get('node'))
        return None
    return node


def color_cmd(d):
    robot = kit_robot(d)
    if robot is None:
        return
    nodes = kit_color_nodes(robot).get(str(d.get('part')))
    rgb = [min(1.0, max(0.0, num(c))) for c in (d.get('color') or [])][:3]
    if not nodes or len(rgb) != 3:
        return reply('ERR', error='bad_color', part=d.get('part'))
    for node in nodes:                         # a PROTO field (non-template PROTO): no rebuild
        node.getField('color').setSFColor(rgb)
    reply('OK', action='color', part=d.get('part'), robot=robot_name(robot))
    send_list()


def rename_cmd(d):
    robot = kit_robot(d)
    if robot is None:
        return
    name = ' '.join(str(d.get('name', '')).split())
    if not NAME_RE.fullmatch(name):
        return reply('ERR', error='bad_name', name=name[:40])
    others = [n for n in (root.getMFNode(i) for i in range(root.getCount()))
              if n is not None and n.getBaseTypeName() == 'Robot' and n.getId() != robot.getId()]
    if any(robot_name(n) == name for n in others):
        return reply('ERR', error='name_taken', name=name)
    old = robot_name(robot)
    robot.getField('name').setSFString(name)
    for a in added.values():
        if a['node'] is not None and a['node'].getId() == robot.getId():
            a['name'] = name
    robot.restartController()                  # robot.getName() in the program
    say(f"doi ten robot '{old}' -> '{name}'")
    reply('OK', action='rename', old=old, name=name)
    send_list()


def speed_cmd(d):
    robot = kit_robot(d)
    if robot is None:
        return
    pct = min(300.0, max(25.0, num(d.get('speed'), 100)))
    for motor, base in kit_motors(robot):
        motor.getField('maxVelocity').setSFFloat(round(base * pct / 100, 4))
    robot.restartController()                  # clawbot.py reads the max velocity at start (100 % of go_forward)
    reply('OK', action='speed', speed=round(pct), robot=robot_name(robot))
    send_list()


def sensor_cmd(d):
    """New parameters for a sensor: imported again from its catalog template, same name, place and DEF."""
    oid = d.get('id')
    a = added.get(oid)
    item = CATALOG.get(a['item']) if a and a['kind'] == 'sensor' else None
    if not item or not item.get('params'):
        return reply('ERR', error='unknown_id', id=oid)
    params = param_values(item, d.get('params') if isinstance(d.get('params'), dict) else {})
    node, robot = a['node'], a['robot']
    pos, rot = node.getField('translation').getSFVec3f(), node.getField('rotation').getSFRotation()
    field = robot.getField(a['slot'])
    node.remove()
    extra_step()                               # the old device (same name and DEF) gone first
    before = field.getCount()
    field.importMFNodeFromString(-1, f'DEF {oid} ' + sensor_string(item, pos, rot, a['name'], params))
    if field.getCount() != before + 1:
        added.pop(oid)
        robot.restartController()
        return reply('ERR', error='import_failed', item=item['id'])
    a.update(node=field.getMFNode(-1), params=params)
    robot.restartController()
    say(f"thong so {a['name']}: {params}")
    reply('OK', action='sensor', id=oid, name=a['name'], params=params)
    send_list()


def write_logo(name, raw):
    """The image where Webots finds it (relative to the world) and where the viewer asks for it (the stream server
    serves the project's folder): textures/ next to both."""
    for sub in ('worlds/textures', 'textures'):
        os.makedirs(os.path.join(PROJECT_DIR, *sub.split('/')), exist_ok=True)
        with open(os.path.join(PROJECT_DIR, *sub.split('/'), name), 'wb') as f:
            f.write(raw)


def logo_bytes(data):
    """PNG / JPEG bytes from base64, or None."""
    try:
        raw = base64.b64decode(str(data), validate=True)
    except (ValueError, TypeError):
        return None
    ok = raw.startswith(b'\x89PNG\r\n\x1a\n') or raw.startswith(b'\xff\xd8\xff')
    return raw if ok and len(raw) <= MAX_LOGO_BYTES else None


def logo_cmd(d):
    """Image logo on a Robot tự lắp: on top of its chassis or on its front face (place); remove: true takes it off."""
    robot = kit_robot(d)
    if robot is None:
        return
    for node in kit_children(robot):
        if node.getDef().startswith(LOGO_DEF):
            node.remove()
    if d.get('remove'):
        reply('OK', action='logo', removed=True, robot=robot_name(robot))
        return send_list()
    raw = logo_bytes(d.get('data'))
    if raw is None:
        return reply('ERR', error='bad_image')
    ext = 'png' if raw.startswith(b'\x89PNG') else 'jpg'
    name = f's4vn_logo_{robot.getId()}_{int(sv.getTime() * 1000) % 10 ** 9}.{ext}'      # new name: no stale cache
    write_logo(name, raw)
    f, l, u = mount_axes(robot)
    center, size = body_box(robot)
    ext_of = lambda v: sum(abs(v[i]) * size[i] for i in range(3)) / 2
    place = 'front' if d.get('place') == 'front' else 'top'
    if place == 'front':                       # image upright, seen from in front of the robot
        pos = [center[i] + f[i] * (ext_of(f) + 0.0015) for i in range(3)]
        rot, side = frame_rotation(l, u, f), min(0.1, 2 * ext_of(u) - 0.01, 2 * ext_of(l) - 0.02)
    else:                                      # top of the chassis, image upright seen from behind the robot
        pos = [center[i] + u[i] * (ext_of(u) + 0.0015) for i in range(3)]
        rot, side = frame_rotation([-c for c in l], f, u), min(0.12, 2 * ext_of(f) - 0.04, 2 * ext_of(l) - 0.04)
    robot.getField('children').importMFNodeFromString(-1, (
        f'DEF {LOGO_DEF}{place.upper()} Pose {{ translation {" ".join(fmt(v) for v in pos)} rotation {" ".join(fmt(v) for v in rot)} '
        f'children [ Shape {{ appearance PBRAppearance {{ baseColorMap ImageTexture {{ url [ "textures/{name}" ] '
        f'repeatS FALSE repeatT FALSE }} roughness 0.7 metalness 0 }} geometry Plane {{ size {fmt(max(0.03, side))} '
        f'{fmt(max(0.03, side))} }} }} ] }}'))
    say(f"logo {name} ({len(raw) // 1024} KB) tren '{robot_name(robot)}' ({place})")
    reply('OK', action='logo', place=place, robot=robot_name(robot))
    send_list()


def robot_joints(robot):
    """[(label, kind, has motor, jointParameters position field)] of the joints under a robot (cached by WATCH)."""
    out = []

    def scan(nodes):
        for node in nodes:
            if node is None or len(out) >= 12:
                continue
            base = node.getBaseTypeName()
            if base in ('HingeJoint', 'SliderJoint'):
                params = node.getField('jointParameters').getSFNode()
                motors = joint_devices(node)
                end = node.getField('endPoint').getSFNode()
                if params is not None:
                    label = motors[0] if motors else (robot_name(end) if end else base)
                    out.append((label, 'slider' if base == 'SliderJoint' else 'hinge', bool(motors),
                                params.getField('position')))
                scan([end])
            elif base in ('Pose', 'Transform', 'Group', 'Solid'):
                scan(sub_nodes(node.getField('children')))
    field = robot.getField('children')
    if field is None and robot.isProto():
        field = base_field(robot, 'children')     # PROTO robots: their internal wheels
    scan(sub_nodes(field))
    return out


# ---------- physics: watched node telemetry + Alt-drag force ----------
watch = dict(node=None, prev_v=None, acc=[0.0, 0.0, 0.0], joints=None, prev_q=None)
force = None        # dict(node, local, d, torque, t)


def watch_cmd(d):
    node = node_from_request(d)
    if node is None:
        return reply('ERR', error='not_movable', node=d.get('node'))
    if watch['node'] is not None and watch['node'].getId() != node.getId():
        try:
            watch['node'].disableContactPointsTracking(True)
        except Exception:
            pass
    watch.update(node=node, prev_v=None, acc=[0.0, 0.0, 0.0], joints=None, prev_q=None)
    if physics_node(node) is not None:
        node.enableContactPointsTracking(ts * TELEMETRY_STEPS, True)


def forget_watch(node, notify=True):
    """Stop watching node before it is deleted or rebuilt: Webots R2025a crashes (segfault) when a node with
    contact point tracking enabled disappears, and the editor would keep reading a dead node."""
    if watch['node'] is None or node is None or watch['node'].getId() != node.getId():
        return False
    if notify:
        unwatch_cmd()
        return True
    try:
        watch['node'].disableContactPointsTracking(True)
    except Exception:
        pass
    watch.update(node=None, prev_v=None)
    return True


def unwatch_cmd(d=None):
    if watch['node'] is not None:
        try:
            watch['node'].disableContactPointsTracking(True)
        except Exception:
            pass
    watch.update(node=None, prev_v=None)
    reply('PHYS', node=None)


def force_cmd(d):
    global force
    node = node_from_request(d)
    if node is None or physics_node(node) is None:
        return reply('ERR', error='no_physics', node=d.get('node'))
    point = [num(v) for v in (d.get('point') or [0, 0, 0])][:3]
    vec = [num(v) for v in (d.get('vec') or [0, 0, 0])][:3]
    if force is None or force['node'].getId() != node.getId():
        force = dict(node=node, local=to_local(node, point), d=vec, torque=bool(d.get('torque')), t=sv.getTime())
        if watch['node'] is None or watch['node'].getId() != node.getId():
            watch_cmd({'node': node.getId()})
    force.update(d=vec, torque=bool(d.get('torque')), t=sv.getTime())


def force_end_cmd(d=None):
    global force
    force = None


def applied_force():
    """Vector and world application point of the current Alt-drag force (Webots desktop law, capped)."""
    if force is None:
        return None, None
    node = force['node']
    dx, dy, dz = force['d']
    length = math.sqrt(dx * dx + dy * dy + dz * dz)
    m = mass_of(node) or 1.0
    k = (DRAG_TORQUE_SCALE if force['torque'] else DRAG_FORCE_SCALE) * m * length ** 2   # |F| = k * |d|^3
    vec = [k * dx, k * dy, k * dz]
    force['capped'] = False
    if not force['torque']:
        magnitude = k * length
        limit = MAX_ACCEL_G * m * GRAVITY
        if magnitude > limit:
            vec = [c * limit / magnitude for c in vec]
            force['capped'] = True
    point = node.getCenterOfMass() if force['torque'] else to_world(node, force['local'])
    return vec, point


def apply_force():
    global force
    if force is None:
        return
    node = force['node']
    if sv.getTime() - force['t'] > FORCE_TIMEOUT:
        force = None
        return
    vec, _ = applied_force()
    magnitude = math.sqrt(sum(c * c for c in vec))
    if magnitude < 1e-9:
        return
    unit = [c / magnitude for c in vec]
    v = node.getVelocity()
    arr = (ctypes.c_double * 3)(*vec)
    if force['torque']:
        spin = math.sqrt(v[3] ** 2 + v[4] ** 2 + v[5] ** 2)
        if spin > MAX_TWIST_SPEED:
            # one 16 ms step can add ~80 rad/s to a light robot: clamp the angular speed instead
            k = MAX_TWIST_SPEED / spin
            node.setVelocity(v[:3] + [v[3] * k, v[4] * k, v[5] * k])
            force['capped'] = True
        if sum(v[3 + i] * unit[i] for i in range(3)) < MAX_TWIST_SPEED:
            wb.wb_supervisor_node_add_torque(node._ref, arr, 0)
        return
    spin = math.sqrt(v[3] ** 2 + v[4] ** 2 + v[5] ** 2)
    if spin > MAX_SPIN:
        k = MAX_SPIN / spin
        node.setVelocity(v[:3] + [v[3] * k, v[4] * k, v[5] * k])
        force['capped'] = True
    if sum(v[i] * unit[i] for i in range(3)) > MAX_PUSH_SPEED:
        force['capped'] = True
        return
    lever = math.sqrt(sum(c * c for c in force['local']))
    if spin > MAX_SPIN or lever < MIN_LEVER:
        wb.wb_supervisor_node_add_force(node._ref, arr, 0)       # at the centre of mass: no extra spin
    else:
        wb.wb_supervisor_node_add_force_with_offset(node._ref, arr, (ctypes.c_double * 3)(*force['local']), 0)


def send_physics(dt):
    node = watch['node']
    if node is None:
        return
    try:
        p = node.getPosition()
    except Exception:
        return unwatch_cmd()
    dynamic = physics_node(node) is not None
    data = dict(node=node.getId(), name=robot_name(node), mass=mass_of(node), dynamic=dynamic, g=GRAVITY,
                pos=[round(v, 4) for v in p])
    if dynamic:
        v = node.getVelocity()
        if watch['prev_v'] is not None:
            a = [(v[i] - watch['prev_v'][i]) / dt for i in range(3)]
            watch['acc'] = [0.6 * watch['acc'][i] + 0.4 * a[i] for i in range(3)]   # smoothed
        watch['prev_v'] = v
        data.update(com=[round(c, 4) for c in node.getCenterOfMass()], v=[round(x, 4) for x in v],
                    acc=[round(x, 3) for x in watch['acc']],
                    contacts=[[round(c, 3) for c in cp.getPoint()] for cp in node.getContactPoints(True)[:24]])
        if node.getBaseTypeName() == 'Robot':
            data['balance'] = node.getStaticBalance()
    data['editable'] = editable_kind(node)
    data['robot'] = node.getBaseTypeName() == 'Robot'
    if data['robot']:
        data['motion'] = has_motion(node)
        if watch['joints'] is None:
            watch['joints'], watch['prev_q'] = robot_joints(node), None
        q = [j[3].getSFFloat() for j in watch['joints']]
        prev = watch['prev_q']
        data['joints'] = [dict(name=j[0], type=j[1], motor=j[2], pos=round(q[i], 3),
                               vel=round((q[i] - prev[i]) / dt, 2) if prev and len(prev) == len(q) else 0.0)
                          for i, j in enumerate(watch['joints'])]
        watch['prev_q'] = q
    if force is not None and force['node'].getId() == node.getId():
        vec, point = applied_force()
        data.update(force=[round(x, 3) for x in vec], fpoint=[round(x, 4) for x in point], torque=force['torque'],
                    capped=force.get('capped', False))
    reply('PHYS', **data)


def restart_cmd(d):
    name = str(d.get('robot', ''))
    robots = [n for n in (root.getMFNode(i) for i in range(root.getCount()))
              if n is not None and n.getBaseTypeName() == 'Robot' and n.getId() != self_node.getId()]
    targets = [n for n in robots if robot_name(n) == name] or               [n for n in robots if name and sf_string(n, 'controller') == name]      # a controller name works too
    if not targets:
        return reply('ERR', error='unknown_robot', robot=name)
    for node in targets:
        node.restartController()
    say('chay lai controller: ' + ', '.join(robot_name(n) for n in targets))
    reply('OK', action='restart', robots=[robot_name(n) for n in targets])


# ---------- saved projects: scene + controller code ----------
# A project of the /simulation_beta page = scene.json (what was added, where the world's own robots and objects
# stand, their mass edits) + the controller files, zipped by the page (same layout as the /run saved versions:
# controllers/<name>/...). The world itself is not saved: it is the one this editor runs in.
CONTROLLERS_DIR = os.path.dirname(HERE)
# Robot libraries of this world that saved projects leave alone (the beta world: its patched ClawBot library):
# library_files.json next to this file. Worlds uploaded by a student have none: all their code is theirs.
try:
    with open(os.path.join(HERE, 'library_files.json'), encoding='utf-8') as f:
        LIBRARY_FILES = set(json.load(f))
except (OSError, ValueError):
    LIBRARY_FILES = set()
CODE_EXT = ('.py', '.c', '.cpp', '.h', '.hpp', '.java', '.m', '.json', '.txt', '.md', '.csv', '.ini', '.yaml', '.yml')
MAX_FILE_BYTES = 256 * 1024
MAX_CODE_BYTES = 1024 * 1024
MAX_VRML = 200 * 1024
CODE_PATH = re.compile(r'[A-Za-z0-9_-][A-Za-z0-9_.-]*(/[A-Za-z0-9_-][A-Za-z0-9_.-]*)+')
SAVED_DEF = re.compile(r'\s*DEF S4VN_(ADD|SENSOR|MOTION)_\d+(_\d+)? ')


def is_code_path(rel):
    """Student code under controllers/: not the editor, not the robot libraries, text files only."""
    return (bool(CODE_PATH.fullmatch(rel)) and '..' not in rel.split('/') and rel.split('/')[0] != 's4vn_editor'
            and rel not in LIBRARY_FILES and (rel.endswith(CODE_EXT) or rel.rsplit('/', 1)[-1] == 'Makefile'))


def code_files():
    files, skipped, total = {}, [], 0
    for dirpath, dirnames, filenames in os.walk(CONTROLLERS_DIR):
        dirnames[:] = sorted(d for d in dirnames if d not in ('__pycache__', '.git', 's4vn_editor'))
        rel_dir = os.path.relpath(dirpath, CONTROLLERS_DIR).replace(os.sep, '/')
        if rel_dir == '.':
            continue
        for name in sorted(filenames):
            rel = f'{rel_dir}/{name}'
            if not is_code_path(rel):
                continue
            path = os.path.join(dirpath, name)
            size = os.path.getsize(path)
            if size > MAX_FILE_BYTES or total + size > MAX_CODE_BYTES:
                skipped.append(rel)
                continue
            try:
                with open(path, encoding='utf-8') as f:
                    files[rel] = f.read()
            except (UnicodeDecodeError, OSError):
                continue
            total += size
    return files, skipped


def base_nodes():
    """The world's own robots and physical objects (not added here, not this editor), by name."""
    return {robot_name(n): n for n in movable_nodes() if not n.getDef().startswith('S4VN_ADD_')}


def physics_state(node):
    return (physics_field(node) is not None and physics_field(node).getSFNode() is not None, mass_of(node))


BASE_PHYSICS = {}                              # name -> (has physics, mass) when the world started


def export_cmd(d=None):
    nodes = []
    for oid, a in sorted(added.items(), key=lambda kv: int(kv[0].rsplit('_', 1)[1])):
        if a['robot'] is not None and a['robot'].getDef().startswith('S4VN_ADD_'):
            continue                           # inside the VRML of that added robot already
        parent = robot_name(a['robot']) if a['robot'] is not None else 'root'
        for node in [a['node']] + a.get('extra', []):
            nodes.append(dict(parent=parent, item=a['item'], vrml=node.exportString()))
    poses, edits = [], []
    for name, node in base_nodes().items():
        poses.append(dict(name=name, t=[round(v, 5) for v in node.getField('translation').getSFVec3f()],
                          r=[round(v, 6) for v in node.getField('rotation').getSFRotation()]))
        initial = BASE_PHYSICS.get(name)
        now = physics_state(node)
        if initial is not None and physics_field(node) is not None and (
                now[0] != initial[0] or (now[1] or 0) != (initial[1] or 0)):
            edits.append(dict(name=name, physics=now[0], mass=now[1]))
    logos = {}                                 # Robot tự lắp logos: the images, base64, by file name
    for name in sorted({m.group(1) for n in nodes for m in LOGO_URL.finditer(n['vrml'])}):
        try:
            with open(os.path.join(PROJECT_DIR, 'textures', name), 'rb') as f:
                logos[name] = base64.b64encode(f.read()).decode('ascii')
        except OSError:
            continue
    files, skipped = code_files()
    say(f'xuat du an: {len(nodes)} node, {len(files)} file code, {len(logos)} logo')
    scene = dict(format='s4vn-beta-scene', version=1, nodes=nodes, poses=poses, edits=edits)
    if logos:
        scene['logos'] = logos
    reply('OK', action='export', scene=scene, files=files, skipped=skipped)


def file_cmd(d):
    rel = str(d.get('path', ''))
    content = d.get('content')
    if not is_code_path(rel):
        return reply('ERR', error='bad_path', path=rel[:120], cmd='FILE')
    if not isinstance(content, str) or len(content.encode('utf-8')) > MAX_FILE_BYTES:
        return reply('ERR', error='too_big', path=rel, cmd='FILE')
    path = os.path.realpath(os.path.join(CONTROLLERS_DIR, *rel.split('/')))
    if not path.startswith(os.path.realpath(CONTROLLERS_DIR) + os.sep):
        return reply('ERR', error='bad_path', path=rel, cmd='FILE')
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8', newline='') as f:
        f.write(content)
    reply('OK', action='file', path=rel)


def clear_added():
    force_end_cmd()
    # parts mounted on an added robot go with it: removing them again (or reading their id once the robot is gone)
    # is an "invalid 'node'" error. Sorted out before anything is removed.
    robots = {a['node'].getId() for a in added.values() if a['robot'] is None}
    inside = {k for k, a in added.items() if a['robot'] is not None and a['robot'].getId() in robots}
    for k, a in list(added.items()):
        if k in inside:
            continue
        forget_watch(a['node'])
        for node in a.get('extra', []) + [a['node']]:
            if node is not None:
                node.remove()
    added.clear()
    watch['joints'] = None


def apply_base(poses, edits):
    nodes = base_nodes()
    for p in poses:
        node = nodes.get(str(p.get('name', '')))
        t, r = p.get('t'), p.get('r')
        if node is None or not (isinstance(t, list) and len(t) == 3 and isinstance(r, list) and len(r) == 4):
            continue
        t, r = [clamp(num(v)) for v in t], [num(v) for v in r]
        node.getField('translation').setSFVec3f(t)
        if math.hypot(r[0], r[1], r[2]) > 1e-6:
            node.getField('rotation').setSFRotation(r)
        node.resetPhysics()
    for e in edits:
        node = nodes.get(str(e.get('name', '')))
        if node is None or physics_field(node) is None:
            continue
        mass = e.get('mass')
        mass = None if mass is None else min(100.0, max(0.01, num(mass, 1.0)))
        if e.get('physics') is False:
            if physics_field(node).getSFNode() is not None and not has_motion(node):
                forget_watch(node)
                physics_field(node).removeSF()
        else:
            ensure_physics(node, mass)
        node.resetPhysics()


def scene_cmd(d):
    nodes, poses, edits = d.get('nodes', []), d.get('poses', []), d.get('edits', [])
    if not all(isinstance(v, list) for v in (nodes, poses, edits)):
        return reply('ERR', error='bad_scene', cmd='SCENE')
    logos = d.get('logos') if isinstance(d.get('logos'), dict) else {}
    for name, data in list(logos.items())[:10]:  # the images of the saved logos, before the nodes using them
        raw = logo_bytes(data) if LOGO_FILE.fullmatch(str(name)) else None
        if raw is not None:
            write_logo(name, raw)
    clear_added()
    extra_step()                               # removed nodes (same DEFs as the saved ones) gone before importing
    apply_base(poses[:200], [e for e in edits[:200] if isinstance(e, dict)])
    robots = {robot_name(r): r for r in attachable_robots()}
    count, skipped = 0, []
    for n in nodes[:3 * MAX_ITEMS]:
        vrml = n.get('vrml') if isinstance(n, dict) else None
        if not isinstance(vrml, str) or len(vrml) > MAX_VRML or not SAVED_DEF.match(vrml):
            skipped.append(dict(item=n.get('item') if isinstance(n, dict) else None, why='bad_node'))
            continue
        parent = str(n.get('parent') or 'root')
        if parent == 'root':
            field = root
        else:
            robot = robots.get(parent)
            field = slot_of(robot)[1] if robot is not None else None
            if field is None:
                skipped.append(dict(item=n.get('item'), why='no_robot', robot=parent))
                continue
        before = field.getCount()
        field.importMFNodeFromString(-1, vrml)
        if field.getCount() == before + 1:
            count += 1
        else:
            skipped.append(dict(item=n.get('item'), why='import_failed'))
    rebuild_registry()
    for node in (root.getMFNode(i) for i in range(root.getCount())):
        if node is not None and node.getBaseTypeName() == 'Robot' and node.getId() != self_node.getId():
            node.restartController()           # new code and new devices
    say(f'mo du an: {count} node, bo qua {len(skipped)}')
    reply('OK', action='scene', count=count, skipped=skipped)
    send_list()


HANDLERS = {'RESTART': restart_cmd, 'SPAWN': spawn, 'ATTACH': attach, 'MOVE': move, 'ROTATE': rotate, 'REMOVE': remove,
            'WATCH': watch_cmd, 'FORCE': force_cmd, 'PHYSICS': physics_cmd, 'FILE': file_cmd, 'SCENE': scene_cmd,
            'COLOR': color_cmd, 'RENAME': rename_cmd, 'SPEED': speed_cmd, 'SENSOR': sensor_cmd, 'LOGO': logo_cmd}


def handle(msg):
    if msg == 'PING':                              # keepalive from the page, no reply
        return None
    if msg == 'LIST':
        return send_list()
    if msg == 'UNWATCH':
        return unwatch_cmd()
    if msg == 'FORCE_END':
        return force_end_cmd()
    if msg == 'EXPORT':
        return export_cmd()
    cmd, _, payload = msg.partition(':')
    handler = HANDLERS.get(cmd)
    if handler is None:
        return reply('ERR', error='unknown_command', command=cmd[:32])
    try:
        data = json.loads(payload) if payload else {}
    except json.JSONDecodeError:
        return reply('ERR', error='bad_json', command=cmd)
    if not isinstance(data, dict):
        return reply('ERR', error='bad_json', command=cmd)
    handler(data)


def drain_messages():
    out = []
    msg = sv.wwiReceiveText()
    while msg:
        out.append(msg)
        msg = sv.wwiReceiveText()
    return out


def extra_step():
    """One simulation step inside a command (to see the result of a change); keeps the messages it brings."""
    if sv.step(ts) == -1:
        raise SystemExit(0)
    backlog.extend(drain_messages())


backlog = []                                   # messages received during extra_step(), handled next
rebuild_registry()
BASE_PHYSICS.update({name: physics_state(node) for name, node in base_nodes().items()})
say(f'san sang - {len(CATALOG)} muc trong danh muc, {len(added)} doi tuong da them')
send_list()
seen_rids = []
step_count = 0
while sv.step(ts) != -1:
    step_count += 1
    # Copy every pending message BEFORE handling any: supervisor calls (importMFNodeFromString...) talk to
    # Webots and new messages are written into the same reception buffer wwiReceiveText() is reading,
    # which skipped some messages and repeated others (measured: 4 drops in a row -> 1 lost, 1 doubled).
    pending = backlog + drain_messages()
    backlog.clear()
    for msg in pending:
        rid, sep, body = msg.partition('|')     # optional "<session>-<n>|<command>" from the web page
        if sep and re.fullmatch(r'[A-Za-z0-9-]{1,40}', rid):
            if rid in seen_rids:
                continue
            seen_rids = (seen_rids + [rid])[-100:]
            msg = body
        try:
            handle(msg)
        except Exception as exc:              # keep the editor alive whatever the request
            reply('ERR', error='exception', detail=str(exc)[:200], cmd=msg.partition(':')[0][:20])
            say(f'loi: {exc}')
    apply_force()                                  # an added force lasts one step: re-apply while dragging
    if step_count % TELEMETRY_STEPS == 0:
        send_physics(ts * TELEMETRY_STEPS / 1000.0)
