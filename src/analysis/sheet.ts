// Biên bản ván đấu (game sheet) dạng PGN: xuất từ phòng "Chơi với bạn" và đọc lại để phân tích.
// Không phụ thuộc bộ máy cờ nào: nước đi được đọc thành chữ (token), bộ máy của từng môn đi lại từng nước (src/analysis/*Review.ts).
//
// Cờ vua: PGN chuẩn (SAN), đồng hồ ghi theo kiểu lichess {[%clk 0:04:58]} nên đọc được ở lichess, chess.com…
// Cờ tướng: theo quy ước PGN cờ tướng của xqbase ([Game "Chinese Chess"], [Format "ICCS"], nước đi dạng H2-E2),
// kèm ký hiệu Việt Nam trong lời bình ({P2-5}) cho dễ đọc. Khi đọc vào còn chấp nhận ký hiệu Việt Nam và chữ Hán.
import type { EndReason, Result, TimeControl, Variant } from '../online/protocol';

export type SheetResult = Result | '*';

export interface SheetInput {
  variant: Variant;
  /** Tên giải (thẻ Event); mặc định là "Chơi … với bạn" */
  event?: string;
  players: [string, string];
  result: Result | null;
  reason: EndReason | null;
  /** Lời giải thích kết quả bằng tiếng Việt, vd "Đen xin thua" */
  reasonText?: string;
  time: TimeControl | null;
  date: Date;
  /** Đường dẫn phòng */
  site?: string;
  /** Ván thứ mấy trong phòng */
  round?: number;
  /** Nước đi dạng tọa độ (UCI / ICCS chữ thường) */
  ucis: string[];
  /** Ký hiệu hiển thị: SAN (cờ vua) hoặc ký hiệu Việt Nam (cờ tướng) */
  sans: string[];
  /** Thời gian còn lại của bên vừa đi sau từng nước (ms) */
  clockLog?: number[];
  opening?: string;
}

const XQ_HEADERS = { Game: 'Chinese Chess', Variant: 'Xiangqi', Format: 'ICCS' };

const escapeTag = (v: string) => v.replace(/\\/g, '\\\\').replace(/"/g, '\\"');

const pad = (n: number, w = 2) => String(n).padStart(w, '0');

/** Định dạng [%clk h:mm:ss] (làm tròn xuống giây, như lichess) */
export function formatClk(ms: number): string {
  const t = Math.max(0, Math.floor(ms / 1000));
  return `${Math.floor(t / 3600)}:${pad(Math.floor((t % 3600) / 60))}:${pad(t % 60)}`;
}

export function parseClk(s: string): number | null {
  const m = /^(\d+):(\d{1,2}):(\d{1,2}(?:\.\d+)?)$/.exec(s.trim());
  if (!m) return null;
  return Math.round((Number(m[1]) * 3600 + Number(m[2]) * 60 + Number(m[3])) * 1000);
}

export function formatTimeControl(t: TimeControl | null): string {
  return t ? `${Math.round(t.initial / 1000)}+${Math.round(t.increment / 1000)}` : '-';
}

export function parseTimeControl(s: string | undefined): TimeControl | null {
  const m = /^(\d+)(?:\+(\d+))?$/.exec((s ?? '').trim());
  if (!m) return null;
  return { initial: Number(m[1]) * 1000, increment: Number(m[2] ?? 0) * 1000 };
}

export const pgnDate = (d: Date) => `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())}`;

const TERMINATION: Partial<Record<EndReason, string>> = { timeout: 'Time forfeit' };

/** Nước tọa độ cờ tướng theo kiểu xqbase: h2e2 → H2-E2 */
const iccs = (u: string) => `${u.slice(0, 2)}-${u.slice(2, 4)}`.toUpperCase();

/** Viết biên bản PGN của một ván */
export function formatSheet(g: SheetInput): string {
  const result: SheetResult = g.result ?? '*';
  const tags: [string, string][] = [
    ['Event', g.event ?? (g.variant === 'chess' ? 'Kỳ Đạo – Chơi cờ vua với bạn' : 'Kỳ Đạo – Chơi cờ tướng với bạn')],
    ['Site', g.site ?? 'Kỳ Đạo'],
    ['Date', pgnDate(g.date)],
    ['Round', String(g.round ?? 1)],
    [g.variant === 'chess' ? 'White' : 'Red', g.players[0]],
    ['Black', g.players[1]],
    ['Result', result],
  ];
  if (g.variant === 'xiangqi') tags.push(...(Object.entries(XQ_HEADERS) as [string, string][]));
  tags.push(['TimeControl', formatTimeControl(g.time)]);
  tags.push(['PlyCount', String(g.ucis.length)]);
  if (g.opening) tags.push(['Opening', g.opening]);
  if (g.result) tags.push(['Termination', TERMINATION[g.reason!] ?? 'Normal']);
  if (g.reason) tags.push(['EndReason', g.reason]);

  const clocks = g.clockLog && g.clockLog.length === g.ucis.length ? g.clockLog : null;
  const parts: string[] = [];
  let afterComment = false;
  g.ucis.forEach((u, i) => {
    const no = Math.floor(i / 2) + 1;
    if (i % 2 === 0) parts.push(`${no}.`);
    else if (afterComment) parts.push(`${no}...`);
    const notes: string[] = [];
    if (g.variant === 'chess') parts.push(g.sans[i] ?? u);
    else {
      parts.push(iccs(u));
      if (g.sans[i]) notes.push(g.sans[i]);
    }
    if (clocks) notes.push(`[%clk ${formatClk(clocks[i])}]`);
    afterComment = notes.length > 0;
    if (afterComment) parts.push(`{${notes.join(' ')}}`);
  });
  if (g.reasonText) parts.push(`{${g.reasonText.replace(/[{}]/g, '')}}`);
  parts.push(result);

  // gói dòng ~80 ký tự như các phần mềm cờ thường làm
  const lines: string[] = [];
  let line = '';
  for (const p of parts) {
    if (line && line.length + 1 + p.length > 80) {
      lines.push(line);
      line = p;
    } else line = line ? `${line} ${p}` : p;
  }
  if (line) lines.push(line);
  return tags.map(([k, v]) => `[${k} "${escapeTag(v)}"]`).join('\n') + '\n\n' + lines.join('\n') + '\n';
}

/** Tên tệp không dấu: ky-dao_co-vua_an-vs-binh_2026-11-15.pgn */
export function sheetFileName(variant: Variant, players: [string, string], date: Date): string {
  const slug = (s: string) =>
    s
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 24) || 'nguoi-choi';
  const d = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  return `ky-dao_${variant === 'chess' ? 'co-vua' : 'co-tuong'}_${slug(players[0])}-vs-${slug(players[1])}_${d}.pgn`;
}

// =====================================================================================
// Đọc biên bản
// =====================================================================================

export interface ParsedSheet {
  variant: Variant;
  headers: Record<string, string>;
  /** Nước đi dạng chữ, theo thứ tự (chưa kiểm tra hợp lệ) */
  tokens: string[];
  /** Thời gian còn lại sau từng nước (ms) nếu biên bản có [%clk], cùng độ dài với tokens */
  clocks: (number | null)[];
  result: SheetResult;
  startFen?: string;
  players: [string, string];
  time: TimeControl | null;
  /** Lý do kết thúc nếu biên bản do Kỳ Đạo xuất (thẻ EndReason) hoặc suy ra từ thẻ Termination */
  reason: EndReason | null;
}

export type SheetError = { error: 'empty' | 'no-moves' | 'variant'; detail?: string };

const END_REASONS: EndReason[] = ['checkmate', 'stalemate', 'insufficient', 'fifty', 'repetition', 'perpetual', 'moveLimit', 'resign', 'timeout', 'agreement'];
const RESULT_RE = /^(1-0|0-1|1\/2-1\/2|½-½|\*)$/;

/** Ký hiệu Việt Nam cờ tướng: P2-5, M8.7, X1/1, Xt.3, Tg5.1 (để nhận ra môn cờ khi biên bản không ghi) */
const XQ_VN_RE = /^(Tg|[SXMPBT])([1-9]|[tsg])[.\-/][1-9]$/;
const CJK_RE = /[㐀-鿿]/;

function detectVariant(headers: Record<string, string>, tokens: string[]): Variant | 'unsupported' {
  const v = `${headers.Variant ?? ''} ${headers.Game ?? ''}`.toLowerCase();
  if (/xiangqi|chinese|cờ tướng|co tuong/.test(v)) return 'xiangqi';
  if (headers.Red !== undefined && headers.White === undefined) return 'xiangqi';
  const variant = (headers.Variant ?? '').trim().toLowerCase();
  if (variant && !['standard', 'chess', 'normal', 'from position'].includes(variant)) return 'unsupported';
  // biên bản không ghi môn cờ: nhìn vào ký hiệu nước đi
  const sample = tokens.slice(0, 12);
  if (sample.some((t) => CJK_RE.test(t) || XQ_VN_RE.test(t) || /^[a-i]\d-[a-i]\d$/i.test(t) || /^[a-i][09][a-i]\d$|^[a-i]\d[a-i][09]$|^i\d|^[a-i]\di/i.test(t))) return 'xiangqi';
  return 'chess';
}

/**
 * Đọc biên bản PGN (chỉ lấy ván đầu tiên nếu tệp có nhiều ván). Bỏ qua biến phụ (…), ký hiệu đánh giá $n, !?,
 * số thứ tự nước; giữ lại [%clk] trong lời bình. Chấp nhận cả chuỗi nước đi trần không có phần đầu.
 */
export function parseSheet(raw: string): ParsedSheet | SheetError {
  const text = raw.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n');
  if (!text.trim()) return { error: 'empty' };

  const headers: Record<string, string> = {};
  let i = 0;
  const n = text.length;
  // phần đầu: các thẻ [Tên "giá trị"]
  const TAG_RE = /\[\s*([A-Za-z0-9_]+)\s+"((?:[^"\\]|\\.)*)"\s*\]/y;
  for (;;) {
    while (i < n && /\s/.test(text[i])) i++;
    if (text[i] !== '[') break;
    TAG_RE.lastIndex = i;
    const m = TAG_RE.exec(text);
    if (!m) break;
    headers[m[1]] = m[2].replace(/\\(["\\])/g, '$1');
    i = TAG_RE.lastIndex;
  }

  // phần nước đi
  const tokens: string[] = [];
  const clocks: (number | null)[] = [];
  let result: SheetResult = '*';
  let depth = 0;
  let word = '';
  const flush = () => {
    let t = word;
    word = '';
    if (!t || depth > 0) return;
    // "12." "12..." đứng riêng, hoặc dính liền nước đi ("1.e4", "1.P2-5")
    t = t.replace(/^\d+\.+(?=\D)/, '');
    if (!t || /^\d+\.+$/.test(t) || /^\.+$/.test(t) || /^\$\d+$/.test(t)) return;
    if (RESULT_RE.test(t)) {
      result = t === '½-½' ? '1/2-1/2' : (t as SheetResult);
      return;
    }
    t = t.replace(/\$\d+$/, '').replace(/[!?]+$/, '');
    // "exd6 e.p." viết tách rời
    if (!t || /^e\.p\.?$/i.test(t)) return;
    tokens.push(t);
    clocks.push(null);
  };
  for (; i < n; i++) {
    const c = text[i];
    if (c === '{') {
      flush();
      const end = text.indexOf('}', i + 1);
      const body = text.slice(i + 1, end < 0 ? n : end);
      const clk = /\[%clk\s+([\d:.]+)\]/.exec(body);
      if (clk && depth === 0 && clocks.length) clocks[clocks.length - 1] = parseClk(clk[1]);
      i = end < 0 ? n : end;
    } else if (c === ';') {
      flush();
      const end = text.indexOf('\n', i + 1);
      i = end < 0 ? n : end;
    } else if (c === '(') {
      flush();
      depth++;
    } else if (c === ')') {
      flush();
      depth = Math.max(0, depth - 1);
    } else if (c === '[' && depth === 0 && tokens.length && /^\[\s*Event\s/.test(text.slice(i, i + 12))) {
      // bắt đầu ván thứ hai trong tệp
      break;
    } else if (/\s/.test(c)) flush();
    else word += c;
  }
  flush();

  if (!tokens.length) return Object.keys(headers).length || result !== '*' ? { error: 'no-moves' } : { error: 'empty' };
  const variant = detectVariant(headers, tokens);
  if (variant === 'unsupported') return { error: 'variant', detail: headers.Variant };

  const hdrResult = headers.Result;
  if (result === '*' && hdrResult && RESULT_RE.test(hdrResult)) result = hdrResult === '½-½' ? '1/2-1/2' : (hdrResult as SheetResult);
  const tagReason = headers.EndReason as EndReason | undefined;
  const reason: EndReason | null =
    tagReason && END_REASONS.includes(tagReason) ? tagReason : /time forfeit/i.test(headers.Termination ?? '') ? 'timeout' : null;
  const startFen = headers.SetUp === '1' || headers.FEN ? headers.FEN?.trim() || undefined : undefined;
  const name = (v: string | undefined, fallback: string) => (v && v.trim() && v.trim() !== '?' ? v.trim() : fallback);
  return {
    variant,
    headers,
    tokens,
    clocks: clocks.some((c) => c !== null) ? clocks : [],
    result,
    startFen,
    players: [
      name(headers.White ?? headers.Red, variant === 'chess' ? 'Trắng' : 'Đỏ'),
      name(headers.Black, 'Đen'),
    ],
    time: parseTimeControl(headers.TimeControl),
    reason,
  };
}

export const isSheetError = (x: ParsedSheet | SheetError): x is SheetError => 'error' in x;

/** Mã băm ngắn của một chuỗi (FNV-1a), dùng làm khóa bộ nhớ đệm phân tích */
export function hashText(s: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(36);
}
