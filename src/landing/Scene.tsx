// Bàn cờ 3D cho phần mở đầu và thẻ chọn môn: mặt bàn nghiêng bằng CSS 3D, còn quân cờ được chiếu
// bằng cùng phép tính trong JS để biết chính xác quân nào gần con trỏ (quân nhô lên khi chuột lướt qua)
// và để quân bay tán loạn khi cuộn qua.
import { memo, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { approach, clamp, ease, pointer, reducedMotion, useFrame, useInView } from './motion';
import { Kind, PieceFace, Placed } from './pieces';

/** Số giả ngẫu nhiên cố định theo chỉ số (để bố cục giống nhau mỗi lần tải) */
export const seeded = (i: number) => {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

export const ChessPlane = memo(function ChessPlane({ cols, rows, offset = 0 }: { cols: number; rows: number; offset?: number }) {
  const dark: [number, number][] = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) if ((c + r + offset) % 2 === 1) dark.push([c, r]);
  return (
    <svg className="ld-plane-svg" viewBox={`0 0 ${cols} ${rows}`} preserveAspectRatio="none" aria-hidden="true">
      <rect width={cols} height={rows} className="sq-light" />
      {dark.map(([c, r]) => (
        <rect key={c + '-' + r} x={c} y={r} width={1.002} height={1.002} className="sq-dark" />
      ))}
    </svg>
  );
});

/** Lưới cờ tướng đi qua tâm các ô; bàn đầy đủ có sông, cung và chữ Sở hà Hán giới */
export const XqPlane = memo(function XqPlane({ cols, rows, full = true }: { cols: number; rows: number; full?: boolean }) {
  const d: string[] = [];
  for (let r = 0; r < rows; r++) d.push(`M.5 ${r + 0.5}H${cols - 0.5}`);
  for (let c = 0; c < cols; c++) {
    const x = c + 0.5;
    if (full && c > 0 && c < cols - 1) d.push(`M${x} .5V4.5M${x} 5.5V9.5`);
    else d.push(`M${x} .5V${rows - 0.5}`);
  }
  if (full) d.push('M3.5 .5L5.5 2.5M5.5 .5L3.5 2.5M3.5 7.5L5.5 9.5M5.5 7.5L3.5 9.5');
  return (
    <svg className="ld-plane-svg" viewBox={`0 0 ${cols} ${rows}`} preserveAspectRatio="none" aria-hidden="true">
      <rect width={cols} height={rows} className="xq-wood" />
      <path d={d.join('')} className="xq-line" />
      <rect x={0.5} y={0.5} width={cols - 1} height={rows - 1} className="xq-line xq-edge" />
      {full && (
        <g className="xq-river">
          <text x={2.5} y={5.16}>
            楚 河
          </text>
          <text x={6.5} y={5.16}>
            漢 界
          </text>
        </g>
      )}
    </svg>
  );
});

export interface SceneProps {
  kind: Kind;
  cols: number;
  rows: number;
  pieces: Placed[];
  /** Độ nghiêng gốc của mặt bàn (độ) */
  rx: number;
  rz: number;
  /** Bề rộng khung chia cho cạnh một ô */
  fit: number;
  label: string;
  /** Cuộn qua phần tử này thì quân bay lên tán loạn và bàn xoay đi */
  scatterRef?: React.RefObject<HTMLElement>;
  /** Chỉ nghiêng theo chuột khi con trỏ nằm trong phần tử này (mặc định: theo cả cửa sổ) */
  tiltRef?: React.RefObject<HTMLElement>;
  full?: boolean;
  className?: string;
}

export function Scene({ kind, cols, rows, pieces, rx, rz, fit, label, scatterRef, tiltRef, full = true, className }: SceneProps) {
  const box = useRef<HTMLDivElement>(null);
  const plane = useRef<HTMLDivElement>(null);
  const els = useRef<(HTMLDivElement | null)[]>([]);
  const faces = useRef<(HTMLElement | null)[]>([]);
  const shadows = useRef<(HTMLDivElement | null)[]>([]);
  const [u, setU] = useState(0);
  const inView = useInView(box, '80px 0px');
  const reduced = useMemo(reducedMotion, []);
  const n = pieces.length;
  const st = useRef({
    rx,
    rz,
    lift: new Float32Array(n),
    sx: new Float32Array(n).fill(1e4),
    sy: new Float32Array(n).fill(1e4),
    z: new Float32Array(n),
    zi: new Int32Array(n),
    order: Array.from({ length: n }, (_, i) => i),
    // giá trị đã ghi lần trước: chỉ ghi lại khi đổi, để khung hình đứng yên gần như không tốn gì
    tf: new Array<string>(n),
    op: new Array<string>(n),
    stf: new Array<string>(n),
    sop: new Array<string>(n),
    plane: '',
    face: 1e4,
    t0: -1,
    rect: null as DOMRect | null,
    tilt: null as DOMRect | null,
    scatter: 0,
  });

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setU(el.clientWidth / fit));
    ro.observe(el);
    return () => ro.disconnect();
  }, [fit]);

  /** Vẽ một khung hình: nghiêng bàn, chiếu từng quân lên màn hình, cập nhật bóng */
  const paint = (t: number, dt: number) => {
    const s = st.current;
    if (!u || !plane.current) return;
    const P = u * 24;
    let tx = rx,
      tz = rz;
    let px = 1e4,
      py = 1e4;
    if (!reduced) {
      const area = s.tilt;
      const inside = area && pointer.x >= area.left && pointer.x <= area.right && pointer.y >= area.top && pointer.y <= area.bottom;
      if (pointer.fine && pointer.moved && (!area || inside)) {
        const nx = area ? (pointer.x - area.left) / area.width : pointer.nx;
        const ny = area ? (pointer.y - area.top) / area.height : pointer.ny;
        tx += (ny - 0.5) * -10;
        tz += (nx - 0.5) * 16;
      } else {
        tz += Math.sin(t / 2600) * 3;
        tx += Math.sin(t / 3400) * 1.5;
      }
      tz += s.scatter * 28;
      tx += s.scatter * 10;
      if (s.rect) {
        px = pointer.x - (s.rect.left + s.rect.width / 2);
        py = pointer.y - (s.rect.top + s.rect.height / 2);
      }
    }
    s.rx = reduced ? tx : approach(s.rx, tx, dt, 4);
    s.rz = reduced ? tz : approach(s.rz, tz, dt, 4);
    const pt = `perspective(${P}px) rotateX(${s.rx.toFixed(3)}deg) rotateZ(${s.rz.toFixed(3)}deg)`;
    if (pt !== s.plane) {
      s.plane = pt;
      plane.current.style.transform = pt;
    }
    // mặt chữ quân cờ tướng xoay theo bàn. Ghi thẳng vào từng mặt (mỗi mặt là một lớp riêng) chứ không đặt
    // biến CSS trên khung: biến kế thừa buộc tính lại kiểu cho mọi phần tử bên trong ở mỗi khung hình,
    // là phần nặng nhất trên điện thoại
    if (kind === 'xq' && Math.abs(s.rz - s.face) > 0.2) {
      s.face = s.rz;
      const f = `rotate(${s.rz.toFixed(2)}deg)`;
      for (const el of faces.current) if (el) el.style.transform = f;
    }

    const a = (s.rx * Math.PI) / 180,
      z = (s.rz * Math.PI) / 180;
    const cosA = Math.cos(a),
      sinA = Math.sin(a),
      cosZ = Math.cos(z),
      sinZ = Math.sin(z);
    if (s.t0 < 0) s.t0 = t;
    const elapsed = t - s.t0;
    const sc = reduced ? 0 : s.scatter;
    const w = kind === 'chess' ? u * 1.04 : u * 0.9;
    const R = u * 1.9;

    for (let i = 0; i < n; i++) {
      const el = els.current[i];
      const sh = shadows.current[i];
      if (!el) continue;
      const p = pieces[i];
      const r1 = seeded(i * 3 + 1),
        r2 = seeded(i * 3 + 2),
        r3 = seeded(i * 3 + 3);
      // quân rơi xuống bàn lần lượt, hàng xa trước
      const e = reduced ? 1 : ease(clamp((elapsed - 120 - p.r * 45 - r1 * 160) / 900));
      // quân gần con trỏ nhô lên
      const dist = Math.hypot(px - s.sx[i], py - (s.sy[i] - (kind === 'chess' ? w * 0.45 : 0)));
      const target = dist < R ? (1 - dist / R) ** 2 * u * 0.85 : 0;
      s.lift[i] = reduced ? 0 : approach(s.lift[i], target, dt, 10);

      const lz = s.lift[i] + (1 - e) * u * 7 + sc * (1.5 + r1 * 5) * u;
      const lx = (p.c + 0.5 - cols / 2) * u + sc * (r2 - 0.5) * 6 * u;
      const ly = (p.r + 0.5 - rows / 2) * u + sc * (r3 - 0.5) * 4 * u;
      const x1 = lx * cosZ - ly * sinZ,
        y1 = lx * sinZ + ly * cosZ;
      const Y = y1 * cosA - lz * sinA,
        Z = y1 * sinA + lz * cosA;
      const k = P / (P - Z);
      const sx = x1 * k,
        sy = Y * k;
      s.sx[i] = sx;
      s.sy[i] = sy;
      s.z[i] = Z;
      let tf: string;
      if (kind === 'chess') {
        const spin = sc * (r1 - 0.5) * 140 + (s.lift[i] / u) * (r2 - 0.5) * 16;
        tf = `translate3d(${(sx - w / 2).toFixed(2)}px, ${(sy - w * 0.92).toFixed(2)}px, 0) scale(${k.toFixed(4)}) rotate(${spin.toFixed(2)}deg)`;
      } else {
        tf = `translate3d(${(sx - w / 2).toFixed(2)}px, ${(sy - w / 2).toFixed(2)}px, 0) scale(${k.toFixed(4)}) scaleY(${cosA.toFixed(4)})`;
      }
      if (tf !== s.tf[i]) {
        s.tf[i] = tf;
        el.style.transform = tf;
      }
      const op = (e * clamp(1 - sc * 1.15)).toFixed(3);
      if (op !== s.op[i]) {
        s.op[i] = op;
        el.style.opacity = op;
      }
      if (sh) {
        const h = lz / u;
        const stf = `translate(${(lx + (cols * u) / 2 - u * 0.4).toFixed(2)}px, ${(ly + (rows * u) / 2 - u * 0.4).toFixed(2)}px) scale(${(1 / (1 + h * 0.5)).toFixed(4)})`;
        if (stf !== s.stf[i]) {
          s.stf[i] = stf;
          sh.style.transform = stf;
        }
        const sop = (e * clamp(1 - h * 0.35) * clamp(1 - sc * 1.4) * 0.55).toFixed(3);
        if (sop !== s.sop[i]) {
          s.sop[i] = sop;
          sh.style.opacity = sop;
        }
      }
    }

    // quân gần mắt người xem nằm trên: chỉ ghi z-index khi thứ tự thật sự đổi chỗ, vì mỗi lần đổi
    // z-index trình duyệt phải vẽ và tách lớp lại cả bàn
    s.order.sort((a, b) => s.z[a] - s.z[b]);
    for (let r = 0; r < n; r++) {
      const i = s.order[r];
      const el = els.current[i];
      if (el && s.zi[i] !== r + 1) {
        s.zi[i] = r + 1;
        el.style.zIndex = String(r + 1);
      }
    }
  };

  useFrame(
    {
      read: () => {
        const s = st.current;
        s.rect = box.current?.getBoundingClientRect() ?? null;
        s.tilt = tiltRef?.current?.getBoundingClientRect() ?? null;
        const sr = scatterRef?.current?.getBoundingClientRect();
        s.scatter = sr ? clamp(-sr.top / (sr.height * 0.75)) : 0;
      },
      write: paint,
    },
    inView && u > 0 && !reduced,
  );

  // vẽ ngay khung đầu tiên (và là khung duy nhất khi người dùng tắt chuyển động)
  useLayoutEffect(() => {
    if (u) paint(reduced ? 0 : performance.now(), 1 / 60);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [u]);

  const unit = u + 'px';
  return (
    <div ref={box} className={'ld-scene ' + kind + (className ? ' ' + className : '')} role="img" aria-label={label} style={{ ['--u' as string]: unit }}>
      <div ref={plane} className="ld-plane" style={{ width: cols * u, height: rows * u }}>
        {kind === 'chess' ? <ChessPlane cols={cols} rows={rows} offset={cols === 8 ? 0 : 1} /> : <XqPlane cols={cols} rows={rows} full={full} />}
        {pieces.map((_, i) => (
          <div key={'s' + i} ref={(el) => (shadows.current[i] = el)} className="ld-shadow" style={{ width: u * 0.8, height: u * 0.8, opacity: 0 }} />
        ))}
      </div>
      <div className="ld-pieces">
        {pieces.map((p, i) => (
          <div
            key={i}
            ref={(el) => {
              els.current[i] = el;
              faces.current[i] = el?.querySelector<HTMLElement>('.ld-disc-face') ?? null;
            }}
            className="ld-piece"
            style={{ width: kind === 'chess' ? u * 1.04 : u * 0.9, height: kind === 'chess' ? u * 1.04 : u * 0.9, opacity: 0 }}
          >
            <PieceFace k={p.key} kind={kind} />
          </div>
        ))}
      </div>
    </div>
  );
}
