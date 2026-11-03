// Thành phần dùng chung cho các trang cờ tướng: hiển thị nước đi, chuỗi nước, lời giải thích mục đích, âm thanh.
import { useMemo } from 'react';
import { KING, ADVISOR, ELEPHANT, HORSE, ROOK, CANNON, PAWN, PlayedLine, Position, START_FEN, playLine } from '../engine/board';
import { explainPurpose, isCaptureAt } from '../engine/explain';
import { XqPieceFace } from './XqBoard';
import { MoveList, MoveMark } from '../../components/common';
import { sounds } from '../../lib/sound';

const LETTER_TYPE: [string, number][] = [
  ['Tg', KING],
  ['S', ADVISOR],
  ['T', ELEPHANT],
  ['M', HORSE],
  ['X', ROOK],
  ['P', CANNON],
  ['B', PAWN],
];

/** Hiển thị nước đi ký hiệu Việt Nam: hình quân thay cho chữ cái (hoặc chữ cái khi chọn kiểu quân chữ Việt) */
export function XqSan({ san, red = true }: { san: string; red?: boolean }) {
  const m = LETTER_TYPE.find(([l]) => san.startsWith(l));
  if (!m) return <span className="san">{san}</span>;
  return (
    <span className={'san xq-san ' + (red ? 'red' : 'black')}>
      <span className={'xq-fig ' + (red ? 'red' : 'black')}>
        <XqPieceFace type={m[1]} red={red} />
      </span>
      <span className="xq-letter">{m[0]}</span>
      {san.slice(m[0].length)}
    </span>
  );
}

/** Danh sách nước đi hai cột (Đỏ – Đen) */
export function XqMoveList(props: {
  sans: string[];
  startFen?: string;
  current: number;
  onSelect?: (ply: number) => void;
  marks?: (MoveMark | null | undefined)[];
  noted?: Set<number>;
  notedIcon?: string;
  notedTitle?: string;
}) {
  return <MoveList {...props} renderSan={(san, white) => <XqSan san={san} red={white} />} />;
}

export function xqSafeLine(moves: string | undefined, fen: string = START_FEN): PlayedLine {
  try {
    return playLine(moves ?? '', fen);
  } catch {
    return { fens: [fen], sans: [], ucis: [] };
  }
}

export function useXqLine(moves: string | undefined, fen?: string) {
  return useMemo(() => xqSafeLine(moves, fen ?? START_FEN), [moves, fen]);
}

/** Lời giải thích mục đích (tự động, dựa trên thế cờ) cho nước vừa đi ở bước `ply` của chuỗi */
export function useXqMovePurpose(line: PlayedLine, ply: number): string {
  return useMemo(() => {
    if (ply <= 0 || ply > line.ucis.length) return '';
    try {
      const pos = new Position(line.fens[ply - 1]);
      const m = pos.moveFromUci(line.ucis[ply - 1]);
      if (!m) return '';
      const prevCapture = ply >= 2 && isCaptureAt(line.fens[ply - 2], line.ucis[ply - 2]);
      return explainPurpose(pos, m, { prevUci: line.ucis[ply - 2], prevCapture });
    } catch {
      return '';
    }
  }, [line, ply]);
}

/** Âm thanh cho nước đi `uci` tại thế `fenBefore`: thắng, chiếu, ăn quân hoặc nước thường */
export function playXqMoveSound(fenBefore: string, uci: string) {
  try {
    const pos = new Position(fenBefore);
    const m = pos.moveFromUci(uci);
    if (!m) return;
    const capture = pos.board[(m >> 7) & 127] !== 0;
    pos.make(m);
    if (!pos.hasLegalMove()) sounds.end();
    else if (pos.inCheck()) sounds.check();
    else if (capture) sounds.capture();
    else sounds.move();
  } catch {
    /* bỏ qua */
  }
}

/** Bên đi nước thứ `idx` (0 = nước đầu) của chuỗi bắt đầu từ `startFen` là Đỏ? */
export const redMovesAt = (startFen: string, idx: number) => (idx % 2 === 0) === (startFen.split(' ')[1] !== 'b');
