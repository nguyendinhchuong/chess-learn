// Bốn chặng của lộ trình trên trang giới thiệu: bản đồ trang, bài học, ván mẫu, đấu với máy.
// Mỗi chặng nhận tiến độ cuộn 0..1 và chỉ vẽ lại khi bước rời rạc (nước đi, ô, cấp độ) thay đổi.
import { ReactNode, useSyncExternalStore } from 'react';
import { CheckCircle } from '@phosphor-icons/react';
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
