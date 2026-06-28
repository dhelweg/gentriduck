# Geo-DS Methodology Sign-off — ADR-0010 (Spatial distance-weighting & spatial-statistics tooling)

- **Reviewer:** geo-data-scientist (spatial-methods authority)
- **Artifact:** `docs/adr/0010-spatial-distance-weighting.md` (Status: Proposed; Amended 2026-06-28)
- **Branch:** `feat/69-adr0010-accept`
- **Date:** 2026-06-28
- **Scope of this sign-off:** ADR-0010 is a **tooling-and-defaults** decision. Final parameters
  (bandwidth `b`, kernel, contiguity `k`, H3 resolution, cut-points, levels-vs-changes) are
  deferred to `docs/methodology/spatial-methods.md` under the R-C1 gate and are **not** signed off
  here. I assess only whether the tooling choices and default methods are spatially sound and
  appropriate for this gentrification use case.

## Verdict: PASS WITH CONDITIONS

The two-tier seam (pure-SQL distance weighting in the dbt DAG; PySAL/h3 confined to a governed,
seeded `analysis/` layer) is methodologically sound and is the right separation of concerns. The
five default choices are each defensible and well-cited, and the post-review amendments
(per-call `seed=`, WKB-in-25833 handoff, no pyproj round-trip, pandas `<3.0` cap) materially
improve reproducibility and CRS-correctness. I find no fatal spatial flaw. I attach conditions to
be discharged in `spatial-methods.md` (R-C1) or at R-A6/R-A9 implementation — none of which block
accepting the ADR.

## Rationale (per assessed item)

### 1. Distance-decay POI weighting — mass-conserving Gaussian in EPSG:25833 — SOUND default

- **Mass-conservation + per-POI normalization is the correct default**, and a genuine improvement
  on the thesis. The thesis spread (`45_..._distcalc.sql:54-57`, `sum(anz * dist_weighted)` over a
  precomputed centroid `lor_dist_planungsraum` matrix) is **un-normalized and centroid-to-centroid**:
  a POI near a PLR border can contribute >1 unit in aggregate, so the city total is not invariant to
  the weighting. That conflates two distinct effects (true spatial spillover vs. an artefact of the
  weighting) and is unsuitable as a going-forward default. Normalizing each POI's kernel weights to
  sum to 1 makes the city-total invariant and the variant honestly comparable to the hard
  point-in-polygon `standard` variant — exactly what an honest MAUP/edge-effect comparison requires.
  This also directly fixes the documented defect in `int_osm_poi_plr.sql:23-34` (hard `ST_Within`,
  "no buffer applied"), where a café 10 m across a PLR border counts zero for the neighbour.
- **Gaussian `exp(-d²/2b²)` truncated at `b`** is a defensible smooth-kernel default: bounded
  (unlike inverse distance, singular at d→0), and free of the top-hat cliff at the bandwidth. This
  is standard kernel-density / GWR practice (Fotheringham, Brunsdon & Charlton 2002; Silverman 1986).
- **EPSG:25833 (metric) is correct** — distance decay in degrees (4326) would distort the kernel
  anisotropically with latitude; computing in the native metric LOR CRS is right, and keeping the
  metric CRS a `dim_city` attribute (ADR-0005) is the correct city-agnostic seam.
- **Pitfalls I require to be addressed in `spatial-methods.md` (Conditions C1–C3 below):** the
  bandwidth/MAUP coupling (the apparent spatial structure is partly an artefact of `b`), the
  point→polygon distance reference, and — most importantly — the interaction with OSM
  **completeness bias** (ADR-0008 §5: ~40% fill). Distance-weighting *smooths* counts spatially but
  does **not** correct the temporal coverage-growth bias; in dense, well-mapped inner-city PLRs the
  kernel will pile up more neighbour mass simply because more POIs exist there. The mass-conserving
  normalization mitigates double-counting but not density-driven over-representation. This must be
  stated and, where Epic C5 normalization lands, composed with it — not silently substituted for it.

### 2. PySAL (esda / spreg) — CORRECT toolset, CORRECT diagnostics

PySAL is the de-facto, BSD-3, pure-Python, cross-platform reference implementation, and the chosen
diagnostics map cleanly onto the use case:
- Global **Moran's I** (Moran 1950; Anselin 1995) for overall spatial autocorrelation of the index —
  the right first test that the current pipeline ignores (review §2.6).
- Local **LISA** (Anselin 1995, *Local Indicators of Spatial Association*) for cluster/outlier
  decomposition.
- **Getis-Ord Gi\*** (Getis & Ord 1992; Ord & Getis 1995) for hot/cold-spot detection — a direct
  analogue to Döring & Ulbricht (2016) "Gentrification-Hotspots in Berlin", which is the right
  domain anchor (R-C2).
- **spreg** spatial-lag / spatial-error models to re-estimate the R-A2 relationships under spatial
  dependence — the correct remedy for the "spatial autocorrelation ignored" finding.

Keeping these analysis-only (never in the dbt build path) is the right call: spatial inference is
not something to hand-roll in SQL, and PySAL is the citable reference (R-C2). Building weights from
`shapely` directly (no `geopandas`) is fine and reduces the GDAL/pyogrio surface.

### 3. Default contiguity = queen, k-NN (k≈6) fallback — SOUND for the Berlin PLR tessellation

Queen contiguity (shared edge *or* vertex) is the standard parameter-free first choice for areal
units and is appropriate for the irregular PLR polygons. The k-NN (k≈6) fallback for islands /
disconnected components is necessary and correct: the known `area_code = NULL` zones
(`int_osm_poi_plr.sql:47-52` — water bodies, airport perimeters) and any rook-disconnected PLRs will
otherwise produce empty rows in `W`, which breaks row-standardization and biases Moran's I.
k≈6 is a reasonable areal default (Anselin's typical 4–8 range). Conditions C4–C5 below pin the
remaining choices.

### 4. H3 — Python `h3`, analysis-only, res-8 illustrative; DuckDB community ext rejected — REASONABLE

Using H3 purely as a MAUP robustness lens (report at PLR, BZR, hex grid) is the correct framing —
it is a sensitivity scale, not a new primary grain (PLR stays canonical per ADR-0003/0006).
Rejecting the DuckDB `h3` **community** extension from the build path is well-justified: community
extensions require `INSTALL ... FROM community` at runtime, are not guaranteed signed/available on
every OS or on MotherDuck, and would make `uv run poe build` non-reproducible — a clear violation of
cross-platform + local-first→hosted parity. Demoting "res 8" to illustrative (Amendment 8) is
correct; a resolution is a methodology parameter, not a tooling default. One nuance for C6: H3 over
Berlin requires reprojection from 25833 back to 4326 (h3 is lat/lng-native), which reintroduces a
CRS hop the rest of the design carefully avoids — must be handled explicitly and only in the H3 path.

### 5. Amendments — ADEQUATELY protect reproducibility & CRS-correctness

- **Explicit per-call `seed=` (Amendment 4):** correct and necessary. Moran/LISA/Gi* significance is
  conditional-permutation inference (default 999 perms) and is RNG-driven; LISA/Gi* p-values are
  *not* fixed quantities. Requiring a per-call `seed=` (or a fixed `np.random.default_rng(42)`)
  rather than a process-global `np.random.seed` is the right, version-robust choice and is properly
  folded into the R-C3 leakage guard. This is a real reproducibility fix, not ceremony.
- **WKB-in-EPSG:25833 handoff (Amendment 3):** correct and elegant. Reprojecting in SQL via
  `ST_Transform` before `ST_AsWKB`, then `shapely.from_wkb` in Python with **no pyproj round-trip**,
  single-sources the CRS and removes a whole class of axis-order / datum-shift bugs (the same
  `always_xy` hazard already handled in `int_osm_poi_plr.sql:26-30`). Carrying `area_code` alongside
  the WKB so weights rows align deterministically with the index table is exactly right — mis-aligned
  `W` row order is a classic silent spatial bug.
- **pandas `<3.0` cap (Amendment 2)** and the floors (Amendment 6) are prudent supply-chain hygiene;
  not a spatial-methods concern but they protect the determinism the diagnostics rely on.

## Conditions (DE-actionable; discharge in `spatial-methods.md` under R-C1, or at R-A6/R-A9 impl)

- **C1 — Bandwidth/MAUP coupling must be swept, not fixed by fiat.** `spatial-methods.md` must report
  index/hotspot stability across a range of `b` (and the replicate inverse-distance variant), per
  ADR-0008 §4's mandatory sensitivity requirement. State explicitly that detected spatial structure
  is conditional on `b`.
- **C2 — Define the distance reference precisely.** Point-to-polygon (`ST_Distance(point, plr_geom)`,
  i.e. distance to the *nearest edge*, → 0 inside) vs. point-to-centroid behave very differently for
  the d→0 region and for large PLRs. Fix and justify one in `spatial-methods.md`; the un-normalized
  thesis replicate must stay centroid-based to be a faithful comparison.
- **C3 — Composition with OSM completeness bias (Epic C5) must be explicit.** Distance-weighting does
  not correct temporal coverage growth or density-driven over-representation (ADR-0008 §5, ~40% fill).
  Document the interaction and ensure the C5 normalization is applied to, not replaced by, the
  weighted series.
- **C4 — Row-standardization & symmetry of `W`.** State that `W` is row-standardized for Moran/lag
  models and disclose that the k-NN fallback makes `W` asymmetric (acceptable, but report it; Gi*
  with the standard `binary`/`row` choice should be stated).
- **C5 — Verify zero empty rows and report island handling.** At R-A9, assert no PLR has an empty
  neighbour set after the queen+kNN union, and report how many PLRs the kNN fallback touched.
- **C6 — H3 CRS hop.** If H3 is exercised, document the 25833→4326 reprojection in the H3 path only,
  and that PLR↔hex aggregation is itself a MAUP transformation (areal interpolation assumptions).
- **C7 — Permutation count & multiple-comparisons disclosure.** Fix `permutations` (≥999) in
  `spatial-methods.md` and state the LISA/Gi* multiple-testing posture (e.g. FDR or the conventional
  un-adjusted reporting with a caveat) — 447/542 simultaneous local tests inflate false positives.
- **C8 — Levels-vs-changes (ADR-0008 §2 / open question #5).** Whether the kernel is applied to POI
  *levels* or *changes* feeding the lead-lag is a methodology decision with real consequences for the
  autocorrelation structure; resolve under the gate, not implicitly in code.

None of C1–C8 are blockers for accepting ADR-0010 as a tooling/defaults decision; they are the
agenda for the parameterized `spatial-methods.md` sign-off.

## Citations (R-C2)
- Anselin, L. (1995). *Local Indicators of Spatial Association — LISA.* Geographical Analysis 27(2).
- Getis, A. & Ord, J.K. (1992); Ord, J.K. & Getis, A. (1995). Gi* hotspot statistics.
- Moran, P.A.P. (1950). Notes on continuous stochastic phenomena (Moran's I).
- Fotheringham, Brunsdon & Charlton (2002). *Geographically Weighted Regression* (Gaussian kernel).
- Silverman (1986). *Density Estimation* (kernel bandwidth / smoothing).
- Openshaw (1984). *The Modifiable Areal Unit Problem* (MAUP).
- Döring, M. & Ulbricht, K. (2016). Gentrification-Hotspots in Berlin (Gi* domain anchor).
- PySAL: Rey & Anselin (2007), `libpysal`/`esda`/`spreg`. OECD/JRC (2008) Composite Indicators handbook.

---
**Verdict: PASS WITH CONDITIONS** — accept the tooling and defaults; discharge C1–C8 in
`docs/methodology/spatial-methods.md` under the R-C1 gate before any parameterized spatial result is
published.
