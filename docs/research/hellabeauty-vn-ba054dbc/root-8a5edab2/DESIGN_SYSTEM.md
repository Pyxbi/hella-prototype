# Hella Beauty — Design System

The single source of truth for building **new features** into the cloned Hella Beauty site
(`https://hellabeauty.vn/`). Every value here is taken from the live site's computed styles
or from the tokens/components already shipped in this repo. Match these exactly — do not
introduce new colors, fonts, or radii without adding them here first.

Tokens live in `src/app/globals.css`. Components live in
`src/components/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/`.

---

## 1. Colors

| Role | Hex | Token / usage |
|------|-----|---------------|
| **Brand green** (all section headings, links hover, dots, accents) | `#698269` | `--color-hella-green`, class `text-hella-green` |
| **Cream / beige** (footer curve, soft section backgrounds) | `#f6f1e7` | `--color-hella-cream` |
| **Card placeholder** (behind product/gallery images) | `#f3efe8` | inline `bg-[#f3efe8]` |
| **Text — primary** | `#000000` | `text-black` (body copy uses `text-black/80`) |
| **Text — muted** | `rgba(0,0,0,0.7–0.8)` | `text-black/70`, `text-black/80` |
| **Background — page** | `#ffffff` | `bg-white` |
| **Borders / hairlines** | `rgba(0,0,0,0.05–0.10)` | `border-black/5`, `border-black/10` |

**Floating contact button colors** (keep these exact if extending the widget):

| Button | Hex |
|--------|-----|
| Phone | `#e53935` (red) |
| Zalo | `#0068ff` (blue) |
| Email | `#29b6f6` (light blue) |
| Messenger | `#0084ff` (blue) |

> Rule of thumb: **green is the only accent color.** New CTAs, active states, highlights,
> and links all use `#698269`. Never introduce a second accent hue.

---

## 2. Typography

Two families only.

| Family | Where | Fallback stack |
|--------|-------|----------------|
| **BeautiqueDisplay** (serif) | ALL headings, nav links, marquees, footer column titles, italic sub-labels | `Georgia, serif` |
| **Helvetica Neue** (sans) | body copy, product titles, footer body text, buttons | `Helvetica, Arial, sans-serif` |

- Heading font token: `--font-heading` → apply with the `font-heading` class.
- Body font token: `--font-sans` (default on `<body>`).
- Font file: `public/sites/hellabeauty-vn-ba054dbc/shared/fonts/BeautiqueDisplay.ttf` (weight 400).

### Type scale (desktop computed values from the live site)

| Element | Size | Weight | Font | Notes |
|---------|------|--------|------|-------|
| Large section heading (collection lists, vendor, instagram) | **56px** | 400 | BeautiqueDisplay | green; `leading-tight` |
| Collection banner heading | **36px** | 400 | BeautiqueDisplay | green |
| Product-tab heading | **30px** | 400 | BeautiqueDisplay | green |
| Marquee text | **28px** | 400 | BeautiqueDisplay | **UPPERCASE**, line-height 36px |
| Footer column titles | **24px** | 400 | BeautiqueDisplay | black |
| Sub-label above headings | **~16px** | 400 | BeautiqueDisplay | *italic*, `text-black/80` |
| Nav links | **14px** | 500 | BeautiqueDisplay | black → green on hover |
| Announcement bar | **14px** (13px mobile) | 400 | Helvetica Neue | black |
| Body / footer copy / product titles | **14px** | 400 | Helvetica Neue | `text-black` or `/80` |

New headings → `font-heading text-hella-green`. New body text → default sans, 14–16px.

---

## 3. Layout & spacing

- **Container max-width:** `1400px`, centered (`mx-auto max-w-[1400px]`).
- **Horizontal gutters:** `px-5` (mobile) → `lg:px-10`.
- **Section vertical padding:** `py-10` to `py-20` (`py-14`/`py-16` typical); tighten on mobile.
- **Fixed heights:** announcement bar `44px`, header `77px`, marquee bar `120px`, full-bleed
  hero `600px` (→ `520px` sm → `380px` mobile), shop-the-look banner `675px`.
- **Grid gaps:** cards use `gap-6` (24px); banner/footer use `gap-8`–`gap-12`.
- **Border radius:** the brand is **mostly square** — images and cards have **no radius**.
  Only pills/badges/round buttons are circular (`rounded-full`). Dropdown menus use a small
  `rounded-md`. Do **not** add rounded corners to product cards or banners.

---

## 4. Components & patterns (reuse these)

| Need | Use |
|------|-----|
| Sub-label + big green heading | `SectionHeading` (`subtitle`, `title`, `align`, `titleClassName`) |
| Full-bleed image slideshow | `BannerCarousel` (`slides`, `heightClass`, `controls`, `autoplay`) |
| Product card row + dots | `ProductCarousel` (`subtitle`, `title`, `products`, `showDots`) |
| 6-up image gallery + dots | `ImageCarousel` |
| Scrolling text band | `Marquee` (`text`, `duration`) — auto-uppercases |
| SVG icons | `shared/icons.tsx` (add new ones here, name by function) |
| Structured content/data | `root-8a5edab2/data.ts` — put all copy, links, image paths here |

### Interaction conventions
- **Hover:** links/titles fade to green; images `scale-105`; buttons `scale-105` + shadow.
- **Transitions:** `transition` / `duration-300`–`duration-700`, `ease-in-out`. Nothing snappy.
- **Carousels:** custom scroll-snap track + fade (no Swiper dependency). Autoplay ~5s.
- **Pagination dots:** diamond (`.hella-dot`, 8px square rotated 45°, filled green when active).
- **Responsive:** mobile-first. Nav collapses to a hamburger drawer below `lg` (1024px);
  multi-column grids stack; carousels reduce items-per-view.

### Imagery
- Product / gallery images: object-cover, square or 3:4, on a `#f3efe8` placeholder.
- Full-bleed banners: `object-cover`, 100vw.
- Always give real `alt` text; use `next/image` with `fill` + `sizes`.

---

## 5. How to add a new feature (the loop we'll run)

1. You send me the **feature + image/example**.
2. I map it onto the tokens above (colors, fonts, spacing, existing components).
3. I add copy/links/images to `data.ts`, build the component in the page-key folder
   (reusing `SectionHeading` / carousels where possible), and wire it into `page.tsx`
   at the right position.
4. I run `npm run check` and screenshot it, then show you.

Anything not covered by a token above, I'll flag and we decide together before I invent it.
