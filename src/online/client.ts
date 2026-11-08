// Kết nối tới máy chủ phòng chơi: tạo phòng (HTTP) và giữ WebSocket của phòng (tự kết nối lại).
import { useCallback, useEffect, useRef, useState } from 'react';
import { load, save } from '../lib/storage';
import {
  CLOSE_FULL,
  CLOSE_NOT_FOUND,
  ClientMessage,
  CreateRoomRequest,
  CreateRoomResponse,
  ErrorCode,
  PublicRoom,
  ServerMessage,
  Side,
  TOKEN_RE,
} from './protocol';

/**
 * Địa chỉ máy chủ phòng. Mặc định cùng nguồn với trang (khi phát triển, Vite chuyển /api tới `npm run dev:server`);
 * khi trang web và máy chủ phòng ở hai tên miền khác nhau, đặt VITE_ROOM_SERVER=https://… lúc build.
 */
const SERVER = ((import.meta.env.VITE_ROOM_SERVER as string | undefined) ?? '').replace(/\/+$/, '');

function apiUrl(path: string): URL {
  return new URL(SERVER + '/api' + path, window.location.href);
}

let memoryToken: string | null = null;

/** Mã bí mật của người chơi trên trình duyệt này: tải lại trang hay mở lại đường dẫn vẫn giữ được chỗ ngồi */
export function playerToken(): string {
  const stored = load<string | null>('online-token', null);
  if (stored && TOKEN_RE.test(stored)) return stored;
  if (!memoryToken) {
    const bytes = crypto.getRandomValues(new Uint8Array(18));
    memoryToken = btoa(String.fromCharCode(...bytes))
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }
  save('online-token', memoryToken);
  return memoryToken;
}

/** Đường dẫn mời vào phòng (giữ nguyên địa chỉ trang, chỉ đổi phần sau dấu #) */
export function roomLink(base: string, code: string): string {
  const url = new URL(window.location.href);
  url.hash = `${base}/phong/${code}`;
  return url.toString();
}

export async function createRoom(req: CreateRoomRequest): Promise<CreateRoomResponse> {
  let res: Response;
  try {
    res = await fetch(apiUrl('/rooms'), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(req) });
  } catch {
    throw new Error('Không kết nối được máy chủ phòng chơi. Kiểm tra mạng rồi thử lại.');
  }
  if (!res.ok) throw new Error(res.status === 400 ? 'Thiết lập phòng không hợp lệ.' : `Máy chủ phòng chơi đang gặp lỗi (${res.status}). Thử lại sau ít phút.`);
  const body = (await res.json().catch(() => null)) as CreateRoomResponse | null;
  if (!body?.code) throw new Error('Máy chủ phòng chơi trả lời không đúng định dạng.');
  return body;
}

export type ConnState = 'connecting' | 'open' | 'reconnecting' | 'not-found' | 'full';

const PING_MS = 25_000;
/** Không nhận được gì trong khoảng này thì coi như kết nối đã chết (điện thoại ngủ, đổi mạng…) */
const DEAD_MS = 60_000;

/** WebSocket của một phòng: gửi lời chào kèm mã người chơi khi mở, tự kết nối lại khi rớt mạng */
class RoomConnection {
  private ws: WebSocket | null = null;
  private retry = 0;
  private retryTimer: ReturnType<typeof setTimeout> | undefined;
  private pingTimer: ReturnType<typeof setInterval> | undefined;
  private lastSeen = 0;
  private stopped = false;

  constructor(
    private code: string,
    private token: string,
    private on: { message: (m: ServerMessage) => void; conn: (s: ConnState) => void },
  ) {
    window.addEventListener('online', this.wake);
    document.addEventListener('visibilitychange', this.wake);
    this.connect();
  }

  private connect = () => {
    if (this.stopped) return;
    clearTimeout(this.retryTimer);
    this.retryTimer = undefined;
    const url = apiUrl(`/rooms/${this.code}/ws`);
    url.protocol = url.protocol === 'https:' ? 'wss:' : 'ws:';
    let ws: WebSocket;
    try {
      ws = new WebSocket(url);
    } catch {
      this.scheduleRetry();
      return;
    }
    this.ws = ws;
    this.on.conn(this.retry ? 'reconnecting' : 'connecting');
    ws.onopen = () => {
      this.retry = 0;
      this.lastSeen = Date.now();
      ws.send(JSON.stringify({ t: 'hello', token: this.token } satisfies ClientMessage));
      this.on.conn('open');
      clearInterval(this.pingTimer);
      this.pingTimer = setInterval(() => {
        if (Date.now() - this.lastSeen > DEAD_MS) this.drop();
        else if (ws.readyState === WebSocket.OPEN) ws.send('ping');
      }, PING_MS);
    };
    ws.onmessage = (e) => {
      this.lastSeen = Date.now();
      if (e.data === 'pong' || typeof e.data !== 'string') return;
      try {
        this.on.message(JSON.parse(e.data) as ServerMessage);
      } catch {
        /* bỏ qua thông điệp hỏng */
      }
    };
    ws.onclose = (e) => {
      if (this.ws !== ws) return;
      this.ws = null;
      clearInterval(this.pingTimer);
      if (this.stopped) return;
      if (e.code === CLOSE_NOT_FOUND) return this.on.conn('not-found');
      if (e.code === CLOSE_FULL) return this.on.conn('full');
      this.scheduleRetry();
    };
  };

  private scheduleRetry() {
    this.retry++;
    this.on.conn('reconnecting');
    this.retryTimer = setTimeout(this.connect, Math.min(8000, 500 * 2 ** (this.retry - 1)));
  }

  /** Bỏ kết nối đã chết và kết nối lại ngay */
  private drop() {
    const ws = this.ws;
    this.ws = null;
    clearInterval(this.pingTimer);
    if (ws) {
      ws.onclose = null;
      ws.close();
    }
    this.scheduleRetry();
  }

  /** Quay lại trang hoặc có mạng trở lại: kết nối lại ngay thay vì đợi hết thời gian chờ */
  private wake = () => {
    if (this.stopped || document.visibilityState !== 'visible') return;
    if (!this.ws && this.retryTimer !== undefined) this.connect();
    else if (this.ws?.readyState === WebSocket.OPEN && Date.now() - this.lastSeen > PING_MS) this.ws.send('ping');
  };

  send(msg: ClientMessage): boolean {
    if (this.ws?.readyState !== WebSocket.OPEN) return false;
    this.ws.send(JSON.stringify(msg));
    return true;
  }

  close() {
    this.stopped = true;
    clearTimeout(this.retryTimer);
    clearInterval(this.pingTimer);
    window.removeEventListener('online', this.wake);
    document.removeEventListener('visibilitychange', this.wake);
    this.ws?.close(1000);
    this.ws = null;
  }
}

export interface RoomSnapshot {
  room: PublicRoom | null;
  you: Side | null;
  conn: ConnState;
  /** performance.now() lúc nhận trạng thái: đồng hồ đếm lùi tính từ đây */
  receivedAt: number;
  error: { code: ErrorCode; at: number } | null;
}

export function useRoom(code: string) {
  const [snap, setSnap] = useState<RoomSnapshot>({ room: null, you: null, conn: 'connecting', receivedAt: 0, error: null });
  const connRef = useRef<RoomConnection | null>(null);
  useEffect(() => {
    setSnap({ room: null, you: null, conn: 'connecting', receivedAt: 0, error: null });
    const c = new RoomConnection(code, playerToken(), {
      message: (m) =>
        setSnap((s) =>
          m.t === 'state' ? { ...s, room: m.room, you: m.you, receivedAt: performance.now() } : { ...s, error: { code: m.code, at: Date.now() } },
        ),
      conn: (conn) => setSnap((s) => ({ ...s, conn })),
    });
    connRef.current = c;
    return () => c.close();
  }, [code]);
  const send = useCallback((m: ClientMessage) => connRef.current?.send(m) ?? false, []);
  return { ...snap, send };
}
