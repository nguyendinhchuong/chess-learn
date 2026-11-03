// Sách khai cuộc: xây dựng từ dữ liệu bài học khai cuộc, dùng để máy đi đa dạng, nhận diện tên khai cuộc
// và đánh dấu "nước đi lý thuyết".
import { OPENINGS } from '../data/openings';
import { Position, splitMoves } from './board';

interface Entry {
  moves: Map<string, number>;
}

/** Một số diễn biến phổ biến bổ sung để máy chơi đa dạng hơn */
const EXTRA_LINES: [string | null, string, string][] = [
  ['ruy-lopez', '', '1.e4 e5 2.Nf3 Nc6 3.Bb5 a6 4.Ba4 Nf6 5.O-O Be7 6.Re1 b5 7.Bb3 d6 8.c3 O-O 9.h3'],
  ['ruy-lopez', 'Phòng thủ Berlin', '1.e4 e5 2.Nf3 Nc6 3.Bb5 Nf6 4.O-O Nxe4 5.d4 Nd6 6.Bxc6 dxc6 7.dxe5 Nf5 8.Qxd8+ Kxd8'],
  ['italian', 'Phòng thủ Hai Mã', '1.e4 e5 2.Nf3 Nc6 3.Bc4 Nf6 4.d3 Be7 5.O-O O-O 6.Re1 d6'],
  ['italian', '', '1.e4 e5 2.Nf3 Nc6 3.Bc4 Bc5 4.c3 Nf6 5.d3 d6 6.O-O O-O 7.Re1 a6'],
  [null, 'Phòng thủ Petrov', '1.e4 e5 2.Nf3 Nf6 3.Nxe5 d6 4.Nf3 Nxe4 5.d4 d5 6.Bd3'],
  ['sicilian', '', '1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 a6 6.Be3 e5 7.Nb3 Be6'],
  ['sicilian', '', '1.e4 c5 2.Nf3 Nc6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 e5 6.Ndb5 d6'],
  ['sicilian', 'Biến Taimanov', '1.e4 c5 2.Nf3 e6 3.d4 cxd4 4.Nxd4 Nc6 5.Nc3 Qc7'],
  ['sicilian', 'Biến Alapin', '1.e4 c5 2.c3 Nf6 3.e5 Nd5 4.d4 cxd4 5.Nf3'],
  ['french', '', '1.e4 e6 2.d4 d5 3.Nc3 Nf6 4.Bg5 Be7 5.e5 Nfd7 6.Bxe7 Qxe7'],
  ['caro-kann', '', '1.e4 c6 2.d4 d5 3.e5 Bf5 4.Nf3 e6 5.Be2 c5'],
  ['queens-gambit-declined', '', '1.d4 d5 2.c4 e6 3.Nc3 Nf6 4.Bg5 Be7 5.e3 O-O 6.Nf3 h6 7.Bh4 b6'],
  ['slav', '', '1.d4 d5 2.c4 c6 3.Nf3 Nf6 4.Nc3 dxc4 5.a4 Bf5 6.e3 e6 7.Bxc4 Bb4'],
  ['kings-indian', '', '1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.Nf3 O-O 6.Be2 e5 7.O-O Nc6 8.d5 Ne7'],
  ['nimzo-indian', '', '1.d4 Nf6 2.c4 e6 3.Nc3 Bb4 4.e3 O-O 5.Bd3 d5 6.Nf3 c5 7.O-O'],
  [null, 'Phòng thủ Ấn Độ – Hậu', '1.d4 Nf6 2.c4 e6 3.Nf3 b6 4.g3 Ba6 5.b3 Bb4+ 6.Bd2 Be7'],
  ['london', '', '1.d4 d5 2.Bf4 Nf6 3.e3 e6 4.Nf3 c5 5.c3 Nc6 6.Nbd2 Bd6 7.Bg3'],
  ['english', '', '1.c4 e5 2.Nc3 Nf6 3.Nf3 Nc6 4.g3 d5 5.cxd5 Nxd5 6.Bg2 Nb6'],
  ['english', 'Biến đối xứng', '1.c4 c5 2.Nc3 Nc6 3.g3 g6 4.Bg2 Bg7 5.Nf3 Nf6'],
  [null, 'Khai cuộc Réti', '1.Nf3 d5 2.g3 Nf6 3.Bg2 c6 4.O-O Bg4 5.d3 Nbd7'],
  [null, 'Khai cuộc Réti', '1.Nf3 Nf6 2.c4 e6 3.Nc3 d5 4.d4 Be7'],
];

/** Tên chung cho các vị trí rất sớm mà nhiều khai cuộc cùng đi qua */
const GENERIC_NAMES: [string, string][] = [
  ['1.e4', 'Khai cuộc Tốt Vua (1.e4)'],
  ['1.d4', 'Khai cuộc Tốt Hậu (1.d4)'],
  ['1.c4', 'Khai cuộc Anh (1.c4)'],
  ['1.Nf3', 'Khai cuộc Réti (1.Nf3)'],
  ['1.e4 e5', 'Ván cờ mở (1.e4 e5)'],
  ['1.e4 e5 2.Nf3', 'Ván cờ mở – Mã Vua (2.Nf3)'],
  ['1.e4 e5 2.Nf3 Nc6', 'Ván cờ mở – hai Mã (2...Nc6)'],
  ['1.d4 d5', 'Ván cờ đóng (1.d4 d5)'],
  ['1.d4 d5 2.c4', 'Gambit Hậu (2.c4)'],
  ['1.d4 Nf6', 'Phòng thủ Ấn Độ (1...Nf6)'],
  ['1.d4 Nf6 2.c4', 'Phòng thủ Ấn Độ (2.c4)'],
  ['1.e4 c5', 'Phòng thủ Sicilia'],
  ['1.e4 c5 2.Nf3', 'Phòng thủ Sicilia'],
  ['1.e4 e6', 'Phòng thủ Pháp'],
  ['1.e4 c6', 'Phòng thủ Caro-Kann'],
  ['1.e4 d5', 'Phòng thủ Scandinavia'],
];

let book: Map<string, Entry> | null = null;
let names: Map<string, string> | null = null;
/** Các khai cuộc (tên gốc) đi qua mỗi vị trí – vị trí chung của nhiều khai cuộc không được đặt tên riêng */
let owners: Map<string, Set<string>> | null = null;

function addLine(moves: string, name: string, weight: number, family: string) {
  const pos = new Position();
  for (const san of splitMoves(moves)) {
    const key = pos.key();
    const m = pos.sanToMove(san);
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
  for (const o of OPENINGS) addLine(o.moves, o.name, 3, o.name);
  for (const o of OPENINGS) for (const v of o.variations) addLine(v.moves, `${o.name} – ${v.name}`, 2, o.name);
  for (const [id, sub, line] of EXTRA_LINES) {
    const o = id ? OPENINGS.find((x) => x.id === id) : undefined;
    const family = o ? o.name : sub;
    addLine(line, o ? (sub ? `${o.name} – ${sub}` : o.name) : sub, 1, family);
  }
  // vị trí thuộc nhiều khai cuộc: bỏ tên riêng, dùng tên chung nếu có
  for (const [key, set] of owners) if (set.size > 1) names.delete(key);
  for (const [line, name] of GENERIC_NAMES) {
    const pos = new Position();
    let ok = true;
    for (const san of splitMoves(line)) {
      const m = pos.sanToMove(san);
      if (!m) {
        ok = false;
        break;
      }
      pos.make(m);
    }
    if (ok) names.set(pos.key(), name);
  }
}

export function bookMoves(pos: Position): { uci: string; weight: number }[] {
  ensure();
  const e = book!.get(pos.key());
  if (!e) return [];
  return [...e.moves.entries()].map(([uci, weight]) => ({ uci, weight }));
}

export function pickBookMove(pos: Position): string | null {
  const list = bookMoves(pos);
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
  return names!.get(pos.key());
}
