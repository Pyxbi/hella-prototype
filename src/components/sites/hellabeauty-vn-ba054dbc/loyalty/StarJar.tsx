"use client";

import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { StarIcon } from "@/components/sites/hellabeauty-vn-ba054dbc/shared/icons";

// predefined submerged-star spots (left%, bottom%) revealed as the fill rises
const STAR_SPOTS = [
  { l: 20, b: 8 }, { l: 55, b: 12 }, { l: 78, b: 9 }, { l: 36, b: 22 },
  { l: 64, b: 27 }, { l: 15, b: 34 }, { l: 48, b: 40 }, { l: 82, b: 37 },
  { l: 28, b: 52 }, { l: 60, b: 55 }, { l: 40, b: 67 }, { l: 72, b: 64 },
  { l: 22, b: 78 }, { l: 55, b: 82 }, { l: 84, b: 74 },
];

export function StarJar({
  fillPercent,
  color,
  dropping,
}: {
  fillPercent: number;
  color: string;
  dropping: boolean;
}) {
  return (
    <div className="relative mx-auto h-[300px] w-[260px]">
      {/* falling stars */}
      {dropping &&
        Array.from({ length: 10 }).map((_, i) => (
          <StarIcon
            key={i}
            className="hella-star-fall absolute top-0 z-20 h-5 w-5 text-[#e8c14a] drop-shadow"
            style={
              {
                left: `${28 + ((i * 37) % 45)}%`,
                "--fall": `${150 + ((i * 23) % 70)}px`,
                "--delay": `${i * 90}ms`,
              } as CSSProperties
            }
          />
        ))}

      {/* rim */}
      <div
        className="absolute left-1/2 top-5 h-7 w-[224px] -translate-x-1/2 rounded-[50%] border-2 bg-white/50"
        style={{ borderColor: `${color}66` }}
      />

      {/* body */}
      <div
        className="absolute inset-x-3 bottom-2 top-8 overflow-hidden rounded-b-[80px] rounded-t-3xl border-2 bg-white/40"
        style={{ borderColor: `${color}66` }}
      >
        {/* rising gold fill */}
        <div
          className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#e8c14a] via-[#f0cf6a] to-[#f7e39a] transition-[height] duration-[1400ms] ease-out"
          style={{ height: `${fillPercent}%` }}
        />
        {/* submerged stars */}
        {STAR_SPOTS.map((s, i) =>
          s.b <= fillPercent ? (
            <StarIcon
              key={i}
              className={cn(
                "absolute h-4 w-4 text-white/90",
                i % 3 === 0 && "hella-twinkle",
              )}
              style={{ left: `${s.l}%`, bottom: `${s.b}%` }}
            />
          ) : null,
        )}
        {/* glass sheen */}
        <div className="pointer-events-none absolute left-3 top-3 h-16 w-6 rounded-full bg-white/40 blur-[2px]" />
      </div>
    </div>
  );
}
