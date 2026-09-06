import type { Metadata } from "next";
import { ArticlePage } from "@/components/sites/hellabeauty-vn-ba054dbc/shared/article/ArticlePage";
import { brandStoryArticle } from "@/components/sites/hellabeauty-vn-ba054dbc/brand-story/brandStoryArticle";

export const metadata: Metadata = {
  title: "Câu chuyện thương hiệu – Hella Beauty",
  description:
    "TO – GET – HER: hành trình nuôi dưỡng tính nữ của riêng bạn cùng Hella Beauty.",
};

export default function Page() {
  return <ArticlePage data={brandStoryArticle} />;
}
