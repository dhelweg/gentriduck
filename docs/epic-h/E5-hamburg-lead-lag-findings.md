# E5 Hamburg Lead-Lag Findings -- Independent H3a/H3b/H3c Re-Test (H-C3, #160)

- **Task:** H-C3 (#160) -- annual-cadence Hamburg lead-lag model + independent H3a/H3b re-test
- **Issue:** #160 (H-C3); #129 (Stadtteil SE-clustering binding requirement) **(Follow-up now tracked: #265 (H-reg-SE) — see `docs/planning/deferred-work-audit-2026-07.md`.)**
- **Date:** 2026-07-10
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
| H3a | Spearman k=1 (1yr) | 9285 | -0.0215 | 0.0384 | Yes | negative | negative | PASS |
| H3b | Spearman k=1 (1yr) | 9285 | -0.0215 | 0.0384 | Yes | negative | negative | PASS |
| H3c | Spearman k=1 (1yr) | 10139 | 0.0759 | 0.0000 | Yes | negative | positive | FAIL |
| H3a | Spearman k=2 (2yr) | 8427 | -0.0180 | 0.0988 | No | negative | negative | PASS |
| H3b | Spearman k=2 (2yr) | 8427 | -0.0180 | 0.0988 | No | negative | negative | PASS |
| H3c | Spearman k=2 (2yr) | 9283 | 0.0848 | 0.0000 | Yes | negative | positive | FAIL |
| H3a | Spearman k=3 (3yr) | 7569 | -0.0161 | 0.1603 | No | negative | negative | PASS |
| H3b | Spearman k=3 (3yr) | 7569 | -0.0161 | 0.1603 | No | negative | negative | PASS |
| H3c | Spearman k=3 (3yr) | 8425 | 0.0929 | 0.0000 | Yes | negative | positive | FAIL |

**Directional agreement (bivariate): 6/9. Significant: 5/9.**

## Section 2: D4-controlled OLS, Stadtteil-clustered standard errors (#129 binding)

> ewr_composite_t (D4 baseline LEVEL, index-definition.md §4.3) enters as a covariate here -- per #129 / H1-geo-signoff.md Condition 2, standard errors on the primary change-predictor coefficient are clustered at Stadtteil grain (`run_ols_clustered`, CR1 sandwich estimator, Cameron, Gelbach & Miller 2011; Cameron & Miller 2015). Effective D4 sample size is Stadtteil count (observed: 95 distinct clusters per lag_k below; ~104-105 Stadtteile expected per ADR-0014), not Gebiet (row) count.

| Hyp | Test | N | N clusters | Value | p-value | Sig | Expected Dir | Actual Dir | Match | ewr_composite_t coef (p) |
|---|---|---|---|---|---|---|---|---|---|---|
| H3a (D4-controlled, Stadtteil-clustered) | OLS-clustered k=1 (1yr) | 9118 | 95 | -0.0058 | 0.0964 | No | negative | negative | PASS | -2.75e-04 (p=0.9370) |
| H3b (D4-controlled, Stadtteil-clustered) | OLS-clustered k=1 (1yr) | 9118 | 95 | -0.1165 | 0.1388 | No | negative | negative | PASS | -0.0023 (p=0.8007) |
| H3a (D4-controlled, Stadtteil-clustered) | OLS-clustered k=2 (2yr) | 8277 | 95 | -0.0018 | 0.6125 | No | negative | negative | PASS | -0.0081 (p=0.2089) |
| H3b (D4-controlled, Stadtteil-clustered) | OLS-clustered k=2 (2yr) | 8277 | 95 | -0.0257 | 0.6109 | No | negative | negative | PASS | -0.0130 (p=0.1817) |
| H3a (D4-controlled, Stadtteil-clustered) | OLS-clustered k=3 (3yr) | 7436 | 95 | -0.0057 | 0.1642 | No | negative | negative | PASS | -0.0168 (p=0.0573) |
| H3b (D4-controlled, Stadtteil-clustered) | OLS-clustered k=3 (3yr) | 7436 | 95 | -0.0721 | 0.2158 | No | negative | negative | PASS | -0.0056 (p=0.4800) |

**Directional agreement (D4-controlled, clustered): 6/6. Significant: 0/6.**

## Overall scorecard

**Total directional agreement: 12/15. Significant: 5/15.**

## Comparison to Berlin (int_mss_lead_lag / e1_regressions.py test_h3)

Berlin (thesis p. 91, replicated directionally by e1_regressions.py): H3b (status-leads-POI) CONFIRMED, H3a (POI-leads-status) REJECTED. See Section 1 above for whether Hamburg's bivariate H3a/H3b directions and significance match or diverge from this -- read alongside the cadence caveat (Hamburg lag_k is a different real-year window than Berlin's lag_k at the same integer value).

## Limitations

- **No multiple-comparison correction** applied across hypotheses/lag_k values, same convention as e1_regressions.py.
- **Cadence non-equivalence**: Hamburg lag_k values are NOT the same real-year horizon as Berlin's (see cadence caveat above) -- any cross-city lag_k-by-lag_k comparison must control for this, not read integer lag_k values as equivalent.
- **Dynamik-index window mismatch** (ADR-0014 Pillar 2): Hamburg's Sozialmonitoring Dynamik is a 3-year window vs Berlin's 2-year window -- not used directly as a regression variable here (only status_index/dynamism_score/delta_dynamism_t are), but flagged since it is a known non-equivalence in the same source pillar.
- **Stadtteil cluster count (95) below ADR-0014's ~104-105 estimate**: a two-stage gap, fully accounted for (int_ewr_socioeco_hamburg_disagg.sql header). Stage 1 (104/105 -> 99): 5 Stadtteile have no Sozialmonitoring score at all -- Altenwerder (02712), Gut Moor (02703), Neuwerk (02121), Steinwerder (02118), Waltershof (02119), all uninhabited/harbor areas below the >300-resident scoring threshold (documented in H1-geo-signoff.md). Stage 2 (99 -> 95, newly verified for this iteration): 4 further Stadtteile DO get a crosswalk match (Gebiete resolve to them) but `stg_hamburg_ewr_stadtteil` has zero EWR rows for them, so `ewr_composite_t` is NULL and they drop out of the D4-covariate regression via the n<10/NaN mask in `run_ols_clustered` -- Kleiner Grasbrook (02117, harbor terminal), Finkenwerder (02120, Airbus works/airport), Neuland (02702, industrial estate), Moorburg (02711, industrial/former power plant), confirmed by direct query against `stg_hamburg_ewr_stadtteil` to be a genuine no-EWR-coverage gap (same >300-resident-threshold rationale as Stage 1), not a join/name-matching bug. See the observed cluster count (95) reported in Section 2 above.
- **Epic B framing**: directional/exploratory revival work (CLAUDE.md) -- honest reporting of whatever direction/significance is observed is the bar, not matching Berlin's thesis-confirmed result.
