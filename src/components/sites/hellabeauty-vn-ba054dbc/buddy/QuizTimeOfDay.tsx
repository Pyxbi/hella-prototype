"use client";

import { useEffect, useMemo, useRef } from "react";
import { cn } from "@/lib/utils";
import {
  MoonIcon,
  SunIcon,
} from "@/components/sites/hellabeauty-vn-ba054dbc/shared/icons";

const ITEM_H = 48;
const MORNING = [5, 6, 7, 8, 9, 10];
const EVENING = [6, 7, 8, 9, 10, 11];

export function QuizTimeOfDay({
  period,
  time,
  onChange,
}: {
  period: "morning" | "evening";
  time: string;
  onChange: (period: "morning" | "evening", time: string) => void;
}) {
  const hours = useMemo(() => (period === "morning" ? MORNING : EVENING), [period]);
  const suffix = period === "morning" ? "SA" : "CH";
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentHour = parseInt(time, 10);

  // keep the wheel scrolled to the selected hour when period changes
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let idx = hours.indexOf(currentHour);
    if (idx < 0) {
      idx = Math.floor(hours.length / 2);
      onChange(period, `${hours[idx]}:00 ${suffix}`);
    }
    el.scrollTop = idx * ITEM_H;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period]);

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const idx = Math.max(0, Math.min(hours.length - 1, Math.round(el.scrollTop / ITEM_H)));
    const h = hours[idx];
    if (h !== currentHour) onChange(period, `${h}:00 ${suffix}`);
  };

  return (
    <div className="mx-auto max-w-md">
      {/* Sun / Moon toggle */}
      <div className="grid grid-cols-2 gap-4">
        {(["morning", "evening"] as const).map((p) => {
          const active = period === p;
          return (
            <button
              key={p}
              onClick={() => onChange(p, time)}
              className={cn(
                "flex flex-col items-center gap-1 rounded-2xl border py-5 transition",
                active ? "border-hella-green bg-hella-cream text-hella-green" : "border-black/15 text-black/60 hover:border-hella-green",
              )}
            >
              {p === "morning" ? <SunIcon className="h-7 w-7" /> : <MoonIcon className="h-7 w-7" />}
              <span className="mt-1 text-sm font-medium">{p === "morning" ? "Mặt trời" : "Mặt trăng"}</span>
              <span className="text-xs opacity-70">{p === "morning" ? "Buổi sáng" : "Buổi tối"}</span>
            </button>
          );
        })}
      </div>

      {/* Time wheel */}
      <p className="mt-8 text-center text-xs text-black/50">
        Khung giờ {period === "morning" ? "buổi sáng" : "buổi tối"}
      </p>
      <div className="relative mx-auto mt-3 h-[144px] w-40 overflow-hidden">
        {/* selection band */}
        <div className="pointer-events-none absolute inset-x-0 top-1/2 z-10 h-12 -translate-y-1/2 border-y border-hella-green/40" />
        <div
          ref={scrollRef}
          onScroll={onScroll}
          className="h-full snap-y snap-mandatory overflow-y-scroll [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ paddingTop: ITEM_H, paddingBottom: ITEM_H }}
        >
          {hours.map((h) => (
            <div
              key={h}
              className={cn(
                "flex h-12 snap-center items-center justify-center text-lg transition",
                h === currentHour ? "font-heading text-2xl text-hella-green" : "text-black/30",
              )}
            >
              {h}:00 {suffix}
            </div>
          ))}
        </div>
      </div>
      <p className="mt-3 text-center font-heading text-lg text-black">{time}</p>
    </div>
  );
}
