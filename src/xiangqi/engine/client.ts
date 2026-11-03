// Phía giao diện: gửi yêu cầu tới Web Worker của bộ máy cờ tướng và nhận kết quả dưới dạng Promise.
import EngineWorker from './worker?worker';
import type { AnalysisResult, BotMoveResult, WorkerRequest, WorkerResponse } from '../../engine/protocol';

type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never;
type Req = DistributiveOmit<WorkerRequest, 'id'>;

interface Job {
  req: Req;
  channel?: string;
  resolve: (v: any) => void;
  reject: (e: Error) => void;
}

class EngineHandle {
  private worker: Worker | null = null;
  private nextId = 1;
  private queue: Job[] = [];
  private running: { id: number; job: Job } | null = null;

  private ensure(): Worker {
    if (!this.worker) {
      this.worker = new EngineWorker();
      this.worker.onmessage = (e: MessageEvent<WorkerResponse>) => this.onMessage(e.data);
    }
    return this.worker;
  }

  private onMessage(res: WorkerResponse) {
    const run = this.running;
    if (!run || run.id !== res.id) return;
    this.running = null;
    if (res.ok) run.job.resolve(res.result);
    else run.job.reject(new Error(res.error));
    this.pump();
  }

  private pump() {
    if (this.running || !this.queue.length) return;
    const job = this.queue.shift()!;
    const id = this.nextId++;
    this.running = { id, job };
    this.ensure().postMessage({ ...job.req, id });
  }

  /** Gửi yêu cầu. Nếu có `channel`, yêu cầu cùng kênh đang chờ sẽ bị thay thế (trả về null). */
  request<T>(req: Req, channel?: string, priority = false): Promise<T | null> {
    return new Promise((resolve, reject) => {
      if (channel) {
        this.queue = this.queue.filter((q) => {
          if (q.channel === channel) {
            q.resolve(null);
            return false;
          }
          return true;
        });
      }
      const job = { req, channel, resolve, reject };
      if (priority) this.queue.unshift(job);
      else this.queue.push(job);
      this.pump();
    });
  }

  cancelAll() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
    this.running?.job.resolve(null);
    this.running = null;
    for (const q of this.queue) q.resolve(null);
    this.queue = [];
  }
}

const botEngine = new EngineHandle();
const analysisEngine = new EngineHandle();

export function requestBotMove(fen: string, moves: string[], level: number) {
  return botEngine.request<BotMoveResult>({ type: 'bot', fen, moves, level }, 'bot');
}

export function cancelBot() {
  botEngine.cancelAll();
}

export interface AnalysisOptions {
  multiPV?: number;
  timeMs?: number;
  threat?: boolean;
  channel?: string;
  maxDepth?: number;
  searchMoves?: string[];
  priority?: boolean;
}

export function requestAnalysis(fen: string, moves: string[], opts: AnalysisOptions = {}) {
  return analysisEngine
    .request<AnalysisResult>(
      {
        type: 'analyze',
        fen,
        moves,
        multiPV: opts.multiPV ?? 3,
        timeMs: opts.timeMs ?? 900,
        threat: opts.threat ?? false,
        maxDepth: opts.maxDepth,
        searchMoves: opts.searchMoves,
      },
      opts.channel ?? 'analysis',
      opts.priority ?? false,
    )
    .catch(() => null);
}

export function cancelAnalysis() {
  analysisEngine.cancelAll();
}
