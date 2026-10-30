"""
Liems Studio — isolated ClawBot V2 controller with trace and world reset.

Chứa toàn bộ phần lõi: thiết bị, gửi trạng thái/camera cho Robot Window,
giao thức với Digital Twin / NhanUI (CMD:, SPEED:, ARM_SPEED:, CODE:, ...)
và các lệnh dùng trong chương trình: robot.go_forward(), robot.lift_up(),
delay(), stop_all() ...

Chương trình của người dùng nằm trong robot_controller.py và được chạy bằng
run() — cùng cách với code gửi từ ô Python Code Editor của Digital Twin.
"""
from controller import Supervisor
import os, sys, time, json, base64, re, math
from collections import deque

robot = Supervisor()
# Robot tự lắp (/simulation_beta) runs this library with only the parts the student mounted: look devices up by
# name first, so a missing lift / sensor / camera is just None (no "device not found" warning in the console)
_DEVICE_NAMES = {robot.getDeviceByIndex(i).getName() for i in range(robot.getNumberOfDevices())}


def _device(name):
    return robot.getDevice(name) if name in _DEVICE_NAMES else None


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
w_fl = _device("clawbot_wheel_front_left_joint")
w_fr = _device("clawbot_wheel_front_right_joint")
w_bl = _device("clawbot_wheel_back_left_joint")
w_br = _device("clawbot_wheel_back_right_joint")
trucdung = _device("clawbot_trucdung_joint")
# Robot tự lắp with caterpillar tracks instead of wheels: one linear motor per side (belt speed in m/s)
t_left = _device("clawbot_track_left_motor")
t_right = _device("clawbot_track_right_motor")

left_motors = [w_fl, w_bl]
right_motors = [w_fr, w_br]
for m in [w_fl, w_fr, w_bl, w_br, t_left, t_right]:
    if m:
        m.setPosition(float('inf'))
        m.setVelocity(0.0)
max_vel = (w_fl.getMaxVelocity() if w_fl else 10.0)  # Full wheel speed (tăng 3 lần so với trước khi giảm)
LIFT_MIN_MM = -50.0
LIFT_MAX_MM = 250.0
LIFT_HOME_MM = 0.0
LIFT_SPEED = 0.5 / 3.0
_lift_homing = True
if trucdung:
    trucdung.setPosition(LIFT_HOME_MM / 1000.0)
    trucdung.setVelocity(LIFT_SPEED)

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
        s = _device(jname + "_sensor")
        if s:
            s.enable(timeStep)
            position_sensors[jname] = s
    except:
        pass
trucdung_sensor = position_sensors.get("clawbot_trucdung_joint")

# Distance sensor
dist_sensor = None
try:
    d = _device("distance_sensor")
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
    accelerometer = _device("accelerometer")
    if accelerometer: accelerometer.enable(timeStep)
except: pass
try:
    gyro = _device("gyro")
    if gyro: gyro.enable(timeStep)
except: pass
try:
    inertial_unit = _device("inertial_unit")
    if inertial_unit: inertial_unit.enable(timeStep)
except: pass

# Sensors mounted from the /simulation_beta library (ds_front, lidar_left...): on from the start, so the program reads
# them like the robot's own. Cameras stay off (heavy for the server): robot.getDevice("cam_front").enable(64)
_AUTO_ENABLE = ('DistanceSensor', 'TouchSensor', 'LightSensor', 'GPS', 'Compass', 'Lidar')
for _name in sorted(_DEVICE_NAMES):
    _d = robot.getDevice(_name)
    if type(_d).__name__ in _AUTO_ENABLE and not _d.getSamplingPeriod():
        _d.enable(timeStep)

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

# === CAMERA (enabled on demand) ===
# The server has no GPU: every camera frame is drawn by the CPU (llvmpipe). With a textured object in view a frame
# took seconds and the whole simulation crawled (real-time factor 0.98 -> 0.01, measured 2026-10-28), for images
# nobody looked at (the LiemsStudio robot window shows none). So the camera starts off and is enabled when a robot
# window asks for images (CAMERA_SETTINGS) or the student's program enables it itself.
camera = None
cam_name = ""
cam_active = False
for n in ["camera", "Camera", "cam"]:
    try:
        c = _device(n)
        if c:
            camera = c
            cam_name = n
            break
    except:
        pass

def camera_on():
    global cam_active
    if camera and not cam_active:
        camera.enable(timeStep * 4)  # Lower camera rate: 4x timestep
        cam_active = True

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
        if m:
            # A Webots world reset restores the native motor's position target,
            # while getTargetPosition() in libController can still cache inf.
            # Restore velocity control with every drive command, even at zero.
            m.setPosition(float('inf'))
            m.setVelocity(-lv)
    for m in right_motors:
        if m:
            m.setPosition(float('inf'))
            m.setVelocity(rv)
    for m, p in ((t_left, lp), (t_right, rp)):
        if m:
            m.setPosition(float('inf'))
            m.setVelocity((p / 100.0) * m.getMaxVelocity())

def strafe(s):
    """Sideways at s % (> 0: to the left), for the mecanum wheels of Robot tự lắp. Other wheels just skid."""
    v = (max(-100.0, min(100.0, float(s))) / 100.0) * max_vel
    # mecanum X layout: front-left and back-right turn backwards, the other two forwards (left motors are reversed)
    for m, k in ((w_fl, 1), (w_br, -1), (w_fr, 1), (w_bl, -1)):
        if m:
            m.setPosition(float('inf'))
            m.setVelocity(k * v)

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
    """Absolute compatibility API; Blockly uses lift_relative instead."""
    global _lift_homing
    mm = float(mm)
    if not math.isfinite(mm):
        raise ValueError("Arm position must be a finite number of mm")
    if trucdung:
        trucdung.setVelocity(LIFT_SPEED)
        trucdung.setPosition(max(LIFT_MIN_MM, min(LIFT_MAX_MM, mm)) / 1000.0)
        _lift_homing = False

def lift_home():
    global _lift_homing
    lift_to(LIFT_HOME_MM)
    _lift_homing = True

def wait_for_lift(target):
    """Wait in simulation time, keeping pause/reset/new-code responsive."""
    if not trucdung or not trucdung_sensor:
        raise RuntimeError("Gripper arm motor or position sensor is unavailable")
    started = robot.getTime()
    position = trucdung_sensor.getValue()
    travel = abs(target - position) if math.isfinite(position) else 0.3
    timeout = max(2.0, travel / LIFT_SPEED * 3.0 + 1.0)
    ticks = 0
    while True:
        check_interrupt()
        if my_step() == -1:
            stopped_by_webots()
        ticks += 1
        position = trucdung_sensor.getValue()
        if ticks % status_interval == 0:
            send_status()
        if math.isfinite(position) and abs(position - target) <= 0.0001:
            return position
        if robot.getTime() - started > timeout:
            lift_stop()
            raise RuntimeError("Gripper arm did not reach its target; check for an obstacle")

def lift_relative(mm, direction):
    """Move by a non-negative distance from the measured current height."""
    global _lift_homing
    mm = float(mm)
    if not math.isfinite(mm) or mm < 0:
        raise ValueError("Raise/lower distance must be a finite non-negative number of mm")
    if not trucdung or not trucdung_sensor:
        raise RuntimeError("Gripper arm motor or position sensor is unavailable")
    if _lift_homing:
        wait_for_lift(LIFT_HOME_MM / 1000.0)
        _lift_homing = False
    position = trucdung_sensor.getValue()
    if not math.isfinite(position):
        raise RuntimeError("Gripper arm position is unavailable")
    target = max(LIFT_MIN_MM / 1000.0, min(LIFT_MAX_MM / 1000.0,
                 position + direction * mm / 1000.0))
    lift_to(target * 1000.0)
    wait_for_lift(target)

def lift_move(direction):
    """Velocity control for arm — speed scales with arm_speed (ARM_SPEED:xx)."""
    global _lift_homing
    if not trucdung: return
    _lift_homing = False
    pos = trucdung_sensor.getValue() if trucdung_sensor else 0.0
    if direction > 0 and pos >= 0.25:
        trucdung.setVelocity(0.0); return
    if direction < 0 and pos <= -0.05:
        trucdung.setVelocity(0.0); return
    vel = (0.5 / 3.0) * (arm_speed / 100.0)  # base reduced 3x, scaled by arm slider
    trucdung.setPosition(float('inf'))
    trucdung.setVelocity(vel * direction)

def lift_stop():
    global _lift_homing
    _lift_homing = False
    if trucdung and trucdung_sensor:
        position = trucdung_sensor.getValue()
        if math.isfinite(position):
            trucdung.setPosition(position)
        else:
            trucdung.setVelocity(0.0)
    elif trucdung:
        trucdung.setVelocity(0.0)

def stop_all():
    stop()
    lift_home()

# === STATE ===
is_playing = True
imported_code = ""
is_code_executed = False
current_state = "IDLE"
run_id = None
next_run_id = None
run_counter = 0
_pending_wwi = deque()
manual_speed = 50
arm_speed = 50
status_interval = 3  # Send status every N steps (not every step!)

def sync_simulation_mode():
    """Use the actual Webots toolbar mode, including external Pause/Fast."""
    global is_playing
    mode = robot.simulationGetMode()
    is_playing = mode != Supervisor.SIMULATION_MODE_PAUSE
    return mode

_terminated = False


def stopped_by_webots():
    """Webots ends this controller (restartController from the editor, reload, quit).

    Leave quietly: the generic STOP_ALL path pauses the whole simulation, which froze the
    /simulation_beta editor every time it restarted this controller (sensor attached, code re-run).
    """
    global _terminated
    _terminated = True
    raise Exception("STOP_ALL")


def my_step():
    # A zero step refreshes mode and WWI while paused without advancing time.
    # Calling a positive step while paused would block until Webots resumes.
    if robot.step(0) == -1:
        return -1
    sync_simulation_mode()
    if not is_playing:
        time.sleep(0.02)
        return 0
    result = robot.step(timeStep)
    sync_simulation_mode()
    return result

def send_ack(command, phase="done", **extra):
    mode = sync_simulation_mode()
    payload = {"command": command, "phase": phase,
               "time": robot.getTime(), "playing": is_playing,
               "mode": mode, "runId": run_id}
    payload.update(extra)
    robot.wwiSendText("ACK:" + json.dumps(payload))

def clear_program():
    global is_code_executed, imported_code, current_state, run_id, next_run_id
    is_code_executed = False
    imported_code = ""
    current_state = "IDLE"
    run_id = next_run_id = None

def initialize_devices():
    """Restore actuator/sensor configuration after Webots resets devices."""
    for motor in [w_fl, w_fr, w_bl, w_br]:
        if motor:
            motor.setPosition(float("inf"))
            motor.setVelocity(0.0)
    if trucdung:
        lift_home()
    for sensor in position_sensors.values():
        sensor.enable(timeStep)
    for sensor in [dist_sensor, accelerometer, gyro, inertial_unit]:
        if sensor:
            sensor.enable(timeStep)
    if camera and cam_active:
        camera.enable(timeStep * 4)

def do_reset():
    mode = sync_simulation_mode()
    clear_program()
    stop_all()
    if tf: tf.setSFVec3f(init_pos)
    if rf: rf.setSFRotation(init_rot)
    if robot_node: robot_node.resetPhysics()
    robot.simulationSetMode(mode)
    if robot.step(0) == -1:
        stopped_by_webots()
    send_ack("RESET")
    send_status()

def do_world_reset():
    """Reset Webots clock/world in-place; preserve PAUSE/REAL_TIME/FAST.

    Supervisor.simulationReset() is applied at the end of a controller step
    and deliberately does not restart controllers. Both flushes use zero
    duration, so even a paused world stays at the actual 0.00 reset time.
    The Robot Window stays open and user Blockly is not touched.
    """
    global cam_counter
    mode = sync_simulation_mode()
    clear_program()
    stop_all()
    robot.simulationSetMode(Supervisor.SIMULATION_MODE_PAUSE)
    robot.simulationReset()
    if robot.step(0) == -1:
        stopped_by_webots()
    initialize_devices()
    cam_counter = 0
    robot.simulationSetMode(mode)
    if robot.step(0) == -1:
        stopped_by_webots()
    send_ack("WORLD_RESET")
    send_status()

# === WWI MESSAGE HANDLER ===
def handle_msg(msg):
    global is_playing, imported_code, is_code_executed, current_state, manual_speed, arm_speed
    global cam_skip, cam_quality, run_id, next_run_id, run_counter

    if msg.startswith("RUN:"):
        try:
            metadata = json.loads(msg[4:])
            value = metadata.get("runId")
            if isinstance(value, str) and re.fullmatch(r"[A-Za-z0-9._:-]{1,100}", value):
                next_run_id = value
        except (ValueError, TypeError, AttributeError):
            pass
        return None

    if msg.startswith("CODE:"):
        run_counter += 1
        run_id = next_run_id or ("studio_" + str(run_counter))
        next_run_id = None
        imported_code = msg[5:]
        is_code_executed = False
        current_state = "RUNNING"
        stop()
        # Replacing a program holds the arm at its current height; Reset/Home
        # alone requests the 0 mm baseline. Preserve pending startup homing.
        if not _lift_homing:
            lift_stop()
        send_ack("CODE", "accepted")
        return "CODE"
    if msg == "CMD:PLAY":
        is_playing = True
        robot.simulationSetMode(Supervisor.SIMULATION_MODE_REAL_TIME)
        robot.step(0)
        send_ack("PLAY")
        send_status()
        return None
    if msg == "CMD:PAUSE":
        is_playing = False
        robot.simulationSetMode(Supervisor.SIMULATION_MODE_PAUSE)
        robot.step(0)
        send_ack("PAUSE")
        send_status()
        return None
    if msg == "CMD:RESET":
        do_reset()
        return "RESET"
    if msg == "CMD:WORLD_RESET":
        do_world_reset()
        return "WORLD_RESET"
    if msg == "CMD:HOME":
        lift_home(); stop(); current_state = "IDLE"
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
        camera_on()   # a robot window with a camera view is open
        try:
            s = json.loads(msg[16:])
            cam_skip = s.get("frameSkip", 10)
            cam_quality = s.get("quality", 35)
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
    # R2023b's native text reader holds one shared batch cursor. A handler's
    # step(0) resets that cursor; wwiSendText() also flushes native requests.
    # Copy the whole batch BEFORE a handler can step/send, then process our own
    # FIFO. Preserve its unhandled tail across NEW_CODE / RESET interruption.
    while True:
        msg = robot.wwiReceiveText()
        if msg is None:
            break
        if msg:
            _pending_wwi.append(msg)
    got_code = got_reset = False
    while _pending_wwi:
        msg = _pending_wwi.popleft()
        kind = handle_msg(msg)
        if kind == "CODE":
            got_code = True
            if raise_int: raise Exception("NEW_CODE")
        elif kind in ("RESET", "WORLD_RESET"):
            got_reset = True
            if raise_int: raise Exception(kind)
    return got_code, got_reset

def check_interrupt():
    drain_wwi(raise_int=True)
    sync_simulation_mode()
    while not is_playing:
        if robot.step(0) == -1:
            stopped_by_webots()
        time.sleep(0.02)
        sync_simulation_mode()
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

    mode = sync_simulation_mode()
    status = {
        "time": round(robot.getTime(), 2),
        "state": current_state,
        "distance": dist,
        "joints": joints,
        "motors": motors,
        "revision": "studio-home-zero-20261008",
        "lift_mm": lift_mm,
        "imu": get_imu_data(),
        "playing": is_playing,
        "mode": mode,
        "runId": run_id,
        "protocol": "LiemsStudio/2",
        "capabilities": {"trace": True, "worldReset": True}
    }
    robot.wwiSendText("STATUS:" + json.dumps(status))

    # Camera — sent less frequently, only once someone asked for it
    if camera and cam_active:
        cam_counter += 1
        if cam_counter >= cam_skip:
            cam_counter = 0
            b64 = get_cam_b64()
            if b64:
                robot.wwiSendText(f"CAMERA:{cam_name}:{b64}")

# === ROBOT PROXY (for user CODE execution) ===
class RobotProxy:
    def __getattr__(self, name): return getattr(robot, name)
    def step(self, ts):
        return my_step()
    def go_forward(self, speed): go_fwd(speed)
    def go_backward(self, speed): go_bwd(speed)
    def turn_left(self, speed): turn_l(speed)
    def turn_right(self, speed): turn_r(speed)
    def strafe_left(self, speed): strafe(clamp(speed))       # Robot tự lắp với bánh mecanum: đi ngang
    def strafe_right(self, speed): strafe(-clamp(speed))
    def lift_up(self, mm=250): lift_relative(mm, 1)
    def lift_down(self, mm=50): lift_relative(mm, -1)
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
robot.strafe_left = myRobot.strafe_left
robot.strafe_right = myRobot.strafe_right
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
    if my_step() == -1:
        stopped_by_webots()

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


# === ERRORS IN THE STUDENT'S PROGRAM ===
PROGRAM_NAME = "robot_controller.py"   # file name shown in tracebacks, for code from the IDE or the robot window

def explain_error(e):
    """'dòng 4: AttributeError: robot không có lệnh 'turn_lefft' - có phải ý bạn là robot.turn_left?'

    The bare str(e) gave no line and named the Webots class ("'Supervisor' object has no attribute ...").
    Python 3.9 on the server: AttributeError / NameError have no .name yet, so the name comes from the message.
    """
    import difflib, traceback
    line = e.lineno if isinstance(e, SyntaxError) else None
    if line is None:
        for frame in traceback.extract_tb(e.__traceback__):
            if frame.filename == PROGRAM_NAME:
                line = frame.lineno
    msg = e.msg if isinstance(e, SyntaxError) and e.msg else str(e)   # without "(robot_controller.py, line 4)"
    hint = ""
    m = re.search(r"object has no attribute '(\w+)'", msg)
    if isinstance(e, AttributeError) and m and ("'Supervisor'" in msg or "'RobotProxy'" in msg):
        msg = f"robot không có lệnh '{m.group(1)}'"
        commands = [n for n in vars(RobotProxy) if not n.startswith("_") and n != "step"]
        close = difflib.get_close_matches(m.group(1), commands, n=1)
        if close:
            hint = f" - có phải ý bạn là robot.{close[0]}?"
    m = re.search(r"name '(\w+)' is not defined", msg)
    if isinstance(e, NameError) and m:
        msg = f"chưa có '{m.group(1)}' (chưa gán giá trị, hoặc gõ sai tên)"
        close = difflib.get_close_matches(m.group(1), ["delay", "stop_all", "stop", "while_tick", "robot", "print", "range"], n=1)
        if close:
            hint = f" - có phải ý bạn là {close[0]}?"
    where = f"dòng {line}: " if line else ""
    return f"{where}{type(e).__name__}: {msg}{hint}"


# === MAIN LOOP ===
def run(program_file="robot_controller.py"):
    """Run program_file once at start, then keep serving Robot Window / Digital Twin.

    The program is executed exactly like a CODE: message, so a new CODE: from
    the Digital Twin panel interrupts it and runs instead.
    """
    global is_playing, imported_code, is_code_executed, current_state, run_id

    sync_simulation_mode()
    robot.wwiSendText("STATUS:READY")
    send_status()
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
        if got_code and imported_code:
            current_state = "RUNNING"
        if got_reset:
            pass

        if is_playing and imported_code and not is_code_executed:
            is_code_executed = True
            try:
                # Fresh program namespace is an in-place runtime restart;
                # user variables never leak into the controller protocol.
                program_globals = {key: value for key, value in globals().items()
                                   if key != "_pending_wwi"}
                exec(compile(imported_code, PROGRAM_NAME, "exec"), program_globals)
                imported_code = ""
                current_state = "IDLE"
                send_ack("CODE", "complete")
                run_id = None
                send_status()
            except Exception as e:
                if _terminated:
                    break
                if str(e) not in ("NEW_CODE", "RESET", "WORLD_RESET", "STOP_ALL"):
                    explained = explain_error(e)
                    print(f"[{robot_name}] LỖI {explained}", file=sys.stderr)
                    robot.wwiSendText("ERROR:" + explained)
                # NEW_CODE: the new program (already stored by handle_msg) must run next,
                # so do not pause; RESET already restarted the robot.
                if str(e) not in ("RESET", "WORLD_RESET", "NEW_CODE"):
                    is_playing = False
                    current_state = "IDLE"
                    stop()
                    robot.simulationSetMode(Supervisor.SIMULATION_MODE_PAUSE)
                    robot.step(0)
                    imported_code = ""
                    send_ack("CODE", "stopped" if str(e) == "STOP_ALL" else "error")
                    run_id = None
                    send_status()
