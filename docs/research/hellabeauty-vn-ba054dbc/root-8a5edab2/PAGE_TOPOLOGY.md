# Hella Beauty — Homepage Topology

Source: https://hellabeauty.vn/ (Haravan theme, Swiper 8)
Destination route: `/` (`src/app/page.tsx`)
Page height ≈ 6390px desktop. Body bg white; footer has cream curved top.

## Design Tokens
- **Heading font:** BeautiqueDisplay (local .ttf, 400) — serif, used for all headings, nav, marquees.
- **Body font:** "Helvetica Neue", Helvetica, Arial, sans-serif (system).
- **Brand green:** `rgb(105,130,105)` = `#698269` (all big section headings).
- **Text black:** `#000`. Body bg `#fff`. Cream/beige accents in footer + section bgs.
- Announcement bar text 14px; nav 14px/500 BeautiqueDisplay.

## Sections (top → bottom)
1. **AnnouncementBar** — rotating 3 messages, 44px, ‹ › arrows, black text on white. Interaction: auto-rotate carousel.
2. **Header** — logo (hella beauty), centered nav (Câu chuyện thương hiệu / Chăm sóc toàn diện ▾ / Bài viết), right icons: search, account, cart(0). Relative position.
3. **HeroSlideshow** — 3 full-bleed image slides (hero_slide_1..3.jpg, 1920×960), 600px, ‹ › arrows, no dots, auto-advance.
4. **Marquee1** — "HELLA BEAUTY - HELLA BEAUTY …" uppercase BeautiqueDisplay 28px, scrolling L, 120px bar.
5. **Slideshow2** — 2 full-bleed banner slides (slideshow2_1.jpg, slideshow2_2.jpg), 600px, arrows.
6. **Marquee2** — "FREE SHIPPING - INSTANT DELIVERY" uppercase 28px, scrolling, 120px.
7. **CollectionBanner** — left product image (collection_banner_group.png), right text: sub "Chương trình HOT tháng 7 dành riêng cho tín đồ Hella Beauty" + heading "Mua hàng - Nhận quà" (green 36px). 590px.
8. **ProductTabHeading** — sub "Chăm Sóc Tóc Không Sulfate, Silicone & PEG" + heading "Trải Nghiệm Diệu Kì Cho Mái Tóc Mây" (green 30px). Heading-only block.
9. **CollectionList1** — sub "Luôn xinh đẹp với" + heading "Combo siêu xịn - chăm da siêu mịn" (green 56px) + 4 product cards (collection_list_1..4.png). Swiper carousel.
10. **CollectionList2** — sub "Da trắng sáng với" + heading "Combo Tẩy Tế Bào Chết" (green 56px) + 4 product cards (collection_list_6b_1..4.png) + diamond dot pagination.
11. **ShopTheLook** — full-bleed 2-slide banner swiper (shop_the_look_1.png, shop_the_look_2.png), ‹ → arrows + "1/2" counter. 675px.
12. **VendorCarousel** — centered sub "BÍ QUYẾT NÂNG CẤP LÀN DA" + heading "Hella Beauty" (green 56px, centered) + 6-image carousel (vendor_1..6.png) + 6 diamond dots.
13. **InstagramCarousel** — centered sub "Instagram" + heading "Hella Beauty" + 6-image carousel (ig_1..6.png) + 6 diamond dots.
14. **Footer** — cream curved top; centered logo; 3 columns (company info + "Về Hella Beauty" + "Hỗ Trợ Khách Hàng"); Bộ Công Thương badge; social row (Facebook/Instagram/Tiktok); bottom bar with company line + market icons (Tiki/Shopee/Lazada).
15. **FloatingContact** — fixed right-side stack: phone, zalo, email, messenger.

## Interaction models
- Slideshows/carousels: Swiper-style (autoplay + arrows/dots). Rebuild with a lightweight custom carousel (no external Swiper dep) — CSS transform track + JS index.
- Marquees: CSS keyframe infinite horizontal scroll.
- Nav dropdown: hover-reveal submenu under "Chăm sóc toàn diện".
