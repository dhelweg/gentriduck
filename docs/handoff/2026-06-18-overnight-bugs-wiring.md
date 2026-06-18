# Session handoff — 2026-06-18 evening — Clear C4 blockers + implement C4

## TL;DR

Previous session (C3b-fix / C3 / D1) is **fully merged on main** (PR #54, clean). B4 is also
closed. Tonight's goal: fix the remaining 3 blockers that sit between us and C4, do the structural
cleanup and dim_area wiring that makes data flow end-to-end, and then **implement C4** — the
time-series gentrification index that is the core output of the whole Epic C work stream.

**Gate at start:** `uv run poe build` → PASS=236 WARN=1 ERROR=0.

**Target gate:** PASS=X WARN=0 ERROR=0 with non-empty `gentrification_index` and
`fct_gentrification_change` rows.

---

## Dependency chain

```
#59 C3-dedup    ┐
#57 D1-ewr-fix1 ├──► #52 dim_area wiring ──► C4 (the deliverable)
#58 D1-ewr-fix2 ┘
#60 C3-ref  (structural cleanup; do while touching int_osm_poi_plr)
```

All C4 dependencies are now done: C3 ✓, C3b-fix ✓, B4 ✓. Only the 3 bugs + dim_area block it.

---

## Task 1 — C3-dedup (#59) [small, must first]

**File:** `transform/models/intermediate/int_osm_poi_plr.sql`

**Problem:** `joined_pre2021` and `joined_2021` CTEs do plain `LEFT JOIN ... ON ST_Within(...)`.
No dedup. A POI on the boundary of two adjacent PLRs fans out to two rows → breaks the
`unique_combination_of_columns(snapshot_year, osm_id)` test → double-counts in `fct_poi_development`.

**Fix:** Add `QUALIFY ROW_NUMBER() OVER (PARTITION BY snapshot_year, osm_id ORDER BY area_code) = 1`
at the end of each CTE (`joined_pre2021` and `joined_2021`). Deterministic tie-break via alphabetical
`area_code`. Also verify/add the `dbt_utils.unique_combination_of_columns` test in
`transform/models/intermediate/schema.yml` for `int_osm_poi_plr`.

**Review:** data-engineer-reviewer only.

---

## Task 2+3 — D1-ewr-fix1+2 (#57, #58) [medium, same file]

**File:** `ingestion/berlin/ewr/ingest_ewr.py`

### #57 — `_col_sum_numeric fillna(0)` corrupts suppressed shares (~line 376)
`fillna(0)` applied before summing means suppressed (`'-'`) cells contribute `0` to the numerator
instead of `NaN`. Result: silently underestimated shares, not NULL.

**Fix:** Remove `fillna(0)` from `_col_sum_numeric`. Let pandas NaN-propagation produce NaN when any
constituent column is suppressed. The `is_suppressed_any` flag is already computed correctly.

### #58 — `residents_total` stored as 0.0 for suppressed PLRs (~line 441)
When `E_E` (total residents) is suppressed, `residents_total` ends up as `0.0` in parquet
instead of `NaN`, silently undercounting population in aggregations.

**Fix:** Ensure no `fillna(0)` is applied to the `E_E` / `residents_total` column after
`_to_numeric_with_suppression`. Value must remain `NaN` for suppressed rows.

**After the Python fix:** re-ingest to rebuild parquets:
```bash
uv run python ingestion/berlin/ewr/ingest_ewr.py --out-dir data/raw/berlin/ewr
```
Then run `uv run poe build` to verify.

---

## Task 4 — dim_area wiring (#52) [medium, enables int_ewr_series]

**Files:** `transform/models/marts/dim_area.sql` and `transform/models/staging/stg_berlin_lor.sql`

**Problem (critical path):** `int_ewr_series` inner-joins `stg_berlin_ewr` (city_code='berlin')
with `dim_area` (city_code='BER'). Because the convention differs, the join produces **zero rows**
even after ingestion. C4 literally cannot produce data without this fix.

**Required work:**
1. **Canonical city_code = 'BER'** (matches `dim_city`). Update `stg_berlin_lor.sql` to emit
   `'BER'` (or normalise in `dim_area`). Do NOT touch `dim_city`.
2. **Extend `dim_area`** with a UNION from `stg_berlin_lor`:
   ```sql
   union all
   select
       'BER'                    as city_code,
       plr_id                   as area_code,   -- 8-digit zero-padded
       plr_name                 as area_name,
       'plr'                    as area_level,
       'Planungsraum'           as level_name,
       area_vintage
   from {{ ref('stg_berlin_lor') }}
   ```
   Check `stg_berlin_lor` schema for exact column names.
3. **Verify** WARN=1 disappears: `uv run poe build` should show WARN=0.

---

## Task 5 — C3-ref refactor (#60) [medium, same file as #59]

**File:** `transform/models/intermediate/int_osm_poi_plr.sql`

**Problem:** Raw `read_parquet(...)` paths bypass `stg_berlin_lor`, breaking lineage and portability.
Also re-implements a 3-variable file-existence guard that `stg_berlin_lor` already handles.

**Fix:**
1. Remove the `{% set lor_pre2021_glob %}` / `{% set lor_2021_glob %}` variables and the 3-check guard.
2. Replace `lor_pre2021` and `lor_2021` CTEs with `{{ ref('stg_berlin_lor') }}` filtered by
   `area_vintage` column.
3. Graceful-degradation: if `stg_berlin_lor` returns zero rows, return the zero-row typed stub
   (same behaviour, simpler).

Do #60 in the same commit as #59 since both touch the same file.

---

## Task 6 — C4: time-series gentrification index [main deliverable]

**Dependencies satisfied after tasks 1–4:** fct_poi_development is correct (dedup), int_ewr_series
produces rows (dim_area wiring), EWR shares are not corrupted (fillna fix).

### What C4 must deliver

The existing `gentrification_index` mart reads from `int_thesis_2018_area_index` (2018 goldens).
C4 adds a parallel path: computing the index from **live data across all years**.

**Model plan (in order of implementation):**

#### `int_poi_features_pivot` (new intermediate)
Pivot `fct_poi_development` from long format `(area_code, snapshot_year, poi_category_h, poi_count)`
to wide format with one column per domain (tourism, gastronomy, services, etc.) per PLR per year.
This is the Gentriduck equivalent of `45_osm_poi_features_domain_piv.sql` from the 2018 thesis.
Use DuckDB `PIVOT` or conditional aggregation. Also compute `total_poi_count` per PLR per year.

The 2018 thesis domain/category hierarchy is in `reference/poi_mapping.csv` and the current
Gentriduck harmonised hierarchy is in `int_osm_poi_harmonized`. Use `poi_domain_h` from
`fct_poi_development` for the domain columns.

#### `int_poi_status_dynamism` (new intermediate)
For each PLR x year, compute:
- **status_score**: z-score of `total_poi_count` across all PLRs for that year
  (`(count - mean) / stddev` computed with DuckDB window functions)
- **dynamism_score**: year-over-year change in `total_poi_count` (LAG 1 year); z-score of that
  delta across all PLRs for the same year
- **domain_shares**: share of each domain in total POI count (same formula as `71_oa.sql`)

The status z-score captures how POI-rich an area is relative to Berlin; the dynamism z-score
captures how fast it is changing. This mirrors the thesis `status_index` and `dynamism_index`.

#### `int_ewr_socioeco` (new or extend existing)
Pivot `int_ewr_series` from long format (one row per indicator) to wide format with one column per
EWR indicator per PLR per year. Key indicators to include (matching the thesis `own_idx`):
- `foreigners_share` (k11 / E_A)
- `age_under5_share` (dau5 / D_U5)  
- `age_under10_share` (dau10)
- `residents_moved_in_share` (d2)
- `mean_age_years` (ee)
- `migration_background_share` (mh / MH_E)

Compute an **EWR composite score**: z-score of each indicator across all PLRs for that year,
then sum the z-scores. This is the `own_idx` / socio-economic dimension.

#### `int_gentrification_ts` (new intermediate — core)
Join `int_poi_status_dynamism` with `int_ewr_socioeco` on `(area_code, snapshot_year)`. For each
PLR x year produce:
- `status_index` (POI z-score)
- `dynamism_index` (POI change z-score)
- `ewr_composite` (EWR z-score sum)
- `gentrification_score` = weighted sum or average of the three
- `snapshot_year` as the time dimension (replaces the thesis `period_yyyymm`)

**Geo-data-scientist sign-off is required on the methodology** before this model is merged
(specifically: weight choice, z-score normalisation approach, handling of years with sparse EWR
coverage). The geo-DS must review `int_gentrification_ts` before the PR merges.

#### `fct_gentrification_change` (new mart)
From `int_gentrification_ts`, compute change metrics per PLR:
- `gentrification_score_prev` = score from the previous year (LAG)
- `gentrification_delta` = `gentrification_score - gentrification_score_prev`
- `rank_current` = rank of the PLR by `gentrification_score` within the city x year
- `rank_prev` = rank from the previous year (LAG on `rank_current`)
- `rank_change` = `rank_current - rank_prev` (positive = improving rank)

Output grain: `(city_code, area_code, snapshot_year)` — one row per PLR per year.

#### Update `gentrification_index` mart
The existing mart reads exclusively from `int_thesis_2018_area_index`. Extend it to UNION in
rows from `int_gentrification_ts` with `variant = 'live_data'` (vs `'2018_thesis'`). The mart
contract (column names/types) is already stable; the UNION extends coverage.

### Acceptance criteria (C4 done when):
1. `uv run poe build` passes with PASS=X WARN=0 ERROR=0
2. `gentrification_index` mart has non-empty rows for `variant = 'live_data'`
3. `fct_gentrification_change` has non-empty rows with non-null `gentrification_delta`
4. geo-data-scientist sign-off on `int_gentrification_ts` methodology

### Notes for the data-engineer implementing C4
- Work strictly within the existing harmonised category hierarchy (`poi_domain_h`, `poi_category_h`)
  from `fct_poi_development` — do NOT re-invent a new taxonomy.
- The EWR time series is sparse (some PLRs/years have NaN for suppressed cells). Design the join
  with COALESCE or explicit NULL handling so sparse coverage produces NaN (not 0.0) for scores.
- The 2021 LOR boundary change (pre-2021 → 542 PLRs) means area_codes change at the boundary.
  For cross-vintage comparisons in `fct_gentrification_change`, filter to same `area_vintage`
  when lagging, OR make the cross-vintage crosswalk (#51) a follow-up rather than blocking C4.
  For the first version: compute deltas only within the same vintage period; document the break.
- Consult `reference/system/71_oa.sql` for the exact 2018 formula. Gentriduck's version should
  produce directionally equivalent results; exact numerical match is not required (Epic B framing).

---

## Branch & PR strategy

One branch: `overnight/2026-06-18-bugs-wiring-c4`

Suggested commit order:
1. `fix(c3): ST_Within dedup + C3-ref — QUALIFY + ref('stg_berlin_lor')` (closes #59, #60)
2. `fix(ewr): remove fillna(0) from suppressed shares + residents_total NaN` (closes #57, #58)
3. `feat(c3): wire stg_berlin_lor into dim_area, normalise city_code to BER` (closes #52)
4. `feat(c4): int_poi_features_pivot + int_poi_status_dynamism`
5. `feat(c4): int_ewr_socioeco + int_gentrification_ts + fct_gentrification_change`
6. `feat(c4): extend gentrification_index mart with live_data variant` (closes #24)

Each commit must pass pre-commit. Gate target after commit 6: PASS=X WARN=0 ERROR=0.

---

## Key files

| File | Task |
|---|---|
| `transform/models/intermediate/int_osm_poi_plr.sql` | #59 (dedup) + #60 (ref) |
| `transform/models/intermediate/schema.yml` | #59 (unique test) |
| `ingestion/berlin/ewr/ingest_ewr.py` | #57 + #58 |
| `transform/models/marts/dim_area.sql` | #52 |
| `transform/models/staging/stg_berlin_lor.sql` | #52 (city_code normalisation) |
| `transform/models/intermediate/int_poi_features_pivot.sql` | C4 (new) |
| `transform/models/intermediate/int_poi_status_dynamism.sql` | C4 (new) |
| `transform/models/intermediate/int_ewr_socioeco.sql` | C4 (new) |
| `transform/models/intermediate/int_gentrification_ts.sql` | C4 (new, geo-DS gate) |
| `transform/models/marts/fct_gentrification_change.sql` | C4 (new mart) |
| `transform/models/marts/gentrification_index.sql` | C4 (extend with live_data variant) |
| `transform/models/intermediate/schema.yml` | C4 (new model tests) |
| `transform/models/marts/schema.yml` | C4 (fct_gentrification_change contract) |

---

## If capacity runs short

Priority order if the session runs out of time:
1. **Must merge:** tasks 1–3 (bug fixes + dim_area) — these are blockers regardless.
2. **Ship partial C4:** tasks 4–5 (pivot + status/dynamism) without the mart extension;
   open a follow-up issue for the mart and geo-DS sign-off.
3. **Skip:** task 6 (mart extension) and the geo-DS loop if EWR coverage is too sparse
   to produce meaningful scores. Document findings in the issue.

---

## Safety / privacy checklist

- All work on `overnight/2026-06-18-bugs-wiring-c4`; no direct commits to main.
- No paid / proprietary data sources.
- No real name / employer in committed files.
- git rm / force-push: not needed.
