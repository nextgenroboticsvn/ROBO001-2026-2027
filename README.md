# ROBO001 2026–2027

Kho mô phỏng Webots dùng cho các bài học của khóa **ROBO001** năm học 2026–2027.

## Định nghĩa

Đây là các mô phỏng được sử dụng với phần mềm **Robotic Simulation** chạy trên **Webots**, mỗi mô phỏng phục vụ một bài học riêng biệt.

## Cấu trúc: mỗi bài học là một nhánh

Mỗi nhánh chứa trọn một dự án Webots (thư mục `worlds/`, `controllers/`, `plugins/`, `protos/`, texture…) đặt ngay ở gốc nhánh.

| Nhánh | Nội dung |
|---|---|
| [`Lesson2`](../../tree/Lesson2) | Mô phỏng Bài 2 |
| [`Lesson2_Debugging`](../../tree/Lesson2_Debugging) | Bài 2 – đề bài tìm và sửa lỗi |
| [`Lesson2_Debugging_DapAn`](../../tree/Lesson2_Debugging_DapAn) | Bài 2 – đáp án bài tìm và sửa lỗi |
| [`Lesson4`](../../tree/Lesson4) | Bài 4 – cảm biến khoảng cách, rover sao Hỏa leo lề đường |
| [`Lesson5`](../../tree/Lesson5) | Mô phỏng Bài 5 – cảm biến |
| [`Lesson6`](../../tree/Lesson6) | Mô phỏng Bài 6 – cảm biến |
| [`Mo_Phong_Nang_Cao`](../../tree/Mo_Phong_Nang_Cao) | Mô phỏng nâng cao |

### Môi trường mô phỏng khác

Chuyển từ các môi trường Webots cũ sang dạng chạy được trên web (controller Python, texture đặt sẵn trong dự án).

| Nhánh | Nội dung |
|---|---|
| [`Nao_Robocup`](../../tree/Nao_Robocup) | 2 robot NAO trên sân bóng, điều khiển bằng bàn phím |
| [`Nao_Room`](../../tree/Nao_Room) | 2 robot NAO trong phòng, điều khiển bằng bàn phím |
| [`Youbot`](../../tree/Youbot) | 2 robot KUKA youBot gắp hộp |
| [`Salamander`](../../tree/Salamander) | Robot kỳ giông bò trên cạn và bơi dưới nước |
| [`Drone_SteamPlanet`](../../tree/Drone_SteamPlanet) | Drone Mavic 2 Pro bay trong thành phố |
| [`Basebot_VEXIQ`](../../tree/Basebot_VEXIQ) | VEX IQ Basebot trên sân thi đấu |
| [`Basebot_VEXIQ_DapAn`](../../tree/Basebot_VEXIQ_DapAn) | Basebot – đáp án bài 2 và bài 4 (`controllers/basebot_controller/Lesson2_Controller*_Correction.py`) |

Trong các nhánh này, học sinh viết chương trình ở `controllers/<tên>_controller/robot_controller.py`.

Nhánh `main` (mặc định) chứa mô phỏng **Bài 2**, giống nhánh `Lesson2`, kèm tài liệu này.

## Cách sử dụng

1. Chọn nhánh của bài học (nút chọn nhánh ở góc trên bên trái trang repo).
2. Bấm **Code → Download ZIP** để tải mô phỏng về dưới dạng file zip.
3. Mở **https://simulation.nextgenrobotics-tech.com/simulation** và tải file zip lên để chạy mô phỏng.

> Nếu nền tảng báo lỗi cấu trúc, hãy giải nén file vừa tải, rồi nén lại sao cho thư mục `worlds/` nằm ngay trong file zip.

## Đóng góp

- Mỗi bài học mới được tạo thành một nhánh mới, đặt tên theo thư mục dự án.
- Chỉ sửa trong nhánh của bài học tương ứng; không trộn (merge) các nhánh bài học vào nhau.
- Mở dự án bằng Webots để kiểm tra trước khi push.
