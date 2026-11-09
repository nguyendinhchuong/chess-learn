// Một phòng chơi = một Durable Object: giữ ván cờ, kết nối WebSocket của người chơi và người xem,
// lưu trạng thái vào bộ nhớ bền của Durable Object và dùng alarm để xử thua khi hết giờ / dọn phòng bỏ không.
import { DurableObject } from 'cloudflare:workers';
import { checkFlag, createRoom, handle, nextAlarm, parseClientMessage, ROOM_TTL_MS, RoomState, sideOf, view } from '../../src/online/game';
import { CLOSE_FULL, CLOSE_NOT_FOUND, CreateRoomRequest, ServerMessage, TOKEN_RE } from '../../src/online/protocol';

export interface Env {
  ROOMS: DurableObjectNamespace<GameRoom>;
}

/** Gắn vào từng WebSocket (giữ được qua lúc Durable Object ngủ đông) */
interface Attachment {
  token: string | null;
  hello: boolean;
}

/** Số kết nối tối đa mỗi phòng (2 người chơi + người xem) */
const MAX_SOCKETS = 64;
const WS_OPEN = 1;

export class GameRoom extends DurableObject<Env> {
  private room: RoomState | null = null;

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    // trình duyệt gửi "ping" định kỳ để phát hiện kết nối chết; trả lời mà không cần đánh thức phòng
    ctx.setWebSocketAutoResponse(new WebSocketRequestResponsePair('ping', 'pong'));
    void ctx.blockConcurrencyWhile(async () => {
      this.room = (await ctx.storage.get<RoomState>('room')) ?? null;
    });
  }

  /** Gọi từ Worker (RPC) khi tạo phòng; false nếu mã phòng đã được dùng */
  async create(code: string, req: CreateRoomRequest): Promise<boolean> {
    if (this.room) return false;
    this.room = createRoom(code, req, Date.now());
    await this.persist();
    return true;
  }

  async fetch(request: Request): Promise<Response> {
    if (request.headers.get('Upgrade')?.toLowerCase() !== 'websocket') return new Response('Expected WebSocket', { status: 426 });
    const { 0: client, 1: server } = new WebSocketPair();
    const refuse = !this.room ? CLOSE_NOT_FOUND : this.ctx.getWebSockets().length >= MAX_SOCKETS ? CLOSE_FULL : 0;
    if (refuse) {
      server.accept();
      if (refuse === CLOSE_NOT_FOUND) send(server, { t: 'error', code: 'not-found' });
      server.close(refuse, refuse === CLOSE_NOT_FOUND ? 'room not found' : 'room full');
      return new Response(null, { status: 101, webSocket: client });
    }
    this.ctx.acceptWebSocket(server);
    server.serializeAttachment({ token: null, hello: false } satisfies Attachment);
    return new Response(null, { status: 101, webSocket: client });
  }

  async webSocketMessage(ws: WebSocket, data: string | ArrayBuffer) {
    const room = this.room;
    if (!room) {
      ws.close(CLOSE_NOT_FOUND, 'room not found');
      return;
    }
    const msg = parseClientMessage(data);
    if (!msg) return;
    const now = Date.now();
    const flagged = checkFlag(room, now);

    if (msg.t === 'hello') {
      if (typeof msg.token !== 'string' || !TOKEN_RE.test(msg.token)) {
        send(ws, { t: 'error', code: 'bad-request' });
        return;
      }
      ws.serializeAttachment({ token: msg.token, hello: true } satisfies Attachment);
      if (flagged) await this.persist();
      // gửi trạng thái cho người mới vào và báo cho mọi người biết ai đang trực tuyến
      this.broadcast(now);
      return;
    }

    const att = ws.deserializeAttachment() as Attachment;
    if (!att.hello) return;
    const err = handle(room, att.token, msg, now);
    if (err) send(ws, { t: 'error', code: err });
    if (flagged || !err) {
      await this.persist();
      this.broadcast(now);
    }
  }

  async webSocketClose(ws: WebSocket, code: number, reason: string) {
    try {
      // 1005/1006 là mã nội bộ, không được dùng khi đóng
      ws.close(code === 1005 || code === 1006 ? 1000 : code, reason);
    } catch {
      /* đã đóng */
    }
    this.broadcast(Date.now(), ws);
  }

  async webSocketError(ws: WebSocket) {
    this.broadcast(Date.now(), ws);
  }

  async alarm() {
    const room = this.room;
    if (!room) return;
    const now = Date.now();
    if (checkFlag(room, now)) {
      await this.persist();
      this.broadcast(now);
      return;
    }
    if (now >= room.lastActivity + ROOM_TTL_MS) {
      if (this.openSockets().length === 0) {
        // phòng bỏ không: xóa hẳn
        await this.ctx.storage.deleteAlarm();
        await this.ctx.storage.deleteAll();
        this.room = null;
        return;
      }
      await this.ctx.storage.setAlarm(now + ROOM_TTL_MS);
      return;
    }
    await this.ctx.storage.setAlarm(nextAlarm(room));
  }

  private async persist() {
    if (!this.room) return;
    await this.ctx.storage.put('room', this.room);
    await this.ctx.storage.setAlarm(nextAlarm(this.room));
  }

  private openSockets(except?: WebSocket) {
    return this.ctx.getWebSockets().filter((w) => w !== except && w.readyState === WS_OPEN);
  }

  /** Gửi trạng thái phòng (riêng cho từng người) tới mọi kết nối đã chào */
  private broadcast(now: number, except?: WebSocket) {
    const room = this.room;
    if (!room) return;
    const sockets = this.openSockets(except);
    const atts = sockets.map((w) => w.deserializeAttachment() as Attachment);
    const online: [boolean, boolean] = [false, false];
    for (const a of atts) {
      const s = a.hello ? sideOf(room, a.token) : null;
      if (s !== null) online[s] = true;
    }
    sockets.forEach((w, i) => {
      if (atts[i].hello) send(w, { t: 'state', ...view(room, atts[i].token, now, online) });
    });
  }
}

function send(ws: WebSocket, msg: ServerMessage) {
  try {
    ws.send(JSON.stringify(msg));
  } catch {
    /* kết nối vừa đóng */
  }
}
