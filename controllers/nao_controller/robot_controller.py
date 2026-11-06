# ROBOT NAO
# Nao vẫy tay tới khi bạn bấm một phím, sau đó điều khiển được bằng bàn phím.
# Nhớ bấm chuột vào khung 3D trước khi bấm phím. Phím H in danh sách phím.
#
# Các lệnh:
#   play("TaiChi")           bắt đầu một động tác
#   play_and_wait("TaiChi")  làm một động tác và chờ xong
#   loop("HandWave")         lặp một động tác
#   wait_key()               chờ người dùng bấm phím
#   delay(giay)              chờ
#   set_leds(0xff0000)       đổi màu đèn
#   keyboard_control()       điều khiển bằng bàn phím
#
# Tên động tác: HandWave, Forwards50, Backwards, SideStepLeft, SideStepRight,
#               TurnLeft60, TurnRight60, TaiChi, WipeForehead

loop("HandWave")
wait_key()
keyboard_control()
