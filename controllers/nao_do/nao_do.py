#!/usr/bin/env python3
"""NAO thứ hai: vẫy tay, điều khiển bằng phím mũi tên."""
from nao_lib import keyboard_control, loop, wait_key

loop("HandWave")
wait_key()
keyboard_control(arrows=True)
