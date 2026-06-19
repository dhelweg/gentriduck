# E2 Classification Findings -- Thesis Validation

- **Task:** scikit-learn classification of gentrification stages
- **Issue:** #31
- **Date:** 2026-06-19
- **Data:** stg_thesis_2018_result_plr, PLR level, n=436
- **Method:** 5-fold stratified CV (LogisticRegression, RandomForest)

## Method

Two classification tasks are run to separate the methodologically clean formulation from the legacy thesis formulation:

**Task A (recommended):** Predict `own_idx_class_bi` (socio-economic vulnerability class, independent of POI indicators) from `status_index` and `dynamism_index`. No data leakage; this tests whether POI-derived gentrification scores predict socio-economic status independently.

**Task B (legacy thesis formulation):** Predict `dynamism_class_bi` (gentrifying vs not) from `status_index`, `dynamism_index`, `own_idx_enc`. NOTE: `dynamism_class_bi` is derived directly from `dynamism_index` via a threshold, causing near-perfect data leakage. Near-perfect AUC in Task B is expected and methodologically uninformative.

Thesis reference: Weka J48/Random Forest, AUC ~0.72, F-weighted ~0.68 (approximate values from thesis narrative).

## Results

| Task | Classifier | N | AUC (mean) | AUC (std) | F1w (mean) | F1w (std) | Leakage | Target |
|---|---|---|---|---|---|---|---|---|
| A | LogisticRegression | 436 | 0.5987 | 0.0374 | 0.5574 | 0.0253 | No | own_idx_class_bi |
| A | RandomForest | 436 | 0.5633 | 0.0222 | 0.5127 | 0.0230 | No | own_idx_class_bi |
| B | LogisticRegression | 436 | 0.9984 | 0.0020 | 0.9839 | 0.0156 | YES (see note) | dynamism_class_bi (negative=gentrifying) |
| B | RandomForest | 436 | 1.0000 | 0.0000 | 1.0000 | 0.0000 | YES (see note) | dynamism_class_bi (negative=gentrifying) |

## Interpretation

### Task A (clean formulation)

Best: **LogisticRegression** (AUC = 0.5987, F1w = 0.5574).

AUC (0.5987) is below the thesis reference (0.72). Difference: -0.1213. This may reflect the different target variable (own_idx vs gentrification stage) or missing features.

### Task B (legacy formulation -- data leakage)

AUC = 1.0000 (near-perfect, as expected from leakage). `dynamism_class_bi` is a direct discretization of `dynamism_index`, so including `dynamism_index` as a feature trivially leaks the label. This result is methodologically uninformative and is reported only for transparency.

### Directional Comparison to Thesis

- Thesis AUC reference: 0.72 | Clean Task A best AUC: 0.5987
- Thesis F-weighted reference: 0.68 | Clean Task A best F1w: 0.5574
- Directional agreement: PASS -- AUC > 0.5 confirms classifiability above chance.

## Divergences from 2018 Thesis

- Thesis used Weka J48/Random Forest with POI category counts as features; this revival uses only status_index and dynamism_index (aggregated POI indices).
- Thesis target may have been a composite gentrification stage label; Task A uses own_idx_class_bi as the independent outcome variable.
- Data leakage in Task B (features predict their own source variable) is flagged here; the 2018 thesis may not have separated index derivation from classification features, inflating the reported AUC.
- Epic B framing: directional revival, not exact number reproduction. Task A AUC > 0.5 is the minimum bar for directional agreement.
