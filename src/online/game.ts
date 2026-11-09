// Luật của một phòng chơi trực tuyến, chạy trên máy chủ phòng (server/src/room.ts).
// Hàm thuần: nhận trạng thái phòng và một thông điệp, kiểm tra hợp lệ rồi sửa trạng thái tại chỗ.
// Nước đi được kiểm tra bằng đúng bộ máy cờ mà trình duyệt dùng (src/engine, src/xiangqi/engine).
import { Position as ChessPosition } from '../engine/board';
import { Position as XqPosition } from '../xiangqi/engine/board';
import {
  ClientMessage,
  CreateRoomRequest,
  EndReason,
  ErrorCode,
  NAME_MAX,
  PublicRoom,
  Result,
  RoomStatus,
  Side,
  TIME_LIMITS,
  TOKEN_RE,
  TimeControl,
  Variant,
} from './protocol';

export interface Seat {
  /** Mã bí mật của người chơi (trình duyệt tự sinh, lưu trong localStorage); không bao giờ gửi cho người khác */
  token: string;
  name: string;
}

export interface RoomState {
  code: string;
  variant: Variant;
  time: TimeControl | null;
  seats: [Seat | null, Seat | null];
  moves: string[];
  /** Thời gian còn lại của hai bên tính đến lúc `turnStartedAt` */
  clocks: [number, number] | null;
  /** Lúc đồng hồ của bên đang đi bắt đầu chạy; null khi chưa chạy (hai nước đầu), không tính giờ hoặc ván đã xong */
  turnStartedAt: number | null;
  status: RoomStatus;
  result: Result | null;
  reason: EndReason | null;
  drawOffer: Side | null;
  rematch: [boolean, boolean];
  game: number;
  createdAt: number;
  lastActivity: number;
}

/** Phòng không có ai kết nối và không có hoạt động trong khoảng này thì bị xóa */
export const ROOM_TTL_MS = 3 * 24 * 3600_000;

const DEFAULT_NAME = 'Người chơi';
const UCI_RE = /^[a-i][0-9][a-i][0-9][qrbn]?$/;

interface RulesPosition {
  moveFromUci(uci: string): number;
  make(m: number): boolean;
  status(): { over: boolean; result?: Result; reason?: string };
}

function newPosition(variant: Variant): RulesPosition {
  return variant === 'chess' ? new ChessPosition() : new XqPosition();
}

/** Thế cờ sau chuỗi nước (null nếu có nước không hợp lệ) */
export function replay(variant: Variant, moves: string[]): RulesPosition | null {
  const pos = newPosition(variant);
  for (const u of moves) {
    const m = pos.moveFromUci(u);
    if (!m) return null;
    pos.make(m);
  }
  return pos;
}

export function cleanName(raw: unknown): string {
  if (typeof raw !== 'string') return DEFAULT_NAME;
  // bỏ ký tự điều khiển, gộp khoảng trắng
  // eslint-disable-next-line no-control-regex
  const s = raw.replace(/[\u0000-\u001f\u007f]/g, '').replace(/\s+/g, ' ').trim();
  return Array.from(s).slice(0, NAME_MAX).join('') || DEFAULT_NAME;
}

function parseTime(raw: unknown): TimeControl | null | undefined {
  if (raw === null) return null;
  if (typeof raw !== 'object') return undefined;
  const { initial, increment } = raw as Record<string, unknown>;
  if (typeof initial !== 'number' || typeof increment !== 'number') return undefined;
  if (!Number.isInteger(initial) || !Number.isInteger(increment)) return undefined;
  if (initial < TIME_LIMITS.minInitial || initial > TIME_LIMITS.maxInitial) return undefined;
  if (increment < 0 || increment > TIME_LIMITS.maxIncrement) return undefined;
  return { initial, increment };
}

/** Kiểm tra yêu cầu tạo phòng gửi từ trình duyệt */
export function parseCreate(body: unknown): CreateRoomRequest | null {
  if (!body || typeof body !== 'object') return null;
  const b = body as Record<string, unknown>;
  if (b.variant !== 'chess' && b.variant !== 'xiangqi') return null;
  if (b.side !== 0 && b.side !== 1 && b.side !== 'random') return null;
  if (typeof b.token !== 'string' || !TOKEN_RE.test(b.token)) return null;
  const time = parseTime(b.time);
  if (time === undefined) return null;
  return { variant: b.variant, side: b.side, time, token: b.token, name: cleanName(b.name) };
}

export function createRoom(code: string, req: CreateRoomRequest, now: number, random = Math.random): RoomState {
  const side: Side = req.side === 'random' ? (random() < 0.5 ? 0 : 1) : req.side;
  const seats: [Seat | null, Seat | null] = [null, null];
  seats[side] = { token: req.token, name: cleanName(req.name) };
  return {
    code,
    variant: req.variant,
    time: req.time,
    seats,
    moves: [],
    clocks: req.time ? [req.time.initial, req.time.initial] : null,
    turnStartedAt: null,
    status: 'waiting',
    result: null,
    reason: null,
    drawOffer: null,
    rematch: [false, false],
    game: 1,
    createdAt: now,
    lastActivity: now,
  };
}

export function sideOf(room: RoomState, token: string | null): Side | null {
  if (!token) return null;
  if (room.seats[0]?.token === token) return 0;
  if (room.seats[1]?.token === token) return 1;
  return null;
}

export const turnOf = (room: RoomState): Side => (room.moves.length % 2) as Side;

/** Thời điểm bên đang đi hết giờ (null nếu đồng hồ không chạy) */
export function deadline(room: RoomState): number | null {
  if (room.status !== 'playing' || !room.clocks || room.turnStartedAt === null) return null;
  return room.turnStartedAt + room.clocks[turnOf(room)];
}

/** Lần đánh thức tiếp theo của phòng: lúc bên đang đi hết giờ, hoặc lúc dọn phòng bỏ không */
export function nextAlarm(room: RoomState): number {
  return deadline(room) ?? room.lastActivity + ROOM_TTL_MS;
}

function end(room: RoomState, result: Result, reason: EndReason, now: number) {
  if (room.clocks && room.turnStartedAt !== null) {
    const s = turnOf(room);
    room.clocks[s] = Math.max(0, room.clocks[s] - (now - room.turnStartedAt));
  }
  room.turnStartedAt = null;
  room.status = 'over';
  room.result = result;
  room.reason = reason;
  room.drawOffer = null;
  room.rematch = [false, false];
}

const loses = (s: Side): Result => (s === 0 ? '0-1' : '1-0');

/** Xử thua bên đang đi nếu đã hết giờ. Trả về true nếu trạng thái thay đổi. */
export function checkFlag(room: RoomState, now: number): boolean {
  const d = deadline(room);
  if (d === null || now < d) return false;
  const s = turnOf(room);
  room.clocks![s] = 0;
  room.turnStartedAt = null;
  end(room, loses(s), 'timeout', now);
  room.lastActivity = now;
  return true;
}

function startGame(room: RoomState) {
  room.status = 'playing';
  room.moves = [];
  room.clocks = room.time ? [room.time.initial, room.time.initial] : null;
  room.turnStartedAt = null;
  room.result = null;
  room.reason = null;
  room.drawOffer = null;
  room.rematch = [false, false];
}

/**
 * Xử lý một thông điệp của người có mã `token`. Trả về mã lỗi, hoặc null nếu hợp lệ (trạng thái đã được cập nhật).
 * Gọi `checkFlag` trước hàm này để nước đi tới sau khi hết giờ không được tính.
 */
export function handle(room: RoomState, token: string | null, msg: ClientMessage, now: number): ErrorCode | null {
  const side = sideOf(room, token);
  switch (msg.t) {
    case 'join': {
      if (!token) return 'bad-request';
      if (side !== null) return null;
      const free = room.seats[0] === null ? 0 : room.seats[1] === null ? 1 : null;
      if (free === null) return 'seat-taken';
      room.seats[free] = { token, name: cleanName(msg.name) };
      if (room.status === 'waiting' && room.seats[0] && room.seats[1]) startGame(room);
      break;
    }
    case 'move': {
      if (side === null) return 'not-seated';
      if (room.status !== 'playing') return 'not-playing';
      if (typeof msg.ply !== 'number' || msg.ply !== room.moves.length) return 'stale';
      if (turnOf(room) !== side) return 'not-your-turn';
      if (typeof msg.uci !== 'string' || !UCI_RE.test(msg.uci)) return 'bad-request';
      const pos = replay(room.variant, room.moves);
      const m = pos?.moveFromUci(msg.uci);
      if (!pos || !m) return 'illegal';
      if (room.clocks && room.time && room.turnStartedAt !== null) {
        room.clocks[side] = Math.max(0, room.clocks[side] - (now - room.turnStartedAt)) + room.time.increment;
      }
      pos.make(m);
      room.moves.push(msg.uci);
      // đi một nước thay cho trả lời lời mời hòa = từ chối
      if (room.drawOffer === 1 - side) room.drawOffer = null;
      const st = pos.status();
      if (st.over && st.result) {
        room.turnStartedAt = null;
        end(room, st.result, st.reason as EndReason, now);
      } else {
        // như các trang cờ trực tuyến: hai nước đầu không tính giờ
        room.turnStartedAt = room.clocks && room.moves.length >= 2 ? now : null;
      }
      break;
    }
    case 'resign':
      if (side === null) return 'not-seated';
      if (room.status !== 'playing') return 'not-playing';
      end(room, loses(side), 'resign', now);
      break;
    case 'draw':
      if (side === null) return 'not-seated';
      if (room.status !== 'playing') return 'not-playing';
      if (room.drawOffer === 1 - side) end(room, '1/2-1/2', 'agreement', now);
      else room.drawOffer = side;
      break;
    case 'decline':
      if (side === null) return 'not-seated';
      if (room.drawOffer === 1 - side) room.drawOffer = null;
      break;
    case 'rematch':
      if (side === null) return 'not-seated';
      if (room.status !== 'over') return 'not-playing';
      room.rematch[side] = true;
      if (room.rematch[0] && room.rematch[1]) {
        // ván mới: hai bên đổi màu
        room.seats = [room.seats[1], room.seats[0]];
        room.game++;
        startGame(room);
      }
      break;
    default:
      return 'bad-request';
  }
  room.lastActivity = now;
  return null;
}

/** Trạng thái phòng gửi cho người có mã `token` */
export function view(room: RoomState, token: string | null, now: number, online: [boolean, boolean]): { you: Side | null; room: PublicRoom } {
  const running = room.status === 'playing' && room.clocks && room.turnStartedAt !== null ? turnOf(room) : null;
  let clocks: [number, number] | null = null;
  if (room.clocks) {
    clocks = [room.clocks[0], room.clocks[1]];
    if (running !== null) clocks[running] = Math.max(0, clocks[running] - (now - room.turnStartedAt!));
  }
  const seat = (s: Side) => {
    const st = room.seats[s];
    return st ? { name: st.name, online: online[s] } : null;
  };
  return {
    you: sideOf(room, token),
    room: {
      code: room.code,
      variant: room.variant,
      time: room.time,
      seats: [seat(0), seat(1)],
      moves: [...room.moves],
      clocks,
      running,
      status: room.status,
      result: room.result,
      reason: room.reason,
      drawOffer: room.drawOffer,
      rematch: [room.rematch[0], room.rematch[1]],
      game: room.game,
    },
  };
}

/** Đọc thông điệp từ trình duyệt; bỏ qua thông điệp sai định dạng */
export function parseClientMessage(data: unknown): ClientMessage | null {
  if (typeof data !== 'string' || data.length > 1000) return null;
  let msg: unknown;
  try {
    msg = JSON.parse(data);
  } catch {
    return null;
  }
  if (!msg || typeof msg !== 'object' || typeof (msg as { t?: unknown }).t !== 'string') return null;
  return msg as ClientMessage;
}
