# TikTok Video Feed Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:executing-plans. Steps use `- [ ]`.

**Goal:** Add a "Khám phá Hella từ TikTok" video-feed section (5 cards → modal TikTok player → jump to category) below the Hella Sis bar.

**Architecture:** Hardcoded `tiktokVideos` data + 3 presentational/stateful components (Feed/Card/Modal). Modal embeds the real TikTok via iframe. Posters are real oEmbed thumbnails downloaded locally.

**Tech Stack:** Next.js 16, React 19, Tailwind v4, shadcn `dialog`.

**Spec:** `docs/superpowers/specs/2026-09-06-tiktok-feed-design.md`

## Global Constraints
- Prototype, hardcoded, no backend. Green `#698269` only accent; `font-heading` = BeautiqueDisplay.
- New components under `.../root-8a5edab2/`; verify with `npm run check`.
- TikTok category pages are pending; links point to `/collections/...`.

## File Structure
- Create `scripts/download-tiktok-hellabeauty-vn-ba054dbc-root-8a5edab2.mjs` — oEmbed → download posters.
- Create `.../root-8a5edab2/tiktokFeed.ts` — `TikTokVideo` type + `tiktokVideos`.
- Modify `.../shared/icons.tsx` — add `PlayIcon`, `TikTokIcon`.
- Create `.../root-8a5edab2/TikTokCard.tsx`, `TikTokModal.tsx`, `TikTokFeed.tsx`.
- Modify `src/app/page.tsx` — render `<TikTokFeed />` after `<HellaSis />`.

---

## Task 1: Posters + data

- [ ] Write `scripts/download-tiktok-*.mjs`: for each of the 5 canonical URLs, GET
  `https://www.tiktok.com/oembed?url=<url>`, read `thumbnail_url`, download to
  `public/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/tiktok/<videoId>.jpg` (4-at-a-time, UA header).
- [ ] Run it; confirm 5 posters saved (log count). If any fail, note fallback image to use.
- [ ] Create `tiktokFeed.ts` with the type + the 5 hardcoded `TikTokVideo` objects (data from spec §2;
  `poster` = `/sites/.../tiktok/<videoId>.jpg`, or a local fallback for any that failed).
- [ ] Commit.

Type:
```ts
export interface TikTokVideo {
  id: string;          // slug
  user: string;        // @handle (no @)
  videoId: string;
  url: string;         // canonical watch URL (fallback link)
  embedUrl: string;    // https://www.tiktok.com/embed/v2/<videoId>
  poster: string;      // local image path
  categoryTag: string; // pill label
  title: string;
  description: string;
  categoryHref: string;
}
export const tiktokVideos: TikTokVideo[];
export const tiktokProfileUrl = "https://www.tiktok.com/@hellabeauty.essentials";
```

## Task 2: Icons
- [ ] Add `PlayIcon` (triangle) and `TikTokIcon` (note glyph) to `shared/icons.tsx`. Typecheck. Commit.

## Task 3: Card + Modal + Feed
- [ ] `TikTokModal.tsx` — props `{ video: TikTokVideo | null; onClose: () => void }`. Uses shadcn
  `Dialog` (controlled `open={!!video}`). Body: portrait iframe `src={video.embedUrl}`
  (`allow="autoplay; encrypted-media; fullscreen"`, `className` ~9:16), title, green
  "Khám phá ngay →" `Link` to `categoryHref`, and a muted "Mở trên TikTok" external link.
- [ ] `TikTokCard.tsx` — props `{ video; onPlay: () => void }`. Poster (`next/image` fill on
  `#f3efe8`, `rounded-2xl` top), TikTok badge top-left, centered white play button (calls onPlay),
  category pill bottom-left; below: title, description, "Xem thêm sản phẩm →" Link to categoryHref.
- [ ] `TikTokFeed.tsx` (`"use client"`) — heading "Khám phá Hella từ TikTok" + subtitle +
  "Xem tất cả" link (tiktokProfileUrl); horizontal scroll-snap row of `TikTokCard` (5 across
  `lg`, 2 `sm`, ~1.2 mobile); `useState<TikTokVideo | null>` for active; renders `TikTokModal`.
- [ ] Typecheck. Commit.

## Task 4: Wire + check
- [ ] In `page.tsx`, import `TikTokFeed`; render `<TikTokFeed />` between `<HellaSis />` and the
  Instagram `<ImageCarousel />`.
- [ ] `npm run check` passes. Commit.

## Task 5: Visual QA (when browser available)
- [ ] Section renders below the bar; 5 cards; clicking play opens modal; embed loads; "Khám phá
  ngay" routes to `/collections/...`; "Mở trên TikTok" opens the video; mobile scroll works.

## Self-Review
- Spec coverage: §1 flow → Tasks 3/4; §2 data → Task 1; §3 arch → all; §4 styling → Task 3;
  §5 testing → Tasks 4/5. Covered.
- No placeholders except intentional pending `/collections/...` + "Xem tất cả" profile link.
- Types consistent: `TikTokVideo` used identically across Card/Modal/Feed.
