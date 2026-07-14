#!/usr/bin/env node
// Post-build: inject the GoatCounter analytics beacon into every generated HTML page.
//
// Why (ADR-0012 Amendment B / #194): G4 wants privacy-friendly, cookieless pageview/visitor
// analytics for the public site, no consent banner. GoatCounter (AGPL-3.0, open-source) was
// chosen over Cloudflare Web Analytics — see the ADR amendment for the full rationale.
//
// The GoatCounter site *code* (the `<code>` in `<code>.goatcounter.com`) is NOT a secret — it is
// designed to sit in every page's public source — so it's committed in plain text at
// `web/goatcounter-code.txt` (one line, no `.env`/credential handling needed) rather than relying
// on a per-machine env var, so any maintainer machine gets it via `git pull` with nothing to
// re-export. `GOATCOUNTER_CODE` still overrides the file when set, for testing a different code
// without editing the committed default. Delete/empty the file (and don't set the env var) to
// go back to a no-op build — local dev/preview needs no account either way (golden rule #5).
//
// Injected here at post-build (not in Evidence's app.html) for the same reason as
// postbuild-noindex.mjs: `.evidence/template` is gitignored and regenerated every build, so an
// edit there wouldn't be durable. Mirrors that script's structure deliberately.

import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const BUILD_DIR = join(
  fileURLToPath(new URL(".", import.meta.url)),
  "..",
  "build",
);
const CODE_FILE = join(
  fileURLToPath(new URL(".", import.meta.url)),
  "..",
  "goatcounter-code.txt",
);

async function resolveCode() {
  if (process.env.GOATCOUNTER_CODE) return process.env.GOATCOUNTER_CODE.trim();
  try {
    const contents = await readFile(CODE_FILE, "utf8");
    return contents.trim();
  } catch {
    return "";
  }
}

const CODE = await resolveCode();

async function* htmlFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(full);
    else if (entry.isFile() && entry.name.endsWith(".html")) yield full;
  }
}

if (!CODE) {
  console.log(
    "postbuild-analytics: no code (GOATCOUNTER_CODE unset, goatcounter-code.txt empty/missing) — skipping beacon injection (no-op — see web/README.md).",
  );
  process.exit(0);
}

const BEACON = `<script data-goatcounter="https://${CODE}.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>`;

let patched = 0;
for await (const file of htmlFiles(BUILD_DIR)) {
  const html = await readFile(file, "utf8");
  if (html.includes("data-goatcounter=")) continue; // idempotent
  const headClose = html.indexOf("</head>");
  if (headClose === -1) continue;
  const out = html.slice(0, headClose) + BEACON + html.slice(headClose);
  await writeFile(file, out);
  patched++;
}

console.log(
  `postbuild-analytics: injected GoatCounter beacon into ${patched} HTML file(s).`,
);
