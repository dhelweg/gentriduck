# ADR-0015: Data refresh / orchestration (`uv run poe refresh`)

- **Status:** Accepted
- **Date:** 2026-07-03
- **Accepted by:** system-architect (self-accepted). This composes **only already-approved tools**
  (`poe`/poethepoet, `dbt`, and the ingestion/export scripts already in the repo) into one task — it
  introduces **no new tool, library, or data source**, so it does not trigger the golden-rule-#2
  maintainer-approval gate (ADR-0011/0012/0014 precedent: process/tooling ADRs that don't add a new
  dependency are architect-accepted directly). No methodology sign-off required — this is a
  process/ops decision, not methodology-bearing work (touches none of the R-C1 paths: no index
  weights, normalization, or spatial method changes).

## Context

PROJECT_PLAN.md's Epic F closes with **F3**: "ADR-0007 data refresh / orchestration: `uv run poe
refresh` (manual end-to-end rebuild) now; a free scheduler path noted for later (the site is a
*living* dataset)." (Note: the plan's "ADR-0007" label is stale — that number is already taken by
the Berlin SES-indicators ADR; this decision gets the next free number, **ADR-0015**.)

By the time F3 comes up, every individual pipeline stage already exists and is independently
runnable via `poe`:

- `poe ingest` — sequenced ingestion of all fresh-checkout-safe sources (Berlin LOR/MSS/EWR/price-
  rent/Mietspiegel, Hamburg geo/Sozialmonitoring/displacement/EWR/rent). OSM history ingestion is
  deliberately excluded (ADR-0002: requires a one-off, login-gated manual download).
- `poe deps` — `dbt deps` (package install for the transform project).
- `poe build` — `dbt build` (seeds, models, tests).
- `poe export-serving` (F2/#34, ADR-0012) — publish marts to parquet for the web build.
- `poe export-area-geojson` (G1c/#132) — bundle `dim_area_geometry` + the governed index into static
  GeoJSON for the map pages.

What's missing is a **single command that chains them in the right order**, so a fresh checkout (or
a periodic refresh) can rebuild the whole pipeline — raw sources through servable site artefacts —
with one invocation, plus a documented answer for *how this runs on a cadence later* (the "site is a
living dataset" half of F3).

## Decision

1. **Add a `refresh` poe task that composes the existing tasks, in dependency order, via poe's `ref`
   sequence type** (not by duplicating shell commands):

   ```toml
   refresh = { sequence = ["deps", "ingest", "build", "export-serving", "export-area-geojson"],
               default_item_type = "ref" }
   ```

   Order matches real dependencies: `dbt deps` before anything dbt-related; all ingestion before
   `dbt build` (models read the raw ingested files); `export-serving` after `build` (it reads
   published marts); `export-area-geojson` last (it reads the serving parquet + governed index).

2. **Scope: reproducible end-to-end data rebuild, not the full web build.** `refresh` stops at the
   artefacts the web build consumes (`web/static/` parquet + geo bundle) — it does not shell out to
   `npm run build`/`evidence build`. Rationale: `refresh`'s job is "is the data pipeline current," a
   data-engineering concern; the web build is a separate, already-scripted step the web-engineer
   agent/CI-equivalent owns (G0/G1), and coupling them would force a Node toolchain dependency onto a
   pure data-refresh task. Analysis/backtest scripts (`poe analysis`, `poe backtest`) are also **not**
   included: they are one-off validation/reporting artefacts (write to `docs/methodology/` or
   notebooks), not inputs the site serves, and re-running them on every refresh would be wasted work
   for no site-facing benefit. `ingest-osm-*` stays excluded from `refresh` for the same login-gated
   reason it's excluded from `ingest` (ADR-0002).

3. **Orchestration cadence — manual now; documented free-scheduler path for later, not implemented
   yet.** F3's acceptance criterion is "ADR + `uv run poe refresh` rebuilds end-to-end" — a manual
   command, run by a developer or the devmode PM, not a running service. For the *future* cadence
   question (the site's data mostly changes on months-to-yearly open-data release cycles, not
   per-second), the free options considered:
   - **GitHub Actions scheduled workflow (`on: schedule`, free for public repos)** running `uv run poe
     refresh` then a redeploy — zero new infrastructure, matches "free + open only," and is the
     natural fit once the repo has a public runner budget to spend. **Recommended path when a
     schedule is actually wanted.**
   - **Manual/cron on the maintainer's own machine** — zero infra, but not "free hosting," just local
     cron; fine as a stopgap, already possible today with plain `cron` + this same `poe refresh`.
   - **A dedicated scheduler service** (e.g. a paid cron-as-a-service) — rejected outright, violates
     golden rule #1.

   Since no open-data source here updates faster than roughly annual/biennial cycles (MSS, EWR,
   Bodenrichtwerte, Sozialmonitoring), an always-on scheduler is not yet justified — this ADR
   **records** the GitHub Actions path as the accepted future mechanism but does **not** wire a
   workflow file now (no recurring need yet; would also require deciding a runner-minutes budget and
   how a scheduled job pushes to `develop` under ADR-0011's autonomous-merge model, which is out of
   scope for this ADR). Revisit and wire the workflow when a real cadence need appears (e.g. Hamburg
   or a new city adds a source with faster-than-annual updates).

## Consequences

- A fresh clone (or a periodic refresh) rebuilds the entire pipeline — raw open-data sources through
  servable parquet/GeoJSON — with `uv run poe refresh`, matching F3's acceptance criterion.
- No new dependency, tool, or service is introduced; the deny-listed OSM login-gated step remains a
  manual, separate action (`poe ingest-osm-berlin` / `poe ingest-osm-hamburg`), unchanged.
- The web build (`npm run build` / Evidence) remains a separate, explicit step after `refresh`,
  owned by the web-engineer pipeline (G0/G1) — this keeps the data-refresh task Node-toolchain-free.
- Scheduling remains manual for now; a documented, free, ADR-approved path (GitHub Actions
  `schedule`) exists to adopt without a new ADR fight if/when a real cadence need appears.

## References

- #35 (F3 tracking issue). PROJECT_PLAN.md Epic F (F1/F2/F3).
- ADR-0002 (OSM POI history sourcing — login-gated exclusion precedent), ADR-0011 (autonomous
  `develop` merge — governs how any future scheduled job's output would reach `develop`/`main`),
  ADR-0012 (serving & hosting stack — `export-serving`/`export-area-geojson` origins; "refresh is
  F3's decision" deferral this ADR discharges).
