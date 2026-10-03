/**
 * ---------------------------------------------------------------------------
 * SINGLE SOURCE OF TRUTH
 * ---------------------------------------------------------------------------
 * Every headline, image, video, project and form option lives in this file.
 *
 * IMAGES : your own photos live in /public/images (nature1.jpg, travel1.jpg,
 *          lifestyle1.jpg, img-2.jpg, hero.jpg …). Use `img("name")` below.
 * VIDEOS : YouTube IDs are listed in `longIds` and `shortIds`.
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
  location: "Timergara, Dir Lower, Pakistan",
  locationShort: "Timergara",
  availability: "Available for projects worldwide",
  url: "https://khanography.vercel.app",
  email: "khanography1@gmail.com",
  phone: "+92 348 0603071",
  yearsExperience: 4,
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/khanography__/?hl=en", handle: "@khanography__" },
    { label: "YouTube", href: "https://www.youtube.com/@khanography1", handle: "@khanography1" },
    { label: "Facebook", href: "https://www.facebook.com/khanography", handle: "/khanography" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/khanography-b1959734a/", handle: "/khanography" },
    { label: "Tiktok", href: "https://www.tiktok.com/@khanography_?lang=en", handle: "@khanography_" },
    { label: "Pinterest", href: "https://www.pinterest.com/khanography/", handle: "/khanography" },
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

/** Placeholder photo (only used for testimonial avatars). */
const photo = (seed: string, w: number, h: number, grayscale = false) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}${grayscale ? "?grayscale" : ""}`;

/** Your own photo from /public/images, by file name without extension.
 *  The image component tries .jpg, .jpeg, .png and .webp automatically,
 *  so you never need to write the extension. */
const img = (name: string) => `/images/${name}.jpg`;

/** Gallery from numbered files. `first` = number to start from (default 1).
 *  Example: gallerySet("dc", 8, "DC event", 2) -> dc2 … dc9 */
const gallerySet = (prefix: string, count: number, label: string, first = 1) =>
  Array.from({ length: count }, (_, i) => ({
    src: img(`${prefix}${first + i}`),
    alt: `${label} ${i + 1}`,
  }));

/** YouTube thumbnail for a video id. */
const yt = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

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
  background: "/images/hero.jpg",
  poster: "/images/hero.jpg",
  video: "",
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
  bio: "Creative media professional with experience in videography, drone operations, video editing, and social media content creation. Skilled in producing engaging visual content for brands, businesses, and social media platforms.",
  bioSecondary:
    "I handle the full pipeline — concept, shooting, aerial coverage, editing, colour and sound — so the final film feels like one continuous thought rather than a collection of clips.",
  portrait: img("img-1"),
  details: [
    { label: "Based In", value: site.location },
    { label: "Experience", value: `${site.yearsExperience}+ Years` },
    { label: "Projects", value: "100+ Completed" },
    { label: "Clients", value: "50+ Worldwide" },
  ],
  specialties: [
    "Videography",
    "Drone Operation",
    "Video Editing",
    "Social Media Content",
    "Reels Production",
    "Photography",
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
  portrait: img("img-48"),
  portraitSecondary: img("portrait3"),
  paragraphs: [
    "Hello! My name is Talha Khan, and I am a passionate Videographer, Video Editor, Photographer, and Drone Operator from Koherai, Malakand (Lower Dir), Pakistan.",
    "With a strong creative vision and technical skills, I specialize in capturing and transforming moments into powerful visual stories. I currently work with Lewal Technologies, where I contribute to professional video production, photography, and drone projects.",
    "I have over 4 years of hands-on experience in the media and creative industry, creating content for brands, businesses and social media platforms.",
  ],
  philosophy:
    "Every project starts with a feeling. The camera, the edit, the drone — they're all in service of it.",
  experience: [
    {
      period: "Present · 4 years",
      role: "Production Manager & Professional Videographer",
      place: "Lewal Technologies",
      note: "Leading professional video production, photography, drone projects and social media management.",
    },
    {
      period: "Freelance",
      role: "Social Media Content Creator",
      place: "Imdad Finance Guide",
      note: "Creating engaging social media content and short-form video.",
    },
    {
      period: "Freelance",
      role: "Reels Creator",
      place: "Branded Clothe Shop",
      note: "Reels and promotional content for a clothing brand.",
    },
    {
      period: "Freelance",
      role: "Reels Creator",
      place: "Super Star Parda Showroom",
      note: "Reels and showroom content for social media.",
    },
  ],
  skills: [
    { name: "Videography", level: 92 },
    { name: "Drone Operation", level: 90 },
    { name: "Video Editing", level: 92 },
    { name: "Social Media Content Creation", level: 90 },
    { name: "Reels Production", level: 94 },
    { name: "Content Branding", level: 85 },
    { name: "Photography", level: 88 },
    { name: "Creative Storytelling", level: 90 },
  ],
  facts: [
    { label: "Location", value: site.location },
    { label: "Languages", value: "English · Urdu · Pashto" },
    { label: "Experience", value: `${site.yearsExperience}+ years` },
    { label: "Also known as", value: "Khanography" },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/*  Services                                                                  */
/* -------------------------------------------------------------------------- */

export const services = {
  eyebrow: "What I Do",
  title: "One creator for the whole story.",
  description:
    "Photography, film, aerials and post-production in one place — so your project stays consistent from the first idea to the final export.",
  items: [
    {
      id: "videography",
      title: "Videography",
      icon: "Clapperboard",
      image: img("travel1"),
      description:
        "Professional event, commercial, wedding, corporate and cinematic video production.",
      points: ["Brand & commercial films", "Wedding films", "Corporate & event coverage"],
      href: "#films",
    },
    {
      id: "photography",
      title: "Photography",
      icon: "Camera",
      image: img("img-2"),
      description:
        "Portraits, events, products, landscapes, weddings and professional photography.",
      points: ["Portraits", "Event galleries", "Product & lifestyle"],
      href: "#photography",
    },
    {
      id: "editing",
      title: "Video Editing",
      icon: "Scissors",
      image: img("img-15"),
      description:
        "Professional color grading, transitions, sound design, storytelling and cinematic editing.",
      points: ["Colour grading", "Sound & music", "Delivery for every platform"],
      href: "#editing",
    },
    {
      id: "drone",
      title: "Drone Operator",
      icon: "Plane",
      image: img("img-23"),
      description: "Professional aerial photography and cinematic drone footage.",
      points: ["4K aerial capture", "Landscape & real estate", "Events & travel"],
      href: "#drone",
    },
    {
      id: "creative",
      title: "Creative Editing",
      icon: "Sparkles",
      image: img("img-7"),
      description:
        "Short-form videos, social media content, reels, promotional videos and creative visual editing.",
      points: ["Reels, TikTok & Shorts", "Captions & motion", "Content packages"],
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
  "Government",
  "Corporate",
  "Real Estate",
  "Nature",
  "Travel",
  "Products",
  "Lifestyle",
] as const;

export type PhotoCategory = Exclude<(typeof photoCategories)[number], "All">;

const P = { width: 800, height: 1200 }; // portrait
const L = { width: 1200, height: 800 }; // landscape

const basePhotos: PhotoItem[] = [
  // Portraits
  { id: "p01", title: "Studio Portrait", category: "Portraits", src: img("img-2"), alt: "Portrait of a bearded man in soft light", ...P },
  { id: "p02", title: "Behind the Lens", category: "Portraits", src: img("portrait3"), alt: "Photographer holding a camera", ...P },
  { id: "p03", title: "Classic Look", category: "Portraits", src: img("img-7"), alt: "Portrait of a young man in a black waistcoat", ...P },
  { id: "p04", title: "Warm Smile", category: "Portraits", src: img("img-15"), alt: "Smiling man in a white shirt", ...P },
  { id: "p05", title: "Young Eyes", category: "Portraits", src: img("img-31"), alt: "Portrait of a smiling boy", ...P },
  { id: "p06", title: "Quiet Pose", category: "Portraits", src: img("img-4"), alt: "Boy sitting in a grey kurta", ...P },
  { id: "p07", title: "Close Up", category: "Portraits", src: img("img-35"), alt: "Boy resting his face on his hand", ...L },
  { id: "p08", title: "Sunny Cap", category: "Portraits", src: img("img-36"), alt: "Smiling boy in a cap", ...L },
  { id: "p09", title: "Blue Hour Ridge", category: "Portraits", src: img("portrait5"), alt: "Man in a blue jacket on a rock at sunset", ...P },
  { id: "p10", title: "Rock Perch", category: "Portraits", src: img("portrait4"), alt: "Man sitting on a rock above the valley", ...P },
  { id: "p11", title: "Sunset Silhouette", category: "Portraits", src: img("portrait7"), alt: "Man sitting in silhouette at sunset", ...P },

  // Weddings
  { id: "p12", title: "Wedding Car", category: "Weddings", src: img("wedding1"), alt: "Car with pink lights on a forest road", ...P },
  { id: "p13", title: "Wedding Day", category: "Weddings", src: img("wedding2"), alt: "Two boys standing together", ...P },

  // Events
  { id: "p14", title: "Match Day", category: "Events", src: img("event2"), alt: "Football players competing for the ball", ...L },
  { id: "p15", title: "Village Football", category: "Events", src: img("event1"), alt: "Local football match on an open ground", ...L },
  { id: "p16", title: "Under the Hills", category: "Events", src: img("event3"), alt: "Football match with the town in the background", ...L },
  { id: "p17", title: "Kick Off", category: "Events", src: img("event4"), alt: "Players moving across the pitch", ...L },
  { id: "p18", title: "On Stage", category: "Events", src: img("event5"), alt: "Speaker presenting at an event", ...L },
  { id: "p19", title: "Community Gathering", category: "Events", src: img("lifestyle1"), alt: "Group of people posing together", ...L },
  { id: "p20", title: "Peace Banner", category: "Events", src: img("lifestyle2"), alt: "People holding a banner", ...L },
  { id: "p21", title: "Playing Field", category: "Events", src: img("img-32"), alt: "Children playing football on a field", ...L },

  // Nature
  { id: "p22", title: "Snow Peaks", category: "Nature", src: img("nature3"), alt: "Snow-covered mountain above pine forest", ...P },
  { id: "p23", title: "Valley View", category: "Nature", src: img("nature10"), alt: "Green mountain valley with scattered houses", ...L },
  { id: "p24", title: "Green Valley", category: "Nature", src: img("nature2"), alt: "Aerial view of a town in a green valley", ...L },
  { id: "p25", title: "Town at Sunset", category: "Nature", src: img("nature1"), alt: "Town and river at sunset", ...L },
  { id: "p26", title: "Sunset Ridge", category: "Nature", src: img("nature5"), alt: "Mountain ridge silhouetted at sunset", ...P },
  { id: "p27", title: "Camp Meadow", category: "Nature", src: img("nature4"), alt: "Tent pitched in a mountain meadow", ...L },
  { id: "p28", title: "Cow on the Hill", category: "Nature", src: img("nature6"), alt: "Cow resting on a grassy hill", ...L },
  { id: "p29", title: "Moonlit Town", category: "Nature", src: img("nature7"), alt: "Town lights under a full moon", ...L },
  { id: "p30", title: "Night Lights", category: "Nature", src: img("nature8"), alt: "Aerial view of a town at night", ...L },
  { id: "p31", title: "Hillside Town", category: "Nature", src: img("nature9"), alt: "Town spread across a hillside", ...L },
  { id: "p32", title: "Forest House", category: "Nature", src: img("nature11"), alt: "House among trees on a forested slope", ...P },
  { id: "p33", title: "Waterfall Trail", category: "Nature", src: img("img-17"), alt: "Man standing beside a waterfall", ...P },
  { id: "p34", title: "Dark Slopes", category: "Nature", src: img("img-9"), alt: "Dark mountain slope with pine trees", ...P },
  { id: "p35", title: "Forest Detail", category: "Nature", src: img("portrait6"), alt: "Close-up of a mossy log in the forest", ...P },

  // Travel
  { id: "p36", title: "Mountain Walk", category: "Travel", src: img("travel1"), alt: "Man in a red jacket in the mountains", ...L },
  { id: "p37", title: "Meadow Stop", category: "Travel", src: img("travel2"), alt: "Man standing in a green meadow below snowy peaks", ...P },
  { id: "p38", title: "Friends on the Grass", category: "Travel", src: img("travel3"), alt: "Group sitting together in a mountain meadow", ...L },
  { id: "p39", title: "Tent View", category: "Travel", src: img("travel4"), alt: "View of mountains from inside a tent", ...P },
  { id: "p40", title: "Drone Overhead", category: "Travel", src: img("travel5"), alt: "Person resting on a hillside with a drone overhead", ...P },
  { id: "p41", title: "Hill Rest", category: "Travel", src: img("travel6"), alt: "People relaxing on a hillside", ...L },
  { id: "p42", title: "Mountain Village", category: "Travel", src: img("img-21"), alt: "Village built on a mountain slope", ...P },
  { id: "p43", title: "Hillside Houses", category: "Travel", src: img("img-26"), alt: "Houses on a hillside", ...L },
  { id: "p44", title: "Drone at Dusk", category: "Travel", src: img("img-23"), alt: "Drone flying above a mountain at dusk", ...P },
  { id: "p45", title: "Drone Selfie", category: "Travel", src: img("img-25"), alt: "Selfie with a drone above the mountains", ...P },

  // Products
  { id: "p46", title: "Red Apples", category: "Products", src: img("img-37"), alt: "Fresh red apples close-up", ...L },
  { id: "p47", title: "Clear Water", category: "Products", src: img("portrait2"), alt: "Water bottles in a stack", ...P },

  // Lifestyle
  { id: "p48", title: "Golden Tree", category: "Lifestyle", src: img("portrait1"), alt: "Autumn tree trunk with golden leaves", ...L },
  { id: "p49", title: "Apple Smile", category: "Lifestyle", src: img("lifestyle3"), alt: "Girl smiling with a red apple", ...P },
  { id: "p50", title: "Apple Picking", category: "Lifestyle", src: img("img-39"), alt: "Girl holding an apple", ...P },
  { id: "p51", title: "Fresh Apples", category: "Lifestyle", src: img("img-43"), alt: "Boy holding a red apple", ...L },
  { id: "p52", title: "Apple Harvest", category: "Lifestyle", src: img("lifestyle9"), alt: "Man holding a red apple", ...P },
  { id: "p53", title: "Hillside View", category: "Lifestyle", src: img("lifestyle4"), alt: "Mountain landscape with houses in the valley", ...L },
  { id: "p54", title: "Hill Houses", category: "Lifestyle", src: img("lifestyle5"), alt: "Houses on a forested hillside", ...P },
  { id: "p55", title: "Friends in Green", category: "Lifestyle", src: img("lifestyle6"), alt: "Two young men standing among green trees", ...P },
  { id: "p56", title: "Generations", category: "Lifestyle", src: img("lifestyle7"), alt: "Elderly man with a boy", ...P },
  { id: "p57", title: "Into the Green", category: "Lifestyle", src: img("lifestyle8"), alt: "Man walking through green hills", ...P },
];

/** Builds many photos from numbered files, e.g. dc2 … dc9.
 *  `first` = the first file number to use (default 1). */
const series = (
  prefix: string,
  count: number,
  category: PhotoCategory,
  title: string,
  alt: string,
  size: { width: number; height: number },
  startId: number,
  first = 1,
): PhotoItem[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `p${startId + i}`,
    title: `${title} ${i + 1}`,
    category,
    src: img(`${prefix}${first + i}`),
    alt: `${alt} ${i + 1}`,
    ...size,
  }));

/**
 * dc1 / dyo1 / lewal1 / pakqatar / paradise are LOGOS (used as project covers),
 * so the photo galleries start from dc2 / dyo2.
 */
export const photos: PhotoItem[] = [
  ...basePhotos,
  ...series("dc", 8, "Government", "DC Office Event", "Event covered for the Deputy Commissioner Office, Lower Dir", L, 100, 2), // dc2 … dc9
  ...series("dyo", 6, "Government", "Youth Programme", "Youth programme for the District Youth Officer, Lower Dir", L, 200, 2), // dyo2 … dyo7
  ...series("paradise", 1, "Real Estate", "Paradise City Nowshera", "Paradise City Nowshera visual media", L, 400), // paradise1
];

export const photography = {
  eyebrow: "Photography",
  title: "Photography That Tells a Story.",
  description:
    "Stills that hold the same emotion as the film — portraits, honest documentary frames, landscapes and product work.",
} as const;

/* -------------------------------------------------------------------------- */
/*  Videography showcase (YouTube)                                            */
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
  /** "long" = normal YouTube video, "short" = YouTube Short / reel */
  format: "long" | "short";
  youtubeId: string;
  year: string;
  client: string;
  thumbnail: string;
  alt: string;
  /** Watch link (opens on YouTube) */
  src: string;
  duration: string;
  aspect: "16/9" | "2.39/1" | "4/5" | "9/16";
  description: string;
  services: string[];
};

/** Long videos — rename the titles to your real video names. */
const longVideos = [
  { id: "1YpH0SrBhb0", title: "Film 1" },
  { id: "ebPRAwl7pX0", title: "Film 2" },
  { id: "BZH098p5PxI", title: "Film 3" },
  { id: "xLDPNE9Sfe0", title: "Film 4" },
  { id: "tyoN0fnZ_RQ", title: "Film 5" },
  { id: "7-HviWQphEA", title: "Film 6" },
];

/** Shorts / reels — rename the titles to your real reel names. */
const shortVideos = [
  { id: "g2Omk3ZLo3M", title: "Reel 1" },
  { id: "w9e-PdTTe48", title: "Reel 2" },
  { id: "wsOmjKyTjzs", title: "Reel 3" },
  { id: "cA4VzNs1ezI", title: "Reel 4" },
  { id: "dai2HcRXW8o", title: "Reel 5" },
  { id: "r-FwZq2WjTs", title: "Reel 6" },
  { id: "bjguyctEMZc", title: "Reel 7" },
];

export const videoProjects: VideoProject[] = [
  ...longVideos.map(
    (v, i): VideoProject => ({
      id: `l${i + 1}`,
      title: v.title,
      category: "Commercial",
      format: "long",
      youtubeId: v.id,
      year: "2025",
      client: "Khanography",
      thumbnail: yt(v.id),
      alt: `${v.title} — video by Khanography`,
      src: `https://www.youtube.com/watch?v=${v.id}`,
      duration: "",
      aspect: "16/9",
      description: "A video produced, shot and edited by Khanography.",
      services: ["Videography", "Editing"],
    }),
  ),
  ...shortVideos.map(
    (v, i): VideoProject => ({
      id: `s${i + 1}`,
      title: v.title,
      category: "Social Media",
      format: "short",
      youtubeId: v.id,
      year: "2025",
      client: "Khanography",
      thumbnail: yt(v.id),
      alt: `${v.title} — short reel by Khanography`,
      src: `https://www.youtube.com/shorts/${v.id}`,
      duration: "",
      aspect: "9/16",
      description: "A short-form reel shot and edited by Khanography.",
      services: ["Reels", "Creative Editing"],
    }),
  ),
];

export const videography = {
  eyebrow: "Videography",
  title: "Moving Images. Real Stories.",
  description:
    "Long films and short reels — shot, edited and delivered in the formats a modern audience actually watches.",
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
    beforeAlt: "Ungraded frame of a mountain sunrise, flat and grey",
    afterAlt: "The same frame after colour grading",
    note: "Log to Rec.709 with highlight rolloff and a gentle film look.",
    tools: ["DaVinci Resolve", "Premiere Pro"],
  },
  {
    id: "ba2",
    title: "Studio Portrait",
    category: "Skin Tone",
    before: gradeSeed(2),
    after: photo("khanography-grade-2", 1400, 900),
    beforeAlt: "Ungraded portrait with mixed colour temperature",
    afterAlt: "The same portrait with balanced skin tones",
    note: "Balanced skin tones with controlled contrast.",
    tools: ["Vector Scope", "Qualifier"],
  },
  {
    id: "ba3",
    title: "Desert Highway",
    category: "Cinematic Edit",
    before: gradeSeed(3),
    after: photo("khanography-grade-3", 1400, 900),
    beforeAlt: "Flat handheld footage of a highway",
    afterAlt: "The same footage graded into a cinematic look",
    note: "Reframed, stabilised and graded into a widescreen look.",
    tools: ["Reframe", "Stabiliser"],
  },
  {
    id: "ba4",
    title: "Reel: Studio Tour",
    category: "Reels / Shorts",
    before: gradeSeed(4),
    after: photo("khanography-grade-4", 900, 1600),
    beforeAlt: "Raw vertical phone footage",
    afterAlt: "The same footage edited into a fast-paced reel",
    note: "Hook-first pacing, captions and beat-matched cuts.",
    tools: ["Premiere Pro", "Motion Graphics"],
  },
];

export const editingSkills = [
  { title: "Colour Grading", detail: "Consistent, cinematic looks across every deliverable." },
  { title: "Cinematic Editing", detail: "Story-first cutting, speed ramps and clean pacing." },
  { title: "Reels & Shorts", detail: "Vertical-first edits built for retention with strong hooks and captions." },
  { title: "Sound Design", detail: "Dialogue cleanup, ambience, music editing and a clean final mix." },
  { title: "Motion & Graphics", detail: "Titles, lower thirds and logo animations designed in the edit." },
  { title: "Delivery & Master", detail: "Platform-ready exports for web and every social aspect ratio." },
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
    "Smooth establishing passes, clean top-down shots and cinematic reveals that give a project scale.",
  hero: img("nature1"),
  heroAlt: "Aerial view of a town and river at sunset",
  video: "",
  capabilities: [
    { title: "Landscape Aerials", detail: "Establishing shots, ridgelines and scale-setting reveals." },
    { title: "Real Estate", detail: "4K exteriors and vertical social cutdowns." },
    { title: "Events", detail: "Wedding and event aerials flown safely." },
    { title: "Travel", detail: "Location storytelling for tourism and productions." },
  ],
  gallery: [
    { id: "a1", title: "Valley Town", src: img("nature2"), alt: "Aerial view of a town in a green valley" },
    { id: "a2", title: "Drone at Dusk", src: img("img-23"), alt: "Drone flying above a mountain at dusk" },
    { id: "a3", title: "Hillside Houses", src: img("img-26"), alt: "Aerial view of houses on a hillside" },
    { id: "a4", title: "Sunset Ridge", src: img("nature5"), alt: "Mountain ridge silhouetted at sunset" },
    { id: "a5", title: "Town and Hills", src: img("nature10"), alt: "Aerial view of a town surrounded by hills" },
    { id: "a6", title: "Mountain Village", src: img("img-21"), alt: "Village built on a mountain slope" },
  ],
  stats: [
    { value: 100, suffix: "+", label: "Aerial Shots" },
    { value: 4, suffix: "K", label: "Max Resolution" },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/*  Featured projects (case studies) — edit these with your real work         */
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
  /** "contain" = logo shown whole on white, "cover" (default) = photo fills the card */
  coverFit?: "cover" | "contain";
  video?: string;
  gallery: { src: string; alt: string }[];
  metrics: { label: string; value: string }[];
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "deputy-commissioner-lower-dir",
    title: "Deputy Commissioner Lower Dir",
    client: "Office of the Deputy Commissioner, Lower Dir",
    type: "Government Media",
    location: "Lower Dir, Khyber Pakhtunkhwa",
    date: "Ongoing",
    services: ["Photography", "Videography", "Drone", "Video Editing", "Event Coverage", "Social Media"],
    summary:
      "Professional photography, video, drone and editing for official events, public activities, development initiatives and community programs of the DC Office, Lower Dir.",
    challenge:
      "Government events need visual content that is both professional and informative. The goal was to capture important moments, people, places and activities to an official standard, ready for documentation and digital platforms.",
    approach:
      "Each assignment was planned around the event. Photography covered visits, meetings, ceremonies and public events. Videography gave a cinematic, documentary style. Drone shots showed locations, gatherings and landscapes from above. Editing added sequencing, transitions, music, colour and sound. Process: Planning, Shoot, Drone Coverage, Editing, Color & Sound, Final Delivery.",
    outcome:
      "A collection of professional photographs and videos for the DC Office, plus social-media-ready content. The work built strong experience in official event coverage, aerial cinematography and fast-paced production.",
    cover: img("dc1"),
    coverAlt: "Deputy Commissioner Office Lower Dir logo",
    coverFit: "contain",
    gallery: gallerySet("dc", 8, "DC Office event", 2), // dc2 … dc9
    metrics: [
      { label: "My Role", value: "Photo · Video · Drone" },
      { label: "Tools", value: "Premiere Pro · CapCut · Canva" },
      { label: "Type", value: "Official Events" },
    ],
    featured: true,
  },
  {
    slug: "district-youth-officer",
    title: "District Youth Officer",
    client: "District Youth Officer, Lower Dir",
    type: "Youth Programs",
    location: "Lower Dir, Khyber Pakhtunkhwa",
    date: "Ongoing",
    services: ["Photography", "Videography", "Video Editing", "Social Media"],
    summary:
      "Photo and video coverage of youth programs, events and activities for the District Youth Officer, Lower Dir.",
    challenge:
      "Youth events are busy and full of energy. The goal was to show the people and the spirit of each program clearly.",
    approach:
      "Planned coverage for each event, shot photos and video on the day, then edited clean videos and photo sets for social media and records.",
    outcome:
      "A set of event photographs and videos used to share youth programs with the public.",
    cover: img("dyo1"),
    coverAlt: "District Youth Officer Lower Dir logo",
    coverFit: "contain",
    gallery: gallerySet("dyo", 6, "Youth programme", 2), // dyo2 … dyo7
    metrics: [
      { label: "My Role", value: "Photo · Video" },
      { label: "Deliverables", value: "Photos + Videos" },
      { label: "Type", value: "Youth Events" },
    ],
    featured: true,
  },
  {
    slug: "pak-qatar-takaful-timergara",
    title: "Pak Qatar Takaful Timergara",
    client: "Pak Qatar Takaful, Timergara",
    type: "Digital Content & Social Media",
    location: "Timergara, Khyber Pakhtunkhwa",
    date: "Ongoing",
    services: [
      "Photography",
      "Videography",
      "Video Editing",
      "Social Media Management",
      "Content Creation",
      "Digital Branding",
    ],
    summary:
      "Professional financial and takaful-related content for Pak Qatar Takaful Timergara through Imdad Finance Guide, including educational videos, promotional content, photography, video editing and social media content.",
    challenge:
      "Insurance and takaful topics can feel complex. The content needed to explain them in a clear, trustworthy and simple way for everyday people on social media.",
    approach:
      "I handle the full process through Imdad Finance Guide: Planning, Content Creation, Shooting, Editing, Publishing and Social Media Management.",
    outcome:
      "A steady flow of educational videos, promotional content and photographs that keep the Pak Qatar Takaful brand clear and consistent across its digital platforms.",
    cover: img("pakqatar"),
    coverAlt: "Pak Qatar Takaful Timergara logo",
    coverFit: "contain",
    gallery: [{ src: img("pakqatar"), alt: "Pak Qatar Takaful Timergara" }],
    metrics: [
      { label: "My Role", value: "Creator · Videographer · Editor · Manager" },
      { label: "Platform", value: "Imdad Finance Guide" },
      { label: "Type", value: "Digital Content" },
    ],
    featured: true,
  },
  {
    slug: "lewal-technologies",
    title: "Lewal Technologies",
    client: "Lewal Technologies",
    type: "Production & Digital Media",
    location: "Pakistan",
    date: "4 Years",
    services: [
      "Photography",
      "Videography",
      "Drone",
      "Video Editing",
      "Social Media Management",
      "Digital Branding",
    ],
    summary:
      "Four years as Production Manager & Professional Videographer, managing visual content production and digital media for Lewal Technologies.",
    challenge:
      "Keeping a steady flow of professional content across photography, video, drone and social media, all with a consistent look and brand.",
    approach:
      "I manage the complete content process: planning, production, photography and videography, drone coverage, editing, social media management and publishing.",
    outcome:
      "Four years of hands-on experience in production management, cinematic videography, drone operations, post-production, digital branding and visual storytelling.",
    cover: img("lewal1"),
    coverAlt: "Lewal Technologies logo",
    coverFit: "contain",
    gallery: gallerySet("lewal", 1, "Lewal Technologies production"),
    metrics: [
      { label: "Position", value: "Production Manager" },
      { label: "Experience", value: "4 Years" },
      { label: "Scope", value: "Photo · Video · Drone · Social" },
    ],
    featured: true,
  },
  {
    slug: "paradise-city-nowshera",
    title: "Paradise City Nowshera",
    client: "Paradise City, Nowshera",
    type: "Visual Media",
    location: "Nowshera, Khyber Pakhtunkhwa",
    date: "2025",
    services: ["Photography", "Videography", "Drone", "Video Editing", "Social Media"],
    summary:
      "Professional photography, cinematic video and aerial drone footage showcasing the location, development, surroundings and environment of Paradise City Nowshera.",
    challenge:
      "Showing the scale, setting and surroundings of a housing development clearly and attractively.",
    approach:
      "Planning, shooting on the ground, drone coverage from above, then editing and final delivery.",
    outcome:
      "Photos, cinematic video and aerial footage ready for digital platforms.",
    cover: img("paradise"),
    coverAlt: "Paradise City Nowshera logo",
    coverFit: "contain",
    gallery: [
      { src: img("paradise1"), alt: "Paradise City Nowshera road and aerial view" },
      { src: img("nature9"), alt: "Town spread across a hillside" },
      { src: img("nature10"), alt: "Green mountain valley with scattered houses" },
    ],
    metrics: [
      { label: "My Role", value: "Photo · Video · Drone · Edit" },
      { label: "Format", value: "Photos + Film + Aerial" },
      { label: "Type", value: "Real Estate" },
    ],
    featured: true,
  },
  {
    slug: "mountain-adventure-film",
    title: "Mountain Adventure Film",
    client: "Khanography",
    type: "Travel Film",
    location: "Dir, Khyber Pakhtunkhwa",
    date: "2025",
    services: ["Videography", "Drone", "Editing", "Colour Grading"],
    summary:
      "A cinematic film exploring the mountains and valleys of Khyber Pakhtunkhwa, shot on location with aerial coverage.",
    challenge: "Capturing the scale and mood of the mountains in changing light.",
    approach:
      "Shot handheld for intimacy and with the drone for scale, then graded to one consistent look.",
    outcome: "A film and a set of short social cutdowns, plus a stills library.",
    cover: img("travel1"),
    coverAlt: "Man in a red jacket standing in the mountains",
    coverFit: "cover",
    gallery: [
      { src: img("travel1"), alt: "Man in a red jacket standing in the mountains" },
      { src: img("travel2"), alt: "Man standing in a green meadow below snowy peaks" },
      { src: img("img-9"), alt: "Dark mountain slope with pine trees" },
      { src: img("nature4"), alt: "Tent pitched in a mountain meadow" },
    ],
    metrics: [
      { label: "Format", value: "Film" },
      { label: "Deliverables", value: "Film + Reels" },
      { label: "Aerial", value: "Yes" },
    ],
    featured: true,
  },
  {
    slug: "valley-from-above",
    title: "Valley From Above",
    client: "Khanography",
    type: "Aerial Project",
    location: "Timergara, Dir Lower",
    date: "2025",
    services: ["Drone", "Photography", "Editing"],
    summary:
      "An aerial series over towns and valleys of Dir, flown at golden hour and dusk.",
    challenge: "Finding clean compositions in a busy, uneven landscape.",
    approach:
      "Scouted the light first, then flew slow reveals and top-down passes at sunset.",
    outcome: "A set of aerial stills and short cinematic clips.",
    cover: img("nature1"),
    coverAlt: "Aerial view of a town and river at sunset",
    coverFit: "cover",
    gallery: [
      { src: img("nature1"), alt: "Aerial view of a town and river at sunset" },
      { src: img("nature2"), alt: "Aerial view of a town in a green valley" },
      { src: img("img-26"), alt: "Houses on a hillside" },
      { src: img("nature5"), alt: "Mountain ridge at sunset" },
    ],
    metrics: [
      { label: "Format", value: "Aerial" },
      { label: "Resolution", value: "4K" },
      { label: "Time", value: "Golden hour" },
    ],
    featured: true,
  },
  {
    slug: "community-football-day",
    title: "Community Football Day",
    client: "Local Community",
    type: "Event Coverage",
    location: "Dir Lower",
    date: "2025",
    services: ["Videography", "Photography", "Editing"],
    summary:
      "Photo and video coverage of a local football match, from kick-off to the final whistle.",
    challenge: "Fast action in bright, changing light.",
    approach:
      "Shot from several positions to catch the action and the crowd, then cut a highlight reel.",
    outcome: "A highlight reel and a gallery of match photographs.",
    cover: img("event2"),
    coverAlt: "Football players competing for the ball",
    coverFit: "cover",
    gallery: [
      { src: img("event2"), alt: "Football players competing for the ball" },
      { src: img("event1"), alt: "Local football match on an open ground" },
      { src: img("event4"), alt: "Players moving across the pitch" },
      { src: img("event3"), alt: "Football match in progress" },
    ],
    metrics: [
      { label: "Format", value: "Highlights" },
      { label: "Stills", value: "Gallery" },
      { label: "Type", value: "Event" },
    ],
    featured: true,
  },
  {
    slug: "social-reels-series",
    title: "Social Reels Series",
    client: "Branded Clothe Shop",
    type: "Reels",
    location: "Pakistan",
    date: "2025",
    services: ["Reels Production", "Creative Editing", "Content Branding"],
    summary:
      "A series of short reels for a clothing brand, built for Instagram, TikTok and YouTube Shorts.",
    challenge: "Making product content feel fresh every week.",
    approach:
      "Hook-first edits, clean captions and consistent branding across every reel.",
    outcome: "A repeatable content series for social media.",
    cover: img("img-7"),
    coverAlt: "Portrait of a young man in a white shalwar",
    coverFit: "cover",
    gallery: [
      { src: img("img-7"), alt: "Portrait of a young man in a white shalwar" },
      { src: img("img-2"), alt: "Portrait of a bearded man in soft light" },
      { src: img("img-15"), alt: "Smiling man in a white shirt" },
      { src: img("portrait3"), alt: "Photographer holding a camera" },
    ],
    metrics: [
      { label: "Format", value: "Vertical" },
      { label: "Platforms", value: "IG · TikTok · YT" },
      { label: "Type", value: "Series" },
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
    { id: "02", title: "Capture", detail: "Photography, videography and drone footage.", note: "Full setup where needed, always lean and efficient otherwise." },
    { id: "03", title: "Edit", detail: "Professional editing, color grading and sound.", note: "Story structure first, look second, detail third." },
    { id: "04", title: "Refine", detail: "Review and improve the final result.", note: "Revision rounds included in every project." },
    { id: "05", title: "Deliver", detail: "High-quality final content ready for use.", note: "Final films, reels, stills and social exports, organised and delivered." },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/*  Behind the scenes                                                         */
/* -------------------------------------------------------------------------- */

export const behindTheScenes = {
  eyebrow: "Behind The Scenes",
  title: "The work behind the work.",
  description:
    "Early starts, long walks and a lot of patience. The part of making something look effortless.",
  items: [
    { id: "b1", title: "Camera Ready", caption: "Checking the frame before the take", src: img("portrait3"), alt: "Photographer holding a camera" },
    { id: "b2", title: "Drone at Dusk", caption: "Flying into the last light", src: img("img-25"), alt: "Drone flying over a mountain at dusk" },
    { id: "b3", title: "Camp Setup", caption: "Home base for a mountain shoot", src: img("nature4"), alt: "Tent pitched in a mountain meadow" },
    { id: "b4", title: "Location Scouting", caption: "Finding the light before the shoot", src: img("travel2"), alt: "Man standing in a mountain meadow" },
    { id: "b5", title: "View From the Tent", caption: "Waiting for the right morning", src: img("travel4"), alt: "View of mountains from inside a tent" },
    { id: "b6", title: "On the Trail", caption: "Carrying the gear to the shot", src: img("travel1"), alt: "Man in a red jacket walking in the mountains" },
    { id: "b7", title: "Rest Stop", caption: "Breaks between takes", src: img("travel6"), alt: "People relaxing on a hillside" },
    { id: "b8", title: "Aerial Check", caption: "Reviewing the drone footage", src: img("travel5"), alt: "Person resting on a hillside with a drone overhead" },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/*  Equipment — replace with your real gear                                   */
/* -------------------------------------------------------------------------- */

export const equipment = {
  eyebrow: "Equipment",
  title: "The kit behind the frames.",
  description:
    "A maintained kit chosen for reliability, colour consistency and the ability to work fast in difficult light.",
  groups: [
    { id: "camera", title: "Cameras", items: [
      { name: "Your Camera Body", spec: "Replace with your camera" },
      { name: "Your Second Camera", spec: "Replace with your camera" },
    ] },
    { id: "lenses", title: "Lenses", items: [
      { name: "Your Main Lens", spec: "Replace with your lens" },
      { name: "Your Second Lens", spec: "Replace with your lens" },
    ] },
    { id: "aerial", title: "Aerial", items: [
      { name: "Your Drone", spec: "Replace with your drone model" },
      { name: "ND Filter Set", spec: "Exposure control" },
    ] },
    { id: "support", title: "Support & Sound", items: [
      { name: "Gimbal", spec: "Replace with your gimbal" },
      { name: "Tripod", spec: "Replace with your tripod" },
      { name: "Microphone", spec: "Replace with your mic" },
    ] },
    { id: "lighting", title: "Lighting", items: [
      { name: "Key Light", spec: "Replace with your light" },
      { name: "Reflector", spec: "Portable bounce" },
    ] },
    { id: "post", title: "Post Suite", items: [
      { name: "Editing Workstation", spec: "Replace with your computer" },
      { name: "Editing Software", spec: "Premiere Pro · DaVinci Resolve" },
    ] },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/*  Testimonials — drafts: get each person's approval before publishing       */
/* -------------------------------------------------------------------------- */

export const testimonials = {
  eyebrow: "Testimonials",
  title: "What clients say.",
  items: [
    {
      id: "t1",
      name: "Deputy Commissioner", // put the real name after approval
      role: "DC",
      company: "Dir Lower",
      projectType: "Official Coverage",
      quote: `${site.shortName} is professional and always on time. His videos and photos are clear, respectful and well made.`,
      avatar: photo("client-1", 200, 200),
    },
    {
      id: "t2",
      name: "District Youth Officer", // put the real name after approval
      role: "DYO",
      company: "Youth Affairs, Dir Lower",
      projectType: "Youth Programs",
      quote: `${site.shortName} covered our youth events very well. Great work, simple to work with, and the final video made us proud.`,
      avatar: photo("client-2", 200, 200),
    },
    {
      id: "t3",
      name: "CEO", // put the real name after approval
      role: "CEO",
      company: "Lewal Technologies",
      projectType: "Video & Drone Production",
      quote: `${site.shortName} manages our video, photo and drone work with care. He is hardworking, creative and a person we can trust.`,
      avatar: photo("client-3", 200, 200),
    },
    {
      id: "t4",
      name: "Brand Team",
      role: "Marketing",
      company: "Pak Qatar Takaful",
      projectType: "Brand Content",
      quote: `Thank you ${site.shortName}. The content looked clean and professional, and it was delivered on time.`,
      avatar: photo("client-4", 200, 200),
    },
    {
      id: "t5",
      name: "Hizbullah Khalifa",
      role: "Freelancer",
      company: "Freelance",
      projectType: "Collaboration",
      quote: `Working with ${site.shortName} is easy. He understands the idea fast, edits with a good eye and keeps his word.`,
      avatar: photo("client-5", 200, 200),
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
    "Khanography is the cinematic portfolio of Talha Khan — videographer, video editor, photographer, drone operator and creative editor creating films, photography and aerial footage that turn moments into stories.",
  keywords: [
    "videographer",
    "video editor",
    "photographer",
    "drone operator",
    "reels creator",
    "social media content creator",
    "aerial cinematography",
    "Khanography",
    "Talha Khan",
  ],
} as const;

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export const heroPoster = "/images/hero.jpg";
export const ogImage = "/images/hero.jpg";