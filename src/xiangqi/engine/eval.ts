// Lượng giá thế cờ tướng: vật chất theo giai đoạn (Pháo mạnh ở khai – trung cuộc, Mã mạnh ở tàn cuộc),
// bảng vị trí, linh hoạt của Xe và Mã, an toàn Tướng (thiếu Sĩ/Tượng khi đối phương còn quân tấn công),
// Pháo "không đầu" nhắm thẳng vào Tướng, Tốt qua sông và bên không còn quân tấn công thì không thể thắng.
import { Position, RED, ADVISOR, ELEPHANT, HORSE, ROOK, CANNON, PAWN, RAYS, HORSE_MOVES, crossedRiver } from './board';

// Bài học "Đổi quân và chuyển sang tàn cuộc" (data/lessons/chienLuoc.ts) trích các giá trị Mã/Pháo dưới đây – đổi thì sửa cả bài.
export const MG_VALUE = [0, 0, 200, 200, 400, 900, 450, 100];
export const EG_VALUE = [0, 0, 200, 200, 460, 920, 410, 100];

/** Viết bảng theo hàng từ trên xuống (hàng 9 = hàng cuối của đối phương … hàng 0 = hàng cuối của mình) */
function table(rows: number[][]): Int16Array {
  const t = new Int16Array(90);
  rows.forEach((row, ri) => {
    const y = 9 - ri;
    row.forEach((v, x) => (t[y * 9 + x] = v));
  });
  return t;
}

const Z = [0, 0, 0, 0, 0, 0, 0, 0, 0];

const PST_KING = table([Z, Z, Z, Z, Z, Z, Z, [0, 0, 0, -35, -30, -35, 0, 0, 0], [0, 0, 0, -15, -10, -15, 0, 0, 0], [0, 0, 0, 0, 10, 0, 0, 0, 0]]);
const PST_KING_EG = table([Z, Z, Z, Z, Z, Z, Z, [0, 0, 0, -10, -5, -10, 0, 0, 0], [0, 0, 0, 0, 5, 0, 0, 0, 0], [0, 0, 0, 0, 5, 0, 0, 0, 0]]);
const PST_ADVISOR = table([Z, Z, Z, Z, Z, Z, Z, [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 15, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]]);
const PST_ELEPHANT = table([Z, Z, Z, Z, Z, [0, 0, -5, 0, 0, 0, -5, 0, 0], Z, [-10, 0, 0, 0, 15, 0, 0, 0, -10], Z, [0, 0, 0, 0, 0, 0, 0, 0, 0]]);
const PST_HORSE = table([
  [-10, -5, 0, 15, 0, 15, 0, -5, -10],
  [0, 20, 50, 25, 10, 25, 50, 20, 0],
  [10, 30, 35, 50, 35, 50, 35, 30, 10],
  [15, 55, 40, 55, 40, 55, 40, 55, 15],
  [0, 40, 35, 50, 55, 50, 35, 40, 0],
  [0, 30, 40, 45, 50, 45, 40, 30, 0],
  [10, 15, 30, 20, 30, 20, 30, 15, 10],
  [10, 5, 20, 20, 5, 20, 20, 5, 10],
  [-20, 0, 5, 10, -40, 10, 5, 0, -20],
  [-10, -20, 0, -10, 0, -10, 0, -20, -10],
]);
const PST_ROOK = table([
  [20, 30, 25, 45, 50, 45, 25, 30, 20],
  [20, 45, 35, 60, 100, 60, 35, 45, 20],
  [20, 30, 25, 50, 60, 50, 25, 30, 20],
  [20, 50, 50, 60, 60, 60, 50, 50, 20],
  [30, 40, 40, 55, 60, 55, 40, 40, 30],
  [30, 45, 45, 55, 60, 55, 45, 45, 30],
  [10, 35, 10, 45, 55, 45, 10, 35, 10],
  [-10, 30, 10, 45, 45, 45, 10, 30, -10],
  [0, 30, 20, 45, 0, 45, 20, 30, 0],
  [-20, 20, 10, 45, 0, 45, 10, 20, -20],
]);
const PST_CANNON = table([
  [15, 15, 0, -15, -20, -15, 0, 15, 15],
  [10, 10, 0, -10, -25, -10, 0, 10, 10],
  [5, 5, 0, -15, -10, -15, 0, 5, 5],
  [0, 10, 10, 5, 15, 5, 10, 10, 0],
  [0, 0, 0, 0, 15, 0, 0, 0, 0],
  [-5, 0, 10, 0, 15, 0, 10, 0, -5],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [5, 0, 5, 10, 25, 10, 5, 0, 5],
  [0, 5, 10, 10, 10, 10, 10, 5, 0],
  [0, 0, 5, 10, 10, 10, 5, 0, 0],
]);
const PST_PAWN = table([
  [0, 0, 0, 10, 20, 10, 0, 0, 0],
  [45, 65, 105, 135, 145, 135, 105, 65, 45],
  [45, 65, 95, 115, 115, 115, 95, 65, 45],
  [45, 60, 75, 85, 90, 85, 75, 60, 45],
  [25, 40, 50, 70, 80, 70, 50, 40, 25],
  [-10, 0, 15, 0, 25, 0, 15, 0, -10],
  [-10, 0, -10, 0, 20, 0, -10, 0, -10],
  Z,
  Z,
  Z,
]);

const PST_MG: Int16Array[] = [new Int16Array(90), PST_KING, PST_ADVISOR, PST_ELEPHANT, PST_HORSE, PST_ROOK, PST_CANNON, PST_PAWN];
const PST_EG: Int16Array[] = [new Int16Array(90), PST_KING_EG, PST_ADVISOR, PST_ELEPHANT, PST_HORSE, PST_ROOK, PST_CANNON, PST_PAWN];

/** Ô tương ứng khi nhìn từ phía Đen (lật dọc) */
const MIRROR = new Int8Array(90);
for (let sq = 0; sq < 90; sq++) MIRROR[sq] = (9 - ((sq / 9) | 0)) * 9 + (sq % 9);

/** Trọng số giai đoạn: Xe 4, Mã 2, Pháo 2 – đầy đủ quân = 32 */
const PHASE_W = [0, 0, 0, 0, 2, 4, 2, 0];
const PHASE_MAX = 32;

export type EvalMode = 'full' | 'simple' | 'material';

export function evaluateMaterial(pos: Position): number {
  let s = 0;
  const b = pos.board;
  for (let sq = 0; sq < 90; sq++) {
    const p = b[sq];
    if (!p) continue;
    const t = p & 7;
    const c = (p >> 3) & 1;
    let v = MG_VALUE[t];
    if (t === PAWN && crossedRiver((sq / 9) | 0, c as 0 | 1)) v = 200;
    s += c === RED ? v : -v;
  }
  return pos.side === RED ? s : -s;
}

export function evaluateSimple(pos: Position): number {
  let mg = 0,
    eg = 0,
    phase = 0;
  const b = pos.board;
  for (let sq = 0; sq < 90; sq++) {
    const p = b[sq];
    if (!p) continue;
    const t = p & 7;
    const red = !(p & 8);
    const i = red ? sq : MIRROR[sq];
    phase += PHASE_W[t];
    if (red) {
      mg += MG_VALUE[t] + PST_MG[t][i];
      eg += EG_VALUE[t] + PST_EG[t][i];
    } else {
      mg -= MG_VALUE[t] + PST_MG[t][i];
      eg -= EG_VALUE[t] + PST_EG[t][i];
    }
  }
  if (phase > PHASE_MAX) phase = PHASE_MAX;
  const s = ((mg * phase + eg * (PHASE_MAX - phase)) / PHASE_MAX) | 0;
  return pos.side === RED ? s : -s;
}

export interface EvalBreakdown {
  material: number;
  position: number;
  mobility: number;
  kingSafety: number;
  attack: number;
}

/** Lượng giá đầy đủ, theo góc nhìn bên đến lượt (centipawn, Tốt chưa qua sông = 100) */
export function evaluate(pos: Position, bd?: EvalBreakdown): number {
  const b = pos.board;
  let mg = 0,
    eg = 0,
    phase = 0;
  let matMg = 0;
  let mob = 0;
  // thống kê theo bên: [Đỏ, Đen]
  const adv = [0, 0],
    ele = [0, 0],
    rooks = [0, 0],
    horses = [0, 0],
    cannons = [0, 0],
    crossed = [0, 0],
    attackers = [0, 0];
  for (let sq = 0; sq < 90; sq++) {
    const p = b[sq];
    if (!p) continue;
    const t = p & 7;
    const c = (p >> 3) & 1;
    const sign = c === RED ? 1 : -1;
    const i = c === RED ? sq : MIRROR[sq];
    phase += PHASE_W[t];
    mg += sign * (MG_VALUE[t] + PST_MG[t][i]);
    eg += sign * (EG_VALUE[t] + PST_EG[t][i]);
    matMg += sign * MG_VALUE[t];
    switch (t) {
      case ADVISOR:
        adv[c]++;
        break;
      case ELEPHANT:
        ele[c]++;
        break;
      case ROOK: {
        rooks[c]++;
        attackers[c]++;
        let n = 0;
        const rays = RAYS[sq];
        for (let d = 0; d < 4; d++) {
          const ray = rays[d];
          for (let k = 0; k < ray.length; k++) {
            const q = b[ray[k]];
            if (!q) n++;
            else {
              if ((q & 8) !== (p & 8)) n++;
              break;
            }
          }
        }
        mob += sign * (n - 6) * 3;
        break;
      }
      case HORSE: {
        horses[c]++;
        attackers[c]++;
        let n = 0;
        const hm = HORSE_MOVES[sq];
        for (let k = 0; k < hm.length; k++) {
          if (b[hm[k][1]]) continue;
          const q = b[hm[k][0]];
          if (!q || (q & 8) !== (p & 8)) n++;
        }
        mob += sign * (n <= 1 ? -25 : (n - 3) * 6);
        break;
      }
      case CANNON:
        cannons[c]++;
        attackers[c]++;
        break;
      case PAWN:
        attackers[c]++;
        if (crossedRiver((sq / 9) | 0, c as 0 | 1)) crossed[c]++;
        break;
    }
  }
  if (phase > PHASE_MAX) phase = PHASE_MAX;

  // An toàn Tướng: thiếu Sĩ/Tượng càng nguy hiểm khi đối phương còn nhiều quân tấn công
  let safety = 0;
  let attack = 0;
  for (let c = 0; c < 2; c++) {
    const e = c ^ 1;
    const power = rooks[e] * 4 + horses[e] * 2 + cannons[e] * 2 + crossed[e];
    const pen = (2 - adv[c]) * power * 3 + (2 - ele[c]) * power * 2;
    safety += c === RED ? -pen : pen;

    // Pháo "không đầu": Pháo đối phương cùng cột với Tướng, ở giữa không có quân nào
    const k = pos.kingSq[c];
    if (k < 0) continue;
    const ray = RAYS[k][c === RED ? 0 : 1];
    for (let j = 0; j < ray.length; j++) {
      const q = b[ray[j]];
      if (!q) continue;
      if ((q & 7) === CANNON && ((q >> 3) & 1) === e) {
        const bonus = 40 + 15 * (rooks[e] + horses[e]);
        attack += e === RED ? bonus : -bonus;
      }
      break;
    }
  }

  let s = ((mg * phase + eg * (PHASE_MAX - phase)) / PHASE_MAX) | 0;
  s += mob + safety + attack;
  // bên không còn quân tấn công thì không thể thắng; một số tàn cuộc ít quân phần lớn là hòa
  s = scaleDrawish(s, 0, rooks, horses, cannons, attackers, adv, ele);
  s = -scaleDrawish(-s, 1, rooks, horses, cannons, attackers, adv, ele);
  if (bd) {
    bd.material = matMg;
    bd.position = (((mg - matMg) * phase + (eg - matMg) * (PHASE_MAX - phase)) / PHASE_MAX) | 0;
    bd.mobility = mob;
    bd.kingSafety = safety;
    bd.attack = attack;
  }
  s += pos.side === RED ? 10 : -10; // quyền đi trước
  return pos.side === RED ? s : -s;
}

/**
 * Thu nhỏ ưu thế (điểm `s` theo góc nhìn bên `c`, chỉ xét khi s > 0) ở những tàn cuộc mà bên mạnh hầu như không thắng được:
 * không còn quân tấn công; Pháo đơn không có Sĩ làm ngòi (Pháo đơn, Pháo + Tượng đối Tướng đơn đều hòa);
 * Mã đơn trước hai quân phòng thủ; Xe đơn đối Sĩ Tượng toàn; một Tốt trước Sĩ hoặc Tượng.
 */
function scaleDrawish(s: number, c: number, rooks: number[], horses: number[], cannons: number[], attackers: number[], adv: number[], ele: number[]): number {
  if (s <= 0) return s;
  const e = c ^ 1;
  if (attackers[c] === 0) return s >> 3;
  const pawns = attackers[c] - rooks[c] - horses[c] - cannons[c];
  const defenders = adv[e] + ele[e];
  const onlyOne = attackers[c] === 1;
  if (onlyOne && cannons[c] === 1 && adv[c] === 0) return s >> 3;
  if (onlyOne && horses[c] === 1 && defenders >= 2) return s >> 2;
  if (onlyOne && rooks[c] === 1 && defenders >= 4 && attackers[e] === 0) return s >> 1;
  if (onlyOne && pawns === 1 && defenders >= 1) return s >> 2;
  return s;
}

export function evaluateBy(mode: EvalMode, pos: Position): number {
  return mode === 'full' ? evaluate(pos) : mode === 'simple' ? evaluateSimple(pos) : evaluateMaterial(pos);
}

/** Tổng giá trị quân tấn công (Xe, Mã, Pháo) của một bên – dùng cho cắt tỉa nước đi rỗng */
export function majorMaterial(pos: Position, color: number): number {
  let s = 0;
  const b = pos.board;
  for (let sq = 0; sq < 90; sq++) {
    const p = b[sq];
    if (p && ((p >> 3) & 1) === color) {
      const t = p & 7;
      if (t === ROOK || t === HORSE || t === CANNON) s += MG_VALUE[t];
    }
  }
  return s;
}

