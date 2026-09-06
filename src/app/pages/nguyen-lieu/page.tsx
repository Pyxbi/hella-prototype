import type { Metadata } from "next";
import { IngredientsPage } from "@/components/sites/hellabeauty-vn-ba054dbc/ingredients/IngredientsPage";

export const metadata: Metadata = {
  title: "Nguyên liệu – Hella Beauty",
  description:
    "Nguyên liệu Hella Beauty — minh bạch từ thiên nhiên: vỏ cam, cà phê, đậu đỏ, hạnh nhân, macca. Lành tính, an toàn, đạt chuẩn quốc tế.",
};

export default function Page() {
  return <IngredientsPage />;
}
