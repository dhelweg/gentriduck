# ADR-0002: OSM POI history sourcing

- **Status:** Proposed
- **Date:** 2026-06-17

## Context

Epic C builds a **longitudinal POI development database** — the gentrification index must measure
*change over time*, not a single snapshot. We need OSM POI data sliced by year (or finer) for the
chosen city scopes (Berlin first, multi-city later via ADR-0005 adapters).

Hard constraints from `CLAUDE.md` / ADR-0001:

- **Free + open-source + open-data only.** No paid tools, no internal data.
- **Cross-platform** (macOS / Windows / Linux). Prefer pure-Python / HTTP tools over OS-specific CLIs.
- **Local-first.** Ingestion runs on a developer laptop; raw artefacts are gitignored and rebuilt
  from open sources (ADR-0001).
- **No signup-keyed data sources.** Even if "free", anything requiring an account/login is fragile
  in a public open-data product and is flagged as out-of-scope by default.
- OSM data is licensed **ODbL** — attribution is mandatory wherever derived data is published.

Three sourcing approaches were considered. Each is evaluated for licence, history depth,
cross-platform availability, footprint, ease of yearly snapshotting, and how it interacts with
OSM-specific pitfalls (tag drift, completeness bias) — which the model layer (Epic C2/C5) handles,
but which the source must not preclude.

## Options

### Option A — ohsome API (HeiGIT)

Public HTTP API purpose-built for OSM history analytics: aggregates (counts/lengths/areas) and
data extraction by tag filter, bbox/polygon, and timestamp(s). Backed by OSHDB; an ohsome-py
client wraps responses into pandas/GeoPandas frames.

- **Licence / cost:** Free, public service from HeiGIT. Output data is OSM-derived → ODbL.
  ohsome-py is Apache-2.0.
- **History depth:** Full OSM history back to 2007, queryable as timestamps or interval series.
- **Cross-platform:** Pure HTTP / pure Python — works identically on macOS / Windows / Linux.
- **Footprint:** Near-zero local disk; compute lives on HeiGIT servers. Network-bound.
- **Yearly snapshots:** First-class — `time` parameter accepts ISO timestamps and intervals
  (e.g. `2008-01-01/2024-01-01/P1Y`); no local synthesis step needed.
- **Tag drift / completeness:** ohsome's "users/contributions" endpoints also yield the
  *coverage* denominators we need for C5's completeness-bias control.
- **Risk — platform transition (material):** HeiGIT has announced **ohsomeDB**, a successor
  available from **May 2026**, with a three-month migration window. The legacy ohsome API is
  planned to be **shut down after SOTM 2026** (mid-2026). Existing queries and scripts will need
  rewriting. HeiGIT has indicated the new endpoint will require **account authentication**,
  which would push it into the signup-keyed-source flag.

### Option B — Full-history PBF (`.osh.pbf`) processed locally

Download a country/region `.osh.pbf` (full history extract) and synthesize per-timestamp
`.osm.pbf` snapshots with `osmium time-filter`, or read directly via DuckDB / a history-aware
parser. Process snapshots with **quackosm** (DuckDB + spatial, pure Python) into GeoParquet for
dbt.

- **Licence / cost:** OSM data ODbL. `osmium-tool` is BSL-1.0; `quackosm` is Apache-2.0;
  `ohsome-planet` (newer alternative that converts OSH to GeoParquet) is open-source. All free.
- **History depth:** Complete — the file *is* the history.
- **Cross-platform — partial concern:**
  - `quackosm` is **pure Python / DuckDB → all three OSes**.
  - `osmium-tool` officially supports Linux, macOS, **Windows** (binaries packaged via
    Linux distros + macOS Homebrew; Windows is documented as supported but installation is
    "build-from-source / vcpkg" — community reports cite this as painful). A Windows path
    exists but is not friction-free.
  - **Critical caveat:** Geofabrik's **public** download server does **not** publish full-history
    `.osh.pbf` files. Those live at `osm-internal.download.geofabrik.de` and require an **OSM
    contributor account login** — i.e. a signup-keyed source. Per our constraints this is
    **out-of-scope as a default**.
  - The full planet history (`planet.osh.pbf`) on the OSM Planet mirrors is publicly downloadable
    but is on the order of **~150 GB compressed, ~2 TB+ expanded**, dwarfing a laptop. Splitting it
    to a Germany/Berlin clip requires `osm-history-splitter` or equivalent and a one-off large
    download.
- **Footprint:** Even after clipping, a Germany-history file is multi-GB and grows; intermediate
  snapshots add more. Easily 10–50 GB of working data.
- **Yearly snapshots:** A two-step pipeline per year — `osmium time-filter` → quackosm read →
  parquet. Reproducible but slow to iterate on (each rebuild is hours, not minutes).
- **Tag drift / completeness:** All raw tags available; the ingestion can compute its own
  coverage denominators. Full control, more code.

### Option C — Monthly Geofabrik snapshot archive

Download a sequence of `berlin-latest.osm.pbf` snapshots over time (one per year/quarter), parse
each with quackosm, stack into a time series in DuckDB.

- **Licence / cost:** ODbL. Geofabrik public download is free and **does not require login**.
- **History depth — fatal limitation for backfill:** Geofabrik's public server publishes the
  **latest** extract and rolls older ones off; it is **not a historical archive** of past
  snapshots. To get historical snapshots one would need a third-party mirror (e.g. internet
  archives) or to have been collecting snapshots from now on. There is no reliable, fully-open,
  no-login backfill path to 2018 via this route.
- **Cross-platform:** Pure HTTP download + quackosm processing — all three OSes.
- **Footprint:** Modest per snapshot (Berlin extract ~100 MB), but multiplies by N snapshots.
- **Yearly snapshots:** Trivial *going forward*, impossible *backward*.
- **Tag drift / completeness:** Same as Option B once parsed.

## Decision

**Primary path: Option A (ohsome API), with explicit fallback to Option B (full-history PBF
processed locally with `quackosm`) if the ohsomeDB transition closes off free, anonymous HTTP
access.**

Concretely:

- **Time grain:** **annual snapshots**, ISO timestamp `YYYY-01-01T00:00:00Z`, for the years
  **2008 → present** (sliding). 2018 is one of the snapshots so Epic B's "do the findings still
  hold?" check has the same vintage available alongside current data.
- **Ingestion contract:** the Python ingestion in `ingestion/<city>/osm/` calls the chosen source
  per-year, materialises one **GeoParquet** file per `(city, year)`, and dbt staging
  (`stg_osm_poi`) unions them with a `year` column. The choice of source is a single function
  swap behind that interface — dbt models don't care which option produced the parquet.
- **Why ohsome first:** zero local disk burden, pure HTTP (cross-platform), full history depth
  out of the box, the same API yields the *coverage denominators* we need for the
  completeness-bias correction (Epic C5). It is the lowest-friction way to *start* the
  longitudinal database; we can always re-materialise from B later without changing dbt models.
- **Why B is the explicit fallback, not the default:** local full-history processing is
  reproducible without depending on a third-party service, and `quackosm` keeps the toolchain
  pure-Python on all three OSes. It is the right insurance policy against the ohsomeDB
  transition. We do **not** make it the default today because the **public** full-history path
  is large (planet-scale download or third-party mirrors), and the **convenient** regional
  history extract (Geofabrik internal server) is **login-gated and therefore disqualified** under
  our open-data rule.
- **Why C is rejected:** no public, no-login historical archive of past Geofabrik snapshots
  exists. Going forward it could collect new snapshots, but it cannot backfill — which is
  the whole point of Epic C.

### Trigger to switch from A to B

Adopt Option B as primary if **any** of the following becomes true:

1. ohsomeDB (post-May 2026) requires authentication for anonymous HTTP access.
2. The legacy ohsome API is shut down (planned after SOTM 2026) and the replacement is not a
   drop-in free + anonymous + open service.
3. ohsome rate limits or response sizes make annual city queries impractical.

When the trigger fires, write a superseding ADR (ADR-0002 stays as historical record) and
re-materialise the parquet artefacts from Option B; dbt models stay unchanged.

## Consequences

- **Cross-platform stays clean.** ohsome-py is pure Python; no OS-specific CLI is required for
  the primary path. The fallback's `quackosm` is also pure Python; the only OS-coupled tool
  (`osmium time-filter`) is only invoked if Option B is needed and is documented as
  install-with-care on Windows.
- **Tiny local footprint by default.** Annual parquet files for Berlin POIs are small (MBs);
  the multi-GB OSH path is opt-in.
- **OSM attribution is mandatory** wherever the website renders POI counts — wired in via the
  G3 attribution page; the ingestion layer records "source = OSM via ohsome / ODbL" per-row.
- **Coverage denominators come from the same source** as the POI counts in the primary path,
  which makes the C5 completeness-bias control straightforward.
- **Service-dependency risk is real.** The ohsome API platform transition is announced and
  imminent. We accept this risk because (a) the fallback is concrete, (b) the model layer is
  insulated from the source choice by the parquet contract, and (c) re-running ingestion is a
  rebuild, not a migration.
- **City-agnostic seam respected (ADR-0005).** The ingestion is `ingestion/<city>/osm/`; the
  source choice and tag-mapping live in the adapter; the warehouse sees a generic
  `(city, area, year, …)` parquet.

## Open questions

These are deferred to the maintainer's ratification and/or to the Epic C implementation:

1. **ohsomeDB readiness.** Will ohsomeDB (May 2026 GA) keep an anonymous, free HTTP tier, or
   will authentication be mandatory from day one? If mandatory, do we flip to Option B *now*
   instead of after the legacy shutdown?
2. **Year-boundary semantics.** "Snapshot at 2018-01-01" vs "active during 2017" — pick the
   convention before C1; the methodology page (G2) must state it explicitly.
3. **POI tag-set scope.** The 2018 thesis uses a specific `poi_mapping`. For Epic C we will
   query a *broader* superset of OSM tags (so future indicators have raw material) and
   project down via the seed mapping. The exact tag list belongs in a methodology note, not
   this ADR.
4. **Cadence beyond annual.** Annual is the minimum useful grain. If a Kiez-level spot-check
   (e.g. Reuterkiez) warrants quarterly resolution, the ingestion can re-materialise the
   relevant year with finer slices without schema changes — leave decision to Epic C6.
5. **Backup mirror for Option B.** If we need to exercise the fallback, which **public,
   no-login** source provides a regional history extract for Berlin/Germany? Options to explore:
   the OSM Planet history mirrors (planet-scale, then clip with `osm-history-splitter` or
   `ohsome-planet`), or community mirrors. To be confirmed *before* Option B is needed, not
   while it is being rolled out under pressure.

## References

- ohsome API (HeiGIT): <https://heigit.org/tag/ohsome-api/>
- ohsomeDB transition: <https://heigit.org/moving-to-ohsomedb/>
- ohsome-py (PyPI): <https://pypi.org/project/ohsome/>
- ohsome-planet (OSH → GeoParquet): <https://heigit.org/first-release-of-ohsome-planet-osm-history-data-in-geoparquet-format-2/>
- QuackOSM (Apache-2.0, DuckDB-based PBF reader): <https://github.com/kraina-ai/quackosm>
- osmium-tool (cross-platform notes): <https://osmcode.org/osmium-tool/>
- Geofabrik download server (public extracts, ODbL, no login): <https://download.geofabrik.de/>
- Geofabrik technical notes (full-history extracts behind OSM contributor login):
  <https://download.geofabrik.de/technical.html>
- OSM ODbL licence: <https://www.openstreetmap.org/copyright>
