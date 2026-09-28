import Link from "next/link";
import { ArrowDown, ArrowUpRight, Play } from "lucide-react";
import { hero, site } from "@/data/site";
import { ActionLink, Eyebrow } from "@/components/ui/primitives";
import { Counter } from "@/components/ui/counter";
import { HeroMedia } from "./hero-media";

/** Splits a line into words so each can be revealed in sequence. */
function RevealLine({
  text,
  delay,
  className,
}: {
  text: string;
  delay: number;
  className?: string;
}) {
  return (
    <span className={className} style={{ display: "block" }}>
      {text.split(" ").map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="animate-rise inline-block will-change-transform"
          style={{ "--delay": `${delay + index * 70}ms` } as React.CSSProperties}
        >
          {word}
          {index < text.split(" ").length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      data-over-media
      className="grain relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden pt-24 pb-8 sm:pt-28"
    >
      {/* Cinematic background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <HeroMedia
          poster={hero.background}
          posterAlt="Cinematic mountain landscape at sunrise shot on location"
          video={hero.video}
          className="animate-veil absolute inset-0"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/72 via-black/25 to-black/85" />
        <div
          className="absolute inset-0"
          style={{ background: "var(--overlay)" }}
        />
      </div>

      <div className="shell relative w-full">
        <div className="max-w-4xl">
          <div className="animate-rise" style={{ "--delay": "80ms" } as React.CSSProperties}>
            <Eyebrow className="text-white/70">{hero.eyebrow}</Eyebrow>
          </div>

          <h1 className="mt-6 text-[clamp(2.6rem,8.4vw,6.4rem)] leading-[0.9] font-medium tracking-[-0.045em] text-white">
            <RevealLine text={hero.title[0]} delay={160} />
            <RevealLine
              text={hero.title[1]}
              delay={420}
              className="font-serif text-[1.02em] font-normal italic text-accent-soft"
            />
          </h1>

          <p
            className="animate-rise mt-7 max-w-2xl text-[0.98rem] leading-relaxed text-white/72 sm:text-[1.08rem]"
            style={{ "--delay": "760ms" } as React.CSSProperties}
          >
            {hero.description}
          </p>

          <div
            className="animate-rise mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ "--delay": "880ms" } as React.CSSProperties}
          >
            <ActionLink
              href={hero.primaryCta.href}
              size="lg"
              variant="onMedia"
              className="group"
            >
              <Play className="size-3.5 fill-current" strokeWidth={0} />
              {hero.primaryCta.label}
            </ActionLink>
            <ActionLink
              href={hero.secondaryCta.href}
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:border-accent hover:text-accent"
            >
              {hero.secondaryCta.label}
              <ArrowUpRight
                className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                strokeWidth={1.6}
              />
            </ActionLink>
          </div>
        </div>

        {/* Hero stats strip */}
        <dl
          className="animate-rise mt-14 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-white/12 pt-7 sm:mt-16 lg:grid-cols-4"
          style={{ "--delay": "1020ms" } as React.CSSProperties}
        >
          {hero.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-display text-[clamp(1.6rem,3.4vw,2.4rem)] leading-none font-medium tracking-[-0.04em] text-white">
                <Counter value={stat.value} suffix={stat.suffix} />
              </dd>
              <p className="text-[0.68rem] tracking-[0.16em] text-white/50 uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </dl>
      </div>

      {/* Scroll indicator */}
      <div
        className="animate-rise shell relative mt-10 flex items-center justify-between gap-4 border-t border-white/10 pt-5"
        style={{ "--delay": "1200ms" } as React.CSSProperties}
      >
        <Link
          href="#intro"
          className="group inline-flex items-center gap-3 text-[0.7rem] tracking-[0.2em] text-white/60 uppercase transition-colors hover:text-white"
        >
          <span className="relative grid size-8 place-items-center overflow-hidden rounded-full border border-white/25">
            <ArrowDown
              className="size-3.5 animate-scroll-hint"
              strokeWidth={1.6}
            />
          </span>
          {hero.scrollHint}
        </Link>

        <p className="hidden items-center gap-6 text-[0.7rem] tracking-[0.18em] text-white/45 uppercase sm:flex">
          <span>{site.location}</span>
          <span className="h-3 w-px bg-white/20" />
          <span>{site.roleLine.split(" • ")[0]}</span>
        </p>
      </div>
    </section>
  );
}
