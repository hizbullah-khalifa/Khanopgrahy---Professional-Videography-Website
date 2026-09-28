"use server";

/**
 * IMPORTANT: in a `"use server"` module every *value* export becomes a server
 * reference on the client. Only export async functions here — types are erased
 * at build time and are safe. Keep plain values (initial state, option lists)
 * in `src/data/site.ts` or the client component.
 */
export type BriefState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<
    Record<"name" | "email" | "phone" | "service" | "details", string>
  >;
  /** Echoed back so the success screen can confirm what was received. */
  received?: { name: string; service: string };
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Handles the project brief.
 *
 * ✅ Validation happens server-side so bad input never reaches the studio inbox.
 * 🔌 To deliver enquiries by email, add your provider here (Resend, Postmark,
 *    Nodemailer, a CRM webhook…) — everything else already works.
 */
export async function submitBrief(
  _prevState: BriefState,
  formData: FormData,
): Promise<BriefState> {
  const get = (key: string) => String(formData.get(key) ?? "").trim();

  const name = get("name");
  const email = get("email");
  const phone = get("phone");
  const service = get("service");
  const projectType = get("projectType");
  const budget = get("budget");
  const details = get("details");

  const errors: BriefState["errors"] = {};

  if (name.length < 2) errors.name = "Please tell me your name.";
  if (!EMAIL_PATTERN.test(email)) errors.email = "A valid email is required.";
  if (phone && !/^[\d\s+()-]{6,}$/.test(phone))
    errors.phone = "That phone number doesn't look right.";
  if (!service) errors.service = "Pick the service you need.";
  if (details.length < 20)
    errors.details = "A sentence or two about the project, please.";

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      errors,
    };
  }

  // TODO: forward the brief to an inbox / CRM. See note above.
  console.info("[project brief]", {
    name,
    email,
    phone,
    service,
    projectType,
    budget,
    detailsLength: details.length,
  });

  return {
    status: "success",
    message: "Thanks — your project brief is in. I reply to every enquiry within one business day.",
    received: { name, service },
  };
}
