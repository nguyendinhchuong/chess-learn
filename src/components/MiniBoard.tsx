import { memo } from 'react';
import { PIECE_SVG } from '../assets/pieces';

// Bàn cờ thu nhỏ chỉ để xem (dùng trong danh sách có hàng trăm thẻ): nền ô cờ là một gradient,
// mỗi quân là một thẻ div dùng ảnh nền khai báo một lần trong CSS – nhẹ hơn nhiều so với bàn cờ tương tác.

let styleInjected = false;
function injectStyle() {
  if (styleInjected || typeof document === 'undefined') return;
  styleInjected = true;
  const css = Object.entries(PIECE_SVG)
    .map(([code, uri]) => `.mini-board .mp.${code}{background-image:url("${uri}")}`)
    .join('\n');
  const el = document.createElement('style');
  el.dataset.mini = 'pieces';
  el.textContent = css;
  document.head.appendChild(el);
}

interface Props {
  fen: string;
  orientation?: 'white' | 'black';
  lastMove?: string | null;
  label?: string;
}

function sqPos(sq: string, flipped: boolean): [number, number] {
  const f = sq.charCodeAt(0) - 97;
  const r = Number(sq[1]) - 1;
  return flipped ? [7 - f, r] : [f, 7 - r];
}

export const MiniBoard = memo(function MiniBoard({ fen, orientation = 'white', lastMove, label }: Props) {
  injectStyle();
  const flipped = orientation === 'black';
  const pieces: { code: string; x: number; y: number }[] = [];
  fen
    .split(' ')[0]
    .split('/')
    .forEach((row, ri) => {
      let f = 0;
      for (const ch of row) {
        if (/\d/.test(ch)) {
          f += Number(ch);
          continue;
        }
        const code = (ch === ch.toUpperCase() ? 'w' : 'b') + ch.toLowerCase();
        const sq = 'abcdefgh'[f] + (8 - ri);
        const [x, y] = sqPos(sq, flipped);
        pieces.push({ code, x, y });
        f++;
      }
    });
  const marks = lastMove ? [lastMove.slice(0, 2), lastMove.slice(2, 4)].map((s) => sqPos(s, flipped)) : [];
  return (
    <div className="mini-board" role="img" aria-label={label ?? 'Thế cờ'}>
      {marks.map(([x, y], i) => (
        <span key={'m' + i} className="mm" style={{ left: `${x * 12.5}%`, top: `${y * 12.5}%` }} />
      ))}
      {pieces.map((p, i) => (
        <span key={i} className={'mp ' + p.code} style={{ left: `${p.x * 12.5}%`, top: `${p.y * 12.5}%` }} />
      ))}
    </div>
  );
});
