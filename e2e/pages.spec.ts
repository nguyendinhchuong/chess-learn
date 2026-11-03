import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';
import { OPENINGS } from '../src/data/openings';
import { GAMES, ERAS, eraOf } from '../src/data/games/index';
import { expectNoHorizontalOverflow, expectPageAlive, expectStepCounterValid, scrollToBottom, trackErrors } from './helpers';

test('trang chủ và thư viện hiển thị', async ({ page }) => {
  const errors = trackErrors(page);
  // #/ là trang chọn môn; trang chủ cờ vua (#/co-vua) là trang giới thiệu
  await page.goto('/#/co-vua');
  await expect(page.locator('#ld-hero-title')).toContainText('kiện tướng');
  await scrollToBottom(page);
  await page.goto('/#/hoc');
  await expect(page.locator('.lesson-card')).not.toHaveCount(0);
  await expectPageAlive(page, errors);
});

test.describe('Khai cuộc', () => {
  for (const o of OPENINGS) {
    test(`${o.id}: xem hết diễn biến, các biến, bẫy rồi cuộn trang`, async ({ page }) => {
      const errors = trackErrors(page);
      await page.goto('/#/khai-cuoc/' + o.id);
      await expect(page.locator('main h1')).toHaveText(o.name);
      await page.locator('button[title="Đến cuối"]').click();
      await scrollToBottom(page);
      await expectPageAlive(page, errors);
      // từ cuối diễn biến chính chuyển sang từng biến (thường ngắn hơn) và từng bẫy, chọn từ phần kiến thức bên dưới
      const items = page.locator('.knowledge .line-item');
      const n = await items.count();
      expect(n).toBe(o.variations.length + o.traps.length);
      for (let i = 0; i < n; i++) {
        await items.nth(i).click();
        const end = page.locator('button[title="Đến cuối"]');
        if (await end.isEnabled()) await end.click();
        await expectStepCounterValid(page);
      }
      // và chọn qua ô "Đang xem" ngay trên bảng lời giảng
      if (o.variations.length) {
        await page.getByLabel('Chọn diễn biến').selectOption('var:0');
        await expect(page.getByTestId('guide')).toContainText(o.variations[0].name);
      }
      await expectPageAlive(page, errors);
    });
  }

  test('đang ở nước cuối thì chuyển thẳng sang khai cuộc khác (đổi địa chỉ)', async ({ page }) => {
    const errors = trackErrors(page);
    const longest = [...OPENINGS].sort((a, b) => b.moves.length - a.moves.length)[0];
    const shortest = [...OPENINGS].sort((a, b) => a.moves.length - b.moves.length)[0];
    await page.goto('/#/khai-cuoc/' + longest.id);
    await page.locator('button[title="Đến cuối"]').click();
    await page.evaluate((id) => (window.location.hash = '#/khai-cuoc/' + id), shortest.id);
    await expect(page.locator('main h1')).toHaveText(shortest.name);
    await expectPageAlive(page, errors);
    await expectStepCounterValid(page);
  });
});

test.describe('Thư viện ván cờ', () => {
  test('lọc theo thời kỳ, chủ đề, kết quả và tìm kiếm không dấu', async ({ page }) => {
    const errors = trackErrors(page);
    await page.goto('/#/van-co');
    await expect(page.locator('.game-card')).toHaveCount(GAMES.length);
    // từng thời kỳ
    for (const era of ERAS) {
      const n = GAMES.filter((g) => eraOf(g).id === era.id).length;
      await page.locator('.games-filters .tab', { hasText: era.title }).click();
      await expect(page.locator('.game-card')).toHaveCount(n);
    }
    await page.locator('.games-filters .tab', { hasText: 'Tất cả' }).click();
    // chủ đề
    const tag = 'Tấn công Vua';
    await page.locator('.chip', { hasText: tag }).click();
    await expect(page.locator('.game-card')).toHaveCount(GAMES.filter((g) => g.tags?.includes(tag)).length);
    await page.locator('.chip', { hasText: tag }).click();
    // kết quả
    await page.getByLabel('Lọc theo kết quả').selectOption('0-1');
    await expect(page.locator('.game-card')).toHaveCount(GAMES.filter((g) => g.result === '0-1').length);
    await page.getByLabel('Lọc theo kết quả').selectOption('all');
    // tìm không dấu: "morphy" và "ca phe" (Quán cà phê de la Régence)
    await page.getByLabel('Tìm ván cờ').fill('morphy');
    const morphy = GAMES.filter((g) => /morphy/i.test(`${g.title} ${g.white} ${g.black} ${g.event}`)).length;
    await expect(page.locator('.game-card')).toHaveCount(morphy);
    await page.getByLabel('Tìm ván cờ').fill('khong co van nao nhu the nay');
    await expect(page.locator('.empty-state')).toBeVisible();
    await expectPageAlive(page, errors);
  });

  test('chuyển ván trước / ván sau theo dòng thời gian', async ({ page }) => {
    const errors = trackErrors(page);
    await page.goto('/#/van-co/' + GAMES[0].id);
    await page.locator('.game-nav a', { hasText: GAMES[1].title }).click();
    await expect(page.locator('main h1')).toHaveText(GAMES[1].title);
    await page.locator('.game-nav a', { hasText: GAMES[0].title }).click();
    await expect(page.locator('main h1')).toHaveText(GAMES[0].title);
    await expectPageAlive(page, errors);
  });
});

test.describe('Ván cờ kinh điển', () => {
  for (const g of GAMES) {
    test(`${g.id}: xem đến nước cuối rồi cuộn trang`, async ({ page }) => {
      const errors = trackErrors(page);
      await page.goto('/#/van-co/' + g.id);
      await expect(page.locator('main h1')).toHaveText(g.title);
      // mỗi nước đều có lời giải thích mục đích, không có lời nhắc "tự đoán"
      const guide = page.getByTestId('guide');
      for (let i = 0; i < 8; i++) {
        await page.locator('button[title="Tiến (→)"]').click();
        const text = (await guide.innerText()).replace(/\s+/g, ' ');
        expect(text, `nước ${i + 1}`).not.toMatch(/đoán/i);
        expect(text.length, `nước ${i + 1}: "${text}"`).toBeGreaterThan(25);
      }
      await page.locator('button[title="Đến cuối"]').click();
      await expect(page.getByTestId('guide')).toContainText('Kết quả');
      if (g.source) await expect(page.locator(`a[href="${g.source}"]`)).toBeVisible();
      await scrollToBottom(page);
      await expectPageAlive(page, errors);
      await expectStepCounterValid(page);
    });
  }

  test('đang ở nước cuối thì chuyển thẳng sang ván ngắn hơn', async ({ page }) => {
    const errors = trackErrors(page);
    const longest = [...GAMES].sort((a, b) => b.moves.length - a.moves.length)[0];
    const shortest = [...GAMES].sort((a, b) => a.moves.length - b.moves.length)[0];
    await page.goto('/#/van-co/' + longest.id);
    await page.locator('button[title="Đến cuối"]').click();
    await page.evaluate((id) => (window.location.hash = '#/van-co/' + id), shortest.id);
    await expect(page.locator('main h1')).toHaveText(shortest.title);
    await expectPageAlive(page, errors);
    await expectStepCounterValid(page);
  });
});

async function clickSquare(page: Page, sq: string) {
  const box = (await page.locator('.play .board').boundingBox())!;
  const flipped = (await page.locator('.play .board .sq').first().getAttribute('data-sq')) === 'h1';
  const f = sq.charCodeAt(0) - 97;
  const r = Number(sq[1]) - 1;
  const x = flipped ? 7 - f : f;
  const y = flipped ? r : 7 - r;
  await page.mouse.click(box.x + ((x + 0.5) * box.width) / 8, box.y + ((y + 0.5) * box.height) / 8);
}

test('luyện tập: đi một nước, máy đáp lại, thầy nhận xét', async ({ page }) => {
  const errors = trackErrors(page);
  await page.goto('/#/luyen-tap');
  await page.locator('.bot-card').first().click();
  await page.locator('.choice', { hasText: 'Trắng' }).click();
  await page.getByRole('button', { name: /Bắt đầu ván đấu/ }).click();
  await expect(page.locator('.play .board')).toBeVisible();
  await clickSquare(page, 'e2');
  await clickSquare(page, 'e4');
  // máy trả lời: biên bản có 2 nửa nước
  await expect(page.locator('.movelist .mv:not(.empty)')).toHaveCount(2, { timeout: 20_000 });
  await expect(page.locator('.coach-card', { hasText: 'Nhận xét nước đi của bạn' })).toBeVisible({ timeout: 20_000 });
  await scrollToBottom(page);
  expect(errors, errors.join('\n')).toEqual([]);
  await expectNoHorizontalOverflow(page);
});
