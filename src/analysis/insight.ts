// Đo những gì xảy ra quanh một nước đi (vật chất mất/bỏ lỡ, loại đòn) – dùng chung cho hai môn cờ.
import type { AnalysisResult } from '../engine/protocol';
import type { Side } from '../online/protocol';
import type { CommonFacts, MoveInsight, Review, Tactic } from './types';

export function tacticOf(f: Pick<CommonFacts, 'mate' | 'fork' | 'captured' | 'check' | 'targets'>): Tactic {
  if (f.mate) return 'mate';
  if (f.fork) return 'fork';
  if (f.captured) return 'capture';
  if (f.check) return 'check';
  return f.targets.length ? 'threat' : null;
}

/** Số nửa nước của diễn biến dùng để đếm vật chất: lẻ để luôn dừng sau nước của bên đang xét (không dừng giữa lúc đổi quân) */
const LINE = 7;

/**
 * Vật chất mất/bỏ lỡ và loại đòn quanh nước `ucis[i]`. Dùng chung cho hai môn cờ:
 * chỉ cần hàm dựng thế cờ, đo vật chất và phân tích nước đi của môn đó.
 */
export function computeInsight<P extends { moveFromUci(u: string): number; make(m: number): unknown; unmake(): void; side: number }>(
  pos: P,
  played: string,
  review: Review,
  before: AnalysisResult | null,
  after: AnalysisResult | null,
  swing: (pos: P, ucis: string[], color: Side) => number,
  tactic: (pos: P, uci: string) => Tactic,
): MoveInsight {
  const color = pos.side as Side;
  const reply = after?.lines[0];
  const net = swing(pos, [played, ...(reply?.pv.slice(0, LINE - 1) ?? [])], color);
  const res: MoveInsight = { lost: Math.max(0, -net), missedGain: 0, missedMate: 0, allowedMate: 0, bestTactic: null, refTactic: null, greedy: false };
  const best = before?.lines[0];
  if (best && best.uci !== played) {
    res.missedGain = Math.max(0, swing(pos, best.pv.slice(0, LINE), color) - net);
    res.bestTactic = tactic(pos, best.uci);
    const playedLine = before?.lines.find((l) => l.uci === played);
    const playedMates = review.facts.mate || (playedLine?.mate ?? 0) > 0 || (reply?.mate ?? 0) < 0;
    if (best.mate > 0 && !playedMates) res.missedMate = best.mate;
  }
  if (reply && !review.facts.mate) {
    const m = pos.moveFromUci(played);
    if (m) {
      pos.make(m);
      res.refTactic = tactic(pos, reply.uci);
      pos.unmake();
    }
    // trước nước này đã bị chiếu hết bắt buộc thì không tính là "để đối thủ chiếu hết"
    if (reply.mate > 0 && !((best?.mate ?? 0) < 0)) res.allowedMate = reply.mate;
  }
  res.greedy = review.facts.captured > 0 && res.lost >= 2;
  return res;
}
