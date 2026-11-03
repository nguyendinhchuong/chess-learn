import { it, expect } from 'vitest';
import { ALL_LESSONS } from '../src/data/lessons/index';
import { playLine, START_FEN } from '../src/engine/board';

it('mọi nước trong sơ đồ bài học đều có lời giải thích', () => {
  const errors: string[] = [];
  for (const l of ALL_LESSONS)
    l.sections.forEach((s, si) => {
      const d = s.diagram;
      if (!d?.moves) return;
      const n = playLine(d.moves, d.fen ?? START_FEN).sans.length;
      const missing = Array.from({ length: n }, (_, i) => i).filter((i) => !d.notes?.[i]?.trim());
      if (missing.length) errors.push(`${l.id} › phần ${si + 1}: thiếu lời giải thích cho notes[${missing.join(', ')}]`);
    });
  if (errors.length) console.error(errors.join('\n'));
  expect(errors).toEqual([]);
});
