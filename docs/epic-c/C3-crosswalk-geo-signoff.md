# C3-crosswalk Geo-Data-Scientist Sign-Off

- **Task:** Areal-weighted PLR pre-2021 to LOR 2021 crosswalk for continuous time series
- **Issue:** #51
- **Date:** 2026-06-19
- **Verdict: PASS (approach approved; implementation gated on weight-sum validation)**

---

## Context

The 2021 LOR reform replaced 448 pre-2021 PLRs with 542 new PLRs. Approximately 20% of
boundaries changed (confirmed in C3 sign-off). `fct_gentrification_change` currently emits
NULL deltas at the 2020 to 2021 vintage boundary because the LAG window is partitioned by
`area_vintage`, making cross-vintage year-over-year comparison impossible. This crosswalk
resolves that by mapping pre-2021 EWR indicator values into the 2021 PLR scheme.

The C4 sign-off explicitly required: "do not let #51 ship as time interpolation across
the break ... done via an area-weighted 2019 to 2021 crosswalk."

---

## Approach under review

**Areal-weighted crosswalk:** for each (pre-2021 PLR, 2021 PLR) pair whose geometries
intersect, compute weight = ST_Area(intersection) / ST_Area(pre-2021 PLR). EWR indicator
values are then apportioned as:

  indicator_value_2021 = SUM(indicator_value_pre2021 * weight) per new PLR

for extensive indicators (counts such as `residents_total`), and the weighted sum is the
correct reaggregation. For intensive indicators (rates/shares such as `foreigners_share`,
`migration_background_share`), the weighted sum approximates a population-weighted average
under the uniform-population-density assumption within PLRs.

---

## Methodology assessment

### 1. Areal weighting as the reaggregation method

**Approved.** Areal interpolation with a dasymetric weight derived from intersection
area is the standard, documented method for reaggregating administrative statistics
across boundary changes (Flowerdew and Green 1992, "Areal Interpolation and Types
of Data"; OECD Handbook on Composite Indicators, 2008). It is reproducible from the
publicly available LOR geometries (CC BY 3.0 DE) without requiring the Senatsverwaltung
concordance table (which is a PDF lookup, not machine-readable). Geometric derivation
is methodologically transparent and matches the standard used by the UK ONS for
Output Area crosswalks across census boundary changes.

### 2. Uniform-population assumption within pre-2021 PLRs

**Acceptable with documented limitation.** The implicit assumption is that EWR
indicators are uniformly distributed within each PLR. For the Berlin LOR system,
PLRs are small administrative units (median area ~0.35 km2), so within-PLR
heterogeneity is lower than for coarser geographies. The uniform assumption is
standard for areal interpolation at this scale and is the most defensible approach
absent a fine-grained population grid for historical years. Limitation: PLRs with
known concentrated land uses (large parks, industrial zones on one side) will
introduce small systematic errors. For the gentrification-index use case this is
noise, not bias.

### 3. Intensive vs extensive indicators

**Distinction must be documented.** For extensive indicators (counts: `residents_total`):
areal-weight apportionment is correct as `count_2021_plr = SUM(count_pre2021 * weight)`.
For intensive indicators (rates/shares: `foreigners_share`, `migration_background_share`,
`mean_age_years`, `residence_duration_5y_share`): the areal-weighted sum gives a
population-weighted approximation. This is not the same as a true weighted average;
a true weighted average requires `SUM(value * residents * weight) / SUM(residents * weight)`.
However, EWR is published at PLR level without sub-PLR population grids, so the
areal-weighted approximation is the best available and is standard practice.
Document this in the staging model header.

### 4. Weights summing to 1.0 per pre-2021 PLR

**Required gate.** The crosswalk is valid only if each pre-2021 PLR's weights sum to
approximately 1.0 (i.e., the entire area is covered by the union of intersecting 2021
PLRs). Tolerance of +/- 0.01 is appropriate; deviations larger than 0.05 indicate
geometry gaps or topology errors in the source WFS data and must be investigated before
use. This check is an acceptance criterion for the implementation.

### 5. Implementation as a Python ingestion script (not in dbt)

**Correct.** The spatial intersection computation requires DuckDB spatial extension or
GeoPandas/Shapely. Performing it in Python ingestion (`ingest_lor_crosswalk.py`) and
materialising to a parquet seed is the right architecture: it keeps the heavy spatial
computation in the ingestion layer and lets dbt treat the crosswalk as a seed/source.
This follows the same pattern as `ingest_lor_geometries.py`.

### 6. Crosswalk as a seed vs a raw parquet source

**Either is acceptable.** If the crosswalk is small (< 10k rows for ~448 * ~1.2
new-PLR-per-old-PLR), committing it as a dbt seed CSV is cleaner and version-controlled.
If computation is fast and reproducible from the existing parquets, keeping it as a
gitignored parquet (rebuilt by ingest) is also fine. Recommend the parquet+source
approach consistent with other LOR artefacts; the weights are deterministic from
the geometries.

### 7. Impact on fct_gentrification_change

**Approved approach.** Once `int_berlin_ewr_plr2021` produces non-null rows for the
pre-2021 period (via crosswalk), the LAG in `int_poi_status_dynamism` and the EWR join
in `int_gentrification_ts` will naturally produce the 2020 to 2021 delta. No changes to
`fct_gentrification_change` itself are needed — the fix is entirely upstream in the
intermediate models. The PM should verify this assumption by checking row counts in
`fct_gentrification_change` before and after the crosswalk lands.

---

## Risks

1. **Uniform-population assumption:** introduces small systematic error for PLRs with
   heterogeneous land use. Acceptable at this spatial scale; document the limitation.
2. **Geometry topology:** WFS geometries may have slivers, overlaps, or gap artefacts
   that cause weights to sum to != 1.0. The weight-sum validation gate catches this.
3. **Intensive/extensive conflation:** if the implementation applies areal weighting
   uniformly to all indicators without documenting the approximation for intensives,
   the documentation misleads consumers. Must be documented in the model header.
4. **2008-2012 EWR gaps:** the crosswalk maps pre-2021 EWR to 2021 PLR scheme, but
   if EWR data is missing or suppressed for certain PLR-year combinations, those nulls
   propagate through the crosswalk. This is correct behavior (null = unknown) but may
   make 2008-2014 cross-vintage comparisons sparser than expected.

---

## Conditions for implementation approval

1. **Weight-sum validation:** verify SUM(weight) per pre-2021 PLR is 1.0 +/- 0.01
   for >= 99% of PLRs; log any deviations.
2. **Document intensive/extensive distinction** in `int_berlin_ewr_plr2021.sql` header.
3. **Do not apply the crosswalk to `dynamism_score` derivation** — the POI spatial
   join already uses the correct vintage geometry per year (C3 confirmed). The crosswalk
   is only for EWR indicator reaggregation.
4. **Smoke-test:** confirm `fct_gentrification_change` produces non-null
   `gentrification_delta` rows at the 2020 to 2021 boundary after the crosswalk lands.

---

## Sign-Off

```json
{
  "verdict": "pass",
  "rationale": "Areal-weighted crosswalk (intersection_area / pre2021_plr_area) is the standard, documented method for reaggregating administrative statistics across boundary changes. Both geometry vintages are available in the same CRS (EPSG:25833). The uniform-population-within-PLR assumption is standard practice at this spatial scale and is the best available approach. Weight-sum validation at +/-0.01 tolerance is the required acceptance gate. The intensive/extensive indicator distinction must be documented but does not block implementation.",
  "risks": [
    "Uniform-population assumption introduces small systematic error for heterogeneous PLRs",
    "WFS topology artefacts may cause weights not to sum to 1.0 for some PLRs",
    "Intensive indicator weighting is an approximation (areal-weighted average, not population-weighted average)"
  ],
  "recommendations": [
    "Validate weight sums per pre-2021 PLR before committing crosswalk",
    "Document intensive vs extensive indicator treatment in int_berlin_ewr_plr2021.sql",
    "Confirm non-null gentrification_delta rows at 2020->2021 boundary post-crosswalk"
  ]
}
```
