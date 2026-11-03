import { useEffect, useMemo, useRef, useState } from 'react';
import { ALL_LESSONS, CATEGORY_INFO } from '../data/lessons';
import type { Diagram } from '../data/types';
import { Board } from '../components/Board';
import { RichText, San, Stars } from '../components/common';
import { parseArrows, parseHighlights, StepControls, useLine, useStepper, moveLabel, GuideBox, useMovePurpose, PurposeText } from '../components/LineViewer';
import { href, navigate } from '../lib/router';
import { useStored } from '../lib/storage';
import { START_FEN, Position } from '../engine/board';

export function DiagramBoard({ diagram, resetKey, onPractice }: { diagram: Diagram; resetKey: unknown; onPractice?: (fen: string) => void }) {
  const fen0 = diagram.fen ?? START_FEN;
  const line = useLine(diagram.moves, fen0);
  const { ply, setPly } = useStepper(line.sans.length, 0, resetKey);
  const fen = line.fens[ply];
  const arrows = ply === 0 ? parseArrows(diagram.arrows) : [];
  const highlights = ply === 0 ? parseHighlights(diagram.highlights) : {};
  const note = ply > 0 ? diagram.notes?.[ply - 1] : undefined;
  const purpose = useMovePurpose(line, ply);
  const sideToMove = fen.split(' ')[1] === 'w' ? 'Trắng' : 'Đen';
  const playable = useMemo(() => {
    try {
      return !new Position(fen).status().over;
    } catch {
      return false;
    }
  }, [fen]);
  return (
    <div className="board-panel">
      <div className="board-fit">
        <Board fen={fen} orientation={diagram.orientation ?? 'white'} lastMove={ply > 0 ? line.ucis[ply - 1] : null} arrows={arrows} highlights={highlights} />
      </div>
      {line.sans.length > 0 && <StepControls ply={ply} count={line.sans.length} setPly={setPly} />}
      <GuideBox stepKey={ply}>
        {ply > 0 ? (
          <>
            <div className="guide-head">
              <span className="note-move">
                {moveLabel(fen0, ply - 1)} <San san={line.sans[ply - 1]} white={(ply - 1) % 2 === (fen0.split(' ')[1] === 'w' ? 0 : 1)} />
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

export function LessonPage({ id }: { id: string }) {
  const idx = ALL_LESSONS.findIndex((l) => l.id === id);
  const lesson = ALL_LESSONS[idx];
  const [active, setActive] = useState(0);
  const [done, setDone] = useStored<string[]>('done-lessons', []);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const boardRef = useRef<HTMLDivElement>(null);
  const lockSpy = useRef(0);

  useEffect(() => setActive(0), [id]);

  // Theo dõi phần đang đọc để đổi bàn cờ tương ứng
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

  if (!lesson) return <div className="empty-state">Không tìm thấy bài học. <a href={href('/hoc')}>Quay lại thư viện</a></div>;

  // phần không có sơ đồ dùng sơ đồ gần nhất phía trước
  let diagIdx = Math.min(active, lesson.sections.length - 1);
  while (diagIdx > 0 && !lesson.sections[diagIdx]?.diagram) diagIdx--;
  const diagram = lesson.sections[diagIdx]?.diagram ?? lesson.sections.find((s) => s.diagram)?.diagram ?? {};
  const cat = CATEGORY_INFO[lesson.category];
  const sameCat = ALL_LESSONS.filter((l) => l.category === lesson.category);
  const next = ALL_LESSONS[idx + 1];
  const isDone = done.includes(lesson.id);

  const show = (i: number) => {
    setActive(i);
    lockSpy.current = Date.now() + 800;
    if (window.innerWidth <= 1100) boardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div>
      <div className="breadcrumb">
        <a href={href('/hoc')}>Bài học</a> › <a href={href('/hoc?muc=' + lesson.category)}>{cat.title}</a> › {lesson.title}
      </div>
      <div className="study">
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

          {lesson.sections.map((s, i) => (
            <section key={i} data-idx={i} ref={(el) => (sectionRefs.current[i] = el)} className={'lesson-section' + (i === active ? ' active' : '')} onClick={() => s.diagram && active !== i && show(i)}>
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
                  {i === diagIdx ? (
                    <span className="tag green">♟ Đang hiển thị trên bàn cờ{s.diagram.moves ? ' – bấm ▶ để xem từng nước' : ''}</span>
                  ) : (
                    <button
                      className="btn small"
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
                    navigate('/hoc/' + next.id);
                  }}
                >
                  Bài tiếp: {next.title} →
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="board-col sticky-board" ref={boardRef}>
          <DiagramBoard key={`${lesson.id}-${diagIdx}`} diagram={diagram} resetKey={`${lesson.id}-${diagIdx}`} onPractice={(fen) => navigate('/luyen-tap?fen=' + encodeURIComponent(fen))} />
          <div className="card tight" style={{ marginTop: 14 }}>
            <div className="small muted" style={{ fontWeight: 700, marginBottom: 6 }}>
              Mục lục · {cat.title} ({sameCat.findIndex((l) => l.id === lesson.id) + 1}/{sameCat.length})
            </div>
            <div className="toc">
              {lesson.sections.map((s, i) => (
                <button
                  key={i}
                  className={i === active ? 'active' : ''}
                  onClick={() => {
                    show(i);
                    sectionRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  {i + 1}. {s.heading}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
