// Lưu tiến độ và cài đặt trên trình duyệt (bọc try/catch vì có thể bị chặn).
import { useCallback, useEffect, useState } from 'react';

const PREFIX = 'kydao:';

export function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function save<T>(key: string, value: T) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    /* bỏ qua */
  }
  window.dispatchEvent(new CustomEvent('kydao-storage', { detail: key }));
}

export function useStored<T>(key: string, fallback: T): [T, (v: T | ((old: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => load(key, fallback));
  useEffect(() => {
    const on = (e: Event) => {
      if ((e as CustomEvent).detail === key) setValue(load(key, fallback));
    };
    window.addEventListener('kydao-storage', on);
    return () => window.removeEventListener('kydao-storage', on);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  const set = useCallback(
    (v: T | ((old: T) => T)) => {
      const next = typeof v === 'function' ? (v as (o: T) => T)(load(key, fallback)) : v;
      setValue(next);
      save(key, next);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [key],
  );
  return [value, set];
}

export interface BotStats {
  win: number;
  loss: number;
  draw: number;
}

/** Kết quả giải một bài cờ thế */
export interface PuzzleRecord {
  solved: boolean;
  /** Giải đúng ngay lần đầu, không sai nước nào, không dùng gợi ý */
  clean: boolean;
  /** Số lần đã giải xong hoặc xem lời giải */
  tries: number;
  at: number;
}

/** Chuỗi bài giải ngay lần đầu liên tiếp */
export interface PuzzleStats {
  streak: number;
  best: number;
}

export interface Settings {
  sound: boolean;
  theme: 'light' | 'dark';
  boardTheme: 'wood' | 'green' | 'blue';
  showCoords: boolean;
  /** Kiểu chữ trên quân cờ tướng: chữ Hán (mặc định) hoặc tên tiếng Việt */
  xqPieces?: 'han' | 'viet';
  /** Phiên bản giao diện: từ bản 2 (đồng bộ với trang giới thiệu) giao diện tối là mặc định */
  themeVersion?: number;
}

export const DEFAULT_SETTINGS: Settings = { sound: true, theme: 'dark', boardTheme: 'wood', showCoords: true, themeVersion: 2 };
