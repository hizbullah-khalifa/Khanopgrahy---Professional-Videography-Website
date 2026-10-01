"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import type { VideoProject } from "@/data/site";
import { YouTubeEmbed } from "@/components/ui/youtube-embed";

type Format = "long" | "short";

const tabs: { id: Format; label: string }[] = [
  { id: "long", label: "Long Films" },
  { id: "short", label: "Reels" },
];

function VideoCard({ project }: { project: VideoProject }) {
  const [playing, setPlaying] = useState(false);
  const isShort = project.format === "short";

  if (playing) {
    return (
      <div>
        <YouTubeEmbed id={project.youtubeId} title={project.title} short={isShort} />
        <p className="mt-3 text-sm text-foreground/80">{project.title}</p>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play ${project.title}`}
      className="group block w-full text-left"
    >
      <div
        className={`relative w-full overflow-hidden rounded-2xl bg-black ${
          isShort ? "aspect-[9/16]" : "aspect-video"
        }`}
      >
        <Image
          src={project.thumbnail}
          alt={project.alt}
          fill
          sizes={isShort ? "(min-width: 1024px) 25vw, 50vw" : "(min-width: 1024px) 33vw, 100vw"}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/10" />
        <span className="absolute inset-0 grid place-items-center">
          <span className="grid size-14 place-items-center rounded-full bg-white/90 text-black shadow-lg transition-transform group-hover:scale-110">
            <Play className="size-5 fill-current" strokeWidth={0} />
          </span>
        </span>
      </div>
      <p className="mt-3 text-sm text-foreground/80">{project.title}</p>
    </button>
  );
}

export function VideoShowcase({ projects }: { projects: VideoProject[] }) {
  const [format, setFormat] = useState<Format>("long");
  const visible = projects.filter((p) => p.format === format);

  return (
    <div className="mt-12">
      <div className="flex gap-2" role="tablist" aria-label="Video format">
        {tabs.map((tab) => {
          const active = tab.id === format;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFormat(tab.id)}
              className={`rounded-full border px-5 py-2 text-sm transition-colors ${
                active
                  ? "border-accent bg-accent text-black"
                  : "border-line text-foreground/70 hover:border-accent hover:text-accent"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        className={`mt-8 grid gap-6 ${
          format === "short"
            ? "grid-cols-2 lg:grid-cols-4"
            : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {visible.map((project) => (
          <VideoCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}