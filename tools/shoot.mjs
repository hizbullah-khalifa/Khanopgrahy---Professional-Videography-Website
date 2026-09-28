/* Self-contained visual check for the Khanography portfolio.
 *
 * Boots the production server, drives headless Chrome over CDP, captures one
 * screenshot per section, audits horizontal overflow / unrevealed content /
 * text contrast, then shuts everything down.
 *
 *   npm run build
 *   node tools/shoot.mjs                       # desktop, dark
 *   node tools/shoot.mjs --theme=light
 *   node tools/shoot.mjs --width=390 --height=844 --theme=light --out=screenshots-mobile
 *   node tools/shoot.mjs --path=/work/mountain-adventure-film
 */
import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";

const args = process.argv.slice(2);
const opt = Object.fromEntries(
  args
    .filter((a) => a.startsWith("--"))
    .map((a) => a.replace(/^--/, "").split("=")),
);

const WIDTH = Number(opt.width ?? 1440);
const HEIGHT = Number(opt.height ?? 1000);
const THEME = opt.theme ?? "dark";
const OUT = resolve(opt.out ?? "screenshots");
const ROUTE = opt.path ?? "/";
const PORT = Number(opt.port ?? 4180);
const CDP = 9333;
const CHROME =
  process.env.CHROME ??
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const SECTIONS = [
  ["01-hero", "#top"],
  ["02-intro", "#intro"],
  ["03-services", "#services"],
  ["04-work", "#work"],
  ["05-films", "#films"],
  ["06-photography", "#photography"],
  ["07-editing", "#editing"],
  ["08-drone", "#drone"],
  ["09-process", "#process"],
  ["10-bts", "#bts"],
  ["11-equipment", "#equipment"],
  ["12-testimonials", "#testimonials"],
  ["13-about", "#about"],
  ["14-contact", "#contact"],
  ["15-footer", "[data-site-footer]"],
  ["16-lightbox", "body", '#photography [data-cursor="view"]'],
  ["17-video-modal", "body", '#films [data-cursor="play"]'],
  ["18-mobile-menu", "body", 'button[aria-controls="mobile-menu"]'],
  ["19-bottom", "bottom"],
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ---------------- next start ---------------- */
const nextBin = join(process.cwd(), "node_modules", "next", "dist", "bin", "next");
const server = spawn(process.execPath, [nextBin, "start", "-p", String(PORT)], {
  stdio: ["ignore", "pipe", "pipe"],
  detached: false,
});
server.stdout?.on("data", (d) => process.stdout.write(`[next] ${d}`));
server.stderr?.on("data", (d) => process.stderr.write(`[next] ${d}`));
server.on("error", (error) => console.error("[next spawn error]", error));

const stopServer = () => {
  try {
    if (process.platform === "win32") {
      spawn("taskkill", ["/pid", String(server.pid), "/f", "/t"], {
        stdio: "ignore",
      });
    } else {
      server.kill("SIGTERM");
    }
  } catch {
    /* already gone */
  }
};
process.on("exit", stopServer);
process.on("SIGINT", () => {
  stopServer();
  process.exit(1);
});

// Wait for the server to accept connections.
let up = false;
for (let i = 0; i < 60 && !up; i++) {
  await sleep(500);
  try {
    const res = await fetch(`http://127.0.0.1:${PORT}${ROUTE}`);
    up = res.ok;
    if (!up) console.error(`[probe] status ${res.status}`);
  } catch (error) {
    console.error(`[probe] ${error.message} / ${error.cause?.message ?? ""}`);
  }
}
if (!up) {
  stopServer();
  throw new Error("next start never became reachable");
}

/* ---------------- chrome ---------------- */
const profile = join(process.env.TEMP, "khanography-shoot");
const chrome = spawn(
  CHROME,
  [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--no-first-run",
    "--disable-extensions",
    `--remote-debugging-port=${CDP}`,
    `--user-data-dir=${profile}`,
    "about:blank",
  ],
  { stdio: "ignore" },
);

let wsUrl = "";
for (let i = 0; i < 40 && !wsUrl; i++) {
  await sleep(400);
  try {
    const list = await (await fetch(`http://127.0.0.1:${CDP}/json/list`)).json();
    const page = list.find((t) => t.type === "page");
    if (page) wsUrl = page.webSocketDebuggerUrl;
  } catch {
    /* not up yet */
  }
}
if (!wsUrl) {
  stopServer();
  chrome.kill();
  throw new Error("Chrome DevTools endpoint never became available");
}

/* ---------------- CDP plumbing ---------------- */
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

await send("Page.enable");
await send("Emulation.setEmulatedMedia", {
  features: [{ name: "prefers-color-scheme", value: THEME }],
});
// Seed the saved theme so the very first paint is already correct.
await send("Page.addScriptToEvaluateOnNewDocument", {
  source: `try { localStorage.setItem('khanography-theme', ${JSON.stringify(THEME)}) } catch (e) {}`,
});
await send("Emulation.setDeviceMetricsOverride", {
  width: WIDTH,
  height: HEIGHT,
  deviceScaleFactor: 1,
  mobile: WIDTH < 700,
});

await mkdir(OUT, { recursive: true });

const loaded = once("Page.loadEventFired");
await send("Page.navigate", { url: `http://127.0.0.1:${PORT}${ROUTE}` });
await loaded;
await send("Runtime.evaluate", {
  expression: "document.fonts.ready",
  awaitPromise: true,
});
await sleep(2200);

const applied = await send("Runtime.evaluate", {
  expression: `(() => {
    const cs = getComputedStyle(document.body);
    return JSON.stringify({ dark: document.documentElement.classList.contains('dark'), bg: cs.backgroundColor, color: cs.color });
  })()`,
  returnByValue: true,
});
console.log("theme:", applied.result.value);

const report = [];

const AUDIT = `(() => {
  const de = document.documentElement;
  const overflowX = de.scrollWidth - de.clientWidth;
  const wide = [...document.querySelectorAll('body *')]
    .filter((el) => {
      const r = el.getBoundingClientRect();
      return r.width > 0 && (r.right > de.clientWidth + 2 || r.left < -2) &&
        getComputedStyle(el).position !== 'fixed';
    })
    .slice(0, 6)
    .map((el) => el.tagName.toLowerCase() + '.' + String(el.className ?? '').slice(0, 46));

  const unrevealed = [...document.querySelectorAll('[data-reveal]')]
    .filter((el) => !el.classList.contains('is-revealed') &&
      el.getBoundingClientRect().top < window.innerHeight &&
      el.getBoundingClientRect().bottom > 0)
    .slice(0, 5)
    .map((el) => el.tagName.toLowerCase() + '.' + String(el.className ?? '').slice(0, 40) +
      ' @' + Math.round(el.getBoundingClientRect().top));

  const srgbFromOklab = (L, A, B) => {
    const l = (L + 0.3963377774 * A + 0.2158037573 * B) ** 3;
    const m = (L - 0.1055613458 * A - 0.0638541728 * B) ** 3;
    const s = (L - 0.0894841775 * A - 1.291485548 * B) ** 3;
    return [
      4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
      -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
      -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
    ].map((c) => {
      const v = c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(Math.max(c, 0), 1 / 2.4) - 0.055;
      return Math.min(255, Math.max(0, v * 255));
    });
  };

  const parseColor = (str) => {
    if (!str) return null;
    const nums = (String(str).match(/-?[\\d.]+(?:e-?\\d+)?/g) || []).map(Number);
    if (/^oklab/.test(str)) return nums.length < 3 ? null : [...srgbFromOklab(nums[0], nums[1], nums[2]), nums[3] ?? 1];
    if (/^color\\(/.test(str)) return nums.length < 3 ? null : [nums[0] * 255, nums[1] * 255, nums[2] * 255, nums[3] ?? 1];
    if (/^rgba?\\(/.test(str)) return nums.length < 3 ? null : [nums[0], nums[1], nums[2], nums[3] ?? 1];
    return null;
  };

  const over = (fg, bg) => {
    const a = fg[3] ?? 1;
    if (a >= 1) return fg;
    return [0, 1, 2].map((i) => fg[i] * a + bg[i] * (1 - a));
  };
  const lum = ([r, g, b]) => {
    const f = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const ratio = (a, b) => {
    const l1 = lum(a), l2 = lum(b);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  };
  const bgOf = (el) => {
    let n = el, acc = null;
    while (n && n !== document.documentElement) {
      const cs = getComputedStyle(n);
      if (cs.backgroundImage && cs.backgroundImage !== 'none') return null;
      const c = parseColor(cs.backgroundColor);
      if (c) { if ((c[3] ?? 1) > 0.5) return c; acc = acc ? over(acc, c) : c; }
      n = n.parentElement;
    }
    const bodyBg = parseColor(getComputedStyle(document.body).backgroundColor) || [0, 0, 0, 1];
    return acc ? over(acc, bodyBg) : bodyBg;
  };

  const low = [];
  for (const el of document.querySelectorAll('body *')) {
    if (el.closest('svg, img, video')) continue;
    if (el.closest('[data-over-media]')) continue;
    if (el.closest('[data-decorative]')) continue;
    const own = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 1);
    if (!own) continue;
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) continue;
    const fg = parseColor(getComputedStyle(el).color);
    const bg = bgOf(el);
    if (!fg || !bg) continue;
    const cr = ratio(over(fg, bg), bg);
    if (cr < 2.6) low.push(el.tagName.toLowerCase() + ' "' + el.textContent.trim().slice(0, 20) + '" ' + cr.toFixed(2) + ':1');
  }
  return JSON.stringify({ overflowX, wide, unrevealed, lowContrast: low.slice(0, 8) });
})()`;

for (const [name, selector, clickSelector] of SECTIONS) {
  if (clickSelector) {
    await send("Runtime.evaluate", {
      expression: `document.querySelector(${JSON.stringify(clickSelector)})?.click()`,
    });
    // Modals fetch their media on open, so give the optimizer time to respond.
    await sleep(clickSelector.includes("play") || clickSelector.includes("view") ? 3200 : 1200);
  }

  if (selector === "bottom") {
    await send("Runtime.evaluate", {
      expression:
        "window.scrollTo(0, document.documentElement.scrollHeight - window.innerHeight)",
    });
    await sleep(2400);
  } else if (selector && selector !== "body") {
    await send("Runtime.evaluate", {
      expression: `(() => {
        const el = document.querySelector(${JSON.stringify(selector)});
        if (el) el.scrollIntoView({ block: 'start' });
        return !!el;
      })()`,
    });
    await sleep(2400);
  } else {
    await send("Runtime.evaluate", { expression: "window.scrollTo(0, 0)" });
    await sleep(500);
  }

  const { data } = await send("Page.captureScreenshot", {
    format: "png",
    fromSurface: true,
  });
  await writeFile(join(OUT, `${name}.png`), Buffer.from(data, "base64"));

  const audit = await send("Runtime.evaluate", {
    expression: AUDIT,
    returnByValue: true,
  });
  report.push({ name, ...JSON.parse(audit.result.value) });
  console.log(`captured ${name}`);

  // Close whatever overlay we just opened (dialog close first, then the menu).
  if (clickSelector) {
    await send("Runtime.evaluate", {
      expression: `(() => {
        const dialogClose = document.querySelector('[role="dialog"] button[aria-label="Close"]');
        if (dialogClose) { dialogClose.click(); return 'dialog'; }
        const menu = document.querySelector('button[aria-controls="mobile-menu"]');
        if (menu) { menu.click(); return 'menu'; }
        return 'none';
      })()`,
      returnByValue: true,
    });
    await sleep(800);
  }
}

console.log("\n--- audit ---");
let problems = 0;
for (const r of report) {
  const bad =
    r.overflowX > 0 ||
    r.wide.length ||
    r.unrevealed.length ||
    r.lowContrast?.length;
  if (bad) problems++;
  console.log(
    `${bad ? "WARN" : "ok  "} ${r.name.padEnd(16)} overflowX=${r.overflowX} unrevealed=${r.unrevealed.length}` +
      (r.unrevealed?.length ? `\n       unrevealed: ${r.unrevealed.join(" | ")}` : "") +
      (r.lowContrast?.length ? `\n       low-contrast: ${r.lowContrast.join(" | ")}` : ""),
  );
}
console.log(problems === 0 ? "\nall clean" : `\n${problems} section(s) with findings`);

ws.close();
chrome.kill();
stopServer();
process.exit(0);
