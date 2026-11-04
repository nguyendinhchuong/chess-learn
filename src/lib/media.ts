import { useEffect, useState } from 'react';

/** Màn hình hẹp (điện thoại, máy tính bảng dọc): các bước luyện tập gập lại, bàn cờ bài học mở trong hộp thoại */
export const COMPACT = '(max-width: 820px)';

export function useMedia(query: string) {
  const [match, setMatch] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches);
  useEffect(() => {
    const m = window.matchMedia(query);
    const on = () => setMatch(m.matches);
    on();
    m.addEventListener('change', on);
    return () => m.removeEventListener('change', on);
  }, [query]);
  return match;
}
