import { videography, videoProjects } from "@/data/site";
import { SectionHeading } from "@/components/ui/primitives";
import { VideoShowcase } from "./video-showcase";

export function Videography() {
  return (
    <section id="films" className="section-y relative border-t border-line">
      <div className="shell">
        <SectionHeading
          eyebrow={videography.eyebrow}
          title={
            <>
              Moving Images.
              <br />
              <span className="font-serif font-normal italic text-accent">
                Real Stories.
              </span>
            </>
          }
          description={videography.description}
        />

        <VideoShowcase projects={videoProjects} />
      </div>
    </section>
  );
}