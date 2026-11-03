import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';
import { PUZZLES, PUZZLE_LEVELS } from '../src/data/puzzles';
import { playLine } from '../src/engine/board';
import { expectNoHorizontalOverflow, expectPageAlive, scrollToBottom, trackErrors } from './helpers';

async function clickSquare(page: Page, sq: string) {
  const board = page.locator('.stage .board');
  // màn hình hẹp: bàn cờ có thể đã bị cuộn khuất (dưới thanh tiêu đề) sau khi bấm nút bên dưới
  await board.evaluate((el) => el.scrollIntoView({ block: 'center' }));
  const box = (await board.boundingBox())!;
  const flipped = (await board.locator('.sq').first().getAttribute('data-sq')) === 'h1';
  const f = sq.charCodeAt(0) - 97;
  const r = Number(sq[1]) - 1;
  const x = flipped ? 7 - f : f;
  const y = flipped ? r : 7 - r;
  await page.mouse.click(box.x + ((x + 0.5) * box.width) / 8, box.y + ((y + 0.5) * box.height) / 8);
}

/** Đi một nước (UCI) bằng cách bấm ô đi rồi ô đến; phong cấp thì chọn quân trong bảng chọn */
async function playMove(page: Page, uci: string) {
  await clickSquare(page, uci.slice(0, 2));
  await clickSquare(page, uci.slice(2, 4));
  if (uci[4]) await page.locator('.promo-choice').nth(['q', 'n', 'r', 'b'].indexOf(uci[4])).click();
}

const guide = (page: Page) => page.getByTestId('guide');

test('cờ thế: danh sách cấp độ và chuyển cấp', async ({ page }) => {
  const errors = trackErrors(page);
  await page.goto('/#/co-the');
  await expect(page.locator('main h1')).toContainText('Cờ thế');
  await expect(page.locator('.level-card')).toHaveCount(PUZZLE_LEVELS.length);
  for (const [i, l] of PUZZLE_LEVELS.entries()) {
    await page.locator('.level-card').nth(i).click();
    await expect(page.locator('.cat-banner h2')).toContainText(l.name);
    await expect(page.locator('.puzzle-card')).toHaveCount(PUZZLES.filter((p) => p.level === l.level).length);
  }
  await scrollToBottom(page);
  await expectPageAlive(page, errors);
});

test('cờ thế: đi sai, đi đúng, giải xong và lưu tiến độ', async ({ page }) => {
  const errors = trackErrors(page);
  await page.goto('/#/co-the/hang-cuoi-co-ban');
  await playMove(page, 'd1d7');
  await expect(guide(page)).toContainText('chưa phải nước đúng');
  // nước sai được trả lại, Xe về d1
  await expect(page.locator('.stage .piece[data-sq="d1"]')).toHaveCount(1, { timeout: 5000 });
  await playMove(page, 'd1d8');
  await expect(guide(page)).toContainText('Giải xong');
  await expect(page.locator('.knowledge')).toContainText('Lời giải thích');
  await expectPageAlive(page, errors);
  await page.goto('/#/co-the?cap=1');
  await expect(page.locator('.puzzle-card.solved')).toHaveCount(1);
});

test('cờ thế: đối thủ đáp lại, gợi ý và xem lời giải', async ({ page }) => {
  const errors = trackErrors(page);
  await page.goto('/#/co-the/morphy-nha-hat-opera');
  await page.getByRole('button', { name: /Gợi ý/ }).click();
  await expect(page.locator('.puzzle-hint')).toBeVisible();
  await playMove(page, 'b3b8');
  await expect(guide(page)).toContainText('Đối thủ đáp', { timeout: 5000 });
  await playMove(page, 'd1d8');
  await expect(guide(page)).toContainText('có dùng gợi ý');

  await page.goto('/#/co-the/ivanchuk-yusupov-1991');
  await page.getByRole('button', { name: /Xem lời giải/ }).click();
  await expect(page.locator('.step-counter')).toHaveText('Nước 3/3', { timeout: 10_000 });
  await expectPageAlive(page, errors);
  await expectNoHorizontalOverflow(page);
});

// Mọi bài đều giải được qua giao diện (chỉ chạy trên màn hình rộng cho nhanh)
test.describe('giải từng bài cờ thế', () => {
  for (const p of PUZZLES) {
    test(`${p.id}`, async ({ page }, info) => {
      test.skip(info.project.name !== 'desktop', 'chỉ chạy trên màn hình rộng');
      const errors = trackErrors(page);
      await page.goto('/#/co-the/' + p.id);
      await expect(page.locator('main h1')).toHaveText(p.title);
      const line = playLine(p.solution, p.fen);
      for (let i = 0; i < line.ucis.length; i += 2) {
        if (i > 0) await expect(page.locator('.stage .board.interactive')).toBeVisible({ timeout: 5000 });
        await playMove(page, line.ucis[i]);
      }
      await expect(guide(page)).toContainText('Giải xong');
      await expectPageAlive(page, errors);
    });
  }
});
