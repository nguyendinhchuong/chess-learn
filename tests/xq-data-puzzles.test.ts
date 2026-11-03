import { describe, it, expect } from 'vitest';
import { XQ_PUZZLES, XQ_PUZZLE_LEVELS } from '../src/xiangqi/data/puzzles';
import { XQ_PUZZLE_THEMES } from '../src/xiangqi/data/types';
import { XQ_GAMES } from '../src/xiangqi/data/games/index';
import { checkFen } from '../src/xiangqi/data/validate';
import { playLine } from '../src/xiangqi/engine/board';
import { verifyXqPuzzle } from './xq-puzzle-verify';

describe('dữ liệu cờ thế cờ tướng', () => {
  it('cấu trúc hợp lệ', () => {
    const errors: string[] = [];
    const ids = new Set<string>();
    for (const p of XQ_PUZZLES) {
      if (ids.has(p.id)) errors.push('Trùng id: ' + p.id);
      ids.add(p.id);
      const fe = checkFen(p.fen);
      if (fe) {
        errors.push(`${p.id}: ${fe}`);
        continue;
      }
      if (!XQ_PUZZLE_LEVELS.some((l) => l.level === p.level)) errors.push(`${p.id}: cấp độ không tồn tại ${p.level}`);
      for (const t of p.themes) if (!(XQ_PUZZLE_THEMES as readonly string[]).includes(t)) errors.push(`${p.id}: chủ đề không hợp lệ "${t}"`);
      if (!p.hint.trim() || !p.explanation.trim() || !p.title.trim()) errors.push(`${p.id}: thiếu tiêu đề, gợi ý hoặc lời giải thích`);
      try {
        const line = playLine(p.solution, p.fen);
        if (p.notes && p.notes.length > line.sans.length) errors.push(`${p.id}: notes (${p.notes.length}) nhiều hơn số nước (${line.sans.length})`);
      } catch (e) {
        errors.push(`${p.id}: ${(e as Error).message}`);
      }
      if (p.gameId) {
        const g = XQ_GAMES.find((x) => x.id === p.gameId);
        if (!g) errors.push(`${p.id}: không có ván "${p.gameId}"`);
        else {
          const key = p.fen.split(' ');
          const found = playLine(g.moves).fens.some((f) => {
            const k = f.split(' ');
            return k[0] === key[0] && k[1] === key[1];
          });
          if (!found) errors.push(`${p.id}: thế cờ không xuất hiện trong ván ${p.gameId}`);
        }
      }
    }
    if (XQ_PUZZLES.length) for (const l of XQ_PUZZLE_LEVELS) if (XQ_PUZZLES.filter((p) => p.level === l.level).length < 5) errors.push(`Cấp ${l.level} có quá ít bài`);
    if (errors.length) console.error(errors.join('\n'));
    expect(errors).toEqual([]);
  });

  for (const p of XQ_PUZZLES) {
    it(`lời giải ${p.id}`, () => {
      const errs = verifyXqPuzzle(p);
      if (errs.length) console.error(errs.join('\n'));
      expect(errs).toEqual([]);
    }, 180_000);
  }
});
