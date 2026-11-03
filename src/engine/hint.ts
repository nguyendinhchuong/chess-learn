// Giải thích nước gợi ý như một huấn luyện viên: ý tưởng của nước đi (khống chế ô, bắt quân, chĩa đôi…), đe dọa
// nó tạo ra, đe dọa của đối phương được hóa giải, cách đối phương nên đáp, cái bẫy giăng sẵn cho nước "tham ăn",
// và vì sao nó hơn các phương án khác. Phần ý tưởng dựa trên sự kiện trên bàn cờ (purpose.ts); các phần còn lại
// dựa trên phân tích của bộ máy cho thế cờ SAU nước gợi ý và cho các nước đáp hấp dẫn của đối phương (searchmoves).
import { Position, Color, F_CAPTURE, F_EP, PAWN, KING, PIECE_VALUE, moveFlags, moveFrom, moveTo, sqName } from './board';
import type { AnalysisLine, AnalysisResult } from './protocol';
import { rebuild } from './analyze';
import { purposeParts, PurposeContext } from './purpose';
import { analyzeMove, materialBalance, piece } from './explain';
import { evalText, lineWin } from './coach';

export interface HintDeep {
  /** Thế cờ sau nước gợi ý (đối phương đến lượt), kèm đe dọa của ta nếu đối phương "bỏ lượt" */
  after: AnalysisResult | null;
  /** Đánh giá từng nước đáp hấp dẫn của đối phương: bắt quân, hoặc đòn đe dọa cũ của họ */
  tempting: AnalysisResult | null;
}

export interface HintSection {
  kind: 'idea' | 'threat' | 'defense' | 'reply' | 'trap' | 'verdict';
  icon: string;
  title: string;
  /** Văn bản, nước đi được in **đậm** */
  text: string;
}

export type AnalysisRequester = (
  fen: string,
  moves: string[],
  opts: { multiPV?: number; timeMs?: number; threat?: boolean; searchMoves?: string[]; priority?: boolean; channel?: string },
) => Promise<AnalysisResult | null>;

const MAX_TEMPTING = 10;
/** Nước đáp bị coi là "mắc bẫy" khi làm đối phương mất ít nhất chừng này % cơ hội thắng so với nước đáp tốt nhất… */
const TRAP_DROP = 15;
/** …hoặc chừng này centipawn (khi thế cờ đã nghiêng hẳn, tỉ lệ thắng gần như không đổi dù thiệt thêm nhiều) */
const TRAP_DROP_CP = 300;

const listVi = (items: string[]) => (items.length <= 1 ? items.join('') : items.slice(0, -1).join(', ') + ' và ' + items[items.length - 1]);
/**
 * Lý do nhúng vào câu khác: đổi dấu gạch nối bên trong thành dấu hai chấm để câu không có hai dấu gạch.
 * Kết quả vật chất được nêu riêng (theo cả chuỗi nước), nên bỏ nhận định "giữ cân bằng vật chất" của nước bắt lại.
 */
const why = (reasons: string[]) => reasons.map((r) => r.replace(' – ', ': ').replace('bắt lại quân, giữ cân bằng vật chất', 'bắt lại quân')).join(', ');

/** Điểm vật chất bằng lời: "một Tốt", "một Xe (5 điểm)", "4 điểm vật chất"… */
export function pointsText(n: number): string {
  const named: Record<number, string> = { 1: 'một Tốt', 2: 'hai Tốt', 3: 'một quân nhẹ (3 điểm)', 5: 'một Xe (5 điểm)', 9: 'một Hậu (9 điểm)' };
  return named[Math.abs(n)] ?? `${Math.abs(n)} điểm vật chất`;
}
/** Lý do chiến thuật được nêu trước lý do vị trí */
const TACTICAL = [/chiếu hết/, /chĩa đôi/, /ghim/, /ăn |bắt |đổi lấy/, /tấn công|dọa|chiếu/, /ngăn|thoát|chặn/];
const tacticalRank = (r: string) => {
  const i = TACTICAL.findIndex((re) => re.test(r));
  return i < 0 ? TACTICAL.length : i;
};
const kingDist = (a: number, b: number) => Math.max(Math.abs((a >> 4) - (b >> 4)), Math.abs((a & 7) - (b & 7)));

/** Chuỗi SAN có đánh số nước, ví dụ "12.Qxh7+ Kxh7 13.Rh3#" */
export function numbered(sans: string[], fullmove: number, whiteFirst: boolean): string {
  let n = fullmove;
  let white = whiteFirst;
  return sans
    .map((s, i) => {
      const out = white ? `${n}.${s}` : i === 0 ? `${n}...${s}` : s;
      if (!white) n++;
      white = !white;
      return out;
    })
    .join(' ');
}

/**
 * Chênh lệch vật chất (theo góc nhìn `color`) sau chuỗi `ucis`, đo ở thời điểm "yên tĩnh" cuối cùng – nước kế tiếp
 * không phải nước bắt quân, và nếu chuỗi dừng ngay sau một nước bắt quân thì quân đó không bị bắt lại được –
 * để không dừng giữa một loạt đổi quân.
 */
export function settledSwing(pos: Position, ucis: string[], color: Color, maxPly = 10): number {
  const start = materialBalance(pos, color);
  const n = Math.min(ucis.length, maxPly);
  let result = 0;
  let made = 0;
  for (let i = 0; i < n; i++) {
    const m = pos.moveFromUci(ucis[i]);
    if (!m) break;
    pos.make(m);
    made++;
    const next = i + 1 < n ? pos.moveFromUci(ucis[i + 1]) : 0;
    const quiet = next ? !(moveFlags(next) & F_CAPTURE) : !(moveFlags(m) & F_CAPTURE) || !pos.attackers(moveTo(m), pos.side).length;
    if (quiet) result = materialBalance(pos, color) - start;
  }
  while (made--) pos.unmake();
  return result;
}

/** Các nước đáp "hấp dẫn" của đối phương sau nước gợi ý: mọi nước bắt quân (quân giá trị cao trước) và các nước `extra`. */
export function temptingReplies(posAfter: Position, extra: (string | undefined)[] = []): string[] {
  const victim = (m: number) => (moveFlags(m) & F_EP ? PAWN : posAfter.board[moveTo(m)] & 7);
  const caps = posAfter
    .legalMoves()
    .filter((m) => moveFlags(m) & F_CAPTURE)
    .sort((a, b) => PIECE_VALUE[victim(b)] - PIECE_VALUE[victim(a)]);
  const out = caps.map((m) => posAfter.moveToUci(m));
  for (const u of extra) {
    const m = u ? posAfter.moveFromUci(u) : 0;
    if (m && !out.includes(posAfter.moveToUci(m))) out.unshift(posAfter.moveToUci(m));
  }
  return out.slice(0, MAX_TEMPTING);
}

/**
 * Phân tích thêm cho lời giải thích: thế cờ sau nước gợi ý (đối phương đáp thế nào, ta đe dọa gì)
 * và các nước đáp hấp dẫn của đối phương. Trả về null nếu bị hủy giữa chừng.
 */
export async function deepHintAnalysis(request: AnalysisRequester, startFen: string, moves: string[], before: AnalysisResult): Promise<HintDeep | null> {
  const best = before.lines[0];
  if (!best) return null;
  const line = [...moves, best.uci];
  const pos = rebuild(startFen, line);
  if (!pos.hasLegalMove()) return { after: null, tempting: null };
  const after = await request(startFen, line, { multiPV: 1, timeMs: 1000, threat: true, priority: true, channel: 'hint-after' });
  if (!after) return null;
  const replyUci = after.lines[0]?.uci;
  const candidates = temptingReplies(pos, [before.threat?.uci]).filter((u) => u !== replyUci);
  if (!candidates.length) return { after, tempting: null };
  const tempting = await request(startFen, line, { multiPV: candidates.length, timeMs: 800, searchMoves: candidates, priority: true, channel: 'hint-trap' });
  return tempting ? { after, tempting } : null;
}

/** Các ô quan trọng mà nước `m` khống chế thêm: trung tâm mở rộng (c3–f6) và các ô quanh Vua đối phương. */
function newControl(pos: Position, m: number): { center: string[]; king: string[] } {
  const us = pos.side;
  const attacked = () => {
    const set = new Set<number>();
    for (let sq = 0; sq < 128; sq++) {
      if (sq & 0x88) {
        sq += 7;
        continue;
      }
      const p = pos.board[sq];
      if (p && ((p >> 3) & 1) === us) for (const t of pos.attacksFrom(sq)) set.add(t);
    }
    return set;
  };
  const before = attacked();
  pos.make(m);
  const after = attacked();
  const enemyKing = pos.kingSq[us ^ 1];
  const center: number[] = [];
  const king: number[] = [];
  for (const s of after) {
    if (before.has(s) || s === moveTo(m)) continue;
    const p = pos.board[s];
    if (p && ((p >> 3) & 1) === us) continue;
    const f = s & 7,
      r = s >> 4;
    if (kingDist(s, enemyKing) <= 1 && s !== enemyKing) king.push(s);
    else if (f >= 2 && f <= 5 && r >= 2 && r <= 5) center.push(s);
  }
  pos.unmake();
  const names = (a: number[]) => a.sort((x, y) => (x & 7) - (y & 7) || (x >> 4) - (y >> 4)).map(sqName);
  return { center: names(center), king: names(king) };
}

function verdictWords(best: AnalysisLine, win: number): string {
  if (best.mate > 0) return `bạn chiếu hết sau ${best.mate} nước`;
  if (best.mate < 0) return 'đối thủ đang có đòn chiếu hết – đây là cách chống đỡ lâu nhất';
  if (win >= 90) return 'bạn có ưu thế quyết định';
  if (win >= 75) return 'bạn có lợi thế lớn';
  if (win >= 60) return 'bạn có lợi thế rõ rệt';
  if (win >= 53) return 'bạn nhỉnh hơn một chút';
  if (win >= 47) return 'thế cờ cân bằng';
  if (win >= 35) return 'bạn hơi kém hơn – đây là cách giữ thế tốt nhất';
  return 'bạn đang gặp khó – đây là cách chống đỡ tốt nhất';
}

export interface HintInput {
  /** Thế cờ hiện tại, người chơi đến lượt */
  pos: Position;
  /** Phân tích thế cờ hiện tại (lines[0] là nước gợi ý; `threat` là đe dọa của đối phương) */
  before: AnalysisResult;
  deep: HintDeep | null;
  /** Nước vừa đi của đối phương – để nhận ra nước bắt lại quân */
  ctx?: PurposeContext;
}

/** Lời giải thích nước gợi ý, chia thành từng phần. Khi `deep` chưa có, chỉ có ý tưởng, cách đáp dự kiến và đánh giá. */
export function explainHint({ pos: current, before, deep, ctx = {} }: HintInput): HintSection[] {
  const best = before.lines[0];
  const pos = new Position(current.fen());
  const m = best ? pos.moveFromUci(best.uci) : 0;
  if (!best || !m) return [];
  const us = pos.side;
  const them = (us ^ 1) as Color;
  const white = us === 0;
  const sections: HintSection[] = [];
  const capturedHere = !!(moveFlags(m) & F_CAPTURE);

  // ---------- Ý tưởng ----------
  const parts = purposeParts(pos, m, { ...ctx, subject: 'Bạn', trusted: true });
  const facts = analyzeMove(pos, m);
  // quân vừa đi có thể bị bắt mà đối phương trông như được lợi: nước thí quân (hoặc nhử mồi)
  const offered = facts.movedHanging && facts.type !== KING && PIECE_VALUE[facts.captured] < PIECE_VALUE[facts.type];
  let idea: string;
  if (parts.final === 'mate') idea = `${parts.main} – chiếu hết, kết thúc ván cờ!`;
  else {
    const reasons = parts.reasons
      .map((r, i) => ({ r, i }))
      .sort((a, b) => tacticalRank(a.r) - tacticalRank(b.r) || a.i - b.i)
      .slice(0, 3)
      .map((x) => x.r);
    const ctrl = newControl(pos, m);
    if (!reasons.some((r) => r.includes('Vua đối phương')) && ctrl.king.length >= 2) reasons.push(`siết chặt các ô quanh Vua đối phương (${listVi(ctrl.king.slice(0, 4))})`);
    else if (!reasons.some((r) => r.includes('khống chế') || r.includes('không cho')) && ctrl.center.length >= 2)
      reasons.push(`kiểm soát thêm các ô ${listVi(ctrl.center.slice(0, 4))}`);
    idea = `${parts.main} – ${why(reasons)}.`;
    if (best.mate > 1) idea += ` Đây là đòn chiếu hết bắt buộc: **${numbered(best.pvSan, pos.fullmove, white)}**.`;
  }
  sections.push({ kind: 'idea', icon: '🧠', title: 'Ý tưởng', text: idea });

  const posAfter = new Position(pos.fen());
  posAfter.make(posAfter.moveFromUci(best.uci));
  const reply = deep?.after?.lines[0] ?? null;

  // ---------- Đe dọa mà nước gợi ý tạo ra ----------
  const t = deep?.after?.threat;
  if (t && !posAfter.inCheck()) {
    posAfter.makeNull();
    const tm = posAfter.moveFromUci(t.uci);
    let text: string | null = null;
    if (t.mate > 0)
      text =
        t.mate === 1
          ? `Bạn dọa **${t.san}** chiếu hết ngay – đối thủ buộc phải phòng thủ.`
          : `Bạn dọa chiếu hết sau ${t.mate} nước (**${t.pvSan.join(' ')}**) – đối thủ buộc phải phòng thủ.`;
    else if (tm) {
      const tp = purposeParts(posAfter, tm, { trusted: true });
      const gain = settledSwing(posAfter, t.pv ?? [t.uci], us);
      const tf = analyzeMove(posAfter, tm);
      // chỉ nêu đe dọa cụ thể: ăn quân, chiếu, tấn công/chĩa đôi – không nêu một nước "tốt hơn" chung chung
      if (gain >= 1 || tf.check || tf.fork || tf.targets.length) {
        const reasons = !tp.final ? tp.reasons.slice(0, 1) : [];
        if (gain >= 1) reasons.push(`giành ${pointsText(gain)}`);
        text = `Nếu đối thủ lơ là, nước tiếp theo bạn có **${t.san}**${reasons.length ? ` – ${why(reasons)}` : ''}. Đối thủ phải dành nước đi để đối phó.`;
      }
    }
    posAfter.unmakeNull();
    if (text) sections.push({ kind: 'threat', icon: '🎯', title: 'Đe dọa', text });
  }

  // ---------- Hóa giải đe dọa của đối phương ----------
  const ot = before.threat;
  if (ot && !best.mate && !parts.reasons.some((r) => r.includes(ot.san))) {
    const pNull = new Position(pos.fen());
    let what = `**${ot.san}**`;
    if (!pNull.inCheck()) {
      pNull.makeNull();
      const om = pNull.moveFromUci(ot.uci);
      const loss = settledSwing(pNull, ot.pv ?? [ot.uci], them);
      if (ot.mate > 0) what = `chiếu hết bằng **${ot.san}**`;
      else if (om && moveFlags(om) & F_CAPTURE) {
        const victim = moveFlags(om) & F_EP ? PAWN : pNull.board[moveTo(om)] & 7;
        what = `**${ot.san}**, ăn ${piece(victim)} ${sqName(moveTo(om))}`;
      } else if (loss >= 1) what = `**${ot.san}**, giành ${pointsText(loss)}`;
      pNull.unmakeNull();
    }
    const otAfter = posAfter.moveFromUci(ot.uci);
    const otLine = deep?.tempting?.lines.find((l) => l.uci === ot.uci);
    let text: string | null = null;
    if (!otAfter) text = `Đối thủ đang dọa ${what}. Nước gợi ý loại bỏ hoàn toàn đe dọa này.`;
    else if (reply && reply.uci !== ot.uci && otLine && lineWin(otLine) <= lineWin(reply) - 10)
      text = `Đối thủ đang dọa ${what}. Sau nước gợi ý, đòn đó không còn hiệu quả – nếu đối thủ vẫn đi **${ot.san}** thì sẽ bị thiệt.`;
    else if (reply && reply.uci === ot.uci)
      text = `Đối thủ đang dọa ${what} và vẫn có thể thực hiện, nhưng máy tính toán rằng mọi cách phòng thủ trực tiếp đều kém hơn nước gợi ý.`;
    if (text) sections.push({ kind: 'defense', icon: '🛡️', title: 'Hóa giải đe dọa', text });
  }

  // ---------- Đối thủ nên đáp thế nào ----------
  const replyLine: Pick<AnalysisLine, 'uci' | 'san' | 'pv' | 'pvSan'> | null = reply ?? (best.pv.length > 1 ? { uci: best.pv[1], san: best.pvSan[1], pv: best.pv.slice(1), pvSan: best.pvSan.slice(1) } : null);
  const rm = replyLine ? posAfter.moveFromUci(replyLine.uci) : 0;
  if (replyLine && rm && !(best.mate > 0)) {
    const rp = purposeParts(posAfter, rm, { prevUci: best.uci, prevCapture: capturedHere });
    const recaptures = moveTo(rm) === moveTo(m) && !!(moveFlags(rm) & F_CAPTURE);
    const rwhy = !rp.final && rp.reasons.length ? ` – ${why(rp.reasons.slice(0, 2))}` : '';
    let text = recaptures && !capturedHere ? `Đối thủ nên ăn quân bằng **${replyLine.san}**${rwhy}.` : `Đối thủ nên đáp **${replyLine.san}**${rwhy}.`;
    if (replyLine.pv.length > 1) {
      posAfter.make(rm);
      const fm = posAfter.moveFromUci(replyLine.pv[1]);
      if (fm) {
        const fp = purposeParts(posAfter, fm, { prevUci: replyLine.uci, prevCapture: !!(moveFlags(rm) & F_CAPTURE) });
        const fwhy = fp.final === 'mate' ? 'chiếu hết!' : why(fp.reasons.slice(0, 2));
        text += ` Khi đó bạn tiếp tục **${replyLine.pvSan[1]}**${fwhy ? ` – ${fwhy}` : ''}.`;
      }
      posAfter.unmake();
    }
    sections.push({ kind: 'reply', icon: '↩️', title: 'Đối thủ đáp', text });
  }

  // ---------- Cái bẫy: nước đáp trông hấp dẫn nhưng thua thiệt ----------
  if (reply && deep?.tempting) {
    const replyWin = lineWin(reply);
    let trap: { line: AnalysisLine; drop: number; bait: number } | null = null;
    // Quân vừa đi đứng ở ô bị tấn công: nếu đối thủ ăn nó (dù không phải nước đáp tốt nhất), giải thích vì sao vẫn ổn
    let offer: AnalysisLine | null = null;
    for (const l of deep.tempting.lines) {
      if (l.uci === reply.uci || l.pv.length < 2) continue;
      const tm = posAfter.moveFromUci(l.uci);
      if (!tm) continue;
      if (offered && moveTo(tm) === moveTo(m) && !offer) offer = l;
      const drop = replyWin - lineWin(l);
      if (drop < TRAP_DROP && reply.score - l.score < TRAP_DROP_CP && !(l.mate < 0)) continue;
      const isCapture = !!(moveFlags(tm) & F_CAPTURE);
      const victim = moveFlags(tm) & F_EP ? PAWN : posAfter.board[moveTo(tm)] & 7;
      const capturer = posAfter.board[moveFrom(tm)] & 7;
      // trông như "ăn không": quân bị bắt giá trị hơn quân bắt, hoặc không có quân nào bảo vệ
      const looksFree = isCapture && (capturer === KING ? false : PIECE_VALUE[victim] >= PIECE_VALUE[capturer] || !posAfter.attackers(moveTo(tm), us).length);
      if (!looksFree && l.uci !== ot?.uci) continue;
      const bait = isCapture ? PIECE_VALUE[victim] : 0;
      if (!trap || bait > trap.bait || (bait === trap.bait && drop > trap.drop)) trap = { line: l, drop, bait };
    }
    if (trap) {
      const l = trap.line;
      const tm = posAfter.moveFromUci(l.uci);
      const isCapture = !!(moveFlags(tm) & F_CAPTURE);
      const victim = moveFlags(tm) & F_EP ? PAWN : posAfter.board[moveTo(tm)] & 7;
      posAfter.make(tm);
      const fm = posAfter.moveFromUci(l.pv[1]);
      const fp = fm ? purposeParts(posAfter, fm, { prevUci: l.uci, prevCapture: isCapture }) : null;
      posAfter.unmake();
      let outcome: string;
      if (l.mate < 0) outcome = `và chiếu hết sau ${-l.mate} nước`;
      else {
        const swing = settledSwing(posAfter, l.pv, us);
        outcome = swing >= 1 ? `cuối cùng bạn lời ${pointsText(swing)}` : `và giành ưu thế lớn (${evalText(l, them === 0)})`;
      }
      const fwhy = fp && !fp.final && fp.reasons.length ? ` – ${why(fp.reasons.slice(0, 1))}` : '';
      const lead = isCapture ? `Nếu đối thủ tham ăn ${piece(victim)} ở ${sqName(moveTo(tm))} bằng **${l.san}**?` : `Nếu đối thủ vẫn đi **${l.san}**?`;
      sections.push({ kind: 'trap', icon: '🪤', title: 'Cái bẫy', text: `${lead}, bạn đáp **${l.pvSan[1]}**${fwhy}, ${outcome}.` });
    } else if (offer) {
      const om = posAfter.moveFromUci(offer.uci);
      posAfter.make(om);
      const fm = posAfter.moveFromUci(offer.pv[1]);
      const fp = fm ? purposeParts(posAfter, fm, { prevUci: offer.uci, prevCapture: true }) : null;
      posAfter.unmake();
      const fwhy = fp && !fp.final && fp.reasons.length ? ` – ${why(fp.reasons.slice(0, 1))}` : fp?.final === 'mate' ? ' – chiếu hết!' : '';
      const moved = posAfter.board[moveTo(m)] & 7;
      const net = settledSwing(posAfter, offer.pv, us);
      const result = net >= 1 ? `, cuối cùng bạn lời ${pointsText(net)}` : '';
      sections.push({
        kind: 'trap',
        icon: '🎁',
        title: 'Nếu đối thủ ăn quân',
        text: `${piece(moved)} ở ${sqName(moveTo(m))} có thể bị bắt bằng **${offer.san}**, nhưng khi đó bạn có **${offer.pvSan[1]}**${fwhy}${result} (máy đánh giá ${evalText(offer, them === 0)}, còn tốt cho bạn hơn nước đáp **${reply.san}**).`,
      });
    }
  }

  // ---------- Đánh giá và so sánh với các phương án khác ----------
  const win = lineWin(best);
  let verdict = `Máy đánh giá **${evalText(best, white)}** – ${verdictWords(best, win)}.`;
  const second = before.lines[1];
  if (second && best.mate !== 1) {
    const gap = win - lineWin(second);
    if (gap >= 15) verdict += ` Đây gần như là nước duy nhất: phương án tốt nhì **${second.san}** chỉ được ${evalText(second, white)}.`;
    else if (gap >= 5) verdict += ` Tốt hơn rõ rệt so với **${second.san}** (${evalText(second, white)}).`;
    else {
      const close = before.lines.slice(1).filter((l) => win - lineWin(l) < 5);
      verdict += ` ${listVi(close.map((l) => `**${l.san}**`))} cũng tốt gần ngang bằng (${listVi(close.map((l) => evalText(l, white)))}).`;
    }
  }
  if (!best.mate) {
    const swing = settledSwing(new Position(pos.fen()), best.pv, us);
    if (swing >= 1) verdict += ` Theo diễn biến dự kiến, bạn giành thêm ${pointsText(swing)}.`;
    else if (swing <= -2 && win >= 47) verdict += ` Bạn chấp nhận bỏ ra ${pointsText(swing)} để đổi lấy thế chủ động.`;
  }
  sections.push({ kind: 'verdict', icon: '⚖️', title: 'Đánh giá', text: verdict });
  return sections;
}
