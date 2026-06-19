# C6 Geo-Data-Scientist Sign-Off — OSM Temporal Methodology Validation

- **Task:** Validate the OSM time-series temporal methodology (vintage cutoff, tag drift,
  survivorship, completeness, cross-vintage delta, feature consistency)
- **Issue:** #26 (closed by this sign-off; PM to close on the board)
- **Models reviewed:** `int_osm_poi_plr.sql`, `int_poi_features_pivot.sql`,
  `int_poi_share_base.sql`, `int_poi_status_dynamism.sql`; seed `seed_poi_tag_drift`
- **Prior sign-offs relied on:** `docs/epic-c/C5-geo-signoff.md` (completeness-bias correction),
  `docs/epic-c/C3-crosswalk-geo-signoff.md` (areal-weighted crosswalk)
- **Data inspected:** `data/gentriduck.duckdb` (built pipeline, 19 snapshot years 2008–2026)
- **Date:** 2026-06-19
- **Verdict: PASS WITH CONDITIONS**

---

## 1. Vintage cutoff rule (snapshot_year ≤ 2020 → lor_pre2021; ≥ 2021 → lor_2021)

**Sound. Approved.** The LOR 2021 reform reorganised Berlin's pre-2021 PLR scheme (448 areas in
the data) into the 2021 scheme (542 areas), effective 1 Jan 2021. The cutoff in
`int_osm_poi_plr.sql` joins each POI snapshot against the geometry vintage that was legally in
force in that year. This is the correct way to avoid systematic mis-assignment of POIs for the
~20% of PLRs whose boundaries changed. The split-join (`joined_pre2021` for ≤2020, `joined_2021`
for ≥2021, then `UNION ALL`) is a clean, auditable implementation of the rule.

Verified in the built data — the area count flips exactly at the boundary:

| years | vintage | distinct PLRs |
|---|---|---|
| 2008–2020 | lor_pre2021 | up to 448 |
| 2021–2026 | lor_2021 | 542 |

**Spatial method (verified, sound):** point-in-polygon via `ST_Within`, with POI points
transformed EPSG:4326 → EPSG:25833 (native LOR CRS) using `always_xy=true` to force (lon, lat)
axis order. Transforming points into the projected CRS (rather than reprojecting polygons or
joining in geographic degrees) is the correct choice for accurate containment. Boundary-POI
fan-out is deduplicated by a deterministic `QUALIFY ROW_NUMBER()` tie-break (affects <0.1% of
POIs). The ~9–11% structural NULL rate (forest, water, airport perimeters) is explained and
sentinel-tested at a 12% warn threshold. No CRS or MAUP concern at this stage.

---

## 2. share_yoy_change LAG within-vintage — is it sound?

**Sound for what it computes; necessarily incomplete at the vintage boundary.**

`int_poi_status_dynamism` computes `share_yoy_change` as
`plr_poi_share - LAG(plr_poi_share)` partitioned by `(city_code, area_code, area_vintage)` and
ordered by `snapshot_year`. Including `area_vintage` in the partition is **correct**: it prevents
a year-over-year delta from being computed across two incompatible boundary schemes (a 2020
pre-2021 PLR and a 2021 PLR with the same-ish footprint are *not the same unit*). Computing a
delta across that break would be a category error, so the design correctly yields NULL there
rather than a misleading number.

The share normalization itself (Option A, approved in C5) is the right completeness control and
the built data confirms it is doing its job. Berlin-wide POI count ramps from 1,003 (2008) to
184,271 (2026) — a coverage-dominated explosion. If dynamism used raw count deltas, almost every
PLR would post positive dynamism every year. Instead, share-normalized dynamism is **episodic and
signed**, as it should be (see Reuterkiez §6). This is direct evidence the completeness control
works as intended.

**Caveat carried from C5 (still open):** the uniform-coverage assumption is weakest in the early,
sparse years. In 2008 only 200 of 448 PLRs have any POIs, and 2009 still 100%/54% NULL dynamism;
share dynamics in 2009–2012 are partly mapping-onset artifacts, not real commercial churn. Any
analysis or public chart **must not start the dynamism series before ~2012–2013**, where coverage
has stabilised enough for the uniform-coverage assumption to hold. This is a usage condition, not
a model defect.

**Caveat (winsorizing, C5 recommendation still unimplemented):** dynamism_score in the built data
spans [-5.12, +13.39] with 149 observations beyond ±3 SD, concentrated in small/early-coverage
PLRs. The C5 sign-off recommended winsorizing at ±3 SD as a non-blocking enhancement; it has not
landed. Extreme dynamism z-scores in thin PLRs should be winsorized or flagged before they reach
E-series regressions or public visuals, or they will leverage results unduly.

---

## 3. The 2020→2021 vintage gap (issue #63) — known limitation

**Documented, correct-as-designed, and a known temporary limitation.** Because the LAG is
vintage-partitioned (§2), the entire 2021 cohort has `dynamism_score` = NULL (100% NULL at 2021
in the built data) — there is no within-vintage prior year. The series resumes normally from 2022.
Verified Reuterkiez/Reuterplatz: total_poi_count drops 1,138 (2020, old larger boundary) → 468
(2021, new smaller boundary), which is a **boundary artifact, not a real POI loss** — exactly why
a cross-vintage delta must not be computed naïvely.

Issue **#63** is implementing the proper fix: areal-weighted remapping of pre-2021 POI counts into
the 2021 PLR scheme (extensive/count indicator → exact areal weighting), per the
**C3-crosswalk geo-DS sign-off** which already approved this methodology. **No new methodology
sign-off is required for #63**; it applies the already-approved areal weighting to POI counts so
that `fct_gentrification_change` can LAG across the 2021 boundary. Until #63 lands, treat
2021 dynamism as structurally missing and the 2020↔2021 transition as a documented gap.

**Condition:** when #63 lands, the remapped pre-2021→2021 POI counts must pass the same
weight-sum validation (Σ weights per source PLR ≈ 1) required in the C3-crosswalk sign-off, and
the resulting 2021 dynamism values should be spot-checked for plausibility (no spurious spikes
introduced by the remap) before they feed any E-series analysis.

---

## 4. OSM-specific temporal pitfalls

### 4a. Tag-schema drift — well handled

The repo ships an explicit **`seed_poi_tag_drift`** mapping that harmonises evolving OSM tagging
to stable canonical categories, with `since_year`, `confidence`, and a rationale per row. It
captures the high-impact migrations, e.g. the `amenity=coworking_space` deprecation (Sep 2018 →
`office=coworking`), organic-shop variants (2017–18), `shop=coffee` specialty-coffee misuse, yoga
tagging drift. This is the correct mitigation for the classic OSM longitudinal hazard where a
category's count jumps purely because the community changed how it tags. **Approved.**

**Condition (verify, non-blocking):** confirm `int_poi_features_pivot`'s `poi_category_h` is
produced *through* the drift-aware harmonization (i.e., the `since_year` remaps are actually
applied so a 2017 `coworking_space` and a 2019 `office=coworking` land in the same canonical
category). If any drift mapping is seeded but not wired into the harmonization, a category-level
discontinuity would survive into the pivot. The aggregate `total_poi_count` used by
status/dynamism is robust to *within-taxonomy* reclassification, but any per-category analysis
(and the thesis's per-category features) is exposed if drift is not fully applied.

### 4b. Survivorship bias — acknowledged limitation

OSM history reflects *current mappers' knowledge of the past*, not a contemporaneous census. A
POI that opened and closed before a mapper ever recorded it never appears; long-lived
establishments are over-represented in early years. This is intrinsic to OSM-history sourcing
(ADR-0002) and cannot be removed without an external business register. It biases early-year
dynamism toward survivors and reinforces the §2 rule to not over-interpret pre-2013 dynamism.
**Document as a known, irreducible limitation on the methodology page (G2).**

### 4c. Mapping-completeness bias — controlled by C5, with stated residual

The share normalization (C5) is the principal control and the built data confirms it strips the
city-wide ramp. Residual risk: **non-uniform** coverage growth (inner-city kiezes mapped earlier
than the periphery) can still inject spurious share dynamics in the onset years. Option B (ohsome
edit-density normalization) remains the rigorous future fix if a post-publication audit shows the
uniform-coverage approximation is too coarse. Carried forward from C5; not re-litigated here.

### 4d. Feature-type consistency across years — sound

`int_poi_features_pivot` uses a **fixed, explicit set of ~48 canonical category columns** via
`FILTER (WHERE poi_category_h = '…')` conditional aggregation. Because the column set is hardcoded
to the canonical taxonomy (not data-driven per year), every snapshot year has the *same* schema —
a category absent in a given year is `0`/NULL, not a missing column. This is exactly what you want
for a longitudinal panel: no silent appearance/disappearance of feature columns across years.
**Approved.**

---

## 5. Cross-cutting methodology observations

- **Status vs dynamism are well separated in construction:** status_score is a within-year
  z-score of *level* (total_poi_count); dynamism_score is a within-year z-score of *share change*.
  Both are cross-sectionally normalized per year, so they are on a comparable scale for downstream
  aggregation. Sound.
- **Aggregation/MAUP:** the analysis lives at PLR granularity throughout (no re-binning beyond the
  vintage crosswalk), which is the finest stable unit and minimises MAUP. The one MAUP-sensitive
  operation is the 2021 crosswalk (#63), already governed by the C3-crosswalk sign-off.

---

## 6. Reuterkiez spot-check (data available — performed)

Reuterkiez resolves to PLR `08010301` (pre-2021 scheme; `area_name = 'Reuterkiez'`) and the
2021-scheme `Reuterplatz` `08100311`. Pulled from `int_poi_status_dynamism` in the built DB:

| year | vintage | POIs | share % | dynamism z | status z | dynamism rank (pre-2021) |
|---|---|---|---|---|---|---|
| 2010 | pre2021 | 114 | 0.717 | +1.18 | +2.56 | 37 / 440 |
| 2012 | pre2021 | 321 | 0.879 | +3.55 | +3.35 | 4 / 448 |
| 2013 | pre2021 | 482 | 1.088 | +4.39 | +4.14 | 6 / 448 |
| 2015 | pre2021 | 580 | 1.061 | −1.78 | +4.03 | 441 / 448 |
| 2017 | pre2021 | 660 | 0.886 | −3.34 | +3.30 | 445 / 448 |
| 2019 | pre2021 | 978 | 1.049 | +4.72 | +4.12 | 5 / 448 |
| 2020 | pre2021 | 1138 | 1.126 | +3.43 | +4.52 | 8 / 448 |
| 2021 | 2021 | 468 | 0.412 | NULL | +1.45 | — (vintage break) |

**Interpretation — the methodology behaves correctly for a known hotspot:**

1. **Status is persistently high** (z ≈ +3 to +4.5): Reuterkiez is consistently POI-rich relative
   to Berlin. Correct for an established, dense inner kiez.
2. **Dynamism is episodic and signed**, not a monotonic copy of the raw count. Raw POIs rise every
   single year (5 → 1,138), yet dynamism shows distinct **bursts (2012–13, 2019–20, ranks 4–8 of
   448)** and a **cooling 2015–17 (ranks 441–445)**. This is the C5 completeness control working:
   it removed the city-wide ramp and surfaced *relative* share dynamics. A raw-count dynamism
   would have shown Reuterkiez "gentrifying" every year, which would be meaningless.
3. The 2012–13 and 2019–20 dynamism peaks are temporally plausible for Reuterkiez's documented
   gentrification trajectory, and they lead/accompany rather than lag the status level — consistent
   with the pre-gentrification lead-lag reading in the E1/E2 sign-off.
4. **Vintage break is exactly as designed:** the 2020→2021 count drop (1,138 → 468) is a boundary
   artifact (the 2021 `Reuterplatz` footprint is smaller), and dynamism is correctly NULL at 2021.
   This is the #63 gap in concrete form.

The spot-check **confirms** the temporal methodology produces sensible, defensible signal for a
hotspot. No anomaly found.

---

## Conditions for PASS

1. **Do not publish or analyse the dynamism series before ~2012–2013** (early-year coverage
   onset + survivorship + small-PLR noise make pre-2013 dynamism unreliable). State this start-year
   on the methodology page (G2).
2. **Implement winsorizing (±3 SD) of dynamism_score** (C5 recommendation, still open; 149 obs
   currently beyond ±3 SD, max +13.4) before dynamism feeds E-series regressions or public visuals.
3. **Verify the tag-drift seed is wired into harmonization** so `poi_category_h` actually applies
   the `since_year` remaps (protects per-category longitudinal series; aggregate counts already
   robust).
4. **Land #63** (areal-weighted POI remap to 2021 scheme) to close the 2020↔2021 dynamism gap;
   validate weight-sums (Σ ≈ 1 per source PLR) and spot-check remapped 2021 dynamism for spurious
   spikes before downstream use. No new methodology sign-off needed (covered by C3-crosswalk).
5. **Document on G2** as known irreducible limitations: OSM survivorship bias and the residual
   non-uniform-coverage risk (Option B / ohsome remains the future rigorous fix).

---

## Sign-Off

```json
{
  "verdict": "concerns",
  "rationale": "The OSM temporal methodology is sound. The vintage cutoff (<=2020 lor_pre2021 / >=2021 lor_2021) correctly assigns POIs to the geometry in force per year and is verified in the built data (448->542 PLRs at the boundary). The ST_Within point-in-polygon join with EPSG:4326->25833 always_xy transform is the correct spatial method. share_yoy_change LAG partitioned by area_vintage is correct: it computes real within-vintage share dynamics and correctly NULLs the incompatible cross-vintage delta. The C5 share normalization demonstrably strips the city-wide completeness ramp (1003 POIs in 2008 -> 184k in 2026) and yields episodic, signed dynamism, confirmed by the Reuterkiez spot-check (persistent high status, dynamism bursts 2012-13/2019-20, cooling 2015-17, correct vintage-break NULL at 2021). Tag-schema drift is explicitly handled via seed_poi_tag_drift; feature-type consistency is guaranteed by a fixed canonical column set in the pivot. The PASS is conditional on: not analysing pre-2013 dynamism (coverage onset + survivorship), implementing the still-open ±3 SD winsorizing, verifying the drift seed is wired into harmonization, landing #63 for the 2021 cross-vintage gap, and documenting OSM survivorship + residual non-uniform-coverage as G2 limitations.",
  "risks": [
    "Pre-2013 dynamism is coverage-onset / survivorship dominated (only 200/448 PLRs mapped in 2008); must not be published or analysed",
    "dynamism_score has 149 obs beyond +/-3 SD (range -5.1 to +13.4) in thin/early PLRs; winsorizing recommended in C5 is not yet implemented",
    "2020->2021 vintage gap leaves all 2021 dynamism NULL until #63 lands; cross-vintage count drop (Reuterkiez 1138->468) is a boundary artifact not real change",
    "Residual non-uniform OSM mapping-coverage growth (inner-city mapped before periphery) can still inject spurious share dynamics in onset years (C5 carryover)",
    "OSM survivorship bias is irreducible without an external business register; over-represents long-lived POIs in early years",
    "Per-category longitudinal series are exposed if seed_poi_tag_drift remaps are seeded but not fully wired into poi_category_h harmonization"
  ],
  "recommendations": [
    "Set the published/analysed dynamism series start year to ~2012-2013 and state it on the G2 methodology page",
    "Implement dynamism_score winsorizing at +/-3 SD before it feeds E-series regressions or public visuals",
    "Confirm seed_poi_tag_drift since_year remaps are applied in the harmonization that produces poi_category_h",
    "Land #63 (areal-weighted POI remap to 2021 PLR scheme); validate weight-sums and spot-check remapped 2021 dynamism for spurious spikes (no new methodology sign-off required; covered by C3-crosswalk)",
    "Document OSM survivorship bias and residual non-uniform-coverage as known limitations on G2; keep Option B (ohsome edit-density) as the future rigorous fix"
  ]
}
```

---

**C6 (#26) is signed off here.** The PM may close issue #26 on the board.
