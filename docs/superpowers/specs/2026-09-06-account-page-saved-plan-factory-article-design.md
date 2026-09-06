# Account page + Saved Timetable + Factory Article — design spec

**Date:** 2026-09-06
**Scope:** (A) Move account create/login to a dedicated page; persist the routine timetable and
show it from the logged-in avatar dropdown. (B) Rebuild `/pages/nha-may` as a rich article with
provided copy + interleaved images + related-reads. Prototype, hardcoded, Hella tokens.

Related: routine-companion + buddy-plan specs; factory-vendor-page spec.

## A1. Account page
- New route `src/app/pages/tai-khoan/page.tsx` → `AccountAuthPage` (full page): Create Account +
  Login (toggle), same fields as the old popup (Họ tên, Email, SĐT, mật khẩu×2, avatar color,
  terms) reusing shared form logic. On success → `router.push("/pages/hella-buddy")`.
- `AccountMenu` change: **logged-out** → avatar is a `Link` to `/pages/tai-khoan` (no popup).
  **logged-in** → keep the dropdown (name, "Lịch nhắc nhở của tôi" → `/pages/hella-buddy`,
  "Tài khoản của tôi", "Đăng xuất").
- Extract the create/login form into `account/AccountForm.tsx` (used by the page). Keep
  `AccountContext` as is.

## A2. Saved timetable
- `HellaBuddyPage`: on complete (and on BuddyPlan "Lưu kế hoạch") persist
  `{ answers, boughtStepIds, sessions }` to `localStorage["hella-buddy-plan"]`.
- On mount, if a saved plan exists → start in phase "result" with saved data (so the avatar
  dropdown / revisiting shows the timetable directly). Landing still shows for first-timers.
- `BuddyPlan`: accept optional `initialSessions` to restore a saved timetable; auto-save on
  complete via a callback so the plan persists even without clicking "Lưu kế hoạch".
- Add a subtle "Thiết lập lại từ đầu" link on the plan to restart from landing.

## B. Factory article (`/pages/nha-may`)
Rebuild `FactoryPage` as an article (reuse Header/Footer):
1. **Hero** — `factory-exterior.png` (Image #31) full-bleed + italic caption
   "Nhà máy Hella Beauty được đầu tư bài bản, đáp ứng các tiêu chuẩn sản xuất mỹ phẩm khắt khe."
2. **Article** (prose, max-w ~760px):
   - Title: "Hella Beauty & Khái Niệm "Minh Bạch Từ Nhà Máy": Hành Trình Định Hình Tiêu Chuẩn Nữ
     Tính An Toàn Cho Phụ Nữ Việt" + byline "Đăng bởi MKT · 13/09/2026 04:46 · 0 Bình luận".
   - Intro paragraph (verbatim).
   - H2 "HÀNH TRÌNH KHỞI NGUỒN TỪ SỰ MINH BẠCH VÀ UY TÍN" + 2 paragraphs.
   - Inline image `factory-iso9001.png` + italic caption "Đội ngũ vận hành chuyên nghiệp tuân thủ
     nghiêm ngặt các quy chuẩn an toàn quốc tế."
   - Stats strip (19.890 m² … 810 m²) — kept.
   - H2 "BẢO CHỨNG VÀNG TỪ NHỮNG CHỨNG NHẬN QUỐC TẾ" + intro + 2 cert callouts (ISO 9001:2015,
     ISO 22716:2007) with the provided descriptions (reuse cert images).
   - H2 ""TO GET HER" TỰ TIN TRONG MỌI KHOẢNH KHẮC" + 2 paragraphs + CTA
     "Khám phá ngay các dòng sản phẩm" → `/collections/cham-soc-da`.
3. **"TIẾP TỤC ĐỌC"** — 2 related cards (Image #34): "Top 5 Body Mist cho chuyến đi biển mùa hè
   2026" + "Tẩy tế bào chết body bao nhiêu lần 1 tuần là đủ để da mịn đẹp?" with short descs,
   images (reuse local), link `#`/`/blogs/news`.
- Copy lives in `factory/factoryData.ts` (`factoryArticle`, `relatedArticles`). Gentle
  reveal-on-scroll (reuse `ingredients/Reveal`).

## C. Done
`npm run check` + `npm run test` pass. Logged-out avatar → account page; create/login → redirect;
plan persists and shows from avatar dropdown; factory article renders with all copy + images.
Visual QA by user.

## D. Out of scope
Real auth/backend; real blog posts (cards link to placeholder).
