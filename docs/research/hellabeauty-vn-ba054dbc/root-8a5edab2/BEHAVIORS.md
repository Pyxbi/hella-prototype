# Hella Beauty — Behaviors

## Interaction models (verified via scroll + click sweep)
- **AnnouncementBar** — auto-rotates 3 messages (~4s), ‹ › arrows for manual step. Text 14px black on white.
- **HeroSlideshow / Slideshow2** — Swiper fade autoplay (~5s), ‹ → side arrows, no dots. Full-bleed cover images.
- **Marquees** — pure CSS infinite horizontal scroll (`translateX(-50%)` loop), BeautiqueDisplay 28px uppercase.
- **ProductCarousel** — horizontal scroll-snap track; desktop shows 4 cards, tablet 2, mobile ~1. CollectionList2 shows diamond pagination dots (active tracks scroll position). Card hover: image scales 1.05, title → green.
- **ShopTheLook** — full-bleed 2-slide swiper, controls bottom-left (‹ "1 / 2" →).
- **Vendor / Instagram carousels** — 6-image scroll-snap track (desktop 6 across, tablet 4, mobile ~1) + 6 diamond dots. Centered green heading.
- **Nav dropdown** — "Chăm sóc toàn diện" reveals submenu on hover (desktop) / expanded inline (mobile drawer).
- **FloatingContact** — fixed right stack (phone/zalo/email/messenger), hover scale.

## Responsive
- Nav collapses to hamburger drawer below `lg` (1024px).
- Product grids: 4 → 2 → 1 columns; image carousels: 6 → 4 → 1.
- Footer: 3 columns → stacked; bottom bar row → column.
- Full-bleed banners: heights scale 600→520→380px (hero), 675→560→420px (shop-the-look).

## Notes / known differences
- Carousels rebuilt as a lightweight custom scroll-snap + fade implementation (no external Swiper dependency) to match behavior without the vendor lib.
- Product card images are the target's own theme decorative PNGs (static demo cards on the live homepage), reused verbatim.
- Collection banner = product photo (`collection_banner.png`) + rotating circular sale badge overlay (`collection_banner_group.png`).
