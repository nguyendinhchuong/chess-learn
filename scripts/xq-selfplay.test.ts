// Đấu thử giữa các cấp độ máy cờ tướng để kiểm tra sức mạnh tăng dần và các luật kết thúc ván.
// Chạy: npx vitest run scripts/xq-selfplay.test.ts --dir scripts   (PAIRS=4-2 GAMES=4 VERBOSE=1)
import { it } from 'vitest';
import { Position } from '../src/xiangqi/engine/board';
import { Searcher } from '../src/xiangqi/engine/search';
import { BOTS, chooseBotMove, BotProfile } from '../src/xiangqi/engine/bots';
import { pickBookMove } from '../src/xiangqi/engine/book';

function play(a: BotProfile, b: BotProfile, timeScale: number) {
  const pos = new Position();
  const sa = new Searcher(),
    sb = new Searcher();
  const scaled = (p: BotProfile) => ({ ...p, search: { ...p.search, timeMs: Math.round(p.search.timeMs * timeScale) } });
  const A = scaled(a),
    B = scaled(b);
  for (let i = 0; i < 400; i++) {
    const st = pos.status();
    if (st.over) {
      if (process.env.VERBOSE) console.log(st.reason, st.result, 'plies', i, 'red=L' + a.level, 'black=L' + b.level, pos.fen());
      return st.result!;
    }
    const red = pos.side === 0;
    const bot = red ? A : B;
    const book = bot.bookChance > 0 && Math.random() < bot.bookChance ? pickBookMove(pos) : null;
    const m = book ? pos.moveFromUci(book) : chooseBotMove(red ? sa : sb, pos, bot).move;
    pos.make(m);
  }
  if (process.env.VERBOSE) console.log('400 plies', pos.fen());
  return '1/2-1/2';
}

it('levels', () => {
  const pairs: [number, number][] = (process.env.PAIRS ?? '2-1,3-2,4-3,5-4').split(',').map((p) => p.split('-').map(Number) as [number, number]);
  for (const [hi, lo] of pairs) {
    let score = 0;
    const games = Number(process.env.GAMES ?? 4);
    for (let g = 0; g < games; g++) {
      const hiRed = g % 2 === 0;
      const r = hiRed ? play(BOTS[hi - 1], BOTS[lo - 1], 0.25) : play(BOTS[lo - 1], BOTS[hi - 1], 0.25);
      if (r === '1/2-1/2') score += 0.5;
      else if ((r === '1-0') === hiRed) score += 1;
    }
    console.log(`Cờ tướng – cấp ${hi} vs cấp ${lo}: ${score}/${games}`);
  }
}, 3_600_000);
