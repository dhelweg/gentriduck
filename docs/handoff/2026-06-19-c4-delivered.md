# Session handoff — 2026-06-19 — C4 delivered, PR ready to push

## TL;DR

All 3 blockers fixed and C4 fully implemented. Branch `overnight/2026-06-18-bugs-wiring-c4`
has 5 commits ahead of main, **ready to push and PR**. Gate: PASS=258 WARN=0 ERROR=0.

The push was blocked by the interactive-session sandbox (expected per CLAUDE.md —
the PM needs to run as `claude --print` for autonomous pushes). The user must run:

```bash
git push -u origin overnight/2026-06-18-bugs-wiring-c4
```

Then open the PR (or the PM will do it in the next autonomous session).

---

## What was done

### Commit 1 — fix(c3): C3-dedup + C3-ref (closes #59, #60)
- `int_osm_poi_plr.sql`: Added `QUALIFY ROW_NUMBER() OVER (PARTITION BY snapshot_year, osm_id ORDER BY area_code) = 1` to both `joined_pre2021` and `joined_2021` CTEs to deduplicate boundary POIs.
- Replaced raw `read_parquet()` LOR geometry calls with `{{ ref('stg_berlin_lor') }}`.
- `stg_berlin_lor.sql`: Updated to emit `city_code = 'BER'` (canonical ADR-0005), renamed `lor_vintage` → `area_vintage`, exposed `geometry_wkb` blob.

### Commit 2 — fix(ewr): fillna(0) bugs (closes #57, #58)
- `ingest_ewr.py` line 376: removed `.fillna(0)` from `_col_sum_numeric` — NaN now propagates through suppressed numerators.
- `ingest_ewr.py` line 455: `indicators["residents_total"] = total_raw` (NaN for suppressed) instead of `total` (filled with 0).
- Re-ingested 2015-2020 and 2024 EWR from local CSVs with the fixed code.

### Commit 3 — feat(c3): dim_area wiring (closes #52)
- `dim_area.sql`: UNION in PLR rows from `stg_berlin_lor`; QUALIFY dedup to handle encoding differences (WFS UTF-8 vs thesis Latin-1 mojibake for area_names). WFS names preferred (source_priority=1).
- `stg_berlin_ewr.sql`: Normalized `city_code` from `'berlin'` to `'BER'` at staging boundary so `int_ewr_series` join matches `dim_area`.
- `staging/schema.yml`: Updated `accepted_values` for stg_berlin_ewr.city_code to `['BER']`.
- **Result: PASS=248 WARN=0 ERROR=0** (WARN=1 cleared; `int_ewr_series` now produces rows).

### Commit 4 (combined C4) — feat(c4): time-series gentrification index (closes #24)
New intermediate models:
- `int_poi_features_pivot.sql` — pivot fct_poi_development to wide (48 categories + total)
- `int_poi_status_dynamism.sql` — status z-score + dynamism z-score per PLR per year (uses flat WINDOW clause to work around DuckDB CTE-chaining internal error)
- `int_ewr_socioeco.sql` — pivot int_ewr_series + EWR composite z-score (5 indicators)
- `int_gentrification_ts.sql` — join POI + EWR, gentrification_score = (status + dynamism + ewr_composite) / 3 — **GEO-DS SIGN-OFF PENDING**

New/updated mart models:
- `fct_gentrification_change.sql` — delta + rank movement per PLR per year
- `gentrification_index.sql` — extended with UNION from int_gentrification_ts (variant='live_data')
- `marts/schema.yml` — fct_gentrification_change contract + variant accepted_values updated

---

## Gate

PASS=258 WARN=0 ERROR=0

Results:
- `gentrification_index` variant='live_data': 8820 rows
- `fct_gentrification_change` with non-null gentrification_delta: 2683 rows (full EWR coverage 2015-2020, 2024)

---

## Geo-DS sign-off required before merging

`int_gentrification_ts` has a pending methodology gate. Open questions for geo-DS:
1. Weight choice: equal 1/3 weight for status_score, dynamism_score, ewr_composite — confirm or adjust
2. NULL handling: years < 2015 have NULL ewr_composite → NULL gentrification_score (correct; don't impute)
3. Cross-vintage: YoY deltas within area_vintage only; 2008/2021 are the first years of each vintage (NULL dynamism_score)
4. EWR suppression: PLRs with suppressed key indicators have NULL ewr_composite — correct behavior

The model header documents all of these. The geo-DS should review `int_gentrification_ts.sql` before PR merge.

---

## Next steps

1. User approves `git push -u origin overnight/2026-06-18-bugs-wiring-c4`
2. Open PR to main — description references closes #59, #60, #57, #58, #52, #24
3. Get geo-DS sign-off on `int_gentrification_ts` methodology
4. PM merges PR; closes issues on board
5. Next: C5 (OSM completeness-bias control) or E1 (H1-H3c regressions)

---

## Known remaining issues (unrelated to this session)

- `fix_ewr_bugs.py`, `fix_ewr_city.py`, `fix_int_schema.py`, `fix_marts_schema.py`, `fix_schema_city.py` — temp scripts in working directory, untracked. Delete manually.
- EWR 2008-2014 not re-ingested with the bug fix (no local CSVs for those years in the standard path). The parquets exist but were built with the old buggy code (fillna(0)). These years are pre-EWR companion CSVs so suppression is minimal; re-ingest if data quality issues emerge.
- EWR 2021-2023 not available (CKAN API miss, no local CSVs). Gap in EWR time series.
- `int_berlin_ewr_plr2021` still uses stub crosswalk (issue #51) — pre-2021 rows produce no output. This is expected.
