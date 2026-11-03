import { useEffect, useMemo, useState } from 'react';
import { GAMES, ERAS, eraOf } from '../data/games/index';
import { GAME_TAGS } from '../data/types';
import type { ClassicGame, GameTag } from '../data/types';
import { MiniBoard } from '../components/MiniBoard';
import { normalizeVi } from '../lib/text';
import { plyFromKey } from '../data/validate';
import { Board, BoardArrow } from '../components/Board';
import { EvalBar, MoveList, RichText, San, Stars } from '../components/common';
import { StepControls, useArrowKeys, useLine, moveLabel, GuideBox, safeLine, useMovePurpose, PurposeText } from '../components/LineViewer';
import { href, navigate } from '../lib/router';
import { useStored } from '../lib/storage';
import { START_FEN } from '../engine/board';
import { requestAnalysis } from '../engine/client';
import type { AnalysisResult } from '../engine/protocol';
import { evalText, whiteWin } from '../engine/coach';
import { playMoveSound } from '../lib/sound';

const RESULT_TEXT: Record<string, string> = { '1-0': 'Trắng thắng', '0-1': 'Đen thắng', '1/2-1/2': 'Hòa' };

type ResultFilter = 'all' | '1-0' | '0-1' | '1/2-1/2';

/** Thế cờ cuối của từng ván (tính một lần, dùng cho ảnh thu nhỏ) */
const finalCache = new Map<string, { fen: string; last: string | null; plies: number }>();
function finalOf(g: ClassicGame) {
  let v = finalCache.get(g.id);
  if (!v) {
    const line = safeLine(g.moves);
    v = { fen: line.fens[line.fens.length - 1], last: line.ucis[line.ucis.length - 1] ?? null, plies: line.sans.length };
    finalCache.set(g.id, v);
  }
  return v;
}

export function Games() {
  const [seen] = useStored<string[]>('seen-games', []);
  const [era, setEra] = useStored<string>('games-era', 'all');
  const [q, setQ] = useState('');
  const [tag, setTag] = useState<GameTag | null>(null);
  const [result, setResult] = useState<ResultFilter>('all');

  const list = useMemo(() => {
    const nq = normalizeVi(q.trim());
    return GAMES.filter(
      (g) =>
        (era === 'all' || eraOf(g).id === era) &&
        (!tag || g.tags?.includes(tag)) &&
        (result === 'all' || g.result === result) &&
        (!nq || normalizeVi(`${g.title} ${g.white} ${g.black} ${g.event} ${g.opening} ${g.year}`).includes(nq)),
    );
  }, [era, q, tag, result]);

  const usedTags = useMemo(() => GAME_TAGS.filter((t) => GAMES.some((g) => g.tags?.includes(t))), []);
  const filtering = !!q.trim() || !!tag || result !== 'all';
  const sections = (era === 'all' ? ERAS : ERAS.filter((e) => e.id === era)).map((e) => ({ era: e, games: list.filter((g) => eraOf(g).id === e.id) }));

  const random = () => {
    const pool = list.length ? list : GAMES;
    navigate('/van-co/' + pool[Math.floor(Math.random() * pool.length)].id);
  };

  return (
    <div>
      <div className="page-head">
        <h1>🏆 Những ván cờ kinh điển</h1>
        <p>
          {GAMES.length} kiệt tác từ thế kỷ 17 đến ngày nay. Mỗi nước đi đều có lời giải thích mục đích; ván cờ còn có bối cảnh, khoảnh khắc then chốt và những bài học bạn có thể áp dụng ngay.
        </p>
      </div>

      <div className="games-filters card tight">
        <div className="tabs" style={{ marginBottom: 10 }}>
          <button className={'tab' + (era === 'all' ? ' active' : '')} onClick={() => setEra('all')}>
            Tất cả <span className="count">{GAMES.length}</span>
          </button>
          {ERAS.map((e) => (
            <button key={e.id} className={'tab' + (era === e.id ? ' active' : '')} onClick={() => setEra(e.id)} title={e.years}>
              {e.icon} {e.title} <span className="count">{GAMES.filter((g) => eraOf(g).id === e.id).length}</span>
            </button>
          ))}
        </div>
        <div className="filter-row">
          <input className="search" placeholder="Tìm kỳ thủ, giải đấu, khai cuộc… (vd: Tal, Carlsen, Sicilia)" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Tìm ván cờ" />
          <select className="filter-select" value={result} onChange={(e) => setResult(e.target.value as ResultFilter)} aria-label="Lọc theo kết quả">
            <option value="all">Mọi kết quả</option>
            <option value="1-0">Trắng thắng</option>
            <option value="0-1">Đen thắng</option>
            <option value="1/2-1/2">Hòa</option>
          </select>
          <button className="btn small" onClick={random}>
            🎲 Ván ngẫu nhiên
          </button>
        </div>
        <div className="tag-row">
          {usedTags.map((t) => (
            <button key={t} className={'chip' + (tag === t ? ' active' : '')} onClick={() => setTag(tag === t ? null : t)}>
              {t}
            </button>
          ))}
          {(filtering || era !== 'all') && (
            <button
              className="chip clear"
              onClick={() => {
                setQ('');
                setTag(null);
                setResult('all');
                setEra('all');
              }}
            >
              ✕ Bỏ lọc
            </button>
          )}
        </div>
      </div>

      <div className="small muted" style={{ margin: '12px 2px' }} aria-live="polite">
        Hiển thị {list.length} / {GAMES.length} ván
      </div>

      {sections.map(({ era: e, games }) =>
        games.length ? (
          <section key={e.id} className="era-section">
            <div className="era-head">
              <span className="era-icon">{e.icon}</span>
              <div>
                <h2>
                  {e.title} <span className="muted small">· {e.years}</span>
                </h2>
                <div className="muted small">{e.description}</div>
              </div>
              <span className="tag">{games.length} ván</span>
            </div>
            <div className="grid cols-3">
              {games.map((g) => (
                <GameCard key={g.id} g={g} seen={seen.includes(g.id)} />
              ))}
            </div>
          </section>
        ) : null,
      )}
      {!list.length && <div className="empty-state">Không tìm thấy ván cờ phù hợp. Thử bỏ bớt bộ lọc nhé.</div>}
    </div>
  );
}

function GameCard({ g, seen }: { g: ClassicGame; seen: boolean }) {
  const f = finalOf(g);
  return (
    <a className="game-card compact" href={href('/van-co/' + g.id)}>
      <div className="gc-board">
        <MiniBoard fen={f.fen} orientation={g.orientation ?? 'white'} lastMove={f.last} label={`Thế cờ cuối ván ${g.title}`} />
        <div style={{ minWidth: 0 }}>
          <div className="gc-meta">
            <span className="tag">{g.year}</span>
            <span className="result-pill">{g.result.replace(/1\/2/g, '½')}</span>
            {seen && <span className="tag green">✓ Đã xem</span>}
          </div>
          <h3>{g.title}</h3>
          <div className="players">
            ⬜ {g.white}
            <br />⬛ {g.black}
          </div>
          <div className="small muted gc-event">
            {g.event} · {Math.ceil(f.plies / 2)} nước
          </div>
          <div className="gc-foot">
            <Stars n={g.difficulty} />
            {(g.tags ?? []).slice(0, 2).map((t) => (
              <span key={t} className="mini-tag">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </a>
  );
}

export function GamePage({ id }: { id: string }) {
  const g = GAMES.find((x) => x.id === id);
  const line = useLine(g?.moves);
  const count = line.sans.length;
  const [ply, setPlyRaw] = useState(0);
  const [auto, setAuto] = useState(false);
  const [flip, setFlip] = useState(false);
  const [engine, setEngine] = useState(false);
  const [analysis, setAnalysis] = useState<Record<number, AnalysisResult>>({});
  const [, setSeen] = useStored<string[]>('seen-games', []);

  const setPly = (p: number) => {
    const np = Math.max(0, Math.min(count, p));
    if (np === ply + 1 && np > 0) playMoveSound(line.sans[np - 1]);
    setPlyRaw(np);
  };
  useArrowKeys(ply, count, setPly);
  const purpose = useMovePurpose(line, ply);

  useEffect(() => {
    setPlyRaw(0);
    setAuto(false);
    setAnalysis({});
    if (g) setSeen((old) => (old.includes(g.id) ? old : [...old, g.id]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (!auto) return;
    if (ply >= count) {
      setAuto(false);
      return;
    }
    const t = setTimeout(() => setPly(ply + 1), 1500);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auto, ply, count]);

  useEffect(() => {
    if (!engine || analysis[ply]) return;
    let alive = true;
    requestAnalysis(START_FEN, line.ucis.slice(0, ply), { multiPV: 1, timeMs: 700, channel: 'viewer' }).then((r) => {
      if (alive && r) setAnalysis((a) => ({ ...a, [ply]: r }));
    });
    return () => {
      alive = false;
    };
  }, [engine, ply, line, analysis]);

  const annotations = useMemo(() => {
    const map = new Map<number, string>();
    if (g) for (const [k, v] of Object.entries(g.annotations)) map.set(plyFromKey(k) - 1, v);
    return map;
  }, [g]);
  const keyPlies = useMemo(() => (g ? g.keyMoments.map((k) => plyFromKey(k)) : []), [g]);

  if (!g) return <div className="empty-state">Không tìm thấy ván cờ. <a href={href('/van-co')}>Quay lại</a></div>;

  const orientation = (g.orientation ?? 'white') === 'white' ? (flip ? 'black' : 'white') : flip ? 'white' : 'black';
  const a = analysis[ply];
  const win = engine ? whiteWin(a) : null;
  const arrows: BoardArrow[] = [];
  if (engine && a?.lines[0] && ply < count) arrows.push({ from: a.lines[0].uci.slice(0, 2), to: a.lines[0].uci.slice(2, 4), color: 'blue', opacity: 0.6 });
  const note = ply > 0 ? annotations.get(ply - 1) : undefined;
  const isKey = keyPlies.includes(ply);

  return (
    <div>
      <div className="breadcrumb">
        <a href={href('/van-co')}>Ván kinh điển</a> › {g.title}
      </div>
      <div className="stage-head">
        <div>
          <h1>{g.title}</h1>
          <div className="meta">
            <span className="small">
              ⬜ <b>{g.white}</b> &nbsp;vs&nbsp; ⬛ <b>{g.black}</b>
            </span>
            <span className="tag">
              {g.event} · {g.year}
            </span>
            <span className="tag amber">{RESULT_TEXT[g.result]}</span>
            <Stars n={g.difficulty} />
          </div>
        </div>
        <div className="stage-head-side">
          <div className="small muted">Khai cuộc: {g.opening}</div>
          <div className="small muted">
            {eraOf(g).icon} {eraOf(g).title}
            {(g.tags ?? []).map((t) => (
              <span key={t} className="mini-tag" style={{ marginLeft: 6 }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Trung tâm: bàn cờ và lời bình từng nước */}
      <div className="stage">
        <div className="stage-board">
          <div className="board-wrap">
            {engine && <EvalBar win={win} text={a ? evalText(a.lines[0], a.fen.split(' ')[1] === 'w') : ''} orientation={orientation} />}
            <Board fen={line.fens[ply]} orientation={orientation} lastMove={ply > 0 ? line.ucis[ply - 1] : null} arrows={arrows} />
          </div>
        </div>
        <div className="stage-panel">
          <GuideBox stepKey={ply} accent={isKey}>
            {ply === 0 ? (
              <>
                <div className="guide-head">
                  <b>♟ Ván cờ bắt đầu</b>
                </div>
                <span className="muted">Bấm ▶ (hoặc phím →) để đi từng nước – mục đích của mỗi nước sẽ được giải thích ngay tại đây.</span>
              </>
            ) : (
              <>
                <div className="guide-head">
                  <b>
                    {moveLabel(START_FEN, ply - 1)} <San san={line.sans[ply - 1]} white={(ply - 1) % 2 === 0} />
                  </b>
                  {isKey && <span className="tag amber">⭐ Khoảnh khắc then chốt</span>}
                  {engine && a?.lines[0] && <span className="tag blue">Máy: {evalText(a.lines[0], a.fen.split(' ')[1] === 'w')}</span>}
                </div>
                {note?.trim() ? <RichText text={note} /> : <PurposeText text={purpose} />}
                {ply === count && (
                  <div className="callout good">
                    <span className="ci">🏁</span>
                    <div>
                      Kết quả: <b>{RESULT_TEXT[g.result]}</b>. Xem phần “Bài học rút ra” bên dưới.
                    </div>
                  </div>
                )}
              </>
            )}
          </GuideBox>
          <StepControls
            ply={ply}
            count={count}
            setPly={setPly}
            extra={
              <>
                <button className={'btn small' + (auto ? ' accent' : '')} onClick={() => setAuto(!auto)} title="Tự động chạy">
                  {auto ? '⏸' : '⏯'}
                </button>
                <button className="btn small" onClick={() => setFlip(!flip)} title="Lật bàn cờ">
                  🔄
                </button>
              </>
            }
          />
          {keyPlies.length > 0 && (
            <div className="key-moments" aria-label="Khoảnh khắc then chốt">
              <span className="small muted" style={{ fontWeight: 700, alignSelf: 'center' }}>
                ⭐
              </span>
              {g.keyMoments.map((k) => {
                const p = plyFromKey(k);
                return (
                  <button key={k} className={'btn small' + (ply === p ? ' primary' : '')} onClick={() => setPlyRaw(p)} title="Khoảnh khắc then chốt">
                    {moveLabel(START_FEN, p - 1)} <San san={line.sans[p - 1] ?? ''} white={(p - 1) % 2 === 0} />
                  </button>
                );
              })}
            </div>
          )}
          <MoveList sans={line.sans} current={ply - 1} onSelect={(i) => setPlyRaw(i + 1)} noted={new Set(keyPlies.map((p) => p - 1))} notedIcon="⭐" notedTitle="Khoảnh khắc then chốt" />
          <label className="toggle" style={{ padding: 0 }} title="Thanh tỉ lệ thắng và mũi tên xanh gợi ý nước mạnh nhất">
            <input type="checkbox" checked={engine} onChange={(e) => setEngine(e.target.checked)} />
            <span className="sw" />
            <span>
              <b>Bật máy phân tích</b>
              <span className="desc">Thanh tỉ lệ thắng và mũi tên xanh gợi ý nước mạnh nhất.</span>
            </span>
          </label>
        </div>
      </div>

      {/* Kiến thức chung về ván đấu: đặt bên dưới */}
      <section className="knowledge">
        <h2>📖 Câu chuyện ván đấu</h2>
        <div className="knowledge-grid">
          <div className="two-col">
            <div className="card">
              <h3>Bối cảnh</h3>
              <RichText text={g.context} />
            </div>
            <div className="card">
              <h3>Diễn biến</h3>
              <RichText text={g.summary} />
            </div>
          </div>
          <div className="takeaways">
            <h2>🎓 Bài học rút ra</h2>
            <ul>
              {g.lessons.map((l, i) => (
                <li key={i}>
                  <RichText text={l} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {g.source && (
        <p className="small muted" style={{ marginTop: 18 }}>
          📄 Biên bản đã được đối chiếu với nguồn:{' '}
          <a href={g.source} target="_blank" rel="noopener noreferrer">
            {new URL(g.source).hostname.replace(/^www\./, '')}
          </a>
        </p>
      )}
      <GameNav id={g.id} />
    </div>
  );
}

/** Chuyển sang ván trước / ván sau theo dòng thời gian */
function GameNav({ id }: { id: string }) {
  const i = GAMES.findIndex((x) => x.id === id);
  const prev = GAMES[i - 1];
  const next = GAMES[i + 1];
  const label = (g: ClassicGame) => (g.title.includes(String(g.year)) ? g.title : `${g.title} (${g.year})`);
  return (
    <nav className="game-nav" aria-label="Ván khác">
      {prev ? (
        <a className="btn" href={href('/van-co/' + prev.id)}>
          ← {label(prev)}
        </a>
      ) : (
        <span />
      )}
      {next && (
        <a className="btn" href={href('/van-co/' + next.id)}>
          {label(next)} →
        </a>
      )}
    </nav>
  );
}
