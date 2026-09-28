import { photography, photoCategories, photos } from "@/data/site";
import { SectionHeading } from "@/components/ui/primitives";
import { PhotoGallery } from "./photo-gallery";

export function Photography() {
  return (
    <section id="photography" className="section-y relative border-t border-line">
      <div className="shell">
        <SectionHeading
          eyebrow={photography.eyebrow}
          title={
            <>
              Photography
              <br />
              <span className="font-serif font-normal italic text-accent">
                That Tells a Story.
              </span>
            </>
          }
          description={photography.description}
        />

        <div className="mt-12">
          <PhotoGallery photos={photos} categories={photoCategories} />
        </div>
      </div>
    </section>
  );
}
