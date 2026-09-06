"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@/components/sites/hellabeauty-vn-ba054dbc/shared/icons";

interface BannerCarouselProps {
  slides: string[];
  heightClass?: string;
  autoplay?: boolean;
  controls?: "sides" | "bottom-left";
  priority?: boolean;
}

// Full-bleed image slideshow with ‹ › arrows (Swiper-style).
export function BannerCarousel({
  slides,
  heightClass = "h-[380px] sm:h-[520px] lg:h-[600px]",
  autoplay = true,
  controls = "sides",
  priority = false,
}: BannerCarouselProps) {
  const [index, setIndex] = useState(0);
  const count = slides.length;

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + count) % count),
    [count],
  );

  useEffect(() => {
    if (!autoplay || count < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 5000);
    return () => clearInterval(id);
  }, [autoplay, count]);

  return (
    <section className={cn("relative w-full overflow-hidden", heightClass)}>
      {slides.map((src, i) => (
        <div
          key={src}
          className={cn(
            "absolute inset-0 transition-opacity duration-700 ease-in-out",
            i === index ? "opacity-100" : "opacity-0",
          )}
          aria-hidden={i !== index}
        >
          <Image
            src={src}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority={priority && i === 0}
          />
        </div>
      ))}

      {count > 1 && controls === "sides" && (
        <>
          <button
            aria-label="Previous slide"
            onClick={() => go(-1)}
            className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-black/80 transition hover:text-black sm:left-8"
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
          <button
            aria-label="Next slide"
            onClick={() => go(1)}
            className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-black/80 transition hover:text-black sm:right-8"
          >
            <ArrowRightIcon className="h-6 w-6" />
          </button>
        </>
      )}

      {count > 1 && controls === "bottom-left" && (
        <div className="absolute bottom-6 left-6 z-10 flex items-center gap-4 sm:left-14">
          <button
            aria-label="Previous slide"
            onClick={() => go(-1)}
            className="text-black/80 transition hover:text-black"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <span className="font-heading text-sm text-black/80">
            {index + 1} / {count}
          </span>
          <button
            aria-label="Next slide"
            onClick={() => go(1)}
            className="text-black/80 transition hover:text-black"
          >
            <ArrowRightIcon className="h-5 w-5" />
          </button>
        </div>
      )}
    </section>
  );
}
