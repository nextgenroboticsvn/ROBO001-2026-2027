# BÀI 4 — CẢM BIẾN KHOẢNG CÁCH
# Robot chạy trên đường. Gặp robot sao Hỏa thì dừng, chờ nó đi qua rồi chạy tiếp tới ngã tư.
# dist_sensor.getValue() cho biết khoảng cách tới vật phía trước, tính bằng mm (tối đa 1000).

GAN = 800                   # gần hơn 800 mm là có vật cản

# 1. Chạy cho tới khi thấy robot sao Hỏa
robot.go_forward(50)
while dist_sensor.getValue() > GAN:
    delay(0.05)
stop()
print("Thấy vật cản! Dừng lại chờ.")
delay(0.5)

# 2. Đứng chờ cho tới khi đường trống
while dist_sensor.getValue() < GAN:
    delay(0.05)
print("Đường trống, đi tiếp.")
delay(1)

# 3. Chạy tới khúc cua
robot.go_forward(50)
delay(12.6)

# 4. Ôm cua sang phải: bánh trái quay nhanh hơn bánh phải
set_wheels(53, 47)
delay(24)

# 5. Chạy tới vạch trắng trước ngã tư
robot.go_forward(50)
delay(10.4)
stop()
print("Đã tới ngã tư!")
