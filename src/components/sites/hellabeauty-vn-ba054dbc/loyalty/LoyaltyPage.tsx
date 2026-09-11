"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Header } from "@/components/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/Header";
import { Footer } from "@/components/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/Footer";
import { HeroJar3D } from "./three3d/HeroJar3D";
import { LoyaltyIntro } from "./three3d/LoyaltyIntro";
import { StarBurst } from "./StarBurst";
import { JAR_CAPACITY, tiers, type Voucher } from "./loyaltyData";
import {
  CheckIcon,
  CloseIcon,
  KeyIcon,
  StarIcon,
} from "@/components/sites/hellabeauty-vn-ba054dbc/shared/icons";

const INTRO_KEY = "hella-loyalty-intro";
const CHECKIN_AWARD_KEY = "hella-checkin-award-seen";
const tierJarImages = [
  "/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/images/loyalty/tier-jar-1.png",
  "/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/images/loyalty/tier-jar-2.png",
  "/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/images/loyalty/tier-jar-3.png",
  "/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/images/loyalty/tier-jar-4.png",
] as const;

export function LoyaltyPage() {
  const [tierIndex, setTierIndex] = useState(0);
  const [stars, setStars] = useState(90);
  const [heroKey, setHeroKey] = useState(0);
  const [busy, setBusy] = useState(false);
  const [claimed, setClaimed] = useState<Voucher | null>(null);
  const [copied, setCopied] = useState(false);
  const [burst, setBurst] = useState<{ key: number; mode: "full" | "light" } | null>(null);
  const [checkinAward, setCheckinAward] = useState<number | null>(null);

  // Full-screen 3D star-pour intro, once per browser session.
  const [showIntro, setShowIntro] = useState(false);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromCheckin = params.get("source") === "checkin";
    const award = Number(params.get("stars"));
    const awardKey = `${CHECKIN_AWARD_KEY}:${award}`;

    if (fromCheckin && Number.isFinite(award) && award > 0) {
      let alreadySeen = false;
      try {
        alreadySeen = sessionStorage.getItem(awardKey) === "1";
        if (!alreadySeen) sessionStorage.setItem(awardKey, "1");
      } catch {
        /* storage unavailable */
      }

      if (!alreadySeen) {
        // Let the jar mount first, then the increased target releases the new stars into it.
        const timer = setTimeout(() => {
          setStars((current) => Math.min(JAR_CAPACITY, current + award));
          setCheckinAward(award);
        }, 450);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(INTRO_KEY) === "1";
    } catch {
      /* storage unavailable */
    }
    const fromCheckin = new URLSearchParams(window.location.search).get("source") === "checkin";
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate the one-time intro state
    if (!seen && !fromCheckin) setShowIntro(true);
  }, []);

  const finishIntro = () => {
    setShowIntro(false);
    try {
      sessionStorage.setItem(INTRO_KEY, "1");
    } catch {
      /* storage unavailable */
    }
  };

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
    if (busy || jarFull) return;
    // Direct & "như cũ": just pour the stars into the 3D jar (no page-wide rain).
    setStars((s) => Math.min(JAR_CAPACITY, s + n));
    setBusy(true);
    setTimeout(() => setBusy(false), 700);
  };

  const claimAndAdvance = () => {
    if (!nextTier) return;
    // Big celebration: stars rain over the whole page + burst out of the jar.
    setBurst((b) => ({ key: (b?.key ?? 0) + 1, mode: "full" }));
    setTierIndex((i) => i + 1);
    setStars(nextTier.bonus);
    setHeroKey((k) => k + 1); // rebuild the jar at the new tier's fill
  };

  return (
    <>
      {showIntro && <LoyaltyIntro onDone={finishIntro} />}
      {burst && (
        <StarBurst
          key={burst.key}
          mode={burst.mode}
          onDone={() => setBurst(null)}
        />
      )}
      {checkinAward && (
        <div className="hella-slide-up fixed left-1/2 top-24 z-[70] -translate-x-1/2 rounded-full border border-hella-green/20 bg-white px-5 py-3 text-center text-sm font-medium text-hella-green shadow-lg">
          +{checkinAward} sao đã được thêm vào hũ của bạn ✦
        </div>
      )}
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

          {/* 3D Jar */}
          <div className="mt-6">
            <HeroJar3D stars={stars} resetKey={heroKey} />
            <p className="mt-1 text-center text-[11px] text-black/35">
              Kéo để xoay hũ sao ✦
            </p>
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
                disabled={busy || jarFull}
                className={cn(
                  "mt-5 rounded-full px-6 py-2.5 text-sm font-medium text-white transition",
                  busy || jarFull ? "cursor-not-allowed bg-black/20" : "bg-hella-green hover:opacity-90",
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
            <div className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-4">
              {tiers.map((t, i) => {
                const completed = i < tierIndex;
                const current = i === tierIndex;
                const locked = i > tierIndex;
                return (
                  <div
                    key={t.id}
                    className={cn(
                      "relative flex flex-col items-center rounded-3xl border p-6 text-center transition",
                      current
                        ? "border-hella-green bg-white shadow-md ring-1 ring-hella-green/20"
                        : "border-black/10 bg-white",
                    )}
                  >
                    <div className={cn("flex flex-col items-center", locked && "blur-[3px]")}>
                      <Image
                        src={tierJarImages[i]}
                        alt={`${t.name} Hella Beauty jar`}
                        width={300}
                        height={350}
                        className="h-32 w-28 object-contain"
                      />
                      <p className="font-heading mt-4 text-base text-black">{t.name}</p>
                      <p className="mt-0.5 text-[11px] text-black/45">{t.range}</p>
                      <p className="mt-1 text-[11px] leading-snug text-black/40">{t.meaning}</p>
                    </div>
                    {current && (
                      <span className="mt-3 rounded-full bg-hella-green/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-hella-green">
                        Hạng hiện tại
                      </span>
                    )}
                    {completed && (
                      <span className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-hella-green text-white">
                        <CheckIcon className="h-3.5 w-3.5" />
                      </span>
                    )}
                    {locked && (
                      <span className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-black/40">
                        <KeyIcon className="h-7 w-7" />
                        <span className="text-[10px] font-medium">Chưa mở khoá</span>
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
