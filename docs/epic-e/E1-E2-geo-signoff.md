# E1/E2 Geo-Data-Scientist Sign-Off

- **Task:** Methodology validation of E1 regression (#30) and E2 classification (#31) findings
- **Issues:** #30 (E1), #31 (E2)
- **Inputs reviewed:** `docs/epic-e/E1-regression-findings.md`, `docs/epic-e/E2-classification-findings.md`,
  `stg_thesis_2018_result_plr` (n=436), ADR-0004 (index definition)
- **Date:** 2026-06-19
- **Verdict: PASS WITH CONDITIONS**

---

## Scope of this sign-off

This validates the **methods** used in E1/E2 and the **interpretation** of the directional
divergence as a real finding rather than a bug. It does **not** sign off the lead-lag
hypothesis (POI at t-N → social status at t), which is out of scope here and tracked as
R-A2 (#65), gated behind R-A1 (#64). See "Known limitation" below.

---

## 1. Are the statistical methods sound?

**Yes.** The estimators are appropriate for the questions as posed on the 2018 golden cross-section.

### E1 — Spearman + OLS

- `scipy.stats.spearmanr` is the correct choice for monotonic association between two index
  variables that are bounded, skewed, and not bivariate-normal (status_index, dynamism_index,
  own_idx are all rank-style composites). Rank correlation is robust to the non-linear,
  non-Gaussian shape of these indices and is the right primary criterion under the Epic B
  directional-revival framing.
- `scipy.stats.linregress` (OLS) for H3 is acceptable as a secondary, scale-bearing estimate.
  The reported R² = 0.052 is honest and small; the team does not over-claim explained variance.
- n = 436 is the full PLR cross-section. The p-values (p < 0.0001 on three of four tests) are
  credible at this sample size; with n=436 even small effects (|rho| ≈ 0.2) are significant, so
  the team correctly leads with **effect direction and magnitude**, not just significance.

**Caveat (non-blocking):** the four hypotheses are tested on overlapping, derived indices from a
single cross-section. The reported p-values are not corrected for multiple comparisons. At
|rho| ≥ 0.19 with p < 0.0001 this does not change any conclusion, but the methodology page (G2)
should state that significance is descriptive, not confirmatory.

### E2 — 5-fold stratified CV

- 5-fold stratified cross-validation with LogisticRegression and RandomForest, reporting AUC and
  F-weighted, is methodologically sound and directly comparable to the thesis's Weka J48/RF
  reference (AUC ≈ 0.72, F-weighted ≈ 0.68).
- **The leakage discipline is the strongest part of E2 and I explicitly endorse it.** Splitting
  into Task A (clean: predict the POI-independent `own_idx_class_bi`) and Task B (legacy: predict
  `dynamism_class_bi`, which is a threshold on `dynamism_index` and therefore trivially leaked) is
  exactly the right way to expose that the near-perfect Task B AUC (0.998–1.000) is an artifact of
  target-from-feature derivation. Reporting Task B only "for transparency" and labelling it
  uninformative is correct practice. The note that the 2018 thesis "may not have separated index
  derivation from classification features, inflating the reported AUC" is a fair and important
  methodological observation about the original work.
- Task A AUC = 0.599 (LogReg) is honestly below the 0.72 thesis reference. The team attributes
  this to a different target and a reduced feature set (two aggregated indices vs. per-category
  POI counts in the thesis), which is the correct reading — this is a feature-availability gap,
  not a modelling error.

---

## 2. Interpretation of the 3/4 directional divergence — this is a finding, not a bug

I concur with the core interpretation. The negative associations are **methodologically
coherent and substantively meaningful**, not a defect:

- H1: dynamism → economic status, rho = -0.19 (p<0.0001)
- H2: dynamism ↔ status_index, rho = -0.33 (p<0.0001)
- H3: OLS dynamism → status_index, beta = -0.23, R² = 0.052 (p<0.0001)

**Reading:** high POI *dynamism* (rapid relative change in the commercial fabric) is associated
with *lower current* socio-economic status. This is the textbook signature of a neighbourhood in
an **early / pre-gentrification stage**: new businesses (cafés, bars, creative/nightlife uses)
open disproportionately in still-lower-status areas *before* measured socio-economic status
catches up. Gentrification is a **process with a lead-lag structure**, not a steady-state
positive correlation. A cross-sectional, contemporaneous correlation of change-rate against
current-level is therefore *expected* to be negative or weak — the upside is realised later, in
the level, not concurrently in the same year.

This is consistent with how the 2018 thesis itself framed gentrification as a staged process. It
also matches the Reuterkiez evidence in the live pipeline (see C6 sign-off): a high-status,
episodically-dynamic neighbourhood whose dynamism bursts (2012–13, 2019–20) precede, rather than
coincide with, status levels.

**Crucially, the contemporaneous cross-section cannot confirm the lead-lag mechanism — it can
only be consistent with it.** The negative sign is necessary-but-not-sufficient evidence. The
directional "FAIL" against the naïve same-year positive expectation is the *right* result to
report, and the conclusion to draw is: *the same-year framing is the wrong test; the lead-lag
framing (R-A2) is the right one.*

H1b (status_index → own_idx, rho = +0.04, n.s.) correctly shows that the POI *level* index is a
weak contemporaneous proxy for socio-economic status — again consistent with a process where the
POI signal *leads* status rather than mirroring it.

---

## 3. Caveats and divergences from the 2018 thesis (documented, acceptable)

1. **PLR-only vs. BZR + Bezirk.** This revival runs on PLR level only (n=436); the thesis pooled
   PLR, BZR (planning region), and Bezirk (district). Aggregation level changes both the
   correlation magnitude and the MAUP exposure. The thesis's higher-level units smooth noise and
   can inflate correlations. PLR-only is the more conservative and more spatially granular choice;
   it is defensible but is **not** a like-for-like reproduction, and the methodology page must say
   so.
2. **Feature set.** Thesis used per-category POI counts as classifier features; E2 Task A uses two
   aggregated indices. This is the main driver of the AUC gap (0.599 vs 0.72) and is honestly
   disclosed.
3. **Data vintage / preprocessing.** Different preprocessing, pre-2021 PLR boundary vintage, and a
   reduced category set mean exact coefficients will not match. Under Epic B directional-revival
   framing this is acceptable; divergences are documented rather than chased.
4. **Multiple-comparison / single cross-section.** Significance is descriptive, not confirmatory
   (see §1).

---

## Known limitation (the headline one)

**These E1/E2 analyses are run on the 2018 golden cross-section, not on the real lead-lag
hypothesis.** The substantive claim above — that dynamism *leads* status — is *consistent with*
these results but is **not tested** by them, because everything here is contemporaneous (same-year
indices on a single snapshot). The proper test is:

> POI dynamism / change at time **t-N** predicts socio-economic status (MSS) at time **t**.

That requires (a) re-grounding the index so POI predictors are separated from the social-status
outcome and weights are justified (**R-A1, #64**), then (b) re-running E1/E2 against the real
lead-lag and POI→MSS hypotheses on the time series (**R-A2, #65**). Until R-A2 lands, the
pre-gentrification-signal interpretation should be presented as a **hypothesis supported by the
sign and by domain theory**, not as a confirmed lead-lag effect.

---

## Conditions (for PASS)

1. The methodology page (G2) and any public framing must present the negative associations as a
   **pre-gentrification / lead-lag hypothesis consistent with a contemporaneous cross-section**,
   explicitly stating that the lead-lag mechanism is **not yet tested** (pending R-A2 #65).
2. State that significance is descriptive (single cross-section, overlapping derived indices, no
   multiple-comparison correction).
3. Carry forward the PLR-only vs BZR+Bezirk caveat and the reduced-feature-set caveat into G2.
4. Keep the Task A / Task B leakage split prominent; never report Task B AUC without the leakage
   label.
5. Re-run and re-validate under R-A2 (#65) before any claim stronger than "directionally
   consistent with a lead-lag / pre-gentrification reading" is published.

---

## Sign-Off

```json
{
  "verdict": "concerns",
  "rationale": "E1/E2 methods are statistically sound: Spearman + OLS are the correct estimators for monotonic association between bounded, non-Gaussian composite indices on the n=436 PLR cross-section, and the E2 5-fold CV with an explicit clean-vs-leaky (Task A vs Task B) split is exemplary leakage discipline. The 3/4 directional divergence (dynamism negatively associated with current socio-economic status, |rho| 0.19-0.33, p<0.0001) is a real finding, not a bug: it is the expected signature of a pre-gentrification stage where commercial dynamism leads socio-economic status. The single, blocking caveat is that a contemporaneous cross-section can only be CONSISTENT WITH, not confirm, the lead-lag mechanism; the real POI(t-N)->status(t) test is R-A2 (#65), gated behind R-A1 (#64). PASS WITH CONDITIONS.",
  "risks": [
    "Pre-gentrification interpretation is supported by sign and theory but UNTESTED on the lead-lag structure until R-A2 (#65)",
    "PLR-only analysis is not a like-for-like reproduction of the thesis BZR+Bezirk pooling; MAUP/aggregation effects differ",
    "Task A AUC 0.599 vs thesis 0.72 reflects a reduced feature set (2 indices vs per-category counts), not model failure, but limits comparability",
    "Significance is descriptive only: single cross-section, overlapping derived indices, no multiple-comparison correction",
    "Risk of over-claiming if public framing presents the negative sign as a confirmed lead-lag effect rather than a hypothesis"
  ],
  "recommendations": [
    "Frame the negative associations on the public methodology page (G2) as a pre-gentrification/lead-lag HYPOTHESIS consistent with a contemporaneous cross-section, explicitly noting the lead-lag test is pending R-A2 (#65)",
    "Re-run E1/E2 against the real lead-lag and POI->MSS hypotheses after R-A1 (#64) re-grounds the index and justifies weights",
    "Keep the Task A / Task B leakage split and the 'Task B uninformative' label prominent everywhere the AUC is shown",
    "Document the PLR-only vs BZR+Bezirk and reduced-feature-set divergences in G2 as known, accepted deviations under Epic B directional-revival framing",
    "State that p-values are descriptive (no multiple-comparison correction, single cross-section)"
  ]
}
```
