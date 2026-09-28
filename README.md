# Khanography — cinematic portfolio

A premium, dark/light, animation-led portfolio for a **videographer · video
editor · photographer · drone operator · creative editor**.

Built with **Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
Motion · Lucide**. Every route is statically prerendered.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run check      # lint + typecheck + build
```

---

## 1. Everything lives in one file

**`src/data/site.ts` is the single source of truth.** Names, bios, stats,
services, gallery photos, films, case studies, equipment, testimonials, contact
options, SEO copy and all media URLs are defined there. No component hard-codes
copy, so you can rebuild the whole site — or a client's version of it — without
touching a single `.tsx` file.

### Swapping the placeholder media

| What | Where | How |
| --- | --- | --- |
| Photos | `hero.*`, `intro.portrait`, `photos[]`, `services.items[].image`, `behindTheScenes.items[]`, `drone.*`, `projects[].cover` / `.gallery` | Replace the URL with your own (`/work/shot-01.jpg` or your CDN URL) |
| Videos | `clips` object | Replace with your own MP4/HLS URLs. Video bytes are only fetched when a visitor opens a film |
| Brand | `site.brand`, `site.name`, `site.socials`, `site.url` | Your studio name and socials |
| SEO | `seo`, plus `site.url` | Title, description, keywords, canonical host |

Placeholder photos come from `picsum.photos` (deterministic via a `seed`, so a
given image never changes) and the sample clips are Google's public test files.

**If you host images on your own domain**, add it to `images.remotePatterns` in
`next.config.ts` — Next 16 rejects unknown remote hosts, and it also allow-lists
the optimizer `qualities` (currently `[50, 75, 90]`; using a quality outside that
list silently coerces it).

---

## 2. Structure

```
src/
  app/
    layout.tsx              fonts · metadata · JSON-LD · theme init · chrome
    page.tsx                section composition (all 15 sections)
    actions.ts              project-brief server action (validation + TODO: delivery)
    opengraph-image.tsx     build-time social share card
    sitemap.ts robots.ts manifest.ts
    not-found.tsx
    work/[slug]/page.tsx    case-study pages (SSG via generateStaticParams)
  components/
    site/                   navbar · mobile menu · theme toggle · footer
                            custom cursor · scroll progress · wordmark
    sections/               one file per section
    ui/                     reveal · smart-image · counter · section heading
                            lightbox · video modal · before/after slider
                            parallax · modal shell · primitives
  data/site.ts              ← all content
  lib/                      utils · hooks (scroll lock, keys) · theme
tools/
  shoot.mjs                 headless-Chrome screenshot + a11y/perf audit
  smoke.mjs                 functional test of every interactive control
  weight.mjs                initial-payload size report
```

---

## 3. Performance decisions

- **Static everything.** `/` and all four `/work/[slug]` pages are prerendered
  HTML — no client data fetching, instant navigation.
- **Media is lazy by default.** `next/image` with AVIF → WebP, responsive
  `sizes`, and lazy loading below the fold. The hero is the only preloaded
  image.
- **Videos are interaction-gated.** No `<video src>` exists in the initial HTML;
  the source is attached only when a modal opens. The hero's ambient video
  mounts on `requestIdleCallback`, and is skipped entirely for small screens,
  `prefers-reduced-motion`, or `Save-Data` connections.
- **Real code splitting.** The lightbox and video player are `next/dynamic`
  imports with `ssr: false`, so neither ships in the initial bundle.
- **Lightweight animation.** The scroll reveals, count-ups, progress bar and
  theme transition are CSS/`requestAnimationFrame`; Motion is reserved for the
  things that need it (springs, drag, `AnimatePresence`, scroll-linked values).
- **GPU-only transforms** for parallax, cursor and progress — no layout or paint
  work in scroll handlers.
- **Reduced motion is respected everywhere** — reveals become instant, parallax
  and the custom cursor are disabled, the hero video never loads.

Measured on the production build: **~228 KB brotli of JS + CSS** and **~33 KB
brotli of HTML** for a first visit. Verify with:

```bash
npm run build && npm start
node tools/weight.mjs <path-to-rendered-home.html>
```

---

## 4. Dark & light mode

- The theme is written to `<html>` by a **blocking inline script before first
  paint**, so there is no flash of the wrong theme.
- First visit follows the OS preference; the choice is then saved to
  `localStorage` under `khanography-theme`.
- The toggle reads the DOM through `useSyncExternalStore` (the theme lives
  outside React), animates the icons, and fires a short colour cross-fade plus
  a soft radial flash from the button.
- The header switches to a fixed light palette while it floats over a dark
  cinematic image, then adopts the theme's colours once you scroll.

Change the palette in `src/app/globals.css` — every colour is a CSS variable,
so there is one place to edit.

---

## 5. Accessibility

- Semantic landmarks (`header`/`main`/`footer`/`nav`/`article`/`figure`),
  a skip link, and labelled form controls.
- Full keyboard support: the lightbox (`←`/`→`/`Esc`), the before/after slider
  (`role="slider"` with arrows/Home/End), the testimonial carousel, the mobile
  menu, and visible `:focus-visible` rings.
- Scroll lock and focus restore on every modal.
- `data-over-media` marks text that sits on photography — it is exempt from the
  numeric contrast audit in `tools/shoot.mjs` because the backdrop is an image,
  so those must be judged by eye.

---

## 6. Verification

`npm run smoke` boots the production build and drives the real UI in headless
Chrome — theme persistence, gallery filters, lightbox keyboard navigation,
video streaming on demand, the before/after slider, the carousel, count-ups,
form validation and the success state, and the touch-device cursor opt-out.

`tools/shoot.mjs` captures every section and audits horizontal overflow,
unrevealed content and text contrast in a given theme and viewport.

```bash
npm run build
npm run smoke                  # 19 functional checks
npm run shoot                  # desktop, dark
npm run shoot:light            # desktop, light
npm run shoot:mobile           # 390 × 844
node tools/shoot.mjs --path=/work/mountain-adventure-film --out=screenshots-case
```

Text sitting on photography carries `data-over-media`; the contrast audit skips
those because a numeric verdict over an image is meaningless — judge them by
eye in the screenshots.

---

## 7. Before you go live

1. `site.url` in `src/data/site.ts` → your real domain (drives canonical URLs,
   Open Graph and the sitemap).
2. Replace the placeholder media.
3. Wire the contact form: `src/app/actions.ts` has server-side validation
   already; add your email/CRM provider at the marked `TODO`.
4. Update the social URLs and phone/email.
5. Optional: add `src/app/apple-icon.png` for iOS home-screen icons, and
   replace `src/app/icon.svg` with your real logo mark.
