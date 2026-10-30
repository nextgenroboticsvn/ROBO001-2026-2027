# =============================================================================
#  CHƯƠNG TRÌNH ĐIỀU KHIỂN ROBOT CLAWBOT — sửa file này
#  Lưu file rồi bấm "reset controller" (hoặc Tải lại Mô phỏng) để chạy lại.
#  Có thể dán đoạn code này vào ô Python Code Editor của Digital Twin và ngược lại.
# =============================================================================

robot.lift_down(0)          # Đưa tay về vị trí thấp trước khi bắt đầu
delay(0.5)

# 1. Nâng tay gắp lên
robot.lift_up(200)          # nâng tới 200mm
delay(2)

# 2. Đi thẳng
robot.go_forward(20)        # tốc độ 20%
delay(4)

# 3. Hạ tay gắp xuống
robot.lift_down(0)
delay(2)

# 4. Đi lùi về chỗ cũ
robot.go_backward(20)       # tốc độ 20%
delay(4)

# Kết thúc: dừng lại và hạ tay về vị trí an toàn
stop_all()

# =============================================================================
#  Các lệnh có sẵn (không cần import):
#    robot.go_forward(toc_do)    # đi thẳng, toc_do 0-100 (%)
#    robot.go_backward(toc_do)   # đi lùi
#    robot.turn_left(toc_do)     # quay trái tại chỗ
#    robot.turn_right(toc_do)    # quay phải tại chỗ
#    stop()                      # dừng bánh xe
#    robot.lift_up(mm)           # nâng tay gắp tới độ cao mm (tối đa 250)
#    robot.lift_down(mm)         # hạ tay gắp tới độ cao mm (thấp nhất -50)
#    robot.lift_to(mm)           # đưa tay gắp tới độ cao mm
#    delay(giay)                 # chờ (giây, theo thời gian mô phỏng)
#    stop_all()                  # dừng bánh xe và đưa tay gắp về 0
# =============================================================================
