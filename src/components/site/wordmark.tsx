/**
 * Brand mark: an aperture / lens iris built from a single gradient shape.
 * Replace with an SVG logo file if you have one.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      aria-hidden
      focusable="false"
    >
      <defs>
        <linearGradient id="khanography-mark" x1="0" y1="0" x2="32" y2="32">
          <stop offset="0%" stopColor="var(--accent-soft)" />
          <stop offset="100%" stopColor="var(--accent)" />
        </linearGradient>
      </defs>
      <rect
        x="1"
        y="1"
        width="30"
        height="30"
        rx="9"
        stroke="url(#khanography-mark)"
        strokeWidth="1.5"
      />
      <path
        d="M11 10.5v11l9.5-5.5-9.5-5.5Z"
        fill="url(#khanography-mark)"
      />
    </svg>
  );
}
