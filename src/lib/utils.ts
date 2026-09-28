export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** 0 → 1 progress of an element through the viewport. */
export function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function formatIndex(index: number) {
  return String(index + 1).padStart(2, "0");
}
