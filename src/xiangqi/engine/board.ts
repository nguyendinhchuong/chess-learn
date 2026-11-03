// Luật cờ tướng: bàn cờ 9 × 10, sinh nước đi, FEN, ký hiệu nước đi kiểu Việt Nam (P2-5, M8.7, X1/1),
// đọc thêm ký hiệu chữ Hán (炮二平五) và tọa độ ICCS (h2e2), băm Zobrist, lặp lại thế cờ và luật chiếu dai.
//
// Quy ước tọa độ: cột a..i (trái → phải nhìn từ phía Đỏ), hàng 0..9 (hàng 0 là hàng cuối của Đỏ).
// Ô = y * 9 + x. Đỏ đi trước và ở phía dưới; trong FEN, Đỏ viết hoa và lượt Đỏ là "w".

export const RED = 0;
export const BLACK = 1;
export type Color = 0 | 1;

export const KING = 1; // Tướng
export const ADVISOR = 2; // Sĩ
export const ELEPHANT = 3; // Tượng
export const HORSE = 4; // Mã
export const ROOK = 5; // Xe
export const CANNON = 6; // Pháo
export const PAWN = 7; // Tốt (Binh)

export const pieceType = (p: number) => p & 7;
export const pieceColor = (p: number): Color => ((p >> 3) & 1) as Color;
export const makePiece = (type: number, color: number) => type | (color << 3);

export const sqX = (sq: number) => sq % 9;
export const sqY = (sq: number) => (sq / 9) | 0;
export const makeSq = (x: number, y: number) => y * 9 + x;
export const sqName = (sq: number) => 'abcdefghi'[sq % 9] + String((sq / 9) | 0);
export function parseSq(s: string): number {
  if (s.length !== 2) return -1;
  const x = s.charCodeAt(0) - 97;
  const y = s.charCodeAt(1) - 48;
  if (x < 0 || x > 8 || y < 0 || y > 9) return -1;
  return y * 9 + x;
}

export const moveFrom = (m: number) => m & 127;
export const moveTo = (m: number) => (m >> 7) & 127;
export const encodeMove = (from: number, to: number) => from | (to << 7);

export const START_FEN = 'rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1';

/** Số cột theo cách gọi của từng bên: Đỏ đếm 1..9 từ phải sang trái (nhìn từ phía Đỏ), Đen đếm từ phải sang trái nhìn từ phía Đen */
export const fileNumber = (x: number, color: Color) => (color === RED ? 9 - x : x + 1);

/** Hàng đã qua sông của bên `color` */
export const crossedRiver = (y: number, color: Color) => (color === RED ? y >= 5 : y <= 4);

// ---------------------------------------------------------------------------------------------
// Bảng tính sẵn
// ---------------------------------------------------------------------------------------------
const inBoard = (x: number, y: number) => x >= 0 && x < 9 && y >= 0 && y < 10;
/** Ô thuộc cung của bên nào (-1 nếu ngoài cung) */
function palaceOf(x: number, y: number): number {
  if (x < 3 || x > 5 || y < 0 || y > 9) return -1;
  if (y <= 2) return RED;
  if (y >= 7) return BLACK;
  return -1;
}
const sideOf = (y: number) => (y <= 4 ? RED : BLACK);

/** RAYS[sq] = [lên (y tăng), xuống, trái, phải] */
export const RAYS: number[][][] = [];
export const KING_MOVES: number[][] = [];
export const ADVISOR_MOVES: number[][] = [];
/** [ô đến, mắt tượng] */
export const ELEPHANT_MOVES: [number, number][][] = [];
/** [ô đến, chân mã] */
export const HORSE_MOVES: [number, number][][] = [];
/** Các vị trí mã có thể chiếu/tấn công ô này: [ô của mã, chân mã] */
export const HORSE_ATTACKERS: [number, number][][] = [];
/** PAWN_MOVES[color][sq] */
export const PAWN_MOVES: number[][][] = [[], []];

for (let sq = 0; sq < 90; sq++) {
  const x = sq % 9,
    y = (sq / 9) | 0;
  const rays: number[][] = [];
  for (const [dx, dy] of [
    [0, 1],
    [0, -1],
    [-1, 0],
    [1, 0],
  ]) {
    const r: number[] = [];
    for (let i = 1; inBoard(x + dx * i, y + dy * i); i++) r.push(makeSq(x + dx * i, y + dy * i));
    rays.push(r);
  }
  RAYS.push(rays);

  const pal = palaceOf(x, y);
  const km: number[] = [];
  const am: number[] = [];
  if (pal >= 0) {
    for (const [dx, dy] of [
      [0, 1],
      [0, -1],
      [-1, 0],
      [1, 0],
    ])
      if (palaceOf(x + dx, y + dy) === pal) km.push(makeSq(x + dx, y + dy));
    for (const [dx, dy] of [
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1],
    ])
      if (palaceOf(x + dx, y + dy) === pal) am.push(makeSq(x + dx, y + dy));
  }
  KING_MOVES.push(km);
  ADVISOR_MOVES.push(am);

  const em: [number, number][] = [];
  for (const [dx, dy] of [
    [2, 2],
    [2, -2],
    [-2, 2],
    [-2, -2],
  ]) {
    const tx = x + dx,
      ty = y + dy;
    if (inBoard(tx, ty) && sideOf(ty) === sideOf(y)) em.push([makeSq(tx, ty), makeSq(x + dx / 2, y + dy / 2)]);
  }
  ELEPHANT_MOVES.push(em);

  const hm: [number, number][] = [];
  const ha: [number, number][] = [];
  for (const [dx, dy] of [
    [1, 2],
    [-1, 2],
    [1, -2],
    [-1, -2],
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
  ]) {
    // đi: chân mã là ô kề theo hướng dài
    const tx = x + dx,
      ty = y + dy;
    if (inBoard(tx, ty)) {
      const leg = Math.abs(dy) === 2 ? makeSq(x, y + dy / 2) : makeSq(x + dx / 2, y);
      hm.push([makeSq(tx, ty), leg]);
    }
    // bị tấn công: mã đứng ở sq - (dx,dy), chân mã nằm chéo cạnh ô bị tấn công
    const hx = x - dx,
      hy = y - dy;
    if (inBoard(hx, hy)) {
      const leg = Math.abs(dy) === 2 ? makeSq(x - dx, y - Math.sign(dy)) : makeSq(x - Math.sign(dx), y - dy);
      ha.push([makeSq(hx, hy), leg]);
    }
  }
  HORSE_MOVES.push(hm);
  HORSE_ATTACKERS.push(ha);

  for (const color of [RED, BLACK] as Color[]) {
    const pm: number[] = [];
    const fy = color === RED ? y + 1 : y - 1;
    if (fy >= 0 && fy <= 9) pm.push(makeSq(x, fy));
    if (crossedRiver(y, color)) {
      if (x > 0) pm.push(sq - 1);
      if (x < 8) pm.push(sq + 1);
    }
    PAWN_MOVES[color].push(pm);
  }
}

/** Ô hợp lệ cho từng loại quân (Sĩ, Tượng, Tướng chỉ đứng ở một số điểm; Tốt không thể ở sau hàng xuất phát) */
export function legalSquareFor(type: number, color: Color, sq: number): boolean {
  const x = sq % 9,
    y = (sq / 9) | 0;
  const ry = color === RED ? y : 9 - y; // hàng tính từ phía mình
  switch (type) {
    case KING:
      return palaceOf(x, y) === color;
    case ADVISOR:
      return palaceOf(x, y) === color && (x + ry) % 2 === 1;
    case ELEPHANT:
      return ((ry === 0 || ry === 4) && (x === 2 || x === 6)) || (ry === 2 && x % 4 === 0);
    case PAWN:
      return ry >= 3 && (ry >= 5 || x % 2 === 0);
    default:
      return true;
  }
}

// ---------------------------------------------------------------------------------------------
// Băm Zobrist (hai nửa 32 bit)
// ---------------------------------------------------------------------------------------------
let seed = 0x2f6b3c1d;
function rand32() {
  // mulberry32
  seed = (seed + 0x6d2b79f5) | 0;
  let t = seed;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return (t ^ (t >>> 14)) | 0;
}
const Z_LO = new Int32Array(16 * 90);
const Z_HI = new Int32Array(16 * 90);
for (let i = 0; i < 16 * 90; i++) {
  Z_LO[i] = rand32();
  Z_HI[i] = rand32();
}
const Z_SIDE_LO = rand32();
const Z_SIDE_HI = rand32();

const FEN_CHARS = ' kabnrcp';
const PIECE_FROM_CHAR: Record<string, number> = { k: KING, a: ADVISOR, b: ELEPHANT, e: ELEPHANT, n: HORSE, h: HORSE, r: ROOK, c: CANNON, p: PAWN };

/** Ký hiệu chữ cái của quân trong cách ghi nước đi kiểu Việt Nam */
export const PIECE_LETTER = ['', 'Tg', 'S', 'T', 'M', 'X', 'P', 'B'];
/** Tên quân tiếng Việt */
export const PIECE_VI = ['', 'Tướng', 'Sĩ', 'Tượng', 'Mã', 'Xe', 'Pháo', 'Tốt'];
/** Chữ Hán trên quân cờ: [Đỏ, Đen] */
export const PIECE_HAN: [string, string][] = [
  ['', ''],
  ['帥', '將'],
  ['仕', '士'],
  ['相', '象'],
  ['傌', '馬'],
  ['俥', '車'],
  ['炮', '砲'],
  ['兵', '卒'],
];

export type GameReason = 'checkmate' | 'stalemate' | 'repetition' | 'perpetual' | 'insufficient' | 'moveLimit';

export interface GameStatus {
  over: boolean;
  /** "1-0" = Đỏ thắng, "0-1" = Đen thắng */
  result?: '1-0' | '0-1' | '1/2-1/2';
  reason?: GameReason;
}

/** Số nửa nước không ăn quân để xử hòa (60 nước mỗi bên) */
export const MOVE_LIMIT = 120;

export class Position {
  board = new Int8Array(90);
  side: Color = RED;
  kingSq: [number, number] = [-1, -1];
  hashLo = 0;
  hashHi = 0;
  /** Số nửa nước liên tiếp không ăn quân */
  halfmove = 0;
  fullmove = 1;

  // ngăn xếp để lùi nước
  private mvStack: number[] = [];
  private capStack: number[] = [];
  private halfStack: number[] = [];
  /** Băm của mọi thế cờ từ lúc nạp FEN (chỉ số 0 = thế ban đầu) */
  histLo: number[] = [];
  histHi: number[] = [];

  constructor(fen: string = START_FEN) {
    this.load(fen);
  }

  clone(): Position {
    const p = new Position(this.fen());
    return p;
  }

  load(fen: string) {
    const parts = fen.trim().split(/\s+/);
    const rows = parts[0].split('/');
    if (rows.length !== 10) throw new Error('FEN cờ tướng phải có 10 hàng: ' + fen);
    this.board.fill(0);
    this.kingSq = [-1, -1];
    rows.forEach((row, ri) => {
      const y = 9 - ri;
      let x = 0;
      for (const ch of row) {
        if (/\d/.test(ch)) {
          x += Number(ch);
          continue;
        }
        const t = PIECE_FROM_CHAR[ch.toLowerCase()];
        if (!t) throw new Error(`Ký tự lạ "${ch}" trong FEN: ${fen}`);
        if (x > 8) throw new Error('Hàng FEN quá dài: ' + fen);
        const color = ch === ch.toUpperCase() ? RED : BLACK;
        const sq = makeSq(x, y);
        this.board[sq] = makePiece(t, color);
        if (t === KING) this.kingSq[color] = sq;
        x++;
      }
      if (x !== 9) throw new Error(`Hàng ${ri + 1} của FEN không đủ 9 cột: ${fen}`);
    });
    if (this.kingSq[0] < 0 || this.kingSq[1] < 0) throw new Error('FEN thiếu Tướng: ' + fen);
    this.side = parts[1] === 'b' ? BLACK : RED;
    this.halfmove = Number(parts[4] ?? 0) || 0;
    this.fullmove = Number(parts[5] ?? 1) || 1;
    this.mvStack = [];
    this.capStack = [];
    this.halfStack = [];
    this.computeHash();
    this.histLo = [this.hashLo];
    this.histHi = [this.hashHi];
  }

  computeHash() {
    let lo = 0,
      hi = 0;
    for (let sq = 0; sq < 90; sq++) {
      const p = this.board[sq];
      if (p) {
        lo ^= Z_LO[p * 90 + sq];
        hi ^= Z_HI[p * 90 + sq];
      }
    }
    if (this.side === BLACK) {
      lo ^= Z_SIDE_LO;
      hi ^= Z_SIDE_HI;
    }
    this.hashLo = lo;
    this.hashHi = hi;
  }

  boardFen(): string {
    const rows: string[] = [];
    for (let y = 9; y >= 0; y--) {
      let row = '';
      let empty = 0;
      for (let x = 0; x < 9; x++) {
        const p = this.board[makeSq(x, y)];
        if (!p) {
          empty++;
          continue;
        }
        if (empty) row += empty;
        empty = 0;
        const ch = FEN_CHARS[p & 7];
        row += p & 8 ? ch : ch.toUpperCase();
      }
      if (empty) row += empty;
      rows.push(row);
    }
    return rows.join('/');
  }

  fen(): string {
    return `${this.boardFen()} ${this.side === RED ? 'w' : 'b'} - - ${this.halfmove} ${this.fullmove}`;
  }

  /** Khóa thế cờ (vị trí quân + lượt đi) – dùng cho sách khai cuộc */
  key(): string {
    return this.boardFen() + (this.side === RED ? ' w' : ' b');
  }

  pieceAt(name: string): number {
    const sq = parseSq(name);
    return sq < 0 ? 0 : this.board[sq];
  }

  // -------------------------------------------------------------------------------------------
  // Chiếu và tấn công
  // -------------------------------------------------------------------------------------------
  /** Tướng của `color` đang bị chiếu (kể cả lộ mặt tướng) */
  inCheck(color: Color = this.side): boolean {
    const k = this.kingSq[color];
    const b = this.board;
    const enemy = (color ^ 1) << 3;
    const rays = RAYS[k];
    for (let d = 0; d < 4; d++) {
      const ray = rays[d];
      let i = 0;
      for (; i < ray.length; i++) {
        const q = b[ray[i]];
        if (q) {
          if ((q & 8) === enemy) {
            const t = q & 7;
            if (t === ROOK || (t === KING && d < 2)) return true;
          }
          break;
        }
      }
      for (i++; i < ray.length; i++) {
        const q = b[ray[i]];
        if (q) {
          if (q === (CANNON | enemy)) return true;
          break;
        }
      }
    }
    const horse = HORSE | enemy;
    const ha = HORSE_ATTACKERS[k];
    for (let i = 0; i < ha.length; i++) if (b[ha[i][0]] === horse && !b[ha[i][1]]) return true;
    const pawn = PAWN | enemy;
    const fwd = color === RED ? 9 : -9;
    const f = k + fwd;
    if (f >= 0 && f < 90 && b[f] === pawn) return true;
    const x = k % 9;
    if (x > 0 && b[k - 1] === pawn) return true;
    if (x < 8 && b[k + 1] === pawn) return true;
    return false;
  }

  /**
   * Các quân bên `by` có thể ăn (giả hợp lệ – chưa xét quân bị ghim) quân ở ô `sq`.
   * Tướng chỉ tính khi ô nằm trong cung, hoặc khi ô là Tướng đối phương cùng cột không bị cản (lộ mặt tướng).
   */
  attackers(sq: number, by: Color): number[] {
    const res: number[] = [];
    const b = this.board;
    const mine = by << 3;
    const x = sq % 9,
      y = (sq / 9) | 0;
    const rays = RAYS[sq];
    for (let d = 0; d < 4; d++) {
      const ray = rays[d];
      let i = 0;
      for (; i < ray.length; i++) {
        const q = b[ray[i]];
        if (q) {
          if ((q & 8) === mine) {
            const t = q & 7;
            if (t === ROOK) res.push(ray[i]);
            else if (t === KING && d < 2 && (b[sq] & 7) === KING && (b[sq] & 8) !== mine) res.push(ray[i]);
          }
          break;
        }
      }
      for (i++; i < ray.length; i++) {
        const q = b[ray[i]];
        if (q) {
          if (q === (CANNON | mine)) res.push(ray[i]);
          break;
        }
      }
    }
    for (const [h, leg] of HORSE_ATTACKERS[sq]) if (b[h] === (HORSE | mine) && !b[leg]) res.push(h);
    // tốt: đứng phía sau (theo hướng tiến của nó) hoặc bên cạnh khi đã qua sông
    const pawn = PAWN | mine;
    const back = by === RED ? sq - 9 : sq + 9;
    if (back >= 0 && back < 90 && b[back] === pawn) res.push(back);
    if (x > 0 && b[sq - 1] === pawn && crossedRiver(y, by)) res.push(sq - 1);
    if (x < 8 && b[sq + 1] === pawn && crossedRiver(y, by)) res.push(sq + 1);
    for (const a of ADVISOR_MOVES[sq]) if (b[a] === (ADVISOR | mine) && palaceOf(x, y) === by) res.push(a);
    for (const [e, eye] of ELEPHANT_MOVES[sq]) if (b[e] === (ELEPHANT | mine) && !b[eye] && sideOf(y) === by) res.push(e);
    for (const k of KING_MOVES[sq]) if (b[k] === (KING | mine) && palaceOf(x, y) === by) res.push(k);
    return res;
  }

  isAttacked(sq: number, by: Color): boolean {
    return this.attackers(sq, by).length > 0;
  }

  /** Các ô mà quân ở `sq` tấn công (có thể ăn nếu có quân địch) */
  attacksFrom(sq: number): number[] {
    const p = this.board[sq];
    if (!p) return [];
    const color = pieceColor(p);
    const b = this.board;
    const res: number[] = [];
    switch (p & 7) {
      case KING:
        res.push(...KING_MOVES[sq]);
        break;
      case ADVISOR:
        res.push(...ADVISOR_MOVES[sq]);
        break;
      case ELEPHANT:
        for (const [to, eye] of ELEPHANT_MOVES[sq]) if (!b[eye]) res.push(to);
        break;
      case HORSE:
        for (const [to, leg] of HORSE_MOVES[sq]) if (!b[leg]) res.push(to);
        break;
      case ROOK:
        for (const ray of RAYS[sq])
          for (const to of ray) {
            res.push(to);
            if (b[to]) break;
          }
        break;
      case CANNON:
        for (const ray of RAYS[sq]) {
          let i = 0;
          while (i < ray.length && !b[ray[i]]) i++;
          for (i++; i < ray.length; i++) {
            res.push(ray[i]);
            if (b[ray[i]]) break;
          }
        }
        break;
      case PAWN:
        res.push(...PAWN_MOVES[color][sq]);
        break;
    }
    return res;
  }

  // -------------------------------------------------------------------------------------------
  // Sinh nước đi
  // -------------------------------------------------------------------------------------------
  /** Sinh nước đi giả hợp lệ (chưa loại nước để Tướng bị chiếu). Trả về số nước đã ghi. */
  generate(out: Int32Array | number[], start = 0, capturesOnly = false): number {
    let n = start;
    const b = this.board;
    const mine = this.side << 3;
    const side = this.side;
    for (let sq = 0; sq < 90; sq++) {
      const p = b[sq];
      if (!p || (p & 8) !== mine) continue;
      switch (p & 7) {
        case KING: {
          const km = KING_MOVES[sq];
          for (let i = 0; i < km.length; i++) {
            const to = km[i];
            const q = b[to];
            if (q ? (q & 8) !== mine : !capturesOnly) out[n++] = sq | (to << 7);
          }
          break;
        }
        case ADVISOR: {
          const am = ADVISOR_MOVES[sq];
          for (let i = 0; i < am.length; i++) {
            const to = am[i];
            const q = b[to];
            if (q ? (q & 8) !== mine : !capturesOnly) out[n++] = sq | (to << 7);
          }
          break;
        }
        case ELEPHANT: {
          const em = ELEPHANT_MOVES[sq];
          for (let i = 0; i < em.length; i++) {
            if (b[em[i][1]]) continue;
            const to = em[i][0];
            const q = b[to];
            if (q ? (q & 8) !== mine : !capturesOnly) out[n++] = sq | (to << 7);
          }
          break;
        }
        case HORSE: {
          const hm = HORSE_MOVES[sq];
          for (let i = 0; i < hm.length; i++) {
            if (b[hm[i][1]]) continue;
            const to = hm[i][0];
            const q = b[to];
            if (q ? (q & 8) !== mine : !capturesOnly) out[n++] = sq | (to << 7);
          }
          break;
        }
        case ROOK: {
          const rays = RAYS[sq];
          for (let d = 0; d < 4; d++) {
            const ray = rays[d];
            for (let i = 0; i < ray.length; i++) {
              const to = ray[i];
              const q = b[to];
              if (!q) {
                if (!capturesOnly) out[n++] = sq | (to << 7);
              } else {
                if ((q & 8) !== mine) out[n++] = sq | (to << 7);
                break;
              }
            }
          }
          break;
        }
        case CANNON: {
          const rays = RAYS[sq];
          for (let d = 0; d < 4; d++) {
            const ray = rays[d];
            let i = 0;
            for (; i < ray.length; i++) {
              const to = ray[i];
              if (b[to]) break;
              if (!capturesOnly) out[n++] = sq | (to << 7);
            }
            for (i++; i < ray.length; i++) {
              const q = b[ray[i]];
              if (q) {
                if ((q & 8) !== mine) out[n++] = sq | (ray[i] << 7);
                break;
              }
            }
          }
          break;
        }
        case PAWN: {
          const pm = PAWN_MOVES[side][sq];
          for (let i = 0; i < pm.length; i++) {
            const to = pm[i];
            const q = b[to];
            if (q ? (q & 8) !== mine : !capturesOnly) out[n++] = sq | (to << 7);
          }
          break;
        }
      }
    }
    return n - start;
  }

  /** Đi một nước giả hợp lệ. Nếu nước đi để Tướng mình bị chiếu thì lùi lại và trả về false. */
  make(m: number): boolean {
    const from = m & 127,
      to = (m >> 7) & 127;
    const b = this.board;
    const p = b[from];
    const cap = b[to];
    const color = this.side;
    this.mvStack.push(m);
    this.capStack.push(cap);
    this.halfStack.push(this.halfmove);
    let lo = this.hashLo ^ Z_LO[p * 90 + from] ^ Z_LO[p * 90 + to] ^ Z_SIDE_LO;
    let hi = this.hashHi ^ Z_HI[p * 90 + from] ^ Z_HI[p * 90 + to] ^ Z_SIDE_HI;
    if (cap) {
      lo ^= Z_LO[cap * 90 + to];
      hi ^= Z_HI[cap * 90 + to];
    }
    this.hashLo = lo;
    this.hashHi = hi;
    b[to] = p;
    b[from] = 0;
    if ((p & 7) === KING) this.kingSq[color] = to;
    if ((cap & 7) === KING) this.kingSq[color ^ 1] = -1;
    this.halfmove = cap ? 0 : this.halfmove + 1;
    if (color === BLACK) this.fullmove++;
    this.side = (color ^ 1) as Color;
    this.histLo.push(lo);
    this.histHi.push(hi);
    if (this.kingSq[color ^ 1] < 0 || this.inCheck(color)) {
      this.unmake();
      return false;
    }
    return true;
  }

  unmake() {
    const m = this.mvStack.pop()!;
    const cap = this.capStack.pop()!;
    this.halfmove = this.halfStack.pop()!;
    const from = m & 127,
      to = (m >> 7) & 127;
    const b = this.board;
    const p = b[to];
    b[from] = p;
    b[to] = cap;
    this.side = (this.side ^ 1) as Color;
    if ((p & 7) === KING) this.kingSq[this.side] = from;
    if ((cap & 7) === KING) this.kingSq[this.side ^ 1] = to;
    if (this.side === BLACK) this.fullmove--;
    this.histLo.pop();
    this.histHi.pop();
    this.hashLo = this.histLo[this.histLo.length - 1];
    this.hashHi = this.histHi[this.histHi.length - 1];
  }

  /** "Bỏ lượt" – dùng cho cắt tỉa nước đi rỗng và phát hiện đe dọa */
  makeNull() {
    this.mvStack.push(0);
    this.capStack.push(0);
    this.halfStack.push(this.halfmove);
    this.side = (this.side ^ 1) as Color;
    this.hashLo ^= Z_SIDE_LO;
    this.hashHi ^= Z_SIDE_HI;
    this.histLo.push(this.hashLo);
    this.histHi.push(this.hashHi);
  }

  unmakeNull() {
    this.mvStack.pop();
    this.capStack.pop();
    this.halfmove = this.halfStack.pop()!;
    this.side = (this.side ^ 1) as Color;
    this.histLo.pop();
    this.histHi.pop();
    this.hashLo = this.histLo[this.histLo.length - 1];
    this.hashHi = this.histHi[this.histHi.length - 1];
  }

  /** Số nước đã đi kể từ lúc nạp FEN */
  get plyCount(): number {
    return this.mvStack.length;
  }

  lastMove(): number {
    return this.mvStack[this.mvStack.length - 1] ?? 0;
  }

  lastCaptured(): number {
    return this.capStack[this.capStack.length - 1] ?? 0;
  }

  legalMoves(): number[] {
    const buf: number[] = [];
    const n = this.generate(buf);
    const res: number[] = [];
    for (let i = 0; i < n; i++) {
      if (this.make(buf[i])) {
        this.unmake();
        res.push(buf[i]);
      }
    }
    return res;
  }

  hasLegalMove(): boolean {
    const buf: number[] = [];
    const n = this.generate(buf);
    for (let i = 0; i < n; i++) {
      if (this.make(buf[i])) {
        this.unmake();
        return true;
      }
    }
    return false;
  }

  /** Số lần thế cờ hiện tại đã xuất hiện (tính cả lần này) */
  repetitionCount(): number {
    const n = this.histLo.length - 1;
    const lo = this.hashLo,
      hi = this.hashHi;
    let count = 1;
    const limit = Math.max(0, n - this.halfmove);
    for (let k = n - 2; k >= limit; k -= 2) if (this.histLo[k] === lo && this.histHi[k] === hi) count++;
    return count;
  }

  /**
   * Lặp lại thế cờ lần thứ ba: xét các nước trong vòng lặp. Bên nào chiếu ở MỌI nước của mình (còn bên kia thì không)
   * là bên "chiếu dai" và bị xử thua; ngược lại xử hòa.
   */
  repetitionInfo(): { count: number; offender: Color | null } {
    const n = this.histLo.length - 1;
    const occ: number[] = [n];
    const limit = Math.max(0, n - Math.min(this.halfmove, this.mvStack.length));
    for (let k = n - 2; k >= limit; k -= 2) if (this.histLo[k] === this.hashLo && this.histHi[k] === this.hashHi) occ.push(k);
    if (occ.length < 3) return { count: occ.length, offender: null };
    const span = n - occ[2];
    const checks: boolean[] = [];
    const undone: number[] = [];
    for (let i = 0; i < span; i++) {
      checks.push(this.inCheck());
      undone.push(this.mvStack[this.mvStack.length - 1]);
      this.unmake();
    }
    for (let i = undone.length - 1; i >= 0; i--) this.make(undone[i]);
    let lastAll = true,
      otherAll = true;
    checks.forEach((c, i) => {
      if (i % 2 === 0) lastAll &&= c;
      else otherAll &&= c;
    });
    const last = (this.side ^ 1) as Color; // bên vừa đi nước cuối
    let offender: Color | null = null;
    if (lastAll && !otherAll) offender = last;
    else if (otherAll && !lastAll) offender = (last ^ 1) as Color;
    return { count: occ.length, offender };
  }

  /** Không bên nào còn quân tấn công được (Xe, Mã, Pháo, Tốt) – hòa */
  insufficientMaterial(): boolean {
    for (let sq = 0; sq < 90; sq++) {
      const t = this.board[sq] & 7;
      if (t === ROOK || t === HORSE || t === CANNON || t === PAWN) return false;
    }
    return true;
  }

  status(): GameStatus {
    if (!this.hasLegalMove()) {
      const winner = this.side ^ 1;
      return { over: true, result: winner === RED ? '1-0' : '0-1', reason: this.inCheck() ? 'checkmate' : 'stalemate' };
    }
    if (this.repetitionCount() >= 3) {
      const r = this.repetitionInfo();
      if (r.count >= 3) {
        if (r.offender !== null) return { over: true, result: r.offender === RED ? '0-1' : '1-0', reason: 'perpetual' };
        return { over: true, result: '1/2-1/2', reason: 'repetition' };
      }
    }
    if (this.halfmove >= MOVE_LIMIT) return { over: true, result: '1/2-1/2', reason: 'moveLimit' };
    if (this.insufficientMaterial()) return { over: true, result: '1/2-1/2', reason: 'insufficient' };
    return { over: false };
  }

  // -------------------------------------------------------------------------------------------
  // Ký hiệu nước đi
  // -------------------------------------------------------------------------------------------
  moveToUci(m: number): string {
    return sqName(m & 127) + sqName((m >> 7) & 127);
  }

  /** Nước đi hợp lệ từ chuỗi tọa độ "h2e2" (0 nếu không hợp lệ) */
  moveFromUci(uci: string): number {
    const from = parseSq(uci.slice(0, 2));
    const to = parseSq(uci.slice(2, 4));
    if (from < 0 || to < 0) return 0;
    const m = encodeMove(from, to);
    const p = this.board[from];
    if (!p || pieceColor(p) !== this.side) return 0;
    const buf: number[] = [];
    const n = this.generate(buf);
    for (let i = 0; i < n; i++) {
      if (buf[i] === m) {
        if (!this.make(m)) return 0;
        this.unmake();
        return m;
      }
    }
    return 0;
  }

  /** Quân cùng loại, cùng màu trên cùng cột, sắp từ trước ra sau (theo hướng tiến của bên đó) */
  private stackOnFile(p: number, x: number): number[] {
    const res: number[] = [];
    for (let y = 0; y < 10; y++) if (this.board[makeSq(x, y)] === p) res.push(makeSq(x, y));
    return pieceColor(p) === RED ? res.reverse() : res;
  }

  /** Ký hiệu chỉ quân: số cột, hoặc t (trước) / s (sau) / g (giữa) khi nhiều quân cùng loại trên một cột */
  private designator(from: number, plain: boolean): string {
    const p = this.board[from];
    const t = p & 7;
    const color = pieceColor(p);
    const x = from % 9;
    const fileStr = String(fileNumber(x, color));
    if (plain || t === ADVISOR || t === ELEPHANT || t === KING) return fileStr;
    const stack = this.stackOnFile(p, x);
    if (stack.length < 2) return fileStr;
    const idx = stack.indexOf(from);
    const n = stack.length;
    let mark = idx === 0 ? 't' : idx === n - 1 ? 's' : n === 3 ? 'g' : 'g' + idx;
    if (t === PAWN) {
      // nhiều cột cùng có từ 2 tốt trở lên: thêm số cột để phân biệt
      for (let ox = 0; ox < 9; ox++) if (ox !== x && this.stackOnFile(p, ox).length >= 2) return mark + fileStr;
    }
    return mark;
  }

  private notation(m: number, plain: boolean): string {
    const from = m & 127,
      to = (m >> 7) & 127;
    const p = this.board[from];
    const t = p & 7;
    const color = pieceColor(p);
    const fy = (from / 9) | 0,
      ty = (to / 9) | 0;
    const tx = to % 9;
    let op: string, target: number;
    if (fy === ty) {
      op = '-';
      target = fileNumber(tx, color);
    } else {
      const forward = color === RED ? ty > fy : ty < fy;
      op = forward ? '.' : '/';
      target = t === ADVISOR || t === ELEPHANT || t === HORSE ? fileNumber(tx, color) : Math.abs(ty - fy);
    }
    return PIECE_LETTER[t] + this.designator(from, plain) + op + target;
  }

  /** Ký hiệu kiểu Việt Nam: P2-5 (bình), M8.7 (tấn), X1/1 (thoái), Xt.3 (Xe trước) */
  moveToSan(m: number, _legal?: number[]): string {
    return this.notation(m, false);
  }

  /** Đọc nước đi: ký hiệu Việt Nam, chữ Hán (炮二平五, 马8进7) hoặc tọa độ (h2e2). Trả về 0 nếu không hợp lệ. */
  sanToMove(input: string): number {
    let s = input.trim().replace(/[!?#+]+$/g, '').replace(/[–—]/g, '-').replace(/\s+/g, '');
    if (!s) return 0;
    const iccs = /^([a-i])(\d)-?([a-i])(\d)$/i.exec(s);
    if (iccs) return this.moveFromUci((iccs[1] + iccs[2] + iccs[3] + iccs[4]).toLowerCase());
    if (/[㐀-鿿]/.test(s)) {
      const v = chineseToViet(s);
      if (!v) return 0;
      s = v;
    }
    const legal = this.legalMoves();
    for (const m of legal) if (this.notation(m, false) === s) return m;
    const plain = legal.filter((m) => this.notation(m, true) === s);
    return plain.length === 1 ? plain[0] : 0;
  }
}

// ---------------------------------------------------------------------------------------------
// Ký hiệu chữ Hán → ký hiệu Việt Nam
// ---------------------------------------------------------------------------------------------
const CN_PIECE: Record<string, string> = {
  车: 'X', 車: 'X', 俥: 'X', 马: 'M', 馬: 'M', 傌: 'M', 炮: 'P', 砲: 'P', 包: 'P',
  相: 'T', 象: 'T', 仕: 'S', 士: 'S', 帅: 'Tg', 帥: 'Tg', 将: 'Tg', 將: 'Tg', 兵: 'B', 卒: 'B',
};
const CN_NUM: Record<string, string> = {
  一: '1', 二: '2', 三: '3', 四: '4', 五: '5', 六: '6', 七: '7', 八: '8', 九: '9',
  '１': '1', '２': '2', '３': '3', '４': '4', '５': '5', '６': '6', '７': '7', '８': '8', '９': '9',
};
const CN_OP: Record<string, string> = { 进: '.', 進: '.', 退: '/', 平: '-' };
const CN_MARK: Record<string, string> = { 前: 't', 后: 's', 後: 's', 中: 'g' };

function chineseToViet(s: string): string | null {
  const ch = [...s].map((c) => CN_NUM[c] ?? c);
  if (ch.length !== 4) return null;
  const op = CN_OP[ch[2]];
  if (!op || !/^\d$/.test(ch[3])) return null;
  if (CN_MARK[ch[0]] && CN_PIECE[ch[1]]) return CN_PIECE[ch[1]] + CN_MARK[ch[0]] + op + ch[3];
  if (CN_PIECE[ch[0]] && /^\d$/.test(ch[1])) return CN_PIECE[ch[0]] + ch[1] + op + ch[3];
  return null;
}

// ---------------------------------------------------------------------------------------------
// Chuỗi nước đi
// ---------------------------------------------------------------------------------------------
/** Tách chuỗi nước đi thành từng nước, bỏ số thứ tự ("1." "12...") và kết quả ván */
export function splitMoves(text: string): string[] {
  return text
    .replace(/\{[^}]*\}/g, ' ')
    .split(/\s+/)
    .map((t) => t.replace(/^\d+\.(\.\.)?(?=[A-Za-z㐀-鿿])/, ''))
    .filter((t) => t && !/^\d+\.+$/.test(t) && !/^(1-0|0-1|1\/2-1\/2|\*)$/.test(t));
}

export interface PlayedLine {
  fens: string[];
  sans: string[];
  ucis: string[];
}

/** Đi lần lượt các nước (ký hiệu Việt Nam/chữ Hán/tọa độ) từ thế `fen`. Ném lỗi ở nước không hợp lệ đầu tiên. */
export function playLine(moves: string[] | string, fen: string = START_FEN): PlayedLine {
  const list = typeof moves === 'string' ? splitMoves(moves) : moves;
  const pos = new Position(fen);
  const res: PlayedLine = { fens: [pos.fen()], sans: [], ucis: [] };
  list.forEach((tok, i) => {
    const m = pos.sanToMove(tok);
    if (!m) throw new Error(`Nước đi không hợp lệ "${tok}" (nửa nước thứ ${i + 1}, ${pos.side === RED ? 'Đỏ' : 'Đen'} đi) tại thế ${pos.fen()}`);
    res.sans.push(pos.moveToSan(m));
    res.ucis.push(pos.moveToUci(m));
    pos.make(m);
    res.fens.push(pos.fen());
  });
  return res;
}

/** Giá trị quân (centipawn, Tốt chưa qua sông = 100) – dùng cho mô tả và trao đổi quân */
export const PIECE_VALUE = [0, 10000, 200, 200, 400, 900, 450, 100];

/** Giá trị quân theo "điểm" quen thuộc của người chơi: Xe 9, Pháo 4,5, Mã 4, Sĩ/Tượng 2, Tốt 1 (qua sông 2) */
export function pieceValueAt(p: number, sq: number): number {
  const t = p & 7;
  if (t === PAWN) return crossedRiver((sq / 9) | 0, pieceColor(p)) ? 200 : 100;
  return PIECE_VALUE[t];
}
