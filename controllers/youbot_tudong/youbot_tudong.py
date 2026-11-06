#!/usr/bin/env python3
"""youBot thứ hai: chạy chuỗi động tác rồi điều khiển bằng phím mũi tên."""
from youbot_lib import arm_reset, delay, demo, keyboard_control

arm_reset()
delay(2.0)
demo()
keyboard_control(arrows=True)
