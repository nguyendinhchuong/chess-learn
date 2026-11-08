// Máy chủ phòng chơi của Kỳ Đạo (Cloudflare Worker).
//   POST /api/rooms               tạo phòng → { code }
//   GET  /api/rooms/:code/ws      WebSocket vào phòng (chuyển cho Durable Object của phòng)
//   GET  /api/health              kiểm tra máy chủ
import { parseCreate } from '../../src/online/game';
import { CODE_ALPHABET, CODE_LENGTH, CODE_RE, CreateRoomResponse } from '../../src/online/protocol';
import type { Env } from './room';

export { GameRoom } from './room';

// trang web có thể nằm ở tên miền khác (GitHub Pages, máy phát triển…) nên cho phép mọi nguồn;
// API không dùng cookie nên không lộ gì của người dùng
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
};

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', ...CORS } });

function newCode(): string {
  // 256 chia hết cho 32 ký tự nên mỗi ký tự có xác suất như nhau
  const bytes = crypto.getRandomValues(new Uint8Array(CODE_LENGTH));
  return Array.from(bytes, (b) => CODE_ALPHABET[b % CODE_ALPHABET.length]).join('');
}

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });
    if (url.pathname === '/api/health') return json({ ok: true });

    if (url.pathname === '/api/rooms' && request.method === 'POST') {
      const text = await request.text();
      if (text.length > 2000) return json({ error: 'bad-request' }, 413);
      let body: unknown;
      try {
        body = JSON.parse(text);
      } catch {
        return json({ error: 'bad-request' }, 400);
      }
      const req = parseCreate(body);
      if (!req) return json({ error: 'bad-request' }, 400);
      for (let i = 0; i < 5; i++) {
        const code = newCode();
        const stub = env.ROOMS.get(env.ROOMS.idFromName(code));
        if (await stub.create(code, req)) return json({ code } satisfies CreateRoomResponse, 201);
      }
      return json({ error: 'busy' }, 503);
    }

    const m = /^\/api\/rooms\/([^/]+)\/ws$/.exec(url.pathname);
    if (m) {
      if (!CODE_RE.test(m[1])) return json({ error: 'not-found' }, 404);
      return env.ROOMS.get(env.ROOMS.idFromName(m[1])).fetch(request);
    }
    return json({ error: 'not-found' }, 404);
  },
} satisfies ExportedHandler<Env>;
