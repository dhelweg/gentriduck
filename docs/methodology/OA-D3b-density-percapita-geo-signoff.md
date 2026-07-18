# OA-D3b (density + per-capita) — geo-data-scientist R-C1 sign-off

- **Reviewer:** geo-data-scientist (spatial/statistical methodology gate)
- **Gate:** R-C1 dual methodology gate, geo/spatial-statistics half.
- **Date:** 2026-07-18 (initial review) · re-reviewed 2026-07-18 after F1 fix.
- **Scope (ONLY the density + per-capita slice of OA-D3b, #280):**
  - `transform/models/intermediate/int_poi_offering_advantage_methods.sql` — the
    `oa_{domain,category,type}_density` and `oa_{domain,category,type}_percapita` columns
    (methods 8–9) and their `area_km2` / `ewr_population` denominator CTEs + joins.
  - `transform/models/marts/mart_poi_oa_methods.sql` — the unpivot surfacing of `density`/`percapita`.
  - `transform/seeds/seed_oa_calculation_methods.csv` — the `density` and `percapita` metadata rows.
  - `transform/models/{intermediate,marts,seeds}/schema.yml` — tests/contracts on the new columns.
  - The z-score slice and the core-six were reviewed separately and are **out of scope** here.
- **Grounding checked (R-C2):** `docs/methodology/OA-D0-geo-signoff.md` C5/C8 (native-CRS `ST_Area`),
  C10 (EWR population join), C3 (completeness-contamination temporal-safety expectation);
  `docs/methodology/OA-D0-domain-signoff.md` Condition C (never legend-share with the LQ family;
  per-capita denominator-endogeneity; density MAUP/centrality confound); Openshaw (1984); Haklay (2010).
- **Context:** this slice was merged to `develop` at `5b32e989` on a *self-written* sign-off that was
  then deleted (`732fa561`) as invalid R-C1 evidence. This file is the genuine independent verdict.

---

## Verdict: PASS WITH CONDITIONS (C-2 residual)

**Re-review update (2026-07-18).** The data-engineer applied the F1 fix and it is **verified resolved**
(see "Re-review of the F1 fix" below). The one blocking methodology defect is gone: the density
`expected_temporal_safe` flag now reads `false` (matching `raw_share`/`percapita`), and the C3
temporal-unsafe caveat is planted in *both* the seed grounding and the model's note 8 / inline comment,
at parity with `raw_share`'s note 6. F2 (non-negativity value tests) was also applied. With F1 closed,
the verdict lifts from CONCERNS to **PASS WITH CONDITIONS**, carrying a single **residual, non-blocking**
condition **C-2**: a green spatial-enabled `dbt build` still cannot be reproduced in this sandbox (the
DuckDB `spatial` extension host is org-egress-blocked, 403) and must be confirmed on a spatial-enabled
machine (DE / PM / CI). Per the coordinator, C-2 is tracked as a residual to clear elsewhere, not a block.

The spatial construction is otherwise **correct and well-grounded**: the density denominator is a
native-metric-CRS `ST_Area` (not degrees), restricted to the grain where area is meaningful; the
per-capita join is an exact-year EWR match with no fan-out and correct null/zero guards; and both
methods are typed as `reference_point='absolute'` so they are structurally barred from being blended or
legend-shared with the LQ family (C7 / domain Condition C).

### Re-review of the F1 fix (evidence)

- `transform/seeds/seed_oa_calculation_methods.csv`, `density` row: `expected_temporal_safe` is now
  **`false`** — consistent with siblings `raw_share` (row 7) and `percapita` (row 10), and with the
  cited OA-D0 geo sign-off **C3** directional expectation. **Resolved.**
- `transform/models/intermediate/int_poi_offering_advantage_methods.sql` note 8 (lines 151–154) and the
  inline density column comment now carry the **TEMPORAL-UNSAFE** caveat: `area_km2` is a time-invariant
  denominator, so density is proportional to the raw `local_stock` numerator and inherits the same OSM
  completeness-growth contamination as `raw_share` (note 6), citing C3 / domain Condition C.2. Seed flag
  and SQL prose now **agree** on the correct (temporal-unsafe) reading. **Resolved.**
- `schema.yml`: non-negativity tests added on the six density/percapita columns (F2). **Applied.**

F1 (high, blocking) is **CLOSED**. F2 (low) is **APPLIED**. F3 remains as the residual C-2.

---

## Checks run and evidence

### 1. Density — native metric CRS, correct grain, absolute reference point (PASS)

- **CRS (C5/C8): correct.** `st_area(st_geomfromwkb(lor.geometry_wkb)) / 1e6` is computed on the raw
  staging WKB, which is stored in each city's **native projected CRS** (EPSG:25833 Berlin / 25832
  Hamburg per `seed_dim_city.native_crs_epsg`; confirmed by `dim_area_geometry`, which reprojects that
  same WKB *to* WGS84 only per-consumer via `ST_Transform(..., always_xy)`). Area is therefore m² →
  km², **never computed in degrees**. This is byte-identical in pattern to the already-signed-off
  `mart_poi_offering_advantage.area_km2` CTE. PASS on C5/C8.
- **Grain restriction (C5): correct.** Berlin area comes from `stg_berlin_lor` (a PLR-only model);
  Hamburg is explicitly filtered `where geo.area_level = 'subarea_l2'`. Density is thus computed only at
  each city's OA leaf grain — it is *not* rolled up to PGR/Bezirk, the "ecological-fallacy magnet"
  corner C5 flagged. PASS.
- **Never-blend (C7 / domain Condition C): correct.** `seed_oa_calculation_methods.csv` density row is
  `reference_point='absolute'`; the mart header and schema.yml both restate the "not an LQ, absolute
  provision reading, never legend-share with the LQ family" rule. PASS.
- **Temporal-safety label (C3): correct after F1 fix.** density `expected_temporal_safe=false`; SQL
  note 8 carries the completeness-contamination caveat at parity with `raw_share`. PASS.
- **Null/zero guard: correct.** `nullif(ak.area_km2, 0)`, LEFT JOIN → density is NULL on no-geometry
  match, not a build error. PASS.

### 2. Per-capita — exact-year EWR join, no fan-out, endogeneity caveat planted (PASS)

- **Exact-year join (C10): correct, and stricter than C10's floor.** Join is
  `base.join_city_code = ewr.city_code AND area_code AND area_vintage AND base.snapshot_year =
  ewr.reference_year`. This is the strict exact-year reading — **no nearest-year fallback, no
  imputation/extrapolation** — which satisfies (exceeds) C10's "do not extrapolate population; NULL
  where no EWR year is within tolerance." PASS.
- **No silent fan-out: verified.** Both `int_ewr_socioeco` and `int_ewr_socioeco_hamburg` are unique on
  `(city_code, area_code, area_vintage, reference_year)` (their own `dbt_utils.unique_combination_of_columns`
  tests), and the join binds all four keys → at most one population row per base row. The model's own
  grain uniqueness test (below) is an additional structural fan-out guard covering both the `area_km2`
  and `ewr_population` joins. PASS.
- **Vintage pitfall (C10): correct by construction.** Berlin `int_ewr_socioeco` is `lor_2021`-only, so
  `lor_pre2021` base rows receive NULL per-capita automatically — matching C10's "restrict published
  per-capita to the lor_2021 vintage." PASS.
- **Division-by-zero: correct.** `nullif(ewr.residents_total, 0)`, `* 1000` (per-1,000 presentation).
- **Denominator-endogeneity caveat (domain Condition C): planted at the source model.** SQL note 9, the
  mart header, and the `oa_domain_percapita` schema.yml description all carry the "population denominator
  is endogenous to displacement — caveat travels with every downstream consumer" language. PASS.

### 3. Tests / contracts actually constraining the new columns (PASS after F2)

- `int_poi_offering_advantage_methods` has a `unique_combination_of_columns` grain test — a real
  fan-out guard over both new joins. Present and correct.
- `mart_poi_oa_methods.oa_method` is `relationships`-tested against `seed_oa_calculation_methods.csv`,
  which contains the `density`/`percapita` rows, and the seed `reference_point` is
  `accepted_values`-tested to include `'absolute'`. So the *labels and grain* are constrained.
- **F2 applied:** non-negativity value tests now exist on the six density/percapita columns, so the
  constraint set is grain + label **+ value range**. Resolved.

### 4. Build (NOT independently verified in this sandbox — residual C-2)

- `dbt parse` → **clean** (project parses; Jinja, refs, all schema.yml valid).
- `dbt build` / `dbt compile` → **could not execute**: opening the DuckDB connection force-installs the
  `spatial` extension from `extensions.duckdb.org`, which is **org-egress-policy-blocked (403 CONNECT)**
  and not cached locally. `ST_Area`/`ST_GeomFromWKB` cannot run without it. (Also: `uv sync` fails
  building `quarto-cli` — worked around with `--no-install-package quarto-cli`; and `dbt deps` is
  blocked on `hub.getdbt.com` 403 — worked around by vendoring `dbt_utils` via git.) I therefore did
  **not** observe pass/warn/error counts. Per the coordinator, this remains as **residual condition C-2**
  to be cleared on a spatial-enabled machine, not a blocker.

---

## Findings

### F1 (high) — `density.expected_temporal_safe` contradicted its grounding (C3) — **RESOLVED**

At initial review, `seed_oa_calculation_methods.csv` density row had `expected_temporal_safe = true`.
This was wrong: density = `local_stock / area_km2` with a **time-invariant** denominator, so it is
proportional to the raw POI count and inherits the *full* OSM mapping-completeness growth of that count.
OA-D0 geo sign-off **C3 names density explicitly** among the modes that **SHOULD FAIL** the
completeness-contamination gate ("raw within-group share, **density**, and per-capita SHOULD fail —
|ρ|≥0.3"); domain Condition C.2 says density "directly tracks OSM completeness growth over time … never
be differenced over time on a public surface unless the completeness test shows PASS." The value also
diverged from its siblings (`raw_share`, `percapita` both `false`) and from the model note 8, which
omitted the caveat — a coherent-but-wrong "temporal-safe" reading that would license exactly the
completeness-biased temporal read the C3/C5 apparatus exists to prevent.

**Fix applied and verified (2026-07-18):**
1. `seed_oa_calculation_methods.csv` density row `expected_temporal_safe` → **`false`**. ✔
2. `int_poi_offering_advantage_methods.sql` note 8 + inline density comment now carry the C3
   completeness-contamination / temporal-unsafe caveat, at parity with note 6 (`raw_share`). ✔

Seed flag and SQL prose now agree; R-C2 grounding complete. **CLOSED.**

### F2 (low) — no value-level test on density/per-capita — **APPLIED**

Recommendation to add non-negativity assertions was taken up: `schema.yml` now carries non-negativity
tests on the six `oa_*_density` / `oa_*_percapita` columns. Both are non-negative by construction
(non-negative stock / positive area or population), so this guards a future sign/units regression.

### F3 (medium) — build not independently verifiable in this sandbox — **RESIDUAL (C-2)**

The DuckDB `spatial` extension host is org-policy-blocked (403) and uncached, so `dbt build`/`test`
cannot run here (parse is clean). A green `uv run poe build` on the affected selector, with observed
pass/warn/error counts, must be confirmed by the data-engineer / PM / CI in an environment where the
`spatial` extension is available. Tracked as residual condition C-2 (non-blocking, per coordinator).

---

## Conditions

- **C-1 (was blocking): CLEARED** — F1 fix applied and verified.
- **C-2 (residual, non-blocking):** attach an actual green `dbt build --select
  int_poi_offering_advantage_methods+ seed_oa_calculation_methods` result (pass/warn/error counts) from
  a spatial-enabled environment. To be cleared off-sandbox; does not block this sign-off.
- **C-3 (recommended): DONE** — F2 non-negativity value tests added.

With C-1 cleared and C-3 done, the density (C5/C8) and per-capita (C10) *spatial* construction is sound
and the never-blend discipline (C7 / domain Condition C) is correctly enforced. C-2 is the only open,
non-blocking item.

---

## Sign-off (machine-readable)

```json
{
  "verdict": "pass_with_conditions",
  "rationale": "After the data-engineer's F1 fix (verified): density expected_temporal_safe is now false (matching raw_share/percapita and OA-D0 geo sign-off C3), and the C3 temporal-unsafe caveat is planted in both the seed and int_poi_offering_advantage_methods.sql note 8 at parity with raw_share note 6. F2 non-negativity tests applied. The density (native-CRS ST_Area, PLR/subarea_l2-only grain) and per-capita (exact-year EWR join, no fan-out, correct null/zero guards, endogeneity caveat) spatial construction is sound, and absolute reference_point bars any LQ-blend (C7 / domain Condition C). The one blocking defect (F1) is closed; a single non-blocking residual remains.",
  "risks": [
    "C-2 residual: a green spatial-enabled dbt build was not reproducible in this sandbox (DuckDB spatial extension host org-egress-blocked, 403); pass/warn/error counts must still be confirmed on a spatial-enabled machine before build-verified status"
  ],
  "recommendations": [
    "DE/PM/CI: run `dbt build --select int_poi_offering_advantage_methods+ seed_oa_calculation_methods` on a spatial-enabled environment and record pass/warn/error counts to clear residual C-2",
    "Consider adding the C3 completeness-contamination Spearman gate as an enforced test (not just an expected_temporal_safe expectation) when the D5 deliverable lands"
  ],
  "resolved_findings": [
    "F1 (high, blocking): density.expected_temporal_safe true->false + C3 caveat added to note 8 — verified CLOSED",
    "F2 (low): non-negativity value tests added on the six density/percapita columns — APPLIED"
  ]
}
```

## Untrusted input (SEC-3)

This review consumed only in-repo code, seeds, schema contracts, and maintainer-authored methodology
sign-offs. No web-fetched or non-maintainer issue/comment text was treated as instructions. Nothing in
the reviewed material requested tool use, new dependencies, or scope changes.
