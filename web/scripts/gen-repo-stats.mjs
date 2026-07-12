#!/usr/bin/env node
// Deterministic repo-growth stats generator (I17, #241).
//
// Why: /timeline (I4, #221) is milestone cards only; the maintainer asked for a quantitative
// "how did the codebase itself grow" block alongside it. Per the I17 SPEC
// (docs/epic-i/tickets/I17-timeline-project-stats.md), this must be a **stdlib-only** generator
// (no `cloc`/`tokei` — either would need an ADR-0009-style tool gate first) that produces a
// small, **committed** JSON snapshot the page reads, and it must be **deterministic**: run twice
// on the same tree, get byte-identical output. There is deliberately no timestamp field in the
// output for that reason — this is a *current-state snapshot*, labelled as such on the page, not
// a git-log-dated time series (the squashed-history prohibition from I4 applies repo-wide).
//
// Regenerate with:  cd web && node scripts/gen-repo-stats.mjs
// (re-run and commit web/static/data/repo-stats.json whenever the counted trees change materially)

import { readdir, readFile, writeFile, stat } from "node:fs/promises";
import { join, extname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = join(fileURLToPath(new URL(".", import.meta.url)), "..", "..");
const OUT_FILE = join(REPO_ROOT, "web", "static", "data", "repo-stats.json");

// Directories to skip everywhere (build artefacts, deps, VCS, gitignored data) -- never counted
// as "source" regardless of which layer they sit under.
const SKIP_DIRS = new Set([
  ".git",
  "node_modules",
  ".venv",
  "venv",
  "__pycache__",
  ".evidence",
  "build",
  "dbt_packages",
  "target",
  "logs",
  ".pytest_cache",
  ".ruff_cache",
  "data",
]);

// Layers per the I17 SPEC: transform/, ingestion/, web/, docs/, analysis/, ops/, .claude/
const LAYERS = ["transform", "ingestion", "web", "docs", "analysis", "ops", ".claude"];

// Extensions counted as "code/content" for LOC purposes -- text formats only, no binaries.
const COUNTED_EXT = new Set([
  ".py",
  ".sql",
  ".yml",
  ".yaml",
  ".md",
  ".mdx",
  ".svelte",
  ".js",
  ".mjs",
  ".ts",
  ".sh",
  ".csv",
  ".json",
  ".toml",
  ".qmd",
]);

async function walk(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return { files: 0, loc: 0 };
  }
  let files = 0;
  let loc = 0;
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      const sub = await walk(join(dir, entry.name));
      files += sub.files;
      loc += sub.loc;
      continue;
    }
    if (!entry.isFile()) continue;
    if (!COUNTED_EXT.has(extname(entry.name))) continue;
    const full = join(dir, entry.name);
    // Never count this script's own output -- it's rewritten every run, so including it would
    // make the generator self-referential and non-deterministic across two consecutive runs.
    if (full === OUT_FILE) continue;
    files += 1;
    const content = await readFile(full, "utf8").catch(() => "");
    // Count newlines, not "lines split" -- stable for files with/without a trailing newline.
    loc += content.length === 0 ? 0 : content.split("\n").length;
  }
  return { files, loc };
}

async function countMatching(dir, predicate) {
  let count = 0;
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return 0;
  }
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      count += await countMatching(join(dir, entry.name), predicate);
      continue;
    }
    if (entry.isFile() && predicate(entry.name)) count += 1;
  }
  return count;
}

async function pathExists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const layers = {};
  for (const layer of LAYERS) {
    const dir = join(REPO_ROOT, layer);
    if (!(await pathExists(dir))) continue;
    layers[layer] = await walk(dir);
  }

  const dbt = {
    models: await countMatching(join(REPO_ROOT, "transform", "models"), (n) => n.endsWith(".sql")),
    tests: await countMatching(join(REPO_ROOT, "transform", "tests"), (n) => n.endsWith(".sql")),
    seeds: await countMatching(join(REPO_ROOT, "transform", "seeds"), (n) => n.endsWith(".csv")),
  };

  const site = {
    pages: await countMatching(join(REPO_ROOT, "web", "pages"), (n) => n.endsWith(".md")),
    components: await countMatching(join(REPO_ROOT, "web", "components"), (n) => n.endsWith(".svelte")),
  };

  const adrs = await countMatching(join(REPO_ROOT, "docs", "adr"), (n) => /^\d{4}-.*\.md$/.test(n));

  const signoffs = await countMatching(join(REPO_ROOT, "docs"), (n) => /sign-?off/i.test(n) && n.endsWith(".md"));

  const out = {
    // No timestamp/date field by design -- this is a labelled "current-state snapshot", not a
    // dated time series (I17 SPEC / I4 squashed-history rule). The page supplies the "as of"
    // framing from a citable artifact date, not from this generator's run time.
    schema_version: 1,
    layers,
    dbt,
    site,
    adrs,
    signoffs,
  };

  await writeFile(OUT_FILE, JSON.stringify(out, null, 2) + "\n", "utf8");
  console.log(`gen-repo-stats: wrote ${relative(REPO_ROOT, OUT_FILE)}`);
  console.log(JSON.stringify(out, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
