---
task: H-C3 / #160 — Annual-cadence Hamburg lead-lag model + independent H3a/H3b re-test
author: geo-data-scientist
date: 2026-07-10
branch: feature/160-hc3-hamburg-lead-lag
---

# Geo-DS methodology sign-off — H-C3 Hamburg lead-lag + independent H3a/H3b/H3c re-test

- **Branch:** `feature/160-hc3-hamburg-lead-lag`
- **Issue / task:** #160 [H-C3] — build an annual-cadence Hamburg lead-lag model and
  **independently** re-test the thesis's H3a/H3b temporal-order finding on Hamburg's annual
  Sozialmonitoring series (do NOT inherit the Berlin finding). Folds in #129 (H2-SE) binding
  Stadtteil-SE-clustering acceptance criterion.
- **Reviewer:** geo-data-scientist (methodology gate, R-C1)
- **Nature of this pass:** Full methodology review — this is new methodology-bearing analysis
  (`analysis/*.py`, explicitly CLAUDE.md-listed) plus a new intermediate lead-lag model operationalizing
  R-A1 / H3a-H3b theory. I re-read the model, the analysis script, and the findings doc end-to-end and
  ran my own **independent numerical verification** of the cluster-robust estimator (below).
- **Artefacts reviewed:**
  - `transform/models/intermediate/int_hamburg_lead_lag.sql` (new; annual-cadence panel)
  - `analysis/e5_hamburg_lead_lag.py` (new; H3a/H3b/H3c re-test)
  - `docs/epic-h/E5-hamburg-lead-lag-findings.md` (new; findings)
  - `transform/models/intermediate/int_ewr_socioeco_hamburg_disagg.sql` (additive `stadtteil_code` passthrough)
  - `transform/models/intermediate/schema.yml` (docs for the new columns/model)
  - Cross-reference: `docs/epic-h/H1-geo-signoff.md` Condition 2; #129; ADR-0014 Pillar 2.

## 1. Annual-cadence redesign (`lag_k * 1` vs Berlin's `lag_k * 2`)

**Sound and adequately disclosed.** Hamburg's Sozialmonitoring is annual since 2010 (ADR-0014
Pillar 2); Berlin's MSS is biennial. Encoding the offset as `edition_tk = edition_t + lag_k * 1`
keeps the *edition-step* count identical to Berlin's `{1,2,3}` (structural comparability) while
correctly making each step one calendar year. The critical hazard here is **not** the arithmetic —
it is the temptation to read "Hamburg lag_k=2" and "Berlin lag_k=2" as the same real-time horizon
when they are 2 vs 4 years apart. That non-equivalence is disclosed unusually thoroughly and in every
place it needs to survive to the G2 page:

- the model header (lines 28-51) states explicitly that lag_k values are NOT directly comparable
  across cities and that any cross-city comparison must be read as "same edition-step count, different
  real-year horizon";
- the analysis-script docstring carries the same CADENCE CAVEAT (lines 59-63);
- **every results-table row is labelled with its real-year equivalent** (`k=1 (1yr)`, `k=2 (2yr)`,
  `k=3 (3yr)`), and the findings doc repeats the caveat as a binding note and a limitation.

This is the same vintage-discipline pattern used elsewhere in the pipeline (§6.2 boundary-vintage
analogue), correctly applied to cadence. R-C2 grounding is present (ADR-0014, H1-geo-signoff.md
Condition 2, #160). No concern.

## 2. Cluster-robust (CR1) estimator — independent verification

The reviewer's byte-identical re-derivation is reassuring, but per my remit I did **not** rely on it
alone — I re-implemented CR1 from scratch via a different code path (numpy `np.unique` cluster loop,
not the pandas `groupby().groups`/`get_indexer` path the production code uses) and ran it on synthetic
clustered data (G=30, unbalanced cluster sizes, injected cluster random-effects). Results were
identical to `run_ols_clustered` to full floating-point precision:

```
their coef_x/se_x/p_x: 0.5205082503182131 0.04499623770772151 2.1969093211282598e-12
mine  coef_x/se_x/p_x: 0.5205082503182131 0.04499623770772151 2.1969093211282598e-12
match: True
```

This exercises the parts most likely to harbor a subtle bug: the sandwich `bread @ meat @ bread`
assembly, the `(G/(G-1)) * ((N-1)/(N-K))` small-sample correction, the `t(G-1)` reference
distribution, and — importantly — the pandas index-alignment in the cluster loop
(`cluster_ids.index.get_indexer`), which correctly maps cluster-member labels back to design-matrix
row positions. All correct. The point estimate being plain OLS (clustering affects only the
variance) is right. The `n<10 or n_clusters<2` and `LinAlgError` guards are appropriate. Choosing a
hand-rolled numpy CR1 over adopting `statsmodels` is the correct call under golden rules #1/#2
(statsmodels is not an approved dependency; adopting it would need an ADR) — and the estimator is a
textbook closed form, so the trade-off is justified and cited (Cameron, Gelbach & Miller 2011;
Cameron & Miller 2015). No concern.

## 3. Stadtteil-clustering scope (#129 binding AC)

**Correctly scoped.** #129 / H1 Condition 2 requires clustering SEs at Stadtteil grain for **any
specification using the D4 (ewr_composite) covariate**, because D4 is uniformly disaggregated from
~104-105 Stadtteile to ~941-945 Gebiete — every Gebiet in a Stadtteil carries an identical D4 value,
so the effective N is the Stadtteil count (a change-of-support / MAUP problem, Gotway & Young 2002).
The implementation binds the requirement precisely where it applies and nowhere else:

- Section 2 (`test_h3_d4_clustered`) is the only place D4 enters as a covariate, and it clusters on
  `stadtteil_code` (observed 95 clusters). Correct.
- Section 1 (`test_h3_hamburg`) is a pure bivariate Spearman with **no D4 covariate** — clustering
  legitimately does not apply, and this exemption is stated explicitly at the test site rather than
  left implicit. Correct: applying a cluster-robust *variance* to a statistic that doesn't involve D4
  would be methodologically confused.

The 95-vs-~104-105 cluster gap is a genuine no-coverage attrition (uninhabited/harbor/industrial/
airport Stadtteile below the >300-resident scoring threshold), documented as a two-stage drop with
named codes and confirmed against `stg_hamburg_ewr_stadtteil` — not a join bug. I accept this as
data reality, not a defect. The `int_ewr_socioeco_hamburg_disagg` change is purely additive
(passthrough `stadtteil_code`); the crosswalk method is unchanged from its prior sign-off. No concern.

## 4. Symmetric-Spearman disclosure (Section 1 H3a ≡ H3b)

This is the single most important honesty point in the deliverable and it is handled correctly.
Spearman is symmetric under argument swap, so Section 1's H3a and H3b are **mathematically identical
by construction** and cannot adjudicate direction — Section 1 is a *co-movement* test, not a
temporal-precedence test. The script discloses this in the module docstring, the function docstring,
and a prominent findings-doc callout, and correctly points to Section 2 (non-symmetric OLS, different
dependent variables) as the specification that actually distinguishes the two directional hypotheses.
This inherits and correctly re-labels the same property Berlin's `e1_regressions.py` test_h3 carries
(B7-geo-signoff.md Concern 2). Reporting an identical-by-construction row twice is defensible **only**
because it is disclosed this loudly; it is. No concern.

## 5. Honest weak/null Hamburg result as a "done" deliverable

**Methodologically acceptable — indeed required by the ticket.** #160's acceptance criterion is
"independently re-test... do NOT inherit the Berlin finding", and the deliverable does exactly that:
Section 1 shows weak, mostly-non-significant Spearman correlations in the theoretically-correct
(negative) direction, only k=1 clearing p<0.05; Section 2's D4-controlled clustered OLS shows all six
coefficients correct-direction but none significant. The conclusion — Hamburg does **not** cleanly
replicate Berlin's H3b dominance — is stated plainly, not massaged toward the Berlin result. Under
the Epic B directional-revival framing (CLAUDE.md), an honest negative/divergent finding is a valid
terminal state, and #80 is the standing precedent for honest null reporting. Forcing a match would
have been the methodology failure; declining to is the correct outcome.

## 6. H3c directionally-wrong-and-significant result

**Flagging it honestly is sufficient for this ticket's scope**, and it is flagged prominently (not
buried) at every lag. One methodological nuance I want on the record for the G2 page and any future
ticket, as a **recommendation, not a blocker**: H3c correlates `dynamism_score_t` (a C5-corrected
*rate/z-score of yoy change*) against `status_index_t` (a cross-sectional *level*) — a
change-vs-level pairing, unlike H3a/H3b which are change-vs-change. A strongly-significant "wrong
sign" contemporaneous co-movement is therefore not straightforwardly interpretable as evidence
against the Dangschat mechanism; it more likely reflects that already-established higher-status areas
(low numeric `status_index`) sit on structurally different amenity-dynamism baselines. This is run
"for parity" with Berlin's e1 H3c and carries the same structure Berlin's does, so parity justifies
including it — but the finding should not be over-read. I recommend the G2 write-up state that H3c is
a level-vs-change diagnostic, not a clean directional test. This does not affect the ticket verdict.

## Independent-review status

An independent `data-engineer-reviewer` verified across two rounds: Berlin's `int_mss_lead_lag`
untouched (4214 rows unchanged), the CR1 estimator re-derived from scratch to 4 decimal places, the
additive-only disagg change, the two-stage Stadtteil attrition as genuine no-coverage, and no
published mart `accepted_values` widened beyond `["BER"]`. I independently re-verified the CR1
estimator via a third, structurally-different implementation (§2 above, byte-identical) and confirmed
the model/analysis logic, grounding citations (R-C2), and #129 scoping against the source docs. No
code-correctness or methodology concerns are outstanding.

## Scope / publication gate

Confirmed: this is analysis-layer groundwork feeding only `analysis/e5_hamburg_lead_lag.py`; no
published mart's `accepted_values` is widened beyond `["BER"]` (same #158/#159/#80 precedent).
Publishing any Hamburg lead-lag result still requires a separate fresh dual sign-off — this pass does
not pre-authorize that.

## Recommendations (non-blocking)

1. For the G2 methodology page, carry the cadence non-equivalence caveat verbatim and add the H3c
   level-vs-change interpretation note (§6) so the "wrong-sign significant" result is not over-read.
2. When a Hamburg publication ticket is eventually scoped, re-derive any pooled Berlin+Hamburg
   statistic from a common indicator subset (H1-geo-signoff.md §3 standing warning) — do not pool the
   two separately-normalized `ewr_composite` columns.

**Verdict: PASS**
