// Stockfish 18 bản "lite" (WebAssembly, một luồng – không cần cấu hình máy chủ đặc biệt) chạy trong Web Worker,
// giao tiếp bằng giao thức UCI. Đây là bộ máy phân tích cho gợi ý, chấm điểm nước đi, phân tích ván và cờ thế:
// mạnh hơn nhiều so với đại kiện tướng (độ sâu 18–20 mỗi giây trên máy tính thông thường).
// Tệp bộ máy nằm trong public/stockfish/ (GPLv3, xem Copying.txt). Nếu không tải được, client.ts dùng lại bộ máy JavaScript.
import { Position } from './board';
import { MATE, MATE_BOUND, mateIn } from './search';
import { rebuild, threatGain } from './analyze';
import type { AnalysisLine, AnalysisResult, WorkerRequest } from './protocol';

export const STOCKFISH_PATH = 'stockfish/stockfish-18-lite-single.js';
const INIT_TIMEOUT_MS = 30_000;

export type AnalyzeRequest = Omit<Extract<WorkerRequest, { type: 'analyze' }>, 'id'>;

export interface UciInfo {
  depth: number;
  multipv: number;
  /** Điểm theo góc nhìn bên đến lượt, cùng thang với bộ máy JavaScript (chiếu hết = ±(MATE - ply)) */
  score: number;
  nodes: number;
  timeMs: number;
  pv: string[];
}

/** Đọc một dòng "info … score … pv …" của UCI. Bỏ qua dòng không có PV và dòng chỉ là cận trên/dưới. */
export function parseInfo(line: string): UciInfo | null {
  if (!line.startsWith('info ')) return null;
  const t = line.trim().split(/\s+/);
  let depth = 0,
    multipv = 1,
    nodes = 0,
    timeMs = 0,
    score: number | null = null,
    pv: string[] = [];
  for (let i = 1; i < t.length; i++) {
    switch (t[i]) {
      case 'string':
        return null;
      case 'lowerbound':
      case 'upperbound':
        return null;
      case 'depth':
        depth = +t[++i];
        break;
      case 'multipv':
        multipv = +t[++i];
        break;
      case 'nodes':
        nodes = +t[++i];
        break;
      case 'time':
        timeMs = +t[++i];
        break;
      case 'score': {
        const kind = t[++i],
          v = +t[++i];
        // "mate N": N > 0 – bên đến lượt chiếu hết sau N nước (2N-1 nửa nước); N < 0 – bị chiếu hết sau |N| nước
        if (kind === 'mate') score = v > 0 ? MATE - (2 * v - 1) : -(MATE + 2 * v);
        else score = Math.max(-(MATE_BOUND - 1), Math.min(MATE_BOUND - 1, v));
        break;
      }
      case 'pv':
        pv = t.slice(i + 1);
        i = t.length;
        break;
    }
  }
  return score === null || !pv.length ? null : { depth, multipv, score, nodes, timeMs, pv };
}

/** Đổi một PV dạng UCI sang phương án phân tích (kèm SAN), dừng ở nước đầu tiên không hợp lệ. */
export function toAnalysisLine(pos: Position, info: UciInfo): AnalysisLine | null {
  const uci: string[] = [];
  const san: string[] = [];
  for (const u of info.pv) {
    const m = pos.moveFromUci(u);
    if (!m) break;
    uci.push(pos.moveToUci(m));
    san.push(pos.moveToSan(m));
    pos.make(m);
  }
  for (let i = 0; i < uci.length; i++) pos.unmake();
  if (!uci.length) return null;
  const sign = pos.side === 0 ? 1 : -1;
  return { uci: uci[0], san: san[0], score: info.score, scoreWhite: info.score * sign, mate: mateIn(info.score), pv: uci, pvSan: san };
}

/** Các phương án theo thứ tự multipv của Stockfish (phương án 1 là nước tốt nhất). */
export function toAnalysisLines(pos: Position, infos: Map<number, UciInfo>): AnalysisLine[] {
  return [...infos.values()]
    .sort((a, b) => a.multipv - b.multipv)
    .map((i) => toAnalysisLine(pos, i))
    .filter((l): l is AnalysisLine => !!l);
}

interface Job {
  req: AnalyzeRequest;
  channel?: string;
  cancelled: boolean;
  resolve: (r: AnalysisResult | null) => void;
  reject: (e: Error) => void;
}

interface Waiter {
  onLine: (line: string) => void;
  reject: (e: Error) => void;
}

interface GoResult {
  infos: Map<number, UciInfo>;
  depth: number;
  nodes: number;
  timeMs: number;
}

export class StockfishEngine {
  private worker: Worker | null = null;
  private ready: Promise<void> | null = null;
  private failed = false;
  private waiter: Waiter | null = null;
  private queue: Job[] = [];
  private running: Job | null = null;
  private multiPV = 1;

  get usable(): boolean {
    return !this.failed && typeof Worker !== 'undefined' && typeof WebAssembly === 'object';
  }

  /**
   * Gửi yêu cầu phân tích. Nếu có `channel`, yêu cầu cùng kênh đang chờ sẽ bị thay thế (trả về null).
   * `priority`: xếp lên đầu hàng đợi (người chơi đang chờ, ví dụ khi xin gợi ý).
   */
  request(req: AnalyzeRequest, channel?: string, priority = false): Promise<AnalysisResult | null> {
    if (!this.usable) return Promise.reject(new Error('Stockfish không khả dụng'));
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
      const job = { req, channel, cancelled: false, resolve, reject };
      if (priority) this.queue.unshift(job);
      else this.queue.push(job);
      this.pump();
    });
  }

  /** Hủy mọi việc đang làm: dừng lượt tìm kiếm hiện tại và bỏ hàng đợi */
  cancelAll() {
    for (const q of this.queue) q.resolve(null);
    this.queue = [];
    if (this.running) {
      this.running.cancelled = true;
      this.running.resolve(null);
      this.send('stop');
    }
  }

  private async pump() {
    if (this.running || !this.queue.length) return;
    const job = this.queue.shift()!;
    this.running = job;
    try {
      const r = await this.analyze(job);
      job.resolve(job.cancelled ? null : r);
    } catch (e) {
      job.reject(e as Error);
    }
    this.running = null;
    this.pump();
  }

  private send(cmd: string) {
    this.worker?.postMessage(cmd);
  }

  private start(): Promise<void> {
    if (this.ready) return this.ready;
    this.ready = new Promise<void>((resolve, reject) => {
      const timer = setTimeout(() => this.fail(new Error('Stockfish khởi động quá lâu')), INIT_TIMEOUT_MS);
      this.waiter = {
        onLine: (line) => {
          if (line === 'uciok') this.send('isready');
          else if (line === 'readyok') {
            clearTimeout(timer);
            this.waiter = null;
            resolve();
          }
        },
        reject: (e) => {
          clearTimeout(timer);
          reject(e);
        },
      };
      try {
        const url = new URL(import.meta.env.BASE_URL + STOCKFISH_PATH, location.href).href;
        this.worker = new Worker(url);
      } catch (e) {
        this.fail(e as Error);
        return;
      }
      this.worker.onmessage = (e: MessageEvent) => {
        if (typeof e.data !== 'string') return;
        for (const line of e.data.split('\n')) if (line) this.waiter?.onLine(line);
      };
      this.worker.onerror = (e) => {
        e.preventDefault?.();
        this.fail(new Error('Stockfish lỗi: ' + (e.message || 'không tải được')));
      };
      this.send('uci');
    });
    return this.ready;
  }

  /** Bộ máy hỏng (không tải được, lỗi WebAssembly…): từ chối mọi yêu cầu để client chuyển sang bộ máy JavaScript */
  private fail(err: Error) {
    if (this.failed) return;
    this.failed = true;
    this.worker?.terminate();
    this.worker = null;
    const w = this.waiter;
    this.waiter = null;
    w?.reject(err);
    for (const q of this.queue) q.reject(err);
    this.queue = [];
  }

  private go(position: string, multiPV: number, timeMs: number, maxDepth: number | undefined, job: Job, searchMoves?: string[]): Promise<GoResult> {
    return new Promise((resolve, reject) => {
      const infos = new Map<number, UciInfo>();
      let nodes = 0,
        time = 0;
      this.waiter = {
        onLine: (line) => {
          if (line.startsWith('info ')) {
            const i = parseInfo(line);
            if (!i) return;
            infos.set(i.multipv, i);
            nodes = Math.max(nodes, i.nodes);
            time = Math.max(time, i.timeMs);
          } else if (line.startsWith('bestmove')) {
            this.waiter = null;
            resolve({ infos, depth: infos.get(1)?.depth ?? 0, nodes, timeMs: time });
          }
        },
        reject,
      };
      if (multiPV !== this.multiPV) {
        this.send(`setoption name MultiPV value ${multiPV}`);
        this.multiPV = multiPV;
      }
      this.send(position);
      this.send(`go movetime ${Math.max(50, Math.round(timeMs))}${maxDepth ? ` depth ${maxDepth}` : ''}${searchMoves?.length ? ` searchmoves ${searchMoves.join(' ')}` : ''}`);
      if (job.cancelled) this.send('stop');
    });
  }

  private async analyze(job: Job): Promise<AnalysisResult | null> {
    await this.start();
    if (job.cancelled) return null;
    const { fen: startFen, moves, multiPV, timeMs, maxDepth, threat, searchMoves } = job.req;
    const pos = rebuild(startFen, moves);
    const fen = pos.fen();
    const threatBudget = threat ? Math.round(timeMs * 0.25) : 0;
    const position = `position fen ${startFen}${moves.length ? ' moves ' + moves.join(' ') : ''}`;
    const r = await this.go(position, Math.max(1, multiPV), timeMs - threatBudget, maxDepth, job, searchMoves);
    const lines = toAnalysisLines(pos, r.infos);
    const result: AnalysisResult = { fen, depth: r.depth, nodes: r.nodes, timeMs: r.timeMs, lines, engine: 'stockfish' };

    // Phát hiện đe dọa: nếu ta bỏ lượt, đối thủ sẽ làm gì?
    if (threat && lines.length && !pos.inCheck() && !job.cancelled) {
      pos.makeNull();
      const t = await this.go(`position fen ${pos.fen()}`, 1, threatBudget, undefined, job);
      const best = t.infos.get(1);
      const line = best && toAnalysisLine(pos, best);
      if (line) {
        const gain = threatGain(line.score, lines[0].score);
        if (gain !== null) result.threat = { uci: line.uci, san: line.san, pv: line.pv, pvSan: line.pvSan, gain, mate: line.mate };
      }
      pos.unmakeNull();
    }
    return result;
  }
}
