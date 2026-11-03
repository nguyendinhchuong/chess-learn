// Trang chọn môn cờ (#/): hai thẻ Cờ vua và Cờ tướng với bàn cờ 3D thu nhỏ, quân cờ trôi phía sau theo chuột.
// Bấm chọn thì màn chuyển cảnh lan ra từ điểm bấm rồi mở trang giới thiệu của môn đó.
import { useEffect, useMemo, useRef } from 'react';
import { ArrowRight, ClockCounterClockwise } from '@phosphor-icons/react';
import { href } from '../lib/router';
import { load } from '../lib/storage';
import { Scene, seeded } from './Scene';
import { Kind, PieceFace, Placed, pieceHtml } from './pieces';
import { approach, curtainTo, pointer, reducedMotion, useFrame } from './motion';

const CHESS_MINI: Placed[] = [
  { key: 'br', c: 0, r: 0 },
  { key: 'bk', c: 2, r: 0 },
  { key: 'bp', c: 1, r: 1 },
  { key: 'bp', c: 3, r: 1 },
  { key: 'wp', c: 0, r: 2 },
  { key: 'wn', c: 2, r: 2 },
  { key: 'wq', c: 1, r: 3 },
  { key: 'wk', c: 3, r: 3 },
];
const XQ_MINI: Placed[] = [
  { key: 'b5', c: 0, r: 0 },
  { key: 'b1', c: 2, r: 0 },
  { key: 'b6', c: 4, r: 1 },
  { key: 'b7', c: 1, r: 1 },
  { key: 'r6', c: 0, r: 2 },
  { key: 'r4', c: 3, r: 2 },
  { key: 'r2', c: 1, r: 3 },
  { key: 'r1', c: 2, r: 3 },
];

interface Choice {
  kind: Kind;
  to: string;
  name: string;
  kicker: string;
  text: string;
  glyph: string;
  color: string;
}

const CHOICES: Choice[] = [
  {
    kind: 'chess',
    to: '/gioi-thieu/co-vua',
    name: 'Cờ vua',
    kicker: 'Bàn 8 × 8 · 32 quân',
    text: 'Từ luật đi quân, đòn chĩa đôi đến ván Morphy ở nhà hát Opera. Phân tích bằng Stockfish 18.',
    glyph: 'wn',
    color: '#000000',
  },
  {
    kind: 'xq',
    to: '/gioi-thieu/co-tuong',
    name: 'Cờ tướng',
    kicker: 'Bàn 9 × 10 · 32 quân',
    text: 'Từ cản chân Mã, Pháo đầu đến ván cổ phổ Quất Trung Bí. Ký hiệu Việt Nam quen thuộc.',
    glyph: 'r1',
    color: '#131209',
  },
];

/** Quân cờ trôi phía sau, lớp gần di chuyển nhiều hơn lớp xa khi rê chuột */
function Field() {
  const items = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => {
        const xq = i % 2 === 1;
        const keys = xq ? ['r5', 'b4', 'r6', 'b1', 'r7', 'b3', 'r2', 'b5', 'r4'] : ['wn', 'bq', 'wr', 'bb', 'wk', 'bn', 'wp', 'br', 'wq'];
        return { key: keys[Math.floor(i / 2)], kind: (xq ? 'xq' : 'chess') as Kind, x: seeded(i + 1) * 100, y: seeded(i + 31) * 100, d: 0.35 + seeded(i + 61) * 0.65, rot: (seeded(i + 91) - 0.5) * 50 };
      }),
    [],
  );
  const els = useRef<(HTMLDivElement | null)[]>([]);
  const st = useRef({ x: 0, y: 0 });
  useFrame(
    {
      write: (t, dt) => {
        const s = st.current;
        const tx = pointer.fine && pointer.moved ? (pointer.nx - 0.5) * -2 : 0;
        const ty = pointer.fine && pointer.moved ? (pointer.ny - 0.5) * -2 : 0;
        s.x = approach(s.x, tx, dt, 3);
        s.y = approach(s.y, ty, dt, 3);
        items.forEach((it, i) => {
          const el = els.current[i];
          if (!el) return;
          const fx = Math.sin(t / 2300 + i) * 8 * it.d;
          const fy = Math.cos(t / 2900 + i * 1.7) * 12 * it.d;
          el.style.transform = `translate3d(${s.x * 48 * it.d + fx}px, ${s.y * 48 * it.d + fy}px, 0) rotate(${it.rot + Math.sin(t / 4000 + i) * 6}deg)`;
        });
      },
    },
    !reducedMotion(),
  );
  return (
    <div className="ld-field" aria-hidden="true">
      {items.map((it, i) => (
        <div
          key={i}
          ref={(el) => (els.current[i] = el)}
          className={'ld-field-item ' + it.kind}
          style={{ left: it.x + '%', top: it.y + '%', ['--d' as string]: it.d, transform: `rotate(${it.rot}deg)` }}
        >
          <PieceFace k={it.key} kind={it.kind} />
        </div>
      ))}
    </div>
  );
}

function ChoiceCard({ c, index }: { c: Choice; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const pick = (e: React.MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    let { clientX: x, clientY: y } = e;
    if (!x && !y && ref.current) {
      const r = ref.current.getBoundingClientRect();
      x = r.left + r.width / 2;
      y = r.top + r.height / 2;
    }
    curtainTo(c.to, { x, y, color: c.color, glyph: pieceHtml(c.glyph, c.kind), glyphClass: c.kind });
  };
  const move = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || reducedMotion()) return;
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--tilt-x', `${((e.clientY - r.top) / r.height - 0.5) * -6}deg`);
    el.style.setProperty('--tilt-y', `${((e.clientX - r.left) / r.width - 0.5) * 8}deg`);
  };
  const leave = () => {
    ref.current?.style.setProperty('--tilt-x', '0deg');
    ref.current?.style.setProperty('--tilt-y', '0deg');
  };
  const xq = c.kind === 'xq';
  return (
    <a ref={ref} href={href(c.to)} className={'ld-choice ' + c.kind + ' ld-enter'} style={{ animationDelay: `${320 + index * 120}ms` }} onClick={pick} onPointerMove={move} onPointerLeave={leave}>
      <div className="ld-choice-scene" aria-hidden="true">
        <Scene
          kind={c.kind}
          cols={xq ? 5 : 4}
          rows={4}
          pieces={xq ? XQ_MINI : CHESS_MINI}
          rx={50}
          rz={xq ? 18 : -22}
          fit={xq ? 7.2 : 6.4}
          full={false}
          tiltRef={ref}
          label={xq ? 'Mảnh bàn cờ tướng với Tướng, Xe, Mã, Pháo' : 'Mảnh bàn cờ vua với Vua, Hậu, Mã và các Tốt'}
        />
      </div>
      <div className="ld-choice-body">
        <span className="ld-choice-kicker">{c.kicker}</span>
        <span className="ld-choice-name">{c.name}</span>
        <span className="ld-choice-text">{c.text}</span>
        <span className="ld-choice-go">
          Xem lộ trình {c.name.toLowerCase()}
          <ArrowRight size={18} weight="bold" aria-hidden="true" />
        </span>
      </div>
    </a>
  );
}

export default function Welcome() {
  const last = useMemo(() => load<Kind | null>('last-game', null), []);
  useEffect(() => {
    document.title = 'Kỳ Đạo · Chọn môn cờ';
  }, []);
  return (
    <div className="ld-root ld-welcome">
      <Field />
      <header className="ld-welcome-top ld-enter" style={{ animationDelay: '40ms' }}>
        <span className="ld-brand">
          <span className="ld-brand-mark chess" aria-hidden="true">
            <PieceFace k="wn" kind="chess" />
          </span>
          <span>Kỳ Đạo</span>
        </span>
      </header>
      <main className="ld-welcome-main" id="ld-main">
        <h1 className="ld-h1 ld-gradient ld-enter" style={{ animationDelay: '120ms' }}>
          <span className="ld-line">Hôm nay bạn muốn </span>
          <span className="ld-line">học môn cờ nào?</span>
        </h1>
        <p className="ld-sub ld-enter" style={{ animationDelay: '200ms' }}>
          Kỳ Đạo dạy cả cờ vua và cờ tướng bằng tiếng Việt. Chọn một môn để xem lộ trình học, bạn có thể đổi môn bất cứ lúc nào.
        </p>
        <nav className="ld-choices" aria-label="Chọn môn cờ">
          {CHOICES.map((c, i) => (
            <ChoiceCard key={c.kind} c={c} index={i} />
          ))}
        </nav>
        {last && (
          <a className="ld-resume ld-enter" style={{ animationDelay: '600ms' }} href={href(last === 'xq' ? '/co-tuong/hoc' : '/hoc')}>
            <ClockCounterClockwise size={18} aria-hidden="true" />
            Lần trước bạn học {last === 'xq' ? 'cờ tướng' : 'cờ vua'}. Học tiếp
            <ArrowRight size={16} weight="bold" aria-hidden="true" />
          </a>
        )}
      </main>
      <footer className="ld-welcome-foot ld-enter" style={{ animationDelay: '680ms' }}>
        Miễn phí · Không cần tài khoản · Tiến độ lưu ngay trên trình duyệt
      </footer>
    </div>
  );
}
