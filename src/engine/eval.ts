// Hàm lượng giá thế cờ (centipawn, theo góc nhìn bên đến lượt đi).
// Gồm: vật chất + bảng vị trí (chuyển dần từ trung cuộc sang tàn cuộc), cấu trúc tốt, tốt thông,
// độ linh hoạt, Xe ở cột mở, tiền đồn của Mã, cặp Tượng, an toàn Vua và kỹ thuật dồn Vua ở tàn cuộc.
import { Position, WHITE, BLACK, PAWN, KNIGHT, BISHOP, ROOK, QUEEN, KING } from './board';

export const MG_VALUE = [0, 100, 320, 335, 490, 950, 0];
export const EG_VALUE = [0, 120, 300, 315, 530, 960, 0];
const PHASE_INC = [0, 0, 1, 1, 2, 4, 0];

// Bảng vị trí viết theo góc nhìn Trắng, hàng 8 ở trên cùng.
// prettier-ignore
const PST_MG: number[][] = [
  [],
  [ // Tốt
     0,  0,  0,  0,  0,  0,  0,  0,
    50, 50, 50, 50, 50, 50, 50, 50,
    10, 10, 20, 30, 30, 20, 10, 10,
     5,  5, 10, 25, 25, 10,  5,  5,
     0,  0,  5, 20, 20,  0,  0,  0,
     5, -5,-10,  0,  0,-10, -5,  5,
     5, 10, 10,-20,-20, 10, 10,  5,
     0,  0,  0,  0,  0,  0,  0,  0],
  [ // Mã
   -50,-40,-30,-30,-30,-30,-40,-50,
   -40,-20,  0,  0,  0,  0,-20,-40,
   -30,  0, 10, 15, 15, 10,  0,-30,
   -30,  5, 15, 20, 20, 15,  5,-30,
   -30,  0, 15, 20, 20, 15,  0,-30,
   -30,  5, 10, 15, 15, 10,  5,-30,
   -40,-20,  0,  5,  5,  0,-20,-40,
   -50,-40,-30,-30,-30,-30,-40,-50],
  [ // Tượng
   -20,-10,-10,-10,-10,-10,-10,-20,
   -10,  0,  0,  0,  0,  0,  0,-10,
   -10,  0,  5, 10, 10,  5,  0,-10,
   -10,  5,  5, 10, 10,  5,  5,-10,
   -10,  0, 10, 10, 10, 10,  0,-10,
   -10, 10, 10, 10, 10, 10, 10,-10,
   -10,  5,  0,  0,  0,  0,  5,-10,
   -20,-10,-10,-10,-10,-10,-10,-20],
  [ // Xe
     0,  0,  0,  0,  0,  0,  0,  0,
     5, 10, 10, 10, 10, 10, 10,  5,
    -5,  0,  0,  0,  0,  0,  0, -5,
    -5,  0,  0,  0,  0,  0,  0, -5,
    -5,  0,  0,  0,  0,  0,  0, -5,
    -5,  0,  0,  0,  0,  0,  0, -5,
    -5,  0,  0,  0,  0,  0,  0, -5,
     0,  0,  0,  5,  5,  0,  0,  0],
  [ // Hậu
   -20,-10,-10, -5, -5,-10,-10,-20,
   -10,  0,  0,  0,  0,  0,  0,-10,
   -10,  0,  5,  5,  5,  5,  0,-10,
    -5,  0,  5,  5,  5,  5,  0, -5,
     0,  0,  5,  5,  5,  5,  0, -5,
   -10,  5,  5,  5,  5,  5,  0,-10,
   -10,  0,  5,  0,  0,  0,  0,-10,
   -20,-10,-10, -5, -5,-10,-10,-20],
  [ // Vua (trung cuộc)
   -30,-40,-40,-50,-50,-40,-40,-30,
   -30,-40,-40,-50,-50,-40,-40,-30,
   -30,-40,-40,-50,-50,-40,-40,-30,
   -30,-40,-40,-50,-50,-40,-40,-30,
   -20,-30,-30,-40,-40,-30,-30,-20,
   -10,-20,-20,-20,-20,-20,-20,-10,
    20, 20,  0,  0,  0,  0, 20, 20,
    20, 30, 10,  0,  0, 10, 30, 20],
];

// prettier-ignore
const PST_EG: number[][] = [
  [],
  [ // Tốt: càng tiến càng quý
     0,  0,  0,  0,  0,  0,  0,  0,
    80, 80, 80, 80, 80, 80, 80, 80,
    50, 50, 50, 50, 50, 50, 50, 50,
    30, 30, 30, 30, 30, 30, 30, 30,
    15, 15, 15, 15, 15, 15, 15, 15,
     5,  5,  5,  5,  5,  5,  5,  5,
     0,  0,  0,  0,  0,  0,  0,  0,
     0,  0,  0,  0,  0,  0,  0,  0],
  [
   -50,-40,-30,-30,-30,-30,-40,-50,
   -40,-20,  0,  0,  0,  0,-20,-40,
   -30,  0, 10, 15, 15, 10,  0,-30,
   -30,  5, 15, 20, 20, 15,  5,-30,
   -30,  0, 15, 20, 20, 15,  0,-30,
   -30,  5, 10, 15, 15, 10,  5,-30,
   -40,-20,  0,  5,  5,  0,-20,-40,
   -50,-40,-30,-30,-30,-30,-40,-50],
  [
   -20,-10,-10,-10,-10,-10,-10,-20,
   -10,  0,  0,  0,  0,  0,  0,-10,
   -10,  0,  5, 10, 10,  5,  0,-10,
   -10,  5, 10, 15, 15, 10,  5,-10,
   -10,  5, 10, 15, 15, 10,  5,-10,
   -10,  0,  5, 10, 10,  5,  0,-10,
   -10,  0,  0,  0,  0,  0,  0,-10,
   -20,-10,-10,-10,-10,-10,-10,-20],
  [
     0,  0,  0,  0,  0,  0,  0,  0,
     5,  5,  5,  5,  5,  5,  5,  5,
     0,  0,  0,  0,  0,  0,  0,  0,
     0,  0,  0,  0,  0,  0,  0,  0,
     0,  0,  0,  0,  0,  0,  0,  0,
     0,  0,  0,  0,  0,  0,  0,  0,
     0,  0,  0,  0,  0,  0,  0,  0,
     0,  0,  0,  0,  0,  0,  0,  0],
  [
   -20,-10,-10, -5, -5,-10,-10,-20,
   -10,  0,  5,  5,  5,  5,  0,-10,
   -10,  5, 10, 10, 10, 10,  5,-10,
    -5,  5, 10, 15, 15, 10,  5, -5,
    -5,  5, 10, 15, 15, 10,  5, -5,
   -10,  5, 10, 10, 10, 10,  5,-10,
   -10,  0,  5,  5,  5,  5,  0,-10,
   -20,-10,-10, -5, -5,-10,-10,-20],
  [ // Vua (tàn cuộc): ra trung tâm
   -50,-40,-30,-20,-20,-30,-40,-50,
   -30,-20,-10,  0,  0,-10,-20,-30,
   -30,-10, 20, 30, 30, 20,-10,-30,
   -30,-10, 30, 40, 40, 30,-10,-30,
   -30,-10, 30, 40, 40, 30,-10,-30,
   -30,-10, 20, 30, 30, 20,-10,-30,
   -30,-30,  0,  0,  0,  0,-30,-30,
   -50,-30,-30,-30,-30,-30,-30,-50],
];

// Bảng tra theo mã quân (gồm màu) và ô 0x88: giá trị vật chất + vị trí, dấu dương cho Trắng.
const MG_TABLE = new Int16Array(16 * 128);
const EG_TABLE = new Int16Array(16 * 128);
for (let t = PAWN; t <= KING; t++) {
  for (let r = 0; r < 8; r++) {
    for (let f = 0; f < 8; f++) {
      const sq = (r << 4) | f;
      const wIdx = (7 - r) * 8 + f;
      const bIdx = r * 8 + f;
      MG_TABLE[(t << 7) | sq] = MG_VALUE[t] + PST_MG[t][wIdx];
      EG_TABLE[(t << 7) | sq] = EG_VALUE[t] + PST_EG[t][wIdx];
      MG_TABLE[((t | 8) << 7) | sq] = -(MG_VALUE[t] + PST_MG[t][bIdx]);
      EG_TABLE[((t | 8) << 7) | sq] = -(EG_VALUE[t] + PST_EG[t][bIdx]);
    }
  }
}

const PASSED_MG = [0, 5, 10, 15, 25, 45, 70, 0];
const PASSED_EG = [0, 10, 20, 35, 60, 95, 140, 0];
const KNIGHT_OFFS = [-33, -31, -18, -14, 14, 18, 31, 33];
const BISHOP_DIRS = [-17, -15, 15, 17];
const ROOK_DIRS = [-16, -1, 1, 16];
const ALL_DIRS = [-17, -16, -15, -1, 1, 15, 16, 17];
const ATTACK_WEIGHT = [0, 0, 2, 2, 3, 5, 0];

const dist = (a: number, b: number) => Math.max(Math.abs((a >> 4) - (b >> 4)), Math.abs((a & 7) - (b & 7)));
const centerDist = (sq: number) => {
  const r = sq >> 4,
    f = sq & 7;
  return Math.max(3 - Math.min(r, 7 - r), 3 - Math.min(f, 7 - f));
};

export type EvalMode = 'full' | 'simple' | 'material';

export function evaluateMaterial(pos: Position): number {
  let s = 0;
  const b = pos.board;
  for (let sq = 0; sq < 128; sq++) {
    if (sq & 0x88) {
      sq += 7;
      continue;
    }
    const p = b[sq];
    if (!p) continue;
    const v = MG_VALUE[p & 7];
    s += p & 8 ? -v : v;
  }
  return pos.side === WHITE ? s : -s;
}

/** Thưởng cho bên hơn quân khi dồn Vua địch vào góc và đưa Vua mình lại gần (kỹ thuật chiếu hết tàn cuộc) */
function mopUp(pos: Position, matDiff: number, phase: number): number {
  if (Math.abs(matDiff) < 300 || phase > 10) return 0;
  const strong = matDiff > 0 ? WHITE : BLACK;
  const weakK = pos.kingSq[strong ^ 1];
  const strongK = pos.kingSq[strong];
  const mop = centerDist(weakK) * 12 + (14 - dist(weakK, strongK) * 2) * 4;
  return strong === WHITE ? mop : -mop;
}

/** Vật chất + bảng vị trí (dùng cho máy cấp thấp) */
export function evaluateSimple(pos: Position): number {
  let mg = 0,
    eg = 0,
    phase = 0,
    mat = 0;
  const b = pos.board;
  for (let sq = 0; sq < 128; sq++) {
    if (sq & 0x88) {
      sq += 7;
      continue;
    }
    const p = b[sq];
    if (!p) continue;
    mg += MG_TABLE[(p << 7) | sq];
    eg += EG_TABLE[(p << 7) | sq];
    phase += PHASE_INC[p & 7];
    mat += p & 8 ? -MG_VALUE[p & 7] : MG_VALUE[p & 7];
  }
  if (phase > 24) phase = 24;
  const s = (((mg * phase + eg * (24 - phase)) / 24) | 0) + mopUp(pos, mat, phase);
  return pos.side === WHITE ? s : -s;
}

// Bộ đệm dùng lại để tránh cấp phát
const pawnCount = [new Int8Array(8), new Int8Array(8)];
const pawnMinRank = [new Int8Array(8), new Int8Array(8)];
const pawnMaxRank = [new Int8Array(8), new Int8Array(8)];
const pieceSqs = new Int16Array(32);

export interface EvalBreakdown {
  material: number;
  position: number;
  pawns: number;
  mobility: number;
  kingSafety: number;
  total: number;
}

/** Lượng giá đầy đủ. Nếu truyền `bd` sẽ ghi chi tiết (góc nhìn Trắng) để giải thích cho người học. */
export function evaluate(pos: Position, bd?: EvalBreakdown): number {
  const b = pos.board;
  let mg = 0,
    eg = 0,
    phase = 0;
  let materialW = 0;
  const bishops = [0, 0];
  const nonPawn = [0, 0];
  const queens = [0, 0];
  const pawnsTotal = [0, 0];
  const bishopSqColor = [-1, -1];
  for (let c = 0; c < 2; c++) {
    pawnCount[c].fill(0);
    pawnMinRank[c].fill(8);
    pawnMaxRank[c].fill(-1);
  }
  let nPieces = 0;

  for (let sq = 0; sq < 128; sq++) {
    if (sq & 0x88) {
      sq += 7;
      continue;
    }
    const p = b[sq];
    if (!p) continue;
    const t = p & 7;
    const c = (p >> 3) & 1;
    mg += MG_TABLE[(p << 7) | sq];
    eg += EG_TABLE[(p << 7) | sq];
    phase += PHASE_INC[t];
    materialW += c ? -MG_VALUE[t] : MG_VALUE[t];
    if (t === PAWN) {
      const f = sq & 7,
        r = sq >> 4;
      pawnCount[c][f]++;
      if (r < pawnMinRank[c][f]) pawnMinRank[c][f] = r;
      if (r > pawnMaxRank[c][f]) pawnMaxRank[c][f] = r;
      pawnsTotal[c]++;
    } else if (t !== KING) {
      nonPawn[c] += MG_VALUE[t];
      if (t === BISHOP) {
        bishops[c]++;
        bishopSqColor[c] = ((sq >> 4) + (sq & 7)) & 1;
      }
      if (t === QUEEN) queens[c]++;
      pieceSqs[nPieces++] = sq;
    }
  }
  if (phase > 24) phase = 24;
  const psqMg = mg,
    psqEg = eg;

  // ---- Cấu trúc tốt ----
  let pawnMg = 0,
    pawnEg = 0;
  const wk = pos.kingSq[WHITE],
    bk = pos.kingSq[BLACK];
  for (let sq = 0; sq < 128; sq++) {
    if (sq & 0x88) {
      sq += 7;
      continue;
    }
    const p = b[sq];
    if ((p & 7) !== PAWN) continue;
    const c = (p >> 3) & 1;
    const sign = c ? -1 : 1;
    const f = sq & 7,
      r = sq >> 4;
    const them = c ^ 1;
    // tốt cô lập
    const left = f > 0 ? pawnCount[c][f - 1] : 0;
    const right = f < 7 ? pawnCount[c][f + 1] : 0;
    if (!left && !right) {
      pawnMg -= 12 * sign;
      pawnEg -= 18 * sign;
    }
    // tốt thông
    let passed = true;
    for (let ff = Math.max(0, f - 1); ff <= Math.min(7, f + 1); ff++) {
      if (c === WHITE) {
        if (pawnMaxRank[them][ff] > r) {
          passed = false;
          break;
        }
      } else if (pawnMinRank[them][ff] < r && pawnMinRank[them][ff] !== 8) {
        passed = false;
        break;
      }
    }
    if (passed) {
      const rel = c === WHITE ? r : 7 - r;
      pawnMg += PASSED_MG[rel] * sign;
      let egBonus = PASSED_EG[rel];
      const promoSq = c === WHITE ? 0x70 | f : f;
      const ownK = c === WHITE ? wk : bk;
      const oppK = c === WHITE ? bk : wk;
      egBonus += (dist(oppK, promoSq) * 5 - dist(ownK, promoSq) * 2) * (rel >= 3 ? rel - 2 : 0);
      // quy tắc hình vuông: đối phương chỉ còn Vua và tốt
      if (nonPawn[them] === 0) {
        const stepsToPromote = 7 - rel - (rel === 1 ? 1 : 0);
        const kd = dist(oppK, promoSq) - (pos.side === them ? 1 : 0);
        if (kd > stepsToPromote) egBonus += 400;
      }
      // tốt thông bị chặn
      const front = sq + (c === WHITE ? 16 : -16);
      if (!(front & 0x88) && b[front]) egBonus = (egBonus * 2) / 3;
      pawnEg += egBonus * sign;
    }
  }
  for (let c = 0; c < 2; c++) {
    const sign = c ? -1 : 1;
    for (let f = 0; f < 8; f++) {
      if (pawnCount[c][f] > 1) {
        pawnMg -= 10 * (pawnCount[c][f] - 1) * sign;
        pawnEg -= 22 * (pawnCount[c][f] - 1) * sign;
      }
    }
  }
  mg += pawnMg;
  eg += pawnEg;

  // ---- Độ linh hoạt, Xe, Mã tiền đồn, tấn công Vua ----
  let mobMg = 0,
    mobEg = 0;
  const attackWeight = [0, 0];
  const attackers = [0, 0];
  for (let i = 0; i < nPieces; i++) {
    const sq = pieceSqs[i];
    const p = b[sq];
    const t = p & 7;
    const c = (p >> 3) & 1;
    const sign = c ? -1 : 1;
    const enemyK = c ? wk : bk;
    let mob = 0;
    let kAtt = 0;
    if (t === KNIGHT) {
      const enemyPawn = c ? PAWN : PAWN | 8;
      for (let k = 0; k < 8; k++) {
        const to = sq + KNIGHT_OFFS[k];
        if (to & 0x88) continue;
        const q = b[to];
        if (q && ((q >> 3) & 1) === c) continue;
        // bỏ qua ô bị tốt địch khống chế
        const a1 = c ? to - 15 : to + 15,
          a2 = c ? to - 17 : to + 17;
        if ((!(a1 & 0x88) && b[a1] === enemyPawn) || (!(a2 & 0x88) && b[a2] === enemyPawn)) continue;
        mob++;
        if (dist(to, enemyK) <= 1) kAtt++;
      }
      mobMg += (mob - 4) * 4 * sign;
      mobEg += (mob - 4) * 4 * sign;
      // tiền đồn: hàng tương đối 4-6, được tốt bảo vệ, tốt địch không thể đuổi
      const rel = c ? 7 - (sq >> 4) : sq >> 4;
      if (rel >= 3 && rel <= 5) {
        const f = sq & 7;
        const ownPawn = c ? PAWN | 8 : PAWN;
        const s1 = sq + (c ? 15 : -15),
          s2 = sq + (c ? 17 : -17);
        const supported = (!(s1 & 0x88) && b[s1] === ownPawn) || (!(s2 & 0x88) && b[s2] === ownPawn);
        if (supported) {
          let canKick = false;
          const them = c ^ 1;
          for (const ff of [f - 1, f + 1]) {
            if (ff < 0 || ff > 7) continue;
            if (c === WHITE ? pawnMaxRank[them][ff] > sq >> 4 : pawnMinRank[them][ff] < sq >> 4 && pawnMinRank[them][ff] !== 8) canKick = true;
          }
          if (!canKick) mobMg += 22 * sign;
        }
      }
    } else {
      const dirs = t === BISHOP ? BISHOP_DIRS : t === ROOK ? ROOK_DIRS : ALL_DIRS;
      for (let k = 0; k < dirs.length; k++) {
        const d = dirs[k];
        let to = sq + d;
        while (!(to & 0x88)) {
          const q = b[to];
          if (q && ((q >> 3) & 1) === c) break;
          mob++;
          if (dist(to, enemyK) <= 1) kAtt++;
          if (q) break;
          to += d;
        }
      }
      if (t === BISHOP) {
        mobMg += (mob - 6) * 5 * sign;
        mobEg += (mob - 6) * 5 * sign;
      } else if (t === ROOK) {
        mobMg += (mob - 7) * 2 * sign;
        mobEg += (mob - 7) * 4 * sign;
        const f = sq & 7;
        if (!pawnCount[c][f]) {
          if (!pawnCount[c ^ 1][f]) {
            mobMg += 25 * sign;
            mobEg += 10 * sign;
          } else {
            mobMg += 12 * sign;
            mobEg += 6 * sign;
          }
        }
        const rel = c ? 7 - (sq >> 4) : sq >> 4;
        const enemyKRel = c ? 7 - (enemyK >> 4) : enemyK >> 4;
        if (rel === 6 && enemyKRel === 7) {
          mobMg += 20 * sign;
          mobEg += 30 * sign;
        }
      } else {
        mobMg += (mob - 13) * 1 * sign;
        mobEg += (mob - 13) * 2 * sign;
      }
    }
    if (kAtt) {
      attackers[c]++;
      attackWeight[c] += ATTACK_WEIGHT[t] * kAtt;
    }
  }
  mg += mobMg;
  eg += mobEg;

  // cặp Tượng
  if (bishops[WHITE] >= 2) {
    mg += 30;
    eg += 50;
  }
  if (bishops[BLACK] >= 2) {
    mg -= 30;
    eg -= 50;
  }

  // ---- An toàn Vua (chỉ trung cuộc) ----
  let ksMg = 0;
  for (let c = 0; c < 2; c++) {
    const sign = c ? -1 : 1;
    const k = pos.kingSq[c];
    const kf = k & 7;
    const kr = k >> 4;
    const ownPawn = c ? PAWN | 8 : PAWN;
    const dir = c ? -16 : 16;
    let shield = 0;
    const relRank = c ? 7 - kr : kr;
    if (relRank <= 1) {
      for (let f = Math.max(0, kf - 1); f <= Math.min(7, kf + 1); f++) {
        const s1 = k + dir + (f - kf);
        const s2 = s1 + dir;
        if (!(s1 & 0x88) && b[s1] === ownPawn) shield += 12;
        else if (!(s2 & 0x88) && b[s2] === ownPawn) shield += 6;
        else {
          shield -= 8;
          if (!pawnCount[c][f]) shield -= pawnCount[c ^ 1][f] ? 8 : 15;
        }
      }
    } else if (queens[c ^ 1]) {
      shield -= 20 + relRank * 8; // Vua bị kéo ra giữa bàn khi Hậu địch còn
    }
    ksMg += shield * sign;
    // bị tấn công: số quân địch × trọng số
    const enemy = c ^ 1;
    if (attackers[enemy] >= 2) {
      let danger = attackWeight[enemy] * attackers[enemy] * 3;
      if (!queens[enemy]) danger >>= 1;
      if (danger > 500) danger = 500;
      ksMg -= danger * sign;
    }
  }
  mg += ksMg;

  // nhịp đi
  mg += pos.side === WHITE ? 10 : -10;

  let score = ((mg * phase + eg * (24 - phase)) / 24) | 0;

  // ---- Tàn cuộc: dồn Vua địch vào góc khi hơn nhiều quân ----
  score += mopUp(pos, nonPawn[WHITE] + pawnsTotal[WHITE] * 100 - (nonPawn[BLACK] + pawnsTotal[BLACK] * 100), phase);

  // ---- Hệ số hòa ----
  const strongSide = score > 0 ? WHITE : BLACK;
  if (pawnsTotal[strongSide] === 0 && nonPawn[strongSide] - nonPawn[strongSide ^ 1] < 400) {
    score = (score / 8) | 0; // chỉ hơn một quân nhẹ không đủ chiếu hết
  } else if (
    bishops[WHITE] === 1 &&
    bishops[BLACK] === 1 &&
    nonPawn[WHITE] === MG_VALUE[BISHOP] &&
    nonPawn[BLACK] === MG_VALUE[BISHOP] &&
    bishopSqColor[WHITE] !== bishopSqColor[BLACK]
  ) {
    score = (score / 2) | 0; // Tượng khác màu
  }
  if (!pawnsTotal[WHITE] && !pawnsTotal[BLACK] && nonPawn[WHITE] <= MG_VALUE[BISHOP] && nonPawn[BLACK] <= MG_VALUE[BISHOP]) score = 0;

  if (bd) {
    bd.material = materialW;
    bd.position = (((psqMg - 0) * phase + (psqEg - 0) * (24 - phase)) / 24 - materialW) | 0;
    bd.pawns = ((pawnMg * phase + pawnEg * (24 - phase)) / 24) | 0;
    bd.mobility = ((mobMg * phase + mobEg * (24 - phase)) / 24) | 0;
    bd.kingSafety = ((ksMg * phase) / 24) | 0;
    bd.total = score;
  }
  return pos.side === WHITE ? score : -score;
}

export function evaluateBy(mode: EvalMode, pos: Position): number {
  return mode === 'full' ? evaluate(pos) : mode === 'simple' ? evaluateSimple(pos) : evaluateMaterial(pos);
}
