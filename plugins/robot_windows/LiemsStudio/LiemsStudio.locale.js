/* LIEMS preview locale support. Uses the bundled Blockly language dictionaries. */
(function(global) {
  "use strict";
  function localeVi(Blockly) {
// This file was automatically generated.  Do not modify.

'use strict';

Blockly.Msg["ADD_COMMENT"] = "Thêm Chú Giải";
Blockly.Msg["CANNOT_DELETE_VARIABLE_PROCEDURE"] = "Không thể xóa giá trị '%1' vì nó được bao gồm trong định nghĩa của chức năng '%2'";
Blockly.Msg["CHANGE_VALUE_TITLE"] = "Thay giá trị thành:";
Blockly.Msg["CLEAN_UP"] = "Sắp xếp lại các khối";
Blockly.Msg["COLLAPSED_WARNINGS_WARNING"] = "Các khối bị sập có chứa cảnh báo.";
Blockly.Msg["COLLAPSE_ALL"] = "Thu Nhỏ Mọi Mảnh";
Blockly.Msg["COLLAPSE_BLOCK"] = "Thu Nhỏ Mảnh";
Blockly.Msg["COLOUR_BLEND_COLOUR1"] = "màu 1";
Blockly.Msg["COLOUR_BLEND_COLOUR2"] = "màu 2";
Blockly.Msg["COLOUR_BLEND_HELPURL"] = "https://meyerweb.com/eric/tools/color-blend/#:::rgbp";  // untranslated
Blockly.Msg["COLOUR_BLEND_RATIO"] = "tỉ lệ";
Blockly.Msg["COLOUR_BLEND_TITLE"] = "pha";
Blockly.Msg["COLOUR_BLEND_TOOLTIP"] = "Pha hai màu với nhau theo tỉ lệ (0 - 100).";
Blockly.Msg["COLOUR_PICKER_HELPURL"] = "https://vi.wikipedia.org/wiki/M%C3%A0u_s%E1%BA%AFc";
Blockly.Msg["COLOUR_PICKER_TOOLTIP"] = "Chọn một màu từ bảng màu.";
Blockly.Msg["COLOUR_RANDOM_HELPURL"] = "http://randomcolour.com";  // untranslated
Blockly.Msg["COLOUR_RANDOM_TITLE"] = "màu bất kỳ";
Blockly.Msg["COLOUR_RANDOM_TOOLTIP"] = "chọn một màu bất kỳ.";
Blockly.Msg["COLOUR_RGB_BLUE"] = "màu xanh dương";
Blockly.Msg["COLOUR_RGB_GREEN"] = "màu xanh lá cây";
Blockly.Msg["COLOUR_RGB_HELPURL"] = "https://www.december.com/html/spec/colorpercompact.html";  // untranslated
Blockly.Msg["COLOUR_RGB_RED"] = "màu đỏ";
Blockly.Msg["COLOUR_RGB_TITLE"] = "tạo màu từ";
Blockly.Msg["COLOUR_RGB_TOOLTIP"] = "Tạo màu từ ba màu: đỏ, xanh lá cây, xanh dương với số lượng cụ thể.  Mỗi số phải có giá trị từ 0 đến 100.";
Blockly.Msg["CONTROLS_FLOW_STATEMENTS_HELPURL"] = "https://github.com/google/blockly/wiki/Loops#loop-termination-blocks";  // untranslated
Blockly.Msg["CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK"] = "thoát";
Blockly.Msg["CONTROLS_FLOW_STATEMENTS_OPERATOR_CONTINUE"] = "sang lần lặp tiếp theo";
Blockly.Msg["CONTROLS_FLOW_STATEMENTS_TOOLTIP_BREAK"] = "Thoát khỏi vòng lặp hiện tại.";
Blockly.Msg["CONTROLS_FLOW_STATEMENTS_TOOLTIP_CONTINUE"] = "Bỏ qua phần còn lại trong vòng lặp này, và sang lần lặp tiếp theo.";
Blockly.Msg["CONTROLS_FLOW_STATEMENTS_WARNING"] = "Chú ý: Mảnh này chỉ có thế dùng trong các vòng lặp.";
Blockly.Msg["CONTROLS_FOREACH_HELPURL"] = "https://github.com/google/blockly/wiki/Loops#for-each";  // untranslated
Blockly.Msg["CONTROLS_FOREACH_TITLE"] = "với mỗi thành phần %1 trong danh sách %2";
Blockly.Msg["CONTROLS_FOREACH_TOOLTIP"] = "Trong một danh sách, lấy từng thành phần, gán vào biến \"%1\", rồi thực hiện một số lệnh.";
Blockly.Msg["CONTROLS_FOR_HELPURL"] = "https://github.com/google/blockly/wiki/Loops#count-with";  // untranslated
Blockly.Msg["CONTROLS_FOR_TITLE"] = "đếm theo %1 từ %2 đến %3 mỗi lần thêm %4";
Blockly.Msg["CONTROLS_FOR_TOOLTIP"] = "Cho biến '%1' lấy các giá trị từ số bắt đầu đến số kết thúc, đếm theo khoảng thời gian đã chỉ định và thực hiện các khối được chỉ định.";
Blockly.Msg["CONTROLS_IF_ELSEIF_TOOLTIP"] = "Thêm một điều kiện vào mảnh nếu.";
Blockly.Msg["CONTROLS_IF_ELSE_TOOLTIP"] = "Cuối cùng, khi không điều kiện nào đúng.";
Blockly.Msg["CONTROLS_IF_HELPURL"] = "https://github.com/google/blockly/wiki/IfElse";  // untranslated
Blockly.Msg["CONTROLS_IF_IF_TOOLTIP"] = "Thêm, bỏ, hoặc đổi thứ tự các mảnh con để tạo cấu trúc mới cho mảnh nếu.";
Blockly.Msg["CONTROLS_IF_MSG_ELSE"] = "nếu không";
Blockly.Msg["CONTROLS_IF_MSG_ELSEIF"] = "nếu không nếu";
Blockly.Msg["CONTROLS_IF_MSG_IF"] = "nếu";
Blockly.Msg["CONTROLS_IF_TOOLTIP_1"] = "Nếu điều kiện đúng, thực hiện các lệnh.";
Blockly.Msg["CONTROLS_IF_TOOLTIP_2"] = "Nếu điều kiện đúng, thực hiện các lệnh đầu.  Nếu sai, thực hiện các lệnh sau.";
Blockly.Msg["CONTROLS_IF_TOOLTIP_3"] = "Nếu điều kiện đúng, thực hiện các lệnh đầu.  Nếu không, nếu điều kiện thứ hai đúng, thực hiện các lệnh thứ hai.";
Blockly.Msg["CONTROLS_IF_TOOLTIP_4"] = "Nếu điều kiện đúng, thực hiện các lệnh đầu.  Nếu không, nếu điều kiện thứ hai đúng, thực hiện các lệnh thứ hai.  Nếu không điều kiện nào đúng, thực hiện các lệnh cuối cùng.";
Blockly.Msg["CONTROLS_REPEAT_HELPURL"] = "https://en.wikipedia.org/wiki/For_loop";
Blockly.Msg["CONTROLS_REPEAT_INPUT_DO"] = "thực hiện";
Blockly.Msg["CONTROLS_REPEAT_TITLE"] = "lặp lại %1 lần";
Blockly.Msg["CONTROLS_REPEAT_TOOLTIP"] = "Thực hiện các lệnh vài lần.";
Blockly.Msg["CONTROLS_WHILEUNTIL_HELPURL"] = "https://github.com/google/blockly/wiki/Loops#repeat";  // untranslated
Blockly.Msg["CONTROLS_WHILEUNTIL_OPERATOR_UNTIL"] = "lặp lại cho đến khi";
Blockly.Msg["CONTROLS_WHILEUNTIL_OPERATOR_WHILE"] = "lặp lại trong khi";
Blockly.Msg["CONTROLS_WHILEUNTIL_TOOLTIP_UNTIL"] = "Miễn là điều kiện còn sai, thì thực hiện các lệnh.  Khi điều kiện đúng thì ngưng.";
Blockly.Msg["CONTROLS_WHILEUNTIL_TOOLTIP_WHILE"] = "Miễn là điều kiện còn đúng, thì thực hiện các lệnh.";
Blockly.Msg["DELETE_ALL_BLOCKS"] = "Xóa hết %1 mảnh?";
Blockly.Msg["DELETE_BLOCK"] = "Xóa Mảnh Này";
Blockly.Msg["DELETE_VARIABLE"] = "Xóa giá trị '%1'";
Blockly.Msg["DELETE_VARIABLE_CONFIRMATION"] = "Xóa %1 lần dùng của giá trị '%2'?";
Blockly.Msg["DELETE_X_BLOCKS"] = "Xóa %1 Mảnh";
Blockly.Msg["DISABLE_BLOCK"] = "Ngưng Tác Dụng";
Blockly.Msg["DUPLICATE_BLOCK"] = "Tạo Bản Sao";
Blockly.Msg["DUPLICATE_COMMENT"] = "Bình luận trùng";
Blockly.Msg["ENABLE_BLOCK"] = "Phục Hồi Tác Dụng";
Blockly.Msg["EXPAND_ALL"] = "Mở Lớn Mọi Mảnh";
Blockly.Msg["EXPAND_BLOCK"] = "Mở Lớn Mảnh";
Blockly.Msg["EXTERNAL_INPUTS"] = "Chỗ Gắn Bên Ngoài";
Blockly.Msg["HELP"] = "Trợ Giúp";
Blockly.Msg["INLINE_INPUTS"] = "Chỗ Gắn Cùng Dòng";
Blockly.Msg["IOS_CANCEL"] = "Hủy bỏ";
Blockly.Msg["IOS_ERROR"] = "Lỗi";
Blockly.Msg["IOS_OK"] = "Đồng ý";
Blockly.Msg["IOS_PROCEDURES_ADD_INPUT"] = "+ Thêm đầu vào";
Blockly.Msg["IOS_PROCEDURES_ALLOW_STATEMENTS"] = "Cho phép báo cáo";
Blockly.Msg["IOS_PROCEDURES_DUPLICATE_INPUTS_ERROR"] = "Hàm này có chứa các input trùng nhau.";
Blockly.Msg["IOS_PROCEDURES_INPUTS"] = "NHẬP VÀO";
Blockly.Msg["IOS_VARIABLES_ADD_BUTTON"] = "Thêm";
Blockly.Msg["IOS_VARIABLES_ADD_VARIABLE"] = "+ Thêm biến";
Blockly.Msg["IOS_VARIABLES_DELETE_BUTTON"] = "Xóa";
Blockly.Msg["IOS_VARIABLES_EMPTY_NAME_ERROR"] = "Bạn không thể không nhập tên biến.";
Blockly.Msg["IOS_VARIABLES_RENAME_BUTTON"] = "Đổi tên";
Blockly.Msg["IOS_VARIABLES_VARIABLE_NAME"] = "Tên biến";
Blockly.Msg["LISTS_CREATE_EMPTY_HELPURL"] = "https://github.com/google/blockly/wiki/Lists#create-empty-list";  // untranslated
Blockly.Msg["LISTS_CREATE_EMPTY_TITLE"] = "tạo danh sách trống";
Blockly.Msg["LISTS_CREATE_EMPTY_TOOLTIP"] = "Hoàn trả một danh sách, với độ dài 0, không có thành tố nào cả";
Blockly.Msg["LISTS_CREATE_WITH_CONTAINER_TITLE_ADD"] = "danh sách";
Blockly.Msg["LISTS_CREATE_WITH_CONTAINER_TOOLTIP"] = "Thêm, bỏ, hoặc sắp xếp lại các thành phần để tạo dựng mảnh danh sách này.";
Blockly.Msg["LISTS_CREATE_WITH_HELPURL"] = "https://github.com/google/blockly/wiki/Lists#create-list-with";  // untranslated
Blockly.Msg["LISTS_CREATE_WITH_INPUT_WITH"] = "tạo danh sách gồm";
Blockly.Msg["LISTS_CREATE_WITH_ITEM_TOOLTIP"] = "Thêm vật vào danh sách.";
Blockly.Msg["LISTS_CREATE_WITH_TOOLTIP"] = "Tạo một danh sách bao gồm nhiều vậts, với một số lượng bất kỳ.";
Blockly.Msg["LISTS_GET_INDEX_FIRST"] = "đầu tiên";
Blockly.Msg["LISTS_GET_INDEX_FROM_END"] = "(đếm từ cuối) thứ";
Blockly.Msg["LISTS_GET_INDEX_FROM_START"] = "thứ";
Blockly.Msg["LISTS_GET_INDEX_GET"] = "lấy thành tố";
Blockly.Msg["LISTS_GET_INDEX_GET_REMOVE"] = "lấy và xóa thành tố";
Blockly.Msg["LISTS_GET_INDEX_LAST"] = "cuối cùng";
Blockly.Msg["LISTS_GET_INDEX_RANDOM"] = "bất kỳ";
Blockly.Msg["LISTS_GET_INDEX_REMOVE"] = "xóa thành tố";
Blockly.Msg["LISTS_GET_INDEX_TAIL"] = "";  // untranslated
Blockly.Msg["LISTS_GET_INDEX_TOOLTIP_GET_FIRST"] = "Hoàn trả thành tố đầu tiên trong danh sách.";
Blockly.Msg["LISTS_GET_INDEX_TOOLTIP_GET_FROM"] = "Hoàn trả thành tố trong danh sách ở vị trí ấn định.";
Blockly.Msg["LISTS_GET_INDEX_TOOLTIP_GET_LAST"] = "Hoàn trả thành tố cuối cùng trong danh sách.";
Blockly.Msg["LISTS_GET_INDEX_TOOLTIP_GET_RANDOM"] = "Hoàn trả một thành tố bất kỳ trong danh sách.";
Blockly.Msg["LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_FIRST"] = "Hoàn trả và xóa thành tố đầu tiên trong danh sách.";
Blockly.Msg["LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_FROM"] = "Hoàn trả và xóa thành tố trong danh sách ở vị trí ấn định.";
Blockly.Msg["LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_LAST"] = "Hoàn trả và xóa thành tố cuối cùng trong danh sách.";
Blockly.Msg["LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_RANDOM"] = "Hoàn trả và xóa mộtthành tố bất kỳ trong danh sách.";
Blockly.Msg["LISTS_GET_INDEX_TOOLTIP_REMOVE_FIRST"] = "Xóa thành tố đầu tiên trong danh sách.";
Blockly.Msg["LISTS_GET_INDEX_TOOLTIP_REMOVE_FROM"] = "Xóa thành tố trong danh sách ở vị trí ấn định.";
Blockly.Msg["LISTS_GET_INDEX_TOOLTIP_REMOVE_LAST"] = "Xóa thành tố cuối cùng trong danh sách.";
Blockly.Msg["LISTS_GET_INDEX_TOOLTIP_REMOVE_RANDOM"] = "Xóa thành tố bất kỳ trong danh sách.";
Blockly.Msg["LISTS_GET_SUBLIST_END_FROM_END"] = "đến (đếm từ cuối) thứ";
Blockly.Msg["LISTS_GET_SUBLIST_END_FROM_START"] = "đến thứ";
Blockly.Msg["LISTS_GET_SUBLIST_END_LAST"] = "đến cuối cùng";
Blockly.Msg["LISTS_GET_SUBLIST_HELPURL"] = "https://github.com/google/blockly/wiki/Lists#getting-a-sublist";  // untranslated
Blockly.Msg["LISTS_GET_SUBLIST_START_FIRST"] = "lấy một danh sách con từ đầu tiên";
Blockly.Msg["LISTS_GET_SUBLIST_START_FROM_END"] = "lấy một danh sách con từ (đếm từ cuối) từ vị trí thứ";
Blockly.Msg["LISTS_GET_SUBLIST_START_FROM_START"] = "lấy một danh sách con từ vị trí thứ";
Blockly.Msg["LISTS_GET_SUBLIST_TAIL"] = "";  // untranslated
Blockly.Msg["LISTS_GET_SUBLIST_TOOLTIP"] = "Lấy một mảng của danh sách này để tạo danh sách con.";
Blockly.Msg["LISTS_INDEX_FROM_END_TOOLTIP"] = "%1 là thành tố cuối cùng.";
Blockly.Msg["LISTS_INDEX_FROM_START_TOOLTIP"] = "%1 là thành tố đầu tiên.";
Blockly.Msg["LISTS_INDEX_OF_FIRST"] = "tìm sự có mặt đầu tiên của vật";
Blockly.Msg["LISTS_INDEX_OF_HELPURL"] = "https://github.com/google/blockly/wiki/Lists#getting-items-from-a-list";  // untranslated
Blockly.Msg["LISTS_INDEX_OF_LAST"] = "tìm sự có mặt cuối cùng của vật";
Blockly.Msg["LISTS_INDEX_OF_TOOLTIP"] = "Hoàn trả vị trí xuất hiện đầu tiên/cuối cùng của vật trong danh sách. Nếu không tìm thấy thì hoàn trả số %1.";
Blockly.Msg["LISTS_INLIST"] = "trong danh sách";
Blockly.Msg["LISTS_ISEMPTY_HELPURL"] = "https://github.com/google/blockly/wiki/Lists#is-empty";  // untranslated
Blockly.Msg["LISTS_ISEMPTY_TITLE"] = "%1 trống rỗng";
Blockly.Msg["LISTS_ISEMPTY_TOOLTIP"] = "Hoàn trả “đúng\" nếu danh sách không có thành tử nào.";
Blockly.Msg["LISTS_LENGTH_HELPURL"] = "https://github.com/google/blockly/wiki/Lists#length-of";  // untranslated
Blockly.Msg["LISTS_LENGTH_TITLE"] = "độ dài của %1";
Blockly.Msg["LISTS_LENGTH_TOOLTIP"] = "Hoàn trả độ dài của một danh sách.";
Blockly.Msg["LISTS_REPEAT_HELPURL"] = "https://github.com/google/blockly/wiki/Lists#create-list-with";  // untranslated
Blockly.Msg["LISTS_REPEAT_TITLE"] = "tạo danh sách gồm một vật %1 lặp lại %2 lần";
Blockly.Msg["LISTS_REPEAT_TOOLTIP"] = "Tạo danh sách gồm một số lượng vật nhất định với mỗi vật đều giống nhau.";
Blockly.Msg["LISTS_REVERSE_HELPURL"] = "https://github.com/google/blockly/wiki/Lists#reversing-a-list";  // untranslated
Blockly.Msg["LISTS_REVERSE_MESSAGE0"] = "đảo ngược %1";
Blockly.Msg["LISTS_REVERSE_TOOLTIP"] = "Đảo ngược bản sao chép của một danh sách.";
Blockly.Msg["LISTS_SET_INDEX_HELPURL"] = "https://github.com/google/blockly/wiki/Lists#in-list--set";  // untranslated
Blockly.Msg["LISTS_SET_INDEX_INPUT_TO"] = "giá trị";
Blockly.Msg["LISTS_SET_INDEX_INSERT"] = "chèn vào vị trí";
Blockly.Msg["LISTS_SET_INDEX_SET"] = "đặt";
Blockly.Msg["LISTS_SET_INDEX_TOOLTIP_INSERT_FIRST"] = "Chèn vật vào đầu danh sách.";
Blockly.Msg["LISTS_SET_INDEX_TOOLTIP_INSERT_FROM"] = "Chèn vật vào danh sách theo vị trí ấn định.";
Blockly.Msg["LISTS_SET_INDEX_TOOLTIP_INSERT_LAST"] = "Gắn thêm vật vào cuối danh sách.";
Blockly.Msg["LISTS_SET_INDEX_TOOLTIP_INSERT_RANDOM"] = "Gắn chèn vật vào danh sách ở vị trí ngẫu nhiên.";
Blockly.Msg["LISTS_SET_INDEX_TOOLTIP_SET_FIRST"] = "Đặt giá trị của thành tố đầu tiên trong danh sách.";
Blockly.Msg["LISTS_SET_INDEX_TOOLTIP_SET_FROM"] = "Đặt giá trị của thành tố ở vị trí ấn định trong một danh sách.";
Blockly.Msg["LISTS_SET_INDEX_TOOLTIP_SET_LAST"] = "Đặt giá trị của thành tố cuối cùng trong danh sách.";
Blockly.Msg["LISTS_SET_INDEX_TOOLTIP_SET_RANDOM"] = "Đặt giá trị của thành tố ngẫu nhiên trong danh sách.";
Blockly.Msg["LISTS_SORT_HELPURL"] = "https://github.com/google/blockly/wiki/Lists#sorting-a-list";
Blockly.Msg["LISTS_SORT_ORDER_ASCENDING"] = "tăng dần";
Blockly.Msg["LISTS_SORT_ORDER_DESCENDING"] = "giảm dần";
Blockly.Msg["LISTS_SORT_TITLE"] = "sắp xếp %1 %2 %3";
Blockly.Msg["LISTS_SORT_TOOLTIP"] = "Sắp xếp một bản sao của một danh sách.";
Blockly.Msg["LISTS_SORT_TYPE_IGNORECASE"] = "chữ cái, không phân biệt hoa/thường";
Blockly.Msg["LISTS_SORT_TYPE_NUMERIC"] = "số";
Blockly.Msg["LISTS_SORT_TYPE_TEXT"] = "chữ cái";
Blockly.Msg["LISTS_SPLIT_HELPURL"] = "https://github.com/google/blockly/wiki/Lists#splitting-strings-and-joining-lists";  // untranslated
Blockly.Msg["LISTS_SPLIT_LIST_FROM_TEXT"] = "tạo danh sách từ văn bản";
Blockly.Msg["LISTS_SPLIT_TEXT_FROM_LIST"] = "tạo văn bản từ danh sách";
Blockly.Msg["LISTS_SPLIT_TOOLTIP_JOIN"] = "Liên kết một danh sách các văn bản vào một văn bản, cách nhau bằng dấu phân cách.";
Blockly.Msg["LISTS_SPLIT_TOOLTIP_SPLIT"] = "Tách văn bản thành một danh sách các văn bản nhỏ, ngắt bởi các ký tự phân cách.";
Blockly.Msg["LISTS_SPLIT_WITH_DELIMITER"] = "với ký tự phân cách";
Blockly.Msg["LOGIC_BOOLEAN_FALSE"] = "sai";
Blockly.Msg["LOGIC_BOOLEAN_HELPURL"] = "https://github.com/google/blockly/wiki/Logic#values";  // untranslated
Blockly.Msg["LOGIC_BOOLEAN_TOOLTIP"] = "Hoàn trả \"đúng\" hoặc \"sai\".";
Blockly.Msg["LOGIC_BOOLEAN_TRUE"] = "đúng";
Blockly.Msg["LOGIC_COMPARE_HELPURL"] = "https://vi.wikipedia.org/wiki/B%E1%BA%A5t_%C4%91%E1%BA%B3ng_th%E1%BB%A9c";
Blockly.Msg["LOGIC_COMPARE_TOOLTIP_EQ"] = "Hoàn trả giá trị \"đúng\" (true) nếu giá trị hai đầu vào bằng nhau.";
Blockly.Msg["LOGIC_COMPARE_TOOLTIP_GT"] = "Hoàn trả giá trị \"đúng\" (true) nếu đầu vào thứ nhất lớn hơn đầu vào thứ hai.";
Blockly.Msg["LOGIC_COMPARE_TOOLTIP_GTE"] = "Hoàn trả giá trị \"đúng\" (true) nếu đầu vào thứ nhất lớn hơn hoặc bằng đầu vào thứ hai.";
Blockly.Msg["LOGIC_COMPARE_TOOLTIP_LT"] = "Hoàn trả giá trị \"đúng\" (true) nếu đầu vào thứ nhất nhỏ hơn đầu vào thứ hai.";
Blockly.Msg["LOGIC_COMPARE_TOOLTIP_LTE"] = "Hoàn trả giá trị \"đúng\" (true) nếu đầu vào thứ nhất nhỏ hơn hoặc bằng đầu vào thứ hai.";
Blockly.Msg["LOGIC_COMPARE_TOOLTIP_NEQ"] = "Hoàn trả giá trị \"đúng\" (true) nếu giá trị hai đầu vào không bằng nhau.";
Blockly.Msg["LOGIC_NEGATE_HELPURL"] = "https://github.com/google/blockly/wiki/Logic#not";  // untranslated
Blockly.Msg["LOGIC_NEGATE_TITLE"] = "không %1";
Blockly.Msg["LOGIC_NEGATE_TOOLTIP"] = "Hoàn trả \"đúng\" (true) nếu đầu vào sai.  Hoàn trả \"sai\" (false) nếu đầu vào đúng.";
Blockly.Msg["LOGIC_NULL"] = "trống không";
Blockly.Msg["LOGIC_NULL_HELPURL"] = "https://en.wikipedia.org/wiki/Nullable_type";  // untranslated
Blockly.Msg["LOGIC_NULL_TOOLTIP"] = "Hoàn trả trống không.";
Blockly.Msg["LOGIC_OPERATION_AND"] = "và";
Blockly.Msg["LOGIC_OPERATION_HELPURL"] = "https://github.com/google/blockly/wiki/Logic#logical-operations";  // untranslated
Blockly.Msg["LOGIC_OPERATION_OR"] = "hoặc";
Blockly.Msg["LOGIC_OPERATION_TOOLTIP_AND"] = "Hoàn trả \"đúng\" (true) nếu cả hai đầu vào đều đúng.";
Blockly.Msg["LOGIC_OPERATION_TOOLTIP_OR"] = "Hoàn trả \"đúng\" (true) nếu ít nhất một trong hai đầu vào đúng.";
Blockly.Msg["LOGIC_TERNARY_CONDITION"] = "kiểm tra";
Blockly.Msg["LOGIC_TERNARY_HELPURL"] = "https://en.wikipedia.org/wiki/%3F:";  // untranslated
Blockly.Msg["LOGIC_TERNARY_IF_FALSE"] = "nếu sai";
Blockly.Msg["LOGIC_TERNARY_IF_TRUE"] = "nếu đúng";
Blockly.Msg["LOGIC_TERNARY_TOOLTIP"] = "Kiểm tra điều kiện. Nếu điều kiện đúng, hoàn trả giá trị từ mệnh đề \"nếu đúng\" nếu không đúng, hoàn trả giá trị từ mệnh đề \"nếu sai\".";
Blockly.Msg["MATH_ADDITION_SYMBOL"] = "+";  // untranslated
Blockly.Msg["MATH_ARITHMETIC_HELPURL"] = "https://vi.wikipedia.org/wiki/S%E1%BB%91_h%E1%BB%8Dc";
Blockly.Msg["MATH_ARITHMETIC_TOOLTIP_ADD"] = "Hoàn trả tổng của hai con số.";
Blockly.Msg["MATH_ARITHMETIC_TOOLTIP_DIVIDE"] = "Hoàn trả thương của hai con số.";
Blockly.Msg["MATH_ARITHMETIC_TOOLTIP_MINUS"] = "Hoàn trả hiệu của hai con số.";
Blockly.Msg["MATH_ARITHMETIC_TOOLTIP_MULTIPLY"] = "Hoàn trả tích của hai con số.";
Blockly.Msg["MATH_ARITHMETIC_TOOLTIP_POWER"] = "Hoàn trả số lũy thừa với số thứ nhất là cơ số và số thứ hai là số mũ.";
Blockly.Msg["MATH_ATAN2_HELPURL"] = "https://en.wikipedia.org/wiki/Atan2";
Blockly.Msg["MATH_ATAN2_TITLE"] = "atan2 của X:%1 Y:%2";
Blockly.Msg["MATH_ATAN2_TOOLTIP"] = "Trả về arctangent của điểm (X, Y) trong khoảng từ -180 độ đến 180 độ.";
Blockly.Msg["MATH_CHANGE_HELPURL"] = "https://vi.wikipedia.org/wiki/Ph%C3%A9p_c%E1%BB%99ng";
Blockly.Msg["MATH_CHANGE_TITLE"] = "cộng vào %1 giá trị %2";
Blockly.Msg["MATH_CHANGE_TOOLTIP"] = "Cộng số đầu vào vào biến \"%1\".";
Blockly.Msg["MATH_CONSTANT_HELPURL"] = "https://en.wikipedia.org/wiki/Mathematical_constant";
Blockly.Msg["MATH_CONSTANT_TOOLTIP"] = "Hoàn trả các đẳng số thường gặp: π (3.141…), e (2.718…), φ (1.618…), sqrt(2) (1.414…), sqrt(½) (0.707…), or ∞ (vô cực).";
Blockly.Msg["MATH_CONSTRAIN_HELPURL"] = "https://en.wikipedia.org/wiki/Clamping_(graphics)";  // untranslated
Blockly.Msg["MATH_CONSTRAIN_TITLE"] = "giới hạn %1 không dưới %2 không hơn %3";
Blockly.Msg["MATH_CONSTRAIN_TOOLTIP"] = "Giới hạn số đầu vào để không dưới số thứ nhất và không hơn số thứ hai.";
Blockly.Msg["MATH_DIVISION_SYMBOL"] = "÷";  // untranslated
Blockly.Msg["MATH_IS_DIVISIBLE_BY"] = "chia hết cho";
Blockly.Msg["MATH_IS_EVEN"] = "là số chẵn";
Blockly.Msg["MATH_IS_NEGATIVE"] = "là số âm";
Blockly.Msg["MATH_IS_ODD"] = "là số lẻ";
Blockly.Msg["MATH_IS_POSITIVE"] = "là số dương";
Blockly.Msg["MATH_IS_PRIME"] = "là số nguyên tố";
Blockly.Msg["MATH_IS_TOOLTIP"] = "Kiểm tra con số xem nó có phải là số chẵn, lẻ, nguyên tố, nguyên, dương, âm,  hay xem nó có chia hết cho số đầu vào hay không.  Hoàn trả đúng hay sai.";
Blockly.Msg["MATH_IS_WHOLE"] = "là số nguyên";
Blockly.Msg["MATH_MODULO_HELPURL"] = "https://en.wikipedia.org/wiki/Modulo_operation";
Blockly.Msg["MATH_MODULO_TITLE"] = "số dư của %1 ÷ %2";
Blockly.Msg["MATH_MODULO_TOOLTIP"] = "Chia số thứ nhất cho số thứ hai rồi hoàn trả số dư từ.";
Blockly.Msg["MATH_MULTIPLICATION_SYMBOL"] = "×";  // untranslated
Blockly.Msg["MATH_NUMBER_HELPURL"] = "https://vi.wikipedia.org/wiki/S%E1%BB%91";
Blockly.Msg["MATH_NUMBER_TOOLTIP"] = "Một con số.";
Blockly.Msg["MATH_ONLIST_HELPURL"] = "";
Blockly.Msg["MATH_ONLIST_OPERATOR_AVERAGE"] = "giá trị trung bình của một danh sách";
Blockly.Msg["MATH_ONLIST_OPERATOR_MAX"] = "số lớn nhât của một danh sách";
Blockly.Msg["MATH_ONLIST_OPERATOR_MEDIAN"] = "số trung vị của một danh sách";
Blockly.Msg["MATH_ONLIST_OPERATOR_MIN"] = "số nhỏ nhất của một danh sách";
Blockly.Msg["MATH_ONLIST_OPERATOR_MODE"] = "các mode của một danh sách";
Blockly.Msg["MATH_ONLIST_OPERATOR_RANDOM"] = "một số bất kỳ của một danh sách";
Blockly.Msg["MATH_ONLIST_OPERATOR_STD_DEV"] = "độ lệch chuẩn của một danh sách";
Blockly.Msg["MATH_ONLIST_OPERATOR_SUM"] = "tổng của một danh sách";
Blockly.Msg["MATH_ONLIST_TOOLTIP_AVERAGE"] = "Hoàn trả giá trị trung bình từ của danh sách số.";
Blockly.Msg["MATH_ONLIST_TOOLTIP_MAX"] = "Hoàn trả số lớn nhất trong tất cả các số trong danh sách.";
Blockly.Msg["MATH_ONLIST_TOOLTIP_MEDIAN"] = "Hoàn trả số trung vị của danh sách số.";
Blockly.Msg["MATH_ONLIST_TOOLTIP_MIN"] = "Hoàn trả số nhỏ nhất trong tất cả các số trong danh sách.";
Blockly.Msg["MATH_ONLIST_TOOLTIP_MODE"] = "Hoàn trả các số có mặt nhiều nhất trong danh sách.";
Blockly.Msg["MATH_ONLIST_TOOLTIP_RANDOM"] = "Hoàn trả một số bất kỳ từ các số trong danh sách.";
Blockly.Msg["MATH_ONLIST_TOOLTIP_STD_DEV"] = "Hoàn trả độ lệch chuẩn của danh sách số.";
Blockly.Msg["MATH_ONLIST_TOOLTIP_SUM"] = "Hoàn trả tổng số của tất cả các số trong danh sách.";
Blockly.Msg["MATH_POWER_SYMBOL"] = "^";  // untranslated
Blockly.Msg["MATH_RANDOM_FLOAT_HELPURL"] = "https://en.wikipedia.org/wiki/Random_number_generation";
Blockly.Msg["MATH_RANDOM_FLOAT_TITLE_RANDOM"] = "phân số bất kỳ";
Blockly.Msg["MATH_RANDOM_FLOAT_TOOLTIP"] = "Hoàn trả một phân số bất kỳ không nhỏ hơn 0.0 và không lớn hơn 1.0.";
Blockly.Msg["MATH_RANDOM_INT_HELPURL"] = "https://en.wikipedia.org/wiki/Random_number_generation";
Blockly.Msg["MATH_RANDOM_INT_TITLE"] = "Một số nguyên bất kỳ từ %1 đến %2";
Blockly.Msg["MATH_RANDOM_INT_TOOLTIP"] = "Hoàn trả một số nguyên bất kỳ lớn hơn hoặc bằng số đầu và nhỏ hơn hoặc bằng số sau.";
Blockly.Msg["MATH_ROUND_HELPURL"] = "https://en.wikipedia.org/wiki/Rounding";
Blockly.Msg["MATH_ROUND_OPERATOR_ROUND"] = "làm tròn";
Blockly.Msg["MATH_ROUND_OPERATOR_ROUNDDOWN"] = "làm tròn xuống";
Blockly.Msg["MATH_ROUND_OPERATOR_ROUNDUP"] = "làm tròn lên";
Blockly.Msg["MATH_ROUND_TOOLTIP"] = "Làm tròn lên hoặc tròn xuống số đầu vào.";
Blockly.Msg["MATH_SINGLE_HELPURL"] = "https://vi.wikipedia.org/wiki/C%C4%83n_b%E1%BA%ADc_hai";
Blockly.Msg["MATH_SINGLE_OP_ABSOLUTE"] = "giá trị tuyệt đối";
Blockly.Msg["MATH_SINGLE_OP_ROOT"] = "căn bật hai";
Blockly.Msg["MATH_SINGLE_TOOLTIP_ABS"] = "Hoàn trả giá trị tuyệt đối của số đầu vào.";
Blockly.Msg["MATH_SINGLE_TOOLTIP_EXP"] = "Hoàn trả lũy thừa của số e với số mũ đầu vào.";
Blockly.Msg["MATH_SINGLE_TOOLTIP_LN"] = "Hoàn trả lôgarit tự nhiên của số đầu vào.";
Blockly.Msg["MATH_SINGLE_TOOLTIP_LOG10"] = "Hoàn trả lôgarit cơ số 10 của số đầu vào.";
Blockly.Msg["MATH_SINGLE_TOOLTIP_NEG"] = "Đổi dấu của số đầu vào: âm thành dương và dương thành âm, và hoàn trả số mới.";
Blockly.Msg["MATH_SINGLE_TOOLTIP_POW10"] = "Hoàn trả lũy thừa của số 10 với số mũ đầu vào.";
Blockly.Msg["MATH_SINGLE_TOOLTIP_ROOT"] = "Hoàn trả căn bật hai của số đầu vào.";
Blockly.Msg["MATH_SUBTRACTION_SYMBOL"] = "-";  // untranslated
Blockly.Msg["MATH_TRIG_ACOS"] = "acos";  // untranslated
Blockly.Msg["MATH_TRIG_ASIN"] = "asin";  // untranslated
Blockly.Msg["MATH_TRIG_ATAN"] = "atan";  // untranslated
Blockly.Msg["MATH_TRIG_COS"] = "cos";  // untranslated
Blockly.Msg["MATH_TRIG_HELPURL"] = "https://vi.wikipedia.org/wiki/H%C3%A0m_l%C6%B0%E1%BB%A3ng_gi%C3%A1c";
Blockly.Msg["MATH_TRIG_SIN"] = "sin";  // untranslated
Blockly.Msg["MATH_TRIG_TAN"] = "tan";  // untranslated
Blockly.Msg["MATH_TRIG_TOOLTIP_ACOS"] = "Hoàn trả Arccos của một góc (theo độ).";
Blockly.Msg["MATH_TRIG_TOOLTIP_ASIN"] = "Hoàn trả Arcsin của một góc (theo độ).";
Blockly.Msg["MATH_TRIG_TOOLTIP_ATAN"] = "Hoàn trả Arctang của một góc (theo độ).";
Blockly.Msg["MATH_TRIG_TOOLTIP_COS"] = "Hoàn trả Cos của một góc (theo độ).";
Blockly.Msg["MATH_TRIG_TOOLTIP_SIN"] = "Hoàn trả Sin của một góc (theo độ).";
Blockly.Msg["MATH_TRIG_TOOLTIP_TAN"] = "Hoàn trả Tang của một góc (theo độ).";
Blockly.Msg["NEW_COLOUR_VARIABLE"] = "Tạo một giá trị màu sắc...";
Blockly.Msg["NEW_NUMBER_VARIABLE"] = "Tạo một giá trị số...";
Blockly.Msg["NEW_STRING_VARIABLE"] = "Tạo một giá trị dạng chuỗi...";
Blockly.Msg["NEW_VARIABLE"] = "Tạo biến...";
Blockly.Msg["NEW_VARIABLE_TITLE"] = "Tên của biến mới:";
Blockly.Msg["NEW_VARIABLE_TYPE_TITLE"] = "Kiểu giá trị mới:";
Blockly.Msg["ORDINAL_NUMBER_SUFFIX"] = "";  // untranslated
Blockly.Msg["PROCEDURES_ALLOW_STATEMENTS"] = "cho phép báo cáo";
Blockly.Msg["PROCEDURES_BEFORE_PARAMS"] = "với:";
Blockly.Msg["PROCEDURES_CALLNORETURN_HELPURL"] = "https://vi.wikipedia.org/wiki/Ch%C6%B0%C6%A1ng_tr%C3%ACnh_con";
Blockly.Msg["PROCEDURES_CALLNORETURN_TOOLTIP"] = "Chạy một thủ tục không có giá trị hoàn trả.";
Blockly.Msg["PROCEDURES_CALLRETURN_HELPURL"] = "https://vi.wikipedia.org/wiki/Ch%C6%B0%C6%A1ng_tr%C3%ACnh_con";
Blockly.Msg["PROCEDURES_CALLRETURN_TOOLTIP"] = "Chạy một thủ tục có giá trị hoàn trả.";
Blockly.Msg["PROCEDURES_CALL_BEFORE_PARAMS"] = "với:";
Blockly.Msg["PROCEDURES_CREATE_DO"] = "Tạo mảnh \"thực hiện %1\"";
Blockly.Msg["PROCEDURES_DEFNORETURN_COMMENT"] = "Mô tả hàm này...";
Blockly.Msg["PROCEDURES_DEFNORETURN_DO"] = "";
Blockly.Msg["PROCEDURES_DEFNORETURN_HELPURL"] = "https://en.wikipedia.org/wiki/Subroutine";  // untranslated
Blockly.Msg["PROCEDURES_DEFNORETURN_PROCEDURE"] = "làm gì đó";
Blockly.Msg["PROCEDURES_DEFNORETURN_TITLE"] = "thủ tục để";
Blockly.Msg["PROCEDURES_DEFNORETURN_TOOLTIP"] = "Một thủ tục không có giá trị hoàn trả.";
Blockly.Msg["PROCEDURES_DEFRETURN_HELPURL"] = "https://en.wikipedia.org/wiki/Subroutine";  // untranslated
Blockly.Msg["PROCEDURES_DEFRETURN_RETURN"] = "hoàn trả";
Blockly.Msg["PROCEDURES_DEFRETURN_TOOLTIP"] = "Một thủ tục có giá trị hoàn trả.";
Blockly.Msg["PROCEDURES_DEF_DUPLICATE_WARNING"] = "Chú ý: Thủ tục này có lặp lại tên các tham số.";
Blockly.Msg["PROCEDURES_HIGHLIGHT_DEF"] = "Làm nổi bật thủ tục";
Blockly.Msg["PROCEDURES_IFRETURN_HELPURL"] = "http://c2.com/cgi/wiki?GuardClause";  // untranslated
Blockly.Msg["PROCEDURES_IFRETURN_TOOLTIP"] = "Khi điều kiện đúng thì hoàn trả một giá trị.";
Blockly.Msg["PROCEDURES_IFRETURN_WARNING"] = "Chú ý: Mảnh này chỉ có thể dùng trong một thủ tục.";
Blockly.Msg["PROCEDURES_MUTATORARG_TITLE"] = "biến:";
Blockly.Msg["PROCEDURES_MUTATORARG_TOOLTIP"] = "Thêm một đầu vào cho hàm.";
Blockly.Msg["PROCEDURES_MUTATORCONTAINER_TITLE"] = "các tham số";
Blockly.Msg["PROCEDURES_MUTATORCONTAINER_TOOLTIP"] = "Thêm, xóa hoặc sắp xếp lại các đầu vào cho hàm này.";
Blockly.Msg["REDO"] = "Làm lại";
Blockly.Msg["REMOVE_COMMENT"] = "Xóa Chú Giải";
Blockly.Msg["RENAME_VARIABLE"] = "Thay tên biến...";
Blockly.Msg["RENAME_VARIABLE_TITLE"] = "Thay tên tất cả các biến \"%1\" thành:";
Blockly.Msg["TEXT_APPEND_HELPURL"] = "https://github.com/google/blockly/wiki/Text#text-modification";  // untranslated
Blockly.Msg["TEXT_APPEND_TITLE"] = "ở cuối %1 thêm văn bản %2";
Blockly.Msg["TEXT_APPEND_TOOLTIP"] = "Thêm một mảng văn bản vào biến \"%1\".";
Blockly.Msg["TEXT_CHANGECASE_HELPURL"] = "https://github.com/google/blockly/wiki/Text#adjusting-text-case";  // untranslated
Blockly.Msg["TEXT_CHANGECASE_OPERATOR_LOWERCASE"] = "thành chữ thường";
Blockly.Msg["TEXT_CHANGECASE_OPERATOR_TITLECASE"] = "thành Chữ In Đầu Mỗi Từ";
Blockly.Msg["TEXT_CHANGECASE_OPERATOR_UPPERCASE"] = "thành CHỮ IN HOA";
Blockly.Msg["TEXT_CHANGECASE_TOOLTIP"] = "Hoàn trả văn bản sau khi chuyển đổi chữ in hoa hay thường.";
Blockly.Msg["TEXT_CHARAT_FIRST"] = "lấy ký tự đầu tiên";
Blockly.Msg["TEXT_CHARAT_FROM_END"] = "lấy từ phía cuối, ký tự thứ";
Blockly.Msg["TEXT_CHARAT_FROM_START"] = "lấy ký tự thứ";
Blockly.Msg["TEXT_CHARAT_HELPURL"] = "https://github.com/google/blockly/wiki/Text#extracting-text";  // untranslated
Blockly.Msg["TEXT_CHARAT_LAST"] = "lấy ký tự cuối cùng";
Blockly.Msg["TEXT_CHARAT_RANDOM"] = "lấy ký tự bất kỳ";
Blockly.Msg["TEXT_CHARAT_TAIL"] = "";  // untranslated
Blockly.Msg["TEXT_CHARAT_TITLE"] = "trong văn bản %1 %2";
Blockly.Msg["TEXT_CHARAT_TOOLTIP"] = "Hoàn trả ký tự ở vị trí đặt ra.";
Blockly.Msg["TEXT_COUNT_HELPURL"] = "https://github.com/google/blockly/wiki/Text#counting-substrings";  // untranslated
Blockly.Msg["TEXT_COUNT_MESSAGE0"] = "đến %1 trong %2";
Blockly.Msg["TEXT_COUNT_TOOLTIP"] = "Đếm số lần một đoạn văn bản xuất hiện trong một đoạn văn bản khác.";
Blockly.Msg["TEXT_CREATE_JOIN_ITEM_TOOLTIP"] = "thêm vật mới vào văn bản.";
Blockly.Msg["TEXT_CREATE_JOIN_TITLE_JOIN"] = "kết nối";
Blockly.Msg["TEXT_CREATE_JOIN_TOOLTIP"] = "Thêm, bỏ, hoặc sắp xếp lại các thành phần để tạo dựng mảnh văn bản này.";
Blockly.Msg["TEXT_GET_SUBSTRING_END_FROM_END"] = "đến từ phía cuối, ký tự thứ";
Blockly.Msg["TEXT_GET_SUBSTRING_END_FROM_START"] = "đến ký tự thứ";
Blockly.Msg["TEXT_GET_SUBSTRING_END_LAST"] = "đến ký tự cuối cùng";
Blockly.Msg["TEXT_GET_SUBSTRING_HELPURL"] = "https://github.com/google/blockly/wiki/Text#extracting-a-region-of-text";  // untranslated
Blockly.Msg["TEXT_GET_SUBSTRING_INPUT_IN_TEXT"] = "trong văn bản";
Blockly.Msg["TEXT_GET_SUBSTRING_START_FIRST"] = "lấy từ ký tự đầu tiên";
Blockly.Msg["TEXT_GET_SUBSTRING_START_FROM_END"] = "lấy từ phía cuối, ký tự thứ";
Blockly.Msg["TEXT_GET_SUBSTRING_START_FROM_START"] = "lấy từ ký tự thứ";
Blockly.Msg["TEXT_GET_SUBSTRING_TAIL"] = "";  // untranslated
Blockly.Msg["TEXT_GET_SUBSTRING_TOOLTIP"] = "Hoàn trả một mảng ký tự ấn định từ trong văn bản.";
Blockly.Msg["TEXT_INDEXOF_HELPURL"] = "https://github.com/google/blockly/wiki/Text#finding-text";  // untranslated
Blockly.Msg["TEXT_INDEXOF_OPERATOR_FIRST"] = "tìm sự có mặt đầu tiên của";
Blockly.Msg["TEXT_INDEXOF_OPERATOR_LAST"] = "tìm sự có mặt cuối cùng của";
Blockly.Msg["TEXT_INDEXOF_TITLE"] = "trong văn bản %1 %2 %3";
Blockly.Msg["TEXT_INDEXOF_TOOLTIP"] = "Hoàn trả vị trí xuất hiện đầu/cuối của văn bản thứ nhất trong văn bản thứ hai.  Nếu không tìm thấy thì hoàn trả số %1.";
Blockly.Msg["TEXT_ISEMPTY_HELPURL"] = "https://github.com/google/blockly/wiki/Text#checking-for-empty-text";  // untranslated
Blockly.Msg["TEXT_ISEMPTY_TITLE"] = "%1 trống không";
Blockly.Msg["TEXT_ISEMPTY_TOOLTIP"] = "Hoàn trả “đúng nếu văn bản không có ký tự nào.";
Blockly.Msg["TEXT_JOIN_HELPURL"] = "";
Blockly.Msg["TEXT_JOIN_TITLE_CREATEWITH"] = "tạo văn bản từ";
Blockly.Msg["TEXT_JOIN_TOOLTIP"] = "Tạo một văn bản từ các thành phần.";
Blockly.Msg["TEXT_LENGTH_HELPURL"] = "https://github.com/google/blockly/wiki/Text#text-modification";  // untranslated
Blockly.Msg["TEXT_LENGTH_TITLE"] = "độ dài của %1";
Blockly.Msg["TEXT_LENGTH_TOOLTIP"] = "Hoàn trả số lượng ký tự (kể cả khoảng trắng) trong văn bản đầu vào.";
Blockly.Msg["TEXT_PRINT_HELPURL"] = "https://github.com/google/blockly/wiki/Text#printing-text";  // untranslated
Blockly.Msg["TEXT_PRINT_TITLE"] = "in lên màn hình %1";
Blockly.Msg["TEXT_PRINT_TOOLTIP"] = "In ra màn hình một văn bản, con số, hay một giá trị đầu vào khác.";
Blockly.Msg["TEXT_PROMPT_HELPURL"] = "https://github.com/google/blockly/wiki/Text#getting-input-from-the-user";  // untranslated
Blockly.Msg["TEXT_PROMPT_TOOLTIP_NUMBER"] = "Xin người dùng nhập vào một con số.";
Blockly.Msg["TEXT_PROMPT_TOOLTIP_TEXT"] = "Xin người dùng nhập vào một văn bản.";
Blockly.Msg["TEXT_PROMPT_TYPE_NUMBER"] = "Xin người dùng nhập vào con số với dòng hướng dẫn";
Blockly.Msg["TEXT_PROMPT_TYPE_TEXT"] = "Xin người dùng nhập vào văn bản với dòng hướng dẫn";
Blockly.Msg["TEXT_REPLACE_HELPURL"] = "https://github.com/google/blockly/wiki/Text#replacing-substrings";  // untranslated
Blockly.Msg["TEXT_REPLACE_MESSAGE0"] = "thay thế %1 bằng %2 trong %3";
Blockly.Msg["TEXT_REPLACE_TOOLTIP"] = "Thay thế tất cả các lần xuất hiện của văn bản bằng văn bản khác.";
Blockly.Msg["TEXT_REVERSE_HELPURL"] = "https://github.com/google/blockly/wiki/Text#reversing-text";  // untranslated
Blockly.Msg["TEXT_REVERSE_MESSAGE0"] = "đảo ngược %1";
Blockly.Msg["TEXT_REVERSE_TOOLTIP"] = "Đảo ngược thứ tự của các chữ cái trong văn bản.";
Blockly.Msg["TEXT_TEXT_HELPURL"] = "https://en.wikipedia.org/wiki/string_(computer_science)";
Blockly.Msg["TEXT_TEXT_TOOLTIP"] = "Một ký tự, một từ, hay một dòng.";
Blockly.Msg["TEXT_TRIM_HELPURL"] = "https://github.com/google/blockly/wiki/Text#trimming-removing-spaces";  // untranslated
Blockly.Msg["TEXT_TRIM_OPERATOR_BOTH"] = "cắt các không gian từ cả hai mặt của";
Blockly.Msg["TEXT_TRIM_OPERATOR_LEFT"] = "cắt các không gian từ bên trái của";
Blockly.Msg["TEXT_TRIM_OPERATOR_RIGHT"] = "cắt các không gian từ bên phải của";
Blockly.Msg["TEXT_TRIM_TOOLTIP"] = "Hoàn trả bản sao của văn bản sau khi xóa khoảng trắng từ một hoặc hai bên.";
Blockly.Msg["TODAY"] = "Hôm nay";
Blockly.Msg["UNDO"] = "Hoàn tác";
Blockly.Msg["UNNAMED_KEY"] = "không tên";
Blockly.Msg["VARIABLES_DEFAULT_NAME"] = "vật";
Blockly.Msg["VARIABLES_GET_CREATE_SET"] = "Tạo mảnh \"đặt vào %1\"";
Blockly.Msg["VARIABLES_GET_HELPURL"] = "https://github.com/google/blockly/wiki/Variables#get";  // untranslated
Blockly.Msg["VARIABLES_GET_TOOLTIP"] = "Hoàn trả giá trị của.";
Blockly.Msg["VARIABLES_SET"] = "cho %1 bằng %2";
Blockly.Msg["VARIABLES_SET_CREATE_GET"] = "Tạo mảnh \"lấy %1\"";
Blockly.Msg["VARIABLES_SET_HELPURL"] = "https://github.com/google/blockly/wiki/Variables#set";  // untranslated
Blockly.Msg["VARIABLES_SET_TOOLTIP"] = "Đặt giá trị của biến này thành...";
Blockly.Msg["VARIABLE_ALREADY_EXISTS"] = "Một biến có tên '%1' đã tồn tại.";
Blockly.Msg["VARIABLE_ALREADY_EXISTS_FOR_ANOTHER_TYPE"] = "Giá trị '%1' đã tồn tại dưới dạng: '%2'.";
Blockly.Msg["WORKSPACE_ARIA_LABEL"] = "Không gian làm việc Blockly";
Blockly.Msg["WORKSPACE_COMMENT_DEFAULT_TEXT"] = "Hãy nói gì đó...";
Blockly.Msg["CONTROLS_FOREACH_INPUT_DO"] = Blockly.Msg["CONTROLS_REPEAT_INPUT_DO"];
Blockly.Msg["CONTROLS_FOR_INPUT_DO"] = Blockly.Msg["CONTROLS_REPEAT_INPUT_DO"];
Blockly.Msg["CONTROLS_IF_ELSEIF_TITLE_ELSEIF"] = Blockly.Msg["CONTROLS_IF_MSG_ELSEIF"];
Blockly.Msg["CONTROLS_IF_ELSE_TITLE_ELSE"] = Blockly.Msg["CONTROLS_IF_MSG_ELSE"];
Blockly.Msg["CONTROLS_IF_IF_TITLE_IF"] = Blockly.Msg["CONTROLS_IF_MSG_IF"];
Blockly.Msg["CONTROLS_IF_MSG_THEN"] = Blockly.Msg["CONTROLS_REPEAT_INPUT_DO"];
Blockly.Msg["CONTROLS_WHILEUNTIL_INPUT_DO"] = Blockly.Msg["CONTROLS_REPEAT_INPUT_DO"];
Blockly.Msg["LISTS_CREATE_WITH_ITEM_TITLE"] = Blockly.Msg["VARIABLES_DEFAULT_NAME"];
Blockly.Msg["LISTS_GET_INDEX_HELPURL"] = Blockly.Msg["LISTS_INDEX_OF_HELPURL"];
Blockly.Msg["LISTS_GET_INDEX_INPUT_IN_LIST"] = Blockly.Msg["LISTS_INLIST"];
Blockly.Msg["LISTS_GET_SUBLIST_INPUT_IN_LIST"] = Blockly.Msg["LISTS_INLIST"];
Blockly.Msg["LISTS_INDEX_OF_INPUT_IN_LIST"] = Blockly.Msg["LISTS_INLIST"];
Blockly.Msg["LISTS_SET_INDEX_INPUT_IN_LIST"] = Blockly.Msg["LISTS_INLIST"];
Blockly.Msg["MATH_CHANGE_TITLE_ITEM"] = Blockly.Msg["VARIABLES_DEFAULT_NAME"];
Blockly.Msg["PROCEDURES_DEFRETURN_COMMENT"] = Blockly.Msg["PROCEDURES_DEFNORETURN_COMMENT"];
Blockly.Msg["PROCEDURES_DEFRETURN_DO"] = Blockly.Msg["PROCEDURES_DEFNORETURN_DO"];
Blockly.Msg["PROCEDURES_DEFRETURN_PROCEDURE"] = Blockly.Msg["PROCEDURES_DEFNORETURN_PROCEDURE"];
Blockly.Msg["PROCEDURES_DEFRETURN_TITLE"] = Blockly.Msg["PROCEDURES_DEFNORETURN_TITLE"];
Blockly.Msg["TEXT_APPEND_VARIABLE"] = Blockly.Msg["VARIABLES_DEFAULT_NAME"];
Blockly.Msg["TEXT_CREATE_JOIN_ITEM_TITLE_ITEM"] = Blockly.Msg["VARIABLES_DEFAULT_NAME"];

Blockly.Msg["LOGIC_HUE"] = "210";
Blockly.Msg["LOOPS_HUE"] = "120";
Blockly.Msg["MATH_HUE"] = "230";
Blockly.Msg["TEXTS_HUE"] = "160";
Blockly.Msg["LISTS_HUE"] = "260";
Blockly.Msg["COLOUR_HUE"] = "20";
Blockly.Msg["VARIABLES_HUE"] = "330";
Blockly.Msg["VARIABLES_DYNAMIC_HUE"] = "310";
Blockly.Msg["PROCEDURES_HUE"] = "290";
return Blockly.Msg;
}
  function localeEn(Blockly) {
// This file was automatically generated.  Do not modify.

'use strict';

Blockly.Msg["ADD_COMMENT"] = "Add Comment";
Blockly.Msg["CANNOT_DELETE_VARIABLE_PROCEDURE"] = "Can't delete the variable '%1' because it's part of the definition of the function '%2'";
Blockly.Msg["CHANGE_VALUE_TITLE"] = "Change value:";
Blockly.Msg["CLEAN_UP"] = "Clean up Blocks";
Blockly.Msg["COLLAPSED_WARNINGS_WARNING"] = "Collapsed blocks contain warnings.";
Blockly.Msg["COLLAPSE_ALL"] = "Collapse Blocks";
Blockly.Msg["COLLAPSE_BLOCK"] = "Collapse Block";
Blockly.Msg["COLOUR_BLEND_COLOUR1"] = "colour 1";
Blockly.Msg["COLOUR_BLEND_COLOUR2"] = "colour 2";
Blockly.Msg["COLOUR_BLEND_HELPURL"] = "https://meyerweb.com/eric/tools/color-blend/#:::rgbp";
Blockly.Msg["COLOUR_BLEND_RATIO"] = "ratio";
Blockly.Msg["COLOUR_BLEND_TITLE"] = "blend";
Blockly.Msg["COLOUR_BLEND_TOOLTIP"] = "Blends two colours together with a given ratio (0.0 - 1.0).";
Blockly.Msg["COLOUR_PICKER_HELPURL"] = "https://en.wikipedia.org/wiki/Color";
Blockly.Msg["COLOUR_PICKER_TOOLTIP"] = "Choose a colour from the palette.";
Blockly.Msg["COLOUR_RANDOM_HELPURL"] = "http://randomcolour.com";
Blockly.Msg["COLOUR_RANDOM_TITLE"] = "random colour";
Blockly.Msg["COLOUR_RANDOM_TOOLTIP"] = "Choose a colour at random.";
Blockly.Msg["COLOUR_RGB_BLUE"] = "blue";
Blockly.Msg["COLOUR_RGB_GREEN"] = "green";
Blockly.Msg["COLOUR_RGB_HELPURL"] = "https://www.december.com/html/spec/colorpercompact.html";
Blockly.Msg["COLOUR_RGB_RED"] = "red";
Blockly.Msg["COLOUR_RGB_TITLE"] = "colour with";
Blockly.Msg["COLOUR_RGB_TOOLTIP"] = "Create a colour with the specified amount of red, green, and blue. All values must be between 0 and 100.";
Blockly.Msg["CONTROLS_FLOW_STATEMENTS_HELPURL"] = "https://github.com/google/blockly/wiki/Loops#loop-termination-blocks";
Blockly.Msg["CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK"] = "break out of loop";
Blockly.Msg["CONTROLS_FLOW_STATEMENTS_OPERATOR_CONTINUE"] = "continue with next iteration of loop";
Blockly.Msg["CONTROLS_FLOW_STATEMENTS_TOOLTIP_BREAK"] = "Break out of the containing loop.";
Blockly.Msg["CONTROLS_FLOW_STATEMENTS_TOOLTIP_CONTINUE"] = "Skip the rest of this loop, and continue with the next iteration.";
Blockly.Msg["CONTROLS_FLOW_STATEMENTS_WARNING"] = "Warning: This block may only be used within a loop.";
Blockly.Msg["CONTROLS_FOREACH_HELPURL"] = "https://github.com/google/blockly/wiki/Loops#for-each";
Blockly.Msg["CONTROLS_FOREACH_TITLE"] = "for each item %1 in list %2";
Blockly.Msg["CONTROLS_FOREACH_TOOLTIP"] = "For each item in a list, set the variable '%1' to the item, and then do some statements.";
Blockly.Msg["CONTROLS_FOR_HELPURL"] = "https://github.com/google/blockly/wiki/Loops#count-with";
Blockly.Msg["CONTROLS_FOR_TITLE"] = "count with %1 from %2 to %3 by %4";
Blockly.Msg["CONTROLS_FOR_TOOLTIP"] = "Have the variable '%1' take on the values from the start number to the end number, counting by the specified interval, and do the specified blocks.";
Blockly.Msg["CONTROLS_IF_ELSEIF_TOOLTIP"] = "Add a condition to the if block.";
Blockly.Msg["CONTROLS_IF_ELSE_TOOLTIP"] = "Add a final, catch-all condition to the if block.";
Blockly.Msg["CONTROLS_IF_HELPURL"] = "https://github.com/google/blockly/wiki/IfElse";
Blockly.Msg["CONTROLS_IF_IF_TOOLTIP"] = "Add, remove, or reorder sections to reconfigure this if block.";
Blockly.Msg["CONTROLS_IF_MSG_ELSE"] = "else";
Blockly.Msg["CONTROLS_IF_MSG_ELSEIF"] = "else if";
Blockly.Msg["CONTROLS_IF_MSG_IF"] = "if";
Blockly.Msg["CONTROLS_IF_TOOLTIP_1"] = "If a value is true, then do some statements.";
Blockly.Msg["CONTROLS_IF_TOOLTIP_2"] = "If a value is true, then do the first block of statements. Otherwise, do the second block of statements.";
Blockly.Msg["CONTROLS_IF_TOOLTIP_3"] = "If the first value is true, then do the first block of statements. Otherwise, if the second value is true, do the second block of statements.";
Blockly.Msg["CONTROLS_IF_TOOLTIP_4"] = "If the first value is true, then do the first block of statements. Otherwise, if the second value is true, do the second block of statements. If none of the values are true, do the last block of statements.";
Blockly.Msg["CONTROLS_REPEAT_HELPURL"] = "https://en.wikipedia.org/wiki/For_loop";
Blockly.Msg["CONTROLS_REPEAT_INPUT_DO"] = "do";
Blockly.Msg["CONTROLS_REPEAT_TITLE"] = "repeat %1 times";
Blockly.Msg["CONTROLS_REPEAT_TOOLTIP"] = "Do some statements several times.";
Blockly.Msg["CONTROLS_WHILEUNTIL_HELPURL"] = "https://github.com/google/blockly/wiki/Loops#repeat";
Blockly.Msg["CONTROLS_WHILEUNTIL_OPERATOR_UNTIL"] = "repeat until";
Blockly.Msg["CONTROLS_WHILEUNTIL_OPERATOR_WHILE"] = "repeat while";
Blockly.Msg["CONTROLS_WHILEUNTIL_TOOLTIP_UNTIL"] = "While a value is false, then do some statements.";
Blockly.Msg["CONTROLS_WHILEUNTIL_TOOLTIP_WHILE"] = "While a value is true, then do some statements.";
Blockly.Msg["DELETE_ALL_BLOCKS"] = "Delete all %1 blocks?";
Blockly.Msg["DELETE_BLOCK"] = "Delete Block";
Blockly.Msg["DELETE_VARIABLE"] = "Delete the '%1' variable";
Blockly.Msg["DELETE_VARIABLE_CONFIRMATION"] = "Delete %1 uses of the '%2' variable?";
Blockly.Msg["DELETE_X_BLOCKS"] = "Delete %1 Blocks";
Blockly.Msg["DISABLE_BLOCK"] = "Disable Block";
Blockly.Msg["DUPLICATE_BLOCK"] = "Duplicate";
Blockly.Msg["DUPLICATE_COMMENT"] = "Duplicate Comment";
Blockly.Msg["ENABLE_BLOCK"] = "Enable Block";
Blockly.Msg["EXPAND_ALL"] = "Expand Blocks";
Blockly.Msg["EXPAND_BLOCK"] = "Expand Block";
Blockly.Msg["EXTERNAL_INPUTS"] = "External Inputs";
Blockly.Msg["HELP"] = "Help";
Blockly.Msg["INLINE_INPUTS"] = "Inline Inputs";
Blockly.Msg["IOS_CANCEL"] = "Cancel";
Blockly.Msg["IOS_ERROR"] = "Error";
Blockly.Msg["IOS_OK"] = "OK";
Blockly.Msg["IOS_PROCEDURES_ADD_INPUT"] = "+ Add Input";
Blockly.Msg["IOS_PROCEDURES_ALLOW_STATEMENTS"] = "Allow statements";
Blockly.Msg["IOS_PROCEDURES_DUPLICATE_INPUTS_ERROR"] = "This function has duplicate inputs.";
Blockly.Msg["IOS_PROCEDURES_INPUTS"] = "INPUTS";
Blockly.Msg["IOS_VARIABLES_ADD_BUTTON"] = "Add";
Blockly.Msg["IOS_VARIABLES_ADD_VARIABLE"] = "+ Add Variable";
Blockly.Msg["IOS_VARIABLES_DELETE_BUTTON"] = "Delete";
Blockly.Msg["IOS_VARIABLES_EMPTY_NAME_ERROR"] = "You can't use an empty variable name.";
Blockly.Msg["IOS_VARIABLES_RENAME_BUTTON"] = "Rename";
Blockly.Msg["IOS_VARIABLES_VARIABLE_NAME"] = "Variable name";
Blockly.Msg["LISTS_CREATE_EMPTY_HELPURL"] = "https://github.com/google/blockly/wiki/Lists#create-empty-list";
Blockly.Msg["LISTS_CREATE_EMPTY_TITLE"] = "create empty list";
Blockly.Msg["LISTS_CREATE_EMPTY_TOOLTIP"] = "Returns a list, of length 0, containing no data records";
Blockly.Msg["LISTS_CREATE_WITH_CONTAINER_TITLE_ADD"] = "list";
Blockly.Msg["LISTS_CREATE_WITH_CONTAINER_TOOLTIP"] = "Add, remove, or reorder sections to reconfigure this list block.";
Blockly.Msg["LISTS_CREATE_WITH_HELPURL"] = "https://github.com/google/blockly/wiki/Lists#create-list-with";
Blockly.Msg["LISTS_CREATE_WITH_INPUT_WITH"] = "create list with";
Blockly.Msg["LISTS_CREATE_WITH_ITEM_TOOLTIP"] = "Add an item to the list.";
Blockly.Msg["LISTS_CREATE_WITH_TOOLTIP"] = "Create a list with any number of items.";
Blockly.Msg["LISTS_GET_INDEX_FIRST"] = "first";
Blockly.Msg["LISTS_GET_INDEX_FROM_END"] = "# from end";
Blockly.Msg["LISTS_GET_INDEX_FROM_START"] = "#";
Blockly.Msg["LISTS_GET_INDEX_GET"] = "get";
Blockly.Msg["LISTS_GET_INDEX_GET_REMOVE"] = "get and remove";
Blockly.Msg["LISTS_GET_INDEX_LAST"] = "last";
Blockly.Msg["LISTS_GET_INDEX_RANDOM"] = "random";
Blockly.Msg["LISTS_GET_INDEX_REMOVE"] = "remove";
Blockly.Msg["LISTS_GET_INDEX_TAIL"] = "";
Blockly.Msg["LISTS_GET_INDEX_TOOLTIP_GET_FIRST"] = "Returns the first item in a list.";
Blockly.Msg["LISTS_GET_INDEX_TOOLTIP_GET_FROM"] = "Returns the item at the specified position in a list.";
Blockly.Msg["LISTS_GET_INDEX_TOOLTIP_GET_LAST"] = "Returns the last item in a list.";
Blockly.Msg["LISTS_GET_INDEX_TOOLTIP_GET_RANDOM"] = "Returns a random item in a list.";
Blockly.Msg["LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_FIRST"] = "Removes and returns the first item in a list.";
Blockly.Msg["LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_FROM"] = "Removes and returns the item at the specified position in a list.";
Blockly.Msg["LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_LAST"] = "Removes and returns the last item in a list.";
Blockly.Msg["LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_RANDOM"] = "Removes and returns a random item in a list.";
Blockly.Msg["LISTS_GET_INDEX_TOOLTIP_REMOVE_FIRST"] = "Removes the first item in a list.";
Blockly.Msg["LISTS_GET_INDEX_TOOLTIP_REMOVE_FROM"] = "Removes the item at the specified position in a list.";
Blockly.Msg["LISTS_GET_INDEX_TOOLTIP_REMOVE_LAST"] = "Removes the last item in a list.";
Blockly.Msg["LISTS_GET_INDEX_TOOLTIP_REMOVE_RANDOM"] = "Removes a random item in a list.";
Blockly.Msg["LISTS_GET_SUBLIST_END_FROM_END"] = "to # from end";
Blockly.Msg["LISTS_GET_SUBLIST_END_FROM_START"] = "to #";
Blockly.Msg["LISTS_GET_SUBLIST_END_LAST"] = "to last";
Blockly.Msg["LISTS_GET_SUBLIST_HELPURL"] = "https://github.com/google/blockly/wiki/Lists#getting-a-sublist";
Blockly.Msg["LISTS_GET_SUBLIST_START_FIRST"] = "get sub-list from first";
Blockly.Msg["LISTS_GET_SUBLIST_START_FROM_END"] = "get sub-list from # from end";
Blockly.Msg["LISTS_GET_SUBLIST_START_FROM_START"] = "get sub-list from #";
Blockly.Msg["LISTS_GET_SUBLIST_TAIL"] = "";
Blockly.Msg["LISTS_GET_SUBLIST_TOOLTIP"] = "Creates a copy of the specified portion of a list.";
Blockly.Msg["LISTS_INDEX_FROM_END_TOOLTIP"] = "%1 is the last item.";
Blockly.Msg["LISTS_INDEX_FROM_START_TOOLTIP"] = "%1 is the first item.";
Blockly.Msg["LISTS_INDEX_OF_FIRST"] = "find first occurrence of item";
Blockly.Msg["LISTS_INDEX_OF_HELPURL"] = "https://github.com/google/blockly/wiki/Lists#getting-items-from-a-list";
Blockly.Msg["LISTS_INDEX_OF_LAST"] = "find last occurrence of item";
Blockly.Msg["LISTS_INDEX_OF_TOOLTIP"] = "Returns the index of the first/last occurrence of the item in the list. Returns %1 if item is not found.";
Blockly.Msg["LISTS_INLIST"] = "in list";
Blockly.Msg["LISTS_ISEMPTY_HELPURL"] = "https://github.com/google/blockly/wiki/Lists#is-empty";
Blockly.Msg["LISTS_ISEMPTY_TITLE"] = "%1 is empty";
Blockly.Msg["LISTS_ISEMPTY_TOOLTIP"] = "Returns true if the list is empty.";
Blockly.Msg["LISTS_LENGTH_HELPURL"] = "https://github.com/google/blockly/wiki/Lists#length-of";
Blockly.Msg["LISTS_LENGTH_TITLE"] = "length of %1";
Blockly.Msg["LISTS_LENGTH_TOOLTIP"] = "Returns the length of a list.";
Blockly.Msg["LISTS_REPEAT_HELPURL"] = "https://github.com/google/blockly/wiki/Lists#create-list-with";
Blockly.Msg["LISTS_REPEAT_TITLE"] = "create list with item %1 repeated %2 times";
Blockly.Msg["LISTS_REPEAT_TOOLTIP"] = "Creates a list consisting of the given value repeated the specified number of times.";
Blockly.Msg["LISTS_REVERSE_HELPURL"] = "https://github.com/google/blockly/wiki/Lists#reversing-a-list";
Blockly.Msg["LISTS_REVERSE_MESSAGE0"] = "reverse %1";
Blockly.Msg["LISTS_REVERSE_TOOLTIP"] = "Reverse a copy of a list.";
Blockly.Msg["LISTS_SET_INDEX_HELPURL"] = "https://github.com/google/blockly/wiki/Lists#in-list--set";
Blockly.Msg["LISTS_SET_INDEX_INPUT_TO"] = "as";
Blockly.Msg["LISTS_SET_INDEX_INSERT"] = "insert at";
Blockly.Msg["LISTS_SET_INDEX_SET"] = "set";
Blockly.Msg["LISTS_SET_INDEX_TOOLTIP_INSERT_FIRST"] = "Inserts the item at the start of a list.";
Blockly.Msg["LISTS_SET_INDEX_TOOLTIP_INSERT_FROM"] = "Inserts the item at the specified position in a list.";
Blockly.Msg["LISTS_SET_INDEX_TOOLTIP_INSERT_LAST"] = "Append the item to the end of a list.";
Blockly.Msg["LISTS_SET_INDEX_TOOLTIP_INSERT_RANDOM"] = "Inserts the item randomly in a list.";
Blockly.Msg["LISTS_SET_INDEX_TOOLTIP_SET_FIRST"] = "Sets the first item in a list.";
Blockly.Msg["LISTS_SET_INDEX_TOOLTIP_SET_FROM"] = "Sets the item at the specified position in a list.";
Blockly.Msg["LISTS_SET_INDEX_TOOLTIP_SET_LAST"] = "Sets the last item in a list.";
Blockly.Msg["LISTS_SET_INDEX_TOOLTIP_SET_RANDOM"] = "Sets a random item in a list.";
Blockly.Msg["LISTS_SORT_HELPURL"] = "https://github.com/google/blockly/wiki/Lists#sorting-a-list";
Blockly.Msg["LISTS_SORT_ORDER_ASCENDING"] = "ascending";
Blockly.Msg["LISTS_SORT_ORDER_DESCENDING"] = "descending";
Blockly.Msg["LISTS_SORT_TITLE"] = "sort %1 %2 %3";
Blockly.Msg["LISTS_SORT_TOOLTIP"] = "Sort a copy of a list.";
Blockly.Msg["LISTS_SORT_TYPE_IGNORECASE"] = "alphabetic, ignore case";
Blockly.Msg["LISTS_SORT_TYPE_NUMERIC"] = "numeric";
Blockly.Msg["LISTS_SORT_TYPE_TEXT"] = "alphabetic";
Blockly.Msg["LISTS_SPLIT_HELPURL"] = "https://github.com/google/blockly/wiki/Lists#splitting-strings-and-joining-lists";
Blockly.Msg["LISTS_SPLIT_LIST_FROM_TEXT"] = "make list from text";
Blockly.Msg["LISTS_SPLIT_TEXT_FROM_LIST"] = "make text from list";
Blockly.Msg["LISTS_SPLIT_TOOLTIP_JOIN"] = "Join a list of texts into one text, separated by a delimiter.";
Blockly.Msg["LISTS_SPLIT_TOOLTIP_SPLIT"] = "Split text into a list of texts, breaking at each delimiter.";
Blockly.Msg["LISTS_SPLIT_WITH_DELIMITER"] = "with delimiter";
Blockly.Msg["LOGIC_BOOLEAN_FALSE"] = "false";
Blockly.Msg["LOGIC_BOOLEAN_HELPURL"] = "https://github.com/google/blockly/wiki/Logic#values";
Blockly.Msg["LOGIC_BOOLEAN_TOOLTIP"] = "Returns either true or false.";
Blockly.Msg["LOGIC_BOOLEAN_TRUE"] = "true";
Blockly.Msg["LOGIC_COMPARE_HELPURL"] = "https://en.wikipedia.org/wiki/Inequality_(mathematics)";
Blockly.Msg["LOGIC_COMPARE_TOOLTIP_EQ"] = "Return true if both inputs equal each other.";
Blockly.Msg["LOGIC_COMPARE_TOOLTIP_GT"] = "Return true if the first input is greater than the second input.";
Blockly.Msg["LOGIC_COMPARE_TOOLTIP_GTE"] = "Return true if the first input is greater than or equal to the second input.";
Blockly.Msg["LOGIC_COMPARE_TOOLTIP_LT"] = "Return true if the first input is smaller than the second input.";
Blockly.Msg["LOGIC_COMPARE_TOOLTIP_LTE"] = "Return true if the first input is smaller than or equal to the second input.";
Blockly.Msg["LOGIC_COMPARE_TOOLTIP_NEQ"] = "Return true if both inputs are not equal to each other.";
Blockly.Msg["LOGIC_NEGATE_HELPURL"] = "https://github.com/google/blockly/wiki/Logic#not";
Blockly.Msg["LOGIC_NEGATE_TITLE"] = "not %1";
Blockly.Msg["LOGIC_NEGATE_TOOLTIP"] = "Returns true if the input is false. Returns false if the input is true.";
Blockly.Msg["LOGIC_NULL"] = "null";
Blockly.Msg["LOGIC_NULL_HELPURL"] = "https://en.wikipedia.org/wiki/Nullable_type";
Blockly.Msg["LOGIC_NULL_TOOLTIP"] = "Returns null.";
Blockly.Msg["LOGIC_OPERATION_AND"] = "and";
Blockly.Msg["LOGIC_OPERATION_HELPURL"] = "https://github.com/google/blockly/wiki/Logic#logical-operations";
Blockly.Msg["LOGIC_OPERATION_OR"] = "or";
Blockly.Msg["LOGIC_OPERATION_TOOLTIP_AND"] = "Return true if both inputs are true.";
Blockly.Msg["LOGIC_OPERATION_TOOLTIP_OR"] = "Return true if at least one of the inputs is true.";
Blockly.Msg["LOGIC_TERNARY_CONDITION"] = "test";
Blockly.Msg["LOGIC_TERNARY_HELPURL"] = "https://en.wikipedia.org/wiki/%3F:";
Blockly.Msg["LOGIC_TERNARY_IF_FALSE"] = "if false";
Blockly.Msg["LOGIC_TERNARY_IF_TRUE"] = "if true";
Blockly.Msg["LOGIC_TERNARY_TOOLTIP"] = "Check the condition in 'test'. If the condition is true, returns the 'if true' value; otherwise returns the 'if false' value.";
Blockly.Msg["MATH_ADDITION_SYMBOL"] = "+";
Blockly.Msg["MATH_ARITHMETIC_HELPURL"] = "https://en.wikipedia.org/wiki/Arithmetic";
Blockly.Msg["MATH_ARITHMETIC_TOOLTIP_ADD"] = "Return the sum of the two numbers.";
Blockly.Msg["MATH_ARITHMETIC_TOOLTIP_DIVIDE"] = "Return the quotient of the two numbers.";
Blockly.Msg["MATH_ARITHMETIC_TOOLTIP_MINUS"] = "Return the difference of the two numbers.";
Blockly.Msg["MATH_ARITHMETIC_TOOLTIP_MULTIPLY"] = "Return the product of the two numbers.";
Blockly.Msg["MATH_ARITHMETIC_TOOLTIP_POWER"] = "Return the first number raised to the power of the second number.";
Blockly.Msg["MATH_ATAN2_HELPURL"] = "https://en.wikipedia.org/wiki/Atan2";
Blockly.Msg["MATH_ATAN2_TITLE"] = "atan2 of X:%1 Y:%2";
Blockly.Msg["MATH_ATAN2_TOOLTIP"] = "Return the arctangent of point (X, Y) in degrees from -180 to 180.";
Blockly.Msg["MATH_CHANGE_HELPURL"] = "https://en.wikipedia.org/wiki/Programming_idiom#Incrementing_a_counter";
Blockly.Msg["MATH_CHANGE_TITLE"] = "change %1 by %2";
Blockly.Msg["MATH_CHANGE_TOOLTIP"] = "Add a number to variable '%1'.";
Blockly.Msg["MATH_CONSTANT_HELPURL"] = "https://en.wikipedia.org/wiki/Mathematical_constant";
Blockly.Msg["MATH_CONSTANT_TOOLTIP"] = "Return one of the common constants: π (3.141…), e (2.718…), φ (1.618…), sqrt(2) (1.414…), sqrt(½) (0.707…), or ∞ (infinity).";
Blockly.Msg["MATH_CONSTRAIN_HELPURL"] = "https://en.wikipedia.org/wiki/Clamping_(graphics)";
Blockly.Msg["MATH_CONSTRAIN_TITLE"] = "constrain %1 low %2 high %3";
Blockly.Msg["MATH_CONSTRAIN_TOOLTIP"] = "Constrain a number to be between the specified limits (inclusive).";
Blockly.Msg["MATH_DIVISION_SYMBOL"] = "÷";
Blockly.Msg["MATH_IS_DIVISIBLE_BY"] = "is divisible by";
Blockly.Msg["MATH_IS_EVEN"] = "is even";
Blockly.Msg["MATH_IS_NEGATIVE"] = "is negative";
Blockly.Msg["MATH_IS_ODD"] = "is odd";
Blockly.Msg["MATH_IS_POSITIVE"] = "is positive";
Blockly.Msg["MATH_IS_PRIME"] = "is prime";
Blockly.Msg["MATH_IS_TOOLTIP"] = "Check if a number is an even, odd, prime, whole, positive, negative, or if it is divisible by certain number. Returns true or false.";
Blockly.Msg["MATH_IS_WHOLE"] = "is whole";
Blockly.Msg["MATH_MODULO_HELPURL"] = "https://en.wikipedia.org/wiki/Modulo_operation";
Blockly.Msg["MATH_MODULO_TITLE"] = "remainder of %1 ÷ %2";
Blockly.Msg["MATH_MODULO_TOOLTIP"] = "Return the remainder from dividing the two numbers.";
Blockly.Msg["MATH_MULTIPLICATION_SYMBOL"] = "×";
Blockly.Msg["MATH_NUMBER_HELPURL"] = "https://en.wikipedia.org/wiki/Number";
Blockly.Msg["MATH_NUMBER_TOOLTIP"] = "A number.";
Blockly.Msg["MATH_ONLIST_HELPURL"] = "";
Blockly.Msg["MATH_ONLIST_OPERATOR_AVERAGE"] = "average of list";
Blockly.Msg["MATH_ONLIST_OPERATOR_MAX"] = "max of list";
Blockly.Msg["MATH_ONLIST_OPERATOR_MEDIAN"] = "median of list";
Blockly.Msg["MATH_ONLIST_OPERATOR_MIN"] = "min of list";
Blockly.Msg["MATH_ONLIST_OPERATOR_MODE"] = "modes of list";
Blockly.Msg["MATH_ONLIST_OPERATOR_RANDOM"] = "random item of list";
Blockly.Msg["MATH_ONLIST_OPERATOR_STD_DEV"] = "standard deviation of list";
Blockly.Msg["MATH_ONLIST_OPERATOR_SUM"] = "sum of list";
Blockly.Msg["MATH_ONLIST_TOOLTIP_AVERAGE"] = "Return the average (arithmetic mean) of the numeric values in the list.";
Blockly.Msg["MATH_ONLIST_TOOLTIP_MAX"] = "Return the largest number in the list.";
Blockly.Msg["MATH_ONLIST_TOOLTIP_MEDIAN"] = "Return the median number in the list.";
Blockly.Msg["MATH_ONLIST_TOOLTIP_MIN"] = "Return the smallest number in the list.";
Blockly.Msg["MATH_ONLIST_TOOLTIP_MODE"] = "Return a list of the most common item(s) in the list.";
Blockly.Msg["MATH_ONLIST_TOOLTIP_RANDOM"] = "Return a random element from the list.";
Blockly.Msg["MATH_ONLIST_TOOLTIP_STD_DEV"] = "Return the standard deviation of the list.";
Blockly.Msg["MATH_ONLIST_TOOLTIP_SUM"] = "Return the sum of all the numbers in the list.";
Blockly.Msg["MATH_POWER_SYMBOL"] = "^";
Blockly.Msg["MATH_RANDOM_FLOAT_HELPURL"] = "https://en.wikipedia.org/wiki/Random_number_generation";
Blockly.Msg["MATH_RANDOM_FLOAT_TITLE_RANDOM"] = "random fraction";
Blockly.Msg["MATH_RANDOM_FLOAT_TOOLTIP"] = "Return a random fraction between 0.0 (inclusive) and 1.0 (exclusive).";
Blockly.Msg["MATH_RANDOM_INT_HELPURL"] = "https://en.wikipedia.org/wiki/Random_number_generation";
Blockly.Msg["MATH_RANDOM_INT_TITLE"] = "random integer from %1 to %2";
Blockly.Msg["MATH_RANDOM_INT_TOOLTIP"] = "Return a random integer between the two specified limits, inclusive.";
Blockly.Msg["MATH_ROUND_HELPURL"] = "https://en.wikipedia.org/wiki/Rounding";
Blockly.Msg["MATH_ROUND_OPERATOR_ROUND"] = "round";
Blockly.Msg["MATH_ROUND_OPERATOR_ROUNDDOWN"] = "round down";
Blockly.Msg["MATH_ROUND_OPERATOR_ROUNDUP"] = "round up";
Blockly.Msg["MATH_ROUND_TOOLTIP"] = "Round a number up or down.";
Blockly.Msg["MATH_SINGLE_HELPURL"] = "https://en.wikipedia.org/wiki/Square_root";
Blockly.Msg["MATH_SINGLE_OP_ABSOLUTE"] = "absolute";
Blockly.Msg["MATH_SINGLE_OP_ROOT"] = "square root";
Blockly.Msg["MATH_SINGLE_TOOLTIP_ABS"] = "Return the absolute value of a number.";
Blockly.Msg["MATH_SINGLE_TOOLTIP_EXP"] = "Return e to the power of a number.";
Blockly.Msg["MATH_SINGLE_TOOLTIP_LN"] = "Return the natural logarithm of a number.";
Blockly.Msg["MATH_SINGLE_TOOLTIP_LOG10"] = "Return the base 10 logarithm of a number.";
Blockly.Msg["MATH_SINGLE_TOOLTIP_NEG"] = "Return the negation of a number.";
Blockly.Msg["MATH_SINGLE_TOOLTIP_POW10"] = "Return 10 to the power of a number.";
Blockly.Msg["MATH_SINGLE_TOOLTIP_ROOT"] = "Return the square root of a number.";
Blockly.Msg["MATH_SUBTRACTION_SYMBOL"] = "-";
Blockly.Msg["MATH_TRIG_ACOS"] = "acos";
Blockly.Msg["MATH_TRIG_ASIN"] = "asin";
Blockly.Msg["MATH_TRIG_ATAN"] = "atan";
Blockly.Msg["MATH_TRIG_COS"] = "cos";
Blockly.Msg["MATH_TRIG_HELPURL"] = "https://en.wikipedia.org/wiki/Trigonometric_functions";
Blockly.Msg["MATH_TRIG_SIN"] = "sin";
Blockly.Msg["MATH_TRIG_TAN"] = "tan";
Blockly.Msg["MATH_TRIG_TOOLTIP_ACOS"] = "Return the arccosine of a number.";
Blockly.Msg["MATH_TRIG_TOOLTIP_ASIN"] = "Return the arcsine of a number.";
Blockly.Msg["MATH_TRIG_TOOLTIP_ATAN"] = "Return the arctangent of a number.";
Blockly.Msg["MATH_TRIG_TOOLTIP_COS"] = "Return the cosine of a degree (not radian).";
Blockly.Msg["MATH_TRIG_TOOLTIP_SIN"] = "Return the sine of a degree (not radian).";
Blockly.Msg["MATH_TRIG_TOOLTIP_TAN"] = "Return the tangent of a degree (not radian).";
Blockly.Msg["NEW_COLOUR_VARIABLE"] = "Create colour variable...";
Blockly.Msg["NEW_NUMBER_VARIABLE"] = "Create number variable...";
Blockly.Msg["NEW_STRING_VARIABLE"] = "Create string variable...";
Blockly.Msg["NEW_VARIABLE"] = "Create variable...";
Blockly.Msg["NEW_VARIABLE_TITLE"] = "New variable name:";
Blockly.Msg["NEW_VARIABLE_TYPE_TITLE"] = "New variable type:";
Blockly.Msg["ORDINAL_NUMBER_SUFFIX"] = "";
Blockly.Msg["PROCEDURES_ALLOW_STATEMENTS"] = "allow statements";
Blockly.Msg["PROCEDURES_BEFORE_PARAMS"] = "with:";
Blockly.Msg["PROCEDURES_CALLNORETURN_HELPURL"] = "https://en.wikipedia.org/wiki/Subroutine";
Blockly.Msg["PROCEDURES_CALLNORETURN_TOOLTIP"] = "Run the user-defined function '%1'.";
Blockly.Msg["PROCEDURES_CALLRETURN_HELPURL"] = "https://en.wikipedia.org/wiki/Subroutine";
Blockly.Msg["PROCEDURES_CALLRETURN_TOOLTIP"] = "Run the user-defined function '%1' and use its output.";
Blockly.Msg["PROCEDURES_CALL_BEFORE_PARAMS"] = "with:";
Blockly.Msg["PROCEDURES_CREATE_DO"] = "Create '%1'";
Blockly.Msg["PROCEDURES_DEFNORETURN_COMMENT"] = "Describe this function...";
Blockly.Msg["PROCEDURES_DEFNORETURN_DO"] = "";
Blockly.Msg["PROCEDURES_DEFNORETURN_HELPURL"] = "https://en.wikipedia.org/wiki/Subroutine";
Blockly.Msg["PROCEDURES_DEFNORETURN_PROCEDURE"] = "do something";
Blockly.Msg["PROCEDURES_DEFNORETURN_TITLE"] = "to";
Blockly.Msg["PROCEDURES_DEFNORETURN_TOOLTIP"] = "Creates a function with no output.";
Blockly.Msg["PROCEDURES_DEFRETURN_HELPURL"] = "https://en.wikipedia.org/wiki/Subroutine";
Blockly.Msg["PROCEDURES_DEFRETURN_RETURN"] = "return";
Blockly.Msg["PROCEDURES_DEFRETURN_TOOLTIP"] = "Creates a function with an output.";
Blockly.Msg["PROCEDURES_DEF_DUPLICATE_WARNING"] = "Warning: This function has duplicate parameters.";
Blockly.Msg["PROCEDURES_HIGHLIGHT_DEF"] = "Highlight function definition";
Blockly.Msg["PROCEDURES_IFRETURN_HELPURL"] = "http://c2.com/cgi/wiki?GuardClause";
Blockly.Msg["PROCEDURES_IFRETURN_TOOLTIP"] = "If a value is true, then return a second value.";
Blockly.Msg["PROCEDURES_IFRETURN_WARNING"] = "Warning: This block may be used only within a function definition.";
Blockly.Msg["PROCEDURES_MUTATORARG_TITLE"] = "input name:";
Blockly.Msg["PROCEDURES_MUTATORARG_TOOLTIP"] = "Add an input to the function.";
Blockly.Msg["PROCEDURES_MUTATORCONTAINER_TITLE"] = "inputs";
Blockly.Msg["PROCEDURES_MUTATORCONTAINER_TOOLTIP"] = "Add, remove, or reorder inputs to this function.";
Blockly.Msg["REDO"] = "Redo";
Blockly.Msg["REMOVE_COMMENT"] = "Remove Comment";
Blockly.Msg["RENAME_VARIABLE"] = "Rename variable...";
Blockly.Msg["RENAME_VARIABLE_TITLE"] = "Rename all '%1' variables to:";
Blockly.Msg["TEXT_APPEND_HELPURL"] = "https://github.com/google/blockly/wiki/Text#text-modification";
Blockly.Msg["TEXT_APPEND_TITLE"] = "to %1 append text %2";
Blockly.Msg["TEXT_APPEND_TOOLTIP"] = "Append some text to variable '%1'.";
Blockly.Msg["TEXT_CHANGECASE_HELPURL"] = "https://github.com/google/blockly/wiki/Text#adjusting-text-case";
Blockly.Msg["TEXT_CHANGECASE_OPERATOR_LOWERCASE"] = "to lower case";
Blockly.Msg["TEXT_CHANGECASE_OPERATOR_TITLECASE"] = "to Title Case";
Blockly.Msg["TEXT_CHANGECASE_OPERATOR_UPPERCASE"] = "to UPPER CASE";
Blockly.Msg["TEXT_CHANGECASE_TOOLTIP"] = "Return a copy of the text in a different case.";
Blockly.Msg["TEXT_CHARAT_FIRST"] = "get first letter";
Blockly.Msg["TEXT_CHARAT_FROM_END"] = "get letter # from end";
Blockly.Msg["TEXT_CHARAT_FROM_START"] = "get letter #";
Blockly.Msg["TEXT_CHARAT_HELPURL"] = "https://github.com/google/blockly/wiki/Text#extracting-text";
Blockly.Msg["TEXT_CHARAT_LAST"] = "get last letter";
Blockly.Msg["TEXT_CHARAT_RANDOM"] = "get random letter";
Blockly.Msg["TEXT_CHARAT_TAIL"] = "";
Blockly.Msg["TEXT_CHARAT_TITLE"] = "in text %1 %2";
Blockly.Msg["TEXT_CHARAT_TOOLTIP"] = "Returns the letter at the specified position.";
Blockly.Msg["TEXT_COUNT_HELPURL"] = "https://github.com/google/blockly/wiki/Text#counting-substrings";
Blockly.Msg["TEXT_COUNT_MESSAGE0"] = "count %1 in %2";
Blockly.Msg["TEXT_COUNT_TOOLTIP"] = "Count how many times some text occurs within some other text.";
Blockly.Msg["TEXT_CREATE_JOIN_ITEM_TOOLTIP"] = "Add an item to the text.";
Blockly.Msg["TEXT_CREATE_JOIN_TITLE_JOIN"] = "join";
Blockly.Msg["TEXT_CREATE_JOIN_TOOLTIP"] = "Add, remove, or reorder sections to reconfigure this text block.";
Blockly.Msg["TEXT_GET_SUBSTRING_END_FROM_END"] = "to letter # from end";
Blockly.Msg["TEXT_GET_SUBSTRING_END_FROM_START"] = "to letter #";
Blockly.Msg["TEXT_GET_SUBSTRING_END_LAST"] = "to last letter";
Blockly.Msg["TEXT_GET_SUBSTRING_HELPURL"] = "https://github.com/google/blockly/wiki/Text#extracting-a-region-of-text";
Blockly.Msg["TEXT_GET_SUBSTRING_INPUT_IN_TEXT"] = "in text";
Blockly.Msg["TEXT_GET_SUBSTRING_START_FIRST"] = "get substring from first letter";
Blockly.Msg["TEXT_GET_SUBSTRING_START_FROM_END"] = "get substring from letter # from end";
Blockly.Msg["TEXT_GET_SUBSTRING_START_FROM_START"] = "get substring from letter #";
Blockly.Msg["TEXT_GET_SUBSTRING_TAIL"] = "";
Blockly.Msg["TEXT_GET_SUBSTRING_TOOLTIP"] = "Returns a specified portion of the text.";
Blockly.Msg["TEXT_INDEXOF_HELPURL"] = "https://github.com/google/blockly/wiki/Text#finding-text";
Blockly.Msg["TEXT_INDEXOF_OPERATOR_FIRST"] = "find first occurrence of text";
Blockly.Msg["TEXT_INDEXOF_OPERATOR_LAST"] = "find last occurrence of text";
Blockly.Msg["TEXT_INDEXOF_TITLE"] = "in text %1 %2 %3";
Blockly.Msg["TEXT_INDEXOF_TOOLTIP"] = "Returns the index of the first/last occurrence of the first text in the second text. Returns %1 if text is not found.";
Blockly.Msg["TEXT_ISEMPTY_HELPURL"] = "https://github.com/google/blockly/wiki/Text#checking-for-empty-text";
Blockly.Msg["TEXT_ISEMPTY_TITLE"] = "%1 is empty";
Blockly.Msg["TEXT_ISEMPTY_TOOLTIP"] = "Returns true if the provided text is empty.";
Blockly.Msg["TEXT_JOIN_HELPURL"] = "https://github.com/google/blockly/wiki/Text#text-creation";
Blockly.Msg["TEXT_JOIN_TITLE_CREATEWITH"] = "create text with";
Blockly.Msg["TEXT_JOIN_TOOLTIP"] = "Create a piece of text by joining together any number of items.";
Blockly.Msg["TEXT_LENGTH_HELPURL"] = "https://github.com/google/blockly/wiki/Text#text-modification";
Blockly.Msg["TEXT_LENGTH_TITLE"] = "length of %1";
Blockly.Msg["TEXT_LENGTH_TOOLTIP"] = "Returns the number of letters (including spaces) in the provided text.";
Blockly.Msg["TEXT_PRINT_HELPURL"] = "https://github.com/google/blockly/wiki/Text#printing-text";
Blockly.Msg["TEXT_PRINT_TITLE"] = "print %1";
Blockly.Msg["TEXT_PRINT_TOOLTIP"] = "Print the specified text, number or other value.";
Blockly.Msg["TEXT_PROMPT_HELPURL"] = "https://github.com/google/blockly/wiki/Text#getting-input-from-the-user";
Blockly.Msg["TEXT_PROMPT_TOOLTIP_NUMBER"] = "Prompt for user for a number.";
Blockly.Msg["TEXT_PROMPT_TOOLTIP_TEXT"] = "Prompt for user for some text.";
Blockly.Msg["TEXT_PROMPT_TYPE_NUMBER"] = "prompt for number with message";
Blockly.Msg["TEXT_PROMPT_TYPE_TEXT"] = "prompt for text with message";
Blockly.Msg["TEXT_REPLACE_HELPURL"] = "https://github.com/google/blockly/wiki/Text#replacing-substrings";
Blockly.Msg["TEXT_REPLACE_MESSAGE0"] = "replace %1 with %2 in %3";
Blockly.Msg["TEXT_REPLACE_TOOLTIP"] = "Replace all occurances of some text within some other text.";
Blockly.Msg["TEXT_REVERSE_HELPURL"] = "https://github.com/google/blockly/wiki/Text#reversing-text";
Blockly.Msg["TEXT_REVERSE_MESSAGE0"] = "reverse %1";
Blockly.Msg["TEXT_REVERSE_TOOLTIP"] = "Reverses the order of the characters in the text.";
Blockly.Msg["TEXT_TEXT_HELPURL"] = "https://en.wikipedia.org/wiki/String_(computer_science)";
Blockly.Msg["TEXT_TEXT_TOOLTIP"] = "A letter, word, or line of text.";
Blockly.Msg["TEXT_TRIM_HELPURL"] = "https://github.com/google/blockly/wiki/Text#trimming-removing-spaces";
Blockly.Msg["TEXT_TRIM_OPERATOR_BOTH"] = "trim spaces from both sides of";
Blockly.Msg["TEXT_TRIM_OPERATOR_LEFT"] = "trim spaces from left side of";
Blockly.Msg["TEXT_TRIM_OPERATOR_RIGHT"] = "trim spaces from right side of";
Blockly.Msg["TEXT_TRIM_TOOLTIP"] = "Return a copy of the text with spaces removed from one or both ends.";
Blockly.Msg["TODAY"] = "Today";
Blockly.Msg["UNDO"] = "Undo";
Blockly.Msg["UNNAMED_KEY"] = "unnamed";
Blockly.Msg["VARIABLES_DEFAULT_NAME"] = "item";
Blockly.Msg["VARIABLES_GET_CREATE_SET"] = "Create 'set %1'";
Blockly.Msg["VARIABLES_GET_HELPURL"] = "https://github.com/google/blockly/wiki/Variables#get";
Blockly.Msg["VARIABLES_GET_TOOLTIP"] = "Returns the value of this variable.";
Blockly.Msg["VARIABLES_SET"] = "set %1 to %2";
Blockly.Msg["VARIABLES_SET_CREATE_GET"] = "Create 'get %1'";
Blockly.Msg["VARIABLES_SET_HELPURL"] = "https://github.com/google/blockly/wiki/Variables#set";
Blockly.Msg["VARIABLES_SET_TOOLTIP"] = "Sets this variable to be equal to the input.";
Blockly.Msg["VARIABLE_ALREADY_EXISTS"] = "A variable named '%1' already exists.";
Blockly.Msg["VARIABLE_ALREADY_EXISTS_FOR_ANOTHER_TYPE"] = "A variable named '%1' already exists for another type: '%2'.";
Blockly.Msg["WORKSPACE_ARIA_LABEL"] = "Blockly Workspace";
Blockly.Msg["WORKSPACE_COMMENT_DEFAULT_TEXT"] = "Say something...";
Blockly.Msg["CONTROLS_FOREACH_INPUT_DO"] = Blockly.Msg["CONTROLS_REPEAT_INPUT_DO"];
Blockly.Msg["CONTROLS_FOR_INPUT_DO"] = Blockly.Msg["CONTROLS_REPEAT_INPUT_DO"];
Blockly.Msg["CONTROLS_IF_ELSEIF_TITLE_ELSEIF"] = Blockly.Msg["CONTROLS_IF_MSG_ELSEIF"];
Blockly.Msg["CONTROLS_IF_ELSE_TITLE_ELSE"] = Blockly.Msg["CONTROLS_IF_MSG_ELSE"];
Blockly.Msg["CONTROLS_IF_IF_TITLE_IF"] = Blockly.Msg["CONTROLS_IF_MSG_IF"];
Blockly.Msg["CONTROLS_IF_MSG_THEN"] = Blockly.Msg["CONTROLS_REPEAT_INPUT_DO"];
Blockly.Msg["CONTROLS_WHILEUNTIL_INPUT_DO"] = Blockly.Msg["CONTROLS_REPEAT_INPUT_DO"];
Blockly.Msg["LISTS_CREATE_WITH_ITEM_TITLE"] = Blockly.Msg["VARIABLES_DEFAULT_NAME"];
Blockly.Msg["LISTS_GET_INDEX_HELPURL"] = Blockly.Msg["LISTS_INDEX_OF_HELPURL"];
Blockly.Msg["LISTS_GET_INDEX_INPUT_IN_LIST"] = Blockly.Msg["LISTS_INLIST"];
Blockly.Msg["LISTS_GET_SUBLIST_INPUT_IN_LIST"] = Blockly.Msg["LISTS_INLIST"];
Blockly.Msg["LISTS_INDEX_OF_INPUT_IN_LIST"] = Blockly.Msg["LISTS_INLIST"];
Blockly.Msg["LISTS_SET_INDEX_INPUT_IN_LIST"] = Blockly.Msg["LISTS_INLIST"];
Blockly.Msg["MATH_CHANGE_TITLE_ITEM"] = Blockly.Msg["VARIABLES_DEFAULT_NAME"];
Blockly.Msg["PROCEDURES_DEFRETURN_COMMENT"] = Blockly.Msg["PROCEDURES_DEFNORETURN_COMMENT"];
Blockly.Msg["PROCEDURES_DEFRETURN_DO"] = Blockly.Msg["PROCEDURES_DEFNORETURN_DO"];
Blockly.Msg["PROCEDURES_DEFRETURN_PROCEDURE"] = Blockly.Msg["PROCEDURES_DEFNORETURN_PROCEDURE"];
Blockly.Msg["PROCEDURES_DEFRETURN_TITLE"] = Blockly.Msg["PROCEDURES_DEFNORETURN_TITLE"];
Blockly.Msg["TEXT_APPEND_VARIABLE"] = Blockly.Msg["VARIABLES_DEFAULT_NAME"];
Blockly.Msg["TEXT_CREATE_JOIN_ITEM_TITLE_ITEM"] = Blockly.Msg["VARIABLES_DEFAULT_NAME"];

Blockly.Msg["LOGIC_HUE"] = "210";
Blockly.Msg["LOOPS_HUE"] = "120";
Blockly.Msg["MATH_HUE"] = "230";
Blockly.Msg["TEXTS_HUE"] = "160";
Blockly.Msg["LISTS_HUE"] = "260";
Blockly.Msg["COLOUR_HUE"] = "20";
Blockly.Msg["VARIABLES_HUE"] = "330";
Blockly.Msg["VARIABLES_DYNAMIC_HUE"] = "310";
Blockly.Msg["PROCEDURES_HUE"] = "290";
return Blockly.Msg;
}
  var page={
  "vi": {
    "blocks": "Khối lệnh",
    "python": "Xem Python",
    "open": "Mở",
    "save": "Lưu",
    "help": "Hướng dẫn",
    "theme": "Màu giao diện",
    "language": "Ngôn ngữ",
    "light": "Sáng",
    "dark": "Tối",
    "projectName": "Tên dự án",
    "codeStudio": "Góc lập trình",
    "codeSubtitle": "Ghép khối lệnh, khám phá cách robot hoạt động.",
    "run": "Chạy thử",
    "uploadRun": "Nạp & chạy",
    "stop": "Dừng",
    "reset": "Reset",
    "resetTooltip": "Đưa robot về trạng thái ban đầu, chưa được nạp code. Giữ các khối lệnh của em.",
    "webotsTime": "Thời gian Webots",
    "offline": "Chưa kết nối",
    "preview": "Bản thử",
    "guide": "Cùng thử nhé",
    "cabibot": "CabiBot",
    "guideTitle": "Cho robot đi và rẽ",
    "guideDescription": "Khám phá những khối lệnh đầu tiên của em.",
    "guideStep1": "Chọn khối Di chuyển",
    "guideStep1Hint": "Kéo khối “đi tới” vào góc lập trình.",
    "guideStep2": "Ghép thêm khối lệnh",
    "guideStep2Hint": "Thêm “chờ 1 giây”, rồi “rẽ phải”.",
    "guideStep3": "Chạy chương trình",
    "guideStep3Hint": "Bấm Chạy thử để xem thứ tự các khối.",
    "examples": "Khám phá bài mẫu",
    "previewNote": "Bản thử xem thứ tự khối lệnh. Chưa điều khiển robot trong Webots.",
    "results": "Các bước chạy thử",
    "ready": "Sẵn sàng",
    "running": "Đang chạy thử",
    "runIdle": "Ghép khối lệnh rồi bấm Chạy thử nhé.",
    "estimatedTime": "Dự kiến thời gian chạy thử mô phỏng",
    "estimatedHint": "Tổng thời gian các khối chờ; chưa tính tay gắp/cảm biến.",
    "estimateUnknown": "Chưa thể ước tính",
    "seconds": "giây",
    "noCode": "Em chưa có chương trình. Thêm khối “Bắt đầu chương trình” nhé.",
    "waitingReset": "Đang chờ Webots đặt lại robot…",
    "resetDone": "Robot đã về trạng thái ban đầu.",
    "notConnected": "Chưa kết nối Webots.",
    "cabiTitle": "CabiBot cùng em khám phá",
    "cabiDescription": "Hỏi về robot, khối lệnh hoặc ý tưởng của em.",
    "cabiPlaceholder": "Em muốn hỏi điều gì?",
    "cabiSend": "Gửi",
    "cabiOffline": "Giao diện mẫu · chưa kết nối API CabiBot.",
    "cabiSuggestion1": "Vì sao robot không chạy?",
    "cabiSuggestion2": "Giải thích khối lặp",
    "cabiSuggestion3": "Em nên bắt đầu từ đâu?",
    "copyCode": "Sao chép code",
    "pythonTitle": "Code từ những khối lệnh",
    "pythonNote": "Python được tạo từ các khối trong góc lập trình.",
    "pythonFooter": "Thay đổi khối lệnh để cập nhật code.",
    "zoomIn": "Phóng to",
    "zoomOut": "Thu nhỏ",
    "center": "Đưa khối về giữa",
    "workspaceHint": "Kéo khối lệnh từ bên trái và ghép vào nhau.",
    "blocksCount": "{count} khối lệnh",
    "programStart": "Bắt đầu chương trình",
    "firstProject": "Robot đầu tiên",
    "loopProject": "Đi theo hình vuông",
    "savedProject": "Bài đã lưu",
    "noSavedProject": "Chưa có bài đã lưu trên thiết bị này.",
    "projectsTitle": "Chọn một bài để khám phá",
    "projectsDescription": "Em có thể đổi những con số và thử lại.",
    "exampleFirstHint": "Đi tới, chờ, rồi rẽ phải.",
    "exampleLoopHint": "Lặp lại một chuỗi chuyển động 4 lần.",
    "close": "Đóng",
    "helpTitle": "Hướng dẫn sử dụng",
    "help1": "Chọn nhóm khối ở bên trái và kéo khối vào góc lập trình.",
    "help2": "Ghép các khối dưới “Bắt đầu chương trình”. Đổi con số để thử ý tưởng mới.",
    "help3": "Bấm Chạy thử để xem thứ tự thực hiện. Python cho em xem code tương ứng.",
    "help4": "Lưu bài để tiếp tục trên thiết bị này. Reset đặt lại phiên chạy và giữ bài của em.",
    "saved": "Đã lưu",
    "unsaved": "Chưa lưu",
    "example": "Bài mẫu",
    "copySuccess": "Đã sao chép Python.",
    "copyFallback": "Chọn và sao chép code trong khung Python.",
    "saveSuccess": "Đã lưu bài của em.",
    "saveFailure": "Chưa lưu được bài. Kiểm tra dung lượng hoặc quyền lưu của trình duyệt.",
    "loadSuccess": "Đã mở bài của em.",
    "loadFailure": "Không mở được bài lưu. Các khối trước đó đã được giữ lại.",
    "walkthroughNote": "Đang xem thứ tự khối; robot trong Webots chưa được điều khiển.",
    "walkthroughDone": "Đã xem xong {count} bước. Thử đổi một con số nhé!",
    "walkthroughStopped": "Đã dừng xem thử.",
    "walkthroughChanged": "Khối lệnh đã đổi. Bấm Chạy thử để thử lại.",
    "resetOffline": "Chưa kết nối Webots nên chưa thể đặt lại robot.",
    "resetPreview": "Đặt lại phiên chạy thử",
    "moveForward": "Đi tới",
    "moveBackward": "Đi lùi",
    "turnLeft": "Rẽ trái",
    "turnRight": "Rẽ phải",
    "stopMoving": "Dừng di chuyển",
    "waitStep": "Chờ {value} giây",
    "startStep": "Bắt đầu chương trình",
    "repeatStep": "Lặp lại {count} lần",
    "stepProgress": "Bước {index} / {count}",
    "speedStep": "Tốc độ {value}%",
    "categoryStart": "Bắt đầu",
    "categoryMotion": "Di chuyển",
    "categoryControl": "Điều khiển",
    "categoryGripper": "Tay gắp",
    "categorySensors": "Cảm biến",
    "categoryMath": "Tính toán",
    "categoryText": "Văn bản",
    "categoryAdvanced": "Nâng cao",
    "categoryVariables": "Biến",
    "categoryFunctions": "Hàm",
    "categoryLists": "Danh sách",
    "connectionWaiting": "Chờ kết nối Webots",
    "clockWaiting": "Đang chờ thời gian",
    "clockHint": "Chờ dữ liệu từ Webots",
    "unloadedProgram": "Chưa nạp chương trình",
    "loadedProgram": "Đã nạp chương trình",
    "workflowTitle": "HƯỚNG DẪN SỬ DỤNG",
    "guideEyebrow": "KHỞI ĐỘNG / 01",
    "previewResetDone": "Đã đặt lại phiên chạy thử. Chưa gửi lệnh đến Webots.",
    "resetPending": "Đã gửi Reset · đang chờ trạng thái Webots",
    "backendError": "Webots báo lỗi: {message}",
    "codeError": "Chưa tạo được Python: {message}",
    "walkthroughLimit": "Bài có quá nhiều bước để xem thử. Thử giảm số lần lặp nhé.",
    "walkthroughUnsupported": "Khối “{type}” chưa hỗ trợ chạy thử trong trình duyệt.",
    "walkthroughNumber": "Giá trị của “{name}” phải là một con số hữu hạn.",
    "walkthroughRepeat": "Số lần lặp phải là số nguyên từ 0 đến {max}.",
    "walkthroughWait": "Thời gian chờ phải từ 0 đến {max} giây.",
    "walkthroughStart": "Thêm một khối “Bắt đầu chương trình” để chạy thử.",
    "walkthroughMultipleStarts": "Dùng một khối “Bắt đầu chương trình” cho mỗi bài chạy thử.",
    "walkthroughDisconnected": "Có khối chưa nối vào chương trình. Ghép chúng dưới khối Bắt đầu nhé.",
    "walkthroughSpeed": "Tốc độ phải từ 0 đến 100%.",
    "walkthroughEmpty": "Thêm khối lệnh dưới “Bắt đầu chương trình” nhé.",
    "walkthroughCycle": "Các khối đang nối thành vòng. Kiểm tra lại các kết nối nhé.",
    "walkthroughDuration": "Bài chạy thử quá dài. Giảm thời gian chờ hoặc số lần lặp nhé."
  },
  "en": {
    "blocks": "Blocks",
    "python": "View Python",
    "open": "Open",
    "save": "Save",
    "help": "Help",
    "theme": "Theme",
    "language": "Language",
    "light": "Light",
    "dark": "Dark",
    "projectName": "Project name",
    "codeStudio": "Code studio",
    "codeSubtitle": "Connect blocks and discover how your robot works.",
    "run": "Preview run",
    "uploadRun": "Upload & run",
    "stop": "Stop",
    "reset": "Reset",
    "resetTooltip": "Return the robot to its initial state with no code loaded. Keep your blocks.",
    "webotsTime": "Webots time",
    "offline": "Not connected",
    "preview": "Preview",
    "guide": "Let’s try",
    "cabibot": "CabiBot",
    "guideTitle": "Make your robot move and turn",
    "guideDescription": "Discover your first programming blocks.",
    "guideStep1": "Choose Motion blocks",
    "guideStep1Hint": "Drag “go forward” into the code studio.",
    "guideStep2": "Connect more blocks",
    "guideStep2Hint": "Add “wait 1 second”, then “turn right”.",
    "guideStep3": "Run your program",
    "guideStep3Hint": "Click Preview run to see the order of your blocks.",
    "examples": "Explore examples",
    "previewNote": "This preview shows block order. It does not control the robot in Webots.",
    "results": "Preview steps",
    "ready": "Ready",
    "running": "Running preview",
    "runIdle": "Connect some blocks, then click Preview run.",
    "estimatedTime": "Estimated simulation preview time",
    "estimatedHint": "Total wait-block duration; excludes gripper and sensors.",
    "estimateUnknown": "Cannot estimate yet",
    "seconds": "seconds",
    "noCode": "Your program is empty. Add a “Start program” block.",
    "waitingReset": "Waiting for Webots to reset the robot…",
    "resetDone": "The robot is back at its initial state.",
    "notConnected": "Webots is not connected.",
    "cabiTitle": "Explore together with CabiBot",
    "cabiDescription": "Ask about robots, blocks, or your ideas.",
    "cabiPlaceholder": "What would you like to ask?",
    "cabiSend": "Send",
    "cabiOffline": "Sample interface · CabiBot API is not connected yet.",
    "cabiSuggestion1": "Why is my robot not moving?",
    "cabiSuggestion2": "Explain repeat blocks",
    "cabiSuggestion3": "Where should I start?",
    "copyCode": "Copy code",
    "pythonTitle": "Code from your blocks",
    "pythonNote": "Python is generated from the blocks in your code studio.",
    "pythonFooter": "Change your blocks to update the code.",
    "zoomIn": "Zoom in",
    "zoomOut": "Zoom out",
    "center": "Center blocks",
    "workspaceHint": "Drag blocks from the left and connect them together.",
    "blocksCount": "{count} blocks",
    "programStart": "Start program",
    "firstProject": "My first robot",
    "loopProject": "Follow a square",
    "savedProject": "Saved project",
    "noSavedProject": "There is no saved project on this device yet.",
    "projectsTitle": "Choose a project to explore",
    "projectsDescription": "Try changing the numbers and running it again.",
    "exampleFirstHint": "Go forward, wait, then turn right.",
    "exampleLoopHint": "Repeat a movement sequence 4 times.",
    "close": "Close",
    "helpTitle": "User guide",
    "help1": "Choose a block group on the left and drag blocks into the code studio.",
    "help2": "Connect blocks under “Start program”. Change the numbers to try new ideas.",
    "help3": "Click Preview run to see the order of execution. Python shows the corresponding code.",
    "help4": "Save your project to continue on this device. Reset restarts the preview and keeps your work.",
    "saved": "Saved",
    "unsaved": "Unsaved",
    "example": "Example",
    "copySuccess": "Python copied.",
    "copyFallback": "Select and copy the code in the Python panel.",
    "saveSuccess": "Your project has been saved.",
    "saveFailure": "Could not save your project. Check storage space or browser storage permissions.",
    "loadSuccess": "Your project has been opened.",
    "loadFailure": "Could not open the saved project. Your previous blocks have been kept.",
    "walkthroughNote": "Showing block order; the robot in Webots is not being controlled.",
    "walkthroughDone": "Finished {count} steps. Try changing a number!",
    "walkthroughStopped": "Preview stopped.",
    "walkthroughChanged": "Your blocks changed. Click Preview run to try again.",
    "resetOffline": "Webots is not connected, so the robot cannot be reset yet.",
    "resetPreview": "Reset preview run",
    "moveForward": "Go forward",
    "moveBackward": "Go backward",
    "turnLeft": "Turn left",
    "turnRight": "Turn right",
    "stopMoving": "Stop moving",
    "waitStep": "Wait {value} seconds",
    "startStep": "Start program",
    "repeatStep": "Repeat {count} times",
    "stepProgress": "Step {index} / {count}",
    "speedStep": "Speed {value}%",
    "categoryStart": "Start",
    "categoryMotion": "Motion",
    "categoryControl": "Control",
    "categoryGripper": "Gripper",
    "categorySensors": "Sensors",
    "categoryMath": "Math",
    "categoryText": "Text",
    "categoryAdvanced": "Advanced",
    "categoryVariables": "Variables",
    "categoryFunctions": "Functions",
    "categoryLists": "Lists",
    "connectionWaiting": "Waiting for Webots connection",
    "clockWaiting": "Waiting for time",
    "clockHint": "Waiting for Webots data",
    "unloadedProgram": "No program loaded",
    "loadedProgram": "Program loaded",
    "workflowTitle": "USER GUIDE",
    "guideEyebrow": "GET STARTED / 01",
    "previewResetDone": "Preview run reset. No command was sent to Webots.",
    "resetPending": "Reset sent · waiting for Webots status",
    "backendError": "Webots error: {message}",
    "codeError": "Python generation failed: {message}",
    "walkthroughLimit": "This project has too many steps to preview. Try fewer repeats.",
    "walkthroughUnsupported": "The “{type}” block is not supported by the browser preview yet.",
    "walkthroughNumber": "The value of “{name}” must be a finite number.",
    "walkthroughRepeat": "Repeat count must be a whole number from 0 to {max}.",
    "walkthroughWait": "Wait duration must be between 0 and {max} seconds.",
    "walkthroughStart": "Add one “Start program” block to run the preview.",
    "walkthroughMultipleStarts": "Use one “Start program” block for each preview program.",
    "walkthroughDisconnected": "Some blocks are not connected. Connect them under the Start block.",
    "walkthroughSpeed": "Speed must be between 0 and 100%.",
    "walkthroughEmpty": "Add some blocks under “Start program”.",
    "walkthroughCycle": "The blocks form a cycle. Check their connections.",
    "walkthroughDuration": "This preview is too long. Reduce wait durations or repeat counts."
  }
};

  var messages = { vi: localeVi({Msg:{}}), en: localeEn({Msg:{}}) };
  var B = null, language = 'vi', buildingTemplate = false;
  var templates = Object.create(null);
  var palette = {motor:'#1d8171',time:'#4c70c7',control:'#4c70c7',gripper:'#915bbf',sensor:'#926d1c',math:'#3e7f62',text:'#6b709e',start:'#8065ba'};
  var custom = {
    other_start:{labels:[['Bắt đầu chương trình','Start program']],tip:['Các khối bên dưới chạy theo thứ tự khi em chạy chương trình.','The blocks below run in order when you run your program.']},
    other_end:{labels:[['Kết thúc','End']],tip:['Kết thúc chương trình.','End the program.']},
    motors_go_forward:{labels:[['đi tới','go forward'],['%','%']],tip:['Cho robot đi tới. Tốc độ từ 0 đến 100%.','Move the robot forward. Speed is from 0 to 100%.']},
    motors_go_backward:{labels:[['đi lùi','go backward'],['%','%']],tip:['Cho robot đi lùi. Tốc độ từ 0 đến 100%.','Move the robot backward. Speed is from 0 to 100%.']},
    motors_turn_left:{labels:[['rẽ trái','turn left'],['%','%']],tip:['Cho robot xoay trái tại chỗ. Tốc độ từ 0 đến 100%.','Turn the robot left in place. Speed is from 0 to 100%.']},
    motors_turn_right:{labels:[['rẽ phải','turn right'],['%','%']],tip:['Cho robot xoay phải tại chỗ. Tốc độ từ 0 đến 100%.','Turn the robot right in place. Speed is from 0 to 100%.']},
    motors_setupmotor:{labels:[['cài động cơ','set up motor']],tip:['Khối dành cho dự án cũ. Giữ đúng tên thiết bị của Webots.','Legacy project block. Keep the exact Webots device name.']},
    motors_setspeed:{labels:[['đặt tốc độ','set speed'],['%','%']],tip:['Đặt tốc độ động cơ theo phần trăm.','Set the motor speed as a percentage.']},
    time_delay:{labels:[['chờ','wait'],['giây','seconds']],tip:['Chờ số giây đã chọn trước khi chạy khối tiếp theo.','Wait for the selected number of seconds before running the next block.']},
    time_gettime:{labels:[['thời gian Webots','Webots time']],tip:['Đọc thời gian mô phỏng từ Webots, tính bằng giây.','Read Webots simulation time in seconds.']},
    time_resettime:{labels:[['đặt lại thời gian','reset time']],tip:['Khối giữ tương thích với dự án cũ; không đặt lại robot.','Legacy compatibility block; does not reset the robot.']},
    gripper_grip:{labels:[['gắp vật','grip object'],['°','°']],tip:['Khối đang khóa. Hiện tại hãy dùng nâng/hạ tay gắp.','This block is locked. Use raise/lower gripper arm for now.']},
    gripper_release:{labels:[['thả vật','release object'],['°','°']],tip:['Khối đang khóa. Hiện tại hãy dùng nâng/hạ tay gắp.','This block is locked. Use raise/lower gripper arm for now.']},
    arm_up:{labels:[['nâng tay gắp thêm','raise arm by'],['mm','mm']],tip:['Nâng thêm số mm đã chọn từ vị trí hiện tại, rồi chạy khối tiếp theo khi tay đã tới đích. Tay bắt đầu ở 0 mm và dừng ở giới hạn +250 mm.','Raise by the selected mm from the current position, then continue when the arm reaches its target. The arm starts at 0 mm and stops at the +250 mm limit.']},
    arm_down:{labels:[['hạ tay gắp bớt','lower arm by'],['mm','mm']],tip:['Hạ bớt số mm đã chọn từ vị trí hiện tại, rồi chạy khối tiếp theo khi tay đã tới đích. Tay không hạ dưới −50 mm.','Lower by the selected mm from the current position, then continue when the arm reaches its target. The arm does not go below −50 mm.']},
    preview_stop:{labels:[['dừng di chuyển','stop moving']],tip:['Dừng chuyển động của robot.','Stop the robot moving.']},
    sensors_getdistance:{labels:[['đọc khoảng cách','read distance']],tip:['Đọc khoảng cách từ cảm biến của robot.','Read distance from the robot sensor.']},
    sensors_initializegyro:{labels:[['cài cảm biến góc','set up gyro']]},
    sensors_initializegps:{labels:[['cài cảm biến GPS','set up GPS']]},
    sensors_initializesensor:{labels:[['cài cảm biến','set up sensor']]},
    sensors_getgpsvals:{labels:[['đọc vị trí GPS','read GPS position']]},
    sensors_getgyrovals:{labels:[['đọc góc xoay','read rotation angle']]},
    sensors_getdistvals:{labels:[['đọc khoảng cách','read distance']]},
    sensors_getcolor:{labels:[['đọc màu','read color']]},
    sensors_getgray:{labels:[['đọc độ sáng','read brightness']]},
    camera_initializecamera:{labels:[['cài camera','set up camera']]},
    camera_getrecognitionobjects:{labels:[['đọc vật camera nhận ra','read recognized objects']]},
    camera_getnumobj:{labels:[['số vật camera nhận ra','recognized object count']]},
    camera_getobjcolors:{labels:[['màu của vật','object color']]},
    camera_getobjpos:{labels:[['vị trí của vật','object position']]},
    camera_getobjang:{labels:[['góc đến vật','angle to object']]}
  };
  var customTips = {
    sensors_initializegyro:['Cài cảm biến góc theo đúng tên thiết bị trong Webots.','Set up the gyro using its exact Webots device name.'],
    sensors_initializegps:['Cài GPS theo đúng tên thiết bị trong Webots.','Set up GPS using its exact Webots device name.'],
    sensors_initializesensor:['Chọn loại cảm biến, tên thiết bị trong Webots và biến để lưu cảm biến.','Choose the sensor type, its Webots device name and a variable for the sensor.'],
    sensors_getgpsvals:['Đọc vị trí robot dưới dạng danh sách tọa độ x, y, z.','Read the robot position as a list of x, y, z coordinates.'],
    sensors_getgyrovals:['Đọc góc xoay của robot so với hướng ban đầu, tính bằng độ.','Read robot rotation from its initial direction in degrees.'],
    sensors_getdistvals:['Đọc cảm biến khoảng cách đã chọn. Kết quả tính bằng cm.','Read the chosen distance sensor. The result is in cm.'],
    sensors_getcolor:['Đọc ba giá trị màu đỏ, xanh lá và xanh dương, từ 0 đến 255.','Read red, green and blue values from 0 to 255.'],
    sensors_getgray:['Đọc độ sáng từ cảm biến màu, từ 0 đến 255.','Read brightness from the color sensor, from 0 to 255.'],
    camera_initializecamera:['Cài camera theo đúng tên thiết bị trong Webots.','Set up the camera using its exact Webots device name.'],
    camera_getrecognitionobjects:['Đọc danh sách các vật camera nhận ra.','Read the list of objects recognized by the camera.'],
    camera_getnumobj:['Đọc số vật camera nhận ra.','Read the number of objects recognized by the camera.'],
    camera_getobjcolors:['Đọc màu RGB của vật camera nhận ra.','Read the RGB color of a recognized object.'],
    camera_getobjpos:['Đọc tọa độ x, y, z của vật so với camera, tính bằng mét.','Read object x, y, z coordinates relative to the camera in meters.'],
    camera_getobjang:['Đọc góc của vật so với hướng nhìn của robot, từ -90 đến 90 độ.','Read the object angle relative to robot vision, from -90 to 90 degrees.']
  };
  function normalized(lang) { return lang === 'en' ? 'en' : 'vi'; }
  function useMessages(lang) { Object.assign(B.Msg, messages[normalized(lang)]); }
  function quiet(action) {
    if (!B || !B.Events) return action();
    B.Events.disable();
    try { return action(); } finally { B.Events.enable(); }
  }
  function immutableLabel(field) {
    return field instanceof B.FieldLabel && !field.SERIALIZABLE && !field.name;
  }
  function dropdown(field) {
    return field instanceof B.FieldDropdown && !(B.FieldVariable && field instanceof B.FieldVariable) && !field.isOptionListDynamic();
  }
  function fieldKind(field) {
    if (immutableLabel(field)) return 'label';
    if (dropdown(field)) return 'dropdown:' + (field.name || '');
    return 'value:' + (field.name || '');
  }
  function describe(block) {
    return {
      tooltip: typeof block.tooltip === 'string' ? block.getTooltip() : null,
      inputs: block.inputList.map(function(input) {
        return { name: input.name, fields: input.fieldRow.map(function(field) {
          var item = {kind:fieldKind(field),text:field.getText ? field.getText() : ''};
          if (dropdown(field)) item.options = field.getOptions(false).map(function(option) { return [option[0],option[1]]; });
          return item;
        })};
      })
    };
  }
  // Create translation templates in disposable headless workspaces only.
  // User blocks, connections, models and execution state are never re-created.
  function getTemplates(type) {
    if (Object.prototype.hasOwnProperty.call(templates,type)) return templates[type];
    var result = {}, oldLanguage = language;
    buildingTemplate = true;
    try {
      ['vi','en'].forEach(function(lang) {
        var scratch = null;
        try {
          useMessages(lang);
          scratch = new B.Workspace();
          result[lang] = describe(scratch.newBlock(type));
        } catch (error) {
          result[lang] = null;
        } finally { if (scratch) scratch.dispose(); }
      });
    } finally { buildingTemplate = false; useMessages(oldLanguage); }
    templates[type] = result;
    return result;
  }
  var tokenPairs = [['cảm biến màu','colorSensor'],['cảm biến khoảng cách','distanceSensor']];
  Object.keys(messages.en).forEach(function(key) {
    if (!Object.prototype.hasOwnProperty.call(messages.vi,key)) return;
    var source=String(messages.en[key]),target=String(messages.vi[key]);
    if (/_HELPURL$|_HUE$/.test(key)) return;
    tokenPairs.push([target.trim(),source.trim()]);
    var sourceSlots=source.match(/%\d+/g)||[],targetSlots=target.match(/%\d+/g)||[];
    if (sourceSlots.join('|')!==targetSlots.join('|')) return;
    var sourceParts=source.split(/%\d+/),targetParts=target.split(/%\d+/);
    sourceParts.forEach(function(part,index) {
      if (part.trim() && targetParts[index] && targetParts[index].trim()) tokenPairs.push([targetParts[index].trim(),part.trim()]);
    });
  });
  function translatedText(text,lang) {
    var trimmed=String(text).trim(),target=lang==='en'?1:0;
    for (var index=0;index<tokenPairs.length;index++) {
      var pair=tokenPairs[index];
      if (trimmed===pair[0] || trimmed===pair[1]) return pair[target];
    }
    return text;
  }
  function colour(type) {
    if (/^motors_|^preview_stop$/.test(type)) return palette.motor;
    if (/^time_/.test(type)) return palette.time;
    if (/^controls?_/.test(type)) return palette.control;
    if (/^gripper_|^arm_/.test(type)) return palette.gripper;
    if (/^sensors_|^camera_/.test(type)) return palette.sensor;
    if (/^math_|^logic_/.test(type)) return palette.math;
    if (/^(?:text|concattext)/.test(type)) return palette.text;
    if (/^other_|^variables_|^procedures_|^lists_/.test(type)) return palette.start;
    return null;
  }
  function applyDropdown(field,sample,lang) {
    var oldValue=field.getValue(),oldOptions=field.getOptions(false);
    var options=oldOptions.map(function(option) {
      var found=sample && sample.options && sample.options.find(function(candidate) { return candidate[1]===option[1]; });
      // The bundled FieldDropdown expands message references in its reusable
      // JSON array on first construction. Translate that cached text as well.
      var label=found?found[0]:option[0];
      return [typeof label==='string'?translatedText(label,lang):label,option[1]];
    });
    // This version of Blockly stores display labels separately from the value.
    // Change that presentation cache only; never call setValue or a validator.
    field.menuGenerator_=options;
    field.generatedOptions_=null;
    var selected=options.find(function(option) {return option[1]===oldValue;});
    if (selected) field.selectedOption_=selected;
    if (field.forceRerender) field.forceRerender();
  }
  function decorateBlock(block,lang) {
    if (!block || !B || buildingTemplate) return block;
    lang=normalized(lang||language);
    return quiet(function() {
      var descriptor=custom[block.type], labelIndex=0;
      var template=descriptor?null:getTemplates(block.type)[lang];
      block.inputList.forEach(function(input,inputIndex) {
        var sample=template && template.inputs[inputIndex];
        if (sample && sample.name!==input.name) sample=null;
        var aligned=sample && sample.name===input.name && sample.fields.length===input.fieldRow.length && sample.fields.every(function(field,index) {return field.kind===fieldKind(input.fieldRow[index]);});
        input.fieldRow.forEach(function(field,index) {
          var reference=aligned?sample.fields[index]:null;
          if (!reference && sample && field.name) reference=sample.fields.find(function(candidate) {return candidate.kind===fieldKind(field);});
          if (!reference && sample && immutableLabel(field)) {
            // Locale-dependent dropdown prefix/suffix labels may have different
            // counts. Match immutable labels between the same editable-field
            // anchors, leaving the field/connection order untouched.
            var anchor=0,offset=0;
            for (var prior=0;prior<index;prior++) {
              if (immutableLabel(input.fieldRow[prior])) offset++;
              else {anchor++;offset=0;}
            }
            var sampleAnchor=0,sampleOffset=0;
            reference={kind:'label',text:''};
            sample.fields.some(function(candidate) {
              if (candidate.kind==='label') {
                if (sampleAnchor===anchor && sampleOffset===offset) {reference=candidate;return true;}
                sampleOffset++;
              } else {sampleAnchor++;sampleOffset=0;}
              return false;
            });
          }
          if (immutableLabel(field)) {
            var value=descriptor && descriptor.labels[labelIndex] ? descriptor.labels[labelIndex][lang==='en'?1:0] : (reference?reference.text:translatedText(field.getText(),lang));
            labelIndex++;
            if (field.getValue()!==value) field.setValue(value);
          } else if (dropdown(field)) applyDropdown(field,reference,lang);
        });
      });
      var tips=descriptor && (descriptor.tip || customTips[block.type]);
      if (tips) block.setTooltip(tips[lang==='en'?1:0]);
      else if (template && template.tooltip!==null && typeof block.tooltip==='string') block.setTooltip(template.tooltip);
      var blockColour=colour(block.type);
      if (blockColour && block.getColour()!==blockColour) block.setColour(blockColour);
      return block;
    });
  }
  function install(blockly,lang) {
    B=blockly;language=normalized(lang||language);useMessages(language);
    // The bundled dropdown constructor mutates reusable JSON option arrays
    // while expanding locale references. Give each field its own options so
    // later blocks/templates can still initialize in either language.
    var dropdownPrototype=B.FieldDropdown && B.FieldDropdown.prototype;
    if (dropdownPrototype && !dropdownPrototype.trimOptions_.__liemsLocale) {
      var originalTrim=dropdownPrototype.trimOptions_;
      var trim=function() {
        if (Array.isArray(this.menuGenerator_)) this.menuGenerator_=this.menuGenerator_.map(function(option) {
          var label=option[0];
          return [label && typeof label==='object'?Object.assign({},label):label,option[1]];
        });
        return originalTrim.call(this);
      };
      trim.__liemsLocale=true;dropdownPrototype.trimOptions_=trim;
    }
    Object.keys(B.Blocks).forEach(function(type) {
      var definition=B.Blocks[type];
      if (!definition || typeof definition.init!=='function' || definition.init.__liemsLocale) return;
      var original=definition.init;
      var wrapped=function() {original.call(this); if (!buildingTemplate) decorateBlock(this,language);};
      wrapped.__liemsLocale=true;definition.init=wrapped;
    });
    return api;
  }
  function setLanguage(lang) { language=normalized(lang);if(B)useMessages(language);return language; }
  function relabelWorkspace(workspace,lang) {
    setLanguage(lang);
    if (!workspace || !B) return;
    return quiet(function() {
      workspace.getAllBlocks(false).forEach(function(block) {decorateBlock(block,language);});
      var flyout=workspace.getFlyout && workspace.getFlyout();
      var flyoutWorkspace=flyout && flyout.getWorkspace();
      if (flyoutWorkspace && flyoutWorkspace!==workspace) flyoutWorkspace.getAllBlocks(false).forEach(function(block) {decorateBlock(block,language);});
    });
  }
  function t(key,variables,lang) {
    var text=page[normalized(lang||language)][key]||key;
    return text.replace(/\{(\w+)\}/g,function(match,name) {return variables && variables[name]!==undefined?String(variables[name]):match;});
  }
  var api={messages:messages,page:page,palette:palette,install:install,setLanguage:setLanguage,decorateBlock:decorateBlock,relabelWorkspace:relabelWorkspace,t:t};
  global.LiemsLocale=api;
})(window);
