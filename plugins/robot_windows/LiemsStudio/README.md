# Hướng dẫn sử dụng Robot Studio — ClawBot_V2

Bản triển khai dùng project **`C:\Users\acer\Desktop\ClawBot_V2`**. Giữ cả thư mục `plugins\robot_windows\LiemsStudio`, gồm HTML, JS/CSS, logo, Blockly và `media`. Robot Window gốc vẫn được giữ riêng.

## Mở bản mới trong Webots

1. Mở **`C:\Users\acer\Desktop\ClawBot_V2\worlds\World.wbt`**. World này đã đặt robot `clawbot_v2` dùng `window "LiemsStudio"` và `controller "clawbot_controller"`.
2. **Mở lại world hoặc Restart Controller sau khi cập nhật.** Chỉ làm mới HTML chưa thay controller đang chạy. Bản v2 cập nhật thư viện `controllers\clawbot_controller\clawbot.py`; entry `clawbot_controller.py` và bài của bạn `robot_controller.py` được giữ nguyên.
3. Mở Robot Window của `clawbot_v2`; nếu cửa sổ đang mở từ bản cũ, làm mới hoặc mở lại. Chờ hiện kết nối và đồng hồ Webots, chọn bài trong **Tệp**, rồi bấm **Chạy**.

`robot_controller.py` vẫn được đọc một lần khi khởi động controller, như trước. Nếu muốn bắt đầu từ trạng thái chưa nạp code, bấm **Reset** ở thanh chạy sau khi kết nối. Các lần Reset trong Studio không tự nạp lại tệp đó. Không mở HTML qua `file://` để điều khiển robot; Robot Window cần kết nối do Webots cấp.

## Chạy, theo dõi và Reset

| Nút | Tác dụng |
|---|---|
| **Chạy** | Nạp Python của các khối hiện tại và chạy world. Nếu world đang dừng, nút này cũng tiếp tục world. |
| **Tạm dừng / Tiếp tục** | Dừng hoặc tiếp tục world và bài đã nạp, không nạp lại code. |
| **Reset** (robot) | Gỡ code đã nạp, dừng bánh xe, đưa tay về 0 mm và khôi phục vị trí robot. Giữ các khối và thời gian world. |
| **Reset World** | Đưa toàn bộ world và đồng hồ về **00:00.00**, gỡ code đã nạp, giữ các khối. World đang chạy thì tiếp tục chạy; đang dừng thì vẫn dừng. Bấm **Chạy** để nạp bài lại. |

**Block sáng theo lượt chạy thật:** Python gửi `TRACE` cùng ID khối, số bước và thời gian Webots. UI hiển thị các sự kiện đã nhận theo thứ tự, giữ mỗi khối tức thời sáng khoảng 140 ms để dễ nhìn; việc này không thêm delay vào Python hay làm chậm robot. Nếu robot đã hoàn thành trong lúc UI còn hiển thị các bước cuối, nhãn chuyển thành **Đang xem các bước**. Khi tạm dừng, khối hiện tại được giữ sáng; đổi VIE/ENG hoặc màu không nạp lại bài. Nếu sửa Blockly giữa lượt chạy, UI báo tiến trình thuộc **bản đã nạp**. Hàng đợi hiển thị có giới hạn và tự tăng tốc ở world chạy nhanh.

**Ước tính được chốt lúc bấm Chạy**, cùng với bản khối đã nạp. Tổng khối chờ và vòng lặp cố định có thể tính trước: bài đi/rẽ là 1,5 giây chờ; bài lặp 4 vòng là 6 giây chờ. Đây không phải số đo chuyển động hoặc thời gian vật lý đầy đủ. Bài có nhánh, cảm biến, vòng lặp liên tục hoặc tay nâng có thể hiện **Chưa ước tính**. Đồng hồ phía trên luôn đọc thời gian world.

Nếu thấy thông báo controller chưa gửi bước chạy hoặc Reset World chưa sẵn sàng, kiểm tra `clawbot.py` v2 đã được cập nhật và khởi động lại controller. Lỗi Python/PROTO và thiết bị xem trong console Webots.

## Bài mẫu và CabiBot

- **Cùng thử nhé** có hướng dẫn riêng cho bài đi/rẽ, lặp, `TEST` và `SENSOR_ADV`. **Khởi động / 01** dành cho vùng lập trình trống khi chưa chọn template. Tệp tự làm hoặc nhập XML dùng hướng dẫn bài của bạn.
- `TEST` giữ chuỗi khối của bản mẫu gốc, với nâng/hạ chuyển sang dịch chuyển tương đối. Nếu bắt đầu ở 0 mm, hạ 50 mm đưa tay về −50 mm; sau đó nâng 250 mm đi lên đến khoảng +200 mm. Khối gắp/thả vẫn khóa và bị bỏ qua khi tạo Python. Mẫu gốc chưa có lệnh dừng bánh xe ở cuối.
- `SENSOR_ADV` chọn nhánh theo giá trị cảm biến `< 300` trong vòng lặp liên tục. Mốc này chưa quy đổi sang mm/cm; bài không có thời gian kết thúc cố định.
- **CabiBot hiện góp ý tại chỗ**, dựa trên Blockly và `chatbot-tone.md`; API chưa được nối. Mỗi template có bộ câu hỏi riêng, có thể hỏi tiếp hoặc bấm nút quay về ban đầu. CabiBot không tự sửa khối, gửi lệnh robot hoặc gửi bài ra ngoài.
- Tệp, bản nháp, ghim và Nhập/Xuất XML giữ các bài của bạn. Có thể sao chép/dán XML giữa preview và Webots vì hai cửa sổ có thể dùng kho lưu khác nhau.

## Nâng và hạ tay gắp

Khởi động controller, Reset robot và Home yêu cầu tay về **0 mm**. Giới hạn phần mềm vẫn là **−50 đến +250 mm**. Khi world tạm dừng, motor nhận target nhưng chỉ di chuyển sau khi world chạy tiếp. Khối đầu tiên đợi homing xong trước khi tính quãng nâng/hạ.

`robot.lift_up(100)` nâng thêm 100 mm từ vị trí cảm biến hiện tại; `robot.lift_down(30)` hạ bớt 30 mm. Ví dụ, từ 0 mm: nâng 100 → +100; hạ 30 → +70 mm. Các khối đợi chuyển động hoàn tất rồi mới chạy tiếp, hỗ trợ Pause/Reset/nạp code mới trong lúc di chuyển và báo lỗi nếu tay bị kẹt. Quãng vượt hành trình được chặn tại giới hạn; số âm/NaN/vô hạn bị từ chối. Bấm Chạy lần nữa giữ độ cao hiện tại, không tự đưa tay về mốc 0.

**Code Python cũ cần chú ý:** `lift_up()` / `lift_down()` nay nhận quãng dịch chuyển không âm. Nếu cần đặt một độ cao tuyệt đối như trước, dùng `robot.lift_to(height_mm)`; API này vẫn giữ hành vi đặt target. Tệp `robot_controller.py` của bạn không bị sửa. Các API tay theo góc cũ và điều khiển tay bằng nút thủ công vẫn được giữ.

## Âm thanh và dependency

Trong **Tùy chọn**, checkbox **Âm thanh ghép / xóa khối** bật hoặc tắt các hiệu ứng Blockly và lưu lựa chọn. Ba âm thanh gốc chỉ có **6.919 byte**, được nhúng trong `LiemsStudio.audio.js` (khoảng 13 KB cả adapter) để Webots R2023b không phải phục vụ MP3/WAV qua HTTP. Ba tệp MP3/WAV riêng không cần đi kèm bản triển khai; sprite và con trỏ trong `media` vẫn cần giữ. Trình duyệt có thể chỉ cho phát sau thao tác đầu tiên.

Blockly dùng các bundle đã minify đi kèm project. Hai source dictionary `msg/js/en.js` và `vi.js` được bỏ khỏi bản Desktop, giảm **70.854 byte**, vì mọi thông điệp đã được nhúng trong `LiemsStudio.locale.js`. Các definition/generator **camera và sensor vẫn giữ lại** để đọc XML dự án cũ; bài dùng chúng vẫn cần thiết bị/helper tương ứng. Sprite, con trỏ và âm thanh lấy từ [Google Blockly commit 31ee4ea](https://github.com/google/blockly/tree/31ee4ea/media), kèm `LICENSE.blockly.txt` (Apache 2.0). RobotWindow và `request_methods.js` đóng gói cục bộ từ [Cyberbotics R2023b](https://cyberbotics.com/wwi/R2023b/RobotWindow.js).

## Phạm vi đã kiểm chứng

**Sửa lỗi mất lệnh khi bấm Chạy:** controller đọc hết mỗi batch WWI vào hàng đợi trước khi xử lý `PLAY`, `RUN` và `CODE`. Webots R2023b đặt lại con trỏ đọc khi gọi `robot.step(0)`, nên xử lý `PLAY` ngay trong vòng nhận cũ có thể bỏ mất code còn lại trong batch. Kiểm thử hồi quy tái hiện lỗi trên thư viện Desktop cũ và xác nhận bản sửa thực thi đủ code, giữ đúng run ID và thứ tự Reset/nạp lại. RobotWindow bỏ qua dòng rỗng ở cuối frame, tránh thông báo `Unknown message received: ""`.

Các kiểm thử Blockly → Python, TRACE/tiến trình, ước tính, ngôn ngữ, template/CabiBot, asset và controller với mock đã qua. Browser QA đã kiểm tra giao diện và luồng TRACE/Reset qua transport mô phỏng. Khối sáng, bước và ước tính được giữ theo bản đã nạp khi sửa bài hoặc đổi ngôn ngữ.

**Robot Window chạy với controller thật đã được kiểm tra:** sáu bước Bắt đầu → Đi tới → Chờ 1 giây → Rẽ phải → Chờ 0,5 giây → Dừng đều hiện đúng thứ tự, gồm lượt sáng cuối. Hoàn tất hiện đủ 6 bước, vẫn giữ ước tính 1,5 giây và không có lỗi JavaScript trong lượt kiểm tra. Khi các lệnh tức thời đến cùng lúc, adapter hẹn giờ trình duyệt giữ thứ tự mà không đổi thời gian mô phỏng.

**Đã xác nhận chuyển động trong Webots R2023b thực tế:** sau reset native, tốc độ yêu cầu có thể vẫn hiện ±5 nhưng bánh không quay. Đặt lại `setPosition(float('inf'))` trước mỗi lệnh bánh xe khôi phục velocity control; thử đi 20% trong 1 giây đo được khoảng 9,2 cm và góc bánh thay đổi khoảng 2,05 rad. Hàm điều khiển bánh xe nay luôn khôi phục mode này, kể cả lệnh dừng. Kiểm thử hồi quy mô hình hóa target native bị reset trong khi cache client vẫn là inf.

**Phép đo tay gắp tương đối trước khi đổi mốc Home sang 0 mm:** home −50,003 mm → nâng 100 tới +49,911 → hạ 30 tới +19,997 mm. Nâng/hạ 1.000 mm dừng lần lượt ở +249,923 và −49,911 mm, trong sai số hoàn tất 0,1 mm của target. Bộ backend hiện có 27 kiểm thử, xác nhận mốc khởi động/Home/Reset là 0 mm, gồm chuỗi tương đối, hai giới hạn, số không hợp lệ, cảm biến lỗi, timeout và nạp code mới giữa chuyển động.

Các phép đo xác nhận chuyển động trong world hiện tại, chưa hiệu chuẩn quãng đường/góc quay của mọi template hoặc mọi tải/cảm biến. Mỗi lần cập nhật controller cần Restart Controller hoặc mở lại world; chỉ refresh HTML không nạp Python mới.
