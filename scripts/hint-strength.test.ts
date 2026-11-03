// Đo sức mạnh của gợi ý (nước tốt nhất trong phân tích) với đúng ngân sách thời gian của trang Luyện tập.
//
// Bộ thế cờ EPD (bm/am), ví dụ Win At Chess hoặc ECM:
//   EPD=wacnew.epd ENGINE=sf npx vitest run scripts/hint-strength.test.ts --dir scripts
// Đấu với Stockfish giới hạn Elo (UCI_Elo, thang CCRL):
//   MATCH=2500 GAMES=10 [START=0] ENGINE=sf npx vitest run scripts/hint-strength.test.ts --dir scripts
// ENGINE=js đo bộ máy JavaScript cũ; HINT_MS là thời gian phân tích cho mỗi nước (mặc định 1500 như trang Luyện tập).
import { it } from 'vitest';
import { readFileSync } from 'node:fs';
import { Position, START_FEN } from '../src/engine/board';
import { Searcher } from '../src/engine/search';
import { analyze } from '../src/engine/analyze';
import { StockfishEngine } from '../src/engine/stockfish';
import type { AnalysisResult } from '../src/engine/protocol';
import { installNodeWorker, UciProcess } from '../tests/node-stockfish';

const ENGINE = process.env.ENGINE ?? 'sf';
const HINT_MS = Number(process.env.HINT_MS ?? 1500);

installNodeWorker();
const sf = new StockfishEngine();
const searcher = new Searcher();

async function hint(fen: string, moves: string[], threat: boolean): Promise<AnalysisResult> {
  const req = { fen, moves, multiPV: 3, timeMs: HINT_MS, threat };
  if (ENGINE === 'js') return analyze(searcher, req);
  return (await sf.request({ type: 'analyze', ...req }))!;
}

const bare = (san: string) => san.replace(/[+#!?]/g, '');

it('test suite', async () => {
  if (!process.env.EPD) return;
  for (const file of process.env.EPD.split(',')) {
    const rows = readFileSync(file, 'utf8').split('\n').filter((l) => l.trim());
    let solved = 0;
    const failed: string[] = [];
    for (const row of rows) {
      const fen = row.split(' ').slice(0, 4).join(' ') + ' 0 1';
      const id = /id "([^"]+)"/.exec(row)?.[1] ?? fen;
      const bm = /\bbm ([^;]+);/.exec(row)?.[1].split(' ').map(bare);
      const am = /\bam ([^;]+);/.exec(row)?.[1].split(' ').map(bare);
      const r = await hint(fen, [], true);
      const san = bare(r.lines[0]?.san ?? '');
      const ok = bm ? bm.includes(san) : am ? !am.includes(san) : false;
      if (ok) solved++;
      else failed.push(`${id}: ${san} (đáp án ${bm?.join('/') ?? 'không phải ' + am?.join('/')})`);
    }
    console.log(`[${ENGINE}, ${HINT_MS}ms] ${file}: ${solved}/${rows.length} (${Math.round((solved / rows.length) * 100)}%)`);
    if (process.env.VERBOSE) console.log(failed.join('\n'));
  }
}, 24 * 3600_000);

// Một vài khai cuộc cân bằng để các ván không lặp lại
const OPENINGS = [
  ['e2e4', 'e7e5', 'g1f3', 'b8c6'],
  ['d2d4', 'd7d5', 'c2c4', 'e7e6'],
  ['e2e4', 'c7c5', 'g1f3', 'd7d6'],
  ['d2d4', 'g8f6', 'c2c4', 'g7g6'],
  ['e2e4', 'e7e6', 'd2d4', 'd7d5'],
  ['c2c4', 'e7e5', 'b1c3', 'g8f6'],
  ['e2e4', 'c7c6', 'd2d4', 'd7d5'],
  ['g1f3', 'd7d5', 'g2g3', 'g8f6'],
];

/** Một ván: gợi ý (luôn đi nước tốt nhất) đấu với Stockfish giới hạn Elo. Trả về điểm của bên gợi ý. */
async function playGame(opp: UciProcess, hintWhite: boolean, opening: string[]): Promise<number> {
  const pos = new Position();
  const moves = [...opening];
  for (const u of moves) pos.make(pos.moveFromUci(u));
  opp.send('ucinewgame');
  for (let ply = moves.length; ply < 300; ply++) {
    const st = pos.status();
    if (st.over) return st.result === '1/2-1/2' ? 0.5 : (st.result === '1-0') === hintWhite ? 1 : 0;
    const hintToMove = (pos.side === 0) === hintWhite;
    const uci = hintToMove ? (await hint(START_FEN, moves, true)).lines[0].uci : await opp.bestMove(START_FEN, moves, `go movetime ${HINT_MS}`);
    const m = pos.moveFromUci(uci);
    if (!m) throw new Error('Nước không hợp lệ: ' + uci);
    pos.make(m);
    moves.push(uci);
  }
  return 0.5;
}

it('match vs Elo-limited Stockfish', async () => {
  if (!process.env.MATCH) return;
  const elo = Number(process.env.MATCH);
  const games = Number(process.env.GAMES ?? 8);
  const first = Number(process.env.START ?? 0); // chia các ván cho nhiều tiến trình chạy song song
  const opp = await new UciProcess().init({ UCI_LimitStrength: 'true', UCI_Elo: elo });
  let score = 0;
  for (let g = first; g < first + games; g++) {
    const s = await playGame(opp, g % 2 === 0, OPENINGS[Math.floor(g / 2) % OPENINGS.length]);
    score += s;
    console.log(`ván ${g + 1}: gợi ý cầm ${g % 2 === 0 ? 'Trắng' : 'Đen'} – ${s}`);
  }
  opp.quit();
  const p = Math.min(Math.max(score / games, 0.01), 0.99);
  console.log(`[${ENGINE}, ${HINT_MS}ms] vs Stockfish UCI_Elo ${elo}: ${score}/${games} → hiệu số Elo ≈ ${Math.round(-400 * Math.log10(1 / p - 1))}`);
}, 24 * 3600_000);
