// Sinh "bảng dữ kiện" cho từng nước của từng ván (máy đánh giá + phân tích mục đích tự động) để người viết lời bình bám sát thực tế.
// Chạy: FACTS_SET=<goc|lang-man|…|lessons> FACTS_OUT=<thư mục> npx vitest run scripts/facts.test.ts --dir scripts
import { it } from 'vitest';
import { writeFileSync, mkdirSync } from 'node:fs';
import { ERA_FILES } from '../src/data/games/index';
import { GAMES_GOC } from '../src/data/games/goc';
import { ALL_LESSONS } from '../src/data/lessons/index';
import { playLine, Position, START_FEN } from '../src/engine/board';
import { Searcher, mateIn } from '../src/engine/search';
import { explainPurpose, isCaptureAt } from '../src/engine/purpose';
import { plyFromKey } from '../src/data/validate';

const SET = process.env.FACTS_SET ?? 'goc';
const OUT = process.env.FACTS_OUT ?? 'facts';
const searcher = new Searcher();

function evalOf(pos: Position, ms: number) {
  const st = pos.status();
  if (st.over) return { text: st.reason === 'checkmate' ? 'chiếu hết' : 'hòa', best: '' };
  const r = searcher.search(pos, { timeMs: ms, multiPV: 1 });
  const l = r.lines[0];
  const white = pos.side === 0 ? l.score : -l.score;
  const mi = mateIn(l.score);
  const text = mi ? `${(pos.side === 0) === mi > 0 ? 'Trắng' : 'Đen'} chiếu hết sau ${Math.abs(mi)}` : `${white > 0 ? '+' : ''}${(white / 100).toFixed(2)}`;
  return { text, best: pos.moveToSan(l.move) };
}

function sheet(title: string, startFen: string, moves: string, existing: Map<number, string>, label: (i: number) => string) {
  const line = playLine(moves, startFen);
  const rows: string[] = [];
  for (let i = 0; i < line.sans.length; i++) {
    const pos = new Position(line.fens[i]);
    const m = pos.moveFromUci(line.ucis[i]);
    const before = evalOf(pos, 110);
    const purpose = explainPurpose(pos, m, { prevUci: line.ucis[i - 1], prevCapture: i > 0 && isCaptureAt(line.fens[i - 1], line.ucis[i - 1]) });
    const has = existing.get(i);
    rows.push(
      `${label(i)} ${line.sans[i]} | ${pos.side === 0 ? 'Trắng' : 'Đen'} đi | máy trước nước: ${before.text}, nước máy chọn: ${before.best}${before.best === line.sans[i] ? ' (TRÙNG nước đã đi)' : ''}` +
        (has ? ` | ĐÃ CÓ LỜI BÌNH: ${has.slice(0, 160)}${has.length > 160 ? '…' : ''}` : ` | CẦN VIẾT | gợi ý tự động: ${purpose}`),
    );
  }
  const last = new Position(line.fens[line.fens.length - 1]);
  rows.push(`(kết thúc: ${evalOf(last, 150).text})`);
  return `${title}\n${rows.join('\n')}\n`;
}

it('facts ' + SET, () => {
  mkdirSync(`${OUT}/${SET}`, { recursive: true });
  if (SET === 'lessons') {
    for (const l of ALL_LESSONS) {
      const parts: string[] = [];
      l.sections.forEach((s, si) => {
        const d = s.diagram;
        if (!d?.moves) return;
        const n = playLine(d.moves, d.fen ?? START_FEN).sans.length;
        const missing = Array.from({ length: n }, (_, i) => i).filter((i) => !d.notes?.[i]?.trim());
        if (!missing.length) return;
        const existing = new Map<number, string>();
        d.notes?.forEach((t, i) => t?.trim() && existing.set(i, t));
        parts.push(sheet(`## Phần ${si + 1} – "${s.heading}" (notes[i] = lời bình sau nước thứ i, đánh số từ 0)`, d.fen ?? START_FEN, d.moves, existing, (i) => `notes[${i}]:`));
      });
      if (parts.length) writeFileSync(`${OUT}/${SET}/${l.id}.txt`, `# Bài ${l.id} – ${l.title}\n\n${parts.join('\n')}`);
    }
    return;
  }
  const list = SET === 'goc' ? GAMES_GOC : ERA_FILES[SET];
  for (const g of list) {
    const existing = new Map<number, string>();
    for (const [k, v] of Object.entries(g.annotations)) existing.set(plyFromKey(k) - 1, v);
    const label = (i: number) => `"${Math.floor(i / 2) + 1}${i % 2 ? '...' : ''}"`;
    const head = `# ${g.id} — ${g.title} — ${g.white} vs ${g.black}, ${g.event} ${g.year}, kết quả ${g.result}\n# Bối cảnh: ${g.summary}\n# Định dạng: khóa "12" = nước 12 của Trắng, "12..." = nước 12 của Đen. Đánh giá máy theo góc nhìn Trắng (+ là Trắng hơn).`;
    writeFileSync(`${OUT}/${SET}/${g.id}.txt`, sheet(head, START_FEN, g.moves, existing, label));
  }
}, 3_600_000);
