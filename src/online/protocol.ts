// Giao thức phòng chơi trực tuyến: dùng chung cho trình duyệt và máy chủ phòng (server/).
// Tệp này không phụ thuộc bộ máy cờ nào để phần cờ vua không phải tải bộ máy cờ tướng và ngược lại.

export type Variant = 'chess' | 'xiangqi';
/** 0 = bên đi trước (Trắng / Đỏ), 1 = Đen */
export type Side = 0 | 1;
export type Result = '1-0' | '0-1' | '1/2-1/2';
export type EndReason =
  | 'checkmate'
  | 'stalemate'
  | 'insufficient'
  | 'fifty'
  | 'repetition'
  | 'perpetual'
  | 'moveLimit'
  | 'resign'
  | 'timeout'
  | 'agreement';

/** Thời gian mỗi bên (mili giây) và thời gian cộng thêm sau mỗi nước */
export interface TimeControl {
  initial: number;
  increment: number;
}

export interface CreateRoomRequest {
  variant: Variant;
  /** Màu của người tạo phòng */
  side: Side | 'random';
  time: TimeControl | null;
  token: string;
  name: string;
}

export interface CreateRoomResponse {
  code: string;
}

export type RoomStatus = 'waiting' | 'playing' | 'over';

export interface PublicSeat {
  name: string;
  online: boolean;
}

/** Trạng thái phòng gửi cho từng người (không có mã bí mật của người chơi) */
export interface PublicRoom {
  code: string;
  variant: Variant;
  time: TimeControl | null;
  /** Theo bên: [Trắng/Đỏ, Đen] */
  seats: [PublicSeat | null, PublicSeat | null];
  moves: string[];
  /** Thời gian còn lại (ms) của hai bên tại thời điểm gửi */
  clocks: [number, number] | null;
  /** Bên đang chạy đồng hồ (null: chưa chạy – hai nước đầu không tính giờ – hoặc ván đã kết thúc) */
  running: Side | null;
  status: RoomStatus;
  result: Result | null;
  reason: EndReason | null;
  /** Bên đang đề nghị hòa */
  drawOffer: Side | null;
  /** Bên đã bấm "ván mới" */
  rematch: [boolean, boolean];
  /** Số thứ tự ván trong phòng (tăng khi chơi ván mới, hai bên đổi màu) */
  game: number;
}

export type ClientMessage =
  | { t: 'hello'; token: string }
  | { t: 'join'; name: string }
  | { t: 'move'; ply: number; uci: string }
  | { t: 'resign' }
  | { t: 'draw' }
  | { t: 'decline' }
  | { t: 'rematch' };

export type ErrorCode = 'not-found' | 'bad-request' | 'not-seated' | 'seat-taken' | 'not-playing' | 'not-your-turn' | 'stale' | 'illegal';

export type ServerMessage = { t: 'state'; you: Side | null; room: PublicRoom } | { t: 'error'; code: ErrorCode };

/** Mã đóng kết nối khi phòng không tồn tại */
export const CLOSE_NOT_FOUND = 4404;
/** Mã đóng kết nối khi phòng đã quá đông người xem */
export const CLOSE_FULL = 4429;

/** Mã phòng: 6 ký tự, bỏ các chữ dễ nhầm (I, O, 0, 1) */
export const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
export const CODE_LENGTH = 6;
export const CODE_RE = new RegExp(`^[${CODE_ALPHABET}]{${CODE_LENGTH}}$`);
export const TOKEN_RE = /^[A-Za-z0-9_-]{16,64}$/;
export const NAME_MAX = 24;

/** Chuẩn hóa mã phòng người dùng gõ vào: viết hoa, bỏ khoảng trắng và gạch nối */
export function normalizeCode(input: string): string {
  return input.toUpperCase().replace(/[\s-]/g, '');
}

/** Các mức thời gian cho người tạo phòng chọn; máy chủ chấp nhận mọi mức trong giới hạn TIME_LIMITS */
export const TIME_PRESETS: { label: string; time: TimeControl | null }[] = [
  { label: 'Không giới hạn', time: null },
  { label: '3 + 2', time: { initial: 3 * 60_000, increment: 2_000 } },
  { label: '5 + 3', time: { initial: 5 * 60_000, increment: 3_000 } },
  { label: '10 + 5', time: { initial: 10 * 60_000, increment: 5_000 } },
  { label: '15 + 10', time: { initial: 15 * 60_000, increment: 10_000 } },
  { label: '30 + 0', time: { initial: 30 * 60_000, increment: 0 } },
];

export const TIME_LIMITS = { minInitial: 60_000, maxInitial: 180 * 60_000, maxIncrement: 60_000 };

export function timeLabel(t: TimeControl | null): string {
  if (!t) return 'Không giới hạn thời gian';
  return `${Math.round(t.initial / 60_000)} phút + ${Math.round(t.increment / 1000)} giây`;
}
