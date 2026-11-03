/** Bỏ dấu tiếng Việt và viết thường – dùng cho ô tìm kiếm ("Lê Quang Liêm" ~ "le quang liem") */
export function normalizeVi(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();
}
