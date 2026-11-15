// Kiểu dữ liệu dùng chung của phần phân tích ván (cờ vua và cờ tướng).
import type { AnalysisResult } from '../engine/protocol';
import type { MoveClass } from '../engine/coach';
import type { EndReason, Result, Side, Variant } from '../online/protocol';

export type Phase = 'opening' | 'middlegame' | 'endgame';

/** Các dữ kiện của một nước đi mà cả hai môn cờ đều có (src/engine/explain.ts, src/xiangqi/engine/explain.ts) */
export interface CommonFacts {
  san: string;
  uci: string;
  color: Side;
  type: number;
  from: string;
  to: string;
  captured: number;
  check: boolean;
  mate: boolean;
  stalemate: boolean;
  fork: boolean;
  movedHanging: boolean;
  newlyHanging: { sq: string; type: number; defended: boolean }[];
  targets: { sq: string; type: number; defended: boolean }[];
  development: boolean;
}

/** Nhận xét một nước đi – cùng dạng với MoveReview của hai bộ huấn luyện viên */
export interface Review {
  ply: number;
  uci: string;
  san: string;
  color: Side;
  cls: MoveClass;
  winBest: number;
  winPlayed: number;
  drop: number;
  accuracy: number;
  headline: string;
  comments: string[];
  warning?: string;
  best?: { uci: string; san: string; pvSan: string[]; desc: string };
  refutation?: { uci: string; san: string; pvSan: string[]; desc: string };
  facts: CommonFacts;
}

/** Loại đòn của một nước: dùng để gom sai lầm thành bài học */
export type Tactic = 'mate' | 'fork' | 'capture' | 'check' | 'threat' | null;

/** Những gì thật sự xảy ra quanh một nước đi (tính bằng bộ máy cờ, theo các diễn biến chính) */
export interface MoveInsight {
  /** Vật chất mất (điểm, ≥ 0) nếu đối thủ đáp lại tốt nhất – tính cả quân vừa ăn được */
  lost: number;
  /** Vật chất bỏ lỡ (điểm, ≥ 0) so với nước tốt nhất */
  missedGain: number;
  /** Bỏ lỡ chiếu hết sau N nước (0: không) */
  missedMate: number;
  /** Để đối thủ có chiếu hết sau N nước (0: không) */
  allowedMate: number;
  /** Nước tốt nhất là đòn gì (khi không đi nước tốt nhất) */
  bestTactic: Tactic;
  /** Nước đáp tốt nhất của đối thủ là đòn gì */
  refTactic: Tactic;
  /** Vừa ăn quân nhưng rốt cuộc mất nhiều hơn */
  greedy: boolean;
}

export interface Link {
  href: string;
  label: string;
}

/** Một điểm mạnh hoặc một bài học rút ra cho một bên */
export interface Finding {
  id: string;
  icon: string;
  title: string;
  /** Giải thích, có thể dùng **đậm** */
  text: string;
  /** Lời khuyên cụ thể để tiến bộ */
  tip?: string;
  /** Các nước minh họa (chỉ số nửa nước) */
  plies: number[];
  links?: Link[];
  /** Độ quan trọng để sắp xếp */
  weight: number;
}

/** Thói quen khai cuộc riêng của từng môn (nhập thành muộn, Xe xuất chậm…) */
export interface Habit extends Finding {
  side: Side;
}

export interface LessonLinks {
  safety: Link;
  trade: Link;
  tactics: Link;
  puzzles: Link;
  mates: Link;
  threats: Link;
  opening: Link;
  plan: Link;
  convert: Link;
  endgame: Link;
}

export interface ReplayedGame {
  fens: string[];
  sans: string[];
  ucis: string[];
  /** Nước đầu tiên không đọc được (dừng ở đó) */
  error?: { index: number; token: string };
}

/** Phần bộ máy của từng môn cho trang phân tích – không có giao diện nên chạy được trong kiểm thử */
export interface ReviewEngine {
  variant: Variant;
  startFen: string;
  sideNames: [string, string];
  replay(tokens: string[], startFen?: string): ReplayedGame;
  /** Kết thúc ngay trên bàn cờ (không còn nước đi): kết quả và lý do */
  terminal(fen: string): { result: Result; reason: EndReason } | null;
  /** Cơ hội thắng của bên đi trước (Trắng/Đỏ, 0..100) */
  firstWin(a: AnalysisResult | null | undefined): number | null;
  evalText(a: AnalysisResult): string;
  review(fens: string[], ucis: string[], i: number, before: AnalysisResult | null, after: AnalysisResult | null, opening?: string): Review;
  insight(fens: string[], ucis: string[], i: number, review: Review, before: AnalysisResult | null, after: AnalysisResult | null): MoveInsight;
  isBook(fen: string, uci: string): boolean;
  openingAt(fen: string): string | undefined;
  /** Số quân lớn và quân nhẹ còn trên bàn (để chia giai đoạn ván cờ) */
  pieceCount(fen: string): number;
  /** Ngưỡng số quân: ≤ middle thì hết khai cuộc, ≤ end thì vào tàn cuộc */
  phaseLimits: { middle: number; end: number };
  habits(fens: string[], ucis: string[], reviews: Review[]): Habit[];
  links: LessonLinks;
  pieceName(type: number): string;
}
