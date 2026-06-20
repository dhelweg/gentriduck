# ADR-0010: Spatial distance-weighting & spatial-statistics tooling

- **Status:** Proposed
- **Date:** 2026-06-20

## Context

The 2018 thesis computed POI features **two** ways: a hard point-in-polygon count **and** a
**distance-weighted** variant that spread each POI's count across nearby PLRs with an inverse-distance
"Gewichtungsfaktor" (`reference/system/45_osm_poi_features_domain_piv_distcalc.sql:54-57` —
`sum(anz * dist_weighted)` joined through a precomputed `lor_dist_planungsraum` distance table; thesis
Abb. 5-14). It mattered: the best H1 model (AUC 0.87) ran on the **distance-weighted** data (thesis
p. 91).

The revival never reproduced this. Today:

- the live POI→PLR assignment is a **hard `ST_Within` point-in-polygon** with "no buffer applied"
  (`transform/models/intermediate/int_osm_poi_plr.sql:23-34`) — no decay, no spillover, no smoothing.
  A café 10 m across a PLR border counts **zero** for the neighbour (the classic MAUP / edge-effect
  problem);
- the only `distance_weighted` artefact in the repo is the thesis's **precomputed** CSV
  (`stg_thesis_2018_result_plr_distcalc`), carried for golden comparison, not recomputed from source;
- the schema comment defers distance weighting to "Epic B3/C" with no owning issue.

Two backlog items now depend on a decision here:

- **R-A6 (#69)** — reproduce distance-weighting in the live pipeline, add Getis-Ord Gi* hotspots and a
  MAUP sensitivity check (`docs/assessment/tickets/A6-spatial-weighting.md`).
- **R-A9 (#79)** — spatial-econometric inference (Moran's I / LISA, spatial-lag / spatial-error models)
  and a neighbour-diffusion feature; ADR-0008 §"Open questions" #4 names spatial-autocorrelation-robust
  inference as the formal spatial tier (`docs/assessment/tickets/A9-spatial-dynamic-inference.md`).

R-A6 (#69) **gates implementation on this ADR**: the DE pair may not adopt any new spatial library or
extension until the maintainer accepts the choices below. This ADR selects the tooling and the default
methods; the exact bandwidth, decay parameters, contiguity criterion, cut-points and worked numbers are
a **methodology decision** for `docs/methodology/spatial-methods.md` under the R-C1 gate (geo-DS +
domain-expert sign-off), not this ADR.

### Constraints this ADR must respect (CLAUDE.md golden rules; ADR-0001; ADR-0005)

- **Free + open only** — no paid/proprietary spatial service or weights provider, ever.
- **Cross-platform** (macOS / Windows / Linux) — prefer pure-Python / HTTP / SQL over OS-specific CLIs;
  every dependency must install cleanly via `uv` on all three OSes.
- **Local-first** (ADR-0001) — runs against the local DuckDB file; the same models/scripts must run
  unchanged against MotherDuck later.
- **City-agnostic core** (ADR-0005) — spatial methods are defined over `dim_area` geometries with
  per-city parameters (CRS, bandwidth, contiguity rule). Berlin's metric CRS is **EPSG:25833**
  (ETRS89 / UTM 33N), already the native LOR CRS (`int_osm_poi_plr.sql:25`); the method must **not**
  hard-code 25833 into shared models — the metric CRS is a `dim_city` attribute.

## Decision

Adopt a **two-tier split** that keeps the live dbt pipeline pure-SQL and confines the statistical
machinery to a governed Python analysis layer:

1. **Distance-decay POI weighting → DuckDB `spatial` SQL** (no new library).
2. **Spatial weights, autocorrelation & spatial regression → PySAL** (`libpysal` + `esda` + `spreg`),
   as a new dependency, run only in `analysis/` Python.
3. **H3 — adopt the `h3` Python package for an optional MAUP/robustness layer; do NOT take a runtime
   dependency on the DuckDB `h3` *community* extension** in the build path.
4. **Default decay = mass-conserving Gaussian kernel within a fixed bandwidth.**
5. **Default contiguity for R-A9 = queen, with k-NN as the documented fallback** for islands/disconnects.

Each is justified below.

### 1. Distance-decay weighting — DuckDB `spatial`, not a library

The revival has exact POI `lon/lat`, so it can compute point→polygon distance directly rather than rely
on a precomputed PLR-centroid distance matrix as the thesis did. This is a **pure-SQL** operation the
already-adopted DuckDB `spatial` extension supports (`ST_Transform`, `ST_DWithin`, `ST_Distance`,
`ST_Centroid`). Adding a Python library here would buy nothing and would pull the live index out of the
dbt DAG.

- **Improve on the thesis, not just replicate it.** The thesis spread each POI by raw inverse distance
  from PLR **centroids** with no normalization, so total POI mass was **not conserved** (a POI near a
  border could contribute >1 unit in aggregate). R-A6 must instead bound the spread by a **bandwidth**
  (`ST_DWithin`), apply a decay kernel, and **normalize each POI's weights to sum to 1** so the city
  total is invariant to the weighting. This is recorded as the live `distance_weighted` variant **next
  to** the existing `standard` (hard point-in-polygon) variant — both stay queryable so the MAUP
  sensitivity is honest.
- **Replicate-then-improve for validation.** Keep a faithful inverse-distance, centroid-based
  reproduction available to compare against the thesis golden (`stg_thesis_2018_result_plr_distcalc`)
  for the Epic B directional revival, and treat the mass-conserving Gaussian as the **going-forward
  default**. Document the divergence rather than chase a number-for-number match (CLAUDE.md "Epic B
  framing").
- **CRS.** Compute distances in the city's metric CRS (Berlin: EPSG:25833) — already used in
  `int_osm_poi_plr.sql`; degrees (EPSG:4326) would distort metric distance. The metric CRS is a
  per-city parameter, not a constant baked into shared models (ADR-0005).

### 2. Spatial weights / autocorrelation / regression — PySAL (`libpysal`, `esda`, `spreg`)

Moran's I, LISA, Getis-Ord Gi* and spatial-lag/error models are **not** something to re-implement in
SQL. PySAL is the mature, **BSD-3-licensed**, pure-Python reference implementation, pip/`uv`-installable
and cross-platform, and is exactly the stack both tickets already name. It integrates with `geopandas` /
`shapely` (`shapely` is already a dependency) and reads geometries we can export from DuckDB.

- `libpysal.weights` / `libpysal.graph` — build queen-contiguity and distance/kernel weights from the
  PLR `dim_area` geometries (EPSG:25833). This is the spatial-weights object R-A9 consumes.
- `esda` — global **Moran's I** and **local LISA** (spatial-autocorrelation diagnostics) and
  **Getis-Ord Gi\*** hotspots (the R-A6 hot/cold-spot output; a direct match to Döring & Ulbricht's
  "Gentrification-Hotspots").
- `spreg` — spatial-lag / spatial-error regression (and spatially-robust SEs) to redo the R-A2 (#65)
  relationships under spatial dependence, closing the "spatial autocorrelation ignored" finding.

These run **only in `analysis/*.py`** (deterministic, `random_state=42`, under the R-C3 leakage guard;
`uv run poe analysis`). They do **not** enter the dbt build path, so DuckDB→MotherDuck portability is
untouched. `tobler` (areal interpolation) is **not** adopted now — it is mentioned in the tickets for
the LOR crosswalk (#51) and an optional H3 MAUP layer; defer its adoption to a focused amendment if and
when #51/MAUP actually needs it, to avoid dependency creep.

### 3. H3 — Python `h3`, optional, analysis-only; not the DuckDB community extension

H3 is attractive for one job here: an **alternative, modifiable-areal-unit-free spatial scale** for the
MAUP robustness check (report the index at PLR, BZR, and an H3 hex grid).

- **Adopt the pure-Python `h3` package** (Apache-2.0) for that optional `analysis/` layer **only**.
- **Reject a build-path dependency on the DuckDB `h3` *community* extension.** Community extensions are
  **not part of the core distribution**: they require `INSTALL h3 FROM community` at runtime, are not
  guaranteed signed/available on every platform or on MotherDuck, and would make `uv run poe build`
  non-reproducible across the three target OSes. That violates the cross-platform + local-first→hosted
  constraints. Keeping H3 in Python (or omitting it) keeps the gate green everywhere.
- **Resolution.** For a Berlin-scale MAUP check, **H3 res 8** (~0.7 km² / ~0.46 km edge) is the
  starting point — finer than the ~1.4 km edge of res 7, comparable to PLR granularity. The exact
  resolution(s) are a methodology decision for `spatial-methods.md`; H3 here is a **sensitivity lens**,
  not a new primary grain (PLR remains the unit; ADR-0003/0006).

### 4. Default decay functional form — mass-conserving Gaussian within a fixed bandwidth

Three forms were weighed (see Alternatives). Adopt a **Gaussian kernel** `w = exp(-d² / (2·b²))`
truncated at a fixed bandwidth `b` (`ST_DWithin(d ≤ b)`), with **per-POI normalization to sum 1**:

- smoother and less border-sensitive than raw inverse distance (which → ∞ at d→0 and is what the thesis
  used un-normalized);
- avoids the all-or-nothing cliff of a fixed-bandwidth uniform (top-hat) kernel;
- bandwidth `b` and the replicate inverse-distance variant are **both** swept in the R-A6 MAUP /
  sensitivity analysis, consistent with ADR-0008 §4's mandatory sensitivity requirement.

The thesis's inverse-distance form is **documented and reproduced** as a comparison variant; it is not
the default because it is un-normalized and centroid-based. Final `b`, kernel choice and the
levels-vs-changes treatment are fixed in `spatial-methods.md` under the gate.

### 5. Default PLR contiguity for R-A9 — queen, k-NN fallback

For the spatial-lag/error model (R-A9), default to **queen contiguity** (shared edge *or* vertex) on the
PLR polygons — the standard, parameter-free first choice for areal units and robust to the Berlin PLR
tessellation. Document **k-nearest-neighbour (k≈6)** as the explicit fallback for any disconnected /
island PLRs (water bodies, airport perimeters — the known `area_code = NULL` zones in
`int_osm_poi_plr.sql:47-52` can produce graph islands), so the weights matrix has no empty rows. The
contiguity criterion and `k` are per-city parameters validated in the geo-signoff, not baked into shared
models.

## Alternatives considered

### Distance weighting

- **A — DuckDB `spatial` SQL (chosen).** Pure-SQL, in-DAG, no new dependency, uses exact POI
  coordinates, MotherDuck-portable.
- **B — PySAL kernel weights for the POI spread too — REJECTED for this step.** Would pull the live
  index variant out of dbt into Python for no methodological gain; PySAL is reserved for the
  inference/diagnostics that genuinely need it (Tier 2).
- **C — Precomputed PLR-centroid distance matrix (the thesis approach) — REJECTED as the default.**
  Centroid-to-centroid loses the within-PLR POI position the revival actually has, and the thesis
  variant was un-normalized. Kept only as a reproduction/validation variant.

### Spatial statistics library

- **PySAL (chosen).** Mature, BSD-3, pure-Python, cross-platform, the de-facto standard; exactly what
  both tickets specify.
- **Hand-rolled Moran's I / Gi* in SQL — REJECTED.** Re-implementing permutation inference and spatial
  regression in SQL is error-prone and unreviewable against a reference; PySAL is the citable
  implementation (R-C2 grounding).
- **R `spdep` (the 2018 stack) — REJECTED.** Reintroduces an R toolchain the revival deliberately
  retired (ADR-0001); breaks the single-language analysis surface.

### H3

- **Python `h3`, analysis-only (chosen).** Apache-2.0, cross-platform, no build-path coupling.
- **DuckDB `h3` community extension — REJECTED for the build path.** Non-core, `INSTALL … FROM
  community` at runtime, not guaranteed on every OS / MotherDuck — breaks reproducibility and
  local-first→hosted parity.
- **No H3 at all — viable.** H3 is *optional*; if the MAUP check is satisfied by PLR-vs-BZR alone, H3
  may be skipped. Adopting the Python package keeps the door open at near-zero cost.

### Decay form

- **Gaussian, mass-conserving (chosen)** — smooth, bounded, normalized.
- **Inverse-distance (thesis) — REJECTED as default, retained as reproduction variant** — singular at
  d→0, un-normalized.
- **Fixed-bandwidth uniform / top-hat — REJECTED as default** — discards the decay signal and creates a
  hard edge at the bandwidth.

### Out of scope by golden rule #1

- **X — Any paid / proprietary geocoding, weights, or spatial-analytics service — REJECTED.**

## Consequences

- **R-A6 (#69) and R-A9 (#79) are unblocked once the maintainer accepts this ADR; until then DE
  implementation is blocked** (R-A6 gates on the ADR). New dependencies to add under `uv` when accepted:
  `libpysal`, `esda`, `spreg` (PySAL family; likely also `geopandas` as their I/O bridge) and `h3`
  (Python), all in the main dependency group since `analysis/` is first-class. `uv.lock` is re-pinned;
  no DuckDB community extension is added.
- **The live pipeline stays pure-SQL and MotherDuck-portable.** The `distance_weighted` variant is a new
  in-DAG dbt model alongside `standard`; the spatial-statistics live in `analysis/` and never touch the
  build path, so DuckDB→MotherDuck remains a target swap, not a migration (ADR-0001).
- **City-agnostic seam upheld (ADR-0005).** Metric CRS, bandwidth, decay parameters, contiguity rule and
  H3 resolution are per-city parameters (`dim_city` / index params), not constants in shared models.
  Berlin fills them (EPSG:25833, queen, etc.); a second city supplies its own.
- **Methodology is gated, not decided here.** Final bandwidth `b`, kernel choice, replicate-vs-default
  treatment, contiguity `k`, H3 resolution(s) and the MAUP/sensitivity design are authored in
  `docs/methodology/spatial-methods.md` and require geo-DS **and** domain-expert `PASS` (R-C1) before
  merge, with method citations (R-C2). This ADR only fixes the **tooling and the defaults**.
- **Feeds ADR-0008's sensitivity mandate.** The bandwidth/decay/contiguity sweeps are part of the
  mandatory weight/specification sensitivity analysis (ADR-0008 §4); the Gi* hotspots and LISA become
  R-A8 trajectory / R-B2 back-test inputs.
- **Small, bounded dependency growth**, accepted because spatial structure is a first-class property of
  the model (R-A9) and the edge-effect/MAUP flaw is a documented defect in the current hard
  point-in-polygon index.

## Open questions (resolved in `spatial-methods.md`, not here)

1. **Final bandwidth `b` and kernel** (Gaussian vs. exponential), and whether the replicate
   inverse-distance variant is retained beyond Epic B — R-A6, geo-DS.
2. **H3 resolution(s)** for the MAUP layer, or whether H3 is exercised at all vs. PLR-vs-BZR only —
   R-A6, geo-DS.
3. **Contiguity criterion and `k`** for the R-A9 weights, and island/NULL-PLR handling — R-A9, geo-DS.
4. **Whether `tobler` (areal interpolation) is adopted** for the LOR crosswalk (#51) / H3 interpolation
   — deferred to a focused ADR-0010 amendment when #51 lands.
5. **Levels-vs-changes** treatment of the weighted POI series feeding the lead-lag (consistency with
   ADR-0008 §2) — R-A1 / R-A6, geo-DS.

## References

- `docs/assessment/tickets/A6-spatial-weighting.md` (#69), `docs/assessment/tickets/A9-spatial-dynamic-inference.md` (#79).
- `docs/assessment/2026-06-19-pm-architect-review.md` §2.6 (spatial-autocorrelation / MAUP findings).
- ADR-0001 (DuckDB local-first + `spatial`), ADR-0003 (Berlin geographies / PLR), ADR-0005
  (city-agnostic core), ADR-0006 (MSS / PLR grain), ADR-0008 (multi-dimensional model; §4 sensitivity,
  open question #4 spatial inference).
- `reference/system/45_osm_poi_features_domain_piv_distcalc.sql:54-57`,
  `reference/system/70_oa_helper_disctcalc.sql` (thesis `dist_weighted` spread);
  `transform/models/intermediate/int_osm_poi_plr.sql:23-52` (current hard point-in-polygon).
- Thesis (Helweg 2018) p. 91 (best H1 AUC 0.87 on distance-weighted data), Abb. 5-14.
- PySAL — `libpysal` (weights/graph), `esda` (Moran's I / LISA / Getis-Ord Gi*), `spreg` (spatial
  regression); BSD-3. <https://pysal.org/>
- DuckDB `spatial` core extension (`ST_DWithin` / `ST_Distance` / `ST_Transform`); DuckDB `h3`
  **community** extension (rejected for the build path). <https://duckdb.org/community_extensions/extensions/h3>
- Uber H3 — `h3` Python package, Apache-2.0. <https://h3geo.org/>
- Döring & Ulbricht (2016) — Gentrification-Hotspots in Berlin (Gi* motivation).
</content>
</invoke>
