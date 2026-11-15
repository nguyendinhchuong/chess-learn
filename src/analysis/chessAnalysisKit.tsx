import { Board } from '../components/Board';
import { MoveList, San } from '../components/common';
import { cancelAnalysis, requestAnalysis } from '../engine/client';
import { splitMoves } from '../engine/board';
import { GAMES } from '../data/games';
import { CHESS_KIT } from '../online/chessKit';
import { CHESS_REVIEW } from './chessReview';
import { formatSheet } from './sheet';
import type { AnalysisKit } from './kit';

export const CHESS_ANALYSIS: AnalysisKit = {
  online: CHESS_KIT,
  engine: CHESS_REVIEW,
  Board: ({ fen, bottom, lastMove, arrows, badge }) => (
    <Board fen={fen} orientation={bottom === 0 ? 'white' : 'black'} movable="none" lastMove={lastMove} arrows={arrows} badge={badge} />
  ),
  san: (san, side) => <San san={san} white={side === 0} />,
  MoveList: (p) => <MoveList {...p} />,
  analyze: (startFen, moves, timeMs) => requestAnalysis(startFen, moves, { multiPV: 3, timeMs, channel: 'game-review' }),
  cancel: cancelAnalysis,
  kingName: 'Vua',
  sample() {
    const g = GAMES.find((x) => x.id === 'van-co-nha-hat-opera-1858');
    if (!g) return null;
    const line = CHESS_REVIEW.replay(splitMoves(g.moves));
    if (line.error) return null;
    const players: [string, string] = ['Paul Morphy', 'Công tước Brunswick & Bá tước Isouard'];
    return {
      id: 'sample-chess-opera',
      variant: 'chess',
      pgn: formatSheet({ variant: 'chess', players, result: '1-0', reason: 'checkmate', reasonText: 'Chiếu hết', time: null, date: new Date(1858, 10, 2), site: 'Nhà hát Opera Paris', ucis: line.ucis, sans: line.sans }),
      players,
      result: '1-0',
      you: null,
      plies: line.ucis.length,
      savedAt: Date.now(),
      source: 'import',
    };
  },
};
