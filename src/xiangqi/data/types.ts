// Kiểu dữ liệu cho nội dung cờ tướng: bài học, khai cuộc, ván cờ kinh điển, cờ thế.
//
// Quy ước chung:
// - Ô cờ: cột a..i (trái → phải nhìn từ phía Đỏ), hàng 0..9 (hàng 0 là hàng cuối của Đỏ). Tướng Đỏ ở e0, Tướng Đen ở e9,
//   Pháo Đỏ ở b2, h2; Tốt Đỏ ở a3, c3, e3, g3, i3.
// - FEN chuẩn cờ tướng, chữ hoa = Đỏ, lượt "w" = Đỏ đi: "rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR w - - 0 1"
//   (K Tướng, A Sĩ, B Tượng, N Mã, R Xe, C Pháo, P Tốt).
// - Nước đi viết bằng ký hiệu Việt Nam: quân (Tg, S, T, M, X, P, B) + cột xuất phát + hành động (. tấn, / thoái, - bình)
//   + đích (cột đến với Mã/Tượng/Sĩ hoặc khi bình; số bước khi Xe/Pháo/Tốt/Tướng tấn – thoái). Mỗi bên đếm cột 1..9 từ
//   phải sang trái theo hướng nhìn của mình. Hai quân cùng loại trên một cột: "Xt" (trước), "Xs" (sau).
//   Có thể kèm số thứ tự: "1. P2-5 M8.7 2. M2.3 X9-8". Cũng chấp nhận chữ Hán (炮二平五) hoặc tọa độ (h2e2).
// - Mũi tên: "h2e2" (mặc định xanh lá) hoặc "h2e2:red" | ":blue" | ":yellow" | ":orange".
// - Tô ô: "e2" (mặc định vàng) hoặc "e2:red" | ":green" | ":blue".
// - Văn bản hỗ trợ **in đậm**, dòng bắt đầu bằng "- " thành danh sách, đoạn cách nhau bằng dòng trống.

export type ArrowSpec = string;
export type HighlightSpec = string;
export type XqSide = 'red' | 'black';

export interface XqDiagram {
  /** FEN vị trí. Bỏ trống = vị trí ban đầu. */
  fen?: string;
  /** Chuỗi nước đi từ vị trí `fen`, người học bấm ◀ ▶ để xem từng nước. */
  moves?: string;
  /** Lời bình sau từng nước của `moves` (chỉ số 0 = sau nước đầu tiên). Có thể để "" */
  notes?: string[];
  arrows?: ArrowSpec[];
  highlights?: HighlightSpec[];
  /** Bên ở phía dưới bàn cờ (mặc định Đỏ) */
  orientation?: XqSide;
  /** Chú thích ngắn dưới bàn cờ */
  caption?: string;
}

export interface XqLessonSection {
  heading: string;
  body: string;
  /** Hộp "💡 Mẹo của thầy" */
  tip?: string;
  /** Hộp "⚠️ Sai lầm thường gặp" */
  warning?: string;
  diagram?: XqDiagram;
}

export type XqLessonCategory = 'nhap-mon' | 'chien-thuat' | 'chien-luoc' | 'tan-cuoc';

export interface XqLesson {
  id: string;
  category: XqLessonCategory;
  title: string;
  subtitle: string;
  /** Độ khó 1..5 */
  level: 1 | 2 | 3 | 4 | 5;
  icon: string;
  minutes: number;
  intro: string;
  sections: XqLessonSection[];
  keyTakeaways: string[];
}

export interface XqOpeningVariation {
  name: string;
  /** Toàn bộ nước đi tính từ đầu ván */
  moves: string;
  comment: string;
}

export interface XqOpeningTrap {
  name: string;
  /** Toàn bộ nước đi tính từ đầu ván */
  moves: string;
  explanation: string;
}

/** Nhóm khai cuộc: Pháo đầu (Trung pháo) và các cách phòng thủ; Tiên nhân chỉ lộ; Phi tượng; các khai cuộc khác */
export type XqOpeningFamily = 'trung-phao' | 'thuan-nghich' | 'tien-nhan' | 'phi-tuong' | 'khac';

export interface XqOpening {
  id: string;
  name: string;
  /** Tên chữ Hán, ví dụ "中炮对屏风马" */
  nameHan: string;
  family: XqOpeningFamily;
  /** Khai cuộc này là vũ khí của bên nào */
  forSide: XqSide;
  difficulty: 1 | 2 | 3 | 4 | 5;
  /** Diễn biến chính, ví dụ "1. P2-5 M8.7 2. M2.3 X9-8" */
  moves: string;
  /** Lời bình cho từng nửa nước của `moves` (chỉ số 0 = nước 1 của Đỏ). Có thể để "" */
  moveNotes: string[];
  summary: string;
  ideasRed: string[];
  ideasBlack: string[];
  /** Kế hoạch trung cuộc điển hình sau khai cuộc */
  typicalPlans: string[];
  variations: XqOpeningVariation[];
  traps: XqOpeningTrap[];
  famousPlayers: string[];
}

export const XQ_GAME_TAGS = [
  'Tấn công Tướng',
  'Thí quân',
  'Chiến thuật',
  'Chiến lược',
  'Tàn cuộc',
  'Phòng thủ',
  'Khai cuộc',
  'Giải vô địch',
  'Cổ phổ',
  'Kỳ thủ Việt Nam',
  'Cờ nữ',
  'Ván ngắn',
] as const;
export type XqGameTag = (typeof XQ_GAME_TAGS)[number];

export interface XqGame {
  id: string;
  title: string;
  red: string;
  black: string;
  event: string;
  year: number;
  /** "1-0" = Đỏ thắng, "0-1" = Đen thắng */
  result: '1-0' | '0-1' | '1/2-1/2';
  opening: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  /** Bối cảnh lịch sử */
  context: string;
  summary: string;
  moves: string;
  /** Lời bình theo nước: "12" = nước 12 của Đỏ, "12..." = nước 12 của Đen */
  annotations: Record<string, string>;
  /** Các khoảnh khắc then chốt, cùng định dạng khóa như annotations */
  keyMoments: string[];
  lessons: string[];
  orientation?: XqSide;
  tags?: XqGameTag[];
  /** Đường dẫn nguồn đã dùng để đối chiếu biên bản */
  source?: string;
}

export type XqPuzzleLevel = 1 | 2 | 3 | 4 | 5 | 6;

export const XQ_PUZZLE_THEMES = [
  'Chiếu bí',
  'Khốn bí',
  'Song xe',
  'Pháo trùng',
  'Mã hậu pháo',
  'Xe Pháo phối hợp',
  'Xe Mã phối hợp',
  'Mã Pháo phối hợp',
  'Lộ mặt tướng',
  'Thí quân',
  'Bắt đôi',
  'Ghim',
  'Chiếu liên tục',
  'Nước yên lặng',
  'Tàn cuộc',
  'Ván kinh điển',
  'Cổ phổ',
] as const;
export type XqPuzzleTheme = (typeof XQ_PUZZLE_THEMES)[number];

/** Một bài cờ thế: người giải đi các nước của bên đến lượt, máy đi các nước đáp của đối phương. */
export interface XqPuzzle {
  id: string;
  level: XqPuzzleLevel;
  title: string;
  fen: string;
  /**
   * Lời giải: nước của người giải và nước đáp của đối phương xen kẽ, bắt đầu và kết thúc bằng nước của người giải.
   * Bài "mate" được kiểm chứng bằng bộ giải chính xác: mỗi nước của người giải là nước DUY NHẤT thắng đúng hạn
   * (riêng nước cuối, mọi nước thắng ngay đều được chấp nhận); nước đáp phải là cách chống đỡ dai dẳng nhất.
   */
  solution: string;
  /** 'mate' = thắng (chiếu bí/khốn bí) sau (số nước của người giải); 'win' = thắng quân/thế cờ quyết định */
  goal: 'mate' | 'win';
  themes: XqPuzzleTheme[];
  /** Gợi ý bước 1: hướng suy nghĩ, không lộ nước đi */
  hint: string;
  /** Lời giải thích sau khi giải xong */
  explanation: string;
  /** Lời bình cho từng nước của lời giải (chỉ số 0 = nước đầu tiên), có thể để "" */
  notes?: string[];
  /** Xuất xứ: ván đấu, cổ phổ hoặc "Sáng tác cho Kỳ Đạo" */
  source?: string;
  /** id ván trong thư viện ván kinh điển (nếu bài trích từ ván đó) */
  gameId?: string;
}
