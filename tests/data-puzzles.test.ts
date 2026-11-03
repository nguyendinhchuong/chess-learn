import { describe, it, expect } from 'vitest';
import { PUZZLES, PUZZLE_LEVELS } from '../src/data/puzzles';
import { PUZZLE_THEMES } from '../src/data/types';
import { GAMES } from '../src/data/games/index';
import { checkFen } from '../src/data/validate';
import { playLine } from '../src/engine/board';
import { verifyPuzzle } from './puzzle-verify';

describe('dữ liệu cờ thế', () => {
  it('cấu trúc hợp lệ', () => {
    const errors: string[] = [];
    const ids = new Set<string>();
    for (const p of PUZZLES) {
      if (ids.has(p.id)) errors.push('Trùng id: ' + p.id);
      ids.add(p.id);
      const fe = checkFen(p.fen);
      if (fe) {
        errors.push(`${p.id}: ${fe}`);
        continue;
      }
      if (!PUZZLE_LEVELS.some((l) => l.level === p.level)) errors.push(`${p.id}: cấp độ không tồn tại ${p.level}`);
      for (const t of p.themes) if (!(PUZZLE_THEMES as readonly string[]).includes(t)) errors.push(`${p.id}: chủ đề không hợp lệ "${t}"`);
      if (!p.hint.trim() || !p.explanation.trim() || !p.title.trim()) errors.push(`${p.id}: thiếu tiêu đề, gợi ý hoặc lời giải thích`);
      try {
        const line = playLine(p.solution, p.fen);
        if (p.notes && p.notes.length > line.sans.length) errors.push(`${p.id}: notes (${p.notes.length}) nhiều hơn số nước (${line.sans.length})`);
      } catch (e) {
        errors.push(`${p.id}: ${(e as Error).message}`);
      }
      if (p.gameId) {
        const g = GAMES.find((x) => x.id === p.gameId);
        if (!g) errors.push(`${p.id}: không có ván "${p.gameId}"`);
        else {
          // thế cờ phải thật sự xuất hiện trong ván (cùng bên đi và số nước)
          const key = p.fen.split(' ');
          const found = playLine(g.moves).fens.some((f) => {
            const k = f.split(' ');
            return k[0] === key[0] && k[1] === key[1] && k[5] === key[5];
          });
          if (!found) errors.push(`${p.id}: thế cờ không xuất hiện trong ván ${p.gameId}`);
        }
      }
    }
    for (const l of PUZZLE_LEVELS) if (PUZZLES.filter((p) => p.level === l.level).length < 6) errors.push(`Cấp ${l.level} có quá ít bài`);
    if (errors.length) console.error(errors.join('\n'));
    expect(errors).toEqual([]);
  });

  // Kiểm chứng sâu: lời giải đúng và là duy nhất (xem tests/puzzle-verify.ts)
  for (const p of PUZZLES) {
    it(`lời giải ${p.id}`, () => {
      const errs = verifyPuzzle(p);
      if (errs.length) console.error(errs.join('\n'));
      expect(errs).toEqual([]);
    }, 120_000);
  }
});
