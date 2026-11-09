// Google Tag Manager (Google Analytics cấu hình bên trong vùng chứa GTM). Chỉ chạy ở bản build production
// có VITE_GTM_ID (xem .env.production), nên `npm run dev` và kiểm thử e2e không gửi dữ liệu.
const GTM_ID = import.meta.env.PROD ? (import.meta.env.VITE_GTM_ID as string | undefined) : undefined;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

function push(data: Record<string, unknown>) {
  (window.dataLayer ??= []).push(data);
}

export function initAnalytics() {
  if (!GTM_ID) return;
  push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`;
  document.head.appendChild(s);
}

// Các trang nằm sau dấu # (#/co-vua/hoc), phần mà báo cáo "Đường dẫn trang" của Google Analytics không tính,
// nên mọi trang sẽ thành "/". Vì vậy mỗi lần đổi trang gửi sự kiện virtual_page_view kèm đường dẫn ảo
// /co-vua/hoc; thẻ GA4 trong GTM đọc page_location / page_title từ dataLayer.
export function trackPageView() {
  if (!GTM_ID) return;
  const route = location.hash.replace(/^#\/?/, '').split('?')[0];
  const base = location.origin + location.pathname.replace(/\/(index\.html)?$/, '');
  push({
    event: 'virtual_page_view',
    page_location: `${base}/${route}`,
    page_path: '/' + route,
    page_title: document.title,
  });
}
