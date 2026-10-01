import { BadgeCheck, MapPin } from "lucide-react";
import { intro } from "@/data/site";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/primitives";
import { SmartImage } from "@/components/ui/smart-image";
import { Counter } from "@/components/ui/counter";

export function Intro() {
  return (
    <section id="intro" className="section-y relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/4 -left-40 size-[34rem] rounded-full bg-accent/[0.05] blur-[120px]"
      />

      <div className="shell grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        {/* Portrait */}
        <Reveal variant="up" className="relative">
          <div className="relative">
            <div className="absolute -top-4 -left-4 hidden h-28 w-28 rounded-tl-2xl border-l border-t border-accent/40 sm:block" />
            <SmartImage
              src={intro.portrait}
              alt="Professional profile photograph of Talha Khan, videographer and drone operator"
              ratio="3/4"
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="rounded-2xl"
              quality={90}
            />
            <div className="absolute -right-3 -bottom-3 rounded-2xl border border-line glass px-4 py-3 sm:-right-6 sm:bottom-8">
              <p className="font-display text-sm font-medium">Talha Khan</p>
              <p className="mt-0.5 flex items-center gap-1.5 text-[0.68rem] tracking-[0.12em] text-muted uppercase">
                <MapPin className="size-3" strokeWidth={1.6} />
                {intro.details[0].value}
              </p>
            </div>
          </div>
        </Reveal>

        {/* Copy */}
        <div className="flex flex-col">
          <SectionHeading
            eyebrow={intro.eyebrow}
            title={
              <>
                A visual storyteller
                <br />
                <span className="font-serif font-normal italic text-accent">
                  behind the lens.
                </span>
              </>
            }
            className="max-w-2xl"
          />

          <Reveal variant="up" delay={120}>
            <p className="mt-7 max-w-xl text-[0.98rem] leading-relaxed text-muted sm:text-[1.05rem]">
              {intro.bio}
            </p>
          </Reveal>
          <Reveal variant="up" delay={180}>
            <p className="mt-4 max-w-xl text-[0.98rem] leading-relaxed text-muted sm:text-[1.05rem]">
              {intro.bioSecondary}
            </p>
          </Reveal>

          <Reveal variant="up" delay={220}>
            <dl className="mt-9 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-line py-6 sm:grid-cols-4">
              {intro.details.map((detail) => (
                <div key={detail.label} className="flex flex-col gap-1.5">
                  <dt className="text-[0.65rem] tracking-[0.16em] text-muted uppercase">
                    {detail.label}
                  </dt>
                  <dd className="text-sm font-medium text-ink">{detail.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal variant="up" delay={260}>
            <ul className="mt-7 flex flex-wrap gap-2">
              {intro.specialties.map((specialty) => (
                <li
                  key={specialty}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-[0.72rem] text-ink-soft transition-colors duration-300 hover:border-accent/50 hover:text-accent"
                >
                  <BadgeCheck className="size-3" strokeWidth={1.6} />
                  {specialty}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal variant="up" delay={300}>
            <dl className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {intro.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-display text-[clamp(1.7rem,3.6vw,2.5rem)] leading-none font-medium tracking-[-0.045em]">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </dd>
                  <p className="text-[0.66rem] tracking-[0.16em] text-muted uppercase">
                    {stat.label}
                  </p>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
