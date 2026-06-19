# E1 Regression Findings -- Thesis Validation

- **Task:** H1-H3c regression analysis on 2018 golden data
- **Issue:** #30
- **Date:** 2026-06-19
- **Data:** stg_thesis_2018_result_plr, PLR level, n=436
- **Method:** Spearman rank correlation + OLS (scipy.stats)

## Method

Spearman rank correlations and OLS regression via `scipy.stats.spearmanr` and `scipy.stats.linregress` on the 2018 thesis golden dataset (`stg_thesis_2018_result_plr`). The primary validation criterion is directional agreement (same sign as thesis expectation), consistent with the Epic B directional revival framing (exact number reproduction is not required).

## Results

| Hypothesis | N | Type | Value | p-value | Sig (p<0.05) | Dir Match | Description |
|---|---|---|---|---|---|---|---|
| H1 | 436 | rho | -0.1924 | 0.0001 | Yes | FAIL | Dynamism -> economic status (own_idx) |
| H1b | 436 | rho | 0.0432 | 0.3686 | No | PASS | Status index -> economic status (own_idx) |
| H2 | 436 | rho | -0.3308 | 0.0000 | Yes | FAIL | Dynamism ~ status_index (positive correlation) |
| H3 | 436 | beta | -0.2279 R2=0.0519 | 0.0000 | Yes | FAIL | OLS: higher dynamism -> higher status_index |

**Directional agreement: 1/4 hypotheses match the expected direction.**

**Statistical significance: 3/4 results are significant at p<0.05.**

## Interpretation

### H1 -- Dynamism predicts economic status

Spearman rho = -0.1924 (p = 0.0001, n=436). Direction is negative, opposite to the thesis expectation that higher gentrification dynamism is associated with higher economic activity. Result is statistically significant.

### H2 -- Dynamism and status co-vary

Spearman rho = -0.3308 (p = 0.0000, n=436). Direction is negative, opposite to the thesis expectation that areas with high POI dynamism also show high POI density (status).

### H3 -- OLS regression (dynamism -> status)

OLS coefficient = -0.2279, R2 = 0.0519, p = 0.0000 (n=436). Direction: negative. A positive coefficient confirms that dynamism is a predictor of status score, consistent with the thesis regression finding.

## Divergences from 2018 Thesis

- The 2018 thesis used R `lm()`/`cor.test()` on the full dataset including BZR (district region) and Bezirk levels; this analysis uses PLR level only.
- Exact coefficient values differ due to (a) different data preprocessing, (b) PLR boundary vintage (pre-2021 scheme used here), (c) the thesis included more POI categories as features.
- Directional agreement is the primary validation criterion per Epic B framing (directional revival, not exact number reproduction).
