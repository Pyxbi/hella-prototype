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
  details?: string[];
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
    details: [
      "Dựa trên những gì bạn đã chia sẻ về vibe, loại da và nhu cầu chăm sóc, Hella Sis đã chọn ra 3 sản phẩm phù hợp nhất với bạn nè.",
      "Lý do Hella Sis ghép 3 sản phẩm này với nhau là vì chúng bổ sung cho nhau khá tự nhiên trong routine, thay vì mỗi sản phẩm đứng riêng lẻ. Một sản phẩm hỗ trợ bước làm sạch, một sản phẩm giúp bạn chăm sóc da kỹ hơn khi cần, và một sản phẩm hoàn thiện trải nghiệm bằng mùi hương. Combo này cũng được chọn theo hướng vừa đủ và dễ áp dụng, để routine không bị quá nhiều bước nhưng vẫn có sự cân bằng giữa chăm sóc da và cảm giác cá nhân bạn muốn hướng tới. Như vậy, bạn có thể sử dụng linh hoạt theo thói quen hằng ngày nhé bạn. Nếu sau này nhu cầu, sở thích hoặc routine của bạn thay đổi, Hella Sis cũng có thể điều chỉnh lại combo để phù hợp hơn với bạn nha.",
    ],
    links: [
      { label: "Website", url: "/", icon: "web" },
      { label: "Shopee", url: "#", icon: "shopee" },
      { label: "TikTok Shop", url: "#", icon: "tiktok" },
    ],
  };
}
