/**
 * Floating WhatsApp contact badge (bottom-right, on every page).
 * Change the number or the message below.
 */
const WHATSAPP_NUMBER = "923480603071"; // 0348 0603071 in international format
const WHATSAPP_MESSAGE =
  "Hi Talha, I found your portfolio and I'd like to discuss a project.";

const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE,
)}`;

export function WhatsAppButton() {
  return (
    <div
      className="animate-rise fixed right-4 z-50 sm:right-6"
      style={
        {
          "--delay": "1600ms",
          bottom: "calc(1.25rem + env(safe-area-inset-bottom, 0px))",
        } as React.CSSProperties
      }
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Talha on WhatsApp"
        className="group relative flex items-center gap-3"
      >
        {/* Label pill: slides out on hover / keyboard focus (desktop) */}
        <span className="pointer-events-none hidden translate-x-3 items-center gap-2 rounded-full border border-line-strong bg-bg-elevated/90 px-4 py-2.5 text-sm font-medium whitespace-nowrap text-ink opacity-0 shadow-lg backdrop-blur-md transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 md:flex">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#25D366] opacity-70" />
            <span className="relative inline-flex size-2 rounded-full bg-[#25D366]" />
          </span>
          Online · Chat on WhatsApp
        </span>

        {/* Button */}
        <span className="relative grid size-14 place-items-center transition-transform duration-300 group-hover:scale-110 group-active:scale-95">
          <span className="animate-pulse-ring absolute inset-0 rounded-full bg-[#25D366]/60" />
          <span className="relative grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.7)]">
            <svg
              viewBox="0 0 32 32"
              className="size-7"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M16.04 3C9.4 3 4 8.38 4 15.02c0 2.12.55 4.19 1.6 6.01L4 29l8.17-1.57a12.03 12.03 0 0 0 3.87.63h.01C22.68 28.06 28 22.68 28 16.04 28 9.4 22.68 3 16.04 3Zm0 22.99h-.01a10 10 0 0 1-5.1-1.4l-.37-.22-4.85.93.98-4.72-.24-.39a9.96 9.96 0 0 1-1.53-5.3c0-5.5 4.5-9.97 10.03-9.97 2.68 0 5.19 1.04 7.08 2.93a9.9 9.9 0 0 1 2.93 7.05c0 5.5-4.5 9.99-10 9.99Zm5.48-7.48c-.3-.15-1.78-.88-2.05-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.95 1.18-.18.2-.35.22-.65.08-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.67-2.08-.18-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.64-.93-2.25-.25-.58-.5-.5-.68-.51h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.13 3.25 5.15 4.56.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.08-.13-.28-.2-.58-.35Z" />
            </svg>
          </span>
        </span>
      </a>
    </div>
  );
}