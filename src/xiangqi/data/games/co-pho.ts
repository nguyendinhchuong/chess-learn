import type { XqGame } from '../types';

// Ván mẫu cổ phổ: lấy đường chính (chủ biến) trong bản số hóa Quất Trung Bí, Mai Hoa Phổ và Tự xuất động lai vô địch thủ
// trên dpxq.com và xiangqiqipu.com.
// Cổ phổ là ván do tác giả soạn để dạy, không phải ván đấu thật: bên thua thường đi những nước "tự nhiên mà sai"
// để minh họa đòn phạt. Lời bình chỉ ra cả chỗ máy tính hiện đại tìm được cách chống đỡ tốt hơn.

const QTB_CONTEXT =
  'Quất Trung Bí (橘中秘) do Chu Tấn Trinh (朱晋桢) biên soạn, in năm 1632 cuối đời Minh, là một trong những bộ cổ phổ nổi tiếng nhất của cờ tướng. Sách xoay quanh nghệ thuật cầm quân tiên với **Pháo đầu (đương đầu pháo)**: Thuận pháo, Liệt pháo, Pháo đầu đối Bình phong mã… Mỗi "cục" gồm một đường chính và nhiều biến; trong phần "Đắc tiên", bên đi trước thường thắng nhanh nhờ ra quân gấp và tấn công Tướng dồn dập.';

const MHP_CONTEXT =
  'Mai Hoa Phổ (梅花谱) do Vương Tái Việt (王再越) soạn vào đời Khang Hy nhà Thanh (1662–1722). Năm biên soạn chính xác không rõ – lời tựa chỉ cho biết tác giả là người thời Khang Hy – nên năm 1700 ở đây chỉ là mốc ước lệ. Suốt đời Thanh, sách chỉ lưu truyền qua bản chép tay, đến năm 1917 mới được in. Cùng với Quất Trung Bí, sách được gọi chung là "Quất Mai" – hai bộ cổ phổ lớn nhất của cờ tướng. Tinh hoa của Mai Hoa Phổ là 8 ván **Bình phong mã phá Pháo đầu** trong phần "Nhượng tiên" (bên của tác giả đi sau): hai Mã cùng che Tốt đầu, lấy nhu chế cương để thắng Pháo đầu – một quan niệm mới so với Quất Trung Bí vốn đề cao Pháo đầu tấn công.';

const QTB_TOAN_CUC_CONTEXT =
  'Quất Trung Bí (橘中秘) do Chu Tấn Trinh (朱晋桢) biên soạn, in năm 1632 cuối đời Minh – cùng với Mai Hoa Phổ là hai bộ cổ phổ lớn nhất của cờ tướng. Sách đề cao **Pháo đầu**, lối ra quân gấp và tấn công Tướng dồn dập. Phần ván mẫu toàn cục có phần "Đắc tiên" (bên của tác giả đi trước) và phần "Nhượng tiên" (tác giả nhường đối phương đi trước, tự cầm quân Đen).';

const TXD_CONTEXT =
  'Tự xuất động lai vô địch thủ (自出洞来无敌手 – "Từ khi ra khỏi động chưa gặp đối thủ") là bộ cổ phổ ký tên Thuần Dương đạo nhân (纯阳道人); tên sách lấy từ một câu thơ được chép trong "Tây Khê tùng ngữ" của Diêu Khoan đời Tống. Năm biên soạn không rõ: sách thường được xếp vào đời Minh (1368–1644), lâu nay chủ yếu lưu truyền qua bản chép tay, mãi tới năm 1948 mới được Thiệu Thứ Minh (邵次明) in vào sách "Tượng kỳ chiến lược". Năm 1600 ở đây chỉ là mốc ước lệ để sắp xếp. Toàn sách có 35 ván, chia làm 7 loại, mỗi loại 5 ván và mang một chữ trong tên sách; khác với Quất Trung Bí hay Mai Hoa Phổ, mỗi ván chỉ ghi một đường đi, không kèm biến.';

export const GAMES_CO_PHO: XqGame[] = [
  // ------------------------------------------------------------------ 1600 · Tự xuất động: Tín thủ pháo, ván mở đầu sách
  {
    id: 'tu-xuat-dong-tin-thu-phao',
    title: 'Tự xuất động: Tín thủ pháo – thí Xe, chiếu đôi, Pháo chiếu bí',
    red: 'Tự xuất động (bên Đỏ)',
    black: 'Tự xuất động (bên Đen)',
    event: 'Cổ phổ Tự xuất động lai vô địch thủ – loại chữ "Tự" (Tín thủ pháo), ván 1',
    year: 1600,
    result: '1-0',
    opening: 'Thuận pháo hoành xa đối trực xa',
    difficulty: 3,
    context: `${TXD_CONTEXT}

Đây là ván mở đầu cuốn sách: ván 1 của loại chữ "Tự" – "Tín thủ pháo" (信手炮). Trang zh.wikipedia về cuốn sách cũng chọn chính ván này làm ví dụ: Đỏ thắng ở nước 18 bằng nước Pháo bình sang lộ 4 (炮二平四).`,
    summary: `Hai bên Thuận pháo. Đỏ dùng Xe ngang lao thẳng xuống f8, sát cạnh cung Tướng Đen, rồi để con Xe ấy nằm im. Trong lúc Đen mải ăn Tốt, Đỏ đưa Mã đi một vòng g2 – f4 – g6 – h8, tới đúng chỗ giữ ô f9.

Khi Đen sơ suất đẩy Tốt ở nước 13, đòn kết thúc diễn ra liền một mạch: **thí Xe** ở f9, Mã lùi chiếu, Xe thứ hai ăn Xe cản chân Mã, rồi Xe lại xuống f9 tạo **chiếu đôi** Xe – Mã. Tướng Đen buộc phải ăn Xe, và Pháo h2 bình sang f2 chiếu bí qua ngòi Mã f7.`,
    moves:
      '1. P8-5 P2-5 2. M8.7 M2.3 3. X9.1 X1-2 4. X9-4 S6.5 5. X4.7 M8.9 6. B3.1 X2.6 7. M2.3 X2-3 8. M3.4 B3.1 9. M4.3 P8-6 10. M3.2 P6-8 11. X1.1 B3.1 12. X1-8 X9.1 13. X8.7 B3-4 14. X4.1 S5/6 15. M2/4 X9-6 16. X8-4 S4.5 17. X4.1 Tg5-6 18. P2-4',
    annotations: {
      '1': 'Pháo đầu: Pháo b2 về giữa.',
      '1...': '**Thuận pháo**: Đen cũng đưa Pháo b7 về giữa, cùng cánh với Pháo Đỏ.',
      '3': '**Hoành xa**: Xe a0 tiến một bước, chuẩn bị chạy ngang.',
      '3...': '**Trực xa**: Xe a9 ra thẳng cột b.',
      '4': 'Xe hoành bình sang cột f, nhắm Sĩ f9 dọc cột f đang trống.',
      '4...': 'Sĩ f9 lên e8. Cột f giờ trống trơn từ f1 tới f9.',
      '5': 'Xe lao thẳng xuống f8, sát cạnh cung Tướng Đen. Con Xe này sẽ đứng yên ở đó gần hết ván, chờ thời cơ.',
      '6': 'Tốt g3 lên g4, mở chân cho Mã: sau khi lên g2, Mã có thể nhảy f4.',
      '6...': 'Xe b9 lao xuống b3, hàng Tốt của Đỏ, dọa ăn Tốt a3 và Tốt c3.',
      '7': 'Đỏ mặc Tốt c3, lên Mã g2 tiếp tục ra quân.',
      '7...': 'Xe ăn Tốt c3.',
      '8': 'Mã g2 nhảy f4 (chân g3 đã trống).',
      '9': 'Mã f4 nhảy lên g6 ăn Tốt g6, tiến sát cung Tướng Đen.',
      '9...': 'Pháo h7 bình sang f7, chặn đường lui của Xe f8 trên cột f.',
      '10':
        'Mã g6 nhảy h8, đánh Pháo f7 (chân Mã g8 trống). Từ h8, Mã còn giữ ô f9 – mảnh ghép quan trọng cho đòn kết thúc sau này.',
      '10...': 'Pháo f7 lui về h7 tránh Mã.',
      '11': 'Xe i0 tiến một bước, chuẩn bị chạy ngang ra trận.',
      '11...': 'Tốt c5 tiến c4 qua sông.',
      '12...':
        'Xe i9 lên i8 đánh Mã h8 – nhưng Mã đã được Xe f8 bảo vệ dọc hàng 8. Máy tính coi đây là nước kém; bình Pháo e7 sang g7 (P5-7) tốt hơn.',
      '13': 'Xe b1 lao xuống b8, áp sát Sĩ e8 theo hàng 8.',
      '13...':
        '**Sai lầm thua cờ**: Tốt c4 bình sang d4, một nước chậm khi quân Đỏ đã vây quanh cung Tướng. Máy tính chỉ ra từ đây Đỏ có chiếu bí bắt buộc sau 7 nước; bình Pháo e7 sang g7 (P5-7) thì Đen vẫn giữ được thế.',
      '14':
        '**Thí Xe!** Xe f8 lên f9 chiếu Tướng. Tướng không ăn được Xe vì Mã h8 bảo vệ ô f9; Đen chỉ còn đúng một nước: Sĩ e8 ăn Xe.',
      '14...': 'Sĩ e8 ăn Xe – nước hợp lệ duy nhất. Ô e8 bỏ trống.',
      '15': 'Mã h8 lùi về f7 **chiếu Tướng** (chân Mã f8 trống). Đồng thời hàng 8 từ b8 tới f8 đã thông cho Xe b8.',
      '15...': 'Nước hợp lệ duy nhất: Xe i8 sang f8 cản chân Mã.',
      '16': 'Xe b8 ăn Xe f8 (c8, d8, e8 đều trống). Chân Mã lại bị chặn – lần này bởi chính Xe Đỏ, và Xe sẽ "tránh đường" bằng một nước chiếu.',
      '16...': 'Sĩ d9 lên e8. Máy tính cho thấy Đen không còn cách chống: dù đi gì cũng bị chiếu bí chậm nhất sau 3 nước.',
      '17':
        '**Chiếu đôi.** Xe f8 lên ăn Sĩ f9: Xe chiếu Tướng, đồng thời chân Mã f8 được giải phóng nên Mã f7 cũng chiếu. Gặp chiếu đôi, Đen chỉ còn cách cho Tướng ăn Xe.',
      '17...': 'Tướng ăn Xe f9 – nước hợp lệ duy nhất.',
      '18':
        '**Chiếu bí.** Pháo h2 bình sang f2: qua ngòi Mã f7, Pháo chiếu Tướng f9. Ô f8 nằm trên đường Pháo, ô e9 bị Mã f7 khống chế; quân Đen nào ăn Mã f7 cũng chỉ thay Mã làm ngòi, và không quân nào chặn được vào cột f.',
    },
    keyMoments: ['10', '13...', '14', '17', '18'],
    lessons: [
      'Một Xe cắm sâu sát cung Tướng có thể chờ cả chục nước rồi mới phát huy – bên phòng thủ phải luôn tính tới nó.',
      'Mã giữ ô cạnh Tướng (Mã h8 giữ f9) biến một nước thí Xe thành đòn bắt buộc.',
      'Chiếu đôi: khi một quân vừa chiếu vừa "mở đường" cho quân khác chiếu, đối phương chỉ còn cách đi Tướng.',
      'Mã làm ngòi cho Pháo trên cùng cột với Tướng là hình chiếu bí kinh điển.',
      'Khi quân đối phương đã vây quanh cung Tướng, mỗi nước chậm (như Tốt c4 sang d4) đều có thể là nước thua.',
    ],
    tags: ['Cổ phổ', 'Thí quân', 'Tấn công Tướng', 'Chiến thuật', 'Ván ngắn'],
    source: 'https://www.xiangqiqipu.com/Category/View-8518.html',
  },

  // ------------------------------------------------------------------ 1600 · Tự xuất động: Oa tâm pháo
  {
    id: 'tu-xuat-dong-oa-tam-phao',
    title: 'Tự xuất động: Oa tâm pháo – hai Pháo trên cột giữa',
    red: 'Tự xuất động (bên Đỏ)',
    black: 'Tự xuất động (bên Đen)',
    event: 'Cổ phổ Tự xuất động lai vô địch thủ – loại chữ "Lai" (Oa tâm pháo), ván 1',
    year: 1600,
    result: '1-0',
    opening: 'Thuận pháo hoành xa (Oa tâm pháo) đối Sĩ giác pháo',
    difficulty: 3,
    context: `${TXD_CONTEXT}

Ván này là ván 1 của loại chữ "Lai" – "Oa tâm pháo" (窝心炮): Đỏ lùi Pháo đầu về ô e1, ngay giữa cung Tướng, rồi đưa Pháo thứ hai về giữa để hai Pháo chồng nhau trên cột e. Gần 12 nước đầu của ván trùng khớp với ván 8 phần "Đắc tiên" của Quất Trung Bí, chỉ đổi cánh trái – phải.`,
    summary: `Đỏ lùi Pháo đầu về tận e1 rồi đưa Pháo thứ hai về giữa: hai Pháo chồng nhau trên cột e. Đen dùng Sĩ giác pháo và cho Xe ăn Tốt g3; Đỏ đáp bằng **cấp tiến trung binh**, thí Tốt để mở trung lộ. Máy tính cho rằng tới nước 11 Đen vẫn nhỉnh hơn.

Nước lui Pháo f7 về f9 mở cột f cho Xe Đỏ lao xuống f7, rồi Mã Đỏ nhảy vào d5 đánh hai quân. Đen chọn cứu Mã c7 và bỏ mặc ô e7 – ô có hai Tượng giữ nhưng bị Mã, Xe và Pháo cùng nhắm. Ba lần ăn qua ăn lại trên e7, và lần cuối là Pháo sau nhảy qua Pháo trước **chiếu bí**: thế Pháo trùng kinh điển.`,
    moves:
      '1. P8-5 P2-5 2. M8.7 M2.3 3. X9.1 P8-6 4. X9-4 S6.5 5. P5/1 M8.7 6. P2-5 X9-8 7. M2.3 X8.6 8. B5.1 X8-7 9. M3.5 X1-2 10. B5.1 B5.1 11. Pt.3 P6/2 12. X4.6 M7/8 13. M5.6 X2.2 14. M6.5 T7.5 15. X4-5 T3.5 16. Ps.6',
    annotations: {
      '1': 'Pháo đầu: Pháo b2 về giữa.',
      '1...': '**Thuận pháo**: Đen cũng đưa Pháo b7 về giữa, cùng cánh với Pháo Đỏ.',
      '2': 'Mã b0 lên c2 giữ Tốt đầu.',
      '3': '**Hoành xa**: Xe a0 tiến một bước, chuẩn bị chạy ngang.',
      '3...': '**Sĩ giác pháo**: Pháo h7 bình sang f7, đứng ở "góc Sĩ" – cách đáp cẩn thận, giữ cung Tướng.',
      '4': 'Xe hoành bình sang cột f, nhắm thẳng Pháo f7.',
      '4...': 'Sĩ f9 lên e8 – vừa bổ Sĩ vừa bảo vệ Pháo f7.',
      '5':
        '**Oa tâm pháo**: Pháo đầu lùi về e1, ngay "tim" cung Tướng – tên của loại cờ này trong sách. Pháo e1 sẽ làm hậu phương cho Pháo thứ hai lên giữa. Máy tính thấy cách đánh hơi thụ động nhưng vẫn cân bằng.',
      '5...': 'Mã h9 lên g7.',
      '6': 'Pháo h2 về giữa e2: hai Pháo Đỏ chồng nhau trên cột e – Pháo trước e2, Pháo sau e1 – nhắm vào trung lộ.',
      '7...': 'Xe h9 lao xuống h3, uy hiếp hai Tốt g3 và i3.',
      '8':
        '**Cấp tiến trung binh**: Đỏ bỏ Tốt g3, đẩy Tốt đầu lên e4 để mở trung lộ cho hai Pháo. Theo máy tính, Đỏ mất một Tốt và Đen nhỉnh hơn khoảng 1 điểm; đưa Xe lên f5 (X4.5) thì cân bằng.',
      '8...': 'Xe h3 ăn Tốt g3.',
      '9': 'Mã g2 nhảy lên e3, ngay sau Tốt e4.',
      '10': 'Tốt e4 tiến tiếp lên e5, ép Đen đổi Tốt đầu.',
      '10...': 'Tốt e6 ăn Tốt e5. Cột e bắt đầu mở.',
      '11':
        'Pháo trước nhảy qua Mã e3 ăn Tốt e5. Pháo e5, Mã e3 và Pháo e1 của Đỏ cùng nằm trên cột e, đè vào Pháo e7 và cung Tướng Đen.',
      '11...':
        'Pháo f7 lui về f9. Máy tính coi đây là nước sai: cột f mở ra cho Xe Đỏ, và thế cờ lật sang Đỏ hơn. Tướng sang f9 (Tg5-6) giữ được thế tốt hơn.',
      '12': 'Xe f1 lao thẳng xuống f7, cùng lúc đánh Mã g7 (không có quân bảo vệ) và đè vào Pháo e7.',
      '12...': 'Mã g7 lui về h9 – theo máy tính là cách lui tốt nhất, nhưng Đỏ đã hơn khoảng 3 điểm.',
      '13': 'Mã e3 nhảy vào d5, đánh cả Pháo e7 lẫn Mã c7 (chân Mã d6 trống).',
      '13...':
        '**Sai lầm thua cờ**: Xe b9 xuống b7 giữ Mã c7, bỏ mặc Pháo e7. Ô e7 có hai Tượng giữ nhưng bị tới ba quân Đỏ nhắm: Mã d5, Xe f7 và Pháo e1 (qua ngòi Pháo e5). Máy tính cho rằng Đen phải nhảy Mã c7 lên e6 (M3.5) để chặn cột e.',
      '14': 'Mã d5 ăn Pháo e7 – mở màn chuỗi ăn qua ăn lại trên ô e7.',
      '14...': 'Tượng g9 ăn lại Mã.',
      '15': 'Xe f7 ăn Tượng e7! Xe được Pháo e1 bảo vệ qua ngòi Pháo e5.',
      '15...':
        'Tượng c9 ăn Xe – và bị chiếu bí ngay. Không ăn thì Xe e7 vẫn đè lên cung Tướng, Đen mất quân nặng (máy tính: Đỏ hơn trên 10 điểm).',
      '16':
        '**Pháo trùng chiếu bí.** Pháo sau e1 nhảy qua Pháo e5 ăn Tượng e7, chiếu Tướng qua ngòi Sĩ e8. Tướng không có ô chạy (d9 có Sĩ, f9 có Pháo nhà); Sĩ e8 rời chỗ thì Pháo e5 lại chiếu qua ngòi Pháo e7; không quân Đen nào ăn được Pháo e7. Hai Pháo trên cột giữa quyết định ván cờ, đúng như tên loại cờ.',
    },
    keyMoments: ['5', '8', '11...', '13...', '16'],
    lessons: [
      'Oa tâm pháo (lùi Pháo về tim cung) không phải để thủ: nó làm hậu phương cho hai Pháo chồng nhau trên cột giữa.',
      'Thí Tốt mở trung lộ (cấp tiến trung binh) là đổi vật chất lấy thế công – phải có quân sẵn sàng theo sau.',
      'Đếm quân tấn công và phòng thủ trên một ô: e7 có hai Tượng giữ nhưng bị Mã, Xe, Pháo nhắm – ba đánh hai thì mất.',
      'Pháo trùng (hai Pháo cùng cột) là hình chiếu bí kinh điển: ăn quân chắn hay dời quân làm ngòi đều không cứu được Tướng.',
    ],
    tags: ['Cổ phổ', 'Khai cuộc', 'Tấn công Tướng', 'Chiến thuật', 'Ván ngắn'],
    source: 'https://www.xiangqiqipu.com/Category/View-8392.html',
  },

  // ------------------------------------------------------------------ 1632 · Thuận pháo hoành xa thí Mã
  {
    id: 'quat-trung-bi-thuan-phao-thi-ma',
    title: 'Quất Trung Bí: Thuận pháo hoành xa, thí Mã phá trực xa',
    red: 'Quất Trung Bí (bên Đỏ)',
    black: 'Quất Trung Bí (bên Đen)',
    event: 'Cổ phổ Quất Trung Bí – phần "Đắc tiên" (được đi trước)',
    year: 1632,
    result: '1-0',
    opening: 'Thuận pháo hoành xa đối trực xa',
    difficulty: 2,
    context: `${QTB_CONTEXT}

Ván mẫu này là đường chính của cục "Thuận pháo hoành xa phá trực xa – thí Mã", một trong những bài kinh điển nhất của sách: Đỏ cố ý để Pháo Đen ăn Mã ở hàng đáy, đổi lấy mấy nhịp ra quân để mở cuộc tấn công Tướng.`,
    summary: `Hai bên cùng lên Pháo đầu cùng một cánh (Thuận pháo). Đỏ ra Xe ngang (hoành xa) sang lộ 6 rồi đột nhập hàng 8; khi Đen ra Mã biên, Đỏ **bỏ mặc Mã b0** để lên Xe thứ hai. Đen tham ăn Mã, rút Mã g7 về thủ – và chính nước rút ấy làm Tốt đầu mất bảo vệ.

Từ đó Đỏ đánh liên hoàn: Pháo đầu ăn Tốt chiếu, Xe thí ăn Sĩ, Xe thứ hai chiếu cột f, rồi **Pháo trùng (Trùng pháo)** trên cột giữa chiếu bí ở nước 13. Một bài học tuyệt vời về giá trị của nhịp đi (tiên thủ) so với một quân.`,
    moves:
      '1. P2-5 P8-5 2. M2.3 M8.7 3. X1.1 X9-8 4. X1-6 X8.6 5. X6.7 M2.1 6. X9.1 P2.7 7. P8.5 M7/8 8. P5.4 S6.5 9. X9-6 Tg5-6 10. Xt.1 S5/4 11. X6-4 P5-6 12. X4.6 Tg6-5 13. P8-5',
    annotations: {
      '1': 'Pháo đầu: Pháo phải về giữa, nhắm thẳng Tốt đầu e6 và cung Tướng Đen – nước mở màn được Quất Trung Bí đề cao nhất.',
      '1...':
        'Đen cũng đưa Pháo về giữa, cùng một cánh với Pháo Đỏ (đều từ cột h): đó là **Thuận pháo**. Hai bên đối công sòng phẳng, cùng nhắm vào Tốt đầu của nhau.',
      '2': 'Mã phải lên bảo vệ Tốt đầu e3, đồng thời mở đường cho Xe phải ra quân.',
      '2...': 'Đen cũng lên Mã giữ Tốt đầu e6 và dọn đường cho Xe.',
      '3': 'Hoành xa: Xe tiến một bước lên hàng 1 để có thể đi ngang sang cánh trái – cách ra Xe nhanh đặc trưng của Thuận pháo hoành xa.',
      '3...': 'Trực xa: Xe Đen ra cột h vừa được Pháo và Mã dọn trống. Thế "hoành xa đối trực xa" hình thành.',
      '4': 'Xe bình sang lộ 6 (cột d) – cột trống dẫn thẳng tới Sĩ d9 của Đen.',
      '4...': 'Xe Đen vượt sông xuống h3, uy hiếp Tốt g3 và gây sức ép lên cánh phải của Đỏ.',
      '5':
        'Xe đột nhập hàng 8, sát nách cung Đen: khống chế cả hàng 8 và rình bình sang c8 quấy Mã nếu Mã 2 của Đen nhảy lên c7.',
      '5...': 'Né Xe d8, Đen ra Mã biên (a7). Mã biên an toàn nhưng xa trung tâm, ít giúp được việc phòng thủ cung Tướng.',
      '6':
        'Nước then chốt của cục này: Xe trái lên một bước (hoành xa) và **bỏ mặc Mã b0**. Mã đó vốn chỉ được Xe a0 bảo vệ; giờ Pháo b7 có thể ăn qua ngòi Pháo b2. Đổi lại, Xe a1 sẵn sàng sang lộ 6 chỉ trong một nước.',
      '6...': 'Đen nhận thí: Pháo ăn Mã ở hàng đáy, hơn một quân. Nhưng Pháo b0 nằm lạc lõng, không tham gia phòng thủ.',
      '7':
        'Pháo trái tràn lên b7. Từ đây, qua ngòi là Pháo e7, nó nhắm thẳng Mã g7 – đồng thời sẵn sàng bình về giữa tạo thế Pháo trùng.',
      '7...':
        'Đen rút Mã về h9 để tránh bị bắt. Sai lầm! Mã g7 chính là quân giữ Tốt đầu e6. Máy tính hiện đại gợi ý rút Pháo về P2/2 để phòng thủ thì Đen vẫn đứng vững.',
      '8': 'Pháo đầu ăn Tốt e6 và **chiếu Tướng**: Tốt e3 làm ngòi để ăn, còn Pháo e7 của Đen trở thành ngòi để chiếu.',
      '8...': 'Đen chống Sĩ lên e8 che chiếu: giữa Pháo e6 và Tướng giờ có hai quân nên hết chiếu.',
      '9': 'Xe thứ hai bình sang lộ 6, chồng lên Xe d8 trên cùng một cột: hai Xe dồn sức đánh vào Sĩ d9.',
      '9...': 'Tướng né sang f9 để rời khỏi cột giữa nguy hiểm, nhưng cột f lại không có quân che.',
      '10': 'Thí Xe! Xe trước ăn Sĩ d9 và chiếu Tướng theo hàng 9 (ô e9 trống).',
      '10...':
        'Đen chỉ có hai cách: ăn Xe hoặc lên Tướng. Ăn Xe bằng Sĩ e8 thua nhanh nhất vì Sĩ rời e8 làm trống cột giữa; lên Tướng (Tg6.1) chống được lâu hơn nhưng Đỏ vẫn thắng lớn.',
      '11': 'Xe d1 bình sang cột f chiếu Tướng – cả cột f từ f2 đến f8 đều trống.',
      '11...': 'Nước duy nhất: Pháo e7 bình sang f7 che chiếu. Tướng không về e9 được vì Pháo e6 (ngòi là Pháo e7) đang khống chế ô đó.',
      '12': 'Xe ăn Pháo f7, tiếp tục chiếu. Khi Pháo e7 đã đi, cột giữa thông thoáng hẳn.',
      '12...': 'Tướng buộc phải về e9 – ô f8 đã bị Xe f7 khống chế.',
      '13':
        '**Pháo trùng chiếu bí!** Pháo b7 bình về e7 làm ngòi cho Pháo e6 chiếu Tướng. Tướng không lên e8 được (vẫn bị chiếu), ô d9 có Sĩ, ô f9 bị Xe f7 khống chế; Tượng ăn Pháo e7 cũng vô ích vì chính Tượng lại thành ngòi.',
    },
    keyMoments: ['6', '7...', '8', '10', '13'],
    lessons: [
      'Nhịp đi (tiên thủ) có thể đáng giá hơn một quân: Đỏ bỏ Mã để hai Xe ra trận trước, và cuộc tấn công đến trước khi Đen kịp dùng quân hơn.',
      'Trước khi rút một quân, hãy hỏi: "Quân này đang bảo vệ gì?" – Mã g7 rút đi là Tốt đầu e6 mất chỗ dựa.',
      'Pháo đầu ăn Tốt chiếu thường là tín hiệu tấn công: quân của đối phương đứng giữa Pháo và Tướng trở thành ngòi.',
      'Thế Pháo trùng: hai Pháo cùng cột, Pháo trước làm ngòi cho Pháo sau – ăn Pháo trước bằng quân khác cũng không hết chiếu.',
      'Cổ phổ là ván mẫu: bên thua đi những nước "tự nhiên mà sai". Khi học, hãy tự hỏi đâu là nước phòng thủ tốt hơn.',
    ],
    tags: ['Cổ phổ', 'Khai cuộc', 'Thí quân', 'Tấn công Tướng', 'Ván ngắn'],
    source: 'http://www.dpxq.com/hldcg/search/view_u_41677.html',
  },

  // ------------------------------------------------------------------ 1632 · Thuận pháo trực xa, Pháo tuần hà
  {
    id: 'quat-trung-bi-thuan-phao-tuan-ha',
    title: 'Quất Trung Bí: Thuận pháo trực xa, Pháo tuần hà phá hoành xa',
    red: 'Quất Trung Bí (bên Đỏ)',
    black: 'Quất Trung Bí (bên Đen)',
    event: 'Cổ phổ Quất Trung Bí – phần "Đắc tiên" (được đi trước)',
    year: 1632,
    result: '1-0',
    opening: 'Thuận pháo trực xa đối hoành xa',
    difficulty: 3,
    context: `${QTB_CONTEXT}

Cục này đổi vai so với ván "thí Mã": Đỏ ra Xe thẳng (trực xa), còn Đen dùng Xe ngang (hoành xa). Ý tưởng chính của Đỏ là đưa Pháo trái lên hàng tuần hà để Pháo có thể chạy ngang khắp bàn cờ.`,
    summary: `Đỏ đưa Xe qua sông ăn Tốt g6, Đen phản công bằng Xe xuống tận hàng 2. Đỏ không vội, dùng **Pháo tuần hà** chạy ngang: lúc dọa ăn Xe a9 qua ngòi Tốt, lúc tràn sang g4 dồn Mã g7. Mã Đỏ nhảy vào d5 bắt đôi hai Pháo, Pháo đầu ăn Tốt chiếu, rồi Pháo g4 xuống ăn Tượng g9.

Đòn kết thúc rất đẹp: Mã ăn Pháo e7, Xe ăn Sĩ f9, và Xe d8 xuống d9 chiếu bí – Sĩ e8 không thể ăn Xe vì nếu Sĩ rời e8, Mã e7 sẽ chiếu Tướng.`,
    moves:
      '1. P2-5 P8-5 2. M2.3 M8.7 3. X1-2 X9.1 4. X2.6 X9-4 5. X2-3 X4.6 6. P8.2 X4/2 7. P8-9 M2.1 8. B7.1 X4-3 9. T7.9 X3-2 10. M8.7 X2-6 11. X9-8 P2-3 12. M7.8 X6.2 13. M8.6 P3-4 14. P9-3 M7/9 15. P5.4 S4.5 16. X8.8 X1-2 17. X8-6 X2.2 18. P3.5 M9/7 19. X3.3 X6/6 20. M6.5 P4.2 21. X3-4 Tg5-6 22. X6.1',
    annotations: {
      '1': 'Pháo đầu, nhắm Tốt e6 và cung Tướng Đen.',
      '1...': 'Thuận pháo: Đen đáp Pháo đầu cùng cánh, chấp nhận đối công.',
      '2': 'Mã lên bảo vệ Tốt đầu e3 và dọn đường cho Xe phải.',
      '2...': 'Mã Đen lên g7 giữ Tốt đầu e6 (chân Mã ở f7 trống), đồng thời dọn trống góc h9 để Xe có đường ra quân.',
      '3': 'Trực xa: Xe ra ngay cột h đã trống, nhắm thẳng sang trận địa Đen.',
      '3...': 'Hoành xa: Xe Đen tiến một bước để chuẩn bị đi ngang sang cánh trái.',
      '4': 'Xe qua sông lên h6 – hàng Tốt của Đen – đe dọa ăn Tốt g6 đang không có quân bảo vệ.',
      '4...': 'Đen mặc Tốt g6, cho Xe chạy ngang sang lộ 4 (cột d) để phản công xuống trận địa Đỏ.',
      '5':
        'Xe ăn Tốt g6 và áp sát Mã g7. Mã g7 chưa mất ngay vì được Pháo b7 bảo vệ qua ngòi Pháo e7 – một kiểu bảo vệ "xuyên quân" rất hay gặp của Pháo.',
      '5...': 'Xe Đen lao xuống d2, đánh vào Pháo b2 không có quân giữ. (Pháo e2 thì an toàn vì cả hai Tượng đều bảo vệ.)',
      '6': 'Pháo trái lên hàng tuần hà b4: thoát khỏi Xe và từ đây có thể chạy ngang rất linh hoạt.',
      '6...': 'Xe lùi về hàng tuần hà của Đỏ (d4), lại nhắm Pháo b4 qua ô c4 trống.',
      '7':
        'Pháo né sang a4, được Tốt a3 bảo vệ – và lập tức có đòn: qua ngòi Tốt a6, Pháo a4 nhắm thẳng Xe a9 (a7, a8 đều trống)!',
      '7...': 'Đen buộc phải nhảy Mã ra a7 để chặn cột a: giờ có hai quân đứng giữa nên Pháo không ăn được Xe.',
      '8': 'Đỏ đẩy Tốt 7 lên sông, chấp nhận cho Xe ăn để lấy nhịp lên Tượng đuổi Xe.',
      '8...': 'Đen nhận Tốt: Xe d4 ăn sang c4, đè lên Pháo a4 (được Tốt a3 giữ) và nhìn xuống Tượng c0 dọc cột c. Nhưng Xe đứng ở c4 lại nằm trong tầm đuổi của Tượng.',
      '9': 'Tượng lên a2 đánh vào Xe c4 (mắt tượng b3 trống) – Đỏ lấy lại nhịp đi.',
      '9...': 'Xe tránh sang b4, đe Pháo a4 (được Tốt a3 giữ) và nhìn xuống Mã b0.',
      '10': 'Mã lên c2: vừa phát triển vừa đánh vào Xe b4 (chân Mã ở c3 đã trống).',
      '10...': 'Xe lại tránh sang f4, vẫn nhìn Pháo a4 và chuẩn bị xuống f2 quấy hàng 2 của Đỏ.',
      '11': 'Xe trái ra cột b, nhắm thẳng Pháo b7 đang không có quân bảo vệ.',
      '11...': 'Pháo né sang c7. Từ c7, nó vẫn giữ Mã g7 qua ngòi Pháo e7.',
      '12': 'Mã từ c2 nhảy lên b4, hướng tới ô d5 ở trung tâm.',
      '12...': 'Xe xuống f2 đánh Mã g2. Mã g2 lúc này không có quân giữ.',
      '13':
        'Đỏ mặc Mã g2, nhảy Mã vào d5 – **bắt đôi** hai Pháo c7 và e7. Pháo e7 được hai Tượng giữ, nhưng Pháo c7 thì không.',
      '13...':
        'Đen cứu Pháo c7 bằng cách bình sang d7 và vẫn chưa ăn Mã g2. Theo máy tính, đến đây Đỏ đã nắm ưu thế rõ rệt, kể cả khi Đen chọn ăn Mã g2.',
      '14':
        'Pháo tuần hà lại chạy ngang, từ a4 sang g4: qua ngòi Xe g6, nó đánh vào Mã g7. Mã g7 giờ bị hai quân tấn công mà chỉ có Pháo d7 bảo vệ.',
      '14...': 'Mã buộc phải lui về i8, bỏ trống cả cột g và trung tâm.',
      '15': 'Pháo đầu ăn Tốt e6 và **chiếu Tướng**, Pháo e7 của Đen làm ngòi.',
      '15...': 'Sĩ d9 lên e8 che chiếu: giữa Pháo e6 và Tướng giờ có hai quân (Pháo e7, Sĩ e8) nên Pháo hết chiếu.',
      '16': 'Xe trái xuống b8, áp sát hàng Sĩ của Đen.',
      '16...': 'Xe a9 bình sang b9 đuổi Xe b8 – Xe Đỏ ở b8 không có quân bảo vệ nên buộc phải rời đi.',
      '17': 'Xe bình sang d8, đánh vào Pháo d7 và đè lên Sĩ e8.',
      '17...': 'Xe xuống b7 giữ Pháo d7 theo hàng 7 – nhưng cánh phải bỏ trống. Thực ra Đen đã rất khó chống đỡ trước sức ép của Xe d8, Pháo e6 và Pháo g4.',
      '18': 'Pháo g4 ăn Tượng g9 và **chiếu Tướng** (ngòi là Sĩ f9), Xe g6 làm ngòi để Pháo vượt qua.',
      '18...': 'Nước duy nhất để thoát chiếu: Mã i8 lùi ăn Pháo g9. Nhưng khi Mã rời i8, cột g trống trơn trước Xe g6.',
      '19': 'Xe g6 ăn Mã g9 (g7, g8 đều trống), đứng ngay cạnh Sĩ f9 trên hàng đáy và chuẩn bị đòn thí Xe ăn Sĩ.',
      '19...': 'Xe f2 vội rút về f8 để giữ Sĩ f9 và hàng đáy.',
      '20':
        'Mã ăn Pháo e7! Tượng c9 không ăn lại được vì mắt tượng d8 bị Xe Đỏ chặn. Từ giờ Đen không còn cách nào tránh thua.',
      '20...': 'Đen hết cách chống đỡ; nước Pháo lên d5 chỉ giúp Đỏ kết thúc nhanh hơn.',
      '21': 'Xe ăn Sĩ f9 chiếu! Nếu Xe f8 ăn lại, Mã e7 nhảy g8 chiếu bí ngay.',
      '21...': 'Tướng ăn Xe f9 – cách còn lại là Xe f8 ăn Xe, nhưng khi đó Mã e7 nhảy g8 chiếu bí ngay. Ở f9, Tướng lại nằm trên hàng 9 mà Xe d8 sắp chiếu tới.',
      '22':
        '**Chiếu bí.** Xe xuống d9 chiếu theo hàng 9. Tướng không đi được: f8 có Xe nhà, e9 bị Xe khống chế. Sĩ e8 không thể ăn Xe vì nếu Sĩ rời e8, chân Mã e7 được giải phóng và Mã chiếu Tướng ngay.',
    },
    keyMoments: ['7', '13', '14', '18', '22'],
    lessons: [
      'Pháo tuần hà (Pháo đứng ở hàng sông của mình) rất linh hoạt: chỉ một nước chạy ngang là có thể đổi hướng tấn công từ cánh này sang cánh kia.',
      'Pháo có thể bảo vệ quân ở xa qua một ngòi – trước khi ăn quân, hãy kiểm tra xem có Pháo nào đang "giữ xuyên" không.',
      'Mã ở trung tâm (d5) dễ tạo đòn bắt đôi; ngược lại, quân phòng thủ cần được bảo vệ chắc chắn.',
      'Một quân cản chân Mã có thể bị "ghim": Sĩ e8 không dám rời chỗ vì sẽ mở đường cho Mã chiếu.',
    ],
    tags: ['Cổ phổ', 'Khai cuộc', 'Chiến thuật', 'Tấn công Tướng'],
    source: 'http://www.dpxq.com/hldcg/search/view_u_41681.html',
  },

  // ------------------------------------------------------------------ 1632 · Đại liệt thủ pháo
  {
    id: 'quat-trung-bi-liet-phao',
    title: 'Quất Trung Bí: Đại liệt thủ pháo – Pháo đáy và Song xe',
    red: 'Quất Trung Bí (bên Đỏ)',
    black: 'Quất Trung Bí (bên Đen)',
    event: 'Cổ phổ Quất Trung Bí – phần "Đắc tiên" (được đi trước)',
    year: 1632,
    result: '1-0',
    opening: 'Liệt pháo (Đại liệt thủ pháo)',
    difficulty: 2,
    context: `${QTB_CONTEXT}

Liệt pháo (còn gọi Nghịch pháo) là khi Đen đáp Pháo đầu bằng Pháo ở cánh ngược lại; "Đại liệt thủ pháo" là dạng đối công hăng nhất, hai bên ra quân gần như đối xứng. Quất Trung Bí dành hẳn một phần cho kiểu khai cuộc này.`,
    summary: `Hai bên ra quân gần như soi gương: Mã biên, Xe tuần hà, Tốt biên. Điểm khác biệt nằm ở **sự phối hợp**: Xe tuần hà h4 của Đỏ che chở cho Mã nhảy vào b4 rồi d5, đổi được Mã và mở đường cho Pháo trái xuống tận b9 làm **Pháo đáy**.

Pháo đầu ăn Tốt e6, Xe xuống b8, rồi Đỏ thí Xe ăn Sĩ e8, dùng Xe còn lại ăn Sĩ d9 và Xe Đen. Ở thế cuối, Pháo đáy b9 qua ngòi Tượng c9 giữ ô f9 cho Xe chiếu bí.`,
    moves:
      '1. P2-5 P2-5 2. M2.3 M8.9 3. X1-2 X9-8 4. M8.9 M2.3 5. X9-8 X1-2 6. B9.1 B9.1 7. X2.4 X2.4 8. M9.8 X2-6 9. X2-6 M9.8 10. M8.6 B3.1 11. M6.7 P8-3 12. P8.7 S6.5 13. P5.4 Tg5-6 14. X8.8 X8.1 15. X8-5 X8-5 16. X6.5 X5/1 17. X6-5 Tg6.1 18. X5-4',
    annotations: {
      '1': 'Pháo đầu: Pháo phải về giữa, nhắm Tốt e6 (Tốt này chưa có quân giữ) và cả cung Tướng Đen.',
      '1...': '**Liệt pháo**: Đen đưa Pháo cánh phải (cột b) về giữa – ngược chiều với Pháo Đỏ. Hai Pháo đầu đối mặt nhau trên cột e.',
      '2': 'Mã lên giữ Tốt đầu và mở đường cho Xe phải.',
      '2...': 'Đen chọn Mã biên i7. Mã biên không che được Tốt đầu e6 như Mã g7, nhưng mở cột h cho Xe.',
      '3': 'Xe ra cột h, nhắm thẳng Pháo h7 đang không có quân bảo vệ.',
      '3...': 'Xe Đen ra h9 bảo vệ Pháo h7 và đối diện Xe Đỏ.',
      '4': 'Đỏ cũng lên Mã biên a2, chuẩn bị ra Xe trái.',
      '4...': 'Mã trái của Đen lên c7, phát triển quân và nhường đường để Xe trái có thể ra cột b ở nước sau.',
      '5': 'Xe trái ra cột b. Cả hai Xe Đỏ đã rời góc.',
      '5...': 'Đen ra nốt Xe trái sang b9 – thế trận gần như đối xứng.',
      '6': 'Tốt biên tiến lên a4 để mở chân cho Mã a2 (ô a3 trống, Mã có thể nhảy b4).',
      '6...': 'Đen làm tương tự: Tốt i5 mở chân cho Mã i7 nhảy h5.',
      '7': 'Xe tuần hà: Xe lên h4, khống chế cả hàng sông, đặc biệt là ô h5 (Mã i7 khó nhảy lên) và ô b4.',
      '7...': 'Đen cũng đưa Xe lên b5, chặn ngay ô b4 trước mặt Mã a2.',
      '8': 'Mã vẫn nhảy b4! Mã bị Xe b5 đánh nhưng được Xe tuần hà h4 bảo vệ theo hàng 4 – sự phối hợp đầu tiên của Đỏ.',
      '8...': 'Xe Đen chuyển sang f5, khống chế ô d5 để Mã b4 không nhảy tiếp vào trung tâm.',
      '9': 'Xe tuần hà lại chạy ngang sang d4: giữ ô d5 cho Mã và nhìn thẳng Sĩ d9 dọc cột d.',
      '9...': 'Mã i7 nhảy lên h5 (chân i6 đã trống), uy hiếp Tốt g3.',
      '10': 'Mã nhảy vào d5, được Xe d4 bảo vệ, đánh vào cả Mã c7 lẫn Pháo e7.',
      '10...': 'Đen đẩy Tốt c5 để Mã c7 có đường nhảy đối diện Mã d5 (chân c6 trống).',
      '11': 'Đỏ đổi Mã trước: Mã d5 ăn Mã c7. Sau khi Pháo h7 ăn lại, Pháo Đen phải đứng lệch ở c7, còn cột b của Đỏ thông thoáng để Pháo trái lao xuống b9.',
      '11...': 'Pháo h7 ăn lại Mã qua ngòi là Pháo e7 của chính mình.',
      '12':
        '**Pháo đáy (Trầm để pháo)**: Pháo trái lao xuống b9, cột b đã trống. Qua ngòi Tượng c9, Pháo nhắm Sĩ d9 – Tượng c9 không dám rời chỗ.',
      '12...': 'Đen lên Sĩ e8 để thêm quân bảo vệ Sĩ d9 – Sĩ này đang bị cả Xe d4 (dọc cột d) lẫn Pháo đáy b9 (qua ngòi Tượng c9) nhắm tới.',
      '13': 'Pháo đầu ăn Tốt e6. Giữa Pháo và Tướng chỉ còn Pháo e7 và Sĩ e8 – cột giữa rất căng.',
      '13...': 'Tướng né sang f9, tránh khỏi cột giữa đang bị Pháo e6 rình rập.',
      '14': 'Xe b0 xuống thẳng b8 (cột b đã trống sau khi Pháo xuống đáy), đánh vào Sĩ e8 theo hàng 8.',
      '14...':
        'Xe h9 tiến xuống h8 để giữ Sĩ e8 theo hàng 8 – sai lầm dẫn tới thua ngay. Máy tính hiện đại chỉ ra Đen nên phản kích, chẳng hạn Pháo e7 nhảy qua Pháo e6 ăn Tốt e3.',
      '15': 'Thí Xe! Xe b8 ăn Sĩ e8, đồng thời đánh luôn Xe h8 theo hàng 8 (Xe h8 không có quân giữ) – Đen gần như buộc phải ăn lại.',
      '15...': 'Xe h8 ăn lại Xe e8. Nhưng giờ Sĩ d9 không còn quân nào bảo vệ, trong khi cả Xe d4 lẫn Pháo đáy b9 đều đang nhắm vào nó.',
      '16': 'Xe d4 xuống ăn Sĩ d9 và **chiếu Tướng** theo hàng 9 (e9 trống).',
      '16...': 'Xe e8 lùi về e9 chặn chiếu. Xe Đen đối mặt Xe d9, nhưng Xe Đỏ được Pháo đáy b9 bảo vệ qua ngòi Tượng c9 nên Đen không ăn được.',
      '17': 'Xe d9 ăn Xe e9 và tiếp tục chiếu Tướng f9 theo hàng 9. Tính ra Đỏ đã đổi một Xe lấy Xe và hai Sĩ của Đen.',
      '17...': 'Nước duy nhất: Tướng lên f8. Tướng không ăn được Xe e9 vì Xe được Pháo e6 (qua ngòi Pháo e7) và Pháo b9 (qua ngòi Tượng c9) cùng bảo vệ.',
      '18':
        '**Chiếu bí.** Xe sang f9 chiếu. Tướng không ăn Xe được vì Pháo đáy b9 (ngòi là Tượng c9) bảo vệ f9; ô e8 bị Pháo e6 khống chế qua ngòi Pháo e7; ô f7 vẫn nằm trên đường Xe f9.',
    },
    keyMoments: ['8', '12', '14...', '15', '18'],
    lessons: [
      'Trong thế đối xứng, bên nào phối hợp quân tốt hơn sẽ chiếm ưu thế: Xe tuần hà của Đỏ vừa che chở Mã, vừa giữ ô trung tâm.',
      'Pháo đáy (Pháo xuống hàng cuối của đối phương) làm "ghim" quân và giữ các ô hàng đáy – rất mạnh khi phối hợp với Xe.',
      'Song xe tấn công cung Tướng: thí một Xe ăn Sĩ để Xe còn lại xuyên qua là mô típ kinh điển.',
      'Khi phòng thủ, đừng chỉ giữ – hãy tìm nước phản kích tạo đe dọa ngược lại đối phương.',
    ],
    tags: ['Cổ phổ', 'Khai cuộc', 'Tấn công Tướng', 'Thí quân', 'Ván ngắn'],
    source: 'http://www.dpxq.com/hldcg/search/view_u_41670.html',
  },

  // ------------------------------------------------------------------ 1632 · Bình phong mã phá Pháo đầu
  {
    id: 'quat-trung-bi-binh-phong-ma',
    title: 'Quất Trung Bí: Bình phong mã phá Pháo đầu',
    red: 'Quất Trung Bí (bên Đỏ)',
    black: 'Quất Trung Bí (bên Đen)',
    event: 'Cổ phổ Quất Trung Bí – phần "Đắc tiên" (được đi trước)',
    year: 1632,
    result: '1-0',
    opening: 'Khởi mã cục – Bình phong mã đối Pháo đầu',
    difficulty: 3,
    context: `${QTB_CONTEXT}

Ở cục này, bên đi trước lại không lên Pháo đầu mà dựng **Bình phong mã** (hai Mã cùng lên che Tốt đầu), để Đen lên Pháo đầu. Về sau, Bình phong mã chống Pháo đầu trở thành hệ thống phòng thủ phổ biến nhất của cờ tướng hiện đại.`,
    summary: `Đỏ khởi Mã, Đen lên Pháo đầu, Đỏ dựng Bình phong mã. Xe Đen vượt sông rồi bình sang g3 đánh Mã g2 – con Mã không còn đường chạy. Thay vì cứu Mã, Đỏ phản công bằng một nước thí rất "cổ phổ": **Pháo lao xuống h9** để kéo Mã g7 rời vị trí.

Máy tính hiện đại cho thấy nước thí này không hoàn toàn chính xác, và Đen từng có lúc hơn quân. Nhưng Đen phòng thủ thụ động: Pháo Đỏ ăn Tốt, hai Xe chồng cột d, rồi Pháo ăn Sĩ e8 phá tan cung Tướng. Ván mẫu khép lại khi Đỏ chắc chắn chiếu bí sau hai nước.`,
    moves:
      '1. M2.3 P8-5 2. M8.7 M8.7 3. B3.1 X9-8 4. X1-2 X8.6 5. T7.5 B3.1 6. S6.5 P2-3 7. X9-6 X8-7 8. P2.7 M7/8 9. X2.9 X7.1 10. P8.4 B7.1 11. P8-1 T7.9 12. X6.8 M2.1 13. X2/3 B5.1 14. X2-6 S6.5 15. P1-5 Tg5-6 16. P5.2 S4.5 17. Xt-5',
    annotations: {
      '1': '**Khởi mã cục**: Đỏ mở màn bằng Mã thay vì Pháo đầu – kín đáo, linh hoạt, chờ xem Đen bày trận gì.',
      '1...': 'Đen chớp lấy thế chủ động, lên Pháo đầu nhắm Tốt e3.',
      '2': 'Mã thứ hai lên c2: hai Mã cùng che Tốt đầu – hình thành **Bình phong mã**.',
      '2...': 'Mã Đen lên g7: phát triển quân, giữ Tốt đầu e6 và dọn góc h9 để Xe trái ra quân ở nước sau.',
      '3': 'Tốt 3 tiến lên g4, mở chân cho Mã g2 (ô g3 trống) và giành thêm không gian ở cánh phải.',
      '3...': 'Xe Đen ra cột h, nhắm thẳng Pháo h2 đang không có quân bảo vệ – Đỏ phải đáp lại bằng cách ra Xe giữ Pháo.',
      '4': 'Xe Đỏ cũng ra cột h, nhưng còn bị Pháo h2 của chính mình chặn phía trước.',
      '4...': 'Xe Đen vượt sông xuống h3, uy hiếp Tốt i3 và đè lên Tốt đầu e3 theo hàng 3.',
      '5': 'Tượng lên giữa (e2): củng cố trung tâm và bảo vệ Tốt g4.',
      '5...': 'Tốt 3 tiến lên c5, chuẩn bị cho Pháo b7 bình sang c7 nhắm Tốt c3 qua ngòi chính Tốt này.',
      '6': 'Sĩ lên e1, nhường ô d0 để Xe trái có thể ra quân theo hàng đáy.',
      '6...': 'Pháo bình sang c7, qua ngòi Tốt c5 nhắm vào Tốt c3 của Đỏ.',
      '7': 'Xe trái ra lộ 6 qua ô d0 vừa được Sĩ nhường.',
      '7...':
        'Xe h3 bình sang g3 đánh Mã g2. Mã g2 không còn đường nào để chạy – mọi ngả đều bị cản chân – và cũng không có quân bảo vệ.',
      '8':
        'Không cứu được Mã, Đỏ phản công: Pháo lao xuống h9, qua ngòi Tượng g9 nhắm Sĩ f9. Nếu Mã g7 ăn Pháo, Xe h0 sẽ ăn lại Mã trên hàng đáy và Tốt đầu e6 mất một quân giữ. Máy tính hiện đại đánh giá nước thí này không hoàn toàn chính xác.',
      '8...': 'Mã g7 lùi ăn Pháo h9, nhận quân Đỏ thí. Mã rời g7 nên Tốt đầu e6 mất một quân giữ, và Xe h0 sẽ ăn lại Mã ngay trên hàng đáy.',
      '9': 'Xe ăn lại Mã ở h9, đứng sâu trong hàng đáy của Đen.',
      '9...': 'Xe g3 ăn Mã g2. Sau loạt đổi quân, Đen hơn Đỏ một Pháo.',
      '10': 'Pháo trái lên b6 (hàng Tốt của Đen). Qua ngòi Tốt e6, Pháo nhắm vào Tốt g6.',
      '10...': 'Tốt g6 tiến lên g5 để tránh Pháo b6 (đang nhắm g6 qua ngòi Tốt e6). Nhưng Tốt i6 vẫn nằm trong tầm ngắm của Pháo b6.',
      '11': 'Pháo ăn Tốt i6 – vẫn dùng Tốt e6 làm ngòi. Đỏ bắt đầu gỡ lại vật chất.',
      '11...': 'Tượng lên biên i7 chặn cột i, không cho Pháo i6 trồi xuống hàng đáy phối hợp với Xe h9.',
      '12': 'Xe d0 xuống thẳng d8, ép Sĩ d9; Xe h9 cũng đang nhìn Sĩ f9 theo hàng 9.',
      '12...': 'Mã trái ra biên a7 để phát triển, nhưng Mã biên ở quá xa, không giúp được cung Tướng đang bị Xe d8 và Xe h9 cùng đè ép.',
      '13': 'Xe h9 lùi về h6, nhắm Tốt e6 theo hàng 6.',
      '13...': 'Tốt đầu tiến lên e5 để tránh Xe h6, nhưng cũng vì thế mà hàng 6 thông thoáng: Tốt a6 giờ bị cả Xe h6 lẫn Pháo i6 nhắm tới.',
      '14': 'Xe bình sang d6, chồng lên Xe d8: hai Xe cùng cột dồn ép cánh Sĩ.',
      '14...': 'Đen lên Sĩ e8 để Sĩ d9 có thêm quân bảo vệ trước hai Xe Đỏ đang chồng nhau trên cột d.',
      '15': 'Pháo i6 bình về giữa e6: qua ngòi Pháo e7, Pháo nhắm thẳng Sĩ e8. Thế cờ lật ngược hẳn.',
      '15...': 'Tướng né sang f9 để rời cột giữa, nơi Pháo e6 nhắm Sĩ e8 qua ngòi Pháo e7. Nhưng Tướng rời e9 thì Sĩ e8 mất một quân bảo vệ.',
      '16': 'Thí Pháo! Pháo e6 nhảy qua Pháo e7 ăn Sĩ e8 để phá cung; nếu Sĩ d9 ăn lại, Xe d8 sẽ ăn tiếp quân ở e8.',
      '16...': 'Sĩ d9 ăn Pháo – thua nhanh nhất. Bình Pháo e7 sang g7 hoặc h7 chống được lâu hơn.',
      '17':
        'Xe d8 ăn nốt Sĩ e8. Cung Tướng Đen trống trơn: Đỏ dọa Xe d6 bình sang f6 chiếu, và Đen không thể tránh bị chiếu bí sau hai nước.',
    },
    keyMoments: ['7...', '8', '11', '15', '16'],
    lessons: [
      'Bình phong mã: hai Mã cùng che Tốt đầu là cách phòng thủ Pháo đầu vững chắc, nền tảng của nhiều hệ thống hiện đại.',
      'Một quân bị "nhốt" (không còn đường chạy) là mục tiêu dễ bị tấn công – hãy luôn để quân của mình có lối thoát.',
      'Hơn quân mà phòng thủ thụ động vẫn có thể thua: bên kém quân lấy lại được thế chủ động thì sức tấn công bù lại vật chất.',
      'Không phải nước nào trong cổ phổ cũng đúng theo máy tính hiện đại – hãy học ý tưởng, đồng thời biết hoài nghi.',
    ],
    tags: ['Cổ phổ', 'Khai cuộc', 'Phòng thủ', 'Thí quân', 'Tấn công Tướng'],
    source: 'http://www.dpxq.com/hldcg/search/view_u_41672.html',
  },

  // ------------------------------------------------------------------ 1632 · Quất Trung Bí: Nhượng tiên, thí Mã
  {
    id: 'quat-trung-bi-nhuong-tien-thi-ma',
    title: 'Quất Trung Bí: Nhượng tiên – hoành xa thí Mã, thí Xe chiếu bí',
    red: 'Quất Trung Bí (bên Đỏ)',
    black: 'Quất Trung Bí (bên Đen)',
    event: 'Cổ phổ Quất Trung Bí – phần "Nhượng tiên" (đi sau), ván 2',
    year: 1632,
    result: '0-1',
    opening: 'Thuận pháo trực xa đối hoành xa',
    difficulty: 3,
    context: `${QTB_TOAN_CUC_CONTEXT}

Ván này là ván 2 của phần "Nhượng tiên", tên gốc "顺炮横车破直车弃马": Đen dùng Thuận pháo hoành xa phá trực xa bằng một nước thí Mã – hình ảnh soi gương của ván "thí Mã" nổi tiếng trong phần Đắc tiên, nhưng lần này người thí quân là bên đi sau.`,
    summary: `Hai bên Thuận pháo: Đỏ trực xa, Đen hoành xa. Đen cho Xe thọc xuống tận hàng 1 của Đỏ, rồi **bỏ mặc Mã b9** để lấy nhịp. Đỏ ăn liền hai Mã, và máy tính cho rằng lúc ấy Đỏ hơn rõ. Nhưng hai Xe, hai Pháo Đen đã áp sát: Pháo ăn Mã g2, Pháo đầu ăn Tốt chiếu, Xe đuổi Tượng, Xe đuổi Xe Đỏ khỏi hàng đáy.

Ở nước 14, Đỏ ra Xe trái thay vì rút Pháo về thủ – và hàng đáy sụp đổ: Pháo xuống h0 chiếu, Xe xuống h0 chiếu, rồi Đen **thí nốt một Xe** để kéo Tướng Đỏ lên e1. Xe còn lại lùi một bước chiếu bí, trong khi Pháo ở góc i0 khóa cả hàng đáy. Đen kém Xe, Pháo, Mã mà vẫn thắng.`,
    moves:
      '1. P2-5 P8-5 2. M2.3 M8.7 3. X1-2 X9.1 4. X2.6 X9-4 5. X2-3 X4.7 6. M8.9 X1.1 7. P8.7 P2.5 8. X3.1 P2-7 9. X3-2 X4-7 10. T3.1 P5.4 11. S4.5 X7-9 12. X2/7 X1-8 13. X2-4 P7-8 14. X9-8 P8.2 15. X4.3 P8-9 16. X4-5 X8.8 17. S5/4 X9-5 18. Tg5.1 X8/1',
    annotations: {
      '1': 'Pháo đầu: Pháo h2 về giữa. Ở phần "Nhượng tiên", bên đi trước là đối thủ, còn tác giả cầm quân Đen.',
      '1...': '**Thuận pháo**: Đen cũng đưa Pháo h7 về giữa – cùng một cánh với Pháo Đỏ.',
      '3': '**Trực xa**: Xe i0 ra thẳng cột h.',
      '3...': '**Hoành xa**: Xe i9 tiến một bước, chuẩn bị chạy ngang.',
      '4': 'Xe qua hà lên h6, đe dọa Tốt g6 đang không có quân bảo vệ.',
      '4...': 'Đen mặc Tốt, cho Xe hoành bình sang cột d.',
      '5': 'Xe ăn Tốt g6, áp sát Mã g7. Mã g7 vẫn an toàn nhờ Pháo b7 bảo vệ xuyên qua ngòi Pháo e7.',
      '5...': 'Xe d8 thọc thẳng xuống d1, ngay sau lưng hàng quân Đỏ.',
      '6': 'Đỏ ra Mã biên a2. Lời bình bổ sung trong nguồn cho rằng lên Mã chính (M8.7) tốt hơn; máy tính lại đánh giá hai nước gần như ngang nhau.',
      '6...':
        '**Thí Mã!** Xe a9 lên a8, bỏ mặc Mã b9: Pháo b2 có thể nhảy qua Pháo b7 ăn Mã. Đen đổi một Mã lấy nhịp ra quân. Máy tính hiện đại cho rằng nước thí này không đúng – sau khi ăn Mã, Đỏ hơn khoảng 3,5 điểm.',
      '7': 'Pháo b2 nhảy qua Pháo b7 ăn Mã b9. Đỏ hơn một Mã.',
      '7...': 'Pháo b7 lao xuống b2: qua ngòi Pháo e2, nó đe dọa ăn Mã g2.',
      '8': 'Xe g6 ăn luôn Mã g7 – Pháo b7 đã đi nên Mã g7 không còn được bảo vệ. Máy tính chuộng Pháo đầu ăn Tốt e6 chiếu (P5.4) hơn, nhưng Đỏ vẫn hơn hẳn.',
      '8...': 'Pháo b2 nhảy qua Pháo e2 ăn Mã g2. Đen gỡ lại một Mã.',
      '9': 'Xe g7 sang h7, nhắm Pháo e7 (được hai Tượng giữ) và giữ đường lui theo cột h.',
      '9...': 'Xe d1 sang g1, vừa giữ Pháo g2 vừa dọa ăn Tượng g0.',
      '10': 'Tượng g0 tránh lên i2.',
      '10...': 'Pháo đầu ăn Tốt e3 và **chiếu Tướng** (ngòi là Pháo e2).',
      '11': 'Sĩ f0 lên e1 che chiếu.',
      '11...': 'Xe g1 sang i1, lại đuổi Tượng i2.',
      '12': 'Xe h7 lùi hẳn về h0 giữ hàng đáy.',
      '12...': 'Xe a8 sang h8, đối mặt Xe h0 trên cột h trống – Xe Đỏ không có quân bảo vệ nên phải rời hàng đáy.',
      '13': 'Xe h0 né sang f0.',
      '13...': 'Pháo g2 sang h2, chuẩn bị xuống h0 chiếu.',
      '14':
        '**Sai lầm quyết định.** Xe a0 ra b0 trông như phát triển quân bình thường. Máy tính chỉ ra Đỏ cần rút Pháo b9 về b3 (P8/6) để phòng thủ, khi đó vẫn hơn khoảng 2,5 điểm; sau nước này, đòn công của Đen thành công.',
      '14...': 'Pháo h2 xuống h0 **chiếu Tướng**, ngòi là Xe f0.',
      '15': 'Xe f0 lên f3 bỏ ngòi – theo máy tính là cách tốt nhất, nhưng không còn đủ.',
      '15...':
        'Pháo h0 lùi sang góc i0, nhường cột h cho Xe h8. Từ đây Đen có chiếu bí bắt buộc: máy tính tính ra Đỏ chống thế nào cũng bị chiếu bí chậm nhất sau 6 nước.',
      '16': 'Đỏ ăn Pháo e3, nhưng chỉ khiến kết thúc đến nhanh hơn.',
      '16...': 'Xe h8 xuống h0 **chiếu Tướng** dọc hàng đáy.',
      '17': 'Đỏ chỉ có hai cách chặn: Sĩ e1 về f0 hoặc Tượng i2 về g0. Đỏ chọn lùi Sĩ – vô tình đặt sẵn một ngòi cho Pháo i0.',
      '17...':
        '**Thí Xe!** Xe i1 sang e1 chiếu Tướng, kéo Tướng Đỏ lên e1. Nếu Sĩ d0 ăn Xe thay, Xe h0 lùi h1 cũng chiếu bí, vì Pháo i0 khi đó chiếu thẳng qua ngòi Sĩ f0.',
      '18': 'Tướng ăn Xe e1.',
      '18...':
        '**Chiếu bí.** Xe h0 lùi về h1 chiếu Tướng theo hàng 1. Tướng không xuống e0 hay sang d0 được vì Pháo i0 – đường vừa mở khi Xe rời h0 – khống chế hàng đáy qua ngòi Sĩ f0; f1, d1 đều nằm trên đường Xe; e2 có Pháo nhà. Đen kém một Xe, một Pháo và một Mã mà vẫn thắng.',
    },
    keyMoments: ['6...', '14', '15...', '17...', '18...'],
    lessons: [
      'Thí quân lấy nhịp chỉ đúng khi đòn tấn công thật sự tới; ở đây máy tính cho rằng Đỏ giữ được nếu phòng thủ chính xác.',
      'Khi đang hơn quân, việc đầu tiên là đưa quân về giữ nhà – một nước ra quân "cho đủ" như X9-8 có thể là nước thua.',
      'Hai Xe, hai Pháo cùng đánh dọc hàng đáy rất nguy hiểm: mỗi lần chặn chiếu lại tạo thêm một ngòi mới.',
      'Thí Xe để kéo Tướng ra ô xấu là mô típ chiếu bí kinh điển; hãy tìm nước chiếu buộc Tướng phải ăn quân.',
      'Một quân rời chỗ có thể mở đường cho Pháo phía sau: Xe h0 lùi một bước vừa chiếu vừa "thả" Pháo i0.',
    ],
    tags: ['Cổ phổ', 'Thí quân', 'Tấn công Tướng', 'Chiến thuật'],
    source: 'https://www.xiangqiqipu.com/Category/View-8014.html',
  },

  // ------------------------------------------------------------------ 1632 · Quất Trung Bí: Pháo đáy bắt đôi hai Xe
  {
    id: 'quat-trung-bi-hoanh-xa-pha-tuong-cuc',
    title: 'Quất Trung Bí: Hoành xa phá Tượng cục – Pháo đáy bắt đôi hai Xe',
    red: 'Quất Trung Bí (bên Đỏ)',
    black: 'Quất Trung Bí (bên Đen)',
    event: 'Cổ phổ Quất Trung Bí – phần "Đắc tiên" (được đi trước), ván 15',
    year: 1632,
    result: '1-0',
    opening: 'Pháo đầu hoành xa đối Tượng cục (Đen lên Tượng, Mã góc Sĩ)',
    difficulty: 2,
    context: `${QTB_TOAN_CUC_CONTEXT}

Ván này là ván 15 của phần "Đắc tiên", tên gốc "右炮横車破缠角马象局": Pháo phải và Xe ngang phá thế "Tượng cục – Triền giác mã" của Đen (lên Tượng che Tốt đầu rồi nhảy Mã vào góc Sĩ). Chỉ 8 nước, nhưng là một bài học khai cuộc rất rõ ràng.`,
    summary: `Đen đáp Pháo đầu bằng lên Tượng và nhảy Mã vào góc Sĩ d8 – một cách bày trận kín nhưng chậm. Đỏ ra Xe ngang rồi lao Xe xuống tận f8. Đen nhảy Mã lên f7 cắt đường lui của Xe, nhưng chính con Mã ấy rời d8 làm Tốt đầu mất chỗ dựa: Pháo đầu ăn Tốt chiếu.

Đỏ đặt tiếp Pháo thứ hai sau Xe trên cột f. Chỉ cần Mã f7 rời chỗ là có đòn – và Đen đã nhảy Mã đi. Pháo f2 nhảy qua Xe xuống f9 ăn Sĩ, cùng lúc nhắm hai Xe Đen ở hai đầu hàng đáy: một qua ngòi Tượng g9, một qua ngòi là chính Tướng Đen. **Đỏ chắc chắn được một Xe** chỉ sau 8 nước.`,
    moves: '1. P2-5 T3.5 2. M2.3 M2.4 3. X1.1 M8.9 4. X1-4 X9-8 5. X4.7 M4.6 6. P5.4 S4.5 7. P8-4 M6.7 8. P4.7',
    annotations: {
      '1': 'Pháo đầu: Pháo h2 về giữa.',
      '1...': '**Tượng cục**: Đen đáp Pháo đầu bằng Tượng c9 lên e7, dùng Tượng che Tốt đầu.',
      '2': 'Mã h0 lên g2.',
      '2...': '**Triền giác mã**: Mã b9 nhảy lên d8, sát góc Sĩ – vừa giữ Tốt đầu e6 vừa che cung Tướng, nhưng Mã ở góc thì chậm ra trận.',
      '3': '**Hoành xa**: Xe i0 tiến một bước, chuẩn bị chạy ngang.',
      '3...': 'Mã h9 ra biên i7, mở đường cho Xe i9.',
      '4': 'Xe hoành bình sang cột f. Lời bình bổ sung trong nguồn: nếu bình sang cột d (X1-6) thì lại đúng ý Đen.',
      '4...': 'Xe i9 ra h9.',
      '5':
        'Xe lao thẳng xuống f8, sát nách Sĩ f9 – cột f từ f2 tới f7 đều trống. Lời bình bổ sung trong nguồn chê nước này hơi vội (lên Mã c2 tốt hơn); máy tính lại thấy hai nước ngang nhau.',
      '5...':
        'Mã d8 nhảy lên f7, cắt đường lui của Xe f8 theo cột f. Lời bình bổ sung trong nguồn gọi đây là nước kém, nên lên Sĩ d9 về e8; máy tính đồng ý – sau nước này Đỏ hơn khoảng 1,5 điểm.',
      '6': 'Pháo đầu ăn Tốt e6 và **chiếu Tướng** (ngòi là Tượng e7). Tốt e6 mất chỗ dựa vì Mã d8 vừa rời đi.',
      '6...': 'Sĩ d9 lên e8 che chiếu. Theo cả lời bình bổ sung trong nguồn lẫn máy tính, lên Sĩ bên kia (Sĩ f9 về e8) mới đúng.',
      '7':
        'Pháo b2 bình sang f2, xếp sau Xe f8 trên cột f. Giữa Pháo và Xe lúc này chỉ có Mã f7 của Đen: nếu Mã rời đi, Pháo sẽ nhảy qua Xe xuống f9.',
      '7...':
        '**Sai lầm thua cờ**: Mã f7 nhảy ra g5 đánh Pháo e6 – nước trông rất tự nhiên, nhưng cột f mở ra. Máy tính cho rằng Tướng sang d9 (Tg5-4) mới giữ được thế.',
      '8':
        '**Pháo nhảy qua Xe f8 ăn Sĩ f9 – bắt đôi hai Xe.** Từ f9, qua ngòi Tượng g9, Pháo nhắm Xe h9; qua ngòi là chính Tướng e9, Pháo nhắm Xe a9 (d9, c9, b9 đều đã trống). Đen không thể cứu cả hai Xe – nguồn kết luận "chắc chắn được một Xe", máy tính đánh giá Đỏ hơn khoảng 7 điểm.',
    },
    keyMoments: ['5...', '6', '7', '7...', '8'],
    lessons: [
      'Mỗi quân phòng thủ thường gánh một việc: Mã d8 rời đi là Tốt đầu e6 mất chỗ dựa.',
      'Xe đột nhập sát cung Tướng cộng với Pháo đứng sau trên cùng cột là một "nòng súng" chỉ chờ ngòi mở.',
      'Pháo có thể bắt đôi theo hai hướng với hai ngòi khác nhau – kể cả Tướng đối phương cũng làm ngòi được.',
      'Tượng cục và Mã góc Sĩ là thế thủ chặt nhưng chậm; khi đối phương ra Xe nhanh, phải bổ Sĩ đúng bên.',
    ],
    tags: ['Cổ phổ', 'Khai cuộc', 'Chiến thuật', 'Ván ngắn'],
    source: 'https://www.xiangqiqipu.com/Category/View-8112.html',
  },

  // ------------------------------------------------------------------ 1700 · Mai Hoa Phổ: Bình phong mã phá Xe tuần hà
  {
    id: 'mai-hoa-pho-binh-phong-ma-pha-xe-tuan-ha',
    title: 'Mai Hoa Phổ: Bình phong mã phá Xe tuần hà – một Xe kìm ba quân',
    red: 'Mai Hoa Phổ (bên Đỏ)',
    black: 'Mai Hoa Phổ (bên Đen)',
    event: 'Cổ phổ Mai Hoa Phổ – phần "Nhượng tiên": Bình phong mã phá Pháo đầu, ván 2',
    year: 1700,
    result: '0-1',
    opening: 'Pháo đầu Xe tuần hà đối Bình phong mã tiến Tốt 7',
    difficulty: 3,
    context: `${MHP_CONTEXT}

Ván này là chương 2 của phần Bình phong mã phá Pháo đầu, tên gốc "破炮先去象后上三路马": Đen phá cách đánh mà Đỏ dùng Pháo ăn Tượng trước rồi mới lên Mã lộ 3. Đỏ dùng **Xe tuần hà** (Xe đứng ở hàng sông của mình) – kín đáo hơn Xe qua hà, nhưng vẫn rất khó chịu cho Bình phong mã.`,
    summary: `Đỏ xếp Pháo sau Xe tuần hà trên cột g, đánh "hai chọi một" vào Mã g7. Mã Đen nhảy đi, và Pháo Đỏ nhảy qua Xe **ăn Tượng chiếu Tướng**. Máy tính cho rằng đến đây Đỏ hơn rõ. Nhưng chính Mai Hoa Phổ cảnh báo: món lợi ấy khiến Pháo, Xe, Mã Đỏ dồn cả lên cột g – và Xe Đen chỉ cần bình sang g9 là kìm chân cả ba.

Đen đưa Pháo lên b4 rồi đẩy Tốt c4 làm ngòi: Xe g4 bị đánh mà không dám đi vì phải giữ Pháo g6. Sau loạt đổi quân, Xe Đen lao xuống ăn Mã g2. Kết thúc là một nước tĩnh rất đẹp – Tướng Đen bình sang cột f để luật lộ mặt tướng biến Xe f2 thành mối đe dọa chiếu bí – và Đen thắng với ưu thế quân rõ rệt.`,
    moves:
      '1. P8-5 M2.3 2. M8.7 B7.1 3. X9-8 X1-2 4. X8.4 M8.7 5. B3.1 B7.1 6. X8-3 B3.1 7. P2-3 M7.8 8. P3.7 S6.5 9. M2.3 T3.5 10. P3/3 X9-7 11. X1.1 P2.3 12. X1-8 B3.1 13. X3-7 X7.3 14. X8.3 X2.5 15. X7-8 X7.4 16. M7/5 X7-6 17. X8-3 M8.9 18. X3/1 Tg5-6 19. M5.7 X6.2 20. Tg5.1 M9/8',
    annotations: {
      '1': 'Pháo đầu: Pháo b2 về giữa, nhắm Tốt e6. Trong phần này của Mai Hoa Phổ, bên đi trước luôn cầm Pháo đầu, còn tác giả cầm quân Đen.',
      '1...': 'Mã b9 lên c7 giữ Tốt đầu e6 – bước đầu dựng Bình phong mã.',
      '2...':
        'Tiến Tốt 7 (Tốt g6 lên g5) – nét riêng của Bình phong mã trong Mai Hoa Phổ: Tốt g5 chặn Tốt g3 của Đỏ, và ô g6 trống thì Mã g7 sau này có đường nhảy lên f5.',
      '4': '**Xe tuần hà**: Xe b0 lên b4, đứng ở hàng sông của mình. Từ đây Xe có thể chạy ngang hỗ trợ cả hai cánh.',
      '4...': 'Mã h9 lên g7: Bình phong mã hoàn chỉnh, hai Mã c7 và g7 cùng che Tốt đầu.',
      '5': 'Tốt g3 lên g4, đối đầu Tốt g5 của Đen.',
      '5...': 'Đen chủ động đổi Tốt: Tốt g5 ăn Tốt g4.',
      '6':
        'Xe tuần hà bình sang g4 ăn lại Tốt. Cột g trống tới tận Mã g7, nhưng Mã vẫn an toàn vì Pháo b7 bảo vệ nó dọc hàng 7, qua ngòi Mã c7.',
      '6...': 'Tốt c6 lên c5, mở chân cho Mã c7 (ô c6 trống). Giờ cả hai Tốt 3 và 7 của Đen đều đã tiến, hai Mã đều có đường ra.',
      '7':
        'Pháo h2 bình sang g2, xếp sau Xe g4: qua ngòi là chính Xe nhà, Pháo cũng nhắm Mã g7. Mã g7 giờ bị hai quân đánh mà chỉ có một quân giữ.',
      '7...':
        'Mã g7 nhảy lên h5 để tránh đòn "hai chọi một". Máy tính hiện đại chuộng lùi Mã về e8 (M7/5) hơn: khi Mã rời g7, Tượng g9 nằm trơ trọi trước Pháo g2.',
      '8': 'Pháo g2 nhảy qua Xe g4 ăn Tượng g9 và **chiếu Tướng** (Sĩ f9 làm ngòi). Máy tính xác nhận đây là nước mạnh nhất: Đỏ hơn khoảng 2 điểm.',
      '8...': 'Sĩ f9 lên e8 bỏ ngòi, hết chiếu.',
      '9':
        'Mã h0 lên g2. Lời bình trong nguồn: Pháo ăn Tượng rồi lên Mã trông như được lợi, nhưng sau khi bị Tượng đuổi và Xe Đen phong tỏa, các quân chủ lực của Đỏ sẽ trì trệ, bị kìm chân. Máy tính đồng ý rằng rút Pháo ngay (P3/3) chính xác hơn.',
      '9...': 'Tượng c9 lên e7 đuổi Pháo g9 (mắt Tượng f8 trống).',
      '10': 'Pháo lùi về g6. Từ đây, qua ngòi Tốt e6, nó nhắm Tốt a6.',
      '10...':
        '**Một Xe kìm ba quân.** Xe i9 bình sang g9. Trên cột g có Pháo g6, Xe g4, Mã g2 của Đỏ xếp hàng. Pháo g6 bị Xe Đen đánh, chỉ được Xe g4 giữ; nếu Pháo bỏ đi thì Xe g4 lại lộ ra trước Xe g9 mà không có quân bảo vệ. Lời bình trong nguồn: Đen bỏ Tượng để đổi lấy thế kìm này.',
      '11':
        'Đỏ ra Xe phải (hoành xa), nhưng nước này chậm. Máy tính đề nghị lên Tượng (T3.1) để giữ ưu thế; sau X1.1, Đen bắt đầu chiếm ưu.',
      '11...':
        'Pháo b7 lên b4 – một đòn ngầm: chỉ cần Tốt c5 tiến lên c4 là có ngòi, và Pháo b4 sẽ nhắm thẳng Xe g4 dọc hàng 4.',
      '12': 'Xe sang b1 đuổi Pháo b4, nhưng Pháo được Xe b9 bảo vệ dọc cột b. Máy tính cho rằng X1-4 hoặc lùi Mã (M3/5) chống đỡ tốt hơn.',
      '12...':
        'Tốt c5 tiến c4 làm ngòi: Pháo b4 qua ngòi Tốt c4 đánh Xe g4. Xe g4 không thể bỏ đi vì nó đang giữ Pháo g6 trước Xe g9.',
      '13': 'Xe g4 ăn Tốt c4 để gỡ ngòi – nước tốt nhất còn lại – nhưng Pháo g6 mất chỗ dựa.',
      '13...': 'Xe g9 ăn Pháo g6. Đen lấy lại quân, và cột g mở thẳng xuống Mã g2.',
      '14': 'Xe b1 ăn Pháo b4, mở màn loạt đổi quân. Máy tính chuộng lùi Mã g2 về i1 (M3/1) để cứu Mã khỏi cột g hơn.',
      '14...': 'Xe b9 ăn lại Xe b4.',
      '15': 'Xe c4 ăn lại Xe b4. Hai bên đổi Xe và Pháo – nhưng cột g giờ trống trơn.',
      '15...':
        'Xe g6 lao xuống ăn Mã g2 – quân thứ ba trên cột g. Đen hơn quân (một Mã so với một Tượng và một Tốt), và Xe đã vào sâu trận địa Đỏ.',
      '16': 'Mã c2 lùi về e1 để giữ cả hai Tượng c0, g0 ở hàng đáy (Xe g2 đang nhìn xuống Tượng g0).',
      '16...': 'Xe bình sang f2, nhìn xuống Sĩ f0.',
      '17': 'Xe b4 về g4. Máy tính cho rằng nhảy Mã ra c2 (M5.7) tốt hơn; sau nước này Đen hơn khoảng 5 điểm.',
      '17...': 'Mã h5 ăn Tốt i3, áp sát cung Tướng Đỏ.',
      '18': 'Xe lùi về g3 đánh Mã i3 (ô h3 trống). Trông như Đỏ sắp gỡ lại quân.',
      '18...':
        '**Tướng bình sang f9** – nước tĩnh mà hiểm: Đen mặc Mã i3. Nếu Đỏ ăn Mã (X3-1), Xe f2 xuống f0 ăn Sĩ là chiếu bí: Tướng Đỏ không được ăn Xe vì hai Tướng sẽ đối mặt trên cột f (lộ mặt tướng), còn ô e1 đã bị Mã nhà chiếm.',
      '19': 'Đỏ nhảy Mã e1 ra c2 để nhường ô e1 cho Tướng. Máy tính cho rằng Mã e1 lên g2 (M5.3) chống được lâu hơn, nhưng Đen vẫn thắng thế.',
      '19...': 'Xe f2 xuống f0 ăn Sĩ và **chiếu Tướng**. Tướng Đỏ vẫn không ăn được Xe vì cột f trống tới tận Tướng Đen.',
      '20': 'Nước hợp lệ duy nhất: Tướng lên e1.',
      '20...':
        'Mã i3 lùi về h5, nhắm Xe g3 (chân Mã h4 trống), trong khi Xe f0 vẫn đè lên cung Tướng chỉ còn một Sĩ. Đen hơn một Mã và đang tấn công; sách dừng ở đây, Đen thắng (máy tính đánh giá Đen hơn khoảng 5 điểm).',
    },
    keyMoments: ['8', '10...', '12...', '15...', '18...'],
    lessons: [
      'Xe đứng trước, Pháo đứng sau trên cùng một cột tạo thế "hai chọi một" rất mạnh vào quân đối phương.',
      'Ăn được Tượng chưa chắc đã lời: hãy xem sau đó quân mình có bị dồn vào một cột, bị kìm chân hay không.',
      'Các quân xếp hàng trên cùng một cột với Xe đối phương rất dễ bị "kìm": một Xe có thể giữ chân cả ba quân.',
      'Một nước Tốt tạo ngòi cho Pháo (Tốt c4) là cách tấn công kín đáo mà hiệu quả.',
      'Luật lộ mặt tướng cũng là vũ khí tấn công: đưa Tướng mình ra cột trống để Tướng đối phương không dám ăn quân.',
    ],
    tags: ['Cổ phổ', 'Khai cuộc', 'Phòng thủ', 'Chiến thuật'],
    source: 'https://www.xiangqiqipu.com/Category/View-7882.html',
  },

  // ------------------------------------------------------------------ 1700 · Mai Hoa Phổ: Bình phong mã phá Xe qua hà
  {
    id: 'mai-hoa-pho-binh-phong-ma-pha-xe-qua-ha',
    title: 'Mai Hoa Phổ: Bình phong mã phá Xe qua hà – Pháo thọc hàng đáy',
    red: 'Mai Hoa Phổ (bên Đỏ)',
    black: 'Mai Hoa Phổ (bên Đen)',
    event: 'Cổ phổ Mai Hoa Phổ – phần "Nhượng tiên": Bình phong mã phá Pháo đầu, ván 7',
    year: 1700,
    result: '0-1',
    opening: 'Pháo đầu Xe qua hà, Mã biên đối Bình phong mã tiến Tốt 7',
    difficulty: 2,
    context: `${MHP_CONTEXT}

Ván này là chương 7 của phần Bình phong mã phá Pháo đầu, tên gốc "飞象进马破过河车边马": Đen phi Tượng, nhảy Mã lên bờ sông để phá thế **Xe qua hà kết hợp Mã biên** – kiểu tấn công gắt nhất của Pháo đầu thời đó.`,
    summary: `Đỏ cho Xe qua hà ăn Tốt c6, rồi đẩy Tốt c3 mở đường cho Mã – hai nước trông rất tự nhiên. Đen đáp bằng một chuỗi nước Pháo: Pháo b7 thọc xuống b3, bình sang c3, rồi nhảy qua Mã c2 **ăn Tượng chiếu Tướng**, rồi lùi về góc a0 chờ Xe. Đỏ ăn thêm được một Mã, nhưng hàng đáy bỏ ngỏ còn Xe, Mã cánh phải chưa ra trận.

Ở nước 13, Đỏ tham ăn Tốt g5 và vô tình tạo ngòi cho Pháo Đen ăn Pháo đầu. Một nước sau, Xe Đen xuống b0 chiếu: Đỏ chỉ còn đúng một nước chặn bằng Mã, và Pháo a0 sẽ nhảy qua Xe ăn luôn Mã đó. Chỉ sau 14 nước, Bình phong mã đã phá tan Xe qua hà.`,
    moves:
      '1. P8-5 M2.3 2. M8.7 B7.1 3. X9-8 X1-2 4. X8.6 M8.7 5. M2.1 T7.5 6. X8-7 M7.6 7. B7.1 P2.4 8. P5.4 S6.5 9. P5/1 P2-3 10. X7-4 P3.3 11. S6.5 P3-1 12. X4/1 P8.2 13. X4-3 P8-5 14. X3/1 X2.9',
    annotations: {
      '1': 'Pháo đầu: Pháo b2 về giữa, nhắm Tốt e6.',
      '1...': 'Mã b9 lên c7 giữ Tốt đầu e6.',
      '2': 'Mã b0 lên c2 giữ Tốt đầu e3 và mở đường cho Xe a0.',
      '2...': 'Tiến Tốt 7: Tốt g6 lên g5, để sau này Mã g7 có đường (chân g6 trống) nhảy lên bờ sông.',
      '4':
        '**Xe qua hà**: Xe lao lên b6, hàng Tốt của Đen, rình ăn Tốt a6 hoặc Tốt c6 – cả hai đều chưa có quân bảo vệ.',
      '4...': 'Mã h9 lên g7: Bình phong mã hoàn chỉnh.',
      '5': 'Mã biên: Mã h0 nhảy ra i2 để mở đường cho Xe i0. "Xe qua hà, Mã biên" chính là thế cờ mà chương này muốn phá.',
      '5...': '**Phi Tượng**: Tượng g9 lên e7, củng cố trung lộ và nối liền hai Tượng.',
      '6':
        'Xe ăn Tốt c6. Lời bình trong nguồn chê nước này nóng vội: ăn Tốt xong, Đỏ để Đen nhảy Mã ra phản công; nên bình Pháo phải (P2-3) hoặc ra Xe phải (X1.1) để các quân phát triển đều. Máy tính đồng ý hướng đó, nhưng chỉ coi ăn Tốt là kém hơn chút ít.',
      '6...':
        'Mã g7 nhảy lên f5 – "Mã hà khẩu" đứng ngay bờ sông nhờ ô g6 đã trống. Nguồn bình rằng con Mã này đứng rất tốt; nó đã nhắm Tốt g3 đang không có quân bảo vệ.',
      '7':
        'Tốt c3 lên c4 để mở đường cho Mã c2 – nước "tự nhiên mà sai". Ô c3 và hàng 3 bỏ trống, đúng đường đi của Pháo b7. Máy tính xem đây mới là chỗ Đỏ mất thế cân bằng; bình Pháo phải sang f2 hoặc g2 thì thế cờ vẫn ngang ngửa.',
      '7...':
        'Pháo b7 thọc xuống b3, ngay hàng Tốt của Đỏ. Từ đây nó dọa ăn Tốt g3 (ngòi là Tốt e3) và chờ bình sang c3.',
      '8': 'Pháo đầu ăn Tốt e6 và **chiếu Tướng** (Tượng e7 làm ngòi). Đây là nước tốt nhất của Đỏ, nhưng máy tính vẫn đánh giá Đen nhỉnh hơn.',
      '8...': 'Sĩ f9 lên e8 che chiếu. Đen không vội ăn Pháo bằng Mã c7 – máy tính cũng cho rằng lên Sĩ tốt hơn.',
      '9': 'Pháo lùi về e5 giữ trung lộ. Máy tính chuộng P5-9 hơn đôi chút: Pháo e6 nhảy qua Xe c6 ăn Tốt a6.',
      '9...':
        'Pháo bình sang c3, ngay trên đầu Mã c2. Đen dọa P3.3: nhảy qua Mã ăn Tượng c0, và Sĩ d0 sẽ thành ngòi để Pháo chiếu Tướng.',
      '10': 'Xe bình sang f6 đánh Mã f5 (Mã này không có quân bảo vệ). Máy tính xác nhận đây là cách đáp tốt nhất – không còn nước nào vừa giữ Tượng c0 vừa giữ thế.',
      '10...': 'Pháo nhảy qua Mã c2 ăn Tượng c0 và **chiếu Tướng** (Sĩ d0 làm ngòi). Đen mặc kệ Mã f5 đang bị Xe đánh.',
      '11': 'Đỏ chỉ có hai cách thoát chiếu: Sĩ d0 lên e1 (bỏ ngòi) hoặc Tướng lên e1. Lên Tướng thì cung Tướng tan nát (máy tính: Đen hơn khoảng 8 điểm), nên lên Sĩ là bắt buộc.',
      '11...':
        'Pháo lùi về góc a0, vẫn nằm trên hàng đáy của Đỏ. Ý đồ: khi Xe b9 xuống b0 chiếu, Pháo a0 đứng ngay sau Xe, sẵn sàng nhảy qua Xe ăn quân nào chặn ở c0 hay d0.',
      '12':
        'Xe ăn Mã f5. Đỏ đã ăn hai Tốt và một Mã, chỉ mất một Tượng – nhưng máy tính vẫn đánh giá Đen hơn khoảng 2 điểm: Xe i0, Mã i2 chưa ra trận và hàng đáy bỏ ngỏ.',
      '12...': 'Pháo h7 lên h5: qua ngòi Tốt g5, Pháo đánh vào Xe f5 đang không có quân bảo vệ.',
      '13':
        'Sai lầm quyết định: Xe ăn Tốt g5 – chính con Tốt từng làm ngòi – nhưng Xe đứng ở g5 lại thành ngòi mới cho Pháo h5 ăn Pháo e5. Máy tính chỉ ra Xe nên lùi hẳn về f2 (X4/3) để giữ nhà.',
      '13...': 'Pháo h5 nhảy qua Xe g5 ăn Pháo e5. Đỏ mất Pháo đầu, quân giữ trung lộ.',
      '14':
        'Đỏ lùi Xe về g4 thay vì ăn lại Pháo bằng X3-5. Theo máy tính, ăn lại cũng chỉ kéo dài: sau khi Xe Đen xuống b0 chiếu, Đen vẫn đoạt thêm quân. Nhưng X3/1 còn tệ hơn.',
      '14...':
        '**Xe xuống b0 chiếu Tướng.** Đỏ chỉ còn đúng một nước hợp lệ: Mã c2 lui về d0 chặn (Sĩ e1 không được rời chỗ vì Pháo e5 sẽ chiếu qua ngòi Tốt e3). Ngay sau đó Pháo a0 nhảy qua Xe b0 ăn Mã d0; Đen hơn quân, cung Tướng Đỏ trống trải – sách dừng ván ở đây, Đen thắng.',
    },
    keyMoments: ['6...', '7', '10...', '13', '14...'],
    lessons: [
      'Bình phong mã tiến Tốt 7 mở chân cho Mã nhảy lên bờ sông – con Mã ấy là đầu mối phản công.',
      'Xe qua hà ăn Tốt rất hấp dẫn nhưng tốn nhịp; khi Xe đi ăn quân, hàng đáy và các quân chưa ra trận trở thành điểm yếu.',
      'Pháo thọc xuống hàng đáy đối phương (dùng chính quân đối phương làm ngòi) là vũ khí mạnh: ăn Tượng chiếu, rồi phối hợp với Xe chiếu theo hàng.',
      'Trước khi ăn quân, hãy kiểm tra xem quân vừa ăn có biến thành ngòi cho Pháo đối phương không.',
      'Đếm quân chưa đủ: Đỏ hơn một Mã mà vẫn thua vì Xe, Mã cánh phải chưa ra trận và Tướng thiếu che chở.',
    ],
    tags: ['Cổ phổ', 'Khai cuộc', 'Phòng thủ', 'Chiến thuật', 'Ván ngắn'],
    source: 'https://www.xiangqiqipu.com/Category/View-7811.html',
  },

  // ------------------------------------------------------------------ 1700 · Mai Hoa Phổ: Liệt pháo, mượn Pháo sai Mã
  {
    id: 'mai-hoa-pho-liet-phao-muon-phao-sai-ma',
    title: 'Mai Hoa Phổ: Liệt thủ pháo – mượn Pháo sai Mã',
    red: 'Mai Hoa Phổ (bên Đỏ)',
    black: 'Mai Hoa Phổ (bên Đen)',
    event: 'Cổ phổ Mai Hoa Phổ – phần "Đắc tiên": Liệt thủ pháo, ván 2',
    year: 1700,
    result: '1-0',
    opening: 'Liệt pháo (Đại liệt thủ pháo), hai bên Mã biên, Xe tuần hà',
    difficulty: 4,
    context: `${MHP_CONTEXT}

Ván này thuộc phần "Đắc tiên" (bên đi trước thắng), chương Liệt thủ pháo, ván 2 – tên gốc "攻右车守河口后上马打车": cách Đỏ đánh khi Đen đưa Xe giữ hà khẩu rồi lên Mã đuổi Xe. Phần kết của ván là một trong những đòn sát cục Mã – Pháo đẹp nhất của cổ phổ.`,
    summary: `Thế trận Liệt pháo gần như đối xứng: hai bên cùng Mã biên, cùng Xe tuần hà. Đỏ đi trước một nhịp, cho Tốt c tiến liền mấy bước qua sông dọa ăn Mã c7. Đen chọn đổi Mã rồi phản công bằng Pháo đáy, bỏ mặc Mã c7 – trong khi trung lộ chưa kịp bổ Sĩ, đúng điều câu tục ngữ cờ cảnh báo.

Hơn Mã, Đỏ đưa Pháo về cột f chiếu, rồi lần lượt bỏ cả hai Xe. Phần còn lại là bài sát cục **"mượn Pháo sai Mã"**: Pháo f2 đứng yên như nòng súng, Mã Đỏ nhảy ra nhảy vào cột f, nước nào cũng là nước chiếu, cho tới khi Tướng Đen hết chỗ chạy ở nước 28.`,
    moves:
      '1. P2-5 P2-5 2. M2.3 M8.9 3. M8.9 M2.3 4. X1-2 X9-8 5. X2.4 X1-2 6. X9-8 X2.4 7. B9.1 X2-6 8. M9.8 B3.1 9. B7.1 B9.1 10. B7.1 M9.8 11. X2-6 M8.6 12. B7.1 M6.7 13. P8-3 P8.7 14. S6.5 P5.4 15. Tg5-6 S6.5 16. B7.1 T7.5 17. P5.4 Tg5-6 18. P3-4 X6-2 19. M8.6 X2.5 20. M6/4 P5-6 21. X6.5 S5/4 22. M4.3 P6-5 23. M3/4 P5-6 24. M4.2 P6-5 25. M2.3 Tg6.1 26. M3/4 P5-6 27. M4/5 P6-9 28. M5.4',
    annotations: {
      '1': 'Pháo đầu: Pháo h2 về giữa.',
      '1...':
        '**Liệt pháo**: Đen đưa Pháo b7 về giữa – Pháo ở cánh ngược với Pháo Đỏ, hai Pháo đầu đối mặt nhau trên cột e. Mai Hoa Phổ dành 5 ván cho kiểu đối công này.',
      '2...': 'Mã biên: Mã h9 ra i7, mở cột h cho Xe nhưng không che Tốt đầu e6.',
      '3': 'Đỏ cũng ra Mã biên a2 – thế cờ gần như đối xứng.',
      '4...': 'Xe h9 ra bảo vệ Pháo h7: cột h đã trống nên Xe h0 của Đỏ đang nhắm thẳng Pháo này.',
      '5': '**Xe tuần hà**: Xe h0 lên h4, khống chế hàng sông.',
      '6...': 'Đen cũng đưa Xe lên tuần hà ở b5 – hàng sông bên phía Đen.',
      '7...': 'Xe b5 bình sang f5, khống chế hàng 5 để Mã Đỏ khó nhảy vào d5, đồng thời nhìn dọc cột f xuống Sĩ f0.',
      '8': 'Mã a2 nhảy lên b4 (chân Mã a3 đã trống nhờ Tốt biên). Mã được Xe h4 bảo vệ dọc hàng 4.',
      '9...': 'Tốt i6 lên i5, mở chân cho Mã i7. Nguồn bình: Đen định lên Mã đuổi Xe để giành nhịp.',
      '10': 'Tốt c4 ăn Tốt c5 – Tốt Đỏ đã qua sông.',
      '10...': 'Mã i7 nhảy lên h5, làm ngòi cho Pháo h7 đánh Xe h4.',
      '11': 'Xe né sang d4. Nguồn khen: bình sang cột d linh hoạt, vừa công vừa thủ hơn bình sang cột c; Đỏ vẫn dồn sức vào cánh trái.',
      '11...': 'Mã h5 nhảy f4, đe dọa Mã g2 và Pháo e2.',
      '12': 'Tốt c5 tiến lên c6, đe dọa ăn Mã c7.',
      '12...':
        'Đen bỏ mặc Mã c7 để đổi Mã: Mã f4 ăn Mã g2. Máy tính coi đây là bước ngoặt – Đen nên lên Pháo h7 tới h4 (P8.3) để giữ thế; sau nước này Đỏ hơn khoảng 3 điểm.',
      '13': 'Pháo b2 ăn lại Mã g2 (ngòi là Pháo e2). Tốt c6 vẫn dọa ăn Mã c7.',
      '13...':
        'Đen phản công thay vì cứu Mã: Pháo h7 thọc xuống h0 (cột h đã trống). Pháo đáy này giữ ô f0 qua ngòi Tượng g0, nên Đen dọa Xe f5 xuống ăn Sĩ f0 mà Tướng Đỏ không ăn lại được.',
      '14': 'Đỏ lên Sĩ e1 để Sĩ f0 có thêm quân bảo vệ, hóa giải đòn dọa trên.',
      '14...':
        'Pháo đầu ăn Tốt e3 (ngòi Tốt e6). Lời bình trong nguồn: Xe và hai Pháo Đen tuy có thế công nhưng trung lộ phòng thủ còn hở – tục ngữ cờ có câu "Liệt thủ pháo phải bổ Sĩ cho chắc".',
      '15': 'Tướng bình sang d0, rời khỏi cột e nơi Pháo e3 của Đen đang chĩa vào.',
      '15...': 'Đen lên Sĩ e8 – đúng lời khuyên "bổ Sĩ", nhưng đã muộn.',
      '16': 'Tốt c6 ăn Mã c7. Đỏ hơn hẳn một Mã.',
      '17': 'Pháo e2 nhảy qua Pháo e3 của Đen ăn Tốt e6, áp sát cung Tướng.',
      '17...': 'Tướng tránh sang f9 – nước tốt nhất theo máy tính, vì chỉ cần Tượng e7 hay Sĩ e8 rời chỗ là Pháo e6 chiếu.',
      '18': 'Pháo g2 bình sang f2 **chiếu Tướng** qua ngòi Xe f5. Từ đây cột f thành "đường ray" cho Pháo f2 trong suốt đòn kết thúc.',
      '18...': 'Xe f5 tránh sang b5 (bỏ ngòi nên hết chiếu), vừa đuổi Mã b4 vừa nhìn xuống Xe b0.',
      '19':
        'Mã b4 nhảy vào d5, mặc kệ Xe b0 cho Xe Đen ăn. Theo máy tính, giữ Xe bằng X8.3 thắng gọn hơn; Mai Hoa Phổ chọn đường bỏ Xe để dẫn tới đòn sát cục bằng Mã và Pháo.',
      '19...': 'Xe b5 ăn Xe b0. Đen gỡ lại quân, nhưng Tướng Đen trên cột f vẫn nằm trong tầm Pháo f2 – chỉ cần một ngòi là bị chiếu.',
      '20':
        '**Mượn Pháo sai Mã** bắt đầu: Mã d5 lùi về f4 làm ngòi, Pháo f2 chiếu Tướng. Từ đây Đỏ chiếu liên tục và có chiếu bí bắt buộc (máy tính: chiếu bí sau 9 nước).',
      '20...': 'Pháo e3 bình sang f3 chặn: giữa Pháo f2 và Tướng có hai quân nên hết chiếu.',
      '21':
        '**Thí Xe!** Xe d4 ăn Sĩ d9 chiếu Tướng. Nếu Tướng lên f8, Mã f4 nhảy g6 chiếu bí ngay; nên Đen buộc phải ăn Xe bằng Sĩ e8 – và ô e8 bỏ trống rơi vào tầm Pháo e6 (ngòi là Tượng e7). Nguồn bình: Đỏ bỏ Xe vì đã tính chắc hai Pháo và Mã đủ sức đánh thẳng vào cung Tướng.',
      '21...': 'Sĩ e8 ăn Xe d9. Đỏ chỉ còn hai Pháo và một Mã – nhưng thế là đủ.',
      '22':
        'Mã f4 nhảy g6: Mã rời cột f nên Pháo f2 chiếu qua ngòi là chính Pháo f3 của Đen. Mã g6 còn khống chế ô f8, còn ô e9 bị Pháo e6 khống chế – Tướng không có chỗ chạy.',
      '22...': 'Đen chỉ có thể đưa Pháo f3 rời cột f để bỏ ngòi; Pháo sang e3.',
      '23': 'Mã g6 lùi về f4: lại làm ngòi, Pháo f2 chiếu.',
      '23...': 'Nước hợp lệ duy nhất: Pháo e3 trở lại f3 chặn.',
      '24': 'Mã f4 nhảy h5, Pháo f2 lại chiếu qua ngòi f3. Từ h5, Mã chuẩn bị nhảy vào g7.',
      '24...': 'Pháo f3 lại rời cột f, về e3.',
      '25': 'Mã h5 nhảy g7 **chiếu Tướng trực tiếp** (chân Mã ở g8 trống). Tướng không về e9 được vì Pháo e6 khống chế.',
      '25...': 'Nước hợp lệ duy nhất: Tướng lên f8.',
      '26': 'Mã g7 lùi f5 làm ngòi – Pháo f2 chiếu Tướng f8.',
      '26...': 'Nước hợp lệ duy nhất: Pháo e3 chặn ở f3.',
      '27': 'Mã f5 nhảy về e3 (ô Pháo Đen vừa rời): Mã rời cột f, Pháo f2 chiếu qua ngòi f3.',
      '27...': 'Pháo f3 ăn Tốt i3 để bỏ ngòi – lần chạy cuối cùng.',
      '28':
        '**Chiếu bí.** Mã e3 nhảy f5 làm ngòi, Pháo f2 chiếu Tướng f8. Tướng không thoát: f7 và f9 vẫn trên đường Pháo, e8 bị Pháo e6 (ngòi Tượng e7) khống chế, và không quân Đen nào chặn được vào f6, f7. Lời bình trong nguồn gọi kiểu sát này là "mượn Pháo sai Mã" (借炮使马).',
    },
    keyMoments: ['12...', '18', '21', '25', '28'],
    lessons: [
      '"Liệt thủ pháo phải bổ Sĩ cho chắc": khi hai bên đối công bằng Pháo đầu, trung lộ không được bỏ hở.',
      'Bỏ mặc quân đang bị đe dọa để phản công là con dao hai lưỡi – Đen mất Mã c7 mà đòn công không tới.',
      'Pháo đứng sau một cột trống cộng với Mã làm "ngòi di động" tạo thế chiếu liên hoàn: mượn Pháo sai Mã.',
      'Thí Xe ăn Sĩ để kéo quân phòng thủ rời vị trí, rồi để những quân nhỏ (Mã, Pháo) hoàn tất chiếu bí.',
      'Khi tính đòn chiếu liên tục, hãy đếm ô thoát của Tướng trước: ở đây Pháo e6 khóa ô e8, e9 suốt cả đòn kết thúc.',
    ],
    tags: ['Cổ phổ', 'Tấn công Tướng', 'Thí quân', 'Chiến thuật'],
    source: 'https://www.xiangqiqipu.com/Category/View-7786.html',
  },

  // ------------------------------------------------------------------ 1700 · Mai Hoa Phổ: Pháo đầu phá Chuyển giác mã
  {
    id: 'mai-hoa-pho-phao-dau-pha-chuyen-giac-ma',
    title: 'Mai Hoa Phổ: Pháo đầu phá Chuyển giác mã – Tướng ra cột trống',
    red: 'Mai Hoa Phổ (bên Đỏ)',
    black: 'Mai Hoa Phổ (bên Đen)',
    event: 'Cổ phổ Mai Hoa Phổ – phần "Nhượng tiên": Pháo đầu phá Chuyển giác mã, ván 1',
    year: 1700,
    result: '0-1',
    opening: 'Phi tượng cục (Chuyển giác mã) đối Pháo đầu',
    difficulty: 3,
    context: `${MHP_CONTEXT}

Ván này thuộc phần "Nhượng tiên", chương "Pháo đầu phá Chuyển giác mã" (当头炮破转角马), ván 1. Lần này bên đi trước không dùng Pháo đầu mà phi Tượng rồi đưa Mã vòng qua góc Sĩ ("Chuyển giác mã"); Đen – bên của tác giả – dùng chính Pháo đầu để trừng phạt lối ra quân chậm chạp ấy.`,
    summary: `Đỏ phi Tượng rồi đưa Mã đi đường vòng qua góc Sĩ. Đen đi sau nhưng lập tức vào Pháo đầu, ăn Tốt e3 chiếu, rồi đặt Pháo ngay trước Mã d2 để vừa kìm vừa dọa. Khi Đỏ dùng Xe đánh Pháo, Đen đã có sẵn đòn trả: Pháo sang a5 rình Xe a0 qua ngòi Tốt.

Hai bên đổi Xe; Xe còn lại của Đen liên tục chiếu dọc hàng đáy, buộc Pháo Đỏ đứng trơ ở f0 làm lá chắn. Đỏ ăn được một Mã, nhưng ở nước 20 lại kéo Mã khỏi trung tâm. Đen chiếu bằng Pháo, chiếu bằng Xe, rồi đi một nước tĩnh: **Tướng sang cột f**. Luật lộ mặt tướng khiến Tướng Đỏ không thể ăn Xe – và Xe ăn Pháo f0 là chiếu bí.`,
    moves:
      '1. T3.5 P8-5 2. M2.4 M8.7 3. M4.6 X9-8 4. P2-3 P5.4 5. S4.5 P5-4 6. X1-4 P2.2 7. X4.3 P2-1 8. P8-9 P1-5 9. M8.7 X8.9 10. X4/3 X8-6 11. Tg5-4 X1.1 12. X9-8 X1-6 13. P3-4 X6-8 14. Tg4-5 X8.8 15. P4/2 S6.5 16. X8.4 P4-9 17. M6.7 X8/4 18. Ms.5 B3.1 19. X8.5 B3.1 20. M5.7 P9.3 21. P4.2 X8.4 22. P4/2 Tg5-6 23. M7.5 X8-6',
    annotations: {
      '1':
        '**Phi tượng**: Đỏ mở màn bằng Tượng g0 lên e2 thay vì Pháo đầu. Lời bình trong nguồn: Tượng liên hoàn trước, rồi dùng các quân khác dựng một vòng phòng thủ chặt chẽ, chờ thời cơ mới tiến.',
      '1...':
        '**Pháo đầu**: dù đi sau, Đen lập tức đưa Pháo h7 về giữa nhắm Tốt e3. Ở phần "Nhượng tiên", bên của tác giả (Đen) đi sau mà vẫn cầm Pháo đầu tấn công.',
      '2':
        '**Chuyển giác mã**: Mã h0 nhảy lên f1 (góc Sĩ) chứ không lên g2. Theo lời bình trong nguồn, ý đồ là đưa Mã từ góc Sĩ vòng sang đứng trước Tốt c3 – nhưng cách ra Mã này thường không hợp để đối phó Pháo đầu.',
      '2...': 'Mã h9 lên g7 giữ Tốt đầu.',
      '3': 'Mã f1 tiếp tục vòng sang d2. Nguồn chê nước này: nên lên Mã c2 (M8.7) hoặc lên Sĩ (S4.5). Máy tính đồng ý – sau nước này Đen hơn khoảng 1 điểm.',
      '3...': 'Xe i9 ra h9: cột h đã trống, Xe nhắm thẳng Pháo h2 đang không có quân bảo vệ.',
      '4': 'Pháo né sang g2.',
      '4...': 'Pháo đầu ăn Tốt e3 và **chiếu Tướng** (ngòi là Tượng e2).',
      '5': 'Sĩ f0 lên e1 che chiếu.',
      '5...':
        'Pháo e3 bình sang d3, ngay trước Mã d2. Nguồn khen đây là nước hay nhắm vào Chuyển giác mã: Pháo vừa nhắm Sĩ d0 qua ngòi Mã d2, vừa nhắm Tốt a3 qua ngòi Tốt c3. Khai cuộc tới đây, Đen đã nắm quyền chủ động.',
      '6': 'Xe i0 ra f0.',
      '7': 'Xe lên f3 đánh Pháo d3 – trông tự nhiên, nhưng máy tính coi đây là sai lầm (Đen hơn khoảng 1,5 điểm). Lên Tốt g3 (B3.1) thì Đỏ vẫn giữ được thế.',
      '7...':
        'Pháo b5 sang a5, qua ngòi Tốt a3 nhắm thẳng Xe a0. Nhờ vậy Pháo d3 an toàn: nếu Xe f3 ăn Pháo, Pháo a5 sẽ ăn Xe a0 (máy tính: Đỏ thua khoảng 4,5 điểm).',
      '8': 'Pháo b2 sang a2 chắn giữa, được Xe a0 bảo vệ.',
      '8...': 'Pháo a5 về giữa e5, chĩa thẳng vào cột e: Tượng e2 và Sĩ e1 đứng giữa Pháo và Tướng.',
      '9...': 'Xe h9 lao xuống h0 **chiếu Tướng** dọc hàng đáy (g0, f0 đều trống).',
      '10':
        'Chỉ có hai cách chặn: Pháo g2 lùi về g0 hoặc Xe f3 lùi về f0. Sĩ e1 không thể sang f0 chặn, vì Sĩ rời e1 là Pháo e5 chiếu qua ngòi Tượng e2.',
      '10...': 'Xe h0 ăn Xe f0 và chiếu – hai bên đổi Xe.',
      '11': 'Tướng ăn lại Xe ở f0.',
      '12...': 'Xe a8 bình sang f8 **chiếu Tướng** theo cột f.',
      '13': 'Pháo g2 sang f2 chặn chiếu.',
      '14...': 'Xe h8 xuống h0 **chiếu Tướng** lần nữa. Pháo Đỏ lại phải về f0 làm lá chắn – nó bị trói ở hàng đáy.',
      '15...': 'Đen bổ Sĩ e8, củng cố cung Tướng trước khi tấn công tiếp.',
      '16...': 'Pháo d3 nhảy qua Tốt g3 ăn Tốt i3. Đen hơn Tốt, và Pháo i3 sẵn sàng xuống hàng đáy phối hợp với Xe.',
      '17': 'Chuyển giác mã cuối cùng cũng tới c4 – đúng ô trước Tốt c3 như ý đồ ban đầu, nhưng đã quá muộn.',
      '17...': 'Xe h0 lùi lên h4, khống chế hàng 4 và nhìn sang Mã c4.',
      '18...': 'Tốt c6 tiến c5, đuổi Mã c4.',
      '19': 'Xe b4 lao lên ăn Mã b9 (con Mã Đen chưa từng đi), mặc Mã c4 cho Tốt ăn: một đổi một.',
      '19...': 'Tốt c5 ăn Mã c4.',
      '20':
        '**Sai lầm quyết định**: Mã e3 ăn lại Tốt c4, rời khỏi trung tâm. Máy tính chỉ ra Đen có chiếu bí sau 4 nước; Xe b9 ăn Tượng c9 (X8-7) thì Đỏ còn chống được.',
      '20...': 'Pháo i3 xuống i0 **chiếu Tướng** qua ngòi là Pháo f0 của Đỏ.',
      '21': 'Đỏ chỉ có thể đẩy Pháo f0 lên trên cột f để bỏ ngòi; Đỏ chọn f2.',
      '21...': 'Xe h4 xuống h0 **chiếu Tướng** dọc hàng đáy.',
      '22': 'Nước hợp lệ duy nhất: Pháo f2 lùi về f0 chặn.',
      '22...':
        '**Tướng bình sang f9** – nước tĩnh quyết định. Đen dọa Xe h0 ăn Pháo f0: khi đó Tướng Đỏ không ăn lại được (hai Tướng sẽ đối mặt trên cột f), còn Sĩ e1 ăn Xe thì Sĩ lại thành ngòi cho Pháo i0 chiếu. Đỏ không còn cách đỡ.',
      '23': 'Đỏ ăn Pháo e5 cho đỡ, nhưng không ngăn được chiếu bí.',
      '23...':
        '**Chiếu bí.** Xe h0 ăn Pháo f0 chiếu Tướng. Tướng không ăn được Xe vì sẽ đối mặt Tướng f9; Sĩ e1 ăn Xe thì thành ngòi cho Pháo i0; còn d0 và e1 đều có Sĩ nhà chắn lối.',
    },
    keyMoments: ['3', '5...', '7...', '20', '22...'],
    lessons: [
      'Phi tượng là khai cuộc vững, nhưng kế hoạch đi kèm phải nhanh: Mã vòng ba nước mới tới chỗ là quá chậm trước Pháo đầu.',
      'Bên đi sau vẫn có thể cầm Pháo đầu tấn công nếu bên đi trước ra quân chậm.',
      'Pháo đứng ngay trước một quân đối phương (Pháo d3 trước Mã d2) vừa kìm vừa uy hiếp quân phía sau.',
      'Trước khi ăn quân, hãy xem đối phương có đòn trả đũa không: Xe f3 không dám ăn Pháo d3 vì Pháo a5 rình Xe a0.',
      'Khi Tướng mình đứng trên cột trống đối diện Tướng địch, quân của mình ở cột đó trở nên "không thể bị Tướng ăn".',
    ],
    tags: ['Cổ phổ', 'Khai cuộc', 'Tấn công Tướng', 'Chiến thuật'],
    source: 'https://www.xiangqiqipu.com/Category/View-7760.html',
  },
];
