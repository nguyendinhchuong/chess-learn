// Phần riêng của từng môn cờ cho trang phân tích ván (src/analysis/AnalysisPage.tsx).
// Cờ vua: src/analysis/chessAnalysisKit.tsx; cờ tướng: src/xiangqi/components/xqAnalysisKit.tsx (tải cùng phần cờ tướng).
import type { ComponentType, ReactNode } from 'react';
import type { BoardArrow, SquareBadge } from '../components/Board';
import type { MoveMark } from '../components/common';
import type { AnalysisResult } from '../engine/protocol';
import type { OnlineKit } from '../online/kit';
import type { Side } from '../online/protocol';
import type { SavedGame } from './history';
import type { ReviewEngine } from './types';

export interface AnalysisBoardProps {
  fen: string;
  bottom: Side;
  lastMove: string | null;
  arrows: BoardArrow[];
  badge: SquareBadge | null;
}

export interface AnalysisKit {
  online: OnlineKit;
  engine: ReviewEngine;
  Board: ComponentType<AnalysisBoardProps>;
  /** Hiển thị một nước đi (hình quân thay cho chữ cái) */
  san(san: string, side: Side): ReactNode;
  MoveList: ComponentType<{ sans: string[]; startFen?: string; current: number; onSelect: (i: number) => void; marks?: (MoveMark | null)[] }>;
  analyze(startFen: string, moves: string[], timeMs: number): Promise<AnalysisResult | null>;
  cancel(): void;
  /** "Vua" / "Tướng" */
  kingName: string;
  /** Một ván kinh điển trong thư viện để thử tính năng khi chưa có ván nào */
  sample(): SavedGame | null;
}
