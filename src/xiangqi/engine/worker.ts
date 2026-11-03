/// <reference lib="webworker" />
// Web Worker chạy bộ máy cờ tướng để giao diện không bị đứng khi máy suy nghĩ.
import { Searcher } from './search';
import { BOTS, chooseBotMove } from './bots';
import { analyze, rebuild } from './analyze';
import type { BotMoveResult, WorkerRequest, WorkerResponse } from '../../engine/protocol';

const searcher = new Searcher();

function botMove(req: Extract<WorkerRequest, { type: 'bot' }>): BotMoveResult {
  const pos = rebuild(req.fen, req.moves);
  const bot = BOTS.find((b) => b.level === req.level) ?? BOTS[0];
  const c = chooseBotMove(searcher, pos, bot);
  return { uci: pos.moveToUci(c.move), san: pos.moveToSan(c.move), score: c.score, depth: c.depth, random: c.random };
}

self.onmessage = (e: MessageEvent<WorkerRequest>) => {
  const req = e.data;
  let res: WorkerResponse;
  try {
    if (req.type === 'analyze') res = { id: req.id, ok: true, result: analyze(searcher, req) };
    else if (req.type === 'bot') res = { id: req.id, ok: true, result: botMove(req) };
    else {
      searcher.clearTT();
      res = { id: req.id, ok: true, result: null };
    }
  } catch (err) {
    res = { id: req.id, ok: false, error: String((err as Error)?.message ?? err) };
  }
  (self as unknown as Worker).postMessage(res);
};
