// Bốn chặng của lộ trình trên trang giới thiệu: bản đồ trang, bài học, ván mẫu, đấu với máy,
// và phòng chơi minh họa của phần "Chơi với bạn".
// Mỗi chặng nhận tiến độ cuộn 0..1 và chỉ vẽ lại khi bước rời rạc (nước đi, ô, cấp độ) thay đổi.
import { ReactNode, useMemo, useSyncExternalStore } from 'react';
import { Check, CheckCircle, Copy, Handshake, WifiSlash } from '@phosphor-icons/react';
import { href } from '../lib/router';
import { FlatBoard, Arrow } from './FlatBoard';
import { Kind, Line, PieceFace } from './pieces';

export interface ProgressSource {
  get(): number;
  set(p: number): void;
  subscribe(cb: () => void): () => void;
}

export function createSource(): ProgressSource {
  let value = 0;
  const subs = new Set<() => void>();
  return {
    get: () => value,
    set(p) {
      if (Math.abs(p - value) < 0.001) return;
      value = p;
      subs.forEach((s) => s());
    },
    subscribe(cb) {
      subs.add(cb);
      return () => subs.delete(cb);
    },
  };
}

/** Bước hiện tại 0..steps theo tiến độ cuộn */
export function useStep(src: ProgressSource, steps: number) {
  return useSyncExternalStore(src.subscribe, () => Math.min(steps, Math.floor(src.get() * (steps + 1))));
}

export interface StageProps {
  progress: ProgressSource;
  /** Chặng đang được xem (chỉ chặng này nhận tiêu điểm bàn phím) */
  active: boolean;
}

/* ---------- Chặng 1: bản đồ các khu của trang ---------- */

export interface MapTile {
  icon: ReactNode;
  name: string;
  meta: string;
  to: string;
}

export function MapStage({ tiles, hopper, kind, progress, active }: StageProps & { tiles: MapTile[]; hopper: string; kind: Kind }) {
  const step = useStep(progress, tiles.length - 1);
  const col = step % 3,
    row = Math.floor(step / 3);
  return (
    <div className="ld-map">
      <div className="ld-map-grid">
        {tiles.map((t, i) => (
          <a
            key={t.name}
            href={href(t.to)}
            className={'ld-tile' + (i === step ? ' on' : '') + (i < step ? ' seen' : '') + (((i % 3) + Math.floor(i / 3)) % 2 ? ' alt' : '')}
            tabIndex={active ? 0 : -1}
          >
            <span className="ld-tile-ic" aria-hidden="true">
              {t.icon}
            </span>
            <span className="ld-tile-name">{t.name}</span>
            <span className="ld-tile-meta">{t.meta}</span>
          </a>
        ))}
        <span className="ld-map-hopper" aria-hidden="true" style={{ transform: `translate(calc(${col} * (100% + var(--gap))), calc(${row} * (100% + var(--gap))))` }}>
          <span key={step} className={'ld-hop ' + kind}>
            <PieceFace k={hopper} kind={kind} />
          </span>
        </span>
      </div>
    </div>
  );
}

/* ---------- Chặng 2: bài học từng nước ---------- */

export function LessonStage({
  line,
  notes,
  arrowsAt,
  coach,
  title,
  progress,
}: StageProps & { line: Line; notes: string[]; arrowsAt: Record<number, Arrow[]>; coach: string; title: string }) {
  const step = useStep(progress, line.plies);
  return (
    <div className={'ld-lesson ' + line.kind}>
      <FlatBoard line={line} ply={step} arrows={arrowsAt[step]} label={`Sơ đồ bài ${title}, nước ${step} trên ${line.plies}`} />
      <div className="ld-bubble" aria-live="polite">
        <div className="ld-bubble-head">
          <span className="ld-bubble-name">{coach}</span>
          <span className="ld-steps" aria-label={`Nước ${step} trên ${line.plies}`}>
            {Array.from({ length: line.plies + 1 }, (_, i) => (
              <span key={i} className={i <= step ? 'on' : ''} />
            ))}
          </span>
        </div>
        <p key={step} className="ld-bubble-text">
          {notes[step]}
        </p>
      </div>
    </div>
  );
}

/* ---------- Chặng 3: ván mẫu kinh điển ---------- */

export function GameStage({
  line,
  sans,
  captions,
  players,
  meta,
  progress,
}: StageProps & { line: Line; sans: string[]; captions: Record<number, string>; players: [string, string]; meta: string }) {
  const step = useStep(progress, line.plies);
  let key = 0;
  for (const k of Object.keys(captions).map(Number)) if (k <= step && k > key) key = k;
  const moveNo = Math.ceil(step / 2);
  const san = step ? (step % 2 ? `${moveNo}. ${sans[step - 1]}` : `${moveNo}… ${sans[step - 1]}`) : 'Thế cờ ban đầu';
  return (
    <div className={'ld-game ' + line.kind}>
      <div className="ld-game-head">
        <span className="ld-game-players">
          {players[0]} <span className="ld-muted">và</span> {players[1]}
        </span>
        <span className="ld-muted">{meta}</span>
      </div>
      <FlatBoard line={line} ply={step} label={`${players[0]} và ${players[1]}, sau nửa nước thứ ${step}`} />
      <div className="ld-game-foot">
        <div className="ld-game-move">
          <span className="ld-san">{san}</span>
          <span className="ld-muted">
            {step}/{line.plies}
          </span>
        </div>
        <div className="ld-track" aria-hidden="true">
          <span style={{ transform: `scaleX(${step / line.plies})` }} />
        </div>
        <p key={key} className="ld-game-caption" aria-live="polite">
          {captions[key]}
        </p>
      </div>
    </div>
  );
}

/* ---------- Chặng 4: đấu với máy có huấn luyện viên ---------- */

export interface BotRung {
  name: string;
  title: string;
  elo: number;
}
export interface Review {
  label: string;
  color: string;
  san: string;
  text: string;
  win: number;
}

export function LadderStage({ bots, reviews, hopper, kind, coach, progress }: StageProps & { bots: BotRung[]; reviews: Review[]; hopper: string; kind: Kind; coach: string }) {
  const step = useStep(progress, bots.length - 1);
  const rv = reviews[Math.min(step, reviews.length - 1)];
  const rungs = [...bots].reverse();
  return (
    <div className="ld-ladder">
      <ol className="ld-rungs" aria-label="Sáu cấp độ máy">
        {rungs.map((b, idx) => {
          const level = bots.length - idx - 1;
          return (
            <li key={b.name} className={'ld-rung' + (level === step ? ' on' : '') + (level < step ? ' done' : '')}>
              <span className="ld-rung-lv">{level + 1}</span>
              <span className="ld-rung-name">
                {b.name}
                <span className="ld-muted">{b.title}</span>
              </span>
              <span className="ld-rung-elo">
                {level < step ? <CheckCircle size={16} weight="fill" aria-label="Đã thắng" /> : null}
                {b.elo}
              </span>
              <span className="ld-rung-bar" aria-hidden="true">
                <span style={{ transform: `scaleX(${b.elo / 2400})` }} />
              </span>
            </li>
          );
        })}
        <li className="ld-rung-hopper" aria-hidden="true" style={{ transform: `translateY(calc(${bots.length - 1 - step} * (100% + var(--gap))))` }}>
          <span key={step} className={'ld-hop ' + kind}>
            <PieceFace k={hopper} kind={kind} />
          </span>
        </li>
      </ol>
      <div className="ld-review" aria-live="polite">
        <div className="ld-review-head">
          <span className="ld-bubble-name">{coach} chấm nước</span>
          <span className="ld-san">{rv.san}</span>
        </div>
        <div key={step} className="ld-review-body">
          <span className="ld-grade">
            <span className="ld-grade-dot" style={{ background: rv.color }} />
            {rv.label}
          </span>
          <p>{rv.text}</p>
        </div>
        <div className="ld-win">
          <span className="ld-muted">Tỉ lệ thắng của bạn</span>
          <span className="ld-win-num">{Math.round(rv.win * 100)}%</span>
        </div>
        <div className="ld-track win" aria-hidden="true">
          <span style={{ transform: `scaleX(${rv.win})` }} />
        </div>
      </div>
    </div>
  );
}

/* ---------- Chơi với bạn: một phòng chơi từ lúc gửi lời mời tới lời đề nghị hòa ---------- */

export interface RoomDemo {
  line: Line;
  sans: string[];
  code: string;
  /** Nhãn thời gian hiện ở đầu phòng, VD "10 phút + 5 giây" */
  time: string;
  /** Thời gian ban đầu và thời gian cộng thêm mỗi nước (giây) */
  clock: number;
  inc: number;
  /** Số giây mỗi nửa nước suy nghĩ (hai nước đầu không tính giờ, như phòng thật) */
  think: number[];
  sides: [string, string];
  /** Hình đại diện mỗi bên: quân Vua/Tướng */
  kings: [string, string];
  you: string;
  friend: string;
}

export interface RoomFrame {
  ply: number;
  joined: boolean;
  copied: boolean;
  net: 'on' | 'off' | 'back';
  draw: boolean;
  /** Ý đang minh họa trong danh sách bên cạnh (0..3) */
  phase: number;
  status: string;
}

/** Các khung hình của phòng minh họa, theo thứ tự cuộn: mời, vào phòng và đi quân, rớt mạng, đề nghị hòa */
export function roomFrames(d: RoomDemo): RoomFrame[] {
  const n = d.line.plies;
  const a = Math.round(n / 2),
    b = Math.round((n * 3) / 4);
  const base = { joined: true, copied: true, net: 'on' as const, draw: false };
  const move = (p: number, phase: number): RoomFrame => ({
    ...base,
    ply: p,
    phase,
    status: p % 2 ? `Máy chủ nhận nước ${d.sans[p - 1]} của bạn. Chờ ${d.friend} đi.` : `${d.friend} đi ${d.sans[p - 1]}. Đến lượt bạn.`,
  });
  const range = (from: number, to: number, phase: number) => Array.from({ length: to - from + 1 }, (_, i) => move(from + i, phase));
  return [
    { ...base, ply: 0, joined: false, copied: false, phase: 0, status: 'Phòng đã sẵn sàng. Chép đường dẫn mời để gửi cho bạn của bạn.' },
    { ...base, ply: 0, joined: false, phase: 0, status: 'Đã chép đường dẫn. Dán vào tin nhắn là xong.' },
    { ...base, ply: 0, phase: 1, status: `${d.friend} đã vào phòng. Ván cờ bắt đầu, bạn đi trước.` },
    ...range(1, a, 1),
    { ...base, ply: a, net: 'off', phase: 2, status: 'Mất kết nối, đang kết nối lại. Ván cờ vẫn được giữ trên máy chủ.' },
    { ...base, ply: a, net: 'back', phase: 2, status: 'Đã kết nối lại: đúng thế cờ, đúng thời gian còn lại.' },
    ...range(a + 1, b, 2),
    ...range(b + 1, n, 3),
    { ...base, ply: n, draw: true, phase: 3, status: `${d.friend} đề nghị hòa. Bạn đồng ý, hoặc từ chối để đánh tiếp.` },
  ];
}

const clockText = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

export function RoomStage({ demo, frame, link }: { demo: RoomDemo; frame: RoomFrame; link: string }) {
  const kind = demo.line.kind;
  // đồng hồ hai bên sau từng nửa nước
  const clocks = useMemo(() => {
    const c: [number, number][] = [[demo.clock, demo.clock]];
    for (let p = 1; p <= demo.line.plies; p++) {
      const next: [number, number] = [...c[p - 1]];
      if (p > 2) next[(p - 1) % 2] += demo.inc - (demo.think[p - 1] ?? 0);
      c.push(next);
    }
    return c;
  }, [demo]);
  const f = frame;
  const running = f.joined && f.ply >= 2 ? f.ply % 2 : -1;

  const seat = (s: 0 | 1) => {
    const seated = s === 0 || f.joined;
    const online = s === 0 ? f.net !== 'off' : f.joined;
    return (
      <div className={'ld-seat' + (running === s ? ' turn' : '') + (seated ? '' : ' empty')}>
        <span className={'ld-seat-av ' + kind}>{seated && <PieceFace k={demo.kings[s]} kind={kind} />}</span>
        <span className="ld-seat-main">
          <span className="ld-seat-name">
            <span className="ld-seat-text">{seated ? (s === 0 ? demo.you : demo.friend) : 'Đang chờ người chơi…'}</span>
            {s === 0 && <span className="ld-seat-tag">Bạn</span>}
            {seated && <span className={'ld-presence' + (online ? ' on' : '')} />}
          </span>
          <span className="ld-muted">Cầm quân {demo.sides[s]}</span>
        </span>
        <span className="ld-clock">{clockText(clocks[f.ply][s])}</span>
      </div>
    );
  };

  return (
    <div className={'ld-room ' + kind}>
      <div className="ld-room-head">
        <span className="ld-room-name">Phòng {demo.code}</span>
        <span className="ld-muted">{demo.time}</span>
      </div>
      {seat(1)}
      <div className={'ld-room-board' + (!f.joined || f.net === 'off' ? ' dim' : '')}>
        <FlatBoard line={demo.line} ply={f.ply} label={`Phòng ${demo.code}: ${f.joined ? `bạn và ${demo.friend}, sau nửa nước thứ ${f.ply}` : 'đang chờ người chơi thứ hai'}`} />
        <div aria-hidden="true" className={'ld-room-pop ld-room-invite' + (f.joined ? '' : ' on')}>
          <span className="ld-bubble-name">Mời bạn vào phòng</span>
          <span className="ld-room-code">{demo.code}</span>
          <span className="ld-room-link">
            <span className="ld-room-url">{link}</span>
            <span className={'ld-room-copy' + (f.copied ? ' done' : '')}>
              {f.copied ? <Check size={14} weight="bold" aria-hidden="true" /> : <Copy size={14} weight="bold" aria-hidden="true" />}
              {f.copied ? 'Đã chép' : 'Chép'}
            </span>
          </span>
        </div>
        <div aria-hidden="true" className={'ld-room-pop ld-room-net bad' + (f.net === 'off' ? ' on' : '')}>
          <WifiSlash size={16} weight="bold" aria-hidden="true" />
          Mất kết nối, đang kết nối lại…
        </div>
        <div aria-hidden="true" className={'ld-room-pop ld-room-net good' + (f.net === 'back' ? ' on' : '')}>
          <CheckCircle size={16} weight="fill" aria-hidden="true" />
          Đã kết nối lại
        </div>
        <div aria-hidden="true" className={'ld-room-pop ld-room-offer' + (f.draw ? ' on' : '')}>
          <span className="ld-room-offer-text">
            <Handshake size={18} weight="bold" aria-hidden="true" />
            {demo.friend} đề nghị hòa
          </span>
          <span className="ld-room-chips">
            <span className="ld-room-chip primary">Đồng ý hòa</span>
            <span className="ld-room-chip">Từ chối</span>
          </span>
        </div>
      </div>
      {seat(0)}
      <p key={f.status} className="ld-room-status" aria-live="polite">
        {f.status}
      </p>
    </div>
  );
}
