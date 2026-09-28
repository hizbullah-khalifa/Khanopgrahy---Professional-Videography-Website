"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Play } from "lucide-react";
import type { VideoProject } from "@/data/site";
import { Modal, ModalClose } from "./modal";

type VideoModalProps = {
  project: VideoProject | null;
  onClose: () => void;
};

/**
 * Video modal. The <video> `src` is attached only while the modal is open, so no
 * media bytes are fetched during page load — just the poster image.
 */
export function VideoModal({ project, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    return () => {
      video?.pause();
    };
  }, [project?.id]);

  return (
    <Modal
      open={Boolean(project)}
      onClose={onClose}
      label={project ? `${project.title} video` : "Video player"}
      className="relative w-full max-w-6xl px-3 sm:px-6"
    >
      {project && (
        <div>
          <div className="mb-3 flex items-start justify-between gap-4 px-1">
            <div className="min-w-0">
              <p className="truncate font-display text-lg font-medium text-white sm:text-xl">
                {project.title}
              </p>
              <p className="mt-1 text-[0.7rem] uppercase tracking-[0.18em] text-white/55">
                {project.category} · {project.client} · {project.year}
              </p>
            </div>
            <ModalClose onClick={onClose} />
          </div>

          <div
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl"
            style={{ aspectRatio: "16 / 9" }}
          >
            <video
              key={project.id}
              ref={videoRef}
              className="size-full bg-black object-contain"
              controls
              autoPlay
              playsInline
              preload="metadata"
              poster={project.thumbnail}
            >
              <source src={project.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="mt-5 grid gap-5 px-1 sm:grid-cols-[1.6fr_1fr]">
            <p className="text-sm leading-relaxed text-white/70">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 sm:justify-end">
              {project.services.map((service) => (
                <span
                  key={service}
                  className="rounded-full border border-white/15 px-3 py-1 text-[0.68rem] uppercase tracking-[0.14em] text-white/70"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-5 flex items-center gap-2 border-t border-white/10 px-1 pt-4 text-[0.7rem] uppercase tracking-[0.16em] text-white/40">
            <Play className="size-3" strokeWidth={2} />
            Placeholder footage — replace with your own master in src/data/site.ts
          </div>
        </div>
      )}
    </Modal>
  );
}

/** Small poster + play affordance reused by cards that open the modal. */
export function VideoPoster({
  src,
  alt,
  className,
  sizes = "(max-width: 768px) 100vw, 60vw",
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      quality={75}
      {...(priority ? { preload: true } : { loading: "lazy" })}
      decoding="async"
      className={className}
    />
  );
}
