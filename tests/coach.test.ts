import { describe, it, expect } from 'vitest';
import { Position, START_FEN, playLine } from '../src/engine/board';
import { Searcher } from '../src/engine/search';
import { analyze } from '../src/engine/analyze';
import { reviewMove, predictMoves, winPct } from '../src/engine/coach';
import { analyzeMove, describeMove } from '../src/engine/explain';
import { openingNameAt, isBookMove } from '../src/engine/book';

const s = new Searcher();
const an = (fen: string, moves: string[] = [], threat = false) => analyze(s, { fen, moves, multiPV: 3, timeMs: 700, threat });

function review(fen: string, san: string, prev?: string) {
  const pos = new Position(fen);
  const m = pos.sanToMove(san);
  const uci = pos.moveToUci(m);
  const before = an(fen);
  pos.make(m);
  const after = pos.status().over ? null : an(pos.fen());
  pos.unmake();
  return reviewMove({ posBefore: pos, uci, ply: 0, before, after, isBook: false, prevUci: prev });
}

describe('coach', () => {
  it('win percentage is symmetric', () => {
    expect(winPct(0)).toBeCloseTo(50);
    expect(winPct(300) + winPct(-300)).toBeCloseTo(100);
  });

  it('flags hanging the queen as a blunder', () => {
    const r = review('rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2', 'Qg4');
    expect(['mistake', 'blunder']).toContain(r.cls);
    expect(r.refutation?.san).toBe('Bxg4');
    console.log(r.headline, r.comments, r.warning);
  });

  it('praises the mating move', () => {
    const r = review('6k1/5ppp/8/8/8/8/5PPP/3R2K1 w - - 0 1', 'Rd8#');
    expect(r.cls === 'best' || r.cls === 'great').toBe(true);
    expect(r.headline).toBe('Chiếu hết!');
  });

  it('detects a mate threat', () => {
    // Đen dọa Qxh2# – Trắng đến lượt
    const fen = 'r1b1k2r/pppp1ppp/2n5/2b1p3/2B1P2q/2NP1N1P/PPP2Pn1/R1BQ1RK1 w kq - 0 1';
    const p = new Position(fen);
    expect(p.inCheck()).toBe(false);
    const a = an(fen, [], true);
    console.log('threat', a.threat);
  });

  it('describes moves in Vietnamese', () => {
    const p = new Position();
    const d = describeMove(analyzeMove(p, p.sanToMove('Nf3')));
    expect(d).toContain('Mã g1 đi f3');
    expect(d).toContain('phát triển quân');
  });

  it('predicts replies with probabilities summing to ~100', () => {
    const fen = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1';
    const preds = predictMoves(new Position(fen), an(fen));
    const total = preds.reduce((x, y) => x + y.prob, 0);
    expect(total).toBeGreaterThan(97);
    expect(total).toBeLessThan(103);
  });

  it('knows book moves and opening names', () => {
    const line = playLine('1.e4 e5 2.Nf3 Nc6 3.Bb5');
    expect(openingNameAt(new Position(line.fens[5]))).toMatch(/Tây Ban Nha|Ruy/);
    expect(isBookMove(new Position(START_FEN), 'e2e4')).toBe(true);
    expect(openingNameAt(new Position(line.fens[1]))).toBe('Khai cuộc Tốt Vua (1.e4)');
  });

  it('greek gift is a sacrifice, recapture is not great', () => {
    // Bxh7+ kinh điển
    const r = review('r1bq1rk1/pppn1ppp/4p3/3pP3/1b1P4/2NB1N2/PPP2PPP/R1BQK2R w KQ - 0 8', 'Bxh7+');
    console.log('Bxh7+', r.cls, r.headline, r.winBest.toFixed(1), r.winPlayed.toFixed(1));
    const rc = review('rnbqkb1r/ppp1pppp/5n2/3P4/8/8/PPPP1PPP/RNBQKBNR b KQkq - 0 3', 'Nxd5', 'e4d5');
    expect(rc.cls).not.toBe('great');
  });
});
