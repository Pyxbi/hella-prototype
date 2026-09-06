# STEP 6 Zalo Check-in — Plan

> REQUIRED SUB-SKILL: superpowers:executing-plans. Steps use `- [ ]`.

**Spec:** `docs/superpowers/specs/2026-09-06-zalo-checkin-design.md`

## Global Constraints
Prototype, hardcoded; green `#698269` accent; `font-heading` = BeautiqueDisplay; mobile-first. `npm run check` + `npm run test` pass.

## Task 1: Icon + data
- [ ] Add `StarIcon` to `shared/icons.tsx`.
- [ ] `checkin/checkinData.ts`: `checkinSteps` (5, id→buddy routineSteps for image/icon, mandatory, minutes), `feelings` (5: id,label,color). Typecheck. Commit.

## Task 2: Check-in page + route
- [ ] `checkin/CheckinPage.tsx` (client): top bar, title, steps checklist (product image if bought from saved plan else icon; tick toggle), mandatory note, Check-in button (gated on both mandatory); post-checkin modal with phases feeling (congrats + 5 faces + gradient) → reward (+50 sao). Reads `localStorage["hella-buddy-plan"]` for boughtStepIds (fallback demo).
- [ ] `src/app/checkin/page.tsx` (route + metadata, not in nav). Typecheck. Commit.

## Task 3: Entry points
- [ ] `account/AccountMenu.tsx` (logged-in dropdown): add "Check-in hôm nay" → `/checkin`.
- [ ] `buddy/plan/BuddyPlan.tsx`: add a small "Mở bản check-in (Zalo)" link → `/checkin`. Typecheck. Commit.

## Task 4: Check + QA
- [ ] `npm run check`. Browser QA (narrow width): checklist, bought product images, mandatory gating, Check-in → congrats+emotion → reward. Commit fixes.

## Self-Review
Spec coverage: page → T2; entry → T3; data → T1. Types consistent; reuses buddy routineSteps.
