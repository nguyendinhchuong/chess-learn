// Kiểm tra bằng máy: trong các sơ đồ bài học, có nước nào làm mất lợi thế lớn (sai lầm) không?
import { it } from 'vitest';
import { ALL_LESSONS } from '../src/data/lessons/index';
import { playLine, Position, START_FEN } from '../src/engine/board';
import { Searcher, MATE_BOUND } from '../src/engine/search';

const s = new Searcher();
const score = (pos: Position) => {
  const st = pos.status();
  if (st.over) return st.reason === 'checkmate' ? -30000 : 0;
  return s.search(pos, { timeMs: 150 }).lines[0].score;
};
const cap = (x: number) => Math.max(-2000, Math.min(2000, Math.abs(x) >= MATE_BOUND ? Math.sign(x) * 2000 : x));

it('audit', () => {
  const flags: string[] = [];
  for (const l of ALL_LESSONS)
    l.sections.forEach((sec, si) => {
      const d = sec.diagram;
      if (!d?.moves) return;
      const line = playLine(d.moves, d.fen ?? START_FEN);
      for (let i = 0; i < line.sans.length; i++) {
        const before = new Position(line.fens[i]);
        const best = cap(score(before));
        const after = cap(-score(new Position(line.fens[i + 1])));
        const drop = best - after;
        if (drop >= 300 && !(best >= 1500 && after >= 1500))
          flags.push(`${l.id} › phần ${si + 1} "${sec.heading}" › nước ${i + 1} ${line.sans[i]}: tốt nhất ${best}, sau nước ${after} (mất ${drop}) | lời bình: ${(d.notes?.[i] ?? '').slice(0, 110)}`);
      }
    });
  console.log(`FLAGS ${flags.length}\n` + flags.join('\n'));
}, 1_800_000);
