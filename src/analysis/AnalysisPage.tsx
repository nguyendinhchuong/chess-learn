// Phân tích ván (#/phong/phan-tich, #/co-tuong/phong/phan-tich): nhập biên bản PGN (dán, chọn tệp, hoặc ván đã chơi
// ở mục "Chơi với bạn"), máy phân tích từng thế cờ rồi tổng kết cho CẢ HAI bên: độ chính xác, bước ngoặt,
// điểm mạnh, bài học rút ra kèm ví dụ trong ván và bài nên ôn.
import { DragEvent, ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowCounterClockwise,
  ArrowLeft,
  CaretLeft,
  CaretRight,
  ChartLineUp,
  DownloadSimple,
  FileArrowUp,
  SkipBack,
  SkipForward,
  Trash,
} from '@phosphor-icons/react';
import { href } from '../lib/router';
import { ClassSymbol, MoveMark, RichText } from '../components/common';
import type { BoardArrow } from '../components/Board';
import { CLASS_INFO, type MoveClass } from '../engine/coach';
import type { AnalysisResult } from '../engine/protocol';
import type { Side } from '../online/protocol';
import type { AnalysisKit } from './kit';
import { analysisKey, downloadText, endDetail, loadAnalysis, openAnalysis, rememberGame, roomOf, saveAnalysis, slim, useCurrentGame, useGameHistory, type SavedGame } from './history';
import { hashText, isSheetError, parseSheet, sheetFileName, type ParsedSheet } from './sheet';
import { assignPhases, buildReport, moveNo, PHASE_NAME, PHASES, type GameReport, type SideReport } from './report';
import type { Finding, MoveInsight, ReplayedGame, Review } from './types';
import { GRAPH_MARKED, WinGraph } from './WinGraph';

/** Thời gian máy nghĩ cho mỗi thế cờ */
const TIME_MS = 1000;
const ERROR_CLASSES: MoveClass[] = ['inaccuracy', 'mistake', 'blunder', 'miss'];

export function GameAnalysis({ kit }: { kit: AnalysisKit }) {
  const [game] = useCurrentGame(kit.online.variant);
  const [importing, setImporting] = useState(false);
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [game?.id, importing]);
  if (!game || importing) return <ImportScreen kit={kit} onLoaded={() => setImporting(false)} onBack={game ? () => setImporting(false) : undefined} />;
  return <AnalysisScreen key={game.id + game.pgn.length} kit={kit} game={game} onImport={() => setImporting(true)} />;
}

// =====================================================================================
// Nhập biên bản
// =====================================================================================
const SOURCE_LABEL: Record<SavedGame['source'], string> = { online: 'Chơi với bạn', local: 'Đấu hai người', import: 'Đã nhập' };

const PARSE_ERROR: Record<string, string> = {
  empty: 'Chưa có nội dung. Hãy dán biên bản PGN hoặc chọn tệp .pgn.',
  'no-moves': 'Biên bản không có nước đi nào.',
  variant: 'Biên bản này là một biến thể cờ khác mà Kỳ Đạo chưa hỗ trợ.',
};

function ImportScreen({ kit, onLoaded, onBack }: { kit: AnalysisKit; onLoaded: () => void; onBack?: () => void }) {
  const { online } = kit;
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [drag, setDrag] = useState(false);
  const [history, setHistory] = useGameHistory();
  const fileRef = useRef<HTMLInputElement>(null);
  const mine = history.filter((g) => g.variant === online.variant);
  const other = history.length - mine.length;
  const sample = useMemo(() => kit.sample(), [kit]);
  const pick = (g: SavedGame) => {
    onLoaded();
    openAnalysis(g);
  };

  function load(raw: string) {
    const p = parseSheet(raw);
    if (isSheetError(p)) {
      setError(PARSE_ERROR[p.error] + (p.detail ? ` (${p.detail})` : ''));
      return;
    }
    const game: SavedGame = {
      id: 'import-' + hashText(raw),
      variant: p.variant,
      pgn: raw,
      players: p.players,
      result: p.result,
      you: null,
      plies: p.tokens.length,
      savedAt: Date.now(),
      source: 'import',
    };
    if (p.variant === online.variant) {
      const r = kit.engine.replay(p.tokens, p.startFen);
      if (r.error) {
        setError(
          r.error.token === 'FEN'
            ? 'Thế cờ bắt đầu (thẻ FEN) không hợp lệ.'
            : `Không đọc được nước ${moveNo(r.error.index)} “${r.error.token}”: nước này không hợp lệ trong thế cờ lúc đó. Hãy kiểm tra lại biên bản.`,
        );
        return;
      }
    }
    setError(null);
    rememberGame(game);
    // biên bản của môn cờ kia: openAnalysis chuyển sang đúng trang
    pick(game);
  }

  async function pickFile(f: File | undefined) {
    if (!f) return;
    if (f.size > 2_000_000) {
      setError('Tệp quá lớn (trên 2 MB). Hãy chọn tệp biên bản của một ván cờ.');
      return;
    }
    const t = await f.text();
    setText(t);
    load(t);
  }

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDrag(false);
    void pickFile(e.dataTransfer.files[0]);
  };

  return (
    <div className="an-import">
      <div className="breadcrumb">
        <a href={href(`${online.base}/phong`)}>Chơi với bạn</a> › Phân tích ván
      </div>
      <div className="page-head">
        <h1>📊 Phân tích ván {online.title}</h1>
        <p>
          Nhập biên bản ván đấu (tệp .pgn tải từ phòng chơi, hoặc PGN từ trang cờ khác). Máy chấm từng nước của cả hai bên, chỉ ra bước ngoặt và rút ra bài học
          cụ thể cho từng người.
        </p>
      </div>

      <div className="grid cols-2 an-import-grid">
        <div className={'card an-drop' + (drag ? ' drag' : '')} onDragOver={(e) => (e.preventDefault(), setDrag(true))} onDragLeave={() => setDrag(false)} onDrop={onDrop}>
          <h3>Dán hoặc chọn biên bản</h3>
          <textarea
            className="text-input an-paste"
            value={text}
            placeholder={online.variant === 'chess' ? '[White "An"]\n[Black "Bình"]\n\n1. e4 e5 2. Nf3 Nc6 …' : '[Red "An"]\n[Black "Bình"]\n\n1. P2-5 M8.7 2. M2.3 X9-8 …'}
            aria-label="Nội dung biên bản PGN"
            spellCheck={false}
            onChange={(e) => {
              setText(e.target.value);
              setError(null);
            }}
          />
          {error && (
            <div className="callout warn" role="alert">
              <span className="ci">⚠️</span>
              <span>{error}</span>
            </div>
          )}
          <div className="btn-row">
            <button className="btn primary" onClick={() => load(text)} disabled={!text.trim()}>
              <ChartLineUp size={16} weight="bold" aria-hidden="true" />
              Phân tích ván này
            </button>
            <button className="btn" onClick={() => fileRef.current?.click()}>
              <FileArrowUp size={16} weight="bold" aria-hidden="true" />
              Chọn tệp .pgn
            </button>
            <input ref={fileRef} type="file" accept=".pgn,.txt,text/plain,application/x-chess-pgn" hidden onChange={(e) => void pickFile(e.target.files?.[0])} />
            {onBack && (
              <button className="btn ghost" onClick={onBack}>
                Quay lại ván đang xem
              </button>
            )}
          </div>
          <p className="small muted" style={{ margin: 0 }}>
            {online.variant === 'chess'
              ? 'Đọc được PGN chuẩn (SAN) kèm đồng hồ [%clk] của lichess, chess.com.'
              : 'Đọc được ký hiệu Việt Nam (P2-5), chữ Hán (炮二平五) và tọa độ ICCS (H2-E2).'}{' '}
            Có thể kéo thả tệp vào ô này.
          </p>
        </div>

        <div className="card an-history">
          <h3>Ván đã chơi gần đây</h3>
          {mine.length ? (
            <ul className="an-games">
              {mine.map((g) => (
                <li key={g.id}>
                  <button className="an-game" onClick={() => pick(g)}>
                    <span className="an-game-names">
                      <b>{g.players[0]}</b>
                      <span className="an-score">{g.result.replace(/1\/2/g, '½')}</span>
                      <b>{g.players[1]}</b>
                    </span>
                    <span className="small muted">
                      {SOURCE_LABEL[g.source]} · {Math.ceil(g.plies / 2)} nước · {new Date(g.savedAt).toLocaleDateString('vi-VN')}
                      {g.you !== null && ` · bạn cầm ${online.sideNames[g.you]}`}
                    </span>
                  </button>
                  <button className="icon-btn" title="Tải biên bản" aria-label={`Tải biên bản ${g.players[0]} – ${g.players[1]}`} onClick={() => downloadText(g.pgn, sheetFileName(g.variant, g.players, new Date(g.savedAt)))}>
                    <DownloadSimple size={16} />
                  </button>
                  <button className="icon-btn" title="Xóa khỏi danh sách" aria-label={`Xóa ván ${g.players[0]} – ${g.players[1]} khỏi danh sách`} onClick={() => setHistory((old) => old.filter((x) => x.id !== g.id))}>
                    <Trash size={16} />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="an-empty">
              <p className="muted" style={{ marginTop: 0 }}>
                Chưa có ván nào. Chơi xong một ván ở mục{' '}
                <a href={href(`${online.base}/phong`)}>Chơi với bạn</a>, ván cờ sẽ tự lưu ở đây để phân tích.
              </p>
              {sample && (
                <>
                  <button className="btn" onClick={() => (rememberGame(sample), pick(sample))}>
                    ✨ Thử với một ván mẫu
                  </button>
                  <p className="small muted" style={{ margin: '8px 0 0' }}>
                    Ván kinh điển {sample.players[0]} – {sample.players[1]} trong thư viện.
                  </p>
                </>
              )}
            </div>
          )}
          {other > 0 && (
            <p className="small muted" style={{ marginBottom: 0 }}>
              Còn {other} ván {online.variant === 'chess' ? 'cờ tướng' : 'cờ vua'} ở{' '}
              <a href={href(`${online.variant === 'chess' ? '/co-tuong' : ''}/phong/phan-tich`)}>trang phân tích {online.variant === 'chess' ? 'cờ tướng' : 'cờ vua'}</a>.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// =====================================================================================
// Màn phân tích
// =====================================================================================
function AnalysisScreen({ kit, game, onImport }: { kit: AnalysisKit; game: SavedGame; onImport: () => void }) {
  const parsed = useMemo(() => parseSheet(game.pgn), [game.pgn]);
  const line = useMemo(() => (isSheetError(parsed) ? null : kit.engine.replay(parsed.tokens, parsed.startFen)), [parsed, kit]);
  if (isSheetError(parsed) || !line || line.error || !line.ucis.length) {
    return (
      <div className="empty-state">
        <h2>Không mở được ván này</h2>
        <p className="muted">
          {line?.error ? `Nước ${moveNo(line.error.index)} “${line.error.token}” không hợp lệ.` : 'Biên bản không có nước đi hợp lệ.'} Hãy nhập lại biên bản.
        </p>
        <button className="btn primary" onClick={onImport}>
          Nhập biên bản khác
        </button>
      </div>
    );
  }
  return <GameReview kit={kit} game={game} parsed={parsed} line={line} onImport={onImport} />;
}

interface Item {
  review: Review;
  insight: MoveInsight;
}

function GameReview({ kit, game, parsed, line, onImport }: { kit: AnalysisKit; game: SavedGame; parsed: ParsedSheet; line: ReplayedGame; onImport: () => void }) {
  const { engine, online } = kit;
  const N = line.ucis.length;
  const startFen = line.fens[0];
  const firstSide: Side = startFen.split(' ')[1] === 'b' ? 1 : 0;
  const colorOf = (i: number) => ((i + firstSide) % 2) as Side;
  const names = online.sideNames;
  const players = parsed.players;
  const key = useMemo(() => analysisKey(online.variant, startFen, line.ucis, TIME_MS), [online.variant, startFen, line.ucis]);
  const final = useMemo(() => engine.terminal(line.fens[N]), [engine, line, N]);

  // ---- phân tích lần lượt từng thế cờ (đã có trong bộ nhớ đệm thì bỏ qua) ----
  const [results, setResults] = useState<(AnalysisResult | null)[]>(() => loadAnalysis(key, N + 1));
  const [failed, setFailed] = useState(false);
  const resultsRef = useRef(results);
  resultsRef.current = results;
  useEffect(() => {
    let alive = true;
    const acc = resultsRef.current.slice();
    (async () => {
      let unsaved = 0;
      for (let i = 0; i <= N; i++) {
        if (acc[i] || (i === N && final)) continue;
        let r: AnalysisResult | null = null;
        for (let attempt = 0; attempt < 2 && !r; attempt++) {
          r = await kit.analyze(startFen, line.ucis.slice(0, i), TIME_MS).catch(() => null);
          if (!alive) return;
        }
        if (!r) {
          setFailed(true);
          continue;
        }
        acc[i] = slim(r);
        setResults(acc.slice());
        if (++unsaved >= 6) {
          saveAnalysis(key, acc);
          unsaved = 0;
        }
      }
      if (unsaved) saveAnalysis(key, acc);
    })();
    return () => {
      alive = false;
      kit.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const done = results.filter(Boolean).length + (final ? 1 : 0);
  const progress = done / (N + 1);

  // ---- dữ liệu dẫn xuất ----
  const wins = useMemo(
    () => results.map((r, i) => (r ? engine.firstWin(r) : i === N && final ? (final.result === '1-0' ? 100 : final.result === '0-1' ? 0 : 50) : null)),
    [results, engine, N, final],
  );
  const openings = useMemo(() => {
    let name: string | undefined;
    return line.fens.map((f, i) => (i ? (name = engine.openingAt(f) ?? name) : undefined));
  }, [line, engine]);
  const opening = openings[N];
  const bookEnd = useMemo(() => {
    const k = line.ucis.findIndex((u, i) => !engine.isBook(line.fens[i], u));
    return k < 0 ? N : k;
  }, [line, engine, N]);
  const phases = useMemo(() => assignPhases(line.fens.slice(0, N).map(engine.pieceCount), bookEnd, engine.phaseLimits), [line, engine, N, bookEnd]);

  const cache = useRef(new Map<number, Item>());
  const items = useMemo(
    () =>
      line.ucis.map((_, i): Item | null => {
        const hit = cache.current.get(i);
        if (hit) return hit;
        const before = results[i];
        const after = results[i + 1];
        if (!before || (!after && !(i + 1 === N && final))) return null;
        const review = engine.review(line.fens, line.ucis, i, before, after ?? null, openings[i + 1]);
        const item = { review, insight: engine.insight(line.fens, line.ucis, i, review, before, after ?? null) };
        cache.current.set(i, item);
        return item;
      }),
    [results, line, engine, N, final, openings],
  );
  const ready = items.every(Boolean);
  const reviews = useMemo(() => items.map((x) => x?.review ?? null), [items]);

  const reason = parsed.reason ?? final?.reason ?? null;
  const reasonText = reason ? endDetail({ result: parsed.result === '*' ? null : parsed.result, reason }, online) : undefined;
  const report: GameReport | null = useMemo(() => {
    if (!ready) return null;
    const rs = items.map((x) => x!.review);
    return buildReport(
      {
        sideNames: names,
        players,
        kingName: kit.kingName,
        reviews: rs,
        insights: items.map((x) => x!.insight),
        wins: wins.map((w) => w ?? 50),
        phases,
        result: parsed.result,
        reason,
        reasonText,
        clocks: parsed.clocks,
        time: parsed.time,
        opening,
        bookEnd,
        habits: engine.habits(line.fens, line.ucis, rs),
        links: engine.links,
      },
      online.variant,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  // ---- điều khiển ----
  const [ply, setPly] = useState(0);
  const [bottom, setBottom] = useState<Side>(game.you ?? 0);
  const [tab, setTab] = useState<Side>(game.you ?? 0);
  const boardRef = useRef<HTMLDivElement>(null);
  const go = (p: number) => setPly(Math.max(0, Math.min(N, p)));
  /** Nhảy tới thế cờ sau nước `i` và đưa bàn cờ vào tầm nhìn */
  const jump = (i: number) => {
    go(i + 1);
    const el = boardRef.current;
    if (el) {
      const r = el.getBoundingClientRect();
      if (r.top < 0 || r.bottom > window.innerHeight) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };
  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (e.defaultPrevented || (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA'))) return;
      if (e.key === 'ArrowLeft') setPly((p) => Math.max(0, p - 1));
      else if (e.key === 'ArrowRight') setPly((p) => Math.min(N, p + 1));
      else return;
      e.preventDefault();
    };
    window.addEventListener('keydown', on);
    return () => window.removeEventListener('keydown', on);
  }, [N]);

  const item = ply > 0 ? items[ply - 1] : null;
  const r = item?.review ?? null;
  const arrows: BoardArrow[] = [];
  if (r && r.cls !== 'book') {
    if (r.best && r.best.uci !== r.uci && r.cls !== 'best') arrows.push({ from: r.best.uci.slice(0, 2), to: r.best.uci.slice(2, 4), color: 'green' });
    if (r.refutation && ['mistake', 'blunder', 'miss', 'inaccuracy'].includes(r.cls)) arrows.push({ from: r.refutation.uci.slice(0, 2), to: r.refutation.uci.slice(2, 4), color: 'red', opacity: 0.75 });
  }
  const badge = r ? { square: r.uci.slice(2, 4), text: <ClassSymbol cls={r.cls} />, color: CLASS_INFO[r.cls].color } : null;
  const marks: (MoveMark | null)[] = reviews.map((x) =>
    x && x.cls !== 'good' && x.cls !== 'excellent' && x.cls !== 'best' ? { symbol: <ClassSymbol cls={x.cls} />, color: CLASS_INFO[x.cls].color, title: CLASS_INFO[x.cls].label } : null,
  );
  const labelOf = (pos: number) => (pos > 0 ? `${moveNo(pos - 1)} ${line.sans[pos - 1]}${reviews[pos - 1] ? ' · ' + CLASS_INFO[reviews[pos - 1]!.cls].label : ''}` : 'Bắt đầu');
  const phaseStarts = (['middlegame', 'endgame'] as const)
    .map((p) => ({ index: phases.indexOf(p), label: PHASE_NAME[p] }))
    // giai đoạn chỉ gồm một hai nước cuối thì không đáng đánh dấu
    .filter((p) => p.index > 0 && p.index < N - 2);

  /** Đồng hồ của bên `s` tại thế sau `pos` nước */
  const clockAt = (s: Side, pos: number) => {
    if (!parsed.clocks.length || !parsed.time) return null;
    for (let j = pos - 1; j >= 0; j--) if (colorOf(j) === s) return parsed.clocks[j];
    return parsed.time.initial;
  };

  const resultText = parsed.result === '1-0' ? `${names[0]} thắng` : parsed.result === '0-1' ? `${names[1]} thắng` : parsed.result === '1/2-1/2' ? 'Hòa' : 'Chưa kết thúc';
  const date = parsed.headers.Date && /^\d{4}\.\d{2}\.\d{2}$/.test(parsed.headers.Date) ? parsed.headers.Date.split('.').reverse().join('/') : null;
  const fileName = sheetFileName(online.variant, players, new Date(game.savedAt));
  const room = roomOf(game);

  const strip = (s: Side) => {
    const sr = report?.sides[s];
    const clock = clockAt(s, ply);
    return (
      <div className="player-strip online-strip an-strip">
        <div className="pa">
          <online.SideIcon side={s} />
        </div>
        <div className="ps-main">
          <div className="pn">
            <span className="pn-name">{players[s]}</span>
            {game.you === s && <span className="tag">Bạn</span>}
          </div>
          <div className="ps">
            {names[s]}
            {sr?.accuracy != null && ` · độ chính xác ${Math.round(sr.accuracy)}%`}
          </div>
        </div>
        {clock !== null && <div className="clock">{formatClock(clock)}</div>}
      </div>
    );
  };

  return (
    <div className="an-page">
      <div className="breadcrumb">
        <a href={href(`${online.base}/phong`)}>Chơi với bạn</a> ›{' '}
        {room && (
          <>
            <a href={href(`${online.base}/phong/${room}`)}>Phòng {room}</a> ›{' '}
          </>
        )}
        Phân tích ván
      </div>
      <div className="an-head">
        <div>
          <h1>
            {players[0]} <span className="an-score">{parsed.result.replace(/1\/2/g, '½')}</span> {players[1]}
          </h1>
          <p className="muted">
            {resultText}
            {reasonText ? ` · ${reasonText}` : ''} · {Math.ceil(N / 2)} nước
            {parsed.time ? ` · ${Math.round(parsed.time.initial / 60_000)}+${Math.round(parsed.time.increment / 1000)}` : ''}
            {date ? ` · ${date}` : ''}
            {opening ? ` · ${opening}` : ''}
          </p>
        </div>
        <div className="btn-row">
          {room && (
            <a className="btn small primary" href={href(`${online.base}/phong/${room}`)}>
              <ArrowLeft size={16} weight="bold" aria-hidden="true" />
              Quay lại phòng
            </a>
          )}
          <button className="btn small" onClick={() => downloadText(game.pgn, fileName)}>
            <DownloadSimple size={16} weight="bold" aria-hidden="true" />
            Tải biên bản
          </button>
          <button className="btn small" onClick={onImport}>
            <FileArrowUp size={16} weight="bold" aria-hidden="true" />
            Nhập ván khác
          </button>
        </div>
      </div>

      {progress < 1 && (
        <div className="card an-progress" role="status" aria-live="polite">
          <div className="an-progress-row">
            <span>
              🦉 Thầy Cú đang phân tích thế cờ {Math.min(done + 1, N + 1)}/{N + 1}
            </span>
            <span className="muted small">còn khoảng {Math.max(1, Math.round(((N + 1 - done) * (TIME_MS + 80)) / 1000))} giây</span>
          </div>
          <div className="progress">
            <div style={{ transform: `scaleX(${progress})` }} />
          </div>
          <p className="small muted" style={{ margin: 0 }}>
            Bạn có thể xem lại từng nước ngay trong lúc chờ; bản tổng kết hiện ra khi phân tích xong.
          </p>
        </div>
      )}
      {failed && progress < 1 && (
        <div className="callout warn" role="alert">
          <span className="ci">⚠️</span>
          <span>Có thế cờ chưa phân tích được. Hãy tải lại trang để thử lại.</span>
        </div>
      )}

      <div className="play">
        <div className="play-board-col" ref={boardRef}>
          {strip((bottom ^ 1) as Side)}
          <div className="board-wrap">
            <kit.Board fen={line.fens[ply]} bottom={bottom} lastMove={ply > 0 ? line.ucis[ply - 1] : null} arrows={arrows} badge={badge} />
          </div>
          {strip(bottom)}
          <div className="controls-bar">
            <button className="btn small" onClick={() => go(0)} disabled={ply === 0} title="Về đầu ván" aria-label="Về đầu ván">
              <SkipBack size={16} weight="fill" aria-hidden="true" />
            </button>
            <button className="btn small" onClick={() => go(ply - 1)} disabled={ply === 0} title="Nước trước (←)" aria-label="Nước trước">
              <CaretLeft size={16} weight="fill" aria-hidden="true" />
            </button>
            <button className="btn small" onClick={() => go(ply + 1)} disabled={ply === N} title="Nước sau (→)" aria-label="Nước sau">
              <CaretRight size={16} weight="fill" aria-hidden="true" />
            </button>
            <button className="btn small" onClick={() => go(N)} disabled={ply === N} title="Tới cuối ván" aria-label="Tới cuối ván">
              <SkipForward size={16} weight="fill" aria-hidden="true" />
            </button>
            <button className="btn small" onClick={() => setBottom((b) => (b ^ 1) as Side)}>
              <ArrowCounterClockwise size={16} weight="bold" aria-hidden="true" />
              Lật bàn
            </button>
          </div>
          <div className="legend" style={{ justifyContent: 'center' }}>
            <span>
              <i style={{ background: '#15781b' }} /> Nước nên đi
            </span>
            <span>
              <i style={{ background: '#c0262d' }} /> Đối thủ có thể đáp
            </span>
          </div>
        </div>

        <div className="coach-panel">
          <div className="coach-card">
            <h4>📈 Diễn biến cơ hội thắng</h4>
            <WinGraph
              wins={wins}
              marks={reviews.flatMap((x) => (x && GRAPH_MARKED.includes(x.cls) ? [{ ply: x.ply, cls: x.cls }] : []))}
              current={ply}
              onSelect={go}
              sideNames={names}
              phaseStarts={phaseStarts}
              labelOf={labelOf}
              xq={online.variant === 'xiangqi'}
            />
          </div>

          <MoveCard kit={kit} ply={ply} item={item} result={results[ply]} phase={ply > 0 ? phases[ply - 1] : null} players={players} />

          <div className="coach-card">
            <h4>📜 Biên bản</h4>
            <kit.MoveList sans={line.sans} startFen={startFen} current={ply - 1} onSelect={(i) => go(i + 1)} marks={marks} />
          </div>
        </div>
      </div>

      {report ? (
        <ReportView kit={kit} report={report} players={players} you={game.you} tab={tab} setTab={setTab} reviews={reviews as Review[]} onJump={jump} />
      ) : (
        <div className="an-report an-skeleton" aria-hidden="true">
          <div className="an-skel-block" />
          <div className="an-skel-row">
            <div className="an-skel-block" />
            <div className="an-skel-block" />
          </div>
        </div>
      )}
    </div>
  );
}

function formatClock(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = String(total % 60).padStart(2, '0');
  return h ? `${h}:${String(m).padStart(2, '0')}:${s}` : `${m}:${s}`;
}

/** Nhận xét nước đang xem */
function MoveCard({ kit, ply, item, result, phase, players }: { kit: AnalysisKit; ply: number; item: Item | null; result: AnalysisResult | null; phase: string | null; players: [string, string] }) {
  if (ply === 0)
    return (
      <div className="coach-card">
        <h4>🦉 Thầy Cú nhận xét</h4>
        <p style={{ margin: 0 }}>Bấm ▶ (hoặc phím →), chọn một nước trong biên bản, hay bấm vào biểu đồ để xem nhận xét từng nước của cả hai bên.</p>
        {result && (
          <p className="small muted" style={{ margin: '8px 0 0' }}>
            Đánh giá thế cờ ban đầu: {kit.engine.evalText(result)} · {result.engine === 'js' ? 'Bộ máy Kỳ Đạo' : 'Stockfish 18'}, độ sâu {result.depth}
          </p>
        )}
      </div>
    );
  if (!item)
    return (
      <div className="coach-card">
        <h4>🦉 Thầy Cú nhận xét</h4>
        <div className="small muted">Đang phân tích nước này…</div>
      </div>
    );
  const { review: r, insight } = item;
  const info = CLASS_INFO[r.cls];
  const side = r.color;
  const facts: string[] = [];
  if (insight.allowedMate) facts.push(`Cho phép đối thủ chiếu hết sau ${insight.allowedMate} nước`);
  else if (insight.lost >= 2 && ERROR_CLASSES.includes(r.cls)) facts.push(`Mất ${insight.lost} điểm vật chất nếu đối thủ đáp đúng`);
  if (insight.missedMate) facts.push(`Bỏ lỡ chiếu hết sau ${insight.missedMate} nước`);
  else if (insight.missedGain >= 2 && ERROR_CLASSES.includes(r.cls)) facts.push(`Bỏ lỡ ${insight.missedGain} điểm vật chất`);
  return (
    <div className="coach-card" style={{ borderColor: `color-mix(in srgb, ${info.color} 50%, var(--border))` }}>
      <h4>
        🦉 {moveNo(r.ply)} {players[side]} ({kit.online.sideNames[side]}){phase ? ` · ${PHASE_NAME[phase as keyof typeof PHASE_NAME]}` : ''}
      </h4>
      <div className="feedback-head">
        <div className="cls-icon" style={{ background: info.color }}>
          <ClassSymbol cls={r.cls} />
        </div>
        <div>
          <div className="fh-title" style={{ color: info.color }}>
            {kit.san(r.san, side)} · {r.headline}
          </div>
          <div className="fh-sub">
            {info.label} · độ chính xác {Math.round(r.accuracy)}%{r.drop >= 1 ? ` · mất ${r.drop.toFixed(0)}% cơ hội thắng` : ''}
          </div>
        </div>
      </div>
      <div className="feedback-text">
        {r.comments.map((c, i) => (
          <RichText key={i} text={c} />
        ))}
        {r.warning && (
          <div className="callout warn" style={{ marginTop: 8 }}>
            <span className="ci">⚠️</span>
            <span>{r.warning}</span>
          </div>
        )}
        {facts.length > 0 && (
          <div className="tag-row" style={{ marginTop: 8 }}>
            {facts.map((f) => (
              <span key={f} className="tag red">
                {f}
              </span>
            ))}
          </div>
        )}
        {r.best && r.best.pvSan.length > 1 && ERROR_CLASSES.includes(r.cls) && (
          <div className="small muted" style={{ marginTop: 8 }}>
            Diễn biến tốt hơn: {r.best.pvSan.join(' ')}
          </div>
        )}
        {r.refutation && r.refutation.pvSan.length > 1 && (r.cls === 'mistake' || r.cls === 'blunder') && (
          <div className="small muted" style={{ marginTop: 4 }}>
            Đối thủ có thể đáp: {r.refutation.pvSan.join(' ')}
          </div>
        )}
      </div>
    </div>
  );
}

// =====================================================================================
// Tổng kết
// =====================================================================================
function ReportView({
  kit,
  report,
  players,
  you,
  tab,
  setTab,
  reviews,
  onJump,
}: {
  kit: AnalysisKit;
  report: GameReport;
  players: [string, string];
  you: Side | null;
  tab: Side;
  setTab: (s: Side) => void;
  reviews: Review[];
  onJump: (i: number) => void;
}) {
  const { online } = kit;
  const names = online.sideNames;
  const [a, b] = report.sides;
  const hasTime = !!(a.time || b.time);
  const shownClasses = (Object.keys(CLASS_INFO) as MoveClass[]).filter(
    (k) => a.counts[k] + b.counts[k] > 0 || k === 'inaccuracy' || k === 'mistake' || k === 'blunder',
  );
  const head = (s: Side) => (
    <span className="an-th">
      <span className="an-th-icon">
        <online.SideIcon side={s} />
      </span>
      <span>
        <b>{players[s]}</b>
        <span className="small muted">
          {names[s]}
          {you === s ? ' · bạn' : ''}
        </span>
      </span>
    </span>
  );
  const accCell = (x: number | null) => (x === null ? '–' : `${Math.round(x)}%`);
  const better = (x: number | null, y: number | null, higher = true) => (x !== null && y !== null && Math.abs(x - y) >= 1 ? (higher ? x > y : x < y) : false);

  return (
    <div className="an-report">
      <section className="an-section">
        <h2>Tổng kết hai bên</h2>
        <p className="an-headline">{report.headline}</p>
        <div className="an-sides">
          {report.sides.map((s) => (
            <div key={s.side} className="card an-side">
              {head(s.side)}
              <div className="an-acc">
                <b>{accCell(s.accuracy)}</b>
                <span className="small muted">độ chính xác</span>
              </div>
              <p className="an-verdict">{s.verdict}</p>
            </div>
          ))}
        </div>

        <div className="card an-table-card">
          <table className="an-table">
            <caption className="sr-only">So sánh hai bên theo từng chỉ số</caption>
            <thead>
              <tr>
                <th scope="col">Chỉ số</th>
                <th scope="col">{players[0]}</th>
                <th scope="col">{players[1]}</th>
              </tr>
            </thead>
            <tbody>
              {PHASES.map((p) => (
                <tr key={p}>
                  <th scope="row">{PHASE_NAME[p]}</th>
                  {report.sides.map((s, k) => (
                    <td key={k} className={better(s.phases[p].accuracy, report.sides[k ^ 1].phases[p].accuracy) ? 'win' : ''}>
                      {s.phases[p].moves ? (
                        <>
                          {accCell(s.phases[p].accuracy)} <span className="muted small">· {s.phases[p].moves} nước</span>
                        </>
                      ) : (
                        <span className="muted">–</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <th scope="row">Tỉ lệ nước tốt</th>
                {report.sides.map((s, k) => (
                  <td key={k} className={better(s.goodShare, report.sides[k ^ 1].goodShare) ? 'win' : ''}>
                    {Math.round(s.goodShare)}%
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row">Mất trung bình mỗi nước</th>
                {report.sides.map((s, k) => (
                  <td key={k} className={better(s.avgLoss, report.sides[k ^ 1].avgLoss, false) ? 'win' : ''}>
                    {s.avgLoss.toFixed(1).replace('.', ',')}% cơ hội
                  </td>
                ))}
              </tr>
              {shownClasses.map((k) => (
                <tr key={k} className="an-cls-row">
                  <th scope="row">
                    <span className="cls-icon" style={{ background: CLASS_INFO[k].color }}>
                      <ClassSymbol cls={k} />
                    </span>
                    {CLASS_INFO[k].label}
                  </th>
                  <td>{a.counts[k]}</td>
                  <td>{b.counts[k]}</td>
                </tr>
              ))}
              {hasTime && (
                <>
                  <tr>
                    <th scope="row">Thời gian nghĩ trung bình</th>
                    {report.sides.map((s, k) => (
                      <td key={k}>{s.time ? fmtSec(s.time.avg) : '–'}</td>
                    ))}
                  </tr>
                  <tr>
                    <th scope="row">Nghĩ lâu nhất</th>
                    {report.sides.map((s, k) => (
                      <td key={k}>
                        {s.time?.longest ? (
                          <button className="an-link" onClick={() => onJump(s.time!.longest!.ply)}>
                            {fmtSec(s.time.longest.ms)} (nước {moveNo(s.time.longest.ply)})
                          </button>
                        ) : (
                          '–'
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th scope="row">Đồng hồ còn lại</th>
                    {report.sides.map((s, k) => (
                      <td key={k}>{s.time?.left != null ? formatClock(s.time.left) : '–'}</td>
                    ))}
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="an-section" aria-labelledby="an-lessons">
        <h2 id="an-lessons">Bài học rút ra</h2>
        <div className="tabs" role="tablist" aria-label="Chọn bên">
          {([0, 1] as Side[]).map((s) => (
            <button key={s} role="tab" aria-selected={tab === s} className={'tab' + (tab === s ? ' active' : '')} onClick={() => setTab(s)}>
              {players[s]} · {names[s]}
              {you === s && <span className="count">bạn</span>}
            </button>
          ))}
        </div>
        <SideLessons kit={kit} side={report.sides[tab]} name={players[tab]} reviews={reviews} onJump={onJump} />
      </section>

      <section className="an-section an-two">
        <div className="card">
          <h3>⚡ Bước ngoặt</h3>
          {report.moments.length ? (
            <div>
              {report.moments.map((m) => (
                <button key={m.ply} className="mistake-item" onClick={() => onJump(m.ply)}>
                  <span className="cls-icon" style={{ background: CLASS_INFO[m.cls].color, width: 26, height: 26, fontSize: '0.72rem' }}>
                    <ClassSymbol cls={m.cls} />
                  </span>
                  <span>
                    <RichText text={m.text} />
                    {m.decisive && <span className="tag red">Bước ngoặt quyết định</span>}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <p className="muted" style={{ margin: 0 }}>
              Không có sai lầm lớn nào: thế cờ thay đổi từ từ, không có một nước nào lật ngược ván đấu.
            </p>
          )}
        </div>
        <div className="card">
          <h3>🧭 Diễn biến ván đấu</h3>
          <ol className="an-story">
            {report.story.map((s, i) => (
              <li key={i}>
                {s.ply !== undefined ? (
                  <button className="an-link" onClick={() => onJump(s.ply!)}>
                    <RichText text={s.text} />
                  </button>
                ) : (
                  <RichText text={s.text} />
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}

const fmtSec = (ms: number) => {
  const s = Math.round(ms / 1000);
  return s < 60 ? `${s} giây` : `${Math.floor(s / 60)} phút ${s % 60 ? `${s % 60} giây` : ''}`.trim();
};

function SideLessons({ kit, side, name, reviews, onJump }: { kit: AnalysisKit; side: SideReport; name: string; reviews: Review[]; onJump: (i: number) => void }) {
  return (
    <div className="an-lessons" role="tabpanel">
      <div className="an-col">
        <h3>📌 Cần cải thiện</h3>
        {side.lessons.length ? (
          side.lessons.map((f) => <FindingCard key={f.id} kit={kit} f={f} reviews={reviews} onJump={onJump} />)
        ) : (
          <p className="muted">{name} không mắc lỗi đáng kể nào trong ván này. Hãy thử sức với đối thủ mạnh hơn!</p>
        )}
      </div>
      <div className="an-col">
        <h3>💪 Điểm mạnh</h3>
        {side.strengths.length ? (
          side.strengths.map((f) => <FindingCard key={f.id} kit={kit} f={f} reviews={reviews} onJump={onJump} good />)
        ) : (
          <p className="muted">Chưa có điểm nổi bật. Xem lại các bài học bên cạnh rồi thử lại ở ván sau nhé.</p>
        )}
      </div>
    </div>
  );
}

function FindingCard({ kit, f, reviews, onJump, good }: { kit: AnalysisKit; f: Finding; reviews: Review[]; onJump: (i: number) => void; good?: boolean }) {
  const chips: ReactNode[] = f.plies
    .filter((p) => reviews[p])
    .slice(0, 6)
    .map((p) => {
      const r = reviews[p];
      return (
        <button key={p} className="chip" onClick={() => onJump(p)} title={CLASS_INFO[r.cls].label}>
          {moveNo(p)} {kit.san(r.san, r.color)}
          <span style={{ color: CLASS_INFO[r.cls].color }}>
            <ClassSymbol cls={r.cls} />
          </span>
        </button>
      );
    });
  return (
    <article className={'card an-finding' + (good ? ' good' : '')}>
      <div className="an-f-head">
        <span className="an-f-icon" aria-hidden="true">
          {f.icon}
        </span>
        <h4>{f.title}</h4>
      </div>
      <RichText text={f.text} />
      {f.tip && (
        <div className="callout tip">
          <span className="ci">💡</span>
          <span>{f.tip}</span>
        </div>
      )}
      {(chips.length > 0 || f.links?.length) && (
        <div className="an-f-foot">
          {chips.length > 0 && (
            <div className="tag-row" aria-label="Xem trên bàn cờ">
              {chips}
            </div>
          )}
          {f.links?.map((l) => (
            <a key={l.href} className="btn small ghost" href={href(l.href)}>
              📚 {l.label}
            </a>
          ))}
        </div>
      )}
    </article>
  );
}
