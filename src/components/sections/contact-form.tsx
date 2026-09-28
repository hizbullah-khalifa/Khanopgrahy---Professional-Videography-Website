"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Loader2, RotateCcw } from "lucide-react";
import { contact, site } from "@/data/site";
import { submitBrief, type BriefState } from "@/app/actions";
import { cn } from "@/lib/utils";

/** The idle state lives here, not in the `"use server"` module. */
const INITIAL_BRIEF: BriefState = { status: "idle" };

const fieldBase =
  "w-full rounded-xl border border-line bg-bg px-4 py-3 text-[0.9rem] text-ink transition-[border-color,background-color,box-shadow] duration-300 placeholder:text-muted/60 hover:border-line-strong focus:border-accent focus:outline-none focus-visible:outline-none";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitBrief, INITIAL_BRIEF);
  const [dismissed, setDismissed] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const uid = useId();
  const showSuccess = state.status === "success" && !dismissed;

  useEffect(() => {
    if (!showSuccess) return;
    formRef.current?.reset();
    successRef.current?.focus();
  }, [showSuccess]);

  const reset = () => {
    setDismissed(true);
    requestAnimationFrame(() =>
      formRef.current?.querySelector("input")?.focus(),
    );
  };

  return (
    <div id="brief" className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {showSuccess ? (
          <motion.div
            key="success"
            ref={successRef}
            tabIndex={-1}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -14, scale: 0.99 }}
            transition={{ duration: reduce ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-6 rounded-2xl border border-accent/30 bg-surface px-6 py-16 text-center"
          >
            <motion.span
              initial={reduce ? { scale: 1 } : { scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 18,
                delay: reduce ? 0 : 0.12,
              }}
              className="relative grid size-16 place-items-center rounded-full bg-accent text-accent-ink"
            >
              <svg viewBox="0 0 24 24" className="size-7" fill="none" aria-hidden>
                <motion.path
                  d="M5 12.5 10 17.5 19 7"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : 0.28 }}
                />
              </svg>
            </motion.span>

            <div className="flex flex-col gap-2">
              <h3 className="font-display text-2xl font-medium tracking-[-0.03em]">
                {contact.success.title}
              </h3>
              <p className="mx-auto max-w-sm text-sm leading-relaxed text-muted">
                {state.message ?? contact.success.message}
              </p>
              {state.received && (
                <p className="text-[0.75rem] text-accent">
                  {state.received.service} enquiry from {state.received.name}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-[0.78rem] text-ink-soft transition-colors hover:border-accent hover:text-accent"
            >
              <RotateCcw className="size-3.5" strokeWidth={1.7} />
              Send another brief
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            action={formAction}
            onSubmit={() => setDismissed(false)}
            initial={false}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: reduce ? 0 : 0.3 }}
            className="flex flex-col gap-5"
            noValidate
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                id={`${uid}-name`}
                name="name"
                label="Name"
                placeholder="Your full name"
                required
                error={state.errors?.name}
                autoComplete="name"
              />
              <Field
                id={`${uid}-email`}
                name="email"
                type="email"
                label="Email"
                placeholder="you@company.com"
                required
                error={state.errors?.email}
                autoComplete="email"
              />
              <Field
                id={`${uid}-phone`}
                name="phone"
                type="tel"
                label="Phone"
                placeholder="+92 300 0000000"
                error={state.errors?.phone}
                autoComplete="tel"
              />
              <SelectField
                id={`${uid}-service`}
                name="service"
                label="Service"
                options={contact.form.services}
                required
                error={state.errors?.service}
              />
              <SelectField
                id={`${uid}-projectType`}
                name="projectType"
                label="Project Type"
                options={contact.form.projectTypes}
                placeholder="Choose a project type"
              />
              <SelectField
                id={`${uid}-budget`}
                name="budget"
                label="Budget"
                options={contact.form.budgets}
                placeholder="Select a range"
              />
            </div>

            <label className="flex flex-col gap-2" htmlFor={`${uid}-details`}>
              <span className="text-[0.7rem] font-medium tracking-[0.16em] text-muted uppercase">
                Project Details <span className="text-accent">*</span>
              </span>
              <textarea
                id={`${uid}-details`}
                name="details"
                rows={5}
                required
                placeholder="What are we making, where, and when?"
                aria-invalid={Boolean(state.errors?.details)}
                className={cn(
                  fieldBase,
                  "resize-y",
                  state.errors?.details && "border-red-500/70",
                )}
              />
              {state.errors?.details && (
                <span className="text-[0.75rem] text-red-500">
                  {state.errors.details}
                </span>
              )}
            </label>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-xs text-[0.72rem] leading-relaxed text-muted">
                Or email me directly at{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="text-ink underline decoration-accent/50 underline-offset-4 transition-colors hover:text-accent"
                >
                  {site.email}
                </a>
              </p>

              <button
                type="submit"
                disabled={pending}
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-7 text-[0.86rem] font-medium text-bg transition-[background-color,color,transform] duration-300 hover:-translate-y-0.5 hover:bg-accent hover:text-accent-ink disabled:pointer-events-none disabled:opacity-70"
              >
                {pending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" strokeWidth={1.8} />
                    Sending…
                  </>
                ) : (
                  <>
                    Send the brief
                    <ArrowUpRight
                      className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={1.7}
                    />
                  </>
                )}
              </button>
            </div>

            {state.status === "error" && state.message && (
              <p className="text-[0.8rem] text-red-500">{state.message}</p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  id,
  name,
  label,
  placeholder,
  type = "text",
  required,
  error,
  autoComplete,
}: {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  error?: string;
  autoComplete?: string;
}) {
  return (
    <label className="flex flex-col gap-2" htmlFor={id}>
      <span className="text-[0.7rem] font-medium tracking-[0.16em] text-muted uppercase">
        {label} {required && <span className="text-accent">*</span>}
      </span>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        className={cn(fieldBase, error && "border-red-500/70")}
      />
      {error && <span className="text-[0.75rem] text-red-500">{error}</span>}
    </label>
  );
}

function SelectField({
  id,
  name,
  label,
  options,
  placeholder = "Select an option",
  required,
  error,
}: {
  id: string;
  name: string;
  label: string;
  options: readonly string[];
  placeholder?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <label className="flex flex-col gap-2" htmlFor={id}>
      <span className="text-[0.7rem] font-medium tracking-[0.16em] text-muted uppercase">
        {label} {required && <span className="text-accent">*</span>}
      </span>
      <div className="relative">
        <select
          id={id}
          name={name}
          required={required}
          defaultValue=""
          aria-invalid={Boolean(error)}
          className={cn(
            fieldBase,
            "cursor-pointer appearance-none pr-10",
            error && "border-red-500/70",
          )}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="pointer-events-none absolute top-1/2 right-4 size-3.5 -translate-y-1/2 text-muted"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
      {error && <span className="text-[0.75rem] text-red-500">{error}</span>}
    </label>
  );
}
