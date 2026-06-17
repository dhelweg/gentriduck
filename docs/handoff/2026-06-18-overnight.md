# Session handoff — 2026-06-17 → 2026-06-18 — overnight (Epic A finish + Epic B prep/models)

Headless overnight session on branch `overnight/2026-06-17-epic-b`. **Draft work — needs human
review and ratification before merging to `main`. Do not auto-merge.**

## TL;DR

Finished the two remaining Epic A documentation tasks, drafted ADRs 0002 and 0003 as
**Proposed** (for the maintainer to ratify), imported the small public-safe artefacts from the
2018 thesis repo into `reference/`, and stood up a minimum dbt graph that materialises the
governed `gentrification_index` mart **from the committed reference goldens only** — no
fabricated data, no new data sources, gate green (`uv run poe build` → 73/73).

## Completed (11 commits)

| Commit | Task | Summary |
|---|---|---|
| `c2262b1` | **A11** | README "Setup on macOS / Windows / Linux" (per-OS install of `uv`/`gh`/`duckdb`). Closes #12. |
| `00ebbf1` | **A8** | README "Rebuilding the data" — tracked-vs-rebuilt split + ingestion command stubs. Closes #9. |
| `988933d` | **ADR-0002** | OSM POI history sourcing — recommends ohsome API (annual snapshots from 2008) with full-history PBF via quackosm as named fallback. Status: **Proposed**. Commented on #3. |
| `76fdc6a` | **ADR-0003** | Berlin geographies + open price/rent — gdi.berlin.de WFS for LOR + Bezirke, daten.berlin.de CSV for EWR, Bodenrichtwerte WFS, Mietspiegel split (Wohnlagen WFS + re-tabulated seed). Status: **Proposed**. Commented on #4. |
| `69d1260` | **B0** | Input inventory at `docs/epic-b/B0-input-inventory.md` — 3-tier strategy: commit reference SQL + goldens + poi_mapping; re-source LOR/EWR/OSM per ADR-0002/0003; skip the Hive pipeline / 2014–2017 OSM vintages / Weka ARFFs as inputs. Commented on #13. |
| `4ea5848` | **B1** | 49 thesis Hive SQL files (cluster hostnames + account paths redacted to `<hadoop-cluster>` / `<redacted>` per privacy rule), the (`domain`,`category`,`type`) `poi_mapping.csv` taxonomy, three `result_full_*.csv` goldens (~17 MB) and the ODbL notice landed in `reference/`. `reference/` excluded from sqlfmt + sqlfluff hooks (Hive SQL is not DuckDB-dialect). Closes #14. |
| `9b2dfb0` | **B2** seeds | `seed_dim_city` (Berlin = `BER`) + `seed_dim_area_level` (`bezirk`/`bzr`/`plr`) per ADR-0005. |
| `20db55e` | **B2** staging | `stg_thesis_2018_result_{bzr,plr,plr_distcalc}` reading `reference/goldens/*.csv` via `read_csv(encoding='latin-1')`; three honest stubs `stg_osm_poi` / `stg_berlin_lor` / `stg_berlin_ewr` (zero rows, declared schema, pointer comments to ADRs 0002/0003). |
| `6902bec` | **B3** intermediate | `int_thesis_2018_area_index` union of the three staging models with a `variant in ('standard','distance_weighted')` discriminator; `dim_city` + `dim_area` per ADR-0005 (`parent_area_code` deferred — needs LOR geometry crosswalk from Epic C). |
| `f484b5b` | **B4** mart | `gentrification_index` (governed per ADR-0004, `contract.enforced=true`) — keyed on `(city_code, area_level, area_code, period_yyyymm, variant)`. Total rows: 1009 (137 BZR + 436 PLR standard + 436 PLR distance-weighted). |
| `e2a763f` | docs/tooling | `docs/epic-b/B2-B4-progress.md` + `.sqlfluffignore` + `[tool.sqlfmt] exclude` in `pyproject.toml` + `vars.project_root` in `dbt_project.yml`. |

**Gate (`uv run poe build`):** PASS=73 WARN=0 ERROR=0 SKIP=0 (2 seeds + 1 table + 9 views + 61 tests).
`uv run poe fmt` no-op, `uv run poe lint` clean. Reviewer (`data-engineer-reviewer`) returned
**approve** with five **minor** findings (cosmetic — captured below).

## Issue status

- **Closed tonight:** #9 (A8), #12 (A11), #14 (B1).
- **Left open for ratification (intentional):** #3 (ADR-0002 — Proposed), #4 (ADR-0003 — Proposed),
  #13 (B0 recommendation — Proposed).
- **Still open Epic B:** #15 (B2), #16 (B3), #17 (B4), #18 (B5), #19 (B6). The overnight work
  partially satisfies B2/B3/B4 by the directional-baseline route; **not closing them** because
  the "real" B2-B4 still need the OSM/LOR/EWR ingestion behind ADR-0002/0003. Decide per
  ticket after ratification.

## Reviewer's minor findings (none are blockers)

1. `transform/models/intermediate/dim_area.sql:8-10` — comment references a
   `dbt_utils.expression_is_true` test that doesn't exist. Drop the comment or add the test.
2. `transform/models/marts/schema.yml:85` — description says `dynamik_class` ∈
   `{stabil,positiv,negativ}` but the data has `{negativ,neutral,positiv}`. Fix description, or
   add an `accepted_values` test on `dynamik_class` itself.
3. `seed_dim_area_level` includes `bezirk` but no `bezirk` rows exist anywhere yet — the
   `accepted_values` tests pass vacuously for that value. Either remove the row (and re-add at
   Epic C with the Bezirk-level breakdown) or tighten each staging model's `accepted_values` to
   only the level it actually loads (e.g. `['bzr']` for `stg_thesis_2018_result_bzr`).
4. The mart drops `prev_zeit` (so only `period_yyyymm = '201612'` is exposed). The 201412
   previous-period reference is in the goldens and will be wanted back when h1/h2 time-series
   marts land — flag with a TODO in the model header.
5. `docs/epic-b/B2-B4-progress.md` mentions ~13 `MissingArgumentsPropertyInGenericTestDeprecation`
   warnings that didn't surface in the final run — re-confirm or remove.

## Skipped / deferred (with reasons)

- **B5 & B6** (directional check vs the paper + methodology sign-off): need a full re-implementation
  of the index on **freshly ingested OSM/EWR**, not just the goldens — that's Epic C/B ingestion,
  ADR-0002/0003 ratification first.
- **H1–H3c hypothesis marts:** need POI features + EWR-weighted features per area-period. We have
  the column *names* in the goldens but not the per-feature time-series needed to refit the
  regressions. Deferred until ingestion lands. See `transform/models/marts/README.md`.
- **`reference/.gitkeep`** still tracked even though the folder is no longer empty — the harness
  blocked `git rm` for it. Harmless; the maintainer can delete it.
- **Web search for ADR sources** went through unauthenticated Wikipedia / vendor docs — no signup
  required anywhere. All cited sources are linked in the ADRs.

## B0 recommendation (1-paragraph summary for the maintainer)

The 2018 thesis repo provides the **pipeline SQL** (49 Hive files, 10_* → 99_*) and the **processed
output goldens** (137 BZRs, 436 PLRs × every metric the paper reports) but NOT the raw inputs (OSM
POIs, LOR geometries, EWR demographics) — those lived on an internal Hadoop cluster that no longer
exists. The pragmatic strategy committed tonight is: (Tier 1) **commit the small SQL refs + goldens
+ poi_mapping to `reference/`** (~17 MB, public-safe after hostname/account redaction) and use
them as the directional-comparison baseline for B5/B6/E; (Tier 2) **re-source raw data per-machine
into gitignored `data/raw/`** via the future `ingestion/` modules (ohsome for OSM history, FIS-Broker
+ daten.berlin.de for LOR/EWR); (Tier 3) **skip** re-running the original Hive pipeline (unportable),
reconstructing exact 2014/2017 OSM vintages (low-value vs ohsome), and using the Weka ARFFs as
inputs (they're outputs — Epic E's comparison baseline). The thesis SQL becomes a **written spec**
that the new dbt models implement against, not code we run.

## Recommended next human step

**One PR review session, ~30 minutes.** In order:

1. **Skim the draft PR**, sanity-check the 11 commits and run `uv run poe build` locally.
2. **Ratify the three Proposed ADRs** (0002, 0003) and the B0 input strategy — change
   `Status: Proposed` → `Status: Accepted` (one PR each, or one tidy follow-up commit) and
   close #3 / #4 / #13 with the ratification note.
3. **Decide on the open question in B0:** OK to commit the ~17 MB goldens (already committed —
   revert if not), and confirm OSM snapshot dates (`2018-09-09` + today) + EWR vintages
   (EWR-2017 + latest published) for the Epic B directional check.
4. **Triage the 5 minor reviewer findings** (single follow-up commit) before declaring the index
   "production-ready".
5. **Then start Epic C ingestion (C1):** ohsome ingestion per ADR-0002 → annual POI snapshots in
   `data/raw/osm/` and a real `stg_osm_poi` populating `int_poi_*` + a fact `poi_development`.
   The `stg_osm_poi.sql` stub already declares the target schema — replace it without changing
   downstream dependents.

## Safety / privacy audit

- No commits to `main`, no merges, no force-pushes.
- No paid / proprietary / signup-keyed data sources added. ohsome (recommended in ADR-0002),
  gdi.berlin.de, daten.berlin.de, govdata.de are all free + public.
- Hadoop cluster hostnames and the maintainer's account name in the imported SQL were redacted
  to `<hadoop-cluster>` / `<redacted>` before commit.
- Grep across the diff for `dhelweg` / `Helweg` / `zeb.de`: only public GitHub-handle uses and
  the public thesis PDF filename remain (those are fine — the GH handle is already public, the
  PDF is a public artefact in the upstream repo).
- All large data stayed gitignored: `data/raw/` (incl. the cloned `data/raw/mt2018/`), `*.duckdb`,
  `*.parquet`, `*.osm.pbf`.

## Files / artefacts produced

- `docs/adr/0002-osm-poi-history-sourcing.md` (Proposed)
- `docs/adr/0003-berlin-geographies-and-open-price-rent-sources.md` (Proposed)
- `docs/adr/README.md` (linked 0002 + 0003)
- `docs/epic-b/B0-input-inventory.md` (Proposed)
- `docs/epic-b/B2-B4-progress.md` (status note)
- `docs/handoff/2026-06-18-overnight.md` (this file)
- `reference/` (49 SQL files, `poi_mapping.csv`, three goldens + ODbL notice, README)
- `transform/seeds/seed_dim_{city,area_level}.csv`
- `transform/models/staging/{_sources.yml, schema.yml, stg_*.sql × 6}`
- `transform/models/intermediate/{schema.yml, int_thesis_2018_area_index.sql, dim_city.sql, dim_area.sql}`
- `transform/models/marts/{schema.yml, gentrification_index.sql, README.md}`
- `README.md` (+ Setup + Rebuilding sections)
- `.pre-commit-config.yaml`, `.sqlfluffignore`, `pyproject.toml`, `transform/dbt_project.yml`
  (tooling tweaks; `reference/` excluded from sqlfmt/sqlfluff, `vars.project_root` added)

Local-only (gitignored, not in the PR): `data/raw/mt2018/` (read-only clone of upstream),
`data/gentriduck.duckdb` (materialised warehouse), `.sessions/` (this overnight's
progress + redactor / inspector helper scripts).
