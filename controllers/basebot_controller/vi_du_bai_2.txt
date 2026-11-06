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


# -------- Begin project code ------- #
# ------- Bắt đầu code từ đây ------- #

def ForwardOneStep():
    motor_front_right.set_velocity(40, RPM)
    motor_front_left.set_velocity(40, RPM)
    motor_front_right.spin(FORWARD)
    motor_front_left.spin(FORWARD)
    wait(2.1,SECONDS)
    motor_front_right.stop();
    motor_front_left.stop(); 

def TurnLeft():
    motor_front_right.set_velocity(40, RPM)
    motor_front_left.set_velocity(40, RPM)
    motor_front_right.spin(FORWARD)
    motor_front_left.spin(REVERSE)
    wait(1,SECONDS)
    motor_front_right.stop();
    motor_front_left.stop();  

def TurnRight():
    motor_front_right.set_velocity(40, RPM)
    motor_front_left.set_velocity(40, RPM)
    motor_front_right.spin(REVERSE)
    motor_front_left.spin(FORWARD)
    wait(1,SECONDS)
    motor_front_right.stop();
    motor_front_left.stop();  

# Default Version
ForwardOneStep()  
ForwardOneStep()  
TurnLeft()  
ForwardOneStep()
TurnRight()
ForwardOneStep()
ForwardOneStep()
TurnRight()
ForwardOneStep()
TurnLeft() 
ForwardOneStep()

while robot.step(timestep) != -1:

    pass   
# ----------- End project code --------#







