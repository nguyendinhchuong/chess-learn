import { XqBoard } from './XqBoard';
import { XqMoveList, XqSan } from './xqCommon';
import { cancelAnalysis, requestAnalysis } from '../engine/client';
import { XQ_REVIEW } from '../engine/gameReview';
import { splitMoves } from '../engine/board';
import { XQ_GAMES } from '../data/games';
import { XQ_KIT } from './xqOnlineKit';
import { formatSheet } from '../../analysis/sheet';
import type { AnalysisKit } from '../../analysis/kit';

export const XQ_ANALYSIS: AnalysisKit = {
  online: XQ_KIT,
  engine: XQ_REVIEW,
  Board: ({ fen, bottom, lastMove, arrows, badge }) => (
    <XqBoard fen={fen} orientation={bottom === 0 ? 'red' : 'black'} movable="none" lastMove={lastMove} arrows={arrows} badge={badge} />
  ),
  san: (san, side) => <XqSan san={san} red={side === 0} />,
  MoveList: (p) => <XqMoveList {...p} />,
  analyze: (startFen, moves, timeMs) => requestAnalysis(startFen, moves, { multiPV: 3, timeMs, channel: 'game-review' }),
  cancel: cancelAnalysis,
  kingName: 'Tướng',
  sample() {
    const g = XQ_GAMES.find((x) => x.id === 'ho-vinh-hoa-truong-cuong-2000');
    if (!g) return null;
    const line = XQ_REVIEW.replay(splitMoves(g.moves));
    if (line.error) return null;
    const players: [string, string] = ['Hồ Vinh Hoa', 'Trương Cường'];
    return {
      id: 'sample-xq-ho-vinh-hoa',
      variant: 'xiangqi',
      pgn: formatSheet({ variant: 'xiangqi', players, result: '1-0', reason: 'resign', reasonText: 'Đen xin thua', time: null, date: new Date(2000, 10, 1), site: g.event, ucis: line.ucis, sans: line.sans }),
      players,
      result: '1-0',
      you: null,
      plies: line.ucis.length,
      savedAt: Date.now(),
      source: 'import',
    };
  },
};
