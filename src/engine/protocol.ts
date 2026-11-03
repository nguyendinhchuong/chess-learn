// Giao thức trao đổi giữa giao diện và Web Worker của bộ máy.

export interface AnalysisLine {
  uci: string;
  san: string;
  /** Điểm theo góc nhìn bên đến lượt (centipawn) */
  score: number;
  /** Điểm theo góc nhìn Trắng */
  scoreWhite: number;
  /** Chiếu hết sau N nước (theo góc nhìn bên đến lượt), 0 nếu không */
  mate: number;
  pv: string[];
  pvSan: string[];
}

export interface ThreatInfo {
  uci: string;
  san: string;
  pv: string[];
  pvSan: string[];
  /** Lợi thế đối thủ có được nếu ta "bỏ lượt" (centipawn) */
  gain: number;
  mate: number;
}

export interface AnalysisResult {
  fen: string;
  depth: number;
  nodes: number;
  timeMs: number;
  lines: AnalysisLine[];
  threat?: ThreatInfo;
  /** Bộ máy đã phân tích: Stockfish, hoặc bộ máy JavaScript khi không tải được Stockfish */
  engine?: 'stockfish' | 'js';
}

export interface BotMoveResult {
  uci: string;
  san: string;
  score: number;
  depth: number;
  random?: boolean;
}

export type WorkerRequest =
  | { id: number; type: 'analyze'; fen: string; moves: string[]; multiPV: number; timeMs: number; maxDepth?: number; threat?: boolean; searchMoves?: string[] }
  | { id: number; type: 'bot'; fen: string; moves: string[]; level: number }
  | { id: number; type: 'reset' };

export type WorkerResponse = { id: number; ok: true; result: any } | { id: number; ok: false; error: string };
