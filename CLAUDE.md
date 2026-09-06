@AGENTS.md

# Project: Hella Beauty prototype

This repo is a **prototype only** — a clone of https://hellabeauty.vn/ that we are extending
with new features. Keep these rules in mind for all work here.

## Purpose & scope
- **Goal is UI/UX, not infrastructure.** What matters is that the interface looks polished and
  is genuinely interactive (clickable, stateful, animated demos).
- **No backend, no database, no auth, no real APIs.** Everything is **hardcoded**. Put demo
  content, product data, links, and image paths in
  `src/components/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/data.ts` (or a local module).
  Simulate state with React `useState`/local storage — never persist to a server.
- Interactions that would normally hit a backend (add-to-cart, search, forms, filters) should
  work **client-side against hardcoded data** so the prototype feels real.

## Design fidelity (non-negotiable)
- Follow **`docs/research/hellabeauty-vn-ba054dbc/root-8a5edab2/DESIGN_SYSTEM.md`** exactly.
- **Colors:** brand green `#698269` is the *only* accent (token `--color-hella-green`); cream
  `#f6f1e7`; card placeholder `#f3efe8`; black text; white background. Do not introduce new hues.
- **Fonts:** BeautiqueDisplay (headings/nav/marquees, class `font-heading`), Helvetica Neue (body).
- **Shape:** mostly square — no rounded corners on cards/banners; only pills/badges are round.
- Reuse existing components: `SectionHeading`, `BannerCarousel`, `ProductCarousel`,
  `ImageCarousel`, `Marquee`, and icons in `shared/icons.tsx`.

## Components — prefer shadcn/ui
- shadcn/ui is installed (`components.json`, `src/components/ui/`). **Reach for shadcn primitives
  first** for new UI (dialog, sheet, input, tabs, accordion, badge, card, etc.):
  ```
  npx shadcn@latest add <component>
  ```
- After adding a shadcn component, restyle it to the Hella tokens above (green accent, square
  corners, correct fonts) rather than leaving default neutral styling.
- Keep new feature components under
  `src/components/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/`.

## Definition of done
- `npm run check` (lint + typecheck + build) passes.
- New UI matches the design system and is visually verified (screenshot).
