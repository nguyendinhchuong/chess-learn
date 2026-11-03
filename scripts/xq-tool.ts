// Công cụ dòng lệnh cho người biên soạn nội dung cờ tướng.
// Chạy: npx vite-node scripts/xq-tool.ts <lệnh> ...
//   show  "<fen|start>" ["<nước đi>"]        – vẽ bàn cờ (sau các nước đi) và liệt kê mọi nước hợp lệ
//   line  "<fen|start>" "<nước đi>"          – từng nửa nước: ký hiệu, tọa độ, FEN sau nước đó
//   mate  "<fen|start>" <n>                  – các nước thắng (chiếu bí/khốn bí) trong ≤ n nước, kèm số nước ngắn nhất
//   search "<fen|start>" [ms] [multipv]      – máy phân tích: các phương án tốt nhất kèm diễn biến
//   fen   "<bàn cờ dạng chữ>"                – (không dùng) xem README
import { Position, START_FEN, playLine, sqName, PIECE_VI, pieceType, pieceColor, RED } from '../src/xiangqi/engine/board';
import { MateSolver } from '../src/xiangqi/engine/mate';
import { Searcher, mateIn } from '../src/xiangqi/engine/search';
import { checkFen } from '../src/xiangqi/data/validate';

const HAN = ['', '帥將', '仕士', '相象', '傌馬', '俥車', '炮砲', '兵卒'];

function draw(pos: Position): string {
  const lines: string[] = [];
  lines.push('     1   2   3   4   5   6   7   8   9     (cột của Đen)');
  for (let y = 9; y >= 0; y--) {
    let row = ` ${y}  `;
    for (let x = 0; x < 9; x++) {
      const p = pos.board[y * 9 + x];
      if (!p) row += ' ·  ';
      else {
        const t = pieceType(p);
        const c = pieceColor(p);
        const ch = 'KABNRCP'[t - 1];
        row += (c === RED ? ch : ch.toLowerCase()) + HAN[t][c] + '  ';
      }
    }
    lines.push(row);
    if (y === 5) lines.push('    ~~~~~~~~~~~~~~ sông ~~~~~~~~~~~~~~');
  }
  lines.push('     a   b   c   d   e   f   g   h   i');
  lines.push('     9   8   7   6   5   4   3   2   1     (cột của Đỏ)');
  lines.push(`Lượt: ${pos.side === RED ? 'Đỏ' : 'Đen'}   FEN: ${pos.fen()}`);
  return lines.join('\n');
}

function load(fenArg: string, moves?: string): Position {
  const fen = !fenArg || fenArg === 'start' ? START_FEN : fenArg;
  const err = checkFen(fen);
  if (err) console.log('⚠️  ' + err);
  const pos = new Position(fen);
  if (moves) {
    const line = playLine(moves, fen);
    for (const u of line.ucis) pos.make(pos.moveFromUci(u));
  }
  return pos;
}

const [cmd, a1, a2, a3] = process.argv.slice(2).filter((x) => x !== '--');
switch (cmd) {
  case 'show': {
    const pos = load(a1, a2);
    console.log(draw(pos));
    const legal = pos.legalMoves();
    console.log(`\n${legal.length} nước hợp lệ:`);
    console.log(legal.map((m) => `${pos.moveToSan(m)} (${pos.moveToUci(m)})`).join('  '));
    const st = pos.status();
    if (st.over) console.log('Ván kết thúc:', st);
    else if (pos.inCheck()) console.log('Bên đi đang bị chiếu!');
    break;
  }
  case 'line': {
    const fen = !a1 || a1 === 'start' ? START_FEN : a1;
    const line = playLine(a2, fen);
    line.sans.forEach((s, i) => console.log(`${i + 1}. ${s.padEnd(7)} ${line.ucis[i]}   ${line.fens[i + 1]}`));
    const end = new Position(line.fens[line.fens.length - 1]);
    console.log(draw(end));
    break;
  }
  case 'mate': {
    const pos = load(a1);
    const n = Number(a2 ?? 3);
    const s = new MateSolver();
    const shortest = s.shortest(pos, n);
    console.log(draw(pos));
    if (!shortest) console.log(`Không có cách thắng bắt buộc trong ${n} nước.`);
    else {
      const moves = s.matingMoves(pos, shortest);
      console.log(`Thắng nhanh nhất sau ${shortest} nước. Các nước thắng đúng ${shortest} nước: ${moves.map((m) => pos.moveToSan(m) + ' (' + pos.moveToUci(m) + ')').join(', ')}`);
    }
    break;
  }
  case 'search': {
    const pos = load(a1);
    const r = new Searcher().search(pos, { timeMs: Number(a2 ?? 2000), multiPV: Number(a3 ?? 3) });
    console.log(draw(pos));
    console.log(`độ sâu ${r.depth}, ${r.nodes} nút`);
    for (const l of r.lines) {
      const p = new Position(pos.fen());
      const sans: string[] = [];
      for (const m of l.pv) {
        if (!p.legalMoves().includes(m)) break;
        sans.push(p.moveToSan(m));
        p.make(m);
      }
      const mi = mateIn(l.score);
      console.log(`${(mi ? (mi > 0 ? '+M' : '-M') + Math.abs(mi) : (l.score / 100).toFixed(2)).padStart(7)}  ${sans.join(' ')}`);
    }
    break;
  }
  default:
    console.log('Lệnh: show | line | mate | search (xem chú thích đầu tệp scripts/xq-tool.ts)');
    console.log('Tên quân:', PIECE_VI.slice(1).join(', '), ' – ô:', sqName(4));
}
