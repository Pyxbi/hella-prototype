"use client";

import { useEffect, useState } from "react";
import { announcements } from "./data";

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const count = announcements.length;

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 4000);
    return () => clearInterval(id);
  }, [count]);

  const prev = () => setIndex((i) => (i - 1 + count) % count);
  const next = () => setIndex((i) => (i + 1) % count);

  return (
    <section className="relative flex h-11 items-center justify-center bg-white px-10 text-black">
      <button
        aria-label="Previous"
        onClick={prev}
        className="absolute left-4 text-lg leading-none text-black/70 transition hover:text-black sm:left-8"
      >
        ‹
      </button>
      <p className="truncate text-center text-[13px] sm:text-sm">
        {announcements[index]}
      </p>
      <button
        aria-label="Next"
        onClick={next}
        className="absolute right-4 text-lg leading-none text-black/70 transition hover:text-black sm:right-8"
      >
        ›
      </button>
    </section>
  );
}
