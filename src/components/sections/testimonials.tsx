import { testimonials } from "@/data/site";
import { SectionHeading } from "@/components/ui/primitives";
import { TestimonialsCarousel } from "./testimonials-carousel";

export function Testimonials() {
  return (
    <section id="testimonials" className="section-y relative border-t border-line">
      <div className="shell">
        <SectionHeading
          eyebrow={testimonials.eyebrow}
          title={testimonials.title}
          align="center"
        />
        <TestimonialsCarousel />
      </div>
    </section>
  );
}
