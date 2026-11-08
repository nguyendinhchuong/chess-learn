// Phần riêng của từng môn cờ cho trang phòng chơi trực tuyến (bàn cờ, ký hiệu nước đi, âm thanh, cách gọi tên).
// Cờ vua: src/online/chessKit.tsx; cờ tướng: src/xiangqi/components/xqOnlineKit.tsx (tải cùng phần cờ tướng).
import type { ComponentType } from 'react';
import type { EndReason, Side, Variant } from './protocol';

export interface OnlineBoardProps {
  fen: string;
  /** Bên ở phía dưới bàn cờ */
  bottom: Side;
  /** Bên được đi quân (null: không ai) */
  movable: Side | null;
  onMove: (uci: string) => void;
  lastMove: string | null;
}

export interface OnlineMoveListProps {
  sans: string[];
  current: number;
  onSelect: (index: number) => void;
}

export interface OnlineKit {
  variant: Variant;
  /** Đường dẫn gốc của môn cờ: '' hoặc '/co-tuong' */
  base: string;
  /** "cờ vua" / "cờ tướng" */
  title: string;
  sideNames: [string, string];
  SideIcon: ComponentType<{ side: Side }>;
  /** Các thế cờ và ký hiệu nước đi của chuỗi nước (dừng ở nước không hợp lệ đầu tiên) */
  replay(moves: string[]): { fens: string[]; sans: string[] };
  Board: ComponentType<OnlineBoardProps>;
  MoveList: ComponentType<OnlineMoveListProps>;
  moveSound(fenBefore: string, uci: string, san: string): void;
  reasons: Record<EndReason, string>;
}
