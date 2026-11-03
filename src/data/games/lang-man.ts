// Thời kỳ lãng mạn (trước 1880): các ván cờ kinh điển từ Greco, Philidor đến Morphy, Anderssen, Steinitz và Chigorin.
// Biên bản được đối chiếu với nguồn ghi trong trường `source` (và ít nhất một nguồn thứ hai khi có thể).
import type { ClassicGame } from '../types';

export const GAMES_LANG_MAN: ClassicGame[] = [
  // ------------------------------------------------------------------ 1623
  {
    id: 'greco-nn-1623',
    title: 'Greco – NN: Chiếu hết sau tám nước',
    white: 'Gioachino Greco',
    black: 'NN (đối thủ vô danh)',
    event: 'Ván cờ ghi trong bản thảo của Greco, London',
    year: 1623,
    result: '1-0',
    opening: 'Phòng thủ Owen (Owen\'s Defence)',
    difficulty: 1,
    context:
      'Gioachino Greco (khoảng 1600 – khoảng 1634) là kỳ thủ người Ý, một trong những người đầu tiên sống bằng nghề đánh cờ. Ông chu du qua Rome, Paris, London và chép lại hàng loạt ván cờ ngắn trong các bản thảo bán cho giới quý tộc. Nhiều nhà nghiên cứu tin rằng phần lớn các ván này do chính Greco dàn dựng để minh họa bẫy khai cuộc, nhưng chúng vẫn là những biên bản cờ theo luật hiện đại cổ xưa nhất còn lưu truyền và đã được dùng để dạy cờ suốt bốn thế kỷ.',
    summary:
      'Đen đưa Tượng lên b7 nhưng lại đẩy tốt f khi Vua còn ở e8, rồi tham ăn tốt g2. Greco lập tức đưa Hậu sang h5 chiếu qua đường chéo vừa bị mở. Khi Đen tưởng đã bắt được Hậu trắng, một nước chiếu phát hiện và nước Tượng 8.Bg6# kết thúc ván cờ: Vua đen bị chính các quân của mình vây chặt.',
    moves: '1.e4 b6 2.d4 Bb7 3.Bd3 f5 4.exf5 Bxg2 5.Qh5+ g6 6.fxg6 Nf6 7.gxh7+ Nxh5 8.Bg6#',
    annotations: {
      '1...':
        'Phòng thủ Owen: Đen chuẩn bị đưa Tượng lên b7 để tấn công tốt e4 từ xa. Khai cuộc này chơi được, nhưng nhường cho Trắng quyền chiếm trung tâm.',
      '2': 'Trắng dựng hai tốt ở trung tâm – đúng nguyên tắc khai cuộc cổ điển.',
      '3': 'Tượng d3 vừa phát triển vừa bảo vệ tốt e4 trước Tượng b7.',
      '3...':
        'Sai lầm có tính quyết định: tốt f rời f7 làm lộ đường chéo h5–e8 dẫn thẳng tới Vua đen, trong khi Đen mới phát triển một quân. Những nước như 3...Nf6 hay 3...e6 hợp lý hơn nhiều.',
      '4': 'Trắng ăn tốt và sẵn sàng để Đen bắt tốt g2: Greco đã nhìn thấy nước chiếu ở h5.',
      '4...':
        'Tượng ăn tốt g2 và nhắm vào Xe h1. Tham vật chất khi Vua còn hở là kiểu quyết định thường bị trừng phạt rất nặng.',
      '5': 'Hậu chiếu theo đường chéo h5–e8. Ô f7 đã trống, Hậu đen chặn ô d8, nên Đen chỉ còn một cách đỡ chiếu duy nhất là ...g6.',
      '6':
        'Tốt f5 ăn g6, loại bỏ quân đang đe dọa Hậu. Giờ tốt trắng ở g6 đứng chắn ngay trên đường chéo của Hậu: chỉ cần nó rời đi là Vua đen bị chiếu.',
      '6...':
        'Sai lầm chí mạng: Mã đuổi Hậu và Đen tưởng sẽ ăn được Hậu miễn phí. Cách phòng thủ duy nhất là 6...Bg7!, khi Đen vẫn đứng vững.',
      '7': 'Chiếu phát hiện! Tốt g6 ăn h7, mở đường chéo cho Hậu h5 chiếu Vua e8. Đen chỉ còn một nước hợp lệ: Mã f6 ăn Hậu.',
      '8':
        'Chiếu hết! Tượng g6 chiếu Vua qua ô f7. Vua e8 không còn ô nào: d8 có Hậu đen, f8 có Tượng đen, d7 và e7 có tốt đen. Không quân đen nào chặn được ô f7 hay bắt được Tượng g6.',
    },
    keyMoments: ['3...', '6...', '7', '8'],
    lessons: [
      'Đừng đẩy tốt f sớm khi Vua còn ở e8: đường chéo h5–e8 (hoặc h4–e1) sẽ mở ra cho Hậu đối phương.',
      'Tham ăn tốt khi chưa phát triển quân và Vua chưa an toàn là con đường ngắn nhất dẫn tới thất bại.',
      'Chiếu phát hiện rất mạnh vì quân di chuyển có thể làm việc khác (ăn quân, đe dọa) trong khi quân phía sau chiếu Vua.',
      'Trước khi ăn Hậu đối phương, hãy kiểm tra các nước chiếu của đối phương – một quân Hậu "bị bỏ ngỏ" thường là cái bẫy.',
    ],
    tags: ['Ván ngắn', 'Thí quân', 'Khai cuộc'],
    source: 'https://www.chessgames.com/perl/chessgame?gid=1243022',
  },

  // ------------------------------------------------------------------ 1790
  {
    id: 'smith-philidor-1790',
    title: 'Smith – Philidor: "Tốt là linh hồn của ván cờ"',
    white: 'Andrew Smith',
    black: 'François-André Danican Philidor',
    event: 'Buổi biểu diễn đấu ba bàn cùng lúc của Philidor, London',
    year: 1790,
    result: '0-1',
    opening: 'Khai cuộc Tượng – Phòng thủ Berlin (Bishop\'s Opening, Berlin Defence)',
    difficulty: 3,
    context:
      'François-André Danican Philidor (1726–1795) vừa là nhà soạn nhạc opera nổi tiếng của Pháp, vừa là kỳ thủ mạnh nhất thế giới suốt nửa sau thế kỷ 18. Cuốn "Phân tích ván cờ" (1749) với câu nói "Tốt là linh hồn của ván cờ" là cuốn sách đầu tiên coi cấu trúc tốt và kế hoạch là trọng tâm của cờ vua. Những năm cuối đời, ông thường biểu diễn đấu nhiều bàn cùng lúc ở London; ván này được chơi khi ông đã 63 tuổi.',
    summary:
      'Trắng đổi Tượng lấy Mã rồi đổi tiếp Tượng ô trắng, để lại cho Philidor khối tốt trung tâm vững chắc. Philidor không vội nhập thành: Vua đen đứng sau bức tường tốt, còn các tốt g, h tiến lên phá vỡ cánh Vua của Trắng. Khi Trắng sai lầm ở nước 24, cột h mở toang, và các Xe đen thí liên tiếp để kết thúc bằng một thế chiếu hết đẹp mắt có đủ Xe, Mã, Tượng và tốt cùng tham gia.',
    moves:
      '1.e4 e5 2.Bc4 Nf6 3.d3 c6 4.Bg5 h6 5.Bxf6 Qxf6 6.Nc3 b5 7.Bb3 a5 8.a3 Bc5 9.Nf3 d6 10.Qd2 Be6 11.Bxe6 fxe6 12.O-O g5 13.h3 Nd7 14.Nh2 h5 15.g3 Ke7 16.Kg2 d5 17.f3 Nf8 18.Ne2 Ng6 19.c3 Rag8 20.d4 Bb6 21.dxe5 Qxe5 22.Nd4 Kd7 23.Rae1 h4 24.Qf2 Bc7 25.Ne2 hxg3 26.Qxg3 Qxg3+ 27.Nxg3 Nf4+ 28.Kh1 Rxh3 29.Rg1 Rxh2+ 30.Kxh2 Rh8+ 31.Nh5 Rxh5+ 32.Kg3 Nh3+ 33.Kg4 Rh4#',
    annotations: {
      '2...': 'Phòng thủ Berlin trong khai cuộc Tượng: Mã f6 lập tức phản công tốt e4.',
      '3...':
        'Philidor chuẩn bị ...d5 để dựng trung tâm bằng tốt. Ý tưởng xuyên suốt của ông: tốt chiếm trung tâm trước, quân đi theo sau.',
      '5': 'Trắng đổi Tượng lấy Mã. Hậu đen ra f6 một cách tự nhiên, còn Trắng mất cặp Tượng mà không được gì rõ rệt.',
      '11...':
        'Bắt lại bằng tốt f! Philidor chấp nhận tốt chồng ở cột e để có thêm một tốt kiểm soát d5, f5 và cột f nửa mở. Với ông, cấu trúc tốt quan trọng hơn vẻ đẹp hình thức.',
      '12...':
        'Tốt g tiến lên ngay khi Trắng vừa nhập thành ngắn – tấn công cánh Vua đối phương bằng tốt. Vì Đen chưa nhập thành, việc đẩy tốt này không làm yếu Vua của chính mình.',
      '15...':
        'Vua đen sang e7, đứng sau bức tường tốt e6–e5–d6. Khi Hậu còn trên bàn đây là quyết định táo bạo, nhưng trung tâm khép kín giữ cho Vua an toàn, còn các Xe được tự do sang cánh Vua.',
      '16...': 'Hoàn thiện trung tâm: hai tốt d5 và e5 sát cánh nhau, khống chế các ô then chốt.',
      '19...': 'Xe a8 sang g8: cả hai Xe đen đều hướng về cánh Vua, chờ cột g hoặc cột h mở ra.',
      '24':
        '24.Qf2? là sai lầm quyết định. Máy tính cho thấy 24.f4! tạo phản công ở trung tâm và giữ được thế cân bằng; sau nước trong ván, Đen có thể mở cột h với lợi thế lớn.',
      '24...': 'Tượng chuyển về c7 nhắm vào ô g3. Mở cột h ngay bằng 24...hxg3 còn mạnh hơn nữa, nhưng kế hoạch vẫn là một.',
      '28...': 'Xe ăn tốt h3 và ghim chặt Mã h2 vào Vua h1. Mọi quân đen giờ đều dồn về cánh Vua.',
      '29...': 'Thí Xe lấy Mã: cột h mở hoàn toàn cho chiếc Xe thứ hai. Sau 30...Rh8+ Trắng chỉ còn một nước hợp lệ là 31.Nh5.',
      '33':
        '33.Kg4?? đi thẳng vào lưới chiếu hết. 33.Kg2 kéo dài ván cờ, nhưng Đen vẫn hơn hẳn vật chất và thắng dễ dàng.',
      '33...':
        'Chiếu hết: Xe h4 chiếu và được tốt g5 bảo vệ; Mã h3 giữ ô g5, Tượng c7 giữ g3 và f4, tốt e6 giữ f5, còn ô f3 bị chính tốt trắng chiếm.',
    },
    keyMoments: ['11...', '15...', '24', '29...', '33...'],
    lessons: [
      'Cấu trúc tốt quyết định kế hoạch: Philidor chấp nhận tốt chồng để đổi lấy trung tâm vững chắc và cột f nửa mở.',
      'Khi đối phương đã nhập thành mà Vua mình chưa, đẩy tốt vào cánh Vua đối phương là cách tấn công tự nhiên và an toàn.',
      'Vua có thể đứng ở trung tâm nếu trung tâm đóng kín và được che chắn bởi chuỗi tốt.',
      'Mở cột về phía Vua đối phương, dồn Xe lên cột đó rồi thí quân để phá lớp phòng thủ cuối cùng.',
    ],
    orientation: 'black',
    tags: ['Chiến lược', 'Tấn công Vua'],
    source: 'https://www.chessgames.com/perl/chessgame?gid=1257921',
  },

  // ------------------------------------------------------------------ 1827
  {
    id: 'evans-mcdonnell-1827',
    title: 'Evans – McDonnell: Ván cờ khai sinh Gambit Evans',
    white: 'William Davies Evans',
    black: 'Alexander McDonnell',
    event: 'Ván giao hữu, London',
    year: 1827,
    result: '1-0',
    opening: 'Gambit Evans (Evans Gambit)',
    difficulty: 2,
    context:
      'Thuyền trưởng William Davies Evans (1790–1872), người xứ Wales, từng phục vụ trong hải quân rồi chỉ huy tàu thư của bưu chính Anh; ông còn là người phát minh hệ thống đèn ba màu giúp tàu thuyền tránh va chạm ban đêm. Trong một lần nghỉ phép ở London (các tài liệu ghi năm 1826 hoặc 1827), ông dùng nước thí tốt b4 để đánh bại Alexander McDonnell, một trong những kỳ thủ mạnh nhất nước Anh. Chỉ ít năm sau, Gambit Evans trở thành vũ khí ưa thích của cả một thế hệ, từ La Bourdonnais đến Anderssen và Morphy.',
    summary:
      'Trong ván cờ đầu tiên của Gambit Evans, Trắng thí tốt b4 để có trung tâm và đường chéo mở cho Tượng. Đen phòng thủ thiếu chính xác: Mã lùi về d8, Tượng chạy sang h5, còn Vua bị Tượng a3 giữ lại ở trung tâm. Evans đổi Xe lấy Mã để mở cột d, rồi khi McDonnell đưa Hậu đi phản công, Trắng chiếu liên tục và kết thúc bằng 20.Bd6#.',
    moves:
      '1.e4 e5 2.Nf3 Nc6 3.Bc4 Bc5 4.O-O d6 5.b4 Bxb4 6.c3 Ba5 7.d4 Bg4 8.Qb3 Qd7 9.Ng5 Nd8 10.dxe5 dxe5 11.Ba3 Nh6 12.f3 Bb6+ 13.Kh1 Bh5 14.Rd1 Qc8 15.Rxd8+ Qxd8 16.Nxf7 Qh4 17.Qb5+ c6 18.Qxe5+ Kd7 19.Qe6+ Kc7 20.Bd6#',
    annotations: {
      '4': 'Trắng nhập thành trước, Đen đáp lại bằng 4...d6 củng cố e5. Chỉ đến lúc này thuyền trưởng Evans mới tung ra ý tưởng thí tốt của mình.',
      '5': 'Gambit Evans ra đời! Tốt b4 bị bỏ đi để Trắng đi c3 và d4 với nhịp, chiếm trung tâm và mở đường chéo a3–f8 cho Tượng c1.',
      '7...': 'Thay vì ăn tốt d4, Đen ghim Mã f3 vào Hậu d1.',
      '8': 'Hậu thoát khỏi thế ghim và cùng Tượng c4 nhắm vào điểm yếu f7 – mục tiêu kinh điển trong ván cờ Ý.',
      '9...':
        'Mã lùi về d8 để giữ f7, nhưng đội hình Đen trở nên rối rắm: Hậu d7 và Mã d8 chắn đường nhau, Vua đen vẫn kẹt ở trung tâm.',
      '11': 'Tượng chiếm đường chéo a3–f8 và ngăn Vua đen nhập thành ngắn – một mô-típ quen thuộc của Gambit Evans.',
      '13...':
        '13...Bh5? đưa Tượng ra xa chiến trường. Máy tính cho thấy 13...f6 hoặc 13...Be6, chủ động đổi bớt quân tấn công, giúp Đen phòng thủ tốt hơn nhiều.',
      '14': 'Xe chiếm cột d vừa mở và đuổi Hậu d7 với nhịp.',
      '15':
        'Trắng đổi Xe lấy Mã để phá hàng phòng thủ. Máy tính chỉ ra 15.Qb5+! còn mạnh hơn nhiều: sau 15...Nc6 16.Bd5 quân Đen gần như tê liệt.',
      '16...':
        '16...Qh4?? thua ngay: Hậu rời vị trí phòng thủ để phản công vô ích. Sau 16...Qf6 thế cờ vẫn còn nhiều đấu tranh.',
      '17': 'Hậu chiếu ở b5 mở màn đòn kết thúc. (17.Bb5+ còn chiếu hết nhanh hơn một nước.)',
      '20':
        'Chiếu hết! Tượng d6 chiếu Vua c7 và được Hậu e6 bảo vệ; Hậu giữ các ô d7, c8, Mã f7 giữ ô d8, còn b6, b7, c6 bị chính quân Đen chiếm.',
    },
    keyMoments: ['5', '11', '15', '16...', '20'],
    lessons: [
      'Gambit là trao đổi vật chất lấy thời gian: một tốt đổi lấy trung tâm và các đường chéo mở cho Tượng.',
      'Điểm f7 là điểm yếu nhất khi Vua đen chưa nhập thành – Hậu và Tượng cùng nhắm vào đó rất nguy hiểm.',
      'Tượng trên đường chéo a3–f8 có thể giữ Vua đối phương ở trung tâm bằng cách ngăn nhập thành.',
      'Khi đang bị tấn công, đưa Hậu đi xa để phản công thường là tự sát; ưu tiên hàng đầu là đưa quân về phòng thủ.',
    ],
    tags: ['Khai cuộc', 'Tấn công Vua'],
    source: 'https://www.chessgames.com/perl/chessgame?gid=1227672',
  },

  // ------------------------------------------------------------------ 1834
  {
    id: 'mcdonnell-la-bourdonnais-1834',
    title: 'McDonnell – La Bourdonnais: Đoàn tốt bất khả cản (trận 4, ván 16)',
    white: 'Alexander McDonnell',
    black: 'Louis-Charles Mahé de La Bourdonnais',
    event: 'Loạt trận La Bourdonnais – McDonnell (trận thứ tư), London',
    year: 1834,
    result: '0-1',
    opening: 'Phòng thủ Sicilian (Sicilian Defence)',
    difficulty: 3,
    context:
      'Từ tháng 6 đến tháng 10 năm 1834, nhà vô địch Pháp Louis-Charles Mahé de La Bourdonnais và kỳ thủ mạnh nhất nước Anh Alexander McDonnell đấu sáu trận liên tiếp, tổng cộng 85 ván, tại câu lạc bộ cờ Westminster ở London. Đây được xem như cuộc tranh ngôi vô địch thế giới không chính thức đầu tiên, và La Bourdonnais giành phần thắng. Biên bản các ván đấu được ghi chép và xuất bản, trở thành tư liệu học cờ quý giá của cả thế kỷ 19.',
    summary:
      'Từ một phương án Sicilian đi trước thời đại, La Bourdonnais có được tốt thông ở d4. Ở nước 20, ông thí chất lượng để biến các tốt e, f thành một khối tốt liên kết. Trong khi Trắng mải ăn Xe và đẩy tốt c của mình, ba tốt đen lần lượt lăn xuống d2, e2, f2, và McDonnell phải đầu hàng trong một thế cờ đã trở thành biểu tượng về sức mạnh của tốt.',
    moves:
      '1.e4 c5 2.Nf3 Nc6 3.d4 cxd4 4.Nxd4 e5 5.Nxc6 bxc6 6.Bc4 Nf6 7.Bg5 Be7 8.Qe2 d5 9.Bxf6 Bxf6 10.Bb3 O-O 11.O-O a5 12.exd5 cxd5 13.Rd1 d4 14.c4 Qb6 15.Bc2 Bb7 16.Nd2 Rae8 17.Ne4 Bd8 18.c5 Qc6 19.f3 Be7 20.Rac1 f5 21.Qc4+ Kh8 22.Ba4 Qh6 23.Bxe8 fxe4 24.c6 exf3 25.Rc2 Qe3+ 26.Kh1 Bc8 27.Bd7 f2 28.Rf1 d3 29.Rc3 Bxd7 30.cxd7 e4 31.Qc8 Bd8 32.Qc4 Qe1 33.Rc1 d2 34.Qc5 Rg8 35.Rd1 e3 36.Qc3 Qxd1 37.Rxd1 e2',
    annotations: {
      '4...':
        '4...e5 – một nước rất hiện đại: Đen đuổi Mã khỏi trung tâm, chấp nhận ô d5 yếu để giành không gian. Ý tưởng này về sau xuất hiện trong nhiều phương án Sicilian.',
      '8...': 'Đòn phá ...d5: Đen dựng hai tốt trung tâm d5–e5 và giải phóng thế trận.',
      '9': 'Trắng đổi Tượng lấy Mã để giảm áp lực lên e4, nhưng trao cho Đen cặp Tượng.',
      '14':
        '14.c4 khiến tốt d4 trở thành tốt thông được tốt e5 bảo vệ. Từ đây kế hoạch của La Bourdonnais rất rõ ràng: đẩy khối tốt trung tâm.',
      '16...': 'Xe vào e8 chuẩn bị ...f5 và ...e4: mọi quân đen đều phục vụ cho đoàn tốt.',
      '18': 'Trắng cũng có vũ khí riêng: tốt c thông, có thể tiến lên c6 và xa hơn nữa.',
      '20...':
        '20...f5! – thí chất lượng: Đen để Trắng ăn Xe e8, đổi lại loại bỏ Mã e4 và giải phóng các tốt e, f. La Bourdonnais đánh giá rằng tốt liên kết ở trung tâm đáng giá hơn một Xe.',
      '23...': 'Tốt f ăn Mã e4. Đen thiếu chất lượng, nhưng giờ có ba tốt d4, e4, e5 cùng hướng về hàng 1.',
      '24': 'Trắng đẩy tốt c lên c6 tấn công Tượng b7: cuộc chạy đua tốt bắt đầu.',
      '30...': 'Ba tốt thông d3, e4, f2 phối hợp nhịp nhàng, có Hậu e3 yểm trợ phía trước. Các quân trắng không thể chặn hết chúng.',
      '34...':
        '34...Rg8! – một nước yên lặng tuyệt đẹp: Xe tránh khỏi đòn tấn công của Hậu c5 mà vẫn giữ nguyên mọi đe dọa phong cấp. Máy tính xác nhận đây là nước mạnh nhất.',
      '36...': 'Thí Hậu! Sau 37.Rxd1 e2, các tốt đen ở d2, e2, f2 sẽ phong Hậu – Trắng không có cách nào ngăn cản.',
      '37...':
        'Thế cờ cuối cùng nổi tiếng: ba tốt đen đứng sát nhau ở hàng 2, còn Xe trắng một mình không thể cản. McDonnell đầu hàng.',
    },
    keyMoments: ['14', '20...', '34...', '37...'],
    lessons: [
      'Tốt thông được bảo vệ ở trung tâm là một vũ khí chiến lược lâu dài.',
      'Các tốt thông liên kết có thể mạnh hơn cả một Xe – hãy đếm số bước tới hàng phong cấp chứ đừng chỉ đếm quân.',
      'Quân nặng nên đứng ngay trước hoặc cạnh đoàn tốt để yểm trợ chúng tiến lên.',
      'Một nước yên lặng giữ nguyên mọi đe dọa (như 34...Rg8) thường hiệu quả hơn những nước chiếu vội vàng.',
    ],
    orientation: 'black',
    tags: ['Tranh ngôi vô địch', 'Chiến lược', 'Thí quân'],
    source: 'https://www.chessgames.com/perl/chessgame?gid=1001165',
  },

  // ------------------------------------------------------------------ 1843
  {
    id: 'saint-amant-staunton-1843',
    title: 'Saint-Amant – Staunton: Trận tranh ngôi không chính thức Paris 1843 (ván 5)',
    white: 'Pierre Charles Fournier de Saint-Amant',
    black: 'Howard Staunton',
    event: 'Trận đấu Saint-Amant – Staunton, Paris',
    year: 1843,
    result: '0-1',
    opening: 'Phòng thủ Sicilian – biến 2.f4 (Sicilian Defence, 2.f4)',
    difficulty: 4,
    context:
      'Năm 1843, Saint-Amant – biên tập viên tạp chí cờ Le Palamède và là kỳ thủ hàng đầu nước Pháp – thắng Staunton 3½–2½ trong một trận đấu ngắn ở London. Cuối năm đó, hai người tái đấu ở Paris và Staunton thắng thuyết phục 13–8 (11 thắng, 6 thua, 4 hòa). Trận đấu thường được xem là cuộc tranh ngôi vô địch thế giới không chính thức; nó đưa Staunton lên vị trí số một cho tới khi ông thua Anderssen năm 1851. Bộ quân cờ tiêu chuẩn ngày nay cũng mang tên Staunton.',
    summary:
      'Staunton cầm quân Đen đáp lại 2.f4 bằng một hệ thống giống Phòng thủ Pháp. Ông giữ Vua ở trung tâm rồi dùng tốt g phá vỡ chuỗi tốt trắng, mở cột g và cột h. Saint-Amant phản công bằng tốt thông d tiến đến d6, nhưng một nước Hậu thiếu chính xác ở nước 36 đã để hai tốt e, f của Đen tràn xuống, và nước Xe tinh tế 38...Rc8 kết thúc ván cờ.',
    moves:
      '1.e4 c5 2.f4 e6 3.Nf3 Nc6 4.c3 d5 5.e5 Qb6 6.Bd3 Bd7 7.Bc2 Rc8 8.O-O Nh6 9.h3 Be7 10.Kh2 f5 11.a3 a5 12.a4 Nf7 13.d4 h6 14.Re1 g6 15.Na3 cxd4 16.Nxd4 Nxd4 17.cxd4 g5 18.Nb5 Bxb5 19.axb5 Rc4 20.Bd3 Rc8 21.Be2 gxf4 22.Rf1 Ng5 23.Bxf4 Ne4 24.Rc1 Rxc1 25.Qxc1 Kd7 26.Qe3 Bg5 27.Bd3 Rg8 28.Bxe4 dxe4 29.Bxg5 hxg5 30.Qb3 g4 31.Rd1 gxh3 32.Qxh3 Qd8 33.d5 Kc8 34.Qc3+ Kb8 35.d6 f4 36.Qc5 e3 37.Qc2 Qh4+ 38.Kg1 Rc8 39.Qe2 Rh8',
    annotations: {
      '2...': '2...e6 rồi ...d5: Staunton dựng thế cờ giống Phòng thủ Pháp, nhắm vào chuỗi tốt trắng.',
      '5': 'Trắng đẩy tốt lên e5 khóa trung tâm. Từ đây hai bên tìm cơ hội ở hai cánh.',
      '5...': 'Hậu b6 gây áp lực lên d4 và b2 – ý tưởng điển hình trong các thế tốt kiểu Phòng thủ Pháp.',
      '10...': 'Đen chặn tốt f trắng bằng ...f5, khóa cánh Vua để chuẩn bị đẩy tốt g về sau.',
      '17...':
        'Tốt g lao lên g5: Staunton đánh vào chuỗi tốt f4–e5 từ bên cạnh. Vì Đen chưa nhập thành, ông có thể mạnh dạn dùng tốt cánh Vua.',
      '21...': 'Đen phá tốt f4 và mở cột g cho Xe.',
      '25...': 'Vua đen đi về phía cánh Hậu (d7, rồi c8, b8) – nơi an toàn hơn khi cột g và cột h sắp mở.',
      '30...': 'Tốt g tiếp tục tiến, phá vỡ lớp tốt che chắn Vua trắng.',
      '33': 'Trắng phản công bằng tốt thông d: tốt tiến lên d5 rồi d6 là mối đe dọa phong cấp thật sự.',
      '36':
        '36.Qc5? là sai lầm: Hậu rời đường chéo phòng thủ. Máy tính cho thấy giữ thế cờ bằng 36.Rd4 hoặc 36.Rc1 giúp Trắng chống đỡ tốt hơn nhiều.',
      '36...': 'Tốt e tiến lên e3, nối với tốt f4: hai tốt thông liên kết đã ở rất gần hàng 1.',
      '38...':
        'Đòn quyết định: Xe tấn công Hậu c2. Nếu 39.d7 thì 39...Rxc2 40.d8=Q+ Qxd8 41.Rxd8+ Kc7, Đen hơn hẳn vật chất với tốt e sắp phong cấp.',
      '39...':
        'Xe về h8 đe dọa ...Qh1#. Trắng không có cách phòng thủ thỏa đáng (chẳng hạn 40.d7 Qh1#), nên Saint-Amant đầu hàng.',
    },
    keyMoments: ['17...', '33', '36', '38...', '39...'],
    lessons: [
      'Trong cấu trúc tốt khóa kiểu Phòng thủ Pháp, hãy tấn công chuỗi tốt đối phương ở gốc hoặc từ bên cạnh.',
      'Khi trung tâm đóng, Vua có thể đi sang cánh ít nguy hiểm thay vì nhập thành theo thói quen.',
      'Tốt thông của đối phương phải được chặn sớm, còn tốt thông của mình cần quân nặng yểm trợ.',
      'Tấn công quân đối phương với nhịp (như 38...Rc8) có thể làm lệch quân phòng thủ then chốt.',
    ],
    orientation: 'black',
    tags: ['Tranh ngôi vô địch', 'Chiến lược', 'Tấn công Vua'],
    source: 'https://www.chessgames.com/perl/chessgame?gid=1001194',
  },

  // ------------------------------------------------------------------ 1844
  {
    id: 'hoffmann-petrov-1844',
    title: 'Hoffmann – Petrov: "Ván cờ bất tử của Petrov"',
    white: 'Alexander Hoffmann',
    black: 'Alexander Petrov',
    event: 'Ván đấu tại Warsaw',
    year: 1844,
    result: '0-1',
    opening: 'Ván cờ Ý – Giuoco Piano (Italian Game)',
    difficulty: 3,
    context:
      'Alexander Petrov (1794–1867) là kỳ thủ vĩ đại đầu tiên của nước Nga, giữ vị trí mạnh nhất nước Nga suốt nửa thế kỷ và là tác giả cuốn sách cờ đầu tiên bằng tiếng Nga (1824). Khai cuộc 1.e4 e5 2.Nf3 Nf6 mang tên ông – Phòng thủ Petrov. Từ năm 1840 ông sống ở Warsaw (khi đó thuộc Đế quốc Nga) và thường đấu với các kỳ thủ mạnh địa phương như Alexander Hoffmann; ván cờ năm 1844 này được hậu thế gọi là "Ván cờ bất tử của Petrov".',
    summary:
      'Trắng chơi khai cuộc Ý sắc bén nhưng thiếu thận trọng, và Petrov đáp trả bằng đòn thí Mã ở f2 để kéo Vua trắng ra khỏi chỗ ẩn nấp. Khi Mã trắng ăn tốt f7 và tấn công Hậu, Petrov thản nhiên nhập thành, bỏ mặc Hậu cho đối phương. Với Xe trên cột f, hai Tượng và Mã, Đen săn đuổi Vua trắng qua g3, h3, g4, g5 rồi kết thúc bằng một nước chiếu kép ở h3.',
    moves:
      '1.e4 e5 2.Nf3 Nc6 3.Bc4 Bc5 4.c3 Nf6 5.d4 exd4 6.e5 Ne4 7.Bd5 Nxf2 8.Kxf2 dxc3+ 9.Kg3 cxb2 10.Bxb2 Ne7 11.Ng5 Nxd5 12.Nxf7 O-O 13.Nxd8 Bf2+ 14.Kh3 d6+ 15.e6 Nf4+ 16.Kg4 Nxe6 17.Nxe6 Bxe6+ 18.Kg5 Rf5+ 19.Kg4 h5+ 20.Kh3 Rf3#',
    annotations: {
      '4': 'Tốt c3 chuẩn bị d4 – thế trận Giuoco Piano cổ điển.',
      '6': 'Thay vì bắt lại tốt d4, Trắng đẩy e5 đuổi Mã f6 – một lựa chọn sắc nét.',
      '7...':
        'Thí Mã ở f2! Petrov kéo Vua trắng ra khỏi vị trí ban đầu; sau loạt ăn quân tiếp theo, Đen đổi một Mã lấy hai tốt cùng thế tấn công.',
      '9': 'Vua trắng tiến lên g3 để tránh chiếu; 9.Kf1 thận trọng hơn và giữ Vua gần góc an toàn.',
      '11':
        '11.Ng5 tham công, nhắm vào f7. Một nước bình tĩnh như 11.Be4 giữ thế cờ ổn định hơn cho Trắng.',
      '12': 'Mã ăn f7, tấn công cùng lúc Hậu d8 và Xe h8.',
      '12...':
        'Nhập thành thí Hậu! Thay vì cứu Hậu, Petrov đưa Xe vào cột f và Vua vào nơi an toàn. Kiểm tra bằng máy cho thấy sau nước này Trắng rất khó phòng thủ: ăn Hậu thì Vua bị săn, không ăn thì Đen vẫn có thế tấn công áp đảo.',
      '13...': 'Tượng chiếu ở f2, Vua trắng bị đẩy vào vùng nguy hiểm. Nếu 14.Kg4 thì Đen chiếu hết rất nhanh.',
      '14...':
        'Chiếu phát hiện: tốt d rời d7, mở đường chéo c8–h3 cho Tượng c8 chiếu Vua; đồng thời tốt d6 tấn công tốt e5.',
      '15': 'Gần như bắt buộc: chặn chiếu bằng tốt. Chẳng hạn 15.g4 thì 15...Nf4# chiếu hết ngay.',
      '17':
        '17.Nxe6 giúp Đen kết thúc nhanh, nhưng ở thời điểm này Trắng đã không còn đường cứu – máy tính cho thấy mọi nước khác cũng đều thua.',
      '19...': 'Tốt h chiếu, khép chặt lưới: Vua trắng chỉ còn ô h3.',
      '20...':
        'Chiếu kép và chiếu hết! Xe rời f5 sang f3: Xe chiếu theo hàng ngang, đồng thời mở đường chéo cho Tượng e6 cùng chiếu. Với chiếu kép, ăn Xe bằng tốt g2 cũng vô ích; ô g4 bị Tượng và tốt h5 khống chế, h4 và g3 bị Tượng f2 kiểm soát.',
    },
    keyMoments: ['7...', '12...', '14...', '20...'],
    lessons: [
      'Thí quân ở f2/f7 để kéo Vua ra khỏi vị trí an toàn là mô-típ kinh điển của thời kỳ lãng mạn.',
      'Đôi khi điều quan trọng không phải là cứu Hậu mà là đưa thêm quân vào trận – nhập thành ở đây vừa bảo vệ Vua vừa kích hoạt Xe.',
      'Vua bị kéo ra giữa bàn cờ là mục tiêu cho mọi quân: chiếu phát hiện, chiếu kép đều xuất hiện tự nhiên.',
      'Khi đối phương thí quân, hãy đếm xem bao nhiêu quân của họ đang nhắm vào Vua mình trước khi tham ăn.',
    ],
    orientation: 'black',
    tags: ['Thí quân', 'Tấn công Vua', 'Ván ngắn'],
    source: 'https://www.chessgames.com/perl/chessgame?gid=1257910',
  },

  // ------------------------------------------------------------------ 1851
  {
    id: 'anderssen-staunton-1851',
    title: 'Anderssen – Staunton: Bán kết giải quốc tế đầu tiên (London 1851)',
    white: 'Adolf Anderssen',
    black: 'Howard Staunton',
    event: 'Giải đấu quốc tế London 1851, bán kết (ván 1)',
    year: 1851,
    result: '1-0',
    opening: 'Phòng thủ Sicilian (Sicilian Defence)',
    difficulty: 3,
    context:
      'Năm 1851, nhân dịp Triển lãm Thế giới ở London, Howard Staunton tổ chức giải đấu cờ quốc tế đầu tiên trong lịch sử với 16 kỳ thủ, thi đấu theo thể thức loại trực tiếp. Adolf Anderssen, thầy giáo dạy toán người Đức, lần lượt loại Kieseritzky và Szén rồi gặp chính Staunton – người được xem là mạnh nhất thế giới – ở bán kết và thắng 4–1. Sau đó Anderssen thắng Wyvill ở chung kết và được công nhận là kỳ thủ số một châu Âu.',
    summary:
      'Anderssen dựng một thế tấn công điển hình: tốt e5 chiếm không gian, Hậu ở h5, Tượng d3 và các Xe nâng lên hàng 3. Staunton phản công ở cánh Hậu, ăn tốt a2 và thí chất lượng để loại bỏ Tượng d3. Thế cờ đang cân bằng thì nước 24...Ne7? cho phép tốt g lao vào h6, h7; chỉ ít nước sau Vua đen bị vây chặt ở góc h8 và Staunton phải đầu hàng.',
    moves:
      '1.e4 c5 2.d4 cxd4 3.Nf3 e6 4.Nxd4 Bc5 5.Nc3 a6 6.Be3 Ba7 7.Bd3 Ne7 8.O-O O-O 9.Qh5 Ng6 10.e5 Qc7 11.Rae1 b5 12.f4 Bb7 13.Ne4 Bxe4 14.Bxe4 Nc6 15.Nxc6 dxc6 16.g4 Rad8 17.Kh1 c5 18.Rf3 Qa5 19.Ref1 Qa4 20.Bd3 Qxa2 21.Rh3 h6 22.g5 Rxd3 23.cxd3 Qd5+ 24.Rff3 Ne7 25.gxh6 g6 26.h7+ Kh8 27.Qg5 Nf5 28.Qf6+ Ng7 29.f5 Qb3 30.Bh6 Qd1+ 31.Kg2 Qe2+ 32.Rf2 Qg4+ 33.Rg3',
    annotations: {
      '7': 'Tượng d3 nhắm vào cánh Vua đen – Anderssen chuẩn bị tấn công ngay khi Đen nhập thành.',
      '9': 'Hậu xuất kích sang h5, áp sát Vua đen.',
      '10': 'Tốt e5 lấy đi ô f6 của quân Đen và chuẩn bị cho đợt tiến f4–f5.',
      '12': 'Tốt f4 củng cố e5 và chuẩn bị phá vỡ cánh Vua đen bằng f5.',
      '16': 'Anderssen đẩy tiếp tốt g, chuẩn bị g5 hoặc f5 để mở đường tới Vua đen.',
      '18': 'Xe "nâng" lên f3 rồi sang h3 – mô-típ quen thuộc để đưa thêm quân nặng sang cánh Vua.',
      '20...': 'Staunton ăn tốt a2, đưa Hậu đi xa khỏi cánh Vua – một rủi ro lớn.',
      '22...':
        'Thí chất lượng: Đen trả Xe để loại bỏ Tượng d3 nguy hiểm. Máy tính đánh giá đây là lựa chọn tốt nhất của Đen ở thời điểm này.',
      '24...':
        '24...Ne7? là sai lầm quyết định. Đen nên ăn tốt bằng 24...Qxd3!, khi thế cờ gần như cân bằng. Sau nước trong ván, tốt g ăn h6 và mở toang cánh Vua.',
      '29': '29.f5! mở thêm đường tấn công và dọn chỗ cho Tượng e3 sang h6.',
      '30': 'Tượng h6 tấn công Mã g7 – quân phòng thủ cuối cùng. Đen chỉ còn những nước chiếu vô vọng.',
      '33':
        'Hết nước chiếu. Trắng đe dọa Qxg7# và máy tính xác nhận Đen không thể tránh khỏi chiếu hết. Staunton đầu hàng.',
    },
    keyMoments: ['18', '22...', '24...', '29', '33'],
    lessons: [
      'Tốt e5 cắm sâu tước đi ô f6 – chỗ đứng tự nhiên của Mã phòng thủ – là nền tảng cho tấn công cánh Vua.',
      'Nâng Xe qua hàng 3 giúp đưa thêm quân nặng sang cánh Vua rất nhanh.',
      'Ăn tốt ở cánh xa (Qxa2) khi Vua mình đang bị đe dọa là canh bạc nguy hiểm.',
      'Trong thế bị tấn công, một nước phòng thủ sai (24...Ne7?) có thể lật ngược cán cân ngay lập tức.',
    ],
    tags: ['Tấn công Vua', 'Thí quân'],
    source: 'https://www.chessgames.com/perl/chessgame?gid=1001409',
  },

  // ------------------------------------------------------------------ 1857
  {
    id: 'paulsen-morphy-1857',
    title: 'Paulsen – Morphy: Cú thí Hậu 17...Qxf3!!',
    white: 'Louis Paulsen',
    black: 'Paul Morphy',
    event: 'Đại hội cờ Hoa Kỳ lần 1, New York (chung kết, ván 6)',
    year: 1857,
    result: '0-1',
    opening: 'Ván cờ Bốn Mã – biến Tây Ban Nha (Four Knights Game, Spanish Variation)',
    difficulty: 3,
    context:
      'Đại hội cờ Hoa Kỳ lần thứ nhất diễn ra tại New York mùa thu năm 1857 theo thể thức loại trực tiếp. Paul Morphy, chàng trai 20 tuổi đến từ New Orleans, vượt qua các đối thủ và gặp Louis Paulsen – bậc thầy cờ mù người Đức – ở trận chung kết. Morphy thắng trận chung kết áp đảo (5 thắng, 2 hòa, 1 thua), và ván thứ sáu này chứa đựng đòn thí Hậu nổi tiếng nhất của ông.',
    summary:
      'Morphy hy sinh tốt e5 để phát triển nhanh, rồi đưa Hậu xâm nhập ô d3, trói chân toàn bộ cánh Hậu của Trắng. Khi Hậu trắng đi lạc sang a6, Morphy thí Hậu ăn Tượng f3 – quân bảo vệ quan trọng nhất của Vua trắng. Các Xe và Tượng đen tràn qua cột g vừa mở, buộc Paulsen phải trả lại Hậu và đầu hàng ít nước sau đó.',
    moves:
      '1.e4 e5 2.Nf3 Nc6 3.Nc3 Nf6 4.Bb5 Bc5 5.O-O O-O 6.Nxe5 Re8 7.Nxc6 dxc6 8.Bc4 b5 9.Be2 Nxe4 10.Nxe4 Rxe4 11.Bf3 Re6 12.c3 Qd3 13.b4 Bb6 14.a4 bxa4 15.Qxa4 Bd7 16.Ra2 Rae8 17.Qa6 Qxf3 18.gxf3 Rg6+ 19.Kh1 Bh3 20.Rd1 Bg2+ 21.Kg1 Bxf3+ 22.Kf1 Bg2+ 23.Kg1 Bh3+ 24.Kh1 Bxf2 25.Qf1 Bxf1 26.Rxf1 Re2 27.Ra1 Rh6 28.d4 Be3',
    annotations: {
      '4...': 'Morphy phát triển Tượng ra vị trí tích cực, sẵn sàng hy sinh tốt e5 để đổi lấy tốc độ.',
      '6...':
        '6...Re8! Nếu 6...Nxe5 thì 7.d4 – đòn chĩa đôi quen thuộc: tốt d4 tấn công cả Tượng c5 lẫn Mã e5 và Trắng lấy lại quân. Morphy thay vào đó tấn công ngay tốt e4.',
      '9...': 'Đen lấy lại tốt, và Xe e4 trở nên rất hoạt động.',
      '12...':
        'Hậu xâm nhập ô d3! Từ đây Hậu đen chặn đứng tốt d2, khiến Tượng c1 và Xe a1 của Trắng gần như không thể tham chiến.',
      '16...': 'Xe thứ hai vào e8: mọi quân đen đã sẵn sàng, trong khi Hậu trắng đang ở tận cánh Hậu.',
      '17': 'Hậu trắng đi tới a6, cách rất xa Vua của mình – đúng lúc Morphy tung đòn.',
      '17...':
        'Thí Hậu!! Hậu đen ăn Tượng f3 – quân bảo vệ quan trọng nhất của Vua trắng. Nếu Trắng không bắt Hậu, Đen vẫn tấn công áp đảo; còn nếu bắt, cột g mở ra cho các Xe và Tượng đen.',
      '19...': 'Tượng h3 đe dọa ...Bg2+ rồi chiếu phát hiện bằng Xe g6. Trắng phải chạy đua với thời gian.',
      '20':
        '20.Rd1? thua nhanh. Cách phòng thủ tốt nhất là 20.Qd3, nhưng sau 20...f5! Đen vẫn giữ thế tấn công rất mạnh.',
      '21...': 'Tượng ăn tốt f3 kèm chiếu phát hiện từ Xe g6.',
      '22...':
        'Morphy chọn con đường chắc chắn. Nước yên lặng 22...Rg2! còn kết thúc nhanh hơn – máy tính tìm ra chiếu hết sau bốn nước.',
      '24...': 'Tượng ăn tốt f2 và đe dọa ...Bg2#. Trắng buộc phải trả lại Hậu bằng 25.Qf1.',
      '28...': 'Đen hơn chất, hai Xe chiếm hàng 2 và hàng 6; Paulsen đầu hàng.',
    },
    keyMoments: ['12...', '17...', '20', '22...'],
    lessons: [
      'Đổi vật chất lấy thế chủ động chỉ đáng khi quân mình hoạt động hơn hẳn – như Hậu đen ở d3 trói chân cả cánh Hậu của Trắng.',
      'Quân phòng thủ quan trọng nhất của Vua (ở đây là Tượng f3) có khi xứng đáng để thí cả Hậu nhằm loại bỏ.',
      'Mở cột g về phía Vua đối phương rồi phối hợp Xe với Tượng sẽ tạo ra các đòn chiếu phát hiện.',
      'Hậu đi lạc ở cánh xa là món quà cho đối thủ đang tấn công Vua.',
    ],
    orientation: 'black',
    tags: ['Thí quân', 'Tấn công Vua'],
    source: 'https://www.chessgames.com/perl/chessgame?gid=1242884',
  },

  // ------------------------------------------------------------------ 1858
  {
    id: 'bird-morphy-1858',
    title: 'Bird – Morphy: Thí Xe ở f2 và cuộc đổ bộ của Hậu',
    white: 'Henry Edward Bird',
    black: 'Paul Morphy',
    event: 'Ván giao hữu, London',
    year: 1858,
    result: '0-1',
    opening: 'Phòng thủ Philidor – Phản gambit Philidor (Philidor Defence, Philidor Countergambit)',
    difficulty: 4,
    context:
      'Năm 1858, Morphy sang châu Âu thách đấu các danh thủ của Cựu lục địa. Ở London, ngoài các trận đấu chính thức, ông chơi nhiều ván giao hữu với Henry Edward Bird, khi ấy 28 tuổi – một kỳ thủ nghiệp dư giàu tính tấn công mà tên tuổi về sau gắn với khai cuộc Bird (1.f4). Ván cờ được đăng trên báo The Field và đến nay vẫn được các danh thủ, trong đó có Kasparov, mang ra phân tích.',
    summary:
      'Bird tấn công vội vàng bằng 11.g4 và mất một tốt. Khi Trắng nhập thành dài, Morphy thí Xe ở f2 để phá vỡ sự liên lạc giữa các quân trắng, rồi đưa Hậu sang a3 trong một nước đi nổi tiếng. Sau sai lầm 22.Kb2, Đen thí tiếp Tượng và Xe, tốt e hy sinh để mở đường chéo cho Tượng c8, và Hậu đen chiếu liên tục cho đến khi giành được Xe h1.',
    moves:
      '1.e4 e5 2.Nf3 d6 3.d4 f5 4.Nc3 fxe4 5.Nxe4 d5 6.Ng3 e4 7.Ne5 Nf6 8.Bg5 Bd6 9.Nh5 O-O 10.Qd2 Qe8 11.g4 Nxg4 12.Nxg4 Qxh5 13.Ne5 Nc6 14.Be2 Qh3 15.Nxc6 bxc6 16.Be3 Rb8 17.O-O-O Rxf2 18.Bxf2 Qa3 19.c3 Qxa2 20.b4 Qa1+ 21.Kc2 Qa4+ 22.Kb2 Bxb4 23.cxb4 Rxb4+ 24.Qxb4 Qxb4+ 25.Kc2 e3 26.Bxe3 Bf5+ 27.Rd3 Qc4+ 28.Kd2 Qa2+ 29.Kd1 Qb1+',
    annotations: {
      '3...': 'Phản gambit Philidor: Đen đẩy tốt f để tranh trung tâm và mở cột f – lối chơi sắc bén mà Morphy ưa thích.',
      '6...': 'Tốt e tiến lên e4 đuổi Mã f3; Đen có thế tốt trung tâm vững chắc.',
      '9...': 'Morphy bình thản nhập thành trước Mã h5 đang nhắm vào f6 và g7.',
      '11':
        '11.g4? quá vội vàng. Máy tính cho thấy 11.Nxf6+ hoặc 11.Nxg7 giữ thế cân bằng; sau nước trong ván, Đen ăn tốt g4 và Mã h5 bị treo.',
      '17': 'Trắng nhập thành dài, tin rằng Vua sẽ an toàn ở cánh Hậu.',
      '17...':
        'Đòn thí Xe nổi tiếng: phá vỡ sự liên lạc giữa các quân trắng và dọn đường cho Hậu sang cánh Hậu. Máy tính hiện đại cho rằng 17...Bb4 chắc chắn hơn và với phòng thủ chính xác Trắng có thể đứng vững, nhưng bài toán Morphy đặt ra là cực kỳ khó giải trên bàn cờ thực tế.',
      '18...':
        'Nước Hậu tuyệt đẹp: Hậu sang a3 tấn công tốt a2 và b2. Nếu 19.bxa3?? thì 19...Bxa3# chiếu hết ngay.',
      '20': 'Trắng đẩy tốt b4 để chặn đường chéo của Tượng d6, nhưng các ô quanh Vua trắng càng thêm trống trải.',
      '22': '22.Kb2? là sai lầm quyết định. 22.Kc1! giúp Trắng chống đỡ tốt hơn nhiều, dù Đen vẫn giữ thế chủ động.',
      '22...': 'Thí Tượng ăn tốt b4, mở cột b cho Xe b8.',
      '25...':
        '25...e3! – tốt e hy sinh để giải phóng ô e4, mở đường chéo f5–c2 cho Tượng c8. Máy tính xác nhận đây là nước mạnh nhất.',
      '29...': 'Hậu chiếu ở b1 và sẽ ăn Xe h1. Đen hơn hẳn vật chất, Bird đầu hàng.',
    },
    keyMoments: ['11', '17...', '18...', '22', '25...'],
    lessons: [
      'Một nước tấn công non (11.g4) khi chưa phát triển xong thường chỉ tạo thêm điểm yếu.',
      'Thí quân để mở đường cho Hậu tới gần Vua đối phương đã nhập thành dài là mô-típ rất hiệu quả.',
      'Luôn kiểm tra xem việc ăn một quân "miễn phí" có dẫn tới chiếu hết không (19.bxa3?? Bxa3#).',
      'Khi bị tấn công, chọn đúng ô cho Vua (22.Kc1 thay vì 22.Kb2) có thể quyết định số phận ván cờ.',
    ],
    orientation: 'black',
    tags: ['Thí quân', 'Tấn công Vua'],
    source: 'https://www.chessgames.com/perl/chessgame?gid=1027914',
  },

  // ------------------------------------------------------------------ 1858
  {
    id: 'morphy-anderssen-1858',
    title: 'Morphy – Anderssen: Hạ gục nhà vô địch sau 17 nước (ván 9)',
    white: 'Paul Morphy',
    black: 'Adolf Anderssen',
    event: 'Trận đấu Morphy – Anderssen, Paris',
    year: 1858,
    result: '1-0',
    opening: 'Phòng thủ Sicilian (Sicilian Defence)',
    difficulty: 3,
    context:
      'Tháng 12 năm 1858, Adolf Anderssen – nhà vô địch giải quốc tế London 1851 và được xem là kỳ thủ mạnh nhất châu Âu – đến Paris đấu với Paul Morphy. Dù đang ốm, Morphy vẫn thắng thuyết phục với 7 thắng, 2 thua, 2 hòa. Ván thứ chín này là chiến thắng ngắn nhất của Morphy trong trận đấu.',
    summary:
      'Anderssen dùng hai tốt e, f đuổi Tượng trắng và định bắt quân, nhưng việc đẩy tốt làm Vua đen lộ ra. Morphy bình thản bỏ Tượng e3, đưa hai Mã nhảy vào ô c7 và đưa Hậu, Tượng vào tấn công Vua đen. Sau nước Vua sai lầm 14...Kg6?, Vua đen bị kéo ra f6, và nước 17.Ke2 bình thản kết nối hai Xe khiến Anderssen phải đầu hàng dù đang hơn quân.',
    moves:
      '1.e4 c5 2.d4 cxd4 3.Nf3 Nc6 4.Nxd4 e6 5.Nb5 d6 6.Bf4 e5 7.Be3 f5 8.N1c3 f4 9.Nd5 fxe3 10.Nbc7+ Kf7 11.Qf3+ Nf6 12.Bc4 Nd4 13.Nxf6+ d5 14.Bxd5+ Kg6 15.Qh5+ Kxf6 16.fxe3 Nxc2+ 17.Ke2',
    annotations: {
      '5': 'Mã nhảy lên b5 nhắm vào ô d6 – điểm yếu của Đen sau ...e6.',
      '6...': 'Tượng f4 tấn công tốt d6; Anderssen chặn bằng ...e5 và đuổi Tượng.',
      '7...':
        '7...f5 rồi 8...f4: Anderssen dùng tốt đuổi Tượng e3, định bắt quân. Nhưng đẩy tốt f làm hở đường chéo dẫn tới Vua đen.',
      '9': 'Thí Tượng! Morphy để Tượng e3 bị bắt, đổi lại hai Mã cùng nhắm vào ô c7.',
      '10': 'Chiếu chĩa đôi Vua và Xe a8. Đen không thể ăn Mã bằng Hậu (10...Qxc7 11.Nxc7+ mất Hậu), nên Vua phải lên f7.',
      '11': 'Morphy không vội ăn Xe a8 mà đưa Hậu vào trận với nước chiếu – ưu tiên tấn công Vua hơn ăn quân.',
      '12...': 'Anderssen phản công: Mã d4 tấn công Hậu f3 và nhắm vào ô c2.',
      '13': 'Mã d5 ăn Mã f6 và mở đường chéo a2–g8 cho Tượng c4: chiếu phát hiện.',
      '14...':
        '14...Kg6? là sai lầm thua cờ. Phòng thủ duy nhất là 14...Ke7!, khi Đen vẫn còn hy vọng. Sau nước trong ván, Vua đen bị kéo ra giữa bàn cờ.',
      '16': '16.fxe3! Trắng ăn tốt e3 và mở cột f cho Xe – Vua đen ở f6 sẽ hứng chịu các nước chiếu theo cột f.',
      '17':
        'Vua trắng bình thản bước lên e2, nối hai Xe. Trắng đe dọa Rf1+ cùng Qxe5+, và máy tính xác nhận Đen không có cách phòng thủ thỏa đáng. Anderssen đầu hàng dù đang hơn quân.',
    },
    keyMoments: ['9', '11', '14...', '17'],
    lessons: [
      'Đẩy tốt sát Vua mình để đuổi quân đối phương (…f5, …f4) có thể phải trả giá đắt khi đối thủ phát triển nhanh hơn.',
      'Thí một quân để hai Mã nhảy vào ô yếu c7 là ví dụ cho việc đặt thời gian và hoạt động quân lên trên vật chất.',
      'Khi Vua đối phương bị lôi ra giữa bàn cờ, hãy mở cột (như 16.fxe3) để các Xe tham gia.',
      'Một nước Vua sai (14...Kg6?) có thể biến thế cờ còn chống đỡ được thành thua ngay.',
    ],
    tags: ['Tấn công Vua', 'Ván ngắn', 'Thí quân'],
    source: 'https://www.chessgames.com/perl/chessgame?gid=1019056',
  },

  // ------------------------------------------------------------------ 1862
  {
    id: 'steinitz-mongredien-1862',
    title: 'Steinitz – Mongredien: Giải thưởng ván đẹp nhất London 1862',
    white: 'Wilhelm Steinitz',
    black: 'Augustus Mongredien',
    event: 'Giải đấu quốc tế của Hội cờ Anh, London',
    year: 1862,
    result: '1-0',
    opening: 'Phòng thủ Scandinavia (Scandinavian Defence)',
    difficulty: 3,
    context:
      'Giải đấu quốc tế London 1862 do Hội cờ Anh tổ chức nhân dịp Triển lãm Thế giới lần thứ hai, và là giải lớn đầu tiên thi đấu vòng tròn. Wilhelm Steinitz, chàng trai 26 tuổi vừa từ Vienna sang, chỉ xếp thứ sáu nhưng nhận giải thưởng ván cờ đẹp nhất nhờ chiến thắng trước Augustus Mongredien – nhà buôn ngũ cốc, chủ tịch Câu lạc bộ cờ London và là bạn của Morphy. Hơn hai thập kỷ sau, chính Steinitz trở thành nhà vô địch thế giới chính thức đầu tiên.',
    summary:
      'Steinitz cắm Mã ở e5, củng cố bằng tốt f4 rồi nâng Xe qua f3 sang h3. Sau khi thí tốt g4 để mở cột, ông thí luôn Xe ở h7 để lôi Vua đen ra. Mongredien có cơ hội đứng vững, nhưng nước 18...Rg8? cho phép Hậu trắng chiếu liên tục; Xe f1 và Tượng cùng tham gia, và ván cờ kết thúc bằng chiếu hết ở e8.',
    moves:
      '1.e4 d5 2.exd5 Qxd5 3.Nc3 Qd8 4.d4 e6 5.Nf3 Nf6 6.Bd3 Be7 7.O-O O-O 8.Be3 b6 9.Ne5 Bb7 10.f4 Nbd7 11.Qe2 Nd5 12.Nxd5 exd5 13.Rf3 f5 14.Rh3 g6 15.g4 fxg4 16.Rxh7 Nxe5 17.fxe5 Kxh7 18.Qxg4 Rg8 19.Qh5+ Kg7 20.Qh6+ Kf7 21.Qh7+ Ke6 22.Qh3+ Kf7 23.Rf1+ Ke8 24.Qe6 Rg7 25.Bg5 Qd7 26.Bxg6+ Rxg6 27.Qxg6+ Kd8 28.Rf8+ Qe8 29.Qxe8#',
    annotations: {
      '10': 'Tốt f4 bảo vệ Mã e5 và mở đường cho Xe f1 sang cánh Vua.',
      '13': 'Xe "nâng" lên hàng 3 – kỹ thuật kinh điển để đưa Xe sang tấn công cánh Vua.',
      '14': 'Xe sang h3 nhắm thẳng vào tốt h7.',
      '15': 'Steinitz thí tốt g4 để mở cột g và phá lớp tốt che chắn Vua đen.',
      '16':
        'Thí Xe! 16.Rxh7 lôi Vua đen ra. Máy tính ngày nay cho rằng 16.Qxg4 giữ ưu thế an toàn hơn, nhưng đòn thí của Steinitz đặt Đen trước những bài toán rất khó.',
      '17...': 'Đen nhận Xe; nếu phòng thủ chính xác, thế cờ lúc này vẫn cân bằng.',
      '18...':
        '18...Rg8? là sai lầm quyết định. 18...Qe8! bảo vệ tốt g6 và giúp Đen đứng vững. Sau nước trong ván, Vua đen bị Hậu trắng đuổi khắp bàn cờ.',
      '24': 'Hậu xâm nhập e6, khống chế các ô quanh Vua đen và đe dọa ăn Xe g8.',
      '25...': 'Đen đã ở thế thua; 25...Qd7 còn cho phép Trắng kết thúc ngay.',
      '26': 'Thí Tượng ở g6 phá tan lớp che chắn cuối cùng.',
      '29': 'Chiếu hết: Hậu e8, được Xe f8 bảo vệ, chiếu Vua d8; các ô c8, d7 bị Hậu khống chế, còn c7 và e7 bị chính quân Đen chiếm.',
    },
    keyMoments: ['13', '16', '18...', '26'],
    lessons: [
      'Kỹ thuật "nâng Xe" (Rf3–h3) là cách nhanh nhất để đưa Xe sang tấn công Vua đối phương.',
      'Tiền đồn Mã ở e5 được tốt f4 bảo vệ là bàn đạp lý tưởng cho tấn công cánh Vua.',
      'Một đòn thí không cần chính xác tuyệt đối để thành công – nó chỉ cần đặt ra những bài toán mà đối phương không giải được.',
      'Khi Vua bị săn, nước phòng thủ giữ các ô then chốt (như 18...Qe8) thường là cứu cánh.',
    ],
    tags: ['Thí quân', 'Tấn công Vua'],
    source: 'https://www.chessgames.com/perl/chessgame?gid=1001497',
  },

  // ------------------------------------------------------------------ 1863
  {
    id: 'rosanes-anderssen-1863',
    title: 'Rosanes – Anderssen: Thí Hậu ở f1 và chiếu hết phát hiện',
    white: 'Jakob Rosanes',
    black: 'Adolf Anderssen',
    event: 'Ván giao hữu, Breslau',
    year: 1863,
    result: '0-1',
    opening: 'Gambit Vua – Gambit Kieseritzky (King\'s Gambit, Kieseritzky Gambit)',
    difficulty: 3,
    context:
      'Adolf Anderssen dạy toán ở trường trung học Friedrichs tại Breslau (nay là Wrocław, Ba Lan) và thường đấu cờ với các kỳ thủ địa phương. Jakob Rosanes khi ấy là một sinh viên toán học trẻ tuổi; về sau ông trở thành giáo sư, rồi hiệu trưởng Đại học Breslau, nổi tiếng với các công trình về hình học đại số. Hai người để lại nhiều ván cờ hay, và ván này là một trong những tác phẩm tấn công đẹp nhất của Anderssen.',
    summary:
      'Trong Gambit Kieseritzky, Anderssen sẵn sàng bỏ cả Xe a8 để lấy tốc độ phát triển. Mã đen nhảy vào g3 giam Xe trắng ở h2, Xe đen chiếm cột e và Hậu đen vòng sang a6. Đúng lúc Vua trắng tưởng đã an toàn, Anderssen thí Hậu ở f1, và một đòn chiếu phát hiện kết hợp với thế ghim kết thúc ván cờ.',
    moves:
      '1.e4 e5 2.f4 exf4 3.Nf3 g5 4.h4 g4 5.Ne5 Nf6 6.Bc4 d5 7.exd5 Bd6 8.d4 Nh5 9.Bb5+ c6 10.dxc6 bxc6 11.Nxc6 Nxc6 12.Bxc6+ Kf8 13.Bxa8 Ng3 14.Rh2 Bf5 15.Bd5 Kg7 16.Nc3 Re8+ 17.Kf2 Qb6 18.Na4 Qa6 19.Nc3 Be5 20.a4 Qf1+ 21.Qxf1 Bxd4+ 22.Be3 Rxe3 23.Kg1 Re1#',
    annotations: {
      '5': 'Gambit Kieseritzky: Mã nhảy vào e5 thay vì lùi, chấp nhận thế cờ sắc bén.',
      '5...': 'Phòng thủ Berlin: Đen phát triển Mã và phản công tốt e4.',
      '8...': 'Mã h5 giữ tốt f4 và nhắm vào ô g3 – ô sẽ trở thành điểm then chốt trong đòn kết thúc.',
      '9...': 'Thay vì lui Vua, Đen chặn chiếu bằng tốt và chấp nhận mất cả Xe a8 để đổi lấy tốc độ tấn công.',
      '13': 'Trắng ăn Xe a8 và hơn hẳn vật chất, nhưng Vua trắng chưa nhập thành, còn các quân cánh Vua vẫn chưa ra trận.',
      '13...': 'Mã nhảy vào g3 tấn công Xe h1, đẩy Xe sang h2 – nơi nó bị giam lỏng cho đến hết ván.',
      '17...': 'Hậu đen lên đường sang cánh Hậu rồi tới a6, nhắm vào ô f1 theo đường chéo a6–f1.',
      '19...': 'Tượng e5 tăng áp lực lên tốt d4 – quân đang chắn đường chéo dẫn tới Vua trắng.',
      '20...':
        'Thí Hậu!! Hậu chiếu ở f1, buộc Hậu trắng phải bắt. Máy tính xác nhận từ đây Đen chiếu hết bắt buộc sau bốn nước.',
      '22': 'Nước duy nhất: Tượng chặn chiếu ở e3.',
      '22...':
        'Xe ăn Tượng e3. Giờ Xe e3 vừa che đường chéo của Tượng d4, vừa sẵn sàng rời đi để tạo chiếu phát hiện. Trắng không thể ngăn ...Re2# hoặc ...Re1#.',
      '23...':
        'Chiếu hết phát hiện: Xe rời e3, mở đường chéo cho Tượng d4 chiếu Vua g1, đồng thời ghim chặt Hậu f1. Ô h1 bị Mã g3 khống chế, ô f2 bị Tượng kiểm soát.',
    },
    keyMoments: ['9...', '13...', '20...', '22...', '23...'],
    lessons: [
      'Vua chưa nhập thành giữa bàn cờ mở là mục tiêu tấn công hàng đầu, kể cả khi đối phương hơn một Xe.',
      'Một quân xâm nhập sâu (Mã g3) có thể trói chân nhiều quân đối phương (Xe h2, Vua).',
      'Thí Hậu để lôi kéo quân phòng thủ (Qf1+) thường mở đường cho đòn chiếu phát hiện.',
      'Chiếu phát hiện kết hợp với ghim là một trong những mô-típ chiếu hết mạnh nhất.',
    ],
    orientation: 'black',
    tags: ['Thí quân', 'Chiến thuật'],
    source: 'https://www.chessgames.com/perl/chessgame?gid=1019162',
  },

  // ------------------------------------------------------------------ 1872
  {
    id: 'hamppe-meitner-1872',
    title: 'Hamppe – Meitner: Ván hòa bất tử (The Immortal Draw)',
    white: 'Carl Hamppe',
    black: 'Philipp Meitner',
    event: 'Ván giao hữu, Vienna',
    year: 1872,
    result: '1/2-1/2',
    opening: 'Ván cờ Vienna – biến Hamppe–Meitner (Vienna Game, Hamppe–Meitner Variation)',
    difficulty: 3,
    context:
      'Carl Hamppe (1814–1876) là quan chức cấp cao ở Vienna và có nhiều đóng góp cho lý thuyết khai cuộc Vienna; Philipp Meitner (1839–1910) là luật sư, một cao thủ cờ người Áo và là cha của nhà vật lý nổi tiếng Lise Meitner. Ván cờ giao hữu năm 1872 của họ được in lại khắp nơi với tên gọi "Ván hòa bất tử", và biến khai cuộc trong ván về sau được đặt theo tên hai người.',
    summary:
      'Đen thí Tượng ở f2 rồi thí luôn Hậu để lôi Vua trắng từ e1 sang tận cánh Hậu. Các tốt và quân nhẹ của Đen giăng lưới quanh Vua trắng ở c5, buộc Trắng phải tìm những nước duy nhất, đặc biệt là 14.Bc6!!. Cuối cùng Đen thiếu một Hậu và một Mã nhưng có chiếu vĩnh viễn, còn Trắng không thể né tránh – ván cờ kết thúc hòa.',
    moves:
      '1.e4 e5 2.Nc3 Bc5 3.Na4 Bxf2+ 4.Kxf2 Qh4+ 5.Ke3 Qf4+ 6.Kd3 d5 7.Kc3 Qxe4 8.Kb3 Na6 9.a3 Qxa4+ 10.Kxa4 Nc5+ 11.Kb4 a5+ 12.Kxc5 Ne7 13.Bb5+ Kd8 14.Bc6 b6+ 15.Kb5 Nxc6 16.Kxc6 Bb7+ 17.Kb5 Ba6+ 18.Kc6 Bb7+',
    annotations: {
      '3': '3.Na4 đuổi Tượng để giành cặp Tượng, nhưng Mã ở biên kém hoạt động và Trắng mất thời gian phát triển.',
      '3...': 'Thí Tượng ở f2! Meitner kéo Vua trắng ra khỏi vị trí ban đầu thay vì lùi Tượng.',
      '8...': 'Mã a6 chuẩn bị ...Qb4# – Hậu b4 sẽ được Mã a6 bảo vệ.',
      '9': 'Tốt a3 ngăn ...Qb4# và chuẩn bị đưa Vua về a2. Nếu Vua trắng kịp ẩn nấp, ưu thế một quân sẽ quyết định.',
      '9...':
        'Thí Hậu!! Meitner không để Vua trắng chạy thoát: Hậu ăn Mã a4 kèm chiếu, kéo Vua lên a4. Đây là canh bạc lớn – Đen thiếu rất nhiều quân và chỉ có thể sống nhờ các nước chiếu.',
      '11...': 'Tốt a5 chiếu, kéo Vua trắng sâu hơn vào trận địa đối phương. Các tốt đen bắt đầu khống chế những ô quanh Vua trắng.',
      '12...': 'Mã e7 đe dọa 13...b6+ 14.Kb5 Bd7# – chiếu hết.',
      '14':
        '14.Bc6!! – nước duy nhất. Máy tính xác nhận mọi nước khác đều bị chiếu hết: Tượng hy sinh để mở ô c6 làm đường thoát cho Vua trắng.',
      '14...': '14...b6+ là đúng. Nếu 14...bxc6? thì Vua trắng thoát khỏi lưới và ưu thế vật chất của Trắng sẽ quyết định.',
      '16': 'Vua ăn Mã c6. Không được 16.c3?? vì 16...Nd4+! 17.cxd4 Bd7# chiếu hết.',
      '16...': 'Tượng chiếu liên tục là cách duy nhất để Đen không thua.',
      '17': '17.Kb5! – nếu 17.Kxb7?? thì 17...Kd7! và Trắng không thể ngăn ...Rhb8# chiếu hết.',
      '18': 'Lại là nước duy nhất: sau 18.Ka4?? Bc4! Trắng không thể ngăn ...b5#.',
      '18...':
        'Hai bên lặp lại nước đi: hòa bằng chiếu vĩnh viễn. Đen thiếu cả Hậu lẫn một Mã, nhưng Trắng không thể thoát khỏi các nước chiếu.',
    },
    keyMoments: ['3...', '9...', '14', '16...', '18...'],
    lessons: [
      'Vua bị kéo ra giữa bàn cờ có thể trở thành mục tiêu, kể cả khi đối phương đã mất rất nhiều quân.',
      'Khi hơn nhiều vật chất mà bị chiếu liên tục, hãy tìm "nước duy nhất" thay vì cố tham thắng – 14.Bc6!! là ví dụ.',
      'Các tốt có thể tạo thành tấm lưới khống chế những ô quanh Vua đối phương.',
      'Chiếu vĩnh viễn là vũ khí cứu nguy của bên thiếu quân.',
    ],
    tags: ['Thí quân', 'Phòng thủ', 'Ván ngắn'],
    source: 'https://en.wikipedia.org/wiki/Immortal_Draw',
  },

  // ------------------------------------------------------------------ 1874
  {
    id: 'knorre-chigorin-1874',
    title: 'Knorre – Chigorin: Cột h mở và đòn thí Hậu',
    white: 'Viktor Knorre',
    black: 'Mikhail Chigorin',
    event: 'Ván đấu tại St. Petersburg',
    year: 1874,
    result: '0-1',
    opening: 'Ván cờ Ý – Giuoco Pianissimo (Italian Game)',
    difficulty: 2,
    context:
      'Mikhail Chigorin (1850–1908) được xem là người khai sinh trường phái cờ Nga và về sau hai lần tranh ngôi vô địch thế giới với Steinitz (1889 và 1892). Năm 1874, ông mới bắt đầu nổi danh ở St. Petersburg. Đối thủ Viktor Knorre là nhà thiên văn học làm việc ở Đài thiên văn Berlin và là một kỳ thủ mạnh – một biến của Phòng thủ Hai Mã mang tên ông.',
    summary:
      'Từ một khai cuộc Ý yên tĩnh, Trắng ghim Mã bằng Tượng g5, và Chigorin đáp lại bằng cách đẩy hai tốt g, h đuổi Tượng. Khi Trắng tham ăn tốt g5 rồi bắt Hậu đen, cột h đã mở và các quân nhẹ của Đen ào ạt lao vào Vua trắng. Đòn thí Mã 13...Nf3+ phá vỡ lớp phòng thủ cuối cùng, và chỉ sau 14 nước Knorre phải đầu hàng dù đang hơn rất nhiều vật chất.',
    moves:
      '1.e4 e5 2.Nf3 Nc6 3.Bc4 Bc5 4.O-O Nf6 5.d3 d6 6.Bg5 h6 7.Bh4 g5 8.Bg3 h5 9.Nxg5 h4 10.Nxf7 hxg3 11.Nxd8 Bg4 12.Qd2 Nd4 13.Nc3 Nf3+ 14.gxf3 Bxf3',
    annotations: {
      '5...': 'Hai bên phát triển bình thường trong thế Giuoco Pianissimo – biến yên tĩnh của ván cờ Ý.',
      '6': 'Tượng ghim Mã f6 vào Hậu d8. Ý tưởng này chỉ có lợi khi Đen không thể đuổi Tượng bằng tốt.',
      '6...': 'Chigorin lập tức đuổi Tượng bằng ...h6 rồi ...g5. Vì Đen chưa nhập thành, đẩy tốt cánh Vua không gây nguy hiểm cho chính mình.',
      '8': 'Tượng lùi về g3 – nhưng giờ nó nằm ngay trên đường tiến của tốt h đen.',
      '8...': '8...h5! đe dọa ...h4 bắt Tượng. Trắng quyết định ăn tốt g5.',
      '9...': 'Chigorin không cứu tốt mà tiếp tục ...h4 tấn công Tượng g3.',
      '10': 'Mã ăn f7, chĩa đôi Hậu d8 và Xe h8.',
      '10...':
        'Thí Hậu! Đen ăn Tượng g3 và để Trắng bắt Hậu; đổi lại, cột h mở toang về phía Vua trắng đã nhập thành. Thực ra Đen đã ở thế khó, và theo máy tính đây là cách phản công mạnh nhất.',
      '11...': 'Tượng g4 đuổi Hậu trắng với nhịp, thêm một quân tham gia tấn công.',
      '12...': 'Mã nhảy vào d4, chuẩn bị ...Nf3+ để mở đường cho Tượng g4.',
      '13...':
        'Đòn quyết định: thí Mã ở f3! Máy tính xác nhận đây là nước duy nhất giữ ưu thế cho Đen. Nếu 14.Kh1 thì 14...Rxh2# chiếu hết ngay.',
      '14...':
        'Tượng ăn f3. Đen đe dọa ...gxh2#, còn nếu 15.hxg3 thì 15...Rh1#. Trắng không thể đi fxg3 vì tốt f2 bị Tượng c5 ghim vào Vua. Knorre đầu hàng – máy tính cho thấy mọi cách phòng thủ chỉ trì hoãn chiếu hết thêm vài nước.',
    },
    keyMoments: ['8...', '10...', '13...', '14...'],
    lessons: [
      'Ghim Mã bằng Tượng (Bg5) khi đối phương chưa nhập thành có thể phản tác dụng: tốt g, h sẽ đuổi Tượng với nhịp.',
      'Khi Vua đối phương đã nhập thành ngắn, một cột h mở cùng Xe h8 là vũ khí tấn công cực mạnh.',
      'Ăn Hậu đối phương không đồng nghĩa với thắng – hãy đếm xem bao nhiêu quân đối phương đang nhắm vào Vua mình.',
      'Quân bị ghim (tốt f2) không còn tham gia phòng thủ – hãy tận dụng các thế ghim khi tấn công.',
    ],
    orientation: 'black',
    tags: ['Thí quân', 'Tấn công Vua', 'Ván ngắn'],
    source: 'https://www.chessgames.com/perl/chessgame?gid=1337259',
  },
];
