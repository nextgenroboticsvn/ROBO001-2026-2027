"""Robot hoc sinh trong world mau: in danh sach thiet bi luc khoi dong va gia tri cam bien moi giay (khi doi).

Sau khi gan cam bien / banh xe / khop bang s4vn_editor, controller nay duoc khoi dong lai va thay thiet bi moi.
Trang thu (web) lai robot qua tin nhan robot window (robot can window "<none>"):
  HELLO                        -> tra loi HELLO:{"drive":..., "servos":[...]} (thiet bi chuyen dong co san)
  DRIVE:{"l":rad/s,"r":rad/s}  -> toc do 2 banh motor_left / motor_right (tu dung sau 1 s khong nhan lenh)
  SERVO:{"name","pos"}         -> goc (rad) cua tay nang / de xoay
Trong code cua hoc sinh: robot.getDevice("motor_left").setVelocity(5), robot.getDevice("arm").setPosition(-1)
"""
import json
import math

from controller import Robot

robot = Robot()
ts = int(robot.getBasicTimeStep())
names = [robot.getDeviceByIndex(i).getName() for i in range(robot.getNumberOfDevices())]
print('[student_bot] thiet bi:', ', '.join(names) if names else '(chua co - keo tha cam bien vao robot)', flush=True)

devices, motors = [], {}
for name in names:
    device = robot.getDevice(name)
    if hasattr(device, 'setVelocity'):              # RotationalMotor / LinearMotor
        motors[name] = device
    elif hasattr(device, 'enable'):
        device.enable(ts * 4)
        devices.append(device)

WHEELS = ('motor_left', 'motor_right')
drive = all(w in motors for w in WHEELS)
if drive:
    for w in WHEELS:
        motors[w].setPosition(float('inf'))         # velocity control
        motors[w].setVelocity(0.0)
servos = [m for name, m in motors.items() if name not in WHEELS]
for m in servos:
    m.setVelocity(min(2.0, m.getMaxVelocity()))     # move to targets at a calm speed


def limits(m):
    lo, hi = m.getMinPosition(), m.getMaxPosition()
    return (lo, hi) if lo < hi else (-math.pi, math.pi)    # 0, 0 = no limit


def hello():
    servo_list = [dict(name=m.getName(), min=round(limits(m)[0], 3), max=round(limits(m)[1], 3),
                       pos=round(m.getTargetPosition(), 3)) for m in servos]
    max_v = round(motors[WHEELS[0]].getMaxVelocity(), 2) if drive else 0
    robot.wwiSendText('HELLO:' + json.dumps(dict(drive=drive, maxVelocity=max_v, servos=servo_list)))


def num(v):
    """2 decimals without "-0.00" (a wheel at rest flips between -0.00 and 0.00 and would print every second)."""
    v = round(v, 2)
    return f'{v + 0.0:.2f}' if v else '0.00'


def reading(device):
    name = device.getName()
    if hasattr(device, 'getRangeImage'):           # Lidar
        ranges = [v for v in device.getRangeImage() if math.isfinite(v)]       # no hit: inf; some lidars: nan
        return f'{name} gan nhat {min(ranges):.2f} m' if ranges else f'{name} khong thay vat'
    if hasattr(device, 'getImage'):                # Camera
        return f'{name} {device.getWidth()}x{device.getHeight()}'
    if hasattr(device, 'getValue'):                # DistanceSensor, TouchSensor, LightSensor, PositionSensor
        value = device.getValue()
        return f'{name}={num(value)}' if value == value else f'{name}=(chua co so lieu)'
    if hasattr(device, 'getValues'):               # GPS
        return f'{name} ' + ' '.join(num(v) for v in device.getValues())
    return name


def handle(message):
    global last_drive
    cmd, _, payload = message.partition(':')
    try:
        data = json.loads(payload) if payload else {}
    except json.JSONDecodeError:
        return
    if cmd == 'HELLO':
        hello()
    elif cmd == 'DRIVE' and drive:
        for w, key in zip(WHEELS, ('l', 'r')):
            limit = motors[w].getMaxVelocity()
            motors[w].setVelocity(max(-limit, min(limit, float(data.get(key, 0)))))
        last_drive = robot.getTime()
    elif cmd == 'SERVO' and data.get('name') in motors and data['name'] not in WHEELS:
        m = motors[data['name']]
        lo, hi = limits(m)
        m.setPosition(max(lo, min(hi, float(data.get('pos', 0)))))


hello()
if motors:
    print('[student_bot] dong co: ' + ', '.join(motors) + (' (lai tu trang web: mui ten / WASD)' if drive else ''),
          flush=True)
last, last_drive, last_text = 0.0, 0.0, ''
while robot.step(ts) != -1:
    pending, message = [], robot.wwiReceiveText()
    while message:                                     # read all, then handle (see s4vn_editor)
        pending.append(message)
        message = robot.wwiReceiveText()
    for message in pending:
        handle(message)
    if drive and robot.getTime() - last_drive > 1.0:      # page closed or stalled: stop (page resends every 150 ms)
        for w in WHEELS:
            motors[w].setVelocity(0.0)
    if devices and robot.getTime() - last >= 1.0:
        last = robot.getTime()
        text = ' | '.join(reading(d) for d in devices)
        if text != last_text:                             # only changes: an idle robot does not flood the console
            last_text = text
            print('[student_bot] ' + text, flush=True)
