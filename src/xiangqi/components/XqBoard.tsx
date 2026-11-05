import { memo, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Position, moveFrom, moveTo, sqName, parseSq, PIECE_HAN, PIECE_VI, KING, ADVISOR, ELEPHANT, HORSE, ROOK, CANNON, PAWN } from '../engine/board';
import type { BoardArrow, SquareBadge } from '../../components/Board';

export type { BoardArrow, SquareBadge };

interface Props {
  fen: string;
  orientation?: 'red' | 'black';
  movable?: 'red' | 'black' | 'both' | 'none';
  onMove?: (uci: string) => void;
  lastMove?: string | null;
  arrows?: BoardArrow[];
  highlights?: Record<string, string>;
  badge?: SquareBadge | null;
  showCoords?: boolean;
  animate?: boolean;
}

const ARROW_COLORS: Record<string, string> = {
  green: '#15781b',
  red: '#c0262d',
  blue: '#1d5fd1',
  yellow: '#e0a800',
  orange: '#e8590c',
  purple: '#8a3ffc',
};

const TYPE_OF: Record<string, number> = { k: KING, a: ADVISOR, b: ELEPHANT, e: ELEPHANT, n: HORSE, h: HORSE, r: ROOK, c: CANNON, p: PAWN };
/** Chữ viết tắt tiếng Việt trên quân (kiểu quân "chữ Việt") */
const VI_SHORT = ['', 'Tướng', 'Sĩ', 'Tượng', 'Mã', 'Xe', 'Pháo', 'Tốt'];

export interface XqPieceInfo {
  sq: string;
  type: number;
  red: boolean;
}

export function xqPiecesFromFen(fen: string): XqPieceInfo[] {
  const res: XqPieceInfo[] = [];
  const rows = fen.split(' ')[0].split('/');
  rows.forEach((row, ri) => {
    let f = 0;
    for (const ch of row) {
      if (/\d/.test(ch)) {
        f += Number(ch);
        continue;
      }
      const t = TYPE_OF[ch.toLowerCase()];
      if (t) res.push({ sq: 'abcdefghi'[f] + (9 - ri), type: t, red: ch === ch.toUpperCase() });
      f++;
    }
  });
  return res;
}

/** Hình quân cờ tướng (đĩa tròn có chữ Hán / chữ Việt) */
export function XqPieceFace({ type, red }: { type: number; red: boolean }) {
  return (
    <span className="disc">
      <span className="han">{PIECE_HAN[type][red ? 0 : 1]}</span>
      <span className="vi">{VI_SHORT[type]}</span>
    </span>
  );
}

/** Lưới bàn cờ: 9 lộ × 10 hàng, sông, cung (đường chéo) và dấu điểm Pháo/Tốt. Đối xứng nên không phụ thuộc chiều xem. */
export const XqGrid = memo(function XqGrid({ river = true }: { river?: boolean }) {
  const lines: string[] = [];
  for (let r = 0; r < 10; r++) lines.push(`M5 ${5 + r * 10}H85`);
  for (let c = 0; c < 9; c++) {
    const x = 5 + c * 10;
    if (c === 0 || c === 8) lines.push(`M${x} 5V95`);
    else lines.push(`M${x} 5V45M${x} 55V95`);
  }
  lines.push('M35 5L55 25M55 5L35 25M35 75L55 95M55 75L35 95');
  const marks: string[] = [];
  const mark = (c: number, r: number) => {
    const x = 5 + c * 10,
      y = 5 + r * 10;
    const g = 1.2,
      l = 2.6;
    for (const sx of [-1, 1]) {
      if ((c === 0 && sx < 0) || (c === 8 && sx > 0)) continue;
      for (const sy of [-1, 1]) marks.push(`M${x + sx * (g + l)} ${y + sy * g}H${x + sx * g}V${y + sy * (g + l)}`);
    }
  };
  for (const r of [2, 7]) for (const c of [1, 7]) mark(c, r);
  for (const r of [3, 6]) for (const c of [0, 2, 4, 6, 8]) mark(c, r);
  return (
    <svg className="xq-grid" viewBox="0 0 90 100" preserveAspectRatio="none" aria-hidden="true">
      <rect x="3.6" y="3.6" width="82.8" height="92.8" className="xq-frame" />
      <path d={lines.join('')} className="xq-lines" />
      <path d={marks.join('')} className="xq-marks-lines" />
      {river && (
        <g className="xq-river">
          <text x="25" y="51.6" textAnchor="middle">
            楚 河
          </text>
          <text x="65" y="51.6" textAnchor="middle">
            漢 界
          </text>
        </g>
      )}
    </svg>
  );
});

export function XqBoard({ fen, orientation = 'red', movable = 'none', onMove, lastMove, arrows = [], highlights = {}, badge, showCoords = true, animate = true }: Props) {
  const fieldRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [drag, setDrag] = useState<{ from: string; x: number; y: number; started: boolean } | null>(null);
  const wasSelected = useRef(false);
  const flipped = orientation === 'black';

  const pieces = useMemo(() => xqPiecesFromFen(fen), [fen]);
  const pos = useMemo(() => {
    try {
      return new Position(fen);
    } catch {
      return null;
    }
  }, [fen]);
  const sideToMove = fen.split(' ')[1] === 'b' ? 'black' : 'red';
  const canMove = movable === 'both' || movable === sideToMove;

  const legal = useMemo(() => {
    const map = new Map<string, string[]>();
    if (!pos || !canMove) return map;
    for (const m of pos.legalMoves()) {
      const f = sqName(moveFrom(m));
      if (!map.has(f)) map.set(f, []);
      map.get(f)!.push(sqName(moveTo(m)));
    }
    return map;
  }, [pos, canMove]);

  const checkSq = useMemo(() => {
    if (!pos || !pos.inCheck()) return null;
    return sqName(pos.kingSq[pos.side]);
  }, [pos]);

  useLayoutEffect(() => {
    setSelected(null);
    setDrag(null);
  }, [fen]);

  function coords(sq: string): [number, number] {
    const x = sq.charCodeAt(0) - 97;
    const y = Number(sq[1]);
    return flipped ? [8 - x, y] : [x, 9 - y];
  }

  // Hiệu ứng trượt quân cho nước đi cuối
  const prevFen = useRef(fen);
  useLayoutEffect(() => {
    const changed = prevFen.current !== fen;
    prevFen.current = fen;
    if (!changed || !animate || !lastMove || !fieldRef.current) return;
    const from = lastMove.slice(0, 2),
      to = lastMove.slice(2, 4);
    const el = fieldRef.current.querySelector<HTMLElement>(`.xq-piece[data-sq="${to}"]`);
    if (!el || typeof el.animate !== 'function') return;
    const [fx, fy] = coords(from);
    const [tx, ty] = coords(to);
    el.animate([{ transform: `translate(${(fx - tx) * 100}%, ${(fy - ty) * 100}%)` }, { transform: 'translate(0,0)' }], { duration: 200, easing: 'cubic-bezier(.2,.7,.3,1)' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fen]);

  function squareAt(clientX: number, clientY: number): string | null {
    const el = fieldRef.current;
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const cx = Math.floor(((clientX - rect.left) / rect.width) * 9);
    const cy = Math.floor(((clientY - rect.top) / rect.height) * 10);
    if (cx < 0 || cx > 8 || cy < 0 || cy > 9) return null;
    const x = flipped ? 8 - cx : cx;
    const y = flipped ? cy : 9 - cy;
    return 'abcdefghi'[x] + y;
  }

  function tryMove(from: string, to: string): boolean {
    if (!legal.get(from)?.includes(to)) return false;
    setSelected(null);
    onMove?.(from + to);
    return true;
  }

  function ownPieceAt(sq: string) {
    if (!pos) return false;
    const p = pos.board[parseSq(sq)];
    if (!p) return false;
    const color = p & 8 ? 'black' : 'red';
    return color === sideToMove && legal.has(sq);
  }

  function onPointerDown(e: React.PointerEvent) {
    if (e.button !== 0) return;
    const sq = squareAt(e.clientX, e.clientY);
    if (!sq || !canMove) return;
    if (selected && sq !== selected && tryMove(selected, sq)) return;
    if (ownPieceAt(sq)) {
      wasSelected.current = selected === sq;
      setSelected(sq);
      const rect = fieldRef.current!.getBoundingClientRect();
      setDrag({ from: sq, x: e.clientX - rect.left, y: e.clientY - rect.top, started: false });
      try {
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
      } catch {
        /* con trỏ giả lập không hỗ trợ capture */
      }
      e.preventDefault();
    } else setSelected(null);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!drag) return;
    const rect = fieldRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left,
      y = e.clientY - rect.top;
    const started = drag.started || Math.hypot(x - drag.x, y - drag.y) > 4;
    setDrag({ ...drag, x, y, started });
  }

  function onPointerUp(e: React.PointerEvent) {
    if (!drag) return;
    const sq = squareAt(e.clientX, e.clientY);
    const from = drag.from;
    setDrag(null);
    if (!sq) return;
    if (sq === from) {
      if (!drag.started && wasSelected.current) setSelected(null);
      return;
    }
    if (!tryMove(from, sq)) setSelected(drag.started ? null : selected);
  }

  const targets = new Set(selected ? legal.get(selected) ?? [] : []);
  const occupied = new Set(pieces.map((p) => p.sq));
  const lastFrom = lastMove?.slice(0, 2),
    lastTo = lastMove?.slice(2, 4);

  const cell = (sq: string) => {
    const [cx, cy] = coords(sq);
    return { left: `${(cx * 100) / 9}%`, top: `${cy * 10}%` };
  };

  const marks: JSX.Element[] = [];
  for (const sq of [lastFrom, lastTo]) if (sq) marks.push(<span key={'l' + sq} className="xq-mark last" style={cell(sq)} />);
  for (const [sq, color] of Object.entries(highlights)) marks.push(<span key={'h' + sq} className={'xq-mark hl-' + color} style={cell(sq)} />);
  if (selected) marks.push(<span key="sel" className="xq-mark selected" style={cell(selected)} />);
  if (checkSq) marks.push(<span key="chk" className="xq-mark check" style={cell(checkSq)} />);

  const topNums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const bottomNums = [9, 8, 7, 6, 5, 4, 3, 2, 1];
  // bên ở phía trên/dưới (màu số)
  const topRed = flipped;

  return (
    <div className={'xq-board' + (showCoords ? ' with-coords' : '') + (canMove ? ' interactive' : '')}>
      {showCoords && (
        <div className={'xq-nums top ' + (topRed ? 'red' : 'black')} aria-hidden="true">
          {topNums.map((n) => (
            <span key={n}>{n}</span>
          ))}
        </div>
      )}
      <div className="xq-field" ref={fieldRef} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onContextMenu={(e) => e.preventDefault()}>
        <XqGrid />
        <div className="xq-layer">{marks}</div>
        <div className="xq-layer pieces">
          {pieces.map((p) => {
            const dragging = drag?.started && drag.from === p.sq;
            const style: React.CSSProperties = dragging
              ? { left: `calc(${drag!.x}px - 5.5556%)`, top: `calc(${drag!.y}px - 5%)`, zIndex: 10, transform: 'scale(1.12)' }
              : cell(p.sq);
            return (
              <div key={p.sq + p.type + p.red} className={'xq-piece ' + (p.red ? 'red' : 'black') + (dragging ? ' dragging' : '')} data-sq={p.sq} style={style} aria-label={`${PIECE_VI[p.type]} ${p.red ? 'Đỏ' : 'Đen'} ${p.sq}`}>
                <XqPieceFace type={p.type} red={p.red} />
              </div>
            );
          })}
        </div>
        <div className="xq-layer targets">
          {[...targets].map((sq) => (
            <span key={sq} className={'xq-target' + (occupied.has(sq) ? ' capture' : '')} style={cell(sq)} />
          ))}
        </div>
        <svg className="xq-arrows" viewBox="0 0 90 100" preserveAspectRatio="none">
          <defs>
            {Object.entries(ARROW_COLORS).map(([k, c]) => (
              <marker key={k} id={'xah-' + k} markerWidth="4" markerHeight="4" refX="2.05" refY="2" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L4,2 L0,4 z" fill={c} />
              </marker>
            ))}
          </defs>
          {arrows.map((a, i) => (
            <XqArrow key={i + a.from + a.to + (a.color ?? '')} arrow={a} coords={coords} />
          ))}
        </svg>
        {badge && (
          <div
            className="sq-badge xq-badge"
            style={{ left: `min(calc(${((coords(badge.square)[0] + 1) * 100) / 9}% - 4%), calc(100% - max(5.4%, 20px)))`, top: `max(calc(${coords(badge.square)[1] * 10}% - 1.2%), 0px)`, background: badge.color }}
          >
            {badge.text}
          </div>
        )}
      </div>
      {showCoords && (
        <div className={'xq-nums bottom ' + (topRed ? 'black' : 'red')} aria-hidden="true">
          {bottomNums.map((n) => (
            <span key={n}>{n}</span>
          ))}
        </div>
      )}
    </div>
  );
}

function XqArrow({ arrow, coords }: { arrow: BoardArrow; coords: (s: string) => [number, number] }) {
  const [fx, fy] = coords(arrow.from);
  const [tx, ty] = coords(arrow.to);
  const color = arrow.color ?? 'green';
  const c = ARROW_COLORS[color];
  const P = (x: number, y: number): [number, number] => [x * 10 + 5, y * 10 + 5];
  const [x1, y1] = P(fx, fy);
  const [x2, y2] = P(tx, ty);
  const dx = tx - fx,
    dy = ty - fy;
  const shorten = 3.4;
  let d: string;
  let lx: number, ly: number;
  const horse = (Math.abs(dx) === 1 && Math.abs(dy) === 2) || (Math.abs(dx) === 2 && Math.abs(dy) === 1);
  if (horse) {
    // Mã: một bước thẳng (qua chân mã) rồi một bước chéo
    const [mx, my] = Math.abs(dy) === 2 ? P(fx, fy + Math.sign(dy)) : P(fx + Math.sign(dx), fy);
    const vx = x2 - mx,
      vy = y2 - my;
    const len = Math.hypot(vx, vy);
    const ex = x2 - (vx / len) * shorten,
      ey = y2 - (vy / len) * shorten;
    d = `M${x1},${y1} L${mx},${my} L${ex},${ey}`;
    lx = ex;
    ly = ey;
  } else {
    const len = Math.hypot(x2 - x1, y2 - y1);
    const ex = x2 - ((x2 - x1) / len) * shorten,
      ey = y2 - ((y2 - y1) / len) * shorten;
    d = `M${x1},${y1} L${ex},${ey}`;
    lx = ex;
    ly = ey;
  }
  return (
    <g opacity={arrow.opacity ?? 0.82}>
      <path d={d} stroke={c} strokeWidth={2.2} fill="none" strokeLinecap="round" strokeLinejoin="round" markerEnd={`url(#xah-${color})`} />
      {arrow.label && (
        <g transform={`translate(${lx},${ly - 4.5})`}>
          <rect x={-5} y={-2.6} width={10} height={5.2} rx={2.6} fill={c} />
          <text x={0} y={1.2} textAnchor="middle" fontSize="3.4" fontWeight="700" fill="#fff">
            {arrow.label}
          </text>
        </g>
      )}
    </g>
  );
}

/** Bàn cờ thu nhỏ chỉ để xem (dùng trong danh sách thẻ) */
export const XqMiniBoard = memo(function XqMiniBoard({ fen, orientation = 'red', lastMove, label }: { fen: string; orientation?: 'red' | 'black'; lastMove?: string | null; label?: string }) {
  const flipped = orientation === 'black';
  const pieces = xqPiecesFromFen(fen);
  const pos = (sq: string) => {
    const x = sq.charCodeAt(0) - 97,
      y = Number(sq[1]);
    const [cx, cy] = flipped ? [8 - x, y] : [x, 9 - y];
    return { left: `${(cx * 100) / 9}%`, top: `${cy * 10}%` };
  };
  return (
    <div className="xq-board mini" role="img" aria-label={label ?? 'Thế cờ'}>
      <div className="xq-field">
        <XqGrid river={false} />
        <div className="xq-layer">
          {lastMove && [lastMove.slice(0, 2), lastMove.slice(2, 4)].map((sq) => <span key={sq} className="xq-mark last" style={pos(sq)} />)}
        </div>
        <div className="xq-layer pieces">
          {pieces.map((p, i) => (
            <div key={i} className={'xq-piece ' + (p.red ? 'red' : 'black')} style={pos(p.sq)}>
              <XqPieceFace type={p.type} red={p.red} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
