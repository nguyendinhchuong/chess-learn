import type { Lesson } from '../types';

export const LESSONS: Lesson[] = [
  // ───────────────────────── 1. Chĩa đôi ─────────────────────────
  {
    id: 'ct-chia-doi',
    category: 'chien-thuat',
    title: 'Chĩa đôi: một nước, hai mục tiêu',
    subtitle: 'Đòn chiến thuật phổ biến nhất trong mọi ván cờ',
    level: 2,
    icon: '🍴',
    minutes: 15,
    intro: `**Chĩa đôi** (fork) là khi một quân tấn công **hai hay nhiều quân** của đối phương cùng lúc. Đối thủ chỉ được đi một nước nên thường chỉ cứu được một quân. Các thống kê cho thấy chĩa đôi là đòn chiến thuật xuất hiện nhiều nhất ở mọi trình độ – từ người mới học đến Đại kiện tướng.`,
    sections: [
      {
        heading: 'Chĩa đôi là gì?',
        body: `Một đòn chĩa đôi hiệu quả nhất khi:

- Một trong hai mục tiêu là **Vua** (chiếu) – đối thủ **bắt buộc** phải xử lý chiếu trước.
- Các mục tiêu **có giá trị cao hơn** quân chĩa, hoặc **không được bảo vệ**.
- Ô chĩa **an toàn** – không bị đối phương ăn.

Ví dụ dưới đây: ô c7 không được bảo vệ. Mã nhảy vào c7 vừa chiếu Vua e8 vừa tấn công Xe a8.`,
        diagram: {
          fen: 'r3k2r/pp3ppp/2n5/1N6/8/8/PPP2PPP/R3K2R w KQkq - 0 1',
          moves: 'Nc7+ Kd7 Nxa8 Rxa8',
          notes: [
            'Chĩa đôi! Mã chiếu Vua e8 và tấn công Xe a8 cùng lúc.',
            'Đen buộc phải thoát chiếu trước.',
            'Mã ăn Xe.',
            'Đen ăn lại Mã, nhưng Trắng đã đổi Mã (3) lấy Xe (5): lời 2 điểm.',
          ],
          arrows: ['b5c7'],
          highlights: ['e8:red', 'a8:red', 'c7:green'],
          caption: 'Trắng đi: tìm đòn chĩa đôi.',
        },
      },
      {
        heading: 'Mã – bậc thầy chĩa đôi',
        body: `Mã là quân chĩa đôi nguy hiểm nhất vì ba lý do:

- Nó tấn công tới **8 ô** theo hình chữ L – rất khó nhìn thấy trước.
- Quân bị Mã tấn công **không thể tấn công ngược lại** Mã (trừ Mã khác).
- Đòn chiếu của Mã **không thể chặn**.

Khi Mã chiếu và đồng thời tấn công Hậu lẫn Xe, các kiện tướng gọi đó là **“chĩa đôi gia đình”** (family fork).`,
        tip: 'Hãy để ý những ô mà Vua và Hậu đối phương cách nhau đúng một “bước Mã đôi”: như Vua g8 và Hậu c6 – ô e7 chạm được cả hai.',
        diagram: {
          fen: '2r2rk1/pp3ppp/2q5/3N4/8/8/PPP2PPP/3Q1RK1 w - - 0 1',
          moves: 'Ne7+ Kh8 Nxc6 Rxc6',
          notes: [
            'Chĩa đôi gia đình! Mã chiếu Vua g8, tấn công Hậu c6 và Xe c8.',
            'Vua phải chạy.',
            'Mã ăn Hậu.',
            'Đen chỉ lấy lại được một Mã: Trắng lời 6 điểm.',
          ],
          arrows: ['d5e7', 'e7g8:red', 'e7c6:red', 'e7c8:red'],
          caption: 'Một nước Mã tấn công ba quân giá trị nhất của Đen.',
        },
      },
      {
        heading: 'Tốt chĩa đôi – vũ khí rẻ tiền nhất',
        body: `Tốt có giá trị thấp nhất nên khi nó chĩa vào hai quân nhẹ (hoặc nặng hơn), đối thủ chắc chắn mất quân.

Một mẫu kinh điển trong khai cuộc là **“đòn chĩa đôi giả thí”**: Đen ăn Tốt e4 bằng Mã, chấp nhận mất Mã một nhịp, rồi lấy lại quân bằng nước Tốt d5 chĩa vào Tượng c4 và Mã e4.`,
        diagram: {
          moves: '1.e4 e5 2.Nf3 Nc6 3.Bc4 Nf6 4.Nc3 Nxe4 5.Nxe4 d5',
          notes: [
            'Trắng chiếm trung tâm bằng tốt e4 – nước khai cuộc phổ biến nhất.',
            'Đen đáp lại đối xứng, giành ô trung tâm và mở đường cho Tượng f8.',
            'Mã ra f3 tấn công ngay tốt e5 – phát triển quân kèm theo đe dọa.',
            'Đen bảo vệ tốt e5 bằng cách đưa Mã ra ô tự nhiên nhất.',
            'Tượng ra c4 nhắm vào f7. Hãy để ý quân này: lát nữa nó sẽ là một trong hai mục tiêu của tốt Đen.',
            'Đen phát triển Mã và tấn công tốt e4, buộc Trắng phải lo bảo vệ nó.',
            'Trắng giữ tốt e4 bằng Mã c3 – nước tự nhiên, nhưng mở ra cơ hội cho đòn giả thí của Đen.',
            '4…Nxe4! – Đen ăn Tốt, có vẻ như để mất Mã…',
            '5.Nxe4 – Trắng ăn lại Mã.',
            '5…d5! – Tốt chĩa đôi Tượng c4 và Mã e4. Đen sẽ lấy lại quân và có trung tâm tốt.',
          ],
          arrows: ['d5c4:red', 'd5e4:red'],
          caption: 'Đòn chĩa đôi bằng Tốt trong khai cuộc Bốn Mã / Ý.',
        },
      },
      {
        heading: 'Hậu chĩa đôi: tấn công từ xa',
        body: `Hậu đi được 8 hướng nên rất giỏi tìm ra những quân **không được bảo vệ** để chĩa đôi, đặc biệt khi kết hợp với **chiếu**.

Một câu nói nổi tiếng của các huấn luyện viên: **“Quân lỏng lẻo dễ rơi”** (Loose pieces drop off). Tượng g4 của Đen không được bảo vệ – và Hậu trắng chỉ cần một nước chiếu để vừa tấn công Vua vừa nhắm vào nó.`,
        diagram: {
          fen: 'r2qk2r/ppp1nppp/3bp3/3p4/6b1/2PP1N2/PP3PPP/R1BQ1RK1 w kq - 0 1',
          moves: 'Qa4+ c6 Qxg4',
          notes: ['Hậu chiếu Vua e8 theo đường chéo, đồng thời tấn công Tượng g4 theo hàng ngang.', 'Đen chặn chiếu.', 'Hậu ăn Tượng không được bảo vệ.'],
          arrows: ['d1a4', 'a4e8:red', 'a4g4:red'],
          highlights: ['g4:red'],
          caption: 'Tượng g4 “lỏng lẻo” – không quân nào bảo vệ.',
        },
      },
      {
        heading: 'Tượng, Xe và cả Vua cũng biết chĩa đôi',
        body: `Mọi quân đều có thể chĩa đôi:

- **Tượng** chĩa theo hai đường chéo – thường đi kèm nước ăn quân có chiếu như **Bxf7+**.
- **Xe** chĩa hai quân trên cùng hàng hoặc cột, thường gặp ở hàng 7.
- **Vua** chĩa hai Tốt hoặc quân không được bảo vệ trong tàn cuộc.

Ví dụ dưới: Tốt f7 chỉ được Vua bảo vệ, nhưng Mã g5 cũng nhắm vào f7. Tượng ăn f7 có chiếu và tấn công Xe e8.`,
        diagram: {
          fen: '2b1r1k1/ppp2ppp/8/6N1/8/1B6/PPP2PPP/6K1 w - - 0 1',
          moves: 'Bxf7+ Kh8 Bxe8',
          notes: [
            'Tượng ăn Tốt có chiếu. Vua không thể ăn lại vì Mã g5 bảo vệ f7. Đồng thời Tượng tấn công Xe e8.',
            'Vua chạy khỏi chiếu sang h8. (Cách chống cự tốt hơn là 1…Kf8: sau Bxe8 Kxe8 Đen ăn lại được Tượng, nhưng vẫn mất phẩm chất – Xe đổi lấy Tượng.)',
            'Tượng ăn Xe – Trắng lời cả Xe lẫn Tốt.',
          ],
          arrows: ['b3f7', 'f7g8:red', 'f7e8:red'],
          caption: 'Chĩa đôi bằng Tượng kết hợp với chiếu.',
        },
      },
      {
        heading: 'Cách săn tìm đòn chĩa đôi',
        body: `Hãy luyện thói quen quét bàn cờ theo các bước:

- **Tìm quân lỏng lẻo**: quân nào của đối phương không được bảo vệ? Vua, Hậu, Xe đứng ở đâu?
- **Tìm “ô giao điểm”**: ô nào mà một quân của mình có thể tấn công hai mục tiêu cùng lúc?
- **Kiểm tra an toàn**: ô đó có bị đối phương kiểm soát không? Nếu có, liệu có thể **dụ** hoặc **đánh lạc hướng** quân bảo vệ?
- **Ưu tiên chiếu**: chĩa đôi kèm chiếu là mạnh nhất vì đối thủ không có thời gian phản công.

Và ở chiều ngược lại: đừng để Vua, Hậu, Xe của mình đứng ở các ô cách nhau một bước Mã khi Mã đối phương ở gần!`,
        tip: 'Khi luyện tập, mỗi khi đến lượt mình, hãy dành 5 giây hỏi: “Có quân nào của đối thủ không được bảo vệ không?”. Câu hỏi này mở ra phần lớn đòn chĩa đôi.',
      },
    ],
    keyTakeaways: [
      'Chĩa đôi = một quân tấn công hai mục tiêu cùng lúc.',
      'Chĩa đôi kèm chiếu là mạnh nhất vì đối thủ buộc phải cứu Vua.',
      'Mã là quân chĩa đôi nguy hiểm nhất; Tốt là quân chĩa đôi “rẻ” nhất.',
      'Quân không được bảo vệ là mục tiêu số một – “quân lỏng lẻo dễ rơi”.',
    ],
  },

  // ───────────────────────── 2. Ghim ─────────────────────────
  {
    id: 'ct-don-ghim',
    category: 'chien-thuat',
    title: 'Đòn ghim: làm tê liệt quân đối phương',
    subtitle: 'Ghim tuyệt đối, ghim tương đối và cách khai thác',
    level: 2,
    icon: '📌',
    minutes: 15,
    intro: `**Ghim** (pin) xảy ra khi một quân tầm xa (Tượng, Xe, Hậu) tấn công một quân của đối phương, mà phía sau quân đó là một quân **giá trị hơn**. Quân bị ghim không thể (hoặc không nên) di chuyển, vì nếu nó rời đi, quân phía sau sẽ bị ăn. Một quân bị ghim gần như “chết” – không bảo vệ được ai, không tấn công được gì.`,
    sections: [
      {
        heading: 'Ghim tuyệt đối và ghim tương đối',
        body: `Có hai loại ghim:

- **Ghim tuyệt đối**: quân phía sau là **Vua**. Theo luật, quân bị ghim **không được phép** di chuyển ra khỏi đường ghim (vì sẽ để Vua bị chiếu).
- **Ghim tương đối**: quân phía sau là **Hậu, Xe** hoặc quân giá trị khác. Quân bị ghim **vẫn được phép** đi, nhưng thường sẽ mất quân phía sau.

Trong ví dụ, Tượng b5 chiếu, Đen chặn bằng Mã c6 – và Mã này lập tức bị **ghim tuyệt đối** vào Vua e8.`,
        diagram: {
          moves: '1.e4 c5 2.Nf3 d6 3.Bb5+ Nc6',
          notes: [
            'Trắng chiếm trung tâm bằng tốt e4, mở đường cho Tượng f1 – chính quân sẽ thực hiện đòn ghim.',
            'Phòng thủ Sicilia: Đen tranh ô d4 từ cánh, tạo thế cờ không đối xứng.',
            'Trắng phát triển Mã ra f3, chuẩn bị đẩy d4 để mở trung tâm.',
            '2…d6 – Mở đường chéo e8–a4.',
            '3.Bb5+ – Tượng chiếu.',
            '3…Nc6 – Mã chặn chiếu nhưng bị ghim tuyệt đối: nó không được phép rời ô c6.',
          ],
          arrows: ['b5e8:red'],
          highlights: ['c6:red'],
          caption: 'Phòng thủ Sicilia, biến Moscow: ví dụ về ghim tuyệt đối.',
        },
      },
      {
        heading: 'Ghim tương đối có thể “phản đòn”',
        body: `Vì quân bị ghim tương đối **vẫn được phép di chuyển**, đôi khi chính nó có thể thoát ra với một đòn bất ngờ. Cái bẫy nổi tiếng **“Bẫy con voi”** (Elephant Trap) trong Gambit Hậu là ví dụ hoàn hảo.

Trắng tưởng Mã f6 bị ghim vào Hậu d8 nên ăn Tốt d5 – nhưng Mã f6 vẫn được phép ăn lại, hy sinh Hậu để rồi thắng lại nhiều hơn.`,
        warning: 'Đừng coi ghim tương đối là ghim tuyệt đối! Luôn kiểm tra: nếu quân bị ghim đi, đối thủ có được gì lớn hơn không?',
        diagram: {
          moves: '1.d4 d5 2.c4 e6 3.Nc3 Nf6 4.Bg5 Nbd7 5.cxd5 exd5 6.Nxd5 Nxd5 7.Bxd8 Bb4+ 8.Qd2 Bxd2+ 9.Kxd2 Kxd8',
          notes: [
            'Trắng mở đầu bằng tốt d4, chiếm trung tâm và mở đường cho Tượng c1 – quân sau này sẽ ghim Mã f6.',
            'Đen đáp đối xứng, đặt tốt ở d5 để giữ phần trung tâm của mình.',
            'Gambit Hậu: tốt c4 tấn công tốt d5, mời Đen từ bỏ trung tâm.',
            'Đen từ chối gambit: tốt e6 giữ vững d5 và mở đường cho Tượng f8.',
            'Mã ra c3 tăng sức ép lên tốt d5 – áp lực vào d5 là chủ đề xuyên suốt của biến này.',
            'Mã f6 bảo vệ thêm tốt d5, nhưng cũng đứng đúng trên đường chéo mà Tượng c1 sắp nhắm tới.',
            '4.Bg5 – Ghim tương đối: Mã f6 bị ghim vào Hậu d8.',
            '4…Nbd7 – Đặt bẫy!',
            'Trắng đổi tốt ở d5, nhắm vào tốt d5 mà Trắng tưởng sắp trở nên yếu ớt.',
            'Đen ăn lại bằng tốt e. Nhìn qua, tốt d5 chỉ được Mã f6 “bị ghim” bảo vệ – và đó chính là mồi nhử.',
            '6.Nxd5?? – Trắng nghĩ Mã f6 bị ghim nên không thể ăn lại.',
            '6…Nxd5! – Ghim chỉ là tương đối: Mã ăn và chấp nhận mất Hậu.',
            '7.Bxd8 – Trắng ăn Hậu…',
            '7…Bb4+! – …nhưng Đen chiếu trước!',
            '8.Qd2 – Chặn chiếu bằng Hậu là cách duy nhất.',
            '8…Bxd2+ – Đen lấy lại Hậu.',
            '9.Kxd2',
            '9…Kxd8 – Kết quả: Đen hơn một quân nhẹ.',
          ],
          caption: 'Bẫy con voi – bài học về ghim tương đối.',
        },
      },
      {
        heading: 'Ghim để thắng quân',
        body: `Khi quân bị ghim có giá trị **cao hơn** quân ghim, đòn ghim thường thắng quân ngay lập tức.

Dưới đây, Hậu đen và Vua đen đứng trên cùng cột e. Trắng chỉ cần đặt Xe lên cột e (được Vua bảo vệ) – Hậu không thể chạy đi đâu, và Đen buộc phải đổi Hậu lấy Xe.`,
        tip: 'Hãy luôn để ý khi Vua và Hậu đối phương đứng cùng hàng, cùng cột hoặc cùng đường chéo – đó là lời mời cho một đòn ghim hoặc xiên.',
        diagram: {
          fen: '4k3/4q1pp/8/8/8/8/PP3KPP/R7 w - - 0 1',
          moves: 'Re1 Qxe1+ Kxe1',
          notes: ['Xe ghim Hậu vào Vua. Hậu chỉ có thể di chuyển dọc cột e.', 'Đen đành đổi Hậu lấy Xe.', 'Trắng đổi Xe (5) lấy Hậu (9) và bước vào tàn cuộc Tốt hơn hai Tốt – thắng dễ dàng.'],
          arrows: ['a1e1', 'e1e8:red'],
          caption: 'Vua và Hậu thẳng hàng – thời cơ cho đòn ghim.',
        },
      },
      {
        heading: 'Tấn công quân bị ghim',
        body: `Nguyên tắc vàng: **“Hãy tấn công quân bị ghim!”** Quân bị ghim không chạy được, nên chỉ cần tấn công nó bằng một quân rẻ hơn (thường là Tốt), hoặc tấn công nó nhiều lần hơn số lần nó được bảo vệ.

Ở ví dụ dưới, Mã e6 bị Xe e1 ghim tuyệt đối vào Vua e8. Tốt d4 tiến lên d5 tấn công Mã – và Mã không thể trốn.`,
        diagram: {
          fen: 'r1bqk2r/ppp2ppp/3pn3/8/3P4/8/PPP2PPP/4R1K1 w kq - 0 1',
          moves: 'd5 Kd7 dxe6+ fxe6',
          notes: [
            'Tốt tấn công Mã bị ghim. Mã không được phép rời cột e.',
            'Đen tháo ghim bằng cách đi Vua – nhưng đã muộn, Mã vẫn bị tấn công.',
            'Tốt ăn Mã (kèm chiếu).',
            'Đen chỉ lấy lại được một Tốt: Trắng lời 2 điểm.',
          ],
          arrows: ['e1e8:red', 'd4d5'],
          highlights: ['e6:red'],
          caption: 'Quân bị ghim là mục tiêu tuyệt vời cho Tốt.',
        },
      },
      {
        heading: 'Cách thoát khỏi đòn ghim',
        body: `Khi quân của em bị ghim, đừng hoảng – hãy xét các cách:

- **Tháo ghim**: di chuyển quân phía sau (ví dụ đi Vua hoặc Hậu ra khỏi đường ghim) – tốt nhất là làm **trước** khi đối thủ kịp tấn công quân bị ghim.
- **Chặn** đường ghim bằng một quân khác rẻ hơn.
- **Đuổi quân ghim**: đẩy Tốt tấn công quân ghim (ví dụ …h6 để đuổi Tượng g5).
- **Phản đòn**: tạo một đe dọa lớn hơn để đối thủ không có thời gian khai thác.

Phòng bệnh hơn chữa bệnh: hạn chế để Vua và Hậu đứng trên cùng đường thẳng hay đường chéo đang mở.`,
        tip: 'Câu hỏi kiểm tra nhanh trước mỗi nước: “Vua và Hậu của mình có đang thẳng hàng với một quân tầm xa của đối thủ không?”.',
      },
    ],
    keyTakeaways: [
      'Ghim tuyệt đối (sau lưng là Vua): quân bị ghim không được phép di chuyển.',
      'Ghim tương đối: quân bị ghim vẫn đi được – coi chừng phản đòn kiểu Bẫy con voi.',
      'Hãy tấn công quân bị ghim, đặc biệt bằng Tốt.',
      'Tránh để Vua, Hậu thẳng hàng với quân tầm xa của đối thủ.',
    ],
  },

  // ───────────────────────── 3. Xiên ─────────────────────────
  {
    id: 'ct-don-xien',
    category: 'chien-thuat',
    title: 'Đòn xiên: tấn công xuyên thấu',
    subtitle: 'Khi quân giá trị phải chạy và để lộ quân phía sau',
    level: 2,
    icon: '🗡️',
    minutes: 12,
    intro: `**Xiên** (skewer) là “anh em ngược” của ghim: quân tầm xa tấn công một quân **giá trị cao** (thường là Vua hoặc Hậu), phía sau nó là một quân khác trên cùng đường thẳng. Quân phía trước buộc phải tránh đi, để lộ quân phía sau cho đối phương ăn.`,
    sections: [
      {
        heading: 'Xiên bằng Xe: chiếu và ăn Hậu',
        body: `Mẫu xiên phổ biến nhất: **chiếu Vua**, Vua phải chạy, quân đứng sau Vua bị ăn.

Trong thế cờ dưới đây, Vua đen e5 và Hậu đen d5 đứng cạnh nhau trên hàng 5. Xe trắng chỉ cần chiếu dọc hàng này.`,
        diagram: {
          fen: '8/8/8/3qk3/8/8/8/6KR w - - 0 1',
          moves: 'Rh5+ Ke4 Rxd5 Kxd5',
          notes: [
            'Xiên! Xe chiếu Vua e5 theo hàng 5; phía sau Vua là Hậu d5. Hậu không thể chặn vì Vua đứng chắn đường.',
            'Vua phải rời hàng 5.',
            'Xe ăn Hậu.',
            'Vua đen ăn lại Xe, nhưng Trắng đã đổi Xe lấy Hậu – và tàn cuộc chỉ còn hai Vua là hòa, tốt hơn nhiều so với thua!',
          ],
          arrows: ['h1h5', 'h5d5:red'],
          caption: 'Trắng đang kém Hậu, nhưng đòn xiên cứu được ván cờ.',
        },
      },
      {
        heading: 'Xiên bằng Tượng',
        body: `Tượng xiên theo đường chéo. Ví dụ: Vua đen d5 và Xe a8 cùng nằm trên đường chéo a8–h1. Tượng trắng chỉ cần chiếm ô trên đường chéo đó để chiếu.

Lưu ý: đòn xiên mạnh nhất khi quân phía sau **không được bảo vệ** – khi đó em ăn được quân miễn phí.`,
        diagram: {
          fen: 'r7/8/8/3k4/8/8/6PP/3B2K1 w - - 0 1',
          moves: 'Bf3+ Ke5 Bxa8',
          notes: ['Tượng chiếu Vua d5. Phía sau Vua trên đường chéo là Xe a8.', 'Vua buộc phải rời đường chéo.', 'Tượng ăn Xe miễn phí.'],
          arrows: ['d1f3', 'f3a8:red'],
          caption: 'Vua và Xe trên cùng đường chéo dài.',
        },
      },
      {
        heading: 'Xiên trong tàn cuộc Xe: mẹo Rh8!',
        body: `Đây là một mẫu tàn cuộc mà mọi kỳ thủ cần biết. Trắng có Tốt a7 và Xe đứng trước nó ở a8; Xe đen đứng phía sau Tốt để ngăn phong cấp.

Nếu Vua đen đứng sai chỗ (như f7), Trắng chơi **Rh8!** – nhường đường cho Tốt phong cấp. Khi Xe đen ăn Tốt a7, Xe trắng chiếu từ h7 và **xiên** Xe đen.

Vì vậy trong tàn cuộc này, Vua bên phòng thủ phải đứng ở **g7 hoặc h7** – những ô an toàn trước đòn xiên.`,
        diagram: {
          fen: 'R7/P4k2/8/8/8/6K1/8/r7 w - - 0 1',
          moves: 'Rh8 Rxa7 Rh7+ Kf6 Rxa7',
          notes: [
            'Rh8! – Đe dọa a8=Q.',
            'Đen buộc phải ăn Tốt (nếu không, Tốt sẽ phong Hậu).',
            'Xiên! Xe chiếu Vua f7 dọc hàng 7, phía sau là Xe a7.',
            'Vua phải rời hàng 7.',
            'Trắng ăn Xe và thắng.',
          ],
          arrows: ['a8h8', 'h7a7:red'],
          caption: 'Đòn xiên kinh điển trong tàn cuộc Xe.',
        },
      },
      {
        heading: 'Phân biệt ghim và xiên',
        body: `Cả ghim và xiên đều là tấn công **hai quân trên cùng một đường thẳng**. Điểm khác biệt nằm ở thứ tự giá trị:

- **Ghim**: quân **rẻ hơn** ở phía trước, quân **đắt hơn** ở phía sau → quân trước không dám đi.
- **Xiên**: quân **đắt hơn** ở phía trước, quân **rẻ hơn** ở phía sau → quân trước buộc phải đi, quân sau bị ăn.

Mẹo nhận biết: khi thấy hai quân đối phương thẳng hàng (cùng hàng, cột, đường chéo) và một quân tầm xa của mình có thể chiếm đường đó, hãy kiểm tra cả ghim lẫn xiên!`,
        tip: 'Vua đối phương bị chiếu theo hàng/cột/đường chéo luôn là cơ hội xiên – hãy nhìn xem phía sau Vua có gì.',
      },
    ],
    keyTakeaways: [
      'Xiên: quân giá trị cao phía trước phải chạy, quân phía sau bị ăn.',
      'Chiếu Vua là cách xiên mạnh nhất vì đối thủ không có lựa chọn.',
      'Trong tàn cuộc Xe với Tốt a7, Vua phòng thủ phải đứng ở g7/h7.',
      'Ghim: quân rẻ phía trước. Xiên: quân đắt phía trước.',
    ],
  },

  // ───────────────────────── 4. Tấn công mở & chiếu đôi ─────────────────────────
  {
    id: 'ct-tan-cong-mo',
    category: 'chien-thuat',
    title: 'Tấn công mở và chiếu đôi',
    subtitle: 'Những quả bom hẹn giờ ẩn sau quân của chính mình',
    level: 3,
    icon: '💥',
    minutes: 16,
    intro: `**Tấn công mở** (discovered attack) xảy ra khi em di chuyển một quân và **để lộ** đường tấn công của một quân tầm xa đứng phía sau nó. Nhờ vậy, một nước đi tạo ra **hai đòn tấn công cùng lúc**: của quân vừa đi và của quân phía sau. Khi cả hai cùng chiếu Vua, ta có **chiếu đôi** – đòn mạnh nhất trong cờ vua.`,
    sections: [
      {
        heading: 'Tấn công mở: hai đòn trong một nước',
        body: `Cấu trúc của một đòn tấn công mở:

- Một **quân tầm xa** (Xe, Tượng, Hậu) nhắm vào mục tiêu nhưng bị **chính quân mình** chắn đường.
- Quân chắn đường **di chuyển** – lý tưởng nhất là kèm theo **chiếu** hoặc **ăn quân** – và đường tấn công phía sau được mở ra.

Ví dụ: Xe d1 nhắm vào Hậu d7 nhưng bị Tượng d3 chắn. Tượng ăn Tốt h7 **có chiếu** – Đen phải xử lý chiếu và không kịp cứu Hậu.`,
        diagram: {
          fen: 'r4rk1/pb1qbppp/1pn1pn2/8/8/2NB1N2/PPP1QPPP/R1BR2K1 w - - 0 1',
          moves: 'Bxh7+ Kxh7 Rxd7',
          notes: [
            'Tượng ăn Tốt có chiếu, đồng thời mở cột d cho Xe d1 tấn công Hậu d7.',
            'Đen phải giải quyết chiếu trước.',
            'Xe ăn Hậu. Trắng đổi Tượng lấy Hậu và Tốt – lời rất lớn.',
          ],
          arrows: ['d3h7', 'd1d7:red'],
          highlights: ['d7:red'],
          caption: 'Tượng d3 là “tấm màn” che Xe d1.',
        },
      },
      {
        heading: 'Chiếu mở: đòn chí mạng',
        body: `Khi quân phía sau chiếu Vua, ta gọi là **chiếu mở**. Quân vừa di chuyển giờ được **tự do** đi bất cứ đâu và tấn công bất cứ quân nào – vì đối thủ còn bận cứu Vua.

Cái bẫy nổi tiếng trong **phòng thủ Petrov**: Đen sao chép nước đi của Trắng một cách máy móc và bị chiếu mở mất Hậu.`,
        diagram: {
          moves: '1.e4 e5 2.Nf3 Nf6 3.Nxe5 Nxe4 4.Qe2 Nf6 5.Nc6+ Be7 6.Nxd8 Kxd8',
          notes: [
            'Trắng chiếm trung tâm bằng tốt e4, mở đường cho Hậu và Tượng f1.',
            'Đen đáp lại đối xứng, giữ cân bằng ở trung tâm và mở đường cho Tượng f8.',
            'Mã ra f3 tấn công tốt e5 – phát triển quân có nhịp.',
            'Phòng thủ Petrov: thay vì bảo vệ e5, Đen phản công ngay tốt e4.',
            '3.Nxe5 – Trắng ăn Tốt e5.',
            '3…Nxe4? – Sao chép nước đi là sai lầm (đúng là 3…d6 trước).',
            '4.Qe2! – Hậu đứng sau Mã e5 trên cột e, nhắm vào Vua e8.',
            '4…Nf6?? – Mã rút lui, để mặc cột e.',
            '5.Nc6+! – Chiếu mở! Hậu e2 chiếu Vua, còn Mã c6 tự do tấn công Hậu d8.',
            '5…Be7 – Đen chặn chiếu.',
            '6.Nxd8 – Mã ăn Hậu.',
            '6…Kxd8 – Trắng đổi Mã lấy Hậu.',
          ],
          caption: 'Bẫy trong phòng thủ Petrov.',
        },
      },
      {
        heading: 'Chiếu đôi: không thể chặn, không thể ăn',
        body: `**Chiếu đôi** là khi **hai quân cùng chiếu Vua** một lúc. Vì không thể chặn hai đường chiếu và cũng không thể ăn hai quân trong một nước, **cách duy nhất** để thoát chiếu đôi là **chạy Vua**.

Đó là lý do chiếu đôi thường dẫn đến chiếu hết, ngay cả khi bên tấn công đã hy sinh rất nhiều quân. Ván cờ ngắn nổi tiếng **Réti – Tartakower (Viên, 1910)** kết thúc bằng một cú hy sinh Hậu và chiếu đôi tuyệt đẹp.`,
        diagram: {
          fen: 'rnb1kb1r/pp3ppp/2p5/4q3/4n3/3Q4/PPPB1PPP/2KR1BNR w kq - 0 9',
          moves: 'Qd8+ Kxd8 Bg5+ Kc7 Bd8#',
          notes: [
            'Qd8+!! – Thí Hậu để kéo Vua đen lên cột d, nơi Xe d1 đang chờ sẵn.',
            'Vua buộc phải ăn Hậu.',
            'Chiếu đôi! Tượng g5 chiếu theo đường chéo, Xe d1 chiếu theo cột d. Vua phải chạy.',
            'Vua chạy sang c7 (nếu 10…Ke8 thì 11.Rd8#).',
            'Chiếu hết! Tượng d8 được Xe d1 bảo vệ.',
          ],
          arrows: ['d3d8', 'd1d8:red'],
          caption: 'Réti – Tartakower, 1910. Trắng đi và chiếu hết trong 3 nước.',
        },
      },
      {
        heading: 'Cối xay gió và cách nhận biết',
        body: `Khi chiếu mở có thể **lặp lại liên tục**, ta có đòn **“cối xay gió”** (windmill): quân phía trước lần lượt chiếu – ăn quân – chiếu mở – ăn quân… trong khi đối thủ chỉ biết đi Vua qua lại. Ván cờ nổi tiếng **Torre – Lasker (Moskva, 1925)** là ví dụ kinh điển: Tượng và Xe của Trắng đã “xay” sạch hàng 7 của Đen.

Cách nhận biết cơ hội tấn công mở:
- Tìm các quân tầm xa của mình đang **bị chính quân mình chắn** trước Vua, Hậu hoặc quân không được bảo vệ của đối phương.
- Hỏi: quân chắn đường có thể đi đâu để tạo thêm đe dọa (chiếu, ăn quân, dọa chiếu hết)?

Cách phòng thủ: đừng để Vua và Hậu của mình đứng trên đường thẳng với quân tầm xa đối phương – kể cả khi đang có quân chắn giữa.`,
        warning: 'Quân tầm xa “bị che” của đối thủ vẫn rất nguy hiểm. Một Xe đứng sau Mã trên cùng cột với Vua của em là quả bom hẹn giờ.',
      },
    ],
    keyTakeaways: [
      'Tấn công mở = di chuyển quân chắn để lộ đường tấn công của quân phía sau.',
      'Chiếu mở cho phép quân vừa đi tự do ăn bất cứ thứ gì.',
      'Chiếu đôi chỉ có thể thoát bằng cách chạy Vua.',
      'Tránh để Vua, Hậu thẳng hàng với quân tầm xa đối phương, dù có quân chắn giữa.',
    ],
  },

  // ───────────────────────── 5. Loại bỏ quân phòng thủ ─────────────────────────
  {
    id: 'ct-loai-bo-phong-thu',
    category: 'chien-thuat',
    title: 'Loại bỏ quân phòng thủ',
    subtitle: 'Tiêu diệt “vệ sĩ” trước khi tấn công mục tiêu',
    level: 3,
    icon: '🛡️',
    minutes: 13,
    intro: `Nhiều khi mục tiêu của em được bảo vệ bởi **đúng một quân**. Thay vì tấn công trực tiếp, hãy **loại bỏ quân phòng thủ** đó – bằng cách ăn nó, đổi nó, hoặc buộc nó rời đi. Khi “vệ sĩ” biến mất, mục tiêu trở nên không còn ai che chở.`,
    sections: [
      {
        heading: 'Ăn quân phòng thủ để chiếu hết',
        body: `Ví dụ kinh điển: Hậu d3 và Tượng b1 tạo thành **dàn pháo** nhắm vào ô h7. Chỉ có một quân bảo vệ h7: **Mã f6**.

Trắng đổi Tượng g5 lấy Mã f6 – dù đây là trao đổi ngang giá, nó loại bỏ người bảo vệ duy nhất của h7.`,
        diagram: {
          fen: 'r1bq1rk1/pp2bppp/2p1pn2/3p2B1/3P4/2NQ1N2/PP3PPP/RB3RK1 w - - 0 1',
          moves: 'Bxf6 Bxf6 Qxh7#',
          notes: ['Tượng ăn Mã f6 – người bảo vệ duy nhất của h7.', 'Đen ăn lại và bị chiếu hết ngay (1…gxf6 cũng thua vì Qxh7#). Cách cứu tốt nhất là 1…g6, chặn đường chéo b1–h7 – Đen vẫn mất một quân nhưng tránh được chiếu hết.', 'Chiếu hết! Hậu h7 được Tượng b1 bảo vệ.'],
          arrows: ['b1h7:yellow', 'f6h7:green'],
          highlights: ['f6:red', 'h7:red'],
          caption: 'Mã f6 là “vệ sĩ” duy nhất của ô h7.',
        },
      },
      {
        heading: 'Loại bỏ quân phòng thủ để thắng quân',
        body: `Cùng ý tưởng có thể dùng để **thắng quân**. Tượng e5 của Đen bị Xe e1 tấn công, và chỉ được Mã c6 bảo vệ. Trắng đổi Tượng b5 lấy Mã c6 – sau đó Tượng e5 không còn ai che chở.

Hãy để ý: Trắng đổi một quân lấy một quân (ngang giá), rồi ăn thêm một quân nữa miễn phí.`,
        diagram: {
          fen: 'r1bq1rk1/pppp1ppp/2n5/1B2b3/8/2NP4/PPP2PPP/R1BQR1K1 w - - 0 1',
          moves: 'Bxc6 dxc6 Rxe5',
          notes: ['Đổi Tượng lấy Mã c6 – quân đang bảo vệ Tượng e5.', 'Đen ăn lại.', 'Tượng e5 mất người bảo vệ, Xe ăn miễn phí. Trắng hơn một quân.'],
          arrows: ['b5c6:red', 'e1e5:red', 'c6e5:green'],
          caption: 'Đếm số quân tấn công và phòng thủ: 1 chọi 1. Loại bỏ quân phòng thủ để phá thế cân bằng.',
        },
      },
      {
        heading: 'Ván cờ Opera: loại bỏ quân phòng thủ liên tục',
        body: `Năm 1858, tại nhà hát Opera Paris, Paul Morphy chơi một ván cờ trở thành biểu tượng của nghệ thuật tấn công. Ở đoạn kết, Mã d7 của Đen bị ghim và là quân then chốt bảo vệ thế trận.

Morphy liên tục **ăn quân phòng thủ** (Rxd7!, Bxd7+!) rồi **đánh lạc hướng** quân cuối cùng (Qb8+!!) để chiếu hết bằng Xe.`,
        diagram: {
          fen: '3rkb1r/p2nqppp/5n2/1B2p1B1/4P3/1Q6/PPP2PPP/2KR3R w k - 3 13',
          moves: 'Rxd7 Rxd7 Rd1 Qe6 Bxd7+ Nxd7 Qb8+ Nxb8 Rd8#',
          notes: [
            '13.Rxd7! – Thí Xe, ăn Mã d7 đang bảo vệ.',
            '13…Rxd7 – Xe đen ăn lại, nhưng giờ chính nó bị Tượng b5 ghim.',
            '14.Rd1 – Tấn công thêm vào quân bị ghim.',
            '14…Qe6 – Hậu đen giải phóng Mã f6 khỏi đòn ghim và đề nghị đổi Hậu.',
            '15.Bxd7+ – Lại ăn quân phòng thủ!',
            '15…Nxd7',
            '16.Qb8+!! – Thí Hậu để kéo Mã d7 rời khỏi cột d.',
            '16…Nxb8',
            '17.Rd8# – Chiếu hết! Một trong những kết thúc đẹp nhất lịch sử.',
          ],
          caption: 'Morphy – Công tước Brunswick & Bá tước Isouard, Paris 1858.',
        },
      },
      {
        heading: 'Cách tìm “vệ sĩ” của đối thủ',
        body: `Khi em thấy một mục tiêu hấp dẫn (ô chiếu hết, quân giá trị) nhưng nó được bảo vệ, hãy hỏi:

- **Quân nào** đang bảo vệ mục tiêu? Có phải chỉ **một** quân?
- Có thể **ăn** quân đó không, kể cả bằng cách thí quân?
- Có thể **đổi** nó, **đuổi** nó (tấn công bằng Tốt), hay **chặn** đường bảo vệ của nó không?

Các quân phòng thủ hay bị loại bỏ nhất: **Mã f6** (bảo vệ h7 và Vua), **Tượng g7** (Tượng fianchetto bảo vệ các ô đen quanh Vua), và **Xe hàng cuối**.`,
        tip: 'Đổi quân không phải lúc nào cũng là “hòa hoãn” – đổi đúng quân phòng thủ là một đòn tấn công.',
      },
    ],
    keyTakeaways: [
      'Nếu mục tiêu chỉ có một quân bảo vệ, hãy loại bỏ quân đó.',
      'Có thể loại bỏ bằng cách ăn, đổi, đuổi hoặc chặn quân phòng thủ.',
      'Mã f6, Tượng g7 và Xe hàng cuối là những “vệ sĩ” hay bị tấn công nhất.',
      'Đổi quân đúng lúc có thể là một đòn tấn công mạnh.',
    ],
  },

  // ───────────────────────── 6. Đánh lạc hướng ─────────────────────────
  {
    id: 'ct-danh-lac-huong',
    category: 'chien-thuat',
    title: 'Đánh lạc hướng',
    subtitle: 'Buộc quân phòng thủ rời khỏi vị trí quan trọng',
    level: 3,
    icon: '🎯',
    minutes: 12,
    intro: `**Đánh lạc hướng** (deflection) là khi em **ép** một quân phòng thủ của đối phương **rời khỏi** ô hoặc đường mà nó đang canh giữ. Thường em sẽ thí một quân mà đối thủ buộc phải ăn – và chính nước ăn đó kéo quân phòng thủ đi xa nhiệm vụ của nó.`,
    sections: [
      {
        heading: 'Đánh lạc hướng để phong cấp',
        body: `Tốt d7 của Trắng chỉ còn một bước nữa là phong cấp, nhưng Xe đen ở d8 đang chặn ô phong cấp.

Trắng thí Xe ở c8! Nếu Đen ăn, Tốt ăn lại và phong Hậu. Nếu Đen không ăn, Xe trắng sẽ ăn Xe d8. Xe đen bị **đánh lạc hướng** khỏi ô d8.`,
        diagram: {
          fen: '3r4/3P2kp/4K1p1/8/8/8/6PP/2R5 w - - 0 1',
          moves: 'Rc8 Rxc8 dxc8=Q',
          notes: ['Rc8! – Tấn công Xe d8, ép nó rời khỏi ô phong cấp.', 'Nếu Xe đen ăn…', '…Tốt ăn lại và phong Hậu! Trắng thắng dễ dàng.'],
          arrows: ['c1c8', 'c8d8:red', 'd7d8:yellow'],
          highlights: ['d8:red'],
          caption: 'Trắng đi và thắng. Xe d8 là quân phòng thủ duy nhất.',
        },
      },
      {
        heading: 'Thí Hậu để đánh lạc hướng',
        body: `Đoạn kết ván Opera của Morphy là ví dụ đẹp nhất: Mã d7 của Đen đang **che** cột d. Morphy thí Hậu ở b8 – Mã buộc phải ăn và rời khỏi d7, mở toang cột d cho Xe chiếu hết.

Mẫu đánh lạc hướng thường đi kèm **chiếu**: đối thủ không có lựa chọn nào khác ngoài việc ăn quân thí.`,
        diagram: {
          fen: '4kb1r/p2n1ppp/4q3/4p1B1/4P3/1Q6/PPP2PPP/2KR4 w k - 0 16',
          moves: 'Qb8+ Nxb8 Rd8#',
          notes: ['Qb8+!! – Hậu chiếu. Cách duy nhất để thoát là dùng Mã ăn Hậu.', 'Mã d7 bị kéo đi – cột d mở ra.', 'Chiếu hết! Xe d8 được Tượng g5 bảo vệ.'],
          arrows: ['b3b8', 'd1d8:red'],
          highlights: ['d7:red'],
          caption: 'Trắng đi và chiếu hết trong 2 nước.',
        },
      },
      {
        heading: 'Nhận biết cơ hội đánh lạc hướng',
        body: `Đánh lạc hướng phát huy khi quân phòng thủ của đối phương có **nhiệm vụ quan trọng**:

- Canh giữ **ô phong cấp** của Tốt thông.
- Bảo vệ **hàng cuối** khỏi chiếu hết.
- Bảo vệ một **quân giá trị** hoặc một **ô chiếu hết**.

Khi tìm thấy một quân như vậy, hãy hỏi: “Mình có thể tấn công nó, chiếu để buộc nó di chuyển, hoặc thí một quân ở ô mà nó buộc phải ăn không?”

Đánh lạc hướng và **loại bỏ quân phòng thủ** rất giống nhau – điểm khác là ở đây quân phòng thủ **vẫn còn**, chỉ là nó bị kéo đi chỗ khác.`,
        tip: 'Những nước thí kèm chiếu (như Qb8+!!) là ứng viên hàng đầu khi tìm đòn đánh lạc hướng, vì đối thủ không có thời gian suy nghĩ phương án khác.',
      },
    ],
    keyTakeaways: [
      'Đánh lạc hướng = ép quân phòng thủ rời nhiệm vụ của nó.',
      'Thường dùng nước thí quân mà đối thủ buộc phải ăn.',
      'Mục tiêu điển hình: quân canh ô phong cấp, quân canh hàng cuối, quân canh ô chiếu hết.',
    ],
  },

  // ───────────────────────── 7. Dụ quân ─────────────────────────
  {
    id: 'ct-du-quan',
    category: 'chien-thuat',
    title: 'Dụ quân: kéo đối thủ vào bẫy',
    subtitle: 'Thí quân để đưa Vua hoặc Hậu đối phương vào ô chết người',
    level: 4,
    icon: '🧲',
    minutes: 15,
    intro: `**Dụ quân** (decoy) là thí một quân để **kéo** một quân đối phương (thường là Vua hoặc Hậu) **đến một ô xấu** – nơi nó sẽ bị chĩa đôi, bị ghim hoặc bị chiếu hết. Nếu đánh lạc hướng là đẩy quân phòng thủ **đi khỏi** vị trí, thì dụ quân là kéo quân **vào** cái bẫy em đã giăng sẵn.`,
    sections: [
      {
        heading: 'Dụ Hậu vào ô bị chĩa đôi',
        body: `Mẫu dụ quân phổ biến: thí quân để Hậu đối phương ăn và đứng vào ô có thể bị **Mã chĩa đôi**.

Vua đen ở h8, Hậu ở c7. Không có đòn chĩa đôi nào ngay lập tức. Nhưng nếu Hậu bị kéo đến d8, Mã f7 sẽ chĩa đôi Vua h8 và Hậu d8!`,
        diagram: {
          fen: '3r3k/ppq3pp/8/6N1/8/8/PP3PPP/3R2K1 w - - 0 1',
          moves: 'Rxd8+ Qxd8 Nf7+ Kg8 Nxd8',
          notes: [
            'Rxd8+! – Ăn Xe có chiếu. Đen buộc phải ăn lại bằng Hậu.',
            'Hậu bị dụ đến d8.',
            'Chĩa đôi! Mã chiếu Vua h8 và tấn công Hậu d8.',
            'Vua chạy.',
            'Mã ăn Hậu. Trắng đổi Xe lấy Xe và Hậu.',
          ],
          arrows: ['d1d8', 'g5f7:yellow'],
          highlights: ['d8:red', 'f7:green'],
          caption: 'Trắng đi: dụ Hậu đến d8 rồi chĩa đôi.',
        },
      },
      {
        heading: 'Dụ Vua ra khỏi hang: Ed. Lasker – Thomas, 1912',
        body: `Đây là một trong những cuộc **“săn Vua”** nổi tiếng nhất lịch sử. Edward Lasker thí Hậu ở h7 để dụ Vua đen ra khỏi vị trí an toàn. Sau đó, Mã, Tốt, Tượng và Xe liên tục chiếu, kéo Vua đen đi từ g8 xuyên qua cả bàn cờ – đến tận g1 – và chiếu hết ở đó!

Hãy xem từng nước để thấy sức mạnh của các nước chiếu liên tiếp: Vua đen không bao giờ có thời gian thở.`,
        diagram: {
          fen: 'rn3rk1/pbppq1pp/1p2pb2/4N2Q/3PN3/3B4/PPP2PPP/R3K2R w KQ - 6 11',
          moves: 'Qxh7+ Kxh7 Nxf6+ Kh6 Neg4+ Kg5 h4+ Kf4 g3+ Kf3 Be2+ Kg2 Rh2+ Kg1 Kd2#',
          notes: [
            '11.Qxh7+!! – Thí Hậu dụ Vua ra khỏi hang.',
            '11…Kxh7 – Bắt buộc.',
            '12.Nxf6+ – Chiếu đôi (Mã và Tượng d3). Vua phải chạy.',
            '12…Kh6',
            '13.Neg4+ – Đuổi Vua tiến lên.',
            '13…Kg5',
            '14.h4+',
            '14…Kf4',
            '15.g3+',
            '15…Kf3',
            '16.Be2+',
            '16…Kg2',
            '17.Rh2+',
            '17…Kg1 – Vua đen đã đi từ g8 đến tận g1!',
            '18.Kd2# – Chiếu hết bằng một nước Vua: Vua rời e1 và Xe a1 chiếu mở dọc hàng 1! Một kết thúc huyền thoại.',
          ],
          caption: 'Trắng đi: Hậu thí ở h7 khởi đầu cuộc săn Vua.',
        },
      },
      {
        heading: 'Dụ quân khác đánh lạc hướng thế nào?',
        body: `Hai đòn này hay đi cùng nhau nhưng mục đích khác nhau:

- **Đánh lạc hướng**: quan tâm đến ô mà quân đối phương **rời đi** (nó không còn bảo vệ được nữa).
- **Dụ quân**: quan tâm đến ô mà quân đối phương **bị kéo đến** (ô đó là cái bẫy).

Khi tìm đòn dụ quân, hãy tự hỏi: “Nếu Vua (hoặc Hậu) của đối phương đứng ở ô X, mình có đòn chĩa đôi, ghim, xiên hay chiếu hết nào không?” Nếu có – hãy tìm cách thí quân ở ô X.`,
        tip: 'Những nước thí Hậu “điên rồ” của các kiện tướng thường là đòn dụ quân: họ đã thấy trước ô mà Vua đối phương sẽ bị kéo đến.',
      },
    ],
    keyTakeaways: [
      'Dụ quân = thí quân để kéo quân đối phương đến một ô xấu.',
      'Ô xấu là nơi xảy ra chĩa đôi, ghim, xiên hoặc chiếu hết.',
      'Chuỗi chiếu liên tiếp sau khi dụ Vua thường quyết định ván cờ.',
    ],
  },

  // ───────────────────────── 8. Quá tải ─────────────────────────
  {
    id: 'ct-qua-tai',
    category: 'chien-thuat',
    title: 'Quá tải: một người làm hai việc',
    subtitle: 'Khai thác quân phòng thủ phải gánh quá nhiều nhiệm vụ',
    level: 3,
    icon: '🏋️',
    minutes: 12,
    intro: `Một quân bị **quá tải** (overloaded) khi nó phải làm **hai nhiệm vụ phòng thủ cùng lúc**. Chỉ cần em tấn công một trong hai nhiệm vụ, quân đó sẽ không thể hoàn thành nhiệm vụ còn lại. Giống như một thủ môn phải chặn hai cú sút cùng lúc – chắc chắn sẽ có một bàn thua.`,
    sections: [
      {
        heading: 'Nhận diện quân bị quá tải',
        body: `Hãy quan sát thế cờ: Xe d8 của Đen đang làm **hai việc**:

- **Bảo vệ Mã d4** (dọc cột d).
- **Canh giữ hàng cuối** – ngăn Xe e1 xâm nhập e8 chiếu hết.

Một quân phải làm hai việc như vậy là **quân quá tải**. Hãy hình dung: nếu nó phải đi làm việc thứ nhất, việc thứ hai sẽ bị bỏ ngỏ.`,
        diagram: {
          fen: '3r2k1/ppp2ppp/q7/8/3n4/8/PQ3PPP/4R1K1 w - - 0 1',
          arrows: ['d8d4:green', 'd8e8:green', 'b2d4:red', 'e1e8:red'],
          highlights: ['d8:yellow'],
          caption: 'Xe d8 vừa bảo vệ Mã d4, vừa canh hàng cuối.',
        },
      },
      {
        heading: 'Khai thác quân quá tải',
        body: `Trắng ăn Mã d4 bằng Hậu! Nếu Xe d8 ăn lại (làm nhiệm vụ thứ nhất), nó rời hàng cuối và Xe e1 chiếu hết ở e8. Nếu Đen không ăn lại, Trắng đơn giản hơn một Mã.`,
        diagram: {
          fen: '3r2k1/ppp2ppp/q7/8/3n4/8/PQ3PPP/4R1K1 w - - 0 1',
          moves: 'Qxd4 Rxd4 Re8#',
          notes: ['Hậu ăn Mã, thách thức Xe d8.', 'Xe ăn lại – và bỏ rơi hàng cuối.', 'Chiếu hết hàng cuối!'],
          caption: 'Trắng đi và thắng.',
        },
      },
      {
        heading: 'Cách tìm và phòng tránh quá tải',
        body: `Để tìm quân quá tải của đối phương:

- Với mỗi quân phòng thủ quan trọng, **liệt kê các nhiệm vụ** của nó: bảo vệ quân nào, canh ô nào, chặn đường nào.
- Nếu một quân có **từ hai nhiệm vụ trở lên**, hãy tấn công một nhiệm vụ – lý tưởng nhất là bằng nước ăn quân hoặc chiếu.

Để phòng tránh cho mình:

- **Phân chia nhiệm vụ** cho nhiều quân; đừng để một quân gánh hết.
- Tạo **lỗ thở** cho Vua để Xe không phải canh hàng cuối mãi.
- Khi đối thủ ăn quân của mình, hãy hỏi: “Nếu mình ăn lại, quân đó bỏ dở nhiệm vụ gì?”`,
        tip: 'Hậu thường là quân bị quá tải nhất vì nó mạnh nên ta hay giao cho nó quá nhiều việc. Hãy nhìn kỹ Hậu đối phương!',
      },
    ],
    keyTakeaways: [
      'Quân quá tải = quân phải làm hai nhiệm vụ phòng thủ cùng lúc.',
      'Tấn công một nhiệm vụ để quân đó bỏ dở nhiệm vụ kia.',
      'Phân chia nhiệm vụ phòng thủ cho nhiều quân để tránh bị quá tải.',
    ],
  },

  // ───────────────────────── 9. Nước trung gian ─────────────────────────
  {
    id: 'ct-nuoc-trung-gian',
    category: 'chien-thuat',
    title: 'Nước trung gian (Zwischenzug)',
    subtitle: 'Đừng vội ăn lại – có thể có nước mạnh hơn!',
    level: 4,
    icon: '⏸️',
    minutes: 13,
    intro: `**Nước trung gian** (tiếng Đức: Zwischenzug, nghĩa là “nước chen giữa”) là khi em **không thực hiện nước đi mà đối thủ chờ đợi** (thường là ăn lại quân), mà chen vào một nước **mạnh hơn** – thường là chiếu hoặc đe dọa lớn – rồi mới quay lại ăn quân sau. Đây là dấu hiệu của tư duy độc lập: kiện tướng không đi theo “kịch bản” của đối thủ.`,
    sections: [
      {
        heading: 'Chiếu trung gian giành lại Hậu',
        body: `Quay lại **Bẫy con voi** em đã gặp ở bài Ghim. Khi Trắng ăn Hậu ở d8, nước “tự nhiên” của Đen là ăn lại Tượng. Nhưng Đen chen vào **7…Bb4+!** – một nước chiếu trung gian. Trắng buộc phải chặn bằng Hậu, và Đen ăn được Hậu trắng trước, rồi mới ăn Tượng d8.`,
        diagram: {
          moves: '1.d4 d5 2.c4 e6 3.Nc3 Nf6 4.Bg5 Nbd7 5.cxd5 exd5 6.Nxd5 Nxd5 7.Bxd8 Bb4+ 8.Qd2 Bxd2+ 9.Kxd2 Kxd8',
          notes: [
            'Trắng chiếm trung tâm bằng tốt d4 – mở đầu quen thuộc của Gambit Hậu.',
            'Đen đặt tốt ở d5, giành phần trung tâm và ngăn Trắng dễ dàng đẩy tiếp e4.',
            'Trắng đưa tốt c4 ra thách thức tốt d5, mời Đen nhận Gambit Hậu.',
            'Đen từ chối gambit và dựng tốt e6 làm điểm tựa cho d5; Tượng f8 – nhân vật chính của nước trung gian – cũng được mở đường.',
            'Mã c3 phát triển và dồn thêm áp lực vào tốt d5 – Trắng đã có hai quân nhắm vào ô này.',
            'Đen phát triển Mã ra f6, thêm một quân bảo vệ tốt d5.',
            'Tượng g5 ghim Mã f6 vào Hậu d8 – nhưng đây chỉ là ghim tương đối.',
            'Đen đưa Mã ra d7 củng cố Mã f6 – và lặng lẽ giăng bẫy, vì Tượng f8 vẫn có đường chéo tới b4.',
            'Trắng đổi tốt ở d5, chuẩn bị nhắm vào tốt d5 của Đen.',
            'Đen ăn lại bằng tốt e – giờ tốt d5 chỉ còn Mã f6 bảo vệ.',
            'Trắng ăn tốt, tin rằng Mã f6 bị ghim nên không dám ăn lại – một tính toán sai lầm chết người.',
            '6…Nxd5! – Đen chấp nhận mất Hậu.',
            '7.Bxd8 – Trắng ăn Hậu. Đen có nên ăn lại Tượng ngay?',
            '7…Bb4+! – Nước trung gian: chiếu trước!',
            '8.Qd2 – Nước chặn duy nhất.',
            '8…Bxd2+ – Đen ăn Hậu…',
            '9.Kxd2',
            '9…Kxd8 – …rồi mới ăn lại Tượng. Đen hơn một Mã.',
          ],
          caption: 'Nước chiếu trung gian 7…Bb4+ đảo ngược hoàn toàn kết quả.',
        },
      },
      {
        heading: 'Nước trung gian trong lý thuyết khai cuộc: đòn tấn công Møller',
        body: `Trong khai cuộc Ý, sau 8…Bxc3 Trắng có thể ăn lại Tượng bằng 9.bxc3 – nhưng **9.d5!** mạnh hơn nhiều. Tốt d5 tấn công Mã c6, Tượng c3 vẫn đang bị Tốt b2 đe dọa – Đen có **hai quân bị tấn công cùng lúc**.

Đây là ví dụ về nước trung gian ở trình độ cao: không phải chiếu, mà là **đe dọa lớn hơn** buộc đối thủ phản ứng.`,
        diagram: {
          fen: 'r1bqk2r/pppp1ppp/2n5/8/2BPn3/2b2N2/PP3PPP/R1BQ1RK1 w kq - 0 9',
          moves: 'd5 Bf6 Re1 Ne7 Rxe4',
          notes: [
            '9.d5! – Thay vì ăn lại Tượng c3, Trắng tấn công Mã c6.',
            '9…Bf6 – Tượng rút lui.',
            '10.Re1 – Ghim Mã e4 vào Vua e8.',
            '10…Ne7',
            '11.Rxe4 – Trắng lấy lại quân với thế trận rất hoạt động.',
          ],
          arrows: ['d4d5', 'b2c3:red'],
          caption: 'Đòn tấn công Møller trong khai cuộc Ý.',
        },
      },
      {
        heading: 'Thói quen phòng tránh “đi theo quán tính”',
        body: `Phần lớn người chơi ăn lại quân theo **phản xạ**. Kiện tướng thì luôn tự hỏi trước khi ăn lại:

- Có nước **chiếu** nào làm thay đổi tình hình không?
- Có nước **ăn quân khác** có giá trị hơn không?
- Có nước **đe dọa** lớn hơn (dọa chiếu hết, dọa ăn Hậu) không?
- Quân của mình đang bị tấn công có thể **ăn một quân khác** trước khi bị ăn không? (đòn này gọi là **desperado – quân liều mạng**)

Và khi tính toán chuỗi trao đổi, đừng quên rằng **đối thủ** cũng có thể chen nước trung gian vào!`,
        warning: 'Sai lầm phổ biến: tính toán một chuỗi trao đổi nhưng “quên” rằng đối thủ có quyền không ăn lại theo kịch bản của mình.',
      },
    ],
    keyTakeaways: [
      'Nước trung gian = chen một nước mạnh hơn thay vì nước “tự nhiên” được chờ đợi.',
      'Thường là chiếu hoặc đe dọa lớn, buộc đối thủ phải phản ứng.',
      'Trước mỗi lần ăn lại quân, hãy kiểm tra: có nước nào mạnh hơn không?',
    ],
  },

  // ───────────────────────── 10. Chiếu hết hàng cuối ─────────────────────────
  {
    id: 'ct-chieu-het-hang-cuoi',
    category: 'chien-thuat',
    title: 'Chiếu hết hàng cuối',
    subtitle: 'Khi chính hàng Tốt che chắn trở thành nhà tù',
    level: 2,
    icon: '🚪',
    minutes: 12,
    intro: `Sau khi nhập thành, Vua thường đứng sau ba Tốt f, g, h. Đó là lá chắn tuyệt vời – cho đến khi Xe hoặc Hậu đối phương xâm nhập **hàng cuối**. Lúc đó, chính các Tốt chặn mọi lối thoát của Vua. **Chiếu hết hàng cuối** là một trong những đòn quyết định ván cờ nhiều nhất ở mọi trình độ.`,
    sections: [
      {
        heading: 'Mẫu cơ bản',
        body: `Điều kiện của chiếu hết hàng cuối:

- Vua ở hàng cuối, **các Tốt phía trước chưa di chuyển** (không có lỗ thở).
- **Không có quân nào** của đối phương bảo vệ hàng cuối, hoặc các quân bảo vệ có thể bị loại bỏ.
- Em có Xe hoặc Hậu có thể xâm nhập hàng cuối.`,
        diagram: {
          fen: '6k1/5ppp/8/8/8/8/5PPP/3R2K1 w - - 0 1',
          moves: 'Rd8#',
          notes: ['Chiếu hết! Vua g8 bị các Tốt của chính mình giam lại.'],
          arrows: ['d1d8:red'],
          caption: 'Mẫu chiếu hết hàng cuối đơn giản nhất.',
        },
      },
      {
        heading: 'Thí Hậu để mở hàng cuối',
        body: `Khi hàng cuối được bảo vệ, hãy **đếm**: em có bao nhiêu quân tấn công ô xâm nhập, đối thủ có bao nhiêu quân bảo vệ?

Ở đây, Xe e8 của Đen bị Trắng tấn công **2 lần** (Hậu e4 và Xe e1 đứng phía sau), nhưng chỉ được bảo vệ **1 lần** (Xe c8). Trắng thí Hậu để đổi bỏ quân bảo vệ, và cuối cùng Xe e1 chiếu hết khi hàng cuối không còn ai canh giữ.`,
        diagram: {
          fen: '2r1r1k1/pp3ppp/1q6/8/4Q3/8/PP3PPP/4R1K1 w - - 0 1',
          moves: 'Qxe8+ Rxe8 Rxe8#',
          notes: ['Qxe8+! – Thí Hậu, ăn Xe e8 có chiếu.', 'Xe c8 buộc phải ăn lại.', 'Chiếu hết! Hàng cuối không còn ai bảo vệ.'],
          arrows: ['e4e8:red', 'e1e8:red'],
          caption: 'Trắng đi và chiếu hết trong 2 nước.',
        },
      },
      {
        heading: 'Phòng thủ: tạo lỗ thở đúng lúc',
        body: `Cách phòng thủ tốt nhất là tạo **lỗ thở** (luft) cho Vua – đẩy Tốt h hoặc g lên một ô. Thời điểm thích hợp:

- Khi các quân nặng (Xe, Hậu) bắt đầu xuất hiện trên các cột mở.
- Khi em không có việc gì cấp bách hơn – một nước “dự phòng” khôn ngoan.

Ở ví dụ dưới, Trắng đã đẩy Tốt h3 từ trước. Khi Xe đen chiếu ở d1, Vua trắng bình tĩnh bước sang h2.`,
        warning: 'Đừng tạo lỗ thở quá sớm hoặc quá nhiều – mỗi nước Tốt trước Vua đều làm yếu đi lá chắn. Một nước h3 (hoặc h6) đúng lúc là đủ.',
        diagram: {
          fen: '3r2k1/5ppp/8/8/8/7P/5PP1/6K1 b - - 0 1',
          moves: 'Rd1+ Kh2',
          notes: ['Xe đen chiếu ở hàng cuối…', '…nhưng Vua trắng đã có lỗ thở h2. Không có chuyện gì xảy ra.'],
          highlights: ['h2:green'],
          caption: 'Lỗ thở h2 cứu Vua trắng.',
        },
      },
      {
        heading: 'Dấu hiệu cảnh báo và mẹo tấn công',
        body: `Hãy kiểm tra hàng cuối (của mình và của đối thủ) khi thấy:

- Vua đã nhập thành và **chưa có lỗ thở**.
- Đối phương có **Xe trên cột mở** hoặc **Hậu có thể đến hàng cuối**.
- Quân bảo vệ hàng cuối đang bị **quá tải** (phải làm thêm nhiệm vụ khác).

Khi tấn công, hãy kết hợp chiếu hết hàng cuối với các đòn **đánh lạc hướng** và **quá tải**: ép quân canh hàng cuối rời đi, rồi xâm nhập.`,
        tip: 'Ngay cả khi không thể chiếu hết, mối đe dọa hàng cuối thường giúp em thắng quân, vì đối thủ phải dành nước để tạo lỗ thở hoặc phòng thủ.',
      },
    ],
    keyTakeaways: [
      'Vua không có lỗ thở + hàng cuối bỏ trống = nguy cơ chiếu hết.',
      'Đếm số quân tấn công và bảo vệ ô xâm nhập; thí quân để đổi bỏ người bảo vệ.',
      'Tạo một lỗ thở (h3/h6) vào thời điểm thích hợp.',
    ],
  },

  // ───────────────────────── 11. Mã ngạt ─────────────────────────
  {
    id: 'ct-ma-ngat',
    category: 'chien-thuat',
    title: 'Chiếu hết Mã ngạt',
    subtitle: 'Vua bị chính quân mình bóp nghẹt',
    level: 3,
    icon: '🐴',
    minutes: 13,
    intro: `**Mã ngạt** (smothered mate) là thế chiếu hết bằng Mã khi Vua đối phương bị **các quân của chính mình vây kín**, không còn ô nào để chạy. Đây là một trong những thế chiếu hết đẹp và bất ngờ nhất – và vì Mã nhảy qua quân khác, không có cách nào chặn được.`,
    sections: [
      {
        heading: 'Mẫu Mã ngạt cơ bản',
        body: `Vua đen ở góc h8, xung quanh là Xe g8 và hai Tốt g7, h7 – chính những quân bảo vệ Vua lại khóa chặt mọi lối thoát.

Mã trắng chỉ cần nhảy đến f7 là chiếu hết: không thể chặn chiếu của Mã, không quân đen nào ăn được f7, và Vua không có ô nào để đi.`,
        diagram: {
          fen: '6rk/6pp/8/6N1/8/8/8/6K1 w - - 0 1',
          moves: 'Nf7#',
          notes: ['Chiếu hết Mã ngạt!'],
          highlights: ['g8:red', 'g7:red', 'h7:red'],
          caption: 'Vua h8 bị vây kín bởi chính quân của mình.',
        },
      },
      {
        heading: '“Di sản của Philidor”: thí Hậu để tạo Mã ngạt',
        body: `Đây là chuỗi đòn kinh điển, được nhắc đến từ thời Philidor (thế kỷ 18) và còn gọi là **di sản Philidor**:

- Mã chiếu ở f7, đẩy Vua sang g8.
- **Chiếu đôi** bằng Mã h6 (cùng Hậu c4 trên đường chéo) – Vua buộc phải về h8.
- **Thí Hậu ở g8!!** – Xe buộc phải ăn, tự lấp kín ô g8.
- Mã quay lại f7: **chiếu hết Mã ngạt**.`,
        diagram: {
          fen: '4r2k/ppp3pp/8/q3N3/2Q5/8/PP4PP/5R1K w - - 0 1',
          moves: 'Nf7+ Kg8 Nh6+ Kh8 Qg8+ Rxg8 Nf7#',
          notes: [
            'Mã chiếu, Vua chỉ có ô g8.',
            'Đen không có lựa chọn: Vua lui về g8, nhưng ô này lại nằm ngay trên đường chéo của Hậu c4.',
            'Chiếu đôi! Mã h6 và Hậu c4 cùng chiếu. (Ô f8 bị Xe f1 kiểm soát.)',
            'Vua phải quay về góc.',
            'Qg8+!! – Thí Hậu! Vua không ăn được vì Mã h6 bảo vệ g8.',
            'Xe buộc phải ăn – tự lấp ô g8.',
            'Chiếu hết Mã ngạt!',
          ],
          arrows: ['c4g8:red'],
          caption: 'Trắng đi và chiếu hết trong 4 nước.',
        },
      },
      {
        heading: 'Mã ngạt trong khai cuộc',
        body: `Mã ngạt không chỉ xuất hiện ở góc bàn cờ. Một cái bẫy nổi tiếng trong **phòng thủ Caro-Kann** dẫn đến Mã ngạt ngay ở nước thứ 6!

Sau 5.Qe2, Hậu trắng đứng trên cột e cùng Vua đen. Nếu Đen phát triển máy móc bằng 5…Ngf6??, Mã d6 chiếu hết: Tốt e7 không thể ăn Mã vì nó bị Hậu e2 ghim vào Vua.`,
        diagram: {
          moves: '1.e4 c6 2.d4 d5 3.Nc3 dxe4 4.Nxe4 Nd7 5.Qe2 Ngf6 6.Nd6#',
          notes: [
            'Trắng chiếm trung tâm bằng tốt e4, mở đường cho Hậu và Tượng f1.',
            'Phòng thủ Caro-Kann: tốt c6 chuẩn bị …d5 để thách thức trung tâm một cách vững chắc.',
            'Trắng dựng trung tâm hai tốt e4–d4, chiếm trọn hai ô trung tâm.',
            'Đen tấn công tốt e4 – đúng kế hoạch của Caro-Kann.',
            'Mã c3 bảo vệ tốt e4 và phát triển quân, giữ vững trung tâm.',
            'Đen đổi tốt ở e4, giải tỏa áp lực của Trắng ở trung tâm.',
            'Mã ăn lại tốt và đứng giữa bàn cờ – chính Mã này sẽ nhảy tới d6 trong đòn kết thúc.',
            'Đen chuẩn bị …Ngf6 để đuổi Mã e4 mà không phải nhận tốt chồng nếu Trắng đổi ở f6.',
            '5.Qe2 – Một nước đặt bẫy.',
            '5…Ngf6?? – Nước phát triển “tự nhiên” nhưng chết người.',
            '6.Nd6# – Chiếu hết! Vua e8 bị Hậu d8, Tượng f8, Mã d7, Tốt e7, f7 vây kín; Tốt e7 bị ghim nên không ăn được Mã.',
          ],
          arrows: ['e2e8:red'],
          caption: 'Bẫy Mã ngạt trong phòng thủ Caro-Kann.',
        },
      },
      {
        heading: 'Khi nào nghĩ đến Mã ngạt?',
        body: `Hãy tìm kiếm Mã ngạt khi:

- Vua đối phương ở **góc** (h8, g8, a8) hoặc ở giữa nhưng bị **chính quân mình vây quanh**.
- Em có **Mã ở gần** và một quân tầm xa (thường là Hậu) trên đường chéo a2–g8 hoặc b1–h7.
- Có thể **thí quân để ép một quân đối phương lấp ô thoát cuối cùng** của Vua.

Mẹo phòng thủ: khi Vua ở góc, tránh để các quân của mình chiếm hết các ô xung quanh; một Tốt h6 hay g6 có thể là lối thoát cứu mạng.`,
        tip: 'Bẫy Blackburne–Shilling (bài Tư duy như kiện tướng) cũng kết thúc bằng một kiểu Mã ngạt: Vua trắng e1 bị Hậu, Xe, Tượng và các Tốt của chính mình vây kín.',
      },
    ],
    keyTakeaways: [
      'Mã ngạt = Mã chiếu hết khi Vua bị chính quân mình vây kín.',
      'Di sản Philidor: Mã chiếu → chiếu đôi → thí Hậu ở g8 → Mã ngạt.',
      'Chiếu của Mã không thể chặn – chỉ có thể ăn Mã hoặc chạy Vua.',
    ],
  },

  // ───────────────────────── 12. Thí Tượng h7 ─────────────────────────
  {
    id: 'ct-thi-tuong-h7',
    category: 'chien-thuat',
    title: 'Thí Tượng ở h7 (“Món quà Hy Lạp”)',
    subtitle: 'Đòn hy sinh kinh điển để phá tan thành trì nhập thành',
    level: 4,
    icon: '🎁',
    minutes: 18,
    intro: `**“Món quà Hy Lạp”** (Greek Gift) được đặt tên theo con ngựa thành Troy: một “món quà” trông vô hại nhưng mang theo đội quân hủy diệt. Trắng thí Tượng ở h7 có chiếu, kéo Vua đen ra, rồi Mã và Hậu ập vào tấn công. Đây là đòn hy sinh mà mọi kỳ thủ tấn công phải thuộc lòng – kể cả để phòng thủ trước nó.`,
    sections: [
      {
        heading: 'Điều kiện để thí Tượng h7',
        body: `Đòn thí chỉ thành công khi có đủ các yếu tố sau (hãy kiểm tra từng điều!):

- **Tượng d3** nhắm thẳng vào h7 trên đường chéo b1–h7.
- **Mã f3** có thể nhảy đến **g5** an toàn (không bị Tượng e7 hay Tốt h6 khống chế, hoặc nếu bị ăn thì có quân ăn lại).
- **Hậu** có thể đến **h5** (hoặc h-file) nhanh chóng.
- **Không có Mã đen ở f6** bảo vệ h7 – thường do **Tốt e5** của Trắng đã đuổi nó đi.
- Đen **không có phòng thủ** nhanh như …Nf6, …Bf5 hay Hậu kịp sang h-file.

Thế cờ dưới đây hội tụ đủ các điều kiện: một thế cờ điển hình của khai cuộc Pháp.`,
        diagram: {
          fen: 'r1bq1rk1/pppn1ppp/2n1p3/3pP3/1b1P4/2NB1N2/PPP2PPP/R1BQ1RK1 w - - 0 1',
          arrows: ['d3h7:red', 'f3g5:yellow', 'd1h5:yellow'],
          highlights: ['h7:red', 'e5:green', 'f6:green'],
          caption: 'Tượng d3, Mã f3, Hậu d1 sẵn sàng. Tốt e5 khống chế f6.',
        },
      },
      {
        heading: 'Diễn biến chính của đòn thí',
        body: `Sau **1.Bxh7+ Kxh7 2.Ng5+**, Vua đen có ba lựa chọn: …Kg8, …Kg6 hoặc …Kh6. Phương án thường gặp nhất là **2…Kg8**, khi đó **3.Qh5** đe dọa **Qh7#**.

Đen chỉ có thể tạo đường chạy cho Vua bằng cách dọn ô f8 (ví dụ **3…Re8**), nhưng Hậu và Mã trắng tiếp tục truy đuổi cho đến khi chiếu hết.`,
        diagram: {
          fen: 'r1bq1rk1/pppn1ppp/2n1p3/3pP3/1b1P4/2NB1N2/PPP2PPP/R1BQ1RK1 w - - 0 1',
          moves: 'Bxh7+ Kxh7 Ng5+ Kg8 Qh5 Re8 Qxf7+ Kh8 Qh5+ Kg8 Qh7+ Kf8 Qh8+ Ke7 Qxg7#',
          notes: [
            '1.Bxh7+! – Món quà Hy Lạp.',
            '1…Kxh7 – Nhận quà. (Nếu không ăn, Trắng đơn giản hơn một Tốt và Vua đen bị phơi.)',
            '2.Ng5+ – Mã chiếu, mở đường cho Hậu.',
            '2…Kg8 – Lùi về.',
            '3.Qh5 – Đe dọa Qh7#. Đen chỉ có vài giây để phòng thủ.',
            '3…Re8 – Dọn ô f8 cho Vua chạy.',
            '4.Qxf7+ – Ăn Tốt có chiếu.',
            '4…Kh8',
            '5.Qh5+',
            '5…Kg8',
            '6.Qh7+',
            '6…Kf8',
            '7.Qh8+',
            '7…Ke7',
            '8.Qxg7# – Chiếu hết! Tốt e5 kiểm soát d6 và f6, Hậu và Mã khóa các ô còn lại.',
          ],
          caption: 'Một phương án phòng thủ điển hình và cách Trắng kết thúc.',
        },
      },
      {
        heading: 'Các phương án phòng thủ của Đen',
        body: `Sau 1.Bxh7+ Kxh7 2.Ng5+, đòn thí có đúng hay không phụ thuộc vào cách Vua đen chạy:

- **2…Kg8 3.Qh5**: thường thắng cho Trắng nếu Đen không có quân phòng thủ h7 kịp thời. Nếu Đen chơi 3…Nf6?, Trắng ăn **exf6** nhờ Tốt e5.
- **2…Kg6**: Vua tiến ra phía trước – nguy hiểm nhưng phức tạp. Trắng thường tiếp tục bằng **Qg4** hoặc **h4–h5+** để đuổi Vua.
- **2…Kh6**: thường bị phạt bởi **Nxe6+** (chiếu mở bởi Tượng c1) hoặc **Qg4/Qd3** tùy thế cờ.

Đây là đòn thí đòi hỏi **tính toán cụ thể**. Đừng thí chỉ vì “trông giống mẫu” – hãy tính ít nhất phương án 2…Kg8 và 2…Kg6.`,
        warning: 'Nếu Đen có Tượng e7 kiểm soát g5 mà Trắng không thể ăn lại bằng Tượng c1, hoặc Đen có Mã f6 bảo vệ h7, đòn thí thường thất bại và em chỉ mất một Tượng.',
      },
      {
        heading: 'Bảng kiểm tra nhanh trước khi thí',
        body: `Trước khi chơi Bxh7+, hãy trả lời “có” cho các câu hỏi sau:

- Tượng của mình nhắm vào h7, và **Vua đen đã nhập thành** cánh Vua?
- Mã có thể đến **g5** mà không bị ăn mất (hoặc có quân ăn lại)?
- Hậu có thể đến **h5** hoặc **cột h** trong một nước?
- Đen **không có Mã f6** và không thể đưa quân phòng thủ đến kịp?
- Mình đã tính các phương án **…Kg6** và **…Kh6**?

Ở chiều ngược lại, khi cầm quân Đen: hãy giữ **Mã ở f6** càng lâu càng tốt, và cảnh giác khi Trắng có Tốt e5 cùng Tượng d3.`,
        tip: 'Khi phòng thủ khai cuộc Pháp hoặc Gambit Hậu, hãy chú ý thế cờ có Tốt trắng e5 + Tượng d3: đó là “mùi” của Món quà Hy Lạp.',
      },
    ],
    keyTakeaways: [
      'Món quà Hy Lạp: Bxh7+ Kxh7 Ng5+ rồi Qh5 tấn công.',
      'Cần: Tượng d3, Mã đến được g5, Hậu đến được h5, không có Mã f6 phòng thủ.',
      'Tốt e5 là đồng minh quan trọng: khống chế f6 và d6.',
      'Luôn tính các phương án …Kg8, …Kg6, …Kh6 trước khi thí.',
    ],
  },

  // ───────────────────────── 13. Mẫu chiếu hết kinh điển ─────────────────────────
  {
    id: 'ct-mau-chieu-het',
    category: 'chien-thuat',
    title: 'Các mẫu chiếu hết kinh điển',
    subtitle: 'Anastasia, Ả Rập, Boden, Légal, Cầu vai… – bộ sưu tập của nhà vô địch',
    level: 3,
    icon: '🏆',
    minutes: 20,
    intro: `Kiện tướng không tính toán mọi thứ từ đầu – họ **nhận ra mẫu hình**. Khi đã thuộc các mẫu chiếu hết kinh điển, em sẽ “nhìn thấy” đòn kết thúc chỉ trong vài giây, giống như nhận ra khuôn mặt người quen. Hãy học từng mẫu, ghi nhớ vị trí quân then chốt và luyện tập cho đến khi trở thành phản xạ.`,
    sections: [
      {
        heading: 'Chiếu hết Anastasia: Mã + Xe trên cột h',
        body: `Mẫu này mang tên tiểu thuyết “Anastasia und das Schachspiel” (1803). Đặc điểm:

- Vua đối phương ở **h7** (hoặc h8), bị **Tốt g7** của chính mình chặn.
- **Mã e7** khống chế g8 và g6.
- **Xe (hoặc Hậu)** chiếu dọc cột h.

Thường Trắng phải **thí Hậu ở h7** để mở cột h và kéo Vua vào lưới.`,
        diagram: {
          fen: 'rqb2rk1/pppp1ppp/8/3N3Q/8/3R4/PPP2PPP/6K1 w - - 0 1',
          moves: 'Ne7+ Kh8 Qxh7+ Kxh7 Rh3#',
          notes: [
            'Mã chiếu và chiếm ô then chốt e7.',
            'Vua chỉ còn ô h8.',
            'Thí Hậu! Mở cột h.',
            'Vua buộc phải ăn.',
            'Chiếu hết Anastasia! Mã e7 khóa g8 và g6, Tốt g7 khóa chính Vua.',
          ],
          caption: 'Trắng đi và chiếu hết trong 3 nước.',
        },
      },
      {
        heading: 'Chiếu hết Ả Rập: Mã bảo vệ Xe ở góc',
        body: `Một trong những mẫu chiếu hết cổ xưa nhất, xuất hiện từ thời cờ Ả Rập (shatranj):

- Vua ở **góc** (h8).
- **Xe ở h7** chiếu, được **Mã f6** bảo vệ.
- Mã f6 đồng thời khống chế ô g8.

Mẫu này rất hay gặp trong tàn cuộc Xe + Mã chống Xe.`,
        diagram: {
          fen: '7k/R7/5N2/8/8/8/8/6K1 w - - 0 1',
          moves: 'Rh7#',
          notes: ['Chiếu hết Ả Rập! Xe h7 được Mã f6 bảo vệ, Mã khống chế g8.'],
          arrows: ['f6h7:green', 'f6g8:green'],
          caption: 'Trắng đi và chiếu hết trong 1 nước.',
        },
      },
      {
        heading: 'Chiếu hết Boden: hai Tượng chéo nhau',
        body: `Mẫu chiếu hết bằng **hai Tượng** trên hai đường chéo cắt nhau, thường gặp khi Vua đã **nhập thành cánh Hậu** và các ô xung quanh bị chính quân mình chiếm.

Ván cờ **Schulder – Boden (London, 1853)** đã đặt tên cho mẫu này: Đen thí Hậu ở c3 để phá lá chắn Tốt, rồi Tượng a3 chiếu hết.`,
        diagram: {
          fen: '2k1rb1r/ppp3pp/2n2q2/3p1b2/2B2P2/2P1BQ2/PP1N1P1P/2KR3R w - - 0 14',
          moves: 'Bxd5 Qxc3+ bxc3 Ba3#',
          notes: [
            '14.Bxd5? – Trắng ăn Tốt, không thấy nguy hiểm.',
            '14…Qxc3+!! – Thí Hậu phá lá chắn.',
            '15.bxc3',
            '15…Ba3# – Chiếu hết Boden! Tượng a3 và Tượng f5 cắt chéo nhau; Mã d2, Xe d1 lấp các ô còn lại.',
          ],
          caption: 'Schulder – Boden, 1853. Đen đi và chiếu hết.',
        },
      },
      {
        heading: 'Chiếu hết Légal: thí Hậu trong khai cuộc',
        body: `Kermur de Légal (thầy của Philidor) đã giăng cái bẫy này từ thế kỷ 18. Đen ghim Mã f3 vào Hậu và tưởng Mã không thể đi – nhưng đó chỉ là **ghim tương đối**.

Trắng bỏ mặc Hậu, Mã ăn e5. Nếu Đen tham lam ăn Hậu, ba quân nhẹ của Trắng chiếu hết Vua đen.`,
        diagram: {
          moves: '1.e4 e5 2.Nf3 d6 3.Bc4 Bg4 4.Nc3 g6 5.Nxe5 Bxd1 6.Bxf7+ Ke7 7.Nd5#',
          notes: [
            'Trắng chiếm trung tâm, mở đường chéo cho Tượng f1 – quân sẽ đánh vào f7 về sau.',
            'Đen đáp đối xứng, giành phần trung tâm của mình và mở đường cho Hậu cùng Tượng f8.',
            'Mã ra f3 tấn công tốt e5 – chính Mã này lát nữa sẽ “bị ghim”.',
            'Phòng thủ Philidor: tốt d6 giữ e5 và mở đường cho Tượng c8 ra ghim Mã f3.',
            'Tượng ra c4 nhắm thẳng vào f7 – ô yếu chỉ có Vua Đen bảo vệ.',
            '3…Bg4 – Ghim Mã f3 vào Hậu d1.',
            'Trắng tiếp tục phát triển; Mã c3 kiểm soát ô d5 – ô then chốt trong đòn chiếu hết sắp tới.',
            '4…g6? – Nước đi chậm chạp.',
            '5.Nxe5!! – Mã “bị ghim” vẫn nhảy đi!',
            '5…Bxd1?? – Tham ăn Hậu.',
            '6.Bxf7+ – Tượng chiếu, Vua chỉ còn ô e7.',
            '6…Ke7',
            '7.Nd5# – Chiếu hết Légal bằng ba quân nhẹ!',
          ],
          caption: 'Chiếu hết Légal – bài học về ghim tương đối.',
        },
      },
      {
        heading: 'Chiếu hết Cầu vai (Epaulette)',
        body: `Vua bị kẹp giữa **hai quân của chính mình** ở hai bên (như hai cầu vai trên áo), và Hậu chiếu **từ phía trước**.

- Vua ở mép bàn cờ, hai bên là Xe (hoặc quân khác).
- Hậu chiếu từ cách hai ô theo cột, đồng thời khống chế hai ô chéo phía trước Vua.`,
        diagram: {
          fen: '3rkr2/8/8/8/8/8/Q7/6K1 w - - 0 1',
          moves: 'Qe6#',
          notes: ['Chiếu hết Cầu vai! Hai Xe d8, f8 chặn đường chạy ngang của chính Vua.'],
          arrows: ['a2e6'],
          highlights: ['d8:red', 'f8:red'],
          caption: 'Trắng đi và chiếu hết trong 1 nước.',
        },
      },
      {
        heading: 'Cách học và ghi nhớ các mẫu',
        body: `Một số mẫu khác em nên tìm hiểu thêm: **chiếu hết hàng cuối**, **Mã ngạt**, **chiếu hết Damiano** (Hậu + Tốt g6/h7), **chiếu hết móc câu** (Xe + Mã + Tốt), **chiếu hết đuôi én** (Hậu chiếu chéo, Vua bị chặn bởi quân mình).

Phương pháp học hiệu quả:

- **Bày lại** từng mẫu trên bàn cờ thật, xoay bàn để nhìn từ cả hai phía.
- **Tìm tính chất chung**: quân nào khống chế ô nào? Quân đối phương nào tự chặn Vua?
- **Giải bài tập** chiếu hết 1–2 nước mỗi ngày – 10 phút đều đặn tốt hơn 2 giờ một lần.
- Khi chơi, nếu Vua đối phương bị “kẹt”, hãy tự hỏi: “Thế này giống mẫu nào?”`,
        tip: 'Kiện tướng nhớ hàng nghìn mẫu hình. Em không cần nhớ hết ngay – mỗi tuần thuộc thêm 2–3 mẫu là đủ để tiến bộ rõ rệt.',
      },
    ],
    keyTakeaways: [
      'Anastasia: Mã e7 + Xe/Hậu trên cột h.',
      'Ả Rập: Xe h7 được Mã f6 bảo vệ, Vua ở góc.',
      'Boden: hai Tượng chéo nhau trước Vua nhập thành cánh Hậu.',
      'Légal: ghim tương đối bị phá, ba quân nhẹ chiếu hết.',
      'Cầu vai: Vua bị hai quân mình kẹp hai bên, Hậu chiếu từ phía trước.',
    ],
  },

  // ───────────────────────── 14. Đột phá tốt & phong cấp ─────────────────────────
  {
    id: 'ct-dot-pha-tot',
    category: 'chien-thuat',
    title: 'Đột phá Tốt và phong cấp',
    subtitle: 'Khi những chú Tốt nhỏ bé quyết định ván cờ',
    level: 4,
    icon: '⬆️',
    minutes: 16,
    intro: `Trong tàn cuộc, **phong cấp** là mục tiêu tối thượng: biến Tốt thành Hậu thường đồng nghĩa với chiến thắng. Bài học này giới thiệu những đòn chiến thuật kinh điển xoay quanh phong cấp: **đột phá Tốt**, **thí quân để Tốt đi tiếp**, và nghiên cứu nổi tiếng **Saavedra** – nơi một Tốt phong thành Xe để thắng.`,
    sections: [
      {
        heading: 'Đột phá ba Tốt chống ba Tốt',
        body: `Ba Tốt trắng a5, b5, c5 đối mặt với ba Tốt đen a7, b7, c7. Trông như bế tắc, nhưng Trắng có một đòn đột phá kinh điển: **b6!**

Ý tưởng: thí Tốt để **phá vỡ** chuỗi Tốt của đối phương, tạo ra một **Tốt thông** mà Vua đen ở quá xa không kịp ngăn. Hãy ghi nhớ: Tốt **ở giữa** đi trước!`,
        diagram: {
          fen: '6k1/ppp5/8/PPP5/8/8/8/6K1 w - - 0 1',
          moves: 'b6 axb6 c6 bxc6 a6 b5 a7 b4 a8=Q+',
          notes: [
            '1.b6! – Đột phá! Đe dọa bxa7 hoặc bxc7.',
            '1…axb6 – (Nếu 1…cxb6 thì 2.a6! bxa6 3.c6 và Tốt c phong cấp.)',
            '2.c6! – Thí thêm một Tốt.',
            '2…bxc6',
            '3.a6 – Tốt a đã thành Tốt thông, không gì cản được!',
            '3…b5',
            '4.a7',
            '4…b4',
            '5.a8=Q+ – Phong Hậu kèm chiếu. Trắng thắng.',
          ],
          arrows: ['b5b6'],
          caption: 'Trắng đi và thắng nhờ đột phá Tốt.',
        },
      },
      {
        heading: 'Nghiên cứu Saavedra (1895): phong Xe để thắng!',
        body: `Đây có lẽ là **nghiên cứu cờ vua nổi tiếng nhất mọi thời đại**. Trắng chỉ có Vua và một Tốt, chống lại Xe đen. Tốt c6 lao lên phong cấp, Xe đen chiếu liên tục để cản.

Điều kỳ diệu xảy ra ở cuối: nếu Trắng phong **Hậu**, Đen có đòn **…Rc4+!** – nếu Hậu ăn Xe thì Đen bị **hòa pat**. Linh mục Saavedra tìm ra lời giải: **phong Xe!** – và tạo ra đe dọa chiếu hết cùng lúc với đe dọa ăn Xe.`,
        diagram: {
          fen: '8/8/1KP5/3r4/8/8/8/k7 w - - 0 1',
          moves: 'c7 Rd6+ Kb5 Rd5+ Kb4 Rd4+ Kb3 Rd3+ Kc2 Rd4 c8=R Ra4 Kb3',
          notes: [
            '1.c7 – Tốt tiến đến hàng 7.',
            '1…Rd6+ – Xe đen bắt đầu chiếu liên tục.',
            '2.Kb5 – Vua tiến dần lên để thoát khỏi chuỗi chiếu.',
            '2…Rd5+',
            '3.Kb4',
            '3…Rd4+',
            '4.Kb3',
            '4…Rd3+',
            '5.Kc2 – Vua tấn công Xe, hết chiếu.',
            '5…Rd4! – Đặt bẫy: nếu 6.c8=Q? Rc4+! 7.Qxc4 thì Đen hết nước đi – hòa pat!',
            '6.c8=R!! – Phong Xe! Đe dọa Ra8#.',
            '6…Ra4 – Cách duy nhất để chặn chiếu hết.',
            '7.Kb3! – Đe dọa đồng thời Kxa4 và Rc1#. Đen không thể chống đỡ cả hai. Trắng thắng!',
          ],
          caption: 'Nghiên cứu Saavedra. Trắng đi và thắng.',
        },
      },
      {
        heading: 'Những nguyên tắc về Tốt thông',
        body: `**Tốt thông** (passed pawn) là Tốt không còn Tốt đối phương nào cản đường hoặc kiểm soát các ô phía trước nó. Những điều kiện tướng luôn ghi nhớ:

- **“Tốt thông phải được đẩy lên”** (Nimzowitsch): càng tiến xa, Tốt càng mạnh và càng khiến đối phương phải dành quân để canh giữ.
- **Xe nên đứng phía sau Tốt thông** – dù là Tốt của mình hay của đối phương (quy tắc Tarrasch).
- **Phong tỏa Tốt thông** của đối phương bằng quân nhẹ, lý tưởng là **Mã** đứng ngay trước Tốt.
- **Tốt thông được bảo vệ** (có Tốt khác che chở) là lợi thế rất lớn trong tàn cuộc.
- **Tốt thông xa** (ở cánh xa Vua đối phương) kéo Vua đối phương đi xa, để Vua mình tấn công cánh còn lại.

Hãy nhớ các đòn chiến thuật đã học – **đánh lạc hướng** quân canh ô phong cấp, **phong cấp dưới** để tránh hòa pat – vì chúng thường quyết định tàn cuộc Tốt thông.`,
        tip: 'Khi tính đua Tốt, hãy dùng “quy tắc hình vuông” (sẽ học ở phần Tàn cuộc) để biết ngay Vua đối phương có đuổi kịp Tốt hay không.',
      },
    ],
    keyTakeaways: [
      'Đột phá Tốt: thí Tốt để phá chuỗi Tốt đối phương, tạo Tốt thông.',
      'Với ba Tốt chống ba Tốt, Tốt giữa đi trước (b6!).',
      'Luôn kiểm tra hòa pat khi phong cấp – đôi khi phải phong Xe hoặc Mã.',
      'Tốt thông phải được đẩy lên; Xe đứng sau Tốt thông.',
    ],
  },
];
