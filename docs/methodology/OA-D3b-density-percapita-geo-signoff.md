# OA-D3b (density + per-capita) — geo-data-scientist R-C1 sign-off

- **Reviewer:** geo-data-scientist (spatial/statistical methodology gate)
- **Gate:** R-C1 dual methodology gate, geo/spatial-statistics half.
- **Date:** 2026-07-18
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

## Verdict: CONCERNS

The spatial construction is, in the main, **correct and well-grounded**: the density denominator is a
native-metric-CRS `ST_Area` (not degrees), restricted to the grain where area is meaningful; the
per-capita join is an exact-year EWR match with no fan-out and correct null/zero guards; and both
methods are typed as `reference_point='absolute'` so they are structurally barred from being blended
or legend-shared with the LQ family (C7 / domain Condition C). **However**, one methodology-bearing
metadata value contradicts its own cited grounding and is a `high`-severity finding that blocks a clean
PASS: the `density` row is flagged **temporally safe when the geo sign-off it cites (C3) explicitly says
it must fail the completeness-contamination gate**. Because the gate is enforced-not-advisory and this
defect is in already-integrated methodology-bearing code, the honest verdict is CONCERNS until F1 is
fixed. A secondary environment limitation (F3) means I could not independently reproduce a green build
in this sandbox; that must be discharged by the DE/PM/CI where the DuckDB `spatial` extension is
available.

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

### 3. Tests / contracts actually constraining the new columns (PARTIAL — see F2)

- `int_poi_offering_advantage_methods` has a `unique_combination_of_columns` grain test — a real
  fan-out guard over both new joins. Present and correct.
- `mart_poi_oa_methods.oa_method` is `relationships`-tested against `seed_oa_calculation_methods.csv`,
  which contains the `density`/`percapita` rows, and the seed `reference_point` is
  `accepted_values`-tested to include `'absolute'`. So the *labels and grain* are constrained.
- **Gap (F2, low):** the density/percapita **value** columns carry no column-level data test
  (e.g. non-negativity). Consistent with the rest of the method family (log_lq, zscore_slq are also
  value-untested), so not a regression — but "constrained" here means grain + label, not value range.

### 4. Build (NOT independently verified in this sandbox — see F3)

- `dbt parse` → **clean** (project parses; Jinja, refs, all schema.yml valid).
- `dbt build` / `dbt compile` → **could not execute**: opening the DuckDB connection force-installs the
  `spatial` extension from `extensions.duckdb.org`, which is **org-egress-policy-blocked (403 CONNECT)**
  and not cached locally. `ST_Area`/`ST_GeomFromWKB` cannot run without it. (Also: `uv sync` fails
  building `quarto-cli` — worked around with `--no-install-package quarto-cli`; and `dbt deps` is
  blocked on `hub.getdbt.com` 403 — worked around by vendoring `dbt_utils` via git.) I therefore did
  **not** observe pass/warn/error counts; the self-signoff's "green build" claim is **not independently
  reproducible here**.

---

## Findings

### F1 (high, BLOCKING) — `density.expected_temporal_safe` is `true`, contradicting its own grounding (C3)

`seed_oa_calculation_methods.csv`, row `density`:
`density,POI density,...,POIs per km2,absolute,false,true,"Openshaw (1984) MAUP; OA-D0 geo sign-off C5/C8; ..."`
— i.e. `expected_temporal_safe = true`.

This is wrong. Density = `local_stock / area_km2`; the denominator (polygon area) is **time-invariant**,
so density is directly proportional to the raw POI count and inherits the *full* OSM
mapping-completeness growth of that count. OA-D0 geo sign-off **C3 names density explicitly** among the
modes that **SHOULD FAIL** the completeness-contamination gate ("raw within-group share, **density**,
and per-capita SHOULD fail — |ρ|≥0.3"), and the domain sign-off Condition C.2 says density "directly
tracks OSM completeness growth over time … never be differenced over time on a public surface unless the
completeness test shows PASS." The seed's own grounding cite for the row (Openshaw 1984, area-dependence)
argues *for* `false`, not `true`.

Internally inconsistent too: density's siblings `raw_share` (row 7) and `percapita` (row 10) are both
correctly `expected_temporal_safe = false`; only density diverges. And unlike `raw_share` (SQL note 6:
"any consumer must carry the C3 temporal-unsafe caveat"), density's SQL note 8 **omits** the C3
temporal-unsafe caveat — so the mislabel is coherent across the seed flag *and* the model comment: this
slice treated density as temporal-safe, which it is not. Downstream, the `expected_temporal_safe` column
is what a consumer/G2 page reads to decide whether change-over-time claims are permitted; a wrong `true`
would license exactly the completeness-biased temporal read the whole C3/C5 apparatus exists to prevent —
the displacement-misuse surface the domain expert flagged.

**Fix (data-engineer — reviewer does not edit code):**
1. `seed_oa_calculation_methods.csv` — density row: `expected_temporal_safe` `true` → **`false`**
   (matching `raw_share` and `percapita`; grounding OA-D0 geo sign-off C3).
2. `int_poi_offering_advantage_methods.sql` note 8 — add the C3 completeness-contamination /
   temporal-unsafe caveat, at parity with note 6 (raw_share), so the SQL comment and the seed agree
   and the R-C2 grounding is complete.

### F2 (low, recommendation) — no value-level test on density/per-capita

Both are non-negative by construction (non-negative stock / positive area or population). A cheap
`dbt_utils.expression_is_true` non-negativity assertion (`oa_*_density >= 0`, `oa_*_percapita >= 0`,
`where ... is not null`) would turn "constrained grain+label" into "constrained values" and guard against
a future sign/units regression. Not blocking; consistent-with-family if deferred.

### F3 (medium, condition) — build not independently verifiable in this sandbox

The DuckDB `spatial` extension host is org-policy-blocked (403) and uncached, so `dbt build`/`test`
cannot run here (parse is clean). A green `uv run poe build` on the affected selector, with observed
pass/warn/error counts, must be confirmed by the data-engineer / PM / CI in an environment where the
`spatial` extension is available, before this slice is treated as build-verified.

---

## Conditions to clear to PASS

- **C-1 (blocking):** apply F1 fix (1) and (2). This is the one substantive methodology defect.
- **C-2 (blocking-lite):** discharge F3 — attach an actual green `dbt build --select
  int_poi_offering_advantage_methods+ seed_oa_calculation_methods` result (pass/warn/error counts) from
  a spatial-enabled environment.
- **C-3 (recommended, non-blocking):** add F2 non-negativity value tests.

On evidence of C-1 + C-2, this slice flips to PASS: the density (C5/C8) and per-capita (C10) *spatial*
construction is otherwise sound and the never-blend discipline (C7 / domain Condition C) is correctly
enforced.

---

## Sign-off (machine-readable)

```json
{
  "verdict": "concerns",
  "rationale": "Density/per-capita spatial construction is sound (native-CRS ST_Area, PLR/subarea_l2-only grain, exact-year EWR join with no fan-out, correct null/zero guards, absolute reference_point barring LQ-blend). But seed_oa_calculation_methods.csv marks density expected_temporal_safe=true, directly contradicting OA-D0 geo sign-off C3 (which names density among the modes that MUST fail the completeness-contamination gate) and its own siblings raw_share/percapita (both false). This is a high-severity, methodology-bearing grounding defect that must be fixed before a PASS.",
  "risks": [
    "density expected_temporal_safe=true could license a completeness-biased change-over-time reading of a raw-count-driven measure on a displacement-adjacent surface (C3/C5/domain Condition C.2 violation)",
    "density SQL note 8 omits the C3 temporal-unsafe caveat that its sibling raw_share note 6 carries, so seed and comment agree on the wrong reading",
    "build could not be independently reproduced (DuckDB spatial extension host org-blocked); self-signoff's green-build claim unverified here",
    "density/per-capita value columns have no non-negativity/bound test (grain+label constrained, values not)"
  ],
  "recommendations": [
    "DE: set density.expected_temporal_safe = false in seed_oa_calculation_methods.csv (match raw_share/percapita; ground on OA-D0 geo C3)",
    "DE: add the C3 completeness-contamination temporal-unsafe caveat to int_poi_offering_advantage_methods.sql note 8, at parity with note 6",
    "DE/PM/CI: attach a green `dbt build --select int_poi_offering_advantage_methods+ seed_oa_calculation_methods` (pass/warn/error counts) from a spatial-enabled environment",
    "DE: add dbt_utils.expression_is_true non-negativity tests on oa_*_density and oa_*_percapita"
  ]
}
```

## Untrusted input (SEC-3)

This review consumed only in-repo code, seeds, schema contracts, and maintainer-authored methodology
sign-offs. No web-fetched or non-maintainer issue/comment text was treated as instructions. Nothing in
the reviewed material requested tool use, new dependencies, or scope changes.
