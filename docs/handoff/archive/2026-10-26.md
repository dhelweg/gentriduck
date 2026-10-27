# Session handoff — 2026-10-25/26 — env sync, raw-data refresh, OSM cuisine backfill + Hamburg

Maintainer-driven session (not the autonomous PM loop), branch `infra/osm-cuisine-backfill`
off `develop`. First activity since 2026-08-28.

## Outcome

- **Environment fixed** — `uv sync` had been failing on every run on this Windows machine (see below).
- **All 17 non-OSM raw sources refreshed** — `verify-data` ok.
- **Berlin OSM: all 19 years (2008–2026-partial) now carry `cuisine`** and the post-#201 POI mapping.
- **Hamburg OSM: ingested for the first time** — 19 years, 843 → 96,125 POIs, with `cuisine`.
- **`poe resync` run** — see "Build" below.

`verify-data`: 17 ok · 2 ok (rolling) · 1 missing (`shared__seeds`, manifest staleness only — finding 7).

## Build

`poe resync` — all 8 steps ran; exit 0.

| Step | Result |
|---|---|
| ingest | 0 ok, 17 skipped (fresh), 0 failed |
| `dbt build --full-refresh` | **PASS=1064 WARN=6 ERROR=0** (11 min) |
| OA Getis-Ord re-materialize | PASS=19 |
| export-serving / export-area-geojson | 20 parquet + 15 GeoJSON written |

Then `int_osm_poi_hamburg` was changed to pass `cuisine` through (it was dropped there) and
`int_osm_poi_hamburg+` rebuilt: **PASS=376 WARN=2 ERROR=0**. `cuisine` now reaches both city
models — Berlin 96,343 / Hamburg 32,301 tagged in-city POI-years. No Hamburg mart surfaces it yet
(`mart_area_amenities` is Berlin-only by design — "Hamburg parity deferred", I19).

**The 6 warnings:**

| Test | Cause | New? |
|---|---|---|
| `assert_null_rate_below_int_osm_poi_plr_area_code` (19) | **Hamburg leak — finding 11** | yes |
| `assert_null_rate_below_int_osm_poi_hamburg_area_code` (19) | Hamburg's bbox overreach: 18.2% of POIs fall outside Hamburg's Gebiete | yes (first Hamburg OSM) |
| `test_c5_poi_share_spike` (92) | C5 completeness check | not determined |
| `int_berlin_brw_plr` coverage_frac ≤ 1.05 (166) | Bodenrichtwerte coverage | not determined |
| `test_ortsteil_overlap_ortsteil_never_dominant` (2) | Ortsteil geometry | not determined |
| `assert_not_empty_stg_hamburg_osm_places_` (1) | empty Hamburg OSM places source | not determined |

No pre-session baseline exists on this machine, so "not determined" = may well be pre-existing.

**Berlin outputs are not contaminated by the leak** — all three direct consumers of
`int_osm_poi_plr` filter `area_code is not null` (`fct_poi_development:72`,
`mart_area_amenities:95`, `int_osm_poi_plr_weighted:245`). `fct_poi_development` has 245,209 HH
rows, all with Hamburg-format area codes, 0 null.

## OSM — what was done and what it showed

Single-pass extraction (`extract_all_snapshots`, one read of the 12 GB `.osh.pbf` for all years)
was used for Berlin's last 8 years and all of Hamburg, writing to a temp dir and promoted only
after validation. Driver script lived in the session scratchpad; it imports the repo functions
unchanged.

**Validation against the committed Berlin manifest (ground truth for 19 years):**

| Check | Result |
|---|---|
| `cuisine` column | 19/19 Berlin, 19/19 Hamburg; populated (2026: Berlin 4.7%, Hamburg 3.7%) |
| Row counts | 18/19 exact; 2009 short by 2 POIs, both on the bbox edge (0.02%) |
| osm_id sets | identical in every year except those 2 |
| 2020–2025 content | 100% identical rows |
| Older years | ~0.3% of rows reclassified — explained below |

**Reclassification is real and expected.** Rows in 2008–2013 change `poi_domain/category/type`
(never `lon/lat`) vs the June extraction. Cause: the mapping seed changed after June —
`29dbf48d` (#201, 2026-07-09). Transitions are multi-tag objects (gas station + kiosk, hotel +
restaurant, bakery + café) resolving differently under the current mapping. Confirmed **not** a
single-pass artefact: the trusted per-year path on the same PBF shows the identical signature
(2012: 145 rows, 2013: 193). So a full re-extraction is needed whenever the mapping seed changes,
not only when the schema does.

**The new PBF added no new snapshot data.** Every snapshot samples at `datetime(year, 1, 1)`, so
the latest point is 2026-01-01, already inside the June PBF. Its Jan–Oct 2026 history is
unreachable (finding 3). The download was still required for Hamburg.

**Hamburg sanity check:** 2026 count is 47% of Berlin's, against ~50% of the population — similar
POI density per resident. No ground truth exists for Hamburg.

**Methodology caveat — `cuisine` coverage drifts over time.** 0% in 2008, ~5–7% in later years:
OSM tag adoption, not real-world change. The `gastronomy_restaurant_cuisine` dominance group in
`int_poi_within_group_dominance` will read this as a trend unless corrected (same family of problem
as the C5 completeness correction). Needs a methodology look before cuisine is used across years.

## Performance (OSM extraction)

| Approach | Wall time | Notes |
|---|---|---|
| Per-year, 3 workers | ~86 min per 3 years | ~3.9 cores aggregate |
| Per-year, 12 workers | ~4 h 40 min per 12 years | ~3.8 cores — no gain, contention on the shared file |
| **Single-pass, 1 process** | **113 min for 8 years; 168 min for 19 years** | ran two cities concurrently |

The module docstring's "no faster than 3 workers" warning is correct. Single-pass is the right
default: one read for all years. Machine: i7-13650HX (14 cores, 6P+8E), 31.7 GB RAM.

## Environment

`uv sync` failed on every invocation: quarto-cli's sdist has a 279-char path vs Windows' 260
limit. **Fixed** by setting `HKLM\SYSTEM\CurrentControlSet\Control\FileSystem\LongPathsEnabled=1`
and clearing the corrupt partial build from uv's cache. Until then `libpysal`, `esda`, `spreg`,
`pytest` and `openpyxl` had never been installed here. `pdfplumber` is absent **by design**
(`ingest_mietspiegel.py:65`).

**pre-commit hooks had never been installed on this machine** — `.git/hooks/` held only samples,
so the commit-stage format/lint and push-stage `dbt build` gates never ran here. Installed
(`uv run pre-commit install` → `pre-commit` + `pre-push`). The two commits before installation
were checked by hand: `sqlfmt --check` and `sqlfluff lint` clean on the one SQL change.

## Git

- PR #336 merged by the maintainer in the UI (`ef01f139`); local `main` reset to match.
- This branch: `infra/osm-cuisine-backfill` off `develop` — **not pushed**.
- `gh` is not authenticated on this machine.

## Findings needing tickets (none filed)

1. **`poe ingest` never runs Berlin Milieuschutz** — `berlin__milieuschutz` is manifest-tracked
   but absent from `run_ingest.py`'s source list; Hamburg's equivalent is wired in. Silent
   (missing source → zero rows, #94). Ingested by hand; driver gap remains.
2. **`poe ingest-osm-*` are no-ops on an existing dataset** — `--skip-existing` defaults true and
   neither task passes `--force`; `--years` defaults to `2008-2024`.
3. **`--partial-years` only renames the file** — snapshot date is always `Y-01-01`, so
   `2026-partial` is not a partial-year capture.
4. **Make single-pass the CLI default.** `extract_all_snapshots` is unused, but it wraps the same
   `_MultiYearSnapshotHandler` that `extract_snapshot` uses with one year — it is not untested
   logic. Validated this session against 19 known counts. ~6x faster than per-year at 3 workers.
5. **`cuisine` is documented as display-only** (`int_osm_poi_harmonized.sql:46`,
   `int_osm_poi_plr.sql:78`, `stg_osm_poi.sql`) but feeds a dominance metric.
6. **`stg_osm_poi.sql:42-45` is wrong** — says Hamburg lacks #252's tags; it inherits them.
7. **`shared__seeds` manifest is stale** — references `berlin_mietspiegel.csv` (now
   `seed_berlin_mietspiegel.csv`) plus row-count drift. Why `resync` rather than `refresh`.
8. **EWR live ingestion broken for 2015–2020 and 2024** ("Cannot parse EWR CSV") — falls back to
   vendored copies (ADR-0023). 2021–2023 genuinely unpublished.
9. **PM loop ran 547 no-op sessions** against a fully blocked backlog.
10. **`cuisine` coverage drift** — see the methodology caveat above.
11. **Hamburg POIs leak into the Berlin PLR model.** `int_osm_poi_plr` reads
    `int_osm_poi_harmonized` for every city with no city filter, so all 911,600 Hamburg POI-years
    are spatially joined against Berlin's LOR polygons and land with null `area_code`. Latent until
    this session (no Hamburg OSM data existed). Berlin alone is at 9.6% null — under the 12%
    threshold — so the warning is entirely the leak. Downstream is safe (all consumers filter
    nulls); cost is a spurious WARN and a wasted 911k-row spatial join. Fix: `where city_code =
    'berlin'` in its POI CTE, as `int_osm_poi_hamburg` already does with `'HH'`.

## Project assessment (2026-10-26)

A full assessment was given in-session. Headline: engineering is strong; the scientific claims are
not supported as published. Before any launch (#230):

- **The homepage claim is contradicted by the project's own numbers.** `web/pages/index.md:79` says
  status leads commerce "rather than the other way round"; on EWR the two directions are
  indistinguishable at k=1 (−0.1693 vs −0.1694) and POI-leads is stronger at k=4 (−0.32 vs −0.22).
  `thesis-recheck.md` cites the same rho (−0.14, p=0.001) as support for both H3a and H3b.
- **H3a and H3b are the same test** on the MSS panels — `analysis/e1_regressions.py` passes the
  same two arrays with arguments swapped; Spearman is symmetric. Known since B7-geo-signoff
  Concern 2; documented, not fixed.
- **"PASS" scores sign only, ignoring significance.** Hamburg's direction-identifying test
  (clustered OLS) is non-significant everywhere (p 0.10–0.61) and scores 6/6 PASS.
- **The back-test is circular** — rho = 1.0000 compares the MSS class with itself; all 6 coldspot
  labels are "MSS 2023 Status=1".
- **E4 early warning fails out of sample** — AUC 0.4445 (honestly reported).
- **Robust result:** H1b — fast-food density tracks deprivation (rho 0.37, n=359).
- Inconsistency to check against thesis p.91: the site says the thesis *supported* H3a; the code
  and Hamburg doc say it *rejected* it.

Fixes touch `analysis/*.py` and methodology framing → coder↔reviewer loop + dual sign-off.
