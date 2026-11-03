import { it, expect } from 'vitest';
import { OPENINGS } from '../src/data/openings';
import { validateOpening } from '../src/data/validate';

it('dữ liệu openings hợp lệ', () => {
  const ids = new Set<string>();
  const errors: string[] = [];
  for (const item of OPENINGS) {
    if (ids.has(item.id)) errors.push('Trùng id: ' + item.id);
    ids.add(item.id);
    errors.push(...validateOpening(item as any));
  }
  if (errors.length) console.error(errors.join('\n'));
  expect(errors).toEqual([]);
});
