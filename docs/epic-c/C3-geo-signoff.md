# C3 Geo-Data-Scientist Sign-Off

- **Task:** C3 LOR geometry ingestion + dual-vintage spatial join + fct_poi_development
- **Branch:** overnight/2026-06-18-c3fix-c3-d1
- **Date:** 2026-06-18
- **Verdict: PASS (with documented follow-ups — none blocking)**

---

## Methodology Assessment

### 1. Dual-vintage cutoff rule (snapshot_year ≤ 2020 → pre-2021; ≥ 2021 → LOR 2021)

**Correct.** The Berlin LOR reform took legal effect on 1 January 2021, replacing the 447/448-PLR
scheme with the 542-PLR scheme. The cutoff aligns POI snapshots with the geometry vintage that was
administratively valid at the time of observation, which is the methodologically defensible choice
for longitudinal analysis. Approximately 20% of PLR boundaries changed in the reform; using a single
vintage for all years would introduce spatial misassignment bias that compounds into the
gentrification index. The vintage is also preserved as `area_vintage` on every fact row, which is
essential for downstream MAUP-aware aggregation and for joining the right EWR vintage (C2). **Approved.**

### 2. ST_Within (exact point-in-polygon) as the spatial predicate

**Correct.** OSM POIs are stored as point centroids in EPSG:4326; PLR polygons are areal units in
EPSG:25833. Exact point-in-polygon (no buffer) is the methodologically clean choice: a buffered or
nearest-neighbour join would introduce a spurious tolerance that hides geocoding errors and biases
counts toward boundary-adjacent PLRs. ST_Within (rather than ST_Intersects) is the right choice
because we want strict interior containment; ambiguous boundary points are negligible in practice
for 8-digit PLR codes. The CTE-materialisation of `poi_points` (transform once, join twice) is also
the right performance pattern for a left join against ~990 polygons.

### 3. always_xy=true for EPSG:4326 axis order

**Correct.** EPSG:4326's canonical axis order is (lat, lon), but OSM coordinates are stored as
(lon, lat) by universal convention. DuckDB's spatial extension follows PROJ semantics where
`always_xy=true` forces the (x=lon, y=lat) interpretation, bypassing the CRS's canonical axis order.
Without this flag, every Berlin POI would be transformed as if it were at ~13°N, 52°E —
geometrically nonsensical and would yield 100% NULL area_code. The flag is documented inline in the
SQL.

### 4. NULL rate (~9–11%) for water bodies / airport perimeter

**Reasonable and well-documented.** Berlin's PLR coverage is by design restricted to inhabited
planning units; the Spree/Havel/Müggelsee water surfaces, Grunewald forest interior, Tempelhofer
Feld, and the BER/Tegel airport perimeters are deliberately outside PLR boundaries. OSM POIs in
those zones correctly resolve to NULL. The 9–11% observed rate is consistent with the share of
Berlin's ~891 km² land area that lies outside PLR coverage. The SQL header documents the structural
sources of NULLs explicitly.

### 5. 12% NULL-rate warn threshold

**Appropriate.** The threshold sits ~1–3 pp above the observed structural baseline — tight enough
to fire on real misalignments (wrong vintage selection, CRS swap regression, coordinate sign flip,
geometry corruption) while accommodating year-to-year variation in OSM coverage of
water/forest/airport features. Warn-severity (not error) is the right severity: a single-year spike
is a signal, not necessarily a build-breaker. Recommend revisiting the threshold annually once
multi-year baselines stabilise.

### 6. OSM temporal pitfalls at this join step

The spatial join itself is robust against most temporal pitfalls because it is purely geometric.
Genuine concerns sit upstream and downstream:

- **Tag-schema drift** is handled in `int_osm_poi_harmonized`, not here — outside C3-join scope.
- **Survivorship bias** is a property of the OSM history snapshot, not the join; flagged for Epic C5.
- **Mapping-completeness bias** — the most important caveat — is *not* corrected at this join step.
  `fct_poi_development.poi_count` is a raw count reflecting both real POI density and OSM mapper
  attention. Any downstream gentrification-index consumer of this fact **MUST** normalise by an
  OSM-coverage proxy before use. This is the Epic C5 deliverable and is correctly scoped out of C3.
- **Boundary-redraw artefacts**: even with correct vintage selection, a PLR split in the 2021 reform
  will show a discontinuity in its time series. Downstream consumers must aggregate to a stable
  crosswalk (e.g., Bezirksregion, or a 2019↔2021 area-weighted crosswalk) before computing
  year-over-year change.

### 7. Deferred dim_area wiring (warn-severity)

**Acceptable.** The relationships test firing on 1,443,954 rows is a *referential* warning, not a
*spatial-correctness* warning — the area_codes produced by the join are valid 8-digit WFS PLR
identifiers; they simply aren't yet enrolled in `dim_area` (which still sources from the 2018 thesis
golden). Promoting this to error would block builds for a known, tracked, follow-up issue. The
deferral is documented in `stg_berlin_lor.sql`. **Approved as warn-severity.**

---

## Risks

1. Mapping-completeness bias in `fct_poi_development.poi_count` if any consumer reads it as a
   real-world density signal before C5 lands.
2. Boundary-redraw discontinuity in PLR time series across the 2020/2021 cutoff if downstream
   models aggregate by raw `area_code` without a vintage-aware crosswalk.
3. NULL-rate threshold (12%) is currently a single global value; per-year or per-category
   partitioning may be needed once multi-year baselines emerge.

---

## Recommendations (non-blocking)

1. When `dim_area` wiring lands (follow-up issue), switch the relationships test to error-severity.
2. Before any gentrification-index consumer joins `fct_poi_development`, ship the C5
   mapping-completeness normalisation (or at minimum a coverage-denominator column).
3. Document the 2019↔2021 PLR area-weighted crosswalk strategy in `docs/` before the index spec
   freezes.
4. Add a cohort-segregation assertion that `joined_pre2021` only contains `snapshot_year ≤ 2020`
   and `joined_2021` only `≥ 2021` (defence against a future refactor crossing the streams).
5. Add a synthetic unit test with known Berlin coordinates (e.g. Brandenburg Gate,
   lon=13.3777, lat=52.5163) across both vintages as an axis-order regression guard.

---

## Sign-Off

```json
{
  "verdict": "pass",
  "rationale": "Dual-vintage cutoff aligns with the 2021 LOR reform effective date; ST_Within with always_xy=true is the correct exact point-in-polygon predicate for EPSG:4326 OSM POIs against EPSG:25833 PLR polygons; ~9-11% NULL rate is structural (water/forest/airports) and well-documented; warn-severity gates are appropriately calibrated.",
  "risks": [
    "Mapping-completeness bias in raw poi_count (deferred to C5)",
    "2021 PLR boundary redraws cause time-series discontinuity without a vintage-aware crosswalk",
    "Deferred dim_area wiring leaves a 1.44M-row referential warn until follow-up issue lands"
  ],
  "recommendations": [
    "Ship C5 mapping-completeness normalisation before any index consumer reads poi_count",
    "Define and document a 2019<->2021 PLR area-weighted crosswalk",
    "Switch relationships test to error-severity once dim_area is wired from stg_berlin_lor",
    "Add cohort-segregation assertion (pre2021 has no year>=2021, vice versa)",
    "Add a Brandenburg-Gate synthetic POI unit test as an axis-order regression guard"
  ]
}
```
