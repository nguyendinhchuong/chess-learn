import type { XqLesson, XqLessonCategory } from '../types';
import { LESSONS as NHAP_MON } from './nhapMon';
import { LESSONS as CHIEN_THUAT } from './chienThuat';
import { LESSONS as CHIEN_LUOC } from './chienLuoc';
import { LESSONS as TAN_CUOC } from './tanCuoc';

export const XQ_LESSONS: XqLesson[] = [...NHAP_MON, ...CHIEN_THUAT, ...CHIEN_LUOC, ...TAN_CUOC];

export const XQ_CATEGORY_INFO: Record<XqLessonCategory, { title: string; icon: string; description: string; color: string }> = {
  'nhap-mon': { title: 'Nhập môn', icon: '🌱', description: 'Bàn cờ, cách đi bảy loại quân, luật lộ mặt tướng, chiếu bí – khốn bí và các thế sát cục căn bản.', color: 'green' },
  'chien-thuat': { title: 'Chiến thuật', icon: '⚔️', description: 'Các đòn phối hợp: bắt đôi, ghim, Pháo trùng, Mã hậu pháo, thí quân, đánh lạc hướng…', color: 'red' },
  'chien-luoc': { title: 'Chiến lược trung cuộc', icon: '🧭', description: 'Nguyên tắc khai cuộc, Xe chiếm lộ, Mã giữa, Tốt qua hà, phòng thủ Sĩ Tượng và cách lập kế hoạch.', color: 'blue' },
  'tan-cuoc': { title: 'Tàn cuộc', icon: '👑', description: 'Kỹ thuật thắng – hòa kinh điển: Tốt, Mã, Pháo, Xe đối Sĩ Tượng và những thế cờ phải thuộc lòng.', color: 'purple' },
};
