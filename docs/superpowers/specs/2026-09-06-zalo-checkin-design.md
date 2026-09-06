# STEP 6 — Zalo OA Daily Check-in mini-site — design spec

**Date:** 2026-09-06
**Scope:** Standalone `/checkin` page (mobile-first, NOT in main nav — simulates the page opened
from a Zalo OA notification link). User ticks routine steps → Check-in → congrats + emotion
feedback → star reward (loyalty later). Prototype, hardcoded, reads the logged account's saved plan.

Related: routine-companion / buddy-plan specs. Reference images #49/#50/#51.

## 1. Entry (prototype simulation)
- Zalo OA notification is out of scope (can't prototype). Simulate access: account dropdown gains
  "Check-in hôm nay" → `/checkin`; BuddyPlan gets a "Mở bản check-in (Zalo)" link. `/checkin` is a
  standalone route, not added to `navLinks`.

## 2. Check-in page (`checkin/CheckinPage.tsx`, client, mobile-first)
- Light top bar (hella logo). Title "Cùng Hella Sis chăm sóc bản thân mình nhé" + sub
  "Hoàn thành từng bước để check-in routine hôm nay."
- **Routine steps checklist** (fixed order per STEP 6):
  1. Tẩy tế bào chết * (3–5 phút) · 2. Tắm gội * (5–7 phút) · 3. Chăm sóc tóc (3–5 phút) ·
  4. Chăm sóc da mặt (3–5 phút) · 5. Xịt thơm (1 phút).
  Each row: number badge, product image if bought (from saved plan `boughtStepIds`, else demo set)
  otherwise category icon, label (+ * mandatory), "Hiệu quả nhất: X", "Bắt buộc"/"Tùy chọn" tag,
  and a tick circle (toggle).
- Note "* Các bước có dấu sao là bắt buộc để hoàn thành check-in."
- **Check-in** button (disabled until both mandatory steps ticked).

## 3. Post check-in (modal overlay, no navigation)
- Phase "feeling": "Chúc mừng bạn đã tiến gần hơn một bước đạt được “HER” mong muốn" +
  "How are you feeling today?" + 5 emotion faces (Not great / Tired / Okay / Good / Amazing,
  red→green) over a gradient bar. Selecting one →
- Phase "reward": "Bạn nhận được ⭐ +50 sao!" star burst + "Tích luỹ vào Loyalty (sắp ra mắt)" +
  "Hoàn tất" (close → reset ticks or show done state).

## 4. Data (`checkin/checkinData.ts`)
`checkinSteps` (id maps to buddy `routineSteps` for productImage + icon), `feelings`
(id,label,color). Bought steps: read `localStorage["hella-buddy-plan"].boughtStepIds`; fallback
demo `[tay-tbc, tam-goi, da-mat, cham-toc]`.

## 5. Styling / responsive
Hella green/cream/BeautiqueDisplay, rounded cards per mockup. Centered `max-w-md` column; works
on mobile and desktop. Star + faces = inline SVG (add `StarIcon`).

## 6. Done
`npm run check` passes. `/checkin` renders the checklist (bought → product image), Check-in gates
on mandatory, congrats+emotion→reward works. Verify mobile layout. QA by user.

## 7. Out of scope
Zalo OA notification/webhook; real loyalty points (reward is a visual placeholder).
