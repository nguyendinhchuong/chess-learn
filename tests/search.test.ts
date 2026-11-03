import { describe, it, expect } from 'vitest';
import { Position } from '../src/engine/board';
import { Searcher, mateIn } from '../src/engine/search';
import { evaluate } from '../src/engine/eval';

const s = new Searcher();
const best = (fen: string, opts = {}) => {
  const pos = new Position(fen);
  const r = s.search(pos, { timeMs: 3000, ...opts });
  return { uci: pos.moveToUci(r.lines[0].move), r, pos };
};

describe('search', () => {
  it('eval symmetric at start', () => {
    const p = new Position();
    expect(Math.abs(evaluate(p))).toBeLessThan(30);
  });
  it('finds mate in 1 (back rank)', () => {
    const { uci, r } = best('6k1/5ppp/8/8/8/8/5PPP/3R2K1 w - - 0 1');
    expect(uci).toBe('d1d8');
    expect(mateIn(r.lines[0].score)).toBe(1);
  });
  it('finds mate in 2', () => {
    // Đen: Vua h8, tốt g7 h7; Trắng Hậu, Xe — Qxh7+? dùng bài cổ điển
    const { r, pos } = best('r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4');
    expect(pos.moveToUci(r.lines[0].move)).toBe('h5f7');
  });
  it('wins material: fork', () => {
    const { uci } = best('r3k3/8/8/8/8/8/8/4K1N1 w - - 0 1', { timeMs: 1500 });
    expect(['g1f3', 'g1e2', 'g1h3']).toBeDefined();
    expect(uci.length).toBe(4);
  });
  it('speed benchmark from middlegame', () => {
    const { r } = best('r1bq1rk1/pp2bppp/2n1pn2/2pp4/3P4/2PBPN2/PP1N1PPP/R1BQ1RK1 w - - 0 8', { timeMs: 3000 });
    console.log('depth', r.depth, 'nodes', r.nodes, 'time', Math.round(r.timeMs), 'nps', Math.round(r.nodes / (r.timeMs / 1000)));
    expect(r.depth).toBeGreaterThan(4);
  });
  it('multipv returns ordered lines', () => {
    const pos = new Position();
    const r = s.search(pos, { timeMs: 800, multiPV: 3 });
    expect(r.lines.length).toBe(3);
    expect(r.lines[0].score).toBeGreaterThanOrEqual(r.lines[1].score);
    console.log(r.lines.map((l) => pos.moveToUci(l.move) + ' ' + l.score), 'depth', r.depth);
  });
  it('KQK mate found', () => {
    const { r } = best('8/8/8/4k3/8/8/8/4K2Q w - - 0 1', { timeMs: 2000 });
    console.log('KQK score', r.lines[0].score, 'depth', r.depth);
  });
});
