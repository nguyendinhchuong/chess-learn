import type { Lesson } from '../types';

export const LESSONS: Lesson[] = [
  // ───────────────────────── 1. Bàn cờ & ký hiệu ─────────────────────────
  {
    id: 'nm-ban-co-va-ky-hieu',
    category: 'nhap-mon',
    title: 'Bàn cờ, tọa độ và ký hiệu nước đi',
    subtitle: 'Học “ngôn ngữ” của cờ vua để đọc được mọi ván cờ trên thế giới',
    level: 1,
    icon: '🗺️',
    minutes: 12,
    intro: `Chào mừng em đến với hành trình chinh phục cờ vua! Trước khi đánh một quân nào, chúng ta cần biết “bản đồ” của trận chiến: bàn cờ có 64 ô, mỗi ô có một cái tên riêng. Khi đã thuộc tên ô và cách ghi nước đi, em có thể đọc sách, xem lại ván đấu của các Đại kiện tướng và tự ghi lại ván của mình để rút kinh nghiệm.`,
    sections: [
      {
        heading: 'Bàn cờ: 64 ô đen – trắng xen kẽ',
        body: `Bàn cờ vua là một hình vuông gồm **8 × 8 = 64 ô**, màu sáng và màu tối xen kẽ nhau. Dù bàn cờ thật có màu nâu – kem hay xanh – trắng, ta vẫn gọi là **ô trắng** và **ô đen**.

Khi đặt bàn cờ, hãy nhớ câu thần chú: **“Ô trắng bên tay phải”**. Nghĩa là ô ở góc dưới bên phải của mỗi người chơi luôn là ô trắng (ô h1 với bên Trắng, ô a8 với bên Đen).

- Bên **Trắng** luôn đi trước.
- Quân Trắng xếp ở hàng 1 và 2, quân Đen ở hàng 7 và 8.
- **Hậu đứng ở ô cùng màu với mình**: Hậu trắng ở ô trắng d1, Hậu đen ở ô đen d8.`,
        tip: 'Nếu Hậu của em không đứng trên ô cùng màu, rất có thể em đã xoay bàn cờ sai hoặc đổi chỗ Vua và Hậu.',
        diagram: {
          highlights: ['h1:green', 'a8:green', 'd1:blue', 'd8:blue'],
          caption: 'Thế cờ ban đầu. Ô xanh lá: góc “ô trắng bên phải”. Ô xanh dương: Hậu đứng trên ô cùng màu.',
        },
      },
      {
        heading: 'Cột, hàng và tên của từng ô',
        body: `Mỗi ô được gọi tên bằng **chữ cái của cột** ghép với **số của hàng**:

- **Cột** (theo chiều dọc) đánh chữ từ **a đến h**, tính từ trái sang phải theo góc nhìn của bên Trắng.
- **Hàng** (theo chiều ngang) đánh số từ **1 đến 8**, tính từ phía bên Trắng lên phía bên Đen.

Ví dụ: Vua trắng ban đầu ở **e1**, Vua đen ở **e8**. Tốt trắng trước Vua đứng ở **e2**; khi nó tiến hai ô, nó đến ô **e4**. Hãy thử tìm ô d5 trên bàn cờ: đi dọc cột d, rồi lên hàng thứ 5.`,
        tip: 'Mẹo luyện nhanh: mỗi ngày dành 2 phút nhìn bàn cờ và tự hỏi “ô f6 ở đâu? ô c3 ở đâu?”. Sau một tuần em sẽ “nhìn” được tọa độ như người đọc chữ.',
        diagram: {
          arrows: ['e2e4', 'd7d5:blue'],
          highlights: ['e4:green', 'd5:blue', 'e1', 'e8'],
          caption: 'Tốt e2 tiến đến e4 (mũi tên xanh lá), tốt d7 tiến đến d5 (mũi tên xanh dương). Ô vàng: vị trí ban đầu của hai Vua – e1 và e8.',
        },
      },
      {
        heading: 'Trung tâm và những đường chéo dài',
        body: `Bốn ô **d4, e4, d5, e5** được gọi là **trung tâm** – vùng đất quý giá nhất bàn cờ. Một quân đứng ở trung tâm có thể nhanh chóng chạy sang cả cánh Vua lẫn cánh Hậu, giống như một ngã tư lớn trong thành phố.

Bàn cờ còn có hai **đường chéo dài** là a1–h8 và h1–a8. Một Tượng hay Hậu đứng trên đường chéo dài sẽ “bắn” xuyên qua cả bàn cờ.

- **Cánh Vua**: các cột e, f, g, h.
- **Cánh Hậu**: các cột a, b, c, d.`,
        diagram: {
          fen: '4k3/8/8/8/8/8/8/4K3 w - - 0 1',
          arrows: ['a1h8:blue', 'h1a8:blue'],
          highlights: ['d4:green', 'e4:green', 'd5:green', 'e5:green'],
          caption: 'Bốn ô trung tâm (xanh lá) và hai đường chéo dài (xanh dương).',
        },
      },
      {
        heading: 'Ký hiệu của các quân cờ',
        body: `Trong ứng dụng này và trong sách cờ quốc tế, mỗi quân được viết tắt bằng một chữ cái tiếng Anh in hoa:

- **K** (King) – **Vua**
- **Q** (Queen) – **Hậu**
- **R** (Rook) – **Xe**
- **B** (Bishop) – **Tượng**
- **N** (Knight) – **Mã** (dùng chữ N vì K đã dành cho Vua)
- **Tốt** không có chữ cái – chỉ ghi ô đến, ví dụ **e4**.

Mỗi bên có 16 quân: 1 Vua, 1 Hậu, 2 Xe, 2 Tượng, 2 Mã và 8 Tốt.`,
        tip: 'Ứng dụng của chúng ta hiển thị nước đi bằng biểu tượng quân cờ (♘f3), nên em không cần lo nhớ nhầm chữ cái – nhưng đọc được ký hiệu chữ sẽ giúp em đọc mọi cuốn sách cờ.',
        diagram: {
          highlights: ['e1:blue', 'd1:blue', 'a1', 'h1', 'c1:green', 'f1:green', 'b1:red', 'g1:red'],
          caption: 'Vị trí ban đầu: Xe ở góc (a1, h1), Mã cạnh Xe (b1, g1), Tượng cạnh Mã (c1, f1), Hậu d1 và Vua e1.',
        },
      },
      {
        heading: 'Cách ghi một nước đi',
        body: `Một nước đi được ghi bằng **chữ cái của quân + ô đến**. Đây gọi là **ký hiệu đại số rút gọn (SAN)**:

- **Nf3**: Mã đi đến f3.
- **e4**: Tốt đi đến e4.
- **Bxc6**: Tượng **ăn** quân ở c6 (chữ **x** nghĩa là ăn quân).
- **dxc6**: Tốt ở cột d ăn quân ở c6 (với Tốt ăn quân, ta ghi cột xuất phát).
- **O-O**: nhập thành cánh Vua; **O-O-O**: nhập thành cánh Hậu.

Nước đi được đánh số theo cặp: “1.e4 e5” nghĩa là nước thứ nhất Trắng đi e4, Đen đáp e5. Khi chỉ nói về nước của Đen, ta viết “1…e5”.`,
        diagram: {
          moves: '1.e4 e5 2.Nf3 Nc6 3.Bb5 a6 4.Bxc6 dxc6 5.O-O',
          notes: [
            '1.e4 – Tốt Trắng tiến hai ô đến e4.',
            '1…e5 – Đen đáp lại đối xứng.',
            '2.Nf3 – Mã Trắng (N) đi đến f3, tấn công tốt e5.',
            '2…Nc6 – Mã Đen ra c6 bảo vệ tốt e5.',
            '3.Bb5 – Tượng Trắng (B) đến b5. Đây là khai cuộc Tây Ban Nha nổi tiếng.',
            '3…a6 – Tốt a7 đến a6, hỏi Tượng: “Anh định làm gì?”',
            '4.Bxc6 – Tượng ăn (x) Mã ở c6.',
            '4…dxc6 – Tốt cột d ăn lại quân ở c6, nên ghi là dxc6.',
            '5.O-O – Trắng nhập thành cánh Vua: Vua sang g1, Xe sang f1.',
          ],
          caption: 'Bấm ▶ để xem từng nước và cách ghi tương ứng.',
        },
      },
      {
        heading: 'Ký hiệu đặc biệt và dấu đánh giá nước đi',
        body: `Một số ký hiệu bổ sung em sẽ gặp thường xuyên:

- **+** : chiếu (tấn công Vua), ví dụ **Bb5+**.
- **#** : chiếu hết – kết thúc ván cờ, ví dụ **Qh4#**.
- **=Q** : phong cấp, ví dụ **e8=Q** (Tốt đến hàng cuối thành Hậu).
- **Nbd7** : khi hai quân cùng loại có thể đến cùng một ô, ta thêm cột (hoặc hàng) xuất phát để phân biệt.

Các bình luận viên còn dùng dấu để **đánh giá chất lượng nước đi** – ứng dụng của chúng ta cũng dùng chúng khi phân tích ván của em:

- **!!** nước đi xuất sắc, **!** nước đi hay
- **!?** nước đi thú vị, **?!** nước đi đáng ngờ
- **?** sai lầm, **??** sai lầm nghiêm trọng`,
        diagram: {
          moves: '1.d4 d5 2.c4 e6 3.Nc3 Nf6 4.Bg5 Nbd7',
          notes: [
            'Trắng chiếm trung tâm bằng tốt d4. Nước Tốt không cần chữ cái chỉ quân – chỉ ghi ô đến là đủ.',
            'Đen đáp lại bằng tốt d5: ký hiệu “d5” nghĩa là một Tốt vừa đi tới ô d5.',
            '2.c4 – Gambit Hậu.',
            'Tốt e6 bảo vệ tốt d5 – Đen từ chối nhận Gambit Hậu.',
            'Mã b1 ra c3 (chữ N chỉ Mã), gây thêm áp lực lên d5.',
            'Mã g8 ra f6 bảo vệ d5. Chỉ một Mã đen đến được f6 nên ghi Nf6 là đủ, không cần thêm cột xuất phát.',
            '4.Bg5 – Tượng ghim Mã f6 vào Hậu d8.',
            '4…Nbd7 – Cả Mã b8 và Mã f6 đều có thể đến d7, nên phải ghi rõ “Mã ở cột b” → Nbd7.',
          ],
          caption: 'Ví dụ về ký hiệu phân biệt: Nbd7.',
        },
      },
    ],
    keyTakeaways: [
      'Bàn cờ có 64 ô; đặt bàn sao cho ô góc phải phía mình là ô trắng.',
      'Tên ô = chữ cột (a–h) + số hàng (1–8), nhìn từ phía Trắng.',
      'K = Vua, Q = Hậu, R = Xe, B = Tượng, N = Mã; Tốt không có chữ.',
      'x = ăn quân, + = chiếu, # = chiếu hết, O-O / O-O-O = nhập thành.',
      'Biết ghi nước đi giúp em học từ sách và xem lại ván của chính mình.',
    ],
  },

  // ───────────────────────── 2. Xe, Tượng, Hậu ─────────────────────────
  {
    id: 'nm-xe-tuong-hau',
    category: 'nhap-mon',
    title: 'Cách đi của quân (phần 1): Xe, Tượng và Hậu',
    subtitle: 'Ba quân “tầm xa” có thể quét qua cả bàn cờ',
    level: 1,
    icon: '♜',
    minutes: 10,
    intro: `Xe, Tượng và Hậu là những quân **tầm xa**: chúng có thể đi bao nhiêu ô tùy thích theo một hướng, miễn là đường đi không bị chặn. Hiểu rõ cách chúng di chuyển là nền tảng để em nhìn thấy đòn chiến thuật sau này.`,
    sections: [
      {
        heading: 'Xe: thẳng tiến theo hàng và cột',
        body: `**Xe** đi theo **đường thẳng**: dọc theo cột hoặc ngang theo hàng, bao nhiêu ô cũng được.

- Trên bàn cờ trống, Xe luôn kiểm soát **14 ô** dù đứng ở đâu.
- Xe **không thể nhảy qua** quân khác.
- Xe mạnh nhất khi đứng trên **cột mở** (cột không còn Tốt) hoặc ở **hàng 7** của đối phương.`,
        diagram: {
          fen: '7k/8/8/8/3R4/8/8/K7 w - - 0 1',
          arrows: ['d4d8', 'd4d1', 'd4a4', 'd4h4'],
          caption: 'Xe ở d4 kiểm soát toàn bộ cột d và hàng 4.',
        },
      },
      {
        heading: 'Xe ăn quân và bị chặn',
        body: `Mọi quân cờ (trừ Tốt) **ăn quân theo đúng cách nó đi**: Xe đi đến ô có quân đối phương thì quân đó bị loại khỏi bàn cờ.

Quân **cùng màu** chặn đường đi: Xe không thể đi đến hoặc vượt qua ô có quân của mình. Quân **khác màu** cũng chặn đường, nhưng Xe có thể ăn nó.`,
        diagram: {
          fen: '7k/8/8/1n1R2P1/8/8/8/K7 w - - 0 1',
          moves: 'Rxb5',
          notes: ['Xe đi ngang và ăn Mã đen ở b5. Ở hướng ngược lại, tốt trắng g5 chặn đường nên Xe chỉ đi được tới f5.'],
          arrows: ['d5b5:red'],
          highlights: ['b5:red', 'g5'],
          caption: 'Xe có thể ăn Mã b5 (quân đối phương) nhưng không thể vượt qua tốt g5 (quân mình).',
        },
      },
      {
        heading: 'Tượng: chuyên gia đường chéo',
        body: `**Tượng** đi theo **đường chéo**, bao nhiêu ô cũng được, không nhảy qua quân khác.

Vì luôn đi chéo nên Tượng **không bao giờ đổi màu ô**: Tượng ô trắng mãi mãi ở ô trắng, Tượng ô đen mãi mãi ở ô đen. Mỗi bên có một Tượng mỗi màu – khi giữ được cả hai (gọi là **cặp Tượng**), em kiểm soát được cả hai màu ô.

- Tượng ở trung tâm kiểm soát tới **13 ô**, nhưng ở góc chỉ còn **7 ô**.`,
        tip: 'Đừng để các Tốt của mình đứng chắn trước Tượng trên cùng màu ô – lúc đó Tượng sẽ trở thành “Tượng xấu”.',
        diagram: {
          fen: '7k/8/8/8/4B3/8/8/K7 w - - 0 1',
          arrows: ['e4h7', 'e4a8', 'e4h1', 'e4b1'],
          caption: 'Tượng ô trắng ở e4 quét bốn đường chéo, tổng cộng 13 ô.',
        },
      },
      {
        heading: 'Hậu: quân mạnh nhất bàn cờ',
        body: `**Hậu** kết hợp sức mạnh của **Xe và Tượng**: đi thẳng theo hàng, cột và cả đường chéo, bao nhiêu ô cũng được.

- Ở trung tâm, Hậu kiểm soát tới **27 ô**.
- Hậu có giá trị khoảng **9 điểm** – gần bằng cả hai Xe.
- Vì quá quý, Hậu dễ bị quân nhỏ của đối phương đuổi đánh nếu ra trận quá sớm.`,
        warning: 'Người mới chơi hay đưa Hậu ra rất sớm để “đi săn”. Đối thủ sẽ phát triển quân trong khi đuổi Hậu của em – em mất thời gian, còn họ thì có thêm quân trong trận.',
        diagram: {
          fen: '1k6/8/8/8/3Q4/8/7K/8 w - - 0 1',
          arrows: ['d4d8', 'd4d1', 'd4a4', 'd4h4', 'd4a7', 'd4a1', 'd4g1', 'd4h8'],
          caption: 'Hậu ở d4 tỏa sức mạnh theo 8 hướng.',
        },
      },
      {
        heading: 'So sánh nhanh ba quân tầm xa',
        body: `- **Xe**: 4 hướng thẳng – mạnh ở cột mở và tàn cuộc.
- **Tượng**: 4 hướng chéo – mạnh trên đường chéo dài, thích thế cờ mở.
- **Hậu**: 8 hướng – mạnh nhất, nhưng cần được bảo vệ khỏi những cuộc tấn công của quân nhỏ.

Một nguyên tắc vàng: quân tầm xa cần **đường mở**. Khi thế cờ đóng kín bởi nhiều Tốt, chúng yếu đi; khi các cột và đường chéo được mở ra, chúng trở thành những khẩu đại bác.`,
        tip: 'Trước mỗi nước đi, hãy “quét” mọi hàng, cột và đường chéo xuất phát từ Vua và Hậu của em – đó là những con đường đối thủ có thể dùng để tấn công.',
      },
    ],
    keyTakeaways: [
      'Xe đi thẳng (hàng, cột); Tượng đi chéo; Hậu đi cả hai kiểu.',
      'Quân tầm xa không nhảy qua quân khác và ăn quân theo đúng cách đi.',
      'Tượng không bao giờ đổi màu ô.',
      'Quân tầm xa mạnh nhất khi có cột mở và đường chéo thông thoáng.',
    ],
  },

  // ───────────────────────── 3. Mã, Vua, Tốt ─────────────────────────
  {
    id: 'nm-ma-vua-tot',
    category: 'nhap-mon',
    title: 'Cách đi của quân (phần 2): Mã, Vua và Tốt',
    subtitle: 'Quân nhảy, quân quan trọng nhất và “linh hồn của ván cờ”',
    level: 1,
    icon: '♞',
    minutes: 12,
    intro: `Phần này giới thiệu ba quân có cách đi đặc biệt: **Mã** nhảy hình chữ L, **Vua** đi từng bước một nhưng là mục tiêu của cả ván cờ, và **Tốt** – quân nhỏ bé nhưng được nhà vô địch Philidor gọi là “linh hồn của cờ vua”.`,
    sections: [
      {
        heading: 'Mã: bước nhảy hình chữ L',
        body: `**Mã** đi theo hình chữ **L**: hai ô theo một hướng thẳng rồi rẽ một ô sang ngang (hoặc ngược lại).

- Mỗi lần nhảy, Mã **luôn đổi màu ô**: từ ô trắng sang ô đen và ngược lại.
- Ở trung tâm, Mã kiểm soát **8 ô**; ở góc chỉ còn **2 ô**.
- Câu thành ngữ của các kiện tướng: **“Mã ở biên là Mã buồn”** – hãy đưa Mã về phía trung tâm.`,
        diagram: {
          fen: '7k/8/8/8/4N3/8/8/K7 w - - 0 1',
          highlights: ['d6:green', 'f6:green', 'c5:green', 'g5:green', 'c3:green', 'g3:green', 'd2:green', 'f2:green'],
          caption: 'Mã ở e4 kiểm soát 8 ô (tô xanh).',
        },
      },
      {
        heading: 'Mã là quân duy nhất nhảy qua quân khác',
        body: `Điều đặc biệt nhất của Mã: nó **nhảy qua** mọi quân cờ đứng giữa đường. Vì vậy ngay ở nước đầu tiên, Mã đã có thể ra trận dù bị các Tốt vây quanh.

Khả năng này khiến Mã trở thành “bậc thầy” của đòn **chĩa đôi** – tấn công hai quân cùng lúc mà quân bị tấn công không thể chặn lại.`,
        diagram: {
          moves: '1.Nf3 Nc6 2.Nc3 Nf6',
          notes: [
            '1.Nf3 – Mã g1 nhảy qua hàng Tốt đến f3.',
            '1…Nc6 – Mã đen cũng nhảy ra.',
            '2.Nc3 – Mã còn lại hướng về trung tâm.',
            '2…Nf6 – Cả bốn Mã đều đã ra trận chỉ sau 2 nước.',
          ],
          caption: 'Mã có thể ra quân ngay mà không cần đẩy Tốt.',
        },
      },
      {
        heading: 'Vua: chậm rãi nhưng quý giá nhất',
        body: `**Vua** đi **một ô** theo bất kỳ hướng nào (thẳng hoặc chéo).

Luật quan trọng nhất: **Vua không bao giờ được đi vào ô đang bị đối phương tấn công**, và không được ở lại trong tình trạng bị chiếu. Mất Vua là thua cả ván, nên Vua “vô giá”.

- Ở trung cuộc, Vua cần **trốn an toàn** sau hàng Tốt (thường bằng cách nhập thành).
- Ở tàn cuộc, khi ít quân, Vua trở thành **chiến binh mạnh mẽ** và phải tiến lên trung tâm.`,
        diagram: {
          fen: '7k/8/8/r7/4K3/8/8/8 w - - 0 1',
          arrows: ['a5h5:red'],
          highlights: ['d3:green', 'e3:green', 'f3:green', 'd4:green', 'f4:green', 'd5:red', 'e5:red', 'f5:red'],
          caption: 'Vua e4 có thể đi đến các ô xanh. Ba ô đỏ bị Xe đen ở a5 kiểm soát nên Vua không được bước vào.',
        },
      },
      {
        heading: 'Hai Vua không bao giờ đứng cạnh nhau',
        body: `Vì Vua không được bước vào ô bị tấn công, và mỗi Vua đều kiểm soát các ô xung quanh mình, nên **hai Vua luôn phải cách nhau ít nhất một ô**.

Điều này tạo nên khái niệm **đối Vua (opposition)** cực kỳ quan trọng trong tàn cuộc: khi hai Vua đối mặt cách nhau một ô, bên **không phải đi** thường là bên chiếm ưu thế. Em sẽ học kỹ ở phần Tàn cuộc.`,
        diagram: {
          fen: '8/8/8/3k4/8/3K4/8/8 w - - 0 1',
          highlights: ['c4:red', 'd4:red', 'e4:red'],
          caption: 'Vua trắng d3 không thể đi lên c4, d4, e4 vì những ô này kề với Vua đen.',
        },
      },
      {
        heading: 'Tốt: đi thẳng, ăn chéo',
        body: `**Tốt** là quân duy nhất **chỉ đi về phía trước** và **đi khác với cách ăn quân**:

- **Đi**: thẳng lên **1 ô**. Riêng nước đầu tiên của mỗi Tốt có thể đi **1 hoặc 2 ô**.
- **Ăn quân**: **chéo lên 1 ô** phía trước.
- Tốt **không đi lùi**, và bị chặn nếu có bất kỳ quân nào đứng ngay trước mặt.

Tốt có giá trị nhỏ nhất (1 điểm) nhưng là bộ khung của thế cờ: vị trí các Tốt quyết định quân nào mạnh, quân nào yếu, Vua an toàn hay nguy hiểm.`,
        diagram: {
          moves: '1.e4 e5 2.d4 exd4',
          notes: [
            '1.e4 – Nước đầu tiên nên Tốt được tiến 2 ô.',
            '1…e5 – Tốt đen cũng tiến 2 ô. Hai Tốt e4 và e5 chặn nhau, không ai đi thẳng tiếp được.',
            '2.d4 – Tốt d tiến 2 ô, tấn công Tốt e5 theo đường chéo.',
            '2…exd4 – Tốt đen ăn chéo sang d4.',
          ],
          caption: 'Tốt đi thẳng nhưng ăn chéo.',
        },
      },
      {
        heading: 'Tốt bị chặn và cơ hội ăn quân',
        body: `Khi một quân đứng ngay trước Tốt, Tốt **bị chặn** – kể cả khi đó là quân đối phương. Nhưng nếu quân đối phương đứng ở ô **chéo phía trước**, Tốt có thể ăn nó.

Tốt còn có hai “phép màu” đặc biệt: **bắt tốt qua đường** và **phong cấp** khi đến hàng cuối. Bài học tiếp theo sẽ giải thích chi tiết.`,
        diagram: {
          fen: '7k/8/8/3npb2/4P3/8/8/K7 w - - 0 1',
          arrows: ['e4d5:red', 'e4f5:red'],
          highlights: ['e5'],
          caption: 'Tốt e4 không đi thẳng được (bị Tốt e5 chặn) nhưng có thể ăn Mã d5 hoặc Tượng f5.',
        },
      },
    ],
    keyTakeaways: [
      'Mã đi hình chữ L, là quân duy nhất nhảy qua quân khác, và luôn đổi màu ô.',
      'Vua đi 1 ô mọi hướng, không bao giờ được bước vào ô bị tấn công.',
      'Hai Vua luôn cách nhau ít nhất một ô.',
      'Tốt đi thẳng, ăn chéo, không đi lùi; nước đầu có thể đi 2 ô.',
    ],
  },

  // ───────────────────────── 4. Luật đặc biệt ─────────────────────────
  {
    id: 'nm-luat-dac-biet',
    category: 'nhap-mon',
    title: 'Ba luật đặc biệt: nhập thành, bắt tốt qua đường, phong cấp',
    subtitle: 'Những nước đi “phép thuật” mà người mới hay bỏ sót',
    level: 1,
    icon: '🏰',
    minutes: 14,
    intro: `Ngoài cách đi thông thường, cờ vua có ba luật đặc biệt. Chúng không chỉ là “mẹo vặt” mà còn ảnh hưởng sâu sắc đến chiến lược: nhập thành giữ an toàn cho Vua, bắt tốt qua đường ngăn Tốt lẻn qua, còn phong cấp biến một chú Tốt nhỏ thành Hậu hùng mạnh.`,
    sections: [
      {
        heading: 'Nhập thành cánh Vua (O-O)',
        body: `**Nhập thành** là nước đi duy nhất cho phép di chuyển **hai quân cùng lúc**: Vua và Xe.

Khi nhập thành cánh Vua, **Vua đi 2 ô** về phía Xe h1 (từ e1 đến g1), sau đó **Xe nhảy qua Vua** đứng cạnh nó (từ h1 đến f1). Với bên Đen: Vua e8 → g8, Xe h8 → f8.

Nhập thành mang lại hai lợi ích lớn cùng lúc: **Vua trốn vào góc an toàn** sau hàng Tốt, và **Xe được đưa về trung tâm** để tham chiến.`,
        tip: 'Khi nhập thành trên bàn cờ thật, hãy cầm Vua đi trước rồi mới đến Xe. Nếu chạm Xe trước, theo luật thi đấu em có thể bị buộc phải đi Xe.',
        diagram: {
          moves: '1.e4 e5 2.Nf3 Nc6 3.Bc4 Bc5 4.O-O',
          notes: [
            'Trắng chiếm trung tâm và mở đường cho Tượng f1 – bước đầu dọn trống các ô giữa Vua và Xe h1.',
            'Đen đáp đối xứng, cũng mở lối cho Tượng f8 rời hàng cuối.',
            '2.Nf3 – Ra Mã, dọn đường giữa Vua và Xe.',
            'Đen phát triển Mã ra c6, bảo vệ tốt e5 – quân nhẹ đầu tiên của Đen rời hàng cuối.',
            '3.Bc4 – Ra Tượng. Giờ giữa Vua e1 và Xe h1 đã trống.',
            'Tượng ra c5, ô f8 đã trống; Đen chỉ còn phải đưa Mã g8 ra là cũng nhập thành được.',
            '4.O-O – Nhập thành! Vua sang g1, Xe sang f1. Vua đã an toàn, Xe sẵn sàng hoạt động.',
          ],
          caption: 'Ra quân nhanh để nhập thành sớm.',
        },
      },
      {
        heading: 'Nhập thành cánh Hậu (O-O-O)',
        body: `Nhập thành cánh Hậu tương tự nhưng về phía Xe a1: **Vua đi 2 ô** từ e1 đến **c1**, Xe từ a1 nhảy sang **d1**. Bên Đen: Vua e8 → c8, Xe a8 → d8.

Để nhập thành cánh Hậu, cần dọn trống **ba ô** b1, c1, d1. Bù lại, Xe được đặt ngay lên cột d trung tâm. Khi hai bên nhập thành **khác cánh**, ván cờ thường trở nên sắc bén: mỗi bên đẩy Tốt tấn công Vua của đối phương.`,
        diagram: {
          fen: 'r3k2r/pppq1ppp/2npbn2/4p3/4P3/2NPBN2/PPPQ1PPP/R3K2R w KQkq - 0 1',
          moves: 'O-O-O O-O-O',
          notes: ['Trắng nhập thành cánh Hậu: Vua e1 → c1, Xe a1 → d1.', 'Đen cũng nhập thành cánh Hậu: Vua e8 → c8, Xe a8 → d8.'],
          caption: 'Nhập thành dài đưa Xe ngay vào cột d.',
        },
      },
      {
        heading: 'Năm điều kiện để được nhập thành',
        body: `Em chỉ được nhập thành khi thỏa mãn **tất cả** các điều kiện sau:

- **Vua chưa từng di chuyển** trong ván (kể cả đi rồi quay về chỗ cũ).
- **Xe dùng để nhập thành chưa từng di chuyển**.
- **Không có quân nào** đứng giữa Vua và Xe.
- **Vua không đang bị chiếu** (không thể nhập thành để thoát chiếu).
- Vua **không đi qua** và **không đến** ô đang bị đối phương tấn công.

Lưu ý: Xe được phép bị tấn công hoặc đi qua ô bị tấn công (ví dụ ô b1 khi nhập thành cánh Hậu) – chỉ có Vua mới bị giới hạn.`,
        warning: 'Đi Vua sớm (chẳng hạn Ke2 để “bảo vệ” quân) sẽ khiến em mất quyền nhập thành vĩnh viễn. Hãy cân nhắc thật kỹ!',
        diagram: {
          fen: '4k3/8/8/8/2b5/8/8/4K2R w K - 0 1',
          arrows: ['c4f1:red'],
          highlights: ['f1:red', 'g1'],
          caption: 'Tượng đen c4 kiểm soát ô f1 – ô Vua phải đi qua – nên Trắng KHÔNG được nhập thành cánh Vua lúc này.',
        },
      },
      {
        heading: 'Bắt tốt qua đường (en passant)',
        body: `Đây là luật khó hiểu nhất với người mới, nhưng thực ra rất logic.

Khi một Tốt đi **2 ô** từ vị trí ban đầu và dừng **ngay cạnh** Tốt của đối phương, Tốt đối phương được quyền **ăn nó như thể nó chỉ đi 1 ô**. Tốt ăn sẽ đến ô mà Tốt kia vừa “vượt qua”.

- Chỉ áp dụng cho **Tốt ăn Tốt**.
- Tốt ăn phải đang đứng ở **hàng 5** (với Trắng) hoặc **hàng 4** (với Đen).
- Phải thực hiện **ngay nước kế tiếp**, nếu không sẽ mất quyền.

Luật này ra đời khi Tốt được phép đi 2 ô, để Tốt không thể “lẻn” qua mặt Tốt đối phương mà không bị trừng phạt.`,
        diagram: {
          moves: '1.e4 a6 2.e5 d5 3.exd6',
          notes: [
            'Trắng đẩy tốt e lên hai ô – bước đầu tiên để đưa tốt này tới hàng 5.',
            'Đen đi một nước chờ ở cánh Hậu, để tốt e trắng có thời gian tiến lên hàng 5 cho ví dụ.',
            '2.e5 – Tốt trắng đã tiến đến hàng 5.',
            '2…d5 – Tốt đen đi 2 ô, dừng ngay cạnh Tốt e5. Nó đã “vượt qua” ô d6 mà Tốt e5 đang kiểm soát.',
            '3.exd6 – Bắt tốt qua đường! Tốt trắng ăn chéo sang d6 và Tốt d5 bị loại khỏi bàn cờ. Trong ký hiệu đôi khi ghi thêm “e.p.”.',
          ],
          arrows: [],
          caption: 'Bấm ▶ để thấy Tốt d5 biến mất dù Tốt trắng đi đến ô d6.',
        },
      },
      {
        heading: 'Phong cấp: giấc mơ của mọi chú Tốt',
        body: `Khi một Tốt đi đến **hàng cuối cùng** (hàng 8 với Trắng, hàng 1 với Đen), nó **bắt buộc** được đổi thành **Hậu, Xe, Tượng hoặc Mã** cùng màu – tùy em chọn (không được giữ là Tốt hay biến thành Vua).

- Hầu như luôn chọn **Hậu** vì đó là quân mạnh nhất.
- Em có thể có **nhiều Hậu** cùng lúc (ví dụ 2 hoặc 3 Hậu).
- Ký hiệu: **b8=Q** nghĩa là Tốt đến b8 và phong thành Hậu.

Vì phong cấp quá mạnh, một Tốt không còn Tốt đối phương nào cản đường (gọi là **Tốt thông**) là vũ khí đáng sợ trong tàn cuộc.`,
        diagram: {
          fen: '8/1P6/8/8/8/8/k7/4K3 w - - 0 1',
          moves: 'b8=Q',
          notes: ['Tốt đến hàng 8 và trở thành Hậu! Từ một quân 1 điểm thành quân 9 điểm.'],
          arrows: ['b7b8'],
          caption: 'Tốt b7 chỉ còn một bước nữa là phong cấp.',
        },
      },
      {
        heading: 'Phong cấp dưới: khi Hậu không phải lựa chọn tốt nhất',
        body: `Đôi khi phong **Hậu** lại là sai lầm! Hai lý do thường gặp:

- Phong Hậu khiến đối thủ **hết nước đi hợp lệ** (hòa pat).
- Phong **Mã** cho phép **chiếu** hoặc **chĩa đôi** ngay lập tức – điều Hậu không làm được vì Mã đi theo hình chữ L.

Việc phong thành quân khác Hậu gọi là **phong cấp dưới**. Nó hiếm gặp nhưng là dấu hiệu của người chơi biết tính toán đến cùng.`,
        diagram: {
          fen: '8/5P1k/8/6K1/8/8/8/8 w - - 0 1',
          moves: 'f8=R Kg7 Ra8',
          notes: [
            'Phong Xe! Nếu phong Hậu (f8=Q), Vua đen ở h7 không bị chiếu nhưng không còn ô nào để đi – ván cờ HÒA. Với Xe, Vua đen vẫn còn ô g7. (Ở thế này Trắng cũng có thể đi Kf6 trước rồi mới phong Hậu và chiếu hết nhanh hơn – điều quan trọng là đừng phong Hậu ngay.)',
            'Vua đen buộc phải đi g7, tấn công Xe.',
            'Xe tránh đi và Trắng thắng dễ dàng với Vua + Xe chống Vua.',
          ],
          caption: 'Trắng đi. Phong Hậu chỉ hòa, phong Xe thì thắng!',
        },
      },
    ],
    keyTakeaways: [
      'Nhập thành: Vua đi 2 ô về phía Xe, Xe nhảy qua đứng cạnh Vua.',
      'Không nhập thành khi Vua/Xe đã đi, khi bị chiếu, hoặc khi Vua đi qua/đến ô bị tấn công.',
      'Bắt tốt qua đường chỉ dành cho Tốt ăn Tốt vừa đi 2 ô, và phải làm ngay nước sau.',
      'Tốt đến hàng cuối phải phong thành Hậu, Xe, Tượng hoặc Mã – thường là Hậu.',
      'Luôn kiểm tra xem phong Hậu có gây hòa pat không.',
    ],
  },

  // ───────────────────────── 5. Chiếu, chiếu hết, hòa ─────────────────────────
  {
    id: 'nm-chieu-het-va-hoa',
    category: 'nhap-mon',
    title: 'Chiếu, chiếu hết và các trường hợp hòa',
    subtitle: 'Ván cờ kết thúc như thế nào?',
    level: 1,
    icon: '🏁',
    minutes: 13,
    intro: `Mục tiêu của cờ vua không phải là ăn nhiều quân nhất, mà là **chiếu hết Vua đối phương**. Nhưng ván cờ cũng có thể kết thúc **hòa** theo nhiều cách – và một người chơi giỏi phải biết tận dụng luật hòa để cứu những thế cờ tưởng như đã thua.`,
    sections: [
      {
        heading: 'Chiếu và ba cách thoát chiếu',
        body: `Khi Vua bị một quân đối phương tấn công, ta nói Vua đang bị **chiếu**. Bên bị chiếu **bắt buộc** phải thoát chiếu ngay, bằng một trong ba cách:

- **Đi Vua** sang ô an toàn.
- **Chặn** đường chiếu bằng một quân khác (không chặn được chiếu của Mã hoặc Tốt).
- **Ăn** quân đang chiếu.

Nhớ thứ tự gợi ý khi tìm cách thoát chiếu: **Ăn – Chặn – Chạy**. Thường thì ăn quân chiếu là tốt nhất, chạy Vua là phương án cuối cùng vì có thể mất quyền nhập thành.`,
        diagram: {
          moves: '1.e4 e5 2.d4 Bb4+ 3.c3',
          notes: [
            'Trắng chiếm trung tâm, mở đường cho Hậu và Tượng f1.',
            'Đen đáp đối xứng, đồng thời mở đường chéo cho Tượng f8 – quân sắp chiếu Vua trắng.',
            'Trắng tấn công tốt e5, nhưng việc tốt d rời d2 mở ra đường chéo b4–e1 dẫn thẳng tới Vua.',
            '2…Bb4+ – Tượng đen chiếu Vua trắng theo đường chéo b4–e1.',
            '3.c3 – Trắng chặn chiếu bằng Tốt, đồng thời tấn công Tượng. Các cách khác: chặn bằng Nc3, Bd2, Nd2, Qd2 hoặc chạy Vua Ke2.',
          ],
          caption: 'Chặn chiếu bằng một quân rẻ và còn tấn công lại quân chiếu – một cách thoát chiếu lý tưởng.',
        },
      },
      {
        heading: 'Chiếu hết: chiến thắng tuyệt đối',
        body: `**Chiếu hết** xảy ra khi Vua bị chiếu và **không có cách nào thoát** – không chạy được, không chặn được, không ăn được quân chiếu. Ván cờ kết thúc ngay lập tức, bên chiếu hết thắng.

Thế chiếu hết dưới đây gọi là **chiếu hết hàng cuối** – một trong những đòn phổ biến nhất ở mọi trình độ. Chính các Tốt bảo vệ Vua lại trở thành nhà tù của nó!`,
        diagram: {
          fen: '6k1/5ppp/8/8/8/8/5PPP/3R2K1 w - - 0 1',
          moves: 'Rd8#',
          notes: ['Chiếu hết! Vua đen không thể chạy (ba Tốt f7, g7, h7 chặn lối), không có quân nào chặn hay ăn Xe d8.'],
          arrows: ['d1d8:red'],
          caption: 'Trắng đi và chiếu hết trong 1 nước.',
        },
      },
      {
        heading: 'Hòa do hết nước đi (hòa pat)',
        body: `Nếu đến lượt một bên mà **Vua không bị chiếu** nhưng **không còn nước đi hợp lệ nào**, ván cờ kết thúc **hòa**. Đây gọi là **hòa pat** (stalemate).

Hòa pat là “cái bẫy” khiến vô số người chơi đang thắng phải chia điểm. Khi em đang hơn rất nhiều quân, hãy luôn tự hỏi: **“Sau nước này, đối thủ còn nước đi nào không?”**`,
        warning: 'Khi chiếu hết bằng Hậu, đừng vội vàng! Nhiều ván thắng đã thành hòa chỉ vì Hậu đặt quá gần, nhốt Vua đối phương mà không chiếu.',
        diagram: {
          fen: '7k/5K2/8/8/6Q1/8/8/8 w - - 0 1',
          moves: 'Qg6',
          notes: ['Sai lầm! Vua đen ở h8 không bị chiếu nhưng không còn ô nào để đi (g8, g7, h7 đều bị kiểm soát) – HÒA PAT. Lẽ ra 1.Qg7# là chiếu hết ngay lập tức.'],
          arrows: ['g4g7', 'g4g6:red'],
          caption: 'Trắng đi. Qg7# thắng ngay, còn Qg6?? chỉ hòa.',
        },
      },
      {
        heading: 'Lặp lại ba lần và chiếu vĩnh viễn',
        body: `Nếu **cùng một thế cờ** (cùng vị trí quân, cùng bên đi, cùng quyền nhập thành) xuất hiện **ba lần**, người chơi có thể yêu cầu hòa.

Cách phổ biến nhất để tạo lặp lại là **chiếu vĩnh viễn**: một bên chiếu liên tục mà đối thủ không thể thoát khỏi chuỗi chiếu. Đây là “phao cứu sinh” cho bên đang kém quân.`,
        tip: 'Khi đang thua nặng về quân, hãy tìm xem Hậu của em có thể chiếu liên tục Vua đối phương hay không. Một ván thua có thể biến thành ván hòa!',
        diagram: {
          fen: '6k1/6p1/8/8/8/1rr5/4QPPP/6K1 w - - 0 1',
          moves: 'Qe8+ Kh7 Qh5+ Kg8 Qe8+ Kh7 Qh5+ Kg8 Qe8+',
          notes: [
            'Trắng kém hai Xe và còn bị dọa chiếu hết hàng cuối, nên tìm đường chiếu liên tục.',
            'Vua đen chỉ có thể trốn sang h7.',
            'Chiếu theo cột h, Vua buộc quay về g8.',
            'Vua đen buộc quay về g8: các ô g6, h6 và h8 đều nằm trong tầm kiểm soát của Hậu h5.',
            'Hậu quay lại e8 chiếu tiếp – thế cờ lặp lại lần thứ hai. Đen không có quân nào chặn được ở ô f8.',
            'Lại chỉ còn một ô trốn duy nhất là h7 – Đen không thể thoát khỏi vòng chiếu.',
            'Hậu tiếp tục đi con thoi giữa e8 và h5; dù hơn quân, Đen không có cách nào ngăn chuỗi chiếu.',
            'Vua đen trở về g8 – chỉ cần thêm một nước chiếu nữa là thế cờ lặp lại lần thứ ba.',
            'Thế cờ lặp lại lần thứ ba – HÒA bằng chiếu vĩnh viễn!',
          ],
          caption: 'Trắng đi và cứu ván bằng chiếu vĩnh viễn.',
        },
      },
      {
        heading: 'Luật 50 nước, không đủ quân và hòa thỏa thuận',
        body: `Ván cờ còn kết thúc hòa trong các trường hợp:

- **Luật 50 nước**: trong 50 nước liên tiếp của mỗi bên, không có Tốt nào di chuyển và không có quân nào bị ăn.
- **Không đủ quân chiếu hết**: chỉ còn Vua chống Vua, Vua + Tượng chống Vua, hoặc Vua + Mã chống Vua. Không thể chiếu hết dù đi thế nào.
- **Hòa thỏa thuận**: hai người chơi đồng ý hòa.

Lưu ý: Vua + hai Mã chống Vua cũng gần như không thể thắng (trừ khi bên kia mắc lỗi), còn Vua + Tượng + Mã chống Vua thì thắng được nhưng rất khó.`,
        diagram: {
          fen: '8/8/4k3/8/8/2KN4/8/8 w - - 0 1',
          highlights: ['d3:yellow'],
          caption: 'Vua + Mã chống Vua: không đủ lực lượng để chiếu hết – ván cờ hòa ngay lập tức.',
        },
      },
    ],
    keyTakeaways: [
      'Thoát chiếu bằng: ăn quân chiếu, chặn đường chiếu hoặc chạy Vua.',
      'Chiếu hết = bị chiếu và không có cách thoát → thua.',
      'Hòa pat: không bị chiếu nhưng hết nước đi hợp lệ.',
      'Hòa khi lặp lại ba lần, luật 50 nước, không đủ quân hoặc thỏa thuận.',
      'Bên đang thua hãy tìm chiếu vĩnh viễn; bên đang thắng hãy cảnh giác hòa pat.',
    ],
  },

  // ───────────────────────── 6. Giá trị quân cờ ─────────────────────────
  {
    id: 'nm-gia-tri-quan-co',
    category: 'nhap-mon',
    title: 'Giá trị quân cờ và nghệ thuật trao đổi',
    subtitle: 'Biết “đếm điểm” để không bao giờ đổi quân thiệt',
    level: 2,
    icon: '⚖️',
    minutes: 14,
    intro: `Mỗi quân cờ có một sức mạnh khác nhau. Các kiện tướng dùng một bảng điểm đơn giản để quyết định khi nào nên đổi quân, khi nào không. Thuộc lòng bảng này và biết **đếm số quân tấn công – phòng thủ** sẽ giúp em tránh được phần lớn những sai lầm mất quân.`,
    sections: [
      {
        heading: 'Bảng giá trị quân cờ',
        body: `Giá trị tương đối được dùng phổ biến nhất:

- **Tốt = 1 điểm**
- **Mã = 3 điểm**
- **Tượng = 3 điểm** (nhỉnh hơn Mã một chút, nhất là khi có cặp Tượng)
- **Xe = 5 điểm**
- **Hậu = 9 điểm**
- **Vua = vô giá** (mất Vua là thua)

Từ bảng này: Mã hoặc Tượng đổi lấy 3 Tốt là ngang nhau; **Xe đổi lấy Mã/Tượng là thiệt 2 điểm** (gọi là **mất chất lượng**); hai Xe (10 điểm) nhỉnh hơn Hậu (9 điểm).`,
        tip: 'Tổng giá trị quân của mỗi bên lúc đầu ván (không tính Vua) là 39 điểm. Hãy tập đếm tổng điểm hai bên sau mỗi lần đổi quân.',
        diagram: {
          highlights: ['a2:green', 'b1:blue', 'c1:blue', 'a1:yellow', 'd1:red'],
          caption: 'Tốt 1 • Mã 3 • Tượng 3 • Xe 5 • Hậu 9.',
        },
      },
      {
        heading: 'Trao đổi ngang giá',
        body: `Một cuộc **trao đổi** là khi hai bên lần lượt ăn quân của nhau. Đổi Tượng lấy Mã (3 lấy 3) là **ngang giá**.

Nhưng đừng chỉ đếm điểm! Sau trao đổi, hãy xem ai có **vị trí tốt hơn**. Trong ví dụ dưới đây, Trắng ăn Mã c6 rồi tưởng ăn được thêm Tốt e5 – nhưng Hậu đen lấy lại Tốt ngay nhờ đòn tấn công hai mục tiêu.`,
        diagram: {
          moves: '1.e4 e5 2.Nf3 Nc6 3.Bb5 a6 4.Bxc6 dxc6 5.Nxe5 Qd4 6.Nf3 Qxe4+',
          notes: [
            'Trắng chiếm trung tâm bằng tốt e4 – chính tốt này lát nữa sẽ trở thành mục tiêu của Hậu đen.',
            'Đen đáp đối xứng, giữ phần trung tâm và mở đường cho Tượng f8.',
            'Mã ra f3 tấn công tốt e5 – phát triển quân kèm theo đe dọa.',
            'Mã c6 bảo vệ tốt e5 và đưa thêm một quân vào trận.',
            'Khai cuộc Tây Ban Nha: Tượng nhắm vào Mã c6 – quân đang giữ tốt e5.',
            'Đen hỏi thẳng Tượng b5: lui về hay đổi lấy Mã c6?',
            '4.Bxc6 – Tượng (3) ăn Mã (3).',
            '4…dxc6 – Tốt ăn lại: trao đổi ngang giá. Cột d của Đen được mở cho Hậu.',
            '5.Nxe5 – Trắng ăn thêm Tốt e5, tưởng như lời 1 điểm…',
            '5…Qd4! – Hậu đen tấn công cùng lúc Mã e5 và Tốt e4.',
            '6.Nf3 – Mã lui về bảo vệ…',
            '6…Qxe4+ – Đen lấy lại Tốt kèm theo chiếu. Vật chất cân bằng trở lại.',
          ],
          caption: 'Khai cuộc Tây Ban Nha, phương án đổi quân.',
        },
      },
      {
        heading: 'Đếm số quân tấn công và phòng thủ',
        body: `Trước khi ăn một quân, hãy **đếm**: có bao nhiêu quân của em đang tấn công ô đó, và bao nhiêu quân của đối phương đang bảo vệ?

- Nếu **số quân tấn công > số quân phòng thủ**, thường em có thể ăn được.
- Luôn bắt đầu ăn bằng **quân rẻ nhất** trước.
- Một quân **không được bảo vệ** gọi là **quân treo** – mục tiêu số một của mọi đòn chiến thuật.

Ở thế cờ dưới đây, Hậu trắng tấn công cùng lúc Tốt b7 (không được bảo vệ) và Tốt d5 (bị tấn công 2 lần bởi c4 và Hậu, chỉ được Hậu d8 bảo vệ 1 lần).`,
        diagram: {
          moves: '1.d4 d5 2.c4 Bf5 3.Qb3',
          notes: [
            'Trắng chiếm trung tâm bằng tốt d4, mở đường cho Tượng c1.',
            'Đen đáp đối xứng; tốt d5 lúc này được Hậu d8 bảo vệ.',
            'Tốt c4 tấn công tốt d5 – quân tấn công thứ nhất nhắm vào ô này.',
            '2…Bf5 – Tượng ra sớm, rời khỏi vị trí bảo vệ Tốt b7.',
            '3.Qb3! – Tấn công kép vào b7 và d5. Đen phải tính toán thật kỹ.',
          ],
          arrows: ['b3b7:red', 'b3d5:red', 'c4d5:red', 'd8d5:green'],
          highlights: ['b7:red', 'd5:red'],
          caption: 'Đếm: d5 bị tấn công 2 lần, chỉ được bảo vệ 1 lần; b7 hoàn toàn không được bảo vệ.',
        },
      },
      {
        heading: 'Khi đang hơn quân: hãy đổi quân!',
        body: `Một nguyên tắc vàng của các kiện tướng: **Khi hơn quân, hãy đổi quân (không đổi Tốt). Khi kém quân, hãy tránh đổi quân.**

Lý do: hơn một Mã khi mỗi bên còn rất nhiều quân thì lợi thế chưa rõ ràng. Nhưng nếu đổi hết các quân khác, chỉ còn Mã + Tốt chống lại vài Tốt – chiến thắng trở nên đơn giản.

Ngược lại, bên kém quân nên giữ nhiều quân trên bàn để tạo cơ hội phản công và gây rối.`,
        diagram: {
          fen: '3r2k1/5pp1/7p/8/8/5N2/5PPP/3R2K1 w - - 0 1',
          moves: 'Rxd8+ Kh7',
          notes: ['Trắng hơn một Mã nên chủ động đổi Xe.', 'Chỉ còn Mã và Tốt chống Tốt – Trắng sẽ đưa Vua lên và thắng dễ dàng.'],
          caption: 'Đổi Xe giúp đơn giản hóa thế cờ khi đang hơn quân.',
        },
      },
      {
        heading: 'Những ngoại lệ quan trọng',
        body: `Bảng điểm chỉ là kim chỉ nam, không phải luật tuyệt đối. Các kiện tướng luôn xét thêm:

- **Hoạt động của quân**: một Mã ở ô mạnh trung tâm có thể giá trị hơn một Xe bị nhốt.
- **Cặp Tượng** trong thế cờ mở thường đáng giá khoảng **6,5 điểm**.
- **Tốt thông đã tiến xa** (hàng 6, hàng 7) có thể đáng giá như một quân nhẹ.
- **An toàn của Vua**: thí một quân để mở toang Vua đối phương thường rất đáng.
- **Thời gian (nhịp đi)**: ăn một Tốt mà để đối thủ phát triển thêm 3 quân là cái giá đắt.`,
        tip: 'Khi phân vân giữa “ăn quân” và “phát triển/tấn công”, hãy hỏi: nếu mình ăn, đối thủ được bao nhiêu nước miễn phí?',
      },
    ],
    keyTakeaways: [
      'Tốt 1, Mã 3, Tượng 3, Xe 5, Hậu 9.',
      'Đếm số quân tấn công và phòng thủ trước khi ăn; ăn bằng quân rẻ trước.',
      'Hơn quân → đổi quân; kém quân → tránh đổi.',
      'Vị trí, hoạt động quân và an toàn Vua có thể quan trọng hơn điểm số.',
    ],
  },

  // ───────────────────────── 7. Nguyên tắc khai cuộc ─────────────────────────
  {
    id: 'nm-nguyen-tac-khai-cuoc',
    category: 'nhap-mon',
    title: 'Những nguyên tắc vàng của khai cuộc',
    subtitle: 'Mười nước đầu tiên quyết định nửa ván cờ',
    level: 2,
    icon: '🚀',
    minutes: 16,
    intro: `Khai cuộc là giai đoạn **đưa quân ra trận**. Em không cần thuộc hàng nghìn biến thể để chơi tốt khai cuộc – chỉ cần hiểu và làm theo vài nguyên tắc mà mọi Đại kiện tướng đều tuân thủ: **chiếm trung tâm, phát triển quân, bảo vệ Vua**.`,
    sections: [
      {
        heading: 'Nguyên tắc 1: Chiếm và kiểm soát trung tâm',
        body: `Bốn ô trung tâm **d4, e4, d5, e5** là “đỉnh đồi” của bàn cờ. Quân đứng ở trung tâm có tầm hoạt động rộng nhất và có thể nhanh chóng chuyển sang bất cứ cánh nào.

- Nước đi đầu tiên tốt nhất thường là **1.e4** hoặc **1.d4**: vừa chiếm trung tâm, vừa mở đường cho Hậu và Tượng.
- Kiểm soát trung tâm không nhất thiết phải đặt Tốt lên đó – Mã ở f3, c3 cũng “nhìn” vào trung tâm.`,
        diagram: {
          moves: '1.e4 e5 2.Nf3 Nc6 3.d4',
          notes: [
            '1.e4 – Chiếm ô e4, mở đường cho Hậu và Tượng f1.',
            '1…e5 – Đen cũng tranh giành trung tâm.',
            '2.Nf3 – Phát triển Mã, tấn công e5.',
            '2…Nc6 – Phát triển Mã, bảo vệ e5.',
            '3.d4 – Trắng tấn công trung tâm thêm một lần nữa (khai cuộc Scotch).',
          ],
          highlights: ['d4:green', 'e4:green', 'd5:green', 'e5:green'],
          caption: 'Cả hai bên tranh giành bốn ô trung tâm ngay từ những nước đầu.',
        },
      },
      {
        heading: 'Nguyên tắc 2: Phát triển Mã và Tượng nhanh chóng',
        body: `**Phát triển** nghĩa là đưa quân từ hàng cuối ra vị trí hoạt động. Thứ tự thường gặp:

- **Mã trước Tượng**: vị trí tốt nhất của Mã (f3, c3) gần như luôn rõ ràng, còn Tượng cần chờ xem Tốt đứng đâu.
- Đưa Mã về phía trung tâm, tránh để ở biên (a3, h3).
- Tượng nhắm vào trung tâm hoặc điểm yếu như **f7/f2** (chỉ được Vua bảo vệ lúc đầu ván).
- Mục tiêu: phát triển **tất cả quân nhẹ** trong khoảng 6–8 nước đầu.`,
        diagram: {
          moves: '1.e4 e5 2.Nf3 Nc6 3.Bc4 Bc5',
          notes: [
            'Tốt e4 chiếm trung tâm và mở cửa cho Hậu cùng Tượng f1 – nước đầu tiên đã chuẩn bị cho việc phát triển quân.',
            'Đen đáp đối xứng: giành trung tâm và mở đường cho Tượng f8 ra trận.',
            '2.Nf3 – Mã ra trước, tấn công e5.',
            '2…Nc6 – Mã đen bảo vệ e5.',
            '3.Bc4 – Tượng nhắm thẳng vào điểm yếu f7.',
            '3…Bc5 – Đen làm tương tự với f2. Đây là khai cuộc Ý (Giuoco Piano) cổ điển.',
          ],
          arrows: ['c4f7:yellow', 'c5f2:yellow'],
          caption: 'Hai Tượng cùng nhắm vào điểm yếu nhất của đối phương: f7 và f2.',
        },
      },
      {
        heading: 'Nguyên tắc 3: Đừng đưa Hậu ra quá sớm',
        body: `Hậu là quân quý nhất. Nếu ra trận quá sớm, Hậu sẽ bị các quân nhẹ của đối phương **tấn công kèm theo phát triển** – mỗi lần Hậu phải chạy, đối thủ được thêm một nước phát triển miễn phí. Các kiện tướng gọi đó là **được nhịp (tempo)**.

Trong ví dụ, Đen ăn lại Tốt bằng Hậu ở nước 2 (khai cuộc Scandinavia). Trắng lập tức đuổi Hậu bằng Nc3 – vừa phát triển vừa giành nhịp.`,
        diagram: {
          moves: '1.e4 d5 2.exd5 Qxd5 3.Nc3 Qa5 4.d4 Nf6 5.Nf3',
          notes: [
            'Trắng chiếm trung tâm bằng tốt e4, mở đường cho Hậu và Tượng f1.',
            'Phòng thủ Scandinavia: Đen thách thức ngay tốt e4.',
            'Trắng ăn tốt – giờ Đen phải lấy lại, và cách nhanh nhất là dùng Hậu.',
            '2…Qxd5 – Hậu đen ra trận rất sớm.',
            '3.Nc3! – Phát triển Mã và tấn công Hậu cùng lúc: Trắng được nhịp.',
            '3…Qa5 – Hậu phải chạy lần nữa.',
            '4.d4 – Trắng chiếm trung tâm.',
            'Đen phát triển Mã, cố bắt kịp – nhưng Trắng đã được thêm nhịp nhờ đuổi Hậu.',
            '5.Nf3 – Trắng đã có 2 quân phát triển cùng trung tâm vững chắc. Đen vẫn chơi được nhưng phải hết sức cẩn thận.',
          ],
          caption: 'Hậu ra sớm thường bị đuổi đánh, giúp đối thủ phát triển nhanh hơn.',
        },
      },
      {
        heading: 'Nguyên tắc 4: Nhập thành sớm',
        body: `Vua ở trung tâm (e1, e8) rất nguy hiểm khi các cột trung tâm bị mở ra. Hãy **nhập thành trong khoảng 10 nước đầu**:

- Vua được che chắn sau hàng Tốt f, g, h.
- Xe được đưa về trung tâm, sẵn sàng chiếm cột mở.
- Sau khi nhập thành, **hạn chế đẩy các Tốt trước Vua** vì chúng là lá chắn.`,
        diagram: {
          moves: '1.e4 e5 2.Nf3 Nc6 3.Bc4 Bc5 4.O-O Nf6 5.d3 O-O',
          notes: [
            'Trắng chiếm trung tâm và mở đường cho Tượng f1 – quân cần rời hàng cuối trước khi nhập thành.',
            'Đen đáp đối xứng, cũng mở lối cho Tượng f8 – bước đầu chuẩn bị nhập thành của Đen.',
            'Mã ra f3 tấn công e5 và dọn trống ô g1 – thêm một bước tới nhập thành.',
            'Đen bảo vệ tốt e5 bằng một nước phát triển tự nhiên.',
            'Tượng rời f1 – giữa Vua e1 và Xe h1 đã trống, Trắng sẵn sàng nhập thành.',
            'Tượng c5 nhắm vào f2; Đen chỉ còn thiếu Mã g8 là cũng nhập thành được.',
            '4.O-O – Trắng nhập thành ngay khi có thể.',
            'Mã g8 ra f6 tấn công tốt e4 và dọn trống cánh Vua để Đen nhập thành.',
            '5.d3 – Mở đường cho Tượng c1.',
            '5…O-O – Cả hai Vua đã an toàn.',
          ],
          caption: 'Phát triển quân rồi nhập thành – một khai cuộc mẫu mực.',
        },
      },
      {
        heading: 'Nguyên tắc 5: Đừng làm yếu Vua và đừng tham ăn',
        body: `Đẩy Tốt f (Tốt che chắn Vua) quá sớm là sai lầm kinh điển, vì nó mở đường chéo e8–h5 cho Hậu đối phương. Ví dụ nổi tiếng là **phòng thủ Damiano** – Đen bảo vệ Tốt e5 bằng 2…f6? và bị trừng phạt ngay.

Tương tự, đừng mải ăn Tốt (đặc biệt bằng Hậu) trong khi quân của mình chưa phát triển.`,
        warning: 'Sau 2…f6?, Trắng thí Mã 3.Nxe5! và nếu Đen ăn lại 3…fxe5? thì 4.Qh5+ tạo đòn tấn công hủy diệt.',
        diagram: {
          moves: '1.e4 e5 2.Nf3 f6 3.Nxe5 fxe5 4.Qh5+ g6 5.Qxe5+ Qe7 6.Qxh8',
          notes: [
            'Trắng chiếm trung tâm và mở đường chéo d1–h5 cho Hậu – đường chéo sẽ quyết định ván cờ.',
            'Đen đáp đối xứng, giành phần trung tâm; lá chắn tốt f7, g7, h7 trước Vua vẫn còn nguyên vẹn.',
            'Mã ra f3 tấn công tốt e5 – Đen cần tìm một cách bảo vệ hợp lý.',
            '2…f6? – Bảo vệ e5 bằng Tốt f là sai lầm: Vua đen bị phơi ra.',
            '3.Nxe5! – Thí Mã!',
            '3…fxe5? – Ăn Mã là chết người.',
            '4.Qh5+ – Hậu chiếu theo đường chéo vừa được mở.',
            '4…g6 – Chặn chiếu…',
            '5.Qxe5+ – …và Hậu chĩa đôi: chiếu Vua e8 đồng thời tấn công Xe h8.',
            '5…Qe7 – Đen chặn chiếu.',
            '6.Qxh8 – Trắng ăn Xe, hơn hẳn về vật chất.',
          ],
          caption: 'Phòng thủ Damiano: bài học về việc làm yếu Vua.',
        },
      },
      {
        heading: 'Nguyên tắc 6: Không đi một quân nhiều lần',
        body: `Trong khai cuộc, mỗi nước đi nên đưa **một quân mới** vào trận. Đi đi lại lại một quân (nhất là Hậu) khiến em bị tụt lại phía sau về phát triển.

Ngoại lệ hợp lý: khi quân bị tấn công, khi ăn được quân có lợi, hoặc khi có đòn chiến thuật rõ ràng.

Ví dụ dưới đây: Hậu trắng đi tới **ba lần** để tìm cách chiếu hết nhanh, trong khi Đen bình tĩnh phát triển – và đến nước 5 chính Đen mới là bên tấn công.`,
        diagram: {
          moves: '1.e4 e5 2.Qh5 Nc6 3.Bc4 g6 4.Qf3 Nf6 5.Qb3 Nd4',
          notes: [
            'Trắng chiếm trung tâm, mở đường cho Hậu và Tượng f1.',
            'Đen đáp đối xứng. Tốt e5 lúc này chưa có quân nào bảo vệ.',
            '2.Qh5 – Hậu ra sớm, đe dọa e5 và f7.',
            '2…Nc6 – Phát triển và bảo vệ e5.',
            '3.Bc4 – Đe dọa Qxf7#.',
            '3…g6 – Đuổi Hậu.',
            '4.Qf3 – Hậu đi lần 2, lại dọa f7.',
            '4…Nf6 – Phát triển và chặn đường.',
            '5.Qb3 – Hậu đi lần 3…',
            '5…Nd4! – Đen phát triển với nhịp: tấn công Hậu và đe dọa Nxc2+. Đen đã giành thế chủ động.',
          ],
          caption: 'Đi Hậu nhiều lần = tặng nhịp cho đối thủ.',
        },
      },
      {
        heading: 'Nguyên tắc 7: Nối Xe và lập kế hoạch',
        body: `Khai cuộc được coi là **hoàn thành** khi: các quân nhẹ đã ra, Vua đã nhập thành, Hậu rời hàng cuối để **hai Xe “nhìn thấy” nhau** (gọi là **nối Xe**).

Lúc này hãy đặt Xe vào **cột mở hoặc nửa mở**, và bắt đầu suy nghĩ về **kế hoạch trung cuộc**: tấn công cánh nào? Điểm yếu nào của đối thủ? Quân nào của mình đang kém nhất?

Danh sách kiểm tra khai cuộc:
- Đã có Tốt hoặc quân kiểm soát trung tâm chưa?
- Đã phát triển cả 4 quân nhẹ chưa?
- Vua đã an toàn chưa?
- Hai Xe đã nối với nhau chưa?`,
        diagram: {
          moves: '1.e4 e5 2.Nf3 Nc6 3.Bc4 Bc5 4.c3 Nf6 5.d3 d6 6.O-O O-O 7.Re1 a6 8.Bb3 Ba7 9.Nbd2 Be6 10.Nf1',
          notes: [
            'Trắng mở đầu cổ điển: chiếm trung tâm bằng tốt e4.',
            'Đen đáp lại đối xứng, tranh giành trung tâm và mở đường cho Tượng f8.',
            'Mã ra trước, hướng vào trung tâm và tấn công tốt e5.',
            'Đen bảo vệ e5 bằng một nước phát triển – đúng nguyên tắc.',
            'Tượng ra c4 nhắm vào f7 – quân nhẹ thứ hai của Trắng đã vào trận.',
            'Đen làm tương tự, Tượng c5 nhắm vào f2: khai cuộc Ý.',
            'Tốt c3 lấy ô d4 và b4 khỏi quân Đen, chuẩn bị đẩy d4 khi thời cơ đến.',
            'Đen phát triển Mã ra f6 và tấn công tốt e4 – quân nhẹ thứ ba của Đen vào trận.',
            'Trắng chọn lối chơi chậm: tốt d3 giữ vững e4 và mở đường cho Tượng c1.',
            'Đen đáp lại tương tự: tốt d6 củng cố e5 và mở đường cho Tượng c8.',
            'Trắng nhập thành – Vua vào nơi an toàn, Xe f1 sẵn sàng tham chiến.',
            '6…O-O – Cả hai Vua đã an toàn.',
            '7.Re1 – Xe về cột e, nơi có thể sẽ được mở.',
            'Đen dọn ô a7 làm chỗ lui cho Tượng c5 và lấy đi ô b5 của quân Trắng.',
            'Tượng lui về b3 trước khi bị …b5 hay …Na5 đuổi, mà vẫn giữ đường chéo nhắm f7.',
            'Đen làm tương tự: Tượng lui về a7, vẫn nhắm vào f2 và tránh bị tốt d đuổi đánh về sau.',
            'Mã b1 phát triển qua d2 vì ô c3 đã có tốt – bước đầu của hành trình d2–f1–g3.',
            '9…Be6 – Đen phát triển xong quân nhẹ.',
            '10.Nf1 – Mã chuyển hướng sang g3, chuẩn bị cho trung cuộc. Một khai cuộc mẫu mực của cả hai bên.',
          ],
          arrows: ['f1g3:blue'],
          caption: 'Khai cuộc Ý chậm (Giuoco Pianissimo): mọi nguyên tắc đều được tuân thủ.',
        },
      },
    ],
    keyTakeaways: [
      'Chiếm trung tâm bằng Tốt và quân (e4, d4, Nf3, Nc3).',
      'Phát triển Mã và Tượng nhanh, hướng về trung tâm.',
      'Đừng đưa Hậu ra sớm; đừng đi một quân nhiều lần.',
      'Nhập thành trong khoảng 10 nước đầu, hạn chế đẩy Tốt trước Vua.',
      'Nối Xe, đặt Xe vào cột mở, rồi lập kế hoạch trung cuộc.',
    ],
  },

  // ───────────────────────── 8. Chiếu hết cơ bản ─────────────────────────
  {
    id: 'nm-chieu-het-co-ban',
    category: 'nhap-mon',
    title: 'Các thế chiếu hết căn bản',
    subtitle: 'Từ chiếu hết 2 nước đến kỹ thuật chiếu hết bằng Hậu và Xe',
    level: 2,
    icon: '♚',
    minutes: 18,
    intro: `Biết cách chiếu hết là kỹ năng sống còn: em có thể đang hơn rất nhiều quân nhưng nếu không biết kết thúc, ván cờ vẫn có thể hòa. Bài này giới thiệu những bẫy chiếu hết nhanh mà người mới hay gặp (và cách phòng tránh), cùng kỹ thuật chiếu hết bằng Hậu và Xe mà mọi kỳ thủ phải thành thạo.`,
    sections: [
      {
        heading: 'Chiếu hết “kẻ ngốc” – nhanh nhất có thể',
        body: `Đây là thế chiếu hết nhanh nhất trong cờ vua: chỉ **2 nước**. Trắng đẩy hai Tốt f và g – làm mở toang đường chéo e1–h4 dẫn đến Vua – và Hậu đen chiếu hết ngay.

Bài học: **đừng đẩy Tốt f và g một cách vô cớ** trong khai cuộc, chúng là lá chắn của Vua.`,
        diagram: {
          moves: '1.f3 e5 2.g4 Qh4#',
          notes: [
            '1.f3? – Nước đi yếu: không phát triển, lại làm yếu Vua.',
            'Đen chiếm trung tâm – và nước này mở luôn đường chéo d8–h4 cho Hậu đen.',
            '2.g4?? – Mở toang đường chéo h4–e1.',
            '2…Qh4# – Chiếu hết! Vua trắng không có ô chạy, không quân nào chặn được.',
          ],
          caption: 'Chiếu hết kẻ ngốc (Fool’s mate).',
        },
      },
      {
        heading: 'Chiếu hết “học trò” – nhắm vào điểm f7',
        body: `Ô **f7** (và f2 với Trắng) là điểm yếu nhất lúc đầu ván vì **chỉ có Vua bảo vệ**. Chiếu hết học trò (Scholar’s mate) dùng **Hậu + Tượng** cùng tấn công f7.

Thế cờ này rất hay gặp trong các ván của người mới học. Em cần biết nó để **phòng thủ**, chứ không nên dựa vào nó để thắng – vì trước đối thủ biết cách phòng ngự, Hậu ra sớm sẽ bị đuổi đánh.`,
        diagram: {
          moves: '1.e4 e5 2.Bc4 Nc6 3.Qh5 Nf6 4.Qxf7#',
          notes: [
            'Trắng chiếm trung tâm, mở đường cho cả Hậu lẫn Tượng f1 – hai quân sẽ cùng nhắm vào f7.',
            'Đen đáp đối xứng, giành phần trung tâm – nhưng ô f7 vẫn chỉ có Vua bảo vệ.',
            '2.Bc4 – Tượng nhắm vào f7.',
            'Đen phát triển Mã, bảo vệ tốt e5 – hợp lý, nhưng chưa để ý tới điểm yếu f7.',
            '3.Qh5 – Hậu cũng nhắm vào f7: đe dọa Qxf7#.',
            '3…Nf6?? – Đen tấn công Hậu nhưng không ngăn được mối đe dọa.',
            '4.Qxf7# – Chiếu hết! Hậu được Tượng c4 bảo vệ nên Vua không thể ăn.',
          ],
          arrows: ['c4f7:red', 'h5f7:red'],
          caption: 'Chiếu hết học trò.',
        },
      },
      {
        heading: 'Cách phòng thủ chiếu hết học trò',
        body: `Khi Hậu và Tượng đối phương cùng nhắm vào f7, hãy **chặn đường hoặc bảo vệ f7** trước, rồi mới phản công:

- Đẩy **g6** để đuổi Hậu khỏi h5.
- Đặt **Mã f6** để chặn đường của Hậu trên cột f.
- Hoặc dùng **Hậu e7** để bảo vệ f7.

Sau khi phòng thủ thành công, Đen thường **phát triển nhanh hơn** vì Hậu trắng đã mất thời gian.`,
        diagram: {
          moves: '1.e4 e5 2.Bc4 Nc6 3.Qh5 g6 4.Qf3 Nf6',
          notes: [
            'Trắng mở đầu bằng tốt e4, mở đường cho Hậu và Tượng f1.',
            'Đen giữ cân bằng ở trung tâm với tốt e5, mở đường cho Hậu và Tượng f8.',
            'Tượng ra c4, chĩa thẳng vào điểm yếu f7 – dấu hiệu đầu tiên của chiếu hết học trò.',
            'Đen phát triển Mã, giữ tốt e5. Lúc này f7 mới bị một quân nhắm vào nên chưa có gì nguy hiểm.',
            '3.Qh5 – Đe dọa Qxf7#.',
            '3…g6! – Đuổi Hậu, ngăn đường chéo h5–f7.',
            '4.Qf3 – Hậu lại dọa f7 từ hướng khác.',
            '4…Nf6! – Mã chặn cột f. Đen đã an toàn và phát triển tốt.',
          ],
          caption: 'Phòng thủ đúng cách và tranh thủ phát triển quân.',
        },
      },
      {
        heading: 'Chiếu hết hàng cuối',
        body: `Khi Vua đã nhập thành và **ba Tốt trước mặt chưa di chuyển**, Vua có thể bị chiếu hết bởi Xe hoặc Hậu trên hàng cuối.

Phòng ngừa đơn giản: tạo một **“lỗ thở”** cho Vua bằng cách đẩy Tốt h (h3/h6) hoặc g (g3/g6) vào thời điểm thích hợp, hoặc luôn giữ một quân bảo vệ hàng cuối.`,
        diagram: {
          fen: '6k1/5ppp/8/8/8/8/5PPP/3R2K1 w - - 0 1',
          moves: 'Rd8#',
          notes: ['Vua đen bị chính các Tốt của mình nhốt lại. Chiếu hết!'],
          caption: 'Trắng đi và chiếu hết.',
        },
      },
      {
        heading: 'Vua + Hậu chiếu hết Vua',
        body: `Đây là kỹ thuật chiếu hết đầu tiên em phải thuộc. Ý tưởng:

- Dùng Hậu **thu hẹp “chiếc hộp”** chứa Vua đối phương, đẩy nó dần ra **mép bàn cờ**. Hậu thường đứng cách Vua đối phương một **nước Mã**.
- Khi Vua đối phương đã ở mép, đưa **Vua mình lại gần** để hỗ trợ.
- Chiếu hết bằng Hậu được Vua bảo vệ, hoặc Hậu chiếu dọc mép khi hai Vua đối mặt.

Luôn kiểm tra **hòa pat** trước mỗi nước Hậu!`,
        diagram: {
          fen: '7k/8/5K2/8/8/8/8/1Q6 w - - 0 1',
          moves: 'Qb7 Kg8 Qg7#',
          notes: [
            'Hậu khóa hàng 7. Chú ý: Vua đen vẫn còn ô g8 để đi – không phải hòa pat.',
            'Vua đen chỉ có một ô duy nhất.',
            'Chiếu hết! Hậu g7 được Vua f6 bảo vệ.',
          ],
          caption: 'Trắng đi và chiếu hết trong 2 nước.',
        },
      },
      {
        heading: 'Vua + Xe chiếu hết Vua',
        body: `Với Xe thì cần sự phối hợp chặt chẽ hơn giữa Vua và Xe:

- Dùng Xe **cắt** Vua đối phương vào một phần bàn cờ.
- Đưa Vua mình lên **đối diện** Vua đối phương (cách một ô theo hàng hoặc cột – gọi là **đối Vua**).
- Khi hai Vua đối mặt, Xe chiếu dọc mép là chiếu hết.
- Nếu Vua đối phương lẩn tránh, dùng một **nước chờ** của Xe để buộc nó quay lại.`,
        diagram: {
          fen: '4k3/8/3K4/8/8/8/8/7R w - - 0 1',
          moves: 'Rf1 Kd8 Rf8#',
          notes: [
            'Nước chờ tinh tế của Xe: chiếm cột f để lấy đi các ô f8 và f7. Vua trắng ở d6 đã khống chế d7 và e7, nên Vua đen chỉ còn đúng một ô là d8.',
            'Bị ép vào d8, Vua đen đứng đối diện Vua trắng (đối Vua) – đây chính là thế cờ Trắng chờ đợi.',
            'Chiếu hết! Hai Vua đối mặt nên Vua đen không lên được hàng 7, còn Xe chiếu dọc hàng 8.',
          ],
          caption: 'Vua + Xe: cắt, đối Vua rồi chiếu. Trắng đi và chiếu hết trong 2 nước.',
        },
      },
      {
        heading: 'Hai Xe: chiếu hết kiểu “bậc thang”',
        body: `Với hai Xe (hoặc Hậu + Xe), em không cần đến Vua: hai Xe **luân phiên chiếu** theo từng hàng, như những bậc thang, đẩy Vua đối phương ra mép rồi chiếu hết.

- Một Xe **khóa** một hàng, Xe kia **chiếu** ở hàng kế tiếp.
- Nếu Vua đối phương lại gần tấn công Xe, hãy đưa Xe ra xa ở phía bên kia bàn cờ rồi tiếp tục.`,
        diagram: {
          fen: '6k1/8/8/8/8/8/R7/1R4K1 w - - 0 1',
          moves: 'Ra7 Kf8 Rb8#',
          notes: ['Xe a khóa hàng 7.', 'Vua đen chỉ đi được dọc hàng 8.', 'Xe b chiếu hết trên hàng 8.'],
          caption: 'Trắng đi và chiếu hết trong 2 nước.',
        },
      },
    ],
    keyTakeaways: [
      'Đừng đẩy Tốt f, g vô cớ – nhớ bài học chiếu hết kẻ ngốc.',
      'f7/f2 là điểm yếu nhất lúc đầu ván; hãy phòng thủ trước khi phản công.',
      'Tạo lỗ thở cho Vua để tránh chiếu hết hàng cuối.',
      'Vua + Hậu: thu hẹp hộp, đẩy ra mép, đưa Vua lại gần – coi chừng hòa pat.',
      'Vua + Xe: cắt Vua, đối Vua, rồi chiếu dọc mép.',
    ],
  },

  // ───────────────────────── 9. Quy trình tư duy ─────────────────────────
  {
    id: 'nm-tu-duy-kien-tuong',
    category: 'nhap-mon',
    title: 'Tư duy như kiện tướng: quy trình cho mỗi nước đi',
    subtitle: 'Thói quen suy nghĩ giúp em không bao giờ “thả” quân',
    level: 2,
    icon: '🧠',
    minutes: 15,
    intro: `Sự khác biệt lớn nhất giữa người mới chơi và kiện tướng không phải là trí nhớ, mà là **quy trình suy nghĩ**. Kiện tướng có thói quen kiểm tra những điều quan trọng trước mỗi nước đi. Hãy luyện quy trình 5 bước dưới đây cho đến khi nó trở thành phản xạ tự nhiên.`,
    sections: [
      {
        heading: 'Bước 1: Đối thủ vừa đi gì? Họ muốn gì?',
        body: `Mỗi nước đi của đối thủ đều có mục đích. Trước khi nghĩ đến kế hoạch của mình, hãy hỏi:

- Quân vừa đi **tấn công** quân nào của mình?
- Nó **mở đường** cho quân nào khác?
- Nó có **đặt bẫy** không? Nếu đối thủ “tặng” quân, hãy nghi ngờ!

Ví dụ kinh điển: bẫy **Blackburne–Shilling**. Đen để Tốt e5 “treo” bằng nước 3…Nd4. Người tham lam ăn Tốt sẽ bị chiếu hết.`,
        warning: 'Khi đối thủ để quân “miễn phí”, hãy dành thêm vài giây tìm xem có bẫy hay không. Quân miễn phí đôi khi là miếng mồi.',
        diagram: {
          moves: '1.e4 e5 2.Nf3 Nc6 3.Bc4 Nd4 4.Nxe5 Qg5 5.Nxf7 Qxg2 6.Rf1 Qxe4+ 7.Be2 Nf3#',
          notes: [
            'Trắng chiếm trung tâm và mở đường cho Tượng f1 cùng Hậu.',
            'Đen đáp lại đối xứng, tranh giành trung tâm và mở đường cho Tượng f8.',
            'Mã ra f3 tấn công tốt e5 – Trắng đặt câu hỏi đầu tiên cho Đen.',
            'Đen trả lời đúng: phát triển Mã và bảo vệ tốt e5.',
            'Tượng ra c4 nhắm vào f7. Mọi thứ đều bình thường – cho đến nước tiếp theo của Đen.',
            '3…Nd4 – Nước đi lạ: để Tốt e5 không được bảo vệ. Đối thủ muốn gì?',
            '4.Nxe5? – Tham lam ăn Tốt.',
            '4…Qg5! – Tấn công cùng lúc Mã e5 và Tốt g2.',
            '5.Nxf7?? – Ăn tiếp, tấn công Hậu và Xe.',
            '5…Qxg2 – Hậu đen xông vào, dọa Xe h1.',
            '6.Rf1',
            '6…Qxe4+ – Chiếu!',
            '7.Be2 – Chặn chiếu, nhưng Tượng bị ghim vào Vua.',
            '7…Nf3# – Chiếu hết bằng Mã! Một cái bẫy hoàn hảo.',
          ],
          caption: 'Bẫy Blackburne–Shilling: vì sao phải hỏi “đối thủ muốn gì?”.',
        },
      },
      {
        heading: 'Bước 2: Chiếu – Ăn quân – Đe dọa',
        body: `Đây là “bộ lọc” quan trọng nhất của mọi kiện tướng. Hãy liệt kê cho **cả hai bên**:

- **Chiếu**: tất cả các nước chiếu có thể có.
- **Ăn quân**: tất cả các nước ăn quân.
- **Đe dọa**: các nước tấn công quân giá trị hoặc dọa chiếu hết.

Những nước **ép buộc** này thu hẹp lựa chọn của đối thủ, nên đòn chiến thuật hầu như luôn bắt đầu từ chúng. Trong khai cuộc Mã hai (biến Fried Liver), Trắng thí Mã ăn f7 – một nước ăn quân ép buộc – để kéo Vua đen ra giữa bàn cờ.`,
        diagram: {
          moves: '1.e4 e5 2.Nf3 Nc6 3.Bc4 Nf6 4.Ng5 d5 5.exd5 Nxd5 6.Nxf7 Kxf7 7.Qf3+ Ke6 8.Nc3',
          notes: [
            'Trắng mở đầu bằng tốt e4, chiếm trung tâm và mở đường cho Hậu cùng Tượng f1.',
            'Đen đáp đối xứng, giữ phần trung tâm của mình.',
            'Mã ra f3 với một đe dọa rõ ràng: ăn tốt e5. Đây là điều đầu tiên Đen phải kiểm tra.',
            'Đen nhận ra đe dọa với e5 và bảo vệ nó bằng Mã.',
            'Tượng ra c4 mang theo một đe dọa ngầm: f7 là ô chỉ có Vua đen bảo vệ.',
            'Đen phản công tốt e4 nhưng bỏ qua bước kiểm tra: giờ Mã trắng có thể nhảy g5, cùng Tượng nhắm vào f7.',
            '4.Ng5 – Đe dọa: Mã và Tượng cùng nhắm f7.',
            'Đen chặn đường chéo của Tượng bằng một đe dọa ngược: tốt d5 tấn công cả Tượng c4 lẫn tốt e4.',
            'Trắng ăn tốt; giờ tốt d5 lại tấn công Mã c6, nên Đen phải đáp trả ngay.',
            '5…Nxd5?! – Nước tự nhiên nhưng mạo hiểm.',
            '6.Nxf7! – Ăn quân: thí Mã để kéo Vua ra.',
            '6…Kxf7',
            '7.Qf3+ – Chiếu! Tấn công thêm Mã d5 đang bị ghim.',
            '7…Ke6 – Vua phải ra giữa để bảo vệ Mã.',
            '8.Nc3 – Đe dọa: tấn công Mã d5 lần nữa. Vua đen gặp nguy hiểm thật sự.',
          ],
          caption: 'Biến “Gan chiên” (Fried Liver): chuỗi nước chiếu – ăn – đe dọa.',
        },
      },
      {
        heading: 'Bước 3: Kiểm tra quân treo trước khi đi',
        body: `Khi đã chọn được nước đi, **đừng vội chạm quân**. Hãy làm “kiểm tra an toàn”:

- Sau nước này, **quân nào của mình không được bảo vệ**?
- Quân mình vừa đi có đang **bảo vệ quân khác** không? Nếu nó rời đi, quân kia có bị treo?
- Đối thủ có nước **chiếu, ăn quân, đe dọa** nào mới không?

Ở ví dụ dưới, Mã f3 đang âm thầm bảo vệ Tượng g5. Khi Mã rời đi “để tấn công”, Tượng g5 bị treo ngay lập tức.`,
        tip: 'Hãy tập thói quen “ngồi lên tay” (sit on your hands): chọn xong nước đi, nhìn lại bàn cờ thêm 10 giây với câu hỏi “mình có thả quân không?”.',
        diagram: {
          fen: 'r1bq1rk1/ppp2ppp/2np4/2b1p1Bn/2B1P3/2NP1N2/PPP2PPP/R2Q1RK1 w - - 0 1',
          moves: 'Nh4 Qxg5',
          notes: ['Nh4?? – Mã muốn đi f5 tấn công, nhưng quên rằng nó đang bảo vệ Tượng g5.', 'Hậu đen ăn Tượng miễn phí. Trắng mất 3 điểm chỉ vì một giây vội vàng.'],
          arrows: ['f3g5:green', 'd8g5:red'],
          highlights: ['g5:red'],
          caption: 'Mã f3 là “người bảo vệ” duy nhất của Tượng g5.',
        },
      },
      {
        heading: 'Bước 4: Không có chiến thuật? Hãy cải thiện quân kém nhất',
        body: `Phần lớn thời gian trong ván cờ **không có đòn chiến thuật**. Khi đó, hãy suy nghĩ về **chiến lược**:

- **Quân nào của mình đang kém nhất?** Đưa nó đến ô tốt hơn.
- Đối thủ có **điểm yếu** nào (Tốt cô lập, ô yếu, Vua thiếu che chắn)?
- Cột nào sắp được mở? Hãy đặt Xe vào đó trước.
- Cánh nào mình mạnh hơn? Hãy chơi ở cánh đó.

Trong khai cuộc Tây Ban Nha dưới đây, Mã d2 của Trắng chưa có việc gì làm. Kế hoạch kinh điển là chuyển nó qua f1 đến g3 – nơi nó tham gia tấn công cánh Vua.`,
        diagram: {
          moves: '1.e4 e5 2.Nf3 Nc6 3.Bb5 a6 4.Ba4 Nf6 5.O-O Be7 6.Re1 b5 7.Bb3 d6 8.c3 O-O 9.h3 Na5 10.Bc2 c5 11.d4 Qc7 12.Nbd2',
          notes: [
            'Trắng chiếm trung tâm bằng tốt e4, mở đường cho Tượng f1 – quân sẽ ra b5 ở nước thứ ba.',
            'Đen giữ thế cân bằng ở trung tâm với tốt e5, mở đường cho Tượng f8.',
            'Mã ra f3 tấn công tốt e5 – phát triển quân kèm theo một đe dọa.',
            'Đen bảo vệ e5 bằng Mã, đồng thời phát triển quân.',
            'Khai cuộc Tây Ban Nha: Tượng gây sức ép lên Mã c6 – quân đang giữ tốt e5.',
            'Đen hỏi Tượng ngay bằng tốt a6: Trắng phải chọn đổi lấy Mã c6 hay rút lui.',
            'Trắng giữ Tượng, lui về a4 nhưng vẫn duy trì áp lực lên Mã c6 trên đường chéo a4–e8.',
            'Đen phát triển Mã ra f6 và tấn công tốt e4, tranh thủ lúc Trắng chưa bảo vệ nó.',
            'Trắng nhập thành trước, đưa Vua vào nơi an toàn; tốt e4 tạm thời chưa cần bảo vệ.',
            'Đen phát triển Tượng một cách khiêm tốn, chuẩn bị nhập thành.',
            'Xe về e1 bảo vệ tốt e4 và chuẩn bị cho việc đẩy d4 ở trung tâm.',
            'Đen đuổi Tượng a4 để giải phóng Mã c6 khỏi sức ép.',
            'Tượng lui về b3 nhưng vẫn nhắm vào f7 trên đường chéo a2–g8.',
            'Đen củng cố tốt e5 và mở đường cho Tượng c8 – trung tâm của Đen đứng vững.',
            'Tốt c3 chuẩn bị đẩy d4 và dọn ô c2 làm chỗ lui cho Tượng b3.',
            'Đen nhập thành, đưa Vua vào nơi an toàn sau hàng tốt cánh Vua.',
            'Trắng lấy ô g4 khỏi Tượng c8 và Mã f6, để sau này đẩy d4 mà không sợ Mã f3 bị ghim.',
            'Mã đen đuổi Tượng b3 – quân đang nhắm vào f7 – và dọn đường cho tốt c đẩy lên c5.',
            'Tượng lui về c2 – ô vừa được dọn sẵn nhờ c3 – vẫn giữ tốt e4 và hướng về cánh Vua.',
            'Đen giành không gian ở cánh Hậu và gây áp lực lên ô d4.',
            'Trắng cuối cùng cũng đẩy d4, chiếm trung tâm và tấn công cả hai tốt c5, e5.',
            'Hậu c7 bảo vệ thêm tốt c5 và giữ chắc trung tâm của Đen.',
            'Mã b1 ra d2 vì c3 đã có tốt. Ở đây nó chưa có việc gì làm – kế hoạch là đi vòng qua f1 tới g3.',
          ],
          arrows: ['d2f1:blue', 'f1g3:blue'],
          caption: 'Hệ thống Chigorin: Mã d2 sẽ đi đường vòng f1–g3 để hoạt động tốt hơn.',
        },
      },
      {
        heading: 'Bước 5: Quản lý thời gian và giữ bình tĩnh',
        body: `Một quy trình tốt cũng cần đi kèm **thái độ đúng**:

- **Dành nhiều thời gian ở thời điểm then chốt** (khi có nhiều nước ăn quân, khi chuyển sang tàn cuộc), đi nhanh ở những nước hiển nhiên.
- **Đừng hoảng sợ** sau một sai lầm: đánh giá lại thế cờ một cách khách quan và tìm cơ hội phản công.
- **Đừng chủ quan** khi đang thắng: nhiều ván thua xảy ra ngay sau khi người chơi nghĩ “mình thắng rồi”.
- Sau mỗi ván, hãy **phân tích lại** – đặc biệt là những ván thua. Đó là nơi em học được nhiều nhất.

Tóm tắt quy trình: **Đối thủ muốn gì? → Chiếu, ăn, đe dọa → Chọn nước → Kiểm tra quân treo → Đi.**`,
        tip: 'Trong chế độ Luyện tập của ứng dụng, Thầy sẽ đánh giá từng nước đi của em và chỉ ra mối đe dọa của đối thủ – hãy dùng nó để rèn thói quen tư duy này.',
      },
    ],
    keyTakeaways: [
      'Luôn hỏi: “Nước vừa rồi của đối thủ muốn gì?”.',
      'Tìm chiếu, ăn quân, đe dọa cho cả hai bên trước khi nghĩ đến kế hoạch.',
      'Kiểm tra quân treo trước khi chạm quân – đặc biệt khi quân vừa đi đang bảo vệ quân khác.',
      'Không có chiến thuật thì cải thiện quân kém nhất và nhắm vào điểm yếu.',
      'Phân tích lại mỗi ván đấu, nhất là những ván thua.',
    ],
  },
];
