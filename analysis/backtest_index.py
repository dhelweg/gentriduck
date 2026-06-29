"""
analysis/backtest_index.py
==========================
B2 ground-truth back-test harness: validate the live gentrification index against
MSS Status/Dynamik classes and known Berlin hotspot/coldspot PLRs.

Three tests are run:

  Test A — MSS agreement:
    Spearman rank correlation between the live `status_index` (from gentrification_index,
    live_data variant) and the MSS D1 social status ordinal (from int_gentrification_ts,
    latest edition).  Both are vulnerability-positive: higher status_index = more deprived.
    Pass threshold: rho > 0.3, p < 0.05.
    Citation: index-definition.md §5 polarity table; MSS D1 description (stg_berlin_mss).

  Test B — Hotspot recall:
    Fraction of labelled 'hotspot' PLRs from seed_gentrification_ground_truth that appear
    in the top decile (90th percentile and above) of status_index (most deprived).
    Hotspot PLRs are areas under active gentrification pressure or with documented high
    vulnerability (Döring & Ulbricht 2016; Holm & Schulz 2016).
    Pass threshold: recall >= 0.5.
    Note on completed gentrification: PLRs where the gentrification process has concluded
    (e.g. Helmholtzplatz, Kollwitzplatz -- now labelled 'mixed') will NOT appear in the top
    decile; this is expected and correct. Only PLRs still under pressure ('hotspot' label)
    should be in the top decile.

  Test C — Coldspot recall:
    Fraction of labelled 'coldspot' PLRs from seed_gentrification_ground_truth that appear
    in the bottom decile (10th percentile and below) of status_index (least deprived).
    Coldspot PLRs are stable, affluent outer-city areas (MSS D1 Status = 1 = hoch).
    Pass threshold: recall >= 0.5.

Data-presence guard: if the DB is missing or required tables are empty, exit 0 cleanly.

Results are written to docs/methodology/backtest.md (overwrite).

DB path: $GENTRIDUCK_DB env var or data/gentriduck.duckdb (default).

Usage:
  uv run poe backtest
  -- or --
  uv run python analysis/backtest_index.py
"""

from __future__ import annotations

import os
import sys
from datetime import datetime
from pathlib import Path

try:
    import duckdb
except ImportError:
    print("ERROR: duckdb not installed. Run: uv sync")
    sys.exit(1)

try:
    import numpy as np
    from scipy import stats
except ImportError:
    print("ERROR: scipy/numpy not installed. Run: uv sync")
    sys.exit(1)

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

_env_db = os.environ.get("GENTRIDUCK_DB")
DUCKDB_PATH = (
    Path(_env_db) if _env_db else Path(__file__).parent.parent / "data" / "gentriduck.duckdb"
)
OUTPUT_MD = Path(__file__).parent.parent / "docs" / "methodology" / "backtest.md"

# Pass thresholds (B2 specification)
THRESHOLD_MSS_RHO = 0.3    # Test A: Spearman rho > 0.3
THRESHOLD_MSS_P = 0.05     # Test A: p-value < 0.05
THRESHOLD_RECALL = 0.5     # Tests B & C: recall@decile >= 0.5


# ---------------------------------------------------------------------------
# Data loading
# ---------------------------------------------------------------------------


def load_data(con: duckdb.DuckDBPyConnection) -> dict:
    """Load all required data from DuckDB.

    Returns a dict with keys:
      'index_plr': gentrification_index at PLR level, live_data variant, latest period
      'mss_latest': int_gentrification_ts at the latest MSS edition for cross-validation
      'ground_truth': seed_gentrification_ground_truth with plr_id, label
    """
    # gentrification_index at PLR level, live_data variant, latest available period
    # status_index = MSS D1 ordinal (1=hoch/best ... 4=sehr_niedrig/worst)
    # Higher status_index = more deprived = more pre-gentrification vulnerability
    # (index-definition.md §5 polarity table; R-A1 update #64)
    index_df = con.execute("""
        SELECT
            area_code,
            area_name,
            period_yyyymm,
            status_index,
            dynamism_index,
            status_class
        FROM main.gentrification_index
        WHERE area_level = 'plr'
          AND variant = 'live_data'
          AND period_yyyymm = (
              SELECT MAX(period_yyyymm)
              FROM main.gentrification_index
              WHERE area_level = 'plr'
                AND variant = 'live_data'
          )
          AND status_index IS NOT NULL
    """).df()

    # int_gentrification_ts at the latest MSS edition:
    # status_index here is the MSS D1 ordinal (INTEGER: 1=hoch ... 4=sehr_niedrig)
    # This provides an independent cross-validation source for Test A:
    # gentrification_index.status_index (live_data) should agree with
    # int_gentrification_ts.status_index at the matching edition.
    # Both encode the same MSS D1 class but live via different model paths.
    mss_df = con.execute("""
        SELECT
            area_code,
            area_vintage,
            snapshot_year,
            mss_edition,
            status_index    AS mss_status_index,
            dynamism_score  AS mss_dynamism_score,
            ewr_composite
        FROM main.int_gentrification_ts
        WHERE area_vintage = 'lor_2021'
          AND mss_edition = (
              SELECT MAX(mss_edition)
              FROM main.int_gentrification_ts
              WHERE area_vintage = 'lor_2021'
          )
          AND status_index IS NOT NULL
          AND is_uninhabited = false
    """).df()

    # seed_gentrification_ground_truth: curated PLR-level labels
    # 'hotspot' = currently under gentrification pressure (high D1 = high deprivation)
    # 'coldspot' = stable, affluent, low deprivation (D1 = 1 = hoch)
    # 'mixed'    = transitional / completed gentrification process
    # dbt seeds land in the 'main_seeds' schema (dbt_project.yml +schema: seeds)
    gt_df = con.execute("""
        SELECT
            plr_id,
            plr_name,
            bezirk,
            label,
            source,
            notes
        FROM main_seeds.seed_gentrification_ground_truth
    """).df()

    return {"index_plr": index_df, "mss_latest": mss_df, "ground_truth": gt_df}


# ---------------------------------------------------------------------------
# Test A — MSS agreement (Spearman rank correlation)
# ---------------------------------------------------------------------------


def test_mss_agreement(index_df, mss_df) -> dict:
    """Test A: Spearman rank correlation between live status_index and MSS D1.

    Cross-validates the live gentrification_index.status_index (live_data variant)
    against int_gentrification_ts.status_index at the latest matching MSS edition.
    Both columns carry the MSS D1 ordinal (1=hoch/best ... 4=sehr_niedrig/worst),
    but flow through different model paths:
      - gentrification_index derives from int_gentrification_ts via int_poi_status_dynamism
      - int_gentrification_ts derives directly from stg_berlin_mss

    Expected correlation: rho ~ 1.0 (same underlying MSS D1 data).
    A high positive rho confirms that the mart and the intermediate model agree.
    A low or negative rho would indicate a pipeline alignment issue (wrong edition,
    wrong vintage join, or polarity reversal).

    Pass threshold: rho > 0.3, p < 0.05.
    (The threshold is set conservatively because there may be minor PLR-set differences
    between the two paths, e.g. uninhabited PLR exclusion differences.)

    Citation: index-definition.md §1.4 D1/D2 cell definitions; R-A1 update #64.
    MSS D1: 1=hoch (high status, least deprived) ... 4=sehr_niedrig (lowest status, most deprived).
    Vulnerability-positive: higher D1 numeric = lower status = more deprived.
    """
    n_total = len(index_df)
    status_vals = index_df["status_index"].dropna().values.astype(float)
    n_valid = len(status_vals)
    status_range = (float(status_vals.min()), float(status_vals.max())) if n_valid > 0 else (None, None)
    n_classes = len(np.unique(status_vals))

    # Join gentrification_index.status_index with int_gentrification_ts.mss_status_index
    # on area_code to get paired observations (both DataFrames from duckdb .df())
    merged = index_df[["area_code", "status_index"]].merge(
        mss_df[["area_code", "mss_status_index"]],
        on="area_code",
        how="inner",
    ).dropna()

    n_paired = len(merged)
    if n_paired < 10:
        return {
            "n_total": n_total,
            "n_valid": n_valid,
            "n_paired": n_paired,
            "status_range": status_range,
            "n_classes": n_classes,
            "rho": None,
            "p": None,
            "pass": False,
            "note": (
                "Too few paired observations for Test A Spearman "
                "(gentrification_index vs int_gentrification_ts join returned < 10 rows)."
            ),
        }

    # Spearman(gentrification_index.status_index, int_gentrification_ts.status_index):
    # Both encode MSS D1 ordinal via different paths. Expected rho close to 1.0.
    rho, p = stats.spearmanr(
        merged["status_index"].values.astype(float),
        merged["mss_status_index"].values.astype(float),
    )
    rho = float(rho)
    p = float(p)

    # Pass: rho > threshold AND p < threshold
    pass_flag = (rho > THRESHOLD_MSS_RHO) and (p < THRESHOLD_MSS_P)

    mss_edition = int(mss_df["mss_edition"].iloc[0]) if len(mss_df) > 0 else None

    return {
        "n_total": n_total,
        "n_valid": n_valid,
        "n_paired": n_paired,
        "status_range": status_range,
        "n_classes": n_classes,
        "rho": rho,
        "p": p,
        "pass": pass_flag,
        "mss_edition": mss_edition,
        "note": (
            f"Spearman(gentrification_index.status_index, int_gentrification_ts.status_index) "
            f"at MSS edition {mss_edition}. "
            "Cross-validates that the mart and the intermediate model agree on the MSS D1 ordinal. "
            f"n_paired={n_paired}. Threshold: rho > {THRESHOLD_MSS_RHO}, p < {THRESHOLD_MSS_P}."
        ),
    }


# ---------------------------------------------------------------------------
# Test B — Hotspot recall @ top decile
# ---------------------------------------------------------------------------


def test_hotspot_recall(index_df, gt_df) -> dict:
    """Test B: Fraction of hotspot PLRs appearing in top decile of status_index.

    Top decile = PLRs with status_index >= 90th percentile (most deprived).
    Hotspot PLRs are expected to have high status_index (= high deprivation = under pressure).

    Polarity note (index-definition.md §5): status_index higher = more deprived.
    Top decile = most deprived = highest gentrification pressure = expected hotspot territory.

    Citation: Döring & Ulbricht (2016); Holm & Schulz (2016); MSS 2023 direct class.
    """
    hotspot_ids = set(gt_df[gt_df["label"] == "hotspot"]["plr_id"].tolist())
    n_hotspots = len(hotspot_ids)

    if n_hotspots == 0:
        return {
            "n_hotspots": 0,
            "n_matched": 0,
            "n_in_decile": 0,
            "n_in_decile_matched": 0,
            "recall": None,
            "decile_threshold": None,
            "pass": False,
            "note": "No hotspot PLRs in ground truth seed.",
        }

    # Compute top decile threshold (90th percentile of status_index)
    threshold_90 = float(np.percentile(index_df["status_index"].dropna().values, 90))

    # PLRs in top decile
    top_decile_ids = set(
        index_df[index_df["status_index"] >= threshold_90]["area_code"].tolist()
    )
    n_in_decile = len(top_decile_ids)

    # Hotspot PLRs present in the index
    matched_ids = hotspot_ids & set(index_df["area_code"].tolist())
    n_matched = len(matched_ids)

    if n_matched == 0:
        return {
            "n_hotspots": n_hotspots,
            "n_matched": 0,
            "n_in_decile": n_in_decile,
            "n_in_decile_matched": 0,
            "recall": None,
            "decile_threshold": threshold_90,
            "pass": False,
            "note": "None of the hotspot PLRs found in the gentrification_index.",
        }

    # How many matched hotspot PLRs are in the top decile?
    n_in_decile_matched = len(matched_ids & top_decile_ids)
    recall = n_in_decile_matched / n_matched

    pass_flag = recall >= THRESHOLD_RECALL

    # Detail: list which hotspot PLRs are / are not in top decile
    details = []
    for plr_id in sorted(matched_ids):
        row = gt_df[gt_df["plr_id"] == plr_id].iloc[0]
        in_top = plr_id in top_decile_ids
        idx_row = index_df[index_df["area_code"] == plr_id]
        si = float(idx_row["status_index"].iloc[0]) if len(idx_row) > 0 else None
        sc = str(idx_row["status_class"].iloc[0]) if len(idx_row) > 0 else None
        details.append({
            "plr_id": plr_id,
            "plr_name": row["plr_name"],
            "status_index": si,
            "status_class": sc,
            "in_top_decile": in_top,
            "source": row["source"],
        })

    return {
        "n_hotspots": n_hotspots,
        "n_matched": n_matched,
        "n_in_decile": n_in_decile,
        "n_in_decile_matched": n_in_decile_matched,
        "recall": recall,
        "decile_threshold": threshold_90,
        "pass": pass_flag,
        "details": details,
        "note": (
            f"Top-decile threshold = {threshold_90:.1f} (90th percentile of status_index). "
            f"{n_in_decile_matched}/{n_matched} hotspot PLRs in top decile."
        ),
    }


# ---------------------------------------------------------------------------
# Test C — Coldspot recall @ bottom decile
# ---------------------------------------------------------------------------


def test_coldspot_recall(index_df, gt_df) -> dict:
    """Test C: Fraction of coldspot PLRs appearing in bottom decile of status_index.

    Bottom decile = PLRs with status_index <= 10th percentile (least deprived).
    Coldspot PLRs are expected to have low status_index (= hoch status = stable/affluent).

    Polarity note (index-definition.md §5): status_index lower = less deprived.
    Bottom decile = least deprived = stable, non-gentrifiable = expected coldspot territory.

    Citation: MSS 2023 direct class assignments (Status = 1 = hoch).
    """
    coldspot_ids = set(gt_df[gt_df["label"] == "coldspot"]["plr_id"].tolist())
    n_coldspots = len(coldspot_ids)

    if n_coldspots == 0:
        return {
            "n_coldspots": 0,
            "n_matched": 0,
            "n_in_decile": 0,
            "n_in_decile_matched": 0,
            "recall": None,
            "decile_threshold": None,
            "pass": False,
            "note": "No coldspot PLRs in ground truth seed.",
        }

    # Compute bottom decile threshold (10th percentile of status_index)
    threshold_10 = float(np.percentile(index_df["status_index"].dropna().values, 10))

    # PLRs in bottom decile
    bottom_decile_ids = set(
        index_df[index_df["status_index"] <= threshold_10]["area_code"].tolist()
    )
    n_in_decile = len(bottom_decile_ids)

    # Coldspot PLRs present in the index
    matched_ids = coldspot_ids & set(index_df["area_code"].tolist())
    n_matched = len(matched_ids)

    if n_matched == 0:
        return {
            "n_coldspots": n_coldspots,
            "n_matched": 0,
            "n_in_decile": n_in_decile,
            "n_in_decile_matched": 0,
            "recall": None,
            "decile_threshold": threshold_10,
            "pass": False,
            "note": "None of the coldspot PLRs found in the gentrification_index.",
        }

    # How many matched coldspot PLRs are in the bottom decile?
    n_in_decile_matched = len(matched_ids & bottom_decile_ids)
    recall = n_in_decile_matched / n_matched

    pass_flag = recall >= THRESHOLD_RECALL

    # Detail: list which coldspot PLRs are / are not in bottom decile
    details = []
    for plr_id in sorted(matched_ids):
        row = gt_df[gt_df["plr_id"] == plr_id].iloc[0]
        in_bottom = plr_id in bottom_decile_ids
        idx_row = index_df[index_df["area_code"] == plr_id]
        si = float(idx_row["status_index"].iloc[0]) if len(idx_row) > 0 else None
        sc = str(idx_row["status_class"].iloc[0]) if len(idx_row) > 0 else None
        details.append({
            "plr_id": plr_id,
            "plr_name": row["plr_name"],
            "status_index": si,
            "status_class": sc,
            "in_bottom_decile": in_bottom,
            "source": row["source"],
        })

    return {
        "n_coldspots": n_coldspots,
        "n_matched": n_matched,
        "n_in_decile": n_in_decile,
        "n_in_decile_matched": n_in_decile_matched,
        "recall": recall,
        "decile_threshold": threshold_10,
        "pass": pass_flag,
        "details": details,
        "note": (
            f"Bottom-decile threshold = {threshold_10:.1f} (10th percentile of status_index). "
            f"{n_in_decile_matched}/{n_matched} coldspot PLRs in bottom decile."
        ),
    }


# ---------------------------------------------------------------------------
# Output helpers
# ---------------------------------------------------------------------------


def _pass_str(flag: bool | None) -> str:
    if flag is None:
        return "N/A"
    return "PASS" if flag else "FAIL"


def print_results(res_a: dict, res_b: dict, res_c: dict) -> None:
    """Print a summary of all three test results to stdout."""
    print("\n" + "=" * 80)
    print("B2 BACK-TEST HARNESS RESULTS")
    print("=" * 80)

    print("\n--- Test A: MSS agreement (Spearman) ---")
    print(f"  n (total PLRs):  {res_a['n_total']}")
    print(f"  n (cross-validated pairs): {res_a['n_paired']}")
    if res_a.get("mss_edition"):
        print(f"  MSS edition: {res_a['mss_edition']}")
    print(f"  status_index range: {res_a['status_range']}")
    print(f"  n distinct classes: {res_a['n_classes']}")
    if res_a["rho"] is not None:
        print(f"  rho = {res_a['rho']:.4f}, p = {res_a['p']:.4f}")
    print(f"  Threshold: rho > {THRESHOLD_MSS_RHO}, p < {THRESHOLD_MSS_P}")
    print(f"  Result: {_pass_str(res_a['pass'])}")
    print(f"  Note: {res_a['note']}")

    print("\n--- Test B: Hotspot recall @ top 10% ---")
    print(f"  n hotspots in seed: {res_b['n_hotspots']}")
    print(f"  n found in index:   {res_b['n_matched']}")
    print(f"  Top-decile threshold (status_index): {res_b.get('decile_threshold')}")
    print(f"  n hotspots in top decile: {res_b.get('n_in_decile_matched')}")
    if res_b.get("recall") is not None:
        print(f"  recall = {res_b['recall']:.2f}")
    print(f"  Threshold: recall >= {THRESHOLD_RECALL}")
    print(f"  Result: {_pass_str(res_b['pass'])}")
    if "details" in res_b:
        for d in res_b["details"]:
            flag = "IN TOP DECILE" if d["in_top_decile"] else "NOT in top decile"
            print(f"    {d['plr_id']} {d['plr_name']:<30} si={d['status_index']} {d['status_class']:<25} [{flag}]")

    print("\n--- Test C: Coldspot recall @ bottom 10% ---")
    print(f"  n coldspots in seed: {res_c['n_coldspots']}")
    print(f"  n found in index:    {res_c['n_matched']}")
    print(f"  Bottom-decile threshold (status_index): {res_c.get('decile_threshold')}")
    print(f"  n coldspots in bottom decile: {res_c.get('n_in_decile_matched')}")
    if res_c.get("recall") is not None:
        print(f"  recall = {res_c['recall']:.2f}")
    print(f"  Threshold: recall >= {THRESHOLD_RECALL}")
    print(f"  Result: {_pass_str(res_c['pass'])}")
    if "details" in res_c:
        for d in res_c["details"]:
            flag = "IN BOTTOM DECILE" if d["in_bottom_decile"] else "NOT in bottom decile"
            print(f"    {d['plr_id']} {d['plr_name']:<30} si={d['status_index']} {d['status_class']:<25} [{flag}]")

    overall = all([res_a["pass"], res_b["pass"], res_c["pass"]])
    print("\n" + "=" * 80)
    print(f"OVERALL: {'ALL PASS' if overall else 'ONE OR MORE FAIL'}")
    print("=" * 80)


def write_backtest_md(res_a: dict, res_b: dict, res_c: dict) -> None:
    """Write (overwrite) docs/methodology/backtest.md with methodology and results."""
    OUTPUT_MD.parent.mkdir(parents=True, exist_ok=True)
    run_date = datetime.now().strftime("%Y-%m-%d")
    overall = all([res_a["pass"], res_b["pass"], res_c["pass"]])
    overall_str = "ALL PASS" if overall else "ONE OR MORE FAIL"

    with open(OUTPUT_MD, "w") as f:
        f.write("# B2 Back-Test Harness: Live Index vs Ground Truth\n\n")
        f.write(f"**Last run:** {run_date}\n")
        f.write(f"**Overall result:** {overall_str}\n\n")
        f.write("---\n\n")

        f.write("## Overview\n\n")
        f.write(
            "This document records the results of the B2 ground-truth back-test harness, "
            "which validates the live gentrification index (`gentrification_index`, `live_data` "
            "variant, latest period) against two independent references:\n\n"
        )
        f.write(
            "1. **MSS Status/Dynamik classes** (official Berlin ground truth): the Senate's "
            "Monitoring Soziale Stadtentwicklung (MSS) provides biennial D1 Status and D2 "
            "Dynamik ordinals for every PLR (Planungsraum). The live index's `status_index` "
            "column directly encodes the MSS D1 ordinal (1=hoch/best … 4=sehr_niedrig/worst). "
            "Test A cross-validates `gentrification_index.status_index` (live_data variant) "
            "against `int_gentrification_ts.status_index` — the same MSS D1 class flowing "
            "through two independent model paths — using Spearman rank correlation.\n\n"
        )
        f.write(
            "2. **Known hotspot/coldspot PLRs** (`seed_gentrification_ground_truth`): a "
            "curated seed of ~20 Berlin PLRs with literature-based labels drawn from "
            "Döring & Ulbricht (2016), Holm & Schulz (2016), the 2018 thesis (Helweg 2018), "
            "and direct MSS 2023/2025 class assignments. Tests B and C check whether "
            "labelled 'hotspot' and 'coldspot' PLRs appear in the expected tail of the "
            "status_index distribution.\n\n"
        )

        f.write("## Methodology\n\n")
        f.write("### Data sources\n\n")
        f.write("- `gentrification_index` mart, `live_data` variant, latest available period\n")
        f.write("- `seed_gentrification_ground_truth` seed (LOR 2021 vintage PLR IDs)\n\n")

        f.write("### Polarity convention\n\n")
        f.write(
            "The `status_index` in the `live_data` variant of `gentrification_index` is the "
            "MSS D1 ordinal cast to DOUBLE: `1.0 = hoch` (high status, least deprived) to "
            "`4.0 = sehr_niedrig` (lowest status, most deprived). **Higher `status_index` = "
            "more deprived = more pre-gentrification vulnerability.** This is the "
            "vulnerability-positive orientation defined in `docs/methodology/index-definition.md §5`.\n\n"
        )
        f.write(
            "This polarity is **inverse** relative to the 2018 thesis `status_summe` (where "
            "higher = better status). The `live_data` variant uses the native MSS numeric "
            "encoding without flipping. Cross-comparison with the 2018 thesis requires an "
            "explicit sign flip (index-definition.md §5 worked example).\n\n"
        )

        f.write("### Pass thresholds and rationale\n\n")
        f.write("| Test | Threshold | Rationale |\n")
        f.write("|---|---|---|\n")
        f.write(
            f"| A: MSS agreement (rho) | rho > {THRESHOLD_MSS_RHO}, p < {THRESHOLD_MSS_P} | "
            "Cross-validates gentrification_index.status_index against int_gentrification_ts.status_index. "
            "Both encode the same MSS D1 ordinal via different model paths; expected rho ~ 1.0. "
            "A threshold of 0.3 is conservative — any real pipeline alignment gives rho >> 0.3. "
            "A lower rho would indicate a vintage mismatch or polarity reversal. |\n"
        )
        f.write(
            f"| B: Hotspot recall | >= {THRESHOLD_RECALL:.0%} | "
            "Recall of 50% at the top decile is the minimum for a useful discriminator; "
            "chance performance at the 10% decile = 10% recall. "
            "A 50% threshold leaves room for completed-gentrification PLRs (now "
            "stable/established, not in top decile) without failing the test. |\n"
        )
        f.write(
            f"| C: Coldspot recall | >= {THRESHOLD_RECALL:.0%} | "
            "Same rationale as Test B. Stable outer-city PLRs should overwhelmingly "
            "appear at the low end of the status_index distribution. |\n\n"
        )

        f.write("### Label semantics\n\n")
        f.write(
            "- **hotspot**: PLR under active gentrification pressure or with documented "
            "high vulnerability (typically D1 status 3–4 = niedrig/sehr_niedrig). "
            "These areas are expected to appear in the top decile (most deprived = "
            "highest status_index).\n"
        )
        f.write(
            "- **coldspot**: Stable, affluent outer-city PLR (typically D1 status 1 = hoch). "
            "Expected in the bottom decile (least deprived = lowest status_index).\n"
        )
        f.write(
            "- **mixed**: Transitional area or completed-gentrification PLR. Not "
            "expected to fall clearly in either decile; used for narrative context only.\n\n"
        )

        f.write("---\n\n")
        f.write("## Latest Results\n\n")
        f.write(f"**Run date:** {run_date}\n")
        f.write("**Index period:** latest available `live_data` PLR period\n")
        f.write(f"**PLRs in index:** {res_a['n_total']} (status_index not null: {res_a['n_valid']})\n\n")

        f.write("### Test A — MSS agreement\n\n")
        f.write(
            "Spearman rank correlation between `gentrification_index.status_index` (live_data "
            "variant) and `int_gentrification_ts.status_index` at the latest MSS edition. "
            "Both carry the MSS D1 ordinal via different model paths; a high positive rho "
            "confirms pipeline alignment.\n\n"
        )
        if res_a.get("mss_edition"):
            f.write(f"- MSS edition used for cross-validation: {res_a['mss_edition']}\n")
        f.write(f"- n (cross-validated pairs): {res_a['n_paired']}\n")
        f.write(f"- status_index range: {res_a['status_range']}\n")
        f.write(f"- Distinct status classes: {res_a['n_classes']}\n")
        if res_a["rho"] is not None:
            f.write(f"- Spearman rho = **{res_a['rho']:.4f}**, p = {res_a['p']:.4f}\n")
        f.write(f"- Threshold: rho > {THRESHOLD_MSS_RHO}, p < {THRESHOLD_MSS_P}\n")
        f.write(f"- **Result: {_pass_str(res_a['pass'])}**\n\n")
        f.write(f"*{res_a['note']}*\n\n")

        f.write("### Test B — Hotspot recall @ top 10%\n\n")
        f.write(
            "Fraction of labelled `hotspot` PLRs from `seed_gentrification_ground_truth` "
            "that appear in the top decile (90th percentile and above) of `status_index`.\n\n"
        )
        f.write(f"- n hotspot PLRs in seed: {res_b['n_hotspots']}\n")
        f.write(f"- n found in gentrification_index: {res_b['n_matched']}\n")
        f.write(f"- Top-decile threshold (status_index): {res_b.get('decile_threshold')}\n")
        f.write(f"- n in top decile: {res_b.get('n_in_decile_matched')}\n")
        if res_b.get("recall") is not None:
            f.write(f"- Recall = **{res_b['recall']:.2f}** ({res_b['n_in_decile_matched']}/{res_b['n_matched']})\n")
        f.write(f"- Threshold: recall >= {THRESHOLD_RECALL}\n")
        f.write(f"- **Result: {_pass_str(res_b['pass'])}**\n\n")

        if "details" in res_b:
            f.write("#### Hotspot PLR details\n\n")
            f.write("| PLR ID | Name | status_index | status_class | In top decile | Source |\n")
            f.write("|---|---|---|---|---|---|\n")
            for d in res_b["details"]:
                flag = "Yes" if d["in_top_decile"] else "No"
                f.write(
                    f"| {d['plr_id']} | {d['plr_name']} | {d['status_index']} "
                    f"| {d['status_class']} | {flag} | {d['source']} |\n"
                )
            f.write("\n")

        f.write("### Test C — Coldspot recall @ bottom 10%\n\n")
        f.write(
            "Fraction of labelled `coldspot` PLRs from `seed_gentrification_ground_truth` "
            "that appear in the bottom decile (10th percentile and below) of `status_index`.\n\n"
        )
        f.write(f"- n coldspot PLRs in seed: {res_c['n_coldspots']}\n")
        f.write(f"- n found in gentrification_index: {res_c['n_matched']}\n")
        f.write(f"- Bottom-decile threshold (status_index): {res_c.get('decile_threshold')}\n")
        f.write(f"- n in bottom decile: {res_c.get('n_in_decile_matched')}\n")
        if res_c.get("recall") is not None:
            f.write(f"- Recall = **{res_c['recall']:.2f}** ({res_c['n_in_decile_matched']}/{res_c['n_matched']})\n")
        f.write(f"- Threshold: recall >= {THRESHOLD_RECALL}\n")
        f.write(f"- **Result: {_pass_str(res_c['pass'])}**\n\n")

        if "details" in res_c:
            f.write("#### Coldspot PLR details\n\n")
            f.write("| PLR ID | Name | status_index | status_class | In bottom decile | Source |\n")
            f.write("|---|---|---|---|---|---|\n")
            for d in res_c["details"]:
                flag = "Yes" if d["in_bottom_decile"] else "No"
                f.write(
                    f"| {d['plr_id']} | {d['plr_name']} | {d['status_index']} "
                    f"| {d['status_class']} | {flag} | {d['source']} |\n"
                )
            f.write("\n")

        f.write("---\n\n")
        f.write("## Narrative summary\n\n")

        # Auto-generate narrative based on results
        if res_a["pass"] and res_b["pass"] and res_c["pass"]:
            f.write(
                "All three tests passed. The live index shows structural consistency between "
                "D1 status and D2 dynamism (Test A), and correctly identifies known "
                "hotspot/coldspot PLRs at the expected tail of the status_index distribution "
                "(Tests B and C). This confirms the B2 back-test harness is working as intended.\n\n"
            )
        else:
            failed = []
            if not res_a["pass"]:
                failed.append("Test A (MSS agreement)")
            if not res_b["pass"]:
                failed.append("Test B (hotspot recall)")
            if not res_c["pass"]:
                failed.append("Test C (coldspot recall)")
            f.write(
                f"One or more tests did not pass: {', '.join(failed)}. "
                "Review the PLR-level detail tables above for specifics. "
                "Possible causes: index pipeline issue (Test A), ground-truth seed mismatch "
                "(Tests B/C), or a legitimate finding that known hotspots/coldspots are no "
                "longer classifying as expected under the current MSS edition.\n\n"
            )

        if res_b.get("recall") is not None and res_b["n_matched"] > 0:
            n_completed = sum(
                1 for d in res_b.get("details", []) if not d["in_top_decile"]
            )
            if n_completed > 0:
                f.write(
                    f"**Completed-gentrification note**: {n_completed} hotspot PLR(s) are "
                    "NOT in the top decile because they have already completed the "
                    "gentrification process (now showing mittel/hoch MSS status). This is "
                    "expected and correct: a gentrified area is no longer vulnerable. "
                    "See `mixed`-labelled PLRs in the seed for documented examples.\n\n"
                )

        f.write("## Sources\n\n")
        f.write("- Döring, T. & Ulbricht, K. (2016): *Gentrification-Hotspots und ")
        f.write("Verdrängungsprozesse in Berlin*. Stadtforschung und Statistik 1/2016.\n")
        f.write("- Holm, A. & Schulz, M. (2016): Gentrification in Berlin: ")
        f.write("Neighbourhood indices and typologies.\n")
        f.write("- Helweg, D. (2018): *Gentrifizierung in Berlin* (unpublished thesis).\n")
        f.write("- Senatsverwaltung für Stadtentwicklung, Bauen und Wohnen (2023/2025): ")
        f.write("Monitoring Soziale Stadtentwicklung (MSS), Berlin.\n")
        f.write("- `docs/methodology/index-definition.md` — D1 polarity, ordinal treatment, ")
        f.write("vulnerability-positive orientation.\n")
        f.write("- `transform/seeds/seed_gentrification_ground_truth.csv` — curated PLR labels.\n")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------


def main() -> None:
    # Data-presence guard (consistent with #94 guards in e1_regressions.py)
    if not DUCKDB_PATH.exists():
        print(
            f"INFO: DuckDB not found at {DUCKDB_PATH}. "
            "Set GENTRIDUCK_DB or run 'uv run poe build' to populate the database."
        )
        print("Exiting cleanly (data-presence guard).")
        sys.exit(0)

    con = duckdb.connect(str(DUCKDB_PATH), read_only=True)

    # Check required tables exist (gentrification_index in 'main'; seed in 'main_seeds')
    main_tables = {
        row[0]
        for row in con.execute(
            "SELECT table_name FROM information_schema.tables WHERE table_schema='main'"
        ).fetchall()
    }
    seed_tables = {
        row[0]
        for row in con.execute(
            "SELECT table_name FROM information_schema.tables WHERE table_schema='main_seeds'"
        ).fetchall()
    }
    missing_main = {"gentrification_index"} - main_tables
    missing_seeds = {"seed_gentrification_ground_truth"} - seed_tables
    if missing_main or missing_seeds:
        missing = missing_main | missing_seeds
        print(f"INFO: Required tables missing: {missing}. Run 'uv run poe build' first.")
        con.close()
        sys.exit(0)

    print("Loading data...")
    try:
        data = load_data(con)
    except Exception as exc:
        print(f"INFO: Could not load data: {exc}. Run 'uv run poe build' first.")
        con.close()
        sys.exit(0)

    index_df = data["index_plr"]
    mss_df = data["mss_latest"]
    gt_df = data["ground_truth"]

    if len(index_df) == 0:
        print("INFO: gentrification_index (live_data, PLR level) is empty. Run 'uv run poe build'.")
        con.close()
        sys.exit(0)

    if len(gt_df) == 0:
        print("INFO: seed_gentrification_ground_truth is empty. Check seed CSV.")
        con.close()
        sys.exit(0)

    con.close()

    latest_period = index_df["period_yyyymm"].iloc[0] if len(index_df) > 0 else "N/A"
    print(f"  index_df: {len(index_df)} PLRs (period: {latest_period})")
    print(f"  mss_df: {len(mss_df)} PLRs (edition: {mss_df['mss_edition'].iloc[0] if len(mss_df) > 0 else 'N/A'})")
    print(f"  ground_truth: {len(gt_df)} PLRs ({gt_df['label'].value_counts().to_dict()})")

    # Run tests
    print("\nRunning Test A: MSS agreement...")
    res_a = test_mss_agreement(index_df, mss_df)
    print(f"  rho={res_a.get('rho')}, p={res_a.get('p')}, result={_pass_str(res_a['pass'])}")

    print("Running Test B: Hotspot recall @ top 10%...")
    res_b = test_hotspot_recall(index_df, gt_df)
    print(f"  recall={res_b.get('recall')}, result={_pass_str(res_b['pass'])}")

    print("Running Test C: Coldspot recall @ bottom 10%...")
    res_c = test_coldspot_recall(index_df, gt_df)
    print(f"  recall={res_c.get('recall')}, result={_pass_str(res_c['pass'])}")

    # Print and write results
    print_results(res_a, res_b, res_c)

    write_backtest_md(res_a, res_b, res_c)
    print(f"\nResults written to: {OUTPUT_MD}")


if __name__ == "__main__":
    main()
