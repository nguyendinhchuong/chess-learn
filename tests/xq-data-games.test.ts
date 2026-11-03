import { describe, it, expect } from 'vitest';
import { XQ_ERA_FILES, XQ_GAMES } from '../src/xiangqi/data/games/index';
import { validateGame } from '../src/xiangqi/data/validate';

describe('ván cờ tướng kinh điển', () => {
  it('không trùng id', () => {
    const ids = XQ_GAMES.map((g) => g.id);
    expect(ids.length).toBe(new Set(ids).size);
  });
  for (const [era, games] of Object.entries(XQ_ERA_FILES)) {
    it(`thời kỳ ${era}: biên bản hợp lệ`, () => {
      const errors: string[] = [];
      for (const g of games) errors.push(...validateGame(g));
      if (errors.length) console.error(errors.join('\n'));
      expect(errors).toEqual([]);
    });
  }
});
