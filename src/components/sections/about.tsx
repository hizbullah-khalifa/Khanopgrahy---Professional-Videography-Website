import { Quote } from "lucide-react";
import { about, site } from "@/data/site";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/primitives";
import { SmartImage } from "@/components/ui/smart-image";

export function About() {
  return (
    <section id="about" className="section-y relative border-t border-line">
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 right-0 size-[30rem] rounded-full bg-accent/[0.045] blur-[130px]"
      />

      <div className="shell relative grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        {/* Portraits */}
        <Reveal variant="up" className="relative">
          <div className="relative">
            <SmartImage
              src={about.portrait}
              alt="Portrait of Talha Khan, videographer and photographer"
              ratio="4/5"
              sizes="(max-width: 1024px) 100vw, 38vw"
              quality={90}
              className="rounded-2xl"
            />
            <Reveal
              variant="scale"
              delay={140}
              className="absolute -right-4 -bottom-10 w-[46%] sm:-right-8 sm:w-[42%]"
            >
              <SmartImage
                src={about.portraitSecondary}
                alt="Talha Khan operating a cinema camera on location"
                ratio="4/5"
                sizes="(max-width: 1024px) 45vw, 20vw"
                className="rounded-2xl border-4 border-bg shadow-2xl"
              />
            </Reveal>
          </div>

          <Reveal variant="up" delay={200}>
            <dl className="mt-14 grid grid-cols-2 gap-4 sm:max-w-sm sm:pr-10">
              {about.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex flex-col gap-1 border-t border-line pt-3"
                >
                  <dt className="text-[0.62rem] tracking-[0.16em] text-muted uppercase">
                    {fact.label}
                  </dt>
                  <dd className="text-[0.85rem] text-ink">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Reveal>

        {/* Story */}
        <div>
          <SectionHeading
            eyebrow={about.eyebrow}
            title={
              <>
                Behind Every Frame
                <br />
                <span className="font-serif font-normal italic text-accent">
                  Is a Story.
                </span>
              </>
            }
          />

          <div className="mt-7 flex flex-col gap-4">
            {about.paragraphs.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 24)} variant="up" delay={index * 70}>
                <p className="max-w-xl text-[0.98rem] leading-relaxed text-muted sm:text-[1.02rem]">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          {/* Philosophy */}
          <Reveal variant="up" delay={120}>
            <blockquote className="relative mt-9 rounded-2xl border border-line bg-surface p-6 sm:p-7">
              <Quote
                aria-hidden
                className="absolute top-5 right-5 size-8 text-accent/25"
                strokeWidth={1.2}
              />
              <p className="max-w-lg font-display text-[clamp(1.05rem,2.2vw,1.35rem)] leading-[1.4] tracking-[-0.02em] text-balance">
                {about.philosophy}
              </p>
              <footer className="mt-4 text-[0.68rem] tracking-[0.18em] text-muted uppercase">
                {site.name} · Creative philosophy
              </footer>
            </blockquote>
          </Reveal>

          {/* Skills */}
          <Reveal variant="up" delay={80}>
            <h3 className="mt-11 text-[0.68rem] font-medium tracking-[0.2em] text-muted uppercase">
              Skill set
            </h3>
          </Reveal>
          <ul className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {about.skills.map((skill, index) => (
              <Reveal
                as="li"
                key={skill.name}
                variant="bar"
                delay={index * 70}
                className="flex flex-col gap-2"
              >
                <div className="flex items-baseline justify-between gap-3 text-[0.82rem]">
                  <span>{skill.name}</span>
                  <span className="font-mono text-[0.7rem] text-muted">
                    {skill.level}%
                  </span>
                </div>
                <div
                  className="h-px w-full bg-line"
                  style={{ "--value": skill.level / 100 } as React.CSSProperties}
                >
                  <div className="bar-fill h-px w-full origin-left bg-accent" />
                </div>
              </Reveal>
            ))}
          </ul>

          {/* Experience */}
          <Reveal variant="up" delay={80}>
            <h3 className="mt-12 text-[0.68rem] font-medium tracking-[0.2em] text-muted uppercase">
              Experience
            </h3>
          </Reveal>
          <ol className="mt-5 flex flex-col">
            {about.experience.map((item, index) => (
              <Reveal
                as="li"
                key={item.period}
                variant="up"
                delay={index * 60}
                className="grid gap-1 border-t border-line py-4 sm:grid-cols-[9rem_1fr] sm:gap-6"
              >
                <span className="font-mono text-[0.7rem] text-muted">
                  {item.period}
                </span>
                <span className="flex flex-col gap-1">
                  <span className="text-[0.92rem] font-medium">{item.role}</span>
                  <span className="text-[0.8rem] text-accent">{item.place}</span>
                  <span className="text-[0.82rem] leading-relaxed text-muted">
                    {item.note}
                  </span>
                </span>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
