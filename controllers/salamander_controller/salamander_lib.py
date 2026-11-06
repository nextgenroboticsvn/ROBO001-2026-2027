"""Thư viện điều khiển robot kỳ giông (chuyển từ controller C sang Python để chạy trên web).

Học sinh không cần sửa file này. Viết chương trình trong robot_controller.py.
"""
import math
import os
import sys

from controller import Keyboard, Robot

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace", line_buffering=True)

HERE = os.path.dirname(os.path.abspath(__file__))
CONTROL_STEP = 32
NUM_MOTORS = 10
WATER_LEVEL = 0.5
FREQUENCY = 1.4
WALK_AMPL = 0.6
SWIM_AMPL = 1.0
_WALK_SHAPE = (-0.7, 1, 1, 0, -1, -1)
MOTOR_NAMES = ("motor_1", "motor_2", "motor_3", "motor_4", "motor_5", "motor_6",
               "motor_leg_1", "motor_leg_2", "motor_leg_3", "motor_leg_4")

robot = Robot()
motors = [robot.getDevice(n) for n in MOTOR_NAMES]
limits = [(m.getMinPosition(), m.getMaxPosition()) for m in motors]
ds_left = robot.getDevice("ds_left")
ds_right = robot.getDevice("ds_right")
gps = robot.getDevice("gps")
ds_left.enable(CONTROL_STEP)
ds_right.enable(CONTROL_STEP)
gps.enable(CONTROL_STEP)
keyboard = robot.getKeyboard()
keyboard.enable(CONTROL_STEP)

state = {"spine": 0.0, "ampl": 1.0, "phase": 0.0, "control": "auto", "swimming": False}
_targets = [0.0] * NUM_MOTORS
_previous_key = 0


def _clamp(value, low, high):
    if low == 0 and high == 0:     # khớp không giới hạn
        return value
    return max(low, min(high, value))


def _read_keyboard():
    global _previous_key
    key = keyboard.getKey()
    if key == _previous_key:
        return
    if key == Keyboard.LEFT:
        state["control"] = "keyboard"
        if state["spine"] > -0.4:
            state["spine"] -= 0.1
        print(f"Độ lệch sống lưng: {state['spine']:.1f}")
    elif key == Keyboard.RIGHT:
        state["control"] = "keyboard"
        if state["spine"] < 0.4:
            state["spine"] += 0.1
        print(f"Độ lệch sống lưng: {state['spine']:.1f}")
    elif key == Keyboard.UP:
        if state["ampl"] < 1.5:
            state["ampl"] += 0.2
        print(f"Biên độ: {state['ampl']:.1f}")
    elif key == Keyboard.DOWN:
        if state["ampl"] > -1.5:
            state["ampl"] -= 0.2
        print(f"Biên độ: {state['ampl']:.1f}")
    elif key == ord("A"):
        state["control"] = "auto"
        print("Tự lái.")
    elif key == ord(" "):
        state["control"] = "stop"
        print("Dừng.")
    _previous_key = key


def _compute_motion():
    state["phase"] -= CONTROL_STEP / 1000.0 * FREQUENCY * 2.0 * math.pi
    phase = state["phase"]
    elevation = gps.getValues()[2]

    if state["swimming"] and elevation > WATER_LEVEL - 0.003:
        state["swimming"] = False
        state["phase"] = phase = _targets[6]
    elif not state["swimming"] and elevation < WATER_LEVEL - 0.015:
        state["swimming"] = True
        back = phase - math.fmod(phase, 2.0 * math.pi) - math.pi / 2
        for i in range(6, NUM_MOTORS):
            _targets[i] = back

    spine, ampl = state["spine"], state["ampl"]
    if state["swimming"]:      # dưới nước: thân uốn thành sóng
        for i in range(6):
            _targets[i] = SWIM_AMPL * ampl * math.sin(phase + i * (2 * math.pi / 6)) * ((i + 5) / 10.0) + spine
    else:                      # trên cạn: thân uốn chữ S, chân quay
        for i in range(6):
            _targets[i] = WALK_AMPL * ampl * _WALK_SHAPE[i] * math.sin(phase) + spine
        _targets[6] = phase
        _targets[7] = phase + math.pi
        _targets[8] = phase + math.pi
        _targets[9] = phase


def step_robot():
    """Một bước điều khiển. Trả về False khi mô phỏng kết thúc."""
    if robot.step(CONTROL_STEP) == -1:
        return False
    _read_keyboard()
    if state["control"] == "auto":
        state["spine"] = ds_right.getValue() - ds_left.getValue()   # cảm biến quyết định hướng rẽ
    if state["control"] != "stop":
        _compute_motion()
    for i, motor in enumerate(motors):
        _targets[i] = _clamp(_targets[i], *limits[i])
        motor.setPosition(_targets[i])
    return True


def walk_and_swim():
    """Kỳ giông tự bò, tự bơi khi xuống nước, né vật theo cảm biến. Có thể lái bằng bàn phím."""
    print("----- Robot kỳ giông -----")
    print("Bấm chuột vào khung 3D rồi dùng bàn phím:")
    print(" Mũi tên trái/phải: rẽ   Mũi tên lên/xuống: tăng/giảm biên độ")
    print(" Dấu cách: dừng   A: quay lại tự lái")
    while step_robot():
        pass


def run(program_file="robot_controller.py"):
    path = os.path.join(HERE, program_file)
    with open(path, encoding="utf-8") as f:
        source = f.read()
    exec(compile(source, program_file, "exec"), globals())
    while robot.step(CONTROL_STEP) != -1:
        pass
