# SOLUTION 3 — Loyalty "Level Her Up" — design spec

**Date:** 2026-09-06
**Scope:** Loyalty page `/pages/loyalty`: a giant star-jar that fills with falling stars, a +10
reward popup, X/100 progress, a 4-tier strip (locked = blur + key), per-tier vouchers, and a
Màn 1 → Màn 2 transition (fill jar → new jar pre-filled with bonus stars). Prototype, hardcoded,
CSS/SVG animation (no WebGL). Reference: hand-drawn Image #54.

## 1. Data (`loyalty/loyaltyData.ts`)
`Voucher { id, label, brand, code, state: "available"|"used" }`.
`Tier { id, name, range, meaning, rate, bonus, color, vouchers[] }`:
- HER BLOOM — "0–99 Stars" — "Bắt đầu hành trình" — "1 đơn 100k = 10 sao" — bonus 0.
- HER GLOW — "100–299 Stars" — "Routine & relationship bắt đầu hình thành" — "= 20 sao" — bonus 40.
- HER SHINE — "300–499 Stars" — "Active customer" — "= 30 sao" — bonus 60.
- HER ICON — "500+ Stars" — "Highest tier" — "= 40 sao" — bonus 80.
Vouchers distributed per tier (Free ship / 10% Hella; 20% Hella TikTok Shop; 30% Shin Spa +
early access; 50% Watson + birthday + priority). Jar capacity = 100 stars.

## 2. StarJar (`loyalty/StarJar.tsx`, client)
Props `{ fillPercent: number; color: string; dropping: boolean }`. A wide SVG/rounded glass
vessel (overflow-hidden). Inside: a rising gold **fill layer** (height = fillPercent%, transition
~1.4s) sprinkled with small star glyphs. When `dropping`, ~10 gold stars animate falling from
top-center (staggered CSS keyframe, slight x-drift) into the jar. Respects reduced-motion.

## 3. LoyaltyPage (`loyalty/LoyaltyPage.tsx`, client)
State: `tierIndex` (0=Bloom…), `stars` (0–100 in current jar), `dropping`, `popup`, `celebrate`.
- Header + Footer.
- Flow on mount (Màn 1): tierIndex 0, stars 90 → show popup "Chúc mừng bạn đã hoàn thành đơn hàng
  và nhận được 10 sao" → on dismiss/auto: `dropping=true`, stars → 100 → after fill, `celebrate`
  → advance to Màn 2: tierIndex 1 (Her Glow), stars = 40 (bonus), vouchers of Glow unlock.
- Big `StarJar` (color per tier) + heading "{TIER}: {stars} / 100 ★" + progress bar.
- **Tier strip:** 4 mini jars; index < tierIndex = completed (filled), = tierIndex = current,
  > tierIndex = locked (blur + key). Labels + star range.
- **Vouchers:** current tier's vouchers as cards with "Nhận mã ngay" (available) / "Đã dùng"
  (used); locked-tier vouchers shown greyed with a key.
- A "Hoàn thành đơn hàng (+10 sao)" demo button to replay the fill if not auto.

## 4. Entry
Account dropdown gains "Sao thưởng của tôi" → `/pages/loyalty`. Route not in main nav.

## 5. Styling / responsive
Hella green/cream/BeautiqueDisplay; gold `#e8c14a` stars. Jar centered, large on desktop, scales
on mobile; tier strip scrolls on mobile; vouchers stack. `prefers-reduced-motion` safe.

## 6. Done
`npm run check` passes. Load → popup → stars fall → jar fills → Màn 2 (Glow, 40★). Tier strip
lock states + vouchers correct. QA by user (incl. mobile).

## 7. Out of scope
Real points backend / voucher redemption. Star totals are demo values.
