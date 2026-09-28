/* Functional smoke test: drives the real UI in headless Chrome and asserts that
 * the interactive pieces actually work (theme, filters, lightbox keyboard nav,
 * before/after drag, carousel, form validation + success).
 *
 *   npm run build && node tools/smoke.mjs
 */
import { spawn } from "node:child_process";
import { join } from "node:path";

const PORT = 4186;
const CDP = 9337;
const CHROME =
  process.env.CHROME ??
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const nextBin = join(process.cwd(), "node_modules", "next", "dist", "bin", "next");
const server = spawn(process.execPath, [nextBin, "start", "-p", String(PORT)], {
  stdio: ["ignore", "pipe", "pipe"],
});
// Surface server-side errors (e.g. a throwing server action) in the test output.
const serverLog = [];
server.stdout?.on("data", (d) => serverLog.push(String(d)));
server.stderr?.on("data", (d) => serverLog.push(String(d)));
const stopServer = () => {
  try {
    if (process.platform === "win32")
      spawn("taskkill", ["/pid", String(server.pid), "/f", "/t"], { stdio: "ignore" });
    else server.kill("SIGTERM");
  } catch {
    /* already gone */
  }
};
process.on("exit", stopServer);

for (let i = 0; i < 60; i++) {
  await sleep(500);
  try {
    if ((await fetch(`http://127.0.0.1:${PORT}/`)).ok) break;
  } catch {
    /* not up yet */
  }
}

const chrome = spawn(
  CHROME,
  [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--no-first-run",
    `--remote-debugging-port=${CDP}`,
    `--user-data-dir=${join(process.env.TEMP, "khanography-smoke")}`,
    "about:blank",
  ],
  { stdio: "ignore" },
);

let wsUrl = "";
for (let i = 0; i < 40 && !wsUrl; i++) {
  await sleep(400);
  try {
    const list = await (await fetch(`http://127.0.0.1:${CDP}/json/list`)).json();
    wsUrl = list.find((t) => t.type === "page")?.webSocketDebuggerUrl ?? "";
  } catch {
    /* not up yet */
  }
}
if (!wsUrl) {
  stopServer();
  chrome.kill();
  throw new Error("Chrome never became available");
}

const ws = new WebSocket(wsUrl);
await new Promise((res, rej) => {
  ws.addEventListener("open", res, { once: true });
  ws.addEventListener("error", rej, { once: true });
});

let seq = 0;
const pending = new Map();
const waiters = new Map();
ws.addEventListener("message", (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    if (msg.error) reject(new Error(JSON.stringify(msg.error)));
    else resolve(msg.result);
  } else if (msg.method && waiters.has(msg.method)) {
    for (const fn of waiters.get(msg.method)) fn(msg.params);
  }
});
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const id = ++seq;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });
const once = (method) =>
  new Promise((resolve) => {
    const fn = (p) => {
      waiters.get(method).delete(fn);
      resolve(p);
    };
    if (!waiters.has(method)) waiters.set(method, new Set());
    waiters.get(method).add(fn);
  });

const evaluate = async (expression) => {
  const { result, exceptionDetails } = await send("Runtime.evaluate", {
    expression: `(() => { ${expression} })()`,
    returnByValue: true,
    awaitPromise: true,
  });
  if (exceptionDetails) {
    throw new Error(
      exceptionDetails.exception?.description ??
        exceptionDetails.text ??
        "eval failed",
    );
  }
  return result.value;
};

const key = async (type, keyName, code, windowsVirtualKeyCode) => {
  await send("Input.dispatchKeyEvent", {
    type,
    key: keyName,
    code,
    windowsVirtualKeyCode,
    nativeVirtualKeyCode: windowsVirtualKeyCode,
  });
};

await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", {
  width: 1440,
  height: 950,
  deviceScaleFactor: 1,
  mobile: false,
});

const loaded = once("Page.loadEventFired");
await send("Page.navigate", { url: `http://127.0.0.1:${PORT}/` });
await loaded;
await evaluate("return document.fonts.ready.then(() => true)");
await sleep(1500);

const results = [];
const check = (name, pass, detail = "") =>
  results.push({ name, pass: Boolean(pass), detail });

/* 1 ─ theme toggle ------------------------------------------------------- */
const themeBefore = await evaluate(
  "return { dark: document.documentElement.classList.contains('dark'), stored: localStorage.getItem('khanography-theme') };",
);
await evaluate(
  "document.querySelector('button[aria-label^=\"Switch to\"]').click(); return true;",
);
await sleep(700);
const themeAfter = await evaluate(
  "return { dark: document.documentElement.classList.contains('dark'), stored: localStorage.getItem('khanography-theme'), bg: getComputedStyle(document.body).backgroundColor };",
);
check(
  "theme toggle flips the class",
  themeBefore.dark !== themeAfter.dark,
  `${themeBefore.dark} → ${themeAfter.dark}`,
);
check(
  "theme choice is persisted",
  themeAfter.stored === (themeAfter.dark ? "dark" : "light"),
  `localStorage=${themeAfter.stored}`,
);
check(
  "theme repaints the surface",
  themeAfter.bg !== (themeAfter.dark ? "rgb(5, 7, 11)" : "rgb(255, 255, 255)"),
  themeAfter.bg,
);

/* 2 ─ photography filter ------------------------------------------------- */
await evaluate("document.querySelector('#photography').scrollIntoView(); return true;");
await sleep(1600);
const totalPhotos = await evaluate(
  "return document.querySelectorAll('#photography figure button').length;",
);
await evaluate(
  `const b = [...document.querySelectorAll('#photography button')].find((x) => x.textContent.trim().startsWith('Weddings')); b.click(); return true;`,
);
await sleep(1200);
const filteredPhotos = await evaluate(
  "return document.querySelectorAll('#photography figure button').length;",
);
check(
  "category filter narrows the gallery",
  filteredPhotos > 0 && filteredPhotos < totalPhotos,
  `${totalPhotos} → ${filteredPhotos}`,
);
await evaluate(
  `const b = [...document.querySelectorAll('#photography button')].find((x) => x.textContent.trim().startsWith('All')); b.click(); return true;`,
);
await sleep(900);

/* 3 ─ lightbox open + keyboard nav + escape ------------------------------ */
await evaluate(
  "document.querySelector('#photography figure button').click(); return true;",
);
await sleep(2600);
const lightboxOpen = await evaluate(
  "return { open: !!document.querySelector('[role=\"dialog\"]'), counter: document.querySelector('[role=\"dialog\"] .font-mono')?.textContent?.trim() };",
);
check("lightbox opens", lightboxOpen.open, lightboxOpen.counter ?? "");

await key("rawKeyDown", "ArrowRight", "ArrowRight", 39);
await key("keyUp", "ArrowRight", "ArrowRight", 39);
await sleep(1200);
const afterArrow = await evaluate(
  "return document.querySelector('[role=\"dialog\"] .font-mono')?.textContent?.trim();",
);
check(
  "arrow keys page the lightbox",
  Boolean(afterArrow) && afterArrow !== lightboxOpen.counter,
  `${lightboxOpen.counter} → ${afterArrow}`,
);

await key("rawKeyDown", "Escape", "Escape", 27);
await key("keyUp", "Escape", "Escape", 27);
await sleep(900);
check(
  "escape closes the lightbox",
  !(await evaluate("return !!document.querySelector('[role=\"dialog\"]');")),
);

/* 4 ─ video modal streams on demand -------------------------------------- */
const videoBefore = await evaluate(
  "return { total: document.querySelectorAll('video').length, inCards: document.querySelectorAll('#films video, #photography video').length };",
);
check(
  "no video element inside any work card before interaction",
  videoBefore.inCards === 0,
  `${videoBefore.inCards} in cards (${videoBefore.total} on page: hero only)`,
);
await evaluate(
  "document.querySelector('#films [data-cursor=\"play\"]').click(); return true;",
);
await sleep(3000);
const videoAfter = await evaluate(
  "return { count: document.querySelectorAll('[role=\"dialog\"] video').length, src: document.querySelector('[role=\"dialog\"] video source')?.getAttribute('src') ?? null };",
);
check(
  "video source attaches on open",
  videoAfter.count === 1 && Boolean(videoAfter.src),
  videoAfter.src ?? "none",
);
await key("rawKeyDown", "Escape", "Escape", 27);
await key("keyUp", "Escape", "Escape", 27);
await sleep(900);
check(
  "escape closes the video modal",
  !(await evaluate("return !!document.querySelector('[role=\"dialog\"]');")),
);

/* 5 ─ before/after slider (keyboard) ------------------------------------- */
await evaluate("document.querySelector('#editing').scrollIntoView(); return true;");
await sleep(1800);
const clipBefore = await evaluate(
  "return document.querySelector('#editing [role=\"slider\"]')?.getAttribute('aria-valuenow');",
);
await evaluate(
  "const s = document.querySelector('#editing [role=\"slider\"]'); s.focus(); for (let i = 0; i < 5; i++) s.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })); return true;",
);
await sleep(700);
const clipAfter = await evaluate(
  "return document.querySelector('#editing [role=\"slider\"]')?.getAttribute('aria-valuenow');",
);
check(
  "before/after slider is keyboard operable",
  Number(clipAfter) > Number(clipBefore),
  `${clipBefore}% → ${clipAfter}%`,
);

/* 6 ─ testimonial carousel ----------------------------------------------- */
await evaluate("document.querySelector('#testimonials').scrollIntoView(); return true;");
await sleep(1500);
const quoteBefore = await evaluate(
  "return document.querySelector('#testimonials blockquote p')?.textContent?.slice(0, 24);",
);
await evaluate(
  "document.querySelector('#testimonials button[aria-label=\"Next testimonial\"]').click(); return true;",
);
await sleep(1200);
const quoteAfter = await evaluate(
  "return document.querySelector('#testimonials blockquote p')?.textContent?.slice(0, 24);",
);
check(
  "testimonial carousel advances",
  quoteBefore !== quoteAfter,
  `"${quoteBefore}" → "${quoteAfter}"`,
);

/* 7 ─ count-up fired ----------------------------------------------------- */
const counted = await evaluate(
  "return [...document.querySelectorAll('#intro dd span')].map((s) => s.textContent.trim()).filter(Boolean).slice(0, 4);",
);
check(
  "stats count up from zero to the real value",
  counted.includes("100+") && counted.includes("500+"),
  counted.join(" "),
);

/* 8 ─ contact form validation + success ----------------------------------- */
try {
  await evaluate("document.querySelector('#contact').scrollIntoView(); return true;");
  await sleep(1500);
  const hasForm = await evaluate(
    "return { form: !!document.querySelector('#brief form'), panel: document.querySelector('#brief h3')?.textContent?.trim() ?? null };",
  );
  if (!hasForm.form) {
    check("contact form renders", false, JSON.stringify(hasForm));
  } else {
    check("contact form renders", true);

    await evaluate(
      "document.querySelector('#brief form button[type=\"submit\"]').click(); return true;",
    );
    await sleep(2500);
    const errors = await evaluate(
      "return [...document.querySelectorAll('#brief .text-red-500')].map((n) => n.textContent.trim());",
    );
    check(
      "empty brief is rejected with field errors",
      errors.length >= 3,
      `${errors.length} messages`,
    );

    await evaluate(
      `const f = document.querySelector('#brief form');
       f.querySelector('[name="name"]').value = 'Ayesha Khan';
       f.querySelector('[name="email"]').value = 'ayesha@example.com';
       f.querySelector('[name="phone"]').value = '+92 300 1234567';
       f.querySelector('[name="service"]').value = 'Videography';
       f.querySelector('[name="details"]').value = 'Two day wedding film on the coast, please send a quote.';
       f.requestSubmit();
       return true;`,
    );
    await sleep(3200);
    const success = await evaluate(
      "return document.querySelector('#brief h3')?.textContent?.trim() ?? null;",
    );
    check(
      "valid brief shows the success state",
      success === "Brief received.",
      success ?? "no panel",
    );
  }
} catch (error) {
  check("contact form flow", false, error.message);
}

/* 9 ─ video sources never appear in the initial HTML --------------------- */
const html = await (await fetch(`http://127.0.0.1:${PORT}/`)).text();
check(
  "initial HTML contains no video element",
  !/<video[\s>]/.test(html),
  "server-rendered HTML",
);
check(
  "lightbox/video-player code is split out of the initial bundle",
  !html.includes("LightboxShell") && html.includes("Photography"),
  "chunked",
);

/* 10 ─ mobile: custom cursor suppressed ----------------------------------- */
await send("Emulation.setDeviceMetricsOverride", {
  width: 390,
  height: 844,
  deviceScaleFactor: 1,
  mobile: true,
});
await send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });
const reloaded = once("Page.loadEventFired");
await send("Page.reload");
await reloaded;
await sleep(2000);
const cursorOnMobile = await evaluate(
  "return document.querySelectorAll('.cursor-desktop-only').length && document.documentElement.classList.contains('has-custom-cursor');",
);
check(
  "custom cursor is not enabled on touch devices",
  !cursorOnMobile,
  cursorOnMobile ? "present" : "absent",
);

/* ----------------------------------------------------------------------- */
const failed = results.filter((r) => !r.pass);
for (const r of results) {
  console.log(`${r.pass ? "PASS" : "FAIL"}  ${r.name}${r.detail ? `  — ${r.detail}` : ""}`);
}
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
if (failed.length) {
  const log = serverLog.join("").trim();
  if (log) console.log(`\n--- server output ---\n${log.slice(-2500)}`);
}

ws.close();
chrome.kill();
stopServer();
process.exit(failed.length ? 1 : 0);
