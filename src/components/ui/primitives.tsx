import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

/* -------------------------------------------------------------------------- */

export function Eyebrow({
  children,
  className,
  dot = true,
}: {
  children: ReactNode;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span className={cn("eyebrow", className)}>
      {dot && (
        <span aria-hidden className="relative flex size-1.5">
          <span className="absolute inset-0 rounded-full bg-accent animate-pulse-ring" />
          <span className="relative size-1.5 rounded-full bg-accent" />
        </span>
      )}
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------- */

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
  as?: "h1" | "h2" | "h3";
  children?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  titleClassName,
  as: Tag = "h2",
  children,
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        centered && "items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <Reveal variant="up">
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <div className={cn("flex flex-col gap-5", centered && "items-center")}>
        <Reveal variant="up" delay={60}>
          <Tag
            className={cn(
              "text-balance text-[clamp(2rem,5.2vw,3.9rem)] font-medium leading-[0.98]",
              titleClassName,
            )}
          >
            {title}
          </Tag>
        </Reveal>
        {description && (
          <Reveal variant="up" delay={120}>
            <p
              className={cn(
                "max-w-2xl text-[0.98rem] leading-relaxed text-muted sm:text-[1.05rem]",
                centered && "mx-auto",
              )}
            >
              {description}
            </p>
          </Reveal>
        )}
        {children}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

type ButtonVariant = "primary" | "ghost" | "outline" | "onMedia";
type ButtonSize = "sm" | "md" | "lg";

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-ink text-bg hover:bg-accent hover:text-accent-ink border border-transparent",
  outline:
    "border border-line-strong text-ink hover:border-accent hover:text-accent bg-transparent",
  ghost: "border border-transparent text-ink-soft hover:text-ink bg-transparent",
  // For controls that always sit on top of a dark cinematic image, in either
  // theme — a fixed light surface keeps the contrast predictable.
  onMedia:
    "bg-white text-[#0a0f1a] hover:bg-accent hover:text-accent-ink border border-transparent",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-[0.8rem]",
  md: "h-11 px-5 text-[0.85rem]",
  lg: "h-13 px-7 text-[0.9rem]",
};

export function buttonClass({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(
    "group/btn relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-[0.01em] whitespace-nowrap",
    "transition-[background-color,color,border-color,transform,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
    "hover:-translate-y-0.5 active:translate-y-0",
    "disabled:pointer-events-none disabled:opacity-50",
    VARIANTS[variant],
    SIZES[size],
    className,
  );
}

export function ActionLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className">) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");
  if (isExternal) {
    return (
      <a
        href={href}
        className={buttonClass({ variant, size, className })}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noreferrer noopener" }
          : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={buttonClass({ variant, size, className })} {...rest}>
      {children}
    </Link>
  );
}

/* -------------------------------------------------------------------------- */

export function Pill({
  children,
  className,
  tone = "default",
}: {
  children: ReactNode;
  className?: string;
  tone?: "default" | "accent" | "invert";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.16em]",
        tone === "default" && "border border-line-strong text-ink-soft",
        tone === "accent" && "border border-accent/40 text-accent",
        tone === "invert" && "bg-ink/85 text-bg backdrop-blur-sm",
        className,
      )}
    >
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------- */

export function PlayGlyph({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative grid size-14 place-items-center rounded-full border border-white/25 bg-white/10 backdrop-blur-md",
        "transition-[transform,background-color,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "group-hover:scale-110 group-hover:border-accent group-hover:bg-accent",
        className,
      )}
    >
      <span className="absolute inset-0 rounded-full border border-white/20 animate-pulse-ring" />
      <svg viewBox="0 0 24 24" className="relative ml-0.5 size-4 fill-white transition-colors duration-500 group-hover:fill-accent-ink">
        <path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l11.14-6.86a1 1 0 0 0 0-1.7L9.52 4.29A1 1 0 0 0 8 5.14Z" />
      </svg>
    </span>
  );
}

/* -------------------------------------------------------------------------- */

/** Seamless CSS marquee. Pauses on hover, disabled under reduced motion. */
export function Marquee({
  children,
  className,
  speed = 38,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) {
  return (
    <div
      className={cn("group relative flex overflow-hidden", className)}
      style={{ maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)" }}
    >
      <div
        className="flex w-max shrink-0 items-center gap-10 pr-10 group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={{ animation: `marquee ${speed}s linear infinite` }}
      >
        {children}
        <span aria-hidden className="contents">
          {children}
        </span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

export function Rule({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("h-px w-full bg-linear-to-r from-transparent via-line to-transparent", className)}
    />
  );
}
