// Phần bộ máy cờ vua cho trang phân tích ván: đi lại biên bản, chấm từng nước, đo vật chất thắng/mất, thói quen khai cuộc.
import { BISHOP, KNIGHT, Position, QUEEN, START_FEN } from '../engine/board';
import { evalText, MoveReview, reviewMove, whiteWin } from '../engine/coach';
import { analyzeMove, materialSwing, piece, type MoveFacts } from '../engine/explain';
import { isBookMove, openingNameAt } from '../engine/book';
import type { Habit, ReplayedGame, Review, ReviewEngine } from './types';
import { computeInsight, tacticOf } from './insight';
import type { Side } from '../online/protocol';

const lesson = (id: string, label: string) => ({ href: `/hoc/${id}`, label });

function countPieces(fen: string): number {
  return (fen.split(' ')[0].match(/[nbrqNBRQ]/g) ?? []).length;
}

const fullMove = (ply: number) => Math.floor(ply / 2) + 1;

/** Ô của Vua bên `side` theo FEN, vd "e1" */
function findKing(fen: string, side: Side): string | null {
  const rows = fen.split(' ')[0].split('/');
  const k = side === 0 ? 'K' : 'k';
  for (let r = 0; r < 8; r++) {
    let f = 0;
    for (const ch of rows[r]) {
      if (/\d/.test(ch)) f += Number(ch);
      else {
        if (ch === k) return 'abcdefgh'[f] + String(8 - r);
        f++;
      }
    }
  }
  return null;
}

/** Thói quen khai cuộc: nhập thành muộn, đi Hậu quá nhiều, phát triển quân chậm */
function chessHabits(fens: string[], _ucis: string[], reviews: Review[]): Habit[] {
  const out: Habit[] = [];
  const facts = (i: number) => reviews[i]?.facts as unknown as MoveFacts | undefined;
  for (const side of [0, 1] as Side[]) {
    const name = side === 0 ? 'Trắng' : 'Đen';
    const myPlies: number[] = [];
    for (let i = 0; i < reviews.length; i++) if (reviews[i]?.color === side) myPlies.push(i);

    // 1. Vua không nhập thành dù ván cờ còn Hậu
    const castled = myPlies.find((i) => facts(i)?.castle);
    const kingWalk = myPlies.find((i) => facts(i)?.type === 6 && !facts(i)?.castle);
    const check12 = myPlies[11];
    if (castled === undefined && check12 !== undefined && myPlies.length >= 15) {
      const fen = fens[check12 + 1];
      const board = fen.split(' ')[0];
      const queensOn = board.includes('Q') && board.includes('q');
      // Vua tự đi bộ sang cánh (vd Kf1-g1) cũng coi như đã an toàn
      const kingSq = findKing(fen, side);
      if (queensOn && kingSq && 'def'.includes(kingSq[0])) {
        out.push({
          side,
          id: 'castle',
          icon: '🏰',
          title: 'Vua chưa được đưa vào nơi an toàn',
          text: `Đến nước ${fullMove(check12)} ${name} vẫn chưa nhập thành trong khi Hậu hai bên còn trên bàn. Vua ở trung tâm dễ trở thành mục tiêu khi cột e, d mở ra.`,
          tip: 'Đặt mục tiêu nhập thành trong khoảng 10 nước đầu: ra Mã, Tượng phía cánh Vua trước rồi nhập thành.',
          plies: [kingWalk ?? check12],
          links: [lesson('cl-an-toan-vua', 'An toàn Vua'), lesson('nm-nguyen-tac-khai-cuoc', 'Nguyên tắc khai cuộc')],
          weight: 7,
        });
      }
    }

    // 2. Đi Hậu quá nhiều ở khai cuộc
    const early = myPlies.slice(0, 10).filter((i) => facts(i)?.type === QUEEN);
    if (early.length >= 3) {
      out.push({
        side,
        id: 'queen',
        icon: '♛',
        title: 'Đưa Hậu ra quá sớm',
        text: `${name} đi Hậu ${early.length} lần trong 10 nước đầu. Hậu ra sớm dễ bị quân nhẹ của đối thủ đuổi đánh, đối thủ vừa phát triển quân vừa được thêm nước.`,
        tip: 'Ở khai cuộc hãy phát triển Mã, Tượng trước; Hậu là quân giá trị nhất nên vào trận sau cùng.',
        plies: early,
        links: [lesson('nm-nguyen-tac-khai-cuoc', 'Nguyên tắc khai cuộc')],
        weight: 5,
      });
    }

    // 3. Phát triển quân chậm: sau 10 nước vẫn còn ≥ 2 quân nhẹ ở chỗ cũ
    const after10 = myPlies[9];
    if (after10 !== undefined && countPieces(fens[after10 + 1]) > 8) {
      const pos = new Position(fens[after10 + 1]);
      const home = side === 0 ? ['b1', 'g1', 'c1', 'f1'] : ['b8', 'g8', 'c8', 'f8'];
      const want = [KNIGHT, KNIGHT, BISHOP, BISHOP];
      const idle = home.filter((sq, k) => {
        const p = pos.pieceAt(sq);
        return p && (p & 7) === want[k] && ((p >> 3) & 1) === side;
      });
      if (idle.length >= 2) {
        out.push({
          side,
          id: 'develop',
          icon: '🐢',
          title: 'Phát triển quân chậm',
          text: `Sau 10 nước, ${name} vẫn để ${idle.length} quân nhẹ ở vị trí xuất phát (${idle.join(', ')}). Quân không ra trận thì không thể tham gia tấn công hay phòng thủ.`,
          tip: 'Mỗi nước ở khai cuộc nên đưa thêm một quân vào cuộc; tránh đi một quân hai lần khi chưa cần.',
          plies: [after10],
          links: [lesson('nm-nguyen-tac-khai-cuoc', 'Nguyên tắc khai cuộc')],
          weight: 5,
        });
      }
    }
  }
  return out;
}

export const CHESS_REVIEW: ReviewEngine = {
  variant: 'chess',
  startFen: START_FEN,
  sideNames: ['Trắng', 'Đen'],
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
    if (pos.inCheck()) return { result: pos.side === 0 ? '0-1' : '1-0', reason: 'checkmate' };
    return { result: '1/2-1/2', reason: 'stalemate' };
  },
  firstWin: (a) => whiteWin(a),
  evalText: (a) => evalText(a.lines[0], a.fen.split(' ')[1] === 'w'),
  review(fens, ucis, i, before, after, opening) {
    const pb = new Position(fens[i]);
    return reviewMove({ posBefore: pb, uci: ucis[i], ply: i, before, after, isBook: isBookMove(pb, ucis[i]), openingName: opening, prevUci: ucis[i - 1] }) as MoveReview as Review;
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
  phaseLimits: { middle: 10, end: 6 },
  habits: chessHabits,
  links: {
    safety: lesson('nm-tu-duy-kien-tuong', 'Quy trình cho mỗi nước đi'),
    trade: lesson('nm-gia-tri-quan-co', 'Giá trị quân và trao đổi'),
    tactics: lesson('ct-chia-doi', 'Chĩa đôi'),
    puzzles: { href: '/co-the', label: 'Luyện cờ thế' },
    mates: lesson('ct-mau-chieu-het', 'Các mẫu chiếu hết'),
    threats: lesson('cl-phong-ngua', 'Phòng ngừa: đối thủ muốn gì?'),
    opening: lesson('nm-nguyen-tac-khai-cuoc', 'Nguyên tắc khai cuộc'),
    plan: lesson('cl-danh-gia-the-co', 'Đánh giá thế cờ, lập kế hoạch'),
    convert: lesson('cl-doi-quan', 'Đổi quân, chuyển hóa ưu thế'),
    endgame: lesson('tc-nguyen-tac-tan-cuoc', 'Nguyên tắc tàn cuộc'),
  },
  pieceName: piece,
};
