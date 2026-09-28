"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type RevealVariant = "up" | "scale" | "left" | "right" | "clip" | "bar";

type RevealProps = {
  children: ReactNode;
  /** Delay in ms — use for staggered lists. */
  delay?: number;
  variant?: RevealVariant;
  className?: string;
  as?: ElementType;
  /** How early (px below the viewport) the reveal fires. */
  margin?: string;
};

const VARIANT_ATTR: Record<RevealVariant, string> = {
  up: "up",
  scale: "scale",
  left: "left",
  right: "right",
  clip: "clip",
  bar: "bar",
};

/**
 * CSS-driven scroll reveal. Uses a single shared IntersectionObserver so a page
 * with 100+ reveals still costs one listener, and unobserves after firing.
 */
export function Reveal({
  children,
  delay = 0,
  variant = "up",
  className,
  as: Tag = "div",
  margin = "0px 0px -12% 0px",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.classList.add("is-revealed");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        }
      },
      // Fire slightly *after* the element is on screen so a scroll that stops
      // exactly at the fold still completes the reveal.
      { rootMargin: "0px 0px -2% 0px", threshold: 0.01 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [margin]);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      data-reveal={VARIANT_ATTR[variant]}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}
