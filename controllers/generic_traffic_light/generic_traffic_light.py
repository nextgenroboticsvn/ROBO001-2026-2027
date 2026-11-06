#!/usr/bin/env python3
"""Đèn giao thông đơn. Tham số: thời gian đỏ, thời gian xanh, trạng thái đầu (r, g, or, og)."""
import sys

from controller import Robot

TIME_STEP = 512
ORANGE_TIME = 1.5
NEXT = {"g": "or", "or": "r", "r": "og", "og": "g"}

robot = Robot()
args = sys.argv[1:]
red_time = float(args[0]) if len(args) > 0 else 20.0
green_time = float(args[1]) if len(args) > 1 else red_time if len(args) == 1 else 20.0
state = args[2] if len(args) > 2 and args[2] in NEXT else "g"

lights = {"r": robot.getDevice("red light"), "o": robot.getDevice("orange light"), "g": robot.getDevice("green light")}
NAMES = {"r": "red", "o": "orange", "g": "green"}


def show(light, on=1):
    lights[light].set(on)
    if on:
        robot.setCustomData(NAMES[light])


show(state[0])
changed_at = 0.0
while robot.step(TIME_STEP) != -1:
    duration = {"g": green_time, "r": red_time}.get(state, ORANGE_TIME)
    if robot.getTime() - changed_at >= duration:
        show(state[0], 0)
        state = NEXT[state]
        show(state[0])
        changed_at = robot.getTime()
