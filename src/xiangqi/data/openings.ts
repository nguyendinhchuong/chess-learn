// Thư viện khai cuộc cờ tướng: diễn biến chính có lời giảng từng nửa nước, ý tưởng hai bên, các biến và bẫy.
import type { XqOpening } from './types';

export const XQ_OPENINGS: XqOpening[] = [
  // ======================= PHÁO ĐẦU (TRUNG PHÁO) =======================
  {
    id: 'phao-dau-xe-qua-ha-binh-phong-ma',
    name: 'Pháo đầu Xe qua hà đối Bình phong mã (Bình pháo đổi xe)',
    nameHan: '中炮过河车对屏风马平炮兑车',
    family: 'trung-phao',
    forSide: 'red',
    difficulty: 4,
    moves:
      '1. P2-5 M8.7 2. M2.3 X9-8 3. X1-2 B7.1 4. X2.6 M2.3 5. B7.1 P8-9 6. X2-3 P9/1 7. M8.7 S4.5 8. P8-9 P9-7 9. X3-4 M7.8 10. X9-8 X1-2 11. X4.2 P7.5 12. T3.1 P2.4 13. M7.6 M8/7',
    moveNotes: [
      'Pháo đầu: Pháo vào lộ giữa (e2), nhắm thẳng Tốt đầu e6 và Tướng Đen. Đây là nước mở màn phổ biến và giàu tính tấn công nhất của cờ tướng.',
      'Mã 8 tiến 7 – viên gạch đầu tiên của Bình phong mã: Mã g7 bảo vệ Tốt đầu, chặn ngay ý đồ Pháo ăn Tốt giữa.',
      'Đỏ lên Mã phải để giữ Tốt giữa, đồng thời mở đường cho Xe 1 ra quân.',
      'Xe 9 bình 8: Đen ra Xe sớm, chiếm lộ 8 ngay sau lưng Pháo 8.',
      'Xe 1 bình 2: Xe Đỏ chiếm lộ 2, đối mặt với Pháo 8 của Đen – một lộ Xe thông thoáng.',
      'Tốt 7 tiến 1 (g5): giải phóng "chân" g6 để Mã 7 có thể nhảy lên f5 hoặc h5, đồng thời kìm Tốt 3 của Đỏ.',
      'Xe qua hà (h6): Xe áp sát hàng tốt của Đen, dọa ăn Tốt 9 (i6) và kìm chế cả Mã 7 lẫn Pháo 8. Đây là thế trận làm nên tên gọi của khai cuộc.',
      'Mã 2 tiến 3 hoàn thành Bình phong mã: hai Mã đứng hai bên lộ giữa như tấm bình phong. Mã c7 còn làm ngòi để Pháo 2 bảo vệ Mã 7 trên hàng 7.',
      'Tốt 7 tiến 1 (c4): chặn Tốt 3 của Đen và mở "chân" c3 cho Mã 8 sau này lên 7 rồi bàn hà.',
      'Bình pháo đổi xe: Pháo 8 dạt ra biên (i7), mở lộ 8 cho Xe đen đối mặt Xe đỏ ở h6 – Đen đòi đổi Xe để giải tỏa sức ép.',
      'Đỏ tránh đổi Xe: Xe bình sang lộ 3 (g6), đè thẳng lên Mã 7. Mã này chỉ được Pháo 2 bảo vệ gián tiếp qua ngòi Mã 3, nên Đen phải đi rất chính xác.',
      'Pháo 9 thoái 1 (i8): chuẩn bị bình sang lộ 7 đứng sau Mã, biến Mã thành ngòi để đánh Xe Đỏ.',
      'Mã 8 tiến 7: Đỏ phát triển nốt Mã trái, giữ thế trận cân đối.',
      'Sĩ 4 tiến 5: Đen củng cố cung Tướng trước khi phản kích, các quân phòng thủ liên kết với nhau.',
      'Pháo 8 bình 9 (a2): mở lộ 8 cho Xe 9 ra quân, đồng thời Pháo biên nhắm Tốt 1 (a6) của Đen.',
      'Pháo 9 bình 7 (g8): dùng Mã 7 làm ngòi, Pháo đánh thẳng vào Xe g6 – Đỏ buộc phải dời Xe.',
      'Xe 3 bình 4 (f6): Xe vẫn đứng trên hàng tốt của Đen, tiếp tục uy hiếp Tốt đầu và Tốt 9, lại nhòm xuống Sĩ f9.',
      'Mã 7 tiến 8 (h5): Mã ra "ngoại bàn hà", vừa mở lộ 7 cho Pháo, vừa dọa ăn Tốt 3 (g3) hoặc Tốt 1 (i3) của Đỏ.',
      'Xe 9 bình 8: Đỏ ra nốt Xe thứ hai và dọa ăn ngay Pháo 2 đang không có quân bảo vệ.',
      'Xe 1 bình 2: Xe đen bảo vệ Pháo 2 và cũng chiếm lộ 8. Cả bốn Xe đã vào trận.',
      'Xe 4 tiến 2 (f8): Xe Đỏ đột nhập hàng 8, tấn công Pháo 7 và uy hiếp hai Sĩ trong cung Đen – biến công sắc bén nhất của thế trận này.',
      'Pháo 7 tấn 5 ăn Tốt 3 (g3): Pháo thoát đòn Xe một cách có lời, lại dọa ăn Tượng g0 (lấy Mã 3 làm ngòi).',
      'Tượng 3 lên 1 (i2): Đỏ cất Tượng khỏi tầm Pháo. Tượng ở i2 vẫn giữ được điểm g4 và g0.',
      'Pháo 2 tấn 4 (b3): Pháo chen vào giữa hai Xe trên lộ 8, chặn Xe Đỏ, đồng thời cùng Pháo 7 áp sát hàng tốt Đỏ.',
      'Mã 7 tiến 6 (d4): Mã bàn hà ở trung tâm, dọa ăn Tốt đầu e6 hoặc Tốt 3 (c6) của Đen.',
      'Mã 8 thoái 7 (g7): Mã quay về giữ Tốt đầu. Hai bên mỗi bên một thế mạnh: Đỏ có Xe sâu và Mã trung tâm, Đen có hai Pháo tràn sang trận địa Đỏ – thế cờ phức tạp, cân bằng.',
    ],
    summary:
      'Pháo đầu Xe qua hà đối Bình phong mã là "xương sống" của lý thuyết cờ tướng hiện đại. Đỏ đưa Xe qua sông ngay ở nước thứ tư để áp sát trận địa Đen; Đen đáp lại bằng nước Pháo 8 bình 9 đòi đổi Xe (bình pháo đổi xe). Đỏ né đổi, Xe chạy sang lộ 3 rồi lộ 4, còn Đen dùng Pháo đứng sau Mã để đuổi Xe. Thế trận nhanh chóng trở nên sắc bén, đòi hỏi cả hai bên phải thuộc bài và tính toán chính xác. Bản thân thế Bình phong mã chống Pháo đầu đã được hệ thống hóa từ cổ phổ Mai Hoa Phổ; còn biến Xe qua hà là trường học tốt nhất để hiểu cách phối hợp Xe – Pháo – Mã trong tấn công và cách giữ một thế phòng thủ có phản kích.',
    ideasRed: [
      'Xe qua hà (h6) đè lên hàng tốt của Đen, kìm Mã 7 và Pháo 8 ngay từ đầu.',
      'Tránh đổi Xe khi Đen bình pháo: Xe 2 bình 3 rồi bình 4, luôn giữ Xe ở hàng 6 của đối phương.',
      'Ra nhanh Mã 8, Pháo 8 bình 9 để Xe 9 vào lộ 8 – mọi quân đều tham chiến trước khi tấn công.',
      'Xe 4 tiến 2 đột nhập hàng 8 và Mã bàn hà (d4) uy hiếp Tốt đầu là hai mũi nhọn chính.',
    ],
    ideasBlack: [
      'Bình pháo đổi xe (Pháo 8 bình 9) để giải tỏa sức ép của Xe qua hà.',
      'Đặt Pháo sau Mã 7 (Pháo 9 thoái 1 rồi bình 7) để đuổi Xe Đỏ với nhịp.',
      'Mã 7 ra ngoại bàn hà (h5), Pháo 7 ăn Tốt 3 – phản công vào cánh phải của Đỏ.',
      'Luôn giữ Tốt đầu e6 được bảo vệ: khi Mã rời g7 phải tính đến đòn Pháo đầu và Mã bàn hà của Đỏ.',
    ],
    typicalPlans: [
      'Đỏ: Xe sâu ở hàng 8 phối hợp với Pháo đầu và Mã bàn hà để tấn công cung Tướng Đen.',
      'Đen: hai Pháo tràn sang hàng 3 của Đỏ, nhắm Tượng và Tốt, kết hợp Xe 8 xuống sâu.',
      'Đỏ có thể chuyển Pháo đầu sang lộ 4 (Pháo 5 bình 6) để mở đường cho Tốt giữa tiến lên.',
      'Khi Đen đổi được một cặp Xe, thế cờ thường chuyển sang trung cuộc cân bằng, nhiều Tốt.',
    ],
    variations: [
      {
        name: 'Đỏ Tả mã bàn hà (8. M7.6)',
        moves:
          '1. P2-5 M8.7 2. M2.3 X9-8 3. X1-2 B7.1 4. X2.6 M2.3 5. B7.1 P8-9 6. X2-3 P9/1 7. M8.7 S4.5 8. M7.6 P9-7 9. X3-4 X8.5 10. P8.2 T3.5 11. P5-6 B3.1',
        comment:
          'Thay vì Pháo biên, Đỏ đưa ngay Mã trái lên bàn hà (d4) để chiếm trung tâm. Đen đáp bằng Xe 8 tiến 5 tuần hà, Đỏ lên Pháo tuần hà (b4) giữ hàng 4, rồi bình Pháo đầu sang lộ 4 chuẩn bị tiến Tốt. Thế cờ chậm hơn, mang tính chiến lược hơn diễn biến chính.',
      },
      {
        name: 'Cấp tiến trung binh (7. B5.1)',
        moves:
          '1. P2-5 M8.7 2. M2.3 X9-8 3. X1-2 B7.1 4. X2.6 M2.3 5. B7.1 P8-9 6. X2-3 P9/1 7. B5.1 S4.5 8. B5.1 P9-7 9. X3-4 B7.1 10. M3.5 B7.1 11. M5.6 X8.8',
        comment:
          'Đỏ thúc Tốt giữa lên liền hai bước để mở lộ giữa cho Pháo đầu và Mã 3 nhảy vào trung tâm. Đen phản công ngay bằng Tốt 7 lao qua sông và Xe 8 xuống tận đáy. Một biến cực kỳ sắc bén, ai tính sai một nước là thua ngay.',
      },
      {
        name: 'Đen ra Xe ngang (5...X1.1)',
        moves: '1. P2-5 M8.7 2. M2.3 X9-8 3. X1-2 B7.1 4. X2.6 M2.3 5. B7.1 X1.1 6. M8.7 X1-4 7. P8-9 P2.4 8. B3.1 B7.1',
        comment:
          'Không bình pháo đổi xe, Đen ra Xe 1 theo hàng ngang sang lộ 4 rồi đưa Pháo 2 qua sông. Đỏ đổi Tốt 3 để mở đường cho Mã phải. Cách chơi linh hoạt, tránh những biến lý thuyết dài.',
      },
    ],
    traps: [
      {
        name: 'Phi tượng cắt đường bảo vệ Mã',
        moves: '1. P2-5 M8.7 2. M2.3 X9-8 3. X1-2 B7.1 4. X2.6 M2.3 5. B7.1 P8-9 6. X2-3 T3.5 7. X3.1 X8.5 8. X3/1',
        explanation:
          'Sau 6. X2-3, Mã 7 của Đen chỉ được Pháo 2 bảo vệ "xuyên" qua ngòi Mã 3 dọc hàng 7. Nước Phi tượng 6...T3.5 trông rất tự nhiên, nhưng Tượng đứng ở e7 đã chen thêm một quân vào hàng 7 – Pháo 2 mất tác dụng bảo vệ. Đỏ ăn không Mã bằng 7. X3.1, Đen cố phản kích bằng 7...X8.5 nhưng 8. X3/1 rút Xe về an toàn, Đỏ hơn hẳn một Mã. Cách đúng là 6...P9/1 như diễn biến chính. Bài học: khi một quân được bảo vệ qua ngòi Pháo, đừng chen thêm quân vào đường bảo vệ ấy (6...T7.5 hay di chuyển Pháo 2 cũng mất Mã tương tự).',
      },
    ],
    famousPlayers: ['Lý Lai Quần', 'Liễu Đại Hoa', 'Lữ Khâm', 'Hứa Ngân Xuyên', 'Triệu Quốc Vinh', 'Tưởng Xuyên'],
  },
  {
    id: 'ngu-that-phao-binh-phong-ma',
    name: 'Ngũ thất pháo đối Bình phong mã',
    nameHan: '五七炮对屏风马',
    family: 'trung-phao',
    forSide: 'red',
    difficulty: 3,
    moves:
      '1. P2-5 M8.7 2. M2.3 X9-8 3. X1-2 M2.3 4. M8.9 B7.1 5. P8-7 X1-2 6. X9-8 P8.4 7. X8.6 P2-1 8. X8-7 X2.2 9. X7/2 M3.2 10. X7-8 M2/4 11. B9.1 T7.5 12. X8.3 M4/2 13. X2.1 P1.3',
    moveNotes: [
      'Pháo đầu: Pháo vào lộ giữa, nhắm Tốt đầu e6.',
      'Mã 8 tiến 7 bảo vệ Tốt đầu – bước đầu của Bình phong mã.',
      'Mã 2 tiến 3 giữ Tốt giữa và mở đường cho Xe 1.',
      'Xe 9 bình 8 ra quân sớm sau lưng Pháo 8.',
      'Xe 1 bình 2 chiếm lộ 2, đối mặt Pháo 8 của Đen.',
      'Mã 2 tiến 3 hoàn thành Bình phong mã ngay, trước khi tiến Tốt 7.',
      'Mã 8 tiến 9 (Mã biên, a2): nhường điểm c2 cho Pháo 8 bình sang lộ 7 – bố cục đặc trưng của Ngũ thất pháo. Điểm b0 trống cũng giúp Xe 9 sau này bình sang lộ 8.',
      'Tốt 7 tiến 1 (g5): mở "chân" cho Mã 7 và hạn chế Tốt 3 của Đỏ.',
      'Pháo 8 bình 7 (c2): hai Pháo đứng ở lộ 5 và lộ 7 – "Ngũ thất pháo". Pháo 7 nhắm thẳng Tốt 3 (c6) và Mã 3 phía sau.',
      'Xe 1 bình 2 (Hữu trực xa): Đen ra Xe phải sang lộ 2, đứng sau Pháo 2.',
      'Xe 9 bình 8: Đỏ có "Song trực xa" – hai Xe đều đã thông, Xe lộ 8 nhòm thẳng vào Pháo 2.',
      'Tả pháo phong xa: Pháo 8 tấn 4 (h3) chặn ngay trước mặt Xe 2 của Đỏ, khóa Xe này ở hàng cuối. Pháo được Xe 8 phía sau bảo vệ.',
      'Xe 8 tiến 6 (b6): Xe Đỏ thọc sâu, cùng lúc nhắm Tốt 1 (a6), Tốt 3 (c6) và Pháo 2.',
      'Pháo 2 bình 1 (a7): Pháo dạt ra biên, mở lộ cho Xe 2 đen tấn công thẳng Xe b6 (Xe này không có quân bảo vệ); Pháo biên còn dọa ăn Tốt 9 (a3).',
      'Xe 8 bình 7 ăn Tốt 3 (c6): Xe thoát khỏi đòn đổi và ăn thêm Tốt, giờ dọa ăn tiếp Mã 3 đang không được bảo vệ.',
      'Xe 2 tiến 2 (b7): Xe đen đứng cạnh Mã 3 để bảo vệ nó.',
      'Xe 7 thoái 2 (c4): Xe lui về bờ sông của mình cho an toàn, vẫn giữ Mã 3 trong tầm ngắm.',
      'Mã 3 tiến 2 (b5): Mã nhảy ra, dọa ăn Tốt 9 (a3) rồi uy hiếp Pháo 7; nhưng Mã rời c7 cũng mở lộ 7, để lộ Tượng c9.',
      'Xe 7 bình 8 (b4): đuổi Mã b5, đồng thời mở lộ 7 cho Pháo 7 – lúc này Pháo đã nhắm Tượng c9 qua ngòi Tốt c3.',
      'Mã 2 thoái 4 (d6): Mã rút về, và Xe 2 đen trên cột b giờ nhìn thẳng vào Xe b4 của Đỏ.',
      'Tốt 9 tiến 1 (a4): nước tinh tế – Tốt rời a3 mở "chân" cho Mã biên, Mã a2 lập tức bảo vệ được Xe b4.',
      'Tượng 7 tiến 5 (e7): Tượng giữ Tượng c9 trước đòn Pháo 7 tấn 7.',
      'Xe 8 tiến 3 ăn Xe (b7): Đỏ chủ động đổi Xe để giảm bớt sức ép trên lộ 8.',
      'Mã 4 thoái 2 (b7): Mã ăn lại Xe. Hai bên mỗi bên còn một Xe.',
      'Xe 2 tiến 1 (h1): Xe Đỏ ra hàng 1, tấn công Pháo phong xa ở h3 và chuẩn bị bình sang chiếm lộ 8.',
      'Pháo 1 tấn 3 ăn Tốt (a4): Đen lấy lại một Tốt. Đỏ hơn về hoạt động quân, Đen chắc chắn và nhiều Tốt hơn – thế cờ cân bằng.',
    ],
    summary:
      'Ngũ thất pháo là một biến thể quan trọng của Pháo đầu: Mã trái lên biên (a2) và Pháo trái bình sang lộ 7, tạo thành cặp Pháo lộ 5 – lộ 7. Pháo 7 gây sức ép thường trực lên cánh phải của Đen (Tốt 3, Mã 3), còn hai Xe Đỏ đều nhanh chóng ra lộ thông. Đen thường đáp bằng "Tả pháo phong xa" – Pháo 8 tấn 4 chặn Xe 2 của Đỏ – rồi phản công trên lộ 8. Khai cuộc giàu tính chiến thuật, là vũ khí sở trường của nhiều danh thủ như Liễu Đại Hoa, Triệu Quốc Vinh.',
    ideasRed: [
      'Mã 8 tiến 9 rồi Pháo 8 bình 7 tạo "Ngũ thất pháo", ép vào cánh phải của Đen.',
      'Song trực xa: Xe 9 bình 8 thật sớm để Xe lộ 8 thọc sâu (Xe 8 tiến 6).',
      'Khi Mã 3 của Đen rời c7, lộ 7 mở ra và Pháo 7 nhắm thẳng Tượng c9.',
      'Dùng Tốt biên (Tốt 9 tiến 1) để mở chân Mã biên – Mã a2 tham chiến từ cánh trái.',
    ],
    ideasBlack: [
      'Tả pháo phong xa (Pháo 8 tấn 4) để khóa Xe 2, làm chậm cánh phải của Đỏ.',
      'Pháo 2 bình 1 mở lộ cho Xe 2 đối đầu với Xe lộ 8 của Đỏ.',
      'Mã 3 nhảy ra b5 dọa ăn Tốt biên và uy hiếp Pháo 7.',
      'Giữ Tượng c9 được bảo vệ (Tượng 7 tiến 5) trước Pháo lộ 7.',
    ],
    typicalPlans: [
      'Đỏ: Xe 2 ra hàng ngang (Xe 2 tiến 1) rồi bình sang lộ trống, Mã biên nhảy lên b4 tham gia tấn công.',
      'Đen: tận dụng Pháo phong xa h3 và Xe 8 để phản công cánh phải Đỏ, nhắm Tốt 3 và Mã 3.',
      'Sau khi đổi một cặp Xe, Đỏ dùng Pháo lộ 7 và Pháo đầu tạo áp lực, Đen dựa vào số Tốt nhiều hơn.',
      'Cả hai bên cần chú ý các đòn chiếu phát hiện trên lộ giữa khi Mã Đỏ rời khỏi e3/g2.',
    ],
    variations: [
      {
        name: 'Đen Hữu pháo qua hà (6...P2.4)',
        moves:
          '1. P2-5 M8.7 2. M2.3 X9-8 3. X1-2 M2.3 4. M8.9 B7.1 5. P8-7 X1-2 6. X9-8 P2.4 7. X2.4 P8-9 8. X2-4 X8.1 9. B9.1 X8-2 10. B3.1 B7.1 11. X4-3 M7.8',
        comment:
          'Thay vì phong xa, Đen đưa Pháo phải qua sông (b3) chặn Xe lộ 8 của Đỏ. Đỏ đáp bằng Xe tuần hà (h4) rồi bình sang lộ 4; Đen bình pháo ra biên, Xe 8 tiến 1 rồi bình sang lộ 2 tăng cường cánh phải. Hai bên đổi Tốt 3 – Tốt 7 để mở đường cho Xe và Mã.',
      },
      {
        name: 'Đen Hữu pháo tuần hà (6...P2.2)',
        moves: '1. P2-5 M8.7 2. M2.3 X9-8 3. X1-2 M2.3 4. M8.9 B7.1 5. P8-7 X1-2 6. X9-8 P2.2 7. X2.6 M7.6 8. X8.4 T3.5',
        comment:
          'Pháo 2 lên bờ sông (b5) để giữ hàng 5, Đỏ lập tức cho Xe 2 qua hà; Đen nhảy Mã 7 lên bàn hà (f5), Đỏ đưa Xe 8 tuần hà, Đen phi Tượng củng cố. Thế cờ chậm và nhiều co kéo.',
      },
      {
        name: 'Ngũ thất pháo đối Bình phong mã tiến 3 tốt (Hữu mã ngoại bàn hà)',
        moves:
          '1. P2-5 M8.7 2. M2.3 X9-8 3. X1-2 M2.3 4. B3.1 B3.1 5. M8.9 B1.1 6. P8-7 M3.2 7. X9.1 T3.5 8. X2.6 X1.3 9. X9-6 P8-9 10. X2.3 M7/8 11. M3.4 S6.5',
        comment:
          'Hệ thống hiện đại rất phổ biến: hai bên cùng tiến Tốt 3, Đen tiến Tốt biên rồi đưa Mã phải ra b5 (ngoại bàn hà). Đỏ ra Xe trái theo hàng ngang sang lộ 6, Đen bình pháo đổi Xe. Sau khi đổi Xe, Đỏ nhảy Mã phải lên f4, thế cờ cân bằng.',
      },
    ],
    traps: [
      {
        name: 'Pháo ăn Tốt giữa chiếu – Mã hồi chiếu phát hiện',
        moves:
          '1. P2-5 M8.7 2. M2.3 X9-8 3. X1-2 M2.3 4. M8.9 B7.1 5. P8-7 X1-2 6. X9-8 P8.4 7. X8.6 P2-1 8. X8-7 P8-5 9. M3.5 X8.9 10. M5/3 M3/5 11. M3/2',
        explanation:
          'Nước 8...P8-5 ăn Tốt giữa và chiếu Tướng trông rất hấp dẫn, lại có vẻ "có lời": sau 9. M3.5 Mã ăn Pháo, Pháo phong xa rời h3 nên Xe 8 đen ăn luôn Xe 2 ở h0. Nhưng 10. M5/3! – Mã lui về g2 mở lộ giữa, Pháo đầu chiếu Tướng (ngòi là Tốt e6), đồng thời Mã đá thẳng vào Xe đen ở h0. Đen phải đỡ chiếu, 11. M3/2 ăn Xe. Kết quả Đen mất trắng một Pháo chỉ để lấy một Tốt. Bài học: trước khi ăn quân hãy kiểm tra những đòn chiếu phát hiện của Pháo đầu.',
      },
    ],
    famousPlayers: ['Liễu Đại Hoa', 'Triệu Quốc Vinh', 'Từ Thiên Hồng', 'Lữ Khâm', 'Hứa Ngân Xuyên', 'Hồ Vinh Hoa'],
  },
  {
    id: 'ngu-luc-phao-binh-phong-ma',
    name: 'Ngũ lục pháo đối Bình phong mã',
    nameHan: '五六炮对屏风马',
    family: 'trung-phao',
    forSide: 'red',
    difficulty: 3,
    moves:
      '1. P2-5 M8.7 2. M2.3 X9-8 3. X1-2 M2.3 4. X2.6 B7.1 5. P8-6 B3.1 6. M8.9 P2.1 7. X2/2 P8-9 8. X2.5 M7/8 9. X9-8 X1-2 10. X8.4 T3.5 11. B3.1 B7.1 12. X8-3 S4.5',
    moveNotes: [
      'Pháo đầu: Pháo vào lộ giữa, nhắm Tốt đầu e6.',
      'Mã 8 tiến 7 bảo vệ Tốt đầu.',
      'Mã 2 tiến 3 giữ Tốt giữa và mở đường cho Xe 1.',
      'Xe 9 bình 8 ra quân sau lưng Pháo 8.',
      'Xe 1 bình 2 chiếm lộ 2.',
      'Mã 2 tiến 3 hoàn thành Bình phong mã.',
      'Xe qua hà (h6): Xe áp sát hàng tốt Đen, dọa ăn Tốt 7 (g6) hoặc Tốt 9 (i6).',
      'Tốt 7 tiến 1 (g5): Tốt né khỏi tầm Xe và mở "chân" cho Mã 7.',
      'Pháo 8 bình 6 (d2): Pháo về lộ 6 – điểm "sĩ giác". Hai Pháo ở lộ 5 và lộ 6 gọi là "Ngũ lục pháo": thế trận vững chắc, Pháo 6 sẵn sàng sang cánh nào cũng được.',
      'Tốt 3 tiến 1 (c5): cả hai Tốt 3 và Tốt 7 đều đã tiến – thế "Lưỡng đầu xà" (rắn hai đầu), giúp hai Mã của Đen đều có đường nhảy ra.',
      'Mã 8 tiến 9 (a2): Mã ra biên, mở đường cho Xe 9 sang lộ 8.',
      'Pháo 2 tiến 1 (b6): đòn "ngòi pháo ngang" – Pháo đứng trên hàng 6, lấy Tốt đầu e6 làm ngòi để đánh thẳng Xe Đỏ ở h6!',
      'Xe 2 thoái 2 (h4): Xe lui về tuần hà, né đòn Pháo và vẫn giữ lộ 2.',
      'Pháo 8 bình 9 (i7): mở lộ 8 để Xe đen đối mặt Xe đỏ ở h4 – Đen đòi đổi Xe; Pháo biên còn nhắm Tốt 1 (i3).',
      'Xe 2 tiến 5 ăn Xe (h9): Đỏ chấp nhận đổi Xe.',
      'Mã 7 thoái 8 (h9): Mã ăn lại Xe. Mỗi bên còn một Xe.',
      'Xe 9 bình 8 (b0): Xe trái ra quân, nhắm Pháo b6 đang không có quân bảo vệ.',
      'Xe 1 bình 2 (b9): Xe đen bảo vệ Pháo 2.',
      'Xe 8 tiến 4 (b4): Xe lên tuần hà, kiểm soát hàng 4 và tiếp tục gây sức ép lên Pháo b6.',
      'Tượng 3 tiến 5 (e7): Đen củng cố trung lộ, Tượng e7 còn bảo vệ cho Tượng g9.',
      'Tốt 3 tiến 1 (g4): Đỏ chủ động đổi Tốt để mở lộ cho Xe tuần hà.',
      'Tốt 7 tiến 1 ăn Tốt (g4): Đen chấp nhận đổi.',
      'Xe 8 bình 3 ăn Tốt (g4): Xe ăn lại Tốt, chiếm lộ 3 đã mở và nhìn xuống Tượng g9.',
      'Sĩ 4 tiến 5: Đen củng cố cung Tướng. Đỏ có Xe hoạt động tốt hơn, Đen vững chắc và cân bằng về quân.',
    ],
    summary:
      'Ngũ lục pháo là Pháo đầu kết hợp Pháo trái về lộ 6 (sĩ giác). So với Ngũ thất pháo, cách bố trí này ít sắc bén hơn nhưng rất vững: Pháo 6 bảo vệ cánh trái, có thể chuyển sang cánh nào cũng được, còn hai Xe Đỏ ra quân nhanh. Trong diễn biến chính, Đỏ cho Xe qua hà, Đen đáp bằng thế "Lưỡng đầu xà" (tiến cả hai Tốt 3, Tốt 7) và đòn Pháo 2 tiến 1 lấy Tốt đầu làm ngòi đánh Xe. Hai bên đổi một cặp Xe, rồi cạnh tranh trên các lộ mở ở cánh phải. Đây là khai cuộc thích hợp cho người thích lối chơi chắc chắn, giàu tính chiến lược.',
    ideasRed: [
      'Pháo 8 bình 6 tạo thế Ngũ lục pháo vững chắc, giữ cánh trái an toàn.',
      'Xe qua hà rồi Xe tuần hà: luôn kiểm soát hàng 4 – hàng 6 để kìm Tốt và Mã của Đen.',
      'Ra Xe 9 sang lộ 8 qua Mã biên (a2) để có hai Xe hoạt động sớm.',
      'Chủ động đổi Tốt 3 để mở lộ cho Xe sau khi đã đổi được một cặp Xe.',
    ],
    ideasBlack: [
      'Thế Lưỡng đầu xà (tiến Tốt 3 và Tốt 7) mở đường cho cả hai Mã.',
      'Pháo 2 tiến 1 dùng Tốt đầu làm ngòi đánh Xe qua hà theo hàng ngang.',
      'Bình pháo ra biên để đổi Xe, giảm sức ép của Đỏ.',
      'Phi tượng, lên sĩ giữ cung chắc chắn rồi chờ cơ hội phản công bằng Pháo và Mã.',
    ],
    typicalPlans: [
      'Đỏ: Xe chiếm lộ 3 đã mở, Pháo 6 có thể tiến lên tuần hà hoặc bình sang lộ 7 để tấn công cánh phải Đen.',
      'Đen: đưa Mã h9 trở lại g7, Pháo biên bình về lộ 7 hoặc lộ 6 để tham gia phòng thủ – phản công.',
      'Khi chỉ còn một Xe mỗi bên, cả hai thường tranh thủ đổi Tốt để mở lộ cho Xe và Mã.',
      'Đỏ cần cảnh giác với các đòn Pháo ngang trên hàng 6 khi Tốt đầu của Đen còn ở e6.',
    ],
    variations: [
      {
        name: 'Ngũ lục pháo Mã biên đối Hữu pháo qua hà',
        moves:
          '1. P2-5 M8.7 2. M2.3 X9-8 3. X1-2 M2.3 4. M8.9 B7.1 5. P8-6 X1-2 6. X9-8 P2.4 7. X2.4 P8-9 8. X2-4 S4.5 9. B9.1 P2/2 10. X8.4 T7.5',
        comment:
          'Đỏ không cho Xe qua hà mà ra Mã biên trước, hai Xe đều ra trực xa. Đen đưa Pháo phải qua sông chặn Xe lộ 8; Đỏ dùng Xe tuần hà rồi bình sang lộ 4, tiến Tốt biên mở chân Mã. Thế cờ chậm, nhiều thế đấu chiến lược.',
      },
      {
        name: 'Đen tiến 7 tốt hữu trực xa (5...X1-2)',
        moves:
          '1. P2-5 M8.7 2. M2.3 X9-8 3. X1-2 M2.3 4. X2.6 B7.1 5. P8-6 X1-2 6. M8.7 P2-1 7. B5.1 P8/1 8. P6/1 P8-5 9. X2-3 X8.2',
        comment:
          'Đen không tiến Tốt 3 mà ra ngay Xe phải. Đỏ lên Mã chính và thúc Tốt giữa; Đen lui Pháo 8 rồi đưa vào lộ giữa (Pháo 8 bình 5) để đối đầu trên trung lộ, Xe 8 tiến 2 đuổi Xe Đỏ. Một biến giàu tính đối công.',
      },
    ],
    traps: [
      {
        name: 'Quên ngòi pháo ngang',
        moves: '1. P2-5 M8.7 2. M2.3 X9-8 3. X1-2 M2.3 4. X2.6 B7.1 5. P8-6 B3.1 6. M8.9 P2.1 7. X9-8 P2-8',
        explanation:
          'Sau 6...P2.1, Pháo đen đứng ở b6 và giữa nó với Xe Đỏ ở h6 chỉ có đúng một quân – Tốt đầu e6. Nếu Đỏ "theo bài" ra Xe 7. X9-8, Đen đáp 7...P2-8 nhảy qua ngòi e6 ăn gọn Xe! Đỏ không có quân nào ăn lại được. Nước đúng là 7. X2/2 lui Xe tuần hà như diễn biến chính. Bài học: Pháo không chỉ đánh dọc mà còn đánh ngang – hãy đếm ngòi trên cả hàng ngang.',
      },
    ],
    famousPlayers: ['Triệu Quốc Vinh', 'Hứa Ngân Xuyên', 'Lữ Khâm', 'Từ Thiên Hồng', 'Liễu Đại Hoa'],
  },
  {
    id: 'binh-phong-ma-ta-ma-ban-ha',
    name: 'Bình phong mã Tả mã bàn hà',
    nameHan: '屏风马左马盘河',
    family: 'trung-phao',
    forSide: 'black',
    difficulty: 4,
    moves:
      '1. P2-5 M8.7 2. M2.3 X9-8 3. X1-2 B7.1 4. X2.6 M2.3 5. B7.1 M7.6 6. M8.7 T3.5 7. P8-9 X1-2 8. X9-8 B7.1 9. X2-4 M6.8 10. M3/5 B7.1 11. M7.6 P8-9',
    moveNotes: [
      'Pháo đầu: Pháo vào lộ giữa, nhắm Tốt đầu e6.',
      'Mã 8 tiến 7 bảo vệ Tốt đầu – nền móng của Bình phong mã.',
      'Mã 2 tiến 3 giữ Tốt giữa, mở đường cho Xe 1.',
      'Xe 9 bình 8 ra quân sớm.',
      'Xe 1 bình 2 chiếm lộ 2, đối mặt Pháo 8 của Đen.',
      'Tốt 7 tiến 1 (g5): mở "chân" g6 cho Mã 7 – chuẩn bị cho nước bàn hà.',
      'Xe qua hà (h6): Xe Đỏ áp sát, dọa ăn Tốt 9 và kìm Mã 7.',
      'Mã 2 tiến 3 hoàn thành Bình phong mã.',
      'Tốt 7 tiến 1 (c4): Đỏ mở chân cho Mã 8 và chặn Tốt 3 của Đen.',
      'Tả mã bàn hà: Mã 7 nhảy lên bờ sông (f5) – Mã rời vị trí bị Xe đè, trở thành quân hoạt động, dọa ăn Tốt 3 (g3).',
      'Mã 8 tiến 7: Đỏ phát triển Mã trái. Nếu Đen tham ăn Tốt 3 bằng Mã thì Mã sẽ lạc sâu trong trận địa Đỏ, Đỏ được thế tấn công bù lại.',
      'Tượng 3 tiến 5 (e7): Đen củng cố trung lộ trước, không vội ăn Tốt.',
      'Pháo 8 bình 9 (a2): mở lộ cho Xe 9, Pháo biên nhắm Tốt 1 (a6).',
      'Xe 1 bình 2 (b9): Xe phải của Đen ra lộ 2, đứng sau Pháo 2.',
      'Xe 9 bình 8 (b0): Xe Đỏ ra quân, nhòm Pháo 2.',
      'Tốt 7 tiến 1 (g4) – nước then chốt: Tốt qua sông dọa ăn Tốt 3, và quan trọng hơn, mở "chân" g5 để Mã f5 đá thẳng vào Xe Đỏ ở h6!',
      'Xe 2 bình 4 (f6): Xe tránh đòn và quay lại tấn công Mã bàn hà ở f5, đồng thời nhòm Sĩ f9.',
      'Mã 6 tiến 8 (h4): Mã né Xe và nhảy sâu hơn, giờ dọa đổi lấy Mã 3 của Đỏ ở g2.',
      'Mã 3 thoái 5 (e1): Mã Đỏ lui về giữa cung (e1) để tránh bị đổi, chờ cơ hội trở lại.',
      'Tốt 7 tiến 1 ăn Tốt 3 (g3): Đen hơn một Tốt, Tốt qua sông áp sát cung Đỏ.',
      'Mã 7 tiến 6 (d4): Mã Đỏ bàn hà ở trung tâm, dọa ăn Tốt đầu e6 hoặc Tốt 3 (c6).',
      'Pháo 8 bình 9 (i7): mở lộ 8 cho Xe tràn xuống, Pháo biên nhắm Tốt 1 (i3). Đen hơn Tốt và có phản công cánh trái Đỏ; Đỏ có Mã trung tâm và hai Xe hoạt động – thế cờ cân bằng, nhiều biến hóa.',
    ],
    summary:
      'Tả mã bàn hà là cách phòng thủ chủ động nhất của Bình phong mã trước Xe qua hà. Thay vì để Mã 7 bị Xe Đỏ đè, Đen nhảy ngay Mã lên bờ sông (f5), biến nó thành mũi nhọn phản công. Kết hợp với Tốt 7 qua sông, Mã bàn hà vừa dọa ăn Tốt 3, vừa có những đòn đá Xe bất ngờ. Đổi lại, Đen phải chấp nhận Đỏ có nhiều không gian và Pháo đầu luôn nhắm vào Tốt đầu. Đây là vũ khí ưa thích của những kỳ thủ thích đối công, không ngại thế cờ phức tạp.',
    ideasRed: [
      'Xe qua hà rồi Xe bình 4 để đuổi Mã bàn hà, giữ áp lực lên hàng 6 của Đen.',
      'Ra Mã 8, Pháo 8 bình 9 và Xe 9 bình 8 thật nhanh.',
      'Mã 7 bàn hà (d4) để uy hiếp Tốt đầu – điểm yếu của Đen khi Mã 7 đã rời g7.',
      'Cảnh giác với nước Tốt 7 qua sông: nó mở chân cho Mã f5 đá vào Xe h6.',
    ],
    ideasBlack: [
      'Mã 7 bàn hà (f5) ngay khi Xe Đỏ qua sông, không để Mã bị đè.',
      'Tốt 7 qua sông vừa tranh Tốt, vừa mở đường cho Mã đá Xe.',
      'Phi tượng sớm (Tượng 3 tiến 5) để Tốt đầu e6 bớt yếu.',
      'Bình Pháo 8 ra biên, mở lộ cho Xe 8 tham gia phản công.',
    ],
    typicalPlans: [
      'Đen: Xe 8 tràn xuống hàng 4 – hàng 3 của Đỏ, phối hợp Mã h4 và Tốt g3 tấn công cánh phải Đỏ.',
      'Đỏ: Mã d4 kết hợp Pháo đầu tấn công Tốt đầu e6, Xe f6 nhòm Sĩ f9.',
      'Đen thường lên Sĩ, củng cố cung rồi mới phản công mạnh.',
      'Đỏ có thể đưa Mã e1 trở lại hoạt động qua d3 hoặc f3 khi cánh phải đã ổn định.',
    ],
    variations: [
      {
        name: 'Đỏ hoành xa (7. X9.1)',
        moves:
          '1. P2-5 M8.7 2. M2.3 X9-8 3. X1-2 B7.1 4. X2.6 M2.3 5. B7.1 M7.6 6. M8.7 T3.5 7. X9.1 S4.5 8. X9-6 P2.2 9. B5.1 B7.1 10. X2-4 M6.7',
        comment:
          'Đỏ ra Xe trái theo hàng ngang sang lộ 6 để tăng cường trung lộ, rồi thúc Tốt giữa. Đen tuần hà Pháo 2, cho Tốt 7 qua sông; khi Xe Đỏ đuổi, Mã bàn hà nhảy vào ăn Tốt 3. Hai bên đối công quyết liệt.',
      },
      {
        name: 'Đỏ cao Pháo (7. P8.1)',
        moves: '1. P2-5 M8.7 2. M2.3 X9-8 3. X1-2 B7.1 4. X2.6 M2.3 5. B7.1 M7.6 6. M8.7 T3.5 7. P8.1 B7.1 8. X2/1 B7.1 9. M3/5 M6/7',
        comment:
          'Pháo 8 tiến 1 lên hàng 3 để sau này có thể bình sang cánh phải giữ lộ 3. Đen vẫn thúc Tốt 7 qua sông ăn Tốt 3, Đỏ lui Mã về e1; Mã đen lùi về g7 củng cố. Đen hơn Tốt nhưng phải phòng thủ kỹ.',
      },
      {
        name: 'Đen hoành xa (6...X1.1)',
        moves: '1. P2-5 M8.7 2. M2.3 X9-8 3. X1-2 B7.1 4. X2.6 M2.3 5. B7.1 M7.6 6. M8.7 X1.1 7. B5.1 B7.1 8. X2-4 B7.1',
        comment:
          'Đen ra Xe 1 theo hàng ngang thay vì phi Tượng. Đỏ lập tức thúc Tốt giữa để mở trung lộ; Đen đáp bằng Tốt 7 qua sông, và khi Xe Đỏ bình 4 đuổi Mã, Tốt ăn luôn Tốt 3.',
      },
    ],
    traps: [
      {
        name: 'Tốt qua sông là mồi nhử',
        moves:
          '1. P2-5 M8.7 2. M2.3 X9-8 3. X1-2 B7.1 4. X2.6 M2.3 5. B7.1 M7.6 6. M8.7 T3.5 7. P8-9 X1-2 8. X9-8 B7.1 9. B3.1 M6/8',
        explanation:
          'Sau 8...B7.1, Tốt đen ở g4 trông như một quân "cho không": Đỏ chỉ cần 9. B3.1 là ăn được. Nhưng mối đe dọa thật sự nằm ở chỗ khác – Tốt rời g5 đã mở "chân" cho Mã f5. Đen đáp 9...M6/8: Mã đá thẳng vào h6 ăn Xe, Đỏ không có quân nào ăn lại. Nước đúng là 9. X2-4 tránh Xe trước. Bài học: khi đối phương đẩy Tốt "biếu không", hãy hỏi Tốt đó vừa mở đường cho quân nào.',
      },
    ],
    famousPlayers: ['Lưu Điện Trung', 'Đào Hán Minh', 'Hồng Trí', 'Tôn Dũng Chinh'],
  },
  {
    id: 'phan-cung-ma',
    name: 'Phản cung mã',
    nameHan: '中炮对反宫马',
    family: 'trung-phao',
    forSide: 'black',
    difficulty: 3,
    moves:
      '1. P2-5 M2.3 2. M2.3 P8-6 3. X1-2 M8.7 4. B3.1 B3.1 5. M8.9 T7.5 6. P8-7 X1-2 7. X9-8 P2.4 8. B7.1 B3.1 9. B3.1 B7.1 10. X2.4 P2-3 11. X8.9 P3.3 12. S6.5 M3/2 13. P5.4 S6.5',
    moveNotes: [
      'Pháo đầu: Pháo vào lộ giữa, nhắm Tốt đầu e6.',
      'Mã 2 tiến 3: Đen lên Mã phải trước để giữ Tốt đầu.',
      'Mã 2 tiến 3: Đỏ giữ Tốt giữa và mở đường cho Xe 1.',
      'Pháo 8 bình 6 (f7): Pháo về "sĩ giác" – nước đặc trưng của Phản cung mã. Pháo f7 che chở cung Tướng và sẽ bảo vệ Mã 7 sắp lên.',
      'Xe 1 bình 2: Xe Đỏ ra lộ 2, nhòm thẳng Mã 8 còn ở h9.',
      'Mã 8 tiến 7: thế Phản cung mã hoàn chỉnh – hai Mã ở c7, g7, Pháo 6 đứng giữa Mã 7 và cung Tướng. Thế trận cân đối, linh hoạt.',
      'Tốt 3 tiến 1 (g4): mở "chân" g3 cho Mã 3 có đường nhảy lên f4 hoặc h4, đồng thời chặn Tốt 7 của Đen.',
      'Tốt 3 tiến 1 (c5): Đen đáp lại tương tự, mở chân cho Mã 3.',
      'Mã 8 tiến 9 (a2): Mã biên, nhường điểm c2 cho Pháo 8.',
      'Tượng 7 tiến 5 (e7): Đen củng cố trung lộ.',
      'Pháo 8 bình 7 (c2): Đỏ dàn thế Ngũ thất pháo, Pháo 7 nhắm Tốt 3 (c5) và Mã 3 phía sau.',
      'Xe 1 bình 2 (b9): Xe phải của Đen ra lộ 2.',
      'Xe 9 bình 8 (b0): Xe Đỏ ra quân, nhòm Pháo 2.',
      'Hữu pháo qua hà (b3): Pháo vượt sông chặn Xe lộ 8, đồng thời dọa ăn Tốt giữa e3 (lấy Tốt c3 làm ngòi).',
      'Đỏ thí Tốt 7 (c4): Tốt rời c3 nên Pháo b3 mất ngòi, hết dọa Tốt giữa; Đỏ chấp nhận mất Tốt để mở lộ 7 cho Pháo.',
      'Tốt 3 ăn Tốt (c4): Đen nhận quân thí, Tốt đã qua sông.',
      'Đỏ thí tiếp Tốt 3 (g5): Tốt dọa ăn Tốt 7 của Đen; mục đích là mở các lộ ở cánh phải cho Xe.',
      'Tốt 7 ăn Tốt (g5): Đen hơn hai Tốt.',
      'Xe 2 tiến 4 (h4): Xe lên tuần hà, nhắm ngay Tốt qua sông ở c4 trên hàng 4.',
      'Pháo 2 bình 3 (c3): phản đòn sắc bén – Pháo dọa ăn Tượng c0 kèm chiếu (lấy Pháo c2 làm ngòi), và lộ 8 mở ra để Xe đen đối mặt Xe Đỏ ở b0.',
      'Xe 8 tiến 9 ăn Xe (b9): Đỏ đổi Xe trước để không bị Xe đen ăn mất.',
      'Pháo 3 tấn 3 ăn Tượng, chiếu Tướng (c0) – Sĩ d0 làm ngòi.',
      'Sĩ 6 tiến 5 (e1): Sĩ rời d0 – Pháo mất ngòi nên hết chiếu.',
      'Mã 3 thoái 2 (b9): Mã ăn lại Xe. Đen đã hơn một Tượng và hai Tốt.',
      'Pháo 5 tấn 4 ăn Tốt đầu, chiếu Tướng (Tượng e7 làm ngòi): Đỏ bắt đầu thu hồi vật chất.',
      'Sĩ 6 tiến 5 (e8) đỡ chiếu. Đen vẫn hơn quân nhưng Pháo c0 nằm sâu và Xe 9 chưa ra; Đỏ có Pháo e6 khống chế trung lộ và Xe tuần hà – thế cờ hai bên đều có cơ hội.',
    ],
    summary:
      'Phản cung mã (Mã phản cung) là một trong những cách phòng thủ phổ biến nhất trước Pháo đầu: Đen lên Mã 3, bình Pháo 8 về sĩ giác (lộ 6) rồi mới lên Mã 7. Pháo 6 vừa che chở cung Tướng, vừa bảo vệ Mã 7, giúp Đen tránh những biến công thẳng mặt của Xe qua hà như với Bình phong mã. Thế trận cân đối, giàu tính phản công, đặc biệt mạnh khi Đen đưa Pháo 2 qua sông. Diễn biến chính dưới đây là biến hiện đại "Ngũ thất pháo thí hai Tốt", rất sắc bén và được các danh thủ hàng đầu nghiên cứu kỹ.',
    ideasRed: [
      'Ngũ thất pháo hoặc Ngũ lục pháo để gây sức ép lên cánh phải của Đen.',
      'Thí Tốt 7, Tốt 3 để mở lộ cho Pháo và Xe tuần hà, đổi lấy thế công.',
      'Khi Mã 3 của Đen rời c7, Pháo đầu thường ăn Tốt đầu kèm chiếu.',
      'Tránh lên Mã 8 sang c2 quá sớm khi lộ 6 của Đen còn mở (xem phần bẫy).',
    ],
    ideasBlack: [
      'Pháo 8 bình 6 trước khi lên Mã 7 – Pháo sĩ giác là "xương sống" của thế trận.',
      'Hữu pháo qua hà (Pháo 2 tấn 4) chặn Xe lộ 8 và nhắm Tốt giữa.',
      'Sẵn sàng nhận Tốt thí rồi phản đòn bằng Pháo 2 bình 3 ăn Tượng.',
      'Phi Tượng, lên Sĩ đúng lúc để giữ cung Tướng vững chắc.',
    ],
    typicalPlans: [
      'Đen: ra Xe 9 sang lộ 6 hoặc lộ 7, đưa Mã b9 trở lại c7 và tận dụng hai Tốt hơn.',
      'Đỏ: Xe tuần hà ăn lại Tốt c4, Pháo e6 và Pháo 7 phối hợp tấn công cung Đen.',
      'Trong các biến chậm, Đỏ thường đưa Pháo đầu sang lộ 4 và thúc Tốt giữa.',
      'Đen dùng Mã 3 nhảy lên d5 – f6 để bảo vệ trung lộ và phản công.',
    ],
    variations: [
      {
        name: 'Ngũ lục pháo đối Phản cung mã (4. P8-6)',
        moves:
          '1. P2-5 M2.3 2. M2.3 P8-6 3. X1-2 M8.7 4. P8-6 X1-2 5. M8.7 P2-1 6. B7.1 B7.1 7. M7.6 S6.5 8. X9.2 X9-8 9. X2.9 M7/8 10. P6-7 T7.5',
        comment:
          'Đỏ đặt Pháo trái ở lộ 6 rồi lên Mã chính, Mã 7 bàn hà. Đen bình Pháo 2 ra biên mở lộ cho Xe, sau đó hai bên đổi một cặp Xe trên lộ 2 của Đỏ. Đỏ bình Pháo 6 sang lộ 7 tạo áp lực lên Tốt 3 của Đen.',
      },
      {
        name: 'Đỏ không thí Tốt (8. B9.1)',
        moves:
          '1. P2-5 M2.3 2. M2.3 P8-6 3. X1-2 M8.7 4. B3.1 B3.1 5. M8.9 T7.5 6. P8-7 X1-2 7. X9-8 P2.4 8. B9.1 S6.5 9. B5.1 X9-6 10. P5-4 X6-7 11. T3.5 M3.4',
        comment:
          'Đỏ tiến Tốt biên mở chân Mã biên thay vì thí Tốt. Đen lên Sĩ, ra Xe 9 theo hàng ngang; Đỏ thúc Tốt giữa rồi bình Pháo đầu sang lộ 4, phi Tượng. Đen nhảy Mã 3 lên d5. Thế cờ chậm và cân bằng.',
      },
      {
        name: 'Pháo đầu Xe qua hà đối Phản cung mã',
        moves: '1. P2-5 M2.3 2. M2.3 P8-6 3. X1-2 M8.7 4. B7.1 B7.1 5. X2.6 S4.5 6. P8.4 T3.5',
        comment:
          'Đỏ chơi Xe qua hà như với Bình phong mã và đưa Pháo 8 qua sông. Đen bình tĩnh lên Sĩ, phi Tượng: Pháo 6 và Mã 7 che chắn tốt nên Xe Đỏ không tìm được mục tiêu dễ dàng.',
      },
    ],
    traps: [
      {
        name: 'Mã trái lên sớm – Pháo sĩ giác thọc sâu',
        moves: '1. P2-5 M2.3 2. M2.3 P8-6 3. M8.7 P6.5 4. X1-2 P6-3',
        explanation:
          'Lên Mã 8 sang c2 trông là nước phát triển rất tự nhiên, nhưng lộ 6 của Đen đang thông suốt. 3...P6.5! – Pháo sĩ giác lao xuống f2, lấy Pháo đầu e2 của Đỏ làm ngòi để nhắm Mã c2. Không quân Đỏ nào ăn được Pháo f2; nếu Mã c2 chạy đi thì Pháo lại nhắm tiếp Pháo b2. Đen ăn được một Mã (4...P6-3) và hơn hẳn quân. Bài học: trước Phản cung mã, hãy ra Xe 1 trước (3. X1-2) và luôn để ý hàng 2 khi Pháo đầu có thể biến thành ngòi.',
      },
    ],
    famousPlayers: ['Hồ Vinh Hoa', 'Hứa Ngân Xuyên', 'Lý Lai Quần', 'Hồng Trí', 'Vương Lâm Na'],
  },
  {
    id: 'don-de-ma',
    name: 'Đơn đề mã hoành xa',
    nameHan: '中炮对单提马横车',
    family: 'trung-phao',
    forSide: 'black',
    difficulty: 3,
    moves: '1. P2-5 M2.3 2. M2.3 X9.1 3. X1-2 X9-4 4. B7.1 X4.3 5. M8.7 M8.9 6. X2.4 X1.1 7. P8-9 B9.1 8. B5.1 X4-8',
    moveNotes: [
      'Pháo đầu: Pháo vào lộ giữa, nhắm Tốt đầu e6.',
      'Mã 2 tiến 3 giữ Tốt đầu – Mã chính duy nhất của Đơn đề mã.',
      'Mã 2 tiến 3: Đỏ giữ Tốt giữa và mở đường cho Xe 1.',
      'Hoành xa: Xe 9 tiến 1 lên hàng 8, chuẩn bị chạy ngang sang lộ 4. Đen ra Xe trước, Mã 8 sẽ lên biên sau.',
      'Xe 1 bình 2: Xe Đỏ ra lộ 2. Pháo 8 ở h7 trông như không được bảo vệ, nhưng thực ra Pháo 2 đang giữ nó qua ngòi Mã 3 trên hàng 7.',
      'Xe 9 bình 4 (d8): Xe ngang chiếm lộ 4 thông suốt, nhòm thẳng xuống Sĩ d0 của Đỏ.',
      'Tốt 7 tiến 1 (c4): Đỏ kìm Tốt 3 của Đen và mở chân cho Mã 8 sau này.',
      'Xe 4 tiến 3 (d5): Xe tuần hà kiểm soát bờ sông, không cho Mã Đỏ bàn hà ở d4.',
      'Mã 8 tiến 7: Đỏ phát triển Mã trái.',
      'Đơn đề mã: Mã 8 lên biên (i7). Chỉ một Mã chính che lộ giữa, Mã kia ở biên để mở đường cho Xe và Pháo cánh trái.',
      'Xe 2 tiến 4 (h4): Xe Đỏ lên tuần hà, giữ hàng 4 và vẫn nhòm Pháo 8.',
      'Xe 1 tiến 1 (a8): Đen có "Song hoành xa" – cả hai Xe đều đã ra hàng 8, sẵn sàng chạy ngang tới lộ cần thiết.',
      'Pháo 8 bình 9 (a2): mở lộ 8 cho Xe 9, Pháo biên nhắm Tốt 1 (a6).',
      'Tốt 9 tiến 1 (i5): mở "chân" i6 cho Mã biên, Mã i7 sẽ có đường nhảy lên h5.',
      'Tốt 5 tiến 1 (e4): Đỏ thúc Tốt giữa giành trung tâm, chuẩn bị cho Pháo đầu và Mã 3 hoạt động.',
      'Xe 4 bình 8 (h5): Xe đen đối đầu Xe Đỏ ở h4, và Pháo 8 phía sau cũng nhắm h4 qua ngòi Xe – Đỏ phải xử lý ngay. Thế cờ cân bằng, Đen phản công rất linh hoạt.',
    ],
    summary:
      'Đơn đề mã (Mã đơn đề) là cách phòng thủ chỉ dùng một Mã chính (c7) che lộ giữa, Mã còn lại lên biên. Đi kèm là Hoành xa: Xe 9 tiến 1 rồi chạy ngang sang lộ 4, sau đó Xe 1 cũng ra hàng 8. Lối chơi này ra Xe rất nhanh, linh hoạt, tránh những biến lý thuyết dài của Bình phong mã, nhưng đòi hỏi Đen hiểu rõ những mối liên kết bảo vệ – chẳng hạn Pháo 8 ở h7 chỉ được bảo vệ "xuyên" qua ngòi Mã 3. Đây là vũ khí của các kỳ thủ thích thế trận mềm dẻo, giàu phản công.',
    ideasRed: [
      'Ra nhanh Xe 1 sang lộ 2, dùng Xe tuần hà kiểm soát hàng 4.',
      'Thúc Tốt giữa (Tốt 5 tiến 1) giành trung tâm khi Đen chỉ có một Mã chính.',
      'Pháo 8 bình 9 mở lộ cho Xe 9 tham chiến.',
      'Đừng tham ăn Pháo 8 ở h7 khi Pháo 2 và Mã 3 của Đen còn trên hàng 7.',
    ],
    ideasBlack: [
      'Hoành xa: Xe 9 tiến 1 rồi bình 4 – có Xe hoạt động trước Đỏ.',
      'Xe tuần hà ở d5 ngăn Mã Đỏ bàn hà.',
      'Mã 8 lên biên, tiến Tốt 9 mở đường cho Mã biên nhảy ra h5.',
      'Song hoành xa: đưa Xe tới đúng lộ đang tranh chấp, phối hợp với Pháo 8 trên lộ 8.',
    ],
    typicalPlans: [
      'Đen: Mã biên nhảy lên h5, Xe và Pháo tập trung trên lộ 8 để phản công cánh phải Đỏ.',
      'Đỏ: Tốt giữa tiến lên, Mã 7 và Mã 3 hỗ trợ trung lộ, Pháo đầu gây áp lực lên Tốt đầu.',
      'Đen thường lên Sĩ, Tượng muộn hơn Bình phong mã để ưu tiên ra Xe.',
      'Khi Đỏ đổi Tốt giữa, Xe ngang của Đen nhanh chóng chiếm các lộ vừa mở.',
    ],
    variations: [
      {
        name: 'Mã biên trước (3...M8.9)',
        moves: '1. P2-5 M2.3 2. M2.3 X9.1 3. X1-2 M8.9 4. M8.7 P8-6 5. P8-9 X1-2 6. X9-8 X9-4',
        comment:
          'Đen lên Mã biên trước rồi bình Pháo 8 về lộ 6, ra Xe 1 sang lộ 2 đối mặt Xe 8 của Đỏ, cuối cùng mới đưa Xe ngang sang lộ 4. Thế trận gọn gàng, Pháo 6 giữ cung Tướng.',
      },
      {
        name: 'Đỏ lên Mã chính, Pháo tuần hà (4. M8.7)',
        moves: '1. P2-5 M2.3 2. M2.3 X9.1 3. X1-2 X9-4 4. M8.7 M8.9 5. P8.2 B3.1 6. P8-3 P8-7',
        comment:
          'Đỏ lên Mã trái, đưa Pháo 8 tuần hà rồi bình sang lộ 3, lấy Tốt 7 làm ngòi nhắm Tượng g9 của Đen. Đen tiến Tốt 3 và bình Pháo 8 sang lộ 7: Pháo đứng sau Tốt 7, đe dọa ngược lại Pháo Đỏ ở g4.',
      },
    ],
    traps: [
      {
        name: 'Xe tham ăn Pháo 8',
        moves: '1. P2-5 M2.3 2. M2.3 X9.1 3. X1-2 X9-4 4. X2.7 P2-8',
        explanation:
          'Sau 3...X9-4, Pháo 8 của Đen ở h7 trông như "bỏ ngỏ": không có Xe, Mã, Tượng nào đứng cạnh giữ. Nếu Đỏ tham ăn 4. X2.7, Đen đáp 4...P2-8! – Pháo 2 ở b7 lấy Mã 3 làm ngòi, nhảy dọc hàng 7 ăn lại Xe ở h7. Đỏ đổi một Xe lấy một Pháo, thiệt hẳn quân. Bài học: muốn biết một quân có được bảo vệ hay không, phải tính cả những Pháo đứng xa trên cùng hàng, cùng cột.',
      },
    ],
    famousPlayers: ['Đào Hán Minh', 'Hứa Ngân Xuyên', 'Lâm Hoành Mẫn'],
  },
  {
    id: 'tam-bo-ho',
    name: 'Tam bộ hổ',
    nameHan: '中炮对左三步虎',
    family: 'trung-phao',
    forSide: 'black',
    difficulty: 3,
    moves:
      '1. P2-5 M8.7 2. M2.3 X9-8 3. B3.1 P8-9 4. M8.7 P2-5 5. X9-8 M2.3 6. B7.1 X1.1 7. X1.1 X8.4 8. X1-4 B7.1 9. X4.3 X1-4 10. P8.3 X8.2 11. B7.1 B3.1',
    moveNotes: [
      'Pháo đầu: Pháo vào lộ giữa, nhắm Tốt đầu e6.',
      'Bước thứ nhất của Tam bộ hổ: Mã 8 tiến 7 bảo vệ Tốt đầu.',
      'Mã 2 tiến 3: Đỏ giữ Tốt giữa.',
      'Bước thứ hai: Xe 9 bình 8 ra quân ngay.',
      'Tốt 3 tiến 1 (g4): Đỏ chưa vội đưa Xe 1 sang lộ 2 (Đen sẽ bình pháo đòi đổi Xe ngay), mà tiến Tốt 3 mở đường cho Mã 3 lên f4.',
      'Bước thứ ba: Pháo 8 bình 9 (i7). Mã 7 – Xe 8 – Pháo 9: ba bước ra quân nhanh như hổ vồ, nên gọi là "Tam bộ hổ". Lộ 8 đã thông, Pháo biên nhắm Tốt 1 (i3).',
      'Mã 8 tiến 7: Đỏ phát triển Mã trái.',
      'Pháo 2 bình 5: Đen chuyển sang Liệt pháo – Pháo đối đầu Pháo đầu của Đỏ trên lộ giữa, nhắm Tốt giữa e3. Đây là hướng phát triển phổ biến nhất của Tam bộ hổ.',
      'Xe 9 bình 8 (b0): Xe trái của Đỏ ra lộ 8.',
      'Mã 2 tiến 3: Đen hoàn thành việc ra hai Mã.',
      'Tốt 7 tiến 1 (c4): Đỏ có thế "Lưỡng đầu xà" – cả hai Tốt 3, Tốt 7 đều đã tiến, hai Mã có đường nhảy ra.',
      'Xe 1 tiến 1 (a8): Đen ra Xe phải theo hàng ngang.',
      'Xe 1 tiến 1 (i1): Đỏ cũng ra Xe phải theo hàng ngang, tránh lộ 2 đang bị Xe đen khống chế.',
      'Xe 8 tiến 4 (h5): Xe đen lên tuần hà, kiểm soát bờ sông.',
      'Xe 1 bình 4 (f1): Xe ngang chiếm lộ 4, nhòm xuống Sĩ f9 của Đen.',
      'Tốt 7 tiến 1 (g5): Đen đòi đổi Tốt để mở đường cho Xe và Mã.',
      'Xe 4 tiến 3 (f4): Xe lên tuần hà, bảo vệ Tốt g4 và giữ hàng 4.',
      'Xe 1 bình 4 (d8): Xe ngang của Đen cũng chiếm lộ 4 (d8), nhòm Sĩ d0 của Đỏ.',
      'Pháo 8 tấn 3 (b5): Pháo lên bờ sông, lấy Tốt g5 làm ngòi để đánh Xe đen ở h5!',
      'Xe 8 tiến 2 (h3): Xe né đòn và thọc xuống hàng 3, dọa ăn Tốt giữa e3 hoặc Tốt 1 (i3).',
      'Tốt 7 tiến 1 (c5): Đỏ dọa ăn Tốt 3 của Đen; Tốt c5 cũng làm ngòi để Pháo b5 nhắm Tốt g5.',
      'Tốt 3 ăn Tốt (c5): Đen đổi Tốt, mở chân cho Mã 3 – Mã c7 lập tức dọa ăn Pháo b5. Thế cờ cân bằng, cả hai bên đều có Xe hoạt động.',
    ],
    summary:
      'Tam bộ hổ (Hổ ba bước) là cách phòng thủ ra quân nhanh: Mã 8 tiến 7, Xe 9 bình 8 rồi Pháo 8 bình 9 – chỉ ba nước đã có Xe trên lộ thông. Vì Pháo đã dạt ra biên, Xe đen trên lộ 8 sẵn sàng đối đầu Xe Đỏ, nên Đỏ thường không vội đưa Xe 1 sang lộ 2. Tam bộ hổ rất hay chuyển sang Liệt pháo (Pháo 2 bình 5) để đối công trên lộ giữa. Đen cần nhớ thứ tự nước đi: bình Pháo ra biên khi Xe Đỏ đã ở lộ 2 có thể bị đổi Xe rồi mất Tốt đầu (xem phần bẫy).',
    ideasRed: [
      'Tiến Tốt 3 hoặc Tốt 7 trước, chưa vội Xe 1 bình 2 khi lộ 8 của Đen đã thông.',
      'Ra Xe phải theo hàng ngang (Xe 1 tiến 1 rồi bình 4) để tránh bị Xe đen đối đầu.',
      'Thế Lưỡng đầu xà giúp hai Mã Đỏ cùng hoạt động.',
      'Dùng Pháo lên bờ sông đánh ngang vào Xe tuần hà của Đen.',
    ],
    ideasBlack: [
      'Ba bước Mã 7 – Xe 8 – Pháo 9 để có Xe hoạt động thật sớm.',
      'Chuyển sang Liệt pháo (Pháo 2 bình 5) để phản công lộ giữa.',
      'Ra Xe 1 theo hàng ngang sang lộ 4, phối hợp với Xe tuần hà.',
      'Đúng thứ tự: chỉ bình Pháo 8 ra biên khi việc đổi Xe không làm Tốt đầu mất người bảo vệ.',
    ],
    typicalPlans: [
      'Đen: hai Xe tuần hà và lộ 4 phối hợp với Liệt pháo tấn công lộ giữa và cánh phải Đỏ.',
      'Đỏ: Mã 3 nhảy lên f4 hoặc e5, Xe tuần hà giữ hàng 4, Pháo lên bờ sông kìm Xe đen.',
      'Cả hai bên thường đổi Tốt 3 – Tốt 7 để mở lộ cho Mã và Xe.',
      'Trong biến không chuyển Liệt pháo, Đen lên Sĩ, Mã 2 lên 3 và giữ thế phòng thủ chắc chắn.',
    ],
    variations: [
      {
        name: 'Giữ Tam bộ hổ, Xe kỵ hà (4...B7.1)',
        moves: '1. P2-5 M8.7 2. M2.3 X9-8 3. B7.1 P8-9 4. M8.7 B7.1 5. X1.1 X8.5 6. T7.9 S4.5 7. X1-6 M2.3',
        comment:
          'Đen không chuyển Liệt pháo mà tiến Tốt 7, đưa Xe 8 lên "kỵ hà" (h4) chặn Tốt 3 của Đỏ. Đỏ ra Xe ngang sang lộ 6, phi Tượng biên; Đen lên Sĩ và Mã 2. Thế trận vững chắc, chậm rãi.',
      },
      {
        name: 'Xe kỵ hà chuyển Liệt pháo (4...X8.5)',
        moves: '1. P2-5 M8.7 2. M2.3 X9-8 3. B7.1 P8-9 4. M8.7 X8.5 5. B5.1 P2-5 6. M7.5 M2.3 7. P8-7 X1-2 8. B7.1 B7.1',
        comment:
          'Xe 8 lên ngay bờ sông; Đỏ thúc Tốt giữa và Đen lập tức chuyển Liệt pháo. Mã Đỏ nhảy vào trung tâm (e3), Pháo 8 bình 7, rồi cả hai bên cùng tiến Tốt 7. Biến đối công sắc bén trên lộ giữa.',
      },
    ],
    traps: [
      {
        name: 'Sai thứ tự Tam bộ hổ – mất Tốt đầu',
        moves: '1. P2-5 M8.7 2. M2.3 X9-8 3. X1-2 P8-9 4. X2.9 M7/8 5. P5.4 M2.3 6. P5/2',
        explanation:
          'Đi "theo bài" ba bước khi Xe Đỏ đã ở lộ 2 là sai lầm: lộ 8 mở ra và Đỏ đổi Xe ngay 4. X2.9. Đen buộc phải ăn lại bằng Mã 4...M7/8 – Mã rời g7 nên Tốt đầu e6 mất người bảo vệ. 5. P5.4 Pháo đầu ăn Tốt giữa, Đen đuổi Pháo bằng 5...M2.3 thì Pháo lui về tuần hà (e4) vẫn khống chế lộ giữa. Đỏ hơn Tốt, Đen chậm phát triển vì Mã đã phải lui về chỗ cũ. Bài học: thứ tự nước đi trong khai cuộc quan trọng không kém bản thân các nước đi.',
      },
    ],
    famousPlayers: ['Diêm Văn Thanh', 'Trương Cường', 'Từ Thiên Hồng', 'Kim Ba'],
  },

  // ======================= THUẬN PHÁO / NGHỊCH PHÁO =======================
  {
    id: 'thuan-phao-truc-xa-hoanh-xa',
    name: 'Thuận pháo trực xa đối hoành xa',
    nameHan: '顺炮直车对横车',
    family: 'thuan-nghich',
    forSide: 'black',
    difficulty: 3,
    moves:
      '1. P2-5 P8-5 2. M2.3 M8.7 3. X1-2 X9.1 4. M8.7 X9-4 5. B3.1 M2.3 6. B7.1 X1.1 7. T7.9 X4.5 8. M3.4 X4-3 9. X9-7 B3.1 10. X2.5 P2.4',
    moveNotes: [
      'Pháo đầu: Pháo vào lộ giữa, nhắm Tốt đầu e6.',
      'Thuận pháo: Đen cũng đặt Pháo vào lộ giữa bằng Pháo 8 – cùng phía với Pháo Đỏ vừa đi. Pháo đen nhắm ngay Tốt giữa e3 (nếu ăn được còn chiếu Tướng).',
      'Mã 2 tiến 3: Đỏ bảo vệ Tốt giữa, đồng thời mở đường cho Xe 1.',
      'Mã 8 tiến 7: Đen cũng giữ Tốt đầu.',
      'Trực xa: Xe 1 bình 2 – Xe đi thẳng ra lộ 2 thông suốt.',
      'Hoành xa: Xe 9 tiến 1 lên hàng 8, chuẩn bị chạy ngang sang lộ 4 hoặc lộ 6.',
      'Mã 8 tiến 7: Đỏ phát triển Mã trái.',
      'Xe 9 bình 4 (d8): Xe ngang chiếm lộ 4, nhòm xuống Sĩ d0 của Đỏ.',
      'Tốt 3 tiến 1 (g4): mở "chân" g3 cho Mã 3 có đường lên f4.',
      'Mã 2 tiến 3: Đen hoàn thành việc ra hai Mã.',
      'Tốt 7 tiến 1 (c4): Đỏ có thế "Lưỡng đầu xà" – hai Tốt 3, Tốt 7 cùng tiến.',
      'Xe 1 tiến 1 (a8): Đen có "Song hoành xa" – cả hai Xe đều ra hàng 8.',
      'Tượng 7 tiến 9 (a2): Tượng biên bảo vệ Tốt c4 và giữ chắc cánh trái.',
      'Xe 4 tiến 5 (d3): Xe đen thọc sâu xuống hàng 3 của Đỏ, dọa ăn Tốt giữa e3 và Tốt 9 (a3).',
      'Mã 3 tiến 4 (f4): Mã Đỏ nhảy lên, đá thẳng vào Xe d3, đồng thời nhắm Tốt đầu e6 và Tốt 7 (g6).',
      'Xe 4 bình 3 (c3): Xe né Mã sang c3, dọa ăn Mã 7 ở c2 và các Tốt trên hàng 3.',
      'Xe 9 bình 7 (c0): Xe Đỏ đứng sau bảo vệ Mã c2.',
      'Tốt 3 tiến 1 (c5) – nước rất quan trọng: Tốt rời c6 mở "chân" cho Mã 3, Mã c7 lập tức kiểm soát điểm d5, chặn đường Mã f4 nhảy vào bắt đôi.',
      'Xe 2 tiến 5 (h5): Xe Đỏ qua hà, dọa ăn Tốt c5 trên hàng 5.',
      'Pháo 2 tấn 4 (b3): Pháo vượt sông, lấy chính Xe c3 làm ngòi để nhắm Tốt giữa e3. Hai bên đối công quyết liệt, thế cờ cân bằng.',
    ],
    summary:
      'Thuận pháo (Pháo cùng chiều) là khi Đen đáp Pháo đầu bằng Pháo đầu của mình, dùng Pháo cùng phía với Pháo Đỏ vừa đi. Đây là một trong những khai cuộc cổ xưa nhất, đã được phân tích trong cổ phổ Quất Trung Bí. Hệ thống "Trực xa đối Hoành xa" là phổ biến nhất: Đỏ ra Xe thẳng sang lộ 2, còn Đen ra Xe theo hàng ngang sang lộ 4. Hai bên đều có Pháo ở lộ giữa nên thế cờ đối công, nhiều đòn chiến thuật trên trung lộ và trên hàng 3 – hàng 7.',
    ideasRed: [
      'Bảo vệ Tốt giữa ngay (Mã 2 tiến 3) vì Pháo giữa của Đen đã nhắm vào nó.',
      'Trực xa ra lộ 2, Lưỡng đầu xà mở đường cho hai Mã.',
      'Khi Xe đen thọc sâu, dùng Mã nhảy lên đá Xe và tìm đòn bắt đôi.',
      'Xe qua hà ở cánh phải để gây áp lực lên Tốt và Mã của Đen.',
    ],
    ideasBlack: [
      'Thuận pháo đối đầu trực diện trên lộ giữa, nhắm Tốt giữa của Đỏ.',
      'Hoành xa sang lộ 4 rồi Song hoành xa – hai Xe ra rất nhanh.',
      'Xe thọc sâu xuống hàng 3 để quấy rối, ăn Tốt khi có cơ hội.',
      'Luôn giữ điểm d5 cho Mã 3 (Tốt 3 tiến 1 đúng lúc) để tránh đòn bắt đôi của Mã Đỏ.',
    ],
    typicalPlans: [
      'Đen: Xe c3 và Pháo b3 phối hợp tấn công Tốt giữa và cánh trái Đỏ.',
      'Đỏ: Xe qua hà ăn Tốt c5, Mã f4 nhảy vào e6 hoặc g6 tạo áp lực lên cung Tướng.',
      'Cả hai bên đều có thể đổi Pháo giữa để giảm căng thẳng ở lộ giữa.',
      'Khi các Xe đã sâu trong trận địa đối phương, ai tính toán chính xác hơn sẽ nắm quyền chủ động.',
    ],
    variations: [
      {
        name: 'Đỏ Xe tuần hà (5. X2.4)',
        moves: '1. P2-5 P8-5 2. M2.3 M8.7 3. X1-2 X9.1 4. M8.7 X9-4 5. X2.4 M2.3 6. B7.1 X1.1',
        comment:
          'Đỏ đưa Xe 2 lên bờ sông (h4) để giữ hàng 4, ngăn Xe ngang của Đen thọc sâu. Đen lên Mã 3 và ra nốt Xe 1 – thế trận chắc chắn, chậm hơn diễn biến chính.',
      },
      {
        name: 'Đen Mã biên (5. B7.1 M2.1)',
        moves: '1. P2-5 P8-5 2. M2.3 M8.7 3. X1-2 X9.1 4. M8.7 X9-4 5. B7.1 M2.1 6. X2.4 X4.5 7. P8.4 S4.5',
        comment:
          'Đen lên Mã 2 ra biên để mở đường cho Xe 1 và Pháo 2. Đỏ Xe tuần hà, Đen cho Xe 4 thọc xuống d3; Đỏ đưa Pháo 8 qua sông (b6) gây áp lực, Đen lên Sĩ củng cố.',
      },
    ],
    traps: [
      {
        name: 'Lên Sĩ chậm một nhịp – Mã bắt đôi',
        moves:
          '1. P2-5 P8-5 2. M2.3 M8.7 3. X1-2 X9.1 4. M8.7 X9-4 5. B3.1 M2.3 6. B7.1 X1.1 7. T7.9 X4.5 8. M3.4 X4-3 9. X9-7 S4.5 10. M4.6 X3-1 11. M6.7',
        explanation:
          'Ở nước thứ 9, lên Sĩ là nước "an toàn" quen tay, nhưng nó bỏ qua mối nguy ở điểm d5. 10. M4.6! – Mã f4 nhảy vào d5, cùng lúc đá Xe c3 và Mã c7 (Mã c7 không có quân bảo vệ). Xe phải chạy (10...X3-1 ăn Tốt a3), và 11. M6.7 Mã ăn gọn Mã c7. Đỏ hơn một Mã đổi một Tốt. Nước đúng là 9...B3.1: Tốt rời c6 mở chân cho Mã c7 canh giữ điểm d5.',
      },
    ],
    famousPlayers: ['Hồ Vinh Hoa', 'Triệu Quốc Vinh', 'Hứa Ngân Xuyên', 'Hồng Trí', 'Vương Bân'],
  },
  {
    id: 'nghich-phao-liet-phao',
    name: 'Nghịch pháo (Liệt pháo) – Hậu bổ liệt pháo',
    nameHan: '中炮过河车对后补列炮',
    family: 'thuan-nghich',
    forSide: 'black',
    difficulty: 4,
    moves:
      '1. P2-5 M8.7 2. M2.3 X9-8 3. X1-2 P2-5 4. X2.6 P8-9 5. X2.3 M7/8 6. M8.7 M2.3 7. X9-8 X1.1 8. P8.6 B3.1 9. B3.1 S6.5 10. X8.4 B1.1 11. P8/2 X1-4 12. P8-7 T3.1',
    moveNotes: [
      'Pháo đầu: Pháo vào lộ giữa, nhắm Tốt đầu e6.',
      'Mã 8 tiến 7 bảo vệ Tốt đầu.',
      'Mã 2 tiến 3 giữ Tốt giữa.',
      'Xe 9 bình 8 ra quân sớm.',
      'Xe 1 bình 2: Xe Đỏ ra lộ 2, nhòm Pháo 8 của Đen.',
      'Hậu bổ liệt pháo: Pháo 2 mới vào lộ giữa – Pháo ở phía ngược với Pháo Đỏ nên gọi là Nghịch pháo (Liệt pháo). Pháo đen nhắm ngay Tốt giữa e3.',
      'Xe qua hà (h6): Xe Đỏ áp sát, dọa ăn Tốt 7 (g6) hoặc Tốt 9 (i6).',
      'Bình pháo đổi xe: Pháo 8 dạt ra biên, mở lộ 8 cho Xe đen đối mặt Xe Đỏ ở h6.',
      'Xe 2 tiến 3 ăn Xe (h9): Đỏ chấp nhận đổi Xe.',
      'Mã 7 thoái 8 (h9): Mã ăn lại Xe. Mỗi bên còn một Xe.',
      'Mã 8 tiến 7: Đỏ phát triển Mã trái.',
      'Mã 2 tiến 3 (c7): Mã chính lên giữ Tốt đầu e6 – Mã 7 vừa phải lui về h9.',
      'Xe 9 bình 8 (b0): Xe còn lại của Đỏ ra lộ 8, đứng sau Pháo 8. Pháo 2 của Đen đã rời cột b nên Pháo Đỏ có thể thọc sâu.',
      'Xe 1 tiến 1 (a8): Đen ra Xe theo hàng ngang.',
      'Pháo 8 tấn 6 (b8): Pháo thọc sâu xuống hàng 8 của Đen, được Xe b0 bảo vệ phía sau – Xe ngang a8 bị chặn, không chạy sang phải được.',
      'Tốt 3 tiến 1 (c5): mở "chân" c6 cho Mã 3.',
      'Tốt 3 tiến 1 (g4): Đỏ tiến Tốt 3, chuẩn bị cho Mã 3 lên f4.',
      'Sĩ 6 tiến 5: Đen củng cố cung Tướng.',
      'Xe 8 tiến 4 (b4): Xe Đỏ lên tuần hà, giữ hàng 4.',
      'Tốt 1 tiến 1 (a5): Tốt biên tiến lên, mở cột a cho Xe ngang của Đen.',
      'Pháo 8 thoái 2 (b6): Pháo lui về hàng 6, lấy Tốt đầu e6 làm ngòi nhắm Tốt 7 (g6) – đồng thời nhả đường cho Xe a8.',
      'Xe 1 bình 4 (d8): Xe đen chiếm lộ 4, nhòm xuống Sĩ d0.',
      'Pháo 8 bình 7 (c6): nước hiểm – Pháo dọa tấn 3 ăn Tượng c9, lấy Sĩ d9 làm ngòi để chiếu bí ngay!',
      'Tượng 3 lên 1 (a7): Đen cất Tượng khỏi c9, hóa giải đòn chiếu bí. Hai bên đều có thế hoạt động, cân bằng.',
    ],
    summary:
      'Nghịch pháo (còn gọi Liệt pháo) là khi Đen đặt Pháo vào lộ giữa bằng Pháo ở phía ngược với Pháo Đỏ (1. P2-5 P2-5). Ngày nay Liệt pháo thường xuất hiện theo lối "Hậu bổ liệt pháo": Đen lên Mã, ra Xe trước rồi mới đưa Pháo 2 vào lộ giữa, tránh những biến công sớm của Đỏ. Hai Pháo giữa đối đầu khiến lộ giữa luôn căng thẳng: Tốt giữa của cả hai bên đều bị nhắm. Diễn biến chính là biến Xe qua hà hiện đại: Đen bình pháo đổi Xe, sau đó hai bên tranh giành các lộ ở cánh trái của Đen.',
    ideasRed: [
      'Xe qua hà rồi đổi Xe khi Đen bình pháo, giữ thế chủ động.',
      'Pháo 8 thọc sâu (b8) kìm Xe ngang của Đen, Xe 8 tuần hà yểm trợ.',
      'Tìm đòn Pháo đáy: Pháo trên hàng 9 của Đen lấy Sĩ làm ngòi để chiếu bí.',
      'Khi Mã 7 của Đen phải lui về h9, Tốt đầu e6 trở thành mục tiêu của Pháo đầu.',
    ],
    ideasBlack: [
      'Hậu bổ liệt pháo: ra Mã, ra Xe trước rồi mới đưa Pháo 2 vào lộ giữa.',
      'Pháo giữa nhắm Tốt giữa e3, buộc Đỏ luôn giữ Mã 3 bảo vệ.',
      'Bình pháo đổi Xe để giảm sức ép của Xe qua hà.',
      'Lên Sĩ, phi Tượng đúng lúc để chống các đòn Pháo đáy.',
    ],
    typicalPlans: [
      'Đen: Xe 4 xuống sâu, Mã 3 nhảy lên d5 hoặc b5, Pháo biên trở lại lộ 7 tham chiến.',
      'Đỏ: Mã 3 lên f4 – e6, Pháo 7 và Pháo đầu phối hợp tấn công cung Tướng Đen.',
      'Hai bên có thể đổi Pháo giữa; khi đó thế cờ chuyển sang so tài Xe – Mã – Pháo bình thường.',
      'Cả hai bên phải luôn kiểm tra Tốt giữa và các đòn chiếu trên lộ giữa.',
    ],
    variations: [
      {
        name: 'Liệt pháo trực tiếp (1...P2-5)',
        moves: '1. P2-5 P2-5 2. M2.3 M2.3 3. X1-2 P8-7 4. M8.7 M8.9',
        comment:
          'Đen vào Pháo giữa ngay nước đầu. Hai bên cùng lên Mã 3; Đen bình Pháo 8 sang lộ 7 rồi lên Mã biên. Đây là hình thức cổ điển của Liệt pháo, ngày nay ít gặp hơn ở đỉnh cao vì Đỏ dễ giữ thế tiên.',
      },
      {
        name: 'Đỏ song trực xa (4. M8.7)',
        moves: '1. P2-5 M8.7 2. M2.3 X9-8 3. X1-2 P2-5 4. M8.7 M2.3 5. X9-8 P8.4 6. B3.1 B3.1 7. P8.4 P8-7 8. P8-7 T3.1',
        comment:
          'Đỏ không cho Xe qua hà mà ra cả hai Xe trực xa. Đen dùng Pháo 8 phong xa (h3), rồi bình sang g3 nhắm Tượng g0 và mở lộ cho Xe 8 đối mặt Xe Đỏ. Đỏ đáp bằng Pháo 8 qua sông bình sang c6 nhắm Tượng c9; Đen lên Tượng biên.',
      },
    ],
    traps: [
      {
        name: 'Pháo đáy chiếu bí',
        moves:
          '1. P2-5 M8.7 2. M2.3 X9-8 3. X1-2 P2-5 4. X2.6 P8-9 5. X2.3 M7/8 6. M8.7 M2.3 7. X9-8 X1.1 8. P8.6 B3.1 9. B3.1 S6.5 10. X8.4 B1.1 11. P8/2 X1-4 12. P8-7 M8.7 13. P7.3',
        explanation:
          'Nước 12. P8-7 trông như chỉ là một nước điều Pháo bình thường, và Đen "tranh thủ" đưa Mã h9 trở lại g7 (12...M8.7). Nhưng 13. P7.3! – Pháo ăn Tượng c9, lấy Sĩ d9 làm ngòi chiếu Tướng. Tướng không lên được e8 (đã có Sĩ), sang f9 cũng vẫn nằm trên đường Pháo, không quân nào chặn được: chiếu bí! Nước đúng là 12...T3.1 cất Tượng đi. Bài học: khi Sĩ đứng ở cạnh Tướng trên hàng cuối, hãy coi chừng Pháo đối phương chui xuống đáy.',
      },
    ],
    famousPlayers: ['Hồng Trí', 'Hồ Vinh Hoa', 'Miêu Vĩnh Bằng', 'Diêm Văn Thanh'],
  },

  // ======================= TIÊN NHÂN CHỈ LỘ =======================
  {
    id: 'tien-nhan-chi-lo',
    name: 'Tiên nhân chỉ lộ',
    nameHan: '仙人指路',
    family: 'tien-nhan',
    forSide: 'red',
    difficulty: 2,
    moves:
      '1. B7.1 P8-5 2. M2.3 M8.7 3. X1-2 X9-8 4. M8.7 X8.4 5. P2-1 X8.5 6. M3/2 M2.1 7. T7.5 P2-4 8. X9-8 X1-2 9. P8.6 B7.1',
    moveNotes: [
      'Tiên nhân chỉ lộ ("Tiên ông chỉ đường"): Tốt 7 tiến 1 (c4). Nước thăm dò rất linh hoạt – mở đường cho Mã 8 và Tượng, chưa để lộ ý đồ; tùy cách đáp của Đen, Đỏ có thể chuyển sang Pháo đầu, Phi tượng hay Bình phong mã.',
      'Đen đáp bằng Pháo đầu (Pháo 8 bình 5), giành lấy thế chủ động ở lộ giữa và nhắm ngay Tốt giữa e3 (nếu ăn được còn chiếu Tướng).',
      'Mã 2 tiến 3: Đỏ bảo vệ Tốt giữa.',
      'Mã 8 tiến 7: Đen giữ Tốt đầu.',
      'Xe 1 bình 2: Xe Đỏ ra lộ 2 thông suốt.',
      'Xe 9 bình 8: Xe đen ra lộ 8, đối diện Pháo 2 của Đỏ.',
      'Mã 8 tiến 7: Đỏ có hai Mã che lộ giữa như Bình phong mã – nhưng Tốt 7 đã tiến sẵn, nghĩa là Đỏ chơi Bình phong mã "hơn một nước".',
      'Xe 8 tiến 4 (h5): Xe đen lên tuần hà, kiểm soát bờ sông.',
      'Pháo 2 bình 1 (i2): Pháo ra biên mở lộ 2 – Xe Đỏ đối mặt Xe đen, Đỏ đòi đổi Xe. Pháo biên còn nhắm Tốt 9 (i6) của Đen.',
      'Xe 8 tiến 5 ăn Xe (h0): Đen đổi Xe.',
      'Mã 3 thoái 2 (h0): Mã ăn lại Xe. Thế trận đơn giản hơn, mỗi bên còn một Xe.',
      'Mã 2 tiến 1 (a7): Đen lên Mã biên để mở đường cho Pháo 2 và Xe 1.',
      'Tượng 7 tiến 5 (e2): Đỏ củng cố trung lộ, Tượng giữ chắc Tốt c4.',
      'Pháo 2 bình 4 (d7): Pháo về sĩ giác, rời cột b để Xe 1 ra lộ 2 an toàn.',
      'Xe 9 bình 8 (b0): Xe còn lại của Đỏ chiếm lộ 8.',
      'Xe 1 bình 2 (b9): Xe đen ra lộ 2, nhòm thẳng Pháo b2 của Đỏ (Pháo này được Xe b0 bảo vệ).',
      'Pháo 8 tấn 6 (b8): Pháo thọc sâu, đứng sát Xe đen và được Xe b0 bảo vệ phía sau – Xe đen bị kìm, không xuống được cột b.',
      'Tốt 7 tiến 1 (g5): Đen mở chân cho Mã 7. Thế cờ cân bằng; Đỏ có Pháo b8 gây khó chịu, Đen có Pháo đầu hoạt động.',
    ],
    summary:
      'Tiên nhân chỉ lộ (Tốt 7 tiến 1) là khai cuộc mềm dẻo bậc nhất của cờ tướng. Chỉ bằng một bước Tốt, Đỏ mở đường cho Mã và Tượng mà chưa cam kết thế trận – sau đó có thể chuyển sang Pháo đầu, Phi tượng hoặc thế Bình phong mã tùy cách đáp của đối phương. Các cách đáp chính của Đen là Tốt để pháo (Pháo 2 bình 3), Đối binh (Tốt 7 tiến 1), Phi tượng và Pháo đầu. Diễn biến chính cho thấy cách đối phó với Pháo đầu: Đỏ dựng Bình phong mã với Tốt 7 đã tiến sẵn, rồi bình Pháo ra biên để đổi Xe.',
    ideasRed: [
      'Giữ sự linh hoạt: chỉ quyết định thế trận sau khi thấy cách đáp của Đen.',
      'Tốt 7 tiến mở chân Mã 8, giúp Mã nhanh chóng bàn hà qua d4.',
      'Trước Pháo đầu của Đen, dựng Bình phong mã "hơn một nước".',
      'Bình Pháo ra biên để đổi Xe khi Xe đen tuần hà ở lộ 8.',
    ],
    ideasBlack: [
      'Tốt để pháo (Pháo 2 bình 3) để nhắm ngay Tốt c4 vừa tiến.',
      'Đối binh (Tốt 7 tiến 1) giữ thế cân bằng đối xứng.',
      'Pháo đầu (Pháo 8 bình 5) để giành thế chủ động ở lộ giữa.',
      'Ra Xe đúng thứ tự: dời Pháo 2 khỏi cột b trước khi đưa Xe 1 sang lộ 2.',
    ],
    typicalPlans: [
      'Đỏ: Mã 7 bàn hà (d4), Pháo b8 phối hợp Xe 8 kìm cánh phải của Đen.',
      'Đen: Pháo đầu và Mã 7 hoạt động ở trung lộ, Xe 2 tìm cách đổi Pháo b8.',
      'Sau khi đổi Xe sớm, thế cờ chuyển nhanh sang trung cuộc ít quân, đề cao kỹ thuật.',
      'Trong biến Đối binh, hai bên thường ra Xe theo hàng ngang rồi tranh lộ 3 – lộ 7.',
    ],
    variations: [
      {
        name: 'Đối binh (1...B7.1)',
        moves: '1. B7.1 B7.1 2. M8.7 M8.7 3. X9.1 T7.5 4. T3.5 M2.1 5. X9-3 P8/2 6. B3.1 B7.1 7. X3.3 P8-7 8. X3-2 X1.1',
        comment:
          'Đen đáp đối xứng bằng Tốt 7. Đỏ ra Xe trái theo hàng ngang sang lộ 3, rồi chủ động đổi Tốt 3 để Xe chiếm bờ sông; Đen lui Pháo 8 về hàng 9 rồi bình sang lộ 7 đuổi Xe. Thế cờ cân bằng, giàu tính chiến lược.',
      },
      {
        name: 'Đối binh – Binh để pháo (2. P2-3)',
        moves: '1. B7.1 B7.1 2. P2-3 P8-5 3. M8.7 M8.7 4. T7.5 M7.6 5. S6.5 M2.3',
        comment:
          'Đỏ đặt Pháo 2 ngay sau Tốt 3 (g2), nhắm cột g nơi Tốt 7 của Đen vừa tiến. Đen đáp bằng Pháo đầu và nhảy Mã 7 lên bàn hà f5; Đỏ phi Tượng, lên Sĩ giữ vững.',
      },
      {
        name: 'Đen phi tượng (1...T3.5)',
        moves: '1. B7.1 T3.5 2. M8.7 B7.1 3. P8-9 M2.3 4. X9-8 X1-2 5. P2-6 M8.7 6. M2.3 M7.6',
        comment:
          'Đen phi Tượng giữ thế vững. Đỏ lên Mã trái, bình Pháo ra biên để ra Xe 9, rồi đưa Pháo 2 về lộ 6. Đen nhảy Mã 7 bàn hà ở f5. Hai bên đều chơi chậm, nhiều thế đấu chiến lược.',
      },
    ],
    traps: [
      {
        name: 'Ra Xe vào đường ngắm của Pháo',
        moves:
          '1. B7.1 P8-5 2. M2.3 M8.7 3. X1-2 X9-8 4. M8.7 X8.4 5. P2-1 X8.5 6. M3/2 M2.1 7. T7.5 X1-2 8. P8.7 M1/2',
        explanation:
          'Sau khi Mã 2 lên biên, đưa Xe 1 sang lộ 2 (7...X1-2) là nước ra quân rất tự nhiên. Nhưng trên cột b, giữa Pháo b2 của Đỏ và Xe b9 chỉ có đúng một quân – Pháo b7 của chính Đen. 8. P8.7! Pháo nhảy qua ngòi ăn Xe; Đen chỉ lấy lại được Pháo bằng Mã (8...M1/2) – mất Xe đổi Pháo, thiệt hẳn quân. Nước đúng là 7...P2-4 dời Pháo khỏi cột b trước. Bài học: Pháo của mình cũng có thể làm ngòi cho Pháo đối phương.',
      },
    ],
    famousPlayers: ['Hồ Vinh Hoa', 'Liễu Đại Hoa', 'Lữ Khâm', 'Đào Hán Minh', 'Từ Thiên Hồng'],
  },
  {
    id: 'tien-nhan-chi-lo-tot-de-phao',
    name: 'Tiên nhân chỉ lộ đối Tốt để pháo',
    nameHan: '仙人指路对卒底炮',
    family: 'tien-nhan',
    forSide: 'black',
    difficulty: 3,
    moves: '1. B7.1 P2-3 2. P2-5 T3.5 3. M2.3 B3.1 4. M8.9 B3.1 5. X9-8 X9.1 6. X1-2 X9-4 7. P5.4 S4.5 8. P5-1 M8.9 9. S6.5 X4.4',
    moveNotes: [
      'Tiên nhân chỉ lộ: Tốt 7 tiến 1 (c4), mở đường cho Mã 8 và thăm dò ý đồ của Đen.',
      'Tốt để pháo: Pháo 2 bình 3 (c7) đứng ngay sau Tốt 3, lấy Tốt c6 làm ngòi nhắm thẳng Tốt c4 vừa tiến của Đỏ. Đen phản ứng tức thì với nước thăm dò.',
      'Đỏ vào Pháo đầu bằng Pháo 2 (phía đối diện Tốt 7): không giữ Tốt c4 mà phản công – Pháo đầu nhắm ngay Tốt đầu e6 của Đen.',
      'Tượng 3 tiến 5 (e7): Đen phi Tượng trái củng cố trung lộ, chuẩn bị thúc Tốt 3.',
      'Mã 2 tiến 3: Đỏ bảo vệ Tốt giữa và mở đường cho Xe 1.',
      'Tốt 3 tiến 1 (c5): Tốt đen áp sát, dọa ăn Tốt c4.',
      'Mã 8 tiến 9 (a2): Đỏ chấp nhận mất Tốt c4 để ra quân nhanh; Mã biên mở đường cho Xe 9.',
      'Tốt 3 ăn Tốt (c4): Đen hơn một Tốt, và Pháo c7 giờ lấy Tốt c4 làm ngòi nhắm thẳng Tượng c0 của Đỏ!',
      'Xe 9 bình 8 (b0): Xe ra quân và đứng cạnh, bảo vệ Tượng c0.',
      'Hoành xa: Xe 9 tiến 1 (i8), chuẩn bị chạy ngang sang lộ 4.',
      'Xe 1 bình 2: Xe Đỏ ra lộ 2, nhòm Pháo 8. Pháo này được Pháo 3 bảo vệ "xuyên" qua ngòi Tượng e7.',
      'Xe 9 bình 4 (d8): Xe ngang chiếm lộ 4, nhòm Sĩ d0.',
      'Pháo 5 tấn 4 ăn Tốt đầu, chiếu Tướng (Tượng e7 làm ngòi): Đỏ bắt đầu lấy lại vật chất.',
      'Sĩ 4 tiến 5: Đen đỡ chiếu.',
      'Pháo 5 bình 1 ăn Tốt 9 (i6): Pháo nhảy qua ngòi Tốt 7 ăn thêm Tốt biên. Đỏ hơn lại một Tốt.',
      'Mã 8 tiến 9 (i7): Đen ra nốt Mã, Mã biên áp sát Pháo i6 của Đỏ.',
      'Sĩ 6 tiến 5: Đỏ củng cố cung Tướng.',
      'Xe 4 tiến 4 (d4): Xe đen vượt sông, áp sát trận địa Đỏ. Đỏ hơn một Tốt nhưng Đen ra quân nhanh hơn – thế cờ cân bằng, nhiều tranh chấp.',
    ],
    summary:
      'Tốt để pháo (Pháo đặt sau Tốt) là cách đáp sắc bén nhất trước Tiên nhân chỉ lộ: Pháo 2 bình 3 đứng ngay sau Tốt 3, nhắm vào Tốt c4 vừa tiến của Đỏ. Đen giành ngay thế chủ động ở cánh phải, thường tiến liền Tốt 3 để đổi hoặc ăn Tốt c4, sau đó Pháo lộ 3 nhắm tiếp Tượng c0. Đỏ có hai hướng chính: vào Pháo đầu phản công Tốt đầu (diễn biến chính), hoặc phi Tượng giữ vững. Khai cuộc giàu tính đối công, được rất nhiều danh thủ sử dụng.',
    ideasRed: [
      'Vào Pháo đầu nhắm Tốt đầu e6 thay vì cố giữ Tốt c4.',
      'Ra quân nhanh (Mã biên, Xe 9 bình 8) để bù lại Tốt đã mất.',
      'Pháo đầu ăn Tốt giữa kèm chiếu rồi bình ngang ăn tiếp Tốt biên.',
      'Luôn bảo vệ Tượng c0 trước Pháo lộ 3 của Đen.',
    ],
    ideasBlack: [
      'Pháo 2 bình 3 nhắm ngay Tốt c4.',
      'Tiến liền Tốt 3 qua sông, ăn Tốt c4 và mở đường cho Pháo lộ 3 nhắm Tượng c0.',
      'Phi Tượng trái, Hoành xa sang lộ 4 để ra quân nhanh.',
      'Tận dụng Tốt c4 qua sông làm ngòi cho Pháo và hạn chế Mã biên của Đỏ.',
    ],
    typicalPlans: [
      'Đen: Xe 4 qua sông phối hợp Pháo 3 tấn công cánh trái Đỏ, Tốt c4 làm mũi nhọn.',
      'Đỏ: Pháo biên và Xe 8 phối hợp lấy lại Tốt c4, sau đó tận dụng ưu thế Tốt.',
      'Đỏ thường bình Pháo 8 sang lộ 6 để vừa giữ cung vừa chặn Xe lộ 4 của Đen.',
      'Khi các Tốt cánh trái đã đổi hết, thế cờ thiên về cuộc đấu kỹ thuật của Xe – Mã – Pháo.',
    ],
    variations: [
      {
        name: 'Đỏ vào Pháo đầu cùng phía Tốt 7 (2. P8-5)',
        moves: '1. B7.1 P2-3 2. P8-5 P8-5 3. M2.3 M8.7 4. X1-2 B3.1 5. M8.9 B3.1 6. X9-8 M2.1',
        comment:
          'Đỏ vào Pháo đầu bằng Pháo 8, Đen cũng vào Pháo giữa. Đen vẫn tiến liền hai bước Tốt 3 để ăn Tốt c4, Đỏ ra Mã biên và Xe 8. Đen lên Mã biên chuẩn bị ra Xe 1.',
      },
      {
        name: 'Đen phi Tượng phải (2...T7.5)',
        moves: '1. B7.1 P2-3 2. P2-5 T7.5 3. M8.9 B1.1 4. X9-8 M2.1 5. M2.3 X1.1 6. X1-2 X1-4',
        comment:
          'Đen phi Tượng 7 thay vì Tượng 3, giữ Pháo lộ 3 linh hoạt. Đỏ ra Mã biên và Xe 8 ngay; Đen tiến Tốt biên, lên Mã biên rồi ra Xe 1 theo hàng ngang sang lộ 4.',
      },
      {
        name: 'Đỏ phi tượng (2. T3.5)',
        moves: '1. B7.1 P2-3 2. T3.5 M2.1 3. M8.7 X1-2 4. M7.6 M8.7',
        comment:
          'Đỏ phi Tượng phải lên e2 để Tượng bảo vệ Tốt c4 – cách chơi vững chắc. Đen lên Mã biên và ra Xe 1; Đỏ đưa Mã 7 bàn hà ở d4.',
      },
    ],
    traps: [
      {
        name: 'Chặn bằng Pháo – Pháo thành mồi',
        moves: '1. B7.1 P2-3 2. P2-5 T3.5 3. M2.3 B3.1 4. M8.9 B3.1 5. P8-7 P3.5',
        explanation:
          'Sau 4...B3.1, Pháo đen ở c7 lấy Tốt c4 làm ngòi nhắm Tượng c0. Đỏ có vẻ "khéo léo" chặn đường bằng 5. P8-7: Pháo đứng ở c2 thì giữa Pháo đen và Tượng có hai quân, Tượng an toàn. Nhưng chính Pháo c2 lại trở thành mục tiêu: 5...P3.5! – Pháo đen nhảy qua ngòi c4 ăn Pháo c2, và không quân Đỏ nào ăn lại được. Đen hơn hẳn một Pháo. Cách đúng là 5. X9-8 cho Xe đứng cạnh bảo vệ Tượng.',
      },
    ],
    famousPlayers: ['Liễu Đại Hoa', 'Hồ Vinh Hoa', 'Tưởng Xuyên', 'Kim Ba', 'Trương Cường'],
  },

  // ======================= PHI TƯỢNG CỤC, SĨ GIÁC PHÁO =======================
  {
    id: 'phi-tuong-cuc',
    name: 'Phi tượng cục',
    nameHan: '飞相局',
    family: 'phi-tuong',
    forSide: 'red',
    difficulty: 2,
    moves: '1. T3.5 P8-5 2. M2.3 M8.7 3. X1-2 X9-8 4. M8.7 M2.1 5. B3.1 P2-4 6. X9-8 X1-2 7. S4.5 X2.4 8. P8-9 X2-4',
    moveNotes: [
      'Phi tượng: Tượng 3 lên giữa (e2). Một nước khai cuộc "phòng thủ trước, tấn công sau": Tượng che lộ giữa, giữ hai điểm c4 và g4, để Đỏ tùy ý dàn quân theo cách đáp của Đen.',
      'Đen chiếm lấy Pháo đầu (Pháo 8 bình 5) và nhắm ngay Tốt giữa e3 – chú ý: Tượng e2 vừa lên lại trở thành ngòi, nên nếu Pháo ăn được Tốt e3 thì còn chiếu Tướng.',
      'Mã 2 tiến 3: Đỏ bảo vệ Tốt giữa ngay lập tức.',
      'Mã 8 tiến 7: Đen giữ Tốt đầu.',
      'Xe 1 bình 2: Xe Đỏ ra lộ 2.',
      'Xe 9 bình 8: Xe đen ra lộ 8, đối diện Pháo 2 của Đỏ.',
      'Mã 8 tiến 7: Đỏ có hai Mã che lộ giữa – Phi tượng chuyển thành thế Bình phong mã vững chắc, Tượng e2 càng làm trung lộ thêm kiên cố.',
      'Mã 2 tiến 1 (a7): Đen lên Mã biên để Pháo 2 và Xe 1 có đường ra.',
      'Tốt 3 tiến 1 (g4): mở "chân" cho Mã 3 có thể nhảy lên f4.',
      'Pháo 2 bình 4 (d7): Pháo về sĩ giác, rời cột b để Xe 1 ra lộ 2.',
      'Xe 9 bình 8 (b0): Xe trái của Đỏ chiếm lộ 8.',
      'Xe 1 bình 2 (b9): Xe đen ra lộ 2, nhòm Pháo b2 (Pháo này được Xe b0 bảo vệ).',
      'Sĩ 4 tiến 5: Đỏ củng cố cung Tướng – Sĩ và Tượng ở giữa làm thế phòng thủ rất chắc.',
      'Xe 2 tiến 4 (b5): Xe đen lên bờ sông, vẫn giữ lộ 2.',
      'Pháo 8 bình 9 (a2): Pháo dạt ra biên, mở lộ 8 – Xe b0 của Đỏ đối mặt Xe b5 không được bảo vệ của Đen; Pháo biên còn nhắm Tốt 1 (a6).',
      'Xe 2 bình 4 (d5): Xe né sang lộ 4, cùng Pháo d7 tạo thế Xe – Pháo trên lộ 4 nhòm xuống Sĩ d0. Thế cờ cân bằng, Đỏ vững chắc, Đen hoạt động.',
    ],
    summary:
      'Phi tượng cục (Tượng 3 lên 5) là khai cuộc mềm dẻo, thiên về phòng thủ – phản công. Tượng ở giữa giúp trung lộ của Đỏ cực kỳ vững, sau đó Đỏ có thể chuyển sang Bình phong mã, Phản cung mã hay thậm chí Pháo đầu tùy cách đáp của Đen. Đây là khai cuộc sở trường của nhiều đại kiện tướng, đặc biệt là Hồ Vinh Hoa và Liễu Đại Hoa. Điều cần nhớ: Tượng e2 có thể trở thành ngòi cho Pháo đầu của Đen, nên Đỏ phải luôn giữ Tốt giữa e3 được bảo vệ.',
    ideasRed: [
      'Dựng thế phòng thủ vững (Tượng giữa, Sĩ giữa) rồi mới phản công.',
      'Lên Mã 3 bảo vệ Tốt giữa ngay khi Đen vào Pháo đầu.',
      'Chuyển sang thế Bình phong mã, ra hai Xe sang lộ 2 và lộ 8.',
      'Bình Pháo ra biên để mở lộ cho Xe và nhắm Tốt biên của Đen.',
    ],
    ideasBlack: [
      'Chiếm Pháo đầu khi Đỏ chưa có Pháo ở lộ giữa.',
      'Lên Mã biên, đưa Pháo 2 về sĩ giác để ra Xe 1 nhanh.',
      'Xe tuần hà rồi bình sang lộ 4, phối hợp với Pháo sĩ giác.',
      'Tìm cơ hội Pháo ăn Tốt e3 kèm chiếu khi Đỏ lơ là bảo vệ Tốt giữa.',
    ],
    typicalPlans: [
      'Đỏ: Mã 3 lên f4, Xe 8 qua sông, Pháo biên ăn Tốt a6 – tạo sức ép ở cánh trái Đen.',
      'Đen: Xe d5 và Pháo d7 gây áp lực lộ 4, Mã 7 nhảy lên f5 hoặc h5 phản công.',
      'Trong các biến chậm, Đỏ thường dựa vào thế trận vững để kéo dài, chờ Đen dàn quân quá đà.',
      'Phi tượng hay chuyển thành trung cuộc nhiều Tốt, đòi hỏi kỹ thuật điều quân tinh tế.',
    ],
    variations: [
      {
        name: 'Phi tượng đối Quá cung pháo (1...P8-4)',
        moves: '1. T3.5 P8-4 2. M2.3 M8.7 3. X1-2 B7.1 4. B7.1 P2-3 5. M8.7 B3.1 6. M7.8 B3.1 7. T5.7 P3/1 8. T7/5 M2.3 9. X9.1 T3.5',
        comment:
          'Đen đưa Pháo 8 qua cung về lộ 4 – cách đáp phổ biến nhất. Hai bên cùng tiến Tốt 7; Đen bình Pháo 2 sang lộ 3 (Tốt để pháo) rồi đổi Tốt 3, Đỏ dùng Tượng ăn lại Tốt c4 rồi lui về giữa. Thế cờ đơn giản, cân bằng.',
      },
      {
        name: 'Phi tượng đối Sĩ giác pháo (1...P2-4)',
        moves: '1. T3.5 P2-4 2. M8.7 B3.1 3. X9-8 M2.3 4. P8-9 M8.7 5. B3.1 P8-9 6. M2.3 X9-8',
        comment:
          'Đen đặt Pháo 2 ở sĩ giác. Đỏ lên Mã trái, ra Xe 9 sang lộ 8 và bình Pháo ra biên; Đen tiến Tốt 3, lên hai Mã và cũng bình Pháo 8 ra biên để ra Xe. Hai bên dàn quân đối xứng, chậm rãi.',
      },
      {
        name: 'Phi tượng đối Tiến 7 tốt (1...B7.1)',
        moves: '1. T3.5 B7.1 2. B7.1 M8.7 3. M8.7 M2.1 4. X9.1 T7.5 5. X9-3 P8/2 6. B3.1 B7.1 7. X3.3 P8-7 8. X3-2 X1.1',
        comment:
          'Sau khi hai bên cùng tiến Tốt 7, thế cờ chuyển về một biến quen thuộc của Đối binh: Đỏ ra Xe ngang sang lộ 3, đổi Tốt 3 để Xe chiếm bờ sông, Đen lui Pháo 8 về đáy rồi bình sang lộ 7 đuổi Xe.',
      },
    ],
    traps: [
      {
        name: 'Tượng giữa thành ngòi cho Pháo đầu',
        moves: '1. T3.5 P8-5 2. M8.9 P5.4 3. S4.5 P5-1',
        explanation:
          'Lên Mã biên (2. M8.9) là nước quen thuộc trong nhiều thế Phi tượng, nhưng ở đây nó không bảo vệ Tốt giữa. 2...P5.4! – Pháo đen ăn Tốt e3 và chiếu Tướng, vì chính Tượng e2 làm ngòi. Đỏ phải đỡ chiếu (3. S4.5), Pháo đen tiếp tục bình sang a3 ăn thêm Tốt biên (lấy Tốt c3 làm ngòi). Đen hơn hai Tốt. Nước đúng là 2. M2.3 hoặc 2. M8.7 – Mã nào cũng giữ được Tốt giữa.',
      },
    ],
    famousPlayers: ['Hồ Vinh Hoa', 'Liễu Đại Hoa', 'Triệu Quốc Vinh', 'Hứa Ngân Xuyên', 'Lâm Hoành Mẫn'],
  },
  {
    id: 'si-giac-phao',
    name: 'Sĩ giác pháo',
    nameHan: '仕角炮',
    family: 'phi-tuong',
    forSide: 'red',
    difficulty: 3,
    moves:
      '1. P2-4 P2-5 2. M8.7 M2.3 3. M2.3 M8.9 4. X1-2 X9-8 5. X9-8 X1-2 6. P4.5 X2.6 7. P8-9 X2-3 8. X8.2 P8-7 9. X2.9 M9/8 10. T3.5 B7.1 11. P4/6 B7.1',
    moveNotes: [
      'Sĩ giác pháo: Pháo 2 bình 4 về điểm sĩ giác (f2). Pháo giữ cung, sẵn sàng bình sang trái hay phải; Đỏ chưa để lộ sẽ dàn thế trận nào.',
      'Đen chiếm Pháo đầu (Pháo 2 bình 5), nhắm ngay Tốt giữa e3 đang không có quân bảo vệ.',
      'Mã 8 tiến 7: Đỏ bảo vệ Tốt giữa. Chú ý: nếu lên Mã 2 thì Mã g2 không giữ được e3, vì Pháo f2 chặn "chân" Mã.',
      'Mã 2 tiến 3: Đen giữ Tốt đầu.',
      'Mã 2 tiến 3: Đỏ có hai Mã c2, g2 và Pháo sĩ giác – chính là thế Phản cung mã, nhưng do Đỏ đi trước nên hơn một nước.',
      'Mã 8 tiến 9 (i7): Đen lên Mã biên.',
      'Xe 1 bình 2: Xe Đỏ ra lộ 2 và dọa ăn ngay Pháo 8 ở h7 – Pháo này chưa có quân bảo vệ.',
      'Xe 9 bình 8 (h9): Xe đen đứng sau bảo vệ Pháo 8.',
      'Xe 9 bình 8 (b0): Xe trái của Đỏ ra lộ 8.',
      'Xe 1 bình 2 (b9): Xe đen ra lộ 2, nhòm Pháo b2.',
      'Pháo 4 tấn 5 (f7) – nước sắc bén: Pháo lao vào giữa hàng 7 của Đen, dọa ăn Mã c7 (lấy Pháo e7 làm ngòi) hoặc Mã i7 (lấy Pháo h7 làm ngòi).',
      'Xe 2 tiến 6 (b3): Đen phản công thay vì phòng thủ – Xe thọc xuống hàng 3, nhắm Pháo b2 và các Tốt a3, c3.',
      'Pháo 8 bình 9 (a2): Pháo né sang biên, mở lộ 8 để Xe b0 đối mặt Xe đen ở b3; Pháo biên còn nhắm Tốt 1 (a6).',
      'Xe 2 bình 3 ăn Tốt (c3): Xe né đòn bằng cách ăn Tốt 7, giờ dọa ăn Mã c2, Tốt a3 và Tốt giữa e3.',
      'Xe 8 tiến 2 (b2): Xe Đỏ đứng cạnh bảo vệ Mã c2.',
      'Pháo 8 bình 7 (g7): Pháo dọa ăn Tốt 3 (g3), đồng thời mở lộ 8 – Xe h9 của Đen đối mặt Xe Đỏ ở h0.',
      'Xe 2 tiến 9 ăn Xe (h9): Đỏ đổi Xe.',
      'Mã 9 thoái 8 (h9): Mã ăn lại Xe. Mỗi bên còn một Xe.',
      'Tượng 3 tiến 5 (e2): Đỏ củng cố trung lộ; Tượng rời g0 nên phía sau Tốt g3 không còn mục tiêu cho Pháo đen.',
      'Tốt 7 tiến 1 (g5): Đen chuẩn bị cho Tốt qua sông.',
      'Pháo 4 thoái 6 (f1): Pháo đã xong nhiệm vụ quấy rối, lui về hàng 1 giữ nhà.',
      'Tốt 7 tiến 1 (g4): Tốt đen qua sông, dọa ăn Tốt g3. Đen hơn một Tốt nhưng Xe c3 nằm sâu; Đỏ vững chắc – thế cờ cân bằng.',
    ],
    summary:
      'Sĩ giác pháo (Pháo 2 bình 4) là một khai cuộc mềm dẻo cùng nhóm với Phi tượng: Pháo về sĩ giác giữ cung, Đỏ chờ xem Đen đáp thế nào rồi mới quyết định. Trước Pháo đầu của Đen, Đỏ thường lên hai Mã thành thế Phản cung mã "hơn một nước". Mũi nhọn đặc trưng là Pháo sĩ giác tấn 5 xuống hàng 7 của Đen, lấy chính các Pháo đen làm ngòi để nhắm Mã. Đen buộc phải phản công chính xác; ngược lại, Đỏ dễ dàng giành thế chủ động.',
    ideasRed: [
      'Pháo về sĩ giác giữ cung, giữ thế linh hoạt cho nước sau.',
      'Lên hai Mã thành Phản cung mã khi Đen chơi Pháo đầu; nhớ bảo vệ Tốt giữa bằng Mã 8.',
      'Pháo 4 tấn 5 xuống hàng 7, lấy Pháo đen làm ngòi để nhắm cả hai Mã.',
      'Bình Pháo 8 ra biên mở lộ cho Xe, sẵn sàng đổi Xe để giảm phản công.',
    ],
    ideasBlack: [
      'Chiếm Pháo đầu nhắm Tốt giữa khi Đỏ chưa có Pháo ở lộ giữa.',
      'Bảo vệ Pháo 8 kịp thời (Xe 9 bình 8) trước Xe lộ 2 của Đỏ.',
      'Trước đòn Pháo 4 tấn 5, phản công ngay bằng Xe thọc sâu thay vì phòng thủ thụ động.',
      'Tốt 7 qua sông sau khi đổi Xe để tạo ưu thế Tốt.',
    ],
    typicalPlans: [
      'Đỏ: Xe 8 và Mã c2 đuổi Xe c3 của Đen, Pháo biên ăn Tốt a6.',
      'Đen: Pháo đầu và Pháo 7 gây áp lực lộ giữa và cánh phải Đỏ, Tốt g4 làm mũi nhọn.',
      'Sau khi đổi Xe, thế cờ chuyển sang trung cuộc Xe – Pháo – Mã với nhiều thế đấu Tốt.',
      'Trong biến 6. P8.6, Đỏ dùng Pháo thọc sâu kìm Xe đen rồi tấn công cánh trái.',
    ],
    variations: [
      {
        name: 'Đỏ Pháo 8 thọc sâu (6. P8.6)',
        moves: '1. P2-4 P2-5 2. M8.7 M2.3 3. M2.3 M8.9 4. X1-2 X9-8 5. X9-8 X1-2 6. P8.6 B3.1 7. X2.5 P5-6',
        comment:
          'Thay vì Pháo sĩ giác, Đỏ đưa Pháo 8 thọc xuống b8 kìm Xe 2 của Đen. Đen tiến Tốt 3, Đỏ cho Xe 2 qua hà; Đen bình Pháo đầu sang lộ 6 (f7) để đối phó.',
      },
      {
        name: 'Đen lên Mã (1...M8.7)',
        moves: '1. P2-4 M8.7 2. B3.1 X9-8 3. M2.3 P8-9 4. M8.7 B3.1 5. P8.4 M2.3',
        comment:
          'Đen không vào Pháo đầu mà lên Mã, ra Xe nhanh kiểu Tam bộ hổ. Đỏ tiến Tốt 3, lên hai Mã và đưa Pháo 8 qua sông gây sức ép.',
      },
      {
        name: 'Đen tiến 7 tốt (1...B7.1)',
        moves: '1. P2-4 B7.1 2. M2.1 M8.7 3. X1-2 X9-8 4. X2.6 P8-9 5. X2-3 T3.5',
        comment:
          'Đen tiến Tốt 7 chặn Tốt 3 của Đỏ. Đỏ lên Mã biên (i2) để mở lộ cho Xe 1, cho Xe qua hà; Đen bình Pháo ra biên đòi đổi Xe, Đỏ tránh đổi bằng Xe bình 3, Đen phi Tượng giữ chắc.',
      },
    ],
    traps: [
      {
        name: 'Phong xa sai lúc – Pháo sĩ giác ăn Mã',
        moves: '1. P2-4 P2-5 2. M8.7 M2.3 3. M2.3 M8.9 4. X1-2 X9-8 5. X9-8 X1-2 6. P4.5 P8.4 7. P4-7',
        explanation:
          'Sau 6. P4.5, Pháo Đỏ ở f7 cùng lúc nhắm Mã c7 (ngòi là Pháo e7) và Mã i7 (ngòi là Pháo h7). Nước "phong xa" 6...P8.4 trông rất tự nhiên – Pháo chặn trước mặt Xe 2 của Đỏ – nhưng nó bỏ mặc mối đe dọa. 7. P4-7 ăn Mã c7! Và nếu Đen không cẩn thận, Pháo ở c7 còn có thể bình sang i7 ăn tiếp Mã biên (lại lấy Pháo e7 làm ngòi). Cách đúng là phản công ngay 6...X2.6 như diễn biến chính.',
      },
    ],
    famousPlayers: ['Hồ Vinh Hoa', 'Liêu Nhị Bình', 'Mạnh Thần', 'Miêu Vĩnh Bằng'],
  },

  // ======================= CÁC KHAI CUỘC KHÁC =======================
  {
    id: 'khoi-ma-cuc',
    name: 'Khởi mã cục',
    nameHan: '起马局',
    family: 'khac',
    forSide: 'red',
    difficulty: 2,
    moves:
      '1. M2.3 B7.1 2. P8-5 M2.3 3. M8.7 X1-2 4. X9-8 M8.7 5. X8.4 P2-1 6. X8.5 M3/2 7. B7.1 T7.5 8. X1.1 S6.5 9. X1-8 M2.3 10. P2.4 B3.1',
    moveNotes: [
      'Khởi mã cục: Mã 2 tiến 3 (g2) – ra quân ngay, giữ Tốt giữa và Tốt 3, nhưng chưa quyết định đặt Pháo ở đâu. Đỏ giữ được nhiều khả năng chuyển thế trận.',
      'Tốt 7 tiến 1 (g5): cách đáp phổ biến nhất – Tốt đen chặn Tốt 3 của Đỏ, hạn chế đường tiến của Mã 3.',
      'Khởi mã chuyển Pháo đầu: Pháo 8 vào lộ giữa. Mã 3 đã giữ sẵn Tốt giữa nên Pháo đầu lập tức nhắm Tốt đầu e6.',
      'Mã 2 tiến 3: Đen bảo vệ Tốt đầu.',
      'Mã 8 tiến 7: Đỏ phát triển nốt Mã trái.',
      'Xe 1 bình 2 (b9): Xe đen ra lộ 2, đứng sau Pháo 2.',
      'Xe 9 bình 8 (b0): Xe Đỏ ra lộ 8, nhòm Pháo 2 của Đen.',
      'Mã 8 tiến 7: Đen có thế Bình phong mã.',
      'Xe 8 tiến 4 (b4): Xe Đỏ lên tuần hà, giữ hàng 4.',
      'Pháo 2 bình 1 (a7): Pháo ra biên mở lộ 2 – Xe đen nhìn thẳng vào Xe b4 đang không có quân bảo vệ, Pháo biên còn dọa ăn Tốt 9 (a3).',
      'Xe 8 tiến 5 ăn Xe (b9): Đỏ đổi Xe.',
      'Mã 3 thoái 2 (b9): Mã ăn lại Xe. Mỗi bên còn một Xe.',
      'Tốt 7 tiến 1 (c4): Đỏ mở chân cho Mã 7 có đường bàn hà.',
      'Tượng 7 tiến 5 (e7): Đen củng cố trung lộ.',
      'Xe 1 tiến 1 (i1): Xe còn lại của Đỏ ra theo hàng ngang.',
      'Sĩ 6 tiến 5: Đen củng cố cung Tướng.',
      'Xe 1 bình 8 (b1): Xe ngang chạy sang lộ 8 đã thông, dọa ăn Mã b9 đang không được bảo vệ.',
      'Mã 2 tiến 3 (c7): Mã đen nhảy lên tránh Xe, trở về vị trí Bình phong mã.',
      'Pháo 2 tấn 4 (h6): Pháo qua sông, lấy Tốt đầu e6 làm ngòi để nhắm Tốt 3 (c6) của Đen.',
      'Tốt 3 tiến 1 (c5): Tốt né đòn Pháo và đối mặt Tốt c4 của Đỏ. Thế cờ cân bằng, giàu tính chiến lược.',
    ],
    summary:
      'Khởi mã cục (mở đầu bằng Mã 2 tiến 3) là khai cuộc "ra quân trước, quyết định sau". Mã 3 lên ngay giúp Tốt giữa luôn được bảo vệ, nhờ đó Đỏ có thể chuyển sang Pháo đầu, Sĩ giác pháo, Phi tượng hay tiến Tốt 7 tùy cách đáp của Đen. Khai cuộc ít lý thuyết dài, phù hợp với người thích lối chơi linh hoạt, dựa vào hiểu biết chiến lược hơn là học thuộc biến. Diễn biến chính là biến chuyển Pháo đầu: hai bên sớm đổi một cặp Xe trên lộ 8 rồi tranh giành các lộ còn lại.',
    ideasRed: [
      'Ra Mã 3 trước để giữ Tốt giữa, sau đó mới chọn vị trí cho Pháo.',
      'Chuyển sang Pháo đầu khi Đen tiến Tốt 7 – Pháo đầu nhắm ngay Tốt đầu.',
      'Xe 8 tuần hà, sẵn sàng đổi Xe khi Đen mở lộ 2.',
      'Xe 1 ra hàng ngang rồi chiếm lộ 8 vừa thông sau khi đổi Xe.',
    ],
    ideasBlack: [
      'Tiến Tốt 7 ngay để kìm Mã 3 và Tốt 3 của Đỏ.',
      'Dựng Bình phong mã khi Đỏ chuyển sang Pháo đầu.',
      'Bình Pháo 2 ra biên để mở lộ cho Xe, chấp nhận đổi Xe.',
      'Tiến Tốt 3 đúng lúc để né Pháo qua sông và tranh chấp Tốt cánh trái Đỏ.',
    ],
    typicalPlans: [
      'Đỏ: Mã 7 bàn hà (d4), Xe 8 và Pháo qua sông tấn công cánh phải Đen.',
      'Đen: Mã 7 lên f5, Pháo biên trở về lộ 2 hoặc lộ 3 để phản công cánh trái Đỏ.',
      'Hai bên thường đổi Tốt 3 – Tốt 7 để mở đường cho Mã.',
      'Trong biến Khởi mã hỗ tiến thất binh, thế cờ đối xứng hơn và chậm hơn.',
    ],
    variations: [
      {
        name: 'Khởi mã hỗ tiến thất binh (2. B7.1)',
        moves: '1. M2.3 B7.1 2. B7.1 M8.7 3. M8.7 X9.1 4. P8-9 M2.3 5. X9-8 X1-2 6. X8.6 P2-1 7. X8.3 M3/2',
        comment:
          'Đỏ không chuyển Pháo đầu mà tiến Tốt 7, thế cờ gần như đối xứng. Đen ra Xe 9 theo hàng ngang; Đỏ bình Pháo ra biên, Xe 8 tiến 6; Đen bình Pháo 2 ra biên mở lộ, hai bên đổi Xe trên lộ 8.',
      },
      {
        name: 'Khởi mã chuyển Sĩ giác pháo (2. P8-6)',
        moves: '1. M2.3 B7.1 2. P8-6 M8.7 3. M8.7 M2.1 4. X9-8 X1-2 5. B7.1 T7.5 6. T3.5 S6.5',
        comment:
          'Pháo 8 về sĩ giác (d2), Đỏ dựng thế trận phòng thủ vững chắc kiểu Phản cung mã. Đen lên Mã biên, ra Xe 1, phi Tượng, lên Sĩ – hai bên đều chơi chậm, chờ đối phương để lộ điểm yếu.',
      },
    ],
    traps: [
      {
        name: 'Xe vào đường ngắm của Pháo – mất Xe đổi Pháo',
        moves: '1. M2.3 B7.1 2. P8-5 M2.3 3. M8.7 X1-2 4. X9-8 M8.7 5. X8.4 X9-8 6. P2.7 M7/8',
        explanation:
          'Ra Xe 9 sang lộ 8 (5...X9-8) là nước quen tay trong rất nhiều khai cuộc. Nhưng ở đây Mã 8 đã rời h9, nên trên cột h giữa Pháo h2 của Đỏ và Xe vừa đến h9 chỉ còn một quân – Pháo h7 của chính Đen. 6. P2.7! Pháo nhảy qua ngòi ăn Xe; Đen chỉ ăn lại được Pháo bằng Mã (6...M7/8) và thiệt hẳn quân. Trước khi đặt Xe lên một cột, hãy đếm xem Pháo đối phương có ngòi để ăn nó không.',
      },
    ],
    famousPlayers: ['Lữ Khâm', 'Trương Cường', 'Đào Hán Minh', 'Liễu Đại Hoa'],
  },
  {
    id: 'qua-cung-phao',
    name: 'Quá cung pháo',
    nameHan: '过宫炮',
    family: 'khac',
    forSide: 'red',
    difficulty: 3,
    moves: '1. P2-6 P8-5 2. M2.3 M8.7 3. S4.5 X9-8 4. T3.5 M2.3 5. X1-4 X8.4 6. M8.9 B3.1 7. P8.4 M3.2 8. P8-3 T7.9 9. B3.1',
    moveNotes: [
      'Quá cung pháo: Pháo 2 "vượt qua cung" sang lộ 6 (d2). Pháo vẫn che chở cung Tướng từ phía bên kia, đồng thời nhường đường cho Mã 2 và Xe 1 ra quân.',
      'Đen chiếm Pháo đầu (Pháo 8 bình 5), nhắm Tốt giữa e3 đang không có quân bảo vệ.',
      'Mã 2 tiến 3: Đỏ bảo vệ Tốt giữa ngay.',
      'Mã 8 tiến 7: Đen giữ Tốt đầu.',
      'Sĩ 4 tiến 5: Sĩ lên giữa củng cố cung, và quan trọng hơn – nhường điểm f0 để Xe 1 có thể chạy ngang sang lộ 4.',
      'Xe 9 bình 8 (h9): Xe đen chiếm lộ 8 đang thông suốt vì Đỏ đã dời Pháo 2 và Mã 2.',
      'Tượng 3 tiến 5 (e2): hoàn chỉnh thế phòng thủ Sĩ – Tượng ở giữa, rất khó bị tấn công trên lộ giữa.',
      'Mã 2 tiến 3: Đen phát triển nốt Mã phải.',
      'Xe 1 bình 4 (f0): Xe chạy ngang theo hàng cuối sang lộ 4 – nét đặc trưng của Quá cung pháo. Xe nhòm thẳng xuống Sĩ f9 của Đen.',
      'Xe 8 tiến 4 (h5): Xe đen lên tuần hà, kiểm soát bờ sông.',
      'Mã 8 tiến 9 (a2): Đỏ lên Mã biên, mở đường cho Pháo 8 và Xe 9.',
      'Tốt 3 tiến 1 (c5): mở "chân" cho Mã 3.',
      'Pháo 8 tấn 4 (b6): Pháo qua sông, lấy Tốt đầu e6 làm ngòi nhắm Tốt 7 (g6) của Đen.',
      'Mã 3 tiến 2 (b5): Đen phản công – Mã nhảy ra dọa ăn Tốt 9 (a3) hoặc Tốt 7 (c3) của Đỏ.',
      'Pháo 8 bình 3 ăn Tốt (g6): Pháo ăn Tốt, giờ lấy Mã g7 làm ngòi nhắm Tượng g9, và lấy Tốt e6 làm ngòi nhắm Tốt 1 (a6).',
      'Tượng 7 tiến 9 (i7): Đen cất Tượng khỏi tầm Pháo trước – không vội tham ăn Tốt.',
      'Tốt 3 tiến 1 (g4): mở "chân" cho Mã 3 nhảy lên f4 hoặc h4. Đỏ hơn một Tốt nhưng Mã b5 của Đen vẫn dọa ăn Tốt cánh trái – thế cờ cân bằng.',
    ],
    summary:
      'Quá cung pháo (Pháo 2 bình 6) đưa Pháo vượt qua cung Tướng sang lộ 6. Khác với Sĩ giác pháo (Pháo ở lộ 4), Pháo lộ 6 nằm phía bên kia cung, để trống cánh phải cho Mã 2 và Xe 1. Đặc trưng của khai cuộc là Đỏ lên Sĩ 4 tiến 5 rồi cho Xe 1 chạy ngang theo hàng cuối sang lộ 4, tạo thế phòng thủ Sĩ – Tượng giữa vững chắc kết hợp Xe lộ 4 hoạt động. Đen thường đáp bằng Pháo đầu, và Đỏ phải nhớ bảo vệ Tốt giữa ngay từ nước thứ hai.',
    ideasRed: [
      'Pháo vượt cung sang lộ 6, giữ cung và nhường đường cho cánh phải.',
      'Lên Mã 3 bảo vệ Tốt giữa ngay khi Đen vào Pháo đầu.',
      'Sĩ 4 tiến 5 rồi Xe 1 bình 4 theo hàng cuối – Xe lộ 4 nhòm Sĩ f9.',
      'Pháo 8 qua sông bình sang lộ 3 ăn Tốt và nhắm Tượng g9.',
    ],
    ideasBlack: [
      'Vào Pháo đầu khi Đỏ chưa có Pháo ở lộ giữa.',
      'Xe 8 chiếm lộ 8 thông thoáng rồi lên tuần hà.',
      'Mã 3 nhảy ra b5 phản công Tốt cánh trái Đỏ.',
      'Cất Tượng trước khi tham ăn Tốt – Pháo lộ 3 của Đỏ rất nguy hiểm.',
    ],
    typicalPlans: [
      'Đỏ: Mã 3 lên f4, Xe 4 tiến xuống hàng 7 – hàng 8 của Đen, Pháo g6 và Pháo d2 phối hợp tấn công.',
      'Đen: Mã b5 ăn Tốt a3 hoặc c3, Xe 8 tuần hà sang lộ khác để tạo phản công.',
      'Đỏ có thể bình Pháo 6 về lộ giữa khi cần thêm sức tấn công trung lộ.',
      'Thế trận phòng thủ vững của Đỏ thường dẫn tới trung cuộc dài, nhiều đấu Tốt.',
    ],
    variations: [
      {
        name: 'Xe qua hà đối Hoành xa (3. X1-2 X9.1)',
        moves: '1. P2-6 P8-5 2. M2.3 M8.7 3. X1-2 X9.1 4. X2.6 X9-4 5. S4.5 M2.3 6. X2-3 P5/1',
        comment:
          'Đỏ ra Xe thẳng sang lộ 2 rồi cho Xe qua hà; Đen ra Xe ngang sang lộ 4. Đỏ lên Sĩ, Xe bình 3 đè Mã 7; Đen lui Pháo đầu về e8 – hàng 7 thông trở lại, Pháo 2 lấy Mã 3 làm ngòi để bảo vệ Mã 7.',
      },
      {
        name: 'Quá cung pháo đối Tiến mã (1...M8.7)',
        moves: '1. P2-6 M8.7 2. M2.3 X9-8 3. B3.1 P8-9 4. M8.7 B3.1 5. P8.4 T7.5 6. P8-3',
        comment:
          'Đen lên Mã, ra Xe, bình Pháo ra biên theo kiểu Tam bộ hổ. Đỏ tiến Tốt 3, lên Mã trái rồi đưa Pháo 8 qua sông (b6): Pháo vừa nhắm Mã b9 qua ngòi Pháo b7, vừa lấy Tốt đầu làm ngòi nhắm Tốt 7. Đen phi Tượng, Đỏ bình Pháo ăn Tốt g6; đổi lại Đen ra quân nhanh hơn.',
      },
    ],
    traps: [
      {
        name: 'Mã tham Tốt biên – mất Tượng',
        moves:
          '1. P2-6 P8-5 2. M2.3 M8.7 3. S4.5 X9-8 4. T3.5 M2.3 5. X1-4 X8.4 6. M8.9 B3.1 7. P8.4 M3.2 8. P8-3 M2.1 9. P3.3 S6.5 10. X9-8',
        explanation:
          'Sau 8. P8-3, Mã b5 có thể ăn Tốt a3 như đã dọa (8...M2.1), nhưng Đen quên rằng Pháo g6 đang nhắm Tượng g9. 9. P3.3! Pháo ăn Tượng chiếu Tướng (Sĩ f9 làm ngòi); Đen phải lên Sĩ đỡ chiếu, rồi 10. X9-8 Xe ra lộ 8 tấn công Pháo b7, còn Mã a3 của Đen thì lạc xa trận địa. Đỏ được Tượng đổi Tốt và thế công mạnh. Nước đúng là 8...T7.9 cất Tượng trước.',
      },
    ],
    famousPlayers: ['Hồng Trí', 'Diêm Văn Thanh', 'Liễu Đại Hoa', 'Cảnh Học Nghĩa'],
  },
];
