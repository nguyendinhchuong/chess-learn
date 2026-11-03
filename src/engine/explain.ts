// Diễn giải nước đi bằng tiếng Việt: bắt quân, chiếu, phát triển, trung tâm, chĩa đôi, quân bị treo…
import {
  Position,
  Color,
  PAWN,
  KNIGHT,
  BISHOP,
  KING,
  F_CAPTURE,
  F_CASTLE,
  F_EP,
  PIECE_VALUE,
  moveFrom,
  moveTo,
  moveFlags,
  movePromo,
  sqName,
  sqRank,
  WHITE,
} from './board';

export const PIECE_VI = ['', 'Tốt', 'Mã', 'Tượng', 'Xe', 'Hậu', 'Vua'];
export const piece = (t: number) => PIECE_VI[t];

const CENTER = new Set([0x33, 0x34, 0x43, 0x44]); // d4 e4 d5 e5

export interface Target {
  sq: string;
  type: number;
  defended: boolean;
}

export interface MoveFacts {
  san: string;
  uci: string;
  color: Color;
  type: number;
  from: string;
  to: string;
  captured: number;
  check: boolean;
  mate: boolean;
  stalemate: boolean;
  castle: 0 | 1 | 2;
  promo: number;
  /** Quân địch giá trị (hoặc không được bảo vệ) mà quân vừa đi tấn công */
  targets: Target[];
  fork: boolean;
  /** Quân vừa đi có thể bị bắt có lợi */
  movedHanging: boolean;
  /** Quân khác của mình bị bỏ ngỏ do nước đi này */
  newlyHanging: Target[];
  development: boolean;
  center: boolean;
  passedPawnPush: boolean;
}

/**
 * Các quân bên `by` có thể bắt HỢP LỆ quân ở ô `sq` (loại quân đang bị ghim vào Vua, v.v.).
 * Nếu không xét được tính hợp lệ (bên kia đang bị chiếu), trả về danh sách tấn công thông thường.
 */
export function legalAttackers(pos: Position, sq: number, by: Color): number[] {
  const pseudo = pos.attackers(sq, by);
  if (!pseudo.length) return pseudo;
  let moves: number[] | null = null;
  if (pos.side === by) moves = pos.legalMoves();
  else if (!pos.inCheck()) {
    pos.makeNull();
    moves = pos.legalMoves();
    pos.unmakeNull();
  }
  if (!moves) return pseudo;
  const froms = new Set(moves.filter((m) => moveTo(m) === sq).map(moveFrom));
  return pseudo.filter((s) => froms.has(s));
}

/** Giá trị quân tấn công rẻ nhất (bỏ qua Vua vì Vua không thể bắt quân được bảo vệ) */
function lowestAttacker(pos: Position, attackers: number[]): number {
  let low = Infinity;
  for (const s of attackers) {
    const t = pos.board[s] & 7;
    if (t !== KING && PIECE_VALUE[t] < low) low = PIECE_VALUE[t];
  }
  return low;
}

/** Quân ở `sq` có đang bị đe dọa bắt có lợi không */
export function isHanging(pos: Position, sq: number): boolean {
  const p = pos.board[sq];
  if (!p) return false;
  const c = ((p >> 3) & 1) as Color;
  const t = p & 7;
  if (t === KING) return false;
  const enemy = (c ^ 1) as Color;
  const atk = legalAttackers(pos, sq, enemy);
  if (!atk.length) return false;
  const defenders = pos.attackers(sq, c);
  if (!defenders.length) return true;
  return lowestAttacker(pos, atk) < PIECE_VALUE[t];
}

function hangingSet(pos: Position, color: Color): Set<number> {
  const s = new Set<number>();
  for (let sq = 0; sq < 128; sq++) {
    if (sq & 0x88) {
      sq += 7;
      continue;
    }
    const p = pos.board[sq];
    if (p && ((p >> 3) & 1) === color && isHanging(pos, sq)) s.add(sq);
  }
  return s;
}

function isPassed(pos: Position, sq: number): boolean {
  const p = pos.board[sq];
  const c = (p >> 3) & 1;
  const f = sq & 7;
  const enemyPawn = c ? PAWN : PAWN | 8;
  const dir = c ? -16 : 16;
  for (let s = sq + dir; !(s & 0x88); s += dir) {
    for (const df of [-1, 0, 1]) {
      const ff = f + df;
      if (ff < 0 || ff > 7) continue;
      const q = (s & 0x70) | ff;
      if (pos.board[q] === enemyPawn) return false;
    }
  }
  return true;
}

/** Phân tích một nước đi (hợp lệ) tại vị trí `pos` (pos không bị thay đổi sau khi gọi). */
export function analyzeMove(pos: Position, m: number): MoveFacts {
  const from = moveFrom(m),
    to = moveTo(m),
    flags = moveFlags(m);
  const p = pos.board[from];
  const type = p & 7;
  const color = ((p >> 3) & 1) as Color;
  const enemy = (color ^ 1) as Color;
  const captured = flags & F_EP ? PAWN : flags & F_CAPTURE ? pos.board[to] & 7 : 0;
  const san = pos.moveToSan(m);
  const uci = pos.moveToUci(m);
  const hangBefore = hangingSet(pos, color);

  pos.make(m);
  const check = pos.inCheck();
  const hasMoves = pos.hasLegalMove();
  const mate = check && !hasMoves;
  const stalemate = !check && !hasMoves;
  const targets: Target[] = [];
  const movedType = pos.board[to] & 7;
  for (const s of pos.attacksFrom(to)) {
    const q = pos.board[s];
    if (!q || ((q >> 3) & 1) !== enemy) continue;
    const t = q & 7;
    if (t === KING) continue;
    const defended = pos.attackers(s, enemy).length > 0;
    if (PIECE_VALUE[t] > PIECE_VALUE[movedType] || !defended) targets.push({ sq: sqName(s), type: t, defended });
  }
  const fork = targets.length + (check ? 1 : 0) >= 2;
  const movedHanging = type !== KING && isHanging(pos, to);
  const hangAfter = hangingSet(pos, color);
  const newlyHanging: Target[] = [];
  hangAfter.forEach((s) => {
    if (s !== to && !hangBefore.has(s)) newlyHanging.push({ sq: sqName(s), type: pos.board[s] & 7, defended: pos.attackers(s, color).length > 0 });
  });
  let centerHits = 0;
  if (type === PAWN || type === KNIGHT || type === BISHOP) for (const s of pos.attacksFrom(to)) if (CENTER.has(s)) centerHits++;
  const passedPawnPush = type === PAWN && isPassed(pos, to) && (color === WHITE ? sqRank(to) >= 4 : sqRank(to) <= 3);
  pos.unmake();

  const homeRank = color === WHITE ? 0 : 7;
  return {
    san,
    uci,
    color,
    type,
    from: sqName(from),
    to: sqName(to),
    captured,
    check,
    mate,
    stalemate,
    castle: flags & F_CASTLE ? (to > from ? 1 : 2) : 0,
    promo: movePromo(m),
    targets,
    fork,
    movedHanging,
    newlyHanging,
    development: (type === KNIGHT || type === BISHOP) && sqRank(from) === homeRank && pos.fullmove <= 15,
    center: CENTER.has(to) || centerHits >= 2,
    passedPawnPush,
  };
}

const listVi = (items: string[]) => (items.length <= 1 ? items.join('') : items.slice(0, -1).join(', ') + ' và ' + items[items.length - 1]);
const targetName = (t: Target) => `${piece(t.type)} ${t.sq}`;

/** Câu mô tả ngắn gọn nước đi, ví dụ: "Mã g1 lên f3 – phát triển quân, kiểm soát trung tâm". */
export function describeMove(f: MoveFacts): string {
  let main: string;
  if (f.castle) main = f.castle === 1 ? 'Nhập thành cánh Vua' : 'Nhập thành cánh Hậu';
  else if (f.promo) main = `Tốt ${f.captured ? `bắt ${piece(f.captured)} ở ${f.to} và ` : `tiến tới ${f.to} và `}phong cấp thành ${piece(f.promo)}`;
  else if (f.captured) main = `${PIECE_VI[f.type]} ${f.from} bắt ${piece(f.captured)} ở ${f.to}`;
  else main = `${PIECE_VI[f.type]} ${f.from} đi ${f.to}`;

  const why: string[] = [];
  if (f.mate) why.push('chiếu hết!');
  else if (f.stalemate) why.push('nhưng đối phương hết nước đi – hòa cờ (pat)');
  else {
    if (f.castle) why.push('đưa Vua vào nơi an toàn và đưa Xe vào cuộc');
    if (f.fork) {
      const names = f.targets.map(targetName);
      if (f.check) names.unshift('Vua');
      why.push(`chĩa đôi ${listVi(names)}`);
    } else {
      if (f.check) why.push('chiếu Vua');
      if (f.targets.length) why.push(`tấn công ${listVi(f.targets.map(targetName))}`);
    }
    if (f.development) why.push('phát triển quân');
    if (f.center && !f.castle) why.push('tranh giành trung tâm');
    if (f.passedPawnPush) why.push('đẩy tốt thông tiến về phía phong cấp');
  }
  return why.length ? `${main} – ${why.join(', ')}` : main;
}

/** Cảnh báo quân bị treo sau nước đi */
export function hangingWarning(f: MoveFacts): string | null {
  const parts: string[] = [];
  if (f.movedHanging && !f.mate) parts.push(`${piece(f.type)} ở ${f.to}`);
  for (const t of f.newlyHanging) parts.push(targetName(t));
  if (!parts.length) return null;
  return `${listVi(parts)} đang bị bỏ ngỏ – đối thủ có thể bắt có lợi`;
}

/** Chênh lệch vật chất (điểm: Tốt 1, quân nhẹ 3, Xe 5, Hậu 9) theo góc nhìn bên `color` */
export function materialBalance(pos: Position, color: Color): number {
  let s = 0;
  for (let sq = 0; sq < 128; sq++) {
    if (sq & 0x88) {
      sq += 7;
      continue;
    }
    const p = pos.board[sq];
    if (!p || (p & 7) === KING) continue;
    const v = [0, 1, 3, 3, 5, 9][p & 7];
    s += ((p >> 3) & 1) === color ? v : -v;
  }
  return s;
}

/** Thay đổi vật chất (theo góc nhìn bên `color`) sau khi đi một chuỗi UCI từ `pos`. */
export function materialSwing(pos: Position, ucis: string[], color: Color): number {
  const count = () => materialBalance(pos, color);
  const before = count();
  let made = 0;
  for (const u of ucis) {
    const m = pos.moveFromUci(u);
    if (!m) break;
    pos.make(m);
    made++;
  }
  const after = count();
  while (made--) pos.unmake();
  return after - before;
}

export function materialText(points: number): string {
  const n = Math.abs(points);
  if (n >= 9) return 'cỡ một Hậu (≈9 điểm)';
  if (n >= 5) return `cỡ một Xe (≈${n} điểm)`;
  if (n >= 3) return `cỡ một quân nhẹ (≈${n} điểm)`;
  if (n === 2) return 'khoảng 2 điểm vật chất';
  if (n === 1) return 'một Tốt';
  return '';
}
