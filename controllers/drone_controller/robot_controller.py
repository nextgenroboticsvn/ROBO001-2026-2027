# DRONE MAVIC 2 PRO
# Drone cất cánh lên 3 mét, sau đó điều khiển được bằng bàn phím.
# Nhớ bấm chuột vào khung 3D trước khi bấm phím.
#
# Các lệnh:
#   take_off(do_cao)          cất cánh và chờ tới độ cao đó (mét)
#   go_forward(giay)          bay tới trong một khoảng thời gian
#   turn(giay)                quay trái; turn(giay, -1.3) để quay phải
#   delay(giay)               bay giữ nguyên trong một khoảng thời gian
#   get_altitude()            đọc độ cao hiện tại
#   keyboard_control()        điều khiển bằng bàn phím

take_off(3)
keyboard_control()
