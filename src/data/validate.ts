// Kiểm tra tính đúng đắn của dữ liệu cờ: FEN hợp lệ, mọi nước đi hợp lệ, khóa lời bình nằm trong ván.
import { Position, START_FEN, playLine, splitMoves, WHITE, BLACK, KING, makePiece } from '../engine/board';
import type { ClassicGame, Diagram, Lesson, Opening } from './types';
import { GAME_TAGS } from './types';

const ARROW_RE = /^[a-h][1-8][a-h][1-8](:(green|red|blue|yellow|orange))?$/;
const HL_RE = /^[a-h][1-8](:(green|red|blue|yellow))?$/;

export function checkFen(fen: string): string | null {
  let pos: Position;
  try {
    pos = new Position(fen);
  } catch (e) {
    return String(e);
  }
  let wk = 0,
    bk = 0;
  for (let sq = 0; sq < 128; sq++) {
    if (sq & 0x88) continue;
    if (pos.board[sq] === makePiece(KING, WHITE)) wk++;
    if (pos.board[sq] === makePiece(KING, BLACK)) bk++;
  }
  if (wk !== 1 || bk !== 1) return `FEN phải có đúng 1 Vua mỗi bên: ${fen}`;
  if (pos.inCheck((pos.side ^ 1) as 0 | 1)) return `Bên không đến lượt đang bị chiếu (FEN sai): ${fen}`;
  for (let f = 0; f < 8; f++) {
    const a = pos.board[f] & 7,
      b = pos.board[0x70 | f] & 7;
    if (a === 1 || b === 1) return `Có tốt ở hàng 1/8: ${fen}`;
  }
  return null;
}

export function checkDiagram(d: Diagram, where: string): string[] {
  const errs: string[] = [];
  const fen = d.fen ?? START_FEN;
  const fe = checkFen(fen);
  if (fe) return [`${where}: ${fe}`];
  for (const a of d.arrows ?? []) if (!ARROW_RE.test(a)) errs.push(`${where}: mũi tên sai định dạng "${a}"`);
  for (const h of d.highlights ?? []) if (!HL_RE.test(h)) errs.push(`${where}: tô ô sai định dạng "${h}"`);
  if (d.moves) {
    try {
      const line = playLine(d.moves, fen);
      if (d.notes && d.notes.length > line.sans.length) errs.push(`${where}: notes (${d.notes.length}) nhiều hơn số nước (${line.sans.length})`);
    } catch (e) {
      errs.push(`${where}: ${(e as Error).message}`);
    }
  } else if (d.notes?.length) errs.push(`${where}: có notes nhưng không có moves`);
  return errs;
}

export function validateLesson(l: Lesson): string[] {
  const errs: string[] = [];
  if (!l.sections.length) errs.push(`${l.id}: không có phần nào`);
  l.sections.forEach((s, i) => {
    if (s.diagram) errs.push(...checkDiagram(s.diagram, `${l.id} › phần ${i + 1} "${s.heading}"`));
  });
  return errs;
}

export function validateOpening(o: Opening): string[] {
  const errs: string[] = [];
  try {
    const line = playLine(o.moves);
    if (o.moveNotes.length > line.sans.length) errs.push(`${o.id}: moveNotes (${o.moveNotes.length}) nhiều hơn số nước (${line.sans.length})`);
  } catch (e) {
    errs.push(`${o.id} (diễn biến chính): ${(e as Error).message}`);
  }
  for (const v of o.variations) {
    try {
      playLine(v.moves);
    } catch (e) {
      errs.push(`${o.id} › biến "${v.name}": ${(e as Error).message}`);
    }
  }
  for (const t of o.traps) {
    try {
      playLine(t.moves);
    } catch (e) {
      errs.push(`${o.id} › bẫy "${t.name}": ${(e as Error).message}`);
    }
  }
  return errs;
}

export function plyFromKey(key: string): number {
  const m = /^(\d+)(\.\.\.)?$/.exec(key.trim());
  if (!m) return -1;
  const n = Number(m[1]);
  return m[2] ? n * 2 : n * 2 - 1;
}

export function validateGame(g: ClassicGame): string[] {
  const errs: string[] = [];
  let count = 0;
  try {
    const line = playLine(g.moves);
    count = line.sans.length;
    const last = line.sans[count - 1];
    const final = new Position(line.fens[count]);
    if (last.endsWith('#') && final.status().reason !== 'checkmate') errs.push(`${g.id}: nước cuối có # nhưng không phải chiếu hết`);
    if (final.status().reason === 'checkmate') {
      const winner = final.side === WHITE ? '0-1' : '1-0';
      if (g.result !== winner) errs.push(`${g.id}: kết quả ${g.result} không khớp chiếu hết (${winner})`);
    }
  } catch (e) {
    errs.push(`${g.id}: ${(e as Error).message}`);
    return errs;
  }
  for (const t of g.tags ?? []) if (!(GAME_TAGS as readonly string[]).includes(t)) errs.push(`${g.id}: chủ đề không hợp lệ "${t}"`);
  if (g.source !== undefined && !/^https?:\/\/\S+$/.test(g.source)) errs.push(`${g.id}: nguồn phải là đường dẫn http(s)`);
  for (const k of [...Object.keys(g.annotations), ...g.keyMoments]) {
    const ply = plyFromKey(k);
    if (ply < 1 || ply > count) errs.push(`${g.id}: khóa lời bình "${k}" ngoài phạm vi ván (${count} nửa nước)`);
  }
  return errs;
}

export { splitMoves };
