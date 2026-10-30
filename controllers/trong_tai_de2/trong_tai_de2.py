"""
Đề 2 — "Băng qua ngã tư có xe chạy": XE CHẠY + TRỌNG TÀI (học sinh KHÔNG cần sửa file này).

- Xe chạy dọc phố cắt ngang ngã tư thứ hai. Xe chỉ bắt đầu chạy khi robot vừa đi qua ngã tư
  thứ nhất, nên lịch chạy của xe luôn khớp với chương trình của học sinh (kể cả khi chạy lại).
- Trọng tài in kết quả ra Console: va chạm với xe / với nhà, robot đã vào ô đỗ hay chưa.
"""
import math
from controller import Supervisor

sup = Supervisor()
dt = int(sup.getBasicTimeStep()) * max(1, round(32 / sup.getBasicTimeStep()))

car = sup.getSelf()
car_t = car.getField('translation')
car_r = car.getField('rotation')
claw = sup.getFromDef('CLAWBOT_V2')
# Xe được dời chỗ trực tiếp (không có vật lý): nếu xe có khối va chạm, nó sẽ ép robot vào nhà
# và làm bộ vật lý "nổ". Va chạm với xe do trọng tài phát hiện bằng hình học.
bo = car.getField('boundingObject')
if bo.getSFNode() is not None:
    bo.removeSF()

# ---- xe ----
CAR_X = -20.16                  # trục phố dọc ở ngã tư thứ hai
Y_SOUTH, Y_NORTH = -2.4, 1.15   # điểm đỗ của xe ở hai đầu phố
SPEED = 0.5                     # m/s
DRIVE = (Y_NORTH - Y_SOUTH) / SPEED
START_DELAY = 6.2               # s sau khi robot qua ngã tư thứ nhất
PARK = 6.0                      # s đứng chờ ở mỗi đầu phố
CAR_HALF = (0.15, 0.275)        # nửa bề ngang (x), nửa chiều dài (y)

# ---- robot ----
ROBOT_HALF = (0.25, 0.20)       # nửa chiều dài, nửa bề ngang thân robot
TRIGGER_X = -22.6               # robot đi qua đây thì xe bắt đầu đếm giờ
BAY = (-18.50, -18.02, 1.05, 1.65)   # vùng tâm robot phải nằm trong để tính là đã vào ô đỗ
TIME_LIMIT = 75.0
HOUSES = [  # hộp va chạm của các nhà dọc lộ trình
    ('nhà bên trái ngã tư 1', (-23.96, -22.91, -1.29, -0.55)),
    ('nhà bên phải ngã tư 2 (phía nam)', (-21.53, -20.78, -1.30, -0.55)),
    ('nhà bên trái ngã tư 2 (phía bắc)', (-21.53, -20.78, 0.60, 1.35)),
    ('nhà phía nam ngã tư 3', (-19.59, -18.84, -1.30, -0.55)),
    ('nhà phía bắc ngã tư 3', (-19.64, -18.89, 0.60, 1.35)),
    ('nhà ga cuối phố', (-18.56, -16.40, 2.06, 3.56)),
]


def robot_pose():
    p = claw.getPosition()
    m = claw.getOrientation()
    hx, hy = m[0], m[3]                       # trục tiến của robot (trục x cục bộ) trên mặt đất
    n = math.hypot(hx, hy) or 1.0
    hx, hy = hx / n, hy / n
    zx, zy = m[2], m[5]                       # trục z cục bộ = trục ngang của robot
    # tâm thân robot: (-0.05 theo trục tiến, 0.18 theo trục ngang) so với gốc toạ độ robot
    cx = p[0] - 0.05 * hx + 0.18 * zx
    cy = p[1] - 0.05 * hy + 0.18 * zy
    return cx, cy, hx, hy


def corners(cx, cy, hx, hy, a, b):
    lx, ly = -hy, hx
    return [(cx + sa * a * hx + sb * b * lx, cy + sa * a * hy + sb * b * ly) for sa, sb in ((1, 1), (1, -1), (-1, -1), (-1, 1))]


def box(x0, x1, y0, y1):
    return [(x0, y0), (x1, y0), (x1, y1), (x0, y1)]


def overlap(p, q):
    for poly in (p, q):
        for i in range(len(poly)):
            (x0, y0), (x1, y1) = poly[i], poly[(i + 1) % len(poly)]
            ax, ay = y0 - y1, x1 - x0
            a = [ax * x + ay * y for x, y in p]
            b = [ax * x + ay * y for x, y in q]
            if max(a) <= min(b) or max(b) <= min(a):
                return False
    return True


def car_state(tau):
    """Vị trí y và hướng (+1 bắc, -1 nam) của xe tại thời điểm tau (s) kể từ khi robot qua ngã tư 1."""
    if tau is None or tau < START_DELAY:
        return Y_SOUTH, 1
    k = (tau - START_DELAY) % (2 * (DRIVE + PARK))
    if k < DRIVE:
        return Y_SOUTH + SPEED * k, 1
    k -= DRIVE
    if k < PARK:
        return Y_NORTH, 1
    k -= PARK
    if k < DRIVE:
        return Y_NORTH - SPEED * k, -1
    return Y_SOUTH, 1


def say(msg):
    print('[TRỌNG TÀI] ' + msg, flush=True)


def new_run():
    return {'car_clock': None, 't_move': None, 'far': 0.0, 'car_hits': 0, 'house_hits': 0, 'touch_car': False,
            'touch_house': set(), 'still_since': None, 'done': False, 'stuck_told': False, 'last': None}


start = robot_pose()
run = new_run()
shown = None   # (y, hướng) xe đang hiển thị: chỉ ghi lại vị trí khi xe thật sự di chuyển
say('ĐỀ 2 — Băng qua ngã tư có xe chạy. Robot phải chờ xe đi qua, rồi lùi vào Ô ĐỖ màu xanh.')

while sup.step(dt) != -1:
    t = sup.getTime()
    cx, cy, hx, hy = robot_pose()
    away = math.hypot(cx - start[0], cy - start[1])
    run['far'] = max(run['far'], away)

    # robot được đưa về vị trí xuất phát (chạy lại) -> lượt mới
    if run['far'] > 0.5 and away < 0.05:
        run = new_run()
        say('Robot về vị trí xuất phát — bắt đầu lượt mới.')
    if run['t_move'] is None and away > 0.15:
        run['t_move'] = t
    if run['car_clock'] is None and cx > TRIGGER_X:
        run['car_clock'] = 0.0

    # xe: đồng hồ của xe đứng lại khi xe đang chạm robot (xe phanh lại chờ)
    y, d = car_state(run['car_clock'])
    rb = corners(cx, cy, hx, hy, *ROBOT_HALF)
    hit = overlap(rb, box(CAR_X - CAR_HALF[0], CAR_X + CAR_HALF[0], y - CAR_HALF[1], y + CAR_HALF[1]))
    if run['car_clock'] is not None and not hit:
        run['car_clock'] += dt / 1000.0
    if shown != (round(y, 3), d):
        car_t.setSFVec3f([CAR_X, y, 0.0])
        if shown is None or shown[1] != d:
            car_r.setSFRotation([0, 0, 1, 0 if d > 0 else math.pi])
        shown = (round(y, 3), d)

    if run['done'] or run['t_move'] is None:
        continue
    elapsed = t - run['t_move']

    # va chạm với xe
    if hit and not run['touch_car']:
        run['car_hits'] += 1
        say('VA CHẠM VỚI XE ở giây thứ %.1f! Xe phải phanh gấp. Robot phải DỪNG HẲN ở vạch dừng và chờ xe đi qua.' % elapsed)
    run['touch_car'] = hit

    # va chạm với nhà
    for name, b in HOUSES:
        h = overlap(rb, box(*b))
        if h and name not in run['touch_house']:
            run['house_hits'] += 1
            say('VA CHẠM VỚI %s ở giây thứ %.1f! Kiểm tra hướng quay của robot.' % (name.upper(), elapsed))
            run['touch_house'].add(name)
        elif not h:
            run['touch_house'].discard(name)

    # robot đứng yên?
    if run['last'] is not None:
        moving = math.hypot(cx - run['last'][0], cy - run['last'][1]) / (dt / 1000.0) > 0.02
    else:
        moving = True
    run['last'] = (cx, cy)
    if moving:
        run['still_since'] = None
        run['stuck_told'] = False
    elif run['still_since'] is None:
        run['still_since'] = t

    in_bay = BAY[0] <= cx <= BAY[1] and BAY[2] <= cy <= BAY[3]
    still_for = 0.0 if run['still_since'] is None else t - run['still_since']
    if in_bay and still_for >= 1.0:
        hits = run['car_hits'] + run['house_hits']
        say('ROBOT ĐÃ VÀO Ô ĐỖ sau %.1f giây. Va chạm xe: %d, va chạm nhà: %d.' % (elapsed, run['car_hits'], run['house_hits']))
        say('KẾT QUẢ: %s' % ('ĐẠT — giỏi lắm!' if hits == 0 else 'CHƯA ĐẠT — vẫn còn va chạm, hãy sửa tiếp.'))
        run['done'] = True
    elif not in_bay and still_for >= 8.0 and cx > -19.5 and not run['stuck_told']:
        say('Robot đã đứng yên 8 giây nhưng CHƯA VÀO Ô ĐỖ (đang ở x=%.2f, y=%.2f).' % (cx, cy))
        run['stuck_told'] = True
    if not run['done'] and elapsed > TIME_LIMIT:
        say('HẾT GIỜ (%d giây) — robot chưa vào ô đỗ.' % TIME_LIMIT)
        run['done'] = True
