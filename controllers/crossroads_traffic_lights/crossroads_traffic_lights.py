#!/usr/bin/env python3
"""Đèn giao thông ngã tư 12 đèn, chia 4 nhóm chạy lần lượt."""
from controller import Robot

TIME_STEP = 64
N_LIGHT = 12
GROUPS = ((0, 1, 6, 7), (3, 4, 9, 10), (2, 8), (5, 11))
ORANGE_AT = (125, 281, 467, 623)   # bước đèn nhóm i chuyển từ xanh sang vàng
RED_AT = (156, 312, 498, 654)      # bước đèn nhóm i chuyển sang đỏ, nhóm sau xanh
CYCLE = 654

robot = Robot()
red = [robot.getDevice(f"red light {i}") for i in range(N_LIGHT)]
orange = [robot.getDevice(f"orange light {i}") for i in range(N_LIGHT)]
green = [robot.getDevice(f"green light {i}") for i in range(N_LIGHT)]


def set_group(lights, group, value):
    for i in group:
        lights[i].set(value)


tick = 0
while robot.step(TIME_STEP) != -1:
    tick += 1
    if tick == 1:
        set_group(green, GROUPS[0], 1)
        for group in GROUPS[1:]:
            set_group(red, group, 1)
    for i, group in enumerate(GROUPS):
        if tick == ORANGE_AT[i]:
            set_group(green, group, 0)
            set_group(orange, group, 1)
        if tick == RED_AT[i]:
            set_group(orange, group, 0)
            if i < 3:
                set_group(red, group, 1)
                next_group = GROUPS[i + 1]
                set_group(red, next_group, 0)
                set_group(green, next_group, 1)
    if tick == CYCLE:
        set_group(red, GROUPS[0], 0)
        tick = 0
