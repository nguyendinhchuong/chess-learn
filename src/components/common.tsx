import { Fragment, ReactNode, useEffect, useRef } from 'react';
import { PIECE_SVG } from '../assets/pieces';

/** Hiển thị nước đi SAN với hình quân thay cho chữ cái */
export function San({ san, white = true }: { san: string; white?: boolean }) {
  const m = /^([KQRBN])(.*)$/.exec(san);
  if (!m) return <span className="san">{san}</span>;
  const code = (white ? 'w' : 'b') + m[1].toLowerCase();
  return (
    <span className="san">
      <img className="fig" src={PIECE_SVG[code]} alt={m[1]} />
      {m[2]}
    </span>
  );
}

function inline(text: string, keyBase: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) => (p.startsWith('**') && p.endsWith('**') ? <strong key={keyBase + i}>{p.slice(2, -2)}</strong> : <Fragment key={keyBase + i}>{p}</Fragment>));
}

/** Văn bản đơn giản: **đậm**, dòng "- " thành danh sách, đoạn cách nhau bởi dòng trống */
export function RichText({ text, className }: { text: string; className?: string }) {
  const blocks = text.split(/\n\s*\n/);
  return (
    <div className={'rich ' + (className ?? '')}>
      {blocks.map((b, bi) => {
        const lines = b.split('\n').filter((l) => l.trim());
        if (lines.length && lines.every((l) => /^\s*[-•]\s+/.test(l))) {
          return (
            <ul key={bi}>
              {lines.map((l, li) => (
                <li key={li}>{inline(l.replace(/^\s*[-•]\s+/, ''), `${bi}-${li}-`)}</li>
              ))}
            </ul>
          );
        }
        // đoạn có lẫn danh sách
        const out: ReactNode[] = [];
        let list: string[] = [];
        const flush = () => {
          if (list.length) {
            out.push(
              <ul key={'u' + out.length}>
                {list.map((l, li) => (
                  <li key={li}>{inline(l, `${bi}-l${out.length}-${li}-`)}</li>
                ))}
              </ul>,
            );
            list = [];
          }
        };
        let para: string[] = [];
        const flushPara = () => {
          if (para.length) {
            out.push(<p key={'p' + out.length}>{inline(para.join(' '), `${bi}-p${out.length}-`)}</p>);
            para = [];
          }
        };
        for (const l of lines) {
          if (/^\s*[-•]\s+/.test(l)) {
            flushPara();
            list.push(l.replace(/^\s*[-•]\s+/, ''));
          } else {
            flush();
            para.push(l.trim());
          }
        }
        flushPara();
        flush();
        return <Fragment key={bi}>{out}</Fragment>;
      })}
    </div>
  );
}

export function Stars({ n, max = 5 }: { n: number; max?: number }) {
  return (
    <span className="stars" title={`Độ khó ${n}/${max}`}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={i < n ? 'on' : ''}>
          ★
        </span>
      ))}
    </span>
  );
}

export function EvalBar({ win, text, orientation = 'white', labels = ['Trắng', 'Đen'] }: { win: number | null; text?: string; orientation?: 'white' | 'black'; labels?: [string, string] }) {
  const w = win ?? 50;
  const flipped = orientation === 'black';
  return (
    <div className={'evalbar' + (flipped ? ' flipped' : '')} title={win === null ? 'Đang phân tích…' : `${labels[0]} ${Math.round(w)}% – ${labels[1]} ${Math.round(100 - w)}%`}>
      <div className="evalbar-white" style={{ transform: `scaleY(${w / 100})` }} />
      <span className={'evalbar-text ' + (w >= 50 ? 'for-white' : 'for-black')}>{text ?? ''}</span>
    </div>
  );
}

export function WinBar({ win, you, names = ['Trắng', 'Đen'], icons = ['⬜', '⬛'] }: { win: number | null; you?: 'w' | 'b'; names?: [string, string]; icons?: [string, string] }) {
  const w = win ?? 50;
  return (
    <div className="winbar">
      <div className="winbar-labels">
        <span>
          {icons[0]} {names[0]}
          {you === 'w' ? ' (bạn)' : ''} {win === null ? '…' : Math.round(w) + '%'}
        </span>
        <span>
          {names[1]}
          {you === 'b' ? ' (bạn)' : ''} {win === null ? '…' : Math.round(100 - w) + '%'} {icons[1]}
        </span>
      </div>
      <div className="winbar-track">
        <div className="winbar-fill" style={{ transform: `scaleX(${w / 100})` }} />
      </div>
    </div>
  );
}

export interface MoveMark {
  symbol: string;
  color: string;
  title?: string;
}

/** Danh sách nước đi dạng bảng hai cột */
export function MoveList({
  sans,
  startFen,
  current,
  onSelect,
  marks,
  noted,
  notedIcon = '💬',
  notedTitle = 'Có lời bình',
  renderSan,
}: {
  sans: string[];
  startFen?: string;
  current: number;
  onSelect?: (ply: number) => void;
  marks?: (MoveMark | null | undefined)[];
  noted?: Set<number>;
  notedIcon?: string;
  notedTitle?: string;
  /** Hiển thị một nước đi (mặc định: ký hiệu cờ vua với hình quân) */
  renderSan?: (san: string, white: boolean) => ReactNode;
}) {
  const listRef = useRef<HTMLDivElement>(null);
  // giữ nước đang xem trong tầm nhìn của danh sách (chỉ cuộn danh sách, không cuộn cả trang)
  useEffect(() => {
    const box = listRef.current;
    const el = box?.querySelector<HTMLElement>(`[data-ply="${current}"]`);
    if (!box || !el) return;
    const top = el.offsetTop;
    if (top < box.scrollTop) box.scrollTop = top - 4;
    else if (top + el.offsetHeight > box.scrollTop + box.clientHeight) box.scrollTop = top + el.offsetHeight - box.clientHeight + 4;
  }, [current]);
  const parts = (startFen ?? 'x w - - 0 1').split(' ');
  const blackFirst = parts[1] === 'b';
  const firstNo = Number(parts[5] ?? 1) || 1;
  const rows: { no: number; w?: number; b?: number }[] = [];
  let i = 0;
  let no = firstNo;
  if (blackFirst && sans.length) {
    rows.push({ no, b: 0 });
    i = 1;
    no++;
  }
  for (; i < sans.length; i += 2, no++) rows.push({ no, w: i, b: i + 1 < sans.length ? i + 1 : undefined });
  const cell = (idx: number | undefined, white: boolean) => {
    if (idx === undefined) return <span className="mv empty" />;
    const mark = marks?.[idx];
    return (
      <button className={'mv' + (idx === current ? ' active' : '')} onClick={() => onSelect?.(idx)} data-ply={idx}>
        {renderSan ? renderSan(sans[idx], white) : <San san={sans[idx]} white={white} />}
        {mark && (
          <span className="mv-mark" style={{ color: mark.color }} title={mark.title}>
            {mark.symbol}
          </span>
        )}
        {noted?.has(idx) && (
          <span className="mv-note" title={notedTitle}>
            {notedIcon}
          </span>
        )}
      </button>
    );
  };
  return (
    <div className="movelist" ref={listRef} style={{ position: 'relative' }}>
      {rows.map((r) => (
        <div className="mv-row" key={r.no}>
          <span className="mv-no">{r.no}.</span>
          {r.w === undefined ? <span className="mv empty">…</span> : cell(r.w, true)}
          {cell(r.b, false)}
        </div>
      ))}
      {!sans.length && <div className="mv-empty">Chưa có nước đi nào.</div>}
    </div>
  );
}
