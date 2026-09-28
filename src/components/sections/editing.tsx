import { editing } from "@/data/site";
import { SectionHeading } from "@/components/ui/primitives";
import { EditingShowcase } from "./editing-showcase";

export function Editing() {
  return (
    <section id="editing" className="section-y relative border-t border-line bg-bg-elevated">
      <div className="shell">
        <SectionHeading
          eyebrow={editing.eyebrow}
          title={
            <>
              From Raw Footage
              <br />
              <span className="font-serif font-normal italic text-accent">
                to Final Story.
              </span>
            </>
          }
          description={editing.description}
        />

        <EditingShowcase />
      </div>
    </section>
  );
}
