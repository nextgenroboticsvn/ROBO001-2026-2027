from Vex_IQ_Config import *

class IQ_Motor:  
    stop_mode = BRAKE
    position_offset = 0.0
    time_out = 9999
    
    def __init__(self, motor_name: str,sensor_name: str):
        self.motor = Motor(motor_name)
        self.position_sensor = PositionSensor(sensor_name)    
        self.motor.setPosition(0)
        robot.step(timestep)

    def spin(self,direction):
        if direction == FORWARD:
            self.motor.setPosition(float('inf'))
        elif direction == REVERSE:
            self.motor.setPosition(float('inf'))
            self.motor.setVelocity(-1 * abs(self.motor.getVelocity()) )

    def spin_to_position(self, pos_value, units, wait = False):
        # Convert amount to radians depending on units
        if units == TURNS:
            pos_value = pos_value * TURN_TO_RAD - self.position_offset # Convert to radians
        elif units == DEGREES:
            pos_value = pos_value * DEG_TO_RAD  - self.position_offset # Convert to radians
        else:
            print("Invalid units. Supported units are 'TURNS' and 'DEGREES'.")
            return
            
        # Set the target position for the motor
        self.motor.setPosition(pos_value)
        
        # Wait for the movement to complete
        if wait:
            robot.step(timestep)
            while abs(self.motor.getTargetPosition() - self.position_sensor.getValue() ) > 0.01:
                robot.step(timestep)

    def spin_for(self, direction, amount, units, wait = False):
        # Convert amount to radians depending on units
        if units == TURNS:
            pos_value = amount * TURN_TO_RAD # Convert to radians
        elif units == DEGREES:
            pos_value = amount * DEG_TO_RAD  # Convert to radians
        else:
            print("Invalid units. Supported units are 'TURNS' and 'DEGREES'.")
            return
        
        # Determine the sign of the direction
        if direction == FORWARD:
            pos_value *= 1.0  # Forward rotation
        elif direction == REVERSE:
            pos_value *= -1.0   # Reverse rotation
        else:
            print("Invalid direction. Supported directions are 'FORWARD' and 'REVERSE'.")
            return
        
        # Set the target position for the motor
        self.motor.setPosition(self.position_sensor.getValue()+pos_value)
        
        # Wait for the movement to complete
        if wait:
            robot.step(timestep)
            while abs(self.motor.getTargetPosition() - self.position_sensor.getValue() ) > 0.01:
                robot.step(timestep)
                               
    def stop(self): 
        if self.stop_mode == COAST:
            # TODO
            #self.motor.setVelocity(self.motor.getVelocity()/2)
            #robot.step(500)
            #self.motor.setVelocity(self.motor.getVelocity()/4)
            #robot.step(500)
            self.motor.setVelocity(0) 
            self.motor.setPosition(self.position_sensor.getValue())
        else:
            self.motor.setVelocity(0)  
            self.motor.setPosition(self.position_sensor.getValue())
         
    def set_stopping(self, mode):
        if mode not in [BRAKE, COAST, HOLD]:
            print("Invalid stopping mode")
            return
        self.stop_mode = mode
    
    def position(self,units): 
        if units == TURNS:
            return (self.position_sensor.getValue()-self.position_offset) / TURN_TO_RAD
        elif units == DEGREES:
            return (self.position_sensor.getValue()-self.position_offset) / DEG_TO_RAD

    def set_position(self, value, units): 
        if units == DEGREES:
            self.position_offset = value*DEG_TO_RAD + self.position_sensor.getValue()
        elif units == TURNS:
            self.position_offset = value*TURN_TO_RAD + self.position_sensor.getValue()
                                                  
    def set_velocity(self,amount, units):     
        if units == PERCENT: # PERCENT in [-100, 100]
            if amount <= -100 or amount >= 100: 
                # print("invalid velocity value")
                return
            else:
                self.speed = amount/ 100 * IQ_MOTOR_MAX_SPEED_RPM * RPM_TO_RAD_S                 
        elif units == RPM: # RPM in [-127, 127]
            if amount <= -127 or amount >= 127: 
                #print("invalid velocity value")
                return
            else:
                self.speed = amount * RPM_TO_RAD_S                
        self.motor.setVelocity(self.speed) 
       
    def velocity(self,units): 
        if units == PERCENT :
            return self.motor.getVelocity() / RPM_TO_RAD_S / IQ_MOTOR_MAX_SPEED_RPM * 100
        elif units == RPM :
            return self.motor.getVelocity() / RPM_TO_RAD_S    
 
    def set_max_torque(self,amount, units):     
        if units == PERCENT: # PERCENT in [-100, 100]
            if amount <= -100 or amount >= 100: 
                # print("invalid velocity value")
                return
            else:
                self.torque = amount/ 100 * IQ_MOTOR_MAX_TORQUE_NM                             
                self.motor.setAvailableTorque(self.torque) 
                #print("Max Torque: {} ".format(self.motor.getAvailableTorque() ) )
 
    def timeout(self, duration,unit):    
        if unit == SECONDS:
            self.time_out = duration
    
    def is_done(self):    
        if self.motor.getVelocity() < 0.01:
            return True
        else:
            return False         

    def is_spinning(self):    
        if self.motor.getVelocity() < 0.01:
            return False
        else:
            return True   
    