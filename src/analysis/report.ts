// Tổng hợp phân tích một ván cho CẢ HAI bên: độ chính xác (chung và theo giai đoạn), thời gian, bước ngoặt,
// diễn biến ván đấu, điểm mạnh và bài học rút ra kèm ví dụ trong ván và bài học nên ôn.
// Hàm thuần – không gọi bộ máy cờ; dữ kiện từng nước được tính sẵn (Review, MoveInsight) nên kiểm thử được.
import { CLASS_INFO, type MoveClass } from '../engine/coach';
import type { EndReason, Side, TimeControl } from '../online/protocol';
import type { SheetResult } from './sheet';
import type { Finding, Habit, LessonLinks, MoveInsight, Phase, Review } from './types';

export const PHASES: Phase[] = ['opening', 'middlegame', 'endgame'];
export const PHASE_NAME: Record<Phase, string> = { opening: 'Khai cuộc', middlegame: 'Trung cuộc', endgame: 'Tàn cuộc' };

export interface ReportInput {
  sideNames: [string, string];
  players: [string, string];
  /** "Vua" hoặc "Tướng" */
  kingName: string;
  reviews: Review[];
  insights: MoveInsight[];
  /** Cơ hội thắng của bên đi trước (Trắng/Đỏ) ở thế sau i nước, i = 0..N */
  wins: number[];
  /** Giai đoạn của từng nước */
  phases: Phase[];
  result: SheetResult;
  reason: EndReason | null;
  /** Lời giải thích kết quả, vd "Đen xin thua" */
  reasonText?: string;
  /** Thời gian còn lại sau từng nước (ms), [] nếu biên bản không có */
  clocks: (number | null)[];
  time: TimeControl | null;
  opening?: string;
  /** Chỉ số nước đầu tiên ra khỏi sách khai cuộc (-1: không có nước nào trong sách) */
  bookEnd: number;
  habits: Habit[];
  links: LessonLinks;
}

export interface PhaseStat {
  moves: number;
  accuracy: number | null;
  errors: number;
}

export interface TimeStat {
  /** Thời gian nghĩ trung bình mỗi nước (ms) */
  avg: number;
  longest: { ply: number; ms: number } | null;
  /** Thời gian nghĩ từng nước của bên này (null: không biết) theo chỉ số nửa nước */
  think: (number | null)[];
  /** Thời gian còn lại lúc kết thúc */
  left: number | null;
}

export interface SideReport {
  side: Side;
  accuracy: number | null;
  moves: number;
  counts: Record<MoveClass, number>;
  /** Trung bình phần trăm cơ hội thắng mất đi mỗi nước */
  avgLoss: number;
  /** Tỉ lệ nước tốt (lý thuyết, tốt nhất, xuất sắc, hay, tuyệt diệu) */
  goodShare: number;
  phases: Record<Phase, PhaseStat>;
  time: TimeStat | null;
  strengths: Finding[];
  lessons: Finding[];
  verdict: string;
}

export interface KeyMoment {
  ply: number;
  side: Side;
  cls: MoveClass;
  /** Cơ hội thắng của bên đi (trước và sau nước đi) */
  from: number;
  to: number;
  text: string;
  decisive: boolean;
}

export interface StoryLine {
  text: string;
  ply?: number;
}

export interface GameReport {
  sides: [SideReport, SideReport];
  moments: KeyMoment[];
  story: StoryLine[];
  /** Nhận xét chung một câu */
  headline: string;
}

// -------------------------------------------------------------------------------------------------
// Tiện ích
// -------------------------------------------------------------------------------------------------

/** "12." cho nước của bên đi trước, "12..." cho bên đi sau */
export const moveNo = (ply: number) => `${Math.floor(ply / 2) + 1}${ply % 2 === 0 ? '.' : '...'}`;
/** Số nước trong câu văn: "41" cho bên đi trước, "10..." cho bên đi sau */
const moveRef = (ply: number) => moveNo(ply).replace(/^(\d+)\.$/, '$1');
export const moveLabel = (r: Pick<Review, 'ply' | 'san' | 'cls'>) => `${moveNo(r.ply)} ${r.san}${CLASS_SUFFIX[r.cls] ?? ''}`;
const CLASS_SUFFIX: Partial<Record<MoveClass, string>> = { brilliant: '!!', great: '!', inaccuracy: '?!', mistake: '?', blunder: '??' };

const isError = (r: Review) => r.cls === 'mistake' || r.cls === 'blunder';
const isSlip = (r: Review) => isError(r) || r.cls === 'miss';
const GOOD: MoveClass[] = ['brilliant', 'great', 'best', 'excellent', 'book'];

const pct = (x: number) => `${Math.round(x)}%`;
const sideWin = (w: number, side: Side) => (side === 0 ? w : 100 - w);
const winnerOf = (r: SheetResult): Side | null => (r === '1-0' ? 0 : r === '0-1' ? 1 : null);
const listVi = (xs: string[]) => (xs.length <= 1 ? xs.join('') : `${xs.slice(0, -1).join(', ')} và ${xs[xs.length - 1]}`);
/** Liệt kê tối đa 3 nước làm ví dụ */
const examples = (rs: Review[]) => listVi(rs.slice(0, 3).map((r) => `**${moveLabel(r)}**`)) + (rs.length > 3 ? ` (và ${rs.length - 3} nước khác)` : '');
const times = (n: number) => (n === 1 ? 'một lần' : `${n} lần`);

/** Độ chính xác cả ván theo cách của lichess: trung bình cộng của trung bình cộng và trung bình điều hòa */
export function accuracyOf(rs: Review[]): number | null {
  if (!rs.length) return null;
  const accs = rs.map((r) => Math.max(1, r.accuracy));
  const mean = accs.reduce((a, b) => a + b, 0) / accs.length;
  const harmonic = accs.length / accs.reduce((a, b) => a + 1 / b, 0);
  return (mean + harmonic) / 2;
}

/** Vật chất bằng lời: dùng tên quân cho dễ hình dung */
function materialWords(points: number, variant: 'chess' | 'xiangqi'): string {
  if (variant === 'chess') {
    if (points >= 8.5) return 'cỡ một Hậu';
    if (points >= 4.5) return 'cỡ một Xe';
    if (points >= 2.5) return 'cỡ một quân nhẹ';
    return `${points} điểm vật chất`;
  }
  if (points >= 8.5) return 'cỡ một Xe';
  if (points >= 3.5) return 'cỡ một Mã hoặc Pháo';
  return `${String(points).replace('.', ',')} điểm vật chất`;
}

function stateText(w: number, names: [string, string]): string {
  if (w >= 95) return `${names[0]} gần như đã thắng`;
  if (w >= 80) return `${names[0]} có ưu thế lớn`;
  if (w >= 62) return `${names[0]} nhỉnh hơn`;
  if (w > 38) return 'thế cờ cân bằng';
  if (w > 20) return `${names[1]} nhỉnh hơn`;
  if (w > 5) return `${names[1]} có ưu thế lớn`;
  return `${names[1]} gần như đã thắng`;
}

/**
 * Chia giai đoạn cho từng nước: khai cuộc kéo dài ít nhất tới khi hết sách (tối thiểu 8, tối đa 15 nước mỗi bên)
 * và kết thúc sớm hơn nếu đã đổi nhiều quân; tàn cuộc khi số quân lớn/nhẹ còn ít.
 */
export function assignPhases(pieceCounts: number[], bookEnd: number, limits: { middle: number; end: number }): Phase[] {
  const openingEnd = Math.min(Math.max(bookEnd, 16), 30);
  const out: Phase[] = [];
  let phase: Phase = 'opening';
  for (let i = 0; i < pieceCounts.length; i++) {
    const n = pieceCounts[i];
    if (phase === 'opening' && (i >= openingEnd || n <= limits.middle)) phase = 'middlegame';
    if (phase !== 'endgame' && n <= limits.end) phase = 'endgame';
    out.push(phase);
  }
  return out;
}

/** Thời gian nghĩ từng nước từ nhật ký đồng hồ (hai nước đầu không tính giờ nên không biết) */
export function thinkTimes(clocks: (number | null)[], time: TimeControl | null): (number | null)[] {
  return clocks.map((c, i) => {
    if (!time || c === null || i < 2) return null;
    const prev = clocks[i - 2];
    if (prev === null || prev === undefined) return null;
    return Math.max(0, prev - c + time.increment);
  });
}

const fmtDuration = (ms: number) => {
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s} giây`;
  const m = Math.floor(s / 60);
  return s % 60 ? `${m} phút ${s % 60} giây` : `${m} phút`;
};

// -------------------------------------------------------------------------------------------------
// Báo cáo
// -------------------------------------------------------------------------------------------------

export function buildReport(input: ReportInput, variant: 'chess' | 'xiangqi' = 'chess'): GameReport {
  const { reviews, insights, wins, phases, sideNames } = input;
  const n = reviews.length;
  const winner = winnerOf(input.result);
  const hasClocks = !!input.time && input.clocks.length === n && n > 0;
  const think = hasClocks ? thinkTimes(input.clocks, input.time) : [];
  const lowLimit = input.time ? Math.max(20_000, input.time.initial * 0.1) : 0;
  const clockBefore = (i: number) => (i >= 2 ? input.clocks[i - 2] : input.time?.initial ?? null);

  const sides = ([0, 1] as Side[]).map((side): SideReport => {
    const name = sideNames[side];
    const opp = sideNames[side ^ 1];
    const mine = reviews.filter((r) => r.color === side);
    const counts = Object.fromEntries(Object.keys(CLASS_INFO).map((k) => [k, 0])) as Record<MoveClass, number>;
    for (const r of mine) counts[r.cls]++;
    const accuracy = accuracyOf(mine);
    const avgLoss = mine.length ? mine.reduce((a, r) => a + r.drop, 0) / mine.length : 0;
    const goodShare = mine.length ? (mine.filter((r) => GOOD.includes(r.cls)).length / mine.length) * 100 : 0;
    const phaseStats = Object.fromEntries(
      PHASES.map((p) => {
        const rs = mine.filter((r) => phases[r.ply] === p);
        return [p, { moves: rs.length, accuracy: accuracyOf(rs), errors: rs.filter(isSlip).length }];
      }),
    ) as Record<Phase, PhaseStat>;

    // ---- thời gian ----
    let time: TimeStat | null = null;
    if (hasClocks) {
      const own = mine.map((r) => ({ ply: r.ply, ms: think[r.ply] })).filter((x): x is { ply: number; ms: number } => x.ms !== null);
      const longest = own.reduce<{ ply: number; ms: number } | null>((a, x) => (!a || x.ms > a.ms ? x : a), null);
      const lastMine = mine.length ? input.clocks[mine[mine.length - 1].ply] : null;
      time = { avg: own.length ? own.reduce((a, x) => a + x.ms, 0) / own.length : 0, longest, think, left: lastMine ?? null };
    }

    const lessons: Finding[] = [];
    const strengths: Finding[] = [];
    const L = input.links;
    const used = new Set<number>();
    const ins = (r: Review) => insights[r.ply];
    const errs = mine.filter(isError);

    // 1. Để đối thủ chiếu hết
    const allowMate = errs.filter((r) => ins(r)?.allowedMate > 0);
    if (allowMate.length) {
      allowMate.forEach((r) => used.add(r.ply));
      const r0 = allowMate[0];
      lessons.push({
        id: 'allowed-mate',
        icon: '🚨',
        title: `Bỏ ngỏ ${input.kingName}, để đối thủ có đòn chiếu hết`,
        text: `${times(allowMate.length)} ${name} đi một nước cho phép ${opp} chiếu hết, vd ${examples(allowMate)}: ${opp} có thể đáp **${r0.refutation?.san ?? ''}** và chiếu hết sau ${ins(r0).allowedMate} nước.`,
        tip: `Trước mỗi nước, nhìn quanh ${input.kingName}: đối thủ có nước chiếu nào, có quân nào đang nhắm vào cung ${input.kingName} không? Hãy xem hết các nước chiếu của đối phương trước khi thả tay.`,
        plies: allowMate.map((r) => r.ply),
        links: [L.threats, L.mates],
        weight: 12 + allowMate.reduce((a, r) => a + r.drop, 0) / 10,
      });
    }

    // 2. Ăn quân mắc bẫy
    const greedy = errs.filter((r) => !used.has(r.ply) && ins(r)?.greedy);
    if (greedy.length) {
      greedy.forEach((r) => used.add(r.ply));
      lessons.push({
        id: 'greedy',
        icon: '🪤',
        title: 'Ăn quân nhưng mắc bẫy',
        text: `${name} ăn quân ở ${examples(greedy)} nhưng sau đó mất nhiều hơn (${materialWords(Math.max(...greedy.map((r) => ins(r).lost)), variant)}). Quân "cho không" nhiều khi là mồi nhử.`,
        tip: 'Trước khi ăn, đi thử trong đầu nước đáp của đối thủ: họ có ăn lại, chiếu, bắt đôi hay mở đường tấn công không?',
        plies: greedy.map((r) => r.ply),
        links: [L.trade, L.safety],
        weight: 9 + greedy.reduce((a, r) => a + r.drop, 0) / 10,
      });
    }

    // 3. Để mất quân (quân bị treo, bị bắt đôi, bị ghim…)
    const hanging = errs.filter((r) => !used.has(r.ply) && ins(r)?.lost >= 2);
    if (hanging.length) {
      hanging.forEach((r) => used.add(r.ply));
      const forks = hanging.filter((r) => ins(r).refTactic === 'fork').length;
      const worst = Math.max(...hanging.map((r) => ins(r).lost));
      lessons.push({
        id: 'hanging',
        icon: '🛡️',
        title: 'Để mất quân vì không kiểm tra an toàn',
        text:
          `${times(hanging.length)} ${name} đi nước để đối thủ ăn được quân (nhiều nhất ${materialWords(worst, variant)}): ${examples(hanging)}.` +
          (forks ? ` Trong đó ${forks === hanging.length ? 'tất cả' : forks} là do bị ${variant === 'chess' ? 'chĩa đôi' : 'bắt đôi'}.` : ''),
        tip: 'Thói quen "kiểm tra an toàn" trước khi thả tay: (1) quân vừa đi có được bảo vệ không, (2) nước này có bỏ trống bảo vệ quân nào không, (3) đối thủ có nước chiếu, ăn quân hay đe dọa nào?',
        plies: hanging.map((r) => r.ply),
        links: [L.safety, L.tactics],
        weight: 10 + hanging.reduce((a, r) => a + r.drop, 0) / 10,
      });
    }

    // 4. Bỏ lỡ chiếu hết
    const missMate = mine.filter((r) => ins(r)?.missedMate > 0 && r.cls !== 'best' && r.cls !== 'book');
    if (missMate.length) {
      missMate.forEach((r) => used.add(r.ply));
      const r0 = missMate[0];
      lessons.push({
        id: 'missed-mate',
        icon: '🎯',
        title: 'Bỏ lỡ đòn chiếu hết',
        text: `${name} đã có đòn chiếu hết nhưng không nhìn ra, vd ở nước ${moveRef(r0.ply)} nên đi **${r0.best?.san ?? ''}** (chiếu hết sau ${ins(r0).missedMate} nước)${missMate.length > 1 ? `; tổng cộng ${missMate.length} lần` : ''}.`,
        tip: 'Khi tấn công, luôn xét các nước chiếu trước tiên, kể cả nước thí quân. Luyện các mẫu chiếu hết để nhận ra chúng nhanh hơn.',
        plies: missMate.map((r) => r.ply),
        links: [L.mates, L.puzzles],
        weight: 9 + missMate.length,
      });
    }

    // 5. Bỏ lỡ đòn ăn quân / chiến thuật
    const missTactic = mine.filter(
      (r) => !used.has(r.ply) && (isSlip(r) || r.cls === 'inaccuracy') && ins(r)?.missedGain >= 2 && (ins(r).bestTactic === 'fork' || ins(r).bestTactic === 'capture' || ins(r).bestTactic === 'check' || ins(r).bestTactic === 'threat'),
    );
    if (missTactic.length) {
      missTactic.forEach((r) => used.add(r.ply));
      const forkMiss = missTactic.filter((r) => ins(r).bestTactic === 'fork');
      const r0 = missTactic[0];
      lessons.push({
        id: 'missed-tactic',
        icon: '🔎',
        title: 'Bỏ lỡ cơ hội ăn quân',
        text:
          `${times(missTactic.length)} ${name} bỏ qua đòn giành vật chất, vd ở nước ${moveRef(r0.ply)} có **${r0.best?.san ?? ''}** (lợi ${materialWords(ins(r0).missedGain, variant)}).` +
          (forkMiss.length ? ` ${forkMiss.length === missTactic.length ? 'Đều là' : `${forkMiss.length} lần là`} đòn ${variant === 'chess' ? 'chĩa đôi' : 'bắt đôi'}.` : ''),
        tip: 'Mỗi lượt đi, quét "nước ép buộc" trước: chiếu, ăn quân, đe dọa. Mười phút cờ thế mỗi ngày giúp mắt quen các mẫu đòn.',
        plies: missTactic.map((r) => r.ply),
        links: [L.puzzles, L.tactics],
        weight: 7 + missTactic.reduce((a, r) => a + r.drop, 0) / 15,
      });
    }

    // 6. Sai lầm thế trận (không mất quân ngay)
    const positional = errs.filter((r) => !used.has(r.ply));
    if (positional.length) {
      positional.forEach((r) => used.add(r.ply));
      const r0 = positional[0];
      lessons.push({
        id: 'positional',
        icon: '🧭',
        title: 'Sai lầm về thế trận',
        text: `${examples(positional)} không làm mất quân ngay nhưng khiến thế cờ xấu đi rõ rệt (cơ hội thắng giảm ${pct(r0.drop)} ở nước đầu tiên). ${r0.best ? `Máy đề nghị **${r0.best.san}**: ${r0.best.desc}.` : ''}`.trim(),
        tip: 'Khi không có đòn chiến thuật, tự hỏi: quân nào của mình đang kém nhất, đối thủ đang muốn làm gì? Nước tốt thường cải thiện quân kém hoặc chặn kế hoạch của đối phương.',
        plies: positional.map((r) => r.ply),
        links: [L.plan, L.threats],
        weight: 5 + positional.reduce((a, r) => a + r.drop, 0) / 15,
      });
    }

    // 7. Chưa trừng phạt sai lầm của đối thủ / đã trừng phạt kịp thời
    const notPunished: Review[] = [];
    const punished: Review[] = [];
    for (const o of reviews) {
      if (o.color === side || !isError(o) || o.drop < 10) continue;
      const reply = reviews[o.ply + 1];
      if (!reply) continue;
      if (reply.drop >= 8) notPunished.push(reply);
      else if (['best', 'great', 'brilliant', 'excellent'].includes(reply.cls) && sideWin(wins[reply.ply + 1], side) >= 65) punished.push(reply);
    }
    if (notPunished.length) {
      const r0 = notPunished[0];
      lessons.push({
        id: 'not-punished',
        icon: '🎁',
        title: 'Chưa trừng phạt sai lầm của đối thủ',
        text: `${opp} mắc sai lầm ở nước ${moveRef(r0.ply - 1)} nhưng ${name} đáp lại **${moveLabel(r0)}**, trả lại phần lớn lợi thế${r0.best ? ` (nên đi **${r0.best.san}**)` : ''}.${notPunished.length > 1 ? ` Chuyện này lặp lại ${notPunished.length} lần.` : ''}`,
        tip: 'Sau mỗi nước của đối thủ, dừng lại hỏi: "Nước đó để lại sơ hở gì?" Quân vừa rời đi có đang bảo vệ thứ gì không? Cơ hội thường chỉ tồn tại đúng một nước.',
        plies: notPunished.map((r) => r.ply),
        links: [L.tactics, L.puzzles],
        weight: 6 + notPunished.length * 2,
      });
    }
    if (punished.length) {
      strengths.push({
        id: 'punished',
        icon: '⚡',
        title: 'Trừng phạt sai lầm kịp thời',
        text: `Khi ${opp} sơ hở, ${name} tìm ra ngay nước đáp mạnh nhất: ${examples(punished)}.`,
        plies: punished.map((r) => r.ply),
        weight: 6 + punished.length,
      });
    }

    // 8. Ưu thế: chuyển hóa được hay không; lật ngược thế cờ
    let peak = -1;
    let peakIdx = -1;
    let low = 101;
    for (let i = 1; i < wins.length; i++) {
      const w = sideWin(wins[i], side);
      if (w > peak) {
        peak = w;
        peakIdx = i;
      }
      if (w < low) low = w;
    }
    if (peak >= 85 && input.result !== '*' && winner !== side) {
      lessons.push({
        id: 'conversion',
        icon: '🏁',
        title: 'Chưa biến ưu thế thành chiến thắng',
        text: `Sau nước ${moveRef(peakIdx - 1)} ${name} từng có ${pct(peak)} cơ hội thắng, nhưng ván cờ kết thúc ${winner === null ? 'hòa' : `với thất bại`}.`,
        tip: 'Khi đã hơn: chặn hết phản công của đối thủ trước, đổi bớt quân (nhất là quân tấn công của đối phương) để đơn giản hóa, rồi mới tiến lên. Đừng vội vàng và đừng tham thêm.',
        plies: [peakIdx - 1],
        links: [L.convert, L.endgame],
        weight: winner === null ? 8 : 11,
      });
    }
    if (low <= 20 && winner === side && input.result !== '*') {
      strengths.push({
        id: 'comeback',
        icon: '🔥',
        title: 'Lật ngược thế cờ',
        text: `Có lúc ${name} chỉ còn ${pct(low)} cơ hội thắng nhưng vẫn kiên trì chống đỡ và giành chiến thắng.`,
        plies: [],
        weight: 7,
      });
    } else if (low <= 15 && winner === null && input.result === '1/2-1/2') {
      strengths.push({ id: 'save', icon: '🧱', title: 'Cứu hòa ngoan cường', text: `Có lúc ${name} chỉ còn ${pct(low)} cơ hội nhưng vẫn giữ được thế hòa.`, plies: [], weight: 6 });
    }
    if (peak >= 85 && winner === side) {
      const last = reviews[n - 1];
      strengths.push({
        id: 'converted',
        icon: '🏆',
        title: last?.facts.mate && last.color === side ? 'Kết thúc ván bằng đòn chiếu hết' : 'Biến ưu thế thành chiến thắng',
        text: `${name} nắm ưu thế từ nước ${moveRef(Math.max(0, firstAbove(wins, side, 85) - 1))} và đưa ván cờ về đích${last?.facts.mate && last.color === side ? ` bằng **${moveLabel(last)}**` : ''}.`,
        plies: last?.facts.mate && last.color === side ? [last.ply] : [],
        weight: 5,
      });
    }

    // 9. Giai đoạn ván cờ
    const op = phaseStats.opening;
    const opErr = mine.filter((r) => phases[r.ply] === 'opening' && (isSlip(r) || r.cls === 'inaccuracy'));
    if (op.moves >= 4 && (opErr.some(isSlip) || (op.accuracy ?? 100) < 70)) {
      lessons.push({
        id: 'opening',
        icon: '📖',
        title: 'Khai cuộc còn sơ hở',
        text: `Độ chính xác ở khai cuộc ${pct(op.accuracy ?? 0)}; các nước cần xem lại: ${examples(opErr)}.`,
        tip:
          variant === 'chess'
            ? 'Nhắc lại nguyên tắc: tranh trung tâm, ra Mã và Tượng, nhập thành sớm, không đi một quân hai lần và không ăn Tốt mà bỏ phát triển.'
            : 'Nhắc lại nguyên tắc: xuất Xe sớm, lên Mã bảo vệ Tốt đầu, không để Pháo đầu của đối thủ uy hiếp trung lộ và tránh đi một quân nhiều lần.',
        plies: opErr.map((r) => r.ply),
        links: [L.opening],
        weight: 4 + opErr.filter(isSlip).length * 2,
      });
    } else if (op.moves >= 6 && opErr.length === 0) {
      const book = mine.filter((r) => r.cls === 'book').length;
      strengths.push({
        id: 'opening',
        icon: '📖',
        title: 'Khai cuộc vững vàng',
        text: `Không có nước thiếu chính xác nào trong ${op.moves} nước khai cuộc${book >= 3 ? `, đi đúng sách ${book} nước${input.opening ? ` (${input.opening})` : ''}` : ''}.`,
        plies: [],
        weight: 4,
      });
    }
    const eg = phaseStats.endgame;
    const egErr = mine.filter((r) => phases[r.ply] === 'endgame' && isSlip(r));
    if (eg.moves >= 6 && (egErr.length || (eg.accuracy ?? 100) < 70)) {
      lessons.push({
        id: 'endgame',
        icon: '👑',
        title: 'Kỹ thuật tàn cuộc',
        text: `Ở tàn cuộc độ chính xác chỉ ${pct(eg.accuracy ?? 0)}${egErr.length ? `, có ${egErr.length} sai lầm: ${examples(egErr)}` : ''}. Tàn cuộc ít quân nên mỗi nhịp đi đều quan trọng.`,
        tip: `Ở tàn cuộc: đưa ${input.kingName} vào trận${variant === 'chess' ? ', đẩy Tốt thông' : ' khi an toàn, phối hợp quân tấn công với Tốt qua sông'}, và tính kỹ từng nhịp trước khi đổi quân.`,
        plies: egErr.map((r) => r.ply),
        links: [L.endgame],
        weight: 5 + egErr.length * 2,
      });
    } else if (eg.moves >= 6 && !egErr.length && (eg.accuracy ?? 0) >= 85) {
      strengths.push({ id: 'endgame', icon: '👑', title: 'Tàn cuộc chính xác', text: `${eg.moves} nước tàn cuộc với độ chính xác ${pct(eg.accuracy ?? 0)}.`, plies: [], weight: 4 });
    }

    // 10. Thời gian
    if (hasClocks && input.time) {
      const slips = mine.filter(isSlip);
      const lowTime = slips.filter((r) => (clockBefore(r.ply) ?? Infinity) < lowLimit);
      const hasty = errs.filter((r) => (think[r.ply] ?? Infinity) <= 3000 && (clockBefore(r.ply) ?? 0) >= input.time!.initial * 0.4);
      const flagged = input.reason === 'timeout' && winner !== null && winner !== side;
      if (flagged || lowTime.length) {
        const lastW = sideWin(wins[wins.length - 1], side);
        const long = time?.longest;
        lessons.push({
          id: 'time',
          icon: '⏱️',
          title: flagged ? 'Thua vì hết giờ' : 'Sai lầm khi thiếu thời gian',
          text:
            (flagged ? `${name} hết giờ${lastW >= 40 ? ` trong khi thế cờ vẫn còn ${pct(lastW)} cơ hội thắng` : ''}. ` : '') +
            (lowTime.length ? `${lowTime.length}/${slips.length} sai lầm xảy ra khi đồng hồ còn dưới ${fmtDuration(lowLimit)}: ${examples(lowTime)}. ` : '') +
            (long && long.ms >= input.time.initial * 0.15 ? `Nước nghĩ lâu nhất là ${moveRef(long.ply)} (${fmtDuration(long.ms)}).` : ''),
          tip: 'Chia thời gian: đi nhanh ở khai cuộc quen thuộc, dành giờ cho thế cờ phức tạp. Khi còn ít giờ, ưu tiên nước an toàn, đơn giản và tận dụng thời gian cộng thêm.',
          plies: lowTime.map((r) => r.ply),
          weight: flagged ? 10 : 6 + lowTime.length,
        });
      }
      if (hasty.length) {
        lessons.push({
          id: 'hasty',
          icon: '💨',
          title: 'Đi vội ở thế cờ quan trọng',
          text: `${examples(hasty)} được đi trong vòng 3 giây dù đồng hồ còn nhiều thời gian, và đều là sai lầm.`,
          tip: 'Khi đối thủ vừa đi một nước bất ngờ hoặc thế cờ có nhiều đòn ăn quân, hãy dừng lại ít nhất 10 giây để kiểm tra trước khi đi.',
          plies: hasty.map((r) => r.ply),
          links: [L.safety],
          weight: 5 + hasty.length,
        });
      }
    }

    // 11. Kết thúc ván: xin thua quá sớm / đồng ý hòa khi đang hơn
    const finalW = sideWin(wins[wins.length - 1], side);
    if (input.reason === 'resign' && winner !== null && winner !== side && finalW >= 25) {
      lessons.push({
        id: 'resign',
        icon: '🏳️',
        title: 'Xin thua quá sớm',
        text: `Lúc xin thua, máy đánh giá ${name} vẫn còn ${pct(finalW)} cơ hội thắng. Thế cờ chưa hết hy vọng.`,
        tip: 'Chỉ nên xin thua khi thế cờ thật sự vô vọng (thiếu nhiều quân, không còn phản công). Đối thủ cũng có thể sai lầm.',
        plies: [],
        weight: 7,
      });
    }
    if (input.reason === 'agreement' && finalW >= 75) {
      lessons.push({
        id: 'draw',
        icon: '🤝',
        title: 'Đồng ý hòa khi đang ưu thế',
        text: `Ván cờ hòa theo thỏa thuận trong khi ${name} có ${pct(finalW)} cơ hội thắng.`,
        tip: 'Trước khi nhận hòa, hãy đánh giá thế cờ: hơn quân, Vua/Tướng đối thủ yếu hay có Tốt thông là lý do để chơi tiếp.',
        plies: [],
        weight: 6,
      });
    }

    // 12. Thói quen khai cuộc riêng của từng môn
    for (const h of input.habits) if (h.side === side) lessons.push(h);

    // ---- điểm mạnh chung ----
    if (accuracy !== null && mine.length >= 8) {
      if (accuracy >= 90) strengths.push({ id: 'accuracy', icon: '🎯', title: 'Độ chính xác rất cao', text: `${name} chơi với độ chính xác ${pct(accuracy)}, tỉ lệ nước tốt ${pct(goodShare)}.`, plies: [], weight: 8 });
      else if (accuracy >= 80) strengths.push({ id: 'accuracy', icon: '🎯', title: 'Chơi chắc tay', text: `Độ chính xác ${pct(accuracy)}, ${pct(goodShare)} số nước là nước tốt.`, plies: [], weight: 5 });
    }
    const shining = mine.filter((r) => r.cls === 'brilliant' || r.cls === 'great');
    if (shining.length) {
      strengths.push({
        id: 'great',
        icon: '💎',
        title: shining.some((r) => r.cls === 'brilliant') ? 'Có nước đi tuyệt diệu' : 'Tìm ra nước hay',
        text: `${name} tìm được ${shining.length === 1 ? 'nước' : `${shining.length} nước`} gần như duy nhất giữ hoặc giành thế cờ: ${examples(shining)}.`,
        plies: shining.map((r) => r.ply),
        weight: 7 + shining.length,
      });
    }
    if (mine.length >= 10 && !counts.blunder) {
      strengths.push({
        id: 'no-blunder',
        icon: '✅',
        title: 'Không có sai lầm nghiêm trọng',
        text: `Suốt ${mine.length} nước, ${name} không để mất quân hay thế cờ một cách nặng nề.`,
        plies: [],
        weight: counts.mistake ? 3 : 6,
      });
    }

    lessons.sort((a, b) => b.weight - a.weight);
    strengths.sort((a, b) => b.weight - a.weight);
    return {
      side,
      accuracy,
      moves: mine.length,
      counts,
      avgLoss,
      goodShare,
      phases: phaseStats,
      time,
      strengths,
      lessons,
      verdict: verdictOf(accuracy, mine.length, lessons, strengths, phaseStats),
    };
  }) as [SideReport, SideReport];

  const moments = keyMoments(input);
  return { sides, moments, story: storyOf(input, moments), headline: headlineOf(input, sides) };
}

function firstAbove(wins: number[], side: Side, limit: number): number {
  let idx = wins.length - 1;
  // tìm thời điểm sớm nhất mà từ đó trở đi bên này luôn giữ ưu thế
  for (let i = wins.length - 1; i >= 1; i--) {
    if (sideWin(wins[i], side) >= limit) idx = i;
    else break;
  }
  return idx;
}

function verdictOf(acc: number | null, moves: number, lessons: Finding[], strengths: Finding[], phases: Record<Phase, PhaseStat>): string {
  if (acc === null || !moves) return 'Chưa có nước đi nào để đánh giá.';
  const band = acc >= 90 ? 'Chơi rất chính xác' : acc >= 80 ? 'Chơi tốt' : acc >= 70 ? 'Chơi khá' : acc >= 55 ? 'Còn khá nhiều sai sót' : 'Một ván nhiều sai sót';
  // giai đoạn tốt nhất / yếu nhất (chỉ xét giai đoạn có từ 4 nước)
  const ranked = PHASES.map((p) => ({ p, ...phases[p] }))
    .filter((x) => x.moves >= 4 && x.accuracy !== null)
    .sort((a, b) => b.accuracy! - a.accuracy!);
  let phaseNote = '';
  if (ranked.length >= 2 && ranked[0].accuracy! - ranked[ranked.length - 1].accuracy! >= 12) {
    phaseNote = `, mạnh nhất ở ${PHASE_NAME[ranked[0].p].toLowerCase()} và yếu nhất ở ${PHASE_NAME[ranked[ranked.length - 1].p].toLowerCase()}`;
  }
  const focus = lessons[0] ? ` Cần chú ý nhất: “${lessons[0].title}”.` : strengths[0] ? ` Điểm sáng: “${strengths[0].title}”.` : '';
  return `${band}${phaseNote}.${focus}`;
}

function keyMoments(input: ReportInput): KeyMoment[] {
  const { reviews, wins, sideNames, result } = input;
  const winner = winnerOf(result);
  const cands = reviews.filter((r) => isSlip(r) && r.drop >= 10);
  const top = [...cands].sort((a, b) => b.drop - a.drop).slice(0, 5).sort((a, b) => a.ply - b.ply);
  // bước ngoặt quyết định: sai lầm cuối cùng của bên thua mà sau đó bên thắng luôn giữ ≥ 70%
  let decisive = -1;
  if (winner !== null) {
    for (const r of top) {
      if (r.color === winner) continue;
      const after = wins.slice(r.ply + 1).every((w) => sideWin(w, winner) >= 70);
      if (after) {
        decisive = r.ply;
        break;
      }
    }
  }
  return top.map((r) => {
    const name = sideNames[r.color];
    const state = stateText(wins[r.ply + 1], sideNames);
    return {
      ply: r.ply,
      side: r.color,
      cls: r.cls,
      from: r.winBest,
      to: r.winPlayed,
      decisive: r.ply === decisive,
      text: `${name} đi **${moveLabel(r)}** (${CLASS_INFO[r.cls].label.toLowerCase()}): cơ hội thắng của ${name} từ ${pct(r.winBest)} còn ${pct(r.winPlayed)}, ${state}.`,
    };
  });
}

function storyOf(input: ReportInput, moments: KeyMoment[]): StoryLine[] {
  const { reviews, wins, sideNames, phases } = input;
  const out: StoryLine[] = [];
  const n = reviews.length;
  if (!n) return [{ text: 'Ván cờ chưa có nước đi nào.' }];
  if (input.opening) {
    out.push({
      text: `Ván cờ mở đầu bằng **${input.opening}**${input.bookEnd >= 4 ? `; hai bên đi đúng sách khai cuộc đến nước ${moveNo(input.bookEnd - 1).replace(/\.+$/, '')}` : ''}.`,
    });
  } else out.push({ text: 'Hai bên không đi theo một khai cuộc có trong sách của Kỳ Đạo.' });
  const midStart = phases.indexOf('middlegame');
  if (midStart > 0) out.push({ text: `Hết khai cuộc (nước ${moveNo(midStart).replace(/\.+$/, '')}), ${stateText(wins[midStart], sideNames)}.`, ply: midStart - 1 });
  for (const m of moments) {
    const r = reviews[m.ply];
    out.push({
      ply: m.ply,
      text: `Nước ${moveNo(m.ply).replace(/\.+$/, '')}: ${sideNames[m.side]} đi **${moveLabel(r)}** và ${stateText(wins[m.ply + 1], sideNames)} (${sideNames[0]} ${pct(wins[m.ply + 1])}).${m.decisive ? ' Đây là bước ngoặt quyết định ván cờ.' : ''}`,
    });
  }
  if (!moments.length) out.push({ text: 'Không bên nào mắc sai lầm lớn: thế cờ giữ ổn định suốt ván.' });
  const endStart = phases.indexOf('endgame');
  if (endStart > 0 && endStart < n - 2) out.push({ text: `Ván cờ vào tàn cuộc từ nước ${moveNo(endStart).replace(/\.+$/, '')} khi ${stateText(wins[endStart], sideNames)}.`, ply: endStart - 1 });
  const full = Math.ceil(n / 2);
  const res = input.result === '1-0' ? `${sideNames[0]} thắng` : input.result === '0-1' ? `${sideNames[1]} thắng` : input.result === '1/2-1/2' ? 'hòa' : 'chưa có kết quả';
  out.push({ text: `Ván cờ kết thúc sau ${full} nước${input.reasonText ? ` (${input.reasonText})` : ''}: ${res}.`, ply: n - 1 });
  // sắp xếp theo diễn biến (giữ câu mở đầu ở đầu)
  const [first, ...rest] = out;
  rest.sort((a, b) => (a.ply ?? -1) - (b.ply ?? -1));
  return [first, ...rest];
}

function headlineOf(input: ReportInput, sides: [SideReport, SideReport]): string {
  const [a, b] = sides;
  const names = input.sideNames;
  if (a.accuracy === null || b.accuracy === null) return 'Ván cờ quá ngắn để so sánh hai bên.';
  const diff = a.accuracy - b.accuracy;
  const better = diff >= 0 ? 0 : 1;
  const winner = winnerOf(input.result);
  if (Math.abs(diff) < 4) {
    const even = `Hai bên chơi ngang tài (${pct(a.accuracy)} và ${pct(b.accuracy)})`;
    if (winner === null) return `${even}${input.result === '1/2-1/2' ? ' và chia điểm' : ''}.`;
    return `${even}; ván cờ được định đoạt bởi ${input.reason === 'timeout' ? 'đồng hồ' : 'vài khoảnh khắc then chốt'}.`;
  }
  const tail = winner === null ? (input.result === '1/2-1/2' ? ' nhưng không tận dụng được để giành chiến thắng' : '') : winner === better ? ' và giành chiến thắng xứng đáng' : ` nhưng ${names[winner]} mới là người thắng`;
  return `${names[better]} chơi chính xác hơn (${pct(sides[better].accuracy!)} so với ${pct(sides[better ^ 1].accuracy!)})${tail}.`;
}
