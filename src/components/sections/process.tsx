import { process } from "@/data/site";
import { SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { ProcessTimeline } from "./process-timeline";

export function Process() {
  return (
    <section id="process" className="section-y relative border-t border-line">
      <div className="shell">
        <SectionHeading
          eyebrow={process.eyebrow}
          title={
            <>
              A process you
              <br />
              <span className="font-serif font-normal italic text-accent">
                can plan around.
              </span>
            </>
          }
          description="Five stages, no surprises. You always know what happens next, what I need from you, and when the files land."
        />

        <ProcessTimeline />

        <Reveal variant="up">
          <p className="mt-14 text-center text-[0.85rem] text-muted">
            Typical turnaround: 2–3 weeks for a highlight film, 6–8 weeks for a
            full brand production.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
