import type { Metadata } from "next";
import { ArticlePage } from "@/components/sites/hellabeauty-vn-ba054dbc/shared/article/ArticlePage";
import { nguyenLieuArticle } from "@/components/sites/hellabeauty-vn-ba054dbc/ingredients/nguyenLieuArticle";

export const metadata: Metadata = {
  title: "Nguyên liệu – Hella Beauty",
  description:
    "Bí mật công thức body care của Hella Beauty: nguyên liệu thiên nhiên nội địa, minh bạch nguồn gốc, 100% thuần chay & an toàn.",
};

export default function Page() {
  return <ArticlePage data={nguyenLieuArticle} />;
}
