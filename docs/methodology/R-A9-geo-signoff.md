# Geo-Data-Scientist Sign-off: A9 Spatial-Dynamic Gentrification (#79)

**Reviewer:** geo-data-scientist
**Artifact:** analysis/a9_spatial_dynamic.py + docs/methodology/spatial-methods.md (A9 section)
**Issue:** #79 [A9] Spatial-dynamic gentrification (diffusion) + spatial-econometric inference
**Date:** 2026-06-30

---

## Verdict

Verdict: PASS

---

## Scope of review

`analysis/a9_spatial_dynamic.py` (1117 lines) and the corresponding A9 methodology section added
to `docs/methodology/spatial-methods.md` (§A9.1–A9.5). Assessed against:

- Issue #79 acceptance criteria (Moran's I, LISA, spatial regression, diffusion feature)
- `spatial-methods.md §8` (spatial-robust inference constraints fixed for this project)
- ADR-0010 Required 1–4 (no geopandas, pandas<3.0, WKB/EPSG:25833, seed=42)
- R-C2 grounding rule (every methodology choice must cite the thesis / peer-reviewed source)
- R-C3 determinism requirement (reproducible output; no permutation without explicit seed)

---

## Findings

### 1. PASS — Global Moran's I is correctly implemented (Moran 1950)

`run_moran()` calls `esda.Moran(y, w, permutations=999)` with an explicit `numpy.random.seed(42)`
immediately before the call — the correct workaround for esda versions that do not accept a
per-call seed kwarg, achieves the R-C3 determinism requirement. Zero-fill of NaN (uninhabited
PLRs) with a logged guard (`n_valid < 10` → skip) is the appropriate convention, consistent with
`a6_hotspots.py`. Output CSV columns are complete: I, EI, z_norm, p_norm, p_sim, significant,
n_valid per variable per year. **Acceptance criterion 1 is met.**

### 2. PASS — LISA is correctly implemented with G-2 public-labelling constraint (Anselin 1995)

`run_lisa()` uses `esda.Moran_Local(y, w, permutations=999, seed=42)` — here `seed` is a direct
kwarg (newer esda API), so reproducibility is guaranteed via the standard path. The quadrant
mapping (PySAL q=1→HH, q=2→LH, q=3→LL, q=4→HL) matches the standard convention. The α=0.05
significance filter (only significant PLRs get a label; others → 'ns') is standard practice.

The methodology doc (§A9.2) carries the G-2 ecological-inference disclaimer and specifies that
public-facing labels must use hedged qualifiers ("spatial concentration of social disadvantage",
"spatial clustering of social improvement") — this discharges the domain-expert condition from
`spatial-methods-domain-signoff.md` condition 3 at the A9 output level. **Acceptance criterion 1 met.**

### 3. PASS — Spatial regression follows spatial-methods.md §8 three-step protocol

The OLS → LM-diagnostics → ML_Lag / ML_Error upgrade path is correctly implemented:
- `spreg.OLS(..., w=w_valid, spat_diag=True)` enables LM-lag and LM-error diagnostics.
- Anselin–Florax LM decision rule (prefer the model with the lower LM p-value; ML_Lag when
  lag p ≤ error p) is applied correctly.
- Naive OLS and the spatial upgrade are reported side-by-side in `a9_regression.csv` — the
  spatial-methods.md §8 required comparison.
- Moran's I on OLS residuals (`ols.moran_res`) is extracted and reported, so reviewers can
  verify whether spatial autocorrelation was detected before the upgrade decision.

One technical note, not a finding: the regression uses `dynamism_score` as the second predictor
rather than `ewr_composite` because `ewr_composite` is NULL for all `lor_2021` rows in the current
`fct_gentrification_change` (EWR data joins lor_pre2021 editions only). The script documents this
limitation inline (`run_ols_and_spatial` docstring). This is an honest downstream limitation of
the current EWR data model, not a methodology error; the predictor set (total_poi_count,
dynamism_score) is informative and documented. **Acceptance criterion 2 met.**

### 4. PASS — Diffusion feature correctly operationalizes Dangschat (1988) contagion hypothesis

`run_diffusion_test()` constructs `W * status_index[t-1]` (spatial lag of prior-edition status)
as a predictor in an OLS of current-edition status, per consecutive lor_2021 edition pairs
(2021→2023, 2023→2025). This is the canonical operationalization of invasion-succession
contagion: a deprived neighbour at t−1 should raise the focal PLR's deprivation at t (positive
beta_W_status_prev) if the Dangschat hypothesis holds.

The interpretation guard in the methodology doc (§A9.4) is correct: using OLS here (not ML_Lag)
because `W*status[t-1]` is a predetermined regressor (prior edition), not a simultaneous spatial
lag — this avoids the simultaneity/endogeneity that motivates ML_Lag for current-period spatial
lags (Anselin 1988 §4). Residual Moran's I is still reported for reviewer verification.
D1 polarity note (status_index = inverse-numeric, higher = more deprived) is explicitly flagged
in both the script and the methodology doc. **Acceptance criterion 3 met.**

### 5. PASS — ADR-0010 Required constraints satisfied

- No geopandas: Queen weights built from shapely geometries parsed from DuckDB WKB (ADR-0010 R1).
- `pandas>=2.2,<3.0` constraint inherited from pyproject.toml (ADR-0010 R2).
- WKB handoff in EPSG:25833 (`ST_AsWKB`), parsed with `shapely.from_wkb`, no pyproj (ADR-0010 R3).
- `seed=42` explicit on every permutation call; where esda does not accept a direct kwarg,
  `numpy.random.seed(42)` is set immediately before the call (ADR-0010 R4 intent discharged).
- Island fallback: k-NN (k=6) for zero-neighbour PLRs (water bodies, airport) — same pattern
  as `a6_hotspots.py`, already approved.

### 6. PASS — R-C2 grounding citations are present and load-bearing

Script header cites: Moran (1950), Anselin (1988), Anselin (1995), Dangschat (1988),
spatial-methods.md §8. All inline decisions cite the relevant source:
- `run_moran()` → Moran (1950)
- `run_lisa()` → Anselin (1995)
- `run_ols_and_spatial()` → Anselin (1988); Anselin–Florax LM decision rule named explicitly
- `run_diffusion_test()` → Dangschat (1988); Anselin (1988) for OLS-vs-ML_Lag choice
The methodology doc (§A9.1–A9.4) carries corresponding R-C2 citations in every subsection.
No uncited methodology choice detected. **R-C2 fully discharged.**

### 7. PASS — Data-presence guard and determinism (R-C3)

`_check_table()` exits cleanly (status 0) if `stg_berlin_lor` or `fct_gentrification_change`
is absent. All output is written to `data/analysis/` (gitignored, rebuilt from source).
The `poe analysis` task sequence includes `a9_spatial_dynamic.py` (pyproject.toml line 67).
`uv run poe build` passes green (PASS=426, WARN=2 pre-existing, ERROR=0) with A9 on the branch.

---

## Conditions

None. All acceptance criteria are met; no blocking or non-blocking conditions remain.

---

## Carry-forward notes (non-binding; for G2 / follow-on work)

1. **ewr_composite for lor_2021:** When the EWR join is extended to cover lor_2021 editions
   (future EWR ingestion work), the regression specification should be updated to include
   `ewr_composite` as a covariate alongside `total_poi_count`, to match the thesis H1-type
   specification more closely. The current predictor set is adequate for detecting spatial
   autocorrelation patterns; it is not a methodology defect.

2. **Robust LM statistics:** If a future iteration adds `GM_Lag`/`GM_Error` (GMM/2SLS) for
   robustness, the LM decision rule should be re-run on robust LM statistics (LMR-lag, LMR-error)
   per Anselin & Florax (1995) Table 1. Not required for A9 — ML MLE estimators are standard and
   appropriate here.

3. **LISA FDR correction:** At 450+ PLRs with 999 permutations, multiple testing at α=0.05 will
   produce ~22 false positives by chance. A future enhancement could apply Benjamini–Hochberg FDR
   correction on LISA p-values; current approach is the standard LISA convention and is documented.
   Not blocking for A9; note for G2 methodology page disclosure.
