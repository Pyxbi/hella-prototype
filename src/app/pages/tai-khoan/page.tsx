"use client";

import { useRouter } from "next/navigation";
import { Header } from "@/components/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/Header";
import { Footer } from "@/components/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/Footer";
import { AccountForm } from "@/components/sites/hellabeauty-vn-ba054dbc/account/AccountForm";

export default function Page() {
  const router = useRouter();
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="mx-auto flex max-w-md flex-col justify-center px-5 py-16 lg:py-24">
          <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-sm">
            <AccountForm onDone={() => router.push("/pages/hella-buddy")} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
