import { it, expect } from 'vitest';
import { Position } from '../src/engine/board';
import { Searcher } from '../src/engine/search';

function playOut(fen: string, msPerMove: number, maxPlies = 120) {
  const pos = new Position(fen);
  const s = new Searcher();
  for (let i = 0; i < maxPlies; i++) {
    const st = pos.status();
    if (st.over) return { st, plies: i };
    const r = s.search(pos, { timeMs: msPerMove });
    pos.make(r.lines[0].move);
  }
  return { st: pos.status(), plies: maxPlies };
}

it('mates with K+Q vs K', () => {
  const { st, plies } = playOut('8/8/8/4k3/8/8/8/4K2Q w - - 0 1', 300);
  console.log('KQK', st, plies);
  expect(st.reason).toBe('checkmate');
}, 120000);

it('mates with K+R vs K', () => {
  const { st, plies } = playOut('8/8/8/4k3/8/8/8/4K2R w - - 0 1', 300);
  console.log('KRK', st, plies);
  expect(st.reason).toBe('checkmate');
}, 120000);
