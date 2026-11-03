import { describe, it, expect } from 'vitest';
import { Position, playLine } from '../src/xiangqi/engine/board';
import { explainPurpose, analyzeMove, describeMove } from '../src/xiangqi/engine/explain';
import { reviewMove, lineWin, redWin } from '../src/xiangqi/engine/coach';
import { openingNameAt, mirrorKey } from '../src/xiangqi/engine/book';
import { MateSolver, isMateMove } from '../src/xiangqi/engine/mate';
import { analyze } from '../src/xiangqi/engine/analyze';
import { Searcher } from '../src/xiangqi/engine/search';

const purposeOf = (fen: string, uci: string) => {
  const pos = new Position(fen);
  return explainPurpose(pos, pos.moveFromUci(uci));
};

describe('huấn luyện viên cờ tướng', () => {
  it('giải thích Pháo đầu, lên Mã, xuất Xe', () => {
    const start = new Position().fen();
    expect(purposeOf(start, 'h2e2')).toMatch(/Pháo đầu/);
    expect(purposeOf(start, 'h0g2')).toMatch(/lên Mã/i);
    const l = playLine('P2-5 M8.7 M2.3 X9-8');
    expect(purposeOf(l.fens[4], 'i0h0')).toMatch(/xuất Xe/i);
  });

  it('nhận ra chiếu, ăn quân và bắt đôi', () => {
    // Mã Đỏ nhảy bắt đôi Xe và Pháo Đen
    const pos = new Position('4k4/2r3c2/9/9/3N5/9/9/9/9/3K5 w - - 0 1');
    const f = analyzeMove(pos, pos.moveFromUci('d5e7'));
    expect(f.fork).toBe(true);
    expect(describeMove(f)).toMatch(/bắt đôi Xe và Pháo/);
  });

  it('chấm nước bỏ Xe là sai lầm nghiêm trọng', () => {
    const fen = '3k5/9/9/9/2n6/4R4/9/9/9/4K4 w - - 0 1';
    const pos = new Position(fen);
    const s = new Searcher();
    const before = analyze(s, { fen, moves: [], multiPV: 3, timeMs: 400 });
    // Xe đứng yên chỗ bị Mã ăn: đi Tướng
    const bad = 'e0f0';
    const after = analyze(s, { fen, moves: [bad], multiPV: 1, timeMs: 400 });
    const r = reviewMove({ posBefore: pos, uci: bad, ply: 0, before, after, isBook: false });
    expect(['blunder', 'mistake']).toContain(r.cls);
    expect(lineWin({ score: 0, mate: 0 })).toBe(50);
    expect(redWin(before)).toBeGreaterThan(50);
  });

  it('sách khai cuộc nhận ra thế lật gương', () => {
    const a = playLine('P2-5');
    const b = playLine('P8-5');
    expect(mirrorKey(new Position(a.fens[1]).key())).toBe(new Position(b.fens[1]).key());
    expect(openingNameAt(new Position(b.fens[1]))).toBeTruthy();
  });

  it('khốn bí được tính là thắng', () => {
    // Đỏ đi Xe e7 → e8: Tướng Đen d9 không bị chiếu nhưng hết nước đi
    const fen = '3k5/9/4R4/9/9/9/9/9/9/5K3 w - - 0 1';
    expect(isMateMove(fen, 'e7e8')).toBe(true);
    const pos = new Position(fen);
    expect(new MateSolver().shortest(pos, 1)).toBe(1);
  });
});
