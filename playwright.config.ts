import { defineConfig, devices } from '@playwright/test';

// Kiểm thử đầu-cuối (e2e): chạy bằng `npm run test:e2e`.
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  timeout: 60_000,
  expect: { timeout: 10_000 },
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:5199',
    trace: 'retain-on-failure',
  },
  projects: [
    // màn hình rộng: bàn cờ dính bên phải và tự đổi theo phần đang đọc (nơi lỗi trang trắng xảy ra)
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  // Cổng riêng và không dùng lại máy chủ có sẵn: tránh chạy nhầm vào ứng dụng khác đang chiếm cổng.
  // Máy chủ phòng chơi (Cloudflare Worker chạy cục bộ) cho e2e/online.spec.ts; Vite chuyển /api tới nó.
  webServer: [
    {
      command: 'npx wrangler dev --config server/wrangler.jsonc --port 8799 --persist-to .wrangler/e2e',
      url: 'http://localhost:8799/api/health',
      reuseExistingServer: false,
      timeout: 60_000,
      env: { WRANGLER_SEND_METRICS: 'false' },
    },
    {
      command: 'npm run dev -- --port 5199 --strictPort',
      url: 'http://localhost:5199',
      reuseExistingServer: false,
      timeout: 60_000,
      env: { ROOM_SERVER_PORT: '8799' },
    },
  ],
});
