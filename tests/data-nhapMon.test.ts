import { it, expect } from 'vitest';
import { LESSONS } from '../src/data/lessons/nhapMon';
import { validateLesson } from '../src/data/validate';

it('dữ liệu nhapMon hợp lệ', () => {
  const ids = new Set<string>();
  const errors: string[] = [];
  for (const item of LESSONS) {
    if (ids.has(item.id)) errors.push('Trùng id: ' + item.id);
    ids.add(item.id);
    errors.push(...validateLesson(item as any));
  }
  if (errors.length) console.error(errors.join('\n'));
  expect(errors).toEqual([]);
});
