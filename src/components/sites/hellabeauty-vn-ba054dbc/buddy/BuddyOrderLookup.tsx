"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { channels, sampleOrderProducts } from "./buddyData";
import {
  ArrowRightIcon,
  GlobeIcon,
} from "@/components/sites/hellabeauty-vn-ba054dbc/shared/icons";

export function BuddyOrderLookup({
  onConfirm,
}: {
  onConfirm: (boughtStepIds: string[]) => void;
}) {
  const [channel, setChannel] = useState("website");
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "found">("idle");

  const search = () => {
    if (!code.trim()) return;
    setStatus("loading");
    setTimeout(() => setStatus("found"), 1200);
  };

  return (
    <main className="flex-1">
      <section className="mx-auto max-w-[900px] px-5 py-14 lg:py-20">
        <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm sm:p-10">
          <div className="text-center">
            <h1 className="font-heading text-2xl leading-tight text-black sm:text-3xl">
              Xác nhận đơn hàng của bạn tại Hella Beauty
            </h1>
            <span className="mt-3 inline-block rounded-full bg-hella-cream px-3 py-1 text-xs text-black/60">
              Bước 1/3
            </span>
          </div>

          {/* 1. channel */}
          <p className="mt-8 text-sm font-medium text-black">1. Chọn nơi bạn đã mua hàng</p>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {channels.map((c) => (
              <button
                key={c.id}
                onClick={() => setChannel(c.id)}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm transition",
                  channel === c.id
                    ? "border-hella-green bg-hella-cream text-hella-green"
                    : "border-black/15 text-black/70 hover:border-hella-green",
                )}
              >
                {c.icon ? (
                  <Image src={c.icon} alt="" width={18} height={18} className="h-5 w-5 object-contain" />
                ) : (
                  <GlobeIcon className="h-5 w-5" />
                )}
                <span className="hidden sm:inline">{c.label}</span>
              </button>
            ))}
          </div>

          {/* 2. code */}
          <p className="mt-6 text-sm font-medium text-black">2. Nhập mã đơn hàng</p>
          <div className="mt-3 flex gap-3">
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && search()}
              placeholder="Vui lòng nhập mã đơn hàng của bạn"
              className="w-full rounded-lg border border-black/15 bg-white px-4 py-2.5 text-sm text-black outline-none transition focus:border-hella-green"
            />
            <button
              onClick={search}
              className="shrink-0 rounded-lg bg-hella-green px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
            >
              Tìm đơn hàng
            </button>
          </div>

          {/* 3. results */}
          {status === "loading" && (
            <p className="mt-8 text-center text-sm text-black/50">
              Đang đối chiếu với hệ thống…
            </p>
          )}

          {status === "found" && (
            <div className="mt-8">
              <p className="text-sm font-medium text-black">3. Sản phẩm đã mua</p>
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {sampleOrderProducts.map((p) => (
                  <div key={p.stepId} className="text-center">
                    <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-[#f3efe8]">
                      <Image src={p.image} alt={p.title} fill className="object-cover" sizes="120px" />
                    </div>
                    <p className="mt-2 text-xs leading-snug text-black/70">{p.title}</p>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-black/40">
                Đây là các sản phẩm hệ thống tìm thấy từ mã đơn hàng của bạn.
              </p>
              <button
                onClick={() => onConfirm(sampleOrderProducts.map((p) => p.stepId))}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-hella-green py-3 text-sm font-medium text-white transition hover:opacity-90"
              >
                Xác nhận đúng sản phẩm tôi đã mua
                <ArrowRightIcon className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
