// Trang phân tích ván cờ vua, tải riêng (code splitting) khi người dùng mở #/phong/phan-tich.
import { GameAnalysis } from './AnalysisPage';
import { CHESS_ANALYSIS } from './chessAnalysisKit';

export default function ChessAnalysisRoute() {
  return <GameAnalysis kit={CHESS_ANALYSIS} />;
}
