import { Board } from '../components/Board';
import { MoveList } from '../components/common';
import { PIECE_SVG } from '../assets/pieces';
import { Position, START_FEN } from '../engine/board';
import { playMoveSound } from '../lib/sound';
import type { OnlineKit } from './kit';

export const CHESS_KIT: OnlineKit = {
  variant: 'chess',
  base: '',
  title: 'cờ vua',
  sideNames: ['Trắng', 'Đen'],
  SideIcon: ({ side }) => <img src={side === 0 ? PIECE_SVG.wk : PIECE_SVG.bk} alt="" />,
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
    <Board fen={fen} orientation={bottom === 0 ? 'white' : 'black'} movable={movable === null ? 'none' : movable === 0 ? 'white' : 'black'} onMove={onMove} lastMove={lastMove} />
  ),
  MoveList: (p) => <MoveList {...p} />,
  moveSound: (_fen, _uci, san) => playMoveSound(san),
  reasons: {
    checkmate: 'chiếu hết',
    stalemate: 'hết nước đi (pat)',
    insufficient: 'không đủ quân để chiếu hết',
    fifty: 'luật 50 nước',
    repetition: 'lặp lại thế cờ 3 lần',
    perpetual: 'chiếu dai',
    moveLimit: 'luật 50 nước',
    resign: 'xin thua',
    timeout: 'hết giờ',
    agreement: 'thỏa thuận hòa',
  },
};
