# Step 5 — "Your Plan" + Editable Timetable — design spec

**Date:** 2026-09-06
**Scope:** Replace the Step-5 result (`BuddyResult`) in the Hella Buddy flow with a richer
"Review & Ready to Run — Your Plan" screen: a generated plan + week estimate ("Get your Her") +
an editable, drag-drop weekly timetable. Prototype, hardcoded, Hella tokens (green — not the pink
of the mockup; match layout only). Reference: Image #29.

Related: routine-companion spec (2026-09-06), `DESIGN_SYSTEM.md`.

## 1. Layout (3 panels, replaces BuddyResult; still inside HellaBuddyPage "result" phase)
- **Left — "Chọn ngày chăm mình trong tuần":** 7 day toggles (Thứ 2 → Chủ nhật). Toggling a day
  adds/removes that day's session. Default selection derived from frequency.
- **Center — "MY TIMETABLE":** header ("Hôm nay" · ‹ › · "Tuần này" — static/decorative) + weekly
  grid (7 day columns × ~8 hourly rows). Care-session blocks ("Đã tới giờ chăm sóc bản thân ♡")
  on selected days at the chosen hour. Bottom hint: "Bấm và kéo thả để di chuyển · Nhấp vào lịch
  để chỉnh sửa các bước."
- **Right — "Tổng quan kế hoạch":** Tần suất · Thời gian mỗi buổi (15–20 phút) · Mục tiêu (from
  HER goals) · Thời gian dự kiến (~N tuần) + encouragement note; buttons "Chỉnh lịch của tôi"
  (→ back to quiz) + "Lưu kế hoạch" (saves to localStorage + toast/confirm).

## 2. Interactions
- **Drag-move (desktop):** HTML5 draggable blocks; day×hour cells are drop targets; drop updates
  the session's dayId + hour.
- **Click block → popover:** step checkboxes (toggle routine steps in that session), a **day + hour
  select** (move without dragging — touch-friendly), and "Xoá buổi này".
- **Click empty cell on a selected day → add** a session at that cell.
- **Left day toggle:** on → add a session that day at the chosen hour; off → remove that day's sessions.
- Grid columns for selected days are visually highlighted.

## 3. Derivation (`buddy/plan/planLogic.ts`, pure + unit-tested)
From `BuddyAnswers` + `boughtStepIds`:
- `parseTimeToHour("7:00 CH") → 19`, `"6:00 SA" → 6`, `"12:00 SA" → 0`, `"12:00 CH" → 12`.
- `defaultDaysForFrequency(idx)` → dayIds (0=Mon…6=Sun): 0→[1], 1→[1,4], 2→[1,3,6], 3→[0,1,2,3,4], 4→[0,1,2,3,4,5].
- `weeksForFrequency(idx)` → [12,10,8,6,4][idx].
- `goalFromHer(ids)` → phrase (map each HER id; join up to 2; fallback "Chăm sóc toàn diện").
- `hourWindow(hour)` → 8 consecutive hours framing the chosen hour.
- `buildInitialSessions(dayIds, hour, steps)` → one `PlanSession` per day.
- `currentWeekDates()` → Mon–Sun "dd/mm" for the current week (client-side).
Types: `PlanSession { id; dayId; hour; steps: string[] }`.

## 4. Components
- `buddy/plan/planLogic.ts` (+ `planLogic.test.ts` vitest).
- `buddy/plan/BuddyPlan.tsx` (client): owns `sessions` + `selectedDays`; renders the 3 panels,
  the grid (drag-drop + cells), and the edit popover. Props: `answers`, `boughtStepIds`, `onEdit`.
- Update `buddy/HellaBuddyPage.tsx`: "result" phase renders `<BuddyPlan/>` instead of `BuddyResult`.
- Delete `buddy/BuddyResult.tsx` (superseded).

## 5. Styling
Hella green/cream/BeautiqueDisplay. Session blocks: soft green cards with heart. Selected day
columns tinted cream. Day toggles: green check pills. Overview: stat rows with small icons + green
"Chỉnh lịch"/"Lưu kế hoạch". Grid horizontally scrollable on mobile; panels stack (left → timetable
→ right).

## 6. Done
`npm run check` + `npm run test` pass. Full flow reaches the plan; drag-move, edit popover, add/
remove, day toggles, and "Lưu kế hoạch" all work. Visual QA by user.

## 7. Out of scope
Real notifications/calendar sync. Week nav ‹ › is decorative (single current week). "Lưu kế hoạch"
persists to localStorage only.
