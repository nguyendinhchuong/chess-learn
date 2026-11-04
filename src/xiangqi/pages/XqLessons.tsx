// Thư viện bài học và trang bài học cờ tướng – cùng bố cục với phần cờ vua.
import { useEffect, useMemo, useRef, useState } from 'react';
import { XQ_LESSONS, XQ_CATEGORY_INFO } from '../data/lessons';
import type { XqDiagram, XqLessonCategory } from '../data/types';
import { XqBoard } from '../components/XqBoard';
import { XqSan, useXqLine, useXqMovePurpose, redMovesAt } from '../components/xqCommon';
import { RichText, Stars } from '../../components/common';
import { parseArrows, parseHighlights, StepControls, useStepper, moveLabel, GuideBox, PurposeText, BoardSheet } from '../../components/LineViewer';
import { href, navigate } from '../../lib/router';
import { useStored } from '../../lib/storage';
import { normalizeVi as strip } from '../../lib/text';
import { COMPACT, useMedia } from '../../lib/media';
import { START_FEN, Position } from '../engine/board';

export const XQ = '/co-tuong';
const CATS = Object.keys(XQ_CATEGORY_INFO) as XqLessonCategory[];

export function XqLibrary({ category }: { category?: string }) {
  const [done] = useStored<string[]>('xq-done-lessons', []);
  const [q, setQ] = useState('');
  const active = (CATS.includes(category as XqLessonCategory) ? category : 'all') as XqLessonCategory | 'all';
  const list = useMemo(() => {
    const nq = strip(q.trim());
    return XQ_LESSONS.filter((l) => (active === 'all' || l.category === active) && (!nq || strip(l.title + ' ' + l.subtitle + ' ' + l.intro).includes(nq)));
  }, [active, q]);
  const grouped = CATS.filter((c) => active === 'all' || c === active).map((c) => ({ cat: c, items: list.filter((l) => l.category === c) }));

  return (
    <div>
      <div className="page-head">
        <h1>📚 Thư viện bài học cờ tướng</h1>
        <p>Đi theo thứ tự Nhập môn → Chiến thuật → Chiến lược → Tàn cuộc. Mỗi bài có bàn cờ minh họa: bấm vào từng phần để xem thế cờ, dùng ◀ ▶ (hoặc phím mũi tên) để xem từng nước kèm lời giảng.</p>
      </div>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', marginBottom: 18 }}>
        <div className="tabs" style={{ margin: 0, flex: 1 }}>
          <button className={'tab' + (active === 'all' ? ' active' : '')} onClick={() => navigate(XQ + '/hoc')}>
            Tất cả <span className="count">{XQ_LESSONS.length}</span>
          </button>
          {CATS.map((c) => (
            <button key={c} className={'tab' + (active === c ? ' active' : '')} onClick={() => navigate(XQ + '/hoc?muc=' + c)}>
              {XQ_CATEGORY_INFO[c].icon} {XQ_CATEGORY_INFO[c].title} <span className="count">{XQ_LESSONS.filter((l) => l.category === c).length}</span>
            </button>
          ))}
        </div>
        <input className="search" placeholder="Tìm bài học… (vd: Pháo trùng, lộ mặt tướng)" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>

      {grouped.map(({ cat, items }) =>
        items.length ? (
          <section key={cat} style={{ marginBottom: 34 }}>
            <div className="cat-banner">
              <span className="ci">{XQ_CATEGORY_INFO[cat].icon}</span>
              <div style={{ flex: 1 }}>
                <h2 style={{ margin: 0 }}>{XQ_CATEGORY_INFO[cat].title}</h2>
                <div className="muted small">{XQ_CATEGORY_INFO[cat].description}</div>
              </div>
              <span className="tag green">
                {items.filter((l) => done.includes(l.id)).length}/{items.length} hoàn thành
              </span>
            </div>
            <div className="grid cols-3">
              {items.map((l, i) => (
                <a key={l.id} className="lesson-card" href={href(XQ + '/hoc/' + l.id)}>
                  {done.includes(l.id) && <span className="done-badge">✓ Đã học</span>}
                  <div className="lc-top">
                    <div className="lc-icon">{l.icon}</div>
                    <div>
                      <div className="small muted">Bài {i + 1}</div>
                      <h3>{l.title}</h3>
                    </div>
                  </div>
                  <p>{l.subtitle}</p>
                  <div className="lc-meta">
                    <Stars n={l.level} />
                    <span>· ⏱ {l.minutes} phút</span>
                    <span>· {l.sections.length} phần</span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        ) : null,
      )}
      {!list.length && <div className="empty-state">Không tìm thấy bài học phù hợp. {XQ_LESSONS.length === 0 && 'Nội dung đang được biên soạn…'}</div>}
    </div>
  );
}

export function XqDiagramBoard({ diagram, resetKey, onPractice }: { diagram: XqDiagram; resetKey: unknown; onPractice?: (fen: string) => void }) {
  const fen0 = diagram.fen ?? START_FEN;
  const line = useXqLine(diagram.moves, fen0);
  const { ply, setPly } = useStepper(line.sans.length, 0, resetKey);
  const fen = line.fens[ply];
  const arrows = ply === 0 ? parseArrows(diagram.arrows) : [];
  const highlights = ply === 0 ? parseHighlights(diagram.highlights) : {};
  const note = ply > 0 ? diagram.notes?.[ply - 1] : undefined;
  const purpose = useXqMovePurpose(line, ply);
  const sideToMove = fen.split(' ')[1] === 'b' ? 'Đen' : 'Đỏ';
  const playable = useMemo(() => {
    try {
      return !new Position(fen).status().over;
    } catch {
      return false;
    }
  }, [fen]);
  return (
    <div className="board-panel">
      <div className="board-fit xq">
        <XqBoard fen={fen} orientation={diagram.orientation ?? 'red'} lastMove={ply > 0 ? line.ucis[ply - 1] : null} arrows={arrows} highlights={highlights} />
      </div>
      {line.sans.length > 0 && <StepControls ply={ply} count={line.sans.length} setPly={setPly} />}
      <GuideBox stepKey={ply}>
        {ply > 0 ? (
          <>
            <div className="guide-head">
              <span className="note-move">
                {moveLabel(fen0, ply - 1)} <XqSan san={line.sans[ply - 1]} red={redMovesAt(fen0, ply - 1)} />
              </span>
            </div>
            {note?.trim() ? <RichText text={note} /> : <PurposeText text={purpose} />}
          </>
        ) : (
          <>
            {diagram.caption ? <RichText text={diagram.caption} /> : null}
            <div className="small muted">
              {sideToMove} đi trước.{line.sans.length ? ' Bấm ▶ (hoặc phím →) để xem diễn biến.' : ''}
            </div>
          </>
        )}
      </GuideBox>
      {onPractice && playable && (
        <button className="btn small ghost" onClick={() => onPractice(fen)}>
          🎯 Tự chơi tiếp thế cờ này với máy
        </button>
      )}
    </div>
  );
}

export function XqLessonPage({ id }: { id: string }) {
  const idx = XQ_LESSONS.findIndex((l) => l.id === id);
  const lesson = XQ_LESSONS[idx];
  const [active, setActive] = useState(0);
  const [done, setDone] = useStored<string[]>('xq-done-lessons', []);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const boardRef = useRef<HTMLDivElement>(null);
  const lockSpy = useRef(0);
  const compact = useMedia(COMPACT);
  const [sheet, setSheet] = useState(false);

  useEffect(() => {
    setActive(0);
    setSheet(false);
  }, [id]);

  useEffect(() => {
    if (!lesson) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (Date.now() < lockSpy.current) return;
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length) {
          const i = Number((visible[0].target as HTMLElement).dataset.idx);
          if (window.innerWidth > 1100) setActive(i);
        }
      },
      { rootMargin: '-35% 0px -55% 0px' },
    );
    sectionRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [lesson]);

  if (!lesson)
    return (
      <div className="empty-state">
        Không tìm thấy bài học. <a href={href(XQ + '/hoc')}>Quay lại thư viện</a>
      </div>
    );

  let diagIdx = Math.min(active, lesson.sections.length - 1);
  while (diagIdx > 0 && !lesson.sections[diagIdx]?.diagram) diagIdx--;
  const diagram = lesson.sections[diagIdx]?.diagram ?? lesson.sections.find((s) => s.diagram)?.diagram ?? {};
  const cat = XQ_CATEGORY_INFO[lesson.category];
  const sameCat = XQ_LESSONS.filter((l) => l.category === lesson.category);
  const next = XQ_LESSONS[idx + 1];
  const isDone = done.includes(lesson.id);

  const show = (i: number) => {
    setActive(i);
    // màn hình hẹp: bàn cờ mở trong hộp thoại ngay tại đoạn đang đọc, không cuộn lên đầu trang
    if (compact) return setSheet(true);
    lockSpy.current = Date.now() + 800;
    if (window.innerWidth <= 1100) boardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const board = <XqDiagramBoard key={`${lesson.id}-${diagIdx}`} diagram={diagram} resetKey={`${lesson.id}-${diagIdx}`} onPractice={(fen) => navigate(XQ + '/luyen-tap?fen=' + encodeURIComponent(fen))} />;
  const tocTitle = `Mục lục · ${cat.title} (${sameCat.findIndex((l) => l.id === lesson.id) + 1}/${sameCat.length})`;
  const toc = (
    <div className="toc">
      {lesson.sections.map((s, i) => (
        <button
          key={i}
          className={i === active ? 'active' : ''}
          onClick={() => {
            // màn hình hẹp chỉ cuộn tới phần đó; bàn cờ mở bằng nút "Xem trên bàn cờ" của phần
            if (!compact) show(i);
            sectionRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
        >
          {i + 1}. {s.heading}
        </button>
      ))}
    </div>
  );

  return (
    <div>
      <div className="breadcrumb">
        <a href={href(XQ + '/hoc')}>Bài học cờ tướng</a> › <a href={href(XQ + '/hoc?muc=' + lesson.category)}>{cat.title}</a> › {lesson.title}
      </div>
      <div className="study xq">
        <div>
          <div className="page-head">
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <div className="lc-icon" style={{ fontSize: '2.2rem', width: 64, height: 64, borderRadius: 18, background: 'var(--surface)', display: 'grid', placeItems: 'center', border: '1px solid var(--border)' }}>
                {lesson.icon}
              </div>
              <div>
                <h1 style={{ margin: 0 }}>{lesson.title}</h1>
                <div className="muted">{lesson.subtitle}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', margin: '12px 0', flexWrap: 'wrap' }}>
              <span className="tag">
                {cat.icon} {cat.title}
              </span>
              <Stars n={lesson.level} />
              <span className="tag">⏱ {lesson.minutes} phút</span>
              {isDone && <span className="tag green">✓ Đã hoàn thành</span>}
            </div>
            <RichText text={lesson.intro} className="lesson-intro" />
          </div>
          {compact && (
            <details className="card tight lesson-toc">
              <summary>{tocTitle}</summary>
              {toc}
            </details>
          )}

          {lesson.sections.map((s, i) => (
            <section key={i} data-idx={i} ref={(el) => (sectionRefs.current[i] = el)} className={'lesson-section' + (i === active ? ' active' : '')} onClick={() => !compact && s.diagram && active !== i && show(i)}>
              <h2>
                <span className="sec-no">{i + 1}</span>
                {s.heading}
              </h2>
              <RichText text={s.body} />
              {s.tip && (
                <div className="callout tip">
                  <span className="ci">💡</span>
                  <div>
                    <b>Mẹo của thầy: </b>
                    <RichText text={s.tip} />
                  </div>
                </div>
              )}
              {s.warning && (
                <div className="callout warn">
                  <span className="ci">⚠️</span>
                  <div>
                    <b>Sai lầm thường gặp: </b>
                    <RichText text={s.warning} />
                  </div>
                </div>
              )}
              {s.diagram && (
                <div className="view-diagram">
                  {i === diagIdx && !compact ? (
                    <span className="tag green">♟ Đang hiển thị trên bàn cờ{s.diagram.moves ? ' – bấm ▶ để xem từng nước' : ''}</span>
                  ) : (
                    <button
                      className={'btn' + (compact ? '' : ' small')}
                      onClick={(e) => {
                        e.stopPropagation();
                        show(i);
                      }}
                    >
                      ♟ Xem trên bàn cờ
                    </button>
                  )}
                </div>
              )}
            </section>
          ))}

          <div className="takeaways">
            <h2>🎓 Ghi nhớ</h2>
            <ul>
              {lesson.keyTakeaways.map((t, i) => (
                <li key={i}>
                  <RichText text={t} />
                </li>
              ))}
            </ul>
            <div className="btn-row" style={{ marginTop: 12 }}>
              <button className={'btn ' + (isDone ? '' : 'primary')} onClick={() => setDone(isDone ? done.filter((d) => d !== lesson.id) : [...done, lesson.id])}>
                {isDone ? '↺ Đánh dấu chưa học' : '✓ Hoàn thành bài học'}
              </button>
              {next && (
                <button
                  className="btn wrap"
                  onClick={() => {
                    if (!isDone) setDone([...done, lesson.id]);
                    navigate(XQ + '/hoc/' + next.id);
                  }}
                >
                  Bài tiếp: {next.title} →
                </button>
              )}
            </div>
          </div>
        </div>

        {compact ? (
          <BoardSheet open={sheet} onClose={() => setSheet(false)} no={diagIdx + 1} title={lesson.sections[diagIdx]?.heading ?? lesson.title}>
            {board}
          </BoardSheet>
        ) : (
          <div className="board-col sticky-board" ref={boardRef}>
            {board}
            <div className="card tight" style={{ marginTop: 14 }}>
              <div className="small muted" style={{ fontWeight: 700, marginBottom: 6 }}>
                {tocTitle}
              </div>
              {toc}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
