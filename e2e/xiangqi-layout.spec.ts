import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';
import { XQ_OPENINGS } from '../src/xiangqi/data/openings';
import { XQ_GAMES } from '../src/xiangqi/data/games/index';
import { XQ_LESSONS } from '../src/xiangqi/data/lessons';
import { expectFullyVisible, expectNoHorizontalOverflow, showSection, trackErrors, waitScrollSettled } from './helpers';

// Bàn cờ tướng cao hơn bàn cờ vua (9 × 10 điểm): sau khi bấm ▶, lời giảng và nút ▶ vẫn phải nằm trọn trong màn hình
// mà bàn cờ vẫn nhìn thấy được – trên đủ các kích thước màn hình như phần cờ vua.
const SIZES = [
  { name: 'màn hình lớn 1920×1080', width: 1920, height: 1080 },
  { name: 'máy tính 1440×900', width: 1440, height: 900 },
  { name: 'laptop 1366×657', width: 1366, height: 657 },
  { name: 'laptop thấp 1280×600', width: 1280, height: 600 },
  { name: 'cửa sổ hẹp 1024×700', width: 1024, height: 700 },
  { name: 'máy tính bảng dọc 820×1180', width: 820, height: 1180 },
];

const NEXT = 'button[title="Tiến (→)"]';
const BOARD = '.stage-board .xq-board, .board-col .xq-board';

async function stepAndCheck(page: Page, times: number) {
  for (let i = 0; i < times; i++) {
    await page.locator(NEXT).first().click();
    await page.waitForTimeout(120);
  }
  await page.waitForTimeout(150);
  await waitScrollSettled(page);
  await expect(page.getByTestId('guide')).toContainText(/\d+\.(\.\.)?/);
  await expectFullyVisible(page, '[data-testid=guide]', 'Lời giảng từng nước');
  await expectFullyVisible(page, NEXT, 'Nút ▶');
  const w = page.viewportSize()!.width;
  if (w > 1100) await expectFullyVisible(page, BOARD, 'Bàn cờ');
  else {
    const box = (await page.locator(BOARD).first().boundingBox())!;
    const header = (await page.locator('.topbar').boundingBox())!;
    const visible = Math.min(box.y + box.height, page.viewportSize()!.height) - Math.max(box.y, header.y + header.height);
    expect(visible / box.height, 'bàn cờ phải còn nhìn thấy phần lớn').toBeGreaterThanOrEqual(0.6);
  }
}

const opening = XQ_OPENINGS[0];
const game = XQ_GAMES[0];
const lesson = XQ_LESSONS.find((l) => l.sections.some((s) => (s.diagram?.moves ?? '').trim().split(/\s+/).length >= 4));

function stageChecks() {
  if (opening)
    test('khai cuộc cờ tướng: lời giảng luôn trong tầm nhìn', async ({ page }) => {
      const errors = trackErrors(page);
      await page.goto('/#/co-tuong/khai-cuoc/' + opening.id);
      await expect(page.locator('.stage')).toBeVisible();
      await stepAndCheck(page, 5);
      await expectNoHorizontalOverflow(page);
      expect(errors, errors.join('\n')).toEqual([]);
    });
  if (game)
    test('ván cờ tướng kinh điển: lời bình luôn trong tầm nhìn', async ({ page }) => {
      const errors = trackErrors(page);
      await page.goto('/#/co-tuong/van-co/' + game.id);
      await stepAndCheck(page, 9);
      await expectNoHorizontalOverflow(page);
      expect(errors, errors.join('\n')).toEqual([]);
    });
  if (lesson)
    test('bài học cờ tướng: lời giảng luôn trong tầm nhìn khi bấm ▶', async ({ page }) => {
      const errors = trackErrors(page);
      await page.goto('/#/co-tuong/hoc/' + lesson.id);
      await showSection(page, lesson.sections.findIndex((s) => (s.diagram?.moves ?? '').trim().split(/\s+/).length >= 4));
      await stepAndCheck(page, 3);
      await expectNoHorizontalOverflow(page);
      expect(errors, errors.join('\n')).toEqual([]);
    });
}

for (const size of SIZES) {
  test.describe(size.name, () => {
    test.use({ viewport: { width: size.width, height: size.height } });
    test.skip(({ isMobile }) => !!isMobile, 'kích thước màn hình máy tính chỉ chạy ở dự án desktop');
    stageChecks();
  });
}

test.describe('điện thoại', () => {
  test.skip(({ isMobile }) => !isMobile, 'chỉ chạy ở dự án mobile');
  stageChecks();
});
