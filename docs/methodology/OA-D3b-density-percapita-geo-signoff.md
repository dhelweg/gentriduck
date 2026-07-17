# geo-data-scientist sign-off — OA-D3b remainder: density + per-capita (#280)

**Ticket:** #280 (OA-D3b remainder), sub-slice of #240 (D-spine tracker), ADR-0024.
**Reviewed:** `transform/models/intermediate/int_poi_offering_advantage_methods.sql` (density/
per-capita columns added on top of the already-PASSed OA-D3/OA-D3b-zscore slices),
`transform/models/marts/mart_poi_oa_methods.sql` (unpivot extended), `transform/seeds/
seed_oa_calculation_methods.csv` (two new rows), schema.yml column/test additions.

## Scope of this review

This is a **narrow extension** of an already-signed-off model (OA-D0/D2/D3/D3b-zscore all PASS on
`develop`). Only the two new method columns (density, percapita) and their supporting joins are in
scope — the seven pre-existing method columns are unchanged (verified via diff: only new CTEs
`berlin_area_km2`/`hamburg_area_km2`/`area_km2`/`ewr_population` and two new join clauses were
added; every pre-existing SELECT expression is byte-identical modulo `sqlfmt`'s automatic
re-wrapping).

## Condition C5/C8 (density — ST_Area, native CRS, ecological-fallacy at coarse grain)

- **PASS.** `area_km2` is computed via `st_area(st_geomfromwkb(...))` on `stg_berlin_lor`/
  `stg_hamburg_geo`'s raw WKB, in each city's native metric CRS (EPSG:25833/25832), **before** any
  WGS84 reprojection — identical pattern to `mart_poi_offering_advantage.sql`'s own `area_km2` CTE,
  which this model's author correctly cited and reused rather than re-deriving independently (no
  drift risk between the two `area_km2` computations, since both share the same source CTE
  pattern verbatim).
- **Grain discipline verified**: this model is explicitly **PLR (Berlin) / subarea_l2 (Hamburg)
  grain only** — it does NOT join through `int_poi_offering_advantage_arealevel` (the OA-D2 area_level
  roll-up), so the coarse-grain ecological-fallacy trap C5 flags ("density at full type grain over a
  Bezirk... says nothing about any Kiez inside it") is **structurally avoided in this slice** — there is
  no Bezirk/PGR/BZR density row to misread. This is the correct scope choice: rolling density up
  through area_level is explicitly deferred to a follow-on ticket (as the model header states), not
  silently smuggled in here.
- Spearman rank-stability check (§7, C5): not run in this slice (no area_level pair exists yet to
  compare against) — correctly deferred to whichever ticket adds area_level-rolled density, which
  MUST re-run the PLR↔BZR §7 gate before publishing.
- NULL handling: `nullif(ak.area_km2, 0)` guards the division; rows with no geometry match (should not
  occur in practice — every Berlin PLR and every Hamburg subarea_l2 has geometry) are NULL by
  construction, not a silent zero.

## Condition C10 (per-capita — EWR population, temporal alignment, vintage)

- **PASS.** The join is `base.snapshot_year = ewr.reference_year` — an **exact match, no
  nearest-year fallback**, exactly as C10 requires ("do not extrapolate population... where no EWR
  year is within tolerance, per-capita is NULL, not imputed"). Verified against the live warehouse:
  Berlin per-capita is populated only for `snapshot_year` 2024/2025 (the years with a literal
  `int_ewr_socioeco` `reference_year` match) and NULL for every other Berlin snapshot year (2008-2023,
  2026) — sparse exactly as specified, not imputed.
- **Vintage pitfall respected**: `int_ewr_socioeco` already restricts itself to `area_vintage=
  'lor_2021'` (its own header, pre-existing behavior, not touched by this slice) — so pre-2021-vintage
  rows (`lor_pre2021`) are NULL for per-capita by construction, matching C10's "per-capita is only
  valid within lor_2021" instruction. Confirmed via live query: no `lor_pre2021` row has a non-NULL
  `oa_domain_percapita`.
- **Population roll-up**: N/A at this slice's PLR/subarea_l2 grain (no roll-up is performed here) —
  C10's "roll it up the prefix hierarchy by summing population" instruction applies only once
  area_level-rolled per-capita is built (a follow-on, same as density).
- Hamburg included (not required by C10, but a reasonable city-agnostic seam extension): joins
  `int_ewr_socioeco_hamburg` the same way, exact-year match only. Verified populated for Hamburg
  `reference_year` 2013-2024 and NULL for 2008-2012/2025-2026 — same sparse-by-design behavior.
- `* 1000` scaling ("per 1,000 residents") is a units choice, not a methodology decision — reasonable,
  matches common demographic-ratio convention (e.g. crime rate per 1,000, births per 1,000).

## C7 (never-blend) — reaffirmed

Both new columns are pure functions of ONE stock numerator against ONE new denominator each; no
column blends density with per-capita or with any LQ-family method. `seed_oa_calculation_methods.csv`
labels both `reference_point = 'absolute'` (a new value added to the seed's `accepted_values` test,
distinct from `parent-relative`/`city-relative`) so a consumer can programmatically separate the LQ
family from the absolute-provision family before rendering — this is the correct mechanism, not a new
gate.

## C2 (broadcast-once) — reaffirmed

`area_km2` and `residents_total` are joined at a coarser grain (`city_code, area_code, area_vintage[,
snapshot_year]`) than the model's own taxonomy-leaf grain, and `left join` broadcasts them
identically across every `(poi_domain_h, poi_category_h, poi_type_h, weight_variant,
methodology_variant)` row for that area — verified no fan-out: row count before/after adding the two
joins is unchanged (982 dbt tests still PASS=970/WARN=5/ERROR=0, identical warning set to the
pre-existing baseline; the model's own `dbt_utils.unique_combination_of_columns` test on the full
grain still passes).

## Build verification

`uv run poe build` — 970/982 PASS, 5 WARN (all five are the same pre-existing, "expected by design"
warnings already documented in prior sign-offs — `brw_residential_coverage_frac`,
`test_ortsteil_overlap_ortsteil_never_dominant`, two `assert_null_rate_below` OSM completeness
warnings, `test_c5_poi_share_spike`), 0 ERROR. No new warnings introduced by this slice.

## Verdict

**Verdict: PASS.** Density and per-capita satisfy Conditions C5/C8/C10/C7/C2 as scoped (PLR/
subarea_l2 grain only, exact-year EWR match, native-CRS ST_Area, never-blend). No new open
questions for this slice — area_level-rolled density/per-capita and Getis-Ord remain explicitly
out of scope, tracked in the model header and #280.
