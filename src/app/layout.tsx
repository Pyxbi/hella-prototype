import type { Metadata } from "next";
import "./globals.css";
import { AccountProvider } from "@/components/sites/hellabeauty-vn-ba054dbc/account/AccountContext";

export const metadata: Metadata = {
  title: "Hella Beauty",
  description:
    "Hella Beauty — Chăm sóc toàn diện. Mua sắm & tận hưởng giao hàng miễn phí toàn quốc cùng Hellabeauty.vn",
  icons: {
    icon: "/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/images/favicon.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white text-black">
        <AccountProvider>{children}</AccountProvider>
      </body>
    </html>
  );
}
