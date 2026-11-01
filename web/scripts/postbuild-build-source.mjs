#!/usr/bin/env node
// Post-build: record which source tree this build came from, in build/.build-source (#361).
//
// `uv run poe release-deploy` (ops/release_deploy.py) skips the slow full rebuild after a
// `develop -> main` release merge when the existing build was made from a tree identical to
// origin/main's (`git rev-parse origin/main^{tree}`). The tree hash, not the commit, is the
// identity: a GitHub merge commit on main has a new SHA but the same tree as the develop tip it
// merged. This file is the evidence for that check.
//
// Format (JSON): { tree, commit, built_at (UTC ISO-8601), dirty, dirty_paths }.
// `dirty` is true when the working tree had changes that could leak into the build (tracked edits
// anywhere, or untracked files under web/). release_deploy.py never skips on a dirty build.
// The filter must match ops/release_deploy.py:relevant_dirty() and its IGNORED_DIRTY_PATHS.
//
// Never fails the build: without git (e.g. a source tarball) it writes nulls, which simply makes
// release-deploy rebuild. The file ships with the site (/.build-source); it holds only a public
// commit hash and a timestamp.

import { execFileSync } from 'node:child_process';
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const WEB_DIR = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const BUILD_DIR = join(WEB_DIR, 'build');
const IGNORED_DIRTY_PATHS = new Set(['ops/web-build-timings.log']);

function git(...args) {
  return execFileSync('git', args, { cwd: WEB_DIR, encoding: 'utf8' }).trim();
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

let record;
try {
  // Run from the repo root so porcelain paths are repo-relative (web/..., ops/...).
  const root = git('rev-parse', '--show-toplevel');
  const status = execFileSync('git', ['status', '--porcelain', '--untracked-files=all'], {
    cwd: root,
    encoding: 'utf8',
  });
  const dirtyPaths = relevantDirty(status.split('\n').filter(Boolean));
  record = {
    tree: git('rev-parse', 'HEAD^{tree}'),
    commit: git('rev-parse', 'HEAD'),
    built_at: new Date().toISOString().replace(/\.\d{3}Z$/, 'Z'),
    dirty: dirtyPaths.length > 0,
    dirty_paths: dirtyPaths.slice(0, 50),
  };
} catch (err) {
  console.warn(`postbuild-build-source: git unavailable (${err.message.split('\n')[0]}); recording nulls.`);
  record = { tree: null, commit: null, built_at: new Date().toISOString(), dirty: true, dirty_paths: [] };
}

await writeFile(join(BUILD_DIR, '.build-source'), JSON.stringify(record, null, 2) + '\n');
console.log(
  `postbuild-build-source: tree ${String(record.tree).slice(0, 12)} commit ${String(record.commit).slice(0, 12)}` +
    ` dirty=${record.dirty} -> build/.build-source`,
);
