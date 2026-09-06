import type { Metadata } from "next";
import { CheckinPage } from "@/components/sites/hellabeauty-vn-ba054dbc/checkin/CheckinPage";

export const metadata: Metadata = {
  title: "Check-in routine – Hella Sis",
  description: "Cùng Hella Sis chăm sóc bản thân mình nhé — check-in routine hằng ngày của bạn.",
};

export default function Page() {
  return <CheckinPage />;
}
