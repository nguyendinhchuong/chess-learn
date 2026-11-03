import type { ClassicGame } from '../types';

// Trường phái Xô Viết (1946 – 1969): các ván cờ kinh điển, biên bản đã đối chiếu với ít nhất hai nguồn.
export const GAMES_XO_VIET: ClassicGame[] = [
  // ------------------------------------------------------------------ 1953
  {
    id: 'averbakh-kotov-1953',
    title: 'Averbakh – Kotov, Zürich 1953: Thí Hậu và cuộc săn Vua',
    white: 'Yuri Averbakh',
    black: 'Alexander Kotov',
    event: 'Giải Ứng viên Zürich 1953, vòng 14',
    year: 1953,
    result: '0-1',
    opening: 'Phòng thủ Ấn Độ cổ (Old Indian Defence)',
    difficulty: 4,
    context:
      'Giải Ứng viên Zürich 1953 quy tụ 15 kỳ thủ mạnh nhất thế giới để chọn người thách đấu nhà vô địch Botvinnik, và đến nay vẫn được xem là một trong những giải đấu vĩ đại nhất lịch sử. Alexander Kotov – về sau nổi tiếng với cuốn sách "Hãy suy nghĩ như một đại kiện tướng" – không đạt thứ hạng cao ở giải này. Nhưng ván thắng Yuri Averbakh, bậc thầy tàn cuộc lừng danh, đã mang về cho ông giải thưởng dành cho ván cờ đẹp nhất.',
    summary:
      'Trung tâm sớm bị khóa chặt: Trắng có nhiều không gian hơn, còn Đen kiên nhẫn chuẩn bị phá vỡ ở cánh Vua bằng ...f5–f4. Khi Averbakh mở cột g trong lúc Vua của mình đứng ở h2, Kotov tung đòn 30...Qxh3+!!, bỏ Hậu để lôi Vua trắng ra giữa bàn cờ. Vua trắng bị Xe, Mã và Tượng đen dồn đuổi qua lại giữa g4 và f5, buộc Trắng phải trả lại một Xe để thoát lưới chiếu hết. Cuối cùng, hai Xe đen nhốt Vua trắng ở cột h và Averbakh đầu hàng.',
    moves: '1.d4 Nf6 2.c4 d6 3.Nf3 Nbd7 4.Nc3 e5 5.e4 Be7 6.Be2 O-O 7.O-O c6 8.Qc2 Re8 9.Rd1 Bf8 10.Rb1 a5 11.d5 Nc5 12.Be3 Qc7 13.h3 Bd7 14.Rbc1 g6 15.Nd2 Rab8 16.Nb3 Nxb3 17.Qxb3 c5 18.Kh2 Kh8 19.Qc2 Ng8 20.Bg4 Nh6 21.Bxd7 Qxd7 22.Qd2 Ng8 23.g4 f5 24.f3 Be7 25.Rg1 Rf8 26.Rcf1 Rf7 27.gxf5 gxf5 28.Rg2 f4 29.Bf2 Rf6 30.Ne2 Qxh3+ 31.Kxh3 Rh6+ 32.Kg4 Nf6+ 33.Kf5 Nd7 34.Rg5 Rf8+ 35.Kg4 Nf6+ 36.Kf5 Ng8+ 37.Kg4 Nf6+ 38.Kf5 Nxd5+ 39.Kg4 Nf6+ 40.Kf5 Ng8+ 41.Kg4 Nf6+ 42.Kf5 Ng8+ 43.Kg4 Bxg5 44.Kxg5 Rf7 45.Bh4 Rg6+ 46.Kh5 Rfg7 47.Bg5 Rxg5+ 48.Kh4 Nf6 49.Ng3 Rxg3 50.Qxd6 R3g6 51.Qb8+ Rg8',
    annotations: {
      '4...':
        'Thế trận Ấn Độ cổ: Đen dựng cặp tốt d6–e5 vững chắc, chấp nhận ít không gian hơn để có một cấu trúc gần như không có điểm yếu.',
      '11': 'Trắng đẩy d5 khóa trung tâm. Từ đây, mỗi bên phải tìm kế hoạch ở cánh: Trắng ở cánh Hậu, Đen ở cánh Vua với ...f5.',
      '11...': 'Mã chiếm ô c5 – một chỗ đứng vững chắc được tốt d6 che chở, từ đó gây sức ép lên tốt e4.',
      '17...':
        'Đen đẩy c5, khóa nốt cánh Hậu. Khi cả trung tâm lẫn cánh Hậu đều đóng, số phận ván cờ sẽ được định đoạt ở cánh Vua.',
      '19...': 'Lùi Mã về g8 để mở đường cho tốt f – kiểu "lùi một bước để tiến hai bước" rất điển hình trong thế cờ đóng.',
      '23':
        'Averbakh đẩy g4 để giành không gian và cản ...f5. Nhưng khi hai tốt g, h đã rời chỗ, Vua trắng ở h2 trở nên trống trải hơn. Đen vẫn kiên quyết phá f5.',
      '28...':
        'Tốt f4 đuổi Tượng e3 về f2 và nhường ô f6 cho Xe. Cột g đã mở, Xe đen sẵn sàng chuyển sang cột h.',
      '30...':
        '**Thí Hậu!** Kotov đổi Hậu lấy một tốt để kéo Vua trắng ra khỏi chỗ trú ẩn. Kiểm tra bằng máy cho thấy Đen ít nhất có chiếu lặp (Rh6+, Rg6+…), nhưng Kotov chơi để thắng: Xe, Mã và Tượng sẽ cùng săn Vua.',
      '31...':
        'Xe chiếu ở h6. Trắng chỉ có hai lựa chọn: chặn bằng 32.Bh4 (mất Tượng) hoặc đưa Vua lên g4 – lao thẳng vào vòng vây.',
      '33...':
        'Một nước đi yên lặng tuyệt đẹp: Mã lui về d7 để mở cột f cho Xe b8. Đen dọa 34...Rf8+ 35.Kg4 Rg8+ 36.Kf5 Rf6# – chiếu hết. Cách chống đỡ tốt nhất của Trắng là 34.Rg5, trả lại một Xe để mở đường thoát cho Vua.',
      '38...':
        'Sau vài nước chiếu qua lại, Mã ăn thêm tốt d5 kèm chiếu. Lặp nước khi chưa cần vội là cách thực dụng để vượt qua mốc kiểm soát thời gian ở nước 40 mà không mạo hiểm.',
      '43...': 'Tượng ăn Xe g5. Trắng vẫn còn Hậu, nhưng Vua trắng bị kẹt giữa các quân đen, còn Hậu và Mã trắng đứng quá xa.',
      '47...': 'Xe ăn Tượng g5 kèm chiếu: giờ Đen đã hơn quân, trong khi Vua trắng vẫn bị nhốt ở cột h.',
      '51...':
        'Đen dọa 52...Rh6# – chiếu hết ngay. Cách cứu duy nhất đáng kể là trả Hậu bằng 52.Qxg8+, nhưng sau đó Xe và Mã đen chắc chắn thắng trước một Xe đơn độc. Averbakh đầu hàng.',
    },
    keyMoments: ['28...', '30...', '33...', '43...', '51...'],
    lessons: [
      'Khi trung tâm bị khóa, hãy tấn công ở cánh mà tốt của bạn hướng tới – với Đen trong thế Ấn Độ cổ, đó là cánh Vua với ...f5–f4.',
      'Thí Hậu không nhất thiết phải dẫn ngay tới chiếu hết: lôi được Vua đối phương ra giữa bàn cờ và giữ được nhịp tấn công thường đáng giá hơn vật chất.',
      'Nước đi yên lặng (như 33...Nd7) có thể mạnh hơn nước chiếu, vì nó tạo ra mối đe dọa mà đối thủ không kịp chống.',
      'Trước khi đẩy các tốt che Vua, hãy tự hỏi: nếu cột mở ra, ai sẽ được lợi?',
      'Khi đang chiếm ưu thế, lặp nước để vượt qua mốc thời gian là thủ thuật thực dụng – miễn là không để lặp đủ ba lần.',
    ],
    orientation: 'black',
    tags: ['Thí quân', 'Tấn công Vua'],
    source: 'https://www.chessgames.com/perl/chessgame?gid=1084375',
  },
  {
    id: 'geller-euwe-1953',
    title: 'Geller – Euwe, Zürich 1953: Phản công giữa cơn bão',
    white: 'Efim Geller',
    black: 'Max Euwe',
    event: 'Giải Ứng viên Zürich 1953, vòng 2',
    year: 1953,
    result: '0-1',
    opening: 'Phòng thủ Nimzo-Ấn, biến Sämisch (Nimzo-Indian Defence, Sämisch Variation)',
    difficulty: 4,
    context:
      'Max Euwe, nhà vô địch thế giới 1935–1937, đã ngoài 50 tuổi khi dự giải Ứng viên Zürich 1953 và không còn được xem là ứng cử viên sáng giá. Đối thủ của ông, Efim Geller, là một trong những đại diện trẻ, giàu sức tấn công nhất của trường phái Xô Viết. Ván đấu ở vòng 2 này được nhiều người đánh giá là một trong những ván hay nhất của cả giải.',
    summary:
      'Geller chọn biến Sämisch, chấp nhận cặp tốt chồng ở cột c để có trung tâm lớn và tấn công cánh Vua. Euwe bình tĩnh ăn tốt c4 yếu, để mặc Trắng dồn quân sang cánh Vua. Khi Hậu trắng đã vào tới h7 và mọi thứ tưởng như sắp sụp đổ, Euwe bỏ Xe bằng 22...Rh8!, kéo Hậu trắng về góc bàn cờ, rồi phản công chớp nhoáng: Xe vào c2, ăn g2, Hậu chuyển sang b3 rồi f3. Chỉ sau vài nước, chính Vua trắng mới là bên không thể thoát khỏi lưới chiếu hết.',
    moves: '1.d4 Nf6 2.c4 e6 3.Nc3 Bb4 4.e3 c5 5.a3 Bxc3+ 6.bxc3 b6 7.Bd3 Bb7 8.f3 Nc6 9.Ne2 O-O 10.O-O Na5 11.e4 Ne8 12.Ng3 cxd4 13.cxd4 Rc8 14.f4 Nxc4 15.f5 f6 16.Rf4 b5 17.Rh4 Qb6 18.e5 Nxe5 19.fxe6 Nxd3 20.Qxd3 Qxe6 21.Qxh7+ Kf7 22.Bh6 Rh8 23.Qxh8 Rc2 24.Rc1 Rxg2+ 25.Kf1 Qb3 26.Ke1 Qf3',
    annotations: {
      '5...':
        'Đen đổi Tượng lấy Mã, để lại cho Trắng cặp tốt chồng c3–c4. Đó là cái giá Trắng trả để có cặp Tượng và trung tâm mạnh trong biến Sämisch.',
      '10...': 'Mã nhắm thẳng vào tốt c4 – điểm yếu cố hữu của cấu trúc tốt chồng.',
      '11...':
        'Một nước lui khéo léo: Mã rời f6 trước khi bị tốt e5 đuổi, và từ e8 vẫn có thể quay về d6 hoặc f6 để phòng thủ.',
      '14...':
        'Đen ăn tốt c4. Trắng đáp lại bằng kế hoạch quen thuộc: đẩy tốt f lên để mở đường tấn công Vua đen.',
      '16...': 'Thay vì chỉ phòng thủ, Đen dùng tốt b5 giữ chắc Mã c4 và giữ cho các quân của mình luôn hoạt động.',
      '18':
        'Trắng phá bằng e5, chuẩn bị fxe6 để mở đường chéo b1–h7 cho Tượng d3 và Hậu.',
      '18...': 'Euwe ăn tốt và sẵn sàng đổi Mã lấy Tượng d3 – quân tấn công nguy hiểm nhất của Trắng.',
      '21...': 'Nước duy nhất: Vua bước ra f7. Trông Đen rất nguy hiểm, nhưng Euwe đã chuẩn bị sẵn một đòn phản công.',
      '22...':
        '**Bỏ Xe!** 22...Rh8 kéo Hậu trắng về góc h8, xa khỏi trung tâm và xa khỏi Vua nhà. Đổi lại, Đen có thời gian để Xe c8 và Hậu e6 xông vào trận địa Trắng.',
      '23...':
        'Xe chiếm hàng 2, nhắm vào tốt g2. Vua trắng ở g1 bỗng trở nên trống trải, còn Hậu trắng ở h8 không thể quay về kịp.',
      '24':
        '**24.Rc1?** Trắng muốn đổi Xe nhưng bỏ qua đòn 24...Rxg2+. Kiểm tra bằng máy cho thấy 24.d5 giúp Trắng chống đỡ bền bỉ hơn nhiều, dù thế cờ vẫn khó.',
      '24...': 'Xe ăn g2 kèm chiếu. Nếu 25.Kh1?? thì 25...Rxg3+ là chiếu mở bằng Tượng b7 và Đen nhanh chóng chiếu hết.',
      '25...':
        'Nước Hậu then chốt: Hậu sang b3, sẵn sàng chuyển tiếp sang f3 dọc theo hàng 3 để phối hợp với Xe g2 và Tượng b7.',
      '26...':
        'Hậu vào f3. Đen dọa 27...Qf2+ và chiếu hết sau vài nước; Trắng không còn cách chống đỡ nên Geller đầu hàng.',
    },
    keyMoments: ['14...', '18', '22...', '24', '25...'],
    lessons: [
      'Cặp tốt chồng là cái giá của trung tâm lớn; bên phòng thủ nên nhắm vào chúng ngay (…Na5, …Nxc4).',
      'Khi bị tấn công dữ dội, đừng chỉ phòng thủ thụ động: thí lại vật chất để giành thời gian phản công có thể lật ngược thế cờ.',
      'Một quân mạnh bị kéo ra góc (Hậu ở h8) sẽ không thể quay về bảo vệ Vua nhà.',
      'Trước một nước đi "tự nhiên" như đổi Xe, hãy kiểm tra mọi nước chiếu và ăn quân của đối thủ.',
      'Bên tấn công thường bỏ trống Vua của chính mình – đó là nơi phản công dễ thành công nhất.',
    ],
    orientation: 'black',
    tags: ['Phòng thủ', 'Thí quân', 'Chiến thuật'],
    source: 'https://www.chessgames.com/perl/chessgame?gid=1042835',
  },

  // ------------------------------------------------------------------ 1958
  {
    id: 'polugaevsky-nezhmetdinov-1958',
    title: 'Polugaevsky – Nezhmetdinov, Sochi 1958: Ván cờ bất tử của Nezhmetdinov',
    white: 'Lev Polugaevsky',
    black: 'Rashid Nezhmetdinov',
    event: 'Giải vô địch nước Nga (RSFSR), Sochi',
    year: 1958,
    result: '0-1',
    opening: 'Phòng thủ Ấn Độ cổ (Old Indian Defence)',
    difficulty: 5,
    context:
      'Rashid Nezhmetdinov chưa bao giờ trở thành đại kiện tướng, nhưng được cả một thế hệ danh thủ Xô Viết kính nể vì lối tấn công giàu trí tưởng tượng. Đối thủ của ông, Lev Polugaevsky, khi ấy là một tài năng trẻ đang lên và về sau trở thành một trong những kỳ thủ mạnh nhất thế giới. Ván đấu ở Sochi năm 1958 thường được gọi là "ván cờ bất tử của Nezhmetdinov".',
    summary:
      'Đen nhường trung tâm rồi đưa Hậu lên h4 và dồn tốt cánh Vua (…f5–f4, …g5–g4). Khi Trắng tìm cách đóng chặt thế trận, Nezhmetdinov phá vỡ bằng 17...fxg3 và cho Hậu đột nhập h3, h2. Nước 24...Rxf4!! bỏ Hậu để lùa Vua trắng ra giữa bàn cờ; sau đó Xe, hai Mã và hai Tượng đen thay nhau chiếu, đuổi Vua trắng từ e3 tới tận a5. Ván cờ kết thúc với một mạng chiếu hết không thể tránh.',
    moves: '1.d4 Nf6 2.c4 d6 3.Nc3 e5 4.e4 exd4 5.Qxd4 Nc6 6.Qd2 g6 7.b3 Bg7 8.Bb2 O-O 9.Bd3 Ng4 10.Nge2 Qh4 11.Ng3 Nge5 12.O-O f5 13.f3 Bh6 14.Qd1 f4 15.Nge2 g5 16.Nd5 g4 17.g3 fxg3 18.hxg3 Qh3 19.f4 Be6 20.Bc2 Rf7 21.Kf2 Qh2+ 22.Ke3 Bxd5 23.cxd5 Nb4 24.Rh1 Rxf4 25.Rxh2 Rf3+ 26.Kd4 Bg7 27.a4 c5+ 28.dxc6 bxc6 29.Bd3 Nexd3+ 30.Kc4 d5+ 31.exd5 cxd5+ 32.Kb5 Rb8+ 33.Ka5 Nc6+',
    annotations: {
      '4...':
        'Đen đổi tốt e5 lấy d4, nhường trung tâm để kéo Hậu trắng ra sớm và giành nhịp phát triển bằng ...Nc6.',
      '10...': 'Hậu lên h4 qua đường chéo vừa được Mã g4 mở ra. Quân mạnh nhất của Đen đã có mặt ở cánh Vua.',
      '13...': 'Tượng chuyển sang h6, nhắm thẳng vào Hậu d2 qua đường chéo h6–d2. Đen dùng từng nước để tăng áp lực.',
      '14...': 'Tốt f4 giành không gian và đẩy Mã g3 lui về e2. Đen chuẩn bị tiếp ...g5–g4 để phá hàng rào tốt của Vua trắng.',
      '17...': 'Đen phá vỡ: sau 18.hxg3 cột h mở ra, và Hậu đen lập tức đột nhập h3.',
      '19...':
        'Đen không cứu Mã e5 mà bình thản phát triển Tượng. Nezhmetdinov sẵn sàng hy sinh vật chất để giữ nhịp tấn công.',
      '21...':
        'Hậu chiếu ở h2, Vua trắng chỉ còn hai ô: e1 hoặc e3. Theo phân tích bằng máy, lui 22.Ke1 còn tệ hơn, nên Vua phải tiến lên e3 – rời hẳn hàng rào bảo vệ.',
      '22...':
        'Đổi Tượng lấy Mã d5 – quân phòng thủ tốt nhất của Trắng, đang canh giữ ô b4 – để Mã c6 có thể nhảy vào b4, nhắm vào c2 và d3.',
      '24': 'Xe h1 tấn công Hậu. Thay vì đổi Hậu lấy Xe, Nezhmetdinov chọn một con đường táo bạo hơn nhiều.',
      '24...':
        '**Bỏ Hậu!** Xe ăn tốt f4, phá bỏ lớp che chắn cuối cùng của Vua trắng. Sau 25.Rxh2 Rf3+ Vua trắng bị lùa tới d4, giữa vòng vây của các quân nhẹ. Phân tích máy tính sau này cho thấy Trắng có những cách phòng thủ tốt hơn, nhưng tìm ra chúng trên bàn cờ là cực kỳ khó.',
      '26...':
        'Tượng về g7, đứng ngay sau Mã e5 trên đường chéo tới d4: bất kỳ nước đi nào của Mã e5 cũng sẽ là một đòn chiếu mở.',
      '27': '**27.a4?** Theo phân tích bằng máy, Trắng nên trả lại vật chất (ví dụ 27.Rxh7!) để giảm sức tấn công. Sau nước này, Đen ra đòn quyết định.',
      '27...': 'Tốt c5 chiếu! Trắng ăn tốt qua đường (28.dxc6), và sau 28...bxc6 cột b mở ra cho Xe a8.',
      '29...': 'Chiếu mở: Mã e5 ăn Tượng d3, Tượng g7 chiếu Vua trắng.',
      '33...': 'Mã chiếu. Sau 34.Ka6 – nước duy nhất – là 34...Ndb4#. Polugaevsky đầu hàng.',
    },
    keyMoments: ['17...', '21...', '24...', '26...', '33...'],
    lessons: [
      'Hậu và tốt cánh Vua có thể mở đường tấn công ngay cả khi Vua đối phương đã nhập thành, nhất là khi trung tâm đã đóng.',
      'Khi Vua đối phương bị lôi ra giữa bàn cờ, nhiều quân nhẹ phối hợp có thể mạnh hơn cả một Hậu.',
      'Chiếu mở là vũ khí đáng sợ: hãy xếp Tượng hoặc Xe đứng sau quân của mình, nhắm thẳng vào Vua đối phương.',
      'Khi bị tấn công dồn dập, trả lại vật chất đúng lúc thường là cách phòng thủ tốt nhất.',
    ],
    orientation: 'black',
    tags: ['Thí quân', 'Tấn công Vua'],
    source: 'https://www.chessgames.com/perl/chessgame?gid=1111459',
  },

  // ------------------------------------------------------------------ 1959
  {
    id: 'tal-smyslov-1959',
    title: 'Tal – Smyslov, Giải Ứng viên 1959: Phù thủy xứ Riga ra tay',
    white: 'Mikhail Tal',
    black: 'Vasily Smyslov',
    event: 'Giải Ứng viên 1959 (Bled – Zagreb – Beograd), vòng 8',
    year: 1959,
    result: '1-0',
    opening: 'Phòng thủ Caro-Kann, biến 2.d3 (Caro-Kann Defence, Breyer Variation)',
    difficulty: 4,
    context:
      'Năm 1959, Mikhail Tal – chàng trai 22 tuổi đến từ Riga – tham dự giải Ứng viên 28 vòng diễn ra ở ba thành phố của Nam Tư. Vasily Smyslov, nhà vô địch thế giới 1957–1958, là một trong những ứng viên nặng ký nhất. Tal giành chức vô địch giải với 20/28 điểm, rồi năm sau đánh bại Botvinnik để lên ngôi vua cờ.',
    summary:
      'Tal chọn cách đi lạ 2.d3 rồi nhập thành cánh Hậu, biến ván Caro-Kann vốn điềm tĩnh thành một trận đấu dao kéo. Mã trắng cắm vào d6, Tượng c4 bị bỏ mặc, còn Hậu trắng lao sang cánh Vua. Smyslov ăn quân và phản công vào Vua trắng, nhưng một nước sai ở thời điểm căng thẳng nhất (18...Nf6?) đã cho Tal tung ra đòn 19.Qxf7!!. Sau chuỗi đổi quân bắt buộc, Trắng thu về lợi thế vật chất quyết định.',
    moves: '1.e4 c6 2.d3 d5 3.Nd2 e5 4.Ngf3 Nd7 5.d4 dxe4 6.Nxe4 exd4 7.Qxd4 Ngf6 8.Bg5 Be7 9.O-O-O O-O 10.Nd6 Qa5 11.Bc4 b5 12.Bd2 Qa6 13.Nf5 Bd8 14.Qh4 bxc4 15.Qg5 Nh5 16.Nh6+ Kh8 17.Qxh5 Qxa2 18.Bc3 Nf6 19.Qxf7 Qa1+ 20.Kd2 Rxf7 21.Nxf7+ Kg8 22.Rxa1 Kxf7 23.Ne5+ Ke6 24.Nxc6 Ne4+ 25.Ke3 Bb6+ 26.Bd4',
    annotations: {
      '2': 'Cách đi ít gặp 2.d3 đưa ván cờ ra khỏi lý thuyết quen thuộc của Caro-Kann – Tal muốn một trận chiến không theo khuôn mẫu.',
      '9': 'Nhập thành khác cánh: từ đây, bên nào tấn công nhanh hơn sẽ nắm phần thắng.',
      '10': 'Mã cắm vào d6, khống chế các ô c8, e8, f7 và gây khó khăn cho việc phát triển Tượng c8.',
      '11': 'Tượng lên c4 dù sắp bị tốt b5 đuổi. Tal sẵn sàng bỏ Tượng để giữ thế chủ động.',
      '12':
        'Đúng vậy: Tal không cứu Tượng c4 mà rút Tượng g5 về d2 để đuổi Hậu a5. Đây là một đòn thí Tượng thực sự.',
      '14...':
        'Smyslov ăn Tượng và hơn một quân. Về khách quan Đen đang tốt hơn, nhưng phòng thủ trước một cuộc tấn công của Tal đòi hỏi độ chính xác tuyệt đối.',
      '15': 'Hậu g5 cùng Mã f5 nhắm vào g7: Trắng dọa Qxg7#.',
      '15...': 'Mã h5 bảo vệ ô g7. Trắng đáp lại bằng 16.Nh6+ (Vua đen buộc phải vào h8) rồi ăn luôn Mã h5.',
      '17...': 'Đen phản công: Hậu ăn a2 và dọa Qa1# vì Tượng d2 đang chặn đường thoát của Vua trắng.',
      '18': 'Tượng c3 che ô a1, đồng thời nhắm thẳng vào g7 và Vua đen ở h8.',
      '18...':
        '**Sai lầm quyết định.** Mã f6 tấn công Hậu, nhưng mở đường cho một đòn phối hợp. Kiểm tra bằng máy cho thấy 18...f6 hoặc 18...Bc7 giữ được thế cờ gần cân bằng.',
      '19':
        '**19.Qxf7!!** Hậu ăn f7, bỏ mình. Nếu 19...Rxf7?? thì 20.Rxd8+ và chiếu hết sau vài nước. Smyslov chọn đường tốt nhất: 19...Qa1+ 20.Kd2 Rxf7 21.Nxf7+ Kg8 22.Rxa1 – Trắng lấy lại Hậu và còn thắng thêm vật chất.',
      '23': 'Mã chiếu, chuẩn bị ăn tốt c6 và tấn công Tượng d8.',
      '26':
        'Tượng d4 chặn chiếu và tấn công Tượng b6, còn Mã e4 bị Vua trắng đe dọa. Đen sẽ mất thêm quân nên Smyslov đầu hàng.',
    },
    keyMoments: ['10', '12', '17...', '18...', '19'],
    lessons: [
      'Khi hai bên nhập thành khác cánh, tốc độ tấn công quan trọng hơn vật chất.',
      'Thí quân để giữ thế chủ động buộc đối thủ phải tìm nước chính xác ở mỗi lượt – áp lực tâm lý là một vũ khí thật sự.',
      'Trước khi phản công, bên phòng thủ phải kiểm tra mọi nước chiếu và ăn quân của đối phương (18...Nf6? bỏ qua 19.Qxf7!!).',
      'Một quân Mã cắm sâu như ở d6 có thể làm tê liệt cả một cánh của đối phương.',
      'Đòn phối hợp tốt nhất là đòn thu về nhiều vật chất hơn số đã bỏ ra.',
    ],
    tags: ['Thí quân', 'Tấn công Vua', 'Chiến thuật'],
    source: 'https://www.chessgames.com/perl/chessgame?gid=1139475',
  },

  // ------------------------------------------------------------------ 1960
  {
    id: 'botvinnik-tal-1960-van-6',
    title: 'Botvinnik – Tal, ván 6 trận tranh ngôi 1960: Mã f4 táo bạo',
    white: 'Mikhail Botvinnik',
    black: 'Mikhail Tal',
    event: 'Trận tranh ngôi vô địch thế giới, Moskva',
    year: 1960,
    result: '0-1',
    opening: 'Phòng thủ Ấn Độ của Vua, biến Fianchetto (King\'s Indian Defence, Fianchetto)',
    difficulty: 5,
    context:
      'Năm 1960, Mikhail Tal, 23 tuổi, thách đấu nhà vô địch Mikhail Botvinnik – người được xem là cha đẻ của phương pháp chuẩn bị khoa học trong trường phái Xô Viết. Cuộc đối đầu giữa sự tính toán chặt chẽ của Botvinnik và trí tưởng tượng của Tal thu hút sự chú ý của cả thế giới cờ. Tal thắng trận với tỉ số 12½–8½ và trở thành nhà vô địch thế giới trẻ nhất tính đến thời điểm đó.',
    summary:
      'Tal dùng phòng thủ Ấn Độ của Vua và chuẩn bị phản công ở cánh Vua bằng ...f5. Ở nước 21, ông tung ra 21...Nf4!? – thí Mã để mở đường chéo cho Tượng g7 và đưa tốt e, f lao lên. Botvinnik nhận quân nhưng không tìm ra cách phòng thủ chính xác nhất; Đen lấy lại vật chất nhờ đòn ...f3 đầy mưu mẹo và bước vào tàn cuộc với cặp Tượng mạnh. Từ đó, Tal chuyển hóa ưu thế bằng kỹ thuật tàn cuộc chắc chắn.',
    moves: '1.c4 Nf6 2.Nf3 g6 3.g3 Bg7 4.Bg2 O-O 5.d4 d6 6.Nc3 Nbd7 7.O-O e5 8.e4 c6 9.h3 Qb6 10.d5 cxd5 11.cxd5 Nc5 12.Ne1 Bd7 13.Nd3 Nxd3 14.Qxd3 Rfc8 15.Rb1 Nh5 16.Be3 Qb4 17.Qe2 Rc4 18.Rfc1 Rac8 19.Kh2 f5 20.exf5 Bxf5 21.Ra1 Nf4 22.gxf4 exf4 23.Bd2 Qxb2 24.Rab1 f3 25.Rxb2 fxe2 26.Rb3 Rd4 27.Be1 Be5+ 28.Kg1 Bf4 29.Nxe2 Rxc1 30.Nxd4 Rxe1+ 31.Bf1 Be4 32.Ne2 Be5 33.f4 Bf6 34.Rxb7 Bxd5 35.Rc7 Bxa2 36.Rxa7 Bc4 37.Ra8+ Kf7 38.Ra7+ Ke6 39.Ra3 d5 40.Kf2 Bh4+ 41.Kg2 Kd6 42.Ng3 Bxg3 43.Bxc4 dxc4 44.Kxg3 Kd5 45.Ra7 c3 46.Rc7 Kd4 47.Rd7+',
    annotations: {
      '7...': 'Thế trận Ấn Độ của Vua điển hình: Đen để Trắng chiếm trung tâm rồi phản công bằng ...e5, và sau đó là ...f5.',
      '10': 'Trắng đẩy d5 giành không gian. Đen mở cột c và đưa Mã lên c5 hoạt động.',
      '15...': 'Mã h5 mở đường cho tốt f – kế hoạch phản công chuẩn mực của Đen trong hệ thống này.',
      '17...': 'Xe vào c4, được Hậu b4 bảo vệ. Đen làm chủ cột c mở, và Trắng khó lòng đuổi được quân Xe này.',
      '19...': 'Đòn phá f5 đúng kế hoạch. Sau 20.exf5 Bxf5, Tượng đen nhắm vào Xe b1 và buộc Trắng tiếp tục lùi Xe.',
      '21...':
        '**Thí Mã!** 21...Nf4!? – nếu 22.gxf4 thì 22...exf4 mở đường chéo dài cho Tượng g7 và đuổi Tượng e3. Đây là kiểu thí quân dựa trên đánh giá thế cờ: đổi lại một Mã, mọi quân Đen đều trở nên hoạt động. Máy tính ngày nay cho rằng về lý thuyết Trắng có thể giữ ưu thế.',
      '22...': 'Tốt e ăn lại và tấn công Tượng e3. Đường chéo dài của Tượng g7 giờ nhắm thẳng vào Mã c3 và tốt b2 phía sau.',
      '23':
        '**23.Bd2?** Theo phân tích bằng máy, Trắng nên đi 23.a3! để đuổi Hậu b4 trước, rồi mới lo cho Tượng. Sau nước trong ván, Đen ăn tốt b2 và giành lại thế chủ động.',
      '24...':
        'Một đòn trung gian tinh tế: nếu 25.Rxb2 thì 25...fxe2 – Đen lấy lại Hậu, còn tốt e2 đe dọa phong cấp. Ván đấu diễn ra đúng như vậy.',
      '31...':
        'Sau loạt đổi quân, Đen hơn một tốt và có cặp Tượng mạnh. Xe e1 ghim Tượng f1 vào Vua g1, còn tốt d5 của Trắng trở thành mục tiêu.',
      '34...': 'Tượng ăn tốt d5. Các quân Đen phối hợp ăn ý, trong khi quân Trắng rời rạc.',
      '42...': 'Đen đổi Tượng lấy Mã, rồi sau 43.Bxc4 dxc4 bước vào tàn cuộc Xe có tốt c thông nguy hiểm.',
      '47': 'Vua đen đã sẵn sàng hộ tống tốt c tiến tới phong cấp, và Botvinnik đầu hàng.',
    },
    keyMoments: ['19...', '21...', '23', '24...', '42...'],
    lessons: [
      'Trong phòng thủ Ấn Độ của Vua, phản công ...f5 là nguồn sống của Đen – đừng chơi thụ động.',
      'Thí quân dựa trên đánh giá (mở đường cho Tượng, kích hoạt mọi quân) có thể hiệu quả trong thực chiến dù không hoàn toàn chính xác về lý thuyết.',
      'Khi nhận quân thí, hãy tìm nước bình tĩnh đuổi quân mạnh nhất của đối phương (như 23.a3) trước khi lo phòng thủ.',
      'Đòn trung gian (24...f3) có thể giúp lấy lại vật chất một cách bất ngờ.',
      'Cặp Tượng trong thế cờ mở là lợi thế lâu dài, đặc biệt ở tàn cuộc.',
    ],
    orientation: 'black',
    tags: ['Tranh ngôi vô địch', 'Thí quân', 'Tàn cuộc'],
    source: 'https://www.chessgames.com/perl/chessgame?gid=1032537',
  },
  {
    id: 'spassky-bronstein-1960',
    title: 'Spassky – Bronstein, Leningrad 1960: Ván cờ trong phim James Bond',
    white: 'Boris Spassky',
    black: 'David Bronstein',
    event: 'Giải vô địch Liên Xô lần thứ 27, Leningrad',
    year: 1960,
    result: '1-0',
    opening: 'Gambit Vua được chấp nhận, biến hiện đại 3...d5 (King\'s Gambit Accepted, Modern Defence)',
    difficulty: 4,
    context:
      'Boris Spassky là một trong số ít kỳ thủ hàng đầu dám dùng Gambit Vua ở đẳng cấp cao nhất. David Bronstein – người từng hòa trận tranh ngôi với Botvinnik năm 1951 – cũng là bậc thầy của những thế cờ phức tạp. Thế cờ cuối của ván này về sau được dựng lại trong bộ phim James Bond "Từ nước Nga với tình yêu" (1963).',
    summary:
      'Đen trả lại tốt gambit bằng 3...d5 để phát triển nhanh, rồi dùng Mã nhảy vào e3 đổi lấy Tượng và đẩy tốt e xuống tận e2. Spassky đáp lại bằng một loạt nước đi táo bạo: 15.Nd6!? thả Mã vào giữa trận địa Đen, rồi 16.Nxf7 mặc kệ Đen phong cấp ở f1. Kém gần một Xe, Trắng vẫn có đòn tấn công dồn dập vào Vua đen; sau 23.Qe4+, Bronstein đầu hàng vì không thể tránh mất thêm quân hoặc bị chiếu hết.',
    moves: '1.e4 e5 2.f4 exf4 3.Nf3 d5 4.exd5 Bd6 5.Nc3 Ne7 6.d4 O-O 7.Bd3 Nd7 8.O-O h6 9.Ne4 Nxd5 10.c4 Ne3 11.Bxe3 fxe3 12.c5 Be7 13.Bc2 Re8 14.Qd3 e2 15.Nd6 Nf8 16.Nxf7 exf1=Q+ 17.Rxf1 Bf5 18.Qxf5 Qd7 19.Qf4 Bf6 20.N3e5 Qe7 21.Bb3 Bxe5 22.Nxe5+ Kh7 23.Qe4+',
    annotations: {
      '2': 'Gambit Vua: Trắng bỏ tốt f để mở cột f và giành trung tâm – một khai cuộc của thời lãng mạn mà Spassky đưa trở lại đỉnh cao.',
      '3...': 'Đen phản công ngay ở trung tâm, sẵn sàng trả lại tốt để phát triển quân nhanh.',
      '9': 'Mã lên e4 tấn công Tượng d6 và chuẩn bị c4 để đuổi Mã d5.',
      '10...':
        'Mã nhảy vào e3, tấn công cùng lúc Hậu d1 và Xe f1. Trắng đành đổi Tượng lấy Mã, để lại cho Đen một tốt e3 lấn sâu.',
      '12': 'Tốt c5 đuổi Tượng d6 khỏi đường chéo đẹp và giành thêm không gian.',
      '14...': 'Tốt e2 tấn công Xe f1 và dọa phong cấp. Trắng phải hành động ngay lập tức.',
      '15':
        '**15.Nd6!?** Mã thả vào d6, tấn công Xe e8, Tượng c8 và tốt f7. Phân tích máy tính cho thấy Đen có thể đáp trả tốt hơn bằng 15...exf1=Q+ 16.Rxf1 Bxd6, nhưng nước đi này đặt ra những bài toán rất khó trên bàn cờ.',
      '15...': '**15...Nf8?** Đen giữ ô h7 nhưng cho Trắng thời gian ra đòn tiếp theo. Phong cấp ngay lẽ ra tốt hơn.',
      '16': 'Mã ăn f7, tấn công Hậu d8 và tốt h6. Trắng chấp nhận để Đen phong Hậu kèm chiếu.',
      '17...':
        'Sau 17.Rxf1, Trắng kém gần một Xe nhưng các quân trắng đang vây quanh Vua đen. Bronstein trả lại Tượng ở f5 để kéo Hậu trắng đi và tìm cách đổi Hậu.',
      '19': 'Spassky tránh đổi Hậu, giữ nguyên sức ép trên cột f.',
      '21':
        'Tượng b3 đứng sau Mã f7 trên đường chéo tới g8: bất kỳ nước đi nào của Mã cũng sẽ là một đòn chiếu mở.',
      '22': 'Chiếu mở! Mã f7 ăn lại ở e5, Tượng b3 chiếu Vua g8.',
      '23':
        'Hậu chiếu từ e4. Mọi cách đỡ đều thua: 23...Kh8 24.Rxf8+ Qxf8 25.Ng6+ dẫn tới chiếu hết; 23...Ng6 24.Qxg6+ cũng vậy; còn 23...g6 24.Rxf8 khiến Đen mất thêm nhiều quân. Bronstein đầu hàng.',
    },
    keyMoments: ['10...', '14...', '15', '16', '23'],
    lessons: [
      'Trong các khai cuộc gambit, sự phát triển và nhịp đi quan trọng hơn một vài tốt.',
      'Một quân cắm sâu vào trận địa đối phương (Nd6) có thể làm rối loạn toàn bộ hàng phòng thủ.',
      'Đôi khi có thể bỏ qua đe dọa của đối thủ (tốt e2 phong cấp) nếu đòn tấn công của ta đến nhanh hơn.',
      'Xếp Tượng đứng sau Mã nhắm vào Vua để chuẩn bị chiếu mở – một mô-típ chiến thuật cần ghi nhớ.',
    ],
    tags: ['Khai cuộc', 'Thí quân', 'Tấn công Vua'],
    source: 'https://www.chessgames.com/perl/chessgame?gid=1034110',
  },
  {
    id: 'fischer-tal-1960',
    title: 'Fischer – Tal, Olympiad Leipzig 1960: Cơn lốc kết thúc bằng hòa cờ',
    white: 'Robert James Fischer',
    black: 'Mikhail Tal',
    event: 'Olympiad cờ vua lần thứ 14, Leipzig',
    year: 1960,
    result: '1/2-1/2',
    opening: 'Phòng thủ Pháp, biến Winawer (French Defence, Winawer Variation)',
    difficulty: 4,
    context:
      'Tại Olympiad Leipzig 1960, tân vô địch thế giới Mikhail Tal gặp Bobby Fischer, khi ấy mới 17 tuổi, ở bàn một trong trận Liên Xô – Mỹ. Năm trước, ở giải Ứng viên 1959, Fischer đã thua Tal cả bốn ván và rất muốn phục thù. Ván hòa này đầy những đòn phối hợp, và Fischer đã đưa nó vào cuốn sách nổi tiếng "60 ván cờ đáng nhớ" của mình.',
    summary:
      'Fischer chọn nhánh sắc bén nhất của biến Winawer: Hậu trắng ăn tốt g7, h7, còn Đen nhận lại thế chủ động ở trung tâm với một tốt cắm sâu ở c3. Ở nước 14, Tal tung ra 14...Nxe5!, mở màn một chuỗi đổi quân dữ dội: Tượng, Mã, Xe liên tục ăn qua ăn lại. Khi khói tan, Trắng hơn vật chất nhưng Vua trắng trống trải, và Hậu đen có chiếu liên tục. Hai kỳ thủ đồng ý hòa.',
    moves: '1.e4 e6 2.d4 d5 3.Nc3 Bb4 4.e5 c5 5.a3 Ba5 6.b4 cxd4 7.Qg4 Ne7 8.bxa5 dxc3 9.Qxg7 Rg8 10.Qxh7 Nbc6 11.Nf3 Qc7 12.Bb5 Bd7 13.O-O O-O-O 14.Bg5 Nxe5 15.Nxe5 Bxb5 16.Nxf7 Bxf1 17.Nxd8 Rxg5 18.Nxe6 Rxg2+ 19.Kh1 Qe5 20.Rxf1 Qxe6 21.Kxg2 Qg4+',
    annotations: {
      '3...': 'Biến Winawer: Tượng ghim Mã c3, Đen sẵn sàng đổi Tượng lấy Mã để làm hỏng cấu trúc tốt của Trắng.',
      '7': 'Hậu lao ra g4 tấn công tốt g7 – cách đáp trả sắc bén nhất.',
      '7...': 'Đen không giữ tốt g7 mà phát triển Mã, chấp nhận mất tốt cánh Vua để đổi lấy trung tâm và cột g mở.',
      '8...': 'Tốt c3 cắm sâu vào trận địa Trắng – một cái gai sẽ tồn tại đến tận cuối ván.',
      '13...':
        'Hai bên nhập thành khác cánh. Vua đen ở c8 khá an toàn sau hàng tốt, còn cột g mở nhắm thẳng vào Vua trắng ở g1.',
      '14': 'Tượng g5 ghim Mã e7 vào Xe d8. Trắng tưởng như đã kiểm soát được thế cờ.',
      '14...':
        '**14...Nxe5!** Tal mở màn chuỗi phối hợp: 15.Nxe5 Bxb5 16.Nxf7 Bxf1 17.Nxd8 Rxg5. Hai bên liên tục ăn quân của nhau, và nước nào cũng kèm theo đe dọa.',
      '16': 'Mã ăn f7 và tấn công Xe d8. Đen đáp lại bằng cách ăn Xe f1.',
      '17...':
        'Xe ăn Tượng g5. Sau 18.Nxe6, Mã trắng đánh đôi Hậu c7 và Xe g5, nhưng Đen đã có sẵn 18...Rxg2+.',
      '19...': 'Hậu rời c7 với nhiều đe dọa: Mã e6 bị tấn công, Xe g2 và Tượng f1 của Đen vẫn đứng sâu trong trận địa Trắng.',
      '21': 'Trắng ăn Xe g2 và hơn vật chất, nhưng Vua trắng gần như không còn tốt che chắn.',
      '21...':
        'Hậu chiếu ở g4. Vua trắng chỉ có thể đi lại giữa h1 và g1 trước các nước chiếu Qf3+ và Qg4+, nên hai bên ký hòa.',
    },
    keyMoments: ['8...', '14', '14...', '17...', '21...'],
    lessons: [
      'Biến Winawer tạo ra thế cờ mất cân bằng: Trắng có cặp Tượng và ăn được tốt cánh Vua, Đen có trung tâm và cơ hội phản công.',
      'Trong một chuỗi đổi quân phức tạp, hãy tính đến tận cuối biến – bên đi nước cuối cùng thường là bên được lợi.',
      'Hơn vật chất chưa chắc đã thắng nếu Vua bị trống trải: chiếu liên tục là vũ khí cứu nguy kinh điển.',
      'Một tốt cắm sâu (như tốt c3) có thể gây rối cho kế hoạch của đối phương suốt cả ván.',
    ],
    tags: ['Chiến thuật', 'Khai cuộc'],
    source: 'https://www.chessgames.com/perl/chessgame?gid=1008399',
  },

  // ------------------------------------------------------------------ 1961
  {
    id: 'petrosian-pachman-1961',
    title: 'Petrosian – Pachman, Bled 1961: Con trăn bất ngờ thí Hậu',
    white: 'Tigran Petrosian',
    black: 'Luděk Pachman',
    event: 'Giải quốc tế Bled 1961, vòng 6',
    year: 1961,
    result: '1-0',
    opening: 'Tấn công Ấn Độ của Vua (King\'s Indian Attack)',
    difficulty: 3,
    context:
      'Tigran Petrosian nổi tiếng với lối chơi phòng ngừa – chặn đứng kế hoạch của đối thủ từ trước khi nó kịp hình thành – và hiếm khi tung ra những đòn thí quân hoa mỹ. Giải Bled 1961 quy tụ nhiều danh thủ hàng đầu, trong đó có Tal và Fischer. Ván thắng nhanh trước kiện tướng Tiệp Khắc Luděk Pachman cho thấy Petrosian cũng có thể tấn công vô cùng sắc bén khi thời cơ đến.',
    summary:
      'Petrosian dùng hệ thống Tấn công Ấn Độ của Vua và sớm đẩy e5 để giành không gian. Hai bên đổi Mã ở b3, nhưng Trắng tận dụng thời gian để đưa Tượng cắm vào d6 và Mã lên c4. Khi Vua đen bước ra g7, Petrosian tung đòn 19.Qxf6+!!: Vua đen bị kéo lên f6, rồi bị Tượng và Xe dồn tới g5. Nước đi yên lặng 21.Bg7! khép lưới; mọi cách phòng thủ đều dẫn tới chiếu hết, nên Pachman đầu hàng.',
    moves: '1.Nf3 c5 2.g3 Nc6 3.Bg2 g6 4.O-O Bg7 5.d3 e6 6.e4 Nge7 7.Re1 O-O 8.e5 d6 9.exd6 Qxd6 10.Nbd2 Qc7 11.Nb3 Nd4 12.Bf4 Qb6 13.Ne5 Nxb3 14.Nc4 Qb5 15.axb3 a5 16.Bd6 Bf6 17.Qf3 Kg7 18.Re4 Rd8 19.Qxf6+ Kxf6 20.Be5+ Kg5 21.Bg7',
    annotations: {
      '6': 'Trắng dựng thế Tấn công Ấn Độ của Vua: Tượng fianchetto ở g2, tốt d3–e4, chuẩn bị đẩy e5 lấn sang cánh Vua.',
      '8': 'Tốt e5 giành không gian và chặn đường chéo của Tượng g7. Đen buộc phải đổi tốt.',
      '13':
        'Mã e5 lại chặn đường chéo của Tượng g7, đồng thời mở đường cho Tượng g2 nhắm vào b7. Trắng sẵn sàng để Mã b3 bị đổi.',
      '14': 'Mã c4 tấn công Hậu b6 với nhịp, rồi Trắng mới ăn lại Mã ở b3.',
      '16': 'Tượng chiếm ô d6 – một chiếc gai ngay giữa trận địa Đen, tấn công Mã e7 và cắt đứt liên lạc giữa các quân đen.',
      '17': 'Hậu sang f3 tấn công Tượng f6, sẵn sàng chuyển sang cánh Vua.',
      '17...': 'Vua đen bước lên g7 để bảo vệ Tượng f6 – nhưng chính điều đó đưa Vua vào tầm ngắm.',
      '18': 'Xe e4 kiểm soát ô e5 và hàng 4 – sự chuẩn bị âm thầm cho đòn quyết định.',
      '18...': 'Pachman tấn công Tượng d6, không nhận ra mối nguy đang tới.',
      '19':
        '**19.Qxf6+!!** Thí Hậu! Từ chối ăn Hậu (ví dụ 19...Kg8) cũng không cứu được Đen: Trắng chiếu hết sau vài nước. Pachman ăn Hậu.',
      '20':
        'Tượng chiếu, được Xe e4 bảo vệ. Nếu 20...Kf5 thì 21.Rf4+ Kg5 22.Bf6+ Kh6 23.Rh4# – nên Vua đen chỉ còn đường tới g5.',
      '21':
        '**21.Bg7!** Nước đi yên lặng khép lưới. Trắng dọa 22.h4+ Kf5 23.Bh3#, và Đen không có cách chống đỡ thỏa đáng – mọi phương án đều bị chiếu hết sau vài nước. Pachman đầu hàng.',
    },
    keyMoments: ['13', '16', '19', '20', '21'],
    lessons: [
      'Đẩy tốt giành không gian (e5) có thể cắt đứt đường chéo của Tượng fianchetto đối phương.',
      'Một quân cắm sâu như Tượng d6 làm tê liệt sự phối hợp của đối thủ.',
      'Khi Vua đối phương rời chỗ trú ẩn, hãy tìm đòn thí để lôi nó ra giữa bàn cờ – và đừng quên những nước yên lặng như 21.Bg7!.',
      'Ngay cả kỳ thủ thiên về phòng thủ cũng phải sẵn sàng tấn công quyết liệt khi thế cờ cho phép.',
    ],
    tags: ['Thí quân', 'Tấn công Vua', 'Ván ngắn'],
    source: 'https://www.chessgames.com/perl/chessgame?gid=1104948',
  },

  // ------------------------------------------------------------------ 1963
  {
    id: 'byrne-fischer-1963',
    title: 'R. Byrne – Fischer, Giải vô địch Mỹ 1963/64: Đòn sấm sét Nxf2',
    white: 'Robert Byrne',
    black: 'Robert James Fischer',
    event: 'Giải vô địch nước Mỹ 1963/64, New York, vòng 3',
    year: 1963,
    result: '0-1',
    opening: 'Phòng thủ Grünfeld, hệ Fianchetto với 3...c6 (Grünfeld Defence, Fianchetto)',
    difficulty: 4,
    context:
      'Giải vô địch nước Mỹ 1963/64 là màn trình diễn có một không hai của Bobby Fischer: ông thắng cả 11 ván, không hòa ván nào. Robert Byrne là một trong những kỳ thủ hàng đầu nước Mỹ và là một đối thủ đáng gờm của Fischer. Ván đấu ở vòng 3 nổi tiếng vì Byrne đầu hàng vào lúc nhiều người theo dõi ở phòng bình luận còn chưa nhận ra Đen đã có đòn thắng.',
    summary:
      'Từ một thế khai cuộc yên tĩnh với cấu trúc tốt đối xứng, Fischer phá trung tâm bằng ...e5 và đưa Mã vào d3. Nước 15...Nxf2!! bất ngờ phá tan hàng rào quanh Vua trắng; sau 16.Kxf2 Ng4+, Mã thứ hai lần lượt lao vào e3 rồi g2. Tốt d tiến lên d4 mở đường chéo dài, Tượng b7 và Hậu đen nhắm thẳng vào Vua trắng. Ngay sau nước 21...Qd7, Byrne nhận ra không thể chống đỡ và đầu hàng.',
    moves: '1.d4 Nf6 2.c4 g6 3.g3 c6 4.Bg2 d5 5.cxd5 cxd5 6.Nc3 Bg7 7.e3 O-O 8.Nge2 Nc6 9.O-O b6 10.b3 Ba6 11.Ba3 Re8 12.Qd2 e5 13.dxe5 Nxe5 14.Rfd1 Nd3 15.Qc2 Nxf2 16.Kxf2 Ng4+ 17.Kg1 Nxe3 18.Qd2 Nxg2 19.Kxg2 d4 20.Nxd4 Bb7+ 21.Kf1 Qd7',
    annotations: {
      '5': 'Cấu trúc tốt đối xứng sau 5.cxd5 cxd5 thường dẫn tới thế cờ yên tĩnh – nhưng Fischer sẽ chứng minh điều ngược lại.',
      '10...': 'Tượng a6 nhắm vào Mã e2 và gây khó khăn cho việc sắp xếp quân của Trắng.',
      '12...': 'Phá vỡ trung tâm! Đen chấp nhận tốt d5 bị cô lập để đổi lấy sự hoạt động của các quân.',
      '14...': 'Mã cắm vào d3 – một ô sâu trong trận địa Trắng, khống chế các ô then chốt và nhắm vào f2.',
      '15...':
        '**15...Nxf2!!** Thí Mã phá hàng rào quanh Vua trắng. Sau 16.Kxf2 Ng4+ 17.Kg1 Nxe3, Mã đen đánh cùng lúc Hậu c2, Xe d1 và Tượng g2.',
      '18': 'Hậu né sang d2, nhưng Mã đen tiếp tục ăn Tượng g2 – lớp che chắn cuối cùng của Vua trắng.',
      '19...':
        '**19...d4!** Tốt d tiến lên, tấn công Mã c3 và mở đường chéo dài a8–h1 để Tượng a6 chuyển về b7.',
      '20...': 'Tượng chiếu ở b7, nhắm thẳng vào Vua trắng trên đường chéo dài.',
      '21...':
        'Đen dọa 22...Qh3+ 23.Kg1 Bxd4+ và chiếu hết. Nếu 22.Qf2 thì 22...Qh3+ 23.Kg1 Re1+!! 24.Rxe1 Bxd4 thắng Hậu. Trắng chỉ có thể kéo dài ván đấu bằng cách trả lại nhiều vật chất, nên Byrne đầu hàng.',
    },
    keyMoments: ['12...', '15...', '19...', '21...'],
    lessons: [
      'Cấu trúc tốt đối xứng không có nghĩa là hòa: bên phát triển nhanh và hoạt động hơn sẽ nắm quyền chủ động.',
      'Chấp nhận một tốt cô lập để các quân được hoạt động là một trao đổi hợp lý.',
      'Khi Vua đối phương chỉ được che chắn bởi vài quân, thí quân để phá lớp che chắn đó thường rất đáng giá.',
      'Mở đường chéo dài cho Tượng bằng một nước tốt (19...d4!) là mô-típ tấn công kinh điển.',
    ],
    orientation: 'black',
    tags: ['Thí quân', 'Tấn công Vua'],
    source: 'https://www.chessgames.com/perl/chessgame?gid=1008419',
  },
  {
    id: 'fischer-benko-1963',
    title: 'Fischer – Benko, Giải vô địch Mỹ 1963/64: Nước Xe f6 bất hủ',
    white: 'Robert James Fischer',
    black: 'Pal Benko',
    event: 'Giải vô địch nước Mỹ 1963/64, New York, vòng 10',
    year: 1963,
    result: '1-0',
    opening: 'Phòng thủ Pirc – Tấn công Áo (Pirc Defence, Austrian Attack)',
    difficulty: 3,
    context:
      'Đây là một trong 11 ván thắng liên tiếp đưa Fischer tới chức vô địch nước Mỹ 1963/64 với điểm số tuyệt đối. Pal Benko, kiện tướng gốc Hungary định cư tại Mỹ, là một đối thủ đáng gờm – về sau chính ông đã nhường suất dự giải Liên khu vực 1970 cho Fischer. Nước 19.Rf6!! trong ván này thường được xếp vào hàng những nước đi đẹp nhất của Fischer.',
    summary:
      'Fischer chọn Tấn công Áo sắc bén chống lại phòng thủ Pirc, đổi tốt trung tâm rồi đẩy f5 để mở cột f. Hậu trắng chuyển sang h5, nhắm vào ô h7, nhưng Tượng d3 vẫn bị chính tốt e4 chặn đường. Sau 18.Bxd4 exd4, Fischer tung ra 19.Rf6!! – Xe chặn tốt f7, tấn công Mã d6 và chuẩn bị e5 để mở đường cho Tượng tới h7. Benko không có cách phòng thủ thỏa đáng và đầu hàng chỉ hai nước sau.',
    moves: '1.e4 g6 2.d4 Bg7 3.Nc3 d6 4.f4 Nf6 5.Nf3 O-O 6.Bd3 Bg4 7.h3 Bxf3 8.Qxf3 Nc6 9.Be3 e5 10.dxe5 dxe5 11.f5 gxf5 12.Qxf5 Nd4 13.Qf2 Ne8 14.O-O Nd6 15.Qg3 Kh8 16.Qg4 c6 17.Qh5 Qe8 18.Bxd4 exd4 19.Rf6 Kg8 20.e5 h6 21.Ne2',
    annotations: {
      '4': 'Tấn công Áo: Trắng dựng ba tốt d4–e4–f4, chuẩn bị đẩy e5 hoặc f5.',
      '6...': 'Tượng g4 ghim Mã f3; Benko sẵn sàng đổi Tượng lấy Mã để giảm sức ép ở trung tâm.',
      '11': 'Tốt f5 lấn vào cánh Vua; sau 11...gxf5 12.Qxf5, Hậu trắng đã đứng sát Vua đen.',
      '12...': 'Mã nhảy vào d4, tấn công Hậu f5 và tốt c2.',
      '15...': 'Vua đen rời g8 để gỡ thế ghim của Tượng g7 trên cột g.',
      '17': 'Hậu sang h5, nhắm vào h7. Chỉ còn thiếu Tượng d3 – quân đang bị chính tốt e4 của Trắng chắn đường.',
      '18': 'Đổi Tượng lấy Mã d4, chuẩn bị cho đòn quyết định.',
      '19':
        '**19.Rf6!!** Xe lao vào ô bị Tượng g7 kiểm soát. Xe chặn tốt f7 không cho đẩy ...f5, tấn công Mã d6 và chuẩn bị 20.e5, mở đường chéo d3–h7 để Qxh7#. Nếu 19...Bxf6 thì 20.e5 và Trắng chiếu hết chỉ sau vài nước.',
      '19...': 'Benko chọn 19...Kg8 – theo máy tính đây là cách phòng thủ tốt nhất, nhưng vẫn không đủ.',
      '20': 'Trắng vẫn đẩy e5, tấn công Mã d6 và mở đường chéo cho Tượng d3 nhắm vào h7.',
      '21':
        'Mã chuẩn bị tham gia tấn công, còn tốt e5 và Xe f6 cùng nhắm vào Mã d6. Đen không thể vừa giữ vật chất vừa giữ cánh Vua, nên Benko đầu hàng.',
    },
    keyMoments: ['11', '17', '19', '21'],
    lessons: [
      'Tấn công Áo dựa trên ba tốt trung tâm; tốt f5 là đòn bẩy để mở cột f và áp sát Vua đối phương.',
      'Một quân tấn công bị chính tốt của mình chặn (Tượng d3 sau tốt e4) có thể được giải phóng bằng một nước tốt có nhịp (e5).',
      'Đặt quân vào ô đối phương kiểm soát (19.Rf6!!) là đúng nếu việc ăn quân đó dẫn tới chiếu hết.',
      'Hãy tìm nước đi vừa chặn khả năng phòng thủ của đối phương vừa tạo thêm đe dọa mới.',
    ],
    tags: ['Tấn công Vua', 'Thí quân', 'Ván ngắn'],
    source: 'https://www.chessgames.com/perl/chessgame?gid=1008421',
  },

  // ------------------------------------------------------------------ 1965
  {
    id: 'mardle-gaprindashvili-1965',
    title: 'Mardle – Gaprindashvili, Hastings 1964/65: Nữ hoàng ra đòn chớp nhoáng',
    white: 'Denis Mardle',
    black: 'Nona Gaprindashvili',
    event: 'Giải Hastings 1964/65 (bảng Premier), vòng 5',
    year: 1965,
    result: '0-1',
    opening: 'Phòng thủ Sicilia, biến Taimanov (Sicilian Defence, Taimanov Variation)',
    difficulty: 2,
    context:
      'Nona Gaprindashvili (Gruzia) giành ngôi vô địch thế giới nữ năm 1962 khi mới 21 tuổi và giữ ngôi suốt 16 năm. Mùa giải 1964/65, bà trở thành người phụ nữ đầu tiên thi đấu ở bảng Premier danh giá của giải Hastings kể từ thời Vera Menchik. Ván thắng chỉ trong 14 nước, diễn ra ngày đầu năm 1965, là một minh chứng cho thấy bà hoàn toàn sòng phẳng với các đối thủ nam.',
    summary:
      'Trắng chơi khai cuộc thiếu chính xác: Mã d2 thụ động, còn nước f3 làm yếu đường chéo dẫn tới Vua trắng. Gaprindashvili nhanh chóng giành không gian bằng ...e5, đưa Mã sang h5 và Tượng sang g5 để tranh chấp các ô đen. Khi Mardle tham ăn Xe f8, bà đáp lại bằng 13...Be3+ và 14...Ng3+!, mở cột h cho Hậu. Sau 15.hxg3 sẽ là 15...Qh6# nên Trắng đầu hàng ngay.',
    moves: '1.e4 c5 2.Nf3 Nc6 3.d4 cxd4 4.Nxd4 e6 5.Be3 Nf6 6.Nd2 e5 7.Nxc6 dxc6 8.f3 Be7 9.Bc4 O-O 10.O-O Nh5 11.Nb3 Bg5 12.Bc5 Qf6 13.Bxf8 Be3+ 14.Kh1 Ng3+',
    annotations: {
      '5': '5.Be3 hơi sớm: sau 5...Nf6 tấn công e4, Trắng chọn bảo vệ bằng 6.Nd2 – một ô kém hoạt động hơn nhiều so với c3.',
      '6...': 'Tốt e5 đuổi Mã d4 và giành chỗ đứng ở trung tâm. Sau khi đổi Mã, Đen có cột d mở cho Hậu.',
      '8': 'Tốt f3 bảo vệ e4 nhưng làm trống ô f2 và mở đường chéo g1–e3: một khi Tượng e3 rời đi, Vua trắng sẽ dễ bị chiếu.',
      '10...': 'Mã h5 hướng tới f4 hoặc g3 – những ô nằm sát Vua trắng.',
      '11...': 'Tượng g5 đề nghị đổi Tượng ô đen, quân phòng thủ quan trọng của Trắng ở e3.',
      '12': 'Tượng c5 tấn công Xe f8. Tượng trắng rời khỏi e3 – ô đen ngay trước Vua – và Đen lập tức khai thác điều đó.',
      '12...':
        '**12...Qf6!?** Bỏ mặc Xe f8! Hậu nhắm vào f3 và chuẩn bị Be3+. Đây là một canh bạc thực dụng: máy tính cho thấy Trắng vẫn đứng vững nếu đáp trả chính xác (ví dụ 13.f4!), nhưng chỉ một sai lầm nhỏ sẽ phải trả giá đắt.',
      '13...': 'Tượng chiếu ở e3, đúng trên đường chéo đã yếu đi sau nước f3. Trắng chỉ có hai cách: 14.Rf2 hoặc 14.Kh1.',
      '14': '**14.Kh1??** Sai lầm chí mạng. Chỉ có 14.Rf2!, trả lại chất lượng, mới giữ được thế cân bằng.',
      '14...':
        '**14...Ng3+!** Mã chiếu và Trắng buộc phải ăn 15.hxg3, mở cột h: 15...Qh6# là chiếu hết, vì Tượng e3 khống chế ô g1. Mardle đầu hàng.',
    },
    keyMoments: ['8', '12...', '14', '14...'],
    lessons: [
      'Một nước tốt tưởng vô hại như f3 có thể mở ra đường chéo dẫn thẳng tới Vua nhà.',
      'Tham ăn quân khi Vua chưa an toàn là con dao hai lưỡi.',
      'Khi bị chiếu, hãy cân nhắc mọi cách đỡ: trả lại vật chất (14.Rf2!) thường tốt hơn đưa Vua vào góc.',
      'Mô-típ Mã chiếu ở g3 để mở cột h cho Hậu là một mẫu chiếu hết cần ghi nhớ.',
    ],
    orientation: 'black',
    tags: ['Cờ nữ', 'Ván ngắn', 'Tấn công Vua'],
    source: 'https://www.chessgames.com/perl/chessgame?gid=1047133',
  },
  {
    id: 'tal-larsen-1965',
    title: 'Tal – Larsen, bán kết Ứng viên 1965: Đòn thí Mã ở d5',
    white: 'Mikhail Tal',
    black: 'Bent Larsen',
    event: 'Trận bán kết Ứng viên, Bled 1965, ván 10',
    year: 1965,
    result: '1-0',
    opening: 'Phòng thủ Sicilia, biến Scheveningen (Sicilian Defence, Scheveningen Variation)',
    difficulty: 5,
    context:
      'Năm 1965, cựu vô địch thế giới Mikhail Tal gặp Bent Larsen (Đan Mạch) ở bán kết các trận đấu Ứng viên. Trước ván thứ mười – ván cuối theo lịch – tỉ số đang hòa 4½–4½. Cầm quân Trắng, Tal chọn lối chơi quyết liệt nhất và đặt cược tất cả vào một đòn thí Mã.',
    summary:
      'Hai bên nhập thành khác cánh trong biến Scheveningen. Khi Larsen đẩy ...b4 đuổi Mã c3, Tal không lui mà thí 16.Nd5!? – sau 16...exd5 17.exd5, cột e mở ra và hai Tượng trắng cùng nhắm vào Vua đen. Larsen phản công bằng ...f5 rồi ...b3, nhưng Tal liên tiếp tung ra 20.Bxf5! và 21.Rxe7, giữ thế chủ động đến cùng. Larsen đầu hàng ở nước 37, và Tal giành quyền vào chung kết Ứng viên.',
    moves: '1.e4 c5 2.Nf3 Nc6 3.d4 cxd4 4.Nxd4 e6 5.Nc3 d6 6.Be3 Nf6 7.f4 Be7 8.Qf3 O-O 9.O-O-O Qc7 10.Ndb5 Qb8 11.g4 a6 12.Nd4 Nxd4 13.Bxd4 b5 14.g5 Nd7 15.Bd3 b4 16.Nd5 exd5 17.exd5 f5 18.Rde1 Rf7 19.h4 Bb7 20.Bxf5 Rxf5 21.Rxe7 Ne5 22.Qe4 Qf8 23.fxe5 Rf4 24.Qe3 Rf3 25.Qe2 Qxe7 26.Qxf3 dxe5 27.Re1 Rd8 28.Rxe5 Qd6 29.Qf4 Rf8 30.Qe4 b3 31.axb3 Rf1+ 32.Kd2 Qb4+ 33.c3 Qd6 34.Bc5 Qxc5 35.Re8+ Rf8 36.Qe6+ Kh8 37.Qf7',
    annotations: {
      '9': 'Nhập thành khác cánh – cuộc đua bắt đầu: Trắng tấn công bằng tốt g, Đen bằng tốt a và b.',
      '11': 'Tốt g4 tiến lên, chuẩn bị g5 để đuổi Mã f6 khỏi vị trí phòng thủ.',
      '13...': 'Đen phản công cánh Hậu: tốt b5–b4 sẽ đuổi Mã c3, quân bảo vệ quan trọng của Vua trắng.',
      '15...': 'Tốt b4 tấn công Mã c3. Lui Mã đồng nghĩa với việc để Đen giành nhịp tấn công.',
      '16':
        '**16.Nd5!?** Thí Mã! Sau 16...exd5 17.exd5, cột e mở ra, tốt d5 cắt đôi trận địa Đen và Tượng d3 nhắm vào h7. Phân tích máy tính ngày nay cho rằng Đen có thể phòng thủ, nhưng ván cờ trở nên cực kỳ phức tạp – đúng sở trường của Tal.',
      '17...': 'Đen dùng tốt f5 chặn đường chéo b1–h7 của Tượng d3.',
      '18': 'Xe chiếm cột e mở, nhắm vào Tượng e7.',
      '20': '**20.Bxf5!** Thí tiếp Tượng để phá tốt f5 và mở đường cho Xe ăn Tượng e7.',
      '21...': 'Mã nhảy vào e5 tấn công Hậu f3, nhưng Hậu trắng né sang e4 với đe dọa của chính mình.',
      '26': 'Sau loạt đổi quân, Trắng đã lấy lại vật chất và còn hơn chút ít, trong khi tốt d5 thông và Vua đen thiếu quân che chắn.',
      '34':
        '**34.Bc5!** Tượng tấn công Hậu d6 và kéo nó khỏi vị trí phòng thủ. Sau 34...Qxc5, Xe trắng vào e8 và Hậu trắng tiến tới e6 – ô mà trước đó Hậu đen đang canh giữ.',
      '37':
        'Hậu f7 tấn công Xe f8 lần thứ hai: Trắng dọa 38.Rxf8+ Qxf8 39.Qxf8#. Đen không thể giữ được nên Larsen đầu hàng.',
    },
    keyMoments: ['15...', '16', '20', '34', '37'],
    lessons: [
      'Khi nhập thành khác cánh, đừng ngại thí quân để mở đường tới Vua đối phương nhanh hơn.',
      'Một đòn thí chưa chính xác về lý thuyết vẫn có thể hiệu quả nếu nó đặt ra những bài toán quá khó cho đối thủ trên bàn cờ.',
      'Sau khi thí quân, phải duy trì thế chủ động bằng những đòn tiếp theo (Bxf5, Rxe7) – không cho đối phương thời gian củng cố.',
      'Đòn làm lệch hướng (34.Bc5!) kéo quân phòng thủ ra khỏi vị trí then chốt.',
    ],
    tags: ['Thí quân', 'Tấn công Vua', 'Chiến thuật'],
    source: 'https://www.chessgames.com/perl/chessgame?gid=1139729',
  },

  // ------------------------------------------------------------------ 1966
  {
    id: 'petrosian-spassky-1966-van-10',
    title: 'Petrosian – Spassky, ván 10 trận tranh ngôi 1966: Hai lần thí chất lượng',
    white: 'Tigran Petrosian',
    black: 'Boris Spassky',
    event: 'Trận tranh ngôi vô địch thế giới, Moskva',
    year: 1966,
    result: '1-0',
    opening: 'Phòng thủ Ấn Độ của Vua, biến Fianchetto – hệ Panno (King\'s Indian Defence, Fianchetto, Panno)',
    difficulty: 4,
    context:
      'Năm 1966, nhà vô địch Tigran Petrosian bảo vệ ngôi vua trước người thách đấu Boris Spassky. Petrosian nổi tiếng với nghệ thuật thí chất lượng – đổi Xe lấy một quân nhẹ để giành thế chủ động lâu dài. Ông giữ được ngôi vô địch với tỉ số 12½–11½, và ván 10 là một trong những ván đẹp nhất của trận đấu.',
    summary:
      'Spassky chọn phòng thủ Ấn Độ của Vua và chủ động phá vỡ ở cánh Vua bằng ...f5, ...e4. Petrosian bình thản đổi quân rồi hai lần trả chất lượng: lần đầu để đưa Mã vào e3 và chiếm các ô trắng, lần sau (24.Rxf4!) để phá tan cánh Vua đen. Các quân nhẹ của Trắng trở nên mạnh hơn Xe đen, và màn kết là đòn thí Hậu 30.Qh8+!! – sau 30...Kxh8 31.Nxf7+ Mã chiếu Vua và đánh luôn Hậu đen.',
    moves: '1.Nf3 Nf6 2.g3 g6 3.c4 Bg7 4.Bg2 O-O 5.O-O Nc6 6.Nc3 d6 7.d4 a6 8.d5 Na5 9.Nd2 c5 10.Qc2 e5 11.b3 Ng4 12.e4 f5 13.exf5 gxf5 14.Nd1 b5 15.f3 e4 16.Bb2 exf3 17.Bxf3 Bxb2 18.Qxb2 Ne5 19.Be2 f4 20.gxf4 Bh3 21.Ne3 Bxf1 22.Rxf1 Ng6 23.Bg4 Nxf4 24.Rxf4 Rxf4 25.Be6+ Rf7 26.Ne4 Qh4 27.Nxd6 Qg5+ 28.Kh1 Ra7 29.Bxf7+ Rxf7 30.Qh8+',
    annotations: {
      '8...': 'Hệ Panno: Mã a5 tấn công tốt c4, Đen chuẩn bị ...c5 và ...b5 để phá cánh Hậu.',
      '12': 'Trắng giữ thế trung tâm vững chắc với cặp tốt d5–e4; Đen lập tức đáp lại bằng ...f5.',
      '15...': 'Spassky đẩy e4 để mở đường chéo cho Tượng g7 và giành thế chủ động.',
      '18': 'Sau khi Tượng ô đen được đổi, cánh Vua đen thiếu hẳn quân canh giữ các ô đen như f6, g7, h8.',
      '19...': 'Tốt f4 phá vỡ, mở đường cho Tượng c8 lên h3 tấn công Xe f1.',
      '21':
        '**Thí chất lượng lần thứ nhất.** Thay vì lui Xe, Petrosian đưa Mã vào e3 và để Tượng đen ăn Xe f1. Đổi lại, Mã e3 và Tượng trắng làm chủ các ô trắng ở trung tâm và cánh Vua.',
      '24':
        '**Thí chất lượng lần thứ hai!** 24.Rxf4 Rxf4 – Trắng đổi thêm một Xe lấy Mã để Tượng có thể chiếu ở e6 và Mã tiến vào e4. Kiểm tra bằng máy cho thấy Trắng vẫn giữ ưu thế rõ rệt sau nước này.',
      '25': 'Tượng chiếu ở e6, chuẩn bị cho Mã nhảy vào e4 nhắm vào tốt d6 và ô f6.',
      '27': 'Mã ăn d6, tấn công Xe f7 và tốt b5.',
      '28...': 'Xe a7 bảo vệ hàng 7 và Xe f7. Nhưng các ô đen quanh Vua đen hoàn toàn trống trải.',
      '30':
        '**30.Qh8+!!** Thí Hậu! Vua đen buộc phải ăn 30...Kxh8, rồi 31.Nxf7+ Mã chiếu Vua và đồng thời tấn công Hậu g5; sau 32.Nxg5, Trắng hơn hẳn một Mã. Spassky đầu hàng.',
    },
    keyMoments: ['18', '21', '24', '30'],
    lessons: [
      'Thí chất lượng (Xe lấy quân nhẹ) đáng giá khi quân nhẹ chiếm được các ô mạnh còn Xe đối phương không có cột mở để hoạt động.',
      'Khi Tượng ô đen đã bị đổi, các ô đen quanh Vua trở thành điểm yếu lâu dài.',
      'Mô-típ thí Hậu để Mã chiếu đôi (Qh8+ rồi Nxf7+) là một đòn kết thúc kinh điển.',
      'Trả vật chất để giành thế chủ động thường hiệu quả hơn khư khư giữ lấy nó.',
    ],
    tags: ['Tranh ngôi vô địch', 'Thí quân', 'Chiến lược'],
    source: 'https://www.chessgames.com/perl/chessgame?gid=1106725',
  },

  // ------------------------------------------------------------------ 1967
  {
    id: 'fischer-myagmarsuren-1967',
    title: 'Fischer – Myagmarsuren, Sousse 1967: Tấn công Ấn Độ của Vua mẫu mực',
    white: 'Robert James Fischer',
    black: 'Lhamsuren Myagmarsuren',
    event: 'Giải Liên khu vực Sousse 1967, vòng 3',
    year: 1967,
    result: '1-0',
    opening: 'Tấn công Ấn Độ của Vua chống phòng thủ Pháp (King\'s Indian Attack vs French)',
    difficulty: 3,
    context:
      'Tại giải Liên khu vực Sousse (Tunisia) năm 1967, Bobby Fischer đang dẫn đầu thì bỏ giải giữa chừng vì tranh cãi về lịch thi đấu. Ván thắng kiện tướng Mông Cổ Lhamsuren Myagmarsuren ở vòng 3 vẫn được nhắc tới như một ví dụ kinh điển của Tấn công Ấn Độ của Vua: Trắng tấn công cánh Vua, trong khi Đen tiến công ở cánh Hậu.',
    summary:
      'Fischer dựng thế Ấn Độ đảo ngược với tốt e5 lấn sâu, rồi để Đen thoải mái tấn công ở cánh Hậu. Trong lúc Đen mở cột b và đẩy tốt tới d4, c4, Trắng âm thầm dồn quân sang cánh Vua: tốt h tiến lên, Tượng f6 khóa chặt ô g7, Hậu và Xe chuyển sang cột h. Kết thúc là đòn thí Hậu 31.Qxh7+!: sau 31...Kxh7 32.hxg6+ Kxg6 33.Be4# là chiếu hết.',
    moves: '1.e4 e6 2.d3 d5 3.Nd2 Nf6 4.g3 c5 5.Bg2 Nc6 6.Ngf3 Be7 7.O-O O-O 8.e5 Nd7 9.Re1 b5 10.Nf1 b4 11.h4 a5 12.Bf4 a4 13.a3 bxa3 14.bxa3 Na5 15.Ne3 Ba6 16.Bh3 d4 17.Nf1 Nb6 18.Ng5 Nd5 19.Bd2 Bxg5 20.Bxg5 Qd7 21.Qh5 Rfc8 22.Nd2 Nc3 23.Bf6 Qe8 24.Ne4 g6 25.Qg5 Nxe4 26.Rxe4 c4 27.h5 cxd3 28.Rh4 Ra7 29.Bg2 dxc2 30.Qh6 Qf8 31.Qxh7+',
    annotations: {
      '2': 'Fischer chọn thế trận Ấn Độ đảo ngược: tốt d3, Mã d2, Tượng fianchetto ở g2, rồi sẽ đẩy e5 lấn không gian.',
      '8': 'Tốt e5 cắm sâu, đẩy Mã f6 rời khỏi vị trí phòng thủ cánh Vua. Đây là xương sống của kế hoạch tấn công.',
      '9...': 'Đen tấn công cánh Hậu bằng tốt b – một kế hoạch tự nhiên, nhưng tốc độ mới là yếu tố quyết định.',
      '11': 'Tốt h4 tiến lên, chuẩn bị h5 để mở cột h hoặc làm yếu hàng rào tốt của Đen.',
      '16': 'Tượng h3 tăng sức ép lên e6; Fischer chuẩn bị đưa Mã vào g5.',
      '18': 'Mã g5 nhắm vào h7 và e6; ngay sau đó Đen đổi Tượng e7 lấy quân Mã nguy hiểm này.',
      '23': '**23.Bf6!** Tượng cắm vào f6, khóa chặt ô g7 và đè nặng lên Vua đen. Đen không có quân nào đuổi được nó.',
      '24...': 'Tốt g6 đuổi Hậu khỏi h5, nhưng làm các ô đen quanh Vua đen càng yếu hơn – Hậu trắng lập tức chiếm ô g5.',
      '26...': 'Đen dồn tốt ở cánh Hậu (c4, cxd3, dxc2), nhưng quá chậm so với cuộc tấn công của Trắng.',
      '28': 'Xe chuyển sang h4, hỗ trợ tốt h5 và chuẩn bị mở cột h.',
      '29': 'Tượng lui về g2 để chuyển sang e4 trên đường chéo dài – chính quân Tượng này sẽ ra đòn kết thúc.',
      '30': 'Hậu h6 chuẩn bị hxg6 để mở cột h. Đen đáp 30...Qf8, đề nghị đổi Hậu.',
      '31':
        '**31.Qxh7+!** Thí Hậu: 31...Kxh7 (nước duy nhất) 32.hxg6+ – chiếu mở bằng Xe h4 – Kxg6 33.Be4#, hoặc 32...Kg8 33.Rh8#. Myagmarsuren đầu hàng.',
    },
    keyMoments: ['8', '23', '26...', '31'],
    lessons: [
      'Trong Tấn công Ấn Độ của Vua, tốt e5 là chìa khóa: nó đẩy Mã phòng thủ khỏi f6 và tạo không gian cho cuộc tấn công.',
      'Khi hai bên tấn công ở hai cánh khác nhau, hãy đếm nhịp: cuộc tấn công nhắm thẳng vào Vua thường quan trọng hơn việc ăn tốt ở cánh kia.',
      'Một quân Tượng cắm sâu ở f6 có thể khóa chặt Vua đối phương.',
      'Mẫu chiếu hết cần nhớ: thí Hậu ở h7, mở cột h bằng tốt và kết thúc bằng Tượng hoặc Xe.',
    ],
    tags: ['Tấn công Vua', 'Thí quân'],
    source: 'https://www.chessgames.com/perl/chessgame?gid=1044267',
  },

  // ------------------------------------------------------------------ 1968
  {
    id: 'botvinnik-portisch-1968',
    title: 'Botvinnik – Portisch, Monte Carlo 1968: Cơn bão thí quân',
    white: 'Mikhail Botvinnik',
    black: 'Lajos Portisch',
    event: 'Giải quốc tế Monte Carlo 1968, vòng 7',
    year: 1968,
    result: '1-0',
    opening: 'Khai cuộc Anh – Sicilia đảo ngược (English Opening, Reversed Sicilian)',
    difficulty: 4,
    context:
      'Năm 1968, Mikhail Botvinnik đã 56 tuổi và không còn giữ ngôi vô địch thế giới, nhưng vẫn thi đấu ở đẳng cấp cao. Lajos Portisch là kỳ thủ số một của Hungary, nổi tiếng với sự chuẩn bị kỹ lưỡng và lối chơi vững chắc. Ván thắng này cho thấy người thầy lớn của trường phái Xô Viết vẫn có thể tung ra những đòn phối hợp rực rỡ.',
    summary:
      'Từ Khai cuộc Anh, Botvinnik chồng hai Xe trên cột c. Nước 16.Rxc7! mở màn chuỗi thí quân: Xe thứ hai đổi lấy Tượng c6, rồi 18.Rxf7! xé toang cánh Vua đen. Khi Portisch tưởng có thể ăn Xe b7, Botvinnik tung ra 21.Nh4!! – bỏ mặc Xe để Mã nhảy vào g6 và Tượng chuyển sang e4. Ván cờ kết thúc bằng 26.Bxh6+, sau đó Trắng thắng lại Hậu với ưu thế áp đảo.',
    moves: '1.c4 e5 2.Nc3 Nf6 3.g3 d5 4.cxd5 Nxd5 5.Bg2 Be6 6.Nf3 Nc6 7.O-O Nb6 8.d3 Be7 9.a3 a5 10.Be3 O-O 11.Na4 Nxa4 12.Qxa4 Bd5 13.Rfc1 Re8 14.Rc2 Bf8 15.Rac1 Nb8 16.Rxc7 Bc6 17.R1xc6 bxc6 18.Rxf7 h6 19.Rb7 Qc8 20.Qc4+ Kh8 21.Nh4 Qxb7 22.Ng6+ Kh7 23.Be4 Bd6 24.Nxe5+ g6 25.Bxg6+ Kg7 26.Bxh6+',
    annotations: {
      '9': 'Tốt a3 chuẩn bị b4 để mở rộng ở cánh Hậu – kế hoạch điển hình trong Khai cuộc Anh.',
      '13': 'Xe chiếm cột c nửa mở, nhắm vào tốt c7.',
      '15': 'Hai Xe chồng trên cột c: tốt c7 bị tấn công hai lần.',
      '15...': 'Đen lui Mã về b8 để điều quân, nhưng điều đó cho Trắng thời gian ra đòn.',
      '16':
        '**16.Rxc7!** Xe ăn tốt c7 và cắm vào hàng 7. Đen đáp lại bằng 16...Bc6, vừa tấn công Hậu a4 vừa cắt đường lui của Xe c7.',
      '17': '**17.R1xc6!** Thay vì lui Hậu, Trắng trả chất lượng: Xe ăn Tượng c6 để Xe c7 tiếp tục tung hoành ở hàng 7.',
      '18':
        '**18.Rxf7!** Lần thí quân thứ ba, phá tan hàng rào quanh Vua đen. Nếu 18...Kxf7 thì 19.Qc4+ cùng Ng5+ đem lại cho Trắng một cuộc tấn công thắng lợi.',
      '20': 'Hậu chiếu ở c4, Vua đen phải vào góc h8.',
      '21':
        '**21.Nh4!!** Botvinnik bỏ mặc Xe b7! Mã chuẩn bị nhảy tới g6 với chiếu, Tượng g2 chuyển sang e4 – mọi quân trắng lao vào Vua đen.',
      '23': 'Tượng e4 đứng sau Mã g6 trên đường chéo tới h7: Trắng dọa chiếu mở.',
      '24': 'Chiếu mở! Mã ăn e5, Tượng e4 chiếu Vua; Đen buộc phải che bằng tốt g6.',
      '25': 'Tượng ăn g6 kèm chiếu, phá nốt hàng rào tốt.',
      '26':
        '**26.Bxh6+!** Sau 26...Kxh6 27.Qh4+ Kg7 28.Qh7+ Kf8 29.Qxb7, Trắng lấy lại Hậu với ưu thế quyết định; các nước đi khác còn tệ hơn. Portisch đầu hàng.',
    },
    keyMoments: ['16', '17', '18', '21', '26'],
    lessons: [
      'Hai Xe chồng trên cột mở là lực lượng phá vỡ đáng sợ; hàng 7 là "thiên đường" của Xe.',
      'Một chuỗi thí quân chỉ thành công khi mỗi đòn đều tạo thêm đe dọa mới, không cho đối phương thời gian thở.',
      'Đừng vội ăn quân thí: hãy kiểm tra xem quân đối phương sẽ tràn vào Vua mình nhanh đến mức nào.',
      'Mô-típ Tượng đứng sau Mã nhắm vào Vua (chiếu mở) lại một lần nữa định đoạt ván đấu.',
    ],
    tags: ['Thí quân', 'Tấn công Vua', 'Chiến thuật'],
    source: 'https://www.chessgames.com/perl/chessgame?gid=1032787',
  },

  // ------------------------------------------------------------------ 1969
  {
    id: 'spassky-petrosian-1969-van-19',
    title: 'Spassky – Petrosian, ván 19 trận tranh ngôi 1969: Đòn Qg6 quyết định',
    white: 'Boris Spassky',
    black: 'Tigran Petrosian',
    event: 'Trận tranh ngôi vô địch thế giới, Moskva',
    year: 1969,
    result: '1-0',
    opening: 'Phòng thủ Sicilia, biến Najdorf với 6.Bg5 Nbd7 (Sicilian Defence, Najdorf)',
    difficulty: 4,
    context:
      'Ba năm sau thất bại sít sao năm 1966, Boris Spassky lại thách đấu Tigran Petrosian. Lần này, Spassky chơi đa dạng và quyết liệt hơn, giành chiến thắng với tỉ số 12½–10½ để trở thành nhà vô địch thế giới thứ mười. Ván 19 là một trong những ván tấn công đẹp nhất của trận đấu.',
    summary:
      'Petrosian chọn biến Najdorf – một lựa chọn sắc bén hiếm thấy với ông – còn Spassky nhập thành cánh Hậu rồi dồn quân sang cánh Vua. Trắng bỏ tốt g4 để mở cột g, rồi phá vỡ bằng f5 và e5. Nước 23.Qg6!! đưa Hậu vào sát Vua đen; sau 23...exd4 24.Ng5!, Trắng dọa chiếu hết ở h7 và Petrosian đầu hàng.',
    moves: '1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 a6 6.Bg5 Nbd7 7.Bc4 Qa5 8.Qd2 h6 9.Bxf6 Nxf6 10.O-O-O e6 11.Rhe1 Be7 12.f4 O-O 13.Bb3 Re8 14.Kb1 Bf8 15.g4 Nxg4 16.Qg2 Nf6 17.Rg1 Bd7 18.f5 Kh8 19.Rdf1 Qd8 20.fxe6 fxe6 21.e5 dxe5 22.Ne4 Nh5 23.Qg6 exd4 24.Ng5',
    annotations: {
      '6...': 'Petrosian chọn 6...Nbd7, một nhánh ít gặp nhưng chắc chắn của biến Najdorf.',
      '7': 'Tượng c4 nhắm vào e6 – điểm yếu truyền thống của Đen trong biến Najdorf.',
      '9': 'Đổi Tượng lấy Mã f6 để loại bỏ một quân phòng thủ, chuẩn bị nhập thành cánh Hậu và tấn công.',
      '10': 'Nhập thành cánh Hậu: hai Vua ở hai cánh, cuộc đua tấn công bắt đầu.',
      '12': 'Tốt f4 chuẩn bị e5 hoặc f5 – Trắng dồn lực lượng vào trung tâm và cánh Vua.',
      '15':
        '**15.g4!** Bỏ tốt để mở cột g: sau 15...Nxg4 16.Qg2 Nf6 17.Rg1, Hậu và Xe chồng trên cột g nhắm vào Vua đen.',
      '18': 'Tốt f5 tấn công e6, mở thêm đường cho Tượng b3 và chuẩn bị đưa Xe sang cột f.',
      '21': '**21.e5!** Phá vỡ trung tâm, mở đường cho Mã c3 nhảy lên e4.',
      '22...': 'Mã f6 bị Mã e4 tấn công nên lui về h5.',
      '23':
        '**23.Qg6!!** Hậu xâm nhập g6, tấn công Mã h5 và chuẩn bị Ng5 để dọa Qh7#. Kiểm tra bằng máy cho thấy 23...Nf4!, đuổi Hậu, là cách phòng thủ tốt hơn nhiều.',
      '23...': '**23...exd4?** Đen ăn Mã d4 nhưng bỏ mặc cánh Vua.',
      '24':
        '**24.Ng5!** Mã dọa Qh7#. Nếu 24...hxg5 thì 25.Qxh5+ Kg8 26.Qf7+ Kh8 27.Rf3, Xe sẵn sàng sang h3 và Đen phải trả Hậu; nếu 24...Qxg5 thì 25.Rxg5 và Trắng hơn rõ vật chất. Petrosian đầu hàng.',
    },
    keyMoments: ['15', '18', '21', '23', '24'],
    lessons: [
      'Khi hai Vua ở hai cánh, mở cột trước Vua đối phương (kể cả phải bỏ tốt) đáng giá hơn một tốt.',
      'Phá vỡ trung tâm (e5) đúng lúc sẽ mở đường cho các quân nhẹ tham gia tấn công.',
      'Một nước Hậu tạo ra hai đe dọa cùng lúc (Qg6!!) thường là nước khó chống đỡ nhất.',
      'Bên phòng thủ phải ưu tiên an toàn của Vua hơn việc ăn quân: 23...exd4 bỏ qua mối đe dọa chiếu hết.',
    ],
    tags: ['Tranh ngôi vô địch', 'Tấn công Vua'],
    source: 'https://www.chessgames.com/perl/chessgame?gid=1106864',
  },
];
