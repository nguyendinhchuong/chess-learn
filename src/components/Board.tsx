import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Position, moveFrom, moveTo, movePromo, sqName, parseSq } from '../engine/board';
import { PIECE_SVG } from '../assets/pieces';

export interface BoardArrow {
  from: string;
  to: string;
  color?: 'green' | 'red' | 'blue' | 'yellow' | 'orange' | 'purple';
  label?: string;
  opacity?: number;
}

export interface SquareBadge {
  square: string;
  text: string;
  color: string;
}

interface Props {
  fen: string;
  orientation?: 'white' | 'black';
  movable?: 'white' | 'black' | 'both' | 'none';
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

interface PieceInfo {
  sq: string;
  code: string;
}

function piecesFromFen(fen: string): PieceInfo[] {
  const res: PieceInfo[] = [];
  const rows = fen.split(' ')[0].split('/');
  rows.forEach((row, ri) => {
    let f = 0;
    for (const ch of row) {
      if (/\d/.test(ch)) {
        f += Number(ch);
        continue;
      }
      const color = ch === ch.toUpperCase() ? 'w' : 'b';
      res.push({ sq: 'abcdefgh'[f] + (8 - ri), code: color + ch.toLowerCase() });
      f++;
    }
  });
  return res;
}

export function Board({ fen, orientation = 'white', movable = 'none', onMove, lastMove, arrows = [], highlights = {}, badge, showCoords = true, animate = true }: Props) {
  const boardRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [drag, setDrag] = useState<{ from: string; x: number; y: number; started: boolean } | null>(null);
  const [promo, setPromo] = useState<{ from: string; to: string } | null>(null);
  const wasSelected = useRef(false);
  const flipped = orientation === 'black';

  const pieces = useMemo(() => piecesFromFen(fen), [fen]);
  const pos = useMemo(() => {
    try {
      return new Position(fen);
    } catch {
      return null;
    }
  }, [fen]);
  const sideToMove = fen.split(' ')[1] === 'b' ? 'black' : 'white';
  const canMove = movable === 'both' || movable === sideToMove;

  const legal = useMemo(() => {
    const map = new Map<string, { to: string; promo: number }[]>();
    if (!pos || !canMove) return map;
    for (const m of pos.legalMoves()) {
      const f = sqName(moveFrom(m));
      if (!map.has(f)) map.set(f, []);
      map.get(f)!.push({ to: sqName(moveTo(m)), promo: movePromo(m) });
    }
    return map;
  }, [pos, canMove]);

  const checkSq = useMemo(() => {
    if (!pos || !pos.inCheck()) return null;
    return sqName(pos.kingSq[pos.side]);
  }, [pos]);

  // Bỏ chọn khi vị trí thay đổi
  useLayoutEffect(() => {
    setSelected(null);
    setPromo(null);
    setDrag(null);
  }, [fen]);

  // Hiệu ứng trượt quân cho nước đi cuối
  const prevFen = useRef(fen);
  useLayoutEffect(() => {
    const changed = prevFen.current !== fen;
    prevFen.current = fen;
    if (!changed || !animate || !lastMove || !boardRef.current) return;
    const from = lastMove.slice(0, 2),
      to = lastMove.slice(2, 4);
    const run = (fromSq: string, toSq: string) => {
      const el = boardRef.current!.querySelector<HTMLElement>(`.piece[data-sq="${toSq}"]`);
      if (!el || typeof el.animate !== 'function') return;
      const [fx, fy] = coords(fromSq);
      const [tx, ty] = coords(toSq);
      el.animate([{ transform: `translate(${(fx - tx) * 100}%, ${(fy - ty) * 100}%)` }, { transform: 'translate(0,0)' }], {
        duration: 200,
        easing: 'cubic-bezier(.2,.7,.3,1)',
      });
    };
    run(from, to);
    // nhập thành: trượt cả Xe
    const piece = pieces.find((p) => p.sq === to);
    if (piece?.code[1] === 'k' && Math.abs(from.charCodeAt(0) - to.charCodeAt(0)) === 2) {
      const rank = to[1];
      if (to[0] === 'g') run('h' + rank, 'f' + rank);
      else run('a' + rank, 'd' + rank);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fen]);

  function coords(sq: string): [number, number] {
    const f = sq.charCodeAt(0) - 97;
    const r = Number(sq[1]) - 1;
    return flipped ? [7 - f, r] : [f, 7 - r];
  }

  function squareAt(clientX: number, clientY: number): string | null {
    const el = boardRef.current;
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const x = Math.floor(((clientX - rect.left) / rect.width) * 8);
    const y = Math.floor(((clientY - rect.top) / rect.height) * 8);
    if (x < 0 || x > 7 || y < 0 || y > 7) return null;
    const f = flipped ? 7 - x : x;
    const r = flipped ? y : 7 - y;
    return 'abcdefgh'[f] + (r + 1);
  }

  function tryMove(from: string, to: string): boolean {
    const opts = legal.get(from)?.filter((m) => m.to === to) ?? [];
    if (!opts.length) return false;
    if (opts.some((o) => o.promo)) {
      setPromo({ from, to });
      return true;
    }
    setSelected(null);
    onMove?.(from + to);
    return true;
  }

  function ownPieceAt(sq: string) {
    if (!pos) return false;
    const p = pos.board[parseSq(sq)];
    if (!p) return false;
    const color = p & 8 ? 'black' : 'white';
    return color === sideToMove && legal.has(sq);
  }

  function onPointerDown(e: React.PointerEvent) {
    if (promo) return;
    if (e.button !== 0) return;
    const sq = squareAt(e.clientX, e.clientY);
    if (!sq || !canMove) return;
    if (selected && sq !== selected && tryMove(selected, sq)) return;
    if (ownPieceAt(sq)) {
      wasSelected.current = selected === sq;
      setSelected(sq);
      const rect = boardRef.current!.getBoundingClientRect();
      setDrag({ from: sq, x: e.clientX - rect.left, y: e.clientY - rect.top, started: false });
      try {
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
      } catch {
        /* con trỏ giả lập không hỗ trợ capture */
      }
      e.preventDefault();
    } else {
      setSelected(null);
    }
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!drag) return;
    const rect = boardRef.current!.getBoundingClientRect();
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

  const targets = selected ? legal.get(selected) ?? [] : [];
  const targetSet = new Set(targets.map((t) => t.to));
  const lastFrom = lastMove?.slice(0, 2),
    lastTo = lastMove?.slice(2, 4);

  const squares = [];
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const f = flipped ? 7 - x : x;
      const r = flipped ? y : 7 - y;
      const sq = 'abcdefgh'[f] + (r + 1);
      const light = (f + r) % 2 === 1;
      const classes = ['sq', light ? 'light' : 'dark'];
      if (sq === lastFrom || sq === lastTo) classes.push('last');
      if (sq === selected) classes.push('selected');
      if (highlights[sq]) classes.push('hl-' + highlights[sq]);
      if (sq === checkSq) classes.push('check');
      const occupied = pieces.some((p) => p.sq === sq);
      squares.push(
        <div key={sq} className={classes.join(' ')} data-sq={sq}>
          {showCoords && x === 0 && <span className="coord rank">{r + 1}</span>}
          {showCoords && y === 7 && <span className="coord file">{'abcdefgh'[f]}</span>}
          {targetSet.has(sq) && <span className={occupied ? 'target capture' : 'target'} />}
        </div>,
      );
    }
  }

  return (
    <div className={'board' + (canMove ? ' interactive' : '')} ref={boardRef} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onContextMenu={(e) => e.preventDefault()}>
      <div className="squares">{squares}</div>
      <div className="pieces">
        {pieces.map((p) => {
          const [cx, cy] = coords(p.sq);
          const dragging = drag?.started && drag.from === p.sq;
          const style: React.CSSProperties = dragging
            ? { left: `calc(${drag!.x}px - 6.25%)`, top: `calc(${drag!.y}px - 6.25%)`, zIndex: 10, transform: 'scale(1.12)' }
            : { left: `${cx * 12.5}%`, top: `${cy * 12.5}%` };
          return <div key={p.sq + p.code} className={'piece' + (dragging ? ' dragging' : '')} data-sq={p.sq} style={{ ...style, backgroundImage: `url("${PIECE_SVG[p.code]}")` }} />;
        })}
      </div>
      <svg className="arrows" viewBox="0 0 100 100">
        <defs>
          {Object.entries(ARROW_COLORS).map(([k, c]) => (
            <marker key={k} id={'ah-' + k} markerWidth="4" markerHeight="4" refX="2.05" refY="2" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L4,2 L0,4 z" fill={c} />
            </marker>
          ))}
        </defs>
        {arrows.map((a, i) => (
          <ArrowShape key={i + a.from + a.to + (a.color ?? '')} arrow={a} coords={coords} />
        ))}
      </svg>
      {badge && <Badge badge={badge} coords={coords} />}
      {promo && (
        <PromotionPicker
          color={sideToMove === 'white' ? 'w' : 'b'}
          square={promo.to}
          coords={coords}
          onPick={(p) => {
            const { from, to } = promo;
            setPromo(null);
            setSelected(null);
            onMove?.(from + to + p);
          }}
          onCancel={() => setPromo(null)}
        />
      )}
    </div>
  );
}

function ArrowShape({ arrow, coords }: { arrow: BoardArrow; coords: (s: string) => [number, number] }) {
  const [fx, fy] = coords(arrow.from);
  const [tx, ty] = coords(arrow.to);
  const color = arrow.color ?? 'green';
  const c = ARROW_COLORS[color];
  const x1 = fx * 12.5 + 6.25,
    y1 = fy * 12.5 + 6.25;
  const x2 = tx * 12.5 + 6.25,
    y2 = ty * 12.5 + 6.25;
  const dx = tx - fx,
    dy = ty - fy;
  const knight = (Math.abs(dx) === 1 && Math.abs(dy) === 2) || (Math.abs(dx) === 2 && Math.abs(dy) === 1);
  const sw = 2.2;
  const shorten = 3.4;
  let d: string;
  let lx: number, ly: number;
  if (knight) {
    // đường gấp khúc hình chữ L
    const midX = Math.abs(dx) === 2 ? x2 : x1;
    const midY = Math.abs(dx) === 2 ? y1 : y2;
    const vx = x2 - midX,
      vy = y2 - midY;
    const len = Math.hypot(vx, vy);
    const ex = x2 - (vx / len) * shorten,
      ey = y2 - (vy / len) * shorten;
    d = `M${x1},${y1} L${midX},${midY} L${ex},${ey}`;
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
      <path d={d} stroke={c} strokeWidth={sw} fill="none" strokeLinecap="round" strokeLinejoin="round" markerEnd={`url(#ah-${color})`} />
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

function Badge({ badge, coords }: { badge: SquareBadge; coords: (s: string) => [number, number] }) {
  const [x, y] = coords(badge.square);
  return (
    <div className="sq-badge" style={{ left: `calc(${(x + 1) * 12.5}% - 3.2%)`, top: `calc(${y * 12.5}% - 1.6%)`, background: badge.color }}>
      {badge.text}
    </div>
  );
}

function PromotionPicker({ color, square, coords, onPick, onCancel }: { color: string; square: string; coords: (s: string) => [number, number]; onPick: (p: string) => void; onCancel: () => void }) {
  const [x, y] = coords(square);
  const down = y === 0;
  const list = ['q', 'n', 'r', 'b'];
  return (
    <div className="promo-overlay" onPointerDown={(e) => { e.stopPropagation(); onCancel(); }}>
      {list.map((p, i) => (
        <button
          key={p}
          className="promo-choice"
          style={{ left: `${x * 12.5}%`, top: `${(down ? y + i : y - i) * 12.5}%`, backgroundImage: `url("${PIECE_SVG[color + p]}")` }}
          onPointerDown={(e) => {
            e.stopPropagation();
            onPick(p);
          }}
          aria-label={p}
        />
      ))}
    </div>
  );
}

