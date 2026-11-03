// Thư viện ván cờ tướng kinh điển, chia theo thời kỳ lịch sử.
import type { XqGame } from '../types';
import { GAMES_CO_PHO } from './co-pho';
import { GAMES_KHAI_SANG } from './khai-sang';
import { GAMES_HO_VINH_HOA } from './ho-vinh-hoa';
import { GAMES_TRANH_HUNG } from './tranh-hung';
import { GAMES_HIEN_DAI } from './hien-dai';

export interface XqEra {
  id: string;
  title: string;
  years: string;
  from: number;
  to: number;
  icon: string;
  description: string;
}

/** Các thời kỳ, theo năm diễn ra ván đấu (bao gồm cả hai đầu) */
export const XQ_ERAS: XqEra[] = [
  { id: 'co-pho', title: 'Cổ phổ', years: 'trước 1900', from: 0, to: 1899, icon: '📜', description: 'Những ván mẫu trong Tự xuất động lai vô địch thủ, Quất Trung Bí, Mai Hoa Phổ – nền móng lý thuyết khai cuộc còn nguyên giá trị.' },
  { id: 'khai-sang', title: 'Thời kỳ khai sáng', years: '1900 – 1959', from: 1900, to: 1959, icon: '🏮', description: 'Tạ Hiệp Tốn, Chu Đức Dụ, Chung Trân, những trận đấu mười ván của Dương Quan Lân và các giải vô địch toàn quốc đầu tiên.' },
  { id: 'ho-vinh-hoa', title: 'Kỷ nguyên Hồ Vinh Hoa', years: '1960 – 1979', from: 1960, to: 1979, icon: '🐉', description: 'Thần đồng 15 tuổi vô địch quốc gia, 10 lần liên tiếp đăng quang và cuộc cách mạng khai cuộc.' },
  { id: 'tranh-hung', title: 'Thời kỳ tranh hùng', years: '1980 – 1999', from: 1980, to: 1999, icon: '⚔️', description: 'Liễu Đại Hoa, Lý Lai Quần, Lữ Khâm, Triệu Quốc Vinh, Từ Thiên Hồng, Hứa Ngân Xuyên và nữ kiện tướng Hồ Minh – Cúp Ngũ Dương và nhiều phong cách cùng tỏa sáng.' },
  { id: 'hien-dai', title: 'Thời hiện đại', years: '2000 – nay', from: 2000, to: 9999, icon: '🚀', description: 'Hứa Ngân Xuyên, Lữ Khâm, Đường Đan, thế hệ mới Mạnh Thần, Vương Vũ Bác và các kỳ thủ Việt Nam vươn tầm thế giới – đỉnh cao là chức vô địch thế giới 2025 của Lại Lý Huynh.' },
];

export function xqEraOf(g: Pick<XqGame, 'year'>): XqEra {
  return XQ_ERAS.find((e) => g.year >= e.from && g.year <= e.to) ?? XQ_ERAS[XQ_ERAS.length - 1];
}

/** Toàn bộ ván cờ, sắp theo năm */
export const XQ_GAMES: XqGame[] = [...GAMES_CO_PHO, ...GAMES_KHAI_SANG, ...GAMES_HO_VINH_HOA, ...GAMES_TRANH_HUNG, ...GAMES_HIEN_DAI].sort((a, b) => a.year - b.year);

export const XQ_ERA_FILES: Record<string, XqGame[]> = {
  'co-pho': GAMES_CO_PHO,
  'khai-sang': GAMES_KHAI_SANG,
  'ho-vinh-hoa': GAMES_HO_VINH_HOA,
  'tranh-hung': GAMES_TRANH_HUNG,
  'hien-dai': GAMES_HIEN_DAI,
};
