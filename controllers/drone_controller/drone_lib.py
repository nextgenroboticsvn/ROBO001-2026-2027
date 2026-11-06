"""Thư viện điều khiển drone DJI Mavic 2 Pro (chuyển từ controller C sang Python để chạy trên web).

Học sinh không cần sửa file này. Viết chương trình trong robot_controller.py.
Camera không bật: render camera trong thành phố rất nặng trên server không có GPU.
"""
import os
import sys

from controller import Keyboard, Robot

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace", line_buffering=True)

HERE = os.path.dirname(os.path.abspath(__file__))
K_VERTICAL_THRUST = 68.5    # lực nâng để drone cất cánh
K_VERTICAL_OFFSET = 0.6
K_VERTICAL_P = 3.0
K_ROLL_P = 50.0
K_PITCH_P = 30.0

robot = Robot()
timestep = int(robot.getBasicTimeStep())
led_left = robot.getDevice("front left led")
led_right = robot.getDevice("front right led")
imu = robot.getDevice("inertial unit")
gps = robot.getDevice("gps")
gyro = robot.getDevice("gyro")
imu.enable(timestep)
gps.enable(timestep)
gyro.enable(timestep)
keyboard = robot.getKeyboard()
keyboard.enable(timestep)
camera_roll = robot.getDevice("camera roll")
camera_pitch = robot.getDevice("camera pitch")
motors = [robot.getDevice(n) for n in ("front left propeller", "front right propeller",
                                       "rear left propeller", "rear right propeller")]
for motor in motors:
    motor.setPosition(float("inf"))
    motor.setVelocity(1.0)

# Lệnh bay hiện tại. fly_step() đọc các giá trị này.
command = {"altitude": 1.0, "forward": 0.0, "turn": 0.0, "side": 0.0}


def _clamp(value, low, high):
    return max(low, min(high, value))


def get_altitude():
    """Độ cao hiện tại của drone (mét)."""
    return gps.getValues()[2]


def fly_step():
    """Một bước giữ thăng bằng và bay theo command. Trả về False khi mô phỏng kết thúc."""
    if robot.step(timestep) == -1:
        return False
    roll, pitch, _ = imu.getRollPitchYaw()
    roll_velocity, pitch_velocity, _ = gyro.getValues()

    state = int(robot.getTime()) % 2
    led_left.set(state)
    led_right.set(1 - state)
    camera_roll.setPosition(-0.115 * roll_velocity)
    camera_pitch.setPosition(-0.1 * pitch_velocity)

    roll_input = K_ROLL_P * _clamp(roll, -1.0, 1.0) + roll_velocity + command["side"]
    pitch_input = K_PITCH_P * _clamp(pitch, -1.0, 1.0) + pitch_velocity + command["forward"]
    yaw_input = command["turn"]
    difference = _clamp(command["altitude"] - get_altitude() + K_VERTICAL_OFFSET, -1.0, 1.0)
    base = K_VERTICAL_THRUST + K_VERTICAL_P * difference ** 3

    motors[0].setVelocity(base - roll_input + pitch_input - yaw_input)
    motors[1].setVelocity(-(base + roll_input + pitch_input + yaw_input))
    motors[2].setVelocity(-(base - roll_input - pitch_input + yaw_input))
    motors[3].setVelocity(base + roll_input - pitch_input - yaw_input)
    return True


def delay(seconds):
    """Bay giữ nguyên lệnh hiện tại trong một khoảng thời gian."""
    end = robot.getTime() + seconds
    while robot.getTime() < end:
        if not fly_step():
            sys.exit(0)


def take_off(altitude=1.0):
    """Cất cánh và chờ tới khi lên gần độ cao mong muốn."""
    command["altitude"] = altitude
    while True:
        if not fly_step():
            sys.exit(0)
        if get_altitude() >= altitude - 0.15:     # ở bước đầu GPS chưa có số (nan), so sánh sẽ sai
            break


def go_forward(seconds, strength=2.0):
    command["forward"] = -strength
    delay(seconds)
    command["forward"] = 0.0


def turn(seconds, strength=1.3):
    """strength dương quay trái, âm quay phải."""
    command["turn"] = strength
    delay(seconds)
    command["turn"] = 0.0


def keyboard_control():
    """Điều khiển drone bằng bàn phím cho tới khi tắt mô phỏng."""
    print("Bấm chuột vào khung 3D rồi dùng bàn phím:")
    print(" Mũi tên lên/xuống: bay tới/lùi   Mũi tên trái/phải: quay")
    print(" Shift + lên/xuống: tăng/giảm độ cao   Shift + trái/phải: bay ngang")
    shift = Keyboard.SHIFT
    while True:
        command["forward"] = command["turn"] = command["side"] = 0.0
        key = keyboard.getKey()
        while key > 0:
            if key == Keyboard.UP:
                command["forward"] = -2.0
            elif key == Keyboard.DOWN:
                command["forward"] = 2.0
            elif key == Keyboard.RIGHT:
                command["turn"] = -1.3
            elif key == Keyboard.LEFT:
                command["turn"] = 1.3
            elif key == shift + Keyboard.RIGHT:
                command["side"] = -1.0
            elif key == shift + Keyboard.LEFT:
                command["side"] = 1.0
            elif key == shift + Keyboard.UP:
                command["altitude"] += 0.05
                print(f"Độ cao mong muốn: {command['altitude']:.2f} m")
            elif key == shift + Keyboard.DOWN:
                command["altitude"] -= 0.05
                print(f"Độ cao mong muốn: {command['altitude']:.2f} m")
            key = keyboard.getKey()
        if not fly_step():
            sys.exit(0)


def run(program_file="robot_controller.py"):
    path = os.path.join(HERE, program_file)
    with open(path, encoding="utf-8") as f:
        source = f.read()
    exec(compile(source, program_file, "exec"), globals())
    while fly_step():      # chương trình xong thì drone vẫn giữ độ cao
        pass
