import { describe, it, expect } from 'vitest';
import { Position, START_FEN, playLine, splitMoves, legalSquareFor, RED, BLACK, KING, ADVISOR, ELEPHANT, PAWN, makeSq } from '../src/xiangqi/engine/board';

function perft(pos: Position, depth: number): number {
  if (depth === 0) return 1;
  const buf: number[] = [];
  const n = pos.generate(buf);
  let total = 0;
  for (let i = 0; i < n; i++) {
    if (!pos.make(buf[i])) continue;
    total += depth === 1 ? 1 : perft(pos, depth - 1);
    pos.unmake();
  }
  return total;
}

describe('luật cờ tướng', () => {
  it('perft từ thế ban đầu (giá trị chuẩn 44 / 1920 / 79666 / 3290240)', () => {
    const pos = new Position();
    expect(perft(pos, 1)).toBe(44);
    expect(perft(pos, 2)).toBe(1920);
    expect(perft(pos, 3)).toBe(79666);
    expect(perft(pos, 4)).toBe(3290240);
    expect(pos.fen()).toBe(START_FEN);
  });

  it('FEN đọc – ghi khớp nhau', () => {
    const fen = 'r1bakab1r/9/1cn4c1/p1p1p1p1p/9/9/P1P1P1P1P/1C2C1N2/9/RNBAKAB1R b - - 3 2';
    expect(new Position(fen).fen()).toBe(fen);
  });

  it('ký hiệu nước đi Việt Nam, chữ Hán và tọa độ', () => {
    const line = playLine('1. P2-5 M8.7 2. M2.3 X9-8 3. X1-2 M2.3 4. B7.1 B7.1');
    expect(line.ucis).toEqual(['h2e2', 'h9g7', 'h0g2', 'i9h9', 'i0h0', 'b9c7', 'c3c4', 'g6g5']);
    expect(line.sans).toEqual(['P2-5', 'M8.7', 'M2.3', 'X9-8', 'X1-2', 'M2.3', 'B7.1', 'B7.1']);
    const cn = playLine('炮二平五 马8进7 马二进三 车9平8');
    expect(cn.ucis).toEqual(line.ucis.slice(0, 4));
    const iccs = playLine('h2e2 h9g7');
    expect(iccs.sans).toEqual(['P2-5', 'M8.7']);
    expect(splitMoves('1.P2-5 M8.7 2. M2.3 1-0')).toEqual(['P2-5', 'M8.7', 'M2.3']);
  });

  it('tấn, thoái của Xe/Pháo tính số bước; Mã/Tượng/Sĩ ghi cột đến', () => {
    const l = playLine('P2.4 P8-9 T3.5 S4.5 X1.2 P9/1');
    expect(l.ucis).toEqual(['h2h6', 'h7i7', 'g0e2', 'd9e8', 'i0i2', 'i7i8']);
  });

  it('hai quân cùng cột: Xe trước / Xe sau', () => {
    // hai Xe Đỏ cùng cột e
    const pos = new Position('3k5/9/9/9/9/9/4R4/9/4R4/5K3 w - - 0 1');
    const sans = pos.legalMoves().map((m) => pos.moveToSan(m));
    expect(sans).toContain('Xt.1');
    expect(sans).toContain('Xs.1');
    expect(pos.sanToMove('Xt-4')).toBeTruthy();
  });

  it('Tướng không được lộ mặt, Mã bị cản chân, Tượng bị cản mắt, Pháo cần ngòi', () => {
    // Tướng e0 và e9 đối mặt nếu Xe e5 rời cột
    const pos = new Position('4k4/9/9/9/4R4/9/9/9/9/4K4 w - - 0 1');
    const sans = pos.legalMoves().map((m) => pos.moveToSan(m));
    expect(sans.some((s) => s.startsWith('X5-'))).toBe(false);
    // Mã b0 bị chân b1 cản đường lên a2, c2
    const horse = new Position('3k5/9/9/9/9/9/9/9/1P7/1N2K4 w - - 0 1');
    const hm = horse.legalMoves().filter((m) => (m & 127) === makeSq(1, 0)).map((m) => horse.moveToUci(m));
    expect(hm.sort()).toEqual(['b0d1']);
  });

  it('hết nước đi là thua, chiếu dai bị xử thua', () => {
    // Đen hết nước đi (không bị chiếu) → Đỏ thắng
    const stale = new Position('3k5/4R4/9/9/9/9/9/9/9/5K3 b - - 0 1');
    expect(stale.inCheck()).toBe(false);
    expect(stale.status()).toEqual({ over: true, result: '1-0', reason: 'stalemate' });
    // chiếu bí: Xe d7 chiếu, e9 bị lộ mặt tướng, d8 bị Xe khống chế
    const mate = new Position('3k5/9/3R1R3/9/9/9/9/9/9/4K4 b - - 0 1');
    expect(mate.status()).toEqual({ over: true, result: '1-0', reason: 'checkmate' });
    // Xe Đỏ chiếu liên tục, Tướng Đen chạy qua lại: lặp lần thứ ba → Đỏ chiếu dai, bị xử thua
    const line = playLine('h0h9 e9e8 h9h8 e8e9 h8h9 e9e8 h9h8 e8e9 h8h9', '4k4/9/9/9/9/9/9/9/9/3K3R1 w - - 0 1');
    const end = new Position(line.fens[0]);
    for (const u of line.ucis) end.make(end.moveFromUci(u));
    expect(end.status()).toEqual({ over: true, result: '0-1', reason: 'perpetual' });
  });

  it('ô hợp lệ của Sĩ, Tượng, Tốt', () => {
    expect(legalSquareFor(ADVISOR, RED, makeSq(4, 1))).toBe(true);
    expect(legalSquareFor(ADVISOR, RED, makeSq(4, 0))).toBe(false);
    expect(legalSquareFor(ELEPHANT, RED, makeSq(4, 2))).toBe(true);
    expect(legalSquareFor(ELEPHANT, BLACK, makeSq(2, 9))).toBe(true);
    expect(legalSquareFor(ELEPHANT, RED, makeSq(2, 2))).toBe(false);
    expect(legalSquareFor(PAWN, RED, makeSq(1, 3))).toBe(false);
    expect(legalSquareFor(PAWN, RED, makeSq(1, 5))).toBe(true);
    expect(legalSquareFor(KING, BLACK, makeSq(4, 8))).toBe(true);
  });
});
