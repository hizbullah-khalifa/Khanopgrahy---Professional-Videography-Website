"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { VideoProject } from "@/data/site";
import { videoCategories } from "@/data/site";
import { cn } from "@/lib/utils";
import { SmartImage } from "@/components/ui/smart-image";
import { PlayGlyph, Pill } from "@/components/ui/primitives";

/** The player is only downloaded once a visitor opens a film. */
const VideoModal = dynamic(
  () => import("@/components/ui/video-modal").then((mod) => mod.VideoModal),
  { ssr: false },
);

/** Editorial rhythm: wide / tall / half / wide. */
const SPAN = [
  "lg:col-span-8",
  "lg:col-span-4",
  "lg:col-span-5",
  "lg:col-span-7",
];

export function VideoShowcase({ projects }: { projects: VideoProject[] }) {
  const [active, setActive] = useState<string>("All");
  const [openId, setOpenId] = useState<string | null>(null);

  const visible = useMemo(
    () =>
      active === "All"
        ? projects
        : projects.filter((project) => project.category === active),
    [active, projects],
  );

  const openProject = openId
    ? (projects.find((project) => project.id === openId) ?? null)
    : null;

  return (
    <>
      {/* Filter */}
      <div className="mt-10 flex flex-wrap items-center gap-2">
        {videoCategories.map((category) => {
          const isActive = active === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              aria-pressed={isActive}
              className={cn(
                "cursor-pointer rounded-full border px-3.5 py-1.5 text-[0.75rem] font-medium whitespace-nowrap transition-[background-color,color,border-color] duration-300",
                isActive
                  ? "border-accent bg-accent text-accent-ink"
                  : "border-line text-muted hover:border-accent/50 hover:text-ink",
              )}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div
        key={active}
        className="animate-rise mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5"
      >
        {visible.map((project, index) => (
          <article
            key={project.id}
            className={cn("group", SPAN[index % SPAN.length])}
          >
            <button
              type="button"
              onClick={() => setOpenId(project.id)}
              data-cursor="play"
              data-over-media
              aria-label={`Play ${project.title} — ${project.category} ${project.year}`}
              className="relative block w-full cursor-pointer overflow-hidden rounded-2xl border border-line text-left transition-[border-color,transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_34px_70px_-40px_rgba(0,0,0,0.75)]"
            >
              <SmartImage
                src={project.thumbnail}
                alt={project.alt}
                ratio={project.aspect}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 66vw"
                zoom
                quality={90}
              />

              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/88 via-black/15 to-black/25"
              />

              {/* Meta — top */}
              <span className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4 sm:p-5">
                <span className="flex flex-wrap items-center gap-2">
                  <Pill tone="invert">{project.category}</Pill>
                </span>
                <span className="rounded-full bg-black/55 px-2.5 py-1 font-mono text-[0.65rem] text-white/85 backdrop-blur-sm">
                  {project.duration}
                </span>
              </span>

              {/* Play */}
              <span className="pointer-events-none absolute inset-0 grid place-items-center">
                <PlayGlyph />
              </span>

              {/* Title — bottom */}
              <span className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-2 p-4 sm:p-5">
                <span className="flex items-end justify-between gap-4">
                  <span className="flex flex-col gap-1">
                    <span className="text-[0.68rem] tracking-[0.18em] text-white/55 uppercase">
                      {project.client}
                    </span>
                    <span className="font-display text-lg leading-tight font-medium text-white sm:text-xl">
                      {project.title}
                    </span>
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-[0.68rem] text-white/60">
                    {project.year}
                    <ArrowUpRight
                      className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={1.6}
                    />
                  </span>
                </span>
                <span className="mt-1 flex flex-wrap gap-1.5 overflow-hidden">
                  {project.services.map((service) => (
                    <span
                      key={service}
                      className="rounded-full border border-white/18 px-2.5 py-0.5 text-[0.6rem] tracking-[0.12em] text-white/70 uppercase"
                    >
                      {service}
                    </span>
                  ))}
                </span>
              </span>
            </button>
          </article>
        ))}
      </div>

      {openProject && (
        <VideoModal project={openProject} onClose={() => setOpenId(null)} />
      )}
    </>
  );
}
