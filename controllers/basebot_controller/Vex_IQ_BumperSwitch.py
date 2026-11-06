from controller import TouchSensor

class BumperSwitch:
    def __init__(self, name, timestep):
        self.sensor = TouchSensor(name)
        self.timestep = timestep
        self.sensor.enable(self.timestep)

    def pressing(self):
        return self.sensor.getValue() > 0.0
