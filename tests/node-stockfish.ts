// Chạy Stockfish (tệp trong public/stockfish/) dưới Node để kiểm thử: giả lập Web Worker bằng tiến trình con,
// nhờ vậy StockfishEngine được kiểm tra đúng như khi chạy trong trình duyệt.
import { spawn, ChildProcessWithoutNullStreams } from 'node:child_process';
import { copyFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createInterface } from 'node:readline';
import { fileURLToPath } from 'node:url';

// Dự án khai báo "type": "module" nên Node coi tệp bộ máy (CommonJS) là ES module và báo lỗi:
// chép tệp .js + .wasm ra thư mục tạm bên ngoài dự án rồi chạy từ đó.
const ENGINE_DIR = mkdtempSync(join(tmpdir(), 'ky-dao-stockfish-'));
for (const ext of ['.js', '.wasm']) {
  copyFileSync(fileURLToPath(new URL('../public/stockfish/stockfish-18-lite-single' + ext, import.meta.url)), join(ENGINE_DIR, 'stockfish' + ext));
}
export const ENGINE_JS = join(ENGINE_DIR, 'stockfish.js');

function spawnEngine(file: string, onLine: (line: string) => void, onExit: (code: number | null) => void): ChildProcessWithoutNullStreams {
  const p = spawn(process.execPath, [file]);
  createInterface({ input: p.stdout }).on('line', onLine);
  p.on('exit', onExit);
  p.stdin.on('error', () => {});
  return p;
}

/** Thay `Worker` toàn cục bằng tiến trình Node chạy `file` (mặc định là Stockfish thật). */
export function installNodeWorker(file = ENGINE_JS) {
  class NodeWorker {
    onmessage: ((e: { data: string }) => void) | null = null;
    onerror: ((e: { message: string; preventDefault(): void }) => void) | null = null;
    private killed = false;
    private p = spawnEngine(
      file,
      (line) => this.onmessage?.({ data: line }),
      (code) => {
        if (!this.killed) this.onerror?.({ message: 'thoát với mã ' + code, preventDefault() {} });
      },
    );
    postMessage(cmd: string) {
      if (!this.killed) this.p.stdin.write(cmd + '\n');
    }
    terminate() {
      this.killed = true;
      this.p.kill();
    }
  }
  (globalThis as any).Worker = NodeWorker;
  (globalThis as any).location ??= { href: 'http://localhost/' };
}

/** Một tiến trình UCI độc lập (dùng làm đối thủ trong các ván đấu thử) */
export class UciProcess {
  private waiter: ((line: string) => void) | null = null;
  private p = spawnEngine(ENGINE_JS, (line) => this.waiter?.(line), () => {});

  send(cmd: string) {
    this.p.stdin.write(cmd + '\n');
  }

  /** Gửi lệnh rồi chờ tới dòng thỏa `done`; trả về mọi dòng đã nhận */
  until(cmds: string[], done: (line: string) => boolean): Promise<string[]> {
    return new Promise((resolve) => {
      const got: string[] = [];
      this.waiter = (line) => {
        got.push(line);
        if (done(line)) {
          this.waiter = null;
          resolve(got);
        }
      };
      for (const c of cmds) this.send(c);
    });
  }

  async init(options: Record<string, string | number> = {}) {
    await this.until(['uci'], (l) => l === 'uciok');
    for (const [k, v] of Object.entries(options)) this.send(`setoption name ${k} value ${v}`);
    await this.until(['isready'], (l) => l === 'readyok');
    return this;
  }

  async bestMove(startFen: string, moves: string[], go: string): Promise<string> {
    const out = await this.until([`position fen ${startFen}${moves.length ? ' moves ' + moves.join(' ') : ''}`, go], (l) => l.startsWith('bestmove'));
    return out[out.length - 1].split(' ')[1];
  }

  quit() {
    this.send('quit');
    setTimeout(() => this.p.kill(), 200);
  }
}
