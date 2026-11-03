import { it, expect } from 'vitest';
import { NOTE_SETS, NOTE_SET_GAMES } from '../src/data/games/index';
import { playLine } from '../src/engine/board';
import { plyFromKey } from '../src/data/validate';

it('mọi nước đi đều có lời giải thích (hien-dai-1)', () => {
  const notes = NOTE_SETS['hien-dai-1'];
  const games = NOTE_SET_GAMES['hien-dai-1'];
  const errors: string[] = [];
  for (const id of Object.keys(notes)) if (!games.some((g) => g.id === id)) errors.push(`lời giải thích cho ván không thuộc nhóm này: ${id}`);
  for (const g of games) {
    const n = playLine(g.moves).sans.length;
    const extra = notes[g.id] ?? {};
    for (const [k, v] of Object.entries(extra)) {
      const ply = plyFromKey(k);
      if (ply < 1 || ply > n) errors.push(`${g.id}: khóa "${k}" ngoài phạm vi ván (${n} nửa nước)`);
      if (!v.trim()) errors.push(`${g.id}: lời giải thích "${k}" rỗng`);
      if (v.length > 400) errors.push(`${g.id}: lời giải thích "${k}" quá dài (${v.length} ký tự)`);
      if (g.annotations[k]) errors.push(`${g.id}: "${k}" đã có lời bình gốc – không viết trùng`);
    }
    const covered = new Set([...Object.keys(g.annotations), ...Object.keys(extra)].map(plyFromKey));
    const missing: string[] = [];
    for (let p = 1; p <= n; p++) if (!covered.has(p)) missing.push(p % 2 ? `${(p + 1) / 2}` : `${p / 2}...`);
    if (missing.length) errors.push(`${g.id}: còn ${missing.length} nước chưa có lời giải thích: ${missing.slice(0, 12).join(', ')}${missing.length > 12 ? '…' : ''}`);
  }
  if (errors.length) console.error(errors.join('\n'));
  expect(errors).toEqual([]);
});
