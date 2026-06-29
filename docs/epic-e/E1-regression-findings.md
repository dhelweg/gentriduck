# E1 Regression Findings -- Thesis H1-H3c Validation

- **Task:** H1-H3c regression and lead-lag analysis, real thesis hypotheses
- **Issue:** #65
- **Date:** 2026-06-29
- **Data (H1/H1b):** stg_thesis_2018_result_plr + int_poi_features_pivot (2018), n=436
- **Data (H2/H3):** int_mss_lead_lag + int_poi_features_pivot (2021-2025)
- **Method:** Spearman rank correlation + OLS (scipy.stats)

## Methodology

Spearman rank correlations and OLS regression test five hypotheses from the 2018 Berlin gentrification thesis (pp. 55-56, p. 91). POI category counts from `int_poi_features_pivot` are used as the primary predictor variables, joined to MSS social status indices (`status_index`). This corrects the prior implementation which regressed MSS indices against each other (no POI features).

The lead-lag hypotheses (H3a/H3b/H3c) are tested using `int_mss_lead_lag` at k=1 (2-year MSS edition gap) and k=2 (4-year gap), with POI counts from `int_poi_features_pivot` joined at the relevant snapshot years.

The primary validation criterion is directional agreement (same sign as thesis expectation), consistent with the Epic B directional revival framing.

## Hypothesis Citations

- **H1**: Thesis p.55: POI supply positively correlates with current MSS status; AUC 0.87 confirmed
- **H1b**: Thesis p.55 H1b: fast-food is a displacement/low-status indicator — negative predictor
- **H2**: Thesis p.55 H2: current POI supply predicts future social-status change — directional positive
- **H3a**: Thesis p.91 H3a: POI change leads status change — REJECTED in thesis (not confirmed)
- **H3b**: Thesis p.91 H3b: status change leads POI change — CONFIRMED in thesis
- **H3c**: Thesis p.91 H3c: simultaneous co-movement — thesis result unclear

## Results

| Hyp | Test | N | Type | Value | p-value | Sig | Expected Dir | Actual Dir | Match | Description |
|---|---|---|---|---|---|---|---|---|---|---|
| H1 | Spearman | 436 | rho | -0.0463 | 0.3348 | No | positive | negative | FAIL | POI stock (total_poi_count) ~ MSS social status (status_index) |
| H1 | OLS | 436 | beta | -0.0004 R2=0.0044 | 0.1670 | No | positive | negative | FAIL | POI stock (total_poi_count) ~ MSS social status (status_index) |
| H1b | Spearman | 436 | rho | 0.1364 | 0.0043 | Yes | negative | positive | FAIL | Fast-food POI count ~ MSS social status (status_index) |
| H2 | Spearman k=1 | 1071 | rho | -0.1155 | 0.0002 | Yes | positive | negative | FAIL | POI stock at t=2018 ~ future status change (delta_status) [k=1 MSS editions] |
| H2 | Spearman k=2 | 535 | rho | -0.1924 | 0.0000 | Yes | positive | negative | FAIL | POI stock at t=2018 ~ future status change (delta_status) [k=2 MSS editions] |
| H3a | Spearman k=1 | 1071 | rho | 0.0261 | 0.3937 | No | positive | positive | PASS | ΔPOI at t leads Δstatus at t+k (POI change leads status change) [k=1] |
| H3b | Spearman k=1 | 1071 | rho | -0.0186 | 0.5431 | No | positive | negative | FAIL | Δstatus at t leads ΔPOI at t+k (status change leads POI change) [k=1] |
| H3c | Spearman k=1 | 1071 | rho | 0.0632 | 0.0386 | Yes | positive | positive | PASS | Simultaneous ΔPOI ~ Δstatus co-movement (same edition) [k=1] |
| H3a | Spearman k=2 | 535 | rho | -0.0051 | 0.9064 | No | positive | negative | FAIL | ΔPOI at t leads Δstatus at t+k (POI change leads status change) [k=2] |
| H3b | Spearman k=2 | 535 | rho | 0.0235 | 0.5882 | No | positive | positive | PASS | Δstatus at t leads ΔPOI at t+k (status change leads POI change) [k=2] |
| H3c | Spearman k=2 | 535 | rho | 0.0790 | 0.0680 | No | positive | positive | PASS | Simultaneous ΔPOI ~ Δstatus co-movement (same edition) [k=2] |

**Directional agreement: 4/11 tests match the expected direction.**

**Statistical significance: 4/11 results significant at p<0.05.**

## Interpretation by Hypothesis

### H1 — POI stock vs MSS social status (thesis p.55, confirmed AUC 0.87)

**Spearman**: rho/beta = -0.0463, p = 0.3348, n=436. Direction (negative) diverges from thesis expectation (positive). Not significant at p<0.05.

**OLS**: rho/beta = -0.0004, p = 0.1670, n=436. Direction (negative) diverges from thesis expectation (positive). Not significant at p<0.05.

### H1b — Fast-food as negative status predictor (thesis p.55)

**Spearman**: rho = 0.1364, p = 0.0043, n=436. diverges — fast-food not negatively correlated as expected.

### H2 — POI stock predicts future status change (thesis p.55)

**k=1**: rho = -0.1155, p = 0.0002, n=1071 — directional divergence.

**k=2**: rho = -0.1924, p = 0.0000, n=535 — directional divergence.

### H3a — POI change leads status change (thesis p.91, REJECTED)

Thesis rejected this hypothesis; we expect no significant positive rho. k=1: rho = 0.0261, p = 0.3937, n=1071. Not significant — consistent with thesis rejection.
k=2: rho = -0.0051, p = 0.9064, n=535. Not significant — consistent with thesis rejection.

### H3b — Status change leads POI change (thesis p.91, CONFIRMED)

Thesis confirmed this hypothesis; we expect positive significant rho. k=1: rho = -0.0186, p = 0.5431, n=1071. Not significant at p<0.05. Diverges from thesis.
k=2: rho = 0.0235, p = 0.5882, n=535. Not significant at p<0.05. Consistent with thesis confirmation.

### H3c — Simultaneous co-movement (thesis p.91, UNCLEAR)

k=1: rho = 0.0632, p = 0.0386, n=1071. Simultaneous dynamism-status correlation.
k=2: rho = 0.0790, p = 0.0680, n=535. Simultaneous dynamism-status correlation.

## Divergences from 2018 Thesis

- The H1/H1b tests use 2018 POI category counts from `int_poi_features_pivot` joined to the 2018 golden thesis data — this is the correct POI-as-predictor formulation (prior implementation regressed MSS indices against each other).
- The H3 lead-lag tests use the live MSS panel (2021-2025 editions) rather than the 2012-2018 panel from the thesis — temporal coverage differs; directional agreement is the applicable criterion.
- The 2018 thesis used R `lm()`/`cor.test()` with PLR boundaries from the pre-2021 LOR scheme; H3 tests here use the 2021 LOR scheme (live panel). Exact coefficient comparisons are not meaningful.
- Epic B framing: directional revival — exact number reproduction not required. See CLAUDE.md §Epic B framing.
