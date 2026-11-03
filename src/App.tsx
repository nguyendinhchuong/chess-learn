import { lazy, ReactNode, Suspense, useEffect } from 'react';
import { BookOpenText, House, Moon, Palette, PuzzlePiece, Robot, Scroll, SpeakerHigh, SpeakerSlash, Strategy, Sun, Trophy } from '@phosphor-icons/react';
import { useRoute, href } from './lib/router';
import { useRevealOnScroll } from './lib/reveal';
import { useStored, save, DEFAULT_SETTINGS, Settings } from './lib/storage';
import { PIECE_SVG } from './assets/pieces';
import { Library } from './pages/Library';
import { LessonPage } from './pages/LessonPage';
import { Openings, OpeningPage } from './pages/Openings';
import { Games, GamePage } from './pages/Games';
import { Play } from './pages/Play';
import { Puzzles, PuzzlePage } from './pages/Puzzles';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LandingNotFound, LandingSkeleton, WelcomeSkeleton } from './landing/Skeleton';

// phần cờ tướng và hai trang giới thiệu được tải riêng khi cần
const XqRoutes = lazy(() => import('./xiangqi/XqRoutes'));
const Welcome = lazy(() => import('./landing/Welcome'));
const ChessLanding = lazy(() => import('./landing/ChessLanding'));
const XqLanding = lazy(() => import('./landing/XqLanding'));
const XQ = '/co-tuong';

type Game = 'chess' | 'xq';

const ic = { size: 16, weight: 'bold' as const };
const NAV: Record<Game, [string, string, ReactNode][]> = {
  chess: [
    ['', 'Trang chủ', <House {...ic} />],
    ['hoc', 'Bài học', <BookOpenText {...ic} />],
    ['khai-cuoc', 'Khai cuộc', <Strategy {...ic} />],
    ['van-co', 'Ván kinh điển', <Trophy {...ic} />],
    ['co-the', 'Cờ thế', <PuzzlePiece {...ic} />],
    ['luyen-tap', 'Luyện tập', <Robot {...ic} />],
  ],
  xq: [
    ['', 'Trang chủ', <House {...ic} />],
    ['hoc', 'Bài học', <BookOpenText {...ic} />],
    ['khai-cuoc', 'Khai cuộc', <Scroll {...ic} />],
    ['van-co', 'Ván kinh điển', <Trophy {...ic} />],
    ['co-the', 'Cờ thế', <PuzzlePiece {...ic} />],
    ['luyen-tap', 'Luyện tập', <Robot {...ic} />],
  ],
};

const BASE: Record<Game, string> = { chess: '', xq: XQ };
/** Các mục trong khung ứng dụng; địa chỉ khác (trừ trang chọn môn và trang giới thiệu) là trang không tìm thấy */
const SECTIONS = ['hoc', 'khai-cuoc', 'van-co', 'co-the', 'luyen-tap'];
/** Trang giới thiệu của từng môn là trang chủ: mục "Trang chủ" và logo trên thanh điều hướng dẫn về đây */
const LANDING: Record<Game, string> = { chess: '/gioi-thieu/co-vua', xq: '/gioi-thieu/co-tuong' };

function chessPage(section: string, id: string | undefined, query: URLSearchParams) {
  switch (section) {
    case 'hoc':
      return id ? <LessonPage key={id} id={id} /> : <Library category={query.get('muc') ?? undefined} />;
    case 'khai-cuoc':
      return id ? <OpeningPage key={id} id={id} /> : <Openings />;
    case 'van-co':
      return id ? <GamePage key={id} id={id} /> : <Games />;
    case 'co-the':
      return id ? <PuzzlePage key={id} id={id} /> : <Puzzles level={query.get('cap') ?? undefined} />;
    case 'luyen-tap':
      return <Play query={query} />;
    default:
      return null;
  }
}

export function App() {
  const route = useRoute();
  const [settings, setSettings] = useStored<Settings>('settings', DEFAULT_SETTINGS);
  const game: Game = route.path[0] === 'co-tuong' ? 'xq' : 'chess';
  const rest = game === 'xq' || route.path[0] === 'co-vua' ? route.path.slice(1) : route.path;
  const section = rest[0] ?? '';
  const id = rest[1];
  // nằm ngoài khung ứng dụng: trang chọn môn (#/), trang giới thiệu (#/gioi-thieu/…, cũng là trang chủ
  // #/co-vua và #/co-tuong) và trang không tìm thấy
  const intro =
    route.path.length === 0
      ? 'welcome'
      : route.path[0] === 'gioi-thieu'
        ? (route.path[1] ?? '')
        : !section
          ? game === 'xq'
            ? 'co-tuong'
            : 'co-vua'
          : SECTIONS.includes(section)
            ? null
            : 'khong-co';

  useEffect(() => {
    document.documentElement.dataset.theme = settings.theme;
    document.documentElement.dataset.board = settings.boardTheme;
    document.documentElement.dataset.xqpieces = settings.xqPieces ?? 'han';
  }, [settings.theme, settings.boardTheme, settings.xqPieces]);

  // bản giao diện mới lấy giao diện tối của trang giới thiệu làm mặc định (đổi một lần, sau đó tôn trọng lựa chọn)
  useEffect(() => {
    if ((settings.themeVersion ?? 1) < 2) setSettings({ ...settings, theme: 'dark', themeVersion: 2 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useRevealOnScroll('.main', intro === null);

  useEffect(() => {
    if (intro !== null) return;
    save('last-game', game);
    document.title = game === 'xq' ? 'Kỳ Đạo – Học cờ tướng' : 'Kỳ Đạo – Học cờ vua';
  }, [game, intro]);

  if (intro !== null) {
    const landing =
      intro === 'welcome' ? (
        <Suspense fallback={<WelcomeSkeleton />}>
          <Welcome />
        </Suspense>
      ) : intro === 'co-vua' ? (
        <Suspense fallback={<LandingSkeleton kind="chess" />}>
          <ChessLanding />
        </Suspense>
      ) : intro === 'co-tuong' ? (
        <Suspense fallback={<LandingSkeleton kind="xq" />}>
          <XqLanding />
        </Suspense>
      ) : (
        <LandingNotFound />
      );
    return <ErrorBoundary key={route.path.join('/')}>{landing}</ErrorBoundary>;
  }

  const page =
    game === 'xq' ? (
      <Suspense fallback={<div className="empty-state">Đang bày quân cờ tướng…</div>}>
        <XqRoutes section={section} id={id} query={route.query} />
      </Suspense>
    ) : (
      chessPage(section, id, route.query)
    );
  const boards: Settings['boardTheme'][] = ['wood', 'green', 'blue'];
  /** Chuyển môn cờ: giữ nguyên mục đang xem (bài học, khai cuộc…), về trang danh sách của mục đó */
  const switchTo = (g: Game) => BASE[g] + '/' + section;

  return (
    <div className={'app' + (game === 'xq' ? ' xq-mode' : '')}>
      <header className="topbar">
        <div className="topbar-inner">
          <a className="logo" href={href(LANDING[game])}>
            <span className="logo-mark">{game === 'xq' ? <span className="xq-logo">帥</span> : <img src={PIECE_SVG.wn} alt="" />}</span>
            <span>
              Kỳ Đạo
              <small>{game === 'xq' ? 'Học cờ tướng như đại kiện tướng' : 'Học cờ vua như kiện tướng'}</small>
            </span>
          </a>
          <nav className="game-switch" aria-label="Chọn môn cờ">
            <a href={href(switchTo('chess'))} className={game === 'chess' ? 'active' : ''} title="Cờ vua">
              <span className="gs-ic">
                <img src={PIECE_SVG.wn} alt="" />
              </span>
              <span className="gs-label">Cờ vua</span>
            </a>
            <a href={href(switchTo('xq'))} className={game === 'xq' ? 'active' : ''} title="Cờ tướng">
              <span className="gs-ic xq">帥</span>
              <span className="gs-label">Cờ tướng</span>
            </a>
          </nav>
          <nav className="nav">
            {NAV[game].map(([p, label, icon]) => (
              <a key={p} href={href(p ? BASE[game] + '/' + p : LANDING[game])} className={p && section === p ? 'active' : ''}>
                <span aria-hidden className="nav-ic">
                  {icon}
                </span>
                {label}
              </a>
            ))}
          </nav>
          <div className="top-actions">
            {game === 'xq' && (
              <button
                className="icon-btn"
                title={settings.xqPieces === 'viet' ? 'Quân cờ chữ Hán' : 'Quân cờ chữ Việt (Xe, Pháo, Mã…)'}
                onClick={() => setSettings({ ...settings, xqPieces: settings.xqPieces === 'viet' ? 'han' : 'viet' })}
              >
                {settings.xqPieces === 'viet' ? '字' : 'Aa'}
              </button>
            )}
            <button
              className="icon-btn"
              title="Đổi màu bàn cờ"
              aria-label="Đổi màu bàn cờ"
              onClick={() => setSettings({ ...settings, boardTheme: boards[(boards.indexOf(settings.boardTheme) + 1) % boards.length] })}
            >
              <Palette size={18} />
            </button>
            <button
              className="icon-btn"
              title={settings.sound ? 'Tắt âm thanh' : 'Bật âm thanh'}
              aria-label={settings.sound ? 'Tắt âm thanh' : 'Bật âm thanh'}
              onClick={() => setSettings({ ...settings, sound: !settings.sound })}
            >
              {settings.sound ? <SpeakerHigh size={18} /> : <SpeakerSlash size={18} />}
            </button>
            <button
              className="icon-btn"
              title={settings.theme === 'dark' ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối'}
              aria-label={settings.theme === 'dark' ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối'}
              onClick={() => setSettings({ ...settings, theme: settings.theme === 'dark' ? 'light' : 'dark' })}
            >
              {settings.theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </header>
      <main className="main">
        {/* đổi trang thì xóa trạng thái lỗi cũ */}
        <ErrorBoundary key={route.path.join('/')}>{page}</ErrorBoundary>
      </main>
      <footer className="footer">
        <a href={href('/gioi-thieu/' + (game === 'xq' ? 'co-tuong' : 'co-vua'))}>Giới thiệu Kỳ Đạo</a> · <a href={href('/')}>Chọn môn cờ</a>
        <br />
        {game === 'xq'
          ? 'Kỳ Đạo – ứng dụng học cờ tướng bằng tiếng Việt. Máy đấu, phân tích và gợi ý dùng bộ máy cờ tướng viết riêng (alpha-beta, bảng chuyển vị, tìm kiếm tĩnh, luật chiếu dai); mọi bài cờ thế được bộ giải sát cục chính xác kiểm chứng.'
          : 'Kỳ Đạo – ứng dụng học cờ vua bằng tiếng Việt. Các cấp độ máy dùng bộ máy cờ viết riêng (alpha-beta, bảng chuyển vị, tìm kiếm tĩnh); phân tích và gợi ý dùng Stockfish 18 (GPLv3). Hình quân cờ “cburnett” © Colin M.L. Burnett (GPLv2+).'}
      </footer>
    </div>
  );
}
