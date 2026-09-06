import { frequencyStops, type BuddyAnswers } from "../buddyData";

export interface DayDef {
  id: number; // 0 = Mon ... 6 = Sun
  label: string;
  short: string;
}

export const DAYS: DayDef[] = [
  { id: 0, label: "Thứ 2", short: "T2" },
  { id: 1, label: "Thứ 3", short: "T3" },
  { id: 2, label: "Thứ 4", short: "T4" },
  { id: 3, label: "Thứ 5", short: "T5" },
  { id: 4, label: "Thứ 6", short: "T6" },
  { id: 5, label: "Thứ 7", short: "T7" },
  { id: 6, label: "Chủ nhật", short: "CN" },
];

export interface PlanSession {
  id: string;
  dayId: number;
  hour: number; // 0-23
  steps: string[];
}

export interface DerivedPlan {
  hour: number;
  period: "morning" | "evening";
  selectedDayIds: number[];
  weeks: number;
  goal: string;
  frequencyLabel: string;
  hourWindow: number[];
  sessions: PlanSession[];
}

export function parseTimeToHour(time: string): number {
  const h = parseInt(time, 10) || 0;
  const isMorning = /SA/i.test(time);
  if (isMorning) return h === 12 ? 0 : h;
  return h === 12 ? 12 : h + 12; // CH (afternoon/evening)
}

const DEFAULT_DAYS: number[][] = [
  [1], // 1 buổi/tuần
  [1, 4], // 2 buổi/tuần
  [1, 3, 6], // 3–4 buổi/tuần
  [0, 1, 2, 3, 4], // 5–6 buổi/tuần
  [0, 1, 2, 3, 4, 5], // gần như mỗi ngày
];

export function defaultDaysForFrequency(idx: number): number[] {
  return DEFAULT_DAYS[idx] ?? [1, 3, 6];
}

const WEEKS = [12, 10, 8, 6, 4];
export function weeksForFrequency(idx: number): number {
  return WEEKS[idx] ?? 8;
}

const HER_GOALS: Record<string, string> = {
  "chin-chu": "Sạch thơm & tự tin mỗi ngày",
  "nang-niu": "Dưỡng ẩm & làm mềm da",
  "tuoi-moi": "Nhẹ nhàng, phục hồi & thoáng da",
  "vao-nep": "Chăm sóc chuyên sâu từ tóc đến body",
};

export function goalFromHer(ids: string[]): string {
  const phrases = ids.map((id) => HER_GOALS[id]).filter(Boolean);
  if (phrases.length === 0) return "Chăm sóc toàn diện";
  return phrases.slice(0, 2).join(" · ");
}

export function hourWindow(hour: number): number[] {
  const start = Math.max(0, Math.min(hour - 2, 16));
  return Array.from({ length: 8 }, (_, i) => start + i);
}

export function buildInitialSessions(
  dayIds: number[],
  hour: number,
  steps: string[],
): PlanSession[] {
  return dayIds.map((d) => ({ id: `s-${d}`, dayId: d, hour, steps: [...steps] }));
}

// Monday-based current week, returns "dd/mm" per day index (0=Mon..6=Sun).
export function currentWeekDates(base: Date = new Date()): string[] {
  const day = base.getDay(); // 0=Sun..6=Sat
  const mondayOffset = (day + 6) % 7;
  const monday = new Date(base);
  monday.setDate(base.getDate() - mondayOffset);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    return `${dd}/${mm}`;
  });
}

export function derivePlan(answers: BuddyAnswers): DerivedPlan {
  const hour = parseTimeToHour(answers.time);
  const selectedDayIds = defaultDaysForFrequency(answers.frequency);
  return {
    hour,
    period: answers.period,
    selectedDayIds,
    weeks: weeksForFrequency(answers.frequency),
    goal: goalFromHer(answers.her),
    frequencyLabel: frequencyStops[answers.frequency] ?? "",
    hourWindow: hourWindow(hour),
    sessions: buildInitialSessions(selectedDayIds, hour, answers.steps),
  };
}
