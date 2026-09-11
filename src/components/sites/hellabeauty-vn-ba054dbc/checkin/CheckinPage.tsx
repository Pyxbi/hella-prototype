"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { SVGProps } from "react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { IMG } from "@/components/sites/hellabeauty-vn-ba054dbc/root-8a5edab2/data";
import type { IconName } from "@/components/sites/hellabeauty-vn-ba054dbc/buddy/buddyData";
import {
  checkinSteps,
  demoBoughtStepIds,
  feelings,
  routineStepById,
} from "./checkinData";
import {
  BodyWashIcon,
  CheckIcon,
  CloseIcon,
  FaceCareIcon,
  HairIcon,
  LotionIcon,
  MistIcon,
  ScrubIcon,
  StarIcon,
} from "@/components/sites/hellabeauty-vn-ba054dbc/shared/icons";

const ICONS: Record<IconName, (p: SVGProps<SVGSVGElement>) => React.ReactElement> = {
  bodywash: BodyWashIcon,
  scrub: ScrubIcon,
  face: FaceCareIcon,
  hair: HairIcon,
  lotion: LotionIcon,
  mist: MistIcon,
};

const MOUTHS = [
  "M8 15 Q12 17.5 16 15",
  "M8 15 Q12 16.5 16 15",
  "M8 15.5 L16 15.5",
  "M8 15 Q12 13.5 16 15",
  "M8 14.5 Q12 12 16 14.5",
];

function Face({ mood, color, active }: { mood: number; color: string; active: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-11 w-11 transition-transform", active ? "scale-110" : "opacity-80")}
    >
      <circle cx={12} cy={12} r={11} fill={color} />
      <circle cx={9} cy={10} r={1.2} fill="#fff" />
      <circle cx={15} cy={10} r={1.2} fill="#fff" />
      <path d={MOUTHS[mood]} stroke="#fff" strokeWidth={1.6} fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function CheckinPage() {
  const router = useRouter();
  const [bought, setBought] = useState<string[]>(demoBoughtStepIds);
  const [ticked, setTicked] = useState<string[]>([]);
  const [phase, setPhase] = useState<"idle" | "feeling" | "reward">("idle");
  const [feeling, setFeeling] = useState<string | null>(null);
  const isEncouragingFeeling =
    feeling === "amazing" || feeling === "tired" || feeling === "okay";

  useEffect(() => {
    try {
      const raw = localStorage.getItem("hella-buddy-plan");
      if (raw) {
        const saved = JSON.parse(raw) as { boughtStepIds?: string[] };
        // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate bought steps from saved plan
        if (saved.boughtStepIds?.length) setBought(saved.boughtStepIds);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = (id: string) =>
    setTicked((t) => (t.includes(id) ? t.filter((x) => x !== id) : [...t, id]));

  const mandatoryIds = checkinSteps.filter((s) => s.mandatory).map((s) => s.id);
  const canCheckin = mandatoryIds.every((id) => ticked.includes(id));

  return (
    <div className="min-h-screen bg-white">
      {/* Mini top bar (Zalo webview style) */}
      <header className="flex items-center justify-center border-b border-black/5 py-4">
        <Image src={`${IMG}/logo.png`} alt="Hella Beauty" width={92} height={22} className="h-auto w-[84px]" />
      </header>

      <main className="mx-auto max-w-md px-5 py-8">
        <h1 className="font-heading text-center text-2xl leading-snug text-black">
          Cùng <span className="text-hella-green">Hella Sis</span> chăm sóc bản thân mình nhé
        </h1>
        <p className="mt-2 text-center text-sm text-black/55">
          Hoàn thành từng bước để check-in routine hôm nay.
        </p>

        <ul className="mt-7 space-y-3">
          {checkinSteps.map((step, i) => {
            const ref = routineStepById[step.id];
            const isBought = bought.includes(step.id);
            const Icon = ref ? ICONS[ref.icon] : MistIcon;
            const on = ticked.includes(step.id);
            return (
              <li key={step.id}>
                <button
                  onClick={() => toggle(step.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition",
                    on ? "border-hella-green bg-hella-cream" : "border-black/12 bg-white",
                  )}
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-hella-green text-xs font-semibold text-white">
                    {i + 1}
                  </span>
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#f3efe8]">
                    {isBought && ref ? (
                      <span className="relative h-full w-full">
                        <Image src={ref.productImage} alt={step.label} fill className="object-cover" sizes="56px" />
                      </span>
                    ) : (
                      <Icon className="h-6 w-6 text-hella-green" />
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-black">
                      {step.label}
                      {step.mandatory && <span className="text-hella-green"> *</span>}
                    </span>
                    <span className="mt-0.5 block text-xs text-black/45">
                      Hiệu quả nhất: {step.minutes}
                    </span>
                    <span
                      className={cn(
                        "mt-1 inline-block rounded-full px-2 py-0.5 text-[10px]",
                        step.mandatory ? "bg-hella-green/10 text-hella-green" : "bg-black/5 text-black/50",
                      )}
                    >
                      {step.mandatory ? "Bắt buộc" : "Tùy chọn"}
                    </span>
                  </span>
                  <span
                    className={cn(
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition",
                      on ? "border-hella-green bg-hella-green text-white" : "border-black/25",
                    )}
                  >
                    {on && <CheckIcon className="h-3.5 w-3.5" />}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <p className="mt-4 text-center text-[11px] text-black/40">
          * Các bước có dấu sao là bắt buộc để hoàn thành check-in.
        </p>

        <button
          disabled={!canCheckin}
          onClick={() => setPhase("feeling")}
          className={cn(
            "mt-5 w-full rounded-full py-3.5 text-sm font-medium text-white transition",
            canCheckin ? "bg-hella-green hover:opacity-90" : "cursor-not-allowed bg-black/20",
          )}
        >
          Check-in
        </button>
      </main>

      {/* Post check-in modal */}
      {phase !== "idle" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="hella-slide-up relative w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-xl">
            <button
              aria-label="Đóng"
              onClick={() => setPhase("idle")}
              className="absolute right-4 top-4 text-black/40 hover:text-black"
            >
              <CloseIcon className="h-4 w-4" />
            </button>

            {phase === "feeling" && (
              <>
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-hella-cream text-hella-green">
                  <StarIcon className="h-6 w-6" />
                </span>
                <h2 className="font-heading text-hella-green mt-4 text-xl leading-snug">
                  Chúc mừng bạn đã tiến gần hơn một bước đạt được “HER” mong muốn!
                </h2>
                <p className="mt-4 text-sm font-medium text-black">How are you feeling today?</p>
                <p className="text-xs text-black/50">
                  Cảm nhận của bạn giúp Hella Sis chăm sóc bạn tốt hơn.
                </p>
                <div className="mt-5 flex items-end justify-between">
                  {feelings.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => {
                        setFeeling(f.id);
                        setTimeout(() => setPhase("reward"), 350);
                      }}
                      className="flex flex-col items-center gap-1"
                    >
                      <Face mood={f.mood} color={f.color} active={feeling === f.id} />
                      <span className="text-[10px] text-black/55">{f.label}</span>
                    </button>
                  ))}
                </div>
                <div className="mt-4 h-1.5 rounded-full bg-gradient-to-r from-[#4caf50] via-[#e8c14a] to-[#e05a5a]" />
              </>
            )}

            {phase === "reward" && (
              <>
                <div className="flex items-center justify-center gap-1">
                  {[0, 1, 2].map((i) => (
                    <StarIcon
                      key={i}
                      className="hella-slide-up h-9 w-9 text-[#e8c14a]"
                      style={{ animationDelay: `${i * 120}ms` }}
                    />
                  ))}
                </div>
                <h2 className="font-heading text-hella-green mt-4 text-2xl leading-snug">
                  Bạn nhận được +50 sao!
                </h2>
                <p className="mx-auto mt-3 max-w-xs text-sm text-black/60">
                  Số sao sẽ được tích luỹ vào chương trình Loyalty của Hella Beauty —
                  tiếp tục giữ routine để nhận thêm ưu đãi nhé ✦
                </p>
                {isEncouragingFeeling && (
                  <p className="mx-auto mt-4 max-w-xs border-l-2 border-hella-green bg-hella-cream px-4 py-3 text-left text-sm leading-6 text-hella-green">
                    Hành trình 8 tuần chăm sóc bản thân của bạn sắp hoàn thành, hãy tiếp tục với
                    Hella.
                  </p>
                )}
                <button
                  onClick={() => {
                    setPhase("idle");
                    setTicked([]);
                    setFeeling(null);
                    router.push("/pages/loyalty?source=checkin&stars=50");
                  }}
                  className="mt-6 w-full rounded-full bg-hella-green py-3 text-sm font-medium text-white transition hover:opacity-90"
                >
                  {isEncouragingFeeling ? "Tiếp tục với Hella" : "Hoàn tất"}
                </button>
                <Link href="/" className="mt-3 inline-block text-xs text-black/45 underline">
                  Về trang chủ Hella Beauty
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
