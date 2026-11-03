// Giải thích MỤC ĐÍCH của một nước đi bằng tiếng Việt, dựa trên các sự kiện kiểm chứng được trên bàn cờ
// (không dùng tìm kiếm): bắt lại quân, thoát khỏi đòn tấn công, bảo vệ quân, chặn chiếu hết, ghim, tấn công mở,
// chiếm cột mở, tiền đồn, đột phá tốt, khống chế ô, chuẩn bị nhập thành, kích hoạt Vua ở tàn cuộc…
import {
  Position,
  Color,
  WHITE,
  PAWN,
  KNIGHT,
  BISHOP,
  ROOK,
  QUEEN,
  KING,
  F_CAPTURE,
  F_EP,
  moveFrom,
  moveTo,
  moveFlags,
  sqName,
  sqFile,
  sqRank,
} from './board';
import { analyzeMove, isHanging, piece } from './explain';

const POINTS = [0, 1, 3, 3, 5, 9, 0];
const CENTER = [0x33, 0x34, 0x43, 0x44];
const BISHOP_DIRS = [-17, -15, 15, 17];
const ROOK_DIRS = [-16, -1, 1, 16];
const FILES = 'abcdefgh';

const listVi = (items: string[]) => (items.length <= 1 ? items.join('') : items.slice(0, -1).join(', ') + ' và ' + items[items.length - 1]);
const at = (pos: Position, sq: number) => `${piece(pos.board[sq] & 7)} ${sqName(sq)}`;
const centerDist = (sq: number) => {
  const r = sq >> 4,
    f = sq & 7;
  return Math.max(3 - Math.min(r, 7 - r), 3 - Math.min(f, 7 - f));
};
const relRank = (sq: number, c: Color) => (c === WHITE ? sq >> 4 : 7 - (sq >> 4));
const kingDist = (a: number, b: number) => Math.max(Math.abs((a >> 4) - (b >> 4)), Math.abs((a & 7) - (b & 7)));

function squaresOf(pos: Position, pred: (p: number, sq: number) => boolean): number[] {
  const res: number[] = [];
  for (let sq = 0; sq < 128; sq++) {
    if (sq & 0x88) {
      sq += 7;
      continue;
    }
    const p = pos.board[sq];
    if (p && pred(p, sq)) res.push(sq);
  }
  return res;
}

/** Nước chiếu hết ngay (bên đang đi), 0 nếu không có */
function mateInOne(pos: Position): number {
  for (const m of pos.legalMoves()) {
    pos.make(m);
    const mate = pos.inCheck() && !pos.hasLegalMove();
    pos.unmake();
    if (mate) return m;
  }
  return 0;
}

/** Nếu bên `color` được đi thêm một nước ngay bây giờ, có chiếu hết được không? */
function mateThreatOf(pos: Position, color: Color): string | null {
  if (pos.side === color) {
    const m = mateInOne(pos);
    return m ? pos.moveToSan(m) : null;
  }
  if (pos.inCheck()) return null;
  pos.makeNull();
  const m = mateInOne(pos);
  const san = m ? pos.moveToSan(m) : null;
  pos.unmakeNull();
  return san;
}

/** Các quân địch "đáng kể" mà quân ở `sq` tấn công: quân giá trị cao hơn, Vua, hoặc quân không được bảo vệ */
function valuableTargets(pos: Position, sq: number): number[] {
  const p = pos.board[sq];
  if (!p) return [];
  const c = ((p >> 3) & 1) as Color;
  const enemy = (c ^ 1) as Color;
  const res: number[] = [];
  for (const s of pos.attacksFrom(sq)) {
    const q = pos.board[s];
    if (!q || ((q >> 3) & 1) !== enemy) continue;
    const t = q & 7;
    if (t === KING || POINTS[t] > POINTS[p & 7] || !pos.attackers(s, enemy).length) res.push(s);
  }
  return res;
}

function mobility(pos: Position, sq: number): number {
  const p = pos.board[sq];
  const c = (p >> 3) & 1;
  return pos.attacksFrom(sq).filter((s) => !pos.board[s] || ((pos.board[s] >> 3) & 1) !== c).length;
}

/** Quân địch bị quân trượt ở `sq` ghim (vào Vua hoặc quân giá trị hơn) */
function pinsBy(pos: Position, sq: number): { pinned: number; behind: number }[] {
  const p = pos.board[sq];
  const t = p & 7;
  if (t !== BISHOP && t !== ROOK && t !== QUEEN) return [];
  const c = (p >> 3) & 1;
  const dirs = t === BISHOP ? BISHOP_DIRS : t === ROOK ? ROOK_DIRS : [...BISHOP_DIRS, ...ROOK_DIRS];
  const res: { pinned: number; behind: number }[] = [];
  for (const d of dirs) {
    let s = sq + d;
    let first = -1;
    while (!(s & 0x88)) {
      const q = pos.board[s];
      if (q) {
        if (((q >> 3) & 1) === c) break;
        if (first < 0) {
          if ((q & 7) === KING || (q & 7) === PAWN) break; // bỏ qua "ghim Tốt" – ít ý nghĩa
          first = s;
        } else {
          const bt = q & 7;
          const ft = pos.board[first] & 7;
          if (bt === KING || POINTS[bt] > POINTS[ft]) res.push({ pinned: first, behind: s });
          break;
        }
      }
      s += d;
    }
  }
  return res;
}

function isEndgame(pos: Position): boolean {
  let total = 0;
  for (const sq of squaresOf(pos, (p) => (p & 7) !== PAWN && (p & 7) !== KING)) total += POINTS[pos.board[sq] & 7];
  return total <= 26;
}

function isPassedPawn(pos: Position, sq: number): boolean {
  const p = pos.board[sq];
  const c = (p >> 3) & 1;
  const f = sq & 7;
  const enemyPawn = c ? PAWN : PAWN | 8;
  const dir = c ? -16 : 16;
  for (let s = sq + dir; !(s & 0x88); s += dir)
    for (const df of [-1, 0, 1]) {
      const ff = f + df;
      if (ff >= 0 && ff <= 7 && pos.board[(s & 0x70) | ff] === enemyPawn) return false;
    }
  return true;
}

export interface PurposeContext {
  /** Nước đi ngay trước (UCI) của đối phương */
  prevUci?: string;
  /** Nước đi ngay trước có bắt quân không – để nhận ra nước bắt lại quân */
  prevCapture?: boolean;
  /** Chủ ngữ của câu chính (mặc định "Trắng"/"Đen"), ví dụ "Bạn" khi giải thích gợi ý */
  subject?: string;
  /**
   * Nước đã được máy kiểm chứng là tốt nhất: vẫn kể các đòn (tấn công, ghim, chĩa đôi…) của quân vừa đi
   * dù nó đứng ở ô bị tấn công – việc đối phương ăn quân đó không có lợi.
   */
  trusted?: boolean;
}

export interface PurposeParts {
  /** Câu chính, ví dụ "Trắng đưa Mã từ g1 đến f3" */
  main: string;
  /** Các lý do, quan trọng nhất trước */
  reasons: string[];
  /** Lưu ý về quân bị bỏ ngỏ (chuỗi rỗng nếu không có), bắt đầu bằng dấu cách */
  warn: string;
  /** Nước kết thúc ván cờ */
  final?: 'mate' | 'stalemate';
}

/** Nước `uci` tại vị trí `fen` có bắt quân không */
export function isCaptureAt(fen: string, uci: string): boolean {
  const pos = new Position(fen);
  const m = pos.moveFromUci(uci);
  return !!m && !!(moveFlags(m) & F_CAPTURE);
}

/** Câu giải thích mục đích của nước `m` tại vị trí `pos` (pos không bị thay đổi). */
export function explainPurpose(pos: Position, m: number, ctx: PurposeContext = {}): string {
  const p = purposeParts(pos, m, ctx);
  if (p.final === 'mate') return `${p.main} – chiếu hết, kết thúc ván cờ!`;
  if (p.final === 'stalemate') return `${p.main} – nhưng đối phương không còn nước đi hợp lệ: hòa cờ (pat).`;
  return `${p.main} – ${p.reasons.slice(0, 3).join(', ')}.${p.warn}`;
}

/** Các thành phần của lời giải thích mục đích: câu chính, lý do và lưu ý (pos không bị thay đổi). */
export function purposeParts(pos: Position, m: number, ctx: PurposeContext = {}): PurposeParts {
  const f = analyzeMove(pos, m);
  const us = pos.side;
  const them = (us ^ 1) as Color;
  const from = moveFrom(m),
    to = moveTo(m),
    flags = moveFlags(m);
  const moverType = pos.board[from] & 7;
  const side = ctx.subject ?? (us === WHITE ? 'Trắng' : 'Đen');
  const reasons: string[] = [];
  const add = (r: string | null | undefined) => {
    if (r && !reasons.includes(r)) reasons.push(r);
  };

  // ---------- trước nước đi ----------
  const inCheckBefore = pos.inCheck();
  const checkers = inCheckBefore ? pos.attackers(pos.kingSq[us], them) : [];
  const movedWasHanging = moverType !== KING && isHanging(pos, from);
  const attackerOfFrom = movedWasHanging ? pos.attackers(from, them).sort((a, b) => POINTS[pos.board[a] & 7] - POINTS[pos.board[b] & 7])[0] : -1;
  const attackerName = attackerOfFrom >= 0 ? at(pos, attackerOfFrom) : '';
  const hangBefore = new Set(squaresOf(pos, (p, sq) => ((p >> 3) & 1) === us && sq !== from && isHanging(pos, sq)));
  // quân của mình đang bị tấn công (dù chưa "treo") và số quân bảo vệ chúng
  const attackedOwn = new Map(squaresOf(pos, (p, sq) => ((p >> 3) & 1) === us && sq !== from && (p & 7) !== KING && pos.attackers(sq, them).length > 0).map((sq) => [sq, pos.attackers(sq, us).length]));
  const enemyMateThreat = inCheckBefore ? null : mateThreatOf(pos, them);
  const capturedDefended = flags & F_CAPTURE && !(flags & F_EP) ? pos.attackers(to, them).length > 0 : true;
  const capturedName = f.captured ? piece(f.captured) : '';
  const sliders = squaresOf(pos, (p, sq) => ((p >> 3) & 1) === us && sq !== from && [BISHOP, ROOK, QUEEN].includes(p & 7));
  const sliderTargetsBefore = new Map(sliders.map((s) => [s, new Set(valuableTargets(pos, s))]));
  const sliderReachBefore = new Map(sliders.map((s) => [s, new Set(pos.attacksFrom(s))]));
  const bishopMobBefore = new Map(squaresOf(pos, (p) => p === (BISHOP | (us << 3))).map((s) => [s, mobility(pos, s)]));
  const pawnAttacksBefore = new Set(squaresOf(pos, (p) => p === (PAWN | (us << 3))).flatMap((s) => pos.attacksFrom(s)));
  const enemyMinorReach = new Map<number, Set<number>>(); // ô trống → loại quân nhẹ địch có thể đến
  for (const s of squaresOf(pos, (p) => ((p >> 3) & 1) === them && ((p & 7) === KNIGHT || (p & 7) === BISHOP)))
    for (const t of pos.attacksFrom(s))
      if (!pos.board[t]) {
        if (!enemyMinorReach.has(t)) enemyMinorReach.set(t, new Set());
        enemyMinorReach.get(t)!.add(pos.board[s] & 7);
      }
  const mobBefore = moverType === PAWN ? 0 : mobility(pos, from);
  const endgame = isEndgame(pos);
  const homeRank = us === WHITE ? 0 : 7;
  const rooksBefore = squaresOf(pos, (p) => p === (ROOK | (us << 3)));
  const rooksConnectedBefore = rooksConnected(pos, us);
  const castlePathBefore = castlePaths(pos, us);

  // ---------- sau nước đi ----------
  pos.make(m);
  const enemyMateAfter = mateThreatOf(pos, them);
  const ourMateThreat = f.check ? null : mateThreatOf(pos, us);
  const discovered: string[] = [];
  for (const s of sliders) {
    if (!pos.board[s] || ((pos.board[s] >> 3) & 1) !== us) continue;
    const before = sliderTargetsBefore.get(s)!;
    for (const t of valuableTargets(pos, s)) if (!before.has(t) && t !== to) discovered.push(`${at(pos, s)} tấn công ${(pos.board[t] & 7) === KING ? 'Vua' : at(pos, t)}`);
  }
  const pins = pinsBy(pos, to).map(({ pinned, behind }) => `ghim ${at(pos, pinned)} vào ${(pos.board[behind] & 7) === KING ? 'Vua' : at(pos, behind)}`);
  const newCentral = [KNIGHT, BISHOP, PAWN].includes(moverType) ? pos.attacksFrom(to).filter((s) => CENTER.includes(s) && !pos.board[s]).map(sqName) : [];
  const mobAfter = moverType === PAWN || moverType === KING ? 0 : mobility(pos, to);
  const bishopOpened: string[] = [];
  for (const [s, mb] of bishopMobBefore) if (s !== from && pos.board[s] === (BISHOP | (us << 3)) && mobility(pos, s) >= mb + 2) bishopOpened.push(sqName(s));
  const pawnNewControl = moverType === PAWN ? pos.attacksFrom(to).filter((s) => !pawnAttacksBefore.has(s)) : [];
  // gom các ô bị khống chế theo nhóm quân địch bị ngăn: "không cho Mã và Tượng đối phương đến các ô d5, b5"
  const deniedGroups = new Map<string, string[]>();
  for (const sq of pawnNewControl.filter((x) => enemyMinorReach.has(x))) {
    const who = [...enemyMinorReach.get(sq)!].sort().map(piece).join(' và ');
    deniedGroups.set(who, [...(deniedGroups.get(who) ?? []), sqName(sq)]);
  }
  const deniedSquares = [...deniedGroups].map(([who, sqs]) => `${who} đối phương đến ${sqs.length > 1 ? `các ô ${sqs.join(', ')}` : `ô ${sqs[0]}`}`);
  const pawnHitsPawn = moverType === PAWN ? pos.attacksFrom(to).filter((s) => pos.board[s] === (PAWN | (them << 3))).map(sqName) : [];
  const passedNow = moverType === PAWN && isPassedPawn(pos, to);
  const rooksConnectedAfter = rooksConnected(pos, us);
  const castlePathAfter = castlePaths(pos, us);
  const batteryWith = [ROOK, QUEEN].includes(moverType) ? battery(pos, to) : null;
  const outpost = moverType === KNIGHT && isOutpost(pos, to);
  const enemyK = pos.kingSq[them];
  let tradeOffer: string | null = null;
  if ([KNIGHT, BISHOP, ROOK, QUEEN].includes(moverType) && !f.captured)
    for (const t of pos.attacksFrom(to)) {
      const q = pos.board[t];
      if (q && ((q >> 3) & 1) === them && (q & 7) === moverType && pos.attackers(to, us).length) {
        tradeOffer = `đề nghị đổi ${at(pos, t)}${kingDist(t, enemyK) <= 1 ? ' – quân phòng thủ quan trọng của Vua đối phương' : ''}`;
        break;
      }
    }
  const nearKing = [KNIGHT, BISHOP, ROOK, QUEEN].includes(moverType) && kingDist(to, enemyK) <= 2 && kingDist(to, enemyK) < kingDist(from, enemyK);
  const blocksPawn = moverType === PAWN && (sqFile(to) <= 1 || sqFile(to) >= 6) ? pos.board[to + (us === WHITE ? 16 : -16)] === (PAWN | (them << 3)) : false;
  /** Ai bảo vệ ô `sq` sau nước đi: chính quân vừa đi, hay quân trượt được mở đường */
  const howDefended = (sq: number): string => {
    if (pos.attacksFrom(to).includes(sq)) return `bảo vệ ${at(pos, sq)}`;
    const opener = sliders.find((sl) => pos.board[sl] && ((pos.board[sl] >> 3) & 1) === us && pos.attacksFrom(sl).includes(sq) && !sliderReachBefore.get(sl)!.has(sq));
    return opener !== undefined ? `mở đường cho ${at(pos, opener)} bảo vệ ${at(pos, sq)}` : `bảo vệ ${at(pos, sq)}`;
  };
  const reinforced = [...attackedOwn]
    .filter(([sq, n]) => pos.board[sq] && ((pos.board[sq] >> 3) & 1) === us && pos.attackers(sq, us).length > n && !hangBefore.has(sq))
    .map(([sq]) => howDefended(sq));
  const savedHow = [...hangBefore].filter((sq) => sq !== to && pos.board[sq] && !isHanging(pos, sq)).map((sq) => howDefended(sq));
  pos.unmake();

  // ---------- câu chính ----------
  let main: string;
  if (f.castle) main = `${side} nhập thành cánh ${f.castle === 1 ? 'Vua' : 'Hậu'}`;
  else if (f.promo) main = `${side} ${f.captured ? `dùng Tốt bắt ${capturedName} ở ${f.to} và ` : `đẩy Tốt lên ${f.to} và `}phong cấp thành ${piece(f.promo)}`;
  else if (flags & F_EP) main = `${side} bắt Tốt qua đường ở ${f.to}`;
  else if (f.captured) main = `${side} dùng ${piece(moverType)} ${f.from} bắt ${capturedName} ở ${f.to}`;
  else main = `${side} đưa ${piece(moverType)} từ ${f.from} đến ${f.to}`;

  // ---------- lý do theo thứ tự ưu tiên ----------
  if (f.mate) return { main, reasons: [], warn: '', final: 'mate' };
  if (f.stalemate) return { main, reasons: [], warn: '', final: 'stalemate' };
  if (f.promo) add('Tốt về đích, có thêm một quân mạnh');

  if (inCheckBefore) {
    if (moverType === KING) add('đưa Vua thoát khỏi nước chiếu');
    else if (checkers.includes(to)) add('bắt luôn quân đang chiếu');
    else add('chặn đường chiếu');
  }
  if (enemyMateThreat && !enemyMateAfter) add(`ngăn đòn chiếu hết ${enemyMateThreat} mà đối phương đang dọa`);

  if (f.captured) {
    const capPts = POINTS[f.captured],
      movPts = POINTS[moverType];
    const recapture = !!ctx.prevCapture && !!ctx.prevUci && ctx.prevUci.slice(2, 4) === f.to;
    if (recapture) add('bắt lại quân, giữ cân bằng vật chất');
    else if (!capturedDefended && !f.movedHanging) add(`ăn ${capturedName} không được bảo vệ`);
    else if (capPts > movPts) add('đổi lấy quân có giá trị cao hơn');
    else if (capPts === movPts && moverType !== PAWN) add('chủ động đổi quân');
    else if (capPts === movPts && moverType === PAWN && capturedDefended) add('trao đổi Tốt, mở đường cho quân hoạt động');
    else if (f.movedHanging && capPts < movPts) add(`chấp nhận hy sinh ${piece(moverType)} để mở thế tấn công`);
  }

  if (movedWasHanging && !f.movedHanging && to !== attackerOfFrom) add(`đưa ${piece(moverType)} thoát khỏi sự tấn công của ${attackerName}`);
  if (savedHow.length) add(listVi(savedHow.slice(0, 2)));

  if (reinforced.length) add(listVi(reinforced.slice(0, 2).map((r) => (r.startsWith('bảo vệ') ? `tăng cường ${r}` : r.replace(' bảo vệ ', ' tăng cường bảo vệ ')))));

  // Quân vừa đi có thể bị bắt ngay: không tính các đòn chĩa đôi/ghim/vị trí của nó (đối phương chỉ cần bắt)
  const exposed = !ctx.trusted && f.movedHanging && moverType !== KING && moverType !== PAWN;
  const discoveredCheck = f.check && discovered.some((d) => d.endsWith('Vua'));
  if (exposed && f.check && !f.captured && !discoveredCheck) add(`thí ${piece(moverType)} có chiếu, buộc đối phương phải phản ứng`);
  if (!exposed && f.fork) add(`chĩa đôi ${listVi([...(f.check ? ['Vua'] : []), ...f.targets.map((t) => `${piece(t.type)} ${t.sq}`)])}`);
  else {
    if (f.check && !discoveredCheck && !(exposed && !f.captured)) add('chiếu Vua, buộc đối phương phải đối phó');
    if (!exposed && f.targets.length) add(`tấn công ${listVi(f.targets.map((t) => `${piece(t.type)} ${t.sq}${t.defended ? '' : ' (không được bảo vệ)'}`))}`);
  }
  if (discovered.length) add(`mở đường cho ${listVi(discovered.slice(0, 2))}${discoveredCheck ? ' (chiếu mở)' : ''}`);
  if (!exposed && pins.length) add(listVi(pins.slice(0, 2)));
  if (ourMateThreat) add(`dọa chiếu hết bằng ${ourMateThreat}`);
  if (!exposed && tradeOffer) add(tradeOffer);
  if (!exposed && nearKing) add('áp sát Vua đối phương, tăng sức ép tấn công');

  if (f.castle) add('đưa Vua vào nơi an toàn và đưa Xe vào trận');
  if (f.development) add('phát triển quân');
  if (newCentral.length && !f.castle && moverType !== PAWN) add(`khống chế ô trung tâm ${listVi(newCentral)}`);
  for (const sideKey of ['K', 'Q'] as const)
    if (!f.castle && !castlePathBefore[sideKey] && castlePathAfter[sideKey]) add(`dọn đường để nhập thành cánh ${sideKey === 'K' ? 'Vua' : 'Hậu'}`);
  if (!rooksConnectedBefore && rooksConnectedAfter && rooksBefore.length === 2) add('kết nối hai Xe');

  if (moverType === ROOK && !exposed) {
    pos.make(m);
    const file = sqFile(to);
    const ownPawn = squaresOf(pos, (p, s) => p === (PAWN | (us << 3)) && sqFile(s) === file).length;
    const enemyPawn = squaresOf(pos, (p, s) => p === (PAWN | (them << 3)) && sqFile(s) === file).length;
    pos.unmake();
    if (sqFile(from) !== file || sqRank(from) === sqRank(to)) {
      if (!ownPawn && !enemyPawn) add(`chiếm cột mở ${FILES[file]}`);
      else if (!ownPawn) add(`đặt Xe lên cột nửa mở ${FILES[file]}, gây áp lực lên Tốt đối phương`);
    }
    if (relRank(to, us) === 6) add('đưa Xe xâm nhập hàng 7, tấn công Tốt và dồn ép Vua đối phương');
  }
  if (batteryWith && !exposed) add(batteryWith);
  if (outpost && !exposed) add(`đặt Mã vào tiền đồn ${f.to} – Tốt đối phương không thể đuổi đi`);

  if (moverType === PAWN) {
    if (f.passedPawnPush || (passedNow && relRank(to, us) >= 4)) add('đẩy Tốt thông tiến dần về ô phong cấp');
    else if (passedNow && !f.captured) add('tạo ra một Tốt thông');
    if (pawnHitsPawn.length && !f.captured) add(`tấn công Tốt ${listVi(pawnHitsPawn)} – đột phá để mở thế cờ`);
    if (deniedSquares.length) add(`không cho ${listVi(deniedSquares.slice(0, 2))}`);
    if (bishopOpened.length) add(`mở đường chéo cho Tượng ${listVi(bishopOpened)}`);
    const kf = sqFile(pos.kingSq[us]);
    if (!endgame && sqRank(pos.kingSq[us]) === homeRank && Math.abs(sqFile(from) - kf) <= 1 && Math.abs(sqRank(to) - sqRank(from)) === 1 && !f.captured && relRank(to, us) === 2 && (kf >= 5 || kf <= 2))
      add('tạo “lỗ thở” cho Vua, tránh bị chiếu hết ở hàng cuối');
    if (blocksPawn) add(`chặn đứng Tốt ${sqName(to + (us === WHITE ? 16 : -16))} của đối phương`);
    if (f.center || newCentral.length) add('tranh giành trung tâm');
    const flank = sqFile(to) <= 2 ? 'cánh Hậu' : sqFile(to) >= 5 ? 'cánh Vua' : '';
    if (relRank(to, us) >= 4 && !passedNow && !pawnHitsPawn.length) add(flank ? `giành thêm không gian ở ${flank}` : 'giành thêm không gian');
    else if (flank && relRank(to, us) === 3 && !f.captured) add(`mở rộng không gian ở ${flank}`);
    if (relRank(from, us) === 1 && (sqFile(from) === 1 || sqFile(from) === 6) && Math.abs(sqRank(to) - sqRank(from)) === 1 && pos.fullmove <= 12)
      add(`chuẩn bị đưa Tượng lên đường chéo dài (fianchetto)`);
  }

  if (moverType === KING && !f.castle && !inCheckBefore) {
    if (endgame && centerDist(to) < centerDist(from)) add('Vua tiến vào trung tâm – ở tàn cuộc, Vua là một quân chiến đấu');
    else if (endgame) add('Vua tiến lên tham chiến');
    else if (relRank(to, us) > relRank(from, us)) add('Vua mạnh dạn tiến lên phía trước, tham gia vào trận đấu');
    else if ((sqFile(to) <= 1 || sqFile(to) >= 6) && relRank(to, us) <= 1) add('đưa Vua về nơi kín đáo, an toàn hơn');
    else add('điều chỉnh vị trí của Vua');
  }
  if ([KNIGHT, BISHOP, QUEEN].includes(moverType) && !reasons.length) {
    if (centerDist(to) < centerDist(from)) add(`đưa ${piece(moverType)} vào gần trung tâm, hoạt động mạnh hơn`);
    else if (mobAfter > mobBefore + 1) add(`tăng phạm vi hoạt động cho ${piece(moverType)}`);
    else if (relRank(to, us) < relRank(from, us)) add(`rút ${piece(moverType)} về để tái bố trí lực lượng`);
  }
  if (!reasons.length) {
    if (moverType === ROOK) add('điều Xe sang vị trí mới, chuẩn bị cho kế hoạch tiếp theo');
    else if (moverType === PAWN) add('nước chờ, củng cố cấu trúc Tốt');
    else if (mobAfter > mobBefore) add(`cải thiện vị trí cho ${piece(moverType)}`);
    else add('nước điều quân, chuẩn bị cho kế hoạch tiếp theo');
  }

  let warn = f.newlyHanging.length && !f.mate ? ` Lưu ý: nước này để ${listVi(f.newlyHanging.map((t) => `${piece(t.type)} ${t.sq}`))} không được bảo vệ đầy đủ.` : '';
  if (exposed && !f.check && !f.captured) warn += ` ${piece(moverType)} ở ${f.to} đang đứng ở ô bị đối phương tấn công.`;
  return { main, reasons, warn };
}

/** Hai Xe cùng ở hàng cuối và "nhìn thấy" nhau */
function rooksConnected(pos: Position, us: Color): boolean {
  const home = us === WHITE ? 0 : 7;
  const rooks = squaresOf(pos, (p, sq) => p === (ROOK | (us << 3)) && sqRank(sq) === home);
  if (rooks.length !== 2) return false;
  const [a, b] = rooks.map((s) => s & 7).sort((x, y) => x - y);
  for (let f = a + 1; f < b; f++) if (pos.board[(home << 4) | f]) return false;
  return true;
}

/** Đường nhập thành đã trống chưa (chỉ xét khi còn quyền nhập thành) */
function castlePaths(pos: Position, us: Color): { K: boolean; Q: boolean } {
  const home = us === WHITE ? 0 : 7;
  const kRight = us === WHITE ? pos.castling & 1 : pos.castling & 4;
  const qRight = us === WHITE ? pos.castling & 2 : pos.castling & 8;
  const empty = (files: number[]) => files.every((f) => !pos.board[(home << 4) | f]);
  return { K: !!kRight && empty([5, 6]), Q: !!qRight && empty([1, 2, 3]) };
}

/** Xe/Hậu xếp chồng với Xe/Hậu khác trên cùng cột hoặc hàng, không có quân chắn giữa */
function battery(pos: Position, sq: number): string | null {
  const p = pos.board[sq];
  const c = ((p >> 3) & 1) as Color;
  for (const d of ROOK_DIRS) {
    if ((d === 1 || d === -1) && relRank(sq, c) !== 6) continue; // theo hàng chỉ có ý nghĩa ở hàng 7
    let s = sq + d;
    while (!(s & 0x88)) {
      const q = pos.board[s];
      if (q) {
        if (((q >> 3) & 1) === c && ((q & 7) === ROOK || (q & 7) === QUEEN) && ((q & 7) === ROOK || (p & 7) === ROOK)) {
          const sameFile = d === 16 || d === -16;
          const both = (p & 7) === ROOK && (q & 7) === ROOK ? 'hai Xe' : 'Hậu và Xe';
          return `xếp ${both} thành khẩu đội trên ${sameFile ? `cột ${FILES[sq & 7]}` : `hàng ${(sq >> 4) + 1}`}`;
        }
        break;
      }
      s += d;
    }
  }
  return null;
}

function isOutpost(pos: Position, sq: number): boolean {
  const p = pos.board[sq];
  const c = ((p >> 3) & 1) as Color;
  const rel = relRank(sq, c);
  if (rel < 3 || rel > 5) return false;
  const ownPawn = PAWN | (c << 3);
  const s1 = sq + (c ? 15 : -15),
    s2 = sq + (c ? 17 : -17);
  const supported = (!(s1 & 0x88) && pos.board[s1] === ownPawn) || (!(s2 & 0x88) && pos.board[s2] === ownPawn);
  if (!supported) return false;
  const enemyPawn = PAWN | ((c ^ 1) << 3);
  const f = sq & 7;
  for (const ff of [f - 1, f + 1]) {
    if (ff < 0 || ff > 7) continue;
    // Tốt địch ở cột bên cạnh, phía trước Mã (theo hướng của nó) có thể tiến lên đuổi
    for (let r = 0; r < 8; r++) {
      const s = (r << 4) | ff;
      if (pos.board[s] !== enemyPawn) continue;
      if (c === WHITE ? r > sqRank(sq) : r < sqRank(sq)) return false;
    }
  }
  return true;
}

/** Tiện ích cho giao diện: giải thích nước thứ `idx` (0-based) của một chuỗi UCI từ `startFen` */
export function purposeAt(startFen: string, ucis: string[], idx: number): string {
  const pos = new Position(startFen);
  for (let i = 0; i < idx; i++) pos.make(pos.moveFromUci(ucis[i]));
  const m = pos.moveFromUci(ucis[idx]);
  if (!m) return '';
  return explainPurpose(pos, m, { prevUci: ucis[idx - 1], prevCapture: !!pos.lastCaptured() });
}

