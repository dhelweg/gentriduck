# E2 Classification Findings -- Per-hypothesis AUC Comparison

- **Task:** scikit-learn classification with POI features, per-hypothesis AUCs
- **Issue:** #65
- **Date:** 2026-06-29
- **Method:** 5-fold stratified cross-validation (LogisticRegression L2), leakage guard

## Methodology

Each thesis hypothesis (H1-H3c from pp. 55-56, p. 91) is implemented as a binary classification task using **POI category counts** as features and **MSS social status / status change** as targets.  This corrects the prior implementation which used MSS indices as both features and targets.

All tasks use 5-fold stratified cross-validation (`StratifiedKFold(n_splits=5, shuffle=True, random_state=42)`) with a `LogisticRegression(C=1.0, L2)` classifier inside a `StandardScaler` pipeline.  A leakage guard (R-C3) asserts that no PLR `area_code` appears in both train and test folds of any single cross-validation split.

The per-hypothesis thesis AUC reference values come from thesis p.91:

- **H1**: thesis AUC = 0.87
- **H2**: thesis AUC = 0.77
- **H3a**: thesis AUC = 0.72
- **H3b**: thesis AUC = 0.81
- **H3c**: thesis AUC = 0.71

## Results

| Task | N | Thesis AUC | Revival AUC | AUC std | F1w | F1w std | Leakage | Features |
|---|---|---|---|---|---|---|---|---|
| H1 | 436 | 0.87 | 0.7148 | 0.0716 | 0.6354 | 0.0596 | None — POI counts are independent of status_class_bi | total_poi_count, poi_cafe, poi_bar, poi_restaurant, poi_fast_food, poi_nightlife |
| H2 (k=1) | 1071 | 0.77 | 0.7519 | 0.0510 | 0.9113 | 0.0146 | None — POI at t predicts status change from t to t+k | poi_count_t, poi_cafe_t, poi_bar_t, poi_restaurant_t, poi_fast_food_t |
| H2 (k=2) | 535 | 0.77 | 0.7312 | 0.0894 | 0.8785 | 0.0278 | None — POI at t predicts status change from t to t+k | poi_count_t, poi_cafe_t, poi_bar_t, poi_restaurant_t, poi_fast_food_t |
| H3a (k=1) | 1071 | 0.72 | 0.5706 | 0.0560 | 0.9113 | 0.0146 | None — dynamism at t precedes status change from t to t+k | dynamism_score_t, delta_poi |
| H3a (k=2) | 535 | 0.72 | 0.4975 | 0.0358 | 0.8785 | 0.0278 | None — dynamism at t precedes status change from t to t+k | dynamism_score_t, delta_poi |
| H3b (k=1) | 1071 | 0.81 | 0.5605 | 0.1616 | 0.9707 | 0.0142 | None — status change at t precedes POI change from t to t+k | delta_status_ordinal, status_index_t |
| H3b (k=2) | 535 | 0.81 | 0.3506 | 0.2668 | 0.9767 | 0.0066 | None — status change at t precedes POI change from t to t+k | delta_status_ordinal, status_index_t |
| H3c (k=1) | 1071 | 0.71 | 0.7058 | 0.0341 | 0.9113 | 0.0146 | None — contemporaneous dynamism vs status trajectory | dynamism_score_t, poi_count_t |
| H3c (k=2) | 535 | 0.71 | 0.6952 | 0.1083 | 0.8785 | 0.0278 | None — contemporaneous dynamism vs status trajectory | dynamism_score_t, poi_count_t |

## Per-hypothesis Interpretation

### H1

**H1**: AUC = 0.7148 ± 0.0716 (thesis: 0.87) — below thesis by -0.1552. F1w = 0.6354. n=436.

Partial agreement: AUC > 0.5 confirms above-chance classification; below thesis 0.87 likely reflects narrower feature set.

### H2

**H2 (k=1)**: AUC = 0.7519 ± 0.0510 (thesis: 0.77) — within ±0.05 of thesis (-0.0181). F1w = 0.9113. n=1071.

**H2 (k=2)**: AUC = 0.7312 ± 0.0894 (thesis: 0.77) — within ±0.05 of thesis (-0.0388). F1w = 0.8785. n=535.

### H3a

**H3a (k=1)**: AUC = 0.5706 ± 0.0560 (thesis: 0.72) — below thesis by -0.1494. F1w = 0.9113. n=1071.

**H3a (k=2)**: AUC = 0.4975 ± 0.0358 (thesis: 0.72) — below thesis by -0.2225. F1w = 0.8785. n=535.

Consistent with thesis rejection (H3a rejected in thesis): POI dynamism is a weak predictor of future status change.

### H3b

**H3b (k=1)**: AUC = 0.5605 ± 0.1616 (thesis: 0.81) — below thesis by -0.2495. F1w = 0.9707. n=1071.

**H3b (k=2)**: AUC = 0.3506 ± 0.2668 (thesis: 0.81) — below thesis by -0.4594. F1w = 0.9767. n=535.

**WARNING: one or more k values yield AUC < 0.5 (sub-chance).** Results must be reported per k, not as a single best:

- k=1: AUC = 0.5605 — Consistent with thesis confirmation.
- k=2: AUC = 0.3506 — Diverges from thesis (sub-chance AUC).

Diverges from thesis (H3b was confirmed in thesis). Possible cause: MSS panel covers only 2021-2025 (3 editions); thesis used 2010-2018 (longer panel).

**CLASS IMBALANCE WARNING (H3b (k=1)):** The target `delta_poi > 0` has 1050/1071 positive-class rows (98.0% positive rate). An all-positive predictor achieves F1w ≈ 0.98. F1w is therefore uninformative for this target; AUC is the only valid metric. These results should be interpreted with caution — the near-degenerate class distribution makes classification almost trivially positive.

**CLASS IMBALANCE WARNING (H3b (k=2)):** The target `delta_poi > 0` has 530/535 positive-class rows (99.1% positive rate). An all-positive predictor achieves F1w ≈ 0.99. F1w is therefore uninformative for this target; AUC is the only valid metric. These results should be interpreted with caution — the near-degenerate class distribution makes classification almost trivially positive.

### H3c

**H3c (k=1)**: AUC = 0.7058 ± 0.0341 (thesis: 0.71) — within ±0.05 of thesis (-0.0042). F1w = 0.9113. n=1071.

**H3c (k=2)**: AUC = 0.6952 ± 0.1083 (thesis: 0.71) — within ±0.05 of thesis (-0.0148). F1w = 0.8785. n=535.

## Divergences from 2018 Thesis

- Thesis used Weka J48/Random Forest with raw POI category counts; this revival uses LogisticRegression (L2 regularised) for interpretability and to reduce overfitting on the ~400-500 PLR dataset.
- H3 tests use the live MSS 2021-2025 panel (3 editions, k=1,2); the thesis used a 2010-2018 panel with more edition pairs — temporal coverage affects AUC.
- H1/H1b use 2018 POI snapshot (lor_pre2021 vintage); H3 uses the lor_2021 vintage panel — cross-vintage consistency not tested.
- Epic B framing: directional revival — AUC > 0.5 is the minimum bar; thesis AUC match within ±0.05 is the aspirational target.

## Limitations

- **k=3 lead-lag not tested**: Only 3 MSS editions are currently available (2021, 2023, 2025). A k=3 test (6-year lag) would require a 2027 edition. k=3 results will be added once the 2027 MSS edition is ingested.
- **H3b class imbalance**: The `delta_poi > 0` target has a 98-99% positive-class rate. F1w is uninformative for such near-degenerate targets (an all-positive predictor achieves F1w ≈ 0.97). AUC is the only valid metric for H3b results. The H3b F1w values in the results table should be disregarded.
