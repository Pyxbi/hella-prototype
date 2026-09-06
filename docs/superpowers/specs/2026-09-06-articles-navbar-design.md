# Bài viết dropdown + Article engine (Nguyên liệu + Câu chuyện thương hiệu) — design spec

**Date:** 2026-09-06
**Scope:** (1) "Bài viết" navbar dropdown → Nhà máy / Nguyên liệu / Câu chuyện thương hiệu.
(2) Reusable `ArticlePage` engine; rebuild `/pages/nguyen-lieu` as an article with new copy; add
new `/pages/cau-chuyen-thuong-hieu` article. Prototype, hardcoded, Hella tokens, gentle animation.

Related: factory-article spec (same visual language).

## 1. Navbar (`root-8a5edab2/data.ts` navLinks)
- Top-level "Câu chuyện thương hiệu" → `/pages/cau-chuyen-thuong-hieu`.
- Remove standalone "Nhà máy".
- "Bài viết" gains `children`: Nhà máy → `/pages/nha-may`, Nguyên liệu → `/pages/nguyen-lieu`,
  Câu chuyện thương hiệu → `/pages/cau-chuyen-thuong-hieu`. Header already renders child dropdowns.

## 2. Article engine (`shared/article/`)
- `articleTypes.ts`: `ArticleBlock` union = h2 | p | bullets({lead?,text,href?}[]) |
  checklist({title?,items[]}) | image({src,caption?}) | cta({label,href}); `ArticleData`
  { title, author, date, comments, heroImage, heroCaption?, intro?, blocks[], related[], newsletter? };
  `RelatedArticle` { tag, title, desc, image, href }.
- `ArticlePage.tsx` (server-ok, uses Reveal): Header → full-bleed hero (+ italic caption) →
  article (title, byline "Đăng bởi X · date · comments", intro, blocks with reveal) → optional
  `NewsletterSignup` → "Tiếp tục đọc" related cards → Footer.
- `NewsletterSignup.tsx` (client): email input + "Đăng ký" (demo, no submit) + copy.

## 3. Nguyên liệu article (`ingredients/nguyenLieuArticle.ts`)
Title "BÍ MẬT CÔNG THỨC TẠO NÊN DÒNG BODY CARE "GÂY THƯƠNG NHỚ" CỦA HELLA BEAUTY", MKT,
07/07/2026, 0 Bình luận. Hero `ingredients/images/ads-2.png`. Blocks (verbatim copy):
intro; H2 "1. SỰ KẾT HỢP…" + p + bullets (Thành phần tự nhiên…, Hoạt chất dưỡng da thế hệ mới…);
image `article-coconut.png` caption "Bảng thành phần được nghiên cứu kỹ lưỡng…"; H2 "2. MINH BẠCH
NGUỒN GỐC…" + p + bullets (Đối tác chính: AgriJSC, Website: https://agrijsc.com/ [href], Cam kết…);
H2 "3. BÍ MẬT CÔNG THỨC DƯỠNG DA & LƯU HƯƠNG…" + p + bullets (Thẩm thấu nhanh…, Hương thơm…) +
checklist "Cam kết 100% Thuần Chay & An Toàn" (Không Parabens; Không Sulfate; Không thử nghiệm trên
động vật; An toàn lành tính); image `article-lotus.png` caption "Mỗi giọt sản phẩm…"; H2 "CÙNG NÀNG
NUÔI DƯỠNG TÍNH NỮ…" + p + cta "Khám phá sản phẩm" → `/collections/cham-soc-da`. newsletter: true.
Related: "Review mặt nạ nghệ & mặt nạ bơ" (image damat-1), "Xu hướng Body Mist 2026: body mist hay
nước hoa?" (image product-1).
Route `/pages/nguyen-lieu` → `<ArticlePage data={nguyenLieuArticle}/>` (replaces the gallery page).

## 4. Câu chuyện thương hiệu article (`brand-story/brandStoryArticle.ts` + route)
Title "HELLA BEAUTY: TO - GET - HER: HÀNH TRÌNH NUÔI DƯỠNG TÍNH NỮ CỦA RIÊNG BẠN", MKT,
09/09/2026, 0 Bình luận. Hero `brand-story/images/story-mirror.png`. Blocks (verbatim): intro
(3 paras); H2 "KHI VẺ ĐẸP KHÔNG CẦN BẮT ĐẦU TỪ ÁNH NHÌN CỦA NGƯỜI KHÁC" + paras; image
`story-triptych.png`; H2 "HELLA BEAUTY ĐƯỢC TẠO RA CHO NHỮNG NHỊP SỐNG HIỆN ĐẠI" + paras; H2
"NURTURE HER FEMININITY – NUÔI DƯỠNG TÍNH NỮ THEO CÁCH CỦA RIÊNG BẠN" + paras (incl. "Có ngày HER…"
lines); image `story-vanity.png`; H2 "TOGETHER: TO GET HER" + paras + "Together, we get closer to
HER" + cta "Khám phá thế giới Hella Beauty" → `/`. Related: reuse 2 cards. Route
`src/app/pages/cau-chuyen-thuong-hieu/page.tsx`.

## 5. Done
`npm run check` + `npm run test` pass. Navbar dropdown works; both articles render top-to-bottom
with images/captions/bullets/checklist/CTA + related + newsletter; Hella styling + reveal. QA by user.

## 6. Out of scope
Real blog posts / newsletter backend. Old ingredient gallery page retired (showcase on homepage stays).
