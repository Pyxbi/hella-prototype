# Ingredient ("Nguyên liệu") Vendor Page + Navbar + Homepage Transparency — design spec

**Date:** 2026-09-06
**Scope:** (1) Add "Nhà máy" navbar link. (2) New ingredient/transparency showcase page. (3)
Homepage ingredient vendor entry + a Cocoon-style transparency strip. Prototype, hardcoded,
Hella tokens.

Related: `DESIGN_SYSTEM.md`, `CLAUDE.md`, factory feature (same pattern).

## 1. Navbar
Add `{ label: "Nhà máy", href: "/pages/nha-may" }` to `navLinks` in
`root-8a5edab2/data.ts` (top-level, after "Bài viết"). Header renders it already.

## 2. Ingredient page `/pages/nguyen-lieu`
Reuses Header/Footer. Sections:
- **Hero** — natural-ingredients lifestyle image (`ads-2.png`) full-bleed + overlay title
  "Nguyên liệu Hella Beauty / Minh bạch từ thiên nhiên".
- **Transparency intro** — philosophy paragraph + 4 trust badges.
- **Ingredient stories** — gallery of the 7 `ads-*.png` infographics (self-captioning). Fade-in +
  hover-zoom.
- **Sản phẩm & tầng hương** — gallery of the 6 `product-*.png` graphics.
- **CTA band** — "Khám phá sản phẩm" → `/`.

## 3. Homepage additions (after `<FactoryShowcase />`)
- **IngredientShowcase** — split section: ingredient image + info + CTA
  "Khám phá ngay" → `/pages/nguyen-lieu` (mirrors FactoryShowcase).
- **TransparencyStrip** — cream band: short philosophy line + 4 trust badges (Cocoon-style).

## 4. Assets
`public/sites/hellabeauty-vn-ba054dbc/ingredients/images/`: `ads-1..7.png` (ingredient/benefit
infographics + lifestyle heroes), `product-1..6.png` (product/scent-note graphics). Source:
user `ads.pdf` + `product.pdf`, split via PyMuPDF.

## 5. Content (hardcoded)
- Philosophy: "Hella Beauty tin vào vẻ đẹp đến từ thiên nhiên — mỗi công thức là sự kết hợp
  minh bạch của những nguyên liệu lành tính, an toàn cho làn da và thân thiện với môi trường."
- Trust badges: "100% cảm hứng thiên nhiên", "Minh bạch công thức", "Lành tính & an toàn",
  "Đạt chuẩn quốc tế".

## 6. Architecture
- `ingredients/ingredientsData.ts` — IMG paths, `philosophy`, `trustBadges[]`, `ingredientStories`
  (ads image list), `productShowcase` (product image list).
- `ingredients/IngredientsPage.tsx` (client for scroll fade-in), `IngredientShowcase.tsx` (server),
  `TransparencyStrip.tsx` (server).
- `src/app/pages/nguyen-lieu/page.tsx` — route + metadata.
- `src/app/page.tsx` — insert the two homepage components after FactoryShowcase.
- Reuse a scroll fade-in via a small CSS util (add `.hella-reveal` to globals) or IntersectionObserver.

## 7. Styling
Cream/green/BeautiqueDisplay, square. Trust badges = green-outline pills. Galleries: responsive
grid, `#f3efe8` placeholder, hover-zoom, staggered fade-in. Mobile-first.

## 8. Done
`npm run check` passes. `/pages/nguyen-lieu` renders; navbar + homepage CTAs route correctly.
Visual QA by user.

## 9. Out of scope
Detailed ingredient/formula table (user provides later — drops into the stories section).
