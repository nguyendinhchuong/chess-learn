import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Phòng chơi trực tuyến: khi phát triển, /api được chuyển tới máy chủ phòng chạy bằng `npm run dev:server`
const roomServer = { target: `http://localhost:${process.env.ROOM_SERVER_PORT ?? 8790}`, ws: true };

export default defineConfig({
  plugins: [react()],
  base: './',
  worker: { format: 'es' },
  server: { proxy: { '/api': roomServer } },
  preview: { proxy: { '/api': roomServer } },
  // phần lớn dung lượng là nội dung bài học (văn bản), nén gzip còn khoảng 1/3;
  // phần còn lại có các biểu tượng Phosphor của thanh điều hướng (mỗi biểu tượng kèm đủ 6 kiểu nét)
  build: { chunkSizeWarningLimit: 1600 },
  test: { environment: 'node', testTimeout: 60000 },
} as any);
