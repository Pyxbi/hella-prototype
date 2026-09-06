import type { Metadata } from "next";
import { LoyaltyPage } from "@/components/sites/hellabeauty-vn-ba054dbc/loyalty/LoyaltyPage";

export const metadata: Metadata = {
  title: "Sao thưởng – Level Her Up | Hella Beauty",
  description:
    "Đổ đầy sao vào hũ để mở khoá thứ hạng Her Bloom, Her Glow, Her Shine, Her Icon và nhận ưu đãi.",
};

export default function Page() {
  return <LoyaltyPage />;
}
