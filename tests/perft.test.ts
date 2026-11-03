import { describe, it, expect } from 'vitest';
import { Position, playLine } from '../src/engine/board';

function perft(pos: Position, depth: number): number {
  if (depth === 0) return 1;
  const buf: number[] = [];
  const n = pos.generate(buf, 0, false);
  let total = 0;
  for (let i = 0; i < n; i++) {
    if (!pos.make(buf[i])) continue;
    total += depth === 1 ? 1 : perft(pos, depth - 1);
    pos.unmake();
  }
  return total;
}

describe('perft', () => {
  const cases: [string, number, number][] = [
    ['rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', 4, 197281],
    ['r3k2r/p1ppqpb1/bn2pnp1/3PN3/1p2P3/2N2Q1p/PPPBBPPP/R3K2R w KQkq - 0 1', 3, 97862],
    ['8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8 w - - 0 1', 5, 674624],
    ['r3k2r/Pppp1ppp/1b3nbN/nP6/BBP1P3/q4N2/Pp1P2PP/R2Q1RK1 w kq - 0 1', 4, 422333],
    ['rnbq1k1r/pp1Pbppp/2p5/8/2B5/8/PPP1NnPP/RNBQK2R w KQ - 1 8', 3, 62379],
    ['r4rk1/1pp1qppp/p1np1n2/2b1p1B1/2B1P1b1/P1NP1N2/1PP1QPPP/R4RK1 w - - 0 10', 3, 89890],
  ];
  for (const [fen, d, expected] of cases) {
    it(`${fen} d${d}`, () => {
      const pos = new Position(fen);
      const before = pos.fen();
      expect(perft(pos, d)).toBe(expected);
      expect(pos.fen()).toBe(before);
    });
  }
});

describe('san', () => {
  it('plays the opera game', () => {
    const line = playLine('1.e4 e5 2.Nf3 d6 3.d4 Bg4 4.dxe5 Bxf3 5.Qxf3 dxe5 6.Bc4 Nf6 7.Qb3 Qe7 8.Nc3 c6 9.Bg5 b5 10.Nxb5 cxb5 11.Bxb5+ Nbd7 12.O-O-O Rd8 13.Rxd7 Rxd7 14.Rd1 Qe6 15.Bxd7+ Nxd7 16.Qb8+ Nxb8 17.Rd8#');
    expect(line.sans.at(-1)).toBe('Rd8#');
    const pos = new Position(line.fens.at(-1)!);
    expect(pos.status().reason).toBe('checkmate');
  });
  it('detects repetition', () => {
    const pos = new Position();
    for (const s of ['Nf3', 'Nf6', 'Ng1', 'Ng8', 'Nf3', 'Nf6', 'Ng1', 'Ng8']) pos.make(pos.sanToMove(s));
    expect(pos.status().reason).toBe('repetition');
  });
});
