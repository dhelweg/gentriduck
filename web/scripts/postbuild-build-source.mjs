#!/usr/bin/env node
// Post-build: record this build's provenance in build/.build-source (#361, #369).
//
// `uv run poe release-deploy` (ops/release_deploy.py) skips the slow full rebuild after a
// `develop -> main` release merge only when this record proves the existing build is what `main`
// would produce today:
//   - tree / commit / dirty: the committed code. The tree hash is the identity, not the commit: a
//     GitHub merge commit on main has a new SHA but the same tree as the develop tip it merged.
//   - inputs: sha256 over the gitignored inputs the tree hash can't see (data/serving/*.parquet,
//     web/static/geo/**, the effective GoatCounter code). Same byte stream as
//     ops/build_provenance.py:inputs_fingerprint(); tests/ops/test_release_deploy.py checks that
//     the two agree. null when the sources record (below) can't vouch for the bundled data.
//   - exports: the export stamps of the bundled data, { serving, geo }. Each holds the
//     data/.warehouse-source record (written by `poe build`, ops/dbt_build.py) of the warehouse the
//     data was exported from. See ops/build_provenance.py "export stamps".
//       serving: data/serving/.export-source as it was at `npm run sources` time (from the sources
//         record), because that is when the bundled mart data was extracted.
//       geo: data/.geo-export-source now, because web/static/geo is copied in at build time.
//   - sources / sources_problem (#369): `evidence build` doesn't run sources, it bundles what the
//     last `npm run sources` extracted. web/.sources-source (sources-stamp.mjs) records the tree,
//     data/serving fingerprint and export stamp at sources time, and a fingerprint of the extracted
//     data. It is embedded as `sources`. Unless it is complete and matches this build's tree, the
//     current data/serving and the extracted data, `sources_problem` says why and `inputs` is
//     null, so release-deploy rebuilds.
//
// Format (JSON): { tree, commit, built_at (UTC), dirty, dirty_count, inputs, exports, sources,
// sources_problem }.
// `dirty` is true when the working tree had changes that could leak into the build (tracked edits
// anywhere, or untracked files under web/). The filter must match
// ops/build_provenance.py:relevant_dirty() (WEB_DIRTY_RULE) and its IGNORED_DIRTY_PATHS. The dirty
// paths themselves are printed to the console only: the file ships with the site (/.build-source),
// so it carries only public hashes, a timestamp and counts.
//
// Never fails the build: without git it records nulls (release-deploy then rebuilds), and a
// failure to write the file is only a warning.

import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import {
  BUILD_DIR,
  REPO_ROOT,
  SOURCES_RECORD,
  dataDirOverridden,
  extractedFingerprint,
  gitState,
  inputsFingerprint,
  readJson,
  servingFingerprint,
  sourcesProblem,
  utcNow,
} from './build-provenance.mjs';

let record;
try {
  const { tree, commit, dirtyPaths } = gitState();
  if (dirtyPaths.length) {
    console.log(`postbuild-build-source: dirty working tree (${dirtyPaths.length}):`);
    for (const line of dirtyPaths.slice(0, 50)) console.log(`  ${line}`);
  }
  record = { tree, commit, built_at: utcNow(), dirty: dirtyPaths.length > 0, dirty_count: dirtyPaths.length };
} catch (err) {
  console.warn(`postbuild-build-source: git unavailable (${String(err.message).split('\n')[0]}); recording nulls.`);
  record = { tree: null, commit: null, built_at: utcNow(), dirty: true, dirty_count: null };
}

try {
  record.inputs = await inputsFingerprint();
} catch (err) {
  console.warn(`postbuild-build-source: could not fingerprint inputs (${err.message}); recording null.`);
  record.inputs = null;
}

const sources = await readJson(SOURCES_RECORD);
let problem;
try {
  problem = dataDirOverridden()
    ? 'EVIDENCE_DATA_DIR is set; only the default extracted-data dir is recorded'
    : sourcesProblem(sources, {
        tree: record.tree,
        serving: await servingFingerprint(),
        extracted: await extractedFingerprint(),
      });
} catch (err) {
  problem = `could not check the sources record (${err.message})`;
}
record.exports = {
  serving: problem ? await readJson(join(REPO_ROOT, 'data', 'serving', '.export-source')) : sources.serving_export,
  geo: await readJson(join(REPO_ROOT, 'data', '.geo-export-source')),
};
record.sources = sources;
record.sources_problem = problem;
if (problem) {
  record.inputs = null;
  console.warn(`postbuild-build-source: ${problem}; recording inputs: null (release-deploy will rebuild).`);
}

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
