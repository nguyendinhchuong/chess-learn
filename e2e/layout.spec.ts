import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';
import { expectFullyVisible, expectNoHorizontalOverflow, showSection, trackErrors, waitScrollSettled } from './helpers';

// Sau khi bấm ▶, lời giảng của nước vừa đi phải nằm trọn trong màn hình, ngay cạnh/ngay dưới bàn cờ;
// phần kiến thức chung nằm bên dưới khu vực học từng nước.
const SIZES = [
  { name: 'màn hình lớn 1920×1080', width: 1920, height: 1080 },
  { name: 'máy tính 1440×900', width: 1440, height: 900 },
  { name: 'laptop 1366×657', width: 1366, height: 657 },
  { name: 'laptop thấp 1280×600', width: 1280, height: 600 },
  { name: 'cửa sổ hẹp 1024×700', width: 1024, height: 700 },
  { name: 'máy tính bảng dọc 820×1180', width: 820, height: 1180 },
];

const NEXT = 'button[title="Tiến (→)"]';

async function stepAndCheck(page: Page, times: number) {
  for (let i = 0; i < times; i++) {
    await page.locator(NEXT).first().click();
    await page.waitForTimeout(120);
  }
  await page.waitForTimeout(150);
  await waitScrollSettled(page); // chờ cuộn mượt (nếu có) dừng hẳn
  await expect(page.getByTestId('guide')).toContainText(/\d+\.(\.\.)?/);
  await expectFullyVisible(page, '[data-testid=guide]', 'Lời giảng từng nước');
  await expectFullyVisible(page, NEXT, 'Nút ▶');
  // lời giảng hiện ra mà không đẩy bàn cờ khuất khỏi màn hình
  const board = page.locator('.stage-board .board, .board-col .board').first();
  const w = page.viewportSize()!.width;
  if (w > 1100) await expectFullyVisible(page, '.stage-board .board, .board-col .board', 'Bàn cờ');
  else {
    const box = (await board.boundingBox())!;
    const header = (await page.locator('.topbar').boundingBox())!;
    const visible = Math.min(box.y + box.height, page.viewportSize()!.height) - Math.max(box.y, header.y + header.height);
    expect(visible / box.height, 'bàn cờ phải còn nhìn thấy phần lớn').toBeGreaterThanOrEqual(0.6);
  }
}

function stageChecks() {
  test('khai cuộc: lời giảng luôn trong tầm nhìn, kiến thức chung ở dưới', async ({ page }) => {
    const errors = trackErrors(page);
    await page.goto('/#/khai-cuoc/ruy-lopez');
    await expect(page.locator('.stage')).toBeVisible();
    await stepAndCheck(page, 5);
    await expect(page.getByTestId('guide')).toContainText('3.'); // 3.Bb5
    await expectKnowledgeBelowStage(page);
    await expectNoHorizontalOverflow(page);
    expect(errors, errors.join('\n')).toEqual([]);
  });

  test('ván kinh điển: lời bình luôn trong tầm nhìn, câu chuyện và bài học ở dưới', async ({ page }) => {
    const errors = trackErrors(page);
    await page.goto('/#/van-co/van-co-nha-hat-opera-1858');
    await stepAndCheck(page, 9);
    await expect(page.getByTestId('guide')).toContainText('5.');
    await expectKnowledgeBelowStage(page);
    await expectNoHorizontalOverflow(page);
    expect(errors, errors.join('\n')).toEqual([]);
  });

  test('bài học: lời giảng luôn trong tầm nhìn khi bấm ▶', async ({ page }) => {
    const errors = trackErrors(page);
    await page.goto('/#/hoc/nm-ban-co-va-ky-hieu');
    await showSection(page, 4);
    await stepAndCheck(page, 3);
    await expectNoHorizontalOverflow(page);
    expect(errors, errors.join('\n')).toEqual([]);
  });
}

async function expectKnowledgeBelowStage(page: Page) {
  const stage = (await page.locator('.stage').boundingBox())!;
  const knowledge = (await page.locator('.knowledge').boundingBox())!;
  expect(knowledge.y, 'phần kiến thức chung phải nằm dưới khu vực bàn cờ').toBeGreaterThanOrEqual(stage.y + stage.height);
  const w = page.viewportSize()!.width;
  if (w > 900) {
    // màn hình rộng: lời giảng nằm ngay bên phải bàn cờ, ngang tầm mắt
    const board = (await page.locator('.stage-board').boundingBox())!;
    const guide = (await page.getByTestId('guide').boundingBox())!;
    expect(guide.x, 'lời giảng nằm bên phải bàn cờ').toBeGreaterThanOrEqual(board.x + board.width);
    expect(guide.y, 'lời giảng ngang tầm bàn cờ').toBeLessThan(board.y + board.height / 2);
  }
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
