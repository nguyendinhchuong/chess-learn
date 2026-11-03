// Hình quân cờ và cách theo dõi từng quân qua một chuỗi nước đi cho trang giới thiệu.
// Mỗi quân giữ một mã riêng suốt ván nên khi cuộn trang, quân trượt từ ô này sang ô khác thay vì "nhảy" hình.
import { PIECE_SVG } from '../assets/pieces';

export type Kind = 'chess' | 'xq';

/** Ô hiển thị: cột và hàng tính từ góc trên bên trái (Trắng/Đỏ ở dưới) */
export interface Sq {
  c: number;
  r: number;
}

/** Mã hình quân: cờ vua 'wn', 'bq'…; cờ tướng 'r4' (Mã Đỏ), 'b5' (Xe Đen)… */
export interface Placed extends Sq {
  key: string;
}

/** Chữ Hán trên quân cờ tướng theo loại quân 1..7 (Tướng, Sĩ, Tượng, Mã, Xe, Pháo, Tốt): [Đỏ, Đen] */
const HAN: [string, string][] = [
  ['', ''],
  ['帥', '將'],
  ['仕', '士'],
  ['相', '象'],
  ['傌', '馬'],
  ['俥', '車'],
  ['炮', '砲'],
  ['兵', '卒'],
];
const XQ_TYPE: Record<string, number> = { k: 1, a: 2, b: 3, e: 3, n: 4, h: 4, r: 5, c: 6, p: 7 };

export function XqDisc({ k }: { k: string }) {
  const red = k[0] === 'r';
  return (
    <span className={'ld-disc ' + (red ? 'red' : 'black')}>
      <span className="ld-disc-face">
        <span className="ld-disc-han">{HAN[Number(k.slice(1))][red ? 0 : 1]}</span>
      </span>
    </span>
  );
}

export function PieceFace({ k, kind }: { k: string; kind: Kind }) {
  if (kind === 'xq') return <XqDisc k={k} />;
  return <img className={'ld-sprite ' + (k[0] === 'b' ? 'dark' : 'light')} src={PIECE_SVG[k]} alt="" draggable={false} />;
}

/** HTML của một quân (dùng cho màn chuyển cảnh, nằm ngoài cây React) */
export function pieceHtml(k: string, kind: Kind) {
  if (kind === 'chess') return `<img class="ld-sprite" src="${PIECE_SVG[k]}" alt="" />`;
  const red = k[0] === 'r';
  return `<span class="ld-disc ${red ? 'red' : 'black'}"><span class="ld-disc-face"><span class="ld-disc-han">${HAN[Number(k.slice(1))][red ? 0 : 1]}</span></span></span>`;
}

/** Các quân trên bàn từ FEN (cờ vua 8×8 hoặc cờ tướng 9×10) */
export function fromFen(fen: string, kind: Kind): Placed[] {
  const out: Placed[] = [];
  fen
    .split(' ')[0]
    .split('/')
    .forEach((row, r) => {
      let c = 0;
      for (const ch of row) {
        if (/\d/.test(ch)) {
          c += Number(ch);
          continue;
        }
        const white = ch === ch.toUpperCase();
        const key = kind === 'chess' ? (white ? 'w' : 'b') + ch.toLowerCase() : (white ? 'r' : 'b') + XQ_TYPE[ch.toLowerCase()];
        out.push({ key, c, r });
        c++;
      }
    });
  return out;
}

/** Ô của tọa độ kiểu "e2" (cờ vua, hàng 1..8) hoặc "h2" (cờ tướng ICCS, hàng 0..9) */
function sqOf(s: string, kind: Kind): Sq {
  const c = s.charCodeAt(0) - 97;
  const n = Number(s.slice(1));
  return { c, r: kind === 'chess' ? 8 - n : 9 - n };
}

export interface Track {
  id: string;
  /** Hình quân sau mỗi nửa nước (đổi khi phong cấp) */
  keys: string[];
  /** Vị trí sau mỗi nửa nước; null = đã bị ăn */
  at: (Sq | null)[];
}

export interface Line {
  kind: Kind;
  tracks: Track[];
  /** moves[i] = nước dẫn tới thế thứ i + 1 */
  moves: { from: Sq; to: Sq }[];
  plies: number;
}

/** Đi lần lượt các nước dạng tọa độ từ thế `fen`, ghi lại vị trí từng quân sau mỗi nửa nước */
export function buildLine(fen: string, ucis: string[], kind: Kind): Line {
  const start = fromFen(fen, kind);
  const tracks: Track[] = start.map((p, i) => ({ id: p.key + i, keys: [p.key], at: [{ c: p.c, r: p.r }] }));
  const board = new Map<string, number>();
  const id = (s: Sq) => s.c + ',' + s.r;
  start.forEach((p, i) => board.set(id(p), i));
  const moves: Line['moves'] = [];

  ucis.forEach((u) => {
    const from = sqOf(u.slice(0, 2), kind);
    const to = sqOf(u.slice(2, 4), kind);
    moves.push({ from, to });
    const mover = board.get(id(from));
    const next = tracks.map((t) => t.at[t.at.length - 1]);
    const keys = tracks.map((t) => t.keys[t.keys.length - 1]);
    if (mover !== undefined) {
      const captured = board.get(id(to));
      if (captured !== undefined) next[captured] = null;
      board.delete(id(from));
      board.set(id(to), mover);
      next[mover] = to;
      if (kind === 'chess') {
        const k = keys[mover];
        // bắt tốt qua đường
        if (k[1] === 'p' && from.c !== to.c && captured === undefined) {
          const ep = board.get(id({ c: to.c, r: from.r }));
          if (ep !== undefined) {
            next[ep] = null;
            board.delete(id({ c: to.c, r: from.r }));
          }
        }
        // nhập thành: Xe đi theo Vua
        if (k[1] === 'k' && Math.abs(to.c - from.c) === 2) {
          const rookFrom = { c: to.c > from.c ? 7 : 0, r: from.r };
          const rookTo = { c: to.c > from.c ? 5 : 3, r: from.r };
          const rook = board.get(id(rookFrom));
          if (rook !== undefined) {
            board.delete(id(rookFrom));
            board.set(id(rookTo), rook);
            next[rook] = rookTo;
          }
        }
        if (u.length > 4) keys[mover] = k[0] + u[4];
      }
    }
    tracks.forEach((t, i) => {
      t.at.push(next[i]);
      t.keys.push(keys[i]);
    });
  });
  return { kind, tracks, moves, plies: ucis.length };
}
