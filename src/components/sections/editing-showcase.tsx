"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { beforeAfter, editingSkills } from "@/data/site";
import { cn } from "@/lib/utils";
import { BeforeAfterSlider } from "@/components/ui/before-after";
import { Reveal } from "@/components/ui/reveal";

export function EditingShowcase() {
  const [index, setIndex] = useState(0);
  const item = beforeAfter[index];

  return (
    <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:gap-14">
      {/* Comparison */}
      <div>
        <Reveal variant="up">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-[0.68rem] tracking-[0.2em] uppercase">
              <span className="text-muted">Raw</span>
              <ArrowRight className="size-3.5 text-accent" strokeWidth={1.8} />
              <span className="font-medium text-ink">Edited</span>
            </div>
            <p className="text-[0.72rem] text-muted">
              Drag the handle · arrow keys also work
            </p>
          </div>
        </Reveal>

        <Reveal variant="scale" delay={60}>
          <BeforeAfterSlider item={item} />
        </Reveal>

        <div
          className="mt-6 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Grading examples"
        >
          {beforeAfter.map((entry, entryIndex) => (
            <button
              key={entry.id}
              type="button"
              role="tab"
              aria-selected={entryIndex === index}
              onClick={() => setIndex(entryIndex)}
              className={cn(
                "cursor-pointer rounded-full border px-3.5 py-1.5 text-[0.74rem] font-medium transition-[background-color,color,border-color] duration-300",
                entryIndex === index
                  ? "border-accent bg-accent text-accent-ink"
                  : "border-line text-muted hover:border-accent/50 hover:text-ink",
              )}
            >
              {entry.category}
            </button>
          ))}
        </div>
      </div>

      {/* Skills */}
      <ul className="grid h-fit gap-px self-start overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-1">
        {editingSkills.map((skill, skillIndex) => (
          <Reveal
            as="li"
            key={skill.title}
            variant="up"
            delay={skillIndex * 55}
            className="bg-bg"
          >
            <div className="group h-full bg-bg p-6 transition-colors duration-500 hover:bg-surface">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-[0.98rem] font-medium tracking-[-0.02em]">
                  {skill.title}
                </h3>
                <span className="font-mono text-[0.62rem] text-muted">
                  {String(skillIndex + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-2 text-[0.82rem] leading-relaxed text-muted">
                {skill.detail}
              </p>
            </div>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
