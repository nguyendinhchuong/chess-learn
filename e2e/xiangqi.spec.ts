import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';
import { XQ_LESSONS } from '../src/xiangqi/data/lessons';
import { XQ_OPENINGS } from '../src/xiangqi/data/openings';
import { XQ_GAMES, XQ_ERAS, xqEraOf } from '../src/xiangqi/data/games/index';
import { XQ_PUZZLES, XQ_PUZZLE_LEVELS } from '../src/xiangqi/data/puzzles';
import { playLine } from '../src/xiangqi/engine/board';
import { expectNoHorizontalOverflow, expectPageAlive, expectStepCounterValid, scrollToBottom, scrollToTop, showSection, trackErrors } from './helpers';

/** Bấm vào giao điểm `sq` (vd "h2") của bàn cờ tướng trong vùng `scope` */
async function clickPoint(page: Page, scope: string, sq: string) {
  const board = page.locator(`${scope} .xq-board`).first();
  await board.evaluate((el) => el.scrollIntoView({ block: 'center' }));
  const field = board.locator('.xq-field');
  const box = (await field.boundingBox())!;
  const flipped = (await board.locator('.xq-nums.top').getAttribute('class'))?.includes('red') ?? false;
  const f = sq.charCodeAt(0) - 97;
  const r = Number(sq[1]);
  const x = flipped ? 8 - f : f;
  const y = flipped ? r : 9 - r;
  await page.mouse.click(box.x + ((x + 0.5) * box.width) / 9, box.y + ((y + 0.5) * box.height) / 10);
}

async function playMove(page: Page, scope: string, uci: string) {
  await clickPoint(page, scope, uci.slice(0, 2));
  await clickPoint(page, scope, uci.slice(2, 4));
}

test.describe('Chọn môn cờ', () => {
  test('chuyển qua lại giữa cờ vua và cờ tướng, giữ nguyên mục đang xem', async ({ page }) => {
    const errors = trackErrors(page);
    await page.goto('/#/khai-cuoc');
    await expect(page.locator('main h1')).toContainText('khai cuộc');
    await page.locator('.game-switch a[title="Cờ tướng"]').click();
    await expect(page).toHaveURL(/#\/co-tuong\/khai-cuoc$/);
    await expect(page.locator('main h1')).toContainText('cờ tướng');
    await expect(page.locator('.app')).toHaveClass(/xq-mode/);
    await page.locator('.game-switch a[title="Cờ vua"]').click();
    await expect(page).toHaveURL(/#\/khai-cuoc$/);
    await expect(page.locator('.app')).not.toHaveClass(/xq-mode/);
    await expectPageAlive(page, errors);
  });

  test('trang chủ cờ tướng là trang giới thiệu; đổi kiểu chữ trên quân', async ({ page }) => {
    const errors = trackErrors(page);
    await page.goto('/#/co-tuong');
    await expect(page.locator('#ld-hero-title')).toContainText('cờ tướng');
    // khai cuộc mở ở thế ban đầu: đủ 32 quân để thử nút đổi chữ Hán / chữ Việt
    await page.goto('/#/co-tuong/khai-cuoc/' + XQ_OPENINGS[0].id);
    await expect(page.locator('.stage .xq-piece')).toHaveCount(32);
    await page.locator('.top-actions button', { hasText: 'Aa' }).click();
    await expect(page.locator('html')).toHaveAttribute('data-xqpieces', 'viet');
    await expect(page.locator('.stage .xq-piece .vi').first()).toBeVisible();
    await page.locator('.top-actions button', { hasText: '字' }).click();
    await expect(page.locator('html')).toHaveAttribute('data-xqpieces', 'han');
    await scrollToBottom(page);
    await expectPageAlive(page, errors);
  });
});

test.describe('Cờ tướng – bài học', () => {
  test('thư viện bài học', async ({ page }) => {
    const errors = trackErrors(page);
    await page.goto('/#/co-tuong/hoc');
    await expect(page.locator('.lesson-card')).toHaveCount(XQ_LESSONS.length);
    await expectPageAlive(page, errors);
  });

  for (const lesson of XQ_LESSONS) {
    const stepped = lesson.sections.map((s, i) => (s.diagram?.moves?.trim() ? i : -1)).filter((i) => i >= 0);
    test(`${lesson.id}: xem hết từng sơ đồ rồi cuộn xuống cuối`, async ({ page }) => {
      const errors = trackErrors(page);
      await page.goto('/#/co-tuong/hoc/' + lesson.id);
      await expect(page.locator('main h1')).toHaveText(lesson.title);
      for (const i of stepped) {
        await scrollToTop(page);
        await showSection(page, i);
        const end = page.locator('.board-col button[title="Đến cuối"]');
        if (await end.isEnabled()) await end.click();
        await page.waitForTimeout(900);
        await scrollToBottom(page);
        await expectPageAlive(page, errors);
        await expectStepCounterValid(page);
      }
      if (!stepped.length) {
        await scrollToBottom(page);
        await expectPageAlive(page, errors);
      }
    });
  }
});

test.describe('Cờ tướng – khai cuộc', () => {
  for (const o of XQ_OPENINGS) {
    test(`${o.id}: xem hết diễn biến, các biến, bẫy rồi cuộn trang`, async ({ page }) => {
      const errors = trackErrors(page);
      await page.goto('/#/co-tuong/khai-cuoc/' + o.id);
      await expect(page.locator('main h1')).toHaveText(o.name);
      await page.locator('button[title="Đến cuối"]').click();
      await scrollToBottom(page);
      await expectPageAlive(page, errors);
      const items = page.locator('.knowledge .line-item');
      const n = await items.count();
      expect(n).toBe(o.variations.length + o.traps.length);
      for (let i = 0; i < n; i++) {
        await items.nth(i).click();
        const end = page.locator('button[title="Đến cuối"]');
        if (await end.isEnabled()) await end.click();
        await expectStepCounterValid(page);
      }
      await expectPageAlive(page, errors);
    });
  }
});

test.describe('Cờ tướng – ván kinh điển', () => {
  test('lọc theo thời kỳ và tìm kiếm không dấu', async ({ page }) => {
    const errors = trackErrors(page);
    await page.goto('/#/co-tuong/van-co');
    await expect(page.locator('.game-card')).toHaveCount(XQ_GAMES.length);
    for (const era of XQ_ERAS) {
      const n = XQ_GAMES.filter((g) => xqEraOf(g).id === era.id).length;
      await page.locator('.games-filters .tab', { hasText: era.title }).click();
      await expect(page.locator('.game-card')).toHaveCount(n);
    }
    await page.locator('.games-filters .tab', { hasText: 'Tất cả' }).click();
    await page.getByLabel('Tìm ván cờ').fill('khong co van nao nhu the nay');
    await expect(page.locator('.empty-state')).toBeVisible();
    await expectPageAlive(page, errors);
  });

  for (const g of XQ_GAMES) {
    test(`${g.id}: xem đến nước cuối rồi cuộn trang`, async ({ page }) => {
      const errors = trackErrors(page);
      await page.goto('/#/co-tuong/van-co/' + g.id);
      await expect(page.locator('main h1')).toHaveText(g.title);
      const guide = page.getByTestId('guide');
      for (let i = 0; i < 8; i++) {
        await page.locator('button[title="Tiến (→)"]').click();
        const text = (await guide.innerText()).replace(/\s+/g, ' ');
        expect(text.length, `nước ${i + 1}: "${text}"`).toBeGreaterThan(25);
      }
      await page.locator('button[title="Đến cuối"]').click();
      await expect(guide).toContainText('Kết quả');
      await scrollToBottom(page);
      await expectPageAlive(page, errors);
      await expectStepCounterValid(page);
    });
  }
});

test.describe('Cờ tướng – cờ thế', () => {
  test('danh sách cấp độ', async ({ page }) => {
    const errors = trackErrors(page);
    await page.goto('/#/co-tuong/co-the');
    await expect(page.locator('.level-card')).toHaveCount(XQ_PUZZLE_LEVELS.length);
    for (const [i, l] of XQ_PUZZLE_LEVELS.entries()) {
      await page.locator('.level-card').nth(i).click();
      await expect(page.locator('.cat-banner h2')).toContainText(l.name);
      await expect(page.locator('.puzzle-card')).toHaveCount(XQ_PUZZLES.filter((p) => p.level === l.level).length);
    }
    await expectPageAlive(page, errors);
  });

  const first = XQ_PUZZLES.find((p) => p.level === 2) ?? XQ_PUZZLES[0];
  if (first) {
    test(`giải bài ${first.id}: đi đúng từng nước, đối thủ đáp, lưu tiến độ`, async ({ page }) => {
      const errors = trackErrors(page);
      await page.goto('/#/co-tuong/co-the/' + first.id);
      const line = playLine(first.solution, first.fen);
      for (let i = 0; i < line.ucis.length; i += 2) {
        await playMove(page, '.stage', line.ucis[i]);
        if (i + 1 < line.ucis.length) await expect(page.locator('.stage .movelist .mv:not(.empty)')).toHaveCount(i + 2, { timeout: 5000 });
      }
      await expect(page.getByTestId('guide')).toContainText('Giải xong');
      await expect(page.locator('.knowledge')).toContainText('Lời giải thích');
      await expectPageAlive(page, errors);
    });
  }
});

test('cờ tướng – luyện tập: đi Pháo đầu, máy đáp lại, thầy nhận xét', async ({ page }) => {
  const errors = trackErrors(page);
  await page.goto('/#/co-tuong/luyen-tap');
  await page.locator('.bot-card').first().click();
  await page.locator('.choice', { hasText: 'Đỏ' }).click();
  await page.getByRole('button', { name: /Bắt đầu ván đấu/ }).click();
  await expect(page.locator('.play .xq-board')).toBeVisible();
  await playMove(page, '.play', 'h2e2');
  await expect(page.locator('.movelist .mv:not(.empty)')).toHaveCount(2, { timeout: 20_000 });
  await expect(page.locator('.coach-card', { hasText: 'Nhận xét nước đi của bạn' })).toBeVisible({ timeout: 20_000 });
  await scrollToBottom(page);
  expect(errors, errors.join('\n')).toEqual([]);
  await expectNoHorizontalOverflow(page);
});
