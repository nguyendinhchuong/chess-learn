// Hai người chơi trên một máy (trang Luyện tập, #/luyen-tap và #/co-tuong/luyen-tap): hai người lần lượt đi quân
// trên cùng một bàn cờ, có đồng hồ từng bên, bàn cờ tự xoay về phía người đến lượt.
// Dùng chung cho hai môn cờ; phần riêng của từng môn (bàn cờ, ký hiệu nước đi, âm thanh, luật kết thúc ván) nằm trong OnlineKit.
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { ArrowsLeftRight, ChartLineUp, Play, X } from '@phosphor-icons/react';
import { save, useStored } from '../lib/storage';
import { sounds } from '../lib/sound';
import { endDetail, openAnalysis, rememberGame, type SavedGame } from '../analysis/history';
import { formatSheet } from '../analysis/sheet';
import { Clock, formatClock, SheetActions, useModalLock } from './OnlinePages';
import type { OnlineKit } from './kit';
import { NAME_MAX, TIME_PRESETS, timeLabel, type EndReason, type Result, type Side, type TimeControl } from './protocol';

/** Cách chơi ở trang Luyện tập: đấu với máy hoặc hai người trên một máy */
export type Opponent = 'bot' | 'local';

const DEFAULT_NAMES: [string, string] = ['Người chơi 1', 'Người chơi 2'];
/** Đi xong một nước, chờ một nhịp rồi mới xoay bàn để người vừa đi kịp thấy nước của mình */
const ROTATE_DELAY_MS = 450;

export interface LocalSetup {
  /** Khóa React của màn hình ván: đổi khi bắt đầu lại */
  id: number;
  /** Lúc bắt đầu ván (Date.now()): mã của ván trong "Ván đã chơi", giữ nguyên khi tiếp tục ván dở */
  startedAt: number;
  /** Tên người cầm quân [Trắng/Đỏ, Đen] */
  names: [string, string];
  time: TimeControl | null;
  /** Bàn cờ tự xoay về phía người đến lượt */
  autoFlip: boolean;
}

interface LocalEnd {
  result: Result;
  reason: EndReason;
}

/** Ván đang chơi, lưu trên trình duyệt để tải lại trang vẫn chơi tiếp được */
interface LocalSaved {
  setup: LocalSetup;
  moves: string[];
  /** Thời gian còn lại của hai bên tại nước gần nhất (hoặc lúc tạm dừng) */
  clocks: [number, number] | null;
  /** Thời gian còn lại của bên vừa đi sau từng nước */
  clockLog: number[];
  ended: LocalEnd | null;
  savedAt: number;
}

export interface LocalStart extends LocalSetup {
  resume?: LocalSaved;
}

const storeKey = (store: string) => store + 'local-game';

// =====================================================================================
// Chọn cách chơi
// =====================================================================================
export function OpponentSwitch({ value, onChange }: { value: Opponent; onChange: (v: Opponent) => void }) {
  return (
    <div className="choice-row opp-switch" role="group" aria-label="Cách chơi">
      <button className={'choice' + (value === 'bot' ? ' active' : '')} aria-pressed={value === 'bot'} onClick={() => onChange('bot')}>
        <span className="choice-ic" aria-hidden="true">
          🤖
        </span>
        Đấu với máy
      </button>
      <button className={'choice' + (value === 'local' ? ' active' : '')} aria-pressed={value === 'local'} onClick={() => onChange('local')}>
        <span className="choice-ic" aria-hidden="true">
          👥
        </span>
        Đấu hai người
      </button>
    </div>
  );
}

// =====================================================================================
// Màn hình thiết lập
// =====================================================================================
export function LocalSetupScreen({
  kit,
  store,
  switcher,
  note,
  onStart,
}: {
  kit: OnlineKit;
  /** Tiền tố khóa lưu trữ của môn cờ: '' (cờ vua) hoặc 'xq-' (cờ tướng) */
  store: string;
  /** Công tắc chọn cách chơi, đặt ngay dưới tiêu đề */
  switcher: ReactNode;
  /** Lời nhắn thêm (vd: thế cờ đã chọn không dùng cho ván hai người) */
  note?: string;
  onStart: (s: LocalStart) => void;
}) {
  const [names, setNames] = useStored<[string, string]>(store + 'local-names', ['', '']);
  const [timeIdx, setTimeIdx] = useStored<number>(store + 'local-time', 0);
  const [autoFlip, setAutoFlip] = useStored<boolean>(store + 'local-flip', true);
  const [saved, setSaved] = useStored<LocalSaved | null>(storeKey(store), null);
  const preset = TIME_PRESETS[timeIdx] ?? TIME_PRESETS[0];
  const shown = (s: Side) => names[s].trim() || DEFAULT_NAMES[s];
  const setName = (s: Side, v: string) => setNames(s === 0 ? [v, names[1]] : [names[0], v]);

  const start = () => {
    const now = Date.now();
    onStart({ id: now, startedAt: now, names: [shown(0), shown(1)], time: preset.time, autoFlip });
  };

  return (
    <div className="setup">
      <div className="page-head">
        <h1>👥 Hai người chơi {kit.title} trên một máy</h1>
        <p>
          Hai bạn ngồi cùng một máy và lần lượt đi quân trên cùng bàn cờ. Bàn cờ tự xoay về phía người đến lượt, mỗi bên có đồng hồ riêng và được đi lại nước vừa đi. Ván xong có
          biên bản để tải về, và máy sẽ phân tích nước đi của cả hai người.
        </p>
      </div>

      {switcher}

      {saved && !saved.ended && saved.moves.length > 0 && (
        <div className="callout info" style={{ marginBottom: 18, alignItems: 'center' }}>
          <span className="ci" aria-hidden="true">
            👥
          </span>
          <div style={{ flex: 1 }}>
            <b>Có một ván hai người đang dở</b>: {saved.setup.names[0]} – {saved.setup.names[1]}, {saved.moves.length} nửa nước.
          </div>
          <button className="btn small primary" onClick={() => onStart({ ...saved.setup, id: Date.now(), resume: saved })}>
            <Play size={14} weight="fill" aria-hidden="true" />
            Tiếp tục
          </button>
          <button className="btn small ghost" onClick={() => setSaved(null)}>
            Bỏ ván
          </button>
        </div>
      )}

      <div className="grid cols-2">
        <div className="card">
          <h3>1. Tên người chơi</h3>
          {([0, 1] as Side[]).map((s) => (
            <div key={s} className="local-name">
              <span className="local-name-side" aria-hidden="true">
                <kit.SideIcon side={s} />
              </span>
              <label className="local-name-field">
                <span className="small muted">
                  Cầm quân {kit.sideNames[s]}
                  {s === 0 && ' · đi trước'}
                </span>
                <input className="text-input" value={names[s]} maxLength={NAME_MAX} placeholder={DEFAULT_NAMES[s]} onChange={(e) => setName(s, e.target.value)} />
              </label>
            </div>
          ))}
          <button className="btn small" onClick={() => setNames([names[1], names[0]])}>
            <ArrowsLeftRight size={14} weight="bold" aria-hidden="true" />
            Đổi bên
          </button>
        </div>
        <div className="card">
          <h3>2. Thời gian mỗi bên</h3>
          <div className="choice-row">
            {TIME_PRESETS.map((p, i) => (
              <button key={p.label} className={'choice' + (timeIdx === i ? ' active' : '')} aria-pressed={timeIdx === i} onClick={() => setTimeIdx(i)}>
                {p.time ? '⏱️' : '♾️'} {p.label}
              </button>
            ))}
          </div>
          <p className="small muted" style={{ marginBottom: 0 }}>
            {preset.time
              ? `Mỗi bên có ${preset.time.initial / 60_000} phút, mỗi nước đi được cộng thêm ${preset.time.increment / 1000} giây. Nước đầu của mỗi bên không tính giờ; hết giờ là thua. Có thể tạm dừng đồng hồ giữa ván.`
              : 'Không có đồng hồ – thoải mái vừa chơi vừa suy nghĩ.'}
          </p>
        </div>
      </div>

      <div className="card" style={{ marginTop: 22 }}>
        <h3>3. Bàn cờ</h3>
        <label className="toggle" style={{ paddingBottom: 0 }}>
          <input type="checkbox" checked={autoFlip} onChange={(e) => setAutoFlip(e.target.checked)} />
          <span className="sw" />
          <span>
            <b>Tự xoay bàn cờ theo lượt đi</b>
            <span className="desc">Quân của người đến lượt luôn ở phía dưới – hợp khi hai người chuyền máy cho nhau. Tắt đi nếu hai người ngồi cùng một phía màn hình.</span>
          </span>
        </label>
      </div>

      {note && (
        <p className="small muted" style={{ marginTop: 16 }}>
          {note}
        </p>
      )}

      <div className="start-bar" style={{ ['--bot-color' as string]: 'var(--primary)' }}>
        <div className="start-bar-pick">
          <span className="bot-avatar" aria-hidden="true">
            👥
          </span>
          <span className="start-bar-text">
            <b>
              {shown(0)} – {shown(1)}
            </b>
            <span>{preset.time ? preset.label : 'Không giới hạn thời gian'}</span>
          </span>
        </div>
        <button className="btn primary big" onClick={start}>
          <Play size={16} weight="fill" aria-hidden="true" />
          <span>
            Bắt đầu
            <span className="start-bar-long"> ván hai người</span>
          </span>
        </button>
      </div>
    </div>
  );
}

// =====================================================================================
// Màn hình ván đấu
// =====================================================================================
function localSheet(kit: OnlineKit, setup: LocalSetup, moves: string[], sans: string[], end: LocalEnd, clockLog?: number[]): SavedGame {
  const pgn = formatSheet({
    variant: kit.variant,
    event: `Kỳ Đạo – Hai người chơi ${kit.title} trên một máy`,
    players: setup.names,
    result: end.result,
    reason: end.reason,
    reasonText: endDetail(end, kit),
    time: setup.time,
    date: new Date(setup.startedAt),
    ucis: moves,
    sans,
    clockLog,
  });
  return {
    id: `local-${kit.variant}-${setup.startedAt}`,
    variant: kit.variant,
    pgn,
    players: setup.names,
    result: end.result,
    you: null,
    plies: moves.length,
    savedAt: Date.now(),
    source: 'local',
  };
}

const winnerOf = (end: LocalEnd): Side | null => (end.result === '1-0' ? 0 : end.result === '0-1' ? 1 : null);

export function LocalGame({ kit, store, start, onNew, onRestart }: { kit: OnlineKit; store: string; start: LocalStart; onNew: () => void; onRestart: (s: LocalStart) => void }) {
  const { resume } = start;
  const setup: LocalSetup = { id: start.id, startedAt: start.startedAt, names: start.names, time: start.time, autoFlip: start.autoFlip };
  const [moves, setMoves] = useState<string[]>(resume?.moves ?? []);
  const [clocks, setClocks] = useState<[number, number] | null>(resume?.clocks ?? (start.time ? [start.time.initial, start.time.initial] : null));
  const [clockLog, setClockLog] = useState<number[]>(resume?.clockLog ?? []);
  /** Lúc đồng hồ của bên đang đi bắt đầu chạy (performance.now); null: đồng hồ đứng (nước đầu mỗi bên, tạm dừng, hết ván) */
  const [turnStartedAt, setTurnStartedAt] = useState<number | null>(null);
  // tiếp tục ván dở có tính giờ: đồng hồ chờ hai người sẵn sàng rồi mới chạy
  const [paused, setPaused] = useState(() => !!start.time && !!resume && !resume.ended && resume.moves.length >= 2);
  const [ended, setEnded] = useState<LocalEnd | null>(resume?.ended ?? null);
  const [viewPly, setViewPly] = useState<number | null>(null);
  const [autoFlip, setAutoFlip] = useState(start.autoFlip);
  const [resultOpen, setResultOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const resultTimer = useRef<number>();

  const line = useMemo(() => kit.replay(moves), [kit, moves]);
  const status = useMemo(() => kit.status(moves), [kit, moves]);
  const ply = line.sans.length;
  const turn = (ply % 2) as Side;
  const [bottom, setBottom] = useState<Side>(start.autoFlip ? turn : 0);

  // bắt đầu ván: đưa bàn cờ lên đầu màn hình (nút bắt đầu nằm cuối trang thiết lập)
  useEffect(() => {
    window.scrollTo({ top: 0 });
    return () => clearTimeout(resultTimer.current);
  }, []);

  // ---- lưu ván để tải lại trang vẫn chơi tiếp ----
  useEffect(() => {
    const data: LocalSaved = { setup, moves, clocks, clockLog, ended, savedAt: Date.now() };
    save(storeKey(store), data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moves, clocks, ended]);

  // ---- đồng hồ ----
  function stopClock() {
    if (clocks && turnStartedAt !== null) {
      const c: [number, number] = [clocks[0], clocks[1]];
      c[turn] = Math.max(0, c[turn] - (performance.now() - turnStartedAt));
      setClocks(c);
    }
    setTurnStartedAt(null);
  }

  function finish(end: LocalEnd, onBoard = false) {
    stopClock();
    setPaused(false);
    setEnded(end);
    // chiếu hết / hết nước đi xảy ra trên bàn cờ: âm thanh đã phát cùng nước đi, chờ một nhịp để hai người thấy nước cuối
    if (!onBoard) sounds.end();
    clearTimeout(resultTimer.current);
    resultTimer.current = window.setTimeout(() => setResultOpen(true), onBoard ? 900 : 300);
  }

  // hết giờ: bên đang đi thua
  useEffect(() => {
    if (!clocks || turnStartedAt === null || ended) return;
    const left = clocks[turn] - (performance.now() - turnStartedAt);
    const id = window.setTimeout(() => {
      const c: [number, number] = [clocks[0], clocks[1]];
      c[turn] = 0;
      setClocks(c);
      setTurnStartedAt(null);
      setEnded({ result: turn === 0 ? '0-1' : '1-0', reason: 'timeout' });
      sounds.end();
      clearTimeout(resultTimer.current);
      resultTimer.current = window.setTimeout(() => setResultOpen(true), 300);
    }, Math.max(0, left));
    return () => clearTimeout(id);
  }, [clocks, turnStartedAt, turn, ended]);

  // ---- kết thúc ván trên bàn cờ ----
  useEffect(() => {
    if (ended || !status.over || !status.result || !status.reason) return;
    finish({ result: status.result, reason: status.reason }, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  // ---- nước mới: âm thanh, rồi xoay bàn cờ về phía người đến lượt ----
  const prevPly = useRef(ply);
  useEffect(() => {
    const forward = ply > prevPly.current;
    if (ply === prevPly.current + 1) kit.moveSound(line.fens[ply - 1], moves[ply - 1], line.sans[ply - 1]);
    prevPly.current = ply;
    if (!autoFlip || status.over) return;
    if (!forward) {
      setBottom(turn);
      return;
    }
    const t = window.setTimeout(() => setBottom(turn), ROTATE_DELAY_MS);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ply]);

  // ---- biên bản của ván vừa xong: lưu vào "Ván đã chơi" ----
  const sheet = useMemo(
    () => (ended && moves.length ? localSheet(kit, setup, moves, line.sans, ended, clocks ? clockLog : undefined) : null),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ended, moves, line, clockLog],
  );
  useEffect(() => {
    if (sheet) rememberGame(sheet);
  }, [sheet]);

  // ← → xem lại các nước
  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if (resultOpen || e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowLeft') setViewPly((v) => Math.max(0, (v ?? ply) - 1));
      else if (e.key === 'ArrowRight') setViewPly((v) => (v === null || v + 1 >= ply ? null : v + 1));
      else return;
      e.preventDefault();
    };
    window.addEventListener('keydown', on);
    return () => window.removeEventListener('keydown', on);
  }, [ply, resultOpen]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  // ---- điều khiển ----
  const shown = viewPly === null ? ply : Math.min(viewPly, ply);
  const viewing = shown < ply;
  const name = (s: Side) => setup.names[s];

  function onMove(uci: string) {
    if (ended || paused || viewing) return;
    const now = performance.now();
    if (clocks && start.time) {
      const c: [number, number] = [clocks[0], clocks[1]];
      // như phòng trực tuyến: chỉ cộng giờ khi đồng hồ đã chạy (nước đầu mỗi bên không tính giờ)
      if (turnStartedAt !== null) c[turn] = Math.max(0, c[turn] - (now - turnStartedAt)) + start.time.increment;
      setClocks(c);
      setClockLog([...clockLog.slice(0, ply), c[turn]]);
    }
    setMoves([...moves.slice(0, ply), uci]);
    setTurnStartedAt(clocks && ply + 1 >= 2 ? now : null);
  }

  function undo() {
    if (!ply) return;
    const n = ply - 1;
    const s = (n % 2) as Side;
    if (clocks && start.time) {
      // trả đồng hồ hai bên về lúc trước nước bị đi lại
      const initial = start.time.initial;
      const c: [number, number] = [0, 0];
      c[s] = clockLog[n - 2] ?? initial;
      c[s ^ 1] = clockLog[n - 1] ?? initial;
      setClocks(c);
      setClockLog(clockLog.slice(0, n));
    }
    setMoves(moves.slice(0, n));
    setEnded(null);
    clearTimeout(resultTimer.current);
    setResultOpen(false);
    setViewPly(null);
    setTurnStartedAt(clocks && n >= 2 && !paused ? performance.now() : null);
    setToast(`Đã đi lại – đến lượt ${name(s)}.`);
  }

  function togglePause() {
    if (paused) {
      setPaused(false);
      if (clocks && ply >= 2) setTurnStartedAt(performance.now());
    } else {
      stopClock();
      setPaused(true);
    }
  }

  function resign() {
    if (ended) return;
    if (!window.confirm(`${name(turn)} (quân ${kit.sideNames[turn]}) xin thua?`)) return;
    finish({ result: turn === 0 ? '0-1' : '1-0', reason: 'resign' });
  }

  function draw() {
    if (ended) return;
    if (!window.confirm('Hai người đồng ý hòa ván này?')) return;
    finish({ result: '1/2-1/2', reason: 'agreement' });
  }

  const rematch = () => {
    const now = Date.now();
    onRestart({ id: now, startedAt: now, names: [setup.names[1], setup.names[0]], time: setup.time, autoFlip });
  };

  const clockRunning = turnStartedAt !== null && !ended;
  const top = (bottom ^ 1) as Side;
  const winner = ended ? winnerOf(ended) : null;

  const strip = (s: Side) => (
    <div className={'player-strip online-strip' + (!ended && turn === s ? ' to-move' : '')} data-side={s}>
      <div className="pa">
        <kit.SideIcon side={s} />
      </div>
      <div className="ps-main">
        <div className="pn">
          <span className="pn-name">{name(s)}</span>
          {winner === s && <span className="tag">Thắng</span>}
        </div>
        <div className="ps">
          Cầm quân {kit.sideNames[s]}
          {!ended && turn === s && ' · đến lượt'}
        </div>
      </div>
      {clocks && <Clock ms={clocks[s]} running={clockRunning && turn === s} playing={!ended} receivedAt={turnStartedAt ?? 0} label={`Đồng hồ của ${name(s)}`} />}
    </div>
  );

  return (
    <div className="local-game">
      <div className="play">
        <div className="play-board-col">
          {strip(top)}
          <div className={'board-wrap' + (paused ? ' paused' : '')}>
            <kit.Board fen={line.fens[shown]} bottom={bottom} movable={!ended && !paused && !viewing ? turn : null} onMove={onMove} lastMove={shown > 0 ? moves[shown - 1] : null} />
          </div>
          {strip(bottom)}
          <div className="controls-bar">
            <button className="btn small" onClick={undo} disabled={!ply} title="Lùi lại nước vừa đi">
              ↩️ Đi lại
            </button>
            <button className="btn small" onClick={() => setBottom(top)}>
              🔄 Lật bàn
            </button>
            {clocks && !ended && (clockRunning || paused) && (
              <button className="btn small" onClick={togglePause} aria-pressed={paused}>
                {paused ? '▶️ Chạy tiếp' : '⏸ Tạm dừng'}
              </button>
            )}
            {!ended && (
              <>
                <button className="btn small" onClick={draw}>
                  🤝 Hòa
                </button>
                <button className="btn small danger" onClick={resign}>
                  🏳 Xin thua
                </button>
              </>
            )}
            {ended && (
              <>
                <button className="btn small" onClick={() => setResultOpen(true)}>
                  🏁 Kết quả
                </button>
                <button className="btn small primary" onClick={rematch}>
                  ♻️ Ván mới (đổi bên)
                </button>
              </>
            )}
          </div>
          <label className="toggle local-flip">
            <input
              type="checkbox"
              checked={autoFlip}
              onChange={(e) => {
                setAutoFlip(e.target.checked);
                if (e.target.checked && !ended) setBottom(turn);
              }}
            />
            <span className="sw" />
            <span className="small">Tự xoay bàn cờ theo lượt đi</span>
          </label>
          {toast && (
            <div className="callout info" style={{ justifyContent: 'center' }} role="status">
              {toast}
            </div>
          )}
        </div>

        <div className="coach-panel">
          <div className={'coach-card online-status' + (ended ? ' over' : '')} aria-live="polite">
            {ended ? (
              <>
                <h4>🏁 Kết quả</h4>
                <div className="online-result">
                  <span className="or-icon" aria-hidden="true">
                    {winner === null ? '🤝' : '🏆'}
                  </span>
                  <span>
                    <b>{winner === null ? 'Hòa' : `${name(winner)} thắng`}</b>
                    <span className="muted">{endDetail(ended, kit)}</span>
                  </span>
                </div>
              </>
            ) : (
              <>
                <h4>{paused ? '⏸ Đang tạm dừng' : '♟️ Ván đấu'}</h4>
                <p style={{ margin: 0 }}>
                  {paused ? (
                    <>Đồng hồ đang đứng yên. Bấm “Chạy tiếp” khi hai người đã sẵn sàng.</>
                  ) : (
                    <>
                      Lượt của <b>{name(turn)}</b> (quân {kit.sideNames[turn]}).{ply === 0 && ' Đi nước đầu tiên để bắt đầu ván.'}
                    </>
                  )}
                </p>
              </>
            )}
          </div>

          <div className="coach-card">
            <h4>📜 Biên bản ván đấu</h4>
            <kit.MoveList sans={line.sans} current={shown - 1} onSelect={(i) => setViewPly(i + 1 >= ply ? null : i + 1)} />
            {sheet ? (
              <SheetActions kit={kit} sheet={sheet} onToast={setToast} />
            ) : (
              ply > 0 && (
                <p className="small muted" style={{ margin: '8px 0 0' }}>
                  Khi ván kết thúc, bạn có thể tải biên bản và cho máy phân tích nước đi của cả hai người.
                </p>
              )
            )}
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
            <h4>👥 Đấu hai người</h4>
            <p className="small muted" style={{ margin: 0 }}>
              {timeLabel(setup.time)}
            </p>
            <button className="btn small" style={{ marginTop: 8 }} onClick={onNew}>
              ⚙ Thiết lập ván khác
            </button>
          </div>
        </div>
      </div>

      {resultOpen && ended && (
        <LocalResultDialog kit={kit} setup={setup} end={ended} plies={ply} clocks={clocks} sheet={sheet} onClose={() => setResultOpen(false)} onRematch={rematch} onNew={onNew} />
      )}
    </div>
  );
}

/** Hộp thoại kết quả: hiện khi ván vừa kết thúc; đóng bằng ✕, chạm vùng tối hoặc Esc rồi mở lại bằng nút "Kết quả" */
function LocalResultDialog({
  kit,
  setup,
  end,
  plies,
  clocks,
  sheet,
  onClose,
  onRematch,
  onNew,
}: {
  kit: OnlineKit;
  setup: LocalSetup;
  end: LocalEnd;
  plies: number;
  clocks: [number, number] | null;
  sheet: SavedGame | null;
  onClose: () => void;
  onRematch: () => void;
  onNew: () => void;
}) {
  const { root, panel } = useModalLock(onClose);
  const winner = winnerOf(end);
  const score = (s: Side) => (winner === null ? '½' : winner === s ? '1' : '0');

  const player = (s: Side) => (
    <div className={'rd-player' + (winner === s ? ' won' : winner !== null ? ' lost' : '')}>
      <span className="rd-avatar">
        <kit.SideIcon side={s} />
        {winner === s && (
          <span className="rd-crown" aria-hidden="true">
            👑
          </span>
        )}
      </span>
      <span className="rd-name">{setup.names[s]}</span>
      <span className="rd-meta">{kit.sideNames[s]}</span>
      {clocks && (
        <span className="rd-meta rd-clock" title="Thời gian còn lại">
          ⏱️ {formatClock(clocks[s])}
        </span>
      )}
    </div>
  );

  return createPortal(
    <div ref={root} className="modal-back" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div ref={panel} className="modal result-dialog" role="dialog" aria-modal="true" aria-labelledby="rd-title" aria-describedby="rd-detail" tabIndex={-1}>
        <button type="button" className="icon-btn rd-close" aria-label="Đóng" onClick={onClose}>
          <X size={16} weight="bold" aria-hidden="true" />
        </button>
        <div className={'rd-badge ' + (winner === null ? 'draw' : 'win')} aria-hidden="true">
          {winner === null ? '🤝' : '🏆'}
        </div>
        <h2 id="rd-title">{winner === null ? 'Hòa cờ' : `${setup.names[winner]} thắng!`}</h2>
        <p id="rd-detail" className="rd-detail">
          {endDetail(end, kit)}
        </p>

        <div className="rd-board" aria-label={`Tỉ số: ${setup.names[0]} ${score(0)}, ${setup.names[1]} ${score(1)}`}>
          {player(0)}
          <div className="rd-score" aria-hidden="true">
            <span>{score(0)}</span>
            <span className="rd-dash">–</span>
            <span>{score(1)}</span>
          </div>
          {player(1)}
        </div>

        <dl className="rd-stats">
          <div>
            <dt>Số nước</dt>
            <dd>{Math.ceil(plies / 2)}</dd>
          </div>
          <div>
            <dt>Thời gian</dt>
            <dd>{setup.time ? `${Math.round(setup.time.initial / 60_000)} + ${Math.round(setup.time.increment / 1000)}` : 'Không giới hạn'}</dd>
          </div>
          <div>
            <dt>Cách chơi</dt>
            <dd>Cùng một máy</dd>
          </div>
        </dl>

        <div className="btn-row rd-actions">
          <button className="btn primary" onClick={onRematch}>
            ♻️ Ván mới (đổi bên)
          </button>
          {sheet && (
            <button className="btn" onClick={() => openAnalysis(sheet)}>
              <ChartLineUp size={16} weight="bold" aria-hidden="true" />
              Phân tích ván
            </button>
          )}
          <button className="btn" onClick={onClose}>
            🔍 Xem lại ván
          </button>
          <button className="btn ghost" onClick={onNew}>
            ⚙ Thiết lập khác
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
