# Hella Sis — Beauty Assistant (design spec)

**Date:** 2026-09-06
**Scope:** New interactive feature on the Hella Beauty homepage clone. Prototype only —
hardcoded, no backend/AI. Must be easy to extend with more question→answer pairs later.

Related: `docs/research/hellabeauty-vn-ba054dbc/root-8a5edab2/DESIGN_SYSTEM.md`,
`CLAUDE.md` (prototype rules).

---

## 1. Goal & user flow

"Hella Sis" is a beauty-assistant search bar that behaves like a Google search box but
answers like a chatbot (all answers hardcoded).

1. Scrolling past the Vendor carousel reveals the **Hella Sis section**: a title
   *"Hella Sis - Trợ lý làm đẹp dành riêng cho bạn"* above a pill **search bar** with a ✦ icon
   and placeholder *"Ask Hella Sis anything about your body care routine…"*.
2. Focusing/clicking the bar drops down **suggestion questions**. Typing **filters** the list
   live (Google-style).
3. Picking a suggestion **or** submitting typed text opens a **floating chat panel
   (fixed bottom-right)**; Hella Sis replies.
   - Typed text is **keyword-matched** to the Q&A bank; best match answers.
   - No match → friendly **fallback** message + suggestion chips.
4. Special path — picking *"Gợi ý combo sản phẩm Hella phù hợp với tôi"* (`flow: "combo"`)
   launches a **3-step wizard** inside the chat, then outputs a personalized combo of Hella
   products with 3 buy-link icons (Website / Shopee / TikTok Shop).

### Decisions locked in
- The existing **`FloatingContact` widget is removed** (frees the bottom-right corner).
- Chat = floating bottom-right panel (not inline, not modal).
- Section placement = **after `VendorCarousel`, before `InstagramCarousel`**.
- Typed input = live filter + keyword match + fallback.
- Buy links: Website uses real hellabeauty.vn URLs where known; Shopee/TikTok = placeholder `#`.

---

## 2. Architecture

One client component owns all state and renders both the inline bar and the floating panel
(they must share state, so they are colocated — no context provider needed).

```
HellaSis.tsx                (client, "use client")  ← state owner, placed in page.tsx
├─ HellaSisBar              inline section: title + search input + suggestion dropdown
├─ HellaSisChat             fixed bottom-right panel: messages, chips, product cards, input
│  └─ HellaSisComboWizard   3-step combo flow rendered inside the chat message stream
└─ hellaSis.ts              all data + matching/combo logic (the extensible file)
```

Supporting:
- `shared/icons.tsx` — add `SparkleIcon`, `GlobeIcon`, `SendIcon`, `ChatCloseIcon` as needed.
- Reuse shadcn `input`, `card`; `cn()` for styling. Buy-link images reuse
  `market_shopee.png`, `social_tiktok.png` (already downloaded); Website uses `GlobeIcon`.

### State (inside HellaSis)
```ts
chatOpen: boolean
messages: Msg[]                 // { role: "sis" | "user"; ... }
mode: "idle" | "answering" | "combo"
comboStep: number               // 0..2 while mode === "combo"
comboAnswers: { vibe?: string; skin?: string; goals: string[] }
inputValue: string
suggestionsOpen: boolean
```

Message shape (discriminated so the panel can render text, chips, product cards, links):
```ts
type Msg =
  | { role: "user"; text: string }
  | { role: "sis"; answer: SisAnswer }          // text + optional products + links
  | { role: "sis"; combo: ComboStep }           // renders a wizard step with chips
  | { role: "sis"; comboResult: ComboResult };  // final combo cards + buy links
```

### Event handlers
- `submitQuery(text)` — push user msg, open chat; find QA by keyword match; if `flow==="combo"`
  start wizard, else push `answer` (or `sisFallback`).
- `pickSuggestion(qa)` — same as submit but exact QA is known.
- `pickComboOption(step, optionId)` — record answer; advance step; on last step compute + push
  `comboResult`.
- `resetChat()` / `closeChat()`.

---

## 3. Data model (`hellaSis.ts`) — extensibility contract

```ts
export type SisLinkIcon = "web" | "shopee" | "tiktok";
export type SisLink = { label: string; url: string; icon: SisLinkIcon };
export type SisProductRef = { title: string; image: string; href: string };

export type SisAnswer = {
  text: string[];                 // reply paragraphs
  products?: SisProductRef[];     // optional product cards
  links?: SisLink[];              // optional buy links
};

export type SisQA = {
  id: string;
  question: string;               // label in dropdown / echoed as user msg
  keywords: string[];             // lowercased, accent-insensitive match tokens
  suggested?: boolean;            // appears in the default suggestion list
  answer?: SisAnswer;             // static reply
  flow?: "combo";                 // OR launches the combo wizard (mutually exclusive with answer)
};

export const sisQuestions: SisQA[];   // the 5 seed questions
export const sisFallback: SisAnswer;  // "Hella Sis chưa có câu trả lời này…"

// Matching: normalize (lowercase + strip Vietnamese diacritics), then score by keyword hits.
export function matchQuestion(input: string): SisQA | null;
export function filterSuggestions(input: string): SisQA[];
```

**Seed questions** (all `suggested: true`):
1. `combo` — "Gợi ý combo sản phẩm Hella phù hợp với tôi" → `flow: "combo"`
2. "Tips dùng tẩy tế bào chết" → static answer
3. "Mùi hương bodymist nào hợp vibe tôi?" → static answer
4. "Công dụng của việc xài body lotion" → static answer
5. "Hella Beauty có dầu gội đầu không?" → static answer

**To add a Q&A later:** append one `SisQA` with `question`, `keywords`, and an `answer`
(`text` + optional `products`/`links`). No component changes required.

---

## 4. Combo wizard (Solution 1.1)

```ts
export type ComboOption = { id: string; label: string };
export type ComboStep = {
  id: "vibe" | "skin" | "goals";
  question: string;
  multi?: boolean;                // goals only
  maxSelect?: number;             // goals = 3
  options: ComboOption[];
};
export const comboSteps: ComboStep[];   // exactly the 3 questions below
```

- **Step 1 — Vibe (single):** Thanh Lịch · Ngọt Ngào Nữ Tính · Cá Tính · Thanh Mát Trong Trẻo · Sang trọng quý phái
- **Step 2 — Da body (single):** Da khô · Da dầu · Da bình thường · Da hỗn hợp
- **Step 3 — Mong muốn (multi, max 3):** Làm trắng da body · Làm mềm mịn da body · Lưu hương lâu và thơm hằng ngày · Làm sạch da body · Chăm sóc tóc · Làm sạch da mặt · Dưỡng trắng mờ thâm da mặt · Khác

### Combo result logic (hardcoded, deterministic)
```ts
export type ComboProduct = SisProductRef & { category: string };
export const comboCatalog: ComboProduct[];              // ~10-14 hardcoded products w/ categories
const goalToCategories: Record<string /*goalId*/, string[]>;  // goal → product categories
const vibeToScent: Record<string /*vibeId*/, string>;   // vibe → bodymist product id (scent)

export function buildCombo(a: {vibe; skin; goals}): ComboResult;
export type ComboResult = {
  intro: string;                  // e.g. "Combo dành riêng cho bạn — vibe {vibe}, da {skin}:"
  products: SisProductRef[];      // deduped union across selected goals + scent pick
  links: SisLink[];               // 3 buy links (web/shopee/tiktok)
};
```
- Products = dedup union of `goalToCategories[goal]` → catalog items, plus the `vibeToScent`
  bodymist. Lotion selection may vary by skin type (nice-to-have; default one lotion is fine).
- Worked example from the brief: goals *Làm sạch da mặt + Làm sạch da body* → tẩy tế bào chết
  body, sữa tắm, body lotion, bodymist, mặt nạ nghệ dưỡng trắng.

**To change combos later:** edit `comboCatalog` + `goalToCategories` (+ `vibeToScent`).

---

## 5. Styling (Hella tokens)

- Section title: `font-heading text-hella-green`; sub-line body sans. Bar container centered,
  `max-w-[1400px]`, generous vertical padding like other sections.
- Search bar: **pill** (`rounded-full`), 1px border, ✦ icon left, subtle shadow; green focus ring.
- Suggestion dropdown: white card, hairline border, each row = magnifier/✦ icon + text,
  hover row tint `bg-hella-cream`, text → green.
- Chat panel: fixed bottom-right, ~360×520px (mobile: near-full-width bottom sheet). Green
  header bar with "Hella Sis" + close. Square corners (small radius ok). Sis bubbles cream/white,
  user bubbles green. Chips = pill buttons, green outline → green fill when selected.
- Product cards in chat: small image on `#f3efe8`, title, buy-link icon row.
- Respect mobile-first; panel becomes a bottom sheet under `sm`.

---

## 6. Testing & done

- `npm run check` (lint + typecheck + build) passes.
- Manual/interaction QA via screenshot once the Chrome tool reconnects: bar filter, suggestion
  pick, static answer, fallback on nonsense input, full combo wizard → result with links.
- No new runtime deps (uses existing shadcn + React state).

## 7. Out of scope / notes
- No real AI, persistence, or network calls. Conversation resets on reload.
- Shopee/TikTok URLs are placeholders until real ones are provided.
- Accessibility beyond basic labels/focus is out of scope for the prototype.
