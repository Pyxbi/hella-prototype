"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";
import type { Product } from "./data";

interface ProductCarouselProps {
  subtitle: string;
  title: string;
  products: Product[];
  showDots?: boolean;
}

export function ProductCarousel({
  subtitle,
  title,
  products,
  showDots = false,
}: ProductCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    if (!card) return;
    const step = card.offsetWidth + 24; // gap-6
    setActive(Math.round(el.scrollLeft / step));
  };

  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    if (!card) return;
    const step = card.offsetWidth + 24;
    el.scrollTo({ left: i * step, behavior: "smooth" });
  };

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-10 lg:px-10 lg:py-14">
      <SectionHeading subtitle={subtitle} title={title} />

      <div
        ref={trackRef}
        onScroll={onScroll}
        className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((p) => (
          <Link
            key={p.title}
            href={p.href}
            className="group w-[78%] shrink-0 snap-start sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-72px)/4)]"
          >
            <div className="relative aspect-square w-full overflow-hidden bg-[#f3efe8]">
              <Image
                src={p.image}
                alt={p.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 78vw, (max-width: 1024px) 45vw, 22vw"
              />
            </div>
            <h3 className="mt-4 text-center text-sm leading-snug text-black transition-colors group-hover:text-hella-green">
              {p.title}
            </h3>
          </Link>
        ))}
      </div>

      {showDots && (
        <div className="mt-8 flex items-center justify-center gap-3">
          {products.map((p, i) => (
            <button
              key={p.title}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={cn("hella-dot")}
              data-active={i === active}
            />
          ))}
        </div>
      )}
    </section>
  );
}
