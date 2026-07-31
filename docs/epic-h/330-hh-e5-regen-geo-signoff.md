---
task: H / #330 — Regenerate E5 Hamburg lead-lag findings against the corrected 2-indicator D4 composite
author: geo-data-scientist
date: 2026-07-31
branch: fix/330-hamburg-e5-regen
---

# Geo-DS methodology sign-off — E5 lead-lag regeneration (#330)

- **Scope:** is the regeneration + its correction narrative sound? Not re-litigating #329's
  composite construction (settled, merged @ `4cee9dce`).
- **Method:** read the working-tree diff of `docs/epic-h/E5-hamburg-lead-lag-findings.md`,
  `analysis/e5_hamburg_lead_lag.py` (`run_spearman`, `run_ols_clustered`, `test_h3_d4_clustered`,
  `load_lead_lag_data`), and `git log` on the Hamburg model tree since 2026-07-10.

## 1. OLS-clustered spec — correctly applied, internally consistent

`test_h3_d4_clustered` is untouched; `ewr_composite_t` still enters as a single cross-sectional
LEVEL covariate (index-definition.md §4.3), so K = 3 (intercept, primary predictor, D4) **regardless
of how many indicators the composite averages**. Degrees of freedom, the CR1 correction
`(G/(G-1))((N-1)/(N-K))`, and the t-df `G-1 = 94` are therefore all unchanged by #329 — nothing in
question 3 is newly wrong. N/cluster ratios (9161/95 ≈ 96) are plausible; H3a/H3b share near-identical
p-values by construction (same regressors, different DV scaling). No arithmetic inconsistency found.

## 2. ~95-cluster claim — reasoning is valid

The stated mechanism is right: the 4 Stage-2 Stadtteile have **zero** `stg_hamburg_ewr_stadtteil`
rows, so `ewr_composite_t` is NULL under any indicator count; dropping one column cannot resurrect
them. The `n<10` guard in `run_ols_clustered` is a whole-regression, not per-cluster, threshold, so
added rows cannot add clusters either. "Structural, not coincidental" is correctly reasoned.

## 3. Correction narrative — one materially false statement (E-C1)

The characterization of *why* the old numbers were contaminated (shared construction between
`unemployment_share` and the Statusindex DV → partly self-predicting) is accurate, and the
`<details>` + DO-NOT-CITE treatment is the right disposition (preserve, don't overwrite).

**But the note contains a false claim.** Inside the `<details>` block:

> "bivariate Section 1 numbers were unaffected by the D4 composite and are unchanged between the
> stale and corrected runs; only the Section 2 ... depended on the composite"

Clause 1 is true (verified: `run_spearman` never touches `ewr_composite_t`). Clause 2 is **false and
contradicted by the diff in the same commit**: every Section 1 row changed (N 9285→9293, ρ
-0.0215→-0.0202), and H3a/H3b k=1 flipped Sig **Yes→No** (p 0.0384→0.0514). That flip — not
Section 2 — is the entire source of the scorecard change 5/15 → 3/15, which the document silently
edits without explanation.

Because Section 1 provably cannot depend on the composite, the shift must come from other `develop`
commits landed since 2026-07-10 — most plausibly **#313 (`3ed12751`, Hamburg merged-Stadtteil
crosswalk) and #307 (`eef49b92`)**. Consequence: this is **not a clean #329-only counterfactual**.
The Section 2 before/after deltas (incl. N 9118→9161) are likewise confounded between the composite
change and the crosswalk change, so the "What changed and what didn't" paragraph over-attributes to
#329. The self-correction narrative for O2 is otherwise sound and worth keeping.

## Conditions

**E-C1 (integration-blocking, doc-only).** Delete/replace the "are unchanged between the stale and
corrected runs" clause. State that (a) Section 1 also changed and lost significance at k=1, (b) this
cannot be caused by #329 (Spearman uses no D4 covariate), (c) the regeneration baseline also
absorbed #313/#307, so before/after deltas are a combined-run comparison, not a #329-only
counterfactual, and (d) the corrected 3/15 scorecard reflects both. Cheap fix; no re-run required.

**E-C2 (citation/publication-only).** If a clean #329-only effect is ever cited, re-run the
pre-#329 composite against the *current* data snapshot to isolate it.

**Verdict (initial review): PASS WITH CONDITIONS**

---

## Addendum — re-review after data-engineer response (2026-07-31)

**E-C1: resolved.** The false "unchanged between the stale and corrected runs" clause is gone. The
replacement note ("Note on the 5/15 -> 3/15 significance drop") states all four required points:
(a) Section 1 changed and lost significance at k=1 (p 0.0384->0.0514, rho -0.0215->-0.0202, N
9285->9293); (b) #329 structurally cannot cause it (`run_spearman` reads no `ewr_composite_t`);
(c) the baseline also absorbed #313 (`3ed12751`) / #307, so this is a combined-run comparison, not a
#329-only counterfactual; (d) the 3/15 scorecard reflects the combination. Arithmetic re-verified:
stale 5/9 + 0/6 = 5/15, corrected 3/9 + 0/6 = 3/15 — the attribution of the whole drop to Section 1
is exactly right, since Section 2 is 0/6 in both runs.

**E-C2: captured** as a non-blocking Limitations bullet ("Forward note on isolating a clean
#329-only effect"), correctly scoped to citation-time and pointing at re-running the 3-indicator
composite against the *current* snapshot rather than the 2026-07-10 numbers.

**Durability fix (`CORRECTION_330_NOTE_MD`): no new statistical problem.** It is inert text emitted
by `write_findings`; it touches no estimator, sample, or spec. `run_spearman`, `run_ols_clustered`
and `test_h3_d4_clustered` are unchanged, so all earlier findings (K=3, G-1=94 df, 95 clusters)
still stand.

**New non-blocking observation (E-C3, documentation-only).** The constant hard-codes *current-run*
figures (3/15, -0.0477, p=0.3081, N=9293) that the surrounding tables recompute. A future data
refresh would silently desynchronise the note from the live tables. Recommend either interpolating
those values or adding a cheap consistency assert on `n_sig_all` before publication (Epic G2).

**Verdict: PASS**
