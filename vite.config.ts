import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  worker: { format: 'es' },
  // phần lớn dung lượng là nội dung bài học (văn bản), nén gzip còn khoảng 1/3;
  // phần còn lại có các biểu tượng Phosphor của thanh điều hướng (mỗi biểu tượng kèm đủ 6 kiểu nét)
  build: { chunkSizeWarningLimit: 1600 },
  test: { environment: 'node', testTimeout: 60000 },
} as any);
