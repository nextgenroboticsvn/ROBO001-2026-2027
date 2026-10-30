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
| [`Mo_Phong_Nang_Cao`](../../tree/Mo_Phong_Nang_Cao) | Mô phỏng nâng cao |

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
