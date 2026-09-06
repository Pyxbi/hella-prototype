import { describe, it, expect } from "vitest";
import {
  parseTimeToHour,
  defaultDaysForFrequency,
  weeksForFrequency,
  goalFromHer,
  hourWindow,
} from "./planLogic";

describe("parseTimeToHour", () => {
  it("handles morning (SA) and evening (CH) with 12 edge cases", () => {
    expect(parseTimeToHour("6:00 SA")).toBe(6);
    expect(parseTimeToHour("7:00 CH")).toBe(19);
    expect(parseTimeToHour("12:00 SA")).toBe(0);
    expect(parseTimeToHour("12:00 CH")).toBe(12);
  });
});

describe("defaultDaysForFrequency", () => {
  it("returns a sensible day count per frequency index", () => {
    expect(defaultDaysForFrequency(0)).toHaveLength(1);
    expect(defaultDaysForFrequency(1)).toHaveLength(2);
    expect(defaultDaysForFrequency(2)).toEqual([1, 3, 6]);
    expect(defaultDaysForFrequency(4)).toHaveLength(6);
  });
});

describe("weeksForFrequency", () => {
  it("more frequent → fewer weeks", () => {
    expect(weeksForFrequency(0)).toBe(12);
    expect(weeksForFrequency(2)).toBe(8);
    expect(weeksForFrequency(4)).toBe(4);
  });
});

describe("goalFromHer", () => {
  it("maps HER ids to phrases with a fallback", () => {
    expect(goalFromHer([])).toBe("Chăm sóc toàn diện");
    expect(goalFromHer(["nang-niu"])).toContain("Dưỡng ẩm");
    expect(goalFromHer(["chin-chu", "vao-nep"]).split(" · ")).toHaveLength(2);
  });
});

describe("hourWindow", () => {
  it("returns 8 consecutive hours framing the chosen hour", () => {
    const w = hourWindow(19);
    expect(w).toHaveLength(8);
    expect(w).toContain(19);
    expect(hourWindow(1)[0]).toBe(0); // clamped at 0
  });
});
