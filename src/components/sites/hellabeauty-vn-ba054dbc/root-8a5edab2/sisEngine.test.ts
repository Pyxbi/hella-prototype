import { describe, it, expect } from "vitest";
import {
  normalize,
  matchQuestion,
  filterSuggestions,
  buildCombo,
} from "./sisEngine";

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
