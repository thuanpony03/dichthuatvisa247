// Sinh ảnh placeholder xám (webp) cho các ảnh thật chưa có, đúng Mục 9.3 của brief.
// Chạy: node scripts/gen-placeholders.mjs
// An toàn để chạy lại nhiều lần: tự động BỎ QUA các ảnh đã là ảnh thật (xem danh sách REAL_PHOTOS),
// không ghi đè. Muốn tái tạo placeholder cho một ảnh thật, tự xoá file đó trước rồi chạy lại.
import sharp from 'sharp';
import { mkdir, access } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');

// Ảnh thật đã thay (lấy từ hồ sơ khách thật, đã che thông tin cá nhân) — xem README mục Ảnh giấy tờ.
const REAL_PHOTOS = new Set([
  'img/moc-do.webp',
  'img/ban-dich-1.webp',
  'img/ban-dich-2.webp',
  'img/ban-dich-3.webp',
  'img/mau-dich/ct07-xac-nhan-cu-tru.webp',
  'img/mau-dich/giay-khai-sinh.webp',
  'img/mau-dich/dang-ky-ket-hon.webp',
  'img/mau-dich/so-tiet-kiem.webp',
  'img/mau-dich/so-bao-hiem-xa-hoi.webp',
  'img/mau-dich/giay-phep-kinh-doanh.webp',
  'img/mau-dich/hop-dong-lao-dong.webp',
  'img/mau-dich/so-do-so-hong.webp',
  'img/mau-dich/so-ho-khau.webp',
  'img/mau-dich/sao-ke-ngan-hang.webp',
  'img/mau-dich/xac-nhan-thu-nhap.webp',
  'img/mau-dich/giay-chung-nhan-nghi-huu.webp',
  'img/mau-dich/ly-lich-tu-phap.webp',
  'img/mau-dich/xac-nhan-doc-than.webp',
  'img/mau-dich/quyet-dinh-bo-nhiem.webp',
  'img/mau-dich/giay-uy-quyen.webp',
  'img/mau-dich/dang-ky-xe.webp',
]);

function escapeXml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function docSvg({ width, height, label, sub, watermark }) {
  const wm = watermark
    ? `<g opacity="0.15">
        <text x="50%" y="50%" transform="rotate(-30 ${width / 2} ${height / 2})"
          text-anchor="middle" font-family="sans-serif" font-size="${Math.round(width / 14)}" font-weight="700" fill="#0F1B33">
          dichthuatvisa247.vn
        </text>
      </g>`
    : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="100%" height="100%" fill="#E7E9EE"/>
    <rect x="12" y="12" width="${width - 24}" height="${height - 24}" fill="none" stroke="#B7C0D4" stroke-width="4" stroke-dasharray="14 10"/>
    <text x="50%" y="46%" text-anchor="middle" font-family="sans-serif" font-size="${Math.round(width / 22)}" font-weight="700" fill="#1E2F52">
      ${escapeXml(label)}
    </text>
    <text x="50%" y="54%" text-anchor="middle" font-family="sans-serif" font-size="${Math.round(width / 34)}" fill="#3B4A6B">
      ${escapeXml(sub)}
    </text>
    <text x="50%" y="94%" text-anchor="middle" font-family="sans-serif" font-size="${Math.round(width / 40)}" fill="#8B95AB">
      Placeholder ${width}×${height} — thay ảnh thật trước khi deploy
    </text>
    ${wm}
  </svg>`;
}

async function makeImage(relPath, opts) {
  if (REAL_PHOTOS.has(relPath)) {
    console.log('⏭  bỏ qua (đã là ảnh thật):', relPath);
    return;
  }
  const outPath = path.join(ROOT, 'public', relPath);
  await mkdir(path.dirname(outPath), { recursive: true });
  const svg = docSvg(opts);
  await sharp(Buffer.from(svg)).webp({ quality: 82 }).toFile(outPath);
  console.log('✓', relPath);
}

const DOC_W = 1000;
const DOC_H = 1300;
const OG_W = 1200;
const OG_H = 630;

const mauDichSlugs = [
  ['ct07-xac-nhan-cu-tru', 'Giấy xác nhận thông tin cư trú (CT07)'],
  ['so-ho-khau', 'Sổ hộ khẩu (đã hết hiệu lực)'],
  ['giay-khai-sinh', 'Giấy khai sinh'],
  ['dang-ky-ket-hon', 'Đăng ký kết hôn'],
  ['so-tiet-kiem', 'Sổ tiết kiệm'],
  ['xac-nhan-thu-nhap', 'Xác nhận thu nhập'],
  ['hop-dong-lao-dong', 'Hợp đồng lao động'],
  ['giay-phep-kinh-doanh', 'Giấy phép kinh doanh'],
  ['so-do-so-hong', 'Sổ đỏ / sổ hồng'],
  ['dang-ky-xe', 'Đăng ký xe'],
  ['ly-lich-tu-phap', 'Lý lịch tư pháp'],
  ['sao-ke-ngan-hang', 'Sao kê ngân hàng'],
  ['quyet-dinh-bo-nhiem', 'Quyết định bổ nhiệm'],
  ['giay-uy-quyen', 'Giấy uỷ quyền'],
  ['xac-nhan-doc-than', 'Xác nhận độc thân'],
  ['giay-chung-nhan-nghi-huu', 'Giấy chứng nhận nghỉ hưu'],
  ['so-bao-hiem-xa-hoi', 'Sổ bảo hiểm xã hội'],
];

async function run() {
  await makeImage('img/moc-do.webp', {
    width: DOC_W,
    height: DOC_H,
    label: 'ẢNH MỘC ĐỎ',
    sub: 'Bản dịch có dấu mộc công ty + xác nhận dịch',
    watermark: false,
  });

  for (const i of [1, 2, 3]) {
    await makeImage(`img/ban-dich-${i}.webp`, {
      width: DOC_W,
      height: DOC_H,
      label: `ẢNH BẰNG CHỨNG #${i}`,
      sub: 'Bản dịch thật đã che thông tin cá nhân',
      watermark: false,
    });
  }

  for (const [slug, label] of mauDichSlugs) {
    await makeImage(`img/mau-dich/${slug}.webp`, {
      width: DOC_W,
      height: DOC_H,
      label: label,
      sub: 'Ảnh mẫu dịch — cần watermark logo+domain opacity 15% khi thay ảnh thật',
      watermark: true,
    });
  }

  const ogSets = ['default', 'mau-dich', 'visa', 'agency', 'lp'];
  for (const name of ogSets) {
    await makeImage(`img/og/${name}.webp`, {
      width: OG_W,
      height: OG_H,
      label: 'Dịch Thuật Visa 247',
      sub: `Ảnh OG — cụm "${name}"`,
      watermark: false,
    });
  }

  console.log('\nHoàn tất placeholder. Danh sách ảnh cần thay ảnh thật: xem README.md.');
}

run();
