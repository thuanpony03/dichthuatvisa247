// NGUỒN DỮ LIỆU DUY NHẤT cho toàn site: giá, liên hệ, tracking.
// Sửa giá trị ở đây → toàn bộ site cập nhật theo. Không hardcode giá/SĐT ở nơi khác.

export const site = {
  name: 'Dịch Thuật Visa 247',
  domain: 'https://dichthuatvisa247.com',
  locale: 'vi',
  // Địa chỉ dùng cho schema LocalBusiness — lấy từ văn phòng thật của Passport Lounge (đơn vị vận hành),
  // theo xác nhận của chủ site. Văn phòng Hà Nội (Số 1 Đào Duy Anh, Đống Đa) hiển thị riêng ở /lien-he/.
  business: {
    legalName: 'Dịch Thuật Visa 247',
    operatedBy: 'Passport Lounge',
    addressLocality: 'Phường Tân Định, Quận 1',
    addressRegion: 'TP.HCM',
    addressCountry: 'VN',
    streetAddress: '192 Trần Quang Khải',
    postalCode: '', // Chưa có — không bắt buộc cho schema LocalBusiness
  },
  hanoiOffice: 'Số 1 Đào Duy Anh, Đống Đa, Hà Nội',
} as const;

export const contact = {
  personName: 'Mr Thuận',
  phoneDisplay: '0394 180 613',
  phoneTel: '0394180613', // dùng trong href="tel:"
  zaloUrl: 'https://zalo.me/0394180613',
  fanpageUrl: 'https://www.facebook.com/dichthuatvisa247',
  hours: '7h30–21h30 mỗi ngày',
  responseTime: 'Phản hồi trong 5 phút',
} as const;

// Author schema cho Article (E-E-A-T machine-readable) — dùng cho blog, mẫu dịch, trang visa.
// Mô tả chỉ nêu vai trò thật, không bịa số năm/số hồ sơ chưa xác nhận được.
export const authorPerson = {
  name: contact.personName,
  description: 'Phụ trách vận hành dịch vụ dịch thuật hồ sơ visa tại Dịch Thuật Visa 247, trực tiếp xử lý hồ sơ dịch thuật cho khách lẻ và đại lý visa/du lịch.',
} as const;

// Người liên hệ thứ 2 — hiển thị song song với contact chính ở Header/Footer/Liên hệ.
// utmContent riêng để tách biệt số liệu theo dõi giữa 2 số.
export const contact2 = {
  personName: 'Ms Trâm',
  phoneDisplay: '0866 049 694',
  phoneTel: '0866049694',
  zaloUrl: 'https://zalo.me/0866049694',
} as const;

// ---------------------------------------------------------------------------
// GIÁ — Mục 5 của brief. Đổi số ở đây, toàn site tự cập nhật.
// ---------------------------------------------------------------------------

export type PerPagePlan = {
  id: string;
  label: string;
  pricePerPage: number;
  turnaround: string;
  note?: string;
};

// 5.1 — Giá theo trang
export const perPagePricing: PerPagePlan[] = [
  { id: 'thuong', label: 'Bình thường', pricePerPage: 20000, turnaround: '3–5 ngày làm việc' },
  { id: 'gap48', label: 'Gấp 48 giờ', pricePerPage: 35000, turnaround: 'Trong 48 giờ' },
  { id: 'gap24', label: 'Gấp 24 giờ', pricePerPage: 42000, turnaround: 'Trong 24 giờ' },
  { id: 'sieugap', label: 'Siêu gấp (trong ngày)', pricePerPage: 60000, turnaround: 'Giao trong ngày, trước 17h' },
  {
    id: 'khachquen',
    label: 'Khách quen / Agency',
    pricePerPage: 17000,
    turnaround: '3–5 ngày',
    note: 'Từ 15 hồ sơ/tháng',
  },
];

// 5.1b — Ngôn ngữ khác ngoài tiếng Anh (dịch vụ phụ, tiếng Anh vẫn là trọng tâm chính).
// Giá scale x2 từ giá tiếng Anh — phản ánh đúng thực tế: tiếng Anh đã có sẵn quy trình
// tự động hoá (khuôn mẫu, thuật ngữ dựng sẵn cho từng loại giấy tờ) nên rẻ hơn, các ngôn ngữ
// khác chưa có hạ tầng đó nên thao tác thủ công nhiều hơn. Không dùng cho SEO/Ads chính,
// chỉ hiển thị như dịch vụ có sẵn khi khách hỏi.
export const otherLanguages = ['Trung', 'Nhật', 'Hàn', 'Pháp', 'Đức', 'Nga'] as const;

export const otherLanguagePricing: PerPagePlan[] = perPagePricing
  .filter((p) => p.id !== 'khachquen')
  .map((p) => ({ ...p, pricePerPage: p.pricePerPage * 2 }));

export type BundlePlan = {
  id: string;
  label: string;
  price: number;
  pageLimit: number;
  turnaround: string;
  popular?: boolean;
};

// 5.2 — Gói trọn hồ sơ (sản phẩm chủ lực)
export const bundlePricing: BundlePlan[] = [
  {
    id: 'bundle-standard',
    label: 'Hồ sơ visa du lịch — tiêu chuẩn',
    price: 400000,
    pageLimit: 30,
    turnaround: '3–5 ngày',
  },
  {
    id: 'bundle-24h',
    label: 'Hồ sơ visa du lịch — gấp 24h',
    price: 750000,
    pageLimit: 30,
    turnaround: 'Trong 24h',
    popular: true,
  },
];

export const bundleOverageFeePerPage = 12000; // Vượt 30 trang: +12.000đ/trang

export const bundleExplainer =
  'Bộ hồ sơ visa du lịch thường gồm 20–30 trang: xác nhận cư trú, khai sinh, kết hôn, sổ tiết kiệm, xác nhận thu nhập, hợp đồng lao động, giấy phép kinh doanh, sổ đỏ, đăng ký xe. Gói trọn hồ sơ cho anh/chị biết trước tổng chi phí, không phát sinh.';

export type AgencyTier = {
  id: string;
  volumeLabel: string;
  bundlePrice: number | 'thoathuan';
  perPagePrice: number | 'thoathuan';
};

// 5.3 — Giá đại lý. Render ở /agency/ và /bang-gia/ (công khai theo quyết định chủ site 2026-07-21) —
// luôn hiển thị kèm điều kiện khối lượng tối thiểu (từ 15 hồ sơ/tháng) để không gây nhầm với giá lẻ.
export const agencyPricing: AgencyTier[] = [
  { id: 'tier-1', volumeLabel: '15–29 hồ sơ', bundlePrice: 340000, perPagePrice: 17000 },
  { id: 'tier-2', volumeLabel: '30–49 hồ sơ', bundlePrice: 320000, perPagePrice: 15000 },
  { id: 'tier-3', volumeLabel: '50+ hồ sơ', bundlePrice: 'thoathuan', perPagePrice: 'thoathuan' },
];

export function formatVnd(amount: number): string {
  return amount.toLocaleString('vi-VN') + 'đ';
}

// ---------------------------------------------------------------------------
// TRACKING — Mục 7 của brief. Dán mã thật vào đây, không sửa component.
// ---------------------------------------------------------------------------

export const tracking = {
  googleAdsId: 'AW-XXXXXXXXX', // TODO: dán Google Ads Conversion ID thật
  googleAdsConversionZalo: 'AW-XXXXXXXXX/YYYYYYYY', // TODO: conversion label cho zalo_click
  googleAdsConversionCall: 'AW-XXXXXXXXX/ZZZZZZZZ', // TODO: conversion label cho call_click
  ga4Id: 'G-W8WVZEXRCV',
  fbPixelId: 'XXXXXXXXXXXXXXX', // TODO: dán Facebook Pixel ID thật
} as const;

// Nhãn UTM content theo từng vị trí đặt nút Zalo trên site (Mục 7c)
export const utmContent = {
  hero: 'hero',
  banggia: 'banggia',
  mauDich: (slug: string) => `mau-dich-${slug}`,
  visa: (slug: string) => `visa-${slug}`,
  agency: 'agency',
  sticky: 'sticky',
  cuoi: 'cuoi',
  floatingBubble: 'floating-bubble',
  // Dịch vụ ngoài dịch thuật (Mục "Dịch vụ visa") — theo dõi riêng để biết dịch vụ nào khách quan tâm nhất
  tuVanVisa: 'dv-tu-van-visa',
  trongGoiVisa: 'dv-tron-goi-visa',
  finalCheck: 'dv-final-check',
  homeDichVu: 'home-dich-vu-visa',
  mauDichUpsell: (slug: string) => `upsell-final-check-${slug}`,
} as const;

// ---------------------------------------------------------------------------
// DỊCH VỤ NGOÀI DỊCH THUẬT — upsell cho khách đã/đang dùng dịch vụ dịch thuật.
// Dịch thuật vẫn là sản phẩm chính của site; các dịch vụ này chỉ xuất hiện ở
// /dich-vu-visa/ + 1-2 điểm chạm nhỏ (trang chủ, trang mẫu dịch), không đưa lên nav chính.
// Không có giá niêm yết vì mỗi ca phụ thuộc loại visa/độ phức tạp hồ sơ — Zalo báo giá riêng.
// ---------------------------------------------------------------------------

export type ExtraService = {
  id: string;
  title: string;
  tag: string;
  desc: string;
  bullets: string[];
  utm: string;
};

export const extraServices: ExtraService[] = [
  {
    id: 'tu-van-visa',
    title: 'Tư vấn visa',
    tag: 'Tư vấn',
    desc: 'Chưa rõ nên xin loại visa nào, chuẩn bị giấy tờ gì, nộp ở đâu — tư vấn hướng đi phù hợp với hồ sơ cá nhân trước khi bắt tay chuẩn bị.',
    bullets: [
      'Xác định loại visa & lãnh sự phù hợp với mục đích chuyến đi',
      'Danh sách giấy tờ cần chuẩn bị, giấy nào cần dịch/công chứng',
      'Góp ý hồ sơ trước khi nộp để giảm rủi ro bị yêu cầu bổ sung',
    ],
    utm: utmContent.tuVanVisa,
  },
  {
    id: 'tron-goi-visa',
    title: 'Dịch vụ visa trọn gói',
    tag: 'Trọn gói',
    desc: 'Không có thời gian tự làm — chúng tôi lo từ tư vấn, gom giấy tờ, dịch thuật, đến hỗ trợ hoàn thiện hồ sơ nộp lãnh sự.',
    bullets: [
      'Một đầu mối lo toàn bộ hồ sơ, không phải tự chạy nhiều nơi',
      'Bao gồm luôn phần dịch thuật (mộc công ty + xác nhận dịch)',
      'Cập nhật tiến độ hồ sơ qua Zalo tới khi nộp xong',
    ],
    utm: utmContent.trongGoiVisa,
  },
  {
    id: 'final-check',
    title: 'Kiểm tra hồ sơ trước khi nộp (Final Check)',
    tag: 'Final Check',
    desc: 'Đã tự chuẩn bị/tự dịch hồ sơ? Gửi qua để chúng tôi rà soát lại thể thức, đối chiếu thông tin trước khi nộp lãnh sự — dành riêng cho khách tự làm.',
    bullets: [
      'Rà soát lỗi thể thức, thiếu trang, sai đối chiếu thông tin giữa các giấy tờ',
      'Góp ý bổ sung nếu hồ sơ còn thiếu so với yêu cầu lãnh sự',
      'Phù hợp cho khách đã dịch ở nơi khác hoặc tự dịch, muốn kiểm tra lại cho chắc',
    ],
    utm: utmContent.finalCheck,
  },
];

// Ánh xạ tên lãnh sự hiển thị (frontmatter `consulates`) sang slug trang /visa/[slug]/
export const consulateSlugMap: Record<string, string> = {
  Mỹ: 'visa-my',
  Schengen: 'visa-schengen',
  Canada: 'visa-canada',
  Úc: 'visa-uc',
  Anh: 'visa-anh',
  'New Zealand': 'visa-new-zealand',
};

// Danh sách chip loại giấy tờ dùng ở Landing Ads (Khối 5) — trỏ sang /mau-dich/[slug]/
export const docTypeChips: { label: string; slug: string }[] = [
  { label: 'Giấy khai sinh', slug: 'giay-khai-sinh' },
  { label: 'Đăng ký kết hôn', slug: 'dang-ky-ket-hon' },
  { label: 'Sổ tiết kiệm', slug: 'so-tiet-kiem' },
  { label: 'Xác nhận thu nhập', slug: 'xac-nhan-thu-nhap' },
  { label: 'Hợp đồng lao động', slug: 'hop-dong-lao-dong' },
  { label: 'Giấy phép kinh doanh', slug: 'giay-phep-kinh-doanh' },
  { label: 'CT07 xác nhận cư trú', slug: 'ct07-xac-nhan-cu-tru' },
  { label: 'Sổ đỏ / sổ hồng', slug: 'so-do-so-hong' },
  { label: 'Đăng ký xe', slug: 'dang-ky-xe' },
  { label: 'Sổ hộ khẩu', slug: 'so-ho-khau' },
];
