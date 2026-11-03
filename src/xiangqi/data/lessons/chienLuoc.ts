import type { XqLesson } from '../types';

// Chiến lược trung cuộc cờ tướng: nguyên tắc khai cuộc, vai trò từng quân, phòng thủ, tấn công,
// tiên thủ, đổi quân và lập kế hoạch. Mọi diễn biến đã được kiểm tra bằng scripts/xq-tool.ts.

export const LESSONS: XqLesson[] = [
  // ───────────────────────────── 1. Nguyên tắc khai cuộc ─────────────────────────────
  {
    id: 'xq-cl-nguyen-tac-khai-cuoc',
    category: 'chien-luoc',
    title: 'Nguyên tắc khai cuộc',
    subtitle: 'Xe ra sớm, tranh trung lộ, liên kết quân và giữ tiên thủ',
    level: 1,
    icon: '🚀',
    minutes: 15,
    intro:
      'Em không cần thuộc hàng trăm biến khai cuộc mới chơi được cờ tướng. Điều em cần là hiểu vài nguyên tắc mà mọi khai cuộc tốt đều tuân theo: đưa quân ra nhanh (nhất là Xe), tranh giành lộ giữa, giữ cho các quân bảo vệ lẫn nhau, và không phung phí nước đi. Bài này dùng chính những khai cuộc phổ biến nhất – Pháo đầu đối Bình phong mã, Thuận pháo – để em thấy các nguyên tắc ấy vận hành ra sao.',
    sections: [
      {
        heading: 'Ba nhiệm vụ của khai cuộc',
        body: `Trong khoảng 8–10 nước đầu, mỗi bên phải hoàn thành ba việc:

- **Xuất quân:** đưa Mã, Xe, Pháo rời vị trí ban đầu, đến những điểm có nhiều đường đi.
- **Tranh trung lộ:** lộ giữa (cột e) là con đường ngắn nhất dẫn tới Tướng. Pháo đầu, Tốt đầu và hai Mã đều xoay quanh cuộc tranh chấp này.
- **Giữ cung an toàn:** Sĩ, Tượng chưa cần động đậy ngay, nhưng không được để đối phương mở toang lộ giữa trước khi quân mình ra kịp.

Hãy theo dõi bốn nước đầu của thế **Pháo đầu – Bình phong mã**, một trong những hệ thống khai cuộc phổ biến nhất. Để ý rằng gần như mỗi nước đều đưa một quân mới vào trận hoặc mở đường cho một quân khác.`,
        tip: 'Trước mỗi nước ở khai cuộc, hãy tự hỏi: “Nước này đưa thêm quân nào vào trận?”. Nếu câu trả lời là “không quân nào”, nước đó phải có lý do thật đặc biệt.',
        diagram: {
          moves: '1. P2-5 M8.7 2. M2.3 X9-8 3. X1-2 M2.3 4. B7.1 B7.1',
          notes: [
            'Pháo đầu (Trung pháo): Pháo h2 vào lộ giữa, qua ngòi là Tốt e3 nhắm thẳng Tốt đầu e6 đang chưa được bảo vệ.',
            'Đen lên Mã g7: vừa ra quân, vừa giữ Tốt đầu e6 – một nước làm hai việc.',
            'Đỏ lên Mã g2: giữ Tốt e3 và quan trọng hơn là dọn đường cho Xe i0.',
            'Xe đen sang lộ 8 (cột h) ngay nước thứ hai. Pháo h7 tạm đứng chắn phía trước, nhưng Xe đã đứng đúng lộ của mình.',
            'Xe đỏ sang lộ 2, nhìn thẳng vào Pháo h7. Pháo được Xe h9 bảo vệ nên chưa mất, nhưng từ giờ nó luôn bị Xe đỏ “để mắt”.',
            'Mã thứ hai lên c7: hai Mã cùng giữ Tốt đầu, che trước cung như một tấm bình phong – vì thế mới gọi là Bình phong mã.',
            'Tiến Tốt 7 (c3–c4) để mở chân cho Mã b0: khi Mã lên c2, đường lên d4 đã thông.',
            'Đen làm điều tương tự ở cánh kia (g6–g5): Mã g7 giờ có thể nhảy lên f5 hoặc h5. Sau bốn nước, cả hai bên đều đã ra Pháo, Mã, Xe một cách gọn gàng.',
          ],
          caption: 'Pháo đầu – Bình phong mã: một trong những cách chơi phổ biến nhất của cờ tướng hiện đại.',
        },
      },
      {
        heading: 'Xe ra sớm: “ba nước không ra Xe là thua”',
        body: `Các kỳ thủ Trung Hoa có câu: **“Tam bộ bất xuất xa”** – ba nước không ra Xe, ắt sẽ thua cờ. Xe là quân mạnh nhất, nhưng nằm ở góc bàn cờ, bị Mã và Tượng chắn lối. Muốn Xe ra được, em phải:

- **Lên Mã trước** để giải phóng hàng cuối (Mã g2 nhường chỗ cho Xe i0 sang h0).
- Chọn một trong hai cách ra Xe: **Trực xa** (Xe sang lộ 2/8 rồi đi thẳng lên) hoặc **Hoành xa** (Xe tiến một bước rồi chạy ngang sang lộ 4/6).

Ở thế **Thuận pháo** bên cạnh (hai bên cùng dùng Pháo cánh phải vào lộ giữa), chỉ sau bốn nước cả hai Xe đều đã đứng trên những lộ không có Tốt nào cản.`,
        tip: 'Ở cờ tướng, các lộ 2, 4, 6, 8 vốn không có Tốt. Đó là những “đường cao tốc” sẵn có cho Xe – hãy đưa Xe tới đó càng sớm càng tốt.',
        diagram: {
          moves: '1. P2-5 P8-5 2. M2.3 M8.7 3. X1-2 X9.1 4. M8.7 X9-4',
          notes: [
            'Pháo đầu nhắm Tốt đầu e6.',
            'Thuận pháo: Đen cũng đưa Pháo cột h vào lộ giữa. Pháo e7 nhắm ngược lại Tốt e3 – lúc này Tốt e3 chưa có quân nào bảo vệ.',
            'Mã g2 bảo vệ Tốt e3 và mở đường cho Xe phải.',
            'Đen cũng giữ Tốt đầu bằng Mã g7.',
            '“Trực xa”: Xe đỏ ra thẳng lộ 2. Hai Pháo cột h đều đã rời đi nên lộ này trống từ h1 đến h9 – Xe muốn lên tuần hà hay qua hà đều được.',
            '“Hoành xa”: Xe đen tiến một bước lên i8 để có thể chạy ngang trên hàng 8.',
            'Mã trái lên c2, chuẩn bị đưa nốt Xe a0 vào cuộc.',
            'Xe hoành sang lộ 4 (cột d) – một lộ không có Tốt nào, thông thẳng xuống tận Sĩ d0 của Đỏ. Chỉ sau bốn nước, mỗi bên đã có một Xe trên đường thông.',
          ],
          caption: 'Thuận pháo trực xa đối hoành xa: hai cách đưa Xe ra sớm.',
        },
      },
      {
        heading: 'Tranh trung lộ: đừng bỏ mặc Tốt đầu',
        body: `Lộ giữa là nơi đặt Tướng, nên ai làm chủ lộ giữa người đó nắm thế chủ động. **Pháo đầu** gây sức ép lên Tốt đầu ngay từ nước thứ nhất; vì vậy bên đi sau hầu như luôn phải trả lời bằng một nước giữ trung lộ: lên Mã (Bình phong mã, Phản cung mã), đặt Pháo đối diện (Thuận pháo, Nghịch pháo)…

Thế cờ bên cạnh cho thấy cái giá của việc bỏ qua nguyên tắc này. Đen tiến một Tốt ở cánh, Đỏ lập tức ăn Tốt đầu. Không chỉ mất một Tốt: khi Pháo đỏ đứng sừng sững ở lộ giữa mà không có quân nào chắn, **Đen không thể lên Sĩ giữa, lên Tượng giữa hay đưa Pháo về e7** – bất kỳ quân nào chen vào lộ giữa đều trở thành ngòi cho Pháo đỏ chiếu Tướng.`,
        warning: 'Đừng ham ăn Tốt đầu khi nó đã được Mã bảo vệ. Sau 1. P2-5 M8.7, nước 2. P5.4? chỉ đổi Pháo lấy một Tốt vì Mã g7 ăn lại ngay.',
        diagram: {
          moves: '1. P2-5 B3.1 2. P5.4 M2.3 3. P5/1',
          notes: [
            'Pháo đầu nhắm Tốt e6, lúc này chưa có quân nào bảo vệ.',
            'Đen tiến Tốt 3 (c6–c5) – một nước không vô lý ở thế khác, nhưng ở đây nó bỏ mặc trung lộ.',
            'Pháo ăn Tốt đầu (ngòi vẫn là Tốt e3). Đỏ hơn một Tốt, lộ giữa của Đen đã mở.',
            'Đen ra Mã c7 kèm đe dọa bắt Pháo e6 – ít ra cũng gỡ lại được một nhịp.',
            'Pháo lui về e5, vẫn đứng ở lộ giữa. Giờ Đen không thể đặt quân nào vào e6, e7, e8 vì sẽ thành ngòi cho Pháo chiếu. Máy đánh giá Đỏ ưu thế rõ.',
          ],
          caption: 'Bỏ mặc Tốt đầu: mất Tốt, và cung Tướng bị Pháo đầu khống chế lâu dài.',
        },
      },
      {
        heading: 'Liên kết quân: các quân phải che chở cho nhau',
        body: `Một thế khai cuộc tốt giống như một tấm lưới: quân này bảo vệ quân kia, không quân nào “treo” một mình. Hãy nhìn lại thế cờ sau bốn nước Pháo đầu – Bình phong mã:

- **Hai Mã đen** c7, g7 cùng giữ Tốt đầu e6 – Pháo đầu không ăn được.
- **Xe h9** đứng sau bảo vệ Pháo h7 trước Xe đỏ.
- **Mã g2** giữ Tốt e3, còn **Xe a0** bảo vệ Mã b0 – quân đang nằm trong tầm ngắm của Pháo b7 (ngòi là Pháo b2).

Sau này, khi lên Sĩ, Tượng, em cũng nên giữ chúng **liên kết**: hai Sĩ ở d0 và e1 bảo vệ nhau, hai Tượng ở c0 và e2 bảo vệ nhau. Một quân đứng lẻ loi, không ai che chở, luôn là mục tiêu đầu tiên của đòn bắt đôi.`,
        tip: 'Mẹo đếm nhanh: với mỗi quân bị tấn công, đếm số quân tấn công và số quân bảo vệ. Nếu số bảo vệ ít hơn, quân đó đang gặp nguy.',
        diagram: {
          fen: 'r1bakabr1/9/1cn3nc1/p1p1p3p/6p2/2P6/P3P1P1P/1C2C1N2/9/RNBAKABR1 w - - 8 5',
          arrows: ['c7e6:blue', 'g7e6:blue', 'h9h7:blue', 'g2e3', 'a0b0'],
          highlights: ['e6:blue', 'e3:green', 'b0:yellow'],
          caption: 'Mũi tên xanh dương: Đen bảo vệ Tốt đầu và Pháo h7. Mũi tên xanh lá: Đỏ bảo vệ Tốt e3 và Mã b0.',
        },
      },
      {
        heading: 'Tiên thủ: đi trước là một lợi thế phải giữ',
        body: `Đỏ đi trước nên có **tiên thủ** – quyền chủ động đặt ra câu hỏi cho đối phương. Nhưng tiên thủ không tự giữ được: mỗi nước đi chậm, mỗi lần đi một quân hai ba lần mà không tạo ra đe dọa, là một lần trao quyền chủ động cho đối thủ.

Nguyên tắc **“đừng đi một quân nhiều lần”** có một ngoại lệ quan trọng: nếu mỗi nước đều tạo ra một đe dọa buộc đối phương phải đáp, thì đi lại quân đó vẫn là giữ tiên.

Ở biến **Xe qua hà** bên cạnh, Đỏ đưa Xe vượt sông để gây sức ép sớm. Đen không phòng thủ thụ động mà đáp lại bằng **Mã bàn hà** f5, cũng nhắm vào Tốt đỏ – cả hai bên đều có mục tiêu. Đây chính là cuộc **tranh tiên** mà em sẽ học kỹ ở bài “Tiên thủ và tranh tiên”.`,
        warning: 'Hậu thủ không có nghĩa là bị động. Bên đi sau phải tìm những nước vừa phòng thủ vừa tạo phản kích, nếu không sẽ bị dồn ép suốt ván.',
        diagram: {
          moves: '1. P2-5 M8.7 2. M2.3 X9-8 3. X1-2 M2.3 4. B7.1 B7.1 5. X2.6 M7.6',
          notes: [
            'Pháo đầu, qua ngòi Tốt e3 nhắm Tốt đầu e6.',
            'Bình phong mã bắt đầu bằng Mã g7.',
            'Mã g2 ra quân, dọn đường cho Xe.',
            'Xe đen ra lộ 8; Pháo h7 rời đi là lộ này thông.',
            'Xe đỏ ra lộ 2, nhìn thẳng vào Pháo h7.',
            'Mã c7 hoàn chỉnh bức bình phong.',
            'Tốt 7 mở chân cho Mã trái của Đỏ.',
            'Tốt 7 của Đen mở chân cho Mã g7.',
            'Xe qua hà (h0–h6): Xe đỏ vượt sông, đè lên trận địa Đen. Nó nhắm Tốt biên i6 đang không có quân bảo vệ và gây áp lực lên Pháo h7.',
            'Mã bàn hà (g7–f5): thay vì lo giữ Tốt, Đen phản kích – Mã f5 nhắm Tốt g3 không được bảo vệ và Tốt e3. Hai bên cùng có mục tiêu: đó là tranh tiên.',
          ],
          caption: 'Pháo đầu Xe qua hà đối Bình phong mã, Đen chơi Mã bàn hà: hai bên giành nhau quyền chủ động.',
        },
      },
    ],
    keyTakeaways: [
      'Khai cuộc có ba nhiệm vụ: xuất quân, tranh trung lộ, giữ cung an toàn.',
      'Lên Mã trước để ra Xe sớm; các lộ 2, 4, 6, 8 không có Tốt là đường đi lý tưởng của Xe.',
      'Luôn trả lời Pháo đầu bằng một nước giữ trung lộ; đừng bỏ mặc Tốt đầu.',
      'Giữ các quân liên kết, bảo vệ lẫn nhau; quân đứng lẻ là mục tiêu của đòn bắt đôi.',
      'Đừng đi một quân nhiều lần trừ khi mỗi nước đều tạo ra đe dọa – đó là cách giữ tiên thủ.',
    ],
  },

  // ───────────────────────────── 2. Xe ─────────────────────────────
  {
    id: 'xq-cl-xe',
    category: 'chien-luoc',
    title: 'Xe – quân mạnh nhất bàn cờ',
    subtitle: 'Lộ thông, Xe tuần hà, Xe qua hà, Xe hoành, Xe đè Mã và tránh Xe bị chặn',
    level: 2,
    icon: '🏯',
    minutes: 18,
    intro:
      'Người xưa nói: “Nhất Xe thập tử hàn” – một Xe đủ làm mười quân run sợ. Xe đi xa, đi nhanh, không bị cản chân như Mã, không cần ngòi như Pháo. Nhưng Xe cũng là quân dễ bị lãng phí nhất: nằm mãi ở góc, hoặc lao vào trận địa đối phương quá sớm rồi bị vây. Bài này dạy em đưa Xe tới đúng chỗ, đúng lúc.',
    sections: [
      {
        heading: 'Lộ thông: đường cao tốc của Xe',
        body: `Một **lộ thông** là cột không còn quân nào cản (đặc biệt là không có Tốt). Xe đứng trên lộ thông có thể lên tuần hà, qua hà, hoặc xuống tận hàng cuối của đối phương chỉ trong một nước.

Ở cờ tướng có một điều thú vị: các lộ 2, 4, 6, 8 **ngay từ đầu đã không có Tốt**. Lộ 2/8 bị Pháo che, lộ 4/6 chỉ có Sĩ ở cuối. Vì thế có hai cách ra Xe:

- **Trực xa:** Mã lên, Xe sang lộ 2 (hoặc 8) rồi chờ Pháo rời đi.
- **Hoành xa:** Xe tiến một bước rồi chạy ngang sang lộ 4 hoặc 6 – lộ “sĩ giác” nhìn thẳng vào cung đối phương.

Bên cạnh, Đỏ chọn Hoành xa: Xe i0 lên i1 rồi sang d1. Chỉ hai nước, Xe đã đứng trên một lộ thông suốt tới tận Sĩ d9 của Đen.`,
        diagram: {
          moves: '1. P2-5 M8.7 2. M2.3 X9-8 3. X1.1 M2.3 4. X1-6',
          notes: [
            'Pháo đầu, mở màn quen thuộc.',
            'Bình phong mã: Mã g7 giữ Tốt đầu.',
            'Mã g2 ra quân, dọn chỗ cho Xe i0.',
            'Xe đen ra lộ 8; Pháo h7 rời đi là lộ này thông.',
            '“Hoành xa”: thay vì sang lộ 2, Xe tiến một bước lên i1 để chuẩn bị chạy ngang.',
            'Đen hoàn thành thế Bình phong mã.',
            'Xe chạy ngang sang lộ 6 (cột d). Từ d1 tới d9 không còn quân nào cản: Xe có thể lên tuần hà, qua hà hoặc chuyển sang cánh khác tùy tình hình.',
          ],
          caption: 'Hoành xa: Xe đỏ chiếm lộ 6 chỉ sau hai nước.',
        },
      },
      {
        heading: 'Xe tuần hà: canh giữ bờ sông',
        body: `**Xe tuần hà** là Xe đứng ở hàng bờ sông phía mình (hàng 4 với Đỏ, hàng 5 với Đen). Từ đó Xe:

- Che chở các Tốt tiến lên bờ sông theo hàng ngang.
- Ngăn Mã, Tốt đối phương vượt sông.
- Sẵn sàng chạy ngang sang bất kỳ lộ nào vừa được mở.

Trong biến **Pháo đầu Xe tuần hà đối Bình phong mã** bên cạnh, Đen tiến Tốt 3 thách đổi. Đỏ đẩy Tốt 7 đón đầu: Tốt c4 có Xe h4 bảo vệ theo hàng ngang. Sau khi đổi Tốt, Xe ăn lại và chiếm luôn lộ c vừa được mở.`,
        tip: 'Xe tuần hà là thế “thủ mà công”: chưa vội xâm nhập, nhưng kiểm soát cả bờ sông và chờ thời cơ chuyển sang lộ thông.',
        diagram: {
          moves: '1. P2-5 M8.7 2. M2.3 X9-8 3. X1-2 M2.3 4. X2.4 B3.1 5. B7.1 B3.1 6. X2-7',
          notes: [
            'Pháo đầu nhắm Tốt e6.',
            'Mã g7 giữ Tốt đầu.',
            'Mã g2 dọn đường cho Xe phải.',
            'Xe đen ra lộ 8; Pháo h7 rời đi là lộ này thông.',
            'Xe đỏ ra lộ 2, đối diện Pháo h7.',
            'Thế Bình phong mã hoàn chỉnh.',
            'Xe tuần hà: Xe lên h4, đứng ngay bờ sông phía mình và kiểm soát cả hàng 4.',
            'Đen tiến Tốt 3 (c6–c5) để mở chân cho Mã c7 và thách đổi Tốt.',
            'Đỏ đẩy Tốt c3 lên c4 chạm trán Tốt c5. Tốt c4 có Xe h4 bảo vệ theo hàng ngang – đây chính là tác dụng của Xe tuần hà.',
            'Đen đổi Tốt: Tốt c5 ăn Tốt c4.',
            'Xe ăn lại Tốt và chiếm lộ 7 (cột c) vừa được mở. Xe nhìn thẳng vào Mã c7 – hiện Mã có Pháo h7 bảo vệ qua ngòi Mã g7, nhưng Đen phải luôn để mắt tới nó.',
          ],
          caption: 'Pháo đầu Xe tuần hà: Xe bảo vệ Tốt trên bờ sông rồi chiếm lộ vừa mở.',
        },
      },
      {
        heading: 'Xe qua hà và Xe đè Mã',
        body: `**Xe qua hà** (Xe vượt sông, thường lên hàng 6 với Đỏ) là cách chơi tấn công: Xe đè lên trận địa đối phương, nhắm vào Tốt và cản bước Mã. Biến **Pháo đầu Xe qua hà đối Bình phong mã bình pháo đổi Xe** dưới đây là một trong những hệ thống được nghiên cứu nhiều nhất.

Hãy chú ý hai ý tưởng:
- **Xe đè Mã:** Xe đỏ sang g6, đứng ngay trước Mã g7 – vừa tấn công Mã, vừa không cho Mã nhảy lên f5, h5 (vì g6 chính là chân Mã).
- **Đen đuổi Xe để giành nhịp:** Pháo bình sang i7 mở lộ h cho Xe đen thách đổi Xe; rồi Pháo lui i8 chuẩn bị sang g8 bắn Xe g6 qua ngòi Mã g7.

Xe qua hà mạnh nhưng luôn phải tính đường lui: một Xe sâu trong trận địa đối phương là mục tiêu để đối phương ra quân kèm đe dọa.`,
        diagram: {
          moves: '1. P2-5 M8.7 2. M2.3 X9-8 3. X1-2 B7.1 4. X2.6 M2.3 5. B7.1 P8-9 6. X2-3 P9/1 7. M8.7 S4.5',
          notes: [
            'Pháo đầu, qua ngòi Tốt e3 nhắm Tốt đầu e6.',
            'Mã g7 giữ Tốt đầu.',
            'Mã g2 ra quân, mở đường cho Xe i0.',
            'Xe đen ra lộ 8; Pháo h7 rời đi là lộ này thông.',
            'Xe đỏ ra lộ 2, nhìn thẳng vào Pháo h7.',
            'Đen tiến Tốt 7 sớm: mở chân Mã g7, đồng thời kìm Tốt g3 – mà Tốt g3 chưa tiến thì Mã g2 của Đỏ chưa nhảy lên f4, h4 được.',
            'Xe qua hà: Xe vượt sông lên h6, nhắm Tốt i6 không được bảo vệ và gây sức ép lên Pháo h7.',
            'Mã c7 ra quân, cùng Mã g7 giữ Tốt đầu.',
            'Tốt 7 mở chân cho Mã trái của Đỏ.',
            'Bình pháo đổi Xe: Pháo rời h7 sang i7, lộ h mở ra và Xe h9 đối mặt Xe h6. Xe đỏ không có quân nào bảo vệ – Đỏ phải đổi Xe hoặc tránh đi.',
            'Xe đè Mã: Xe tránh sang g6, đứng ngay trước Mã g7 – chặn chân Mã và tấn công nó. Mã g7 vẫn an toàn vì Pháo b7 bảo vệ qua ngòi Mã c7.',
            'Pháo lui về i8, chuẩn bị bình sang g8 để bắn Xe g6 qua ngòi Mã g7 – Đen đuổi Xe để giành lại nhịp.',
            'Đỏ không vội, lên Mã c2 hoàn thành phát triển cánh trái.',
            'Đen lên Sĩ củng cố cung, chờ thời cơ đuổi Xe.',
          ],
          caption: 'Pháo đầu Xe qua hà đối Bình phong mã bình pháo đổi Xe – một trong những cách chơi phổ biến nhất.',
        },
      },
      {
        heading: 'Xe qua hà phải có đường lui',
        body: `Tiếp tục thế cờ ở phần trên. Xe đỏ ở g6 rất khó chịu cho Đen, nhưng nó cũng là **mục tiêu**: mỗi lần Đen đuổi được Xe bằng một nước ra quân hữu ích, Đen giành lại một nhịp.

Hãy xem Xe đỏ bị đuổi ra sao:
- Pháo đen sang g8, bắn Xe g6 qua ngòi Mã g7 – Xe không có quân bảo vệ nên phải đi.
- Xe tránh sang f6 (lộ 4), vẫn đứng trên hàng 6 và nhìn thẳng vào cung đen – một chỗ lui **tích cực**.
- Ngay khi Xe rời g6, Mã g7 được “giải phóng” nhảy lên h5, nhắm hai Tốt g3, i3 của Đỏ.

Bài học: khi đưa Xe vào sâu, hãy tính trước **ô lui** của nó, và ưu tiên ô lui vẫn giữ được sức ép (như f6 ở đây) thay vì lui hẳn về nhà.`,
        tip: 'Xe ở thế “đè” (ngay trước Mã, Pháo đối phương) phát huy tác dụng nhất khi đối phương không có nước ra quân nào vừa đuổi được Xe. Nếu có, hãy chuẩn bị sẵn ô lui.',
        diagram: {
          fen: 'r1b1kabr1/4a3c/1cn3n2/p1p1p1R1p/6p2/2P6/P3P1P1P/1CN1C1N2/9/R1BAKAB2 w - - 14 8',
          moves: '8. M7.6 P9-7 9. X3-4 M7.8',
          notes: [
            'Mã bàn hà (c2–d4): Mã trái của Đỏ lên bờ sông, nhắm Tốt c6 đang không được bảo vệ và tham gia sức ép lên Tốt đầu.',
            'Pháo bình sang g8: qua ngòi Mã g7, Pháo bắn thẳng vào Xe g6 không có quân bảo vệ. Đen đuổi Xe bằng một nước ra quân hữu ích.',
            'Xe tránh sang f6 (lộ 4): vẫn ở trên hàng 6, nhìn thẳng vào Sĩ f9 và giữ sức ép lên Tốt đầu – một ô lui tích cực.',
            'Mã g7 được giải phóng, nhảy lên h5 nhắm Tốt g3 (đang bị cả Pháo g8 nhắm qua ngòi Tốt g5) và Tốt i3. Hai bên đều có mục tiêu, thế cờ cân bằng động.',
          ],
          caption: 'Xe qua hà bị Pháo đuổi: chọn ô lui vẫn giữ được sức ép.',
        },
      },
      {
        heading: 'Đừng để Xe bị chặn',
        body: `Xe mạnh bao nhiêu thì khi bị chặn lại phí bấy nhiêu. Có hai kiểu Xe “chết” thường gặp:

- **Xe bị phong (bị chặn):** một quân đối phương được bảo vệ đứng ngay trước mặt Xe, Xe ăn nó thì đổi lỗ, không ăn thì không có đường ra. Ví dụ: Pháo đen tiến 4 (h7–h3), đứng chặn ngay trước Xe h0.
- **Xe bị nhốt:** Xe lao sâu vào trận địa đối phương để ăn Tốt, rồi bị Mã, Tượng, Pháo bao vây không còn đường lui.

Cách chữa khi một Xe bị chặn: **đưa Xe còn lại vào cuộc** và tìm cách đuổi quân chặn đi. Bên cạnh, Xe phải của Đỏ bị Pháo h3 phong lại. Đỏ không nóng vội đổi Xe lấy Pháo, mà lên Mã biên, bình Pháo sang c2 (thế Ngũ thất pháo) để mở đường cho Xe trái.`,
        warning: 'Trước khi đưa Xe vào sâu ăn Tốt, hãy đếm xem Xe còn bao nhiêu đường lui. Một Xe chỉ còn một ô để chạy là Xe sắp bị nhốt.',
        diagram: {
          moves: '1. P2-5 M8.7 2. M2.3 X9-8 3. X1-2 M2.3 4. B7.1 P8.4 5. M8.9 B7.1 6. P8-7 X1-2 7. X9-8',
          notes: [
            'Pháo đầu, qua ngòi Tốt e3 nhắm Tốt đầu e6.',
            'Mã g7 giữ Tốt đầu.',
            'Mã g2 ra quân, mở đường cho Xe i0.',
            'Xe đen ra lộ 8; Pháo h7 rời đi là lộ này thông.',
            'Xe đỏ ra lộ 2, nhìn thẳng vào Pháo h7.',
            'Bình phong mã hoàn chỉnh.',
            'Tốt 7 mở chân Mã trái.',
            'Pháo đen tiến 4 (h7–h3), đứng chắn ngay trước Xe đỏ. Xe h0 chỉ còn lên được h1, h2, hoặc ăn Pháo – nhưng Pháo h3 có Xe h9 bảo vệ, ăn là đổi Xe lấy Pháo, lỗ nặng.',
            'Không nóng vội: Đỏ lên Mã biên a2, nhường chỗ để Pháo trái chuyển sang và Xe trái ra quân.',
            'Đen tiến Tốt 7 mở chân Mã g7.',
            'Pháo sang c2 (thế Ngũ thất pháo), qua ngòi Tốt c4 nhắm Tốt c6 chưa được bảo vệ. Quan trọng hơn: cột b đã trống cho Xe trái.',
            'Đen cũng ra Xe trái sang lộ 2, bảo vệ Pháo b7.',
            'Xe trái của Đỏ ra lộ 8, đối mặt Pháo b7. Một Xe bị phong thì Xe kia gánh việc – Đỏ vẫn có quân lớn hoạt động.',
          ],
          caption: 'Xe phải bị Pháo phong, Đỏ đưa Xe trái vào cuộc.',
        },
      },
    ],
    keyTakeaways: [
      'Xe cần lộ thông; các lộ 2, 4, 6, 8 không có Tốt nên là đường ra tự nhiên của Xe.',
      'Trực xa đi thẳng lên lộ 2/8, Hoành xa chạy ngang sang lộ 4/6 – chọn cách phù hợp với thế cờ.',
      'Xe tuần hà giữ bờ sông và che chở Tốt; Xe qua hà đè lên trận địa đối phương nhưng phải luôn có đường lui.',
      'Xe qua hà phải luôn có ô lui; ưu tiên ô lui vẫn giữ được sức ép.',
      'Khi một Xe bị chặn, đưa Xe còn lại vào cuộc thay vì đổi lỗ.',
    ],
  },

  // ───────────────────────────── 3. Mã ─────────────────────────────
  {
    id: 'xq-cl-ma',
    category: 'chien-luoc',
    title: 'Mã – chân thông thì mạnh, chân què thì yếu',
    subtitle: 'Điểm đứng tốt và xấu, Mã bàn hà, Mã giữa, Mã ngọa tào và Mã ở tàn cuộc',
    level: 2,
    icon: '🐴',
    minutes: 16,
    intro:
      'Mã cờ tướng đi chữ “nhật” nhưng có một nhược điểm chết người: nếu ô sát bên theo hướng đi (gọi là “chân Mã”) có quân đứng, Mã không nhảy được về hướng đó. Một con Mã bị cản chân khắp nơi người ta gọi đùa là “Mã què”. Bài này giúp em biết Mã đứng đâu thì mạnh, đâu thì yếu, và cách dùng Mã ở từng giai đoạn của ván cờ.',
    sections: [
      {
        heading: 'Chân Mã: Mã què và Mã thông',
        body: `Muốn đánh giá một con Mã, hãy đếm **số nước nó có thể đi tới**, đặc biệt là các nước tiến. Ở thế cờ bên cạnh (sau bốn nước Pháo đầu – Bình phong mã):

- **Mã g7 của Đen** đã “thông chân”: Tốt g6 vừa tiến lên g5 nên Mã có thể nhảy f5 hoặc h5.
- **Mã c7 của Đen** còn bị Tốt c6 cản chân, chỉ lui được về b9 hoặc e8.
- **Mã g2 của Đỏ** bị chính Tốt g3 cản chân: nó không có một nước tiến nào, chỉ lui được về e1 hoặc i1. Còn Tốt g3 lại khó tiến vì Tốt g5 của Đen đang chờ sẵn – đó là lý do Đen tiến Tốt 7 sớm.

Quân cản chân Mã có thể là quân của mình (Tốt, Tượng, Sĩ) hoặc quân đối phương. Vì vậy, các nước Tốt 3/7 ở khai cuộc thường không nhằm tấn công, mà để **mở chân cho Mã**.`,
        tip: 'Trước khi nhảy Mã tới một điểm, hãy nhìn bốn ô chân của điểm đó: ô nào đang có quân, hoặc dễ bị đối phương đặt quân vào? Mã đến chỗ dễ bị cản chân thì sớm muộn cũng thành Mã què.',
        diagram: {
          fen: 'r1bakabr1/9/1cn3nc1/p1p1p3p/6p2/2P6/P3P1P1P/1C2C1N2/9/RNBAKABR1 w - - 8 5',
          arrows: ['g7f5:green', 'g7h5:green'],
          highlights: ['g3:red', 'c6:red', 'g2:yellow', 'c7:yellow'],
          caption: 'Ô đỏ: quân đang cản chân Mã (Tốt g3 cản Mã g2, Tốt c6 cản Mã c7). Mã g7 đã thông chân.',
        },
      },
      {
        heading: 'Mã bàn hà: đứng ở bờ sông',
        body: `**Mã bàn hà** là Mã đứng ở bờ sông phía mình (hàng 4 với Đỏ, hàng 5 với Đen), thường là các điểm d4, f4 (hoặc d5, f5 với Đen). Từ đây Mã:

- Sẵn sàng vượt sông tấn công Tốt và Mã đối phương.
- Kiểm soát các điểm qua sông, ngăn quân đối phương tiến lên.
- Vẫn đủ gần để quay về phòng thủ khi cần.

Bên cạnh là một cách chơi phổ biến của Đỏ: tiến Tốt 7 để mở chân, lên Mã c2 rồi nhảy tiếp lên d4. Mã d4 lập tức nhắm Tốt c6 đang không được bảo vệ và tham gia sức ép lên Tốt đầu e6.`,
        diagram: {
          moves: '1. P2-5 M8.7 2. M2.3 X9-8 3. X1-2 M2.3 4. B7.1 B7.1 5. M8.7 T3.5 6. M7.6',
          notes: [
            'Pháo đầu, qua ngòi Tốt e3 nhắm Tốt đầu e6.',
            'Mã g7 giữ Tốt đầu.',
            'Mã g2 ra quân, mở đường cho Xe i0.',
            'Xe đen ra lộ 8; Pháo h7 rời đi là lộ này thông.',
            'Xe đỏ ra lộ 2, nhìn thẳng vào Pháo h7.',
            'Bình phong mã hoàn chỉnh.',
            'Tiến Tốt 7 (c3–c4): mở chân cho Mã trái.',
            'Đen cũng mở chân cho Mã g7.',
            'Mã trái lên c2. Nhờ Tốt c3 đã đi, Mã c2 giờ có đường tiến lên d4 hoặc b4.',
            'Đen lên Tượng (c9–e7): hai Tượng e7, g9 liên kết, Tượng e7 còn che chở Tốt g5.',
            'Mã bàn hà: Mã c2 nhảy lên d4. Từ bờ sông, Mã nhắm Tốt c6 không có quân bảo vệ và Tốt đầu e6, sẵn sàng vượt sông khi có cơ hội.',
          ],
          caption: 'Mã bàn hà d4 – một điểm đứng lý tưởng của Mã ở trung cuộc.',
        },
      },
      {
        heading: 'Mã giữa: sau lưng Tốt đầu',
        body: `Khi Đỏ chơi tấn công trung lộ (đẩy Tốt đầu), Mã thường được đưa vào **lộ giữa**, đứng ngay sau lưng Tốt đầu ở e3. Mã giữa có hai tác dụng:

- Làm **ngòi** cho Pháo đầu: qua Mã e3, Pháo e2 bảo vệ Tốt đầu khi nó vượt sông.
- Khi Tốt đầu tiến lên, chân Mã ở e4 được giải phóng, Mã có ngay đường nhảy d5, f5 – những điểm sát trung tâm trận địa đối phương.

Hãy phân biệt với Mã đứng **giữa cung** (e1 với Đỏ, e8 với Đen): ở đó Mã chắn đường Tướng, chắn chỗ của Sĩ và rất khó ra – đó là một điểm đứng xấu, chỉ dùng tạm khi phòng thủ.`,
        warning: 'Mã lui về giữa cung (e1/e8) để phòng thủ thì được, nhưng đừng để nó nằm đó lâu: Tướng mất chỗ chạy, Sĩ mất chỗ lên, và Mã gần như không làm được gì.',
        diagram: {
          fen: '2b1kabr1/3ra4/1cn3nc1/p1p1p1p1p/9/4P4/P1P1N1P1P/1C2C1N2/9/R1BAKABR1 w - - 12 7',
          moves: '7. B5.1',
          notes: [
            'Tốt đầu vượt sông (e4–e5), có Pháo e2 bảo vệ qua ngòi Mã e3. Chân Mã e3 ở e4 đã trống: Mã giữa giờ có thể nhảy lên d5 hoặc f5.',
          ],
          caption: 'Mã giữa e3: ngòi của Pháo đầu và bàn đạp tấn công trung lộ.',
        },
      },
      {
        heading: 'Mã ngọa tào: con Mã trong trận địa đối phương',
        body: `**Mã ngọa tào** là Mã đứng ở điểm thứ 3 hoặc thứ 7 trên hàng thứ hai của đối phương (c8 hoặc g8 khi Đỏ tấn công). Từ đó Mã chiếu thẳng vào Tướng ở e9 (nếu chân Mã ở d8/f8 trống), đồng thời khống chế e7 – ô Tướng hay dùng để chạy.

Một mình Mã ngọa tào chưa đủ, nhưng kết hợp với một Xe thì rất nguy hiểm. Bên cạnh, Đen còn đủ Sĩ Tượng, nhưng chính hai Sĩ ở d9, f9 lại chặn đường chạy của Tướng:
- Mã nhảy vào g8 chiếu, Tướng chỉ còn đường lên e8.
- Xe xuống hàng 8 chiếu nốt: Tướng không về được e9, không lên được e7 (cả hai đều bị Mã khống chế), không sang ngang được (Xe khống chế cả hàng).`,
        tip: 'Khi Mã đối phương lăm le vào điểm ngọa tào của em (c1/g1 với Đỏ), hãy để ý các ô chân Mã d1/f1, và luôn có một quân sẵn sàng ăn Mã ở điểm đó.',
        diagram: {
          fen: '2bakab2/9/9/p1p4Np/9/r8/4P4/9/9/1R2K4 w - - 0 1',
          moves: '1. M2.3 Tg5.1 2. X8.8',
          notes: [
            'Mã ngọa tào: Mã từ h6 nhảy vào g8 chiếu Tướng (chân Mã ở f8 đang trống). Hai Sĩ d9, f9 chắn lối, nên Đen chỉ còn đúng một nước.',
            'Tướng buộc phải lên e8.',
            'Xe xuống b8 chiếu theo hàng ngang. Tướng không về e9, không lên e7 (Mã g8 khống chế cả hai), không sang d8, f8 (Xe khống chế cả hàng). Chiếu bí!',
          ],
          caption: 'Mã ngọa tào phối hợp với Xe: chiếu bí sau hai nước.',
        },
      },
      {
        heading: 'Mã ở tàn cuộc: ít quân, Mã càng mạnh',
        body: `Ở khai cuộc và trung cuộc, bàn cờ đông quân nên Mã hay bị cản chân, còn Pháo lại dễ tìm ngòi. Sang tàn cuộc thì ngược lại:

- Bàn cờ thưa, **Mã ít bị cản chân**, có thể tới gần như mọi nơi và bắt đôi rất hiểm.
- Pháo **thiếu ngòi**: không có quân đứng giữa, Pháo không ăn được, cũng không chiếu được.

Vì vậy người ta hay nói: **tàn cuộc Mã mạnh hơn Pháo**. Bên cạnh, Mã đỏ nhảy vào d7 vừa chiếu Tướng vừa nhắm Pháo f6. Pháo đen không có ngòi nên chẳng làm gì được, và Đỏ thắng quân.`,
        diagram: {
          fen: '4k4/9/9/p4c3/2P1N4/9/9/9/9/5K3 w - - 0 1',
          moves: '1. M5.6 Tg5-4 2. M6/4',
          notes: [
            'Mã nhảy vào d7 chiếu Tướng và đồng thời nhắm Pháo f6 – một đòn bắt đôi. Không quân đen nào chặn được chân Mã ở d8 hay ăn được Mã.',
            'Tướng phải chạy.',
            'Mã lui ăn Pháo. Mã, Tốt đối Tướng đơn: máy tìm được đường chiếu bí bắt buộc chỉ trong vòng sáu nước nữa.',
          ],
          caption: 'Tàn cuộc: Mã linh hoạt bắt đôi, Pháo không ngòi đành chịu chết.',
        },
      },
    ],
    keyTakeaways: [
      'Đánh giá Mã bằng số nước nó có thể đi, nhất là các nước tiến; Mã bị cản chân khắp nơi là “Mã què”.',
      'Các nước Tốt 3/7 ở khai cuộc thường để mở chân cho Mã.',
      'Mã bàn hà (d4/f4) và Mã giữa (sau lưng Tốt đầu) là những điểm đứng tích cực; Mã giữa cung là điểm đứng xấu.',
      'Mã ngọa tào (c8/g8) phối hợp với Xe là một hình chiếu bí rất phổ biến.',
      'Càng về tàn cuộc, Mã càng mạnh vì bàn cờ thưa, còn Pháo thiếu ngòi.',
    ],
  },

  // ───────────────────────────── 4. Pháo ─────────────────────────────
  {
    id: 'xq-cl-phao',
    category: 'chien-luoc',
    title: 'Pháo – quân cần ngòi',
    subtitle: 'Pháo đầu, Pháo tuần hà, Pháo đáy, Pháo sĩ giác và nghệ thuật tìm ngòi',
    level: 2,
    icon: '💥',
    minutes: 16,
    intro:
      'Pháo đi như Xe nhưng ăn quân phải nhảy qua đúng một quân làm “ngòi”. Vì thế giá trị của Pháo thay đổi rất nhiều theo thế cờ: lúc đầu ván, quân đông, ngòi ở khắp nơi – Pháo rất mạnh; về cuối ván, quân thưa – Pháo hay thất nghiệp. Bài này dạy em những vị trí kinh điển của Pháo và cách “tìm ngòi” cho nó.',
    sections: [
      {
        heading: 'Pháo đầu: hạt nhân của tấn công trung lộ',
        body: `Pháo đầu (Trung pháo) mạnh vì nó nhắm thẳng vào lộ giữa – nơi có Tướng. Ngoài việc đe dọa Tốt đầu, Pháo đầu còn:

- **Khống chế lộ giữa:** đối phương phải luôn cẩn thận khi đặt quân vào lộ giữa, vì quân đó có thể trở thành ngòi cho Pháo.
- **Làm hạt nhân cho tấn công trung lộ:** kết hợp với Tốt đầu, Mã giữa và Xe.

Bên cạnh là một kiểu tấn công trung lộ quen thuộc: Đỏ đẩy Tốt đầu, đưa Mã vào e3, rồi cho Tốt vượt sông. Tốt e5 có Pháo e2 bảo vệ qua ngòi Mã e3 – ba quân tạo thành một mũi nhọn chĩa thẳng vào cung Đen.`,
        diagram: {
          moves: '1. P2-5 M8.7 2. M2.3 X9-8 3. X1-2 M2.3 4. B5.1 S4.5 5. M8.7 X1.1 6. M7.5 X1-4 7. B5.1',
          notes: [
            'Pháo đầu nhắm Tốt e6.',
            'Mã g7 giữ Tốt đầu.',
            'Mã g2 ra quân, mở đường cho Xe i0.',
            'Xe đen ra lộ 8; Pháo h7 rời đi là lộ này thông.',
            'Xe đỏ ra lộ 2, nhìn thẳng vào Pháo h7.',
            'Hai Mã cùng giữ Tốt đầu.',
            'Tiến Tốt đầu (e3–e4): Đỏ chọn hướng tấn công trung lộ. Tốt sẽ tiếp tục tiến để mở đường cho Pháo và Mã.',
            'Đen lên Sĩ, củng cố cung trước sức ép ở lộ giữa.',
            'Mã trái lên c2, chuẩn bị nhảy vào lộ giữa.',
            'Đen ra Xe trái theo kiểu hoành xa.',
            'Mã giữa: Mã c2 nhảy vào e3, ngay sau lưng Tốt đầu, vừa làm ngòi cho Pháo e2 vừa chờ Tốt tiến lên để có đường nhảy.',
            'Xe hoành sang lộ 4, nhìn xuống Sĩ d0.',
            'Tốt đầu vượt sông (e4–e5), áp sát Tốt e6. Tốt e5 có Pháo e2 bảo vệ qua ngòi Mã e3: Pháo đầu, Mã giữa, Tốt đầu phối hợp thành một mũi nhọn ở trung lộ.',
          ],
          caption: 'Pháo đầu – Bình phong mã: Đỏ chọn tấn công trung lộ.',
        },
      },
      {
        heading: 'Pháo tuần hà: canh giữ bờ sông',
        body: `**Pháo tuần hà** là Pháo đứng ở bờ sông phía mình (hàng 4 với Đỏ). Khác với Xe, Pháo không khống chế những ô sát nó, mà khống chế **những ô phía sau ngòi**.

Ở thế cờ minh họa bên cạnh, Pháo b4 lấy Tốt c4 làm ngòi nên khống chế cả dãy d4, e4… cho tới i4. Mã h6 của Đen muốn vượt sông ở g4 hay i4 đều sẽ bị Pháo ăn.

Ngoài ra Pháo tuần hà rất linh hoạt: có thể bình ngang sang bất cứ lộ nào để làm Pháo đầu thứ hai, hoặc lui về phòng thủ cung Tướng.`,
        tip: 'Khi nhìn một quân Pháo, đừng chỉ nhìn những ô quanh nó – hãy tìm ngòi rồi nhìn dãy ô phía sau ngòi. Đó mới là “vùng hỏa lực” của Pháo.',
        diagram: {
          fen: 'r1bakab1r/9/1cn4c1/p1p1p2np/9/1CP6/P3P3P/2N1C1N2/9/R1BAKAB1R b - - 0 1',
          arrows: ['b4i4', 'h6g4:red', 'h6i4:red'],
          highlights: ['c4:yellow', 'g4:green', 'i4:green'],
          caption: 'Thế cờ minh họa: qua ngòi Tốt c4, Pháo tuần hà b4 khống chế cả bờ sông.',
        },
      },
      {
        heading: 'Pháo đáy: khóa chặt Sĩ Tượng',
        body: `**Pháo đáy** (Trầm để pháo) là Pháo xuống tận hàng cuối của đối phương. Ở đó Pháo thường lấy chính Tượng hoặc Sĩ đối phương làm ngòi, và tác dụng lớn nhất của nó là **khóa** các quân phòng thủ: quân làm ngòi, hay quân đứng giữa ngòi và Tướng, đều không dám rời chỗ vì rời đi là Tướng bị chiếu.

Bên cạnh, Pháo a9 lấy Tượng c9 làm ngòi, nhắm thẳng Sĩ d9 – và nếu Sĩ d9 rời chỗ, Pháo nhắm vào Tướng. Kết quả:
- Sĩ d9 và Tượng c9 không được rời chỗ.
- Khi Xe đỏ chiếu ở lộ giữa, Đen chỉ còn đúng một cách che – và sau đó là chiếu bí.`,
        diagram: {
          fen: 'C1bakab2/5P3/9/p7p/9/9/P7P/9/R8/5K3 w - - 0 1',
          moves: '1. X9-5 S6.5 2. X5.7',
          notes: [
            'Xe sang lộ giữa chiếu Tướng. Đen tưởng có nhiều cách che, nhưng: Sĩ d9 hay Tượng c9 rời chỗ thì Tướng lộ trước Pháo đáy; Tượng g9 không lên được vì Tốt f8 chặn mắt Tượng. Chỉ còn một nước hợp lệ.',
            'Nước duy nhất: Sĩ f9 lên e8 che chiếu.',
            'Xe ăn Sĩ e8, có Tốt f8 bảo vệ. Tướng không sang f9 được (Tốt f8 khống chế), Sĩ d9 cũng không dám ăn Xe vì rời d9 là Tướng bị Pháo đáy chiếu. Chiếu bí!',
          ],
          caption: 'Pháo đáy a9 khóa Sĩ d9 và Tượng c9, Xe và Tốt kết liễu.',
        },
      },
      {
        heading: 'Pháo sĩ giác: thế vững chãi',
        body: `Không phải lúc nào Pháo cũng cần lao lên. **Sĩ giác pháo** – Pháo đặt ở góc trên của cung (d2 hoặc f2, ngay trước Sĩ) – là một khai cuộc mềm dẻo:

- Pháo không chắn đường Xe, không cản chân Mã.
- Pháo đứng gần cung nên giúp phòng thủ, và có thể bình sang lộ giữa hay lộ 7, lộ 3 khi cần.

Hãy chú ý thứ tự nước đi: khi Đen đáp bằng Pháo đầu, Đỏ phải lên Mã g2 trước để giữ Tốt đầu. Và xem Pháo d2 làm nhiệm vụ phòng thủ ra sao: khi Xe đen ra lộ 8 nhắm Pháo h2, chính Pháo d2 bảo vệ Pháo h2 qua ngòi Mã g2.`,
        warning: 'Ở Sĩ giác pháo, nếu Đỏ ra Mã trái trước (2. M8.7?), Pháo đầu của Đen ăn ngay Tốt e3 đang không có quân bảo vệ.',
        diagram: {
          moves: '1. P8-6 P8-5 2. M2.3 M8.7 3. M8.7 X9-8 4. X9-8 M2.3',
          notes: [
            'Sĩ giác pháo: Pháo trái sang d2, góc trên của cung. Pháo không đe dọa ngay, nhưng giữ thế vững và mềm dẻo.',
            'Đen đáp bằng Pháo đầu, nhắm Tốt e3 đang không có quân bảo vệ.',
            'Mã g2 giữ Tốt đầu – nước đi đúng thứ tự.',
            'Đen giữ Tốt đầu bằng Mã g7.',
            'Mã trái lên c2, nhường đường cho Xe a0.',
            'Xe đen ra lộ 8, nhìn thẳng xuống Pháo h2. Pháo h2 vẫn an toàn: Pháo d2 bảo vệ nó qua ngòi Mã g2.',
            'Xe trái của Đỏ ra lộ 8 (cột b) – lộ đã trống vì Pháo b2 dời đi – nhìn thẳng vào Pháo b7.',
            'Mã c7 ra quân, và Pháo b7 giờ được Pháo e7 bảo vệ qua ngòi Mã c7. Hai bên đều dùng Pháo để che chở cho nhau.',
          ],
          caption: 'Sĩ giác pháo đối Pháo đầu: Pháo cũng có thể là quân phòng thủ.',
        },
      },
      {
        heading: 'Tìm ngòi – và Pháo hay Mã theo giai đoạn ván cờ',
        body: `Pháo không có ngòi thì không ăn được quân. Vì vậy một kỹ năng quan trọng là **tự tạo ngòi**: đưa một quân của mình vào giữa Pháo và mục tiêu, đúng lúc quân đó cũng tạo ra đe dọa khác.

Bên cạnh, Pháo e2 đang nhắm lộ giữa nhưng chưa có ngòi. Mã d2 (đang bị Xe d6 nhắm) nhảy vào e4: chính nó thành ngòi để Pháo chiếu Tướng, đồng thời nhắm Xe d6. Đen phải che chiếu và mất Xe.

**Pháo hay Mã?** Kinh nghiệm chung:
- Khai cuộc, trung cuộc (nhiều quân, nhiều ngòi): Pháo thường mạnh hơn Mã.
- Tàn cuộc (ít quân): Mã thường mạnh hơn Pháo. Pháo muốn chiếu bí thường phải nhờ Sĩ, Tướng của mình làm ngòi.`,
        tip: 'Khi tính toán, hãy hỏi: “Nước này có tạo ra ngòi mới cho Pháo của mình không? Có lấy mất ngòi của Pháo đối phương không?” Một quân đổi chỗ có thể bật hoặc tắt sức mạnh của cả hai khẩu Pháo.',
        diagram: {
          fen: '2bakab2/9/2n4c1/p1pr2p1p/9/9/P1P3P1P/3NC4/4A4/R1BA1KB2 w - - 0 1',
          moves: '1. M6.5 M3/5 2. M5.6',
          notes: [
            'Mã nhảy vào e4 – chính nó thành ngòi để Pháo e2 chiếu Tướng! Cùng lúc Mã e4 nhắm Xe d6 đang không có quân bảo vệ.',
            'Đen phải che chiếu: Mã c7 lui về e8 chen vào lộ giữa (giữa Pháo và Tướng có hai quân thì Pháo không chiếu được). Mã e8 cũng kịp bảo vệ Xe d6.',
            'Mã ăn Xe – và lại chiếu, vì Mã e8 giờ là ngòi duy nhất cho Pháo e2. Mã e8 ăn lại thì hết chiếu, nhưng Đỏ đã đổi một Mã lấy một Xe – lời lớn nhờ một nước tạo ngòi đúng lúc.',
          ],
          caption: 'Tự tạo ngòi: Mã vừa làm ngòi cho Pháo chiếu, vừa bắt Xe.',
        },
      },
    ],
    keyTakeaways: [
      'Pháo đầu khống chế lộ giữa và là hạt nhân của tấn công trung lộ cùng Tốt đầu, Mã giữa.',
      'Vùng hỏa lực của Pháo nằm phía sau ngòi; Pháo tuần hà dùng điều đó để canh giữ bờ sông.',
      'Pháo đáy khóa Sĩ Tượng đối phương: quân làm ngòi hay đứng trước Tướng không dám rời chỗ.',
      'Pháo sĩ giác là thế vững, mềm dẻo; Pháo cũng có thể làm quân phòng thủ.',
      'Biết tự tạo ngòi đúng lúc; khai cuộc Pháo thường mạnh hơn Mã, tàn cuộc thì ngược lại.',
    ],
  },

  // ───────────────────────────── 5. Tốt ─────────────────────────────
  {
    id: 'xq-cl-tot',
    category: 'chien-luoc',
    title: 'Tốt – nhỏ mà có võ',
    subtitle: 'Tiên nhân chỉ lộ, Tốt qua hà, Tốt liên kết, đổi Tốt và vai trò Tốt 3/7, Tốt đầu',
    level: 2,
    icon: '🪖',
    minutes: 15,
    intro:
      'Tốt chỉ đi từng bước, chưa qua sông thì chỉ biết tiến thẳng, và không bao giờ lùi. Nhưng các kỳ thủ có câu “Tốt qua hà bằng nửa Xe”. Ở khai cuộc, mỗi nước Tốt quyết định đường đi của Mã, Xe; ở tàn cuộc, một con Tốt qua sông có thể quyết định thắng thua. Bài này giúp em hiểu khi nào nên tiến Tốt, khi nào nên đổi Tốt, và vì sao một con Tốt nhỏ bé lại có thể kìm chân cả một con Mã.',
    sections: [
      {
        heading: 'Tiên nhân chỉ lộ: nước Tốt mở đường',
        body: `**Tiên nhân chỉ lộ** (“tiên ông chỉ đường”) là khai cuộc 1. B7.1 – tiến Tốt 7 ngay nước đầu. Nước này không tấn công ai cả, nhưng:

- **Mở chân cho Mã trái:** khi Mã lên c2, đường lên d4 đã sẵn.
- **Thăm dò đối phương:** Đỏ chưa vội quyết định đặt Pháo đầu hay đi thế khác, chờ xem Đen đáp thế nào.

Một cách đáp phổ biến của Đen là **Tốt để pháo**: Pháo sang c7, nằm ngay dưới Tốt c6 và qua ngòi Tốt đó nhắm Tốt c4. Đỏ lên Tượng để giữ Tốt, rồi tận dụng con đường đã mở cho Mã.`,
        tip: 'Mỗi nước Tốt ở khai cuộc nên trả lời được câu hỏi: “Nó mở đường cho quân nào?”. Tốt 3/7 mở chân Mã, Tốt biên (1/9) mở đường cho Xe biên, Tốt đầu mở đường cho Mã giữa và tấn công trung lộ.',
        diagram: {
          moves: '1. B7.1 P2-3 2. T3.5 M2.1 3. M8.7 X1-2 4. M7.6 M8.7',
          notes: [
            'Tiên nhân chỉ lộ: tiến Tốt 7 (c3–c4), mở chân cho Mã trái và chờ xem Đen đáp ra sao.',
            'Tốt để pháo: Pháo đen sang c7, ngay dưới Tốt c6, qua ngòi Tốt đó nhắm Tốt c4 đang chưa có quân bảo vệ.',
            'Đỏ lên Tượng (g0–e2): Tượng e2 với mắt Tượng d3 trống bảo vệ được Tốt c4.',
            'Điểm c7 đã bị Pháo chiếm nên Mã trái của Đen đành ra biên a7.',
            'Nhờ Tốt c3 đã đi, Mã trái của Đỏ lên c2 với đường lên d4 rộng mở.',
            'Xe đen ra lộ 2, nhắm Pháo b2 – lúc này Pháo b2 chưa có quân nào bảo vệ.',
            'Mã nhảy lên d4: nhắm Tốt đầu e6 đang không được bảo vệ, đồng thời rời khỏi c2 để Pháo h2 bảo vệ được Pháo b2 (qua ngòi Tượng e2). Một nước, hai việc.',
            'Đen lên Mã giữ Tốt đầu. Mọi sự linh hoạt của Mã d4 đều bắt đầu từ nước Tốt đầu tiên của ván.',
          ],
          caption: 'Tiên nhân chỉ lộ đối Tốt để pháo: nước Tốt đầu tiên mở đường cho Mã.',
        },
      },
      {
        heading: 'Tốt qua hà: “bằng nửa Xe”',
        body: `Khi chưa qua sông, Tốt chỉ có một nước: tiến thẳng. Qua sông rồi, Tốt được **đi ngang**, có tới ba hướng (tiến, sang trái, sang phải). Vì vậy:

- Tốt qua hà **khống chế** hai ô bên cạnh và ô trước mặt – Mã, Pháo đối phương không dám đứng ở đó.
- Tốt qua hà có thể **đuổi** quân lớn: Mã, Xe, Pháo bị một con Tốt tấn công thì phải chạy, dù quân đó đắt hơn nhiều.

Ở thế cờ minh họa bên cạnh, Tốt g5 của Đỏ đã qua sông. Chỉ một bước tiến lên g6, nó tấn công Mã g7 và đồng thời đứng đúng chân Mã (g6) – Mã không còn đường f5, h5, chỉ còn cách lui về e8 giữa cung.`,
        warning: 'Đừng đẩy Tốt qua sông khi nó không được bảo vệ và không có quân nào hỗ trợ: Tốt đi một mình rất dễ bị Xe, Mã đối phương ăn mất.',
        diagram: {
          fen: 'r1bakabr1/9/1cn3nc1/p1p1p3p/6P2/2P6/P3P3P/1C2C1N2/9/RNBAKABR1 w - - 0 1',
          moves: '1. B3.1 M7/5',
          notes: [
            'Tốt tiến lên g6: tấn công Mã g7, và chính nó đứng ở g6 – chân Mã khi Mã muốn nhảy lên f5, h5. Không quân đen nào ăn được Tốt này.',
            'Mã buộc phải lui về e8, giữa cung – một điểm đứng rất xấu. Một con Tốt đã đẩy lùi cả một con Mã, và Mã g2 của Đỏ giờ có đường lên f4, h4 vì chân Mã g3 đã trống.',
          ],
          caption: 'Thế cờ minh họa: Tốt qua hà đuổi Mã về giữa cung.',
        },
      },
      {
        heading: 'Tốt liên kết: hai Tốt che chở cho nhau',
        body: `Hai Tốt đã qua sông đứng **cạnh nhau trên cùng một hàng** sẽ bảo vệ lẫn nhau (vì Tốt qua hà ăn được sang ngang). Người ta gọi là **Tốt liên** (hay Tốt hợp). Chúng mạnh hơn hẳn hai con Tốt đứng rời rạc:

- Quân đối phương ăn một con thì bị con kia ăn lại.
- Chúng tiến dần vào cung, khống chế cả một mảng các ô.

Bên cạnh, Mã đen ở c7 đang nhắm Tốt e6. Nhưng nếu Mã ăn e6 thì Tốt d6 ăn lại ngay: Đen mất Mã chỉ để lấy một Tốt.

Ngược lại, một Tốt **đơn độc** chưa có quân hỗ trợ thường là mục tiêu dễ dàng.`,
        tip: 'Ở tàn cuộc, khi có hai Tốt, hãy cố đưa chúng về cạnh nhau trước khi tiến sâu. Tốt liên kết tiến chậm mà chắc.',
        diagram: {
          fen: '3aka3/9/2n6/3PP4/9/9/9/9/9/5K3 b - - 0 1',
          arrows: ['c7e6:red'],
          highlights: ['d6:green', 'e6:green'],
          caption: 'Tốt liên d6–e6: Mã đen ăn Tốt e6 thì bị Tốt d6 ăn lại.',
        },
      },
      {
        heading: 'Khi nào nên đổi Tốt?',
        body: `Đổi Tốt không chỉ là đổi một lấy một. Hãy hỏi: **sau khi đổi, lộ nào được mở, quân nào được giải phóng?**

Những lý do tốt để đổi Tốt:
- **Mở chân cho Mã:** Tốt 3/7 của mình đang cản chân Mã – đổi nó đi, Mã có đường nhảy.
- **Mở lộ cho Xe:** đổi Tốt xong, Xe ăn lại và chiếm luôn lộ vừa mở.
- **Phá Tốt đang kìm mình:** như Tốt 7 của Đen ở g5 đang kìm Tốt g3 và Mã g2 của Đỏ.

Bên cạnh, Xe tuần hà h4 của Đỏ hỗ trợ Tốt g3 tiến lên đổi với Tốt g5. Sau khi Xe ăn lại ở g4, Mã g2 thoát khỏi cảnh “Mã què”, còn Xe g4 nhìn thẳng vào Mã g7.`,
        diagram: {
          moves: '1. P2-5 M8.7 2. M2.3 X9-8 3. X1-2 B7.1 4. X2.4 M2.3 5. B3.1 B7.1 6. X2-3',
          notes: [
            'Pháo đầu, qua ngòi Tốt e3 nhắm Tốt đầu e6.',
            'Mã g7 giữ Tốt đầu.',
            'Mã g2 ra quân, mở đường cho Xe i0.',
            'Xe đen ra lộ 8; Pháo h7 rời đi là lộ này thông.',
            'Xe đỏ ra lộ 2, nhìn thẳng vào Pháo h7.',
            'Đen tiến Tốt 7 lên g5, kìm Tốt g3 – mà Tốt g3 chưa đi thì Mã g2 không có nước tiến.',
            'Xe tuần hà: Xe lên h4, chuẩn bị hỗ trợ Tốt g3.',
            'Mã c7 ra quân, cùng Mã g7 giữ Tốt đầu.',
            'Đỏ chủ động đổi Tốt: Tốt g3 tiến lên g4, thách Tốt g5. Nếu Đen không đổi, Tốt g4 sẽ ăn Tốt g5 (vốn không có quân bảo vệ).',
            'Đen đổi: Tốt g5 ăn Tốt g4. Con Tốt này vừa qua sông nên còn nhắm sang ngang vào Xe h4 (Xe có Mã g2 bảo vệ).',
            'Xe ăn lại Tốt và chiếm lộ 3 (cột g), nhìn thẳng vào Mã g7 (đang được Pháo b7 bảo vệ qua ngòi Mã c7). Chân Mã g3 đã trống: Mã g2 của Đỏ giờ có đường lên f4, h4.',
          ],
          caption: 'Đổi Tốt 3 để giải phóng Mã phải và mở lộ cho Xe.',
        },
      },
      {
        heading: 'Tốt 3/7 và Tốt đầu: vai trò ngay từ đầu ván',
        body: `Nhìn vào thế cờ ban đầu, mỗi con Tốt đều có một vai trò riêng:

- **Tốt đầu (cột e):** là ngòi cho Pháo đầu của mình, đồng thời là mục tiêu của Pháo đầu đối phương. Đây là con Tốt quan trọng nhất ở khai cuộc – mất nó là mất lá chắn của lộ giữa.
- **Tốt 3 và Tốt 7 (cột c, g):** đứng ngay chân Mã khi Mã lên c2, g2. Tiến hay đổi hai con Tốt này quyết định Mã có đường đi hay không.
- **Tốt biên (cột a, i):** ít giá trị ở khai cuộc, nhưng tiến lên thì Xe biên có đường đi dọc, và về tàn cuộc chúng cũng có thể thành Tốt qua hà.

Khi cả hai bên đều tiến Tốt 3/7 (như trong Pháo đầu – Bình phong mã), các Mã thông chân và trận đấu bắt đầu nóng lên ở hai cánh và bờ sông.`,
        warning: 'Tốt xuống tận hàng cuối của đối phương (“Tốt đáy”, “lão Tốt”) chỉ còn đi ngang, sức mạnh giảm hẳn. Ở tàn cuộc, đừng vội đẩy Tốt xuống đáy: Tốt còn đứng cao, trước cung đối phương, thường khống chế được nhiều điểm hơn.',
        diagram: {
          moves: '1. B7.1 B7.1 2. M8.7 M8.7 3. M7.6',
          notes: [
            'Tiên nhân chỉ lộ: Tốt 7 tiến, mở chân Mã trái.',
            'Đen đáp bằng nước đối xứng, Tốt 7 lên g5 – thế “đối binh”.',
            'Mã trái lên c2: nhờ Tốt c3 đã đi, Mã có sẵn đường lên d4, b4.',
            'Mã phải của Đen lên g7: nhờ Tốt g6 đã đi, Mã có đường lên f5, h5.',
            'Mã bàn hà d4 chỉ sau ba nước, nhắm Tốt c6 không được bảo vệ – con đường do nước Tốt đầu tiên mở ra. Còn hai Tốt đầu e3, e6 vẫn đứng yên: chúng là ngòi và là mục tiêu của Pháo đầu khi trận đấu nóng lên.',
          ],
          highlights: ['e3:red', 'e6:red', 'c3:yellow', 'g3:yellow', 'c6:yellow', 'g6:yellow'],
          caption: 'Thế đối binh: Tốt 3/7 tiến lên, các Mã thông chân.',
        },
      },
    ],
    keyTakeaways: [
      'Mỗi nước Tốt ở khai cuộc phải mở đường cho một quân khác; Tiên nhân chỉ lộ mở chân cho Mã.',
      'Tốt qua hà được đi ngang, khống chế ba ô và có thể đuổi cả quân lớn – “bằng nửa Xe”.',
      'Hai Tốt liên kết trên cùng một hàng bảo vệ lẫn nhau; Tốt đơn độc dễ bị ăn.',
      'Đổi Tốt khi việc đổi mở chân Mã, mở lộ Xe, hoặc phá con Tốt đang kìm mình.',
      'Tốt đầu là con Tốt quan trọng nhất ở khai cuộc; Tốt xuống đáy thì yếu đi.',
    ],
  },

  // ───────────────────────────── 6. Phòng thủ ─────────────────────────────
  {
    id: 'xq-cl-phong-thu',
    category: 'chien-luoc',
    title: 'Phòng thủ cung Tướng',
    subtitle: 'Sĩ Tượng toàn, bổ Sĩ lên Tượng đúng lúc, cung yếu khi mất Sĩ Tượng và chống Pháo đầu',
    level: 3,
    icon: '🛡️',
    minutes: 16,
    intro:
      'Tấn công thắng ván cờ, nhưng phòng thủ giữ cho em còn ván cờ để chơi. Ở cờ tướng, Tướng không bao giờ được rời cung, nên bốn quân Sĩ, Tượng chính là “bức tường thành” của nó. Bài này dạy em cách giữ bức tường đó vững chắc, nhận ra khi nào nó bị thủng, và cách chống lại vũ khí tấn công phổ biến nhất – Pháo đầu.',
    sections: [
      {
        heading: 'Sĩ Tượng toàn: bức tường của cung',
        body: `Khi còn đủ hai Sĩ, hai Tượng (**Sĩ Tượng toàn**), cung Tướng rất khó bị phá. Mỗi quân có một nhiệm vụ:

- **Sĩ** canh các điểm trong cung. Một Sĩ ở giữa cung (e1) khống chế cả bốn góc cung d0, f0, d2, f2 – những điểm Xe, Mã đối phương muốn đặt chân vào.
- **Tượng** canh lộ giữa và bờ sông phía mình. Tượng e2 chắn lộ giữa (thêm một quân giữa Pháo đối phương và Tướng), cùng Tượng c0 bảo vệ lẫn nhau.
- Sĩ và Tượng còn là **ngòi phòng thủ**: chúng làm tăng số quân đứng giữa Pháo đối phương và Tướng, khiến Pháo khó chiếu.

Thế phòng thủ bên cạnh – Sĩ d0, e1 và Tượng c0, e2 – là hình mẫu: các quân bảo vệ lẫn nhau, Sĩ d0 dù bị Xe đen nhắm vẫn có Sĩ e1 và Tướng che chở.`,
        tip: 'Người xưa nói: “Thiếu Sĩ sợ Xe, thiếu Tượng sợ Pháo”. Mất Sĩ thì Xe đối phương dễ vào cung; mất Tượng thì lộ giữa và hàng ngang dễ bị Pháo khai thác.',
        diagram: {
          fen: '2bakab2/9/9/p1p1p1p1p/3r2n2/9/P1P1P1P1P/4B1N2/4A4/R1BAK4 w - - 0 1',
          arrows: ['e1d0', 'c0e2'],
          highlights: ['d0:yellow', 'e1:green', 'e2:green'],
          caption: 'Sĩ Tượng toàn: các quân phòng thủ che chở cho nhau.',
        },
      },
      {
        heading: 'Bổ Sĩ, lên Tượng: đúng lúc, đúng bên',
        body: `Lên Sĩ (“bổ Sĩ”) và lên Tượng là những nước trông có vẻ chậm, nhưng đặt đúng lúc thì chúng làm được nhiều việc cùng một lúc:

- **Liên kết** hai Tượng, hai Sĩ để chúng bảo vệ lẫn nhau.
- **Che chở** các Tốt, các quân ở gần (Tượng e7 bảo vệ Tốt g5, Tốt c5).
- **Dọn hàng cuối** cho Xe: khi Mã, Tượng, Sĩ đều rời hàng cuối, Xe có thể chạy ngang sang lộ cần thiết.

Còn “không đúng lúc” là khi nước Sĩ, Tượng tự tạo ngòi cho Pháo đối phương (như em đã thấy ở bài Nguyên tắc khai cuộc), hoặc khi đối phương đang có đe dọa trực tiếp cần xử lý trước.

Bên cạnh, Đen lên Tượng rồi lên Sĩ: sau hai nước đó, hàng cuối từ a9 tới d9 đã trống, Xe a9 sẵn sàng sang lộ 4 nhắm Mã bàn hà d4 của Đỏ.`,
        diagram: {
          moves: '1. P2-5 M8.7 2. M2.3 X9-8 3. X1-2 M2.3 4. B7.1 B7.1 5. M8.7 T3.5 6. M7.6 S4.5',
          notes: [
            'Pháo đầu, qua ngòi Tốt e3 nhắm Tốt đầu e6.',
            'Mã g7 giữ Tốt đầu.',
            'Mã g2 ra quân, mở đường cho Xe i0.',
            'Xe đen ra lộ 8; Pháo h7 rời đi là lộ này thông.',
            'Xe đỏ ra lộ 2, nhìn thẳng vào Pháo h7.',
            'Bình phong mã hoàn chỉnh.',
            'Tốt 7 mở chân Mã trái.',
            'Tốt 7 của Đen mở chân Mã g7.',
            'Mã trái của Đỏ lên c2.',
            'Lên Tượng (c9–e7): hai Tượng e7, g9 liên kết; Tượng e7 bảo vệ Tốt g5 và chắn thêm lộ giữa.',
            'Mã bàn hà d4 nhắm Tốt c6, e6.',
            'Bổ Sĩ (d9–e8): hai Sĩ liên kết, và các điểm b9, c9, d9 ở hàng cuối đã trống – Xe a9 có thể sang d9 nhắm thẳng Mã d4. (Tốt c6 vẫn đang bị Mã d4 nhắm; Đen chấp nhận điều đó để hoàn thành phát triển.)',
          ],
          caption: 'Lên Tượng, bổ Sĩ: củng cố cung và dọn đường cho Xe trái.',
        },
      },
      {
        heading: 'Cung yếu khi mất Sĩ',
        body: `Chỉ cần thiếu một quân phòng thủ, cung Tướng có thể sụp đổ rất nhanh. Bên cạnh, Đen đã mất Sĩ d9 và Tượng c9. Hàng cuối của Đen bỏ trống ở c9, d9 – Xe đỏ chỉ cần xuống b9 là chiếu được.

- Tướng không lên được e8 vì Mã d6 khống chế.
- Đen chỉ còn cách đưa Tượng e7 về c9 che chiếu.
- Xe ăn luôn Tượng c9 và chiếu bí.

Hãy so sánh: nếu Sĩ d9 vẫn còn đó, Xe xuống b9 sẽ không chiếu được gì (Sĩ che kín hàng cuối), và máy không tìm thấy cách chiếu bí nào cho Đỏ trong ba nước.`,
        warning: 'Đừng dễ dàng đổi Sĩ, Tượng lấy Tốt hay để chúng bị ăn mà không có lý do. Khi đối phương còn Xe, Mã, mỗi quân Sĩ Tượng mất đi là một cánh cửa mở vào cung.',
        diagram: {
          fen: '4kab2/9/4b4/p2Np3p/9/9/P1P3P1P/9/1R7/5K3 w - - 0 1',
          moves: '1. X8.8 T5/3 2. X8-7',
          notes: [
            'Xe xuống b9 chiếu theo hàng cuối – c9, d9 đều trống vì Đen đã mất Tượng, mất Sĩ ở cánh này. Tướng không lên được e8 vì Mã d6 khống chế điểm đó.',
            'Nước duy nhất: Tượng e7 lui về c9 che chiếu.',
            'Xe ăn Tượng c9, chiếu tiếp. Không còn quân nào che được d9, Tướng không có đường chạy: chiếu bí!',
          ],
          caption: 'Thiếu Sĩ sợ Xe: hàng cuối bỏ trống là đường vào cung.',
        },
      },
      {
        heading: 'Phòng thủ chống Pháo đầu',
        body: `Pháo đầu là cách mở màn phổ biến nhất, nên bên đi sau phải có sẵn “bài” phòng thủ. Ba cách chính:

- **Bình phong mã:** hai Mã c7, g7 cùng giữ Tốt đầu – vững chắc, cân đối.
- **Thuận pháo / Nghịch pháo:** đặt Pháo vào lộ giữa đối diện Pháo đỏ – phòng thủ bằng phản công.
- **Phản cung mã:** một Mã giữ Tốt đầu, Pháo kia đặt ở góc cung (f7) như một Pháo sĩ giác, Mã còn lại ra g7.

Bên cạnh là Phản cung mã. Hãy chú ý một nhược điểm cần biết: Pháo f7 đứng đúng chân Mã g7 (điểm f7), nên chỉ có Mã c7 giữ được Tốt đầu. Bù lại, Pháo f7 che cung rất tốt và có thể bình ra cánh để phản kích.`,
        tip: 'Dù chọn cách nào, câu hỏi đầu tiên luôn là: “Tốt đầu của mình có ai giữ không? Lộ giữa có bị mở ra không?”.',
        diagram: {
          moves: '1. P2-5 M2.3 2. M2.3 P8-6 3. X1-2 M8.7 4. B3.1 X9-8',
          notes: [
            'Pháo đầu nhắm Tốt e6.',
            'Đen giữ Tốt đầu bằng Mã c7 trước.',
            'Mã g2 ra quân, mở đường cho Xe i0.',
            'Phản cung mã: Pháo h7 bình sang f7, góc cung – ngay trước Sĩ f9. Lộ h mở ra cho Xe đen.',
            'Xe đỏ ra lộ 2. Lộ h đã trống tới tận Mã h9 (Mã có Xe i9 bảo vệ).',
            'Mã phải của Đen lên g7. Vì Pháo f7 chắn chân, Mã g7 không giữ được Tốt đầu – nhiệm vụ đó chỉ còn Mã c7 gánh.',
            'Tiến Tốt 3 (g3–g4): mở chân cho Mã g2 lên f4, h4 và kìm Tốt g6 của Đen.',
            'Xe đen ra lộ 8 đối mặt Xe đỏ. Hai Xe nhìn nhau trên lộ h, mỗi Xe đều có Mã bảo vệ.',
          ],
          caption: 'Pháo đầu đối Phản cung mã: một cách phòng thủ cân bằng giữa vững chắc và phản công.',
        },
      },
      {
        heading: 'Phòng thủ chủ động: đổi bớt quân tấn công',
        body: `Phòng thủ tốt nhất không phải lúc nào cũng là co cụm. Khi đối phương dồn quân tấn công, một cách giải vây hiệu quả là **đổi bớt quân tấn công mạnh nhất** của họ – thường là Xe.

Bên cạnh, Xe qua hà của Đỏ đè lên trận địa Đen. Đen bình Pháo sang i7 để mở lộ h, thách đổi Xe. Đỏ chọn đổi: Xe h6 ăn Xe h9, Mã g7 ăn lại. Sau cuộc đổi, mỗi bên còn một Xe, sức ép lên cánh phải của Đen giảm hẳn, và máy đánh giá Đỏ chỉ còn nhỉnh hơn chút ít.

Nhớ rằng: bên phòng thủ thường muốn **đổi quân**, bên tấn công thường muốn **giữ quân**. Mỗi cuộc đổi Xe là một lần cơn bão tấn công dịu bớt.`,
        diagram: {
          moves: '1. P2-5 M8.7 2. M2.3 X9-8 3. X1-2 B7.1 4. X2.6 M2.3 5. B7.1 P8-9 6. X2.3 M7/8',
          notes: [
            'Pháo đầu, qua ngòi Tốt e3 nhắm Tốt đầu e6.',
            'Mã g7 giữ Tốt đầu.',
            'Mã g2 ra quân, mở đường cho Xe i0.',
            'Xe đen ra lộ 8; Pháo h7 rời đi là lộ này thông.',
            'Xe đỏ ra lộ 2, nhìn thẳng vào Pháo h7.',
            'Đen tiến Tốt 7, mở chân Mã g7 và kìm Tốt g3.',
            'Xe qua hà đè lên trận địa Đen.',
            'Mã c7 ra quân, cùng Mã g7 giữ Tốt đầu.',
            'Tốt 7 mở chân Mã trái của Đỏ.',
            'Bình pháo đổi Xe: Pháo rời h7, Xe h9 đối mặt Xe h6 không có quân bảo vệ.',
            'Đỏ chọn đổi: Xe h6 ăn Xe h9.',
            'Mã g7 lui ăn lại Xe. Mỗi bên còn một Xe – áp lực của Xe qua hà đã được hóa giải.',
          ],
          caption: 'Bình pháo đổi Xe: giải tỏa sức ép bằng cách đổi quân tấn công mạnh nhất.',
        },
      },
    ],
    keyTakeaways: [
      'Sĩ Tượng toàn bảo vệ lẫn nhau và là ngòi phòng thủ chống Pháo; “thiếu Sĩ sợ Xe, thiếu Tượng sợ Pháo”.',
      'Bổ Sĩ, lên Tượng để liên kết quân và dọn đường cho Xe – nhưng đừng tự tạo ngòi cho Pháo đối phương.',
      'Mất một Sĩ hay một Tượng có thể mở ngay đường vào cung; đừng để mất chúng vô cớ.',
      'Luôn có sẵn cách chống Pháo đầu: Bình phong mã, Thuận pháo, Phản cung mã…',
      'Phòng thủ chủ động bằng cách đổi bớt quân tấn công mạnh nhất của đối phương, nhất là Xe.',
    ],
  },

  // ───────────────────────────── 7. Tấn công cung Tướng ─────────────────────────────
  {
    id: 'xq-cl-tan-cong-cung-tuong',
    category: 'chien-luoc',
    title: 'Tấn công cung Tướng',
    subtitle: 'Tập trung lực lượng, phá quân phòng thủ then chốt, mở lộ và thí quân phá Sĩ Tượng',
    level: 3,
    icon: '⚔️',
    minutes: 18,
    intro:
      'Các đòn chiếu bí đẹp mắt không từ trên trời rơi xuống. Trước mỗi đòn kết thúc là một quá trình chuẩn bị: đưa đủ quân tới gần cung đối phương, tạo ra điểm yếu, mở đường cho quân mạnh nhất. Bài này nhìn cuộc tấn công cung Tướng bằng con mắt chiến lược: khi nào nên tấn công, tấn công bằng gì, và tại sao một nước thí quân lại có thể đúng.',
    sections: [
      {
        heading: 'Tập trung lực lượng: đếm quân tấn công và quân phòng thủ',
        body: `Quy tắc đầu tiên của tấn công: **số quân tấn công phải nhiều hơn số quân phòng thủ ở khu vực tấn công**. Một Xe đơn độc hiếm khi phá được cung còn đủ Sĩ Tượng; nhưng Xe, Mã, Pháo cùng phối hợp thì khác hẳn.

Ở thế cờ bên cạnh, quân lớn của Đen ở xa, cung Tướng chỉ có Sĩ Tượng che chở. Đỏ có ba quân sẵn sàng: Xe e4, Pháo e2 trên lộ giữa và Mã h5. Hãy xem chúng phối hợp:
- Mã nhảy vào g7, khống chế e8 và f9 – hai điểm then chốt.
- Đen phải lên Tượng chặn lộ giữa, nhưng chính Tượng e7 lại trở thành ngòi để Pháo e2 ghim chặt Sĩ e8.
- Xe chuyển sang lộ 4 và xuống f9 kết thúc.`,
        tip: 'Trước khi tấn công, hãy đếm: “Bao nhiêu quân của mình có thể tới cung đối phương trong 2–3 nước? Bao nhiêu quân của đối phương có thể về phòng thủ?”. Nếu chưa đủ, hãy kéo thêm quân trước đã.',
        diagram: {
          fen: '2bak1b2/4a4/9/p1p5p/7N1/4R4/9/4C4/9/5K3 w - - 0 1',
          moves: '1. M2.3 T3.5 2. X5-4 T7.9 3. X4.5',
          notes: [
            'Mã nhảy vào g7, khống chế e8 và f9. Đe dọa X5.4 ăn Sĩ e8 – Xe có Mã bảo vệ, đó sẽ là chiếu bí.',
            'Đen lên Tượng e7 chặn lộ giữa để Xe không xuống được e8.',
            'Xe chuyển sang lộ 4 (cột f), nhắm f9 – điểm Mã g7 cũng đang khống chế. Giờ Pháo e2 lên tiếng: qua ngòi Tượng e7, nó ghim chặt Sĩ e8 vào Tướng.',
            'Đen gần như không còn nước hữu ích: Sĩ e8 và Tượng e7 không thể rời chỗ (rời đi là Tướng lộ trước Pháo), Tướng không có đường chạy.',
            'Xe xuống f9 chiếu, có Mã g7 bảo vệ. Sĩ e8 không dám ăn Xe vì đang bị Pháo ghim. Chiếu bí – ba quân, ba nhiệm vụ.',
          ],
          caption: 'Xe, Mã, Pháo phối hợp: mỗi quân một nhiệm vụ.',
        },
      },
      {
        heading: 'Tạo điểm yếu: loại bỏ quân phòng thủ then chốt',
        body: `Cung đối phương còn đủ quân thì phải **tạo ra điểm yếu**. Cách hiệu quả nhất là tìm ra **quân phòng thủ then chốt** – quân mà nếu nó rời chỗ, cả hệ thống phòng thủ sụp đổ – rồi đổi, đuổi hoặc thí quân để kéo nó đi.

Bên cạnh, Mã h7 của Đen là quân then chốt: nó đứng đúng chân Mã đỏ (h7), nên Mã h6 không nhảy được vào điểm ngọa tào g8. Đỏ thí Xe ăn Tượng g9 kèm chiếu – Mã h7 buộc phải ăn Xe, và chân Mã đỏ được giải phóng.

Hãy để ý cả **Tướng đỏ ở f0**: nó khống chế lộ f nhờ luật lộ mặt tướng, nên Tướng đen không thể chạy sang f9. Đừng quên Tướng của mình cũng là một quân tấn công!`,
        diagram: {
          fen: '3ak1b2/4a4/4b2n1/p1p3RNp/9/9/P1P3P1P/1r7/4C4/5K3 w - - 0 1',
          moves: '1. X3.3 M8/7 2. M2.3',
          notes: [
            'Thí Xe: Xe ăn Tượng g9, chiếu Tướng theo hàng cuối (f9 đang trống).',
            'Nước duy nhất: Mã h7 lui ăn Xe. Nhưng Mã vừa rời h7 thì chân của Mã đỏ h6 được giải phóng.',
            'Mã ngọa tào g8 chiếu! Không quân nào chặn được chân Mã ở f8; Tướng không sang f9 được vì sẽ đối mặt Tướng đỏ f0 (lộ mặt tướng), còn d9, e8 là Sĩ của chính nó. Chiếu bí!',
          ],
          caption: 'Thí Xe kéo Mã h7 – quân phòng thủ then chốt – rời vị trí.',
        },
      },
      {
        heading: 'Mở lộ: đường vào cung cho quân mạnh nhất',
        body: `Xe là quân tấn công mạnh nhất, nhưng Xe cần **lộ mở** dẫn thẳng vào cung. Lộ giữa (có Tướng ở cuối) và các lộ sĩ giác (4, 6) là những đường quan trọng nhất. Để mở chúng, người ta thường **đổi Tốt, đổi quân**, thậm chí chấp nhận thiệt một chút vật chất.

Bên cạnh là một ví dụ từ khai cuộc Pháo đầu – Bình phong mã. Đỏ đổi Pháo đầu lấy Tốt đầu và Mã c7: về vật chất gần như ngang nhau, nhưng lộ giữa của Đen mở toang. Xe đỏ chiếm lộ giữa kèm nước chiếu, đứng sừng sững ở e6 nhắm cả hai Tốt c6, i6.`,
        diagram: {
          moves: '1. P2-5 M8.7 2. M2.3 X9-8 3. X1-2 M2.3 4. B7.1 B7.1 5. X2.6 M7.6 6. P5.4 M3.5 7. X2-5 P2-5',
          notes: [
            'Pháo đầu, qua ngòi Tốt e3 nhắm Tốt đầu e6.',
            'Mã g7 giữ Tốt đầu.',
            'Mã g2 ra quân, mở đường cho Xe i0.',
            'Xe đen ra lộ 8; Pháo h7 rời đi là lộ này thông.',
            'Xe đỏ ra lộ 2, nhìn thẳng vào Pháo h7.',
            'Bình phong mã hoàn chỉnh.',
            'Tốt 7 mở chân Mã trái.',
            'Tốt 7 của Đen mở chân Mã g7.',
            'Xe qua hà, đè lên trận địa Đen.',
            'Mã bàn hà f5 nhắm Tốt g3. Nhưng Mã g7 vừa rời đi, Tốt đầu e6 chỉ còn Mã c7 bảo vệ.',
            'Đỏ quyết định mở lộ giữa: Pháo ăn Tốt đầu! Pháo e6 có Xe h6 bảo vệ theo hàng ngang.',
            'Mã c7 ăn Pháo.',
            'Xe h6 ăn lại Mã và chiếu Tướng theo lộ giữa vừa mở. Đỏ đã đổi Pháo lấy Mã cộng Tốt đầu.',
            'Đen đưa Pháo về e7 che chiếu. Xe đỏ đứng ở e6, nhắm cả Tốt c6 và Tốt i6 không được bảo vệ; máy đánh giá Đỏ nhỉnh hơn.',
          ],
          caption: 'Đổi Pháo lấy Mã và Tốt đầu để mở lộ giữa cho Xe.',
        },
      },
      {
        heading: 'Thí quân phá Sĩ Tượng',
        body: `Khi cung đối phương đã bị bao vây, các quân Sĩ, Tượng còn lại là “ổ khóa” cuối cùng. **Thí quân ăn Sĩ, ăn Tượng** để kéo Tướng ra ngoài hoặc mở đường cho quân khác là một kỹ thuật kinh điển. Nhưng nhớ rằng thí quân chỉ đúng khi em đã **tính được kết quả**: chiếu bí, hoặc thu lại nhiều hơn số đã bỏ ra.

Bên cạnh, Xe đỏ ăn Sĩ d9 kèm chiếu. Tướng đen buộc phải ăn Xe và bị kéo ra d9 – ngay trên lộ có Pháo d4. Mã nhảy vào d7 làm ngòi cho Pháo chiếu, đồng thời khống chế e9: đó là thế **Mã hậu pháo** nổi tiếng.`,
        warning: 'Đừng thí quân “cho đẹp” khi chưa tính hết các nước đáp của đối phương. Một nước thí sai là mất quân không lý do – và thường là mất luôn ván cờ.',
        diagram: {
          fen: '2bakab2/9/7c1/p1pR1N2p/9/3C5/P1P3P1P/1r7/9/5K3 w - - 0 1',
          moves: '1. X6.3 Tg5-4 2. M4.6',
          notes: [
            'Xe ăn Sĩ d9 chiếu Tướng! Xe không có quân nào bảo vệ – đây là một nước thí Xe.',
            'Nước duy nhất: Tướng ăn Xe (Tướng không lên được e8 vì Mã f6 khống chế điểm đó).',
            'Mã nhảy vào d7: Mã làm ngòi cho Pháo d4 chiếu Tướng d9, đồng thời khống chế e9. Tướng không lên d8 được (Pháo khống chế), không sang e9 được (Mã khống chế). Chiếu bí – thế Mã hậu pháo!',
          ],
          caption: 'Thí Xe phá Sĩ, Mã hậu pháo kết liễu.',
        },
      },
      {
        heading: 'Đừng tấn công khi chưa đủ quân',
        body: `Mặt trái của tấn công là **tấn công non**: lao lên khi mới có một hai quân, trong khi đối phương còn đủ sức phòng thủ. Kết quả thường là mất quân và mất luôn tiên thủ.

Ví dụ bên cạnh là lỗi người mới học rất hay mắc: thấy Pháo đầu nhắm Tốt đầu là ăn ngay, quên rằng Tốt đó đã có Mã bảo vệ. Một Pháo đơn độc không thể “phá” được trung lộ đối phương.

Trước khi tấn công, hãy kiểm tra ba điều:
- **Đủ quân chưa?** Ít nhất hai, ba quân có thể phối hợp ở khu vực tấn công.
- **Cung mình an toàn chưa?** Đối phương có phản đòn nguy hiểm nào không?
- **Đã tính hết các nước đáp chưa?** Đặc biệt là các nước ăn quân và nước chiếu của đối phương.`,
        diagram: {
          moves: '1. P2-5 M8.7 2. P5.4 M7.5',
          notes: [
            'Pháo đầu nhắm Tốt e6.',
            'Mã g7 giữ Tốt đầu.',
            'Pháo lao lên ăn Tốt đầu – một mình, không có quân nào hỗ trợ.',
            'Mã g7 ăn Pháo. Đỏ mất Pháo chỉ để lấy một Tốt: tấn công non phải trả giá đắt.',
          ],
          caption: 'Tấn công non: một Pháo đơn độc không phá được trung lộ.',
        },
      },
    ],
    keyTakeaways: [
      'Tấn công chỉ thành công khi số quân tấn công vượt số quân phòng thủ ở khu vực đó.',
      'Tìm quân phòng thủ then chốt rồi đổi, đuổi hoặc thí quân để kéo nó đi.',
      'Mở lộ (nhất là lộ giữa và lộ sĩ giác) cho Xe, kể cả khi phải đổi quân.',
      'Thí quân phá Sĩ Tượng chỉ đúng khi đã tính được kết quả – Mã hậu pháo, Mã ngọa tào là những đích đến quen thuộc.',
      'Đừng tấn công non; Tướng của mình cũng có thể tham gia tấn công nhờ luật lộ mặt tướng.',
    ],
  },

  // ───────────────────────────── 8. Tiên thủ và tranh tiên ─────────────────────────────
  {
    id: 'xq-cl-tien-thu',
    category: 'chien-luoc',
    title: 'Tiên thủ và tranh tiên',
    subtitle: 'Nhịp đi, phát triển kèm đe dọa, phản đòn và cách giành lại quyền chủ động',
    level: 3,
    icon: '⏱️',
    minutes: 16,
    intro:
      'Trong cờ tướng có một thứ quý không kém vật chất: thời gian. Mỗi nước đi là một “nhịp”. Bên nào dùng nhịp hiệu quả hơn – ra quân nhanh hơn, tạo đe dọa buộc đối phương phải đáp – bên đó nắm tiên thủ. Bài này dạy em cách đếm nhịp, cách giữ tiên thủ và cách giành lại nó khi đang phải phòng thủ.',
    sections: [
      {
        heading: 'Nhịp – đơn vị thời gian của ván cờ',
        body: `Đỏ đi trước nên luôn hơn Đen nửa nhịp – đó là **tiên thủ** tự nhiên. Một nhịp bị phí (nước đi không ra quân, không đe dọa, không phòng thủ điều gì cần thiết) là một lần trao quyền chủ động cho đối phương.

Hãy theo dõi thế Thuận pháo bên cạnh và đếm xem mỗi nước làm được gì:
- Có những nước **bắt buộc** (giữ Tốt đầu đang bị nhắm) – chúng vẫn không phí nếu đồng thời là nước ra quân.
- Có lúc một bên **mượn nhịp**: bỏ mặc một Tốt đang bị đe dọa để ra quân trước, vì biết đối phương cũng chưa rảnh tay ăn Tốt.

Sau năm nước, Đỏ đã ra Pháo, hai Mã và một Xe; Đen ra Pháo, một Mã và một Xe. Đỏ vẫn giữ được một quân phát triển nhiều hơn – đó là tiên thủ.`,
        diagram: {
          moves: '1. P2-5 P8-5 2. M2.3 M8.7 3. X1-2 X9.1 4. X2.6 X9-4 5. M8.7 B7.1',
          notes: [
            'Đỏ dùng nhịp đầu tiên để đặt Pháo đầu, nhắm Tốt e6.',
            'Thuận pháo: Đen đáp bằng đe dọa ngược vào Tốt e3.',
            'Đỏ dùng một nhịp giữ Tốt e3 – nhưng đó cũng là nước ra quân, không phí.',
            'Đen cũng vậy: Mã g7 giữ Tốt đầu và ra quân.',
            'Trực xa: Xe ra lộ 2 đã thông.',
            'Hoành xa: Xe đen lên i8.',
            'Xe qua hà: lần đầu tiên trong ván có một đe dọa thật sự – Tốt g6 không có quân nào bảo vệ.',
            'Đen “mượn nhịp”: chưa vội giữ Tốt, đưa Xe sang lộ 4 nhìn xuống Sĩ d0.',
            'Đỏ cũng chưa vội ăn Tốt: Mã c2 ra quân, đồng thời thêm quân bảo vệ Sĩ d0 và Tốt e3.',
            'Giờ Đen mới cứu Tốt (g6–g5). Đếm lại: Đỏ đã ra bốn quân, Đen ba quân – Đỏ vẫn giữ tiên thủ.',
          ],
          caption: 'Thuận pháo trực xa đối hoành xa: đếm nhịp từng nước.',
        },
      },
      {
        heading: 'Phát triển kèm đe dọa',
        body: `Cách tốt nhất để giữ tiên thủ là **ra quân kèm đe dọa**: mỗi nước vừa đưa thêm quân vào trận, vừa buộc đối phương phải đáp. Ngược lại, khi đối phương dùng nhiều nhịp để ăn một con Tốt, em có thể dùng chính những nhịp đó để ra quân kèm đe dọa của mình.

Bên cạnh (tiếp nối thế Xe qua hà – Mã bàn hà ở bài Nguyên tắc khai cuộc), Đỏ dùng Xe ăn Tốt biên. Đen không đuổi theo con Tốt mà:
- Đưa Pháo về lộ giữa, cùng Mã f5 nhắm Tốt e3.
- Cho Xe qua sông nhắm Tốt c4 không được bảo vệ.

Đỏ hơn một Tốt, nhưng mọi quân đen đều đã hoạt động và có mục tiêu – máy đánh giá thế cờ gần như cân bằng.`,
        tip: 'Khi đối phương đi ăn Tốt, hãy tự hỏi: “Trong lúc họ ăn Tốt, mình ra được quân nào kèm đe dọa?”. Nhiều khi đó là cách đáp hay nhất.',
        diagram: {
          moves: '1. P2-5 M8.7 2. M2.3 X9-8 3. X1-2 M2.3 4. B7.1 B7.1 5. X2.6 M7.6 6. X2-1 P8-5 7. M8.7 X8.5',
          notes: [
            'Pháo đầu, qua ngòi Tốt e3 nhắm Tốt đầu e6.',
            'Mã g7 giữ Tốt đầu.',
            'Mã g2 ra quân, mở đường cho Xe i0.',
            'Xe đen ra lộ 8; Pháo h7 rời đi là lộ này thông.',
            'Xe đỏ ra lộ 2, nhìn thẳng vào Pháo h7.',
            'Bình phong mã hoàn chỉnh.',
            'Tốt 7 mở chân Mã trái.',
            'Tốt 7 của Đen mở chân Mã g7.',
            'Xe qua hà nhắm Tốt i6.',
            'Mã bàn hà f5 nhắm Tốt g3.',
            'Đỏ thực hiện đe dọa: Xe ăn Tốt i6. Hơn một Tốt, nhưng Xe đã đi ba nước.',
            'Đen không đuổi theo Tốt mà ra quân kèm đe dọa: Pháo về e7, cùng Mã f5 nhắm Tốt e3. Lộ h cũng mở cho Xe đen.',
            'Mã c2 ra quân và thêm một quân bảo vệ Tốt e3.',
            'Xe đen qua sông xuống h4, nhắm Tốt c4 không được bảo vệ, trong khi Mã f5 vẫn nhắm Tốt g3. Đen kém một Tốt nhưng mọi quân đều hoạt động.',
          ],
          caption: 'Đỏ ăn Tốt, Đen ra quân kèm đe dọa: vật chất đổi lấy thời gian.',
        },
      },
      {
        heading: 'Phản đòn: trả lời đe dọa bằng đe dọa mạnh hơn',
        body: `Khi bị đe dọa, phản xạ tự nhiên là phòng thủ. Nhưng đôi khi cách đáp hay hơn là **phản đòn**: tạo ra một đe dọa còn mạnh hơn, buộc đối phương phải lo việc của họ trước.

Thứ tự sức mạnh của đe dọa: **chiếu Tướng** > đe dọa chiếu bí > đe dọa ăn quân lớn > đe dọa ăn quân nhỏ.

Tiếp tục thế Thuận pháo ở phần trên: Xe đen lao xuống ăn Tốt c3 và nhắm Mã c2. Đỏ không giữ Mã mà phản đòn: Pháo vượt sông rồi ăn Tốt đầu **kèm nước chiếu**. Đen phải lo che chiếu trước, chưa kịp ăn Mã – hai bên lao vào một cuộc đua đe dọa mà máy đánh giá là cân bằng.`,
        warning: 'Phản đòn chỉ đúng khi đe dọa của em thực sự mạnh hơn hoặc đến nhanh hơn. Nếu không, em sẽ mất cả quân bị đe dọa lẫn thời gian.',
        diagram: {
          fen: 'rnbakab2/3r5/1c2c1n2/p1p1p2Rp/6p2/9/P1P1P1P1P/1CN1C1N2/9/R1BAKAB2 w - - 10 6',
          moves: '6. S4.5 X4.5 7. P8.4 X4-3 8. P8-5',
          notes: [
            'Đỏ bổ Sĩ (f0–e1), củng cố cung trước Xe d8.',
            'Xe đen lao xuống d3, nhắm Tốt c3 không được bảo vệ.',
            'Đỏ không giữ Tốt c3 mà chuẩn bị phản đòn: Pháo vượt sông lên b6, qua ngòi Tốt c6 nhắm Tốt đầu e6.',
            'Đen ăn Tốt c3, đồng thời nhắm Mã c2 đang không có quân bảo vệ.',
            'Phản đòn mạnh hơn: Pháo ăn Tốt đầu e6 và chiếu Tướng (ngòi là Pháo e7). Đen phải lo che chiếu trước, chưa thể ăn Mã c2.',
          ],
          caption: 'Đáp đe dọa ăn Mã bằng một nước chiếu kèm ăn Tốt.',
        },
      },
      {
        heading: 'Giành nhịp bằng đổi quân',
        body: `Đổi quân cũng có thể là một cách giành nhịp: nếu sau cuộc đổi, quân của đối phương phải **lùi về** để ăn lại, còn quân của mình đứng ở vị trí tốt, thì mình vừa lời một nhịp.

Bên cạnh là Phản cung mã. Hai Xe đối mặt trên lộ h, mỗi Xe đều có Mã bảo vệ. Đỏ chủ động đổi Xe: Mã g7 của Đen buộc phải lui về h9 ăn lại – quân vừa ra lại quay về chỗ cũ. Đỏ tận dụng nhịp đó để bình Pháo sang c2 nhắm Tốt c6, và máy đánh giá Đỏ ưu thế rõ.`,
        tip: 'Trước khi đổi quân, hãy nhìn quân nào của đối phương sẽ ăn lại và nó sẽ đứng ở đâu. Đổi để đối phương phải lùi quân là đổi có lời.',
        diagram: {
          moves: '1. P2-5 M2.3 2. M2.3 P8-6 3. X1-2 M8.7 4. B3.1 X9-8 5. X2.9 M7/8 6. P8-7',
          notes: [
            'Pháo đầu, qua ngòi Tốt e3 nhắm Tốt đầu e6.',
            'Đen giữ Tốt đầu bằng Mã c7.',
            'Mã g2 ra quân, mở đường cho Xe i0.',
            'Phản cung mã: Pháo sang f7, góc cung.',
            'Xe đỏ ra lộ 2, nhìn thẳng tới Mã h9 (Mã có Xe i9 bảo vệ).',
            'Mã phải của Đen lên g7.',
            'Tiến Tốt 3 mở chân Mã g2.',
            'Xe đen ra lộ 8 đối mặt Xe đỏ.',
            'Đỏ chủ động đổi Xe: Xe h0 ăn Xe h9. Xe đen có Mã g7 bảo vệ nên đây là đổi ngang – nhưng hãy xem ai phải tốn nhịp.',
            'Mã g7 phải lui về h9 ăn lại – quân vừa ra lại quay về chỗ cũ. Đen mất một nhịp phát triển.',
            'Đỏ lập tức ra quân kèm đe dọa: Pháo sang c2, qua ngòi Tốt c3 nhắm Tốt c6 không được bảo vệ. Máy đánh giá Đỏ ưu thế rõ.',
          ],
          caption: 'Đổi Xe buộc Mã đen lùi về: Đỏ lời một nhịp.',
        },
      },
    ],
    keyTakeaways: [
      'Mỗi nước đi là một nhịp; nước không ra quân, không đe dọa, không phòng thủ điều cần thiết là nhịp bị phí.',
      'Giữ tiên thủ bằng cách ra quân kèm đe dọa; nước bắt buộc mà cũng là nước ra quân thì không phí.',
      'Khi đối phương tốn nhịp ăn Tốt, hãy dùng thời gian đó để ra quân kèm đe dọa.',
      'Phản đòn bằng đe dọa mạnh hơn (chiếu Tướng là mạnh nhất) thay vì luôn phòng thủ thụ động.',
      'Đổi quân khiến đối phương phải lùi quân về ăn lại là cách giành nhịp hiệu quả.',
    ],
  },

  // ───────────────────────────── 9. Đổi quân và chuyển sang tàn cuộc ─────────────────────────────
  {
    id: 'xq-cl-doi-quan',
    category: 'chien-luoc',
    title: 'Đổi quân và chuyển sang tàn cuộc',
    subtitle: 'Khi nào nên đổi, giá trị Pháo – Mã theo số quân, đổi khi hơn vật chất',
    level: 3,
    icon: '⚖️',
    minutes: 15,
    intro:
      'Đổi quân là một trong những quyết định quan trọng nhất của trung cuộc. Một cuộc đổi “ngang giá” trên giấy có thể làm thay đổi hoàn toàn thế cờ: kéo quân phòng thủ của đối phương đi, giải tỏa sức ép cho mình, hoặc đưa ván cờ vào một tàn cuộc mà quân của mình mạnh hơn. Bài này giúp em trả lời câu hỏi: “Có nên đổi không?”.',
    sections: [
      {
        heading: 'Ba câu hỏi trước khi đổi quân',
        body: `Trước mỗi cuộc đổi, hãy tự hỏi:

- **Ai ăn lại, và quân đó sẽ đứng ở đâu?** Nếu quân ăn lại của đối phương đang làm nhiệm vụ phòng thủ, cuộc đổi kéo nó rời vị trí.
- **Sau khi đổi, thế cờ mở ra cho ai?** Lộ nào thông, quân nào được tự do, quân nào hết việc?
- **Tàn cuộc sau khi đổi có lợi cho ai?** (Xem các phần dưới.)

Ví dụ bên cạnh là Thuận pháo trực xa đối trực xa. Hai Xe nhìn nhau trên lộ h, mỗi Xe đều có Mã bảo vệ – trông như một cuộc đổi ngang. Nhưng quân ăn lại của Đen là Mã g7, **quân duy nhất đang giữ Tốt đầu**. Đổi xong, Pháo đỏ ăn Tốt đầu kèm nước chiếu.`,
        diagram: {
          moves: '1. P2-5 P8-5 2. M2.3 M8.7 3. X1-2 X9-8 4. X2.9 M7/8 5. P5.4 S4.5',
          notes: [
            'Pháo đầu, qua ngòi Tốt e3 nhắm Tốt đầu e6.',
            'Thuận pháo: Pháo đen cũng vào lộ giữa, nhắm ngược lại Tốt e3.',
            'Mã g2 giữ Tốt e3.',
            'Mã g7 giữ Tốt e6 – và lúc này nó là quân duy nhất giữ Tốt đầu của Đen.',
            'Xe đỏ ra lộ 2 – lộ này đã trống hoàn toàn vì Pháo và Mã cột h của Đen đều đã rời đi.',
            'Trực xa đối trực xa: hai Xe nhìn nhau trên lộ h, Xe nào cũng có Mã bảo vệ.',
            'Đổi Xe – nhưng hãy hỏi: quân nào của Đen sẽ ăn lại? Chính là Mã g7, quân đang giữ Tốt đầu.',
            'Mã g7 lui ăn Xe. Tốt đầu e6 giờ không còn quân nào bảo vệ.',
            'Pháo ăn Tốt đầu kèm nước chiếu (ngòi là Pháo e7).',
            'Đen bổ Sĩ che chiếu. Đỏ hơn một Tốt, Pháo e6 còn nhắm Tốt i6 không được bảo vệ; máy đánh giá Đỏ ưu thế.',
          ],
          caption: 'Thuận pháo trực xa đối trực xa: đổi Xe để kéo Mã g7 rời nhiệm vụ.',
        },
      },
      {
        heading: 'Hơn quân thì đổi, kém quân thì tránh đổi',
        body: `Nguyên tắc vàng: **bên hơn vật chất nên đổi quân** (nhất là đổi quân lớn), **bên kém vật chất nên tránh đổi**.

Lý do: mỗi cuộc đổi làm bàn cờ thưa đi, đối phương ít quân hơn để phản công hay gây rối, còn phần hơn của em ngày càng rõ. Bên kém quân thì ngược lại, cần giữ quân để còn cơ hội tạo phức tạp.

Thế cờ minh họa bên cạnh: Đỏ hơn một Mã. Đỏ đưa Xe sang lộ 2 đối mặt Xe đen, có Mã g2 bảo vệ. Đen né tránh cũng không xong – máy đánh giá mọi nước Xe tránh còn tệ hơn cho Đen – nên đành đổi. Mất Xe, Đen không còn quân nào đủ sức phản công.`,
        tip: 'Khi đã hơn quân, hãy tự hỏi: “Quân nào của đối phương nguy hiểm nhất? Đổi được nó không?”. Thường đó là Xe.',
        diagram: {
          fen: '2bakab2/7r1/1c7/p1p1p1p1p/9/9/P1P1P1P1P/1C4N2/9/2BAKAB1R w - - 0 1',
          moves: '1. X1-2 X8.8 2. M3/2',
          notes: [
            'Đỏ (đang hơn một Mã) đưa Xe sang lộ 2, đối mặt Xe đen. Xe đỏ có Mã g2 bảo vệ, Xe đen thì không: Đen phải đổi Xe hoặc chạy.',
            'Đen chấp nhận đổi – theo máy, mọi nước né tránh còn tệ hơn.',
            'Mã ăn lại Xe. Đen mất quân phản công mạnh nhất; Đỏ hơn Mã, thế thắng rõ ràng.',
          ],
          caption: 'Thế cờ minh họa: hơn quân thì đổi Xe để đơn giản hóa.',
        },
      },
      {
        heading: 'Pháo và Mã: giá trị đổi theo số quân',
        body: `Pháo và Mã được coi là ngang giá, nhưng giá trị thật của chúng **thay đổi theo giai đoạn**:

- **Khai cuộc, trung cuộc:** bàn cờ đông quân, Pháo có nhiều ngòi, Mã hay bị cản chân – Pháo thường mạnh hơn.
- **Tàn cuộc:** bàn cờ thưa, Pháo thiếu ngòi, Mã ít bị cản – Mã thường mạnh hơn.

Ngay cả máy cờ của Kỳ Đạo cũng chấm điểm theo kinh nghiệm này: ở trung cuộc Pháo khoảng 450, Mã khoảng 400; ở tàn cuộc Mã khoảng 460, Pháo chỉ khoảng 410.

Thế tàn cuộc bên cạnh: vật chất ngang nhau (Mã đối Pháo, mỗi bên hai Tốt, hai Sĩ), nhưng Pháo đen không có ngòi nào để làm việc, còn Mã đỏ tự do tìm đường tới các Tốt đen. Máy đánh giá Đỏ ưu thế rõ.`,
        diagram: {
          fen: '3aka3/9/4c4/2p3p2/9/9/2PN2P2/9/4A4/3K1A3 w - - 0 1',
          arrows: ['d3c5', 'd3e5'],
          highlights: ['e7:red', 'd3:green'],
          caption: 'Tàn cuộc Mã đối Pháo: vật chất ngang nhau, nhưng Mã linh hoạt hơn hẳn.',
        },
      },
      {
        heading: 'Đổi Xe để vào tàn cuộc có lợi',
        body: `Kết hợp hai ý trên, ta có một kỹ thuật quan trọng: **khi tàn cuộc sau khi đổi có lợi cho mình, hãy chủ động đổi**.

Bên cạnh, mỗi bên còn một Xe; Đỏ có Mã, Đen có Pháo. Xe đỏ d2 và Xe đen d7 nhìn nhau trên lộ 6, mỗi Xe đều có Sĩ bảo vệ. Đỏ ăn Xe – Đen ăn lại – và ván cờ chuyển sang tàn cuộc Mã đối Pháo mà em vừa học.

Máy cờ xác nhận: đổi Xe là nước tốt nhất, sau khi đổi Đỏ ưu thế rõ; còn nếu giữ Xe lại, phần hơn của Đỏ nhỏ đi nhiều.

Ngược lại, nếu em là bên có Pháo trong thế này, hãy tránh đổi Xe: Xe còn trên bàn thì Pháo còn có ngòi, còn có cơ hội.`,
        warning: 'Đừng đổi quân chỉ vì “đổi cho đơn giản” khi em đang kém thế: tàn cuộc thua thì đơn giản đến mấy cũng vẫn thua.',
        diagram: {
          fen: '4ka3/4a4/3rc4/2p3p2/9/9/2P3P2/2NR5/4A4/3A1K3 w - - 0 1',
          moves: '1. X6.5 S5.4',
          notes: [
            'Đỏ ăn Xe d7. Vì Sĩ e8 sẽ ăn lại, đây là một cuộc đổi Xe – và theo máy, là nước tốt nhất trong thế cờ.',
            'Sĩ e8 ăn lại. Tàn cuộc Mã, hai Tốt đối Pháo, hai Tốt: Pháo đen thiếu ngòi, Mã đỏ tự do tìm mục tiêu.',
          ],
          caption: 'Đổi Xe để vào tàn cuộc Mã đối Pháo có lợi.',
        },
      },
    ],
    keyTakeaways: [
      'Trước khi đổi, hỏi: ai ăn lại, quân đó đứng đâu, thế cờ sau đổi mở ra cho ai?',
      'Đổi để kéo quân phòng thủ của đối phương rời nhiệm vụ là cuộc đổi có lời.',
      'Hơn quân thì đổi (nhất là đổi Xe); kém quân thì tránh đổi, giữ quân để phản công.',
      'Trung cuộc Pháo thường mạnh hơn Mã; tàn cuộc Mã thường mạnh hơn Pháo.',
      'Chủ động đổi khi tàn cuộc sau khi đổi có lợi cho mình; tránh đổi khi tàn cuộc đó bất lợi.',
    ],
  },

  // ───────────────────────────── 10. Lập kế hoạch trung cuộc ─────────────────────────────
  {
    id: 'xq-cl-lap-ke-hoach',
    category: 'chien-luoc',
    title: 'Lập kế hoạch trung cuộc',
    subtitle: 'Đánh giá thế cờ, chọn mục tiêu và thực hiện – một ví dụ trọn vẹn',
    level: 4,
    icon: '🗺️',
    minutes: 20,
    intro:
      'Ra khỏi khai cuộc, nhiều người chơi bỗng thấy lạc lối: không còn bài bản để theo, nên đi “nước nào trông được”. Người chơi mạnh thì khác: họ dừng lại, đánh giá thế cờ, tìm ra điểm yếu, rồi chọn một kế hoạch và đi những nước phục vụ kế hoạch đó. Bài này đi cùng em qua một ví dụ trọn vẹn – từ khai cuộc đến khi kế hoạch được thực hiện.',
    sections: [
      {
        heading: 'Bước 1 – Thế cờ từ đâu mà ra?',
        body: `Mọi đánh giá đều bắt đầu từ việc hiểu thế cờ đã hình thành thế nào. Ví dụ của chúng ta là hệ thống **Pháo đầu Xe qua hà đối Bình phong mã bình pháo đổi Xe** mà em đã gặp ở bài Xe. Hãy xem lại chín nước đầu và để ý những gì đã thay đổi:

- Đỏ đưa Xe qua hà, Mã lên bờ sông (d4), Pháo đầu vẫn nhắm lộ giữa.
- Đen đuổi Xe đỏ bằng Pháo, bổ Sĩ, rồi đưa Mã g7 lên h5.
- Mã g7 rời đi – nghĩa là Tốt đầu e6 mất đi một quân bảo vệ.

Đến đây, hãy dừng lại và đánh giá trước khi đi tiếp.`,
        diagram: {
          moves: '1. P2-5 M8.7 2. M2.3 X9-8 3. X1-2 B7.1 4. X2.6 M2.3 5. B7.1 P8-9 6. X2-3 P9/1 7. M8.7 S4.5 8. M7.6 P9-7 9. X3-4 M7.8',
          notes: [
            'Pháo đầu, qua ngòi Tốt e3 nhắm Tốt đầu e6.',
            'Mã g7 giữ Tốt đầu.',
            'Mã g2 ra quân, mở đường cho Xe i0.',
            'Xe đen ra lộ 8; Pháo h7 rời đi là lộ này thông.',
            'Xe đỏ ra lộ 2, nhìn thẳng vào Pháo h7.',
            'Đen tiến Tốt 7, kìm Tốt g3 và mở chân Mã g7.',
            'Xe qua hà, nhắm Tốt i6 không được bảo vệ.',
            'Mã c7 ra quân: lúc này hai Mã cùng giữ Tốt đầu.',
            'Tốt 7 mở chân Mã trái của Đỏ.',
            'Bình pháo đổi Xe: Xe h9 đối mặt Xe h6.',
            'Xe tránh sang g6, đè lên Mã g7.',
            'Pháo lui i8, chuẩn bị đuổi Xe.',
            'Mã c2 ra quân, hoàn thành phát triển cánh trái.',
            'Đen bổ Sĩ, củng cố cung.',
            'Mã bàn hà d4, nhắm Tốt c6 và Tốt đầu.',
            'Pháo sang g8 đuổi Xe g6.',
            'Xe tránh sang f6, vẫn nhắm Tốt đầu.',
            'Mã g7 nhảy lên h5 nhắm Tốt g3, i3. Nhưng giờ Tốt đầu e6 chỉ còn Mã c7 bảo vệ. Hãy dừng lại và đánh giá.',
          ],
          caption: 'Chín nước của hệ thống Pháo đầu Xe qua hà đối Bình phong mã bình pháo đổi Xe.',
        },
      },
      {
        heading: 'Bước 2 – Đánh giá bằng bốn câu hỏi',
        body: `Hãy đánh giá thế cờ bên cạnh qua bốn câu hỏi:

- **Vật chất:** hai bên bằng nhau (đủ Xe, Mã, Pháo, Sĩ, Tượng, mỗi bên năm Tốt).
- **An toàn Tướng:** Đen đã bổ Sĩ, cung khá vững. Đỏ chưa lên Sĩ Tượng nhưng chưa bị đe dọa trực tiếp.
- **Hoạt động của quân:** ba quân đỏ – Pháo e2, Xe f6, Mã d4 – cùng nhắm Tốt đầu e6, trong khi chỉ còn Mã c7 bảo vệ nó. Mã d4 còn nhắm Tốt c6, Xe f6 nhắm Tốt i6, cả hai đều không được bảo vệ. Bên kia, Mã h5 và Pháo g8 của Đen cùng nhắm Tốt g3 không có quân bảo vệ.
- **Tốt qua hà:** chưa bên nào có.

**Kết luận:** điểm yếu lớn nhất của Đen là Tốt đầu e6 – ba quân tấn công, một quân phòng thủ. Kế hoạch tự nhiên của Đỏ: **phá trung lộ**. Nhưng Đỏ phải nhớ điểm yếu của chính mình: Tốt g3.`,
        tip: 'Khi đếm quân tấn công và phòng thủ một điểm, nhớ tính cả những quân tấn công “qua ngòi” như Pháo. Ở đây Pháo e2 nhắm e6 qua ngòi Tốt e3.',
        diagram: {
          fen: 'r1b1kabr1/4a1c2/1cn6/p1p1pR2p/6pn1/2PN5/P3P1P1P/1C2C1N2/9/R1BAKAB2 w - - 18 10',
          arrows: ['e2e6', 'f6e6', 'd4e6', 'c7e6:blue', 'h5g3:red', 'g8g3:red'],
          highlights: ['e6:red', 'g3:yellow'],
          caption: 'Ba quân đỏ nhắm Tốt đầu e6, chỉ một quân đen bảo vệ. Đổi lại, Tốt g3 của Đỏ đang bị hai quân đen nhắm.',
        },
      },
      {
        heading: 'Bước 3 – Thực hiện kế hoạch: phá trung lộ',
        body: `Kế hoạch đã chọn, giờ là lúc tính toán cụ thể. Đỏ phá trung lộ bằng Pháo, và chuỗi đổi quân diễn ra như sau:

- Pháo ăn Tốt đầu kèm nước chiếu, Mã c7 ăn Pháo, Mã d4 ăn lại Mã.
- Đen phản kích bằng Pháo nhắm Mã e6. Đỏ không lùi mà đáp bằng một đe dọa khác (Xe nhắm Pháo g8).
- Đen ăn Mã kèm chiếu, Xe đỏ ăn lại Pháo và chiếm lộ giữa.

Kết quả: Đỏ hơn một Tốt, Xe đứng ở e6 khống chế lộ giữa và nhắm hai Tốt c6, i6 không được bảo vệ. Kế hoạch đã hoàn thành – nhưng ván cờ chưa kết thúc.`,
        diagram: {
          fen: 'r1b1kabr1/4a1c2/1cn6/p1p1pR2p/6pn1/2PN5/P3P1P1P/1C2C1N2/9/R1BAKAB2 w - - 18 10',
          moves: '10. P5.4 M3.5 11. M6.5 P2.1 12. X4-3 P2-5 13. X3-5',
          notes: [
            'Thực hiện kế hoạch: Pháo ăn Tốt đầu, chiếu Tướng (ngòi là Sĩ e8).',
            'Mã c7 ăn Pháo – và nhắm luôn Mã d4 đang không có quân bảo vệ.',
            'Mã d4 ăn lại Mã. Mã đỏ đứng sâu ở e6, có Xe f6 bảo vệ.',
            'Đen phản kích: Pháo b7 lên b6, qua ngòi Tốt c6 nhắm Mã e6.',
            'Đỏ không lùi Mã mà đáp bằng đe dọa: Xe sang g6 nhắm Pháo g8 không được bảo vệ.',
            'Đen ăn Mã e6 kèm nước chiếu (ngòi là Tốt e3).',
            'Xe ăn lại Pháo, chiếm lộ giữa. Đỏ hơn một Tốt; Xe e6 nhắm Tốt c6, Tốt i6 và đè lên Sĩ e8.',
          ],
          caption: 'Phá trung lộ: một chuỗi đổi quân kết thúc với Xe đỏ ở e6 và hơn một Tốt.',
        },
      },
      {
        heading: 'Bước 4 – Đánh giá lại và kế hoạch mới',
        body: `Sau mỗi giai đoạn, hãy **đánh giá lại**. Thế cờ đã khác hẳn:

- **Vật chất:** Đỏ hơn một Tốt.
- **Hoạt động:** Xe e6 của Đỏ rất mạnh; nhưng Xe a0, Pháo b2 của Đỏ vẫn chưa vào cuộc.
- **Điểm yếu:** Tốt g3 của Đỏ đang bị Pháo g8 (qua ngòi Tốt g5) và Mã h5 cùng nhắm, không có quân bảo vệ – Đen có thể lấy lại Tốt.

Máy đánh giá thế cờ gần như cân bằng: phần hơn một Tốt của Đỏ được bù bằng hoạt động của quân đen ở cánh phải Đỏ. Kế hoạch mới của Đỏ: đưa nốt Xe a0, Pháo b2 vào cuộc và khai thác các Tốt yếu c6, i6. Kế hoạch của Đen: phản công vào Tốt g3, i3.

Đó là nhịp điệu của trung cuộc: **đánh giá → kế hoạch → thực hiện → đánh giá lại**.`,
        diagram: {
          fen: 'r1b1kabr1/4a1c2/9/p1p1R3p/6pn1/2P6/P3P1P1P/1C4N2/9/R1BAKAB2 b - - 0 13',
          arrows: ['g8g3:red', 'h5g3:red'],
          highlights: ['e6:green', 'g3:yellow', 'c6:red', 'i6:red'],
          caption: 'Sau khi phá trung lộ: Đỏ hơn Tốt và có Xe e6 mạnh, nhưng Tốt g3 đang bị nhắm.',
        },
      },
      {
        heading: 'Tự luyện: em sẽ đánh giá thế nào?',
        body: `Hãy tự áp dụng quy trình cho thế Pháo đầu đối Phản cung mã bên cạnh (sau nước thứ tư của Đen), trước khi đọc lời giải:

- Vật chất? An toàn Tướng? Hoạt động của quân? Tốt qua hà?
- Điểm yếu của mỗi bên ở đâu?

**Gợi ý lời giải:** vật chất bằng nhau. Điểm đáng chú ý nhất là Tốt đầu e6 của Đen chỉ có Mã c7 bảo vệ, vì Pháo f7 chắn chân Mã g7. Hai Xe đối mặt trên lộ h, và quân ăn lại của Đen sẽ là Mã g7. Một kế hoạch tốt cho Đỏ là **đổi Xe** để Mã g7 phải lui về h9, rồi dùng nhịp được lợi để tăng sức ép – đúng như ví dụ ở bài Tiên thủ và tranh tiên.`,
        diagram: {
          moves: '1. P2-5 M2.3 2. M2.3 P8-6 3. X1-2 M8.7 4. B3.1 X9-8',
          notes: [
            'Pháo đầu, qua ngòi Tốt e3 nhắm Tốt đầu e6.',
            'Đen giữ Tốt đầu bằng Mã c7.',
            'Mã g2 ra quân, mở đường cho Xe i0.',
            'Phản cung mã: Pháo sang f7.',
            'Xe đỏ ra lộ 2, nhìn thẳng tới Mã h9 (Mã có Xe i9 bảo vệ).',
            'Mã g7 ra quân, nhưng Pháo f7 chắn chân nên Mã g7 không giữ được Tốt đầu.',
            'Tiến Tốt 3 mở chân Mã g2.',
            'Hai Xe đối mặt trên lộ h. Đến lượt Đỏ – hãy tự đánh giá và chọn kế hoạch.',
          ],
          caption: 'Bài tập: đánh giá thế cờ và chọn kế hoạch cho Đỏ.',
        },
      },
    ],
    keyTakeaways: [
      'Ra khỏi khai cuộc, hãy dừng lại đánh giá thay vì đi “nước nào trông được”.',
      'Bốn câu hỏi đánh giá: vật chất, an toàn Tướng, hoạt động của quân, Tốt qua hà.',
      'Kế hoạch tốt nhắm vào điểm yếu cụ thể: nơi số quân tấn công vượt số quân phòng thủ.',
      'Khi thực hiện kế hoạch, tính kỹ các nước phản kích và luôn nhớ điểm yếu của chính mình.',
      'Trung cuộc là vòng lặp: đánh giá → kế hoạch → thực hiện → đánh giá lại.',
    ],
  },
];
