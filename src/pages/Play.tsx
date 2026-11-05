import { useEffect, useMemo, useRef, useState } from 'react';
import { CaretLeft, CaretRight, Play as PlayIcon } from '@phosphor-icons/react';
import { Board, BoardArrow } from '../components/Board';
import { BotStep, ClassSymbol, EvalBar, MoveList, MoveMark, RichText, San, StartBar, WinBar } from '../components/common';
import { BOTS, BotProfile } from '../engine/bots';
import { Position, START_FEN, GameStatus, Color } from '../engine/board';
import { requestAnalysis, requestBotMove, cancelBot, cancelAnalysis } from '../engine/client';
import type { AnalysisResult } from '../engine/protocol';
import { CLASS_INFO, MoveReview, evalText, predictMoves, reviewMove, summarize, whiteWin, lineWin, Prediction } from '../engine/coach';
import { analyzeMove, describeMove, piece } from '../engine/explain';
import { deepHintAnalysis, explainHint, HintDeep } from '../engine/hint';
import { isCaptureAt } from '../engine/purpose';
import { isBookMove, openingNameAt, pickBookMove } from '../engine/book';
import { PIECE_SVG } from '../assets/pieces';
import { useStored, BotStats } from '../lib/storage';
import { playMoveSound, sounds } from '../lib/sound';
import { navigate } from '../lib/router';

interface CoachSettings {
  evalBar: boolean;
  feedback: boolean;
  hints: boolean;
  predictions: boolean;
  threats: boolean;
}

const ALL_ON: CoachSettings = { evalBar: true, feedback: true, hints: true, predictions: true, threats: true };
const ALL_OFF: CoachSettings = { evalBar: false, feedback: false, hints: false, predictions: false, threats: false };

interface GameSetup {
  id: number;
  level: number;
  playerColor: 'w' | 'b';
  startFen: string;
  preMoves: string[];
  coach: CoachSettings;
  /** Nước đã đi khi tiếp tục một ván đang dở */
  resumeMoves?: string[];
}

interface SavedGame {
  setup: GameSetup;
  moves: string[];
  over: boolean;
  savedAt: number;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function rebuild(startFen: string, moves: string[]) {
  const pos = new Position(startFen);
  const fens = [pos.fen()];
  const sans: string[] = [];
  for (const u of moves) {
    const m = pos.moveFromUci(u);
    if (!m) break;
    sans.push(pos.moveToSan(m));
    pos.make(m);
    fens.push(pos.fen());
  }
  return { pos, fens, sans };
}

export function Play({ query }: { query: URLSearchParams }) {
  const [setup, setSetup] = useState<GameSetup | null>(null);
  const presetFen = query.get('fen') ?? undefined;
  const presetMoves = (query.get('moves') ?? '').split(/[ ,]+/).filter(Boolean);
  const presetSide = query.get('side') as 'w' | 'b' | null;
  useEffect(() => setSetup(null), [query.toString()]);
  if (!setup) return <SetupScreen presetFen={presetFen} presetMoves={presetMoves} presetSide={presetSide ?? undefined} onStart={setSetup} />;
  return <GameScreen key={setup.id} setup={setup} onNew={() => setSetup(null)} onRestart={(s) => setSetup({ ...s, id: Date.now() })} />;
}

// =====================================================================================
// Màn hình thiết lập
// =====================================================================================
function SetupScreen({ presetFen, presetMoves, presetSide, onStart }: { presetFen?: string; presetMoves: string[]; presetSide?: 'w' | 'b'; onStart: (s: GameSetup) => void }) {
  const [level, setLevel] = useStored<number>('last-level', 2);
  const [color, setColor] = useStored<'w' | 'b' | 'random'>('last-color', 'w');
  const [mode, setMode] = useStored<'coach' | 'match' | 'custom'>('last-mode', 'coach');
  const [custom, setCustom] = useStored<CoachSettings>('coach-custom', ALL_ON);
  const [stats] = useStored<Record<number, BotStats>>('bot-stats', {});
  const [usePreset, setUsePreset] = useState(true);
  const [saved, setSaved] = useStored<SavedGame | null>('current-game', null);
  const hasPreset = !!presetFen || presetMoves.length > 0;
  useEffect(() => {
    if (presetSide) setColor(presetSide);
    else if (presetFen) setColor(presetFen.split(' ')[1] === 'b' ? 'b' : 'w');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [presetFen, presetSide]);

  const preview = useMemo(() => {
    if (!hasPreset) return null;
    try {
      return rebuild(presetFen ?? START_FEN, presetMoves);
    } catch {
      return null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [presetFen, presetMoves.join(',')]);

  const start = () => {
    const pc = color === 'random' ? (Math.random() < 0.5 ? 'w' : 'b') : color;
    const coach = mode === 'coach' ? ALL_ON : mode === 'match' ? ALL_OFF : custom;
    onStart({
      id: Date.now(),
      level,
      playerColor: pc,
      startFen: usePreset && preview ? presetFen ?? START_FEN : START_FEN,
      preMoves: usePreset && preview ? presetMoves : [],
      coach,
    });
  };

  return (
    <div className="setup">
      <div className="page-head">
        <h1>🎯 Luyện tập với máy</h1>
        <p>Chọn đối thủ phù hợp với trình độ. Ở chế độ Huấn luyện, Thầy Cú 🦉 sẽ chấm từng nước đi của bạn, chỉ ra nước mạnh – nước yếu, cảnh báo nguy hiểm và dự đoán đối thủ sẽ đi gì tiếp theo.</p>
      </div>

      {saved && !saved.over && saved.moves.length > saved.setup.preMoves.length && !hasPreset && (
        <div className="callout info" style={{ marginBottom: 18, alignItems: 'center' }}>
          <span className="ci">{BOTS[saved.setup.level - 1].avatar}</span>
          <div style={{ flex: 1 }}>
            <b>Bạn có một ván đang dở</b> với {BOTS[saved.setup.level - 1].name} (cấp {saved.setup.level}) – {saved.moves.length} nửa nước.
          </div>
          <button className="btn small primary" onClick={() => onStart({ ...saved.setup, id: Date.now(), resumeMoves: saved.moves })}>
            <PlayIcon size={14} weight="fill" aria-hidden="true" />
            Tiếp tục
          </button>
          <button className="btn small ghost" onClick={() => setSaved(null)}>
            Bỏ ván
          </button>
        </div>
      )}

      <BotStep bots={BOTS} level={level} stats={stats} onPick={setLevel} />

      <div className="grid cols-2" style={{ marginTop: 26 }}>
        <div className="card">
          <h3>2. Chọn màu quân</h3>
          <div className="choice-row">
            {(
              [
                ['w', 'Trắng', PIECE_SVG.wk],
                ['random', 'Ngẫu nhiên', null],
                ['b', 'Đen', PIECE_SVG.bk],
              ] as const
            ).map(([k, label, img]) => (
              <button key={k} className={'choice' + (color === k ? ' active' : '')} aria-pressed={color === k} onClick={() => setColor(k)}>
                {img ? <img src={img} alt="" /> : <span className="choice-ic" style={{ fontSize: 26 }}>🎲</span>}
                {label}
              </button>
            ))}
          </div>
          {hasPreset && preview && (
            <div style={{ marginTop: 16 }}>
              <label className="toggle">
                <input type="checkbox" checked={usePreset} onChange={(e) => setUsePreset(e.target.checked)} />
                <span className="sw" />
                <span>
                  <b>Bắt đầu từ thế cờ đã chọn</b>
                  <span className="desc">{presetMoves.length ? `Sau ${presetMoves.length} nửa nước của diễn biến khai cuộc.` : 'Thế cờ từ bài học.'}</span>
                </span>
              </label>
              {usePreset && (
                <div style={{ maxWidth: 220 }}>
                  <Board fen={preview.fens[preview.fens.length - 1]} showCoords={false} orientation={color === 'b' ? 'black' : 'white'} />
                </div>
              )}
            </div>
          )}
        </div>
        <div className="card">
          <h3>3. Chế độ chơi</h3>
          <div className="choice-row">
            <button className={'choice' + (mode === 'coach' ? ' active' : '')} aria-pressed={mode === 'coach'} onClick={() => setMode('coach')}>
              <span className="choice-ic" aria-hidden="true">🦉</span> Huấn luyện
            </button>
            <button className={'choice' + (mode === 'match' ? ' active' : '')} aria-pressed={mode === 'match'} onClick={() => setMode('match')}>
              <span className="choice-ic" aria-hidden="true">⚔️</span> Thi đấu
            </button>
            <button className={'choice' + (mode === 'custom' ? ' active' : '')} aria-pressed={mode === 'custom'} onClick={() => setMode('custom')}>
              <span className="choice-ic" aria-hidden="true">⚙️</span> Tùy chỉnh
            </button>
          </div>
          <p className="small muted" style={{ marginTop: 10 }}>
            {mode === 'coach' && 'Bật mọi trợ giúp: thanh tỉ lệ thắng, chấm điểm nước đi, gợi ý, cảnh báo đe dọa và dự đoán nước đi của máy.'}
            {mode === 'match' && 'Không có trợ giúp trong lúc chơi – như một ván đấu thật. Toàn bộ phân tích sẽ hiện ra khi ván cờ kết thúc.'}
            {mode === 'custom' && 'Tự chọn những trợ giúp bạn muốn:'}
          </p>
          {mode === 'custom' && <CoachToggles value={custom} onChange={setCustom} />}
        </div>
      </div>
      <details className="card" style={{ marginTop: 22 }}>
        <summary style={{ cursor: 'pointer', fontWeight: 700 }}>🦉 Cách đọc nhận xét của Thầy Cú</summary>
        <p className="muted small" style={{ marginTop: 10 }}>
          Sau mỗi nước, máy so sánh <b>cơ hội thắng</b> trước và sau nước đi của bạn (thang 0–100%). Mức sụt giảm quyết định nhãn của nước đi:
        </p>
        <div className="cls-counts" style={{ gridTemplateColumns: '1fr' }}>
          {(
            [
              ['brilliant', 'Thí quân đúng đắn mà thế cờ vẫn tốt – đòn của kiện tướng.'],
              ['great', 'Nước duy nhất giữ được thế cờ, các nước khác kém hơn rõ rệt.'],
              ['best', 'Đúng nước mạnh nhất theo máy.'],
              ['excellent', 'Chỉ kém nước tốt nhất dưới 2%.'],
              ['good', 'Kém nước tốt nhất 2–5% – vẫn là nước hợp lý.'],
              ['book', 'Nước đi có trong lý thuyết khai cuộc.'],
              ['inaccuracy', 'Mất 5–10% cơ hội thắng: có nước tốt hơn.'],
              ['mistake', 'Mất 10–20%: đánh mất lợi thế đáng kể.'],
              ['miss', 'Đang có cơ hội thắng lớn nhưng không tận dụng.'],
              ['blunder', 'Mất trên 20%: thường là để mất quân hoặc bị chiếu hết.'],
            ] as const
          ).map(([k, text]) => (
            <div className="cls-count" key={k}>
              <span className="cls-icon" style={{ background: CLASS_INFO[k].color }}>
                <ClassSymbol cls={k} />
              </span>
              <span>
                <b>{CLASS_INFO[k].label}</b> – <span className="muted">{text}</span>
              </span>
            </div>
          ))}
        </div>
        <p className="muted small" style={{ margin: 0 }}>
          Trên bàn cờ: mũi tên <b style={{ color: '#15781b' }}>xanh lá</b> là nước tốt nhất, <b style={{ color: '#1d5fd1' }}>xanh dương</b> là dự đoán nước của máy kèm xác suất, <b style={{ color: '#c0262d' }}>đỏ</b> là mối đe dọa của đối thủ. Bấm vào bất kỳ nước nào trong biên bản (hoặc dùng phím ← →) để xem lại.
        </p>
      </details>

      <StartBar bot={BOTS[level - 1]} details={`${COLOR_LABEL[color]} · ${MODE_LABEL[mode]}`} onStart={start} />
    </div>
  );
}

const COLOR_LABEL = { w: 'Quân Trắng', b: 'Quân Đen', random: 'Ngẫu nhiên' };
const MODE_LABEL = { coach: 'Huấn luyện', match: 'Thi đấu', custom: 'Tùy chỉnh' };

function CoachToggles({ value, onChange }: { value: CoachSettings; onChange: (v: CoachSettings) => void }) {
  const items: [keyof CoachSettings, string, string][] = [
    ['evalBar', 'Thanh tỉ lệ thắng', 'Xem ai đang có lợi thế sau mỗi nước.'],
    ['feedback', 'Chấm điểm nước đi', 'Nhận xét ngay sau mỗi nước: tốt nhất, sai lầm…'],
    ['hints', 'Nút gợi ý', 'Xin gợi ý khi bí nước.'],
    ['threats', 'Cảnh báo đe dọa', 'Báo khi đối thủ đang nhắm tới một đòn nguy hiểm.'],
    ['predictions', 'Dự đoán nước đi của máy', 'Xem máy có thể đi những nước nào và xác suất.'],
  ];
  return (
    <div>
      {items.map(([k, title, desc]) => (
        <label key={k} className="toggle">
          <input type="checkbox" checked={value[k]} onChange={(e) => onChange({ ...value, [k]: e.target.checked })} />
          <span className="sw" />
          <span>
            <b>{title}</b>
            <span className="desc">{desc}</span>
          </span>
        </label>
      ))}
    </div>
  );
}

// =====================================================================================
// Màn hình ván đấu
// =====================================================================================
const REASON_TEXT: Record<string, string> = {
  checkmate: 'chiếu hết',
  stalemate: 'hết nước đi (pat)',
  insufficient: 'không đủ quân để chiếu hết',
  fifty: 'luật 50 nước',
  repetition: 'lặp lại thế cờ 3 lần',
  resign: 'xin thua',
  agreed: 'thỏa thuận hòa',
};

interface EndInfo {
  result: '1-0' | '0-1' | '1/2-1/2';
  reason: string;
}

function GameScreen({ setup, onNew, onRestart }: { setup: GameSetup; onNew: () => void; onRestart: (s: GameSetup) => void }) {
  const bot = BOTS[setup.level - 1];
  const playerColor: Color = setup.playerColor === 'w' ? 0 : 1;
  const botColor: Color = (playerColor ^ 1) as Color;
  const base = setup.preMoves.length;

  const [moves, setMoves] = useState<string[]>(setup.resumeMoves ?? setup.preMoves);
  const [, setSavedGame] = useStored<SavedGame | null>('current-game', null);
  const [analyses, setAnalyses] = useState<Map<string, AnalysisResult>>(new Map());
  const [thinking, setThinking] = useState(false);
  const [viewPly, setViewPly] = useState<number | null>(null);
  const [flip, setFlip] = useState(setup.playerColor === 'b');
  const [coach, setCoach] = useState<CoachSettings>(setup.coach);
  const [hintLevel, setHintLevel] = useState(0);
  const [hintDeep, setHintDeep] = useState<{ key: string; deep: HintDeep } | null>(null);
  const [showThreat, setShowThreat] = useState(false);
  const [showPredArrows, setShowPredArrows] = useState(true);
  const [ended, setEnded] = useState<EndInfo | null>(null);
  const [modal, setModal] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [, setStats] = useStored<Record<number, BotStats>>('bot-stats', {});
  const statsSaved = useRef(false);

  const game = useMemo(() => rebuild(setup.startFen, moves), [setup.startFen, moves]);
  const ply = moves.length;
  const pos = game.pos;
  const fen = game.fens[ply];
  const turn = pos.side;
  const status: GameStatus = useMemo(() => pos.status(), [pos]);
  const over = !!ended;

  // bắt đầu ván: đưa bàn cờ lên đầu màn hình (nút bắt đầu nằm cuối trang thiết lập)
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  // rời màn hình: dừng máy đang suy nghĩ và các phân tích còn chờ
  useEffect(
    () => () => {
      cancelBot();
      cancelAnalysis();
      requested.current = new Set();
    },
    [],
  );

  // ---- lưu ván để có thể tiếp tục sau khi tải lại trang ----
  useEffect(() => {
    setSavedGame({ setup: { ...setup, resumeMoves: undefined }, moves, over: !!ended, savedAt: Date.now() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moves, ended]);

  // ---- kết thúc ván ----
  useEffect(() => {
    if (ended) return;
    if (status.over) {
      setEnded({ result: status.result!, reason: status.reason! });
      sounds.end();
      setTimeout(() => setModal(true), 900);
    }
  }, [status, ended]);

  useEffect(() => {
    if (!ended || statsSaved.current) return;
    statsSaved.current = true;
    const mine = ended.result === '1/2-1/2' ? 'draw' : (ended.result === '1-0') === (playerColor === 0) ? 'win' : 'loss';
    setStats((old) => {
      const s = old[setup.level] ?? { win: 0, loss: 0, draw: 0 };
      return { ...old, [setup.level]: { ...s, [mine]: s[mine] + 1 } };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ended]);

  // ---- phân tích mọi vị trí (chạy nền): vị trí hiện tại trước, rồi bổ sung các vị trí còn thiếu ----
  const requested = useRef(new Set<string>());
  useEffect(() => {
    const order = [ply];
    for (let i = base; i < ply; i++) order.push(i);
    for (const i of order) {
      const f = game.fens[i];
      if (analyses.has(f) || requested.current.has(f)) continue;
      requested.current.add(f);
      const playerToMove = (f.split(' ')[1] === 'w' ? 0 : 1) === playerColor;
      const terminal = i === ply && status.over;
      requestAnalysis(setup.startFen, moves.slice(0, i), { multiPV: 3, timeMs: playerToMove ? 1500 : 900, threat: playerToMove && !terminal, channel: 'play-' + f }).then((r) => {
        if (r) setAnalyses((old) => new Map(old).set(r.fen, r));
        else requested.current.delete(f);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moves, analyses]);

  // ---- máy đi ----
  useEffect(() => {
    if (over || status.over || turn !== botColor) return;
    let cancelled = false;
    setThinking(true);
    const t0 = performance.now();
    (async () => {
      let uci: string | null = null;
      if (bot.bookChance > 0 && Math.random() < bot.bookChance) uci = pickBookMove(pos);
      if (!uci) {
        const r = await requestBotMove(setup.startFen, moves, setup.level);
        uci = r?.uci ?? null;
      }
      const wait = bot.thinkMinMs + Math.random() * 500 - (performance.now() - t0);
      if (wait > 0) await sleep(wait);
      if (cancelled || !uci) return;
      setThinking(false);
      applyMove(uci);
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moves, over]);

  function applyMove(uci: string) {
    const m = pos.moveFromUci(uci);
    if (!m) return;
    const san = pos.moveToSan(m);
    playMoveSound(san);
    setMoves((old) => [...old, uci]);
    setHintLevel(0);
    setShowThreat(false);
  }

  function onPlayerMove(uci: string) {
    if (over || turn !== playerColor || viewPly !== null) return;
    applyMove(uci);
  }

  // ---- đánh giá từng nước (thuần dẫn xuất, có bộ nhớ đệm) ----
  const reviewCache = useRef(new Map<string, MoveReview>());
  const reviews = useMemo(() => {
    const res: (MoveReview | null)[] = [];
    let opening: string | undefined;
    for (let i = 0; i < moves.length; i++) {
      const fenBefore = game.fens[i];
      const fenAfter = game.fens[i + 1];
      const pb = new Position(fenBefore);
      const pa = new Position(fenAfter);
      opening = openingNameAt(pa) ?? opening;
      if (i < base) {
        res.push(null);
        continue;
      }
      const before = analyses.get(fenBefore) ?? null;
      const after = analyses.get(fenAfter) ?? null;
      const terminal = pa.status().over;
      if (!before || (!after && !terminal)) {
        res.push(null);
        continue;
      }
      const key = `${fenBefore}|${moves[i]}`;
      let r = reviewCache.current.get(key);
      if (!r) {
        r = reviewMove({ posBefore: pb, uci: moves[i], ply: i, before, after, isBook: isBookMove(pb, moves[i]), openingName: opening, prevUci: moves[i - 1] });
        reviewCache.current.set(key, r);
      }
      res.push(r);
    }
    return res;
  }, [moves, analyses, game, base]);

  const openingName = useMemo(() => {
    let name: string | undefined;
    for (let i = 1; i < game.fens.length; i++) name = openingNameAt(new Position(game.fens[i])) ?? name;
    return name;
  }, [game]);

  // ---- điều khiển ----
  function undo() {
    if (moves.length <= base) return;
    cancelBot();
    cancelAnalysis();
    requested.current = new Set();
    setThinking(false);
    let n = moves.length;
    if (turn === playerColor) n -= 2;
    else n -= 1;
    n = Math.max(base, n);
    // nếu người chơi cầm Đen và lùi về vị trí máy phải đi trước, máy sẽ tự đi lại
    setMoves(moves.slice(0, n));
    setEnded(null);
    setModal(false);
    statsSaved.current = false;
    setViewPly(null);
    setHintLevel(0);
    setToast('Đã đi lại. Hãy suy nghĩ kỹ hơn nhé! 🦉');
  }

  function resign() {
    if (over) return;
    if (!window.confirm('Bạn chắc chắn muốn xin thua?')) return;
    cancelBot();
    setThinking(false);
    setEnded({ result: playerColor === 0 ? '0-1' : '1-0', reason: 'resign' });
    setTimeout(() => setModal(true), 300);
  }

  function offerDraw() {
    if (over) return;
    const a = analyses.get(fen);
    if (!a?.lines.length || moves.length - base < 20) {
      setToast(`${bot.avatar} ${bot.name}: “Ván cờ còn dài, chơi tiếp đi!”`);
      return;
    }
    // điểm theo góc nhìn của máy
    const w = lineWin(a.lines[0]);
    const botWin = turn === botColor ? w : 100 - w;
    if (botWin <= 55) {
      cancelBot();
      setThinking(false);
      setEnded({ result: '1/2-1/2', reason: 'agreed' });
      setTimeout(() => setModal(true), 300);
    } else setToast(`${bot.avatar} ${bot.name} từ chối hòa – máy thấy mình đang có lợi thế.`);
  }

  // phím ← → để xem lại các nước đã đi
  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')) return;
      const cur = viewPly ?? moves.length;
      if (e.key === 'ArrowLeft' && cur > 0) setViewPly(cur - 1);
      else if (e.key === 'ArrowRight' && viewPly !== null) setViewPly(cur + 1 >= moves.length ? null : cur + 1);
      else return;
      e.preventDefault();
    };
    window.addEventListener('keydown', on);
    return () => window.removeEventListener('keydown', on);
  }, [viewPly, moves.length]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  // ---- dữ liệu hiển thị ----
  const viewing = viewPly !== null && viewPly !== ply;
  const shownPly = viewing ? viewPly! : ply;
  const shownFen = game.fens[shownPly];
  const shownAnalysis = analyses.get(shownFen);
  const evalShown = coach.evalBar || over;
  const finalWin = ended && shownPly === ply ? (ended.result === '1-0' ? 100 : ended.result === '0-1' ? 0 : 50) : null;
  const win = evalShown ? (shownAnalysis?.lines.length ? whiteWin(shownAnalysis) : finalWin) : null;
  const orientation = flip ? 'black' : 'white';
  const lastIdx = shownPly - 1;
  const lastReview = lastIdx >= 0 ? reviews[lastIdx] : null;

  const currentAnalysis = analyses.get(fen);
  const prevFen = ply > 0 ? game.fens[ply - 1] : null;
  const prevAnalysis = prevFen ? analyses.get(prevFen) : undefined;

  const predictions: Prediction[] = useMemo(() => {
    if (turn !== botColor || over) return [];
    return predictMoves(new Position(fen), currentAnalysis ?? null);
  }, [fen, currentAnalysis, turn, botColor, over]);

  // nước máy vừa đi so với dự đoán
  const botLastPredicted = useMemo(() => {
    if (turn !== playerColor || ply === 0 || ply <= base || !prevFen || !prevAnalysis) return null;
    const preds = predictMoves(new Position(prevFen), prevAnalysis);
    const idx = preds.findIndex((p) => p.uci === moves[ply - 1]);
    return { preds, idx };
  }, [turn, playerColor, ply, base, prevFen, prevAnalysis, moves]);

  const threat = turn === playerColor && !over ? currentAnalysis?.threat : undefined;
  const threatDesc = useMemo(() => {
    if (!threat) return '';
    try {
      const p = new Position(fen);
      p.makeNull();
      const m = p.moveFromUci(threat.uci);
      const d = m ? describeMove(analyzeMove(p, m)) : '';
      p.unmakeNull();
      return d;
    } catch {
      return '';
    }
  }, [threat, fen]);

  const best = turn === playerColor && !over ? currentAnalysis?.lines[0] : undefined;
  const bestFacts = useMemo(() => {
    if (!best) return null;
    const p = new Position(fen);
    const m = p.moveFromUci(best.uci);
    return m ? analyzeMove(p, m) : null;
  }, [best, fen]);

  // ---- giải thích gợi ý: khi người chơi xin gợi ý, máy phân tích thêm thế cờ sau nước gợi ý ----
  const hintKey = best ? `${fen}|${best.uci}` : '';
  const deepReady = !!hintKey && hintDeep?.key === hintKey;
  const wantDeep = coach.hints && hintLevel >= 1 && !!best && !viewing;
  useEffect(() => {
    if (!wantDeep || !currentAnalysis || deepReady) return;
    let alive = true;
    deepHintAnalysis(requestAnalysis, setup.startFen, moves, currentAnalysis).then((d) => {
      if (alive && d) setHintDeep({ key: hintKey, deep: d });
    });
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wantDeep, hintKey]);

  const hintSections = useMemo(() => {
    if (!best || !currentAnalysis || hintLevel < 2) return [];
    const prevUci = ply > base ? moves[ply - 1] : undefined;
    return explainHint({
      pos: new Position(fen),
      before: currentAnalysis,
      deep: deepReady ? hintDeep!.deep : null,
      ctx: { prevUci, prevCapture: prevUci ? isCaptureAt(game.fens[ply - 1], prevUci) : false },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [best, currentAnalysis, hintLevel, deepReady, fen]);
  // diễn biến dự kiến: lấy theo phân tích sâu (nếu có) để khớp với lời giải thích
  const hintPv = best ? (deepReady && hintDeep!.deep.after?.lines[0] ? [best.san, ...hintDeep!.deep.after.lines[0].pvSan] : best.pvSan) : [];

  // mũi tên và tô ô
  const arrows: BoardArrow[] = [];
  const highlights: Record<string, string> = {};
  if (viewing || over) {
    if (lastReview?.best && lastReview.cls !== 'book' && (coach.feedback || over)) arrows.push({ from: lastReview.best.uci.slice(0, 2), to: lastReview.best.uci.slice(2, 4), color: 'green' });
  } else {
    if (coach.hints && hintLevel >= 2 && best) arrows.push({ from: best.uci.slice(0, 2), to: best.uci.slice(2, 4), color: 'green' });
    if (coach.hints && hintLevel === 1 && best) highlights[best.uci.slice(0, 2)] = 'green';
    if (coach.threats && showThreat && threat) arrows.push({ from: threat.uci.slice(0, 2), to: threat.uci.slice(2, 4), color: 'red' });
    if (coach.predictions && showPredArrows && thinking)
      predictions.slice(0, 3).forEach((p, i) => arrows.push({ from: p.uci.slice(0, 2), to: p.uci.slice(2, 4), color: 'blue', label: p.prob + '%', opacity: i === 0 ? 0.85 : 0.5 }));
  }
  const showBadge = lastReview && (coach.feedback || over) && (lastReview.color === playerColor || viewing || over);
  const badge = showBadge && lastReview ? { square: lastReview.uci.slice(2, 4), text: <ClassSymbol cls={lastReview.cls} />, color: CLASS_INFO[lastReview.cls].color } : null;

  const marks: (MoveMark | null)[] = reviews.map((r) =>
    r && (coach.feedback || over) && (r.color === playerColor || over) && r.cls !== 'good' && r.cls !== 'excellent'
      ? { symbol: <ClassSymbol cls={r.cls} />, color: CLASS_INFO[r.cls].color, title: CLASS_INFO[r.cls].label }
      : null,
  );

  // quân bị bắt
  const captured = useMemo(() => capturedPieces(shownFen, game.fens[0]), [shownFen, game]);
  const topColor: Color = orientation === 'white' ? 1 : 0;
  const strip = (c: Color) => {
    const isBot = c === botColor;
    const lost = c === 0 ? captured.byWhite : captured.byBlack;
    const adv = c === 0 ? captured.diff : -captured.diff;
    return (
      <div className="player-strip">
        <div className="pa" style={isBot ? { background: `color-mix(in srgb, ${bot.color} 25%, var(--surface))` } : undefined}>
          {isBot ? bot.avatar : '🧑'}
        </div>
        <div>
          <div className="pn">
            {isBot ? bot.name : 'Bạn'}
            {isBot && thinking && (
              <span className="thinking" title="Đang suy nghĩ">
                <i />
                <i />
                <i />
              </span>
            )}
          </div>
          <div className="ps">{isBot ? `Cấp ${bot.level} · ${bot.title} · ~${bot.elo}` : c === 0 ? 'Cầm quân Trắng' : 'Cầm quân Đen'}</div>
        </div>
        <div className="captured">
          {lost.map((code, i) => (
            <img key={i} src={PIECE_SVG[code]} alt="" />
          ))}
          {adv > 0 && <span className="adv">+{adv}</span>}
        </div>
      </div>
    );
  };

  const summary = useMemo(() => summarize(reviews.filter(Boolean) as MoveReview[], playerColor), [reviews, playerColor]);
  const pendingReviews = reviews.slice(base).some((r) => !r);

  return (
    <div>
      <div className="play">
        <div className="play-board-col">
          {strip(topColor)}
          <div className="board-wrap">
            {evalShown && <EvalBar win={win} text={shownAnalysis?.lines[0] ? evalText(shownAnalysis.lines[0], shownFen.split(' ')[1] === 'w') : ''} orientation={orientation} />}
            <Board
              fen={shownFen}
              orientation={orientation}
              movable={!viewing && !over && turn === playerColor ? (playerColor === 0 ? 'white' : 'black') : 'none'}
              onMove={onPlayerMove}
              lastMove={shownPly > 0 ? moves[shownPly - 1] : null}
              arrows={arrows}
              highlights={highlights}
              badge={badge}
            />
          </div>
          {strip(topColor === 0 ? 1 : 0)}
          <div className="controls-bar">
            <button className="btn small" onClick={undo} disabled={moves.length <= base} title="Lùi lại nước vừa đi">
              ↩️ Đi lại
            </button>
            <button className="btn small" onClick={() => setFlip(!flip)}>
              🔄 Lật bàn
            </button>
            <button className="btn small" onClick={offerDraw} disabled={over}>
              🤝 Cầu hòa
            </button>
            <button className="btn small danger" onClick={resign} disabled={over}>
              🏳 Xin thua
            </button>
            <button className="btn small" onClick={() => setShowSettings(!showSettings)}>
              ⚙️ Trợ giúp
            </button>
            {over && (
              <button className="btn small primary" onClick={() => setModal(true)}>
                📊 Kết quả
              </button>
            )}
          </div>
          {(coach.hints || coach.threats || coach.predictions) && !over && (
            <div className="legend" style={{ justifyContent: 'center' }}>
              {coach.hints && (
                <span>
                  <i style={{ background: '#15781b' }} /> Nước tốt nhất (gợi ý)
                </span>
              )}
              {coach.predictions && (
                <span>
                  <i style={{ background: '#1d5fd1' }} /> Dự đoán nước của máy
                </span>
              )}
              {coach.threats && (
                <span>
                  <i style={{ background: '#c0262d' }} /> Mối đe dọa
                </span>
              )}
              {coach.feedback && <span>● Huy hiệu trên ô: chất lượng nước vừa đi</span>}
            </div>
          )}
          {showSettings && (
            <div className="card tight">
              <CoachToggles value={coach} onChange={setCoach} />
            </div>
          )}
          {toast && (
            <div className="callout info" style={{ justifyContent: 'center' }}>
              {toast}
            </div>
          )}
        </div>

        <div className="coach-panel">
          {viewing && (
            <div className="banner-review">
              <span>👀 Đang xem lại nước {shownPly}</span>
              <button className="btn small" onClick={() => setViewPly(null)}>
                Về ván đấu ↩️
              </button>
            </div>
          )}

          {evalShown && (
            <div className="coach-card">
              <h4>📈 Cơ hội thắng</h4>
              <WinBar win={win} you={setup.playerColor} />
              {openingName && (
                <div className="opening-name" style={{ marginTop: 10 }}>
                  📖 {openingName}
                </div>
              )}
            </div>
          )}

          {/* Nhận xét nước đi */}
          {(viewing || over) && lastReview ? (
            <ReviewCard review={lastReview} you={lastReview.color === playerColor} />
          ) : (
            !viewing && (
              <>
                {coach.feedback && <PlayerFeedback reviews={reviews} moves={moves} base={base} playerColor={playerColor} turn={turn} />}
                {turn === playerColor && !over && ply > base && moves.length > 0 && (
                  <BotMoveCard bot={bot} san={game.sans[ply - 1]} fenBefore={game.fens[ply - 1]} uci={moves[ply - 1]} predicted={coach.predictions ? botLastPredicted : null} />
                )}
              </>
            )
          )}

          {!viewing && !over && coach.threats && threat && (
            <div className="coach-card threat">
              <h4>⚠️ Cảnh báo nguy hiểm</h4>
              <p style={{ margin: '0 0 8px' }}>
                Đối thủ đang nhắm tới <b>{threat.san}</b>
                {threat.mate > 0 ? <> – <b>chiếu hết sau {threat.mate} nước</b>!</> : threatDesc ? <> – {threatDesc.charAt(0).toLowerCase() + threatDesc.slice(1)}.</> : '.'}
              </p>
              <p className="small muted" style={{ margin: '0 0 8px' }}>
                Hãy tìm cách phòng thủ: di chuyển quân bị tấn công, bảo vệ nó, chặn đường hoặc phản công mạnh hơn.
              </p>
              <button className="btn small" onClick={() => setShowThreat(!showThreat)}>
                {showThreat ? 'Ẩn mũi tên' : '🔴 Chỉ trên bàn cờ'}
              </button>
            </div>
          )}

          {!viewing && !over && coach.hints && turn === playerColor && (
            <div className="coach-card hint-card">
              <h4>💡 Gợi ý</h4>
              {!best ? (
                <div className="small muted">Thầy đang phân tích thế cờ…</div>
              ) : hintLevel === 0 ? (
                <div className="small muted">Bí nước? Bấm để xin gợi ý từng bước – thử tự nghĩ trước nhé!</div>
              ) : hintLevel === 1 ? (
                <p style={{ margin: 0 }}>{hintIdea(bestFacts)}</p>
              ) : (
                <div>
                  <p className="hint-best">
                    Nước tốt nhất: <San san={best.san} white={playerColor === 0} /> <span className="tag green">{evalText(best, turn === 0)}</span>
                  </p>
                  <ul className="hint-why">
                    {hintSections.map((sec) => (
                      <li key={sec.kind} className={'hw-' + sec.kind}>
                        <span className="hw-icon" aria-hidden="true">
                          {sec.icon}
                        </span>
                        <div>
                          <div className="hw-title">{sec.title}</div>
                          <RichText text={sec.text} />
                        </div>
                      </li>
                    ))}
                  </ul>
                  {!deepReady && <div className="small muted hint-wait">⏳ Thầy đang tính thêm: đối thủ sẽ đáp thế nào, có đe dọa hay cái bẫy nào…</div>}
                  {hintPv.length > 1 && <div className="small muted" style={{ marginTop: 8 }}>Diễn biến dự kiến: {hintPv.slice(0, 8).join(' ')}</div>}
                  {currentAnalysis && (
                    <div className="small muted" style={{ marginTop: 6 }}>
                      {currentAnalysis.engine === 'stockfish' ? 'Stockfish 18' : 'Bộ máy Kỳ Đạo'} · độ sâu {currentAnalysis.depth}
                    </div>
                  )}
                </div>
              )}
              {best && hintLevel < 2 && (
                <button className="btn small primary" style={{ marginTop: 10 }} onClick={() => setHintLevel(hintLevel + 1)}>
                  {hintLevel === 0 ? '💡 Xin gợi ý' : '👀 Cho xem nước đi'}
                </button>
              )}
            </div>
          )}

          {!viewing && !over && coach.predictions && turn === botColor && (
            <div className="coach-card">
              <h4>🔮 Dự đoán nước đi của {bot.name}</h4>
              {!predictions.length ? (
                <div className="small muted">Đang đọc suy nghĩ của máy…</div>
              ) : (
                <>
                  {predictions.map((p) => (
                    <div className="pred" key={p.uci}>
                      <San san={p.san} white={botColor === 0} />
                      <div className="pbar">
                        <div style={{ transform: `scaleX(${p.prob / 100})` }} />
                      </div>
                      <span className="pp">{p.prob}%</span>
                      <div className="pdesc">{p.desc}</div>
                    </div>
                  ))}
                  <label className="toggle" style={{ paddingBottom: 0 }}>
                    <input type="checkbox" checked={showPredArrows} onChange={(e) => setShowPredArrows(e.target.checked)} />
                    <span className="sw" />
                    <span className="small">Hiện mũi tên xanh trên bàn cờ</span>
                  </label>
                  <div className="small muted" style={{ marginTop: 6 }}>
                    Máy cấp thấp có thể đi khác dự đoán vì chúng cố tình mắc sai lầm như người mới chơi.
                  </div>
                </>
              )}
            </div>
          )}

          <div className="coach-card">
            <h4>📜 Biên bản ván đấu</h4>
            <MoveList
              sans={game.sans}
              startFen={setup.startFen}
              current={shownPly - 1}
              marks={marks}
              onSelect={(i) => setViewPly(i + 1 === ply ? null : i + 1)}
            />
            {(coach.feedback || over) && (
              <div className="legend" style={{ marginTop: 8 }}>
                {(['brilliant', 'great', 'best', 'book', 'inaccuracy', 'mistake', 'blunder'] as const).map((k) => (
                  <span key={k}>
                    <b style={{ color: CLASS_INFO[k].color }}><ClassSymbol cls={k} /></b> {CLASS_INFO[k].label}
                  </span>
                ))}
              </div>
            )}
            {viewing && (
              <div className="step-controls" style={{ marginTop: 8 }}>
                <button className="btn small" disabled={shownPly <= 0} onClick={() => setViewPly(Math.max(0, shownPly - 1))} title="Nước trước" aria-label="Nước trước">
                  <CaretLeft size={16} weight="fill" aria-hidden="true" />
                </button>
                <button className="btn small" onClick={() => setViewPly(shownPly + 1 >= ply ? null : shownPly + 1)} title="Nước sau" aria-label="Nước sau">
                  <CaretRight size={16} weight="fill" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {modal && ended && (
        <GameOverModal
          ended={ended}
          playerColor={playerColor}
          bot={bot}
          summary={summary}
          pending={pendingReviews}
          onClose={() => setModal(false)}
          onReview={(i) => {
            setModal(false);
            setViewPly(i + 1);
          }}
          onRematch={() => onRestart({ ...setup, playerColor: setup.playerColor === 'w' ? 'b' : 'w' })}
          onNew={onNew}
          onHarder={setup.level < 6 ? () => onRestart({ ...setup, level: setup.level + 1 }) : undefined}
        />
      )}
    </div>
  );
}

function hintIdea(f: ReturnType<typeof analyzeMove> | null): string {
  if (!f) return 'Hãy quan sát kỹ thế cờ.';
  const where = `quân ${piece(f.type)} ở ${f.from}`;
  if (f.mate) return `🎯 Có một đòn chiếu hết! Hãy xem xét ${where}.`;
  if (f.fork) return `⚔️ Có một đòn chĩa đôi! Hãy tìm nước đi của ${where}.`;
  if (f.captured) return `🍽 Có cơ hội bắt quân có lợi. Gợi ý: ${where}.`;
  if (f.check) return `👑 Thử tìm một nước chiếu với ${where}.`;
  if (f.castle) return '🏰 Đã đến lúc đưa Vua về nơi an toàn.';
  if (f.promo) return '👸 Tốt của bạn sắp phong cấp!';
  if (f.targets.length) return `🎯 Hãy tấn công một quân của đối thủ. Gợi ý: ${where}.`;
  if (f.development) return `🚀 Hãy phát triển thêm quân – thử ${where}.`;
  return `🔎 Hãy chú ý ${where}.`;
}

function PlayerFeedback({ reviews, moves, base, playerColor, turn }: { reviews: (MoveReview | null)[]; moves: string[]; base: number; playerColor: Color; turn: Color }) {
  // nước gần nhất của người chơi
  let idx = moves.length - 1;
  if (turn === playerColor) idx -= 1;
  if (idx < base || idx < 0) {
    return (
      <div className="coach-card">
        <h4>🦉 Thầy Cú nhận xét</h4>
        <div className="coach-bubble" style={{ boxShadow: 'none', border: 'none', padding: 0 }}>
          <div className="coach-avatar">🦉</div>
          <div className="small">Chúc bạn chơi tốt! Sau mỗi nước đi, thầy sẽ cho bạn biết nước đó mạnh hay yếu và vì sao. Nhớ nguyên tắc: kiểm soát trung tâm, phát triển quân, nhập thành sớm.</div>
        </div>
      </div>
    );
  }
  const r = reviews[idx];
  if (!r)
    return (
      <div className="coach-card">
        <h4>🦉 Thầy Cú nhận xét</h4>
        <div className="small muted">Đang phân tích nước đi của bạn…</div>
      </div>
    );
  return <ReviewCard review={r} you />;
}

function ReviewCard({ review: r, you }: { review: MoveReview; you: boolean }) {
  const info = CLASS_INFO[r.cls];
  return (
    <div className="coach-card" style={{ borderColor: `color-mix(in srgb, ${info.color} 50%, var(--border))` }}>
      <h4>🦉 {you ? 'Nhận xét nước đi của bạn' : 'Nhận xét nước đi của máy'}</h4>
      <div className="feedback-head">
        <div className="cls-icon" style={{ background: info.color }}>
          <ClassSymbol cls={r.cls} />
        </div>
        <div>
          <div className="fh-title" style={{ color: info.color }}>
            <San san={r.san} white={r.color === 0} /> · {r.headline}
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
          <div className="callout warn" style={{ marginTop: 6 }}>
            <span className="ci">⚠️</span>
            <span>{r.warning}</span>
          </div>
        )}
        {r.best && r.best.pvSan.length > 1 && (r.cls === 'mistake' || r.cls === 'blunder' || r.cls === 'miss' || r.cls === 'inaccuracy') && (
          <div className="small muted" style={{ marginTop: 4 }}>
            Diễn biến tốt hơn: {r.best.pvSan.join(' ')} <span className="tag green">mũi tên xanh khi xem lại</span>
          </div>
        )}
      </div>
    </div>
  );
}

function BotMoveCard({ bot, san, fenBefore, uci, predicted }: { bot: BotProfile; san: string; fenBefore: string; uci: string; predicted: { preds: Prediction[]; idx: number } | null }) {
  const desc = useMemo(() => {
    try {
      const p = new Position(fenBefore);
      const m = p.moveFromUci(uci);
      return m ? describeMove(analyzeMove(p, m)) : '';
    } catch {
      return '';
    }
  }, [fenBefore, uci]);
  const white = fenBefore.split(' ')[1] === 'w';
  return (
    <div className="coach-card">
      <h4>
        {bot.avatar} {bot.name} vừa đi
      </h4>
      <p style={{ margin: 0 }}>
        <San san={san} white={white} /> – {desc}.
      </p>
      {predicted && predicted.preds.length > 0 && (
        <div className="small" style={{ marginTop: 6 }}>
          {predicted.idx >= 0 ? (
            <span className="tag green">🔮 Đúng dự đoán #{predicted.idx + 1} ({predicted.preds[predicted.idx].prob}%)</span>
          ) : (
            <span className="tag amber">🔮 Ngoài dự đoán – máy cấp {bot.level} có thể đi bất ngờ</span>
          )}
        </div>
      )}
    </div>
  );
}

function GameOverModal({
  ended,
  playerColor,
  bot,
  summary,
  pending,
  onClose,
  onReview,
  onRematch,
  onNew,
  onHarder,
}: {
  ended: EndInfo;
  playerColor: Color;
  bot: BotProfile;
  summary: ReturnType<typeof summarize>;
  pending: boolean;
  onClose: () => void;
  onReview: (i: number) => void;
  onRematch: () => void;
  onNew: () => void;
  onHarder?: () => void;
}) {
  const outcome = ended.result === '1/2-1/2' ? 'draw' : (ended.result === '1-0') === (playerColor === 0) ? 'win' : 'loss';
  const acc = Math.round(summary.accuracy);
  const accColor = acc >= 85 ? 'var(--primary)' : acc >= 65 ? 'var(--accent)' : 'var(--danger)';
  const shown: (keyof typeof CLASS_INFO)[] = ['brilliant', 'great', 'best', 'excellent', 'good', 'book', 'inaccuracy', 'mistake', 'miss', 'blunder'];
  const advice =
    outcome === 'win'
      ? onHarder
        ? `Xuất sắc! Bạn đã đánh bại ${bot.name}. Sẵn sàng thử thách cấp ${bot.level + 1} chưa?`
        : 'Không thể tin được – bạn đã đánh bại Rồng Thần! Bạn đã có tố chất của một kiện tướng.'
      : outcome === 'draw'
        ? 'Một ván hòa đáng nể. Xem lại các nước thiếu chính xác để lần sau giành chiến thắng!'
        : 'Thua là cách tốt nhất để học. Hãy xem lại các sai lầm bên dưới – mỗi sai lầm là một bài học.';
  return (
    <div className="modal-back" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="result-big">{outcome === 'win' ? '🏆' : outcome === 'draw' ? '🤝' : bot.avatar}</div>
        <h2 style={{ textAlign: 'center', margin: '10px 0 2px' }}>{outcome === 'win' ? 'Bạn thắng!' : outcome === 'draw' ? 'Hòa cờ' : `${bot.name} thắng`}</h2>
        <p className="muted" style={{ textAlign: 'center' }}>
          {ended.result.replace(/1\/2/g, '½')} · {REASON_TEXT[ended.reason] ?? ended.reason}
        </p>
        <div className="acc-ring" style={{ background: `conic-gradient(${accColor} ${acc * 3.6}deg, var(--bg-2) 0)` }}>
          <div style={{ width: 86, height: 86, borderRadius: '50%', background: 'var(--surface)', display: 'grid', placeItems: 'center' }}>{pending ? '…' : acc + '%'}</div>
        </div>
        <div className="small muted" style={{ textAlign: 'center' }}>
          Độ chính xác của bạn {pending && '(đang tổng hợp…)'}
        </div>
        <div className="cls-counts">
          {shown.map((k) => (
            <div className="cls-count" key={k}>
              <span className="cls-icon" style={{ background: CLASS_INFO[k].color }}>
                <ClassSymbol cls={k} />
              </span>
              {CLASS_INFO[k].label}
              <b>{summary.counts[k]}</b>
            </div>
          ))}
        </div>
        <div className="callout info">
          <span className="ci">🦉</span>
          <span>{advice}</span>
        </div>
        {summary.keyMistakes.length > 0 && (
          <div style={{ marginTop: 14 }}>
            <b>Những khoảnh khắc cần xem lại</b>
            <div style={{ marginTop: 8 }}>
              {summary.keyMistakes.slice(0, 5).map((r) => (
                <button key={r.ply} className="mistake-item" onClick={() => onReview(r.ply)}>
                  <span className="cls-icon" style={{ background: CLASS_INFO[r.cls].color, width: 26, height: 26, fontSize: '0.72rem' }}>
                    <ClassSymbol cls={r.cls} />
                  </span>
                  <span>
                    Nước {Math.floor(r.ply / 2) + 1}: <San san={r.san} white={r.color === 0} /> – {CLASS_INFO[r.cls].label}
                    {r.best && (
                      <span className="muted">
                        {' '}
                        (nên đi <San san={r.best.san} white={r.color === 0} />)
                      </span>
                    )}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="btn-row" style={{ marginTop: 16, justifyContent: 'center' }}>
          <button className="btn" onClick={onClose}>
            🔍 Xem lại ván
          </button>
          <button className="btn" onClick={onRematch}>
            🔁 Đấu lại (đổi màu)
          </button>
          {outcome === 'win' && onHarder && (
            <button className="btn primary" onClick={onHarder}>
              ⬆️ Lên cấp {bot.level + 1}
            </button>
          )}
          <button className="btn" onClick={onNew}>
            ⚙ Đổi đối thủ
          </button>
          <button className="btn ghost" onClick={() => navigate('/hoc')}>
            📚 Ôn bài
          </button>
        </div>
      </div>
    </div>
  );
}

function countPieces(fen: string) {
  const counts: Record<string, number> = {};
  for (const ch of fen.split(' ')[0]) if (/[pnbrqPNBRQ]/.test(ch)) counts[ch] = (counts[ch] ?? 0) + 1;
  return counts;
}

/** Quân đã bị bắt kể từ vị trí bắt đầu ván, và chênh lệch vật chất hiện tại */
function capturedPieces(fen: string, startFen: string) {
  const start = countPieces(startFen);
  const counts = countPieces(fen);
  const val: Record<string, number> = { p: 1, n: 3, b: 3, r: 5, q: 9 };
  const byWhite: string[] = []; // quân Đen bị Trắng bắt
  const byBlack: string[] = [];
  let wMat = 0,
    bMat = 0;
  for (const t of ['q', 'r', 'b', 'n', 'p']) {
    const w = counts[t.toUpperCase()] ?? 0;
    const b = counts[t] ?? 0;
    wMat += w * val[t];
    bMat += b * val[t];
    for (let i = 0; i < Math.max(0, (start[t] ?? 0) - b); i++) byWhite.push('b' + t);
    for (let i = 0; i < Math.max(0, (start[t.toUpperCase()] ?? 0) - w); i++) byBlack.push('w' + t);
  }
  return { byWhite, byBlack, diff: wMat - bMat };
}

