import { useEffect, useMemo, useRef, useState } from 'react';
import { Board, BoardArrow, SquareBadge } from '../components/Board';
import { MiniBoard } from '../components/MiniBoard';
import { MoveList, RichText, San } from '../components/common';
import { GuideBox, PurposeText, StepControls, moveLabel, safeLine, useMovePurpose } from '../components/LineViewer';
import { PUZZLES, PUZZLE_LEVELS, mateLength, puzzleById } from '../data/puzzles';
import type { Puzzle } from '../data/types';
import { Position, PlayedLine } from '../engine/board';
import { isMateMove } from '../engine/mate';
import { cancelAnalysis, requestAnalysis } from '../engine/client';
import { PIECE_SVG } from '../assets/pieces';
import { href } from '../lib/router';
import { useStored, PuzzleRecord, PuzzleStats } from '../lib/storage';
import { playMoveSound, sounds } from '../lib/sound';

const NO_STATS: PuzzleStats = { streak: 0, best: 0 };

const solverWhite = (p: Puzzle) => p.fen.split(' ')[1] === 'w';

/** "Trắng đi, chiếu hết sau 2 nước" */
export function taskText(p: Puzzle) {
  const side = solverWhite(p) ? 'Trắng' : 'Đen';
  return p.goal === 'mate' ? `${side} đi, chiếu hết sau ${mateLength(p)} nước` : `${side} đi và giành ưu thế quyết định`;
}

function levelInfo(level: number) {
  return PUZZLE_LEVELS.find((l) => l.level === level) ?? PUZZLE_LEVELS[0];
}

// =====================================================================================
// Danh sách bài theo cấp độ
// =====================================================================================
export function Puzzles({ level: levelParam }: { level?: string }) {
  const [progress] = useStored<Record<string, PuzzleRecord>>('puzzle-progress', {});
  const [stats] = useStored<PuzzleStats>('puzzle-stats', NO_STATS);
  const next = PUZZLES.find((p) => !progress[p.id]?.solved);
  const fromQuery = Number(levelParam);
  const [active, setActive] = useState(PUZZLE_LEVELS.some((l) => l.level === fromQuery) ? fromQuery : next?.level ?? 1);
  const solved = PUZZLES.filter((p) => progress[p.id]?.solved).length;
  const clean = PUZZLES.filter((p) => progress[p.id]?.clean).length;
  const list = PUZZLES.filter((p) => p.level === active);
  const info = levelInfo(active);

  const choose = (level: number) => {
    setActive(level);
    // đổi địa chỉ mà không phát sự kiện hashchange (không cuộn về đầu trang)
    try {
      window.history.replaceState(null, '', '#/co-the?cap=' + level);
    } catch {
      /* bỏ qua */
    }
  };

  return (
    <div>
      <div className="page-head">
        <h1>🧩 Cờ thế – Giải đố cờ vua</h1>
        <p>
          {PUZZLES.length} thế cờ chọn lọc chia thành 6 cấp độ: từ chiếu hết 1 nước cho người mới học đến những bài sáng tác của Morphy, Loyd và đòn phối hợp 5 nước của các nhà vô địch thế giới. Mọi lời giải đều được máy kiểm chứng là duy nhất – hãy tự tính toán trước khi đi quân!
        </p>
      </div>

      {next && (
        <a className="callout good" style={{ alignItems: 'center', color: 'var(--text)', marginBottom: 18 }} href={href('/co-the/' + next.id)}>
          <span className="ci">{levelInfo(next.level).icon}</span>
          <span style={{ flex: 1 }}>
            <b>{solved ? 'Giải tiếp' : 'Bắt đầu với bài đầu tiên'}:</b> {next.title} <span className="muted">– cấp {next.level} · {taskText(next)}</span>
          </span>
          <span className="btn small primary">Giải ngay →</span>
        </a>
      )}

      <div className="stat-row" style={{ marginBottom: 26 }}>
        <div className="stat">
          <b>
            {solved}/{PUZZLES.length}
          </b>
          <span>bài đã giải</span>
        </div>
        <div className="stat">
          <b>{clean}</b>
          <span>bài giải ngay lần đầu ⭐</span>
        </div>
        <div className="stat">
          <b>{stats.streak}</b>
          <span>chuỗi đúng liên tiếp (kỷ lục {stats.best})</span>
        </div>
      </div>

      <div className="level-grid" role="tablist" aria-label="Cấp độ">
        {PUZZLE_LEVELS.map((l) => {
          const items = PUZZLES.filter((p) => p.level === l.level);
          const done = items.filter((p) => progress[p.id]?.solved).length;
          return (
            <button
              key={l.level}
              role="tab"
              aria-selected={active === l.level}
              className={'level-card' + (active === l.level ? ' active' : '')}
              style={{ ['--lv' as string]: l.color }}
              onClick={() => choose(l.level)}
            >
              <span className="lv-top">
                <span className="lv-icon">{l.icon}</span>
                <span>
                  <span className="lv-no">Cấp {l.level}</span>
                  <b className="lv-name">{l.name}</b>
                </span>
              </span>
              <span className="lv-rating">Elo {l.rating}</span>
              <span className="progress">
                <span style={{ display: 'block', height: '100%', transform: `scaleX(${done / items.length})`, background: 'var(--lv)', borderRadius: 999 }} />
              </span>
              <span className="lv-count">
                {done}/{items.length} bài
              </span>
            </button>
          );
        })}
      </div>

      <div className="cat-banner" style={{ marginTop: 22 }}>
        <span className="ci">{info.icon}</span>
        <div style={{ flex: 1 }}>
          <h2 style={{ margin: 0 }}>
            Cấp {info.level} · {info.name}
          </h2>
          <div className="muted small">{info.description}</div>
        </div>
      </div>

      <div className="puzzle-grid">
        {list.map((p, i) => {
          const rec = progress[p.id];
          return (
            <a key={p.id} className={'puzzle-card' + (rec?.solved ? ' solved' : '')} href={href('/co-the/' + p.id)}>
              <MiniBoard fen={p.fen} orientation={solverWhite(p) ? 'white' : 'black'} label={p.title} />
              <div className="pc-body">
                <div className="small muted">
                  Bài {i + 1}
                  {rec?.clean ? <span className="pc-badge star">⭐ Giải ngay</span> : rec?.solved ? <span className="pc-badge">✓ Đã giải</span> : null}
                </div>
                <h3>{p.title}</h3>
                <div className="pc-task">
                  <img src={solverWhite(p) ? PIECE_SVG.wk : PIECE_SVG.bk} alt="" />
                  {taskText(p)}
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

// =====================================================================================
// Giải một bài
// =====================================================================================
export function PuzzlePage({ id }: { id: string }) {
  const p = puzzleById(id);
  if (!p)
    return (
      <div className="empty-state">
        Không tìm thấy bài cờ thế. <a href={href('/co-the')}>Quay lại danh sách</a>
      </div>
    );
  return <PuzzleSolver key={p.id} puzzle={p} />;
}

type Status = 'play' | 'opponent' | 'solved' | 'revealed';

interface WrongTry {
  uci: string;
  san: string;
  /** Máy đã phân tích xong nước sai chưa */
  checked: boolean;
  reply?: string;
  /** Đối thủ chiếu hết sau N nước (N > 0) */
  mate?: number;
  /** Nước sai vẫn giữ được ưu thế lớn (chỉ là chưa mạnh nhất) */
  stillGood?: boolean;
}

function rebuild(fen: string, ucis: string[]): PlayedLine {
  const pos = new Position(fen);
  const line: PlayedLine = { fens: [pos.fen()], sans: [], ucis: [] };
  for (const u of ucis) {
    const m = pos.moveFromUci(u);
    if (!m) break;
    line.sans.push(pos.moveToSan(m));
    line.ucis.push(u);
    pos.make(m);
    line.fens.push(pos.fen());
  }
  return line;
}

function PuzzleSolver({ puzzle: p }: { puzzle: Puzzle }) {
  const [progress, setProgress] = useStored<Record<string, PuzzleRecord>>('puzzle-progress', {});
  const [, setStats] = useStored<PuzzleStats>('puzzle-stats', NO_STATS);
  const solution = useMemo(() => safeLine(p.solution, p.fen), [p]);
  const [played, setPlayed] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>('play');
  const [wrong, setWrong] = useState<WrongTry | null>(null);
  const [showWrong, setShowWrong] = useState(false);
  const [hintLevel, setHintLevel] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [viewPly, setViewPly] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const [flip, setFlip] = useState(false);
  // lần đầu gặp bài này: chỉ lần đầu mới được tính "giải ngay" và chuỗi đúng liên tiếp
  const firstAttempt = useRef(!progress[p.id]);
  // đã sai hoặc dùng trợ giúp ở lần này (không xóa khi làm lại, để không "ăn gian" huy hiệu ⭐)
  const failed = useRef(false);
  const timers = useRef<number[]>([]);
  const alive = useRef(true);

  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
      timers.current.forEach((t) => clearTimeout(t));
      cancelAnalysis();
    };
  }, []);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(() => alive.current && fn(), ms));
  };

  const game = useMemo(() => rebuild(p.fen, played), [p.fen, played]);
  const reviewing = status === 'solved' || status === 'revealed';
  const reviewLine = status === 'revealed' ? solution : game;
  const fen = game.fens[game.fens.length - 1];
  const expected = solution.ucis[played.length];
  const white = solverWhite(p);
  const orientation = white !== flip ? 'white' : 'black';
  const level = levelInfo(p.level);
  const inLevel = PUZZLES.filter((x) => x.level === p.level);
  const idx = PUZZLES.indexOf(p);
  const prev = PUZZLES[idx - 1];
  const next = PUZZLES[idx + 1];

  const failOnce = () => {
    if (failed.current) return;
    failed.current = true;
    if (firstAttempt.current) setStats((s) => ({ ...s, streak: 0 }));
  };

  const record = (solved: boolean) => {
    const clean = solved && firstAttempt.current && !failed.current;
    setProgress((old) => {
      const r = old[p.id];
      return { ...old, [p.id]: { solved: solved || !!r?.solved, clean: clean || !!r?.clean, tries: (r?.tries ?? 0) + 1, at: Date.now() } };
    });
    if (clean) setStats((s) => ({ streak: s.streak + 1, best: Math.max(s.best, s.streak + 1) }));
    firstAttempt.current = false;
  };

  const finish = (line: string[]) => {
    setStatus('solved');
    setViewPly(line.length);
    later(() => sounds.end(), 250);
    record(true);
  };

  const lastInput = useRef({ key: '', at: 0 });

  function onMove(uci: string) {
    if (status !== 'play') return;
    // bỏ qua sự kiện lặp của cùng một nước đi (trạng thái trong closure chưa kịp cập nhật)
    const key = played.length + uci;
    if (lastInput.current.key === key && Date.now() - lastInput.current.at < 400) return;
    lastInput.current = { key, at: Date.now() };
    const pos = new Position(fen);
    const m = pos.moveFromUci(uci);
    if (!m) return;
    const san = pos.moveToSan(m);
    const mate = isMateMove(fen, uci);
    if (uci === expected || mate) {
      playMoveSound(san);
      const now = [...played, uci];
      setPlayed(now);
      setWrong(null);
      setShowWrong(false);
      setHintLevel(0);
      if (mate || now.length >= solution.ucis.length) {
        finish(now);
        return;
      }
      setStatus('opponent');
      later(() => {
        const reply = solution.ucis[now.length];
        const withReply = [...now, reply];
        playMoveSound(solution.sans[now.length]);
        setPlayed(withReply);
        setStatus('play');
      }, 600);
      return;
    }
    // nước sai: hiện tạm trên bàn cờ rồi trả về
    sounds.error();
    setMistakes((n) => n + 1);
    failOnce();
    const attempt: WrongTry = { uci, san, checked: false };
    setWrong(attempt);
    setShowWrong(true);
    later(() => setShowWrong(false), 1100);
    pos.make(m);
    const after = pos.fen();
    if (pos.status().over) {
      setWrong({ ...attempt, checked: true, stillGood: false });
      return;
    }
    requestAnalysis(after, [], { multiPV: 1, timeMs: 700, channel: 'puzzle' }).then((r) => {
      const l = r?.lines[0];
      if (!alive.current || !l) return;
      setWrong((w) =>
        w && w.uci === uci
          ? { ...w, checked: true, reply: l.san, mate: l.mate > 0 ? l.mate : undefined, stillGood: l.mate < 0 || l.score <= -300 }
          : w,
      );
    });
  }

  function reveal() {
    failOnce();
    record(false);
    setStatus('revealed');
    setShowWrong(false);
    setViewPly(played.length);
    setAutoPlay(true);
  }

  function retry() {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
    setPlayed([]);
    setStatus('play');
    setWrong(null);
    setShowWrong(false);
    setHintLevel(0);
    setHintsUsed(false);
    setMistakes(0);
    setAutoPlay(false);
  }

  // xem lời giải: tự chạy từng nước tới cuối
  useEffect(() => {
    if (!autoPlay) return;
    if (viewPly >= solution.ucis.length) {
      setAutoPlay(false);
      return;
    }
    const t = window.setTimeout(() => {
      playMoveSound(solution.sans[viewPly]);
      setViewPly((v) => v + 1);
    }, 850);
    return () => clearTimeout(t);
  }, [autoPlay, viewPly, solution]);

  // phím ← → khi xem lại
  useEffect(() => {
    if (!reviewing) return;
    const on = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')) return;
      if (e.key === 'ArrowRight') setViewPly((v) => Math.min(reviewLine.ucis.length, v + 1));
      else if (e.key === 'ArrowLeft') setViewPly((v) => Math.max(0, v - 1));
      else return;
      setAutoPlay(false);
      e.preventDefault();
    };
    window.addEventListener('keydown', on);
    return () => window.removeEventListener('keydown', on);
  }, [reviewing, reviewLine]);

  // ---- bàn cờ ----
  const shownPly = reviewing ? Math.min(viewPly, reviewLine.ucis.length) : played.length;
  const wrongFen = useMemo(() => {
    if (!wrong || !showWrong) return null;
    const pos = new Position(fen);
    const m = pos.moveFromUci(wrong.uci);
    if (!m) return null;
    pos.make(m);
    return pos.fen();
  }, [wrong, showWrong, fen]);
  const boardFen = reviewing ? reviewLine.fens[shownPly] : wrongFen ?? fen;
  const lastMove = reviewing ? (shownPly > 0 ? reviewLine.ucis[shownPly - 1] : null) : wrongFen ? wrong!.uci : played[played.length - 1] ?? null;
  const arrows: BoardArrow[] = [];
  const highlights: Record<string, string> = {};
  if (status === 'play' && expected && !wrongFen) {
    if (hintLevel >= 2) highlights[expected.slice(0, 2)] = 'green';
    if (hintLevel >= 3) arrows.push({ from: expected.slice(0, 2), to: expected.slice(2, 4), color: 'green' });
  }
  let badge: SquareBadge | null = null;
  if (wrongFen && wrong) badge = { square: wrong.uci.slice(2, 4), text: '✗', color: '#c0262d' };
  else if (!reviewing && played.length % 2 === 1) badge = { square: played[played.length - 1].slice(2, 4), text: '✓', color: '#2f7d55' };
  else if (status === 'solved' && shownPly === reviewLine.ucis.length && shownPly > 0) badge = { square: reviewLine.ucis[shownPly - 1].slice(2, 4), text: '✓', color: '#2f7d55' };

  const purpose = useMovePurpose(reviewLine, shownPly);
  const lastSolverPly = played.length % 2 === 0 ? played.length - 1 : played.length;

  // ---- lời dẫn ----
  let guide: React.ReactNode;
  if (reviewing) {
    const done = shownPly === reviewLine.ucis.length;
    const noteIdx = shownPly - 1;
    const note = noteIdx >= 0 && reviewLine.ucis[noteIdx] === solution.ucis[noteIdx] ? p.notes?.[noteIdx] : undefined;
    guide =
      shownPly === 0 ? (
        <>
          <div className="guide-head">
            <b>🎯 {taskText(p)}</b>
          </div>
          <span className="muted">Bấm ▶ (hoặc phím →) để xem lại từng nước của lời giải.</span>
        </>
      ) : (
        <>
          <div className="guide-head">
            <b>
              {moveLabel(p.fen, noteIdx)} <San san={reviewLine.sans[noteIdx]} white={(noteIdx % 2 === 0) === white} />
            </b>
            {noteIdx % 2 === 0 ? <span className="tag green">Nước giải</span> : <span className="tag">Đối thủ đáp</span>}
          </div>
          {note?.trim() ? <RichText text={note} /> : <PurposeText text={purpose} />}
          {done && status === 'solved' && (
            <div className="callout good" style={{ marginTop: 8 }}>
              <span className="ci">🎉</span>
              <span>
                <b>Giải xong!</b>{' '}
                {mistakes === 0 && !hintsUsed
                  ? 'Bạn tìm ra lời giải mà không sai nước nào.'
                  : `Bạn đã giải được${mistakes ? ` sau ${mistakes} lần đi sai` : ''}${hintsUsed ? ' (có dùng gợi ý)' : ''}.`}{' '}
                Đọc lời giải thích bên dưới.
              </span>
            </div>
          )}
        </>
      );
  } else if (wrong) {
    guide = (
      <>
        <div className="guide-head">
          <b className="txt-danger">
            ✗ <San san={wrong.san} white={white} /> chưa phải nước đúng
          </b>
        </div>
        {!wrong.checked ? (
          <span className="muted">Thầy Cú đang xem vì sao…</span>
        ) : wrong.stillGood ? (
          <span>Nước này không tệ, nhưng chưa phải {p.goal === 'mate' ? 'con đường chiếu hết đúng số nước' : 'đòn mạnh nhất'}. Hãy tìm nước quyết liệt hơn!</span>
        ) : wrong.reply ? (
          <span>
            Đối thủ sẽ đáp lại bằng <San san={wrong.reply} white={!white} />
            {wrong.mate ? <> và chiếu hết bạn sau {wrong.mate} nước</> : null}. Hãy thử lại!
          </span>
        ) : (
          <span>Hãy thử lại!</span>
        )}
      </>
    );
  } else if (played.length === 0) {
    guide = (
      <>
        <div className="guide-head">
          <b>🎯 Tìm nước đi mạnh nhất</b>
        </div>
        <span className="muted">
          Hãy tính toán trọn vẹn đòn đánh và các nước đáp của đối thủ trước khi đi quân. Kéo thả hoặc bấm vào quân để đi.
        </span>
      </>
    );
  } else {
    const note = p.notes?.[lastSolverPly - 1];
    guide = (
      <>
        <div className="guide-head">
          <b className="txt-good">
            ✓ <San san={game.sans[lastSolverPly - 1]} white={white} /> – chính xác!
          </b>
        </div>
        {note?.trim() && <RichText text={note} />}
        {status === 'opponent' ? (
          <span className="muted">Đối thủ đang suy nghĩ…</span>
        ) : (
          <span>
            Đối thủ đáp <San san={game.sans[played.length - 1]} white={!white} />. Tiếp tục nào!
          </span>
        )}
      </>
    );
  }

  const rec = progress[p.id];

  return (
    <div>
      <div className="breadcrumb">
        <a href={href('/co-the')}>Cờ thế</a> › <a href={href('/co-the?cap=' + p.level)}>Cấp {p.level} · {level.name}</a> › {p.title}
      </div>
      <div className="stage-head">
        <div>
          <h1>{p.title}</h1>
          <div className="meta">
            <span className="tag" style={{ borderColor: level.color, color: level.color }}>
              {level.icon} Cấp {p.level} · {level.name}
            </span>
            <span className="tag">
              Bài {inLevel.indexOf(p) + 1}/{inLevel.length}
            </span>
            {rec?.clean ? <span className="tag green">⭐ Đã giải ngay lần đầu</span> : rec?.solved ? <span className="tag green">✓ Đã giải</span> : null}
          </div>
        </div>
        {p.source && <div className="stage-head-side small muted">{p.source}</div>}
      </div>

      <div className="stage">
        <div className="stage-board">
          <Board
            fen={boardFen}
            orientation={orientation}
            movable={status === 'play' && !wrongFen ? (white ? 'white' : 'black') : 'none'}
            onMove={onMove}
            lastMove={lastMove}
            arrows={arrows}
            highlights={highlights}
            badge={badge}
          />
        </div>
        <div className="stage-panel">
          <div className="puzzle-task">
            <img src={white ? PIECE_SVG.wk : PIECE_SVG.bk} alt="" />
            <div>
              <b>{taskText(p)}</b>
              <div className="small muted">
                {status === 'solved' ? 'Đã giải xong' : status === 'revealed' ? 'Đã xem lời giải' : status === 'opponent' ? 'Đối thủ đang đi…' : 'Đến lượt bạn'}
                {mistakes > 0 && ` · ${mistakes} lần đi sai`}
              </div>
            </div>
          </div>
          <GuideBox stepKey={reviewing ? 'r' + shownPly : (wrong ? 'w' + wrong.uci + wrong.checked : 'p' + played.length) + status}>{guide}</GuideBox>
          {!reviewing && hintLevel > 0 && (
            <div className="callout tip puzzle-hint">
              <span className="ci">💡</span>
              <span>
                {p.hint}
                {hintLevel >= 2 && <span className="muted"> {hintLevel >= 3 ? 'Mũi tên xanh chỉ nước đi.' : 'Ô xanh là quân cần đi.'}</span>}
              </span>
            </div>
          )}
          {reviewing ? (
            <StepControls
              ply={shownPly}
              count={reviewLine.ucis.length}
              setPly={(v) => {
                setAutoPlay(false);
                setViewPly(Math.max(0, Math.min(reviewLine.ucis.length, v)));
              }}
              extra={
                <>
                  <button className="btn small" onClick={retry} title="Giải lại từ đầu">
                    ↺
                  </button>
                  <button className="btn small" onClick={() => setFlip(!flip)} title="Lật bàn cờ">
                    🔄
                  </button>
                </>
              }
            />
          ) : (
            <div className="puzzle-actions">
              <button className="btn small" onClick={() => {
                  failOnce();
                  setHintsUsed(true);
                  setHintLevel(Math.min(3, hintLevel + 1));
                }} disabled={status !== 'play' || hintLevel >= 3}>
                💡 {hintLevel === 0 ? 'Gợi ý' : hintLevel === 1 ? 'Chỉ quân cần đi' : 'Chỉ nước đi'}
              </button>
              <button className="btn small" onClick={reveal} disabled={status === 'opponent'}>
                👀 Xem lời giải
              </button>
              <button className="btn small" onClick={retry} disabled={!played.length && !wrong} title="Làm lại từ đầu">
                ↺ Làm lại
              </button>
              <button className="btn small" onClick={() => setFlip(!flip)} title="Lật bàn cờ">
                🔄
              </button>
            </div>
          )}
          <MoveList
            sans={reviewing ? reviewLine.sans : game.sans}
            startFen={p.fen}
            current={shownPly - 1}
            onSelect={
              reviewing
                ? (i) => {
                    setAutoPlay(false);
                    setViewPly(i + 1);
                  }
                : undefined
            }
          />
          <div className="puzzle-nav">
            {prev ? (
              <a className="btn small ghost" href={href('/co-the/' + prev.id)}>
                ← Bài trước
              </a>
            ) : (
              <span />
            )}
            {next && (
              <a className={'btn small' + (status === 'solved' ? ' primary' : '')} href={href('/co-the/' + next.id)}>
                {next.level !== p.level ? `Lên cấp ${next.level} →` : 'Bài tiếp →'}
              </a>
            )}
          </div>
        </div>
      </div>

      {reviewing && (
        <section className="knowledge">
          <h2>📖 Lời giải thích</h2>
          <div className="card">
            <RichText text={p.explanation} />
            <div className="tag-row" style={{ marginTop: 10 }}>
              {p.themes.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
            {p.gameId && (
              <p className="small" style={{ margin: '12px 0 0' }}>
                <a href={href('/van-co/' + p.gameId)}>🏆 Xem toàn bộ ván {p.source} kèm lời bình →</a>
              </p>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
