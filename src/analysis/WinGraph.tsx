// Biểu đồ cơ hội thắng theo từng nước: vùng tô bên dưới đường là phần của bên đi trước (Trắng/Đỏ).
// Rê chuột để xem, bấm hoặc kéo để nhảy tới nước đó; dùng phím ← → khi biểu đồ đang được chọn.
import { KeyboardEvent, PointerEvent, useLayoutEffect, useRef, useState } from 'react';
import { CLASS_INFO, type MoveClass } from '../engine/coach';

const H = 128;
const PAD_X = 6;
const PAD_Y = 8;
const MARKED: MoveClass[] = ['brilliant', 'great', 'miss', 'mistake', 'blunder'];

function useWidth() {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(360);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    setW(el.clientWidth || 360);
    const ro = new ResizeObserver(() => setW(el.clientWidth || 360));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, w] as const;
}

export interface GraphMark {
  /** Chỉ số nước (điểm vẽ ở thế sau nước đó) */
  ply: number;
  cls: MoveClass;
}

export function WinGraph({
  wins,
  marks,
  current,
  onSelect,
  sideNames,
  phaseStarts,
  labelOf,
  xq,
}: {
  /** Cơ hội thắng của bên đi trước ở thế sau i nước (null: chưa phân tích) */
  wins: (number | null)[];
  marks: GraphMark[];
  current: number;
  onSelect: (pos: number) => void;
  sideNames: [string, string];
  /** Thế cờ bắt đầu trung cuộc / tàn cuộc */
  phaseStarts: { index: number; label: string }[];
  /** Tên nước dẫn tới thế cờ `pos` (vd "12... Nf6") */
  labelOf: (pos: number) => string;
  xq?: boolean;
}) {
  const [box, width] = useWidth();
  const [hover, setHover] = useState<number | null>(null);
  const n = Math.max(1, wins.length - 1);
  const x = (i: number) => PAD_X + (i / n) * (width - 2 * PAD_X);
  const y = (w: number) => PAD_Y + (1 - w / 100) * (H - 2 * PAD_Y);
  const idxAt = (clientX: number) => {
    const r = box.current!.getBoundingClientRect();
    return Math.max(0, Math.min(wins.length - 1, Math.round(((clientX - r.left - PAD_X) / (width - 2 * PAD_X)) * n)));
  };

  // các đoạn liên tục đã phân tích
  const segs: { i: number; w: number }[][] = [];
  let cur: { i: number; w: number }[] = [];
  wins.forEach((w, i) => {
    if (w === null) {
      if (cur.length) segs.push(cur);
      cur = [];
    } else cur.push({ i, w });
  });
  if (cur.length) segs.push(cur);
  const line = (s: { i: number; w: number }[]) => s.map((p, k) => `${k ? 'L' : 'M'}${x(p.i).toFixed(1)},${y(p.w).toFixed(1)}`).join('');
  const area = (s: { i: number; w: number }[]) => `${line(s)}L${x(s[s.length - 1].i).toFixed(1)},${H - PAD_Y}L${x(s[0].i).toFixed(1)},${H - PAD_Y}Z`;

  const show = hover ?? null;
  const hw = show !== null ? wins[show] : null;

  const onKey = (e: KeyboardEvent) => {
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (e.key === 'Home') onSelect(0);
    else if (e.key === 'End') onSelect(wins.length - 1);
    else if (step) onSelect(Math.max(0, Math.min(wins.length - 1, current + step)));
    else return;
    e.preventDefault();
  };
  const onMove = (e: PointerEvent) => {
    const i = idxAt(e.clientX);
    setHover(i);
    if (e.buttons === 1) onSelect(i);
  };

  const cw = wins[current];
  return (
    <div
      ref={box}
      className={'an-graph' + (xq ? ' xq' : '')}
      role="slider"
      tabIndex={0}
      aria-label={`Biểu đồ cơ hội thắng của ${sideNames[0]} theo từng nước`}
      aria-valuemin={0}
      aria-valuemax={wins.length - 1}
      aria-valuenow={current}
      aria-valuetext={`${current ? labelOf(current) : 'Thế cờ ban đầu'}${cw !== null ? `, ${sideNames[0]} ${Math.round(cw)}%` : ''}`}
      onKeyDown={onKey}
      onPointerMove={onMove}
      onPointerDown={(e) => onSelect(idxAt(e.clientX))}
      onPointerLeave={() => setHover(null)}
    >
      <svg width={width} height={H} aria-hidden="true">
        {segs.map((s, k) => (
          <path key={'a' + k} className="an-area" d={area(s)} />
        ))}
        <line className="an-mid" x1={PAD_X} x2={width - PAD_X} y1={y(50)} y2={y(50)} />
        {phaseStarts.map((p) => (
          <line key={p.label} className="an-phase" x1={x(p.index)} x2={x(p.index)} y1={PAD_Y} y2={H - PAD_Y} />
        ))}
        {segs.map((s, k) => (
          <path key={'l' + k} className="an-line" d={line(s)} />
        ))}
        <line className="an-cursor" x1={x(current)} x2={x(current)} y1={PAD_Y} y2={H - PAD_Y} />
        {show !== null && show !== current && <line className="an-hover" x1={x(show)} x2={x(show)} y1={PAD_Y} y2={H - PAD_Y} />}
        {marks.map((m) => {
          const w = wins[m.ply + 1];
          if (w === null || w === undefined) return null;
          return <circle key={m.ply} className="an-dot" cx={x(m.ply + 1)} cy={y(w)} r={4.5} style={{ fill: CLASS_INFO[m.cls].color }} />;
        })}
        {cw !== null && cw !== undefined && <circle className="an-now" cx={x(current)} cy={y(cw)} r={4.5} />}
      </svg>
      <span className="an-g-label top">{sideNames[0]} hơn</span>
      <span className="an-g-label bottom">{sideNames[1]} hơn</span>
      {phaseStarts.map((p) => (
        <span key={p.label} className={'an-g-phase' + (x(p.index) > width - 72 ? ' end' : '')} style={{ left: x(p.index) }}>
          {p.label}
        </span>
      ))}
      {show !== null && (
        <div className="an-tip" style={{ left: Math.min(Math.max(x(show), 72), width - 72) }}>
          <b>{show ? labelOf(show) : 'Bắt đầu'}</b>
          <span>{hw === null ? 'Đang phân tích…' : `${sideNames[0]} ${Math.round(hw)}% · ${sideNames[1]} ${Math.round(100 - hw)}%`}</span>
        </div>
      )}
    </div>
  );
}

export { MARKED as GRAPH_MARKED };
