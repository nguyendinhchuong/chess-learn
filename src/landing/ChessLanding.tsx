// Trang giới thiệu cờ vua (#/gioi-thieu/co-vua): toàn bộ nội dung riêng của môn cờ vua, khung trang nằm ở Landing.tsx.
import { ArrowsLeftRight, BookOpenText, ChartLineUp, ChatCircleText, Handshake, Lightbulb, LinkSimple, PuzzlePiece, Robot, Scales, SealCheck, Strategy, Trophy, WifiSlash } from '@phosphor-icons/react';
import { ALL_LESSONS } from '../data/lessons';
import { OPENINGS } from '../data/openings';
import { GAMES } from '../data/games/index';
import { PUZZLES } from '../data/puzzles';
import { BOTS } from '../engine/bots';
import { CLASS_INFO } from '../engine/coach';
import { START_FEN, playLine } from '../engine/board';
import { TIME_PRESETS, timeLabel } from '../online/protocol';
import { Landing, LandingConfig } from './Landing';
import { LadderStage, LessonStage, GameStage, MapStage, StageProps } from './Stages';
import { buildLine, fromFen } from './pieces';

const first = ALL_LESSONS[0];
const fork = ALL_LESSONS.find((l) => l.id === 'ct-chia-doi')!;
const forkDiagram = fork.sections[0].diagram!;
const forkLine = buildLine(forkDiagram.fen!, playLine(forkDiagram.moves!, forkDiagram.fen).ucis, 'chess');

const OPERA_ID = 'van-co-nha-hat-opera-1858';
const opera = GAMES.find((g) => g.id === OPERA_ID)!;
const operaPlayed = playLine(opera.moves);
const operaLine = buildLine(START_FEN, operaPlayed.ucis, 'chess');
const years = GAMES.map((g) => g.year);

// phòng minh họa của phần Chơi với bạn: tám nửa nước đầu của khai cuộc Ý, giờ 10 + 5 như mặc định khi tạo phòng
const ROOM_PLIES = 8;
const italian = playLine(OPENINGS.find((o) => o.id === 'italian')!.moves);
const roomTime = TIME_PRESETS.find((p) => p.label === '10 + 5')!.time!;
const timed = TIME_PRESETS.filter((p) => p.time);

const ic = { size: 22, weight: 'regular' as const };

function MapVisual(p: StageProps) {
  return (
    <MapStage
      {...p}
      kind="chess"
      hopper="wn"
      tiles={[
        { icon: <BookOpenText {...ic} />, name: 'Bài học', meta: `${ALL_LESSONS.length} bài, 4 phần`, to: '/hoc' },
        { icon: <Strategy {...ic} />, name: 'Khai cuộc', meta: `${OPENINGS.length} khai cuộc`, to: '/khai-cuoc' },
        { icon: <PuzzlePiece {...ic} />, name: 'Cờ thế', meta: `${PUZZLES.length} bài, 6 cấp`, to: '/co-the' },
        { icon: <Trophy {...ic} />, name: 'Ván kinh điển', meta: `${GAMES.length} ván, 6 thời kỳ`, to: '/van-co' },
        { icon: <Robot {...ic} />, name: 'Luyện tập', meta: `${BOTS.length} cấp máy`, to: '/luyen-tap' },
        { icon: <ArrowsLeftRight {...ic} />, name: 'Cờ tướng', meta: 'Môn thứ hai', to: '/gioi-thieu/co-tuong' },
      ]}
    />
  );
}

function LessonVisual(p: StageProps) {
  return (
    <LessonStage
      {...p}
      line={forkLine}
      title={fork.title}
      coach="Thầy Cú"
      notes={[
        'Trắng đi. Ô c7 không có quân Đen nào canh giữ. Bạn thấy đòn gì không?',
        'Chĩa đôi. Mã vào c7 vừa chiếu Vua e8 vừa đánh Xe a8.',
        'Đen buộc phải thoát chiếu trước, đành bỏ lại Xe a8.',
        'Mã ăn Xe. Một nước đi, hai mục tiêu, và một mục tiêu rơi vào tay bạn.',
        'Đen ăn lại Mã, nhưng Trắng đã đổi Mã (3 điểm) lấy Xe (5 điểm): lời 2 điểm.',
      ]}
      arrowsAt={{
        0: [{ from: { c: 1, r: 3 }, to: { c: 2, r: 1 } }],
        1: [
          { from: { c: 2, r: 1 }, to: { c: 4, r: 0 }, tone: 'bad' },
          { from: { c: 2, r: 1 }, to: { c: 0, r: 0 }, tone: 'bad' },
        ],
      }}
    />
  );
}

function GameVisual(p: StageProps) {
  return (
    <GameStage
      {...p}
      line={operaLine}
      sans={operaPlayed.sans}
      players={['Paul Morphy', 'hai nhà quý tộc']}
      meta={`Paris, ${opera.year}`}
      captions={{
        0: 'Paris, 1858. Morphy cầm Trắng, hai nhà quý tộc cùng bàn bạc cầm Đen ngay trong lô xem opera.',
        6: '3…Bg4 ghim Mã f3. Đen sẽ phải đổi Tượng lấy Mã, giúp Hậu Trắng ra trận.',
        9: 'Hậu ra trận với nhịp đi, đặt ở f3 rất tích cực.',
        11: '6.Bc4 dọa Qxf7 chiếu hết ngay. Đen phải chặn.',
        13: 'Hậu sang b3, nhắm cùng lúc vào f7 và b7.',
        19: 'Morphy thí Mã để mở đường cho quân tấn công.',
        23: 'Nhập thành dài: Xe d1 lao ngay vào cột d đang mở.',
        25: 'Thí tiếp một Xe. Mã d7 bị ghim là điểm mấu chốt.',
        31: 'Thí Hậu. Mã d7 buộc phải ăn và cột d mở toang.',
        33: 'Chiếu hết. Morphy kết thúc bằng hai quân cuối cùng còn lại: Xe và Tượng.',
      }}
    />
  );
}

function LadderVisual(p: StageProps) {
  const r = (cls: keyof typeof CLASS_INFO, san: string, text: string, win: number) => ({ label: CLASS_INFO[cls].label, color: CLASS_INFO[cls].color, san, text, win });
  return (
    <LadderStage
      {...p}
      kind="chess"
      hopper="wk"
      coach="Thầy Cú"
      bots={BOTS.map((b) => ({ name: b.name, title: b.title, elo: b.elo }))}
      reviews={[
        r('book', '1. e4', 'Nước đi trong sách khai cuộc. Tốt e4 chiếm trung tâm, mở đường cho Hậu và Tượng.', 0.52),
        r('best', '4. Bc4', 'Đúng nước máy chọn. Tượng nhắm thẳng vào điểm yếu f7.', 0.58),
        r('inaccuracy', '9. h3', 'Có nước tốt hơn: 9. Re1 đưa Xe vào cột e trước khi đối thủ kịp nhập thành.', 0.51),
        r('mistake', '17. Qd2', 'Đánh mất lợi thế đáng kể. Đối thủ sẽ đáp Ne4, chĩa đôi Hậu và Xe.', 0.34),
        r('great', '23. Rd7', 'Nước duy nhất giữ thế cờ: Xe chiếm hàng 7 trước khi Đen kịp phòng thủ.', 0.61),
        r('brilliant', '16. Qb8+', 'Nước thí quân xuất thần. Thí Hậu để Xe chiếu hết, như Morphy năm 1858.', 0.97),
      ]}
    />
  );
}

const CONFIG: LandingConfig = {
  kind: 'chess',
  docTitle: 'Kỳ Đạo · Học cờ vua bằng tiếng Việt',
  name: 'Cờ vua',
  brand: 'wn',
  other: { name: 'Cờ tướng', to: '/gioi-thieu/co-tuong', kind: 'xq', glyph: 'r1', color: '#131209' },
  cta: { label: 'Bắt đầu bài học đầu tiên', to: '/hoc/' + first.id },
  appLinks: [
    { label: 'Bài học', to: '/hoc' },
    { label: 'Khai cuộc', to: '/khai-cuoc' },
    { label: 'Ván kinh điển', to: '/van-co' },
    { label: 'Cờ thế', to: '/co-the' },
    { label: 'Luyện tập với máy', to: '/luyen-tap' },
    { label: 'Chơi với bạn', to: '/phong' },
  ],
  hero: {
    announce: 'Chơi cờ vua với bạn bè qua một đường dẫn',
    title: ['Học cờ vua từ con\u00a0số\u00a00', 'đến tư\u00a0duy kiện\u00a0tướng'],
    sub: `${ALL_LESSONS.length} bài học có bàn cờ minh họa, ${GAMES.length} ván kinh điển được giảng từng nước và một huấn luyện viên chấm điểm khi bạn đấu với máy. Miễn phí, không cần tài khoản.`,
    proof: `Phân tích bằng Stockfish 18 · ${PUZZLES.length} bài cờ thế được máy kiểm chứng lời giải`,
    scene: { kind: 'chess', cols: 8, rows: 8, pieces: fromFen(START_FEN, 'chess'), rx: 50, rz: -28, fit: 11.2, label: 'Bàn cờ vua 3D ở thế ban đầu. Rê chuột qua bàn để các quân nhô lên.' },
  },
  stats: [
    { value: ALL_LESSONS.length, label: 'bài học có sơ đồ' },
    { value: OPENINGS.length, label: 'khai cuộc có lời giảng' },
    { value: GAMES.length, label: 'ván kinh điển' },
    { value: PUZZLES.length, label: 'bài cờ thế' },
    { value: BOTS.length, label: 'cấp độ máy' },
  ],
  journey: {
    kicker: 'Lộ trình',
    title: ['Bốn chặng, từ bàn cờ trống', 'tới ván đấu đầu tiên với máy'],
    sub: 'Cuộn chậm để đi qua từng chặng. Các bàn cờ bên dưới đi quân theo nhịp cuộn của bạn.',
    hopper: 'wn',
    stations: [
      {
        id: 'ban-do',
        rail: 'Bản đồ',
        kicker: 'Bản đồ trang',
        title: 'Năm khu học, một lộ trình rõ ràng',
        text: 'Kỳ Đạo chia thành Bài học, Khai cuộc, Cờ thế, Ván kinh điển và Luyện tập. Thư viện đánh dấu những bài bạn đã học, Cờ thế ghi lại bài đã giải, Luyện tập ghi thành tích với từng cấp máy, tất cả lưu ngay trên trình duyệt.',
        link: { label: 'Mở thư viện bài học', to: '/hoc' },
        height: 120,
        Visual: MapVisual,
      },
      {
        id: 'hoc',
        rail: 'Học',
        kicker: 'Học từng nước',
        title: 'Bài giảng đi cùng bạn từng nước một',
        text: `${ALL_LESSONS.length} bài chia bốn phần: Nhập môn, Chiến thuật, Chiến lược trung cuộc và Tàn cuộc. Mỗi sơ đồ đi được từng nước bằng nút ◀\u00a0▶, Thầy Cú giải thích ngay bên cạnh vì sao nước đó mạnh.`,
        link: { label: 'Học bài Chĩa đôi', to: '/hoc/' + fork.id },
        height: 130,
        Visual: LessonVisual,
      },
      {
        id: 'van-mau',
        rail: 'Ván mẫu',
        kicker: 'Ván mẫu',
        title: 'Ngồi cạnh Morphy ở nhà hát Opera',
        text: `${GAMES.length} ván từ Greco năm ${Math.min(...years)} đến trận Ding gặp Gukesh năm ${Math.max(...years)}, chia theo sáu thời kỳ. Nước nào cũng có lời giải thích mục đích, nước then chốt có lời bình viết tay. Cuộn để xem trọn ván 17 nước của Morphy.`,
        link: { label: 'Xem ván Opera đầy đủ', to: '/van-co/' + OPERA_ID },
        height: 240,
        Visual: GameVisual,
      },
      {
        id: 'dau-may',
        rail: 'Đấu máy',
        kicker: 'Đấu với máy',
        title: 'Sáu đối thủ, từ Gà\u00a0Con đến Rồng\u00a0Thần',
        text: `Máy có ${BOTS.length} cấp với Elo ước tính từ ${BOTS[0].elo} đến ${BOTS[BOTS.length - 1].elo}. Trong lúc bạn chơi, huấn luyện viên chấm từng nước, cảnh báo đe dọa, gợi ý theo hai bước và tổng kết độ chính xác cuối ván.`,
        link: { label: 'Chọn đối thủ', to: '/luyen-tap' },
        height: 150,
        Visual: LadderVisual,
      },
    ],
  },
  online: {
    kicker: 'Chơi với bạn',
    title: ['Mời bạn một ván cờ vua', 'chỉ bằng một đường dẫn'],
    sub: 'Tạo phòng, chọn màu quân và thời gian, rồi gửi đường dẫn hoặc mã phòng sáu ký tự. Bạn của bạn bấm vào là ngồi vào bàn, không cần tài khoản hay cài ứng dụng.',
    items: [
      { icon: <LinkSimple size={24} />, title: 'Một đường dẫn là đủ', text: 'Chép hoặc chia sẻ lời mời. Ván cờ bắt đầu ngay khi người thứ hai vào phòng, người đến sau được xem trực tiếp.' },
      { icon: <Scales size={24} />, title: 'Máy chủ làm trọng tài', text: `Mọi nước đi được kiểm tra đúng luật cờ vua, đồng hồ chạy trên máy chủ. Có ${timed.length} mức thời gian từ ${timed[0].label} tới ${timed[timed.length - 1].label}, hoặc không giới hạn.` },
      { icon: <WifiSlash size={24} />, title: 'Rớt mạng vẫn giữ ván', text: 'Tải lại trang hay mất sóng giữa chừng, bạn quay về đúng thế cờ và đúng thời gian còn lại.' },
      { icon: <Handshake size={24} />, title: 'Cầu hòa, xin thua, ván mới', text: 'Hết ván, bấm Ván mới để chơi tiếp trong cùng phòng. Hai bên tự đổi màu quân.' },
    ],
    cta: { label: 'Tạo phòng chơi cờ vua', to: '/phong' },
    note: 'Không cần tài khoản. Phòng tự xóa sau 3 ngày không ai chơi.',
    room: {
      line: buildLine(START_FEN, italian.ucis.slice(0, ROOM_PLIES), 'chess'),
      sans: italian.sans.slice(0, ROOM_PLIES),
      code: 'QH8VNT',
      time: timeLabel(roomTime),
      clock: roomTime.initial / 1000,
      inc: roomTime.increment / 1000,
      think: [3, 4, 12, 9, 26, 17, 41, 22],
      sides: ['Trắng', 'Đen'],
      kings: ['wk', 'bk'],
      you: 'Quang Huy',
      friend: 'Minh Thư',
    },
  },
  tagline: ['Mỗi nước cờ đều có lý do.', 'Kỳ Đạo giảng lý do ấy', 'bằng tiếng Việt, từng nước,', 'cho tới ngày bạn tự nhìn ra.'],
  benefits: {
    kicker: 'Lợi ích',
    title: ['Ít đoán mò hơn,', 'hiểu nhiều hơn sau mỗi ván'],
    items: [
      { icon: <ChatCircleText size={24} />, title: 'Lời giảng cho mọi nước đi', text: `${GAMES.length} ván kinh điển, không nước nào bị bỏ trống. Nước then chốt có lời bình gốc, nước còn lại có lời giải thích mục đích.` },
      { icon: <ChartLineUp size={24} />, title: 'Huấn luyện viên chấm từng nước', text: `${Object.keys(CLASS_INFO).length} mức đánh giá từ Tuyệt diệu đến Sai lầm nghiêm trọng, kèm nước nên đi và cách đối thủ sẽ đáp.` },
      { icon: <SealCheck size={24} />, title: 'Cờ thế có lời giải duy nhất', text: `${PUZZLES.length} bài được bộ giải chính xác kiểm chứng. Đi sai, bạn thấy ngay đối thủ sẽ đáp lại thế nào.` },
      { icon: <Lightbulb size={24} />, title: 'Gợi ý theo hai bước', text: 'Ý tưởng trước, nước đi sau. Bạn luôn có cơ hội tự tìm ra trước khi xem đáp án.' },
    ],
  },
  steps: {
    kicker: 'Ba bước',
    title: ['Bắt đầu ngay hôm nay,', 'không cần tài khoản'],
    items: [
      { title: `Học luật trong ${first.minutes} phút`, text: 'Bài đầu tiên giới thiệu bàn cờ, tọa độ và cách ghi nước đi. Tiến độ tự lưu trên trình duyệt.', link: { label: 'Vào bài đầu tiên', to: '/hoc/' + first.id } },
      { title: 'Giải một bài cờ thế mỗi ngày', text: 'Bắt đầu ở cấp Làm quen với các bài chiếu hết một nước, rồi lên dần tới Siêu khó.', link: { label: 'Giải bài đầu tiên', to: '/co-the?cap=1' } },
      { title: 'Thắng Gà Con, rồi leo tiếp', text: 'Đấu với máy cấp 1 và xem huấn luyện viên chấm từng nước. Thắng một cấp thì thử cấp kế tiếp.', link: { label: 'Vào sàn đấu', to: '/luyen-tap' } },
    ],
  },
  final: {
    title: ['Bàn cờ đã bày xong.', 'Đến lượt bạn đi.'],
    sub: `Bài đầu tiên dài ${first.minutes} phút. Học xong, bạn đọc được mọi sơ đồ và ván cờ trên Kỳ Đạo.`,
    note: 'Miễn phí, không cần tài khoản, tiến độ lưu ngay trên trình duyệt của bạn.',
    fen: START_FEN,
    boardLabel: 'Các quân cờ vua bay về thế ban đầu',
  },
  footer: {
    blurb: 'Ứng dụng học cờ vua và cờ tướng bằng tiếng Việt: bài học, khai cuộc, ván kinh điển, cờ thế, máy đấu có huấn luyện viên và phòng chơi với bạn bè.',
    credits: 'Hình quân cờ cburnett của Colin M.L. Burnett (GPLv2+).',
    legal: [{ label: 'Giấy phép Stockfish (GPLv3)', href: 'stockfish/Copying.txt' }],
  },
};

export default function ChessLanding() {
  return <Landing cfg={CONFIG} />;
}
