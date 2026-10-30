# =============================================================================
#  ĐỀ 2 — BĂNG QUA NGÃ TƯ CÓ XE CHẠY  (bài tập tìm và sửa lỗi)
#
#  Nhiệm vụ của robot:
#    1. Nâng hàng lên.
#    2. Chạy tới VẠCH DỪNG màu trắng trước ngã tư thứ hai.
#    3. DỪNG LẠI, chờ chiếc xe màu cam chạy qua ngã tư.
#    4. Băng qua ngã tư, chạy tới giữa ngã tư thứ ba.
#    5. Quay PHẢI 90 độ.
#    6. LÙI vào Ô ĐỖ màu xanh.
#    7. Hạ hàng xuống.
#
#  Chương trình dưới đây có 3 LỖI. Hãy chạy thử, đọc thông báo của TRỌNG TÀI
#  trong Console, tìm và sửa lỗi để robot hoàn thành nhiệm vụ.
#  Lưu file rồi bấm "Tải lại Mô phỏng" để chạy lại từ đầu.
# =============================================================================

TOC_DO = 50          # tốc độ chạy (%)
QUAY_90 = 1.6        # số giây để quay được 90 độ ở tốc độ 50

# 1. Nâng hàng
robot.lift_up(150)
delay(1.5)

# 2. Chạy tới vạch dừng
robot.go_forward(TOC_DO)
delay(8.2)

# 3. Chờ xe chạy qua ngã tư
delay(6)

# 4. Băng qua ngã tư, chạy tới ngã tư thứ ba
robot.go_forward(TOC_DO)
delay(13)
stop()

# 5. Quay phải 90 độ
robot.turn_right(TOC_DO)
delay(0.6)
stop()

# 6. Lùi vào ô đỗ
robot.go_backward(-TOC_DO)
delay(7.0)
stop()

# 7. Hạ hàng xuống
robot.lift_down(0)
delay(1.5)
stop_all()

# =============================================================================
#  Các lệnh có sẵn (không cần import):
#    robot.go_forward(toc_do)    # đi thẳng, toc_do 0-100 (%)
#    robot.go_backward(toc_do)   # đi lùi, toc_do 0-100 (%)
#    robot.turn_left(toc_do)     # quay trái tại chỗ
#    robot.turn_right(toc_do)    # quay phải tại chỗ
#    stop()                      # dừng bánh xe
#    robot.lift_up(mm)           # nâng tay gắp tới độ cao mm (tối đa 250)
#    robot.lift_down(mm)         # hạ tay gắp tới độ cao mm (thấp nhất -50)
#    delay(giay)                 # chờ (giây, theo thời gian mô phỏng)
#    stop_all()                  # dừng bánh xe và đưa tay gắp về 0
# =============================================================================
