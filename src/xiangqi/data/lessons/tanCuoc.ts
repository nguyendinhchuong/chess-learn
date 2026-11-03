import type { XqLesson } from '../types';

export const LESSONS: XqLesson[] = [
  // ───────────────────────────── 1. Nguyên tắc tàn cuộc ─────────────────────────────
  {
    id: 'xq-tc-nguyen-tac',
    category: 'tan-cuoc',
    title: 'Nguyên tắc vàng của tàn cuộc cờ tướng',
    subtitle: 'Tướng tham chiến, khốn bí, độ cao của Tốt và sức mạnh của Sĩ Tượng',
    level: 1,
    icon: '🏁',
    minutes: 14,
    intro:
      'Các danh thủ thường nói: muốn mạnh cờ tướng, hãy học tàn cuộc thật kỹ. Khi bàn cờ chỉ còn vài quân, mỗi nước đi đều có trọng lượng, và những quy luật riêng của cờ tướng hiện ra rõ nhất: Tướng không ra khỏi cung nhưng vẫn là một quân chiến đấu, **hết nước đi là thua**, Tốt càng xuống thấp càng yếu, còn vài quân Sĩ Tượng có thể cứu cả ván cờ. Bài này tổng hợp những nguyên tắc nền tảng mà em sẽ gặp lại trong mọi bài tàn cuộc tiếp theo.',
    sections: [
      {
        heading: 'Tướng là một quân chiến đấu',
        body: `Trong cờ tướng, Tướng không bao giờ ra khỏi cung. Nhưng trong tàn cuộc, Tướng vẫn là một quân tấn công rất mạnh nhờ **luật lộ mặt tướng**: hai Tướng không được đứng đối mặt trên cùng một cột mà không có quân cản. Vì vậy, Tướng của em đứng ở cột nào thì **cả cột đó bị cấm** đối với Tướng đối phương.

Ở ví dụ bên cạnh, Xe khóa hàng giữa cung, đẩy Tướng Đen sang góc. Sau đó chỉ cần Tướng Đỏ bước ra lộ giữa là Tướng Đen hết đường đi: điểm đáy giữa cung bị "lộ mặt", điểm phía trước bị Xe khống chế.

Ghi nhớ: trong tàn cuộc, hãy luôn hỏi **"Tướng mình đã đứng đúng cột chưa?"**`,
        tip: 'Lộ giữa là vị trí mạnh nhất của Tướng trong tàn cuộc: từ đó nó chia đôi cung đối phương.',
        diagram: {
          fen: '4k4/9/9/9/9/9/9/9/9/3K4R w - - 0 1',
          moves: 'X1.8 Tg5-6 Tg6-5',
          notes: [
            'Xe khóa hàng giữa cung của Đen. Tướng Đen không lên được, lộ 4 của Đen lại bị Tướng Đỏ khóa.',
            'Nước duy nhất: Tướng Đen sang góc đáy lộ 6.',
            'Tướng Đỏ ra lộ giữa. Tướng Đen không còn nước đi nào – và trong cờ tướng, như thế là thua.',
          ],
          caption: 'Xe khóa hàng, Tướng khóa cột.',
        },
      },
      {
        heading: 'Hết nước đi là thua: vũ khí khốn bí',
        body: `Đây là khác biệt lớn nhất với cờ vua. Trong cờ vua, bên hết nước đi mà không bị chiếu được hòa. Trong cờ tướng, **bên hết nước đi bị xử thua** – dù Tướng có bị chiếu hay không. Người ta gọi đó là **khốn bí**.

Điều này biến những nước đi "không làm gì" thành vũ khí:
- **Nước chờ**: đi một nước vô hại để đối phương phải đi – và tự phá thế của mình.
- **Khốn bí cục bộ**: khi hầu hết quân đối phương không đi được, quân duy nhất còn đi được buộc phải bước vào chỗ chết.

Ở thế bên cạnh, Tướng Đen không đi được, Sĩ tâm cung bị ghim (rời cột giữa là hai Tướng đối mặt), Sĩ góc không có chỗ đi. Sau khi Xe lên mép trên cung, Đen chỉ còn nước Tượng – và Tượng đi đâu cũng bị Xe ăn.`,
        diagram: {
          fen: '4kab2/4a4/9/9/9/9/9/9/4K4/3R5 w - - 0 1',
          moves: 'X6.7 T7.9 X6-1',
          notes: [
            'Xe lên mép trên cung. Đen chỉ còn những nước Tượng – mà Tượng nào cũng sẽ nằm trên hàng của Xe.',
            'Buộc phải đi, Đen đành đưa Tượng ra biên.',
            'Xe ăn Tượng. Đen đã thiếu Tượng, và Xe đơn sẽ thắng.',
          ],
          caption: 'Khốn bí cục bộ: quân duy nhất còn đi được phải chết.',
        },
      },
      {
        heading: 'Tốt: càng cao càng quý',
        body: `Tốt không bao giờ đi lùi, nên mỗi bước tiến đều là một quyết định không thể rút lại. Trong tàn cuộc, người ta phân biệt:
- **Tốt cao**: chưa xuống quá mép trên cung đối phương – khống chế được nhiều điểm, linh hoạt nhất.
- **Tốt thấp**: ở hàng giữa cung (hàng thứ hai tính từ đáy).
- **Lão tốt (Tốt đáy)**: đã xuống hàng cuối, chỉ còn đi ngang và khống chế hai điểm bên cạnh.

Ở thế bên cạnh, Tốt cao khống chế ba điểm (xanh), còn lão tốt chỉ còn hai điểm ở hàng đáy (đỏ). Kết quả thực tế rất rõ ràng: một Tốt cao hay Tốt thấp cùng Tướng thắng được Tướng đơn, còn **lão tốt thì chỉ hòa**. Pháo + lão tốt đối Tướng đơn cũng chỉ hòa. Vì vậy quy tắc vàng là: **đừng vội đẩy Tốt xuống đáy**.`,
        warning: 'Trước khi đẩy Tốt xuống hàng đáy – nhất là để chiếu hay ăn quân – hãy hỏi: "Sau nước này, Tốt còn làm được gì?".',
        diagram: {
          fen: '6P2/4k4/3P5/9/9/9/9/9/9/3K5 w - - 0 1',
          highlights: ['d8:green', 'c7:green', 'e7:green', 'f9:red', 'h9:red'],
          caption: 'Tốt cao khống chế ba điểm, lão tốt chỉ còn hai điểm ở hàng đáy.',
        },
      },
      {
        heading: 'Giá trị quân thay đổi khi bàn cờ thưa',
        body: `Thang điểm quen thuộc (Xe ≈ 9, Pháo ≈ 4,5, Mã ≈ 4, Sĩ/Tượng ≈ 2, Tốt ≈ 1–2) chỉ đúng ở khai cuộc và trung cuộc. Trong tàn cuộc:
- **Pháo yếu đi** vì thiếu ngòi: Pháo đơn không thắng nổi Tướng đơn; cần thêm một Sĩ (làm ngòi) mới thắng.
- **Mã mạnh lên**: Mã cùng Tướng thắng Tướng đơn ở mọi thế và gần như luôn thắng Tướng có một Sĩ. Thế bên cạnh là một "lưới Mã" điển hình – Tướng Đen đã hết nước đi.
- **Tốt qua sông** quý hơn nhiều so với lúc khai cuộc, nhất là khi đi cùng một quân khác.
- **Sĩ Tượng** của bên phòng thủ trở thành tấm lá chắn: chúng che Tướng, và còn cho bên phòng thủ những **nước chờ** để tránh khốn bí.

Hệ quả thực tế: khi đổi quân vào tàn cuộc, **một Mã thường đáng giá hơn một Pháo**.`,
        diagram: {
          fen: '2N6/9/4k4/9/9/9/9/9/9/5K3 b - - 0 1',
          highlights: ['d7:red', 'e8:red', 'f7:red', 'e7:yellow'],
          caption: 'Lưới Mã: Mã khống chế hai điểm, Tướng Đỏ khóa cột thứ ba – Đen hết nước đi.',
        },
      },
      {
        heading: 'Sĩ Tượng: tấm vé hòa của bên yếu',
        body: `Một trong những bài học quan trọng nhất của tàn cuộc cờ tướng: **quân phòng thủ cứu được rất nhiều thế cờ kém**. Phân tích máy tính toàn bộ các thế cờ nhỏ cho thấy:
- Một Tốt đối Sĩ Tượng toàn, đối Tượng đôi hay Sĩ đôi: hòa (gần như mọi thế).
- Mã đơn đối Sĩ đôi hay Tượng đôi: phần lớn là hòa.
- Ngay cả **Xe đơn** cũng không phá được Sĩ Tượng toàn khi chúng đứng đúng vị trí (thế bên cạnh).

Từ đó rút ra hai lời khuyên ngược chiều nhau:
- **Bên kém quân:** giữ Sĩ Tượng đến cùng, dựng pháo đài sớm, và tìm cách đổi Tốt của đối phương.
- **Bên hơn quân:** đừng vội đổi hết quân; hãy giữ Tốt và những quân phối hợp được với nhau, ra đòn trước khi đối phương kịp dựng pháo đài.`,
        diagram: {
          fen: '3ak1b2/4a4/4b4/9/9/9/9/9/9/3K4R w - - 0 1',
          highlights: ['d9:green', 'e8:green', 'e7:green', 'g9:green'],
          caption: 'Pháo đài Sĩ Tượng toàn: Xe đơn không phá được.',
        },
      },
      {
        heading: 'Luật hòa cần nhớ trong tàn cuộc',
        body: `Tàn cuộc là nơi các luật hòa thường được áp dụng nhất. Theo luật được dùng trong ứng dụng này:
- **Không bên nào còn Xe, Mã, Pháo hay Tốt** (chỉ còn Tướng, Sĩ, Tượng): hòa ngay, như thế bên cạnh.
- **60 nước mỗi bên không ăn quân**: hòa. Bên mạnh phải tiến triển trong giới hạn đó.
- **Lặp lại thế cờ ba lần**: hòa – trừ khi một bên chiếu liên tục trong suốt vòng lặp.
- **Chiếu dai bị xử thua**: bên chiếu liên tục để ép lặp lại thế cờ sẽ bị xử thua, nên bên yếu không thể "câu hòa" bằng cách chiếu mãi. (Trong thi đấu chính thức còn có luật cấm đuổi bắt dai.)

Hiểu luật giúp em biết khi nào nên tìm hòa và khi nào phải tranh thủ từng nước để thắng.`,
        diagram: {
          fen: '3akab2/9/4b4/9/9/9/9/9/4A4/3AK4 w - - 0 1',
          caption: 'Chỉ còn Tướng, Sĩ, Tượng: hai bên không thể chiếu hết nhau – hòa.',
        },
      },
    ],
    keyTakeaways: [
      'Tướng tham chiến bằng lộ mặt tướng: Tướng mình đứng cột nào, Tướng đối phương không được vào cột đó.',
      'Hết nước đi là thua: nước chờ và khốn bí là vũ khí chính của tàn cuộc.',
      'Tốt càng cao càng quý; lão tốt hầu như không còn sức tấn công.',
      'Trong tàn cuộc Pháo yếu đi vì thiếu ngòi, Mã mạnh lên.',
      'Sĩ Tượng là tấm vé hòa của bên yếu; bên mạnh phải ra đòn trước khi pháo đài hoàn thành.',
    ],
  },

  // ───────────────────────────── 2. Một Tốt đối Tướng đơn ─────────────────────────────
  {
    id: 'xq-tc-tot-doi-tuong-don',
    category: 'tan-cuoc',
    title: 'Một Tốt đối Tướng đơn',
    subtitle: 'Tốt cao, Tốt thấp thắng – lão tốt chỉ hòa',
    level: 1,
    icon: '🎎',
    minutes: 12,
    intro:
      'Tàn cuộc nhỏ nhất của cờ tướng là một Tốt (cùng Tướng) đối Tướng đơn. Nghe thì đơn giản, nhưng nó chứa đủ ba bài học lớn của tàn cuộc: **Tướng tham chiến bằng lộ mặt tướng**, **thắng bằng khốn bí** (đối phương hết nước đi) và **đừng vội đẩy Tốt xuống đáy**. Kết luận cần nhớ: Tốt cao và Tốt thấp đều thắng được Tướng đơn, còn Tốt đã xuống hàng đáy (lão tốt) thì chỉ hòa.',
    sections: [
      {
        heading: 'Ba loại Tốt: cao, thấp, đáy',
        body: `Khi Tốt đã qua sông và tiến đến gần cung đối phương, người ta chia nó theo độ cao:
- **Tốt cao** (xanh): Tốt chưa xuống quá mép trên của cung – tức là còn ở hàng thứ ba tính từ đáy (ngang mép trên cung) trở lên.
- **Tốt thấp** (vàng): Tốt ở hàng thứ hai tính từ đáy, ngang tâm cung.
- **Tốt đáy** hay **lão tốt** (đỏ): Tốt đã xuống hàng cuối cùng.

Vì Tốt **không bao giờ đi lùi**, mỗi bước tiến là không thể rút lại. Tốt càng xuống thấp càng khống chế được ít điểm trong cung: lão tốt chỉ còn khống chế được hai điểm bên cạnh nó trên hàng đáy, và mọi điểm phía sau lưng nó (hàng giữa và mép trên của cung) đều an toàn với Tướng đối phương.

Thế cờ bên cạnh chỉ để minh họa ba độ cao; bài học sẽ xét riêng từng loại.`,
        tip: 'Muốn biết một Tốt còn "sống" hay không, hãy hỏi: nó còn có thể đi vào những điểm nào trong cung đối phương? Lão tốt chỉ còn đi ngang được trên hàng đáy.',
        diagram: {
          fen: '4k2P1/3P5/1P7/9/9/9/9/9/9/3K5 w - - 0 1',
          highlights: ['b7:green', 'd8:yellow', 'h9:red'],
          caption: 'Tốt cao (xanh), Tốt thấp (vàng) và lão tốt (đỏ).',
        },
      },
      {
        heading: 'Tốt cao thắng: Tướng khóa một cột, Tốt khóa phần còn lại',
        body: `Một mình Tốt không thể dồn Tướng đối phương. Bí quyết là dùng **luật lộ mặt tướng**: hai Tướng không được đứng đối mặt trên cùng một cột mà không có quân cản. Vì vậy Tướng Đỏ đứng ở lộ nào thì Tướng Đen **không được bước vào cột đó**.

Ở thế bên cạnh, Tướng Đỏ đứng ở lộ 6 nên cột này đã "đóng" với Tướng Đen. Tướng Đen chỉ còn hai cột (lộ 5 và lộ 6 của Đen) để đi lại. Tốt chỉ cần tiến vào đúng chỗ để khóa nốt những điểm còn lại.

Kết thúc không phải là chiếu bí mà là **khốn bí**: Tướng Đen không bị chiếu nhưng không còn nước đi hợp lệ nào – và trong cờ tướng, hết nước đi là **thua**.`,
        diagram: {
          fen: '9/4k4/9/9/6P2/9/9/9/9/3K5 w - - 0 1',
          moves: 'B3.1 Tg5/1 B3.1 Tg5.1 B3-4 Tg5/1 B4.1',
          notes: [
            'Tốt tiến thẳng về phía cung. Tướng Đỏ ở lộ 6 đã khóa cột này: Tướng Đen không thể sang lộ 4 của mình vì sẽ lộ mặt tướng.',
            'Tướng Đen lui về đáy cung. Nó chỉ còn đi lại trên hai cột: lộ 5 và lộ 6 của mình.',
            'Tốt lên ngang mép trên của cung – vẫn là Tốt cao, sẵn sàng bình vào cung.',
            'Đen không có gì để làm ngoài việc đi lại.',
            'Tốt bình vào lộ 4. Từ đây nó khống chế điểm ngay phía trước nó và điểm bên cạnh trên lộ giữa (mép trên cung), nên Tướng Đen ở tâm cung chỉ còn đường lui về đáy.',
            'Nước duy nhất: Tướng Đen lui về đáy cung.',
            'Tốt xuống hàng thứ hai, khống chế điểm đáy ở lộ 4 và điểm tâm cung. Lộ 4 của Đen bị Tướng Đỏ khóa. Tướng Đen không còn nước đi nào – Đen thua vì khốn bí.',
          ],
          caption: 'Tướng khóa một cột, Tốt khóa phần còn lại: khốn bí.',
        },
      },
      {
        heading: 'Tốt thấp cũng thắng, nhưng phải đi ngang khéo léo',
        body: `Tốt thấp không còn khống chế được mép trên của cung (phía sau lưng nó), nhưng vẫn thắng nếu biết **bình ngang dồn Tướng**. Tốt ở hàng thứ hai khống chế điểm đáy ngay phía trước nó và hai điểm bên cạnh, nên nó có thể "quét" ngang qua cung, đẩy Tướng Đen lên trên rồi sang một bên.

Hãy chú ý hai điểm trong ví dụ:
- Tốt bình ngang từ ngoài vào trong, mỗi nước đều có mục đích khóa một điểm.
- Khi Tướng Đen đã bị dồn sang một bên, **Tướng Đỏ bình ra lộ giữa** để khóa luôn cột giữa – lúc đó Tướng Đen chỉ còn đúng một cột để chạy.`,
        diagram: {
          fen: '9/4k2P1/9/9/9/9/9/9/9/3K5 w - - 0 1',
          moves: 'B2-3 Tg5.1 B3-4 Tg5-6 B4-5 Tg6-5 B5-6 Tg5-6 Tg6-5 Tg6/1 Tg5.1 Tg6/1 B6-5',
          notes: [
            'Tốt bình vào gần cung. Nếu Tướng Đen lui xuống đáy, Tốt bình tiếp vào lộ 4 là Đen hết nước đi ngay.',
            'Tướng Đen khôn ngoan tiến lên mép trên của cung, tránh xa hàng đáy.',
            'Tốt bình vào lộ 4, khóa điểm tâm cung và điểm đáy của cột này.',
            'Nước duy nhất: lộ 4 của Đen bị Tướng Đỏ khóa, tâm cung bị Tốt khống chế, nên Tướng Đen phải bình sang lộ 6 của mình.',
            'Tốt bình vào lộ giữa, khóa điểm đáy giữa cung và hai điểm hai bên nó.',
            'Lại là nước duy nhất: Tướng Đen trở về lộ giữa.',
            'Tốt bình tiếp sang lộ 6. Tướng Đen không thể vào tâm cung (Tốt khống chế) cũng không thể sang lộ 4 (Tướng Đỏ khóa).',
            'Tướng Đen buộc phải bình sang lộ 6 của mình.',
            'Đến lúc Tướng Đỏ ra trận: bình ra lộ giữa. Bây giờ Tướng Đen không thể quay lại cột giữa nữa (lộ mặt tướng), chỉ còn đi lên xuống trên một cột.',
            'Tướng Đen lui xuống.',
            'Một nước chờ: Tướng Đỏ lên một bước, vẫn giữ lộ giữa. Đen phải đi tiếp trên cột duy nhất của mình.',
            'Tướng Đen xuống đáy cung.',
            'Tốt bình vào lộ giữa: khống chế điểm đáy giữa cung và điểm hàng thứ hai của cột bên cạnh. Tướng Đen hết nước đi – Đen thua.',
          ],
          caption: 'Tốt thấp quét ngang cung, Tướng Đỏ chiếm lộ giữa.',
        },
      },
      {
        heading: 'Lão tốt: chỉ hòa',
        body: `Khi Tốt đã xuống hàng đáy, nó chỉ còn đi ngang trên hàng này và chỉ khống chế được hai điểm bên cạnh. Mọi điểm ở tâm cung và mép trên của cung đều an toàn với Tướng Đen. Dù Tướng Đỏ khóa một cột, Tướng Đen vẫn luôn còn chỗ để đi lại – không bao giờ có khốn bí.

Đây là kết luận đã được kiểm chứng đầy đủ: **lão tốt (cùng Tướng) không thể thắng Tướng đơn ở bất kỳ thế nào**. Ván cờ sẽ kết thúc hòa do lặp lại nước đi hoặc do luật 60 nước không ăn quân.`,
        warning: 'Đừng để lão tốt đứng sát Tướng đối phương mà không có gì bảo vệ: Tướng Đen có thể ăn nó, và Tướng Đỏ không thể ra khỏi cung để bảo vệ Tốt.',
        diagram: {
          fen: '2P6/4k4/9/9/9/9/9/9/9/5K3 w - - 0 1',
          moves: 'B7-6 Tg5.1 B6-5 Tg5-4 Tg4-5 Tg4/1 Tg5.1 Tg4.1',
          notes: [
            'Lão tốt bình vào cung. Nó chỉ khống chế được hai điểm bên cạnh trên hàng đáy.',
            'Tướng Đen thản nhiên tiến lên: lão tốt không bao giờ với tới các điểm phía sau lưng nó.',
            'Tốt chiếm điểm đáy giữa cung.',
            'Tướng Đen bình sang lộ 4 của mình.',
            'Tướng Đỏ chiếm lộ giữa, cấm Tướng Đen trở lại cột giữa.',
            'Tướng Đen vẫn còn hai điểm trên lộ 4 để đi lại; chỉ có điểm đáy của cột này là bị Tốt khống chế.',
            'Đỏ không có cách nào tiến triển: Tốt không thể đi lùi, Tướng Đỏ không thể ra khỏi cung.',
            'Tướng Đen cứ đi lên đi xuống. Ván cờ hòa.',
          ],
          caption: 'Lão tốt không còn sức ép: Tướng Đen đi lại thoải mái.',
        },
      },
      {
        heading: 'Đừng vội xuống đáy – một nước chờ là đủ',
        body: `Sai lầm kinh điển nhất của người mới học: thấy Tướng đối phương bị dồn sát đáy cung liền đẩy Tốt xuống **chiếu**. Nước chiếu ấy biến Tốt thành lão tốt, và chiến thắng tan biến.

Ở thế bên cạnh, Tốt Đỏ ở tâm cung khống chế cả hai điểm mà Tướng Đen có thể đi tới: điểm đáy giữa cung và điểm ngay phía trước Tướng Đen. **Tướng Đen đã không còn nước đi** – nhưng đang đến lượt Đỏ, nên Đỏ chỉ cần đi một nước không làm hỏng thế khống chế này.

- **B5.1?** (mũi tên đỏ) chiếu, nhưng Tốt xuống đáy. Tướng Đen lên được hàng thứ hai và ván cờ chỉ còn hòa.
- **Tg6.1!** – một **nước chờ** – Đen hết nước đi và thua ngay.`,
        warning: 'Trước khi đẩy Tốt xuống hàng đáy, hãy tự hỏi: "Sau nước này Tốt còn khống chế được gì?". Nếu câu trả lời là "gần như không gì", hãy tìm một nước chờ.',
        diagram: {
          fen: '5k3/4P4/9/9/9/9/9/9/9/3K5 w - - 0 1',
          moves: 'Tg6.1',
          notes: ['Tướng Đỏ chỉ lên một bước, vẫn ở lộ 6. Đến lượt Đen: điểm phía trước và điểm bên cạnh Tướng Đen đều bị Tốt khống chế. Đen hết nước đi – thua.'],
          arrows: ['e8e9:red', 'd0d1'],
          caption: 'Nước chờ Tg6.1 thắng ngay; B5.1 chiếu thì chỉ hòa.',
        },
      },
    ],
    keyTakeaways: [
      'Tốt cao và Tốt thấp (cùng Tướng) thắng được Tướng đơn; lão tốt thì chỉ hòa.',
      'Tướng tham chiến bằng luật lộ mặt tướng: Tướng mình đứng cột nào, Tướng đối phương không được vào cột đó.',
      'Mục tiêu thường là khốn bí – Tướng đối phương không bị chiếu nhưng hết nước đi, và thế là thua.',
      'Tốt thấp thắng bằng cách bình ngang dồn Tướng, rồi Tướng mình chiếm lộ giữa.',
      'Đừng vội đẩy Tốt xuống đáy, kể cả để chiếu: một nước chờ thường mạnh hơn.',
    ],
  },

  // ───────────────────────────── 3. Tốt đối Sĩ, Tượng ─────────────────────────────
  {
    id: 'xq-tc-tot-doi-si-tuong',
    category: 'tan-cuoc',
    title: 'Một Tốt đối Sĩ, Tượng',
    subtitle: 'Vì sao một Tốt hiếm khi thắng được quân phòng thủ',
    level: 2,
    icon: '🛡️',
    minutes: 13,
    intro:
      'Ở bài trước, một Tốt cao thắng dễ dàng Tướng đơn. Nhưng chỉ cần bên phòng thủ còn **một Sĩ hoặc một Tượng**, bức tranh thay đổi hẳn. Lý do nằm ở chính vũ khí của Tốt: Tốt thắng nhờ **khốn bí**, mà quân phòng thủ lại mang đến cho đối phương những **nước chờ**. Bài này cho em biết khi nào một Tốt còn thắng được, và vì sao bên yếu nên giữ Sĩ Tượng đến cùng.',
    sections: [
      {
        heading: 'Tốt đối Sĩ đơn: chỉ thắng khi Tốt đã áp sát tâm cung',
        body: `Phân tích máy tính toàn bộ các thế cờ cho thấy: **Tốt đối Sĩ đơn phần lớn là hòa**. Đỏ chỉ có nhiều cơ hội thắng khi Tốt đã áp sát cung, nhất là ở **lộ giữa, ngang mép trên của cung** – từ đó Tốt khống chế tâm cung và hai điểm góc mép trên, nơi Sĩ hay đứng. Tốt ở xa hoặc ở cánh thì gần như luôn hòa.

Trong ví dụ bên cạnh, Sĩ Đen đứng ở góc mép trên, xa Tướng. Đỏ thắng nhờ hai nước chính xác:
- Tốt lên mép trên cung ở lộ giữa, dọa ăn Sĩ.
- Một **nước chờ** của Tướng: Tốt đang bị kẹp giữa hai Tướng nên chưa được bình ngang; Đỏ buộc Đen phải đi trước.`,
        tip: 'Một quân đứng giữa hai Tướng trên cùng một cột thì không được rời cột đó – kể cả Tốt của chính em. Hãy để ý điều này trước khi định bình Tốt.',
        diagram: {
          fen: '3k5/9/5a3/4P4/9/9/9/9/9/4K4 w - - 0 1',
          moves: 'B5.1 Tg4-5 Tg5.1 Tg5-4 B5-4 Tg4.1 B4.1 Tg4/1 B4-5',
          notes: [
            'Nước duy nhất để thắng! Tốt lên mép trên cung ở lộ giữa, khống chế tâm cung và dọa bình sang ăn Sĩ.',
            'Sĩ chỉ còn đường lui về tâm cung, nhưng như thế còn thua nhanh hơn. Tướng Đen về lộ giữa – lúc này Tốt nằm giữa hai Tướng nên tạm thời không được bình ngang.',
            'Nước chờ – và là nước duy nhất giữ được thắng lợi. Tướng Đỏ vẫn ở lộ giữa, buộc Đen phải tự phá thế.',
            'Đen đành đưa Tướng sang góc (đi Sĩ còn thua nhanh hơn). Tốt không còn bị kẹp giữa hai Tướng.',
            'Tốt ăn Sĩ. Còn lại Tốt cao đối Tướng đơn – thắng như bài trước.',
            'Tướng Đen lên hàng giữa cung.',
            'Tốt xuống hàng thứ hai, khống chế tâm cung và điểm đáy của lộ 4.',
            'Tướng Đen lui về góc đáy.',
            'Tốt bình vào lộ giữa: khống chế điểm phía trước Tướng Đen và điểm đáy giữa cung, lộ giữa còn bị Tướng Đỏ khóa. Đen hết nước đi – thua.',
          ],
          caption: 'Tốt áp sát tâm cung, nước chờ quyết định, rồi ăn Sĩ.',
        },
      },
      {
        heading: 'Phòng thủ bằng Sĩ: chính xác từng nước',
        body: `Khi Sĩ đứng ở tâm cung và được Tướng bảo vệ, Tốt khó làm gì được. Sĩ ở tâm cung khống chế bốn điểm góc cung: Tốt nào bước vào đó mà không được bảo vệ sẽ bị Sĩ ăn.

Nhưng phòng thủ không hề dễ. Ở ví dụ bên cạnh, có những lúc **chỉ một nước duy nhất giữ được hòa**; những nước trông rất tự nhiên như đưa Tướng sang bên lại thua ngay, vì Tốt ăn Sĩ ở tâm cung và Đen hết nước đi.

Quy tắc của bên phòng thủ:
- Giữ Sĩ ở tâm cung khi Tốt còn có thể bị Sĩ ăn; lui Sĩ về góc đáy khi cần nước chờ.
- Đừng để Tướng rời đáy giữa khi Tốt đang nhắm vào tâm cung.`,
        warning: 'Với bên phòng thủ, sai một nước là thua. Trước mỗi nước, hãy kiểm tra: nếu Tốt ăn quân của mình ngay lúc này, Tướng mình còn nước đi không?',
        diagram: {
          fen: '4k4/4a4/4P4/9/9/9/9/3K5/9/9 w - - 0 1',
          moves: 'Tg6-5 S5/4 Tg5-4 S4.5 Tg4/1 S5/6 Tg4-5 Tg5-4',
          notes: [
            'Tướng Đỏ chiếm lộ giữa. Bây giờ nếu Tướng Đen bước sang bên, Tốt ăn Sĩ ở tâm cung và Đen hết nước đi.',
            'Sĩ lui về góc đáy – một trong hai nước giữ hòa.',
            'Tướng Đỏ sang lộ 4, khóa lộ 6 của Đen và giải phóng Tốt (Tốt không còn nằm giữa hai Tướng).',
            'Nước duy nhất giữ hòa: Sĩ trở lại tâm cung, được Tướng bảo vệ.',
            'Một nước chờ, đặt Đen trước câu hỏi khó.',
            'Lại là nước duy nhất: Sĩ lui về góc đáy bên kia.',
            'Tướng Đỏ trở lại lộ giữa.',
            'Nước duy nhất: Tướng Đen sang góc đáy, Sĩ ở góc kia. Đỏ vẫn không có cách tiến triển – với phòng thủ chính xác, đây là thế hòa.',
          ],
          caption: 'Phòng thủ bằng Sĩ: hòa, nhưng phải đi chính xác.',
        },
      },
      {
        heading: 'Tốt đối Tượng đơn: Tượng luôn có nước chờ',
        body: `Với Tượng, việc phòng thủ còn dễ hơn: **Tốt đối Tượng đơn gần như luôn hòa**. Lý do rất đơn giản: Tượng có nhiều điểm để đi lại ngoài cung, xa tầm với của Tốt. Khi Tốt và Tướng Đỏ đã dồn Tướng Đen vào thế không còn nước đi, Đen chỉ việc **đi Tượng** – và khốn bí không bao giờ đến.

Thế bên cạnh chính là thế khốn bí ở cuối bài trước: Tướng Đen ở góc đáy không còn nước nào. Nhưng lần này Đen có thêm một Tượng.`,
        diagram: {
          fen: '5k3/4P4/b8/9/9/9/9/9/3K5/9 b - - 0 1',
          moves: 'T1/3 Tg6/1 T3.1 Tg6.1 T1/3',
          notes: [
            'Tướng Đen hết nước, nhưng Tượng thì không. Đen đi Tượng.',
            'Đỏ cũng chỉ biết đi chờ.',
            'Tượng đi tiếp. Tốt không thể với tới Tượng.',
            'Đỏ không có cách nào tiến triển.',
            'Tượng cứ đi lại – ván cờ hòa.',
          ],
          caption: 'Có Tượng, khốn bí không bao giờ đến.',
        },
      },
      {
        heading: 'Sĩ đôi, Tượng đôi, Sĩ Tượng toàn: một Tốt là không đủ',
        body: `Nếu một quân phòng thủ đã đủ để hòa trong phần lớn các thế, thì hai quân trở lên càng vững chắc. Phân tích đầy đủ cho thấy:
- **Một Tốt đối Tượng đôi:** luôn hòa.
- **Một Tốt đối Sĩ đôi:** gần như luôn hòa.
- **Một Tốt đối Sĩ Tượng toàn:** hòa, trừ khi bên phòng thủ tự đứng vào thế bị chiếu bí ngay.

Hơn nữa, Tốt càng tiến sâu càng dễ bị quân phòng thủ ăn: điểm giữa mép trên cung là điểm Tượng, bốn góc cung là điểm Sĩ. Ở thế bên cạnh, Tốt vừa lên mép trên cung đã bị Tượng ăn ngay.

Bài học cho cả hai bên:
- **Bên mạnh:** muốn thắng bằng Tốt, em cần ít nhất hai Tốt, hoặc thêm một quân khác.
- **Bên yếu:** giữ Sĩ Tượng đến cùng – chúng là vé hòa của em.`,
        warning: 'Đừng nghĩ "hơn một Tốt là thắng". Trong cờ tướng, một Tốt hơn thường chỉ có giá trị khi còn quân khác phối hợp.',
        diagram: {
          fen: '2bakab2/9/9/4P4/9/9/9/9/9/3K5 w - - 0 1',
          moves: 'B5.1 T7.5',
          notes: ['Tốt lên giữa mép trên cung…', '…và bị Tượng ăn ngay. Điểm này là điểm của Tượng.'],
          caption: 'Một Tốt đối Sĩ Tượng toàn: không có cơ hội.',
        },
      },
    ],
    keyTakeaways: [
      'Một Tốt đối Sĩ đơn phần lớn là hòa; Đỏ chỉ thắng khi Tốt đã áp sát tâm cung và đi chính xác.',
      'Một Tốt đối Tượng đơn gần như luôn hòa vì Tượng luôn có nước chờ.',
      'Một Tốt không thắng được Sĩ đôi, Tượng đôi hay Sĩ Tượng toàn.',
      'Quân đứng giữa hai Tướng trên một cột không được rời cột – kể cả Tốt của mình.',
      'Bên yếu: giữ Sĩ Tượng đến cùng. Bên mạnh: cần ít nhất hai Tốt hoặc thêm quân.',
    ],
  },

  // ───────────────────────────── 4. Hai – ba Tốt ─────────────────────────────
  {
    id: 'xq-tc-nhieu-tot',
    category: 'tan-cuoc',
    title: 'Hai – ba Tốt phá Sĩ Tượng',
    subtitle: 'Song Tốt liên kết, bắt đôi và những thế phòng thủ vững',
    level: 3,
    icon: '👬',
    minutes: 16,
    intro:
      'Một Tốt không làm gì được Sĩ Tượng, nhưng **hai Tốt cao phối hợp** lại là một sức mạnh thật sự: chúng bảo vệ lẫn nhau, khống chế cả một hàng ngang của cung và bắt đôi các quân phòng thủ. Bài này dạy em cách hai Tốt phá Sĩ đôi và Tượng đôi, cách bên phòng thủ dựng thế hòa với Sĩ + Tượng, và cách ba Tốt phá vỡ Sĩ Tượng toàn.',
    sections: [
      {
        heading: 'Song Tốt đối Sĩ đôi: bắt đôi và ăn Sĩ',
        body: `Hai Tốt cao đã qua sông thắng được Sĩ đôi trong gần như mọi thế cờ. Cách làm:
- Đưa từng Tốt vào **các điểm góc mép trên cung** – Sĩ ở góc đáy không ăn được chúng.
- Hạ Tốt xuống **hàng giữa cung**: từ đó mỗi Tốt khống chế điểm đáy trước mặt và tâm cung, dễ dàng **bắt đôi** hai Sĩ.
- Ăn Sĩ, rồi kết thúc bằng khốn bí.

Lưu ý cách hai Tốt luôn đứng **cạnh nhau hoặc che chở nhau**: một Tốt khống chế điểm bên cạnh nó, nên Tốt kia bước vào đó là an toàn.`,
        diagram: {
          fen: '3aka3/9/9/3P1P3/9/9/9/9/9/3K5 w - - 0 1',
          moves: 'B4.1 S4.5 B4-5 S5/4 B6.1 S6.5 B6.1 S5.4 B5-6 Tg5-6 Bt.1 Tg6.1 Bs-5 Tg6/1 B5.1',
          notes: [
            'Tốt vào góc mép trên cung. Sĩ ở góc đáy không với tới điểm này.',
            'Sĩ lên tâm cung để che chắn.',
            'Tốt bình vào lộ giữa, uy hiếp Sĩ ở tâm cung (Sĩ được Tướng bảo vệ).',
            'Sĩ lui về góc đáy.',
            'Tốt thứ hai lên đứng cạnh Tốt thứ nhất: hai Tốt liên kết, che chở cho nhau.',
            'Sĩ kia lên tâm cung.',
            'Tốt xuống hàng giữa cung: nó bắt đôi cả Sĩ ở tâm cung lẫn Sĩ ở góc đáy!',
            'Không cứu được cả hai, Đen thí Sĩ ra góc mép trên (các nước khác còn thua nhanh hơn).',
            'Tốt ăn Sĩ.',
            'Tướng Đen tránh sang lộ 6.',
            'Tốt trên ăn nốt Sĩ ở góc đáy. Tướng Đen chỉ còn một mình.',
            'Nước duy nhất của Đen.',
            'Tốt sau bình vào lộ giữa, khép lưới.',
            'Nước duy nhất.',
            'Tốt xuống tâm cung: khống chế điểm phía trước Tướng Đen và điểm đáy giữa cung (điểm này cũng bị lão tốt khống chế). Đen hết nước đi.',
          ],
          caption: 'Song Tốt liên kết bắt đôi hai Sĩ.',
        },
      },
      {
        heading: 'Song Tốt đối Tượng đôi: Tượng không vào được cung',
        body: `Trong bảy điểm của Tượng, chỉ có một điểm thuộc cung – điểm giữa mép trên; còn lại đều ở ngoài cung. Vì vậy Tượng **không che chắn được các điểm quanh Tướng**. Hai Tốt cao chỉ cần đi thẳng vào cung, phối hợp với Tướng Đỏ là thắng – trong ví dụ bên cạnh, Đen đi Tượng thế nào cũng thua cùng một số nước.

Hai Tốt cao thắng Tượng đôi trong hầu hết các thế. Nhưng nếu một Tốt đã xuống đáy, kết quả gần như luôn là hòa – lại là bài học "đừng vội xuống đáy".`,
        diagram: {
          fen: '2b1k1b2/9/9/3P1P3/9/9/9/9/9/3K5 w - - 0 1',
          moves: 'B6.1 T3.5 B4.1 T5.7 B6.1 T7/9 B4.1 T9.7 B6.1',
          notes: [
            'Tốt vào góc mép trên cung.',
            'Tượng lên giữa mép trên – nhưng không cản được gì.',
            'Tốt thứ hai vào góc bên kia. Hai Tốt kẹp Tượng ở giữa.',
            'Tượng phải tránh đi.',
            'Tốt xuống hàng giữa cung.',
            'Đen chỉ biết đi Tượng chờ.',
            'Tốt thứ hai cũng xuống hàng giữa cung, khống chế tâm cung.',
            'Tượng tiếp tục đi lại vô ích.',
            'Tốt xuống đáy chiếu: lão tốt được Tướng Đỏ bảo vệ qua lộ mặt tướng, hai điểm thoát còn lại bị Tốt kia khống chế. Chiếu bí!',
          ],
          caption: 'Tượng không vào cung, không che được Tướng.',
        },
      },
      {
        heading: 'Song Tốt đối Sĩ + Tượng: thế phòng thủ vững',
        body: `Thật đáng ngạc nhiên: một Sĩ + một Tượng lại chống song Tốt tốt hơn cả Sĩ đôi hay Tượng đôi. Phân tích đầy đủ cho thấy hai Tốt cao chỉ thắng khoảng **một phần ba** số thế, còn lại là hòa.

Bí quyết là phân công: **Sĩ ở tâm cung** khống chế bốn góc cung, **Tượng ở đáy** sẵn sàng làm nước chờ hoặc ăn Tốt vào điểm giữa mép trên. Khi cần, bên phòng thủ còn có thể **đổi Sĩ lấy một Tốt**, chuyển về thế một Tốt đối Tượng đơn – mà em đã biết là hòa.`,
        tip: 'Bên yếu đôi khi nên chủ động trả lại quân để về một thế hòa đã biết. Hãy thuộc các thế hòa cơ bản để nhận ra cơ hội đó.',
        diagram: {
          fen: '4k1b2/4a4/9/3P1P3/9/9/9/9/9/3K5 w - - 0 1',
          moves: 'B4-5 Tg5-6 B5.1 Tg6.1 B6.1 S5.4 B5-6 T7.9',
          notes: [
            'Hai điểm góc mép trên cung bị Sĩ khống chế, nên Đỏ đưa Tốt vào lộ giữa.',
            'Tướng Đen sang góc đáy (Đen có vài cách giữ hòa).',
            'Tốt lên mép trên cung, sẵn sàng che chở Tốt kia khi nó vào góc.',
            'Tướng Đen lên hàng giữa cung, đứng cạnh bảo vệ Sĩ.',
            'Tốt thứ hai vào góc mép trên, được Tốt lộ giữa bảo vệ.',
            'Đen chủ động đổi Sĩ lấy Tốt!',
            'Đỏ ăn lại.',
            'Còn lại một Tốt đối Tượng đơn: Tượng luôn có nước chờ – hòa.',
          ],
          caption: 'Đổi Sĩ lấy Tốt để về thế Tốt đối Tượng – hòa.',
        },
      },
      {
        heading: 'Ba Tốt đối Sĩ Tượng toàn',
        body: `Muốn phá Sĩ Tượng toàn chỉ bằng Tốt, thường cần **ba Tốt cao**. Khi ba Tốt đã áp sát cung, chúng tạo thành một bức tường: hai Tốt hạ xuống hàng giữa cung bắt Sĩ, Tốt thứ ba khóa tâm cung.

Thế bên cạnh đã được kiểm chứng bằng máy: **Đỏ thắng bắt buộc sau 6 nước**, mỗi nước của Đen đều là cách chống cự dai dẳng nhất. Hãy chú ý cách hai Tốt ở hai góc lần lượt xuống hàng giữa cung, kẹp Sĩ ở tâm cung từ hai phía.

Nếu ba Tốt còn ở xa, bên phòng thủ có thời gian dàn trận, và kết quả phụ thuộc rất nhiều vào vị trí cụ thể – đừng coi là chắc thắng.`,
        diagram: {
          fen: '2bakab2/9/3P1P3/4P4/9/9/9/9/9/3K5 w - - 0 1',
          moves: 'B6.1 S4.5 B4.1 S5.4 B5.1 T3.1 B5-6 T1/3 Bs-5 T3.1 B6.1',
          notes: [
            'Tốt xuống hàng giữa cung, dọa ăn Sĩ ở góc đáy.',
            'Sĩ né lên tâm cung, được Tướng bảo vệ.',
            'Tốt thứ hai cũng xuống: Sĩ tâm cung bị kẹp giữa hai Tốt, Sĩ góc đáy bên kia cũng bị nhắm.',
            'Sĩ chạy ra góc mép trên cung.',
            'Tốt thứ ba lên mép trên cung, uy hiếp chính con Sĩ vừa chạy ra.',
            'Đen không cứu được Sĩ, đành đi Tượng chờ.',
            'Tốt ăn Sĩ.',
            'Tượng trở về.',
            'Tốt sau quay về lộ giữa, khóa tâm cung.',
            'Đen lại chỉ có nước Tượng.',
            'Tốt xuống đáy chiếu. Tướng Đen không thể ăn Tốt (sẽ lộ mặt Tướng Đỏ), tâm cung bị hai Tốt khống chế, góc còn lại là Sĩ của chính mình. Chiếu bí!',
          ],
          caption: 'Ba Tốt cao phá Sĩ Tượng toàn: thắng bắt buộc sau 6 nước.',
        },
      },
      {
        heading: 'Đừng tham ăn Tượng bằng Tốt',
        body: `Một Tốt xuống đáy để ăn quân và chiếu Tướng – nghe thật hấp dẫn! Nhưng ở thế bên cạnh, **B7.1?** (mũi tên đỏ) ăn Tượng, chiếu Tướng, rồi... ván cờ chỉ còn hòa: Tốt đã thành lão tốt, Tốt còn lại không đủ sức một mình.

Cách thắng đúng bắt đầu bằng một nước rất bình thường: Tướng Đỏ chiếm lộ giữa. Sau đó Tốt thứ hai mới lên, ăn Tượng giữa và cùng Tốt thấp khép lưới. Để ý rằng ở cuối ván, một Tốt cũng xuống đáy – nhưng đúng lúc, khi nó trực tiếp tham gia chiếu bí.`,
        warning: 'Trước khi dùng Tốt ăn quân ở hàng đáy, hãy hỏi: "Sau đó Tốt này còn làm được gì?". Một quân phòng thủ bị ăn không đáng bằng một Tốt còn sống.',
        diagram: {
          fen: '2bk5/2P6/b8/9/3P5/9/9/9/9/3K5 w - - 0 1',
          moves: 'Tg6-5 T3.5 B6.1 T1/3 B6.1 T3.1 B6-5 Tg4-5 B5.1 Tg5-6 B7-6 T1/3 B6.1 T3.5 B6-5',
          notes: [
            'Nước đúng: Tướng Đỏ chiếm lộ giữa, cấm Tướng Đen bước sang.',
            'Đen đưa Tượng về giữa mép trên cung.',
            'Tốt thứ hai tiến lên.',
            'Tượng góc lui về đáy.',
            'Tốt lên góc mép trên cung, uy hiếp Tượng ở giữa.',
            'Tượng giữa đằng nào cũng mất; Đen đưa Tượng kia ra ngoài (các nước khác còn thua nhanh hơn).',
            'Tốt ăn Tượng giữa.',
            'Tướng Đen về đáy giữa.',
            'Chiếu! Tốt xuống tâm cung.',
            'Tướng Đen phải tránh sang lộ 6 (sang lộ 4 thì thua ngay ở nước sau).',
            'Tốt thấp bình vào lộ 6, khóa góc đáy bên kia.',
            'Đen chỉ còn đi Tượng.',
            'Bây giờ mới là lúc xuống đáy: lão tốt dọa ăn Tượng và khống chế đáy giữa cung.',
            'Tượng chạy về giữa.',
            'Lão tốt bình vào giữa chiếu, được Tốt tâm cung bảo vệ; điểm phía trước Tướng Đen cũng bị khống chế. Chiếu bí!',
          ],
          arrows: ['c8c9:red'],
          caption: 'B7.1? ăn Tượng nhưng chỉ hòa; Tg6-5! mới thắng.',
        },
      },
    ],
    keyTakeaways: [
      'Hai Tốt cao liên kết thắng được Sĩ đôi hoặc Tượng đôi trong gần như mọi thế.',
      'Đưa Tốt vào góc mép trên cung rồi hạ xuống hàng giữa cung để bắt đôi quân phòng thủ.',
      'Sĩ tâm cung + Tượng là thế phòng thủ vững: song Tốt chỉ thắng khoảng một phần ba số thế.',
      'Muốn phá Sĩ Tượng toàn bằng Tốt, thường cần ba Tốt cao áp sát cung.',
      'Đừng vội đưa Tốt xuống đáy, kể cả để ăn quân – trừ khi đó là nước kết thúc.',
    ],
  },

  // ───────────────────────────── 5. Mã trong tàn cuộc ─────────────────────────────
  {
    id: 'xq-tc-ma',
    category: 'tan-cuoc',
    title: 'Mã trong tàn cuộc',
    subtitle: 'Lưới Mã, Mã bắt Sĩ – và vì sao Tượng đôi, Sĩ đôi giữ được hòa',
    level: 3,
    icon: '🐎',
    minutes: 15,
    intro:
      'Khi bàn cờ thưa quân, Mã trở nên rất đáng giá: nó không cần ngòi như Pháo, lại khống chế cùng lúc nhiều điểm trong cung. Kết hợp với Tướng (khóa cột bằng lộ mặt tướng), Mã thắng được Tướng đơn và cả Tướng có một Sĩ. Nhưng Mã cũng có giới hạn: trước Tượng, Sĩ đôi hay Sĩ Tượng toàn đứng đúng chỗ, phần lớn các thế là hòa. Bài này dạy em cả cách thắng lẫn những giới hạn đó.',
    sections: [
      {
        heading: 'Mã đối Tướng đơn: giăng lưới',
        body: `**Mã (cùng Tướng) thắng Tướng đơn ở mọi thế cờ khi bên có Mã đi trước.** Cách thắng rất đẹp: Tướng Đỏ khóa một cột, còn Mã đứng ở vị trí khống chế **hai điểm** quanh Tướng Đen. Thường thì kết thúc là khốn bí chứ không phải chiếu bí.

Hãy để ý cách Mã nhảy: nó không lao thẳng vào cung mà chọn những điểm từ đó khống chế các điểm thoát của Tướng Đen, đẩy Tướng Đen lên mép trên của cung rồi khép lưới.`,
        tip: 'Trước mỗi nước Mã, hãy đếm: sau nước này Tướng Đen còn mấy điểm để đi? Lưới Mã tốt là khi con số đó giảm dần về 0.',
        diagram: {
          fen: '4k4/9/9/9/9/9/9/9/9/2N2K3 w - - 0 1',
          moves: 'M7.6 Tg5.1 M6.5 Tg5.1 M5.6 Tg5-4 M6.8 Tg4-5 M8.7',
          notes: [
            'Mã xuất phát, hướng về trung tâm. Tướng Đỏ ở lộ 4 đã khóa lộ 6 của Đen.',
            'Tướng Đen lên tâm cung.',
            'Mã lên bờ sông, chuẩn bị qua hà.',
            'Tướng Đen lên mép trên của cung, cố tránh xa Mã.',
            'Mã qua sông, khống chế tâm cung và điểm góc cung ở lộ 6 của Đen. Tướng Đen chỉ còn một đường: sang lộ 4.',
            'Nước duy nhất.',
            'Mã nhảy ra cánh nhưng khống chế điểm phía sau Tướng Đen. Tướng Đen phải quay về lộ giữa.',
            'Lại là nước duy nhất.',
            'Mã xuống hàng đáy, sát góc cung: khống chế tâm cung và điểm mép trên lộ 4 của Đen; lộ 6 bị Tướng Đỏ khóa. Tướng Đen hết nước đi – khốn bí!',
          ],
          caption: 'Lưới Mã: Mã khống chế hai điểm, Tướng khóa một cột.',
        },
      },
      {
        heading: 'Mã đối Sĩ đơn: bắt Sĩ rồi giăng lưới',
        body: `Thêm một Sĩ cho bên phòng thủ, Mã vẫn **thắng trong gần như mọi thế cờ**. Kế hoạch thường gặp:
- Dùng Mã và Tướng dồn Tướng Đen vào thế **chỉ còn đi được Sĩ**.
- Chiếu để buộc Tướng Đen phải nhường chỗ, rồi **ăn Sĩ**.
- Còn lại Mã đối Tướng đơn – giăng lưới như phần trước.

Một chi tiết quan trọng: khi Mã ăn Sĩ ở tâm cung, Tướng Đen đứng ngay bên cạnh nhưng **không ăn lại được**, vì bước vào lộ giữa là lộ mặt với Tướng Đỏ. Tướng Đỏ đã "bảo vệ" Mã từ xa!`,
        diagram: {
          fen: '9/9/2Nk1a3/9/9/9/9/9/4K4/9 w - - 0 1',
          moves: 'M7/8 S6/5 M8.6 S5/6 M6.8 S6.5 M8.7 Tg4/1 M7/5 Tg4/1 M5/6 Tg4.1 Tg5.1 Tg4/1 M6.4',
          notes: [
            'Mã lui lại để chuẩn bị nhảy vào điểm trung tâm ngay trước mặt Tướng Đen.',
            'Sĩ Đen về tâm cung.',
            'Mã đứng ngay trước mặt Tướng Đen. Từ đây nó có thể chuyển sang nhiều điểm quanh cung.',
            'Sĩ Đen lui về góc đáy.',
            'Mã nhảy ra cánh, khống chế điểm phía sau Tướng Đen. Lộ giữa bị Tướng Đỏ khóa, nên Tướng Đen không còn nước đi – Đen buộc phải đi Sĩ.',
            'Nước duy nhất: Sĩ về tâm cung.',
            'Chiếu! Tướng Đen phải lui.',
            'Nước duy nhất.',
            'Mã ăn Sĩ! Tướng Đen đứng ngay cạnh nhưng không ăn lại được: bước vào lộ giữa là lộ mặt Tướng Đỏ.',
            'Tướng Đen lui về góc đáy.',
            'Còn lại Mã đối Tướng đơn. Mã trở về điểm trước mặt Tướng Đen, khống chế tâm cung.',
            'Nước duy nhất.',
            'Nước chờ: Tướng Đỏ lên một bước, vẫn giữ lộ giữa.',
            'Tướng Đen chỉ còn đi lên đi xuống trên lộ 4 của mình.',
            'Mã khống chế cùng lúc điểm phía trước Tướng Đen và điểm đáy giữa cung. Đen hết nước đi – thua.',
          ],
          caption: 'Dồn Tướng, chiếu, ăn Sĩ, rồi giăng lưới.',
        },
      },
      {
        heading: 'Mã đối Tượng đơn: phần lớn là hòa',
        body: `Thật bất ngờ, đổi Sĩ thành Tượng thì kết quả khác hẳn: phân tích máy tính toàn bộ các thế cho thấy **Mã đối Tượng đơn phần lớn là hòa**. Mã thường chỉ thắng khi bắt được Tượng (Tượng đứng xa, không được che chở) hoặc khi Tướng Đen đã ở thế xấu.

Vì sao? Cách thắng của Mã dựa vào **khốn bí**: Tướng Đen bị lưới Mã vây, hết nước đi. Nhưng Tượng có rất nhiều nước đi vô hại ở ngoài cung, nên Đen luôn có **nước chờ**. Sĩ thì khác – Sĩ bị nhốt trong cung, hay chắn đường chính Tướng mình và dễ bị bắt.

Ở thế bên cạnh, lưới Mã đã giăng xong y hệt phần đầu bài: Tướng Đen không còn nước đi nào. Nhưng Đen còn Tượng!`,
        diagram: {
          fen: '2N3b2/9/4k4/9/9/9/9/9/9/5K3 b - - 0 1',
          moves: 'T7.9 M7/8 T9/7 M8.7 T7.9',
          notes: [
            'Tướng Đen hết nước, nhưng Tượng thì không: Đen đi Tượng và thoát khỏi khốn bí.',
            'Đỏ thử điều Mã sang hướng khác.',
            'Tượng trở về chỗ cũ.',
            'Mã lại giăng lưới.',
            'Và Tượng lại đi. Đỏ không thể vừa giữ lưới vừa bắt Tượng – ván cờ hòa.',
          ],
          caption: 'Tượng cho Đen những nước chờ, lưới Mã mất tác dụng.',
        },
      },
      {
        heading: 'Sĩ đôi, Tượng đôi, Sĩ Tượng toàn: pháo đài trước Mã',
        body: `Nếu một Tượng đã đủ gây khó cho Mã, thì hai quân phòng thủ càng vững hơn:
- **Mã đối Tượng đôi:** gần như luôn hòa.
- **Mã đối Sĩ đôi:** phần lớn là hòa. Khi **một Sĩ đứng ở tâm cung**, Đen hòa trong tuyệt đại đa số thế cờ.
- **Mã đối Sĩ Tượng toàn:** hòa.

Thế bên cạnh là một pháo đài điển hình: Sĩ ở tâm cung, Sĩ còn lại ở góc đáy, Tướng đứng ở hàng giữa của cung. Với thế đứng này, phân tích đầy đủ cho thấy Đen hòa **bất kể Mã và Tướng Đỏ đứng ở đâu**. Đen chỉ cần đi lại cẩn thận bằng Tướng hoặc Sĩ, không để Sĩ bị bắt.`,
        warning: 'Đừng đổi hết Tốt khi chỉ còn một Mã: Mã đơn rất khó thắng khi đối phương còn hai quân phòng thủ.',
        diagram: {
          fen: '3a5/4ak3/9/9/9/9/2N6/9/9/3K5 w - - 0 1',
          highlights: ['e8:green', 'd9:green', 'f8:green'],
          caption: 'Sĩ tâm cung, Sĩ góc đáy, Tướng ở hàng giữa: Mã đơn không phá được.',
        },
      },
      {
        heading: 'Mã và lộ mặt tướng: ghim cả Sĩ',
        body: `Tướng Đỏ không chỉ khóa cột mà còn **ghim** được quân phòng thủ. Nếu một Sĩ Đen đứng giữa hai Tướng trên cùng một cột, Sĩ đó không được rời cột (nếu không hai Tướng sẽ đối mặt). Khi ấy Sĩ không còn là nước chờ, và lưới Mã lại có tác dụng.

So sánh với Pháo để thấy giá trị của Mã trong tàn cuộc ít quân:
- Mã thắng Tướng đơn, Pháo đơn thì không.
- Mã thắng Tướng có một Sĩ, Pháo đơn đối Sĩ đơn thì hòa.

Vì vậy, khi tính chuyện đổi quân vào tàn cuộc, **một Mã thường đáng giá hơn một Pháo**.`,
        tip: 'Hãy luôn kiểm tra: quân phòng thủ nào của đối phương đang đứng giữa hai Tướng? Quân đó bị ghim, nó không giúp được gì.',
        diagram: {
          fen: '2N6/5k3/5a3/9/9/9/9/9/4K4/9 w - - 0 1',
          moves: 'Tg5-4 Tg6/1 M7/6',
          notes: [
            'Tướng Đỏ bình sang lộ 4: Sĩ Đen đứng giữa hai Tướng nên bị ghim, không được rời cột.',
            'Nước duy nhất: điểm tâm cung bị Mã khống chế, Sĩ không thể đi, nên Tướng Đen lui xuống đáy.',
            'Mã khống chế điểm phía trước Tướng Đen và điểm đáy giữa cung. Sĩ bị ghim không đi được – Đen hết nước đi và thua.',
          ],
          caption: 'Sĩ bị ghim bởi lộ mặt tướng, lưới Mã khép lại.',
        },
      },
    ],
    keyTakeaways: [
      'Mã (cùng Tướng) thắng Tướng đơn ở mọi thế và thắng Tướng có một Sĩ trong gần như mọi thế.',
      'Lưới Mã: Mã khống chế hai điểm quanh Tướng đối phương, Tướng mình khóa một cột.',
      'Tượng cho bên phòng thủ nhiều nước chờ nên Mã đối Tượng đơn phần lớn là hòa; Tượng đôi, Sĩ đôi, Sĩ Tượng toàn càng dễ hòa.',
      'Sĩ ở tâm cung là chìa khóa của pháo đài chống Mã.',
      'Quân phòng thủ đứng giữa hai Tướng bị ghim – nó không còn là nước chờ.',
      'Trong tàn cuộc ít quân, Mã thường đáng giá hơn Pháo.',
    ],
  },

  // ───────────────────────────── 6. Pháo trong tàn cuộc ─────────────────────────────
  {
    id: 'xq-tc-phao',
    category: 'tan-cuoc',
    title: 'Pháo trong tàn cuộc',
    subtitle: 'Pháo cần ngòi: Pháo đơn hòa, Pháo Sĩ thắng',
    level: 2,
    icon: '💣',
    minutes: 14,
    intro:
      'Pháo là quân rất mạnh ở khai cuộc và trung cuộc, khi bàn cờ đầy quân làm ngòi. Nhưng càng về tàn cuộc, ngòi càng hiếm, và Pháo yếu đi rõ rệt. Bài này giúp em hiểu một nghịch lý quan trọng: **Pháo đơn không thắng được Tướng đơn**, trong khi chỉ cần thêm một Sĩ làm ngòi là thắng chắc. Em cũng sẽ thấy vì sao Pháo + Tượng hay Pháo + lão tốt vẫn chỉ hòa.',
    sections: [
      {
        heading: 'Pháo đơn không có ngòi',
        body: `Pháo chỉ ăn quân (và chỉ chiếu Tướng) khi **có đúng một quân làm ngòi** ở giữa. Khi bàn cờ chỉ còn hai Tướng và một Pháo, ngòi duy nhất có thể là... Tướng Đỏ – nhưng Tướng Đỏ không bao giờ được đứng cùng cột với Tướng Đen mà không có quân cản (lộ mặt tướng), nên nó không thể làm ngòi để chiếu.

Kết quả: Pháo không chiếu được, cũng không ngăn được Tướng Đen đi vào bất kỳ điểm nào trong cung. Tướng Đỏ chỉ khóa được một cột, Tướng Đen luôn còn chỗ đi lại. **Pháo đơn (cùng Tướng) đối Tướng đơn là hòa** trong mọi thế cờ.

Ở ví dụ bên cạnh, dù Pháo tiến vào tận cung Đen, nó hoàn toàn vô hại.`,
        diagram: {
          fen: '4k4/9/9/9/9/9/9/9/9/3K1C3 w - - 0 1',
          moves: 'P4.7 Tg5.1 Tg6.1 Tg5/1 P4-5 Tg5-6',
          notes: [
            'Pháo tiến vào góc cung Đen – nhưng không có ngòi, nó không chiếu và cũng không khống chế được điểm nào.',
            'Tướng Đen lên tâm cung, đứng sát Pháo mà không sợ gì.',
            'Tướng Đỏ lên một bước, vẫn khóa lộ 6. Đỏ không có quân nào để tạo ngòi.',
            'Tướng Đen lui về đáy cung: mọi điểm trong cung vẫn an toàn.',
            'Pháo bình ra lộ giữa, đứng ngay trên đầu Tướng Đen – vẫn không phải là chiếu vì giữa chúng không có ngòi.',
            'Tướng Đen đi lại tự do. Ván cờ hòa.',
          ],
          caption: 'Pháo không ngòi: không chiếu, không khống chế.',
        },
      },
      {
        heading: 'Pháo + Sĩ: Sĩ làm ngòi, Tướng khóa cột',
        body: `Chỉ cần thêm **một Sĩ**, mọi chuyện thay đổi: Sĩ là ngòi lý tưởng vì nó luôn ở trong cung, ngay trên các cột mà Tướng Đen có thể đứng. **Pháo Sĩ (cùng Tướng) thắng Tướng đơn** trong mọi thế cờ khi Đỏ đi trước.

Kế hoạch gồm ba bước:
- **Tướng Đỏ chiếm tầng ba của cung** để khóa một cột và sẵn sàng sang lộ giữa.
- **Pháo về hàng đáy**, đứng sau Sĩ để chiếu.
- Khi Tướng Đen bị đẩy ra cột bên, **Tướng Đỏ chiếm lộ giữa**, Pháo và Sĩ cùng chuyển sang cột của Tướng Đen để chiếu bí.

Thế chiếu bí cuối cùng rất đáng nhớ: Pháo ở hàng đáy, Sĩ ngay phía trước làm ngòi, Tướng Đỏ ở lộ giữa khóa đường thoát.`,
        tip: 'Hình mẫu chiếu bí của Pháo Sĩ: Pháo – Sĩ – Tướng Đen trên cùng một cột, Tướng Đỏ đứng lộ giữa ngay bên cạnh.',
        diagram: {
          fen: '4k4/9/9/9/9/9/9/2C6/4A4/3K5 w - - 0 1',
          moves: 'Tg6.1 Tg5.1 Tg6.1 Tg5/1 P7/2 Tg5.1 P7-5 Tg5-6 Tg6-5 Tg6/1 P5-4 Tg6.1 S5.4',
          notes: [
            'Tướng Đỏ lên, hướng tới tầng ba của cung.',
            'Tướng Đen lên tâm cung.',
            'Tướng Đỏ đã ở tầng ba, khóa lộ 6 (tức lộ 4 của Đen).',
            'Tướng Đen lui về đáy.',
            'Pháo về hàng đáy để chuẩn bị đứng sau Sĩ.',
            'Tướng Đen lại lên tâm cung.',
            'Chiếu! Sĩ ở tâm cung làm ngòi cho Pháo.',
            'Nước duy nhất: Tướng Đen không thể sang lộ 4 (Tướng Đỏ khóa) nên phải bình sang lộ 6.',
            'Tướng Đỏ chiếm lộ giữa: Tướng Đen không thể quay lại cột giữa nữa.',
            'Tướng Đen lui xuống đáy (lên hay xuống thì nó cũng chỉ còn một cột).',
            'Pháo bình sang lộ 4, cùng cột với Tướng Đen. Chưa có ngòi, nên chưa phải là chiếu.',
            'Nước duy nhất: Tướng Đen lên một bước.',
            'Sĩ lên lộ 4 làm ngòi: Pháo chiếu, Tướng Đen không thể sang lộ giữa (lộ mặt tướng), lên hay xuống đều vẫn nằm trên đường Pháo. Chiếu bí!',
          ],
          caption: 'Pháo đáy – Sĩ ngòi – Tướng chiếm lộ giữa.',
        },
      },
      {
        heading: 'Pháo + Tượng: vẫn hòa!',
        body: `Thay Sĩ bằng Tượng thì sao? Ngạc nhiên thay: **Pháo Tượng (cùng Tướng) không thắng được Tướng đơn** – phân tích máy tính toàn bộ các thế cờ cho kết quả hòa ở mọi thế.

Lý do nằm ở hình học: trong bảy điểm Tượng có thể đứng, **chỉ có một điểm nằm trên các cột của cung** – đó là điểm Tượng ở lộ giữa. Vì thế Tượng chỉ làm ngòi được trên cột giữa. Nhưng khi Pháo chiếu ở cột giữa, Tướng Đỏ lại không được đứng ở cột đó, và Tướng Đen chỉ việc bước sang bên. Ở cột bên, Pháo không còn ngòi nào.`,
        diagram: {
          fen: '4k4/9/9/9/9/9/9/4B4/9/3K1C3 w - - 0 1',
          moves: 'P4-5 Tg5-6 Tg6.1 Tg6.1 P5-4 Tg6-5 P4-5 Tg5-6',
          notes: [
            'Chiếu! Tượng ở lộ giữa làm ngòi.',
            'Tướng Đen bước sang lộ 6 (lộ 4 của Đen bị Tướng Đỏ khóa).',
            'Đỏ không có nước chiếu tiếp: ở cột này Pháo không có ngòi.',
            'Nước duy nhất: điểm đáy giữa cung vẫn nằm trên đường Pháo (qua ngòi Tượng) nên Tướng Đen lên một bước.',
            'Pháo sang cột của Tướng Đen – nhưng vẫn không có ngòi.',
            'Tướng Đen thản nhiên trở về lộ giữa.',
            'Pháo lại về giữa chiếu.',
            'Và Tướng Đen lại bước sang bên. Vòng lặp này không đi đến đâu – hòa.',
          ],
          caption: 'Tượng chỉ làm ngòi được ở lộ giữa – không đủ để thắng.',
        },
      },
      {
        heading: 'Pháo + Tốt: Tốt là ngòi tuyệt vời – trừ lão tốt',
        body: `Một Tốt chưa xuống đáy vốn đã thắng được Tướng đơn, nên Pháo + Tốt càng thắng dễ. Điều thú vị là Tốt còn là **ngòi lý tưởng** cho Pháo: Tốt đứng trên cột của Tướng Đen, Pháo ở phía sau, Tướng Đỏ khóa cột bên cạnh.

Nhưng hãy nhớ: **Pháo + lão tốt chỉ hòa**. Trên một cột, Tốt ở hàng đáy luôn đứng *sau lưng* Tướng Đen (Tướng Đen không thể ở thấp hơn hàng đáy), nên nó không bao giờ chen được vào giữa Pháo và Tướng Đen. Lão tốt chỉ làm ngòi được theo hàng ngang, trên chính hàng đáy – vì vậy Tướng Đen chỉ cần tránh đứng ở hàng đáy là an toàn.`,
        warning: 'Có Pháo trong tay, đừng vội thí hoặc đẩy Tốt xuống hàng đáy. Lão tốt không còn làm ngòi được, và Pháo + lão tốt chỉ hòa.',
        diagram: {
          fen: '3k5/9/9/2P6/9/9/9/9/9/4KC3 w - - 0 1',
          moves: 'Tg5.1 Tg4.1 P4-6 Tg4/1 B7-6',
          notes: [
            'Tướng Đỏ lên một bước, vẫn khóa lộ giữa. Tướng Đen ở góc cung chỉ còn đường lên.',
            'Nước duy nhất của Đen.',
            'Pháo bình sang lộ 6, cùng cột với Tướng Đen, chờ ngòi.',
            'Tướng Đen lên hay xuống thì vẫn ở trên cột này.',
            'Tốt bình vào lộ 6 làm ngòi: Pháo chiếu, Tướng Đen không thể sang lộ giữa vì Tướng Đỏ đứng đó. Chiếu bí!',
          ],
          caption: 'Tốt làm ngòi cho Pháo, Tướng Đỏ khóa lộ giữa.',
        },
      },
      {
        heading: 'Pháo Sĩ đối Sĩ: mượn cả quân đối phương làm ngòi',
        body: `Khi Tướng Đen còn một Sĩ, Pháo Sĩ vẫn **thắng trong mọi thế** (khi Đỏ đi trước). Lý do: ngòi không nhất thiết là quân của mình. Pháo có thể dùng **Sĩ Đen, Sĩ Đỏ, thậm chí Tướng Đỏ** làm ngòi – miễn là có đúng một quân ở giữa.

Ở ví dụ bên cạnh, Đỏ áp dụng đúng kế hoạch của phần Pháo Sĩ đối Tướng đơn: Tướng lên tầng ba, Pháo về đáy, chiếu qua ngòi Sĩ, rồi Tướng chiếm lộ giữa. Đòn kết thúc thật đẹp: Pháo **nhảy qua chính Tướng mình** để ăn Sĩ Đen. Sau đó là thế Pháo Sĩ đối Tướng đơn đã biết cách thắng.`,
        tip: 'Khi tính nước Pháo trong tàn cuộc, hãy coi mọi quân trên cột/hàng – của cả hai bên – là ngòi tiềm năng.',
        diagram: {
          fen: '3ak4/9/9/9/9/9/9/2C6/4A4/3K5 w - - 0 1',
          moves: 'Tg6.1 S4.5 Tg6.1 S5/6 P7/2 Tg5.1 P7-5 Tg5-6 Tg6-5 S6.5 S5.4 Tg6/1 P5.8',
          notes: [
            'Tướng Đỏ lên, hướng tới tầng ba.',
            'Đen đưa Sĩ lên tâm cung.',
            'Tướng Đỏ lên tầng ba, khóa lộ 6.',
            'Sĩ Đen lui về góc đáy của lộ 6.',
            'Pháo về hàng đáy, chuẩn bị đứng sau Sĩ Đỏ.',
            'Tướng Đen lên tâm cung.',
            'Chiếu qua ngòi Sĩ Đỏ!',
            'Nước duy nhất: Tướng Đen bình sang lộ 6.',
            'Tướng Đỏ chiếm lộ giữa, khóa cột giữa với Tướng Đen.',
            'Đen đưa Sĩ về tâm cung – Đen cần những nước đi của Sĩ để khỏi bị dồn vào thế hết nước.',
            'Sĩ Đỏ tránh ra, mở cột giữa: giờ Tướng Đỏ trở thành ngòi để Pháo nhắm vào Sĩ Đen ở tâm cung!',
            'Tướng Đen lui xuống đáy. Cho Sĩ chạy cũng không cứu được: phần lớn các nước Sĩ dẫn tới bị chiếu bí ngay, nước còn lại chỉ thua nhanh hơn.',
            'Pháo nhảy qua Tướng mình ăn Sĩ. Còn lại Pháo Sĩ đối Tướng đơn – Đỏ thắng như phần trước.',
          ],
          caption: 'Pháo dùng cả Tướng mình làm ngòi để ăn Sĩ.',
        },
      },
    ],
    keyTakeaways: [
      'Pháo chỉ chiếu và ăn quân khi có đúng một ngòi; tàn cuộc càng ít quân, Pháo càng yếu.',
      'Pháo đơn, Pháo Tượng và Pháo + lão tốt đều không thắng được Tướng đơn.',
      'Pháo Sĩ thắng Tướng đơn: Tướng lên tầng ba, Pháo về đáy sau Sĩ, Tướng chiếm lộ giữa.',
      'Tốt chưa xuống đáy là ngòi tuyệt vời cho Pháo.',
      'Ngòi có thể là bất kỳ quân nào, kể cả Sĩ đối phương hay Tướng của chính mình.',
    ],
  },

  // ───────────────────────────── 7. Xe đơn đối Sĩ Tượng ─────────────────────────────
  {
    id: 'xq-tc-xe-doi-si-tuong',
    category: 'tan-cuoc',
    title: 'Xe đơn đối Sĩ Tượng',
    subtitle: 'Thiếu một quân là thua – đủ Sĩ Tượng đứng đúng thì hòa',
    level: 4,
    icon: '🏰',
    minutes: 16,
    intro:
      'Xe là quân mạnh nhất, nên nhiều người tin rằng Xe đơn chắc chắn thắng được Tướng chỉ còn Sĩ Tượng. Sự thật tinh tế hơn: phân tích máy tính toàn bộ các thế cho thấy **Xe thắng ở mọi thế nếu bên phòng thủ thiếu dù chỉ một Sĩ hoặc một Tượng**; nhưng với **Sĩ Tượng toàn đứng đúng vị trí**, bên phòng thủ dựng được một pháo đài mà Xe không thể phá. Bài này dạy em cả hai mặt: kỹ thuật thắng của Xe và cách xây pháo đài.',
    sections: [
      {
        heading: 'Thiếu một Tượng: Xe thắng nhờ khốn bí',
        body: `Khi bên phòng thủ thiếu một Tượng (hoặc thiếu một Sĩ), **Xe thắng trong mọi thế cờ** khi Đỏ đi trước. Vũ khí chính vẫn là những thứ em đã quen:
- **Tướng Đỏ chiếm lộ giữa**: Sĩ Đen ở tâm cung bị ghim, không được rời cột giữa.
- **Xe chiếu để đẩy Tướng Đen về chỗ xấu**, rồi chiếm mép trên của cung.
- **Khốn bí cục bộ**: khi Tướng và Sĩ Đen không còn nước đi, Đen buộc phải đi Tượng – và Tượng đi đâu cũng bị Xe ăn.

Sau khi ăn được Tượng, Xe đối Sĩ đôi là thắng dễ.`,
        tip: 'Trước mỗi nước của Xe, hãy đếm nước đi của từng quân Đen. Khi chỉ còn một quân có thể đi, em đang rất gần chiến thắng.',
        diagram: {
          fen: '3akab2/9/9/9/9/9/9/9/9/3K4R w - - 0 1',
          moves: 'Tg6.1 S4.5 Tg6-5 Tg5-4 X1-6 Tg4-5 X6.7 T7.9 X6-1 Tg5-4 X1-7 Tg4.1 X7.2 Tg4.1 X7/1 S5.6 X7/2 Tg4/1 X7-6',
          notes: [
            'Tướng Đỏ lên, chuẩn bị sang lộ giữa.',
            'Đen đưa Sĩ lên tâm cung – thế phòng thủ quen thuộc.',
            'Tướng Đỏ chiếm lộ giữa: Sĩ tâm cung bị ghim, rời cột giữa là hai Tướng đối mặt.',
            'Tướng Đen tránh sang góc đáy lộ 4.',
            'Xe sang lộ 6 chiếu.',
            'Nước dai dẳng nhất: Tướng Đen trở về đáy giữa (lấy Sĩ chặn thì thua ngay ở nước sau).',
            'Xe lên mép trên cung! Bây giờ Tướng Đen không đi được (lộ 4 bị Xe khống chế, hai bên là Sĩ), Sĩ tâm cung bị ghim, Sĩ góc không có chỗ đi. Đen chỉ còn nước Tượng – và Tượng đi đâu cũng nằm trên hàng của Xe.',
            'Đen buộc phải bỏ Tượng.',
            'Xe ăn Tượng. Còn lại Xe đối Sĩ đôi.',
            'Tướng Đen sang góc đáy lộ 4.',
            'Xe sang cánh trái, chuẩn bị khóa hàng đáy.',
            'Tướng Đen lên hàng giữa cung.',
            'Xe xuống hàng đáy, khóa toàn bộ hàng cuối.',
            'Tướng Đen bị đẩy lên mép trên cung.',
            'Xe lùi một bước về hàng giữa cung, ép sát và nhắm vào Sĩ ở tâm cung.',
            'Sĩ tránh đi – Tướng Đen không ở lộ giữa nên Sĩ không còn bị ghim.',
            'Xe lùi ra, chuẩn bị bình vào lộ 6.',
            'Tướng Đen lui về hàng giữa cung.',
            'Xe bình vào lộ 6 chiếu. Tướng Đen không thể sang lộ giữa (lộ mặt tướng), lên hay xuống vẫn nằm trên đường Xe. Chiếu bí!',
          ],
          caption: 'Ghim Sĩ, khốn bí, ăn Tượng, rồi chiếu bí.',
        },
      },
      {
        heading: 'Sĩ Tượng toàn chưa kịp dàn trận: đòn ăn quân',
        body: `Ngay cả khi bên phòng thủ đủ Sĩ Tượng, nếu chúng chưa đứng đúng chỗ, Xe vẫn có thể thắng – thường bằng một đòn ăn quân.

Ở thế bên cạnh, Sĩ Tượng còn ở vị trí ban đầu. Đỏ có đúng **một nước thắng**: Xe ăn Sĩ góc đáy và chiếu! Tướng Đen đứng ngay bên cạnh nhưng không ăn lại được, vì bước sang lộ 4 là đối mặt với Tướng Đỏ. Từ đó, Sĩ Tượng của Đen lần lượt rơi rụng.`,
        diagram: {
          fen: '2bakab2/9/3R5/9/9/9/9/9/9/3K5 w - - 0 1',
          moves: 'X6.2 Tg5.1 X6-7 Tg5-6 Tg6-5 T7.9 X7/1 S6.5 X7-5 Tg6/1 X5/2 T9/7 X5-4',
          notes: [
            'Xe ăn Sĩ và chiếu! Tướng Đen không ăn lại được (lộ mặt tướng). Đây là nước duy nhất thắng – mọi nước khác đều để Đen kịp dàn thế hòa.',
            'Nước duy nhất.',
            'Xe bình sang ăn luôn Tượng.',
            'Đen không có cách cứu vãn.',
            'Tướng Đỏ chiếm lộ giữa.',
            'Tượng chạy ra biên.',
            'Xe lùi một bước về hàng giữa cung, chiếu.',
            'Sĩ lên chặn – nhưng sẽ bị ăn.',
            'Xe ăn Sĩ, lại chiếu. Tướng Đen không ăn được Xe vì Xe được Tướng Đỏ bảo vệ từ xa (lộ mặt tướng).',
            'Tướng Đen lui về góc đáy.',
            'Xe lùi ra, chuẩn bị bình sang lộ 4.',
            'Tượng trở về đáy.',
            'Xe bình sang lộ 4 chiếu. Tướng Đen không sang được lộ giữa, Tượng không che được cột này. Chiếu bí!',
          ],
          caption: 'Xe ăn Sĩ nhờ Tướng Đỏ "bảo vệ từ xa".',
        },
      },
      {
        heading: 'Hai Tượng biên cùng hàng: bắt đôi',
        body: `Một lỗi phòng thủ hay gặp là đưa cả hai Tượng ra hai điểm biên trên cùng một hàng. Hai Tượng này không bảo vệ được nhau, và một nước Xe lên đúng hàng đó là **bắt đôi**. Phân tích cho thấy với thế đứng như bên cạnh (hai Sĩ ở góc đáy, Tướng ở đáy giữa, hai Tượng biên), Đen thua trong mọi thế.

Sau khi mất một Tượng, Đen rơi vào thế thiếu Tượng – mà em đã biết là Xe thắng ở mọi thế.`,
        warning: 'Hai Tượng nên đứng ở hai điểm bảo vệ được nhau (ví dụ Tượng giữa và Tượng góc đáy). Tượng "lẻ loi" là mồi ngon cho Xe.',
        diagram: {
          fen: '3aka3/9/b7b/9/9/9/9/9/9/3K3R1 w - - 0 1',
          moves: 'X2.7 T1/3 X2-1',
          notes: [
            'Xe lên mép trên cung, tấn công cả hai Tượng biên cùng lúc!',
            'Đen chỉ cứu được một Tượng.',
            'Xe ăn Tượng còn lại. Đen thiếu Tượng – Đỏ thắng.',
          ],
          caption: 'Hai Tượng biên trên cùng hàng: Xe bắt đôi.',
        },
      },
      {
        heading: 'Pháo đài Sĩ Tượng toàn',
        body: `Bây giờ là phần quan trọng nhất cho bên phòng thủ. Thế đứng bên cạnh là một **pháo đài**:
- **Sĩ ở tâm cung**, Sĩ còn lại ở một góc đáy.
- **Tượng ở giữa mép trên cung**, Tượng còn lại ở góc đáy **phía bên kia** – hai Tượng bảo vệ lẫn nhau.

Phân tích toàn bộ các thế cho thấy với thế đứng này, **Đen hòa bất kể Xe và Tướng Đỏ đứng ở đâu**. Xe tấn công Tượng nào thì Tượng kia ăn lại; Xe chiếu thì Tướng Đen có chỗ tránh mà không phá vỡ cấu trúc.

Từ vị trí ban đầu của Sĩ Tượng, Đen chỉ cần hai nước (Sĩ lên tâm cung, Tượng lên giữa) là dựng xong pháo đài. Còn Sĩ Tượng ở nguyên vị trí ban đầu thì khoảng 60% thế là hòa – tùy Xe và Tướng Đỏ đứng ở đâu.`,
        tip: 'Bên kém quân trong tàn cuộc Xe: hãy dựng pháo đài ngay, đừng chờ Xe đối phương vào vị trí.',
        diagram: {
          fen: '2bakab2/9/9/9/9/9/9/9/9/3K4R w - - 0 1',
          moves: 'Tg6.1 S6.5 Tg6-5 T3.5 X1.7 Tg5-6 X1-3 Tg6-5',
          notes: [
            'Tướng Đỏ lên, chuẩn bị chiếm lộ giữa.',
            'Đen lập tức dựng pháo đài: Sĩ lên tâm cung.',
            'Tướng Đỏ chiếm lộ giữa.',
            'Tượng lên giữa mép trên. Pháo đài hoàn chỉnh: Sĩ tâm cung, Sĩ góc lộ 4, Tượng giữa và Tượng góc lộ 7 bảo vệ lẫn nhau.',
            'Xe lên mép trên cung, nhắm vào Tượng giữa – nhưng Tượng giữa được Tượng góc bảo vệ.',
            'Đen có nhiều cách giữ hòa; ở đây Tướng sang góc đáy.',
            'Xe tấn công cả hai Tượng cùng lúc – nhưng chúng bảo vệ lẫn nhau: Xe ăn Tượng nào cũng bị Tượng kia ăn lại.',
            'Tướng Đen trở về đáy giữa. Đỏ không có cách phá pháo đài – hòa.',
          ],
          caption: 'Pháo đài: Sĩ tâm cung, Tượng giữa, Sĩ góc và Tượng góc ở hai phía.',
        },
      },
    ],
    keyTakeaways: [
      'Xe đơn thắng Sĩ Tượng thiếu (thiếu một Sĩ hoặc một Tượng) trong mọi thế.',
      'Kỹ thuật: Tướng chiếm lộ giữa ghim Sĩ, Xe chiếu rồi chiếm mép trên cung, tạo khốn bí để ăn quân.',
      'Sĩ Tượng chưa dàn trận thì dễ dính đòn: Xe ăn Sĩ nhờ lộ mặt tướng, bắt đôi hai Tượng biên.',
      'Sĩ Tượng toàn đứng đúng (Sĩ tâm cung, Tượng giữa, Sĩ góc và Tượng góc ở hai phía) là pháo đài – hòa.',
      'Bên phòng thủ phải dựng pháo đài sớm; bên tấn công phải ra đòn trước khi pháo đài hoàn thành.',
    ],
  },

  // ───────────────────────────── 8. Xe đối Mã, Xe đối Pháo ─────────────────────────────
  {
    id: 'xq-tc-xe-doi-ma-phao',
    category: 'tan-cuoc',
    title: 'Xe đối Mã, Xe đối Pháo',
    subtitle: 'Ghim, bắt quân và những bức tường không thể phá',
    level: 4,
    icon: '⚔️',
    minutes: 15,
    intro:
      'Hơn đối phương một Xe lấy một Mã hay một Pháo là ưu thế rất lớn – nhưng không phải lúc nào cũng thắng. Khi bên yếu chỉ còn quân nhẹ trơ trọi hoặc thêm vài Sĩ, Xe thường thắng nhờ **ghim** và **khốn bí**. Khi bên yếu còn đủ Sĩ Tượng, quân nhẹ nấp sau bức tường ấy và ván cờ thường hòa. Bài này giúp em biết mình đang ở bên nào của ranh giới.',
    sections: [
      {
        heading: 'Xe đối Pháo đơn: Pháo không có chỗ trốn',
        body: `**Xe (cùng Tướng) thắng Pháo đơn ở mọi thế cờ** khi Đỏ đi trước. Pháo không có ngòi thì không chiếu được, cũng không bảo vệ được ai; nó chỉ có thể nép vào Tướng mình.

Kế hoạch của Đỏ:
- Xe và Tướng chia nhau khóa hai cột của cung, dồn Tướng Đen vào một cột.
- Đặt Đen vào thế **phải đi**: Tướng rời Pháo thì Pháo bị ăn, Pháo chạy theo một hàng thì Xe đuổi theo ăn.`,
        diagram: {
          fen: '9/9/4k4/3c5/9/9/9/9/9/3K4R w - - 0 1',
          moves: 'X1.1 P4/3 X1-5 Tg5-6 Tg6-5 P4-6 X5.1 Tg6/1 X5.7 P6-7 X5-3 Tg6.1 X3/1',
          notes: [
            'Xe lên hàng 1 để có đường bình vào lộ giữa.',
            'Pháo Đen lui về đáy, tìm chỗ nấp gần Tướng.',
            'Chiếu! Xe chiếm lộ giữa.',
            'Nước duy nhất: lộ 4 của Đen bị Tướng Đỏ khóa.',
            'Tướng Đỏ về lộ giữa sau lưng Xe: cột giữa vẫn bị khóa ngay cả khi Xe rời đi.',
            'Pháo bình về lộ 6, cùng cột với Tướng.',
            'Một nước chờ: Xe nhích lên, vẫn giữ lộ giữa. Mọi nước Pháo lúc này đều thua ngay.',
            'Tướng Đen lui về sát Pháo để bảo vệ nó.',
            'Xe xuống hàng đáy, đứng ngay cạnh Pháo! Pháo được Tướng bảo vệ, nhưng Đen phải đi: Tướng rời đi thì mất Pháo, Pháo chạy theo hàng đáy thì Xe đuổi theo ăn.',
            'Đen đành để mất Pháo.',
            'Xe ăn Pháo. Còn lại Xe đối Tướng đơn.',
            'Nước duy nhất.',
            'Xe khóa hàng giữa cung, Tướng Đỏ khóa lộ giữa: Tướng Đen hết nước đi.',
          ],
          caption: 'Khóa cột, đặt Đen vào thế phải đi, rồi ăn Pháo.',
        },
      },
      {
        heading: 'Xe đối Mã đơn: cẩn thận với Mã',
        body: `**Xe thắng Mã đơn trong gần như mọi thế cờ.** Khác với Pháo, Mã có thể tự mình chiếu và bắt đôi, nên Đỏ phải luôn để ý những điểm Mã có thể nhảy tới. Nhưng một khi Tướng Đen đã bị khóa vào một cột, Mã phải quay về che chắn – và thường bị Xe ăn.

Ở ví dụ bên cạnh, Xe chiếm lộ giữa đẩy Tướng Đen vào góc. Khi Xe chiếu theo cột của Tướng Đen, Mã buộc phải chặn – và bị ăn kèm chiếu bí.`,
        warning: 'Đừng để Xe và Tướng của mình đứng ở hai điểm mà Mã đối phương có thể bắt đôi (ví dụ Mã chiếu Tướng đồng thời đe dọa Xe).',
        diagram: {
          fen: '4k4/9/6n2/9/9/9/9/9/9/3K4R w - - 0 1',
          moves: 'X1.1 M7.8 X1-5 Tg5-6 Tg6-5 M8.7 X5.2 M7/8 X5-4 M8/6 X4.3',
          notes: [
            'Xe lên hàng 1, chuẩn bị bình vào lộ giữa.',
            'Mã Đen nhảy ra ngoài, rời xa Tướng.',
            'Chiếu! Xe chiếm lộ giữa.',
            'Nước duy nhất.',
            'Tướng Đỏ về lộ giữa sau lưng Xe, để Xe được tự do.',
            'Mã quay về gần cung Đỏ, tìm cơ hội quấy rối.',
            'Xe tiến lên đuổi Mã.',
            'Mã chạy.',
            'Xe bình sang lộ 4 chiếu.',
            'Đen phải dùng Mã chặn chiếu.',
            'Xe ăn Mã, chiếu bí! Tướng Đen không thể sang lộ giữa.',
          ],
          caption: 'Khóa Tướng vào một cột, Mã buộc phải chặn và bị ăn.',
        },
      },
      {
        heading: 'Xe đối Mã song Sĩ: ghim Mã vào Tướng',
        body: `Thêm hai Sĩ, Mã vẫn không cứu được Đen: phân tích đầy đủ cho thấy **Xe thắng Mã song Sĩ trong gần như mọi thế**, dù có khi phải mất khá nhiều nước.

Vũ khí lợi hại nhất ở đây là **ghim**: Mã đứng giữa Xe và Tướng thì không được rời đi. Ở thế bên cạnh, Xe chiếm lộ giữa ghim Mã, Tướng Đen lên bảo vệ – nhưng một nước chờ của Tướng Đỏ buộc Đen phải tự gỡ thế và bỏ Mã. Sau đó Xe đối Sĩ đôi thắng không khó.`,
        diagram: {
          fen: '3aka3/9/4n4/9/9/9/9/9/9/3K4R w - - 0 1',
          moves: 'X1-5 Tg5.1 Tg6.1 Tg5-6 X5.7',
          notes: [
            'Xe chiếm lộ giữa, ghim Mã vào Tướng: Mã mà rời đi thì Tướng Đen bị chiếu.',
            'Tướng Đen lên bảo vệ Mã.',
            'Một nước chờ. Mã vẫn bị ghim, hai Sĩ không có chỗ đi, Tướng Đen không sang được lộ 4 (Tướng Đỏ khóa) – Đen buộc phải đi Tướng và bỏ mặc Mã.',
            'Tướng Đen tránh sang bên.',
            'Xe ăn Mã. Còn lại Xe đối Sĩ đôi – Đỏ thắng.',
          ],
          caption: 'Ghim Mã, nước chờ, ăn Mã.',
        },
      },
      {
        heading: 'Khi bên yếu còn đủ Sĩ Tượng: thường là hòa',
        body: `Ở bài trước, em đã thấy Sĩ Tượng toàn đứng đúng chỗ là pháo đài mà Xe đơn không phá được. Thêm một Mã hay một Pháo nấp trong pháo đài ấy, bên phòng thủ càng vững. Vì vậy, theo lý thuyết tàn cuộc quen thuộc: **Xe đối Mã Sĩ Tượng toàn** và **Xe đối Pháo Sĩ Tượng toàn** đều là thế **hòa** khi bên phòng thủ đứng đúng.

Cách phòng thủ điển hình:
- Sĩ Tượng liên hoàn, bảo vệ lẫn nhau như pháo đài ở bài trước.
- Pháo thường nấp trong hoặc sát cung, dùng Sĩ Tượng làm ngòi để giữ các đường vào; Mã đứng ở vị trí được Sĩ Tượng che chở, tránh bị Xe ghim.

Với bên mạnh, bài học rút ra là: **đừng vội đổi quân để vào tàn cuộc Xe đối quân nhẹ có đủ Sĩ Tượng** nếu em không chắc phá được thế thủ.`,
        warning: 'Hơn một quân chưa chắc đã thắng. Trước khi đổi quân vào tàn cuộc, hãy kiểm tra xem bên kia còn đủ Sĩ Tượng để dựng pháo đài hay không.',
        diagram: {
          fen: '2bakc3/4a4/4b4/9/9/9/9/9/9/3K4R w - - 0 1',
          highlights: ['d9:green', 'e8:green', 'e7:green', 'c9:green', 'f9:blue'],
          caption: 'Minh họa thế thủ điển hình: Sĩ Tượng liên hoàn, Pháo nấp trong cung.',
        },
      },
    ],
    keyTakeaways: [
      'Xe thắng Pháo đơn ở mọi thế và thắng Mã đơn trong gần như mọi thế.',
      'Xe thắng cả Mã song Sĩ trong gần như mọi thế; ghim Mã vào Tướng là vũ khí lợi hại.',
      'Kỹ thuật chung: Xe và Tướng chia nhau khóa cột, đặt đối phương vào thế phải đi.',
      'Xe đối Mã hoặc Pháo có Sĩ Tượng toàn thường là hòa nếu bên yếu dựng được pháo đài.',
      'Luôn cảnh giác Mã đối phương bắt đôi Xe và Tướng.',
    ],
  },

  // ───────────────────────────── 9. Xe phối hợp kết thúc ván ─────────────────────────────
  {
    id: 'xq-tc-xe-phoi-hop',
    category: 'tan-cuoc',
    title: 'Xe Pháo, Xe Mã, Xe Tốt kết thúc ván',
    subtitle: 'Phá Sĩ Tượng bằng ghim, thí quân và Ngọa tào mã',
    level: 4,
    icon: '🎯',
    minutes: 15,
    intro:
      'Xe đơn khó phá Sĩ Tượng toàn đứng đúng chỗ. Nhưng chỉ cần thêm một quân – Pháo, Mã hay Tốt – Xe có ngay một người đồng đội để tạo ra những đòn kết thúc đẹp mắt. Bài này giới thiệu bốn mẫu kết thúc thường gặp, tất cả đều đã được kiểm chứng là thắng bắt buộc. Hãy chú ý vai trò của **Tướng Đỏ**: trong cả bốn ví dụ, nó âm thầm khóa một cột hoặc ghim một quân phòng thủ.',
    sections: [
      {
        heading: 'Xe Pháo: thí Pháo kéo Tượng ra khỏi vị trí',
        body: `Đen còn đủ Sĩ Tượng, nhưng Sĩ đang ở tâm cung và **bị Tướng Đỏ ghim** (Tướng Đỏ đứng lộ giữa: Sĩ rời cột giữa thì hai Tướng đối mặt).

Kế hoạch ba nước:
- Xe xuống hàng đáy tấn công Tượng góc; Đen phải đưa Tượng còn lại lên giữa để bảo vệ nó.
- **Thí Pháo chiếu**, lấy Sĩ góc làm ngòi: Tượng giữa buộc phải ăn Pháo – và bỏ nhiệm vụ bảo vệ Tượng góc.
- Xe ăn Tượng góc, chiếu bí: Sĩ tâm cung không thể lên chặn vì đang bị ghim.

Máy tính xác nhận: Đỏ thắng bắt buộc sau 3 nước, và mỗi nước của Đen đều là cách chống cự dai dẳng nhất.`,
        tip: 'Khi một quân phòng thủ làm hai nhiệm vụ cùng lúc, hãy tìm cách bắt nó làm thêm nhiệm vụ thứ ba – thường là bằng một nước thí quân.',
        diagram: {
          fen: '2bak1b2/2C1a4/9/9/9/9/9/7R1/4K4/9 w - - 0 1',
          moves: 'X2.7 T3.5 P7.1 T5/3 X2-3',
          notes: [
            'Xe xuống hàng đáy, tấn công Tượng góc.',
            'Tượng lên giữa để bảo vệ Tượng góc.',
            'Thí Pháo chiếu! Sĩ góc lộ 4 làm ngòi.',
            'Nước duy nhất: Tượng phải ăn Pháo – và rời khỏi vị trí bảo vệ Tượng góc.',
            'Xe ăn Tượng, chiếu. Tướng Đen không có chỗ chạy, Sĩ tâm cung không lên chặn được vì bị Tướng Đỏ ghim. Chiếu bí!',
          ],
          caption: 'Thí Pháo dọn đường, Xe chiếu bí.',
        },
      },
      {
        heading: 'Pháo đầu ghim chặt, Xe chiếu đáy',
        body: `Pháo ở lộ giữa (Pháo đầu) là vũ khí quen thuộc từ khai cuộc, và nó vẫn rất mạnh trong tàn cuộc. Ở thế bên cạnh, Đen thiếu một Tượng. Sau khi Xe buộc Sĩ góc phải lên tâm cung, Tượng giữa và Sĩ tâm cung nằm thẳng hàng trên lộ giữa.

Khi Pháo về lộ giữa, **cả hai quân này đều bị ghim**: Sĩ rời đi thì Pháo chiếu qua ngòi Tượng, Tượng rời đi thì Pháo chiếu qua ngòi Sĩ. Tướng Đen bị chính quân mình vây kín, và Xe chỉ cần xuống đáy là chiếu bí.`,
        diagram: {
          fen: '3akab2/9/4b4/3R5/1C7/9/9/9/9/3K5 w - - 0 1',
          moves: 'X6.2 S4.5 P8-5 T7.9 X6.1',
          notes: [
            'Xe vào hàng giữa cung, dọa ăn Sĩ ở góc đáy. Tướng Đen không bảo vệ được Sĩ đó: ăn lại là lộ mặt Tướng Đỏ.',
            'Sĩ né lên tâm cung.',
            'Pháo về lộ giữa: Sĩ tâm cung và Tượng giữa đều bị ghim. Đen chỉ còn đi được Tượng góc.',
            'Nước duy nhất.',
            'Xe xuống đáy chiếu. Tướng Đen không ăn được Xe (lộ mặt tướng), hai bên là Sĩ của chính mình. Chiếu bí!',
          ],
          caption: 'Pháo đầu ghim Sĩ Tượng, Xe chiếu bí ở hàng đáy.',
        },
      },
      {
        heading: 'Xe Mã: Ngọa tào mã',
        body: `**Ngọa tào mã** là một trong những mẫu chiếu bí nổi tiếng nhất: Mã đứng ở điểm cách lộ giữa hai cột, ngay hàng giữa cung của đối phương, chiếu Tướng ở đáy giữa. Khi Sĩ ở hai góc đáy, Tướng Đen chỉ còn lối thoát lên tâm cung – và Xe chỉ cần khống chế hàng giữa cung là xong.

Ở ví dụ bên cạnh, Đen còn đủ Sĩ Tượng. Xe chiếm cột bên cung rồi xuống hàng giữa cung; Mã nhảy vào điểm ngọa tào chiếu bí. Máy tính xác nhận: thắng bắt buộc sau 3 nước.`,
        diagram: {
          fen: '2bakab2/9/9/3N5/9/9/R8/9/9/3K5 w - - 0 1',
          moves: 'X9-4 T3.5 X4.5 T7.9 M6.7',
          notes: [
            'Xe bình sang lộ 4, chuẩn bị tiến vào sườn cung.',
            'Đen đưa Tượng lên giữa.',
            'Xe vào hàng giữa cung, khóa điểm tâm cung – lối thoát duy nhất của Tướng Đen.',
            'Đen không có cách nào ngăn đòn sắp tới; Tượng đi chờ.',
            'Ngọa tào mã! Mã chiếu, Tướng Đen không lên được tâm cung (Xe khống chế), hai bên là Sĩ, và không quân nào cản được chân Mã. Chiếu bí!',
          ],
          caption: 'Xe khóa hàng giữa cung, Mã ngọa tào chiếu bí.',
        },
      },
      {
        heading: 'Xe Tốt: Tốt xuống đáy đúng lúc',
        body: `Một Tốt đã áp sát cung là đồng đội đắc lực của Xe. Ở thế bên cạnh, Xe ở lộ giữa ghim Sĩ tâm cung vào Tướng; Đen chỉ có một cách gỡ ghim là đưa Tượng lên chắn – nhưng Xe ăn luôn Tượng đó.

Lần này Tốt xuống đáy là **đúng lúc**: nó chiếu bí trực tiếp, được Tướng Đỏ bảo vệ từ xa, và Sĩ tâm cung không thể ăn Tốt vì vẫn đang bị Xe ghim.`,
        warning: 'Luật "đừng vội xuống đáy" có ngoại lệ duy nhất: khi nước xuống đáy là chiếu bí hoặc dẫn thẳng tới chiếu bí. Hãy tính đến cùng trước khi đi.',
        diagram: {
          fen: '2bak1b2/4a4/5P3/9/9/4R4/9/9/9/5K3 w - - 0 1',
          moves: 'B4.1 T3.5 X5.3 T7.9 B4.1',
          notes: [
            'Tốt xuống hàng giữa cung, dọa tiếp tục xuống đáy chiếu. Sĩ tâm cung đang bị Xe ghim.',
            'Đen đưa Tượng lên chắn giữa Xe và Sĩ.',
            'Xe ăn Tượng! Sĩ tâm cung lại bị ghim.',
            'Nước duy nhất: Tướng và Sĩ không đi được; Tượng góc không ăn được Xe vì mắt Tượng bị Tốt chặn, nên chỉ còn đường ra biên.',
            'Tốt xuống đáy chiếu, được Tướng Đỏ bảo vệ qua lộ mặt tướng; Sĩ tâm cung bị ghim không ăn được Tốt. Chiếu bí!',
          ],
          caption: 'Xe ghim Sĩ, Tốt xuống đáy chiếu bí.',
        },
      },
    ],
    keyTakeaways: [
      'Xe cần đồng đội để phá Sĩ Tượng: Pháo, Mã hay Tốt đều tạo được đòn kết thúc.',
      'Tướng mình là quân tấn công thầm lặng: nó khóa cột và ghim quân phòng thủ.',
      'Pháo ở lộ giữa ghim được cả Sĩ lẫn Tượng nằm thẳng hàng.',
      'Ngọa tào mã + Xe khóa hàng giữa cung là mẫu chiếu bí kinh điển.',
      'Thí quân để kéo quân phòng thủ khỏi nhiệm vụ của nó; Tốt chỉ xuống đáy khi đó là đòn kết thúc.',
    ],
  },

  // ───────────────────────────── 10. Mã Tốt, Pháo Tốt ─────────────────────────────
  {
    id: 'xq-tc-ma-tot-phao-tot',
    category: 'tan-cuoc',
    title: 'Mã Tốt, Pháo Tốt đối Sĩ Tượng',
    subtitle: 'Một Tốt cùng một quân nhẹ: ai mạnh hơn?',
    level: 4,
    icon: '🤝',
    minutes: 15,
    intro:
      'Một mình Tốt khó thắng Sĩ Tượng, một mình Mã hay Pháo cũng vậy. Nhưng khi **một quân nhẹ phối hợp với một Tốt**, sức mạnh tăng lên gấp bội: Tốt khóa các điểm trong cung, Mã giăng lưới, Pháo lấy Tốt làm ngòi. Bài này so sánh hai cặp đôi quen thuộc nhất và chỉ ra một khác biệt quan trọng: **Mã Tốt thắng gần như mọi lúc, còn Pháo Tốt phụ thuộc rất nhiều vào độ cao của Tốt**.',
    sections: [
      {
        heading: 'Mã Tốt đối Sĩ đôi: Tốt khóa, Mã chiếu',
        body: `Phân tích đầy đủ cho thấy **Mã Tốt thắng Sĩ đơn, Tượng đơn và cả Sĩ đôi trong gần như mọi thế cờ**. Tốt khống chế các điểm mà Mã không với tới, còn Mã nhảy quanh cung để chiếu và bắt quân.

Ở ví dụ bên cạnh:
- Mã vào góc cung chiếu, đẩy Tướng Đen lên.
- Tướng Đỏ chiếm lộ giữa, Tốt lên mép trên cung khóa tâm cung.
- Mã lui ra cánh khống chế các điểm quanh Tướng Đen – Đen chỉ còn đi Sĩ, và Tốt bình vào chiếu bí.`,
        diagram: {
          fen: '3aka3/9/9/4P4/2N6/9/9/9/9/3K5 w - - 0 1',
          moves: 'M7.6 Tg5.1 Tg6-5 Tg5-4 B5.1 S4.5 M6.8 S5.6 B5-6',
          notes: [
            'Chiếu! Mã nhảy vào góc mép trên của cung.',
            'Nước duy nhất.',
            'Tướng Đỏ ra lộ giữa: khi Tốt rời cột này, Tướng Đỏ sẽ khóa nó.',
            'Nước duy nhất: điểm phía trước bị Tốt khống chế, điểm đáy giữa và điểm bên lộ 6 bị Mã khống chế.',
            'Tốt lên mép trên cung, khống chế tâm cung.',
            'Sĩ lên tâm cung, được Tướng bảo vệ.',
            'Mã lui ra cánh, khống chế cả hai điểm trên lộ 4 quanh Tướng Đen. Tướng Đen hết đường đi – Đen chỉ còn đi Sĩ.',
            'Sĩ rời tâm cung (đi đâu cũng thua).',
            'Tốt bình vào chiếu, được Mã bảo vệ. Tâm cung bỏ trống nhưng Tướng Đen bước vào là lộ mặt Tướng Đỏ. Chiếu bí!',
          ],
          caption: 'Mã và Tốt chia nhau khống chế cung.',
        },
      },
      {
        heading: 'Mã + lão tốt vẫn thắng',
        body: `Điều đáng ngạc nhiên: với Mã bên cạnh, **ngay cả lão tốt cũng rất có ích**. Phân tích cho thấy Mã + lão tốt vẫn thắng Sĩ đơn, Tượng đơn hay Sĩ đôi trong gần như mọi thế. Lão tốt khống chế hai điểm ở hàng đáy và có thể ăn Sĩ ở góc đáy, còn Mã lo phần còn lại.

So sánh: Mã một mình đối Sĩ đôi phần lớn là hòa; chỉ cần thêm một lão tốt, kết quả đổi hẳn.`,
        diagram: {
          fen: '2Paka3/9/9/9/4N4/9/9/5K3/9/9 w - - 0 1',
          moves: 'M5.4 Tg5.1 M4.2 Tg5/1 Tg4/1 Tg5.1 M2.4 Tg5/1 B7-6 Tg5.1 Tg4.1',
          notes: [
            'Chiếu! Mã vào góc mép trên cung.',
            'Nước duy nhất.',
            'Mã lui ra, nhắm vào Sĩ ở góc đáy.',
            'Tướng Đen lui về bảo vệ Sĩ.',
            'Nước chờ! Đen phải đi, và mọi nước Sĩ đều thua ngay.',
            'Tướng Đen buộc phải rời Sĩ.',
            'Mã ăn Sĩ.',
            'Nước duy nhất: lộ 6 bị Tướng Đỏ khóa, hai điểm còn lại bị Mã khống chế.',
            'Lão tốt bình vào ăn nốt Sĩ thứ hai, chiếu!',
            'Tướng Đen lên tâm cung.',
            'Nước chờ cuối cùng: điểm đáy giữa bị lão tốt khống chế, điểm bên lộ 4 và điểm phía trước bị Mã khống chế, lộ 6 bị Tướng Đỏ khóa. Đen hết nước đi.',
          ],
          caption: 'Lão tốt ăn Sĩ ở hàng đáy, Mã giăng lưới.',
        },
      },
      {
        heading: 'Pháo Tốt đối Sĩ: Tốt làm ngòi, Sĩ bị ghim',
        body: `Pháo Tốt đối Sĩ đơn hay Sĩ đôi thắng trong gần như mọi thế khi Tốt còn cao, và vẫn thường thắng với Tốt thấp – **miễn là Tốt chưa xuống đáy**. Bí quyết: Tốt áp sát tâm cung để làm ngòi cho Pháo ở lộ giữa. Khi đó Sĩ ở tâm cung bị **ghim** (Sĩ rời đi thì Pháo chiếu Tướng), và Tốt ung dung ăn Sĩ.

Nhưng nếu Tốt đã là lão tốt, Pháo mất ngòi và phần lớn các thế trở thành hòa.`,
        diagram: {
          fen: '3ak4/9/9/4P4/9/9/9/2C6/9/3K5 w - - 0 1',
          moves: 'Tg6-5 S4.5 B5.1 S5/6 Tg5-6 S6.5 P7-5 Tg5-6 B5.1',
          notes: [
            'Tướng Đỏ ra lộ giữa (Tốt đứng chắn nên hai Tướng không đối mặt).',
            'Sĩ lên tâm cung chặn đường Tốt.',
            'Tốt áp sát, uy hiếp Sĩ – Sĩ đang được Tướng bảo vệ.',
            'Sĩ lui về góc đáy (đi Tướng thì thua ngay).',
            'Tướng Đỏ trở lại lộ 6, khóa lộ 4 của Đen. Tướng Đen không còn nước đi, Đen buộc phải đi Sĩ.',
            'Nước duy nhất: Sĩ trở lại tâm cung.',
            'Pháo về lộ giữa, lấy Tốt làm ngòi nhắm vào Sĩ.',
            'Nước duy nhất: Sĩ bị ghim (Sĩ rời đi thì Pháo chiếu Tướng qua ngòi Tốt), nên Tướng phải tránh sang góc.',
            'Tốt ăn Sĩ. Tướng Đen ở góc hết nước đi: điểm đáy giữa bị Tốt (và Pháo) khống chế, điểm phía trước bị Tốt khống chế.',
          ],
          caption: 'Pháo lấy Tốt làm ngòi, ghim Sĩ ở tâm cung.',
        },
      },
      {
        heading: 'Pháo Tốt đối Tượng: chỉ Tốt cao mới đáng sợ',
        body: `Với Tượng, Pháo Tốt gặp khó hơn nhiều. Phân tích đầy đủ cho thấy:
- Tốt cao (chưa xuống quá mép trên cung): Đỏ thắng khoảng 85% số thế.
- **Tốt thấp: Đỏ chỉ thắng khoảng 14%** – phần lớn là hòa.
- Lão tốt: hòa.

Lý do vẫn là cặp đôi quen thuộc: **ngòi** và **nước chờ**. Tốt thấp không quay lại làm ngòi trên lộ giữa được, còn Tượng luôn có nước đi vô hại ngoài cung. Ở thế bên cạnh, Tướng Đen chỉ còn đúng một điểm để đi, nhưng Đen không cần dùng đến nó – cứ đi Tượng là đủ.

**Tổng kết: trong tàn cuộc có Tốt, Mã thường hữu ích hơn Pháo.** Khi phải chọn giữ Mã hay giữ Pháo để vào tàn cuộc, hãy nhớ điều này.`,
        tip: 'Có Pháo Tốt trong tay, hãy giữ Tốt ở trên cao càng lâu càng tốt và chỉ hạ xuống khi nó trực tiếp làm ngòi hoặc chiếu bí.',
        diagram: {
          fen: '2b1k4/3P5/9/9/9/9/9/9/9/3K1C3 w - - 0 1',
          moves: 'P4-5 T3.1 Tg6.1 T1/3 P5.1 T3.1',
          notes: [
            'Pháo về lộ giữa nhắm thẳng Tướng Đen – nhưng giữa chúng không có ngòi, và Tốt thấp không thể quay lại làm ngòi.',
            'Đen đi Tượng chờ.',
            'Đỏ không có gì tốt hơn.',
            'Tượng trở về.',
            'Pháo nhích lên – vẫn không có ngòi.',
            'Đen cứ đi Tượng qua lại. Hòa.',
          ],
          caption: 'Tốt thấp không làm ngòi được, Tượng luôn có nước chờ.',
        },
      },
    ],
    keyTakeaways: [
      'Mã Tốt thắng Sĩ đơn, Tượng đơn, Sĩ đôi trong gần như mọi thế – kể cả khi Tốt đã xuống đáy.',
      'Pháo Tốt thắng Sĩ đơn, Sĩ đôi khi Tốt chưa xuống đáy; lão tốt làm Pháo mất ngòi.',
      'Pháo Tốt đối Tượng: Tốt cao thường thắng, Tốt thấp phần lớn hòa.',
      'Tốt ở lộ giữa sát tâm cung là ngòi lý tưởng, ghim được Sĩ tâm cung.',
      'Trong tàn cuộc có Tốt, Mã thường hữu ích hơn Pháo.',
    ],
  },

  // ───────────────────────────── 11. Thế hòa kinh điển và pháo đài ─────────────────────────────
  {
    id: 'xq-tc-the-hoa',
    category: 'tan-cuoc',
    title: 'Thế hòa kinh điển và pháo đài',
    subtitle: 'Biết khi nào nên tìm hòa – và tìm hòa như thế nào',
    level: 4,
    icon: '🧱',
    minutes: 15,
    intro:
      'Không phải ván cờ nào cũng thắng được. Người chơi giỏi không chỉ biết thắng thế tốt mà còn biết **cứu thế xấu**: nhận ra những tàn cuộc hòa về lý thuyết và chủ động đưa ván cờ về đó. Bài này tổng hợp các thế hòa cơ bản đã gặp trong chương, giới thiệu thêm pháo đài **Pháo song Sĩ** trước Xe, và nhắc em những điều luật giúp – hoặc cản trở – việc giữ hòa.',
    sections: [
      {
        heading: 'Những thế hòa cơ bản cần thuộc',
        body: `Phân tích máy tính đầy đủ các tàn cuộc nhỏ cho những kết luận đáng tin cậy. Các thế sau đây là hòa (trong mọi thế, hoặc trong tuyệt đại đa số thế khi bên phòng thủ đi đúng):
- **Lão tốt đối Tướng đơn**; **Pháo + lão tốt đối Tướng đơn**.
- **Pháo đơn đối Tướng đơn**; **Pháo Tượng đối Tướng đơn**; **Pháo đối Sĩ đơn**.
- **Một Tốt đối Tượng đơn, Sĩ đôi, Tượng đôi hay Sĩ Tượng toàn.**
- **Mã đối Tượng đôi** (như thế bên cạnh), **Mã đối Sĩ đôi** (phần lớn), **Mã đối Sĩ Tượng toàn**.
- **Song Tốt đối Sĩ + Tượng** (khoảng hai phần ba số thế).
- **Xe đơn đối Sĩ Tượng toàn đứng đúng vị trí.**

Bên yếu nên thuộc lòng danh sách này: mỗi lần đổi quân, hãy xem ván cờ có thể rơi vào một trong các thế ấy không.`,
        diagram: {
          fen: '2b1k4/9/4b4/9/9/9/2N6/9/9/3K5 w - - 0 1',
          highlights: ['c9:green', 'e7:green'],
          caption: 'Mã đối Tượng đôi: hai Tượng bảo vệ lẫn nhau – hòa.',
        },
      },
      {
        heading: 'Pháo đài Pháo song Sĩ trước Xe',
        body: `Một pháo đài ít người biết: **Pháo với hai Sĩ có thể giữ hòa trước Xe** nếu đứng đúng thế. Ở thế bên cạnh, một Sĩ ở tâm cung, một Sĩ ở góc đáy, Pháo đứng ở góc mép trên cung được Sĩ tâm cung bảo vệ, Tướng ở hàng giữa cung.

Phân tích đầy đủ cho thấy với thế đứng này, **Đen hòa bất kể Xe và Tướng Đỏ đứng ở đâu – kể cả khi Đen không bao giờ chiếu**. Đen chỉ cần đi lại bằng Tướng (hoặc Pháo trên cột của nó), giữ cho Pháo luôn được bảo vệ.

Nhưng pháo đài này rất "kén": những nước trông vô hại như đưa Sĩ tâm cung đi chỗ khác hay bình Pháo sang ngang thường dẫn tới thua.`,
        warning: 'Trong pháo đài, mỗi quân có đúng một nhiệm vụ. Đừng di chuyển quân giữ vị trí then chốt (ở đây là Sĩ tâm cung) chỉ vì muốn "làm gì đó".',
        diagram: {
          fen: '3a5/4ak3/5c3/9/9/9/9/9/9/3K3R1 w - - 0 1',
          moves: 'X2.8 Tg6/1 X2/1 Tg6.1 Tg6-5 Tg6/1 X2-3 Tg6.1',
          notes: [
            'Xe chiếu theo hàng giữa cung.',
            'Nước duy nhất: Tướng Đen lui xuống góc đáy.',
            'Xe lùi một bước, tấn công Pháo – nhưng Pháo được Sĩ tâm cung bảo vệ.',
            'Tướng Đen trở lại đứng cạnh Pháo.',
            'Tướng Đỏ chiếm lộ giữa.',
            'Tướng Đen lui xuống: Pháo vẫn được Sĩ tâm cung bảo vệ.',
            'Xe áp sát Pháo.',
            'Tướng Đen lại lên bảo vệ Pháo. Đỏ không có cách phá pháo đài – hòa.',
          ],
          caption: 'Pháo song Sĩ đứng đúng thế: Xe không phá được.',
        },
      },
      {
        heading: 'Đổi quân để về thế hòa',
        body: `Bên yếu không chỉ phòng thủ thụ động. Thường thì cách giữ hòa tốt nhất là **chủ động đổi quân** để ván cờ rơi vào một thế hòa đã biết.

Ở thế bên cạnh, Đỏ có hai Tốt nhưng một Tốt đã xuống đáy. Hai Tượng Đen bảo vệ lẫn nhau. Khi lão tốt ăn Tượng góc, Đen **phải ăn lại ngay** – đó là nước duy nhất giữ hòa. Còn lại một Tốt đối Tượng đơn: hòa.

Lưu ý: hai Tốt mà một con đã là lão tốt thì sức mạnh gần như chỉ còn bằng một Tốt. Phân tích cho thấy song Tốt có một lão tốt đối Tượng đôi gần như luôn hòa.`,
        diagram: {
          fen: '1Pb1k4/9/4b4/5P3/9/9/9/9/9/3K5 w - - 0 1',
          moves: 'B4.1 Tg5-6 B8-7 T5/3',
          notes: [
            'Tốt cao tiến lên, uy hiếp Tượng giữa.',
            'Tướng Đen tránh sang góc (Đen có nhiều cách giữ hòa).',
            'Lão tốt ăn Tượng góc.',
            'Nước duy nhất giữ hòa: Tượng giữa ăn lại ngay. Còn lại một Tốt đối Tượng đơn – hòa.',
          ],
          caption: 'Ăn lại đúng lúc để về thế Tốt đối Tượng.',
        },
      },
      {
        heading: 'Luật cờ và pháo đài: pháo đài thật không cần chiếu',
        body: `Khi phòng thủ, em cần nhớ những điều luật sau:
- **Lặp lại thế cờ ba lần** là hòa – đây chính là cách một pháo đài kết thúc ván cờ.
- **60 nước mỗi bên không ăn quân** là hòa – bên mạnh không thể "thử mãi".
- Nhưng **chiếu dai bị xử thua**: nếu bên phòng thủ giữ thế bằng cách chiếu liên tục để lặp lại nước, chính bên phòng thủ sẽ bị xử thua. (Trong thi đấu chính thức còn có luật cấm đuổi bắt dai.)

Vì vậy, một pháo đài thật sự phải đứng vững **mà không cần chiếu**. Pháo đài Pháo song Sĩ ở phần trên thỏa mãn điều đó. Ngược lại, có những thế đứng trông rất giống – chẳng hạn Pháo đứng ở góc đáy thay vì góc mép trên, Tướng ở hàng giữa cung bên cạnh nó – mà nếu không dùng tới các nước chiếu thì bên phòng thủ thua trong phần lớn các trường hợp. Hãy cẩn thận với những "pháo đài" phải dựa vào chiếu.`,
        diagram: {
          fen: '3a1c3/4ak3/9/9/9/9/9/9/9/3K3R1 w - - 0 1',
          highlights: ['f9:red', 'f8:yellow', 'e8:green', 'd9:green'],
          caption: 'Trông giống pháo đài, nhưng Pháo ở góc đáy: không chiếu được thì Đen thường thua.',
        },
      },
    ],
    keyTakeaways: [
      'Thuộc các thế hòa cơ bản: lão tốt, Pháo đơn, Pháo Tượng, một Tốt đối quân phòng thủ, Mã đối hai quân phòng thủ, Xe đối Sĩ Tượng toàn đứng đúng.',
      'Pháo song Sĩ đứng đúng thế giữ được hòa trước Xe – kể cả khi không bao giờ chiếu.',
      'Bên yếu nên chủ động đổi quân để về một thế hòa đã biết, và phải ăn lại đúng lúc.',
      'Pháo đài kết thúc bằng lặp lại thế cờ hoặc luật 60 nước; chiếu dai thì bị xử thua.',
      'Trong pháo đài, giữ nguyên quân then chốt; đừng di chuyển chỉ để "làm gì đó".',
    ],
  },

  // ───────────────────────────── 12. Chuyển hóa ưu thế ─────────────────────────────
  {
    id: 'xq-tc-chuyen-hoa',
    category: 'tan-cuoc',
    title: 'Chuyển hóa ưu thế trong tàn cuộc',
    subtitle: 'Đổi quân đúng lúc, giữ đúng quân, đừng tham ăn',
    level: 5,
    icon: '♻️',
    minutes: 15,
    intro:
      'Trong ván cờ thực tế, ưu thế hiếm khi tự biến thành chiến thắng. Em phải **chuyển hóa** nó: đổi quân để đơn giản hóa, giữ lại những quân phối hợp được với nhau, và tránh những nước ăn quân trông hấp dẫn nhưng lại dẫn về thế hòa. Bài cuối chương này vận dụng mọi kết quả em đã học để trả lời câu hỏi then chốt của tàn cuộc: **nên đổi gì, giữ gì?**',
    sections: [
      {
        heading: 'Hơn quân thì đổi quân',
        body: `Nguyên tắc kinh điển: **khi hơn vật chất, hãy đổi quân** – càng ít quân trên bàn, ưu thế càng rõ và đối phương càng ít cơ hội phản công. Bên kém quân thì ngược lại: tránh đổi, giữ quân để còn cơ hội.

Ở thế bên cạnh, Đỏ hơn một Tốt. Đổi Xe là xong việc: còn lại Tốt cao đối Tướng đơn – thế em đã biết chắc chắn thắng. Phần còn lại chỉ là kỹ thuật của bài "Một Tốt đối Tướng đơn".`,
        tip: 'Trước khi đổi, hãy hình dung thế cờ sau khi đổi. Nếu đó là một tàn cuộc thắng đã biết, đừng ngần ngại.',
        diagram: {
          fen: '9/4k4/4r4/2P6/9/9/9/4R4/9/3K5 w - - 0 1',
          moves: 'X5.5 Tg5.1 B7.1 Tg5/1 B7-6 Tg5/1 B6.1 Tg5-6 B6-5',
          notes: [
            'Đổi Xe!',
            'Đen ăn lại (nếu không, Đen mất trắng một Xe).',
            'Còn lại Tốt cao đối Tướng đơn. Tốt tiến lên.',
            'Tướng Đen lui về.',
            'Tốt bình vào lộ 6, khống chế điểm phía trước Tướng Đen.',
            'Tướng Đen lui về đáy.',
            'Tốt xuống hàng giữa cung: khống chế tâm cung và góc đáy lộ 6; lộ 4 của Đen bị Tướng Đỏ khóa.',
            'Nước duy nhất.',
            'Tốt bình vào tâm cung. Tướng Đen hết nước đi – Đỏ thắng.',
          ],
          caption: 'Đổi Xe để vào tàn cuộc Tốt thắng chắc.',
        },
      },
      {
        heading: 'Đừng đổi Tốt cuối cùng khi chỉ còn Pháo',
        body: `Pháo cần ngòi, và Tốt chính là ngòi quý nhất. Ở thế bên cạnh, Đỏ có Pháo + Tốt cao đối Tượng – thế thắng. Nước **B5.1?** (mũi tên đỏ) ăn Tượng trông rất hấp dẫn, nhưng Tốt ăn xong đứng sát Tướng Đen và bị ăn lại ngay. Còn lại **Pháo đơn đối Tướng đơn: hòa**.

Đỏ nên giữ Tốt và chơi theo kế hoạch: đưa Pháo vào vị trí, Tướng chiếm cột thích hợp, Tốt từ từ áp sát để làm ngòi. Máy tính xác nhận Đỏ thắng nếu không đổi Tốt.`,
        warning: 'Với Pháo, đừng bao giờ đổi Tốt cuối cùng (hay Sĩ cuối cùng) một cách dễ dãi: mất ngòi là mất chiến thắng.',
        diagram: {
          fen: '9/4k4/4b4/4P4/9/9/9/9/9/2CK5 w - - 0 1',
          moves: 'P7.1 T5/3 Tg6-5 Tg5/1 Tg5-4',
          notes: [
            'Nước đúng: giữ Tốt, đưa Pháo lên chuẩn bị chuyển hướng.',
            'Tượng lui về đáy, tránh bị Tốt ăn.',
            'Tướng Đỏ chiếm lộ giữa.',
            'Tướng Đen lui về đáy giữa.',
            'Tướng Đỏ sang lộ 4, khóa lộ 6 của Đen. Đỏ vẫn đang trên đường thắng – miễn là không đổi mất Tốt.',
          ],
          arrows: ['e6e7:red'],
          caption: 'B5.1? ăn Tượng sẽ mất Tốt và chỉ còn hòa.',
        },
      },
      {
        heading: 'Ăn đúng quân: Tượng hay Sĩ?',
        body: `Không phải quân nào của đối phương cũng có giá trị như nhau trong tàn cuộc. Với Mã, em đã biết: **Mã đối Sĩ đơn thắng gần như mọi lúc, còn Mã đối Tượng đơn phần lớn là hòa**. Vậy khi có thể ăn một trong hai, hãy ăn **Tượng**!

Ở thế bên cạnh, nước tham lam **M4.6?** (mũi tên đỏ) ăn ngay Sĩ – nhưng để lại Mã đối Tượng đơn: hòa. Nước thắng duy nhất là **M4/3!**: chiếu và đồng thời tấn công Tượng – **bắt đôi**. Sau khi Tướng Đen tránh chiếu, Mã ăn Tượng và còn lại Mã đối Sĩ đơn – thắng.`,
        diagram: {
          fen: '3a5/5N3/4k3b/9/9/9/9/9/9/3K5 w - - 0 1',
          moves: 'M4/3 Tg5/1 M3.1',
          notes: [
            'Mã chiếu – và đồng thời tấn công Tượng ở biên: bắt đôi! Đây là nước thắng duy nhất.',
            'Tướng Đen phải tránh chiếu.',
            'Mã ăn Tượng. Còn lại Mã đối Sĩ đơn – Đỏ thắng.',
          ],
          arrows: ['f8d9:red'],
          caption: 'M4/3! bắt đôi ăn Tượng thì thắng; M4.6? ăn Sĩ chỉ hòa.',
        },
      },
      {
        heading: 'Bên yếu: diệt Tốt cuối cùng',
        body: `Đảo vai: nếu em là bên kém quân, mục tiêu số một thường là **Tốt cuối cùng của đối phương**. Không còn Tốt, nhiều ưu thế về quân trở nên vô dụng: Mã đối Tượng đơn phần lớn hòa, Pháo đối Tướng đơn hòa.

Ở thế bên cạnh, Đen có bốn nước đi, nhưng chỉ một nước giữ được hòa: **Tượng ăn Tốt**. Ba nước còn lại đều thua. Sau đó Mã đối Tượng đơn – Đen chỉ cần giữ Tượng gần Tướng.`,
        diagram: {
          fen: '4k4/9/4P4/9/6b2/9/9/9/4K4/1N7 b - - 0 1',
          moves: 'T7/5 M8.7 Tg5.1',
          notes: [
            'Nước duy nhất giữ hòa: Tượng ăn Tốt!',
            'Còn lại Mã đối Tượng đơn. Mã lên tìm cơ hội.',
            'Tướng Đen lên đứng cạnh Tượng, bảo vệ nó. Đen giữ được hòa.',
          ],
          caption: 'Diệt Tốt cuối cùng: Mã đơn không thắng nổi Tượng.',
        },
      },
      {
        heading: 'Tổng kết: bảng tra nhanh tàn cuộc',
        body: `Các kết quả dưới đây đều đã được kiểm chứng bằng phân tích máy tính đầy đủ (với bên mạnh đi trước):
- **Thắng (gần như mọi thế):** Tốt cao/thấp đối Tướng đơn; Mã đối Tướng đơn, đối Sĩ đơn; Pháo Sĩ đối Tướng đơn, đối Sĩ đơn; Xe đối Pháo, đối Mã, đối Mã song Sĩ; Xe đối Sĩ Tượng thiếu một quân; Song Tốt cao đối Sĩ đôi hoặc Tượng đôi; Mã Tốt đối Sĩ đơn, Tượng đơn, Sĩ đôi; Pháo Tốt (chưa xuống đáy) đối Sĩ đơn.
- **Tùy thế:** Tốt đối Sĩ đơn (phần lớn hòa); Song Tốt đối Sĩ + Tượng (khoảng một phần ba thắng); Pháo Tốt đối Tượng (Tốt cao thường thắng, Tốt thấp thường hòa); Xe đối Pháo song Sĩ (phụ thuộc thế đứng).
- **Hòa (trong mọi thế hoặc gần như mọi thế):** lão tốt, Pháo đơn, Pháo Tượng đối Tướng đơn; một Tốt đối Tượng hoặc hai quân phòng thủ; Mã đối Tượng đôi; Xe đối Sĩ Tượng toàn đứng đúng.

Hãy dùng bảng này mỗi khi cân nhắc đổi quân: **đổi về thế thắng khi em mạnh, đổi về thế hòa khi em yếu**.`,
        diagram: {
          fen: '9/5k3/9/9/9/9/9/4KA3/9/5C3 b - - 0 1',
          highlights: ['f0:green', 'f2:green', 'e2:green', 'f8:red'],
          caption: 'Pháo Sĩ đối Tướng đơn – một thế thắng cần nhớ: Pháo đáy, Sĩ làm ngòi, Tướng chiếm lộ giữa.',
        },
      },
    ],
    keyTakeaways: [
      'Hơn quân thì đổi quân để đơn giản hóa; kém quân thì tránh đổi và tìm đổi Tốt.',
      'Với Pháo, giữ Tốt và Sĩ làm ngòi – đừng đổi Tốt cuối cùng.',
      'Ăn đúng quân: với Mã, ăn Tượng tốt hơn ăn Sĩ; bắt đôi thường mạnh hơn ăn ngay.',
      'Bên yếu: diệt Tốt cuối cùng của đối phương là con đường hòa ngắn nhất.',
      'Trước mỗi lần đổi, hãy hình dung thế cờ sau khi đổi và đối chiếu với các tàn cuộc đã biết.',
    ],
  },
];
