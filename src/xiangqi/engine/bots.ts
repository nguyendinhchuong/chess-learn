// Sáu cấp độ máy cờ tướng, từ người mới tập chơi đến cao thủ.
import type { EvalMode } from './eval';
import { Position } from './board';
import { Searcher, isMateScore, mateIn } from './search';

export interface BotProfile {
  level: number;
  name: string;
  title: string;
  elo: number;
  avatar: string;
  color: string;
  description: string;
  style: string;
  search: { maxDepth: number; timeMs: number; evalMode: EvalMode; quiescence: boolean; multiPV: number };
  /** Độ lệch chuẩn (centipawn) của nhiễu cộng vào điểm từng nước – càng lớn càng hay đi sai */
  noise: number;
  /** Xác suất đi một nước ngẫu nhiên */
  randomChance: number;
  /** Xác suất dùng sách khai cuộc khi có nước trong sách */
  bookChance: number;
  /** Thời gian "suy nghĩ" tối thiểu để nước đi trông tự nhiên */
  thinkMinMs: number;
}

export const BOTS: BotProfile[] = [
  {
    level: 1,
    name: 'Gà Con',
    title: 'Người mới',
    elo: 400,
    avatar: '🐣',
    color: '#f6c445',
    description: 'Vừa học xong cách đi quân. Hay để Xe, Pháo bị bắt và bỏ lỡ nước chiếu đơn giản.',
    style: 'Chỉ nhìn trước 1 nước, chỉ đếm quân, thường đi ngẫu hứng.',
    search: { maxDepth: 1, timeMs: 300, evalMode: 'material', quiescence: false, multiPV: 99 },
    noise: 220,
    randomChance: 0.35,
    bookChance: 0,
    thinkMinMs: 700,
  },
  {
    level: 2,
    name: 'Thỏ Nhanh Nhảu',
    title: 'Nghiệp dư',
    elo: 800,
    avatar: '🐰',
    color: '#8bc34a',
    description: 'Biết xuất Xe, lên Mã và ăn quân hớ, nhưng chưa thấy đòn phối hợp hai nước.',
    style: 'Nhìn trước 2 nước, hiểu sơ về vị trí quân.',
    search: { maxDepth: 2, timeMs: 500, evalMode: 'simple', quiescence: true, multiPV: 99 },
    noise: 50,
    randomChance: 0.05,
    bookChance: 0.3,
    thinkMinMs: 800,
  },
  {
    level: 3,
    name: 'Cáo Tinh Ranh',
    title: 'Câu lạc bộ',
    elo: 1200,
    avatar: '🦊',
    color: '#ff8a3d',
    description: 'Kỳ thủ phong trào: thấy đòn bắt đôi, Pháo trùng, Mã ngọa tào, nhưng thỉnh thoảng vẫn sơ suất.',
    style: 'Nhìn trước 3 nước, lượng giá đầy đủ, đôi lúc thiếu chính xác.',
    search: { maxDepth: 3, timeMs: 800, evalMode: 'full', quiescence: true, multiPV: 99 },
    noise: 32,
    randomChance: 0.02,
    bookChance: 0.6,
    thinkMinMs: 900,
  },
  {
    level: 4,
    name: 'Hổ Chiến Binh',
    title: 'Cao thủ',
    elo: 1500,
    avatar: '🐯',
    color: '#e8590c',
    description: 'Chơi chắc chắn, thuộc các khai cuộc phổ biến, tận dụng tốt sai lầm của đối thủ.',
    style: 'Tính sâu khoảng 5 nước, rất ít khi để hớ quân.',
    search: { maxDepth: 5, timeMs: 1200, evalMode: 'full', quiescence: true, multiPV: 4 },
    noise: 14,
    randomChance: 0,
    bookChance: 0.85,
    thinkMinMs: 900,
  },
  {
    level: 5,
    name: 'Đại Bàng',
    title: 'Kiện tướng',
    elo: 1850,
    avatar: '🦅',
    color: '#5c7cfa',
    description: 'Trình độ kiện tướng: tính toán sâu, hiểu chiến lược, tàn cuộc vững.',
    style: 'Tìm kiếm sâu dần trong ~2 giây mỗi nước, gần như không sai sót.',
    search: { maxDepth: 64, timeMs: 2000, evalMode: 'full', quiescence: true, multiPV: 2 },
    noise: 6,
    randomChance: 0,
    bookChance: 1,
    thinkMinMs: 600,
  },
  {
    level: 6,
    name: 'Rồng Thần',
    title: 'Đại kiện tướng',
    elo: 2200,
    avatar: '🐉',
    color: '#9c36b5',
    description: 'Toàn lực của bộ máy: sách khai cuộc, tìm kiếm sâu nhất, không khoan nhượng.',
    style: 'Dùng toàn bộ sức mạnh tìm kiếm trong ~4 giây mỗi nước.',
    search: { maxDepth: 64, timeMs: 4000, evalMode: 'full', quiescence: true, multiPV: 1 },
    noise: 0,
    randomChance: 0,
    bookChance: 1,
    thinkMinMs: 400,
  },
];

function gaussian() {
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

export interface BotChoice {
  move: number;
  score: number;
  depth: number;
  random?: boolean;
}

/** Chọn nước đi cho máy theo cấp độ (chạy trong worker). */
export function chooseBotMove(searcher: Searcher, pos: Position, bot: BotProfile): BotChoice {
  const legal = pos.legalMoves();
  if (legal.length === 1) return { move: legal[0], score: 0, depth: 0 };
  if (bot.randomChance > 0 && Math.random() < bot.randomChance) {
    // người mới hay "thấy quân là ăn"
    const caps = legal.filter((m) => pos.board[(m >> 7) & 127]);
    const pool = caps.length && Math.random() < 0.5 ? caps : legal;
    return { move: pool[Math.floor(Math.random() * pool.length)], score: 0, depth: 0, random: true };
  }
  const r = searcher.search(pos, { ...bot.search });
  const lines = r.lines;
  if (!lines.length) return { move: legal[0], score: 0, depth: 0 };
  if (bot.noise <= 0) return { move: lines[0].move, score: lines[0].score, depth: r.depth };
  let best = lines[0],
    bestNoisy = -Infinity;
  for (const l of lines) {
    const base = isMateScore(l.score) ? Math.sign(l.score) * (20000 - Math.abs(mateIn(l.score)) * 100) : l.score;
    const noisy = base + gaussian() * bot.noise;
    if (noisy > bestNoisy) {
      bestNoisy = noisy;
      best = l;
    }
  }
  return { move: best.move, score: best.score, depth: r.depth };
}
