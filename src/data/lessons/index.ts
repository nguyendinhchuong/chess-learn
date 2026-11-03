import type { Lesson, LessonCategory } from '../types';
import { LESSONS as NHAP_MON } from './nhapMon';
import { LESSONS as CHIEN_THUAT } from './chienThuat';
import { LESSONS as CHIEN_LUOC } from './chienLuoc';
import { LESSONS as TAN_CUOC } from './tanCuoc';

export const ALL_LESSONS: Lesson[] = [...NHAP_MON, ...CHIEN_THUAT, ...CHIEN_LUOC, ...TAN_CUOC];

export const CATEGORY_INFO: Record<LessonCategory, { title: string; icon: string; description: string; color: string }> = {
  'nhap-mon': { title: 'Nhập môn', icon: '🌱', description: 'Luật chơi, cách đi quân, giá trị quân và những đòn chiếu hết căn bản.', color: 'green' },
  'chien-thuat': { title: 'Chiến thuật', icon: '⚔️', description: 'Các đòn phối hợp: chĩa đôi, ghim, xiên, tấn công mở, đánh lạc hướng…', color: 'red' },
  'chien-luoc': { title: 'Chiến lược trung cuộc', icon: '🧭', description: 'Cấu trúc tốt, ô mạnh, cột mở, an toàn Vua và cách lập kế hoạch.', color: 'blue' },
  'tan-cuoc': { title: 'Tàn cuộc', icon: '👑', description: 'Đối Vua, quy tắc hình vuông, Lucena, Philidor và kỹ thuật thắng tàn cuộc.', color: 'purple' },
};
