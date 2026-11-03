// Kiểm chứng sâu một bài cờ thế: bài chiếu hết bằng bộ giải chính xác, bài "thắng" bằng máy tìm kiếm.
import { Position, playLine } from '../src/engine/board';
import { MateSolver } from '../src/engine/mate';
import { Searcher, isMateScore, mateIn } from '../src/engine/search';
import type { Puzzle } from '../src/data/types';

/** Độ sâu tìm kiếm cố định (không dùng thời gian) để kết quả không phụ thuộc tốc độ máy */
export const WIN_DEPTH = 8;
/** Nước giải phải hơn hẳn nước tốt thứ hai (centipawn) */
export const WIN_MARGIN = 150;
/** Sau lời giải, bên giải phải hơn ít nhất (centipawn) */
export const WIN_FINAL = 200;

export function verifyPuzzle(p: Puzzle): string[] {
  const errs: string[] = [];
  let line;
  try {
    line = playLine(p.solution, p.fen);
  } catch (e) {
    return [`${p.id}: ${(e as Error).message}`];
  }
  const plies = line.sans.length;
  if (plies % 2 === 0) return [`${p.id}: lời giải phải kết thúc bằng nước của người giải (đang có ${plies} nửa nước)`];
  if (p.goal === 'mate') errs.push(...verifyMate(p, line.ucis));
  else errs.push(...verifyWin(p, line.ucis, line.fens));
  return errs;
}

function verifyMate(p: Puzzle, ucis: string[]): string[] {
  const errs: string[] = [];
  const n = (ucis.length + 1) / 2;
  const pos = new Position(p.fen);
  const solver = new MateSolver();
  if (n > 1 && solver.mates(pos, n - 1)) errs.push(`${p.id}: có cách chiếu hết nhanh hơn ${n} nước`);
  ucis.forEach((u, i) => {
    const m = pos.moveFromUci(u);
    if (i % 2 === 0) {
      const left = n - i / 2;
      const good = solver.matingMoves(pos, left);
      if (!good.includes(m)) errs.push(`${p.id}: nước ${pos.moveToSan(m)} (nửa nước ${i + 1}) không ép chiếu hết trong ${left} nước`);
      else if (left > 1 && good.length > 1)
        errs.push(`${p.id}: nửa nước ${i + 1} có nhiều lời giải: ${good.map((g) => pos.moveToSan(g)).join(', ')}`);
      pos.make(m);
    } else {
      pos.make(m);
      const left = n - (i + 1) / 2;
      if (left > 1 && solver.mates(pos, left - 1)) errs.push(`${p.id}: nước đáp ${u} (nửa nước ${i + 1}) không phải cách phòng thủ dai dẳng nhất`);
    }
  });
  if (!(pos.inCheck() && !pos.hasLegalMove())) errs.push(`${p.id}: thế cuối không phải chiếu hết`);
  return errs;
}

function verifyWin(p: Puzzle, ucis: string[], fens: string[]): string[] {
  const errs: string[] = [];
  const searcher = new Searcher();
  for (let i = 0; i < ucis.length; i += 2) {
    const pos = new Position(fens[i]);
    const r = searcher.search(pos, { maxDepth: WIN_DEPTH, multiPV: 2 });
    const [a, b] = r.lines;
    const best = pos.moveToUci(a.move);
    const desc = r.lines.map((l) => `${pos.moveToSan(l.move)} ${fmt(l.score)}`).join(', ');
    if (best !== ucis[i]) {
      // nước giải chiếu hết nhanh như nước tốt nhất thì vẫn hợp lệ
      const sol = r.lines.find((l) => pos.moveToUci(l.move) === ucis[i]);
      if (!(sol && isMateScore(sol.score) && sol.score === a.score)) errs.push(`${p.id}: nửa nước ${i + 1}: máy chọn ${desc}, lời giải là ${ucis[i]}`);
      continue;
    }
    if (a.score < WIN_FINAL) errs.push(`${p.id}: nửa nước ${i + 1}: nước giải chưa đủ thắng (${desc})`);
    if (b && !(isMateScore(a.score) && !isMateScore(b.score)) && a.score - b.score < WIN_MARGIN)
      errs.push(`${p.id}: nửa nước ${i + 1}: nước thứ hai cũng tốt gần bằng (${desc})`);
  }
  const end = new Position(fens[fens.length - 1]);
  if (!end.status().over) {
    const r = searcher.search(end, { maxDepth: WIN_DEPTH - 1 });
    const score = -r.lines[0].score;
    if (score < WIN_FINAL) errs.push(`${p.id}: sau lời giải bên giải chỉ hơn ${fmt(score)}`);
  }
  return errs;
}

function fmt(score: number) {
  const m = mateIn(score);
  return m ? `#${m}` : (score > 0 ? '+' : '') + (score / 100).toFixed(2);
}
