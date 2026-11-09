// Khung chung của hai trang giới thiệu (cờ vua, cờ tướng): thanh điều hướng nổi, phần mở đầu với bàn cờ 3D,
// số liệu, lộ trình bốn chặng cuộn theo nước đi, phòng chơi với bạn, câu tuyên ngôn sáng dần theo từng chữ,
// lợi ích, ba bước và lời mời cuối trang. Nội dung riêng của từng môn nằm trong ChessLanding/XqLanding.
import { ComponentType, ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, MouseSimple, SealCheck, ShieldCheck } from '@phosphor-icons/react';
import { href } from '../lib/router';
import { Scene, SceneProps } from './Scene';
import { AssembleBoard } from './FlatBoard';
import { Kind, PieceFace, pieceHtml } from './pieces';
import { ProgressSource, RoomDemo, RoomStage, createSource, roomFrames } from './Stages';
import { clamp, curtainTo, ease, passProgress, reducedMotion, useFrame, useInView, useMedia, useReveal } from './motion';

export interface Station {
  id: string;
  rail: string;
  kicker: string;
  title: string;
  text: string;
  link: { label: string; to: string };
  /** Chiều cao khối chặng trên màn hình rộng (vh): càng nhiều nước đi càng cần dài */
  height: number;
  Visual: ComponentType<{ progress: ProgressSource; active: boolean }>;
}

export interface LandingConfig {
  kind: Kind;
  docTitle: string;
  name: string;
  brand: string;
  other: { name: string; to: string; kind: Kind; glyph: string; color: string };
  cta: { label: string; to: string };
  appLinks: { label: string; to: string }[];
  /** announce: dòng giới thiệu tính năng mới trên phần mở đầu, bấm vào thì cuộn tới phần Chơi với bạn */
  hero: { announce: string; title: string[]; sub: string; proof: string; scene: Omit<SceneProps, 'scatterRef' | 'tiltRef'> };
  stats: { value: number; label: string }[];
  journey: { kicker: string; title: string[]; sub: string; hopper: string; stations: Station[] };
  online: {
    kicker: string;
    title: string[];
    sub: string;
    /** Bốn ý, theo thứ tự các khung hình của phòng minh họa: mời, trọng tài, rớt mạng, kết thúc ván */
    items: { icon: ReactNode; title: string; text: string }[];
    cta: { label: string; to: string };
    note: string;
    room: RoomDemo;
  };
  tagline: string[];
  benefits: { kicker: string; title: string[]; items: { icon: ReactNode; title: string; text: string }[] };
  steps: { kicker: string; title: string[]; items: { title: string; text: string; link: { label: string; to: string } }[] };
  final: { title: string[]; sub: string; note: string; fen: string; boardLabel: string };
  footer: { blurb: string; credits: string; legal: { label: string; href: string }[] };
}

const ONLINE_ID = 'choi-voi-ban';

const SECTIONS: [string, string][] = [
  ['lo-trinh', 'Lộ trình'],
  [ONLINE_ID, 'Chơi với bạn'],
  ['loi-ich', 'Lợi ích'],
  ['ba-buoc', 'Ba bước'],
];

const PRIVACY =
  'Tiến độ học, bài đã giải và thành tích đấu máy chỉ lưu trên trình duyệt của bạn. Khi bạn chơi với bạn bè, máy chủ phòng chơi giữ tên bạn nhập, một mã ngẫu nhiên để nhận ra ghế của bạn, các nước đi và đồng hồ của ván. Phòng bị xóa sau 3 ngày không ai chơi.';

/** Tiêu đề nhiều dòng: ngắt dòng ở chỗ ý thay đổi (trên màn hình hẹp thì tự xuống dòng) */
function Lines({ lines }: { lines: string[] }) {
  return (
    <>
      {lines.map((l, i) => (
        <span key={i} className="ld-line">
          {l}
          {i < lines.length - 1 ? ' ' : ''}
        </span>
      ))}
    </>
  );
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' });
  const focus = el.querySelector<HTMLElement>('[data-focus]') ?? el;
  focus.focus({ preventScroll: true });
}

function Brand({ k, kind }: { k: string; kind: Kind }) {
  return (
    <a className="ld-brand" href={href('/')} aria-label="Kỳ Đạo, về trang chọn môn cờ">
      <span className={'ld-brand-mark ' + kind} aria-hidden="true">
        <PieceFace k={k} kind={kind} />
      </span>
      <span>Kỳ Đạo</span>
    </a>
  );
}

/* ---------- Thanh điều hướng nổi ---------- */

function Nav({ cfg, current }: { cfg: LandingConfig; current: string }) {
  const [open, setOpen] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        menuBtn.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    document.documentElement.classList.add('ld-lock');
    return () => {
      document.removeEventListener('keydown', onKey);
      document.documentElement.classList.remove('ld-lock');
    };
  }, [open]);

  const go = (id: string) => {
    if (!open) return scrollToId(id);
    // đợi menu đóng và trang hết bị khóa cuộn rồi mới cuộn tới mục
    setOpen(false);
    requestAnimationFrame(() => requestAnimationFrame(() => scrollToId(id)));
  };
  const switchGame = (e: React.MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    setOpen(false);
    curtainTo(cfg.other.to, { x: e.clientX || window.innerWidth / 2, y: e.clientY || 40, color: cfg.other.color, glyph: pieceHtml(cfg.other.glyph, cfg.other.kind), glyphClass: cfg.other.kind });
  };
  const switcher = (
    <div className="ld-switch" role="group" aria-label="Chọn môn cờ">
      {cfg.kind === 'chess' ? (
        <>
          <span className="ld-switch-item on" aria-current="page">
            Cờ vua
          </span>
          <a className="ld-switch-item" href={href(cfg.other.to)} onClick={switchGame}>
            Cờ tướng
          </a>
        </>
      ) : (
        <>
          <a className="ld-switch-item" href={href(cfg.other.to)} onClick={switchGame}>
            Cờ vua
          </a>
          <span className="ld-switch-item on" aria-current="page">
            Cờ tướng
          </span>
        </>
      )}
    </div>
  );

  return (
    <header className="ld-nav-wrap">
      <nav className="ld-nav" aria-label="Các phần của trang">
        <Brand k={cfg.brand} kind={cfg.kind} />
        <ul className="ld-nav-links">
          {SECTIONS.map(([id, label]) => (
            <li key={id}>
              <button type="button" className={'ld-nav-link' + (current === id ? ' on' : '')} aria-current={current === id ? 'location' : undefined} onClick={() => go(id)}>
                {label}
              </button>
            </li>
          ))}
        </ul>
        <span className="ld-nav-switch">{switcher}</span>
        <a className="ld-btn primary sm" href={href(cfg.cta.to)}>
          Vào học
        </a>
        <button ref={menuBtn} type="button" className={'ld-menu-btn' + (open ? ' open' : '')} aria-expanded={open} aria-controls="ld-menu" aria-label={open ? 'Đóng menu' : 'Mở menu'} onClick={() => setOpen(!open)}>
          <span />
          <span />
        </button>
      </nav>
      <div id="ld-menu" className={'ld-menu' + (open ? ' open' : '')} aria-hidden={!open}>
        <ul>
          {SECTIONS.map(([id, label], i) => (
            <li key={id} style={{ transitionDelay: open ? `${i * 60}ms` : '0ms' }}>
              <button type="button" tabIndex={open ? 0 : -1} className={current === id ? 'on' : ''} aria-current={current === id ? 'location' : undefined} onClick={() => go(id)}>
                {label}
              </button>
            </li>
          ))}
          <li className="ld-menu-switch" style={{ transitionDelay: open ? '240ms' : '0ms' }}>
            {open && switcher}
          </li>
        </ul>
      </div>
    </header>
  );
}

/* ---------- Phần mở đầu ---------- */

function Hero({ cfg }: { cfg: LandingConfig }) {
  const hero = useRef<HTMLElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const inView = useInView(hero, '0px');
  const st = useRef({ s: 0 });
  useFrame(
    {
      read: () => {
        const r = hero.current?.getBoundingClientRect();
        st.current.s = r ? clamp(-r.top / (r.height * 0.8)) : 0;
      },
      write: () => {
        const s = st.current.s;
        if (copy.current) {
          copy.current.style.transform = `translate3d(0, ${s * 64}px, 0)`;
          copy.current.style.opacity = String(clamp(1 - s * 1.4));
        }
      },
    },
    inView && !reducedMotion(),
  );
  const h = cfg.hero;
  return (
    <section ref={hero} className="ld-hero" id="dau-trang" aria-labelledby="ld-hero-title">
      <div ref={copy} className="ld-hero-copy">
        <button type="button" className="ld-eyebrow ld-announce ld-enter" style={{ animationDelay: '80ms' }} onClick={() => scrollToId(ONLINE_ID)}>
          <span className="ld-badge">Mới</span>
          {h.announce}
          <ArrowRight size={14} weight="bold" aria-hidden="true" />
        </button>
        <h1 id="ld-hero-title" className="ld-h1 ld-gradient ld-enter" style={{ animationDelay: '160ms' }}>
          <Lines lines={h.title} />
        </h1>
        <p className="ld-sub ld-enter" style={{ animationDelay: '240ms' }}>
          {h.sub}
        </p>
        <div className="ld-hero-actions ld-enter" style={{ animationDelay: '320ms' }}>
          <a className="ld-btn primary" href={href(cfg.cta.to)}>
            {cfg.cta.label}
            <ArrowRight size={18} weight="bold" aria-hidden="true" />
          </a>
        </div>
        <p className="ld-proof ld-enter" style={{ animationDelay: '400ms' }}>
          <SealCheck size={18} weight="fill" aria-hidden="true" />
          {h.proof}
        </p>
      </div>
      <div className="ld-hero-visual">
        <Scene {...h.scene} scatterRef={hero} />
      </div>
      <button type="button" className="ld-cue" onClick={() => scrollToId('lo-trinh')}>
        <MouseSimple size={18} aria-hidden="true" />
        Cuộn để xem lộ trình
      </button>
    </section>
  );
}

/* ---------- Số liệu (đếm lên khi cuộn tới) ---------- */

function Stats({ items }: { items: LandingConfig['stats'] }) {
  const box = useRef<HTMLDivElement>(null);
  const nums = useRef<(HTMLSpanElement | null)[]>([]);
  const inView = useInView(box, '-15% 0px');
  const st = useRef({ t0: -1, done: false });
  useFrame(
    {
      write: (t) => {
        const s = st.current;
        if (s.done) return;
        if (s.t0 < 0) s.t0 = t;
        const q = ease(clamp((t - s.t0) / 1400));
        items.forEach((it, i) => {
          const el = nums.current[i];
          if (el) el.textContent = String(Math.round(it.value * q));
        });
        if (q >= 1) s.done = true;
      },
    },
    inView && !reducedMotion() && !st.current.done,
  );
  return (
    <div ref={box} className="ld-stats" data-reveal>
      {items.map((it, i) => (
        <div key={it.label} className="ld-stat">
          <span ref={(el) => (nums.current[i] = el)} className="ld-stat-num" aria-hidden="true">
            {reducedMotion() ? it.value : 0}
          </span>
          <span className="ld-stat-label">
            <span className="ld-sr">{it.value} </span>
            {it.label}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ---------- Lộ trình bốn chặng ---------- */

function Journey({ cfg }: { cfg: LandingConfig }) {
  const j = cfg.journey;
  const n = j.stations.length;
  const desktop = useMedia('(min-width: 960px)');
  const section = useRef<HTMLElement>(null);
  const items = useRef<(HTMLLIElement | null)[]>([]);
  const fill = useRef<HTMLSpanElement>(null);
  const sources = useMemo(() => j.stations.map(() => createSource()), [j.stations]);
  const [active, setActive] = useState(0);
  const act = useRef(0);
  const rects = useRef<(DOMRect | undefined)[]>([]);
  const inView = useInView(section, '0px');

  useFrame(
    {
      read: () => {
        rects.current = items.current.map((el) => el?.getBoundingClientRect());
      },
      write: () => {
        const vh = window.innerHeight;
        let a = 0;
        rects.current.forEach((r, i) => {
          if (!r) return;
          sources[i].set(desktop ? passProgress(r, vh, 0.5, 0.5) : passProgress(r, vh, 0.85, 0.35));
          if (r.top < vh * 0.5) a = i;
        });
        if (a !== act.current) {
          act.current = a;
          setActive(a);
        }
        const first = rects.current[0],
          last = rects.current[n - 1];
        if (fill.current && first && last) fill.current.style.transform = `scaleX(${clamp((vh * 0.5 - first.top) / (last.bottom - first.top))})`;
      },
    },
    inView,
  );

  const goStation = (i: number) => {
    const el = items.current[i];
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.3;
    window.scrollTo({ top, behavior: reducedMotion() ? 'auto' : 'smooth' });
  };

  return (
    <section ref={section} id="lo-trinh" className="ld-section ld-journey" aria-labelledby="ld-journey-title">
      <header className="ld-head" data-reveal>
        <span className="ld-kicker">{j.kicker}</span>
        <h2 id="ld-journey-title" className="ld-h2" tabIndex={-1} data-focus>
          <Lines lines={j.title} />
        </h2>
        <p className="ld-lead">{j.sub}</p>
      </header>
      <div className="ld-journey-grid">
        <ol className="ld-stations">
          {j.stations.map((s, i) => (
            <li key={s.id} ref={(el) => (items.current[i] = el)} className={'ld-station' + (i === active ? ' on' : '')} style={desktop ? { minHeight: s.height + 'vh' } : undefined}>
              <div className="ld-station-copy" data-reveal>
                <span className="ld-kicker">
                  <span className="ld-num">{i + 1}</span>
                  {s.kicker}
                </span>
                <h3 className="ld-h3">{s.title}</h3>
                <p>{s.text}</p>
                <a className="ld-link" href={href(s.link.to)}>
                  {s.link.label}
                  <ArrowRight size={16} weight="bold" aria-hidden="true" />
                </a>
              </div>
              {!desktop && (
                <div className="ld-station-visual" data-reveal>
                  <s.Visual progress={sources[i]} active />
                </div>
              )}
            </li>
          ))}
        </ol>
        {desktop && (
          <div className="ld-stage">
            <div className="ld-rail">
              <div className="ld-rail-line" aria-hidden="true">
                <span ref={fill} />
              </div>
              <ol className="ld-rail-nodes" style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}>
                {j.stations.map((s, i) => (
                  <li key={s.id} className={i === active ? 'on' : i < active ? 'done' : ''}>
                    <button type="button" onClick={() => goStation(i)} aria-current={i === active ? 'step' : undefined}>
                      <span className="ld-rail-dot" aria-hidden="true" />
                      {s.rail}
                    </button>
                  </li>
                ))}
              </ol>
              <span className="ld-rail-hop" aria-hidden="true" style={{ width: `${100 / n}%`, transform: `translateX(${active * 100}%)` }}>
                <span key={active} className={'ld-hop ' + cfg.kind}>
                  <PieceFace k={j.hopper} kind={cfg.kind} />
                </span>
              </span>
            </div>
            <div className="ld-stage-frame">
              {j.stations.map((s, i) => (
                <div key={s.id} className={'ld-stage-item' + (i === active ? ' on' : '')} aria-hidden={i !== active}>
                  <s.Visual progress={sources[i]} active={i === active} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------- Chơi với bạn: phòng minh họa dính trên màn hình, đi từng khung theo nhịp cuộn ---------- */

function Online({ cfg }: { cfg: LandingConfig }) {
  const o = cfg.online;
  const frames = useMemo(() => roomFrames(o.room), [o.room]);
  const desktop = useMedia('(min-width: 960px)');
  const section = useRef<HTMLElement>(null);
  const items = useRef<(HTMLLIElement | null)[]>([]);
  const pin = useRef<HTMLDivElement>(null);
  const sticky = useRef<HTMLDivElement>(null);
  const inView = useInView(section, '0px');
  const [idx, setIdx] = useState(0);
  const cur = useRef({ idx: 0, next: 0 });
  // khung đầu và số khung của từng ý trong danh sách
  const spans = useMemo(
    () =>
      o.items.map((_, i) => {
        const start = frames.findIndex((f) => f.phase === i);
        return { start, len: frames.filter((f) => f.phase === i).length };
      }),
    [frames, o.items],
  );
  const link = useMemo(() => {
    const u = new URL(window.location.href);
    u.hash = `${cfg.kind === 'xq' ? '/co-tuong' : ''}/phong/${o.room.code}`;
    return u.host + u.pathname.replace(/\/$/, '') + '/' + u.hash;
  }, [cfg.kind, o.room.code]);

  useFrame(
    {
      read: () => {
        const c = cur.current;
        if (desktop) {
          // màn hình rộng: ý đang đi qua giữa màn hình quyết định đoạn, vị trí trong ý quyết định khung
          const line = window.innerHeight * 0.55;
          const rects = items.current.map((el) => el?.getBoundingClientRect());
          let i = 0;
          rects.forEach((r, k) => {
            if (r && r.top <= line) i = k;
          });
          const r = rects[i];
          const sp = spans[i];
          if (!r || !sp) return;
          const p = clamp((line - r.top) / r.height);
          c.next = sp.start + Math.min(sp.len - 1, Math.floor(p * sp.len));
        } else {
          // màn hình hẹp: phòng dính lại, quãng cuộn bên dưới chia đều cho các khung
          const pr = pin.current?.getBoundingClientRect();
          const sr = sticky.current?.getBoundingClientRect();
          if (!pr || !sr) return;
          const p = clamp((sr.top - pr.top) / Math.max(1, pr.height - sr.height));
          c.next = Math.min(frames.length - 1, Math.floor(p * frames.length));
        }
      },
      write: () => {
        const c = cur.current;
        if (c.next !== c.idx) {
          c.idx = c.next;
          setIdx(c.next);
        }
      },
    },
    inView,
  );

  const frame = frames[idx];
  return (
    <section ref={section} id={ONLINE_ID} className="ld-section ld-online" aria-labelledby="ld-online-title">
      <header className="ld-head" data-reveal>
        <span className="ld-kicker">
          <span className="ld-badge">Mới</span>
          {o.kicker}
        </span>
        <h2 id="ld-online-title" className="ld-h2" tabIndex={-1} data-focus>
          <Lines lines={o.title} />
        </h2>
        <p className="ld-lead">{o.sub}</p>
      </header>
      <div className="ld-online-grid">
        <ol className="ld-online-list">
          {o.items.map((it, i) => (
            <li
              key={it.title}
              ref={(el) => (items.current[i] = el)}
              className={'ld-online-item' + (frame.phase === i ? ' on' : '')}
              style={{ ['--frames' as string]: spans[i]?.len ?? 1 }}
            >
              <div className="ld-online-copy" data-reveal>
                <span className="ld-benefit-ic" aria-hidden="true">
                  {it.icon}
                </span>
                <h3 className="ld-h4">{it.title}</h3>
                <p>{it.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <div ref={pin} className="ld-room-pin">
          <div ref={sticky} className="ld-room-sticky">
            <RoomStage demo={o.room} frame={frame} link={link} />
          </div>
          <div className="ld-room-run" aria-hidden="true" />
        </div>
        <div className="ld-online-cta" data-reveal>
          <a className="ld-btn quiet" href={href(o.cta.to)}>
            {o.cta.label}
            <ArrowRight size={18} weight="bold" aria-hidden="true" />
          </a>
          <p className="ld-proof">
            <ShieldCheck size={18} weight="fill" aria-hidden="true" />
            {o.note}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- Câu tuyên ngôn: từng chữ sáng lên khi cuộn qua ---------- */

function Tagline({ lines }: { lines: string[] }) {
  const box = useRef<HTMLHeadingElement>(null);
  const words = useRef<HTMLSpanElement[]>([]);
  const inView = useInView(box, '0px');
  const st = useRef({ p: 0, count: -1 });
  const split = lines.map((l) => l.split(' '));
  const total = split.reduce((s, l) => s + l.length, 0);
  const reduced = useMemo(reducedMotion, []);
  useFrame(
    {
      read: () => {
        const r = box.current?.getBoundingClientRect();
        if (r) st.current.p = passProgress(r, window.innerHeight, 0.85, 0.55);
      },
      write: () => {
        const s = st.current;
        const c = reduced ? total : Math.round(s.p * total);
        if (c === s.count) return;
        s.count = c;
        words.current.forEach((w, i) => w.classList.toggle('on', i < c));
      },
    },
    inView,
  );
  let idx = 0;
  return (
    <section className="ld-tagline" aria-label="Điều Kỳ Đạo tin">
      <h2 ref={box} className="ld-tagline-text">
        {split.map((ws, li) => (
          <span key={li} className="ld-line">
            {ws.map((w, wi) => {
              const i = idx++;
              return (
                <span key={wi} ref={(el) => el && (words.current[i] = el)} className="ld-word">
                  {w}
                  {wi < ws.length - 1 || li < split.length - 1 ? ' ' : ''}
                </span>
              );
            })}
          </span>
        ))}
      </h2>
    </section>
  );
}

/* ---------- Lợi ích: thẻ nghiêng theo chuột ---------- */

function TiltCard({ children, className }: { children: ReactNode; className: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || reducedMotion()) return;
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--tilt-x', `${((e.clientY - r.top) / r.height - 0.5) * -8}deg`);
    el.style.setProperty('--tilt-y', `${((e.clientX - r.left) / r.width - 0.5) * 10}deg`);
  };
  const leave = () => {
    ref.current?.style.setProperty('--tilt-x', '0deg');
    ref.current?.style.setProperty('--tilt-y', '0deg');
  };
  return (
    <div ref={ref} className={className} onPointerMove={move} onPointerLeave={leave}>
      {children}
    </div>
  );
}

function Benefits({ b }: { b: LandingConfig['benefits'] }) {
  return (
    <section id="loi-ich" className="ld-section" aria-labelledby="ld-benefits-title">
      <header className="ld-head" data-reveal>
        <span className="ld-kicker">{b.kicker}</span>
        <h2 id="ld-benefits-title" className="ld-h2" tabIndex={-1} data-focus>
          <Lines lines={b.title} />
        </h2>
      </header>
      <div className="ld-benefits">
        {b.items.map((it, i) => (
          <div key={it.title} data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
            <TiltCard className="ld-card ld-benefit">
              <span className="ld-benefit-ic" aria-hidden="true">
                {it.icon}
              </span>
              <h3 className="ld-h4">{it.title}</h3>
              <p>{it.text}</p>
            </TiltCard>
          </div>
        ))}
      </div>
    </section>
  );
}

function Steps({ s }: { s: LandingConfig['steps'] }) {
  return (
    <section id="ba-buoc" className="ld-section" aria-labelledby="ld-steps-title">
      <header className="ld-head" data-reveal>
        <span className="ld-kicker">{s.kicker}</span>
        <h2 id="ld-steps-title" className="ld-h2" tabIndex={-1} data-focus>
          <Lines lines={s.title} />
        </h2>
      </header>
      <ol className="ld-steps-list">
        {s.items.map((it, i) => (
          <li key={it.title} className="ld-card ld-step" data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
            <span className="ld-step-num" aria-hidden="true">
              {i + 1}
            </span>
            <h3 className="ld-h4">{it.title}</h3>
            <p>{it.text}</p>
            <a className="ld-link" href={href(it.link.to)}>
              {it.link.label}
              <ArrowRight size={16} weight="bold" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Final({ cfg }: { cfg: LandingConfig }) {
  const ref = useRef<HTMLElement>(null);
  const f = cfg.final;
  return (
    <section ref={ref} className="ld-section ld-final" aria-labelledby="ld-final-title">
      <div className="ld-final-copy" data-reveal>
        <h2 id="ld-final-title" className="ld-h2 ld-final-title">
          <Lines lines={f.title} />
        </h2>
        <p className="ld-lead">{f.sub}</p>
        <a className="ld-btn primary" href={href(cfg.cta.to)}>
          {cfg.cta.label}
          <ArrowRight size={18} weight="bold" aria-hidden="true" />
        </a>
        <p className="ld-proof">
          <ShieldCheck size={18} weight="fill" aria-hidden="true" />
          {f.note}
        </p>
      </div>
      <div className="ld-final-board">
        <AssembleBoard kind={cfg.kind} fen={f.fen} label={f.boardLabel} driver={ref} />
      </div>
    </section>
  );
}

function Footer({ cfg }: { cfg: LandingConfig }) {
  const [privacy, setPrivacy] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (privacy) panel.current?.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'nearest' });
  }, [privacy]);
  return (
    <footer className="ld-footer">
      <div className="ld-footer-grid">
        <div className="ld-footer-about">
          <Brand k={cfg.brand} kind={cfg.kind} />
          <p>{cfg.footer.blurb}</p>
        </div>
        <nav aria-label={'Học ' + cfg.name.toLowerCase()}>
          <h2 className="ld-footer-h">Học {cfg.name.toLowerCase()}</h2>
          <ul>
            {cfg.appLinks.map((l) => (
              <li key={l.to}>
                <a href={href(l.to)}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Kỳ Đạo">
          <h2 className="ld-footer-h">Kỳ Đạo</h2>
          <ul>
            <li>
              <a href={href('/')}>Chọn môn cờ</a>
            </li>
            <li>
              <a href={href(cfg.other.to)}>Giới thiệu {cfg.other.name.toLowerCase()}</a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="ld-footer-bottom">
        <span>© 2026 Kỳ Đạo. {cfg.footer.credits}</span>
        <span className="ld-footer-legal">
          <button type="button" aria-expanded={privacy} aria-controls="quyen-rieng-tu" onClick={() => setPrivacy(!privacy)}>
            Quyền riêng tư
          </button>
          {cfg.footer.legal.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
              {l.label}
            </a>
          ))}
        </span>
      </div>
      <div ref={panel} id="quyen-rieng-tu" className="ld-privacy" hidden={!privacy}>
        <h2 className="ld-footer-h">Quyền riêng tư</h2>
        <p>{PRIVACY}</p>
      </div>
    </footer>
  );
}

export function Landing({ cfg }: { cfg: LandingConfig }) {
  const root = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState('');
  const desktop = useMedia('(min-width: 960px)');
  useReveal(root, [desktop]);

  useEffect(() => {
    document.title = cfg.docTitle;
  }, [cfg.docTitle]);

  // mục đang đọc được đánh dấu trên thanh điều hướng
  useEffect(() => {
    const els = SECTIONS.map(([id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setCurrent(e.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    els.forEach((el) => io.observe(el));
    const top = new IntersectionObserver(([e]) => e.isIntersecting && setCurrent(''), { rootMargin: '0px 0px -60% 0px' });
    const hero = document.getElementById('dau-trang');
    if (hero) top.observe(hero);
    return () => {
      io.disconnect();
      top.disconnect();
    };
  }, []);

  const skip = () => {
    const m = document.getElementById('ld-main');
    m?.focus();
  };

  return (
    <div ref={root} className={'ld-root ld-' + cfg.kind}>
      <button type="button" className="ld-skip" onClick={skip}>
        Bỏ qua, tới nội dung chính
      </button>
      <Nav cfg={cfg} current={current} />
      <main id="ld-main" tabIndex={-1}>
        <Hero cfg={cfg} />
        <div className="ld-wrap">
          <Stats items={cfg.stats} />
        </div>
        <Journey cfg={cfg} />
        <Online cfg={cfg} />
        <Tagline lines={cfg.tagline} />
        <Benefits b={cfg.benefits} />
        <Steps s={cfg.steps} />
        <Final cfg={cfg} />
      </main>
      <Footer cfg={cfg} />
    </div>
  );
}
