import { Fragment, ReactNode, useEffect, useRef, useState } from 'react';
import { BookOpen, CaretDown, Check, Play, Star, ThumbsUp, X, type Icon } from '@phosphor-icons/react';
import { PIECE_SVG } from '../assets/pieces';
import { CLASS_INFO, type MoveClass } from '../engine/coach';
import { COMPACT } from '../lib/media';
import type { BotStats } from '../lib/storage';

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

interface BotInfo {
  level: number;
  name: string;
  title: string;
  elo: number;
  avatar: string;
  color: string;
  description: string;
}

/**
 * Bước 1 của màn hình luyện tập: chọn đối thủ. Trên màn hình hẹp, chọn xong thì danh sách gập lại thành một dòng
 * tóm tắt để bước chọn màu quân và chế độ nhích lên ngay bên dưới; chạm vào dòng đó để mở lại cả danh sách.
 */
export function BotStep({ bots, level, stats, onPick }: { bots: BotInfo[]; level: number; stats: Record<number, BotStats>; onPick: (level: number) => void }) {
  const [open, setOpen] = useState(true);
  const box = useRef<HTMLElement>(null);
  const summary = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLDivElement>(null);
  // chỉ chuyển tiêu điểm và cuộn khi người dùng vừa gập/mở, không phải lúc trang mới hiện
  const toggled = useRef(false);
  const bot = bots[level - 1];

  useEffect(() => {
    if (!toggled.current) return;
    toggled.current = false;
    if (open) {
      list.current?.querySelector<HTMLElement>('.bot-card.active')?.focus({ preventScroll: true });
      return;
    }
    summary.current?.focus({ preventScroll: true });
    // chọn đối thủ ở cuối danh sách thì tiêu đề bước 1 đã trôi khuất dưới thanh điều hướng: cuộn về
    // để thấy đối thủ vừa chọn và bước chọn màu quân ngay bên dưới
    const top = box.current?.getBoundingClientRect().top ?? 0;
    const nav = document.querySelector('.topbar')?.getBoundingClientRect().bottom ?? 0;
    if (top < nav) window.scrollBy({ top: top - nav - 12, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }, [open]);

  const pick = (lv: number) => {
    onPick(lv);
    if (!window.matchMedia(COMPACT).matches) return;
    toggled.current = true;
    setOpen(false);
  };

  return (
    <section ref={box} className="bot-step" style={{ ['--bot-color' as string]: bot.color }}>
      <h3>1. Chọn đối thủ</h3>
      <div className={'bot-fold bot-fold-pick' + (open ? ' off' : '')}>
        <div>
          <button
            ref={summary}
            type="button"
            className="bot-pick"
            aria-expanded={open}
            aria-controls="bot-list"
            aria-label={`Đổi đối thủ – đang chọn ${bot.name}, cấp ${bot.level}`}
            onClick={() => {
              toggled.current = true;
              setOpen(true);
            }}
          >
            <span className="bot-avatar" aria-hidden="true">
              {bot.avatar}
            </span>
            <span className="bot-pick-text">
              <b>{bot.name}</b>
              <span>
                Cấp {bot.level} · {bot.title} · ~{bot.elo} Elo
              </span>
            </span>
            <span className="bot-pick-change">
              Đổi
              <CaretDown size={14} weight="bold" aria-hidden="true" />
            </span>
          </button>
        </div>
      </div>
      <div className={'bot-fold' + (open ? '' : ' off')}>
        <div ref={list} id="bot-list">
          <div className="bot-grid">
            {bots.map((b) => {
              const s = stats[b.level];
              return (
                <button key={b.level} className={'bot-card' + (level === b.level ? ' active' : '')} aria-pressed={level === b.level} style={{ ['--bot-color' as string]: b.color }} onClick={() => pick(b.level)}>
                  <span className="lvl">CẤP {b.level}</span>
                  <div className="bot-avatar">{b.avatar}</div>
                  <h3>{b.name}</h3>
                  <div className="elo">
                    {b.title} · ~{b.elo} Elo
                  </div>
                  <p>{b.description}</p>
                  <div className={'record' + (s ? '' : ' none')}>{s ? `Thành tích: ${s.win} thắng · ${s.draw} hòa · ${s.loss} thua` : 'Chưa đấu lần nào'}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Nút bắt đầu ván ở màn hình chọn đối thủ. Màn hình rộng: nút nằm giữa cuối trang. Điện thoại và máy tính bảng:
 * thanh nổi dính mép dưới, tóm tắt đối thủ, màu quân và chế độ đang chọn – vừa chạm vào đối thủ là thấy ngay
 * bước tiếp theo, không phải cuộn xuống tìm nút.
 */
export function StartBar({ bot, details, onStart }: { bot: { level: number; name: string; avatar: string; color: string }; details: string; onStart: () => void }) {
  return (
    <div className="start-bar" style={{ ['--bot-color' as string]: bot.color }}>
      <div className="start-bar-pick">
        <span key={bot.level} className="bot-avatar" aria-hidden="true">
          {bot.avatar}
        </span>
        <span className="start-bar-text">
          <b>{bot.name}</b>
          <span>{details}</span>
        </span>
      </div>
      <button className="btn primary big" onClick={onStart}>
        <Play size={16} weight="fill" aria-hidden="true" />
        <span>
          Bắt đầu
          <span className="start-bar-long">
            {' '}
            ván đấu với {bot.avatar} {bot.name}
          </span>
        </span>
      </button>
    </div>
  );
}

/**
 * Ký hiệu chất lượng nước đi (huy hiệu trên bàn cờ, biên bản, thẻ nhận xét). Các ký hiệu không phải chữ được vẽ
 * bằng SVG: emoji và ký hiệu Unicode (★ 👍 ✓ 📖 ✗) mỗi điện thoại vẽ một kiểu, thu nhỏ trong huy hiệu thì vỡ
 * hoặc mất hẳn; còn !!, !, ?!, ?, ?? vẫn là chữ.
 */
const CLASS_GLYPH: Partial<Record<MoveClass, [Icon, 'fill' | 'bold']>> = {
  best: [Star, 'fill'],
  excellent: [ThumbsUp, 'fill'],
  good: [Check, 'bold'],
  book: [BookOpen, 'fill'],
  miss: [X, 'bold'],
};

export function ClassSymbol({ cls }: { cls: MoveClass }) {
  const glyph = CLASS_GLYPH[cls];
  if (!glyph) return <>{CLASS_INFO[cls].symbol}</>;
  const [Glyph, weight] = glyph;
  return <Glyph className="cls-glyph" size="1.15em" weight={weight} aria-hidden="true" />;
}

export interface MoveMark {
  symbol: ReactNode;
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
