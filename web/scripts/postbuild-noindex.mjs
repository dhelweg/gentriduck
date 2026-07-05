#!/usr/bin/env node
// Post-build: inject a robots noindex meta tag into every generated HTML page.
//
// Why (ADR-0012 / #144 soft-launch): the site launches "noindex" — reachable by URL but not
// discoverable via search. On GitHub Pages (the fallback host) the two other noindex mechanisms
// don't work: `web/static/_headers` (X-Robots-Tag) is Cloudflare-only, and `robots.txt` at a
// project-page subpath (/<repo>/robots.txt) is ignored by crawlers (they only read the domain
// root). The per-page `<meta name="robots">` tag is the one control that reliably applies, and it
// works because nothing blocks the crawl — the crawler fetches the page and honours the tag.
//
// Injected here at post-build (not in Evidence's app.html) because `.evidence/template` is
// gitignored and regenerated on every build, so an edit there wouldn't be durable. Editing the
// static output keeps the noindex host-agnostic and independent of the Evidence template.
//
// Remove this step (and its `&&` in package.json "build") when the site goes fully public — see
// the follow-up noted in #144.

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const BUILD_DIR = join(fileURLToPath(new URL('.', import.meta.url)), '..', 'build');
const META = '<meta name="robots" content="noindex, nofollow, noarchive" />';

async function* htmlFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(full);
    else if (entry.isFile() && entry.name.endsWith('.html')) yield full;
  }
}

let patched = 0;
for await (const file of htmlFiles(BUILD_DIR)) {
  const html = await readFile(file, 'utf8');
  if (html.includes('name="robots"')) continue; // idempotent
  const head = html.indexOf('<head>');
  if (head === -1) continue;
  const out = html.slice(0, head + '<head>'.length) + META + html.slice(head + '<head>'.length);
  await writeFile(file, out);
  patched++;
}

console.log(`postbuild-noindex: injected robots noindex into ${patched} HTML file(s).`);
