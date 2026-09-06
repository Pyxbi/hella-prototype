"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const StarJarCanvas = dynamic(
  () => import("./StarJarCanvas").then((m) => m.StarJarCanvas),
  { ssr: false },
);

const INTRO_CAPACITY = 48;
const MAX_MS = 7000; // never trap the user behind the animation

export function LoyaltyIntro({ onDone }: { onDone: () => void }) {
  const [fading, setFading] = useState(false);
  const doneRef = useRef(false);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    setFading(true);
    setTimeout(onDone, 750);
  };

  useEffect(() => {
    const t = setTimeout(finish, MAX_MS);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="fixed inset-0 z-[70] flex flex-col overflow-hidden transition-opacity duration-700"
      style={{
        opacity: fading ? 0 : 1,
        background:
          "radial-gradient(120% 90% at 50% 8%, #fbf6ec 0%, #f3ead6 45%, #e9dcc0 100%)",
      }}
    >
      <div className="absolute inset-0">
        <StarJarCanvas
          variant="intro"
          resetKey={0}
          capacity={INTRO_CAPACITY}
          filled={INTRO_CAPACITY}
          onComplete={() => setTimeout(finish, 900)}
        />
      </div>

      <div className="pointer-events-none relative z-10 flex flex-col items-center gap-2 px-6 pt-14 text-center sm:pt-20">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-hella-green">
          Level Her Up
        </p>
        <h1 className="font-heading text-hella-green text-2xl leading-tight drop-shadow-sm sm:text-4xl">
          Đang đổ đầy hũ sao của bạn…
        </h1>
        <p className="max-w-xs text-xs text-black/50 sm:text-sm">
          Mỗi ngôi sao là một hành trình toả sáng cùng Hella ✦
        </p>
      </div>

      <button
        onClick={finish}
        className="pointer-events-auto absolute bottom-8 left-1/2 z-10 -translate-x-1/2 rounded-full border border-hella-green/40 bg-white/70 px-6 py-2.5 text-xs font-medium text-hella-green backdrop-blur transition hover:bg-white"
      >
        Bỏ qua ✦
      </button>
    </div>
  );
}
