import { describe, it, expect } from 'vitest';
import { Position, playLine } from '../src/xiangqi/engine/board';
import { Searcher, mateIn } from '../src/xiangqi/engine/search';
import { MateSolver } from '../src/xiangqi/engine/mate';
import { evaluate } from '../src/xiangqi/engine/eval';

describe('bộ máy cờ tướng', () => {
  it('lượng giá thế ban đầu cân bằng và đối xứng', () => {
    const pos = new Position();
    expect(Math.abs(evaluate(pos))).toBeLessThan(30);
    const b = new Position('rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR b - - 0 1');
    expect(evaluate(b)).toBe(evaluate(pos));
  });

  it('tìm kiếm từ thế ban đầu: đủ sâu và chọn nước khai cuộc hợp lý', () => {
    const pos = new Position();
    // độ sâu cố định: kết quả không phụ thuộc tốc độ máy (khi chạy song song nhiều tệp kiểm thử)
    const r = new Searcher().search(pos, { maxDepth: 6, multiPV: 3 });
    const sans = r.lines.map((l) => pos.moveToSan(l.move));
    console.log('độ sâu', r.depth, 'nút', r.nodes, 'thời gian', Math.round(r.timeMs), sans, r.lines.map((l) => l.score));
    expect(r.depth).toBe(6);
    // nước khai cuộc hợp lý: Pháo bình ở hàng 2, lên Mã, tiến Tốt 3/5/7, lên Tượng, bổ Sĩ – thế cờ gần cân bằng
    expect(sans[0]).toMatch(/^(P[28]-\d|M[28]\.[1379]|B[357]\.1|T[37]\.5|S[46]\.5)$/);
    expect(Math.abs(r.lines[0].score)).toBeLessThan(80);
  });

  it('thấy nước chiếu bí 1 nước', () => {
    // Song Xe: Xe a8 khóa hàng 8, Xe b7 xuống hàng 9 chiếu bí
    const pos = new Position('4k4/R8/1R7/9/9/9/9/9/9/3K5 w - - 0 1');
    const r = new Searcher().search(pos, { maxDepth: 4 });
    expect(pos.moveToUci(r.lines[0].move)).toBe('b7b9');
    expect(mateIn(r.lines[0].score)).toBe(1);
  });

  it('không để Xe bị ăn không', () => {
    // Xe Đỏ e5 bị Pháo Đen e7 (ngòi e6) đe dọa? Dựng thế: Mã Đen tấn công Xe Đỏ, Đỏ phải chạy Xe
    const pos = new Position('3k5/9/9/9/2n6/3R5/9/9/9/4K4 w - - 0 1');
    const r = new Searcher().search(pos, { maxDepth: 5 });
    const m = r.lines[0].move;
    pos.make(m);
    // sau nước đi, Xe không còn bị Mã ăn miễn phí
    const reply = new Searcher().search(pos, { maxDepth: 4 });
    expect(reply.lines[0].score).toBeLessThan(0);
  });

  it('bộ giải sát cục tìm được chiếu bí 2 nước', () => {
    // Song Xe: thế đơn giản
    const pos = new Position('4k4/9/9/9/9/9/9/9/R8/R3K4 w - - 0 1');
    const s = new MateSolver();
    const n = s.shortest(pos, 3);
    expect(n).toBeGreaterThan(0);
    expect(n).toBeLessThanOrEqual(3);
  });

  it('dòng khai cuộc dài vẫn hợp lệ và máy phân tích được', () => {
    const line = playLine('1. P2-5 M8.7 2. M2.3 X9-8 3. X1-2 M2.3 4. B7.1 B7.1 5. X2.6 P8-9 6. X2-3 P9/1 7. M8.7 S4.5');
    const pos = new Position(line.fens[line.fens.length - 1]);
    const r = new Searcher().search(pos, { timeMs: 800, multiPV: 2 });
    expect(r.lines.length).toBe(2);
  });
});
