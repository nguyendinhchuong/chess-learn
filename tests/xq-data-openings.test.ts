import { it, expect } from 'vitest';
import { XQ_OPENINGS } from '../src/xiangqi/data/openings';
import { validateOpening } from '../src/xiangqi/data/validate';

it('dữ liệu khai cuộc cờ tướng hợp lệ', () => {
  const ids = new Set<string>();
  const errors: string[] = [];
  for (const o of XQ_OPENINGS) {
    if (ids.has(o.id)) errors.push('Trùng id: ' + o.id);
    ids.add(o.id);
    errors.push(...validateOpening(o));
  }
  if (errors.length) console.error(errors.join('\n'));
  expect(errors).toEqual([]);
});
