# =============================================================================
#  CHƯƠNG TRÌNH CỦA ROBOT TỰ LẮP — sửa file này
#  Lưu file rồi bấm "Re-run controller" để chạy lại.
#
#  Robot tự lắp = khung gầm + bánh xe của ClawBot V2. Kéo thả thêm từ thư viện (tab Chuyển động):
#  Khung trục đứng, Càng gắp, các loại bánh khác (to, nhỏ, gai địa hình, mecanum, bánh xích), cảm biến.
#
#  Các lệnh có sẵn (không cần import), giống ClawBot:
#    robot.go_forward(toc_do)    # đi thẳng, toc_do 0-100 (%)
#    robot.go_backward(toc_do)   # đi lùi
#    robot.turn_left(toc_do)     # quay trái tại chỗ
#    robot.turn_right(toc_do)    # quay phải tại chỗ
#    robot.strafe_left(toc_do)   # đi ngang sang trái (chỉ với bánh mecanum)
#    robot.strafe_right(toc_do)  # đi ngang sang phải (chỉ với bánh mecanum)
#    stop()                      # dừng bánh xe
#    robot.lift_up(mm)           # nâng trục đứng (khi đã gắn Khung trục đứng)
#    robot.lift_down(mm)         # hạ trục đứng
#    delay(giay)                 # chờ (giây, theo thời gian mô phỏng)
#    stop_all()                  # dừng bánh xe và đưa trục đứng về 0
#  Cảm biến gắn thêm (đã bật sẵn): robot.getDevice("ds_front").getValue()  (tên in trong Console khi gắn)
#  Camera gắn thêm cần bật trước: robot.getDevice("cam_front").enable(64)
# =============================================================================

robot.go_forward(30)
delay(2)
robot.turn_left(30)
delay(1)
robot.go_forward(30)
delay(2)
stop_all()
