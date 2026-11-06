from controller import Robot, Motor, PositionSensor, DistanceSensor
from controller import Gyro, Accelerometer,InertialUnit

# Convert const
RPM_TO_RAD_S = 0.10472
DEG_TO_RAD   = 0.0174533
RAD_TO_DEG   = 1/DEG_TO_RAD
TURN_TO_RAD  = 6.28319
M_S2_TO_G    = 0.1019

# Motor module
FORWARD, REVERSE   = 0, 1
PERCENT, RPM       = 2, 3
BRAKE, COAST, HOLD = 0, 1, 2
DEGREES, TURNS     = 4, 5
SECONDS, MINUTES   = 0,1

IQ_MOTOR_MAX_TORQUE_NM = 0.414
IQ_MOTOR_MAX_SPEED_RPM = 120
# Distance sensor module
MM, INCHES  = 0, 1
SMALL, MEDIUM, LARGE = 0, 1, 2

# Gyroscope module
XAXIS, YAXIS, ZAXIS = 0, 1, 2
PITCH, ROLL, YAW    = 0, 1, 2
RCT, RPM, DPS       = 0, 1, 2

robot = Robot()
timestep = int(robot.getBasicTimeStep())  

def wait(duration,unit):
    time = robot.getTime()
    
    if unit == SECONDS:
        duration = duration
    elif unit == MSEC:
        duration = duration/1000
            
    while robot.getTime() < time + duration:
        robot.step(timestep)
    pass
    


    
    