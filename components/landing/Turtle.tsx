/**
 * WildNest mascot — small green turtle for brand resemblance.
 * Geometric, Bauhaus-friendly SVG. Use at bottom of front page.
 */
export function Turtle({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {/* Shell — rounded hexagon / oval */}
      <ellipse cx="32" cy="28" rx="22" ry="14" fill="var(--bauhaus-green)" />
      <ellipse cx="32" cy="26" rx="18" ry="11" fill="var(--bauhaus-green-light)" opacity={0.6} />
      {/* Head */}
      <circle cx="32" cy="8" r="6" fill="var(--bauhaus-green)" />
      <circle cx="32" cy="7" r="4" fill="var(--bauhaus-green-light)" />
      {/* Eyes */}
      <circle cx="30" cy="6" r="1.2" fill="var(--bauhaus-neutral)" />
      <circle cx="34" cy="6" r="1.2" fill="var(--bauhaus-neutral)" />
      {/* Legs — simple rectangles */}
      <rect x="12" y="36" width="6" height="4" rx="1" fill="var(--bauhaus-green-dark)" />
      <rect x="46" y="36" width="6" height="4" rx="1" fill="var(--bauhaus-green-dark)" />
      <rect x="18" y="38" width="5" height="3" rx="1" fill="var(--bauhaus-green-dark)" />
      <rect x="41" y="38" width="5" height="3" rx="1" fill="var(--bauhaus-green-dark)" />
      {/* Tail */}
      <path
        d="M32 40 L28 44 L32 42 L36 44 Z"
        fill="var(--bauhaus-green-dark)"
      />
    </svg>
  );
}
