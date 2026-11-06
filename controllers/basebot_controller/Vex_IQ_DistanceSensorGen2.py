from Vex_IQ_Config import *

class DistanceSensorGen2:

    previous_distance = 0.0
    previous_time = 0.0
    
    def __init__(self, sensor_name: str):
        self.distance_sensor = DistanceSensor(sensor_name)
        if self.distance_sensor is None:
            print("Error: Distance sensor not found!")
        else:
            self.distance_sensor.enable(timestep)
        
    def object_distance(self,unit: int = MM):
        distance_value = self.distance_sensor.getValue()
        if unit == MM:
            return abs(distance_value)  
        elif unit == INCHES:
            return abs(distance_value) / 25.4  
        else:
            print("Unsupported unit. Use 'MM' or 'INCHES'.")
                
    def is_object_detected(self):
        max_detection_distance = 100
        return self.distance_sensor.getValue() < max_detection_distance
       
      
        
        
        
        