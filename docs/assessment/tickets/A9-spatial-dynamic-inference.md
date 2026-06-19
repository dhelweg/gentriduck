[A9] Spatial-dynamic gentrification (diffusion) + spatial-econometric inference

## Why (problem)
Two findings in one. (1) **Rigor:** the 2018 thesis (and the current E1) use OLS/Weka and plain
Pearson/Spearman on areal units, ignoring **spatial autocorrelation** — neighbouring PLRs are not
independent, so reported significance is likely inflated. (2) **Concept:** gentrification **diffuses** from
adjacent areas (the "frontier"/contagion) — a neighbour gentrifying at *t* raises the focal area's odds at
*t+1*. A spatial model fixes the inference flaw *and* adds the diffusion mechanism the flat model misses.

## Goal
Spatial structure as a first-class property of the model and of every inferential claim: spatial weights,
autocorrelation diagnostics, spatial regression, and a diffusion feature for the trajectory/early-warning.

## Scope & approach
1. Build spatial weights (`libpysal` — contiguity + distance/kernel) on PLR geometries (EPSG:25833). Libs via
   the R-A6 (#69) ADR (PySAL: `libpysal`/`esda`/`spreg`).
2. **Diagnostics:** global **Moran's I** and **LISA** on the index and components per year (are gentrifying
   areas clustered? where?).
3. **Inference:** redo the R-A2 (#65) relationships with **spatial-lag / spatial-error models** (`spreg`) or
   spatially-robust SEs; report how conclusions change vs. naïve OLS.
4. **Diffusion feature:** add the spatial lag of gentrification at *t−1* (neighbour state) as a predictor in
   the trajectory/early-warning model (R-A8), testing the frontier hypothesis.
5. Document in `docs/methodology/spatial-methods.md` (alongside R-A6).

## Acceptance criteria
- Moran's I + LISA computed and reported per year; spatial clustering characterized.
- Inferential claims (R-A2) use spatially-robust models; naïve-vs-spatial comparison documented (closes the
  spatial-autocorrelation finding).
- A neighbour-diffusion feature is available to R-A8; its effect is reported.
- `uv run poe build` green (analysis under the gate per R-C3 #75); methodology doc written.

## Gate / sign-off
geo-DS `pass` (spatial-stats authority) + domain-expert `pass` (diffusion interpretation). Cite methods (R-C2).

## Dependencies / relations
Depends on R-A6 (#69) (libs/weights), R-A2 (#65) (relationships to re-test), R-A8 (#78) (diffusion feature).
Closes the "spatial autocorrelation ignored" finding from the thesis review.

## References
- `docs/assessment/2026-06-19-pm-architect-review.md` §2.6 + thesis-grading "spatial autocorrelation" finding
- PySAL: `libpysal` (weights), `esda` (Moran's I/LISA), `spreg` (spatial regression)
