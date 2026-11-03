// Dò thế cờ thế (chiếu hết bắt buộc, đòn chiến thuật duy nhất thắng) trong các ván kinh điển để người biên soạn chọn bài.
// Chạy: MINE_SHARD=0/4 MINE_OUT=<thư mục> npx vitest run scripts/mine-puzzles.test.ts --dir scripts
import { it } from 'vitest';
import { writeFileSync, mkdirSync } from 'node:fs';
import { GAMES } from '../src/data/games/index';
import { playLine, Position } from '../src/engine/board';
import { Searcher, mateIn } from '../src/engine/search';
import { MateSolver } from '../src/engine/mate';

const [SHARD, SHARDS] = (process.env.MINE_SHARD ?? '0/1').split('/').map(Number);
const OUT = process.env.MINE_OUT ?? 'mined';
const searcher = new Searcher();

/** Diễn biến chiếu hết: nước duy nhất của bên tấn công, cách đỡ dai dẳng nhất của bên phòng thủ (ưu tiên nước đã đi trong ván) */
function mateLine(fen: string, n: number, played: string[]): { sans: string[]; duals: number[] } {
  const pos = new Position(fen);
  const solver = new MateSolver();
  solver.limit = 3_000_000;
  const sans: string[] = [];
  const duals: number[] = [];
  for (let left = n; left >= 1; left--) {
    const ms = solver.matingMoves(pos, left);
    const want = played[sans.length];
    const pick = ms.find((m) => pos.moveToUci(m) === want) ?? ms[0];
    if (ms.length > 1 && left > 1) duals.push(sans.length);
    sans.push(pos.moveToSan(pick));
    pos.make(pick);
    if (left === 1) break;
    // phòng thủ: chọn nước kéo dài nhất
    let best: number[] = [];
    let bestLen = -1;
    for (const d of pos.legalMoves()) {
      pos.make(d);
      const len = solver.shortest(pos, left - 1);
      pos.unmake();
      if (len > bestLen) {
        bestLen = len;
        best = [d];
      } else if (len === bestLen) best.push(d);
    }
    if (!best.length) break;
    const wantD = played[sans.length];
    const d = best.find((m) => pos.moveToUci(m) === wantD) ?? best[0];
    sans.push(pos.moveToSan(d));
    pos.make(d);
  }
  return { sans, duals };
}

it('mine shard ' + SHARD, () => {
  mkdirSync(OUT, { recursive: true });
  const rows: string[] = [];
  GAMES.forEach((g, gi) => {
    if (gi % SHARDS !== SHARD) return;
    const line = playLine(g.moves);
    for (let i = 0; i < line.sans.length; i++) {
      const fen = line.fens[i];
      const pos = new Position(fen);
      const r = searcher.search(pos, { timeMs: 150, multiPV: 2 });
      if (!r.lines.length) continue;
      const [a, b] = r.lines;
      const mi = mateIn(a.score);
      const label = `${g.id} | ${g.white} – ${g.black} ${g.year} | nước ${Math.floor(i / 2) + 1}${i % 2 ? '...' : '.'} ply ${i} | đã đi ${line.sans[i]}`;
      if (mi > 0 && mi <= 5) {
        const solver = new MateSolver();
        solver.limit = 3_000_000;
        try {
          const n = solver.shortest(new Position(fen), mi);
          if (!n) continue;
          const unique = solver.matingMoves(new Position(fen), n).length === 1;
          const ml = mateLine(fen, n, line.ucis.slice(i));
          rows.push(JSON.stringify({ kind: 'mate', n, unique, duals: ml.duals, label, fen, played: line.sans.slice(i, i + 2 * n - 1).join(' '), solution: ml.sans.join(' ') }));
        } catch {
          rows.push(JSON.stringify({ kind: 'mate?', n: mi, label, fen, played: line.sans.slice(i, i + 2 * mi - 1).join(' ') }));
        }
        continue;
      }
      if (mi) continue;
      // đòn chiến thuật: nước tốt nhất thắng rõ, nước thứ hai kém hẳn
      if (!b || a.score < 250 || a.score - b.score < 250) continue;
      const deep = searcher.search(new Position(fen), { timeMs: 900, multiPV: 2 });
      const [da, db] = deep.lines;
      if (!db || da.score < 250 || da.score - db.score < 200 || mateIn(da.score)) continue;
      const p2 = new Position(fen);
      const pv: string[] = [];
      for (const m of da.pv) {
        if (!p2.legalMoves().includes(m)) break;
        pv.push(p2.moveToSan(m));
        p2.make(m);
      }
      rows.push(JSON.stringify({ kind: 'tactic', label, fen, best: pv[0], playedBest: pv[0] === line.sans[i], score: da.score, second: db.score, pv: pv.join(' ') }));
    }
  });
  writeFileSync(`${OUT}/shard-${SHARD}.jsonl`, rows.join('\n') + '\n');
});
