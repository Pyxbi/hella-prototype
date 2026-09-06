"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Header } from "@/components/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/Header";
import { Footer } from "@/components/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/Footer";
import { StarJar } from "./StarJar";
import { JAR_CAPACITY, tiers, type Voucher } from "./loyaltyData";
import {
  CheckIcon,
  CloseIcon,
  KeyIcon,
  StarIcon,
} from "@/components/sites/hellabeauty-vn-ba054dbc/shared/icons";

export function LoyaltyPage() {
  const [tierIndex, setTierIndex] = useState(0);
  const [stars, setStars] = useState(90);
  const [dropping, setDropping] = useState(false);
  const [popup, setPopup] = useState(true);
  const [claimed, setClaimed] = useState<Voucher | null>(null);
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    if (!claimed) return;
    try {
      await navigator.clipboard.writeText(claimed.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const tier = tiers[tierIndex];
  const jarFull = stars >= JAR_CAPACITY;
  const nextTier = tiers[tierIndex + 1];

  const addStars = (n: number) => {
    setDropping(true);
    setTimeout(() => setStars((s) => Math.min(JAR_CAPACITY, s + n)), 400);
    setTimeout(() => setDropping(false), 1700);
  };

  const claimAndAdvance = () => {
    if (!nextTier) return;
    setTierIndex((i) => i + 1);
    setStars(0);
    setDropping(true);
    setTimeout(() => setStars(nextTier.bonus), 450);
    setTimeout(() => setDropping(false), 1800);
  };

  return (
    <>
      <Header />

      <main className="flex-1 bg-[#fbf8f2]">
        <section className="mx-auto max-w-[900px] px-5 py-10 lg:py-14">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-hella-green">
              Level Her Up
            </p>
            <h1 className="font-heading text-hella-green mt-2 text-3xl leading-tight sm:text-4xl">
              Hũ sao thưởng của bạn
            </h1>
            <p className="mt-2 text-sm text-black/55">
              Đổ đầy sao vào hũ để mở khoá thứ hạng và ưu đãi tiếp theo ✦
            </p>
          </div>

          {/* Jar */}
          <div className="mt-8">
            <StarJar fillPercent={stars} color={tier.color} dropping={dropping} />
          </div>

          {/* progress */}
          <div className="mx-auto mt-6 max-w-sm text-center">
            <p className="font-heading text-lg text-black">
              {tier.name}: <span className="text-hella-green">{stars}</span> / {JAR_CAPACITY} ★
            </p>
            <p className="mt-1 text-xs text-black/50">{tier.meaning}</p>
            <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-black/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#e8c14a] to-[#f0cf6a] transition-[width] duration-[1400ms] ease-out"
                style={{ width: `${stars}%` }}
              />
            </div>
            <p className="mt-2 text-[11px] text-black/45">{tier.rate}</p>

            {jarFull && nextTier ? (
              <div className="mt-5 rounded-2xl border border-hella-green/30 bg-hella-cream p-4">
                <p className="font-heading text-hella-green">
                  Chúc mừng! Bạn đã đổ đầy hũ {tier.name} 🎉
                </p>
                <p className="mt-1 text-xs text-black/60">
                  Nhận +{nextTier.bonus} sao thưởng cho hũ {nextTier.name}.
                </p>
                <button
                  onClick={claimAndAdvance}
                  className="mt-3 rounded-full bg-hella-green px-6 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
                >
                  Mở hũ {nextTier.name}
                </button>
              </div>
            ) : (
              <button
                onClick={() => addStars(10)}
                disabled={dropping || jarFull}
                className={cn(
                  "mt-5 rounded-full px-6 py-2.5 text-sm font-medium text-white transition",
                  dropping || jarFull ? "cursor-not-allowed bg-black/20" : "bg-hella-green hover:opacity-90",
                )}
              >
                Hoàn thành đơn hàng (+10 sao)
              </button>
            )}
          </div>

          {/* Tier strip */}
          <div className="mt-12">
            <h2 className="font-heading text-center text-sm font-semibold uppercase tracking-widest text-black/60">
              Các thứ hạng
            </h2>
            <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {tiers.map((t, i) => {
                const completed = i < tierIndex;
                const current = i === tierIndex;
                const locked = i > tierIndex;
                return (
                  <div
                    key={t.id}
                    className={cn(
                      "relative rounded-2xl border p-4 text-center transition",
                      current ? "border-hella-green bg-white shadow-sm" : "border-black/10 bg-white",
                    )}
                  >
                    <div className={cn("relative", locked && "blur-[3px]")}>
                      <span
                        className="mx-auto flex h-14 w-12 items-end justify-center overflow-hidden rounded-b-3xl rounded-t-lg border-2"
                        style={{ borderColor: `${t.color}66` }}
                      >
                        <span
                          className="w-full bg-gradient-to-t from-[#e8c14a] to-[#f7e39a]"
                          style={{ height: completed ? "100%" : current ? `${stars}%` : "0%" }}
                        />
                      </span>
                      <p className="font-heading mt-3 text-sm text-black">{t.name}</p>
                      <p className="text-[10px] text-black/45">{t.range}</p>
                    </div>
                    {completed && (
                      <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-hella-green text-white">
                        <CheckIcon className="h-3 w-3" />
                      </span>
                    )}
                    {locked && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <KeyIcon className="h-6 w-6 text-black/40" />
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Vouchers for current tier */}
          <div className="mt-12">
            <h2 className="font-heading text-center text-sm font-semibold uppercase tracking-widest text-black/60">
              Ưu đãi hạng {tier.name}
            </h2>
            <div className="mt-6 space-y-3">
              {tier.vouchers.map((v) => (
                <div
                  key={v.id}
                  className="flex items-center gap-4 rounded-2xl border border-black/10 bg-white p-4"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-hella-cream text-hella-green">
                    <StarIcon className="h-5 w-5 text-[#e8c14a]" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-black">{v.label}</p>
                    <p className="text-xs text-black/50">{v.brand}</p>
                  </div>
                  {v.state === "used" ? (
                    <span className="shrink-0 rounded-full bg-black/5 px-4 py-2 text-xs text-black/40">
                      Đã dùng
                    </span>
                  ) : (
                    <button
                      onClick={() => {
                        setClaimed(v);
                        setCopied(false);
                      }}
                      className="shrink-0 rounded-full bg-hella-green px-4 py-2 text-xs font-medium text-white transition hover:opacity-90"
                    >
                      Nhận mã ngay
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* reward popup */}
      {popup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="hella-slide-up w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-xl">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-hella-cream">
              <StarIcon className="h-7 w-7 text-[#e8c14a]" />
            </span>
            <h2 className="font-heading text-hella-green mt-4 text-xl leading-snug">
              Chúc mừng bạn đã hoàn thành đơn hàng và nhận được 10 sao!
            </h2>
            <p className="mt-2 text-sm text-black/60">
              Cùng đổ sao vào hũ {tier.name} của bạn nhé ✦
            </p>
            <button
              onClick={() => {
                setPopup(false);
                addStars(10);
              }}
              className="mt-5 w-full rounded-full bg-hella-green py-3 text-sm font-medium text-white transition hover:opacity-90"
            >
              Đổ sao vào hũ
            </button>
          </div>
        </div>
      )}

      {/* voucher claim modal */}
      {claimed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setClaimed(null)}
        >
          <div
            className="hella-slide-up w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              aria-label="Đóng"
              onClick={() => setClaimed(null)}
              className="absolute right-4 top-4 text-black/40 hover:text-black"
            >
              <CloseIcon className="h-4 w-4" />
            </button>

            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-hella-cream">
              <StarIcon className="h-7 w-7 text-[#e8c14a]" />
            </span>
            <h2 className="font-heading text-hella-green mt-4 text-xl leading-snug">
              Bạn đã nhận ưu đãi!
            </h2>

            {/* voucher card */}
            <div className="mt-5 rounded-2xl border-2 border-dashed border-hella-green/40 bg-hella-cream/50 p-5">
              <p className="text-xs font-medium uppercase tracking-wide text-black/45">
                {claimed.brand}
              </p>
              <p className="font-heading text-hella-green mt-1 text-lg leading-snug">
                {claimed.label}
              </p>
              <div className="mt-4 flex items-center gap-2">
                <code className="flex-1 rounded-lg border border-black/15 bg-white px-3 py-2.5 text-center text-sm font-semibold tracking-widest text-black">
                  {claimed.code}
                </code>
                <button
                  onClick={copyCode}
                  className={cn(
                    "shrink-0 rounded-lg px-4 py-2.5 text-xs font-medium text-white transition",
                    copied ? "bg-black/60" : "bg-hella-green hover:opacity-90",
                  )}
                >
                  {copied ? "Đã sao chép ✓" : "Sao chép"}
                </button>
              </div>
            </div>

            <p className="mt-3 text-[11px] text-black/45">
              Nhập mã khi thanh toán để áp dụng ưu đãi. Mã có hiệu lực trong 30 ngày.
            </p>
            <button
              onClick={() => setClaimed(null)}
              className="mt-5 w-full rounded-full bg-hella-green py-3 text-sm font-medium text-white transition hover:opacity-90"
            >
              Xong
            </button>
          </div>
        </div>
      )}
    </>
  );
}
