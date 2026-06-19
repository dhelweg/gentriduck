# C5 Geo-Data-Scientist Sign-Off

- **Task:** OSM completeness-bias control for dynamism_score (C5 normalization)
- **Issue:** #25
- **Date:** 2026-06-19
- **Verdict: PASS — Option A (POI share normalization) approved**

---

## Context

The C4 sign-off explicitly required C5 as a blocking condition:

> "dynamism_score is built on raw YoY count deltas and inherits OSM mapping-completeness growth
> until C5 normalization lands. C5 coverage normalisation is a hard prerequisite before
> dynamism_score is published or fed to E2 regression."

The current `int_poi_status_dynamism` computes `dynamism_score` as a z-score of year-over-year
raw count deltas (`total_poi_count - LAG(total_poi_count)`). Because Berlin's OSM coverage grew
significantly between 2008 and 2024 — partly from real POI growth, partly from improved mapper
coverage — a PLR that simply received more mapping attention will post a positive dynamism z-score
indistinguishable from real commercial churn.

---

## Approach under review

**Option A — PLR POI share normalization:**

Instead of raw YoY count deltas, use each PLR's share of total Berlin POIs per year:

  `plr_poi_share = plr_poi_count / berlin_total_poi_count` (per year)

  `share_yoy_change = plr_poi_share - LAG(plr_poi_share)` (per area_code, per year)

  `dynamism_score = z-score of share_yoy_change` (across all PLRs per year)

If the share grows, the PLR attracted disproportionately more POIs than Berlin overall — a real
signal, not mapping noise. If city-wide mapping coverage improves uniformly, all PLR shares remain
stable and share_yoy_change is ~0 for all PLRs simultaneously.

---

## Methodology assessment

### 1. Share normalization as an OSM completeness control

**Approved.** The underlying statistical rationale is sound: dividing by the city-wide total
transforms a non-stationary count series (growing due to completeness drift) into a compositional
share series. Under the assumption that OSM mapping coverage improves roughly uniformly across
Berlin (a reasonable first approximation at the PLR scale), city-wide count growth cancels in
the share computation. This is conceptually equivalent to a within-year z-score (which the C4
model already uses for status_score), extended across time by using shares rather than
year-within-year standardization.

The method is reproducible from existing data (int_poi_features_pivot provides total_poi_count
per PLR per year) without requiring any new data source. This satisfies ADR-0003 (free/open only).

### 2. Uniform-coverage assumption

**Acceptable with documented limitation.** The share approach assumes mapping coverage grows
proportionally across all PLRs. In reality, some PLRs (inner-city, popular neighbourhoods) may
receive mapping attention before others. If a PLR is mapped early, its share will appear to drop
as other PLRs catch up — potentially producing a spuriously negative dynamism signal. Conversely,
a PLR mapped late will show a temporary positive share spike.

At the 2008-2024 time scale for Berlin, the bulk of OSM coverage growth predates 2015; post-2015
coverage is more stable and the uniform assumption is less problematic. For the gentrification
thesis revival (Epic B/C), this approximation is methodologically acceptable. It must be documented
as a limitation. A more rigorous approach (ohsome API edit-density normalization, Option B) could
be pursued in a future epic.

### 3. Z-score of share_yoy_change

**Approved.** Computing a z-score of share_yoy_change (mean=0, std=1 across PLRs per year)
maintains the same cross-sectional normalization already used for status_score. The resulting
dynamism_score is comparable to the C4 status_score in scale, which is necessary for the
1/3-weight aggregation in gentrification_score (pending C2-fix for EWR scale parity, per
C4 sign-off conditions).

### 4. Implementation scope

**Approved.** The change should be implemented directly in `int_poi_status_dynamism.sql` by
adding a window-function computation for `berlin_total_poi_count` per year and replacing the
raw count delta with a share delta. No new model or new data source is required. The existing
`int_poi_features_pivot` provides all required inputs.

### 5. Anomaly tests (dbt warn severity)

**Required.** Two anomaly tests are required before C5 can be considered complete:

a. **Share spike test:** alert if any PLR's POI share exceeds 2x its 5-year rolling average.
   This catches either a true rapid gentrification signal (worthy of investigation) or a data
   quality artifact (late mapping burst). Severity: warn (not error, pending C6 validation).

b. **City-wide count drop test:** alert if Berlin's total POI count drops >5% year-over-year.
   A drop would indicate a data quality issue (mass POI deletion, ingestion error) rather than
   a real urban change. Severity: warn.

---

## Risks

1. **Non-uniform mapping coverage growth:** PLRs mapped at different rates may show spurious
   share dynamics. Documented as a limitation; Option B (ohsome edit density) is the rigorous
   fix if needed post-publication.
2. **Very small PLRs:** a PLR with very few POIs may have a noisy share series. The z-score
   normalization handles this correctly (large variance = small z-score denominator) but
   small-sample PLRs may still produce extreme dynamism_score values. Winsorizing at ±3 SD
   is recommended as a non-blocking enhancement.
3. **share_yoy_change for year=2021 pre-2021 PLRs:** because `int_poi_status_dynamism`
   partitions LAG by (area_code, area_vintage), the 2020->2021 transition remains NULL
   (different vintage, different area codes). This is correct — the crosswalk (C3) handles
   EWR alignment but POI counts are already assigned to the correct vintage geometry.

---

## Conditions for implementation

1. Add `berlin_total_poi_count` as a window SUM over all PLRs per (city_code, snapshot_year).
2. Compute `plr_poi_share = total_poi_count / berlin_total_poi_count`.
3. Compute `share_yoy_change = plr_poi_share - LAG(plr_poi_share)` partitioned by
   (city_code, area_code, area_vintage) ORDER BY snapshot_year.
4. Replace current `dynamism_score` z-score (which uses raw count delta) with z-score of
   `share_yoy_change`.
5. Add anomaly tests (warn severity) per section 5 above.
6. `uv run poe build` must pass.
7. Verify dynamism_score values are non-null for snapshot years where share_yoy_change is
   computable (i.e., not the first year per PLR/vintage).

---

## Sign-Off

```json
{
  "verdict": "pass",
  "rationale": "PLR POI share normalization (Option A) controls OSM completeness-bias by replacing raw YoY count deltas with each PLR's share of city-wide POI count. Under the uniform-coverage assumption, city-wide mapping growth cancels, leaving only real relative POI density changes. The approach is reproducible from existing data, requires no new source, and maintains the cross-sectional z-score normalization established in C4. The uniform-coverage assumption is acceptable for a directional revival at the 2008-2024 Berlin PLR scale and must be documented as a limitation.",
  "risks": [
    "Non-uniform OSM mapping coverage growth may create spurious share dynamics for late-mapped PLRs",
    "Very small PLRs (few POIs) may have noisy share series; winsorizing at +/-3 SD is recommended",
    "2020->2021 PLR vintage transition remains NULL in share_yoy_change (correct behavior; not a bug)"
  ],
  "recommendations": [
    "Document uniform-coverage assumption as a limitation in int_poi_status_dynamism.sql header",
    "Add anomaly tests (warn severity) for PLR share spikes (>2x 5yr rolling avg) and city-wide count drops (>5% YoY)",
    "Consider winsorizing dynamism_score at +/-3 SD as a non-blocking enhancement post-C5",
    "Option B (ohsome edit-density normalization) remains available for a future epic if needed post-publication"
  ]
}
```
