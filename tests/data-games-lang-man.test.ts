import { it, expect } from 'vitest';
import { ERA_FILES, ERAS, GAMES } from '../src/data/games/index';
import { validateGame } from '../src/data/validate';

const ERA = ERAS.find((e) => e.id === 'lang-man')!;
const LIST = ERA_FILES['lang-man'];

it('ván cờ thời kỳ "' + ERA.title + '" hợp lệ', () => {
  const errors: string[] = [];
  for (const g of LIST) {
    errors.push(...validateGame(g));
    if (g.year < ERA.from || g.year > ERA.to) errors.push(`${g.id}: năm ${g.year} ngoài thời kỳ ${ERA.years}`);
    if (!g.source) errors.push(`${g.id}: thiếu nguồn đối chiếu biên bản (source)`);
    if (!g.tags?.length) errors.push(`${g.id}: thiếu chủ đề (tags)`);
    if (Object.keys(g.annotations).length < 6) errors.push(`${g.id}: cần ít nhất 6 lời bình`);
    if (g.lessons.length < 3) errors.push(`${g.id}: cần ít nhất 3 bài học rút ra`);
    if (GAMES.filter((x) => x.id === g.id).length > 1) errors.push(`${g.id}: trùng id với ván khác`);
  }
  if (errors.length) console.error(errors.join('\n'));
  expect(errors).toEqual([]);
});
