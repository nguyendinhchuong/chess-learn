// Kiểu dữ liệu cho nội dung bài học, khai cuộc và ván cờ kinh điển.
//
// Quy ước chung:
// - Nước đi viết bằng SAN tiếng Anh chuẩn quốc tế (N = Mã, B = Tượng, R = Xe, Q = Hậu, K = Vua), có thể kèm số thứ tự: "1.e4 e5 2.Nf3 Nc6".
// - Mũi tên: "e2e4" (mặc định xanh lá) hoặc "e2e4:red" | ":blue" | ":yellow" | ":orange".
// - Tô ô: "e4" (mặc định vàng) hoặc "e4:red" | ":green" | ":blue".
// - Văn bản hỗ trợ **in đậm**, dòng bắt đầu bằng "- " thành danh sách, đoạn cách nhau bằng dòng trống.

export type ArrowSpec = string;
export type HighlightSpec = string;

export interface Diagram {
  /** FEN vị trí. Bỏ trống = vị trí ban đầu. */
  fen?: string;
  /** Chuỗi nước đi (SAN) từ vị trí `fen`, người học bấm ◀ ▶ để xem từng nước. */
  moves?: string;
  /** Lời bình sau từng nước của `moves` (chỉ số 0 = sau nước đầu tiên). Có thể để "" */
  notes?: string[];
  arrows?: ArrowSpec[];
  highlights?: HighlightSpec[];
  orientation?: 'white' | 'black';
  /** Chú thích ngắn dưới bàn cờ */
  caption?: string;
}

export interface LessonSection {
  heading: string;
  body: string;
  /** Hộp "💡 Mẹo của thầy" */
  tip?: string;
  /** Hộp "⚠️ Sai lầm thường gặp" */
  warning?: string;
  diagram?: Diagram;
}

export type LessonCategory = 'nhap-mon' | 'chien-thuat' | 'chien-luoc' | 'tan-cuoc';

export interface Lesson {
  id: string;
  category: LessonCategory;
  title: string;
  subtitle: string;
  /** Độ khó 1..5 */
  level: 1 | 2 | 3 | 4 | 5;
  icon: string;
  minutes: number;
  intro: string;
  sections: LessonSection[];
  keyTakeaways: string[];
}

export interface OpeningVariation {
  name: string;
  /** Toàn bộ nước đi tính từ đầu ván */
  moves: string;
  comment: string;
}

export interface OpeningTrap {
  name: string;
  /** Toàn bộ nước đi tính từ đầu ván */
  moves: string;
  explanation: string;
}

export interface Opening {
  id: string;
  name: string;
  nameEn: string;
  eco: string;
  family: 'e4' | 'd4' | 'flank';
  /** Khai cuộc này phù hợp cho bên nào */
  forSide: 'white' | 'black';
  difficulty: 1 | 2 | 3 | 4 | 5;
  /** Diễn biến chính, ví dụ "1.e4 e5 2.Nf3 Nc6 3.Bc4" */
  moves: string;
  /** Lời bình cho từng nửa nước của `moves` (chỉ số 0 = nước 1 của Trắng). Có thể để "" */
  moveNotes: string[];
  summary: string;
  ideasWhite: string[];
  ideasBlack: string[];
  /** Cấu trúc tốt / kế hoạch điển hình sau khai cuộc */
  typicalPlans: string[];
  variations: OpeningVariation[];
  traps: OpeningTrap[];
  famousPlayers: string[];
}

export interface ClassicGame {
  id: string;
  title: string;
  white: string;
  black: string;
  event: string;
  year: number;
  result: '1-0' | '0-1' | '1/2-1/2';
  opening: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  /** Bối cảnh lịch sử */
  context: string;
  summary: string;
  moves: string;
  /** Lời bình theo nước: "12" = nước 12 của Trắng, "12..." = nước 12 của Đen */
  annotations: Record<string, string>;
  /** Các khoảnh khắc then chốt, cùng định dạng khóa như annotations */
  keyMoments: string[];
  lessons: string[];
  orientation?: 'white' | 'black';
  /** Chủ đề của ván (chọn trong GAME_TAGS) để lọc trong thư viện */
  tags?: GameTag[];
  /** Đường dẫn nguồn đã dùng để đối chiếu biên bản (chessgames.com, Wikipedia, lichess…) */
  source?: string;
}

export const GAME_TAGS = [
  'Tấn công Vua',
  'Thí quân',
  'Chiến thuật',
  'Chiến lược',
  'Tàn cuộc',
  'Phòng thủ',
  'Khai cuộc',
  'Tranh ngôi vô địch',
  'Máy tính',
  'Kỳ thủ Việt Nam',
  'Cờ nữ',
  'Ván ngắn',
] as const;
export type GameTag = (typeof GAME_TAGS)[number];

export type PuzzleLevel = 1 | 2 | 3 | 4 | 5 | 6;

export const PUZZLE_THEMES = [
  'Chiếu hết',
  'Chiếu hết hàng cuối',
  'Chiếu hết ngạt thở',
  'Chĩa đôi',
  'Ghim',
  'Xiên',
  'Tấn công đôi',
  'Thí quân',
  'Phá vỡ phòng tuyến',
  'Dụ quân',
  'Chặn đường',
  'Phong cấp',
  'Nước yên lặng',
  'Tàn cuộc',
  'Ván kinh điển',
  'Bài sáng tác',
] as const;
export type PuzzleTheme = (typeof PUZZLE_THEMES)[number];

/** Một bài cờ thế: người giải đi các nước của bên đến lượt, máy đi các nước đáp của đối phương. */
export interface Puzzle {
  id: string;
  level: PuzzleLevel;
  title: string;
  fen: string;
  /**
   * Lời giải (SAN): nước của người giải và nước đáp của đối phương xen kẽ, bắt đầu và kết thúc bằng nước của người giải.
   * Bài "chiếu hết" được kiểm chứng bằng bộ giải chính xác: mỗi nước của người giải là nước duy nhất chiếu hết đúng hạn
   * (riêng nước cuối, mọi nước chiếu hết đều được chấp nhận); bài "thắng" được kiểm chứng bằng máy.
   */
  solution: string;
  /** 'mate' = chiếu hết sau (số nước của người giải); 'win' = thắng vật chất/thế cờ quyết định */
  goal: 'mate' | 'win';
  themes: PuzzleTheme[];
  /** Gợi ý bước 1: hướng suy nghĩ, không lộ nước đi */
  hint: string;
  /** Lời giải thích sau khi giải xong */
  explanation: string;
  /** Lời bình cho từng nước của lời giải (chỉ số 0 = nước đầu tiên), có thể để "" */
  notes?: string[];
  /** Xuất xứ: ván đấu hoặc tác giả bài sáng tác */
  source?: string;
  /** id ván trong thư viện ván kinh điển (nếu bài trích từ ván đó) */
  gameId?: string;
}
