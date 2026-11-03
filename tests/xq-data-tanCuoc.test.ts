import { it, expect } from 'vitest';
import { LESSONS } from '../src/xiangqi/data/lessons/tanCuoc';
import { validateLesson } from '../src/xiangqi/data/validate';

it('dữ liệu cờ tướng tanCuoc hợp lệ', () => {
  const ids = new Set<string>();
  const errors: string[] = [];
  for (const item of LESSONS) {
    if (ids.has(item.id)) errors.push('Trùng id: ' + item.id);
    ids.add(item.id);
    errors.push(...validateLesson(item));
  }
  if (errors.length) console.error(errors.join('\n'));
  expect(errors).toEqual([]);
});
