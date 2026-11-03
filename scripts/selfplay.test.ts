// Đấu thử giữa các cấp độ máy để kiểm tra sức mạnh tăng dần. Chạy: npx vitest run scripts/selfplay.test.ts
import { it } from 'vitest';
import { Position } from '../src/engine/board';
import { Searcher } from '../src/engine/search';
import { BOTS, chooseBotMove, BotProfile } from '../src/engine/bots';

function play(a: BotProfile, b: BotProfile, timeScale: number) {
  const pos = new Position();
  const sa = new Searcher(),
    sb = new Searcher();
  const scaled = (p: BotProfile) => ({ ...p, search: { ...p.search, timeMs: Math.round(p.search.timeMs * timeScale) } });
  const A = scaled(a),
    B = scaled(b);
  for (let i = 0; i < 300; i++) {
    const st = pos.status();
    if (st.over) {
      if (process.env.VERBOSE) console.log(st.reason, st.result, 'plies', i, 'white=L' + a.level, 'black=L' + b.level, 'stalemated side', pos.side ? 'black' : 'white', pos.fen());
      return st.result!;
    }
    const white = pos.side === 0;
    const c = chooseBotMove(white ? sa : sb, pos, white ? A : B);
    pos.make(c.move);
  }
  if (process.env.VERBOSE) console.log('300 plies, material', pos.fen());
  return '1/2-1/2';
}

it('levels', () => {
  const pairs: [number, number][] = (process.env.PAIRS ?? '2-1,3-2,4-3,5-4,6-5').split(',').map((p) => p.split('-').map(Number) as [number, number]);
  for (const [hi, lo] of pairs) {
    let score = 0;
    const games = Number(process.env.GAMES ?? 4);
    for (let g = 0; g < games; g++) {
      const hiWhite = g % 2 === 0;
      const r = hiWhite ? play(BOTS[hi - 1], BOTS[lo - 1], 0.25) : play(BOTS[lo - 1], BOTS[hi - 1], 0.25);
      if (r === '1/2-1/2') score += 0.5;
      else if ((r === '1-0') === hiWhite) score += 1;
    }
    console.log(`Cấp ${hi} vs cấp ${lo}: ${score}/${games}`);
  }
}, 3_000_000);
