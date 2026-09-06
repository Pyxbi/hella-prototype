import type { Metadata } from "next";
import { HellaBuddyPage } from "@/components/sites/hellabeauty-vn-ba054dbc/buddy/HellaBuddyPage";

export const metadata: Metadata = {
  title: "Hella Buddy – Lịch nhắc nhở routine",
  description:
    "Để Hella Sis đồng hành, giúp bạn duy trì routine chăm sóc cơ thể đều đặn với lịch nhắc nhở cá nhân hoá.",
};

export default function Page() {
  return <HellaBuddyPage />;
}
