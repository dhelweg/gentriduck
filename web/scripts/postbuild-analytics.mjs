#!/usr/bin/env node
// Post-build: inject the GoatCounter analytics beacon into every generated HTML page.
//
// Why (ADR-0012 Amendment B / #194): G4 wants privacy-friendly, cookieless pageview/visitor
// analytics for the public site, no consent banner. GoatCounter (AGPL-3.0, open-source) was
// chosen over Cloudflare Web Analytics — see the ADR amendment for the full rationale.
//
// The GoatCounter site *code* (the `<code>` in `<code>.goatcounter.com`) is NOT a secret — it is
// designed to sit in every page's public source — so it's read from a plain env var
// (`GOATCOUNTER_CODE`), not a `.env`/credential. If unset, this step is a no-op: local dev,
// preview, and any build without the env var set produce byte-identical output to before this
// ticket, keeping "no account needed to preview" (golden rule #5) intact. Set it only in the
// deploy environment (e.g. exported before `ops/deploy-gh-pages.sh`) once the maintainer creates
// the free goatcounter.com site (a manual one-time account step this script cannot do).
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
const CODE = process.env.GOATCOUNTER_CODE;

async function* htmlFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(full);
    else if (entry.isFile() && entry.name.endsWith(".html")) yield full;
  }
}

if (!CODE) {
  console.log(
    "postbuild-analytics: GOATCOUNTER_CODE not set, skipping beacon injection (no-op — see web/README.md).",
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
