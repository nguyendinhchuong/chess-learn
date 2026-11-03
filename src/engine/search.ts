// Tìm kiếm: lặp sâu dần + negamax alpha-beta (PVS), bảng chuyển vị, tìm kiếm tĩnh (quiescence),
// cắt tỉa nước đi rỗng, giảm độ sâu nước muộn (LMR), nước sát thủ (killer) và bảng lịch sử.
import { Position, F_CAPTURE, F_EP, F_PROMO, PIECE_VALUE, PAWN, QUEEN, KING } from './board';
import { EvalMode, evaluate, evaluateMaterial, evaluateSimple } from './eval';

export const INF = 32000;
export const MATE = 30000;
export const MATE_BOUND = MATE - 1000;
const MAX_PLY = 96;

const TT_BITS = 20;
const TT_SIZE = 1 << TT_BITS;
const TT_MASK = TT_SIZE - 1;
const TT_EXACT = 1,
  TT_LOWER = 2,
  TT_UPPER = 3;

const LMR = new Int8Array(64 * 64);
for (let d = 1; d < 64; d++) for (let m = 1; m < 64; m++) LMR[d * 64 + m] = Math.floor(0.75 + (Math.log(d) * Math.log(m)) / 2.25);

const now = () => (typeof performance !== 'undefined' ? performance.now() : Date.now());

export interface SearchOptions {
  maxDepth?: number;
  timeMs?: number;
  nodes?: number;
  multiPV?: number;
  /** Chỉ xét các nước này ở gốc (giống "go searchmoves" của UCI) */
  rootMoves?: number[];
  evalMode?: EvalMode;
  quiescence?: boolean;
  onIteration?: (r: SearchResult) => void;
}

export interface SearchLine {
  move: number;
  /** Điểm theo góc nhìn bên đến lượt đi (centipawn, chiếu hết = ±(MATE - ply)) */
  score: number;
  pv: number[];
}

export interface SearchResult {
  lines: SearchLine[];
  depth: number;
  nodes: number;
  timeMs: number;
}

export class Searcher {
  private pos!: Position;
  nodes = 0;
  private stopped = false;
  private canStop = false;
  private deadline = Infinity;
  private nodeLimit = Infinity;
  private evalFn: (p: Position) => number = evaluate;
  private useQ = true;

  private ttKey = new Int32Array(TT_SIZE);
  private ttMove = new Int32Array(TT_SIZE);
  private ttScore = new Int16Array(TT_SIZE);
  private ttDepth = new Int8Array(TT_SIZE);
  private ttFlag = new Uint8Array(TT_SIZE);

  private killers = new Int32Array(MAX_PLY * 2);
  private history = new Int32Array(16 * 128);
  private pvTable = new Int32Array(MAX_PLY * MAX_PLY);
  private pvLen = new Int32Array(MAX_PLY);
  private moveBuf = new Int32Array(MAX_PLY * 256);
  private scoreBuf = new Int32Array(MAX_PLY * 256);

  clearTT() {
    this.ttFlag.fill(0);
    this.history.fill(0);
  }

  search(pos: Position, opts: SearchOptions = {}): SearchResult {
    const start = now();
    this.pos = pos;
    this.nodes = 0;
    this.stopped = false;
    this.canStop = false;
    this.deadline = opts.timeMs ? start + opts.timeMs : Infinity;
    this.nodeLimit = opts.nodes ?? Infinity;
    const mode = opts.evalMode ?? 'full';
    this.evalFn = mode === 'full' ? evaluate : mode === 'simple' ? evaluateSimple : evaluateMaterial;
    this.useQ = opts.quiescence ?? true;
    this.killers.fill(0);
    for (let i = 0; i < this.history.length; i++) this.history[i] >>= 3;
    const maxDepth = Math.min(opts.maxDepth ?? 64, MAX_PLY - 10);

    const legal = opts.rootMoves ? pos.legalMoves().filter((m) => opts.rootMoves!.includes(m)) : pos.legalMoves();
    const result: SearchResult = { lines: [], depth: 0, nodes: 0, timeMs: 0 };
    if (!legal.length) return result;

    // sắp xếp ban đầu: nước trong bảng chuyển vị, bắt quân giá trị cao trước
    const ttIdx = pos.hashLo & TT_MASK;
    const ttm = this.ttKey[ttIdx] === pos.hashHi && this.ttFlag[ttIdx] ? this.ttMove[ttIdx] : 0;
    const root = legal.map((m) => ({ move: m, score: -INF, pv: [m] as number[], order: m === ttm ? 1e9 : this.captureScore(m) }));
    root.sort((a, b) => b.order - a.order);
    const K = Math.max(1, Math.min(opts.multiPV ?? 1, root.length));

    let prevBest = 0;
    for (let depth = 1; depth <= maxDepth; depth++) {
      const scores: number[] = [];
      let aborted = false;
      for (let i = 0; i < root.length; i++) {
        const rm = root[i];
        pos.make(rm.move);
        let score: number;
        // Kết quả tức thì (chiếu hết, hết nước, lặp lại) được xác định chính xác ngay ở gốc
        const terminal = !pos.hasLegalMove() ? (pos.inCheck() ? MATE - 1 : 0) : pos.halfmove >= 100 || pos.isRepetition() ? 0 : null;
        if (terminal !== null) {
          score = terminal;
          this.pvLen[1] = 1;
        } else if (i < K) {
          if (K === 1 && depth >= 5 && Math.abs(prevBest) < MATE_BOUND) {
            // cửa sổ khát vọng quanh điểm của lần lặp trước
            const a0 = prevBest - 40,
              b0 = prevBest + 40;
            score = -this.negamax(depth - 1, -b0, -a0, 1, true);
            if (!this.stopped && (score <= a0 || score >= b0)) score = -this.negamax(depth - 1, -INF, INF, 1, true);
          } else score = -this.negamax(depth - 1, -INF, INF, 1, true);
        } else {
          const kth = scores.slice().sort((a, b) => b - a)[K - 1];
          score = -this.negamax(depth - 1, -kth - 1, -kth, 1, true);
          if (score > kth && !this.stopped) score = -this.negamax(depth - 1, -INF, -kth, 1, true);
        }
        pos.unmake();
        if (this.stopped) {
          aborted = true;
          break;
        }
        scores.push(score);
        rm.score = score;
        const len = this.pvLen[1];
        const pv = [rm.move];
        for (let j = 1; j < len; j++) pv.push(this.pvTable[MAX_PLY + j]);
        rm.pv = pv;
      }
      if (aborted) break;
      // sắp xếp ổn định theo điểm
      root.sort((a, b) => b.score - a.score);
      result.lines = root.slice(0, K).map((r) => ({ move: r.move, score: r.score, pv: r.pv.slice() }));
      result.depth = depth;
      result.nodes = this.nodes;
      result.timeMs = now() - start;
      this.canStop = true;
      // lưu nước tốt nhất ở gốc vào bảng chuyển vị để lần sau sắp xếp
      this.ttStore(pos, depth, TT_EXACT, root[0].score, root[0].move, 0);
      opts.onIteration?.(result);
      const best = root[0].score;
      prevBest = best;
      if (Math.abs(best) >= MATE_BOUND && MATE - Math.abs(best) <= depth) break;
      if (root.length === 1 && depth >= 4) break;
      if (opts.timeMs && now() - start > opts.timeMs * 0.5) break;
      if (this.nodes > this.nodeLimit) break;
    }
    result.nodes = this.nodes;
    result.timeMs = now() - start;
    return result;
  }

  private checkLimits() {
    if (!this.canStop) return;
    if (this.nodes > this.nodeLimit || now() > this.deadline) this.stopped = true;
  }

  private captureScore(m: number) {
    const flags = (m >> 17) & 31;
    let s = 0;
    if (flags & F_CAPTURE) {
      const victim = flags & F_EP ? PAWN : this.posBoardType((m >> 7) & 127);
      const attacker = this.posBoardType(m & 127);
      s = 1_000_000 + PIECE_VALUE[victim] * 10 - (attacker === KING ? 0 : PIECE_VALUE[attacker] / 10);
    }
    if (flags & F_PROMO) s += ((m >> 14) & 7) === QUEEN ? 900_000 : -500_000;
    return s;
  }

  private posBoardType(sq: number) {
    return this.pos.board[sq] & 7;
  }

  private scoreMoves(start: number, end: number, ttMove: number, ply: number) {
    const k1 = this.killers[ply * 2],
      k2 = this.killers[ply * 2 + 1];
    const b = this.pos.board;
    for (let i = start; i < end; i++) {
      const m = this.moveBuf[i];
      if (m === ttMove) {
        this.scoreBuf[i] = 2_000_000;
        continue;
      }
      const flags = (m >> 17) & 31;
      if (flags & (F_CAPTURE | F_PROMO)) {
        this.scoreBuf[i] = this.isBadCapture(m) ? -200_000 + this.captureScore(m) / 100 : this.captureScore(m);
      } else if (m === k1) this.scoreBuf[i] = 800_000;
      else if (m === k2) this.scoreBuf[i] = 790_000;
      else this.scoreBuf[i] = this.history[(b[m & 127] << 7) | ((m >> 7) & 127)];
    }
  }

  /** Bắt quân "lỗ": quân bắt giá trị cao hơn quân bị bắt và ô đích đang được đối phương bảo vệ */
  private isBadCapture(m: number): boolean {
    const flags = (m >> 17) & 31;
    if (!(flags & F_CAPTURE) || flags & (F_EP | F_PROMO)) return false;
    const b = this.pos.board;
    const attacker = b[m & 127] & 7;
    if (attacker === KING) return false;
    const to = (m >> 7) & 127;
    const victim = b[to] & 7;
    if (PIECE_VALUE[attacker] <= PIECE_VALUE[victim] + 50) return false;
    return this.pos.isAttacked(to, (this.pos.side ^ 1) as 0 | 1);
  }

  private pickMove(i: number, end: number) {
    let best = i,
      bs = this.scoreBuf[i];
    for (let j = i + 1; j < end; j++) {
      if (this.scoreBuf[j] > bs) {
        bs = this.scoreBuf[j];
        best = j;
      }
    }
    if (best !== i) {
      const tm = this.moveBuf[i];
      this.moveBuf[i] = this.moveBuf[best];
      this.moveBuf[best] = tm;
      const ts = this.scoreBuf[i];
      this.scoreBuf[i] = this.scoreBuf[best];
      this.scoreBuf[best] = ts;
    }
  }

  private ttStore(pos: Position, depth: number, flag: number, score: number, move: number, ply: number) {
    const idx = pos.hashLo & TT_MASK;
    if (score >= MATE_BOUND) score += ply;
    else if (score <= -MATE_BOUND) score -= ply;
    this.ttKey[idx] = pos.hashHi;
    this.ttMove[idx] = move;
    this.ttScore[idx] = score;
    this.ttDepth[idx] = depth;
    this.ttFlag[idx] = flag;
  }

  private hasPieces(side: number) {
    const b = this.pos.board;
    for (let sq = 0; sq < 128; sq++) {
      if (sq & 0x88) {
        sq += 7;
        continue;
      }
      const p = b[sq];
      if (p && ((p >> 3) & 1) === side) {
        const t = p & 7;
        if (t !== PAWN && t !== KING) return true;
      }
    }
    return false;
  }

  private negamax(depth: number, alpha: number, beta: number, ply: number, allowNull: boolean): number {
    const pos = this.pos;
    this.pvLen[ply] = ply;
    if (ply > 0) {
      if (pos.halfmove >= 100 || pos.isRepetition()) return 0;
      if (alpha < -MATE + ply) alpha = -MATE + ply;
      if (beta > MATE - ply - 1) beta = MATE - ply - 1;
      if (alpha >= beta) return alpha;
    }
    const inCheck = pos.inCheck();
    if (inCheck) depth++;
    if (depth <= 0) return this.quiesce(alpha, beta, ply);
    if (ply >= MAX_PLY - 2) return this.evalFn(pos);

    this.nodes++;
    if ((this.nodes & 1023) === 0) this.checkLimits();
    if (this.stopped) return 0;

    const isPV = beta - alpha > 1;
    let ttMove = 0;
    const idx = pos.hashLo & TT_MASK;
    if (this.ttKey[idx] === pos.hashHi && this.ttFlag[idx]) {
      ttMove = this.ttMove[idx];
      if (!isPV && this.ttDepth[idx] >= depth) {
        let s = this.ttScore[idx];
        if (s >= MATE_BOUND) s -= ply;
        else if (s <= -MATE_BOUND) s += ply;
        const f = this.ttFlag[idx];
        if (f === TT_EXACT || (f === TT_LOWER && s >= beta) || (f === TT_UPPER && s <= alpha)) return s;
      }
    }

    let staticEval = -INF;
    if (!inCheck) {
      staticEval = this.evalFn(pos);
      if (!isPV) {
        // cắt tỉa vô ích ngược
        if (depth <= 3 && staticEval - 120 * depth >= beta && Math.abs(beta) < MATE_BOUND) return staticEval;
        // nước đi rỗng
        if (allowNull && depth >= 3 && staticEval >= beta && this.hasPieces(pos.side)) {
          const R = depth >= 7 ? 3 : 2;
          pos.makeNull();
          const s = -this.negamax(depth - 1 - R, -beta, -beta + 1, ply + 1, false);
          pos.unmakeNull();
          if (this.stopped) return 0;
          if (s >= beta) return s >= MATE_BOUND ? beta : s;
        }
      }
    }

    const base = ply * 256;
    const end = pos.generate(this.moveBuf, base, false);
    this.scoreMoves(base, end, ttMove, ply);

    let legal = 0,
      quiets = 0,
      best = -INF,
      bestMove = 0;
    const origAlpha = alpha;
    for (let i = base; i < end; i++) {
      this.pickMove(i, end);
      const m = this.moveBuf[i];
      const flags = (m >> 17) & 31;
      const isQuiet = !(flags & (F_CAPTURE | F_PROMO));
      const moverPiece = pos.board[m & 127];
      if (!pos.make(m)) continue;
      legal++;
      const givesCheck = pos.inCheck();
      if (!isPV && !inCheck && !givesCheck && isQuiet && legal > 1 && best > -MATE_BOUND) {
        if (depth <= 2 && staticEval + 100 + 120 * depth <= alpha) {
          pos.unmake();
          continue;
        }
        if (depth <= 3 && quiets > 5 + depth * depth * 2) {
          pos.unmake();
          continue;
        }
      }
      if (isQuiet) quiets++;

      let score: number;
      if (legal === 1) {
        score = -this.negamax(depth - 1, -beta, -alpha, ply + 1, true);
      } else {
        let r = 0;
        if (depth >= 3 && isQuiet && !inCheck && !givesCheck && legal > 3 && m !== this.killers[ply * 2] && m !== this.killers[ply * 2 + 1]) {
          r = LMR[Math.min(depth, 63) * 64 + Math.min(legal, 63)];
          if (isPV) r--;
          if (r < 0) r = 0;
          if (r > depth - 2) r = depth - 2;
        }
        score = -this.negamax(depth - 1 - r, -alpha - 1, -alpha, ply + 1, true);
        if (score > alpha && r > 0) score = -this.negamax(depth - 1, -alpha - 1, -alpha, ply + 1, true);
        if (score > alpha && score < beta) score = -this.negamax(depth - 1, -beta, -alpha, ply + 1, true);
      }
      pos.unmake();
      if (this.stopped) return 0;

      if (score > best) {
        best = score;
        bestMove = m;
        if (score > alpha) {
          alpha = score;
          const row = ply * MAX_PLY;
          this.pvTable[row + ply] = m;
          const childLen = this.pvLen[ply + 1];
          for (let j = ply + 1; j < childLen; j++) this.pvTable[row + j] = this.pvTable[(ply + 1) * MAX_PLY + j];
          this.pvLen[ply] = Math.max(childLen, ply + 1);
          if (score >= beta) {
            if (isQuiet) {
              if (this.killers[ply * 2] !== m) {
                this.killers[ply * 2 + 1] = this.killers[ply * 2];
                this.killers[ply * 2] = m;
              }
              const hi = (moverPiece << 7) | ((m >> 7) & 127);
              this.history[hi] += depth * depth;
              if (this.history[hi] > 600_000) for (let k = 0; k < this.history.length; k++) this.history[k] >>= 1;
            }
            break;
          }
        }
      }
    }

    if (legal === 0) return inCheck ? -MATE + ply : 0;
    const flag = best >= beta ? TT_LOWER : best > origAlpha ? TT_EXACT : TT_UPPER;
    this.ttStore(pos, depth, flag, best, bestMove, ply);
    return best;
  }

  private quiesce(alpha: number, beta: number, ply: number): number {
    const pos = this.pos;
    this.pvLen[ply] = ply;
    this.nodes++;
    if ((this.nodes & 1023) === 0) this.checkLimits();
    if (this.stopped) return 0;
    if (!this.useQ || ply >= MAX_PLY - 2) return this.evalFn(pos);
    // Đang bị chiếu: phải xét mọi nước thoát chiếu (không được "đứng yên")
    const inCheck = ply < 40 && pos.inCheck();
    const stand = inCheck ? -MATE + ply : this.evalFn(pos);
    if (stand >= beta) return stand;
    if (stand > alpha) alpha = stand;

    const base = ply * 256;
    const end = pos.generate(this.moveBuf, base, !inCheck);
    for (let i = base; i < end; i++) this.scoreBuf[i] = this.captureScore(this.moveBuf[i]);
    let best = stand;
    for (let i = base; i < end; i++) {
      this.pickMove(i, end);
      const m = this.moveBuf[i];
      const flags = (m >> 17) & 31;
      const victim = flags & F_EP ? PAWN : pos.board[(m >> 7) & 127] & 7;
      if (!inCheck) {
        if (!(flags & F_PROMO) && stand + PIECE_VALUE[victim] + 200 < alpha) continue;
        if ((flags & F_PROMO) && ((m >> 14) & 7) !== QUEEN) continue;
        if (this.isBadCapture(m)) continue;
      }
      if (!pos.make(m)) continue;
      const score = -this.quiesce(-beta, -alpha, ply + 1);
      pos.unmake();
      if (this.stopped) return 0;
      if (score > best) {
        best = score;
        if (score > alpha) {
          alpha = score;
          if (score >= beta) break;
        }
      }
    }
    return best;
  }
}

export function isMateScore(s: number) {
  return Math.abs(s) >= MATE_BOUND;
}

/** Số nước đến chiếu hết (dương: bên đi chiếu hết), 0 nếu không phải điểm chiếu hết */
export function mateIn(s: number): number {
  if (!isMateScore(s)) return 0;
  const plies = MATE - Math.abs(s);
  const moves = Math.ceil(plies / 2);
  return s > 0 ? moves : -moves;
}
