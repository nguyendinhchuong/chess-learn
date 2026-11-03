import { describe, it, expect } from 'vitest';
import { Position, playLine } from '../src/engine/board';
import { explainPurpose, isCaptureAt, purposeAt } from '../src/engine/purpose';

const OPERA = '1.e4 e5 2.Nf3 d6 3.d4 Bg4 4.dxe5 Bxf3 5.Qxf3 dxe5 6.Bc4 Nf6 7.Qb3 Qe7 8.Nc3 c6 9.Bg5 b5 10.Nxb5 cxb5 11.Bxb5+ Nbd7 12.O-O-O Rd8 13.Rxd7 Rxd7 14.Rd1 Qe6 15.Bxd7+ Nxd7 16.Qb8+ Nxb8 17.Rd8#';
const line = playLine(OPERA);
const at = (san: string, nth = 0) => {
  let seen = 0;
  const i = line.sans.findIndex((s) => s === san && seen++ === nth);
  return purposeAt(line.fens[0], line.ucis, i);
};

describe('giải thích mục đích nước đi', () => {
  it('nhận ra mối đe dọa chiếu hết và nước chặn', () => {
    expect(at('Bc4')).toContain('dọa chiếu hết bằng Qxf7#');
    expect(at('Nf6')).toContain('ngăn đòn chiếu hết Qxf7#');
  });
  it('phân biệt thí quân với bắt lại quân', () => {
    expect(at('Nxb5')).toContain('hy sinh Mã');
    expect(at('Nxb5')).not.toContain('bắt lại');
    expect(at('cxb5')).toContain('bắt lại quân');
  });
  it('không nhận vơ chĩa đôi khi quân vừa đi có thể bị bắt ngay', () => {
    expect(at('Bxf3')).not.toContain('chĩa đôi');
    expect(at('Bxf3')).toContain('đổi quân');
  });
  it('nước chiếu hết và nhập thành', () => {
    expect(at('Rd8#')).toContain('chiếu hết');
    expect(at('O-O-O')).toContain('nhập thành cánh Hậu');
  });
  it('phát triển quân và lỗ thở cho Vua', () => {
    const pos = new Position();
    expect(explainPurpose(pos, pos.sanToMove('Nf3'))).toContain('phát triển quân');
    const p2 = new Position('r1bq1rk1/pppp1ppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQ1RK1 w - - 0 6');
    // Tượng c8 bị Tốt d7 chắn nên chỉ Mã f6 có thể đến g4
    expect(explainPurpose(p2, p2.sanToMove('h3'))).toContain('không cho Mã đối phương đến ô g4');
    // khi d7 đã trống, cả Mã f6 lẫn Tượng c8 đều nhắm g4
    const p3 = new Position('r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQ1RK1 w - - 0 7');
    expect(explainPurpose(p3, p3.sanToMove('h3'))).toContain('không cho Mã và Tượng đối phương đến ô g4');
  });
  it('nhận ra nước bảo vệ quân bị tấn công', () => {
    // Slav: 1.d4 d5 2.c4 c6 – c6 tăng cường bảo vệ Tốt d5
    const l = playLine('1.d4 d5 2.c4 c6');
    expect(purposeAt(l.fens[0], l.ucis, 3)).toContain('tăng cường bảo vệ Tốt d5');
    expect(isCaptureAt(l.fens[0], l.ucis[0])).toBe(false);
  });
  it('mọi nước của mọi ván đều có câu giải thích không rỗng', () => {
    const p = new Position();
    for (const m of p.legalMoves()) expect(explainPurpose(p, m).length).toBeGreaterThan(20);
  });
});

describe('quân bị ghim không được tính là quân tấn công', () => {
  it('Hậu chiếu cạnh Tốt bị ghim không phải là thí Hậu', () => {
    // Vua đen h6, Tốt g5 tấn công h4 nhưng bị Tượng e3 ghim vào Vua: Qh4+ không thể bị Tốt bắt
    const pos = new Position('8/8/7k/6p1/3Q4/4B3/8/6K1 w - - 0 1');
    const text = explainPurpose(pos, pos.sanToMove('Qh4+'));
    expect(text).not.toContain('thí');
    expect(text).not.toContain('ô bị đối phương tấn công');
  });
});
