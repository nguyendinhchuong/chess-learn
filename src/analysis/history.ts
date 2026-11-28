// Ván đã chơi (lưu trên trình duyệt), ván đang mở ở trang phân tích và bộ nhớ đệm kết quả phân tích.
import { load, save, useStored } from '../lib/storage';
import { navigate } from '../lib/router';
import type { AnalysisResult } from '../engine/protocol';
import type { OnlineKit } from '../online/kit';
import type { PublicRoom, Side, Variant } from '../online/protocol';
import { formatSheet, hashText, type SheetResult } from './sheet';

/** Một ván có thể phân tích: biên bản PGN kèm vài thông tin để hiển thị trong danh sách */
export interface SavedGame {
  id: string;
  variant: Variant;
  pgn: string;
  players: [string, string];
  result: SheetResult;
  /** Bên của người dùng (nếu biết) */
  you: Side | null;
  plies: number;
  savedAt: number;
  /** online: phòng "Chơi với bạn"; local: hai người chơi trên một máy (trang Luyện tập); import: nhập biên bản */
  source: 'online' | 'local' | 'import';
  /** Mã phòng của ván chơi với bạn (ván lưu trước khi có trường này: lấy từ `id`) */
  room?: string;
}

const HISTORY_KEY = 'game-history';
const HISTORY_MAX = 30;
const currentKey = (v: Variant) => `analysis-game-${v}`;

export function useGameHistory(): [SavedGame[], (v: SavedGame[] | ((old: SavedGame[]) => SavedGame[])) => void] {
  return useStored<SavedGame[]>(HISTORY_KEY, []);
}

/** Lưu ván vào danh sách "Ván đã chơi" (ván cùng mã thay cho bản cũ) */
export function rememberGame(g: SavedGame) {
  const list = load<SavedGame[]>(HISTORY_KEY, []);
  const old = list.find((x) => x.id === g.id);
  // ván trong phòng đã kết thúc thì không đổi: mở lại phòng hôm sau không ghi đè ngày chơi
  if (old && (old.pgn === g.pgn || (old.source === 'online' && old.plies === g.plies && old.result === g.result))) return;
  save(HISTORY_KEY, [g, ...list.filter((x) => x.id !== g.id)].slice(0, HISTORY_MAX));
}

export function useCurrentGame(v: Variant) {
  return useStored<SavedGame | null>(currentKey(v), null);
}

/** Mã phòng đã chơi ván này (null với ván nhập từ biên bản) */
export function roomOf(g: SavedGame): string | null {
  if (g.source !== 'online') return null;
  return g.room ?? /^(.+)-\d+$/.exec(g.id)?.[1] ?? null;
}

/** Mở trang phân tích cho một ván */
export function openAnalysis(g: SavedGame) {
  save(currentKey(g.variant), g);
  navigate(`${g.variant === 'chess' ? '' : '/co-tuong'}/phong/phan-tich`);
}

const endDetailCap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Lý do kết thúc bằng lời: "Đen xin thua", "Chiếu hết"… */
export function endDetail(room: Pick<PublicRoom, 'result' | 'reason'>, kit: Pick<OnlineKit, 'reasons' | 'sideNames'>): string {
  if (!room.reason) return '';
  const text = kit.reasons[room.reason];
  const loser: Side | null = room.result === '1-0' ? 1 : room.result === '0-1' ? 0 : null;
  if (loser !== null && (room.reason === 'resign' || room.reason === 'timeout' || room.reason === 'perpetual')) return `${kit.sideNames[loser]} ${text}`;
  return endDetailCap(text);
}

/** Biên bản của ván đang có trong phòng chơi */
export function roomGame(kit: OnlineKit, room: PublicRoom, you: Side | null, line: { sans: string[] }, link: string): SavedGame {
  const players: [string, string] = [room.seats[0]?.name ?? kit.sideNames[0], room.seats[1]?.name ?? kit.sideNames[1]];
  const ucis = room.moves.slice(0, line.sans.length);
  const pgn = formatSheet({
    variant: room.variant,
    players,
    result: room.status === 'over' ? room.result : null,
    reason: room.status === 'over' ? room.reason : null,
    reasonText: room.status === 'over' ? endDetail(room, kit) : undefined,
    time: room.time,
    date: new Date(),
    site: link,
    round: room.game,
    ucis,
    sans: line.sans,
    clockLog: room.clockLog,
  });
  return {
    id: `${room.code}-${room.game}`,
    variant: room.variant,
    pgn,
    players,
    result: room.status === 'over' && room.result ? room.result : '*',
    you,
    plies: ucis.length,
    savedAt: Date.now(),
    source: 'online',
    room: room.code,
  };
}

export function downloadText(text: string, fileName: string) {
  const url = URL.createObjectURL(new Blob([text], { type: 'application/x-chess-pgn;charset=utf-8' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// ---- bộ nhớ đệm phân tích: giữ kết quả của vài ván gần nhất để mở lại không phải chờ ----
const CACHE_KEY = 'analysis-cache';
const CACHE_GAMES = 4;
type Cache = { key: string; at: number; results: (AnalysisResult | null)[] }[];

export const analysisKey = (variant: Variant, startFen: string, ucis: string[], timeMs: number) => hashText(`${variant}|${startFen}|${ucis.join(' ')}|${timeMs}`);

export function loadAnalysis(key: string, length: number): (AnalysisResult | null)[] {
  const hit = load<Cache>(CACHE_KEY, []).find((c) => c.key === key);
  return hit && hit.results.length === length ? hit.results : Array(length).fill(null);
}

/** Bỏ bớt phần không cần (diễn biến dài, đe dọa) để bộ nhớ đệm nhỏ gọn */
export function slim(r: AnalysisResult): AnalysisResult {
  return { ...r, threat: undefined, lines: r.lines.map((l) => ({ ...l, pv: l.pv.slice(0, 10), pvSan: l.pvSan.slice(0, 10) })) };
}

export function saveAnalysis(key: string, results: (AnalysisResult | null)[]) {
  const others = load<Cache>(CACHE_KEY, []).filter((c) => c.key !== key);
  save(CACHE_KEY, [{ key, at: Date.now(), results }, ...others].slice(0, CACHE_GAMES));
}
