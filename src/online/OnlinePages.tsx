// Chơi với bạn: trang tạo phòng (#/phong, #/co-tuong/phong) và trang phòng (#/phong/MÃ).
// Dùng chung cho hai môn cờ; phần riêng của từng môn nằm trong OnlineKit.
import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { Copy, ShareNetwork, SignIn, UsersThree } from '@phosphor-icons/react';
import { href, navigate } from '../lib/router';
import { useStored } from '../lib/storage';
import { sounds } from '../lib/sound';
import { createRoom, playerToken, roomLink, useRoom } from './client';
import type { OnlineKit } from './kit';
import { CODE_RE, ErrorCode, NAME_MAX, normalizeCode, PublicRoom, RoomStatus, Side, TIME_PRESETS, timeLabel } from './protocol';

const ERROR_TEXT: Partial<Record<ErrorCode, string>> = {
  illegal: 'Nước đi không hợp lệ.',
  'not-your-turn': 'Chưa đến lượt bạn.',
  'not-seated': 'Bạn đang xem nên không đi quân được.',
  'seat-taken': 'Phòng vừa đủ hai người – bạn đang xem ván cờ.',
  'not-playing': 'Ván cờ đã kết thúc.',
  'bad-request': 'Có lỗi xảy ra. Hãy tải lại trang.',
};

// =====================================================================================
// Trang tạo phòng
// =====================================================================================
export function OnlineLobby({ kit }: { kit: OnlineKit }) {
  const [name, setName] = useStored<string>('online-name', '');
  const [color, setColor] = useStored<Side | 'random'>('online-color', 'random');
  const [timeIdx, setTimeIdx] = useStored<number>('online-time', 3);
  const [joinCode, setJoinCode] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const preset = TIME_PRESETS[timeIdx] ?? TIME_PRESETS[0];
  const code = normalizeCode(joinCode);

  async function create() {
    setBusy(true);
    setError(null);
    try {
      const res = await createRoom({ variant: kit.variant, side: color, time: preset.time, token: playerToken(), name });
      navigate(`${kit.base}/phong/${res.code}`);
    } catch (e) {
      setError((e as Error).message);
      setBusy(false);
    }
  }

  function join(e: FormEvent) {
    e.preventDefault();
    if (CODE_RE.test(code)) navigate(`${kit.base}/phong/${code}`);
  }

  const colors: [Side | 'random', string][] = [
    [0, kit.sideNames[0]],
    ['random', 'Ngẫu nhiên'],
    [1, kit.sideNames[1]],
  ];

  return (
    <div className="setup online-lobby">
      <div className="page-head">
        <h1>👥 Chơi {kit.title} với bạn</h1>
        <p>
          Tạo một phòng, gửi đường dẫn cho bạn bè rồi cùng chơi trực tuyến. Máy chủ kiểm tra từng nước đi và giữ đồng hồ, nên tải lại trang hay rớt mạng giữa chừng vẫn quay về đúng
          ván cờ.
        </p>
      </div>

      <div className="grid cols-2">
        <div className="card">
          <h3>1. Tên của bạn</h3>
          <input className="text-input" value={name} maxLength={NAME_MAX} placeholder="Người chơi" aria-label="Tên của bạn" onChange={(e) => setName(e.target.value)} />
          <p className="small muted" style={{ marginBottom: 0 }}>
            Đối thủ sẽ thấy tên này.
          </p>
        </div>
        <div className="card">
          <h3>2. Chọn màu quân</h3>
          <div className="choice-row">
            {colors.map(([k, label]) => (
              <button key={k} className={'choice' + (color === k ? ' active' : '')} aria-pressed={color === k} onClick={() => setColor(k)}>
                {k === 'random' ? (
                  <span className="choice-ic" style={{ fontSize: 26 }} aria-hidden="true">
                    🎲
                  </span>
                ) : (
                  <kit.SideIcon side={k} />
                )}
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: 22 }}>
        <h3>3. Thời gian mỗi bên</h3>
        <div className="choice-row">
          {TIME_PRESETS.map((p, i) => (
            <button key={p.label} className={'choice' + (timeIdx === i ? ' active' : '')} aria-pressed={timeIdx === i} onClick={() => setTimeIdx(i)}>
              {p.time ? '⏱️' : '♾️'} {p.label}
            </button>
          ))}
        </div>
        <p className="small muted" style={{ marginBottom: 0 }}>
          {preset.time
            ? `Mỗi bên có ${preset.time.initial / 60_000} phút, mỗi nước đi được cộng thêm ${preset.time.increment / 1000} giây. Hai nước đầu không tính giờ; hết giờ là thua.`
            : 'Không có đồng hồ – thoải mái vừa chơi vừa suy nghĩ.'}
        </p>
      </div>

      <div className="card" style={{ marginTop: 22 }}>
        <h3>Đã có mã phòng?</h3>
        <form className="code-form" onSubmit={join}>
          <input className="text-input code" value={joinCode} maxLength={12} placeholder="VD: K7Q2XM" aria-label="Mã phòng" autoCapitalize="characters" onChange={(e) => setJoinCode(e.target.value)} />
          <button className="btn" type="submit" disabled={!CODE_RE.test(code)}>
            <SignIn size={16} weight="bold" aria-hidden="true" />
            Vào phòng
          </button>
        </form>
      </div>

      {error && (
        <div className="callout warn" role="alert">
          <span className="ci">⚠️</span>
          <span>{error}</span>
        </div>
      )}

      <div className="start-bar" style={{ ['--bot-color' as string]: 'var(--primary)' }}>
        <div className="start-bar-pick">
          <span className="bot-avatar" aria-hidden="true">
            👥
          </span>
          <span className="start-bar-text">
            <b>Phòng mới</b>
            <span>
              {color === 'random' ? 'Màu ngẫu nhiên' : `Cầm quân ${kit.sideNames[color]}`} · {preset.label}
            </span>
          </span>
        </div>
        <button className="btn primary big" onClick={create} disabled={busy}>
          <UsersThree size={16} weight="fill" aria-hidden="true" />
          <span>{busy ? 'Đang tạo phòng…' : 'Tạo phòng'}</span>
        </button>
      </div>
    </div>
  );
}

// =====================================================================================
// Trang phòng
// =====================================================================================
export function OnlineRoom({ kit, code }: { kit: OnlineKit; code: string }) {
  const norm = normalizeCode(code);
  if (!CODE_RE.test(norm)) return <RoomMissing kit={kit} code={code} />;
  return <RoomScreen key={norm} kit={kit} code={norm} />;
}

function RoomMissing({ kit, code }: { kit: OnlineKit; code: string }) {
  return (
    <div className="empty-state online-missing">
      <h2>Không tìm thấy phòng {code}</h2>
      <p className="muted">Mã phòng có thể bị gõ nhầm, hoặc phòng đã bị xóa sau 3 ngày không ai chơi.</p>
      <a className="btn primary" href={href(`${kit.base}/phong`)}>
        Tạo phòng mới
      </a>
    </div>
  );
}

/** Thời điểm hiện tại (performance.now), cập nhật định kỳ khi cần cho đồng hồ chạy */
function useNow(interval: number | null) {
  const [now, setNow] = useState(() => performance.now());
  useEffect(() => {
    if (interval === null) return;
    setNow(performance.now());
    const id = setInterval(() => setNow(performance.now()), interval);
    return () => clearInterval(id);
  }, [interval]);
  return now;
}

function formatClock(ms: number): string {
  if (ms < 10_000) return (Math.floor(ms / 100) / 10).toFixed(1);
  const total = Math.ceil(ms / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = String(total % 60).padStart(2, '0');
  return h ? `${h}:${String(m).padStart(2, '0')}:${s}` : `${m}:${s}`;
}

/** Đồng hồ một bên; tự đếm lùi (chỉ phần này vẽ lại 10 lần/giây, không phải cả bàn cờ) */
function Clock({ ms, running, playing, receivedAt, label }: { ms: number; running: boolean; playing: boolean; receivedAt: number; label: string }) {
  const now = useNow(running ? 100 : null);
  const left = Math.max(0, ms - (running ? Math.max(0, now - receivedAt) : 0));
  return (
    <div className={'clock' + (running ? ' running' : '') + (left < 20_000 && playing ? ' low' : '')} role="timer" aria-label={label}>
      {formatClock(left)}
    </div>
  );
}

interface Pending {
  game: number;
  ply: number;
  uci: string;
}

function RoomScreen({ kit, code }: { kit: OnlineKit; code: string }) {
  const { room, you, conn, receivedAt, error, send } = useRoom(code);
  const [pending, setPending] = useState<Pending | null>(null);
  const [viewPly, setViewPly] = useState<number | null>(null);
  const [flip, setFlip] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const sameVariant = room?.variant === kit.variant;

  // mã phòng của môn cờ kia: chuyển sang đúng trang
  useEffect(() => {
    if (room && !sameVariant) navigate(`${room.variant === 'chess' ? '' : '/co-tuong'}/phong/${room.code}`);
  }, [room, sameVariant]);

  // nước vừa đi hiện ngay trên bàn cờ, không đợi máy chủ xác nhận
  const moves = useMemo(() => {
    if (!room) return [];
    return pending && pending.game === room.game && pending.ply === room.moves.length ? [...room.moves, pending.uci] : room.moves;
  }, [room, pending]);
  const line = useMemo(() => (sameVariant ? kit.replay(moves) : { fens: [''], sans: [] }), [kit, moves, sameVariant]);
  const ply = line.sans.length;

  useEffect(() => {
    if (pending && room && (room.game !== pending.game || room.moves.length > pending.ply)) setPending(null);
  }, [room, pending]);
  // mất kết nối thì không chắc nước đi đã tới máy chủ: chờ trạng thái mới sau khi kết nối lại
  useEffect(() => {
    if (conn !== 'open') setPending(null);
  }, [conn]);
  useEffect(() => {
    if (!error) return;
    setPending(null);
    const text = ERROR_TEXT[error.code];
    if (text) setToast(text);
  }, [error]);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  // âm thanh cho nước mới
  const last = useRef<{ game: number; ply: number } | null>(null);
  useEffect(() => {
    const prev = last.current;
    last.current = room ? { game: room.game, ply } : null;
    if (!room || !prev || prev.game !== room.game || ply !== prev.ply + 1) return;
    kit.moveSound(line.fens[ply - 1], moves[ply - 1], line.sans[ply - 1]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room?.game, ply]);

  // ván bắt đầu / kết thúc / ván mới
  const prevStatus = useRef<RoomStatus | null>(null);
  useEffect(() => {
    const prev = prevStatus.current;
    const st = room?.status ?? null;
    prevStatus.current = st;
    if (!prev || !st || !room) return;
    if (prev === 'waiting' && st === 'playing') {
      sounds.check();
      setToast('Đủ hai người – ván cờ bắt đầu!');
    } else if (prev === 'playing' && st === 'over' && room.reason !== 'checkmate' && room.reason !== 'stalemate') {
      sounds.end();
    } else if (prev === 'over' && st === 'playing') {
      setViewPly(null);
      setToast('Ván mới bắt đầu – hai bên đã đổi màu.');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room?.status, room?.game]);

  // ← → xem lại các nước
  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowLeft') setViewPly((v) => Math.max(0, (v ?? ply) - 1));
      else if (e.key === 'ArrowRight') setViewPly((v) => (v === null || v + 1 >= ply ? null : v + 1));
    };
    window.addEventListener('keydown', on);
    return () => window.removeEventListener('keydown', on);
  }, [ply]);

  if (conn === 'not-found') return <RoomMissing kit={kit} code={code} />;
  if (conn === 'full')
    return (
      <div className="empty-state online-missing">
        <h2>Phòng {code} đang quá đông</h2>
        <p className="muted">Thử lại sau ít phút.</p>
      </div>
    );
  if (!room || !sameVariant)
    return (
      <div className="empty-state online-missing" aria-live="polite">
        {conn === 'reconnecting' ? (
          <>
            <h2>Chưa kết nối được máy chủ phòng chơi</h2>
            <p className="muted">Đang thử lại… Kiểm tra kết nối mạng của bạn.</p>
          </>
        ) : (
          <p className="muted">Đang vào phòng {code}…</p>
        )}
      </div>
    );

  const shown = viewPly === null ? ply : Math.min(viewPly, ply);
  const viewing = shown < ply;
  const turn = (ply % 2) as Side;
  const playing = room.status === 'playing';
  const opp = you === null ? null : ((you ^ 1) as Side);
  const bottom = ((you ?? 0) ^ (flip ? 1 : 0)) as Side;
  const top = (bottom ^ 1) as Side;
  const freeSide: Side | null = room.seats[0] === null ? 0 : room.seats[1] === null ? 1 : null;

  const onMove = (uci: string) => {
    if (!playing || you === null || turn !== you || viewing) return;
    if (send({ t: 'move', ply: room.moves.length, uci })) setPending({ game: room.game, ply: room.moves.length, uci });
    else setToast('Mất kết nối – đang kết nối lại, hãy đi lại sau giây lát.');
  };

  const resign = () => {
    if (window.confirm('Bạn chắc chắn muốn xin thua?')) send({ t: 'resign' });
  };

  const strip = (s: Side) => {
    const seat = room.seats[s];
    return (
      <div className={'player-strip online-strip' + (playing && turn === s ? ' to-move' : '')} data-side={s}>
        <div className="pa">
          <kit.SideIcon side={s} />
        </div>
        <div className="ps-main">
          <div className="pn">
            <span className="pn-name">{seat ? seat.name : 'Đang chờ người chơi…'}</span>
            {you === s && <span className="tag">Bạn</span>}
            {seat && <span className={'presence' + (seat.online ? ' on' : '')} title={seat.online ? 'Đang trong phòng' : 'Đã rời phòng'} />}
          </div>
          <div className="ps">
            Cầm quân {kit.sideNames[s]}
            {seat && !seat.online && ' · đã rời phòng'}
          </div>
        </div>
        {room.clocks && <Clock ms={room.clocks[s]} running={room.running === s} playing={playing} receivedAt={receivedAt} label={`Đồng hồ bên ${kit.sideNames[s]}`} />}
      </div>
    );
  };

  const result = room.status === 'over' ? resultInfo(room, you, kit) : null;

  return (
    <div className="online-room">
      {conn !== 'open' && (
        <div className="callout warn online-banner" role="status">
          <span className="ci">📡</span>
          <span>Mất kết nối – đang kết nối lại… Ván cờ vẫn được giữ trên máy chủ.</span>
        </div>
      )}

      {room.status === 'waiting' && you !== null && <InviteCard kit={kit} room={room} />}
      {room.status === 'waiting' && you === null && freeSide !== null && <JoinCard kit={kit} room={room} side={freeSide} onJoin={(name) => send({ t: 'join', name })} />}
      {you === null && freeSide === null && (
        <div className="callout info online-banner">
          <span className="ci">👀</span>
          <span>Bạn đang xem ván cờ giữa hai người chơi khác.</span>
        </div>
      )}

      <div className="play">
        <div className="play-board-col">
          {strip(top)}
          <div className="board-wrap">
            <kit.Board fen={line.fens[shown]} bottom={bottom} movable={playing && you !== null && turn === you && !viewing ? you : null} onMove={onMove} lastMove={shown > 0 ? moves[shown - 1] : null} />
          </div>
          {strip(bottom)}
          <div className="controls-bar">
            <button className="btn small" onClick={() => setFlip(!flip)}>
              🔄 Lật bàn
            </button>
            {you !== null && playing && (
              <>
                <button className="btn small" onClick={() => send({ t: 'draw' })} disabled={room.drawOffer === you}>
                  🤝 {room.drawOffer === opp ? 'Đồng ý hòa' : room.drawOffer === you ? 'Đã mời hòa' : 'Cầu hòa'}
                </button>
                <button className="btn small danger" onClick={resign}>
                  🏳 Xin thua
                </button>
              </>
            )}
            {you !== null && room.status === 'over' && (
              <button className="btn small primary" onClick={() => send({ t: 'rematch' })} disabled={room.rematch[you]}>
                ♻️ {room.rematch[you] ? 'Đang chờ đối thủ…' : opp !== null && room.rematch[opp] ? 'Đồng ý chơi ván mới' : 'Ván mới (đổi màu)'}
              </button>
            )}
          </div>
          {toast && (
            <div className="callout info" style={{ justifyContent: 'center' }} role="status">
              {toast}
            </div>
          )}
        </div>

        <div className="coach-panel">
          <div className={'coach-card online-status' + (result ? ' over' : '')} aria-live="polite">
            {result ? (
              <>
                <h4>🏁 Kết quả</h4>
                <div className="online-result">
                  <span className="or-icon" aria-hidden="true">
                    {result.icon}
                  </span>
                  <span>
                    <b>{result.title}</b>
                    <span className="muted">{result.detail}</span>
                  </span>
                </div>
                {opp !== null && room.rematch[opp] && !room.rematch[you!] && <p className="small" style={{ margin: '8px 0 0' }}>Đối thủ muốn chơi ván mới (đổi màu).</p>}
              </>
            ) : (
              <>
                <h4>{room.status === 'waiting' ? '⏳ Đang chờ' : '♟️ Ván đấu'}</h4>
                <p style={{ margin: 0 }}>{statusText(room, you, turn, kit)}</p>
              </>
            )}
          </div>

          {playing && opp !== null && room.drawOffer === opp && (
            <div className="coach-card">
              <h4>🤝 Đề nghị hòa</h4>
              <p style={{ margin: '0 0 8px' }}>{room.seats[opp]?.name ?? 'Đối thủ'} đề nghị hòa ván này.</p>
              <div className="controls-bar" style={{ justifyContent: 'flex-start' }}>
                <button className="btn small primary" onClick={() => send({ t: 'draw' })}>
                  Đồng ý hòa
                </button>
                <button className="btn small" onClick={() => send({ t: 'decline' })}>
                  Từ chối
                </button>
              </div>
            </div>
          )}

          <div className="coach-card">
            <h4>📜 Biên bản ván đấu</h4>
            <kit.MoveList sans={line.sans} current={shown - 1} onSelect={(i) => setViewPly(i + 1 >= ply ? null : i + 1)} />
            {viewing && (
              <div className="banner-review" style={{ marginTop: 8 }}>
                <span>👀 Đang xem lại nước {shown}</span>
                <button className="btn small" onClick={() => setViewPly(null)}>
                  Về ván đấu ↩️
                </button>
              </div>
            )}
          </div>

          <div className="coach-card">
            <h4>🏠 Phòng {room.code}</h4>
            <p className="small muted" style={{ margin: 0 }}>
              {timeLabel(room.time)} · Ván thứ {room.game}
            </p>
            <a className="btn small" style={{ marginTop: 8 }} href={href(`${kit.base}/phong`)}>
              ➕ Tạo phòng khác
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function statusText(room: PublicRoom, you: Side | null, turn: Side, kit: OnlineKit): string {
  if (room.status === 'waiting') return you !== null ? 'Chờ đối thủ vào phòng. Gửi đường dẫn mời ở trên cho bạn của bạn.' : 'Phòng đang chờ người chơi thứ hai.';
  if (you === null) return `Lượt của bên ${kit.sideNames[turn]} (${room.seats[turn]?.name ?? '…'}).`;
  if (turn === you) return 'Đến lượt bạn.';
  return `Chờ ${room.seats[turn]?.name ?? 'đối thủ'} đi…`;
}

function resultInfo(room: PublicRoom, you: Side | null, kit: OnlineKit): { icon: string; title: string; detail: string } {
  const winner: Side | null = room.result === '1-0' ? 0 : room.result === '0-1' ? 1 : null;
  const reason = room.reason ? kit.reasons[room.reason] : '';
  if (winner === null) return { icon: '🤝', title: 'Hòa', detail: cap(reason) };
  const loser = (winner ^ 1) as Side;
  // xin thua, hết giờ, chiếu dai: nói rõ bên nào
  const detail = room.reason === 'resign' || room.reason === 'timeout' || room.reason === 'perpetual' ? `${kit.sideNames[loser]} ${reason}` : cap(reason);
  if (you === winner) return { icon: '🏆', title: 'Bạn thắng!', detail };
  if (you === loser) return { icon: '😔', title: 'Bạn thua', detail };
  return { icon: '🏁', title: `${kit.sideNames[winner]} thắng (${room.seats[winner]?.name ?? ''})`, detail };
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function InviteCard({ kit, room }: { kit: OnlineKit; room: PublicRoom }) {
  const link = roomLink(kit.base, room.code);
  const [copied, setCopied] = useState(false);
  const canShare = typeof navigator.share === 'function';
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* trình duyệt chặn: người dùng tự chép ô bên cạnh */
    }
  };
  const share = () => navigator.share({ title: `Chơi ${kit.title} với mình trên Kỳ Đạo`, text: `Vào phòng ${room.code} để chơi ${kit.title} với mình:`, url: link }).catch(() => {});
  return (
    <div className="card online-invite">
      <div className="oi-text">
        <h3>📨 Mời bạn vào phòng</h3>
        <p className="muted small" style={{ margin: 0 }}>
          Gửi đường dẫn này cho bạn của bạn – ván cờ bắt đầu ngay khi bạn ấy vào phòng. Hoặc đọc mã phòng để bạn ấy nhập ở mục “Chơi với bạn”.
        </p>
      </div>
      <div className="room-code" aria-label={`Mã phòng ${room.code}`}>
        {room.code}
      </div>
      <div className="invite-link">
        <input className="text-input" readOnly value={link} aria-label="Đường dẫn mời" onFocus={(e) => e.target.select()} />
        <button className="btn small primary" onClick={copy}>
          <Copy size={14} weight="bold" aria-hidden="true" />
          {copied ? 'Đã chép' : 'Chép'}
        </button>
        {canShare && (
          <button className="btn small" onClick={share}>
            <ShareNetwork size={14} weight="bold" aria-hidden="true" />
            Chia sẻ
          </button>
        )}
      </div>
    </div>
  );
}

function JoinCard({ kit, room, side, onJoin }: { kit: OnlineKit; room: PublicRoom; side: Side; onJoin: (name: string) => void }) {
  const [name, setName] = useStored<string>('online-name', '');
  const host = room.seats[(side ^ 1) as Side];
  return (
    <div className="card online-invite">
      <div className="oi-text">
        <h3>🎟️ Lời mời chơi {kit.title}</h3>
        <p style={{ margin: 0 }}>
          <b>{host?.name ?? 'Một người chơi'}</b> mời bạn chơi một ván ({timeLabel(room.time).toLowerCase()}). Bạn sẽ cầm quân <b>{kit.sideNames[side]}</b>.
        </p>
      </div>
      <form
        className="code-form"
        onSubmit={(e) => {
          e.preventDefault();
          onJoin(name);
        }}
      >
        <input className="text-input" value={name} maxLength={NAME_MAX} placeholder="Tên của bạn" aria-label="Tên của bạn" onChange={(e) => setName(e.target.value)} />
        <button className="btn primary" type="submit">
          <SignIn size={16} weight="bold" aria-hidden="true" />
          Vào chơi
        </button>
      </form>
    </div>
  );
}
