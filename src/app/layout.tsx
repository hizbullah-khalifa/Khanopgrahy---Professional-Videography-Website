import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, Sora } from "next/font/google";
import Script from "next/script";
import { site, seo } from "@/data/site";
import { themeInitScript } from "@/lib/theme";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { CustomCursor } from "@/components/site/custom-cursor";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import "./globals.css";

/* -------------------------------------------------------------------------- */
/*  Fonts — self-hosted by next/font, preloaded, no layout shift              */
/* -------------------------------------------------------------------------- */

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sora",
  weight: ["400", "500", "600"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument",
  weight: "400",
  style: ["normal", "italic"],
});

/* -------------------------------------------------------------------------- */
/*  SEO                                                                       */
/* -------------------------------------------------------------------------- */

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: seo.title,
    template: `%s — ${site.brand}`,
  },
  description: seo.description,
  keywords: [...seo.keywords],
  applicationName: site.brand,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.brand,
  category: "Photography & Videography",

  // Google Search Console verification (renders the <meta> tag automatically)
 verification: {
  google: [
    "w_ZE60SpnOLR-tX6wBeqv_xmMbc6ZDNUwIQX0BvDt_M", // new
    "yO5ByLFzDsKzDD0DmteEhxOsI7zD2XH1BcozzKlimQk",
    "TxgSXLMu5zlf3ihJNr8psrStRSXph5Kt7q3DZV7O0_U",
  ],
},

  // NOTE: no root canonical here. Set `alternates.canonical` per page instead.

  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.brand,
    title: seo.title,
    description: seo.description,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: `${site.brand} — cinematic film, photography and aerial work by ${site.name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#05070b" },
  ],
};

/* -------------------------------------------------------------------------- */
/*  Structured data                                                           */
/* -------------------------------------------------------------------------- */

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.name,
      alternateName: site.brand,
      jobTitle: site.roles.join(", "),
      description: seo.description,
      image: `${site.url}/og.jpg`,
      email: `mailto:${site.email}`,
      telephone: site.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: site.locationShort,
        addressCountry: "PK",
      },
      knowsAbout: [
        "Videography",
        "Video Editing",
        "Colour Grading",
        "Photography",
        "Drone Operation",
        "Aerial Cinematography",
        "Sound Design",
      ],
      worksFor: { "@id": `${site.url}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.brand,
      url: site.url,
      logo: `${site.url}/icon.svg`,
      founder: { "@id": `${site.url}/#person` },
      sameAs: site.socials.map((social) => social.href),
    },
    {
      "@type": "ProfessionalService",
      "@id": `${site.url}/#service`,
      name: site.brand,
      description: seo.description,
      url: site.url,
      image: `${site.url}/og.jpg`,
      telephone: site.phone,
      email: site.email,
      priceRange: "$$",
      areaServed: "Worldwide",
      address: {
        "@type": "PostalAddress",
        addressLocality: site.locationShort,
        addressCountry: "PK",
      },
      founder: { "@id": `${site.url}/#person` },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services",
        itemListElement: [
          "Videography",
          "Photography",
          "Video Editing",
          "Drone Operation",
          "Creative Editing",
        ].map((name) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.brand,
      description: seo.description,
      inLanguage: "en",
      publisher: { "@id": `${site.url}/#organization` },
    },
  ],
};

/* -------------------------------------------------------------------------- */

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${sora.variable} ${inter.variable} ${instrument.variable}`}
    >
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
      </head>
      <body className="flex min-h-dvh flex-col antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-9999 focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-sm focus:text-bg"
        >
          Skip to content
        </a>

        <ScrollProgress />
        <CustomCursor />
        <Navbar />

        <main id="main" className="flex-1">
          {children}
        </main>

        <Footer />
        <WhatsAppButton />

        {/* Plain script tag so crawlers see the JSON-LD in the initial HTML */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}