// Biên bản ván đấu và phân tích ván: xuất PGN sau một ván "Chơi với bạn", mở trang phân tích, nhập biên bản.
import { expect, test } from '@playwright/test';
import type { Browser, Page, TestInfo } from '@playwright/test';
import { expectNoHorizontalOverflow, trackErrors } from './helpers';

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

test.describe.configure({ timeout: 150_000 });

test('cờ vua: chơi xong một ván có đồng hồ, tải biên bản PGN, mở phân tích và xem bài học cho bên thua', async ({ page, browser }, testInfo) => {
  const errors = trackErrors(page);
  await page.goto('/#/phong');
  await page.getByLabel('Tên của bạn').fill('An');
  await page.locator('.choice', { hasText: 'Trắng' }).click();
  await page.locator('.choice', { hasText: '5 + 3' }).click();
  await page.getByRole('button', { name: 'Tạo phòng' }).click();
  await expect(page).toHaveURL(/#\/phong\/[A-Z2-9]{6}$/);
  const link = await page.getByLabel('Đường dẫn mời').inputValue();

  const friend = await secondPlayer(browser, testInfo);
  const friendErrors = trackErrors(friend.page);
  await friend.page.goto(link);
  await friend.page.getByLabel('Tên của bạn').fill('Bình');
  await friend.page.getByRole('button', { name: 'Vào chơi' }).click();
  await expect(page.locator('.online-status')).toContainText('Đến lượt bạn');

  // trong lúc chơi: chưa có nút tải/phân tích (tránh dùng máy giúp sức)
  const line = ['e2e4', 'e7e5', 'f1c4', 'b8c6', 'd1h5', 'g8f6', 'h5f7'];
  for (let i = 0; i < line.length; i++) {
    const p = i % 2 === 0 ? page : friend.page;
    await clickSquare(p, line[i].slice(0, 2));
    await clickSquare(p, line[i].slice(2, 4));
    await expect(page.locator('.movelist .mv:not(.empty)')).toHaveCount(i + 1);
    if (i === 2) await expect(page.getByRole('button', { name: 'Tải biên bản' })).toHaveCount(0);
  }
  await expect(page.getByRole('dialog')).toContainText('Bạn thắng!');
  await page.keyboard.press('Escape');

  // tải biên bản: PGN chuẩn có tên, kết quả, thời gian và đồng hồ từng nước
  const [download] = await Promise.all([page.waitForEvent('download'), page.getByRole('button', { name: 'Tải biên bản' }).click()]);
  expect(download.suggestedFilename()).toMatch(/^ky-dao_co-vua_an-vs-binh_\d{4}-\d{2}-\d{2}\.pgn$/);
  const pgn = await (await download.createReadStream()).toArray().then((chunks) => Buffer.concat(chunks).toString('utf8'));
  expect(pgn).toContain('[White "An"]');
  expect(pgn).toContain('[Black "Bình"]');
  expect(pgn).toContain('[Result "1-0"]');
  expect(pgn).toContain('[TimeControl "300+3"]');
  expect(pgn).toContain('[EndReason "checkmate"]');
  expect(pgn).toMatch(/1\. e4 \{\[%clk 0:05:00\]\} 1\.\.\. e5 \{\[%clk 0:05:00\]\} 2\. Bc4 \{\[%clk 0:0\d:\d\d\]\}/);
  expect(pgn).toContain('4. Qxf7#');
  expect(pgn.trim().endsWith('1-0')).toBe(true);

  // người thua mở phân tích ngay từ hộp thoại kết quả: thẻ bài học mặc định là bên của mình
  await friend.page.getByRole('dialog').getByRole('button', { name: 'Phân tích ván' }).click();
  await expect(friend.page).toHaveURL(/#\/phong\/phan-tich$/);
  await expect(friend.page.locator('.an-head h1')).toContainText('An');
  await expect(friend.page.getByRole('heading', { name: 'Tổng kết hai bên' })).toBeVisible({ timeout: 60_000 });
  const tab = friend.page.getByRole('tab', { selected: true });
  await expect(tab).toContainText('Bình');
  const lessons = friend.page.getByRole('tabpanel');
  await expect(lessons).toContainText('Bỏ ngỏ Vua');
  // bấm nước ví dụ: bàn cờ nhảy tới nước đó, thẻ nhận xét hiện đúng nước
  await lessons.locator('.chip').first().click();
  await expect(friend.page.locator('.coach-panel')).toContainText('3...');
  await expect(friend.page.locator('.coach-panel')).toContainText('Sai lầm');
  await expectNoHorizontalOverflow(friend.page);

  // ván đã lưu vào "Ván đã chơi" của cả hai người
  await page.goto('/#/phong');
  await expect(page.locator('.online-invite', { hasText: 'Phân tích ván đã chơi' })).toContainText('1 ván đã lưu');
  await page.getByRole('link', { name: /Xem và phân tích/ }).click();
  await expect(page.locator('.an-game')).toContainText('An');

  expect(errors, errors.join('\n')).toEqual([]);
  expect(friendErrors, friendErrors.join('\n')).toEqual([]);
  await friend.ctx.close();
});

test('nhập biên bản: báo nước sai, biên bản cờ tướng dán ở trang cờ vua tự chuyển đúng môn', async ({ page }) => {
  const errors = trackErrors(page);
  await page.goto('/#/phong/phan-tich');
  await expect(page.getByRole('heading', { name: /Phân tích ván cờ vua/ })).toBeVisible();
  const box = page.getByLabel('Nội dung biên bản PGN');
  await box.fill('1. e4 e5 2. Ke3');
  await page.getByRole('button', { name: 'Phân tích ván này' }).click();
  await expect(page.getByRole('alert')).toContainText('Không đọc được nước 2. “Ke3”');

  await box.fill('[Red "Đức"]\n[Black "Lan"]\n\n1. P2-5 M8.7 2. M2.3 X9-8 *');
  await page.getByRole('button', { name: 'Phân tích ván này' }).click();
  await expect(page).toHaveURL(/#\/co-tuong\/phong\/phan-tich$/);
  await expect(page.locator('.an-head h1')).toContainText('Đức');
  await expect(page.locator('.xq-board')).toBeVisible();
  await expect(page.locator('.movelist .mv:not(.empty)')).toHaveCount(4);
  await expectNoHorizontalOverflow(page);
  expect(errors, errors.join('\n')).toEqual([]);
});
