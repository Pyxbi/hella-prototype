"use client";

import { cn } from "@/lib/utils";
import { frequencyStops } from "./buddyData";

export function QuizFrequencySlider({
  value,
  onChange,
}: {
  value: number;
  onChange: (i: number) => void;
}) {
  const max = frequencyStops.length - 1;
  return (
    <div className="mx-auto max-w-2xl px-2">
      <input
        type="range"
        min={0}
        max={max}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label="Số ngày mỗi tuần"
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-black/10 accent-hella-green"
      />
      <div className="mt-4 flex justify-between">
        {frequencyStops.map((s, i) => (
          <button
            key={s}
            onClick={() => onChange(i)}
            className={cn(
              "w-[18%] text-center text-[11px] leading-tight transition sm:text-xs",
              i === value ? "font-semibold text-hella-green" : "text-black/50",
            )}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
