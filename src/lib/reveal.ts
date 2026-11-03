// Thẻ ở các trang danh sách (thư viện, ván cờ, cờ thế, chọn máy) hiện dần khi cuộn tới,
// giống trang giới thiệu. Không áp dụng cho khu vực học từng nước, bàn cờ và ván đấu để không làm xê dịch bố cục.
import { useEffect } from 'react';

const TARGETS = '.stat, .lesson-card, .game-card, .puzzle-card, .level-card, .bot-card, .section-title, .cat-banner';
const SKIP = '.stage, .study, .play, .modal-back';

export function useRevealOnScroll(rootSelector: string, enabled: boolean) {
  useEffect(() => {
    const root = enabled ? document.querySelector(rootSelector) : null;
    if (!root || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        let i = 0;
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          // các thẻ vào màn hình cùng lúc hiện lần lượt, cách nhau 60ms
          el.style.transitionDelay = `${Math.min(i++, 6) * 60}ms`;
          el.setAttribute('data-shown', '');
          io.unobserve(el);
          window.setTimeout(() => (el.style.transitionDelay = ''), 1200);
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    const mark = (scope: Element) => {
      const found = scope.matches(TARGETS) ? [scope] : Array.from(scope.querySelectorAll(TARGETS));
      for (const el of found) {
        if (el.hasAttribute('data-shown') || el.closest(SKIP)) continue;
        // thẻ đã đánh dấu từ lần chạy trước (StrictMode chạy effect hai lần) vẫn phải được theo dõi lại
        el.setAttribute('data-reveal', '');
        io.observe(el);
      }
    };
    mark(root);
    // trang tải riêng (cờ tướng) hoặc danh sách lọc lại: đánh dấu cả các thẻ mới xuất hiện
    const mo = new MutationObserver((muts) => {
      for (const m of muts) m.addedNodes.forEach((n) => n instanceof Element && mark(n));
    });
    mo.observe(root, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [rootSelector, enabled]);
}
