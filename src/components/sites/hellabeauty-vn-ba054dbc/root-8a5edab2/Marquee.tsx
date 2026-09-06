interface MarqueeProps {
  text: string;
  /** seconds for one full loop */
  duration?: number;
}

// Infinite horizontal scrolling text (BeautiqueDisplay, uppercase).
export function Marquee({ text, duration = 30 }: MarqueeProps) {
  // Two identical groups so the -50% translate loops seamlessly.
  const group = (
    <span className="inline-flex">
      {Array.from({ length: 8 }).map((_, i) => (
        <span key={i} className="mx-6 inline-block">{`${text} -`}</span>
      ))}
    </span>
  );
  return (
    <div className="flex h-[120px] items-center overflow-hidden bg-white">
      <div
        className="hella-marquee-track font-heading text-2xl uppercase tracking-wide text-black sm:text-[28px]"
        style={{ animationDuration: `${duration}s` }}
      >
        {group}
        {group}
      </div>
    </div>
  );
}
