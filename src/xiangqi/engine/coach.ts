// "Bộ não huấn luyện viên" cho cờ tướng: tỉ lệ thắng, phân loại nước đi, độ chính xác, lời nhận xét và dự đoán.
// Dùng chung thang phân loại và công thức độ chính xác với phần cờ vua (src/engine/coach.ts).
import { Position, Color, HORSE, KING } from './board';
import type { AnalysisLine, AnalysisResult } from '../../engine/protocol';
import { CLASS_INFO, MoveClass, moveAccuracy, winPct } from '../../engine/coach';
import { analyzeMove, describeMove, hangingWarning, materialSwing, materialText, piece, MoveFacts } from './explain';

export { CLASS_INFO, type MoveClass };

/** Thang điểm cờ tướng (Xe ≈ 900) lớn hơn cờ vua: quy đổi trước khi tính tỉ lệ thắng */
const SCALE = 0.75;

export function lineWin(l: Pick<AnalysisLine, 'score' | 'mate'>): number {
  if (l.mate > 0) return 100;
  if (l.mate < 0) return 0;
  return winPct(l.score * SCALE);
}

/** Tỉ lệ thắng của Đỏ từ một kết quả phân tích */
export function redWin(a: AnalysisResult | null | undefined): number | null {
  if (!a || !a.lines.length) return null;
  const l = a.lines[0];
  const sideRed = a.fen.split(' ')[1] !== 'b';
  const w = lineWin(l);
  return sideRed ? w : 100 - w;
}

export function evalText(l: Pick<AnalysisLine, 'scoreWhite' | 'mate'> | undefined, sideRed: boolean): string {
  if (!l) return '';
  if (l.mate) {
    const redMates = sideRed ? l.mate > 0 : l.mate < 0;
    return `${redMates ? '' : '-'}M${Math.abs(l.mate)}`;
  }
  const v = l.scoreWhite / 100;
  return (v > 0 ? '+' : '') + v.toFixed(2);
}

export interface MoveReview {
  ply: number;
  uci: string;
  san: string;
  color: Color;
  cls: MoveClass;
  winBest: number;
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
  else if (inLines) winPlayed = lineWin(inLines);
  else if (args.after?.lines.length) winPlayed = 100 - lineWin(args.after.lines[0]);
  else winPlayed = bestLine ? lineWin(bestLine) : 50;
  const winBest = bestLine ? Math.max(lineWin(bestLine), winPlayed) : winPlayed;
  const isBest = !bestLine || bestLine.uci === args.uci;
  const drop = isBest ? 0 : Math.max(0, winBest - winPlayed);

  // Thí quân thật sự: quân lớn đứng ở điểm bị ăn có lợi, đối phương đáp bằng cách ăn nó, sau diễn biến chính ta vẫn thiếu
  // vật chất – nhưng thế cờ vẫn tốt.
  let sacrifice = false;
  const reply0 = args.after?.lines[0];
  if (facts.movedHanging && facts.type >= HORSE && facts.type !== KING && !facts.mate && reply0 && reply0.uci.slice(2, 4) === facts.to) {
    pos.make(m);
    const swing = materialSwing(pos, reply0.pv.slice(0, 6), color);
    pos.unmake();
    const capturedNow = facts.captured ? [0, 0, 2, 2, 4, 9, 4.5, 1][facts.captured] : 0;
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
  const review: MoveReview = { ply: args.ply, uci: args.uci, san: facts.san, color, cls, winBest, winPlayed, drop, accuracy, headline, comments, facts };

  if (bestLine && !isBest) review.best = { uci: bestLine.uci, san: bestLine.san, pvSan: bestLine.pvSan.slice(0, 6), desc: describeUci(pos, bestLine.uci) };
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
      comments.push(args.openingName ? `Đúng bài bản! Đây là nước đi quen thuộc trong khai cuộc **${args.openingName}**.` : 'Đúng lý thuyết khai cuộc – các cao thủ vẫn đi như vậy.');
      comments.push(sentence(desc.charAt(0).toUpperCase() + desc.slice(1)));
      break;
    case 'brilliant':
      headline = 'Tuyệt diệu!!';
      comments.push(`Một nước thí quân xuất thần: bạn chấp nhận để ${piece(facts.type)} bị ăn để đổi lấy thế tấn công.`);
      comments.push(sentence(desc.charAt(0).toUpperCase() + desc.slice(1)));
      break;
    case 'great':
      headline = 'Nước đi hay!';
      comments.push('Đây gần như là nước đi duy nhất giữ được thế cờ – các nước khác đều kém hơn rõ rệt.');
      comments.push(sentence(desc.charAt(0).toUpperCase() + desc.slice(1)));
      break;
    case 'best':
      headline = facts.mate ? (facts.stalemate ? 'Khốn bí!' : 'Chiếu bí!') : 'Tốt nhất!';
      comments.push(sentence(desc.charAt(0).toUpperCase() + desc.slice(1)));
      break;
    case 'excellent':
      headline = 'Xuất sắc!';
      comments.push(sentence(desc.charAt(0).toUpperCase() + desc.slice(1)));
      if (review.best) comments.push(`Máy chọn **${review.best.san}**, nhưng chênh lệch rất nhỏ.`);
      break;
    case 'good':
      headline = 'Nước đi tốt';
      comments.push(sentence(desc.charAt(0).toUpperCase() + desc.slice(1)));
      if (review.best) comments.push(`Mạnh hơn một chút là **${review.best.san}**: ${review.best.desc}.`);
      break;
    case 'inaccuracy':
      headline = 'Thiếu chính xác';
      comments.push(sentence(desc.charAt(0).toUpperCase() + desc.slice(1)));
      if (review.best) comments.push(`Tốt hơn là **${review.best.san}**: ${review.best.desc}.`);
      break;
    case 'miss':
      headline = 'Bỏ lỡ cơ hội!';
      if (review.best) {
        const gain = materialSwing(pos, bestLine!.pv.slice(0, 6), color);
        comments.push(`Bạn đã có cơ hội với **${review.best.san}**: ${review.best.desc}${gain >= 2 ? `, giành được ${materialText(gain)}` : ''}${bestLine!.mate > 0 ? ` – thắng sau ${bestLine!.mate} nước` : ''}.`);
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
        if (reply.mate > 0) txt += ` – và thắng sau ${reply.mate} nước!`;
        else if (loss >= 2) txt += ` – bạn có nguy cơ mất ${materialText(loss)}.`;
        else txt += '.';
        comments.push(txt);
      } else comments.push(sentence(desc.charAt(0).toUpperCase() + desc.slice(1)));
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

export function predictMoves(pos: Position, a: AnalysisResult | null, temperature = 5): Prediction[] {
  if (!a || !a.lines.length) return [];
  const wins = a.lines.map(lineWin);
  const best = Math.max(...wins);
  const weights = wins.map((w) => Math.exp(-(best - w) / temperature));
  const total = weights.reduce((x, y) => x + y, 0);
  return a.lines.map((l, i) => ({ uci: l.uci, san: l.san, prob: Math.round((weights[i] / total) * 100), desc: describeUci(pos, l.uci), win: wins[i] }));
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
  const accs = mine.map((r) => Math.max(1, r.accuracy));
  const mean = accs.length ? accs.reduce((a, b) => a + b, 0) / accs.length : 100;
  const harmonic = accs.length ? accs.length / accs.reduce((a, b) => a + 1 / b, 0) : 100;
  const keyMistakes = mine.filter((r) => r.cls === 'blunder' || r.cls === 'mistake' || r.cls === 'miss').sort((a, b) => b.drop - a.drop);
  return { accuracy: (mean + harmonic) / 2, counts, keyMistakes };
}
