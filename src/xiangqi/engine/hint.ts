// Giải thích nước gợi ý cờ tướng như một huấn luyện viên: ý tưởng của nước đi, đe dọa nó tạo ra, đe dọa của đối phương
// được hóa giải, cách đối phương nên đáp và vì sao nó hơn các phương án khác.
import { Position } from './board';
import type { AnalysisResult } from '../../engine/protocol';
import { rebuild } from './analyze';
import { analyzeMove, describeMove, explainPurpose, materialSwing, materialText, PurposeContext } from './explain';
import { evalText, lineWin } from './coach';

export interface HintDeep {
  /** Thế cờ sau nước gợi ý (đối phương đến lượt), kèm đe dọa của ta nếu đối phương "bỏ lượt" */
  after: AnalysisResult | null;
}

export interface HintSection {
  kind: 'idea' | 'threat' | 'defense' | 'reply' | 'verdict';
  icon: string;
  title: string;
  text: string;
}

export type AnalysisRequester = (
  fen: string,
  moves: string[],
  opts: { multiPV?: number; timeMs?: number; threat?: boolean; priority?: boolean; channel?: string },
) => Promise<AnalysisResult | null>;

export async function deepHintAnalysis(request: AnalysisRequester, startFen: string, moves: string[], before: AnalysisResult): Promise<HintDeep | null> {
  const best = before.lines[0];
  if (!best) return null;
  const pos = rebuild(startFen, [...moves, best.uci]);
  if (!pos.hasLegalMove()) return { after: null };
  const after = await request(startFen, [...moves, best.uci], { multiPV: 1, timeMs: 900, threat: true, priority: true, channel: 'xq-hint' });
  if (!after) return null;
  return { after };
}

const lower = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

export function explainHint({ pos, before, deep, ctx = {} }: { pos: Position; before: AnalysisResult; deep: HintDeep | null; ctx?: PurposeContext }): HintSection[] {
  const best = before.lines[0];
  if (!best) return [];
  const m = pos.moveFromUci(best.uci);
  if (!m) return [];
  const out: HintSection[] = [];
  const facts = analyzeMove(pos, m);
  out.push({ kind: 'idea', icon: '💡', title: 'Ý tưởng', text: explainPurpose(pos, m, ctx) });

  if (!facts.mate && best.mate > 0) {
    out.push({ kind: 'threat', icon: '🎯', title: 'Đòn quyết định', text: `Đây là khởi đầu của đòn thắng sau **${best.mate}** nước: ${best.pvSan.slice(0, 7).join(' ')}.` });
  } else if (deep?.after?.threat && !facts.mate) {
    const t = deep.after.threat;
    const p2 = rebuild(pos.fen(), [best.uci]);
    p2.makeNull();
    const tm = p2.moveFromUci(t.uci);
    const d = tm ? describeMove(analyzeMove(p2, tm)) : '';
    p2.unmakeNull();
    out.push({ kind: 'threat', icon: '⚔️', title: 'Đe dọa tạo ra', text: `Nếu đối phương lơ là, bạn sẽ có **${t.san}**${t.mate > 0 ? ` – thắng sau ${t.mate} nước` : d ? ` – ${d}` : ''}.` });
  }

  if (before.threat) {
    const t = before.threat;
    out.push({ kind: 'defense', icon: '🛡️', title: 'Hóa giải đe dọa', text: `Đối phương đang nhắm **${t.san}**${t.mate > 0 ? ` (thắng sau ${t.mate} nước)` : ''}; nước gợi ý ngăn được ý đồ đó.` });
  }

  const reply = deep?.after?.lines[0];
  if (reply && !facts.mate) {
    const p2 = rebuild(pos.fen(), [best.uci]);
    const rm = p2.moveFromUci(reply.uci);
    const d = rm ? describeMove(analyzeMove(p2, rm)) : '';
    const swing = materialSwing(pos, [best.uci, ...reply.pv.slice(0, 5)], pos.side);
    let text = `Nước đáp tốt nhất của đối phương là **${reply.san}**${d ? ` (${lower(d)})` : ''}. Diễn biến dự kiến: ${[best.san, ...reply.pvSan.slice(0, 6)].join(' ')}`;
    if (swing >= 1.5) text += ` – bạn giành được ${materialText(swing)}`;
    out.push({ kind: 'reply', icon: '↩️', title: 'Đối phương sẽ đáp', text: text + '.' });
  }

  const second = before.lines[1];
  if (second && !facts.mate) {
    const gap = lineWin(best) - lineWin(second);
    const sideRed = pos.side === 0;
    out.push({
      kind: 'verdict',
      icon: '⚖️',
      title: 'So sánh',
      text:
        gap >= 10
          ? `Các phương án khác kém hơn rõ rệt: chẳng hạn **${second.san}** chỉ được đánh giá ${evalText(second, sideRed)} so với ${evalText(best, sideRed)}.`
          : `**${second.san}** cũng là lựa chọn hợp lý (chênh lệch nhỏ: ${evalText(second, sideRed)} so với ${evalText(best, sideRed)}).`,
    });
  }
  return out;
}
