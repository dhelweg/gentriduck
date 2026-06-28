# Lesson: a green build does not mean you have the data (local-first DuckDB)

**Class of problem:** any local-first analytics project with **no cloud data store** —
DuckDB on each developer's machine, raw inputs rebuilt per-machine from open sources and
**gitignored**. Gentriduck is exactly this (ADR-0001/0005; `data/raw/` is gitignored). This
lesson will recur on every project of this shape; treat it as a standing convention, not a
one-off fix.

## The trap

Two design choices are individually sensible and jointly dangerous:

1. **Raw data is gitignored and per-machine.** `data/raw/*.parquet` is never committed; each
   machine ingests it from open sources. So *checking out the repo does not give you the data*,
   and **data ingested on laptop A does not travel to laptop B**.
2. **Staging models "gracefully degrade".** Every `stg_*` model returns a typed **zero-row stub**
   when its parquet is missing, so `dbt build` passes *before* anything is ingested. Convenient
   for first-run bootstrap.

Combine them and you get a **silent failure**: on a machine that is missing a source, the
staging model is empty, every model downstream of it is empty, and **all the data tests pass
vacuously on the empty tables** — so `dbt build` reports green while the warehouse is hollow.
A green build certifies that the *SQL compiles and the schema is consistent*. It does **not**
certify that *the data is present*.

## How we hit it (2026-06-28)

The R-A1 keystone (PR #93) was implemented and built on one laptop, then reviewed on a second
laptop that had never ingested the **MSS** source (it is gitignored, so it never transferred):

| Model | Rows on the 2nd machine | |
|---|---|---|
| `int_poi_status_dynamism` | 10,197 | ✅ POI ingested here |
| `int_ewr_socioeco` | 8,128 | ✅ EWR ingested here |
| `stg_berlin_mss` | **0** | ❌ MSS never ingested on this machine |
| `int_gentrification_ts` | **0** | ❌ empty (the entire re-grounded index) |
| `int_mss_lead_lag` | **0** | ❌ empty (the lead-lag panel) |

`uv run poe build` still reported **`PASS=344 WARN=1 ERROR=0`**. The keystone was hollow and the
build was green. Nothing in the gate caught it.

## The guard

Two generic dbt tests (`transform/tests/generic/`) make data-presence a first-class, tested
property:

- **`assert_not_empty`** — `severity: error`. **Fail on no data.** A critical model with zero
  rows now **blocks the build** instead of passing silently.
- **`assert_min_rows(min_rows)`** — `severity: warn`. **Warn on mocked data.** A non-empty model
  with fewer rows than ~one real snapshot is flagged as a likely fixture/mock/partial stand-in.
  This is a row-count *heuristic* (chosen for simplicity over a per-row provenance column): it can
  false-warn on a legitimately small ingest and won't catch a large mock. It is a smoke alarm.

Wired (in `models/**/schema.yml`) to the sources whose absence makes the build meaningless —
`stg_berlin_mss`, `stg_berlin_mss_indicators`, `stg_osm_poi`, `stg_berlin_ewr`, `stg_berlin_lor`
— plus the keystone panels `int_gentrification_ts` and `int_mss_lead_lag`. Sources that are
partial *by design* (price/rent: Mietspiegel city-wide only, Bodenrichtwerte not yet wired —
see #28) are **deliberately not** gated, so known-acceptable gaps don't red the build.

Floors (`min_rows`) are set to roughly **one real snapshot** for each source (e.g. one MSS
edition ≈ 447–542 PLRs → floor 400). Recalibrate when the real cardinality changes.

## The deliberate consequence (read this before you `git push`)

This **intentionally reverses** the "build is green before ingestion" convenience for critical
sources. A machine that lacks the data will now **fail `dbt build`** — and because the
**pre-push hook runs `dbt build`**, it will also **block `git push`** from that machine. That is
the point: *the data-less state is no longer silently shippable.* To get back to green you must
either

1. **Ingest the open data on this machine** (the local-first reproducibility contract — e.g.
   `uv run python ingestion/berlin/mss/ingest_mss.py --out-dir data/raw/berlin/mss`), or
2. consciously bypass for a docs-only commit (`git push --no-verify`) — acceptable only when you
   know the change cannot affect the pipeline.

If a future workflow needs a genuinely data-less scaffold build (e.g. CI without downloads),
add an opt-out var rather than deleting the guard — keep the default strict.

## Takeaway

On local-first / no-cloud-storage projects, **assert data presence explicitly**. "Tests pass"
answers "is the logic consistent?" — add a separate, build-blocking check for "is the data
actually here?", because graceful-degradation stubs make those two questions silently diverge.
