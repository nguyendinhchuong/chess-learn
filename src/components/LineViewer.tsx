import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CaretLeft, CaretRight, SkipBack, SkipForward, X } from '@phosphor-icons/react';
import { playLine, START_FEN, PlayedLine, Position } from '../engine/board';
import { explainPurpose, isCaptureAt } from '../engine/purpose';
import type { BoardArrow } from './Board';

export function parseArrows(list?: string[]): BoardArrow[] {
  return (list ?? []).map((a) => {
    const [mv, color] = a.split(':');
    return { from: mv.slice(0, 2), to: mv.slice(2, 4), color: (color as BoardArrow['color']) ?? 'green' };
  });
}

export function parseHighlights(list?: string[]): Record<string, string> {
  const res: Record<string, string> = {};
  for (const h of list ?? []) {
    const [sq, color] = h.split(':');
    res[sq] = color ?? 'yellow';
  }
  return res;
}

export function safeLine(moves: string | undefined, fen: string = START_FEN): PlayedLine {
  try {
    return playLine(moves ?? '', fen);
  } catch {
    return { fens: [fen], sans: [], ucis: [] };
  }
}

/** Phím ← → để bước qua các nước (Home/End được giữ nguyên để cuộn trang) */
export function useArrowKeys(ply: number, count: number, setPly: (p: number) => void) {
  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')) return;
      if (e.key === 'ArrowRight') setPly(Math.min(count, ply + 1));
      else if (e.key === 'ArrowLeft') setPly(Math.max(0, ply - 1));
      else return;
      e.preventDefault();
    };
    window.addEventListener('keydown', on);
    return () => window.removeEventListener('keydown', on);
  }, [ply, count, setPly]);
}

/**
 * Quản lý việc bước qua một chuỗi nước đi (◀ ▶, phím mũi tên).
 * Vị trí luôn được kẹp trong [0, count] ngay khi render: khi chuỗi nước đi đổi sang chuỗi ngắn hơn
 * (ví dụ bàn cờ chuyển sang sơ đồ của phần khác), không bao giờ đọc vượt quá cuối chuỗi.
 */
export function useStepper(count: number, initial = 0, resetKey?: unknown) {
  const [state, setState] = useState({ key: resetKey, ply: initial });
  let raw = state.ply;
  if (state.key !== resetKey) {
    // đổi sang chuỗi nước khác: về vị trí ban đầu ngay trong lần render này
    raw = initial;
    setState({ key: resetKey, ply: initial });
  }
  const ply = Math.max(0, Math.min(count, raw));
  const setPly = useCallback((p: number) => setState((s) => ({ ...s, ply: Math.max(0, Math.min(count, p)) })), [count]);
  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')) return;
      if (e.key === 'ArrowRight') setState((s) => ({ ...s, ply: Math.min(count, Math.min(count, s.ply) + 1) }));
      else if (e.key === 'ArrowLeft') setState((s) => ({ ...s, ply: Math.max(0, Math.min(count, s.ply) - 1) }));
      else return;
      e.preventDefault();
    };
    window.addEventListener('keydown', on);
    return () => window.removeEventListener('keydown', on);
  }, [count]);
  return { ply, setPly };
}

export function StepControls({ ply, count, setPly, extra }: { ply: number; count: number; setPly: (p: number) => void; extra?: React.ReactNode }) {
  return (
    <div className="step-controls">
      <button className="btn small" onClick={() => setPly(0)} disabled={ply === 0} title="Về đầu">
        <SkipBack size={16} weight="fill" aria-hidden="true" />
      </button>
      <button className="btn small" onClick={() => setPly(ply - 1)} disabled={ply === 0} title="Lùi (←)">
        <CaretLeft size={16} weight="fill" aria-hidden="true" />
      </button>
      <span className="step-counter">{count ? `Nước ${ply}/${count}` : 'Thế cờ'}</span>
      <button className="btn small primary" onClick={() => setPly(ply + 1)} disabled={ply >= count} title="Tiến (→)">
        <CaretRight size={16} weight="fill" aria-hidden="true" />
      </button>
      <button className="btn small" onClick={() => setPly(count)} disabled={ply >= count} title="Đến cuối">
        <SkipForward size={16} weight="fill" aria-hidden="true" />
      </button>
      {extra}
    </div>
  );
}

export function useLine(moves: string | undefined, fen?: string) {
  return useMemo(() => safeLine(moves, fen ?? START_FEN), [moves, fen]);
}

/** Nhãn nước đi theo số thứ tự, ví dụ "12." hoặc "12..." */
export function moveLabel(startFen: string, idx: number): string {
  const parts = startFen.split(' ');
  const blackFirst = parts[1] === 'b';
  const first = Number(parts[5] ?? 1) || 1;
  const ply = idx + (blackFirst ? 1 : 0);
  const no = first + Math.floor(ply / 2);
  return ply % 2 === 0 ? `${no}.` : `${no}...`;
}

/**
 * Khung "lời giảng từng nước" ngay dưới nút ◀ ▶. Có chiều cao cố định (nút ▶ không bị xô lệch khi lời giảng
 * dài ngắn khác nhau) và luôn được đưa vào tầm nhìn sau mỗi lần bước nước.
 */
export function GuideBox({ stepKey, children, accent }: { stepKey: unknown; children: ReactNode; accent?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.scrollTop = 0;
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    const r = el.getBoundingClientRect();
    // trong hộp thoại bàn cờ (BoardSheet) thì cuộn hộp thoại, không cuộn trang phía sau
    const sheet = el.closest<HTMLElement>('[data-sheet]');
    const area = sheet?.getBoundingClientRect();
    const top = area?.top ?? document.querySelector('.topbar')?.getBoundingClientRect().bottom ?? 0;
    const bottom = area?.bottom ?? window.innerHeight;
    // Tự tính khoảng cuộn (thay vì scrollIntoView, vốn có thể dừng sát/lố mép 1–2px trên điện thoại)
    // để khung lời giảng nằm trọn trong màn hình, cách mép dưới 12px và không bị thanh tiêu đề che.
    const gap = 12;
    let dy = 0;
    if (r.bottom > bottom - gap) dy = r.bottom - (bottom - gap);
    if (r.top - dy < top + gap) dy = r.top - (top + gap);
    if (Math.abs(dy) >= 1) (sheet ?? window).scrollBy({ top: Math.ceil(dy), behavior: 'smooth' });
  }, [stepKey]);
  return (
    <div ref={ref} className={'note-box guide' + (accent ? ' accent' : '')} aria-live="polite" data-testid="guide">
      <div key={String(stepKey)} className="guide-body">
        {children}
      </div>
    </div>
  );
}

/**
 * Bàn cờ của trang bài học trên màn hình hẹp: hộp thoại trượt lên từ mép dưới, mở ngay tại đoạn đang đọc.
 * Đóng lại (✕, chạm vùng tối, Esc) là về đúng chỗ cũ – không phải cuộn lên đầu trang xem bàn cờ rồi cuộn xuống lại.
 */
export function BoardSheet({ open, onClose, no, title, children }: { open: boolean; onClose: () => void; no: number; title: string; children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const close = useRef(onClose);
  close.current = onClose;

  useEffect(() => {
    if (!open || !root.current) return;
    // nút "Xem trên bàn cờ" vừa bấm: đóng hộp thoại thì trả tiêu điểm về đó
    const back = document.activeElement as HTMLElement | null;
    // trang phía sau đứng yên, không nhận chạm hay tiêu điểm (Tab không lọt ra sau hộp thoại)
    document.documentElement.classList.add('sheet-lock');
    const inerted: HTMLElement[] = [];
    for (let n: HTMLElement | null = root.current; n && n !== document.body; n = n.parentElement) {
      for (const s of Array.from(n.parentElement?.children ?? [])) {
        if (s !== n && s instanceof HTMLElement && !s.inert) {
          s.inert = true;
          inerted.push(s);
        }
      }
    }
    panel.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close.current();
    document.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.classList.remove('sheet-lock');
      inerted.forEach((s) => (s.inert = false));
      document.removeEventListener('keydown', onKey);
      back?.focus({ preventScroll: true });
    };
  }, [open]);

  // gắn thẳng vào body: hiệu ứng hiện trang (translate) của khung ứng dụng không làm lệch vị trí cố định của hộp thoại
  return createPortal(
    <div ref={root} className={'board-col board-sheet' + (open ? ' open' : '')} aria-hidden={!open} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div ref={panel} className="sheet-panel" role="dialog" aria-modal="true" aria-labelledby="sheet-title" tabIndex={-1} data-sheet>
        <div className="sheet-head">
          <span className="sec-no">{no}</span>
          <h2 id="sheet-title">{title}</h2>
          <button type="button" className="icon-btn" aria-label="Đóng bàn cờ" onClick={onClose}>
            <X size={16} weight="bold" aria-hidden="true" />
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body,
  );
}

/** Lời giải thích mục đích (tự động, dựa trên thế cờ) cho nước vừa đi ở bước `ply` của chuỗi */
export function useMovePurpose(line: PlayedLine, ply: number): string {
  return useMemo(() => {
    if (ply <= 0 || ply > line.ucis.length) return '';
    try {
      const pos = new Position(line.fens[ply - 1]);
      const m = pos.moveFromUci(line.ucis[ply - 1]);
      if (!m) return '';
      const prevCapture = ply >= 2 && isCaptureAt(line.fens[ply - 2], line.ucis[ply - 2]);
      return explainPurpose(pos, m, { prevUci: line.ucis[ply - 2], prevCapture });
    } catch {
      return '';
    }
  }, [line, ply]);
}

/** Dòng "mục đích nước đi" hiển thị trong khung lời giảng */
export function PurposeText({ text }: { text: string }) {
  if (!text) return null;
  return (
    <p className="purpose">
      <span className="purpose-label">🎯 Mục đích:</span> {text}
    </p>
  );
}
