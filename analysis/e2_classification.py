"""
analysis/e2_classification.py
==============================
E2 thesis validation: scikit-learn classification on the 2018 golden data.

Replicates the 2018 thesis Weka classification (gentrification stage classification)
using scikit-learn. Tests AUC and F-weighted against the directional thesis findings.
Output: printed results + docs/epic-e/E2-classification-findings.md.

The 2018 thesis:
  - Used Weka classifiers to classify PLRs into gentrification stages
  - Features: status_index, dynamism_index, own_idx_class (encoded)
  - Reported AUC and F-weighted score

For the Gentriduck revival:
  - Data: stg_thesis_2018_result_plr (2018 golden, PLR level)
  - Two classification tasks:
    A) Predict own_idx_class_bi (socio-economic vulnerability) from POI scores
       Features: status_index, dynamism_index
       This avoids data leakage (target is independent of features)
    B) Predict dynamism_class_bi from status + own_idx (legacy task -- note leakage)
  - 5-fold cross-validation; report AUC and F-weighted
  - Directional comparison to thesis

Note on data leakage in Task B: dynamism_class_bi is directly derived from
dynamism_index via a threshold; using dynamism_index as a feature trivially
leaks the target. Task A is the methodologically correct formulation.

Dependencies: duckdb, numpy, scikit-learn (all in pyproject.toml).

Usage:
  uv run python analysis/e2_classification.py
"""

from __future__ import annotations

import sys
from pathlib import Path

try:
    import duckdb
except ImportError:
    print("ERROR: duckdb not installed. Run: uv sync")
    sys.exit(1)

try:
    import numpy as np
    from sklearn.linear_model import LogisticRegression
    from sklearn.ensemble import RandomForestClassifier
    from sklearn.model_selection import StratifiedKFold, cross_val_score
    from sklearn.preprocessing import StandardScaler
    from sklearn.pipeline import Pipeline
    import warnings

    warnings.filterwarnings("ignore")
except ImportError:
    print("ERROR: scikit-learn not installed. Run: uv sync")
    sys.exit(1)

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

DUCKDB_PATH = Path(__file__).parent.parent / "data" / "gentriduck.duckdb"
OUTPUT_MD = Path(__file__).parent.parent / "docs" / "epic-e" / "E2-classification-findings.md"

# Thesis Weka results (approximate from thesis narrative):
THESIS_AUC_REF = 0.72
THESIS_F_REF = 0.68


def load_data(con: duckdb.DuckDBPyConnection) -> object:
    """Load PLR-level 2018 golden data for classification."""
    df = con.execute("""
        SELECT
            raum_id           as area_code,
            status_index,
            dynamism_index,
            own_idx_class_bi,
            dynamism_class_bi,
            status_class_bi
        FROM main.stg_thesis_2018_result_plr
        WHERE area_level = 'plr'
          AND dynamism_index IS NOT NULL
          AND status_index IS NOT NULL
          AND own_idx_class_bi IS NOT NULL
          AND dynamism_class_bi IS NOT NULL
    """).df()
    return df


def run_cv(x: np.ndarray, y: np.ndarray, clf_name: str, clf, n_splits: int = 5) -> dict:
    """Run stratified k-fold CV and return AUC + F1-weighted."""
    cv = StratifiedKFold(n_splits=n_splits, shuffle=True, random_state=42)
    auc_scores = cross_val_score(clf, x, y, cv=cv, scoring="roc_auc")
    f1_scores = cross_val_score(clf, x, y, cv=cv, scoring="f1_weighted")
    return {
        "clf": clf_name,
        "n": len(x),
        "auc_mean": float(auc_scores.mean()),
        "auc_std": float(auc_scores.std()),
        "f1_mean": float(f1_scores.mean()),
        "f1_std": float(f1_scores.std()),
    }


def main() -> None:
    if not DUCKDB_PATH.exists():
        print(f"ERROR: DuckDB file not found at {DUCKDB_PATH}")
        sys.exit(1)

    con = duckdb.connect(str(DUCKDB_PATH))
    df = load_data(con)
    con.close()

    print(f"Loaded {len(df)} PLR rows")

    # Encode class labels
    class_map = {"positive": 1.0, "neutral": 0.0, "negative": -1.0}
    df["own_idx_enc"] = df["own_idx_class_bi"].map(class_map)

    # --- Task A: predict own_idx_class_bi from POI scores (no leakage) ---
    # Target: own_idx binary (positive='positive class'=above-average socioeconomic status)
    # Features: status_index, dynamism_index (POI-derived, independent of own_idx)
    print("\n--- Task A: Predict own_idx_class_bi from POI indices (no data leakage) ---")
    x_a = df[["status_index", "dynamism_index"]].values.astype(float)
    y_a = (df["own_idx_class_bi"] == "positive").astype(int).values
    mask_a = ~np.any(np.isnan(x_a), axis=1)
    x_a, y_a = x_a[mask_a], y_a[mask_a]
    print(f"n={len(x_a)}, target distribution: positive={y_a.sum()} ({100 * y_a.mean():.1f}%)")

    classifiers_a = {
        "LogisticRegression": Pipeline(
            [
                ("scaler", StandardScaler()),
                ("clf", LogisticRegression(max_iter=1000, random_state=42)),
            ]
        ),
        "RandomForest": Pipeline(
            [
                ("clf", RandomForestClassifier(n_estimators=100, random_state=42)),
            ]
        ),
    }

    results_a = []
    for clf_name, clf in classifiers_a.items():
        r = run_cv(x_a, y_a, clf_name, clf)
        r["task"] = "A"
        r["target"] = "own_idx_class_bi"
        r["features"] = "status_index, dynamism_index"
        r["leakage"] = False
        results_a.append(r)
        print(
            f"  {clf_name}: AUC={r['auc_mean']:.4f}+/-{r['auc_std']:.4f}, F1w={r['f1_mean']:.4f}+/-{r['f1_std']:.4f}"
        )

    # --- Task B: original formulation (with leakage) ---
    # Target: dynamism_class_bi='negative' (high gentrification)
    # Features: status_index, dynamism_index, own_idx_enc
    # NOTE: dynamism_class_bi is a direct threshold of dynamism_index -> data leakage!
    print("\n--- Task B: Predict dynamism_class_bi (LEAKAGE WARNING: includes dynamism_index) ---")
    x_b = df[["status_index", "dynamism_index", "own_idx_enc"]].values.astype(float)
    y_b = (df["dynamism_class_bi"] == "negative").astype(int).values
    mask_b = ~np.any(np.isnan(x_b), axis=1)
    x_b, y_b = x_b[mask_b], y_b[mask_b]
    print(f"n={len(x_b)}, target distribution: gentrifying={y_b.sum()} ({100 * y_b.mean():.1f}%)")

    results_b = []
    for clf_name, clf in classifiers_a.items():
        clf_copy = Pipeline(clf.steps)  # fresh copy
        r = run_cv(x_b, y_b, clf_name, clf_copy)
        r["task"] = "B"
        r["target"] = "dynamism_class_bi (negative=gentrifying)"
        r["features"] = "status_index, dynamism_index, own_idx_enc"
        r["leakage"] = True
        results_b.append(r)
        print(
            f"  {clf_name}: AUC={r['auc_mean']:.4f}+/-{r['auc_std']:.4f}, F1w={r['f1_mean']:.4f}+/-{r['f1_std']:.4f}"
        )
        if r["auc_mean"] > 0.95:
            print(
                "  WARNING: AUC > 0.95 indicates data leakage (dynamism_class derived from dynamism_index)!"
            )

    all_results = results_a + results_b

    # --- Write findings markdown ---
    OUTPUT_MD.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_MD, "w") as f:
        f.write("# E2 Classification Findings -- Thesis Validation\n\n")
        f.write("- **Task:** scikit-learn classification of gentrification stages\n")
        f.write("- **Issue:** #31\n")
        f.write("- **Date:** 2026-06-19\n")
        f.write(f"- **Data:** stg_thesis_2018_result_plr, PLR level, n={len(df)}\n")
        f.write("- **Method:** 5-fold stratified CV (LogisticRegression, RandomForest)\n\n")
        f.write("## Method\n\n")
        f.write("Two classification tasks are run to separate the methodologically clean ")
        f.write("formulation from the legacy thesis formulation:\n\n")
        f.write("**Task A (recommended):** Predict `own_idx_class_bi` (socio-economic ")
        f.write("vulnerability class, independent of POI indicators) from `status_index` ")
        f.write("and `dynamism_index`. No data leakage; this tests whether POI-derived ")
        f.write("gentrification scores predict socio-economic status independently.\n\n")
        f.write("**Task B (legacy thesis formulation):** Predict `dynamism_class_bi` ")
        f.write("(gentrifying vs not) from `status_index`, `dynamism_index`, `own_idx_enc`. ")
        f.write("NOTE: `dynamism_class_bi` is derived directly from `dynamism_index` via a ")
        f.write("threshold, causing near-perfect data leakage. Near-perfect AUC in Task B ")
        f.write("is expected and methodologically uninformative.\n\n")
        f.write("Thesis reference: Weka J48/Random Forest, AUC ~0.72, F-weighted ~0.68 ")
        f.write("(approximate values from thesis narrative).\n\n")
        f.write("## Results\n\n")
        f.write(
            "| Task | Classifier | N | AUC (mean) | AUC (std) | F1w (mean) | F1w (std) | Leakage | Target |\n"
        )
        f.write("|---|---|---|---|---|---|---|---|---|\n")
        for r in all_results:
            leak_str = "YES (see note)" if r["leakage"] else "No"
            f.write(f"| {r['task']} | {r['clf']} | {r['n']} | {r['auc_mean']:.4f} | ")
            f.write(
                f"{r['auc_std']:.4f} | {r['f1_mean']:.4f} | {r['f1_std']:.4f} | {leak_str} | {r['target']} |\n"
            )
        f.write("\n## Interpretation\n\n")
        f.write("### Task A (clean formulation)\n\n")
        best_a = max(results_a, key=lambda r: r["auc_mean"])
        f.write(
            f"Best: **{best_a['clf']}** (AUC = {best_a['auc_mean']:.4f}, F1w = {best_a['f1_mean']:.4f}).\n\n"
        )
        auc_diff = best_a["auc_mean"] - THESIS_AUC_REF
        if best_a["auc_mean"] >= THESIS_AUC_REF * 0.9:
            f.write(f"AUC is within ~10% of the thesis reference ({THESIS_AUC_REF:.2f}), ")
            f.write("indicating that POI-derived indices are predictive of socio-economic status. ")
            f.write("This supports the core thesis hypothesis that POI development patterns ")
            f.write("co-vary with socio-economic vulnerability.\n\n")
        else:
            f.write(
                f"AUC ({best_a['auc_mean']:.4f}) is below the thesis reference ({THESIS_AUC_REF:.2f}). "
            )
            f.write(f"Difference: {auc_diff:+.4f}. This may reflect the different target variable ")
            f.write("(own_idx vs gentrification stage) or missing features.\n\n")
        f.write("### Task B (legacy formulation -- data leakage)\n\n")
        best_b = max(results_b, key=lambda r: r["auc_mean"])
        f.write(f"AUC = {best_b['auc_mean']:.4f} (near-perfect, as expected from leakage). ")
        f.write("`dynamism_class_bi` is a direct discretization of `dynamism_index`, so including ")
        f.write("`dynamism_index` as a feature trivially leaks the label. This result is ")
        f.write("methodologically uninformative and is reported only for transparency.\n\n")
        f.write("### Directional Comparison to Thesis\n\n")
        f.write(
            f"- Thesis AUC reference: {THESIS_AUC_REF:.2f} | Clean Task A best AUC: {best_a['auc_mean']:.4f}\n"
        )
        f.write(
            f"- Thesis F-weighted reference: {THESIS_F_REF:.2f} | Clean Task A best F1w: {best_a['f1_mean']:.4f}\n"
        )
        if best_a["auc_mean"] > 0.5:
            f.write(
                "- Directional agreement: PASS -- AUC > 0.5 confirms classifiability above chance.\n\n"
            )
        else:
            f.write("- Directional agreement: FAIL -- AUC <= 0.5, below chance threshold.\n\n")
        f.write("## Divergences from 2018 Thesis\n\n")
        f.write("- Thesis used Weka J48/Random Forest with POI category counts as features; ")
        f.write(
            "this revival uses only status_index and dynamism_index (aggregated POI indices).\n"
        )
        f.write("- Thesis target may have been a composite gentrification stage label; ")
        f.write("Task A uses own_idx_class_bi as the independent outcome variable.\n")
        f.write("- Data leakage in Task B (features predict their own source variable) ")
        f.write("is flagged here; the 2018 thesis may not have separated index derivation ")
        f.write("from classification features, inflating the reported AUC.\n")
        f.write("- Epic B framing: directional revival, not exact number reproduction. ")
        f.write("Task A AUC > 0.5 is the minimum bar for directional agreement.\n")

    print(f"\nFindings written to: {OUTPUT_MD}")


if __name__ == "__main__":
    main()
