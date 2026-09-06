"use client";

import { useEffect, useState, type CSSProperties } from "react";

type Mode = "full" | "light";

const GOLDS = ["#e8c46a", "#d9a441", "#f0cf7e", "#e0b352", "#f4d488", "#caa23c"];

type RainStar = {
  id: number;
  left: number;
  size: number;
  drift: number;
  delay: number;
  dur: number;
  spin: number;
  color: string;
};

type PopStar = {
  id: number;
  size: number;
  bx: number;
  by: number;
  delay: number;
  dur: number;
  spin: number;
  color: string;
};

function GoldStar({ size, color }: { size: number; color: string }) {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? 10 : 4.4;
    const a = (i * Math.PI) / 5 - Math.PI / 2;
    pts.push(`${10 + Math.cos(a) * r},${10 + Math.sin(a) * r}`);
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      style={{ filter: "drop-shadow(0 2px 3px rgba(140,100,20,0.5))" }}
      aria-hidden
    >
      <polygon
        points={pts.join(" ")}
        fill={color}
        stroke="#a9791f"
        strokeOpacity={0.55}
        strokeWidth={0.5}
      />
    </svg>
  );
}

/**
 * A one-shot celebratory overlay: gold stars rain down over the whole page
 * (navbar included) and, in "full" mode, burst outward from the jar mouth.
 * Auto-dismisses via onDone once the animation has played. The random layout
 * is built in an effect (kept out of render, which must stay pure).
 */
export function StarBurst({
  mode = "full",
  onDone,
}: {
  mode?: Mode;
  onDone: () => void;
}) {
  const [stars, setStars] = useState<{ rain: RainStar[]; pops: PopStar[] }>({
    rain: [],
    pops: [],
  });

  useEffect(() => {
    const isFull = mode === "full";
    const rainCount = isFull ? 90 : 30;
    const popCount = isFull ? 24 : 0;

    const rain: RainStar[] = Array.from({ length: rainCount }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: (isFull ? 20 : 15) + Math.random() * (isFull ? 30 : 18),
      drift: (Math.random() - 0.5) * 26,
      delay: Math.random() * (isFull ? 900 : 320),
      dur: (isFull ? 1900 : 1300) + Math.random() * 1300,
      spin: (Math.random() - 0.5) * 900,
      color: GOLDS[i % GOLDS.length],
    }));

    const pops: PopStar[] = Array.from({ length: popCount }, (_, i) => {
      const angle = (i / Math.max(1, popCount)) * Math.PI * 2 + Math.random();
      const dist = 18 + Math.random() * 26;
      return {
        id: i,
        size: 18 + Math.random() * 20,
        bx: Math.cos(angle) * dist,
        by: Math.sin(angle) * dist - 6, // bias slightly upward out of the mouth
        delay: Math.random() * 180,
        dur: 900 + Math.random() * 700,
        spin: (Math.random() - 0.5) * 720,
        color: GOLDS[i % GOLDS.length],
      };
    });

    setStars({ rain, pops });

    const t = setTimeout(onDone, isFull ? 4300 : 2100);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[80] overflow-hidden">
      {/* rain from the top of the page, over the navbar */}
      {stars.rain.map((s) => (
        <span
          key={`r${s.id}`}
          className="hella-star-rain absolute top-0"
          style={
            {
              left: `${s.left}vw`,
              animationDelay: `${s.delay}ms`,
              animationDuration: `${s.dur}ms`,
              "--drift": `${s.drift}vw`,
              "--spin": `${s.spin}deg`,
            } as CSSProperties
          }
        >
          <GoldStar size={s.size} color={s.color} />
        </span>
      ))}

      {/* burst out of the jar mouth (approx. centre of the hero jar) */}
      {stars.pops.map((s) => (
        <span
          key={`p${s.id}`}
          className="hella-star-pop absolute"
          style={
            {
              left: "50%",
              top: "52%",
              animationDelay: `${s.delay}ms`,
              animationDuration: `${s.dur}ms`,
              "--bx": `${s.bx}vw`,
              "--by": `${s.by}vh`,
              "--spin": `${s.spin}deg`,
            } as CSSProperties
          }
        >
          <GoldStar size={s.size} color={s.color} />
        </span>
      ))}
    </div>
  );
}
