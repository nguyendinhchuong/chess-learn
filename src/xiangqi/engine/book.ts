// Sách khai cuộc cờ tướng: xây dựng từ dữ liệu khai cuộc (diễn biến chính và các biến), dùng để máy đi đa dạng,
// nhận diện tên khai cuộc và đánh dấu "nước đi lý thuyết". Khai cuộc cờ tướng đối xứng trái – phải, nên thế cờ
// lật gương (ví dụ P8-5 thay cho P2-5) cũng được nhận ra.
import { XQ_OPENINGS } from '../data/openings';
import { Position, splitMoves } from './board';

interface Entry {
  moves: Map<string, number>;
}

/** Tên chung cho các thế rất sớm mà nhiều khai cuộc cùng đi qua */
const GENERIC_NAMES: [string, string][] = [
  ['P2-5', 'Pháo đầu (Trung pháo)'],
  ['B7.1', 'Tiên nhân chỉ lộ'],
  ['T3.5', 'Phi tượng cục'],
  ['M2.3', 'Khởi mã cục'],
  ['P2-4', 'Sĩ giác pháo'],
  ['P2-6', 'Quá cung pháo'],
  ['P2-5 P8-5', 'Thuận pháo'],
  ['P2-5 P2-5', 'Nghịch pháo (Liệt pháo)'],
  ['P2-5 M8.7', 'Pháo đầu đối Mã'],
  ['P2-5 M8.7 M2.3 X9-8', 'Pháo đầu đối Bình phong mã'],
  ['B7.1 P2-3', 'Tiên nhân chỉ lộ đối Tốt để pháo'],
  ['B7.1 B7.1', 'Tiên nhân chỉ lộ – Đối binh'],
];

let book: Map<string, Entry> | null = null;
let names: Map<string, string> | null = null;
let owners: Map<string, Set<string>> | null = null;

/** Lật gương trái – phải chuỗi bàn cờ trong FEN */
function mirrorKey(key: string): string {
  const [board, side] = key.split(' ');
  const rows = board.split('/').map((row) => {
    const cells: string[] = [];
    for (const ch of row) {
      if (/\d/.test(ch)) for (let i = 0; i < Number(ch); i++) cells.push('.');
      else cells.push(ch);
    }
    cells.reverse();
    let out = '';
    let n = 0;
    for (const c of cells) {
      if (c === '.') n++;
      else {
        if (n) out += n;
        n = 0;
        out += c;
      }
    }
    if (n) out += n;
    return out;
  });
  return rows.join('/') + ' ' + side;
}

function mirrorSq(name: string): string {
  const x = name.charCodeAt(0) - 97;
  return 'abcdefghi'[8 - x] + name[1];
}
const mirrorUci = (u: string) => mirrorSq(u.slice(0, 2)) + mirrorSq(u.slice(2, 4));

function addLine(moves: string, name: string, weight: number, family: string) {
  const pos = new Position();
  for (const tok of splitMoves(moves)) {
    const key = pos.key();
    const m = pos.sanToMove(tok);
    if (!m) break;
    const uci = pos.moveToUci(m);
    let e = book!.get(key);
    if (!e) book!.set(key, (e = { moves: new Map() }));
    e.moves.set(uci, (e.moves.get(uci) ?? 0) + weight);
    pos.make(m);
    const after = pos.key();
    if (!owners!.has(after)) owners!.set(after, new Set());
    owners!.get(after)!.add(family);
    if (!names!.has(after)) names!.set(after, name);
  }
}

function ensure() {
  if (book) return;
  book = new Map();
  names = new Map();
  owners = new Map();
  for (const o of XQ_OPENINGS) addLine(o.moves, o.name, 3, o.name);
  for (const o of XQ_OPENINGS) for (const v of o.variations) addLine(v.moves, `${o.name} – ${v.name}`, 2, o.name);
  for (const [key, set] of owners) if (set.size > 1) names.delete(key);
  for (const [line, name] of GENERIC_NAMES) {
    const pos = new Position();
    let ok = true;
    for (const tok of splitMoves(line)) {
      const m = pos.sanToMove(tok);
      if (!m) {
        ok = false;
        break;
      }
      pos.make(m);
    }
    if (ok && !names.has(pos.key())) names.set(pos.key(), name);
  }
}

export function bookMoves(pos: Position): { uci: string; weight: number }[] {
  ensure();
  const key = pos.key();
  const e = book!.get(key);
  if (e) return [...e.moves.entries()].map(([uci, weight]) => ({ uci, weight }));
  const mirrored = book!.get(mirrorKey(key));
  if (mirrored) return [...mirrored.moves.entries()].map(([uci, weight]) => ({ uci: mirrorUci(uci), weight }));
  return [];
}

export function pickBookMove(pos: Position): string | null {
  const list = bookMoves(pos).filter((x) => pos.moveFromUci(x.uci));
  if (!list.length) return null;
  const total = list.reduce((s, x) => s + x.weight, 0);
  let r = Math.random() * total;
  for (const x of list) {
    r -= x.weight;
    if (r <= 0) return x.uci;
  }
  return list[0].uci;
}

export function isBookMove(posBefore: Position, uci: string): boolean {
  return bookMoves(posBefore).some((x) => x.uci === uci);
}

/** Tên khai cuộc của vị trí hiện tại (nếu có trong sách) */
export function openingNameAt(pos: Position): string | undefined {
  ensure();
  const key = pos.key();
  return names!.get(key) ?? names!.get(mirrorKey(key));
}

export { mirrorKey, mirrorUci };
