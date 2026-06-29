# Geo-Data-Scientist Sign-off: R-A2 (#65) E1/E2 thesis validation rewrite

**Issue:** #65
**Branch:** feat/65-e1e2-rerun
**Reviewer:** geo-data-scientist
**Date:** 2026-06-29

## Verdict: FAIL

## Summary

The rewrite is a large structural improvement: it tests real thesis hypotheses (H1-H3c)
with POI counts as predictors, uses Spearman for ordinal/non-Gaussian data, switches to
GroupKFold for the panel, keeps an explicit leakage guard, and flags the H3b class
imbalance honestly. However, it contains a **blocking correctness-of-meaning defect**: the
analysis ignores the documented polarity of the MSS `status_index` (HIGHER = MORE
deprived / LOWER social status). As a result the expected-direction labels are inverted
for every test that touches the continuous `status_index` / `delta_status_ordinal`, and
the findings docs report the headline "directional agreement" counts backwards — several
results that *confirm* the thesis are labelled FAIL, and the public-facing narrative is
wrong. This must be corrected before integration.

## Findings

### F1 (BLOCKING, high) — `status_index` polarity is inverted; H1/H1b/H2 direction labels are wrong

`reference/system/50_lor_mss_idx_bzr_idx.sql` (lines 13-18) and the same-branch
`int_mss_lead_lag.sql` (D1 POLARITY NOTE, lines 19-23) both state the binding fact:

> `status_index` is a z-score where **HIGHER = MORE deprived** (`< -1` → "hoch"/high
> status; `> 1.5` → "sehr niedrig"/very low status). `delta_status_ordinal > 0` →
> status_index INCREASED → **STATUS WORSENED**.

The 2018 golden CSV (`reference/goldens/20180909_result_full_plr_distcalc.csv`) confirms
the z-score scale.

`analysis/e1_regressions.py` sets `THESIS_HYPOTHESES["H1"]["expected_dir"] = "positive"`
("POI supply positively correlates with current MSS social *status*"). But the variable
regressed is `status_index`, which runs *opposite* to social status. The thesis claim
"more POI → higher status" therefore predicts a **negative** rho against `status_index`.
The observed results bear this out and are mislabelled:

- **H1** rho = -0.0463 flagged FAIL — the negative sign is the *thesis-consistent*
  direction (more POI weakly associates with higher status). Correct verdict: directionally
  consistent (though weak/n.s., unlike the thesis' strong effect).
- **H1b** (fast-food) rho = +0.136 flagged FAIL — positive rho against `status_index`
  means fast food concentrates in *lower-status* areas, which is exactly thesis H1b
  (fast food = displacement/low-status indicator) **CONFIRMED**. Reported as FAIL.
- **H2** rho = -0.115 / -0.192 flagged FAIL — negative rho against `delta_status_ordinal`
  (where +delta = status worsened) means more POI → status *improved*, the
  thesis-consistent direction. Reported as FAIL.

The fix is not cosmetic: either (a) flip a POI predictor to act on social status by negating
`status_index`/`delta_status_ordinal`, or (b) flip the `expected_dir` for every
status_index-bearing test and re-derive the "X/Y directional agreement" tallies and the
per-hypothesis prose in both findings docs. Whichever is chosen, add an inline citation to
the polarity note (R-C2). Right now the same branch contains two files that disagree about
which way `status_index` points.

### F2 (BLOCKING, high) — E1 H3b vs E2 H3b measure different things; E1 H3b also misframed

E1 H3b correlates `delta_status_ordinal` with `delta_poi` and expects positive. Given the
polarity, "status change leads POI change, positively" (improving status → growing POI)
predicts a **negative** rho here (improving status = negative delta_status_ordinal; growing
POI = positive delta_poi). So the expected_dir is again inverted. Separately, E1 H3b uses
the contemporaneous `delta_status` over the same [t, t+k] window as `delta_poi` — this is a
*co-movement* test, not a *lead* test. A genuine "status leads POI" test needs
status change measured over an *earlier* window than the POI change it predicts. As written,
E1 H3a and E1 H3b are near-mirror contemporaneous correlations, not a true lead-lag contrast.
The lead-lag panel does expose `delta_dynamism_t_vs_prev` (status/dynamism change vs the
*prior* edition) which is the correct lagged predictor — E2 H3b uses status-at-t style
features but E1 does not align its windows.

### F3 (medium) — per-hypothesis thesis AUCs (0.87/0.77/0.72/0.81/0.71) are uncited to a page/table

`THESIS_AUC` and the H2/H3 docstrings attribute five distinct AUCs to "thesis p.91". I could
not locate a per-hypothesis AUC table at that page in the reference corpus to verify each
value (only the 0.87 cross-section figure is independently corroborated elsewhere in prior
sign-offs). R-C2 requires a checkable citation (page + table/figure). If these are the
reviewer's reconstruction rather than verbatim thesis numbers, say so explicitly; do not
present reconstructed targets as ground truth.

### F4 (medium) — H3a "PASS" is a false positive produced by the same polarity confusion

E1 H3a is reported PASS at k=1 (rho +0.026, n.s.) because actual_dir "positive" matched
expected "positive". But H3a tests `dynamism_score_t` vs `delta_status_ordinal`, and the
"thesis rejected, expect non-significant" logic is what actually carries the verdict — the
direction-match PASS is incidental and, given the polarity issue, not interpretable as
written. Once F1 is fixed, re-examine whether the H3a/H3c "PASS" labels still mean anything
or should be reported purely on the significance criterion the thesis used.

### F5 (low, non-blocking) — multiple-comparison and cross-vintage caveats

Carried forward from the prior sign-off and adequately disclosed here: ~16 tests on
overlapping derived indices with no multiple-comparison correction (state significance is
descriptive); H1/H1b use the lor_pre2021 vintage while H2/H3 use lor_2021 (cross-vintage
comparability untested). Acceptable to disclose rather than fix, but keep in G2.

## Cleared prior concerns

The prior `E1-E2-geo-signoff.md` (verdict "concerns", #30/#31) raised five conditions:

1. **"Frame negatives as a lead-lag hypothesis, not a confirmed effect; lead-lag is untested
   (pending R-A2)."** — PARTIALLY ADDRESSED. R-A2 now *attempts* the lead-lag test via
   `int_mss_lead_lag` (k=1,2), which is the right structural move. But F2 shows the E1 lead
   windows are contemporaneous, not truly lagged, and F1 corrupts the direction reading — so
   the lead-lag claim is not yet validly tested. Re-open until F1/F2 fixed.
2. **"State significance is descriptive (no MCC, single cross-section)."** — NOT YET in the
   new findings docs. Add to both E1/E2 docs and G2 (see F5).
3. **"Carry forward PLR-only vs BZR+Bezirk and reduced-feature-set caveats."** — Reduced
   feature set is disclosed; the PLR-only vs BZR+Bezirk aggregation/MAUP caveat is not
   restated. Add it.
4. **"Keep the clean-vs-leaky split prominent; never show leaky AUC without the label."** —
   ADDRESSED and improved. The new E2 drops the trivially-leaked dynamism-class target,
   uses POI features as genuine predictors, keeps the R-C3 guard, and adds an honest H3b
   class-imbalance warning (F1w disregarded, AUC only). This is good practice.
5. **"Re-run/re-validate under R-A2 before any claim stronger than 'directionally
   consistent' is published."** — This sign-off IS that gate, and it returns FAIL: the
   re-run is not yet publishable because the directional verdicts are inverted.

Spatial autocorrelation (R-A9 #79) remains correctly out of scope and explicitly deferred,
not silently ignored — acceptable.

## Required actions to reach PASS

1. Fix the `status_index` / `delta_status_ordinal` polarity across E1 (and re-check E2
   feature directions); cite the polarity note inline (R-C2). (F1)
2. Re-derive the "directional agreement X/Y" tallies and all per-hypothesis prose in both
   findings docs from the corrected directions. (F1)
3. Either make E1 H3a/H3b genuinely lagged (status change over an earlier window than the
   POI change) or relabel them as co-movement tests and stop calling them "leads". (F2)
4. Cite the five per-hypothesis AUCs to a specific thesis page/table, or mark them as
   reconstructed targets. (F3)
5. Add the descriptive-significance and PLR-only/MAUP caveats to the findings docs. (F5,
   prior conditions 2-3)
