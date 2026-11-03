// Trường phái cổ điển (1880 – 1919): Steinitz đặt nền móng chiến lược; Lasker, Tarrasch, Rubinstein, Capablanca tỏa sáng.
// Mọi biên bản đã được đối chiếu với ít nhất hai nguồn (chessgames.com cùng Wikipedia, chess.com
// hoặc sách "My Chess Career" của Capablanca trên Wikisource).
import type { ClassicGame } from '../types';

export const GAMES_CO_DIEN: ClassicGame[] = [
  // ------------------------------------------------------------------ 1883
  {
    id: 'zukertort-blackburne-1883',
    title: 'Zukertort – Blackburne: Ván cờ bất tử của Zukertort',
    white: 'Johannes Zukertort',
    black: 'Joseph Henry Blackburne',
    event: 'Giải London 1883',
    year: 1883,
    result: '1-0',
    opening: 'Khai cuộc Anh, chuyển sang thế cờ Tốt Hậu (English Opening)',
    difficulty: 4,
    context:
      'Giải London 1883 quy tụ gần như toàn bộ tinh hoa cờ vua thế giới thời đó. Johannes Zukertort chơi ở phong độ đỉnh cao, về nhất và bỏ xa Steinitz tới ba điểm – thành tích đưa ông tới trận tranh ngôi vô địch thế giới chính thức đầu tiên với Steinitz năm 1886. Đối thủ của ông, Joseph Blackburne, là kỳ thủ tấn công đáng gờm nhất nước Anh, được mệnh danh là "Cái chết đen".',
    summary:
      'Zukertort chọn hệ thống khai cuộc kín đáo nhưng đặt hai Tượng nhắm thẳng về cánh Vua đen: Tượng b2 trên đường chéo dài, Tượng d3 nhìn về h7. Ông đẩy e4–e5 rồi f4–f5 để phá lá chắn tốt, và khi Xe đen tấn công Hậu trắng, ông mặc kệ để tung chuỗi nước chiếu và thí quân liên tiếp: thí Hậu ở b4, thí Xe ở f8. Mọi cách đáp của Blackburne đều dẫn tới thua, và Đen đầu hàng sau nước 33.',
    moves:
      '1.c4 e6 2.e3 Nf6 3.Nf3 b6 4.Be2 Bb7 5.O-O d5 6.d4 Bd6 7.Nc3 O-O 8.b3 Nbd7 9.Bb2 Qe7 10.Nb5 Ne4 11.Nxd6 cxd6 12.Nd2 Ndf6 13.f3 Nxd2 14.Qxd2 dxc4 15.Bxc4 d5 16.Bd3 Rfc8 17.Rae1 Rc7 18.e4 Rac8 19.e5 Ne8 20.f4 g6 21.Re3 f5 22.exf6 Nxf6 23.f5 Ne4 24.Bxe4 dxe4 25.fxg6 Rc2 26.gxh7+ Kh8 27.d5+ e5 28.Qb4 R8c5 29.Rf8+ Kxh7 30.Qxe4+ Kg7 31.Bxe5+ Kxf8 32.Bg7+ Kg8 33.Qxe7',
    annotations: {
      '1': 'Zukertort là một trong số ít kiện tướng thời đó hay mở cờ bằng c4 hoặc Nf3. Ván cờ nhanh chóng chuyển sang thế trận Tốt Hậu khép kín.',
      '9':
        'Tượng b2 đặt trên đường chéo dài a1–h8. Lúc này nó còn bị tốt d4 che khuất, nhưng sẽ trở thành khẩu đại bác khi tốt d tiến lên.',
      '10': 'Mã nhảy vào b5 để đổi lấy Tượng d6 – quân tấn công tốt nhất của Đen. Trắng giành được cặp Tượng.',
      '13': 'Đuổi Mã e4 khỏi tiền đồn và chuẩn bị đẩy e3–e4 để chiếm trung tâm.',
      '17...': 'Blackburne dồn hai Xe lên cột c mở – kế hoạch phản công hợp lý ở cánh Hậu.',
      '19': 'Tốt e5 giành không gian và đẩy Mã đen về e8. Cánh Vua đen bắt đầu thiếu quân phòng thủ.',
      '23':
        'Thí tốt! Trắng không ngại để Mã đen nhảy vào e4, miễn là các cột trước Vua đen được mở ra.',
      '24':
        'Đổi Tượng lấy Mã. Sau dxe4, tốt d4 của Trắng không còn bị chặn – nước d4–d5 sẽ mở toang đường chéo cho Tượng b2.',
      '25...':
        'Blackburne phản công: Xe c2 tấn công Hậu d2. Trông như Trắng phải lui Hậu, nhưng Zukertort có kế hoạch táo bạo hơn nhiều.',
      '27': 'Tốt d tiến lên mở đường chéo dài: Tượng b2 chiếu Vua h8. Đen buộc phải chặn bằng e5.',
      '28':
        'Nước thí Hậu nổi tiếng! Hậu sang b4 tấn công Hậu e7 và đứng ngay trong tầm ăn của nó. Nếu 28...Qxb4 thì 29.Bxe5+ Kxh7 30.Rh3+ và Trắng chiếu hết chỉ sau vài nước. Blackburne buộc phải chặn bằng Xe.',
      '29':
        'Thí Xe! Kiểm tra bằng máy cho thấy cả ba cách đáp 29...Kxh7, 29...Qxf8 và 29...Kg7 đều dẫn tới bị chiếu hết.',
      '30': 'Hậu ăn tốt e4 kèm chiếu và tham gia trực tiếp vào cuộc săn Vua.',
      '32':
        'Tượng chiếu từ g7 – mục đích của cả chuỗi thí quân lộ ra: dù Vua đen lùi về g8 hay ăn Tượng, Hậu e7 không được bảo vệ cũng sẽ bị ăn ở nước sau.',
      '33': 'Trắng ăn Hậu và giữ thế áp đảo tuyệt đối. Blackburne đầu hàng.',
    },
    keyMoments: ['23', '27', '28', '29', '32'],
    lessons: [
      'Đặt Tượng trên đường chéo dài nhắm vào Vua (Bb2, Bd3), rồi chờ thời điểm mở đường chéo bằng một nước đẩy tốt.',
      'Muốn tấn công Vua phải mở cột: các nước e5, f4–f5 và thí tốt là cách phá hàng rào tốt.',
      'Khi đang tấn công, đừng vội lui quân bị đe dọa – một nước chiếu hay đe dọa mạnh hơn sẽ giành lại nhịp.',
      'Quân không được bảo vệ (như Hậu e7) là mục tiêu lý tưởng cho chuỗi chiếu liên tục.',
    ],
    tags: ['Tấn công Vua', 'Thí quân'],
    source: 'https://www.chessgames.com/perl/chessgame?gid=1001854',
  },

  // ------------------------------------------------------------------ 1889
  {
    id: 'lasker-bauer-1889',
    title: 'Lasker – Bauer: Thí hai Tượng ở Amsterdam',
    white: 'Emanuel Lasker',
    black: 'Johann Hermann Bauer',
    event: 'Giải Amsterdam 1889',
    year: 1889,
    result: '1-0',
    opening: 'Khai cuộc Bird (Bird\'s Opening)',
    difficulty: 3,
    context:
      'Năm 1889, Emanuel Lasker mới 20 tuổi và còn ít người biết tới. Ván thắng Johann Bauer tại Amsterdam đã đi vào sách giáo khoa như mẫu mực nổi tiếng đầu tiên của đòn thí cả hai Tượng để phá tan lá chắn che Vua. Năm năm sau, Lasker trở thành nhà vô địch thế giới và giữ ngôi suốt 27 năm.',
    summary:
      'Lasker mở cờ bằng f4 và đặt hai Tượng ở b2, d3 cùng nhắm vào Vua đen đã nhập thành. Khi Đen chậm chạp với 13...a6, Mã trắng nhảy vào h5 để loại bỏ quân phòng thủ f6, rồi hai Tượng lần lượt bị thí ở h7 và g7. Vua đen trơ trọi; Xe trắng chuyển sang cột h buộc Đen phải bỏ Hậu, và một nước Hậu đánh đôi giúp Lasker thu đủ quân để thắng.',
    moves:
      '1.f4 d5 2.e3 Nf6 3.b3 e6 4.Bb2 Be7 5.Bd3 b6 6.Nc3 Bb7 7.Nf3 Nbd7 8.O-O O-O 9.Ne2 c5 10.Ng3 Qc7 11.Ne5 Nxe5 12.Bxe5 Qc6 13.Qe2 a6 14.Nh5 Nxh5 15.Bxh7+ Kxh7 16.Qxh5+ Kg8 17.Bxg7 Kxg7 18.Qg4+ Kh7 19.Rf3 e5 20.Rh3+ Qh6 21.Rxh6+ Kxh6 22.Qd7 Bf6 23.Qxb7 Kg7 24.Rf1 Rab8 25.Qd7 Rfd8 26.Qg4+ Kf8 27.fxe5 Bg7 28.e6 Rb7 29.Qg6 f6 30.Rxf6+ Bxf6 31.Qxf6+ Ke8 32.Qh8+ Ke7 33.Qg7+ Kxe6 34.Qxb7 Rd6 35.Qxa6 d4 36.exd4 cxd4 37.h4 d3 38.Qxd3',
    annotations: {
      '1': 'Khai cuộc Bird: tốt f4 giành ô e5 và chuẩn bị cho các hoạt động ở cánh Vua.',
      '4': 'Tượng lên b2, đường chéo dài nhắm thẳng tới g7 và h8.',
      '5': 'Tượng thứ hai đặt ở d3, nhắm vào h7. Hai Tượng song song là khung sườn của đòn tấn công sau này.',
      '12': 'Sau khi đổi Mã, Tượng đứng ở e5 vẫn chĩa thẳng vào cánh Vua đen.',
      '13...': 'Nước đi chậm. Đen chuẩn bị mở rộng ở cánh Hậu mà không nhận ra Vua mình đang gặp nguy.',
      '14': 'Mã nhảy vào h5 để đổi lấy Mã f6 – quân duy nhất che chắn ô h7.',
      '15':
        'Thí Tượng thứ nhất! Nếu Đen từ chối bằng 15...Kh8 thì Trắng ăn lại Mã h5 bằng Hậu và Đen sớm bị chiếu hết.',
      '16': 'Hậu ăn lại Mã kèm chiếu. Trắng kém một Tượng nhưng Vua đen đã mất lá chắn h7.',
      '17': 'Thí Tượng thứ hai! Lá chắn tốt trước Vua đen bị xóa sạch.',
      '18': 'Hậu chiếu từ g4. Nếu 18...Kf6 thì 19.Qg5# – ô g5 được tốt f4 bảo vệ.',
      '19': 'Nước then chốt: Xe đe dọa Rh3 chiếu hết. Đen chỉ còn cách trả lại quân.',
      '19...':
        'Nước duy nhất: e5 giải phóng hàng 6 để Hậu c6 có thể sang h6 chặn chiếu. Các nước khác đều bị chiếu hết nhanh chóng.',
      '22': 'Hậu đánh đôi: tấn công cùng lúc Tượng e7 và Tượng b7. Đen chỉ cứu được một quân.',
      '23':
        'Trắng ăn Tượng b7. Giờ Trắng có Hậu và Xe đấu hai Xe và một Tượng, thêm hai tốt, trong khi Vua đen vẫn trống trải.',
      '30': 'Thí Xe lần cuối để kéo Tượng đen khỏi g7, mở đường cho Hậu chiếu liên tục rồi ăn Xe b7.',
    },
    keyMoments: ['14', '15', '17', '19', '22'],
    lessons: [
      'Hai Tượng cùng nhắm vào cánh Vua đã nhập thành là tín hiệu để tìm đòn thí.',
      'Trước khi thí, hãy loại bỏ quân phòng thủ chủ chốt (14.Nh5 đổi lấy Mã f6).',
      'Thí hai Tượng ở h7 và g7 chỉ hiệu quả khi quân tiếp theo vào kịp – ở đây là Hậu và Xe theo hàng 3.',
      'Sau đòn tấn công, hãy tìm nước đánh đôi để thu hồi vật chất (22.Qd7).',
    ],
    tags: ['Thí quân', 'Tấn công Vua'],
    source: 'https://www.chessgames.com/perl/chessgame?gid=1026352',
  },

  // ------------------------------------------------------------------ 1892
  {
    id: 'tarrasch-marco-1892',
    title: 'Tarrasch – Marco: Cái bẫy Tarrasch ở Dresden',
    white: 'Siegbert Tarrasch',
    black: 'Georg Marco',
    event: 'Đại hội cờ Đức lần thứ 7, Dresden 1892',
    year: 1892,
    result: '1-0',
    opening: 'Ván cờ Tây Ban Nha – Phòng thủ Steinitz (Ruy Lopez, Steinitz Defence)',
    difficulty: 2,
    context:
      'Siegbert Tarrasch – bác sĩ người Đức, nhà lý luận cờ hàng đầu cuối thế kỷ 19 – đã công bố phân tích về một cái bẫy trong Phòng thủ Steinitz từ năm 1891. Khoảng một năm rưỡi sau, tại giải Dresden 1892 mà chính Tarrasch vô địch, kiện tướng người Áo Georg Marco lại sập đúng cái bẫy ấy. Tarrasch chỉ cần vài phút suy nghĩ cho cả ván.',
    summary:
      'Đen chọn Phòng thủ Steinitz thụ động và nhập thành quá sớm ở nước 7. Tarrasch lập tức đổi Tượng lấy Mã, đổi tốt trung tâm và đổi Hậu để ăn tốt e5. Khi Đen cố gỡ lại bằng chiến thuật trên ô e4, đòn ghim trên cột e cùng một loạt đe dọa liên tiếp khiến Đen mất chất. Marco đầu hàng chỉ sau 18 nước.',
    moves:
      '1.e4 e5 2.Nf3 Nc6 3.Bb5 d6 4.d4 Bd7 5.Nc3 Nf6 6.O-O Be7 7.Re1 O-O 8.Bxc6 Bxc6 9.dxe5 dxe5 10.Qxd8 Raxd8 11.Nxe5 Bxe4 12.Nxe4 Nxe4 13.Nd3 f5 14.f3 Bc5+ 15.Nxc5 Nxc5 16.Bg5 Rd5 17.Be7 Re8 18.c4',
    annotations: {
      '3...': 'Phòng thủ Steinitz: Đen giữ tốt e5 bằng d6 – chắc chắn nhưng thụ động.',
      '4': 'Trắng lập tức gây sức ép lên tốt e5.',
      '7':
        'Nước đi tinh tế: Xe e1 bảo vệ tốt e4 và giăng bẫy. Đen nên giải tỏa căng thẳng bằng 7...exd4.',
      '7...':
        'Sai lầm! Nhập thành trông rất tự nhiên nhưng làm mất tốt e5, đồng thời để lại hàng cuối thiếu ô thoát cho Vua.',
      '8': 'Đổi Tượng lấy Mã c6 – quân đang bảo vệ e5.',
      '10': 'Đổi Hậu khiến tốt e5 mất hẳn chỗ dựa.',
      '11': 'Trắng ăn tốt e5, Mã còn tấn công Tượng c6.',
      '11...': 'Đen cố gỡ lại tốt bằng chiến thuật trên ô e4.',
      '13':
        'Nước then chốt! Trắng không vội ăn Mã vì 13.Rxe4? Rd1+ 14.Re1 Rxe1# – chính Trắng bị chiếu hết ở hàng cuối. Thay vào đó Mã lùi về d3: Mã e4 của Đen bị Xe e1 ghim vào Tượng e7 và sắp bị tốt f3 đuổi.',
      '14': 'Tốt f3 tấn công Mã đang bị ghim.',
      '14...': 'Đen phản đòn bằng nước chiếu, hy vọng gỡ thế ghim.',
      '16': 'Tượng tấn công Xe d8 kèm nhịp.',
      '17': 'Tượng chiếm ô e7, đánh đôi Mã c5 và Xe f8. Tượng được Xe e1 bảo vệ nên Đen không thể ăn nó.',
      '18':
        'Tốt c4 đuổi Xe d5. Xe phải rời d5, Mã c5 mất chỗ dựa và Trắng thắng ít nhất một chất. Marco đầu hàng.',
    },
    keyMoments: ['7...', '11', '13', '17', '18'],
    lessons: [
      'Đừng nhập thành theo phản xạ khi trung tâm đang căng thẳng – hãy kiểm tra xem tốt nào sẽ bị mất.',
      'Khi phòng thủ thụ động, hãy giải tỏa căng thẳng trung tâm đúng lúc (7...exd4).',
      'Luôn kiểm tra hàng cuối của chính mình trước khi ăn quân (13.Rxe4? Rd1+).',
      'Ghim quân trên cột mở rồi đuổi bằng tốt là cách bắt quân kinh điển.',
    ],
    tags: ['Ván ngắn', 'Khai cuộc', 'Chiến thuật'],
    source: 'https://www.chessgames.com/perl/chessgame?gid=1283366',
  },

  {
    id: 'steinitz-chigorin-1892',
    title: 'Steinitz – Chigorin: Đòn thí Xe ở Havana',
    white: 'Wilhelm Steinitz',
    black: 'Mikhail Chigorin',
    event: 'Trận tranh ngôi vô địch thế giới 1892, Havana (ván 4)',
    year: 1892,
    result: '1-0',
    opening: 'Ván cờ Tây Ban Nha – Phòng thủ Berlin (Ruy Lopez, Berlin Defence)',
    difficulty: 3,
    context:
      'Năm 1892, Steinitz và Chigorin tái đấu tại Havana để tranh ngôi vô địch thế giới, ba năm sau lần gặp nhau đầu tiên. Hai người đại diện cho hai lối nghĩ đối lập: Steinitz – cha đẻ của lý thuyết thế cờ, tin rằng Vua đủ sức tự vệ; Chigorin – bậc thầy của lối chơi năng động, giàu tưởng tượng. Steinitz thắng chung cuộc với 10 thắng, 8 thua, 5 hòa để giữ ngôi.',
    summary:
      'Steinitz khai cuộc chậm rãi với d3, c3 và đưa Mã về e3, rồi bất ngờ đẩy tốt h lên h5 khi Vua của chính mình còn ở trung tâm. Cột h mở ra, ông nhập thành cánh Hậu và dồn quân. Khi Chigorin ham ăn Xe d4 ở nước 23, Steinitz thí Xe ở h7, dùng Hậu và Tượng lùa Vua đen ra giữa bàn cờ, và Chigorin đầu hàng trước đòn chiếu hết.',
    moves:
      '1.e4 e5 2.Nf3 Nc6 3.Bb5 Nf6 4.d3 d6 5.c3 g6 6.Nbd2 Bg7 7.Nf1 O-O 8.Ba4 Nd7 9.Ne3 Nc5 10.Bc2 Ne6 11.h4 Ne7 12.h5 d5 13.hxg6 fxg6 14.exd5 Nxd5 15.Nxd5 Qxd5 16.Bb3 Qc6 17.Qe2 Bd7 18.Be3 Kh8 19.O-O-O Rae8 20.Qf1 a5 21.d4 exd4 22.Nxd4 Bxd4 23.Rxd4 Nxd4 24.Rxh7+ Kxh7 25.Qh1+ Kg7 26.Bh6+ Kf6 27.Qh4+ Ke5 28.Qxd4+',
    annotations: {
      '4': 'Steinitz chọn lối chơi khiêm tốn với d3, giữ trung tâm vững chắc thay vì mở cờ sớm.',
      '7': 'Mã đi đường vòng d2–f1–e3: kiểu điều quân đặc trưng của Ván cờ Tây Ban Nha, đến nay vẫn được dùng.',
      '11':
        'Ý tưởng táo bạo: tấn công bằng tốt h trước khi nhập thành. Tốt h sẽ mở đường cho Xe h1 ngay từ vị trí ban đầu.',
      '12...': 'Chigorin phản ứng đúng nguyên tắc: khi bị tấn công ở cánh, hãy phản công ở trung tâm.',
      '13': 'Sau hxg6 fxg6, cột h nửa mở cho Xe trắng và tốt h7 trở thành mục tiêu.',
      '16': 'Tượng lui về b3 kèm nhịp, tấn công Hậu d5 và nhắm vào đường chéo dẫn tới Vua g8.',
      '18...': 'Vua đen rời đường chéo a2–g8 sang h8, nhưng lại đứng ngay trên cột h nửa mở.',
      '19': 'Nhập thành cánh Hậu: Vua trắng an toàn, Xe d1 và Xe h1 sẵn sàng hành động.',
      '21': 'Mở trung tâm để đưa thêm quân vào trận.',
      '23...':
        'Sai lầm quyết định: Chigorin ăn Xe, nhưng điều đó dọn đường cho đòn kết thúc. Kiểm tra bằng máy cho thấy sau nước này Trắng có chiếu hết bắt buộc.',
      '24': 'Thí Xe! Xe ăn tốt h7 chiếu, kéo Vua đen ra khỏi góc.',
      '25': 'Hậu chiếm cột h kèm chiếu. Lưới chiếu hết bắt đầu khép lại.',
      '26': 'Tượng e3 chiếu từ h6, đuổi Vua đen tiến lên.',
      '28':
        'Hậu ăn Mã d4 chiếu. Mọi nước đáp của Đen đều bị chiếu hết ngay, ví dụ 28...Kf5 29.g4#. Chigorin đầu hàng.',
    },
    keyMoments: ['11', '13', '19', '23...', '24'],
    lessons: [
      'Khi thế cờ đóng, bạn vẫn có thể tấn công bằng tốt cánh (h4–h5) dù Vua chưa nhập thành.',
      'Mở một cột trước Vua đối phương rồi nhập thành về phía bên kia – công thức tấn công kinh điển.',
      'Trước khi ăn quân "miễn phí", hãy kiểm tra mọi nước chiếu của đối phương.',
      'Chuỗi chiếu liên tục có thể kéo Vua ra khỏi nơi trú ẩn và đưa vào lưới chiếu hết.',
    ],
    tags: ['Tranh ngôi vô địch', 'Tấn công Vua', 'Thí quân'],
    source: 'https://www.chessgames.com/perl/chessgame?gid=1036342',
  },

  // ------------------------------------------------------------------ 1895
  {
    id: 'pillsbury-tarrasch-1895',
    title: 'Pillsbury – Tarrasch: Cuộc đua tốt ở Hastings',
    white: 'Harry Nelson Pillsbury',
    black: 'Siegbert Tarrasch',
    event: 'Giải Hastings 1895',
    year: 1895,
    result: '1-0',
    opening: 'Gambit Hậu từ chối – Phòng thủ chính thống (Queen\'s Gambit Declined, Orthodox Defence)',
    difficulty: 4,
    context:
      'Giải Hastings 1895 quy tụ gần như mọi kỳ thủ mạnh nhất thế giới: nhà vô địch Lasker, cựu vô địch Steinitz, Chigorin và Tarrasch. Người thắng cuộc lại là chàng trai Mỹ 22 tuổi Harry Nelson Pillsbury trong lần đầu dự một giải quốc tế. Ván thắng Tarrasch – nhà lý luận lừng danh nhất thời đó – là một trong những ván đẹp nhất của ông.',
    summary:
      'Tarrasch đóng trung tâm bằng 11...c4 để tạo đa số tốt ở cánh Hậu, còn Pillsbury dựng Mã ở e5, đẩy f4 rồi dồn toàn lực sang cánh Vua. Hai bên chạy đua: tốt đen ở cánh Hậu tiến dần về hàng 1, trong khi tốt và quân trắng phá tung lá chắn Vua đen. Pillsbury trả lại quân, kéo Vua đen ra h6 và chiếu hết ở nước 52 – đúng lúc tốt c của Đen chỉ còn một bước nữa là phong Hậu.',
    moves:
      '1.d4 d5 2.c4 e6 3.Nc3 Nf6 4.Bg5 Be7 5.Nf3 Nbd7 6.Rc1 O-O 7.e3 b6 8.cxd5 exd5 9.Bd3 Bb7 10.O-O c5 11.Re1 c4 12.Bb1 a6 13.Ne5 b5 14.f4 Re8 15.Qf3 Nf8 16.Ne2 Ne4 17.Bxe7 Rxe7 18.Bxe4 dxe4 19.Qg3 f6 20.Ng4 Kh8 21.f5 Qd7 22.Rf1 Rd8 23.Rf4 Qd6 24.Qh4 Rde8 25.Nc3 Bd5 26.Nf2 Qc6 27.Rf1 b4 28.Ne2 Qa4 29.Ng4 Nd7 30.R4f2 Kg8 31.Nc1 c3 32.b3 Qc6 33.h3 a5 34.Nh2 a4 35.g4 axb3 36.axb3 Ra8 37.g5 Ra3 38.Ng4 Bxb3 39.Rg2 Kh8 40.gxf6 gxf6 41.Nxb3 Rxb3 42.Nh6 Rg7 43.Rxg7 Kxg7 44.Qg3+ Kxh6 45.Kh1 Qd5 46.Rg1 Qxf5 47.Qh4+ Qh5 48.Qf4+ Qg5 49.Rxg5 fxg5 50.Qd6+ Kh5 51.Qxd7 c2 52.Qxh7#',
    annotations: {
      '4': 'Tượng g5 ghim Mã f6 – cách chơi mà Pillsbury góp phần phổ biến, về sau trở thành chuẩn mực của Gambit Hậu.',
      '11...':
        'Tarrasch đóng trung tâm, tạo đa số tốt 3 chọi 2 ở cánh Hậu. Đổi lại, Trắng được rảnh tay ở trung tâm và cánh Vua.',
      '13': 'Mã chiếm tiền đồn e5 – hình mẫu tấn công sau này thường gắn với tên Pillsbury.',
      '14': 'Tốt f4 củng cố Mã e5 và chuẩn bị f5. Mọi quân trắng đều hướng về cánh Vua.',
      '18': 'Trắng đổi Tượng lấy Mã e4 – quân hoạt động tốt nhất của Đen – dù để lại cho Đen tốt e4 khá vững.',
      '21': 'Tốt f5 khóa chặt cánh Vua đen và giành không gian cho các quân trắng.',
      '23': 'Xe được nâng lên f4, sẵn sàng chuyển sang cánh Vua hỗ trợ Hậu.',
      '27...': 'Đen bắt đầu cuộc phản công bằng các tốt ở cánh Hậu.',
      '35': 'Tốt g lao lên: Trắng mở cột g trước Vua đen, chấp nhận để Đen tràn vào cánh Hậu.',
      '38...': 'Đen ăn tốt b3 và có hai tốt thông nguy hiểm ở b4 và c3.',
      '40': 'Cột g mở ra. Cuộc đua bắt đầu: Trắng chiếu hết trước, hay Đen phong Hậu trước?',
      '43': 'Trắng đổi Xe ở g7 để kéo Vua đen ra khỏi góc.',
      '44...': 'Vua đen ăn Mã và Đen hơn hẳn về quân – nhưng Vua đã đứng giữa vòng vây.',
      '45': 'Nước đi yên lặng đầy bình tĩnh: Vua rời g1 để Xe f1 chuyển sang cột g.',
      '52': 'Chiếu hết! Tốt c2 của Đen chỉ còn cách ô phong cấp một bước – Pillsbury thắng cuộc đua đúng một nhịp.',
    },
    keyMoments: ['11...', '13', '35', '45', '52'],
    lessons: [
      'Đóng trung tâm bằng một nước tốt (11...c4) cho đối phương rảnh tay tấn công cánh Vua – hãy cân nhắc kỹ.',
      'Mã ở e5 được tốt f4 yểm trợ là bàn đạp tấn công cánh Vua kinh điển trong Gambit Hậu.',
      'Khi hai bên tấn công ở hai cánh khác nhau, tốc độ là tất cả: hãy đếm nhịp chứ không chỉ đếm quân.',
      'Trong tấn công, sẵn sàng trả lại vật chất để giữ nhịp và mở đường cho Hậu.',
    ],
    tags: ['Tấn công Vua', 'Chiến lược'],
    source: 'https://www.chessgames.com/perl/chessgame?gid=1109079',
  },

  // ------------------------------------------------------------------ 1896
  {
    id: 'pillsbury-lasker-1896',
    title: 'Pillsbury – Lasker: Cơn mưa thí Xe ở St. Petersburg',
    white: 'Harry Nelson Pillsbury',
    black: 'Emanuel Lasker',
    event: 'Giải tứ hùng St. Petersburg 1895/96',
    year: 1896,
    result: '0-1',
    opening: 'Gambit Hậu từ chối – Phòng thủ bán Tarrasch (Queen\'s Gambit Declined, Semi-Tarrasch)',
    difficulty: 4,
    context:
      'Sau Hastings 1895, bốn kỳ thủ hàng đầu là Lasker, Steinitz, Pillsbury và Chigorin được mời tới St. Petersburg thi đấu vòng tròn sáu lượt. Ván này diễn ra đầu tháng 1 năm 1896; Lasker thắng bằng một trong những phối hợp đẹp nhất sự nghiệp và giành giải ván cờ đẹp nhất. Ông cũng là người về nhất giải.',
    summary:
      'Pillsbury nhập thành cánh Hậu và chuẩn bị tấn công, nhưng Lasker ra tay trước. Ở nước 17, ông thí Xe ăn Mã c3, rồi khi Trắng ăn Tượng e6, chính chiếc Xe ấy lao sang a3 để phá tan lá chắn tốt quanh Vua trắng. Pillsbury nhận quân, nhưng Hậu, Xe và Tượng đen lùa Vua trắng chạy dọc bàn cờ cho tới khi ông đầu hàng trước đòn chiếu hết.',
    moves:
      '1.d4 d5 2.c4 e6 3.Nc3 Nf6 4.Nf3 c5 5.Bg5 cxd4 6.Qxd4 Nc6 7.Qh4 Be7 8.O-O-O Qa5 9.e3 Bd7 10.Kb1 h6 11.cxd5 exd5 12.Nd4 O-O 13.Bxf6 Bxf6 14.Qh5 Nxd4 15.exd4 Be6 16.f4 Rac8 17.f5 Rxc3 18.fxe6 Ra3 19.exf7+ Rxf7 20.bxa3 Qb6+ 21.Bb5 Qxb5+ 22.Ka1 Rc7 23.Rd2 Rc4 24.Rhd1 Rc3 25.Qf5 Qc4 26.Kb2 Rxa3 27.Qe6+ Kh7 28.Kxa3 Qc3+ 29.Ka4 b5+ 30.Kxb5 Qc4+',
    annotations: {
      '7':
        'Hậu sang h4 ghim Mã f6. Sau ván này, Pillsbury tin rằng chính nước 7 đã khiến ông thua và âm thầm chuẩn bị một cải tiến suốt tám năm.',
      '8': 'Nhập thành cánh Hậu – Vua trắng sẽ trở thành mục tiêu trên cột c và các đường chéo cánh Hậu.',
      '8...': 'Hậu a5 lập tức nhắm vào cánh Hậu, nơi Vua trắng vừa nhập thành.',
      '10': 'Vua lánh sang b1, nhưng cánh Hậu của Trắng vẫn thưa quân phòng thủ.',
      '14...': 'Đen đổi Mã ở d4. Sau exd4, cột c mở cho Xe đen.',
      '16': 'Pillsbury đẩy tốt f để đuổi Tượng e6 và phản công ở cánh Vua.',
      '17...':
        'Thí Xe! Lasker ăn Mã c3 – quân che chắn quan trọng nhất của Vua trắng – và bỏ mặc Tượng e6 đang bị tốt f5 tấn công.',
      '18...':
        'Lại là chiếc Xe ấy! Nó nhảy sang a3, đe dọa phá tung các tốt a2, b2 quanh Vua trắng. Đây là nước đi bất ngờ nhất của ván cờ.',
      '19': 'Trắng ăn tốt f7 kèm chiếu trước, rồi mới nhận Xe.',
      '20...': 'Hậu chiếu từ b6. Tốt a của Trắng bị đôi, Vua trắng hoàn toàn trống trải.',
      '21...':
        'Hậu ăn Tượng b5 kèm chiếu. Đen chỉ còn kém một chất, nhưng Vua trắng không còn nơi trú ẩn.',
      '23...': 'Xe tiến vào c4 rồi c3, phối hợp với Hậu để vây Vua trắng.',
      '26...': 'Xe ăn tốt a3 – lưới vây quanh Vua trắng khép chặt hơn.',
      '29...': 'Tốt b5 chiếu! Vua trắng buộc phải ăn và tiến sâu hơn vào vùng quân đen.',
      '30...':
        'Pillsbury đầu hàng: nước duy nhất là 31.Ka5, sau đó 31...Bd8+ 32.Qb6 Bxb6# là chiếu hết.',
    },
    keyMoments: ['7', '17...', '18...', '21...', '29...'],
    lessons: [
      'Nhập thành khác cánh biến ván cờ thành cuộc đua tấn công – bên nào mở đường tới Vua trước sẽ thắng.',
      'Quân che chắn quan trọng nhất của Vua (Mã c3) đáng để bạn thí cả một Xe.',
      'Đôi khi nước mạnh nhất là phớt lờ quân đang bị tấn công (Tượng e6) để giữ nhịp tấn công.',
      'Sau mỗi thất bại, hãy phân tích để tìm cải tiến – như Pillsbury đã làm với nước thứ 7.',
    ],
    orientation: 'black',
    tags: ['Thí quân', 'Tấn công Vua'],
    source: 'https://www.chessgames.com/perl/chessgame?gid=1109097',
  },

  // ------------------------------------------------------------------ 1904
  {
    id: 'pillsbury-lasker-1904',
    title: 'Pillsbury – Lasker: Món nợ tám năm ở Cambridge Springs',
    white: 'Harry Nelson Pillsbury',
    black: 'Emanuel Lasker',
    event: 'Giải Cambridge Springs 1904',
    year: 1904,
    result: '1-0',
    opening: 'Gambit Hậu từ chối – Phòng thủ bán Tarrasch (Queen\'s Gambit Declined, Semi-Tarrasch)',
    difficulty: 4,
    context:
      'Sau thất bại ở St. Petersburg năm 1896, Pillsbury được cho là đã nghiền ngẫm nước cải tiến 7.Bxf6 suốt nhiều năm và giữ kín để dành riêng cho Lasker. Cơ hội đến ở giải Cambridge Springs 1904. Khi đó Pillsbury đã mắc bệnh nặng; đây là một trong những chiến thắng lớn cuối cùng của ông trước khi qua đời năm 1906.',
    summary:
      'Ván cờ lặp lại diễn biến năm 1896 cho tới nước 7, khi Pillsbury tung ra nước đã chuẩn bị: đổi Tượng lấy Mã f6, làm cấu trúc tốt cánh Vua đen bị đôi và vỡ. Lasker dùng Hậu ăn tốt b2 trong khi Vua đen còn kẹt ở trung tâm. Pillsbury mở cột f bằng f4, thí Xe ở f5 và dồn Vua đen vào lưới chiếu hết; Lasker đầu hàng ở nước 30.',
    moves:
      '1.d4 d5 2.c4 e6 3.Nc3 Nf6 4.Nf3 c5 5.Bg5 cxd4 6.Qxd4 Nc6 7.Bxf6 gxf6 8.Qh4 dxc4 9.Rd1 Bd7 10.e3 Ne5 11.Nxe5 fxe5 12.Qxc4 Qb6 13.Be2 Qxb2 14.O-O Rc8 15.Qd3 Rc7 16.Ne4 Be7 17.Nd6+ Kf8 18.Nc4 Qb5 19.f4 exf4 20.Qd4 f6 21.Qxf4 Qc5 22.Ne5 Be8 23.Ng4 f5 24.Qh6+ Kf7 25.Bc4 Rc6 26.Rxf5+ Qxf5 27.Rf1 Qxf1+ 28.Kxf1 Bd7 29.Qh5+ Kg8 30.Ne5',
    annotations: {
      '5...': 'Lasker lặp lại hệ thống đã giúp ông thắng ván năm 1896.',
      '7':
        'Nước cải tiến chuẩn bị sẵn! Thay vì 7.Qh4 như năm 1896, Pillsbury lập tức đổi Tượng lấy Mã, để lại cho Đen cặp tốt đôi ở cột f.',
      '8': 'Hậu nhắm vào các tốt cánh Vua đã bị phá vỡ của Đen.',
      '9': 'Xe chiếm cột d mở, cản trở Đen phát triển.',
      '13...':
        'Lasker ăn tốt b2 – thêm một tốt nhưng Hậu đi xa khỏi Vua, trong khi Vua đen vẫn chưa thể nhập thành.',
      '14': 'Trắng bình thản nhập thành: phát triển nhanh quan trọng hơn một tốt.',
      '17': 'Mã chiếu ở d6, buộc Vua đen sang f8 – Đen mất quyền nhập thành.',
      '19': 'Thí tốt để mở cột f nhắm thẳng vào Vua đen ở f8.',
      '20': 'Hậu chiếm trung tâm và tấn công Xe h8 trên đường chéo dài. Đen phải chặn bằng f6.',
      '22': 'Mã nhảy vào e5 rồi g4, khống chế các ô quanh Vua đen.',
      '24': 'Hậu chiếu từ h6, đẩy Vua đen lên f7.',
      '25': 'Tượng nhắm vào e6 – điểm yếu then chốt trong thế trận Đen.',
      '26':
        'Thí Xe quyết định! Xe ăn tốt f5 chiếu. Kiểm tra bằng máy cho thấy sau nước này Trắng có ưu thế rất lớn.',
      '27': 'Xe thứ hai ghim Hậu đen vào Vua f7 trên cột f, buộc Đen phải đổi Hậu lấy Xe.',
      '30':
        'Mã nhảy vào e5, đe dọa nhiều đòn chiếu hết như Qf7+. Lasker đầu hàng; máy tính tìm thấy chiếu hết trong sáu nước.',
    },
    keyMoments: ['7', '13...', '19', '26', '30'],
    lessons: [
      'Chuẩn bị khai cuộc kỹ lưỡng có thể mang lại lợi thế lớn ngay từ những nước đầu.',
      'Phá cấu trúc tốt che chắn Vua (Bxf6 gxf6) tạo ra mục tiêu tấn công lâu dài.',
      'Dùng Hậu ăn tốt ở cánh xa khi Vua còn kẹt ở trung tâm là canh bạc nguy hiểm.',
      'Mở cột f bằng f4 rồi thí quân trên cột đó để Xe và Hậu tràn vào.',
    ],
    tags: ['Khai cuộc', 'Tấn công Vua'],
    source: 'https://www.chessgames.com/perl/chessgame?gid=1036812',
  },

  // ------------------------------------------------------------------ 1909
  {
    id: 'rubinstein-lasker-1909',
    title: 'Rubinstein – Lasker: Kiệt tác tàn cuộc Xe',
    white: 'Akiba Rubinstein',
    black: 'Emanuel Lasker',
    event: 'Giải St. Petersburg 1909',
    year: 1909,
    result: '1-0',
    opening: 'Gambit Hậu từ chối (Queen\'s Gambit Declined)',
    difficulty: 4,
    context:
      'Giải St. Petersburg 1909 kết thúc với Lasker và Rubinstein đồng hạng nhất, bỏ xa phần còn lại. Trong ván đối đầu trực tiếp, Rubinstein đánh bại nhà vô địch thế giới và khẳng định mình là ứng viên xứng tầm cho ngôi vua cờ. Nửa sau ván cờ là một bài học kinh điển về tàn cuộc Xe – sở trường lừng danh của Rubinstein.',
    summary:
      'Ván cờ bùng nổ chiến thuật sớm: Trắng ăn tốt d5, Đen phản công bằng 12...Qg5, rồi cả hai bên thí chất qua lại ở nước 16–17. Khi khói tan, Rubinstein còn Hậu và Xe với một tốt hơn, rồi đổi Hậu để vào tàn cuộc Xe. Bằng cách đưa Xe lên hàng 6, kích hoạt Vua và tiến tốt cánh Vua, ông dồn Đen vào thế không còn nước hữu ích; Lasker đầu hàng ở nước 40.',
    moves:
      '1.d4 d5 2.Nf3 Nf6 3.c4 e6 4.Bg5 c5 5.cxd5 exd5 6.Nc3 cxd4 7.Nxd4 Nc6 8.e3 Be7 9.Bb5 Bd7 10.Bxf6 Bxf6 11.Nxd5 Bxd4 12.exd4 Qg5 13.Bxc6 Bxc6 14.Ne3 O-O-O 15.O-O Rhe8 16.Rc1 Rxe3 17.Rxc6+ bxc6 18.Qc1 Rxd4 19.fxe3 Rd7 20.Qxc6+ Kd8 21.Rf4 f5 22.Qc5 Qe7 23.Qxe7+ Kxe7 24.Rxf5 Rd1+ 25.Kf2 Rd2+ 26.Kf3 Rxb2 27.Ra5 Rb7 28.Ra6 Kf8 29.e4 Rc7 30.h4 Kf7 31.g4 Kf8 32.Kf4 Ke7 33.h5 h6 34.Kf5 Kf7 35.e5 Rb7 36.Rd6 Ke7 37.Ra6 Kf7 38.Rd6 Kf8 39.Rc6 Kf7 40.a3',
    annotations: {
      '4...': 'Đen phản công trung tâm ngay bằng c5.',
      '9': 'Tượng ghim Mã c6, tăng sức ép lên tốt d5.',
      '11': 'Mã ăn tốt d5 – Trắng hơn một tốt, nhưng Đen có sẵn đòn phản công.',
      '12...': 'Hậu g5 tấn công cùng lúc Mã d5 và tốt g2.',
      '14': 'Mã lui về e3: vừa an toàn vừa che chắn tốt g2.',
      '14...': 'Đen nhập thành cánh Hậu và dồn Xe vào cột d, nhắm vào tốt d4 cô lập.',
      '16...': 'Lasker chọn biến sắc bén: Xe ăn Mã e3, nhắm tới việc lấy lại tốt và giữ thế chủ động.',
      '17': 'Phản đòn tuyệt hay: Trắng thí lại Xe ở c6 kèm chiếu để phá lá chắn tốt quanh Vua đen.',
      '18': 'Hậu c1 đánh đôi: tấn công Xe e3 đang bị treo và tốt c6 trước Vua đen.',
      '20': 'Sau loạt đổi quân, vật chất từng ngang nhau, nhưng Hậu trắng ăn tốt c6 kèm chiếu – Trắng hơn một tốt.',
      '23': 'Đổi Hậu khi hơn tốt: đơn giản hóa là con đường an toàn tới chiến thắng.',
      '27': 'Xe tấn công tốt a7 từ bên cạnh, buộc Xe đen vào thế thụ động.',
      '28': 'Xe chiếm hàng 6 – vị trí lý tưởng: ghìm Xe đen vào việc giữ tốt a7 và kìm Vua đen ở hai hàng cuối.',
      '32': 'Vua trắng tiến lên f4 rồi f5 – trong tàn cuộc Xe, Vua chủ động là nửa chiến thắng.',
      '40':
        'Nước chờ tinh tế. Đen không còn nước đi hữu ích: chẳng hạn Vua lùi thì Vua trắng tiến vào g6 tấn công tốt g7. Lasker đầu hàng.',
    },
    keyMoments: ['12...', '17', '18', '28', '40'],
    lessons: [
      'Một đòn thí chất của đối phương có thể được đáp trả bằng đòn thí chất của chính bạn (17.Rxc6+).',
      'Khi hơn tốt, đổi Hậu để vào tàn cuộc đơn giản là cách chắc chắn.',
      'Trong tàn cuộc Xe: Xe mình chủ động (Ra6), Xe đối phương thụ động (Rb7) là lợi thế rất lớn.',
      'Hãy đưa Vua lên phía trước trong tàn cuộc – Vua là một quân tấn công mạnh.',
      'Khi đối phương không còn nước hữu ích, một nước chờ có thể quyết định ván cờ.',
    ],
    tags: ['Tàn cuộc', 'Chiến thuật'],
    source: 'https://www.chessgames.com/perl/chessgame?gid=1119726',
  },

  // ------------------------------------------------------------------ 1910
  {
    id: 'lasker-schlechter-1910',
    title: 'Lasker – Schlechter: Ván quyết định trận tranh ngôi 1910',
    white: 'Emanuel Lasker',
    black: 'Carl Schlechter',
    event: 'Trận tranh ngôi vô địch thế giới 1910 (ván 10)',
    year: 1910,
    result: '1-0',
    opening: 'Phòng thủ Slav – Biến Schlechter (Slav Defence, Schlechter Variation)',
    difficulty: 5,
    context:
      'Trận tranh ngôi năm 1910 giữa nhà vô địch Lasker và kỳ thủ người Áo Carl Schlechter – nổi tiếng với lối chơi chắc chắn, rất hiếm khi thua – chỉ kéo dài mười ván, diễn ra ở Vienna và Berlin. Trước ván cuối, Schlechter dẫn trước nhờ thắng ván 5 và hòa tất cả các ván còn lại. Lasker buộc phải thắng ván 10 để san bằng tỉ số 5–5 và giữ ngôi vô địch.',
    summary:
      'Cần thắng bằng mọi giá, Lasker chơi gây gổ, đẩy tốt g để mở cột g và thí Tượng tạm thời ở g6. Schlechter – người chỉ cần một ván hòa – cũng không chọn lối chơi an toàn: Hậu đen xông vào cánh Vua trắng, và ở nước 35 ông còn thí chất để tấn công. Lasker phòng thủ bền bỉ, giữ được lợi thế chất và sau hơn bảy mươi nước, chuyển thành công sang tàn cuộc Xe chọi Mã để thắng, giữ được ngôi vô địch.',
    moves:
      '1.d4 d5 2.c4 c6 3.Nf3 Nf6 4.e3 g6 5.Nc3 Bg7 6.Bd3 O-O 7.Qc2 Na6 8.a3 dxc4 9.Bxc4 b5 10.Bd3 b4 11.Na4 bxa3 12.bxa3 Bb7 13.Rb1 Qc7 14.Ne5 Nh5 15.g4 Bxe5 16.gxh5 Bg7 17.hxg6 hxg6 18.Qc4 Bc8 19.Rg1 Qa5+ 20.Bd2 Qd5 21.Rc1 Bb7 22.Qc2 Qh5 23.Bxg6 Qxh2 24.Rf1 fxg6 25.Qb3+ Rf7 26.Qxb7 Raf8 27.Qb3 Kh8 28.f4 g5 29.Qd3 gxf4 30.exf4 Qh4+ 31.Ke2 Qh2+ 32.Rf2 Qh5+ 33.Rf3 Nc7 34.Rxc6 Nb5 35.Rc4 Rxf4 36.Bxf4 Rxf4 37.Rc8+ Bf8 38.Kf2 Qh2+ 39.Ke1 Qh1+ 40.Rf1 Qh4+ 41.Kd2 Rxf1 42.Qxf1 Qxd4+ 43.Qd3 Qf2+ 44.Kd1 Nd6 45.Rc5 Bh6 46.Rd5 Kg8 47.Nc5 Qg1+ 48.Kc2 Qc1+ 49.Kb3 Bg7 50.Ne6 Qb2+ 51.Ka4 Kf7 52.Nxg7 Qxg7 53.Qb3 Ke8 54.Qb8+ Kf7 55.Qxa7 Qg4+ 56.Qd4 Qd7+ 57.Kb3 Qb7+ 58.Ka2 Qc6 59.Qd3 Ke6 60.Rg5 Kd7 61.Re5 Qg2+ 62.Re2 Qg4 63.Rd2 Qa4 64.Qf5+ Kc7 65.Qc2+ Qxc2+ 66.Rxc2+ Kb6 67.Re2 Nc8 68.Kb3 Kc6 69.Rc2+ Kb7 70.Kb4 Na7 71.Kc5',
    annotations: {
      '4...':
        'Biến Schlechter của Phòng thủ Slav: Đen kết hợp cặp tốt c6–d5 với Tượng fianchetto ở g7 – vũ khí mang tên chính Schlechter.',
      '9...': 'Đen mở rộng cánh Hậu bằng b5, giành nhịp đuổi Tượng.',
      '13': 'Xe chiếm cột b mở, nhắm vào Tượng b7.',
      '15':
        'Lasker – người buộc phải thắng – chọn phương án gây gổ nhất: đẩy tốt g đuổi Mã, sẵn sàng mở cột g ngay trước Vua mình.',
      '17': 'Sau loạt đổi quân, cột g và cột h mở toang, tạo đường cho các Xe trắng.',
      '22...': 'Hậu đen sang h5, nhắm vào tốt h2 và cánh Vua trắng.',
      '23':
        'Thí Tượng ở g6! Trắng để Hậu đen ăn tốt h2 nhằm mở đường cho nước chiếu Qb3+ và lấy lại quân ở b7.',
      '25': 'Hậu chiếu từ b3, nước sau ăn Tượng b7: vật chất lại cân bằng.',
      '34': 'Xe ăn tốt c6 – giờ Trắng hơn một tốt.',
      '35...':
        'Thí chất! Thay vì phòng thủ để giữ hòa – kết quả đủ để đoạt ngôi – Schlechter dùng Xe ăn tốt f4 để mở đường tấn công Vua trắng.',
      '36': 'Lasker ăn Xe: Trắng hơn chất, nhưng Vua trắng phải đối mặt với Hậu và Xe đen.',
      '41...':
        'Đen đổi Xe rồi ăn tốt d4 kèm chiếu. Trắng có Hậu, Xe và Mã đấu Hậu, Tượng, Mã và hai tốt của Đen – hơn chất nhưng kém một tốt.',
      '52': 'Trắng đổi Mã lấy Tượng g7 để đơn giản hóa: giờ là Hậu và Xe đấu Hậu và Mã.',
      '65':
        'Đổi Hậu! Tàn cuộc Xe chọi Mã, mỗi bên một tốt. Xe trắng sẽ cắt Vua đen ở cột c, tách nó khỏi tốt e7.',
      '71':
        'Vua trắng tiến sang c5, sẵn sàng tiến về phía tốt e7. Schlechter đầu hàng; Lasker san bằng tỉ số 5–5 và giữ ngôi vô địch.',
    },
    keyMoments: ['15', '23', '35...', '65', '71'],
    lessons: [
      'Khi buộc phải thắng, hãy tạo thế cờ mất cân bằng, nhiều khả năng cho cả hai bên.',
      'Khi chỉ cần hòa, mạo hiểm không cần thiết có thể phải trả giá đắt.',
      'Hơn chất (Xe đổi Tượng hoặc Mã) thường quyết định trong tàn cuộc nếu bạn kiên nhẫn đổi bớt quân.',
      'Tàn cuộc Xe chọi Mã: dùng Xe cắt Vua đối phương khỏi tốt, rồi đưa Vua mình tới ăn tốt.',
    ],
    tags: ['Tranh ngôi vô địch', 'Tàn cuộc'],
    source: 'https://www.chessgames.com/perl/chessgame?gid=1121156',
  },

  // ------------------------------------------------------------------ 1911
  {
    id: 'capablanca-bernstein-1911',
    title: 'Capablanca – Bernstein: Giải ván cờ đẹp nhất San Sebastián',
    white: 'José Raúl Capablanca',
    black: 'Ossip Bernstein',
    event: 'Giải San Sebastián 1911',
    year: 1911,
    result: '1-0',
    opening: 'Ván cờ Tây Ban Nha – Phòng thủ Berlin (Ruy Lopez, Berlin Defence)',
    difficulty: 4,
    context:
      'Giải San Sebastián 1911 chỉ mời những kỳ thủ từng có thành tích lớn, và một số kiện tướng – trong đó có Ossip Bernstein – phản đối việc chàng trai Cuba 22 tuổi Capablanca được tham dự. Trớ trêu thay, hai người gặp nhau ngay vòng đầu. Capablanca thắng ván này, giành giải ván cờ đẹp nhất và cuối cùng vô địch cả giải.',
    summary:
      'Capablanca đổi Tượng lấy Mã để làm yếu cấu trúc tốt của Đen, rồi đặt hai Mã ở f5 và h5 sát cánh Vua đen. Bernstein đáp trả bằng cách dùng Hậu ăn hai tốt ở cánh Hậu (a2 và c2), để lại Vua mình thiếu quân bảo vệ. Hai Mã trắng lao vào g7 và f6 phá tan lá chắn, Vua đen bị đuổi ra g5 và Bernstein đầu hàng trước đòn chiếu hết.',
    moves:
      '1.e4 e5 2.Nf3 Nc6 3.Bb5 Nf6 4.O-O Be7 5.Nc3 d6 6.Bxc6+ bxc6 7.d4 exd4 8.Nxd4 Bd7 9.Bg5 O-O 10.Re1 h6 11.Bh4 Nh7 12.Bxe7 Qxe7 13.Qd3 Rab8 14.b3 Ng5 15.Rad1 Qe5 16.Qe3 Ne6 17.Nce2 Qa5 18.Nf5 Nc5 19.Ned4 Kh7 20.g4 Rbe8 21.f3 Ne6 22.Ne2 Qxa2 23.Neg3 Qxc2 24.Rc1 Qb2 25.Nh5 Rh8 26.Re2 Qe5 27.f4 Qb5 28.Nfxg7 Nc5 29.Nxe8 Bxe8 30.Qc3 f6 31.Nxf6+ Kg6 32.Nh5 Rg8 33.f5+ Kg5 34.Qe3+',
    annotations: {
      '6': 'Đổi Tượng lấy Mã để Đen bị tốt đôi ở cột c – một nhược điểm cấu trúc lâu dài.',
      '9': 'Tượng ghim Mã f6, tăng sức ép.',
      '12': 'Đổi Tượng: Trắng chỉ còn hai Mã, nhưng chúng sẽ trở thành những quân tấn công đáng sợ.',
      '17': 'Mã chuẩn bị nhảy vào f5 – một tiền đồn sát cánh Vua đen.',
      '18': 'Mã chiếm f5, khống chế các ô d6, g7 và h6 quanh Vua đen.',
      '22...': 'Hậu đen ăn tốt a2 – nhận vật chất nhưng rời xa Vua.',
      '23...':
        'Ăn thêm tốt c2. Theo chính Capablanca, đây là sai lầm nghiêm trọng: Hậu đen giờ hoàn toàn lạc khỏi cánh Vua.',
      '25': 'Mã thứ hai nhảy vào h5. Cả hai Mã đều áp sát Vua đen, nhắm vào ô g7.',
      '27': 'Tốt f4 đuổi Hậu đen khỏi e5 – ô phòng thủ quan trọng của Đen.',
      '28': 'Thí Mã! Mã ăn tốt g7, vừa phá lá chắn tốt vừa tấn công Xe e8.',
      '29': 'Mã ăn Xe e8: Trắng hơn chất và lá chắn Vua đen đã vỡ.',
      '30': 'Hậu sang c3, chĩa thẳng đường chéo dài vào Xe h8 và ô g7.',
      '31': 'Thí Mã lần nữa! Mã ăn tốt f6 chiếu, kéo Vua đen ra khỏi nơi trú ẩn.',
      '33': 'Tốt f chiếu, đẩy Vua đen ra g5.',
      '34': 'Hậu chiếu từ e3. Bernstein đầu hàng trước đòn chiếu hết: 34...Kh4 35.Qg3+ Kg5 36.h4#.',
    },
    keyMoments: ['6', '22...', '23...', '28', '31'],
    lessons: [
      'Tốt đôi ở cột c là nhược điểm lâu dài – hãy cân nhắc trước khi cho đối phương đổi Tượng lấy Mã.',
      'Mã đặt ở f5 là quân tấn công cực mạnh trước Vua đã nhập thành.',
      'Dùng Hậu ăn tốt ở cánh xa khi đối phương đang dồn quân về phía Vua mình là canh bạc chết người.',
      'Thí quân để phá lá chắn tốt (Nxg7, Nxf6+) mở đường cho Hậu tấn công Vua.',
    ],
    tags: ['Tấn công Vua', 'Chiến lược'],
    source: 'https://www.chessgames.com/perl/chessgame?gid=1264025',
  },

  // ------------------------------------------------------------------ 1912
  {
    id: 'levitsky-marshall-1912',
    title: 'Levitsky – Marshall: Nước đi "mưa tiền vàng"',
    white: 'Stepan Levitsky',
    black: 'Frank James Marshall',
    event: 'Đại hội cờ Đức lần thứ 18, Breslau 1912',
    year: 1912,
    result: '0-1',
    opening: 'Phòng thủ Pháp (French Defence)',
    difficulty: 3,
    context:
      'Frank Marshall – nhà vô địch nước Mỹ, nổi tiếng với những đòn tấn công và "bẫy" hiểm hóc – gặp kiện tướng Nga Stepan Levitsky tại giải Breslau 1912. Ván cờ kết thúc bằng một trong những nước đi đẹp nhất lịch sử. Theo lời Marshall kể lại, khán giả phấn khích đến mức ném tiền vàng lên bàn cờ, dù giai thoại này chưa từng được xác nhận.',
    summary:
      'Đen chơi khai cuộc năng động, chấp nhận tốt cô lập ở d5 để có các quân hoạt động. Marshall dồn hai Xe lên cột f, đưa Mã vào d4 và Hậu vào c3. Khi Trắng đưa Hậu sang h5 – rời xa nhiệm vụ phòng thủ – Marshall tung đòn kết thúc 23...Qg3!!: Hậu đen đứng ở ô bị ba quân trắng tấn công, nhưng ăn nó bằng cách nào cũng dẫn tới chiếu hết hoặc mất quân.',
    moves:
      '1.d4 e6 2.e4 d5 3.Nc3 c5 4.Nf3 Nc6 5.exd5 exd5 6.Be2 Nf6 7.O-O Be7 8.Bg5 O-O 9.dxc5 Be6 10.Nd4 Bxc5 11.Nxe6 fxe6 12.Bg4 Qd6 13.Bh3 Rae8 14.Qd2 Bb4 15.Bxf6 Rxf6 16.Rad1 Qc5 17.Qe2 Bxc3 18.bxc3 Qxc3 19.Rxd5 Nd4 20.Qh5 Ref8 21.Re5 Rh6 22.Qg5 Rxh3 23.Rc5 Qg3',
    annotations: {
      '3...': 'Đen phá trung tâm ngay bằng c5, chấp nhận khả năng có tốt cô lập để đổi lấy sự phát triển nhanh.',
      '9': 'Trắng ăn tốt c5, buộc Đen lấy lại bằng Tượng và để lại tốt d5 cô lập.',
      '11': 'Trắng đổi Mã lấy Tượng e6. Sau fxe6, cột f mở cho Xe đen.',
      '12...': 'Hậu d6 cùng Xe f8 hướng về cánh Vua trắng.',
      '14...': 'Tượng ghim Mã c3 vào Hậu d2.',
      '18...': 'Đen ăn tốt c3 và có Hậu hoạt động mạnh.',
      '19':
        'Trắng lấy lại tốt d5 nhờ đòn ghim: nếu 19...exd5?? thì 20.Qxe8+ Rf8 21.Be6+ Kh8 22.Qxf8# – tốt e6 bị Hậu trắng ghim vào Xe e8.',
      '19...': 'Mã nhảy vào d4, tấn công Hậu e2 và tham gia tấn công.',
      '20':
        'Sai lầm. Hậu sang h5 trông tích cực nhưng rời xa nhiệm vụ phòng thủ. Kiểm tra bằng máy cho thấy 20.Qe4 giữ thế cờ cân bằng hơn nhiều.',
      '20...': 'Hai Xe đen chồng lên nhau trên cột f, nhắm vào tốt f2.',
      '21...': 'Xe chuyển sang h6, tấn công Hậu h5.',
      '22...': 'Xe ăn Tượng h3, phá tan lá chắn quanh Vua trắng.',
      '23...':
        'Nước đi bất hủ! Hậu đen vào g3, nơi tốt h2, tốt f2 và Hậu g5 đều có thể ăn nó. Nhưng: 24.hxg3 Ne2#; 24.fxg3 Ne2+ 25.Kh1 Rxf1#; 24.Qxg3 Ne2+ 25.Kh1 Nxg3+ 26.Kg1 Nxf1 và Đen hơn hẳn quân. Levitsky đầu hàng.',
    },
    keyMoments: ['19', '20', '22...', '23...'],
    lessons: [
      'Tốt cô lập (d5) đổi lại quân hoạt động – bên có tốt cô lập nên chơi tích cực.',
      'Hai Xe chồng trên cột mở hướng vào Vua là vũ khí rất mạnh.',
      'Luôn xem xét cả những nước "không thể": một quân bị nhiều quân tấn công vẫn an toàn nếu mọi cách ăn đều thua.',
      'Đòn chiếu hết bằng Mã (Ne2#) thường xuất hiện khi Vua bị chính quân mình chắn đường.',
    ],
    orientation: 'black',
    tags: ['Thí quân', 'Chiến thuật', 'Ván ngắn'],
    source: 'https://www.chessgames.com/perl/chessgame?gid=1094915',
  },

  // ------------------------------------------------------------------ 1914
  {
    id: 'bernstein-capablanca-1914',
    title: 'Bernstein – Capablanca: Nước Hậu b2 ở Moscow',
    white: 'Ossip Bernstein',
    black: 'José Raúl Capablanca',
    event: 'Trận đấu tập Capablanca – Bernstein, Moscow 1914',
    year: 1914,
    result: '0-1',
    opening: 'Gambit Hậu từ chối – Phòng thủ chính thống (Queen\'s Gambit Declined, Orthodox Defence)',
    difficulty: 3,
    context:
      'Đầu năm 1914, trong chuyến thăm nước Nga trước giải St. Petersburg, Capablanca đấu với Ossip Bernstein tại Moscow – người từng phản đối sự có mặt của ông ở San Sebastián 1911. Ván cờ nổi tiếng nhờ nước kết thúc đẹp mắt của Capablanca, một ví dụ kinh điển về đòn khai thác hàng cuối yếu.',
    summary:
      'Đen nhận cặp tốt treo c5–d5, rồi đẩy c4 và c3 để có một tốt thông được bảo vệ cắm sâu vào thế trận Trắng. Trắng vây quanh tốt c3 và cuối cùng ăn được nó bằng 27.Nxc3 – nhưng đó chính là cái bẫy. Sau loạt đổi quân, Capablanca chơi 29...Qb2!!: Xe c3 bị tấn công, còn Hậu trắng không thể rời nhiệm vụ canh hàng cuối. Bernstein đầu hàng ngay.',
    moves:
      '1.d4 d5 2.c4 e6 3.Nc3 Nf6 4.Nf3 Be7 5.Bg5 O-O 6.e3 Nbd7 7.Rc1 b6 8.cxd5 exd5 9.Qa4 Bb7 10.Ba6 Bxa6 11.Qxa6 c5 12.Bxf6 Nxf6 13.dxc5 bxc5 14.O-O Qb6 15.Qe2 c4 16.Rfd1 Rfd8 17.Nd4 Bb4 18.b3 Rac8 19.bxc4 dxc4 20.Rc2 Bxc3 21.Rxc3 Nd5 22.Rc2 c3 23.Rdc1 Rc5 24.Nb3 Rc6 25.Nd4 Rc7 26.Nb5 Rc5 27.Nxc3 Nxc3 28.Rxc3 Rxc3 29.Rxc3 Qb2',
    annotations: {
      '7...': 'Đen chuẩn bị đưa Tượng lên b7 – hệ thống phòng thủ vững chắc trong Gambit Hậu.',
      '9': 'Hậu a4 rồi Ba6: Trắng muốn đổi Tượng ô trắng tốt của Đen.',
      '11...': 'Đen phá thế bằng c5, sẵn sàng nhận cặp tốt treo.',
      '13...':
        'Đen có cặp tốt treo c5–d5: là điểm yếu nếu bị bao vây, nhưng là sức mạnh nếu được đẩy lên đúng lúc.',
      '15...': 'Tốt c tiến lên c4, mở đường chéo b6–g1 cho Hậu đen và giành thêm không gian.',
      '17...': 'Tượng ghim Mã c3, tăng sức ép lên cánh Hậu trắng.',
      '19...': 'Sau dxc4, Đen có một tốt thông ở c4 – Trắng không còn tốt nào ở các cột b, c, d.',
      '22...': 'Tốt thông tiến lên c3, được Mã d5 bảo vệ – một cái gai giữa thế trận Trắng.',
      '26': 'Mã nhảy vào b5, tấn công tốt c3 thêm một lần nữa.',
      '27':
        'Sai lầm quyết định! Ăn tốt c3 trông an toàn vì sau các cuộc đổi quân mọi quân trắng đều được bảo vệ. Kiểm tra bằng máy cho thấy sau nước này Đen giành ưu thế lớn.',
      '28...': 'Đổi Xe để dọn đường cho đòn kết thúc.',
      '29...':
        'Nước đi tuyệt đẹp! Hậu b2 tấn công Xe c3. Hậu trắng không thể ăn Hậu đen vì 30.Qxb2 Rd1# – hàng cuối của Trắng bị bỏ ngỏ. Xe c3 cũng không thể đi đâu mà vẫn giữ được hàng cuối, ví dụ 30.Rc8 Qb1+ 31.Qf1 Qxf1+ 32.Kxf1 Rxc8. Bernstein đầu hàng.',
    },
    keyMoments: ['13...', '22...', '27', '29...'],
    lessons: [
      'Cặp tốt treo mạnh khi được đẩy lên đúng lúc để tạo tốt thông.',
      'Một tốt thông được bảo vệ cắm sâu trong thế trận đối phương trói chân nhiều quân của họ.',
      'Hàng cuối không có ô thoát cho Vua là điểm yếu chết người khi quân phòng thủ bị kéo đi.',
      'Trước khi ăn quân, hãy kiểm tra xem các quân của mình có đang gánh nhiệm vụ phòng thủ nào không.',
    ],
    orientation: 'black',
    tags: ['Chiến thuật', 'Chiến lược'],
    source: 'https://www.chessgames.com/perl/chessgame?gid=1261680',
  },

  {
    id: 'nimzowitsch-tarrasch-1914',
    title: 'Nimzowitsch – Tarrasch: Lại một đòn thí hai Tượng',
    white: 'Aron Nimzowitsch',
    black: 'Siegbert Tarrasch',
    event: 'Giải St. Petersburg 1914',
    year: 1914,
    result: '0-1',
    opening: 'Gambit Hậu từ chối – Thế đối xứng (Queen\'s Gambit Declined, Symmetrical)',
    difficulty: 4,
    context:
      'St. Petersburg 1914 là một trong những giải mạnh nhất đầu thế kỷ 20. Tarrasch và Nimzowitsch là đôi đối thủ gay gắt cả trên bàn cờ lẫn trên trang sách: Tarrasch bảo vệ những nguyên tắc cổ điển, còn Nimzowitsch đang manh nha những tư tưởng mới về sau gọi là siêu hiện đại. Ván này được trao giải nhì ván cờ đẹp nhất giải, và gợi nhớ ngay tới đòn thí hai Tượng của Lasker năm 1889.',
    summary:
      'Tarrasch nhận cặp tốt treo c5–d5 và đặt hai Tượng nhắm thẳng về cánh Vua trắng: Tượng d6 nhìn h2, Tượng c6 nằm trên đường chéo dài. Ở nước 18 ông đẩy d4 mở đường chéo, rồi lần lượt thí hai Tượng ở h2 và g2. Vua trắng bị lôi ra khỏi chỗ trú ẩn, chạy tận lên d7 và bị chiếu hết bằng nước Tượng b5.',
    moves:
      '1.d4 d5 2.Nf3 c5 3.c4 e6 4.e3 Nf6 5.Bd3 Nc6 6.O-O Bd6 7.b3 O-O 8.Bb2 b6 9.Nbd2 Bb7 10.Rc1 Qe7 11.cxd5 exd5 12.Nh4 g6 13.Nhf3 Rad8 14.dxc5 bxc5 15.Bb5 Ne4 16.Bxc6 Bxc6 17.Qc2 Nxd2 18.Nxd2 d4 19.exd4 Bxh2+ 20.Kxh2 Qh4+ 21.Kg1 Bxg2 22.f3 Rfe8 23.Ne4 Qh1+ 24.Kf2 Bxf1 25.d5 f5 26.Qc3 Qg2+ 27.Ke3 Rxe4+ 28.fxe4 f4+ 29.Kxf4 Rf8+ 30.Ke5 Qh2+ 31.Ke6 Re8+ 32.Kd7 Bb5#',
    annotations: {
      '12': 'Mã sang h4 rồi lại quay về f3 ở nước sau – Trắng mất hai nhịp quý giá.',
      '14': 'Trắng đổi tốt, để lại cho Đen cặp tốt treo c5–d5 và định bao vây chúng.',
      '14...': 'Tốt treo c5–d5: Nimzowitsch xem đó là mục tiêu, Tarrasch xem đó là nguồn sức mạnh.',
      '15...': 'Mã nhảy vào e4 để đổi bớt quân phòng thủ của Trắng.',
      '18...':
        'Tốt d4! Nước đi đa năng: chặn đường chéo dài của Tượng b2, đồng thời mở đường chéo c6–g2 cho Tượng c6 nhắm thẳng vào Vua trắng.',
      '19...': 'Thí Tượng thứ nhất! Tượng ăn h2 chiếu, kéo Vua trắng ra.',
      '20...': 'Hậu chiếu từ h4, Vua trắng phải lui về g1.',
      '21...':
        'Thí Tượng thứ hai! Nếu 22.Kxg2 thì 22...Qg4+ 23.Kh2 Rd5! và Xe sang h5 – Trắng phải bỏ Hậu để tránh bị chiếu hết.',
      '22': 'Trắng từ chối ăn Tượng, đẩy f3 để mở đường chạy cho Vua qua f2, nhưng Đen vẫn duy trì thế tấn công.',
      '24...': 'Tượng ăn Xe f1 – Đen đã lấy lại nhiều hơn số vật chất đã thí.',
      '25': 'Trắng mở đường chéo dài cho Tượng b2, hy vọng phản công vào Vua đen.',
      '26...': 'Hậu chiếu, cuộc săn Vua trắng bắt đầu.',
      '27...': 'Thí Xe! Xe ăn Mã e4 chiếu để mở đường cho tốt f.',
      '28...': 'Tốt f chiếu, lôi Vua trắng ra giữa bàn cờ.',
      '32...': 'Chiếu hết! Tượng b5 kết liễu Vua trắng đang đứng ở d7 – sâu trong hàng ngũ quân đen.',
    },
    keyMoments: ['18...', '19...', '21...', '27...', '32...'],
    lessons: [
      'Tốt treo không chỉ là điểm yếu: đẩy đúng lúc (…d4) có thể mở đường cho các quân tấn công.',
      'Hai Tượng nhắm song song vào Vua là tín hiệu để tìm đòn thí kép như Lasker – Bauer 1889.',
      'Đừng phí nhịp trong khai cuộc (Nh4 rồi lại Nf3).',
      'Khi Vua đối phương bị kéo ra giữa bàn cờ, hãy dùng chiếu liên tục và thí quân để không cho nó trở về nơi an toàn.',
    ],
    orientation: 'black',
    tags: ['Thí quân', 'Tấn công Vua'],
    source: 'https://www.chessgames.com/perl/chessgame?gid=1102384',
  },

  {
    id: 'lasker-capablanca-1914',
    title: 'Lasker – Capablanca: Bài học Biến đổi quân ở St. Petersburg',
    white: 'Emanuel Lasker',
    black: 'José Raúl Capablanca',
    event: 'Giải St. Petersburg 1914 (vòng chung kết)',
    year: 1914,
    result: '1-0',
    opening: 'Ván cờ Tây Ban Nha – Biến đổi quân (Ruy Lopez, Exchange Variation)',
    difficulty: 4,
    context:
      'Ở vòng chung kết giải St. Petersburg 1914, Capablanca dẫn trước Lasker và được xem là ứng viên số một cho chức vô địch. Trong cuộc đối đầu trực tiếp ở vòng 19, Lasker cần thắng bằng mọi giá. Ông chọn Biến đổi quân của Ván cờ Tây Ban Nha – khai cuộc nổi tiếng là "hiền lành" – và thắng thuyết phục, mở đường để vượt lên giành ngôi đầu với cách biệt nửa điểm.',
    summary:
      'Lasker đổi Tượng lấy Mã và đổi Hậu sớm, đưa ván cờ vào thế không Hậu. Bằng nước 12.f5 táo bạo, ông nhường ô e5 nhưng hạn chế Tượng c8 và giành tiền đồn e6 cho Mã. Capablanca chơi quá thụ động; Trắng mở cột h ở cánh Vua, đột phá trung tâm bằng 35.e5 và các quân trắng tràn vào. Capablanca đầu hàng ở nước 42.',
    moves:
      '1.e4 e5 2.Nf3 Nc6 3.Bb5 a6 4.Bxc6 dxc6 5.d4 exd4 6.Qxd4 Qxd4 7.Nxd4 Bd6 8.Nc3 Ne7 9.O-O O-O 10.f4 Re8 11.Nb3 f6 12.f5 b6 13.Bf4 Bb7 14.Bxd6 cxd6 15.Nd4 Rad8 16.Ne6 Rd7 17.Rad1 Nc8 18.Rf2 b5 19.Rfd2 Rde7 20.b4 Kf7 21.a3 Ba8 22.Kf2 Ra7 23.g4 h6 24.Rd3 a5 25.h4 axb4 26.axb4 Rae7 27.Kf3 Rg8 28.Kf4 g6 29.Rg3 g5+ 30.Kf3 Nb6 31.hxg5 hxg5 32.Rh3 Rd7 33.Kg3 Ke8 34.Rdh1 Bb7 35.e5 dxe5 36.Ne4 Nd5 37.N6c5 Bc8 38.Nxd7 Bxd7 39.Rh7 Rf8 40.Ra1 Kd8 41.Ra8+ Bc8 42.Nc5',
    annotations: {
      '4':
        'Biến đổi quân: Trắng nhường cặp Tượng nhưng làm Đen bị tốt đôi ở cột c. Ý đồ chiến lược là đổi bớt quân để phát huy đa số tốt 4 chọi 3 ở cánh Vua.',
      '7': 'Đổi Hậu sớm: ván cờ chuyển sang thế không Hậu, nơi cấu trúc tốt đóng vai trò quyết định.',
      '10': 'Tiến tốt f để phát huy đa số tốt cánh Vua.',
      '11...': 'Đen đặt tốt f6 để giữ ô e5, nhưng làm yếu ô e6.',
      '12':
        'Nước đi nổi tiếng! Tốt f5 nhường hẳn ô e5 cho Đen nhưng khóa ô e6, hạn chế Tượng c8 và chuẩn bị đưa Mã vào e6. Máy tính ngày nay cũng chọn đúng nước này.',
      '14': 'Đổi Tượng d6 – quân Đen có thể tận dụng ô e5.',
      '16': 'Mã chiếm tiền đồn e6, được tốt f5 bảo vệ, gây khó chịu lớn cho thế trận Đen.',
      '20': 'Tốt b4 kìm chân các tốt cánh Hậu của Đen trước khi Trắng mở mặt trận mới.',
      '23': 'Mặt trận thứ hai: tốt g và h tiến lên ở cánh Vua.',
      '31': 'Cột h được mở; các Xe trắng sẽ chiếm lĩnh nó.',
      '34': 'Hai Xe chồng trên cột h, sẵn sàng xâm nhập.',
      '35': 'Đột phá! Tốt e5 mở ô e4 cho Mã c3 và mở đường cho các quân trắng tràn vào thế trận Đen.',
      '37': 'Mã từ e6 nhảy sang c5, đánh đôi Xe d7 và Tượng b7.',
      '39': 'Trắng đã ăn Xe d7 – hơn chất. Xe h7 xâm nhập hàng 7.',
      '42': 'Mã còn lại từ e4 nhảy vào c5, khép lưới quanh Vua đen ở d8. Đen không còn cách chống đỡ các đe dọa của Xe và Mã; Capablanca đầu hàng.',
    },
    keyMoments: ['4', '12', '16', '35', '42'],
    lessons: [
      'Biến đổi quân trong Ván cờ Tây Ban Nha: đa số tốt cánh Vua lành lặn là lợi thế lâu dài.',
      'Đôi khi nên nhường một ô (e5) để giành ô quan trọng hơn (e6) – hãy đánh giá quân nào thực sự hưởng lợi.',
      'Phòng thủ thụ động trong thế cờ đóng cho đối phương thời gian mở mặt trận thứ hai.',
      'Khi đối thủ dồn quân phòng thủ một cánh, hãy mở mặt trận ở cánh kia (cột h) rồi đột phá trung tâm.',
    ],
    tags: ['Chiến lược', 'Tàn cuộc'],
    source: 'https://www.chessgames.com/perl/chessgame?gid=1258181',
  },

  // ------------------------------------------------------------------ 1918
  {
    id: 'capablanca-marshall-1918',
    title: 'Capablanca – Marshall: Màn ra mắt của Tấn công Marshall',
    white: 'José Raúl Capablanca',
    black: 'Frank James Marshall',
    event: 'Giải các kiện tướng Câu lạc bộ cờ Manhattan, New York 1918',
    year: 1918,
    result: '1-0',
    opening: 'Ván cờ Tây Ban Nha – Tấn công Marshall (Ruy Lopez, Marshall Attack)',
    difficulty: 4,
    context:
      'Frank Marshall từng thua đậm Capablanca trong trận đấu năm 1909, và giai thoại kể rằng ông đã âm thầm chuẩn bị một gambit mới trong Ván cờ Tây Ban Nha suốt nhiều năm để dành cho đối thủ này – dù điều đó chưa bao giờ được chứng minh. Tháng 10 năm 1918, ở vòng đầu giải New York, Marshall lần đầu tung ra nước 8...d5 trước Capablanca. Ông thua ván này, nhưng "Tấn công Marshall" về sau trở thành một vũ khí quan trọng của Đen, vẫn được các kỳ thủ hàng đầu sử dụng đến ngày nay.',
    summary:
      'Marshall thí tốt e5 để giành thế chủ động và đưa quân ào ạt sang cánh Vua trắng, thậm chí thí cả Mã ở f2. Capablanca bình tĩnh nhận quân, đưa Vua đi bộ từ g1 sang tận c2 giữa làn mưa chiếu và từng bước hóa giải đợt tấn công. Khi bão tan, Trắng hơn quân; Capablanca chuyển sang phản công ở cánh Hậu, tốt b tiến tới b7 và ván cờ kết thúc bằng nước 36.Bxf7+.',
    moves:
      '1.e4 e5 2.Nf3 Nc6 3.Bb5 a6 4.Ba4 Nf6 5.O-O Be7 6.Re1 b5 7.Bb3 O-O 8.c3 d5 9.exd5 Nxd5 10.Nxe5 Nxe5 11.Rxe5 Nf6 12.Re1 Bd6 13.h3 Ng4 14.Qf3 Qh4 15.d4 Nxf2 16.Re2 Bg4 17.hxg4 Bh2+ 18.Kf1 Bg3 19.Rxf2 Qh1+ 20.Ke2 Bxf2 21.Bd2 Bh4 22.Qh3 Rae8+ 23.Kd3 Qf1+ 24.Kc2 Bf2 25.Qf3 Qg1 26.Bd5 c5 27.dxc5 Bxc5 28.b4 Bd6 29.a4 a5 30.axb5 axb4 31.Ra6 bxc3 32.Nxc3 Bb4 33.b6 Bxc3 34.Bxc3 h6 35.b7 Re3 36.Bxf7+',
    annotations: {
      '8...':
        'Màn ra mắt của Tấn công Marshall! Đen thí tốt e5 để đổi lấy thế phát triển vượt trội và một cuộc tấn công vào Vua trắng.',
      '9': 'Capablanca nhận thách thức. Ông kể lại rằng đã đoán ra Marshall chuẩn bị sẵn, nhưng vẫn không chút do dự ăn tốt.',
      '11...': 'Đen tiếp tục dồn quân về cánh Vua. Lý thuyết hiện đại thường chơi 11...c6 thay cho nước này.',
      '13...': 'Mã nhảy vào g4, nhắm vào các ô f2 và h2 quanh Vua trắng.',
      '14': 'Hậu sang f3 vừa bảo vệ f2 vừa tấn công Mã g4.',
      '15...': 'Thí Mã ở f2! Marshall dồn thêm áp lực lên Vua trắng.',
      '16': 'Nước phòng thủ chính xác: Xe e2 bảo vệ hàng 2 và tấn công Mã f2.',
      '17...': 'Thêm một nước thí: Tượng chiếu ở h2, Vua trắng buộc phải sang f1.',
      '19...': 'Hậu chiếu ở h1 – Vua trắng phải bước ra e2, nhưng nơi đây an toàn hơn vẻ ngoài.',
      '21': 'Nước then chốt: Tượng d2 phát triển và mở đường cho Vua chạy sang cánh Hậu.',
      '23': 'Vua trắng tiếp tục hành trình về c2, nơi được các tốt cánh Hậu che chắn.',
      '26': 'Tượng d5 đứng vững giữa bàn cờ, nhắm vào tốt f7 và tham gia phòng thủ.',
      '29': 'Khi đợt tấn công đã tan, Capablanca chuyển sang phản công ở cánh Hậu, phá cấu trúc tốt của Đen.',
      '31': 'Xe a6 tấn công Tượng d6 và hỗ trợ tốt b tiến lên.',
      '36':
        'Tượng ăn f7 chiếu. Capablanca nhận xét Trắng chiếu hết trong năm nước; kiểm tra bằng máy cũng xác nhận mọi cách đáp đều dẫn tới chiếu hết. Marshall đầu hàng.',
    },
    keyMoments: ['8...', '15...', '16', '21', '36'],
    lessons: [
      'Gambit tốt để giành nhịp tấn công là vũ khí mạnh, nhưng phải được chuẩn bị chính xác đến từng nước.',
      'Khi bị tấn công, hãy bình tĩnh tìm những nước phòng thủ có nhịp (16.Re2 tấn công Mã f2).',
      'Vua có thể "đi bộ" tới nơi an toàn giữa làn mưa chiếu nếu đường đi được tính toán kỹ.',
      'Sau khi đẩy lùi đợt tấn công, bên hơn quân nên phản công ngay để không cho đối phương hồi sức.',
    ],
    tags: ['Khai cuộc', 'Phòng thủ'],
    source: 'https://www.chessgames.com/perl/chessgame?gid=1095025',
  },
];
