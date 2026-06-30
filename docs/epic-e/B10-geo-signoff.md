# B10 Geo-Data-Scientist Sign-Off

- **Task:** B10 #120 — BZR/Bezirk spatial aggregation (E1/E2) + EWR filter fix
- **Date:** 2026-06-30
- **Verdict: PASS**
- **Original verdict (2026-06-30):** PASS WITH CONDITIONS — all three conditions now resolved (see "Conditions resolved" below).

The BZR/Bezirk spatial-scale extension itself is methodologically sound and is a
genuine, thesis-faithful (§3.2) three-scale MAUP check. However, investigating
Question 3 surfaced a **real predictor-side partial-composite leak in the EWR H3b
test** that the B10 EWR filter fix does *not* close. The 13/15 EWR result is
therefore contaminated, not a clean B9b normalization shift. This must be fixed (or
the affected EWR H3b rows explicitly excluded) before integration. The fix is small
and local; hence PASS WITH CONDITIONS rather than FAIL.

---

## Q1 — MAUP sensitivity: BZR 4/11 directional vs PLR 10/11

This is **expected behaviour under MAUP plus collapsing power, not a flawed
aggregation.** Three observations support that reading:

- **H1 is a non-result at every scale, so the "sign flip" is noise, not divergence.**
  PLR H1 Spearman is rho=−0.046 (p=0.33, NS); BZR H1 is rho=+0.053 (p=0.54, NS).
  Both are statistically indistinguishable from zero. Labelling BZR H1 a "FAIL"
  because a near-zero correlation crossed sign is misleading — neither scale supports
  a monotonic POI-stock↔status relationship. The OLS variant stays negative ("PASS")
  at both scales, confirming the rank sign is just jitter on a null effect.
- **H1b — the test with real signal — strengthens with aggregation, exactly as MAUP
  predicts.** PLR rho=0.136 → BZR rho=0.234, both significant. Within-BZR variance
  cancels and the cross-unit fast-food↔deprivation gradient sharpens. This is the
  textbook coarse-scale amplification the model header and index-definition.md §8
  already anticipate.
- **The drop from 10/11 to 4/11 is dominated by H2/H3 going insignificant at n≈137,**
  not by wrong signs appearing. The H2 BZR coefficients keep the correct (negative)
  sign at k=1 and k=2; they merely lose significance. That is power loss from a 4×
  reduction in n, not aggregation bias.

So the BZR aggregation is not methodologically flawed. The caveat is **presentational**:
the findings doc should not headline "4/11" as if it were a substantive contradiction
of the PLR result. See condition C-2.

## Q2 — Population-weighted mode for ordinal rollup

**Acceptable, with one wording correction.** Aggregating ordinal PLR MSS
status/dynamik to BZR/Bezirk by a population-weighted majority is the standard Berlin
Senat approach and is the right call over treating the 1–4 codes as metric. Two notes:

- The model header and comments say "population-weighted **mode**", but the SQL
  actually computes `round(population-weighted mean)` clamped to [1,4] / [1,3]
  (lines 135–158, 198–221). Weighted-mean-then-round is a defensible computable
  proxy, but it is **not** the mode and can diverge from it (e.g. a bimodal BZR of
  status 1 and 3 rounds to 2, a category that may not exist among its PLRs). This is
  acceptable for a coarse MAUP diagnostic, but the comment must be corrected to say
  "rounded population-weighted mean as a mode proxy" so the methodology page (G2) does
  not misdescribe the operator. See condition C-3.
- Importantly, the **headline BZR/Bezirk H1 analysis does not even use this rollup** —
  `load_bzr_h1_data()` joins the thesis's own native BZR golden table
  (`stg_thesis_2018_result_bzr.status_sum`, a metric composite) and population-weighted
  means it to Bezirk. That path is cleaner than the ordinal-mode rollup and is the
  right choice. The `int_mss_bzr_aggregate` ordinal rollup feeds only the H2/H3
  synthetic lead-lag panel, where its limitations are lower-stakes (already low-power).

## Q3 — EWR 13/15 vs 15/15: the two changed tests (FINDING)

The two tests that flipped from PASS to FAIL are **H3b at k=2 (rho −0.217→+0.005) and
H3b at k=4 (rho −0.223→+0.135)**; H3b k=1 stayed PASS but its rho collapsed from
−0.169 to −0.017 and its n jumped 2710→3252. This is **not** a benign z-score
normalization difference. Root cause, verified against `data/gentriduck.duckdb`:

- H3b correlates `delta_ewr_t` (the *annual* EWR change at the base year,
  = `ewr_t − ewr_{t−1}` via `LAG(reference_year)` in `int_ewr_lead_lag.sql` lines
  82–88, 109) against `delta_poi`.
- B9b extended the EWR panel back to 2008. So for base year **2014**, `delta_ewr_t`
  is now `ewr_composite(2014) − ewr_composite(2013)`. I confirmed in
  `int_ewr_socioeco` that **2013 is 100% partial composite** (full composite NULL for
  all 542 PLRs), while 2014 is full composite.
- Before B9b the panel started in 2014, so 2014-base rows had a NULL `delta_ewr_t` and
  dropped out of H3b — which is exactly why old H3b N (2710/2168/1084) was smaller than
  H3a (3252) and now matches it (3252; I confirmed +542 rows for year_t=2014 at k=1).
- The B10 filter `WHERE any_endpoint_partial = FALSE` does **not** catch this. That
  flag is derived only from the t and t+k composites that build the *outcome*
  `delta_ewr`; it says nothing about the `t−1` predecessor used to build the *predictor*
  `delta_ewr_t`. So full-composite 2014 rows pass the filter while carrying a
  predictor that is `full(2014) − partial(2013)`.

The partial composite omits `foreigners_share` (the thesis's strongest predictor, k11)
and `migration_background_share`, and is z-scored against a different indicator set.
Differencing it against the 5-indicator composite is exactly the cross-era arithmetic
the **B9 domain sign-off §3 prohibits**. The new H3b values are therefore measuring an
artefact of mixed-composition differencing, not a real Δstatus→ΔPOI lead. The honest
statement is: with the contaminating rows removed, H3b is unchanged from its prior
15/15 PASS; the apparent "2 new failures" are spurious. This must be fixed before
integration (condition C-1).

## Q4 — Bezirk scale n=12

**Appropriate to report, only as flagged indicative context — keep it, do not
headline it.** n=12 cannot support inferential claims: a single Spearman at n=12 needs
|rho|≈0.58 for p<0.05, so the two "significant" H2 results (k=1 rho=−0.349 p=0.015;
k=2 rho=−0.516 p=0.010) sit right at the edge and are fragile to one or two districts
moving. The findings doc already labels Section 6 "indicative only, very low
statistical power", which is the correct framing and satisfies me. Two conditions:
the p-values at n=12 should not be described as "PASS" in the same column style as the
n=3252 EWR tests without a power caveat in the cell or footnote (condition C-2), and
the public methodology page (G2) must not cite Bezirk-scale significance as
confirmatory evidence. The value of the Bezirk row is purely the MAUP gradient
(does the sign/strength move monotonically PLR→BZR→Bezirk?), and for that purpose it
is worth keeping.

---

## Conditions (all required before PM integrates into `develop`)

- **C-1 (blocking, methodology):** Close the EWR H3b predictor-side partial-composite
  leak. Either (a) extend the H3b filter so that the `t−1` year feeding `delta_ewr_t`
  must also be full-composite (e.g. add an `is_partial_composite` guard on the LAG
  source year, or expose a `delta_ewr_t_any_partial` flag in `int_ewr_lead_lag` and
  filter on it), or (b) restrict EWR H3b to base years ≥ 2015 so `delta_ewr_t` never
  spans the 2013/2014 full/partial boundary. After the fix, re-run E1 and update
  Section 4; I expect H3b to return to PASS and the EWR scorecard to read 15/15 again
  (or, if it does not, that is then a *real* result worth its own note). Re-request
  sign-off only if the post-fix EWR direction count still diverges from 15/15.
- **C-2 (doc, non-blocking-on-rerun):** In `E1-regression-findings.md`, add a one-line
  note under the BZR and Bezirk sections that the lower directional-agreement counts
  reflect MAUP smoothing + power loss on a null/weak H1 and small n, not contradiction
  of the PLR finding; and mark n=12 "significant" cells with a low-power caveat.
- **C-3 (doc):** Correct the `int_mss_bzr_aggregate.sql` header/comments to describe the
  ordinal rollup as a *rounded population-weighted mean used as a mode proxy*, not
  "mode", and note the round-to-nonexistent-category edge case. Carry this wording into
  the G2 methodology page.

## Risks accepted (documented, not blocking)

- EWR POI bridge pseudo-replication (~35% of lor_2021 PLRs share a poi_count via the
  dominant-crosswalk match) — already caveated in `load_ewr_lead_lag_data` docstring;
  inflates effective n, so all EWR p-values are directional evidence only.
- Bezirk H2 "significance" at n=12 is fragile (see Q4).

## Conditions resolved (2026-06-30, post-fix re-review)

All three conditions from the original PASS WITH CONDITIONS verdict are satisfied;
verdict upgraded to **PASS**. Verified against the post-fix model and findings docs:

- **C-1 (blocking) — RESOLVED.** `int_ewr_lead_lag.sql` (lines 85-99) now computes
  `delta_ewr_vs_prev` with a CASE guard that returns NULL when
  `lag(is_partial_composite) OVER (... ORDER BY reference_year) = TRUE`. The
  `is_partial_composite` flag is sourced directly from `int_ewr_socioeco` (line 71),
  so the 2014 base-year rows whose predecessor is the 100%-partial 2013 composite now
  yield a NULL predictor and drop out of H3b naturally — closing the predictor-side
  cross-era differencing leak (B9 domain sign-off §3). E1 Section 4 now reads the
  expected **15/15 directional, 15/15 significant**, with H3b n restored to
  k=1:2710, k=2:2168, k=4:1084 (matching pre-B9b). The spurious "2 new failures" are
  gone. This was the only blocking item.

- **C-2 (doc) — RESOLVED.** `E1-regression-findings.md` Section 5 (BZR) carries the
  MAUP-smoothing note, and Section 6 (Bezirk) adds an explicit MAUP caveat stating
  "|rho|≈0.58 needed for p<0.05" at n=12 directly above the two "significant" H2 cells.
  The lower directional-agreement counts are no longer presented as substantive
  contradictions of the PLR result.

- **C-3 (doc) — RESOLVED.** `int_mss_bzr_aggregate.sql` header (lines 24-25) now
  describes the ordinal rollup as "rounded population-weighted mean (mode proxy):
  round(weighted_mean) clamped to the ordinal range. Note: SQL uses round(weighted_mean),
  NOT a true statistical mode." This is the correct operator description to carry into
  the G2 methodology page.

The methodology is sound, the EWR same-era result is now a clean 15/15, and the
BZR/Bezirk MAUP gradient is honestly framed. Cleared for integration into `develop`.
