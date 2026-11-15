// Biên bản ván đấu (src/analysis/sheet.ts): xuất PGN từ phòng chơi và đọc lại – kể cả PGN của các trang/phần mềm khác.
import { describe, expect, it } from 'vitest';
import { formatClk, formatSheet, isSheetError, parseClk, parseSheet, sheetFileName, type ParsedSheet } from '../src/analysis/sheet';
import { CHESS_REVIEW } from '../src/analysis/chessReview';
import { XQ_REVIEW } from '../src/xiangqi/engine/gameReview';

const DATE = new Date(2026, 10, 15, 20, 30);

function ok(text: string): ParsedSheet {
  const p = parseSheet(text);
  if (isSheetError(p)) throw new Error('không đọc được: ' + p.error);
  return p;
}

describe('đồng hồ trong biên bản', () => {
  it('định dạng và đọc lại [%clk]', () => {
    expect(formatClk(299_400)).toBe('0:04:59');
    expect(formatClk(3_725_000)).toBe('1:02:05');
    expect(parseClk('0:04:59')).toBe(299_000);
    expect(parseClk('0:00:07.3')).toBe(7_300);
    expect(parseClk('abc')).toBeNull();
  });
});

describe('biên bản cờ vua', () => {
  const ucis = ['e2e4', 'e7e5', 'g1f3', 'b8c6', 'f1c4', 'g8f6', 'f3g5', 'd7d5'];
  const line = CHESS_REVIEW.replay(ucis);

  it('xuất PGN chuẩn có đồng hồ, đọc lại được đúng từng nước', () => {
    const pgn = formatSheet({
      variant: 'chess',
      players: ['An "Mã Nhanh"', 'Bình'],
      result: '0-1',
      reason: 'resign',
      reasonText: 'Trắng xin thua',
      time: { initial: 300_000, increment: 3_000 },
      date: DATE,
      site: 'https://example.test/#/phong/ABCDEF',
      round: 2,
      ucis,
      sans: line.sans,
      clockLog: [300_000, 300_000, 297_000, 290_500, 280_000, 285_000, 270_000, 281_000],
      opening: 'Phòng thủ hai Mã',
    });
    expect(pgn).toContain('[White "An \\"Mã Nhanh\\""]');
    expect(pgn).toContain('[Date "2026.11.15"]');
    expect(pgn).toContain('[TimeControl "300+3"]');
    expect(pgn).toContain('[EndReason "resign"]');
    expect(pgn).toContain('1. e4 {[%clk 0:05:00]} 1... e5 {[%clk 0:05:00]}');
    expect(pgn.trim().endsWith('0-1')).toBe(true);

    const p = ok(pgn);
    expect(p.variant).toBe('chess');
    expect(p.players).toEqual(['An "Mã Nhanh"', 'Bình']);
    expect(p.result).toBe('0-1');
    expect(p.reason).toBe('resign');
    expect(p.time).toEqual({ initial: 300_000, increment: 3_000 });
    expect(p.clocks).toEqual([300_000, 300_000, 297_000, 290_000, 280_000, 285_000, 270_000, 281_000]);
    expect(CHESS_REVIEW.replay(p.tokens).ucis).toEqual(ucis);
  });

  it('không có đồng hồ: không ghi [%clk], ván chưa xong ghi *', () => {
    const pgn = formatSheet({ variant: 'chess', players: ['A', 'B'], result: null, reason: null, time: null, date: DATE, ucis, sans: line.sans });
    expect(pgn).not.toContain('%clk');
    expect(pgn).toContain('[TimeControl "-"]');
    expect(pgn).toContain('1. e4 e5 2. Nf3 Nc6');
    expect(ok(pgn).result).toBe('*');
  });

  it('đọc PGN của lichess/chess.com: lời bình, biến phụ lồng nhau, $n, !?, nhiều ván trong một tệp', () => {
    const text = `[Event "Rated Blitz game"]
[Site "https://lichess.org/abc"]
[White "alice"]
[Black "bob"]
[Result "1-0"]
[TimeControl "180+2"]
[Termination "Time forfeit"]

1. e4 { [%eval 0.2] [%clk 0:03:00] } 1... c5 $2 { [%clk 0:02:58] } 2. Nf3!? (2. c3 d5 (2... Nf6 3. e5) 3. exd5) 2... d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 1-0

[Event "Ván thứ hai"]
1. d4 d5 *`;
    const p = ok(text);
    expect(p.tokens).toEqual(['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'a6']);
    expect(p.clocks.slice(0, 3)).toEqual([180_000, 178_000, null]);
    expect(p.reason).toBe('timeout');
    expect(p.result).toBe('1-0');
    expect(CHESS_REVIEW.replay(p.tokens).error).toBeUndefined();
  });

  it('chấp nhận chuỗi nước trần, số thứ tự dính liền và thế cờ bắt đầu từ FEN', () => {
    const p = ok('1.e4 e5 2.Nf3 Nc6 3.Bb5');
    expect(p.tokens).toEqual(['e4', 'e5', 'Nf3', 'Nc6', 'Bb5']);
    const fen = '4k3/8/8/8/8/8/4P3/4K3 w - - 0 1';
    const q = ok(`[SetUp "1"]\n[FEN "${fen}"]\n\n1. e4 Kd7 *`);
    expect(q.startFen).toBe(fen);
    expect(CHESS_REVIEW.replay(q.tokens, q.startFen).ucis).toEqual(['e2e4', 'e8d7']);
  });

  it('báo nước không hợp lệ đầu tiên', () => {
    const r = CHESS_REVIEW.replay(['e4', 'e5', 'Ke3']);
    expect(r.error).toEqual({ index: 2, token: 'Ke3' });
    expect(r.ucis).toEqual(['e2e4', 'e7e5']);
  });

  it('báo lỗi khi rỗng, không có nước đi, hoặc là biến thể cờ khác', () => {
    expect(parseSheet('   ')).toEqual({ error: 'empty' });
    expect(parseSheet('[Event "x"]\n\n*')).toEqual({ error: 'no-moves' });
    expect(parseSheet('[Variant "Crazyhouse"]\n\n1. e4 e5')).toEqual({ error: 'variant', detail: 'Crazyhouse' });
  });

  it('tên tệp không dấu', () => {
    expect(sheetFileName('chess', ['Nguyễn Văn Đức', 'Bình'], DATE)).toBe('ky-dao_co-vua_nguyen-van-duc-vs-binh_2026-11-15.pgn');
  });
});

describe('biên bản cờ tướng', () => {
  const ucis = ['h2e2', 'h9g7', 'h0g2', 'i9h9', 'i0h0', 'b9c7'];
  const line = XQ_REVIEW.replay(ucis);

  it('xuất theo quy ước xqbase (ICCS) kèm ký hiệu Việt Nam, đọc lại đúng', () => {
    expect(line.error).toBeUndefined();
    const pgn = formatSheet({ variant: 'xiangqi', players: ['Đức', 'Lan'], result: '1-0', reason: 'checkmate', time: null, date: DATE, ucis, sans: line.sans });
    expect(pgn).toContain('[Red "Đức"]');
    expect(pgn).toContain('[Game "Chinese Chess"]');
    expect(pgn).toContain('[Format "ICCS"]');
    expect(pgn).toContain('1. H2-E2 {P2-5} 1... H9-G7 {M8.7}');
    const p = ok(pgn);
    expect(p.variant).toBe('xiangqi');
    expect(p.players).toEqual(['Đức', 'Lan']);
    expect(XQ_REVIEW.replay(p.tokens).ucis).toEqual(ucis);
  });

  it('nhận ra cờ tướng từ ký hiệu Việt Nam hoặc chữ Hán khi biên bản không ghi môn cờ', () => {
    const vn = ok('1. P2-5 M8.7 2. M2.3 X9-8');
    expect(vn.variant).toBe('xiangqi');
    expect(XQ_REVIEW.replay(vn.tokens).ucis).toEqual(['h2e2', 'h9g7', 'h0g2', 'i9h9']);
    const cn = ok('1. 炮二平五 马8进7 2. 马二进三');
    expect(cn.variant).toBe('xiangqi');
    expect(XQ_REVIEW.replay(cn.tokens).error).toBeUndefined();
  });
});
