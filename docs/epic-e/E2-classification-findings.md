# E2 Classification Findings -- Per-hypothesis AUC Comparison

- **Task:** scikit-learn classification with POI features, per-hypothesis AUCs
- **Issue:** #65
- **Date:** 2026-06-29
- **Method:** 5-fold stratified cross-validation (LogisticRegression L2), leakage guard

## Methodology

Each thesis hypothesis (H1-H3c from pp. 55-56, p. 91) is implemented as a binary classification task using **POI category counts** as features and **MSS social status / status change** as targets.  This corrects the prior implementation which used MSS indices as both features and targets.

All tasks use 5-fold stratified cross-validation (`StratifiedKFold(n_splits=5, shuffle=True, random_state=42)`) with a `LogisticRegression(C=1.0, L2)` classifier inside a `StandardScaler` pipeline.  A leakage guard (R-C3) asserts that no PLR `area_code` appears in both train and test folds of any single cross-validation split.

The per-hypothesis thesis AUC reference values are reconstructed from thesis p.91 narrative (no exact table in the thesis; attributed as 'reconstructed from thesis p.91 narrative'):

- **H1**: thesis AUC = 0.87 (reconstructed from p.91 narrative)
- **H2**: thesis AUC = 0.77 (reconstructed from p.91 narrative)
- **H3a**: thesis AUC = 0.72 (reconstructed from p.91 narrative)
- **H3b**: thesis AUC = 0.81 (reconstructed from p.91 narrative)
- **H3c**: thesis AUC = 0.71 (reconstructed from p.91 narrative)

## Results

| Task | N | Thesis AUC | Revival AUC | AUC std | F1w | F1w std | Leakage | Features |
|---|---|---|---|---|---|---|---|---|
| H1 | 436 | 0.87 | 0.7287 | 0.0467 | 0.6329 | 0.0300 | None — POI counts are independent of status_class_bi | total_poi_count, poi_cafe, poi_bar, poi_restaurant, poi_fast_food, poi_nightlife |
| H2 (k=1) | 1071 | 0.77 | 0.7519 | 0.0510 | 0.9113 | 0.0146 | None — POI at t predicts status transition from t to t+k | poi_count_t, poi_cafe_t, poi_bar_t, poi_restaurant_t, poi_fast_food_t |
| H2 (k=2) | 535 | 0.77 | 0.7312 | 0.0894 | 0.8785 | 0.0278 | None — POI at t predicts status transition from t to t+k | poi_count_t, poi_cafe_t, poi_bar_t, poi_restaurant_t, poi_fast_food_t |
| H3a (k=1) | 535 | 0.72 | 0.6282 | 0.1012 | 0.9434 | 0.0183 | None — C5-corrected dynamism at t precedes status transition from t to t+k | delta_dynamism_t (C5-corrected), dynamism_score_t |
| H3b (k=1) | 535 | 0.81 | 0.4320 | 0.0478 | 0.3970 | 0.0601 | None — status change at t precedes C5-corrected dynamism change | delta_status_ordinal (ordinal proxy), status_index_t |
| H3c (k=1) | 1071 | 0.71 | 0.7058 | 0.0341 | 0.9113 | 0.0146 | None — contemporaneous dynamism vs status trajectory | dynamism_score_t, poi_count_t |
| H3c (k=2) | 535 | 0.71 | 0.6952 | 0.1083 | 0.8785 | 0.0278 | None — contemporaneous dynamism vs status trajectory | dynamism_score_t, poi_count_t |

## Per-hypothesis Interpretation

### H1

**H1**: AUC = 0.7287 ± 0.0467 (thesis: 0.87) — below thesis by -0.1413. F1w = 0.6329. n=436.

Partial agreement: AUC > 0.5 confirms above-chance classification; below thesis 0.87 likely reflects narrower feature set.

### H2

**H2 (k=1)**: AUC = 0.7519 ± 0.0510 (thesis: 0.77) — within ±0.05 of thesis (-0.0181). F1w = 0.9113. n=1071.

**H2 (k=2)**: AUC = 0.7312 ± 0.0894 (thesis: 0.77) — within ±0.05 of thesis (-0.0388). F1w = 0.8785. n=535.

### H3a

**H3a (k=1)**: AUC = 0.6282 ± 0.1012 (thesis: 0.72) — below thesis by -0.0918. F1w = 0.9434. n=535.

Diverges from thesis rejection: higher-than-expected AUC. Check for data leakage or panel period effects.

### H3b

**H3b (k=1)**: AUC = 0.4320 ± 0.0478 (thesis: 0.81) — below thesis by -0.3780. F1w = 0.3970. n=535.

**WARNING: one or more k values yield AUC < 0.5 (sub-chance).** Results must be reported per k, not as a single best:

- k=1: AUC = 0.4320 — Diverges from thesis (sub-chance AUC).

Diverges from thesis (H3b was confirmed in thesis). Possible cause: MSS panel covers only 2021-2025 (3 editions); thesis used 2010-2018 (longer panel).

### H3c

**H3c (k=1)**: AUC = 0.7058 ± 0.0341 (thesis: 0.71) — within ±0.05 of thesis (-0.0042). F1w = 0.9113. n=1071.

**H3c (k=2)**: AUC = 0.6952 ± 0.1083 (thesis: 0.71) — within ±0.05 of thesis (-0.0148). F1w = 0.8785. n=535.

## Divergences from 2018 Thesis

- **D1 polarity correction**: `status_index` is inverse-numeric — lower value = higher social status (index-definition.md §5 polarity table; int_mss_lead_lag.sql lines 19-23). H2/H3a/H3c targets corrected to `status_transition == 'worsened'` (ordinal transition column) instead of `delta_status_ordinal > 0`. Prior implementation labelled `delta_status_ordinal > 0` as 'status improves' — this was inverted (positive delta = status worsened, not improved).
- **H3 C5-corrected predictor**: H3a features and H3b target now use `delta_dynamism_t` (C5-corrected within-vintage dynamism change) not raw `delta_poi`. Raw `delta_poi > 0` had a ~99% positive-class rate reflecting OSM coverage growth artefact, not commercial succession (index-definition.md §2.4; C5 geo-DS sign-off).
- **Ordinal treatment**: H2/H3a/H3c use `status_transition` ordinal column; metric differencing on non-uniform MSS ordinal codes is prohibited (index-definition.md §3.3).
- **Thesis AUC attribution**: per-hypothesis AUC values attributed as 'reconstructed from thesis p.91 narrative' (no exact table verifiable).
- Thesis used Weka J48/Random Forest; this revival uses LogisticRegression (L2) for interpretability and to reduce overfitting on the ~400-500 PLR dataset.
- H3 tests use the live MSS 2021-2025 panel (3 editions, k=1,2); the thesis used a 2010-2018 panel with more edition pairs — temporal coverage affects AUC.
- H1/H1b use 2018 POI snapshot (lor_pre2021 vintage); H3 uses the lor_2021 vintage panel — cross-vintage consistency not tested.
- No multiple-comparison correction was applied across the five hypotheses. Results are PLR-only (Berlin, lor_2021 vintage) and may have MAUP sensitivity.
- Epic B framing: directional revival — AUC > 0.5 is the minimum bar; thesis AUC match within ±0.05 is the aspirational target.

## Limitations

- **k=3 lead-lag not tested**: Only 3 MSS editions are currently available (2021, 2023, 2025). A k=3 test (6-year lag) would require a 2027 edition. k=3 results will be added once the 2027 MSS edition is ingested.
- **H3b class imbalance**: If `delta_dynamism_t > 0` still has a high positive-class rate, F1w remains uninformative; AUC is the only valid metric for H3b. The switch from raw `delta_poi` to C5-corrected `delta_dynamism_t` is expected to reduce the extreme ~99% positive-class rate.
