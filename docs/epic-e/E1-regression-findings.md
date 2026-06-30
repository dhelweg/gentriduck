# E1 Regression Findings -- Thesis H1-H3c Validation

- **Task:** H1-H3c regression and lead-lag analysis, real thesis hypotheses
- **Issue:** #65 / #115
- **Date:** 2026-06-30
- **Data (H1/H1b):** stg_thesis_2018_result_plr + int_poi_features_pivot (2018), n=436
- **Data (H2/H3 MSS 2021–2025):** int_mss_lead_lag (lor_2021) + int_poi_features_pivot
- **Data (H2/H3 MSS 2015–2019, B7):** int_mss_lead_lag (lor_pre2021) + int_poi_features_pivot
- **Data (H2/H3 EWR):** int_ewr_lead_lag + int_poi_features_pivot (2014–2020, same-era as thesis)
- **Method:** Spearman rank correlation + OLS (scipy.stats)

## Methodology

Spearman rank correlations and OLS regression test five hypotheses from the 2018 Berlin gentrification thesis (pp. 55-56, p. 91). POI category counts from `int_poi_features_pivot` are used as the primary predictor variables.

**Three comparison sets for H2/H3:**

1. **MSS panel (2021–2025):** Uses `int_mss_lead_lag` (lor_2021) — best ground truth (official Berlin social monitoring index) but a different era and index than the thesis.
2. **MSS pre-2021 panel (2015–2019, B7 #117):** Uses `int_mss_lead_lag` (lor_pre2021) — thesis-era boundary system (447 PLRs). Enables same-era H3b lead-lag. k=1: 2015→2017, 2017→2019 pairs; k=2: 2015→2019. Z-scores not cross-vintage comparable.
3. **EWR same-era (2014–2020):** Uses `int_ewr_lead_lag` — the same data source and timeframe as the 2018 thesis. k=2 (2014→2016) matches the thesis lead-lag gap exactly. delta_ewr is metric (z-score arithmetic diff) so OLS is also valid.

The primary validation criterion is directional agreement (same sign as thesis expectation), consistent with the Epic B directional revival framing.

## Hypothesis Citations

- **H1**: Thesis p.55: POI supply positively correlates with social status; because status_index is inverse-numeric (higher=worse, index-definition.md §5 polarity table), expected Spearman(poi, status_index) is negative
- **H1b**: Thesis p.55 H1b: fast-food as contested proxy for low-status / displacement pressure (see gentrification literature); more fast-food → lower status → higher status_index (inverse-numeric, index-definition.md §5), expected direction positive
- **H2**: Thesis p.55 H2: current POI supply predicts future social-status improvement; delta_status_ordinal = tk - t (positive = worsened, index-definition.md §5 polarity), so expected direction is negative
- **H3a**: Thesis p.91 H3a: POI change leads status change — REJECTED in thesis (not confirmed); uses C5-corrected delta_dynamism_t (index-definition.md §2.4; int_mss_lead_lag.sql D3 C5 note); delta_status_ordinal inverse-numeric so expected direction is negative
- **H3b**: Thesis p.91 H3b: status change leads POI change — CONFIRMED in thesis; delta_status_ordinal inverse-numeric (index-definition.md §5 polarity), improved status = negative delta, expected Spearman(delta_status_ordinal, delta_dynamism) is negative
- **H3c**: Thesis p.91 H3c: simultaneous co-movement — thesis result unclear; status_index inverse-numeric (index-definition.md §5), expected direction negative

## Results — Section 1: H1/H1b (2018 cross-section, unchanged)

| Hyp | Test | N | Type | Value | p-value | Sig | Expected Dir | Actual Dir | Match | Description |
|---|---|---|---|---|---|---|---|---|---|---|
| H1 | Spearman | 436 | rho | -0.0463 | 0.3348 | No | negative | negative | PASS | POI stock (total_poi_count) ~ MSS social status (status_index) |
| H1 | OLS | 436 | beta | -3.97e-04 R2=0.0044 | 0.1670 | No | negative | negative | PASS | POI stock (total_poi_count) ~ MSS social status (status_index) |
| H1b | Spearman | 436 | rho | 0.1364 | 0.0043 | Yes | positive | positive | PASS | Fast-food POI count ~ MSS social status (status_index) |

## Results — Section 2: H2/H3 MSS Panel (modern era, 2021–2025)

> Different era and index than thesis. MSS is a better ground truth but covers 2021–2025, not 2012–2018.

| Hyp | Test | N | Type | Value | p-value | Sig | Expected Dir | Actual Dir | Match | Description |
|---|---|---|---|---|---|---|---|---|---|---|
| H2 | Spearman k=1 | 1071 | rho | -0.1155 | 0.0002 | Yes | negative | negative | PASS | Current-edition POI stock ~ future status change [k=1 MSS editions, 2021+ panel] |
| H2 | Spearman k=2 | 535 | rho | -0.1924 | 0.0000 | Yes | negative | negative | PASS | Current-edition POI stock ~ future status change [k=2 MSS editions, 2021+ panel] |
| H3a | Spearman k=1 | 535 | rho | 0.0593 | 0.1706 | No | negative | positive | FAIL | C5-corrected Δdynamism at t leads Δstatus at t+k (POI change leads status change) [k=1] |
| H3b | Spearman k=1 | 535 | rho | 0.0593 | 0.1706 | No | negative | positive | FAIL | Δstatus at t leads Δdynamism at t+k (status change leads POI change) [k=1] |
| H3c | Spearman k=1 | 1071 | rho | 0.0632 | 0.0386 | Yes | negative | positive | FAIL | Simultaneous dynamism ~ status_index co-movement (same edition) [k=1] |
| H3a | Spearman k=2 | 0 | rho | N/A | N/A | No | negative | N/A | FAIL | C5-corrected Δdynamism at t leads Δstatus at t+k (POI change leads status change) [k=2] |
| H3b | Spearman k=2 | 0 | rho | N/A | N/A | No | negative | N/A | FAIL | Δstatus at t leads Δdynamism at t+k (status change leads POI change) [k=2] |
| H3c | Spearman k=2 | 535 | rho | 0.0790 | 0.0680 | No | negative | positive | FAIL | Simultaneous dynamism ~ status_index co-movement (same edition) [k=2] |

**Directional agreement (H2/H3 MSS): 2/8. Significant: 3/8.**

## Results — Section 3: H2/H3 MSS Pre-2021 Panel (thesis-era, 2015–2019, B7 #117)

> lor_pre2021 boundary system (447 PLRs). Same-era H2/H3 panel as thesis. Z-scores normalised within lor_pre2021 population — NOT cross-vintage comparable to Section 2.
> k=1 pairs: 2015→2017, 2017→2019. k=2 pair: 2015→2019 (4-year lag, matches thesis H3b gap).

| Hyp | Test | N | Type | Value | p-value | Sig | Expected Dir | Actual Dir | Match | Description |
|---|---|---|---|---|---|---|---|---|---|---|
| H2 | Spearman k=1 | 871 | rho | -0.0344 | 0.3100 | No | negative | negative | PASS | Current-edition POI stock ~ future status change [k=1 MSS editions, 2015–2019 panel] |
| H2 | Spearman k=2 | 435 | rho | -0.0470 | 0.3279 | No | negative | negative | PASS | Current-edition POI stock ~ future status change [k=2 MSS editions, 2015–2019 panel] |
| H3a | Spearman k=1 | 435 | rho | 0.0571 | 0.2344 | No | negative | positive | FAIL | C5-corrected Δdynamism at t leads Δstatus at t+k (POI change leads status change) [k=1] |
| H3b | Spearman k=1 | 435 | rho | 0.0571 | 0.2344 | No | negative | positive | FAIL | Δstatus at t leads Δdynamism at t+k (status change leads POI change) [k=1] |
| H3c | Spearman k=1 | 871 | rho | 0.0310 | 0.3607 | No | negative | positive | FAIL | Simultaneous dynamism ~ status_index co-movement (same edition) [k=1] |
| H3a | Spearman k=2 | 0 | rho | N/A | N/A | No | negative | N/A | FAIL | C5-corrected Δdynamism at t leads Δstatus at t+k (POI change leads status change) [k=2] |
| H3b | Spearman k=2 | 0 | rho | N/A | N/A | No | negative | N/A | FAIL | Δstatus at t leads Δdynamism at t+k (status change leads POI change) [k=2] |
| H3c | Spearman k=2 | 435 | rho | 0.1036 | 0.0308 | Yes | negative | positive | FAIL | Simultaneous dynamism ~ status_index co-movement (same edition) [k=2] |

**Directional agreement (H2/H3 MSS pre-2021): 2/8. Significant: 1/8.**

## Results — Section 4: H2/H3 EWR Same-Era (2014–2020, thesis source and timeframe)

> Same data source and timeframe as the 2018 thesis. k=2 (2014→2016) is the direct comparison window.
> delta_ewr is metric (z-score arithmetic difference) — OLS valid unlike MSS ordinal delta.

| Hyp | Test | N | Type | Value | p-value | Sig | Expected Dir | Actual Dir | Match | Description |
|---|---|---|---|---|---|---|---|---|---|---|
| H2 | Spearman k=1 | 3252 | rho | -0.2606 | 0.0000 | Yes | negative | negative | PASS | POI stock at year_t ~ delta_ewr over k=1 annual years [EWR 2014–2020, same-era] |
| H2 | OLS k=1 | 3252 | beta | -3.87e-05 R2=0.0099 | 0.0000 | Yes | negative | negative | PASS | POI stock at year_t ~ delta_ewr over k=1 annual years [EWR 2014–2020, same-era] |
| H2 | Spearman k=2 | 2710 | rho | -0.3117 | 0.0000 | Yes | negative | negative | PASS | POI stock at year_t ~ delta_ewr over k=2 annual years [EWR 2014–2020, same-era] |
| H2 | OLS k=2 | 2710 | beta | -8.70e-05 R2=0.0209 | 0.0000 | Yes | negative | negative | PASS | POI stock at year_t ~ delta_ewr over k=2 annual years [EWR 2014–2020, same-era] |
| H2 | Spearman k=4 | 1626 | rho | -0.3908 | 0.0000 | Yes | negative | negative | PASS | POI stock at year_t ~ delta_ewr over k=4 annual years [EWR 2014–2020, same-era] |
| H2 | OLS k=4 | 1626 | beta | -2.08e-04 R2=0.0436 | 0.0000 | Yes | negative | negative | PASS | POI stock at year_t ~ delta_ewr over k=4 annual years [EWR 2014–2020, same-era] |
| H3a | Spearman k=1 | 3252 | rho | -0.1693 | 0.0000 | Yes | negative | negative | PASS | Δpoi leads Δewr_composite [k=1 annual years, EWR 2014–2020, same-era] |
| H3b | Spearman k=1 | 2710 | rho | -0.1694 | 0.0000 | Yes | negative | negative | PASS | Δewr_composite at t leads Δpoi [k=1 annual years, EWR 2014–2020, same-era] |
| H3c | Spearman k=1 | 3252 | rho | -0.4122 | 0.0000 | Yes | negative | negative | PASS | poi_count_t ~ ewr_composite_t (contemporaneous) [k=1, EWR 2014–2020, same-era] |
| H3a | Spearman k=2 | 2710 | rho | -0.2318 | 0.0000 | Yes | negative | negative | PASS | Δpoi leads Δewr_composite [k=2 annual years, EWR 2014–2020, same-era] |
| H3b | Spearman k=2 | 2168 | rho | -0.2171 | 0.0000 | Yes | negative | negative | PASS | Δewr_composite at t leads Δpoi [k=2 annual years, EWR 2014–2020, same-era] |
| H3c | Spearman k=2 | 2710 | rho | -0.4111 | 0.0000 | Yes | negative | negative | PASS | poi_count_t ~ ewr_composite_t (contemporaneous) [k=2, EWR 2014–2020, same-era] |
| H3a | Spearman k=4 | 1626 | rho | -0.3236 | 0.0000 | Yes | negative | negative | PASS | Δpoi leads Δewr_composite [k=4 annual years, EWR 2014–2020, same-era] |
| H3b | Spearman k=4 | 1084 | rho | -0.2229 | 0.0000 | Yes | negative | negative | PASS | Δewr_composite at t leads Δpoi [k=4 annual years, EWR 2014–2020, same-era] |
| H3c | Spearman k=4 | 1626 | rho | -0.4120 | 0.0000 | Yes | negative | negative | PASS | poi_count_t ~ ewr_composite_t (contemporaneous) [k=4, EWR 2014–2020, same-era] |

**Directional agreement (H2/H3 EWR): 15/15. Significant: 15/15.**

## Overall Scorecard

**Total directional agreement: 22/34. Significant: 20/34.**

**MSS modern panel (H1+H2+H3, 2021–2025): 5/11 direction, 4/11 significant.**
**MSS pre-2021 panel (H2+H3 only, 2015–2019): 2/8 direction, 1/8 significant.**
**EWR same-era (H2+H3 only): 15/15 direction, 15/15 significant.**

## Divergences from 2018 Thesis

- **D1 polarity correction**: `status_index` is inverse-numeric — lower value = higher social status (index-definition.md §5 polarity table). All expected_dir values corrected accordingly.
- **H3 predictor (MSS panel)**: Uses C5-corrected `delta_dynamism_t` from `int_mss_lead_lag`, not raw `delta_poi` (avoids OSM coverage growth artefact).
- **H2/H3 MSS**: tested on 2021–2025 live panel (lor_2021, 535–1071 rows) vs thesis's 2012–2018 EWR cross-section. Different era, different index.
- **H2/H3 EWR**: tested on 2014–2020 annual panel (lor_2021, ~542 rows per lag). Same source as thesis. k=2 (2014→2016) matches thesis gap. delta_ewr is metric (arithmetic z-score diff); OLS additionally applied where MSS ordinal prohibits it.
- **No multiple-comparison correction** applied across hypotheses.
- Epic B framing: directional revival — exact number reproduction not required. See CLAUDE.md §Epic B framing.

## Limitations

- **k=3 MSS not tested (modern panel)**: Only 3 lor_2021 MSS editions available (2021, 2023, 2025); k=3 requires 2027 edition.
- **EWR composite null pre-2014**: migration_background_share absent before 2014 makes ewr_composite null for 2008–2013 — EWR panel limited to 2014–2020.
- **Cross-vintage z-scores not comparable**: lor_pre2021 and lor_2021 z-scores are normalised within their respective PLR populations and must not be compared directly.
- **MAUP sensitivity**: results are PLR-only and may be sensitive to area definition.
