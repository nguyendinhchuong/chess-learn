// Lõi luật cờ vua: biểu diễn bàn cờ 0x88, sinh nước đi, đi/hoàn tác, FEN, ký hiệu SAN, băm Zobrist.

export const WHITE = 0;
export const BLACK = 1;
export type Color = 0 | 1;

export const PAWN = 1;
export const KNIGHT = 2;
export const BISHOP = 3;
export const ROOK = 4;
export const QUEEN = 5;
export const KING = 6;

export const EMPTY = 0;

export const pieceType = (p: number) => p & 7;
export const pieceColor = (p: number): Color => ((p >> 3) & 1) as Color;
export const makePiece = (type: number, color: number) => type | (color << 3);

// Cờ hiệu nước đi
export const F_CAPTURE = 1;
export const F_EP = 2;
export const F_CASTLE = 4;
export const F_DOUBLE = 8;
export const F_PROMO = 16;

export const moveFrom = (m: number) => m & 127;
export const moveTo = (m: number) => (m >> 7) & 127;
export const movePromo = (m: number) => (m >> 14) & 7;
export const moveFlags = (m: number) => (m >> 17) & 31;
export const encodeMove = (from: number, to: number, promo: number, flags: number) =>
  from | (to << 7) | (promo << 14) | (flags << 17);

export const sqFile = (sq: number) => sq & 7;
export const sqRank = (sq: number) => sq >> 4;
export const sqName = (sq: number) => 'abcdefgh'[sq & 7] + String((sq >> 4) + 1);
export const parseSq = (s: string) => {
  const f = s.charCodeAt(0) - 97;
  const r = s.charCodeAt(1) - 49;
  if (f < 0 || f > 7 || r < 0 || r > 7) return -1;
  return (r << 4) | f;
};
/** Chỉ số 0..63 (a1=0, h8=63) */
export const sq64 = (sq: number) => ((sq >> 4) << 3) | (sq & 7);
export const sq128 = (i: number) => ((i >> 3) << 4) | (i & 7);

export const START_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

const KNIGHT_OFFSETS = [-33, -31, -18, -14, 14, 18, 31, 33];
const KING_OFFSETS = [-17, -16, -15, -1, 1, 15, 16, 17];
const BISHOP_OFFSETS = [-17, -15, 15, 17];
const ROOK_OFFSETS = [-16, -1, 1, 16];

const PIECE_CHARS = ' pnbrqk';

// Mặt nạ quyền nhập thành: 1 = trắng cánh vua, 2 = trắng cánh hậu, 4 = đen cánh vua, 8 = đen cánh hậu
const CASTLE_MASK = new Uint8Array(128).fill(15);
CASTLE_MASK[0x00] = 15 & ~2; // a1
CASTLE_MASK[0x07] = 15 & ~1; // h1
CASTLE_MASK[0x04] = 15 & ~3; // e1
CASTLE_MASK[0x70] = 15 & ~8; // a8
CASTLE_MASK[0x77] = 15 & ~4; // h8
CASTLE_MASK[0x74] = 15 & ~12; // e8

// ---- Zobrist (hai khóa 32-bit để giảm va chạm) ----
let seed = 0x9e3779b9 | 0;
function rand32() {
  seed ^= seed << 13;
  seed ^= seed >>> 17;
  seed ^= seed << 5;
  return seed | 0;
}
const Z_PIECE_LO = new Int32Array(16 * 128);
const Z_PIECE_HI = new Int32Array(16 * 128);
for (let i = 0; i < 16 * 128; i++) {
  Z_PIECE_LO[i] = rand32();
  Z_PIECE_HI[i] = rand32();
}
const Z_CASTLE_LO = new Int32Array(16);
const Z_CASTLE_HI = new Int32Array(16);
for (let i = 0; i < 16; i++) {
  Z_CASTLE_LO[i] = rand32();
  Z_CASTLE_HI[i] = rand32();
}
const Z_EP_LO = new Int32Array(8);
const Z_EP_HI = new Int32Array(8);
for (let i = 0; i < 8; i++) {
  Z_EP_LO[i] = rand32();
  Z_EP_HI[i] = rand32();
}
const Z_SIDE_LO = rand32();
const Z_SIDE_HI = rand32();

const MAX_HISTORY = 1024;

export class Position {
  board = new Int8Array(128);
  side: Color = WHITE;
  castling = 0;
  ep = -1;
  halfmove = 0;
  fullmove = 1;
  kingSq = [0, 0];
  hashLo = 0;
  hashHi = 0;

  // Ngăn xếp hoàn tác
  private uMove = new Int32Array(MAX_HISTORY);
  private uCaptured = new Int8Array(MAX_HISTORY);
  private uCastling = new Int8Array(MAX_HISTORY);
  private uEp = new Int16Array(MAX_HISTORY);
  private uHalf = new Int16Array(MAX_HISTORY);
  /** Lịch sử băm (bao gồm vị trí hiện tại ở chỉ số ply) để phát hiện lặp lại */
  hLo = new Int32Array(MAX_HISTORY + 1);
  hHi = new Int32Array(MAX_HISTORY + 1);
  ply = 0;

  constructor(fen: string = START_FEN) {
    this.load(fen);
  }

  clone(): Position {
    const p = new Position(this.fen());
    // giữ lịch sử băm để vẫn phát hiện được lặp lại
    const n = this.ply;
    p.hLo.set(this.hLo.subarray(0, n + 1));
    p.hHi.set(this.hHi.subarray(0, n + 1));
    p.uHalf.set(this.uHalf.subarray(0, n));
    p.ply = n;
    // các phần tử ngăn xếp hoàn tác không được sao chép: bản sao không thể hoàn tác quá vị trí hiện tại
    p.baseNoUndo = n;
    return p;
  }
  /** Không cho phép hoàn tác thấp hơn ply này (bản sao) */
  baseNoUndo = 0;

  load(fen: string) {
    const parts = fen.trim().split(/\s+/);
    if (parts.length < 4) throw new Error('FEN không hợp lệ: ' + fen);
    this.board.fill(0);
    let r = 7,
      f = 0;
    for (const ch of parts[0]) {
      if (ch === '/') {
        r--;
        f = 0;
        continue;
      }
      if (ch >= '1' && ch <= '8') {
        f += Number(ch);
        continue;
      }
      const lower = ch.toLowerCase();
      const t = PIECE_CHARS.indexOf(lower);
      if (t <= 0 || f > 7 || r < 0) throw new Error('FEN không hợp lệ: ' + fen);
      const color = ch === lower ? BLACK : WHITE;
      const sq = (r << 4) | f;
      this.board[sq] = makePiece(t, color);
      if (t === KING) this.kingSq[color] = sq;
      f++;
    }
    this.side = parts[1] === 'b' ? BLACK : WHITE;
    this.castling = 0;
    if (parts[2] !== '-') {
      for (const c of parts[2]) {
        if (c === 'K') this.castling |= 1;
        else if (c === 'Q') this.castling |= 2;
        else if (c === 'k') this.castling |= 4;
        else if (c === 'q') this.castling |= 8;
      }
    }
    // loại quyền nhập thành không còn hợp lệ
    const b = this.board;
    if (b[0x04] !== makePiece(KING, WHITE)) this.castling &= ~3;
    if (b[0x07] !== makePiece(ROOK, WHITE)) this.castling &= ~1;
    if (b[0x00] !== makePiece(ROOK, WHITE)) this.castling &= ~2;
    if (b[0x74] !== makePiece(KING, BLACK)) this.castling &= ~12;
    if (b[0x77] !== makePiece(ROOK, BLACK)) this.castling &= ~4;
    if (b[0x70] !== makePiece(ROOK, BLACK)) this.castling &= ~8;
    this.ep = parts[3] === '-' ? -1 : parseSq(parts[3]);
    if (this.ep >= 0 && !this.epCapturable(this.ep)) this.ep = -1;
    this.halfmove = parts[4] ? parseInt(parts[4], 10) || 0 : 0;
    this.fullmove = parts[5] ? parseInt(parts[5], 10) || 1 : 1;
    this.ply = 0;
    this.baseNoUndo = 0;
    this.computeHash();
    this.hLo[0] = this.hashLo;
    this.hHi[0] = this.hashHi;
  }

  /** Có tốt của bên đi có thể bắt qua đường vào ô ep không */
  private epCapturable(ep: number) {
    const us = this.side;
    const pawn = makePiece(PAWN, us);
    const from1 = us === WHITE ? ep - 15 : ep + 15;
    const from2 = us === WHITE ? ep - 17 : ep + 17;
    return (!(from1 & 0x88) && this.board[from1] === pawn) || (!(from2 & 0x88) && this.board[from2] === pawn);
  }

  computeHash() {
    let lo = 0,
      hi = 0;
    for (let sq = 0; sq < 128; sq++) {
      if (sq & 0x88) {
        sq += 7;
        continue;
      }
      const p = this.board[sq];
      if (p) {
        lo ^= Z_PIECE_LO[(p << 7) | sq];
        hi ^= Z_PIECE_HI[(p << 7) | sq];
      }
    }
    lo ^= Z_CASTLE_LO[this.castling];
    hi ^= Z_CASTLE_HI[this.castling];
    if (this.ep >= 0) {
      lo ^= Z_EP_LO[this.ep & 7];
      hi ^= Z_EP_HI[this.ep & 7];
    }
    if (this.side === BLACK) {
      lo ^= Z_SIDE_LO;
      hi ^= Z_SIDE_HI;
    }
    this.hashLo = lo;
    this.hashHi = hi;
  }

  fen(): string {
    let s = '';
    for (let r = 7; r >= 0; r--) {
      let empty = 0;
      for (let f = 0; f < 8; f++) {
        const p = this.board[(r << 4) | f];
        if (!p) {
          empty++;
          continue;
        }
        if (empty) {
          s += empty;
          empty = 0;
        }
        const c = PIECE_CHARS[pieceType(p)];
        s += pieceColor(p) === WHITE ? c.toUpperCase() : c;
      }
      if (empty) s += empty;
      if (r > 0) s += '/';
    }
    let cs = '';
    if (this.castling & 1) cs += 'K';
    if (this.castling & 2) cs += 'Q';
    if (this.castling & 4) cs += 'k';
    if (this.castling & 8) cs += 'q';
    return `${s} ${this.side === WHITE ? 'w' : 'b'} ${cs || '-'} ${this.ep >= 0 ? sqName(this.ep) : '-'} ${this.halfmove} ${this.fullmove}`;
  }

  /** Khóa vị trí (4 trường đầu FEN) dùng cho sách khai cuộc */
  key(): string {
    return this.fen().split(' ').slice(0, 4).join(' ');
  }

  // ---------------- Tấn công ----------------
  isAttacked(sq: number, by: Color): boolean {
    const b = this.board;
    // tốt
    if (by === WHITE) {
      let s = sq - 15;
      if (!(s & 0x88) && b[s] === PAWN) return true;
      s = sq - 17;
      if (!(s & 0x88) && b[s] === PAWN) return true;
    } else {
      let s = sq + 15;
      if (!(s & 0x88) && b[s] === (PAWN | 8)) return true;
      s = sq + 17;
      if (!(s & 0x88) && b[s] === (PAWN | 8)) return true;
    }
    const c8 = by << 3;
    const kn = KNIGHT | c8,
      ki = KING | c8,
      bi = BISHOP | c8,
      ro = ROOK | c8,
      qu = QUEEN | c8;
    for (let i = 0; i < 8; i++) {
      const s = sq + KNIGHT_OFFSETS[i];
      if (!(s & 0x88) && b[s] === kn) return true;
    }
    for (let i = 0; i < 8; i++) {
      const s = sq + KING_OFFSETS[i];
      if (!(s & 0x88) && b[s] === ki) return true;
    }
    for (let i = 0; i < 4; i++) {
      const d = BISHOP_OFFSETS[i];
      let s = sq + d;
      while (!(s & 0x88)) {
        const p = b[s];
        if (p) {
          if (p === bi || p === qu) return true;
          break;
        }
        s += d;
      }
    }
    for (let i = 0; i < 4; i++) {
      const d = ROOK_OFFSETS[i];
      let s = sq + d;
      while (!(s & 0x88)) {
        const p = b[s];
        if (p) {
          if (p === ro || p === qu) return true;
          break;
        }
        s += d;
      }
    }
    return false;
  }

  /** Danh sách ô (0x88) của các quân màu `by` đang tấn công ô `sq` */
  attackers(sq: number, by: Color): number[] {
    const res: number[] = [];
    const b = this.board;
    const c8 = by << 3;
    const pd = by === WHITE ? [-15, -17] : [15, 17];
    for (const d of pd) {
      const s = sq + d;
      if (!(s & 0x88) && b[s] === (PAWN | c8)) res.push(s);
    }
    for (const d of KNIGHT_OFFSETS) {
      const s = sq + d;
      if (!(s & 0x88) && b[s] === (KNIGHT | c8)) res.push(s);
    }
    for (const d of KING_OFFSETS) {
      const s = sq + d;
      if (!(s & 0x88) && b[s] === (KING | c8)) res.push(s);
    }
    for (const d of BISHOP_OFFSETS) {
      let s = sq + d;
      while (!(s & 0x88)) {
        const p = b[s];
        if (p) {
          if (p === (BISHOP | c8) || p === (QUEEN | c8)) res.push(s);
          break;
        }
        s += d;
      }
    }
    for (const d of ROOK_OFFSETS) {
      let s = sq + d;
      while (!(s & 0x88)) {
        const p = b[s];
        if (p) {
          if (p === (ROOK | c8) || p === (QUEEN | c8)) res.push(s);
          break;
        }
        s += d;
      }
    }
    return res;
  }

  /** Các ô mà quân ở `sq` đang tấn công (không xét chiếu) */
  attacksFrom(sq: number): number[] {
    const p = this.board[sq];
    if (!p) return [];
    const t = pieceType(p);
    const c = pieceColor(p);
    const b = this.board;
    const res: number[] = [];
    if (t === PAWN) {
      for (const d of c === WHITE ? [15, 17] : [-15, -17]) {
        const s = sq + d;
        if (!(s & 0x88)) res.push(s);
      }
    } else if (t === KNIGHT || t === KING) {
      for (const d of t === KNIGHT ? KNIGHT_OFFSETS : KING_OFFSETS) {
        const s = sq + d;
        if (!(s & 0x88)) res.push(s);
      }
    } else {
      const dirs = t === BISHOP ? BISHOP_OFFSETS : t === ROOK ? ROOK_OFFSETS : KING_OFFSETS;
      for (const d of dirs) {
        let s = sq + d;
        while (!(s & 0x88)) {
          res.push(s);
          if (b[s]) break;
          s += d;
        }
      }
    }
    return res;
  }

  inCheck(color: Color = this.side): boolean {
    return this.isAttacked(this.kingSq[color], (color ^ 1) as Color);
  }

  // ---------------- Sinh nước đi ----------------
  /** Sinh nước đi giả hợp lệ vào `out` bắt đầu ở `start`, trả về số phần tử sau cùng. */
  generate(out: Int32Array | number[], start = 0, capturesOnly = false): number {
    const b = this.board;
    const us = this.side;
    const them = us ^ 1;
    let n = start;
    const forward = us === WHITE ? 16 : -16;
    const startRank = us === WHITE ? 1 : 6;
    const promoRank = us === WHITE ? 7 : 0;

    for (let sq = 0; sq < 128; sq++) {
      if (sq & 0x88) {
        sq += 7;
        continue;
      }
      const p = b[sq];
      if (!p || pieceColor(p) !== us) continue;
      const t = p & 7;
      if (t === PAWN) {
        const to = sq + forward;
        // tiến
        if (!(to & 0x88) && !b[to]) {
          if (sqRank(to) === promoRank) {
            for (let pr = QUEEN; pr >= KNIGHT; pr--) out[n++] = encodeMove(sq, to, pr, F_PROMO);
          } else if (!capturesOnly) {
            out[n++] = encodeMove(sq, to, 0, 0);
            if (sqRank(sq) === startRank) {
              const to2 = to + forward;
              if (!b[to2]) out[n++] = encodeMove(sq, to2, 0, F_DOUBLE);
            }
          }
        }
        // ăn chéo
        for (let k = 0; k < 2; k++) {
          const cap = to + (k === 0 ? -1 : 1);
          if (cap & 0x88) continue;
          const q = b[cap];
          if (q && pieceColor(q) === them) {
            if (sqRank(cap) === promoRank) {
              for (let pr = QUEEN; pr >= KNIGHT; pr--) out[n++] = encodeMove(sq, cap, pr, F_PROMO | F_CAPTURE);
            } else out[n++] = encodeMove(sq, cap, 0, F_CAPTURE);
          } else if (cap === this.ep) {
            out[n++] = encodeMove(sq, cap, 0, F_CAPTURE | F_EP);
          }
        }
      } else if (t === KNIGHT || t === KING) {
        const offs = t === KNIGHT ? KNIGHT_OFFSETS : KING_OFFSETS;
        for (let i = 0; i < 8; i++) {
          const to = sq + offs[i];
          if (to & 0x88) continue;
          const q = b[to];
          if (!q) {
            if (!capturesOnly) out[n++] = encodeMove(sq, to, 0, 0);
          } else if (pieceColor(q) === them) out[n++] = encodeMove(sq, to, 0, F_CAPTURE);
        }
      } else {
        const dirs = t === BISHOP ? BISHOP_OFFSETS : t === ROOK ? ROOK_OFFSETS : KING_OFFSETS;
        const nd = dirs.length;
        for (let i = 0; i < nd; i++) {
          const d = dirs[i];
          let to = sq + d;
          while (!(to & 0x88)) {
            const q = b[to];
            if (!q) {
              if (!capturesOnly) out[n++] = encodeMove(sq, to, 0, 0);
            } else {
              if (pieceColor(q) === them) out[n++] = encodeMove(sq, to, 0, F_CAPTURE);
              break;
            }
            to += d;
          }
        }
      }
    }

    // nhập thành
    if (!capturesOnly && this.castling) {
      if (us === WHITE) {
        if (this.castling & 1 && !b[0x05] && !b[0x06] && !this.isAttacked(0x04, BLACK) && !this.isAttacked(0x05, BLACK) && !this.isAttacked(0x06, BLACK))
          out[n++] = encodeMove(0x04, 0x06, 0, F_CASTLE);
        if (this.castling & 2 && !b[0x03] && !b[0x02] && !b[0x01] && !this.isAttacked(0x04, BLACK) && !this.isAttacked(0x03, BLACK) && !this.isAttacked(0x02, BLACK))
          out[n++] = encodeMove(0x04, 0x02, 0, F_CASTLE);
      } else {
        if (this.castling & 4 && !b[0x75] && !b[0x76] && !this.isAttacked(0x74, WHITE) && !this.isAttacked(0x75, WHITE) && !this.isAttacked(0x76, WHITE))
          out[n++] = encodeMove(0x74, 0x76, 0, F_CASTLE);
        if (this.castling & 8 && !b[0x73] && !b[0x72] && !b[0x71] && !this.isAttacked(0x74, WHITE) && !this.isAttacked(0x73, WHITE) && !this.isAttacked(0x72, WHITE))
          out[n++] = encodeMove(0x74, 0x72, 0, F_CASTLE);
      }
    }
    return n;
  }

  // ---------------- Đi / hoàn tác ----------------
  /** Thực hiện nước đi; trả về false (và tự hoàn tác) nếu nước đi để Vua bị chiếu. */
  make(m: number): boolean {
    const b = this.board;
    const from = m & 127;
    const to = (m >> 7) & 127;
    const flags = (m >> 17) & 31;
    const us = this.side;
    const them = (us ^ 1) as Color;
    const piece = b[from];
    const ply = this.ply;

    this.uMove[ply] = m;
    this.uCastling[ply] = this.castling;
    this.uEp[ply] = this.ep;
    this.uHalf[ply] = this.halfmove;

    let lo = this.hashLo,
      hi = this.hashHi;
    // xóa ep & nhập thành cũ khỏi băm
    if (this.ep >= 0) {
      lo ^= Z_EP_LO[this.ep & 7];
      hi ^= Z_EP_HI[this.ep & 7];
    }
    lo ^= Z_CASTLE_LO[this.castling];
    hi ^= Z_CASTLE_HI[this.castling];

    let captured = 0;
    if (flags & F_EP) {
      const capSq = us === WHITE ? to - 16 : to + 16;
      captured = b[capSq];
      b[capSq] = 0;
      lo ^= Z_PIECE_LO[(captured << 7) | capSq];
      hi ^= Z_PIECE_HI[(captured << 7) | capSq];
    } else if (b[to]) {
      captured = b[to];
      lo ^= Z_PIECE_LO[(captured << 7) | to];
      hi ^= Z_PIECE_HI[(captured << 7) | to];
    }
    this.uCaptured[ply] = captured;

    // di chuyển quân
    lo ^= Z_PIECE_LO[(piece << 7) | from];
    hi ^= Z_PIECE_HI[(piece << 7) | from];
    b[from] = 0;
    const promo = (m >> 14) & 7;
    const placed = promo ? makePiece(promo, us) : piece;
    b[to] = placed;
    lo ^= Z_PIECE_LO[(placed << 7) | to];
    hi ^= Z_PIECE_HI[(placed << 7) | to];

    if ((piece & 7) === KING) {
      this.kingSq[us] = to;
      if (flags & F_CASTLE) {
        let rf: number, rt: number;
        if (to === from + 2) {
          rf = from + 3;
          rt = from + 1;
        } else {
          rf = from - 4;
          rt = from - 1;
        }
        const rook = b[rf];
        b[rf] = 0;
        b[rt] = rook;
        lo ^= Z_PIECE_LO[(rook << 7) | rf] ^ Z_PIECE_LO[(rook << 7) | rt];
        hi ^= Z_PIECE_HI[(rook << 7) | rf] ^ Z_PIECE_HI[(rook << 7) | rt];
      }
    }

    this.castling &= CASTLE_MASK[from] & CASTLE_MASK[to];
    lo ^= Z_CASTLE_LO[this.castling];
    hi ^= Z_CASTLE_HI[this.castling];

    this.ep = -1;
    if (flags & F_DOUBLE) {
      const epSq = (from + to) >> 1;
      // chỉ đặt ô ep khi đối phương thực sự có tốt có thể bắt
      const enemyPawn = makePiece(PAWN, them);
      if ((!((to - 1) & 0x88) && b[to - 1] === enemyPawn) || (!((to + 1) & 0x88) && b[to + 1] === enemyPawn)) {
        this.ep = epSq;
        lo ^= Z_EP_LO[epSq & 7];
        hi ^= Z_EP_HI[epSq & 7];
      }
    }

    if ((piece & 7) === PAWN || captured) this.halfmove = 0;
    else this.halfmove++;
    if (us === BLACK) this.fullmove++;

    this.side = them;
    lo ^= Z_SIDE_LO;
    hi ^= Z_SIDE_HI;
    this.hashLo = lo;
    this.hashHi = hi;
    this.ply = ply + 1;
    this.hLo[this.ply] = lo;
    this.hHi[this.ply] = hi;

    if (this.isAttacked(this.kingSq[us], them)) {
      this.unmake();
      return false;
    }
    return true;
  }

  unmake() {
    const ply = --this.ply;
    const m = this.uMove[ply];
    const b = this.board;
    const from = m & 127;
    const to = (m >> 7) & 127;
    const flags = (m >> 17) & 31;
    const them = this.side;
    const us = (them ^ 1) as Color;
    this.side = us;
    let piece = b[to];
    if ((m >> 14) & 7) piece = makePiece(PAWN, us);
    b[from] = piece;
    b[to] = 0;
    const captured = this.uCaptured[ply];
    if (flags & F_EP) {
      const capSq = us === WHITE ? to - 16 : to + 16;
      b[capSq] = captured;
    } else if (captured) {
      b[to] = captured;
    }
    if ((piece & 7) === KING) {
      this.kingSq[us] = from;
      if (flags & F_CASTLE) {
        let rf: number, rt: number;
        if (to === from + 2) {
          rf = from + 3;
          rt = from + 1;
        } else {
          rf = from - 4;
          rt = from - 1;
        }
        b[rf] = b[rt];
        b[rt] = 0;
      }
    }
    this.castling = this.uCastling[ply];
    this.ep = this.uEp[ply];
    this.halfmove = this.uHalf[ply];
    if (us === BLACK) this.fullmove--;
    this.hashLo = this.hLo[ply];
    this.hashHi = this.hHi[ply];
  }

  /** Nước đi "rỗng" (bỏ lượt) dùng cho cắt tỉa nước đi rỗng và phát hiện đe dọa */
  makeNull() {
    const ply = this.ply;
    this.uMove[ply] = 0;
    this.uCastling[ply] = this.castling;
    this.uEp[ply] = this.ep;
    this.uHalf[ply] = this.halfmove;
    this.uCaptured[ply] = 0;
    let lo = this.hashLo,
      hi = this.hashHi;
    if (this.ep >= 0) {
      lo ^= Z_EP_LO[this.ep & 7];
      hi ^= Z_EP_HI[this.ep & 7];
    }
    this.ep = -1;
    this.halfmove++;
    lo ^= Z_SIDE_LO;
    hi ^= Z_SIDE_HI;
    this.side = (this.side ^ 1) as Color;
    this.hashLo = lo;
    this.hashHi = hi;
    this.ply = ply + 1;
    this.hLo[this.ply] = lo;
    this.hHi[this.ply] = hi;
  }

  unmakeNull() {
    const ply = --this.ply;
    this.side = (this.side ^ 1) as Color;
    this.castling = this.uCastling[ply];
    this.ep = this.uEp[ply];
    this.halfmove = this.uHalf[ply];
    this.hashLo = this.hLo[ply];
    this.hashHi = this.hHi[ply];
  }

  /** Nước đi cuối cùng đã thực hiện (0 nếu không có) */
  lastMove(): number {
    return this.ply > this.baseNoUndo ? this.uMove[this.ply - 1] : 0;
  }
  lastCaptured(): number {
    return this.ply > this.baseNoUndo ? this.uCaptured[this.ply - 1] : 0;
  }

  // ---------------- Tiện ích hợp lệ ----------------
  legalMoves(): number[] {
    const buf: number[] = [];
    const n = this.generate(buf, 0, false);
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
    const n = this.generate(buf, 0, false);
    for (let i = 0; i < n; i++) {
      if (this.make(buf[i])) {
        this.unmake();
        return true;
      }
    }
    return false;
  }

  /** Số lần vị trí hiện tại đã xuất hiện (tính cả hiện tại) trong phạm vi luật 50 nước */
  repetitionCount(): number {
    let count = 1;
    const lo = this.hashLo,
      hi = this.hashHi;
    const limit = Math.max(0, this.ply - this.halfmove);
    for (let i = this.ply - 2; i >= limit; i -= 2) {
      if (this.hLo[i] === lo && this.hHi[i] === hi) count++;
    }
    return count;
  }

  /** Lặp lại ít nhất một lần (dùng trong tìm kiếm) */
  isRepetition(): boolean {
    const lo = this.hashLo,
      hi = this.hashHi;
    const limit = Math.max(0, this.ply - this.halfmove);
    for (let i = this.ply - 4; i >= limit; i -= 2) {
      if (this.hLo[i] === lo && this.hHi[i] === hi) return true;
    }
    return false;
  }

  insufficientMaterial(): boolean {
    let minors = 0;
    const bishopsColor: number[] = [];
    for (let sq = 0; sq < 128; sq++) {
      if (sq & 0x88) {
        sq += 7;
        continue;
      }
      const p = this.board[sq];
      if (!p) continue;
      const t = p & 7;
      if (t === KING) continue;
      if (t === PAWN || t === ROOK || t === QUEEN) return false;
      minors++;
      if (t === BISHOP) bishopsColor.push(((sq >> 4) + (sq & 7)) & 1);
      else bishopsColor.push(-1);
    }
    if (minors <= 1) return true;
    // chỉ còn các Tượng cùng màu ô
    if (bishopsColor.every((c) => c === 0) || bishopsColor.every((c) => c === 1)) return true;
    return false;
  }

  status(): GameStatus {
    const hasMove = this.hasLegalMove();
    const check = this.inCheck();
    if (!hasMove) return check ? { over: true, result: this.side === WHITE ? '0-1' : '1-0', reason: 'checkmate' } : { over: true, result: '1/2-1/2', reason: 'stalemate' };
    if (this.insufficientMaterial()) return { over: true, result: '1/2-1/2', reason: 'insufficient' };
    if (this.halfmove >= 100) return { over: true, result: '1/2-1/2', reason: 'fifty' };
    if (this.repetitionCount() >= 3) return { over: true, result: '1/2-1/2', reason: 'repetition' };
    return { over: false, check };
  }

  // ---------------- Ký hiệu ----------------
  moveToUci(m: number): string {
    const promo = movePromo(m);
    return sqName(moveFrom(m)) + sqName(moveTo(m)) + (promo ? PIECE_CHARS[promo] : '');
  }

  moveFromUci(uci: string): number {
    const from = parseSq(uci.slice(0, 2));
    const to = parseSq(uci.slice(2, 4));
    const promoCh = uci[4];
    const want = promoCh ? PIECE_CHARS.indexOf(promoCh.toLowerCase()) : 0;
    for (const m of this.legalMoves()) {
      if (moveFrom(m) !== from || moveTo(m) !== to) continue;
      const pr = movePromo(m);
      if (pr === (want > 0 ? want : pr ? QUEEN : 0)) return m;
    }
    return 0;
  }

  /** Chuyển nước đi (hợp lệ) sang SAN, ví dụ Nf3, exd5, O-O, e8=Q+ */
  moveToSan(m: number, legal?: number[]): string {
    const from = moveFrom(m),
      to = moveTo(m),
      flags = moveFlags(m);
    const piece = this.board[from];
    const t = piece & 7;
    let san = '';
    if (flags & F_CASTLE) {
      san = to > from ? 'O-O' : 'O-O-O';
    } else {
      if (t === PAWN) {
        if (flags & F_CAPTURE) san = 'abcdefgh'[sqFile(from)] + 'x';
        san += sqName(to);
        const pr = movePromo(m);
        if (pr) san += '=' + PIECE_CHARS[pr].toUpperCase();
      } else {
        san = PIECE_CHARS[t].toUpperCase();
        const moves = legal ?? this.legalMoves();
        let sameFile = false,
          sameRank = false,
          ambiguous = false;
        for (const o of moves) {
          if (o === m) continue;
          if (moveTo(o) !== to) continue;
          const of = moveFrom(o);
          if (this.board[of] !== piece) continue;
          ambiguous = true;
          if (sqFile(of) === sqFile(from)) sameFile = true;
          if (sqRank(of) === sqRank(from)) sameRank = true;
        }
        if (ambiguous) {
          if (!sameFile) san += 'abcdefgh'[sqFile(from)];
          else if (!sameRank) san += String(sqRank(from) + 1);
          else san += sqName(from);
        }
        if (flags & F_CAPTURE) san += 'x';
        san += sqName(to);
      }
    }
    if (this.make(m)) {
      if (this.inCheck()) san += this.hasLegalMove() ? '+' : '#';
      this.unmake();
    }
    return san;
  }

  /** Tìm nước khớp duy nhất với SAN đã làm sạch (không +#=), 0 nếu không có hoặc mơ hồ */
  private sanFastPath(target: string): number {
    const buf: number[] = [];
    const n = this.generate(buf, 0, false);
    if (target === 'O-O' || target === 'O-O-O') {
      for (let i = 0; i < n; i++) {
        const m = buf[i];
        if (moveFlags(m) & F_CASTLE && moveTo(m) > moveFrom(m) === (target === 'O-O') && this.make(m)) {
          this.unmake();
          return m;
        }
      }
      return 0;
    }
    const mm = /^([NBRQK])?([a-h])?([1-8])?x?([a-h][1-8])([NBRQ])?$/.exec(target);
    if (!mm) return 0;
    const type = mm[1] ? PIECE_CHARS.indexOf(mm[1].toLowerCase()) : PAWN;
    const to = parseSq(mm[4]);
    const promo = mm[5] ? PIECE_CHARS.indexOf(mm[5].toLowerCase()) : 0;
    let found = 0,
      count = 0;
    for (let i = 0; i < n; i++) {
      const m = buf[i];
      if (moveTo(m) !== to || moveFlags(m) & F_CASTLE) continue;
      const from = moveFrom(m);
      if ((this.board[from] & 7) !== type) continue;
      if (mm[2] && sqFile(from) !== mm[2].charCodeAt(0) - 97) continue;
      if (mm[3] && sqRank(from) !== Number(mm[3]) - 1) continue;
      if (movePromo(m) !== promo) continue;
      if (!this.make(m)) continue;
      this.unmake();
      found = m;
      count++;
    }
    return count === 1 ? found : 0;
  }

  /** Phân tích SAN (chấp nhận cả 0-0, bỏ qua +,#,!,?) hoặc UCI. Trả về 0 nếu không hợp lệ. */
  sanToMove(input: string): number {
    const clean = (s: string) =>
      s
        .replace(/[+#!?]/g, '')
        .replace(/0/g, 'O')
        .replace(/e\.p\./, '')
        .replace(/=/g, '')
        .trim();
    const target = clean(input);
    // Đường nhanh: khớp theo mẫu SAN rồi chỉ kiểm tra tính hợp lệ của các nước ứng viên
    const fast = this.sanFastPath(target);
    if (fast) return fast;
    const legal = this.legalMoves();
    for (const m of legal) {
      if (clean(this.moveToSan(m, legal)) === target) return m;
    }
    // chấp nhận tốt phong cấp không có '=' hoặc thiếu ký hiệu bắt quân
    for (const m of legal) {
      const san = clean(this.moveToSan(m, legal));
      if (san.replace('x', '') === target.replace('x', '')) return m;
    }
    if (/^[a-h][1-8][a-h][1-8][qrbn]?$/.test(input)) return this.moveFromUci(input);
    // khoan dung: chấp nhận ký hiệu phân biệt thừa (vd "Nge7" khi Mã kia bị ghim)
    const mm = /^([NBRQK])?([a-h])?([1-8])?x?([a-h][1-8])([NBRQ])?$/.exec(target);
    if (mm) {
      const type = mm[1] ? PIECE_CHARS.indexOf(mm[1].toLowerCase()) : PAWN;
      const to = parseSq(mm[4]);
      const promo = mm[5] ? PIECE_CHARS.indexOf(mm[5].toLowerCase()) : 0;
      const cands = legal.filter(
        (m) =>
          moveTo(m) === to &&
          (this.board[moveFrom(m)] & 7) === type &&
          !(moveFlags(m) & F_CASTLE) &&
          (!mm[2] || sqFile(moveFrom(m)) === mm[2].charCodeAt(0) - 97) &&
          (!mm[3] || sqRank(moveFrom(m)) === Number(mm[3]) - 1) &&
          movePromo(m) === promo,
      );
      if (cands.length === 1) return cands[0];
    }
    return 0;
  }

  pieceAt(name: string): number {
    const sq = parseSq(name);
    return sq < 0 ? 0 : this.board[sq];
  }
}

export interface GameStatus {
  over: boolean;
  result?: '1-0' | '0-1' | '1/2-1/2';
  reason?: 'checkmate' | 'stalemate' | 'insufficient' | 'fifty' | 'repetition';
  check?: boolean;
}

/** Tách chuỗi nước đi kiểu "1.e4 e5 2.Nf3" thành mảng SAN */
export function splitMoves(text: string): string[] {
  return text
    .replace(/\{[^}]*\}/g, ' ')
    .replace(/\([^)]*\)/g, ' ')
    .replace(/\d+\.(\.\.)?/g, ' ')
    .replace(/(1-0|0-1|1\/2-1\/2|\*)\s*$/, ' ')
    .split(/\s+/)
    .filter((t) => t && t !== '...');
}

export interface PlayedLine {
  fens: string[]; // fens[0] = vị trí đầu, fens[i] = sau nước i
  sans: string[];
  ucis: string[];
}

/** Đi một chuỗi SAN từ FEN cho trước; ném lỗi kèm vị trí nếu có nước không hợp lệ */
export function playLine(moves: string[] | string, fen: string = START_FEN): PlayedLine {
  const list = typeof moves === 'string' ? splitMoves(moves) : moves;
  const pos = new Position(fen);
  const res: PlayedLine = { fens: [pos.fen()], sans: [], ucis: [] };
  list.forEach((san, i) => {
    const m = pos.sanToMove(san);
    if (!m) throw new Error(`Nước đi không hợp lệ #${i + 1} "${san}" tại vị trí ${pos.fen()}`);
    res.sans.push(pos.moveToSan(m));
    res.ucis.push(pos.moveToUci(m));
    pos.make(m);
    res.fens.push(pos.fen());
  });
  return res;
}

export const PIECE_VALUE = [0, 100, 320, 330, 500, 900, 20000];
