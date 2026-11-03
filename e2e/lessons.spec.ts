import { test, expect } from '@playwright/test';
import { ALL_LESSONS } from '../src/data/lessons';
import { expectPageAlive, expectStepCounterValid, scrollToBottom, scrollToTop, showSection, trackErrors } from './helpers';

const isWide = (w: number) => w > 1100;

test.describe('Bài học – cuộn trang sau khi xem hết nước đi', () => {
  test('lỗi đã báo: bài đầu tiên, xem đến 9/9 rồi cuộn xuống cuối trang', async ({ page }) => {
    const errors = trackErrors(page);
    await page.goto('/#/hoc/nm-ban-co-va-ky-hieu');
    await expect(page.locator('main h1')).toHaveText('Bàn cờ, tọa độ và ký hiệu nước đi');

    // Phần 5 "Cách ghi một nước đi" có 9 nước; phần 6 ngay sau đó chỉ có 8 nước.
    await showSection(page, 4);
    // bấm ▶ từng nước như người học, đến 9/9
    const next = page.locator('.board-col button[title="Tiến (→)"]');
    for (let i = 0; i < 9; i++) {
      await next.click();
      await page.waitForTimeout(120);
    }
    await expect(page.locator('.board-col .step-counter')).toHaveText('Nước 9/9');

    await scrollToBottom(page);
    // trên màn hình rộng, bàn cờ phải chuyển theo phần đang đọc ở cuối trang (sơ đồ khác)
    const vw = page.viewportSize()!.width;
    if (vw > 1100) await expect(page.locator('.board-col .step-counter')).not.toHaveText('Nước 9/9');

    await expectPageAlive(page, errors);
    await expectStepCounterValid(page);
    await expect(page.locator('.board-col .board')).toBeVisible();
    await expect(page.getByRole('heading', { name: /Ghi nhớ/ })).toBeVisible();
  });

  test('lỗi đã báo: chuyển trực tiếp từ sơ đồ 9/9 sang sơ đồ 8 nước', async ({ page }) => {
    const errors = trackErrors(page);
    await page.goto('/#/hoc/nm-ban-co-va-ky-hieu');
    await showSection(page, 4);
    await page.locator('.board-col button[title="Đến cuối"]').click();
    await expect(page.locator('.board-col .step-counter')).toHaveText('Nước 9/9');
    await showSection(page, 5);
    await expect(page.locator('.board-col .step-counter')).toHaveText('Nước 0/8');
    await expectPageAlive(page, errors);
  });

  // Áp dụng cho mọi bài: với từng sơ đồ có nước đi, xem đến nước cuối rồi cuộn xuống cuối trang.
  for (const lesson of ALL_LESSONS) {
    const stepped = lesson.sections.map((s, i) => (s.diagram?.moves?.trim() ? i : -1)).filter((i) => i >= 0);
    test(`${lesson.id}: xem hết từng sơ đồ rồi cuộn xuống cuối`, async ({ page }) => {
      const errors = trackErrors(page);
      await page.goto('/#/hoc/' + lesson.id);
      await expect(page.locator('main h1')).toHaveText(lesson.title);
      for (const i of stepped) {
        await scrollToTop(page);
        await showSection(page, i);
        const end = page.locator('.board-col button[title="Đến cuối"]');
        if (await end.isEnabled()) await end.click();
        // chờ hết thời gian khóa đồng bộ cuộn (sau khi bấm "Xem trên bàn cờ") như người học thật
        await page.waitForTimeout(900);
        await scrollToBottom(page);
        await expectPageAlive(page, errors);
        await expectStepCounterValid(page);
      }
      // không có sơ đồ nhiều nước: vẫn phải cuộn hết trang được
      if (!stepped.length) {
        await scrollToBottom(page);
        await expectPageAlive(page, errors);
      }
    });
  }
});

test.describe('Bài học – chuyển bài', () => {
  test('xem hết sơ đồ rồi bấm "Bài tiếp" sang bài có ít phần hơn', async ({ page, viewport }) => {
    const errors = trackErrors(page);
    // tìm một cặp bài liên tiếp mà bài sau có ít phần hơn bài trước
    const idx = ALL_LESSONS.findIndex((l, i) => i + 1 < ALL_LESSONS.length && ALL_LESSONS[i + 1].sections.length < l.sections.length);
    const from = ALL_LESSONS[idx];
    const to = ALL_LESSONS[idx + 1];
    await page.goto('/#/hoc/' + from.id);
    // chọn phần cuối cùng có sơ đồ để chỉ số phần đang chọn lớn hơn số phần của bài sau
    const lastWithDiagram = from.sections.map((s, i) => (s.diagram ? i : -1)).filter((i) => i >= 0).pop()!;
    await showSection(page, lastWithDiagram);
    const end = page.locator('.board-col button[title="Đến cuối"]');
    if (await end.count() && (await end.isEnabled())) await end.click();
    await page.getByRole('button', { name: /Bài tiếp/ }).click();
    await expect(page.locator('main h1')).toHaveText(to.title);
    if (viewport && isWide(viewport.width)) await scrollToBottom(page);
    await expectPageAlive(page, errors);
    await expectStepCounterValid(page);
  });
});
