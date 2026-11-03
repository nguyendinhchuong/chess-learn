import { describe, it, expect, beforeAll } from 'vitest';
import { Position, START_FEN } from '../src/engine/board';
import { MATE, mateIn } from '../src/engine/search';
import { StockfishEngine, parseInfo, toAnalysisLines, type AnalyzeRequest } from '../src/engine/stockfish';
import { installNodeWorker } from './node-stockfish';

const req = (fen: string, moves: string[] = [], opts: Partial<AnalyzeRequest> = {}): AnalyzeRequest => ({
  type: 'analyze',
  fen,
  moves,
  multiPV: 3,
  timeMs: 500,
  ...opts,
});

describe('UCI parsing', () => {
  it('reads centipawn lines', () => {
    const i = parseInfo('info depth 18 seldepth 33 multipv 2 score cp -121 nodes 572383 nps 970140 hashfull 260 time 590 pv h5h4 g7g5');
    expect(i).toEqual({ depth: 18, multipv: 2, score: -121, nodes: 572383, timeMs: 590, pv: ['h5h4', 'g7g5'] });
  });

  it('maps mate scores onto the internal scale', () => {
    expect(mateIn(parseInfo('info depth 5 multipv 1 score mate 1 nodes 1 time 1 pv h5f7')!.score)).toBe(1);
    expect(mateIn(parseInfo('info depth 5 multipv 1 score mate 3 nodes 1 time 1 pv a1a2')!.score)).toBe(3);
    expect(mateIn(parseInfo('info depth 5 multipv 1 score mate -2 nodes 1 time 1 pv a1a2')!.score)).toBe(-2);
    expect(parseInfo('info depth 5 multipv 1 score mate 1 nodes 1 time 1 pv h5f7')!.score).toBe(MATE - 1);
  });

  it('ignores bounds, strings, currmove and pv-less lines', () => {
    expect(parseInfo('info depth 20 multipv 1 score cp 30 lowerbound nodes 1 time 1 pv e2e4')).toBeNull();
    expect(parseInfo('info string NNUE evaluation using nn-xyz.nnue')).toBeNull();
    expect(parseInfo('info depth 20 currmove e2e4 currmovenumber 1')).toBeNull();
    expect(parseInfo('info depth 0 score mate 0')).toBeNull();
    expect(parseInfo('bestmove e2e4')).toBeNull();
  });

  it('builds SAN lines in multipv order and stops at an illegal PV move', () => {
    const pos = new Position();
    const infos = new Map([
      [2, parseInfo('info depth 9 multipv 2 score cp 20 nodes 1 time 1 pv d2d4 d7d5')!],
      [1, parseInfo('info depth 10 multipv 1 score cp 30 nodes 1 time 1 pv e2e4 e7e5 e1e3')!],
    ]);
    const lines = toAnalysisLines(pos, infos);
    expect(lines.map((l) => l.san)).toEqual(['e4', 'd4']);
    expect(lines[0].pvSan).toEqual(['e4', 'e5']);
    expect(pos.fen()).toBe(START_FEN);
  });

  it('reports scoreWhite from White’s point of view', () => {
    const pos = new Position('rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1');
    const [l] = toAnalysisLines(pos, new Map([[1, parseInfo('info depth 10 multipv 1 score cp 40 nodes 1 time 1 pv c7c5')!]]));
    expect(l.score).toBe(40);
    expect(l.scoreWhite).toBe(-40);
  });
});

describe('Stockfish engine (real WebAssembly build)', () => {
  let sf: StockfishEngine;
  beforeAll(() => {
    installNodeWorker();
    sf = new StockfishEngine();
  });

  it('finds the mate in one with three ranked lines', async () => {
    const r = (await sf.request(req('r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4')))!;
    expect(r.lines).toHaveLength(3);
    expect(r.lines[0].san).toBe('Qxf7#');
    expect(r.lines[0].mate).toBe(1);
    expect(r.depth).toBeGreaterThan(8);
  });

  it('sees being mated as a negative mate score', async () => {
    const r = (await sf.request(req('k7/8/1K6/8/8/8/8/7R b - - 0 1')))!;
    expect(r.lines).toHaveLength(1);
    expect(r.lines[0].san).toBe('Kb8');
    expect(r.lines[0].mate).toBe(-1);
    expect(r.lines[0].scoreWhite).toBeGreaterThan(0);
  });

  it('applies the move list and detects the opponent’s threat', async () => {
    const r = (await sf.request(req(START_FEN, ['e2e4', 'e7e5', 'd1h5', 'b8c6', 'f1c4'], { timeMs: 800, threat: true })))!;
    expect(r.fen).toBe('r1bqkbnr/pppp1ppp/2n5/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 3 3');
    expect(r.threat?.san).toBe('Qxf7#');
    expect(r.threat?.mate).toBe(1);
    expect(['Qe7', 'g6', 'Qf6']).toContain(r.lines[0].san);
  });

  it('returns no lines for a finished game', async () => {
    const r = (await sf.request(req(START_FEN, ['f2f3', 'e7e5', 'g2g4', 'd8h4'])))!;
    expect(r.lines).toEqual([]);
  });

  it('solves a Win At Chess tactic within the hint budget', async () => {
    // WAC.003 trong bộ thế cờ chiến thuật "Win At Chess"
    const r = (await sf.request(req('5rk1/1ppb3p/p1pb4/6q1/3P1p1r/2P1R2P/PP1BQ1P1/5RKN w - - 0 1', [], { timeMs: 1000 })))!;
    expect(r.lines[0].san).toBe('Rg3');
  });

  it('replaces a queued request on the same channel and cancels on demand', async () => {
    const first = sf.request(req(START_FEN, [], { timeMs: 400 }), 'a');
    const stale = sf.request(req(START_FEN, ['e2e4'], { timeMs: 400 }), 'b');
    const fresh = sf.request(req(START_FEN, ['d2d4'], { timeMs: 400 }), 'b');
    expect(await stale).toBeNull();
    expect((await first)?.lines.length).toBe(3);
    expect((await fresh)?.fen).toContain('3P4');

    const t0 = Date.now();
    const long = sf.request(req(START_FEN, [], { timeMs: 10_000 }));
    setTimeout(() => sf.cancelAll(), 300);
    expect(await long).toBeNull();
    const after = await sf.request(req(START_FEN, ['g1f3'], { timeMs: 300 }));
    expect(after?.lines.length).toBe(3);
    expect(Date.now() - t0).toBeLessThan(3000);
  });

  it('rejects requests when the engine cannot start, so the client can fall back', async () => {
    installNodeWorker('/nonexistent/stockfish.js');
    const broken = new StockfishEngine();
    await expect(broken.request(req(START_FEN))).rejects.toThrow();
    expect(broken.usable).toBe(false);
    installNodeWorker();
  });
});
