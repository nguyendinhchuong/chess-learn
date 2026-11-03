// Diễn giải nước đi cờ tướng bằng tiếng Việt: ăn quân, chiếu, bắt đôi, quân bị bỏ ngỏ, xuất quân, Pháo đầu,
// Tốt qua sông… và lời giải thích "mục đích nước đi" dùng khi một nước chưa có lời bình viết tay.
import {
  Position,
  Color,
  RED,
  KING,
  ADVISOR,
  ELEPHANT,
  HORSE,
  ROOK,
  CANNON,
  PAWN,
  PIECE_VI,
  moveFrom,
  moveTo,
  sqName,
  sqX,
  sqY,
  pieceColor,
  pieceValueAt,
  PIECE_VALUE,
  crossedRiver,
  fileNumber,
} from './board';

export const piece = (t: number) => PIECE_VI[t];

/** Tên quân kèm lộ theo cách đếm của chủ quân, ví dụ "Xe lộ 2" */
export function pieceOn(pos: Position, sq: number): string {
  const p = pos.board[sq];
  if (!p) return '';
  return `${PIECE_VI[p & 7]} lộ ${fileNumber(sqX(sq), pieceColor(p))}`;
}

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
  /** Loại quân bị ăn (0 nếu không ăn quân) */
  captured: number;
  check: boolean;
  /** Đối phương hết nước đi sau nước này – thắng ván (chiếu bí hoặc khốn bí) */
  mate: boolean;
  /** Thắng vì khốn bí (không chiếu nhưng đối phương hết nước) */
  stalemate: boolean;
  /** Quân địch đáng kể mà quân vừa đi tấn công */
  targets: Target[];
  fork: boolean;
  /** Quân vừa đi có thể bị ăn có lợi */
  movedHanging: boolean;
  /** Quân khác của mình bị bỏ ngỏ do nước đi này */
  newlyHanging: Target[];
  /** Lần đầu xuất Xe, Mã, Pháo khỏi vị trí ban đầu */
  development: boolean;
  /** Pháo vào trung lộ (Pháo đầu) */
  centralCannon: boolean;
  /** Tốt vừa qua sông */
  crossRiver: boolean;
  /** Quân lớn vừa qua sông sang đất địch */
  invade: boolean;
}

const START_SQ: Record<number, number[][]> = {
  [ROOK]: [[0, 8], [81, 89]],
  [HORSE]: [[1, 7], [82, 88]],
  [CANNON]: [[19, 25], [64, 70]],
};

/**
 * Các quân bên `by` có thể ăn HỢP LỆ quân ở ô `sq` (loại quân đang bị ghim, nước làm lộ mặt tướng…).
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

/** Quân ở ô `sq` bị treo: bị tấn công mà không được bảo vệ, hoặc bị quân rẻ hơn tấn công */
export function isHanging(pos: Position, sq: number): boolean {
  const p = pos.board[sq];
  if (!p || (p & 7) === KING) return false;
  const color = pieceColor(p);
  const enemy = (color ^ 1) as Color;
  const atk = legalAttackers(pos, sq, enemy);
  if (!atk.length) return false;
  const value = pieceValueAt(p, sq);
  let low = Infinity;
  for (const a of atk) if ((pos.board[a] & 7) !== KING) low = Math.min(low, pieceValueAt(pos.board[a], a));
  if (low < value - 50) return true;
  const def = pos.attackers(sq, color).filter((d) => d !== sq);
  if (!def.length) return true;
  // chỉ Tướng tấn công mà quân được bảo vệ: không ăn được
  return false;
}

export function analyzeMove(pos: Position, m: number): MoveFacts {
  const from = moveFrom(m),
    to = moveTo(m);
  const p = pos.board[from];
  const type = p & 7;
  const color = pos.side;
  const captured = pos.board[to] & 7;
  const san = pos.moveToSan(m);
  const uci = pos.moveToUci(m);
  // quân của mình đang bị treo trước nước đi (để biết nước này có bỏ ngỏ quân khác không)
  const hangingBefore = new Set<number>();
  for (let sq = 0; sq < 90; sq++) {
    const q = pos.board[sq];
    if (q && pieceColor(q) === color && sq !== from && isHanging(pos, sq)) hangingBefore.add(sq);
  }
  const enemyAttackedBefore = new Set<number>();
  for (const s of pos.attacksFrom(from)) if (pos.board[s] && pieceColor(pos.board[s]) !== color) enemyAttackedBefore.add(s);

  pos.make(m);
  const check = pos.inCheck();
  const noMoves = !pos.hasLegalMove();
  const targets: Target[] = [];
  if (!noMoves) {
    for (const s of pos.attacksFrom(to)) {
      const q = pos.board[s];
      if (!q || pieceColor(q) === color || (q & 7) === KING) continue;
      if (enemyAttackedBefore.has(s) && from !== to) continue;
      const defended = pos.attackers(s, (color ^ 1) as Color).length > 0;
      const worth = !defended || pieceValueAt(q, s) >= pieceValueAt(p, to) + 50;
      if (worth && (q & 7) !== PAWN) targets.push({ sq: sqName(s), type: q & 7, defended });
      else if (worth && !defended && crossedRiver(sqY(s), pieceColor(q))) targets.push({ sq: sqName(s), type: q & 7, defended });
    }
  }
  // quân giá trị cao nêu trước: "bắt đôi Xe và Pháo"
  targets.sort((a, b) => PIECE_VALUE[b.type] - PIECE_VALUE[a.type]);
  const movedHanging = !noMoves && isHanging(pos, to);
  const newlyHanging: Target[] = [];
  if (!noMoves) {
    for (let sq = 0; sq < 90; sq++) {
      const q = pos.board[sq];
      if (!q || pieceColor(q) !== color || sq === to || hangingBefore.has(sq)) continue;
      if ((q & 7) === PAWN && !crossedRiver(sqY(sq), color)) continue;
      if (isHanging(pos, sq)) newlyHanging.push({ sq: sqName(sq), type: q & 7, defended: false });
    }
  }
  pos.unmake();

  const starts = START_SQ[type]?.[color] ?? [];
  const development = starts.includes(from);
  const centralCannon = type === CANNON && sqX(to) === 4 && sqX(from) !== 4;
  const crossRiver = type === PAWN && !crossedRiver(sqY(from), color) && crossedRiver(sqY(to), color);
  const invade = (type === ROOK || type === HORSE || type === CANNON) && !crossedRiver(sqY(from), color) && crossedRiver(sqY(to), color);
  return {
    san,
    uci,
    color,
    type,
    from: sqName(from),
    to: sqName(to),
    captured,
    check: check && !noMoves ? true : check,
    mate: noMoves,
    stalemate: noMoves && !check,
    targets,
    fork: targets.length >= 2 || (check && targets.length >= 1),
    movedHanging,
    newlyHanging,
    development,
    centralCannon,
    crossRiver,
    invade,
  };
}

const listVi = (items: string[]) => (items.length <= 1 ? items.join('') : items.slice(0, -1).join(', ') + ' và ' + items[items.length - 1]);

/** Mô tả ngắn gọn một nước đi (không có dấu chấm cuối câu) */
export function describeMove(f: MoveFacts): string {
  const parts: string[] = [];
  if (f.mate) return f.stalemate ? 'khốn bí – đối phương không còn nước đi nào và thua ván' : 'chiếu bí – kết thúc ván cờ';
  if (f.captured) parts.push(`ăn ${piece(f.captured)}`);
  if (f.check) parts.push(f.captured ? 'đồng thời chiếu Tướng' : 'chiếu Tướng');
  if (f.fork && f.targets.length >= 2) parts.push(`bắt đôi ${listVi(f.targets.map((t) => piece(t.type)))}`);
  else if (f.targets.length) parts.push(`tấn công ${piece(f.targets[0].type)}${f.targets[0].defended ? '' : ' chưa được bảo vệ'}`);
  if (!parts.length) {
    if (f.centralCannon) parts.push('đặt Pháo đầu, nhắm thẳng vào trung lộ và cung Tướng đối phương');
    else if (f.crossRiver) parts.push('đưa Tốt qua sông – từ nay Tốt được đi ngang');
    else if (f.development && f.type === ROOK) parts.push('xuất Xe tham chiến');
    else if (f.development && f.type === HORSE) parts.push('lên Mã, phát triển quân');
    else if (f.development && f.type === CANNON) parts.push('điều Pháo sang vị trí mới');
    else if (f.invade) parts.push(`đưa ${piece(f.type)} qua sông, uy hiếp trận địa đối phương`);
    else if (f.type === ADVISOR) parts.push('bổ Sĩ, củng cố cung Tướng');
    else if (f.type === ELEPHANT) parts.push('lên Tượng, củng cố phòng tuyến');
    else if (f.type === KING) parts.push('di chuyển Tướng');
    else parts.push(`điều ${piece(f.type)} sang vị trí mới`);
  }
  return parts.join(', ');
}

export function hangingWarning(f: MoveFacts): string | null {
  if (f.mate) return null;
  if (f.movedHanging) return `${piece(f.type)} vừa đi có thể bị đối phương ăn`;
  if (f.newlyHanging.length) return `nước này bỏ ngỏ ${listVi(f.newlyHanging.map((t) => piece(t.type)))}`;
  return null;
}

/** Tổng giá trị quân (theo "điểm": Tốt 1, Xe 9…) của `color` trừ đối phương */
export function materialBalance(pos: Position, color: Color): number {
  let s = 0;
  for (let sq = 0; sq < 90; sq++) {
    const p = pos.board[sq];
    if (!p || (p & 7) === KING) continue;
    const v = pieceValueAt(p, sq) / 100;
    s += pieceColor(p) === color ? v : -v;
  }
  return s;
}

/** Chênh lệch vật chất (theo góc nhìn `color`) sau chuỗi nước `ucis` */
export function materialSwing(pos: Position, ucis: string[], color: Color): number {
  const start = materialBalance(pos, color);
  let made = 0;
  for (const u of ucis) {
    const m = pos.moveFromUci(u);
    if (!m) break;
    pos.make(m);
    made++;
  }
  const end = materialBalance(pos, color);
  while (made--) pos.unmake();
  return Math.round((end - start) * 2) / 2;
}

export function materialText(points: number): string {
  const n = Math.abs(points);
  if (n >= 8.5) return 'một Xe';
  if (n >= 4.25 && n <= 4.75) return 'một Pháo';
  if (n >= 3.75 && n < 4.25) return 'một Mã';
  return `${String(n).replace('.', ',')} điểm vật chất`;
}

// ---------------------------------------------------------------------------------------------
// Mục đích nước đi
// ---------------------------------------------------------------------------------------------
export interface PurposeContext {
  /** Nước đi ngay trước (của đối phương), dạng tọa độ */
  prevUci?: string;
  /** Nước trước đó có ăn quân không */
  prevCapture?: boolean;
}

export function isCaptureAt(fen: string, uci: string): boolean {
  try {
    const pos = new Position(fen);
    const m = pos.moveFromUci(uci);
    return !!m && pos.board[moveTo(m)] !== 0;
  } catch {
    return false;
  }
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Lên Mã lần đầu: Mã có giữ Tốt đầu không, có mở đường cho Xe ở góc không */
function horseDevelopment(pos: Position, m: number): string {
  const color = pos.side;
  const from = moveFrom(m),
    to = moveTo(m);
  const parts = ['lên Mã, phát triển quân'];
  pos.make(m);
  const guards = pos.attacksFrom(to).some((s) => pos.board[s] === ((PAWN | (color << 3)) as number) && sqX(s) === 4);
  // Xe ở góc cùng phía giờ đi ngang được qua điểm Mã vừa rời
  const cornerX = sqX(from) < 4 ? 0 : 8;
  const corner = sqY(from) * 9 + cornerX;
  const rookFreed = pos.board[corner] === ((ROOK | (color << 3)) as number) && !pos.board[from];
  pos.unmake();
  if (guards) parts.push('bảo vệ Tốt đầu');
  if (rookFreed) parts.push('mở đường cho Xe xuất trận');
  return parts.length > 1 ? parts[0] + ': ' + parts.slice(1).join(' và ') : parts[0];
}

/** Lời giải thích mục đích của nước `m` tại thế `pos` (pos không bị thay đổi) */
export function explainPurpose(pos: Position, m: number, ctx: PurposeContext = {}): string {
  const f = analyzeMove(pos, m);
  const from = moveFrom(m),
    to = moveTo(m);
  const color = pos.side;
  const reasons: string[] = [];

  if (f.mate) return f.stalemate ? 'Khốn bí! Đối phương không bị chiếu nhưng không còn nước đi hợp lệ nào – theo luật cờ tướng, hết nước đi là thua.' : 'Chiếu bí! Tướng đối phương không còn đường thoát – ván cờ kết thúc.';

  const wasInCheck = pos.inCheck();
  if (wasInCheck) {
    if (f.type === KING) reasons.push('thoát chiếu bằng cách di chuyển Tướng ra khỏi đường bị chiếu');
    else if (f.captured) reasons.push(`thoát chiếu bằng cách ăn luôn quân đang chiếu`);
    else reasons.push(`thoát chiếu: ${piece(f.type)} chen vào cản đường chiếu (hoặc rút ngòi của Pháo đối phương)`);
  }

  const recapture = !!ctx.prevUci && ctx.prevCapture && ctx.prevUci.slice(2, 4) === f.to && f.captured > 0;
  if (!wasInCheck) {
    if (recapture) reasons.push(`ăn lại ${piece(f.captured)}, giữ cân bằng vật chất`);
    else if (f.captured) {
      const victimValue = pieceValueAt(pos.board[to], to);
      const free = !f.movedHanging;
      if (free) reasons.push(`ăn ${piece(f.captured)} mà không bị mất quân`);
      else if (victimValue >= pieceValueAt(pos.board[from], from)) reasons.push(`đổi quân: ăn ${piece(f.captured)} dù ${piece(f.type)} có thể bị ăn lại`);
      else reasons.push(`ăn ${piece(f.captured)}`);
    }
  }

  // thoát khỏi sự tấn công
  if (!wasInCheck && !f.captured && f.type !== KING && isHanging(pos, from) && !f.movedHanging) {
    const atk = legalAttackers(pos, from, (color ^ 1) as Color);
    const by = atk.length ? piece(pos.board[atk[0]] & 7) : 'đối phương';
    reasons.push(`đưa ${piece(f.type)} tránh khỏi sự tấn công của ${by}`);
  }

  if (f.check && !wasInCheck) reasons.push(f.fork && f.targets.length ? `chiếu Tướng và đồng thời tấn công ${piece(f.targets[0].type)}` : 'chiếu Tướng, buộc đối phương phải đối phó');
  else if (f.fork) reasons.push(`bắt đôi ${listVi(f.targets.map((t) => piece(t.type)))} – đối phương khó giữ được cả hai`);
  else if (f.targets.length) reasons.push(`tấn công ${piece(f.targets[0].type)}${f.targets[0].defended ? '' : ' chưa được bảo vệ'}`);

  // bảo vệ quân đang bị đe dọa
  if (!reasons.length) {
    pos.make(m);
    const protectedNow: string[] = [];
    for (let sq = 0; sq < 90; sq++) {
      const q = pos.board[sq];
      if (!q || pieceColor(q) !== color || sq === to || (q & 7) === KING) continue;
      if (pos.attackers(sq, (color ^ 1) as Color).length && pos.attacksFrom(to).includes(sq)) {
        pos.unmake();
        const hungBefore = isHanging(pos, sq);
        pos.make(m);
        if (hungBefore && !isHanging(pos, sq)) protectedNow.push(piece(q & 7));
      }
    }
    pos.unmake();
    if (protectedNow.length) reasons.push(`bảo vệ ${listVi(protectedNow)} đang bị đe dọa`);
  }

  if (!reasons.length) {
    const x = sqX(to),
      y = sqY(to);
    const ry = color === RED ? y : 9 - y;
    const forward = color === RED ? y > sqY(from) : y < sqY(from);
    if (f.centralCannon) reasons.push('Pháo đầu: đặt Pháo vào trung lộ, nhắm thẳng Tốt đầu và cung Tướng đối phương – thế khai cuộc giàu tính tấn công nhất');
    else if (f.type === HORSE && f.development) reasons.push(horseDevelopment(pos, m));
    else if (f.type === ROOK && f.development && sqY(from) === sqY(to)) reasons.push(`xuất Xe ra lộ ${fileNumber(x, color)} (trực xa) – Xe càng ra sớm càng tốt`);
    else if (f.type === ROOK && f.development) reasons.push('xuất Xe lên hàng ngang (hoành xa) để có thể chạy sang các lộ khác');
    else if (f.type === ROOK && f.invade) reasons.push('Xe qua hà: tràn sang đất địch, uy hiếp hàng Tốt và các quân chưa được bảo vệ');
    else if (f.type === ROOK && ry === 4) reasons.push('Xe tuần hà: đứng ở bờ sông của mình, kiểm soát cả hàng ngang và hỗ trợ Tốt, Mã');
    else if (f.crossRiver) reasons.push('Tốt qua sông – từ nay có thể đi ngang và giá trị tăng gần gấp đôi');
    else if (f.type === PAWN && (x === 2 || x === 6) && ry === 4) reasons.push('tiến Tốt mở đường cho Mã và cản bước tiến của Mã đối phương');
    else if (f.type === PAWN) reasons.push('tiến Tốt, giành thêm không gian');
    else if (f.type === ADVISOR) reasons.push(forward ? 'bổ Sĩ, củng cố cung Tướng và liên kết hai Sĩ' : 'lui Sĩ về hàng cuối, nhường chỗ hoặc mở đường cho Tướng');
    else if (f.type === ELEPHANT) reasons.push(forward ? 'lên Tượng, liên kết phòng tuyến và che chắn trung lộ' : 'lui Tượng về, giữ vững phòng tuyến và mở đường cho quân khác');
    else if (f.type === CANNON && f.invade) reasons.push('Pháo qua sông, tìm ngòi để uy hiếp quân và cung Tướng đối phương');
    else if (f.type === CANNON && ry === 4) reasons.push('Pháo tuần hà: đứng ở bờ sông của mình, khống chế hàng ngang và yểm trợ Tốt, Mã');
    else if (f.type === CANNON && ry <= 2 && (x === 3 || x === 5)) reasons.push('Pháo sĩ giác: đặt Pháo ở góc cung, vừa phòng thủ vừa sẵn sàng chuyển sang tấn công');
    else if (f.type === CANNON) reasons.push('điều Pháo sang lộ mới để tìm mục tiêu hoặc làm ngòi phối hợp');
    else if (f.type === HORSE && f.invade) reasons.push('Mã qua sông, tiến gần cung Tướng đối phương');
    else if (f.type === HORSE) reasons.push('điều Mã sang điểm đứng tốt hơn');
    else if (f.type === KING) reasons.push('di chuyển Tướng sang lộ an toàn hơn hoặc hỗ trợ khống chế lộ');
    else reasons.push(`điều ${piece(f.type)} sang vị trí tốt hơn`);
  }

  let text = cap(reasons[0]);
  if (reasons.length > 1) text += ', ' + reasons.slice(1).join(', ');
  text += '.';
  const warn = hangingWarning(f);
  if (warn && !f.captured) text += ` Chú ý: ${warn}.`;
  return text;
}
