export const THEME_STORAGE_KEY = "khanography-theme";

export type Theme = "light" | "dark";

/**
 * Runs before the page paints (loaded with next/script `beforeInteractive`).
 * Reads the saved theme, defaults to dark, and sets the `dark` class on <html>
 * so there is no flash. The toggle button writes the same class + storage key.
 */
export const themeInitScript = `(function(){try{var k="${THEME_STORAGE_KEY}";var t=localStorage.getItem(k);var d=t?t==="dark":true;var r=document.documentElement;r.classList.toggle("dark",d);r.style.colorScheme=d?"dark":"light";}catch(e){document.documentElement.classList.add("dark");}})();`;