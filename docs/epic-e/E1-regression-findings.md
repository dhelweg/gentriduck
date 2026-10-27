# E1 Regression Findings -- Thesis H1-H3c Validation

- **Task:** H1-H3c regression and lead-lag analysis, real thesis hypotheses
- **Issue:** #65 / #115
- **Date:** 2026-10-27
- **Data (H1/H1b):** stg_thesis_2018_result_plr + int_poi_features_pivot (2018), n=436
- **Data (H2/H3 MSS 2021–2025):** int_mss_lead_lag (lor_2021) + int_poi_features_pivot
- **Data (H2/H3 MSS 2015–2019, B7):** int_mss_lead_lag (lor_pre2021) + int_poi_features_pivot
- **Data (H2/H3 EWR):** int_ewr_lead_lag + int_poi_features_pivot (2014–2020, same-era as thesis)
- **Method:** Spearman / OLS for H1, H2 and H3c; cross-lagged partial Spearman with a Bezirksregion cluster-bootstrap 95% CI for H3a/H3b (`analysis/directional_inference.py`). Every result needs significance to count -- see Scoring.

## Methodology

Spearman rank correlations and OLS regression test five hypotheses from the 2018 Berlin gentrification thesis (pp. 55-56, p. 91). POI category counts from `int_poi_features_pivot` are used as the primary predictor variables.

**OA-A.4 (#168) rework:** every hypothesis is ALSO tested against the Offering Advantage (OA) location-quotient predictor -- the thesis's actual `oa_*`/`prev_oa_*` construct (reference/system/80_result_h1_plr.sql, 80_result_h2_plr.sql; `int_poi_offering_advantage` #166, ADR-0017) -- rows tagged `(OA)` in the test column. Raw-count rows are retained unlabelled for continuity and comparison; OA rows are the ticket's primary swapped predictor. `oa_mean` (H1/H1b) and `oa_mean_t`/`delta_oa_mean_t` (H2/H3) are the mean of the 4 upscaling-relevant domain OAs (Gastronomy, Entertainment, Retail, Services -- geo-DS Condition C-3, domain-level primary) from `load_oa_category_panel` -- see docstrings in `analysis/e1_regressions.py`. OA is available at PLR scale only (built from `fct_poi_development`/`int_osm_poi_plr_weighted`, both PLR-grain); BZR/Bezirk (B10 #120) and the EWR same-era panel keep their pre-existing raw-count/dynamism predictors unchanged -- a documented Epic B directional-divergence scope boundary, not a defect (CLAUDE.md "Epic B framing"), left for a future ticket if an OA-BZR/Bezirk or OA-EWR bridge is wanted.

**Three comparison sets for H2/H3:**

1. **MSS panel (2021–2025):** Uses `int_mss_lead_lag` (lor_2021) — best ground truth (official Berlin social monitoring index) but a different era and index than the thesis.
2. **MSS pre-2021 panel (2015–2019, B7 #117):** Uses `int_mss_lead_lag` (lor_pre2021) — thesis-era boundary system (447 PLRs). Enables same-era H3b lead-lag. k=1: 2015→2017, 2017→2019 pairs; k=2: 2015→2019. Z-scores not cross-vintage comparable.
3. **EWR same-era (2014–2020):** Uses `int_ewr_lead_lag` — the same data source and timeframe as the 2018 thesis. k=2 (2014→2016) matches the thesis lead-lag gap exactly. delta_ewr is metric (z-score arithmetic diff) so OLS is also valid.

## Scoring

Each row gets one verdict (2026-10-26; previously a row "passed" whenever its sign matched, so a rho of -0.05 with p = 0.33 counted as confirming the thesis):

- **SUPPORTED** -- significant, in the thesis's expected direction.
- **CONTRADICTED** -- significant, in the opposite direction.
- **NOT SIGNIFICANT** -- the data cannot tell (whatever the sign).
- **NO DATA** -- not testable on this panel.

Significance = the 95% cluster-bootstrap CI excludes 0 for cross-lagged rows, else p < 0.05. Epic B is a *directional* revival (exact numbers need not match), but a direction only counts when the data actually establish it.

## H3a vs H3b: how direction is tested

H3a (commercial change precedes status change) and H3b (status change precedes commercial change) are claims about ORDER. Around each pivot edition e1 the prior window [e0, e1] and the following window [e1, e2] never overlap:

- H3a = partial rho(dPOI prior, dStatus following | dStatus prior, D4)
- H3b = partial rho(dStatus prior, dPOI following | dPOI prior, D4)

Each controls for the outcome's own prior change. **Before 2026-10-26 the two were not separable:** on the MSS panels H3b was Spearman of the same two arrays as H3a with the arguments swapped (identical by symmetry), the OA variants and the EWR H3a correlated two changes over the same window, and only one direction per panel was ever genuinely lagged. Rank-based because MSS status is ordinal (index-definition.md §3.2).

## Hypothesis Citations

- **H1**: Thesis p.55; verdict Tabelle 6-16 (PDF p.91): H1 proven (check mark). POI supply positively correlates with social status; because status_index is inverse-numeric (higher=worse, index-definition.md §5 polarity table), expected Spearman(poi, status_index) is negative
- **H1b**: Thesis p.55 H1b; verdict Tabelle 6-16: proven (check mark). Fast-food as contested proxy for low-status / displacement pressure (see gentrification literature); more fast-food → lower status → higher status_index (inverse-numeric, index-definition.md §5), expected direction positive
- **H2**: Thesis p.55 H2; verdict Tabelle 6-16: INCONCLUSIVE (0, 'kein klares Bild' -- best model only mediocre). Current POI supply predicts future social-status improvement; delta_status_ordinal = tk - t (positive = worsened, index-definition.md §5 polarity), so expected direction is negative
- **H3a**: Thesis Tabelle 6-16 (PDF p.91): H3a REJECTED (cross mark, 'wenig spricht fuer H3a'). Cross-lagged partial Spearman rho(dPOI_P, dStatus_F | dStatus_P, D4) with a Bezirksregion cluster-bootstrap CI (analysis/directional_inference.py); POI = C5-corrected dynamism (index-definition.md §2.4) or OA; delta_status_ordinal inverse-numeric so expected direction is negative
- **H3b**: Thesis Tabelle 6-16 (PDF p.91): H3b TENTATIVELY supported -- '(check mark)', 'eher bestaetigt', 'leichte Tendenz' -- not confirmed. Cross-lagged partial Spearman rho(dStatus_P, dPOI_F | dPOI_P, D4) with a Bezirksregion cluster-bootstrap CI (analysis/directional_inference.py); improved status = negative delta, so expected direction is negative
- **H3c**: Thesis Tabelle 6-16 (PDF p.91): H3c INCONCLUSIVE (0, 'kein klares Bild'). Simultaneous co-movement; status_index inverse-numeric (index-definition.md §5), expected direction negative

## Results — Section 1: H1/H1b (2018 cross-section)

| Hyp | Test | N | Statistic | Value [95% CI] | p-value | Expected dir | Verdict | Description |
|---|---|---|---|---|---|---|---|---|
| H1 | Spearman | 436 | rho | -0.0483 | 0.3142 | negative | NOT SIGNIFICANT | POI stock (total_poi_count) ~ MSS social status (status_index) |
| H1 | OLS | 436 | beta | -4.65e-04 R2=0.0034 | 0.2220 | negative | NOT SIGNIFICANT | POI stock (total_poi_count) ~ MSS social status (status_index) |
| H1b | Spearman | 436 | rho | 0.1337 | 0.0052 | positive | SUPPORTED | Fast-food POI count ~ MSS social status (status_index) |
| H1 | Spearman (OA) | 433 | rho | 0.1483 | 0.0020 | negative | CONTRADICTED | OA-quotient basket (mean of 4 upscaling-relevant domain OAs) ~ MSS social status |
| H1 | OLS (OA) | 433 | beta | 0.1420 R2=0.0080 | 0.0637 | negative | NOT SIGNIFICANT | OA-quotient basket (mean of 4 upscaling-relevant domain OAs) ~ MSS social status |
| H1b | Spearman (OA) | 341 | rho | 0.3450 | 0.0000 | positive | SUPPORTED | Fast-food OA quotient ~ MSS social status (status_index) |

**Verdicts:** Supported 2/6 · Contradicted 1 · Not significant 3

## Results — Section 2: H2/H3 MSS Panel (modern era, 2021–2025)

> Different era and index than thesis. MSS is a better ground truth but covers 2021–2025, not 2012–2018. Three editions -> one cross-lagged pivot (2023).

| Hyp | Test | N | Statistic | Value [95% CI] | p-value | Expected dir | Verdict | Description |
|---|---|---|---|---|---|---|---|---|
| H2 | Spearman k=1 | 1071 | rho | -0.1102 | 0.0003 | negative | SUPPORTED | Current-edition POI stock ~ future status change [k=1 MSS editions, 2021+ panel] |
| H2 | Spearman (OA) k=1 | 1060 | rho | -0.0988 | 0.0013 | negative | SUPPORTED | Current-edition OA-quotient basket ~ future status change [k=1 MSS editions, 2021+ panel] |
| H2 | Spearman k=2 | 535 | rho | -0.1856 | 0.0000 | negative | SUPPORTED | Current-edition POI stock ~ future status change [k=2 MSS editions, 2021+ panel] |
| H2 | Spearman (OA) k=2 | 528 | rho | -0.1473 | 0.0007 | negative | SUPPORTED | Current-edition OA-quotient basket ~ future status change [k=2 MSS editions, 2021+ panel] |
| H3a | Cross-lagged k=1 | 535 | partial rho | 0.0799 [0.001, 0.152] | 0.0649 | negative | CONTRADICTED | Prior POI change [e0→e1] predicts later status change [e1→e2], given prior status change + D4 (POI leads status) [C5-corrected dynamism; k=1; pivot edition(s) [2023]; no D4 control -- unavailable at the pivot] |
| H3b | Cross-lagged k=1 | 535 | partial rho | -0.1277 [-0.214, -0.035] | 0.0031 | negative | SUPPORTED | Prior status change [e0→e1] predicts later POI change [e1→e2], given prior POI change + D4 (status leads POI) [C5-corrected dynamism; k=1; pivot edition(s) [2023]; no D4 control -- unavailable at the pivot] |
| H3a | Cross-lagged (OA) k=1 | 528 | partial rho | -0.0537 [-0.141, 0.043] | 0.2184 | negative | NOT SIGNIFICANT | Prior POI change [e0→e1] predicts later status change [e1→e2], given prior status change + D4 (POI leads status) [OA-quotient basket; k=1; pivot edition(s) [2023]; no D4 control -- unavailable at the pivot] |
| H3b | Cross-lagged (OA) k=1 | 528 | partial rho | -0.1557 [-0.260, -0.054] | 0.0003 | negative | SUPPORTED | Prior status change [e0→e1] predicts later POI change [e1→e2], given prior POI change + D4 (status leads POI) [OA-quotient basket; k=1; pivot edition(s) [2023]; no D4 control -- unavailable at the pivot] |
| H3c | Spearman k=1 | 1071 | rho | 0.0555 | 0.0696 | negative | NOT SIGNIFICANT | Simultaneous dynamism ~ status_index co-movement (same edition) [k=1] |
| H3c | Spearman (OA) k=1 | 1060 | rho | 0.1250 | 0.0000 | negative | CONTRADICTED | Simultaneous OA-quotient ~ status_index co-movement (same edition) [k=1] |
| H3c | Spearman k=2 | 535 | rho | 0.0558 | 0.1977 | negative | NOT SIGNIFICANT | Simultaneous dynamism ~ status_index co-movement (same edition) [k=2] |
| H3c | Spearman (OA) k=2 | 528 | rho | 0.1907 | 0.0000 | negative | CONTRADICTED | Simultaneous OA-quotient ~ status_index co-movement (same edition) [k=2] |

**Verdicts:** Supported 6/12 · Contradicted 3 · Not significant 3

**Direction (cross-lagged H3a vs H3b):**

- **Cross-lagged k=1:** status change leads commercial change (H3b; the thesis's direction) (H3a CONTRADICTED, H3b SUPPORTED)
- **Cross-lagged (OA) k=1:** status change leads commercial change (H3b; the thesis's direction) (H3a NOT SIGNIFICANT, H3b SUPPORTED)

## Results — Section 3: H2/H3 MSS Pre-2021 Panel (thesis-era, 2015–2019, B7 #117)

> lor_pre2021 boundary system (447 PLRs). Same era as the thesis. Z-scores normalised within lor_pre2021 -- NOT comparable to Section 2. One cross-lagged pivot (2017).

| Hyp | Test | N | Statistic | Value [95% CI] | p-value | Expected dir | Verdict | Description |
|---|---|---|---|---|---|---|---|---|
| H2 | Spearman k=1 | 1305 | rho | -0.0254 | 0.3587 | negative | NOT SIGNIFICANT | Current-edition POI stock ~ future status change [k=1 MSS editions, 2015–2019 panel] |
| H2 | Spearman (OA) k=1 | 1287 | rho | -0.0436 | 0.1182 | negative | NOT SIGNIFICANT | Current-edition OA-quotient basket ~ future status change [k=1 MSS editions, 2015–2019 panel] |
| H2 | Spearman k=2 | 869 | rho | -0.0411 | 0.2266 | negative | NOT SIGNIFICANT | Current-edition POI stock ~ future status change [k=2 MSS editions, 2015–2019 panel] |
| H2 | Spearman (OA) k=2 | 853 | rho | -0.0017 | 0.9601 | negative | NOT SIGNIFICANT | Current-edition OA-quotient basket ~ future status change [k=2 MSS editions, 2015–2019 panel] |
| H3a | Cross-lagged k=1 | 869 | partial rho | 0.0367 [-0.025, 0.096] | 0.2809 | negative | NOT SIGNIFICANT | Prior POI change [e0→e1] predicts later status change [e1→e2], given prior status change + D4 (POI leads status) [C5-corrected dynamism; k=1; pivot edition(s) [2015, 2017]; D4 control] |
| H3b | Cross-lagged k=1 | 869 | partial rho | -0.0112 [-0.082, 0.062] | 0.7417 | negative | NOT SIGNIFICANT | Prior status change [e0→e1] predicts later POI change [e1→e2], given prior POI change + D4 (status leads POI) [C5-corrected dynamism; k=1; pivot edition(s) [2015, 2017]; D4 control] |
| H3a | Cross-lagged (OA) k=1 | 851 | partial rho | -0.0660 [-0.136, 0.006] | 0.0544 | negative | NOT SIGNIFICANT | Prior POI change [e0→e1] predicts later status change [e1→e2], given prior status change + D4 (POI leads status) [OA-quotient basket; k=1; pivot edition(s) [2015, 2017]; D4 control] |
| H3b | Cross-lagged (OA) k=1 | 848 | partial rho | 0.0342 [-0.023, 0.088] | 0.3211 | negative | NOT SIGNIFICANT | Prior status change [e0→e1] predicts later POI change [e1→e2], given prior POI change + D4 (status leads POI) [OA-quotient basket; k=1; pivot edition(s) [2015, 2017]; D4 control] |
| H3c | Spearman k=1 | 1305 | rho | -0.0034 | 0.9020 | negative | NOT SIGNIFICANT | Simultaneous dynamism ~ status_index co-movement (same edition) [k=1] |
| H3c | Spearman (OA) k=1 | 1287 | rho | 0.1755 | 0.0000 | negative | CONTRADICTED | Simultaneous OA-quotient ~ status_index co-movement (same edition) [k=1] |
| H3c | Spearman k=2 | 869 | rho | 0.0236 | 0.4876 | negative | NOT SIGNIFICANT | Simultaneous dynamism ~ status_index co-movement (same edition) [k=2] |
| H3c | Spearman (OA) k=2 | 853 | rho | 0.1710 | 0.0000 | negative | CONTRADICTED | Simultaneous OA-quotient ~ status_index co-movement (same edition) [k=2] |
| H3c | Spearman k=3 | 434 | rho | -0.0585 | 0.2242 | negative | NOT SIGNIFICANT | Simultaneous dynamism ~ status_index co-movement (same edition) [k=3] |
| H3c | Spearman (OA) k=3 | 425 | rho | 0.1660 | 0.0006 | negative | CONTRADICTED | Simultaneous OA-quotient ~ status_index co-movement (same edition) [k=3] |

**Verdicts:** Supported 0/14 · Contradicted 3 · Not significant 11

**Direction (cross-lagged H3a vs H3b):**

- **Cross-lagged k=1:** no directional evidence either way (H3a NOT SIGNIFICANT, H3b NOT SIGNIFICANT)
- **Cross-lagged (OA) k=1:** no directional evidence either way (H3a NOT SIGNIFICANT, H3b NOT SIGNIFICANT)

## Results — Section 4: H2/H3 EWR Same-Era (2014–2020, thesis source and timeframe)

> Same data source and timeframe as the 2018 thesis. Annual panel: many cross-lagged pivots per area, all absorbed by the cluster bootstrap. POI side is the raw count via the dominant pre-2021 crosswalk (~35% of lor_2021 PLRs share a count with a neighbour -- pseudo-replication, see load_ewr_lead_lag_data).

| Hyp | Test | N | Statistic | Value [95% CI] | p-value | Expected dir | Verdict | Description |
|---|---|---|---|---|---|---|---|---|
| H2 | Spearman k=1 | 3252 | rho | -0.2609 | 0.0000 | negative | SUPPORTED | POI stock at year_t ~ delta_ewr over k=1 annual years [EWR 2014–2020, same-era] |
| H2 | OLS k=1 | 3252 | beta | -4.94e-05 R2=0.0099 | 0.0000 | negative | SUPPORTED | POI stock at year_t ~ delta_ewr over k=1 annual years [EWR 2014–2020, same-era] |
| H2 | Spearman k=2 | 2710 | rho | -0.3129 | 0.0000 | negative | SUPPORTED | POI stock at year_t ~ delta_ewr over k=2 annual years [EWR 2014–2020, same-era] |
| H2 | OLS k=2 | 2710 | beta | -1.12e-04 R2=0.0212 | 0.0000 | negative | SUPPORTED | POI stock at year_t ~ delta_ewr over k=2 annual years [EWR 2014–2020, same-era] |
| H2 | Spearman k=4 | 1626 | rho | -0.3911 | 0.0000 | negative | SUPPORTED | POI stock at year_t ~ delta_ewr over k=4 annual years [EWR 2014–2020, same-era] |
| H2 | OLS k=4 | 1626 | beta | -2.64e-04 R2=0.0443 | 0.0000 | negative | SUPPORTED | POI stock at year_t ~ delta_ewr over k=4 annual years [EWR 2014–2020, same-era] |
| H3a | Cross-lagged (EWR) k=1 | 2710 | partial rho | -0.0744 [-0.122, -0.025] | 0.0001 | negative | SUPPORTED | Prior POI change [e0→e1] predicts later status change [e1→e2], given prior status change + D4 (POI leads status) [raw POI count; k=1; pivot edition(s) [2015, 2016, 2017, 2018, 2019]; D4 control] |
| H3b | Cross-lagged (EWR) k=1 | 2710 | partial rho | -0.0732 [-0.119, -0.027] | 0.0001 | negative | SUPPORTED | Prior status change [e0→e1] predicts later POI change [e1→e2], given prior POI change + D4 (status leads POI) [raw POI count; k=1; pivot edition(s) [2015, 2016, 2017, 2018, 2019]; D4 control] |
| H3c | Spearman k=1 | 3252 | rho | -0.4157 | 0.0000 | negative | SUPPORTED | poi_count_t ~ ewr_composite_t (contemporaneous) [k=1, EWR 2014–2020, same-era] |
| H3a | Cross-lagged (EWR) k=2 | 1626 | partial rho | -0.1845 [-0.253, -0.114] | 0.0000 | negative | SUPPORTED | Prior POI change [e0→e1] predicts later status change [e1→e2], given prior status change + D4 (POI leads status) [raw POI count; k=2; pivot edition(s) [2016, 2017, 2018]; D4 control] |
| H3b | Cross-lagged (EWR) k=2 | 1626 | partial rho | -0.1042 [-0.172, -0.036] | 0.0000 | negative | SUPPORTED | Prior status change [e0→e1] predicts later POI change [e1→e2], given prior POI change + D4 (status leads POI) [raw POI count; k=2; pivot edition(s) [2016, 2017, 2018]; D4 control] |
| H3c | Spearman k=2 | 2710 | rho | -0.4138 | 0.0000 | negative | SUPPORTED | poi_count_t ~ ewr_composite_t (contemporaneous) [k=2, EWR 2014–2020, same-era] |
| H3c | Spearman k=4 | 1626 | rho | -0.4132 | 0.0000 | negative | SUPPORTED | poi_count_t ~ ewr_composite_t (contemporaneous) [k=4, EWR 2014–2020, same-era] |

**Verdicts:** Supported 13/13 · Contradicted 0 · Not significant 0

**Direction (cross-lagged H3a vs H3b):**

- **Cross-lagged (EWR) k=1:** both directions supported -- no single leading series (H3a SUPPORTED, H3b SUPPORTED)
- **Cross-lagged (EWR) k=2:** both directions supported -- no single leading series (H3a SUPPORTED, H3b SUPPORTED)

## Results — Section 5: H1/H2/H3 at BZR Scale (Bezirksregion, ~137 units, B10 #120)

> Population-weighted rollup from PLR. MAUP: coarser scales smooth and inflate correlations (index-definition.md §8, B10-geo-signoff.md). Cross-lagged CIs cluster by Bezirk.

| Hyp | Test | N | Statistic | Value [95% CI] | p-value | Expected dir | Verdict | Description |
|---|---|---|---|---|---|---|---|---|
| H1 | Spearman | 137 | rho | 0.0672 | 0.4352 | negative | NOT SIGNIFICANT | POI stock (total_poi_count) ~ MSS social status (status_index) |
| H1 | OLS | 137 | beta | 6.49e-05 R2=0.0000 | 0.9486 | negative | NOT SIGNIFICANT | POI stock (total_poi_count) ~ MSS social status (status_index) |
| H1b | Spearman | 137 | rho | 0.2411 | 0.0045 | positive | SUPPORTED | Fast-food POI count ~ MSS social status (status_index) |
| H2 | Spearman k=1 | 560 | rho | -0.0362 | 0.3931 | negative | NOT SIGNIFICANT | Current-edition POI stock ~ future status change [k=1 MSS editions, BZR lor_2021 panel] |
| H2 | Spearman k=2 | 280 | rho | -0.0574 | 0.3384 | negative | NOT SIGNIFICANT | Current-edition POI stock ~ future status change [k=2 MSS editions, BZR lor_2021 panel] |
| H3a | Cross-lagged k=1 | 280 | partial rho | 0.0011 [-0.075, 0.077] | 0.9851 | negative | NOT SIGNIFICANT | Prior POI change [e0→e1] predicts later status change [e1→e2], given prior status change + D4 (POI leads status) [C5-corrected dynamism; k=1; pivot edition(s) [2017, 2023]; no D4 control -- unavailable at the pivot] |
| H3b | Cross-lagged k=1 | 280 | partial rho | 0.0103 [-0.137, 0.185] | 0.8636 | negative | NOT SIGNIFICANT | Prior status change [e0→e1] predicts later POI change [e1→e2], given prior POI change + D4 (status leads POI) [C5-corrected dynamism; k=1; pivot edition(s) [2017, 2023]; no D4 control -- unavailable at the pivot] |
| H3c | Spearman k=1 | 560 | rho | 0.0782 | 0.0643 | negative | NOT SIGNIFICANT | Simultaneous dynamism ~ status_index co-movement (same edition) [k=1] |
| H3c | Spearman k=2 | 280 | rho | 0.1532 | 0.0102 | negative | CONTRADICTED | Simultaneous dynamism ~ status_index co-movement (same edition) [k=2] |

**Verdicts:** Supported 1/9 · Contradicted 1 · Not significant 7

**Direction (cross-lagged H3a vs H3b):**

- **Cross-lagged k=1:** no directional evidence either way (H3a NOT SIGNIFICANT, H3b NOT SIGNIFICANT)

## Results — Section 6: H1/H2/H3 at Bezirk Scale (District, 12 units, B10 #120)

> n = 12 districts: very low power; indicative only (B10-geo-signoff.md §MAUP). Each district is its own cluster, and a 12-cluster bootstrap CI is itself unreliable -- treat every verdict here as indicative.

| Hyp | Test | N | Statistic | Value [95% CI] | p-value | Expected dir | Verdict | Description |
|---|---|---|---|---|---|---|---|---|
| H1 | Spearman | 12 | rho | -0.1888 | 0.5567 | negative | NOT SIGNIFICANT | POI stock (total_poi_count) ~ MSS social status (status_index) |
| H1 | OLS | 12 | beta | -7.04e-05 R2=0.0043 | 0.8398 | negative | NOT SIGNIFICANT | POI stock (total_poi_count) ~ MSS social status (status_index) |
| H1b | Spearman | 12 | rho | 0.0350 | 0.9141 | positive | NOT SIGNIFICANT | Fast-food POI count ~ MSS social status (status_index) |
| H2 | Spearman k=1 | 48 | rho | -0.3595 | 0.0121 | negative | SUPPORTED | Current-edition POI stock ~ future status change [k=1 MSS editions, Bezirk lor_2021 panel] |
| H2 | Spearman k=2 | 24 | rho | -0.4866 | 0.0159 | negative | SUPPORTED | Current-edition POI stock ~ future status change [k=2 MSS editions, Bezirk lor_2021 panel] |
| H3a | Cross-lagged k=1 | 24 | partial rho | -0.0245 [-0.234, 0.159] | 0.9115 | negative | NOT SIGNIFICANT | Prior POI change [e0→e1] predicts later status change [e1→e2], given prior status change + D4 (POI leads status) [C5-corrected dynamism; k=1; pivot edition(s) [2017, 2023]; no D4 control -- unavailable at the pivot] |
| H3b | Cross-lagged k=1 | 24 | partial rho | -0.2475 [-0.695, 0.422] | 0.2549 | negative | NOT SIGNIFICANT | Prior status change [e0→e1] predicts later POI change [e1→e2], given prior POI change + D4 (status leads POI) [C5-corrected dynamism; k=1; pivot edition(s) [2017, 2023]; no D4 control -- unavailable at the pivot] |
| H3c | Spearman k=1 | 48 | rho | 0.0916 | 0.5357 | negative | NOT SIGNIFICANT | Simultaneous dynamism ~ status_index co-movement (same edition) [k=1] |
| H3c | Spearman k=2 | 24 | rho | 0.0162 | 0.9403 | negative | NOT SIGNIFICANT | Simultaneous dynamism ~ status_index co-movement (same edition) [k=2] |

**Verdicts:** Supported 2/9 · Contradicted 0 · Not significant 7

**Direction (cross-lagged H3a vs H3b):**

- **Cross-lagged k=1:** no directional evidence either way (H3a NOT SIGNIFICANT, H3b NOT SIGNIFICANT)

## Overall Scorecard

- **MSS modern (2021–2025):** Supported 8/18 · Contradicted 4 · Not significant 6
- **MSS pre-2021 (2015–2019):** Supported 0/14 · Contradicted 3 · Not significant 11
- **EWR same-era (2014–2020):** Supported 13/13 · Contradicted 0 · Not significant 0
- **BZR scale:** Supported 1/9 · Contradicted 1 · Not significant 7
- **Bezirk scale:** Supported 2/9 · Contradicted 0 · Not significant 7

**All tests:** Supported 24/63 · Contradicted 8 · Not significant 31

### Which series leads? (cross-lagged H3a vs H3b)

**MSS modern (2021–2025)**

- **Cross-lagged k=1:** status change leads commercial change (H3b; the thesis's direction) (H3a CONTRADICTED, H3b SUPPORTED)
- **Cross-lagged (OA) k=1:** status change leads commercial change (H3b; the thesis's direction) (H3a NOT SIGNIFICANT, H3b SUPPORTED)

**MSS pre-2021 (2015–2019)**

- **Cross-lagged k=1:** no directional evidence either way (H3a NOT SIGNIFICANT, H3b NOT SIGNIFICANT)
- **Cross-lagged (OA) k=1:** no directional evidence either way (H3a NOT SIGNIFICANT, H3b NOT SIGNIFICANT)

**EWR same-era (2014–2020)**

- **Cross-lagged (EWR) k=1:** both directions supported -- no single leading series (H3a SUPPORTED, H3b SUPPORTED)
- **Cross-lagged (EWR) k=2:** both directions supported -- no single leading series (H3a SUPPORTED, H3b SUPPORTED)

**BZR scale**

- **Cross-lagged k=1:** no directional evidence either way (H3a NOT SIGNIFICANT, H3b NOT SIGNIFICANT)

**Bezirk scale**

- **Cross-lagged k=1:** no directional evidence either way (H3a NOT SIGNIFICANT, H3b NOT SIGNIFICANT)

## Divergences from 2018 Thesis

- **D1 polarity correction**: `status_index` is inverse-numeric -- lower = higher social status (index-definition.md §5). All expected directions corrected.
- **H3 predictor (MSS panels)**: C5-corrected dynamism (and the OA basket), not raw POI counts -- avoids the OSM coverage-growth artefact.
- **H3a/H3b method**: the thesis inferred direction from lagged-feature classifier fit (Weka) plus correlations; here it is a cross-lagged partial rank correlation with cluster-robust CIs. Same question, a design that can actually separate the two directions.
- **Panels**: MSS 2021–2025 (lor_2021) and 2015–2019 (lor_pre2021) vs the thesis's 2012–2018 EWR; EWR 2014–2020 is the same-era comparison.
- **No multiple-comparison correction** across hypotheses -- with this many rows, an isolated SUPPORTED cell is weak evidence on its own.
- Epic B framing: directional revival (CLAUDE.md §Epic B framing) -- exact numbers need not match, but a direction must be established to count.

## Limitations

- **One pivot per MSS panel**: three editions give a single cross-lagged pivot (2023 modern, 2017 pre-2021); k=2 needs five editions and is not testable.
- **EWR composite null pre-2014** (migration_background_share absent) -- the EWR panel's cross-lags start at 2014.
- **Cross-vintage z-scores not comparable** (lor_pre2021 vs lor_2021).
- **Granger logic is predictive, not causal**: a SUPPORTED cross-lag says one series' past change carries information about the other's next change beyond the outcome's own history -- not that it causes it (thesis weakness W3).
- **MAUP**: PLR-scale results may change with area definition (A6 MAUP check).
