# Step 5 "Your Plan" + Editable Timetable — Implementation Plan

> REQUIRED SUB-SKILL: superpowers:executing-plans. Steps use `- [ ]`.

**Goal:** Replace Step-5 `BuddyResult` with `BuddyPlan`: generated plan + week estimate + editable drag-drop weekly timetable.

**Spec:** `docs/superpowers/specs/2026-09-06-buddy-plan-timetable-design.md`

## Global Constraints
Prototype, hardcoded; Hella green only accent (mockup is pink — match layout, not color); `font-heading` = BeautiqueDisplay. `npm run check` + `npm run test` pass.

## Task 1: Plan logic (TDD)
- [ ] `buddy/plan/planLogic.ts`: types (`PlanSession`, `DayDef`), `DAYS` (Mon..Sun labels/short), `parseTimeToHour`, `defaultDaysForFrequency`, `weeksForFrequency`, `goalFromHer`, `hourWindow`, `buildInitialSessions`, `currentWeekDates`, `derivePlan(answers)`.
- [ ] `buddy/plan/planLogic.test.ts` (vitest): parseTimeToHour (SA/CH/12 edge cases), defaultDaysForFrequency counts, weeksForFrequency, goalFromHer. Run `npm run test`. Commit.

## Task 2: BuddyPlan UI
- [ ] `buddy/plan/BuddyPlan.tsx` (client, props `answers`, `boughtStepIds`, `onEdit`): 3-panel layout — DaySelector (left), Timetable grid (center, HTML5 drag-drop cells + blocks, click→popover with step checkboxes + day/hour selects + delete, click empty selected-day cell→add), PlanOverview (right, frequency/duration/goal/weeks + note + "Chỉnh lịch của tôi"→onEdit + "Lưu kế hoạch"→localStorage + saved state). Typecheck. Commit.

## Task 3: Wire + cleanup
- [ ] `buddy/HellaBuddyPage.tsx`: render `<BuddyPlan/>` in "result" phase; remove `BuddyResult` import/usage.
- [ ] Delete `buddy/BuddyResult.tsx`.
- [ ] `npm run check` + `npm run test`. Commit.

## Task 4: Visual QA (browser)
- [ ] Run flow to Step 5: verify 3 panels, blocks on selected days at chosen time, drag a block to another cell, click a block (toggle steps / change day-hour / delete), toggle a day (add/remove), "Lưu kế hoạch" confirms. Hella styling; mobile stacks + grid scrolls.

## Self-Review
Spec coverage: layout → T2; interactions → T2; derivation → T1; wiring → T3. Types: `PlanSession`, `BuddyAnswers` consistent. Pure logic tested in T1.
