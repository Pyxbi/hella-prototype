# Intelligent Routine Companion + Account System — design spec

**Date:** 2026-09-06
**Scope:** (A) Prototype account system (navbar avatar → create/login popup, localStorage).
(B) "Hella Buddy" routine companion flow at `/pages/hella-buddy`: landing → order lookup →
4-question quiz → personalized schedule summary. Prototype, hardcoded, Hella tokens.

Related: `DESIGN_SYSTEM.md`, `CLAUDE.md`. Reference images provided (#15/#17/#19/#21/#23/#25).

## A. Account system
- `account/AccountContext.tsx` — client context + provider. `user: AccountUser | null`
  (`{name,email,phone,avatarColor}`). `signup(data)`, `login(email)`, `logout()`. Persists to
  `localStorage["hella-account"]`. Passwords are entered in the form but NEVER stored (demo only).
- Wrap `{children}` in `src/app/layout.tsx` with `<AccountProvider>`.
- `account/AccountMenu.tsx` — popup anchored under the Header user icon:
  - Logged-out: tabs/toggle Create Account / Log in. Signup fields: Họ và tên, Email, Số điện
    thoại, Mật khẩu, Nhập lại mật khẩu; avatar circle with a color-swatch picker
    ("Chỉnh sửa nền avatar"); checkbox "Đồng ý Điều khoản & Chính sách bảo mật"; button
    "Tạo tài khoản"; footer "Đã có tài khoản? Đăng nhập". Login: Email + Mật khẩu + "Đăng nhập".
  - Logged-in: initials-on-color avatar + name/email + menu (Tài khoản của tôi, Lịch nhắc nhở →
    `/pages/hella-buddy`, Đăng xuất).
- `root-8a5edab2/Header.tsx` — replace the static user button with `<AccountMenu />` (shows
  initials avatar when logged in). Header stays a client component.

## B. Routine companion `/pages/hella-buddy`
`HellaBuddyPage.tsx` (client) owns state: `phase: "landing"|"order"|"quiz"|"result"`, `order`
(channel, code, found products, bought step ids), `answers` (her[], frequency, steps[], period,
time). Renders Header + phase view + Footer.

### B1. Landing (`BuddyLanding.tsx`)
Hero (product image + "Để Hella Sis đồng hành, giúp bạn duy trì routine đều đặn" / EN "Let Hella
Buddy keep you on track") + CTA "Thiết lập lịch nhắc nhở của tôi" → phase "order". 4 feature
tiles: Lịch trình cá nhân hoá / Nhắc nhở đúng lúc / Đồng hành & hỗ trợ / Hiệu quả rõ rệt.

### B2. Order lookup (`BuddyOrderLookup.tsx`)
Title "Xác nhận đơn hàng của bạn tại Hella Beauty", "Bước 1/3". Channel toggle
Shopee/TikTok Shop/Website. Input "Vui lòng nhập mã đơn hàng của bạn" + "Tìm đơn hàng" →
simulated 1.2s loading → sample ordered products (image cards, reusing existing product images) →
"Xác nhận đúng sản phẩm tôi đã mua" → sets `order.boughtSteps` and phase "quiz". Any non-empty
code works (demo).

### B3. Quiz (`BuddyQuiz.tsx`, stepped, progress "Câu hỏi n/4", Tiếp tục / Hoàn thành)
- Q1 `QuizHerCards` — "'Her' mong muốn trong bạn là gì?" multi-select 4 cards: HER chỉn chu /
  HER nâng niu / HER tươi mới / HER vào nếp (with the descriptions).
- Q2 `QuizFrequencySlider` — "Mỗi tuần, bạn thường dành bao nhiêu ngày…" slider, 5 stops:
  1 ngày/tuần · 2 ngày/tuần · 3–4 ngày/tuần · 5–6 ngày/tuần · Gần như mỗi ngày.
- Q3 `QuizRoutineSteps` — "Routine chăm sóc hiện tại…" tick-cards, 6 steps:
  Tắm Gội*, Tẩy tế bào chết*, Chăm sóc da mặt (must have), Chăm sóc tóc (must have),
  Body Lotion, Xịt thơm. `*` = necessary badge; "must have" = small tag. Steps whose product was
  "bought" (from order) show the product image + "Đã mua tại Hella" ✓; others show an icon +
  "Chưa mua". Multi-select.
- Q4 `QuizTimeOfDay` — "Bạn thường dành thời gian chăm sóc bản thân vào lúc nào?" Sun (buổi sáng)
  / Moon (buổi tối) toggle → time wheel (scroll-snap hour + SA/CH) → pick time.
- "Hoàn thành" → phase "result".

### B4. Result (`BuddyResult.tsx`) — step 5
"Lịch nhắc nhở của bạn đã sẵn sàng ✦" + recap: selected routine steps, chosen frequency, period +
time, HER goals as chips; a Hella Sis message; suggested Hella products for steps not yet bought
(with buy CTA). "Chỉnh sửa" (back to quiz) + "Về trang chủ".

## C. Data & assets
`buddy/buddyData.ts`: `featureTiles`, `herOptions`, `frequencyStops`, `routineSteps`
(id,label,necessary?,mustHave?,icon,productImage?), `sampleOrderProducts`, `channels`. Reuse
existing images under root-8a5edab2/images + collections/images (no new downloads).
Icons (add to `shared/icons.tsx`): BodyWashIcon, ScrubIcon, FaceCareIcon, HairIcon, LotionIcon,
MistIcon, SunIcon, MoonIcon, CheckIcon.

## D. Styling
Cream/green/BeautiqueDisplay, square (pills/cards rounded per mockups which use soft-rounded cards
— localized, matching the provided images). Progress + transitions smooth; reduced-motion safe.
Mobile-first.

## E. Done
`npm run check` passes. Account popup works (signup/login/logout, avatar). `/pages/hella-buddy`
runs the full flow end to end. Visual QA by user.

## F. Out of scope / notes
Real auth/backend/notifications. "Lịch nhắc nhở" is a visual summary only. Order lookup is
simulated (any code returns the sample order).
