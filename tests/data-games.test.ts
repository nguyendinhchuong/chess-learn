import { it, expect } from 'vitest';
import { GAMES } from '../src/data/games/index';
import { validateGame } from '../src/data/validate';
import { playLine } from '../src/engine/board';

it('dữ liệu ván cờ hợp lệ (toàn bộ thư viện)', () => {
  const ids = new Set<string>();
  const errors: string[] = [];
  for (const g of GAMES) {
    if (ids.has(g.id)) errors.push('Trùng id: ' + g.id);
    ids.add(g.id);
    errors.push(...validateGame(g));
  }
  if (errors.length) console.error(errors.join('\n'));
  expect(errors).toEqual([]);
});

it('không có ván nào bị nhập trùng (cùng nước đi)', () => {
  const seen = new Map<string, string>();
  const dups: string[] = [];
  for (const g of GAMES) {
    const key = playLine(g.moves).ucis.join(' ');
    if (seen.has(key)) dups.push(`${g.id} trùng với ${seen.get(key)}`);
    seen.set(key, g.id);
  }
  expect(dups).toEqual([]);
});
