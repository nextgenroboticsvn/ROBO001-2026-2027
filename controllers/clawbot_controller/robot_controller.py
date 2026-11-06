# =============================================================================
#  BÀI 6 — CẢM BIẾN KHOẢNG CÁCH: DÒ VÀ ĐẨY 3 KHỐI HỘP RA KHỎI VÒNG TRÒN
#
#  Robot đứng giữa vòng tròn, xung quanh có 3 khối hộp. Với mỗi hộp, robot:
#    1. Quay tại chỗ, đọc cảm biến để dò hộp.
#    2. Tiến tới sát hộp rồi đẩy hộp ra khỏi vòng tròn.
#    3. Lùi về giữa vòng tròn và dò hộp tiếp theo.
#  Hộp đã bị đẩy ra ngoài nằm xa hơn tầm cảm biến (1 mét) nên robot không thấy lại.
#
#  Lưu file rồi bấm "Tải lại Mô phỏng" để chạy lại.
# =============================================================================

SO_HOP = 3           # số hộp phải đẩy
TOC_DO_QUAY = 20     # quay chậm để không lỡ mất hộp
TOC_DO_DAY = 50      # tốc độ tiến và đẩy (%)
NGUONG_THAY = 950    # đọc nhỏ hơn số này (950 mm) là đã thấy hộp
SAT_HOP = 420        # đọc nhỏ hơn số này là hộp đã ở ngay trước mũi xe
GIAY_DAY = 5         # đẩy thêm bao nhiêu giây để hộp ra khỏi vòng tròn


def tim_hop():
    """Quay tại chỗ cho tới khi cảm biến thấy hộp."""
    robot.turn_right(TOC_DO_QUAY)
    while dist_sensor.getValue() >= NGUONG_THAY:
        delay(0.01)
    delay(0.2)              # quay thêm một chút để nhắm vào giữa hộp
    stop()
    delay(0.5)
    print("Thấy hộp, cách", round(dist_sensor.getValue()), "mm.")


def day_hop():
    """Tiến tới sát hộp, đẩy hộp ra khỏi vòng tròn rồi lùi về giữa vòng."""
    luc_xuat_phat = robot.getTime()
    robot.go_forward(TOC_DO_DAY)
    while dist_sensor.getValue() > SAT_HOP:
        delay(0.01)
    delay(GIAY_DAY)
    stop()
    thoi_gian_di = robot.getTime() - luc_xuat_phat
    delay(1)
    robot.go_backward(TOC_DO_DAY)   # lùi đúng bằng thời gian đã đi
    delay(thoi_gian_di)
    stop()
    delay(0.5)


for hop in range(1, SO_HOP + 1):
    print("Đang dò hộp số", hop)
    tim_hop()
    day_hop()
    print("Đã đẩy xong hộp số", hop)

print("Hoàn thành! Cả", SO_HOP, "hộp đã ra khỏi vòng tròn.")
stop_all()

# =============================================================================
#  Các lệnh có sẵn (không cần import):
#    robot.go_forward(toc_do)    # đi thẳng, toc_do 0-100 (%)
#    robot.go_backward(toc_do)   # đi lùi
#    robot.turn_left(toc_do)     # quay trái tại chỗ
#    robot.turn_right(toc_do)    # quay phải tại chỗ
#    set_wheels(trai, phai)      # đặt riêng tốc độ bánh trái, bánh phải (để đi đường cong)
#    stop()                      # dừng bánh xe
#    robot.lift_up(mm)           # nâng tay gắp tới độ cao mm (tối đa 250)
#    robot.lift_down(mm)         # hạ tay gắp tới độ cao mm (thấp nhất -50)
#    delay(giay)                 # chờ (giây, theo thời gian mô phỏng)
#    stop_all()                  # dừng bánh xe và đưa tay gắp về 0
#    robot.getTime()             # đọc đồng hồ mô phỏng (giây)
#
#  Cảm biến khoảng cách (nhìn thẳng phía trước, tầm xa 1 mét):
#    dist_sensor.getValue()      # 0 đến 1000, chính là khoảng cách tính bằng mm.
#                                # 1000 nghĩa là phía trước không có gì trong tầm 1 mét.
#                                # Cảm biến nằm trên thân xe, sau mũi xe khoảng 350 mm.
# =============================================================================
