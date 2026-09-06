# Factory Vendor Page Implementation Plan

> REQUIRED SUB-SKILL: superpowers:executing-plans. Steps use `- [ ]`.

**Goal:** Add a `/pages/nha-may` factory showcase page + a homepage CTA section linking to it.

**Architecture:** Hardcoded `factoryData.ts` + `FactoryPage` (route) reusing Header/Footer + `FactoryShowcase` homepage section. Real user-provided factory images.

**Spec:** `docs/superpowers/specs/2026-09-06-factory-vendor-page-design.md`

## Global Constraints
Prototype, hardcoded; green `#698269` only accent; `font-heading` = BeautiqueDisplay; square. Assets in `public/sites/hellabeauty-vn-ba054dbc/factory/images/` (already prepared). `npm run check` passes.

## Task 1: Data
- [ ] Create `src/components/sites/hellabeauty-vn-ba054dbc/factory/factoryData.ts`:
  `FACTORY_IMG` const, `factoryStats` (label + value), `factoryCerts` (image, code, title),
  `factoryIntro` text. Typecheck. Commit.

## Task 2: FactoryPage
- [ ] Create `factory/FactoryPage.tsx` (server): Header → Hero (exterior, full-bleed) → Intro →
  Stats tiles (green BeautiqueDisplay numbers on cream) → Certification cards (3) → CTA band
  (green button → `/`) → Footer. Reuse `SectionHeading` where useful. Typecheck. Commit.

## Task 3: Route
- [ ] Create `src/app/pages/nha-may/page.tsx` rendering `<FactoryPage />` + metadata
  ("Nhà máy – Hella Beauty"). `npm run check`. Commit.

## Task 4: Homepage entry
- [ ] Create `factory/FactoryShowcase.tsx` (server): split section — factory image left, text +
  "Khám phá ngay thông tin nhà máy" CTA (Link → `/pages/nha-may`) right.
- [ ] In `src/app/page.tsx`, render `<FactoryShowcase />` after the Vendor `ImageCarousel`.
- [ ] `npm run check`. Commit.

## Task 5: Visual QA (browser)
- [ ] Screenshot `/pages/nha-may` + homepage entry; confirm CTA routes; confirm Hella styling.

## Self-Review
Spec coverage: flow → Tasks 3/4; assets → prepared; content → Task 1; page → Task 2; entry →
Task 4. Types: `FactoryStat`, `FactoryCert` consistent across data + components.
