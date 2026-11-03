import { it, expect } from 'vitest';
import { GAMES } from '../src/data/games/index';
import { OPENINGS } from '../src/data/openings';
import { Position, playLine, splitMoves } from '../src/engine/board';

it('đọc nhanh toàn bộ biên bản ván cờ', () => {
  const t0 = performance.now();
  for (const g of GAMES) playLine(g.moves);
  const ms = performance.now() - t0;
  console.log(`playLine ${GAMES.length} ván: ${ms.toFixed(0)} ms`);
  expect(ms).toBeLessThan(2000);
});

it('đường nhanh cho cùng kết quả với cách đọc đầy đủ (so với SAN sinh ra)', () => {
  // mọi nước của mọi khai cuộc và ván cờ: SAN chuẩn đọc lại phải ra đúng nước đó
  for (const text of [...OPENINGS.map((o) => o.moves), ...GAMES.map((g) => g.moves)]) {
    const pos = new Position();
    for (const san of splitMoves(text)) {
      const m = pos.sanToMove(san);
      expect(m, san).not.toBe(0);
      for (const lm of pos.legalMoves()) expect(pos.sanToMove(pos.moveToSan(lm))).toBe(lm);
      pos.make(m);
    }
  }
});
