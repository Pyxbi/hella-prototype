# Account page + Saved Timetable + Factory Article — Plan

> REQUIRED SUB-SKILL: superpowers:executing-plans. Steps use `- [ ]`.

**Spec:** `docs/superpowers/specs/2026-09-06-account-page-saved-plan-factory-article-design.md`

## Global Constraints
Prototype, hardcoded, localStorage only (no real auth); passwords never stored. Green `#698269` only accent; `font-heading` = BeautiqueDisplay. `npm run check` + `npm run test` pass.

## Task 1: Account form extraction + page
- [ ] `account/AccountForm.tsx`: the create/login form (extracted from AccountMenu), props `{ onDone?: () => void }`; on submit calls context signup/login then onDone.
- [ ] `src/app/pages/tai-khoan/page.tsx`: `AccountAuthPage` (client) centering `AccountForm`; onDone → `useRouter().push("/pages/hella-buddy")`. Metadata.
- [ ] `AccountMenu.tsx`: logged-out → avatar is a Link to `/pages/tai-khoan` (remove signup popup); logged-in → keep dropdown. Typecheck. Commit.

## Task 2: Saved plan persistence
- [ ] `HellaBuddyPage.tsx`: add `savePlan({answers,boughtStepIds,sessions})` → localStorage `hella-buddy-plan`; on mount, hydrate: if saved → set answers/bought and phase "result" (pass savedSessions to BuddyPlan). `onComplete` also saves. Provide `onRestart` → phase "landing".
- [ ] `BuddyPlan.tsx`: accept `initialSessions?` (seed state), `onPersist?(sessions)` (call on change + on save + once on mount), and a "Thiết lập lại từ đầu" link (`onRestart`). Typecheck. Commit.

## Task 3: Factory data (article)
- [ ] `factory/factoryData.ts`: add `factoryArticle` (title, author, date, sections[] of {heading?, paragraphs[], image?, caption?}), and `relatedArticles` (2 items: title, desc, image, href) reusing local images. Typecheck. Commit.

## Task 4: Factory article page
- [ ] Rewrite `factory/FactoryPage.tsx` as the article layout (hero + caption, byline, prose sections with inline image+caption, stats strip, cert callouts, TO GET HER + CTA, "Tiếp tục đọc" cards). Reuse `ingredients/Reveal`. Typecheck. Commit.

## Task 5: Check + QA
- [ ] `npm run check` + `npm run test`.
- [ ] Browser QA: logged-out avatar → account page → create → redirect + logged-in; dropdown "Lịch nhắc nhở" → saved timetable; factory article reads top-to-bottom with images/captions + related cards. Commit any fixes.

## Self-Review
Spec coverage: A1 → T1; A2 → T2; B → T3/T4. Types: `AccountUser`, `PlanSession`, `BuddyAnswers`, factory article types consistent.
