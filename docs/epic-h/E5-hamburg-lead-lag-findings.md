# E5 Hamburg Lead-Lag Findings -- Independent H3a/H3b/H3c Re-Test (H-C3, #160)

- **Task:** H-C3 (#160) -- annual-cadence Hamburg lead-lag model + independent H3a/H3b re-test
- **Issue:** #160 (H-C3); #129 (Stadtteil SE-clustering binding requirement) **(Follow-up now tracked: #265 (H-reg-SE) — see `docs/planning/deferred-work-audit-2026-07.md`.)**
- **Date:** 2026-07-31
- **Data:** int_hamburg_lead_lag (H-C3 #160), n=27871 rows
- **Method:** Spearman rank correlation (bivariate, mirrors e1_regressions.py's test_h3 exactly) + OLS with Stadtteil-clustered standard errors (D4-covariate specification only, #129)

## Do NOT assume Berlin's finding

This is an **independent re-test**, not a confirmation exercise. The Berlin thesis (p. 91) found H3b (status change leads POI change) CONFIRMED and H3a (POI change leads status change) REJECTED. This script does not assume, expect, or force that outcome to replicate on Hamburg -- whatever direction/significance is observed below is reported as-is (#160 explicit scope note; #80 precedent for honest null/negative findings).

## Cadence caveat (binding)

Hamburg's Sozialmonitoring is ANNUAL (ADR-0014); `int_hamburg_lead_lag` uses `edition_tk = edition_t + lag_k * 1` (1/2/3 real years), NOT Berlin's `edition_tk = edition_t + lag_k * 2` (2/4/6 real years). Every `lag_k` value below is labelled with its real-year equivalent -- **do not read "Hamburg lag_k=2" as the same real-time horizon as "Berlin lag_k=2"**; they are not.

## Hypothesis citations

- **H3a**: Thesis p.91 H3a framing (theory: Dangschat 1988), independently re-tested on Hamburg -- REJECTED in the Berlin thesis, NOT assumed to replicate or reject here. Uses C5-corrected delta_dynamism_t (index-definition.md §2.4; int_hamburg_lead_lag.sql D3 C5 note, H-C1 #158 re-validation); delta_status_ordinal is inverse-numeric (index-definition.md §5 polarity table) so the theory-derived expected direction is negative.
- **H3b**: Thesis p.91 H3b framing (theory: Dangschat 1988), independently re-tested on Hamburg -- CONFIRMED in the Berlin thesis, NOT assumed to replicate or reject here. delta_status_ordinal is inverse-numeric (index-definition.md §5 polarity table); improved status = negative delta, so the theory-derived expected Spearman(delta_status_ordinal, delta_dynamism_t) direction is negative.
- **H3c**: Thesis p.91 H3c framing, run alongside H3a/H3b for the same apples-to-apples comparability e1_regressions.py provides for Berlin -- UNCLEAR in the Berlin thesis. status_index inverse-numeric (index-definition.md §5), theory-derived expected direction negative.

## Section 1: Bivariate Spearman (mirrors e1_regressions.py's test_h3 method)

> No D4 (ewr_composite_t) covariate in this section -- these are pure two-variable rank correlations, same as Berlin's own test_h3. Stadtteil clustering (#129) does NOT apply here (see module docstring scope note); it applies only to Section 2.

> **H3a/H3b are identical by construction in this section.** H3a computes `Spearman(delta_dyn_t, delta_status)` and H3b computes `Spearman(delta_status, delta_dyn_t)` -- the same two vectors with swapped argument order. Spearman correlation is symmetric under argument swap, so H3a and H3b return IDENTICAL rho/p/n at every lag_k below (inherited from e1_regressions.py's test_h3, which has the same property on Berlin's MSS data; see that function's docstring and B7-geo-signoff.md Concern 2). This is a **co-movement test across the lag window, not a strict temporal-precedence test** -- a symmetric bivariate statistic cannot distinguish "POI leads status" (H3a) from "status leads POI" (H3b); it can only say the two series co-move. **Section 2 below (the D4-controlled OLS with Stadtteil-clustered SEs) is the test that actually distinguishes the two directional hypotheses** -- H3a and H3b there are different regression specifications (different dependent variables) and its coefficients are genuinely non-symmetric.

| Hyp | Test | N | Value | p-value | Sig | Expected Dir | Actual Dir | Match |
|---|---|---|---|---|---|---|---|---|
| H3a | Spearman k=1 (1yr) | 9293 | -0.0202 | 0.0514 | No | negative | negative | PASS |
| H3b | Spearman k=1 (1yr) | 9293 | -0.0202 | 0.0514 | No | negative | negative | PASS |
| H3c | Spearman k=1 (1yr) | 10147 | 0.0748 | 0.0000 | Yes | negative | positive | FAIL |
| H3a | Spearman k=2 (2yr) | 8435 | -0.0175 | 0.1070 | No | negative | negative | PASS |
| H3b | Spearman k=2 (2yr) | 8435 | -0.0175 | 0.1070 | No | negative | negative | PASS |
| H3c | Spearman k=2 (2yr) | 9291 | 0.0836 | 0.0000 | Yes | negative | positive | FAIL |
| H3a | Spearman k=3 (3yr) | 7577 | -0.0152 | 0.1854 | No | negative | negative | PASS |
| H3b | Spearman k=3 (3yr) | 7577 | -0.0152 | 0.1854 | No | negative | negative | PASS |
| H3c | Spearman k=3 (3yr) | 8433 | 0.0916 | 0.0000 | Yes | negative | positive | FAIL |

**Directional agreement (bivariate): 6/9. Significant: 3/9.**

## Section 2: D4-controlled OLS, Stadtteil-clustered standard errors (#129 binding)

> ewr_composite_t (D4 baseline LEVEL, index-definition.md §4.3) enters as a covariate here -- per #129 / H1-geo-signoff.md Condition 2, standard errors on the primary change-predictor coefficient are clustered at Stadtteil grain (`run_ols_clustered`, CR1 sandwich estimator, Cameron, Gelbach & Miller 2011; Cameron & Miller 2015). Effective D4 sample size is Stadtteil count (observed: 95 distinct clusters per lag_k below; ~104-105 Stadtteile expected per ADR-0014), not Gebiet (row) count.

| Hyp | Test | N | N clusters | Value | p-value | Sig | Expected Dir | Actual Dir | Match | ewr_composite_t coef (p) |
|---|---|---|---|---|---|---|---|---|---|---|
| H3a (D4-controlled, Stadtteil-clustered) | OLS-clustered k=1 (1yr) | 9161 | 95 | -0.0045 | 0.3081 | No | negative | negative | PASS | 0.0017 (p=0.6544) |
| H3b (D4-controlled, Stadtteil-clustered) | OLS-clustered k=1 (1yr) | 9161 | 95 | -0.0477 | 0.3110 | No | negative | negative | PASS | -0.0028 (p=0.7149) |
| H3a (D4-controlled, Stadtteil-clustered) | OLS-clustered k=2 (2yr) | 8315 | 95 | -0.0045 | 0.2697 | No | negative | negative | PASS | -0.0035 (p=0.6104) |
| H3b (D4-controlled, Stadtteil-clustered) | OLS-clustered k=2 (2yr) | 8315 | 95 | -0.0352 | 0.2746 | No | negative | negative | PASS | -0.0101 (p=0.1866) |
| H3a (D4-controlled, Stadtteil-clustered) | OLS-clustered k=3 (3yr) | 7469 | 95 | -0.0052 | 0.2512 | No | negative | negative | PASS | -0.0082 (p=0.3759) |
| H3b (D4-controlled, Stadtteil-clustered) | OLS-clustered k=3 (3yr) | 7469 | 95 | -0.0346 | 0.2559 | No | negative | negative | PASS | -0.0036 (p=0.5894) |

**Directional agreement (D4-controlled, clustered): 6/6. Significant: 0/6.**

## Correction (#330): pre-#330 Section 2 numbers were computed under a contaminated D4 composite

**This note must not be deleted or silently overwritten by a future regeneration** -- it records a
methodology self-correction that is itself part of the O2 whitepaper narrative (per #329
domain-expert sign-off condition D-C2, `docs/epic-h/329-hh-d4-conflation-domain-signoff.md`).

Prior to #329 (merged into `develop` @ 4cee9dce), Hamburg's D4 predictor composite
(`int_ewr_socioeco_hamburg.ewr_composite`) was built from **three** indicators, one of which
(`unemployment_share`) is also a direct constituent of Hamburg's own D1 outcome (the Sozialmonitoring
Statusindex used as `status_index_t`/`status_index_tk` throughout this document). Because the
covariate (`ewr_composite_t`) and the dependent variable it was being used to control for both
partly reflected the same underlying unemployment measure, the **entire stale Section 2 row** first
reported here (dated 2026-07-10) was **partly self-predicting** -- not only the `ewr_composite_t`
coefficient/p-value itself, but also the primary change-predictor coefficients (`delta_dynamism_t`
for H3a, `delta_status_ordinal` for H3b), since partialling out an endogenous control biases every
coefficient in the same OLS specification. This was therefore not an independent D4-controlled test
of H3a/H3b, but one contaminated by shared construction with D1. #329 removed `unemployment_share`
from the Hamburg composite (now a 2-indicator composite); this document was regenerated against that
corrected composite per #330 on 2026-07-31 (Section 1 and Section 2 tables above are the
corrected/current numbers).

The **stale, contaminated** pre-#329 Section 2 results (3-indicator composite, generated 2026-07-10)
are kept below for transparency and audit trail, not because they are usable for any citation or
inference -- do not cite these numbers as an independent D4-controlled result.

<details>
<summary>Superseded/contaminated: pre-#329 Section 2 results (3-indicator composite incl. unemployment_share -- DO NOT CITE)</summary>

| Hyp | Test | N | N clusters | Value | p-value | Sig | Expected Dir | Actual Dir | Match | ewr_composite_t coef (p) |
|---|---|---|---|---|---|---|---|---|---|---|
| H3a (D4-controlled, Stadtteil-clustered) | OLS-clustered k=1 (1yr) | 9118 | 95 | -0.0058 | 0.0964 | No | negative | negative | PASS | -2.75e-04 (p=0.9370) |
| H3b (D4-controlled, Stadtteil-clustered) | OLS-clustered k=1 (1yr) | 9118 | 95 | -0.1165 | 0.1388 | No | negative | negative | PASS | -0.0023 (p=0.8007) |
| H3a (D4-controlled, Stadtteil-clustered) | OLS-clustered k=2 (2yr) | 8277 | 95 | -0.0018 | 0.6125 | No | negative | negative | PASS | -0.0081 (p=0.2089) |
| H3b (D4-controlled, Stadtteil-clustered) | OLS-clustered k=2 (2yr) | 8277 | 95 | -0.0257 | 0.6109 | No | negative | negative | PASS | -0.0130 (p=0.1817) |
| H3a (D4-controlled, Stadtteil-clustered) | OLS-clustered k=3 (3yr) | 7436 | 95 | -0.0057 | 0.1642 | No | negative | negative | PASS | -0.0168 (p=0.0573) |
| H3b (D4-controlled, Stadtteil-clustered) | OLS-clustered k=3 (3yr) | 7436 | 95 | -0.0721 | 0.2158 | No | negative | negative | PASS | -0.0056 (p=0.4800) |

Stale directional agreement (D4-controlled, clustered): 6/6. Stale significant: 0/6.
Stale overall scorecard (bivariate + D4-controlled, pre-#329 composite): 12/15 directional agreement,
5/15 significant.

**Note on the 5/15 -> 3/15 significance drop (#330 regeneration; D330-C2 correction):** this drop is
**not caused by #329**. Section 2 -- the only part of this document that reads `ewr_composite_t` --
is 0/6 significant in **both** the stale (pre-#329) and corrected (post-#329) runs, so the composite
fix changed none of Section 2's significance calls. The entire 5/15 -> 3/15 drop comes from
**Section 1** (`run_spearman`, which never reads `ewr_composite_t` and therefore structurally cannot
be affected by #329): H3a/H3b at k=1 lost their only nominally-significant bivariate result,
flipping from Sig=Yes (p=0.0384, N=9285) in the stale run to Sig=No (p=0.0514, N=9293) in this
regeneration -- alongside a shift in rho (-0.0215 -> -0.0202). Because #329 touched only Hamburg's
D4-composite SQL and Section 1 has no D4 dependency, this Section 1 shift must originate elsewhere in
`develop` between the stale run's generation date (2026-07-10) and this regeneration (2026-07-31) --
most plausibly **#313** (Hamburg merged-Stadtteil crosswalk fix, commit `3ed12751`) and/or **#307**.
**Consequence: this regeneration is a combined-run comparison** (D4-composite fix #329 + crosswalk
fix #313 + possibly other intervening `develop` commits), **not a clean #329-only counterfactual** --
the corrected 3/15 overall-significant count reflects all of that combined change, not #329 in
isolation. See the forward note in Limitations below for how to isolate a clean #329-only effect if
one is ever needed for citation.

</details>

**What changed and what didn't:** directional agreement is identical (6/6 PASS in both the stale and
corrected Section 2 runs) and significance is identical (0/6 significant in both) -- but this should
**not** be read as "nothing changed": the whole stale Section 2 row is unusable, not only its
`ewr_composite_t` column (see the broadened contamination note above). Point estimates and p-values
on the **primary** change-predictor coefficients moved substantially, not modestly -- e.g. H3b k=1's
primary coefficient moved -0.1165 -> -0.0477 (a 59% reduction in magnitude) and H3a k=1's p-value
moved 0.0964 -> 0.3081 -- alongside the smaller `ewr_composite_t` shift (e.g. H3a k=1: -2.75e-04
(p=0.9370) -> 0.0017 (p=0.6544), even flipping sign). None of these shifts happened to flip a
directional-match or significance call at p<0.05 in this dataset, so the substantive conclusion (no
significant D4-controlled directional effect for either H3a or H3b at any lag_k) is unchanged --
but that stability is a property of this dataset, not evidence the pre-#329 specification was valid.
The correction was necessary because an endogenous control (one that shares construction with the D1
outcome it is meant to partial out) is not a methodologically valid test of H3a/H3b regardless of
whether its point estimates happen to resemble the corrected ones; identical qualitative conclusions
from an invalid and a valid specification here is a property of this dataset, not a retrospective
justification for having used the invalid specification. See Limitations/Epic B framing below.

## Overall scorecard

**Total directional agreement: 12/15. Significant: 3/15.**

**Composition caveat:** this 15-test count mixes two different kinds of test -- 9 of them are the symmetric bivariate co-movement tests from Section 1 (which, per the caveat above Section 1's table, cannot by construction distinguish H3a from H3b), and only 6 are the genuinely directional D4-controlled tests from Section 2. Do not cite "12/15" as "15 lead-lag tests" -- read it as 9 co-movement tests plus 6 directional tests.

## Comparison to Berlin (int_mss_lead_lag / e1_regressions.py test_h3)

Berlin (thesis p. 91, replicated directionally by e1_regressions.py): H3b (status-leads-POI) CONFIRMED, H3a (POI-leads-status) REJECTED. See Section 1 above for whether Hamburg's bivariate H3a/H3b directions and significance match or diverge from this -- read alongside the cadence caveat (Hamburg lag_k is a different real-year window than Berlin's lag_k at the same integer value).

## Limitations

- **No multiple-comparison correction** applied across hypotheses/lag_k values, same convention as e1_regressions.py.
- **Cadence non-equivalence**: Hamburg lag_k values are NOT the same real-year horizon as Berlin's (see cadence caveat above) -- any cross-city lag_k-by-lag_k comparison must control for this, not read integer lag_k values as equivalent.
- **Dynamik-index window mismatch** (ADR-0014 Pillar 2): Hamburg's Sozialmonitoring Dynamik is a 3-year window vs Berlin's 2-year window -- not used directly as a regression variable here (only status_index/dynamism_score/delta_dynamism_t are), but flagged since it is a known non-equivalence in the same source pillar.
- **Stadtteil cluster count (95) below ADR-0014's ~104-105 estimate**: a two-stage gap, fully accounted for (int_ewr_socioeco_hamburg_disagg.sql header). Stage 1 (104/105 -> 99): 5 Stadtteile have no Sozialmonitoring score at all -- Altenwerder (02712), Gut Moor (02703), Neuwerk (02121), Steinwerder (02118), Waltershof (02119), all uninhabited/harbor areas below the >300-resident scoring threshold (documented in H1-geo-signoff.md). Stage 2 (99 -> 95, newly verified for this iteration): 4 further Stadtteile DO get a crosswalk match (Gebiete resolve to them) but `stg_hamburg_ewr_stadtteil` has zero EWR rows for them, so `ewr_composite_t` is NULL and they drop out of the D4-covariate regression via the n<10/NaN mask in `run_ols_clustered` -- Kleiner Grasbrook (02117, harbor terminal), Finkenwerder (02120, Airbus works/airport), Neuland (02702, industrial estate), Moorburg (02711, industrial/former power plant), confirmed by direct query against `stg_hamburg_ewr_stadtteil` to be a genuine no-EWR-coverage gap (same >300-resident-threshold rationale as Stage 1), not a join/name-matching bug. **Re-verified per #330**: dropping `unemployment_share` from the D4 composite (#329) removes one column's worth of potential NULLs but does not change which Stadtteile have zero EWR rows for the two *remaining* indicators, so the observed cluster count is unchanged at 95 after the #330 regeneration (re-run on 2026-07-31 against the corrected 2-indicator composite; see the observed cluster count (95) reported in Section 2 above -- same value as the pre-#330 run, confirmed not coincidental but structural, since the NULL-driving gap is at the Stadtteil/EWR-coverage level, not the indicator-count level).
- **Epic B framing**: directional/exploratory revival work (CLAUDE.md) -- honest reporting of whatever direction/significance is observed is the bar, not matching Berlin's thesis-confirmed result.
- **Forward note on isolating a clean #329-only effect (E-C2, geo-signoff `docs/epic-h/330-hh-e5-regen-geo-signoff.md`, citation-only, no action required now):** this regeneration's before/after comparison is confounded between #329 (D4-composite fix) and other `develop` changes landed since the stale run (2026-07-10), most plausibly #313's Hamburg merged-Stadtteil crosswalk fix and/or #307 -- see the "Note on the 5/15 -> 3/15 significance drop" above. If a clean #329-only effect is ever needed for citation, re-run the pre-#329 (3-indicator) composite against the *current* data snapshot to isolate it, rather than relying on the 2026-07-10 stale numbers as the pre-#329 baseline.
