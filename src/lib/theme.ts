export const THEME_STORAGE_KEY = "khanography-theme";

export type Theme = "light" | "dark";

// themeInitScript is no longer needed — next-themes injects its own
// no-flash script internally (see components/site/theme-provider.tsx),
// so it never has to run as a literal <script> child in our own JSX.
