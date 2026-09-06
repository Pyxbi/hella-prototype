import {
  sisQuestions,
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
