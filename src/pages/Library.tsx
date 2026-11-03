import { useMemo, useState } from 'react';
import { ALL_LESSONS, CATEGORY_INFO } from '../data/lessons';
import type { LessonCategory } from '../data/types';
import { href, navigate } from '../lib/router';
import { useStored } from '../lib/storage';
import { Stars } from '../components/common';
import { normalizeVi as strip } from '../lib/text';

const CATS = Object.keys(CATEGORY_INFO) as LessonCategory[];

export function Library({ category }: { category?: string }) {
  const [done] = useStored<string[]>('done-lessons', []);
  const [q, setQ] = useState('');
  const active = (CATS.includes(category as LessonCategory) ? category : 'all') as LessonCategory | 'all';
  const list = useMemo(() => {
    const nq = strip(q.trim());
    return ALL_LESSONS.filter((l) => (active === 'all' || l.category === active) && (!nq || strip(l.title + ' ' + l.subtitle + ' ' + l.intro).includes(nq)));
  }, [active, q]);

  const grouped = CATS.filter((c) => active === 'all' || c === active).map((c) => ({ cat: c, items: list.filter((l) => l.category === c) }));

  return (
    <div>
      <div className="page-head">
        <h1>📚 Thư viện bài học</h1>
        <p>Đi theo thứ tự từ Nhập môn → Chiến thuật → Chiến lược → Tàn cuộc. Mỗi bài có bàn cờ minh họa: bấm vào từng phần để xem thế cờ, dùng ◀ ▶ (hoặc phím mũi tên) để xem từng nước kèm lời giảng.</p>
      </div>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', marginBottom: 18 }}>
        <div className="tabs" style={{ margin: 0, flex: 1 }}>
          <button className={'tab' + (active === 'all' ? ' active' : '')} onClick={() => navigate('/hoc')}>
            Tất cả <span className="count">{ALL_LESSONS.length}</span>
          </button>
          {CATS.map((c) => (
            <button key={c} className={'tab' + (active === c ? ' active' : '')} onClick={() => navigate('/hoc?muc=' + c)}>
              {CATEGORY_INFO[c].icon} {CATEGORY_INFO[c].title} <span className="count">{ALL_LESSONS.filter((l) => l.category === c).length}</span>
            </button>
          ))}
        </div>
        <input className="search" placeholder="Tìm bài học… (vd: ghim, Lucena)" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>

      {grouped.map(({ cat, items }) =>
        items.length ? (
          <section key={cat} style={{ marginBottom: 34 }}>
            <div className="cat-banner">
              <span className="ci">{CATEGORY_INFO[cat].icon}</span>
              <div style={{ flex: 1 }}>
                <h2 style={{ margin: 0 }}>{CATEGORY_INFO[cat].title}</h2>
                <div className="muted small">{CATEGORY_INFO[cat].description}</div>
              </div>
              <span className="tag green">
                {items.filter((l) => done.includes(l.id)).length}/{items.length} hoàn thành
              </span>
            </div>
            <div className="grid cols-3">
              {items.map((l, i) => (
                <a key={l.id} className="lesson-card" href={href('/hoc/' + l.id)}>
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
      {!list.length && <div className="empty-state">Không tìm thấy bài học phù hợp. {ALL_LESSONS.length === 0 && 'Nội dung đang được biên soạn…'}</div>}
    </div>
  );
}
