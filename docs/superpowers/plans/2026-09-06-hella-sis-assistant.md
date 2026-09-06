# Hella Sis Beauty Assistant Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an interactive "Hella Sis" beauty-assistant (search bar → suggestions → floating chat panel → 3-step combo wizard) to the Hella Beauty homepage clone, fully hardcoded and easy to extend.

**Architecture:** One client component (`HellaSis`) owns all conversation state and renders both an inline search-bar section and a fixed bottom-right chat panel. All content and matching/combo logic live in two data/logic modules (`hellaSisData.ts` content, `hellaSis.ts` logic+types) so new Q&A is added by editing data only. Pure logic is TDD'd with vitest; presentational components are verified via typecheck + build + screenshot.

**Tech Stack:** Next.js 16 (App Router, React 19, TS strict), Tailwind v4, shadcn/ui (`input`, `card`), vitest (new dev dep, logic tests only).

**Spec:** `docs/superpowers/specs/2026-09-06-hella-sis-assistant-design.md`

## Global Constraints

- **Prototype only** — no backend/DB/AI. All data hardcoded; state via React `useState`. (CLAUDE.md)
- **Colors:** brand green `#698269` (`text-hella-green` / `--color-hella-green`) is the ONLY accent; cream `#f6f1e7`; card placeholder `#f3efe8`; black text; white bg. No new hues.
- **Fonts:** headings/nav/titles use `font-heading` (BeautiqueDisplay); body uses default sans (Helvetica Neue).
- **Shape:** mostly square, no rounded corners on cards/panels; pills/badges/search-bar may be round (`rounded-full`).
- **Component location:** all new components under `src/components/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/`; shared icons in `.../shared/icons.tsx`.
- **TS strict, no `any`. Named exports, PascalCase components. Tailwind classes, no inline styles.**
- **Done gate:** `npm run check` (lint + typecheck + build) passes, plus `npm run test` for logic.

---

## File Structure

- Create `.../root-8a5edab2/hellaSis.ts` — types + pure logic (`normalize`, `matchQuestion`, `filterSuggestions`, `buildCombo`). Re-exports data.
- Create `.../root-8a5edab2/hellaSisData.ts` — all content: `sisQuestions`, `sisFallback`, `comboSteps`, `comboCatalog`, `goalToCategories`, `vibeToScent`. **This is the file to edit to add Q&A.**
- Create `.../root-8a5edab2/hellaSis.test.ts` — vitest unit tests for the logic.
- Create `.../root-8a5edab2/HellaSisBar.tsx` — inline section: title + pill search input + suggestion dropdown (presentational, props-driven).
- Create `.../root-8a5edab2/HellaSisComboWizard.tsx` — renders one combo step's chips (presentational).
- Create `.../root-8a5edab2/HellaSisChat.tsx` — fixed bottom-right panel: messages, product cards, buy links, composer (text input OR chips).
- Create `.../root-8a5edab2/HellaSis.tsx` — client state owner; composes Bar + Chat.
- Modify `.../shared/icons.tsx` — add `SparkleIcon`, `GlobeIcon`, `SendIcon`, `ChatCloseIcon`.
- Modify `src/app/page.tsx` — remove `FloatingContact`; add `HellaSis` after `VendorCarousel`.
- Delete `.../root-8a5edab2/FloatingContact.tsx`.
- Modify `src/app/globals.css` — add `hella-slide-up` keyframe/util for panel + dropdown.
- Modify `package.json` — add vitest dev dep + `test` script. Create `vitest.config.ts`.

---

## Task 1: Logic engine — types, data, matching (TDD)

**Files:**
- Modify: `package.json` (add vitest + `test` script)
- Create: `vitest.config.ts`
- Create: `src/components/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/hellaSisData.ts`
- Create: `src/components/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/hellaSis.ts`
- Test: `src/components/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/hellaSis.test.ts`

**Interfaces:**
- Produces (types): `SisLinkIcon`, `SisLink`, `SisProductRef`, `SisAnswer`, `SisQA`, `ComboOption`, `ComboStep`, `ComboProduct`, `ComboAnswers`, `SisMessage`.
- Produces (data): `sisQuestions: SisQA[]`, `sisFallback: SisAnswer`, `comboSteps: ComboStep[]`, `comboCatalog: ComboProduct[]`, `goalToCategories: Record<string,string[]>`, `vibeToScent: Record<string,string>`.
- Produces (fns): `normalize(s: string): string`, `matchQuestion(input: string): SisQA | null`, `filterSuggestions(input: string): SisQA[]`, `buildCombo(answers: ComboAnswers): SisAnswer`.

- [ ] **Step 1: Install vitest + add test script**

Run:
```bash
npm install -D vitest@^2
```
Then edit `package.json` scripts, adding after the `"check"` line:
```json
    "test": "vitest run"
```

- [ ] **Step 2: Create `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
```

- [ ] **Step 3: Create `hellaSisData.ts` (content)**

```ts
import { IMG } from "./data";
import type { SisAnswer, SisQA, ComboStep, ComboProduct } from "./hellaSis";

// ── Static Q&A bank (edit here to add more questions) ──────────────
export const sisQuestions: SisQA[] = [
  {
    id: "combo",
    question: "Gợi ý combo sản phẩm Hella phù hợp với tôi",
    keywords: ["combo", "goi y combo", "phu hop", "ca nhan hoa", "suggestion"],
    suggested: true,
    flow: "combo",
  },
  {
    id: "tips-tay-te-bao",
    question: "Tips dùng tẩy tế bào chết",
    keywords: ["tay te bao chet", "tay te bao", "scrub", "tips"],
    suggested: true,
    answer: {
      text: [
        "Bạn chỉ nên tẩy tế bào chết body 2–3 lần/tuần thôi nhé, lạm dụng dễ làm da khô.",
        "Massage nhẹ nhàng theo vòng tròn trên da còn ẩm, tập trung vùng khuỷu tay, đầu gối và gót chân.",
        "Sau khi tẩy, khoá ẩm ngay bằng body lotion để da mềm mượt và sáng đều hơn.",
      ],
      products: [
        {
          title: "Tẩy Tế Bào Chết Body cà phê Hella Beauty 500g",
          image: `${IMG}/collection_list_6b_1.png`,
          href: "/products/tay-te-bao-chet-body-ca-phe-hella-beauty-500g",
        },
      ],
      links: [
        { label: "Website", url: "/products/tay-te-bao-chet-body-ca-phe-hella-beauty-500g", icon: "web" },
        { label: "Shopee", url: "#", icon: "shopee" },
        { label: "TikTok Shop", url: "#", icon: "tiktok" },
      ],
    },
  },
  {
    id: "bodymist-vibe",
    question: "Mùi hương bodymist nào hợp vibe tôi?",
    keywords: ["bodymist", "body mist", "mui huong", "huong", "vibe", "scent"],
    suggested: true,
    answer: {
      text: [
        "Mỗi vibe của bạn sẽ hợp một tầng hương riêng đó!",
        "Thanh lịch & trong trẻo → hương hoa cỏ nhẹ nhàng. Ngọt ngào nữ tính → hương trái cây hoa ngọt. Cá tính → hương gỗ/musk. Sang trọng → hương phương Đông ấm áp.",
        "Bạn thử chọn “Gợi ý combo…” để Hella Sis pick chuẩn mùi theo vibe của bạn nha! ✦",
      ],
    },
  },
  {
    id: "body-lotion",
    question: "Công dụng của việc xài body lotion",
    keywords: ["body lotion", "lotion", "duong am", "duong the", "cong dung"],
    suggested: true,
    answer: {
      text: [
        "Body lotion giúp cấp ẩm, làm mềm mịn và phục hồi hàng rào bảo vệ da.",
        "Thoa ngay sau khi tắm lúc da còn hơi ẩm để khoá ẩm tốt nhất.",
        "Dùng đều mỗi ngày, da body sẽ mịn màng và sáng khoẻ hơn hẳn.",
      ],
    },
  },
  {
    id: "dau-goi",
    question: "Hella Beauty có dầu gội đầu không?",
    keywords: ["dau goi", "goi dau", "cham soc toc", "toc", "shampoo"],
    suggested: true,
    answer: {
      text: [
        "Có nha! Hella Beauty có bộ chăm sóc tóc không chứa Sulfate, Silicone & PEG.",
        "Phù hợp cho mái tóc cần nhẹ dịu, sạch sâu mà vẫn mềm mượt óng ả.",
      ],
      links: [
        { label: "Website", url: "/collections/cham-soc-toc", icon: "web" },
        { label: "Shopee", url: "#", icon: "shopee" },
        { label: "TikTok Shop", url: "#", icon: "tiktok" },
      ],
    },
  },
];

export const sisFallback: SisAnswer = {
  text: [
    "Hella Sis chưa có câu trả lời cho câu này, bạn thử một trong các gợi ý bên dưới nhé! ✦",
  ],
};

// ── Combo wizard steps (Solution 1.1) ─────────────────────────────
export const comboSteps: ComboStep[] = [
  {
    id: "vibe",
    question: "Hiện tại bạn đang theo đuổi Vibe như thế nào?",
    options: [
      { id: "thanh-lich", label: "Thanh Lịch" },
      { id: "ngot-ngao", label: "Ngọt Ngào Nữ Tính" },
      { id: "ca-tinh", label: "Cá Tính" },
      { id: "thanh-mat", label: "Thanh Mát Trong Trẻo" },
      { id: "sang-trong", label: "Sang trọng quý phái" },
    ],
  },
  {
    id: "skin",
    question: "Loại da body của bạn là gì?",
    options: [
      { id: "da-kho", label: "Da khô" },
      { id: "da-dau", label: "Da dầu" },
      { id: "da-thuong", label: "Da bình thường" },
      { id: "da-hon-hop", label: "Da hỗn hợp" },
    ],
  },
  {
    id: "goals",
    question: "Bạn mong muốn combo này hỗ trợ bạn điều gì?",
    multi: true,
    maxSelect: 3,
    options: [
      { id: "trang-body", label: "Làm trắng da body" },
      { id: "mem-body", label: "Làm mềm mịn da body" },
      { id: "luu-huong", label: "Lưu hương lâu và thơm hằng ngày" },
      { id: "sach-body", label: "Làm sạch da body" },
      { id: "cham-soc-toc", label: "Chăm sóc tóc" },
      { id: "sach-da-mat", label: "Làm sạch da mặt" },
      { id: "trang-da-mat", label: "Dưỡng trắng mờ thâm da mặt" },
      { id: "khac", label: "Khác" },
    ],
  },
];

// ── Combo catalog + mappings (edit here to change combos) ─────────
export const comboCatalog: ComboProduct[] = [
  { id: "ttbc-body", title: "Tẩy Tế Bào Chết Body cà phê Hella Beauty 500g", category: "tay-te-bao-body", image: `${IMG}/collection_list_6b_1.png`, href: "/products/tay-te-bao-chet-body-ca-phe-hella-beauty-500g" },
  { id: "sua-tam", title: "Sữa tắm dưỡng ẩm Hella Beauty", category: "sua-tam", image: `${IMG}/collection_list_6b_2.png`, href: "#" },
  { id: "body-lotion", title: "Body Lotion dưỡng ẩm mềm mịn Hella Beauty", category: "body-lotion", image: `${IMG}/collection_list_2.png`, href: "#" },
  { id: "kem-body-trang", title: "Kem Body trắng da nâng tone Hella Beauty 200g", category: "duong-trang-body", image: `${IMG}/collection_list_1.png`, href: "/products/kem-body-trang-da-nang-tone-tuc-thi-hella-beauty-200g" },
  { id: "mat-na-nghe", title: "Mặt nạ nghệ dưỡng trắng Hella Beauty", category: "mat-na", image: `${IMG}/collection_list_4.png`, href: "#" },
  { id: "sua-rua-mat", title: "Sữa rửa mặt dịu nhẹ Hella Beauty", category: "sua-rua-mat", image: `${IMG}/collection_list_3.png`, href: "#" },
  { id: "dau-goi", title: "Dầu gội chăm sóc tóc Hella Beauty", category: "cham-soc-toc", image: `${IMG}/shop_the_look_1.png`, href: "/collections/cham-soc-toc" },
  { id: "bm-hoaco", title: "Bodymist Hương Hoa Cỏ Hella Beauty", category: "bodymist", image: `${IMG}/collection_list_6b_3.png`, href: "#" },
  { id: "bm-ngot", title: "Bodymist Hương Trái Cây Ngọt Hella Beauty", category: "bodymist", image: `${IMG}/collection_list_6b_4.png`, href: "#" },
  { id: "bm-musk", title: "Bodymist Hương Gỗ Musk Hella Beauty", category: "bodymist", image: `${IMG}/collection_list_6b_1.png`, href: "#" },
  { id: "bm-phuongdong", title: "Bodymist Hương Phương Đông Hella Beauty", category: "bodymist", image: `${IMG}/collection_list_6b_2.png`, href: "#" },
];

export const goalToCategories: Record<string, string[]> = {
  "trang-body": ["duong-trang-body", "body-lotion"],
  "mem-body": ["body-lotion", "tay-te-bao-body"],
  "luu-huong": ["bodymist"],
  "sach-body": ["tay-te-bao-body", "sua-tam"],
  "cham-soc-toc": ["cham-soc-toc"],
  "sach-da-mat": ["sua-rua-mat", "mat-na"],
  "trang-da-mat": ["mat-na"],
  "khac": ["body-lotion"],
};

// vibe → signature bodymist product id (every combo gets a scent by vibe)
export const vibeToScent: Record<string, string> = {
  "thanh-lich": "bm-hoaco",
  "ngot-ngao": "bm-ngot",
  "ca-tinh": "bm-musk",
  "thanh-mat": "bm-hoaco",
  "sang-trong": "bm-phuongdong",
};
```

- [ ] **Step 4: Create `hellaSis.ts` (types + logic) — write BEFORE running tests**

```ts
import {
  sisQuestions,
  sisFallback,
  comboSteps,
  comboCatalog,
  goalToCategories,
  vibeToScent,
} from "./hellaSisData";

// ── Types ─────────────────────────────────────────────────────────
export type SisLinkIcon = "web" | "shopee" | "tiktok";
export interface SisLink { label: string; url: string; icon: SisLinkIcon; }
export interface SisProductRef { title: string; image: string; href: string; }
export interface SisAnswer {
  text: string[];
  products?: SisProductRef[];
  links?: SisLink[];
}
export interface SisQA {
  id: string;
  question: string;
  keywords: string[];
  suggested?: boolean;
  answer?: SisAnswer;
  flow?: "combo";
}
export interface ComboOption { id: string; label: string; }
export interface ComboStep {
  id: "vibe" | "skin" | "goals";
  question: string;
  multi?: boolean;
  maxSelect?: number;
  options: ComboOption[];
}
export interface ComboProduct extends SisProductRef { id: string; category: string; }
export interface ComboAnswers { vibe?: string; skin?: string; goals: string[]; }

export type SisMessage =
  | { id: string; role: "user"; text: string }
  | { id: string; role: "sis"; answer: SisAnswer };

// re-export data for convenience
export { sisQuestions, sisFallback, comboSteps } from "./hellaSisData";

// ── Logic ─────────────────────────────────────────────────────────
export function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/\s+/g, " ")
    .trim();
}

export function matchQuestion(input: string): SisQA | null {
  const n = normalize(input);
  if (!n) return null;
  let best: SisQA | null = null;
  let bestScore = 0;
  for (const qa of sisQuestions) {
    let score = 0;
    for (const kw of qa.keywords) {
      if (n.includes(normalize(kw))) score += 1;
    }
    const qn = normalize(qa.question);
    if (qn.includes(n) || n.includes(qn)) score += 2;
    if (score > bestScore) {
      bestScore = score;
      best = qa;
    }
  }
  return bestScore > 0 ? best : null;
}

export function filterSuggestions(input: string): SisQA[] {
  const suggested = sisQuestions.filter((q) => q.suggested);
  const n = normalize(input);
  if (!n) return suggested;
  return suggested.filter(
    (q) =>
      normalize(q.question).includes(n) ||
      q.keywords.some((kw) => normalize(kw).includes(n) || n.includes(normalize(kw))),
  );
}

export function buildCombo(answers: ComboAnswers): SisAnswer {
  const byId = new Map(comboCatalog.map((p) => [p.id, p]));
  const vibeLabel =
    comboSteps[0].options.find((o) => o.id === answers.vibe)?.label ?? "của bạn";
  const skinLabel =
    comboSteps[1].options.find((o) => o.id === answers.skin)?.label ?? "";

  // Categories from selected goals
  const categories = new Set<string>();
  for (const g of answers.goals) {
    for (const c of goalToCategories[g] ?? []) categories.add(c);
  }

  const chosen: SisProductRef[] = [];
  const seen = new Set<string>();
  const push = (p?: ComboProduct) => {
    if (p && !seen.has(p.id)) {
      seen.add(p.id);
      chosen.push({ title: p.title, image: p.image, href: p.href });
    }
  };

  // Always include the vibe's signature bodymist scent
  push(byId.get(vibeToScent[answers.vibe ?? ""] ?? ""));

  // One representative product per selected category (skip bodymist: handled above)
  for (const cat of categories) {
    if (cat === "bodymist") continue;
    push(comboCatalog.find((p) => p.category === cat));
  }

  // Fallback so a combo is never empty
  if (chosen.length === 0) push(byId.get("body-lotion"));

  const intro = skinLabel
    ? `Combo dành riêng cho bạn — vibe “${vibeLabel}”, da “${skinLabel}”:`
    : `Combo dành riêng cho bạn — vibe “${vibeLabel}”:`;

  return {
    text: [intro],
    products: chosen.slice(0, 6),
    links: [
      { label: "Website", url: "/", icon: "web" },
      { label: "Shopee", url: "#", icon: "shopee" },
      { label: "TikTok Shop", url: "#", icon: "tiktok" },
    ],
  };
}
```

- [ ] **Step 5: Write the failing tests**

Create `hellaSis.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import {
  normalize,
  matchQuestion,
  filterSuggestions,
  buildCombo,
} from "./hellaSis";

describe("normalize", () => {
  it("lowercases and strips Vietnamese diacritics", () => {
    expect(normalize("Tẩy Tế Bào Chết")).toBe("tay te bao chet");
    expect(normalize("Dầu gội đầu")).toBe("dau goi dau");
  });
});

describe("matchQuestion", () => {
  it("matches accent-free typed text to a question", () => {
    expect(matchQuestion("tay te bao")?.id).toBe("tips-tay-te-bao");
    expect(matchQuestion("bodymist")?.id).toBe("bodymist-vibe");
    expect(matchQuestion("combo")?.id).toBe("combo");
  });
  it("returns null when nothing matches", () => {
    expect(matchQuestion("xyzzy nonsense")).toBeNull();
    expect(matchQuestion("")).toBeNull();
  });
});

describe("filterSuggestions", () => {
  it("returns all suggested questions for empty input", () => {
    expect(filterSuggestions("").length).toBe(5);
  });
  it("filters by typed text", () => {
    const r = filterSuggestions("lotion");
    expect(r.length).toBe(1);
    expect(r[0].id).toBe("body-lotion");
  });
});

describe("buildCombo", () => {
  it("returns a non-empty combo with a scent, products, and 3 buy links", () => {
    const a = { vibe: "thanh-lich", skin: "da-kho", goals: ["sach-da-mat", "sach-body"] };
    const res = buildCombo(a);
    expect(res.products && res.products.length).toBeGreaterThan(0);
    expect(res.links?.length).toBe(3);
    // vibe scent (hoa cỏ) is always included
    expect(res.products?.some((p) => p.title.includes("Hoa Cỏ"))).toBe(true);
    // "làm sạch da mặt" pulls in sữa rửa mặt
    expect(res.products?.some((p) => p.title.includes("rửa mặt"))).toBe(true);
    expect(res.text[0]).toContain("Thanh Lịch");
  });
});
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `npm run test`
Expected: all tests PASS (logic written in Step 4). If any fail, fix the logic/data, not the test.

- [ ] **Step 7: Typecheck + commit**

Run: `npx tsc --noEmit` (expect no errors)
```bash
git add package.json package-lock.json vitest.config.ts src/components/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/hellaSis.ts src/components/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/hellaSisData.ts src/components/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/hellaSis.test.ts
git commit -m "feat(hella-sis): add hardcoded Q&A + combo logic engine with tests"
```

---

## Task 2: Icons

**Files:**
- Modify: `src/components/sites/hellabeauty-vn-ba054dbc/shared/icons.tsx` (append new icons)

**Interfaces:**
- Produces: `SparkleIcon`, `GlobeIcon`, `SendIcon`, `ChatCloseIcon` — each `(props: SVGProps<SVGSVGElement>) => JSX.Element`, consumed by Tasks 3–5.

- [ ] **Step 1: Append the four icons to `icons.tsx`**

Add at the end of the file (the file already imports `SVGProps` and exports icons like `SearchIcon`):
```tsx
export function SparkleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2c.4 3.7 2.3 5.6 6 6-3.7.4-5.6 2.3-6 6-.4-3.7-2.3-5.6-6-6 3.7-.4 5.6-2.3 6-6Z" />
      <path d="M19 13c.2 1.7 1.1 2.6 3 3-1.9.4-2.8 1.3-3 3-.2-1.7-1.1-2.6-3-3 1.9-.4 2.8-1.3 3-3Z" />
    </svg>
  );
}

export function GlobeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx={12} cy={12} r={9} />
      <path d="M3 12h18M12 3c2.5 2.5 3.8 5.6 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.6-3.8-9S9.5 5.5 12 3Z" />
    </svg>
  );
}

export function SendIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 2 11 13" />
      <path d="M22 2 15 22l-4-9-9-4 20-7Z" />
    </svg>
  );
}

export function ChatCloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
```

- [ ] **Step 2: Typecheck + commit**

Run: `npx tsc --noEmit` (expect no errors)
```bash
git add src/components/sites/hellabeauty-vn-ba054dbc/shared/icons.tsx
git commit -m "feat(hella-sis): add sparkle, globe, send, chat-close icons"
```

---

## Task 3: HellaSisBar (inline section + suggestion dropdown)

**Files:**
- Create: `src/components/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/HellaSisBar.tsx`

**Interfaces:**
- Consumes: `SisQA` (Task 1), `SparkleIcon`, `SearchIcon` (Tasks 1/2).
- Produces: `HellaSisBar` with props:
  ```ts
  interface HellaSisBarProps {
    value: string;
    onChange: (v: string) => void;
    onSubmit: (text: string) => void;   // Enter or search click
    open: boolean;                        // dropdown open
    onOpenChange: (open: boolean) => void;
    suggestions: SisQA[];                 // already filtered by parent
    onPick: (qa: SisQA) => void;
  }
  ```

- [ ] **Step 1: Create `HellaSisBar.tsx`**

```tsx
"use client";

import { SisQA } from "./hellaSis";
import {
  SearchIcon,
  SparkleIcon,
} from "@/components/sites/hellabeauty-vn-ba054dbc/shared/icons";

interface HellaSisBarProps {
  value: string;
  onChange: (v: string) => void;
  onSubmit: (text: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  suggestions: SisQA[];
  onPick: (qa: SisQA) => void;
}

export function HellaSisBar({
  value,
  onChange,
  onSubmit,
  open,
  onOpenChange,
  suggestions,
  onPick,
}: HellaSisBarProps) {
  return (
    <section className="mx-auto max-w-[760px] px-5 py-16 text-center lg:py-20">
      <p className="font-heading text-sm italic text-black/70 sm:text-base">
        Hella Sis - Trợ lý làm đẹp dành riêng cho bạn
      </p>
      <h2 className="font-heading text-hella-green mt-2 text-3xl leading-tight sm:text-4xl">
        Skincare that feels like you.
      </h2>

      <div className="relative mt-8">
        <div className="flex items-center gap-3 rounded-full border border-black/15 bg-white px-5 py-3.5 shadow-sm transition focus-within:border-hella-green">
          <SparkleIcon className="h-5 w-5 shrink-0 text-hella-green" />
          <input
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              onOpenChange(true);
            }}
            onFocus={() => onOpenChange(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && value.trim()) onSubmit(value.trim());
            }}
            placeholder="Ask Hella Sis anything about your body care routine…"
            aria-label="Ask Hella Sis"
            className="w-full bg-transparent text-left text-sm text-black outline-none placeholder:text-black/40 sm:text-base"
          />
          <button
            aria-label="Gửi"
            onClick={() => value.trim() && onSubmit(value.trim())}
            className="shrink-0 text-black/60 transition hover:text-hella-green"
          >
            <SearchIcon className="h-5 w-5" />
          </button>
        </div>

        {open && suggestions.length > 0 && (
          <ul className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-black/10 bg-white py-2 text-left shadow-lg">
            {suggestions.map((qa) => (
              <li key={qa.id}>
                <button
                  onClick={() => onPick(qa)}
                  className="flex w-full items-center gap-3 px-5 py-2.5 text-sm text-black/80 transition hover:bg-hella-cream hover:text-hella-green"
                >
                  {qa.flow === "combo" ? (
                    <SparkleIcon className="h-4 w-4 shrink-0 text-hella-green" />
                  ) : (
                    <SearchIcon className="h-4 w-4 shrink-0 text-black/40" />
                  )}
                  {qa.question}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
```
> Note: `bg-hella-cream` maps to `--color-hella-cream`. If the utility isn't recognized by Tailwind v4's token scan, use `bg-[#f6f1e7]` instead.

- [ ] **Step 2: Typecheck + commit**

Run: `npx tsc --noEmit` (expect no errors)
```bash
git add src/components/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/HellaSisBar.tsx
git commit -m "feat(hella-sis): add search bar section with suggestion dropdown"
```

---

## Task 4: HellaSisChat + HellaSisComboWizard (floating panel)

**Files:**
- Create: `src/components/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/HellaSisComboWizard.tsx`
- Create: `src/components/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/HellaSisChat.tsx`
- Modify: `src/app/globals.css` (slide-up animation)

**Interfaces:**
- Consumes: `SisMessage`, `SisLink`, `ComboStep` (Task 1); icons (Task 2); `next/image`, `next/link`.
- Produces:
  ```ts
  // HellaSisComboWizard
  interface HellaSisComboWizardProps {
    step: ComboStep;
    selected: string[];
    onSelect: (optionId: string) => void;  // single-select advances; multi toggles
    onNext: () => void;                     // multi-select confirm button
  }
  // HellaSisChat
  interface HellaSisChatProps {
    open: boolean;
    messages: SisMessage[];
    mode: "chat" | "combo";
    currentStep: ComboStep | null;
    comboSelected: string[];
    onComboSelect: (optionId: string) => void;
    onComboNext: () => void;
    composerValue: string;
    onComposerChange: (v: string) => void;
    onComposerSubmit: (text: string) => void;
    onClose: () => void;
  }
  ```

- [ ] **Step 1: Add slide-up animation to `globals.css`**

Append near the other Hella helpers (after `.hella-dot`):
```css
@keyframes hella-slide-up {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
.hella-slide-up {
  animation: hella-slide-up 0.25s ease-out;
}
```

- [ ] **Step 2: Create `HellaSisComboWizard.tsx`**

```tsx
"use client";

import { ComboStep } from "./hellaSis";
import { cn } from "@/lib/utils";

interface HellaSisComboWizardProps {
  step: ComboStep;
  selected: string[];
  onSelect: (optionId: string) => void;
  onNext: () => void;
}

export function HellaSisComboWizard({
  step,
  selected,
  onSelect,
  onNext,
}: HellaSisComboWizardProps) {
  const atMax = step.maxSelect ? selected.length >= step.maxSelect : false;
  return (
    <div className="hella-slide-up">
      <p className="text-sm font-medium text-black">{step.question}</p>
      {step.multi && step.maxSelect && (
        <p className="mt-1 text-xs text-black/50">
          Chọn tối đa {step.maxSelect} ({selected.length}/{step.maxSelect})
        </p>
      )}
      <div className="mt-3 flex flex-wrap gap-2">
        {step.options.map((opt) => {
          const active = selected.includes(opt.id);
          const disabled = step.multi && !active && atMax;
          return (
            <button
              key={opt.id}
              disabled={disabled}
              onClick={() => onSelect(opt.id)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs transition",
                active
                  ? "border-hella-green bg-hella-green text-white"
                  : "border-black/20 text-black/80 hover:border-hella-green hover:text-hella-green",
                disabled && "cursor-not-allowed opacity-40 hover:border-black/20 hover:text-black/80",
              )}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
      {step.multi && (
        <button
          disabled={selected.length === 0}
          onClick={onNext}
          className="mt-4 w-full rounded-full bg-hella-green py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Xem combo của tôi ✦
        </button>
      )}
    </div>
  );
}
```
> `bg-hella-green` / `border-hella-green` rely on the `--color-hella-green` token. If Tailwind doesn't pick them up, use `bg-[#698269]` / `border-[#698269]`.

- [ ] **Step 3: Create `HellaSisChat.tsx`**

```tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { ComboStep, SisLink, SisMessage } from "./hellaSis";
import { HellaSisComboWizard } from "./HellaSisComboWizard";
import {
  ChatCloseIcon,
  GlobeIcon,
  SendIcon,
  SparkleIcon,
} from "@/components/sites/hellabeauty-vn-ba054dbc/shared/icons";
import { IMG } from "./data";

interface HellaSisChatProps {
  open: boolean;
  messages: SisMessage[];
  mode: "chat" | "combo";
  currentStep: ComboStep | null;
  comboSelected: string[];
  onComboSelect: (optionId: string) => void;
  onComboNext: () => void;
  composerValue: string;
  onComposerChange: (v: string) => void;
  onComposerSubmit: (text: string) => void;
  onClose: () => void;
}

function LinkIcon({ icon }: { icon: SisLink["icon"] }) {
  if (icon === "web") return <GlobeIcon className="h-4 w-4" />;
  const src = icon === "shopee" ? `${IMG}/market_shopee.png` : `${IMG}/social_tiktok.png`;
  return <Image src={src} alt="" width={16} height={16} className="h-4 w-4 object-contain" />;
}

export function HellaSisChat({
  open,
  messages,
  mode,
  currentStep,
  comboSelected,
  onComboSelect,
  onComboNext,
  composerValue,
  onComposerChange,
  onComposerSubmit,
  onClose,
}: HellaSisChatProps) {
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, mode, currentStep]);

  if (!open) return null;

  return (
    <aside className="hella-slide-up fixed bottom-4 right-4 z-50 flex h-[70vh] max-h-[560px] w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between bg-hella-green px-4 py-3 text-white">
        <div className="flex items-center gap-2">
          <SparkleIcon className="h-5 w-5" />
          <span className="font-heading text-base">Hella Sis</span>
        </div>
        <button aria-label="Đóng" onClick={onClose} className="opacity-90 transition hover:opacity-100">
          <ChatCloseIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.map((m) =>
          m.role === "user" ? (
            <div key={m.id} className="flex justify-end">
              <div className="max-w-[80%] rounded-2xl bg-hella-green px-3.5 py-2 text-sm text-white">
                {m.text}
              </div>
            </div>
          ) : (
            <div key={m.id} className="flex justify-start">
              <div className="max-w-[85%] rounded-2xl bg-hella-cream px-3.5 py-2.5 text-sm text-black">
                {m.answer.text.map((t, i) => (
                  <p key={i} className={cn(i > 0 && "mt-2")}>
                    {t}
                  </p>
                ))}
                {m.answer.products && m.answer.products.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {m.answer.products.map((p) => (
                      <Link
                        key={p.title}
                        href={p.href}
                        className="flex items-center gap-3 rounded-lg bg-white p-2 transition hover:ring-1 hover:ring-hella-green"
                      >
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden bg-[#f3efe8]">
                          <Image src={p.image} alt={p.title} fill className="object-cover" sizes="48px" />
                        </div>
                        <span className="text-xs leading-snug text-black">{p.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
                {m.answer.links && m.answer.links.length > 0 && (
                  <div className="mt-3 flex items-center gap-2">
                    {m.answer.links.map((l) => (
                      <Link
                        key={l.label}
                        href={l.url}
                        aria-label={l.label}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 bg-white text-hella-green transition hover:border-hella-green"
                      >
                        <LinkIcon icon={l.icon} />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ),
        )}

        {/* Active combo step */}
        {mode === "combo" && currentStep && (
          <div className="rounded-2xl bg-hella-cream px-3.5 py-3">
            <HellaSisComboWizard
              step={currentStep}
              selected={comboSelected}
              onSelect={onComboSelect}
              onNext={onComboNext}
            />
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Composer (hidden during combo step selection) */}
      {mode === "chat" && (
        <div className="flex items-center gap-2 border-t border-black/10 px-3 py-2.5">
          <input
            value={composerValue}
            onChange={(e) => onComposerChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && composerValue.trim()) onComposerSubmit(composerValue.trim());
            }}
            placeholder="Nhập câu hỏi cho Hella Sis…"
            aria-label="Nhập câu hỏi"
            className="w-full bg-transparent px-2 text-sm text-black outline-none placeholder:text-black/40"
          />
          <button
            aria-label="Gửi"
            onClick={() => composerValue.trim() && onComposerSubmit(composerValue.trim())}
            className="shrink-0 text-hella-green transition hover:opacity-80"
          >
            <SendIcon className="h-5 w-5" />
          </button>
        </div>
      )}
    </aside>
  );
}
```

- [ ] **Step 4: Typecheck + commit**

Run: `npx tsc --noEmit` (expect no errors)
```bash
git add src/components/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/HellaSisChat.tsx src/components/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/HellaSisComboWizard.tsx src/app/globals.css
git commit -m "feat(hella-sis): add floating chat panel and combo wizard"
```

---

## Task 5: HellaSis orchestrator + page integration + remove FloatingContact

**Files:**
- Create: `src/components/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/HellaSis.tsx`
- Modify: `src/app/page.tsx`
- Delete: `src/components/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/FloatingContact.tsx`

**Interfaces:**
- Consumes: `HellaSisBar` (Task 3), `HellaSisChat` (Task 4), logic + data (Task 1).
- Produces: `HellaSis` (no props) — the drop-in section+panel for `page.tsx`.

- [ ] **Step 1: Create `HellaSis.tsx` (state owner)**

```tsx
"use client";

import { useMemo, useState } from "react";
import { HellaSisBar } from "./HellaSisBar";
import { HellaSisChat } from "./HellaSisChat";
import {
  buildCombo,
  comboSteps,
  filterSuggestions,
  matchQuestion,
  sisFallback,
  type ComboAnswers,
  type SisAnswer,
  type SisMessage,
  type SisQA,
} from "./hellaSis";

let msgId = 0;
const nextId = () => `m${msgId++}`;

export function HellaSis() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<SisMessage[]>([]);
  const [mode, setMode] = useState<"chat" | "combo">("chat");
  const [comboStep, setComboStep] = useState(0);
  const [comboAnswers, setComboAnswers] = useState<ComboAnswers>({ goals: [] });
  const [comboSelected, setComboSelected] = useState<string[]>([]);

  const [barValue, setBarValue] = useState("");
  const [barOpen, setBarOpen] = useState(false);
  const [composerValue, setComposerValue] = useState("");

  const suggestions = useMemo(() => filterSuggestions(barValue), [barValue]);

  const pushUser = (text: string) =>
    setMessages((m) => [...m, { id: nextId(), role: "user", text }]);
  const pushSis = (answer: SisAnswer) =>
    setMessages((m) => [...m, { id: nextId(), role: "sis", answer }]);

  const startCombo = () => {
    setComboAnswers({ goals: [] });
    setComboSelected([]);
    setComboStep(0);
    setMode("combo");
    pushSis({ text: ["Tuyệt vời! Mình sẽ hỏi bạn 3 câu nhanh để gợi ý combo chuẩn nhất nhé ✦"] });
  };

  const answerFor = (qa: SisQA | null) => {
    if (qa?.flow === "combo") {
      startCombo();
    } else {
      pushSis(qa?.answer ?? sisFallback);
    }
  };

  const handlePick = (qa: SisQA) => {
    setChatOpen(true);
    setBarOpen(false);
    setBarValue("");
    pushUser(qa.question);
    answerFor(qa);
  };

  const handleSubmit = (text: string) => {
    setChatOpen(true);
    setBarOpen(false);
    setBarValue("");
    setComposerValue("");
    pushUser(text);
    answerFor(matchQuestion(text));
  };

  const currentStep = mode === "combo" ? comboSteps[comboStep] : null;

  const advanceOrFinish = (answers: ComboAnswers) => {
    if (comboStep < comboSteps.length - 1) {
      const next = comboStep + 1;
      setComboStep(next);
      setComboSelected([]);
      pushSis({ text: [comboSteps[next].question] });
    } else {
      const result = buildCombo(answers);
      setMode("chat");
      pushSis(result);
    }
  };

  const handleComboSelect = (optionId: string) => {
    if (!currentStep) return;
    if (currentStep.multi) {
      setComboSelected((sel) => {
        if (sel.includes(optionId)) return sel.filter((s) => s !== optionId);
        if (currentStep.maxSelect && sel.length >= currentStep.maxSelect) return sel;
        return [...sel, optionId];
      });
      return;
    }
    // single-select: record + echo + advance
    const label = currentStep.options.find((o) => o.id === optionId)?.label ?? optionId;
    const answers: ComboAnswers = { ...comboAnswers, [currentStep.id]: optionId };
    setComboAnswers(answers);
    pushUser(label);
    advanceOrFinish(answers);
  };

  const handleComboNext = () => {
    if (!currentStep || comboSelected.length === 0) return;
    const labels = comboSelected
      .map((id) => currentStep.options.find((o) => o.id === id)?.label ?? id)
      .join(", ");
    const answers: ComboAnswers = { ...comboAnswers, goals: comboSelected };
    setComboAnswers(answers);
    pushUser(labels);
    advanceOrFinish(answers);
  };

  return (
    <>
      <HellaSisBar
        value={barValue}
        onChange={setBarValue}
        onSubmit={handleSubmit}
        open={barOpen}
        onOpenChange={setBarOpen}
        suggestions={suggestions}
        onPick={handlePick}
      />
      <HellaSisChat
        open={chatOpen}
        messages={messages}
        mode={mode}
        currentStep={currentStep}
        comboSelected={comboSelected}
        onComboSelect={handleComboSelect}
        onComboNext={handleComboNext}
        composerValue={composerValue}
        onComposerChange={setComposerValue}
        onComposerSubmit={handleSubmit}
        onClose={() => setChatOpen(false)}
      />
    </>
  );
}
```

- [ ] **Step 2: Wire into `page.tsx` — remove FloatingContact, add HellaSis after VendorCarousel**

In `src/app/page.tsx`:
1. Remove the import line for `FloatingContact`.
2. Add import: `import { HellaSis } from "@/components/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/HellaSis";`
3. Remove the `<FloatingContact />` element (currently after `<Footer />`).
4. Insert `<HellaSis />` between the Vendor `<ImageCarousel .../>` and the Instagram `<ImageCarousel .../>`.

Resulting `main` order: … `<BannerCarousel shopTheLook/>`, `<ImageCarousel vendor/>`, **`<HellaSis />`**, `<ImageCarousel instagram/>`. `<HellaSis />` renders its own bar section inline and the fixed panel; keep it inside/after `main` — placing it right after the vendor carousel inside `<main>` is correct.

- [ ] **Step 3: Delete the FloatingContact component**

```bash
git rm src/components/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/FloatingContact.tsx
```

- [ ] **Step 4: Full check**

Run: `npm run test` (expect PASS)
Run: `npm run check` (lint + typecheck + build — expect PASS)
Fix any type/lint errors before committing.

- [ ] **Step 5: Commit**

```bash
git add src/components/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/HellaSis.tsx src/app/page.tsx
git commit -m "feat(hella-sis): wire assistant into homepage, remove floating contact"
```

---

## Task 6: Visual QA (manual, when Chrome tool is available)

**Files:** none (verification only)

- [ ] **Step 1: Run the app**

Run: `npm run dev`, open `http://localhost:3000`.

- [ ] **Step 2: Verify against the checklist**

- Hella Sis section appears after the Vendor carousel with title + pill search bar.
- Focusing the bar opens the dropdown with all 5 suggestions; typing "lotion" filters to one; typing "tay te bao" filters correctly.
- Clicking a static suggestion opens the bottom-right panel and shows the answer (with product card / buy-link icons where defined).
- Typing nonsense + Enter shows the fallback message.
- Clicking "Gợi ý combo…" runs the 3-step wizard: vibe (single, auto-advances) → skin (single) → goals (multi, max 3 with a confirm button) → final combo message with product cards + 3 buy-link icons.
- Close button hides the panel; the floating contact buttons are gone.
- Colors are green `#698269` only; headings use BeautiqueDisplay; panel corners are square-ish; chips are pills.
- Mobile (~390px): panel is near-full-width bottom sheet; bar section is readable.

- [ ] **Step 3: Screenshot the section + open chat + combo result** and confirm with the user. Fix any visual gaps by adjusting the relevant component, re-run `npm run check`, and commit.

---

## Self-Review (completed during planning)

- **Spec coverage:** §1 flow → Tasks 3/4/5; §2 architecture/state → Task 5; §3 data model → Task 1; §4 combo → Tasks 1/4/5; §5 styling → Tasks 3/4; §6 testing → Tasks 1/6; FloatingContact removal → Task 5. All covered.
- **Placeholder scan:** no TBD/TODO; the only `#` URLs are intentional prototype placeholders (Shopee/TikTok), stated in Global Constraints.
- **Type consistency:** `SisQA`, `SisAnswer`, `SisMessage`, `ComboStep`, `ComboAnswers`, `buildCombo`, `matchQuestion`, `filterSuggestions`, `normalize` names/signatures are identical across Tasks 1, 3, 4, 5. `HellaSis` renders `HellaSisBar` + `HellaSisChat` with the exact prop shapes each task declares.
