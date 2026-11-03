import { describe, it, expect, beforeAll } from 'vitest';
import { Position, START_FEN, playLine } from '../src/engine/board';
import { MATE } from '../src/engine/search';
import { StockfishEngine } from '../src/engine/stockfish';
import { deepHintAnalysis, explainHint, numbered, pointsText, settledSwing, temptingReplies, type AnalysisRequester, type HintSection } from '../src/engine/hint';
import type { AnalysisLine, AnalysisResult } from '../src/engine/protocol';
import { installNodeWorker } from './node-stockfish';

/** Phương án phân tích dựng tay: điểm theo góc nhìn bên đến lượt ở `pos` */
function line(pos: Position, ucis: string[], score: number, mate = 0): AnalysisLine {
  const sans: string[] = [];
  for (const u of ucis) {
    const m = pos.moveFromUci(u);
    if (!m) throw new Error('nước không hợp lệ ' + u);
    sans.push(pos.moveToSan(m));
    pos.make(m);
  }
  for (let i = 0; i < ucis.length; i++) pos.unmake();
  const s = mate ? (mate > 0 ? MATE - (2 * mate - 1) : -(MATE + 2 * mate)) : score;
  return { uci: ucis[0], san: sans[0], score: s, scoreWhite: pos.side === 0 ? s : -s, mate, pv: ucis, pvSan: sans };
}
const result = (pos: Position, lines: AnalysisLine[], extra: Partial<AnalysisResult> = {}): AnalysisResult => ({ fen: pos.fen(), depth: 20, nodes: 0, timeMs: 0, lines, ...extra });
const after = (pos: Position, uci: string) => {
  const p = new Position(pos.fen());
  p.make(p.moveFromUci(uci));
  return p;
};
const find = (s: HintSection[], kind: HintSection['kind']) => s.find((x) => x.kind === kind)?.text ?? '';
const show = (title: string, s: HintSection[]) => console.log(`\n=== ${title}\n` + s.map((x) => `${x.icon} ${x.title}: ${x.text}`).join('\n'));

describe('hint helpers', () => {
  it('numbers a line from either side', () => {
    expect(numbered(['Qxh7+', 'Kxh7', 'Rh3#'], 20, true)).toBe('20.Qxh7+ Kxh7 21.Rh3#');
    expect(numbered(['Qg5', 'Nxf7', 'Qxg2'], 4, false)).toBe('4...Qg5 5.Nxf7 Qxg2');
  });

  it('measures material at the end of an exchange, not in the middle', () => {
    // 1.e4 d5 2.exd5 Qxd5: hai bên đổi một Tốt
    const pos = new Position();
    expect(settledSwing(pos, ['e2e4', 'd7d5', 'e4d5', 'd8d5'], 0)).toBe(0);
    // dừng giữa chừng (sau exd5, Đen còn bắt lại) thì vẫn tính ở điểm yên tĩnh trước đó
    expect(settledSwing(pos, ['e2e4', 'd7d5', 'e4d5'], 0)).toBe(0);
    expect(pos.fen()).toBe(START_FEN);
  });

  it('lists captures first by victim value and adds extra moves', () => {
    const pos = new Position('4k3/8/8/3q4/4P3/8/8/R3K3 w - - 0 1');
    expect(temptingReplies(pos, ['a1a8'])).toEqual(['a1a8', 'e4d5']);
  });

  it('names material gains in words', () => {
    expect(pointsText(1)).toBe('một Tốt');
    expect(pointsText(-5)).toBe('một Xe (5 điểm)');
    expect(pointsText(4)).toBe('4 điểm vật chất');
  });
});

describe('explainHint (phân tích dựng tay)', () => {
  it('explains a trap: Blackburne–Shilling, 4.Nxe5? Qg5!', () => {
    // 1.e4 e5 2.Nf3 Nc6 3.Bc4 – gợi ý cho Đen là 3...Nd4, giăng bẫy 4.Nxe5? Qg5!
    const l = playLine('1.e4 e5 2.Nf3 Nc6 3.Bc4');
    const pos = new Position(l.fens[l.fens.length - 1]);
    const before = result(pos, [line(pos, ['c6d4', 'f3d4', 'e5d4'], 0), line(pos, ['g8f6', 'd2d3'], -10)]);
    const pa = after(pos, 'c6d4');
    const deep = {
      after: result(pa, [line(pa, ['f3d4', 'e5d4', 'e1g1'], 20)]),
      tempting: result(pa, [line(pa, ['f3e5', 'd8g5', 'e5f7', 'g5g2', 'h1f1', 'g2e4', 'c4e2', 'd4f3'], 0, -4)]),
    };
    const s = explainHint({ pos, before, deep });
    show('Bẫy Blackburne–Shilling', s);
    expect(find(s, 'idea')).toMatch(/^Bạn đưa Mã từ c6 đến d4/);
    expect(find(s, 'trap')).toContain('tham ăn Tốt ở e5 bằng **Nxe5**?');
    expect(find(s, 'trap')).toContain('**Qg5**');
    expect(find(s, 'trap')).toContain('chiếu hết sau 4 nước');
    expect(find(s, 'reply')).toContain('**Nxd4**');
  });

  it('explains the threat it parries: 3.Bb5 a6 4.Ba4', () => {
    const l = playLine('1.e4 e5 2.Nf3 Nc6 3.Bb5 a6');
    const pos = new Position(l.fens[l.fens.length - 1]);
    const pNull = new Position(pos.fen());
    pNull.makeNull();
    const threatLine = line(pNull, ['a6b5'], 300);
    const before = result(pos, [line(pos, ['b5a4', 'g8f6', 'e1g1'], 30), line(pos, ['b5c6', 'd7c6'], 10)], {
      threat: { uci: threatLine.uci, san: threatLine.san, pv: threatLine.pv, pvSan: threatLine.pvSan, gain: 300, mate: 0 },
    });
    const pa = after(pos, 'b5a4');
    const deep = { after: result(pa, [line(pa, ['g8f6', 'e1g1'], -30)]), tempting: null };
    const s = explainHint({ pos, before, deep });
    show('Ba4 tránh đòn axb5', s);
    expect(find(s, 'defense')).toContain('**axb5**, ăn Tượng b5');
    expect(find(s, 'defense')).toContain('loại bỏ hoàn toàn');
    expect(find(s, 'idea')).toContain('thoát khỏi sự tấn công');
    expect(find(s, 'verdict')).toContain('**Bxc6**');
  });

  it('explains the threat it creates and a forced mate', () => {
    // Trắng: Hậu h5, Tượng c4 – sau 3.Qh5?? (Đen chưa phòng thủ f7), 3...Nf6?? cho phép 4.Qxf7#
    const l = playLine('1.e4 e5 2.Bc4 Nc6 3.Qh5 Nf6');
    const pos = new Position(l.fens[l.fens.length - 1]);
    const s = explainHint({ pos, before: result(pos, [line(pos, ['h5f7'], 0, 1)]), deep: { after: null, tempting: null } });
    show('Qxf7#', s);
    expect(find(s, 'idea')).toContain('chiếu hết, kết thúc ván cờ');
    expect(find(s, 'verdict')).toContain('bạn chiếu hết sau 1 nước');
    expect(s.map((x) => x.kind)).toEqual(['idea', 'verdict']);
  });

  it('works before the deeper analysis arrives, using the main line for the reply', () => {
    const pos = new Position();
    const s = explainHint({ pos, before: result(pos, [line(pos, ['e2e4', 'e7e5', 'g1f3'], 30), line(pos, ['d2d4', 'd7d5'], 25)]), deep: null });
    show('1.e4 (chưa có phân tích sâu)', s);
    expect(s.map((x) => x.kind)).toEqual(['idea', 'reply', 'verdict']);
    expect(find(s, 'reply')).toContain('**e5**');
    expect(find(s, 'reply')).toContain('**Nf3**');
    expect(find(s, 'verdict')).toContain('**d4** cũng tốt gần ngang bằng');
  });
});

describe('explainHint với Stockfish thật', () => {
  let request: AnalysisRequester;
  beforeAll(() => {
    installNodeWorker();
    const sf = new StockfishEngine();
    request = (fen, moves, o) => sf.request({ type: 'analyze', fen, moves, multiPV: o.multiPV ?? 3, timeMs: o.timeMs ?? 900, threat: o.threat, searchMoves: o.searchMoves }, o.channel, o.priority);
  });

  const run = async (title: string, startFen: string, moves: string[]) => {
    const before = (await request(startFen, moves, { multiPV: 3, timeMs: 1200, threat: true }))!;
    const deep = await deepHintAnalysis(request, startFen, moves, before);
    const pos = new Position(startFen);
    for (const u of moves) pos.make(pos.moveFromUci(u));
    const s = explainHint({ pos, before, deep });
    show(title, s);
    for (const x of s) expect(x.text.length).toBeGreaterThan(10);
    return { s, before, deep };
  };

  it('Scholar’s mate defence: 1.e4 e5 2.Qh5 Nc6 3.Bc4 (Black to move)', async () => {
    const { s, deep } = await run('Phòng thủ trước Qxf7#', START_FEN, ['e2e4', 'e7e5', 'd1h5', 'b8c6', 'f1c4']);
    expect(deep?.after).toBeTruthy();
    expect(s.map((x) => x.text).join(' ')).toContain('Qxf7#');
  });

  it('Queen’s Gambit position from the app screenshot', async () => {
    const { s } = await run('1.d4 Nf6 2.c4 d5 3.Nf3 Nbd7', START_FEN, ['d2d4', 'g8f6', 'c2c4', 'd7d5', 'g1f3', 'b8d7']);
    expect(s[0].kind).toBe('idea');
    expect(s[s.length - 1].kind).toBe('verdict');
  });

  it('a middlegame tactic (WAC.003)', async () => {
    await run('WAC.003', '5rk1/1ppb3p/p1pb4/6q1/3P1p1r/2P1R2P/PP1BQ1P1/5RKN w - - 0 1', []);
  });

  it('an endgame', async () => {
    await run('Tàn cuộc Xe', '8/5pk1/6p1/8/R7/6P1/r4PKP/8 w - - 0 40', []);
  });
});
