// Khung chờ khi trang giới thiệu đang tải (cùng bố cục với phần mở đầu thật) và trang không tìm thấy.
import { useEffect } from 'react';
import { ArrowLeft } from '@phosphor-icons/react';
import { href } from '../lib/router';

export function LandingSkeleton({ kind }: { kind: 'chess' | 'xq' }) {
  return (
    <div className={'ld-root ld-' + kind + ' ld-skeleton'} aria-busy="true" aria-label="Đang tải trang giới thiệu">
      <div className="ld-nav-wrap">
        <div className="ld-nav ld-sk-nav">
          <span className="ld-sk ld-sk-pill" />
        </div>
      </div>
      <div className="ld-hero">
        <div className="ld-hero-copy">
          <span className="ld-sk ld-sk-line short" />
          <span className="ld-sk ld-sk-title" />
          <span className="ld-sk ld-sk-title two" />
          <span className="ld-sk ld-sk-line" />
          <span className="ld-sk ld-sk-line" />
          <span className="ld-sk ld-sk-btn" />
        </div>
        <div className="ld-hero-visual">
          <span className="ld-sk ld-sk-board" />
        </div>
      </div>
    </div>
  );
}

export function WelcomeSkeleton() {
  return (
    <div className="ld-root ld-welcome ld-skeleton" aria-busy="true" aria-label="Đang tải trang chọn môn cờ">
      <main className="ld-welcome-main">
        <span className="ld-sk ld-sk-title" style={{ maxWidth: 520 }} />
        <span className="ld-sk ld-sk-line" />
        <div className="ld-choices">
          <span className="ld-sk ld-sk-card" />
          <span className="ld-sk ld-sk-card" />
        </div>
      </main>
    </div>
  );
}

export function LandingNotFound() {
  useEffect(() => {
    document.title = 'Kỳ Đạo · Không tìm thấy trang';
  }, []);
  return (
    <div className="ld-root ld-chess ld-404">
      <main className="ld-404-main" id="ld-main">
        <span className="ld-404-code" aria-hidden="true">
          404
        </span>
        <h1 className="ld-h2">Nước đi này không có trên bàn cờ</h1>
        <p className="ld-lead">Trang bạn tìm không tồn tại hoặc đã đổi địa chỉ. Hãy chọn lại môn cờ để tiếp tục.</p>
        <a className="ld-btn primary" href={href('/')}>
          <ArrowLeft size={18} weight="bold" aria-hidden="true" />
          Về trang chọn môn cờ
        </a>
      </main>
    </div>
  );
}
