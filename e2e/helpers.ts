import { expect } from '@playwright/test';
import type { Page } from '@playwright/test';

/** Ghi lại mọi lỗi JavaScript chưa được bắt và lỗi in ra console trong trang */
export function trackErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(`console: ${m.text()}`);
  });
  return errors;
}

/** Cuộn trang xuống tận cùng bằng con lăn chuột, như người dùng thật */
export async function scrollToBottom(page: Page) {
  // điện thoại: đóng hộp thoại bàn cờ trước, như người học đóng bàn cờ rồi đọc tiếp
  await closeBoardSheet(page);
  const vp = page.viewportSize()!;
  await page.mouse.move(vp.width * 0.3, vp.height * 0.5);
  for (let i = 0; i < 200; i++) {
    const atEnd = await page.evaluate(() => window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2);
    if (atEnd) break;
    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(60);
  }
  // để IntersectionObserver kịp cập nhật phần đang đọc
  await page.waitForTimeout(300);
}

export async function scrollToTop(page: Page) {
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(150);
}

/** Trang vẫn hiển thị bình thường: không trắng, không rơi vào màn hình báo lỗi */
export async function expectPageAlive(page: Page, errors: string[]) {
  await expect(page.locator('#root')).not.toBeEmpty();
  await expect(page.locator('.error-boundary')).toHaveCount(0);
  await expect(page.locator('main h1').first()).toBeVisible();
  expect(errors, errors.join('\n')).toEqual([]);
  await expectNoHorizontalOverflow(page);
}

/** Bố cục không được rộng hơn màn hình (không có thanh cuộn ngang) */
export async function expectNoHorizontalOverflow(page: Page) {
  const { scrollW, viewW } = await page.evaluate(() => ({ scrollW: document.documentElement.scrollWidth, viewW: window.innerWidth }));
  expect(scrollW, `trang rộng ${scrollW}px trên màn hình ${viewW}px`).toBeLessThanOrEqual(viewW);
}

/** Bộ đếm "Nước a/b" của bàn cờ không bao giờ vượt quá cuối chuỗi */
export async function expectStepCounterValid(page: Page) {
  const counters = await page.locator('.step-counter').allInnerTexts();
  for (const c of counters) {
    const m = /Nước (\d+)\/(\d+)/.exec(c);
    if (m) expect(Number(m[1]), `bộ đếm "${c}"`).toBeLessThanOrEqual(Number(m[2]));
  }
}

/** Màn hình hẹp: bàn cờ bài học là hộp thoại (BoardSheet) thay vì cột bên cạnh/phía trên bài */
export async function isBoardSheet(page: Page) {
  return (await page.locator('.board-sheet').count()) > 0;
}

/** Đóng hộp thoại bàn cờ nếu đang mở; trang phải giữ nguyên chỗ đang đọc */
export async function closeBoardSheet(page: Page) {
  if (!(await page.locator('.board-sheet.open').count())) return;
  const y = await page.evaluate(() => window.scrollY);
  await page.getByRole('button', { name: 'Đóng bàn cờ' }).click();
  await expect(page.locator('.board-sheet.open')).toHaveCount(0);
  await page.waitForTimeout(450); // hộp thoại trượt xuống xong
  expect(await page.evaluate(() => window.scrollY), 'đóng bàn cờ không được cuộn trang').toBe(y);
}

/** Đưa sơ đồ của phần thứ `i` lên bàn cờ (bấm vào tiêu đề phần) và chờ bàn cờ hiển thị nó */
export async function showSection(page: Page, i: number) {
  const section = page.locator('.lesson-section').nth(i);
  if (await isBoardSheet(page)) {
    // màn hình hẹp: mở bàn cờ trong hộp thoại ngay tại phần đó – trang không được cuộn đi đâu
    await closeBoardSheet(page);
    await section.getByRole('button', { name: /Xem trên bàn cờ/ }).scrollIntoViewIfNeeded();
    const y = await page.evaluate(() => window.scrollY);
    await section.getByRole('button', { name: /Xem trên bàn cờ/ }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByRole('dialog').locator('h2')).toHaveText(await section.locator('h2').innerText().then((t) => t.replace(/^\d+\s*/, '')));
    await page.waitForTimeout(450); // hộp thoại trượt lên xong
    expect(await page.evaluate(() => window.scrollY), 'mở bàn cờ không được cuộn trang').toBe(y);
    return;
  }
  await section.locator('h2').click();
  await expect(section.getByText(/Đang hiển thị trên bàn cờ/)).toBeVisible();
  await waitScrollSettled(page);
}

/** Màn hình hẹp: chạm vào phần sẽ cuộn mượt lên bàn cờ – chờ cuộn xong rồi mới thao tác tiếp */
export async function waitScrollSettled(page: Page) {
  let last = -1;
  for (let i = 0; i < 40; i++) {
    const y = await page.evaluate(() => window.scrollY);
    if (y === last) return;
    last = y;
    await page.waitForTimeout(100);
  }
}

/** Phần tử nằm trọn trong vùng nhìn thấy: không bị thanh tiêu đề che, không lọt xuống dưới mép màn hình */
export async function expectFullyVisible(page: Page, selector: string, what: string) {
  const box = await page.locator(selector).first().boundingBox();
  expect(box, `${what} phải hiển thị`).not.toBeNull();
  const headerBottom = (await page.locator('.topbar').boundingBox())!.y + (await page.locator('.topbar').boundingBox())!.height;
  const vh = page.viewportSize()!.height;
  expect(box!.y, `${what}: mép trên (${Math.round(box!.y)}) bị thanh tiêu đề che (đến ${Math.round(headerBottom)})`).toBeGreaterThanOrEqual(headerBottom - 1);
  expect(box!.y + box!.height, `${what}: mép dưới (${Math.round(box!.y + box!.height)}) vượt màn hình (${vh})`).toBeLessThanOrEqual(vh + 1);
}
