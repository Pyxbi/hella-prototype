# Factory ("Nhà Máy") Vendor Page — design spec

**Date:** 2026-09-06
**Scope:** New dedicated factory showcase page + a homepage entry section that links to it.
Prototype, hardcoded, styled in Hella tokens. (Ingredient vendor page = separate later task.)

Related: `docs/research/hellabeauty-vn-ba054dbc/root-8a5edab2/DESIGN_SYSTEM.md`, `CLAUDE.md`.

## 1. Flow
- Homepage gains a **"Nhà máy" split section** (factory image + info + CTA
  "Khám phá ngay thông tin nhà máy") placed right after the Vendor carousel.
- CTA → navigates to **`/pages/nha-may`**, a dedicated factory page showing factory photos,
  history/stats, and certification logos.

## 2. Assets (in `public/sites/hellabeauty-vn-ba054dbc/factory/images/`)
- `factory-exterior.png` — factory exterior (hero) — "Nhà máy Hella Beauty".
- `factory-stats.png` — building + area stats overlay.
- `factory-team.png` — team photo, ISO 22716:2007 (CGMP).
- `factory-iso9001.png` — production line, ISO 9001:2015 (QMS).
- `factory-9years.png` — production line, "9 năm Hàng Việt Nam Chất Lượng Cao".
Source: user-provided PNGs + PDFs (rasterized via sips).

## 3. Real content (hardcoded)
- **Intro:** Hella Beauty — 9 năm Hàng Việt Nam Chất Lượng Cao; nhà máy vận hành theo các
  tiêu chuẩn quốc tế.
- **Stats:** Tổng diện tích 19.890 m² · Đất xây dựng 9.929 m² · Đất cây xanh 2.951 m² ·
  Khu sản xuất mỹ phẩm 810 m². (Also: đất giao thông 7.003 m².)
- **Certifications:** ISO 22716:2007 — Thực hành sản xuất tốt (CGMP); ISO 9001:2015 —
  Hệ thống quản lý chất lượng (QMS); 9 Năm Hàng Việt Nam Chất Lượng Cao.

## 4. Architecture
- `factory/factoryData.ts` — intro text, `stats[]`, `certifications[]` (image + title + desc),
  image path constants.
- `factory/FactoryShowcase.tsx` — homepage split section (image + info + CTA). Server component.
- `factory/FactoryPage.tsx` — full page (server), reuses `Header`/`Footer`. Sections:
  Hero (exterior) → Intro → Stats tiles → Certification cards → closing CTA band.
- `src/app/pages/nha-may/page.tsx` — route rendering `<FactoryPage />` + metadata.
- `src/app/page.tsx` — insert `<FactoryShowcase />` after the Vendor `ImageCarousel`.

## 5. Styling (Hella tokens)
Cream/green/BeautiqueDisplay, square. Hero full-bleed image. Stat tiles: big green
BeautiqueDisplay numbers on cream. Cert cards: square image + BeautiqueDisplay title + body
caption. CTA: green button. Reuse `SectionHeading` where it fits. Mobile-first (grids stack).

## 6. Done
- `npm run check` passes. `/pages/nha-may` renders; homepage CTA routes to it. Visual QA by user.

## 7. Out of scope
Ingredient vendor page; the "other cite" is this in-app route (no external site).
