// Shared helpers for the build provenance records (#361, #369). Not a script: imported by
// postbuild-build-source.mjs (writes web/build/.build-source) and sources-stamp.mjs (writes
// web/.sources-source around `npm run sources`).
//
// relevantDirty() and inputsFingerprint() mirror ops/build_provenance.py (relevant_dirty with
// WEB_DIRTY_RULE, inputs_fingerprint). Keep the two in sync; tests/ops/test_release_deploy.py
// checks that both produce the same fingerprint.

import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

export const WEB_DIR = join(fileURLToPath(new URL('.', import.meta.url)), '..');
export const REPO_ROOT = join(WEB_DIR, '..');
export const BUILD_DIR = join(WEB_DIR, 'build');

// Where `evidence sources` writes the extracted data and `evidence build` reads it (Evidence's
// default for the `sources` command, node_modules/@evidence-dev/evidence/cli.js). Not under
// .evidence/template/ directly: `evidence build` (populateTemplate) deletes everything there except
// static/, .evidence-queries/ and .profile.json, so a record kept there would not survive the build.
export const DATA_DIR = join(WEB_DIR, '.evidence', 'template', 'static', 'data');
export const SOURCES_RECORD_REL = 'web/.sources-source';
export const SOURCES_RECORD = join(WEB_DIR, '.sources-source');

const IGNORED_DIRTY_PATHS = new Set(['ops/web-build-timings.log']);
const GIT_OPTS = { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] };

export function git(cwd, ...args) {
  return execFileSync('git', args, { ...GIT_OPTS, cwd }).trim();
}

export function relevantDirty(lines) {
  return lines.filter((line) => {
    if (line.length < 4) return false;
    const status = line.slice(0, 2);
    let path = line.slice(3).trim().replace(/^"|"$/g, '');
    if (path.includes(' -> ')) path = path.split(' -> ')[1].replace(/^"|"$/g, '');
    if (IGNORED_DIRTY_PATHS.has(path)) return false;
    if (status === '??' && !path.startsWith('web/')) return false;
    return true;
  });
}

// { tree, commit, dirtyPaths } of the checkout (web build dirty rule). Throws if git fails.
export function gitState() {
  // Run status from the repo root so porcelain paths are repo-relative (web/..., ops/...).
  const root = git(WEB_DIR, 'rev-parse', '--show-toplevel');
  const status = execFileSync('git', ['status', '--porcelain', '--untracked-files=all'], {
    ...GIT_OPTS,
    cwd: root,
  });
  return {
    tree: git(WEB_DIR, 'rev-parse', 'HEAD^{tree}'),
    commit: git(WEB_DIR, 'rev-parse', 'HEAD'),
    dirtyPaths: relevantDirty(status.split('\n').filter(Boolean)),
  };
}

export async function filesUnder(dir, recursive, filter = () => true) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }
  const out = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory() && recursive) out.push(...(await filesUnder(full, true, filter)));
    else if (entry.isFile() && filter(entry.name)) out.push(full);
  }
  return out;
}

export async function readJson(path) {
  try {
    const data = JSON.parse(await readFile(path, 'utf8'));
    return data && typeof data === 'object' && !Array.isArray(data) ? data : null;
  } catch {
    return null;
  }
}

export function utcNow() {
  return new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
}

// Per file, sorted by posix path relative to `base`: "file\0" + path + "\0" + size + "\0" + bytes.
async function hashFiles(h, base, files) {
  const pairs = files.map((full) => [relative(base, full).split(sep).join('/'), full]);
  pairs.sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0));
  for (const [rel, full] of pairs) {
    const { size } = await stat(full);
    h.update(Buffer.from(`file\0${rel}\0${size}\0`, 'utf8'));
    for await (const chunk of createReadStream(full)) h.update(chunk);
  }
}

const servingParquet = () =>
  filesUnder(join(REPO_ROOT, 'data', 'serving'), false, (n) => n.endsWith('.parquet'));

async function goatcounterCode() {
  if (process.env.GOATCOUNTER_CODE) return process.env.GOATCOUNTER_CODE.trim();
  try {
    return (await readFile(join(WEB_DIR, 'goatcounter-code.txt'), 'utf8')).trim();
  } catch {
    return '';
  }
}

// Byte stream (must match ops/build_provenance.py:inputs_fingerprint):
//   the per-file stream above over data/serving/*.parquet + web/static/geo/** (repo-relative)
//   then:  "goatcounter\0" + code + "\0"
export async function inputsFingerprint() {
  const files = [...(await servingParquet()), ...(await filesUnder(join(REPO_ROOT, 'web', 'static', 'geo'), true))];
  const h = createHash('sha256');
  await hashFiles(h, REPO_ROOT, files);
  h.update(Buffer.from(`goatcounter\0${await goatcounterCode()}\0`, 'utf8'));
  return h.digest('hex');
}

// #369: the serving parquet only (what `npm run sources` reads). JS-only, so no Python mirror.
export async function servingFingerprint() {
  const h = createHash('sha256');
  await hashFiles(h, REPO_ROOT, await servingParquet());
  return h.digest('hex');
}

// #369: the extracted data `evidence build` bundles: DATA_DIR/manifest.json plus every file in
// DATA_DIR's subdirectories (one per source). Other top-level files are skipped: the build copies
// web/static/data/* (e.g. repo-stats.json, tracked in git) in next to them. null = no manifest.
export async function extractedFingerprint() {
  const manifest = join(DATA_DIR, 'manifest.json');
  try {
    if (!(await stat(manifest)).isFile()) return null;
  } catch {
    return null;
  }
  let entries = [];
  try {
    entries = await readdir(DATA_DIR, { withFileTypes: true });
  } catch {
    return null;
  }
  const files = [manifest];
  for (const entry of entries) {
    if (entry.isDirectory()) files.push(...(await filesUnder(join(DATA_DIR, entry.name), true)));
  }
  const h = createHash('sha256');
  await hashFiles(h, DATA_DIR, files);
  return h.digest('hex');
}

// #369: the parquet files manifest.json points to that this `npm run sources` run did not write.
// Evidence keeps the previous run's file (and its manifest entry) for every query it doesn't
// re-run: partial runs (--changed, --queries, --sources), and in non-strict mode a query that
// failed or returned no rows. Those files are older than `startMs` (or gone). Returns a list of
// problems; empty = every bundled query result was written by this run.
export async function staleExtractedFiles(startMs) {
  const manifest = await readJson(join(DATA_DIR, 'manifest.json'));
  if (!manifest || typeof manifest.renderedFiles !== 'object' || manifest.renderedFiles === null) {
    return ['no readable manifest.json in the extracted data'];
  }
  const problems = [];
  for (const urls of Object.values(manifest.renderedFiles)) {
    for (const url of Array.isArray(urls) ? urls : []) {
      // <url prefix>/<source>/<query>/<query>.parquet, mapped to disk as `evidence build` does.
      const diskParts = String(url).split('/').slice(-3);
      const shown = diskParts.join('/');
      let mtimeMs;
      try {
        ({ mtimeMs } = await stat(join(DATA_DIR, ...diskParts)));
      } catch {
        problems.push(`${shown} is missing`);
        continue;
      }
      if (mtimeMs < startMs) problems.push(`${shown} was not rewritten by this run`);
    }
  }
  return problems;
}

// #369: why the sources record can't vouch for the data this build bundles (null = it can).
// `live` = { tree, dirty, serving, extracted } measured at build time.
export function sourcesProblem(record, live) {
  const name = SOURCES_RECORD_REL;
  if (!record) return `no ${name} (npm run sources predates #369, or never ran here)`;
  if (!record.complete) return `${name}: the last npm run sources is unusable (${record.reason || 'incomplete'})`;
  if (!record.tree || record.dirty !== false) return `${name}: npm run sources ran on a dirty or unknown working tree`;
  if (record.tree !== live.tree) {
    return `npm run sources ran on tree ${String(record.tree).slice(0, 12)}, the build on ${String(live.tree).slice(0, 12)}`;
  }
  if (!record.serving || record.serving !== live.serving) {
    return `data/serving changed since npm run sources (${String(record.serving).slice(0, 12)} != ${String(live.serving).slice(0, 12)})`;
  }
  if (!record.extracted || record.extracted !== live.extracted) {
    return 'the extracted data in web/.evidence/template/static/data changed since the recorded npm run sources';
  }
  return null;
}

// EVIDENCE_DATA_DIR moves the extracted data elsewhere; the records only cover the default place.
export function dataDirOverridden() {
  return Boolean(process.env.EVIDENCE_DATA_DIR) && process.env.EVIDENCE_DATA_DIR !== './.evidence/template/static/data';
}
