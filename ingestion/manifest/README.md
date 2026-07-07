# `ingestion/manifest/` — committed drift-detection manifest (ADR-0016)

One small JSON file per `source_id`, committed to git. Together they answer "does
*this* machine's ingested `data/` match what the *current* code expects, and is it
the same vintage other instances built from?" — the local-first, free/open
equivalent of a warehouse's `source freshness` table (ADR-0016).

The raw data these files describe is **gitignored** (`data/raw/`, ADR-0001); only
this small, human-readable manifest is committed. Read/written via
`ingestion/manifest.py` (`write_manifest_entry()` / `load_manifest()`); checked via
`uv run poe verify-data` (`ingestion/verify_data.py`).

## File naming

One file per source: `<source_id>.json`, e.g. `berlin__lor_geometries.json`,
`hamburg__sozialmonitoring.json`, `berlin__osm.json`. `source_id` is always
`{city}__{source}`. One-file-per-source (rather than a single `manifest.json`)
minimizes cross-instance merge conflicts — two machines refreshing different
sources touch different files — and keeps `git diff` legible in review.

## Schema (`manifest_schema_version: 1`)

```jsonc
{
  "source_id": "berlin__lor_geometries",   // stable key; {city}__{source}
  "source_class": "pinned",                 // "pinned" | "rolling" — see taxonomy below
  "city": "berlin",
  "upstream": {
    "url": "https://…",                     // endpoint / download page
    "vintage": "2021",                       // upstream edition/vintage where exposed
    "retrieved_at": "2026-07-06T09:12:03Z"   // when THIS instance fetched it (UTC, ISO-8601)
  },
  "outputs": [                               // one per produced artefact
    {
      "path": "data/raw/berlin/lor/lor_2021_plr.parquet",  // relative to repo root, POSIX-separated
      "row_count": 542,
      "schema_fingerprint": "sha256:…",      // hash of ordered (column_name, type) pairs
      "content_hash": "sha256:…"             // hash of the produced artefact's bytes
    }
  ],
  "ingest_script": {
    "module": "ingestion.berlin.lor.ingest_lor_geometries",  // dotted module path
    "git_sha": "db64643…"                    // repo git SHA at write time ("unknown" if no git)
  },
  "manifest_schema_version": 1
}
```

`outputs[].path` is always relative to the **repo root** (not an internal "data
root" concept — every `poe`/ingestion command already runs from the repo root, so
this is the one convention every script and both tools share), and always
POSIX-separated (`.as_posix()`) so the manifest diffs identically on macOS / Linux
/ Windows-WSL2.

## The `pinned` / `rolling` taxonomy

Every `source_id` is classified once, when its manifest entry is first written.
The class decides *how* `poe verify-data` compares local reality to the manifest,
and *whether* a mismatch can make `--strict` exit non-zero.

**`pinned`** — discrete, editioned open-data releases that should be byte-identical
across instances built from the same code: all current Berlin (LOR geometries +
crosswalk, EWR, MSS + MSS indicators, Mietspiegel + Straßenverzeichnis,
Bodenrichtwerte, Kauffälle, Wohnlage) and Hamburg (geo, Sozialmonitoring,
displacement, EWR-Stadtteil, rent) sources, plus the committed dbt seeds. An
unexpected change in `schema_fingerprint`, `row_count`, `content_hash`, or the
ingest script's own git history since `ingest_script.git_sha` **is** drift:
`stale` / `wrong-shape` / `missing`, and **can** fail `--strict`.

**`rolling`** — sources that legitimately differ across instances/time. Currently
only OSM (`berlin__osm`, `hamburg__osm`): Geofabrik regenerates the source
`.osh.pbf` ~weekly, so different instances legitimately hold different PBF
vintages and different current-year partial snapshots.
- **The `.osh.pbf` itself is never a manifest `outputs[]` entry and is never
  hashed** (maintainer decision, ADR-0016) — an 11 GB file that can never gate is
  wasteful to hash. Its `upstream.vintage` (Geofabrik file date) and
  `retrieved_at` are recorded on the entry **informationally only**.
- Drift is assessed via the **extracted yearly snapshot parquets** instead (the
  artefacts that actually feed the models) — those ARE `outputs[]` entries.
- The **current partial-year snapshot** (filename containing `partial`, e.g.
  `2026-partial.parquet`) is reported `ok (rolling)` unconditionally — it is
  *expected* to differ between instances and is never compared.
- **Historical (non-partial) yearly snapshots** may drift slightly from small
  retroactive OSM edits. A row-count delta within `±ROLLING_HIST_TOLERANCE`
  (0.5%, `ingestion/manifest.py`) is `ok`; beyond that, `warn` — never a hard
  failure, never `--strict`-non-zero.
- Rolling sources can be `missing` (a truly-absent expected snapshot is still
  worth reporting) but **never** `stale` or `wrong-shape`, and **never** move
  `--strict` to non-zero, regardless of finding.

Adding a new source (a third city, a new pillar) means classifying it here when
its manifest entry is first written — the taxonomy lives in data
(`source_class`), not in `verify_data.py` branching logic.

## The one static-file exception: seeds

The dbt seeds (`transform/seeds/*.csv`) have no `ingest_*.py` script — they are
committed CSVs, not fetched from the network. Their single `berlin__seeds` manifest
entry is written by `ingestion/manifest_backfill.py` (the same one-time tool used
for the initial baseline, re-runnable whenever a seed changes) rather than by a
per-run ingestion script. `ingest_script.git_sha` for this entry is the repo HEAD
SHA at generation time (there being no separate "ingest script" commit to point
at); `ingest_script.module` is the literal string `"transform.seeds"` as a marker,
not an importable module.

## How entries get written

Each `ingestion/**/ingest_*.py` calls `write_manifest_entry(...)` from
`ingestion/manifest.py` right before its successful `return 0`, passing every
output file *currently on disk* for that source (via `manifest.existing_outputs()`)
— not just the files this particular run touched — so the manifest always reflects
current local reality, including outputs a previous run already produced.

## One-time baseline generation (`ingestion/manifest_backfill.py`)

Re-running ~20 h of OSM ingestion just to populate its manifest entry is neither
necessary nor desired. `ingestion/manifest_backfill.py` (`uv run poe
manifest-backfill`) populates every source's manifest entry from whatever is
**already on disk**, without re-fetching anything. `upstream.vintage`/
`retrieved_at` are recorded best-effort (documented per-source in the script)
where the true fetch time/edition isn't otherwise recoverable from the file
itself. This is how the initial committed baseline in this directory was
generated — see the data-engineer's handoff for which machine/session produced it.
Re-run it any time you want to refresh a manifest entry without re-fetching (e.g.
after regenerating a source from an already-downloaded local file).

## Checking drift

```bash
uv run poe verify-data            # informational; always exit 0
uv run poe verify-data --strict   # exit 1 iff a PINNED source is stale/wrong-shape/missing
```

See `ingestion/verify_data.py`'s module docstring and ADR-0016 for the full
exit-code contract and rationale.
