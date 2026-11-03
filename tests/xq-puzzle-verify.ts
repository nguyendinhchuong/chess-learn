// Kiểm chứng sâu một bài cờ thế cờ tướng: bài "mate" bằng bộ giải chính xác, bài "win" bằng máy tìm kiếm.
import { Position, playLine } from '../src/xiangqi/engine/board';
import { MateSolver } from '../src/xiangqi/engine/mate';
import { Searcher, isMateScore, mateIn } from '../src/xiangqi/engine/search';
import type { XqPuzzle } from '../src/xiangqi/data/types';

/** Độ sâu tìm kiếm cố định (không dùng thời gian) để kết quả không phụ thuộc tốc độ máy */
export const WIN_DEPTH = 7;
/** Nước giải phải hơn hẳn nước tốt thứ hai (centipawn) */
export const WIN_MARGIN = 150;
/** Sau lời giải, bên giải phải hơn ít nhất (centipawn) */
export const WIN_FINAL = 250;

export function verifyXqPuzzle(p: XqPuzzle): string[] {
  let line;
  try {
    line = playLine(p.solution, p.fen);
  } catch (e) {
    return [`${p.id}: ${(e as Error).message}`];
  }
  const plies = line.sans.length;
  if (plies % 2 === 0) return [`${p.id}: lời giải phải kết thúc bằng nước của người giải (đang có ${plies} nửa nước)`];
  return p.goal === 'mate' ? verifyMate(p, line.ucis) : verifyWin(p, line.ucis, line.fens);
}

function verifyMate(p: XqPuzzle, ucis: string[]): string[] {
  const errs: string[] = [];
  const n = (ucis.length + 1) / 2;
  const pos = new Position(p.fen);
  const solver = new MateSolver();
  solver.limit = 30_000_000;
  if (n > 1 && solver.mates(pos, n - 1)) errs.push(`${p.id}: có cách thắng nhanh hơn ${n} nước`);
  ucis.forEach((u, i) => {
    const m = pos.moveFromUci(u);
    if (i % 2 === 0) {
      const left = n - i / 2;
      const good = solver.matingMoves(pos, left);
      if (!good.includes(m)) errs.push(`${p.id}: nước ${pos.moveToSan(m)} (nửa nước ${i + 1}) không ép thắng trong ${left} nước`);
      else if (left > 1 && good.length > 1) errs.push(`${p.id}: nửa nước ${i + 1} có nhiều lời giải: ${good.map((g) => pos.moveToSan(g)).join(', ')}`);
      pos.make(m);
    } else {
      pos.make(m);
      const left = n - (i + 1) / 2;
      if (left > 1 && solver.mates(pos, left - 1)) errs.push(`${p.id}: nước đáp ${u} (nửa nước ${i + 1}) không phải cách chống đỡ dai dẳng nhất`);
    }
  });
  if (pos.hasLegalMove()) errs.push(`${p.id}: thế cuối bên thua vẫn còn nước đi`);
  return errs;
}

function verifyWin(p: XqPuzzle, ucis: string[], fens: string[]): string[] {
  const errs: string[] = [];
  const searcher = new Searcher();
  for (let i = 0; i < ucis.length; i += 2) {
    const pos = new Position(fens[i]);
    const r = searcher.search(pos, { maxDepth: WIN_DEPTH, multiPV: 2 });
    const [a, b] = r.lines;
    const best = pos.moveToUci(a.move);
    if (best !== ucis[i]) {
      // chấp nhận nếu nước giải cũng thắng chiếu hết nhanh như nhau
      const sol = r.lines.find((l) => pos.moveToUci(l.move) === ucis[i]);
      if (!(sol && isMateScore(a.score) && mateIn(sol.score) === mateIn(a.score))) errs.push(`${p.id}: nửa nước ${i + 1} máy chọn ${pos.moveToSan(a.move)} thay vì nước giải`);
      continue;
    }
    if (b && !isMateScore(a.score) && a.score - b.score < WIN_MARGIN) errs.push(`${p.id}: nửa nước ${i + 1} nước giải chỉ hơn nước thứ hai ${a.score - b.score} (cần ${WIN_MARGIN})`);
  }
  const last = new Position(fens[fens.length - 1]);
  const r = searcher.search(last, { maxDepth: WIN_DEPTH - 2 });
  const score = r.lines.length ? -r.lines[0].score : 30000;
  if (score < WIN_FINAL) errs.push(`${p.id}: sau lời giải bên giải chỉ hơn ${score} (cần ${WIN_FINAL})`);
  return errs;
}
