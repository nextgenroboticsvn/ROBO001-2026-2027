#!/usr/bin/env python3
"""Điểm khởi động controller Basebot. KHÔNG cần sửa file này.

Hãy viết chương trình trong robot_controller.py, lưu lại rồi bấm "Tải lại Mô phỏng".
Các file vi_du_bai_N.txt là đề mẫu, chép nội dung vào robot_controller.py để chạy.
"""
import os

_here = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(_here, "robot_controller.py"), encoding="utf-8") as _f:
    exec(compile(_f.read(), "robot_controller.py", "exec"), globals())
