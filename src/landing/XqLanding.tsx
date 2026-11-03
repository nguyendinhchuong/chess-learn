// Trang giới thiệu cờ tướng (#/gioi-thieu/co-tuong): nội dung riêng của môn cờ tướng, tải riêng cùng dữ liệu cờ tướng.
import { ArrowsLeftRight, BookOpenText, ChartLineUp, ChatCircleText, PuzzlePiece, Robot, Scroll, SealCheck, Translate, Trophy } from '@phosphor-icons/react';
import { XQ_LESSONS } from '../xiangqi/data/lessons';
import { XQ_OPENINGS } from '../xiangqi/data/openings';
import { XQ_GAMES, XQ_ERAS } from '../xiangqi/data/games/index';
import { XQ_PUZZLES } from '../xiangqi/data/puzzles';
import { BOTS } from '../xiangqi/engine/bots';
import { START_FEN, playLine } from '../xiangqi/engine/board';
import { CLASS_INFO } from '../engine/coach';
import { Landing, LandingConfig } from './Landing';
import { LadderStage, LessonStage, GameStage, MapStage, StageProps } from './Stages';
import { buildLine, fromFen } from './pieces';

const first = XQ_LESSONS[0];
const fork = XQ_LESSONS.find((l) => l.id === 'xq-ct-bat-doi')!;
const forkDiagram = fork.sections[0].diagram!;
const forkLine = buildLine(forkDiagram.fen!, playLine(forkDiagram.moves!, forkDiagram.fen).ucis, 'xq');

const GAME_ID = 'chu-thuan-phat-ho-vinh-hoa-1962';
const game = XQ_GAMES.find((g) => g.id === GAME_ID)!;
const gamePlayed = playLine(game.moves);
const gameLine = buildLine(START_FEN, gamePlayed.ucis, 'xq');
const lastYear = Math.max(...XQ_GAMES.map((g) => g.year));

const ic = { size: 22, weight: 'regular' as const };

function MapVisual(p: StageProps) {
  return (
    <MapStage
      {...p}
      kind="xq"
      hopper="r4"
      tiles={[
        { icon: <BookOpenText {...ic} />, name: 'Bài học', meta: `${XQ_LESSONS.length} bài, 4 phần`, to: '/co-tuong/hoc' },
        { icon: <Scroll {...ic} />, name: 'Khai cuộc', meta: `${XQ_OPENINGS.length} khai cuộc`, to: '/co-tuong/khai-cuoc' },
        { icon: <PuzzlePiece {...ic} />, name: 'Cờ thế', meta: `${XQ_PUZZLES.length} bài sát cục`, to: '/co-tuong/co-the' },
        { icon: <Trophy {...ic} />, name: 'Ván kinh điển', meta: `${XQ_GAMES.length} ván, ${XQ_ERAS.length} thời kỳ`, to: '/co-tuong/van-co' },
        { icon: <Robot {...ic} />, name: 'Luyện tập', meta: `${BOTS.length} cấp máy`, to: '/co-tuong/luyen-tap' },
        { icon: <ArrowsLeftRight {...ic} />, name: 'Cờ vua', meta: 'Môn thứ hai', to: '/gioi-thieu/co-vua' },
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
        'Đỏ đi. Mã d4 đang nhìn về Tốt đầu e6, hai chân Mã phía trước đều trống.',
        'Bắt đôi. Mã ăn Tốt đầu, cùng lúc đánh Xe c7 và Pháo g7. Không quân Đen nào ăn được Mã.',
        'Đen chỉ cứu được một quân và chọn cứu Xe.',
        'Mã ăn Pháo. Đỏ lời một Pháo và một Tốt mà không mất gì.',
      ]}
      arrowsAt={{
        0: [{ from: { c: 3, r: 5 }, to: { c: 4, r: 3 } }],
        1: [
          { from: { c: 4, r: 3 }, to: { c: 2, r: 2 }, tone: 'bad' },
          { from: { c: 4, r: 3 }, to: { c: 6, r: 2 }, tone: 'bad' },
        ],
      }}
    />
  );
}

function GameVisual(p: StageProps) {
  return (
    <GameStage
      {...p}
      line={gameLine}
      sans={gamePlayed.sans}
      players={['Chu Thuận Phát', 'Hồ Vinh Hoa']}
      meta={`Thượng Hải, ${game.year}`}
      captions={{
        0: 'Thượng Hải, 6/6/1962. Hồ Vinh Hoa mới 17 tuổi nhưng đã là nhà vô địch quốc gia, cầm quân Đen.',
        1: 'Chu Thuận Phát mở màn bằng Pháo đầu, nhắm Tốt giữa và cung Tướng Đen.',
        2: 'Hồ Vinh Hoa lên Mã giữ Tốt đầu, bước đầu của thế Bình phong mã.',
        7: 'Xe qua hà: Xe Đỏ lên sông, đè lên hàng Tốt Đen và kìm Mã.',
        15: 'Tốt giữa qua sông dù không có quân nào giữ. Đỏ mạo hiểm để mở trung lộ.',
        20: 'Đen ăn Tốt giữa và hơn một Tốt.',
        21: 'Pháo trùng: hai Pháo Đỏ xếp chồng trên cột giữa, Pháo trước làm ngòi cho Pháo sau.',
        28: 'Pháo Đen lao xuống đánh Pháo đầu, nhưng Tốt giữa mất người bảo vệ.',
        29: 'Pháo sau ăn Tốt giữa và chiếu Tướng.',
        30: 'Tượng lên che chiếu. Lời bình trong nguồn gọi đây là sai lầm lớn nhất của Đen.',
        37: 'Xe chặn mắt Tượng ở d8. Từ giờ Pháo ăn Tượng giữa sẽ vừa chiếu vừa không bị ăn lại.',
        38: 'Đen chiếu lại bằng Pháo ăn Mã, nhưng đã hết cách gỡ.',
        39: 'Pháo ăn Tượng: thoát chiếu và chiếu ngược lại trong cùng một nước.',
        41: 'Xe ăn Mã không có quân giữ, rồi đánh tiếp Sĩ.',
        43: 'Pháo lui nhường đường cho hai Xe vây Tướng. Hồ Vinh Hoa xin thua sau 22 nước.',
      }}
    />
  );
}

function LadderVisual(p: StageProps) {
  const r = (cls: keyof typeof CLASS_INFO, san: string, text: string, win: number) => ({ label: CLASS_INFO[cls].label, color: CLASS_INFO[cls].color, san, text, win });
  return (
    <LadderStage
      {...p}
      kind="xq"
      hopper="r1"
      coach="Thầy Cú"
      bots={BOTS.map((b) => ({ name: b.name, title: b.title, elo: b.elo }))}
      reviews={[
        r('book', 'M2.3', 'Nước đi trong sách khai cuộc. Mã lên giữ Tốt giữa và mở đường cho Xe.', 0.52),
        r('best', 'P8.4', 'Đúng nước máy chọn. Pháo lên sông, chặn Pháo đối phương tràn sang.', 0.57),
        r('inaccuracy', 'B7.1', 'Có nước tốt hơn: M8.7 lên Mã trước để giữ Tốt đầu.', 0.49),
        r('mistake', 'S4.5', 'Đánh mất lợi thế đáng kể. Đối thủ sẽ đáp M7.6, bắt đôi Xe và Pháo.', 0.33),
        r('great', 'X6.4', 'Nước duy nhất giữ thế cờ: Xe chặn mắt Tượng, Pháo sẵn sàng đánh vào trung lộ.', 0.63),
        r('brilliant', 'X3.9', 'Nước thí quân xuất thần. Thí Xe mở cửa cung, Mã và Pháo sát cục hai nước sau.', 0.96),
      ]}
    />
  );
}

const CONFIG: LandingConfig = {
  kind: 'xq',
  docTitle: 'Kỳ Đạo · Học cờ tướng bằng tiếng Việt',
  name: 'Cờ tướng',
  brand: 'r1',
  other: { name: 'Cờ vua', to: '/gioi-thieu/co-vua', kind: 'chess', glyph: 'wn', color: '#000000' },
  cta: { label: 'Bắt đầu bài học đầu tiên', to: '/co-tuong/hoc/' + first.id },
  appLinks: [
    { label: 'Bài học', to: '/co-tuong/hoc' },
    { label: 'Khai cuộc', to: '/co-tuong/khai-cuoc' },
    { label: 'Ván kinh điển', to: '/co-tuong/van-co' },
    { label: 'Cờ thế', to: '/co-tuong/co-the' },
    { label: 'Luyện tập với máy', to: '/co-tuong/luyen-tap' },
  ],
  hero: {
    eyebrow: 'Học cờ tướng bằng tiếng Việt',
    title: ['Học cờ tướng từ con\u00a0số\u00a00', 'đến tư\u00a0duy cao\u00a0thủ'],
    sub: `${XQ_LESSONS.length} bài học có bàn cờ minh họa, ${XQ_GAMES.length} ván kinh điển từ cổ phổ Quất Trung Bí đến chung kết thế giới ${lastYear}, và máy đấu sáu cấp có huấn luyện viên. Ký hiệu Việt Nam quen thuộc, miễn phí, không cần tài khoản.`,
    proof: `${XQ_PUZZLES.length} bài sát cục được bộ giải chính xác xác nhận lời giải duy nhất`,
    scene: { kind: 'xq', cols: 9, rows: 10, pieces: fromFen(START_FEN, 'xq'), rx: 46, rz: -22, fit: 12, label: 'Bàn cờ tướng 3D ở thế ban đầu. Rê chuột qua bàn để các quân nhấc lên.' },
  },
  stats: [
    { value: XQ_LESSONS.length, label: 'bài học có sơ đồ' },
    { value: XQ_OPENINGS.length, label: 'khai cuộc có lời giảng' },
    { value: XQ_GAMES.length, label: 'ván kinh điển' },
    { value: XQ_PUZZLES.length, label: 'bài sát cục' },
    { value: BOTS.length, label: 'cấp độ máy' },
  ],
  journey: {
    kicker: 'Lộ trình',
    title: ['Bốn chặng, từ bàn cờ trống', 'tới ván đấu đầu tiên với máy'],
    sub: 'Cuộn chậm để đi qua từng chặng. Các bàn cờ bên dưới đi quân theo nhịp cuộn của bạn.',
    hopper: 'r4',
    stations: [
      {
        id: 'ban-do',
        rail: 'Bản đồ',
        kicker: 'Bản đồ trang',
        title: 'Năm khu học, một lộ trình rõ ràng',
        text: 'Kỳ Đạo chia thành Bài học, Khai cuộc, Cờ thế, Ván kinh điển và Luyện tập. Thư viện đánh dấu những bài bạn đã học, Cờ thế ghi lại bài đã giải, Luyện tập ghi thành tích với từng cấp máy; tiến độ cờ tướng lưu riêng với cờ vua.',
        link: { label: 'Mở thư viện bài học', to: '/co-tuong/hoc' },
        height: 120,
        Visual: MapVisual,
      },
      {
        id: 'hoc',
        rail: 'Học',
        kicker: 'Học từng nước',
        title: 'Từ cản chân Mã đến Mã hậu pháo',
        text: `${XQ_LESSONS.length} bài chia bốn phần: Nhập môn, Chiến thuật, Chiến lược trung cuộc và Tàn cuộc. Mỗi sơ đồ đi được từng nước bằng nút ◀\u00a0▶, Thầy Cú giải thích vì sao nước đó mạnh và đối thủ nên đáp thế nào.`,
        link: { label: 'Học bài Bắt đôi', to: '/co-tuong/hoc/' + fork.id },
        height: 130,
        Visual: LessonVisual,
      },
      {
        id: 'van-mau',
        rail: 'Ván mẫu',
        kicker: 'Ván mẫu',
        title: 'Nhà vô địch 17 tuổi gục ngã sau 22 nước',
        text: `${XQ_GAMES.length} ván từ cổ phổ Tự xuất động, Quất Trung Bí đến chung kết thế giới ${lastYear}, chia theo ${XQ_ERAS.length} thời kỳ. Biên bản đối chiếu với dpxq.com, xqbase.com và xiangqiqipu.com. Cuộn để xem Chu Thuận Phát hạ Hồ Vinh Hoa năm 1962.`,
        link: { label: 'Xem trọn ván đấu', to: '/co-tuong/van-co/' + GAME_ID },
        height: 260,
        Visual: GameVisual,
      },
      {
        id: 'dau-may',
        rail: 'Đấu máy',
        kicker: 'Đấu với máy',
        title: 'Sáu đối thủ, từ Gà\u00a0Con đến Rồng\u00a0Thần',
        text: `Máy có ${BOTS.length} cấp với Elo ước tính từ ${BOTS[0].elo} đến ${BOTS[BOTS.length - 1].elo}, hiểu cả luật chiếu dai và lộ mặt tướng. Huấn luyện viên chấm từng nước, cảnh báo đe dọa và gợi ý theo hai bước.`,
        link: { label: 'Chọn đối thủ', to: '/co-tuong/luyen-tap' },
        height: 150,
        Visual: LadderVisual,
      },
    ],
  },
  tagline: ['Pháo đầu, Bình phong mã,', 'Thuận pháo, Phản cung mã.', 'Thế trận nào cũng có ý đồ.', 'Kỳ Đạo giảng ý đồ ấy cho bạn.'],
  benefits: {
    kicker: 'Lợi ích',
    title: ['Hiểu thế cờ,', 'không chỉ thuộc nước đi'],
    items: [
      { icon: <ChatCircleText size={24} />, title: 'Lời giảng cho mọi nước đi', text: `${XQ_GAMES.length} ván kinh điển có lời bình cho nước then chốt, mọi nước còn lại có lời giải thích mục đích.` },
      { icon: <Translate size={24} />, title: 'Ký hiệu Việt Nam và chữ Hán', text: 'Nước đi viết theo kiểu tấn, thoái, bình quen thuộc. Nút Aa và 字 đổi mặt quân giữa chữ Hán và chữ Việt.' },
      { icon: <SealCheck size={24} />, title: 'Sát cục có lời giải duy nhất', text: `${XQ_PUZZLES.length} bài được bộ giải sát cục chính xác kiểm chứng, tính cả khốn bí như luật cờ tướng.` },
      { icon: <ChartLineUp size={24} />, title: 'Huấn luyện viên chấm từng nước', text: `${Object.keys(CLASS_INFO).length} mức đánh giá từ Tuyệt diệu đến Sai lầm nghiêm trọng, kèm cảnh báo đe dọa và nước nên đi.` },
    ],
  },
  steps: {
    kicker: 'Ba bước',
    title: ['Bắt đầu ngay hôm nay,', 'không cần tài khoản'],
    items: [
      { title: `Bày quân trong ${first.minutes} phút`, text: 'Bài đầu tiên giới thiệu bàn cờ, sông, cung Tướng và cách bày 32 quân. Tiến độ tự lưu trên trình duyệt.', link: { label: 'Vào bài đầu tiên', to: '/co-tuong/hoc/' + first.id } },
      { title: 'Giải một bài sát cục mỗi ngày', text: 'Bắt đầu ở cấp Làm quen với sát cục một nước: Xe chiếu đáy, Pháo có ngòi, lộ mặt tướng.', link: { label: 'Giải bài đầu tiên', to: '/co-tuong/co-the?cap=1' } },
      { title: 'Thắng Gà Con, rồi leo tiếp', text: 'Đấu với máy cấp 1 và xem huấn luyện viên chấm từng nước. Thắng một cấp thì thử cấp kế tiếp.', link: { label: 'Vào sàn đấu', to: '/co-tuong/luyen-tap' } },
    ],
  },
  faq: {
    kicker: 'Hỏi đáp',
    title: ['Những điều người mới', 'hay hỏi trước khi bắt đầu'],
    items: [
      { q: 'Kỳ Đạo có mất phí không?', a: 'Không. Mọi bài học, ván cờ, bài sát cục và máy đấu đều miễn phí. Không có quảng cáo, không có gói trả phí và không cần tạo tài khoản.' },
      { q: 'Nước đi được ghi theo kiểu nào?', a: 'Theo ký hiệu Việt Nam quen thuộc: tên quân, cột xuất phát, rồi tấn, thoái hoặc bình. Dữ liệu cũng đọc được chữ Hán như 炮二平五 và tọa độ ICCS.' },
      { q: 'Quân cờ hiện chữ Hán hay chữ Việt?', a: 'Mặc định là chữ Hán như trên bàn cờ thật. Bấm nút Aa trên thanh tiêu đề để đổi sang chữ Việt (Xe, Pháo, Mã), bấm 字 để đổi lại.' },
      { id: 'quyen-rieng-tu', q: 'Tiến độ học được lưu ở đâu?', a: 'Ngay trên trình duyệt của bạn. Kỳ Đạo không gửi tiến độ, ván đấu hay dữ liệu cá nhân nào lên máy chủ. Nếu bạn xóa dữ liệu trình duyệt hoặc đổi máy, tiến độ sẽ bắt đầu lại từ đầu.' },
      { q: 'Máy đấu có hiểu luật chiếu dai không?', a: `Có. Bộ máy cờ tướng viết riêng cho Kỳ Đạo áp dụng luật lộ mặt tướng, luật chiếu dai (bên chiếu dai bị xử thua) và luật 60 nước. ${BOTS.length} cấp có Elo ước tính từ ${BOTS[0].elo} đến ${BOTS[BOTS.length - 1].elo}.` },
      { q: 'Các ván kinh điển lấy từ đâu?', a: 'Biên bản lấy từ các cơ sở dữ liệu dpxq.com, xqbase.com và xiangqiqipu.com; ván cổ phổ theo bản số hóa trên dpxq.com và xiangqiqipu.com. Đường dẫn nguồn nằm ở cuối mỗi ván.' },
      { q: 'Tôi có học được cờ vua ở đây không?', a: 'Có. Kỳ Đạo có đủ bài học, khai cuộc, ván kinh điển, cờ thế và máy đấu cho cờ vua. Nút chọn môn trên thanh tiêu đề chuyển giữa hai môn, tiến độ mỗi môn được lưu riêng.' },
    ],
  },
  final: {
    title: ['Quân đã bày, sông đã chia.', 'Mời bạn đi nước đầu tiên.'],
    sub: `Bài đầu tiên dài ${first.minutes} phút. Học xong, bạn đọc được mọi sơ đồ và ván cờ tướng trên Kỳ Đạo.`,
    note: 'Miễn phí, không cần tài khoản, tiến độ lưu ngay trên trình duyệt của bạn.',
    fen: START_FEN,
    boardLabel: 'Các quân cờ tướng bay về thế ban đầu',
  },
  footer: {
    blurb: 'Ứng dụng học cờ vua và cờ tướng bằng tiếng Việt: bài học, khai cuộc, ván kinh điển, cờ thế và máy đấu có huấn luyện viên.',
    credits: 'Bộ máy cờ tướng và bộ giải sát cục viết riêng cho Kỳ Đạo.',
    legal: [],
  },
};

export default function XqLanding() {
  return <Landing cfg={CONFIG} />;
}
