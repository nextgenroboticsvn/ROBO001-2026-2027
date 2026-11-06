"""Robot sao Hỏa của bài 4: chạy độc lập, không phụ thuộc vào ClawBot.

Mô phỏng vừa bắt đầu là xe chạy tới lề đường màu vàng, khựng lại, lùi lấy đà rồi leo qua lề:
chồm đầu lên, bò qua, chúi đầu xuống nhấc đuôi lên, sau đó đi sang bãi cỏ và lắc mình ăn mừng.
Bánh Sojourner quá nhỏ và quay rất chậm (0.6 rad/s), tự nó không qua được lề, nên thân xe được
Supervisor đẩy đi theo một dáng leo tính sẵn, các bánh xe tự lăn theo. Đoạn lề xe đi qua không
có khối va chạm.
"""
import math
from controller import Supervisor

Z_NEN = 0.234            # độ cao thân xe khi đứng trên đường
Y_LUI = -30.08           # lùi tới đây để lấy đà
Y_DAU_LEO = -29.98       # bắt đầu leo
Y_LEO_XONG = -29.02      # đã xuống hẳn phía bên kia
Y_DICH = -27.9           # đỗ ở đây, đã ra khỏi mặt đường
VAN_TOC_CHAY = 0.15      # m/s
VAN_TOC_LEO = 0.12
VAN_TOC_DI_TIEP = 0.09
THOI_GIAN_LAC = 3.0      # giây

# Dáng leo theo vị trí xe: (y, góc chúi đầu (độ), độ nhấc thân (m))
DANG_LEO = [(-29.98, 0, 0), (-29.86, 16, 0.08), (-29.46, 16, 0.08),
            (-29.33, -16, 0.08), (-29.18, -16, 0.08), (-29.02, 0, 0)]

r = Supervisor()
dt = 32
minh = r.getSelf()
x0 = minh.getPosition()[0]
banh = [r.getDevice(a + b + "Wheel") for a in ("Front", "Middle", "Back") for b in ("Left", "Right")]
for m in banh:
    m.setPosition(float("inf"))
    m.setVelocity(0.0)
    m.setAvailableTorque(0.0)        # bánh tự lăn


def dang(y):
    for (y0, g0, z0), (y1, g1, z1) in zip(DANG_LEO, DANG_LEO[1:]):
        if y0 <= y <= y1:
            k = (y - y0) / (y1 - y0)
            return math.radians(g0 + k * (g1 - g0)), z0 + k * (z1 - z0)
    return 0.0, 0.0


def huong_lech():
    m = minh.getOrientation()
    return math.atan2(-m[3], -m[0]) - math.pi / 2     # đầu xe là phía -x của Sojourner


def day(van_toc, quay=None):
    """Đẩy xe về phía bắc trên mặt đường, giữ cho xe không trôi ngang."""
    v = minh.getVelocity()
    if quay is None:
        quay = -3.0 * huong_lech()
    minh.setVelocity([x0 - minh.getPosition()[0], van_toc, v[2], v[3], v[4], quay])


def leo(y):
    """Đẩy xe qua lề đường theo dáng leo."""
    goc, nhac = dang(y)
    p = minh.getPosition()
    m = minh.getOrientation()
    chui = math.asin(max(-1.0, min(1.0, -m[6])))
    nghieng = math.asin(max(-1.0, min(1.0, -m[7])))
    minh.setVelocity([x0 - p[0], VAN_TOC_LEO, 6.0 * (Z_NEN + nhac - p[2]),
                      6.0 * (goc - chui), -6.0 * nghieng, -3.0 * huong_lech()])


buoc = 0
luc_lac = 0
while r.step(dt) != -1:
    y = minh.getPosition()[1]
    if buoc == 0:                       # chạy tới lề đường
        day(VAN_TOC_CHAY)
        if y >= Y_DAU_LEO:
            buoc = 1
    elif buoc == 1:                     # khựng lại, lùi lấy đà
        day(-0.2)
        if y <= Y_LUI:
            buoc = 2
    elif buoc == 2:                     # tiến lại sát lề
        day(VAN_TOC_LEO)
        if y >= Y_DAU_LEO:
            buoc = 3
    elif buoc == 3:                     # leo qua lề
        leo(y)
        if y >= Y_LEO_XONG:
            buoc = 4
    elif buoc == 4:                     # đi tiếp sang bên kia
        day(VAN_TOC_DI_TIEP)
        if y >= Y_DICH:
            buoc = 5
            luc_lac = r.getTime()
    elif buoc == 5:                     # lắc mình ăn mừng
        day(0.0, 1.0 * math.sin(7.0 * (r.getTime() - luc_lac)))
        if r.getTime() - luc_lac >= THOI_GIAN_LAC:
            buoc = 6
            minh.setVelocity([0.0, 0.0, 0.0, 0.0, 0.0, 0.0])
            for m in banh:
                m.setAvailableTorque(m.getMaxTorque())
