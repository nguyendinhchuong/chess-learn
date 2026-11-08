// Toàn bộ phần cờ tướng, tải riêng (code splitting) khi người dùng chuyển sang môn cờ tướng.
import { XqLibrary, XqLessonPage } from './pages/XqLessons';
import { XqOpenings, XqOpeningPage } from './pages/XqOpenings';
import { XqGames, XqGamePage } from './pages/XqGames';
import { XqPuzzles, XqPuzzlePage } from './pages/XqPuzzles';
import { XqPlay } from './pages/XqPlay';
import { OnlineLobby, OnlineRoom } from '../online/OnlinePages';
import { XQ_KIT } from './components/xqOnlineKit';

export default function XqRoutes({ section, id, query }: { section: string; id?: string; query: URLSearchParams }) {
  switch (section) {
    case 'hoc':
      return id ? <XqLessonPage key={id} id={id} /> : <XqLibrary category={query.get('muc') ?? undefined} />;
    case 'khai-cuoc':
      return id ? <XqOpeningPage key={id} id={id} /> : <XqOpenings />;
    case 'van-co':
      return id ? <XqGamePage key={id} id={id} /> : <XqGames />;
    case 'co-the':
      return id ? <XqPuzzlePage key={id} id={id} /> : <XqPuzzles level={query.get('cap') ?? undefined} />;
    case 'luyen-tap':
      return <XqPlay query={query} />;
    case 'phong':
      return id ? <OnlineRoom kit={XQ_KIT} code={id} /> : <OnlineLobby kit={XQ_KIT} />;
    default:
      return null;
  }
}
