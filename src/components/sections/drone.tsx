import Image from "next/image";
import { drone } from "@/data/site";
import { Reveal } from "@/components/ui/reveal";
import { Counter } from "@/components/ui/counter";
import { SectionHeading } from "@/components/ui/primitives";
import { Parallax } from "@/components/ui/parallax";

export function Drone() {
  return (
    <section id="drone" className="relative border-t border-line">
      {/* Full-bleed cinematic aerial */}
      <div
        data-over-media
        className="grain relative isolate flex min-h-[86svh] items-end overflow-hidden"
      >
        <Parallax amount={9} className="absolute inset-0 -z-10">
          <div className="relative size-full">
            <Image
              src={drone.hero}
              alt={drone.heroAlt}
              fill
              preload
              fetchPriority="high"
              sizes="100vw"
              quality={90}
              className="object-cover"
            />
          </div>
        </Parallax>
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-black/70 via-black/35 to-black/88" />

        <div className="shell w-full pt-24 pb-14">
          <SectionHeading
            eyebrow={drone.eyebrow}
            title={
              <>
                See the World
                <br />
                <span className="font-serif font-normal italic text-accent-soft">
                  From Above.
                </span>
              </>
            }
            description={drone.description}
            titleClassName="text-white"
          />

          <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-white/12 pt-7">
            {drone.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1.5">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-[clamp(1.8rem,5vw,3.2rem)] leading-none font-medium tracking-[-0.045em] text-white">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </dd>
                <p className="text-[0.64rem] tracking-[0.16em] text-white/50 uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Capabilities + gallery */}
      <div className="section-y">
        <div className="shell">
          <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {drone.capabilities.map((capability, index) => (
              <Reveal
                as="li"
                key={capability.title}
                variant="up"
                delay={index * 70}
                className="bg-bg"
              >
                <div className="group h-full bg-bg p-6 transition-colors duration-500 hover:bg-surface">
                  <span className="font-mono text-[0.62rem] text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-[1.02rem] font-medium tracking-[-0.02em]">
                    {capability.title}
                  </h3>
                  <p className="mt-2 text-[0.82rem] leading-relaxed text-muted">
                    {capability.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {drone.gallery.map((shot, index) => (
              <Reveal
                key={shot.id}
                variant="scale"
                delay={index * 60}
                className={index === 0 || index === 5 ? "sm:col-span-2 lg:col-span-1" : undefined}
              >
                <figure
                  data-cursor="view"
                  className="group relative overflow-hidden rounded-2xl border border-line"
                >
                  <div
                    data-over-media
                    className="relative overflow-hidden"
                    style={{
                      aspectRatio: index === 0 || index === 5 ? "16/10" : "4/5",
                    }}
                  >
                    <Parallax amount={index % 2 === 0 ? 7 : 4} className="absolute inset-0">
                      <Image
                        src={shot.src}
                        alt={shot.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        quality={75}
                        loading="lazy"
                        decoding="async"
                        className="scale-[1.14] object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.24]"
                      />
                    </Parallax>
                    <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
                    <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 p-5">
                      <p className="text-sm font-medium text-white">{shot.title}</p>
                      <p className="mt-0.5 text-[0.62rem] tracking-[0.18em] text-white/55 uppercase">
                        Aerial · 4K
                      </p>
                    </figcaption>
                  </div>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
