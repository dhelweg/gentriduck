[A2] Fix & re-run the E1/E2 thesis validation against the real hypotheses (lead-lag, POI→MSS)

## Why (problem)
The committed E1/E2 artifacts conclude the thesis "did not replicate" (1/4 hypotheses match). That conclusion
is an artifact of how the test was written, not a finding:

- `analysis/e1_regressions.py:53-58` hardcodes `THESIS_DIRECTION = {all "positive"}` — expectations invented,
  not derived from the thesis.
- Docstring/implementation mismatch: the docstring (`e1_regressions.py:10-13`) says the thesis tested
  "dynamism → rent levels" / "dynamism ~ foreigners share"; the code instead correlates `dynamism_index` with
  `own_idx` and `status_index`.
- **No POI features are used at all.** `status_index`/`dynamism_index` in the golden are the **MSS social**
  indices (`transform/models/staging/stg_thesis_2018_result_plr.sql:25,39`). E1 therefore correlates three
  *social* indices and uses zero OSM/POI variables — it cannot validate a POI thesis.
- The "failure" is expected by design: MSS Status and Dynamik are orthogonal axes (4×3 = 12-cell typology),
  and a negative dynamism↔current-status correlation is consistent with the rent-gap/frontier idea and the
  thesis's own lead-lag finding.
- E2 pegs "thesis AUC ~0.72" as approximate (`docs/epic-e/E2-classification-findings.md:17`); the thesis
  reports per-hypothesis AUCs (H1 0.87, H2 0.77, H3a 0.72, H3b 0.81, H3c 0.71 — p.91).

Risk: these artifacts feed the public methodology page (G2/#38) and would publish the opposite of a correct test.

## Goal
A validation that reproduces the thesis's actual hypotheses and reports them honestly.

## Scope & approach
1. Extract the real hypotheses from the thesis (pp. 55-56, results p.91) and encode them, with citations:
   - **H1** POI supply (OSM `*_stock`/OA) ↔ *current* MSS social status (proven, AUC 0.87; H1b fast-food
     negative).
   - **H2** *current* POIs → *future* social-status change.
   - **H3a** POI change *leads* status change (rejected); **H3b** status change *leads* POI change (confirmed);
     **H3c** simultaneous (unclear).
2. Use **POI features** as predictors and the **MSS social** status/dynamik as outcomes (this requires A3; if
   A3 not yet landed, validate against the golden `status_index`/`dynamism_index` but label it clearly).
3. Test temporal ordering on the live time series (lagged correlations / Granger-style or panel lead-lag).
4. Handle **spatial autocorrelation** (the original OLS/Weka ignored it) via **R-A9 (#79)**: report Moran's I
   and use spatial-lag/-error models (`spreg`); document how conclusions change vs. naïve OLS.
5. Rewrite `docs/epic-e/E1-regression-findings.md` and `E2-classification-findings.md` with the corrected
   framing and a clear "what replicates / what diverges" section per the Epic-B directional remit.
6. **Modeling rigor** for any ML: regularization, **nested cross-validation**, a reduced feature set (not the
   thesis's 1,722 columns), and explicit **leakage guards** as tested assertions (per R-C3 #75).

## Acceptance criteria
- `THESIS_DIRECTION` (or its replacement) is derived from cited thesis text, not assumed.
- Docstring matches implementation; the tested relationships use POI features as predictors.
- Lead-lag is tested and reported; spatial autocorrelation handled via R-A9 (#79) (Moran's I + spatial regression).
- ML re-run uses regularization + nested CV + a reduced feature set + tested leakage guards (no overfitting/leakage).
- Findings docs no longer claim a blanket "thesis failed"; they state the lead-lag result.
- `uv run poe build` green; if A6/C3 landed, the analysis runs under the gate.

## Gate / sign-off
geo-DS `pass` AND domain-expert `pass` (see C1, C2). This is the highest-priority correctness fix.

## Dependencies / relations
Relates to #30, #31 (original E1/E2), #38 (G2). Best after A1; benefits from A3, A6, C2/C3.

## References
- `analysis/e1_regressions.py`, `analysis/e2_classification.py`
- `docs/assessment/2026-06-19-pm-architect-review.md` §2.4
- Thesis pp. 55-56, 91, 97
