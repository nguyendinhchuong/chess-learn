// Giải "sát cục" chính xác (không dùng lượng giá): bên đi có ép thắng trong ≤ n nước không?
// Cờ tướng: bên đến lượt hết nước đi là thua – dù bị chiếu (chiếu bí) hay không (khốn bí).
// Dùng để kiểm chứng cờ thế (lời giải đúng và duy nhất) và chấp nhận nước thắng khác với lời giải.
import { Position } from './board';

type Table = Map<string, number>;

export class MateSolver {
  private proven: Table = new Map();
  private refuted: Table = new Map();
  nodes = 0;
  limit = Infinity;

  private key(pos: Position) {
    return pos.hashLo + ':' + pos.hashHi;
  }

  /** Bên đến lượt ép thắng (chiếu bí hoặc khốn bí) được trong ≤ n nước */
  mates(pos: Position, n: number): boolean {
    if (n <= 0) return false;
    const k = this.key(pos);
    const p = this.proven.get(k);
    if (p !== undefined && p <= n) return true;
    const r = this.refuted.get(k);
    if (r !== undefined && r >= n) return false;
    if (++this.nodes > this.limit) throw new Error('MateSolver: vượt giới hạn nút');

    const legal = pos.legalMoves();
    const checks: number[] = [];
    const rest: number[] = [];
    for (const m of legal) {
      pos.make(m);
      const check = pos.inCheck();
      // nước yên lặng chỉ đáng xét ở nước cuối nếu nó làm đối phương hết nước đi
      const keep = check || n > 1 || !pos.hasLegalMove();
      pos.unmake();
      if (check) checks.push(m);
      else if (keep) rest.push(m);
    }
    for (const m of [...checks, ...rest]) {
      pos.make(m);
      const ok = this.defenseFails(pos, n - 1);
      pos.unmake();
      if (ok) {
        this.proven.set(k, n);
        return true;
      }
    }
    this.refuted.set(k, Math.max(n, r ?? 0));
    return false;
  }

  /** Bên phòng thủ đến lượt: mọi cách đỡ đều thua trong ≤ n nước (đã hết nước đi cũng tính là thua) */
  defenseFails(pos: Position, n: number): boolean {
    const legal = pos.legalMoves();
    if (!legal.length) return true;
    if (n <= 0) return false;
    for (const d of legal) {
      pos.make(d);
      const ok = this.mates(pos, n);
      pos.unmake();
      if (!ok) return false;
    }
    return true;
  }

  shortest(pos: Position, maxN: number): number {
    for (let n = 1; n <= maxN; n++) if (this.mates(pos, n)) return n;
    return 0;
  }

  matingMoves(pos: Position, n: number): number[] {
    const res: number[] = [];
    for (const m of pos.legalMoves()) {
      pos.make(m);
      if (this.defenseFails(pos, n - 1)) res.push(m);
      pos.unmake();
    }
    return res;
  }
}

/** Nước đi (tọa độ) thắng ngay: đối phương hết nước đi */
export function isMateMove(fen: string, uci: string): boolean {
  const pos = new Position(fen);
  const m = pos.moveFromUci(uci);
  if (!m || !pos.make(m)) return false;
  return !pos.hasLegalMove();
}
