# Geo-Data-Scientist Sign-off: OA-A.2 (#166) — int_poi_offering_advantage build

- **Scope:** OA-A.2 #166 — the production build of `int_poi_offering_advantage`: the 3-level nested
  location quotient (domain / category / type), for both `weight_variant` values (hard `standard` +
  Gaussian-weighted), faithful Run 1 only. Verifies the model implements the OA-P0.1 (#163) spike's
  locked method decisions and discharges condition **C-1** (mass-leakage guard), which OA-P0.1 marked
  blocking for this ticket.
- **Operationalizes:** 2018 thesis OA (`reference/system/70_oa_helper.sql`, `71_oa.sql`; thesis
  pp. 55–56, 91); `docs/methodology/spatial-methods.md` §11 (§11.1 LQ + order of operations, §11.2
  bandwidth, §11.3 leakage guard); ADR-0017 (OA revival ADR, D1–D5); OA-P0.1 geo sign-off
  (`docs/epic-b/P0.1-oa-variant-geo-signoff.md`).
- **Reviewer:** geo-data-scientist
- **Date:** 2026-07-09
- **Branch:** feature/166-oa-a2-offering-advantage → develop
- **Deliverables reviewed:** `transform/models/intermediate/int_poi_offering_advantage.sql`,
  `transform/models/intermediate/int_osm_poi_plr_weighted.sql` (leakage guard addition),
  `transform/models/intermediate/schema.yml` (new model section + updated docs),
  `transform/tests/test_c1_oa_weighted_mass_conservation_invariance.sql`.
- **Verdict:** PASS

---

## 1. Summary

I checked the production model against the OA-P0.1 spike's locked decisions and ADR-0017, and ran the
full `dbt build` plus a spot-check query against the materialized table.

1. **Nested parent-relative LQ, correctly implemented.** `oa_domain` divides by the all-domains grand
   total; `oa_category` and `oa_type` both divide by their **shared parent domain** total, never by the
   grand total and never type-under-category. This matches `71_oa.sql` column-by-column (verified in
   the SQL header's inline citations) and the OA-P0.1 formula.
2. **Weight-first / LQ-last, single shared pipeline.** `combined_base` unions the hard (`standard`) and
   Gaussian-weighted stocks into one `stock` column *before* any window aggregation; all `sum(...) over
   (...)` bases are computed post-union, and the LQ ratios are formed last, exactly as OA-P0.1 required.
3. **Same-variant denominator.** Every window sum partitions by `weight_variant` (as well as
   `area_vintage`), so a weighted numerator is never divided by a hard-count denominator or vice versa.
4. **Condition C-1 (mass-leakage guard) — discharged.** `int_osm_poi_plr_weighted` now carries a
   `leaked_pois` CTE that fall-back-assigns any POI with a non-null `hard_area_code` but zero
   in-bandwidth kernel matches to that hard home PLR at weight 1, unioned into
   `poi_contributions` before aggregation. This is exactly the guard OA-P0.1 §2.5/C-1 specified.
5. **C-1 invariance test — implemented and enforced.** `test_c1_oa_weighted_mass_conservation_invariance.sql`
   compares, at every taxonomy level (domain/category/type), the weighted variant's city-wide stock
   total against the standard variant's, to a 0.01 floating tolerance, as an **error**-severity singular
   test (not warn) — i.e. build-blocking, matching ADR-0017 D5's "BLOCKING" designation for C-1.
6. **Verified green.** Full `uv run poe build`: 618 pass / 6 pre-existing unrelated warnings / 0 errors,
   including the new invariance test and all 14 new schema tests on `int_poi_offering_advantage`.
   `poe lint` clean.

Verdict: **PASS** (unconditional — the one blocking condition inherited from OA-P0.1 is discharged by
this ticket's own leakage-guard + invariance-test deliverables).

---

## 2. Methodological assessment

### 2.1 Grain and sparse representation — documented, consistent with codebase convention

Grain is one row per observed taxonomy leaf per `(city_code, snapshot_year, area_code, area_vintage,
weight_variant, methodology_variant)`. A leaf with zero POIs in a PLR-year produces no row, matching
the sparse-count convention already used by `fct_poi_development` / `int_poi_features_pivot` /
`int_osm_poi_plr_weighted` (none of them zero-fill). This is a documented Epic B **directional**
divergence from the thesis's dense wide-pivot golden (170 named OA columns, zero-filled), correctly
flagged in the model header as an open item for OA-A.3's (#167) golden comparison — not a defect here.

### 2.2 Mass-leakage guard — correct and general

The guard is implemented once in `int_osm_poi_plr_weighted` (the shared upstream weighted-count model)
rather than duplicated in `int_poi_offering_advantage`, which is the right layering: every other
consumer of the weighted variant (density layer, dynamism, hotspots) also benefits from mass
conservation, and OA only needs to consume an already-correct `weighted_count`. The guard correctly
excludes POIs with a NULL `hard_area_code` (outside all PLR polygons — water, airport perimeter),
matching `fct_poi_development`'s own `where area_code is not null` filter on the hard variant, so no
new asymmetry between variants is introduced.

I confirmed via the invariance test's PASS that Σ_a weighted_count now equals the hard-count city total
**exactly** (within 0.01) at all three levels — this was NOT true before the guard (a POI in
Tempelhofer Feld / Grunewald / Flughafensee could fall outside every PLR's 500 m / 1000 m kernel
radius and be silently dropped), so this is a genuine, verified fix, not just documentation.

### 2.3 Bandwidth — 1000 m headline correctly wired

`int_osm_poi_plr_weighted`'s docstring and `schema.yml` now note the OA {500, 1000, 1500} m sweep with
a 1000 m headline (OA-P0.1 §2.4 recommendation, ADR-0017 D2.3). The headline build requires
`--vars 'poi_kernel_bandwidth_m: 1000'`; the sweep itself is correctly scoped out to OA-C.1 (#174), not
this ticket — consistent with the plan's staged decomposition.

### 2.4 Spot-check on materialized data

Queried `data/gentriduck.duckdb`: both `weight_variant` values populate (`standard`, `gaussian_500m` —
the dev-default bandwidth; the 1000 m headline build is a separate `--vars` run per §2.3, not required
for this sign-off since the *model logic* is bandwidth-agnostic and already tested against whichever
bandwidth is current). OA values range widely (`oa_type` up into the thousands in a few very
low-POI-base PLR/type cells) — this is the **expected, previously-flagged compositional instability**
in low-base cells (D-3 in the SQL header, and the domain-expert's own advisory condition below), not a
computation error: a single POI in a sparse PLR can dominate a rare type's local share. No zero/NULL
denominators leaked through as spurious infinities (the `nullif(...)` guards correctly yield NULL, not
divide-by-zero errors, and NULL is excluded from the `>= 0` schema tests via the `is not null` where
clause).

### 2.5 `methodology_variant` structural invariant

Every row is tagged `'faithful'`, matching ADR-0017 D4/D3 (this ticket builds Run 1 only; the
`'improved'` Run 2 is OA-B.1–B.4 #170–173's separate, never-blended workstream). The
`accepted_values(['faithful','improved'])` schema test on an enumerated-but-not-yet-populated value is
the correct forward-compatible pattern (same idiom used elsewhere in this codebase for staged rollouts).

---

## 3. Conditions

None blocking. One advisory, carried forward (not new):

- **C-4 (advisory, inherited from OA-P0.1).** OA-C.1 (#174) should report the cross-bandwidth
  ({500,1000,1500} m) OA rank correlation and flag OA as bandwidth-sensitive on the G2 methodology page
  if fragile — unchanged scope, not re-litigated here.

---

## 4. Risks

1. Compositional instability in low-POI-base PLR/type cells (documented D-3, not a defect) — deferred
   suppression/minimum-base flag is explicitly out of scope here (OA-C.1/G2 per ADR-0017 D5).
2. The dev-default bandwidth (`gaussian_500m`) is what's currently materialized; the OA headline
   (1000 m) requires an explicit `--vars` rebuild before OA-A.3's (#167) golden comparison and OA-A.4's
   (#168) regression rerun — a build-invocation note for those tickets, not a defect in this one.
3. Sparse-row (vs the thesis's dense zero-filled) representation must be accounted for when OA-A.3
   reindexes against the golden — already flagged in the model header for that ticket.

---

## 5. Certification

The production model faithfully implements the OA-P0.1 spike's method (parent-relative nested LQ,
weight-first/LQ-last, same-variant denominator) and discharges the one blocking condition (C-1
mass-leakage guard) with both the fix and its enforcing invariance test, verified PASS on a live build.
Grounding citations are present in the SQL header (R-C2). No new tool/library/source introduced.

**The PM MAY integrate this into `develop`**, pending the independent `gentrification-domain-expert`
PASS also required by the R-C1 dual gate.

```json
{
  "verdict": "pass",
  "rationale": "int_poi_offering_advantage correctly implements the OA-P0.1-locked three-level nested location quotient (domain vs all-domains grand total; category and type both vs their shared parent domain, verified column-by-column against reference/system/71_oa.sql), using a weight-first/LQ-last pipeline shared by both weight_variant values via one union'd stock column, with every window aggregation partitioned by weight_variant so numerator and denominator never mix variants. Condition C-1 from OA-P0.1 (mass-leakage guard for POIs beyond kernel bandwidth of every PLR) is discharged: int_osm_poi_plr_weighted now fall-back-assigns such POIs to their hard home PLR at weight 1, and the new error-severity singular test test_c1_oa_weighted_mass_conservation_invariance.sql verifies, at all three taxonomy levels, that weighted city-wide totals equal hard-count city-wide totals to floating tolerance -- confirmed passing on a live build (618 pass / 0 errors / 6 pre-existing unrelated warnings). Sparse-row representation (vs the thesis's dense zero-filled pivot) is a documented Epic B directional divergence, not a defect, correctly flagged for the OA-A.3 golden-comparison ticket.",
  "risks": [
    "Compositional instability in low-POI-base PLR/type cells produces very large OA ratios -- documented (D-3), suppression deferred to OA-C.1/G2 by design",
    "Currently-materialized weighted variant is the dev-default 500 m bandwidth, not the 1000 m OA headline -- OA-A.3/A.4 must rebuild with --vars 'poi_kernel_bandwidth_m: 1000' before golden comparison / regression rerun",
    "Sparse (non-zero-filled) row representation must be accounted for when reindexing against the thesis's dense golden in OA-A.3"
  ],
  "recommendations": [
    "OA-A.3 (#167): rebuild the weighted variant at the 1000 m headline bandwidth before comparing to the golden; account for the sparse-row vs dense-pivot representation difference",
    "OA-C.1 (#174, carried from OA-P0.1 C-4): report cross-bandwidth OA rank correlation; flag bandwidth-sensitivity on G2 if fragile"
  ]
}
```

---

## Final Verdict

Verdict: PASS
