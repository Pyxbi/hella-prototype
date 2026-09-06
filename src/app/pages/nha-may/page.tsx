import type { Metadata } from "next";
import { FactoryPage } from "@/components/sites/hellabeauty-vn-ba054dbc/factory/FactoryPage";

export const metadata: Metadata = {
  title: "Nhà máy – Hella Beauty",
  description:
    "Nhà máy Hella Beauty vận hành theo các tiêu chuẩn quốc tế: ISO 22716:2007 (CGMP), ISO 9001:2015 (QMS).",
};

export default function Page() {
  return <FactoryPage />;
}
