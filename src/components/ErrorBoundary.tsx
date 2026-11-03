import { Component, ReactNode } from 'react';

interface State {
  error: Error | null;
}

/** Bắt lỗi khi hiển thị để trang không bị trắng xóa; hiện thông báo và cách khôi phục. */
export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error) {
    console.error('Lỗi hiển thị trang:', error);
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div className="card error-boundary" role="alert" style={{ maxWidth: 560, margin: '40px auto', textAlign: 'center' }}>
        <div style={{ fontSize: '2.4rem' }}>🦉</div>
        <h2>Ối, trang này gặp sự cố</h2>
        <p className="muted">Thầy Cú đã ghi lại lỗi. Bạn có thể thử tải lại trang hoặc quay về trang chủ.</p>
        <p className="small muted" style={{ fontFamily: 'monospace' }}>
          {this.state.error.message}
        </p>
        <div className="btn-row" style={{ justifyContent: 'center' }}>
          <button className="btn primary" onClick={() => window.location.reload()}>
            ↻ Tải lại trang
          </button>
          <button
            className="btn"
            onClick={() => {
              window.location.hash = '#/';
              this.setState({ error: null });
            }}
          >
            🏠 Về trang chủ
          </button>
        </div>
      </div>
    );
  }
}
