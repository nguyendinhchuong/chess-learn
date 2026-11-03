import type { Lesson } from '../types';

export const LESSONS: Lesson[] = [
  // ───────────────────────────── 1. Đánh giá thế cờ ─────────────────────────────
  {
    id: 'cl-danh-gia-the-co',
    category: 'chien-luoc',
    title: 'Đánh giá thế cờ & lập kế hoạch',
    subtitle: 'Đọc thế cờ như một Đại kiện tướng: những yếu tố mất cân bằng',
    level: 2,
    icon: '🔍',
    minutes: 15,
    intro:
      'Người mới học thường hỏi: “Nước tiếp theo nên đi gì?”. Đại kiện tướng hỏi trước: “Thế cờ này đang cần gì?”. Khi đã hiểu thế cờ, nước đi đúng gần như tự hiện ra. Bài này dạy em cách nhìn bàn cờ qua năm “lăng kính”: vật chất, cấu trúc tốt, hoạt động của quân, an toàn Vua và không gian — rồi biến những nhận xét đó thành một kế hoạch cụ thể.',
    sections: [
      {
        heading: 'Quy trình suy nghĩ của người chơi mạnh',
        body: `Trước mỗi nước đi quan trọng, hãy đi qua năm bước theo đúng thứ tự:

- **Bước 1 – Đối thủ vừa làm gì?** Nước vừa rồi tạo ra đe dọa nào: chiếu, bắt quân, tấn công quân không được bảo vệ?
- **Bước 2 – Đánh giá:** liệt kê các yếu tố mất cân bằng của hai bên (vật chất, tốt, quân, Vua, không gian).
- **Bước 3 – Chọn kế hoạch:** ta nên chơi ở cánh nào, nhắm vào điểm yếu nào?
- **Bước 4 – Tìm nước ứng viên:** 2–4 nước phục vụ kế hoạch.
- **Bước 5 – Tính toán & kiểm tra:** tính các biến chính, và luôn hỏi “nước này có để hở quân nào không?”.

Ở thế cờ bên cạnh (Sicilia Najdorf, Tấn công kiểu Anh), hai bên đã nhập thành khác cánh. Chỉ cần nhìn qua, ta đã thấy kế hoạch: Trắng đẩy tốt g và h vào Vua Đen, Đen đẩy tốt a và b vào Vua Trắng. Còn ô **d5** là chiến trường trung tâm mà cả hai bên tranh giành.`,
        tip: 'Đừng bao giờ bỏ qua Bước 1. Phần lớn các ván thua ở mọi trình độ đều đến từ việc không nhìn thấy đe dọa của đối thủ.',
        diagram: {
          fen: 'r2q1rk1/3nbppp/p2pbn2/1p2p3/4P1P1/1NN1BP2/PPPQ3P/2KR1B1R w - - 0 12',
          arrows: ['g4g5', 'h2h4', 'b5b4:red', 'a6a5:red'],
          highlights: ['d5:green'],
          caption: 'Nhập thành khác cánh: hai cuộc tấn công bằng tốt chạy song song. Ô d5 là điểm then chốt ở trung tâm.',
        },
      },
      {
        heading: 'Yếu tố 1 – Vật chất (và sự bù đắp)',
        body: `Hãy đếm quân theo thang điểm quen thuộc: **Tốt = 1, Mã = 3, Tượng = 3 (hơi nhỉnh hơn Mã), Xe = 5, Hậu = 9**. Hơn một Tốt trong tàn cuộc thường đủ để thắng; hơn một quân nhẹ thường thắng ở mọi giai đoạn.

Nhưng vật chất không phải tất cả. Bên kém quân có thể được **bù đắp** bằng:
- Phát triển quân nhanh hơn, nhiều quân tham chiến hơn.
- Vua đối phương mất an toàn.
- Một tốt thông mạnh hoặc thế quân áp đảo.

Gambit Đan Mạch bên cạnh là ví dụ kinh điển: Trắng thí hai Tốt, đổi lại hai Tượng chĩa thẳng vào cánh Vua Đen (ô f7 và g7) trong khi Đen chưa ra được quân nào.`,
        warning: 'Đừng “ham ăn tốt” khi quân của mình chưa phát triển. Mỗi nước đi để bắt Tốt là một nước đối thủ được dùng để tấn công.',
        diagram: {
          fen: 'rnbqkbnr/pppp1ppp/8/8/2B1P3/8/PB3PPP/RN1QK1NR b KQkq - 0 5',
          arrows: ['c4f7:red', 'b2g7:red'],
          highlights: ['f7:red', 'g7:red'],
          caption: 'Gambit Đan Mạch: Trắng kém hai Tốt nhưng có hai Tượng cực mạnh và dẫn trước về phát triển.',
        },
      },
      {
        heading: 'Yếu tố 2 – Cấu trúc tốt',
        body: `Tốt là “bộ xương” của thế cờ: chúng đi chậm, **không thể đi lùi**, nên mọi điểm yếu của tốt đều gần như vĩnh viễn. Khi đánh giá, hãy tìm:
- **Tốt yếu:** cô lập, chồng, lạc hậu – những mục tiêu lâu dài.
- **Ô yếu (lỗ hổng):** ô mà tốt đối phương không còn kiểm soát được, nơi quân ta có thể đóng chốt.
- **Tốt thông:** tốt không còn tốt đối phương nào cản đường – “linh hồn” của tàn cuộc.
- **Đa số tốt:** cánh nào ta nhiều tốt hơn, cánh đó ta có thể tạo tốt thông.

Trong cấu trúc Najdorf bên cạnh, tốt d6 của Đen là **tốt lạc hậu** trên cột nửa mở, còn ô d5 là **lỗ hổng** mà Trắng muốn đặt một quân Mã vào.`,
        diagram: {
          fen: '4k3/5ppp/p2p4/1p2p3/4P3/8/PPP2PPP/4K3 w - - 0 1',
          highlights: ['d5:green', 'd6:red'],
          caption: 'Bộ xương Najdorf: tốt d6 lạc hậu (đỏ) và lỗ hổng d5 (xanh).',
        },
      },
      {
        heading: 'Yếu tố 3 – Hoạt động của quân',
        body: `Một quân cờ mạnh hay yếu tùy vào **số ô nó kiểm soát** và **vai trò của nó trong kế hoạch**. Mã ở trung tâm mạnh hơn Mã ở góc; Tượng bị tốt mình chắn đường là Tượng “xấu”; Xe phải có cột mở.

Câu hỏi vàng của Đại kiện tướng: **“Quân nào của ta đang đứng tệ nhất?”** Cải thiện quân kém nhất thường là kế hoạch đơn giản và hiệu quả nhất khi chưa có gì cấp bách.

Ở thế Sveshnikov bên cạnh, Mã d5 của Trắng là quân mạnh nhất bàn cờ, trong khi Mã a3 đứng ở mép. Kế hoạch tự nhiên của Trắng: đưa Mã a3 về c2 rồi e3 để cùng chiếm ô d5.`,
        tip: 'Mã ở mép bàn chỉ kiểm soát 2–4 ô, Mã ở trung tâm kiểm soát 8 ô. “Mã ở mép, đời thật buồn.”',
        diagram: {
          fen: 'r1bqkb1r/5p1p/p1np1p2/1p1Np3/4P3/N7/PPP2PPP/R2QKB1R b KQkq - 1 10',
          arrows: ['a3c2:blue', 'c2e3:blue'],
          highlights: ['d5:green', 'a3:red'],
          caption: 'Mã d5 thống trị; Mã a3 là quân kém nhất – hãy đưa nó về c2–e3.',
        },
      },
      {
        heading: 'Yếu tố 4 và 5 – An toàn Vua & Không gian',
        body: `**An toàn Vua:** Vua đã nhập thành chưa? Lá chắn tốt trước Vua còn nguyên không? Có cột mở hay đường chéo nào hướng vào Vua? Khi một bên có Vua yếu, mọi yếu tố khác thường trở nên thứ yếu – một đòn tấn công thành công sẽ quyết định ván cờ.

**Không gian:** Bên nào có tốt tiến xa hơn sẽ có nhiều chỗ hơn cho quân di chuyển phía sau. Trong Phòng thủ Ấn Độ cổ (King’s Indian) bên cạnh, chuỗi tốt d5–e4 của Trắng chặn ngang bàn cờ: Trắng có không gian bên cánh Hậu (kế hoạch c4–c5), Đen có không gian bên cánh Vua (kế hoạch …f7–f5).

Quy tắc định hướng quan trọng: **hãy chơi ở cánh mà chuỗi tốt của mình đang hướng tới.**`,
        diagram: {
          fen: 'r1bq1rk1/ppp1npbp/3p1np1/3Pp3/2P1P3/2N2N2/PP2BPPP/R1BQ1RK1 w - - 1 9',
          arrows: ['c4c5', 'b2b4', 'f7f5:red', 'g6g5:red'],
          caption: 'Ấn Độ cổ: Trắng tấn công cánh Hậu, Đen tấn công cánh Vua – mỗi bên chơi ở nơi chuỗi tốt chỉ tới.',
        },
      },
      {
        heading: 'Từ đánh giá đến kế hoạch',
        body: `Một kế hoạch tốt thường có **2–3 bước cụ thể**, ví dụ: “Đưa Xe lên b1, đẩy b4–b5, tạo điểm yếu ở c6, rồi tấn công nó”.

Nguyên tắc của Steinitz – cha đẻ của cờ vua hiện đại:
- **Bên có ưu thế phải tấn công**, nếu không ưu thế sẽ tan biến.
- **Bên yếu thế phải phòng thủ** và chờ cơ hội phản công, đừng liều lĩnh vô cớ.
- Hãy tấn công vào **điểm yếu**, không phải vào chỗ đối phương mạnh nhất.

Thế cờ bên cạnh là cấu trúc Carlsbad (Phòng thủ Gambit Hậu, biến đổi tốt). Kế hoạch mẫu của Trắng là **tấn công thiểu số**: dùng hai tốt a và b tấn công ba tốt a, b, c của Đen để tạo ra một điểm yếu. Em sẽ học kỹ ở bài “Tấn công thiểu số”.`,
        tip: 'Khi không biết làm gì: (1) cải thiện quân kém nhất, (2) tăng cường kiểm soát ô quan trọng, (3) đừng vội đẩy tốt – tốt không đi lùi được.',
        diagram: {
          fen: 'r1bqrnk1/pp2bppp/2p2n2/3p2B1/3P4/2NBPN2/PPQ2PPP/R4RK1 w - - 4 11',
          arrows: ['a1b1', 'b2b4', 'b4b5'],
          highlights: ['c6:red'],
          caption: 'Cấu trúc Carlsbad: kế hoạch Rb1, b4, b5 nhằm vào tốt c6 của Đen.',
        },
      },
    ],
    keyTakeaways: [
      'Luôn bắt đầu bằng câu hỏi: đối thủ vừa đe dọa gì?',
      'Đánh giá thế cờ qua 5 yếu tố: vật chất, cấu trúc tốt, hoạt động quân, an toàn Vua, không gian.',
      'Chơi ở cánh mà chuỗi tốt của mình hướng tới; tấn công vào điểm yếu của đối phương.',
      'Khi chưa có gì cấp bách: cải thiện quân đang đứng tệ nhất.',
      'Bên có ưu thế phải chủ động, nếu không ưu thế sẽ mất dần.',
    ],
  },

  // ───────────────────────────── 2. Cấu trúc tốt ─────────────────────────────
  {
    id: 'cl-cau-truc-tot',
    category: 'chien-luoc',
    title: 'Cấu trúc tốt – bộ xương của thế cờ',
    subtitle: 'Tốt cô lập, tốt chồng, tốt lạc hậu, tốt treo và chuỗi tốt',
    level: 2,
    icon: '🦴',
    minutes: 18,
    intro:
      'Philidor từng nói: “Tốt là linh hồn của cờ vua”. Quân lớn có thể nhảy khắp bàn cờ, nhưng tốt thì chỉ đi tới và không bao giờ quay đầu. Vì vậy, cấu trúc tốt quyết định quân nào mạnh, quân nào yếu, và kế hoạch nào đúng. Học thuộc các cấu trúc tốt cơ bản là bước nhảy lớn nhất từ người chơi nghiệp dư lên người chơi có hiểu biết.',
    sections: [
      {
        heading: 'Tốt cô lập',
        body: `**Tốt cô lập** là tốt không còn tốt cùng màu nào ở hai cột bên cạnh. Vì không tốt nào bảo vệ được nó, nó phải nhờ quân lớn che chở.

Điểm yếu kép của tốt cô lập:
- Bản thân nó là **mục tiêu** để quân đối phương tấn công.
- **Ô ngay trước nó** (ở đây là d4 đối với tốt d5 của Đen) là ô tuyệt vời để đối phương đặt quân chặn – không tốt nào đuổi được quân đó đi.

Tuy nhiên tốt cô lập ở trung tâm cũng cho bên sở hữu nhiều không gian và cột nửa mở. Em sẽ học riêng về tốt cô lập d4/d5 ở bài sau.`,
        diagram: {
          fen: '4k3/pp3ppp/8/3p4/8/8/PP3PPP/4K3 w - - 0 1',
          highlights: ['d5:red', 'd4:green'],
          caption: 'Tốt d5 của Đen bị cô lập (không có tốt c và e). Ô d4 trước nó là chỗ đứng lý tưởng cho quân Trắng.',
        },
      },
      {
        heading: 'Tốt chồng',
        body: `**Tốt chồng** là hai tốt cùng màu đứng trên một cột. Chúng thường yếu vì không bảo vệ được nhau và tốt phía sau bị tốt phía trước chắn đường.

Nhưng đừng vội kết luận! Tốt chồng có mặt tích cực:
- Chúng thường mở ra một **cột nửa mở** cho Xe.
- Chúng có thể kiểm soát thêm các ô trung tâm quan trọng.

Bên cạnh: tốt c2–c3 của Trắng (thường gặp trong Phòng thủ Nimzo-Ấn Độ sau khi đổi Tượng lấy Mã c3) kiểm soát b4 và d4. Ở bên Đen, tốt chồng f7–f6 cùng tốt h7 cô lập là cấu trúc rất yếu trong tàn cuộc.`,
        warning: 'Tốt chồng mà lại bị cô lập (không có tốt bên cạnh) gần như luôn là điểm yếu nặng.',
        diagram: {
          fen: '4k3/pp3p1p/5p2/8/8/2P5/P1P2PPP/4K3 w - - 0 1',
          highlights: ['c2:yellow', 'c3:yellow', 'f6:red', 'f7:red', 'h7:red'],
          caption: 'Tốt chồng c2–c3 của Trắng tương đối vững; tốt chồng f6–f7 và tốt h7 cô lập của Đen rất yếu.',
        },
      },
      {
        heading: 'Tốt lạc hậu',
        body: `**Tốt lạc hậu** là tốt bị tụt lại phía sau các tốt bên cạnh, không thể tiến lên một cách an toàn vì ô trước mặt bị tốt đối phương khống chế.

Ví dụ kinh điển: cấu trúc Sicilia Najdorf/Sveshnikov với tốt **d6** của Đen. Tốt e5 đã tiến lên, tốt c đã đổi mất, nên d6 không còn tốt nào bảo vệ. Nếu Đen đẩy …d6–d5 sai lúc, tốt sẽ bị bắt.

Đi kèm tốt lạc hậu luôn là một **lỗ hổng**: ô d5. Kế hoạch của Trắng là chiếm d5 bằng quân (lý tưởng nhất là Mã), còn Đen phải chuẩn bị kỹ để thực hiện đột phá …d5.`,
        tip: 'Bên có tốt lạc hậu cần tìm thời điểm đẩy nó lên – khi đẩy được an toàn, điểm yếu biến mất.',
        diagram: {
          fen: '4k3/1p3ppp/p2p4/4p3/4P3/8/PPP2PPP/4K3 w - - 0 1',
          arrows: ['d6d5:red'],
          highlights: ['d6:red', 'd5:green'],
          caption: 'Tốt d6 lạc hậu trên cột d nửa mở; ô d5 là lỗ hổng mà Trắng muốn chiếm.',
        },
      },
      {
        heading: 'Tốt treo',
        body: `**Tốt treo** là cặp tốt đứng cạnh nhau (thường là c và d) ở hàng thứ tư/năm, không có tốt nào ở các cột bên cạnh hỗ trợ, và hai bên sườn đều là cột nửa mở.

Tốt treo là “con dao hai lưỡi”:
- **Mạnh:** chúng kiểm soát nhiều ô trung tâm (b4, c4, d4, e4) và sẵn sàng đột phá …d4 hoặc …c4 để mở đường cho quân.
- **Yếu:** khi bị tấn công, nếu một tốt phải tiến lên thì ô bên cạnh trở thành lỗ hổng (đẩy …c4 thì d4 yếu; đẩy …d4 thì c4/e4 yếu). Nếu bị đổi thành tốt cô lập, gánh nặng phòng thủ càng lớn.

Bên chơi chống tốt treo thường đặt Xe ở cột c và d để gây áp lực, ép một tốt phải tiến.`,
        diagram: {
          fen: '4k3/p4ppp/8/2pp4/8/4P3/P4PPP/4K3 w - - 0 1',
          highlights: ['c5:yellow', 'd5:yellow', 'c4:green', 'd4:green'],
          caption: 'Cặp tốt treo c5–d5 của Đen: mạnh khi đứng cạnh nhau, yếu khi bị ép phải tiến.',
        },
      },
      {
        heading: 'Chuỗi tốt',
        body: `**Chuỗi tốt** là các tốt nối nhau theo đường chéo, tốt sau bảo vệ tốt trước. Điểm yếu của chuỗi là **gốc** – tốt cuối cùng không được ai bảo vệ.

Nguyên tắc nổi tiếng của Nimzowitsch: **“Hãy tấn công vào gốc của chuỗi tốt.”**

Trong cấu trúc Phòng thủ Pháp (biến tiến tốt) bên cạnh:
- Chuỗi của Trắng là d4–e5, gốc là **d4** → Đen tấn công bằng …c7–c5.
- Chuỗi của Đen là e6–d5, gốc là **e6** → Trắng có thể tấn công bằng f2–f4–f5.

Chuỗi tốt cũng chỉ ra hướng tấn công: Trắng (chuỗi hướng về cánh Vua) thường tấn công cánh Vua, Đen tấn công cánh Hậu.`,
        diagram: {
          fen: '4k3/pp3ppp/4p3/3pP3/3P4/8/PP3PPP/4K3 w - - 0 1',
          arrows: ['c7c5:red', 'f2f4', 'f4f5'],
          highlights: ['d4:red', 'e6:red'],
          caption: 'Chuỗi tốt kiểu Pháp: Đen đánh vào gốc d4 bằng …c5, Trắng đánh vào gốc e6 bằng f4–f5.',
        },
      },
      {
        heading: 'Đa số tốt và tốt ứng viên',
        body: `Khi một bên có nhiều tốt hơn ở một cánh, ta gọi đó là **đa số tốt**. Đa số tốt có thể tự tạo ra **tốt thông** – vũ khí chiến thắng trong tàn cuộc.

Cách đẩy đa số tốt đúng: **tốt ứng viên đi trước** – đó là tốt không có tốt đối phương nào đứng chặn cùng cột. Bên cạnh, Trắng có đa số 3–2 bên cánh Hậu; tốt c là tốt ứng viên. Kế hoạch: b4, c4, rồi c5, b5 để tạo tốt thông.

Đa số tốt bên cánh Hậu đặc biệt giá trị vì tốt thông tạo ra sẽ ở **xa Vua đối phương** (thường nhập thành cánh Vua).`,
        tip: 'Đẩy đa số tốt theo đội hình, đừng để tốt đi một mình – các tốt hỗ trợ nhau sẽ khó bị chặn hơn.',
        diagram: {
          fen: '6k1/pp3ppp/4p3/8/8/8/PPP2PPP/6K1 w - - 0 1',
          arrows: ['c2c4', 'b2b4'],
          highlights: ['c2:green'],
          caption: 'Trắng có đa số 3–2 bên cánh Hậu. Tốt c (không bị tốt nào chắn) là tốt ứng viên.',
        },
      },
    ],
    keyTakeaways: [
      'Tốt không đi lùi: mọi điểm yếu của tốt gần như vĩnh viễn.',
      'Tốt cô lập, tốt chồng, tốt lạc hậu là mục tiêu; ô trước chúng là chỗ đứng lý tưởng cho quân đối phương.',
      'Tốt treo mạnh khi đứng cạnh nhau, yếu khi bị ép tiến lên.',
      'Tấn công vào gốc của chuỗi tốt (Nimzowitsch).',
      'Đa số tốt tạo ra tốt thông – hãy để tốt ứng viên đi trước.',
    ],
  },

  // ───────────────────────────── 3. IQP ─────────────────────────────
  {
    id: 'cl-tot-co-lap-d4',
    category: 'chien-luoc',
    title: 'Tốt cô lập d4 (IQP)',
    subtitle: 'Chơi với và chơi chống tốt cô lập ở trung tâm',
    level: 3,
    icon: '🏝️',
    minutes: 16,
    intro:
      'Tốt cô lập ở cột d (thường gọi là IQP – Isolated Queen’s Pawn) xuất hiện trong rất nhiều khai cuộc: Gambit Hậu, Caro-Kann biến Panov, Sicilia Alapin, Phòng thủ Pháp Tarrasch… Đây là một trong những cấu trúc quan trọng nhất của cờ vua. Bên có IQP muốn tấn công ngay khi còn nhiều quân; bên chống IQP muốn phong tỏa, đổi quân và đưa ván cờ về tàn cuộc.',
    sections: [
      {
        heading: 'IQP hình thành như thế nào',
        body: `Thế cờ bên cạnh xuất hiện sau Caro-Kann biến Panov: Trắng có tốt **d4** cô lập (không có tốt c và e). Hãy để ý:
- Trắng có **nhiều không gian** hơn và hai ô tiền đồn đẹp: **e5** và **c5**, được tốt d4 bảo vệ.
- Cột c và cột e **nửa mở** cho Xe Trắng.
- Đen có ô **d5** tuyệt vời ngay trước tốt cô lập – Mã d5 đã đứng ở đó.

Như vậy IQP vừa là **nguồn năng lượng** (không gian, hoạt động), vừa là **điểm yếu tĩnh** (cần bảo vệ, ô d5 bị chiếm).`,
        diagram: {
          fen: 'r1bq1rk1/pp3ppp/2n1pb2/3n4/3P4/2NB1N2/PP3PPP/R1BQR1K1 w - - 6 11',
          highlights: ['d4:yellow', 'e5:green', 'c5:green', 'd5:red'],
          caption: 'Thế IQP điển hình: tiền đồn e5, c5 cho Trắng; ô phong tỏa d5 cho Đen.',
        },
      },
      {
        heading: 'Chơi với IQP: tấn công!',
        body: `Bên có IQP nên chơi **năng động**, ưu tiên tấn công cánh Vua khi còn nhiều quân trên bàn:
- **Mã nhảy e5** – tiền đồn mạnh, nhìn về f7 và c6.
- **Hậu + Tượng xếp thành khẩu đội** (Hậu c2 cùng Tượng d3) nhắm vào h7.
- **Xe nâng lên** theo hàng ba: Re1–e3–h3 (hoặc g3) để tham gia tấn công.
- **Tượng g5** ghim hoặc đổi Mã f6 – quân phòng thủ quan trọng nhất của Vua Đen.
- **Đột phá d4–d5** vào đúng thời điểm, mở toang trung tâm khi quân Trắng đã sẵn sàng.

Ý tưởng chung: dùng ưu thế không gian và hoạt động **trước khi** điểm yếu của tốt d4 kịp lộ ra.`,
        tip: 'Với IQP, mỗi lần đổi quân nhẹ đều có lợi cho bên phòng thủ. Hãy hạn chế đổi quân nếu em là bên có IQP.',
        diagram: {
          fen: 'r1bq1rk1/pp3ppp/2n1pb2/3n4/3P4/2NB1N2/PP3PPP/R1BQR1K1 w - - 6 11',
          arrows: ['f3e5', 'd1c2:blue', 'd3h7:red', 'e1e3', 'e3h3'],
          caption: 'Kế hoạch tấn công: Ne5, Hậu c2 + Tượng d3 nhắm h7, Xe e1–e3–h3.',
        },
      },
      {
        heading: 'Chơi chống IQP: phong tỏa – đổi quân – tiêu diệt',
        body: `Nimzowitsch đưa ra công thức ba bước để chống tốt cô lập: **kìm hãm, phong tỏa, tiêu diệt**.
- **Phong tỏa:** đặt một quân (tốt nhất là Mã) ngay trước tốt, ở ô d5. Mã phong tỏa không bị tốt nào đuổi đi và rất khó bị đổi.
- **Đổi quân:** mỗi cặp quân bị đổi làm giảm sức tấn công của Trắng và làm tốt d4 trở nên yếu hơn.
- **Gây áp lực:** Xe ở cột d, Tượng ở f6 hoặc b6, Mã ở c6/f5 đều nhắm vào d4.

Nhìn thế cờ từ phía Đen: Tượng f6 và Mã c6 đã cùng tấn công d4, Mã d5 phong tỏa. Bước tiếp theo hợp lý là đưa Xe về d8 và tìm cách đổi các quân tấn công của Trắng.`,
        diagram: {
          fen: 'r1bq1rk1/pp3ppp/2n1pb2/3n4/3P4/2NB1N2/PP3PPP/R1BQR1K1 w - - 6 11',
          orientation: 'black',
          arrows: ['f6d4:red', 'c6d4:red', 'f8d8:blue', 'd8d4:red'],
          highlights: ['d5:green'],
          caption: 'Góc nhìn của Đen: Mã d5 phong tỏa, ba quân cùng ép vào tốt d4.',
        },
      },
      {
        heading: 'Đột phá d4–d5: vũ khí bí mật',
        body: `Khi Trắng đã tập trung đủ lực lượng (Xe d1, Hậu, Tượng, Mã cùng hướng về d5), nước **d4–d5** có thể mở tung thế cờ. Sau khi đổi tốt ở d5, các quân Trắng bỗng hoạt động tối đa: cột d và cột e mở, đường chéo của Tượng thông thoáng.

Đen phòng ngừa đột phá này bằng cách giữ vững ô d5 (Mã d5, Tượng e6/b7, tốt e6) và không để quá nhiều quân Trắng chĩa vào đó.

Ngược lại, nếu đột phá d5 không còn khả thi và nhiều quân đã bị đổi, tốt d4 chỉ còn là một gánh nặng.`,
        warning: 'Đẩy d5 khi chưa chuẩn bị đủ thường chỉ làm mất một tốt. Hãy đếm số quân tấn công và phòng thủ ô d5 trước khi đẩy.',
        diagram: {
          fen: 'r2q1rk1/pp2bppp/2n1bn2/8/3P4/2NB1N2/1P3PPP/R1BQR1K1 w - - 0 1',
          arrows: ['d4d5', 'c3d5:blue'],
          highlights: ['d5:yellow'],
          caption: 'Tốt d4 đã sẵn sàng tiến lên d5: tốt sẽ tấn công cả Tượng e6 lẫn Mã c6.',
        },
      },
      {
        heading: 'Tàn cuộc: IQP chỉ còn là điểm yếu',
        body: `Khi các quân lớn đã được đổi, những lợi thế động của IQP biến mất, chỉ còn lại điểm yếu tĩnh:
- Tốt d4 phải được bảo vệ bằng quân → quân Trắng bị trói.
- Ô d5 là trạm nghỉ hoàn hảo cho Vua hoặc Mã Đen.
- Vua Đen có thể tiến vào trung tâm qua d5.

Đó là lý do bên chống IQP luôn sẵn lòng đổi quân. Thế bên cạnh tuy cân bằng về vật chất, nhưng Đen dễ chơi hơn hẳn: Xe d8 ép d4, Mã f6 nhảy về d5, Vua Đen sẽ tiến về e6–d5.`,
        diagram: {
          fen: '3r2k1/pp3ppp/4pn2/8/3P4/5N2/PP3PPP/3R2K1 w - - 0 1',
          arrows: ['d8d4:red', 'f6d5:blue'],
          highlights: ['d4:red', 'd5:green'],
          caption: 'Tàn cuộc với IQP: Đen chiếm ô d5 và ép tốt d4, Trắng phải phòng thủ thụ động.',
        },
      },
    ],
    keyTakeaways: [
      'IQP = năng lượng (không gian, cột nửa mở, tiền đồn e5/c5) + điểm yếu (tốt cần bảo vệ, ô d5).',
      'Có IQP: tấn công sớm, tránh đổi quân, chuẩn bị đột phá d4–d5.',
      'Chống IQP: phong tỏa ở d5 (tốt nhất bằng Mã), đổi quân, rồi tấn công tốt.',
      'Càng gần tàn cuộc, IQP càng yếu.',
    ],
  },

  // ───────────────────────────── 4. Ô mạnh & tiền đồn ─────────────────────────────
  {
    id: 'cl-o-manh-tien-don',
    category: 'chien-luoc',
    title: 'Ô mạnh và tiền đồn cho Mã',
    subtitle: 'Tìm lỗ hổng trong hàng ngũ đối phương và đóng chốt ở đó',
    level: 3,
    icon: '🏰',
    minutes: 14,
    intro:
      'Một quân Mã đứng vững ở trung tâm, không thể bị tốt đuổi đi, có thể mạnh ngang một quân Xe. Bài này giúp em nhận ra các “ô mạnh” (lỗ hổng của đối phương), biết cách tạo ra chúng và đưa quân đến chiếm giữ.',
    sections: [
      {
        heading: 'Ô mạnh, lỗ hổng và tiền đồn',
        body: `- **Lỗ hổng (ô yếu):** ô mà **tốt đối phương không còn có thể kiểm soát** – vì các tốt ở cột bên cạnh đã tiến qua hoặc đã mất.
- **Tiền đồn:** một ô mạnh nằm trong phần sân của đối phương (thường ở hàng 4–6), được **tốt của mình bảo vệ**.

Quân đặt ở tiền đồn không thể bị tốt đuổi đi, chỉ có thể bị đổi bằng quân. Vì vậy, nếu đối phương không còn quân nhẹ phù hợp để đổi, quân của ta sẽ đứng đó mãi mãi.

Quân lý tưởng cho tiền đồn là **Mã**: nó cần trạm đứng gần, và từ tiền đồn nó kiểm soát rất nhiều ô quan trọng.`,
        diagram: {
          fen: 'r1bqkb1r/5p1p/p1np1p2/1p1Np3/4P3/N7/PPP2PPP/R2QKB1R b KQkq - 1 10',
          highlights: ['d5:green', 'c6:yellow', 'e7:yellow', 'f6:yellow', 'b6:yellow'],
          caption: 'Mã d5 (Sveshnikov) đứng ở tiền đồn: không tốt Đen nào đuổi được, nó kiểm soát cả b6, c7, e7, f6.',
        },
      },
      {
        heading: 'Đổi quân để giành ô mạnh',
        body: `Đôi khi ta phải **đổi một quân tốt lấy một quân phòng thủ** để giành quyền kiểm soát ô then chốt. Đây là tư duy chiến lược rất đặc trưng.

Trong biến Sveshnikov, Trắng sẵn sàng đổi Tượng g5 lấy Mã f6 – quân đang bảo vệ ô d5. Đổi lại, Đen bị tốt chồng ở cột f, còn Trắng có Mã d5 thống trị. Đen nhận được cặp Tượng và cơ hội phản công …f5, nên đây là một thế cờ cân bằng nhưng rất giàu nội dung.`,
        diagram: {
          fen: 'r1bqkb1r/5ppp/p1np1n2/1p2p1B1/4P3/N1N5/PPP2PPP/R2QKB1R w KQkq - 0 9',
          moves: '9.Bxf6 gxf6 10.Nd5',
          notes: [
            'Trắng đổi Tượng lấy Mã f6 – quân phòng thủ duy nhất còn kiểm soát ô d5.',
            'Đen bắt lại bằng tốt g – lựa chọn chính của lý thuyết (nếu …Qxf6, Mã nhảy d5 kèm nhịp tấn công Hậu). Cấu trúc tốt cánh Vua của Đen bị phá vỡ.',
            'Mã nhảy vào d5 – tiền đồn hoàn hảo. Không tốt Đen nào có thể đuổi nó đi.',
          ],
          caption: 'Đổi Tượng lấy Mã để chiếm ô d5.',
        },
      },
      {
        heading: 'Mã ở tiền đồn đối đầu Tượng xấu',
        body: `Thế cờ bên cạnh là hình mẫu “**Mã tốt chống Tượng xấu**”. Mã d5 được hai tốt c4 và e4 bảo vệ, đứng vững vàng ở trung tâm. Tượng e7 của Đen bị chính các tốt d6, e5 (đứng trên ô đen) chắn đường – nó chỉ còn là một “con tốt to”.

Dù vật chất bằng nhau, Trắng có ưu thế rõ rệt. Kế hoạch của Trắng: đưa Vua vào trung tâm, tạo thêm mục tiêu ở cánh Vua (đẩy f4), và dùng Mã khống chế mọi ô quan trọng.`,
        tip: 'Mã ở tiền đồn hàng 6 (sâu trong trận địa đối phương) thường mạnh như một Xe.',
        diagram: {
          fen: '6k1/4bppp/3p4/3Np3/2P1P3/8/5PPP/6K1 w - - 0 1',
          arrows: ['d5e7:blue', 'f2f4'],
          highlights: ['d5:green', 'd6:red', 'e5:red'],
          caption: 'Mã d5 bất khả xâm phạm; Tượng e7 bị tốt của chính mình giam cầm.',
        },
      },
      {
        heading: 'Đừng tự tạo lỗ hổng cho mình',
        body: `Mỗi nước tốt đều để lại các ô phía sau mà tốt đó không còn bảo vệ được nữa. Đặc biệt nguy hiểm là các nước tốt **trước Vua**.

Ví dụ: sau …g6, các ô **f6** và **h6** trở nên yếu. Nếu Đen còn Tượng ô đen, nó có thể che chắn. Nhưng nếu Tượng ô đen đã bị đổi mất, Hậu và Tượng ô đen của Trắng sẽ xâm nhập vào f6 và h6, đe dọa chiếu hết ở g7.

Bên cạnh: Đen không còn Tượng ô đen. Trắng đe dọa đưa Hậu lên f6, kết hợp với Tượng c3 tạo đòn chiếu hết ở g7.`,
        warning: 'Trước khi đẩy tốt, hãy tự hỏi: “Những ô nào sẽ vĩnh viễn mất sự bảo vệ của tốt này?”',
        diagram: {
          fen: 'r4rk1/pp3p1p/1n4p1/q7/8/2B2Q2/PP3PPP/R4RK1 w - - 0 1',
          arrows: ['f3f6:red', 'c3g7:red'],
          highlights: ['f6:red', 'h6:red', 'g7:red'],
          caption: 'Sau …g6 và mất Tượng ô đen, các ô f6, h6 của Đen thành lỗ hổng chết người.',
        },
      },
    ],
    keyTakeaways: [
      'Lỗ hổng là ô mà tốt đối phương không thể kiểm soát nữa.',
      'Tiền đồn = ô mạnh được tốt mình bảo vệ – lý tưởng cho Mã.',
      'Sẵn sàng đổi quân để loại bỏ quân phòng thủ ô then chốt.',
      'Mỗi nước tốt đều tạo ra ô yếu phía sau – đặc biệt cẩn thận với tốt trước Vua.',
    ],
  },

  // ───────────────────────────── 5. Cột mở & hàng 7 ─────────────────────────────
  {
    id: 'cl-cot-mo-hang-7',
    category: 'chien-luoc',
    title: 'Cột mở và Xe ở hàng 7',
    subtitle: 'Đưa Xe vào cuộc: chiếm cột, nâng Xe, xâm nhập hàng 7',
    level: 2,
    icon: '🗼',
    minutes: 12,
    intro:
      'Xe là quân mạnh thứ hai nhưng lại thường ra quân muộn nhất. Xe cần “đường cao tốc” – các cột mở – để phát huy sức mạnh. Một Xe trên cột mở có thể xâm nhập hàng 7 hoặc hàng 8 của đối phương và gây tàn phá. Bài học này dạy em cách đưa Xe vào trận.',
    sections: [
      {
        heading: 'Cột mở và cột nửa mở',
        body: `- **Cột mở:** cột không có tốt nào của cả hai bên.
- **Cột nửa mở:** cột chỉ còn tốt của đối phương – Xe của ta có thể tấn công tốt đó.

Quy tắc: **Xe thuộc về cột mở**. Bên nào chiếm cột mở trước (và giữ được nó) sẽ có cơ hội xâm nhập vào trận địa đối phương.

Bên cạnh, hai cột d và e đều mở. Trắng đã đặt Xe ở cả hai cột, trong khi Xe Đen vẫn ở góc – Trắng làm chủ thế cờ dù vật chất bằng nhau.`,
        diagram: {
          fen: 'r4rk1/pp3ppp/2p5/8/8/8/PPP2PPP/3RR1K1 w - - 0 1',
          arrows: ['d1d7', 'e1e7'],
          caption: 'Trắng chiếm hai cột mở d và e; Xe Đen chưa vào cuộc.',
        },
      },
      {
        heading: 'Xâm nhập hàng 7',
        body: `Hàng 7 (đối với Trắng) là nơi các tốt của Đen còn đứng ở vị trí ban đầu – chúng chỉ có thể được quân bảo vệ. Một Xe lên hàng 7 sẽ:
- Tấn công nhiều tốt cùng lúc.
- Giam Vua đối phương ở hàng cuối.

Trong ví dụ, Xe Trắng lên d7 tấn công tốt b7. Đen đẩy b5 để tránh, nhưng tốt a7 lập tức mất. Đó là sức mạnh của Xe hàng 7!`,
        diagram: {
          fen: '5rk1/pp3ppp/2p5/8/8/8/PPP2PPP/3R2K1 w - - 0 1',
          moves: '1.Rd7 b5 2.Rxa7',
          notes: [
            'Xe xâm nhập hàng 7, tấn công tốt b7 (và gây áp lực lên f7).',
            'Đen đẩy tốt b đi để tránh bị bắt…',
            '…nhưng tốt a7 không được bảo vệ. Trắng ăn tốt và Xe vẫn ngự trị trên hàng 7.',
          ],
          caption: 'Xe hàng 7 “càn quét” các tốt chưa di chuyển.',
        },
      },
      {
        heading: 'Hai Xe trên hàng 7',
        body: `Hai Xe cùng đứng trên hàng 7 (người ta vui gọi là **“hai con lợn ở hàng 7”**) là một vũ khí cực mạnh. Chúng bảo vệ lẫn nhau theo hàng ngang, ăn tốt liên tục, và thường tạo ra chiếu hết hoặc ít nhất là chiếu vĩnh viễn.

Bên cạnh, hai Xe Trắng ở b7 và c7. Trắng có thể ngay lập tức ăn tốt g7 kèm nước chiếu, sau đó hai Xe tiếp tục quấy rối Vua Đen. Đen sẽ phải rất vất vả mới đẩy được chúng ra khỏi hàng 7.`,
        tip: 'Trong tàn cuộc Xe, một Xe ở hàng 7 thường đáng giá ngang một tốt.',
        diagram: {
          fen: '3r2k1/1RR3p1/7p/8/8/8/4r1PP/6K1 w - - 0 1',
          arrows: ['c7g7:red'],
          highlights: ['b7:green', 'c7:green'],
          caption: 'Hai Xe hàng 7: Trắng ăn tốt g7 kèm nước chiếu, Vua Đen bị giam ở hàng cuối.',
        },
      },
      {
        heading: 'Nâng Xe và xếp Xe kép',
        body: `Khi các cột chưa mở, Xe vẫn có thể tham chiến bằng cách:
- **Nâng Xe** theo hàng ngang: ví dụ Re1–e3–h3 để tấn công Vua đối phương.
- **Xếp Xe kép** (hai Xe trên cùng một cột) hoặc **Hậu + Xe** để tăng áp lực, giành quyền kiểm soát cột.

Trong thế IQP bên cạnh, Xe e1 có thể đi e3 rồi h3, tham gia vào cuộc tấn công cánh Vua dù không có cột nào mở về phía đó.`,
        diagram: {
          fen: 'r1bq1rk1/pp3ppp/2n1pb2/3n4/3P4/2NB1N2/PP3PPP/R1BQR1K1 w - - 6 11',
          arrows: ['e1e3', 'e3h3', 'a1c1:blue'],
          caption: 'Nâng Xe qua hàng 3 để tấn công cánh Vua.',
        },
      },
      {
        heading: 'Cột nửa mở và đòn đổi chất',
        body: `Trong Sicilia, Đen thường có **cột c nửa mở**. Xe c8 gây áp lực lên c3 và c2 – đặc biệt khi Trắng nhập thành cánh Hậu.

Trong biến Rồng (Dragon), đòn hy sinh **…Rxc3!** là một ý tưởng kinh điển: Đen đổi Xe lấy Mã c3 để phá tan lá chắn tốt của Vua Trắng, đổi lại sức mạnh tấn công khổng lồ. Đây là ví dụ cho thấy giá trị của quân không cố định – Xe trên cột nửa mở có thể đáng giá hơn nhiều khi đổi lấy một quân phòng thủ then chốt.`,
        diagram: {
          fen: '2rq1rk1/pp1bppbp/3p1np1/4n3/3NP2P/1BN1BP2/PPPQ2P1/2KR3R b - - 0 12',
          arrows: ['c8c3:red'],
          highlights: ['c3:red', 'c1:yellow'],
          caption: 'Dragon, biến Nam Tư: Xe c8 trên cột nửa mở sẵn sàng hy sinh ở c3.',
        },
      },
    ],
    keyTakeaways: [
      'Xe thuộc về cột mở; cột nửa mở dùng để tấn công tốt đối phương.',
      'Hàng 7 là đích đến lý tưởng của Xe: ăn tốt và giam Vua.',
      'Hai Xe trên hàng 7 thường đủ để chiếu hết hoặc chiếu vĩnh viễn.',
      'Chưa có cột mở? Hãy nâng Xe theo hàng ngang hoặc xếp Xe kép.',
    ],
  },

  // ───────────────────────────── 6. Tượng ─────────────────────────────
  {
    id: 'cl-tuong-tot-tuong-xau',
    category: 'chien-luoc',
    title: 'Tượng tốt, Tượng xấu & cặp Tượng',
    subtitle: 'Khi nào Tượng mạnh, khi nào Mã mạnh?',
    level: 3,
    icon: '⛪',
    minutes: 15,
    intro:
      'Tượng và Mã đều có giá trị khoảng 3 điểm, nhưng trong từng thế cờ cụ thể, một quân có thể mạnh hơn hẳn quân kia. Hiểu được sự khác biệt này giúp em quyết định đúng khi nào nên đổi quân, và nên đặt tốt của mình ở ô màu nào.',
    sections: [
      {
        heading: 'Tượng tốt và Tượng xấu',
        body: `Một Tượng là **“xấu”** khi phần lớn tốt của chính mình (đặc biệt là tốt trung tâm đã cố định) nằm trên ô **cùng màu** với nó – tốt chắn đường đi của Tượng. Ngược lại, Tượng **“tốt”** là Tượng đi trên ô khác màu với tốt trung tâm của mình.

Thế cờ bên cạnh (cấu trúc Phòng thủ Pháp): tốt Đen ở d5, e6 nằm trên ô trắng → Tượng c8 (ô trắng) của Đen là **Tượng xấu**. Tốt Trắng ở d4, e5 nằm trên ô đen → Tượng d1 (ô trắng) của Trắng là **Tượng tốt**.

Lời khuyên: hãy đặt tốt của mình trên **ô khác màu** với Tượng của mình, và đặt chúng trên **ô cùng màu** với Tượng của đối phương để hạn chế nó.`,
        tip: 'Tượng “xấu” vẫn có thể rất có ích nếu nó đứng **bên ngoài** chuỗi tốt (ví dụ Tượng Đen đi ra b7 hoặc a6 trước khi khóa tốt).',
        diagram: {
          fen: '2b3k1/pp3ppp/4p3/3pP3/3P4/8/PP3PPP/3B2K1 w - - 0 1',
          highlights: ['d5:red', 'e6:red', 'c8:red', 'd1:green'],
          caption: 'Tượng c8 của Đen bị chính tốt d5, e6 giam cầm; Tượng d1 của Trắng tự do.',
        },
      },
      {
        heading: 'Thoát khỏi Tượng xấu: đổi nó đi!',
        body: `Một kỹ thuật chiến lược quan trọng là **đổi Tượng xấu của mình lấy Tượng tốt của đối phương**.

Trong Phòng thủ Pháp, Đen thường chơi …b6 và …Ba6 để đổi Tượng ô trắng “xấu” lấy Tượng f1 “tốt” của Trắng. Sau khi đổi, các ô trắng trong trận địa Đen không còn bị đe dọa, và Đen không còn phải lo cho quân kém nhất của mình.`,
        diagram: {
          moves: '1.e4 e6 2.d4 d5 3.e5 b6 4.c3 Qd7 5.Nf3 Ba6 6.Bxa6 Nxa6',
          notes: [
            'Trắng chiếm trung tâm bằng tốt e4, mở đường cho Hậu và Tượng f1.',
            'Phòng thủ Pháp: tốt e6 sẽ chắn đường Tượng c8.',
            'Trắng dựng trung tâm hai tốt lý tưởng e4–d4, chiếm trọn hai ô trung tâm.',
            'Đen thách thức tốt e4 ngay – nước đặc trưng của Phòng thủ Pháp. Nhưng giờ Tượng c8 đã bị kẹt sau chuỗi tốt e6–d5.',
            'Trắng lấn chiếm không gian, khóa trung tâm.',
            'Đen chuẩn bị đưa Tượng ô trắng ra a6.',
            'Trắng củng cố tốt d4 và lấy đi ô b4 của Tượng f8 – chuỗi tốt c3–d4–e5 đứng vững như một bức tường.',
            'Hậu d7 giữ ô b5, chuẩn bị …Ba6.',
            'Mã ra f3 bảo vệ thêm d4 và e5, đồng thời dọn đường cho Trắng nhập thành.',
            'Tượng “xấu” ra khỏi chuỗi tốt và thách đổi Tượng f1.',
            'Trắng đổi (nếu không, Đen sẽ bắt ở f1 và Trắng mất quyền nhập thành).',
            'Đen đã đổi được Tượng xấu nhất của mình. Mã a6 sẽ quay về c7.',
          ],
          caption: 'Ý tưởng …b6 và …Ba6: đổi Tượng xấu lấy Tượng tốt.',
        },
      },
      {
        heading: 'Mã tốt chống Tượng xấu',
        body: `Khi tốt đã bị khóa và một bên có Tượng xấu, quân Mã đứng ở tiền đồn thường mạnh hơn hẳn. Mã không quan tâm đến màu ô, nó có thể nhảy tới bất kỳ ô yếu nào.

Bên cạnh, Mã d5 của Trắng là ngôi sao, còn Tượng e7 của Đen bị giam sau tốt d6 và e5. Trắng có thể chậm rãi đưa Vua vào trung tâm và tạo thêm mục tiêu – Đen gần như chỉ biết chờ.`,
        diagram: {
          fen: '6k1/4bppp/3p4/3Np3/2P1P3/8/5PPP/6K1 w - - 0 1',
          highlights: ['d5:green', 'e7:red'],
          caption: '“Mã tốt chống Tượng xấu” – một trong những ưu thế chiến lược kinh điển.',
        },
      },
      {
        heading: 'Khi nào Tượng mạnh hơn Mã?',
        body: `Tượng là quân **tầm xa**, còn Mã là quân **tầm gần**. Vì vậy:
- **Thế cờ mở** (ít tốt ở trung tâm, đường chéo thông thoáng) → Tượng mạnh hơn.
- **Tốt ở cả hai cánh** → Tượng có thể chạy từ cánh này sang cánh kia trong một nước, Mã cần nhiều nước. Tượng mạnh hơn.
- **Cuộc đua tốt thông** → Tượng chặn tốt thông từ xa tốt hơn.

Ngược lại, **Mã mạnh hơn** khi:
- Thế cờ đóng, tốt bị khóa.
- Có tiền đồn vững chắc.
- Tất cả tốt nằm ở một cánh.

Ở thế bên cạnh, tốt nằm ở cả hai cánh và bàn cờ rộng mở: Tượng Trắng có lợi thế rõ so với Mã Đen.`,
        diagram: {
          fen: '6k1/p4ppp/4n3/8/8/8/P4PPP/2B3K1 w - - 0 1',
          arrows: ['c1a3:blue', 'c1h6:blue'],
          caption: 'Tốt hai cánh, thế cờ mở: Tượng chạy khắp bàn cờ, Mã chật vật theo sau.',
        },
      },
      {
        heading: 'Sức mạnh của cặp Tượng',
        body: `Hai Tượng cùng nhau kiểm soát **cả ô trắng lẫn ô đen** – không ô nào trên bàn cờ an toàn trước chúng. Trong thế cờ mở, **cặp Tượng** thường được đánh giá cao hơn Tượng + Mã hoặc hai Mã khoảng nửa tốt.

Cách tận dụng cặp Tượng:
- **Mở thế cờ** bằng các nước đột phá tốt.
- Dùng tốt để **đuổi Mã** đối phương khỏi các ô tốt, hạn chế chúng.
- Tránh đổi một trong hai Tượng nếu không được lợi rõ ràng.

Bên cạnh: hai Tượng c3 và f3 của Trắng quét các đường chéo dài, chĩa thẳng vào cánh Vua và cánh Hậu của Đen.`,
        diagram: {
          fen: 'r4rk1/pp3ppp/2n2n2/8/8/2B2B2/PP3PPP/R4RK1 w - - 0 1',
          arrows: ['c3f6:blue', 'f3c6:blue'],
          caption: 'Cặp Tượng trong thế cờ mở: hai “khẩu pháo” bắn chéo khắp bàn.',
        },
      },
      {
        heading: 'Tượng khác màu ở trung cuộc',
        body: `Khi mỗi bên chỉ còn một Tượng và hai Tượng **khác màu ô**, có một nghịch lý đáng nhớ:
- **Trong tàn cuộc:** Tượng khác màu rất dễ hòa (bên phòng thủ dựng pháo đài trên ô mà Tượng đối phương không chạm tới được).
- **Trong trung cuộc:** Tượng khác màu lại **có lợi cho bên tấn công**, vì Tượng của bên phòng thủ không thể bảo vệ các ô mà Tượng tấn công nhắm vào.

Bên cạnh, Tượng d4 (ô đen) của Trắng cùng Hậu nhắm vào g7 và h7; Tượng e6 (ô trắng) của Đen không thể tham gia bảo vệ ô g7.`,
        diagram: {
          fen: 'r2q1rk1/pp3ppp/4b3/8/3B4/3Q4/PP3PPP/R4RK1 w - - 0 1',
          arrows: ['d4g7:red', 'd3h7:red'],
          highlights: ['g7:red'],
          caption: 'Tượng khác màu trong trung cuộc: bên tấn công được lợi.',
        },
      },
    ],
    keyTakeaways: [
      'Tượng xấu là Tượng bị tốt của chính mình chắn đường; hãy đặt tốt trên ô khác màu với Tượng mình.',
      'Tìm cách đổi Tượng xấu lấy Tượng tốt của đối phương.',
      'Thế mở và tốt hai cánh → Tượng mạnh hơn; thế đóng và có tiền đồn → Mã mạnh hơn.',
      'Cặp Tượng là ưu thế thật sự trong thế mở – hãy mở thế cờ để tận dụng.',
      'Tượng khác màu: có lợi cho bên tấn công ở trung cuộc, dễ hòa ở tàn cuộc.',
    ],
  },

  // ───────────────────────────── 7. An toàn Vua ─────────────────────────────
  {
    id: 'cl-an-toan-vua',
    category: 'chien-luoc',
    title: 'An toàn Vua & tấn công khi nhập thành khác cánh',
    subtitle: 'Lá chắn tốt, Vua kẹt ở trung tâm và cuộc đua đẩy tốt',
    level: 3,
    icon: '🛡️',
    minutes: 16,
    intro:
      'Vua là quân duy nhất mà mất đi là thua ván. Trong khai cuộc và trung cuộc, Vua cần được che chở sau lá chắn tốt. Bài này giải thích cái gì làm Vua an toàn, vì sao Vua ở trung tâm rất nguy hiểm, và cách tấn công khi hai bên nhập thành khác cánh – thế cờ sắc bén nhất của cờ vua.',
    sections: [
      {
        heading: 'Lá chắn tốt',
        body: `Sau khi nhập thành, ba tốt f, g, h đứng trước Vua là **lá chắn**. Lá chắn tốt nhất là khi cả ba tốt còn ở vị trí ban đầu.

Mỗi lần đẩy một tốt trong lá chắn, em tạo ra những ô yếu:
- Đẩy **g6** → ô f6 và h6 yếu (đặc biệt nguy hiểm nếu mất Tượng ô đen).
- Đẩy **h6** → tạo móc để đối phương đẩy g4–g5 mở cột g.
- Đẩy **f6** → đường chéo a2–g8 và ô e6 yếu.

Tuy nhiên, một nước **h3/h6 đúng lúc** (tạo “lỗ thở”) giúp Vua tránh bị chiếu hết ở hàng cuối. Hãy làm việc đó khi thế cờ đã yên ổn.`,
        diagram: {
          fen: 'r4rk1/pp3p2/6pp/8/8/8/PP3PPP/R4RK1 w - - 0 1',
          highlights: ['f6:red', 'h6:yellow', 'g6:yellow', 'f2:green', 'g2:green', 'h2:green'],
          caption: 'Lá chắn của Trắng còn nguyên; lá chắn của Đen đã bị đẩy g6, h6 – ô f6 thành lỗ hổng.',
        },
      },
      {
        heading: 'Vua kẹt ở trung tâm',
        body: `Vua chưa nhập thành khi trung tâm bị mở là mục tiêu tuyệt vời cho đối phương: các cột e, d mở thẳng vào Vua, quân đối phương có thể chiếu liên tục.

Ví dụ nổi tiếng là đòn **“Gan rán” (Fried Liver)**: sau khi Trắng hy sinh Mã ở f7, Vua Đen bị lôi ra giữa bàn cờ. Dù Đen hơn quân, Vua ở e6 phải hứng chịu đòn tấn công dồn dập từ Hậu, Tượng, Mã và cả tốt d4.`,
        warning: 'Quy tắc khai cuộc: nhập thành sớm, thường trong khoảng 10 nước đầu, đặc biệt khi trung tâm có thể bị mở.',
        diagram: {
          moves: '1.e4 e5 2.Nf3 Nc6 3.Bc4 Nf6 4.Ng5 d5 5.exd5 Nxd5 6.Nxf7 Kxf7 7.Qf3+ Ke6 8.Nc3',
          notes: [
            'Trắng mở đầu bằng tốt e4: chiếm trung tâm và mở đường cho Hậu cùng Tượng f1.',
            'Đen đáp lại đối xứng, giành phần trung tâm của mình và mở đường cho Tượng f8.',
            'Mã ra f3 kèm nhịp tấn công tốt e5 – vừa phát triển quân vừa tạo đe dọa.',
            'Đen giữ tốt e5 bằng một nước phát triển tự nhiên; Mã c6 còn để mắt tới ô d4.',
            'Tượng ra c4, chĩa thẳng vào f7 – ô yếu nhất trận địa Đen vì lúc này chỉ có Vua bảo vệ.',
            'Phòng thủ Hai Mã: Đen phản công tốt e4 thay vì chờ đợi, nhưng cũng cho phép Mã Trắng nhảy lên g5 nhắm vào f7.',
            'Mã nhắm vào điểm yếu f7.',
            'Đen chặn đường Tượng c4.',
            'Trắng ăn tốt, mở lại đường chéo c4–f7; tốt d5 còn dọa ăn Mã c6 nên Đen phải phản ứng ngay.',
            'Nước tự nhiên nhưng mạo hiểm (an toàn hơn là …Na5).',
            'Hy sinh Mã! Trắng lôi Vua Đen ra ngoài.',
            'Đen nhận quân.',
            'Chiếu, đồng thời tấn công Mã d5.',
            'Vua phải ra e6 để bảo vệ Mã – Vua đứng giữa bàn cờ!',
            'Trắng tiếp tục đưa quân tấn công Mã d5 bị ghim. Vua Đen gặp vô vàn nguy hiểm.',
          ],
          caption: 'Đòn Gan rán: Vua bị kéo ra trung tâm trở thành mục tiêu.',
        },
      },
      {
        heading: 'Nhập thành khác cánh: cuộc đua',
        body: `Khi hai Vua nhập thành ở hai cánh khác nhau, thế cờ trở thành **cuộc đua tấn công**. Mỗi bên có thể đẩy tốt về phía Vua đối phương mà **không làm yếu Vua của mình** – vì tốt đó không nằm trong lá chắn của mình.

Nguyên tắc của cuộc đua:
- **Tốc độ là tất cả.** Mỗi nước phòng thủ thừa là một nhịp mất đi.
- **Mở cột** về phía Vua đối phương (thường bằng cách đổi tốt hoặc hy sinh tốt).
- **Loại bỏ quân phòng thủ** then chốt – Tượng g7 trong Dragon, Mã f6…
- Đôi khi một nước phòng thủ đúng lúc (như Kb1) giúp tránh các đòn chiếu bất ngờ.

Bên cạnh là biến Nam Tư của Dragon: Trắng đẩy h4–h5 để mở cột h; Đen dùng cột c và đòn hy sinh …Rxc3.`,
        diagram: {
          fen: '2rq1rk1/pp1bppbp/3p1np1/4n3/3NP2P/1BN1BP2/PPPQ2P1/2KR3R b - - 0 12',
          arrows: ['h4h5', 'e3h6', 'c8c3:red', 'e5c4:red'],
          caption: 'Dragon Nam Tư: Trắng tấn công bằng tốt h, Đen tấn công bằng quân trên cột c.',
        },
      },
      {
        heading: 'Mở cột bằng tốt: ví dụ thực tế',
        body: `Biến Soltis của Dragon là ví dụ đẹp về cuộc đua: Đen chặn tốt h bằng …h5, Trắng đáp lại bằng **g2–g4** – hy sinh tốt để mở cột h hoặc cột g.

Hãy để ý: Trắng không ngại cho đi một tốt, vì một cột mở về phía Vua đối phương đáng giá hơn nhiều. Trong thế nhập thành khác cánh, **tốt trước Vua đối phương là “đạn dược”**, không phải tài sản cần giữ.`,
        diagram: {
          fen: '2rq1rk1/pp1bppbp/3p1np1/4n3/3NP2P/1BN1BP2/PPPQ2P1/2KR3R b - - 0 12',
          moves: '12...h5 13.Bg5 Rc5 14.g4 hxg4 15.f4',
          notes: [
            'Đen chặn tốt h lại, không cho Trắng mở cột h dễ dàng.',
            'Tượng gây áp lực lên Mã f6 – quân phòng thủ quan trọng.',
            'Xe nâng lên hàng 5 – ý tưởng đặc trưng của biến Soltis: Xe vừa phòng thủ theo hàng ngang, vừa sẵn sàng cho đòn …Rxc3.',
            'Đòn đột phá! Trắng hy sinh tốt để phá thế tốt h5.',
            'Đen nhận tốt.',
            'Trắng đuổi Mã e5 và mở thêm đường cho quân. Cuộc đua tấn công diễn ra quyết liệt.',
          ],
          caption: 'Biến Soltis: dùng tốt làm “đạn dược” để mở cột.',
        },
      },
      {
        heading: 'Phòng thủ khi bị tấn công',
        body: `Khi Vua của em bị tấn công, hãy nhớ những nguyên tắc vàng:
- **Phản công ở trung tâm** – câu nói nổi tiếng: “Đòn tấn công ở cánh tốt nhất nên được đáp trả bằng phản công ở trung tâm”.
- **Đổi quân tấn công** của đối phương, đặc biệt là Hậu.
- **Đừng đẩy tốt trước Vua** khi bị tấn công – như vậy chỉ mở thêm cột cho đối phương.
- **Đưa thêm quân về phòng thủ**: một Mã ở f6 (hoặc f3) là người bảo vệ tốt nhất của Vua.

Trong thế cờ bên cạnh từ phía Đen: nếu Hậu Trắng và Tượng Trắng nhắm vào h7, Mã f6 là quân phòng thủ quan trọng nhất – đừng để nó bị đổi hoặc đuổi đi dễ dàng.`,
        tip: 'Mã f6 (với Đen) và Mã f3 (với Trắng) được gọi là “người vệ sĩ tốt nhất của Vua”.',
        diagram: {
          fen: 'r1bq1rk1/pp3ppp/2n1pb2/3n4/3P4/2NB1N2/PP3PPP/R1BQR1K1 w - - 6 11',
          orientation: 'black',
          arrows: ['d3h7:red', 'f6e7:blue', 'd5f6:blue'],
          highlights: ['h7:red'],
          caption: 'Đen cần sẵn sàng đưa Mã về f6 để bảo vệ h7.',
        },
      },
    ],
    keyTakeaways: [
      'Lá chắn tốt còn nguyên là lá chắn tốt nhất; mỗi nước tốt trước Vua tạo ra ô yếu.',
      'Đừng để Vua kẹt ở trung tâm khi thế cờ có thể mở – hãy nhập thành sớm.',
      'Nhập thành khác cánh = cuộc đua: tốc độ, mở cột và loại bỏ quân phòng thủ.',
      'Khi bị tấn công ở cánh, hãy phản công ở trung tâm và tìm cách đổi quân.',
    ],
  },

  // ───────────────────────────── 8. Tấn công thiểu số ─────────────────────────────
  {
    id: 'cl-tan-cong-thieu-so',
    category: 'chien-luoc',
    title: 'Tấn công thiểu số',
    subtitle: 'Hai tốt tấn công ba tốt – kế hoạch kinh điển của cấu trúc Carlsbad',
    level: 4,
    icon: '🐜',
    minutes: 14,
    intro:
      'Nghe có vẻ vô lý: tại sao lại dùng ít tốt để tấn công nhiều tốt hơn? Mục đích của tấn công thiểu số không phải là tạo tốt thông, mà là **tạo ra điểm yếu** trong cấu trúc tốt của đối phương. Đây là kế hoạch kinh điển trong Phòng thủ Gambit Hậu biến đổi tốt, được các Đại kiện tướng từ Capablanca đến Carlsen sử dụng.',
    sections: [
      {
        heading: 'Cấu trúc Carlsbad',
        body: `Cấu trúc Carlsbad hình thành sau khi Trắng đổi cxd5 và Đen bắt lại exd5 trong Gambit Hậu:
- Trắng: tốt a2, b2 bên cánh Hậu (2 tốt) và d4, e3 ở trung tâm.
- Đen: tốt a7, b7, c6 bên cánh Hậu (3 tốt) và d5.
- Cột c **nửa mở** cho Trắng, cột e nửa mở cho Đen.

Trắng có **thiểu số** (2 chống 3) bên cánh Hậu. Kế hoạch: đẩy b4–b5 để đổi tốt b5 lấy tốt c6, để lại cho Đen một điểm yếu.`,
        diagram: {
          fen: 'r1bqrnk1/pp2bppp/2p2n2/3p2B1/3P4/2NBPN2/PPQ2PPP/R4RK1 w - - 4 11',
          arrows: ['b2b4', 'b4b5'],
          highlights: ['a2:green', 'b2:green', 'a7:yellow', 'b7:yellow', 'c6:yellow'],
          caption: 'Carlsbad: hai tốt a, b của Trắng chuẩn bị tấn công ba tốt a, b, c của Đen.',
        },
      },
      {
        heading: 'Tiến hành tấn công thiểu số',
        body: `Diễn biến điển hình: Trắng đặt Xe ở b1 (hỗ trợ tốt b), đẩy b4, a4 rồi b5. Sau khi đổi tốt trên b5, có hai khả năng chính cho Đen:
- **…cxb5** → tốt d5 của Đen trở thành **tốt cô lập**, và Trắng có ô c5 cho quân.
- **Để Trắng bắt bxc6** rồi Đen bắt lại bằng tốt b → tốt **c6 trở thành tốt lạc hậu** trên cột c nửa mở, Trắng dồn Xe và Hậu tấn công nó.

Trong cả hai trường hợp, Trắng đã đạt mục tiêu: tạo ra một điểm yếu lâu dài.`,
        diagram: {
          fen: 'r1bqrnk1/pp2bppp/2p2n2/3p2B1/3P4/2NBPN2/PPQ2PPP/R4RK1 w - - 4 11',
          moves: '11.Rab1 Ng6 12.b4 a6 13.a4 Bd6 14.b5 axb5 15.axb5',
          notes: [
            'Xe sang b1 – hỗ trợ tốt b tiến lên.',
            'Đen chuyển Mã sang cánh Vua, chuẩn bị phản công.',
            'Bắt đầu tấn công thiểu số.',
            'Đen chặn b5 tạm thời.',
            'Trắng chuẩn bị b5 bằng sự hỗ trợ của tốt a.',
            'Đen đưa Tượng sang đường chéo tấn công cánh Vua.',
            'Đột phá! Tốt b5 thách thức chuỗi tốt Đen.',
            'Đen đổi tốt.',
            'Bây giờ tốt c6 bị tấn công. Nếu …cxb5, tốt d5 sẽ cô lập; nếu để Trắng bxc6, tốt c6 thành lạc hậu.',
          ],
          caption: 'Tấn công thiểu số trong thực tế.',
        },
      },
      {
        heading: 'Mục tiêu sau khi tấn công thiểu số',
        body: `Sau khi điểm yếu đã hình thành, kế hoạch của Trắng rất rõ ràng:
- Xếp Xe kép trên cột c (nếu c6 là tốt lạc hậu) hoặc gây áp lực lên d5 (nếu d5 cô lập).
- Đưa Mã tới các ô c5, e5 hoặc a4–c5.
- Đổi quân để đến gần tàn cuộc – nơi điểm yếu tĩnh bộc lộ rõ nhất.

Thế cờ bên cạnh cho thấy cấu trúc sau khi Đen buộc phải chấp nhận tốt c6 lạc hậu: Trắng chỉ cần chậm rãi dồn lực lượng lên cột c.`,
        tip: 'Tấn công thiểu số không vội vàng: Trắng cần chuẩn bị đầy đủ (Xe b1, tốt a4, đôi khi Mã a4) trước khi đẩy b5.',
        diagram: {
          fen: 'r1bqr1k1/1p3ppp/2pb1nn1/1P1p2B1/3P4/2NBPN2/2Q2PPP/1R3RK1 b - - 0 15',
          arrows: ['b5c6:red', 'c2c6:blue'],
          highlights: ['c6:red', 'd5:yellow'],
          caption: 'Tốt c6 bị tấn công: Đen phải chọn giữa tốt d5 cô lập hoặc tốt c6 lạc hậu.',
        },
      },
      {
        heading: 'Đen phản công như thế nào?',
        body: `Đen không ngồi chờ! Các phương án phản công chính:
- **Tấn công cánh Vua:** đưa Mã sang g6 (qua f8), Tượng sang d6, Mã nhảy **e4** (ô tiền đồn tuyệt vời trong cấu trúc này), đôi khi đẩy …f5 để củng cố Mã e4.
- **Ngăn chặn b5:** đẩy …b5 sớm để chặn đứng tốt b – nhưng nước này để lại ô c5 yếu.
- **Đột phá trung tâm …c5** trong một số trường hợp, chấp nhận tốt treo.

Vì vậy, cấu trúc Carlsbad là cuộc đua: Trắng tấn công cánh Hậu, Đen tấn công cánh Vua.`,
        diagram: {
          fen: 'r1bqrnk1/pp2bppp/2p2n2/3p2B1/3P4/2NBPN2/PPQ2PPP/R4RK1 w - - 4 11',
          orientation: 'black',
          arrows: ['f6e4:red', 'f8g6:red', 'e7d6:red'],
          highlights: ['e4:red'],
          caption: 'Phản công của Đen: Mã e4, Mã g6 và Tượng d6 nhắm vào cánh Vua Trắng.',
        },
      },
    ],
    keyTakeaways: [
      'Tấn công thiểu số nhằm tạo điểm yếu (tốt c6 lạc hậu hoặc d5 cô lập), không phải tạo tốt thông.',
      'Chuẩn bị bằng Rb1, a4 rồi mới đẩy b5.',
      'Sau khi điểm yếu hình thành, dồn Xe lên cột c và tiến gần tàn cuộc.',
      'Đen phản công cánh Vua với Mã e4, Mã g6 – cuộc đua hai cánh.',
    ],
  },

  // ───────────────────────────── 9. Phòng ngừa ─────────────────────────────
  {
    id: 'cl-phong-ngua',
    category: 'chien-luoc',
    title: 'Phòng ngừa – “Đối thủ muốn gì?”',
    subtitle: 'Nghệ thuật chặn kế hoạch của đối phương từ trong trứng nước',
    level: 4,
    icon: '🧠',
    minutes: 13,
    intro:
      'Petrosian và Karpov là hai nhà vô địch thế giới nổi tiếng với lối chơi “phòng ngừa”: họ ngăn chặn kế hoạch của đối thủ trước khi nó kịp thành hình. Tư duy phòng ngừa bắt đầu bằng một câu hỏi đơn giản nhưng mạnh mẽ: **“Nếu bây giờ đến lượt đối thủ đi, họ sẽ làm gì?”**',
    sections: [
      {
        heading: 'Câu hỏi vàng',
        body: `Phòng ngừa (Nimzowitsch gọi là *prophylaxis*) là những nước đi **ngăn chặn ý đồ của đối thủ** thay vì trực tiếp thực hiện kế hoạch của mình.

Thói quen cần rèn luyện: trước khi đi, hãy tưởng tượng đối thủ được đi thêm một nước. Họ muốn đặt quân vào đâu? Họ muốn đẩy tốt nào? Nếu ý đồ đó nguy hiểm, một nước phòng ngừa thường tốt hơn nước tấn công của em.

Ví dụ kinh điển trong Ván cờ Tây Ban Nha: Đen rất muốn chơi …Bg4 để ghim Mã f3, gây áp lực lên d4. Trắng chơi **h3** trước, ngăn hẳn ý đồ này, rồi mới đẩy d4.`,
        diagram: {
          fen: 'r1bq1rk1/2p1bppp/p1np1n2/1p2p3/4P3/1BP2N2/PP1P1PPP/RNBQR1K1 w - - 1 9',
          moves: '9.h3 Na5 10.Bc2 c5 11.d4',
          notes: [
            'Nước phòng ngừa nổi tiếng: không cho Tượng c8 lên g4 ghim Mã f3.',
            'Đen đuổi Tượng b3 (biến Chigorin).',
            'Tượng lùi về c2, vẫn nhắm vào cánh Vua Đen.',
            'Đen giành không gian cánh Hậu.',
            'Giờ Trắng mới chiếm trung tâm – Mã f3 không còn lo bị ghim.',
          ],
          caption: 'Tây Ban Nha: h3 chuẩn bị cho d4 bằng cách loại bỏ …Bg4.',
        },
      },
      {
        heading: 'Hạn chế quân đối phương',
        body: `Một dạng phòng ngừa phổ biến là **lấy đi ô tốt của quân đối phương** trước khi nó kịp tới đó.

Biến Petrosian trong Phòng thủ Ấn Độ – Hậu: sau 1.d4 Nf6 2.c4 e6 3.Nf3 b6, Trắng chơi **4.a3!** Nước đi trông có vẻ chậm chạp, nhưng nó ngăn …Bb4 (ghim Mã c3), chuẩn bị cho Nc3 và e4 với trung tâm vững chắc.

Đây là phong cách của Tigran Petrosian: không vội vàng, nhưng mỗi nước đi đều lấy đi một khả năng của đối thủ.`,
        diagram: {
          moves: '1.d4 Nf6 2.c4 e6 3.Nf3 b6 4.a3',
          notes: [
            'Trắng chiếm trung tâm bằng tốt d4 – khai cuộc Tốt Hậu – và mở đường cho Tượng c1.',
            'Đen phát triển Mã, kiểm soát ô e4 và chưa vội để lộ cấu trúc tốt của mình.',
            'Tốt c4 giành thêm không gian ở cánh Hậu và gây áp lực lên ô d5.',
            'Đen mở đường cho Tượng f8 – quân này đang chờ dịp ra b4 để ghim Mã nếu Trắng chơi Nc3.',
            'Trắng phát triển Mã về f3 và tạm hoãn Nc3, tránh để Tượng Đen ghim Mã bằng …Bb4.',
            'Đen chuẩn bị đưa Tượng ra b7 kiểm soát e4.',
            'Nước phòng ngừa: ô b4 bị lấy đi, Tượng f8 không thể ghim Mã c3. Trắng sẽ chơi Nc3 và e4.',
          ],
          caption: 'Biến Petrosian: a3 ngăn …Bb4.',
        },
      },
      {
        heading: 'Bảo vệ thừa (overprotection)',
        body: `Nimzowitsch còn đưa ra ý tưởng **bảo vệ thừa**: dồn nhiều quân bảo vệ một điểm chiến lược quan trọng **trước khi** nó bị tấn công. Khi đó, các quân bảo vệ được “tiếp năng lượng” từ điểm mạnh ấy, và có thể tự do hoạt động mà không lo điểm đó sụp đổ.

Trong Phòng thủ Pháp biến tiến tốt, tốt **e5** là trụ cột của thế trận Trắng. Trắng thường bảo vệ nó bằng Mã f3, Tượng f4, Xe e1, Hậu e2 – để khi Đen tấn công bằng …f6, e5 vẫn đứng vững.`,
        diagram: {
          fen: 'r1b1kbnr/pp3ppp/1qn1p3/2ppP3/3P4/P1P2N2/1P3PPP/RNBQKB1R b KQkq - 0 6',
          arrows: ['f3e5:blue', 'c1f4:blue', 'f7f6:red'],
          highlights: ['e5:green'],
          caption: 'Tốt e5 – điểm then chốt của Trắng – cần được bảo vệ thừa.',
        },
      },
      {
        heading: 'Phòng ngừa trước nguy hiểm chiến thuật',
        body: `Phòng ngừa không chỉ là chiến lược sâu xa. Ngay cả ở trình độ cơ bản, nó bắt đầu bằng việc **nhìn thấy đe dọa**.

Sau 1.e4 e5 2.Qh5 Nc6 3.Bc4, Trắng dọa **Qxf7#** (chiếu hết kiểu “Học trò”). Đen phải phòng thủ ngay: …g6 đuổi Hậu, sau đó …Nf6 vừa phát triển quân vừa chặn đường Hậu tới f7 và h5. Đen phòng thủ thành công và còn phát triển quân nhanh hơn.`,
        warning: 'Trước mỗi nước đi, hãy kiểm tra: “Đối thủ có nước chiếu, nước bắt quân hay nước đe dọa nào không?”',
        diagram: {
          fen: 'r1bqkbnr/pppp1ppp/2n5/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 3 3',
          moves: '3...g6 4.Qf3 Nf6',
          notes: [
            'Đen đuổi Hậu, ngăn Qxf7#.',
            'Hậu Trắng vẫn nhắm vào f7, lần này cùng Tượng c4.',
            'Mã f6 chặn đường Hậu và bảo vệ thêm. Đen phòng ngừa thành công và đã phát triển quân.',
          ],
          arrows: ['h5f7:red', 'c4f7:red'],
          caption: 'Nhìn thấy đe dọa Qxf7# và phòng ngừa kịp thời.',
        },
      },
    ],
    keyTakeaways: [
      'Luôn tự hỏi: “Nếu đối thủ được đi tiếp, họ sẽ làm gì?”.',
      'Nước phòng ngừa tốt lấy đi ô quan trọng của quân đối phương (h3 chống …Bg4, a3 chống …Bb4).',
      'Bảo vệ thừa các điểm chiến lược trọng yếu (Nimzowitsch).',
      'Phòng ngừa bắt đầu từ việc kiểm tra chiếu – bắt quân – đe dọa của đối thủ.',
    ],
  },

  // ───────────────────────────── 10. Không gian ─────────────────────────────
  {
    id: 'cl-loi-the-khong-gian',
    category: 'chien-luoc',
    title: 'Lợi thế không gian',
    subtitle: 'Bên nhiều không gian nên làm gì? Bên chật chội nên làm gì?',
    level: 3,
    icon: '🌌',
    minutes: 12,
    intro:
      'Khi tốt của em tiến xa hơn, phía sau chúng là một “hậu phương” rộng rãi để quân cơ động. Đối phương thì ngược lại: quân của họ chen chúc, cản trở nhau. Bài học này giúp em biết cách tận dụng không gian, và cách thoát khỏi thế chật chội.',
    sections: [
      {
        heading: 'Không gian là gì?',
        body: `Lợi thế không gian được đo bằng **số ô mà em kiểm soát trong phần sân của đối phương** (hàng 5–8 đối với Trắng). Tốt tiến xa – đặc biệt là tốt trung tâm – là nguồn tạo không gian chủ yếu.

Thế cờ bên cạnh (Ấn Độ cổ): tốt d5 và c4 của Trắng chiếm nhiều không gian bên cánh Hậu; tốt e5 của Đen cho Đen không gian bên cánh Vua. Mỗi bên chơi ở nơi mình rộng rãi hơn.`,
        diagram: {
          fen: 'r1bq1rk1/ppp1npbp/3p1np1/3Pp3/2P1P3/2N2N2/PP2BPPP/R1BQ1RK1 w - - 1 9',
          highlights: ['c5:green', 'c6:green', 'e6:green', 'f4:red', 'g4:red', 'd4:red'],
          caption: 'Trắng có không gian ở cánh Hậu (ô xanh), Đen có không gian ở cánh Vua (ô đỏ).',
        },
      },
      {
        heading: 'Khi em có nhiều không gian',
        body: `- **Tránh đổi quân**: quân càng nhiều trên bàn, đối phương càng chật chội.
- **Mở rộng thêm** bằng các nước tốt có tính toán, nhưng đừng đẩy quá xa.
- **Cơ động quân** sau chuỗi tốt: quân của em có thể chuyển từ cánh này sang cánh kia nhanh hơn đối phương.
- **Ngăn các nước đột phá** giải tỏa của đối phương.

Thế khóa Maróczy bên cạnh là ví dụ kinh điển: tốt c4 và e4 của Trắng khóa ô d5, khiến Đen rất khó đẩy …d5 hoặc …b5 để giải tỏa.`,
        diagram: {
          fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/2PNP3/2N1B3/PP2BPPP/R2Q1RK1 b - - 1 9',
          arrows: ['c4d5', 'e4d5'],
          highlights: ['d5:green', 'b5:yellow'],
          caption: 'Thế khóa Maróczy: c4 + e4 kiểm soát d5, Đen thiếu không gian.',
        },
      },
      {
        heading: 'Khi em bị chật chội',
        body: `Bên ít không gian có hai “phương thuốc”:
- **Đổi quân** – mỗi lần đổi, phần không gian ít ỏi lại đủ cho số quân còn lại.
- **Đột phá tốt** – thách thức chuỗi tốt của đối phương để giành lại không gian.

Trong Phòng thủ Pháp biến tiến tốt, Đen chật chội nhưng có sẵn hai đột phá: **…c5** (đã đi) đánh vào gốc d4, và **…f6** đánh vào đầu chuỗi e5. Nếu không có các đột phá này, Đen sẽ bị bóp nghẹt.`,
        tip: 'Bên chật chội đừng thụ động chờ đợi. Hãy chuẩn bị đột phá tốt và tìm cách đổi quân.',
        diagram: {
          fen: 'r1b1kbnr/pp3ppp/1qn1p3/2ppP3/3P4/P1P2N2/1P3PPP/RNBQKB1R b KQkq - 0 6',
          orientation: 'black',
          arrows: ['f7f6:red', 'c5d4:red'],
          caption: 'Đen chật chội trong Pháp tiến tốt nhưng có hai đòn đột phá: …cxd4 và …f6.',
        },
      },
      {
        heading: 'Cẩn thận: đừng mở rộng quá đà',
        body: `Tốt tiến quá xa sẽ trở thành mục tiêu: phía sau chúng xuất hiện nhiều ô yếu, và chúng cần quân bảo vệ. Một chuỗi tốt dài mà không có quân hỗ trợ có thể sụp đổ như lâu đài cát.

Nguyên tắc cân bằng: **không gian chỉ có giá trị khi quân của em tận dụng được nó**. Nếu quân của em không kịp theo sau tốt, hãy dừng lại và củng cố trước.`,
        warning: 'Mỗi bước tiến của tốt để lại ô yếu phía sau. Đừng đẩy tốt chỉ vì “trông có vẻ hung hăng”.',
        diagram: {
          fen: '4k3/pp3ppp/4p3/3pP3/3P4/8/PP3PPP/4K3 w - - 0 1',
          highlights: ['d4:red', 'e5:yellow', 'f4:yellow'],
          caption: 'Chuỗi tốt tiến xa cho không gian, nhưng gốc d4 và các ô phía sau cần được bảo vệ.',
        },
      },
    ],
    keyTakeaways: [
      'Không gian = số ô kiểm soát được trong phần sân đối phương.',
      'Nhiều không gian: tránh đổi quân, cơ động quân, ngăn đột phá giải tỏa.',
      'Chật chội: đổi quân và chuẩn bị đột phá tốt.',
      'Đừng đẩy tốt quá xa khi quân chưa kịp hỗ trợ.',
    ],
  },

  // ───────────────────────────── 11. Đổi quân ─────────────────────────────
  {
    id: 'cl-doi-quan',
    category: 'chien-luoc',
    title: 'Nghệ thuật đổi quân & chuyển hóa ưu thế',
    subtitle: 'Biết khi nào nên đổi, đổi quân nào, và biến ưu thế thành chiến thắng',
    level: 4,
    icon: '⚖️',
    minutes: 14,
    intro:
      'Mỗi lần đổi quân là một quyết định chiến lược: thế cờ sau khi đổi sẽ tốt hơn hay xấu hơn cho em? Capablanca – bậc thầy tàn cuộc – nổi tiếng vì biết đổi quân đúng lúc để biến ưu thế nhỏ thành tàn cuộc thắng. Bài học này cho em những nguyên tắc cốt lõi.',
    sections: [
      {
        heading: 'Hơn quân: đổi quân, đừng đổi tốt',
        body: `Khi em hơn vật chất, mỗi lần đổi quân làm **tỷ lệ ưu thế tăng lên**: hơn một Tốt khi còn 30 quân trên bàn chưa chắc thắng, nhưng hơn một Tốt trong tàn cuộc Tốt thường là thắng.

- **Bên hơn quân:** đổi quân lớn và quân nhẹ, giữ lại tốt.
- **Bên kém quân:** tránh đổi quân, tìm cách đổi tốt (để giảm số tốt mà đối phương có thể phong cấp), tạo biến chứng.

Bên cạnh: Trắng hơn một tốt (tốt a thông bên ngoài). Đổi Xe biến ván cờ thành tàn cuộc Vua + Tốt thắng dễ dàng.`,
        diagram: {
          fen: '3r4/4kppp/8/8/8/8/P4PPP/3R2K1 w - - 0 1',
          moves: '1.Rxd8 Kxd8 2.Kf1',
          notes: [
            'Đổi Xe! Trắng đơn giản hóa thế cờ.',
            'Bây giờ là tàn cuộc Vua + Tốt: Trắng có tốt a thông bên ngoài.',
            'Vua Trắng tiến vào trung tâm. Tốt a sẽ kéo Vua Đen đi xa, còn Vua Trắng ăn tốt cánh Vua.',
          ],
          caption: 'Hơn quân → đổi quân để đến tàn cuộc thắng.',
        },
      },
      {
        heading: 'Đổi quân tốt nhất của đối phương',
        body: `Không phải mọi cuộc đổi quân đều ngang nhau. Hãy hỏi: **sau khi đổi, quân nào còn lại trên bàn?**
- Đổi **quân phòng thủ then chốt** của đối phương (Mã f6 bảo vệ Vua, Tượng bảo vệ ô yếu…).
- Đổi **quân hoạt động nhất** của đối phương lấy quân kém hoạt động của mình.
- Đổi **Tượng xấu** của mình lấy **Tượng tốt** của đối phương.

Ví dụ: trong Phòng thủ Pháp, …Ba6 đổi Tượng xấu của Đen lấy Tượng f1 tốt của Trắng. Sau cuộc đổi, Đen thoát được quân kém nhất.`,
        diagram: {
          fen: 'r3kbnr/p1pq1ppp/np2p3/3pP3/3P4/2P2N2/PP3PPP/RNBQK2R w KQkq - 0 7',
          highlights: ['a6:green'],
          caption: 'Sau …Ba6 và Bxa6, Đen đã đổi được Tượng xấu của mình.',
        },
      },
      {
        heading: 'Bên tấn công tránh đổi, bên phòng thủ tìm đổi',
        body: `- Khi em đang **tấn công Vua**, mỗi quân là một chiến binh – đừng đổi chúng đi, đặc biệt là Hậu.
- Khi em đang **bị tấn công**, đổi quân (nhất là đổi Hậu) là cách phòng thủ hiệu quả nhất.
- Khi em **chật chội**, đổi quân giúp giải tỏa.
- Khi em có **nhiều không gian**, hãy giữ quân.

Trong thế Dragon bên cạnh, Trắng đang tấn công cánh Vua: Trắng muốn đổi Tượng g7 (quân phòng thủ số một của Đen) bằng Bh6, nhưng không muốn đổi các quân tấn công khác.`,
        diagram: {
          fen: '2rq1rk1/pp1bppbp/3p1np1/4n3/3NP2P/1BN1BP2/PPPQ2P1/2KR3R b - - 0 12',
          arrows: ['e3h6', 'h6g7:red'],
          highlights: ['g7:red'],
          caption: 'Trắng muốn đổi Tượng g7 – quân bảo vệ Vua Đen – bằng Bh6.',
        },
      },
      {
        heading: 'Chuyển hóa ưu thế',
        body: `Các Đại kiện tướng hiểu rằng ưu thế có nhiều **dạng**: vật chất, không gian, cột mở, tốt yếu của đối phương, Vua yếu… và một dạng có thể **chuyển hóa** thành dạng khác.

Ví dụ:
- Tấn công Vua → đối phương phải phòng thủ → em thắng một tốt → đổi quân → tàn cuộc thắng.
- Ưu thế không gian → đối phương chật chội → em giành cột mở → Xe xâm nhập hàng 7 → ăn tốt.

Đừng bám chặt vào một loại ưu thế. Khi đòn tấn công không còn hiệu quả, hãy “thu hoạch” nó dưới dạng khác. Tấn công thiểu số là ví dụ điển hình: biến cấu trúc tốt tốt hơn thành một điểm yếu cụ thể, rồi thành tàn cuộc thuận lợi.`,
        tip: 'Hãy tự hỏi thường xuyên: “Ưu thế của mình hiện nay là gì, và nó có còn tồn tại sau 5 nước nữa không?”',
        diagram: {
          fen: 'r1bqr1k1/1p3ppp/2pb1nn1/1P1p2B1/3P4/2NBPN2/2Q2PPP/1R3RK1 b - - 0 15',
          highlights: ['c6:red'],
          caption: 'Từ cấu trúc tốt tốt hơn → tạo điểm yếu c6 → tiến tới tàn cuộc ép tốt yếu.',
        },
      },
      {
        heading: 'Cẩn thận khi vào tàn cuộc Tốt',
        body: `Tàn cuộc Vua + Tốt là loại tàn cuộc **chính xác tuyệt đối**: một nhịp đi sai có thể biến thắng thành thua. Trước khi đổi quân cuối cùng để vào tàn cuộc Tốt, hãy tính kỹ:
- Ai có **tốt thông bên ngoài**?
- Vua của ai **hoạt động hơn**?
- Ai có **đối Vua**, ai còn **nước chờ** bằng tốt?

Ví dụ bên cạnh: tốt a thông bên ngoài kéo Vua Đen sang cánh Hậu, trong khi Vua Trắng tràn vào ăn tốt cánh Vua. Đây là lý do “tốt thông bên ngoài” là ưu thế quyết định trong tàn cuộc Tốt.`,
        warning: 'Nếu không chắc tàn cuộc Tốt thắng, đừng vội đổi quân cuối cùng – giữ Xe hoặc quân nhẹ thường an toàn hơn.',
        diagram: {
          fen: '8/8/6p1/P2k3p/8/3K4/6PP/8 w - - 0 1',
          moves: '1.a6 Kc6 2.a7 Kb7 3.Ke4 Kxa7 4.Kf4 Kb6 5.Kg5 Kc5 6.Kxg6',
          notes: [
            'Tốt a lao lên…',
            '…Vua Đen buộc phải đuổi theo.',
            'Tốt chỉ còn một bước nữa là phong Hậu – Vua Đen không còn lựa chọn nào khác ngoài lao về b7.',
            'Vua Đen chặn ô phong cấp – nhưng đã ở rất xa cánh Vua.',
            'Trong lúc đó Vua Trắng chạy sang cánh Vua.',
            'Đen ăn được tốt a nhưng Vua đã bị kéo vào góc bàn cờ.',
            'Vua Trắng tiếp tục hành quân sang cánh Vua, nhắm vào hai tốt g6, h5 đã mất chỗ dựa là Vua Đen.',
            'Vua Đen vội quay về, nhưng từ góc a7 nó luôn chậm hơn Vua Trắng vài nhịp trong cuộc đua sang cánh Vua.',
            'Vua Trắng áp sát tốt g6 – tốt này không có ai bảo vệ, và khi nó mất, tốt h5 cũng sẽ đổ theo.',
            'Đen cố đưa Vua về cứu cánh Vua nhưng đã quá muộn: Vua c5 còn cách tốt g6 quá xa.',
            'Vua Trắng ăn tốt g6 và sẽ thắng dễ dàng với hai tốt g, h.',
          ],
          caption: 'Tốt thông bên ngoài: “mồi nhử” kéo Vua đối phương đi xa.',
        },
      },
    ],
    keyTakeaways: [
      'Hơn quân: đổi quân, giữ tốt. Kém quân: tránh đổi quân, tìm cách đổi tốt.',
      'Đổi quân phòng thủ then chốt và quân hoạt động nhất của đối phương; đổi Tượng xấu của mình.',
      'Đang tấn công: giữ quân. Đang bị tấn công hoặc chật chội: tìm cách đổi.',
      'Ưu thế có nhiều dạng – hãy chuyển hóa nó kịp thời.',
      'Tính toán kỹ trước khi vào tàn cuộc Tốt.',
    ],
  },
];
