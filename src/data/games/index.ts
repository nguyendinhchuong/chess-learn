// Thư viện ván cờ kinh điển, chia theo thời kỳ lịch sử.
import type { ClassicGame, GameTag } from '../types';
import { GAMES_GOC } from './goc';
import { GAMES_LANG_MAN } from './lang-man';
import { GAMES_CO_DIEN } from './co-dien';
import { GAMES_SIEU_HIEN_DAI } from './sieu-hien-dai';
import { GAMES_XO_VIET } from './xo-viet';
import { GAMES_KY_NGUYEN_K } from './ky-nguyen-k';
import { GAMES_HIEN_DAI } from './hien-dai';
import { NOTES as N_GOC } from './notes/goc';
import { NOTES as N_LANG_MAN } from './notes/lang-man';
import { NOTES as N_CO_DIEN } from './notes/co-dien';
import { NOTES as N_SIEU_HIEN_DAI } from './notes/sieu-hien-dai';
import { NOTES as N_XO_VIET } from './notes/xo-viet';
import { NOTES as N_KY_NGUYEN_K } from './notes/ky-nguyen-k';
import { NOTES as N_HIEN_DAI_1 } from './notes/hien-dai-1';
import { NOTES as N_HIEN_DAI_2 } from './notes/hien-dai-2';

export interface Era {
  id: string;
  title: string;
  years: string;
  from: number;
  to: number;
  icon: string;
  description: string;
}

/** Các thời kỳ, theo năm diễn ra ván đấu (bao gồm cả hai đầu) */
export const ERAS: Era[] = [
  { id: 'lang-man', title: 'Thời kỳ lãng mạn', years: 'trước 1880', from: 0, to: 1879, icon: '🎭', description: 'Thí quân táo bạo, tấn công Vua bằng mọi giá – thời của Anderssen và Morphy.' },
  { id: 'co-dien', title: 'Trường phái cổ điển', years: '1880 – 1919', from: 1880, to: 1919, icon: '🏛️', description: 'Steinitz đặt nền móng chiến lược; Lasker, Tarrasch, Rubinstein, Capablanca tỏa sáng.' },
  { id: 'sieu-hien-dai', title: 'Siêu hiện đại', years: '1920 – 1945', from: 1920, to: 1945, icon: '💡', description: 'Nimzowitsch, Réti, Alekhine: khống chế trung tâm từ xa và những ý tưởng mới lạ.' },
  { id: 'xo-viet', title: 'Trường phái Xô Viết', years: '1946 – 1969', from: 1946, to: 1969, icon: '⭐', description: 'Botvinnik, Tal, Petrosian, Spassky và tài năng trẻ Fischer – chuẩn bị khoa học và tính toán sâu.' },
  { id: 'ky-nguyen-k', title: 'Kỷ nguyên Fischer – Karpov – Kasparov', years: '1970 – 1999', from: 1970, to: 1999, icon: '👑', description: 'Những trận tranh ngôi kinh điển và cuộc đối đầu người – máy đầu tiên.' },
  { id: 'hien-dai', title: 'Thời hiện đại', years: '2000 – nay', from: 2000, to: 9999, icon: '🚀', description: 'Kramnik, Anand, Carlsen, Ding, Gukesh và kỷ nguyên của máy tính, AlphaZero.' },
];

export function eraOf(g: Pick<ClassicGame, 'year'>): Era {
  return ERAS.find((e) => g.year >= e.from && g.year <= e.to) ?? ERAS[ERAS.length - 1];
}

/** Chủ đề cho các ván gốc */
const CORE_TAGS: Record<string, GameTag[]> = {
  'legal-saint-brie-1750': ['Ván ngắn', 'Thí quân', 'Chiến thuật'],
  'van-co-bat-tu-1851': ['Tấn công Vua', 'Thí quân'],
  'van-co-thuong-xanh-1852': ['Tấn công Vua', 'Thí quân'],
  'van-co-nha-hat-opera-1858': ['Ván ngắn', 'Khai cuộc', 'Thí quân'],
  'steinitz-bardeleben-1895': ['Tấn công Vua', 'Chiến thuật'],
  'rotlewi-rubinstein-1907': ['Tấn công Vua', 'Thí quân'],
  'reti-tartakower-1910': ['Ván ngắn', 'Thí quân', 'Chiến thuật'],
  'lasker-thomas-1912': ['Tấn công Vua', 'Thí quân'],
  'botvinnik-capablanca-1938': ['Chiến lược', 'Tấn công Vua', 'Thí quân'],
  'van-co-the-ky-1956': ['Thí quân', 'Chiến thuật'],
  'fischer-spassky-1972-van-6': ['Chiến lược', 'Tranh ngôi vô địch'],
  'karpov-kasparov-1985-van-16': ['Chiến lược', 'Tranh ngôi vô địch'],
  'deep-blue-kasparov-1997-van-6': ['Máy tính', 'Ván ngắn', 'Thí quân'],
  'kasparov-topalov-1999': ['Tấn công Vua', 'Thí quân'],
};

const CORE = GAMES_GOC.map((g) => ({ ...g, tags: g.tags ?? CORE_TAGS[g.id] ?? [] }));

/** Lời giải thích mục đích cho các nước chưa có lời bình gốc, theo từng nhóm ván */
export const NOTE_SETS: Record<string, Record<string, Record<string, string>>> = {
  goc: N_GOC,
  'lang-man': N_LANG_MAN,
  'co-dien': N_CO_DIEN,
  'sieu-hien-dai': N_SIEU_HIEN_DAI,
  'xo-viet': N_XO_VIET,
  'ky-nguyen-k': N_KY_NGUYEN_K,
  'hien-dai-1': N_HIEN_DAI_1,
  'hien-dai-2': N_HIEN_DAI_2,
};
const ALL_NOTES: Record<string, Record<string, string>> = Object.assign({}, ...Object.values(NOTE_SETS));

/** Gộp lời bình gốc với lời giải thích từng nước (lời bình gốc được ưu tiên) */
const withNotes = (g: ClassicGame): ClassicGame => ({ ...g, annotations: { ...(ALL_NOTES[g.id] ?? {}), ...g.annotations } });

/** Toàn bộ ván cờ, sắp theo năm */
export const GAMES: ClassicGame[] = [...CORE, ...GAMES_LANG_MAN, ...GAMES_CO_DIEN, ...GAMES_SIEU_HIEN_DAI, ...GAMES_XO_VIET, ...GAMES_KY_NGUYEN_K, ...GAMES_HIEN_DAI]
  .map(withNotes)
  .sort((a, b) => a.year - b.year);

/** Các ván thuộc từng tệp lời giải thích */
export const NOTE_SET_GAMES: Record<string, ClassicGame[]> = {
  goc: GAMES_GOC,
  'lang-man': GAMES_LANG_MAN,
  'co-dien': GAMES_CO_DIEN,
  'sieu-hien-dai': GAMES_SIEU_HIEN_DAI,
  'xo-viet': GAMES_XO_VIET,
  'ky-nguyen-k': GAMES_KY_NGUYEN_K,
  'hien-dai-1': GAMES_HIEN_DAI.slice(0, 11),
  'hien-dai-2': GAMES_HIEN_DAI.slice(11),
};

export const ERA_FILES: Record<string, ClassicGame[]> = {
  'lang-man': GAMES_LANG_MAN,
  'co-dien': GAMES_CO_DIEN,
  'sieu-hien-dai': GAMES_SIEU_HIEN_DAI,
  'xo-viet': GAMES_XO_VIET,
  'ky-nguyen-k': GAMES_KY_NGUYEN_K,
  'hien-dai': GAMES_HIEN_DAI,
};
