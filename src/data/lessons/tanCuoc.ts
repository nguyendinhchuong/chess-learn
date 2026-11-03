import type { Lesson } from '../types';

export const LESSONS: Lesson[] = [
  // ───────────────────────────── 1. Nguyên tắc tàn cuộc ─────────────────────────────
  {
    id: 'tc-nguyen-tac-tan-cuoc',
    category: 'tan-cuoc',
    title: 'Nguyên tắc vàng của tàn cuộc',
    subtitle: 'Vua hoạt động, tốt thông và nghệ thuật đổi quân',
    level: 2,
    icon: '🏁',
    minutes: 12,
    intro:
      'Capablanca khuyên người mới học hãy bắt đầu từ tàn cuộc, vì ở đó em hiểu rõ nhất sức mạnh thật sự của từng quân cờ. Khi ít quân trên bàn, mọi nhịp đi đều quý giá và những quy luật trở nên rõ ràng. Bài này tổng hợp các nguyên tắc nền tảng mà Đại kiện tướng nào cũng thuộc lòng.',
    sections: [
      {
        heading: 'Vua trở thành chiến binh',
        body: `Ở khai cuộc và trung cuộc, Vua phải trốn sau lá chắn tốt. Nhưng khi Hậu và phần lớn quân đã được đổi, nguy cơ bị chiếu hết giảm mạnh – lúc đó **Vua trở thành một quân tấn công mạnh**, giá trị tương đương khoảng 4 điểm.

Việc đầu tiên trong hầu hết các tàn cuộc: **đưa Vua về trung tâm**. Từ trung tâm, Vua có thể nhanh chóng đến bất kỳ cánh nào – để hỗ trợ tốt của mình hoặc ăn tốt của đối phương.

Ở ví dụ bên cạnh, cả hai bên đều đưa Vua lên. Đen nhanh hơn một nhịp và Vua Đen đã đứng ở d5 – rất hoạt động.`,
        tip: 'Khi bàn cờ đã thưa quân, câu hỏi đầu tiên luôn là: “Vua của mình đã ở đúng chỗ chưa?”',
        diagram: {
          fen: '8/pp3kpp/8/8/8/8/PP3PPP/6K1 w - - 0 1',
          moves: '1.Kf1 Ke6 2.Ke2 Kd5 3.Kd3',
          notes: [
            'Vua Trắng bắt đầu hành trình về trung tâm.',
            'Vua Đen cũng làm điều tương tự.',
            'Vua Trắng tiếp tục tiến về trung tâm, nhắm tới ô d3 để chặn đường Vua Đen.',
            'Vua Đen đến trung tâm trước và chiếm ô d5 rất mạnh.',
            'Vua Trắng chặn không cho Vua Đen tiến sâu hơn (c4, e4).',
          ],
          caption: 'Cuộc đua đưa Vua về trung tâm.',
        },
      },
      {
        heading: 'Tốt thông là linh hồn của tàn cuộc',
        body: `**Tốt thông** là tốt không còn tốt đối phương nào cản đường hoặc kiểm soát các ô phía trước nó (trên cột của nó và hai cột bên cạnh). Trong tàn cuộc, tốt thông là vũ khí chiến thắng số một.

Nimzowitsch có câu nổi tiếng: **“Tốt thông phải được đẩy lên!”** Mỗi bước tiến của tốt thông buộc quân đối phương phải lo chặn nó, khiến chúng trở nên thụ động.

Ghi nhớ thêm:
- Tốt thông **càng xa** Vua đối phương càng nguy hiểm.
- Hai tốt thông **liên kết** (đứng cạnh nhau) cực kỳ mạnh.
- Quân tốt nhất để **chặn** tốt thông là Mã; tệ nhất là Hậu (quá phí).`,
        diagram: {
          fen: '6k1/5ppp/8/3P4/8/8/5PPP/6K1 w - - 0 1',
          arrows: ['d5d8'],
          highlights: ['d5:green', 'd6:yellow', 'd7:yellow', 'd8:yellow'],
          caption: 'Tốt d5 là tốt thông: không tốt Đen nào ở cột c, d, e để chặn nó.',
        },
      },
      {
        heading: 'Hơn quân thì đổi quân, kém quân thì đổi tốt',
        body: `Khi em hơn vật chất, hãy **đổi quân** (đặc biệt là quân lớn) để đơn giản hóa – ưu thế sẽ càng rõ rệt. Nhưng **đừng đổi tốt**, vì cuối cùng chính tốt mới phong được Hậu.

Ngược lại, bên kém quân nên **đổi tốt**: nếu bên mạnh hết tốt, nhiều khi họ không thể chiếu hết dù hơn cả một quân nhẹ (ví dụ: Vua + Mã hoặc Vua + Tượng không thể chiếu hết Vua trơ trọi).

Bên cạnh: Trắng hơn một tốt (tốt a). Đổi Xe ngay lập tức biến ván cờ thành tàn cuộc Tốt thắng.`,
        diagram: {
          fen: '3r4/4kppp/8/8/8/8/P4PPP/3R2K1 w - - 0 1',
          moves: '1.Rxd8 Kxd8 2.Kf1',
          notes: [
            'Đổi Xe – đơn giản hóa khi đang hơn quân.',
            'Tàn cuộc Vua + Tốt: Trắng có thêm tốt a thông ở xa.',
            'Vua Trắng tiến lên. Tốt a sẽ kéo Vua Đen ra xa, còn Vua Trắng ăn tốt cánh Vua.',
          ],
          caption: 'Hơn một tốt → đổi Xe → tàn cuộc Tốt thắng.',
        },
      },
      {
        heading: 'Giá trị quân thay đổi trong tàn cuộc',
        body: `Thang điểm quân cờ chỉ là gần đúng. Trong tàn cuộc:
- **Vua** là quân mạnh (≈ 4 điểm) – hãy dùng nó!
- **Tượng** thường mạnh hơn **Mã** khi tốt ở cả hai cánh và thế cờ mở.
- **Mã** tốt hơn khi tất cả tốt ở một cánh hoặc khi có tiền đồn.
- **Xe** cần hoạt động: Xe chủ động thường đáng giá hơn một tốt.
- **Tốt cạnh** (cột a, h) là khó thắng nhất – nhiều thế hơn quân vẫn hòa.

Ví dụ bên cạnh: Tượng chống Mã với tốt ở cả hai cánh – Tượng có thể bảo vệ tốt a và tham chiến ở cánh Vua chỉ trong một nước đi.`,
        diagram: {
          fen: '6k1/p4ppp/4n3/8/8/8/P4PPP/2B3K1 w - - 0 1',
          arrows: ['c1a3:blue', 'c1g5:blue'],
          caption: 'Tốt hai cánh: Tượng tầm xa phát huy sức mạnh.',
        },
      },
      {
        heading: 'Không vội vàng & nguyên tắc hai điểm yếu',
        body: `Trong tàn cuộc thuận lợi, em thường **không cần vội**. Đối phương không có phản công, nên hãy:
- Cải thiện tất cả các quân (đặc biệt là Vua) trước khi hành động.
- Thực hiện các nước “có ích không mất gì” để xem đối phương có mắc sai lầm.

**Nguyên tắc hai điểm yếu:** một điểm yếu thường có thể được phòng thủ. Hãy tạo ra **điểm yếu thứ hai** ở cánh khác – bên phòng thủ sẽ không thể giữ cả hai cùng lúc. Tốt thông bên ngoài chính là một dạng “điểm yếu thứ hai” mà đối phương phải canh chừng.`,
        tip: 'Trong tàn cuộc, kiên nhẫn là sức mạnh. Một nước chờ đúng lúc nhiều khi quan trọng hơn một nước tấn công.',
        diagram: {
          fen: '8/8/6p1/P2k3p/8/3K4/6PP/8 w - - 0 1',
          highlights: ['a5:green', 'g6:red', 'h5:red'],
          caption: 'Tốt a thông (cánh Hậu) và các tốt Đen cánh Vua: Đen phải canh hai nơi cùng lúc.',
        },
      },
    ],
    keyTakeaways: [
      'Đưa Vua về trung tâm ngay khi Hậu đã được đổi.',
      'Tốt thông phải được đẩy; tốt thông càng xa càng mạnh.',
      'Hơn quân: đổi quân, giữ tốt. Kém quân: đổi tốt.',
      'Tạo điểm yếu thứ hai để kéo căng hàng phòng thủ đối phương.',
      'Không vội vàng: cải thiện quân trước, hành động sau.',
    ],
  },

  // ───────────────────────────── 2. Chiếu hết bằng Hậu ─────────────────────────────
  {
    id: 'tc-chieu-het-hau',
    category: 'tan-cuoc',
    title: 'Chiếu hết bằng Hậu',
    subtitle: 'Vua + Hậu chống Vua: kỹ thuật “nước Mã” và cạm bẫy hòa pat',
    level: 1,
    icon: '👸',
    minutes: 10,
    intro:
      'Vua + Hậu chống Vua trơ trọi là thế thắng chắc chắn – nhưng chỉ khi em biết kỹ thuật! Rất nhiều người chơi đã để hòa vì không biết cách hoặc vô tình để đối thủ hết nước đi (pat). Bài này dạy em một phương pháp đơn giản, dễ nhớ và luôn chiếu hết trong khoảng 10 nước.',
    sections: [
      {
        heading: 'Mục tiêu: dồn Vua ra mép bàn',
        body: `Một mình Hậu không thể chiếu hết – nó cần sự giúp đỡ của Vua. Và Vua đối phương chỉ có thể bị chiếu hết khi **đứng ở mép bàn cờ**.

Kế hoạch gồm hai giai đoạn:
- **Giai đoạn 1:** Hậu một mình dồn Vua đối phương ra mép (hoặc góc).
- **Giai đoạn 2:** Vua của em tiến đến, rồi Hậu chiếu hết.

Thế cờ bên cạnh là một mẫu chiếu hết cơ bản: Hậu b7 đứng sát Vua Đen và được Vua Trắng ở b6 bảo vệ.`,
        diagram: {
          fen: '1k6/1Q6/1K6/8/8/8/8/8 b - - 0 1',
          highlights: ['b8:red', 'b7:green', 'b6:green'],
          caption: 'Mẫu chiếu hết: Hậu áp sát, được Vua bảo vệ.',
        },
      },
      {
        heading: 'Giai đoạn 1: Hậu đi theo “nước Mã”',
        body: `Bí quyết đơn giản: **luôn đặt Hậu cách Vua đối phương đúng một nước đi của quân Mã**. Ở vị trí đó, Hậu khóa nhiều ô nhất mà không bị Vua đối phương tấn công.

Mỗi khi Vua Đen di chuyển, Hậu lại di chuyển để giữ khoảng cách “nước Mã”. Em sẽ thấy Vua Đen luôn chỉ còn 3 ô để đi, và chiếc hộp nhốt nó cứ nhỏ dần cho tới khi nó bị ép vào góc.

Hãy bấm ▶ để xem từng bước.`,
        diagram: {
          fen: '7Q/8/8/3k4/8/8/8/4K3 w - - 0 1',
          moves:
            '1.Qh4 Ke5 2.Qg4 Kd5 3.Qf4 Kc5 4.Qe4 Kb5 5.Qd4 Kc6 6.Qe5 Kb6 7.Qd5 Kc7 8.Qe6 Kb7 9.Qd6 Kc8 10.Qe7 Kb8 11.Qd7 Ka8',
          notes: [
            'Hậu khóa hàng 4: Vua Đen bị nhốt ở nửa trên bàn cờ.',
            'Vua Đen cố bám trung tâm.',
            'Hậu đứng cách Vua Đen đúng một nước Mã (e5–g4). Vua Đen chỉ còn 3 ô.',
            'Vua Đen tránh xa Hậu và cố bám lấy trung tâm càng lâu càng tốt.',
            'Lại một nước Mã (d5–f4). Hậu bám theo Vua như cái bóng.',
            'Vua Đen chọn chạy sang cánh Hậu – nhưng chạy hướng nào thì Hậu cũng bám theo bằng nước Mã.',
            'Vua Đen bị đẩy dần sang cánh Hậu.',
            'Vua Đen lùi sang b5, mỗi bước lại gần mép bàn cờ hơn.',
            'Vẫn là nước Mã. Vua Đen chỉ còn 3 ô, đều gần mép bàn.',
            'Vua Đen cố quay lại c6 để thoát khỏi mép bàn, nhưng Hậu sắp khóa luôn hàng 5.',
            'Hàng 5 đã bị khóa – chiếc hộp nhỏ lại.',
            'Hàng 5 đã bị khóa: Vua Đen lùi về b6, chỉ còn loanh quanh ở hàng 6 và 7.',
            'Hậu áp sát đúng khoảng cách nước Mã (b6–d5); Vua Đen lại chỉ còn ba ô a6, a7, c7.',
            'Vua Đen chạy về c7, cố tránh góc a8 càng lâu càng tốt.',
            'Vua Đen giờ chỉ còn đi lại ở hai hàng cuối.',
            'Vua Đen chỉ còn các ô ở hai hàng cuối; nó chọn b7 để tránh xa Hậu.',
            'Lại một nước Mã (b7–d6): Hậu khóa hàng 6 cùng các ô c7, b8, và chiếc hộp tiếp tục thu nhỏ.',
            'Vua Đen chạy lên c8 – ô xa góc a8 nhất mà nó còn tới được.',
            'Vua Đen bị ép xuống hàng 8 và chỉ còn đúng một nước đi.',
            'Nước duy nhất: Vua Đen lùi về b8, ngày càng gần góc bàn cờ.',
            'Vua Đen bị giam ở hai ô a8–b8. Hậu đã xong việc – giờ gọi Vua Trắng tới!',
            'Cẩn thận: đây là lúc dễ mắc sai lầm nhất (xem phần tiếp theo).',
          ],
          caption: 'Kỹ thuật “nước Mã”: Hậu một mình lùa Vua vào góc.',
        },
      },
      {
        heading: 'Cạm bẫy chết người: hòa pat',
        body: `Khi Vua đối phương đã bị dồn vào góc, **đừng siết quá chặt!** Nếu Vua đối phương **không bị chiếu** nhưng **không còn nước đi hợp lệ nào**, ván cờ kết thúc **hòa (pat)**.

Ở thế bên cạnh, nước tự nhiên **Qc7??** là sai lầm khủng khiếp: Vua Đen ở a8 không bị chiếu, nhưng a7, b7, b8 đều bị Hậu kiểm soát → hòa pat!

Quy tắc an toàn: khi Vua đối phương chỉ còn 2 ô đi qua đi lại, **hãy để Hậu đứng yên và đưa Vua của mình lại gần**.`,
        warning: 'Trước mỗi nước đi khi đối phương chỉ còn Vua, hãy kiểm tra: “Sau nước này, Vua đối phương còn ô nào để đi không?”',
        diagram: {
          fen: 'k7/3Q4/8/8/8/8/8/4K3 w - - 0 12',
          arrows: ['d7c7:red'],
          highlights: ['a7:red', 'b7:red', 'b8:red'],
          caption: '12.Qc7?? là hòa pat. Hậu phải đứng yên ở d7, Vua Trắng tiến lên.',
        },
      },
      {
        heading: 'Giai đoạn 2: Vua tiến lên và chiếu hết',
        body: `Hậu d7 giữ Vua Đen trong hai ô a8–b8. Vua Trắng đi thẳng tới **b6**. Khi Vua Trắng đã kiểm soát b7, Hậu chiếu hết.

Có hai cách chiếu hết khi Vua Trắng ở b6 và Vua Đen ở b8: **Qb7#** (Hậu áp sát, được Vua bảo vệ) hoặc **Qd8#** (Hậu chiếu theo hàng ngang).`,
        diagram: {
          fen: 'k7/3Q4/8/8/8/8/8/4K3 w - - 0 12',
          moves: '12.Kd2 Kb8 13.Kc3 Ka8 14.Kb4 Kb8 15.Kb5 Ka8 16.Kb6 Kb8 17.Qb7#',
          notes: [
            'Hậu đứng yên, Vua Trắng lên đường.',
            'Vua Đen chỉ đi qua lại a8–b8.',
            'Vua Trắng đi thẳng về phía b6 theo đường ngắn nhất, còn Hậu d7 vẫn giữ nguyên chiếc lồng.',
            'Vua Đen chỉ đi qua lại giữa a8 và b8 – nó không còn ô nào khác.',
            'Vua Trắng tiếp tục tiến lên, nhắm tới ô b6 nơi nó sẽ bảo vệ Hậu.',
            'Đen chẳng có gì để làm ngoài việc chờ đợi trong hai ô a8–b8.',
            'Chỉ còn một bước nữa là Vua Trắng tới b6. Nhớ luôn để Vua Đen còn ít nhất một nước đi, tránh hòa pat.',
            'Vua Đen lại về a8 – ô b8 vẫn còn trống nên Đen chưa bị hết nước đi.',
            'Vua Trắng đã tới b6, kiểm soát a7, b7, c7.',
            'Vua Đen buộc trở lại b8 – và giờ Hậu có thể chiếu hết với sự hỗ trợ của Vua b6.',
            'Chiếu hết! Hậu b7 được Vua b6 bảo vệ.',
          ],
          caption: 'Đưa Vua lên rồi chiếu hết.',
        },
      },
      {
        heading: 'Mẫu chiếu hết thứ hai: chiếu theo hàng',
        body: `Một mẫu chiếu hết khác rất hay gặp: Vua Trắng **đối diện** (hoặc chéo) với Vua Đen để khóa các ô thoát ở hàng thứ hai, còn Hậu chiếu theo hàng cuối.

Bên cạnh: Vua Trắng b6 khóa a7, b7, c7; Hậu c8 chiếu theo hàng 8 và khóa b8. Vua Đen ở a8 không còn đường thoát.

Hãy luyện tập Vua + Hậu chống Vua với máy cho tới khi em có thể chiếu hết dưới 10 nước từ bất kỳ vị trí nào.`,
        tip: 'Đếm nhanh: với kỹ thuật đúng, Vua + Hậu luôn chiếu hết trong tối đa 10 nước.',
        diagram: {
          fen: 'k1Q5/8/1K6/8/8/8/8/8 b - - 0 1',
          highlights: ['a8:red', 'a7:yellow', 'b7:yellow', 'b8:yellow'],
          caption: 'Hậu chiếu theo hàng 8, Vua b6 khóa hàng 7 – chiếu hết.',
        },
      },
    ],
    keyTakeaways: [
      'Hậu một mình đẩy Vua ra mép bằng cách đứng cách nó một nước Mã.',
      'Khi Vua đối phương chỉ còn 2 ô, dừng Hậu lại và đưa Vua mình tới.',
      'Luôn kiểm tra hòa pat trước mỗi nước đi.',
      'Hai mẫu chiếu hết: Hậu áp sát được Vua bảo vệ, hoặc Hậu chiếu theo hàng khi Vua mình khóa hàng kế bên.',
    ],
  },

  // ───────────────────────────── 3. Chiếu hết bằng Xe ─────────────────────────────
  {
    id: 'tc-chieu-het-xe',
    category: 'tan-cuoc',
    title: 'Chiếu hết bằng Xe',
    subtitle: 'Vua + Xe chống Vua: chiếc hộp, đối Vua và nước chờ',
    level: 2,
    icon: '🏯',
    minutes: 14,
    intro:
      'Chiếu hết bằng Vua + Xe khó hơn bằng Hậu một chút, vì Xe không kiểm soát đường chéo. Nhưng chỉ với ba quy tắc đơn giản, em sẽ luôn chiếu hết được trong khoảng 16–20 nước. Đây là kỹ thuật bắt buộc phải thuộc của mọi người chơi cờ.',
    sections: [
      {
        heading: 'Mẫu chiếu hết cần nhắm tới',
        body: `Với Xe, mẫu chiếu hết cơ bản là: **hai Vua đối mặt nhau** (cùng cột, cách một ô), Vua đối phương ở mép bàn, và **Xe chiếu theo hàng cuối**.

Vua Trắng ở d6 khóa các ô c7, d7, e7; Xe a8 chiếu và khóa toàn bộ hàng 8. Vua Đen ở d8 không còn ô nào.

Mục tiêu của cả kỹ thuật là tạo ra đúng hình ảnh này.`,
        diagram: {
          fen: 'R2k4/8/3K4/8/8/8/8/8 b - - 0 1',
          highlights: ['d8:red', 'd6:green', 'c7:yellow', 'd7:yellow', 'e7:yellow'],
          caption: 'Hai Vua đối mặt, Xe chiếu theo hàng cuối: chiếu hết.',
        },
      },
      {
        heading: 'Ba quy tắc vàng',
        body: `- **Quy tắc 1 – Xe làm hàng rào:** dùng Xe cắt Vua đối phương theo một hàng (hoặc cột), nhốt nó trong một “chiếc hộp”.
- **Quy tắc 2 – Hai Vua đối mặt thì chiếu:** khi hai Vua đứng đối diện nhau (cách một ô) và đến lượt em, Xe chiếu để đẩy Vua đối phương lùi một hàng – chiếc hộp nhỏ lại.
- **Quy tắc 3 – Cách một nước Mã thì chờ:** khi Vua đối phương đứng cách Vua em một nước Mã, hãy đi **một nước chờ bằng Xe** (dọc theo hàng rào, ở xa Vua đối phương). Đối phương sẽ buộc phải bước vào thế đối mặt, hoặc lùi xa hơn.

Và luôn giữ Xe **ở xa** Vua đối phương để nó không bị tấn công.`,
        tip: 'Xe ở xa thì an toàn. Nếu Vua đối phương tiến tới tấn công Xe, hãy đưa Xe sang đầu kia của hàng rào.',
        diagram: {
          fen: '8/8/8/4k3/8/8/8/4K2R w - - 0 1',
          arrows: ['h1h4'],
          highlights: ['a4:yellow', 'b4:yellow', 'c4:yellow', 'd4:yellow', 'e4:yellow', 'f4:yellow', 'g4:yellow'],
          caption: 'Bước đầu tiên: Rh4 dựng hàng rào ở hàng 4.',
        },
      },
      {
        heading: 'Toàn bộ kỹ thuật, từng bước',
        body: `Hãy theo dõi cách ba quy tắc được áp dụng. Để ý hai loại nước đi lặp lại liên tục:
- Hai Vua **đối mặt** → Xe **chiếu**, hàng rào tiến lên một hàng.
- Hai Vua cách **một nước Mã** → Xe **đi nước chờ**.

Vua Đen bị đẩy lùi từ hàng 5 xuống hàng 6, 7 rồi 8, cho tới khi bị chiếu hết.`,
        diagram: {
          fen: '8/8/8/4k3/8/8/8/4K2R w - - 0 1',
          moves:
            '1.Rh4 Kd5 2.Kd2 Ke5 3.Ke3 Kd5 4.Rg4 Kc5 5.Kd3 Kd5 6.Rg5+ Kc6 7.Kc4 Kd6 8.Kd4 Kc6 9.Rh5 Kd6 10.Rh6+ Kc7 11.Kc5 Kd7 12.Kd5 Kc7 13.Rg6 Kd7 14.Rg7+ Kc8 15.Kd6 Kb8 16.Kc6 Ka8 17.Kb6 Kb8 18.Rg8#',
          notes: [
            'Hàng rào: Vua Đen bị nhốt từ hàng 5 trở lên.',
            'Vua Đen không thể vượt qua hàng 4 nên đi ngang, cố đứng ở trung tâm càng lâu càng tốt.',
            'Vua Trắng tiến lên hỗ trợ.',
            'Đen chưa bị ép gì, Vua đi qua lại ở hàng 5 để chờ đợi.',
            'Hai Vua đối mặt (e3–e5) và đến lượt Đen – Đen phải nhường.',
            'Vua Đen tránh đối mặt, đứng cách Vua Trắng một nước Mã.',
            'Quy tắc 3: nước chờ bằng Xe (vẫn giữ hàng 4).',
            'Đen tránh e5 (ô sẽ đối mặt với Vua e3) và lách sang c5, xa Vua Trắng hơn.',
            'Vua Trắng bám theo, lại cách một nước Mã.',
            'Đen bước vào thế đối mặt (d3–d5)…',
            '…Quy tắc 2: chiếu! Vua Đen bị đẩy lên hàng 6.',
            'Bị chiếu, Vua Đen phải lùi lên hàng 6 – hàng rào vừa tiến thêm một bước.',
            'Vua Trắng tiến lên c4, đối mặt với Vua c6 và đến lượt Đen – Đen phải tránh sang bên.',
            'Đen tránh thế đối mặt, bước sang d6 – cách Vua Trắng một nước Mã.',
            'Đối mặt và đến lượt Đen – Đen phải tránh.',
            'Lại né đối mặt: Vua Đen lùi về c6, cách Vua d4 một nước Mã.',
            'Cách một nước Mã → nước chờ bằng Xe.',
            'Đen cố giữ Vua ở trung tâm nhưng bước vào thế đối mặt d4–d6 – tín hiệu để Xe chiếu.',
            'Đối mặt → chiếu! Vua Đen bị đẩy lên hàng 7.',
            'Vua Đen bị đẩy lên hàng 7 – chiếc hộp lại nhỏ thêm một hàng.',
            'Đối mặt, lượt của Đen.',
            'Đen tránh đối mặt, bước sang d7 – cách Vua Trắng một nước Mã.',
            'Vua Trắng bám theo sang d5, lại đối mặt với Vua d7 và buộc Đen phải đi tiếp.',
            'Đen lại né sang c7 để tránh đối mặt – Trắng sẽ trả lời bằng một nước chờ của Xe.',
            'Nước chờ.',
            'Đen bước vào thế đối mặt…',
            'Chiếu! Vua Đen bị đẩy xuống hàng cuối.',
            'Vua Đen bị đẩy xuống hàng cuối và chạy về phía cánh Hậu.',
            'Cách một nước Mã. Nếu …Kd8 (đối mặt), Rg8 là chiếu hết ngay.',
            'Ô d8 là thế đối mặt dẫn tới Rg8#, nên Vua Đen chạy tiếp về b8.',
            'Vua Trắng bám sát.',
            'Nếu …Kc8 thì Rg8# ngay lập tức.',
            'Vua Trắng tới b6: Vua Đen chỉ còn ô b8 – đúng vào thế đối mặt – và Rg8# đã sẵn sàng.',
            'Nước duy nhất: Vua Đen buộc đối mặt với Vua b6, và Xe kết thúc ván cờ.',
            'Chiếu hết! Hai Vua đối mặt, Xe chiếu theo hàng cuối.',
          ],
          caption: 'Kỹ thuật chiếc hộp: chiếu khi đối mặt, chờ khi cách nước Mã.',
        },
      },
      {
        heading: 'Kết thúc nhanh khi Vua đã ở mép bàn',
        body: `Khi Vua đối phương đã bị nhốt ở hàng cuối, phần kết thúc rất ngắn. Bên cạnh, hai Vua đang cách nhau một nước Mã (e6 và d8), nên Trắng đi **nước chờ Rh7**. Vua Đen chỉ có thể đi sang c8 hoặc e8:
- Nếu …Ke8 → hai Vua đối mặt → **Rh8#** ngay.
- Nếu …Kc8 → Vua Trắng đuổi theo, và Đen bị dồn vào góc.`,
        diagram: {
          fen: '3k4/8/4K3/8/8/8/8/7R w - - 0 1',
          moves: '1.Rh7 Kc8 2.Kd6 Kb8 3.Kc6 Ka8 4.Kb6 Kb8 5.Rh8#',
          notes: [
            'Nước chờ: Xe khóa hàng 7.',
            'Đen tránh thế đối mặt.',
            'Vua Trắng bám theo (cách một nước Mã).',
            'Đen lại tránh thế đối mặt ở d8 và chạy tiếp về phía góc.',
            'Vua Trắng bám theo, đứng cách Vua b8 một nước Mã – Vua Đen chỉ còn a8 hoặc c8.',
            'Nếu …Kc8 thì Rh8# ngay.',
            'Vua Trắng chiếm b6: Vua Đen chỉ còn đúng ô b8, nơi Rh8 sẽ là chiếu hết.',
            'Bất đắc dĩ, Vua Đen bước vào thế đối mặt b6–b8, và Xe chiếu hết theo hàng cuối.',
            'Chiếu hết.',
          ],
          caption: 'Pha kết thúc: nước chờ rồi chiếu hết.',
        },
      },
      {
        heading: 'Cẩn thận hòa pat!',
        body: `Cũng như với Hậu, khi Vua đối phương ở trong góc, một nước đi bất cẩn có thể dẫn tới **hòa pat**.

Thế bên cạnh: nếu Trắng đi **Kb6??**, Vua Đen ở a8 không bị chiếu nhưng không còn ô nào (a7, b7 bị Vua khóa, b8 bị Xe khóa) → hòa! Nước đúng là **Kc7!**, Vua Đen buộc phải sang a7, sau đó **Ra1#**.`,
        warning: 'Khi Vua đối phương chỉ còn rất ít ô, hãy đếm số nước đi hợp lệ của nó trước khi đi.',
        diagram: {
          fen: 'k7/8/2K5/8/8/8/8/1R6 w - - 0 1',
          moves: '1.Kc7 Ka7 2.Ra1#',
          notes: [
            'Đúng! (1.Kb6?? là hòa pat.) Vua Đen chỉ còn ô a7.',
            'Nước duy nhất.',
            'Chiếu hết theo cột a.',
          ],
          arrows: ['c6b6:red'],
          caption: 'Kb6?? hòa pat – Kc7! rồi Ra1# thắng.',
        },
      },
    ],
    keyTakeaways: [
      'Mẫu chiếu hết: hai Vua đối mặt, Xe chiếu theo hàng cuối.',
      'Xe làm hàng rào nhốt Vua đối phương trong chiếc hộp.',
      'Đối mặt → chiếu; cách nước Mã → nước chờ bằng Xe.',
      'Giữ Xe ở xa Vua đối phương; luôn đề phòng hòa pat.',
    ],
  },

  // ───────────────────────────── 4. Quy tắc hình vuông ─────────────────────────────
  {
    id: 'tc-quy-tac-hinh-vuong',
    category: 'tan-cuoc',
    title: 'Quy tắc hình vuông',
    subtitle: 'Vua có đuổi kịp tốt thông không? Trả lời trong 1 giây!',
    level: 2,
    icon: '⬛',
    minutes: 10,
    intro:
      'Trong rất nhiều tàn cuộc, câu hỏi quyết định là: “Vua có bắt kịp tốt thông kia không?”. Thay vì đếm từng nước, các kiện tướng dùng một mẹo hình học cực nhanh: quy tắc hình vuông. Cuối bài, em sẽ gặp một nghiên cứu nổi tiếng nhất lịch sử – phép màu của Réti.',
    sections: [
      {
        heading: 'Vẽ hình vuông của tốt',
        body: `Từ ô của tốt thông, kẻ một đường thẳng tới ô phong cấp. Lấy đoạn đó làm cạnh, vẽ một **hình vuông** về phía Vua đối phương.

Ví dụ: tốt Trắng ở **a4** → đoạn a4–a8 dài 5 ô → hình vuông là **a4–a8–e8–e4**.

**Quy tắc:** nếu Vua đối phương **đang ở trong hình vuông**, hoặc **bước được vào hình vuông** ngay ở lượt đi của mình, nó sẽ bắt kịp tốt. Nếu không, tốt sẽ phong cấp (khi không có quân nào khác can thiệp).`,
        diagram: {
          fen: '8/8/8/8/P4k2/8/8/7K w - - 0 1',
          highlights: ['a4:green', 'a8:green', 'e8:green', 'e4:green', 'f4:red'],
          arrows: ['a4a8', 'a8e8', 'e8e4', 'e4a4'],
          caption: 'Hình vuông của tốt a4: a4–a8–e8–e4. Vua Đen ở f4 đang đứng ngay ngoài.',
        },
      },
      {
        heading: 'Đến lượt Đen: Vua bước vào hình vuông',
        body: `Nếu đến lượt Đen, Vua chỉ cần một bước **…Ke5** là đã vào hình vuông a4–e8. Từ đó, dù tốt chạy thế nào, Vua vẫn đuổi kịp.

Mỗi khi tốt tiến một bước, hình vuông lại nhỏ đi, nhưng Vua cũng tiến theo đường chéo và luôn ở trong hình vuông mới.`,
        diagram: {
          fen: '8/8/8/8/P4k2/8/8/7K b - - 0 1',
          moves: '1...Ke5 2.a5 Kd6 3.a6 Kc7 4.a7 Kb7 5.a8=Q+ Kxa8',
          notes: [
            'Vua bước vào hình vuông a4–e8.',
            'Hình vuông mới: a5–a8–d8–d5. Vua Đen vẫn có thể vào.',
            'Vua Đen tiến chéo – đường chéo dài bằng đường thẳng!',
            'Tốt tiến tiếp, hình vuông thu nhỏ còn a6–c8 – Vua Đen ở d6 chỉ cần một bước là vào.',
            'Vua Đen bước vào hình vuông mới, đã kề sát các ô b7, b8 – tốt không còn đường thoát.',
            'Trắng đẩy tốt lên hàng 7, nhưng Vua Đen chỉ cần bước tới b7 là canh được ô phong cấp a8.',
            'Vua Đen đã kiểm soát ô phong cấp.',
            'Trắng phong Hậu, nhưng Hậu mới đứng ngay cạnh Vua Đen mà không có quân nào bảo vệ.',
            'Đen bắt Hậu mới phong. Hòa.',
          ],
          caption: 'Vua trong hình vuông → bắt kịp tốt.',
        },
      },
      {
        heading: 'Đến lượt Trắng: tốt chạy thoát',
        body: `Cùng thế cờ nhưng đến lượt Trắng. Sau **a5**, hình vuông mới là **a5–a8–d8–d5**. Vua Đen ở f4 cần đến được cột d trong một nước – không thể! Tốt sẽ phong cấp.

Chỉ một nhịp đi khác nhau mà kết quả hoàn toàn khác. Đó là lý do trong tàn cuộc, **lượt đi** quan trọng đến vậy.`,
        diagram: {
          fen: '8/8/8/8/P4k2/8/8/7K w - - 0 1',
          moves: '1.a5 Ke5 2.a6 Kd6 3.a7 Kc7 4.a8=Q',
          notes: [
            'Hình vuông mới a5–d8: Vua Đen không thể bước vào.',
            'Vua Đen đuổi theo…',
            'Tốt tiếp tục lao lên – Vua Đen vẫn ở ngoài hình vuông a6–c8.',
            'Vua Đen tiến chéo hết sức, nhưng vẫn còn cách hình vuông một bước.',
            'Tốt lên hàng 7 – hình vuông chỉ còn a7–b8, và Vua Đen không thể chạm tới ô a8 kịp.',
            '…nhưng chậm một nhịp.',
            'Phong Hậu! Trắng thắng.',
          ],
          caption: 'Vua ngoài hình vuông → tốt phong cấp.',
        },
      },
      {
        heading: 'Hai lưu ý quan trọng',
        body: `- **Tốt ở hàng xuất phát:** tốt ở hàng 2 có thể đi hai ô, nên hãy tính hình vuông như thể tốt **đã ở hàng 3**.
- **Vật cản:** quy tắc chỉ đúng khi đường đi của Vua không bị cản (bởi quân của chính nó, hoặc bởi các ô bị kiểm soát).

Bên cạnh: tốt a2 được tính như ở a3 → hình vuông a3–a8–f8–f3. Vua Đen ở f5 đã ở trong hình vuông, nên dù Trắng đi a4 (hai ô), Vua vẫn đuổi kịp.`,
        diagram: {
          fen: '8/8/8/5k2/8/8/P7/7K w - - 0 1',
          moves: '1.a4 Ke5 2.a5 Kd5 3.a6 Kc6 4.a7 Kb7',
          notes: [
            'Tốt đi hai ô. Hình vuông giờ là a4–e8 – Vua Đen bước được vào.',
            'Vua vào hình vuông.',
            'Tốt tiến tiếp, hình vuông thu lại thành a5–d8 – Vua Đen ở e5 chỉ cần một bước chéo là theo kịp.',
            'Vua Đen bước vào hình vuông mới a5–d8, giữ khoảng cách đủ để đuổi kịp tốt.',
            'Hình vuông giờ chỉ còn a6–c8; Vua Đen ở d5 vẫn có thể bước vào bằng …Kc6.',
            'Vua Đen vào hình vuông a6–c8, sẵn sàng đón tốt ở b7.',
            'Tốt lên hàng 7, nhưng Vua Đen chỉ cần một bước tới b7 để canh ô a8.',
            'Vua Đen bắt kịp tốt.',
          ],
          caption: 'Tốt ở hàng 2: tính hình vuông từ hàng 3.',
        },
      },
      {
        heading: 'Phép màu của Réti (1921)',
        body: `Nghiên cứu nổi tiếng nhất lịch sử cờ vua! Nhìn qua, Trắng có vẻ thua chắc: Vua h8 cách xa tốt h5 của Đen (ngoài hình vuông), còn tốt c6 của Trắng sắp bị Vua Đen ăn.

Nhưng Vua Trắng có một bí mật: **đi theo đường chéo, Vua có thể theo đuổi hai mục tiêu cùng lúc**. Mỗi bước, Vua vừa tiến về hình vuông của tốt h, vừa tiến về phía tốt c để hỗ trợ nó phong cấp. Đen không thể ngăn được cả hai – và ván cờ hòa!`,
        tip: 'Đường chéo của Vua dài bằng đường thẳng: từ h8 tới h1 hay từ h8 tới a1 đều là 7 nước. Hãy tận dụng điều này để “một mũi tên trúng hai đích”.',
        diagram: {
          fen: '7K/8/k1P5/7p/8/8/8/8 w - - 0 1',
          moves: '1.Kg7 h4 2.Kf6 Kb6 3.Ke5 Kxc6 4.Kf4 h3 5.Kg3 h2 6.Kxh2',
          notes: [
            'Vua Trắng tiến theo đường chéo: vừa hướng về tốt h, vừa hướng về tốt c.',
            'Đen đẩy tốt h ngay, tận dụng việc Vua Trắng đang ở ngoài hình vuông của nó.',
            'Đe dọa kép: Vua sắp vào hình vuông tốt h, hoặc tới e7 hỗ trợ tốt c.',
            'Đen bắt tốt c. (Nếu 2…h3 thì 3.Ke7! h2 4.c7 Kb7 5.Kd7 – cả hai cùng phong Hậu, hòa.)',
            'Vua Trắng bước vào hình vuông của tốt h đúng lúc. (Nếu 3…h3 thì 4.Kd6! h2 5.c7 – cả hai phong Hậu.)',
            'Đen ăn tốt c…',
            '…nhưng Vua Trắng đã bắt kịp tốt h.',
            'Đen đẩy tốt h3, nhưng Vua Trắng đã đứng trong hình vuông của nó – cuộc đua đã kết thúc.',
            'Vua Trắng áp sát và tấn công tốt h3 – không có quân nào bảo vệ nó.',
            'Đen đẩy tốt bước cuối, nhưng cả tốt h2 lẫn ô phong cấp h1 đều nằm trong tầm tay Vua Trắng.',
            'Hòa! Một trong những nghiên cứu đẹp nhất mọi thời đại.',
          ],
          caption: 'Nghiên cứu Réti: Vua đuổi hai con thỏ cùng lúc.',
        },
      },
    ],
    keyTakeaways: [
      'Vẽ hình vuông từ tốt đến ô phong cấp; Vua trong hình vuông sẽ bắt kịp tốt.',
      'Lượt đi quyết định tất cả – luôn kiểm tra ai đang đến lượt.',
      'Tốt ở hàng 2: tính như đã ở hàng 3.',
      'Vua đi chéo nhanh bằng đi thẳng: có thể phục vụ hai mục tiêu cùng lúc (Réti).',
    ],
  },

  // ───────────────────────────── 5. Đối Vua ─────────────────────────────
  {
    id: 'tc-doi-vua',
    category: 'tan-cuoc',
    title: 'Đối Vua & tàn cuộc Vua + Tốt',
    subtitle: 'Khái niệm quan trọng nhất của tàn cuộc Tốt',
    level: 3,
    icon: '🤴',
    minutes: 15,
    intro:
      'Vua + một Tốt chống Vua: thắng hay hòa? Câu trả lời phụ thuộc vào một khái niệm then chốt – **đối Vua** (opposition). Hiểu đối Vua, em sẽ chơi đúng mọi tàn cuộc Tốt cơ bản và biết khi nào nên đổi quân để vào tàn cuộc Tốt.',
    sections: [
      {
        heading: 'Đối Vua là gì?',
        body: `Hai Vua **không bao giờ được đứng cạnh nhau**. Khi hai Vua đứng trên cùng một cột (hoặc hàng) và **cách nhau đúng một ô**, chúng “đối mặt”. Lúc này, bên **không phải đi** được gọi là **giữ đối Vua**.

Vì sao điều này quan trọng? Bên phải đi buộc phải **nhường đường**: Vua của họ phải lùi lại hoặc tránh sang bên, để Vua kia tiến lên.

Bên cạnh: hai Vua đối mặt ở e4 và e6, đến lượt Đen. **Trắng đang giữ đối Vua** – Vua Đen phải tránh đường, và Vua Trắng có thể tiến lên.`,
        tip: 'Nhớ: trong thế đối mặt, ai phải đi là người thiệt. Giữ đối Vua = buộc đối phương phải nhường.',
        diagram: {
          fen: '8/8/4k3/8/4K3/8/8/8 b - - 0 1',
          highlights: ['e4:green', 'e6:red', 'e5:yellow'],
          caption: 'Đối Vua: hai Vua cách một ô, Đen phải đi → Trắng giữ đối Vua.',
        },
      },
      {
        heading: 'Vua ở hàng 6 trước tốt: luôn thắng',
        body: `Quy tắc vàng đầu tiên: nếu Vua của bên mạnh đã đứng ở **hàng 6, ngay trước tốt của mình** (với tốt không phải tốt cạnh), thì **luôn thắng** – bất kể đến lượt ai.

Kỹ thuật: Vua chiếm các ô trước tốt, sau đó tốt tiến lên dưới sự che chở của Vua. Vua Đen không thể ngăn tốt.`,
        diagram: {
          fen: '4k3/8/4K3/8/4P3/8/8/8 w - - 0 1',
          moves: '1.e5 Kf8 2.Kd7 Kf7 3.e6+ Kf8 4.e7+ Kf7 5.e8=Q+',
          notes: [
            'Tốt tiến lên. (Nếu 1…Kd8 thì 2.Kf7 cũng tương tự.)',
            'Vua Đen tránh sang f8, hy vọng giữ ô e7 – nhưng Vua Trắng có thể vòng qua d7 để mở đường cho tốt.',
            'Vua Trắng kiểm soát e7, e8 – đường phong cấp đã thông.',
            'Vua Đen áp sát để canh ô e6, nhưng tốt tiến lên đó vẫn được Vua d7 che chở.',
            'Tốt tiến lên được Vua bảo vệ.',
            'Bị chiếu, Vua Đen lùi về f8 – nó không thể ăn tốt e6 vì tốt được Vua d7 bảo vệ.',
            'Tốt tiến lên e7 kèm nước chiếu; ô phong cấp e8 đã nằm trong tầm kiểm soát của Vua d7.',
            'Vua Đen phải tránh chiếu, nhưng không có cách nào ngăn tốt phong cấp ở e8.',
            'Phong Hậu và thắng.',
          ],
          caption: 'Vua ở hàng 6 trước tốt: thắng chắc.',
        },
      },
      {
        heading: 'Khi bên phòng thủ giữ được đối Vua: hòa',
        body: `Bây giờ Vua Trắng ở e5, tốt e4, Vua Đen ở e7 và **đến lượt Trắng**. Đen đang giữ đối Vua!

Mỗi khi Vua Trắng tiến lên, Vua Đen lập tức đứng đối mặt. Cuối cùng Trắng chỉ có thể đẩy tốt, và ván cờ kết thúc bằng thế **hòa pat** kinh điển: Vua Đen ở e8, tốt Trắng ở e7, Vua Trắng ở e6.`,
        warning: 'Với bên phòng thủ: hãy lùi Vua thẳng về phía trước tốt (e7–e8), đừng lùi chéo sang bên – lùi sai cột sẽ mất đối Vua.',
        diagram: {
          fen: '8/4k3/8/4K3/4P3/8/8/8 w - - 0 1',
          moves: '1.Kd5 Kd7 2.e5 Ke7 3.e6 Ke8 4.Kd6 Kd8 5.e7+ Ke8 6.Ke6',
          notes: [
            'Trắng thử vòng qua bên.',
            'Đen lập tức giữ đối Vua (d5–d7).',
            'Không vượt mặt được Vua Đen, Trắng đành đẩy tốt – nhưng Vua Đen kịp quay về đứng ngay trước tốt.',
            'Vua Đen đứng chặn trước tốt.',
            'Trắng đẩy tốt lên hàng 6; đây là lúc Đen phải chọn ô lùi thật chính xác.',
            'Lùi thẳng về e8 – nước duy nhất giữ hòa!',
            'Vua Trắng hỗ trợ tốt từ bên cạnh, nhưng Đen chỉ cần đối mặt lại là đủ giữ hòa.',
            'Lại đối mặt.',
            'Trắng chẳng còn cách tiến triển nào khác ngoài việc đẩy tốt chiếu.',
            'Vua Đen đứng ngay ô phong cấp, trước mặt tốt. Nếu Vua Trắng bảo vệ tốt bằng Ke6, Đen sẽ hết nước đi.',
            'Hòa pat! Vua Đen không bị chiếu nhưng không còn nước đi.',
          ],
          caption: 'Đen giữ đối Vua → hòa.',
        },
      },
      {
        heading: 'Khi bên tấn công giành được đối Vua: thắng',
        body: `Cùng thế cờ nhưng **đến lượt Đen**. Giờ Trắng đang giữ đối Vua! Vua Đen phải tránh đường, và Vua Trắng **vượt lên trước** (gọi là “vượt mặt” – outflanking) để chiếm các ô then chốt d6/e6/f6.

Khi Vua Trắng đã đứng trước tốt, chiến thắng chỉ còn là vấn đề kỹ thuật.`,
        diagram: {
          fen: '8/4k3/8/4K3/4P3/8/8/8 b - - 0 1',
          moves: '1...Kd7 2.Kf6 Ke8 3.Ke6 Kf8 4.Kd7 Kf7 5.e5 Kf8 6.e6 Kg7 7.e7 Kf7 8.e8=Q+',
          notes: [
            'Đen phải nhường đường.',
            'Vua Trắng vượt lên ô then chốt f6.',
            'Đen lùi về hàng cuối, chờ đối mặt khi Vua Trắng tiến tới – nhưng Trắng đã đứng trên ô then chốt.',
            'Giành đối Vua lần nữa.',
            'Bị đối Vua, Vua Đen phải tránh sang bên – và để Vua Trắng vượt lên d7.',
            'Vua Trắng khóa e7, e8, chiếm đường phong cấp.',
            'Vua Đen chỉ có thể đứng nhìn: Vua d7 đã giữ chặt e7, e8, còn tốt e4 nằm ngoài tầm với.',
            'Giờ tốt mới tiến lên.',
            'Vua Đen đi lại chờ đợi – nó không thể chặn tốt khi Vua Trắng đứng ở d7.',
            'Tốt tiến tiếp; ô e7 phía trước đã được Vua d7 bảo vệ nên tốt đi qua an toàn.',
            'Đen không còn gì để làm ngoài đi Vua qua lại, bất lực nhìn tốt tiến lên.',
            'Tốt lên hàng 7, ngay trước ô phong cấp e8 – ô này cũng do Vua d7 khống chế.',
            'Vua Đen áp sát e8 nhưng đã muộn: tốt phong cấp ngay nước sau và Hậu mới được Vua d7 bảo vệ.',
            'Phong Hậu – Trắng thắng.',
          ],
          caption: 'Trắng giữ đối Vua → thắng.',
        },
      },
      {
        heading: 'Vua đi trước, tốt theo sau',
        body: `Nguyên tắc quan trọng nhất của tàn cuộc Vua + Tốt chống Vua: **đưa Vua lên trước, tốt đi sau**. Tốt là “nước chờ” quý giá – đừng phí nó quá sớm!

Bên cạnh: tốt vẫn ở e2, Vua Trắng ở d4. Vua Trắng giành đối Vua (Ke4), vượt mặt Vua Đen, chiếm ô trước tốt rồi mới cho tốt tiến lên.`,
        tip: 'Đẩy tốt quá sớm là sai lầm phổ biến nhất. Hãy để Vua dọn đường trước.',
        diagram: {
          fen: '8/8/4k3/8/3K4/8/4P3/8 w - - 0 1',
          moves: '1.Ke4 Kd6 2.Kf5 Ke7 3.Ke5 Kf7 4.Kd6 Kf6 5.e4 Kf7 6.e5 Ke8 7.Ke6 Kd8 8.Kf7 Kd7 9.e6+ Kd8 10.e7+',
          notes: [
            'Giành đối Vua! (1.e4? hoặc 1.e3? đều làm hỏng thế thắng.)',
            'Đen phải nhường.',
            'Vua Trắng vượt lên.',
            'Vua Đen lùi về e7 để chặn đường tiến của Vua Trắng ở trung tâm.',
            'Lại đối Vua.',
            'Bị đối Vua, Đen phải nhường đường: Vua lùi sang f7 và để Vua Trắng vượt lên d6.',
            'Vua Trắng đã ở hàng 6 – giờ tốt mới bắt đầu đi.',
            'Vua Đen lên f6 để khống chế ô e5, mong cản tốt tiến lên.',
            'Vua Trắng đã chiếm hàng 6, giờ tốt mới lên đường – nó tiến hai ô tới e4, ngoài tầm với của Vua Đen.',
            'Vua Đen lùi lại chờ đợi: e5 do Vua d6 khống chế, còn f5 bị chính tốt e4 kiểm soát.',
            'Tốt tiến lên e5 dưới sự che chở của Vua d6 – Vua đi trước, tốt theo sau.',
            'Vua Đen lùi về hàng cuối, cố đứng chặn trước ô phong cấp.',
            'Vua ở hàng 6 trước tốt ở hàng 5: thắng chắc.',
            'Đen không giữ được ô trước tốt: bị đối mặt, Vua phải tránh sang d8.',
            'Vua Trắng khóa ô phong cấp.',
            'Vua Đen tiến lên d7 canh ô e6 – nhưng tốt đi tới đó vẫn được Vua f7 bảo vệ.',
            'Tốt tiến lên kèm nước chiếu, được Vua f7 che chở nên Vua Đen không thể ăn nó.',
            'Vua Đen lùi về d8 canh ô e7, nhưng tốt sẽ chiếu tiếp và phong cấp ngay sau đó.',
            'Tốt sẽ phong Hậu ở nước sau.',
          ],
          caption: 'Vua dẫn đường, tốt theo sau.',
        },
      },
    ],
    keyTakeaways: [
      'Đối Vua: hai Vua cách một ô; bên không phải đi giữ đối Vua.',
      'Vua ở hàng 6 trước tốt (không phải tốt cạnh) luôn thắng.',
      'Bên phòng thủ giữ đối Vua và lùi thẳng trước tốt → hòa pat.',
      'Vua đi trước, tốt theo sau – tốt là nước chờ quý giá.',
    ],
  },

  // ───────────────────────────── 6. Ô then chốt ─────────────────────────────
  {
    id: 'tc-o-then-chot',
    category: 'tan-cuoc',
    title: 'Ô then chốt & tốt cạnh',
    subtitle: 'Biết ngay thế thắng hay hòa chỉ bằng một cái nhìn',
    level: 3,
    icon: '🗝️',
    minutes: 12,
    intro:
      'Đối Vua là công cụ, còn **ô then chốt** là đích đến. Nếu Vua của bên mạnh đặt chân được lên một ô then chốt, tốt chắc chắn phong cấp – bất kể Vua đối phương làm gì. Bài này cũng giải thích vì sao tốt cạnh (cột a, h) là “cơn ác mộng” của bên tấn công.',
    sections: [
      {
        heading: 'Ô then chốt của tốt ở hàng 2–4',
        body: `**Ô then chốt** là những ô mà nếu Vua bên mạnh chiếm được, tốt sẽ phong cấp (với tốt không phải tốt cạnh).

Với tốt ở **hàng 2, 3 hoặc 4**: ô then chốt là **ba ô cách tốt hai hàng phía trước** – ở cột của tốt và hai cột bên cạnh.

Ví dụ tốt e4 → ô then chốt **d6, e6, f6**. Nhiệm vụ của bên mạnh: đưa Vua tới một trong ba ô đó. Nhiệm vụ của bên phòng thủ: ngăn điều ấy – thường bằng cách giữ đối Vua.`,
        diagram: {
          fen: '7k/8/8/8/4P3/8/8/4K3 w - - 0 1',
          highlights: ['d6:green', 'e6:green', 'f6:green', 'e4:yellow'],
          caption: 'Tốt e4: ô then chốt là d6, e6, f6.',
        },
      },
      {
        heading: 'Ô then chốt của tốt đã qua giữa bàn',
        body: `Khi tốt đã tiến tới **hàng 5 hoặc hàng 6**, số ô then chốt tăng lên thành **sáu ô**: ba ô ngay phía trước và ba ô cách hai hàng.

Ví dụ tốt e5 → ô then chốt **d6, e6, f6, d7, e7, f7**. Tốt càng tiến xa, Vua bên mạnh càng dễ tới ô then chốt – nhưng tốt cũng mất dần khả năng làm “nước chờ”.`,
        diagram: {
          fen: '7k/8/8/4P3/8/8/8/4K3 w - - 0 1',
          highlights: ['d6:green', 'e6:green', 'f6:green', 'd7:green', 'e7:green', 'f7:green', 'e5:yellow'],
          caption: 'Tốt e5: sáu ô then chốt d6–f6 và d7–f7.',
        },
      },
      {
        heading: 'Tốt cạnh: ngoại lệ đáng sợ',
        body: `Với **tốt cạnh** (cột a hoặc h), mọi quy tắc trên đều không còn đúng! Nếu Vua bên phòng thủ chạy được vào **góc trước tốt** (a8 hoặc h8 với tốt Trắng), ván cờ gần như chắc chắn **hòa**.

Lý do: Vua bên mạnh không thể vòng qua bên cạnh tốt (vì tốt đã ở mép bàn), và mọi cố gắng đều kết thúc bằng hòa pat.

Bên cạnh: dù Vua Trắng đứng rất gần, Đen vẫn hòa bằng cách đi qua lại a8–b8.`,
        warning: 'Đừng bao giờ tự tin vì “hơn một tốt” khi đó là tốt cạnh. Hãy kiểm tra Vua đối phương có chạy kịp vào góc không.',
        diagram: {
          fen: 'k7/8/1K6/P7/8/8/8/8 w - - 0 1',
          moves: '1.a6 Kb8 2.a7+ Ka8 3.Ka6',
          notes: [
            'Tốt tiến lên.',
            'Vua Đen chờ ở b8.',
            'Trắng đẩy tốt chiếu, nhưng Vua Đen chỉ việc trở về góc a8 – nơi không ai đuổi nó ra được.',
            'Vua Đen về lại góc.',
            'Hòa pat! Vua Đen không còn ô nào. (Mọi nước khác của Trắng cũng không thắng được.)',
          ],
          caption: 'Tốt cạnh + Vua phòng thủ ở góc = hòa.',
        },
      },
      {
        heading: 'Ô then chốt của tốt cạnh',
        body: `Với tốt a (Trắng), ô then chốt chỉ có hai ô: **b7 và b8**. Nếu Vua Trắng chiếm được một trong hai ô này, Vua Đen bị chặn khỏi góc và tốt sẽ phong cấp.

Ngược lại, bên phòng thủ có thêm một cách hòa đặc biệt: **nhốt Vua đối phương** ở cột a. Ví dụ: Vua Trắng ở a8, tốt a7, Vua Đen ở c7 (hoặc c8) – Vua Trắng bị giam vĩnh viễn trong góc. Đen chỉ cần đi qua lại c7–c8.`,
        diagram: {
          fen: 'K7/P1k5/8/8/8/8/8/8 b - - 0 1',
          highlights: ['b7:red', 'b8:red', 'c7:green', 'c8:green'],
          caption: 'Vua Trắng bị nhốt ở a8: Đen đi qua lại c7–c8, ván cờ hòa.',
        },
      },
    ],
    keyTakeaways: [
      'Vua bên mạnh chiếm được ô then chốt → tốt phong cấp.',
      'Tốt hàng 2–4: ba ô cách hai hàng phía trước; tốt hàng 5–6: sáu ô phía trước.',
      'Tốt cạnh: Vua phòng thủ vào được góc là hòa.',
      'Ô then chốt của tốt a là b7, b8 (của tốt h là g7, g8).',
    ],
  },

  // ───────────────────────────── 7. Zugzwang ─────────────────────────────
  {
    id: 'tc-zugzwang-tam-giac',
    category: 'tan-cuoc',
    title: 'Zugzwang, nước chờ & đi vòng tam giác',
    subtitle: 'Khi “phải đi” lại là điều tồi tệ nhất',
    level: 4,
    icon: '🔺',
    minutes: 14,
    intro:
      'Trong cờ vua, quyền được đi thường là một lợi thế. Nhưng trong tàn cuộc có những thế cờ mà **bên phải đi sẽ thiệt** – người Đức gọi đó là **Zugzwang**. Bậc thầy tàn cuộc là người biết cách “trao lượt đi” cho đối thủ đúng lúc: bằng nước chờ của tốt, của Xe, hay bằng cách cho Vua đi vòng.',
    sections: [
      {
        heading: 'Zugzwang là gì?',
        body: `**Zugzwang** là tình huống mà bất kỳ nước đi nào cũng làm thế cờ xấu đi, nhưng luật cờ không cho phép “bỏ lượt”.

Thế cờ bên cạnh: Vua Trắng d6, tốt c6; Vua Đen c8. **Đến lượt Trắng**: Trắng đẩy **c7!** – Vua Đen buộc phải sang b7, và Trắng chiếm d7 để phong cấp.

Hãy nhớ rằng đây là thế cờ mà lượt đi có ý nghĩa sống còn – xem phần tiếp theo.`,
        diagram: {
          fen: '2k5/8/2PK4/8/8/8/8/8 w - - 0 1',
          moves: '1.c7 Kb7 2.Kd7 Kb6 3.c8=Q',
          notes: [
            'Tốt tiến lên với nhịp: Vua Đen phải rời c8.',
            'Nước duy nhất.',
            'Vua Trắng khóa ô c8.',
            'Vua Đen tấn công tốt c7 nhưng không ăn được vì tốt được Vua d7 bảo vệ; ô c8 cũng đã nằm trong tay Trắng.',
            'Phong Hậu, Trắng thắng.',
          ],
          caption: 'Đến lượt Trắng: thắng.',
        },
      },
      {
        heading: 'Zugzwang tương hỗ',
        body: `Vẫn thế cờ trên nhưng **đến lượt Đen**: Đen buộc phải đi …Kd8 (hoặc …Kb8), và Trắng không còn cách thắng. Nếu Trắng đẩy c7+, Vua Đen về c8 và sau Kc6 là **hòa pat**.

Khi **cả hai bên đều không muốn đi**, ta gọi đó là **zugzwang tương hỗ**. Trong những thế cờ như vậy, ai có thể **trao lượt đi** cho đối phương, người đó thắng.`,
        diagram: {
          fen: '2k5/8/2PK4/8/8/8/8/8 b - - 0 1',
          moves: '1...Kd8 2.c7+ Kc8 3.Kc6',
          notes: [
            'Đen đứng đối mặt với Vua Trắng.',
            'Trắng thử đẩy tốt…',
            'Vua Đen trở về c8, đứng ngay trước tốt – vị trí an toàn nhất cho bên phòng thủ.',
            '…hòa pat! Vua Đen không có nước đi hợp lệ.',
          ],
          caption: 'Đến lượt Đen: hòa. Cùng một thế cờ, khác lượt đi, khác kết quả.',
        },
      },
      {
        heading: 'Nước chờ của Vua: trao lượt đi',
        body: `Thế cờ bên cạnh: các tốt đã bị khóa, cả hai bên chỉ còn nước đi của Vua. Tốt c6 của Đen được Vua c7 bảo vệ. Trắng muốn đưa Vua tới b6 để ăn c6, nhưng b6 đang kề Vua Đen.

Lời giải: **Ka7!** – một nước chờ. Đen chỉ còn nước đi của Vua và buộc phải rời c7. Nếu …Kd7 (vẫn giữ c6), Vua Trắng vào b6 và **Đen lại phải đi** – lần này mọi nước đi đều bỏ rơi tốt c6. Đó là zugzwang!`,
        diagram: {
          fen: '8/2k5/K1p1p3/2P1P3/8/8/8/8 w - - 0 1',
          moves: '1.Ka7 Kd7 2.Kb6 Kd8 3.Kxc6 Kc8 4.Kd6 Kd8 5.c6 Kc8 6.c7 Kb7 7.Kd7',
          notes: [
            'Nước chờ! Vua Đen buộc phải rời c7.',
            'Vua Đen vẫn bảo vệ c6 từ d7…',
            '…nhưng giờ Vua Trắng tới b6, và Đen lại phải đi.',
            'Zugzwang lần nữa: Vua Đen buộc phải bỏ tốt c6.',
            'Trắng ăn tốt.',
            'Vua Đen chạy về c8, cố đứng chặn trên đường đi của tốt c.',
            'Vua Trắng chiếm d6, khống chế c7, d7 và tấn công tốt e6 – Vua Đen bị đẩy lùi hoàn toàn.',
            'Đen chỉ có thể đi Vua qua lại ở hàng cuối, chờ xem Trắng làm gì.',
            'Tốt thông tiến lên.',
            'Vua Đen chặn trước tốt, nhưng Vua d6 đã sẵn sàng hỗ trợ tốt tiến lên c7.',
            'Tốt lên c7 – đây chính là thế cờ ở phần 1 với lượt đi thuộc về Đen, nên Vua phải rời c8.',
            'Nước duy nhất – Vua Đen rời c8, và Vua Trắng sẽ chiếm d7 để bảo vệ ô phong cấp.',
            'Tốt c sẽ phong Hậu.',
          ],
          caption: 'Khi chỉ còn nước đi của Vua, zugzwang quyết định ván cờ.',
        },
      },
      {
        heading: 'Đi vòng tam giác (triangulation)',
        body: `Đôi khi bên mạnh có một thế zugzwang tương hỗ nhưng **lại đến lượt mình**. Làm sao để trao lượt cho đối phương?

Kỹ thuật **đi vòng tam giác**: Vua của em đi **ba nước** qua ba ô kề nhau tạo thành hình tam giác, rồi quay về đúng ô ban đầu. Trong khi đó, Vua đối phương chỉ có **hai ô** phòng thủ tốt để đi qua lại, nên sau ba nước nó không thể trở về vị trí cũ “đúng lúc”. Kết quả: thế cờ y hệt như cũ, nhưng **lượt đi đã đổi sang đối phương**.

Điều kiện để đi vòng tam giác thành công:
- Vua bên mạnh có **đủ không gian** để đi ba ô hình tam giác mà không mất kiểm soát.
- Vua bên yếu bị hạn chế (bởi mép bàn, tốt, hoặc các ô bị khóa) nên không thể làm điều tương tự.

Trong ví dụ trước, ta thấy ý tưởng tương tự: Vua Trắng đi a6 → a7 → b6 (ba ô kề nhau) để đến b6 vào đúng lúc Đen phải đi.`,
        tip: 'Khi thấy một thế zugzwang tương hỗ nhưng lại đến lượt mình, hãy tự hỏi: “Vua mình có thể đi vòng ba nước để quay về đây không?”',
        diagram: {
          fen: '8/2k5/K1p1p3/2P1P3/8/8/8/8 w - - 0 1',
          arrows: ['a6a7:blue', 'a7b6:blue'],
          highlights: ['a6:yellow', 'a7:yellow', 'b6:yellow', 'c7:red'],
          caption: 'Ba ô a6, a7, b6 tạo thành tam giác: Vua Trắng dùng a7 để “trao lượt đi” cho Đen.',
        },
      },
    ],
    keyTakeaways: [
      'Zugzwang: bên phải đi sẽ thiệt; trong tàn cuộc nó thường quyết định kết quả.',
      'Zugzwang tương hỗ: cả hai bên đều không muốn đi – ai trao được lượt đi người đó thắng.',
      'Nước chờ (của tốt, Xe hoặc Vua) là công cụ trao lượt đi.',
      'Đi vòng tam giác: Vua đi ba nước để quay về chỗ cũ, khiến đối phương phải đi.',
    ],
  },

  // ───────────────────────────── 8. Tốt thông bên ngoài & đột phá ─────────────────────────────
  {
    id: 'tc-tot-thong-dot-pha',
    category: 'tan-cuoc',
    title: 'Tốt thông bên ngoài & đột phá tốt',
    subtitle: 'Mồi nhử kéo Vua đi xa và đòn hy sinh tốt kinh điển',
    level: 3,
    icon: '💥',
    minutes: 13,
    intro:
      'Trong tàn cuộc Tốt, không chỉ số lượng tốt mà **vị trí** của chúng mới quyết định. Một tốt thông ở xa có thể “câu” Vua đối phương ra khỏi chiến trường chính. Và đôi khi, ba tốt bình thường có thể tạo ra một tốt thông từ hư không bằng một đòn đột phá đẹp mắt.',
    sections: [
      {
        heading: 'Tốt thông bên ngoài',
        body: `**Tốt thông bên ngoài** là tốt thông nằm xa các tốt còn lại (và thường xa Vua đối phương). Giá trị của nó: Vua đối phương **buộc phải đi đuổi theo**, bỏ mặc các tốt khác. Trong lúc đó, Vua của em tràn vào ăn tốt ở cánh bên kia.

Ở ví dụ bên cạnh, Trắng hy sinh tốt a, nhưng đổi lại Vua Trắng ăn tốt g6 và chiến thắng với tốt g, h.`,
        diagram: {
          fen: '8/8/6p1/P2k3p/8/3K4/6PP/8 w - - 0 1',
          moves: '1.a6 Kc6 2.a7 Kb7 3.Ke4 Kxa7 4.Kf4 Kb6 5.Kg5 Kc5 6.Kxg6 h4 7.Kg5 h3 8.g3',
          notes: [
            'Tốt a lao lên – “mồi nhử”.',
            'Vua Đen buộc phải đuổi theo.',
            'Tốt chỉ còn cách ô phong cấp một bước, buộc Vua Đen tiếp tục chạy về phía góc.',
            'Vua Đen chặn ô phong cấp, nhưng giờ đã ở rất xa.',
            'Vua Trắng chạy ngay sang cánh Vua.',
            'Đen ăn tốt a – mất trọn ba nước.',
            'Trong lúc Vua Đen bận rộn ở góc a7, Vua Trắng lao thẳng về phía hai tốt g6, h5.',
            'Vua Đen quay lại, nhưng quá muộn.',
            'Vua Trắng áp sát tốt g6 không có ai bảo vệ – ăn xong g6, tốt h5 cũng mất chỗ dựa.',
            'Vua Đen cố quay về nhưng còn quá xa, không thể cứu tốt g6.',
            'Ăn tốt g6.',
            'Tốt h cố chạy…',
            'Vua Trắng quay lại tấn công tốt h4 – tốt này giờ đứng một mình.',
            'Tốt h chạy khỏi tầm Vua Trắng và tấn công tốt g2, hy vọng gây rối.',
            'Trắng chặn tốt h và sẽ ăn nó; hai tốt g, h của Trắng sẽ quyết định ván cờ.',
          ],
          caption: 'Tốt thông bên ngoài kéo Vua Đen ra xa.',
        },
      },
      {
        heading: 'Đột phá tốt kinh điển: ba chống ba',
        body: `Đây là mẫu đột phá mà mọi người chơi phải biết. Ba tốt Trắng ở a5, b5, c5 đối mặt ba tốt Đen ở a7, b7, c7, hai Vua ở rất xa. Trông như không bên nào đi qua được…

Nhưng **1.b6!!** tạo ra tốt thông bằng cách hy sinh hai tốt:
- Nếu **1…axb6**, thì **2.c6!** và sau …bxc6, **3.a6** – tốt a không thể bị chặn.
- Nếu **1…cxb6**, thì **2.a6!** và sau …bxa6, **3.c6** – tốt c chạy thẳng.

Điều kiện: Vua đối phương phải ở đủ xa (ngoài hình vuông của tốt thông mới tạo ra).`,
        diagram: {
          fen: '7k/ppp5/8/PPP5/8/8/8/7K w - - 0 1',
          moves: '1.b6 axb6 2.c6 bxc6 3.a6 Kg7 4.a7 Kf7 5.a8=Q',
          notes: [
            'Đòn đột phá! Hy sinh tốt b.',
            'Đen bắt bằng tốt a – tưởng đã dập tắt đòn đột phá, nhưng cột a giờ trống trơn trước tốt a5.',
            'Hy sinh thứ hai! Nếu Đen không bắt (…b5 hoặc …bxa5) thì 3.cxb7 và phong cấp.',
            'Đen buộc phải ăn tốt c6, nhưng giờ tốt a5 chỉ cần tiến một bước là thoát, phía trước không còn gì cản đường.',
            'Tốt a đã thông và không gì chặn được.',
            'Vua Đen quá xa.',
            'Tốt lên hàng 7, trong khi Vua Đen ở g7 vẫn còn rất xa ô a8.',
            'Vua Đen chạy hết sức nhưng chỉ tới được f7 – quá muộn để ngăn tốt phong cấp.',
            'Phong Hậu.',
          ],
          caption: 'Đột phá 1.b6!!: ba tốt tạo ra một tốt thông.',
        },
      },
      {
        heading: 'Nhánh còn lại: Đen bắt bằng tốt c',
        body: `Nếu Đen chọn **1…cxb6**, Trắng đáp **2.a6!** – lần này hy sinh tốt a để mở đường cho tốt c. Ý tưởng luôn là: **đánh vào tốt giữa, rồi hy sinh tốt ở phía bị bắt**, để tốt còn lại đi qua khe hở.`,
        diagram: {
          fen: '7k/ppp5/8/PPP5/8/8/8/7K w - - 0 1',
          moves: '1.b6 cxb6 2.a6 bxa6 3.c6 Kg7 4.c7 Kf7 5.c8=Q',
          notes: [
            'Đòn đột phá b6! tấn công cùng lúc tốt a7 và c7 – Đen bắt bằng tốt nào cũng mở ra một khe hở.',
            'Đen bắt bằng tốt c.',
            'Hy sinh tốt a!',
            'Đen ăn tốt a6 để ngăn axb7, nhưng cột c đã trống – tốt c5 chỉ cần bước lên c6 là thoát khỏi tốt b6.',
            'Tốt c chạy thẳng.',
            'Vua Đen lên đường đuổi theo, nhưng đang ở ngoài hình vuông của tốt c6 – không thể kịp.',
            'Tốt tiến lên c7, chỉ còn một bước nữa là phong Hậu.',
            'Vua Đen tới f7 nhưng vẫn còn cách ô c8 quá xa – tốt c sẽ phong Hậu ở nước sau.',
            'Phong Hậu.',
          ],
          caption: 'Dù Đen bắt thế nào, Trắng cũng tạo được tốt thông.',
        },
      },
      {
        heading: 'Hai tốt thông liên kết',
        body: `**Hai tốt thông liên kết** (đứng cạnh nhau) là lực lượng khủng khiếp trong tàn cuộc: chúng bảo vệ lẫn nhau và cùng tiến lên. Một quy tắc đáng nhớ: **hai tốt thông liên kết ở hàng 6 thắng được một Xe** (nếu Vua đối phương không ở gần).

Bên cạnh: Xe Đen không thể chặn cả hai tốt. Dù Xe bắt một tốt, tốt còn lại sẽ phong Hậu.`,
        diagram: {
          fen: '6k1/8/1PP5/8/8/8/r7/6K1 w - - 0 1',
          moves: '1.b7 Rb2 2.c7 Rxb7 3.c8=Q+',
          notes: [
            'Tốt b tiến lên.',
            'Xe chặn sau tốt b.',
            'Tốt c tiến lên – Xe không thể chặn cả hai.',
            'Đen bắt tốt b…',
            '…nhưng tốt c phong Hậu kèm nước chiếu. Hậu thắng Xe.',
          ],
          caption: 'Hai tốt thông liên kết ở hàng 6 mạnh hơn một Xe.',
        },
      },
    ],
    keyTakeaways: [
      'Tốt thông bên ngoài kéo Vua đối phương ra xa, mở đường cho Vua mình tấn công.',
      'Đột phá 3 chống 3: đánh vào tốt giữa, rồi hy sinh tốt ở phía bị bắt.',
      'Đột phá chỉ thành công khi Vua đối phương ở ngoài hình vuông.',
      'Hai tốt thông liên kết ở hàng 6 thắng được một Xe.',
    ],
  },

  // ───────────────────────────── 9. Lucena ─────────────────────────────
  {
    id: 'tc-the-lucena',
    category: 'tan-cuoc',
    title: 'Thế Lucena – kỹ thuật “bắc cầu”',
    subtitle: 'Thế thắng quan trọng nhất của tàn cuộc Xe',
    level: 4,
    icon: '🌉',
    minutes: 14,
    intro:
      'Tàn cuộc Xe là loại tàn cuộc xuất hiện nhiều nhất trong thực tế. Và trong tàn cuộc Xe + Tốt chống Xe, có hai thế cờ nền tảng mà mọi kiện tướng đều thuộc: **Lucena** (cách thắng) và **Philidor** (cách hòa). Bài này dạy thế Lucena với kỹ thuật “bắc cầu” nổi tiếng.',
    sections: [
      {
        heading: 'Nhận diện thế Lucena',
        body: `Thế Lucena có các đặc điểm:
- Tốt của bên mạnh ở **hàng 7** (không phải tốt cạnh).
- Vua bên mạnh đứng **ngay trên ô phong cấp** (trước tốt).
- Vua bên yếu bị **Xe cắt ra xa** ít nhất một cột.
- Xe bên yếu đứng chặn ở một bên, ngăn Vua bên mạnh đi ra.

Khó khăn: Vua Trắng bị kẹt ở b8. Nếu nó bước ra, Xe Đen sẽ chiếu liên tục từ phía sau. Giải pháp là **“bắc cầu”**: dùng Xe của mình làm lá chắn chặn các nước chiếu.`,
        diagram: {
          fen: '1K6/1P1k4/8/8/8/8/r7/2R5 w - - 0 1',
          highlights: ['b8:green', 'b7:green', 'd7:red'],
          arrows: ['c1c8:blue'],
          caption: 'Thế Lucena: Xe c1 cắt Vua Đen khỏi cột b và c; Xe a2 giam Vua Trắng.',
        },
      },
      {
        heading: 'Bước 1 và 2: đẩy Vua Đen ra xa, Xe lên hàng 4',
        body: `**Bước 1 – Chiếu đẩy Vua đối phương ra xa thêm một cột** (1.Rd1+). Vua Đen phải lùi về cột e, để Vua Trắng có thêm chỗ đi ra ở cột c, d.

**Bước 2 – Đưa Xe lên hàng 4** (2.Rd4!). Đây là nước then chốt: Xe đứng ở hàng 4 sẵn sàng chạy sang cột b để **che chắn** cho Vua Trắng khi Vua bị chiếu. Đây là “cây cầu”.`,
        diagram: {
          fen: '1K6/1P1k4/8/8/8/8/r7/2R5 w - - 0 1',
          moves: '1.Rd1+ Ke7 2.Rd4',
          notes: [
            'Chiếu! Vua Đen bị đẩy sang cột e.',
            'Vua Đen lùi xa hơn khỏi tốt b.',
            'Xe lên hàng 4 – chuẩn bị bắc cầu.',
          ],
          caption: 'Chuẩn bị cây cầu: Xe lên hàng 4.',
        },
      },
      {
        heading: 'Bước 3: Vua ra ngoài, Xe bắc cầu',
        body: `Bây giờ Vua Trắng rời ô phong cấp. Xe Đen chiếu liên tục từ phía sau, Vua Trắng đi zic-zắc xuống dưới (c7 → b6 → c6 → b5). Khi Vua tới b5, **Xe d4 chạy sang b4** chặn nước chiếu cuối cùng. Cầu đã bắc xong – tốt b7 phong cấp!

Lưu ý: Vua Trắng luôn đi về phía Xe của mình ở hàng 4, để Xe có thể chặn chiếu.`,
        tip: 'Nhớ thứ tự: (1) chiếu đẩy Vua đối phương ra xa, (2) Xe lên hàng 4, (3) Vua ra ngoài, (4) Xe chặn chiếu – cầu đã thành.',
        diagram: {
          fen: '1K6/1P2k3/8/8/3R4/8/8/r7 w - - 4 3',
          moves: '3.Kc7 Rc1+ 4.Kb6 Rb1+ 5.Kc6 Rc1+ 6.Kb5 Rb1+ 7.Rb4 Rc1 8.b8=Q',
          notes: [
            'Vua Trắng rời ô phong cấp.',
            'Xe Đen bắt đầu chiếu từ phía sau.',
            'Vua tiến về phía Xe của mình.',
            'Đen tiếp tục chiếu từ phía sau trên cột b, cố đẩy Vua Trắng ra xa tốt.',
            'Vua Trắng né chiếu sang c6, vẫn đứng cạnh tốt b7 và tiếp tục đi xuống phía Xe d4.',
            'Đen chiếu tiếp theo cột c, hy vọng Vua Trắng không tìm được chỗ trú.',
            'Vua đã tới hàng 5.',
            'Nước chiếu cuối cùng…',
            'Cầu đã bắc! Xe b4 che chắn cho Vua.',
            'Đen hết nước chiếu.',
            'Phong Hậu – Trắng thắng.',
          ],
          caption: 'Bắc cầu: Xe b4 chặn nước chiếu cuối cùng.',
        },
      },
      {
        heading: 'Vì sao Lucena quan trọng?',
        body: `Trong thực chiến, mục tiêu của bên hơn tốt trong tàn cuộc Xe thường là **đưa ván cờ về thế Lucena**. Ngược lại, bên phòng thủ phải ngăn điều đó – bằng cách giữ Vua chặn trước tốt (thế Philidor) hoặc dùng Xe chiếu từ xa.

Ghi nhớ:
- Lucena không áp dụng cho tốt cạnh.
- Vua bên phòng thủ phải bị cắt ít nhất một cột; nếu nó ở ngay cạnh tốt, Trắng khó thắng hơn nhiều.
- Hãy đặt Xe chặn chiếu ở hàng 4 (khi tốt ở hàng 7): khoảng cách vừa đủ để Vua ra ngoài.`,
        diagram: {
          fen: '1Q6/4k3/8/1K6/1R6/8/8/2r5 b - - 0 8',
          highlights: ['b4:green', 'b5:green', 'b8:green'],
          caption: 'Kết quả của kỹ thuật bắc cầu: Trắng đã có Hậu.',
        },
      },
    ],
    keyTakeaways: [
      'Lucena: tốt ở hàng 7, Vua bên mạnh trước tốt, Vua bên yếu bị cắt ít nhất một cột.',
      'Chiếu đẩy Vua đối phương ra xa → Xe lên hàng 4 → Vua ra ngoài → Xe chặn chiếu.',
      'Mục tiêu của bên mạnh trong tàn cuộc Xe thường là đạt được thế Lucena.',
    ],
  },

  // ───────────────────────────── 10. Philidor ─────────────────────────────
  {
    id: 'tc-the-philidor',
    category: 'tan-cuoc',
    title: 'Thế Philidor – phòng thủ hàng ba',
    subtitle: 'Cách hòa quan trọng nhất của tàn cuộc Xe',
    level: 4,
    icon: '🧱',
    minutes: 12,
    intro:
      'Nếu Lucena là cách thắng, thì Philidor là cách hòa. Được François-André Philidor mô tả từ năm 1777, phương pháp phòng thủ này vẫn là kỹ thuật cơ bản nhất mà bên kém một tốt trong tàn cuộc Xe cần nắm vững. Ý tưởng chỉ gồm hai bước, nhưng phải thực hiện đúng thời điểm.',
    sections: [
      {
        heading: 'Thế phòng thủ cơ bản',
        body: `Điều kiện: **Vua bên phòng thủ đứng ngay trước tốt** (trên đường phong cấp).

**Bước 1 – Xe ở hàng thứ ba** (tính từ phía mình; với Đen là **hàng 6**). Xe khóa hàng này, không cho Vua Trắng tiến lên hàng 6. Vua Trắng không có chỗ trú để tránh các nước chiếu, nên không thể tiến lên.

Bên cạnh: Xe b6 của Đen khóa hàng 6. Vua Trắng ở d5 không thể vào c6, d6, e6.`,
        diagram: {
          fen: '4k3/R7/1r6/3KP3/8/8/8/8 w - - 0 1',
          highlights: ['c6:red', 'd6:red', 'e6:red', 'e8:green'],
          arrows: ['b6h6:blue'],
          caption: 'Philidor: Xe Đen giữ hàng 6, Vua Đen chặn trước tốt.',
        },
      },
      {
        heading: 'Chờ đợi trên hàng 6',
        body: `Chừng nào tốt Trắng chưa lên hàng 6, Đen chỉ việc **đi qua lại Xe trên hàng 6** (ở các ô an toàn, không kề Vua Trắng). Không có gì phải vội!

Trắng có thể cơ động Xe tùy thích, nhưng Vua Trắng không thể tiến lên mà không bị chiếu.`,
        diagram: {
          fen: '4k3/R7/1r6/3KP3/8/8/8/8 w - - 0 1',
          moves: '1.Rh7 Rg6 2.Rb7 Ra6',
          notes: [
            'Trắng cơ động Xe.',
            'Đen giữ Xe trên hàng 6.',
            'Trắng tiếp tục cơ động Xe tìm đột phá, nhưng không đe dọa được gì khi Xe Đen vẫn giữ hàng 6.',
            'Vẫn trên hàng 6 – Vua Trắng vẫn không thể tiến.',
          ],
          caption: 'Kiên nhẫn: Xe Đen chỉ cần ở lại hàng 6.',
        },
      },
      {
        heading: 'Bước 2: khi tốt lên hàng 6, Xe về hàng cuối và chiếu từ phía sau',
        body: `Cách duy nhất để Trắng tiến bộ là đẩy tốt lên **e6**. Nhưng lúc này tốt đã lấy đi “chỗ trú” của chính Vua Trắng trước các nước chiếu từ phía sau!

**Bước 2:** ngay khi tốt lên hàng 6, Xe Đen **lùi về hàng 1** và chiếu liên tục từ phía sau. Vua Trắng không có chỗ trốn (ô e6 đã bị tốt chiếm), nên Đen chiếu vĩnh viễn hoặc ăn được tốt. Hòa!`,
        warning: 'Đừng chuyển Xe về hàng 1 quá sớm. Nếu tốt chưa lên hàng 6 mà Xe đã rời hàng 6, Vua Trắng sẽ tiến lên và ván cờ có thể trở thành Lucena.',
        diagram: {
          fen: '4k3/R7/1r6/3KP3/8/8/8/8 w - - 0 1',
          moves: '1.e6 Rb1 2.Kd6 Rd1+ 3.Ke5 Re1+ 4.Kd6 Rd1+',
          notes: [
            'Tốt lên hàng 6 – giờ là lúc chuyển sang bước 2.',
            'Xe về hàng 1, chuẩn bị chiếu từ phía sau.',
            'Trắng đe dọa Ra8+, nhưng Đen được chiếu trước.',
            'Chiếu từ phía sau!',
            'Vua Trắng không có chỗ trú (e6 đã bị tốt chiếm).',
            'Tiếp tục chiếu.',
            'Vua Trắng quay lại d6, dọa Ra8# – nhưng Đen lại được chiếu trước từ phía sau.',
            'Chiếu vĩnh viễn – hòa.',
          ],
          caption: 'Tốt lên hàng 6 → Xe về hàng 1 → chiếu từ phía sau.',
        },
      },
      {
        heading: 'Tóm tắt và sai lầm thường gặp',
        body: `Phương pháp Philidor gói gọn trong hai câu:
- **Trước khi tốt lên hàng 6:** Xe giữ hàng 6 (hàng thứ ba của mình).
- **Khi tốt đã lên hàng 6:** Xe về hàng 1 (hàng thứ tám của mình) và chiếu từ phía sau.

Sai lầm phổ biến nhất là **phòng thủ thụ động**: đặt Xe ở hàng cuối của mình (hàng 8) ngay từ đầu. Khi đó Vua Trắng tiến lên hàng 6, và Đen thường bị dồn vào thế thua.`,
        tip: 'Trong tàn cuộc Xe, Xe chủ động gần như luôn tốt hơn Xe thụ động. Philidor là ví dụ rõ nhất.',
        diagram: {
          fen: '4k3/R7/4P3/3K4/8/8/8/4r3 w - - 0 1',
          highlights: ['e6:yellow', 'e1:green'],
          arrows: ['e1d1:blue'],
          caption: 'Tốt đã ở e6 nên Vua Trắng không còn chỗ trú – Xe Đen chiếu từ phía sau.',
        },
      },
    ],
    keyTakeaways: [
      'Philidor: Vua phòng thủ đứng trước tốt.',
      'Tốt chưa lên hàng 6 → Xe giữ hàng 6 (hàng thứ ba của mình).',
      'Tốt lên hàng 6 → Xe về hàng 1 và chiếu từ phía sau.',
      'Tránh phòng thủ thụ động ở hàng cuối.',
    ],
  },

  // ───────────────────────────── 11. Tarrasch & Xe hoạt động ─────────────────────────────
  {
    id: 'tc-xe-sau-tot-thong',
    category: 'tan-cuoc',
    title: 'Quy tắc Tarrasch & Xe hoạt động',
    subtitle: '“Xe phải đứng sau tốt thông” – và vì sao Xe cần tự do',
    level: 3,
    icon: '🚂',
    minutes: 12,
    intro:
      'Siegbert Tarrasch, một trong những nhà lý luận vĩ đại nhất, để lại một quy tắc ngắn gọn mà vô cùng hữu ích: **“Xe phải đứng sau tốt thông – dù là tốt của mình hay của đối phương”**. Bài học này giải thích quy tắc ấy và các nguyên tắc về tính hoạt động của Xe trong tàn cuộc.',
    sections: [
      {
        heading: 'Xe sau tốt thông của mình',
        body: `Khi Xe đứng **sau** tốt thông của mình:
- Mỗi bước tiến của tốt, Xe lại kiểm soát **thêm** một ô – Xe ngày càng mạnh hơn.
- Xe đối phương phải đứng chặn **trước** tốt, ngày càng bị ép lùi và thụ động.

Bên cạnh: Xe a1 của Trắng đứng sau tốt a5. Xe a8 của Đen bị trói ở trước tốt – nó gần như chỉ còn là một quân phòng thủ.`,
        diagram: {
          fen: 'r5k1/5ppp/8/P7/8/8/5PPP/R5K1 w - - 0 1',
          arrows: ['a1a5:blue', 'a5a8'],
          highlights: ['a8:red'],
          caption: 'Xe Trắng sau tốt (chủ động), Xe Đen trước tốt (thụ động).',
        },
      },
      {
        heading: 'Xe sau tốt thông của đối phương',
        body: `Quy tắc cũng đúng với bên phòng thủ: **Xe nên đứng sau tốt thông của đối phương**.

Bên cạnh là cấu trúc rất hay gặp: tốt a7 của Trắng được Xe a8 hỗ trợ từ phía trước, còn Xe Đen đứng sau ở a2. Kết quả: Xe Trắng **bị kẹt** trước tốt (nếu Xe rời đi, Đen bắt a7), Vua Trắng muốn đến hỗ trợ thì liên tục bị chiếu. Đây là thế phòng thủ rất vững cho Đen.

Vị trí Vua Đen cũng quan trọng: Vua nên đứng ở **g7 hoặc h7**. Nếu Vua đứng ở f7 hoặc e7, Trắng có đòn chiến thuật đẹp – xem phần sau.`,
        diagram: {
          fen: 'R7/P5k1/6p1/7p/8/6P1/r4P1P/6K1 w - - 0 1',
          highlights: ['a8:red', 'a2:green', 'g7:green'],
          caption: 'Xe Đen sau tốt a7; Xe Trắng bị kẹt ở a8.',
        },
      },
      {
        heading: 'Đòn xiên: vì sao Vua phải đứng đúng chỗ',
        body: `Nếu Vua Đen đứng sai ô (ở f7 thay vì g7), Trắng có đòn **Rh8!**:
- Nếu Đen bắt tốt **…Rxa7**, Trắng chiếu **Rh7+** theo hàng 7 và ăn Xe a7 (đòn **xiên**).
- Nếu Đen không bắt tốt, Trắng phong cấp a8=Q.

Bài học: trong tàn cuộc Xe, vị trí của Vua bên phòng thủ phải được tính toán để tránh các đòn chiến thuật kiểu xiên.`,
        diagram: {
          fen: 'R7/P4k2/6p1/7p/8/6P1/r4P1P/6K1 w - - 0 1',
          moves: '1.Rh8 Rxa7 2.Rh7+ Kf6 3.Rxa7',
          notes: [
            'Xe rời a8, dọn đường cho tốt phong cấp!',
            'Đen bắt tốt…',
            '…đòn xiên! Chiếu Vua theo hàng 7.',
            'Vua phải tránh.',
            'Trắng ăn Xe và thắng.',
          ],
          caption: 'Vua Đen đứng f7: đòn xiên Rh8! rồi Rh7+.',
        },
      },
      {
        heading: 'Xe hoạt động – Xe thụ động',
        body: `Nguyên tắc quan trọng nhất của tàn cuộc Xe: **Xe chủ động** (tấn công tốt, cắt Vua, chiếu từ xa) đáng giá hơn nhiều so với Xe thụ động (chỉ đứng bảo vệ tốt).

Một ứng dụng cụ thể: **cắt Vua đối phương** theo cột hoặc hàng. Bên cạnh, Xe d1 cắt Vua Đen ở cột e trở đi – Vua Đen không thể sang cột d để chặn tốt b. Trắng chỉ cần đưa Vua lên hộ tống tốt.

Nhiều kiện tướng sẵn sàng **hy sinh một tốt** để Xe được hoạt động – vì trong tàn cuộc Xe, Xe thụ động thường dẫn tới thua.`,
        tip: 'Trong tàn cuộc Xe, hãy hỏi: “Xe của mình đang tấn công hay đang phòng thủ?”. Nếu đang phòng thủ thụ động, hãy tìm cách giải phóng nó.',
        diagram: {
          fen: '8/8/8/4k3/1P6/8/K7/3R4 w - - 0 1',
          arrows: ['d1d8:blue', 'b4b8'],
          highlights: ['e5:red'],
          caption: 'Xe d1 cắt Vua Đen khỏi tốt b: một dạng hoạt động của Xe.',
        },
      },
    ],
    keyTakeaways: [
      'Xe đứng sau tốt thông – của mình lẫn của đối phương (Tarrasch).',
      'Xe đứng trước tốt của mình thường bị kẹt; Vua đối phương nên đứng g7/h7 để tránh đòn xiên.',
      'Xe chủ động đáng giá hơn một tốt; tránh phòng thủ thụ động.',
      'Dùng Xe cắt Vua đối phương khỏi tốt thông.',
    ],
  },

  // ───────────────────────────── 12. Tượng khác màu & sai màu ─────────────────────────────
  {
    id: 'tc-tuong-khac-mau',
    category: 'tan-cuoc',
    title: 'Tượng khác màu & Tượng sai màu',
    subtitle: 'Khi hơn quân vẫn không thắng được',
    level: 4,
    icon: '🌓',
    minutes: 11,
    intro:
      'Có những tàn cuộc mà bên hơn vật chất – thậm chí hơn hai tốt hoặc hơn cả một Tượng – vẫn không thể thắng. Biết những “pháo đài hòa” này giúp em cứu được những ván tưởng như đã thua, và tránh đổi quân sai lầm khi đang thắng.',
    sections: [
      {
        heading: 'Tượng khác màu: vua của hòa cờ',
        body: `Khi mỗi bên chỉ còn một Tượng và hai Tượng đi trên **ô khác màu**, bên phòng thủ có một vũ khí cực mạnh: Tượng của họ kiểm soát những ô mà Tượng đối phương **không bao giờ** chạm tới được.

Kết quả: hơn một tốt hầu như luôn hòa, và **thậm chí hơn hai tốt** cũng thường hòa nếu bên phòng thủ dựng được pháo đài.

Bên cạnh: Trắng hơn một tốt, nhưng Đen đặt Vua và Tượng kiểm soát ô **e5** (ô đen). Tượng ô trắng của Trắng không thể đuổi chúng đi. Tốt e4 vĩnh viễn không tiến lên được.`,
        diagram: {
          fen: '8/8/5b2/4k3/4P3/3BK3/8/8 w - - 0 1',
          highlights: ['e5:green', 'e4:red'],
          caption: 'Tượng khác màu: Vua và Tượng Đen phong tỏa trên ô đen e5.',
        },
      },
      {
        heading: 'Kỹ thuật phòng thủ với Tượng khác màu',
        body: `- **Vua phòng thủ** đứng chặn trước tốt, trên ô **cùng màu với Tượng của mình** – Tượng đối phương không thể chiếu hay đuổi nó.
- **Tượng phòng thủ** kiểm soát các ô trên đường tiến của tốt. Nếu cần, sẵn sàng **hy sinh Tượng lấy tốt cuối cùng** – Vua + Tượng không chiếu hết được.
- Ngay cả khi đối phương hơn hai tốt: nếu hai tốt liền nhau hoặc chỉ cách một cột, bên phòng thủ thường dựng được pháo đài; tốt cách xa nhau (từ hai cột trở lên) mới thật sự nguy hiểm.

Ngược lại, như em đã học ở bài Tượng: **trong trung cuộc**, Tượng khác màu lại **có lợi cho bên tấn công**.`,
        tip: 'Khi đang thua quân, hãy tìm cách đổi quân để đạt Tượng khác màu – đó là “phao cứu sinh” nổi tiếng.',
        diagram: {
          fen: '8/8/5b2/4k3/4P3/3BK3/8/8 w - - 0 1',
          arrows: ['d3f5:red', 'd3c4:red'],
          highlights: ['e5:green', 'f6:green'],
          caption: 'Tượng d3 (ô trắng) không thể tranh giành ô e5 (ô đen).',
        },
      },
      {
        heading: 'Tượng sai màu với tốt cạnh',
        body: `Đây là pháo đài hòa kỳ lạ nhất: **Vua + Tượng + tốt cạnh chống Vua** vẫn có thể hòa!

Điều kiện: ô phong cấp của tốt cạnh có **màu khác** với Tượng (Tượng “sai màu”), và Vua phòng thủ đến được góc.

Bên cạnh: tốt a phong cấp ở **a8 – ô trắng**, nhưng Trắng chỉ có **Tượng ô đen**. Tượng không thể đuổi Vua Đen khỏi a8. Đen chỉ cần đi qua lại a8–b8, và mọi cố gắng của Trắng đều kết thúc bằng hòa pat.`,
        warning: 'Trước khi đổi quân để vào tàn cuộc Tượng + tốt cạnh, hãy kiểm tra màu ô phong cấp!',
        diagram: {
          fen: 'k7/8/1K6/P7/8/8/8/2B5 b - - 0 1',
          moves: '1...Kb8 2.a6 Ka8 3.a7',
          notes: [
            'Vua Đen đi qua lại trong góc.',
            'Trắng đẩy tốt, nhưng Vua Đen vẫn ung dung trong góc – Tượng ô đen không bao giờ chạm được tới a8.',
            'Vua về a8 – Tượng ô đen không thể kiểm soát a8.',
            'Hòa pat! Đen không còn nước đi. Trắng hơn cả Tượng lẫn tốt mà vẫn không thắng.',
          ],
          caption: 'Tượng sai màu + tốt cạnh = hòa.',
        },
      },
      {
        heading: 'Tượng đúng màu thì thắng',
        body: `So sánh: nếu Trắng có **Tượng ô trắng** (cùng màu với ô phong cấp a8), Tượng sẽ chiếu đuổi Vua Đen ra khỏi góc và tốt phong cấp dễ dàng.

Thế cờ y hệt, chỉ khác màu Tượng – nhưng kết quả hoàn toàn ngược lại.`,
        diagram: {
          fen: 'k7/8/1K6/P7/8/8/8/3B4 b - - 0 1',
          moves: '1...Kb8 2.a6 Ka8 3.Bf3+ Kb8 4.a7+ Kc8 5.a8=Q+',
          notes: [
            'Vua Đen đi qua lại trong góc như ví dụ trước – nhưng lần này Trắng có Tượng ô trắng.',
            'Tốt tiến lên a6, lấy đi ô b7 của Vua Đen – y hệt như ở ví dụ trước.',
            'Vua Đen trở về góc, hy vọng dựng pháo đài – nhưng lần này a8 cùng màu với Tượng.',
            'Tượng ô trắng chiếu đuổi Vua khỏi góc!',
            'Nước duy nhất: Vua Đen phải rời góc sang b8, vì a7 và b7 đều bị khống chế.',
            'Tốt chiếu, Vua Đen phải rời b8.',
            'Vua Đen buộc lùi sang c8 – ô a8 đã bị Tượng f3 khống chế nên tốt phong cấp không gì cản nổi.',
            'Phong Hậu – Trắng thắng.',
          ],
          caption: 'Tượng đúng màu: đuổi Vua khỏi góc và thắng.',
        },
      },
    ],
    keyTakeaways: [
      'Tượng khác màu ở tàn cuộc: hơn một, thậm chí hai tốt vẫn thường hòa.',
      'Phòng thủ: Vua chặn trên ô cùng màu Tượng mình, Tượng khống chế đường tiến của tốt.',
      'Tượng sai màu + tốt cạnh: hòa nếu Vua phòng thủ vào được góc.',
      'Kiểm tra màu ô phong cấp trước khi đổi quân vào tàn cuộc Tượng + tốt cạnh.',
    ],
  },

  // ───────────────────────────── 13. Hậu chống tốt ─────────────────────────────
  {
    id: 'tc-hau-chong-tot',
    category: 'tan-cuoc',
    title: 'Hậu chống tốt ở hàng 7',
    subtitle: 'Kỹ thuật “bậc thang” và các ngoại lệ hòa',
    level: 4,
    icon: '🪜',
    minutes: 12,
    intro:
      'Một tốt đã lên hàng 7, sắp phong cấp, và đối thủ chỉ có một Hậu. Thắng hay hòa? Câu trả lời phụ thuộc vào **loại tốt**: tốt trung tâm và tốt Mã thường thua, còn tốt Xe và tốt Tượng (cột a, c, f, h) thường hòa nhờ những thủ thuật hòa pat tinh tế.',
    sections: [
      {
        heading: 'Ý tưởng: ép Vua đứng trước tốt',
        body: `Hậu không thể một mình ngăn tốt mãi mãi – cần Vua giúp. Nhưng Vua ở xa, mỗi nhịp đều quý.

Kỹ thuật “**bậc thang**”: Hậu chiếu và ghim liên tục cho tới khi **Vua đối phương buộc phải đứng ngay trước tốt** (ô phong cấp). Lúc đó tốt bị chặn bởi chính Vua của mình – Trắng có **một nhịp** để đưa Vua tiến lên một bước. Lặp lại quá trình này cho tới khi Vua Trắng đến gần, rồi ăn tốt hoặc chiếu hết.`,
        diagram: {
          fen: '8/8/2K5/8/8/8/3pk3/7Q w - - 0 1',
          highlights: ['d2:red', 'd1:yellow'],
          caption: 'Tốt d2 sắp phong cấp. Mục tiêu: ép Vua Đen về d1.',
        },
      },
      {
        heading: 'Kỹ thuật bậc thang với tốt trung tâm',
        body: `Theo dõi từng bước: mỗi khi Vua Đen bị ép vào **d1** (trước tốt), Vua Trắng tiến thêm một ô. Khi Vua Trắng đã đủ gần, Trắng kết thúc bằng chiếu hết.

Để ý cách Hậu luôn chiếu hoặc ghim tốt d2, không cho Đen thời gian phong cấp.`,
        diagram: {
          fen: '8/8/2K5/8/8/8/3pk3/7Q w - - 0 1',
          moves: '1.Qe4+ Kf2 2.Qd3 Ke1 3.Qe3+ Kd1 4.Kd5 Kc2 5.Qe2 Kc1 6.Qc4+ Kb2 7.Qd3 Kc1 8.Qc3+ Kd1 9.Kd4 Ke2 10.Qc2 Ke1 11.Ke3 d1=Q 12.Qf2#',
          notes: [
            'Chiếu – bắt đầu “leo bậc thang”.',
            'Vua Đen tránh chiếu sang f2 – đi d1 sẽ tự chặn tốt, nhưng rời xa tốt lại cho Hậu cơ hội tấn công nó.',
            'Hậu tấn công tốt và canh ô phong cấp: nếu …d1=Q thì Qxd1.',
            'Vua bảo vệ tốt.',
            'Chiếu…',
            '…Vua Đen bị ép vào d1, đứng trước tốt!',
            'Trắng có một nhịp: Vua tiến lên.',
            'Vua Đen tránh ra để tốt có thể phong cấp.',
            'Ghim tốt d2 theo hàng 2 – tốt không thể phong cấp.',
            'Vua Đen rời hàng 2 để gỡ ghim, dọa phong cấp ngay ở d1 – Trắng buộc phải chiếu tiếp.',
            'Chiếu.',
            'Vua Đen tránh đứng chặn ở d1 và chạy sang b2 – nhưng từ đó nó không còn che chở cho tốt d2.',
            'Hậu lại canh ô d1: nếu …d1=Q thì Qxd1.',
            'Vua Đen quay về c1 để bảo vệ tốt d2 và hỗ trợ nó phong cấp.',
            'Chiếu…',
            '…Vua Đen lại bị ép về d1.',
            'Thêm một nhịp: Vua Trắng tiến tiếp.',
            'Vua Đen rời d1 để mở đường phong cấp, đồng thời đứng sát bảo vệ tốt d2.',
            'Ghim tốt theo hàng 2.',
            'Vua Đen lùi về e1 để gỡ ghim và chuẩn bị phong cấp – nhưng Vua Trắng đã đủ gần để dựng lưới chiếu hết.',
            'Vua Trắng đã đến gần!',
            'Đen phong Hậu…',
            '…nhưng bị chiếu hết.',
          ],
          caption: 'Bậc thang: mỗi lần Vua Đen bị ép về d1, Vua Trắng tiến thêm một bước.',
        },
      },
      {
        heading: 'Ngoại lệ: tốt c và tốt f',
        body: `Với tốt Tượng (cột c hoặc f), bên phòng thủ có một thủ thuật hòa: khi bị ép, **Vua chạy vào góc** (a1 với tốt c2) **bỏ mặc tốt**. Nếu Hậu bắt tốt, Vua Đen ở góc **không còn nước đi** – hòa pat!

Bên cạnh: Qxc2?? là hòa pat. Trắng chỉ có thể thắng nếu Vua Trắng đã ở đủ gần để tạo đòn chiếu hết.

Với **tốt Xe** (cột a, h), tương tự: Vua phòng thủ đứng trong góc trước tốt, và Hậu không thể ép thêm mà không gây hòa pat.`,
        warning: 'Với tốt c, f, a, h ở hàng 7: kết quả thường là hòa, trừ khi Vua bên mạnh đã ở rất gần.',
        diagram: {
          fen: '8/8/8/8/8/1Q6/2p5/k6K w - - 0 1',
          arrows: ['b3c2:red'],
          highlights: ['a1:red'],
          caption: 'Qxc2?? – hòa pat! Vua Đen ở a1 không còn nước đi.',
        },
      },
    ],
    keyTakeaways: [
      'Hậu thắng tốt trung tâm và tốt Mã ở hàng 7 bằng kỹ thuật bậc thang.',
      'Mỗi lần Vua đối phương bị ép đứng trước tốt, Vua mình tiến một bước.',
      'Tốt Tượng và tốt Xe ở hàng 7 thường hòa nhờ thủ thuật hòa pat.',
    ],
  },

  // ───────────────────────────── 14. Cuộc đua phong cấp ─────────────────────────────
  {
    id: 'tc-dua-phong-cap',
    category: 'tan-cuoc',
    title: 'Cuộc đua phong cấp',
    subtitle: 'Đếm nước, phong Hậu kèm chiếu và đòn xiên Hậu mới phong',
    level: 2,
    icon: '🏃',
    minutes: 10,
    intro:
      'Khi cả hai bên đều có tốt thông lao về đích, ván cờ biến thành một cuộc đua. Nhưng về đích trước chưa chắc đã thắng: điều quyết định là **Hậu mới phong làm được gì ngay sau đó**. Bài này dạy em cách đếm nước và ba đòn chiến thuật kinh điển trong cuộc đua phong cấp.',
    sections: [
      {
        heading: 'Đếm nước: ai về đích trước?',
        body: `Trong cuộc đua, hãy đếm **số nước mỗi tốt cần để phong cấp**, rồi xem **ai đang đến lượt**. Bên cần ít nước hơn (tính cả lượt đi) sẽ có Hậu trước.

Nhưng hãy đếm thêm một bước: **ngay sau khi phong cấp, Hậu mới làm được gì?** Nếu nó không chiếu, không ăn được gì và không ngăn được tốt đối phương, thì đối phương cũng phong Hậu và ván cờ thường hòa.

Bên cạnh: Đen phong Hậu sớm hơn một nhịp, nhưng Hậu g1 chẳng làm được gì – cuối cùng hai bên đều có Hậu.`,
        diagram: {
          fen: '1K6/8/8/3P4/7k/6p1/8/8 w - - 0 1',
          moves: '1.d6 g2 2.d7 g1=Q 3.d8=Q+',
          notes: [
            'Tốt d cần ba nước để phong cấp (d6, d7, d8), tốt g chỉ cần hai nước (g2, g1). Cả hai Vua đều ở quá xa để đuổi kịp tốt đối phương.',
            'Đen cũng chạy tốt – không có lý do gì để chần chừ.',
            'Tốt d lên hàng 7, chỉ còn một bước.',
            'Đen phong Hậu trước… nhưng Hậu g1 không chiếu Vua Trắng và cũng không khống chế được ô d8.',
            'Trắng phong Hậu, lại còn chiếu (Hậu d8 chiếu Vua h4 theo đường chéo d8–h4). Nhưng Đen chỉ cần che bằng …Qg5 hoặc đi Vua – Hậu chống Hậu, hòa.',
          ],
          caption: 'Hai bên cùng phong Hậu mà không có đòn chiến thuật: thường là hòa.',
        },
      },
      {
        heading: 'Phong Hậu kèm chiếu – và khóa luôn ô phong cấp',
        body: `Lợi thế lớn nhất của việc về đích trước là **phong Hậu kèm nước chiếu**: đối phương mất một nhịp để tránh chiếu, nên chưa kịp phong cấp.

Thế cờ bên cạnh còn đẹp hơn: Hậu mới phong ở h8 vừa **chiếu Vua c8** theo hàng 8, vừa **khống chế ô a1** theo đường chéo dài h8–a1. Tốt a2 của Đen bị chặn đứng ngay trước vạch đích.`,
        diagram: {
          fen: '2k5/8/8/7P/p7/7K/8/8 w - - 0 1',
          moves: '1.h6 a3 2.h7 a2 3.h8=Q+ Kb7 4.Qa1',
          notes: [
            'Hai tốt cùng cần ba nước, nhưng Trắng đi trước. Vua c8 ở ngoài hình vuông của tốt h, Vua h3 cũng ở ngoài hình vuông của tốt a.',
            'Đen chạy đua.',
            'Tốt h lên hàng 7.',
            'Tốt a cũng chỉ còn một bước. Đen tưởng hai bên sẽ cùng có Hậu…',
            'Phong Hậu kèm chiếu! Hậu h8 chiếu theo hàng 8 và đồng thời nhìn xuyên đường chéo dài tới tận a1.',
            'Vua Đen phải tránh chiếu. Tốt a2 vẫn không thể phong cấp: nếu …a1=Q, Hậu h8 ăn ngay.',
            'Hậu chặn ngay trên ô phong cấp a1. Hậu chống một tốt bị chặn đứng – Trắng thắng dễ dàng.',
          ],
          caption: 'h8=Q+: chiếu Vua và khóa ô a1 cùng lúc.',
        },
      },
      {
        heading: 'Hậu mới phong canh giữ ô phong cấp của đối phương',
        body: `Khi Hậu mới phong đứng **trên cùng một đường** (cột, hàng hoặc đường chéo) với ô phong cấp của đối phương, bên về đích trước thường thắng: tốt đối phương vừa phong cấp đã bị ăn.

Bên cạnh: tốt a6 của Trắng và tốt a3 của Đen chạy ngược chiều nhau trên cùng cột a (chúng không chặn nhau vì tốt Trắng đi lên, tốt Đen đi xuống). Trắng phong Hậu ở a8 trước – và toàn bộ cột a thuộc về Hậu Trắng.`,
        diagram: {
          fen: '8/8/P1K5/5k2/8/p7/8/8 w - - 0 1',
          moves: '1.a7 a2 2.a8=Q a1=Q 3.Qxa1',
          notes: [
            'Tốt a6 tiến lên. Cả hai Vua đều đứng ngoài hình vuông của tốt đối phương.',
            'Đen cũng chạy.',
            'Phong Hậu. Hậu a8 nhìn thẳng xuống cột a, lúc này chỉ bị tốt a2 che.',
            'Đen phong cấp – nhưng ngay khi tốt rời a2, cột a thông suốt. (Nếu Đen không phong cấp, Trắng cũng sẽ ăn tốt a2.)',
            'Hậu a8 ăn Hậu mới phong. Trắng thắng.',
          ],
          caption: 'Cùng cột: Hậu phong trước ăn luôn Hậu của đối phương.',
        },
      },
      {
        heading: 'Đòn xiên: chiếu Vua, ăn Hậu',
        body: `Ngay cả khi cả hai bên đều phong Hậu, ván cờ chưa chắc đã hòa. Nếu **Vua và Hậu đối phương đứng trên cùng một đường thẳng** (hàng, cột hoặc đường chéo), em chiếu Vua – Vua buộc phải tránh, và Hậu đứng phía sau bị ăn. Đó là đòn **xiên**.

Bên cạnh: Đen sẽ phong Hậu ở b1, trong khi Vua Đen đứng ở f5 – cả hai cùng nằm trên đường chéo b1–h7. Một nước chiếu từ h7 là đủ.`,
        tip: 'Trước khi lao vào cuộc đua, hãy hình dung Hậu mới của em và Hậu mới của đối phương sẽ đứng ở đâu: có đường nào nối chúng với Vua không? Có ô nào để chiếu kèm xiên không?',
        diagram: {
          fen: '8/8/7P/2K2k2/8/1p6/8/8 w - - 0 1',
          moves: '1.h7 b2 2.h8=Q b1=Q 3.Qh7+ Kf6 4.Qxb1',
          notes: [
            'Tốt h chạy.',
            'Tốt b cũng chạy – cả hai cùng chỉ còn một bước.',
            'Trắng phong Hậu trước. Hậu h8 tấn công luôn tốt b2 theo đường chéo dài h8–b2, nên Đen buộc phải phong cấp ngay.',
            'Đen phong Hậu. Nhưng nhìn kỹ: Vua f5 và Hậu b1 cùng nằm trên đường chéo b1–h7!',
            'Chiếu xiên! Đen không thể che chắn (chính Vua f5 đang chắn đường của Hậu b1), nên Vua phải rời đường chéo.',
            'Vua tránh chiếu…',
            '…và Hậu h7 ăn Hậu b1. Trắng thắng.',
          ],
          caption: 'Qh7+ xiên Vua f5 và Hậu b1.',
        },
      },
    ],
    keyTakeaways: [
      'Đếm số nước mỗi tốt cần để phong cấp, nhớ tính cả lượt đi.',
      'Về đích trước chỉ có lợi nếu Hậu mới làm được gì đó ngay: chiếu, khống chế ô phong cấp đối phương, hoặc xiên.',
      'Phong Hậu kèm chiếu giành thêm một nhịp quý giá.',
      'Khi Vua và Hậu đối phương nằm trên cùng một đường, hãy tìm đòn xiên.',
    ],
  },

  // ───────────────────────────── 15. Chiếu hết bằng hai Tượng ─────────────────────────────
  {
    id: 'tc-chieu-het-hai-tuong',
    category: 'tan-cuoc',
    title: 'Chiếu hết bằng hai Tượng',
    subtitle: 'Bức tường đường chéo: dồn Vua vào góc rồi chiếu hết',
    level: 3,
    icon: '✖️',
    minutes: 14,
    intro:
      'Vua + hai Tượng chống Vua trơ trọi luôn thắng – với điều kiện hai Tượng đi trên hai màu ô khác nhau và em biết cách phối hợp chúng. Khác với Hậu hay Xe, mỗi Tượng chỉ khống chế được một màu ô, nên hai Tượng phải luôn **làm việc theo cặp**. Chơi chính xác, em không bao giờ cần quá 19 nước để chiếu hết.',
    sections: [
      {
        heading: 'Vì sao cần cả hai Tượng?',
        body: `Một Tượng (dù có Vua giúp) **không thể** chiếu hết – nó chỉ khống chế một nửa số ô trên bàn cờ. Hai Tượng **khác màu** thì bù trừ cho nhau: khi đứng cạnh nhau, chúng khống chế hai đường chéo kề nhau, tạo thành một **bức tường** mà Vua đối phương không thể vượt qua.

Mục tiêu cuối cùng: dồn Vua đối phương vào **góc bàn cờ** (góc nào cũng được). Ở giữa mép bàn, nếu phòng thủ đúng, Vua luôn tìm được đường thoát; chỉ khi bị ép vào góc (hoặc sát góc) nó mới bị chiếu hết.

Mẫu chiếu hết bên cạnh: Vua Trắng g6 khóa f7, g7, h7; Tượng g7 (được Vua bảo vệ) khóa f8 và h8; Tượng e6 chiếu theo đường chéo.`,
        diagram: {
          fen: '6k1/6B1/4B1K1/8/8/8/8/8 b - - 0 1',
          highlights: ['g8:red', 'f8:yellow', 'h8:yellow', 'f7:yellow', 'h7:yellow'],
          caption: 'Mẫu chiếu hết: Vua bị dồn vào góc, hai Tượng và Vua chia nhau khóa mọi ô.',
        },
      },
      {
        heading: 'Bức tường của hai Tượng',
        body: `Khi hai Tượng **đứng cạnh nhau** (cùng một hàng hoặc cùng một cột), chúng khống chế hai đường chéo song song kề nhau – một “bức tường” chéo cắt ngang bàn cờ.

Ở thế bên cạnh, Tượng f5 khóa đường chéo c8–h3, Tượng g5 khóa đường chéo d8–h4. Vua Đen ở f7 không thể bước qua bức tường: e6, e7, f6, g6 đều bị khống chế. Nó chỉ còn bốn ô e8, f8, g8, g7 ở góc trên bên phải. Vua Trắng d5 đứng phía sau bức tường, sẵn sàng tiến lên.`,
        tip: 'Hãy coi hai Tượng như một **cặp song sinh**: di chuyển chúng sao cho chúng luôn ở gần nhau và cùng nhau thu hẹp “chiếc hộp” của Vua đối phương.',
        diagram: {
          fen: '8/5k2/8/3K1BB1/8/8/8/8 b - - 0 1',
          arrows: ['f5c8:blue', 'f5h3:blue', 'g5d8:blue', 'g5h4:blue'],
          highlights: ['f7:red'],
          caption: 'Hai đường chéo kề nhau c8–h3 và d8–h4: bức tường không thể vượt qua.',
        },
      },
      {
        heading: 'Giai đoạn 1: dồn Vua ra mép bàn',
        body: `Kế hoạch giống như các thế chiếu hết khác: **Vua về trung tâm**, còn hai Tượng thu hẹp không gian của Vua đối phương từng bước. Hãy để ý rằng Trắng hầu như không vội chiếu: phần lớn các nước là **nước lấy ô**, và hai Tượng luôn đứng gần nhau.

Đen phòng thủ tốt nhất – luôn cố bám lấy trung tâm – nhưng sau tám nước, Vua Đen đã bị ép xuống hàng 8.`,
        diagram: {
          fen: '8/8/4k3/8/8/3BB3/8/4K3 w - - 0 1',
          moves: '1.Kd2 Kd5 2.Kc3 Ke5 3.Kc4 Kd6 4.Kd4 Ke6 5.Bf4 Kf6 6.Kd5 Ke7 7.Bg5+ Kf7 8.Bf5 Kf8',
          notes: [
            'Vua Trắng lên đường về trung tâm. Hai Tượng d3, e3 đã đứng cạnh nhau sẵn.',
            'Vua Đen chiếm trung tâm, cố đứng càng xa mép bàn càng tốt.',
            'Vua Trắng tiến tiếp. Vua Đen không thể xuống hàng 4: c4 và e4 bị Tượng d3 khống chế, d4 bị Tượng e3 khống chế.',
            'Vua Đen bám lấy trung tâm.',
            'Vua Trắng áp sát thêm. Cả hàng 4 (d4, e4, f4) giờ đều bị khóa.',
            'Vua Đen lùi về d6.',
            'Hai Vua đối mặt (d4–d6) và Đen phải đi: Vua Đen buộc phải nhường đường.',
            'Vua Đen lùi sang e6.',
            'Tượng ô đen tiến lên f4. Bây giờ d5, e5, f5 và cả d6 đều bị khống chế – Vua Đen chỉ còn các ô d7, e7, f7, f6.',
            'Vua Đen tìm chỗ trú ở f6, xa Vua Trắng.',
            'Vua Trắng lại tiến lên, khóa e5, e6 và d6. Ô g6 bị Tượng d3 khống chế, g5 bị Tượng f4 khống chế.',
            'Vua Đen bị đẩy lùi xuống hàng 7.',
            'Chiếu! Tượng g5 đuổi Vua Đen khỏi e7.',
            'Vua Đen tránh chiếu sang f7.',
            'Hai Tượng đứng cạnh nhau (f5–g5): bức tường hoàn chỉnh. Vua Đen chỉ còn e8, f8, g8 và g7.',
            'Vua Đen đã bị ép xuống hàng cuối. Giai đoạn 1 hoàn thành!',
          ],
          caption: 'Vua về trung tâm, hai Tượng sát cánh: Vua Đen bị đẩy về hàng 8.',
        },
      },
      {
        heading: 'Giai đoạn 2: lùa Vua vào góc và chiếu hết',
        body: `Vua Đen đã ở mép bàn. Trắng dùng Vua để khóa hàng 7, còn hai Tượng **thay nhau chiếu** để đẩy Vua Đen dọc theo mép bàn về góc h8. Khi Vua Đen đã ở trong góc, Trắng chỉ cần một nước chờ chính xác rồi chiếu hết.

Chú ý nước **13.Bf5!**: Tượng nhường ô g6 cho Vua Trắng mà vẫn khóa ô h7 – Vua Đen buộc phải đi ra g8.`,
        diagram: {
          fen: '5k2/8/8/3K1BB1/8/8/8/8 w - - 0 9',
          moves: '9.Ke6 Ke8 10.Bg6+ Kf8 11.Bh6+ Kg8 12.Kf6 Kh8 13.Bf5 Kg8 14.Kg6 Kh8 15.Bg7+ Kg8 16.Be6#',
          notes: [
            'Vua Trắng chiếm e6, khóa toàn bộ d7, e7, f7. Vua Đen chỉ còn e8, g8 và g7.',
            'Vua Đen chạy về e8 – càng xa góc h8 càng tốt.',
            'Chiếu! Tượng ô trắng đẩy Vua Đen quay lại. (Ô d8 bị Tượng g5 khống chế.)',
            'Nước duy nhất.',
            'Chiếu tiếp! Lần này Tượng ô đen đẩy Vua Đen về phía góc (e8 bị Tượng g6 khống chế).',
            'Nước duy nhất: Vua Đen chỉ còn cách góc một bước.',
            'Vua Trắng theo sau, khóa f7 và g7. Vua Đen chỉ còn ô h8.',
            'Vua Đen vào góc.',
            'Nước chờ quan trọng! Tượng rời g6 để nhường chỗ cho Vua Trắng nhưng vẫn khóa ô h7. (Cẩn thận: 13.Kf7?? là hòa pat – Vua Đen ở h8 hết nước đi.)',
            'Vua Đen chỉ có thể quay lại g8.',
            'Vua Trắng chiếm g6. Vua Đen lại chỉ còn ô h8.',
            'Vua Đen về góc lần cuối.',
            'Chiếu! Tượng g7 được Vua g6 bảo vệ. Vua Đen buộc phải ra g8.',
            'Nước duy nhất.',
            'Chiếu hết! Tượng e6 chiếu theo đường chéo, Tượng g7 khóa f8 và h8, Vua g6 khóa f7, g7, h7.',
          ],
          caption: 'Hai Tượng thay nhau chiếu, nước chờ 13.Bf5! rồi chiếu hết.',
        },
      },
      {
        heading: 'Cẩn thận hòa pat!',
        body: `Hai Tượng và Vua khống chế rất nhiều ô, nên khi Vua đối phương đã ở gần góc, chỉ một nước bất cẩn là **hòa pat**.

Bên cạnh: nước tự nhiên **Ke7??** (áp sát Vua Đen) khiến Vua g8 không bị chiếu nhưng hết đường đi: f8, f7 bị Vua Trắng khóa; g7 và h8 bị Tượng d4 khóa; h7 bị Tượng e4 khóa. Nước đúng là **Ke6** hoặc **Bg6**, luôn chừa cho Vua Đen ít nhất một ô.`,
        warning: 'Khi Vua đối phương chỉ còn một, hai ô, trước mỗi nước đi hãy tự hỏi: “Sau nước này, nó còn ô nào để đi không? Nếu không, nó có đang bị chiếu không?”',
        diagram: {
          fen: '6k1/3K4/8/8/3BB3/8/8/8 w - - 0 1',
          arrows: ['d7e7:red'],
          highlights: ['g8:red', 'f8:yellow', 'f7:yellow', 'g7:yellow', 'h8:yellow', 'h7:yellow'],
          caption: 'Ke7?? là hòa pat. Ke6! hoặc Bg6! mới đúng.',
        },
      },
    ],
    keyTakeaways: [
      'Hai Tượng khác màu đứng cạnh nhau tạo thành bức tường đường chéo.',
      'Vua về trung tâm, hai Tượng thu hẹp chiếc hộp: đẩy Vua đối phương ra mép rồi vào góc.',
      'Chiếu hết xảy ra ở góc (hoặc sát góc): một Tượng chiếu, Tượng kia và Vua khóa các ô còn lại.',
      'Dùng nước chờ của Tượng khi cần trao lượt đi; luôn đề phòng hòa pat.',
    ],
  },

  // ───────────────────────────── 16. Mã trong tàn cuộc ─────────────────────────────
  {
    id: 'tc-ma-chong-tot',
    category: 'tan-cuoc',
    title: 'Mã trong tàn cuộc',
    subtitle: 'Nước chiếu giành nhịp, ô trước tốt và mẫu chiếu hết bất ngờ',
    level: 3,
    icon: '🐴',
    minutes: 12,
    intro:
      'Botvinnik từng nói: “Tàn cuộc Mã thực chất là tàn cuộc Tốt”. Mã đi chậm, tầm hoạt động ngắn và không thể “đứng chờ” một nhịp, nên mọi phép tính trong tàn cuộc Mã đều giống như đếm nhịp trong tàn cuộc Tốt. Bài này dạy em những kỹ thuật quan trọng nhất khi Mã phải chặn một tốt thông.',
    sections: [
      {
        heading: 'Đặc điểm của Mã trong tàn cuộc',
        body: `- **Tầm ngắn:** Mã ở giữa bàn khống chế 8 ô, nhưng ở góc chỉ còn 2 ô. Muốn sang cánh bên kia, Mã cần nhiều nước – vì vậy Mã rất sợ **tốt thông ở xa**.
- **Không thể mất nhịp:** mỗi nước đi, Mã đổi màu ô (ô trắng sang ô đen và ngược lại), nên nó chỉ quay về được ô cũ sau một số **chẵn** nước. Mã không thể đi một nước chờ để “trao lượt” như Vua hay Xe.
- **Chiếu và chĩa đôi:** điểm mạnh của Mã là những nước chiếu bất ngờ – rất hữu ích để giành nhịp khi đuổi theo tốt.

Bên cạnh: Mã d4 khống chế 8 ô (xanh), còn Mã a8 chỉ có 2 ô b6, c7 (đỏ).`,
        diagram: {
          fen: 'N6k/8/8/8/3N4/8/8/6K1 w - - 0 1',
          highlights: ['b3:green', 'b5:green', 'c2:green', 'c6:green', 'e2:green', 'e6:green', 'f3:green', 'f5:green', 'b6:red', 'c7:red'],
          caption: 'Mã trung tâm khống chế 8 ô, Mã ở góc chỉ còn 2 ô.',
        },
      },
      {
        heading: 'Nước chiếu giành nhịp',
        body: `Khi Mã đuổi theo tốt thông, hãy tìm những nước **chiếu Vua** trên đường đi: đối phương phải tránh chiếu thay vì đẩy tốt, và Mã có thêm một nhịp.

Bên cạnh: tốt g3 chỉ còn hai bước nữa là phong cấp. Để khống chế ô g1, Mã h6 phải tới f3, h3 hoặc e2 – ít nhất ba nước. Đi thẳng (1.Nf5? hay 1.Ng4?) thì tốt sẽ phong cấp. Nhưng **1.Nf7+!** chiếu Vua d8: Đen mất một nhịp để tránh chiếu, và Mã kịp tới f3.`,
        diagram: {
          fen: '3k4/8/7N/6K1/8/6p1/8/8 w - - 0 1',
          moves: '1.Nf7+ Ke7 2.Ne5 g2 3.Nf3 Ke6 4.Kg4 Kd5 5.Kg3 Ke4 6.Kxg2',
          notes: [
            'Chiếu! Vua Đen buộc phải tránh, tốt g chưa được đi.',
            'Vua Đen tránh chiếu và tiến về trung tâm.',
            'Mã nhảy về e5, nhắm tới ô f3.',
            'Tốt lên g2, chỉ còn một bước.',
            'Vừa kịp! Mã f3 khống chế ô phong cấp g1 – tốt g2 bị chặn đứng.',
            'Vua Đen cố quay lại giúp tốt, nhưng còn quá xa.',
            'Vua Trắng tiến tới g4, bảo vệ Mã f3.',
            'Vua Đen áp sát.',
            'Vua Trắng tấn công tốt g2 và vẫn bảo vệ Mã.',
            'Vua Đen tấn công Mã f3, nhưng Mã đã được Vua g3 bảo vệ.',
            'Trắng ăn tốt – hòa. Không có nước chiếu 1.Nf7+, Trắng đã thua.',
          ],
          caption: '1.Nf7+! giành nhịp: Mã kịp tới f3 khống chế ô phong cấp.',
        },
      },
      {
        heading: 'Ô trước tốt và điệu nhảy quanh tốt',
        body: `Vị trí lý tưởng của Mã khi chặn tốt là **ngay trước tốt** (ô tốt sắp tiến tới), hoặc một ô **khống chế** ô đó. Khi Vua đối phương đuổi Mã đi, Mã nhảy sang một ô khác vẫn canh được ô trước tốt – thường kèm theo nước chiếu.

Bên cạnh: Vua Trắng ở rất xa (e8), một mình Mã phải đương đầu với Vua và tốt d3 của Đen. Mã chiếu liên tục để tới d2 – ô ngay trước tốt – rồi “nhảy múa” quanh tốt cho tới khi Vua Trắng kịp quay về.`,
        tip: 'Mã chặn tốt tốt nhất từ **phía trước**. Đứng sau tốt, Mã rất khó đuổi kịp.',
        diagram: {
          fen: '4K3/5N2/8/5k2/8/3p4/8/8 w - - 0 1',
          moves: '1.Nd6+ Ke5 2.Nc4+ Kd4 3.Nd2 Ke3 4.Nc4+ Ke2 5.Kd7 d2 6.Nxd2 Kxd2',
          notes: [
            'Chiếu – Mã tiến về phía tốt với nhịp.',
            'Vua Đen tránh chiếu, tiến về phía tốt.',
            'Lại chiếu! Từ c4, Mã đã khống chế ô d2 ngay trước tốt.',
            'Vua Đen áp sát tốt để hộ tống nó.',
            'Mã đứng ngay trước tốt – thế chặn lý tưởng. Tốt d3 không thể tiến lên.',
            'Vua Đen tấn công Mã d2.',
            'Mã nhảy đi kèm nước chiếu, vẫn khống chế ô d2.',
            'Vua Đen tránh chiếu sang e2, bảo vệ ô d2 và chuẩn bị đẩy tốt.',
            'Vua Trắng lên đường về phía tốt. Mã c4 vẫn canh ô d2.',
            'Đen đẩy tốt…',
            '…và Mã ăn ngay.',
            'Đen ăn lại Mã, nhưng chỉ còn hai Vua trơ trọi – hòa.',
          ],
          caption: 'Mã chiếm ô trước tốt (d2) và chiếu liên tục để giữ ô đó.',
        },
      },
      {
        heading: 'Chiếu hết bằng một Mã',
        body: `Em đã biết Vua + Mã **không thể** chiếu hết Vua trơ trọi. Nhưng nếu đối phương còn tốt, chính quân tốt ấy có thể **chặn đường thoát** của Vua mình!

Bên cạnh: Vua Đen ở góc a1 bị chính tốt a2 của mình chặn lối ra. Vua Trắng c2 khóa b1, b2. Chỉ cần **1.Nb3#** – chiếu hết!

Còn nếu đến lượt Đen, Đen không còn nước đi hợp lệ nào và ván cờ **hòa pat**. Trong tàn cuộc Mã, lượt đi luôn quan trọng.`,
        diagram: {
          fen: '8/8/8/8/3N4/8/p1K5/k7 w - - 0 1',
          moves: '1.Nb3#',
          notes: ['Chiếu hết! Tốt a2 của Đen đã tự chặn ô thoát cuối cùng của Vua mình.'],
          caption: 'Vua + Mã chiếu hết được khi tốt đối phương chặn đường thoát của chính Vua nó.',
        },
      },
    ],
    keyTakeaways: [
      'Tàn cuộc Mã giống tàn cuộc Tốt: hãy đếm nhịp thật chính xác.',
      'Mã không thể mất nhịp và rất chậm khi phải chuyển cánh – cẩn thận với tốt thông ở xa.',
      'Dùng nước chiếu để giành nhịp khi Mã đuổi theo tốt.',
      'Ô tốt nhất để Mã chặn tốt là ô ngay trước tốt.',
      'Vua + Mã có thể chiếu hết nếu tốt đối phương tự chặn đường thoát của Vua nó.',
    ],
  },

  // ───────────────────────────── 17. Tượng hay Mã ─────────────────────────────
  {
    id: 'tc-tuong-va-ma',
    category: 'tan-cuoc',
    title: 'Tượng hay Mã? Tàn cuộc quân nhẹ',
    subtitle: 'Tượng tốt, Tượng xấu và nghệ thuật khống chế Mã',
    level: 3,
    icon: '⚖️',
    minutes: 11,
    intro:
      'Tượng và Mã có giá trị gần bằng nhau (khoảng 3 điểm), nhưng trong tàn cuộc sức mạnh của chúng thay đổi rất nhiều theo cấu trúc tốt. Biết trước quân nào sẽ mạnh hơn giúp em quyết định nên giữ quân nào, đổi quân nào – một trong những quyết định quan trọng nhất khi chuyển sang tàn cuộc.',
    sections: [
      {
        heading: 'Tượng tốt và Tượng xấu',
        body: `Một Tượng bị chính các tốt của mình chặn đường (tốt đứng trên **ô cùng màu** với Tượng) gọi là **Tượng xấu**. Tượng xấu thụ động, gần như chỉ còn làm nhiệm vụ bảo vệ tốt.

Bên cạnh: mọi tốt Đen (a6, b5, d5, e6, f7, g6, h7) đều nằm trên ô trắng – đúng màu của Tượng c8. Tượng Đen hầu như không có việc gì để làm. Ngược lại, Mã c5 của Trắng đứng trên một **tiền đồn**: không tốt Đen nào đuổi được nó (tốt b và tốt d đã đi qua), và từ đó Mã tấn công a6, e6.`,
        tip: 'Quy tắc vàng: hãy đặt tốt trên **ô khác màu** với Tượng của mình. Khi đó tốt khống chế một màu ô, Tượng khống chế màu còn lại – hai bên bổ sung cho nhau.',
        diagram: {
          fen: '2b3k1/5p1p/p3p1p1/1pNp4/3P4/P3P3/1P3PPP/6K1 w - - 0 1',
          highlights: ['c5:green', 'c8:red', 'a6:yellow', 'b5:yellow', 'd5:yellow', 'e6:yellow', 'f7:yellow', 'g6:yellow', 'h7:yellow'],
          caption: 'Mã tốt (c5) chống Tượng xấu (c8): Trắng có lợi thế lâu dài.',
        },
      },
      {
        heading: 'Khi nào Tượng mạnh hơn?',
        body: `Tượng là quân **tầm xa**: chỉ một nước, nó có thể chuyển từ cánh này sang cánh kia. Tượng thường mạnh hơn Mã khi:
- Thế cờ **mở**, ít tốt ở trung tâm.
- Có tốt ở **cả hai cánh** (hoặc có tốt thông ở xa) – Tượng canh giữ được cả hai nơi.
- Cần **khống chế một ô từ xa**, chẳng hạn để chặn một tốt thông.

Bên cạnh: chỉ với một nước, Tượng e3 có mặt ở cánh Hậu (c5, b6) hoặc cánh Vua (g5, h6). Mã e6 thì phải nhảy từng bước ngắn mới chuyển được cánh.`,
        diagram: {
          fen: '8/4kppp/p3n3/1p6/1P6/P3B3/5PPP/6K1 w - - 0 1',
          arrows: ['e3b6:blue', 'e3h6:blue'],
          highlights: ['e6:red'],
          caption: 'Tốt ở hai cánh: Tượng tầm xa canh được cả hai nơi.',
        },
      },
      {
        heading: 'Khi nào Mã mạnh hơn?',
        body: `Mã thường mạnh hơn Tượng khi:
- Thế cờ **đóng**: chuỗi tốt khóa chặt các đường chéo của Tượng.
- Mã có **tiền đồn** – ô được tốt bảo vệ mà tốt đối phương không thể đuổi đi.
- Tất cả tốt nằm ở **một cánh**: tầm xa của Tượng không còn ý nghĩa, còn Mã tấn công được cả ô trắng lẫn ô đen.
- Tượng đối phương là **Tượng xấu**.

Ví dụ ở phần 1 hội tụ gần đủ các yếu tố này: Mã ở tiền đồn c5 chống một Tượng bị chính tốt của mình giam cầm.`,
      },
      {
        heading: 'Tượng khống chế Mã',
        body: `Mã ở **mép bàn** có rất ít ô để đi. Một Tượng có thể khống chế **tất cả** các ô đó cùng lúc – Mã bị “bắt sống”, và Vua chỉ việc tới ăn nó.

Bên cạnh: Mã b8 chỉ có ba ô a6, c6, d7 – cả ba đều nằm trên đường chéo của Tượng b5. Đến lượt Trắng, Vua Trắng đi d6–c7 và ăn Mã.

Nếu đến lượt Đen thì khác: **1…Ke7!** đưa Vua kịp tới bảo vệ các ô quanh Mã. Một lần nữa, lượt đi quyết định tất cả.`,
        diagram: {
          fen: '1n6/6pp/5k2/1B1K4/8/8/5PP1/8 w - - 0 1',
          moves: '1.Kd6 h5 2.Kc7 g5 3.Kxb8',
          notes: [
            'Vua Trắng tiến về phía Mã. Ô e7 kề sát Vua Trắng nên Vua Đen không thể tới gần b8.',
            'Đen không cứu được Mã, đành đẩy tốt tìm phản công.',
            'Vua Trắng tới c7, tấn công Mã b8. Mã không còn ô nào để chạy.',
            'Đen tiếp tục đẩy tốt.',
            'Trắng ăn Mã. Hơn hẳn một Tượng, Trắng sẽ thắng.',
          ],
          caption: 'Tượng b5 khống chế cả ba ô của Mã b8 – Mã bị bắt sống.',
        },
      },
    ],
    keyTakeaways: [
      'Tượng xấu bị chính tốt của mình chặn đường; hãy đặt tốt khác màu với Tượng.',
      'Tượng mạnh trong thế mở, khi tốt ở hai cánh hoặc khi cần khống chế từ xa.',
      'Mã mạnh trong thế đóng, khi có tiền đồn, khi tốt ở một cánh, hoặc khi đối phương có Tượng xấu.',
      'Mã ở mép bàn có thể bị Tượng khống chế toàn bộ ô và bị bắt sống.',
    ],
  },

  // ───────────────────────────── 18. Xe chống Tốt ─────────────────────────────
  {
    id: 'tc-xe-chong-tot',
    category: 'tan-cuoc',
    title: 'Xe chống Tốt',
    subtitle: 'Cắt Vua, chiếu dồn Vua về trước tốt và những lần Xe chỉ hòa',
    level: 4,
    icon: '🛡️',
    minutes: 14,
    intro:
      'Xe mạnh hơn tốt rất nhiều – vậy mà trong thực chiến, không ít tàn cuộc Xe chống tốt kết thúc hòa! Lý do: một tốt đã tiến xa, được Vua hộ tống, có thể nhanh hơn Vua của bên có Xe. Bài này dạy em cách đếm nhịp và những kỹ thuật then chốt cho cả hai bên.',
    sections: [
      {
        heading: 'Ba câu hỏi trước khi tính toán',
        body: `Khi gặp tàn cuộc Xe chống tốt, hãy tự hỏi:
- **Vua của bên có Xe có tới được trước tốt không?** Nếu có, Xe thắng dễ dàng.
- **Xe có cắt được Vua đối phương khỏi tốt không?** Xe đứng trên một cột (hoặc hàng) chắn giữa Vua đối phương và tốt – tốt mất người hộ tống và sẽ bị ăn.
- **Ai nhanh hơn?** Nếu tốt đã được Vua hộ tống, hãy đếm thật chính xác: Vua bên có Xe cần mấy nước để quay về, tốt cần mấy nước để phong cấp.

Bên cạnh: Xe e1 cắt Vua Đen khỏi tốt c4 – Vua Đen không thể bước sang cột e. Vua Trắng ung dung đi tới ăn tốt.`,
        diagram: {
          fen: '8/8/8/8/2p2k2/8/8/K3R3 w - - 0 1',
          moves: '1.Kb2 Kf5 2.Kc3 Kf4 3.Kxc4',
          notes: [
            'Vua Trắng tiến về phía tốt.',
            'Vua Đen muốn sang giúp tốt, nhưng mọi ô trên cột e đều bị Xe khống chế.',
            'Vua Trắng chặn ngay trước tốt.',
            'Vua Đen đành đi lại phía sau hàng rào.',
            'Ăn tốt – Xe thắng.',
          ],
          arrows: ['e1e8:blue'],
          caption: 'Xe cắt Vua theo cột e: tốt mất người hộ tống.',
        },
      },
      {
        heading: 'Kỹ thuật then chốt: chiếu dồn Vua về trước tốt',
        body: `Khi Vua đối phương đã đứng cạnh tốt, Xe thường phải dùng một thủ thuật: **chiếu để buộc Vua đối phương đứng chắn ngay trước tốt của mình**. Khi đó tốt bị chính Vua của nó cản đường, và bên có Xe giành được **một nhịp** để đưa Vua lại gần.

Bên cạnh: tốt d3 của Đen được Vua c2 hộ tống, Vua Trắng ở b4. Chỉ có một nước thắng: **1.Ra2+!**`,
        diagram: {
          fen: '8/8/8/8/1K6/3p4/2k5/R7 w - - 0 1',
          moves: '1.Ra2+ Kd1 2.Kc3 d2 3.Rxd2+ Ke1',
          notes: [
            'Chiếu theo hàng 2! Vua Đen phải rời hàng 2, và không thể lên b3, c3 vì hai ô này kề Vua Trắng.',
            'Vua Đen chọn d1 – nhưng giờ nó đứng ngay trên đường đi của tốt d. (Nếu 1…Kc1 thì 2.Kc3! d2 3.Ra1# chiếu hết; nếu 1…Kb1 thì 2.Rd2 rồi ăn tốt.)',
            'Nhịp vừa giành được: Vua Trắng tới c3, bảo vệ ô d2.',
            'Tốt tiến lên d2…',
            '…nhưng Xe ăn ngay, được Vua c3 bảo vệ.',
            'Còn lại Vua + Xe chống Vua: Trắng thắng.',
          ],
          caption: '1.Ra2+! ép Vua Đen về d1, chắn trước tốt của chính mình.',
        },
      },
      {
        heading: 'Sai lầm: đi Vua trước – Đen phong Mã!',
        body: `Nước tự nhiên **1.Kc4?** (đưa Vua lại gần) làm mất chiến thắng. Đen đẩy tốt ngay, và khi Trắng chiếu dồn, Đen có một vũ khí bất ngờ: **phong cấp thành Mã kèm nước chiếu**. Xe chống Mã đứng sát Vua của nó thường là thế hòa.`,
        warning: 'Với bên có tốt: khi phong Hậu sẽ bị chiếu hết hoặc bị Xe ăn, hãy nghĩ tới **phong Mã** – nhất là khi Mã mới phong chiếu được Vua đối phương.',
        diagram: {
          fen: '8/8/8/8/1K6/3p4/2k5/R7 w - - 0 1',
          moves: '1.Kc4 d2 2.Ra2+ Kc1 3.Kc3 d1=N+',
          notes: [
            'Sai lầm! Vua tiến lại gần nhưng cho Đen thời gian đẩy tốt.',
            'Tốt lên d2, chỉ còn một bước.',
            'Trắng chiếu, dồn Vua Đen về c1…',
            '…Vua Đen chắn trước tốt, đúng như Trắng muốn.',
            'Vua Trắng tới c3. Nếu Đen phong Hậu (3…d1=Q??) thì 4.Ra1# chiếu hết.',
            'Phong Mã kèm chiếu! Đen thoát hiểm – Xe chống Mã ở đây là hòa.',
          ],
          caption: '1.Kc4? d2! và 3…d1=N+! – Đen hòa.',
        },
      },
      {
        heading: 'Chậm một nhịp: Vua đứng cạnh tốt, Xe đành hòa',
        body: `Lùi Vua Trắng ra a5 (thay vì b4) và kết quả thay đổi hoàn toàn. Lần này sau 1.Ra2+, Vua Đen **không chui vào trước tốt** mà đứng **cạnh tốt** (…Kc3!). Tốt vẫn được hộ tống, còn Xe không thể cắt Vua Đen ra.

Đây cũng là bài học cho bên có tốt: **Vua hãy đứng bên cạnh tốt, đừng đứng chắn trước nó.**`,
        tip: 'Bên có tốt: khi bị Xe chiếu, hãy đưa Vua sang bên cạnh tốt (hoặc tiến về phía Vua đối phương để cản đường nó), đừng lùi vào ô trước tốt.',
        diagram: {
          fen: '8/8/8/K7/8/3p4/2k5/R7 w - - 0 1',
          moves: '1.Ra2+ Kc3 2.Ra3+ Kc2 3.Kb4 d2 4.Rc3+ Kb2 5.Rd3 Kc2',
          notes: [
            'Nước chiếu quen thuộc…',
            '…nhưng lần này Vua Đen bước lên c3, đứng cạnh tốt. Ô c3 không bị Vua Trắng ở a5 khống chế.',
            'Trắng chiếu tiếp.',
            'Vua Đen quay về c2, vẫn đứng cạnh tốt.',
            'Vua Trắng tiến lên b4.',
            'Tốt lên d2; ô phong cấp d1 được Vua c2 bảo vệ.',
            'Trắng chiếu theo cột c.',
            'Vua Đen tránh sang b2.',
            'Xe vào phía sau tốt, đe dọa ăn d2.',
            'Vua Đen trở lại c2 bảo vệ tốt. Trắng không tiến triển được: chỉ còn cách chiếu liên tục hoặc thí Xe lấy tốt – hòa.',
          ],
          caption: 'Chậm một nhịp: Vua Đen đứng cạnh tốt – hòa.',
        },
      },
      {
        heading: 'Tốt cạnh ở góc: chiếu hết hay hòa pat?',
        body: `Với tốt cạnh, Vua phòng thủ thường chui vào góc trước tốt – và xuất hiện những thủ thuật đặc biệt. Ở thế bên cạnh, Vua Đen a1 bị chính tốt a2 của mình chặn đường:
- **Đến lượt Trắng:** 1.Rh1# – chiếu hết!
- **Đến lượt Đen:** Đen không còn nước đi hợp lệ nào – **hòa pat**.

Một nhịp đi quyết định tất cả. Khi chơi Xe chống tốt cạnh, hãy luôn kiểm tra cả hai khả năng này.`,
        diagram: {
          fen: '7R/8/8/8/8/8/p1K5/k7 w - - 0 1',
          moves: '1.Rh1#',
          notes: ['Chiếu hết theo hàng 1: b1 bị Xe và Vua khống chế, b2 bị Vua khống chế, còn a2 là tốt của chính Đen.'],
          caption: 'Đến lượt Trắng: Rh1#. Đến lượt Đen: hòa pat.',
        },
      },
    ],
    keyTakeaways: [
      'Vua bên có Xe đứng trước tốt, hoặc Xe cắt được Vua đối phương → thắng dễ.',
      'Khi Vua đối phương hộ tống tốt: chiếu để dồn nó về ô trước tốt, giành một nhịp cho Vua mình.',
      'Đếm nhịp thật chính xác – chậm một nhịp là hòa.',
      'Bên có tốt: Vua đứng cạnh tốt, và nhớ tới phong Mã khi phong Hậu bị trừng phạt.',
    ],
  },

  // ───────────────────────────── 19. Thế Saavedra ─────────────────────────────
  {
    id: 'tc-the-saavedra',
    category: 'tan-cuoc',
    title: 'Thế Saavedra – phong Xe để thắng',
    subtitle: 'Nghiên cứu nổi tiếng nhất về phong cấp dưới',
    level: 4,
    icon: '✨',
    minutes: 11,
    intro:
      'Năm 1895, tờ Glasgow Weekly Citizen đăng một thế tàn cuộc của Georges Barbier với kết luận “hòa”. Một độc giả – linh mục người Tây Ban Nha Fernando Saavedra – đã tìm ra nước thắng không ai ngờ tới: phong tốt thành **Xe** thay vì Hậu! Thế Saavedra là ví dụ đẹp nhất cho thấy Hậu không phải lúc nào cũng là lựa chọn tốt nhất khi phong cấp.',
    sections: [
      {
        heading: 'Thế cờ và ý đồ của hai bên',
        body: `Trắng: Vua b6, tốt c6. Đen: Vua a1, Xe d5. Trắng đi trước.

Trắng chỉ có một ý tưởng: đẩy tốt c lên phong cấp. Đen chỉ có một vũ khí: Xe chiếu liên tục, hoặc đứng sau tốt để bắt nó. Vấn đề của Trắng là tìm cho Vua một chỗ trốn khỏi các nước chiếu của Xe.`,
        diagram: {
          fen: '8/8/1KP5/3r4/8/8/8/k7 w - - 0 1',
          arrows: ['c6c8'],
          highlights: ['c6:green', 'd5:red'],
          caption: 'Thế Saavedra: Trắng đi trước và thắng.',
        },
      },
      {
        heading: 'Vua Trắng chạy trốn các nước chiếu',
        body: `Sau **1.c7**, Xe Đen bắt đầu chiếu. Vua Trắng không được tiến lên (2.Kb7? Rd7! ghim tốt), cũng không được sang cột c (2.Kc5? Rd1! – nếu 3.c8=Q?? thì 3…Rc1+ và Đen ăn Hậu). Cả hai cách đều chỉ hòa.

Nước đúng là **đi thẳng xuống theo cột b**, tiến dần về phía Xe Đen cho tới khi hết nước chiếu.`,
        diagram: {
          fen: '8/8/1KP5/3r4/8/8/8/k7 w - - 0 1',
          moves: '1.c7 Rd6+ 2.Kb5 Rd5+ 3.Kb4 Rd4+ 4.Kb3 Rd3+ 5.Kc2',
          notes: [
            'Tốt lên hàng 7, đe dọa phong Hậu.',
            'Đen bắt đầu loạt chiếu – Xe phải ngăn Vua Trắng hộ tống tốt.',
            'Đúng! Vua đi xuống theo cột b. (2.Kb7? Rd7! ghim tốt; 2.Kc5? Rd1! – cả hai đều hòa.)',
            'Đen tiếp tục chiếu.',
            'Vua tiếp tục đi xuống, mỗi bước lại gần Xe Đen hơn.',
            'Chiếu tiếp.',
            'Vua tới b3.',
            'Nước chiếu cuối cùng…',
            'Vua Trắng áp sát và tấn công Xe d3 – hết nước chiếu! Nhưng Đen vẫn còn một cái bẫy tinh vi: 5…Rd4!',
          ],
          caption: 'Vua chạy xuống theo cột b, áp sát Xe Đen để thoát chiếu.',
        },
      },
      {
        heading: 'Cái bẫy: 6.c8=Q? hòa pat',
        body: `Sau **5…Rd4!**, nước tự nhiên **6.c8=Q?** bị đáp lại bằng **6…Rc4+!**. Nếu Trắng ăn Xe 7.Qxc4, Vua Đen ở a1 **không còn nước đi nào** – hòa pat! Còn nếu Vua Trắng tránh chiếu, Xe ăn Hậu c8.

Đây chính là lời giải “hòa” mà Barbier đã công bố.`,
        diagram: {
          fen: '8/2P5/8/8/3r4/8/2K5/k7 w - - 0 6',
          moves: '6.c8=Q Rc4+ 7.Qxc4',
          notes: [
            'Phong Hậu? Sai lầm – Trắng rơi vào bẫy!',
            'Xe chiếu, hiến thân!',
            'Hòa pat! Vua Đen a1 không bị chiếu, nhưng a2 bị Hậu c4 khống chế, b1 và b2 bị Vua c2 khống chế.',
          ],
          caption: '6.c8=Q? Rc4+! 7.Qxc4 – hòa pat.',
        },
      },
      {
        heading: 'Nước thắng: 6.c8=R!!',
        body: `Saavedra đã tìm ra lời giải: **phong Xe!** Xe mới không khống chế đường chéo a2–g8, nên bẫy hòa pat biến mất. Đồng thời Trắng đe dọa **Ra8#** (chiếu hết theo cột a).

Đen buộc phải chặn bằng **6…Ra4**, và **7.Kb3!** tạo ra hai đe dọa cùng lúc: ăn Xe a4 và **Rc1#**. Đen không thể chống đỡ cả hai.`,
        tip: 'Mỗi khi phong cấp, hãy dành một giây kiểm tra: Hậu mới có gây hòa pat không? Phong Xe hoặc Mã có tốt hơn không?',
        diagram: {
          fen: '8/2P5/8/8/3r4/8/2K5/k7 w - - 0 6',
          moves: '6.c8=R Ra4 7.Kb3',
          notes: [
            'Phong Xe!! Đe dọa Ra8#. Không còn bẫy pat: nếu 6…Rc4+ thì 7.Rxc4 và Vua Đen vẫn còn ô a2.',
            'Đen chặn cột a để ngăn Ra8#.',
            'Đòn kép: Vua tấn công Xe a4 và đe dọa Rc1#. Đen chỉ có thể chọn mất Xe hoặc bị chiếu hết – Trắng thắng.',
          ],
          caption: '6.c8=R!! Ra4 7.Kb3! – Đen mất Xe hoặc bị chiếu hết.',
        },
      },
      {
        heading: 'Phong Mã kèm chiếu',
        body: `Phong Mã là kiểu phong cấp dưới hay gặp nhất trong thực chiến, vì Mã đi được những nước mà Hậu không đi được. Phong Mã **kèm chiếu** hoặc **chĩa đôi** có thể quyết định ván cờ.

Bên cạnh: 1.d8=Q? cho Đen cơ hội chiếu (…Qf1+ rồi ăn tốt g2) – Hậu chống Hậu, hòa. Còn **1.d8=N+!** chiếu Vua b7 và chĩa luôn Hậu f7: Trắng ăn Hậu và thắng với Mã + tốt.`,
        diagram: {
          fen: '8/1k1P1q2/8/8/8/8/6P1/K7 w - - 0 1',
          moves: '1.d8=N+ Kc8 2.Nxf7',
          notes: [
            'Phong Mã kèm chiếu! Mã d8 chiếu Vua b7 và đồng thời tấn công Hậu f7.',
            'Vua phải tránh chiếu.',
            'Trắng ăn Hậu. Vua + Mã + tốt chống Vua trơ trọi: Trắng thắng.',
          ],
          caption: '1.d8=N+! chĩa đôi Vua và Hậu.',
        },
      },
    ],
    keyTakeaways: [
      'Trước khi phong Hậu, luôn kiểm tra bẫy hòa pat.',
      'Thế Saavedra: Vua chạy xuống cột b để thoát chiếu, rồi 6.c8=R!! thắng.',
      'Xe giữ nguyên sức mạnh theo hàng và cột nhưng không khống chế đường chéo – nhờ vậy tránh được hòa pat.',
      'Phong Mã khi nước phong cấp kèm chiếu hoặc chĩa đôi.',
    ],
  },

  // ───────────────────────────── 20. Chiếu hết bằng Tượng + Mã ─────────────────────────────
  {
    id: 'tc-chieu-het-tuong-ma',
    category: 'tan-cuoc',
    title: 'Chiếu hết bằng Tượng và Mã',
    subtitle: 'Thế chiếu hết khó nhất: góc đúng màu và phương pháp chữ W',
    level: 5,
    icon: '🎯',
    minutes: 18,
    intro:
      'Vua + Tượng + Mã chống Vua là thế chiếu hết cơ bản khó nhất: chơi chính xác cũng có thể cần tới 33 nước, trong khi luật 50 nước chỉ cho em 50 nước. Ngay cả những kỳ thủ mạnh cũng từng để hòa thế này trong thi đấu. Bí quyết nằm ở hai điều: chỉ ép được chiếu hết ở **góc cùng màu với Tượng**, và **phương pháp chữ W** để lùa Vua từ góc sai sang góc đúng.',
    sections: [
      {
        heading: 'Góc đúng màu và góc sai màu',
        body: `Vua + Tượng + Mã chỉ **ép** được chiếu hết ở **góc có màu trùng với màu ô của Tượng**. Ở góc khác màu, nếu Vua phòng thủ chơi chính xác, nó luôn thoát được.

Trắng có Tượng ô trắng → hai góc “đúng” là **a8 và h1** (ô trắng). Hai góc a1 và h8 là “góc sai”.

Vua phòng thủ khôn ngoan luôn chạy về **góc sai** – như Vua Đen ở h8 bên cạnh. Vì vậy em phải học cách lùa nó từ góc sai sang góc đúng: đó là phương pháp chữ W.`,
        diagram: {
          fen: '7k/8/5K2/6N1/4B3/8/8/8 w - - 0 1',
          highlights: ['a8:green', 'h1:green', 'a1:red', 'h8:red'],
          caption: 'Tượng ô trắng: góc đúng là a8, h1. Vua Đen đang trốn ở góc sai h8.',
        },
      },
      {
        heading: 'Mẫu chiếu hết cần nhắm tới',
        body: `Ở góc đúng màu, thế chiếu hết thường có dạng: Vua Trắng đứng cách Vua Đen một ô (theo đường chéo hoặc đối diện), Mã khóa một ô thoát, Tượng chiếu.

Bên cạnh: Vua Đen a8; Vua Trắng c7 khóa b7, b8; Mã c8 khóa a7; Tượng d5 chiếu theo đường chéo a8–h1. Ba quân phối hợp hoàn hảo.`,
        diagram: {
          fen: 'k1N5/2K5/8/3B4/8/8/8/8 b - - 0 1',
          highlights: ['a8:red', 'a7:yellow', 'b7:yellow', 'b8:yellow'],
          caption: 'Mẫu chiếu hết ở góc đúng màu a8.',
        },
      },
      {
        heading: 'Bước 1: Mã chiếm f7, Tượng khóa đường lùi',
        body: `Bắt đầu từ thế Vua Đen trốn ở góc sai h8. Trắng dùng **Mã chiếu từ f7**, rồi đưa **Tượng tới h7** để khóa ô g8. Vua Đen bị đẩy dọc hàng 8 về phía cánh Hậu – tức là về phía góc đúng a8.

Hãy nhớ hình ảnh sau nước 3.Bh7: Vua Trắng f6, Mã f7, Tượng h7 – ba quân nhốt Vua Đen ở hàng 8 và đẩy nó sang trái.`,
        diagram: {
          fen: '7k/8/5K2/6N1/4B3/8/8/8 w - - 0 1',
          moves: '1.Nf7+ Kg8 2.Bf5 Kf8 3.Bh7 Ke8 4.Ne5 Kd8 5.Ke6 Kc7',
          notes: [
            'Chiếu! Mã f7 đuổi Vua Đen ra khỏi góc h8. (Ô h7 bị Tượng e4 khống chế.)',
            'Nước duy nhất.',
            'Tượng chuyển sang f5, chuẩn bị tới h7.',
            'Nước duy nhất: Vua Đen tiếp tục bị đẩy sang trái.',
            'Tượng h7 khóa ô g8: Vua Đen không thể quay lại góc h8 nữa.',
            'Nước duy nhất: Vua Đen lùi tiếp về e8.',
            'Bắt đầu chữ W: Mã rời f7 về e5, chuẩn bị tới d7.',
            'Vua Đen chạy tiếp sang cánh Hậu. (Quay lại f8 thì chết nhanh hơn: 5.Nd7+ và Vua Đen lại bị đẩy đi.)',
            'Vua Trắng tiến lên e6, khóa d7, e7, f7.',
            'Vua Đen chạy về c7, cố thoát khỏi hàng 8.',
          ],
          caption: 'Mã f7, Tượng h7: Vua Đen bị đẩy khỏi góc sai.',
        },
      },
      {
        heading: 'Bước 2: chữ W – lùa Vua dọc hàng cuối',
        body: `Đường đi zic-zắc của Mã **f7 → e5 → d7** vẽ nên nửa đầu chữ W – vì thế người ta gọi đây là **phương pháp chữ W**. Mã và Tượng thay nhau khóa các ô để Vua Đen không thể thoát ra giữa bàn: Mã d7 khóa b6, b8, c5; Tượng lần lượt khóa a6, b7, c6 từ d3, a6, b5.

Để ý nước **10.Nb6!**: Mã rời d7 để mở đường chéo b5–e8 cho Tượng, nhờ đó Vua Đen không thể chạy ngược về cánh Vua.`,
        diagram: {
          fen: '8/2k4B/4K3/4N3/8/8/8/8 w - - 0 6',
          moves: '6.Nd7 Kb7 7.Bd3 Kc6 8.Ba6 Kc7 9.Bb5 Kd8 10.Nb6 Kc7 11.Nc4 Kd8 12.Kd6 Kc8',
          notes: [
            'Mã tới d7 – đỉnh giữa của chữ W. Mã khóa b6, b8 và c5.',
            'Vua Đen chạy về b7, tránh xa Mã.',
            'Tượng quay về d3, khóa a6 và b5.',
            'Vua Đen tìm đường thoát qua c6.',
            'Tượng a6 khóa b7, b5 và c8. Vua Đen bị ép quay lại.',
            'Nước duy nhất: b6, c5 bị Mã khống chế; d5, d6 bị Vua Trắng; b5, b7 bị Tượng.',
            'Tượng chuyển sang b5, khóa c6 và a6.',
            'Vua Đen quay lại d8, cố chạy ngược về phía cánh Vua.',
            'Mã nhảy sang b6: khóa c8 và mở đường chéo cho Tượng b5 khóa e8. Vua Đen hết đường chạy sang cánh Vua!',
            'Nước duy nhất.',
            'Mã tiếp tục vòng qua c4, chuẩn bị tới a5 rồi b7.',
            'Vua Đen lại về d8.',
            'Vua Trắng chiếm d6 – Vua Đen bị nhốt ở hàng 8.',
            'Nước duy nhất: e8 bị Tượng b5 khống chế.',
          ],
          caption: 'Mã f7–e5–d7–b6–c4, Tượng d3–a6–b5: Vua Đen bị lùa sang cánh Hậu.',
        },
      },
      {
        heading: 'Bước 3: ép Vua vào góc a8 và chiếu hết',
        body: `Vua Đen đã bị dồn về phía góc **a8 – góc đúng màu**. Giờ ba quân Trắng siết chặt vòng vây: Mã chiếu đẩy Vua Đen, Vua Trắng tiến sát, Tượng đi nước chờ đúng lúc, rồi chiếu hết.

Lưu ý **18.Bc4!**: một nước chờ của Tượng để Vua Đen phải đi – Tượng vẫn khóa ô a6 và chuẩn bị chiếu từ d5.`,
        warning: 'Đừng quên luật 50 nước: nếu 50 nước liên tiếp (của mỗi bên) không có tốt nào đi và không có quân nào bị bắt, đối phương có quyền đòi hòa. Với Tượng + Mã, em không có thời gian cho những nước thừa!',
        diagram: {
          fen: '2k5/8/3K4/1B6/2N5/8/8/8 w - - 0 13',
          moves: '13.Na5 Kd8 14.Nb7+ Kc8 15.Kc6 Kb8 16.Nd6 Ka7 17.Kc7 Ka8 18.Bc4 Ka7 19.Nc8+ Ka8 20.Bd5#',
          notes: [
            'Mã tới a5, khóa b7. Vua Đen chỉ còn b8 hoặc d8.',
            'Vua Đen chọn d8 – chạy xa góc a8 nhất có thể.',
            'Chiếu! Mã b7 đẩy Vua Đen quay lại (e8 bị Tượng b5 khống chế).',
            'Nước duy nhất.',
            'Vua Trắng sang c6, bảo vệ Mã b7 và khóa c7, d7. Vua Đen chỉ còn ô b8.',
            'Nước duy nhất – Vua Đen lại gần góc a8 hơn.',
            'Mã quay về d6, khóa c8 và b7.',
            'Vua Đen lách sang a7.',
            'Vua Trắng tới c7: a6 bị Tượng khống chế, Vua Đen chỉ còn ô a8.',
            'Nước duy nhất: Vua Đen vào góc a8 – góc đúng màu!',
            'Nước chờ! Tượng lùi về c4, vẫn khóa a6. Vua Đen buộc phải ra a7.',
            'Nước duy nhất.',
            'Chiếu! Mã c8 đẩy Vua Đen về góc (a6 bị Tượng c4 khống chế).',
            'Nước duy nhất.',
            'Chiếu hết! Tượng d5 chiếu theo đường chéo, Mã c8 khóa a7, Vua c7 khóa b7 và b8.',
          ],
          caption: 'Vua Đen bị ép vào góc a8 và bị chiếu hết.',
        },
      },
    ],
    keyTakeaways: [
      'Chỉ ép được chiếu hết ở góc cùng màu với Tượng.',
      'Vua phòng thủ sẽ chạy về góc sai; dùng phương pháp chữ W để lùa nó sang góc đúng.',
      'Mã chiếu từ f7, Tượng khóa từ h7, rồi Mã đi zic-zắc f7–e5–d7 trong khi Tượng khóa các ô trắng.',
      'Chơi chính xác có thể cần tới 33 nước – hãy nhớ luật 50 nước.',
    ],
  },
];
