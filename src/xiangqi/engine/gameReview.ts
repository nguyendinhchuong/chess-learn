// Phần bộ máy cờ tướng cho trang phân tích ván (src/analysis/AnalysisPage.tsx): đi lại biên bản, chấm từng nước,
// đo vật chất thắng/mất và thói quen khai cuộc. Cùng dạng với src/analysis/chessReview.ts.
import { HORSE, Position, ROOK, START_FEN } from './board';
import { evalText, redWin, reviewMove } from './coach';
import { analyzeMove, materialSwing, piece } from './explain';
import { isBookMove, openingNameAt } from './book';
import { computeInsight, tacticOf } from '../../analysis/insight';
import type { Habit, ReplayedGame, Review, ReviewEngine } from '../../analysis/types';
import type { Side } from '../../online/protocol';

const XQ = '/co-tuong';
const lesson = (id: string, label: string) => ({ href: `${XQ}/hoc/${id}`, label });

/** Số Xe, Mã, Pháo còn trên bàn (12 lúc bắt đầu) */
const countPieces = (fen: string) => (fen.split(' ')[0].match(/[rnhcRNHC]/g) ?? []).length;

const fullMove = (ply: number) => Math.floor(ply / 2) + 1;

/** Thói quen khai cuộc: Xe, Mã chưa xuất sau 10 nước */
function xqHabits(fens: string[], _ucis: string[], reviews: Review[]): Habit[] {
  const out: Habit[] = [];
  for (const side of [0, 1] as Side[]) {
    const name = side === 0 ? 'Đỏ' : 'Đen';
    const myPlies: number[] = [];
    for (let i = 0; i < reviews.length; i++) if (reviews[i]?.color === side) myPlies.push(i);
    const after10 = myPlies[9];
    if (after10 === undefined || myPlies.length < 14 || countPieces(fens[after10 + 1]) <= 6) continue;
    const pos = new Position(fens[after10 + 1]);
    const rank = side === 0 ? '0' : '9';
    const at = (sq: string, type: number) => {
      const p = pos.pieceAt(sq);
      return !!p && (p & 7) === type && ((p >> 3) & 1) === side;
    };
    const rooks = ['a', 'i'].filter((f) => at(f + rank, ROOK)).map((f) => f + rank);
    const horses = ['b', 'h'].filter((f) => at(f + rank, HORSE)).map((f) => f + rank);
    if (rooks.length + horses.length < 2) continue;
    const idle = [...rooks.map(() => 'Xe'), ...horses.map(() => 'Mã')];
    out.push({
      side,
      id: 'develop',
      icon: '🐢',
      title: rooks.length === 2 ? 'Hai Xe chưa xuất trận' : 'Ra quân chậm',
      text: `Sau 10 nước (nước ${fullMove(after10)}), ${name} vẫn để ${idle.join(', ')} ở vị trí ban đầu. Xe là quân mạnh nhất; Xe chưa xuất thì thế trận thiếu sức tấn công lẫn phòng thủ.`,
      tip: 'Kinh nghiệm cổ: "ba bước chưa động Xe là kỳ thủ dở". Lên Mã, xuất Xe ra lộ thông sớm, tránh đi một quân nhiều lần ở khai cuộc.',
      plies: [after10],
      links: [lesson('xq-cl-xe', 'Xe – quân mạnh nhất'), lesson('xq-cl-nguyen-tac-khai-cuoc', 'Nguyên tắc khai cuộc')],
      weight: rooks.length === 2 ? 7 : 5,
    });
  }
  return out;
}

export const XQ_REVIEW: ReviewEngine = {
  variant: 'xiangqi',
  startFen: START_FEN,
  sideNames: ['Đỏ', 'Đen'],
  replay(tokens, startFen = START_FEN): ReplayedGame {
    let pos: Position;
    try {
      pos = new Position(startFen);
    } catch {
      return { fens: [START_FEN], sans: [], ucis: [], error: { index: 0, token: 'FEN' } };
    }
    const res: ReplayedGame = { fens: [pos.fen()], sans: [], ucis: [] };
    for (let i = 0; i < tokens.length; i++) {
      const m = pos.sanToMove(tokens[i]);
      if (!m) return { ...res, error: { index: i, token: tokens[i] } };
      res.sans.push(pos.moveToSan(m));
      res.ucis.push(pos.moveToUci(m));
      pos.make(m);
      res.fens.push(pos.fen());
    }
    return res;
  },
  terminal(fen) {
    const pos = new Position(fen);
    if (pos.hasLegalMove()) return null;
    // cờ tướng: hết nước đi là thua, dù bị chiếu (chiếu bí) hay không (khốn bí)
    return { result: pos.side === 0 ? '0-1' : '1-0', reason: pos.inCheck() ? 'checkmate' : 'stalemate' };
  },
  firstWin: (a) => redWin(a),
  evalText: (a) => evalText(a.lines[0], a.fen.split(' ')[1] !== 'b'),
  review(fens, ucis, i, before, after, opening) {
    const pb = new Position(fens[i]);
    return reviewMove({ posBefore: pb, uci: ucis[i], ply: i, before, after, isBook: isBookMove(pb, ucis[i]), openingName: opening, prevUci: ucis[i - 1] }) as unknown as Review;
  },
  insight(fens, ucis, i, review, before, after) {
    return computeInsight(new Position(fens[i]), ucis[i], review, before, after, materialSwing, (pos, uci) => {
      const m = pos.moveFromUci(uci);
      return m ? tacticOf(analyzeMove(pos, m)) : null;
    });
  },
  isBook: (fen, uci) => isBookMove(new Position(fen), uci),
  openingAt: (fen) => openingNameAt(new Position(fen)),
  pieceCount: countPieces,
  phaseLimits: { middle: 10, end: 4 },
  habits: xqHabits,
  links: {
    safety: lesson('xq-nm-muoi-loi-khuyen', 'Mười lời khuyên cho ván cờ'),
    trade: lesson('xq-nm-gia-tri-quan', 'Giá trị quân và đổi quân'),
    tactics: lesson('xq-ct-bat-doi', 'Bắt đôi'),
    puzzles: { href: `${XQ}/co-the`, label: 'Luyện cờ thế' },
    mates: lesson('xq-nm-sat-cuc-co-ban', 'Những thế sát cục đầu tiên'),
    threats: lesson('xq-cl-phong-thu', 'Phòng thủ cung Tướng'),
    opening: lesson('xq-cl-nguyen-tac-khai-cuoc', 'Nguyên tắc khai cuộc'),
    plan: lesson('xq-cl-lap-ke-hoach', 'Lập kế hoạch trung cuộc'),
    convert: lesson('xq-tc-chuyen-hoa', 'Chuyển hóa ưu thế'),
    endgame: lesson('xq-tc-nguyen-tac', 'Nguyên tắc tàn cuộc'),
  },
  pieceName: piece,
};
