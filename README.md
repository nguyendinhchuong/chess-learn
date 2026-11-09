# Kỳ Đạo – Học cờ vua và cờ tướng như kiện tướng

Ứng dụng web học và luyện **cờ vua** và **cờ tướng**, giao diện hoàn toàn bằng tiếng Việt. Nút chọn môn cờ trên thanh tiêu đề (♞ Cờ vua / 帥 Cờ tướng) chuyển giữa hai môn và giữ nguyên mục đang xem (bài học, khai cuộc, ván cờ, cờ thế, luyện tập).

## Trang chọn môn và trang giới thiệu (`src/landing/`)

- **Trang chọn môn** (`#/`): hỏi người dùng muốn học cờ vua hay cờ tướng; bấm chọn thì màn chuyển cảnh lan ra từ điểm bấm rồi mở trang giới thiệu của môn đó. Người đã học trước đó thấy thêm lối tắt vào thẳng bảng học của môn gần nhất.
- **Trang giới thiệu** (`#/gioi-thieu/co-vua`, `#/gioi-thieu/co-tuong`): bàn cờ 3D nghiêng theo chuột (quân nhô lên khi rê chuột qua, bay tán loạn khi cuộn), lộ trình bốn chặng (bản đồ trang, bài học, ván mẫu, đấu với máy) có bàn cờ đi quân theo nhịp cuộn, câu tuyên ngôn sáng dần từng chữ, lợi ích, ba bước bắt đầu, hỏi đáp và lời mời cuối trang. Nội dung riêng của mỗi môn nằm trong `ChessLanding.tsx` / `XqLanding.tsx`, khung chung trong `Landing.tsx`, kiểu trong `src/styles/landing.css`.
- **Trang chủ**: mục "Trang chủ" và logo trên thanh điều hướng mở trang giới thiệu của môn đang học; `#/co-vua` và `#/co-tuong` cũng hiện trang giới thiệu. Tiến độ hiện ngay trong từng mục (bài đã học trong thư viện, bài cờ thế đã giải, thành tích với từng cấp máy).
- Địa chỉ không thuộc mục nào hiện trang 404 có đường về trang chọn môn.

## Chạy ứng dụng

```bash
npm install
npm run dev        # mở http://localhost:5173 (trang chọn môn)
npm run dev:server # máy chủ phòng chơi cho mục "Chơi với bạn" (http://localhost:8790, Vite chuyển /api tới đây)
npm run build      # bản phát hành trong thư mục dist/
npm test           # kiểm thử bộ máy, huấn luyện viên và toàn bộ dữ liệu bài học
npm run test:e2e   # kiểm thử đầu-cuối bằng Playwright (máy tính 1440×900 và điện thoại Pixel 7)
```

Lần đầu chạy e2e cần tải trình duyệt: `npx playwright install chromium`.

Bộ e2e (`e2e/`) mở từng bài học, xem đến nước cuối của mọi sơ đồ rồi cuộn xuống cuối trang (lỗi trang trắng đã gặp), chuyển bài/khai cuộc/ván cờ khi đang ở nước cuối, và chơi thử một nước với máy. Mỗi trang đều được kiểm tra: không có lỗi JavaScript, không rơi vào màn hình báo lỗi, bộ đếm nước không vượt quá cuối chuỗi, và không bị tràn ngang trên điện thoại. `e2e/layout.spec.ts` kiểm tra trên 6 kích thước màn hình máy tính và điện thoại rằng sau khi bấm ▶, lời giảng của nước vừa đi và nút ▶ nằm trọn trong màn hình mà bàn cờ vẫn được nhìn thấy, còn phần kiến thức chung nằm bên dưới khu vực học từng nước.

## Tính năng

- **Bài học** (`#/hoc`): Nhập môn, Chiến thuật, Chiến lược trung cuộc, Tàn cuộc. Mỗi phần có bàn cờ minh họa, bấm ◀ ▶ (hoặc phím mũi tên) để xem từng nước kèm lời giảng.
- **Khai cuộc** (`#/khai-cuoc`): diễn biến chính có lời giảng cho từng nửa nước, ý tưởng hai bên, kế hoạch trung cuộc, các biến và bẫy khai cuộc. Có nút luyện khai cuộc với máy.
- **Ván cờ kinh điển** (`#/van-co`): 106 ván từ Greco (1623) đến Ding – Gukesh (2024), chia theo 6 thời kỳ, có tìm kiếm không dấu và lọc theo chủ đề/kết quả. **Mọi nước đi đều có lời giải thích mục đích** (lời bình gốc cho các nước then chốt, ghi chú từng nước trong `src/data/games/notes/`); mỗi ván còn có bối cảnh, khoảnh khắc then chốt, bài học rút ra, máy phân tích tùy chọn và đường dẫn nguồn đã dùng để đối chiếu biên bản (`src/data/games/<thời-kỳ>.ts`).
- **Cờ thế** (`#/co-the`): 57 bài giải đố chia 6 cấp độ – Làm quen (chiếu hết 1 nước) → Cơ bản → Trung bình → Khó → Rất khó → Siêu khó (bài sáng tác của Morphy, Loyd, nghiên cứu Saavedra, chiếu hết 5 nước). Phần lớn trích từ các ván kinh điển trong thư viện (có liên kết tới ván). Người chơi đi quân, máy đáp nước của đối phương; đi sai thì Thầy Cú cho biết đối thủ sẽ đáp lại thế nào; gợi ý 3 bước (ý tưởng → quân cần đi → mũi tên), xem lời giải từng nước kèm lời bình. Tiến độ, huy hiệu ⭐ “giải ngay lần đầu” và chuỗi đúng liên tiếp được lưu trên trình duyệt.
- **Luyện tập** (`#/luyen-tap`): đấu với 6 cấp độ máy. Huấn luyện viên “Thầy Cú” hiển thị tỉ lệ thắng, chấm điểm từng nước (Tuyệt diệu → Sai lầm nghiêm trọng), gợi ý theo hai bước kèm lời giải thích như huấn luyện viên (ý tưởng và ô khống chế, đe dọa tạo ra, đe dọa được hóa giải, cách đối thủ nên đáp, cái bẫy cho nước tham ăn, so sánh với phương án khác – `src/engine/hint.ts`), cảnh báo đe dọa, dự đoán nước đi tiếp theo của máy kèm xác suất, và tổng kết độ chính xác cuối ván.
- **Chơi với bạn** (`#/phong`, `#/co-tuong/phong`): tạo phòng (chọn màu quân và thời gian: không giới hạn, 3+2 … 30+0), gửi đường dẫn hoặc mã phòng 6 ký tự cho bạn bè rồi chơi trực tuyến. Máy chủ phòng kiểm tra từng nước bằng chính bộ luật cờ của ứng dụng, giữ đồng hồ (hai nước đầu không tính giờ, hết giờ bị xử thua kể cả khi không ai bấm gì), đề nghị hòa, xin thua, ván mới đổi màu. Hết ván hiện hộp thoại kết quả cho cả người chơi lẫn người xem (tỉ số, lý do, thời gian còn lại, số nước; bấm ván mới ngay trong hộp thoại; nút “Kết quả” mở lại). Tải lại trang hay rớt mạng vẫn quay về đúng chỗ ngồi; người thứ ba mở đường dẫn thì được xem. Phòng bỏ không 3 ngày bị xóa. Xem mục **Máy chủ phòng chơi** bên dưới.

## Cờ tướng (`#/co-tuong/…`)

Cùng định dạng và chức năng với phần cờ vua, tiến độ được lưu riêng:

- **Bài học** (`#/co-tuong/hoc`): 43 bài – Nhập môn (bàn cờ, cách đi bảy loại quân, luật lộ mặt tướng, chiếu bí – khốn bí, cấm chiếu dai), Chiến thuật (bắt đôi, ghim, Pháo trùng, Mã hậu pháo, Song xe…), Chiến lược trung cuộc và Tàn cuộc – bàn cờ minh họa, ◀ ▶ xem từng nước kèm lời giảng.
- **Khai cuộc** (`#/co-tuong/khai-cuoc`): 15 khai cuộc – Pháo đầu – Bình phong mã, Thuận pháo, Nghịch pháo, Phản cung mã, Tiên nhân chỉ lộ, Phi tượng… với lời giảng từng nửa nước, ý tưởng hai bên, các biến, bẫy và nút luyện với máy.
- **Ván kinh điển** (`#/co-tuong/van-co`): 100 ván từ các cổ phổ Tự xuất động lai vô địch thủ, Quất Trung Bí (1632), Mai Hoa Phổ đến chung kết vô địch thế giới 2025 của Lại Lý Huynh, chia 5 thời kỳ; biên bản lấy từ các cơ sở dữ liệu ván cờ dpxq.com, xqbase.com và xiangqiqipu.com (đường dẫn nguồn ở cuối mỗi ván; các ván cổ phổ theo bản số hóa trên dpxq.com và xiangqiqipu.com), lời bình cho các nước then chốt, mọi nước còn lại có lời giải thích mục đích tự động.
- **Cờ thế** (`#/co-tuong/co-the`): 44 bài sát cục 6 cấp độ; bộ giải chính xác xác nhận lời giải là duy nhất (khốn bí – hết nước đi – cũng tính là thắng như luật cờ tướng).
- **Luyện tập** (`#/co-tuong/luyen-tap`): 6 cấp độ máy, huấn luyện viên chấm từng nước, gợi ý hai bước, cảnh báo đe dọa, dự đoán nước đi, tổng kết độ chính xác.
- Nước đi viết bằng **ký hiệu Việt Nam** (P2-5, M8.7, X1/1, Xt.3); dữ liệu cũng chấp nhận chữ Hán (炮二平五) và tọa độ ICCS (h2e2). Nút **Aa / 字** đổi quân cờ giữa chữ Hán và chữ Việt.

| Thư mục | Nội dung |
| --- | --- |
| `src/xiangqi/engine/board.ts` | Luật cờ tướng: bàn 9×10, sinh nước đi (cản chân mã, mắt tượng, ngòi pháo, lộ mặt tướng), FEN, ký hiệu Việt Nam/chữ Hán/ICCS, Zobrist, lặp lại và luật chiếu dai (bên chiếu dai bị xử thua), luật 60 nước |
| `src/xiangqi/engine/eval.ts`, `search.ts` | Lượng giá theo giai đoạn (Pháo mạnh ở khai cuộc, Mã mạnh ở tàn cuộc, an toàn Tướng, Pháo không đầu…) và tìm kiếm PVS alpha-beta, bảng chuyển vị, quiescence, null-move, LMR, multi-PV |
| `src/xiangqi/engine/bots.ts`, `worker.ts`, `client.ts`, `analyze.ts` | 6 cấp độ máy và phân tích chạy trong Web Worker riêng |
| `src/xiangqi/engine/explain.ts`, `coach.ts`, `hint.ts`, `book.ts` | Mục đích nước đi, chấm điểm nước đi, giải thích gợi ý, sách khai cuộc (nhận ra cả thế lật gương) |
| `src/xiangqi/engine/mate.ts` | Bộ giải sát cục chính xác để kiểm chứng cờ thế |
| `src/xiangqi/components/`, `src/xiangqi/pages/`, `src/styles/xiangqi.css` | Bàn cờ tướng (kéo thả, mũi tên đường đi của Mã, số lộ hai bên), các trang |
| `src/xiangqi/data/` | Nội dung; kiểm tra tự động bởi `tests/xq-data-*.test.ts` (perft chuẩn và luật trong `tests/xq-board.test.ts`) |
| `scripts/xq-tool.ts` | Công cụ cho người biên soạn: `npx vite-node scripts/xq-tool.ts -- show|line|mate|search …` |

## Máy chủ phòng chơi (`server/`)

Mục “Chơi với bạn” cần một máy chủ nhỏ: Cloudflare Worker + Durable Objects, **mỗi phòng là một Durable Object** giữ ván cờ, các kết nối WebSocket của người chơi và người xem, lưu trạng thái vào bộ nhớ bền (SQLite, dùng được ở gói miễn phí) và dùng alarm để xử thua khi hết giờ hoặc dọn phòng bỏ không. Phần còn lại của ứng dụng vẫn là trang tĩnh.

| Tệp | Nội dung |
| --- | --- |
| `src/online/protocol.ts` | Giao thức dùng chung trình duyệt – máy chủ: thông điệp, trạng thái phòng công khai, mã phòng, mức thời gian |
| `src/online/game.ts` | Luật phòng (hàm thuần, chạy trên máy chủ): vào chỗ, kiểm tra lượt/số thứ tự nước/luật cờ bằng `src/engine` và `src/xiangqi/engine`, đồng hồ, hòa, xin thua, ván mới. Kiểm thử: `tests/online-game.test.ts` |
| `server/src/index.ts`, `server/src/room.ts` | Worker (`POST /api/rooms`, `GET /api/rooms/:mã/ws`) và Durable Object của phòng |
| `src/online/client.ts` | Tạo phòng, WebSocket tự kết nối lại (ping mỗi 25 giây, kết nối lại ngay khi quay lại trang hoặc có mạng), mã người chơi lưu trong localStorage |
| `src/online/OnlinePages.tsx`, `chessKit.tsx`, `src/xiangqi/components/xqOnlineKit.tsx` | Trang tạo phòng và trang phòng dùng chung hai môn; phần riêng từng môn (bàn cờ, ký hiệu, âm thanh) nằm trong “kit” |
| `e2e/online.spec.ts` | Hai trình duyệt riêng chơi với nhau qua máy chủ phòng chạy cục bộ (Playwright tự khởi động `wrangler dev`) |

Người chơi không cần tài khoản: trình duyệt tự sinh một mã bí mật, gửi kèm khi vào phòng; máy chủ không bao giờ gửi mã này cho người khác. Hai thẻ của **cùng một trình duyệt** là cùng một người chơi – muốn tự thử hai bên, dùng thêm cửa sổ ẩn danh hoặc trình duyệt khác.

**Triển khai** (cần tài khoản Cloudflare, gói miễn phí là đủ):

```bash
npx wrangler login
npm run deploy:server   # in ra địa chỉ dạng https://ky-dao-rooms.<tên>.workers.dev
VITE_ROOM_SERVER=https://ky-dao-rooms.<tên>.workers.dev npm run build
```

Nếu trang web và máy chủ phòng cùng một tên miền (ví dụ đặt Worker ở đường dẫn `/api/*` của tên miền trang web) thì không cần `VITE_ROOM_SERVER`. Máy chủ cho phép mọi nguồn gọi API (không dùng cookie); muốn giới hạn, sửa `CORS` trong `server/src/index.ts`. Chưa có giới hạn số phòng tạo ra mỗi phút – nếu bị lạm dụng, bật Rate Limiting của Cloudflare cho `POST /api/rooms`.

## Thống kê truy cập (Google Analytics qua Google Tag Manager)

`src/lib/analytics.ts` tải vùng chứa GTM có mã trong `.env.production` (`VITE_GTM_ID`), chỉ ở bản build production nên `npm run dev` và e2e không gửi dữ liệu. Vì các trang nằm sau dấu `#`, mỗi lần đổi trang ứng dụng đẩy sự kiện `virtual_page_view` vào `dataLayer` kèm `page_location` dạng `https://…/co-vua/hoc` và `page_title`. Trong GTM: thẻ GA4 Event tên `page_view` lấy hai tham số này từ biến Data Layer và chạy theo sự kiện tùy chỉnh `virtual_page_view`; Google tag đặt `send_page_view` = `false` để lượt tải đầu không bị đếm hai lần. Thử bản build: `npm run build && npm run preview` rồi bật chế độ Preview của GTM.

## Kiến trúc

| Thư mục | Nội dung |
| --- | --- |
| `src/engine/board.ts` | Luật cờ: bàn cờ 0x88, sinh nước đi, FEN, SAN, băm Zobrist, phát hiện hòa |
| `src/engine/eval.ts` | Lượng giá: vật chất, bảng vị trí trung/tàn cuộc, cấu trúc tốt, tốt thông, linh hoạt, an toàn Vua |
| `src/engine/search.ts` | Tìm kiếm: lặp sâu dần, PVS alpha-beta, bảng chuyển vị, quiescence, null-move, LMR, multi-PV |
| `src/engine/bots.ts` | 6 cấp độ máy (độ sâu, kiểu lượng giá, nhiễu, tỉ lệ đi ngẫu nhiên, sách khai cuộc) |
| `src/engine/stockfish.ts`, `public/stockfish/` | Stockfish 18 bản lite (WebAssembly, một luồng, GPLv3) chạy trong Web Worker qua giao thức UCI – bộ máy phân tích cho gợi ý, chấm điểm nước đi, phân tích ván và cờ thế (multi-PV + phát hiện đe dọa) |
| `src/engine/analyze.ts`, `worker.ts`, `client.ts` | Hàng đợi phân tích; bộ máy JavaScript trong Web Worker là phương án dự phòng khi trình duyệt không chạy được Stockfish |
| `scripts/hint-strength.test.ts` | Đo sức mạnh gợi ý: tỉ lệ giải bộ thế cờ EPD (Win At Chess, ECM…) và đấu với Stockfish giới hạn Elo (`npm run bench:hint`) |
| `src/engine/coach.ts`, `explain.ts` | Tỉ lệ thắng, phân loại nước đi, độ chính xác, lời nhận xét tiếng Việt, dự đoán |
| `src/engine/purpose.ts` | Giải thích mục đích nước đi dựa trên thế cờ (bắt lại, thoát đòn, bảo vệ, chặn chiếu hết, ghim, cột mở, đột phá tốt…) – dùng khi một nước chưa có lời bình viết tay |
| `scripts/facts.test.ts`, `scripts/audit-lessons.test.ts` | Sinh bảng dữ kiện từng nước cho người viết lời bình; kiểm tra bằng máy các nước sai lầm trong sơ đồ bài học |
| `src/engine/mate.ts` | Bộ giải chiếu hết chính xác (tìm kiếm AND/OR có bảng chuyển vị): kiểm chứng cờ thế và nhận diện nước chiếu hết |
| `src/data/puzzles.ts`, `tests/data-puzzles.test.ts` | Dữ liệu cờ thế; bài kiểm tra xác nhận mỗi lời giải là **duy nhất** (bộ giải chính xác cho bài chiếu hết, máy tìm kiếm độ sâu cố định cho bài thắng quân) và thế cờ trích từ ván kinh điển thật sự xuất hiện trong ván đó |
| `scripts/mine-puzzles.test.ts` | Dò các thế chiếu hết bắt buộc và đòn chiến thuật duy nhất trong thư viện ván cờ để biên soạn thêm bài |
| `src/engine/book.ts` | Sách khai cuộc dựng từ dữ liệu khai cuộc |
| `src/data/` | Nội dung bài học, khai cuộc, ván cờ (được kiểm tra tự động bởi `tests/data-*.test.ts`) |

Các cấp độ máy có Elo ước tính; cấp cao nhất là sức mạnh tối đa của bộ máy viết bằng JavaScript trong ~4 giây/nước, chưa phải trình độ đại kiện tướng thật. Gợi ý và phân tích thì dùng Stockfish 18 (độ sâu khoảng 18–20 trong 1,5 giây), mạnh hơn nhiều so với đại kiện tướng.

Stockfish.js © Chess.com, LLC và các tác giả Stockfish, giấy phép GPLv3 (`public/stockfish/Copying.txt`); tệp lấy nguyên từ gói npm `stockfish@18.0.8`.

Hình quân cờ: bộ “cburnett” của Colin M.L. Burnett (GPLv2+).
