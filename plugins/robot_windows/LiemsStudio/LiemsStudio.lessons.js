/* Hallmark · pre-emit critique: P5 H5 E4 S5 R5 V4
 * Learning guides describe the actual bundled examples, not measured motion.
 * Template identity is supplied by the app; file names are not lesson IDs.
 */
(function (global) {
  'use strict';

  var guides = {
    empty: {
      vi: {
        kicker: 'KHỞI ĐỘNG / 01', title: 'Tạo chương trình đầu tiên',
        description: 'Bắt đầu từ trang trống và tự ghép các khối của Bạn.',
        steps: [
          { title: 'Kéo khối Bắt đầu', hint: 'Chọn Bắt đầu ở bên trái, rồi kéo khối vào vùng lập trình.' },
          { title: 'Nối một hành động', hint: 'Thêm “đi tới 50%”, “chờ 1 giây” và “dừng di chuyển” theo thứ tự.' },
          { title: 'Dự đoán rồi bấm Chạy', hint: 'Trong Webots, quan sát robot và khối đang sáng. Bản xem trước chỉ đọc thứ tự lệnh.' }
        ],
        note: 'Khối chờ giữ lệnh di chuyển trước đó trong khoảng thời gian đã chọn; khối dừng mới dừng bánh xe.'
      },
      en: {
        kicker: 'GET STARTED / 01', title: 'Create your first program',
        description: 'Start with an empty workspace and connect your own blocks.',
        steps: [
          { title: 'Drag a Start block', hint: 'Choose Start on the left, then drag the block into the workspace.' },
          { title: 'Connect an action', hint: 'Add “go forward 50%”, “wait 1 second” and “stop moving” in that order.' },
          { title: 'Predict, then press Run', hint: 'In Webots, observe the robot and the highlighted block. Browser preview only reads the command order.' }
        ],
        note: 'A wait holds the previous movement command for the chosen time; a stop block stops the wheels.'
      }
    },
    manual: {
      vi: {
        kicker: 'BÀI CỦA BẠN', title: 'Khám phá ý tưởng của Bạn',
        description: 'Đọc các khối hiện tại, thử một thay đổi và so sánh kết quả.',
        steps: [
          { title: 'Đọc từ trên xuống', hint: 'Dự đoán từng hành động. Khối lặp đọc lại các bước bên trong; khối nếu chọn một nhánh.' },
          { title: 'Thử một thay đổi nhỏ', hint: 'Đổi một tốc độ hoặc thời gian chờ. Giữ các số còn lại để dễ so sánh.' },
          { title: 'Chạy và quan sát', hint: 'Theo dõi robot trong Webots. Dùng CabiBot để hỏi về các khối đang có trong bài.' }
        ],
        note: 'Đây là bài tự tạo hoặc tệp được nhập, nên hướng dẫn dựa trên khối hiện tại thay vì giả định một bài mẫu.'
      },
      en: {
        kicker: 'YOUR PROGRAM', title: 'Explore your idea',
        description: 'Read the current blocks, try one change, then compare.',
        steps: [
          { title: 'Read from top to bottom', hint: 'Predict each action. A repeat revisits its inner steps; an if block selects one branch.' },
          { title: 'Try one small change', hint: 'Change one speed or wait duration. Keep the other values to make the comparison easier.' },
          { title: 'Run and observe', hint: 'Watch the robot in Webots. Ask CabiBot about the blocks in your current program.' }
        ],
        note: 'This is a self-authored or imported program, so guidance uses the current blocks instead of assuming a sample lesson.'
      }
    },
    first: {
      vi: {
        kicker: 'BÀI MẪU / ĐI VÀ RẼ', title: 'Cho robot đi và rẽ',
        description: 'Một chuỗi lệnh để khám phá tốc độ, thời gian chờ và thứ tự chạy.',
        steps: [
          { title: 'Đọc hai lần di chuyển', hint: 'Robot nhận lệnh đi tới 50%, chờ 1 giây, rồi rẽ phải 50% và chờ 0,5 giây.' },
          { title: 'Tìm khối dừng cuối cùng', hint: '“Dừng di chuyển” dừng bánh xe sau hai khoảng chờ. Tổng thời gian chờ trong mẫu là 1,5 giây.' },
          { title: 'Chạy rồi thử đổi một số', hint: 'Đổi thời gian chờ 1 giây thành 2 giây; giữ nguyên tốc độ để so sánh lần chạy tiếp theo.' }
        ],
        note: 'Thời gian chờ không phải quãng đường hoặc góc quay. Quan sát trong Webots để biết robot thực sự đi và rẽ thế nào.'
      },
      en: {
        kicker: 'SAMPLE / MOVE AND TURN', title: 'Move and turn your robot',
        description: 'One command chain to explore speed, waits and execution order.',
        steps: [
          { title: 'Read the two movements', hint: 'The robot receives forward at 50%, waits 1 second, then turns right at 50% and waits 0.5 seconds.' },
          { title: 'Find the final stop', hint: '“Stop moving” stops the wheels after both waits. The sample has 1.5 seconds of waiting in total.' },
          { title: 'Run, then change one value', hint: 'Change the 1-second wait to 2 seconds; keep speed unchanged to compare the next run.' }
        ],
        note: 'Wait duration is not a distance or turning angle. Observe Webots to see how the robot actually moves and turns.'
      }
    },
    loop: {
      vi: {
        kicker: 'BÀI MẪU / LẶP LẠI', title: 'Một chuỗi, bốn lần thử',
        description: 'Dùng khối lặp để chạy lại nhóm đi tới, chờ, rẽ và dừng.',
        steps: [
          { title: 'Tìm nhóm nằm trong khối lặp', hint: 'Nhóm gồm đi tới 50%, chờ 1 giây, rẽ phải 50%, chờ 0,5 giây và dừng di chuyển.' },
          { title: 'Đếm bốn vòng', hint: '“Lặp lại 4 lần” thực hiện lại cả nhóm. Thời gian chờ của mẫu là 4 × 1,5 = 6 giây.' },
          { title: 'Thử hai vòng rồi so sánh', hint: 'Đổi số lần lặp từ 4 thành 2, bấm Chạy và quan sát số lần nhóm được thực hiện.' }
        ],
        note: 'Mẫu luyện khối lặp; góc rẽ chưa được hiệu chỉnh để bảo đảm robot đi thành hình vuông.'
      },
      en: {
        kicker: 'SAMPLE / REPEAT', title: 'One chain, four rounds',
        description: 'Use a repeat block to revisit the forward, wait, turn and stop group.',
        steps: [
          { title: 'Find the group inside repeat', hint: 'The group is forward at 50%, wait 1 second, turn right at 50%, wait 0.5 seconds, then stop moving.' },
          { title: 'Count four rounds', hint: '“Repeat 4 times” executes the entire group again. The sample waits for 4 × 1.5 = 6 seconds in total.' },
          { title: 'Try two rounds and compare', hint: 'Change the repeat count from 4 to 2, press Run and observe how many times the group executes.' }
        ],
        note: 'This sample explores repetition; its turn is not calibrated to guarantee a square path.'
      }
    },
    TEST: {
      vi: {
        kicker: 'BÀI MẪU GỐC / TEST', title: 'Di chuyển và nâng / hạ tay',
        description: 'Khám phá lệnh đi tới cùng khoảng nâng và hạ tay gắp.',
        steps: [
          { title: 'Đọc lệnh đi tới', hint: 'Robot nhận tốc độ 50%, rồi chờ 2 giây. Sau khoảng chờ, lệnh di chuyển vẫn giữ nguyên.' },
          { title: 'Đọc khoảng nâng và hạ', hint: 'Tay bắt đầu ở 0 mm. “Hạ tay bớt 50 mm” đưa tay xuống −50 mm; sau đó “nâng tay thêm 250 mm” đưa tay lên +200 mm. Mỗi khối chờ tay tới đích.' },
          { title: 'Nhận biết khối đang khóa', hint: '“Gắp vật” bị bỏ qua khi tạo Python. Mẫu hiện tập trung vào nâng và hạ, chưa gắp vật.' },
          { title: 'Thêm dừng nếu cần', hint: 'Bạn có thể nối “dừng di chuyển” sau khối nâng tay để bánh xe dừng ở cuối chuỗi, rồi chạy và so sánh.' }
        ],
        note: 'Tay chỉ di chuyển trong khoảng −50 đến +250 mm; số trong khối là khoảng nâng hoặc hạ. Mẫu gốc chưa có lệnh dừng bánh xe ở cuối. Tạm dừng hoặc Reset robot khi cần dừng bài đang chạy.'
      },
      en: {
        kicker: 'ORIGINAL SAMPLE / TEST', title: 'Move and raise / lower the arm',
        description: 'Explore forward motion and relative raise / lower distances.',
        steps: [
          { title: 'Read the forward command', hint: 'The robot receives 50% speed, then waits 2 seconds. The movement setting remains active after the wait.' },
          { title: 'Read the raise and lower distances', hint: 'The arm starts at 0 mm. “Lower arm by 50 mm” moves it to −50 mm; then “raise arm by 250 mm” moves it to +200 mm. Each block waits for the arm to reach its target.' },
          { title: 'Recognize the locked block', hint: '“Grip object” is skipped when generating Python. This sample currently explores arm height, not gripping objects.' },
          { title: 'Add a stop if needed', hint: 'You can connect “stop moving” after the raise block to stop the wheels at the end, then run and compare.' }
        ],
        note: 'The arm stays between −50 and +250 mm; block values are travel distances. The original sample has no final wheel-stop command. Pause or Reset the robot when you need to stop the running program.'
      }
    },
    SENSOR_ADV: {
      vi: {
        kicker: 'BÀI MẪU GỐC / SENSOR_ADV', title: 'Chọn hướng bằng cảm biến',
        description: 'Vòng lặp đọc cảm biến và chọn một trong hai nhánh mỗi lần kiểm tra.',
        steps: [
          { title: 'Đọc điều kiện nhỏ hơn 300', hint: 'Nếu giá trị cảm biến < 300, robot nhận lệnh rẽ trái 80% rồi chờ 0,6 giây.' },
          { title: 'Đọc nhánh còn lại', hint: 'Nếu điều kiện không đúng, robot nhận lệnh đi tới 100% rồi chờ 0,1 giây. Hai nhánh là hai lựa chọn, không chạy nối tiếp nhau.' },
          { title: 'Quan sát vòng lặp liên tục', hint: 'Điều kiện vòng lặp là Đúng, nên bài kiểm tra lại cảm biến sau mỗi nhánh. Dùng Tạm dừng hoặc Reset để dừng.' },
          { title: 'Thử một mốc mới', hint: 'Đổi 300 thành 250, giữ các tốc độ và thời gian chờ, rồi quan sát thời điểm robot đổi hướng.' }
        ],
        note: '300 là mốc trên thang giá trị cảm biến hiện có, chưa quy đổi sang mm hoặc cm. Vòng lặp liên tục không có thời gian kết thúc cố định.'
      },
      en: {
        kicker: 'ORIGINAL SAMPLE / SENSOR_ADV', title: 'Choose a direction with a sensor',
        description: 'The loop reads the sensor and selects one of two branches at each check.',
        steps: [
          { title: 'Read the less-than-300 condition', hint: 'If the sensor value is < 300, the robot receives left turn at 80%, then waits 0.6 seconds.' },
          { title: 'Read the other branch', hint: 'If the condition is false, the robot receives forward at 100%, then waits 0.1 seconds. The two branches are alternatives, not consecutive actions.' },
          { title: 'Observe the continuous loop', hint: 'The loop condition is True, so the program reads the sensor again after each branch. Use Pause or Reset to stop.' },
          { title: 'Try a new threshold', hint: 'Change 300 to 250, keep speeds and wait durations unchanged, then observe when the robot changes direction.' }
        ],
        note: '300 is a threshold on the existing sensor scale, not a confirmed mm or cm distance. The continuous loop has no fixed completion time.'
      }
    }
  };

  var questions = {
    empty: {
      vi: ['Mình nên bắt đầu từ khối nào?', 'Vì sao cần khối chờ?', 'Khối dừng di chuyển làm gì?'],
      en: ['Which block should I start with?', 'Why do I need a wait block?', 'What does stop moving do?']
    },
    manual: {
      vi: ['Giải thích thứ tự bài hiện tại', 'Khối chờ trong bài này làm gì?', 'Mình có thể dùng khối lặp thế nào?'],
      en: ['Explain the order of my current program', 'What does the wait block in my program do?', 'How can I use a repeat block?']
    },
    first: {
      vi: ['Vì sao có khối chờ giữa các lệnh?', 'Tốc độ 50% có ý nghĩa gì?', 'Giải thích thứ tự bài đi và rẽ'],
      en: ['Why are there waits between commands?', 'What does 50% speed mean?', 'Explain the move-and-turn program order']
    },
    loop: {
      vi: ['Khối lặp 4 lần chạy những bước nào?', 'Khối chờ nằm trong vòng lặp làm gì?', 'Tốc độ ảnh hưởng đến mỗi vòng thế nào?'],
      en: ['Which steps does repeat 4 times run?', 'What do waits inside the loop do?', 'How does speed affect each round?']
    },
    TEST: {
      vi: ['Vì sao khối gắp vật đang khóa?', 'Khối nâng và hạ tay đi thêm bao nhiêu mm?', 'Vì sao bài TEST có khối chờ 2 giây?'],
      en: ['Why is grip object locked?', 'How far do raise and lower arm move?', 'Why does TEST wait for 2 seconds?']
    },
    SENSOR_ADV: {
      vi: ['Giải thích hai nhánh của chương trình', 'Mốc cảm biến 300 quyết định điều gì?', 'Vì sao vòng lặp chạy liên tục?'],
      en: ['Explain the two program branches', 'What does the sensor threshold 300 decide?', 'Why does the loop keep running?']
    }
  };

  function freeze(value) {
    Object.keys(value).forEach(function (key) {
      if (value[key] && typeof value[key] === 'object') freeze(value[key]);
    });
    return Object.freeze(value);
  }
  function selectId(templateId) {
    // square is the legacy internal name of the four-round example.
    var id = templateId === 'square' ? 'loop' : templateId;
    return Object.prototype.hasOwnProperty.call(guides, id) ? id : 'manual';
  }
  freeze(guides); freeze(questions);
  global.LiemsStudioLessons = Object.freeze({
    getGuide: function (templateId, language) { return guides[selectId(templateId)][language === 'en' ? 'en' : 'vi']; },
    getQuestions: function (templateId, language) { return questions[selectId(templateId)][language === 'en' ? 'en' : 'vi']; },
    templateIds: Object.freeze(['first', 'loop', 'TEST', 'SENSOR_ADV'])
  });
})(window);
