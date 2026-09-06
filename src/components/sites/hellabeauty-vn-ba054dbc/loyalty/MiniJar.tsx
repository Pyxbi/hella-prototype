/**
 * A small mason-jar silhouette with a gold star-fill level, for the tier cards.
 * fillPercent 0..100 controls how high the stars rise inside the body.
 */
export function MiniJar({
  fillPercent,
  className,
}: {
  fillPercent: number;
  className?: string;
}) {
  const uid = Math.round(fillPercent * 100);
  const clipTop = 30; // top of fillable body (y)
  const clipBottom = 92; // bottom of body (y)
  const level = clipBottom - (Math.min(100, Math.max(0, fillPercent)) / 100) * (clipBottom - clipTop);

  // body outline: straight sides, rounded shoulder into a short neck
  const body = "M18 30 Q18 20 30 18 L50 18 Q62 20 62 30 L62 86 Q62 94 54 94 L26 94 Q18 94 18 86 Z";

  return (
    <svg viewBox="0 0 80 104" className={className} aria-hidden>
      <defs>
        <clipPath id={`jarbody-${uid}`}>
          <path d={body} />
        </clipPath>
        <linearGradient id={`goldfill-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f7e6b5" />
          <stop offset="100%" stopColor="#e0b352" />
        </linearGradient>
        <linearGradient id={`glass-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#c8d8dc" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      {/* lid / rim */}
      <rect x="26" y="8" width="28" height="9" rx="2" fill="#e8c46a" />
      <rect x="23" y="14" width="34" height="7" rx="2.5" fill="#d9b458" />

      {/* gold star fill */}
      <g clipPath={`url(#jarbody-${uid})`}>
        <rect
          x="16"
          y={level}
          width="48"
          height={clipBottom - level + 4}
          fill={`url(#goldfill-${uid})`}
        />
        {/* little embedded stars near the surface */}
        {fillPercent > 6 && (
          <>
            <Star cx={30} cy={level + 8} r={3} />
            <Star cx={44} cy={level + 5} r={2.4} />
            <Star cx={52} cy={level + 11} r={2.8} />
          </>
        )}
      </g>

      {/* glass body + highlight */}
      <path d={body} fill={`url(#glass-${uid})`} />
      <path d={body} fill="none" stroke="#8aa39a" strokeOpacity="0.5" strokeWidth="2" />
      <path
        d="M24 28 L24 84"
        stroke="#ffffff"
        strokeOpacity="0.7"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Star({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const rad = i % 2 === 0 ? r : r * 0.45;
    const a = (i * Math.PI) / 5 - Math.PI / 2;
    pts.push(`${cx + Math.cos(a) * rad},${cy + Math.sin(a) * rad}`);
  }
  return <polygon points={pts.join(" ")} fill="#fff6d8" opacity="0.85" />;
}
