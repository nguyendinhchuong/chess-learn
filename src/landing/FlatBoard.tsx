// Bàn cờ phẳng cho các chặng của lộ trình: quân trượt theo nước đi khi cuộn, bàn nghiêng nhẹ theo chuột.
// AssembleBoard: quân bay từ khắp nơi về thế cờ ban đầu khi cuộn tới lời mời cuối trang.
import { useMemo, useRef } from 'react';
import { approach, clamp, ease, pointer, reducedMotion, useFrame, useInView } from './motion';
import { ChessPlane, XqPlane, seeded } from './Scene';
import { Kind, Line, PieceFace, Sq, fromFen } from './pieces';

export interface Arrow {
  from: Sq;
  to: Sq;
  tone?: 'good' | 'bad';
}

const dims = (kind: Kind) => (kind === 'chess' ? { cols: 8, rows: 8 } : { cols: 9, rows: 10 });
const at = (s: Sq) => ({ transform: `translate(${s.c * 100}%, ${s.r * 100}%)` });

function Plane({ kind }: { kind: Kind }) {
  const { cols, rows } = dims(kind);
  return kind === 'chess' ? <ChessPlane cols={cols} rows={rows} /> : <XqPlane cols={cols} rows={rows} />;
}

/** Bàn nghiêng nhẹ về phía con trỏ khi chuột ở trên bàn */
function useTilt(box: React.RefObject<HTMLElement>, inner: React.RefObject<HTMLElement>, enabled: boolean) {
  const inView = useInView(box);
  const st = useRef({ x: 0, y: 0, rect: null as DOMRect | null });
  useFrame(
    {
      read: () => {
        st.current.rect = box.current?.getBoundingClientRect() ?? null;
      },
      write: (_t, dt) => {
        const s = st.current;
        const r = s.rect;
        let tx = 0,
          ty = 0;
        if (r && pointer.fine && pointer.x >= r.left && pointer.x <= r.right && pointer.y >= r.top && pointer.y <= r.bottom) {
          tx = ((pointer.x - r.left) / r.width - 0.5) * 10;
          ty = ((pointer.y - r.top) / r.height - 0.5) * -10;
        }
        s.x = approach(s.x, tx, dt, 6);
        s.y = approach(s.y, ty, dt, 6);
        if (inner.current) inner.current.style.transform = `perspective(1200px) rotateX(${s.y}deg) rotateY(${s.x}deg)`;
      },
    },
    enabled && inView && !reducedMotion(),
  );
}

export function FlatBoard({ line, ply, arrows = [], label, className }: { line: Line; ply: number; arrows?: Arrow[]; label: string; className?: string }) {
  const { kind } = line;
  const { cols, rows } = dims(kind);
  const box = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  useTilt(box, inner, true);
  const p = clamp(ply, 0, line.plies);
  const mv = p > 0 ? line.moves[p - 1] : null;

  return (
    <div ref={box} className={'ld-fb ' + kind + (className ? ' ' + className : '')} role="img" aria-label={label}>
      <div ref={inner} className="ld-fb-inner">
        <Plane kind={kind} />
        <div className="ld-fb-layer">
          {mv && (
            <>
              <span className="ld-fb-mark from" style={at(mv.from)} />
              <span className="ld-fb-mark" style={at(mv.to)} />
            </>
          )}
          {line.tracks.map((t) => {
            const now = t.at[p];
            let last: Sq | null = now;
            for (let i = p; !last && i >= 0; i--) last = t.at[i];
            return (
              <div key={t.id} className={'ld-fb-piece' + (now ? '' : ' gone')} style={at(last ?? { c: 0, r: 0 })}>
                <PieceFace k={t.keys[p]} kind={kind} />
              </div>
            );
          })}
        </div>
        <svg className="ld-fb-arrows" viewBox={`0 0 ${cols} ${rows}`} preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <marker id={'ld-ah-' + kind + '-good'} markerWidth="3" markerHeight="3" refX="1.6" refY="1.5" orient="auto">
              <path d="M0,0 L3,1.5 L0,3 z" className="ld-ah good" />
            </marker>
            <marker id={'ld-ah-' + kind + '-bad'} markerWidth="3" markerHeight="3" refX="1.6" refY="1.5" orient="auto">
              <path d="M0,0 L3,1.5 L0,3 z" className="ld-ah bad" />
            </marker>
          </defs>
          {arrows.map((a, i) => {
            const x1 = a.from.c + 0.5,
              y1 = a.from.r + 0.5,
              x2 = a.to.c + 0.5,
              y2 = a.to.r + 0.5;
            const len = Math.hypot(x2 - x1, y2 - y1);
            const k = (len - 0.32) / len;
            const tone = a.tone ?? 'good';
            return <line key={i + '-' + p} className={'ld-arrow ' + tone} x1={x1} y1={y1} x2={x1 + (x2 - x1) * k} y2={y1 + (y2 - y1) * k} markerEnd={`url(#ld-ah-${kind}-${tone})`} />;
          })}
        </svg>
      </div>
    </div>
  );
}

/** Quân bay từ khắp nơi về đúng chỗ của thế cờ `fen` khi `driver` cuộn vào màn hình */
export function AssembleBoard({ kind, fen, label, driver }: { kind: Kind; fen: string; label: string; driver: React.RefObject<HTMLElement> }) {
  const pieces = useMemo(() => fromFen(fen, kind), [fen, kind]);
  const box = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const els = useRef<(HTMLDivElement | null)[]>([]);
  const inView = useInView(box, '0px');
  const reduced = useMemo(reducedMotion, []);
  const st = useRef({ p: 0, shown: 0 });
  useTilt(box, inner, true);

  useFrame(
    {
      read: () => {
        const r = driver.current?.getBoundingClientRect();
        if (r) st.current.p = clamp((window.innerHeight - r.top) / (window.innerHeight * 0.85));
      },
      write: (_t, dt) => {
        const s = st.current;
        s.shown = approach(s.shown, s.p, dt, 5);
        pieces.forEach((pc, i) => {
          const el = els.current[i];
          if (!el) return;
          const q = ease(clamp((s.shown - seeded(i + 40) * 0.35) / 0.55));
          const ox = (seeded(i + 7) - 0.5) * 14,
            oy = (seeded(i + 19) - 0.5) * 10 - 4;
          const rot = (seeded(i + 3) - 0.5) * 300;
          el.style.transform = `translate(${(pc.c + (1 - q) * ox) * 100}%, ${(pc.r + (1 - q) * oy) * 100}%) rotate(${(1 - q) * rot}deg)`;
          el.style.opacity = String(q);
        });
      },
    },
    inView && !reduced,
  );

  return (
    <div ref={box} className={'ld-fb ld-assemble ' + kind} role="img" aria-label={label}>
      <div ref={inner} className="ld-fb-inner">
        <Plane kind={kind} />
        <div className="ld-fb-layer">
          {pieces.map((pc, i) => (
            <div key={i} ref={(el) => (els.current[i] = el)} className="ld-fb-piece free" style={reduced ? at(pc) : { ...at(pc), opacity: 0 }}>
              <PieceFace k={pc.key} kind={kind} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
