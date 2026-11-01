#!/usr/bin/env node
// Post-build: record this build's provenance in build/.build-source (#361).
//
// `uv run poe release-deploy` (ops/release_deploy.py) skips the slow full rebuild after a
// `develop -> main` release merge only when this record proves the existing build is what `main`
// would produce today:
//   - tree / commit / dirty: the committed code. The tree hash is the identity, not the commit: a
//     GitHub merge commit on main has a new SHA but the same tree as the develop tip it merged.
//   - inputs: sha256 over the gitignored inputs the tree hash can't see (data/serving/*.parquet,
//     web/static/geo/**, the effective GoatCounter code). Same byte stream as
//     ops/build_provenance.py:inputs_fingerprint(); tests/ops/test_release_deploy.py checks that
//     the two agree.
//   - exports: the export stamps of the bundled data, { serving, geo }, copied from
//     data/serving/.export-source (transform/export_serving_parquet.py) and
//     data/.geo-export-source (web/scripts/export_area_geojson.py). Each holds the
//     data/.warehouse-source record (written by `poe build`, ops/dbt_build.py) of the warehouse the
//     data was exported from. See ops/build_provenance.py "export stamps".
//
// Format (JSON): { tree, commit, built_at (UTC), dirty, dirty_count, inputs, exports }.
// `dirty` is true when the working tree had changes that could leak into the build (tracked edits
// anywhere, or untracked files under web/). The filter must match
// ops/build_provenance.py:relevant_dirty() (WEB_DIRTY_RULE) and its IGNORED_DIRTY_PATHS. The dirty
// paths themselves are printed to the console only: the file ships with the site (/.build-source),
// so it carries only public hashes, a timestamp and counts.
//
// Never fails the build: without git it records nulls (release-deploy then rebuilds), and a
// failure to write the file is only a warning.

import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const WEB_DIR = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const REPO_ROOT = join(WEB_DIR, '..');
const BUILD_DIR = join(WEB_DIR, 'build');
const IGNORED_DIRTY_PATHS = new Set(['ops/web-build-timings.log']);
const GIT_OPTS = { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] };

function git(cwd, ...args) {
  return execFileSync('git', args, { ...GIT_OPTS, cwd }).trim();
}

function relevantDirty(lines) {
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

async function filesUnder(dir, recursive, filter = () => true) {
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

async function goatcounterCode() {
  if (process.env.GOATCOUNTER_CODE) return process.env.GOATCOUNTER_CODE.trim();
  try {
    return (await readFile(join(WEB_DIR, 'goatcounter-code.txt'), 'utf8')).trim();
  } catch {
    return '';
  }
}

// Byte stream (must match ops/build_provenance.py:inputs_fingerprint):
//   per file, sorted by repo-relative posix path:  "file\0" + path + "\0" + size + "\0" + bytes
//   then:                                          "goatcounter\0" + code + "\0"
async function inputsFingerprint() {
  const files = [
    ...(await filesUnder(join(REPO_ROOT, 'data', 'serving'), false, (n) => n.endsWith('.parquet'))),
    ...(await filesUnder(join(REPO_ROOT, 'web', 'static', 'geo'), true)),
  ].map((full) => [relative(REPO_ROOT, full).split(sep).join('/'), full]);
  files.sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0));
  const h = createHash('sha256');
  for (const [rel, full] of files) {
    const { size } = await stat(full);
    h.update(Buffer.from(`file\0${rel}\0${size}\0`, 'utf8'));
    for await (const chunk of createReadStream(full)) h.update(chunk);
  }
  h.update(Buffer.from(`goatcounter\0${await goatcounterCode()}\0`, 'utf8'));
  return h.digest('hex');
}

async function readStamp(...parts) {
  try {
    const data = JSON.parse(await readFile(join(REPO_ROOT, ...parts), 'utf8'));
    return data && typeof data === 'object' && !Array.isArray(data) ? data : null;
  } catch {
    return null;
  }
}

const builtAt = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
let record;
try {
  // Run status from the repo root so porcelain paths are repo-relative (web/..., ops/...).
  const root = git(WEB_DIR, 'rev-parse', '--show-toplevel');
  const status = execFileSync('git', ['status', '--porcelain', '--untracked-files=all'], {
    ...GIT_OPTS,
    cwd: root,
  });
  const dirtyPaths = relevantDirty(status.split('\n').filter(Boolean));
  if (dirtyPaths.length) {
    console.log(`postbuild-build-source: dirty working tree (${dirtyPaths.length}):`);
    for (const line of dirtyPaths.slice(0, 50)) console.log(`  ${line}`);
  }
  record = {
    tree: git(WEB_DIR, 'rev-parse', 'HEAD^{tree}'),
    commit: git(WEB_DIR, 'rev-parse', 'HEAD'),
    built_at: builtAt,
    dirty: dirtyPaths.length > 0,
    dirty_count: dirtyPaths.length,
  };
} catch (err) {
  console.warn(`postbuild-build-source: git unavailable (${String(err.message).split('\n')[0]}); recording nulls.`);
  record = { tree: null, commit: null, built_at: builtAt, dirty: true, dirty_count: null };
}

try {
  record.inputs = await inputsFingerprint();
} catch (err) {
  console.warn(`postbuild-build-source: could not fingerprint inputs (${err.message}); recording null.`);
  record.inputs = null;
}
record.exports = {
  serving: await readStamp('data', 'serving', '.export-source'),
  geo: await readStamp('data', '.geo-export-source'),
};

try {
  await writeFile(join(BUILD_DIR, '.build-source'), JSON.stringify(record, null, 2) + '\n');
  console.log(
    `postbuild-build-source: tree ${String(record.tree).slice(0, 12)} commit ${String(record.commit).slice(0, 12)}` +
      ` dirty=${record.dirty} inputs ${String(record.inputs).slice(0, 12)}` +
      ` exported from warehouse ${String(record.exports.serving?.warehouse?.tree).slice(0, 12)} -> build/.build-source`,
  );
} catch (err) {
  console.warn(`postbuild-build-source: could not write build/.build-source (${err.message}); release-deploy will rebuild.`);
}
