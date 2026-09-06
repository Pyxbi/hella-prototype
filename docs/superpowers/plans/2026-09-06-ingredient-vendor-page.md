# Ingredient Vendor Page Implementation Plan

> REQUIRED SUB-SKILL: superpowers:executing-plans. Steps use `- [ ]`.

**Goal:** Navbar "Nhà máy" link + `/pages/nguyen-lieu` ingredient/transparency page + homepage ingredient showcase & transparency strip.

**Spec:** `docs/superpowers/specs/2026-09-06-ingredient-vendor-page-design.md`

## Global Constraints
Prototype, hardcoded; green `#698269` only accent; `font-heading` = BeautiqueDisplay; square. Assets already in `public/sites/hellabeauty-vn-ba054dbc/ingredients/images/`. `npm run check` passes.

## Task 1: Navbar link
- [ ] In `root-8a5edab2/data.ts`, add `{ label: "Nhà máy", href: "/pages/nha-may" }` to `navLinks` after "Bài viết". Typecheck. Commit.

## Task 2: Reveal-on-scroll util
- [ ] Add `.hella-reveal` keyframe/util to `globals.css` (opacity/translateY fade-in), plus a tiny client hook or an IntersectionObserver-driven class toggle used by IngredientsPage. (Simplest: CSS `@keyframes` + a client `Reveal` wrapper component under `ingredients/`.) Typecheck. Commit.

## Task 3: Data
- [ ] Create `ingredients/ingredientsData.ts`: `ING_IMG`, `ingredientHero`, `philosophy`, `trustBadges: string[]`, `ingredientStories: string[]` (ads-1..7 paths), `productShowcase: string[]` (product-1..6 paths). Typecheck. Commit.

## Task 4: Homepage components
- [ ] `ingredients/IngredientShowcase.tsx` (server): split section, ingredient image + info + "Khám phá ngay" Link → `/pages/nguyen-lieu`.
- [ ] `ingredients/TransparencyStrip.tsx` (server): cream band, philosophy line + trust-badge pills.
- [ ] Typecheck. Commit.

## Task 5: Ingredient page + route
- [ ] `ingredients/IngredientsPage.tsx` (client): Header → Hero → Transparency intro (badges) → Ingredient stories gallery (Reveal + hover-zoom) → Product/scent gallery → CTA band → Footer.
- [ ] `src/app/pages/nguyen-lieu/page.tsx`: render `<IngredientsPage />` + metadata. Typecheck. Commit.

## Task 6: Wire homepage
- [ ] In `src/app/page.tsx`, render `<IngredientShowcase />` then `<TransparencyStrip />` after `<FactoryShowcase />`. `npm run check`. Commit.

## Task 7: Visual QA (browser)
- [ ] Screenshot `/pages/nguyen-lieu` + homepage additions; confirm navbar "Nhà máy" + both CTAs route; confirm Hella styling + reveal/hover motion.

## Self-Review
Spec coverage: §1 navbar → T1; §2 page → T5; §3 homepage → T4/T6; motion → T2. Types: `trustBadges`/image arrays consistent across data + components.
