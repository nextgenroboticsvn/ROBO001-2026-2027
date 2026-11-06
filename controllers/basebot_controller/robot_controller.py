# ----------- Configuration -----------#
# --- Không thay đổi code phần này --- #
from controller import Robot,Motor,DistanceSensor
from Vex_IQ_Config import *
from Vex_IQ_Motor import *
from Vex_IQ_Claw_Motor import *
from Vex_IQ_DistanceSensorGen2 import *
from Vex_IQ_BrainInertial import *
from Vex_IQ_BumperSwitch import *

USE_SENSOR = True
ROBOT_TYPE = "IQ_Basebot"  # "IQ_Basebot" or "IQ_Simple_Clawbot" or "IQ_Clawbot"

motor_front_left  = IQ_Motor('Wheel_FL', 'Pos_Sensor_FL') 
motor_front_right = IQ_Motor('Wheel_FR', 'Pos_Sensor_FR') 

if ROBOT_TYPE != "IQ_Basebot":
    motor_claw = IQ_Claw_Motor('Left_Claw_Motor', 'Right_Claw_Motor', 'Pos_Sensor_LClaw') 
if ROBOT_TYPE == "IQ_Clawbot":
    motor_arm = IQ_Motor('Arm_Motor', 'Pos_Sensor_Arm')

if USE_SENSOR:
    distance_1     = DistanceSensorGen2('distance sensor')
    bumper_switch  = BumperSwitch('touch sensor', timestep)
    brain_inertial = BrainInertial('gyro', 'accelerometer','inertial unit', timestep)

# ------- Bắt đầu code từ đây ------- #

# 1: Các hàm sử dụng
def ForwardOneStep():
    # Đặt tốc độ cho 2 Motor 
    motor_front_right.set_velocity(40, RPM)
    motor_front_left.set_velocity(40, RPM)
    # Đặt hướng xoay bánh xe của 2 motor sao cho xe đi về phía trước
    motor_front_right.spin(FORWARD)
    motor_front_left.spin(FORWARD)
    # Đặt thời gian để xe chạy
    wait(2.1,SECONDS)
    # Dừng 2 motor
    motor_front_right.stop();
    motor_front_left.stop(); 

def TurnLeft():
    # Đặt tốc độ cho 2 Motor 
    motor_front_right.set_velocity(40, RPM)
    motor_front_left.set_velocity(0, RPM)
    # Đặt hướng xoay bánh xe của 2 motor sao cho xe đi về phía trước
    motor_front_right.spin(FORWARD)
    motor_front_left.spin(FORWARD)
    # Đặt thời gian để xe chạy
    wait(2.1,SECONDS)
    # Dừng 2 motor
    motor_front_right.stop();
    motor_front_left.stop(); 

def TurnRight():
    # Đặt tốc độ cho 2 Motor 
    motor_front_right.set_velocity(0, RPM)
    motor_front_left.set_velocity(40, RPM)
    # Đặt hướng xoay bánh xe của 2 motor sao cho xe đi về phía trước
    motor_front_right.spin(FORWARD)
    motor_front_left.spin(FORWARD)
    # Đặt thời gian để xe chạy
    wait(2.1,SECONDS)
    # Dừng 2 motor
    motor_front_right.stop();
    motor_front_left.stop(); 
 
def BackwardOneStep():
    # Đặt tốc độ cho 2 Motor 
    motor_front_right.set_velocity(40, RPM)
    motor_front_left.set_velocity(40, RPM)
    # Đặt hướng xoay bánh xe của 2 motor sao cho xe đi về phía trước
    motor_front_right.spin(REVERSE)
    motor_front_left.spin(REVERSE)
    # Đặt thời gian để xe chạy
    wait(2.1,SECONDS)
    # Dừng 2 motor
    motor_front_right.stop();
    motor_front_left.stop();    
# NHIỆM VỤ 0: VIẾT TIẾP CODE CHO CÁC HÀM QUAY TRÁI, PHẢI, Ở TRÊN 

# 2: Chương trình 
# Ghép code của các hàm ForwardOneStep, TurnLeft, TurnRight ở trên vào đây để điều khiển xe chạy đến đích

# 3: Vòng lặp
# Vòng lặp điều khiển chính của robot, chạy liên tục
while robot.step(timestep) != -1:
    ForwardOneStep() # NHỚ BỎ DÒNG NÀY ĐI KHI LÀM BÀI
    TurnLeft()
    TurnLeft()
    TurnRight()
    TurnRight()
    
    TurnRight()
    TurnRight()
    TurnLeft()
    TurnLeft()

    pass


# NHIỆM VỤ 1: PHẦN BÀI LÀM

#VÍ DỤ: HIỂN THỊ KHOẢNG CÁCH TỚI VẬT BẰNG CẢM BIẾN KHOẢNG CÁCH
#while robot.step(timestep) != -1:
#    motor_front_right.set_velocity(10, RPM)
#    motor_front_left.set_velocity(10, RPM)
#    motor_front_right.spin(FORWARD)
#    motor_front_left.spin(FORWARD)    
#    #Lấy giá trị khoảng cách từ cảm biến và in ra để coi
#    distance_mm = distance_1.object_distance(MM)
#    print("Distance: {} mm".format(distance_mm))
