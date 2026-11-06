from Vex_IQ_Config import *

class BrainInertial:
    def __init__(self, gyro_name: str, acc_name: str, inertial_name: str, sampling_period: int):
        self.gyro = Gyro(gyro_name)
        self.acc = Accelerometer(acc_name)
        self.inertial = InertialUnit(inertial_name)
        
        self.gyro.enable(sampling_period)
        self.acc.enable(sampling_period)
        
        self.device_offset = self.inertial.getRollPitchYaw()
        self.gyro_values = [0.0, 0.0, 0.0]
        self.orientation_angles_rad = [0.0, 0.0, 0.0]
               
    def set_heading(self, value: float, unit: int = DEGREES) -> None:
        assert unit == DEGREES or unit == TURNS, "unit must be either DEGREES or TURNS"
        if unit == DEGREES:
            self.device_offset = self.orientation_angles_rad + value * DEG_TO_RAD
        elif unit == TURNS:
            self.device_offset = self.orientation_angles_rad + value * 6.28  

    def set_rotation(self, value: float, unit: int = DEGREES) -> None:
        assert unit == DEGREES or unit == TURNS, "unit must be either DEGREES or TURNS"
        if unit == DEGREES:
            self.device_offset = self.orientation_angles_rad + value * DEG_TO_RAD
        elif unit == TURNS:
            self.device_offset = self.orientation_angles_rad + value * 6.28  
        
    def heading(self, unit: int) -> float:
        assert unit == DEGREES or unit == TURNS, "unit must be either DEGREES or TURNS"      
        
        if unit == DEGREES:
            return (- self.orientation_angles_rad[YAW])* RAD_TO_DEG
        elif unit == TURNS:
            return (- self.orientation_angles_rad[YAW]) / 6.28
        
    def rotation(self, unit: int) -> float:
        assert unit == DEGREES or unit == TURNS, "unit must be either DEGREES or TURNS"
        
        if unit == DEGREES:
            return self.orientation_angles_rad[YAW] * RAD_TO_DEG
        elif unit == TURNS:
            return self.orientation_angles_rad[YAW] / 6.28
       
    def calibrate(self):
        pass

    def acceleration(self, axis: int) -> float:
        acc_values = self.acc.getValues()
        return (acc_values[axis]) * M_S2_TO_G
        
    def gyro_rate(self, axis: int, unit: int = DPS):
        assert unit == DPS or unit == RPM, "unit must be either DPS or RPM"
        gyro_values_rad_s = self.gyro.getValues()
        if unit == DPS:
            rate_in_dps = gyro_values_rad_s[axis] * RAD_TO_DEG 
            rate_in_dps = min(1000.0, max(-1000.0, rate_in_dps))
            return rate_in_dps
        elif unit == RPM:
            rate_in_dps = gyro_values_rad_s[axis] / 6.28318
            rate_in_rpm = min(1000.0, max(-1000.0, rate_in_rpm))
            return rate_in_rpm
        
    def orientation(self, axis: int, unit: int):
        assert unit == DEGREES or unit == TURNS, "unit must be either DEGREES or TURNS"  
        intertial_value = self.inertial.getRollPitchYaw()
       
        self.orientation_angles_rad[PITCH] = intertial_value[XAXIS] - self.device_offset[PITCH]
        self.orientation_angles_rad[ROLL]  = intertial_value[YAXIS] - self.device_offset[ROLL] 
        self.orientation_angles_rad[YAW]   = intertial_value[ZAXIS] - self.device_offset[YAW] 

        if axis == PITCH:
            if unit == DEGREES:
                return self.orientation_angles_rad[PITCH] * RAD_TO_DEG 
            elif unit == TURNS:
                return self.orientation_angles_rad[PITCH] / 6.28
        elif axis == ROLL:
            if unit == DEGREES:
                return self.orientation_angles_rad[ROLL] * RAD_TO_DEG 
            elif unit == TURNS:
                return self.orientation_angles_rad[ROLL] / 6.28
        elif axis == YAW:
            if unit == DEGREES:
                return -self.orientation_angles_rad[YAW] * RAD_TO_DEG 
            elif unit == TURNS:
                return -self.orientation_angles_rad[YAW] / 6.28