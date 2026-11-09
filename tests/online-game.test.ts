// Luật phòng chơi trực tuyến (src/online/game.ts) – phần chạy trên máy chủ phòng.
import { describe, expect, it } from 'vitest';
import { checkFlag, createRoom, handle, nextAlarm, parseCreate, ROOM_TTL_MS, RoomState, view } from '../src/online/game';
import { CreateRoomRequest, TimeControl, Variant } from '../src/online/protocol';

const A = 'token-aaaaaaaaaaaaaaaa';
const B = 'token-bbbbbbbbbbbbbbbb';
const C = 'token-cccccccccccccccc';
const T0 = 1_700_000_000_000;

function req(over: Partial<CreateRoomRequest> = {}): CreateRoomRequest {
  return { variant: 'chess', side: 0, time: null, token: A, name: 'An', ...over };
}

/** Phòng đã đủ hai người: A cầm Trắng/Đỏ, B cầm Đen */
function started(variant: Variant = 'chess', time: TimeControl | null = null): RoomState {
  const room = createRoom('ABCDEF', req({ variant, time }), T0);
  expect(handle(room, B, { t: 'join', name: 'Bình' }, T0)).toBeNull();
  return room;
}

function play(room: RoomState, moves: string[], start = T0) {
  moves.forEach((uci, i) => {
    const token = room.moves.length % 2 === 0 ? (room.seats[0]!.token) : room.seats[1]!.token;
    const err = handle(room, token, { t: 'move', ply: room.moves.length, uci }, start + i);
    expect(err, `${uci} ở nước ${room.moves.length}`).toBeNull();
  });
}

describe('tạo phòng', () => {
  it('kiểm tra yêu cầu tạo phòng', () => {
    expect(parseCreate({ variant: 'chess', side: 0, time: null, token: A, name: '  An   Bình ' })).toEqual({ variant: 'chess', side: 0, time: null, token: A, name: 'An Bình' });
    expect(parseCreate({ variant: 'xiangqi', side: 'random', time: { initial: 300_000, increment: 3000 }, token: A })?.name).toBe('Người chơi');
    expect(parseCreate({ variant: 'go', side: 0, time: null, token: A })).toBeNull();
    expect(parseCreate({ variant: 'chess', side: 2, time: null, token: A })).toBeNull();
    expect(parseCreate({ variant: 'chess', side: 0, time: null, token: 'ngắn' })).toBeNull();
    expect(parseCreate({ variant: 'chess', side: 0, time: { initial: 1000, increment: 0 }, token: A })).toBeNull();
    expect(parseCreate({ variant: 'chess', side: 0, time: { initial: 300_000, increment: 120_000 }, token: A })).toBeNull();
    expect(parseCreate({ variant: 'chess', side: 0, token: A })).toBeNull();
    expect(parseCreate({ variant: 'chess', side: 0, time: null, token: A, name: 'x'.repeat(100) })?.name).toHaveLength(24);
  });

  it('người tạo phòng ngồi đúng màu đã chọn', () => {
    expect(createRoom('ABCDEF', req({ side: 1 }), T0).seats[1]?.token).toBe(A);
    expect(createRoom('ABCDEF', req({ side: 'random' }), T0, () => 0.9).seats[1]?.token).toBe(A);
    expect(createRoom('ABCDEF', req({ side: 'random' }), T0, () => 0.1).seats[0]?.token).toBe(A);
  });

  it('người thứ hai vào thì ván bắt đầu, người thứ ba chỉ được xem', () => {
    const room = createRoom('ABCDEF', req(), T0);
    expect(room.status).toBe('waiting');
    expect(handle(room, A, { t: 'move', ply: 0, uci: 'e2e4' }, T0)).toBe('not-playing');
    expect(handle(room, A, { t: 'join', name: 'An' }, T0)).toBeNull(); // đã ngồi rồi: không đổi gì
    expect(room.seats[1]).toBeNull();
    expect(handle(room, B, { t: 'join', name: 'Bình' }, T0)).toBeNull();
    expect(room.status).toBe('playing');
    expect(room.seats[1]).toEqual({ token: B, name: 'Bình' });
    expect(handle(room, C, { t: 'join', name: 'Chi' }, T0)).toBe('seat-taken');
    expect(handle(room, C, { t: 'move', ply: 0, uci: 'e2e4' }, T0)).toBe('not-seated');
    expect(handle(room, null, { t: 'join', name: 'Chi' }, T0)).toBe('bad-request');
  });
});

describe('nước đi', () => {
  it('kiểm tra lượt, số thứ tự nước và luật cờ', () => {
    const room = started();
    expect(handle(room, B, { t: 'move', ply: 0, uci: 'e7e5' }, T0)).toBe('not-your-turn');
    expect(handle(room, A, { t: 'move', ply: 1, uci: 'e2e4' }, T0)).toBe('stale');
    expect(handle(room, A, { t: 'move', ply: 0, uci: 'e2e5' }, T0)).toBe('illegal');
    expect(handle(room, A, { t: 'move', ply: 0, uci: 'xx' }, T0)).toBe('bad-request');
    expect(handle(room, A, { t: 'move', ply: 0, uci: 'e2e4' }, T0)).toBeNull();
    // gửi lại cùng nước sau khi mất kết nối: bị bỏ qua
    expect(handle(room, A, { t: 'move', ply: 0, uci: 'e2e4' }, T0)).toBe('stale');
    expect(room.moves).toEqual(['e2e4']);
  });

  it('chiếu hết kết thúc ván', () => {
    const room = started();
    play(room, ['e2e4', 'e7e5', 'f1c4', 'b8c6', 'd1h5', 'g8f6', 'h5f7']);
    expect(room.status).toBe('over');
    expect(room.result).toBe('1-0');
    expect(room.reason).toBe('checkmate');
    expect(handle(room, B, { t: 'move', ply: 7, uci: 'e8f7' }, T0)).toBe('not-playing');
  });

  it('phong cấp', () => {
    const room = started();
    play(room, ['a2a4', 'b7b5', 'a4b5', 'a7a6', 'b5a6', 'c8b7', 'a6b7', 'b8c6', 'b7a8n']);
    expect(room.moves.at(-1)).toBe('b7a8n');
  });

  it('cờ tướng dùng luật cờ tướng', () => {
    const room = started('xiangqi');
    expect(handle(room, A, { t: 'move', ply: 0, uci: 'e2e4' }, T0)).toBe('illegal');
    play(room, ['h2e2', 'h9g7', 'h0g2']);
    expect(room.moves).toEqual(['h2e2', 'h9g7', 'h0g2']);
    expect(room.status).toBe('playing');
  });
});

describe('đồng hồ', () => {
  const tc = { initial: 60_000, increment: 2_000 };

  it('hai nước đầu không tính giờ, sau đó trừ thời gian đã nghĩ và cộng thêm giờ', () => {
    const room = started('chess', tc);
    handle(room, A, { t: 'move', ply: 0, uci: 'e2e4' }, T0 + 30_000);
    expect(room.turnStartedAt).toBeNull();
    handle(room, B, { t: 'move', ply: 1, uci: 'e7e5' }, T0 + 50_000);
    expect(room.clocks).toEqual([60_000, 60_000]);
    expect(room.turnStartedAt).toBe(T0 + 50_000);
    handle(room, A, { t: 'move', ply: 2, uci: 'g1f3' }, T0 + 60_000);
    expect(room.clocks).toEqual([52_000, 60_000]);
    // trạng thái gửi đi: đồng hồ của Đen đang chạy
    const v = view(room, B, T0 + 65_000, [true, true]);
    expect(v.room.running).toBe(1);
    expect(v.room.clocks).toEqual([52_000, 55_000]);
    expect(nextAlarm(room)).toBe(T0 + 60_000 + 60_000);
  });

  it('hết giờ thì thua, nước đến muộn không được tính', () => {
    const room = started('chess', tc);
    play(room, ['e2e4', 'e7e5']);
    const late = room.turnStartedAt! + 60_000;
    expect(checkFlag(room, late - 1)).toBe(false);
    expect(checkFlag(room, late)).toBe(true);
    expect(room.result).toBe('0-1');
    expect(room.reason).toBe('timeout');
    expect(room.clocks![0]).toBe(0);
    expect(handle(room, A, { t: 'move', ply: 2, uci: 'g1f3' }, late)).toBe('not-playing');
    expect(nextAlarm(room)).toBe(room.lastActivity + ROOM_TTL_MS);
  });

  it('không tính giờ thì không bao giờ hết giờ', () => {
    const room = started();
    play(room, ['e2e4', 'e7e5']);
    expect(checkFlag(room, T0 + 10 * ROOM_TTL_MS)).toBe(false);
    expect(view(room, A, T0, [true, true]).room.clocks).toBeNull();
  });
});

describe('hòa, xin thua, ván mới', () => {
  it('đề nghị hòa – đồng ý', () => {
    const room = started();
    expect(handle(room, A, { t: 'draw' }, T0)).toBeNull();
    expect(room.drawOffer).toBe(0);
    expect(handle(room, B, { t: 'draw' }, T0)).toBeNull();
    expect(room.result).toBe('1/2-1/2');
    expect(room.reason).toBe('agreement');
  });

  it('đi một nước hoặc từ chối thì lời mời hòa mất', () => {
    const room = started();
    handle(room, A, { t: 'draw' }, T0);
    play(room, ['e2e4']);
    expect(room.drawOffer).toBe(0); // người mời đi nước của mình: lời mời vẫn còn
    play(room, ['e7e5']);
    expect(room.drawOffer).toBeNull();
    handle(room, B, { t: 'draw' }, T0);
    handle(room, A, { t: 'decline' }, T0);
    expect(room.drawOffer).toBeNull();
    expect(room.status).toBe('playing');
  });

  it('xin thua', () => {
    const room = started();
    expect(handle(room, B, { t: 'resign' }, T0)).toBeNull();
    expect(room.result).toBe('1-0');
    expect(room.reason).toBe('resign');
  });

  it('ván mới khi cả hai đồng ý: đổi màu, xóa nước đi', () => {
    const room = started('chess', { initial: 60_000, increment: 0 });
    expect(handle(room, A, { t: 'rematch' }, T0)).toBe('not-playing');
    play(room, ['e2e4', 'e7e5', 'g1f3']);
    handle(room, A, { t: 'resign' }, T0 + 10);
    expect(handle(room, A, { t: 'rematch' }, T0)).toBeNull();
    expect(room.rematch).toEqual([true, false]);
    expect(room.status).toBe('over');
    expect(handle(room, B, { t: 'rematch' }, T0)).toBeNull();
    expect(room.status).toBe('playing');
    expect(room.game).toBe(2);
    expect(room.moves).toEqual([]);
    expect(room.clocks).toEqual([60_000, 60_000]);
    expect(room.seats[0]?.token).toBe(B);
    expect(room.seats[1]?.token).toBe(A);
  });
});

it('trạng thái gửi đi không chứa mã bí mật của người chơi', () => {
  const room = started();
  const v = view(room, C, T0, [true, false]);
  expect(v.you).toBeNull();
  expect(view(room, A, T0, [true, false]).you).toBe(0);
  expect(view(room, B, T0, [true, false]).you).toBe(1);
  expect(v.room.seats).toEqual([
    { name: 'An', online: true },
    { name: 'Bình', online: false },
  ]);
  expect(JSON.stringify(v)).not.toContain('token-');
});
