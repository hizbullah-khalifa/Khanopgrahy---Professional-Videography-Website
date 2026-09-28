import {
  Camera,
  Clapperboard,
  Plane,
  Scissors,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { services } from "@/data/site";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading, buttonClass } from "@/components/ui/primitives";
import { SmartImage } from "@/components/ui/smart-image";

const ICONS: Record<string, LucideIcon> = {
  Clapperboard,
  Camera,
  Scissors,
  Plane,
  Sparkles,
};

export function Services() {
  return (
    <section id="services" className="section-y relative border-t border-line">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={services.eyebrow}
            title={
              <>
                One crew for
                <br />
                <span className="font-serif font-normal italic text-accent">
                  the whole story.
                </span>
              </>
            }
            className="max-w-2xl"
          />
          <Reveal variant="up" delay={140}>
            <p className="max-w-sm text-[0.95rem] leading-relaxed text-muted">
              {services.description}
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.items.map((service, index) => {
            const Icon = ICONS[service.icon] ?? Camera;
            return (
              <Reveal
                as="li"
                key={service.id}
                variant="up"
                delay={index * 70}
              >
                <article
                  data-cursor="view"
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-[border-color,transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-accent/35 hover:shadow-[0_28px_60px_-32px_rgba(0,0,0,0.6)]"
                >
                  <div className="relative overflow-hidden">
                    <SmartImage
                      src={service.image}
                      alt={`${service.title} — Khanography service`}
                      ratio="4/3"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      zoom
                      className="rounded-t-2xl"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-surface via-surface/25 to-transparent" />
                    <span className="absolute top-4 left-4 grid size-11 place-items-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-md transition-[background-color,color,transform] duration-500 group-hover:scale-105 group-hover:bg-accent group-hover:text-accent-ink">
                      <Icon className="size-[1.1rem]" strokeWidth={1.5} />
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col gap-4 p-6">
                    <h3 className="font-display text-xl font-medium tracking-[-0.03em]">
                      {service.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted">
                      {service.description}
                    </p>

                    <ul className="mt-1 flex flex-col gap-1.5">
                      {service.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-center gap-2 text-[0.78rem] text-ink-soft"
                        >
                          <span className="h-px w-3 bg-accent" />
                          {point}
                        </li>
                      ))}
                    </ul>

                    <a
                      href={service.href}
                      data-cursor="link"
                      className={buttonClass({
                        variant: "outline",
                        size: "sm",
                        className: "mt-2 w-full",
                      })}
                    >
                      Explore Work
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
