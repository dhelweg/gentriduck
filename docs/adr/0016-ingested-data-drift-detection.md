# ADR-0016: Ingested-data drift detection across local instances

- **Status:** Accepted — 2026-07-06, maintainer approved with one adjustment: the OSM Germany
  `.osh.pbf` is **not** hashed or manifest-tracked as an artefact; drift for the OSM rolling source is
  assessed via its **extracted snapshot parquets** instead (see Decision §2 and *Resolved decisions*).
  **Amendment A (2026-08-01, #333) is `Proposed`** and awaits maintainer sign-off — see below.
- **Date:** 2026-07-06
- **Process note:** drafted as `Proposed`; flipped to `Accepted` on 2026-07-06 upon the maintainer's
  explicit sign-off (per the ADR-0012 process-note discipline — an ADR must never pre-declare
  `Accepted` before real approval exists). This is an architecture/ops/tooling decision that composes
  **already-approved tools** (`poe`/poethepoet, DuckDB, Python stdlib, git) and introduces **no new
  tool, library, data source, or paid service**; it therefore does not add a golden-rule-#2
  dependency. **No methodology sign-off is required** — it touches none of the R-C1 methodology paths
  (no index weights, normalization, or spatial method); it only decides *whether local ingested data
  matches what the code expects*, not *what the numbers mean*.

## Context

Gentriduck runs on **multiple instances** — the maintainer's macOS dev machine, the Linux
automation/devmode host, and Windows/WSL2. Per ADR-0001/0002/0015, **raw data is gitignored and
rebuilt from open sources** (`uv run poe refresh` / `poe ingest`); only small golden/reference files
and seeds are committed. Nothing today records *what a given machine actually ingested*, so an
instance's `data/` can silently fall out of sync with the current code and other instances.

This session that gap produced a real, expensive-to-diagnose incident on one local instance:

- **Berlin LOR geometry** was ingested under a **pre-#134 filename scheme** (`lor_2021.parquet`
  instead of `*_plr.parquet`, and no `*_bzr` files). The models glob-matched **nothing** → empty
  outputs.
- **Seed-shaped drift**: the local DuckDB's ingested/seed tables **predated added columns**
  (`native_crs_epsg` on `dim_city`, `reverse_weight` on the LOR crosswalk) → a cryptic DuckDB
  "CSV sniffing" `COPY` error, far from the real cause.
- **Hamburg was entirely absent** on that instance.

**What dbt tests did and did not do.** The dbt structural tests (`assert_not_empty`,
`assert_min_rows`, seed-load errors) *did* catch the empty/broken states — but only **after a full
`dbt build`**, with confusing downstream errors rather than a pointer at the stale source. More
fundamentally, **dbt tests cannot catch silent staleness**: data that is *old-but-non-empty* — e.g.
an upstream source re-published with corrected numbers while the previous parquet is still present on
disk — passes every structural test and stays fully green. So dbt tests are **necessary but not
sufficient** as a cross-instance drift/sync signal. We need a cheap, explicit signal that answers
"is *this machine's* ingested data what the *current code* expects, and is it the *same vintage* other
instances built from?" **without** paying for a full build and **without** syncing raw bytes.

### Constraints this ADR must respect (CLAUDE.md golden rules; ADR-0001/0002/0012/0015)

- **Free + open + open-data only; no new paid service.** No DVC remote, object store, or hosted
  sync as a hard dependency.
- **Local-first** (golden rule #5): a fresh clone must still `poe refresh` and work with **no
  account**. The drift signal must be a *local* check, not a call to a hosted service.
- **Cross-platform** (mac / Windows-WSL2 / Linux): pure-Python + git; no OS-specific CLI, no
  reliance on filesystem-specific metadata.
- **Do not fight the rebuild-from-source design.** Raw bytes are gitignored *on purpose*; the OSM
  Germany full-history `.osh.pbf` is ~11 GB and ~20 h to build and login-gated (ADR-0002). Syncing
  raw bytes between instances is explicitly **out of scope** (see Alternatives).
- **Graceful degradation of `poe refresh`** (ADR-0015): a missing/stale *optional* source must
  **inform, not abort**, the refresh; only genuinely-broken invariants may hard-fail.

## Decision

Do **not** sync raw ingested bytes between instances. Instead, make each instance's ingested state
**self-describing and comparable via a tiny committed manifest**, and add a fast local check that
diffs local reality against that manifest. Three parts:

### 1. Per-source committed manifest

Every ingestion script, on success, writes/updates a **manifest entry** for the source(s) it
produces. The manifest is **small, human-readable, and committed to git** (the raw bytes it
describes are *not*). It is the free, local-first analogue of a warehouse's source-freshness table.

**Location.** A directory `ingestion/manifest/`, one JSON file per source keyed by a stable
`source_id` (e.g. `ingestion/manifest/berlin__lor_geometries.json`). One-file-per-source (rather than
a single `data/manifest.json`) minimizes cross-instance **merge conflicts** — two machines refreshing
different sources touch different files — and keeps diffs legible in review. (`data/` is gitignored,
so the manifest cannot live there; it belongs under the committed `ingestion/` tree.)

**Schema (per source entry).** Minimum fields:

```jsonc
{
  "source_id": "berlin__lor_geometries",   // stable key; {city}__{source}
  "source_class": "pinned",                 // "pinned" | "rolling" (see taxonomy below)
  "city": "berlin",
  "upstream": {
    "url": "https://…",                     // endpoint / download page
    "vintage": "2021",                       // upstream edition/vintage where exposed (year, release id, "n/a")
    "retrieved_at": "2026-07-06T09:12:03Z"   // when THIS instance fetched it (UTC, ISO-8601)
  },
  "outputs": [                               // one per produced artefact (a script may emit several)
    {
      "path": "berlin/lor/2021_plr.parquet", // path relative to the data root (portable across instances)
      "row_count": 542,
      "schema_fingerprint": "sha256:…",      // hash of ordered (column_name, type) pairs — catches added/renamed cols
      "content_hash": "sha256:…"             // hash of the produced artefact's content (see note on rolling sources)
    }
  ],
  "ingest_script": {
    "module": "ingestion.berlin.lor.ingest_lor_geometries",
    "git_sha": "db64643…"                    // repo git SHA at ingest time (short or full)
  },
  "manifest_schema_version": 1
}
```

Rationale for each field is the incident: `schema_fingerprint` catches the added-column / seed-shape
drift; `outputs[].path` + `row_count` catch the pre-#134 filename scheme (expected `*_plr.parquet`
absent → **missing**) and the empty-glob case; `git_sha` catches "your ingestion code moved on";
`upstream.vintage` catches silent republication of a pinned source; a source with **no manifest
entry at all** catches "Hamburg entirely absent."

**Who writes it.** The ingestion scripts themselves (a shared `ingestion/manifest.py` helper,
implemented post-approval). Writing at ingest time — not from a separate scan — is what lets us also
record `retrieved_at`, `upstream.vintage`, and the ingesting `git_sha`, none of which are
recoverable by later inspecting the parquet.

### 2. Source-class taxonomy (how each source is compared)

Every `source_id` is classified once, in the manifest, as **pinned** or **rolling**. The class
decides *how* `verify-data` compares local reality to the manifest and *whether* a mismatch can
hard-fail.

**Pinned / published sources — mismatch is real drift, surfaced loudly.** These are discrete,
editioned open-data releases that should be identical across instances built from the same code:
Berlin **EWR**, **LOR geometries** (PLR/BZR), **Mietspiegel**, **MSS**, **Bodenrichtwerte /
Kauffälle / Wohnlage**, all committed **seeds**, and the **Hamburg equivalents** (geo /
Sozialmonitoring / displacement / EWR / rent). For these, an unexpected change in
`schema_fingerprint`, `content_hash`, `upstream.vintage`, or `ingest_script.git_sha` **is** drift and
is reported as `stale`/`wrong-shape`/`missing`.

**Rolling sources — vintage recorded informationally; NEVER hard-fail on hash/vintage.** The OSM
Germany full-history `.osh.pbf` is **regenerated ~weekly by Geofabrik**, so different instances *will
legitimately* hold different PBF vintages, and the derived **current/partial-year snapshot** (e.g.
`2026`-partial) is *expected* to differ between machines. Handling:

- **The OSM PBF is NOT hashed or manifest-tracked as an artefact** (maintainer decision, 2026-07-06):
  hashing an ~11 GB file that can never gate is wasteful. The PBF's `upstream.vintage` (Geofabrik file
  date) + `retrieved_at` are recorded **informationally only, with no `content_hash`**. Drift for the
  OSM rolling source is assessed entirely via its **extracted snapshot parquet outputs** (the yearly
  files that actually feed the models), not via the raw input.
- **The current partial-year snapshot** (e.g. `2026`-partial) → `source_class: "rolling"`; reported as
  `ok (rolling)` regardless of differences and flagged purely as informational context ("partial-year
  snapshot; expected to differ"). A differing OSM vintage is **never** `stale` and **never** exits
  non-zero.
- **Historical yearly OSM snapshots (2008 … last *full* year)** are largely stable, but small
  **retroactive edits** to historical OSM data are normal. These MAY be reconciled within a
  **tolerance**: a row-count delta within `±ROLLING_HIST_TOLERANCE` (proposed default **0.5%**,
  configurable) → `ok`; beyond tolerance → **`warn`**, never a hard fail. This surfaces "your 2015
  snapshot drifted 12%" (worth a look) without whining about a handful of retroactive edits.

The classification and its rationale live in each manifest entry (`source_class`) so the taxonomy is
**data, not code branching**, and a new city's sources are classified when their manifest is first
written.

### 3. `poe verify-data` — a fast, actionable local check

A new pure-Python task (`verify_data.py`, wired as `poe verify-data`) that, **in seconds and without
any `dbt build`**, walks the committed manifest and compares each source to local reality
(file presence, `row_count` and `schema_fingerprint` read cheaply from the parquet footer / a
`LIMIT 0` DuckDB describe, `content_hash` only where required by class), classifying each source:

| Status | Meaning | Pinned | Rolling |
|---|---|---|---|
| `ok` | local matches manifest (within tolerance for rolling-historical) | yes | yes (incl. rolling PBF/partial-year, always) |
| `stale` | script `git_sha` or `upstream.vintage` differs from manifest | **yes** | never (rolling records vintage informationally) |
| `wrong-shape` | `schema_fingerprint` or `row_count` mismatch (beyond tolerance) | **yes** | historical-yearly beyond tolerance → **`warn`**, not this |
| `missing` | manifest entry exists but the local artefact/expected file is absent | **yes** | **yes** (a truly-absent PBF is still worth reporting) |
| `warn` | rolling-historical row-count outside tolerance; or informational note | rare | **yes** |

Output is a compact, colorized-optional table (source_id, class, status, one-line detail) plus a
summary line, e.g. `12 ok · 1 stale · 1 missing · 2 ok(rolling)`.

**Exit-code contract (must not break `poe refresh`'s graceful degradation, ADR-0015):**

- Default (`poe verify-data`): **exit 0** for an all-`ok`/`warn`/`ok(rolling)` state; **exit 0 with a
  loud summary** even when there are `stale`/`missing` findings — i.e. by default it **informs**, it
  does not gate. This keeps it safe to call at the *start* of `poe refresh` as a diagnostic without
  aborting a legitimate rebuild.
- `poe verify-data --strict`: **exit non-zero** if any **pinned** source is `stale`/`wrong-shape`/
  `missing`. Rolling sources can **never** move `--strict` to non-zero (constraint honored:
  PBF/partial-year vintage differences never hard-fail; rolling-historical beyond tolerance is `warn`,
  not a strict failure). `--strict` is the mode for a "is this instance trustworthy before I trust its
  build?" pre-flight (devmode PM, CI-equivalent, or the maintainer before a `develop → main` merge).
- `poe refresh` integration: `refresh` MAY call `verify-data` (non-strict) first to print a
  pre-refresh diagnostic, but refresh's own behavior is unchanged — it still degrades gracefully per
  ADR-0015. `verify-data` never *becomes* a hard step of `refresh`.

### 4. dbt tests remain the structural/invariant layer (optional strengthening)

`verify-data` is a **sync/vintage** signal; it does not replace dbt's structural tests
(`assert_not_empty`, `assert_min_rows`, seed-load, relationship/uniqueness). Optional, non-blocking
strengthening for later (its own small task, not this ADR): **row-count reconciliation** tests that
pin *expected* counts for pinned sources (building on the existing `assert_min_rows`) so a full build
also flags a pinned-source count drift — a defense-in-depth complement to the manifest, not a
substitute.

### Relationship to dbt `source freshness`

dbt's built-in `source freshness` is `loaded_at`-column based and assumes a warehouse table with an
ingestion timestamp column. **Our "sources" are files and HTTP downloads**, ingested into DuckDB by
Python — there is no `loaded_at` column to poll, and no live warehouse to query for it. The
**committed manifest is the free, local-first equivalent**: `upstream.vintage` + `retrieved_at` +
`content_hash` play the role `dbt source freshness` plays for a warehouse table, but for
rebuilt-from-source files, and comparably *across instances* (which `source freshness` cannot do,
since it only knows one warehouse).

### Explicitly out of scope: sharing BUILT state (marts) between instances

This ADR covers **ingested-source** drift only. The separate question of **sharing built marts**
between dev instances (so machine B doesn't rebuild what machine A already built) is **out of scope**.
MotherDuck free-tier could technically host shared built state, but **ADR-0012 deliberately kept
MotherDuck off the serving path** and local-first intact; introducing it as a cross-instance mart
cache is a **future ADR**, not part of this decision. Stated here so scope stays tight.

## Consequences

- **Cheap, actionable drift signal.** `poe verify-data` tells a developer in seconds that (this
  session's) LOR filename-scheme drift, seed-column drift, or an absent Hamburg would be `missing` /
  `wrong-shape` / `missing` — *before* a confusing full-build failure, with a pointer at the exact
  source.
- **Silent staleness becomes visible.** A pinned source re-published upstream (new `vintage`) while an
  old parquet lingers now shows as `stale` — the class of failure dbt tests structurally cannot see.
- **OSM stays frictionless.** Weekly PBF regeneration and partial-year snapshots never block or
  hard-fail on any instance; the constraint is honored as a first-class part of the taxonomy.
- **Tiny git footprint, no new service.** The manifest is a few KB of JSON per source; raw bytes stay
  gitignored and rebuilt. No paid tool, no account, cross-platform (pure Python + git).
- **Small ongoing obligation.** Each ingestion script must write its manifest entry (shared helper),
  and adding a source means classifying it `pinned`/`rolling`. This is light and localized to
  `ingestion/`.
- **Not a build gate by default.** Because default `verify-data` is exit-0/informational, it cannot
  wedge `poe refresh`; teams opt into gating via `--strict` where they want it.

## Alternatives considered

- **Sync raw bytes via DVC + remote** — DVC is open-source (Apache-2.0), but a *useful* DVC remote is
  an object store (S3/GCS/etc.) = a paid/hosted dependency, and it fights the deliberate
  rebuild-from-source design (esp. the ~11 GB login-gated OSM PBF). **Rejected.**
- **rsync / object store mirror of `data/`** — moves gigabytes (incl. the OSM PBF) between machines,
  needs a host/credentials, and re-introduces the very "shared raw bytes" coupling ADR-0001/0002 avoid.
  **Rejected** (not free/local-first at any useful size).
- **git-LFS for ingested artefacts** — LFS is free only within GitHub's small quota; the parquet/PBF
  volume blows past it and it still commits *bytes* we intentionally rebuild. **Rejected.**
- **MotherDuck free-tier as a shared warehouse / mart cache** — off the serving path by ADR-0012 and
  a hosted account dependency; and for *ingested-source* drift it solves nothing the manifest doesn't.
  **Deferred** to a future ADR *only* for the separate built-mart-sharing question (out of scope above).
- **Rely on dbt tests alone** — necessary but insufficient: they need a full build, give confusing
  downstream errors, and **cannot detect silent staleness** (old-but-non-empty). Kept as the
  complementary structural layer, not the drift signal. **Insufficient on its own.**

## Phased implementation plan (post-approval; for the data-engineer)

1. **Manifest schema + helper (no behavior change).** Add `ingestion/manifest.py`: a typed
   `write_manifest_entry(...)` / `load_manifest()` helper, the JSON schema above
   (`manifest_schema_version: 1`), and `ingestion/manifest/` with a short README documenting the
   schema and the `pinned`/`rolling` taxonomy. Pure stdlib (`json`, `hashlib`) + the existing DuckDB
   dep for schema/row-count reads. **Do not** touch models, `pyproject.toml` beyond adding the poe
   task in step 3, or any in-flight gentrification-index work.
2. **Wire ingestion scripts to write entries.** In each `ingestion/**/ingest_*.py`, call the helper on
   success with the source's `source_id`, class, outputs, upstream vintage, and `git_sha`. Do Berlin
   pinned sources first (LOR, EWR, MSS, price/rent, Mietspiegel, seeds), then Hamburg, then classify
   the OSM sources as `rolling` last. Commit the generated manifest entries.
3. **`verify_data.py` + `poe verify-data`.** Implement the classifier and the exit-code contract
   (default informational; `--strict` gates on pinned only; rolling never hard-fails; rolling-historical
   tolerance `ROLLING_HIST_TOLERANCE`, default 0.5%). Add the `poe verify-data` task.
4. **Optional `refresh` pre-flight.** Have `poe refresh` print a non-strict `verify-data` summary
   first (informational; ADR-0015 graceful degradation preserved).
5. **Optional dbt strengthening (separate task).** Pinned row-count reconciliation tests building on
   `assert_min_rows`; non-blocking, defense-in-depth.

## Resolved decisions (maintainer sign-off, 2026-07-06)

- **No hashing of the OSM PBF.** Do **not** hash the ~11 GB PBF at all (not even a surrogate). The OSM
  rolling source's drift is assessed via its **extracted snapshot parquets** — the artefacts that feed
  the models. The PBF's `upstream.vintage`/`retrieved_at` is recorded informationally only. (Reflected
  in the Status line and Decision §2.)
- **Rolling-historical tolerance = 0.5% global** to start; made per-source overridable in the manifest
  later only if a specific source proves noisy.
- **The weekly `develop → main` pre-merge check runs `verify-data --strict`** on the maintainer's
  machine as an added backstop.

## Amendment A (2026-08-01, #333) — split fetch-raw from parse-to-parquet; manifest schema v2

**Status:** **Proposed** — architect-authored scoping decision, awaiting the maintainer's sign-off
(per the ADR-0012/ADR-0016 process-note discipline: never pre-declare `Accepted`). Composes only
**already-approved tools** (Python stdlib `urllib`/`hashlib`/`json`, DuckDB, git, `poe`) —
**no new tool, library, data source, or paid service**. **Not methodology-bearing**: it touches no
R-C1 path (no indicator, weight, normalization, or spatial-method change); data-engineer +
data-engineer-reviewer gate only.

**Why an amendment to ADR-0016 rather than a new ADR.** #333 does not introduce a new mechanism — it
*extends the manifest this ADR created*, adding a second freshness axis to the same JSON entry, the
same `classify()`, and the same `poe verify-data`/`run_ingest.py` consumers. Splitting that across two
ADRs would leave a reader of ADR-0016's schema block with a materially incomplete schema. The change
is recorded here, append-only, as **manifest schema version 2**; the base decision above is unchanged
and not superseded.

### Context (the gap this ADR did not anticipate)

`run_ingest.py`'s skip-if-fresh (ADR-0015 Amendment 2026-07-12) reuses `verify_data.classify()`.
`classify_pinned()` marks a source `stale` when `git log <manifest_sha>..HEAD -- <ingest_script>.py`
is non-empty. Because each source's **fetch and parse live in the same module** (e.g.
`fetch_zip_bytes()` and `parse_stadtteil_csv()` in
`ingestion/hamburg/ewr/ingest_hamburg_ewr_stadtteil.py`), *any* edit — including a pure
parse-logic/docstring fix — reads as "the ingest script moved on", forcing a **full re-fetch from the
network**. There is exactly one freshness axis where the pipeline has two: *are the upstream bytes
current?* and *is the parquet current w.r.t. the parsing code?* The cost lands on precisely the slow
sources (paginated WFS layers, multi-MB ZIPs, PDFs) whose parse logic churns most.

### Decision

**1. A gitignored raw cache is the physical boundary between the two phases.**

- **Location:** `data/raw-cache/<source_id>/<artefact-name>` (e.g.
  `data/raw-cache/hamburg__ewr_stadtteil/regionalstatistik_stadtteile.zip`). Under the already-gitignored
  `data/` tree — raw bytes stay gitignored and rebuildable (ADR-0001); nothing new is committed.
  `source_id`-keyed (not path-shaped) so the cache is addressable by the same key the manifest uses.
- **Verbatim bytes only.** The fetch phase performs **no** decoding, unzipping, filtering, or
  re-encoding: whatever the endpoint returned is what lands on disk. Anything else (ZIP member
  selection, encoding sniffing, feature-page concatenation shape) is parse-phase logic and must be
  re-runnable from cache. Paginated sources (WFS: Wohnlage, LOR, Ortsteile) cache each page as a
  separate numbered artefact under the source's directory; the page **join** is parse-phase.
- **Sidecar metadata:** `data/raw-cache/<source_id>/<artefact>.meta.json` holding
  `{url, http_status, etag, last_modified, content_length, sha256, fetched_at}` — the ETag /
  Last-Modified are what make conditional revalidation possible (see §3).
- **Carve-out, mirroring this ADR's PBF decision:** the OSM Germany `.osh.pbf` is **not** copied into
  or hashed by the raw cache. It is already an on-disk raw artefact managed by its own ADR-0002
  tooling; the cache layer records only its sidecar metadata (url/vintage/fetched_at, **no sha256**).
  No ~11 GB file is ever hashed or duplicated.

**2. Manifest schema v2 — one new `fetch` block; everything existing keeps its meaning.**

```jsonc
{
  "source_id": "hamburg__ewr_stadtteil",
  "…": "… all v1 fields unchanged (source_class, city, upstream, outputs, ingest_script) …",
  "fetch": {                                   // NEW in v2; OPTIONAL (absent => v1 behaviour)
    "raw": [
      {
        "path": "data/raw-cache/hamburg__ewr_stadtteil/stadtteile.zip",
        "sha256": "sha256:…",                  // hash of the CACHED UPSTREAM BYTES (not the parquet)
        "bytes": 11534336,
        "etag": "\"6f2a…\"",                   // as returned; null when the server sends none
        "last_modified": "Wed, 29 Apr 2026 07:14:22 GMT",
        "fetched_at": "2026-08-01T09:12:03Z"
      }
    ],
    "fetch_script": {
      "module": "ingestion.hamburg.ewr.fetch_hamburg_ewr_stadtteil",
      "git_sha": "db64643…"
    },
    "max_age_days": 30                          // optional per-source revalidation budget (see §3)
  },
  "manifest_schema_version": 2
}
```

- `ingest_script` keeps its name and now unambiguously means the **parse** step (the module that
  produced `outputs[]`). `fetch.fetch_script` is the **fetch** step. Two modules ⇒ the existing
  `git log <sha>..HEAD -- <path>` signal becomes *per-phase* — this module split is what actually
  buys the granularity; a `fetch`/`parse` marker inside one file cannot be distinguished by git.
- `fetch.raw[].sha256` is the anchor: **identical cached bytes + unchanged parse module ⇒ the parquet
  on disk is provably current**, with no network call and no re-parse.
- **Backwards compatible:** entries without a `fetch` block are valid v2 readers' input and classify
  exactly as today. `manifest_schema_version` is bumped per entry as each source migrates; the loader
  accepts 1 and 2.

**3. `classify()` returns two statuses; `run_ingest.py` branches on the pair.**

`Result` gains `fetch_status` and `parse_status` (the existing single `status` remains the
worse-of-the-two, so `poe verify-data` output and its `--strict` exit-code contract are unchanged).

| fetch_status | parse_status | `run_ingest` action |
|---|---|---|
| fresh | fresh | **skip both** (today's `ok` skip) |
| fresh | stale (parse module changed / parquet shape-hash mismatch) | **re-parse only** — read cached bytes, rewrite parquet. **No network.** |
| stale (cache missing / fetch module changed / revalidation says changed / older than `max_age_days`) | any | **re-fetch + re-parse** |

*fetch_status* is `stale` when any of: the cached artefact is absent; the fetch module has commits
since `fetch.fetch_script.git_sha`; `fetched_at` is older than `max_age_days` **and** a conditional
`GET` (`If-None-Match` / `If-Modified-Since`, stdlib `urllib`) does **not** return `304`; or the
cached file's sha256 differs from the manifest. A `304` refreshes `fetched_at` in place and stays
`fresh` — this is a single cheap HEAD-equivalent round trip, not a download. Servers without
ETag/Last-Modified simply fall back to `max_age_days` (default **30** for `pinned`; rolling sources
keep their never-hard-fail semantics unchanged).

`--force` / `FORCE_REFRESH=1` continues to mean "re-fetch and re-parse everything". Add
`--reparse-only` (re-parse from cache, never touch the network — the developer-loop flag) and
`--refetch <source_id>`.

**4. Adoption is per-source and incremental — not a big-bang rewrite of 18 scripts.**

The shared plumbing (a new `ingestion/fetch_cache.py`: `fetch_to_cache(url, source_id, name)` +
conditional revalidation + sidecar write, plus the `manifest.py`/`verify_data.py`/`run_ingest.py`
changes) lands **once** and changes no script's behaviour by itself. Each source then migrates
independently by moving its HTTP calls into a sibling `fetch_*.py` and having `ingest_*.py` read from
the cache. Migration order by payoff (slow fetch × churny parser):

1. `berlin__wohnlage`, `berlin__lor_geometries`, `berlin__ortsteile` (paginated WFS, minutes each).
2. `berlin__mietspiegel`, `berlin__strassenverzeichnis` (PDF — heaviest parse churn, `pdfplumber`).
3. `hamburg__*` ZIP/CSV sources, `berlin__ewr`, `berlin__mss*`, `berlin__kauffaelle`,
   `berlin__bodenrichtwerte`.
4. OSM (`rolling`) last, metadata-only per the §1 carve-out.

A source that has not migrated has no `fetch` block and behaves exactly as it does today, so the
epic can be split into small reviewable PRs with no flag day.

**5. Tooling check (golden rule #1/#2): no new dependency.** Conditional revalidation is
`urllib.request.Request(headers={"If-None-Match": …})` + `HTTPError.code == 304`; hashing is
`hashlib`; the sidecar is `json`; shape/row reads already use the pinned DuckDB. `requests`,
`httpx`, `pooch`, `DVC`, `intake`, and `dlt` were all considered and are **not needed** — every one
of them would add a dependency to do what ~120 lines of stdlib does here, and `dlt`/DVC additionally
re-import an orchestration/remote-storage model this ADR already rejected.

### Consequences

- A parse-only change costs a **re-parse (seconds)**, not a full re-fetch — directly removing the
  #333 waste and the perverse incentive to avoid touching an ingest script.
- **`verify-data` gets sharper**, not just faster: "upstream re-published" (`fetch.raw[].sha256`
  changed) and "our parser moved on" (`ingest_script` changed) become *distinguishable* findings
  instead of one undifferentiated `stale`.
- **Disk cost:** the raw cache roughly doubles the non-OSM `data/` footprint (order ~100–200 MB
  total, all gitignored and deletable at any time — `rm -rf data/raw-cache/` degrades to today's
  behaviour). The OSM PBF is excluded, so the multi-GB artefact is unaffected. *This is the one point
  flagged for maintainer confirmation.*
- **Reproducibility bonus:** with raw bytes cached, a parse bug is debuggable and a fix is verifiable
  **offline**, which also makes ingestion tests possible without hitting live endpoints.
- **Cost:** one extra module per source and a slightly larger manifest entry. Bounded and localized
  to `ingestion/`.

### Open item for the maintainer

- Confirm the ~100–200 MB gitignored `data/raw-cache/` footprint is acceptable (alternative: cap the
  cache with an eviction policy — recommended **not** to, since eviction re-introduces surprise
  re-fetches for no real benefit on a dev machine).

## References

- This session's drift incident (LOR pre-#134 filename scheme; `native_crs_epsg` / `reverse_weight`
  seed-column drift; absent Hamburg). #134 (LOR filename scheme).
- ADR-0001 (rebuild-from-source, gitignored raw data, local-first, no cloud), ADR-0002 (OSM POI
  history — ~11 GB login-gated PBF, the canonical rolling source), ADR-0012 (MotherDuck kept off the
  serving path — basis for out-of-scope mart-sharing), ADR-0015 (`poe refresh` orchestration +
  graceful degradation the exit-code contract must preserve).
- dbt `source freshness` (loaded_at-based; why the committed manifest is the file/HTTP local-first
  equivalent).
- **Amendment A:** #333 (fetch/parse split), #251/#248 (skip-if-fresh + failure isolation this
  amendment refines), ADR-0015 Amendment 2026-07-12, ADR-0026 (manual CI job for `poe refresh` — a
  future CI runner benefits directly from a cache-aware, network-light re-parse path).
