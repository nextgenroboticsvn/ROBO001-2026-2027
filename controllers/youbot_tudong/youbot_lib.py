"""Thư viện điều khiển robot KUKA youBot (chuyển từ controller C sang Python để chạy trên web).

Học sinh không cần sửa file này. Viết chương trình trong robot_controller.py.
"""
import math
import os
import sys

from controller import Keyboard, Robot

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace", line_buffering=True)

HERE = os.path.dirname(os.path.abspath(__file__))
TIME_STEP = 32
SPEED = 4.0
MAX_SPEED = 0.3
SPEED_INCREMENT = 0.05
WHEEL_RADIUS = 0.05
LX = 0.228
LY = 0.158

# Độ cao tay máy, xếp theo đúng thứ tự để tăng/giảm từng nấc
BACK_PLATE_LOW, BACK_PLATE_HIGH, RESET, FRONT_CARDBOARD_BOX, HANOI_PREPARE, FRONT_PLATE, FRONT_FLOOR = range(7)
_HEIGHTS = {
    FRONT_FLOOR: (-0.97, -1.55, -0.61, 0.0),
    FRONT_PLATE: (-0.62, -0.98, -1.53, 0.0),
    FRONT_CARDBOARD_BOX: (0.0, -0.77, -1.21, 0.0),
    RESET: (1.57, -2.635, 1.78, 0.0),
    BACK_PLATE_HIGH: (0.678, 0.682, 1.74, 0.0),
    BACK_PLATE_LOW: (0.92, 0.42, 1.78, 0.0),
    HANOI_PREPARE: (-0.4, -1.2, -math.pi / 2, math.pi / 2),
}
# Hướng tay máy
BACK_RIGHT, RIGHT, FRONT_RIGHT, FRONT, FRONT_LEFT, LEFT, BACK_LEFT = range(7)
_SIDES = {BACK_LEFT: -2.949, LEFT: -math.pi / 2, FRONT_LEFT: -0.2, FRONT: 0.0,
          FRONT_RIGHT: 0.2, RIGHT: math.pi / 2, BACK_RIGHT: 2.949}

robot = Robot()
keyboard = robot.getKeyboard()
wheels = [robot.getDevice(f"wheel{i}") for i in range(1, 5)]
arm = [robot.getDevice(f"arm{i}") for i in range(1, 6)]
fingers = robot.getDevice("finger::left")
arm[1].setVelocity(0.5)
fingers.setVelocity(0.03)

_vx = _vy = _omega = 0.0
_height = RESET
_side = FRONT


def delay(seconds):
    """Chờ theo thời gian mô phỏng."""
    end = robot.getTime() + seconds
    while robot.getTime() < end:
        if robot.step(TIME_STEP) == -1:
            sys.exit(0)


def set_wheels(speeds):
    for wheel, speed in zip(wheels, speeds):
        wheel.setPosition(float("inf"))
        wheel.setVelocity(speed)


def stop():
    global _vx, _vy, _omega
    set_wheels((0, 0, 0, 0))
    _vx = _vy = _omega = 0.0


def go_forward():
    set_wheels((SPEED, SPEED, SPEED, SPEED))


def go_backward():
    set_wheels((-SPEED, -SPEED, -SPEED, -SPEED))


def turn_left():
    set_wheels((-SPEED, SPEED, -SPEED, SPEED))


def turn_right():
    set_wheels((SPEED, -SPEED, SPEED, -SPEED))


def strafe_left():
    set_wheels((SPEED, -SPEED, -SPEED, SPEED))


def strafe_right():
    set_wheels((-SPEED, SPEED, SPEED, -SPEED))


def move(vx, vy, omega):
    """Đi theo vận tốc: vx tới trước, vy sang trái (m/s), omega quay (rad/s)."""
    k = 1 / WHEEL_RADIUS
    set_wheels((k * (vx + vy + (LX + LY) * omega), k * (vx - vy - (LX + LY) * omega),
                k * (vx - vy + (LX + LY) * omega), k * (vx + vy - (LX + LY) * omega)))
    print(f"Tốc độ: vx={vx:.2f} m/s, vy={vy:.2f} m/s, quay={omega:.2f} rad/s")


def _nudge(dvx=0.0, dvy=0.0, domega=0.0):
    global _vx, _vy, _omega
    limit = lambda v: max(-MAX_SPEED, min(MAX_SPEED, v))
    _vx, _vy, _omega = limit(_vx + dvx), limit(_vy + dvy), limit(_omega + domega)
    move(_vx, _vy, _omega)


def arm_height(height):
    global _height
    for motor, position in zip(arm[1:], _HEIGHTS[height]):
        motor.setPosition(position)
    _height = height


def arm_side(side):
    global _side
    arm[0].setPosition(_SIDES[side])
    _side = side


def arm_reset():
    arm_height(RESET)
    arm_side(FRONT)


def grip():
    fingers.setPosition(0.0)


def release():
    fingers.setPosition(0.025)


def _arm_height_up():
    new = min(_height + 1, FRONT_FLOOR)
    if new == FRONT_FLOOR and _side in (BACK_LEFT, BACK_RIGHT):
        new = _height          # tránh tay máy tự va vào thân
    arm_height(new)


def _arm_height_down():
    arm_height(max(_height - 1, 0))


def _arm_side_up():
    new = min(_side + 1, BACK_LEFT)
    if new == BACK_LEFT and _height == FRONT_FLOOR:
        new = _side
    arm_side(new)


def _arm_side_down():
    new = max(_side - 1, 0)
    if new == BACK_RIGHT and _height == FRONT_FLOOR:
        new = _side
    arm_side(new)


def demo():
    """Chuỗi động tác có sẵn: gắp hộp, đặt lên thân, gắp lại, đặt xuống sàn."""
    delay(2.0)
    release()
    arm_height(FRONT_CARDBOARD_BOX)
    delay(4.0)
    grip()
    delay(1.0)
    arm_height(BACK_PLATE_LOW)
    delay(3.0)
    release()
    delay(1.0)
    arm_reset()
    strafe_left()
    delay(5.0)
    grip()
    stop()
    delay(1.0)
    turn_left()
    delay(1.0)
    stop()
    release()
    arm_height(BACK_PLATE_LOW)
    delay(3.0)
    grip()
    delay(1.0)
    arm_height(RESET)
    delay(2.0)
    arm_height(FRONT_PLATE)
    arm_side(RIGHT)
    delay(4.0)
    arm_height(FRONT_FLOOR)
    delay(2.0)
    release()
    delay(1.0)
    arm_height(FRONT_PLATE)
    delay(2.0)
    arm_height(RESET)
    delay(2.0)
    arm_reset()
    grip()
    delay(2.0)


_S = Keyboard.SHIFT
_ARROW_KEYS = {
    Keyboard.UP: lambda: _nudge(dvx=SPEED_INCREMENT), Keyboard.DOWN: lambda: _nudge(dvx=-SPEED_INCREMENT),
    Keyboard.LEFT: lambda: _nudge(dvy=SPEED_INCREMENT), Keyboard.RIGHT: lambda: _nudge(dvy=-SPEED_INCREMENT),
    Keyboard.PAGEUP: lambda: _nudge(domega=SPEED_INCREMENT), Keyboard.PAGEDOWN: lambda: _nudge(domega=-SPEED_INCREMENT),
    _S | Keyboard.UP: _arm_height_up, _S | Keyboard.DOWN: _arm_height_down,
    _S | Keyboard.RIGHT: _arm_side_up, _S | Keyboard.LEFT: _arm_side_down,
}
_WASD_KEYS = {
    ord("W"): lambda: _nudge(dvx=SPEED_INCREMENT), ord("S"): lambda: _nudge(dvx=-SPEED_INCREMENT),
    ord("A"): lambda: _nudge(dvy=SPEED_INCREMENT), ord("D"): lambda: _nudge(dvy=-SPEED_INCREMENT),
    ord("Q"): lambda: _nudge(domega=SPEED_INCREMENT), ord("E"): lambda: _nudge(domega=-SPEED_INCREMENT),
    _S | ord("W"): _arm_height_up, _S | ord("S"): _arm_height_down,
    _S | ord("D"): _arm_side_up, _S | ord("A"): _arm_side_down,
}
_COMMON_KEYS = {
    ord(" "): lambda: (stop(), arm_reset()), Keyboard.END: lambda: (stop(), arm_reset()),
    ord("+"): grip, 388: grip, 65585: grip, ord("-"): release, 390: release,
    332: _arm_height_up, 326: _arm_height_down, 330: _arm_side_up, 328: _arm_side_down,
}


def press(key, arrows=False):
    """Thực hiện lệnh của một phím."""
    action = (_ARROW_KEYS if arrows else _WASD_KEYS).get(key) or _COMMON_KEYS.get(key)
    if action:
        action()


def keyboard_control(arrows=False):
    """Điều khiển robot bằng bàn phím cho tới khi tắt mô phỏng."""
    print("Bấm chuột vào khung 3D rồi dùng bàn phím:")
    if arrows:
        print(" Mũi tên: di chuyển   PageUp/PageDown: quay   Shift + mũi tên: tay máy")
    else:
        print(" W/S/A/D: di chuyển   Q/E: quay   Shift + W/S/A/D: tay máy")
    print(" +/-: nắm/mở tay gắp   Dấu cách: đặt lại")
    keyboard.enable(TIME_STEP)
    previous = -1
    while robot.step(TIME_STEP) != -1:
        key = keyboard.getKey()
        if key >= 0 and key != previous:
            press(key, arrows)
        previous = key


def run(program_file="robot_controller.py"):
    """Chuẩn bị robot, chạy chương trình của học sinh, rồi giữ controller sống."""
    arm_reset()
    delay(2.0)
    path = os.path.join(HERE, program_file)
    with open(path, encoding="utf-8") as f:
        source = f.read()
    exec(compile(source, program_file, "exec"), globals())
    while robot.step(TIME_STEP) != -1:
        pass
