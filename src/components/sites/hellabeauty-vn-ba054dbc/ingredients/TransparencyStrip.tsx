import { philosophy, trustBadges } from "./ingredientsData";

export function TransparencyStrip() {
  return (
    <section className="bg-[#f6f1e7] py-14 lg:py-16">
      <div className="mx-auto max-w-[1000px] px-5 text-center">
        <p className="font-heading text-sm italic text-black/70 sm:text-base">
          Cam kết minh bạch
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-black/80 sm:text-lg">
          {philosophy}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {trustBadges.map((b) => (
            <span
              key={b}
              className="rounded-full border border-hella-green px-4 py-2 text-xs font-medium text-hella-green sm:text-sm"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
