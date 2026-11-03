// "Bộ não huấn luyện viên": tỉ lệ thắng, phân loại nước đi, độ chính xác, lời nhận xét và dự đoán nước đi của đối thủ.
import { Position, Color, KNIGHT } from './board';
import type { AnalysisLine, AnalysisResult } from './protocol';
import { analyzeMove, describeMove, hangingWarning, materialSwing, materialText, piece, MoveFacts } from './explain';

export type MoveClass = 'brilliant' | 'great' | 'best' | 'excellent' | 'good' | 'book' | 'inaccuracy' | 'mistake' | 'miss' | 'blunder';

export const CLASS_INFO: Record<MoveClass, { label: string; symbol: string; color: string; short: string }> = {
  brilliant: { label: 'Tuyệt diệu', symbol: '!!', color: '#1baca6', short: 'Nước thí quân xuất thần' },
  great: { label: 'Nước hay', symbol: '!', color: '#5c8bb0', short: 'Nước duy nhất giữ thế cờ' },
  best: { label: 'Tốt nhất', symbol: '★', color: '#81b64c', short: 'Đúng nước máy chọn' },
  excellent: { label: 'Xuất sắc', symbol: '👍', color: '#96bc4b', short: 'Gần như tốt nhất' },
  good: { label: 'Tốt', symbol: '✓', color: '#95b776', short: 'Nước đi hợp lý' },
  book: { label: 'Lý thuyết', symbol: '📖', color: '#a88865', short: 'Nước đi trong sách khai cuộc' },
  inaccuracy: { label: 'Thiếu chính xác', symbol: '?!', color: '#f7c045', short: 'Có nước tốt hơn' },
  mistake: { label: 'Sai lầm', symbol: '?', color: '#e58f2a', short: 'Đánh mất lợi thế đáng kể' },
  miss: { label: 'Bỏ lỡ', symbol: '✗', color: '#ee6b55', short: 'Bỏ lỡ cơ hội giành ưu thế' },
  blunder: { label: 'Sai lầm nghiêm trọng', symbol: '??', color: '#ca3431', short: 'Mất quân hoặc thua thế' },
};

/** Tỉ lệ thắng (0..100) từ điểm centipawn – công thức của lichess */
export function winPct(cp: number): number {
  return 50 + 50 * (2 / (1 + Math.exp(-0.00368208 * cp)) - 1);
}

export function lineWin(l: Pick<AnalysisLine, 'score' | 'mate'>): number {
  if (l.mate > 0) return 100;
  if (l.mate < 0) return 0;
  return winPct(l.score);
}

/** Tỉ lệ thắng của Trắng từ một kết quả phân tích */
export function whiteWin(a: AnalysisResult | null | undefined): number | null {
  if (!a || !a.lines.length) return null;
  const l = a.lines[0];
  const sideWhite = a.fen.split(' ')[1] === 'w';
  const w = lineWin(l);
  return sideWhite ? w : 100 - w;
}

export function evalText(l: Pick<AnalysisLine, 'scoreWhite' | 'mate'> | undefined, sideWhite: boolean): string {
  if (!l) return '';
  if (l.mate) {
    const whiteMates = sideWhite ? l.mate > 0 : l.mate < 0;
    return `${whiteMates ? '' : '-'}M${Math.abs(l.mate)}`;
  }
  const v = l.scoreWhite / 100;
  return (v > 0 ? '+' : '') + v.toFixed(2);
}

export function moveAccuracy(drop: number): number {
  return Math.max(0, Math.min(100, 103.1668 * Math.exp(-0.04354 * drop) - 3.1669));
}

export interface MoveReview {
  ply: number;
  uci: string;
  san: string;
  color: Color;
  cls: MoveClass;
  /** Tỉ lệ thắng tốt nhất có thể trước nước đi (góc nhìn bên đi) */
  winBest: number;
  /** Tỉ lệ thắng sau nước đã đi (góc nhìn bên đi) */
  winPlayed: number;
  drop: number;
  accuracy: number;
  headline: string;
  comments: string[];
  warning?: string;
  best?: { uci: string; san: string; pvSan: string[]; desc: string };
  refutation?: { uci: string; san: string; pvSan: string[]; desc: string };
  facts: MoveFacts;
}

/** Thêm dấu chấm cuối câu nếu chưa có dấu kết thúc */
const sentence = (t: string) => (/[.!?…]$/.test(t.trim()) ? t : t + '.');

function describeUci(pos: Position, uci: string): string {
  const m = pos.moveFromUci(uci);
  if (!m) return '';
  return describeMove(analyzeMove(pos, m));
}

/** Đánh giá một nước đi đã thực hiện. `posBefore` không bị thay đổi. */
export function reviewMove(args: {
  posBefore: Position;
  uci: string;
  ply: number;
  before: AnalysisResult | null;
  after: AnalysisResult | null;
  isBook: boolean;
  openingName?: string;
  /** Nước đi ngay trước đó (của đối thủ), để nhận ra nước bắt lại quân đơn giản */
  prevUci?: string;
}): MoveReview {
  const pos = args.posBefore;
  const m = pos.moveFromUci(args.uci);
  const facts = analyzeMove(pos, m);
  const color = pos.side;
  const bestLine = args.before?.lines[0];
  const inLines = args.before?.lines.find((l) => l.uci === args.uci);

  let winPlayed: number;
  if (facts.mate) winPlayed = 100;
  else if (facts.stalemate) winPlayed = 50;
  else if (inLines) winPlayed = lineWin(inLines);
  else if (args.after?.lines.length) winPlayed = 100 - lineWin(args.after.lines[0]);
  else winPlayed = bestLine ? lineWin(bestLine) : 50;
  const winBest = bestLine ? Math.max(lineWin(bestLine), winPlayed) : winPlayed;
  const isBest = !bestLine || bestLine.uci === args.uci;
  const drop = isBest ? 0 : Math.max(0, winBest - winPlayed);

  // Thí quân thật sự: quân (không phải tốt/Vua) đứng ở ô bị bắt có lợi, nước đáp tốt nhất của đối thủ là bắt nó,
  // và sau diễn biến chính ta vẫn thiếu vật chất – nhưng thế cờ vẫn tốt.
  let sacrifice = false;
  const reply0 = args.after?.lines[0];
  if (facts.movedHanging && facts.type >= KNIGHT && facts.type !== 6 && facts.captured < facts.type && !facts.mate && reply0 && reply0.uci.slice(2, 4) === facts.to) {
    pos.make(m);
    const swing = materialSwing(pos, reply0.pv.slice(0, 6), color);
    pos.unmake();
    const capturedNow = facts.captured ? [0, 1, 3, 3, 5, 9][facts.captured] : 0;
    sacrifice = swing + capturedNow <= -2;
  }
  const legalCount = pos.legalMoves().length;
  const recapture = !!args.prevUci && facts.captured > 0 && args.prevUci.slice(2, 4) === facts.to;

  let cls: MoveClass;
  if (args.isBook) cls = 'book';
  else if (isBest || drop < 1) {
    const second = args.before?.lines[1];
    if (sacrifice && winPlayed >= 50 && winBest < 98) cls = 'brilliant';
    else if (second && legalCount > 1 && !recapture && !facts.check && lineWin(bestLine!) - lineWin(second) >= 18 && winPlayed >= 35 && winPlayed <= 97) cls = 'great';
    else cls = 'best';
  } else if (drop < 2) cls = 'excellent';
  else if (drop < 5) cls = 'good';
  else if (drop < 10) cls = 'inaccuracy';
  else if (winBest >= 80 && winPlayed >= 45 && drop < 30) cls = 'miss';
  else if (drop < 20) cls = 'mistake';
  else cls = 'blunder';

  const accuracy = cls === 'book' ? 100 : moveAccuracy(drop);
  const desc = describeMove(facts);
  const comments: string[] = [];
  let headline = '';
  const review: MoveReview = {
    ply: args.ply,
    uci: args.uci,
    san: facts.san,
    color,
    cls,
    winBest,
    winPlayed,
    drop,
    accuracy,
    headline,
    comments,
    facts,
  };

  if (bestLine && !isBest) {
    review.best = { uci: bestLine.uci, san: bestLine.san, pvSan: bestLine.pvSan.slice(0, 6), desc: describeUci(pos, bestLine.uci) };
  }
  // Nước đáp trả mạnh nhất của đối thủ
  const reply = args.after?.lines[0];
  if (reply && !facts.mate) {
    pos.make(m);
    review.refutation = { uci: reply.uci, san: reply.san, pvSan: reply.pvSan.slice(0, 6), desc: describeUci(pos, reply.uci) };
    pos.unmake();
  }

  const warn = hangingWarning(facts);
  switch (cls) {
    case 'book':
      headline = 'Nước đi lý thuyết';
      comments.push(args.openingName ? `Đúng sách! Đây là nước đi quen thuộc trong khai cuộc **${args.openingName}**.` : 'Đúng sách khai cuộc – các kiện tướng vẫn đi như vậy.');
      comments.push(sentence(desc));
      break;
    case 'brilliant':
      headline = 'Tuyệt diệu!!';
      comments.push(`Một nước thí quân xuất thần: bạn chấp nhận để ${piece(facts.type)} bị bắt để đổi lấy thế tấn công.`);
      comments.push(sentence(desc));
      break;
    case 'great':
      headline = 'Nước đi hay!';
      comments.push('Đây gần như là nước đi duy nhất giữ được thế cờ – các nước khác đều kém hơn rõ rệt.');
      comments.push(sentence(desc));
      break;
    case 'best':
      headline = facts.mate ? 'Chiếu hết!' : 'Tốt nhất!';
      comments.push(sentence(desc));
      break;
    case 'excellent':
      headline = 'Xuất sắc!';
      comments.push(sentence(desc));
      if (review.best) comments.push(`Máy chọn **${review.best.san}**, nhưng chênh lệch rất nhỏ.`);
      break;
    case 'good':
      headline = 'Nước đi tốt';
      comments.push(sentence(desc));
      if (review.best) comments.push(`Mạnh hơn một chút là **${review.best.san}**: ${review.best.desc}.`);
      break;
    case 'inaccuracy':
      headline = 'Thiếu chính xác';
      comments.push(sentence(desc));
      if (review.best) comments.push(`Tốt hơn là **${review.best.san}**: ${review.best.desc}.`);
      break;
    case 'miss':
      headline = 'Bỏ lỡ cơ hội!';
      if (review.best) {
        const gain = materialSwing(pos, bestLine!.pv.slice(0, 6), color);
        comments.push(`Bạn đã có cơ hội với **${review.best.san}**: ${review.best.desc}${gain >= 2 ? `, giành được ${materialText(gain)}` : ''}${bestLine!.mate > 0 ? ` – chiếu hết sau ${bestLine!.mate} nước` : ''}.`);
      }
      comments.push(`Nước đã đi (${facts.san}) vẫn giữ được thế, nhưng lợi thế đã giảm đáng kể.`);
      break;
    case 'mistake':
    case 'blunder': {
      headline = cls === 'mistake' ? 'Sai lầm!' : 'Sai lầm nghiêm trọng!!';
      if (review.refutation && reply) {
        pos.make(m);
        const loss = materialSwing(pos, reply.pv.slice(0, 6), (color ^ 1) as Color);
        pos.unmake();
        let txt = `Đối thủ có thể đáp lại **${review.refutation.san}**: ${review.refutation.desc}`;
        if (reply.mate > 0) txt += ` – và chiếu hết sau ${reply.mate} nước!`;
        else if (loss >= 2) txt += ` – bạn có nguy cơ mất ${materialText(loss)}.`;
        else txt += '.';
        comments.push(txt);
      } else comments.push(sentence(desc));
      if (review.best) comments.push(`Nên đi **${review.best.san}**: ${review.best.desc}.`);
      break;
    }
  }
  if (warn && (cls === 'inaccuracy' || cls === 'mistake' || cls === 'blunder' || cls === 'miss')) review.warning = warn.charAt(0).toUpperCase() + warn.slice(1) + '.';
  review.headline = headline;
  return review;
}

export interface Prediction {
  uci: string;
  san: string;
  prob: number;
  desc: string;
  win: number;
}

/** Dự đoán nước đi tiếp theo của bên đến lượt, với xác suất ước tính. */
export function predictMoves(pos: Position, a: AnalysisResult | null, temperature = 5): Prediction[] {
  if (!a || !a.lines.length) return [];
  const wins = a.lines.map(lineWin);
  const best = Math.max(...wins);
  const weights = wins.map((w) => Math.exp(-(best - w) / temperature));
  const total = weights.reduce((x, y) => x + y, 0);
  return a.lines.map((l, i) => ({
    uci: l.uci,
    san: l.san,
    prob: Math.round((weights[i] / total) * 100),
    desc: describeUci(pos, l.uci),
    win: wins[i],
  }));
}

export interface GameSummary {
  accuracy: number;
  counts: Record<MoveClass, number>;
  keyMistakes: MoveReview[];
}

export function summarize(reviews: MoveReview[], color: Color): GameSummary {
  const mine = reviews.filter((r) => r && r.color === color);
  const counts = Object.fromEntries(Object.keys(CLASS_INFO).map((k) => [k, 0])) as Record<MoveClass, number>;
  for (const r of mine) counts[r.cls]++;
  // trung bình điều hòa nhẹ giống lichess: kết hợp trung bình cộng và trung bình điều hòa
  const accs = mine.map((r) => Math.max(1, r.accuracy));
  const mean = accs.length ? accs.reduce((a, b) => a + b, 0) / accs.length : 100;
  const harmonic = accs.length ? accs.length / accs.reduce((a, b) => a + 1 / b, 0) : 100;
  const keyMistakes = mine.filter((r) => r.cls === 'blunder' || r.cls === 'mistake' || r.cls === 'miss').sort((a, b) => b.drop - a.drop);
  return { accuracy: (mean + harmonic) / 2, counts, keyMistakes };
}

