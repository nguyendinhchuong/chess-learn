// Kiểm tra dữ liệu cờ tướng: FEN hợp lệ (quân đứng đúng điểm, không lộ mặt tướng), mọi nước đi hợp lệ,
// khóa lời bình nằm trong ván, kết quả khớp với thế cờ cuối.
import { Position, START_FEN, playLine, splitMoves, legalSquareFor, RED, BLACK, KING, ADVISOR, ELEPHANT, HORSE, ROOK, CANNON, PAWN, pieceColor, pieceType } from '../engine/board';
import type { XqDiagram, XqGame, XqLesson, XqOpening } from './types';
import { XQ_GAME_TAGS } from './types';

const ARROW_RE = /^[a-i]\d[a-i]\d(:(green|red|blue|yellow|orange))?$/;
const HL_RE = /^[a-i]\d(:(green|red|blue|yellow))?$/;
const MAX_COUNT = [0, 1, 2, 2, 2, 2, 2, 5];
const NAMES = ['', 'Tướng', 'Sĩ', 'Tượng', 'Mã', 'Xe', 'Pháo', 'Tốt'];

export function checkFen(fen: string): string | null {
  let pos: Position;
  try {
    pos = new Position(fen);
  } catch (e) {
    return String((e as Error).message ?? e);
  }
  const counts = [new Array(8).fill(0), new Array(8).fill(0)];
  for (let sq = 0; sq < 90; sq++) {
    const p = pos.board[sq];
    if (!p) continue;
    const t = pieceType(p),
      c = pieceColor(p);
    counts[c][t]++;
    if (!legalSquareFor(t, c, sq)) return `${NAMES[t]} ${c === RED ? 'Đỏ' : 'Đen'} đứng ở điểm không hợp lệ (${'abcdefghi'[sq % 9]}${(sq / 9) | 0}): ${fen}`;
  }
  for (const c of [RED, BLACK])
    for (const t of [KING, ADVISOR, ELEPHANT, HORSE, ROOK, CANNON, PAWN])
      if (counts[c][t] > MAX_COUNT[t]) return `Quá nhiều ${NAMES[t]} ${c === RED ? 'Đỏ' : 'Đen'}: ${fen}`;
  if (counts[RED][KING] !== 1 || counts[BLACK][KING] !== 1) return `FEN phải có đúng 1 Tướng mỗi bên: ${fen}`;
  if (pos.inCheck((pos.side ^ 1) as 0 | 1)) return `Bên không đến lượt đang bị chiếu hoặc hai Tướng lộ mặt (FEN sai): ${fen}`;
  return null;
}

export function checkDiagram(d: XqDiagram, where: string): string[] {
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

export function validateLesson(l: XqLesson): string[] {
  const errs: string[] = [];
  if (!l.sections.length) errs.push(`${l.id}: không có phần nào`);
  l.sections.forEach((s, i) => {
    if (s.diagram) errs.push(...checkDiagram(s.diagram, `${l.id} › phần ${i + 1} "${s.heading}"`));
  });
  return errs;
}

export function validateOpening(o: XqOpening): string[] {
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

export function validateGame(g: XqGame): string[] {
  const errs: string[] = [];
  let count = 0;
  try {
    const line = playLine(g.moves);
    count = line.sans.length;
    const final = new Position(line.fens[count]);
    const st = final.status();
    if (st.over && (st.reason === 'checkmate' || st.reason === 'stalemate')) {
      const winner = final.side === RED ? '0-1' : '1-0';
      if (g.result !== winner) errs.push(`${g.id}: kết quả ${g.result} không khớp thế cờ cuối (bên đi hết nước, ${winner})`);
    }
  } catch (e) {
    errs.push(`${g.id}: ${(e as Error).message}`);
    return errs;
  }
  for (const t of g.tags ?? []) if (!(XQ_GAME_TAGS as readonly string[]).includes(t)) errs.push(`${g.id}: chủ đề không hợp lệ "${t}"`);
  if (g.source !== undefined && !/^https?:\/\/\S+$/.test(g.source)) errs.push(`${g.id}: nguồn phải là đường dẫn http(s)`);
  for (const k of [...Object.keys(g.annotations), ...g.keyMoments]) {
    const ply = plyFromKey(k);
    if (ply < 1 || ply > count) errs.push(`${g.id}: khóa lời bình "${k}" ngoài phạm vi ván (${count} nửa nước)`);
  }
  return errs;
}

export { splitMoves };
