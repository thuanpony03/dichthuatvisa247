# Dịch Thuật Visa 247 — Website

Website tĩnh xây bằng **Astro** cho dịch vụ dịch thuật hồ sơ visa. 3 nhiệm vụ tách bạch: Ads (`/lp/*`), SEO (các trang còn lại), Đại lý (`/agency/`). Xem chi tiết brief gốc để hiểu bối cảnh kinh doanh.

## 🚀 Bắt đầu

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # build ra ./dist
npm run preview   # xem thử bản build
```

## ⚠️ Việc cần làm TRƯỚC khi đưa site lên production

1. **Đổi domain thật** ở 2 chỗ: `astro.config.mjs` (`site:`) và `src/config/site.ts` (`site.domain`). Hiện đang để tạm `https://dichthuatvisa247.vn`.
2. **Dán mã tracking thật** — xem mục "Dán mã Google Ads / GA4 / Pixel" bên dưới.
3. **Điền địa chỉ công ty thật** vào `src/config/site.ts` → `site.business` (dùng cho schema LocalBusiness ở trang chủ). Hiện để trống có ghi `TODO`.
4. **Điền số liệu năng lực xử lý thật** ở `/agency/` (số trang/ngày, số hồ sơ gấp 24h đồng thời) — trang đang để placeholder rõ ràng `[Chủ site điền số...]`, **không được tự bịa số**.
5. **Thay toàn bộ ảnh placeholder** bằng ảnh giấy tờ thật đã che thông tin cá nhân — xem danh sách bên dưới.
6. Kiểm tra lại nội dung 6 trang `/visa/[slug]/` (yêu cầu hình thức dịch thuật của từng lãnh sự) — nội dung đã được viết cẩn thận kèm nguồn tham khảo chính thức, nhưng **quy định lãnh sự có thể thay đổi**, nên xác minh lại trước khi công bố rộng rãi. Đây là cảnh báo brief gốc đã nêu rõ.
7. **Banner ở trang chủ (`src/pages/index.astro`, khối `.home-banner`) đang dùng ảnh do chủ site cung cấp, vi phạm 3 quy tắc của brief gốc — chủ site đã biết và yêu cầu dùng tạm, tự sửa sau:**
   - Chữ "RẺ NHẤT" trong ảnh — brief cấm tuyên bố tuyệt đối kiểu này (rủi ro bị Google/Meta Ads từ chối hoặc phạt tài khoản).
   - Giá 17.000đ/trang trong ảnh là **giá riêng cho đại lý**, brief yêu cầu không hiển thị công khai trên trang có thể lập chỉ mục/quảng cáo.
   - Số điện thoại "Ms Trâm — 0866 049 694" trong ảnh chưa có UTM/tracking riêng như số chính `0394 180 613`, nên mọi liên hệ qua số này sẽ không đo được hiệu quả quảng cáo.
   - Cách sửa nhanh: thiết kế lại banner bỏ 3 điểm trên, hoặc thay bằng banner mới theo gợi ý ở mục "Đề xuất thiết kế" bên dưới.

## 🚦 Kế hoạch SEO — thứ tự làm để có traffic nhanh nhất có thể

Nền tảng kỹ thuật (schema, sitemap, robots.txt, OG/Twitter card, tốc độ tải trang) đã sẵn sàng. Cái đang chặn toàn
bộ SEO là **site chưa có domain thật và chưa được Google biết tới**. Không có bước kỹ thuật nào rút ngắn được thời
gian Google index/xếp hạng — chỉ có thể rút ngắn thời gian *chuẩn bị* để đồng hồ SEO bắt đầu chạy sớm nhất.

**Tuần 1 — bắt buộc trước, quyết định site có được index hay không:**
1. Mua domain thật, cập nhật vào `astro.config.mjs` và `src/config/site.ts` (mục 1 ở trên), deploy lên Cloudflare Pages.
2. Tạo Google Search Console + Bing Webmaster Tools cho domain thật, submit `sitemap-index.xml`.
3. Tạo/claim **Google Business Profile** cho "Dịch Thuật Visa 247" (địa chỉ 192 Trần Quang Khải) — đây là kênh có traffic nhanh nhất trong tất cả, thường hiện trên Google Maps/tìm kiếm địa phương trong vài ngày, không phải chờ SEO organic thông thường.
4. Dán mã GA4/Google Ads/Meta Pixel thật (mục 2 ở trên) để đo được traffic ngay từ ngày đầu.

**Tuần 2–4 — mở rộng nội dung, việc duy nhất thực sự "kéo traffic":**
5. Viết 4–6 bài `/blog/` (đã có sẵn collection, chỉ cần thêm file `.md`) nhắm câu hỏi khách hay hỏi thật (vd. "Sổ tiết kiệm bao nhiêu tiền thì đủ xin visa Schengen", "Xin visa Mỹ cần chứng minh tài chính gì") — đây là loại nội dung Google *và* AI Overview ưu tiên trích dẫn: trả lời trực tiếp câu hỏi trong 1-2 câu đầu, có số liệu/nguồn cụ thể, không lan man.
6. Xin 5–10 review thật trên Google Business Profile từ khách đã dùng dịch vụ — review thật là tín hiệu xếp hạng địa phương mạnh nhất, nhanh hơn nhiều so với chờ backlink.
7. Khi có review thật, thêm `AggregateRating` schema vào trang chủ (hiện chưa có vì chưa có review thật — không tự bịa số sao).

**Về AI Overview / AI answer engines (ChatGPT, Perplexity, Google AI Overview) cụ thể:**
- Không có cách "ép" xuất hiện nhanh — các engine này ưu tiên trích dẫn trang đã được Google index tốt, có schema rõ ràng, và trả lời trực tiếp câu hỏi ngay đầu đoạn văn. Site đã đúng chuẩn cấu trúc này (FAQPage schema, câu trả lời đi thẳng vào vấn đề).
- Đã thêm `public/llms.txt` — file tóm tắt site cho AI crawler đọc nhanh, theo chuẩn llms.txt đang được nhiều AI agent hỗ trợ. Không có gì đảm bảo được dùng, nhưng chi phí thêm gần như bằng 0 nên cứ có sẵn.
- Đòn bẩy thật sự vẫn là nội dung: câu hỏi càng cụ thể, câu trả lời càng trực tiếp và có dẫn chứng, xác suất được AI trích dẫn càng cao. Đây chính là lý do mục 5 (viết blog trả lời câu hỏi thật) quan trọng hơn bất kỳ thủ thuật kỹ thuật nào.

**Thời gian thực tế cần biết trước (để không kỳ vọng sai):** Google thường index trang mới trong vài ngày đến 2 tuần sau khi submit sitemap. Có traffic organic đáng kể thường mất 2–3 tháng. Xếp hạng cạnh tranh cho từ khoá có nhiều đối thủ (vd. "dịch thuật visa") thường 6 tháng+. Trong lúc chờ organic lên, Google Ads (`/lp/*` đã sẵn sàng cho việc này) là kênh có traffic ngay lập tức.

## 📄 Cách thêm 1 trang giấy tờ mới (không cần biết code)

Mỗi loại giấy tờ trong "Thư viện bản dịch mẫu" là **một file** trong thư mục `src/content/giay-to/`. Thêm file mới = có trang mới, tự động:
- xuất hiện trong lưới "Thư viện bản dịch mẫu" ở trang chủ và `/mau-dich/`
- có URL riêng `/mau-dich/[slug]/`
- tự vào `sitemap.xml`

**Các bước:**

1. Vào thư mục `src/content/giay-to/`.
2. Copy một file có sẵn (ví dụ `giay-khai-sinh.md`), đổi tên file thành slug của giấy tờ mới, ví dụ `giay-to-moi.md`.
3. Mở file, sửa các trường trong phần đầu (giữa hai dòng `---`):
   - `title`: tiêu đề trang (dùng cho thẻ `<title>` và Google)
   - `slug`: phải khớp với tên file (không dấu, không khoảng trắng, nối bằng `-`)
   - `docName` / `docNameEn`: tên giấy tờ tiếng Việt / tiếng Anh
   - `sampleImage`: đường dẫn ảnh mẫu, ví dụ `/img/mau-dich/giay-to-moi.webp` (ảnh đặt trong `public/img/mau-dich/`)
   - `pageCount`: số trang trung bình của giấy tờ này
   - `consulates`: danh sách lãnh sự cần giấy tờ này, chọn trong: `Mỹ`, `Schengen`, `Canada`, `Úc`, `Anh`, `New Zealand`
   - `updated`: ngày cập nhật, định dạng `YYYY-MM-DD`
   - `related`: 1-2 slug giấy tờ liên quan (để hiện mục "Giấy tờ liên quan")
   - `intro`: đoạn mở đầu ngắn giải thích giấy tờ này dùng khi nào
   - `terminology`: bảng thuật ngữ Việt–Anh, mỗi dòng có `vi` và `en`
   - `commonErrors`: **đúng 3 mục**, mỗi mục có `title` (tên lỗi) và `desc` (giải thích)
   - `faq` (tuỳ chọn): **đúng 3 mục** `question`/`answer`. Nếu bỏ trống, trang tự sinh 3 câu hỏi mặc định — nhưng giấy tờ nào traffic cao thì nên viết riêng, tránh nhiều trang đọc giống hệt nhau (xem ví dụ trong `ct07-xac-nhan-cu-tru.md`)
4. Phần nội dung bên dưới dòng `---` thứ hai là ghi chú thêm tự do (không bắt buộc).
5. Thêm ảnh mẫu thật (đã che thông tin cá nhân, có watermark) vào `public/img/mau-dich/giay-to-moi.webp`.
6. Chạy `npm run build` để kiểm tra không lỗi, hoặc `npm run dev` để xem trực tiếp tại `localhost:4321/mau-dich/giay-to-moi/`.

Thêm trang thị trường visa mới tương tự, trong `src/content/lanh-su/`.

## 💰 Sửa giá / SĐT / link Zalo

Tất cả nằm trong **một file duy nhất**: `src/config/site.ts`. Sửa số ở đây, toàn site tự cập nhật — không cần sửa ở trang nào khác.

## 🧭 Sửa nội dung "Dịch vụ visa" (Tư vấn / Trọn gói / Final Check)

3 dịch vụ này nằm trong mảng `extraServices` ở `src/config/site.ts` — mỗi dịch vụ có `title`, `tag`, `desc`, `bullets`. Sửa nội dung ở đây, cả trang `/dich-vu-visa/`, khối giới thiệu ở trang chủ, và khối gợi ý Final Check trên các trang mẫu dịch đều tự cập nhật theo (không cần sửa từng trang). Các dịch vụ này chưa có giá niêm yết — nếu muốn thêm giá cụ thể, thêm field `price` vào từng mục và hiển thị ở `src/pages/dich-vu-visa/index.astro`. Lưu ý: dịch thuật vẫn nên là trọng tâm của site — tránh mở rộng 3 mục này thành nhiều trang riêng, dễ loãng chủ đề SEO chính ("dịch thuật hồ sơ visa").

## 📊 Dán mã Google Ads / GA4 / Pixel

Mở `src/config/site.ts`, tìm khối `tracking`:

```ts
export const tracking = {
  googleAdsId: 'AW-XXXXXXXXX',              // ← Google Ads Conversion ID
  googleAdsConversionZalo: 'AW-XXXXXXXXX/YYYYYYYY', // ← Conversion label cho click Zalo
  googleAdsConversionCall: 'AW-XXXXXXXXX/ZZZZZZZZ', // ← Conversion label cho click gọi điện
  ga4Id: 'G-XXXXXXXXX',                      // ← GA4 Measurement ID
  fbPixelId: 'XXXXXXXXXXXXXXX',              // ← Facebook Pixel ID
};
```

Thay các giá trị `AW-XXXXXXXXX`, `G-XXXXXXXXX`, `XXXXXXXXXXXXXXX` bằng mã thật. Không cần sửa file nào khác — `src/components/Tracking.astro` và `src/scripts/tracking.js` tự đọc từ đây.

**Cách hoạt động:** mọi click vào link chứa `zalo.me` bắn event `zalo_click` (gtag conversion + fbq Contact); mọi click vào link `tel:` bắn event `call_click`. Tham số `utm_*`/`gclid`/`keyword` trên URL trang được tự động nối vào link Zalo khi khách bấm, để đối chiếu từ khóa ra lead trong CRM.

## 🖼️ Ảnh giấy tờ — 17/17 loại đều là ảnh thật

Thư viện mẫu dịch hiện có **17 loại giấy tờ** (đã bỏ `bang-thpt`, `cccd`, `hoc-ba` khỏi danh sách 20 loại ban đầu — không có hồ sơ thật phù hợp trong dự án gốc để làm ảnh mẫu, theo yêu cầu chủ site). **Toàn bộ 17 ảnh đều là ảnh thật** (lấy từ hồ sơ khách thật đã dịch xong trong dự án Passport Lounge, che số CCCD/hộ chiếu + địa chỉ, đóng watermark + mộc đỏ minh hoạ bằng script — theo yêu cầu của chủ site, chỉ cần che số định danh và địa chỉ, **không che tên/ngày sinh**). Dùng cho `/mau-dich/[slug]/`, ảnh Hero trang chủ/landing (`moc-do.webp`), và 3 ảnh bằng chứng (`ban-dich-1..3.webp`):

- `ct07-xac-nhan-cu-tru`, `giay-khai-sinh`, `dang-ky-ket-hon`, `so-tiet-kiem`, `so-bao-hiem-xa-hoi`, `giay-phep-kinh-doanh`, `hop-dong-lao-dong`, `so-do-so-hong`, `so-ho-khau`, `sao-ke-ngan-hang`, `xac-nhan-thu-nhap`, `giay-chung-nhan-nghi-huu`, `ly-lich-tu-phap`, `xac-nhan-doc-than`, `quyet-dinh-bo-nhiem`, `giay-uy-quyen`, `dang-ky-xe`

Lưu ý riêng:
- `so-tiet-kiem` (cũng là ảnh Hero trang chủ) dùng "Certificate of Deposit" của **Shinhan Bank** — ngân hàng tự phát hành song ngữ, không phải bản dịch của công ty, nhưng thiết kế đẹp/uy tín nên chọn ảnh này thay vì bản dịch tự đánh máy.
- `sao-ke-ngan-hang` là sao kê ngân hàng **tiếng Nhật** (khách hàng dùng ở Nhật) — không tìm thấy sao kê tiếng Việt nào trong dự án gốc để thay. Nội dung dịch vẫn chuẩn xác, chỉ không phải ví dụ "dịch từ tiếng Việt" đúng nghĩa như các ảnh khác.
- `giay-uy-quyen` dùng ảnh "Letter of Consent for Child's Travel" (giấy đồng ý cho con đi du lịch) — một dạng giấy ủy quyền/đồng ý cụ thể, không phải mẫu giấy ủy quyền tổng quát. Nội dung trang mô tả giấy ủy quyền chung nên có hơi lệch với ảnh minh hoạ — chấp nhận được vì đây chỉ là ảnh mẫu tham khảo thể thức.
- `dang-ky-xe` dùng ảnh giấy chứng nhận đăng ký xe ô tô thật — bản thân giấy này đã in song ngữ Việt–Anh theo mẫu nhà nước, không phải bản dịch của công ty, nhưng vẫn là ảnh giấy tờ thật hữu ích để minh hoạ thể thức.

Muốn thêm lại `bang-thpt`, `cccd`, `hoc-ba` (hoặc giấy tờ mới khác) sau này: xem hướng dẫn "Cách thêm 1 trang giấy tờ mới" ở trên, cộng ảnh mẫu thật tương ứng.

**⚠️ Quan trọng khi tự thay ảnh thật:** việc căn đúng toạ độ vùng cần che trên ảnh scan rất dễ lệch dòng nếu áng chừng bằng mắt — nên phóng to kiểm tra từng vùng che trước khi dùng, đừng tin ảnh xem nhanh ở kích thước nhỏ. Nếu ảnh dính bất kỳ logo/thông tin liên hệ của bên thứ ba (công ty dịch thuật khác, chữ ký người dịch...), phải cắt/che luôn — trang này đứng tên "Dịch Thuật Visa 247", không phải thương hiệu khác.

| File | Kích thước khuyến nghị | Ghi chú |
|---|---|---|
| `public/img/moc-do.webp` | ~1000×1300px (dọc) | Ảnh chủ đạo — bản dịch có dấu mộc đỏ, dùng ở Hero trang chủ và landing ads |
| `public/img/ban-dich-1.webp` … `ban-dich-3.webp` | ~1000×1300px | Ảnh bằng chứng ở Khối 5 landing ads |
| `public/img/mau-dich/[slug].webp` (17 ảnh) | ~1000×1300px | Ảnh mẫu dịch từng loại giấy tờ. **Bắt buộc đóng watermark logo + tên miền, opacity ~15%, chéo góc** trước khi thay — nếu không đối thủ sẽ tải về dùng luôn |
| `public/img/og/*.webp` (5 ảnh) | 1200×630px | Ảnh Open Graph khi chia sẻ link, có thể dùng ảnh thiết kế riêng không cần là ảnh giấy tờ |

Chạy lại `node scripts/gen-placeholders.mjs` bất kỳ lúc nào để tái tạo các placeholder xám còn thiếu — script tự động **bỏ qua** 17 file ảnh thật ở trên (danh sách `REAL_PHOTOS` trong chính script), không ghi đè.

## ☁️ Deploy Cloudflare Pages

1. Push code lên GitHub/GitLab.
2. Vào Cloudflare Dashboard → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**, chọn repo.
3. Cấu hình build:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Deploy. Sau khi có domain thật, trỏ DNS về Cloudflare Pages và cập nhật domain trong `astro.config.mjs` + `src/config/site.ts` (mục 1 ở trên), rồi deploy lại để sitemap/canonical dùng đúng domain.

## ✅ Đã tự kiểm tra (Mục 10 của brief)

Đã chạy kiểm thử tự động bằng Playwright (375×667, 320/375/768/1440px, console, focus, reduced-motion, UTM passthrough, agency price leak) — toàn bộ đạt. Các mục sau **chưa thể tự kiểm** trong môi trường build này, cần chủ site kiểm tra khi lên production:
- Lighthouse Performance/Accessibility/SEO thực tế (phụ thuộc domain thật + hosting thật, ảnh thật thay vì placeholder)
- Rich Results Test của Google (cần URL public đã deploy)
- Test conversion tracking thực tế trên tài khoản Google Ads/GA4/Meta thật (đang dùng ID placeholder)

## 💡 Đề xuất

*(Ý tưởng thêm cho tương lai — KHÔNG tự đưa vào site theo yêu cầu brief. Chủ site cân nhắc.)*

- Thêm trang `/blog/` với vài bài viết SEO dài hơi (kinh nghiệm xin visa, checklist chuẩn bị hồ sơ theo mùa cao điểm) — đã có sẵn content collection `blog` và route `/blog/[slug]/`, chỉ cần thêm file `.md`.
- Thêm bản đồ nhúng (không dùng script ngoài, có thể dùng ảnh tĩnh + link Google Maps) ở `/lien-he/` khi có địa chỉ văn phòng cụ thể.
- Cân nhắc thêm chip lọc theo lãnh sự ở trang `/mau-dich/` khi thư viện mẫu dịch lớn hơn 20 trang, giúp khách lọc nhanh theo thị trường visa.
- Với `/agency/`, sau khi có số liệu năng lực xử lý thật, có thể thêm khối "khách hàng agency đã hợp tác" (chỉ khi có số liệu/logo thật, không bịa).

### 🎨 Đề xuất thiết kế (nếu chủ site muốn tự làm thêm graphic)

Banner hiện tại (`public/img/hero-banner.webp`) đẹp về màu sắc nhưng dính 3 lỗi ở mục "Việc cần làm" phía trên. Nếu thiết kế banner mới hoặc thêm graphic khác, gợi ý:

1. **Banner hero thay thế** — cùng kích thước tỉ lệ ~2.4:1 (ví dụ 1600×666px), giữ tông xanh dương/xanh lá đang dùng cho đồng bộ thương hiệu, nhưng:
   - Đổi "RẺ NHẤT" → "GIÁ TRỌN GÓI RÕ RÀNG" hoặc "MỘC CÔNG TY + XÁC NHẬN DỊCH" (đúng USP thật, không phải tuyên bố tuyệt đối).
   - Bỏ hẳn giá 17.000đ/trang khỏi ảnh — giá đại lý chỉ nên nằm trong `/agency/` (trang không lập chỉ mục công khai).
   - Chỉ để 1 số điện thoại — số chính `0394 180 613` (đã gắn tracking), không thêm số phụ nếu số đó chưa qua hệ thống theo dõi cuộc gọi.
2. **Ảnh vuông cho mạng xã hội** (1080×1080px) — dùng lại bố cục 3 cam kết ("Có mộc công ty", "Trễ hẹn hoàn phí", "Trang đầu miễn phí") để đăng Facebook/Zalo OA, tăng nhận diện thương hiệu nhất quán với site.
3. **Badge "Đã xử lý 71+ bộ hồ sơ"** dạng icon tròn nhỏ (giống con dấu) — có thể dùng làm watermark góc ảnh mẫu dịch, tăng độ tin cậy lặp lại xuyên suốt site mà không cần nhắc lại bằng chữ ở mọi trang.
4. **Ảnh bìa `/agency/`** riêng — hiện trang đại lý dùng chung style H1 với trang chủ, một banner ngang nhỏ (không cần bằng kích thước hero) nhấn vào "giá sỉ + SLA văn bản" sẽ giúp trang này trông khác biệt, chuyên nghiệp hơn cho đối tượng B2B.

Nguyên tắc chung khi tự thiết kế: **không dùng "rẻ nhất/nhất thị trường/bao đậu visa/đảm bảo đậu"**, **không để giá đại lý xuất hiện trên ảnh dùng ở trang công khai**, và **mọi số điện thoại xuất hiện trên site nên đã có tracking** (xem mục "Dán mã Google Ads / GA4 / Pixel" để biết cách thêm số mới vào hệ thống theo dõi).
