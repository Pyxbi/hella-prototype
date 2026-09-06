# Bài viết dropdown + Article engine — Plan

> REQUIRED SUB-SKILL: superpowers:executing-plans. Steps use `- [ ]`.

**Spec:** `docs/superpowers/specs/2026-09-06-articles-navbar-design.md`

## Global Constraints
Prototype, hardcoded; green `#698269` only accent; `font-heading` = BeautiqueDisplay. `npm run check` + `npm run test` pass. Reuse `ingredients/Reveal`.

## Task 1: Navbar
- [ ] `root-8a5edab2/data.ts`: point top-level "Câu chuyện thương hiệu" → `/pages/cau-chuyen-thuong-hieu`; remove standalone "Nhà máy"; give "Bài viết" children (Nhà máy, Nguyên liệu, Câu chuyện thương hiệu). Typecheck. Commit.

## Task 2: Article engine
- [ ] `shared/article/articleTypes.ts` (ArticleBlock, ArticleData, RelatedArticle).
- [ ] `shared/article/NewsletterSignup.tsx` (client, demo email input).
- [ ] `shared/article/ArticlePage.tsx` (hero + byline + intro + blocks via Reveal + newsletter? + related). Typecheck. Commit.

## Task 3: Nguyên liệu article
- [ ] `ingredients/nguyenLieuArticle.ts` (data per spec §3).
- [ ] Repoint `src/app/pages/nguyen-lieu/page.tsx` → `<ArticlePage data={nguyenLieuArticle}/>` + metadata. Typecheck. Commit.

## Task 4: Câu chuyện article
- [ ] `brand-story/brandStoryArticle.ts` (data per spec §4).
- [ ] `src/app/pages/cau-chuyen-thuong-hieu/page.tsx` → `<ArticlePage data={brandStoryArticle}/>` + metadata. Typecheck. Commit.

## Task 5: Check + QA
- [ ] `npm run check` + `npm run test`. Browser QA: Bài viết dropdown → 3 links; both articles read top-to-bottom (images, bullets, checklist, links, CTA, newsletter, related). Commit fixes.

## Self-Review
Spec coverage: §1 → T1; §2 → T2; §3 → T3; §4 → T4. Types consistent (ArticleData used by both pages).
