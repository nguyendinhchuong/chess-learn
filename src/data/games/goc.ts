import type { ClassicGame } from '../types';

export const GAMES_GOC: ClassicGame[] = [
  // ------------------------------------------------------------------ 1750
  {
    id: 'legal-saint-brie-1750',
    title: 'Đòn chiếu hết của Légal',
    white: 'Kermur de Légal',
    black: 'Saint Brie',
    event: 'Quán cà phê de la Régence, Paris',
    year: 1750,
    result: '1-0',
    opening: 'Phòng thủ Philidor (Philidor Defence)',
    difficulty: 1,
    context:
      'Thế kỷ 18, quán cà phê de la Régence ở Paris là "thủ đô" của làng cờ châu Âu. Légal là cao thủ số một ở đó và từng là thầy của Philidor – kỳ thủ mạnh nhất thế kỷ. Một số tài liệu kể rằng Légal chơi ván này khi chấp đối thủ một quân, nhưng bản ghi phổ biến ngày nay là không chấp quân.',
    summary:
      'Chỉ trong 7 nước, Légal dạy cho đối thủ một bài học mà mọi người mới chơi đều phải biết: ghim tương đối không phải là ghim tuyệt đối. Trắng bỏ Hậu, Đen tham ăn và bị chiếu hết bởi ba quân nhẹ. Mẫu chiếu hết này mang tên "Đòn chiếu hết của Légal" và vẫn còn bắt được rất nhiều người chơi nghiệp dư ngày nay.',
    moves: '1.e4 e5 2.Nf3 d6 3.Bc4 Bg4 4.Nc3 g6 5.Nxe5 Bxd1 6.Bxf7+ Ke7 7.Nd5#',
    annotations: {
      '1': 'Tốt vua tiến hai ô: chiếm trung tâm, mở đường cho Hậu và Tượng f1.',
      '2': 'Mã phát triển và tấn công ngay tốt e5.',
      '2...':
        'Phòng thủ Philidor: giữ tốt e5 bằng tốt d6. Thế trận chắc chắn nhưng hơi thụ động vì tốt d6 chặn đường của Tượng f8.',
      '3': 'Tượng nhắm vào f7 – ô yếu nhất của Đen lúc đầu ván vì chỉ có Vua bảo vệ.',
      '3...':
        'Tượng ghim Mã f3 vào Hậu d1. Lưu ý: đây chỉ là ghim TƯƠNG ĐỐI – Mã vẫn được phép di chuyển, chỉ là nếu đi thì Hậu bị bắt.',
      '4': 'Trắng bình thản phát triển thêm Mã và chuẩn bị bẫy.',
      '4...':
        'Sai lầm! Đen muốn đưa Tượng f8 ra g7 nhưng quên mất chiến thuật. Phát triển tự nhiên như 4...Nc6 hoặc 4...Nf6 an toàn hơn nhiều.',
      '5':
        'Phá ghim! Mã bỏ đi, để Hậu d1 cho Tượng bắt. Nếu Đen chỉ bình tĩnh đáp 5...dxe5 6.Qxg4 thì Trắng thu lại quân và hơn một tốt – thua thiệt nhỏ. Nhưng Đen đã tham…',
      '5...': 'Bắt Hậu – sai lầm chết người. Ăn quân lớn nhất chưa chắc là nước tốt nhất!',
      '6':
        'Chiếu! Vua đen không thể bắt Tượng vì f7 được Mã e5 bảo vệ, cũng không thể lên d7 vì Mã e5 kiểm soát ô đó. Nước duy nhất là Ke7.',
      '6...': 'Nước bắt buộc. Vua bước vào lưới chiếu hết.',
      '7':
        'Chiếu hết! Mã d5 chiếu Vua; Tượng f7 khống chế e6 và e8; Mã e5 khống chế d7; các ô còn lại bị chính quân Đen chặn. Trắng thiếu cả Hậu nhưng ba quân nhẹ phối hợp hoàn hảo.',
    },
    keyMoments: ['4...', '5', '5...', '7'],
    lessons: [
      'Phân biệt ghim tuyệt đối (quân bị ghim vào Vua, không được đi) và ghim tương đối (quân bị ghim vào quân khác, vẫn được đi).',
      'Trước khi ăn quân lớn, hãy tự hỏi: "Tại sao đối thủ lại cho mình ăn?"',
      'Ô f7 (f2 với Trắng) là điểm yếu nhất đầu ván – luôn để ý các đòn nhắm vào đó.',
      'Phát triển quân nhanh và an toàn quan trọng hơn những nước tốt chậm chạp như 4...g6.',
      'Các quân nhẹ phối hợp tốt có thể chiếu hết ngay cả khi phe tấn công thiếu Hậu.',
    ],
  },

  // ------------------------------------------------------------------ 1851
  {
    id: 'van-co-bat-tu-1851',
    title: 'Ván cờ bất tử (The Immortal Game)',
    white: 'Adolf Anderssen',
    black: 'Lionel Kieseritzky',
    event: 'Ván giao hữu, London',
    year: 1851,
    result: '1-0',
    opening: 'Gambit Vua – Gambit Tượng (King\'s Gambit, Bishop\'s Gambit)',
    difficulty: 3,
    context:
      'Ván cờ được chơi như một ván giao hữu bên lề giải đấu quốc tế đầu tiên trong lịch sử (London 1851), giải mà chính Anderssen vô địch. Kieseritzky rất ấn tượng nên gửi ván cờ về Paris để đăng báo, và năm 1855 Ernst Falkbeer đặt cho nó cái tên "Ván cờ bất tử".',
    summary:
      'Đây là biểu tượng của trường phái cờ lãng mạn thế kỷ 19: tấn công bằng mọi giá. Anderssen lần lượt thí Tượng, cả hai Xe rồi cuối cùng là Hậu, để chiếu hết bằng ba quân nhẹ còn lại. Phân tích hiện đại cho thấy không phải nước nào cũng chính xác tuyệt đối, nhưng ý tưởng phát triển nhanh và tấn công Vua đối phương vẫn là bài học kinh điển.',
    moves:
      '1.e4 e5 2.f4 exf4 3.Bc4 Qh4+ 4.Kf1 b5 5.Bxb5 Nf6 6.Nf3 Qh6 7.d3 Nh5 8.Nh4 Qg5 9.Nf5 c6 10.g4 Nf6 11.Rg1 cxb5 12.h4 Qg6 13.h5 Qg5 14.Qf3 Ng8 15.Bxf4 Qf6 16.Nc3 Bc5 17.Nd5 Qxb2 18.Bd6 Bxg1 19.e5 Qxa1+ 20.Ke2 Na6 21.Nxg7+ Kd8 22.Qf6+ Nxf6 23.Be7#',
    annotations: {
      '2':
        'Gambit Vua: Trắng hy sinh tốt f để kéo tốt e5 khỏi trung tâm, mở cột f và chuẩn bị chiếm trung tâm bằng d4. Đây là khai cuộc ưa thích của thế kỷ 19.',
      '2...': 'Đen nhận gambit, hơn một tốt.',
      '3': 'Gambit Tượng: Tượng nhắm ngay vào f7 thay vì đi Mã f3 như thường lệ.',
      '3...': 'Hậu chiếu, buộc Vua trắng phải di chuyển và mất quyền nhập thành.',
      '4':
        'Vua ở f1 trông nguy hiểm nhưng thực ra khá an toàn ở giai đoạn này, và Trắng sẽ đuổi Hậu đen bằng Nf3 với tempo.',
      '4...':
        'Phản gambit Bryan: Đen thí tốt b để kéo Tượng ra khỏi đường chéo a2–g8 đang nhắm vào f7.',
      '5...': 'Phát triển Mã và tấn công tốt e4.',
      '6': 'Đuổi Hậu và phát triển quân cùng một lúc – mỗi nước đi đều có ích.',
      '7': 'Bảo vệ tốt e4 và mở đường cho Tượng c1.',
      '7...': 'Mã giữ tốt f4 và nhòm vào ô g3.',
      '8': 'Mã nhắm tới ô f5 rất mạnh.',
      '9': 'Mã chiếm ô f5, nhắm vào g7 và d6. Đen đuổi Tượng b5 bằng c6.',
      '10':
        'Anderssen không lùi Tượng! Thay vào đó, tốt g đuổi Mã h5. Trắng sẵn sàng bỏ Tượng để giành nhịp tấn công.',
      '11':
        'Xe bảo vệ tốt g4 và chuẩn bị h4. Tượng b5 chính thức bị bỏ mặc – thí quân đầu tiên.',
      '11...': 'Đen hơn một Tượng, nhưng quân Đen đang phát triển rất chậm.',
      '12': 'Tốt tiến lên đuổi Hậu, giành thêm không gian ở cánh vua.',
      '14':
        'Đe dọa 15.Bxf4 nhốt Hậu: khi đó mọi ô Hậu đen có thể đi đều bị kiểm soát. Đen phải rút Mã về g8 để Hậu có lối thoát ở f6.',
      '14...': 'Phát triển "ngược": Mã quay về vị trí ban đầu. Thế trận Đen đã rất bị động.',
      '15': 'Trắng thu lại tốt gambit với nhịp, Tượng hướng vào d6 và c7.',
      '16': 'Phát triển nốt Mã. Trắng có gần như toàn bộ lực lượng trên trận.',
      '17':
        'Mã chiếm trung tâm, tấn công Hậu f6 và đe dọa Nc7+ chĩa đôi Vua và Xe a8. Đen bất chấp, lao vào ăn tốt b2.',
      '17...': 'Hậu ăn tốt b2, đe dọa ăn Xe a1 kèm chiếu, và Tượng c5 thì nhắm Xe g1.',
      '18':
        'Nước đi huyền thoại: Trắng cho đi cả hai Xe! Tượng d6 tấn công Tượng c5 và khống chế ô e7, f8 – Vua đen sẽ không còn đường thoát.',
      '18...': 'Đen bắt Xe g1.',
      '19':
        'Nước yên lặng tuyệt đẹp: tốt e5 cắt đường chéo b2–g7, Hậu đen không còn bảo vệ được ô g7. Đồng thời Mã g8 bị tốt e5 khống chế ô f6.',
      '19...': 'Đen ăn nốt Xe thứ hai kèm chiếu.',
      '20':
        'Trắng đã thiếu hai Xe và một Tượng, nhưng phần lớn quân Đen vẫn ngủ yên ở hàng cuối, còn Hậu và Tượng đen thì lạc tận góc bàn cờ. Steinitz về sau chỉ ra rằng 20...Ba6! là cách phòng thủ tốt nhất cho Đen.',
      '20...': 'Đen muốn đưa Mã về c7 phòng thủ, nhưng đã quá muộn.',
      '21': 'Mã ăn tốt g7 kèm chiếu, khống chế ô e8.',
      '22':
        'Thí Hậu! Nếu 22...Ne7 thì 23.Qxe7#. Đen buộc phải bắt Hậu bằng Mã, và điều đó mở đường chéo cho Tượng.',
      '23':
        'Chiếu hết bằng ba quân nhẹ: Tượng e7 chiếu Vua; Mã d5 khống chế c7 và bảo vệ Tượng; Mã g7 khống chế e8. Trắng chỉ còn Tượng và hai Mã, Đen còn gần như đủ quân – nhưng quân Đen chẳng giúp được gì.',
    },
    keyMoments: ['11', '18', '19', '22', '23'],
    lessons: [
      'Phát triển quân và thời gian (tempo) có thể quý hơn vật chất, nhất là khi Vua đối phương còn ở trung tâm.',
      'Đếm quân không đủ – hãy đếm số quân THỰC SỰ tham gia trận đánh ở khu vực quan trọng.',
      'Một nước yên lặng (như 19.e5) cắt đứt liên lạc của quân phòng thủ đôi khi mạnh hơn mọi nước chiếu.',
      'Tham ăn quân ở góc bàn cờ (như Hậu đen ăn b2 và a1) khi Vua đang bị đe dọa là cực kỳ nguy hiểm.',
      'Ba quân nhẹ phối hợp ăn ý có thể chiếu hết dù đối phương hơn rất nhiều vật chất.',
    ],
  },

  // ------------------------------------------------------------------ 1852
  {
    id: 'van-co-thuong-xanh-1852',
    title: 'Ván cờ thường xanh (The Evergreen Game)',
    white: 'Adolf Anderssen',
    black: 'Jean Dufresne',
    event: 'Ván giao hữu, Berlin',
    year: 1852,
    result: '1-0',
    opening: 'Gambit Evans (Evans Gambit)',
    difficulty: 3,
    context:
      'Một năm sau "Ván cờ bất tử", Anderssen tạo ra một kiệt tác khác trong ván giao hữu với Jean Dufresne, nhà soạn sách cờ nổi tiếng người Đức. Wilhelm Steinitz gọi ván này là "cành cây thường xanh trên vòng nguyệt quế của Anderssen".',
    summary:
      'Trắng thí tốt để phát triển nhanh (Gambit Evans), giữ Vua đen ở trung tâm, rồi mở cột e bằng một đòn thí Mã. Khi Đen phản công mạnh và đe dọa chiếu hết ở g2, Anderssen tung ra chuỗi thí Xe, thí Hậu và kết thúc bằng chiếu kép cùng cặp Tượng.',
    moves:
      '1.e4 e5 2.Nf3 Nc6 3.Bc4 Bc5 4.b4 Bxb4 5.c3 Ba5 6.d4 exd4 7.O-O d3 8.Qb3 Qf6 9.e5 Qg6 10.Re1 Nge7 11.Ba3 b5 12.Qxb5 Rb8 13.Qa4 Bb6 14.Nbd2 Bb7 15.Ne4 Qf5 16.Bxd3 Qh5 17.Nf6+ gxf6 18.exf6 Rg8 19.Rad1 Qxf3 20.Rxe7+ Nxe7 21.Qxd7+ Kxd7 22.Bf5+ Ke8 23.Bd7+ Kf8 24.Bxe7#',
    annotations: {
      '3...': 'Ván cờ Ý (Giuoco Piano): hai bên đều đặt Tượng nhắm vào f7/f2.',
      '4':
        'Gambit Evans: Trắng thí tốt b4 để có nhịp đi c3 và d4, xây dựng trung tâm mạnh và mở đường cho Tượng c1 lên a3.',
      '5': 'Tốt c3 đuổi Tượng và chuẩn bị d4.',
      '6': 'Đòn đánh vào trung tâm. Trắng đã có hai tốt trung tâm và phát triển nhanh hơn.',
      '7': 'Nhập thành trước, không vội thu lại tốt – ưu tiên an toàn Vua và phát triển.',
      '7...': 'Đen trả lại tốt để tốt d3 cản trở việc phát triển của Trắng.',
      '8': 'Hậu và Tượng c4 cùng nhắm vào f7.',
      '8...': 'Hậu bảo vệ f7.',
      '9': 'Tốt e5 đuổi Hậu với tempo và chiếm không gian.',
      '10': 'Xe chiếm cột e, đứng sau tốt e5 – chuẩn bị cho các đòn mở cột e sau này.',
      '11':
        'Tượng a3 khống chế ô f8 nên Đen không thể nhập thành ngắn: Vua đen bị giữ ở trung tâm.',
      '11...': 'Đen trả lại tốt để làm lạc hướng Hậu trắng và mở cột b cho Xe.',
      '13...': 'Tượng lùi về b6, đường chéo hướng về f2.',
      '14': 'Mã chuẩn bị nhảy tới e4 rồi f6.',
      '15': 'Mã nhắm vào ô f6 – điểm then chốt quanh Vua đen.',
      '16': 'Trắng thu lại tốt, Tượng d3 hướng về cánh vua.',
      '17':
        'Thí Mã! Mục đích: mở cột e và tạo tốt f6 cực mạnh đứng ngay sát Vua đen.',
      '18': 'Tốt f6 tấn công Mã e7, cột e đã mở cho Xe e1.',
      '18...': 'Đen đặt Xe vào cột g mở, chuẩn bị phản công vào g2.',
      '19':
        'Nước đi gây tranh cãi nhiều nhất: Anderssen bình thản đưa Xe vào cột d, phớt lờ đe dọa của Đen. Giới phân tích sau này cho rằng ở nước 19 cả hai bên đều có những lựa chọn tốt hơn, nhưng ý tưởng của Trắng thật đẹp.',
      '19...': 'Đen ăn Mã và đe dọa 20...Qxg2# (Xe g8 yểm trợ). Trắng phải chiếu liên tục!',
      '20':
        'Thí Xe với chiếu, loại bỏ Mã e7 – quân phòng thủ quan trọng. Đen bắt lại bằng Mã c6.',
      '21':
        'Thí Hậu!! Nếu 21...Kf8 thì 22.Bxe7#. Đen buộc phải bắt Hậu bằng Vua.',
      '22':
        'Chiếu kép: Tượng f5 chiếu từ đường chéo, đồng thời Xe d1 chiếu theo cột d. Với chiếu kép, Vua bắt buộc phải chạy. Nếu 22...Kc6 thì 23.Bd7#.',
      '23': 'Lại chiếu. Nếu 23...Kd8 thì 24.Bxe7# cũng là chiếu hết.',
      '24':
        'Chiếu hết! Tượng e7 chiếu Vua f8 (được tốt f6 bảo vệ), Tượng d7 khống chế e8, tốt f6 khống chế g7. Một kết thúc hoàn hảo bằng cặp Tượng.',
    },
    keyMoments: ['11', '17', '19', '21', '22'],
    lessons: [
      'Gambit (thí tốt đầu ván) là để đổi vật chất lấy thời gian phát triển và thế chủ động.',
      'Giữ Vua đối phương ở trung tâm (như 11.Ba3 ngăn nhập thành) là tiền đề cho mọi đòn tấn công.',
      'Mở cột (đặc biệt cột e) về phía Vua chưa nhập thành là chìa khóa của tấn công.',
      'Khi đối thủ đe dọa chiếu hết, hãy tìm chuỗi nước chiếu liên tục – bên chiếu trước thường thắng.',
      'Chiếu kép là đòn mạnh nhất: không thể chặn, không thể bắt, Vua bắt buộc phải chạy.',
    ],
  },

  // ------------------------------------------------------------------ 1858
  {
    id: 'van-co-nha-hat-opera-1858',
    title: 'Ván cờ ở nhà hát Opera (The Opera Game)',
    white: 'Paul Morphy',
    black: 'Công tước Karl xứ Brunswick & Bá tước Isouard',
    event: 'Nhà hát Opera Paris',
    year: 1858,
    result: '1-0',
    opening: 'Phòng thủ Philidor (Philidor Defence)',
    difficulty: 1,
    context:
      'Paul Morphy, thiên tài người Mỹ, được mời xem opera tại Paris trong lô riêng của Công tước Brunswick. Thay vì xem diễn, Morphy bị hai nhà quý tộc rủ chơi cờ (họ cùng bàn bạc cầm quân Đen). Morphy được kể là ngồi quay lưng về phía sân khấu và kết thúc ván cờ rất nhanh.',
    summary:
      'Ván cờ được dùng để dạy người mới học trên toàn thế giới vì nó minh họa hoàn hảo các nguyên tắc khai cuộc: phát triển nhanh, nhập thành, mở thế cờ khi đối thủ chậm phát triển, và dùng ghim. Morphy thí Mã, thí Xe, thí Hậu – và chiếu hết bằng hai quân cuối cùng còn lại.',
    moves:
      '1.e4 e5 2.Nf3 d6 3.d4 Bg4 4.dxe5 Bxf3 5.Qxf3 dxe5 6.Bc4 Nf6 7.Qb3 Qe7 8.Nc3 c6 9.Bg5 b5 10.Nxb5 cxb5 11.Bxb5+ Nbd7 12.O-O-O Rd8 13.Rxd7 Rxd7 14.Rd1 Qe6 15.Bxd7+ Nxd7 16.Qb8+ Nxb8 17.Rd8#',
    annotations: {
      '2...': 'Phòng thủ Philidor: chắc chắn nhưng thụ động, Tượng f8 bị tốt d6 chặn.',
      '3': 'Đánh ngay vào trung tâm, thách thức tốt e5.',
      '3...':
        'Ghim Mã f3. Nước này không tốt lắm vì Đen sẽ phải đổi Tượng lấy Mã, giúp Trắng phát triển Hậu.',
      '4':
        'Nếu 4...dxe5 thì 5.Qxd8+ Kxd8 6.Nxe5 – Trắng hơn tốt và Mã còn tấn công cả Tượng g4 lẫn f7. Vì vậy Đen đổi Tượng lấy Mã trước.',
      '5': 'Hậu ra trận với tempo, đặt ở f3 rất tích cực.',
      '6': 'Đe dọa Qxf7# ngay lập tức! Đen phải chặn.',
      '6...': 'Phát triển Mã và chặn đường Hậu tới f7.',
      '7':
        'Hậu đánh đôi: vừa nhắm f7 (cùng Tượng c4) vừa nhắm tốt b7.',
      '7...':
        'Hậu bảo vệ f7, nhưng chặn mất Tượng f8 – quân Đen ngày càng bị rối.',
      '8':
        'Morphy không tham tốt b7! Nếu 8.Qxb7 Qb4+ thì Đen đổi được Hậu và thoát khỏi sức ép. Phát triển quân quan trọng hơn ăn tốt.',
      '9': 'Ghim Mã f6 vào Hậu e7. Trắng đã ra gần hết quân, Đen vẫn còn ở nhà.',
      '9...': 'Đen muốn đuổi Tượng c4 nhưng lại làm thế cờ mở ra khi mình chưa phát triển xong.',
      '10':
        'Thí Mã! Morphy không muốn lùi Tượng để mất nhịp. Đổi một Mã lấy hai tốt để mở đường tấn công vào Vua đen còn ở trung tâm.',
      '11': 'Tượng chiếu và ghim. Đen phải chặn.',
      '11...': 'Mã d7 bị ghim vào Vua – nó không thể di chuyển.',
      '12':
        'Nhập thành dài: Vua an toàn và Xe lập tức vào cột d tấn công Mã d7 đang bị ghim. Đây là phát triển đúng mục đích.',
      '12...': 'Đen thêm quân bảo vệ d7.',
      '13':
        'Thí tiếp! Xe ăn Mã để duy trì thế ghim và tấn công. Mỗi nước của Trắng đều đưa thêm sức mạnh vào trận.',
      '14': 'Xe thứ hai vào cột d, tấn công Xe d7 đang bị ghim.',
      '14...': 'Đen giải phóng Tượng f8 và đề nghị đổi Hậu (Hậu e6 nhìn thẳng Hậu b3), nhưng đã quá muộn.',
      '15': 'Tượng ăn Xe kèm chiếu, buộc Mã f6 bắt lại – Mã rời f6 nên Tượng g5 lại khống chế được e7 và d8.',
      '16':
        'Thí Hậu tuyệt đẹp! Hậu chiếu từ b8 theo hàng ngang. Đen chỉ có một nước: Mã d7 bắt Hậu. Khi đó cột d mở toang.',
      '17':
        'Chiếu hết! Xe d8 được Tượng g5 bảo vệ. Vua đen không có ô thoát: e7 bị Tượng g5 khống chế, các ô khác bị chính quân Đen chặn. Morphy chiếu hết bằng hai quân cuối cùng của mình.',
    },
    keyMoments: ['8', '10', '12', '13', '16'],
    lessons: [
      'Phát triển quân nhanh, nhập thành sớm và đưa Xe vào cột mở.',
      'Đừng ăn tốt nếu điều đó cho phép đối thủ đổi Hậu hoặc làm mình mất nhịp phát triển (8.Nc3! thay vì 8.Qxb7).',
      'Khi bạn phát triển tốt hơn, hãy MỞ thế cờ – kể cả bằng cách thí quân.',
      'Ghim là vũ khí mạnh: quân bị ghim không thể phòng thủ và là mục tiêu để dồn thêm lực lượng.',
      'Mỗi nước đi phải có mục đích: Morphy không lãng phí một nhịp nào.',
    ],
  },

  // ------------------------------------------------------------------ 1895
  {
    id: 'steinitz-bardeleben-1895',
    title: 'Steinitz – von Bardeleben: Xe điên ở Hastings',
    white: 'Wilhelm Steinitz',
    black: 'Curt von Bardeleben',
    event: 'Giải Hastings 1895',
    year: 1895,
    result: '1-0',
    opening: 'Ván cờ Ý – Giuoco Piano',
    difficulty: 3,
    context:
      'Giải Hastings 1895 là một trong những giải mạnh nhất thế kỷ 19. Steinitz – nhà vô địch thế giới chính thức đầu tiên, vừa mất ngôi vào tay Lasker một năm trước – chơi ván này và giành giải thưởng ván cờ đẹp nhất. Von Bardeleben đã rời khỏi phòng thi mà không đầu hàng, để mặc đồng hồ chạy hết giờ.',
    summary:
      'Trắng giữ Vua đen ở trung tâm bằng cách ghim Mã trên cột e, thí tốt d5 để đưa Mã vào ô e6, rồi tung ra màn trình diễn của "Xe điên": Xe trắng chiếu liên tục ở hàng 7, không thể bị bắt vì Hậu đen ở d7 sẽ mất. Sau khi von Bardeleben bỏ đi, Steinitz trình bày cho khán giả một đường chiếu hết dài 10 nước.',
    moves:
      '1.e4 e5 2.Nf3 Nc6 3.Bc4 Bc5 4.c3 Nf6 5.d4 exd4 6.cxd4 Bb4+ 7.Nc3 d5 8.exd5 Nxd5 9.O-O Be6 10.Bg5 Be7 11.Bxd5 Bxd5 12.Nxd5 Qxd5 13.Bxe7 Nxe7 14.Re1 f6 15.Qe2 Qd7 16.Rac1 c6 17.d5 cxd5 18.Nd4 Kf7 19.Ne6 Rhc8 20.Qg4 g6 21.Ng5+ Ke8 22.Rxe7+ Kf8 23.Rf7+ Kg8 24.Rg7+ Kh8 25.Rxh7+',
    annotations: {
      '4': 'Giuoco Piano: c3 chuẩn bị d4 để xây trung tâm.',
      '5': 'Đánh vào trung tâm.',
      '6...': 'Tượng chiếu, Trắng chặn bằng Mã.',
      '7':
        'Trắng sẵn sàng hy sinh tốt e4 để phát triển nhanh.',
      '7...':
        'Phản ứng đúng đắn: phá trung tâm bằng d5, giải phóng thế trận.',
      '9': 'Nhập thành. Trắng tạm chịu tốt d4 cô lập nhưng có thế cờ năng động.',
      '10': 'Tượng tấn công Hậu d8 qua ô e7 trống, buộc Đen chặn bằng Be7 – dẫn tới một loạt đổi quân.',
      '13':
        'Sau các cuộc đổi quân, Vua đen vẫn ở e8 và Mã e7 sắp bị ghim trên cột e mở.',
      '14': 'Xe chiếm cột e, ghim Mã e7 vào Vua. Đen không thể nhập thành ngay vì Mã bị tấn công.',
      '14...':
        'Đen định đưa Vua lên f7 ("nhập thành bằng tay") để Xe h8 tham gia và gỡ ghim.',
      '15': 'Thêm Hậu vào cột e, tăng sức ép lên Mã ghim.',
      '16': 'Xe thứ hai chiếm cột c mở. Mọi quân trắng đều đã ở vị trí tích cực.',
      '16...': 'Đen chặn tốt d, nhưng vẫn chưa giải quyết được vấn đề Vua.',
      '17':
        'Thí tốt! Mục đích: giải phóng ô d4 cho Mã để Mã nhảy tới e6 – một ô tiền đồn tuyệt vời.',
      '18': 'Mã nhắm thẳng vào ô e6.',
      '18...': 'Vua đen rời e8, nhưng cột e vẫn mở và Mã e7 vẫn yếu.',
      '19': 'Mã chiếm ô e6, chặn cột e của Đen và nhắm vào c7, g7.',
      '20': 'Hậu đe dọa Qxg7+. Đen phải chặn bằng g6.',
      '21':
        'Mã rời e6 kèm chiếu – và cột e lại mở ra cho Xe e1 tấn công Mã e7. Chú ý: Hậu g4 và Hậu d7 đang nhìn nhau trên đường chéo, nhưng Đen không có thời gian ăn Hậu vì luôn bị chiếu.',
      '22':
        'Thí Xe!! Đen không thể bắt: 22...Qxe7 23.Rxc8+ Rxc8 24.Qxc8+ và Trắng hơn quân; 22...Kxe7 23.Re1+ và Vua đen bị cuốn vào cơn bão chiếu.',
      '22...': 'Đen chạy Vua. Bây giờ Xe trắng ở hàng 7 bắt đầu "điệu nhảy điên".',
      '23':
        'Xe chiếu tiếp! Vua không thể bắt vì f7 được Mã g5 bảo vệ; còn 23...Qxf7 24.Rxc8+ Rxc8 25.Qxc8+ thì Trắng hơn quân.',
      '24':
        'Lại chiếu. Nếu 24...Kxg7 thì 25.Qxd7+ – Hậu đen bị ăn kèm chiếu. Đây là lý do Xe trắng "bất khả xâm phạm".',
      '25':
        'Von Bardeleben rời phòng thi. Steinitz trình diễn đường thắng: 25...Kg8 26.Rg7+ Kh8 27.Qh4+ Kxg7 28.Qh7+ Kf8 29.Qh8+ Ke7 30.Qg7+ Ke8 31.Qg8+ Ke7 32.Qf7+ Kd8 33.Qf8+ Qe8 34.Nf7+ Kd7 35.Qd6#.',
    },
    keyMoments: ['14', '17', '21', '22', '24'],
    lessons: [
      'Vua chưa nhập thành trên cột mở là mục tiêu số một – hãy ghim và dồn quân vào cột đó.',
      'Thí tốt để giải phóng một ô quan trọng cho quân của mình (17.d5 cho Mã ô d4 rồi e6).',
      'Hai quân Hậu đối diện nhau: bên nào có nhịp (chiếu liên tục) sẽ thắng.',
      'Khi tính toán, hãy kiểm tra các nước chiếu, bắt quân và đe dọa của mình trước.',
      'Thái độ thể thao: hãy đầu hàng lịch sự khi thua thay vì bỏ đi như von Bardeleben.',
    ],
  },

  // ------------------------------------------------------------------ 1907
  {
    id: 'rotlewi-rubinstein-1907',
    title: 'Rotlewi – Rubinstein: Ván cờ bất tử của Rubinstein',
    white: 'Georg Rotlewi',
    black: 'Akiba Rubinstein',
    event: 'Łódź',
    year: 1907,
    result: '0-1',
    opening: 'Gambit Hậu từ chối – biến đối xứng (Queen\'s Gambit Declined, Tarrasch/Symmetrical)',
    difficulty: 4,
    context:
      'Akiba Rubinstein là một trong những kỳ thủ mạnh nhất thế giới đầu thế kỷ 20, nổi tiếng với lối chơi cổ điển và kỹ thuật tàn cuộc tuyệt vời. Ván này cho thấy ông cũng là bậc thầy của tấn công phối hợp. Nó thường được gọi là "Ván cờ bất tử của Rubinstein".',
    summary:
      'Trắng lãng phí nhiều nhịp trong khai cuộc (Tượng đi ba lần, Hậu đi hai lần), còn Đen phát triển hài hòa và đặt hai Tượng nhắm thẳng vào Vua trắng. Khi Trắng làm yếu đường chéo của mình bằng f4, Rubinstein tung ra một chuỗi thí quân tuyệt đẹp: thí Mã, thí Hậu, thí hai Xe – để tạo lưới chiếu hết không thể chống đỡ.',
    moves:
      '1.d4 d5 2.Nf3 e6 3.e3 c5 4.c4 Nc6 5.Nc3 Nf6 6.dxc5 Bxc5 7.a3 a6 8.b4 Bd6 9.Bb2 O-O 10.Qd2 Qe7 11.Bd3 dxc4 12.Bxc4 b5 13.Bd3 Rd8 14.Qe2 Bb7 15.O-O Ne5 16.Nxe5 Bxe5 17.f4 Bc7 18.e4 Rac8 19.e5 Bb6+ 20.Kh1 Ng4 21.Be4 Qh4 22.g3 Rxc3 23.gxh4 Rd2 24.Qxd2 Bxe4+ 25.Qg2 Rh3',
    annotations: {
      '3...': 'Đen chơi đối xứng, chuẩn bị Nc6 và phá trung tâm bằng c5.',
      '6': 'Trắng đổi tốt trung tâm, giúp Tượng đen phát triển ngay khi bắt lại.',
      '8': 'Trắng mở rộng cánh hậu, chuẩn bị Bb2 nhắm vào đường chéo dài.',
      '10':
        'Hậu đặt ở d2 không tốt: nó đứng trên cột d, nơi Xe đen sẽ đến. Trắng sẽ phải đi lại Hậu.',
      '11...':
        'Đen bắt tốt c4 ngay sau khi Tượng trắng vừa đi d3 – Trắng mất thêm một nhịp để bắt lại.',
      '12...': 'Tốt b5 đuổi Tượng thêm lần nữa và chuẩn bị Bb7.',
      '13': 'Tượng trắng đã đi tới ba lần trong khai cuộc.',
      '13...': 'Xe đen vào cột d, đối diện Hậu trắng.',
      '14': 'Hậu buộc phải đi lại – thêm một nhịp bị mất.',
      '14...':
        'Tượng b7 chiếm đường chéo dài a8–h1, nhắm thẳng vào g2 và Vua trắng sau khi nhập thành.',
      '15...': 'Mã đổi để mở đường cho các quân đen và kéo Tượng d6 tới e5 với tempo.',
      '17':
        'Đuổi Tượng nhưng làm yếu nghiêm trọng đường chéo a7–g1 dẫn tới Vua trắng. Đây là nước đi mà Rubinstein sẽ trừng phạt.',
      '17...': 'Tượng lùi về c7, chờ cơ hội sang b6.',
      '18...': 'Xe thứ hai chiếm cột c mở. Mọi quân đen đều đã vào vị trí lý tưởng.',
      '19': 'Trắng đuổi Mã f6, nhưng Tượng đen lập tức chiếu trên đường chéo đã bị làm yếu.',
      '19...': 'Tượng chiếm đường chéo a7–g1. Hai Tượng đen giờ như hai khẩu đại bác nhắm vào Vua trắng.',
      '20...':
        'Mã nhảy vào g4, nhắm h2 và mở đường cho Hậu tới h4. Nếu 21.Qxg4 thì 21...Rxd3 và quân Đen tràn vào.',
      '21': 'Trắng chặn đường chéo dài và tấn công Tượng b7.',
      '21...': 'Đe dọa Qxh2# (Mã g4 yểm trợ).',
      '22': 'Nước bắt buộc để chặn chiếu hết – nhưng giờ Hậu đen bị tốt tấn công.',
      '22...':
        'Thí Hậu!! Rubinstein phớt lờ việc Hậu bị tấn công, Xe ăn Mã c3 – quân phòng thủ của ô e4.',
      '23':
        'Trắng ăn Hậu. Nhưng đường chéo dài và cột h quanh Vua trắng đã trống trơn.',
      '23...':
        'Thí tiếp Xe! Xe d2 tấn công Hậu e2. Ý đồ: kéo Hậu trắng ra khỏi việc phòng thủ đường chéo dài.',
      '24': 'Trắng ăn Xe.',
      '24...': 'Tượng ăn Tượng kèm chiếu. Đường chéo dài mở toang.',
      '25': 'Nước chặn duy nhất. Hậu g2 bị ghim vào Vua h1.',
      '25...':
        'Nước kết thúc tuyệt đẹp: đe dọa Rxh2#. Mọi cách phòng thủ của Trắng đều dẫn tới bị chiếu hết trong vài nước. Đen chỉ còn Xe, hai Tượng và Mã nhưng phối hợp hoàn hảo. Trắng đầu hàng.',
    },
    keyMoments: ['17', '20...', '22...', '23...', '25...'],
    lessons: [
      'Đừng đi một quân nhiều lần trong khai cuộc nếu không có lý do bắt buộc – mỗi nhịp đều quý.',
      'Hai Tượng nhắm vào Vua trên hai đường chéo song song là vũ khí tấn công khủng khiếp.',
      'Mỗi nước tốt đều để lại ô yếu không thể sửa: 17.f4 đã mở đường chéo a7–g1.',
      'Khi tính toán đòn thí, hãy tìm quân phòng thủ chủ chốt của đối phương và loại bỏ nó (22...Rxc3).',
      'Trong tấn công, giá trị của một quân phụ thuộc vào vị trí của nó, không phải con số trên giấy.',
    ],
    orientation: 'black',
  },

  // ------------------------------------------------------------------ 1910
  {
    id: 'reti-tartakower-1910',
    title: 'Réti – Tartakower: Chiếu kép chớp nhoáng',
    white: 'Richard Réti',
    black: 'Savielly Tartakower',
    event: 'Ván giao hữu, Vienna',
    year: 1910,
    result: '1-0',
    opening: 'Phòng thủ Caro-Kann (Caro-Kann Defence)',
    difficulty: 2,
    context:
      'Richard Réti và Savielly Tartakower đều là những nhà lý luận cờ vua hàng đầu đầu thế kỷ 20, cha đẻ của trường phái "siêu hiện đại". Ván giao hữu ngắn ngủi này ở Vienna trở thành một trong những ván cờ nhanh nổi tiếng nhất mọi thời đại.',
    summary:
      'Đen bắt tốt và phát triển chậm chạp. Trắng nhập thành dài, đặt Xe lên cột d, rồi để mặc Mã cho Đen ăn. Khi Đen tham ăn, Réti thí Hậu kéo Vua đen lên cột d và kết thúc bằng chiếu kép rồi chiếu hết chỉ trong 11 nước.',
    moves:
      '1.e4 c6 2.d4 d5 3.Nc3 dxe4 4.Nxe4 Nf6 5.Qd3 e5 6.dxe5 Qa5+ 7.Bd2 Qxe5 8.O-O-O Nxe4 9.Qd8+ Kxd8 10.Bg5+ Kc7 11.Bd8#',
    annotations: {
      '1...': 'Caro-Kann: chuẩn bị d5 với tốt c6 hỗ trợ – một khai cuộc rất vững chắc.',
      '3...': 'Đen đổi tốt trung tâm, biến chính.',
      '4...': 'Đen phát triển và thách thức Mã e4.',
      '5':
        'Một nước khác thường: Hậu bảo vệ Mã e4 và chuẩn bị nhập thành dài nhanh chóng. Nước này đặt Hậu trên cột d – sẽ quan trọng về sau.',
      '5...': 'Đen muốn mở thế cờ và phát triển nhanh, sẵn sàng hy sinh tốt.',
      '6...': 'Hậu chiếu và sẽ thu lại tốt e5.',
      '7': 'Tượng chặn chiếu và phát triển, sẵn sàng cho nhập thành dài.',
      '7...': 'Đen thu lại tốt. Nhưng Vua đen vẫn còn ở e8, Đen mới phát triển Mã và Hậu.',
      '8':
        'Nhập thành dài, đặt Xe lên cột d – ngay đối diện Vua đen. Trắng để Mã e4 không được bảo vệ, như một miếng mồi.',
      '8...':
        'Sai lầm chết người: tham ăn Mã. Đen cần phát triển quân, ví dụ 8...Be7, rồi nhập thành.',
      '9':
        'Thí Hậu!! Kéo Vua đen ra cột d, nơi Xe d1 đang chờ sẵn.',
      '9...': 'Nước bắt buộc: Vua phải ăn Hậu.',
      '10':
        'Chiếu kép! Tượng g5 chiếu theo đường chéo, đồng thời Xe d1 chiếu theo cột d. Không thể chặn cả hai – Vua phải chạy. Nếu 10...Ke8 thì 11.Rd8#.',
      '11':
        'Chiếu hết! Tượng d8 chiếu Vua c7, được Xe d1 bảo vệ. Vua không còn ô nào: b6 bị Tượng khống chế, d6 và d7 bị Xe khống chế, các ô còn lại bị chính quân Đen chặn.',
    },
    keyMoments: ['8', '8...', '9', '10'],
    lessons: [
      'Không để Vua ở trung tâm trên một cột đang mở hoặc sắp mở.',
      'Khi đối thủ "tặng" quân, hãy kiểm tra các nước chiếu và đòn chiến thuật trước khi ăn.',
      'Chiếu kép là đòn mạnh nhất: chỉ có thể tránh bằng cách di chuyển Vua.',
      'Nhập thành dài vừa bảo vệ Vua vừa đưa Xe vào cột d ngay lập tức.',
    ],
  },

  // ------------------------------------------------------------------ 1912
  {
    id: 'lasker-thomas-1912',
    title: 'Ed. Lasker – Thomas: Cuộc săn Vua',
    white: 'Edward Lasker',
    black: 'George Alan Thomas',
    event: 'Ván giao hữu, London',
    year: 1912,
    result: '1-0',
    opening: 'Phòng thủ Hà Lan (Dutch Defence)',
    difficulty: 2,
    context:
      'Edward Lasker (không phải nhà vô địch thế giới Emanuel Lasker) là kỳ thủ mạnh người Đức, sau này sang Mỹ. Ván giao hữu tại Câu lạc bộ cờ London này nổi tiếng với cuộc "săn Vua" kỳ lạ nhất lịch sử: Vua đen bị lùa từ g8 tới tận g1.',
    summary:
      'Trắng phát triển hướng quân về cánh vua. Khi Đen mắc sai lầm nhỏ, Lasker thí Hậu ở h7 bằng một đòn chiếu kép, rồi dùng các quân nhẹ và tốt dồn Vua đen qua toàn bộ bàn cờ cho tới khi bị chiếu hết ở hàng 1 của chính Trắng.',
    moves:
      '1.d4 e6 2.Nf3 f5 3.Nc3 Nf6 4.Bg5 Be7 5.Bxf6 Bxf6 6.e4 fxe4 7.Nxe4 b6 8.Ne5 O-O 9.Bd3 Bb7 10.Qh5 Qe7 11.Qxh7+ Kxh7 12.Nxf6+ Kh6 13.Neg4+ Kg5 14.h4+ Kf4 15.g3+ Kf3 16.Be2+ Kg2 17.Rh2+ Kg1 18.Kd2#',
    annotations: {
      '2...': 'Phòng thủ Hà Lan: tốt f5 kiểm soát ô e4 và chuẩn bị tấn công cánh vua, nhưng làm yếu đường chéo e8–h5.',
      '4': 'Tượng ghim Mã f6 vào Hậu d8 (qua ô e7 trống).',
      '5': 'Đổi Tượng lấy Mã để loại bỏ quân kiểm soát e4.',
      '6': 'Đánh vào trung tâm, mở thế cờ.',
      '7': 'Mã chiếm e4 rất mạnh, nhắm vào f6 và g5.',
      '7...': 'Đen chuẩn bị đưa Tượng lên b7.',
      '8': 'Mã thứ hai nhảy vào e5, nhắm f7 và g6.',
      '9': 'Tượng nhắm thẳng vào h7. Ba quân trắng đã hướng về Vua đen.',
      '10': 'Hậu nhắm vào h7. Hậu, Tượng d3 và Mã e4 đều đã hướng về Vua đen.',
      '10...':
        'Sai lầm! Đen không thấy đòn thí Hậu. Cần loại bỏ bớt quân tấn công, ví dụ 10...Bxe5.',
      '11': 'Thí Hậu!! Vua buộc phải bắt.',
      '12':
        'Chiếu kép! Mã f6 chiếu, đồng thời đường chéo của Tượng d3 mở ra chiếu h7. Nếu 12...Kh8 thì 13.Ng6# – chiếu hết ngay.',
      '12...': 'Vua bị đẩy ra khỏi nơi trú ẩn.',
      '13': 'Mã còn lại chiếu tiếp, Vua đen phải tiến lên.',
      '14': 'Tốt cũng tham gia săn Vua.',
      '15': 'Tiếp tục chiếu bằng tốt.',
      '16': 'Tượng chiếu, Vua đen bị đẩy sâu hơn vào trận địa Trắng.',
      '17': 'Xe chiếu – Vua đen chỉ còn ô g1.',
      '17...': 'Vua đen đã đi từ g8 tới g1 – bên kia bàn cờ!',
      '18':
        'Chiếu hết bằng chiếu mở: Vua trắng bước sang d2, mở hàng 1 cho Xe a1 chiếu Vua g1. (18.O-O-O# cũng là chiếu hết – thậm chí còn đẹp hơn.)',
    },
    keyMoments: ['10...', '11', '12', '18'],
    lessons: [
      'Ô h7 (h2) được bảo vệ chỉ bởi Vua là mục tiêu kinh điển của đòn thí.',
      'Chiếu kép thường là đòn mở màn cho các cuộc tấn công thắng lợi.',
      'Khi đối phương dồn nhiều quân vào cánh vua, hãy đổi bớt quân tấn công.',
      'Khi Vua đối phương bị kéo ra ngoài, hãy chiếu liên tục để không cho đối phương thời gian phòng thủ.',
      'Cả tốt và Vua cũng có thể tham gia tấn công.',
    ],
  },

  // ------------------------------------------------------------------ 1938
  {
    id: 'botvinnik-capablanca-1938',
    title: 'Botvinnik – Capablanca: Tượng ngủ quên thức giấc',
    white: 'Mikhail Botvinnik',
    black: 'José Raúl Capablanca',
    event: 'Giải AVRO, Hà Lan',
    year: 1938,
    result: '1-0',
    opening: 'Phòng thủ Nimzo-Ấn, biến Rubinstein (Nimzo-Indian Defence, 4.e3)',
    difficulty: 5,
    context:
      'Giải AVRO 1938 quy tụ tám kỳ thủ mạnh nhất thế giới. Botvinnik, nhà vô địch tương lai, gặp cựu vô địch thế giới Capablanca – được mệnh danh là "cỗ máy cờ". Ván cờ là kiệt tác kết hợp giữa chiến lược trung tâm và đòn phối hợp sâu.',
    summary:
      'Đen đổi Tượng lấy Mã làm yếu cấu trúc tốt Trắng, rồi đưa quân sang cánh hậu để ăn tốt. Botvinnik bình tĩnh xây dựng trung tâm bằng f3–e4, đẩy tốt tới e5, f5, tạo ra một tốt thông ở e6. Đỉnh cao là nước 30.Ba3!!: Tượng "xấu" bị chôn ở b2 suốt ván bỗng hy sinh để kéo Hậu đen khỏi ô phong tỏa, mở đường cho đòn chiếu và tốt phong cấp.',
    moves:
      '1.d4 Nf6 2.c4 e6 3.Nc3 Bb4 4.e3 d5 5.a3 Bxc3+ 6.bxc3 c5 7.cxd5 exd5 8.Bd3 O-O 9.Ne2 b6 10.O-O Ba6 11.Bxa6 Nxa6 12.Bb2 Qd7 13.a4 Rfe8 14.Qd3 c4 15.Qc2 Nb8 16.Rae1 Nc6 17.Ng3 Na5 18.f3 Nb3 19.e4 Qxa4 20.e5 Nd7 21.Qf2 g6 22.f4 f5 23.exf6 Nxf6 24.f5 Rxe1 25.Rxe1 Re8 26.Re6 Rxe6 27.fxe6 Kg7 28.Qf4 Qe8 29.Qe5 Qe7 30.Ba3 Qxa3 31.Nh5+ gxh5 32.Qg5+ Kf8 33.Qxf6+ Kg8 34.e7 Qc1+ 35.Kf2 Qc2+ 36.Kg3 Qd3+ 37.Kh4 Qe4+ 38.Kxh5 Qe2+ 39.Kh4 Qe4+ 40.g4 Qe1+ 41.Kh5',
    annotations: {
      '3...':
        'Phòng thủ Nimzo-Ấn: Tượng ghim Mã c3, kiểm soát e4 và sẵn sàng đổi Tượng lấy Mã để làm hỏng cấu trúc tốt của Trắng.',
      '5': 'Trắng buộc Đen phải quyết định ngay: đổi lấy Mã. Đổi lại, Trắng có cặp Tượng và trung tâm.',
      '6': 'Trắng có tốt chồng ở cột c nhưng thêm một tốt kiểm soát trung tâm (c3 hỗ trợ d4).',
      '7': 'Trắng đổi tốt để mở đường cho Tượng và chuẩn bị cấu trúc trung tâm.',
      '9':
        'Mã đi e2 thay vì f3 – kế hoạch then chốt: giữ cho tốt f được tự do tiến f3 rồi e4 xây trung tâm.',
      '10...': 'Đen đổi Tượng trắng sáng – quân sẽ hỗ trợ đẩy e4 và tấn công cánh vua.',
      '12':
        'Tượng b2 trông như một "Tượng xấu" bị tốt c3, d4 chặn. Hãy nhớ quân này – nó sẽ là người hùng.',
      '13': 'Tốt a4 hạn chế hoạt động của Đen ở cánh hậu.',
      '14...':
        'Capablanca khóa cánh hậu và giành ô b3 cho Mã. Nhưng nước này giải tỏa sức ép lên d4, cho Trắng rảnh tay đẩy e4 ở trung tâm. Nhiều nhà bình luận coi đây là sai lầm chiến lược.',
      '15...': 'Mã bắt đầu hành trình dài b8–c6–a5–b3 sang cánh hậu – xa Vua của mình.',
      '16': 'Xe chuẩn bị cho e4. Trắng tập trung vào trung tâm và cánh vua.',
      '18': 'Chuẩn bị e4.',
      '18...': 'Mã đen tới b3 – đẹp nhưng không tham gia vào trận đánh chính.',
      '19': 'Đẩy e4: trung tâm Trắng bắt đầu chuyển động.',
      '19...': 'Đen ăn tốt a4. Hậu và Mã đen đều đang ở cánh hậu xa xôi.',
      '20': 'Tốt e5 đuổi Mã f6 – quân phòng thủ tốt nhất của Vua đen.',
      '21': 'Hậu chuyển sang cánh vua, chuẩn bị f4–f5.',
      '22...': 'Đen chặn tốt f để không cho f5.',
      '23':
        'Bắt tốt qua đường (en passant): tốt e5 bắt tốt f5 vừa đi hai ô, mở cột e cho Trắng.',
      '24': 'Tốt f5 tiến tiếp, mở đường tấn công và tạo tốt thông.',
      '26': 'Xe xâm nhập ô e6, buộc đổi Xe để tạo tốt thông e6.',
      '27': 'Tốt thông e6 chỉ còn cách ô phong cấp hai bước.',
      '29': 'Hậu chiếm ô trung tâm e5, ép Đen phải dùng Hậu phong tỏa tốt.',
      '29...': 'Hậu đen phong tỏa ô e7. Có vẻ như Đen đã đứng vững…',
      '30':
        'Nước đi bất hủ! Tượng b2 "ngủ quên" cả ván bỗng hy sinh để kéo Hậu đen khỏi ô phong tỏa e7. Nếu Hậu không ăn, Tượng sẽ đổi Hậu và tốt e6 đi thẳng.',
      '30...': 'Hậu đen ăn Tượng, rời khỏi ô e7.',
      '31':
        'Thí Mã! Mở đường cho Hậu trắng tới g5 với chiếu, sau đó ăn Mã f6 – quân phòng thủ cuối cùng.',
      '32': 'Hậu chiếu, chuẩn bị ăn Mã f6.',
      '33': 'Ăn Mã kèm chiếu. Bây giờ tốt e7 sẽ tiến lên.',
      '34': 'Tốt tiến tới e7, đe dọa phong Hậu. Đen chỉ còn cách chiếu liên tục.',
      '35': 'Vua trắng bắt đầu cuộc hành trình trốn chiếu về phía cánh vua.',
      '38': 'Vua trắng ăn tốt h5 trên đường chạy trốn.',
      '40': 'Tốt g4 chặn chiếu, Vua sắp tìm được nơi trú ẩn.',
      '41':
        'Hết chiếu! Đen không thể ngăn tốt e7 phong Hậu. Capablanca đầu hàng.',
    },
    keyMoments: ['14...', '23', '27', '30', '31'],
    lessons: [
      'Kế hoạch f3–e4 là vũ khí kinh điển của Trắng chống lại cấu trúc tốt chồng trong Nimzo-Ấn.',
      'Đưa quân ra xa Vua để ăn tốt có thể phải trả giá đắt khi đối phương tấn công ở trung tâm.',
      'Tốt thông được hỗ trợ ở hàng thứ 6 là một quân đáng giá như quân nặng.',
      'Đánh lạc hướng (deflection): kéo quân phong tỏa khỏi ô then chốt bằng cách thí quân (30.Ba3!!).',
      'Không có quân "xấu" vĩnh viễn – một quân bị động có thể trở thành nhân vật chính khi thế cờ thay đổi.',
    ],
  },

  // ------------------------------------------------------------------ 1956
  {
    id: 'van-co-the-ky-1956',
    title: 'Ván cờ thế kỷ (The Game of the Century)',
    white: 'Donald Byrne',
    black: 'Robert James Fischer',
    event: 'Giải tưởng niệm Rosenwald, New York',
    year: 1956,
    result: '0-1',
    opening: 'Phòng thủ Grünfeld (Grünfeld Defence, 5.Bf4)',
    difficulty: 4,
    context:
      'Bobby Fischer khi ấy mới 13 tuổi, còn Donald Byrne là một trong những kỳ thủ hàng đầu nước Mỹ. Nhà báo cờ Hans Kmoch gọi ván này là "Ván cờ thế kỷ". 15 năm sau, Fischer trở thành nhà vô địch thế giới.',
    summary:
      'Trắng chậm nhập thành và Fischer trừng phạt bằng một chuỗi đòn phối hợp: Mã nhảy vào góc a4, thí Mã ở e4, rồi nước đi bất hủ 17...Be6!! bỏ Hậu. Đổi lại, cặp Tượng và Mã của Đen tạo ra "cối xay gió" – liên tục chiếu và thu về vô số quân. Màn kết là một mạng chiếu hết bằng Xe, hai Tượng và Mã.',
    moves:
      '1.Nf3 Nf6 2.c4 g6 3.Nc3 Bg7 4.d4 O-O 5.Bf4 d5 6.Qb3 dxc4 7.Qxc4 c6 8.e4 Nbd7 9.Rd1 Nb6 10.Qc5 Bg4 11.Bg5 Na4 12.Qa3 Nxc3 13.bxc3 Nxe4 14.Bxe7 Qb6 15.Bc4 Nxc3 16.Bc5 Rfe8+ 17.Kf1 Be6 18.Bxb6 Bxc4+ 19.Kg1 Ne2+ 20.Kf1 Nxd4+ 21.Kg1 Ne2+ 22.Kf1 Nc3+ 23.Kg1 axb6 24.Qb4 Ra4 25.Qxb6 Nxd1 26.h3 Rxa2 27.Kh2 Nxf2 28.Re1 Rxe1 29.Qd8+ Bf8 30.Nxe1 Bd5 31.Nf3 Ne4 32.Qb8 b5 33.h4 h5 34.Ne5 Kg7 35.Kg1 Bc5+ 36.Kf1 Ng3+ 37.Ke1 Bb4+ 38.Kd1 Bb3+ 39.Kc1 Ne2+ 40.Kb1 Nc3+ 41.Kc1 Rc2#',
    annotations: {
      '4...': 'Đen nhập thành sớm – Vua an toàn trước khi bắt đầu đánh nhau. Hãy so sánh với Vua trắng.',
      '5...': 'Phản công trung tâm kiểu Grünfeld.',
      '6...': 'Đen đổi tốt, kéo Hậu trắng ra.',
      '8': 'Trắng xây trung tâm lớn với e4 và d4, nhưng vẫn chưa phát triển Tượng f1 và chưa nhập thành.',
      '9...': 'Mã đuổi Hậu.',
      '10...': 'Tượng ghim Mã f3 và phát triển. Đen đã sẵn sàng toàn bộ quân.',
      '11':
        'Trắng tiếp tục đi Tượng lần nữa thay vì phát triển 11.Be2 và nhập thành. Vua trắng vẫn ở e1 – Fischer sẽ trừng phạt điều này.',
      '11...':
        'Nước đi bất ngờ: Mã nhảy vào góc tấn công Mã c3! Nếu 12.Nxa4 thì 12...Nxe4 với nhiều đe dọa vào Hậu c5, tốt e7 và Tượng g5.',
      '12': 'Trắng giữ Hậu, nhưng Đen lập tức đổi Mã phá cấu trúc tốt.',
      '13...':
        'Mã ăn tốt e4! Mã tấn công tốt c3 và Tượng g5, đường chéo dài của Tượng g7 mở ra. Đen sẵn sàng bỏ tốt e7 và cả Xe f8 để giữ thế chủ động.',
      '14': 'Trắng ăn tốt e7 và tấn công Xe f8.',
      '14...':
        'Hậu rời d8 (đang bị Tượng e7 tấn công) và Đen bình thản bỏ mặc Xe f8 – sự chủ động quan trọng hơn.',
      '15': 'Trắng phát triển Tượng, chuẩn bị nhập thành.',
      '15...': 'Mã lại ăn tốt c3, tấn công Xe d1. Thế cờ ngày càng phức tạp.',
      '16': 'Tượng tấn công Hậu b6.',
      '16...': 'Chiếu! Byrne chọn Kf1 và mất quyền nhập thành.',
      '17...':
        'NƯỚC ĐI THẾ KỶ! Fischer bỏ Hậu. Nếu 18.Bxe6 thì 18...Qb5+ 19.Kg1 Ne2+ 20.Kf1 Ng3+ 21.Kg1 Qf1+!! 22.Rxf1 Ne2# – chiếu hết ngộp (smothered mate). Byrne chọn ăn Hậu.',
      '18...': 'Tượng chiếu – bắt đầu "cối xay gió".',
      '19...': 'Mã chiếu, chuẩn bị chiếu mở.',
      '20...': 'Chiếu mở: Mã ăn tốt d4, Tượng c4 tiếp tục chiếu.',
      '21...': 'Cối xay gió quay tiếp…',
      '22...': 'Mã chiếu và tấn công Xe d1. Đen thu quân liên tục.',
      '23...':
        'Ăn lại Tượng b6. Đen đã trả Hậu nhưng đổi lại có Tượng, Mã, thêm tốt, sắp ăn tiếp Xe d1 – và các quân Đen phối hợp tuyệt vời.',
      '24...': 'Xe tấn công Hậu trắng.',
      '25...': 'Ăn Xe d1. Đen có hai Xe, hai Tượng và Mã, Trắng chỉ còn Hậu, Xe h1 bị kẹt và Mã – Đen hơn hẳn vật chất.',
      '26...': 'Xe ăn tốt a2, tạo tốt thông.',
      '27...': 'Mã ăn thêm tốt f2. Các quân Đen tạo mạng lưới quanh Vua trắng.',
      '30...': 'Hai Tượng và Mã bắt đầu dệt lưới chiếu hết.',
      '32...': 'Tốt b tiến lên, giải phóng thêm không gian cho quân Đen.',
      '35...': 'Chuỗi chiếu bắt đầu: Vua trắng bị lùa về cánh hậu.',
      '41...':
        'Chiếu hết! Xe, hai Tượng và Mã phối hợp hoàn hảo. Một cậu bé 13 tuổi vừa tạo ra ván cờ đẹp nhất thế kỷ.',
    },
    keyMoments: ['11', '11...', '13...', '17...', '41...'],
    lessons: [
      'Vua chưa nhập thành là tử huyệt: Byrne bị trừng phạt vì đi Tượng nhiều lần thay vì nhập thành.',
      'Thí Hậu có thể đúng nếu đổi lại được nhiều quân phối hợp và nhịp tấn công.',
      '"Cối xay gió" (chiếu – chiếu mở luân phiên) có thể thu về rất nhiều vật chất.',
      'Hãy luôn tìm kiếm đòn chiếu hết ngộp khi Vua đối phương bị chính quân mình vây quanh.',
      'Nhiều quân nhẹ phối hợp thường mạnh hơn một Hậu đơn độc.',
    ],
    orientation: 'black',
  },

  // ------------------------------------------------------------------ 1972
  {
    id: 'fischer-spassky-1972-van-6',
    title: 'Fischer – Spassky, ván 6 trận tranh ngôi vô địch 1972',
    white: 'Robert James Fischer',
    black: 'Boris Spassky',
    event: 'Trận tranh ngôi vô địch thế giới, Reykjavik',
    year: 1972,
    result: '1-0',
    opening: 'Gambit Hậu từ chối – hệ thống Tartakower (Queen\'s Gambit Declined, Tartakower)',
    difficulty: 4,
    context:
      '"Trận đấu thế kỷ" giữa Bobby Fischer (Mỹ) và nhà vô địch Boris Spassky (Liên Xô) giữa thời Chiến tranh Lạnh. Fischer gần như cả sự nghiệp chỉ khai cuộc 1.e4, nên nước 1.c4 trong ván 6 là một cú sốc lớn. Sau ván đấu, chính Spassky đứng dậy vỗ tay tán thưởng cùng khán giả.',
    summary:
      'Fischer chơi một ván cờ chiến lược hoàn hảo: tạo ra cặp tốt treo c5–d5 cho Đen, rồi phá bỏ nó bằng e4, cố định tốt thông d4 của Đen, và dùng tốt e cùng cột f để tấn công. Không có một đòn chiến thuật hoa mỹ nào – chỉ là sự rõ ràng và chính xác tuyệt đối.',
    moves:
      '1.c4 e6 2.Nf3 d5 3.d4 Nf6 4.Nc3 Be7 5.Bg5 O-O 6.e3 h6 7.Bh4 b6 8.cxd5 Nxd5 9.Bxe7 Qxe7 10.Nxd5 exd5 11.Rc1 Be6 12.Qa4 c5 13.Qa3 Rc8 14.Bb5 a6 15.dxc5 bxc5 16.O-O Ra7 17.Be2 Nd7 18.Nd4 Qf8 19.Nxe6 fxe6 20.e4 d4 21.f4 Qe7 22.e5 Rb8 23.Bc4 Kh8 24.Qh3 Nf8 25.b3 a5 26.f5 exf5 27.Rxf5 Nh7 28.Rcf1 Qd8 29.Qg3 Re7 30.h4 Rbb7 31.e6 Rbc7 32.Qe5 Qe8 33.a4 Qd8 34.R1f2 Qe8 35.R2f3 Qd8 36.Bd3 Qe8 37.Qe4 Nf6 38.Rxf6 gxf6 39.Rxf6 Kg8 40.Bc4 Kh8 41.Qf4',
    annotations: {
      '1': 'Cú sốc! Fischer – người gần như chỉ chơi 1.e4 – khai cuộc bằng 1.c4. Ván cờ nhanh chóng chuyển thành Gambit Hậu.',
      '7...':
        'Hệ thống Tartakower: Tượng hậu sẽ lên b7 hoặc e6. Đây là vũ khí yêu thích của Spassky.',
      '8': 'Trắng đổi để giản hóa trung tâm.',
      '10...': 'Đen có tốt d5 trung tâm, nhưng nó sẽ trở thành mục tiêu.',
      '11': 'Xe chiếm cột c, tăng sức ép lên c7 và tốt c5 sắp tới.',
      '12': 'Hậu nhắm vào a7 và gây sức ép lên cánh hậu.',
      '12...': 'Đen phá tốt c5 – sẽ tạo ra cặp tốt treo c5, d5.',
      '13': 'Hậu a3 ghim tốt c5 vào Hậu e7, giữ sức ép.',
      '14': 'Tượng buộc Đen đẩy a6, làm yếu thêm cánh hậu.',
      '15':
        'Trắng đổi để tạo ra "cặp tốt treo" c5–d5: chúng kiểm soát nhiều ô trung tâm nhưng cũng là mục tiêu dễ bị tấn công.',
      '16...': 'Đen dùng Xe a7 để bảo vệ ngang hàng 7.',
      '18': 'Mã nhảy vào d4 – ô trung tâm lý tưởng, nhắm vào Tượng e6.',
      '19':
        'Đổi Mã lấy Tượng: tạo ra tốt e6 yếu cho Đen và mở cột f cho Trắng.',
      '20':
        'Phá cặp tốt treo! Nếu 20...dxe4 thì cặp tốt bị chia cắt và tốt c5 trở nên yếu; Đen chọn đẩy d4 tạo tốt thông, nhưng nó bị phong tỏa.',
      '20...': 'Tốt d4 bị chặn đứng và đường chéo a2–g8 mở ra cho Tượng trắng.',
      '21': 'Tốt f chuẩn bị tiến, nhắm vào tốt e6 yếu.',
      '22': 'Tốt e5 giành không gian, khống chế các ô d6 và f6, hạn chế Mã đen.',
      '23': 'Tượng chiếm đường chéo a2–g8, tấn công tốt e6.',
      '24': 'Hậu chuyển sang cánh vua, cùng Tượng tấn công e6.',
      '26': 'Phá vỡ! Tốt f5 mở cột f cho Xe.',
      '27': 'Xe chiếm cột f mở. Trắng dồn quân vào cánh vua.',
      '28': 'Hai Xe chồng trên cột f.',
      '30': 'Tốt h tiến lên giành không gian, chặn ô g5 của Đen.',
      '31': 'Tốt e6 tiến lên, chia cắt quân Đen và nhường ô e5 cho Hậu.',
      '32': 'Hậu chiếm ô trung tâm e5 cực mạnh.',
      '33':
        'Fischer bình thản đi những nước chờ đợi. Đen không có nước nào hữu ích – đây là "zugzwang chiến lược".',
      '34': 'Trắng sắp xếp lại các Xe.',
      '36': 'Tượng chuyển sang đường chéo b1–h7, nhắm vào Mã h7 và Vua đen.',
      '37': 'Hậu và Tượng xếp thành khẩu đội trên đường chéo b1–h7: ô h7 bị tấn công dữ dội.',
      '38': 'Đòn phá! Xe ăn Mã, phá tan tuyến phòng thủ cuối cùng.',
      '39': 'Xe ăn tốt f6, Vua đen hoàn toàn trơ trọi.',
      '41':
        'Hậu nhắm vào h6 phối hợp với Xe f6 và tốt e6. Không thể chống đỡ – Spassky đầu hàng.',
    },
    keyMoments: ['1', '15', '20', '26', '38'],
    lessons: [
      'Cặp tốt treo (c5–d5) mạnh khi được hỗ trợ nhưng là mục tiêu khi bị tấn công đúng cách.',
      'Đổi đúng quân: đổi Mã lấy Tượng e6 tạo ra tốt yếu và mở cột cho Trắng.',
      'Tốt thông bị phong tỏa (d4) không đáng sợ; hãy chặn nó rồi tận dụng các ô xung quanh.',
      'Những nước chờ đợi khi đối thủ không có kế hoạch có thể làm tăng ưu thế.',
      'Không cần đòn thí hoa mỹ: một kế hoạch rõ ràng, chính xác cũng tạo nên kiệt tác.',
    ],
  },

  // ------------------------------------------------------------------ 1985
  {
    id: 'karpov-kasparov-1985-van-16',
    title: 'Karpov – Kasparov, ván 16 (1985): Con bạch tuộc ở d3',
    white: 'Anatoly Karpov',
    black: 'Garry Kasparov',
    event: 'Trận tranh ngôi vô địch thế giới, Moscow',
    year: 1985,
    result: '0-1',
    opening: 'Phòng thủ Sicilia – Gambit Kasparov (Sicilian Taimanov, Kasparov Gambit)',
    difficulty: 5,
    context:
      'Trận tranh ngôi vô địch thế giới năm 1985 giữa nhà vô địch Anatoly Karpov và kẻ thách đấu 22 tuổi Garry Kasparov. Ván 16 là một trong những chiến thắng đẹp nhất của Kasparov, giúp anh vượt lên dẫn trước; cuối trận anh trở thành nhà vô địch thế giới thứ 13.',
    summary:
      'Kasparov thí tốt d5 để chiếm ưu thế phát triển, tận dụng Mã a3 lạc chỗ của Trắng. Một Mã đen nhảy vào ô d3 – được gọi là "con bạch tuộc" – làm tê liệt toàn bộ thế trận Trắng suốt hơn 15 nước. Khi Karpov cuối cùng ăn được Mã, Kasparov kết thúc bằng một chuỗi đòn chiến thuật dứt khoát ở hàng 1.',
    moves:
      '1.e4 c5 2.Nf3 e6 3.d4 cxd4 4.Nxd4 Nc6 5.Nb5 d6 6.c4 Nf6 7.N1c3 a6 8.Na3 d5 9.cxd5 exd5 10.exd5 Nb4 11.Be2 Bc5 12.O-O O-O 13.Bf3 Bf5 14.Bg5 Re8 15.Qd2 b5 16.Rad1 Nd3 17.Nab1 h6 18.Bh4 b4 19.Na4 Bd6 20.Bg3 Rc8 21.b3 g5 22.Bxd6 Qxd6 23.g3 Nd7 24.Bg2 Qf6 25.a3 a5 26.axb4 axb4 27.Qa2 Bg6 28.d6 g4 29.Qd2 Kg7 30.f3 Qxd6 31.fxg4 Qd4+ 32.Kh1 Nf6 33.Rf4 Ne4 34.Qxd3 Nf2+ 35.Rxf2 Bxd3 36.Rfd2 Qe3 37.Rxd3 Rc1 38.Nb2 Qf2 39.Nd2 Rxd1+ 40.Nxd1 Re1+',
    annotations: {
      '1...': 'Phòng thủ Sicilia – vũ khí chiến đấu số một của Kasparov.',
      '5': 'Mã nhảy b5 nhắm vào ô d6, chuẩn bị c4.',
      '6':
        'Cấu trúc "gọng kìm Maróczy": tốt c4 và e4 khống chế ô d5, khiến Đen rất khó giải phóng thế trận.',
      '8': 'Mã a3 đứng ở rìa bàn cờ, khá lạc lõng – Kasparov sẽ khai thác điều này.',
      '8...':
        'Gambit Kasparov! Đen thí tốt d để phá gọng kìm và phát triển nhanh trong lúc Mã a3 còn ở ngoài trận.',
      '10': 'Trắng hơn một tốt, nhưng Đen phát triển vượt trội.',
      '10...': 'Mã nhảy b4 nhắm vào ô d3 và tốt d5.',
      '11...': 'Tượng phát triển với hướng nhắm f2.',
      '13...': 'Tượng f5 kiểm soát ô d3 – chuẩn bị cho Mã.',
      '15...': 'Tốt b5 khóa Mã a3: Mã không thể đi c4.',
      '16...':
        '"Con bạch tuộc": Mã ở d3 được Tượng f5 bảo vệ, cắt đứt liên lạc giữa các quân trắng và khống chế e1, f2, b2, c1. Trắng gần như không thể đuổi nó đi.',
      '17': 'Mã a3 phải lùi về b1 để tìm đường quay lại – dấu hiệu Trắng đang gặp khó.',
      '18...': 'Tốt b4 đuổi Mã c3 ra rìa bàn cờ.',
      '19': 'Cả hai Mã trắng đều ở rìa (a4, b1) – rất kém hoạt động.',
      '21...': 'Đen giành không gian ở cánh vua, kiểm soát ô f4.',
      '23...': 'Mã thứ hai đi vòng để tham gia trận đánh.',
      '27...': 'Tượng lùi về g6 vẫn bảo vệ Mã d3.',
      '28': 'Trắng trả lại tốt để tìm kiếm phản công.',
      '28...': 'Tốt g4 chiếm thêm không gian, khóa cánh vua Trắng.',
      '30...': 'Đen thu lại tốt. Mã d3 vẫn đứng vững.',
      '31...': 'Hậu chiếu, chiếm ô trung tâm d4.',
      '32...': 'Mã thứ hai lao vào trận.',
      '33...': 'Mã nhắm vào f2 và c3.',
      '34': 'Trắng cuối cùng ăn được "con bạch tuộc"… nhưng quá muộn.',
      '34...': 'Mã chiếu chĩa đôi Vua và Hậu.',
      '36...': 'Hậu xâm nhập e3, nhắm vào hàng 1.',
      '37...': 'Xe xâm nhập c1, tấn công Xe d1 đang bảo vệ hàng cuối.',
      '38...': 'Hậu xâm nhập f2, sát Vua trắng: Đen đe dọa chiếu hết chỉ trong hai nước.',
      '40...':
        'Chiếu! Trắng chỉ có thể chặn bằng Nf1 hoặc Bf1, và sau 41...Rxf1+ Trắng sẽ bị chiếu hết ngay nước tiếp theo. Karpov đầu hàng.',
    },
    keyMoments: ['8...', '16...', '19', '34...', '40...'],
    lessons: [
      'Một quân mạnh ở tiền đồn sâu trong trận địa đối phương có thể làm tê liệt toàn bộ thế trận.',
      'Thí tốt để giành nhịp phát triển là ý tưởng hiện đại, không chỉ của thế kỷ 19.',
      'Mã ở rìa bàn cờ thường là Mã yếu ("Mã ở rìa, buồn thiu").',
      'Hàng cuối không được bảo vệ là điểm yếu chết người ngay cả với nhà vô địch.',
      'Khi đối phương bị tê liệt, hãy kiên nhẫn tăng cường thế trận trước khi ra đòn quyết định.',
    ],
    orientation: 'black',
  },

  // ------------------------------------------------------------------ 1997
  {
    id: 'deep-blue-kasparov-1997-van-6',
    title: 'Deep Blue – Kasparov, ván 6 (1997): Máy tính chiến thắng',
    white: 'Deep Blue (IBM)',
    black: 'Garry Kasparov',
    event: 'Trận tái đấu IBM, New York',
    year: 1997,
    result: '1-0',
    opening: 'Phòng thủ Caro-Kann, biến Karpov (Caro-Kann, 4...Nd7 5.Ng5)',
    difficulty: 2,
    context:
      'Năm 1997, siêu máy tính Deep Blue của IBM tái đấu nhà vô địch thế giới Garry Kasparov trong trận đấu 6 ván. Trước ván cuối tỷ số là 2,5–2,5. Thua ván này, Kasparov trở thành nhà vô địch thế giới đầu tiên thua một trận đấu trước máy tính theo thể thức cờ tiêu chuẩn – một cột mốc lịch sử của trí tuệ nhân tạo.',
    summary:
      'Kasparov mắc một sai lầm lý thuyết đã được biết từ trước (7...h6?), cho phép Deep Blue thí Mã ở e6. Vua đen mất quyền nhập thành, quân Đen bị kẹt, và chỉ sau 19 nước Kasparov đầu hàng.',
    moves:
      '1.e4 c6 2.d4 d5 3.Nc3 dxe4 4.Nxe4 Nd7 5.Ng5 Ngf6 6.Bd3 e6 7.N1f3 h6 8.Nxe6 Qe7 9.O-O fxe6 10.Bg6+ Kd8 11.Bf4 b5 12.a4 Bb7 13.Re1 Nd5 14.Bg3 Kc8 15.axb5 cxb5 16.Qd3 Bc6 17.Bf5 exf5 18.Rxe7 Bxe7 19.c4',
    annotations: {
      '1...': 'Caro-Kann – một khai cuộc vững chắc mà Kasparov ít khi dùng, chọn để tránh lý thuyết sắc bén.',
      '4...': 'Biến Karpov (Smyslov): Đen chuẩn bị Ngf6 mà không bị phá cấu trúc tốt.',
      '5': 'Mã g5 nhắm vào f7 và ô e6 – một biến sắc bén.',
      '6': 'Tượng nhắm vào h7 và g6.',
      '7':
        'Trắng phát triển Mã thứ hai. Lý thuyết khuyên Đen nên đi 7...Bd6 trước rồi mới ...h6.',
      '7...':
        'Sai lầm lý thuyết đã biết! Đuổi Mã g5 nhưng cho phép đòn thí Nxe6. Có lẽ Kasparov nhầm thứ tự nước đi.',
      '8':
        'Thí Mã! Deep Blue lấy hai tốt và quan trọng hơn: phá hủy cấu trúc quanh Vua đen, khiến Vua không thể nhập thành an toàn.',
      '8...': 'Đen ghim Mã vào Vua trắng trên cột e trước khi bắt lại.',
      '9': 'Nhập thành, gỡ ghim.',
      '9...': 'Đen thu Mã.',
      '10': 'Tượng chiếu, Vua đen buộc phải đi và mất quyền nhập thành.',
      '10...': 'Vua kẹt ở trung tâm, quân Đen chồng chất, không phối hợp được.',
      '11': 'Tượng nhắm vào c7 và d6 – Vua đen bị bao vây.',
      '11...': 'Đen tìm chỗ cho Tượng c8 và Vua.',
      '12': 'Phá cánh hậu, mở cột a cho Xe.',
      '13': 'Xe chiếm cột e, xuyên qua tốt e6 nhắm vào Hậu e7.',
      '14...': 'Vua đen cố chạy sang c8.',
      '15': 'Mở cột a và cột c.',
      '16': 'Hậu tham gia, nhắm vào b5 và đường chéo b1–h7.',
      '17': 'Thí Tượng để mở cột e hoàn toàn.',
      '18': 'Xe đổi lấy Hậu đen.',
      '19':
        'Tốt c4 tấn công tốt b5 và Mã d5, mở cột c vào Vua c8. Vật chất tương đương, nhưng Vua đen trơ trọi và quân Đen rời rạc. Kasparov đầu hàng.',
    },
    keyMoments: ['7...', '8', '10', '17', '19'],
    lessons: [
      'Biết lý thuyết khai cuộc giúp tránh những sai lầm "đã có tên" – máy tính và đối thủ chuẩn bị kỹ sẽ trừng phạt ngay.',
      'Mất quyền nhập thành và Vua kẹt ở trung tâm là bất lợi lâu dài, đáng giá hơn một quân nhẹ.',
      'Thí quân để phá vỡ cấu trúc tốt quanh Vua thường đem lại thế tấn công bền vững.',
      'Yếu tố tâm lý: ngay cả nhà vô địch thế giới cũng chơi kém khi căng thẳng và mệt mỏi.',
    ],
  },

  // ------------------------------------------------------------------ 1999
  {
    id: 'kasparov-topalov-1999',
    title: 'Kasparov – Topalov (1999): Ván cờ bất tử của Kasparov',
    white: 'Garry Kasparov',
    black: 'Veselin Topalov',
    event: 'Giải Hoogovens, Wijk aan Zee',
    year: 1999,
    result: '1-0',
    opening: 'Phòng thủ Pirc (Pirc Defence)',
    difficulty: 5,
    context:
      'Tại giải Wijk aan Zee 1999, nhà vô địch thế giới Kasparov gặp Veselin Topalov – một trong những kỳ thủ trẻ mạnh nhất. Ván cờ thường được gọi là "Ván cờ bất tử của Kasparov" và được nhiều người bình chọn là ván cờ đẹp nhất thế kỷ 20.',
    summary:
      'Cả hai bên nhập thành dài. Đến nước 24, Kasparov tung ra đòn thí Xe 24.Rxd4!! với một chuỗi tính toán sâu đến kinh ngạc: Vua đen bị kéo từ a7 qua toàn bộ bàn cờ tới tận d1. Nước yên lặng 36.Bf1!! và 37.Rd7! là đỉnh cao. Cuối cùng Trắng thắng lại vật chất và Topalov đầu hàng.',
    moves:
      '1.e4 d6 2.d4 Nf6 3.Nc3 g6 4.Be3 Bg7 5.Qd2 c6 6.f3 b5 7.Nge2 Nbd7 8.Bh6 Bxh6 9.Qxh6 Bb7 10.a3 e5 11.O-O-O Qe7 12.Kb1 a6 13.Nc1 O-O-O 14.Nb3 exd4 15.Rxd4 c5 16.Rd1 Nb6 17.g3 Kb8 18.Na5 Ba8 19.Bh3 d5 20.Qf4+ Ka7 21.Rhe1 d4 22.Nd5 Nbxd5 23.exd5 Qd6 24.Rxd4 cxd4 25.Re7+ Kb6 26.Qxd4+ Kxa5 27.b4+ Ka4 28.Qc3 Qxd5 29.Ra7 Bb7 30.Rxb7 Qc4 31.Qxf6 Kxa3 32.Qxa6+ Kxb4 33.c3+ Kxc3 34.Qa1+ Kd2 35.Qb2+ Kd1 36.Bf1 Rd2 37.Rd7 Rxd7 38.Bxc4 bxc4 39.Qxh8 Rd3 40.Qa8 c3 41.Qa4+ Ke1 42.f4 f5 43.Kc1 Rd2 44.Qa7',
    annotations: {
      '1...': 'Phòng thủ Pirc: Đen để Trắng chiếm trung tâm rồi phản công.',
      '4': 'Kế hoạch tấn công với Be3, Qd2, Bh6 và nhập thành dài.',
      '6...': 'Đen mở rộng cánh hậu, chuẩn bị phản công.',
      '8': 'Đổi Tượng g7 – quân phòng thủ quan trọng nhất quanh Vua đen nếu Đen nhập thành ngắn.',
      '9...': 'Đen phát triển Tượng lên đường chéo dài.',
      '11': 'Trắng nhập thành dài.',
      '13...': 'Topalov cũng nhập thành dài – hai Vua ở cùng một phía.',
      '14...': 'Đen mở trung tâm.',
      '15...': 'Đuổi Xe, chiếm không gian.',
      '18': 'Mã nhảy vào a5, sát Vua đen, tấn công Tượng b7.',
      '19': 'Tượng chiếm đường chéo h3–c8, nhắm vào ô c8 gần Vua đen.',
      '19...': 'Đen phá trung tâm.',
      '20': 'Hậu chiếu, Vua đen lùi về a7.',
      '21...': 'Đen chiếm không gian, đuổi Mã c3 – có vẻ như Đen đang tốt.',
      '22': 'Mã nhảy vào d5 để đổi.',
      '23...': 'Hậu đen đặt ở d6, sẵn sàng phòng thủ.',
      '24':
        'Một trong những đòn thí nổi tiếng nhất lịch sử! Kasparov thí Xe để kéo Vua đen ra khỏi nơi trú ẩn. Ông phải tính trước rất nhiều nước.',
      '24...': 'Đen nhận thí.',
      '25':
        'Xe chiếu! Nếu 25...Qxe7 thì 26.Qxd4+ Kb8 27.Qb6+ Bb7 28.Nc6+ Ka8 29.Qa7#. Topalov đưa Vua lên b6.',
      '26': 'Hậu ăn tốt d4 kèm chiếu.',
      '26...': 'Vua đen ăn Mã a5 – bắt đầu cuộc hành trình qua bàn cờ.',
      '27': 'Thí tốt chiếu, kéo Vua đen sâu hơn.',
      '28': 'Nước yên lặng: đe dọa Qb3# ngay lập tức. Đen phải tìm cách phòng thủ.',
      '28...': 'Hậu ăn tốt d5, bảo vệ đường chéo.',
      '29': 'Xe chuyển sang a7, tấn công Tượng b7 và tốt a6 – những quân che chắn Vua đen.',
      '30': 'Xe ăn Tượng, tiếp tục áp sát Vua đen.',
      '30...': 'Hậu đen bảo vệ.',
      '31': 'Hậu ăn Mã f6 – Kasparov thu lại vật chất.',
      '31...': 'Vua đen tiếp tục chạy.',
      '33': 'Lại thí tốt chiếu – kéo Vua tới c3.',
      '35': 'Vua đen bị lùa tới d1 – hàng cuối của Trắng!',
      '36':
        'Nước đi yên lặng tuyệt vời: Tượng lùi về f1 tấn công Hậu c4. Nếu 36...Qxf1 thì 37.Qc2+ và Trắng chiếu hết chỉ sau vài nước. Hậu đen bị buộc phải rời vị trí hoặc được che chắn.',
      '36...': 'Đen chặn Hậu trắng bằng Xe.',
      '37':
        'Nước đi tinh tế: Xe trắng chủ động lao vào d7. Sau khi Xe đen ăn, Tượng ăn Hậu c4 và Hậu trắng sẽ ăn được Xe h8 – Trắng thu về lượng vật chất lớn.',
      '38': 'Tượng ăn Hậu. Đen ăn lại Tượng, nhưng Xe h8 đã bị bỏ ngỏ trên đường chéo dài.',
      '39': 'Hậu ăn Xe h8. Trắng có Hậu chống Xe và các tốt.',
      '41': 'Hậu chiếu, Vua đen bị đẩy về e1.',
      '44':
        'Trắng có Hậu chống Xe, Vua trắng an toàn còn Vua đen lạc lõng ở hàng 1. Topalov đầu hàng.',
    },
    keyMoments: ['24', '25', '29', '36', '37'],
    lessons: [
      'Những đòn thí lớn nhất dựa trên tính toán sâu – Kasparov đã thấy trước hàng chục nước.',
      'Vua bị kéo ra khỏi nơi trú ẩn sẽ là mục tiêu cho mọi quân của đối phương.',
      'Những nước yên lặng (36.Bf1!!) đôi khi quyết định hơn cả nước chiếu.',
      'Khi đã thí quân, phải duy trì nhịp – mỗi nước phải đe dọa điều gì đó.',
      'Đánh lạc hướng (37.Rd7!) để kéo quân phòng thủ khỏi vị trí then chốt.',
    ],
  },
];
