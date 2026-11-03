import type { XqLesson } from '../types';

export const LESSONS: XqLesson[] = [
  // ───────────────────────── 1. Bàn cờ và cách bày quân ─────────────────────────
  {
    id: 'xq-nm-ban-co-va-quan-co',
    category: 'nhap-mon',
    title: 'Bàn cờ và cách bày quân',
    subtitle: 'Làm quen với “chiến trường” 90 giao điểm, dòng sông và cung tướng',
    level: 1,
    icon: '🏯',
    minutes: 12,
    intro: `Chào mừng em đến với cờ tướng – trò chơi trí tuệ đã gắn bó với người Việt qua bao thế hệ, từ góc phố, sân đình đến những giải đấu lớn. Trước khi đi quân đầu tiên, chúng ta cần hiểu rõ “chiến trường”: bàn cờ trông thế nào, dòng sông và cung tướng nằm ở đâu, mỗi bên có những quân gì và xếp chúng ra sao. Bài học này là nền móng cho mọi bài sau.`,
    sections: [
      {
        heading: 'Bàn cờ: 9 đường dọc, 10 đường ngang',
        body: `Bàn cờ tướng được kẻ bởi **9 đường dọc** và **10 đường ngang**, cắt nhau tạo thành **90 giao điểm**. Khác với cờ vua, quân cờ tướng **đứng trên giao điểm**, không đứng trong ô vuông.

- Mỗi đường dọc gọi là một **lộ** (hay cột). Mỗi bên có 9 lộ.
- Mỗi bên có 5 hàng ngang ở phía mình.
- Khi nói “quân đi một bước”, nghĩa là nó đi từ một giao điểm sang giao điểm kề bên.

Trong ứng dụng, mỗi giao điểm có một **tọa độ** để thầy trò dễ chỉ cho nhau: cột **a → i** tính từ trái sang phải nhìn từ phía Đỏ, hàng **0 → 9** tính từ hàng cuối của Đỏ lên hàng cuối của Đen. Ví dụ: Tướng Đỏ đứng ở **e0**, Tướng Đen đứng ở **e9**.`,
        tip: 'Đừng đếm ô vuông như cờ vua! Hãy tập nhìn vào các giao điểm: góc dưới bên trái của Đỏ là a0, góc trên bên phải là i9.',
        diagram: {
          highlights: ['e0:green', 'e9:green', 'a0:blue', 'i9:blue'],
          caption: 'Thế cờ ban đầu. Xanh lá: hai Tướng ở e0 và e9. Xanh dương: hai góc bàn cờ a0 và i9.',
        },
      },
      {
        heading: 'Dòng sông “Sở hà – Hán giới”',
        body: `Giữa bàn cờ, giữa hàng 4 và hàng 5, là một khoảng trống gọi là **sông** (hà). Trên bàn cờ thật thường viết bốn chữ **“Sở hà – Hán giới”** (楚河 漢界), gợi nhớ cuộc tranh hùng giữa nước Sở của Hạng Vũ và nước Hán của Lưu Bang.

Sông chia bàn cờ thành hai nửa, mỗi bên 5 hàng. Sông không cản đường quân cờ (Xe, Pháo, Mã đều đi qua bình thường), nhưng nó quyết định luật đi của hai loại quân:

- **Tượng** không bao giờ được qua sông – nó chỉ ở nhà phòng thủ.
- **Tốt** chưa qua sông chỉ được tiến thẳng; khi đã **qua sông** (qua hà), Tốt được đi thêm sang ngang.

Vì thế, hai hàng sát sông (hàng 4 của Đỏ, hàng 5 của Đen) gọi là **bờ sông** – nơi diễn ra rất nhiều cuộc giành giật.`,
        diagram: {
          highlights: ['a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4', 'i4', 'a5:blue', 'b5:blue', 'c5:blue', 'd5:blue', 'e5:blue', 'f5:blue', 'g5:blue', 'h5:blue', 'i5:blue'],
          caption: 'Vàng: bờ sông phía Đỏ (hàng 4). Xanh dương: bờ sông phía Đen (hàng 5). Dòng sông nằm giữa hai hàng này.',
        },
      },
      {
        heading: 'Cung tướng – “cửu cung”',
        body: `Ở giữa hàng cuối của mỗi bên có một hình vuông 3 × 3 giao điểm, kẻ thêm hai **đường chéo** hình chữ X. Đó là **cung tướng**, còn gọi là **cửu cung** vì có đúng 9 giao điểm.

- Cung Đỏ gồm các điểm từ **d0 đến f2**; cung Đen gồm các điểm từ **d7 đến f9**.
- **Tướng** và **Sĩ** suốt đời không được rời khỏi cung.
- Hai đường chéo trong cung chính là đường đi của Sĩ.

Có thể hình dung cung tướng như “hoàng thành”: Tướng là vua ngồi trong đó, Sĩ là cận vệ, còn mọi quân khác ra trận để bảo vệ hoặc tấn công vào hoàng thành của đối phương.`,
        diagram: {
          highlights: [
            'd0:green', 'e0:green', 'f0:green', 'd1:green', 'e1:green', 'f1:green', 'd2:green', 'e2:green', 'f2:green',
            'd7:red', 'e7:red', 'f7:red', 'd8:red', 'e8:red', 'f8:red', 'd9:red', 'e9:red', 'f9:red',
          ],
          caption: 'Xanh lá: cung của Đỏ (d0–f2). Đỏ: cung của Đen (d7–f9).',
        },
      },
      {
        heading: 'Bảy loại quân và tên gọi',
        body: `Mỗi bên có **16 quân**, chia thành **7 loại**. Quân cờ là những chiếc đĩa tròn khắc chữ Hán; chữ của Đỏ và của Đen đôi khi khác nhau nhưng **cách đi hoàn toàn giống nhau**:

- **Tướng** (Đỏ: 帥 – Soái, Đen: 將 – Tướng) – 1 quân. Mất Tướng là thua.
- **Sĩ** (仕 / 士) – 2 quân, cận vệ trong cung.
- **Tượng** (相 / 象) – 2 quân, giữ nhà, không qua sông.
- **Mã** (傌 / 馬) – 2 quân, đi hình chữ nhật.
- **Xe** (俥 / 車) – 2 quân, quân mạnh nhất.
- **Pháo** (炮 / 砲) – 2 quân, ăn quân bằng cách nhảy qua một quân khác.
- **Tốt** (Đỏ: 兵 – Binh, Đen: 卒 – Tốt) – 5 quân.

Khi ghi nước đi, người Việt dùng chữ viết tắt: **Tg** (Tướng), **S** (Sĩ), **T** (Tượng), **M** (Mã), **X** (Xe), **P** (Pháo) và **B** (Binh – tức Tốt). Em sẽ học cách ghi ở bài sau.`,
        tip: 'Mẹo nhớ chữ Hán: chữ có bộ “nhân” (亻) đứng bên trái – 仕, 傌, 俥 – thường là quân Đỏ. Nhưng đừng lo, ứng dụng luôn tô màu rõ ràng để em phân biệt hai bên.',
        diagram: {
          highlights: ['e0:red', 'e9:red', 'd0:yellow', 'f0:yellow', 'c0:green', 'g0:green', 'b0:blue', 'h0:blue'],
          caption: 'Hàng cuối của Đỏ: Tướng e0 (đỏ), hai Sĩ d0, f0 (vàng), hai Tượng c0, g0 (xanh lá), hai Mã b0, h0 (xanh dương) và hai Xe ở góc a0, i0.',
        },
      },
      {
        heading: 'Cách bày quân lúc đầu ván',
        body: `Hai bên bày quân **đối xứng nhau** qua dòng sông:

- **Hàng cuối**: từ góc vào giữa là **Xe – Mã – Tượng – Sĩ – Tướng – Sĩ – Tượng – Mã – Xe**.
- **Pháo**: hai Pháo đứng ở hàng thứ ba (tính từ hàng cuối), thẳng phía trước hai con Mã – với Đỏ là **b2** và **h2**.
- **Tốt**: năm Tốt đứng ở hàng thứ tư, cách nhau một giao điểm – với Đỏ là **a3, c3, e3, g3, i3**.

Bên Đen bày giống hệt ở phía bên kia: Pháo ở b7, h7 và Tốt ở a6, c6, e6, g6, i6. Như vậy giữa hai hàng Tốt là hai hàng trống (hàng 4 và hàng 5) với dòng sông chạy ở giữa.`,
        tip: 'Kiểm tra nhanh: Pháo luôn đứng thẳng trước Mã, Tốt giữa luôn đứng thẳng trước Tướng. Nếu sai một trong hai điều này, em đã bày nhầm.',
        warning: 'Người mới hay đặt Pháo ngay trước Xe (cột a, i) hoặc đặt Tốt sát nhau. Hãy nhớ: Pháo ở cột b, h; Tốt ở các cột a, c, e, g, i.',
        diagram: {
          highlights: ['b2:blue', 'h2:blue', 'b7:blue', 'h7:blue', 'a3:green', 'c3:green', 'e3:green', 'g3:green', 'i3:green', 'a6:green', 'c6:green', 'e6:green', 'g6:green', 'i6:green'],
          caption: 'Xanh dương: bốn Pháo đứng trước Mã. Xanh lá: mười Tốt xếp cách quãng ở hàng thứ tư của mỗi bên.',
        },
      },
      {
        heading: 'Đỏ đi trước – những nước đầu tiên',
        body: `Theo luật, **bên Đỏ luôn đi trước**. Hai bên lần lượt đi, mỗi lượt **một nước**, mỗi nước di chuyển **một quân**. Không được bỏ lượt.

Quân đi đến giao điểm có quân đối phương thì **ăn** quân đó (nhấc quân bị ăn ra khỏi bàn). Không được đi đến giao điểm có quân của mình. Mọi quân đều ăn theo đúng cách đi của nó – riêng **Pháo** có cách ăn đặc biệt mà em sẽ học ở bài 5.

Bên đi trước có lợi thế nhỏ về nhịp, người ta gọi là **tiên thủ**; bên đi sau là **hậu thủ**. Bấm ▶ để xem bốn nước mở đầu rất phổ biến của cờ tướng.`,
        diagram: {
          moves: 'P2-5 M8.7 M2.3 X9-8',
          notes: [
            'Đỏ đưa Pháo từ h2 vào giữa e2. Thế này gọi là **Pháo đầu** (Trung pháo): Pháo nhắm thẳng vào Tốt giữa và Tướng của Đen.',
            'Đen nhảy Mã từ h9 lên g7. Con Mã này bảo vệ Tốt giữa e6 – nếu Pháo Đỏ ăn Tốt e6, Mã sẽ ăn lại Pháo.',
            'Đỏ cũng ra Mã: Mã h0 nhảy lên g2, giữ cho Tốt giữa e3 vững chắc và mở đường cho Xe i0.',
            'Đen đưa Xe từ góc i9 sang h9, đứng sau Pháo h7. Xe đã rời góc; khi Pháo h7 rời đi, Xe sẽ tiến thẳng theo cột h. Cả hai bên đều đang ra quân rất nhanh.',
          ],
          caption: 'Pháo đầu đối Bình phong mã – cách mở đầu kinh điển. Bấm ▶ để xem từng nước.',
        },
      },
    ],
    keyTakeaways: [
      'Bàn cờ có 9 lộ × 10 hàng = 90 giao điểm; quân đứng trên giao điểm.',
      'Sông nằm giữa hàng 4 và 5: Tượng không qua sông, Tốt qua sông mới được đi ngang.',
      'Cung tướng 3 × 3 có hai đường chéo; Tướng và Sĩ không rời khỏi cung.',
      'Mỗi bên 16 quân: 1 Tướng, 2 Sĩ, 2 Tượng, 2 Mã, 2 Xe, 2 Pháo, 5 Tốt.',
      'Đỏ luôn đi trước; mỗi lượt đi một nước, không được bỏ lượt.',
    ],
  },

  // ───────────────────────── 2. Ký hiệu nước đi ─────────────────────────
  {
    id: 'xq-nm-ky-hieu-nuoc-di',
    category: 'nhap-mon',
    title: 'Ký hiệu nước đi: tấn, thoái, bình',
    subtitle: 'Đọc và ghi được mọi ván cờ tướng chỉ với vài con số',
    level: 1,
    icon: '📜',
    minutes: 14,
    intro: `Người chơi cờ tướng có một “ngôn ngữ” riêng để ghi lại ván đấu: **P2-5**, **M8.7**, **X1.1**… Thoạt nhìn giống mật mã, nhưng chỉ cần nắm ba điều – **đánh số lộ, ba động từ tấn – thoái – bình, và ý nghĩa của con số cuối** – là em đọc được mọi sách cờ và tự ghi lại ván của mình để rút kinh nghiệm.`,
    sections: [
      {
        heading: 'Đánh số lộ: mỗi bên đếm từ phải sang trái của mình',
        body: `Mỗi bên tự đánh số 9 lộ **từ 1 đến 9, tính từ tay phải sang tay trái của mình**:

- Với **Đỏ** (ngồi phía dưới): lộ 1 là cột **i**, lộ 9 là cột **a**.
- Với **Đen** (ngồi phía trên): lộ 1 là cột **a**, lộ 9 là cột **i**.
- Lộ giữa – nơi có Tướng – luôn là **lộ 5** của cả hai bên.

Nhờ cách đếm này, hai bên “nói cùng một ngôn ngữ”: Pháo bên phải của Đỏ (h2) và Pháo bên phải của Đen (b7) đều đứng ở **lộ 2**; Xe ở góc phải của mỗi bên đều đứng ở **lộ 1**.`,
        tip: 'Hãy tưởng tượng em đang ngồi ở phía của bên vừa đi: lộ 1 luôn ở ngay tay phải của người đó.',
        diagram: {
          highlights: ['i0:green', 'a0:red', 'a9:green', 'i9:red', 'h2:blue', 'b7:blue'],
          caption: 'Xanh lá: lộ 1 của mỗi bên (Đỏ: cột i, Đen: cột a). Đỏ: lộ 9. Xanh dương: Pháo lộ 2 của Đỏ (h2) và của Đen (b7).',
        },
      },
      {
        heading: 'Ba động từ: tấn, thoái, bình',
        body: `Một nước đi được ghi theo công thức **Quân + lộ xuất phát + dấu + con số**. Dấu cho biết quân đi theo hướng nào:

- **Dấu chấm (.) – tấn**: tiến về phía đối phương.
- **Dấu gạch chéo (/) – thoái**: lui về phía mình.
- **Dấu gạch ngang (-) – bình**: đi ngang trên cùng một hàng.

Ví dụ ở thế cờ ban đầu:
- **P2-5**: Pháo ở lộ 2 **bình** sang lộ 5 (h2 → e2).
- **X1.2**: Xe ở lộ 1 **tấn** 2 bước (i0 → i2).
- **P8/1**: Pháo ở lộ 8 **thoái** 1 bước (b2 → b1).

Chú ý: “tấn” và “thoái” luôn tính theo hướng của bên đi. Đen tấn là đi **xuống** phía Đỏ.`,
        diagram: {
          arrows: ['h2e2:green', 'i0i2:blue', 'b2b1:orange'],
          caption: 'Xanh lá: P2-5 (bình). Xanh dương: X1.2 (tấn 2 bước). Cam: P8/1 (thoái 1 bước).',
        },
      },
      {
        heading: 'Con số cuối: số bước hay lộ đến?',
        body: `Đây là điểm người mới hay nhầm nhất. Con số cuối cùng có hai nghĩa tùy loại quân:

- **Quân đi thẳng** – Xe, Pháo, Tốt, Tướng – khi **tấn/thoái** thì số cuối là **số bước** đi.
- **Quân đi chéo** – Mã, Tượng, Sĩ – khi tấn/thoái thì số cuối là **lộ đến** (vì chúng vừa tiến vừa đổi lộ).
- Khi **bình** (đi ngang), số cuối luôn là **lộ đến**.

Ví dụ: **M2.3** nghĩa là Mã ở lộ 2 tiến sang lộ 3 (h0 → g2), chứ không phải “tiến 3 bước”. Còn **X1.1** nghĩa là Xe ở lộ 1 tiến **1 bước**.`,
        warning: 'Đừng đọc “T3.5” là Tượng tiến 5 bước! Tượng đi chéo nên số 5 là lộ đến: Tượng ở lộ 3 tiến lên lộ 5 (g0 → e2).',
        diagram: {
          moves: 'M2.3 M8.7 X1.1 X9.1 T7.5 S4.5 B3.1',
          notes: [
            'M2.3 – Mã đi chéo nên “3” là lộ đến: Mã từ lộ 2 (h0) nhảy sang lộ 3 (g2).',
            'M8.7 – Đen cũng nhảy Mã: Mã lộ 8 của Đen (h9) sang lộ 7 (g7). Nhớ là Đen đếm lộ từ phía mình.',
            'X1.1 – Xe đi thẳng nên “1” là số bước: Xe lộ 1 (i0) tiến đúng 1 bước lên i1.',
            'X9.1 – Xe lộ 9 của Đen (i9) tiến 1 bước xuống i8. Với Đen, “tấn” là đi xuống phía Đỏ.',
            'T7.5 – Tượng lộ 7 (c0) tiến lên lộ 5 (e2). Tượng đi chéo nên số cuối là lộ đến.',
            'S4.5 – Sĩ lộ 4 của Đen (d9) tiến vào giữa cung, lộ 5 (e8).',
            'B3.1 – Binh (Tốt) lộ 3 (g3) tiến 1 bước lên g4. Tốt đi thẳng nên số cuối là số bước.',
          ],
          caption: 'Bấm ▶ và so sánh: Mã, Tượng, Sĩ ghi lộ đến; Xe, Tốt ghi số bước.',
        },
      },
      {
        heading: 'Hai quân cùng lộ: “trước” và “sau”',
        body: `Khi hai quân cùng loại đứng trên **cùng một lộ**, ghi số lộ sẽ không phân biệt được. Lúc đó ta thay số lộ bằng chữ:

- **t** (trước): quân đứng **gần đối phương hơn**.
- **s** (sau): quân đứng **gần phía mình hơn**.

Ví dụ: **Xt.5** = Xe trước tấn 5 bước; **Xs.7** = Xe sau tấn 7 bước. Với bên Đen, “trước” là quân ở thấp hơn trên bàn cờ (gần phía Đỏ). Hiếm hơn, khi có ba Tốt trên một lộ, ta dùng t (trước), g (giữa), s (sau).

Ở thế cờ dưới đây, hai Xe Đỏ cùng đứng ở lộ 6 (cột d) và phối hợp chiếu bí chỉ trong hai nước.`,
        diagram: {
          fen: '2bak4/9/4b2r1/9/9/3R5/6n2/9/3R5/3AKA3 w - - 0 1',
          moves: 'Xt.5 Tg5.1 Xs.7',
          notes: [
            'Xt.5 – Xe trước (d4) tấn 5 bước lên d9, ăn Sĩ và chiếu Tướng theo hàng ngang. Tướng Đen không ăn lại được vì Xe d9 được Xe sau (d1) bảo vệ dọc theo lộ 6.',
            'Tg5.1 – Tướng Đen buộc phải tiến lên e8: sang f9 vẫn nằm trên đường chiếu của Xe d9, còn Tượng e7 không được rời lộ 5 vì đang che giữa hai Tướng.',
            'Xs.7 – Xe sau (d1) tấn 7 bước lên d8, chiếu bí! Tướng e8 không lùi về e9 (Xe d9 khống chế hàng 9), không sang f8 (Xe d8 chiếu dọc hàng 8), phía trước (e7) là Tượng của chính mình, và Xe d8 được Xe d9 bảo vệ nên không ăn được.',
          ],
          caption: 'Đỏ đi. Hai Xe trên cùng lộ 6 được gọi là Xe trước (d4) và Xe sau (d1).',
        },
      },
      {
        heading: 'Đọc một ván khai cuộc thật',
        body: `Giờ hãy cùng đọc một đoạn khai cuộc kinh điển: **Pháo đầu – Xe qua hà** đối **Bình phong mã**. Trước khi bấm ▶, em hãy thử tự đoán xem mỗi ký hiệu di chuyển quân nào, đi đâu, rồi so với lời giải thích.

Biên bản viết theo cặp: số thứ tự, nước của Đỏ, rồi nước của Đen. Ví dụ “1. P2-5 M8.7” nghĩa là nước thứ nhất Đỏ đi P2-5, Đen đáp M8.7.`,
        tip: 'Sách cờ Trung Quốc ghi P2-5 là 炮二平五 (Pháo nhị bình ngũ): 平 (bình) là đi ngang, 进 (tấn) là tiến, 退 (thoái) là lui. Đỏ dùng số chữ Hán 一…九, Đen dùng số thường 1…9.',
        diagram: {
          moves: '1. P2-5 M8.7 2. M2.3 X9-8 3. X1-2 M2.3 4. B7.1 B7.1 5. X2.6 P8-9 6. X2.3 M7/8',
          notes: [
            '1. P2-5 – Pháo lộ 2 bình sang lộ 5: Pháo đầu.',
            '1… M8.7 – Mã lộ 8 của Đen tấn lên lộ 7 (h9 → g7), bảo vệ Tốt giữa.',
            '2. M2.3 – Mã lộ 2 của Đỏ tấn lên lộ 3 (h0 → g2).',
            '2… X9-8 – Xe lộ 9 của Đen bình sang lộ 8 (i9 → h9), đứng sau Pháo h7.',
            '3. X1-2 – Xe lộ 1 của Đỏ bình sang lộ 2 (i0 → h0). Cột h đã trống vì Pháo h2 đi rồi, Xe sẵn sàng tiến lên.',
            '3… M2.3 – Mã lộ 2 của Đen (b9) tấn lên lộ 3 (c7). Đen có thế “Bình phong mã”: hai Mã như tấm bình phong che trước cung.',
            '4. B7.1 – Binh lộ 7 (c3) tấn 1 bước lên c4. Sau này Mã b0 ra c2 sẽ không bị Tốt cản chân.',
            '4… B7.1 – Tốt lộ 7 của Đen (g6) tấn 1 bước xuống g5, mở đường cho Mã g7.',
            '5. X2.6 – Xe lộ 2 tấn 6 bước, từ h0 lên h6: **Xe qua hà**, chọc sâu vào trận địa Đen.',
            '5… P8-9 – Pháo lộ 8 của Đen bình sang lộ 9 (h7 → i7). Cột h mở ra, Xe h9 của Đen đối mặt Xe h6 của Đỏ. Xe Đen được Mã g7 bảo vệ, còn Xe Đỏ thì không: Đen mời đổi Xe.',
            '6. X2.3 – Xe lộ 2 tấn 3 bước từ h6 lên h9, ăn Xe Đen.',
            '6… M7/8 – Mã lộ 7 của Đen (g7) **thoái** về lộ 8 (h9), ăn lại Xe. Hai bên đổi Xe; chú ý Mã thoái cũng ghi lộ đến.',
          ],
          caption: 'Bấm ▶ và tự đọc từng ký hiệu trước khi xem lời giải thích.',
        },
      },
    ],
    keyTakeaways: [
      'Mỗi bên đánh số lộ 1–9 từ phải sang trái của mình; lộ giữa là lộ 5.',
      'Công thức: Quân + lộ xuất phát + dấu (. tấn, / thoái, - bình) + con số.',
      'Xe, Pháo, Tốt, Tướng tấn/thoái: số cuối là số bước.',
      'Mã, Tượng, Sĩ tấn/thoái: số cuối là lộ đến; khi bình, số cuối luôn là lộ đến.',
      'Hai quân cùng loại trên một lộ: dùng t (trước) và s (sau) thay số lộ.',
    ],
  },

  // ───────────────────────── 3. Tướng và Sĩ ─────────────────────────
  {
    id: 'xq-nm-tuong-va-si',
    category: 'nhap-mon',
    title: 'Cách đi của quân (phần 1): Tướng và Sĩ',
    subtitle: 'Hai quân không bao giờ rời cung – và luật “lộ mặt tướng” độc đáo',
    level: 1,
    icon: '👑',
    minutes: 12,
    intro: `Tướng là quân quan trọng nhất: mất Tướng là thua cả ván. Thế nhưng Tướng lại là quân bị giới hạn nhiều nhất – chỉ quanh quẩn trong cung với 9 giao điểm. Bên cạnh Tướng luôn có hai Sĩ làm cận vệ. Bài này còn giới thiệu luật **lộ mặt tướng** – luật riêng có của cờ tướng, vừa là điều cấm vừa là một vũ khí lợi hại.`,
    sections: [
      {
        heading: 'Tướng: mỗi lần một bước, chỉ trong cung',
        body: `**Tướng** đi **một bước** theo chiều dọc hoặc chiều ngang (không đi chéo), và **không bao giờ được ra khỏi cung**.

- Đứng ở giữa cung (e1), Tướng có tối đa **4 nước đi**.
- Đứng ở góc cung, Tướng chỉ còn **2 nước** vì hai hướng kia đã ra ngoài cung.
- Tướng ăn quân theo đúng cách đi: quân đối phương đứng kề bên trong cung mà không được bảo vệ thì Tướng ăn được.

Trong ký hiệu, Tướng viết là **Tg**. Ví dụ **Tg5.1** là Tướng ở lộ 5 tiến 1 bước, **Tg5-4** là Tướng bình sang lộ 4.`,
        diagram: {
          fen: '4ka3/4a4/9/2p3p2/9/9/2P3P2/9/4K4/3A1A3 w - - 0 1',
          arrows: ['e1e2', 'e1e0', 'e1d1', 'e1f1'],
          caption: 'Tướng Đỏ ở giữa cung (e1) có 4 nước: lên e2, xuống e0, sang d1 hoặc f1.',
        },
      },
      {
        heading: 'Sĩ: cận vệ đi chéo',
        body: `**Sĩ** đi **một bước theo đường chéo**, và cũng **không được ra khỏi cung**. Vì chỉ đi trên hai đường chéo của cung, Sĩ chỉ đứng được ở **5 điểm**: bốn góc cung và điểm giữa cung.

- Sĩ ở góc cung chỉ có **1 nước**: vào giữa cung.
- Sĩ ở giữa cung có tối đa **4 nước** ra bốn góc.

Nhiệm vụ của Sĩ là che chắn cho Tướng. Nước **S4.5** hoặc **S6.5** (đưa Sĩ vào giữa cung) là một trong những nước phòng thủ quen thuộc nhất của cờ tướng.`,
        tip: 'Sĩ chỉ có 5 chỗ đứng, nên khi một Sĩ vào giữa cung (e1 hoặc e8), Sĩ kia không vào đó được nữa. Hãy suy nghĩ xem Sĩ nào nên lên trước.',
        diagram: {
          fen: '3ak4/4a4/9/2p3p2/9/9/2P3P2/9/4A4/4K4 w - - 0 1',
          arrows: ['e1d2', 'e1f2', 'e1d0', 'e1f0'],
          highlights: ['d0:green', 'f0:green', 'd2:green', 'f2:green', 'e1:green'],
          caption: 'Năm điểm Sĩ được đứng (xanh lá). Sĩ Đỏ ở giữa cung e1 có thể đi ra cả bốn góc.',
        },
      },
      {
        heading: 'Luật lộ mặt tướng',
        body: `Đây là luật đặc biệt nhất của cờ tướng: **hai Tướng không bao giờ được đứng đối mặt nhau trên cùng một lộ mà không có quân nào ở giữa**. Người ta gọi đó là **lộ mặt tướng** (hay “bạch diện tướng”).

- Không được đi một nước khiến hai Tướng đối mặt – kể cả khi đó là nước đi của Tướng hay của quân đang đứng chắn ở giữa.
- Có thể hiểu đơn giản: mỗi Tướng giống như một **quân Xe vô hình** “bắn” thẳng theo lộ của mình, chỉ có tác dụng với Tướng đối phương.

Ở thế cờ dưới đây, Tướng Đen đang ở lộ d. Nếu Tướng Đỏ bước sang d1, hai Tướng sẽ nhìn thẳng vào nhau – nước đi này **bị cấm**.`,
        warning: 'Người mới hay quên luật này khi tính nước chạy Tướng. Trước khi đưa Tướng sang lộ bên, hãy nhìn xem Tướng đối phương có đang đứng trên lộ đó với đường thông thoáng hay không.',
        diagram: {
          fen: '3k1a3/4a4/9/2p3p2/9/9/2P3P2/9/4K4/5A3 w - - 0 1',
          arrows: ['e1e2', 'e1e0', 'e1f1', 'e1d1:red'],
          highlights: ['d1:red', 'd9:red'],
          caption: 'Tướng Đỏ e1 đi được e2, e0, f1 nhưng không được sang d1 vì sẽ đối mặt Tướng Đen d9 trên lộ trống.',
        },
      },
      {
        heading: 'Tướng cũng biết “khống chế” một lộ',
        body: `Luật lộ mặt tướng không chỉ là điều cấm – nó còn là **vũ khí**. Khi Tướng của em đứng trên một lộ trống, **Tướng đối phương không thể bước vào lộ đó**. Như vậy, Tướng của em đang “canh giữ” cả một lộ mà không cần di chuyển.

Ở thế cờ dưới, Tướng Đen đã rời khỏi lộ giữa sang d9. Tướng Đỏ ở e0 âm thầm khống chế toàn bộ lộ e. Chỉ cần một nước Xe là Đỏ chiếu bí.`,
        tip: 'Trong tàn cuộc, hãy chủ động đưa Tướng của mình sang lộ 4 hoặc lộ 6 (cột f hoặc cột d) để “khóa” một bên cung của đối phương. Đây là kỹ thuật cực kỳ quan trọng khi tấn công với ít quân.',
        diagram: {
          fen: '3k1a3/9/9/9/R8/9/9/9/9/3AKA3 w - - 0 1',
          moves: 'X9-6',
          notes: [
            'Xe a5 bình sang lộ 6 (cột d) chiếu Tướng. Tướng Đen không lên d8 được (vẫn nằm trên đường Xe), không sang e9 được vì sẽ đối mặt Tướng Đỏ e0. Sĩ f9 cũng không giúp được gì: chiếu bí!',
          ],
          arrows: ['a5d5', 'e0e9:yellow'],
          caption: 'Đỏ đi và chiếu bí trong 1 nước. Mũi tên vàng: Tướng Đỏ khống chế cả lộ e.',
        },
      },
      {
        heading: 'Quân đứng giữa hai Tướng bị ghim chặt',
        body: `Một hệ quả thú vị: nếu giữa hai Tướng chỉ có **đúng một quân**, quân đó **không được rời khỏi lộ**, vì nếu nó đi, hai Tướng sẽ lộ mặt. Ta nói quân đó bị **ghim** (khống chế).

Quân bị ghim gần như “chết đứng”: đối phương có thể thong thả tấn công nó bằng một quân rẻ tiền. Ở ví dụ dưới, Mã Đen ở e6 là quân duy nhất ngăn giữa hai Tướng, và một chú Tốt Đỏ đã qua sông sẽ tiến lên ăn nó.`,
        diagram: {
          fen: '3aka3/9/9/p3n3p/3P5/9/P7P/9/9/3AKA3 w - - 0 1',
          moves: 'B6.1 S4.5 B6-5',
          notes: [
            'Tốt qua sông ở d5 tiến lên d6, đứng ngay cạnh Mã e6 và dọa ăn ngang. Mã Đen không thể chạy: hễ Mã rời lộ e, hai Tướng sẽ đối mặt.',
            'Đen đưa Sĩ vào e8 để che giữa hai Tướng, “giải ghim” cho Mã. Nhưng đã muộn – Mã chưa kịp chạy thì đến lượt Đỏ.',
            'Tốt bình sang e6 ăn Mã. Chỉ với một chú Tốt, Đỏ bắt được Mã nhờ luật lộ mặt tướng!',
          ],
          highlights: ['e6:red'],
          caption: 'Đỏ đi. Mã e6 là quân duy nhất ngăn giữa hai Tướng nên bị ghim.',
        },
      },
      {
        heading: 'Đừng đi Tướng, Sĩ một cách vô cớ',
        body: `Tướng và Sĩ là hàng phòng thủ cuối cùng. Một vài lời khuyên cho người mới:

- **Đừng chạy Tướng lung tung** khi không cần thiết. Mỗi nước đi Tướng vô cớ là một nước phát triển quân bị bỏ phí.
- **Giữ đủ hai Sĩ** càng lâu càng tốt. Cung tướng thiếu Sĩ rất dễ bị Xe, Mã, Pháo của đối phương đột nhập.
- Sĩ lên giữa cung (S4.5 hoặc S6.5) là nước phòng thủ vững chắc, nhưng hãy nhớ: Sĩ ở giữa cung sẽ chắn lối đi của Tướng lên trên.
- Khi đã vào tàn cuộc và đối phương ít quân, Tướng có thể mạnh dạn **dùng luật lộ mặt tướng** để hỗ trợ tấn công.`,
        tip: 'Một cung tướng có đủ Sĩ và Tượng chịu được những đòn tấn công rất mạnh. Mất Sĩ Tượng, Tướng sẽ dễ bị chiếu bí bởi những thế cờ em sẽ học ở bài 9.',
      },
    ],
    keyTakeaways: [
      'Tướng đi 1 bước ngang hoặc dọc, không bao giờ ra khỏi cung.',
      'Sĩ đi 1 bước chéo, chỉ đứng được ở 5 điểm trong cung.',
      'Hai Tướng không được đối mặt trên một lộ trống (luật lộ mặt tướng).',
      'Tướng khống chế cả lộ của mình: Tướng đối phương không bước vào lộ đó được.',
      'Quân duy nhất đứng giữa hai Tướng bị ghim, không được rời lộ.',
    ],
  },

  // ───────────────────────── 4. Tượng và Mã ─────────────────────────
  {
    id: 'xq-nm-tuong-va-ma',
    category: 'nhap-mon',
    title: 'Cách đi của quân (phần 2): Tượng và Mã',
    subtitle: 'Tượng đi chữ điền, Mã đi chữ nhật – và những lúc chúng bị “cản”',
    level: 1,
    icon: '🐎',
    minutes: 14,
    intro: `Tượng và Mã đều không đi thẳng, và cả hai đều có thể **bị chặn** theo một cách rất riêng của cờ tướng: Tượng bị “bịt mắt”, Mã bị “cản chân”. Hiểu rõ hai quy tắc này, em sẽ tránh được rất nhiều tình huống tưởng ăn được quân mà hóa ra không ăn được – và ngược lại, biết cách vô hiệu hóa quân của đối phương.`,
    sections: [
      {
        heading: 'Tượng: đi chéo đúng hai bước (chữ điền)',
        body: `**Tượng** đi chéo **đúng hai bước** mỗi lần – tức là đi theo đường chéo của một hình vuông 2 × 2, giống nét chéo của chữ **điền** (田). Vì vậy người ta hay nói “Tượng đi chữ điền”.

Do cách đi đặc biệt này, mỗi Tượng chỉ có thể đứng ở **7 điểm** trên nửa bàn cờ của mình: với Đỏ là **c0, g0, a2, e2, i2, c4, g4**.

- Tượng ở giữa (e2) có tối đa 4 nước đi.
- Tượng ở biên (a2, i2) chỉ có 2 nước.
- Tượng ăn quân theo đúng cách đi: quân đối phương đứng ở điểm Tượng đến được thì bị ăn.`,
        diagram: {
          fen: '2bakab2/9/9/p3p3p/9/9/P3P3P/4B4/9/3AKA3 w - - 0 1',
          arrows: ['e2c0', 'e2g0', 'e2c4', 'e2g4'],
          highlights: ['c0:green', 'g0:green', 'a2:green', 'e2:green', 'i2:green', 'c4:green', 'g4:green'],
          caption: 'Bảy điểm Tượng Đỏ có thể đứng (xanh lá). Tượng ở e2 đi được cả bốn hướng.',
        },
      },
      {
        heading: 'Mắt tượng: khi Tượng bị “bịt mắt”',
        body: `Điểm nằm **chính giữa** đường đi của Tượng (giao điểm chéo kề bên) gọi là **mắt tượng**. Nếu mắt tượng có **bất kỳ quân nào** – của mình hay của đối phương – Tượng **không đi được** theo hướng đó. Ta nói Tượng bị **bịt mắt** (hay “cản mắt tượng”).

Ở thế cờ dưới, Pháo Đen lọt vào d3 đã bịt mắt Tượng ở hướng c4. Nhưng hướng g4 thì mắt tượng f3 trống – và Mã Đen vừa qua sông ở g4 đang đứng đúng chỗ Tượng ăn được.`,
        tip: 'Muốn vô hiệu hóa Tượng của đối phương, hãy đặt một quân vào mắt tượng. Ngược lại, khi Tượng của em cần lên giữa, hãy kiểm tra xem mắt tượng có trống không.',
        diagram: {
          fen: '2bakab2/9/9/p3p3p/9/6n2/P2cP3P/4B4/9/3AKA3 w - - 0 1',
          moves: 'T5.3',
          notes: ['Tượng e2 tiến lên g4 ăn Mã! Mắt tượng f3 trống nên nước đi hợp lệ. Mã Đen vừa qua sông đã dọa ăn Tốt e3, nay bị Tượng “hiền lành” trừng phạt.'],
          arrows: ['e2g4:green', 'e2c4:red'],
          highlights: ['d3:red', 'f3:green'],
          caption: 'Đỏ đi. Mắt tượng d3 bị Pháo Đen chặn (đỏ), mắt tượng f3 trống (xanh lá).',
        },
      },
      {
        heading: 'Tượng không bao giờ qua sông',
        body: `Tượng là quân **thuần phòng thủ**: nó **không được qua sông**. Điểm xa nhất Tượng Đỏ có thể đến là c4 và g4 – ngay bờ sông.

Vì không tham gia tấn công, Tượng thường được xem là quân yếu (khoảng **2 điểm**). Nhưng đừng coi thường: cặp Tượng che chắn các điểm trước cung, bảo vệ Tốt giữa và chống lại Xe, Pháo của đối phương. Mất Tượng, cung tướng sẽ “hở sườn” trước những đòn của Pháo và Xe.`,
        warning: 'Đừng đưa Tượng ra biên (a2, i2) quá sớm khi chưa có lý do: Tượng ở biên rất khó quay về bảo vệ trung tâm.',
        diagram: {
          fen: '2bakab2/9/9/p3p3p/9/6B2/P3P3P/9/9/3AKA3 w - - 0 1',
          arrows: ['g4e2', 'g4i2', 'g4e6:red', 'g4i6:red'],
          caption: 'Tượng ở bờ sông g4 chỉ còn đường lui về e2 hoặc i2. Hai điểm e6, i6 ở bên kia sông – Tượng không bao giờ đến được.',
        },
      },
      {
        heading: 'Mã: đi chữ nhật',
        body: `**Mã** đi theo hình **chữ nhật** (日): **một bước thẳng** (dọc hoặc ngang) rồi **một bước chéo** tiếp theo cùng hướng. Kết quả là Mã đến một điểm cách 2 hàng 1 cột, hoặc 1 hàng 2 cột.

- Mã ở giữa bàn cờ trống có tối đa **8 nước đi**.
- Mã ở biên hoặc góc có ít nước hơn – vì thế người ta khuyên **đưa Mã về phía trung tâm**.
- Mã được qua sông và đi khắp bàn cờ. Mã qua sông áp sát cung tướng là một quân tấn công rất nguy hiểm.`,
        diagram: {
          fen: '2bakab2/9/9/p3p3p/9/4N4/P7P/9/9/3AKA3 w - - 0 1',
          highlights: ['d6:green', 'f6:green', 'c5:green', 'g5:green', 'c3:green', 'g3:green', 'd2:green', 'f2:green'],
          caption: 'Mã ở e4 có 8 điểm có thể nhảy tới (xanh lá).',
        },
      },
      {
        heading: 'Cản chân mã',
        body: `Khác với Mã trong cờ vua, Mã cờ tướng **không nhảy qua quân khác**. Bước thẳng đầu tiên của Mã phải đi qua một giao điểm kề bên – điểm đó gọi là **chân mã**. Nếu chân mã có quân (của bất kỳ bên nào), Mã **không đi được** theo hướng đó. Ta nói Mã bị **cản chân** (hay “cản mã”).

Mỗi chân mã cản **hai** hướng nhảy. Ở thế cờ dưới:
- Tốt e3 của chính Đỏ cản chân phía dưới: Mã không xuống được d2, f2.
- Tốt Đen d4 đã qua sông cản chân bên trái: Mã không sang được c5, c3.
- Chỉ còn bốn nước: d6, f6, g5, g3.`,
        diagram: {
          fen: '2bakab2/9/9/p7p/9/3pN4/P3P3P/9/9/3AKA3 w - - 0 1',
          arrows: ['e4d6', 'e4f6', 'e4g5', 'e4g3'],
          highlights: ['e3:yellow', 'd4:yellow', 'd2:red', 'f2:red', 'c5:red', 'c3:red'],
          caption: 'Vàng: hai chân mã bị cản. Đỏ: bốn điểm Mã không nhảy tới được. Mũi tên: bốn nước còn lại.',
        },
      },
      {
        heading: 'Mã đối Mã: không phải lúc nào cũng “ăn qua ăn lại”',
        body: `Trong cờ vua, nếu Mã A tấn công được Mã B thì Mã B cũng tấn công được Mã A. Cờ tướng thì **không như vậy**! Vì chân mã của hai bên nằm ở hai điểm khác nhau, có thể xảy ra trường hợp Mã này ăn được Mã kia, còn Mã kia thì “bó tay”.

Ở thế cờ dưới, Mã Đỏ e4 nhảy lên d6 phải đi qua chân e5 – điểm này trống. Còn Mã Đen d6 muốn nhảy xuống e4 phải đi qua chân d5 – nơi chính Pháo Đen đang đứng. Kết quả: Đỏ ăn được Mã Đen, Đen không ăn được Mã Đỏ.`,
        tip: 'Trước khi đưa Mã đến gần Mã đối phương, hãy kiểm tra chân mã của cả hai bên. Đặt Mã ở chỗ “mình đánh được người, người không đánh được mình” là một nghệ thuật.',
        diagram: {
          fen: '2bakab2/9/9/p2np3p/3c5/4N4/P7P/9/9/3AKA3 w - - 0 1',
          moves: 'M5.6',
          notes: ['Mã e4 tiến lên d6 ăn Mã Đen (chân mã e5 trống). Mã Đen đã không thể ra tay trước vì chân d5 của nó bị chính Pháo Đen cản.'],
          arrows: ['e4d6:green', 'd6e4:red'],
          highlights: ['e5:green', 'd5:red'],
          caption: 'Đỏ đi. Chân mã của Đỏ (e5) trống, chân mã của Đen (d5) bị cản.',
        },
      },
      {
        heading: 'Sức mạnh của Mã: vừa chiếu vừa bắt quân',
        body: `Mã có thể tấn công tới 8 điểm cùng lúc nên rất giỏi **bắt đôi** – tấn công hai mục tiêu một lúc. Đáng sợ nhất là khi một trong hai mục tiêu là **Tướng**: đối phương buộc phải lo thoát chiếu và đành bỏ mặc quân còn lại.

Ở ví dụ dưới, Xe Đen còn nằm ở góc i9. Mã Đỏ nhảy vào g8 vừa chiếu Tướng vừa nhắm thẳng vào Xe.`,
        diagram: {
          fen: '1nbak1b1r/4a4/1c7/p3p2Np/9/9/P3P3P/1C7/9/R1BAKAB2 w - - 0 1',
          moves: 'M2.3 Tg5-6 M3.1',
          notes: [
            'Mã h6 nhảy vào g8 (chân mã h7 trống): chiếu Tướng e9, đồng thời nhắm vào Xe i9.',
            'Đen không có quân nào cản được chân mã f8 hay ăn được Mã; d9 có Sĩ, e8 có Sĩ, nên Tướng buộc phải sang f9.',
            'Mã ăn Xe ở i9. Chỉ bằng một nước nhảy, Đỏ lời trọn một Xe.',
          ],
          caption: 'Đỏ đi. Mã chiếu Tướng và bắt Xe cùng lúc.',
        },
      },
    ],
    keyTakeaways: [
      'Tượng đi chéo đúng 2 bước (chữ điền), chỉ có 7 điểm đứng và không qua sông.',
      'Mắt tượng có quân thì Tượng không đi được hướng đó.',
      'Mã đi chữ nhật: một bước thẳng rồi một bước chéo; tối đa 8 nước.',
      'Chân mã có quân thì Mã bị cản – mỗi chân mã chặn hai hướng.',
      'Mã A ăn được Mã B chưa chắc Mã B ăn được Mã A: luôn kiểm tra chân mã của cả hai.',
    ],
  },

  // ───────────────────────── 5. Xe và Pháo ─────────────────────────
  {
    id: 'xq-nm-xe-va-phao',
    category: 'nhap-mon',
    title: 'Cách đi của quân (phần 3): Xe và Pháo',
    subtitle: 'Quân mạnh nhất bàn cờ và quân “nhảy ngòi” độc đáo',
    level: 1,
    icon: '🎯',
    minutes: 14,
    intro: `Xe là quân mạnh nhất cờ tướng – sách cờ Trung Quốc có câu “**一車十子寒**” (nhất xa thập tử hàn): một con Xe khiến mười quân đối phương phải dè chừng. Pháo đi giống Xe nhưng ăn quân theo một cách không giống bất kỳ quân cờ nào khác: phải **nhảy qua đúng một quân**. Bài này giúp em sử dụng thành thạo cả hai.`,
    sections: [
      {
        heading: 'Xe: đi thẳng bao xa cũng được',
        body: `**Xe** đi theo **đường thẳng** – dọc theo lộ hoặc ngang theo hàng – **bao nhiêu bước cũng được**, miễn là đường đi không bị chặn.

- Trên bàn cờ trống, Xe luôn kiểm soát **17 giao điểm** (9 điểm trên lộ và 8 điểm trên hàng), dù đứng ở đâu.
- Xe **không nhảy qua** quân khác.
- Xe ăn quân theo đúng cách đi: quân đối phương đầu tiên trên đường thẳng.

Vì quá mạnh (khoảng **9 điểm**, bằng hai Pháo), Xe là quân phải được đưa ra trận sớm nhất. Em sẽ còn nghe lại câu này ở bài 10.`,
        diagram: {
          fen: '3aka3/9/9/4p4/9/2R6/4P4/9/9/3AKA3 w - - 0 1',
          arrows: ['c4c9', 'c4c0', 'c4a4', 'c4i4'],
          caption: 'Xe ở c4 khống chế toàn bộ lộ c và hàng 4: tổng cộng 17 giao điểm.',
        },
      },
      {
        heading: 'Xe ăn quân và bị chặn',
        body: `Quân **cùng màu** chặn đường Xe: Xe không thể đi đến hoặc vượt qua quân của mình. Quân **khác màu** cũng chặn đường, nhưng Xe có thể ăn quân đó.

Ở thế cờ dưới, Xe Đỏ ở d5 nhìn sang trái thấy Mã Đen ở a5 – không có gì cản đường, Xe ăn được. Nhìn sang phải, Tốt g5 của chính Đỏ chắn lối nên Xe chỉ đi được tới f5.`,
        diagram: {
          fen: '4ka3/4a4/9/4p4/n2R2P2/9/4P4/9/9/3AKA3 w - - 0 1',
          moves: 'X6-9',
          notes: ['Xe bình sang lộ 9, ăn Mã a5. Mã Đen không có quân nào bảo vệ nên Đỏ lời trọn một Mã.'],
          arrows: ['d5a5:red'],
          highlights: ['a5:red', 'g5'],
          caption: 'Xe ăn được Mã a5 (quân đối phương) nhưng không vượt qua được Tốt g5 (quân mình).',
        },
      },
      {
        heading: 'Pháo: đi như Xe, ăn phải có “ngòi”',
        body: `**Pháo** có hai cách hành động khác nhau:

- **Khi đi (không ăn quân)**: giống hệt Xe – đi thẳng bao nhiêu bước cũng được, không nhảy qua quân nào.
- **Khi ăn quân**: Pháo phải **nhảy qua đúng một quân** (của bất kỳ bên nào) rồi ăn quân đối phương **đầu tiên** phía sau quân đó. Quân bị nhảy qua gọi là **ngòi** (hay “bệ pháo”).

Vì thế Pháo **không ăn được** quân đứng ngay trước mặt mà không có ngòi, và cũng không ăn được nếu giữa hai bên có **hai quân trở lên**.

Ở thế cờ dưới, Pháo c4 có thể ăn Tượng c9 (ngòi là Tốt Đen c6) và ăn Xe g4 (ngòi là Mã Đen e4). Nhưng Pháo **không** ăn được Tốt c6 hay Mã e4, vì giữa chúng và Pháo không có ngòi.`,
        warning: 'Lỗi kinh điển của người mới: nghĩ rằng quân của mình “an toàn” vì đứng sau một quân khác. Với Pháo của đối phương, chính quân đứng chắn đó lại là ngòi!',
        diagram: {
          fen: '2baka3/9/9/p1p6/9/2C1n1r2/P3P4/9/4A4/5K3 w - - 0 1',
          moves: 'P7-3',
          notes: ['Pháo bình sang lộ 3, nhảy qua Mã e4 (ngòi) để ăn Xe g4. Đổi lại Đỏ không mất gì – một đòn lời cả Xe.'],
          arrows: ['c4c9:green', 'c4g4:green'],
          highlights: ['c6:yellow', 'e4:yellow', 'c9:red', 'g4:red'],
          caption: 'Vàng: hai ngòi pháo. Đỏ: hai quân Pháo ăn được. Pháo không ăn được chính các quân làm ngòi.',
        },
      },
      {
        heading: 'Pháo chiếu tướng – và cách chống đỡ',
        body: `Pháo chiếu Tướng khi giữa Pháo và Tướng có **đúng một quân**. Ngoài các cách thông thường (chạy Tướng, ăn quân chiếu), cờ tướng có hai cách chống chiếu Pháo rất riêng:

- **Thêm ngòi**: đưa thêm một quân vào giữa, để giữa Pháo và Tướng có **hai quân** – Pháo hết chiếu.
- **Rút ngòi**: nếu ngòi là quân của mình, cho nó rời khỏi đường chiếu.

Ở ví dụ dưới, Pháo Đỏ lên “tuần hà” rồi bình vào giữa, dùng chính Tốt e6 của Đen làm ngòi. Tốt e6 chưa qua sông nên không thể đi ngang để rút ngòi; Đen phải thêm ngòi.`,
        diagram: {
          moves: 'P8.2 B3.1 P8-5 T3.5',
          notes: [
            'Pháo lộ 8 tấn 2 bước lên b4 – vị trí “tuần hà” (tuần tra bờ sông), sẵn sàng đi ngang sang bất kỳ lộ nào.',
            'Đen đẩy Tốt c6 lên c5 mà không để ý đến lộ giữa.',
            'Pháo bình vào lộ 5 (e4): chiếu! Giữa Pháo e4 và Tướng e9 chỉ có đúng một quân là Tốt e6 – Tốt Đen trở thành ngòi cho Pháo Đỏ.',
            'Đen lên Tượng e7 để thêm ngòi: giờ giữa Pháo và Tướng có hai quân, hết chiếu. Đen cũng có thể lên Sĩ e8, hoặc đưa một Pháo về e7. Từ đây, Tượng e7 không được rời lộ giữa nữa, vì nếu nó đi, Pháo sẽ lại chiếu.',
          ],
          caption: 'Pháo chiếu nhờ ngòi là Tốt Đen; Đen chống bằng cách thêm ngòi.',
        },
      },
      {
        heading: 'Ngay từ thế ban đầu, Pháo đã nhắm vào Mã',
        body: `Hãy nhìn lại thế cờ ban đầu: Pháo Đỏ ở h2, phía trước là Pháo Đen h7 (một ngòi), rồi đến Mã Đen h9. Như vậy **ngay nước đầu tiên**, Pháo Đỏ đã có thể nhảy qua ngòi để ăn Mã! Đen cũng vậy với Mã Đỏ.

Đòn này không thắng được gì vì Xe đứng cạnh sẽ ăn lại Pháo (Pháo đổi Mã). Nhưng nó cho em thấy một thói quen quan trọng: **luôn quét dọc các lộ có Pháo** của đối phương xem có quân nào của mình đang đứng sau một ngòi mà không được bảo vệ hay không.`,
        tip: 'Mã ở góc chỉ được Xe bảo vệ. Khi em đưa Xe đi chỗ khác mà Mã vẫn còn ở hàng cuối, hãy kiểm tra ngay xem Pháo đối phương có ăn được Mã không.',
        diagram: {
          moves: 'P2.7 X9-8',
          notes: [
            'Pháo h2 tấn 7 bước, nhảy qua Pháo Đen h7 (ngòi) và ăn Mã h9.',
            'Xe i9 bình sang h9 ăn lại Pháo. Hai bên đổi Pháo lấy Mã. Bài 8 sẽ giải thích vì sao đổi như thế này không có lợi cho Đỏ.',
          ],
          arrows: ['h2h9:red', 'b7b0:red'],
          caption: 'Cả bốn Pháo ở thế ban đầu đều có ngòi để ăn Mã đối phương.',
        },
      },
    ],
    keyTakeaways: [
      'Xe đi thẳng bao xa cũng được, kiểm soát 17 giao điểm – quân mạnh nhất (≈ 9 điểm).',
      'Pháo đi như Xe, nhưng ăn quân phải nhảy qua đúng một ngòi.',
      'Pháo không ăn được quân không có ngòi, cũng không ăn được nếu có hai quân ở giữa.',
      'Chống Pháo chiếu: chạy Tướng, ăn Pháo, thêm ngòi hoặc rút ngòi.',
      'Luôn kiểm tra các lộ có Pháo đối phương: quân đứng chắn có thể chính là ngòi.',
    ],
  },

  // ───────────────────────── 6. Tốt ─────────────────────────
  {
    id: 'xq-nm-tot-binh',
    category: 'nhap-mon',
    title: 'Cách đi của quân (phần 4): Tốt',
    subtitle: 'Từng bước một, không bao giờ lùi – và càng tiến càng quý',
    level: 1,
    icon: '⚔️',
    minutes: 12,
    intro: `Tốt (bên Đỏ gọi là **Binh**) là quân nhỏ bé nhất, mỗi lần chỉ đi một bước và **không bao giờ lùi**. Nhưng một chú Tốt đã qua sông, áp sát cung tướng có thể trở thành kẻ kết liễu ván cờ. Dân gian có câu “**Tốt qua sông sánh ngang Xe**” (小卒過河頂大車) – dĩ nhiên là nói quá, nhưng cho thấy Tốt qua sông lợi hại đến mức nào.`,
    sections: [
      {
        heading: 'Tốt chưa qua sông: chỉ tiến thẳng',
        body: `Khi còn ở bên phần sân của mình, Tốt **chỉ có một cách đi**: **tiến thẳng một bước**. Không đi ngang, không lùi.

- Tốt ăn quân theo đúng cách đi: quân đối phương đứng ngay trước mặt.
- Năm Tốt đứng cách quãng nên lúc đầu ván chúng không bảo vệ được nhau.
- Đẩy Tốt còn có tác dụng **mở đường** cho các quân khác – nhất là “gỡ chân” cho Mã.

Trong ký hiệu, Tốt của cả hai bên đều viết là **B** (Binh): **B7.1** là Binh ở lộ 7 tiến một bước.`,
        diagram: {
          arrows: ['a3a4', 'c3c4', 'e3e4', 'g3g4', 'i3i4', 'c3d3:red'],
          caption: 'Mỗi Tốt Đỏ chỉ có đúng một nước: tiến lên một bước. Tốt chưa qua sông không được đi ngang (mũi tên đỏ).',
        },
      },
      {
        heading: 'Tốt qua sông: thêm đường đi ngang',
        body: `Khi đã **qua sông** (với Đỏ là từ hàng 5 trở lên), Tốt được đi thêm **sang ngang một bước**, trái hoặc phải. Như vậy Tốt qua sông có tối đa **3 nước**: tiến, sang trái, sang phải.

Nhờ đi ngang được, Tốt qua sông có thể **bắt đôi** – tấn công hai quân đứng hai bên cùng lúc. Ở ví dụ dưới, Đen đang hơn quân (Đen có thêm một Pháo, Đỏ chỉ có thêm một Tốt), nhưng chú Tốt e5 sẽ lấy lại vật chất.`,
        diagram: {
          fen: '2bakab2/9/9/p2n1c2p/4P4/9/P7P/2N6/4A4/2BK1AB2 w - - 0 1',
          moves: 'B5.1 M4/5 B5-4 M5.6',
          notes: [
            'Tốt tiến lên e6, cùng lúc dọa ăn ngang Mã d6 và Pháo f6: một đòn bắt đôi!',
            'Đen chỉ cứu được một quân. Mã lui về e8, từ đó vẫn bảo vệ được f6.',
            'Tốt bình sang f6 ăn Pháo (khoảng 4,5 điểm).',
            'Mã Đen ăn lại Tốt. Đỏ mất một Tốt qua sông (khoảng 2 điểm) nhưng đã ăn được Pháo – lấy lại thế cân bằng vật chất.',
          ],
          arrows: ['e5e6', 'e5d5', 'e5f5'],
          caption: 'Đỏ đi. Tốt qua sông ở e5 có ba hướng đi; tiến lên e6 sẽ bắt đôi Mã và Pháo.',
        },
      },
      {
        heading: 'Không bao giờ lùi – và “lão tốt”',
        body: `Dù đã qua sông, Tốt **vẫn không bao giờ được lùi**. Tốt cũng **không được phong cấp** như cờ vua: khi đến hàng cuối cùng của đối phương, nó vẫn là Tốt và chỉ còn đi ngang được.

Tốt đã xuống tới hàng cuối gọi là **lão tốt** (Tốt già). Lão tốt chỉ còn cách đi ngang dọc theo hàng đáy, ít khi gây nguy hiểm cho Tướng. Vì thế người chơi giỏi thường **không vội đẩy Tốt xuống đáy**, mà giữ nó ở hàng 7, hàng 8 (tính từ phía Đỏ) – sát cung tướng đối phương – nơi nó khống chế được nhiều điểm quan trọng nhất.`,
        warning: 'Đừng thấy Tốt qua sông là đẩy mãi! Một Tốt xuống đến hàng đáy thường mất gần hết sức mạnh. Tốt mạnh nhất khi đứng sát cung, ngay trên đầu Tướng đối phương.',
        diagram: {
          fen: '1Pbakab2/9/3P5/8p/9/9/P8/9/4A4/5K3 w - - 0 1',
          arrows: ['b9a9', 'b9c9', 'd7d8', 'd7c7', 'd7e7', 'd7d6:red'],
          highlights: ['b9:yellow', 'd7:green'],
          caption: 'Lão tốt b9 (vàng) chỉ đi ngang được. Tốt d7 (xanh lá) áp sát cung có ba hướng nhưng không được lùi (mũi tên đỏ).',
        },
      },
      {
        heading: 'Tốt áp sát cung: kẻ kết liễu',
        body: `Giá trị của Tốt **thay đổi theo vị trí**:

- Tốt chưa qua sông: khoảng **1 điểm**.
- Tốt đã qua sông: khoảng **2 điểm**.
- Tốt áp sát cung tướng đối phương, phối hợp được với quân khác: có khi quý hơn cả Mã, Pháo.
- Lão tốt ở hàng đáy: sức mạnh giảm hẳn.

Ở thế cờ dưới, Đen đang hơn hẳn về quân (Xe, Mã chống lại vài Tốt). Nhưng hai Tốt Đỏ đã áp sát cung, cùng với Tướng Đỏ khống chế lộ f, đủ để kết thúc ván cờ ngay lập tức.`,
        diagram: {
          fen: '2b1k1b2/3P5/4P4/8p/p8/9/P1n6/1r7/4A4/3A1K3 w - - 0 1',
          moves: 'B5.1',
          notes: [
            'Tốt e7 tiến lên e8 chiếu Tướng. Tướng không ăn được Tốt vì Tốt e8 được Tốt d8 bảo vệ (Tốt qua sông ăn ngang). Tướng không sang d9 (Tốt d8 khống chế), không sang f9 (đối mặt Tướng Đỏ f0 trên lộ trống). Chiếu bí!',
          ],
          highlights: ['d8:green', 'e7:green'],
          caption: 'Đỏ đi và chiếu bí trong 1 nước chỉ bằng hai Tốt và Tướng.',
        },
      },
      {
        heading: 'Tốt trong khai cuộc: “Tiên nhân chỉ lộ”',
        body: `Tốt không chỉ mạnh ở tàn cuộc. Nước **B7.1** (hoặc B3.1) – đẩy Tốt lộ 7 lên một bước – là một trong những nước mở đầu lâu đời nhất, có cái tên rất đẹp: **Tiên nhân chỉ lộ** (“tiên ông chỉ đường”).

Nước Tốt này mở đường cho Mã lộ 8 sau này nhảy ra không bị cản chân, đồng thời thăm dò ý đồ của đối phương trước khi quyết định đặt Pháo, Mã ở đâu. Một cách đáp nổi tiếng của Đen là **Tốt để pháo**: đưa Pháo đến đúng lộ có Tốt vừa tiến để nhắm vào nó.`,
        diagram: {
          moves: 'B7.1 P2-3 T3.5',
          notes: [
            'Tiên nhân chỉ lộ: Binh lộ 7 tiến lên c4. Từ nay Mã b0 ra c2 sẽ không bị Tốt c3 cản chân khi muốn nhảy tiếp.',
            'Tốt để pháo: Pháo Đen bình sang lộ 3 (c7), dùng Tốt c6 của mình làm ngòi để nhắm vào Tốt c4 của Đỏ.',
            'Đỏ lên Tượng e2: từ e2, Tượng bảo vệ Tốt c4 (mắt tượng d3 trống). Nếu Pháo Đen ăn Tốt, Tượng sẽ ăn lại Pháo.',
          ],
          caption: 'Tiên nhân chỉ lộ đối Tốt để pháo.',
        },
      },
    ],
    keyTakeaways: [
      'Tốt chưa qua sông chỉ tiến thẳng một bước.',
      'Tốt qua sông được đi thêm sang ngang; có thể bắt đôi hai quân đứng cạnh nhau.',
      'Tốt không bao giờ lùi và không phong cấp; lão tốt ở hàng đáy chỉ đi ngang.',
      'Giá trị Tốt tăng khi qua sông (≈ 2 điểm) và khi áp sát cung tướng.',
      'Tiên nhân chỉ lộ (B7.1) là nước mở đầu bằng Tốt kinh điển.',
    ],
  },

  // ───────────────────────── 7. Thắng, thua và hòa ─────────────────────────
  {
    id: 'xq-nm-thang-thua-hoa',
    category: 'nhap-mon',
    title: 'Thắng, thua và hòa',
    subtitle: 'Chiếu bí, khốn bí, luật cấm chiếu dai và các trường hợp hòa',
    level: 1,
    icon: '🏁',
    minutes: 14,
    intro: `Mục tiêu của cờ tướng là **bắt Tướng** đối phương – chính xác hơn là đưa Tướng đối phương vào thế không thể thoát. Nhưng cờ tướng có vài luật rất khác cờ vua: **hết nước đi là thua** chứ không hòa, và **chiếu mãi không được tính là hòa**. Nắm vững những luật này, em sẽ không bao giờ bị bất ngờ khi ván cờ kết thúc.`,
    sections: [
      {
        heading: 'Chiếu và các cách thoát chiếu',
        body: `Khi một quân tấn công Tướng, ta nói Tướng bị **chiếu**. Bên bị chiếu **bắt buộc** phải thoát chiếu ngay ở nước tiếp theo:

- **Ăn** quân đang chiếu.
- **Chạy Tướng** sang điểm an toàn trong cung.
- **Chặn** đường chiếu (với Xe, Pháo).

Cờ tướng còn có những cách thoát chiếu riêng:
- Bị **Mã** chiếu: đặt một quân vào **chân mã** – gọi là **cản chân mã**.
- Bị **Pháo** chiếu: **thêm ngòi** hoặc **rút ngòi** (em đã học ở bài 5).

Ở ví dụ dưới, Mã Đỏ nhảy vào e7 chiếu Tướng f9. Đen có bốn cách chống; cách gọn nhất là đưa Sĩ về e8 – đúng chân mã.`,
        diagram: {
          fen: '3a1k3/9/b4a2b/2N6/6P2/9/9/9/9/2BAK4 w - - 0 1',
          moves: 'M7.5 S6/5',
          notes: [
            'Mã c6 nhảy vào e7 chiếu Tướng f9 (chân mã e8 đang trống).',
            'Sĩ f7 lui về e8, chặn đúng chân mã: Mã e7 không còn chiếu được nữa. Đen cũng có thể lên Sĩ d9 vào e8, hoặc chạy Tướng sang e9, f8.',
          ],
          highlights: ['e8:yellow'],
          caption: 'Đỏ đi. Điểm vàng e8 là chân mã – nơi Đen có thể cản.',
        },
      },
      {
        heading: 'Chiếu bí: chiến thắng trọn vẹn',
        body: `**Chiếu bí** (chiếu hết) xảy ra khi Tướng bị chiếu và **không còn cách nào thoát**: không ăn được quân chiếu, không chặn hay cản được, Tướng không còn điểm nào an toàn để chạy. Ván cờ kết thúc ngay, bên chiếu bí thắng.

Ở thế cờ dưới, Đen còn đủ Sĩ Tượng, lại có Xe và Mã đang lăm le tấn công. Nhưng Xe và Mã của Đỏ phối hợp chiếu bí chỉ trong một nước.`,
        diagram: {
          fen: '2bakab2/9/6N2/4p4/5R3/9/2n1P4/r8/9/3AKA3 w - - 0 1',
          moves: 'X4.4',
          notes: [
            'Xe f5 tấn 4 bước lên f9, ăn Sĩ và chiếu Tướng. Tướng không ăn được Xe vì Xe được Mã g7 bảo vệ; Tướng lên e8 thì bị chính Mã g7 khống chế; Sĩ d9 và hai Tượng không giúp được gì. Chiếu bí!',
          ],
          arrows: ['f5f9:red', 'g7f9:green', 'g7e8:green'],
          caption: 'Đỏ đi và chiếu bí trong 1 nước: Xe chiếu, Mã giữ.',
        },
      },
      {
        heading: 'Khốn bí: hết nước đi là thua!',
        body: `Đây là điểm khác biệt lớn so với cờ vua. Nếu đến lượt một bên mà bên đó **không còn nước đi hợp lệ nào** – dù Tướng **không bị chiếu** – thì bên đó **thua**. Thế cờ này gọi là **khốn bí** (hay “hết nước”).

Trong cờ vua, tình huống tương tự (hòa pat) là hòa. Trong cờ tướng thì không: **hết đường đi là thua**. Vì vậy bên đang thắng không cần lo “nhốt Tướng mà không chiếu” – ngược lại, đôi khi nhốt Tướng lại chính là cách thắng nhanh nhất.`,
        tip: 'Khi tấn công bằng ít quân, hãy nhớ: không nhất thiết phải chiếu. Chỉ cần lấy hết đường đi của đối phương là đủ thắng.',
        diagram: {
          fen: '4k4/9/3P5/9/9/9/9/9/4A4/5K3 w - - 0 1',
          moves: 'B6.1',
          notes: [
            'Tốt tiến xuống d8. Tướng Đen không bị chiếu, nhưng: d9 và e8 bị Tốt d8 khống chế, f9 thì đối mặt Tướng Đỏ f0. Đen không còn nước nào – khốn bí, Đỏ thắng!',
          ],
          highlights: ['d9:red', 'e8:red', 'f9:red'],
          caption: 'Đỏ đi và thắng ngay mà không cần chiếu.',
        },
      },
      {
        heading: 'Luật cấm chiếu dai',
        body: `Trong cờ vua, bên yếu thế có thể cứu ván bằng cách chiếu liên tục để hòa. Cờ tướng **cấm** điều này: một bên **không được chiếu mãi** để ép thế cờ lặp lại.

Trong ứng dụng của chúng ta, luật được áp dụng như sau: khi một thế cờ **lặp lại lần thứ ba**, nếu trong vòng lặp đó **một bên chiếu ở mọi nước** còn bên kia thì không, bên chiếu dai bị **xử thua**. Bên chiếu dai buộc phải **đổi nước** trước khi thế cờ lặp lại lần thứ ba.

Ở ví dụ dưới, Đỏ đang bị dọa chiếu bí (Xe h3 sẵn sàng sang f3 hoặc xuống h0). Đỏ cố cứu bằng cách chiếu liên tục.`,
        warning: 'Đừng hy vọng chiếu mãi để hòa như cờ vua! Khi tính chiếu liên tục, hãy chắc chắn chuỗi chiếu đó dẫn tới chiếu bí hoặc lấy được quân, nếu không em sẽ phải đổi nước – có khi là thua.',
        diagram: {
          fen: '4k4/9/9/9/9/3R5/7r1/9/4p4/5K3 w - - 0 1',
          moves: 'X6-5 Tg5-4 X5-6 Tg4-5 X6-5 Tg5-4 X5-6 Tg4-5',
          notes: [
            'Xe chiếu theo lộ giữa. Tướng Đen không lên e8 được (vẫn trên đường Xe), không sang f9 (đối mặt Tướng Đỏ f0) – chỉ còn đường sang d9.',
            'Tướng sang d9 – nước duy nhất.',
            'Xe đuổi theo, chiếu tiếp trên lộ d.',
            'Tướng trở về e9 – lại là nước duy nhất. Thế cờ đã lặp lại lần thứ hai.',
            'Đỏ tiếp tục chiếu…',
            '…Tướng Đen lại sang d9.',
            'Đỏ vẫn chiếu. Nếu Đỏ thôi chiếu, Đen sẽ đi X8-6 hoặc X8.3 chiếu bí ngay.',
            'Tướng về e9: thế cờ lặp lại lần thứ ba, và Đỏ đã chiếu ở mọi nước trong vòng lặp. Đỏ chiếu dai – Đỏ bị xử thua!',
          ],
          caption: 'Đỏ đi. Chuỗi chiếu liên tục không cứu được Đỏ: chiếu dai bị xử thua.',
        },
      },
      {
        heading: 'Khi nào ván cờ hòa?',
        body: `Theo luật của ứng dụng, ván cờ tướng kết thúc **hòa** trong các trường hợp sau:

- **Lặp lại ba lần** mà không bên nào chiếu dai (ví dụ hai bên cùng đi qua đi lại vô hại, hoặc cả hai bên cùng chiếu nhau liên tục).
- **60 nước** liên tiếp của mỗi bên (120 nửa nước) mà **không có quân nào bị ăn**.
- **Không bên nào còn quân tấn công**: cả hai bên đều không còn Xe, Mã, Pháo, Tốt. Tướng, Sĩ, Tượng không qua được sông nên không thể bắt Tướng đối phương.
Ngoài ra, hai người chơi luôn có thể **thỏa thuận hòa**. Trong các giải đấu chính thức còn có những luật chi tiết hơn, ví dụ **cấm đuổi bắt dai** một quân không được bảo vệ. Khi mới học, em chỉ cần nhớ: muốn thoát khỏi vòng lặp, bên vi phạm luật phải đổi nước.`,
        diagram: {
          fen: '2bak1b2/4a4/9/9/9/9/9/9/4A4/2B1KAB2 w - - 0 1',
          caption: 'Hai bên chỉ còn Tướng, Sĩ, Tượng – không ai có quân tấn công được: ván cờ hòa.',
        },
      },
    ],
    keyTakeaways: [
      'Bị chiếu phải thoát ngay: ăn quân chiếu, chạy Tướng, chặn, cản chân mã, thêm hoặc rút ngòi pháo.',
      'Chiếu bí: bị chiếu mà không thoát được – thua.',
      'Khốn bí: không bị chiếu nhưng hết nước đi – cũng thua (khác cờ vua).',
      'Cấm chiếu dai: bên chiếu liên tục khiến thế cờ lặp lại lần thứ ba bị xử thua.',
      'Hòa khi lặp lại không ai vi phạm, 60 nước không ăn quân, hoặc không còn quân tấn công.',
    ],
  },

  // ───────────────────────── 8. Giá trị quân và đổi quân ─────────────────────────
  {
    id: 'xq-nm-gia-tri-quan',
    category: 'nhap-mon',
    title: 'Giá trị quân cờ và nghệ thuật đổi quân',
    subtitle: 'Biết “đếm điểm” để không bao giờ đổi quân thiệt',
    level: 2,
    icon: '⚖️',
    minutes: 14,
    intro: `Mỗi quân cờ có sức mạnh khác nhau. Các kỳ thủ dùng một bảng điểm đơn giản để quyết định khi nào nên đổi quân, khi nào không. Thuộc bảng này, biết sức mạnh của Pháo và Mã thay đổi thế nào theo từng giai đoạn, và tập thói quen **đếm quân tấn công – bảo vệ** trước khi ăn, em sẽ tránh được phần lớn những lần mất quân oan uổng.`,
    sections: [
      {
        heading: 'Bảng giá trị quân cờ',
        body: `Giá trị tương đối được dùng phổ biến (tính theo “điểm”, Tốt chưa qua sông = 1):

- **Xe ≈ 9 điểm** – quân mạnh nhất.
- **Pháo ≈ 4,5 điểm**.
- **Mã ≈ 4 điểm**.
- **Sĩ ≈ 2 điểm**, **Tượng ≈ 2 điểm** – quân phòng thủ.
- **Tốt = 1 điểm** khi chưa qua sông, **≈ 2 điểm** khi đã qua sông.
- **Tướng**: vô giá – mất Tướng là thua.

Từ bảng này: một Xe gần bằng **Pháo + Mã**; đổi Xe lấy Mã hay Pháo là **thiệt nặng**; Pháo và Mã gần ngang nhau, nên đổi Pháo lấy Mã thường được xem là ngang giá – nhưng chưa chắc đã ngang tùy giai đoạn ván cờ.`,
        tip: 'Đây là “giá tham khảo”, không phải luật. Một Mã ở vị trí đẹp sát cung đối phương có thể quý hơn một Xe bị nhốt. Nhưng khi chưa chắc, hãy tin vào bảng điểm.',
        diagram: {
          highlights: ['a0:red', 'i0:red', 'b2:blue', 'h2:blue', 'b0:green', 'h0:green', 'c0:yellow', 'g0:yellow', 'd0:yellow', 'f0:yellow'],
          caption: 'Đỏ: Xe (9). Xanh dương: Pháo (4,5). Xanh lá: Mã (4). Vàng: Sĩ, Tượng (2). Tốt: 1 điểm, qua sông khoảng 2.',
        },
      },
      {
        heading: 'Pháo mạnh ở khai cuộc, Mã mạnh ở tàn cuộc',
        body: `Pháo và Mã có giá trị gần nhau, nhưng sức mạnh của chúng **thay đổi ngược chiều** theo diễn biến ván cờ:

- **Khai cuộc và trung cuộc**: bàn cờ đầy quân nên Pháo luôn **có ngòi** để ăn quân, chiếu Tướng. Còn Mã thì hay bị **cản chân**. Lúc này **Pháo nhỉnh hơn Mã**.
- **Tàn cuộc**: bàn cờ thưa quân, Pháo khó tìm ngòi; trong khi Mã **ít bị cản chân**, tung hoành khắp nơi. Lúc này **Mã nhỉnh hơn Pháo**.

Ví dụ dưới là một tàn cuộc: Mã Đỏ nhảy một nước vừa chiếu Tướng vừa bắt Pháo. Còn Pháo Đen thì không có ngòi nào để đe dọa Tướng Đỏ.`,
        diagram: {
          fen: '4k4/9/9/2P4cp/6N2/p8/9/9/4A4/3K5 w - - 0 1',
          moves: 'M3.4 Tg5.1 M4/2',
          notes: [
            'Mã g5 nhảy lên f7 (chân mã g6 trống): chiếu Tướng e9 và đồng thời nhắm vào Pháo h6.',
            'Tướng phải chạy (sang d9 sẽ đối mặt Tướng Đỏ d0, nên chỉ còn e8 hoặc f9).',
            'Mã lui về h6 ăn Pháo. Tàn cuộc thưa quân là sân khấu của Mã.',
          ],
          caption: 'Đỏ đi. Trong tàn cuộc, Mã linh hoạt hơn hẳn Pháo.',
        },
      },
      {
        heading: 'Đổi Pháo lấy Mã ngay đầu ván: có nên không?',
        body: `Em đã biết ở bài 5: ngay nước đầu tiên, Pháo có thể nhảy qua ngòi ăn Mã. Nhưng có nên làm thế không? Hãy cùng “đếm”:

- Về điểm số: Đỏ đưa **Pháo (4,5)** đổi lấy **Mã (4)** – thiệt nửa điểm. Đầu ván, khi Pháo đang mạnh, khoản thiệt này còn lớn hơn.
- Về thời gian: Xe Đen ăn lại Pháo và **ra trận ngay**, không mất thêm nước nào.

Máy phân tích của ứng dụng đánh giá thế cờ sau hai nước này **nghiêng về Đen** khoảng một Tốt. Bài học: một cuộc đổi quân “trông có vẻ ngang” vẫn có thể thiệt nếu nó giúp đối phương phát triển nhanh hơn.`,
        diagram: {
          moves: 'P8.7 X1-2',
          notes: [
            'Pháo b2 tấn 7, nhảy qua Pháo Đen b7 (ngòi) ăn Mã b9.',
            'Xe a9 bình sang b9 ăn lại Pháo. Đỏ mất Pháo (4,5), Đen mất Mã (4), và Xe Đen đã ra trận – Đen được lợi cả vật chất lẫn thời gian.',
          ],
          caption: 'Pháo đổi Mã ngay nước đầu: Đỏ thiệt chút vật chất, Đen được ra Xe.',
        },
      },
      {
        heading: 'Đếm quân trước khi ăn: Xe ăn Pháo, mất Xe',
        body: `Trước khi ăn một quân, hãy tự hỏi: **quân đó có được bảo vệ không? Nếu ăn, mình mất gì?**

- Nếu quân đối phương **không được bảo vệ** (quân treo): cứ ăn – đó là quân miễn phí.
- Nếu quân đó **được bảo vệ**: chỉ ăn khi quân của mình **rẻ hơn hoặc ngang giá** quân bị ăn.
- Luôn bắt đầu bằng **quân rẻ nhất** khi có nhiều quân cùng tấn công một mục tiêu.

Ở thế cờ dưới, Pháo Đen ở b5 trông có vẻ “dễ ăn”. Nhưng nó được Mã c7 bảo vệ – Xe (9 điểm) ăn Pháo (4,5 điểm) rồi bị Mã ăn lại là một cuộc đổi quân thiệt nặng.`,
        warning: 'Xe là quân quý nhất. Đừng bao giờ dùng Xe ăn một quân được bảo vệ, trừ khi em đã tính chắc một đòn chiếu bí hoặc lấy lại nhiều hơn.',
        diagram: {
          fen: 'r1bakab1r/9/2n3nc1/p3p1p1p/1cp6/9/P1P1P1P1P/2N1C1NC1/1R7/2BAKAB1R w - - 0 1',
          moves: 'X8.4 M3.2',
          notes: [
            'Xe b1 tấn 4 bước lên b5 ăn Pháo – một nước tham lam.',
            'Mã c7 ăn lại Xe (chân mã c6 trống). Đỏ được 4,5 điểm nhưng mất 9 điểm: thiệt khoảng 4,5 điểm, tương đương mất trắng một Pháo.',
          ],
          arrows: ['c7b5:red'],
          caption: 'Đỏ đi. Pháo b5 được Mã c7 bảo vệ – đừng dùng Xe ăn nó!',
        },
      },
      {
        heading: 'Đang hơn quân: hãy đổi quân!',
        body: `Một nguyên tắc vàng: **khi hơn quân, hãy chủ động đổi quân; khi kém quân, hãy tránh đổi quân.**

Lý do: hơn một Mã khi hai bên còn đầy quân thì lợi thế chưa rõ ràng, đối phương vẫn còn đủ lực để phản công. Nhưng khi các quân mạnh đã được đổi hết, chỉ còn Mã của em chống lại vài Tốt – chiến thắng trở nên đơn giản.

Ngược lại, bên kém quân nên giữ nhiều quân trên bàn để còn cơ hội gây rối và tìm đòn phản kích.`,
        diagram: {
          fen: '2b1kab2/4a4/3r5/p3p3p/6N2/2P6/4P3P/3R5/9/2BAKAB2 w - - 0 1',
          moves: 'X6.5 S5.4',
          notes: [
            'Đỏ đang hơn một Mã. Xe d2 tấn 5 bước ăn Xe d7 – chủ động đổi Xe.',
            'Sĩ e8 ăn lại Xe. Mỗi bên mất một Xe, nhưng giờ Đen chỉ còn Sĩ, Tượng và ba Tốt chưa qua sông, còn Đỏ có thêm một con Mã: thế thắng rất rõ ràng.',
          ],
          caption: 'Đỏ đi. Hơn quân thì đổi quân để đơn giản hóa thế cờ.',
        },
      },
      {
        heading: 'Những ngoại lệ quan trọng',
        body: `Bảng điểm chỉ là kim chỉ nam. Khi quyết định đổi quân, các kỳ thủ còn xét thêm:

- **Hoạt động của quân**: một Xe đã ra trận, chiếm lộ mở, quý hơn nhiều một Xe còn nằm ở góc.
- **Sĩ, Tượng** càng quý khi đối phương còn nhiều quân tấn công; khi đối phương chỉ còn ít quân, Sĩ Tượng bớt quan trọng.
- **Tốt qua sông** đã áp sát cung tướng có thể đáng giá như một quân lớn.
- **An toàn của Tướng**: thí một quân để phá tan Sĩ Tượng đối phương thường rất đáng.
- **Thời gian (nhịp đi)**: ăn một Tốt mà để đối phương phát triển thêm vài quân là cái giá đắt.`,
        tip: 'Khi phân vân giữa “ăn quân” và “ra quân, tấn công”, hãy hỏi: nếu mình ăn, đối phương được thêm bao nhiêu nước miễn phí?',
      },
    ],
    keyTakeaways: [
      'Xe ≈ 9, Pháo ≈ 4,5, Mã ≈ 4, Sĩ/Tượng ≈ 2, Tốt 1 (qua sông ≈ 2).',
      'Pháo mạnh ở khai cuộc (nhiều ngòi), Mã mạnh ở tàn cuộc (ít bị cản chân).',
      'Đếm quân tấn công và bảo vệ trước khi ăn; không dùng Xe ăn quân được bảo vệ.',
      'Hơn quân thì đổi quân; kém quân thì tránh đổi.',
      'Một cuộc đổi “ngang giá” vẫn có thể thiệt nếu đối phương được thêm nhịp phát triển.',
    ],
  },

  // ───────────────────────── 9. Những thế sát cục đầu tiên ─────────────────────────
  {
    id: 'xq-nm-sat-cuc-co-ban',
    category: 'nhap-mon',
    title: 'Những thế sát cục đầu tiên',
    subtitle: 'Song xe, Pháo trùng, Mã hậu pháo, Ngọa tào mã và lộ mặt tướng',
    level: 2,
    icon: '🗡️',
    minutes: 18,
    intro: `**Sát cục** là những thế chiếu bí điển hình mà kỳ thủ nào cũng phải thuộc lòng. Giống như những “công thức” trong toán học, khi đã nhận ra hình dạng của một thế sát cục, em sẽ thấy ngay nước thắng thay vì phải tính toán mò mẫm. Bài này giới thiệu năm thế sát cục căn bản nhất; mỗi ví dụ đều là một đòn thắng bắt buộc, em hãy tự tìm nước đi trước khi bấm ▶.`,
    sections: [
      {
        heading: 'Song xe: hai Xe thay nhau chiếu',
        body: `Hai Xe phối hợp là bộ đôi tấn công mạnh nhất. Cách thắng điển hình gọi là **Song xe** (Song xa thác): một Xe **chiếu ở hàng đáy**, đẩy Tướng lên; Xe kia **chiếu ở hàng kế tiếp**, trong khi Xe thứ nhất vẫn khóa hàng đáy.

Ở ví dụ dưới, Tượng e7 của Đen còn bị Tướng Đỏ “ghim” trên lộ giữa (bài 3), nên không thể chạy ra cản đường Xe.`,
        tip: 'Mẫu hình cần nhớ: “một Xe khóa hàng, một Xe chiếu hàng bên cạnh”. Tướng bị kẹp giữa hai hàng ngang thì không còn đường thoát.',
        diagram: {
          fen: '2b1k4/9/4b4/1R7/p6R1/9/2n6/3p5/r8/3AKA3 w - - 0 1',
          moves: 'X2.4 Tg5.1 X8.2',
          notes: [
            'Xe h5 tấn 4 bước xuống đáy h9, chiếu Tướng theo hàng ngang. Tượng e7 không được lui về g9 để cản, vì nó là quân duy nhất ngăn giữa hai Tướng.',
            'Tướng Đen buộc phải lên e8 – đó là nước đi duy nhất.',
            'Xe b6 tấn 2 bước lên b8, chiếu theo hàng 8. Tướng không lùi về e9 (Xe h9 khóa hàng đáy), không sang d8, f8 (Xe b8), phía trước là Tượng của chính mình. Chiếu bí!',
          ],
          caption: 'Đỏ đi và chiếu bí trong 2 nước.',
        },
      },
      {
        heading: 'Pháo trùng: hai Pháo trên cùng một lộ',
        body: `Khi hai Pháo đứng **cùng một lộ** với Tướng đối phương, Pháo trước làm **ngòi** cho Pháo sau chiếu Tướng. Thế này gọi là **Pháo trùng** (Trùng pháo).

Pháo trùng đặc biệt nguy hiểm khi hai bên Tướng bị **chính hai Sĩ** chắn lối. Đối phương cũng **không thể chặn**: đặt một quân vào giữa Pháo trước và Tướng thì Pháo sau hết chiếu, nhưng Pháo trước lại có ngòi để chiếu!

Ở ví dụ dưới, Pháo e5 đã trấn giữa. Xe Đỏ chỉ cần dọn đường cho Pháo a2.`,
        diagram: {
          fen: '2baka3/9/b8/9/4C4/9/9/C1R6/9/3AKA3 w - - 0 1',
          moves: 'X7.6 T1.3 P9-5',
          notes: [
            'Xe c2 tấn 6 bước lên c8: vừa dọn đường cho Pháo a2 đi ngang, vừa khóa hàng 8 để Tướng Đen không lên e8 được.',
            'Đen chỉ còn đúng một nước: Tượng a7 lên c5. Sĩ hay Tượng nào bước vào lộ giữa đều trở thành ngòi cho Pháo e5 – tự để Tướng bị chiếu, nên không được phép.',
            'Pháo a2 bình vào e2, đứng sau Pháo e5: Pháo trùng! Pháo sau chiếu qua ngòi là Pháo trước. Hai bên Tướng là Sĩ, phía trước là đường chiếu – chiếu bí!',
          ],
          caption: 'Đỏ đi và chiếu bí trong 2 nước.',
        },
      },
      {
        heading: 'Mã hậu pháo: Mã đứng trước, Pháo đứng sau',
        body: `**Mã hậu pháo** là thế sát cục nổi tiếng nhất cờ tướng: **Mã** đứng trên cùng lộ với Tướng đối phương, cách Tướng một điểm; **Pháo** đứng phía sau Mã trên cùng lộ đó.

- Pháo chiếu Tướng, dùng Mã làm ngòi.
- Mã khống chế hai điểm hai bên Tướng.
- Tướng tiến lên thì vẫn nằm trên đường chiếu của Pháo.

Ở ví dụ dưới, Đen đang hơn quân và Sĩ đã mất hết. Đỏ chỉ cần một nước Mã.`,
        diagram: {
          fen: '4k4/9/b7b/2p3N2/6p2/2P6/9/4C2n1/1r7/3AKA3 w - - 0 1',
          moves: 'M3.5',
          notes: [
            'Mã g6 nhảy vào e7: Pháo e2 chiếu Tướng qua ngòi là Mã. Mã e7 khống chế d9 và f9; lên e8 thì vẫn bị Pháo chiếu. Đen không có quân nào ăn được Mã hay chen vào giữa Pháo và Mã. Chiếu bí!',
          ],
          arrows: ['e2e9:red', 'g6e7'],
          caption: 'Đỏ đi và chiếu bí trong 1 nước.',
        },
      },
      {
        heading: 'Ngọa tào mã: Mã nằm trong “máng”',
        body: `**Ngọa tào mã** (“Mã nằm máng”) là thế Mã đứng ở điểm **c8 hoặc g8** (lộ 3 hoặc lộ 7 của đối phương, hàng thứ hai), chiếu Tướng ở e9. Từ vị trí này, Mã còn khống chế điểm e7 trước mặt Tướng.

Ngọa tào mã thường kết hợp với một Xe: Mã chiếu đẩy Tướng lên, Xe chiếu tiếp ở hàng 8. Hai Sĩ của Đen ở d9, f9 lại thành vật cản, khiến Tướng không có đường chạy.`,
        diagram: {
          fen: '2bakab2/9/9/1N5Rp/9/9/2n1P4/9/r8/3AKA3 w - - 0 1',
          moves: 'M8.7 Tg5.1 X2.2',
          notes: [
            'Mã b6 nhảy vào c8 (Ngọa tào mã), chiếu Tướng qua chân mã d8. Đen không có quân nào cản được d8 hay ăn được Mã.',
            'Hai bên đã có Sĩ chắn, Tướng chỉ còn đường lên e8.',
            'Xe h6 tấn 2 bước lên h8 chiếu. Tướng không sang d8, f8 (Xe khống chế hàng 8), không về e9 và không lên e7 (cả hai đều bị Mã c8 khống chế). Chiếu bí!',
          ],
          caption: 'Đỏ đi và chiếu bí trong 2 nước.',
        },
      },
      {
        heading: 'Lộ mặt tướng hỗ trợ (Bạch diện tướng)',
        body: `Em đã biết ở bài 3: Tướng khống chế cả lộ của mình. Trong tấn công, luật **lộ mặt tướng** biến Tướng thành một “quân Xe vô hình”, lấy đi đường chạy của Tướng đối phương. Thế sát cục dựa vào điều này gọi là **Bạch diện tướng**.

Ở ví dụ dưới, Mã Đỏ đang đứng trên lộ giữa, che giữa hai Tướng. Khi Mã rời đi để chiếu, lộ giữa mở ra – và Tướng Đỏ lập tức tham chiến.`,
        diagram: {
          fen: '2bk2b2/5P3/9/1R2N4/6p2/9/8n/r8/9/3AKA3 w - - 0 1',
          moves: 'M5.7 Tg4.1 X8-6',
          notes: [
            'Mã e6 nhảy sang c7 chiếu Tướng d9. Lộ giữa mở ra, nên Tướng Đen không được sang e9 (đối mặt Tướng Đỏ e0).',
            'Tướng chỉ còn cách tiến lên d8.',
            'Xe b6 bình sang lộ 6 chiếu. Tướng không về d9 (Mã c7 khống chế), không sang e8 (Tướng Đỏ khống chế lộ giữa, lại có Tốt f8 canh giữ). Chiếu bí – Tướng Đỏ không đi nước nào mà vẫn góp công lớn!',
          ],
          arrows: ['e0e9:yellow'],
          caption: 'Đỏ đi và chiếu bí trong 2 nước. Mũi tên vàng: Tướng Đỏ khống chế lộ giữa.',
        },
      },
      {
        heading: 'Học sát cục như thế nào?',
        body: `Các thế sát cục là “vốn từ” của người chơi cờ. Một vài gợi ý để học hiệu quả:

- **Bày lại trên bàn cờ thật** từng thế ở bài này, rồi tự đi lại nhiều lần cho đến khi nhớ hình.
- **Nhận diện dấu hiệu**: Tướng đối phương bị chính Sĩ của mình chắn hai bên? Hãy nghĩ đến Pháo trùng, Mã hậu pháo. Tướng đã rời lộ giữa? Hãy nghĩ đến lộ mặt tướng.
- **Giải cờ thế mỗi ngày**: phần Cờ thế của ứng dụng có rất nhiều bài theo chủ đề Song xe, Pháo trùng, Mã hậu pháo…
- **Phòng thủ cũng cần biết sát cục**: khi thấy đối phương đang dựng một thế sát cục, hãy phá nó trước khi quá muộn.`,
        tip: 'Khi tính một đòn sát cục, hãy ưu tiên các nước chiếu: chúng ép đối phương phải đáp, giúp em tính trước dễ hơn nhiều.',
      },
    ],
    keyTakeaways: [
      'Song xe: một Xe khóa hàng, một Xe chiếu hàng bên cạnh.',
      'Pháo trùng: Pháo trước làm ngòi cho Pháo sau; đối phương không chặn được.',
      'Mã hậu pháo: Mã trước Tướng một điểm, Pháo sau Mã trên cùng lộ.',
      'Ngọa tào mã: Mã ở c8/g8 chiếu Tướng, thường phối hợp với Xe.',
      'Bạch diện tướng: Tướng mình khống chế một lộ, lấy đường chạy của Tướng đối phương.',
    ],
  },

  // ───────────────────────── 10. Mười lời khuyên ─────────────────────────
  {
    id: 'xq-nm-muoi-loi-khuyen',
    category: 'nhap-mon',
    title: 'Mười lời khuyên cho ván cờ đầu tiên',
    subtitle: 'Những nguyên tắc khai cuộc và thói quen tư duy giúp em không thua oan',
    level: 2,
    icon: '🚀',
    minutes: 16,
    intro: `Em đã biết cách đi của từng quân, biết thắng thua ra sao. Giờ là lúc bước vào ván cờ thật! Em không cần thuộc hàng trăm biến khai cuộc – chỉ cần làm theo **mười lời khuyên** dưới đây, được đúc kết qua bao thế hệ kỳ thủ, là đã chơi khá hơn rất nhiều người mới bắt đầu.`,
    sections: [
      {
        heading: 'Lời khuyên 1–2: Mở đầu bằng Pháo đầu, và luôn giữ Tốt đầu',
        body: `**Lời khuyên 1 – Mở đầu có mục đích.** Với người mới, nước **P2-5 (Pháo đầu)** là lựa chọn tuyệt vời: Pháo nhắm thẳng vào Tốt giữa và Tướng đối phương. Ra Mã (M2.3, M8.7) cũng là khởi đầu tốt. Tránh những nước vô định như đẩy Tốt biên, đi Sĩ, đi Tướng.

**Lời khuyên 2 – Khi đối phương đi Pháo đầu, hãy bảo vệ Tốt giữa.** Cách tự nhiên nhất là lên Mã (M8.7 hoặc M2.3) để Mã che chở Tốt đầu. Nếu quên, Pháo đầu sẽ ăn Tốt giữa miễn phí, như ví dụ dưới.`,
        diagram: {
          moves: 'P2-5 B7.1 P5.4 M8.7 P5/2',
          notes: [
            'Đỏ đi Pháo đầu, nhắm vào Tốt giữa e6.',
            'Đen đẩy Tốt lộ 7 mà quên mất Tốt giữa: không có quân nào bảo vệ e6.',
            'Pháo e2 nhảy qua ngòi là Tốt e3 của chính mình, ăn Tốt e6. Đỏ lời một Tốt.',
            'Bây giờ Đen mới lên Mã, tấn công Pháo e6.',
            'Pháo lui về e4 an toàn, vẫn trấn giữ lộ giữa. Đỏ hơn một Tốt mà không mất gì.',
          ],
          caption: 'Quên bảo vệ Tốt giữa trước Pháo đầu: mất Tốt ngay từ những nước đầu.',
        },
      },
      {
        heading: 'Lời khuyên 3–4: Ra Xe thật sớm, ra quân cân đối',
        body: `**Lời khuyên 3 – Ra Xe sớm.** Các kỳ thủ có câu: **“Ba nước không ra Xe là đã chậm”**. Xe là quân mạnh nhất nhưng lúc đầu bị nhốt ở góc. Hãy đưa Xe ra ngay khi có thể: bình sang lộ trống (X1-2 sau khi Pháo rời h2), hoặc tấn 1 bước rồi bình ngang (**hoành xa**: X9.1 rồi X9-6).

**Lời khuyên 4 – Ra đủ hai Mã, không đi một quân nhiều lần.** Ra Mã sớm để bảo vệ Tốt giữa và mở đường cho Xe. Trong khai cuộc, mỗi nước đi nên đưa **một quân mới** vào trận; đi đi lại lại một quân là tặng nhịp cho đối phương.

Ván mẫu dưới đây cho thấy cả hai bên đều tuân thủ những lời khuyên này: sau 7 nước, cả bốn Xe đều đã rời góc.`,
        diagram: {
          moves: '1. P2-5 M8.7 2. M2.3 X9-8 3. X1-2 M2.3 4. B7.1 B7.1 5. M8.7 T3.5 6. X9.1 X1.1 7. X9-6',
          notes: [
            'Pháo đầu – lời khuyên số 1.',
            'Đen lên Mã bảo vệ Tốt giữa – lời khuyên số 2.',
            'Đỏ ra Mã, mở đường cho Xe i0.',
            'Ngay nước thứ hai, Đen đã ra Xe sang h9.',
            'Nước thứ ba, Đỏ ra Xe sang h0 – đúng tinh thần “ba nước phải ra Xe”.',
            'Đen ra nốt Mã thứ hai: thế Bình phong mã vững chắc.',
            'Đỏ đẩy Tốt lộ 7, gỡ chân cho Mã b0 sắp ra.',
            'Đen cũng đẩy Tốt lộ 7, gỡ chân cho Mã g7.',
            'Mã thứ hai của Đỏ ra trận ở c2.',
            'Đen lên Tượng e7, củng cố cung tướng.',
            'Đỏ tấn Xe 1 bước (a0 → a1) để chuẩn bị đi ngang – hoành xa.',
            'Đen làm tương tự với Xe a9.',
            'Xe a1 bình sang lộ 6 (d1), chiếm lộ trống trước cung. Sau 7 nước, cả hai bên đều đã ra đủ Mã và Xe – một khai cuộc mẫu mực.',
          ],
          caption: 'Pháo đầu đối Bình phong mã: ra Mã, ra Xe nhanh và cân đối.',
        },
      },
      {
        heading: 'Lời khuyên 5: Đừng để Xe bị nhốt',
        body: `Xe chỉ phát huy sức mạnh khi có **đường mở**. Một số tình huống “nhốt Xe” người mới hay gặp:

- Đưa Mã ra biên (M2.1, M8.9) rồi để Mã đứng chắn trước Xe quá lâu.
- Đẩy Xe xông sâu vào trận địa đối phương để ăn Tốt, rồi bị Mã, Pháo, Tượng vây không có đường về.
- Để Xe bị chính các quân của mình chắn kín cả lộ dọc lẫn hàng ngang trong thời gian dài.

Hãy luôn hỏi: **Xe của mình đang khống chế những lộ, những hàng nào?** Một Xe tốt thường đứng trên **lộ trống** (lộ không còn Tốt), hoặc ở **bờ sông** để kiểm soát cả hàng ngang.`,
        tip: 'Khi muốn đưa Xe vào sâu trận địa đối phương, hãy kiểm tra trước: nếu bị đuổi, Xe còn đường rút về không?',
      },
      {
        heading: 'Lời khuyên 6: Kiểm tra mọi nước ăn quân của đối phương',
        body: `Trước mỗi nước đi, hãy quét qua tất cả quân của đối phương và hỏi: **quân nào của mình đang bị ăn?** Đặc biệt chú ý đến **Pháo** – quân ăn qua ngòi rất dễ bị bỏ sót.

Ví dụ dưới là một sai lầm cực kỳ phổ biến: Đen muốn ra Xe sớm (rất đúng tinh thần lời khuyên 3!), nhưng lại quên rằng Xe a9 đang là quân duy nhất bảo vệ Mã b9 – mà Mã b9 thì nằm ngay trên đường của Pháo b2, với Pháo b7 làm ngòi.`,
        warning: 'Mã ở hàng cuối chỉ được Xe bảo vệ. Chưa ra Mã thì đừng vội đưa Xe đi chỗ khác!',
        diagram: {
          moves: 'P2-5 X1.1 P8.7',
          notes: [
            'Đỏ đi Pháo đầu.',
            'Đen tấn Xe lên a8, định đi ngang ra trận. Nhưng giờ Mã b9 không còn quân nào bảo vệ.',
            'Pháo b2 nhảy qua Pháo b7 (ngòi) ăn Mã b9 – và Đen không ăn lại được. Đỏ lời trọn một Mã chỉ sau hai nước.',
          ],
          arrows: ['b2b9:red'],
          caption: 'Ra Xe đúng lúc: chưa ra Mã thì Xe góc vẫn còn nhiệm vụ bảo vệ.',
        },
      },
      {
        heading: 'Lời khuyên 7–8: Kiểm tra nước chiếu, đừng để Tướng trơ trọi',
        body: `**Lời khuyên 7 – Trước khi đi, hãy kiểm tra mọi nước chiếu của đối phương.** Nhất là khi em đang mải ăn quân. Một nước chiếu bí bị bỏ sót có thể xóa sạch mọi lợi thế.

**Lời khuyên 8 – Giữ gìn Sĩ, Tượng; đừng đi Tướng vô cớ.** Khi Sĩ Tượng đã mất, Tướng rất dễ bị các thế sát cục như Mã hậu pháo, Pháo trùng tấn công. Nhưng ngược lại, khi cảm thấy nguy hiểm, một nước Tướng **đúng lúc** để tránh khỏi đường Pháo, đường Xe có thể cứu cả ván cờ.

Ở thế cờ dưới, Đỏ đang có ưu thế lớn: Xe Đỏ tung hoành, còn Tướng Đen chỉ có hai Sĩ che chắn. Nhưng Đỏ đã không kiểm tra nước chiếu của Đen…`,
        diagram: {
          fen: '1n1aka3/1R7/4c2N1/9/2p6/6P2/2P3n1P/B7B/9/4K4 w - - 0 1',
          moves: 'X8.1 M7.5',
          notes: [
            'Đỏ tham ăn Mã b9 – một quân “miễn phí”. Lẽ ra Đỏ nên đi Tướng sang f0 (Tg5-4), tránh khỏi lộ của Pháo e7, và vẫn giữ ưu thế rất lớn.',
            'Mã g3 nhảy vào e2: Mã hậu pháo! Pháo e7 chiếu Tướng qua ngòi là Mã; Mã e2 khống chế d0 và f0; Tướng lên e1 vẫn bị Pháo chiếu. Đỏ không có quân nào ăn được Mã hay chen vào giữa. Chiếu bí!',
          ],
          caption: 'Đỏ đi. Đang ưu thế nhưng quên kiểm tra nước chiếu của đối phương.',
        },
      },
      {
        heading: 'Lời khuyên 9–10: Đổi quân có tính toán, mỗi nước đều có mục đích',
        body: `**Lời khuyên 9 – Hơn quân thì đổi, kém quân thì tránh đổi.** Như em đã học ở bài 8, đổi quân khi đang hơn giúp chiến thắng đơn giản hơn; còn khi đang kém, giữ quân trên bàn để còn cơ hội phản công.

**Lời khuyên 10 – Đừng tham ăn, mỗi nước đi phải có mục đích.** Trước khi đi, hãy tự trả lời được câu hỏi: “Nước này để làm gì?” – ra quân, bảo vệ, tấn công một điểm yếu, hay chuẩn bị một kế hoạch. Nước đi không có mục đích thường là nước đi tặng nhịp cho đối phương.

Tóm tắt mười lời khuyên:
- 1. Mở đầu có mục đích: Pháo đầu hoặc ra Mã.
- 2. Bảo vệ Tốt giữa khi đối phương đi Pháo đầu.
- 3. Ra Xe sớm – ba nước không ra Xe là đã chậm.
- 4. Ra đủ hai Mã, không đi một quân nhiều lần trong khai cuộc.
- 5. Đừng để Xe bị nhốt.
- 6. Kiểm tra mọi nước ăn quân của đối phương, nhất là Pháo.
- 7. Kiểm tra mọi nước chiếu của đối phương.
- 8. Giữ Sĩ Tượng, không đi Tướng vô cớ.
- 9. Hơn quân thì đổi, kém quân thì tránh đổi.
- 10. Mỗi nước đi đều phải có mục đích.`,
        tip: 'Trong chế độ Luyện tập của ứng dụng, sau mỗi ván em hãy xem lại phần phân tích: phần lớn các nước sai của người mới đều vi phạm một trong mười lời khuyên này.',
      },
    ],
    keyTakeaways: [
      'Mở đầu bằng Pháo đầu hoặc ra Mã; luôn bảo vệ Tốt giữa trước Pháo đầu.',
      'Ba nước không ra Xe là đã chậm: đưa Xe ra lộ trống càng sớm càng tốt.',
      'Trước mỗi nước, kiểm tra mọi nước ăn quân và nước chiếu của đối phương.',
      'Giữ Sĩ Tượng, không đi Tướng vô cớ, đừng để Xe bị nhốt.',
      'Hơn quân thì đổi quân; mỗi nước đi phải có mục đích rõ ràng.',
    ],
  },
];
