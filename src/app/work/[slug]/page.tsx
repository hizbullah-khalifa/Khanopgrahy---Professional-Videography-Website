import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Calendar, MapPin } from "lucide-react";
import { getProject, projects, site } from "@/data/site";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow, Rule, buttonClass } from "@/components/ui/primitives";
import { SmartImage } from "@/components/ui/smart-image";

type Params = { slug: string };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };

  return {
    title: `${project.title} — ${project.client}`,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      title: `${project.title} — ${project.client}`,
      description: project.summary,
      url: `/work/${project.slug}`,
      images: [{ url: project.cover, alt: project.coverAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — ${project.client}`,
      description: project.summary,
      images: [project.cover],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((entry) => entry.slug === slug);
  const next = projects[(index + 1) % projects.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    image: project.cover,
    dateCreated: project.date,
    creator: { "@id": `${site.url}/#person` },
    about: project.services,
    locationCreated: project.location,
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Cover */}
      <header
        data-over-media
        className="grain relative isolate flex min-h-[78svh] items-end overflow-hidden pt-28 pb-12"
      >
        <div className="absolute inset-0 -z-10">
          <SmartImage
            src={project.cover}
            alt={project.coverAlt}
            ratio="16/9"
            sizes="100vw"
            eager
            quality={90}
            className="absolute inset-0 size-full"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/75 via-black/35 to-black/90" />
        </div>

        <div className="shell w-full">
          <Link
            href="/#work"
            className="group mb-8 flex w-fit items-center gap-2 text-[0.72rem] tracking-[0.16em] text-white/60 uppercase transition-colors hover:text-white"
          >
            <ArrowLeft
              className="size-3.5 transition-transform duration-300 group-hover:-translate-x-1"
              strokeWidth={1.7}
            />
            All projects
          </Link>

          <Eyebrow className="text-white/70">{project.type}</Eyebrow>
          <h1 className="mt-4 max-w-4xl text-[clamp(2.2rem,6.4vw,5rem)] leading-[0.95] font-medium tracking-[-0.04em] text-white">
            {project.title}
          </h1>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.78rem] text-white/65">
            <span className="flex items-center gap-2">
              <span className="text-white/40">Client</span>
              {project.client}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="size-3.5" strokeWidth={1.6} />
              {project.location}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="size-3.5" strokeWidth={1.6} />
              {project.date}
            </span>
          </div>
        </div>
      </header>

      {/* Meta + narrative */}
      <section className="section-y">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-20">
          <div className="flex flex-col gap-10">
            {[
              { label: "The brief", body: project.challenge },
              { label: "The approach", body: project.approach },
              { label: "The outcome", body: project.outcome },
            ].map((block, blockIndex) => (
              <Reveal key={block.label} variant="up" delay={blockIndex * 70}>
                <div className="flex flex-col gap-3">
                  <h2 className="text-[0.68rem] font-medium tracking-[0.2em] text-accent uppercase">
                    {block.label}
                  </h2>
                  <p className="max-w-2xl text-[1rem] leading-relaxed text-ink-soft sm:text-[1.08rem]">
                    {block.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal variant="up" delay={120}>
            <aside className="flex flex-col gap-8 lg:sticky lg:top-24">
              <div>
                <h2 className="text-[0.68rem] font-medium tracking-[0.2em] text-muted uppercase">
                  Services
                </h2>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {project.services.map((service) => (
                    <li
                      key={service}
                      className="rounded-full border border-line px-3 py-1 text-[0.68rem] tracking-[0.1em] text-ink-soft uppercase"
                    >
                      {service}
                    </li>
                  ))}
                </ul>
              </div>

              <Rule />

              <dl className="grid grid-cols-3 gap-4 lg:grid-cols-1">
                {project.metrics.map((metric) => (
                  <div key={metric.label} className="flex flex-col gap-1">
                    <dt className="text-[0.6rem] tracking-[0.16em] text-muted uppercase">
                      {metric.label}
                    </dt>
                    <dd className="font-display text-xl font-medium tracking-[-0.03em]">
                      {metric.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <Rule />

              <a
                href="#contact"
                className={buttonClass({ variant: "primary", size: "md" })}
              >
                Start a similar project
                <ArrowUpRight className="size-4" strokeWidth={1.6} />
              </a>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* Gallery */}
      <section className="pb-24">
        <div className="shell">
          <div className="grid gap-4 sm:grid-cols-2">
            {project.gallery.map((image, imageIndex) => (
              <Reveal
                key={image.src}
                variant={imageIndex === 0 ? "clip" : "scale"}
                delay={imageIndex * 60}
                className={imageIndex === 0 ? "sm:col-span-2" : undefined}
              >
                <figure
                  data-cursor="view"
                  className="group relative overflow-hidden rounded-2xl border border-line"
                >
                  <SmartImage
                    src={image.src}
                    alt={image.alt}
                    ratio={imageIndex === 0 ? "21/9" : "4/3"}
                    sizes="(max-width: 640px) 100vw, 50vw"
                    zoom
                    quality={90}
                  />
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Next project */}
      <section className="border-t border-line">
        <Link
          href={`/work/${next.slug}`}
          data-cursor="link"
          data-over-media
          className="group relative block overflow-hidden"
        >
          <div className="relative">
            <SmartImage
              src={next.cover}
              alt={next.coverAlt}
              ratio="21/9"
              sizes="100vw"
              zoom
              quality={90}
              className="opacity-45"
            />
            <div className="absolute inset-0 bg-linear-to-b from-bg/85 via-bg/55 to-bg/90" />
          </div>

          <div className="shell absolute inset-0 flex flex-col items-start justify-center gap-4">
            <span className="text-[0.68rem] tracking-[0.2em] text-muted uppercase">
              Next project
            </span>
            <span className="flex items-center gap-3 font-display text-[clamp(1.5rem,4.4vw,2.8rem)] leading-tight font-medium tracking-[-0.035em]">
              {next.title}
              <ArrowRight
                className="size-6 text-accent transition-transform duration-500 group-hover:translate-x-2"
                strokeWidth={1.5}
              />
            </span>
            <span className="text-[0.8rem] text-muted">
              {next.client} · {next.type}
            </span>
          </div>
        </Link>
      </section>
    </article>
  );
}
