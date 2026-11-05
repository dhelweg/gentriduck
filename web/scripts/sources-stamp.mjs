#!/usr/bin/env node
// #369: record what `npm run sources` extracted, in web/.sources-source (gitignored).
//
// `npm run build` (evidence build) does not run sources: it bundles whatever the last
// `npm run sources` left in web/.evidence/template/static/data. So the build's provenance
// (web/build/.build-source, postbuild-build-source.mjs) must describe the data as it was at sources
// time, not data/serving as it is at build time. This script is the npm `presources`/`postsources`
// hook (also for `sources:strict`):
//
//   start   (presources)  overwrite the record with { complete: false, reason: "in progress" }.
//           A sources run that fails or is killed (npm then skips postsources) leaves no usable
//           record. The record's mtime marks the start of the run.
//   finish  (postsources) write the record:
//             tree / commit / dirty, dirty_count: the checkout at sources time (web build rule).
//               The source queries (web/sources/**) and the committed tables they read (docs/**)
//               are part of the tree.
//             serving: sha256 over data/serving/*.parquet at sources time.
//             serving_export: data/serving/.export-source at sources time.
//             extracted: sha256 over the extracted data (manifest.json + the per-source dirs).
//             complete: false (+ reason) if any query result manifest.json points to was not
//               written by this run. npm doesn't pass `npm run sources -- --changed` args to the
//               hooks, so partial runs (--changed, --queries, --sources) are detected by their
//               effect instead: Evidence keeps the old file for every query it skips. The same
//               catches a non-strict run in which a query failed or returned no rows.
//
// postbuild-build-source.mjs embeds the record and records `inputs: null` (release-deploy then
// rebuilds) unless it is complete and matches the build's tree, data/serving and extracted data.
//
// Never fails `npm run sources` because of the record, except when `start` can neither write nor
// delete it (an old record would otherwise outlive a run it doesn't describe).

import { stat, unlink, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import {
  REPO_ROOT,
  SOURCES_RECORD,
  SOURCES_RECORD_REL,
  dataDirOverridden,
  extractedFingerprint,
  gitState,
  readJson,
  servingFingerprint,
  staleExtractedFiles,
  utcNow,
} from './build-provenance.mjs';

const IN_PROGRESS = 'npm run sources in progress';
const write = (record) => writeFile(SOURCES_RECORD, JSON.stringify(record, null, 2) + '\n');

async function start() {
  try {
    await write({ complete: false, reason: IN_PROGRESS, started_at: utcNow() });
  } catch (err) {
    try {
      await unlink(SOURCES_RECORD);
    } catch (unlinkErr) {
      if (unlinkErr.code !== 'ENOENT') {
        console.error(`sources-stamp: cannot write or remove ${SOURCES_RECORD_REL} (${err.message}).`);
        process.exit(1);
      }
    }
    console.warn(`sources-stamp: could not write ${SOURCES_RECORD_REL} (${err.message}); no record.`);
  }
}

async function finish() {
  const previous = await readJson(SOURCES_RECORD);
  const record = { complete: false, started_at: previous?.started_at ?? null, recorded_at: utcNow() };
  const reasons = [];
  let startMs = null;
  if (previous?.complete === false && previous.reason === IN_PROGRESS) {
    startMs = (await stat(SOURCES_RECORD)).mtimeMs;
  } else {
    reasons.push('postsources ran without presources (no in-progress record)');
  }
  try {
    const state = gitState();
    Object.assign(record, {
      tree: state.tree,
      commit: state.commit,
      dirty: state.dirtyPaths.length > 0,
      dirty_count: state.dirtyPaths.length,
    });
  } catch (err) {
    Object.assign(record, { tree: null, commit: null, dirty: true, dirty_count: null });
    reasons.push(`git unavailable (${String(err.message).split('\n')[0]})`);
  }
  record.serving = await servingFingerprint();
  record.serving_export = await readJson(join(REPO_ROOT, 'data', 'serving', '.export-source'));
  record.extracted = await extractedFingerprint();
  if (dataDirOverridden()) reasons.push('EVIDENCE_DATA_DIR is set; only the default data dir is recorded');
  if (startMs !== null) {
    const stale = await staleExtractedFiles(startMs);
    if (stale.length) {
      reasons.push(
        `${stale.length} bundled query result(s) not written by this run (a partial run such as ` +
          `--changed/--queries/--sources, or a failed or empty query): ${stale.slice(0, 5).join('; ')}` +
          (stale.length > 5 ? '; ...' : ''),
      );
    }
  }
  if (reasons.length) record.reason = reasons.join('; ');
  else record.complete = true;
  // Key order for readers: verdict first.
  const ordered = { complete: record.complete, ...(record.reason ? { reason: record.reason } : {}), ...record };
  await write(ordered);
  if (ordered.complete) {
    console.log(
      `sources-stamp: ${SOURCES_RECORD_REL}: tree ${String(ordered.tree).slice(0, 12)} dirty=${ordered.dirty}` +
        ` serving ${String(ordered.serving).slice(0, 12)} extracted ${String(ordered.extracted).slice(0, 12)}`,
    );
  } else {
    console.warn(
      `sources-stamp: ${SOURCES_RECORD_REL}: this sources run can't vouch for a release build ` +
        `(release-deploy will rebuild): ${ordered.reason}`,
    );
  }
}

const mode = process.argv[2];
if (mode === 'start') await start();
else if (mode === 'finish') {
  try {
    await finish();
  } catch (err) {
    // The in-progress record (if any) stays: still unusable, so nothing is vouched for.
    console.warn(`sources-stamp: could not record this sources run (${err.message}); release-deploy will rebuild.`);
  }
} else {
  console.error('usage: node scripts/sources-stamp.mjs start|finish');
  process.exit(2);
}
