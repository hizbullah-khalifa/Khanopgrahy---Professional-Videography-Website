import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { contact, site } from "@/data/site";
import { ActionLink, Eyebrow, Rule } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "./contact-form";

export function Contact() {
  return (
    <section id="contact" className="section-y relative overflow-hidden border-t border-line">
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 size-[42rem] -translate-x-1/2 translate-y-1/3 rounded-full bg-accent/[0.07] blur-[140px]"
      />

      <div className="shell relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex max-w-2xl flex-col gap-5">
            <Reveal variant="up">
              <Eyebrow>{contact.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal variant="up" delay={60}>
              <h2 className="text-[clamp(2.1rem,6vw,4.4rem)] leading-[0.95] font-medium tracking-[-0.04em] text-balance">
                Have a Story
                <br />
                <span className="font-serif font-normal italic text-accent">
                  Worth Capturing?
                </span>
              </h2>
            </Reveal>
            <Reveal variant="up" delay={120}>
              <p className="max-w-xl text-[1rem] leading-relaxed text-muted sm:text-[1.08rem]">
                {contact.description}
              </p>
            </Reveal>
            <Reveal variant="up" delay={180}>
              <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ActionLink href={contact.primaryCta.href} size="lg">
                  {contact.primaryCta.label}
                </ActionLink>
                <ActionLink
                  href={contact.secondaryCta.href}
                  size="lg"
                  variant="outline"
                >
                  {contact.secondaryCta.label}
                </ActionLink>
              </div>
            </Reveal>
          </div>

          <Reveal variant="up" delay={160}>
            <dl className="flex flex-col gap-4 text-sm lg:min-w-64">
              <div className="flex items-center gap-3">
                <Mail className="size-4 text-accent" strokeWidth={1.6} />
                <a
                  href={`mailto:${site.email}`}
                  className="text-ink-soft transition-colors hover:text-accent"
                >
                  {site.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="size-4 text-accent" strokeWidth={1.6} />
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="text-ink-soft transition-colors hover:text-accent"
                >
                  {site.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="size-4 text-accent" strokeWidth={1.6} />
                <span className="text-ink-soft">{site.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="size-4 text-accent" strokeWidth={1.6} />
                <span className="text-ink-soft">Replies within 1 business day</span>
              </div>
            </dl>
          </Reveal>
        </div>

        <Reveal variant="up" delay={80}>
          <Rule className="my-12" />
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal variant="up">
            <div className="flex flex-col gap-4">
              <h3 className="text-[0.68rem] font-medium tracking-[0.2em] text-muted uppercase">
                Project brief
              </h3>
              <p className="max-w-sm text-sm leading-relaxed text-muted">
                The more detail you give, the more useful my first reply will be.
                Dates, location, references and anything you already know you
                want.
              </p>
              <p className="text-[0.75rem] text-muted">
                Fields marked <span className="text-accent">*</span> are required.
              </p>
            </div>
          </Reveal>

          <Reveal variant="up" delay={100}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
