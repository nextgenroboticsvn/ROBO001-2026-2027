"""
ClawBot V2 — thư viện điều khiển (KHÔNG cần sửa file này).

Chứa toàn bộ phần lõi: thiết bị, gửi trạng thái/camera cho Robot Window,
giao thức với Digital Twin / NhanUI (CMD:, SPEED:, ARM_SPEED:, CODE:, ...)
và các lệnh dùng trong chương trình: robot.go_forward(), robot.lift_up(),
delay(), stop_all() ...

Chương trình của người dùng nằm trong robot_controller.py và được chạy bằng
run() — cùng cách với code gửi từ ô Python Code Editor của Digital Twin.
"""
from controller import Supervisor
import os, sys, time, json, base64

robot = Supervisor()
_basic = robot.getBasicTimeStep()
# Keep a ~32 ms control period (as in the Digital Twin world) even when the world uses a
# small basicTimeStep (lesson_3 uses 3 ms): must be a multiple of basicTimeStep.
timeStep = int(_basic * max(1, round(32 / _basic)))
robot_node = robot.getSelf()
robot_name = robot.getName()

# Save initial pose for reset
tf = robot_node.getField("translation") if robot_node else None
rf = robot_node.getField("rotation") if robot_node else None
init_pos = list(tf.getSFVec3f()) if tf else [0,0,0]
init_rot = list(rf.getSFRotation()) if rf else [0,1,0,0]

# === MOTORS ===
w_fl = robot.getDevice("clawbot_wheel_front_left_joint")
w_fr = robot.getDevice("clawbot_wheel_front_right_joint")
w_bl = robot.getDevice("clawbot_wheel_back_left_joint")
w_br = robot.getDevice("clawbot_wheel_back_right_joint")
trucdung = robot.getDevice("clawbot_trucdung_joint")

left_motors = [w_fl, w_bl]
right_motors = [w_fr, w_br]
for m in [w_fl, w_fr, w_bl, w_br]:
    if m:
        m.setPosition(float('inf'))
        m.setVelocity(0.0)
max_vel = (w_fl.getMaxVelocity() if w_fl else 10.0)  # Full wheel speed (tăng 3 lần so với trước khi giảm)
if trucdung:
    trucdung.setVelocity(0.5 / 3.0)  # Giữ nguyên tốc độ nâng/hạ cánh tay (chậm 3 lần)

# === SENSORS — Position sensors for all joints ===
SENSOR_JOINTS = [
    "clawbot_wheel_front_left_joint",
    "clawbot_wheel_front_right_joint",
    "clawbot_wheel_back_left_joint",
    "clawbot_wheel_back_right_joint",
    "clawbot_trucdung_joint"
]
position_sensors = {}
for jname in SENSOR_JOINTS:
    try:
        s = robot.getDevice(jname + "_sensor")
        if s:
            s.enable(timeStep)
            position_sensors[jname] = s
    except:
        pass
trucdung_sensor = position_sensors.get("clawbot_trucdung_joint")

# Distance sensor
dist_sensor = None
try:
    d = robot.getDevice("distance_sensor")
    if d:
        d.enable(timeStep)
        dist_sensor = d
except:
    pass

# IMU sensors
accelerometer = None
gyro = None
inertial_unit = None
try:
    accelerometer = robot.getDevice("accelerometer")
    if accelerometer: accelerometer.enable(timeStep)
except: pass
try:
    gyro = robot.getDevice("gyro")
    if gyro: gyro.enable(timeStep)
except: pass
try:
    inertial_unit = robot.getDevice("inertial_unit")
    if inertial_unit: inertial_unit.enable(timeStep)
except: pass

def get_imu_data():
    data = {}
    if accelerometer:
        try:
            v = accelerometer.getValues()
            data["accelerometer"] = {"x": round(v[0],3), "y": round(v[1],3), "z": round(v[2],3)}
        except: pass
    if gyro:
        try:
            v = gyro.getValues()
            data["gyro"] = {"x": round(v[0],4), "y": round(v[1],4), "z": round(v[2],4)}
        except: pass
    if inertial_unit:
        try:
            v = inertial_unit.getRollPitchYaw()
            data["inertial"] = {"roll": round(v[0],4), "pitch": round(v[1],4), "yaw": round(v[2],4)}
        except: pass
    return data

# === CAMERA (lazy init — only encode when needed) ===
camera = None
cam_name = ""
for n in ["camera", "Camera", "cam"]:
    try:
        c = robot.getDevice(n)
        if c:
            c.enable(timeStep * 4)  # Lower camera rate: 4x timestep
            camera = c
            cam_name = n
            break
    except:
        pass

cam_skip = 10       # Send camera every 10 status cycles
cam_quality = 35    # Lower JPEG quality
cam_counter = 0
_pil_available = None

def get_cam_b64():
    global _pil_available
    if not camera:
        return None
    img = camera.getImage()
    if not img:
        return None
    if _pil_available is None:
        try:
            from PIL import Image
            _pil_available = True
        except:
            _pil_available = False
    if not _pil_available:
        return None
    from PIL import Image
    import io
    w, h = camera.getWidth(), camera.getHeight()
    im = Image.frombytes('RGBA', (w, h), img)
    r, g, b, a = im.split()
    im = Image.merge('RGB', (b, g, r))
    buf = io.BytesIO()
    im.save(buf, format='JPEG', quality=cam_quality)
    return base64.b64encode(buf.getvalue()).decode('ascii')

# === DRIVE ===
def set_wheels(lp, rp):
    lv = (lp / 100.0) * max_vel
    rv = (rp / 100.0) * max_vel
    for m in left_motors:
        if m: m.setVelocity(-lv)
    for m in right_motors:
        if m: m.setVelocity(rv)

def clamp(v):
    try: v = float(v)
    except: v = 0.0
    return max(0.0, min(100.0, v))

def stop(): set_wheels(0, 0)
def go_fwd(s): set_wheels(clamp(s), clamp(s))
def go_bwd(s): s=clamp(s); set_wheels(-s, -s)
def turn_l(s): s=clamp(s); set_wheels(-s, s)
def turn_r(s): s=clamp(s); set_wheels(s, -s)

def lift_to(mm):
    if trucdung:
        trucdung.setPosition(max(-0.05, min(0.25, float(mm)*0.001)))

def lift_move(direction):
    """Velocity control for arm — speed scales with arm_speed (ARM_SPEED:xx)."""
    if not trucdung: return
    pos = trucdung_sensor.getValue() if trucdung_sensor else 0.0
    if direction > 0 and pos >= 0.25:
        trucdung.setVelocity(0.0); return
    if direction < 0 and pos <= -0.05:
        trucdung.setVelocity(0.0); return
    vel = (0.5 / 3.0) * (arm_speed / 100.0)  # base reduced 3x, scaled by arm slider
    trucdung.setPosition(float('inf'))
    trucdung.setVelocity(vel * direction)

def lift_stop():
    if trucdung and trucdung_sensor:
        trucdung.setPosition(trucdung_sensor.getValue())
    elif trucdung:
        trucdung.setVelocity(0.0)

def stop_all():
    stop()
    if trucdung: trucdung.setPosition(0)

# === STATE ===
is_playing = True
imported_code = ""
is_code_executed = False
current_state = "IDLE"
manual_speed = 50
arm_speed = 50
status_interval = 3  # Send status every N steps (not every step!)

def sync_camera_rate():
    # The camera renders the whole city on every sample, which is very costly on a web server
    # without GPU: keep it off and only switch it on just before a frame is sent (see send_status).
    global cam_counter
    cam_counter = 0
    if not camera:
        return
    if int(cam_skip) <= 2:
        camera.enable(timeStep * status_interval)
    else:
        camera.disable()

sync_camera_rate()

def my_step():
    r = robot.step(timeStep if is_playing else 0)
    if not is_playing:
        time.sleep(0.02)
    return r

def do_reset():
    global is_playing, is_code_executed, imported_code, current_state
    is_code_executed = False
    imported_code = ""
    current_state = "IDLE"
    stop_all()
    if tf: tf.setSFVec3f(init_pos)
    if rf: rf.setSFRotation(init_rot)
    if robot_node: robot_node.resetPhysics()
    robot.simulationSetMode(Supervisor.SIMULATION_MODE_REAL_TIME)
    is_playing = True
    robot.step(timeStep)

# === WWI MESSAGE HANDLER ===
def handle_msg(msg):
    global is_playing, imported_code, is_code_executed, current_state, manual_speed, arm_speed
    global cam_skip, cam_quality

    if msg.startswith("CODE:"):
        imported_code = msg[5:]
        is_code_executed = False
        current_state = "RUNNING"
        stop_all()
        return "CODE"
    if msg == "CMD:PLAY":
        is_playing = True
        robot.simulationSetMode(Supervisor.SIMULATION_MODE_REAL_TIME)
        return None
    if msg == "CMD:PAUSE":
        is_playing = False
        robot.simulationSetMode(Supervisor.SIMULATION_MODE_PAUSE)
        return None
    if msg == "CMD:RESET":
        do_reset()
        return "RESET"
    if msg == "CMD:HOME":
        lift_to(0); stop(); current_state = "IDLE"
        return None
    if msg in ("CMD:ARM_UP", "CMD:LIFT_UP"):
        lift_move(1); return None
    if msg in ("CMD:ARM_DOWN", "CMD:LIFT_DOWN"):
        lift_move(-1); return None
    if msg == "CMD:LIFT_STOP":
        lift_stop(); return None
    if msg == "CMD:FORWARD":
        go_fwd(manual_speed); return None
    if msg == "CMD:BACKWARD":
        go_bwd(manual_speed); return None
    if msg == "CMD:LEFT":
        turn_l(manual_speed); return None
    if msg == "CMD:RIGHT":
        turn_r(manual_speed); return None
    if msg == "CMD:STOP":
        stop(); return None
    if msg.startswith("SPEED:"):
        try: manual_speed = max(1, min(100, int(msg[6:])))
        except: pass
        return None
    if msg.startswith("ARM_SPEED:"):
        try: arm_speed = max(1, min(100, int(msg[10:])))
        except: pass
        return None
    if msg.startswith("CAMERA_SETTINGS:"):
        try:
            s = json.loads(msg[16:])
            cam_skip = s.get("frameSkip", 10)
            cam_quality = s.get("quality", 35)
            sync_camera_rate()
        except: pass
        return None
    if msg.startswith("CMD:LIFT_TO:"):
        try: lift_to(float(msg[12:]))
        except: pass
        return None
    if msg.startswith("CMD:ARM_TO:"):
        try:
            a = float(msg[11:])
            lift_to(250 - (a/45.0)*300)
        except: pass
        return None
    return None

def drain_wwi(raise_int=False):
    got_code = got_reset = False
    while True:
        msg = robot.wwiReceiveText()
        if not msg: break
        kind = handle_msg(msg)
        if kind == "CODE":
            got_code = True
            if raise_int: raise Exception("NEW_CODE")
        elif kind == "RESET":
            got_reset = True
            if raise_int: raise Exception("RESET")
    return got_code, got_reset

def check_interrupt():
    drain_wwi(raise_int=True)
    while not is_playing:
        if robot.step(0) == -1: break
        time.sleep(0.02)
        drain_wwi(raise_int=True)

# === STATUS — sent every N steps with full sensor data ===
all_motors = {
    "clawbot_wheel_front_left_joint": w_fl,
    "clawbot_wheel_front_right_joint": w_fr,
    "clawbot_wheel_back_left_joint": w_bl,
    "clawbot_wheel_back_right_joint": w_br,
    "clawbot_trucdung_joint": trucdung,
}

def send_status():
    global cam_counter
    # Joint positions
    joints = {}
    for jname, s in position_sensors.items():
        try: joints[jname] = round(s.getValue(), 4)
        except: joints[jname] = 0.0

    # Motor targets
    motors = {}
    for mname, m in all_motors.items():
        if m:
            try:
                t = m.getTargetPosition()
                if t == float('inf') or t == float('-inf'):
                    motors[mname] = round(m.getVelocity(), 4)
                else:
                    motors[mname] = round(t, 4)
            except: motors[mname] = 0.0

    lift_mm = round(joints.get("clawbot_trucdung_joint", 0) * 1000, 1)

    dist = 99999.0
    if dist_sensor:
        try: dist = round(dist_sensor.getValue(), 1)
        except: pass

    status = {
        "time": round(robot.getTime(), 2),
        "state": current_state,
        "distance": dist,
        "joints": joints,
        "motors": motors,
        "lift_mm": lift_mm,
        "imu": get_imu_data()
    }
    robot.wwiSendText("STATUS:" + json.dumps(status))

    # Camera — sent less frequently, rendered only for the frames that are sent
    if camera:
        cam_counter += 1
        if cam_counter >= cam_skip:
            cam_counter = 0
            b64 = get_cam_b64()
            if b64:
                robot.wwiSendText(f"CAMERA:{cam_name}:{b64}")
            if int(cam_skip) > 2:
                camera.disable()
        elif cam_counter == int(cam_skip) - 2:
            camera.enable(timeStep * status_interval)  # image ready 2 status cycles later

# === ROBOT PROXY (for user CODE execution) ===
class RobotProxy:
    def __getattr__(self, name): return getattr(robot, name)
    def step(self, ts):
        r = robot.step(timeStep if is_playing else 0)
        if not is_playing: time.sleep(0.02)
        return r
    def go_forward(self, speed): go_fwd(speed)
    def go_backward(self, speed): go_bwd(speed)
    def turn_left(self, speed): turn_l(speed)
    def turn_right(self, speed): turn_r(speed)
    def lift_up(self, mm=250): lift_to(mm)
    def lift_down(self, mm=-50): lift_to(mm)
    def lift_to(self, mm): lift_to(mm)
    def arm_up(self, a=0): lift_to(250-(a/45.0)*300)
    def arm_down(self, a=45): lift_to(250-(a/45.0)*300)
    def close_gripper(self, a=30): pass
    def open_gripper(self, a=-10): pass

myRobot = RobotProxy()
robot.go_forward = myRobot.go_forward
robot.go_backward = myRobot.go_backward
robot.turn_left = myRobot.turn_left
robot.turn_right = myRobot.turn_right
robot.arm_up = myRobot.arm_up
robot.arm_down = myRobot.arm_down
robot.lift_up = myRobot.lift_up
robot.lift_down = myRobot.lift_down
robot.lift_to = myRobot.lift_to
robot.close_gripper = myRobot.close_gripper
robot.open_gripper = myRobot.open_gripper

def delay(seconds):
    try: target = float(seconds)
    except: target = 0.0
    if target <= 0: return
    t0 = robot.getTime()
    while my_step() != -1:
        check_interrupt()
        if robot.getTime() - t0 >= target: break

def stop_all_code():
    stop()
    raise Exception("STOP_ALL")

def while_tick():
    check_interrupt()
    if robot.step(timeStep) == -1:
        raise Exception("STOP_ALL")

# === PROGRAM FILE (robot_controller.py) ===
_HERE = os.path.dirname(os.path.abspath(__file__))

def _load_program(program_file):
    """Read the user's program; empty/comment-only files are ignored."""
    if not program_file:
        return ""
    path = program_file if os.path.isabs(program_file) else os.path.join(_HERE, program_file)
    try:
        with open(path, encoding="utf-8") as fh:
            code = fh.read()
    except FileNotFoundError:
        print(f"[{robot_name}] {program_file} not found - waiting for code from Robot Window / Digital Twin")
        return ""
    if not any(l.strip() and not l.strip().startswith("#") for l in code.splitlines()):
        return ""
    return code


# === MAIN LOOP ===
def run(program_file="robot_controller.py"):
    """Run program_file once at start, then keep serving Robot Window / Digital Twin.

    The program is executed exactly like a CODE: message, so a new CODE: from
    the Digital Twin panel interrupts it and runs instead.
    """
    global is_playing, imported_code, is_code_executed, current_state

    robot.simulationSetMode(Supervisor.SIMULATION_MODE_REAL_TIME)
    robot.wwiSendText("STATUS:READY")
    if camera:
        robot.wwiSendText("CAMERAS:" + json.dumps({cam_name: {"width": camera.getWidth(), "height": camera.getHeight()}}))

    print(f"[{robot_name}] Ready! wheels={bool(w_fl)}, lift={bool(trucdung)}, cam={cam_name or 'none'}")

    program = _load_program(program_file)
    if program:
        imported_code = program
        is_code_executed = False
        current_state = "RUNNING"
        print(f"[{robot_name}] Running {program_file}")

    step_count = 0
    while True:
        if my_step() == -1:
            break
        step_count += 1

        # Status every N steps (not every step!)
        if step_count % status_interval == 0:
            send_status()

        got_code, got_reset = drain_wwi(raise_int=False)
        if got_code:
            is_playing = True
            robot.simulationSetMode(Supervisor.SIMULATION_MODE_REAL_TIME)
            current_state = "RUNNING"
        if got_reset:
            pass

        if is_playing and imported_code and not is_code_executed:
            is_code_executed = True
            sync_camera_rate()  # no frames are sent while the program runs: camera off
            try:
                exec(imported_code, globals())
                imported_code = ""
                current_state = "IDLE"
            except Exception as e:
                if str(e) not in ("NEW_CODE", "RESET", "STOP_ALL"):
                    print(f"[{robot_name}] ERROR: {e}", file=sys.stderr)
                    robot.wwiSendText("ERROR:" + str(e))
                # NEW_CODE: the new program (already stored by handle_msg) must run next,
                # so do not pause; RESET already restarted the robot.
                if str(e) not in ("RESET", "NEW_CODE"):
                    is_playing = False
                    current_state = "IDLE"
