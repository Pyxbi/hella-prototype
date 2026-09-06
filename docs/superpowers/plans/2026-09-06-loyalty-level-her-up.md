# Loyalty "Level Her Up" — Plan

> REQUIRED SUB-SKILL: superpowers:executing-plans. Steps use `- [ ]`.

**Spec:** `docs/superpowers/specs/2026-09-06-loyalty-level-her-up-design.md`

## Global Constraints
Prototype, hardcoded; green `#698269` accent + gold `#e8c14a` stars; `font-heading` = BeautiqueDisplay; CSS/SVG animation only; mobile responsive; `npm run check` + `npm run test` pass.

## Task 1: Data + animation CSS
- [ ] `loyalty/loyaltyData.ts`: `Voucher`, `Tier`, `tiers` (4 per spec §1), `JAR_CAPACITY=100`.
- [ ] Add `@keyframes hella-star-fall` + `.hella-star-fall` util to `globals.css` (fall + fade, reduced-motion safe). Typecheck. Commit.

## Task 2: StarJar
- [ ] `loyalty/StarJar.tsx` (client): SVG/rounded glass vessel, rising fill layer (height=fillPercent%, transition), scattered star glyphs, and dropping-star burst (10 staggered). Props `{fillPercent,color,dropping}`. Typecheck. Commit.

## Task 3: LoyaltyPage + route + entry
- [ ] `loyalty/LoyaltyPage.tsx` (client): Header/Footer, jar + heading + progress bar, tier strip (completed/current/locked+key), voucher cards; mount flow (popup +10 → fill 90→100 → advance to Glow 40) + "Hoàn thành đơn hàng (+10 sao)" replay button.
- [ ] `src/app/pages/loyalty/page.tsx` (route + metadata).
- [ ] `account/AccountMenu.tsx`: add "Sao thưởng của tôi" → `/pages/loyalty`. Typecheck. Commit.

## Task 4: Check + QA
- [ ] `npm run check`. Browser QA: popup, star fall, fill to 100, Màn 2 (Glow 40), tier locks, vouchers. Commit fixes.

## Self-Review
Spec coverage: data → T1; jar/anim → T1/T2; page/flow/entry → T3. Types (Tier, Voucher) consistent.
