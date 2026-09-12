// STEP 6 daily check-in — steps reference buddy routineSteps for product image + icon.
import { routineSteps } from "@/components/sites/hellabeauty-vn-ba054dbc/buddy/buddyData";

export interface CheckinStep {
  id: string; // matches a buddy routineSteps id
  label: string;
  mandatory: boolean;
  minutes: string;
}

export const checkinSteps: CheckinStep[] = [
  { id: "tay-tbc", label: "Tẩy tế bào chết", mandatory: true, minutes: "3–5 phút" },
  { id: "tam-goi", label: "Tắm gội", mandatory: true, minutes: "5–7 phút" },
  { id: "cham-toc", label: "Chăm sóc tóc", mandatory: false, minutes: "3–5 phút" },
  { id: "da-mat", label: "Chăm sóc da mặt", mandatory: false, minutes: "3–5 phút" },
  { id: "xit-thom", label: "Xịt thơm", mandatory: false, minutes: "1 phút" },
];

export const routineStepById = Object.fromEntries(
  routineSteps.map((s) => [s.id, s]),
);

// Used when no saved plan is available (demo).
export const demoBoughtStepIds = ["tay-tbc", "tam-goi", "da-mat", "cham-toc"];

export interface Feeling {
  id: string;
  label: string;
  color: string;
  mood: number; // 0 (sad) .. 4 (happy) → mouth curve
}

export const feelings: Feeling[] = [
  { id: "not-great", label: "Not great", color: "#e05a5a", mood: 0 },
  { id: "tired", label: "Tired", color: "#ec8a3c", mood: 1 },
  { id: "okay", label: "Okay", color: "#e8c14a", mood: 2 },
  { id: "good", label: "Good", color: "#8bc34a", mood: 3 },
  { id: "amazing", label: "Amazing", color: "#4caf50", mood: 4 },
];
