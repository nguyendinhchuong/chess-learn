import { KING, Position, START_FEN } from '../engine/board';
import { XqBoard, XqPieceFace } from './XqBoard';
import { XqMoveList, playXqMoveSound } from './xqCommon';
import type { OnlineKit } from '../../online/kit';

export const XQ_KIT: OnlineKit = {
  variant: 'xiangqi',
  base: '/co-tuong',
  title: 'cờ tướng',
  sideNames: ['Đỏ', 'Đen'],
  SideIcon: ({ side }) => (
    <span className={'xq-fig ' + (side === 0 ? 'red' : 'black')}>
      <XqPieceFace type={KING} red={side === 0} />
    </span>
  ),
  replay(moves) {
    const pos = new Position(START_FEN);
    const fens = [pos.fen()];
    const sans: string[] = [];
    for (const u of moves) {
      const m = pos.moveFromUci(u);
      if (!m) break;
      sans.push(pos.moveToSan(m));
      pos.make(m);
      fens.push(pos.fen());
    }
    return { fens, sans };
  },
  Board: ({ fen, bottom, movable, onMove, lastMove }) => (
    <XqBoard fen={fen} orientation={bottom === 0 ? 'red' : 'black'} movable={movable === null ? 'none' : movable === 0 ? 'red' : 'black'} onMove={onMove} lastMove={lastMove} />
  ),
  MoveList: (p) => <XqMoveList {...p} />,
  moveSound: (fen, uci) => playXqMoveSound(fen, uci),
  reasons: {
    checkmate: 'chiếu bí',
    stalemate: 'khốn bí (hết nước đi)',
    insufficient: 'không còn quân tấn công',
    fifty: 'luật 60 nước không ăn quân',
    repetition: 'lặp lại thế cờ 3 lần',
    perpetual: 'chiếu dai – phạm luật',
    moveLimit: 'luật 60 nước không ăn quân',
    resign: 'xin thua',
    timeout: 'hết giờ',
    agreement: 'thỏa thuận hòa',
  },
};
