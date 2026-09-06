"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { SectionHeading } from "./SectionHeading";

interface ImageCarouselProps {
  subtitle: string;
  title: string;
  images: string[];
}

export function ImageCarousel({ subtitle, title, images }: ImageCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const step = () => {
    const el = trackRef.current;
    const card = el?.firstElementChild as HTMLElement | null;
    return card ? card.offsetWidth + 24 : 1;
  };

  const onScroll = () => {
    const el = trackRef.current;
    if (el) setActive(Math.round(el.scrollLeft / step()));
  };

  const goTo = (i: number) =>
    trackRef.current?.scrollTo({ left: i * step(), behavior: "smooth" });

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-12 lg:px-10 lg:py-16">
      <SectionHeading
        subtitle={subtitle}
        title={title}
        align="center"
        titleClassName="text-4xl sm:text-6xl"
      />

      <div
        ref={trackRef}
        onScroll={onScroll}
        className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((src) => (
          <div
            key={src}
            className="relative aspect-[3/4] w-[70%] shrink-0 snap-start overflow-hidden bg-[#f3efe8] sm:w-[calc((100%-72px)/4)] lg:w-[calc((100%-120px)/6)]"
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 640px) 70vw, (max-width: 1024px) 22vw, 15vw"
            />
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-center gap-3">
        {images.map((src, i) => (
          <button
            key={src}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
            className="hella-dot"
            data-active={i === active}
          />
        ))}
      </div>
    </section>
  );
}
