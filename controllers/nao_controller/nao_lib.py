"""Thư viện điều khiển robot NAO (chuyển từ controller C sang Python để chạy trên web).

Học sinh không cần sửa file này. Viết chương trình trong robot_controller.py.
"""
import os
import sys

from controller import Keyboard, Motion, Robot

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace", line_buffering=True)

HERE = os.path.dirname(os.path.abspath(__file__))
MOTIONS = os.path.normpath(os.path.join(HERE, "..", "..", "motions"))
PHALANX_MAX = 8

robot = Robot()
time_step = int(robot.getBasicTimeStep())
keyboard = robot.getKeyboard()
keyboard.enable(10 * time_step)

# Camera tốn tài nguyên trên server nên không bật sẵn, chỉ bật khi cần in ảnh.
camera_top = robot.getDevice("CameraTop")
camera_bottom = robot.getDevice("CameraBottom")


def _sensor(name):
    device = robot.getDevice(name)
    device.enable(time_step)
    return device


accelerometer = _sensor("accelerometer")
gyro = _sensor("gyro")
gps = _sensor("gps")
inertial_unit = _sensor("inertial unit")
sonar_left = _sensor("Sonar/Left")
sonar_right = _sensor("Sonar/Right")
fsr_left = _sensor("LFsr")
fsr_right = _sensor("RFsr")
bumpers = [_sensor(n) for n in ("LFoot/Bumper/Left", "LFoot/Bumper/Right",
                                "RFoot/Bumper/Left", "RFoot/Bumper/Right")]
leds = [robot.getDevice(n) for n in ("ChestBoard/Led", "RFoot/Led", "LFoot/Led", "Face/Led/Right",
                                     "Face/Led/Left", "Ears/Led/Right", "Ears/Led/Left")]
phalanges = []
for i in range(1, PHALANX_MAX + 1):
    for side in "LR":
        motor = robot.getDevice(f"{side}Phalanx{i}")
        if motor:
            phalanges.append(motor)

_motions = {}
_playing = None


def _motion(name):
    if name not in _motions:
        _motions[name] = Motion(os.path.join(MOTIONS, name + ".motion"))
        if not _motions[name].isValid():
            raise ValueError(f"Không có động tác '{name}'. Xem danh sách trong robot_controller.py")
    return _motions[name]


def delay(seconds):
    """Chờ theo thời gian mô phỏng."""
    end = robot.getTime() + seconds
    while robot.getTime() < end:
        if robot.step(time_step) == -1:
            sys.exit(0)


def play(name):
    """Bắt đầu một động tác rồi chạy tiếp ngay, không chờ động tác xong."""
    global _playing
    if _playing:
        _playing.stop()
    motion = _motion(name)
    motion.play()
    _playing = motion


def play_and_wait(name):
    """Thực hiện một động tác và chờ tới khi xong."""
    play(name)
    # Không dùng isOver(): bản Python R2025a thiếu restype nên trả về kết quả sai.
    while _playing.getTime() < _playing.getDuration():
        if robot.step(time_step) == -1:
            sys.exit(0)


def loop(name):
    """Lặp một động tác cho tới khi có động tác khác."""
    _motion(name).setLoop(True)
    play(name)


def wait_key():
    """Chờ tới khi người dùng bấm phím, rồi dừng lặp động tác."""
    global _pending_key
    key = -1
    while key <= 0:
        if robot.step(time_step) == -1:
            sys.exit(0)
        key = keyboard.getKey()
    if _playing:
        _playing.setLoop(False)
    _pending_key = key
    return key


def set_leds(rgb):
    """Đặt màu đèn: 0xff0000 đỏ, 0x00ff00 xanh lá, 0x0000ff xanh dương, 0 tắt."""
    for led in leds[:5]:
        led.set(rgb)
    leds[5].set(rgb & 0xff)
    leds[6].set(rgb & 0xff)


def set_hands(angle):
    """Mở tay với angle = 0.96, nắm tay với angle = 0."""
    for motor in phalanges:
        motor.setPosition(max(motor.getMinPosition(), min(motor.getMaxPosition(), angle)))


def print_sensors(kind):
    if kind == "sonar":
        print(f"Siêu âm: trái {sonar_left.getValue():.2f} m, phải {sonar_right.getValue():.2f} m")
    elif kind == "accelerometer":
        print("Gia tốc [x y z]:", [round(v, 3) for v in accelerometer.getValues()])
    elif kind == "gyro":
        print("Con quay [x y]:", [round(v, 3) for v in gyro.getValues()[:2]])
    elif kind == "gps":
        print("Vị trí [x y z]:", [round(v, 3) for v in gps.getValues()])
    elif kind == "imu":
        print("Roll/pitch/yaw:", [round(v, 3) for v in inertial_unit.getRollPitchYaw()])
    elif kind == "foot":
        print("Lực bàn chân: trái", [round(v, 1) for v in fsr_left.getValues()[:3]],
              "phải", [round(v, 1) for v in fsr_right.getValues()[:3]])
    elif kind == "bumper":
        print("Công tắc chân:", [int(b.getValue()) for b in bumpers])


def print_camera(camera):
    """Bật camera đúng một lần để in ảnh mức xám thu nhỏ, rồi tắt ngay."""
    camera.enable(time_step)
    robot.step(time_step)
    image = camera.getImage()
    width, height = camera.getWidth(), camera.getHeight()
    for y in range(0, height, 2):
        print("".join(str(int(camera.imageGetGray(image, width, x, y) * 9 / 255)) for x in range(0, width, 2)))
    camera.disable()


_SHIFT = Keyboard.SHIFT
_KEYS_WASD = {ord("A"): "SideStepLeft", ord("D"): "SideStepRight", ord("W"): "Forwards50", ord("S"): "Backwards"}
_KEYS_ARROWS = {Keyboard.LEFT: "SideStepLeft", Keyboard.RIGHT: "SideStepRight",
                Keyboard.UP: "Forwards50", Keyboard.DOWN: "Backwards"}
_pending_key = -1


def print_help(arrows=False):
    print("----- Robot NAO -----")
    print("Bấm vào khung 3D rồi dùng bàn phím:")
    print("[Mũi tên]: đi tới/lùi/bước ngang" if arrows else "[W][S]: đi tới/lùi   [A][D]: bước ngang trái/phải")
    print("[Shift + mũi tên trái/phải]: quay trái/phải")
    print("[T]: tai chi   [Q]: lau trán   [PageUp][PageDown]: mở/nắm tay   [7][8][9][0]: đổi màu đèn")
    print("[U]: siêu âm   [G]: con quay   [I]: góc nghiêng   [F]: lực bàn chân   [B]: công tắc chân")
    print("[Home][End]: in ảnh camera trên/dưới   [H]: in lại hướng dẫn")


def run_command(key, arrows=False):
    moves = _KEYS_ARROWS if arrows else _KEYS_WASD
    if key in moves:
        play(moves[key])
    elif key == _SHIFT | Keyboard.LEFT:
        play("TurnLeft60")
    elif key == _SHIFT | Keyboard.RIGHT:
        play("TurnRight60")
    elif key == ord("T"):
        play("TaiChi")
    elif key == ord("Q"):
        play("WipeForehead")
    elif key == Keyboard.PAGEUP:
        set_hands(0.96)
    elif key == Keyboard.PAGEDOWN:
        set_hands(0.0)
    elif key == ord("7"):
        set_leds(0xff0000)
    elif key == ord("8"):
        set_leds(0x00ff00)
    elif key == ord("9"):
        set_leds(0x0000ff)
    elif key == ord("0"):
        set_leds(0)
    elif key == ord("U"):
        print_sensors("sonar")
    elif key == ord("G"):
        print_sensors("gyro")
    elif key == ord("I"):
        print_sensors("imu")
    elif key == ord("F"):
        print_sensors("foot")
    elif key == ord("B"):
        print_sensors("bumper")
    elif key == Keyboard.HOME:
        print_camera(camera_top)
    elif key == Keyboard.END:
        print_camera(camera_bottom)
    elif key == ord("H"):
        print_help(arrows)


def keyboard_control(arrows=False):
    """Điều khiển robot bằng bàn phím cho tới khi tắt mô phỏng."""
    global _pending_key
    print_help(arrows)
    key = _pending_key
    _pending_key = -1
    while True:
        if key > 0:
            run_command(key, arrows)
        if robot.step(time_step) == -1:
            sys.exit(0)
        key = keyboard.getKey()


def run(program_file="robot_controller.py"):
    """Chạy chương trình của học sinh, rồi giữ controller sống để mô phỏng chạy tiếp."""
    path = os.path.join(HERE, program_file)
    with open(path, encoding="utf-8") as f:
        source = f.read()
    exec(compile(source, program_file, "exec"), globals())
    while robot.step(time_step) != -1:
        pass
