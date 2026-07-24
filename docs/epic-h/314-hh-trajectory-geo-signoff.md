---
task: "#314 — Admit Hamburg (HH) into fct_gentrification_trajectory"
author: geo-data-scientist
date: 2026-07-24
branch: feature/314-hh-fct-gentrification-trajectory
---

# Geo-DS methodology sign-off — #314 Hamburg admission into fct_gentrification_trajectory

- **Issue / task:** #314 — widen `fct_gentrification_trajectory`'s admitted `city_code` scope from
  `["BER"]` to `["BER","HH"]`, reusing #159 [H-C2]'s already-dual-signed-off cadence-normalized
  `trajectory_window_years=6` window unchanged.
- **Reviewer:** geo-data-scientist (R-C1 methodology gate).
- **Nature of this pass:** Fresh, independent admission-into-mart review from a direct read of the
  actual diff, model, macro, and live warehouse output — **not** a re-derivation of #159's window
  methodology (that is already dual-signed-off PASS: `159-hc2-geo-signoff.md`,
  `159-hc2-domain-signoff.md`).
- **Artefacts reviewed:** `transform/models/marts/fct_gentrification_trajectory.sql` (full),
  `transform/macros/published_cities_filter.sql`, `transform/models/marts/schema.yml`,
  `transform/dbt_project.yml`, `docs/epic-h/159-hc2-geo-spike.md`, `159-hc2-geo-signoff.md`,
  `web/pages/hamburg/**`, and a fresh `uv run poe build --select int_gentrification_ts+`
  (124 PASS / 0 WARN / 0 ERROR) plus direct DuckDB queries of `main.fct_gentrification_trajectory`.

## Findings

### 1. The widening is genuinely mechanical (no threshold/window/partition change)
The sole logic change is one WHERE clause in `ts_with_vintage_max`:
`city_code = 'BER'` → `{{ published_cities_filter("city_code") }}` (resolves to
`city_code in ('BER','HH')`). Every classification component is byte-for-byte unchanged: the `ts`
window (`snapshot_year >= vintage_max_year - var('trajectory_window_years', 6)`), the
`(city_code, area_vintage)` partition on `vintage_max_year`, and all rule thresholds
(`status_delta >= ±1`, `status_range <= 1`, `status_index_mean` cutoffs). `published_cities` is a
superset of the prior literal, so no Berlin row is newly excluded. **Verified:** Berlin output is
still exactly 972 rows, matching #159's recorded no-op count.

### 2. Hamburg's `area_vintage='current'` is fully isolated from Berlin's vintages
Both the `vintage_max_year` window and every downstream aggregate (`per_plr_agg`) partition/group by
`(city_code, area_vintage)`. HH `current`, BER `lor_pre2021`, and BER `lor_2021` therefore never
share a window frame or an aggregation group — no cross-vintage or cross-city contamination is
structurally possible. The window trims HH's 13 annual editions (2013–2025) to 2019–2025 (7
editions, a 6-year span), exactly as #159 specified.

### 3. Substantive plausibility check (the real test, not a rubber stamp)
HH class distribution: stable-established 628, persistently-deprived 93, improving 84, declining 49,
mixed 6 (grain = 860 statistical `subarea_l2` areas). Rolling the mart up to named Stadtteile
(via `dim_area_hierarchy`) gives directionally sound results against publicly known trends:

| Stadtteil | avg status (first→last) | reading |
|---|---|---|
| Blankenese | 1.0 → 1.0 | affluent Elbe suburb, stable — correct |
| Eppendorf / Harvestehude | ~1.3–1.4 | established affluent, stable — correct |
| Ottensen | 1.8 → 1.7 | post-gentrification consolidated — correct |
| HafenCity | 2.0 → 1.5 | new-build high-end, improving — correct |
| Sternschanze | 2.25 → 2.0 | textbook HH gentrification, improving — correct |
| Wilhelmsburg | 2.86 → 2.68 | IBA-era upgrading of a deprived island — correct |
| Steilshoop | 2.8 → 2.9 | large-panel estate, persistently deprived — correct |
| Billstedt | 3.0 → 2.9 | eastern deprivation belt — correct |
| Veddel | 4.0 → 4.0 | one of HH's most deprived, persistently — correct |

No implausible inversions. The vulnerability-positive ordinal orientation reproduces the expected
affluent-west / deprived-east-and-south gradient.

### 4. #159's validated scope genuinely covers this admission
`159-hc2-geo-spike.md` derives the window as **cadence-agnostic** (year-span, not edition-count),
explicitly tabulates `HH current 2013–2025 / 13 editions / annual`, and confirms the Berlin
thresholds transfer once the input window is span-matched. #159's PASS was scoped as
Berlin-preserving groundwork that *pre-clears the H-C2 blocker*, with R4 (accepted_values widening)
deliberately deferred to a fresh dual sign-off — i.e. exactly this ticket. #314 uses the window
unchanged and does not violate any stated #159 boundary.

### 5. No blocking data-quality dependency; #312 does not apply
Trajectory classification is a pure function of `status_index` (Hamburg: `int_hamburg_
sozialmonitoring_index` + `int_ewr_socioeco_hamburg`) — the Sozialmonitoring social-status
dimension, not POI. `dynamik_index` is carried through the intermediate CTEs but is **not** used in
`trajectory_type` and is **not** in the mart's output columns. The mart depends only on
`int_gentrification_ts`; it does **not** ref `mart_poi_offering_advantage`. Therefore the open #312
(OSM completeness-bias re-fit of the POI *offering-advantage* mart) has **no bearing** on this
admission — confirmed, not a blocker.

### 6. No premature web publication
`web/pages/hamburg/**` grep confirms every Hamburg "Social status & trajectory" section renders the
shared `<NotYetPublished>` placeholder; `index.md` explicitly documents #314 as a data-layer-only
change with no page reading the new rows. `accepted_values: ["BER","HH"]` and
`area_vintage: [..., "current"]` contract widenings in `schema.yml` pass their tests.

## Risks
- Endpoint-only `status_delta` fragility persists for both cities (pre-existing; ~19–25% of HH
  full-panel calls flip under 3-edition smoothing per the spike). Deliberately unchanged here; not
  introduced by #314.
- `trajectory_window_years=6` remains a Berlin-anchored empirical constant — revisit if a future
  city's longest vintage span exceeds 6 years (already documented in-model).
- The 6-year *recent* horizon vs a long-run 12-year HH product is a narrative-framing choice owned
  by the paired domain sign-off, not a spatial-method defect.

## Recommendations
- PM may integrate into `develop` once the paired `gentrification-domain-expert` #314 sign-off also
  records PASS (R-C1 dual gate).
- Web wiring that surfaces HH trajectory rows must be its own ticket; do not remove
  `<NotYetPublished>` under cover of a data-layer change.

## Untrusted-input note (SEC-3)
All findings derive solely from the local warehouse, the repo diff, and repo files. No external/web
content informed this assessment.

## Verdict

The admission is a faithful, mechanical scope-widening: one filter literal replaced by the
`published_cities_filter` macro, with #159's cadence-normalized window, partitioning, and all
thresholds unchanged. Berlin's 972-row output is provably and empirically unaltered; Hamburg's
`current` partition is structurally isolated; the resulting Hamburg classifications are
directionally plausible against well-known Stadtteil trajectories; #159's validation is general
enough to cover this; there is no POI/#312 dependency; and no web page publishes the data
prematurely.

```json
{
  "verdict": "pass",
  "rationale": "#314 widens fct_gentrification_trajectory's admitted city scope from ['BER'] to ['BER','HH'] by replacing a single literal city_code='BER' WHERE filter with published_cities_filter (resolving to city_code in ('BER','HH')). It reuses #159's dual-signed-off cadence-normalized trajectory_window_years=6 window, partitioning, and thresholds unchanged. Berlin output verified unchanged at 972 rows; Hamburg's area_vintage='current' partition is structurally isolated in every windowed/aggregated CTE via (city_code, area_vintage) partitioning; live HH classifications are directionally correct against known Stadtteil trends (Blankenese/Eppendorf stable-affluent, Veddel/Steilshoop persistently-deprived, Wilhelmsburg/Sternschanze improving). #159's window is cadence-agnostic and explicitly covers HH's annual 13-edition panel. Trajectory classification uses only status_index (Sozialmonitoring), not POI dynamik_index, and the mart does not ref mart_poi_offering_advantage, so open #312 does not block. Web trajectory sections remain gated behind <NotYetPublished>. Full build passes 124/0/0.",
  "risks": [
    "Endpoint-only status_delta fragility persists for both cities (pre-existing #159 caveat, unchanged here)",
    "trajectory_window_years=6 is a Berlin-anchored constant; revisit if a future city's longest vintage span exceeds 6yr",
    "6-year recent horizon vs 12-year long-run HH framing is a domain-expert narrative call for the paired sign-off"
  ],
  "recommendations": [
    "Integrate into develop only once the paired gentrification-domain-expert #314 sign-off also records PASS",
    "Surface HH trajectory rows on the web as a separate ticket; do not remove <NotYetPublished> under a data-layer change",
    "Track any future endpoint-robustness upgrade (smoothing/slope) as a separate Berlin-affecting change reopening the R-B2 back-test"
  ]
}
```

**Verdict: PASS**
