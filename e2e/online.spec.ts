// Chơi với bạn: hai trình duyệt riêng (hai người chơi) cùng vào một phòng trên máy chủ phòng chạy cục bộ.
import { expect, test } from '@playwright/test';
import type { Browser, Page, TestInfo } from '@playwright/test';
import { expectNoHorizontalOverflow, trackErrors } from './helpers';

/** Trình duyệt thứ hai (mã người chơi riêng), cùng cỡ màn hình với dự án đang chạy */
async function secondPlayer(browser: Browser, testInfo: TestInfo) {
  const { viewport, userAgent, isMobile, hasTouch, deviceScaleFactor } = testInfo.project.use;
  const ctx = await browser.newContext({ viewport, userAgent, isMobile, hasTouch, deviceScaleFactor });
  return { ctx, page: await ctx.newPage() };
}

async function clickSquare(page: Page, sq: string) {
  const board = page.locator('.play .board');
  await board.scrollIntoViewIfNeeded();
  const box = (await board.boundingBox())!;
  const flipped = (await page.locator('.play .board .sq').first().getAttribute('data-sq')) === 'h1';
  const f = sq.charCodeAt(0) - 97;
  const r = Number(sq[1]) - 1;
  const x = flipped ? 7 - f : f;
  const y = flipped ? r : 7 - r;
  await page.mouse.click(box.x + ((x + 0.5) * box.width) / 8, box.y + ((y + 0.5) * box.height) / 8);
}

const moveCount = (page: Page) => page.locator('.movelist .mv:not(.empty)');

// mỗi bài điều khiển hai–ba trình duyệt cùng lúc
test.describe.configure({ timeout: 120_000 });

test('cờ vua: tạo phòng, bạn vào bằng đường dẫn, chơi tới chiếu hết, tải lại trang, ván mới đổi màu', async ({ page, browser }, testInfo) => {
  const errors = trackErrors(page);
  await page.goto('/#/phong');
  await page.getByLabel('Tên của bạn').fill('An');
  await page.locator('.choice', { hasText: 'Trắng' }).click();
  await page.locator('.choice', { hasText: '5 + 3' }).click();
  await page.getByRole('button', { name: 'Tạo phòng' }).click();
  await expect(page).toHaveURL(/#\/phong\/[A-Z2-9]{6}$/);
  const link = await page.getByLabel('Đường dẫn mời').inputValue();
  await expect(page.locator('.online-status')).toContainText('Chờ đối thủ');
  await expectNoHorizontalOverflow(page);

  const friend = await secondPlayer(browser, testInfo);
  const friendErrors = trackErrors(friend.page);
  await friend.page.goto(link);
  await expect(friend.page.getByText('Lời mời chơi cờ vua')).toBeVisible();
  await expect(friend.page.locator('.online-invite')).toContainText('An');
  await friend.page.getByLabel('Tên của bạn').fill('Bình');
  await friend.page.getByRole('button', { name: 'Vào chơi' }).click();

  await expect(page.locator('.online-strip', { hasText: 'Bình' })).toBeVisible();
  await expect(page.locator('.online-status')).toContainText('Đến lượt bạn');
  await expect(friend.page.locator('.online-status')).toContainText('Chờ An đi');
  await expect(page.locator('.clock')).toHaveText(['5:00', '5:00']);

  const line = ['e2e4', 'e7e5', 'f1c4', 'b8c6', 'd1h5', 'g8f6', 'h5f7'];
  for (let i = 0; i < line.length; i++) {
    const p = i % 2 === 0 ? page : friend.page;
    await clickSquare(p, line[i].slice(0, 2));
    await clickSquare(p, line[i].slice(2, 4));
    await expect(moveCount(page)).toHaveCount(i + 1);
    await expect(moveCount(friend.page)).toHaveCount(i + 1);
  }
  await expect(page.locator('.online-status')).toContainText('Bạn thắng!');
  await expect(page.locator('.online-status')).toContainText('Chiếu hết');
  await expect(friend.page.locator('.online-status')).toContainText('Bạn thua');

  // tải lại trang: vẫn là người cầm quân Đen, ván cờ còn nguyên
  await friend.page.reload();
  await expect(friend.page.locator('.online-strip', { hasText: 'Bình' })).toContainText('Cầm quân Đen');
  await expect(friend.page.locator('.online-strip', { hasText: 'Bình' })).toContainText('Bạn');
  await expect(moveCount(friend.page)).toHaveCount(line.length);

  // ván mới: hai bên đổi màu
  await page.getByRole('button', { name: /Ván mới/ }).click();
  await friend.page.getByRole('button', { name: /Đồng ý chơi ván mới/ }).click();
  await expect(friend.page.locator('.online-status')).toContainText('Đến lượt bạn');
  await expect(friend.page.locator('.online-strip', { hasText: 'Bình' })).toContainText('Cầm quân Trắng');
  await expect(moveCount(page)).toHaveCount(0);
  await clickSquare(friend.page, 'd2');
  await clickSquare(friend.page, 'd4');
  await expect(moveCount(page)).toHaveCount(1);

  // người xem: trình duyệt thứ ba không đi quân được
  const viewer = await secondPlayer(browser, testInfo);
  await viewer.page.goto(link);
  await expect(viewer.page.getByText('Bạn đang xem ván cờ')).toBeVisible();
  await expect(moveCount(viewer.page)).toHaveCount(1);

  expect(errors, errors.join('\n')).toEqual([]);
  expect(friendErrors, friendErrors.join('\n')).toEqual([]);
  await expectNoHorizontalOverflow(page);
  await expectNoHorizontalOverflow(friend.page);
  await friend.ctx.close();
  await viewer.ctx.close();
});

test('cờ tướng: vào phòng bằng mã, mã phòng cờ tướng nhập ở trang cờ vua tự chuyển đúng môn', async ({ page, browser }, testInfo) => {
  const errors = trackErrors(page);
  await page.goto('/#/co-tuong/phong');
  await page.locator('.choice', { hasText: 'Đỏ' }).click();
  await page.locator('.choice', { hasText: 'Không giới hạn' }).click();
  await page.getByRole('button', { name: 'Tạo phòng' }).click();
  await expect(page).toHaveURL(/#\/co-tuong\/phong\/[A-Z2-9]{6}$/);
  const code = page.url().split('/').pop()!;
  await expect(page.locator('.room-code')).toHaveText(code);
  await expect(page.locator('.clock')).toHaveCount(0);

  const friend = await secondPlayer(browser, testInfo);
  await friend.page.goto('/#/phong');
  await friend.page.getByLabel('Mã phòng').fill(code.toLowerCase().slice(0, 3) + ' ' + code.slice(3));
  await friend.page.getByRole('button', { name: 'Vào phòng' }).click();
  await expect(friend.page).toHaveURL(new RegExp(`#/co-tuong/phong/${code}$`));
  await expect(friend.page.getByText('Lời mời chơi cờ tướng')).toBeVisible();
  await friend.page.getByRole('button', { name: 'Vào chơi' }).click();
  await expect(friend.page.locator('.online-strip', { hasText: 'Bạn' })).toContainText('Cầm quân Đen');
  await expect(page.locator('.online-status')).toContainText('Đến lượt bạn');
  await expect(page.locator('.xq-board')).toBeVisible();

  // phòng không tồn tại
  await friend.page.goto('/#/phong/ZZZZZZ');
  await expect(friend.page.getByText('Không tìm thấy phòng ZZZZZZ')).toBeVisible();

  expect(errors, errors.join('\n')).toEqual([]);
  await expectNoHorizontalOverflow(page);
  await friend.ctx.close();
});
