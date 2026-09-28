/**
 * ---------------------------------------------------------------------------
 * SINGLE SOURCE OF TRUTH
 * ---------------------------------------------------------------------------
 * Every headline, image, video, project, testimonial and form option lives in
 * this file. Replace the placeholder media with real work and the whole site
 * updates — no component edits required.
 *
 * PLACEHOLDER MEDIA
 *  - Photos  : picsum.photos (deterministic via `seed`) — swap for your own
 *              files in `/public` or your CDN and update `next.config.ts`.
 *  - Videos  : public sample clips, streamed only after a user interaction.
 * ---------------------------------------------------------------------------
 */

export const site = {
  brand: "Khanography",
  name: "Talha Khan",
  shortName: "Talha",
  roles: [
    "Videographer",
    "Video Editor",
    "Photographer",
    "Drone Operator",
    "Creative Editor",
  ],
  roleLine:
    "Videographer • Video Editor • Photographer • Drone Operator • Creative Editor",
  tagline: "I Capture Stories From Every Perspective.",
  location: "Timergara Dir Lower, Pakistan",
  locationShort: "Islamabad",
  availability: "Available for projects worldwide",
  url: "https://khanography.com",
  email: "hello@khanography.com",
  phone: "+92 300 0000000",
  yearsExperience: 4,
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/khanography__?igsh=ejdzbHZoMWQ4dWpw", handle: "@khanography" },
    { label: "YouTube", href: "https://youtube.com", handle: "/khanography" },
    { label: "Vimeo", href: "https://vimeo.com", handle: "/khanography" },
    { label: "Behance", href: "https://behance.net", handle: "/khanography" },
  ],
} as const;

export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Photography", href: "#photography" },
  { label: "Films", href: "#films" },
  { label: "Drone", href: "#drone" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

/* -------------------------------------------------------------------------- */
/*  Media helpers                                                             */
/* -------------------------------------------------------------------------- */

/** Deterministic placeholder photo. Swap for a real URL / `/public` path. */
const photo = (seed: string, w: number, h: number, grayscale = false) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}${grayscale ? "?grayscale" : ""}`;

/** Public sample clips — replace with your own MP4s or HLS streams. */
const clips = {
  alpine: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  city: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  motion: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  studio: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  lifestyle: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  aerial: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
  cinematic: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  short: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
  travel: "https://media.w3.org/2010/05/sintel/trailer.mp4",
} as const;

/* -------------------------------------------------------------------------- */
/*  Hero                                                                      */
/* -------------------------------------------------------------------------- */

export const hero = {
  eyebrow: "Videographer · Photographer · Drone Operator",
  title: ["I Capture Stories", "From Every Perspective."],
  highlight: "From Every Perspective.",
  description:
    "Videographer, Photographer, Video Editor & Drone Operator creating cinematic visuals that turn moments into powerful stories.",
  primaryCta: { label: "View My Work", href: "#work" },
  secondaryCta: { label: "Let's Work Together", href: "#contact" },
  scrollHint: "Scroll to Explore",
  background: photo("khanography-hero-mountains", 2000, 1200),
  poster: photo("khanography-hero-mountains", 1600, 900),
  video: clips.aerial,
  stats: [
    { value: 100, suffix: "+", label: "Projects Delivered" },
    { value: 50, suffix: "+", label: "Clients Worldwide" },
    { value: 500, suffix: "+", label: "Videos Edited" },
    { value: 100, suffix: "+", label: "Aerial Shots Flown" },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/*  Intro / About                                                             */
/* -------------------------------------------------------------------------- */

export const intro = {
  eyebrow: "The Professional",
  title: "A visual storyteller behind the lens.",
  bio: "Hello! My name is Talha Khan, and I am a passionate Videographer, Video Editor, Photographer, and Drone Operator. I am from Koherai, Malakand (Lower Dir), Pakistan. With a strong creative vision and technical skills, I specialize in capturing and transforming moments into powerful visual stories.I currently work with IT Lewal Technologies, where I contribute to professional video production, photography, and drone projects. I have over 3 years of hands-on experience in the media and creative industry.",
  bioSecondary:
    "I handle the full pipeline — concept, cinematography, aerial coverage, colour grading and sound — so the final film feels like one continuous thought rather than a collection of clips.",
  portrait: photo("asim-khan-portrait", 900, 1200),
  details: [
    { label: "Based In", value: site.location },
    { label: "Experience", value: `${site.yearsExperience}+ Years` },
    { label: "Projects", value: "100+ Completed" },
    { label: "Clients", value: "50+ Worldwide" },
  ],
  specialties: [
    "Cinematic Videography",
    "Aerial / Drone",
    "Colour Grading",
    "Documentary",
    "Portrait & Event",
    "Short-Form Social",
  ],
  stats: [
    { value: 100, suffix: "+", label: "Projects" },
    { value: 50, suffix: "+", label: "Clients" },
    { value: 500, suffix: "+", label: "Videos Edited" },
    { value: 100, suffix: "+", label: "Aerial Shots" },
  ],
} as const;

export const about = {
  eyebrow: "About Me",
  title: "Behind Every Frame Is a Story.",
  portrait: photo("asim-khan-about-portrait", 1000, 1250),
  portraitSecondary: photo("asim-khan-bts-camera", 1200, 900),
  paragraphs: [
    "I started out with a borrowed camera and a fascination with how light moves. Eight years later that curiosity hasn't changed — it's just become a craft. I photograph, film, fly and edit, because the strongest stories usually need more than one medium to land.",
    "My work sits between documentary honesty and cinematic polish. I like handheld energy, natural sound, real locations and long lenses — but I also grade every frame, design every transition and mix every sound bed, because the edit is where a good project becomes a memorable one.",
    "When I'm not on a shoot you'll find me at the desk, grading until the sky looks the way I remember it feeling on the day.",
  ],
  philosophy:
    "Every project starts with a feeling. The gear, the grade, the drone — they're all in service of it.",
  experience: [
    {
      period: "2021 — Now",
      role: "Founder & Lead Filmmaker",
      place: "Khanography · Islamabad",
      note: "Full-service production for brands, agencies and couples across 14 countries.",
    },
    {
      period: "2019 — 2021",
      role: "Senior Video Editor",
      place: "Post House · Karachi",
      note: "Led the colour and sound department on 200+ commercial and broadcast edits.",
    },
    {
      period: "2018 — 2019",
      role: "Camera Operator & Assistant Editor",
      place: "Freelance · Islamabad",
      note: "Documentary and event coverage for national broadcasters and NGOs.",
    },
    {
      period: "2017 — 2018",
      role: "Photography & Film Assistant",
      place: "Studio · Islamabad",
      note: "Studio lighting, product shoots and studio operation.",
    },
  ],
  skills: [
    { name: "Cinematography", level: 96 },
    { name: "Colour Grading", level: 94 },
    { name: "Aerial / Drone", level: 92 },
    { name: "Story & Editing", level: 95 },
    { name: "Photography", level: 90 },
    { name: "Sound Design", level: 84 },
  ],
  facts: [
    { label: "Location", value: site.location },
    { label: "Languages", value: "English · Urdu · Pashto" },
    { label: "Experience", value: `${site.yearsExperience} years` },
    { label: "Also known as", value: "Khanography" },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/*  Services                                                                  */
/* -------------------------------------------------------------------------- */

export const services = {
  eyebrow: "What I Do",
  title: "One crew for the whole story.",
  description:
    "Photography, film, aerials and post-production under one roof — so your project stays consistent from the first scout to the final export.",
  items: [
    {
      id: "videography",
      title: "Videography",
      icon: "Clapperboard",
      image: photo("service-videography-set", 1000, 1250),
      description:
        "Professional event, commercial, wedding, corporate and cinematic video production.",
      points: ["Brand & commercial films", "Cinematic wedding films", "Corporate & event coverage"],
      href: "#films",
    },
    {
      id: "photography",
      title: "Photography",
      icon: "Camera",
      image: photo("service-photography-portrait", 1000, 1250),
      description:
        "Portraits, events, products, landscapes, weddings and professional photography.",
      points: ["Editorial portraits", "Wedding & event galleries", "Product & lifestyle"],
      href: "#photography",
    },
    {
      id: "editing",
      title: "Video Editing",
      icon: "Scissors",
      image: photo("service-editing-suite", 1000, 1250),
      description:
        "Professional color grading, transitions, sound design, storytelling and cinematic editing.",
      points: ["DaVinci Resolve & Premiere", "Colour & skin tone grading", "Mix, master & delivery"],
      href: "#editing",
    },
    {
      id: "drone",
      title: "Drone Operator",
      icon: "Plane",
      image: photo("service-drone-aerial", 1000, 1250),
      description: "Professional aerial photography and cinematic drone footage.",
      points: ["4K/6K aerial capture", "Real estate & construction", "Licensed & insured flights"],
      href: "#drone",
    },
    {
      id: "creative",
      title: "Creative Editing",
      icon: "Sparkles",
      image: photo("service-creative-reels", 1000, 1250),
      description:
        "Short-form videos, social media content, reels, promotional videos and creative visual editing.",
      points: ["Reels, TikTok & Shorts", "Motion graphics & captions", "Batch content packages"],
      href: "#editing",
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/*  Photography gallery                                                       */
/* -------------------------------------------------------------------------- */

export type PhotoItem = {
  id: string;
  title: string;
  category: PhotoCategory;
  src: string;
  alt: string;
  width: number;
  height: number;
  location?: string;
};

export const photoCategories = [
  "All",
  "Portraits",
  "Weddings",
  "Events",
  "Nature",
  "Travel",
  "Products",
  "Lifestyle",
] as const;

export type PhotoCategory = Exclude<(typeof photoCategories)[number], "All">;

const photoSeed = (n: number, w: number, h: number, gray = false) =>
  photo(`khanography-shot-${n}`, w, h, gray);

export const photos: PhotoItem[] = [
  { id: "p01", title: "Golden Hour Portrait", category: "Portraits", src: photoSeed(1, 800, 1200), alt: "Outdoor golden hour portrait of a woman backlit by warm sunlight", width: 800, height: 1200, location: "Islamabad" },
  { id: "p02", title: "The First Dance", category: "Weddings", src: photoSeed(2, 1200, 800), alt: "Newlyweds sharing their first dance under string lights at a wedding reception", width: 1200, height: 800, location: "Murree" },
  { id: "p03", title: "Quiet Vow", category: "Weddings", src: photoSeed(3, 800, 1100), alt: "Bride adjusting her veil in soft window light before the ceremony", width: 800, height: 1100, location: "Murree" },
  { id: "p04", title: "Front Row", category: "Events", src: photoSeed(4, 1200, 900), alt: "Crowd watching a live stage performance with dramatic lighting", width: 1200, height: 900, location: "Lahore" },
  { id: "p05", title: "Ridgeline", category: "Nature", src: photoSeed(5, 1200, 800), alt: "Layered mountain ridgeline fading into morning mist", width: 1200, height: 800, location: "Hunza" },
  { id: "p06", title: "Still Water", category: "Nature", src: photoSeed(6, 800, 1200), alt: "Turquoise alpine lake reflecting surrounding peaks at dusk", width: 800, height: 1200, location: "Hunza" },
  { id: "p07", title: "Desert Crossing", category: "Travel", src: photoSeed(7, 1200, 900), alt: "Traveller walking across sand dunes in late afternoon light", width: 1200, height: 900, location: "Skardu" },
  { id: "p08", title: "Old Town", category: "Travel", src: photoSeed(8, 800, 1150), alt: "Narrow historic alleyway with hanging lanterns", width: 800, height: 1150, location: "Peshawar" },
  { id: "p09", title: "Studio Light", category: "Products", src: photoSeed(9, 1200, 1200), alt: "Minimal product still life lit with a single softbox on a seamless backdrop", width: 1200, height: 1200 },
  { id: "p10", title: "Pour Over", category: "Products", src: photoSeed(10, 800, 1000), alt: "Handmade ceramic mug and coffee beans arranged on a wooden table", width: 800, height: 1000 },
  { id: "p11", title: "Morning Ritual", category: "Lifestyle", src: photoSeed(11, 1200, 800), alt: "Person pouring coffee in a sunlit apartment kitchen", width: 1200, height: 800, location: "Islamabad" },
  { id: "p12", title: "Studio Session", category: "Portraits", src: photoSeed(12, 1000, 1250), alt: "Editorial portrait lit with a single rim light against a dark backdrop", width: 1000, height: 1250, location: "Studio" },
  { id: "p13", title: "Sparkler Exit", category: "Weddings", src: photoSeed(13, 1200, 1500), alt: "Wedding couple walking through a tunnel of sparklers at night", width: 1200, height: 1500 },
  { id: "p14", title: "Concert Haze", category: "Events", src: photoSeed(14, 1200, 800), alt: "Silhouetted photographer shooting a backlit concert stage", width: 1200, height: 800, location: "Karachi" },
  { id: "p15", title: "Glacier Blue", category: "Nature", src: photoSeed(15, 900, 1200), alt: "Blue glacier ice formations under a bright polar sky", width: 900, height: 1200, location: "Hunza" },
  { id: "p16", title: "Night Market", category: "Travel", src: photoSeed(16, 1200, 900), alt: "Bustling night market street with neon signage and food stalls", width: 1200, height: 900, location: "Lahore" },
  { id: "p17", title: "Detail Shot", category: "Products", src: photoSeed(17, 1000, 1000), alt: "Macro detail of a watch mechanism on a dark reflective surface", width: 1000, height: 1000 },
  { id: "p18", title: "Sunday Light", category: "Lifestyle", src: photoSeed(18, 1200, 900), alt: "Family laughing together on a sofa in warm afternoon light", width: 1200, height: 900, location: "Islamabad" },
];

export const photography = {
  eyebrow: "Photography",
  title: "Photography That Tells a Story.",
  description:
    "Stills that hold the same emotion as the film — editorial portraits, honest documentary frames, and product work with a little soul in it.",
} as const;

/* -------------------------------------------------------------------------- */
/*  Videography showcase                                                      */
/* -------------------------------------------------------------------------- */

export const videoCategories = [
  "All",
  "Commercial",
  "Wedding",
  "Event",
  "Corporate",
  "Documentary",
  "Social Media",
  "Music",
] as const;

export type VideoCategory = Exclude<(typeof videoCategories)[number], "All">;

export type VideoProject = {
  id: string;
  title: string;
  category: VideoCategory;
  year: string;
  client: string;
  thumbnail: string;
  alt: string;
  src: string;
  duration: string;
  aspect: "16/9" | "2.39/1" | "4/5" | "9/16";
  description: string;
  services: string[];
};

export const videoProjects: VideoProject[] = [
  {
    id: "v01",
    title: "Alpine Drift",
    category: "Commercial",
    year: "2025",
    client: "Northline Outdoors",
    thumbnail: photo("film-alpine-drift", 1600, 900),
    alt: "Cinematic wide shot of a mountain ridge at sunrise for a brand film",
    src: clips.alpine,
    duration: "1:24",
    aspect: "2.39/1",
    description:
      "A three-day expedition film built around one continuous sunrise. Shot on 4-camera with a drone pass for the closing reveal.",
    services: ["Videography", "Drone", "Editing"],
  },
  {
    id: "v02",
    title: "Vows in the Fog",
    category: "Wedding",
    year: "2025",
    client: "Ayesha & Bilal",
    thumbnail: photo("film-vows-fog", 1600, 900),
    alt: "Cinematic wedding film frame of a couple walking through mountain fog",
    src: clips.cinematic,
    duration: "4:12",
    aspect: "2.39/1",
    description:
      "A quiet, documentary-style wedding film. No scripted moments — just two families, honest sound and a lot of mountain weather.",
    services: ["Videography", "Photography", "Editing"],
  },
  {
    id: "v03",
    title: "Summit Sessions",
    category: "Music",
    year: "2024",
    client: "Independent Artist",
    thumbnail: photo("film-summit-sessions", 1600, 900),
    alt: "Live music performance filmed on a mountain plateau at blue hour",
    src: clips.motion,
    duration: "2:48",
    aspect: "16/9",
    description:
      "Four performances, one location, natural light only. Cut for a live session release and a vertical social cutdown.",
    services: ["Videography", "Multi-cam", "Sound"],
  },
  {
    id: "v04",
    title: "Foundry Stories",
    category: "Corporate",
    year: "2025",
    client: "Meridian Manufacturing",
    thumbnail: photo("film-foundry-stories", 1600, 900),
    alt: "Industrial documentary film frame of a factory floor with steel production",
    src: clips.studio,
    duration: "3:05",
    aspect: "16/9",
    description:
      "A people-first corporate film shot across two production sites. Interview-led, then cut into a 90-second brand piece and six social edits.",
    services: ["Corporate", "Interview", "Editing"],
  },
  {
    id: "v05",
    title: "Night of a Thousand Faces",
    category: "Event",
    year: "2024",
    client: "Aurora Foundation Gala",
    thumbnail: photo("film-gala-night", 1600, 900),
    alt: "Event film frame of a gala dinner with candlelight and a full room",
    src: clips.city,
    duration: "2:16",
    aspect: "16/9",
    description:
      "Multi-cam gala coverage delivered as a same-night highlight, a 5-minute film and 40 vertical clips for the client's social team.",
    services: ["Event", "Multi-cam", "Highlights"],
  },
  {
    id: "v06",
    title: "Salt & Road",
    category: "Documentary",
    year: "2023",
    client: "Self-initiated",
    thumbnail: photo("film-salt-road", 1600, 900),
    alt: "Documentary film frame of a road stretching through a desert landscape",
    src: clips.travel,
    duration: "18:40",
    aspect: "2.39/1",
    description:
      "A short documentary following three salt traders along a 400-kilometre desert route. Funded independently over eleven months.",
    services: ["Documentary", "Drone", "Sound"],
  },
  {
    id: "v07",
    title: "Studio Cutdowns",
    category: "Social Media",
    year: "2025",
    client: "Lumen Studio",
    thumbnail: photo("film-studio-cutdowns", 1600, 900),
    alt: "Vertical social media video frame of a creative studio team filming",
    src: clips.short,
    duration: "0:45",
    aspect: "9/16",
    description:
      "A monthly content engine: one shoot day, twelve vertical edits, motion captions and a hook-first structure tuned for retention.",
    services: ["Creative Editing", "Reels", "Motion"],
  },
  {
    id: "v08",
    title: "Concrete Ascent",
    category: "Commercial",
    year: "2024",
    client: "Skyline Developers",
    thumbnail: photo("film-concrete-ascent", 1600, 900),
    alt: "Cinematic drone reveal of a high-rise construction site at dusk",
    src: clips.aerial,
    duration: "1:05",
    aspect: "2.39/1",
    description:
      "A property campaign carried almost entirely by aerial work — vertical lift-offs, top-down geometry and golden-hour reveals across three towers.",
    services: ["Drone", "Videography", "Editing"],
  },
];

export const videography = {
  eyebrow: "Videography",
  title: "Moving Images. Real Stories.",
  description:
    "Brand films, wedding films, documentaries and multi-cam event coverage — graded, mixed and delivered in every format a modern audience actually watches.",
} as const;

/* -------------------------------------------------------------------------- */
/*  Editing / before-after                                                    */
/* -------------------------------------------------------------------------- */

export type BeforeAfter = {
  id: string;
  title: string;
  category: string;
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  note: string;
  tools: string[];
};

const gradeSeed = (n: number) => photo(`khanography-grade-${n}`, 1400, 900, true);

export const beforeAfter: BeforeAfter[] = [
  {
    id: "ba1",
    title: "Alpine Sunrise",
    category: "Colour Grading",
    before: gradeSeed(1),
    after: photo("khanography-grade-1", 1400, 900),
    beforeAlt: "Ungraded raw footage frame of a mountain sunrise, flat and grey",
    afterAlt: "The same frame after cinematic colour grading with warm highlights and teal shadows",
    note: "Log to Rec.709 with a custom film-emulation node, highlight rolloff and a gentle halation pass.",
    tools: ["DaVinci Resolve", "Custom Node Tree", "Halation"],
  },
  {
    id: "ba2",
    title: "Studio Portrait",
    category: "Skin Tone",
    before: gradeSeed(2),
    after: photo("khanography-grade-2", 1400, 900),
    beforeAlt: "Ungraded raw studio portrait with mixed colour temperature",
    afterAlt: "The same portrait with balanced skin tones and controlled contrast",
    note: "Shot on a grey card, then balanced with a qualifier-driven skin tone pass and matched lenses.",
    tools: ["Vector Scope", "Qualifier", "Power Window"],
  },
  {
    id: "ba3",
    title: "Desert Highway",
    category: "Cinematic Edit",
    before: gradeSeed(3),
    after: photo("khanography-grade-3", 1400, 900),
    beforeAlt: "Flat handheld documentary footage of a desert highway",
    afterAlt: "The same footage reframed and graded into a cinematic widescreen look",
    note: "Reframed to 2.39:1, stabilised, speed-ramped and cut to a 30-second brand film.",
    tools: ["Reframe", "Stabiliser", "Smart Reframe"],
  },
  {
    id: "ba4",
    title: "Reel: Studio Tour",
    category: "Reels / Shorts",
    before: gradeSeed(4),
    after: photo("khanography-grade-4", 900, 1600),
    beforeAlt: "Raw vertical phone footage of a studio walkthrough",
    afterAlt: "The same vertical footage edited into a fast-paced reel with captions",
    note: "Hook-first pacing, motion captions, beat-matched cuts and a 45-second delivery for social.",
    tools: ["Premiere Pro", "Motion Graphics", "Beat Sync"],
  },
];

export const editingSkills = [
  { title: "Colour Grading", detail: "Log transforms, film emulation, highlight rolloff and consistent looks across every deliverable." },
  { title: "Cinematic Editing", detail: "Story-first cutting, 2.39:1 reframing, speed ramps and J/L cut pacing." },
  { title: "Reels & Shorts", detail: "Vertical-first edits built for retention: strong hooks, captions and beat-matched rhythm." },
  { title: "Sound Design", detail: "Dialogue cleanup, ambience layers, music editing and a final mix that survives phone speakers." },
  { title: "Motion & Graphics", detail: "Titles, lower thirds, animated maps and logo stings designed in the edit." },
  { title: "Delivery & Master", detail: "Platform-ready masters for web, broadcast, cinema and every social aspect ratio." },
] as const;

export const editing = {
  eyebrow: "Video Editing",
  title: "From Raw Footage to Final Story.",
  description:
    "Footage is only half the job. The cut is where a project finds its rhythm — and the grade is where it finds its look. Drag the handle to see the difference.",
} as const;

/* -------------------------------------------------------------------------- */
/*  Drone / aerial                                                            */
/* -------------------------------------------------------------------------- */

export const drone = {
  eyebrow: "Aerial & Drone",
  title: "See the World From Above.",
  description:
    "Licensed drone operator with 100+ flight hours. Smooth establishing passes, controlled top-down geometry and cinematic reveals that give a project scale.",
  hero: photo("khanography-drone-hero", 2200, 1200),
  heroAlt: "Aerial view of a winding river cutting through a green valley at sunrise",
  video: clips.aerial,
  capabilities: [
    { title: "Landscape Aerials", detail: "Establishing shots, ridgelines and scale-setting reveals." },
    { title: "Real Estate", detail: "4K exteriors, twilight shoots and vertical social cutdowns." },
    { title: "Events", detail: "Festival and wedding aerials flown under supervision." },
    { title: "Travel", detail: "Location storytelling for tourism boards and productions." },
  ],
  gallery: [
    { id: "a1", title: "Valley River", src: photo("aerial-valley-river", 1600, 1000), alt: "Aerial view of a river winding through a wide green valley" },
    { id: "a2", title: "Desert Lines", src: photo("aerial-desert-lines", 1000, 1300), alt: "Top-down aerial of dune ridges creating abstract wave patterns" },
    { id: "a3", title: "City Grid", src: photo("aerial-city-grid", 1600, 1000), alt: "Aerial view of a city street grid at blue hour" },
    { id: "a4", title: "Coastal Cliffs", src: photo("aerial-coastal-cliffs", 1000, 1300), alt: "Aerial view of waves breaking against steep coastal cliffs" },
    { id: "a5", title: "Snow Line", src: photo("aerial-snow-line", 1600, 1000), alt: "Aerial view of a snow covered ridge line above the clouds" },
    { id: "a6", title: "River Delta", src: photo("aerial-river-delta", 1000, 1300), alt: "Aerial view of a branching river delta meeting the sea" },
  ],
  stats: [
    { value: 100, suffix: "+", label: "Flight Hours" },
    { value: 320, suffix: "+", label: "Aerial Shots" },
    { value: 4, suffix: "K", label: "Max Resolution" },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/*  Featured projects (case studies)                                          */
/* -------------------------------------------------------------------------- */

export type Project = {
  slug: string;
  title: string;
  client: string;
  type: string;
  location: string;
  date: string;
  services: string[];
  summary: string;
  challenge: string;
  approach: string;
  outcome: string;
  cover: string;
  coverAlt: string;
  video?: string;
  gallery: { src: string; alt: string }[];
  metrics: { label: string; value: string }[];
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "mountain-adventure-film",
    title: "Mountain Adventure Film",
    client: "Northline Outdoors",
    type: "Brand Film",
    location: "Hunza Valley, Pakistan",
    date: "March 2025",
    services: ["Videography", "Drone", "Editing", "Colour Grading", "Sound Design"],
    summary:
      "A three-day expedition film for an outdoor brand — captured on location across 40km of valley, glacier and ridgeline, then cut into a hero film, six social cutdowns and a stills library.",
    challenge:
      "The client had a great product and no story. They needed a film that sold the feeling of the place without falling back on stock footage or voiceover.",
    approach:
      "I built the film around a single continuous sunrise. Scouted four days ahead, shot handheld and on a gimbal for intimacy, then used drone passes to give the story scale at the top and the end. Everything was graded to one look so the cutdowns matched the hero film.",
    outcome:
      "The hero film ran as a 60-second pre-roll and lifted assisted video completion by 41%. The stills library was reused across two print campaigns and the brand's product pages.",
    cover: photo("project-mountain-adventure", 2000, 1250),
    coverAlt: "Mountain adventure film still showing a climber silhouetted against a glacier ridge",
    video: clips.alpine,
    gallery: [
      { src: photo("project-mountain-adventure", 2000, 1250), alt: "Mountain adventure film still showing a climber silhouetted against a glacier ridge" },
      { src: photo("project-mountain-2", 1400, 1000), alt: "Expedition team crossing a snow field during the shoot" },
      { src: photo("project-mountain-3", 1000, 1400), alt: "Drone view of the valley floor with the crew visible below" },
      { src: photo("project-mountain-4", 1400, 1000), alt: "Close-up of camera and gimbal rigged for a high-angle pass" },
    ],
    metrics: [
      { label: "Production Days", value: "3" },
      { label: "Deliverables", value: "31" },
      { label: "Completion Lift", value: "+41%" },
    ],
    featured: true,
  },
  {
    slug: "coastal-wedding-film",
    title: "Coastal Wedding Film",
    client: "Private Commission",
    type: "Wedding Film",
    location: "Kalam, Pakistan",
    date: "October 2024",
    services: ["Videography", "Photography", "Editing", "Colour Grading"],
    summary:
      "A documentary-style wedding film for a two-day coastal celebration, shot almost entirely handheld with natural sound and two drone passes for the coastline.",
    challenge:
      "The couple wanted presence, not performance. No posed interviews, no staged vows, and no music driving the structure.",
    approach:
      "I shot with two small cameras and a shotgun mic, staying close and quiet. The edit is built from real audio — vows, laughter, the wind off the water — with a drone reveal used exactly once, at the transition from ceremony to reception.",
    outcome:
      "Delivered as a 6-minute film, a 90-second social cut and an 850-frame stills gallery. The couple called it the closest thing to a memory they had.",
    cover: photo("project-coastal-wedding", 2000, 1250),
    coverAlt: "Wedding film still of a couple walking along a coastline at dusk",
    video: clips.cinematic,
    gallery: [
      { src: photo("project-coastal-wedding", 2000, 1250), alt: "Wedding film still of a couple walking along a coastline at dusk" },
      { src: photo("project-coastal-2", 1400, 1000), alt: "Guests gathered on a clifftop during the ceremony" },
      { src: photo("project-coastal-3", 1000, 1400), alt: "Bride's dress detail in soft coastal light" },
      { src: photo("project-coastal-4", 1400, 1000), alt: "Reception dinner table set up at twilight" },
    ],
    metrics: [
      { label: "Film Length", value: "6:20" },
      { label: "Stills Delivered", value: "850" },
      { label: "Crew On Set", value: "1" },
    ],
    featured: true,
  },
  {
    slug: "skyline-property-campaign",
    title: "Skyline Property Campaign",
    client: "Skyline Developers",
    type: "Commercial",
    location: "Islamabad, Pakistan",
    date: "June 2024",
    services: ["Drone", "Videography", "Editing", "Motion Graphics"],
    summary:
      "An aerial-led campaign for three residential towers — one hero film, three tower films, a full 4K drone stills library and six vertical cutdowns.",
    challenge:
      "The towers looked identical from the ground. The campaign needed to make each one feel different, on a tight budget and a fixed launch date.",
    approach:
      "I designed a repeatable aerial shot list — a vertical top-down, a slow orbit and a golden-hour rise — and shot all three towers to that same structure. Grading them to a single look made them read as one campaign.",
    outcome:
      "Delivered nine days before launch. The vertical cutdowns drove 2.3x the client's usual social engagement on property posts.",
    cover: photo("project-skyline-campaign", 2000, 1250),
    coverAlt: "Cinematic drone reveal of a high-rise residential tower at dusk",
    video: clips.aerial,
    gallery: [
      { src: photo("project-skyline-campaign", 2000, 1250), alt: "Cinematic drone reveal of a high-rise residential tower at dusk" },
      { src: photo("project-skyline-2", 1400, 1000), alt: "Top-down aerial geometry of tower rooftops and courtyards" },
      { src: photo("project-skyline-3", 1000, 1400), alt: "Interior apartment living room prepared for the shoot" },
      { src: photo("project-skyline-4", 1400, 1000), alt: "Motion graphics title frame from the campaign film" },
    ],
    metrics: [
      { label: "Towers Covered", value: "3" },
      { label: "Flight Hours", value: "11" },
      { label: "Social Lift", value: "2.3x" },
    ],
    featured: true,
  },
  {
    slug: "atelier-brand-stories",
    title: "Atelier Brand Stories",
    client: "Lumen Studio",
    type: "Documentary",
    location: "Karachi, Pakistan",
    date: "February 2025",
    services: ["Videography", "Interview", "Editing", "Sound Design"],
    summary:
      "A four-part documentary series on the makers behind a lighting design studio, plus a monthly vertical content engine built from the same production days.",
    challenge:
      "A technical product in a technical room — the hardest kind of story to make feel human.",
    approach:
      "I shot interview-led with real tools in frame and hands doing the work. Each episode follows one maker through a single finished piece, so the product explains itself.",
    outcome:
      "Four episodes published over eight weeks. The studio's inbound enquiries from the series outpaced a full year of their previous marketing.",
    cover: photo("project-atelier-stories", 2000, 1250),
    coverAlt: "Documentary series still of a craftsperson working on a lighting fixture",
    video: clips.studio,
    gallery: [
      { src: photo("project-atelier-stories", 2000, 1250), alt: "Documentary series still of a craftsperson working on a lighting fixture" },
      { src: photo("project-atelier-2", 1400, 1000), alt: "Interview setup with two cameras in a workshop" },
      { src: photo("project-atelier-3", 1000, 1400), alt: "Detail of hands assembling a fixture on a workbench" },
      { src: photo("project-atelier-4", 1400, 1000), alt: "Final lit product in a finished interior set" },
    ],
    metrics: [
      { label: "Episodes", value: "4" },
      { label: "Vertical Edits", value: "12" },
      { label: "Shoot Days", value: "2" },
    ],
    featured: true,
  },
];

/* -------------------------------------------------------------------------- */
/*  Process                                                                   */
/* -------------------------------------------------------------------------- */

export const process = {
  eyebrow: "How I Work",
  title: "A process you can plan around.",
  steps: [
    { id: "01", title: "Plan", detail: "Understand the idea and requirements.", note: "Discovery call, references, shot list and a clear delivery plan." },
    { id: "02", title: "Capture", detail: "Photography, videography and drone footage.", note: "Full crew where needed, always a small efficient one otherwise." },
    { id: "03", title: "Edit", detail: "Professional editing, color grading and sound.", note: "Story structure first, look second, detail third." },
    { id: "04", title: "Refine", detail: "Review and improve the final result.", note: "Two structured revision rounds included in every project." },
    { id: "05", title: "Deliver", detail: "High-quality final content ready for use.", note: "Masters, cutdowns, stills and social exports, organised and delivered." },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/*  Behind the scenes                                                         */
/* -------------------------------------------------------------------------- */

export const behindTheScenes = {
  eyebrow: "Behind The Scenes",
  title: "The work behind the work.",
  description:
    "Grip, gaffer, gimbal, timeline. The unglamorous part of making something look effortless.",
  items: [
    { id: "b1", title: "Camera & Monitor", caption: "Checking framing before the take", src: photo("bts-camera-monitor", 1200, 900), alt: "Camera operator checking a monitor while filming a location" },
    { id: "b2", title: "Drone Pre-flight", caption: "Compass, batteries, airspace check", src: photo("bts-drone-preflight", 900, 1200), alt: "Drone operator running pre-flight checks on a controller" },
    { id: "b3", title: "Edit Suite", caption: "Where the film actually gets made", src: photo("bts-edit-suite", 1200, 900), alt: "Editing workstation with a colour grading timeline open on a large display" },
    { id: "b4", title: "Location Scouting", caption: "Finding the light before the crew arrives", src: photo("bts-location-scout", 1200, 900), alt: "Scout checking light direction at an outdoor location" },
    { id: "b5", title: "Camera Build", caption: "Rigged for a high-angle gimbal pass", src: photo("bts-camera-build", 900, 1200), alt: "Camera rigged on a gimbal with follow focus" },
    { id: "b6", title: "On Set", caption: "Small crew, full attention", src: photo("bts-on-set", 1200, 900), alt: "Film crew working on set with a camera on a tripod" },
    { id: "b7", title: "Colour Grading", caption: "Building the look, node by node", src: photo("bts-grading", 1200, 900), alt: "Colourist adjusting scopes on a grading monitor" },
    { id: "b8", title: "Wrap", caption: "Last shot of the day, always the best one", src: photo("bts-wrap", 900, 1200), alt: "Crew packing camera equipment into cases at the end of a shoot" },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/*  Equipment                                                                 */
/* -------------------------------------------------------------------------- */

export const equipment = {
  eyebrow: "Equipment",
  title: "The kit behind the frames.",
  description: "A deliberate, maintained kit — chosen for reliability, colour consistency and the ability to work fast in difficult light.",
  groups: [
    { id: "camera", title: "Cameras", items: [
      { name: "Sony FX3", spec: "Full-frame cinema line · 4K 120p" },
      { name: "Sony A7S III", spec: "Low-light workhorse · 4K 120p" },
      { name: "Canon R6 Mark II", spec: "24MP stills · 6K oversampled 4K" },
    ] },
    { id: "lenses", title: "Lenses", items: [
      { name: "Sony 24-70mm GM II", spec: "Standard zoom · constant f/2.8" },
      { name: "Sigma 35mm Art", spec: "Low-light prime · f/1.4" },
      { name: "Sony 70-200mm GM II", spec: "Telephoto · compressed portraits" },
      { name: "Zeiss 16mm T*", spec: "Ultra-wide prime · f/2.8" },
    ] },
    { id: "aerial", title: "Aerial", items: [
      { name: "DJI Mavic 3 Pro", spec: "Triple camera · 5.1K/60p" },
      { name: "DJI Air 3S", spec: "Dual camera · 4K/100p HDR" },
      { name: "ND Filter Set", spec: "ND8 / ND16 / ND32 · exposure control" },
    ] },
    { id: "support", title: "Support & Sound", items: [
      { name: "DJI RS 4 Pro", spec: "3-axis gimbal · 4.5kg payload" },
      { name: "Sachtler Flowtech 75", spec: "Fluid head · carbon tripod" },
      { name: "RØDE NTG5", spec: "Shotgun microphone · RF-bias" },
      { name: "Zoom F6", spec: "6-channel field recorder · 32-bit float" },
    ] },
    { id: "lighting", title: "Lighting", items: [
      { name: "Aputure 600d Pro", spec: "Daylight COB · 600W" },
      { name: "Aputure MC Pro", spec: "RGBWW pocket light" },
      { name: "5-in-1 Reflector", spec: "Portable bounce · 90cm" },
    ] },
    { id: "post", title: "Post Suite", items: [
      { name: "Mac Studio M3 Ultra", spec: "Colour · 4K multi-stream" },
      { name: "DaVinci Resolve Studio", spec: "Editing · Fusion · Fairlight" },
      { name: "Calibrated 4K Display", spec: "Wide-gamut reference monitor" },
    ] },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/*  Testimonials                                                              */
/* -------------------------------------------------------------------------- */

export const testimonials = {
  eyebrow: "Testimonials",
  title: "What clients say.",
  items: [
    {
      id: "t1",
      name: "Daniel Rahim",
      role: "Brand Manager",
      company: "Northline Outdoors",
      projectType: "Mountain Adventure Film",
      quote:
        "Asim turned a product shoot into a film we still use three years later. The drone work gave it scale, the grade gave it a look, and the process was genuinely easy.",
      avatar: photo("client-daniel", 200, 200),
    },
    {
      id: "t2",
      name: "Ayesha & Bilal",
      role: "Newlyweds",
      company: "Wedding Film",
      projectType: "Coastal Wedding Film",
      quote:
        "We asked for no staged moments and he gave us exactly that. Watching it back felt like remembering the day rather than watching a production.",
      avatar: photo("client-ayesha", 200, 200),
    },
    {
      id: "t3",
      name: "Sana Mahmood",
      role: "Creative Director",
      company: "Lumen Studio",
      projectType: "Atelier Brand Stories",
      quote:
        "He understands a technical product and a human story at the same time. The series outperformed a full year of our previous marketing.",
      avatar: photo("client-sana", 200, 200),
    },
    {
      id: "t4",
      name: "Omar Sheikh",
      role: "Founder",
      company: "Skyline Developers",
      projectType: "Property Campaign",
      quote:
        "Delivered nine days early, three towers, one consistent look and cutdowns our social team could publish without touching. Faultless.",
      avatar: photo("client-omar", 200, 200),
    },
    {
      id: "t5",
      name: "Hina Farooq",
      role: "Events Lead",
      company: "Aurora Foundation",
      projectType: "Gala Night Coverage",
      quote:
        "Six cameras, two hundred guests and a same-night highlight cut. He ran it like a newsroom and still found the emotional moments.",
      avatar: photo("client-hina", 200, 200),
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/*  Contact                                                                   */
/* -------------------------------------------------------------------------- */

export const contact = {
  eyebrow: "Contact",
  title: "Have a Story Worth Capturing?",
  description: "Let's turn your idea into something people remember.",
  primaryCta: { label: "Start a Project", href: "#brief" },
  secondaryCta: { label: "Contact Me", href: `mailto:${site.email}` },
  success: {
    title: "Brief received.",
    message:
      "Thanks — your project brief is in. I reply to every enquiry within one business day.",
  },
  form: {
    services: [
      "Videography",
      "Photography",
      "Video Editing",
      "Drone / Aerial",
      "Creative Editing",
      "Full Production",
    ],
    projectTypes: [
      "Wedding Film",
      "Brand / Commercial",
      "Corporate",
      "Event Coverage",
      "Documentary",
      "Social Content",
      "Other",
    ],
    budgets: [
      "Under $500",
      "$500 – $1,500",
      "$1,500 – $5,000",
      "$5,000 – $15,000",
      "$15,000+",
      "Not sure yet",
    ],
  },
} as const;

/* -------------------------------------------------------------------------- */
/*  Footer                                                                    */
/* -------------------------------------------------------------------------- */

export const footer = {
  blurb:
    "Cinematic video, photography and aerial coverage — shot, flown and edited by one person who cares about the last frame.",
  quickLinks: [
    { label: "Services", href: "#services" },
    { label: "Photography", href: "#photography" },
    { label: "Films", href: "#films" },
    { label: "Process", href: "#process" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/*  SEO                                                                       */
/* -------------------------------------------------------------------------- */

export const seo = {
  title: `${site.name} — ${site.brand} | Videographer, Photographer & Drone Operator`,
  description:
    "Khanography is the cinematic portfolio of Asim Khan — videographer, video editor, photographer, drone operator and creative editor creating films, photography and aerial footage that turn moments into stories.",
  keywords: [
    "videographer",
    "video editor",
    "photographer",
    "drone operator",
    "cinematic film",
    "wedding videography",
    "aerial cinematography",
    "colour grading",
    "Khanography",
    "Asim Khan",
  ],
} as const;

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export const heroPoster = photo("khanography-hero-mountains", 1600, 900);
export const ogImage = photo("khanography-og", 1200, 630);
