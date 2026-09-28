import Link from "next/link";
import { buttonClass } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center pt-28 pb-20">
      <div className="shell flex flex-col items-start gap-6">
        <p className="font-mono text-[0.7rem] tracking-[0.24em] text-accent uppercase">
          404 · Frame not found
        </p>
        <h1 className="max-w-2xl text-[clamp(2.2rem,6vw,4.4rem)] leading-[0.98] font-medium tracking-[-0.04em]">
          This shot didn&apos;t make the final cut.
        </h1>
        <p className="max-w-md text-[0.98rem] leading-relaxed text-muted">
          The page you&apos;re looking for has moved, been renamed, or was never
          shot. Let&apos;s get you back to the work.
        </p>
        <div className="mt-2 flex flex-wrap gap-3">
          <Link href="/" className={buttonClass({ size: "lg" })}>
            Back to the portfolio
          </Link>
          <Link
            href="/#contact"
            className={buttonClass({ size: "lg", variant: "outline" })}
          >
            Start a project
          </Link>
        </div>
      </div>
    </section>
  );
}
