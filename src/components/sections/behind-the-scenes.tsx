import { behindTheScenes } from "@/data/site";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/primitives";
import { SmartImage } from "@/components/ui/smart-image";

/** Mixed grid rhythm so the wall never looks like a template. */
const SPAN = [
  "sm:col-span-2 sm:row-span-2",
  "",
  "",
  "",
  "sm:col-span-2",
  "",
  "",
  "",
];

export function BehindTheScenes() {
  return (
    <section id="bts" className="section-y relative border-t border-line bg-bg-elevated">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={behindTheScenes.eyebrow}
            title={
              <>
                The work behind
                <br />
                <span className="font-serif font-normal italic text-accent">
                  the work.
                </span>
              </>
            }
            className="max-w-2xl"
          />
          <Reveal variant="up" delay={120}>
            <p className="max-w-sm text-[0.95rem] leading-relaxed text-muted">
              {behindTheScenes.description}
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 grid auto-rows-[11rem] grid-cols-2 gap-3 sm:auto-rows-[13rem] sm:grid-cols-4 sm:gap-4">
          {behindTheScenes.items.map((item, index) => (
            <Reveal
              as="li"
              key={item.id}
              variant="scale"
              delay={(index % 4) * 70}
              className={SPAN[index]}
            >
              <figure
                data-cursor="view"
                data-over-media
                className="group relative h-full overflow-hidden rounded-xl border border-line"
              >
                <SmartImage
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 40vw"
                  zoom
                  className="size-full"
                  imgClassName="grayscale transition-[filter] duration-700 group-hover:grayscale-0"
                />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/85 via-black/5 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-95" />
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-1.5 p-4 opacity-0 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-[0.78rem] font-medium text-white">
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-[0.65rem] text-white/60">
                    {item.caption}
                  </p>
                </figcaption>
                <span className="pointer-events-none absolute top-3 left-3 rounded-full bg-black/50 px-2.5 py-1 font-mono text-[0.58rem] text-white/70 backdrop-blur-sm">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
