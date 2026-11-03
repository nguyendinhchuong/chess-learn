// Phân tích một thế cờ: nhiều phương án (multi-PV), diễn biến chính dạng SAN và phát hiện đe dọa.
import { Position } from './board';
import { Searcher, mateIn, isMateScore } from './search';
import type { AnalysisLine, AnalysisResult, WorkerRequest } from './protocol';


export function rebuild(fen: string, moves: string[]): Position {
  const pos = new Position(fen);
  for (const u of moves) {
    const m = pos.moveFromUci(u);
    if (!m) throw new Error('Nước đi không hợp lệ: ' + u);
    pos.make(m);
  }
  return pos;
}

/** Đổi PV (mã nước đi nội bộ) sang UCI và SAN, dừng ở nước đầu tiên không hợp lệ. */
function convertPv(pos: Position, pv: number[]): { uci: string[]; san: string[] } {
  const uci: string[] = [];
  const san: string[] = [];
  let made = 0;
  for (const m of pv) {
    const legal = pos.legalMoves();
    if (!legal.includes(m)) break;
    uci.push(pos.moveToUci(m));
    san.push(pos.moveToSan(m, legal));
    pos.make(m);
    made++;
  }
  while (made--) pos.unmake();
  return { uci, san };
}

/**
 * Đe dọa đáng kể: nếu ta "bỏ lượt", đối thủ lợi thêm ít nhất 1,5 tốt hoặc có chiếu hết.
 * `passScore` theo góc nhìn đối thủ sau khi ta bỏ lượt, `bestScore` theo góc nhìn ta khi đi nước tốt nhất.
 * Trả về phần lợi (centipawn), hoặc null nếu không đáng cảnh báo.
 */
export function threatGain(passScore: number, bestScore: number): number | null {
  const gain = passScore + bestScore;
  return gain >= 150 || (isMateScore(passScore) && passScore > 0) ? gain : null;
}

export function analyze(searcher: Searcher, req: Omit<Extract<WorkerRequest, { type: 'analyze' }>, 'id' | 'type'>): AnalysisResult {
  const pos = rebuild(req.fen, req.moves);
  const fen = pos.fen();
  const threatBudget = req.threat ? Math.round(req.timeMs * 0.25) : 0;
  const rootMoves = req.searchMoves?.map((u) => pos.moveFromUci(u)).filter((m) => m);
  const r = searcher.search(pos, { timeMs: req.timeMs - threatBudget, multiPV: req.multiPV, maxDepth: req.maxDepth, rootMoves });
  const sign = pos.side === 0 ? 1 : -1;
  const lines: AnalysisLine[] = r.lines.map((l) => {
    const pv = convertPv(pos, l.pv);
    return {
      uci: pos.moveToUci(l.move),
      san: pos.moveToSan(l.move),
      score: l.score,
      scoreWhite: l.score * sign,
      mate: mateIn(l.score),
      pv: pv.uci,
      pvSan: pv.san,
    };
  });
  const result: AnalysisResult = { fen, depth: r.depth, nodes: r.nodes, timeMs: r.timeMs, lines, engine: 'js' };

  // Phát hiện đe dọa: nếu ta bỏ lượt, đối thủ sẽ làm gì?
  if (req.threat && lines.length && !pos.inCheck()) {
    pos.makeNull();
    const t = searcher.search(pos, { timeMs: threatBudget, maxDepth: 8, multiPV: 1 });
    if (t.lines.length) {
      const best = t.lines[0];
      const passScore = best.score; // góc nhìn đối thủ
      const gain = threatGain(passScore, lines[0].score); // so với khi ta đi nước tốt nhất
      if (gain !== null) {
        const pv = convertPv(pos, best.pv);
        result.threat = {
          uci: pos.moveToUci(best.move),
          san: pos.moveToSan(best.move),
          pv: pv.uci,
          pvSan: pv.san,
          gain,
          mate: mateIn(passScore),
        };
      }
    }
    pos.unmakeNull();
  }
  return result;
}

