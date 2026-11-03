// Thư viện khai cuộc cờ tướng và trang học một khai cuộc – cùng bố cục với phần cờ vua.
import { useEffect, useRef, useState } from 'react';
import { XQ_OPENINGS } from '../data/openings';
import type { XqOpening } from '../data/types';
import { XqBoard } from '../components/XqBoard';
import { XqMoveList, XqSan, useXqLine, xqSafeLine, useXqMovePurpose, redMovesAt } from '../components/xqCommon';
import { RichText, Stars } from '../../components/common';
import { StepControls, useArrowKeys, moveLabel, GuideBox, PurposeText } from '../../components/LineViewer';
import { href, navigate } from '../../lib/router';
import { useStored } from '../../lib/storage';
import { START_FEN } from '../engine/board';
import { XQ } from './XqLessons';

const FAMILY: Record<XqOpening['family'], { title: string; desc: string }> = {
  'trung-phao': { title: 'Pháo đầu (Trung pháo) và các thế trận Mã', desc: 'Khai cuộc phổ biến nhất: Pháo vào trung lộ uy hiếp Tốt đầu; Đen đáp bằng Bình phong mã, Phản cung mã, Đơn đề mã…' },
  'thuan-nghich': { title: 'Thuận pháo và Nghịch pháo', desc: 'Đen cũng vào Pháo đầu để phản công – những trận đấu quyết liệt ngay từ khai cuộc.' },
  'tien-nhan': { title: 'Tiên nhân chỉ lộ', desc: 'Tiến Tốt 3 hoặc 7 để thăm dò: mềm dẻo, giàu biến hóa, chờ đối phương lộ ý đồ.' },
  'phi-tuong': { title: 'Phi tượng và Sĩ giác pháo', desc: 'Khai cuộc vững chắc: củng cố trung lộ trước, phản công sau.' },
  khac: { title: 'Khởi mã, Quá cung pháo và các khai cuộc khác', desc: 'Những lựa chọn ít phổ biến hơn nhưng giàu ý tưởng chiến lược.' },
};

function firstMoves(o: XqOpening, plies = 6) {
  const line = xqSafeLine(o.moves);
  const n = Math.min(plies, line.sans.length);
  let s = '';
  for (let i = 0; i < n; i++) s += (i % 2 === 0 ? `${i / 2 + 1}. ` : '') + line.sans[i] + ' ';
  return { text: s.trim(), fen: line.fens[n] };
}

export function XqOpenings() {
  const [side, setSide] = useState<'all' | 'red' | 'black'>('all');
  const [seen] = useStored<string[]>('xq-seen-openings', []);
  const list = XQ_OPENINGS.filter((o) => side === 'all' || o.forSide === side);
  return (
    <div>
      <div className="page-head">
        <h1>📜 Thư viện khai cuộc cờ tướng</h1>
        <p>
          Mỗi khai cuộc có diễn biến chính với lời giảng cho <b>từng nước đi</b>, ý tưởng của hai bên, kế hoạch trung cuộc điển hình, các biến quan trọng và những cái bẫy thường gặp. Đừng học thuộc lòng – hãy hiểu vì sao có nước đi đó.
        </p>
      </div>
      <div className="tabs">
        {(
          [
            ['all', 'Tất cả'],
            ['red', '🔴 Cho bên Đỏ'],
            ['black', '⚫ Cho bên Đen'],
          ] as const
        ).map(([k, label]) => (
          <button key={k} className={'tab' + (side === k ? ' active' : '')} onClick={() => setSide(k)}>
            {label}
          </button>
        ))}
      </div>
      {(Object.keys(FAMILY) as XqOpening['family'][]).map((fam) => {
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
                  <a key={o.id} className="game-card" href={href(XQ + '/khai-cuoc/' + o.id)}>
                    <div className="gc-board">
                      <XqBoard fen={fm.fen} showCoords={false} orientation={o.forSide === 'black' ? 'black' : 'red'} />
                      <div>
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 4 }}>
                          <span className="tag">{o.nameHan}</span>
                          <span className={'tag ' + (o.forSide === 'red' ? 'red' : 'blue')}>Cho {o.forSide === 'red' ? 'Đỏ' : 'Đen'}</span>
                          {seen.includes(o.id) && <span className="tag green">✓ Đã xem</span>}
                        </div>
                        <h3 style={{ margin: '4px 0 0' }}>{o.name}</h3>
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
      {!XQ_OPENINGS.length && <div className="empty-state">Nội dung khai cuộc đang được biên soạn…</div>}
    </div>
  );
}

type LineSel = { kind: 'main' } | { kind: 'var'; i: number } | { kind: 'trap'; i: number };

export function XqOpeningPage({ id }: { id: string }) {
  const o = XQ_OPENINGS.find((x) => x.id === id);
  const stageRef = useRef<HTMLDivElement>(null);
  const [sel, setSelRaw] = useState<LineSel>({ kind: 'main' });
  const [ply, setPlyRaw] = useState(0);
  const [, setSeen] = useStored<string[]>('xq-seen-openings', []);
  useEffect(() => {
    setSelRaw({ kind: 'main' });
    setPlyRaw(0);
    if (o) setSeen((old) => (old.includes(o.id) ? old : [...old, o.id]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const mainLine = useXqLine(o?.moves);
  const linesOf = (x: LineSel) => (!o ? '' : x.kind === 'main' ? o.moves : x.kind === 'var' ? o.variations[x.i].moves : o.traps[x.i].moves);
  const movesText = linesOf(sel);
  const line = useXqLine(movesText);
  const setPly = (p: number) => setPlyRaw(Math.max(0, Math.min(line.sans.length, p)));
  const purpose = useXqMovePurpose(line, ply);
  useArrowKeys(ply, line.sans.length, setPly);
  const setSel = (x: LineSel, at?: number) => {
    setSelRaw(x);
    if (at !== undefined) return setPlyRaw(at);
    const l = xqSafeLine(linesOf(x));
    let i = 0;
    if (x.kind !== 'main') while (i < l.ucis.length && i < mainLine.ucis.length && l.ucis[i] === mainLine.ucis[i]) i++;
    setPlyRaw(i);
  };

  if (!o)
    return (
      <div className="empty-state">
        Không tìm thấy khai cuộc. <a href={href(XQ + '/khai-cuoc')}>Quay lại</a>
      </div>
    );

  const orientation = o.forSide === 'black' ? 'black' : 'red';
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
    navigate(`${XQ}/luyen-tap?moves=${mainLine.ucis.join(',')}&side=${o.forSide === 'black' ? 'b' : 'w'}`);
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
        <a href={href(XQ + '/khai-cuoc')}>Khai cuộc cờ tướng</a> › {o.name}
      </div>
      <div className="stage-head">
        <div>
          <h1>{o.name}</h1>
          <div className="meta">
            <span className="muted small">{o.nameHan}</span>
            <span className={'tag ' + (o.forSide === 'red' ? 'red' : 'blue')}>Phù hợp cho {o.forSide === 'red' ? 'Đỏ' : 'Đen'}</span>
            <Stars n={o.difficulty} />
          </div>
        </div>
        <button className="btn" onClick={practice}>
          🎯 Luyện khai cuộc này với máy
        </button>
      </div>

      <div className="stage xq" ref={stageRef}>
        <div className="stage-board">
          <XqBoard fen={line.fens[ply]} orientation={orientation} lastMove={ply > 0 ? line.ucis[ply - 1] : null} />
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
                  {moveLabel(START_FEN, ply - 1)} <XqSan san={line.sans[ply - 1]} red={redMovesAt(START_FEN, ply - 1)} />
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
          <XqMoveList sans={line.sans} current={ply - 1} onSelect={(i) => setPly(i + 1)} />
          {sel.kind !== 'main' && (
            <button className="btn small ghost" onClick={() => setSel({ kind: 'main' })}>
              ↩ Về diễn biến chính
            </button>
          )}
        </div>
      </div>

      <section className="knowledge">
        <h2>📚 Kiến thức chung về khai cuộc</h2>
        <div className="knowledge-grid">
          <div className="card">
            <RichText text={o.summary} />
          </div>
          <div className="two-col">
            <div className="card">
              <h3 className="side-chip xr">Ý tưởng của Đỏ</h3>
              <ul className="idea-list">
                {o.ideasRed.map((x, i) => (
                  <li key={i}>
                    <RichText text={x} />
                  </li>
                ))}
              </ul>
            </div>
            <div className="card">
              <h3 className="side-chip xb">Ý tưởng của Đen</h3>
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
                <b>Các kỳ thủ nổi tiếng sử dụng khai cuộc này:</b> {o.famousPlayers.join(', ')}
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
