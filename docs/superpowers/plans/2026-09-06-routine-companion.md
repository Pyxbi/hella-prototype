# Routine Companion + Account System — Implementation Plan

> REQUIRED SUB-SKILL: superpowers:executing-plans. Steps use `- [ ]`.

**Goal:** Prototype account popup (navbar) + `/pages/hella-buddy` routine companion flow (landing → order lookup → 4-question quiz → schedule summary).

**Spec:** `docs/superpowers/specs/2026-09-06-routine-companion-design.md`

## Global Constraints
Prototype, hardcoded, localStorage only (no real auth/backend); passwords never stored. Green `#698269` only accent; `font-heading` = BeautiqueDisplay. Reuse existing product images. `npm run check` passes.

## Task 1: Icons
- [ ] Add to `shared/icons.tsx`: `BodyWashIcon, ScrubIcon, FaceCareIcon, HairIcon, LotionIcon, MistIcon, SunIcon, MoonIcon, CheckIcon`. Typecheck. Commit.

## Task 2: Account context
- [ ] `account/AccountContext.tsx`: `AccountUser` type, `AccountProvider` (localStorage `hella-account`), `useAccount()` → `{ user, signup, login, logout }`. Passwords not persisted.
- [ ] Wrap `{children}` in `src/app/layout.tsx` with `<AccountProvider>`. Typecheck. Commit.

## Task 3: Account popup + Header
- [ ] `account/AccountMenu.tsx` (client): anchored popup; logged-out = Create Account / Log in forms (fields per spec, avatar color picker, terms checkbox); logged-in = initials avatar + menu (Tài khoản, Lịch nhắc nhở → /pages/hella-buddy, Đăng xuất).
- [ ] In `root-8a5edab2/Header.tsx`, replace the static user button with `<AccountMenu />`. Typecheck. Commit.

## Task 4: Buddy data
- [ ] `buddy/buddyData.ts`: `featureTiles`, `herOptions`, `frequencyStops`, `routineSteps` (id,label,necessary?,mustHave?,productImage?), `sampleOrderProducts`, `channels`, `boughtStepIds`. Reuse existing image paths. Typecheck. Commit.

## Task 5: Landing + Order lookup
- [ ] `buddy/BuddyLanding.tsx` (hero + 4 tiles + CTA `onStart`).
- [ ] `buddy/BuddyOrderLookup.tsx` (channel toggle, code input, simulated loading, product cards, confirm → `onConfirm(boughtStepIds)`). Typecheck. Commit.

## Task 6: Quiz
- [ ] `buddy/QuizHerCards.tsx` (Q1 multi-select), `buddy/QuizFrequencySlider.tsx` (Q2), `buddy/QuizRoutineSteps.tsx` (Q3 tick-cards, product image if bought), `buddy/QuizTimeOfDay.tsx` (Q4 sun/moon + scroll-snap time wheel).
- [ ] `buddy/BuddyQuiz.tsx` — stepped wrapper: progress "Câu hỏi n/4", renders current question, Tiếp tục/Hoàn thành, collects `answers`, `onComplete(answers)`. Typecheck. Commit.

## Task 7: Result
- [ ] `buddy/BuddyResult.tsx` — schedule summary from answers (routine steps, frequency, period+time, HER chips), Hella Sis line, suggested products for un-bought steps, "Chỉnh sửa" + "Về trang chủ". Typecheck. Commit.

## Task 8: Page + route + wire
- [ ] `buddy/HellaBuddyPage.tsx` (client): Header + phase machine (landing/order/quiz/result) + Footer, threading order→quiz bought steps.
- [ ] `src/app/pages/hella-buddy/page.tsx` (route + metadata).
- [ ] `npm run check`. Commit.

## Task 9: Visual QA (browser)
- [ ] Account: click navbar avatar → signup → logged-in avatar → menu → logout. Buddy: landing → order lookup → Q1..Q4 → result. Confirm Hella styling, slider/wheel/tick-cards work, reduced-motion safe.

## Self-Review
Spec coverage: A → T2/T3; B1 → T5; B2 → T5; B3 → T6; B4 → T7; page → T8; icons → T1; data → T4. Types: `AccountUser`, `RoutineStep`, `BuddyAnswers` consistent across data/components.
