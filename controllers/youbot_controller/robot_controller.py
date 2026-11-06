# ROBOT KUKA youBot
# Robot làm chuỗi động tác gắp hộp, sau đó điều khiển được bằng bàn phím.
# Nhớ bấm chuột vào khung 3D trước khi bấm phím.
#
# Các lệnh:
#   go_forward()  go_backward()  turn_left()  turn_right()  strafe_left()  strafe_right()  stop()
#   arm_height(FRONT_FLOOR)   độ cao tay máy: FRONT_FLOOR, FRONT_PLATE, FRONT_CARDBOARD_BOX, RESET,
#                             BACK_PLATE_HIGH, BACK_PLATE_LOW
#   arm_side(FRONT)           hướng tay máy: FRONT, FRONT_LEFT, FRONT_RIGHT, LEFT, RIGHT, BACK_LEFT, BACK_RIGHT
#   grip()  release()         nắm, mở tay gắp
#   delay(giay)               chờ
#   demo()                    chuỗi động tác có sẵn
#   keyboard_control()        điều khiển bằng bàn phím

demo()
keyboard_control()
