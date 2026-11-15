// Báo cáo phân tích ván cho hai bên (src/analysis/report.ts): dữ liệu từng nước dựng tay để kiểm tra từng bài học.
import { describe, expect, it } from 'vitest';
import { assignPhases, buildReport, thinkTimes, type ReportInput } from '../src/analysis/report';
import { CHESS_REVIEW } from '../src/analysis/chessReview';
import type { MoveClass } from '../src/engine/coach';
import type { MoveInsight, Review } from '../src/analysis/types';

const NO: MoveInsight = { lost: 0, missedGain: 0, missedMate: 0, allowedMate: 0, bestTactic: null, refTactic: null, greedy: false };

function rv(ply: number, cls: MoveClass, drop = 0, over: Partial<Review> = {}): Review {
  const winBest = 50;
  return {
    ply,
    uci: 'a1a2',
    san: `M${ply}`,
    color: (ply % 2) as 0 | 1,
    cls,
    winBest,
    winPlayed: winBest - drop,
    drop,
    accuracy: cls === 'book' ? 100 : Math.max(0, 103.1668 * Math.exp(-0.04354 * drop) - 3.1669),
    headline: '',
    comments: [],
    best: drop ? { uci: 'b1b2', san: `B${ply}`, pvSan: [], desc: 'nước tốt hơn' } : undefined,
    refutation: { uci: 'c1c2', san: `R${ply}`, pvSan: [], desc: '' },
    facts: { san: `M${ply}`, uci: 'a1a2', color: (ply % 2) as 0 | 1, type: 2, from: 'a1', to: 'a2', captured: 0, check: false, mate: false, stalemate: false, fork: false, movedHanging: false, newlyHanging: [], targets: [], development: false },
    ...over,
  };
}

/** Ván N nửa nước đều "tốt nhất", sửa từng nước theo `edits` */
function game(n: number, edits: Record<number, { cls: MoveClass; drop?: number; ins?: Partial<MoveInsight>; over?: Partial<Review> }>, extra: Partial<ReportInput> = {}): ReportInput {
  const reviews: Review[] = [];
  const insights: MoveInsight[] = [];
  for (let i = 0; i < n; i++) {
    const e = edits[i];
    reviews.push(rv(i, e?.cls ?? (i < 6 ? 'book' : 'best'), e?.drop ?? 0, e?.over));
    insights.push({ ...NO, ...e?.ins });
  }
  return {
    sideNames: ['Trắng', 'Đen'],
    players: ['An', 'Bình'],
    kingName: 'Vua',
    reviews,
    insights,
    wins: extra.wins ?? Array(n + 1).fill(50),
    phases: extra.phases ?? reviews.map((_, i) => (i < 16 ? 'opening' : i < 60 ? 'middlegame' : 'endgame')),
    result: '1-0',
    reason: 'checkmate',
    clocks: [],
    time: null,
    bookEnd: 6,
    habits: [],
    links: CHESS_REVIEW.links,
    ...extra,
  };
}

const ids = (fs: { id: string }[]) => fs.map((f) => f.id);

describe('bài học từ sai lầm', () => {
  it('gom sai lầm theo nguyên nhân: để đối thủ chiếu hết, ăn quân mắc bẫy, để mất quân, sai lầm thế trận', () => {
    const r = buildReport(
      game(40, {
        21: { cls: 'blunder', drop: 40, ins: { allowedMate: 2, lost: 0 } },
        23: { cls: 'mistake', drop: 15, ins: { lost: 3, greedy: true }, over: { facts: { ...rv(23, 'mistake').facts, captured: 1 } } },
        25: { cls: 'blunder', drop: 30, ins: { lost: 5, refTactic: 'fork' } },
        27: { cls: 'mistake', drop: 12 },
      }),
    );
    const black = r.sides[1];
    expect(ids(black.lessons)).toEqual(expect.arrayContaining(['allowed-mate', 'greedy', 'hanging', 'positional']));
    expect(black.lessons[0].id).toBe('allowed-mate');
    expect(black.lessons.find((l) => l.id === 'hanging')!.plies).toEqual([25]);
    expect(black.lessons.find((l) => l.id === 'hanging')!.text).toContain('chĩa đôi');
    expect(black.lessons.find((l) => l.id === 'positional')!.plies).toEqual([27]);
    // mỗi sai lầm chỉ thuộc một nhóm
    const all = black.lessons.flatMap((l) => (['allowed-mate', 'greedy', 'hanging', 'positional'].includes(l.id) ? l.plies : []));
    expect(new Set(all).size).toBe(all.length);
    // Trắng không mắc lỗi nào
    expect(r.sides[0].lessons.filter((l) => ['hanging', 'positional'].includes(l.id))).toHaveLength(0);
    expect(ids(r.sides[0].strengths)).toContain('no-blunder');
  });

  it('bỏ lỡ chiếu hết và bỏ lỡ đòn ăn quân', () => {
    const r = buildReport(
      game(40, {
        20: { cls: 'miss', drop: 25, ins: { missedMate: 3, bestTactic: 'check' } },
        22: { cls: 'inaccuracy', drop: 7, ins: { missedGain: 3, bestTactic: 'fork' } },
      }),
    );
    const white = r.sides[0];
    expect(white.lessons.find((l) => l.id === 'missed-mate')!.text).toContain('chiếu hết sau 3 nước');
    const mt = white.lessons.find((l) => l.id === 'missed-tactic')!;
    expect(mt.plies).toEqual([22]);
    expect(mt.text).toContain('chĩa đôi');
  });

  it('không trừng phạt sai lầm của đối thủ / trừng phạt kịp thời', () => {
    const wins = Array(41).fill(50);
    wins[22] = 90; // Đen sai ở nước 21 (ply 21) → Trắng 90%
    const bad = buildReport(game(40, { 21: { cls: 'blunder', drop: 40 }, 22: { cls: 'mistake', drop: 30 } }, { wins }));
    expect(bad.sides[0].lessons.find((l) => l.id === 'not-punished')!.plies).toEqual([22]);
    const wins2 = Array(41).fill(50).map((w, i) => (i >= 22 ? 92 : w));
    const good = buildReport(game(40, { 21: { cls: 'blunder', drop: 40 } }, { wins: wins2 }));
    expect(ids(good.sides[0].strengths)).toContain('punished');
  });

  it('có ưu thế lớn mà không thắng → bài học chuyển hóa ưu thế; bị dồn ép mà thắng → điểm mạnh lật ngược', () => {
    const wins = Array(41).fill(50).map((w, i) => (i >= 10 && i < 20 ? 90 : i >= 30 ? 10 : w));
    const r = buildReport(game(40, {}, { wins, result: '0-1', reason: 'checkmate' }));
    const conv = r.sides[0].lessons.find((l) => l.id === 'conversion')!;
    expect(conv.text).toContain('90%');
    expect(conv.weight).toBeGreaterThan(10);
    expect(ids(r.sides[1].strengths)).toContain('comeback');
  });

  it('xin thua khi thế cờ còn tốt; đồng ý hòa khi đang hơn', () => {
    const r = buildReport(game(30, {}, { wins: Array(31).fill(45), result: '1-0', reason: 'resign' }));
    expect(ids(r.sides[1].lessons)).toContain('resign');
    const d = buildReport(game(30, {}, { wins: Array(31).fill(85), result: '1/2-1/2', reason: 'agreement' }));
    expect(ids(d.sides[0].lessons)).toContain('draw');
    expect(ids(d.sides[1].lessons)).not.toContain('draw');
  });

  it('thời gian: sai lầm khi thiếu giờ, đi vội, thua vì hết giờ', () => {
    const time = { initial: 180_000, increment: 0 };
    const n = 40;
    // Trắng nghĩ 1 giây mỗi nước, Đen tốn nhiều thời gian rồi còn 10 giây ở cuối
    const clocks: number[] = [];
    let w = 180_000;
    let b = 180_000;
    for (let i = 0; i < n; i++) {
      if (i % 2 === 0) clocks.push(i < 2 ? w : (w -= 1_000));
      else clocks.push(i < 2 ? b : (b = Math.max(10_000, b - 9_000)));
    }
    const r = buildReport(
      game(n, { 37: { cls: 'blunder', drop: 40 }, 39: { cls: 'mistake', drop: 15 }, 10: { cls: 'mistake', drop: 15 } }, { clocks, time, reason: 'timeout', result: '1-0' }),
    );
    expect(thinkTimes(clocks, time)[4]).toBe(1_000);
    const black = r.sides[1];
    const t = black.lessons.find((l) => l.id === 'time')!;
    expect(t.title).toBe('Thua vì hết giờ');
    // nước 37 Đen còn 27 giây (chưa dưới ngưỡng 20 giây), nước 39 còn 18 giây
    expect(t.plies).toEqual([39]);
    expect(black.time!.left).toBe(10_000);
    // Trắng đi nước 10 (ply 10) trong 1 giây khi còn gần đủ giờ → đi vội
    expect(r.sides[0].lessons.find((l) => l.id === 'hasty')!.plies).toEqual([10]);
  });
});

describe('tổng quan ván', () => {
  it('độ chính xác theo giai đoạn, bước ngoặt quyết định và diễn biến', () => {
    const wins = Array(41).fill(50).map((w, i) => (i >= 26 ? 96 : w));
    const r = buildReport(game(40, { 25: { cls: 'blunder', drop: 45 }, 31: { cls: 'mistake', drop: 12 } }, { wins, opening: 'Ván Ý' }));
    expect(r.sides[1].phases.middlegame.errors).toBe(2);
    expect(r.sides[0].phases.opening.accuracy).toBeCloseTo(100, 0);
    expect(r.moments.map((m) => m.ply)).toEqual([25, 31]);
    expect(r.moments[0].decisive).toBe(true);
    expect(r.story[0].text).toContain('Ván Ý');
    expect(r.story.some((s) => s.text.includes('bước ngoặt quyết định'))).toBe(true);
    expect(r.headline).toContain('Trắng chơi chính xác hơn');
    expect(r.sides[1].verdict).toMatch(/Cần chú ý nhất/);
  });

  it('chia giai đoạn: khai cuộc ít nhất đến hết sách, tàn cuộc khi còn ít quân và không quay lại', () => {
    const counts = [14, 14, 14, 14, 12, 12, 10, 10, 8, 8, 6, 7, 6];
    expect(assignPhases(counts, 2, { middle: 10, end: 6 })).toEqual([
      'opening', 'opening', 'opening', 'opening', 'opening', 'opening',
      'middlegame', 'middlegame', 'middlegame', 'middlegame', 'endgame', 'endgame', 'endgame',
    ]);
    expect(assignPhases(Array(40).fill(14), 24, { middle: 10, end: 6 }).indexOf('middlegame')).toBe(24);
    expect(assignPhases(Array(40).fill(14), 0, { middle: 10, end: 6 }).indexOf('middlegame')).toBe(16);
  });
});
