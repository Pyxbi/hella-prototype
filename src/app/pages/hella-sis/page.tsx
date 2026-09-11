import type { Metadata } from "next";
import { Suspense } from "react";
import { HellaSisPage } from "@/components/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/HellaSisPage";

export const metadata: Metadata = {
  title: "Hella Sis – Trợ lý làm đẹp dành riêng cho bạn",
  description: "Trò chuyện với Hella Sis, khám phá routine và tìm lại những gợi ý làm đẹp dành riêng cho bạn.",
};

export default function Page() {
  return <Suspense fallback={<div className="flex min-h-dvh items-center justify-center bg-hella-cream font-heading text-2xl text-hella-green">Hella Sis…</div>}><HellaSisPage /></Suspense>;
}
