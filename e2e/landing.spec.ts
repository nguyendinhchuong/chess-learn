import { test, expect } from '@playwright/test';
import { expectNoHorizontalOverflow, scrollToBottom, trackErrors } from './helpers';

// Trang chọn môn (#/) và hai trang giới thiệu (#/gioi-thieu/co-vua, #/gioi-thieu/co-tuong).

test('trang chọn môn: chọn cờ vua thì chuyển cảnh sang trang giới thiệu cờ vua', async ({ page }) => {
  const errors = trackErrors(page);
  await page.goto('/#/');
  await expect(page.locator('h1')).toContainText('học môn cờ nào');
  await expect(page.locator('.ld-choice')).toHaveCount(2);
  await page.locator('.ld-choice.chess').click();
  await expect(page).toHaveURL(/#\/gioi-thieu\/co-vua$/);
  await expect(page.locator('#ld-hero-title')).toContainText('Học cờ vua');
  // màn chuyển cảnh tự gỡ khỏi trang sau khi vén
  await expect(page.locator('.ld-curtain')).toHaveCount(0);
  await expectNoHorizontalOverflow(page);
  expect(errors, errors.join('\n')).toEqual([]);
});

for (const [path, name] of [
  ['co-vua', 'cờ vua'],
  ['co-tuong', 'cờ tướng'],
]) {
  test(`trang giới thiệu ${name}: cuộn hết trang, ván mẫu đi tới nước cuối`, async ({ page }) => {
    const errors = trackErrors(page);
    await page.goto('/#/gioi-thieu/' + path);
    await expect(page.locator('#ld-hero-title')).toBeVisible();
    await expect(page.locator('.ld-hero .ld-piece')).toHaveCount(32);
    await scrollToBottom(page);
    // bàn cờ ván mẫu đi theo nhịp cuộn: cuộn qua hết thì ở nửa nước cuối cùng
    await expect(page.locator('.ld-game-move .ld-muted').first()).toHaveText(/^(\d+)\/\1$/);
    // phòng minh họa của phần Chơi với bạn đi hết các khung, tới lời đề nghị hòa
    await expect(page.locator('.ld-room-offer.on')).toHaveCount(1);
    await expect(page.locator('#hoi-dap')).toHaveCount(0);
    // câu tuyên ngôn sáng hết từng chữ
    const words = await page.locator('.ld-word').count();
    await expect(page.locator('.ld-word.on')).toHaveCount(words);
    await expect(page.locator('.ld-footer')).toBeVisible();
    await expectNoHorizontalOverflow(page);
    expect(errors, errors.join('\n')).toEqual([]);
  });
}

test('dòng "Mới" ở phần mở đầu cuộn tới phần Chơi với bạn, nút tạo phòng dẫn tới trang tạo phòng', async ({ page }) => {
  const errors = trackErrors(page);
  await page.goto('/#/gioi-thieu/co-vua');
  await page.locator('.ld-announce').click();
  const section = page.locator('#choi-voi-ban');
  await expect(section.locator('h2')).toBeInViewport();
  // phòng còn chờ người thứ hai: lời mời hiện mã phòng
  await expect(page.locator('.ld-room-invite.on')).toContainText('QH8VNT');
  await expect(section.getByRole('link', { name: 'Tạo phòng chơi cờ vua' })).toHaveAttribute('href', '#/phong');
  await expectNoHorizontalOverflow(page);
  expect(errors, errors.join('\n')).toEqual([]);
});

test('chân trang: nút Quyền riêng tư mở phần giải thích dữ liệu được lưu', async ({ page }) => {
  await page.goto('/#/gioi-thieu/co-tuong');
  const btn = page.getByRole('button', { name: 'Quyền riêng tư' });
  const panel = page.locator('#quyen-rieng-tu');
  await expect(panel).toBeHidden();
  await btn.click();
  await expect(panel).toBeVisible();
  await expect(panel).toContainText('Phòng bị xóa sau 3 ngày');
  await expect(btn).toHaveAttribute('aria-expanded', 'true');
});

test('trang giới thiệu không tồn tại hiện trang 404 có đường về', async ({ page }) => {
  await page.goto('/#/gioi-thieu/khong-co');
  await expect(page.locator('.ld-404 h1')).toBeVisible();
  await page.locator('.ld-404 a').click();
  await expect(page.locator('.ld-choice')).toHaveCount(2);
});
