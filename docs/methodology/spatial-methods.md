# Spatial Methods — Gentriduck

**Status:** Approved (geo-DS sign-off below)
**Governs:** issue #69 [A6] (distance-weighting + Gi* hotspots + MAUP) and all downstream spatial
analysis (#79 [A9])
**ADR:** ADR-0010 (tooling + defaults); this document fixes the deferred methodology parameters under
the R-C1 gate (geo-DS + domain-expert sign-off), with R-C2 grounding citations throughout.
**Operationalizes:** ADR-0010 open questions 1–3; `index-definition.md` §0.3 (EPSG:25833), §2.3
(spatial-robust inference), §2.4 (C5-before-weighting); ADR-0008 §5 (completeness-bias correction).

---

## 1. Spatial aggregation: distance-weighted POI counts

The live pipeline assigns each POI to exactly one PLR by hard point-in-polygon (`ST_Within`, "no
buffer applied" — `int_osm_poi_plr.sql:23-34`). A café 10 m across a PLR border counts **zero** for
the neighbour: the classic MAUP / edge-effect artefact. The 2018 thesis already mitigated this with a
distance-weighted variant (`sum(anz * dist_weighted)` over a precomputed PLR-centroid matrix —
`reference/system/45_osm_poi_features_domain_piv_distcalc.sql:54-57`; thesis Abb. 5-14), and the best
H1 model (AUC 0.87) ran on the distance-weighted data (thesis p. 91).

We adopt **inverse-distance decay via a Gaussian kernel** as the going-forward default, computed in
pure DuckDB `spatial` SQL (ADR-0010 Decision 1) from exact POI coordinates to PLR geometries — an
improvement on the thesis's un-normalized centroid-to-centroid spread. For each POI `j` and PLR `i`
within bandwidth `b`:

```
w_ij = exp( -d_ij² / (2·b²) )    for d_ij ≤ b   (else 0; ST_DWithin truncation)
```

where `d_ij` is the metric distance from POI `j` to PLR `i`'s representative point (boundary or
centroid; `ST_Distance` in EPSG:25833). The Gaussian is bounded (unlike raw inverse distance, singular
at `d→0`) and avoids the hard cliff of a uniform top-hat kernel. This is standard kernel-density / GWR
practice (Fotheringham, Brunsdon & Charlton 2002, *Geographically Weighted Regression*; Silverman
1986). The thesis inverse-distance form is **retained as a documented reproduction variant** for the
Epic B directional comparison against `stg_thesis_2018_result_plr_distcalc`, not as the default
(ADR-0010 §4; CLAUDE.md Epic B framing).

## 2. Mass conservation

Each POI's weights are **normalized to sum to 1 across the PLRs it reaches**, so total POI mass is
conserved and the city total is invariant to the weighting (ADR-0010 §4; un-normalized thesis spread
let a border POI contribute >1 unit in aggregate, conflating true spillover with a weighting artefact):

```
ŵ_ij = w_ij / Σ_i w_ij           (Σ_i ŵ_ij = 1 for every POI j with ≥1 in-bandwidth PLR)
```

The distance-weighted PLR count is `Σ_j ŵ_ij`. Summed over all PLRs this equals the POI count exactly,
making the `distance_weighted` variant honestly comparable to the `standard` hard point-in-polygon
variant — the precondition for an honest MAUP/edge-effect comparison (§7).

## 3. CRS

**All distance, bandwidth, and area computations use EPSG:25833** (ETRS89 / UTM 33N), Berlin's native
LOR CRS (`int_osm_poi_plr.sql:25`; `index-definition.md` §0.3). Degrees (EPSG:4326) distort metric
distance and would warp the kernel. POI points are transformed once via `ST_Transform(..., true)`
(always_xy) before any distance call. Per ADR-0010 Amendment 3, geometries cross to PySAL as
**WKB already in 25833** (`ST_AsWKB`) parsed by `shapely.from_wkb`: no Python-side `pyproj`
reprojection, no CRS round-trip — the metric CRS is single-sourced in SQL. The metric CRS is a
per-city `dim_city` attribute, never hard-coded in shared models (ADR-0005).

## 4. Bandwidth and kernel

**Default: Gaussian kernel, bandwidth `b = 500 m`.** Rationale: 500 m is a standard walkable-amenity
catchment / pedestrian service radius in urban analytics (≈5–6 min walk; cf. Fotheringham et al. 2002
on bandwidth as the analytical scale of process), and is comfortably sub-PLR for Berlin (median PLR
≈0.6–1 km²), so the kernel smooths across borders without dissolving the PLR grain. Crucially, 500 m
also aligns with the gentrification-spillover / Kiez-diffusion scale in Dangschat's (1988/2000)
invasion-succession model: pioneer and commercial succession diffuses across Kiez boundaries at
roughly the pedestrian-Kiez radius, sitting between a single block (~100 m) and a whole BZR
(~1–2 km), so the walkable-catchment and process-scale rationales converge on the same default
(Döring & Ulbricht 2016; R-C2 grounding). The Gaussian is
the recommended shape (smooth, bounded, mass-conserving §2); an **exponential kernel**
`w = exp(-d/b)` is the documented alternative for a heavier near-field weight if §7 indicates
sensitivity.

This is the **default only**. The MAUP / sensitivity suite (§7; ADR-0008 §4 mandatory sensitivity)
sweeps the bandwidth at **±50%** (250 m and 750 m) and additionally compares the Gaussian against the
thesis inverse-distance reproduction variant and the `standard` hard point-in-polygon. The headline
uses `b = 500 m`; divergence across the sweep is reported, not hidden.

## 5. Composability with OSM completeness-bias correction (ADR-0008 §5)

OSM POI counts rise partly because **mapping coverage grew** (~40% completeness; ADR-0008 §5), not
because the neighbourhood changed. Distance-weighting must **not** reintroduce this coverage-growth
bias. The binding composition rule:

> **C5 share-normalization first, distance-weighting second.** Distance-decay weights are applied to
> the **C5-corrected POI shares per category** (the share-of-category normalization already in
> `int_poi_status_dynamism`, where `dynamism_score` is the z-score of `share_yoy_change`, not of raw
> counts — `index-definition.md` §2.4; `docs/epic-c/C5-geo-signoff.md`), **never to raw counts.**

Weighting raw counts would spatially smear coverage growth and re-bias the lead-lag toward false H3b
confirmation (`index-definition.md` §2.4, geo condition 5a). Because §2's normalization is conservative
(mass-preserving), applying it to an already share-normalized quantity preserves the share
interpretation. PLRs with zero POIs across all years remain excluded (`index-definition.md` §7 rule 4).

## 6. Getis-Ord Gi* hotspot detection

Hot/cold-spot detection uses PySAL `esda.G_Local` (Getis-Ord Gi*), the direct operationalization of
Döring & Ulbricht's (2016) "Gentrification-Hotspots" reading (ADR-0010 §2):

- **Weights:** Queen contiguity (shared edge *or* vertex) built directly from PLR `shapely` geometries
  via `libpysal.weights.Queen` (no geopandas — ADR-0010 Required 1). Queen is the standard
  parameter-free first choice for areal tessellations. **k-NN (k≈6) is the documented fallback** for
  disconnected/island PLRs (water bodies, airport perimeters — the `area_code = NULL` zones,
  `int_osm_poi_plr.sql:47-52`) so the weights matrix has no empty rows (ADR-0010 §5).
- **Inference:** `esda.G_Local(y, w, permutations=999, seed=42, star=True, alternative='two-sided')` —
  **fixed `permutations=999` and explicit `seed=42` on every call** (R-C3; ADR-0010 Required 4).
  Row-standardized weights; `alternative='two-sided'` for bilateral hot/cold classification.
  With row-standardized Queen weights and no diagonal, esda sets the self-weight to the maximum
  row weight (standard approximation; no separate `fill_diagonal` step required).
- **Output:** per PLR per year, a Gi* **z-score** and **permutation p-value** (and a
  hot/cold/not-significant label at α=0.05). The input `y` is the C5-corrected, distance-weighted
  dimension sub-score (§5), so hotspots reflect amenity/social signal, not coverage growth.
- **Public labelling convention (binding, G-1/G-2):** the internal statistic name "Gi* hotspot" is
  retained in code and analysis output. **Public-facing labels** (G2 methodology page, map legends,
  tooltips, mart column comments) must use a hedged qualifier — "amenity-change hotspot" or
  "social-change-pressure cluster" — and carry the `index-definition.md` §1.2 G-2 ecological-inference
  disclaimer ("this identifies areas with elevated spatial clustering of social-change pressure, not
  individual displacement events"). A bare "gentrification hotspot" label is prohibited in public
  output (G-1/G-2 guardrails; domain-expert C1).

Citation: Getis & Ord (1992), *The analysis of spatial association by use of distance statistics*,
*Geographical Analysis* 24(3); Ord & Getis (1995), *Local spatial autocorrelation statistics*,
*Geographical Analysis* 27(4).

## 7. MAUP sensitivity

The modifiable-areal-unit problem is addressed by re-computing the index at **two administrative
scales**:

- **PLR** (Planungsraum, the primary grain) and **BZR** (Bezirksregion, the next coarser LOR tier).
- Report the **Pearson correlation between the PLR-derived and BZR-derived index rankings**
  (BZR computed by aggregating PLR membership, then re-ranking). **Acceptance threshold: r > 0.7.**
  Below 0.7, the index is MAUP-fragile and the methodology page (G2) must say so prominently.
- **Optional H3 lens** (ADR-0010 §3; Python `h3` package, analysis-only — *not* the DuckDB community
  extension): recompute at **two H3 resolutions, res 8 (~0.46 km edge, ≈PLR-comparable) and res 7**
  (one step coarser), as an areal-unit-free robustness check. H3 is a sensitivity lens, never a new
  primary grain (PLR remains the unit). H3 may be skipped if PLR-vs-BZR alone clears the threshold.

This sweep runs alongside the §4 bandwidth sweep (±50%) and the kernel-shape comparison, jointly
discharging the ADR-0008 §4 sensitivity mandate for the spatial layer.

## 8. Spatial autocorrelation in inference

PLR observations are **not independent** (Tobler's first law; adjacent Kieze co-move —
`index-definition.md` §2.3). Whenever regression coefficients are reported (R-A2 #65 re-run, R-A9 #79),
inference must be spatial-autocorrelation-aware:

1. Fit `spreg.OLS` and run the **Moran's I test on residuals** (`esda.Moran(..., permutations=999,
   seed=42)`) using the §6 Queen weights.
2. If Moran's I is **significant** (α=0.05), **upgrade to a spatial model** — `spreg.ML_Lag`
   (spatial-lag) where the Lagrange-multiplier diagnostics favour a lag dependence, or `spreg.ML_Error`
   (spatial-error) where they favour error dependence (Anselin–Florax LM decision rule).
3. **Report naive (OLS) and spatial-robust inference side by side**; never publish a significance
   claim on naive SEs alone (`index-definition.md` §2.3, geo condition 1).

Citation: Anselin (1988), *Spatial Econometrics: Methods and Models*; Anselin (1995), *Local
Indicators of Spatial Association — LISA*, *Geographical Analysis* 27(2).

## 9. Implementation constraints (ADR-0010 Required 1–4)

1. **No geopandas in weights construction.** PySAL weights are built directly from `shapely`
   geometries parsed from DuckDB WKB (`Queen.from_iterable` / `KNN.from_array`); no `GeoDataFrame`,
   no shapefile I/O (ADR-0010 Required 1, dep floor `libpysal>=4.10`).
2. **pandas pinned `>=2.2,<3.0`** (ADR-0010 Required 2).
3. **Geometry handoff = WKB in EPSG:25833** via `ST_AsWKB`, carrying `area_code` as the stable join
   key; parsed with `shapely.from_wkb`; no pyproj, no CRS round-trip (ADR-0010 Required 3, §3 above).
4. **Explicit per-call seed on every permutation call** — `esda.G_Local(..., permutations=999,
   seed=42)`, `esda.Moran(..., permutations=999, seed=42)`, and the `spreg` equivalents. Never rely on
   a process-global `np.random.seed`; the reviewer treats a missing per-call seed as a reproducibility
   defect (ADR-0010 Required 4 / R-C3).

All PySAL/h3 code lives in `analysis/*.py` only (deterministic, `uv run poe analysis`), reading via a
configurable DuckDB connection (local file now, `md:` later — ADR-0010 Recommended 7); it never enters
the dbt build path.

## 10. ADR-0010 C1-C8 discharge checklist

| ADR-0010 condition / open question | Discharged in |
|---|---|
| Open Q1 — final bandwidth `b` and kernel (Gaussian vs exponential); replicate variant retained? | §1, §4 (b=500 m Gaussian default; exponential alt; inverse-distance reproduction retained for Epic B) |
| Open Q2 — H3 resolution(s), or PLR-vs-BZR only | §7 (PLR-vs-BZR primary, r>0.7; optional H3 res 7 & 8) |
| Open Q3 — contiguity criterion + `k`, island/NULL-PLR handling | §6 (Queen default; k-NN k≈6 fallback for NULL/island PLRs) |
| Required 1 — no geopandas; weights from shapely | §6, §9.1 |
| Required 2 — pandas `<3.0` | §9.2 |
| Required 3 — WKB-in-25833 handoff, no pyproj/CRS round-trip | §3, §9.3 |
| Required 4 — explicit `seed=` on every permutation call (R-C3) | §6, §8, §9.4 |
| Decision 1 — distance-decay in DuckDB SQL | §1 |
| Decision 4 — mass-conserving Gaussian within fixed bandwidth | §1, §2, §4 |
| Decision 5 — Queen contiguity, k-NN fallback | §6 |
| CRS (Decision §1, ADR-0005) — EPSG:25833, per-city param | §3 |
| ADR-0008 §5 — C5 completeness correction composes before weighting | §5 |
| ADR-0008 §4 — mandatory sensitivity (bandwidth/kernel/scale sweep) | §4, §7 |
| `index-definition.md` §2.3 — spatial-robust inference, naive vs spatial side by side | §8 |
| R-C2 — grounding citations | §1, §4, §6, §8, Sources |

> Note on "C1-C8": ADR-0010's geo-signoff carried **8 non-blocking conditions** into this document
> (`docs/methodology/ADR-0010-geo-signoff.md`, "Verdict: PASS WITH CONDITIONS"); they map onto the open
> questions and Required items above (Q1→§1/§4, Q2→§7, Q3→§6, Required 1–4→§9, C5-composition→§5,
> CRS→§3, spatial-robust inference→§8). This table is the single discharge record.

---

## Sources

- ADR-0010 (`docs/adr/0010-spatial-distance-weighting.md`); ADR-0008 §4–§5; ADR-0005 (city-agnostic
  core); `docs/methodology/index-definition.md` §0.3, §2.3, §2.4, §7; `docs/epic-c/C5-geo-signoff.md`.
- Thesis (Helweg 2018) p. 91 (best H1 AUC 0.87 on distance-weighted data), Abb. 5-14;
  `reference/system/45_osm_poi_features_domain_piv_distcalc.sql:54-57` (un-normalized centroid spread).
- Fotheringham, Brunsdon & Charlton (2002), *Geographically Weighted Regression: The Analysis of
  Spatially Varying Relationships*, Wiley — Gaussian kernel & bandwidth as analytical scale.
- Silverman (1986), *Density Estimation for Statistics and Data Analysis* — kernel choice.
- Getis & Ord (1992), *Geographical Analysis* 24(3); Ord & Getis (1995), *Geographical Analysis* 27(4)
  — Gi* hotspot statistic.
- Anselin (1988), *Spatial Econometrics: Methods and Models*; Anselin (1995), LISA, *Geographical
  Analysis* 27(2) — spatial-lag/error models, Moran's I.
- Döring & Ulbricht (2016), *Gentrification-Hotspots und Verdrängungsprozesse in Berlin* — Gi*
  motivation.
- OECD/JRC (2008), *Handbook on Constructing Composite Indicators* — common polarity before
  aggregation (carried via `index-definition.md`).
- Openshaw (1984), *The Modifiable Areal Unit Problem*, CATMOG 38 — MAUP framing for §7.
- PySAL `libpysal` / `esda` / `spreg` (BSD-3); Uber `h3` (Apache-2.0). <https://pysal.org/>
- Moran (1950), *Notes on Continuous Stochastic Phenomena*, Biometrika 37(1) — Moran's I.
- Dangschat (1988), *Gentrification — die Aufwertung innenstadtnaher Wohnviertel* — invasion-succession / diffusion hypothesis.

---

## A9 Section: Spatial-Dynamic Gentrification Analysis (#79)

**Implemented in:** `analysis/a9_spatial_dynamic.py`
**Issue:** #79 [R-A9]
**R-C2 grounding:** Anselin (1988) (spatial-lag/error models, LM diagnostics); Moran (1950) (global
autocorrelation); Anselin (1995) (LISA); Dangschat (1988) (invasion-succession / diffusion). See
script header for full citations.

### A9.1 Global Moran's I

Global spatial autocorrelation in `status_index` (D1 MSS ordinal, inverse-numeric: higher =
more deprived) and `dynamism_score` (D3 C5-corrected share-change z-score) is computed per MSS
edition year (lor_2021 vintage: 2021, 2023, 2025) using `esda.Moran`.

```
esda.Moran(y, w, permutations=999, seed=42)
```

- `w`: Queen contiguity weights (§6, EPSG:25833, row-standardized; same matrix as §6).
- `permutations=999, seed=42`: reproducible permutation inference (R-C3; ADR-0010 Required 4).
- Output: Moran's I statistic, expected value E[I], z-score (normality approximation),
  permutation p-value. Significant at α=0.05 → `significant=True`.
- Output CSV: `data/analysis/a9_moran.csv` (columns: snapshot_year, variable, I, EI, z_norm,
  p_norm, p_sim, significant, n_valid).
- Interpretation: positive significant I → PLRs with similar deprivation/dynamism levels cluster
  spatially (Moran 1950). Confirms that PLR observations are **not independent** (Tobler's first
  law) and that naive OLS inflates significance (§8 above).

### A9.2 Local Moran's I (LISA)

Local indicators of spatial association (Anselin 1995) identify cluster and outlier PLRs per year.

```
esda.Moran_Local(y, w, permutations=999, seed=42)
```

- LISA quadrant labels (standard PySAL convention; significant at α=0.05 only):
  - **HH** (High-High cluster): deprived PLR surrounded by deprived neighbours
    → spatial concentration of disadvantage / persistent-deprivation Kiez
  - **LL** (Low-Low cluster): affluent PLR surrounded by affluent neighbours
    → stable-established / coldspot cluster (§6 analogue for status)
  - **HL** (High-Low outlier): deprived PLR within affluent surroundings
    → possible pioneer frontier under pressure (Dangschat 1988)
  - **LH** (Low-High outlier): affluent PLR within deprived surroundings
    → possible pocket of early gentrification
  - **ns**: not significant at α=0.05.
- Output CSV: `data/analysis/a9_lisa_{variable}_{year}.csv` per variable per year.
  Columns: area_code, snapshot_year, variable, value, local_I, lisa_pvalue, lisa_label.
- Public-labelling convention (G-2 guardrail; same as §6): internal LISA labels (`HH`, `LL` etc.)
  are internal analysis artefacts. Public-facing labels must use hedged qualifiers: "spatial
  concentration of social disadvantage" (HH) or "spatial clustering of social improvement" (LL).
  The §1.2 G-2 ecological-inference disclaimer applies: cluster labels are PLR-level aggregates,
  not individual displacement statements.

### A9.3 Spatial Regression: OLS vs Spatial-Lag / Spatial-Error

Implements the three-step protocol of §8 (`spatial-methods.md §8`):

**Regression specification (H1-type; thesis p.55, operationalized in `e1_regressions.py`):**

```
y  = status_index[t]    (D1 MSS ordinal, used as numeric proxy; same licence as e1_regressions.py
                          Spearman rank correlation: ordinal-transition treatment,
                          index-definition.md §3.2. OLS betas interpreted directionally only.)
X  = [total_poi_count,  (H1 predictor: POI density, thesis p.55)
      ewr_composite]    (D4 socio-economic baseline covariate)
```

Step 1 — `spreg.OLS(y, X, w=w, spat_diag=True)`: Naive OLS with Lagrange-multiplier diagnostics.
Moran's I on residuals (`ols.moran_res`) and LM-lag / LM-error tests extracted.

Step 2 — If either LM-lag or LM-error is significant at α=0.05:
Upgrade using the **Anselin–Florax LM decision rule** (Anselin 1988):
  - LM-lag p < LM-error p → `spreg.ML_Lag` (spatial-autoregressive: `y = ρ·W·y + Xβ + ε`; ρ
    is the spatial-lag parameter, testing the degree of spatial dependence in outcomes).
  - LM-error p < LM-lag p → `spreg.ML_Error` (spatial-error: `y = Xβ + u; u = λ·W·u + ε`;
    λ is the spatial-error parameter, capturing error correlation from omitted spatial processes).

Step 3 — Report naive OLS and spatial model side by side (required by §8; never publish
significance claims from naive OLS alone when spatial autocorrelation is detected).

Output CSV: `data/analysis/a9_regression.csv`.
Columns: snapshot_year, model_type (OLS / ML_Lag / ML_Error), n, beta_poi_count, p_poi_count,
beta_ewr, p_ewr, beta_intercept, r2, moran_resid_I, moran_resid_p, moran_resid_significant,
lm_lag_stat, lm_lag_p, lm_error_stat, lm_error_p, spatial_model_needed, rho, lambda_.

**Comparison metric for reviewers:** `moran_resid_significant` signals whether spatial
autocorrelation is present in OLS residuals, justifying the spatial upgrade. `rho` / `lambda_`
report the spatial dependence parameter from the upgraded model.

### A9.4 Diffusion Feature: W·status[t−1] (Dangschat 1988 Contagion)

**Theory:** Dangschat (1988) invasion-succession model predicts that gentrification *diffuses*
from pioneering Kieze into adjacent areas — a neighbour's high deprivation at t−1 (on the
frontier of the gentrification wave) raises the focal PLR's odds of status worsening at t.

**Operationalization:**

```
Diffusion feature = W * status_index[t-1]   (spatial lag of prior-edition D1 status)
Regression: status_index[t] ~ β₁·(W*status[t-1]) + β₂·status[t-1] + β₃·ewr_composite
```

- Tested per lor_2021 consecutive edition pair: (2021→2023), (2023→2025).
- `W` = Queen contiguity weight matrix (§6, row-standardized). The spatial lag `W*status[t-1]`
  computes each PLR's weighted mean of neighbours' prior status.
- D1 POLARITY (index-definition.md §5): status_index is **inverse-numeric** (higher = more
  deprived). A **positive** `β₁` means: more deprived neighbours at t−1 → focal PLR status
  worsens at t → **consistent with Dangschat (1988) displacement-pressure diffusion from deprived
  frontier Kieze**. A negative β₁ would contradict the contagion hypothesis.
- Output CSV: `data/analysis/a9_diffusion.csv`.
  Columns: edition_prev, edition_curr, n, beta_W_status_prev, p_W_status_prev,
  diffusion_significant, beta_status_prev, p_status_prev, beta_ewr, p_ewr,
  beta_intercept, r2, moran_resid_I, moran_resid_p.

**Interpretation guard:** OLS is used here because the diffusion feature (`W*status[t-1]`) is
a regressor constructed from the prior edition, not the current-period spatial lag. This avoids
the simultaneity/endogeneity that requires ML_Lag for a spatial-lag model of the current period
(Anselin 1988). Residual Moran's I is still reported; reviewers should flag if significant
autocorrelation remains in diffusion residuals.

### A9.5 Implementation Constraints

All A9 code observes the same constraints as §9 (A6):

1. No geopandas; Queen weights from shapely geometries via WKB in EPSG:25833 (ADR-0010 Required 1).
2. `pandas>=2.2,<3.0` (ADR-0010 Required 2).
3. Geometry handoff = `ST_AsWKB` output in EPSG:25833, parsed with `shapely.from_wkb`, no pyproj
   (ADR-0010 Required 3).
4. Explicit `seed=42` on every `esda.Moran` and `esda.Moran_Local` call (R-C3; ADR-0010 Required 4).
5. Script lives in `analysis/a9_spatial_dynamic.py` only, never in the dbt build path.
6. Data-presence guard: exits cleanly (status 0) if DuckDB or required tables are absent.

---

## Geo-DS sign-off

- **Reviewer:** geo-data-scientist (spatial-methods authority)
- **Artifact:** `docs/methodology/spatial-methods.md`
- **Date:** 2026-06-29
- **Scope:** discharges ADR-0010's deferred spatial methodology (bandwidth, kernel, contiguity, Gi*,
  MAUP, spatial inference) under the R-C1 gate, unblocking #69 [A6] DE implementation.

### Verdict: PASS

The spatial methodology is sound and fully cited. The mass-conserving Gaussian default (b=500 m,
EPSG:25833) is a genuine, honest improvement over the thesis's un-normalized centroid spread; the
C5-before-weighting composition rule (§5) closes the single most dangerous interaction (reintroducing
coverage-growth bias through spatial smearing); Gi*, MAUP and spatial-inference choices are standard,
well-grounded, and reproducibly seeded (R-C3). No fatal spatial flaw. DE may implement #69 against this
document. The bandwidth, kernel-shape, and scale choices are defaults with a mandated sensitivity sweep
(§4, §7), not hard assumptions.

### Conditions on implementation (non-blocking)

1. The 500 m bandwidth is a Berlin default; record it as a per-city parameter (`dim_city` / index
   params), not a constant in shared models (ADR-0005).
2. The §7 MAUP r>0.7 threshold is a publish gate: if PLR-vs-BZR falls below 0.7, escalate before G2
   renders the index as PLR-stable.
3. The §6 representative-point choice (boundary vs centroid distance) for the POI→PLR kernel should be
   stated explicitly in the implementing SQL comment (R-C2) and held constant across the sweep.

### Domain-expert sign-off

- **Reviewer:** gentrification-domain-expert
- **Verdict:** PENDING (`docs/methodology/spatial-methods-domain-signoff.md`)

*DE implementation of #69 must NOT begin until BOTH verdicts are PASS (R-C1).*
