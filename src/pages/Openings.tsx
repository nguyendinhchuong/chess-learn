import { useEffect, useRef, useState } from 'react';
import { OPENINGS } from '../data/openings';
import type { Opening } from '../data/types';
import { Board } from '../components/Board';
import { MoveList, RichText, San, Stars } from '../components/common';
import { StepControls, useLine, useArrowKeys, moveLabel, safeLine, GuideBox, useMovePurpose, PurposeText } from '../components/LineViewer';
import { href, navigate } from '../lib/router';
import { useStored } from '../lib/storage';
import { START_FEN } from '../engine/board';

const FAMILY: Record<Opening['family'], { title: string; desc: string }> = {
  e4: { title: 'Khai cuộc Tốt Vua (1.e4)', desc: 'Thế cờ mở, nhiều chiến thuật – rất tốt để rèn khả năng tấn công.' },
  d4: { title: 'Khai cuộc Tốt Hậu (1.d4)', desc: 'Thế cờ đóng hơn, giàu ý tưởng chiến lược và cấu trúc tốt.' },
  flank: { title: 'Khai cuộc cánh (1.c4, 1.Nf3…)', desc: 'Kiểm soát trung tâm từ xa, linh hoạt chuyển đổi hệ thống.' },
};

function firstMoves(o: Opening, plies = 6) {
  const line = safeLine(o.moves);
  const n = Math.min(plies, line.sans.length);
  let s = '';
  for (let i = 0; i < n; i++) s += (i % 2 === 0 ? `${i / 2 + 1}.` : '') + line.sans[i] + ' ';
  return { text: s.trim(), fen: line.fens[n] };
}

export function Openings() {
  const [side, setSide] = useState<'all' | 'white' | 'black'>('all');
  const [seen] = useStored<string[]>('seen-openings', []);
  const list = OPENINGS.filter((o) => side === 'all' || o.forSide === side);
  return (
    <div>
      <div className="page-head">
        <h1>♟️ Thư viện khai cuộc</h1>
        <p>
          Mỗi khai cuộc có diễn biến chính với lời giảng cho <b>từng nước đi</b>, ý tưởng của hai bên, kế hoạch trung cuộc điển hình, các biến quan trọng và những cái bẫy nổi tiếng. Đừng học thuộc lòng – hãy hiểu vì sao có nước đi đó.
        </p>
      </div>
      <div className="tabs">
        {(
          [
            ['all', 'Tất cả'],
            ['white', '⬜ Cho bên Trắng'],
            ['black', '⬛ Cho bên Đen'],
          ] as const
        ).map(([k, label]) => (
          <button key={k} className={'tab' + (side === k ? ' active' : '')} onClick={() => setSide(k)}>
            {label}
          </button>
        ))}
      </div>
      {(Object.keys(FAMILY) as Opening['family'][]).map((fam) => {
        const items = list.filter((o) => o.family === fam);
        if (!items.length) return null;
        return (
          <section key={fam} style={{ marginBottom: 30 }}>
            <div className="section-title" style={{ marginTop: 10 }}>
              <div>
                <h2 style={{ marginBottom: 2 }}>{FAMILY[fam].title}</h2>
                <div className="muted small">{FAMILY[fam].desc}</div>
              </div>
            </div>
            <div className="grid cols-2">
              {items.map((o) => {
                const fm = firstMoves(o);
                return (
                  <a key={o.id} className="game-card" href={href('/khai-cuoc/' + o.id)}>
                    <div className="gc-board">
                      <Board fen={fm.fen} showCoords={false} orientation={o.forSide === 'black' ? 'black' : 'white'} />
                      <div>
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 4 }}>
                          <span className="tag">{o.eco}</span>
                          <span className={'tag ' + (o.forSide === 'white' ? 'amber' : 'blue')}>Cho {o.forSide === 'white' ? 'Trắng' : 'Đen'}</span>
                          {seen.includes(o.id) && <span className="tag green">✓ Đã xem</span>}
                        </div>
                        <h3 style={{ margin: '4px 0 0' }}>{o.name}</h3>
                        <div className="small muted">{o.nameEn}</div>
                        <div className="line-moves">{fm.text}</div>
                        <Stars n={o.difficulty} />
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </section>
        );
      })}
      {!OPENINGS.length && <div className="empty-state">Nội dung khai cuộc đang được biên soạn…</div>}
    </div>
  );
}

type LineSel = { kind: 'main' } | { kind: 'var'; i: number } | { kind: 'trap'; i: number };

export function OpeningPage({ id }: { id: string }) {
  const o = OPENINGS.find((x) => x.id === id);
  const stageRef = useRef<HTMLDivElement>(null);
  const [sel, setSelRaw] = useState<LineSel>({ kind: 'main' });
  const [ply, setPlyRaw] = useState(0);
  const [, setSeen] = useStored<string[]>('seen-openings', []);
  useEffect(() => {
    setSelRaw({ kind: 'main' });
    setPlyRaw(0);
    if (o) setSeen((old) => (old.includes(o.id) ? old : [...old, o.id]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const mainLine = useLine(o?.moves);
  const linesOf = (x: LineSel) => (!o ? '' : x.kind === 'main' ? o.moves : x.kind === 'var' ? o.variations[x.i].moves : o.traps[x.i].moves);
  const movesText = linesOf(sel);
  const line = useLine(movesText);
  const setPly = (p: number) => setPlyRaw(Math.max(0, Math.min(line.sans.length, p)));
  const purpose = useMovePurpose(line, ply);
  useArrowKeys(ply, line.sans.length, setPly);
  /** Chọn một diễn biến; mặc định bắt đầu ở điểm rẽ nhánh khỏi diễn biến chính */
  const setSel = (x: LineSel, at?: number) => {
    setSelRaw(x);
    if (at !== undefined) return setPlyRaw(at);
    const l = safeLine(linesOf(x));
    let i = 0;
    if (x.kind !== 'main') while (i < l.ucis.length && i < mainLine.ucis.length && l.ucis[i] === mainLine.ucis[i]) i++;
    setPlyRaw(i);
  };

  if (!o) return <div className="empty-state">Không tìm thấy khai cuộc. <a href={href('/khai-cuoc')}>Quay lại</a></div>;

  const orientation = o.forSide === 'black' ? 'black' : 'white';
  const note =
    sel.kind === 'main'
      ? ply > 0
        ? o.moveNotes[ply - 1]
        : o.summary
      : sel.kind === 'var'
        ? o.variations[sel.i].comment
        : ply >= line.sans.length
          ? o.traps[sel.i].explanation
          : `Bẫy “${o.traps[sel.i].name}”: bấm ▶ để xem diễn biến, lời giải thích ở nước cuối.`;
  const lineTitle = sel.kind === 'main' ? 'Diễn biến chính' : sel.kind === 'var' ? `Biến: ${o.variations[sel.i].name}` : `Bẫy: ${o.traps[sel.i].name}`;

  const practice = () => {
    const ucis = mainLine.ucis.join(',');
    navigate(`/luyen-tap?moves=${ucis}&side=${o.forSide === 'black' ? 'b' : 'w'}`);
  };

  const selValue = sel.kind === 'main' ? 'main' : `${sel.kind}:${sel.i}`;
  const pickLine = (v: string, scroll = false) => {
    if (v === 'main') setSel({ kind: 'main' });
    else {
      const [k, i] = v.split(':');
      setSel({ kind: k as 'var' | 'trap', i: Number(i) });
    }
    if (scroll) stageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div>
      <div className="breadcrumb">
        <a href={href('/khai-cuoc')}>Khai cuộc</a> › {o.name}
      </div>
      <div className="stage-head">
        <div>
          <h1>{o.name}</h1>
          <div className="meta">
            <span className="muted small">{o.nameEn}</span>
            <span className="tag">ECO {o.eco}</span>
            <span className={'tag ' + (o.forSide === 'white' ? 'amber' : 'blue')}>Phù hợp cho {o.forSide === 'white' ? 'Trắng' : 'Đen'}</span>
            <Stars n={o.difficulty} />
          </div>
        </div>
        <button className="btn" onClick={practice}>
          🎯 Luyện khai cuộc này với máy
        </button>
      </div>

      {/* Trung tâm: bàn cờ và lời giảng từng nước */}
      <div className="stage" ref={stageRef}>
        <div className="stage-board">
          <Board fen={line.fens[ply]} orientation={orientation} lastMove={ply > 0 ? line.ucis[ply - 1] : null} />
        </div>
        <div className="stage-panel">
          <label className="line-select">
            Đang xem:
            <select value={selValue} onChange={(e) => pickLine(e.target.value)} aria-label="Chọn diễn biến">
              <option value="main">📜 Diễn biến chính ({mainLine.sans.length} nửa nước)</option>
              {o.variations.length > 0 && (
                <optgroup label="Các biến">
                  {o.variations.map((v, i) => (
                    <option key={i} value={`var:${i}`}>
                      🌿 {v.name}
                    </option>
                  ))}
                </optgroup>
              )}
              {o.traps.length > 0 && (
                <optgroup label="Bẫy khai cuộc">
                  {o.traps.map((t, i) => (
                    <option key={i} value={`trap:${i}`}>
                      🪤 {t.name}
                    </option>
                  ))}
                </optgroup>
              )}
            </select>
          </label>
          <GuideBox stepKey={`${movesText}|${ply}`} accent={sel.kind === 'trap'}>
            <div className="guide-head">
              <span className={'tag ' + (sel.kind === 'trap' ? 'red' : sel.kind === 'var' ? 'blue' : 'green')}>{lineTitle}</span>
              {ply > 0 && (
                <span className="note-move">
                  {moveLabel(START_FEN, ply - 1)} <San san={line.sans[ply - 1]} white={(ply - 1) % 2 === 0} />
                </span>
              )}
            </div>
            {ply === 0 ? (
              sel.kind === 'main' ? (
                <span className="muted">Vị trí ban đầu. Bấm ▶ (hoặc phím →) để đi nước đầu tiên – lời giảng của từng nước sẽ hiện ngay tại đây.</span>
              ) : (
                note && <RichText text={note} />
              )
            ) : sel.kind === 'main' ? (
              o.moveNotes[ply - 1]?.trim() ? <RichText text={o.moveNotes[ply - 1]} /> : <PurposeText text={purpose} />
            ) : (
              <>
                <PurposeText text={purpose} />
                {(sel.kind === 'var' || ply >= line.sans.length) && note && (
                  <div className="guide-context">
                    <b>{sel.kind === 'var' ? '🌿 Ý tưởng của biến: ' : '🪤 Vì sao đây là cái bẫy: '}</b>
                    <RichText text={note} />
                  </div>
                )}
              </>
            )}
          </GuideBox>
          <StepControls ply={ply} count={line.sans.length} setPly={setPly} />
          <MoveList sans={line.sans} current={ply - 1} onSelect={(i) => setPly(i + 1)} />
          {sel.kind !== 'main' && (
            <button className="btn small ghost" onClick={() => setSel({ kind: 'main' })}>
              ↩ Về diễn biến chính
            </button>
          )}
        </div>
      </div>

      {/* Kiến thức chung: đặt bên dưới để không làm phân tán khi học từng nước */}
      <section className="knowledge">
        <h2>📚 Kiến thức chung về khai cuộc</h2>
        <div className="knowledge-grid">
          <div className="card">
            <RichText text={o.summary} />
          </div>
          <div className="two-col">
            <div className="card">
              <h3 className="side-chip w">Ý tưởng của Trắng</h3>
              <ul className="idea-list">
                {o.ideasWhite.map((x, i) => (
                  <li key={i}>
                    <RichText text={x} />
                  </li>
                ))}
              </ul>
            </div>
            <div className="card">
              <h3 className="side-chip b">Ý tưởng của Đen</h3>
              <ul className="idea-list">
                {o.ideasBlack.map((x, i) => (
                  <li key={i}>
                    <RichText text={x} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="card">
            <h3>🧭 Kế hoạch trung cuộc điển hình</h3>
            <ul className="idea-list">
              {o.typicalPlans.map((x, i) => (
                <li key={i}>
                  <RichText text={x} />
                </li>
              ))}
            </ul>
          </div>
          {o.famousPlayers.length > 0 && (
            <div className="callout info">
              <span className="ci">🏅</span>
              <div>
                <b>Các kỳ thủ nổi tiếng chơi khai cuộc này:</b> {o.famousPlayers.join(', ')}
              </div>
            </div>
          )}
          {o.variations.length > 0 && (
            <div>
              <h3>🌿 Các biến quan trọng</h3>
              {o.variations.map((v, i) => (
                <div key={i} className={'line-item' + (sel.kind === 'var' && sel.i === i ? ' active' : '')} onClick={() => pickLine(`var:${i}`, true)}>
                  <b>🌿 {v.name}</b> <span className="small muted">– bấm để xem trên bàn cờ</span>
                  <div className="line-moves">{v.moves}</div>
                  <RichText text={v.comment} className="small" />
                </div>
              ))}
            </div>
          )}
          {o.traps.length > 0 && (
            <div>
              <h3>🪤 Bẫy khai cuộc</h3>
              {o.traps.map((t, i) => (
                <div key={i} className={'line-item' + (sel.kind === 'trap' && sel.i === i ? ' active' : '')} onClick={() => pickLine(`trap:${i}`, true)}>
                  <b>🪤 {t.name}</b> <span className="small muted">– bấm để xem trên bàn cờ</span>
                  <div className="line-moves">{t.moves}</div>
                  <RichText text={t.explanation} className="small" />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
