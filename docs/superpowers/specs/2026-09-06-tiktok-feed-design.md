# Góc "Chị Em" Review — TikTok Video Feed (design spec)

**Date:** 2026-09-06
**Scope:** New homepage section: an integrated social-video feed of 5 Hella Beauty TikToks,
below the Hella Sis question bar. Prototype only, hardcoded, extensible. Modeled on
garnier.co.uk's social feed.

Related: `docs/research/hellabeauty-vn-ba054dbc/root-8a5edab2/DESIGN_SYSTEM.md`, `CLAUDE.md`.

## 1. Flow
1. Below the Hella Sis bar, a section **"Khám phá Hella từ TikTok"** shows a row of 5 video cards.
2. Each card = a product tied to a category (Dưỡng Da Body / Dưỡng Tóc / Dưỡng Da Mặt / Lưu Hương).
3. Clicking a card opens a **modal** that embeds and plays the real TikTok (iframe
   `https://www.tiktok.com/embed/v2/{videoId}`).
4. The modal has **"Khám phá ngay →"** that navigates to that category's collection page, plus a
   **"Mở trên TikTok"** fallback link. Card also has **"Xem thêm sản phẩm →"** → same category page.
5. Category pages are **pending** (cloned later); links point forward to `/collections/...`.

## 2. Resolved video data (hardcoded)
| Title | Pill | @user/videoId | categoryHref | Description |
|-------|------|---------------|--------------|-------------|
| Tẩy tế bào chết body | Dưỡng Da Body | @herilamreview/7605658413804162322 | /collections/cham-soc-da | Da mịn màng, sáng khoẻ sau mỗi lần sử dụng |
| Oil Control Hair Lotion | Dưỡng Tóc | @hellabeautyessentials/7663794948260580626 | /collections/cham-soc-toc | Kiểm soát dầu thừa, tóc bồng bềnh tự nhiên |
| Mặt nạ nghệ dưỡng da | Dưỡng Da Mặt | @vintace.ci/7235121983220976901 | /collections/cham-soc-da-mat | Giúp làm sáng, mờ thâm và hỗ trợ giảm mụn |
| Body Mist Matcha Mochi | Lưu Hương | @minaashmi/7463820005998628114 | /collections/bo-suu-tap-bodymist | Hương thanh ngọt ngào, lưu hương suốt ngày dài |
| Sữa tắm dưỡng ẩm | Dưỡng Da Body | @tranbaonu2809/7618558569050393864 | /collections/cham-soc-da | Làm sạch dịu nhẹ, da mềm mịn & ẩm mượt |

Posters: real TikTok oEmbed thumbnails downloaded to
`public/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/tiktok/{videoId}.jpg` (fallback: on-brand
local image if a fetch fails).

## 3. Architecture
- `tiktokFeed.ts` — `TikTokVideo` type + `tiktokVideos: TikTokVideo[]` (add a card = add an object).
- `TikTokCard.tsx` — presentational card (poster, TikTok badge, play btn, pill, title, desc,
  "Xem thêm sản phẩm" link). `onPlay()` opens modal.
- `TikTokModal.tsx` — shadcn Dialog; iframe embed of active video + "Khám phá ngay" + "Mở trên TikTok".
- `TikTokFeed.tsx` (client) — section wrapper: heading + "Xem tất cả" + responsive card row +
  modal open-state (`activeVideo`).
- Icon: reuse; add `PlayIcon`, `TikTokIcon` to `shared/icons.tsx`.
- `page.tsx` — render `<TikTokFeed />` right after `<HellaSis />`.
- Asset script `scripts/download-tiktok-hellabeauty-vn-ba054dbc-root-8a5edab2.mjs` — oEmbed →
  download posters.

## 4. Styling (Hella tokens + mockup)
Soft-rounded cards (`rounded-2xl`) per the provided mockup (localized, intentional departure from
the site's square default). Green category pills, green "Xem thêm sản phẩm" links, white circular
play button, black TikTok badge. Heading `font-heading text-hella-green`. 5 across on desktop,
horizontal scroll-snap on mobile. Modal: white, portrait video area, green "Khám phá ngay" button.

## 5. Testing & done
- `npm run check` passes. Posters downloaded. Manual UI check (embed loads; "Khám phá ngay" routes;
  fallback link works).
- Graceful degradation: if an embed can't load, poster + "Mở trên TikTok" + "Khám phá ngay" still work.

## 6. Out of scope
- Real category pages (pending). "Xem tất cả" → placeholder. No analytics.
