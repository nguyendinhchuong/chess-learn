import type { XqLesson } from '../types';

export const LESSONS: XqLesson[] = [
  // ───────────────────────── 1. Bắt đôi ─────────────────────────
  {
    id: 'xq-ct-bat-doi',
    category: 'chien-thuat',
    title: 'Bắt đôi: một nước, hai mục tiêu',
    subtitle: 'Mã, Pháo, Xe cùng biết “một mũi tên trúng hai đích”',
    level: 2,
    icon: '🍴',
    minutes: 15,
    intro: `**Bắt đôi** là khi một quân của em tấn công **hai quân** của đối phương cùng lúc. Đối thủ chỉ được đi một nước nên thường chỉ cứu được một quân – quân kia rơi vào tay em.

Trong cờ tướng, đòn bắt đôi có những nét rất riêng: Mã có thể bị **cản chân**, Pháo cần **ngòi**, còn Sĩ, Tượng chỉ đi được những **điểm cố định** nên rất dễ bỏ ngỏ các điểm quanh chúng. Hiểu rõ những luật này, em sẽ thấy đòn bắt đôi ở khắp nơi – và cũng biết cách tránh bị đối thủ bắt đôi.`,
    sections: [
      {
        heading: 'Mã bắt đôi Xe – Pháo',
        body: `Mã là quân bắt đôi “khó thấy” nhất: nó đi theo hình chữ “nhật”, tấn công tới **8 điểm**, và quân bị Mã tấn công (trừ một con Mã khác) **không thể ăn ngược lại** con Mã từ chỗ nó đang đứng.

Điều kiện để Mã bắt đôi thành công:

- Hai **chân Mã** dẫn tới hai mục tiêu đều **trống** (không bị cản).
- Điểm Mã đứng **an toàn**, không bị quân đối phương ăn.
- Hai mục tiêu **không bảo vệ được cho nhau**.

Ví dụ: Mã d4 ăn Tốt đầu e6 và đứng ngay giao điểm của Xe c7 và Pháo g7. Con Tượng e7 của Đen chắn ngang hàng 7 nên Xe không với tới để bảo vệ Pháo.`,
        tip: 'Trước mỗi nước, hãy tự hỏi: “Có hai quân nào của đối phương cách nhau đúng một bước Mã tính từ cùng một điểm không?”. Câu hỏi này mở ra phần lớn đòn bắt đôi bằng Mã.',
        diagram: {
          fen: '2baka3/9/2r1b1c2/p1p1p1p1p/1n7/3N5/P1P1P1P1P/7C1/9/2BAKAB1R w - - 0 1',
          moves: 'M6.5 X3-4 M5.3',
          notes: [
            'Mã ăn Tốt đầu e6 và bắt đôi: tấn công Xe c7 (chân d6 trống) và Pháo g7 (chân f6 trống). Không quân Đen nào ăn được con Mã ở e6.',
            'Đen cứu Xe. Nếu Đen cứu Pháo bằng cách bình sang h7 (vẫn giữ được Xe nhờ ngòi Tượng e7), Đỏ sẵn sàng đổi Mã lấy Xe – vẫn lời to.',
            'Mã ăn Pháo. Đỏ lời một Pháo và một Tốt mà không mất gì.',
          ],
          arrows: ['d4e6', 'e6c7:red', 'e6g7:red'],
          highlights: ['c7:red', 'g7:red'],
          caption: 'Đỏ đi: Mã tìm điểm bắt đôi.',
        },
      },
      {
        heading: 'Pháo bắt đôi – và chiếu kèm bắt quân',
        body: `Pháo tấn công bằng cách **nhảy qua đúng một ngòi**. Vì vậy một nước Pháo có thể vừa **chiếu Tướng** dọc một đường, vừa **nhắm vào quân khác** trên đường kia.

Thế cờ dưới đây rất đáng học: Pháo h5 dùng Tốt g5 làm ngòi để ăn Tốt e5. Sau khi nhảy sang e5, Pháo **chiếu Tướng** qua ngòi Tượng e7; đồng thời chính Tốt g5 – ngòi vừa dùng – lại trở thành ngòi để Pháo nhắm vào **Xe i5**. Đen phải lo chiếu, và Xe rơi.`,
        tip: 'Sau khi Pháo nhảy qua một ngòi, hãy nhìn lại phía sau: chính ngòi vừa nhảy qua thường trở thành ngòi cho đòn tấn công tiếp theo.',
        diagram: {
          fen: '1nbaka3/9/1c2b4/p1p6/4p1pCr/9/P1P1P1P2/2N6/R8/2BAKAB2 w - - 0 1',
          moves: 'P2-5 S6.5 P5-1',
          notes: [
            'Pháo nhảy qua ngòi Tốt g5 ăn Tốt e5 và chiếu Tướng (ngòi là Tượng e7). Cùng lúc Pháo nhắm Xe i5 qua ngòi Tốt g5: chiếu kèm bắt quân!',
            'Đen phải che chiếu bằng Sĩ. Không có nước nào vừa giải chiếu vừa cứu được Xe – Xe i5 cũng không chạy vào lộ giữa được vì Tốt g5 chắn đường.',
            'Pháo ăn Xe. Đỏ lời trọn một Xe và một Tốt.',
          ],
          arrows: ['h5e5', 'e5e9:red', 'e5i5:red'],
          highlights: ['i5:red', 'e9:red'],
          caption: 'Một nước Pháo: chiếu Tướng và bắt Xe.',
        },
      },
      {
        heading: 'Xe bắt đôi theo hàng ngang',
        body: `Xe đi được cả hàng ngang lẫn hàng dọc, nên rất giỏi bắt đôi **hai quân không được bảo vệ** đứng trên cùng một hàng.

Một điểm đặc biệt của cờ tướng: Sĩ và Tượng chỉ đi được những điểm cố định, nên khi hai Sĩ đối phương còn ở d9, f9, các **góc cung phía trên** (d7, f7) thường là chỗ Xe đứng an toàn. Ở ví dụ dưới, Xe tiến lên d7 – không quân nào của Đen chạm được tới điểm này – và tấn công cùng lúc Pháo b7 và Mã g7.`,
        diagram: {
          fen: '2bakab2/9/1c4n2/p1p1p1p1p/9/9/P1PRP1P1P/9/9/2BAKAB2 w - - 0 1',
          moves: 'X6.4 P2.2 X6-3',
          notes: [
            'Xe tiến thẳng lên d7, tấn công Pháo b7 (c7 trống) và Mã g7 (e7, f7 trống) trên cùng hàng 7. Sĩ d9 chỉ đi được e8, Tượng không tới được d7: Xe đứng hoàn toàn an toàn.',
            'Đen chỉ cứu được một quân: Pháo chạy xuống b5. (Nếu Đen lên Tượng e7 để che cho Mã thì Xe ăn Pháo b7.)',
            'Xe ăn Mã. Đỏ hơn hẳn một quân.',
          ],
          arrows: ['d3d7', 'd7b7:red', 'd7g7:red'],
          highlights: ['b7:red', 'g7:red'],
          caption: 'Hai quân lỏng lẻo trên cùng hàng 7.',
        },
      },
      {
        heading: 'Mã chiếu Tướng bắt Xe',
        body: `Đòn bắt đôi mạnh nhất là khi **một trong hai mục tiêu là Tướng**. Đối thủ **bắt buộc** phải giải chiếu trước, không có thời gian cứu quân còn lại.

Hãy nhớ những điểm Mã chiếu Tướng ở e9: **c8, g8** (chân d8, f8) và **d7, f7** (cũng chân d8, f8). Từ g8, Mã còn chạm tới **i9** – nơi Xe Đen hay đứng khi chưa ra quân. Đây là đòn “Mã chiếu bắt Xe” mà người mới học rất hay bị dính.`,
        warning: 'Đừng để Xe nằm im ở góc i9 (hoặc a9) khi Mã đối phương đã áp sát cung: chỉ một nước Mã vào g8 (hoặc c8) là vừa chiếu vừa bắt Xe.',
        diagram: {
          fen: '2bakab1r/9/2n4c1/p1p1pNp1p/9/9/P1P1P1P1P/1C7/9/R1BAKAB2 w - - 0 1',
          moves: 'M4.3 Tg5.1 M3.1',
          notes: [
            'Mã nhảy vào g8 chiếu Tướng (chân f8 trống), đồng thời tấn công Xe i9 (chân h8 trống).',
            'Nước duy nhất: Tướng lên e8. Không quân Đen nào ăn được Mã g8, cũng không ai chặn được chân f8.',
            'Mã ăn Xe. Con Mã ở góc vẫn còn đường lui về g8, Đỏ hơn hẳn một Xe.',
          ],
          arrows: ['f6g8', 'g8e9:red', 'g8i9:red'],
          highlights: ['e9:red', 'i9:red'],
          caption: 'Đòn kinh điển: Mã chiếu bắt Xe.',
        },
      },
      {
        heading: 'Cách săn tìm đòn bắt đôi',
        body: `Hãy tập thói quen quét bàn cờ theo các bước:

- **Tìm quân lỏng lẻo**: quân nào của đối phương không được bảo vệ? Xe, Pháo, Mã đang đứng ở đâu?
- **Tìm giao điểm**: điểm nào mà một quân của mình có thể tấn công hai mục tiêu cùng lúc? Với Mã, nhớ kiểm tra **chân Mã**; với Pháo, đếm **ngòi**.
- **Kiểm tra an toàn**: điểm đó có bị ăn không? Đối thủ có cách **vừa cứu quân vừa phản đòn** (chặn chân Mã, chen thêm ngòi, chiếu lại) không?
- **Ưu tiên chiếu**: bắt đôi kèm chiếu là mạnh nhất vì đối thủ không có thời gian phản công.

Và ở chiều ngược lại: đừng để Xe, Pháo của mình đứng ở hai điểm mà một con Mã đối phương có thể chạm tới cùng lúc.`,
        tip: 'Bắt đôi ăn quân ít khi “từ trên trời rơi xuống”. Thường em phải chuẩn bị bằng một nước đổi quân, một nước chiếu hoặc một nước ăn Tốt để đưa quân tới đúng giao điểm.',
      },
    ],
    keyTakeaways: [
      'Bắt đôi = một quân tấn công hai mục tiêu cùng lúc; đối thủ chỉ cứu được một.',
      'Mã bắt đôi cần hai chân Mã trống; Pháo bắt đôi cần đúng một ngòi trên mỗi đường.',
      'Chiếu kèm bắt quân là dạng bắt đôi mạnh nhất vì đối thủ buộc phải giải chiếu.',
      'Đề phòng đòn Mã chiếu bắt Xe khi Xe còn nằm ở góc a9 – i9.',
      'Quân không được bảo vệ là mục tiêu số một.',
    ],
  },

  // ───────────────────────── 2. Ghim và khống chế ─────────────────────────
  {
    id: 'xq-ct-ghim-khong-che',
    category: 'chien-thuat',
    title: 'Ghim và khống chế: làm tê liệt quân đối phương',
    subtitle: 'Xe ghim quân vào Tướng, Pháo “đóng băng” quân làm ngòi',
    level: 2,
    icon: '📌',
    minutes: 16,
    intro: `**Ghim** là khi một quân của đối phương không dám (hoặc không được phép) rời chỗ, vì nếu nó đi, quân quan trọng hơn phía sau – thường là **Tướng** – sẽ bị tấn công.

Cờ tướng có hai kiểu ghim rất đặc trưng:

- **Xe ghim**: Xe, quân bị ghim và Tướng đứng thẳng hàng. Quân bị ghim rời đường thì Tướng bị chiếu – nước đi phạm luật.
- **Pháo khống chế**: giữa Pháo và Tướng có **hai quân**. Nếu một trong hai quân rời đi, quân còn lại thành **ngòi duy nhất** và Pháo chiếu Tướng. Vì vậy cả hai quân đều bị “đóng băng”.

Một quân bị ghim gần như đã chết: không bảo vệ được ai, không chạy được đâu.`,
    sections: [
      {
        heading: 'Xe ghim quân vào Tướng – và tấn công quân bị ghim',
        body: `Khi Xe ghim một quân vào Tướng, quân đó **không được phép** rời đường ghim. Nhưng chưa chắc đã thắng được nó ngay: nếu quân bị ghim được bảo vệ, Xe ăn vào sẽ bị ăn lại.

Nguyên tắc vàng: **hãy tấn công quân bị ghim bằng quân rẻ hơn**, tốt nhất là bằng **Tốt**. Quân bị ghim không chạy được, nên đối thủ sẽ phải mất nó.

Ở ví dụ dưới, Mã e7 bị Xe e3 ghim vào Tướng e9 (giữa chúng không còn quân nào khác). Mã có hai Tượng bảo vệ, nên Xe chưa ăn được. Đỏ tiến Tốt d6 lên d7 tấn công con Mã đang bị “trói”.`,
        diagram: {
          fen: 'r1bakab2/9/1c2n4/p2P2p1p/9/9/P1P1R3P/7C1/9/1NBAKAB2 w - - 0 1',
          moves: 'B6.1 S4.5 B6-5 T3.5',
          notes: [
            'Tốt lên d7 tấn công Mã e7. Mã bị Xe e3 ghim: nếu Mã rời e7, Xe chiếu thẳng Tướng, nên Mã không được phép đi. Không quân Đen nào ăn được Tốt d7.',
            'Đen lên Sĩ e8 để gỡ ghim – từ giờ Mã mới được đi, nhưng đã chậm một nhịp.',
            'Tốt ăn Mã.',
            'Tượng ăn lại Tốt. Đỏ đổi một Tốt lấy một Mã.',
          ],
          arrows: ['e3e9:red', 'd6d7'],
          highlights: ['e7:red'],
          caption: 'Mã e7 bị Xe ghim vào Tướng.',
        },
      },
      {
        heading: 'Pháo khống chế: Sĩ không dám rời chỗ',
        body: `Pháo cần đúng **một ngòi** để chiếu. Nếu giữa Pháo và Tướng có **hai quân**, Pháo chưa chiếu – nhưng cả hai quân đó đều bị khống chế, vì chỉ cần một quân rời đi là Pháo chiếu ngay.

Thế cờ dưới đây: Pháo e2, Tốt e6, Sĩ e8 và Tướng e9 thẳng hàng. Sĩ e8 vì thế bị **đóng băng**. Đỏ tận dụng ngay: Mã nhảy vào f7 chiếu Tướng. Bình thường Sĩ e8 sẽ ăn con Mã này – nhưng Sĩ không được phép rời e8!`,
        tip: 'Mỗi khi thấy Pháo đầu (Pháo ở lộ giữa) nhắm vào cung đối phương với hai quân chắn giữa, hãy hỏi: “Hai quân này đang phải bảo vệ điểm nào? Nếu chúng không được đi, điểm nào bỏ ngỏ?”.',
        diagram: {
          fen: 'rnb1kab2/3Pa4/1c7/p3p3p/6N2/9/P7P/4C4/8R/2BAKAB2 w - - 0 1',
          moves: 'M3.4',
          notes: [
            'Mã vào f7 chiếu Tướng (chân f8 trống). Sĩ e8 không được ăn Mã vì khi đó Tốt e6 thành ngòi duy nhất và Pháo e2 chiếu Tướng. Tướng không có đường chạy: d9 bị Tốt d8 khống chế, e8 và f9 đều là Sĩ nhà. Chiếu bí!',
          ],
          arrows: ['e2e8:red', 'g5f7'],
          highlights: ['e8:red', 'e9:red'],
          caption: 'Đỏ đi và chiếu bí ngay.',
        },
      },
      {
        heading: 'Pháo khống chế Xe: “nhốt” cả quân mạnh nhất',
        body: `Pháo khống chế không chỉ làm tê liệt Sĩ, Tượng. Ngay cả **Xe** cũng có thể bị đóng băng nếu nó là một trong hai ngòi giữa Pháo và Tướng.

Ở ví dụ dưới, giữa Pháo e2 và Tướng e8 có Tốt e5 và Xe e7. Xe không được rời lộ giữa. Đỏ chỉ cần đẩy Tốt lên e6: Xe bị Tốt tấn công mà **không có một nước đi hợp lệ nào** – nếu Xe ăn Tốt e6 thì chính Xe lại thành ngòi duy nhất và Pháo chiếu Tướng.`,
        diagram: {
          fen: '1nba1ab2/4k4/1c2r4/p1p3p1p/4P4/7N1/P1P3P1P/4C4/R8/2BAKAB2 w - - 0 1',
          moves: 'B5.1 P2.2 B5.1 Tg5.1',
          notes: [
            'Tốt lên e6 tấn công Xe e7. Xe đã bị khóa chặt: rời lộ giữa thì Tốt e6 thành ngòi duy nhất, ăn Tốt e6 thì chính Xe thành ngòi duy nhất – cả hai đều để Tướng bị Pháo chiếu.',
            'Đen không có cách nào cứu Xe, đành đi nước khác.',
            'Tốt ăn Xe và chiếu Tướng.',
            'Tướng ăn lại Tốt. Đỏ đổi một Tốt lấy trọn một Xe.',
          ],
          arrows: ['e2e8:red', 'e5e6'],
          highlights: ['e7:red'],
          caption: 'Xe e7 bị Pháo khống chế.',
        },
      },
      {
        heading: 'Cách thoát khỏi ghim và khống chế',
        body: `Khi quân của em bị ghim hoặc bị khống chế, hãy xét các cách:

- **Gỡ ghim trước**: di chuyển Tướng ra khỏi đường ghim, hoặc chen thêm một quân vào giữa (với Pháo, chen thêm quân thứ ba làm Pháo mất tác dụng). Hãy làm việc này **trước khi** đối thủ kịp tấn công quân bị ghim – như ví dụ Tốt d7 ở trên, gỡ ghim chậm một nhịp là mất quân.
- **Đuổi quân ghim**: tấn công Xe hoặc Pháo đang ghim mình.
- **Phản đòn**: tạo một đe dọa lớn hơn (chiếu, dọa chiếu bí) để đối thủ không có thời gian khai thác.

Phòng bệnh hơn chữa bệnh: hạn chế để Tướng đứng cùng lộ với Xe đối phương, và luôn đếm số quân nằm giữa Pháo đối phương với Tướng mình.`,
        warning: 'Khi giữa Pháo đối phương và Tướng của em chỉ còn đúng hai quân, cả hai đều đã bị khóa. Đừng định dùng chúng để ăn quân hay bảo vệ điểm khác – nước đi đó phạm luật!',
      },
    ],
    keyTakeaways: [
      'Xe ghim: quân đứng giữa Xe và Tướng không được rời đường thẳng đó.',
      'Pháo khống chế: hai quân đứng giữa Pháo và Tướng đều bị đóng băng.',
      'Hãy tấn công quân bị ghim bằng quân rẻ hơn – lý tưởng nhất là Tốt.',
      'Quân bị khống chế không thể ăn quân đang chiếu – ghim có thể biến một nước chiếu thường thành chiếu bí.',
      'Gỡ ghim phải làm sớm; chậm một nhịp là mất quân.',
    ],
  },

  // ───────────────────────── 3. Đòn mở ─────────────────────────
  {
    id: 'xq-ct-don-mo',
    category: 'chien-thuat',
    title: 'Đòn mở và chiếu đôi',
    subtitle: 'Chiếu mở, mở chân Mã và những cú chiếu không thể đỡ',
    level: 3,
    icon: '💥',
    minutes: 17,
    intro: `**Đòn mở** xảy ra khi em di chuyển một quân và **để lộ** đường tấn công của một quân khác đứng phía sau nó. Một nước đi tạo ra **hai đe dọa cùng lúc**: của quân vừa đi và của quân được “mở”.

Trong cờ tướng, đòn mở có ba dạng chính:

- **Chiếu mở bằng Xe**: quân chắn trước Xe rời đi, Xe chiếu Tướng.
- **Chiếu mở bằng Pháo**: giữa Pháo và Tướng có hai quân; một quân rời đi, quân còn lại thành ngòi và Pháo chiếu.
- **Mở chân Mã**: quân đang chắn chân Mã rời đi, con Mã bỗng nhiên “sống dậy”.

Khi cả quân vừa đi lẫn quân được mở cùng chiếu Tướng, ta có **chiếu đôi** – đòn chỉ có thể đỡ bằng cách chạy Tướng.`,
    sections: [
      {
        heading: 'Chiếu mở bằng Xe: Mã tự do ăn quân',
        body: `Khi quân chắn trước Xe rời đi **kèm theo chiếu mở**, quân vừa đi được hoàn toàn tự do: đối thủ còn bận cứu Tướng nên không thể bắt nó, cũng không kịp cứu quân bị nó tấn công.

Ví dụ: Xe e1 nhắm thẳng Tướng e9, chỉ bị chính Mã e4 của Đỏ chắn. Mã nhảy sang f6 – vừa mở đường cho Xe chiếu, vừa tấn công Xe h7 của Đen.`,
        diagram: {
          fen: '2bakabc1/9/6nr1/p1p5p/9/4N4/P1P3P1P/1C7/4R4/2BAKAB2 w - - 0 1',
          moves: 'M5.4 T7.5 M4.2',
          notes: [
            'Chiếu mở! Mã rời lộ giữa sang f6, Xe e1 chiếu Tướng. Đồng thời Mã f6 tấn công Xe h7 (chân g6 trống).',
            'Đen phải lo che chiếu – ở đây bằng Tượng (lên Sĩ hay dùng Mã che cũng không cứu được Xe). Xe h7 không tự cứu được: nó cũng không chạy vào lộ giữa để che chiếu được vì Mã g7 chắn đường.',
            'Mã ăn Xe. Đỏ lời trọn một Xe.',
          ],
          arrows: ['e4f6', 'e1e9:red', 'f6h7:red'],
          highlights: ['h7:red'],
          caption: 'Mã e4 là “tấm màn” che Xe e1.',
        },
      },
      {
        heading: 'Chiếu mở bằng Pháo: rút ngòi để chiếu',
        body: `Pháo cần đúng một ngòi. Nếu giữa Pháo và Tướng đối phương có **hai quân**, trong đó có một quân của em, thì quân ấy là một **“ngòi dự bị”**: chỉ cần nó rời đi, quân còn lại thành ngòi và Pháo chiếu ngay.

Ở ví dụ dưới, giữa Pháo e2 và Tướng e9 có Xe e5 của Đỏ và Tốt e6 của Đen. Xe Đỏ bình sang ăn Xe b5: Tốt e6 lập tức thành ngòi cho Pháo chiếu Tướng. Đen phải lo chiếu, không kịp ăn lại Xe.`,
        tip: 'Khi Pháo của em đứng sau hai quân trên cùng lộ với Tướng địch, hãy xem quân của em có thể rời đi bằng một nước **ăn quân** hay không – đó là công thức của đòn “rút ngòi chiếu”.',
        diagram: {
          fen: '2bakabr1/9/2n3c2/p1p1p1p1p/1r2R4/9/P1P3P1P/4C4/9/1NBAKAB1R w - - 0 1',
          moves: 'X5-8 T3.5',
          notes: [
            'Xe bình sang ăn Xe b5. Xe vừa rời lộ giữa nên Tốt e6 thành ngòi duy nhất và Pháo e2 chiếu Tướng – chiếu mở!',
            'Đen phải che chiếu (Tượng lên e7) và không còn thời gian ăn lại Xe: Mã c7 bị chính Tốt c6 cản chân. Đỏ lời trọn một Xe.',
          ],
          arrows: ['e5b5', 'e2e9:red'],
          highlights: ['b5:red', 'e9:red'],
          caption: 'Xe e5 là một trong hai ngòi của Pháo e2.',
        },
      },
      {
        heading: 'Mở chân Mã',
        body: `Một con Mã bị cản chân thì “chết đứng”. Nhưng nếu quân cản chân là **quân của em** và nó rời đi bằng một nước mạnh, con Mã sẽ bất ngờ tham chiến.

Ở thế dưới, Mã g7 muốn khống chế điểm e8 nhưng chân f7 bị chính Xe f7 của Đỏ chặn. Xe tiến lên ăn Sĩ f9 chiếu Tướng: chân Mã được mở, Mã lập tức khống chế e8 và bảo vệ Xe ở f9.`,
        diagram: {
          fen: '2bakab1r/9/2n2RN2/pr2p3p/7c1/9/P1P1P3P/1C7/9/2BAKAB2 w - - 0 1',
          moves: 'X4.2',
          notes: [
            'Xe ăn Sĩ f9 chiếu Tướng. Rời f7, Xe mở chân cho Mã g7: Mã khống chế e8 (chân f7) và bảo vệ Xe f9 (chân g8). Tướng không ăn được Xe, không lên được e8, còn d9 là Sĩ nhà – chiếu bí!',
          ],
          arrows: ['f7f9', 'g7e8:red', 'g7f9:green'],
          highlights: ['e8:red'],
          caption: 'Xe f7 đang cản chân chính con Mã của mình.',
        },
      },
      {
        heading: 'Chiếu đôi: không thể chặn, không thể ăn',
        body: `**Chiếu đôi** là khi **hai quân cùng chiếu Tướng** một lúc. Không thể chặn hai đường chiếu, cũng không thể ăn hai quân trong một nước – **cách duy nhất** là chạy Tướng. Nếu Tướng không còn chỗ chạy, đó là chiếu bí ngay; nếu còn, Tướng thường bị lùa vào một điểm chết.

Ví dụ: Mã e5 nhảy vào f7 chiếu Tướng, đồng thời mở đường cho Xe e1 chiếu dọc lộ giữa. Tướng buộc phải chạy sang f9 – và ở đó, chính con Mã f7 trở thành ngòi cho Pháo kết thúc ván cờ.`,
        warning: 'Đừng để Tướng đứng cùng lộ với Xe đối phương chỉ vì “đã có quân chắn”. Nếu quân chắn là Mã của đối phương, nó có thể nhảy đi bất cứ lúc nào kèm theo một cú chiếu đôi.',
        diagram: {
          fen: '1nbak4/9/b6cr/p1p3p1p/4N4/9/P1P3P1P/1C7/4R4/2BAKAB2 w - - 0 1',
          moves: 'M5.4 Tg5-6 P8-4',
          notes: [
            'Chiếu đôi! Mã vào f7 chiếu Tướng (chân f8 trống), đồng thời mở lộ giữa cho Xe e1 chiếu. Đen không thể đỡ cả hai đường chiếu.',
            'Nước duy nhất: Tướng chạy sang f9 (d9 là Sĩ nhà, e8 vẫn nằm trên đường Xe).',
            'Pháo bình sang lộ 4 chiếu, dùng chính Mã f7 làm ngòi. Tướng không về được e9 (Xe e1 và Mã f7 khống chế), không lên được f8 (vẫn trên đường Pháo). Chiếu bí!',
          ],
          arrows: ['e5f7', 'e1e9:red', 'f7e9:red'],
          highlights: ['e9:red'],
          caption: 'Đỏ đi và chiếu bí sau 2 nước.',
        },
      },
      {
        heading: 'Nhận biết và phòng thủ đòn mở',
        body: `Cách tìm cơ hội đòn mở:

- Tìm các **Xe, Pháo** của mình đang nhắm vào Tướng (hoặc quân lớn) của đối phương nhưng **bị chính quân mình che**.
- Với Pháo, đếm số quân giữa Pháo và Tướng địch: nếu là **hai** và một quân là của mình, em đang có một “ngòi dự bị”.
- Hỏi: quân che đường có thể đi đâu để tạo thêm đe dọa – **chiếu**, **ăn quân**, hay **mở chân Mã**?

Cách phòng thủ: đừng để Tướng và Xe của mình nằm trên cùng đường với Xe, Pháo đối phương, kể cả khi đang có quân chắn giữa; và luôn để ý những con Mã đối phương đang bị cản chân bởi chính quân của họ – khi quân cản rời đi, con Mã ấy lập tức nguy hiểm.`,
        tip: 'Chiếu đôi thường đến từ cặp **Mã + Xe** hoặc **Mã + Pháo** trên cùng một lộ. Khi thấy Mã đối phương đứng trước Xe hoặc Pháo của họ trên lộ của Tướng mình, hãy dời Tướng hoặc chen quân ngay.',
      },
    ],
    keyTakeaways: [
      'Đòn mở = di chuyển quân chắn để lộ đường tấn công của quân phía sau.',
      'Chiếu mở cho phép quân vừa đi tự do ăn quân, vì đối thủ bận giải chiếu.',
      'Với Pháo, quân của mình trong cặp hai ngòi là “ngòi dự bị” – rút ngòi là chiếu.',
      'Quân rời khỏi chân Mã có thể đánh thức con Mã đang ngủ.',
      'Chiếu đôi chỉ có thể thoát bằng cách chạy Tướng.',
    ],
  },

  // ───────────────────────── 4. Thí quân mở đường ─────────────────────────
  {
    id: 'xq-ct-thi-quan-mo-duong',
    category: 'chien-thuat',
    title: 'Thí quân mở đường',
    subtitle: 'Phá Sĩ, phá Tượng, kéo Tướng ra khỏi cung',
    level: 4,
    icon: '🔥',
    minutes: 18,
    intro: `Sĩ và Tượng là “tường thành” của Tướng. Khi tường thành còn nguyên, đôi khi không có nước đi bình thường nào chiếu bí được – lúc ấy kỳ thủ tấn công phải **thí quân**: bỏ một quân lớn để **phá Sĩ, phá Tượng**, **kéo Tướng ra chỗ trống** hoặc **mở một lộ** cho các quân còn lại.

Một đòn thí quân đúng là một đòn đã **tính hết**: sau khi đối phương ăn quân thí, em phải có chiếu bí hoặc lấy lại nhiều hơn. Bài này giới thiệu ba kiểu thí quân kinh điển – thí Xe, thí Pháo và thí Mã – cùng cách nhận ra thời điểm để ra tay.`,
    sections: [
      {
        heading: 'Thí Xe ăn Sĩ, kéo Tướng ra góc',
        body: `Sĩ góc (d9, f9) là những quân phòng thủ sát sườn Tướng. Khi Xe ăn Sĩ góc **có chiếu**, nếu Tướng không còn đường chạy khác thì nó **buộc phải ăn Xe** – và bị kéo ra góc cung, nơi các quân còn lại của em đang chờ.

Ở ví dụ dưới, Mã d6 khống chế điểm e8, Pháo f1 nằm sẵn trên lộ 4. Đỏ thí Xe ở f9: Tướng ăn Xe và đứng ngay trên lộ của Pháo.`,
        diagram: {
          fen: '2bakab1r/9/9/p1pN2p2/9/9/2P1PR3/9/4AC3/2BAK1B2 w - - 0 1',
          moves: 'X4.6 Tg5-6 M6.4',
          notes: [
            'Xe ăn Sĩ f9 chiếu Tướng – một nước thí Xe! Tướng không lên e8 được vì Mã d6 khống chế điểm này (chân d7 trống), nên buộc phải ăn Xe.',
            'Tướng ăn Xe và bị kéo ra góc f9 – đúng trên lộ của Pháo f1.',
            'Mã nhảy vào f7, đứng ngay trước mặt Tướng. Pháo f1 dùng Mã làm ngòi chiếu Tướng; Mã khống chế e9, Pháo khống chế f8. Chiếu bí kiểu Mã hậu pháo!',
          ],
          arrows: ['f3f9', 'd6f7:yellow', 'f1f9:red'],
          highlights: ['f9:red'],
          caption: 'Đỏ đi: thí Xe rồi chiếu bí sau 2 nước.',
        },
      },
      {
        heading: 'Thí Pháo phá Sĩ',
        body: `Pháo cũng là một quân thí rất hay, nhất là khi nó **ăn Sĩ giữa (e8)** – Sĩ che chắn cho cả hai điểm góc. Sau khi Sĩ e8 mất, điểm f9 (hoặc d9) không còn ai bảo vệ.

Thế dưới đây: Xe f8, Pháo g8 và Mã g7 vây sát cung. Sĩ e8 đang canh điểm f9 – nơi Xe muốn xuống chiếu. Đỏ dùng Xe f8 làm ngòi cho Pháo ăn Sĩ e8.`,
        tip: 'Hãy đếm xem điểm em muốn chiếu bí đang được **bao nhiêu quân** đối phương bảo vệ. Nếu chỉ một quân, hãy tìm cách thí quân để tiêu diệt hoặc kéo quân đó đi.',
        diagram: {
          fen: 'r1bak1b2/4aRC2/6N2/p1p5p/9/9/P1P3P2/9/9/2BAKAB2 w - - 0 1',
          moves: 'P3-5 S4.5 X4.1',
          notes: [
            'Pháo dùng Xe f8 làm ngòi, ăn Sĩ e8! Pháo đứng sát Tướng nhưng có Mã g7 bảo vệ (chân f7 trống). Đỏ dọa Xe tiến f9 chiếu bí.',
            'Sĩ d9 ăn Pháo. Mọi nước khác cũng không cứu được Đen: Xe tiến f9 vẫn chiếu bí.',
            'Xe tiến f9 chiếu, được Mã g7 bảo vệ (chân g8 đã trống vì Pháo rời đi). Sĩ đã bị kéo khỏi d9, nên Tướng sang d9 vẫn nằm trên đường Xe; e8 là Sĩ nhà. Chiếu bí!',
          ],
          arrows: ['g8e8', 'f8f9:red'],
          highlights: ['e8:red', 'f9:red'],
          caption: 'Đỏ đi: Pháo thí ở tim cung.',
        },
      },
      {
        heading: 'Thí Mã phá Sĩ, Song xe kết thúc',
        body: `Khi hai Xe đã áp sát cung, chỉ cần phá được một Sĩ là cung đối phương sụp đổ. Con Mã – quân “rẻ” nhất trong ba quân mạnh – thường được giao nhiệm vụ cảm tử ấy.

Ở thế dưới, hai Xe Đỏ chiếm hàng 8, Mã đứng ở g9. Mã thí vào ăn Sĩ e8; khi Sĩ còn lại ăn Mã, Đỏ thí tiếp cả Xe – và Xe thứ hai kết thúc ván cờ ở hàng đáy.`,
        diagram: {
          fen: 'r1bak1N2/4a1RR1/9/p1p5p/9/9/P1P1P1P2/9/9/2BAKAB2 w - - 0 1',
          moves: 'M3/5 S4.5 X3-5 Tg5-4 X2.1',
          notes: [
            'Mã g9 thí vào ăn Sĩ e8 (chân f9 trống)! Đỏ dọa Xe h8 xuống h9 chiếu bí.',
            'Sĩ d9 ăn Mã – nước tự nhiên nhất. (Nếu Đen lên Tượng e7 thì Xe xuống h9 chiếu, Tượng phải lui về g9 che và Xe ăn Tượng chiếu bí.)',
            'Thí tiếp Xe! Xe g8 ăn Sĩ e8 chiếu Tướng. Xe được Xe h8 bảo vệ theo hàng 8 nên Tướng không ăn được, phải chạy.',
            'Tướng chạy sang d9 (chạy sang f9 cũng bị chiếu bí ngay bằng Xe xuống h9).',
            'Xe h8 xuống đáy h9 chiếu dọc hàng 9 (g9, f9, e9 đều trống). Tướng không lên d8 (Xe e8 khống chế hàng 8), không về e9. Chiếu bí!',
          ],
          arrows: ['g9e8', 'g8e8:yellow', 'h8h9:red'],
          highlights: ['e8:red'],
          caption: 'Đỏ đi và chiếu bí sau 3 nước.',
        },
      },
      {
        heading: 'Khi nào nên thí quân?',
        body: `Thí quân không phải là đánh liều. Trước khi bỏ quân, hãy kiểm tra:

- **Lực lượng tấn công** đã áp sát chưa? Thường cần ít nhất **hai, ba quân** cùng nhắm vào cung đối phương.
- **Nước thí có ép buộc không?** Tốt nhất là thí **kèm chiếu** hoặc kèm một đe dọa chiếu bí, để đối phương không có thời gian phản công.
- **Sau khi đối phương ăn quân thí**, em có chiếu bí hoặc lấy lại quân không? Hãy tính hết các cách đáp của đối phương, kể cả những cách không ăn quân thí.
- **Quân phòng thủ nào là then chốt?** Sĩ giữa (e8), Sĩ góc, Tượng che lộ – thí quân để tiêu diệt đúng quân đó.

Ngược lại, khi phòng thủ: đừng ăn quân thí một cách phản xạ. Hãy hỏi “Vì sao đối thủ bỏ quân này?” trước khi ăn.`,
        warning: 'Một đòn thí “gần đúng” là một đòn thí sai. Nếu sau khi thí em chỉ còn “thế tấn công mạnh” mà không có chiếu bí hay lấy lại quân rõ ràng, hãy tính thêm – hoặc chọn cách chơi chắc chắn hơn.',
      },
    ],
    keyTakeaways: [
      'Thí quân để phá Sĩ, phá Tượng, kéo Tướng ra chỗ trống hoặc mở lộ cho quân khác.',
      'Nước thí tốt nhất là nước thí kèm chiếu hoặc kèm đe dọa chiếu bí.',
      'Sĩ góc và Sĩ giữa là mục tiêu thí quân phổ biến nhất.',
      'Luôn tính cả trường hợp đối phương không ăn quân thí.',
      'Khi phòng thủ, đừng ăn quân thí theo phản xạ.',
    ],
  },

  // ───────────────────────── 5. Đánh lạc hướng và dụ quân ─────────────────────────
  {
    id: 'xq-ct-lac-huong-du-quan',
    category: 'chien-thuat',
    title: 'Đánh lạc hướng và dụ quân',
    subtitle: 'Kéo quân phòng thủ rời vị trí, lùa Tướng vào lưới',
    level: 3,
    icon: '🎯',
    minutes: 15,
    intro: `Nhiều thế cờ chỉ có **một quân phòng thủ** đứng giữa em và chiến thắng. Hai đòn chiến thuật giúp em vượt qua nó:

- **Đánh lạc hướng**: buộc quân phòng thủ **rời khỏi** vị trí quan trọng, thường bằng một nước thí quân mà nó phải ăn.
- **Dụ quân**: kéo quân đối phương (thường là **Tướng**) **đến** một điểm chết, nơi em đã giăng sẵn lưới.

Ngoài ra, khi một quân phải gánh **hai nhiệm vụ** cùng lúc, nó bị **quá tải** – chỉ cần đánh vào một nhiệm vụ, nhiệm vụ kia sẽ bỏ ngỏ.`,
    sections: [
      {
        heading: 'Đánh lạc hướng: Tốt thí kéo Sĩ rời đáy',
        body: `Ở thế dưới, Xe a1 muốn xuống a9 chiếu Tướng theo hàng 9, nhưng Sĩ d9 chắn đường. Đỏ đẩy Tốt e7 lên e8 chiếu: Tốt được Mã g7 bảo vệ, Tướng không ăn được, chỉ còn cách dùng Sĩ d9 ăn Tốt – và hàng đáy bỏ ngỏ.

Đòn này còn có một điểm tinh tế của luật **lộ mặt tướng**: sau khi Tốt e7 mất, Sĩ e8 trở thành quân duy nhất đứng giữa hai Tướng, nên nó không thể lui về d9 để che chiếu được nữa.`,
        diagram: {
          fen: '3ak4/9/4P1N1b/2p5p/1n5c1/9/2P3Pr1/9/R8/2BAKAB2 w - - 0 1',
          moves: 'B5.1 S4.5 X9.8',
          notes: [
            'Tốt lên e8 chiếu Tướng! Tốt được Mã g7 bảo vệ (chân f7 trống) nên Tướng không ăn được; Tướng cũng không sang f9 được vì Mã g7 khống chế. Cách duy nhất: Sĩ d9 ăn Tốt.',
            'Sĩ bị kéo khỏi d9 – hàng đáy bên trái bỏ ngỏ.',
            'Xe a1 phóng thẳng xuống a9 chiếu theo hàng 9. Sĩ e8 không lui về d9 che được vì nó là quân duy nhất đứng giữa hai Tướng – rời e8 là lộ mặt tướng. Tướng không sang f9 (Mã g7). Chiếu bí!',
          ],
          arrows: ['e7e8', 'a1a9:red'],
          highlights: ['d9:red'],
          caption: 'Đỏ đi và chiếu bí sau 2 nước.',
        },
      },
      {
        heading: 'Dụ Tướng vào lưới',
        body: `Dụ Tướng là thí quân để **kéo Tướng** đến một điểm mà ở đó em có đòn chiếu bí. Thường điểm ấy nằm trong tầm của một con Mã hoặc trên lộ của Xe, Pháo.

Ở ví dụ dưới, Mã c7 đang bị chính Xe c8 cản chân. Nếu Tướng Đen đứng ở d9, chỉ cần Xe c8 rời đi là Mã chiếu ngay. Vậy thì… hãy đưa Tướng đến d9!`,
        tip: 'Khi có một quân đang “chờ” ở một điểm (Mã bị cản chân, Pháo thiếu ngòi), hãy tự hỏi: “Nếu Tướng đối phương đứng ở điểm X thì sao?” – rồi tìm nước thí để kéo Tướng tới X.',
        diagram: {
          fen: '2bakab2/2R4r1/2N6/p1p1p3p/3R5/9/P1P1P1P2/9/9/2BAKAB2 w - - 0 1',
          moves: 'X6.4 Tg5-4 X7-5',
          notes: [
            'Xe d5 tiến thẳng lên ăn Sĩ d9 chiếu Tướng. Tướng không lên e8 được (Xe c8 khống chế hàng 8), buộc phải ăn Xe.',
            'Tướng bị dụ ra d9 – đúng điểm mà con Mã c7 đang nhắm tới, chỉ chờ chân Mã được mở.',
            'Xe c8 bình sang e8: chân Mã được mở, Mã c7 chiếu Tướng d9! Xe e8 khống chế cả d8 lẫn e9, Tướng hết đường chạy. Chiếu bí!',
          ],
          arrows: ['d5d9', 'c8e8:yellow', 'c7d9:red'],
          highlights: ['d9:red'],
          caption: 'Đỏ đi: dụ Tướng ra d9.',
        },
      },
      {
        heading: 'Quân phòng thủ quá tải',
        body: `Một quân phải bảo vệ **hai** thứ cùng lúc là một quân **quá tải**. Em chỉ cần ăn một thứ: nếu quân phòng thủ ăn lại, thứ kia mất người bảo vệ.

Thế dưới đây: cả Mã c5 lẫn Pháo g5 của Đen đều chỉ được **một con Tượng e7** bảo vệ. Tốt c4 ăn Mã – nếu Tượng ăn lại, Pháo g5 rơi vào miệng Mã e4.`,
        diagram: {
          fen: 'r2akab2/9/4b4/p3p3p/2n3c2/2P1N4/P3P3P/1C7/9/2BAKAB1R w - - 0 1',
          moves: 'B7.1 T5.3 M5.3',
          notes: [
            'Tốt c4 ăn Mã c5! Mã c5 và Pháo g5 cùng dựa vào một con Tượng e7 – con Tượng đang phải gánh hai việc.',
            'Tượng ăn lại Tốt – và bỏ mặc Pháo g5.',
            'Mã e4 ăn Pháo g5 (chân f4 trống). Đỏ đổi một Tốt lấy cả Mã lẫn Pháo. Nếu không ăn lại Tốt, Đen vẫn mất trắng một Mã.',
          ],
          arrows: ['c4c5', 'e4g5:red'],
          highlights: ['e7:red', 'c5:red', 'g5:red'],
          caption: 'Tượng e7 phải bảo vệ hai quân.',
        },
      },
      {
        heading: 'Cách tìm đòn đánh lạc hướng và dụ quân',
        body: `Hãy luyện thói quen đặt ba câu hỏi:

- **Ai đang giữ cửa?** Tìm quân phòng thủ duy nhất ngăn em chiếu bí hay ăn quân (Sĩ chặn hàng đáy, Tượng che lộ, Xe canh hàng 8…).
- **Có thể kéo nó đi không?** Một nước thí kèm chiếu hoặc một nước ăn quân mà nó buộc phải ăn lại.
- **Tướng đối phương đứng ở đâu thì chết?** Nếu có một điểm như vậy, hãy tìm nước thí để kéo Tướng tới đó.

Khi phòng thủ, hãy kiểm tra xem mỗi quân của mình đang gánh bao nhiêu nhiệm vụ. Một quân gánh hai việc là một lỗ hổng chờ đối thủ khai thác.`,
        warning: 'Trước khi ăn một quân “cho không”, hãy xem quân của em đang bảo vệ điểm nào. Nếu nó rời đi, điểm đó có bỏ ngỏ không?',
      },
    ],
    keyTakeaways: [
      'Đánh lạc hướng: buộc quân phòng thủ rời khỏi vị trí then chốt.',
      'Dụ quân: kéo Tướng hoặc quân đối phương đến điểm chết đã giăng sẵn lưới.',
      'Nước thí kèm chiếu là công cụ mạnh nhất để đánh lạc hướng và dụ quân.',
      'Một quân gánh hai nhiệm vụ là quân quá tải – hãy tấn công một trong hai nhiệm vụ.',
    ],
  },

  // ───────────────────────── 6. Sát cục Song xe ─────────────────────────
  {
    id: 'xq-ct-song-xe',
    category: 'chien-thuat',
    title: 'Sát cục Song xe',
    subtitle: 'Song xa thác: hai Xe thay nhau chiếu như leo thang',
    level: 3,
    icon: '🪜',
    minutes: 15,
    intro: `Hai Xe là cặp tấn công mạnh nhất trên bàn cờ tướng. Khi cả hai Xe cùng áp sát cung đối phương, chúng có thể **thay phiên nhau chiếu**: một Xe chiếu, Xe kia **khóa** hàng (hoặc lộ) bên cạnh để Tướng không lùi được. Tướng bị lùa từng bước cho đến khi hết đường – thế sát cục này được gọi là **Song xa thác** (hai Xe so le, “đan” nhau mà tiến).

Cung chỉ có ba hàng (hàng 7, 8, 9 với Đen), nên Song xa thác thường kết thúc chỉ sau vài nước. Sĩ và Tượng có thể cản đường một lúc, nhưng như em sẽ thấy, chúng thường chỉ làm chậm chứ không ngăn nổi cặp Xe.`,
    sections: [
      {
        heading: 'Song xa thác: hai Xe thay nhau chiếu',
        body: `Công thức của Song xa thác rất đơn giản:

- **Xe thứ nhất** chiếu theo một hàng ngang, Tướng buộc phải bước sang hàng bên cạnh.
- **Xe thứ hai** chiếu theo hàng mới, trong khi Xe thứ nhất vẫn **khóa** hàng cũ – Tướng không thể lùi lại.
- Lặp lại cho đến khi Tướng ra tới **hàng cuối của cung** (hàng 7) và không còn chỗ đi.

Ví dụ dưới: Tướng Đen đã mất cả hai Sĩ, hai Xe Đỏ ở b1 và h2 có lộ thông thoáng.`,
        diagram: {
          fen: '4k4/9/9/p3p3p/2b3b2/r4n3/2P1P1P2/7R1/1R7/2BAKAB2 w - - 0 1',
          moves: 'X8.8 Tg5.1 X2.6 Tg5.1 X8/2',
          notes: [
            'Xe b1 xuống đáy b9 chiếu Tướng theo hàng 9.',
            'Tướng buộc phải lên e8.',
            'Xe thứ hai chiếu theo hàng 8, trong khi Xe b9 khóa hàng 9 – Tướng không thể lùi về.',
            'Tướng lên e7, hàng cuối cùng của cung.',
            'Xe b9 lùi về b7 chiếu theo hàng 7; Xe h8 khóa hàng 8, còn Tướng không được bước ra khỏi cung. Chiếu bí – Song xa thác!',
          ],
          arrows: ['b1b9', 'h2h8', 'b9b7:red'],
          highlights: ['e9:red', 'e8:red', 'e7:red'],
          caption: 'Hai Xe thay nhau chiếu: hàng 9 → hàng 8 → hàng 7.',
        },
      },
      {
        heading: 'Khi đối phương còn Sĩ: ép Sĩ tự chặn đường',
        body: `Một con Sĩ có thể che chiếu một lần, nhưng mỗi lần che, nó lại **mở ra** một điểm khác cho Tướng – và đó lại là đường cho Song xa thác.

Ở thế dưới, Sĩ e8 đang chắn trước Tướng. Đỏ chiếu theo hàng 9 từ bên phải: Sĩ buộc phải lui về f9 che chiếu, để trống e8. Từ đó hai Xe lại thay nhau chiếu như bài trước.`,
        diagram: {
          fen: '4k4/4a4/c8/p3p3p/2b3n2/r8/2P1P1P2/7R1/1R7/2BAKAB2 w - - 0 1',
          moves: 'X2.7 S5/6 X8.8 Tg5.1 X2/1 Tg5.1 X8/2',
          notes: [
            'Xe h2 xuống đáy h9 chiếu (g9, f9 trống). Tướng không lên e8 được vì Sĩ nhà đứng đó.',
            'Nước duy nhất: Sĩ lui về f9 che chiếu – nhưng điểm e8 lại trống.',
            'Xe b1 xuống b9 chiếu từ phía bên kia (c9, d9 trống).',
            'Tướng phải lên e8.',
            'Xe h9 lùi về h8 chiếu theo hàng 8; Xe b9 giữ chặt hàng 9.',
            'Tướng lên e7.',
            'Xe b9 lùi về b7 chiếu – chiếu bí. Một con Sĩ không cản nổi Song xa thác.',
          ],
          arrows: ['h2h9', 'b1b9'],
          highlights: ['e8:yellow'],
          caption: 'Đỏ đi và chiếu bí sau 4 nước.',
        },
      },
      {
        heading: 'Tướng nhà góp sức',
        body: `Đừng quên quân thứ ba luôn có mặt trên bàn cờ: **Tướng của em**. Theo luật lộ mặt tướng, Tướng Đỏ làm chủ cả lộ nó đứng – Tướng Đen không được bước vào lộ ấy nếu giữa hai Tướng không có quân nào.

Ở thế dưới, Tướng Đỏ đứng ở d0, lộ 6 thông suốt. Khi Sĩ Đen lui về d9 che chiếu, Xe ăn luôn Sĩ đó: Tướng Đen không thể ăn lại vì sẽ đối mặt Tướng Đỏ.`,
        diagram: {
          fen: '4ka3/4a4/c8/p3p3p/2b3n2/r8/2P3P2/7R1/1R2A4/2BK1AB2 w - - 0 1',
          moves: 'X8.8 S5/4 X8-6 Tg5.1 X2.6 Tg5.1 X6/2',
          notes: [
            'Xe b1 xuống b9 chiếu (c9, d9 trống).',
            'Nước duy nhất: Sĩ e8 lui về d9 che chiếu.',
            'Xe ăn Sĩ d9, chiếu tiếp. Tướng Đen không dám ăn Xe: Tướng Đỏ ở d0 cùng lộ, ăn Xe là lộ mặt tướng!',
            'Tướng phải lên e8 (f9 là Sĩ nhà).',
            'Xe h2 chiếu theo hàng 8; Xe d9 khóa hàng 9.',
            'Tướng lên e7.',
            'Xe d9 lùi về d7 chiếu – chiếu bí.',
          ],
          arrows: ['b1b9', 'd0d9:blue'],
          highlights: ['d9:red'],
          caption: 'Tướng Đỏ ở d0 bảo vệ Xe trên lộ 6.',
        },
      },
      {
        heading: 'Song xe có Mã yểm trợ: thí Xe phá Sĩ',
        body: `Khi đối phương còn đủ Sĩ Tượng, hai Xe thường cần một quân thứ ba hỗ trợ – và sẵn sàng **thí một Xe** để phá cung.

Ở thế dưới, Xe g8 khóa hàng 8, Mã h7 canh các điểm quanh góc phải của cung. Xe f5 lao lên ăn Sĩ f9: Tướng buộc phải ăn Xe – và bị kéo ra góc, nơi Xe còn lại cùng con Mã kết thúc ván cờ.`,
        tip: 'Trong thế Song xe, hãy để một Xe **khóa hàng 8** (hoặc hàng ngay trước Tướng). Khi Tướng không thể bước lên, mọi cú chiếu theo hàng đáy đều trở nên chết người.',
        diagram: {
          fen: 'r1bakab2/6R2/7N1/p1p1p3p/5R3/9/P1P1P1P2/9/9/2BAKAB2 w - - 0 1',
          moves: 'X4.4 Tg5-6 X3.1',
          notes: [
            'Xe f5 tiến thẳng lên ăn Sĩ f9 chiếu. Tướng không lên e8 được vì Xe g8 khống chế hàng 8 – buộc phải ăn Xe.',
            'Tướng ăn Xe, bị kéo ra góc f9.',
            'Xe g8 ăn Tượng g9 chiếu. Tướng không ăn được Xe (Mã h7 bảo vệ, chân h8 trống), không về e9 (vẫn trên hàng của Xe), không xuống f8 (Mã h7 khống chế, chân g7 trống). Chiếu bí!',
          ],
          arrows: ['f5f9', 'g8g9:red'],
          highlights: ['f9:red'],
          caption: 'Đỏ đi và chiếu bí sau 2 nước.',
        },
      },
      {
        heading: 'Phòng thủ trước Song xe',
        body: `Khi đối phương có hai Xe áp sát, hãy nhớ:

- **Giữ Sĩ Tượng liên hoàn**: Sĩ, Tượng đứng sao cho che được các hàng đáy và bảo vệ lẫn nhau.
- **Đừng để Xe đối phương chiếm hàng 8 (hàng ngay trước Tướng)**: đó là “bậc thang” đầu tiên của Song xa thác.
- **Đổi bớt một Xe**: hai Xe nguy hiểm gấp nhiều lần một Xe. Nếu có cơ hội đổi Xe, hãy cân nhắc ngay.
- **Phản công bằng chiếu**: nếu Xe của em có thể chiếu liên tục Tướng đối phương, đôi khi đó là cách duy nhất để giành lại thế chủ động (nhưng nhớ luật cấm chiếu dai).`,
        warning: 'Luật cờ tướng cấm **chiếu dai**: nếu em chiếu liên tục làm thế cờ lặp lại, em sẽ bị xử thua. Đừng trông chờ vào chiếu hết lượt này đến lượt khác để cầu hòa.',
      },
    ],
    keyTakeaways: [
      'Song xa thác: một Xe chiếu, Xe kia khóa hàng bên cạnh; lặp lại cho đến khi Tướng hết đường.',
      'Cung chỉ có ba hàng, nên Song xa thác thường chiếu bí rất nhanh.',
      'Sĩ che chiếu một lần lại mở ra điểm mới cho Tướng – Song xe vẫn tiếp tục leo thang.',
      'Tướng nhà làm chủ lộ của nó, có thể bảo vệ Xe ngay trong cung đối phương.',
      'Khi phòng thủ, đừng để Xe đối phương chiếm hàng ngay trước Tướng.',
    ],
  },

  // ───────────────────────── 7. Sát cục của Pháo ─────────────────────────
  {
    id: 'xq-ct-sat-cuc-phao',
    category: 'chien-thuat',
    title: 'Sát cục của Pháo',
    subtitle: 'Pháo trùng, Muộn cung, Thiên địa pháo, Trầm để pháo',
    level: 4,
    icon: '💣',
    minutes: 20,
    intro: `Pháo là quân chiếu bí “khó đỡ” nhất vì nó tấn công **qua ngòi**: muốn chặn chiếu, đối phương phải chen thêm quân – nhưng quân chen vào nhiều khi lại trở thành ngòi cho một Pháo khác!

Bài này giới thiệu bốn thế sát cục kinh điển của Pháo:

- **Pháo trùng**: hai Pháo đứng chồng trên cùng một lộ.
- **Muộn cung**: Tướng bị chính hai Sĩ của mình bịt kín cung, Pháo chiếu là hết đường.
- **Thiên địa pháo**: một Pháo ở lộ giữa (“thiên”), một Pháo ở hàng đáy (“địa”).
- **Trầm để pháo (Pháo đáy)**: Pháo xuống hàng đáy, khóa Sĩ Tượng để Xe, Mã kết thúc.`,
    sections: [
      {
        heading: 'Pháo trùng',
        body: `**Pháo trùng** là hai Pháo đứng trên cùng một lộ với Tướng đối phương: Pháo sau dùng Pháo trước làm ngòi để chiếu. Nếu đối phương chen một quân vào giữa Pháo trước và Tướng, quân đó lại trở thành ngòi cho Pháo trước – cú chiếu không thể chặn.

Pháo trùng ở lộ giữa đặc biệt nguy hiểm khi hai Sĩ còn ở d9, f9: Tướng bị Sĩ chặn hai bên, bước lên e8 thì vẫn nằm trên đường Pháo.

Ở thế dưới, Đỏ dùng Pháo b6 ăn Tốt đầu, chiếm lộ giữa trước; Xe h8 khóa hàng 8. Nước sau, Pháo thứ hai chồng lên tạo thành Pháo trùng.`,
        diagram: {
          fen: 'r1bakab2/7R1/9/pCp1p3p/5C3/9/P1P3P2/9/9/2BAKAB2 w - - 0 1',
          moves: 'P8-5 X1.1 P4-5',
          notes: [
            'Pháo b6 dùng Tốt c6 làm ngòi ăn Tốt đầu e6, chiếm lộ giữa. Từ giờ không quân Đen nào được đặt lên e7 hay e8 – quân đó sẽ thành ngòi cho Pháo e6 chiếu Tướng. Tướng cũng không lên e8 được vì Xe h8 khống chế hàng 8.',
            'Đen đưa Xe lên a8 định đổi Xe h8 – nhưng đã không còn thời gian.',
            'Pháo f5 bình vào e5, đứng sau Pháo e6: Pháo sau chiếu Tướng qua ngòi là Pháo trước. Đen không thể chen quân vào e7, e8 (quân chen vào sẽ thành ngòi cho Pháo trước), hai Sĩ chặn hai bên Tướng. Chiếu bí – Pháo trùng!',
          ],
          arrows: ['b6e6', 'f5e5', 'e5e9:red'],
          highlights: ['e9:red'],
          caption: 'Đỏ đi và chiếu bí sau 2 nước.',
        },
      },
      {
        heading: 'Muộn cung: cung bị bịt kín',
        body: `**Muộn cung** (cung bị bịt kín) là thế Tướng bị **chính hai Sĩ của mình** chặn hết đường đi, và Pháo chỉ cần chiếu là xong.

Hình ảnh điển hình: Tướng ở e9, hai Sĩ đứng ở e8 và f9 (hoặc e8 và d9). Pháo xuống hàng đáy, dùng Sĩ góc làm ngòi chiếu Tướng. Sĩ góc không đi đâu được vì điểm duy nhất của nó (e8) đã có Sĩ kia; Tướng không lên e8, còn chạy dọc hàng đáy thì vẫn trên đường Pháo.

Ở thế dưới, Đỏ dùng một nước chiếu buộc Sĩ Đen tự lên e8, rồi Pháo xuống đáy kết thúc.`,
        diagram: {
          fen: '3aka3/9/9/p3p4/3c5/r7n/2P3P2/1C5C1/4R4/2BAKAB2 w - - 0 1',
          moves: 'X5.5 S4.5 P2.7',
          notes: [
            'Xe ăn Tốt e6 chiếu Tướng. Tướng không chạy được (d9, f9 là Sĩ nhà, e8 nằm trên đường Xe), Đen buộc phải lên Sĩ che chiếu.',
            'Sĩ d9 lên e8. (Nếu Sĩ f9 lên thì Pháo b2 xuống b9 chiếu bí theo đúng cách đó ở cánh bên kia.)',
            'Pháo xuống đáy h9 chiếu, dùng Sĩ f9 làm ngòi. Sĩ f9 không đi đâu được (điểm duy nhất của nó là e8 đã có Sĩ), Tướng không lên e8, còn d9 vẫn nằm trên đường Pháo. Tướng bị chính hai Sĩ của mình bóp nghẹt – Muộn cung!',
          ],
          arrows: ['e1e6', 'h2h9:red'],
          highlights: ['e8:yellow', 'f9:yellow', 'e9:red'],
          caption: 'Đỏ đi và chiếu bí sau 2 nước.',
        },
      },
      {
        heading: 'Thiên địa pháo',
        body: `**Thiên địa pháo** là thế hai Pháo phối hợp thành hình chữ thập: một Pháo ở **lộ giữa** (thiên pháo) chiếu dọc, một Pháo ở **hàng đáy** (địa pháo) khống chế hàng ngang.

Bí quyết nằm ở Pháo đáy: khi giữa nó và Tướng có **hai quân** (thường là Tượng và Sĩ), cả hai quân đó đều bị khóa – không quân nào được rời chỗ để che chiếu cho Pháo giữa.`,
        diagram: {
          fen: '1Cbak4/9/9/p3p4/8n/2c4C1/2P3P1r/9/R3A4/2BA1KB2 w - - 0 1',
          moves: 'P2-5',
          notes: [
            'Pháo h4 bình vào lộ giữa chiếu Tướng qua ngòi Tốt e6 – thiên pháo. Pháo b9 là địa pháo: giữa nó và Tướng có Tượng c9 và Sĩ d9, nên Tượng không lên e7 che được, Sĩ không lên e8 che được – quân nào rời chỗ thì Pháo đáy chiếu ngay. Tướng không lên e8 (vẫn trên đường Pháo giữa), không sang f9 (Tướng Đỏ ở f0 làm chủ lộ 4). Chiếu bí!',
          ],
          arrows: ['h4e4', 'e4e9:red', 'b9e9:orange'],
          highlights: ['c9:yellow', 'd9:yellow', 'e9:red'],
          caption: 'Đỏ đi và chiếu bí ngay.',
        },
      },
      {
        heading: 'Trầm để pháo (Pháo đáy)',
        body: `**Trầm để pháo** là đưa Pháo xuống hàng đáy của đối phương. Ở đó, Pháo thường không tự chiếu bí mà **khóa** Sĩ, Tượng ở hàng đáy và **bảo vệ** cho Xe, Mã xông vào.

Ở thế dưới, Pháo b2 trầm xuống b9: Tượng c9 và Sĩ d9 lập tức bị khóa (một trong hai rời đi là Pháo chiếu). Điểm d9 giờ được Pháo bảo vệ – Xe d2 chỉ cần tiến thẳng lên.`,
        tip: 'Pháo đáy mạnh nhất khi phối hợp với **Mã** canh các điểm e8, f9 (hoặc e8, d9). Hãy tìm thế Mã đứng ở g7 hoặc c7 – vị trí “Điếu ngư mã” trong bài sau.',
        diagram: {
          fen: '2bak1b2/9/6N1c/p3p4/8n/9/2P3P1r/1C1R5/9/2BAKAB2 w - - 0 1',
          moves: 'P8.7 X9.1 X6.7',
          notes: [
            'Pháo trầm xuống đáy b9 – một nước yên lặng. Giữa Pháo và Tướng giờ có Tượng c9 và Sĩ d9, cả hai bị khóa chặt. Đỏ dọa Xe d2 tiến lên ăn Sĩ d9.',
            'Đen phản công, đưa Xe xuống i2 đe dọa Xe d2. Nhưng mọi nước đi của Đen đều đã muộn.',
            'Xe ăn Sĩ d9 chiếu. Xe được Pháo b9 bảo vệ (ngòi là Tượng c9) nên Tướng không ăn được; Mã g7 khống chế cả e8 lẫn f9. Chiếu bí!',
          ],
          arrows: ['b2b9', 'd2d9:red'],
          highlights: ['d9:red'],
          caption: 'Đỏ đi và chiếu bí sau 2 nước.',
        },
      },
      {
        heading: 'Bí quyết dùng Pháo tấn công',
        body: `Tóm tắt những điều cần nhớ khi dùng Pháo tấn công Tướng:

- **Đếm ngòi**: giữa Pháo và Tướng có 0 quân – Pháo chưa làm gì được; 1 quân – Pháo chiếu; 2 quân – cả hai bị khóa.
- **Tìm ngòi trên hàng đáy**: Sĩ, Tượng của đối phương ở hàng 9 là những ngòi lý tưởng cho Pháo đáy.
- **Sĩ tự chặn**: khi hai Sĩ đứng ở e8 và một góc cung, hãy nghĩ ngay đến Muộn cung.
- **Hai Pháo cùng lộ** (Pháo trùng) chiếu không thể chặn bằng cách chen quân.
- Pháo cần quân khác **khống chế đường chạy** của Tướng: Xe khóa hàng, Mã canh điểm, Tướng nhà làm chủ lộ.`,
        warning: 'Khi phòng thủ, hãy cẩn thận mỗi lần lên Sĩ ra e8 trong lúc Sĩ kia còn ở góc: cung có thể bị bịt kín, chỉ cần một Pháo đối phương xuống đáy là Muộn cung.',
      },
    ],
    keyTakeaways: [
      'Pháo trùng: hai Pháo cùng lộ, chen quân vào chặn chỉ tạo thêm ngòi cho Pháo trước.',
      'Muộn cung: Tướng bị hai Sĩ nhà bịt kín, Pháo đáy chiếu là hết đường.',
      'Thiên địa pháo: Pháo giữa chiếu, Pháo đáy khóa Sĩ Tượng ở hàng đáy.',
      'Trầm để pháo: Pháo xuống đáy khóa quân phòng thủ và bảo vệ Xe, Mã xông vào.',
      'Luôn đếm số ngòi giữa Pháo và Tướng – 1 là chiếu, 2 là khóa.',
    ],
  },

  // ───────────────────────── 8. Sát cục của Mã ─────────────────────────
  {
    id: 'xq-ct-sat-cuc-ma',
    category: 'chien-thuat',
    title: 'Sát cục của Mã',
    subtitle: 'Ngọa tào, Quải giác, Mã hậu pháo, Điếu ngư mã, Song mã ẩm tuyền',
    level: 4,
    icon: '🐴',
    minutes: 20,
    intro: `Chiếu của Mã **không thể chặn** bằng cách chen quân vào giữa như với Xe, Pháo: đối phương chỉ có thể ăn Mã, chạy Tướng, hoặc đặt quân đúng vào **chân Mã**. Vì vậy Mã là quân kết thúc ván cờ rất lợi hại, nhất là khi phối hợp với Xe, Pháo.

Người xưa đặt tên cho từng vị trí Mã chiếu bí quen thuộc quanh cung (lấy Tướng Đen ở e9 làm ví dụ):

- **Ngọa tào mã**: Mã ở c8 hoặc g8, chiếu Tướng qua chân d8, f8.
- **Quải giác mã**: Mã ở góc cung d7 hoặc f7.
- **Điếu ngư mã**: Mã ở c7 hoặc g7, khống chế các điểm quanh Tướng cho Xe chiếu.
- **Mã hậu pháo**: Mã đứng trước Tướng, Pháo đứng sau Mã trên cùng một lộ.
- **Song mã ẩm tuyền**: hai Mã cùng phối hợp chiếu bí.`,
    sections: [
      {
        heading: 'Ngọa tào mã',
        body: `**Ngọa tào mã** (Mã nằm máng) là Mã đứng ở **c8 hoặc g8** chiếu Tướng e9. Từ g8, Mã khống chế cả **e9** lẫn **e7**; nếu thêm một quân khóa điểm e8 (thường là Xe ở hàng 8) và hai Sĩ còn ở d9, f9, Tướng không còn đường chạy.

Ở thế dưới, Tướng Đen đang ở e8. Đỏ dùng Xe chiếu theo hàng 8 đẩy Tướng về e9, rồi Mã nhảy vào điểm ngọa tào.`,
        diagram: {
          fen: '2ba1a3/4k4/c3b4/p6N1/9/2n6/2P1P1P1r/1R7/9/2BAKAB2 w - - 0 1',
          moves: 'X8.6 Tg5/1 M2.3',
          notes: [
            'Xe tiến lên b8 chiếu theo hàng 8 (c8, d8 trống). Tướng không sang d8, f8 được (vẫn trên hàng 8), không xuống e7 được (Tượng nhà đứng đó) – phải lui về e9.',
            'Nước duy nhất.',
            'Mã nhảy vào g8 – điểm Ngọa tào – chiếu Tướng (chân f8 trống). Tướng không lên e8 (Xe b8 khống chế), d9 và f9 là Sĩ nhà. Chiếu bí! (Mã vào f7 thì không được: Pháo a7 sẽ ăn Mã qua ngòi Tượng e7.)',
          ],
          arrows: ['b2b8', 'h6g8', 'g8e9:red'],
          highlights: ['g8:green', 'e9:red'],
          caption: 'Đỏ đi và chiếu bí sau 2 nước.',
        },
      },
      {
        heading: 'Quải giác mã',
        body: `**Quải giác mã** (Mã treo góc) là Mã đứng ở **góc cung** – d7 hoặc f7 – chiếu Tướng e9 qua chân d8 hoặc f8. Hai Sĩ ở d9, f9 không với tới được hai điểm góc này; chỉ Sĩ ở e8 mới ăn được Mã quải giác.

Ở thế dưới, Mã g5 nhảy vào f7 chiếu, Tướng buộc phải lên e8 – và Mã f7 vẫn đứng đó canh giữ điểm e9 cho Xe kết thúc.`,
        diagram: {
          fen: '2baka3/9/4b3c/p8/6N2/2n6/2P1P1P1r/1R7/9/2BAKAB2 w - - 0 1',
          moves: 'M3.4 Tg5.1 X8.6',
          notes: [
            'Mã vào f7 – góc cung, điểm Quải giác – chiếu Tướng (chân f8 trống). Hai Sĩ ở d9, f9 không ăn được Mã; Tướng chỉ còn đường lên e8.',
            'Nước duy nhất.',
            'Xe tiến lên b8 chiếu theo hàng 8. Tướng không về e9 được (Mã f7 khống chế), không xuống e7 (Tượng nhà), d8 và f8 vẫn trên đường Xe. Chiếu bí!',
          ],
          arrows: ['g5f7', 'b2b8:red'],
          highlights: ['f7:green', 'e8:red'],
          caption: 'Đỏ đi và chiếu bí sau 2 nước.',
        },
      },
      {
        heading: 'Mã hậu pháo',
        body: `**Mã hậu pháo** (Pháo sau Mã) là thế sát cục kinh điển nhất của cặp Mã – Pháo: Mã đứng trên cùng lộ với Tướng, cách Tướng một điểm; Pháo đứng phía sau Mã trên lộ đó, dùng Mã làm ngòi chiếu. Mã khống chế hai điểm hai bên Tướng, Pháo khống chế điểm ngay trước Tướng.

Ở thế dưới, Xe Đỏ ăn Tốt chiếu, lùa Tướng sang f9 – ngay trên lộ của Pháo f2. Mã nhảy vào f7 là xong.`,
        diagram: {
          fen: 'r3k4/9/b7b/p1p1p4/1n4N2/9/2P1R3P/5C3/4A4/2BK1AB2 w - - 0 1',
          moves: 'X5.3 Tg5-6 M3.4',
          notes: [
            'Xe ăn Tốt e6 chiếu Tướng. Tướng không sang d9 được (Tướng Đỏ ở d0 làm chủ lộ 6), e8 nằm trên đường Xe – chỉ còn đường sang f9.',
            'Nước duy nhất.',
            'Mã nhảy vào f7, đứng ngay trước mặt Tướng; Pháo f2 phía sau dùng Mã làm ngòi chiếu Tướng. Mã khống chế e9, Pháo khống chế f8. Chiếu bí – Mã hậu pháo!',
          ],
          arrows: ['e3e6', 'g5f7', 'f2f9:red'],
          highlights: ['f9:red'],
          caption: 'Đỏ đi và chiếu bí sau 2 nước.',
        },
      },
      {
        heading: 'Điếu ngư mã',
        body: `**Điếu ngư mã** (Mã câu cá) là Mã đứng ở **c7 hoặc g7**. Từ g7, Mã khống chế cùng lúc **e8** và **f9** – hai đường thoát quan trọng của Tướng. Khi đó chỉ cần Xe chiếu theo hàng đáy là Tướng không còn chỗ chạy.

Ở thế dưới, Mã h5 nhảy vào g7 chiếu Tướng e8, rồi Xe xuống đáy kết thúc. Đen có chen được một con Tượng che chiếu, nhưng Xe ăn luôn Tượng và chiếu tiếp.`,
        diagram: {
          fen: '9/4k4/b8/p1p6/6bN1/2n6/2P1P3r/1R7/9/2BAKAB2 w - - 0 1',
          moves: 'M2.3 Tg5/1 X8.7 T1/3 X8-7',
          notes: [
            'Mã nhảy vào g7 chiếu Tướng e8 (chân f7 trống). Từ g7, con Mã này khống chế cả e8 lẫn f9 – thế Điếu ngư mã.',
            'Tướng lui về e9. (Chạy sang d8 hay f8 cũng bị chiếu bí sau hai nước.)',
            'Xe xuống đáy b9 chiếu theo hàng 9. Tướng không lên e8, không sang f9 (Mã g7 khống chế), d9 vẫn trên đường Xe.',
            'Đen chỉ còn cách lui Tượng a7 về c9 che chiếu.',
            'Xe ăn Tượng, chiếu tiếp. Chiếu bí!',
          ],
          arrows: ['h5g7', 'g7e8:red', 'g7f9:red', 'b2b9'],
          highlights: ['g7:green'],
          caption: 'Đỏ đi và chiếu bí sau 3 nước.',
        },
      },
      {
        heading: 'Song mã ẩm tuyền',
        body: `Khi có **hai Mã**, chúng có thể tự chiếu bí mà không cần Xe, Pháo giúp: một Mã đứng **khóa đường chạy**, Mã kia nhảy vào **chiếu**. Thế hai Mã phối hợp quanh cung như vậy được người xưa gọi bằng cái tên rất đẹp: **Song mã ẩm tuyền** (hai ngựa uống nước suối).

Ở thế dưới, Tướng Đen đã chạy ra góc f9. Mã c5 nhảy vào d7: từ góc cung bên kia, nó khóa cả e9 lẫn f8. Tướng không còn nhúc nhích được – Mã h5 chỉ việc nhảy vào g7.`,
        tip: 'Hai Mã phối hợp tốt nhất khi chúng **bảo vệ lẫn nhau** hoặc đứng ở hai phía của Tướng. Hãy tìm điểm mà một Mã khóa được hai đường chạy cùng lúc, như d7 trong ví dụ.',
        diagram: {
          fen: '3a1k3/9/9/p5p2/2N4N1/9/2P3P2/9/9/2BAKAB2 w - - 0 1',
          moves: 'M7.6 B1.1 M2.3',
          notes: [
            'Mã c5 nhảy vào d7 – một nước yên lặng nhưng chí mạng: Mã d7 khống chế e9 (chân d8) và f8 (chân e7). Tướng Đen không còn chỗ chạy.',
            'Đen không có cách nào ngăn: các quân khác ở quá xa.',
            'Mã h5 nhảy vào g7 chiếu Tướng (chân g8 trống). Một Mã khóa đường chạy, một Mã chiếu – chiếu bí!',
          ],
          arrows: ['c5d7', 'd7e9:yellow', 'd7f8:yellow', 'h5g7'],
          highlights: ['f9:red'],
          caption: 'Đỏ đi và chiếu bí sau 2 nước.',
        },
      },
    ],
    keyTakeaways: [
      'Chiếu của Mã không thể chặn bằng cách chen quân – chỉ có thể ăn Mã, chạy Tướng hoặc chặn chân Mã.',
      'Ngọa tào (c8, g8) và Quải giác (d7, f7) là hai điểm Mã chiếu Tướng ở e9 quen thuộc nhất.',
      'Điếu ngư mã (c7, g7) khống chế đường thoát để Xe chiếu bí theo hàng đáy.',
      'Mã hậu pháo: Mã trước Tướng, Pháo sau Mã trên cùng một lộ.',
      'Hai Mã có thể tự chiếu bí: một con khóa đường chạy, một con chiếu.',
    ],
  },

  // ───────────────────────── 9. Phối hợp Xe – Mã – Pháo ─────────────────────────
  {
    id: 'xq-ct-phoi-hop-xe-ma-phao',
    category: 'chien-thuat',
    title: 'Phối hợp Xe – Mã – Pháo',
    subtitle: 'Thiết môn xuyên, Đại đao uyển tâm và đòn đánh đáy',
    level: 5,
    icon: '⚔️',
    minutes: 20,
    intro: `Một quân đơn độc hiếm khi chiếu bí được Tướng còn đủ Sĩ Tượng. Sức mạnh thật sự đến từ **phối hợp**: mỗi quân làm một việc – quân này **khóa** quân phòng thủ, quân kia **khống chế** đường chạy, quân thứ ba **ra đòn kết thúc**.

Bài này giới thiệu ba mẫu phối hợp kinh điển:

- **Thiết môn xuyên** (chốt cửa sắt): Pháo giữa khóa cung, Tướng nhà chiếm lộ biên cung, Xe xuống góc cung chiếu bí.
- **Đại đao uyển tâm** (đao lớn khoét tim): thí Xe ngay tim cung (e8) để Sĩ đối phương tự bịt kín cung.
- **Xe – Pháo đánh đáy**: Pháo đáy và Xe phối hợp tấn công hàng cuối của đối phương.`,
    sections: [
      {
        heading: 'Thiết môn xuyên',
        body: `**Thiết môn xuyên** là thế sát cục ba quân rất đẹp:

- **Pháo đầu** (Pháo ở lộ giữa) cùng một ngòi khóa chặt Sĩ e8 – Sĩ này không được rời chỗ.
- **Tướng nhà** đứng ở lộ biên cung (lộ 4 hoặc lộ 6), làm chủ cả lộ ấy.
- **Xe** đi dọc lộ đó xuống góc cung chiếu Tướng. Tướng không ăn được Xe (sẽ lộ mặt tướng), Sĩ e8 không ăn được (bị Pháo khóa).

Ở thế dưới, Đỏ chỉ cần một nước Tướng yên lặng để dựng xong “chốt cửa”.`,
        diagram: {
          fen: '4ka2r/4a4/b7b/p3p1p2/9/9/2PR2P2/4C4/4A4/2B1KAB2 w - - 0 1',
          moves: 'Tg5-6 X9-8 X6.6',
          notes: [
            'Nước yên lặng: Tướng sang d0, làm chủ lộ 6. Pháo e2 cùng Tốt e6 đang khóa Sĩ e8 (Sĩ rời đi là Pháo chiếu). Đỏ dọa Xe tiến thẳng xuống d9.',
            'Đen không có cách đỡ: Xe i9 bị Tượng i7 và Sĩ f9 chắn đường, không kịp về che lộ 6.',
            'Xe xuống d9 chiếu. Tướng không ăn được Xe (sẽ đối mặt Tướng d0), Sĩ e8 không ăn được (bị Pháo khóa), e8 và f9 đều là Sĩ nhà. Chiếu bí – Thiết môn xuyên!',
          ],
          arrows: ['e0d0', 'd3d9:red', 'e2e8:orange'],
          highlights: ['e8:yellow', 'd9:red'],
          caption: 'Đỏ đi và chiếu bí sau 2 nước.',
        },
      },
      {
        heading: 'Đại đao uyển tâm',
        body: `**Đại đao uyển tâm** là đòn thí Xe ngay **tim cung** (điểm e8). Khi Tướng không thể ăn Xe, một trong hai Sĩ buộc phải ăn – và hai Sĩ sẽ đứng ở e8 cùng một góc cung, **tự bịt kín** cung như thế Muộn cung. Lúc ấy chỉ cần một Pháo xuống đáy là kết thúc.

Ở thế dưới, Mã g7 bảo vệ điểm e8, hai Pháo b2, h2 sẵn sàng xuống đáy ở cả hai cánh. Sĩ nào ăn Xe, Pháo bên ấy sẽ kết thúc.`,
        diagram: {
          fen: '3aka3/1R7/6N2/p3p4/2b3b2/9/2P3P1r/1C5C1/9/2BAKAB2 w - - 0 1',
          moves: 'X8-5 S4.5 P2.7',
          notes: [
            'Xe lao thẳng vào tim cung e8 chiếu Tướng! Tướng không ăn được Xe vì Mã g7 bảo vệ (chân f7 trống). Đen buộc phải dùng Sĩ ăn Xe.',
            'Sĩ d9 ăn Xe. Giờ hai Sĩ đứng ở e8 và f9 – cung tự bịt kín.',
            'Pháo xuống đáy h9 chiếu qua ngòi Sĩ f9: Muộn cung, chiếu bí! (Nếu Đen ăn Xe bằng Sĩ f9 thì Pháo b2 xuống b9 chiếu bí y hệt ở cánh trái.)',
          ],
          arrows: ['b8e8', 'h2h9:red', 'b2b9:orange'],
          highlights: ['e8:red'],
          caption: 'Đỏ đi và chiếu bí sau 2 nước.',
        },
      },
      {
        heading: 'Xe – Pháo phối hợp đánh đáy',
        body: `Hàng đáy là nơi Sĩ, Tượng đứng dày đặc – và chính chúng lại là **ngòi** cho Pháo. Khi Xe khóa hàng 8 (Tướng không bước lên được), mọi cú chiếu của Pháo theo hàng đáy đều trở nên chết người.

Ở thế dưới, hai Pháo Đỏ đã xuống đáy ở h9, i9. Đỏ đưa Xe lên f8 khóa hàng 8, rồi Pháo i9 nhảy qua Pháo h9 ăn Tượng, chiếu qua ngòi Sĩ f9.`,
        tip: 'Hai Pháo trên cùng một hàng cũng là Pháo trùng! Nếu Sĩ làm ngòi bỏ đi, Pháo phía sau lại chiếu ngay qua ngòi là Pháo phía trước.',
        diagram: {
          fen: 'r1bakabCC/9/9/p1p1p3p/9/5R3/P1P3P2/9/9/2BAKAB2 w - - 0 1',
          moves: 'X4.4 X1.1 P1-3',
          notes: [
            'Xe tiến lên f8 – một nước yên lặng: Xe khóa hàng 8 (Tướng không lên được e8) và nhìn thẳng xuống Sĩ f9. Đỏ dọa Pháo i9 nhảy qua Pháo h9 ăn Tượng g9.',
            'Đen đưa Xe lên a8 đuổi Xe f8, nhưng chậm một nhịp.',
            'Pháo i9 dùng Pháo h9 làm ngòi ăn Tượng g9, chiếu Tướng qua ngòi Sĩ f9. Sĩ f9 không lên e8 thoát ngòi được: khi đó Pháo h9 lại chiếu qua ngòi g9. Tướng không lên e8 (Xe khống chế), d9 là Sĩ nhà. Chiếu bí!',
          ],
          arrows: ['f4f8', 'i9g9:red'],
          highlights: ['g9:red', 'e9:red'],
          caption: 'Đỏ đi và chiếu bí sau 2 nước.',
        },
      },
      {
        heading: 'Nguyên tắc phối hợp ba quân',
        body: `Khi tấn công Tướng bằng Xe, Mã, Pháo, hãy phân vai rõ ràng:

- **Ai khóa?** Pháo (qua hai ngòi) hoặc Xe (ghim) làm tê liệt quân phòng thủ then chốt – thường là Sĩ e8.
- **Ai khống chế?** Mã canh các điểm quanh Tướng, Xe khóa một hàng, Tướng nhà làm chủ một lộ.
- **Ai kết thúc?** Quân còn lại ra đòn chiếu bí – nhiều khi sau một nước thí quân để phá vỡ thế phòng thủ.

Đừng quên **nước yên lặng**: trong bài này có những nước không chiếu (Tướng ra d0, Xe lên f8) nhưng lại là nước quyết định, vì đối phương không còn cách nào chống đỡ.`,
        warning: 'Phối hợp đòi hỏi các quân đến đúng chỗ cùng lúc. Một quân tấn công đơn độc lao vào cung đối phương thường chỉ bị bắt – hãy kiên nhẫn đưa đủ lực lượng rồi mới ra đòn.',
      },
    ],
    keyTakeaways: [
      'Thiết môn xuyên: Pháo giữa khóa Sĩ, Tướng nhà làm chủ lộ biên, Xe xuống góc cung chiếu bí.',
      'Đại đao uyển tâm: thí Xe ở tim cung để Sĩ tự bịt kín cung, rồi Pháo đáy kết thúc.',
      'Xe khóa hàng 8 khiến mọi cú chiếu ở hàng đáy trở nên chết người.',
      'Mỗi quân một vai: khóa – khống chế – kết thúc.',
      'Nước yên lặng đúng lúc có thể mạnh hơn mọi nước chiếu.',
    ],
  },

  // ───────────────────────── 10. Lộ mặt tướng làm vũ khí ─────────────────────────
  {
    id: 'xq-ct-bach-dien-tuong',
    category: 'chien-thuat',
    title: 'Lộ mặt tướng làm vũ khí (Bạch diện tướng)',
    subtitle: 'Tướng nhà cũng biết tấn công',
    level: 3,
    icon: '👑',
    minutes: 15,
    intro: `Luật cờ tướng cấm **hai Tướng đối mặt** trên cùng một lộ mà giữa chúng không có quân nào. Người mới học thường chỉ nhớ luật này để… tránh đi sai. Nhưng kỳ thủ giỏi biến nó thành **vũ khí**: Tướng của em giống như một quân Xe vô hình, **làm chủ cả lộ** nó đứng.

Thế sát cục dùng sức mạnh của Tướng nhà được gọi là **Bạch diện tướng** (Tướng lộ mặt). Từ luật này sinh ra ba đòn quen thuộc:

- **Ghim bằng Tướng**: quân duy nhất đứng giữa hai Tướng không được rời lộ.
- **Khóa đường chạy**: Tướng đối phương không được bước vào lộ của Tướng em.
- **Bảo vệ quân trong cung địch**: quân của em đứng trên lộ của Tướng nhà thì Tướng đối phương không ăn được.`,
    sections: [
      {
        heading: 'Tướng nhà “ghim” quân đối phương',
        body: `Nếu giữa hai Tướng chỉ còn **một quân**, quân đó bị ghim: nó rời lộ thì hai Tướng đối mặt – nước đi phạm luật. Đây là một kiểu ghim mà “quân ghim” chính là **Tướng**!

Ở thế dưới, Mã e5 của Đen là quân duy nhất trên lộ giữa. Đỏ chỉ cần tấn công nó.`,
        diagram: {
          fen: 'r1bakab2/9/7c1/p1p3p1p/4n4/9/P1P3P2/1C7/3R5/2BAKABN1 w - - 0 1',
          moves: 'X6.4 S4.5 X6-5',
          notes: [
            'Xe tiến lên d5 tấn công Mã e5. Mã là quân duy nhất giữa hai Tướng: nếu Mã rời lộ giữa, hai Tướng đối mặt – nước đi phạm luật. Mã đã bị chính Tướng Đỏ ghim!',
            'Đen lên Sĩ e8 chen vào lộ giữa để giải phóng con Mã – nhưng Đỏ đi trước.',
            'Xe ăn Mã. Đỏ lời trọn một quân.',
          ],
          arrows: ['d1d5', 'e0e9:blue'],
          highlights: ['e5:red'],
          caption: 'Mã e5 đứng một mình giữa hai Tướng.',
        },
      },
      {
        heading: 'Tướng nhà khóa đường chạy',
        body: `Khi lộ giữa trống, Tướng Đỏ ở e0 “nhìn” thẳng tới e9 – Tướng Đen không thể bước vào bất cứ điểm nào trên lộ giữa. Một Tướng đã chạy ra góc cung (d9 hay f9) có thể bị chiếu bí chỉ bằng một Xe, vì đường về giữa cung đã bị Tướng Đỏ chặn.

Ở thế dưới, Đỏ chỉ còn Xe và một Tốt, nhưng Tướng Đỏ làm phần việc còn lại.`,
        diagram: {
          fen: '3a1k3/9/9/p1pP5/9/8r/9/7R1/9/3AKA3 w - - 0 1',
          moves: 'X2-4 X9-6 X4.2',
          notes: [
            'Xe bình sang lộ 4 chiếu Tướng f9. Tướng không sang e9 được: lộ giữa trống trơn, sang e9 là đối mặt Tướng Đỏ. Tướng cũng không xuống f8 vì vẫn trên đường Xe.',
            'Đen chỉ còn cách đưa Xe sang f4 che chiếu.',
            'Xe ăn Xe, chiếu tiếp. Chiếu bí – Tướng Đỏ đứng tận e0 mà vẫn khóa chặt lộ giữa!',
          ],
          arrows: ['h2f2', 'e0e9:blue'],
          highlights: ['e9:blue', 'f9:red'],
          caption: 'Đỏ đi và chiếu bí sau 2 nước.',
        },
      },
      {
        heading: 'Tướng ra mặt: nước đi yên lặng chết người',
        body: `Đôi khi nước mạnh nhất lại là một nước **đi Tướng**. Khi Tướng nhà bước sang lộ 4 hoặc lộ 6 (lộ biên cung), nó lập tức làm chủ lộ đó – Tướng đối phương mất thêm một đường chạy.

Ở thế dưới, nếu Đỏ cho Mã vào g8 chiếu ngay, Tướng Đen sẽ chạy sang f9 thoát. Vì vậy Đỏ **ra Tướng trước** để khóa lộ 4, rồi mới chiếu.`,
        tip: 'Trước khi chiếu, hãy liệt kê các đường chạy của Tướng đối phương. Nếu chỉ còn một đường và Tướng nhà có thể bước sang khóa nó, nước Tướng yên lặng thường mạnh hơn mọi nước chiếu.',
        diagram: {
          fen: 'r1bak1b2/3R5/9/p1p1p2Np/9/9/P1P3P2/9/4A4/2B1K1B2 w - - 0 1',
          moves: 'Tg5-4 S4.5 M2.3',
          notes: [
            'Tướng bước sang f0, làm chủ lộ 4 – từ giờ Tướng Đen không được bước vào f9, f8. Đỏ dọa Mã vào g8 chiếu bí.',
            'Đen không có nước nào cứu được; lên Sĩ e8 cũng vô ích.',
            'Mã vào g8 chiếu (chân f8 trống). Tướng không sang f9 (lộ 4 thuộc về Tướng Đỏ), không sang d9 (Xe d8 khống chế), e8 là Sĩ nhà. Chiếu bí!',
          ],
          arrows: ['e0f0', 'f0f9:blue', 'h6g8:red'],
          highlights: ['f9:blue', 'e9:red'],
          caption: 'Đỏ đi và chiếu bí sau 2 nước.',
        },
      },
      {
        heading: 'Lộ mặt tướng trong phòng thủ',
        body: `Luật lộ mặt tướng áp dụng cho **cả hai bên**, nên khi phòng thủ em cũng phải để ý:

- Nếu một quân của em là **quân duy nhất** đứng giữa hai Tướng, nó đã bị ghim – đừng định dùng nó để ăn quân hay che chiếu ở chỗ khác.
- Khi Tướng đối phương đứng ở một lộ biên cung, lộ đó **cấm** Tướng của em bước vào (nếu không có quân chắn giữa).
- Ngược lại, em cũng có thể dùng Tướng nhà để phòng thủ: Tướng đứng đúng lộ có thể ngăn Xe, Tốt đối phương xông vào cung.

Trước mỗi nước đi, hãy nhìn xem lộ của hai Tướng đang có bao nhiêu quân chắn giữa – nếu chỉ còn một, quân đó đang “gánh” cả ván cờ.`,
        warning: 'Đừng bao giờ quên kiểm tra lộ mặt tướng khi đi quân ở lộ giữa. Nhiều thế tưởng như có nước che chiếu, nhưng quân che lại là quân duy nhất ngăn hai Tướng – nước đó phạm luật.',
      },
    ],
    keyTakeaways: [
      'Tướng làm chủ cả lộ nó đứng, như một quân Xe vô hình.',
      'Quân duy nhất đứng giữa hai Tướng bị ghim – hãy tấn công nó.',
      'Tướng đối phương không được bước vào lộ của Tướng em khi lộ trống.',
      'Quân của em đứng trên lộ của Tướng nhà thì Tướng đối phương không ăn được.',
      'Nước ra Tướng yên lặng có thể là nước quyết định ván cờ.',
    ],
  },

  // ───────────────────────── 11. Bẫy và nhốt quân ─────────────────────────
  {
    id: 'xq-ct-bay-nhot-quan',
    category: 'chien-thuat',
    title: 'Bẫy và nhốt quân',
    subtitle: 'Khi một quân mạnh không còn đường chạy',
    level: 2,
    icon: '🪤',
    minutes: 14,
    intro: `Một quân dù mạnh đến đâu cũng sẽ mất nếu nó **không còn đường chạy**. Trong cờ tướng, quân bị nhốt thường rơi vào ba hoàn cảnh:

- **Mã bị cản chân**: các chân Mã bị chặn hoặc các điểm đến đều bị khống chế.
- **Xe đi quá sâu hoặc tự chui vào ngõ cụt** giữa các quân của chính mình.
- **Quân đơn độc lọt vào góc** của đối phương, nơi mọi lối thoát đều bị canh giữ.

Bài này giúp em nhận ra những quân “sắp bị nhốt” của đối phương – và tránh để quân mình rơi vào cảnh ấy.`,
    sections: [
      {
        heading: 'Tốt nhốt Mã',
        body: `Mã của Đen nhảy lên c5 quá sớm. Trông nó có vẻ hung hăng, nhưng hãy đếm đường chạy của nó: chân c6 bị chính Tốt Đen chặn, a6 và e6 là Tốt nhà, còn a4 và e4 nằm ngay trước Tốt a3, e3 của Đỏ.

Chỉ cần một nước Tốt c3 tiến lên c4 – vừa tấn công Mã, vừa chặn nốt chân c4 – con Mã không còn đường thoát.`,
        diagram: {
          fen: 'r1bakabnr/9/1c5c1/p1p1p1p1p/2n6/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1',
          moves: 'B7.1 P2-5 B7.1',
          notes: [
            'Tốt c3 tiến lên c4 tấn công Mã c5. Mã hết đường: chân c4 bị Tốt chặn (không nhảy được b3, d3), chân c6 bị Tốt Đen chặn (không nhảy được b7, d7), a6 và e6 là Tốt nhà, còn a4, e4 đều bị Tốt a3, e3 canh.',
            'Đen không cứu được Mã, đành ra Pháo đầu tìm phản công.',
            'Tốt ăn Mã. Không quân Đen nào ăn lại được – Đỏ ăn không một Mã.',
          ],
          arrows: ['c3c4', 'c4c5:red'],
          highlights: ['c5:red', 'a4:yellow', 'e4:yellow'],
          caption: 'Con Mã c5 tưởng mạnh nhưng không có đường lui.',
        },
      },
      {
        heading: 'Xe tự chui vào ngõ cụt',
        body: `Xe mạnh nhờ đi xa được theo cả bốn hướng. Nhưng nếu các hướng ấy bị **chính quân mình** chặn, Xe cũng chết như thường.

Ở thế dưới, Xe Đen ở a5: phía trên là Tốt a6 nhà, bên phải là Mã b5 nhà. Đỏ chỉ cần đẩy Tốt biên lên a4.`,
        diagram: {
          fen: '2bakabnr/9/7c1/p1p1p1p1p/rn7/9/P1P1P1P1P/3N3C1/9/R1BAKAB1R w - - 0 1',
          moves: 'B9.1 X1.1 X9.4',
          notes: [
            'Tốt a3 tiến lên a4 tấn công Xe a5. Xe hết đường: phía trên là Tốt a6 nhà, hàng 5 bị Mã b5 nhà chắn. Xe chỉ có thể ăn Tốt a4.',
            'Xe ăn Tốt a4…',
            '…và Xe a0 ăn lại theo lộ biên. Đỏ đổi một Tốt lấy một Xe.',
          ],
          arrows: ['a3a4', 'a0a4:red'],
          highlights: ['a5:red'],
          caption: 'Xe a5 bị chính quân nhà vây kín.',
        },
      },
      {
        heading: 'Mã lọt vào góc',
        body: `Một con Mã nhảy sâu vào góc bàn cờ đối phương có rất ít đường thoát – ở góc, Mã chỉ đi được tối đa hai, ba điểm, và các chân Mã rất dễ bị chặn.

Ở thế dưới, Mã Đen ở i1 đang dọa ăn Tượng g0. Đỏ lùi Xe về h1: một nước Xe làm ba việc – chặn chân Mã ở h1, canh điểm h3 và tấn công thẳng vào con Mã.`,
        tip: 'Với Mã ở góc, hãy tìm **một điểm chung** vừa là chân Mã vừa nằm trên đường tấn công. Đặt quân vào đó thường nhốt được Mã ngay lập tức.',
        diagram: {
          fen: 'rnbakab2/3c5/1c7/p1p1p1p2/9/7R1/P1P1P1P2/1C7/8n/RNBAKAB2 w - - 0 1',
          moves: 'X2/3 P2-5 X2-1',
          notes: [
            'Xe h4 lùi về h1 – nước then chốt. Xe chặn chân Mã ở h1 (Mã không nhảy được g0, g2), canh điểm h3 (lối thoát cuối cùng) và tấn công thẳng vào Mã i1.',
            'Đen không cứu được Mã, đành ra Pháo đầu.',
            'Xe ăn Mã. Con Mã nhảy quá sâu đã phải trả giá.',
          ],
          arrows: ['h4h1', 'h1i1:red'],
          highlights: ['i1:red', 'h3:yellow'],
          caption: 'Đỏ đi: nhốt và bắt con Mã ở góc.',
        },
      },
      {
        heading: 'Phòng tránh bị nhốt quân',
        body: `Một vài thói quen giúp quân của em không bao giờ bị nhốt:

- **Trước khi đưa quân lên sâu**, hãy đếm xem nó còn **bao nhiêu đường lui**. Nếu chỉ còn một, đối phương có thể cắt nốt bằng một nước.
- **Với Mã**: tránh nhảy vào góc và biên khi các chân Mã có thể bị chặn; đặc biệt cẩn thận với Tốt đối phương – Tốt rất rẻ và rất giỏi chặn chân Mã.
- **Với Xe**: đừng để Xe bị chính Tốt, Mã nhà vây quanh; một Xe không có hàng thông thoáng là Xe chết.
- **Với Pháo**: Pháo cần ngòi để ăn quân. Pháo lọt sâu mà không có ngòi thì không thể ăn quân thoát thân.

Và ngược lại: hãy luôn tìm những quân đối phương đã đi quá sâu – chúng thường là mục tiêu dễ dàng nhất trên bàn cờ.`,
        warning: 'Ăn quân của đối phương bằng một quân đi quá sâu thường là cái bẫy: ăn được một Tốt, một Tượng nhưng không còn đường về thì cái giá phải trả là cả một quân lớn.',
      },
    ],
    keyTakeaways: [
      'Quân không có đường chạy là quân sắp mất, dù đó là Xe.',
      'Tốt là quân rẻ nhất nhưng rất giỏi chặn chân và nhốt Mã.',
      'Xe bị chính quân nhà vây kín cũng có thể bị bắt.',
      'Mã ở góc, ở biên có ít đường thoát – một quân đặt đúng điểm có thể nhốt nó.',
      'Luôn đếm đường lui trước khi đưa quân lên sâu.',
    ],
  },
];
