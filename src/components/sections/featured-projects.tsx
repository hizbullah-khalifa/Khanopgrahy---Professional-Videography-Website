import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { projects } from "@/data/site";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/primitives";
import { SmartImage } from "@/components/ui/smart-image";

export function FeaturedProjects() {
  const featured = projects.filter((project) => project.featured);

  return (
    <section id="work" className="section-y relative border-t border-line">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Featured Projects"
            title={
              <>
                Case studies,
                <br />
                <span className="font-serif font-normal italic text-accent">
                  not just clips.
                </span>
              </>
            }
            className="max-w-2xl"
          />
          <Reveal variant="up" delay={120}>
            <p className="max-w-sm text-[0.95rem] leading-relaxed text-muted">
              Every project below includes the thinking behind the frames — the
              brief, the approach and what changed because of it.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 flex flex-col gap-6">
          {featured.map((project, index) => (
            <Reveal key={project.slug} variant="up" delay={index * 80}>
              <Link
                href={`/work/${project.slug}`}
                data-cursor="link"
                className="group grid overflow-hidden rounded-2xl border border-line bg-surface transition-[border-color,transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-accent/35 hover:shadow-[0_34px_80px_-44px_rgba(0,0,0,0.8)] lg:grid-cols-2"
              >
                <div
                  data-over-media
                  className={`relative overflow-hidden ${
                    index % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <SmartImage
                    src={project.cover}
                    alt={project.coverAlt}
                    ratio="16/10"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    zoom
                    quality={90}
                    className="size-full"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/55 to-transparent" />
                  <span className="pointer-events-none absolute top-4 left-4 rounded-full bg-black/55 px-3 py-1 text-[0.62rem] font-medium tracking-[0.16em] text-white/85 uppercase backdrop-blur-sm">
                    {project.type}
                  </span>
                  <span className="pointer-events-none absolute right-4 bottom-4 flex items-center gap-1.5 text-[0.68rem] text-white/70">
                    <MapPin className="size-3" strokeWidth={1.6} />
                    {project.location}
                  </span>
                </div>

                <div className="flex flex-col justify-between gap-8 p-6 sm:p-9">
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-[0.68rem] tracking-[0.2em] text-muted uppercase">
                        {project.client}
                      </p>
                      <p className="font-mono text-[0.68rem] text-muted">
                        {project.date}
                      </p>
                    </div>
                    <h3 className="mt-4 font-display text-[clamp(1.4rem,3vw,2.1rem)] leading-[1.08] font-medium tracking-[-0.035em]">
                      {project.title}
                    </h3>
                    <p className="mt-4 max-w-md text-[0.9rem] leading-relaxed text-muted">
                      {project.summary}
                    </p>
                  </div>

                  <div className="flex flex-col gap-5">
                    <ul className="flex flex-wrap gap-1.5">
                      {project.services.map((service) => (
                        <li
                          key={service}
                          className="rounded-full border border-line px-2.5 py-0.5 text-[0.62rem] tracking-[0.12em] text-muted uppercase"
                        >
                          {service}
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center justify-between gap-4 border-t border-line pt-5">
                      <span className="inline-flex items-center gap-1.5 text-[0.82rem] font-medium">
                        View case study
                        <ArrowUpRight
                          className="size-4 text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          strokeWidth={1.6}
                        />
                      </span>
                      <dl className="flex gap-5">
                        {project.metrics.slice(0, 2).map((metric) => (
                          <div key={metric.label} className="text-right">
                            <dt className="text-[0.58rem] tracking-[0.14em] text-muted uppercase">
                              {metric.label}
                            </dt>
                            <dd className="font-display text-sm font-medium">
                              {metric.value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
