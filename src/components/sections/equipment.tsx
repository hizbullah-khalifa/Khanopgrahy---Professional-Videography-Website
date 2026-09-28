import {
  Aperture,
  Camera,
  Lightbulb,
  Mic,
  MonitorPlay,
  Move3d,
  Plane,
  type LucideIcon,
} from "lucide-react";
import { equipment, photos } from "@/data/site";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/primitives";
import { SmartImage } from "@/components/ui/smart-image";

const ICONS: Record<string, LucideIcon> = {
  camera: Camera,
  lenses: Aperture,
  aerial: Plane,
  support: Move3d,
  lighting: Lightbulb,
  post: MonitorPlay,
};

export function Equipment() {
  return (
    <section id="equipment" className="section-y relative border-t border-line">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={equipment.eyebrow}
            title={
              <>
                The kit behind
                <br />
                <span className="font-serif font-normal italic text-accent">
                  the frames.
                </span>
              </>
            }
            className="max-w-2xl"
          />
          <Reveal variant="up" delay={120}>
            <p className="max-w-sm text-[0.95rem] leading-relaxed text-muted">
              {equipment.description}
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {equipment.groups.map((group, index) => {
            const Icon = ICONS[group.id] ?? Camera;
            const photo = photos[index * 3]?.src ?? photos[0].src;
            const photoAlt = photos[index * 3]?.alt ?? photos[0].alt;
            return (
              <Reveal key={group.id} variant="up" delay={(index % 3) * 70}>
                <article
                  data-cursor="view"
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-[border-color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-accent/35"
                >
                  <div className="relative">
                    <SmartImage
                      src={photo}
                      alt={photoAlt}
                      ratio="16/9"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      zoom
                      className="rounded-t-2xl"
                      imgClassName="grayscale transition-[filter] duration-700 group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-surface via-surface/40 to-surface/10" />
                    <span className="absolute top-4 left-4 grid size-10 place-items-center rounded-full border border-line-strong bg-bg/70 text-ink backdrop-blur-md transition-[color,border-color] duration-500 group-hover:border-accent group-hover:text-accent">
                      <Icon className="size-4" strokeWidth={1.5} />
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-[1.05rem] font-medium tracking-[-0.02em]">
                        {group.title}
                      </h3>
                      <span className="font-mono text-[0.62rem] text-muted">
                        {String(group.items.length).padStart(2, "0")} items
                      </span>
                    </div>

                    <ul className="mt-4 flex flex-col">
                      {group.items.map((item) => (
                        <li
                          key={item.name}
                          className="flex flex-col gap-0.5 border-t border-line py-3 first:border-t-0 first:pt-0 last:pb-0"
                        >
                          <span className="text-[0.86rem] font-medium text-ink">
                            {item.name}
                          </span>
                          <span className="text-[0.75rem] text-muted">
                            {item.spec}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal variant="up">
          <p className="mt-8 flex flex-wrap items-center gap-2 text-[0.78rem] text-muted">
            <Mic className="size-3.5" strokeWidth={1.6} />
            Every shoot includes dual-system sound recording and a licensed drone
            operator on request.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
