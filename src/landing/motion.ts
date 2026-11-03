// Công cụ chuyển động dùng chung cho trang chọn môn và hai trang giới thiệu:
// một vòng requestAnimationFrame duy nhất (đọc trước, ghi sau), con trỏ chuột dùng chung,
// hiện dần khi cuộn tới (IntersectionObserver) và màn chuyển cảnh giữa các trang.
import { useEffect, useRef, useState } from 'react';
import { navigate } from '../lib/router';

/** Đường cong chung: chậm dần và "đặt" vào chỗ, như quân cờ được đặt xuống bàn */
export const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

/** Bộ giải cubic-bezier (Newton) để dùng đúng đường cong trên cho các chuyển động tính bằng JS */
function bezier(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1,
    bx = 3 * (x2 - x1) - cx,
    ax = 1 - cx - bx;
  const cy = 3 * y1,
    by = 3 * (y2 - y1) - cy,
    ay = 1 - cy - by;
  const sx = (t: number) => ((ax * t + bx) * t + cx) * t;
  const sy = (t: number) => ((ay * t + by) * t + cy) * t;
  const dx = (t: number) => (3 * ax * t + 2 * bx) * t + cx;
  return (x: number) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let t = x;
    for (let i = 0; i < 6; i++) {
      const d = dx(t);
      if (Math.abs(d) < 1e-6) break;
      t -= (sx(t) - x) / d;
    }
    return sy(Math.min(1, Math.max(0, t)));
  };
}
export const ease = bezier(0.22, 1, 0.36, 1);

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
/** Làm mượt theo thời gian thực (không phụ thuộc tốc độ khung hình) */
export const approach = (cur: number, target: number, dt: number, speed = 6) => cur + (target - cur) * (1 - Math.exp(-dt * speed));

export function reducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/* ---------- Con trỏ chuột dùng chung ---------- */

/** Vị trí con trỏ (tọa độ màn hình) và tỉ lệ 0..1 theo bề rộng/cao cửa sổ; chỉ đọc trong vòng rAF */
export const pointer = { x: -1e4, y: -1e4, nx: 0.5, ny: 0.5, fine: false, moved: false };
let pointerBound = false;
function bindPointer() {
  if (pointerBound || typeof window === 'undefined') return;
  pointerBound = true;
  pointer.fine = window.matchMedia('(pointer: fine)').matches;
  window.addEventListener(
    'pointermove',
    (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.nx = e.clientX / window.innerWidth;
      pointer.ny = e.clientY / window.innerHeight;
      pointer.moved = true;
    },
    { passive: true },
  );
  document.documentElement.addEventListener('pointerleave', () => {
    pointer.x = pointer.y = -1e4;
  });
}

/* ---------- Vòng rAF duy nhất: mọi hiệu ứng đọc bố cục trước rồi mới ghi ---------- */

interface Job {
  read?: (t: number, dt: number) => void;
  write: (t: number, dt: number) => void;
}
const jobs = new Set<Job>();
let raf = 0;
let last = 0;
function tick(t: number) {
  const dt = last ? Math.min(0.05, (t - last) / 1000) : 1 / 60;
  last = t;
  for (const j of jobs) j.read?.(t, dt);
  for (const j of jobs) j.write(t, dt);
  raf = jobs.size ? requestAnimationFrame(tick) : 0;
  if (!raf) last = 0;
}

/** Đăng ký một công việc chạy mỗi khung hình khi `active` (ví dụ: chỉ khi phần đó đang trong màn hình) */
export function useFrame(job: Job, active = true) {
  const ref = useRef(job);
  ref.current = job;
  useEffect(() => {
    if (!active) return;
    bindPointer();
    const j: Job = { read: (t, dt) => ref.current.read?.(t, dt), write: (t, dt) => ref.current.write(t, dt) };
    jobs.add(j);
    if (!raf) raf = requestAnimationFrame(tick);
    return () => {
      jobs.delete(j);
    };
  }, [active]);
}

/** Phần tử có đang nằm trong (hoặc gần) màn hình không */
export function useInView<T extends Element>(ref: React.RefObject<T>, rootMargin = '200px 0px') {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin]);
  return inView;
}

/** Hiện dần mọi phần tử `[data-reveal]` bên trong `root` một lần khi cuộn tới (không lặp lại khi cuộn ngược) */
export function useReveal(root: React.RefObject<HTMLElement>, deps: unknown[] = []) {
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const items = Array.from(el.querySelectorAll<HTMLElement>('[data-reveal]:not([data-shown])'));
    if (reducedMotion() || !('IntersectionObserver' in window)) {
      items.forEach((i) => i.setAttribute('data-shown', ''));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.setAttribute('data-shown', '');
          io.unobserve(e.target);
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
    );
    items.forEach((i) => io.observe(i));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export function useMedia(query: string) {
  const [match, setMatch] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches);
  useEffect(() => {
    const m = window.matchMedia(query);
    const on = () => setMatch(m.matches);
    on();
    m.addEventListener('change', on);
    return () => m.removeEventListener('change', on);
  }, [query]);
  return match;
}

/**
 * Tiến độ một khối đi qua màn hình: 0 khi mép trên khối chạm vạch `a` (tỉ lệ chiều cao cửa sổ),
 * 1 khi mép dưới khối chạm vạch `b`.
 */
export function passProgress(rect: DOMRect, vh: number, a: number, b: number) {
  return clamp((vh * a - rect.top) / Math.max(1, rect.height + vh * (a - b)));
}

/* ---------- Chuyển cảnh ---------- */

/**
 * Màn chuyển cảnh: một hình tròn màu nền của trang đích lan ra từ điểm bấm, quân cờ đã chọn
 * bay vào giữa và phóng to; khi phủ kín thì đổi trang rồi mờ dần để lộ trang mới.
 */
export function curtainTo(to: string, opts: { x: number; y: number; color: string; glyph?: string; glyphClass?: string }) {
  const vw = window.innerWidth,
    vh = window.innerHeight;
  const layer = document.createElement('div');
  layer.className = 'ld-curtain';
  layer.setAttribute('aria-hidden', 'true');
  const r = Math.hypot(Math.max(opts.x, vw - opts.x), Math.max(opts.y, vh - opts.y));
  const disc = document.createElement('div');
  disc.className = 'ld-curtain-disc';
  Object.assign(disc.style, { left: opts.x - r + 'px', top: opts.y - r + 'px', width: 2 * r + 'px', height: 2 * r + 'px', background: opts.color });
  layer.appendChild(disc);
  let glyph: HTMLElement | null = null;
  if (opts.glyph) {
    glyph = document.createElement('div');
    glyph.className = 'ld-curtain-glyph ' + (opts.glyphClass ?? '');
    glyph.innerHTML = opts.glyph;
    layer.appendChild(glyph);
  }
  document.body.appendChild(layer);

  const finish = () => {
    navigate(to);
    // chờ trang mới kịp vẽ rồi mới vén màn
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const out = layer.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 500, easing: EASE, fill: 'forwards' });
        out.onfinish = () => layer.remove();
      }),
    );
  };

  if (reducedMotion()) {
    layer.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, easing: EASE, fill: 'forwards' }).onfinish = finish;
    return;
  }
  disc.animate([{ transform: 'scale(0)' }, { transform: 'scale(1)' }], { duration: 750, easing: EASE, fill: 'forwards' }).onfinish = finish;
  if (glyph) {
    const gx = opts.x - vw / 2,
      gy = opts.y - vh / 2;
    glyph.animate(
      [
        { transform: `translate(${gx}px, ${gy}px) scale(0.4)`, opacity: 0 },
        { transform: 'translate(0, 0) scale(1)', opacity: 1, offset: 0.6 },
        { transform: 'translate(0, 0) scale(1.15)', opacity: 1 },
      ],
      { duration: 750, easing: EASE, fill: 'forwards' },
    );
  }
}
