import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { footer, navLinks, site } from "@/data/site";
import { Wordmark } from "./wordmark";
import { Marquee } from "@/components/ui/primitives";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer
      data-site-footer
      className="relative overflow-hidden border-t border-line bg-bg-elevated"
    >
      {/* Oversized wordmark, cropped by the viewport edge */}
      <div
        aria-hidden
        data-decorative
        className="pointer-events-none absolute -bottom-[0.16em] left-1/2 -translate-x-1/2 select-none"
      >
        <span className="block font-display text-[clamp(4rem,19vw,17rem)] leading-none font-semibold tracking-[-0.06em] text-ink/[0.045] select-none">
          {site.brand}
        </span>
      </div>

      <div className="shell relative pb-10">
        <div className="grid gap-12 pt-16 pb-14 sm:pt-20 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="flex flex-col gap-6">
            <Link href="#top" className="flex items-center gap-2.5">
              <Wordmark className="size-8" />
              <span className="font-display text-lg font-semibold tracking-[-0.02em]">
                {site.brand}
              </span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              {footer.blurb}
            </p>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="group inline-flex items-center gap-2 text-ink-soft transition-colors hover:text-accent"
                >
                  <Mail className="size-3.5" strokeWidth={1.6} />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="group inline-flex items-center gap-2 text-ink-soft transition-colors hover:text-accent"
                >
                  <Phone className="size-3.5" strokeWidth={1.6} />
                  {site.phone}
                </a>
              </li>
              <li className="inline-flex items-center gap-2 text-ink-soft">
                <MapPin className="size-3.5" strokeWidth={1.6} />
                {site.location}
              </li>
            </ul>
          </div>

          <nav aria-label="Footer">
            <h2 className="mb-5 text-[0.68rem] font-medium tracking-[0.2em] text-muted uppercase">
              Explore
            </h2>
            <ul className="flex flex-col gap-3 text-sm">
              {[...navLinks, ...footer.quickLinks]
                .filter(
                  (link, index, all) =>
                    all.findIndex((item) => item.href === link.href) === index,
                )
                .map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1 text-ink-soft transition-colors hover:text-accent"
                    >
                      {link.label}
                      <ArrowUpRight
                        className="size-3 opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                        strokeWidth={1.6}
                      />
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-5 text-[0.68rem] font-medium tracking-[0.2em] text-muted uppercase">
              Elsewhere
            </h2>
            <ul className="flex flex-col gap-3 text-sm">
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex items-center gap-1 text-ink-soft transition-colors hover:text-accent"
                  >
                    {social.label}
                    <span className="text-xs text-muted">{social.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-[0.68rem] tracking-[0.1em] text-muted uppercase">
              <span className="relative flex size-1.5">
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent" />
                <span className="relative size-1.5 rounded-full bg-accent" />
              </span>
              {site.availability}
            </p>
          </div>
        </div>

        <div className="border-t border-line py-6">
          <Marquee speed={44} className="text-[0.7rem] tracking-[0.26em] text-muted uppercase">
            {site.roles.map((role) => (
              <span key={role} className="flex items-center gap-10">
                {role}
                <span className="text-accent">/</span>
              </span>
            ))}
          </Marquee>
        </div>

        <div className="flex flex-col gap-3 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name} · {site.brand}. All rights reserved.
          </p>
          <p className="flex items-center gap-4">
            <span>Built for speed. Shot on location.</span>
            <a href="#top" className="transition-colors hover:text-accent">
              Back to top ↑
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
