"use client";

import dynamic from "next/dynamic";

const StarJarCanvas = dynamic(
  () => import("./StarJarCanvas").then((m) => m.StarJarCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center text-xs text-black/30">
        Đang tải hũ sao…
      </div>
    ),
  },
);

const HERO_CAPACITY = 66;

/** Embedded, interactive jar. `stars` is 0..100; `resetKey` rebuilds on tier change. */
export function HeroJar3D({
  stars,
  resetKey,
}: {
  stars: number;
  resetKey: number;
}) {
  const filled = Math.round((Math.min(100, stars) / 100) * HERO_CAPACITY);
  return (
    <div className="mx-auto h-[360px] w-full max-w-[520px] sm:h-[440px]">
      <StarJarCanvas
        variant="hero"
        resetKey={resetKey}
        capacity={HERO_CAPACITY}
        filled={filled}
        startResting
      />
    </div>
  );
}
