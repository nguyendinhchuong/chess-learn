// Giải chiếu hết bắt buộc một cách chính xác (không dùng lượng giá): "bên đi có ép chiếu hết trong ≤ n nước không?".
// Dùng để kiểm chứng cờ thế (lời giải đúng, không có nước khác cũng thắng) và để chấp nhận nước chiếu hết khác lời giải.
import { Position } from './board';

type Table = Map<string, number>;

export class MateSolver {
  /** khóa vị trí → n nhỏ nhất đã chứng minh chiếu hết được */
  private proven: Table = new Map();
  /** khóa vị trí → n lớn nhất đã chứng minh KHÔNG chiếu hết được */
  private refuted: Table = new Map();
  nodes = 0;
  /** Giới hạn số nút; vượt quá thì ném lỗi để người gọi biết kết quả không chắc chắn */
  limit = Infinity;

  private key(pos: Position) {
    return pos.hashLo + ':' + pos.hashHi;
  }

  /** Bên đến lượt ép chiếu hết được trong ≤ n nước */
  mates(pos: Position, n: number): boolean {
    if (n <= 0) return false;
    const k = this.key(pos);
    const p = this.proven.get(k);
    if (p !== undefined && p <= n) return true;
    const r = this.refuted.get(k);
    if (r !== undefined && r >= n) return false;
    if (++this.nodes > this.limit) throw new Error('MateSolver: vượt giới hạn nút');

    const legal = pos.legalMoves();
    // nước chiếu trước, rồi bắt quân, rồi các nước còn lại
    const ordered: number[] = [];
    const rest: number[] = [];
    for (const m of legal) {
      pos.make(m);
      const check = pos.inCheck();
      pos.unmake();
      if (check) ordered.push(m);
      else if (n > 1) rest.push(m);
    }
    for (const m of [...ordered, ...rest]) {
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

  /** Bên phòng thủ đến lượt: mọi cách đỡ đều bị chiếu hết trong ≤ n nước (đã bị chiếu hết cũng tính) */
  defenseFails(pos: Position, n: number): boolean {
    const legal = pos.legalMoves();
    if (!legal.length) return pos.inCheck();
    if (n <= 0) return false;
    for (const d of legal) {
      pos.make(d);
      const ok = this.mates(pos, n);
      pos.unmake();
      if (!ok) return false;
    }
    return true;
  }

  /** Số nước chiếu hết ngắn nhất (≤ maxN), 0 nếu không có */
  shortest(pos: Position, maxN: number): number {
    for (let n = 1; n <= maxN; n++) if (this.mates(pos, n)) return n;
    return 0;
  }

  /** Các nước đi ép chiếu hết trong ≤ n nước */
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

/** Nước đi (UCI) chiếu hết ngay lập tức */
export function isMateMove(fen: string, uci: string): boolean {
  const pos = new Position(fen);
  const m = pos.moveFromUci(uci);
  if (!m || !pos.make(m)) return false;
  return pos.inCheck() && !pos.hasLegalMove();
}
