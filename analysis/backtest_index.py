"""
analysis/backtest_index.py
==========================
B2 ground-truth back-test harness: validate the live gentrification index against
MSS Status/Dynamik classes and known Berlin hotspot/coldspot PLRs.

Five tests are run:

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

  Test D — Dynamism (D2) agreement:
    Spearman rank correlation between the live `dynamism_index` (from gentrification_index,
    live_data variant) and the MSS D2 Dynamik ordinal (from int_gentrification_ts, latest
    edition). Mirrors Test A one dimension over (R-B2b, #264).
    Pass threshold: rho > 0.3, p < 0.05.

  Test E — Emerging-east recall (R-B2c, #278; criterion tightened at iteration 2 review):
    Fraction of labelled 'emerging-east' PLRs from seed_gentrification_ground_truth that
    meet the STRICT dynamism-aware criterion: mittel status (D1 status_index == 2) AND
    IMPROVING dynamism only (D2 dynamik_index == 1) AND under active Milieuschutz
    protection (under_milieuschutz = true). This replaces Test B's top-decile status_index
    criterion for the eastern-Berlin frontier class, per the R-B2b domain sign-off's finding
    that no Lichtenberg PLR is simultaneously a documented gentrification frontier and
    top-decile deprived (docs/methodology/R-B2b-domain-signoff.md). Run as its own test path
    -- NOT folded into Test B's 'hotspot' recall, which would either mis-sign GDR-era
    Plattenbau deprivation as gentrification or silently dilute what Test B measures.
    Pass threshold: recall >= 0.5 (same rationale as Tests B/C).

    CRITERION HISTORY (iteration-2 reviewer finding, #278): the first implementation used a
    LOOSENED "non-declining" reading (D2 in {1 improving, 2 stabil}), which the independent
    reviewer found to be a silent, unilateral loosening of the SPEC's literal "D2 (improving
    dynamism)" wording (R-B2b domain sign-off, Item 2, recommendation 1) -- and, worse, to be
    nearly vacuous at citywide scale (169/542 = 31% of all Berlin PLRs meet the loose
    reading, spread across the classic west/inner-city bezirke already covered by
    hotspot/mixed, with only 9 of 169 in Lichtenberg). This module now implements the
    STRICT reading (D2 == 1 only); citywide it matches 22/542 PLRs, of which only
    11300724 Roedeliusplatz is also in the ground-truth seed. Recall accordingly drops to
    1/4 = 0.25 (FAIL, below the 0.5 threshold) -- disclosed honestly, not hidden. The other
    three seed PLRs (Frankfurter Allee Süd, Victoriastadt/Kaskelkiez, Weitlingkiez) are all
    D2 == 2 (stabil) / typology_stage == 'stable-established' (transform/macros/
    typology_stage.sql, ADR-0008), matching the R-B2b domain sign-off's own candidate table,
    which distinguished Roedeliusplatz as "emerging-east (hotspot-by-dynamism)" from the
    other three as "emerging-east / control" -- i.e. the domain expert's own turnkey table
    already hinted these three were not meant to be tested on equal footing with the
    archetype. Whether these three PLRs should be re-labelled out of the Test-E-gated
    'emerging-east' class into a separate, non-gating control class (the R-B2b sign-off's
    design Option 2) is an OPEN QUESTION left for the geo-DS + domain-expert sign-off --
    see "Open questions for methodology sign-off" in docs/methodology/backtest.md. This
    module deliberately does NOT unilaterally relabel the seed; that decision belongs to the
    methodology gate, not the coder.

    Note: the design's third criterion, "Altbau" (pre-1919 Gründerzeit building stock), has
    no corresponding warehouse column and is NOT computationally gated here. The code
    ASSERTS -- but has NOT had domain-expert confirmation -- that Milieuschutz designation
    implies Altbau-era building stock for these four PLRs. Milieuschutz
    (Soziale-Erhaltungsgebiet) and Altbau/Gründerzeit building stock are related but NOT
    definitionally identical (a Soziale-Erhaltungsgebiet can in principle include non-Altbau
    stock). This substitution is flagged as a second OPEN QUESTION for domain-expert
    sign-off in docs/methodology/backtest.md and transform/seeds/schema.yml -- disclosure in
    this code comment is not the same as domain approval.

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
THRESHOLD_MSS_RHO = 0.3  # Test A: Spearman rho > 0.3
THRESHOLD_MSS_P = 0.05  # Test A: p-value < 0.05
THRESHOLD_RECALL = 0.5  # Tests B & C: recall@decile >= 0.5


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
    # under_milieuschutz / typology_stage (added R-B2c, #278) feed Test E's
    # dynamism-aware emerging-east criterion (D1=2 AND D2==1 (strict "improving") AND
    # under_milieuschutz -- tightened at iteration-2 review, see module docstring); both
    # already exist on int_gentrification_ts (int_berlin_milieuschutz_plr_flag
    # disclosure-only join; typology_stage from the D1xD2 matrix, ADR-0008).
    mss_df = con.execute("""
        SELECT
            area_code,
            area_vintage,
            snapshot_year,
            mss_edition,
            status_index        AS mss_status_index,
            dynamik_index       AS mss_dynamik_index,
            dynamism_score      AS mss_dynamism_score,
            ewr_composite,
            typology_stage      AS mss_typology_stage,
            under_milieuschutz  AS mss_under_milieuschutz
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
    # 'hotspot'       = currently under gentrification pressure (high D1 = high deprivation)
    # 'coldspot'      = stable, affluent, low deprivation (D1 = 1 = hoch)
    # 'mixed'         = transitional / completed gentrification process
    # 'emerging-east' = eastern-Berlin mittel-status frontier (R-B2c, #278); tested by
    #                   Test E's dynamism-aware criterion, NOT Test B's top-decile criterion
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
    status_range = (
        (float(status_vals.min()), float(status_vals.max())) if n_valid > 0 else (None, None)
    )
    n_classes = len(np.unique(status_vals))

    # Join gentrification_index.status_index with int_gentrification_ts.mss_status_index
    # on area_code to get paired observations (both DataFrames from duckdb .df())
    merged = (
        index_df[["area_code", "status_index"]]
        .merge(
            mss_df[["area_code", "mss_status_index"]],
            on="area_code",
            how="inner",
        )
        .dropna()
    )

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
# Test D — Dynamism (D2) agreement (R-B2b, #264)
# ---------------------------------------------------------------------------


def test_dynamism_agreement(index_df, mss_df) -> dict:
    """Test D (R-B2b, #264): Spearman rank correlation between live dynamism_index and
    MSS D2 (dynamik_index).

    Mirrors Test A's design exactly, one dimension over: gentrification_index.dynamism_index
    (live_data variant) carries MSS D2 Dynamik (transform/models/marts/gentrification_index.sql
    line ~135: `cast(ts.dynamik_index as double) as dynamism_index`) via int_poi_status_dynamism;
    int_gentrification_ts.dynamik_index is the same MSS D2 ordinal sourced directly from
    stg_berlin_mss. Both encode the identical MSS D2 class (1=positiv/improving,
    2=stabil, 3=negativ/declining) via different model paths -- this test cross-validates
    pipeline alignment, exactly as Test A does for D1/status_index, not a new statistical
    claim about dynamism per se.

    Filed as a follow-up in both R-B2 sign-offs (docs/methodology/R-B2-geo-signoff.md,
    "Add a dynamism_index back-test as a follow-up ticket") -- #264 re-opens it. Mirrors
    Test A's exact methodology (Spearman rho, same thresholds) as the natural D2 analogue.
    Confirmed appropriate by both geo-DS (docs/methodology/R-B2b-geo-signoff.md, Verdict:
    PASS -- "the D2 analogue of Test A... mirroring is the consistent and defensible
    choice") and gentrification-domain-expert (docs/methodology/R-B2b-domain-signoff.md,
    Verdict: PASS -- "a pure DE pipeline sanity check with no domain content to gate").

    Pass threshold: rho > 0.3, p < 0.05 (same as Test A -- proposed, not independently
    re-derived here).
    """
    n_total = len(index_df)
    dynamism_vals = index_df["dynamism_index"].dropna().values.astype(float)
    n_valid = len(dynamism_vals)
    dynamism_range = (
        (float(dynamism_vals.min()), float(dynamism_vals.max())) if n_valid > 0 else (None, None)
    )
    n_classes = len(np.unique(dynamism_vals)) if n_valid > 0 else 0

    merged = (
        index_df[["area_code", "dynamism_index"]]
        .merge(
            mss_df[["area_code", "mss_dynamik_index"]],
            on="area_code",
            how="inner",
        )
        .dropna()
    )

    n_paired = len(merged)
    if n_paired < 10:
        return {
            "n_total": n_total,
            "n_valid": n_valid,
            "n_paired": n_paired,
            "dynamism_range": dynamism_range,
            "n_classes": n_classes,
            "rho": None,
            "p": None,
            "pass": False,
            "note": (
                "Too few paired observations for Test D Spearman "
                "(gentrification_index vs int_gentrification_ts join returned < 10 rows)."
            ),
        }

    rho, p = stats.spearmanr(
        merged["dynamism_index"].values.astype(float),
        merged["mss_dynamik_index"].values.astype(float),
    )
    rho = float(rho)
    p = float(p)

    pass_flag = (rho > THRESHOLD_MSS_RHO) and (p < THRESHOLD_MSS_P)

    mss_edition = int(mss_df["mss_edition"].iloc[0]) if len(mss_df) > 0 else None

    return {
        "n_total": n_total,
        "n_valid": n_valid,
        "n_paired": n_paired,
        "dynamism_range": dynamism_range,
        "n_classes": n_classes,
        "rho": rho,
        "p": p,
        "pass": pass_flag,
        "mss_edition": mss_edition,
        "note": (
            f"Spearman(gentrification_index.dynamism_index, int_gentrification_ts.dynamik_index) "
            f"at MSS edition {mss_edition}. "
            "Cross-validates that the mart and the intermediate model agree on the MSS D2 ordinal "
            "(mirrors Test A's design for D1). "
            f"n_paired={n_paired}. Threshold: rho > {THRESHOLD_MSS_RHO}, p < {THRESHOLD_MSS_P} "
            "(design confirmed by geo-DS + domain-expert sign-off, docs/methodology/R-B2b-geo-signoff.md, R-B2b-domain-signoff.md)."
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
    top_decile_ids = set(index_df[index_df["status_index"] >= threshold_90]["area_code"].tolist())
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
        details.append(
            {
                "plr_id": plr_id,
                "plr_name": row["plr_name"],
                "status_index": si,
                "status_class": sc,
                "in_top_decile": in_top,
                "source": row["source"],
            }
        )

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
        details.append(
            {
                "plr_id": plr_id,
                "plr_name": row["plr_name"],
                "status_index": si,
                "status_class": sc,
                "in_bottom_decile": in_bottom,
                "source": row["source"],
            }
        )

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
# Test E — Emerging-east recall (dynamism-aware) (R-B2c, #278)
# ---------------------------------------------------------------------------


def test_emerging_east_recall(mss_df, gt_df) -> dict:
    """Test E (R-B2c, #278): dynamism-aware recall for the 'emerging-east' label.

    Eastern-Berlin (Lichtenberg) gentrification frontiers do not fit the west-Berlin-shaped
    'hotspot' criterion (D1 top-decile deprived): the R-B2b domain sign-off
    (docs/methodology/R-B2b-domain-signoff.md) found no Lichtenberg PLR is simultaneously
    a documented gentrification frontier AND top-decile deprived on `status_index` -- the
    real frontiers sit at mittel status (D1=2) with (per the SPEC's literal wording)
    IMPROVING dynamism (D2 == 1), inheriting invasion-succession pressure from
    Friedrichshain (Dangschat 1988) and formally recognised via Milieuschutz (Soziale
    Erhaltungsverordnung) designation.

    Criterion (replaces Test B's top-decile status_index criterion for this label):
      mittel status (mss_status_index == 2)
      AND STRICTLY improving dynamism (mss_dynamik_index == 1; excludes 2=stabil and
          3=negativ/declining -- matches the R-B2b domain sign-off's literal wording,
          "D2 (improving dynamism)", recommendation 1, Item 2)
      AND under active Milieuschutz protection (mss_under_milieuschutz = true)

    This is a genuinely different test PATH from Test B, not a relaxed version of it -- run
    alongside (not merged into) Test B so the existing hotspot recall metric's denominator
    and meaning are unchanged (design Option 1 of the R-B2c SPEC).

    CRITERION TIGHTENED at iteration-2 review (#278): the original implementation used
    `mss_dynamik_index.isin([1, 2])` (a "non-declining" reading), which an independent
    reviewer found (a) silently loosened the SPEC's literal "improving" wording and (b) was
    nearly vacuous at citywide scale -- 169/542 Berlin PLRs (31%) meet the loose reading,
    concentrated in the classic west/inner-city bezirke already covered by hotspot/mixed,
    with only 9/169 in Lichtenberg. Under the STRICT `== 1` reading, only 22/542 PLRs match
    citywide, of which only 11300724 Roedeliusplatz is in the ground-truth seed -- so recall
    drops to 1/4 = 0.25 (FAIL @ >= 0.5 threshold). This is disclosed honestly below, not
    hidden. Whether the other three seed PLRs (all D2 == 2 / typology_stage ==
    'stable-established') should be moved to a separate, non-Test-E-gated control class is
    an explicit OPEN QUESTION for the geo-DS + domain-expert sign-off -- see "Open questions
    for methodology sign-off" in docs/methodology/backtest.md. Not resolved unilaterally
    here.

    Note (R-C2 grounding, data limitation disclosure -- OPEN QUESTION, not domain-blessed):
    the design's third criterion, "Altbau" (pre-1919/Gründerzeit building stock), has no
    warehouse column and is not computationally gated here. The code currently ASSERTS --
    without domain-expert confirmation -- that it is satisfied qualitatively for all four
    candidate PLRs via their cited Milieuschutz Soziale-Erhaltungsgebiet designations.
    Milieuschutz and Altbau-era building stock are related but NOT definitionally identical;
    this substitution is flagged as an open question for domain-expert sign-off in
    docs/methodology/backtest.md and transform/seeds/schema.yml, not a settled fact.

    Pass threshold: recall >= 0.5 (same rationale as Tests B/C: 50% is the minimum for a
    useful discriminator at a criterion this narrow). Current result: FAIL (see above) --
    reported honestly as a real finding, not suppressed.
    """
    ee_ids = set(gt_df[gt_df["label"] == "emerging-east"]["plr_id"].tolist())
    n_ee = len(ee_ids)

    if n_ee == 0:
        return {
            "n_emerging_east": 0,
            "n_matched": 0,
            "n_criterion_matched": 0,
            "recall": None,
            "pass": False,
            "note": "No emerging-east PLRs in ground truth seed.",
        }

    # PLRs meeting the dynamism-aware criterion (computed over ALL PLRs, not just the
    # labelled set, so the criterion is applied identically regardless of label -- same
    # discipline as Test B's top-decile threshold).
    # STRICT reading (== 1, "improving" only), tightened at iteration-2 review (#278) to
    # match the SPEC's literal wording -- see module + function docstrings for the
    # citywide base-rate comparison against the previously-implemented loose (<= 2) reading.
    criterion_mask = (
        (mss_df["mss_status_index"] == 2)
        & (mss_df["mss_dynamik_index"] == 1)
        & (mss_df["mss_under_milieuschutz"].fillna(False))
    )
    criterion_ids = set(mss_df.loc[criterion_mask, "area_code"].tolist())

    matched_ids = ee_ids & set(mss_df["area_code"].tolist())
    n_matched = len(matched_ids)

    if n_matched == 0:
        return {
            "n_emerging_east": n_ee,
            "n_matched": 0,
            "n_criterion_matched": 0,
            "recall": None,
            "pass": False,
            "note": "None of the emerging-east PLRs found in int_gentrification_ts.",
        }

    n_criterion_matched = len(matched_ids & criterion_ids)
    recall = n_criterion_matched / n_matched
    pass_flag = recall >= THRESHOLD_RECALL

    details = []
    for plr_id in sorted(matched_ids):
        row = gt_df[gt_df["plr_id"] == plr_id].iloc[0]
        mss_row = mss_df[mss_df["area_code"] == plr_id]
        d1 = float(mss_row["mss_status_index"].iloc[0]) if len(mss_row) > 0 else None
        d2 = float(mss_row["mss_dynamik_index"].iloc[0]) if len(mss_row) > 0 else None
        typ = str(mss_row["mss_typology_stage"].iloc[0]) if len(mss_row) > 0 else None
        ms = bool(mss_row["mss_under_milieuschutz"].iloc[0]) if len(mss_row) > 0 else None
        details.append(
            {
                "plr_id": plr_id,
                "plr_name": row["plr_name"],
                "d1_status": d1,
                "d2_dynamik": d2,
                "typology_stage": typ,
                "under_milieuschutz": ms,
                "meets_criterion": plr_id in criterion_ids,
                "source": row["source"],
            }
        )

    return {
        "n_emerging_east": n_ee,
        "n_matched": n_matched,
        "n_criterion_matched": n_criterion_matched,
        "recall": recall,
        "pass": pass_flag,
        "details": details,
        "note": (
            f"Strict dynamism-aware criterion (D1=2 AND D2==1 AND under_milieuschutz, "
            f"tightened at iteration-2 review to match the SPEC's literal 'improving' "
            f"wording): {n_criterion_matched}/{n_matched} emerging-east PLRs match. "
            "See module docstring for the citywide base-rate comparison (22/542 strict "
            "vs. 169/542 for the previously-implemented loose reading) and the open "
            "question on whether the 3 non-matching PLRs belong in a separate control class."
        ),
    }


# ---------------------------------------------------------------------------
# Diagnostic (non-gating) — hotspot+emerging-east merged under Test B's
# top-decile criterion (R-B2c, #278)
# ---------------------------------------------------------------------------


def diagnostic_merged_hotspot_recall(index_df, gt_df) -> dict:
    """Diagnostic only -- NOT a pass/fail gate, not part of the OVERALL verdict.

    Quantifies what the R-B2b domain sign-off predicted: folding 'emerging-east' PLRs
    into Test B's 'hotspot' top-decile criterion would dilute (not inflate) the hotspot
    recall metric, because the emerging-east PLRs sit at mittel status_index (2), below
    the top-decile threshold (observed 3.0). This function exists solely to make that
    prediction empirically checkable and to document, in the back-test record, why Test B
    and Test E are kept as separate test paths (R-B2c design Option 1) rather than merged.
    """
    hotspot_ids = set(gt_df[gt_df["label"] == "hotspot"]["plr_id"].tolist())
    ee_ids = set(gt_df[gt_df["label"] == "emerging-east"]["plr_id"].tolist())
    merged_ids = hotspot_ids | ee_ids

    threshold_90 = float(np.percentile(index_df["status_index"].dropna().values, 90))
    top_decile_ids = set(index_df[index_df["status_index"] >= threshold_90]["area_code"].tolist())

    def _recall(label_ids):
        matched = label_ids & set(index_df["area_code"].tolist())
        if len(matched) == 0:
            return None, 0, 0
        in_decile = len(matched & top_decile_ids)
        return in_decile / len(matched), in_decile, len(matched)

    hotspot_only_recall, hs_in, hs_n = _recall(hotspot_ids)
    merged_recall, merged_in, merged_n = _recall(merged_ids)

    return {
        "decile_threshold": threshold_90,
        "hotspot_only_recall": hotspot_only_recall,
        "hotspot_only_n_in_decile": hs_in,
        "hotspot_only_n": hs_n,
        "merged_recall": merged_recall,
        "merged_n_in_decile": merged_in,
        "merged_n": merged_n,
        "note": (
            "Diagnostic only (not a gate): if 'emerging-east' PLRs were folded into "
            "'hotspot' and tested against Test B's unchanged top-decile status_index "
            "criterion, recall would move from "
            f"{hotspot_only_recall:.2f} ({hs_in}/{hs_n}) to {merged_recall:.2f} "
            f"({merged_in}/{merged_n}) -- a dilution, not an inflation, confirming the "
            "R-B2b domain sign-off's prediction and the R-B2c decision to keep Test E "
            "as its own path rather than merge the labels."
        ),
    }


# ---------------------------------------------------------------------------
# Output helpers
# ---------------------------------------------------------------------------


def _pass_str(flag: bool | None) -> str:
    if flag is None:
        return "N/A"
    return "PASS" if flag else "FAIL"


def print_results(
    res_a: dict,
    res_b: dict,
    res_c: dict,
    res_d: dict | None = None,
    res_e: dict | None = None,
    diag: dict | None = None,
) -> None:
    """Print a summary of test results to stdout. res_d (Test D, R-B2b #264) and
    res_e/diag (Test E + merged-recall diagnostic, R-B2c #278) are optional for
    backward compatibility with any external caller not yet updated."""
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

    if res_d is not None:
        print("\n--- Test D: Dynamism (D2) agreement (R-B2b, #264) ---")
        print(f"  n (total PLRs):  {res_d['n_total']}")
        print(f"  n (cross-validated pairs): {res_d['n_paired']}")
        if res_d.get("mss_edition"):
            print(f"  MSS edition: {res_d['mss_edition']}")
        print(f"  dynamism_index range: {res_d['dynamism_range']}")
        print(f"  n distinct classes: {res_d['n_classes']}")
        if res_d["rho"] is not None:
            print(f"  rho = {res_d['rho']:.4f}, p = {res_d['p']:.4f}")
        print(f"  Threshold: rho > {THRESHOLD_MSS_RHO}, p < {THRESHOLD_MSS_P}")
        print(f"  Result: {_pass_str(res_d['pass'])}")
        print(f"  Note: {res_d['note']}")

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
            print(
                f"    {d['plr_id']} {d['plr_name']:<30} si={d['status_index']} {d['status_class']:<25} [{flag}]"
            )

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
            print(
                f"    {d['plr_id']} {d['plr_name']:<30} si={d['status_index']} {d['status_class']:<25} [{flag}]"
            )

    if res_e is not None:
        print("\n--- Test E: Emerging-east recall (dynamism-aware, STRICT) (R-B2c, #278) ---")
        print(f"  n emerging-east in seed: {res_e['n_emerging_east']}")
        print(f"  n found in warehouse:    {res_e['n_matched']}")
        print(
            f"  n meeting criterion (D1=2 AND D2==1 AND under_milieuschutz): {res_e.get('n_criterion_matched')}"
        )
        if res_e.get("recall") is not None:
            print(f"  recall = {res_e['recall']:.2f}")
        print(f"  Threshold: recall >= {THRESHOLD_RECALL}")
        print(f"  Result: {_pass_str(res_e['pass'])}")
        if "details" in res_e:
            for d in res_e["details"]:
                flag = "MEETS CRITERION" if d["meets_criterion"] else "does NOT meet criterion"
                print(
                    f"    {d['plr_id']} {d['plr_name']:<30} D1={d['d1_status']} D2={d['d2_dynamik']} "
                    f"{d['typology_stage']:<25} milieuschutz={d['under_milieuschutz']} [{flag}]"
                )

    if diag is not None:
        print(
            "\n--- Diagnostic (non-gating): merged hotspot+emerging-east @ Test B's top decile ---"
        )
        print(f"  {diag['note']}")

    overall_tests = [res_a["pass"], res_b["pass"], res_c["pass"]]
    if res_d is not None:
        overall_tests.append(res_d["pass"])
    if res_e is not None:
        overall_tests.append(res_e["pass"])
    overall = all(overall_tests)
    print("\n" + "=" * 80)
    print(f"OVERALL: {'ALL PASS' if overall else 'ONE OR MORE FAIL'}")
    print("=" * 80)


def write_backtest_md(
    res_a: dict,
    res_b: dict,
    res_c: dict,
    res_d: dict | None = None,
    res_e: dict | None = None,
    diag: dict | None = None,
) -> None:
    """Write (overwrite) docs/methodology/backtest.md with methodology and results."""
    OUTPUT_MD.parent.mkdir(parents=True, exist_ok=True)
    run_date = datetime.now().strftime("%Y-%m-%d")
    overall_tests = [res_a["pass"], res_b["pass"], res_c["pass"]]
    if res_d is not None:
        overall_tests.append(res_d["pass"])
    if res_e is not None:
        overall_tests.append(res_e["pass"])
    overall = all(overall_tests)
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
            "2. **Known hotspot/coldspot/emerging-east PLRs** (`seed_gentrification_ground_truth`): "
            "a curated seed of Berlin PLRs with literature-based labels drawn from "
            "Döring & Ulbricht (2016), Holm & Schulz (2016), Dangschat (1988), the 2018 thesis "
            "(Helweg 2018), and direct MSS 2023/2025 class assignments. Tests B and C check "
            "whether labelled 'hotspot' and 'coldspot' PLRs appear in the expected tail of the "
            "status_index distribution. Test E (R-B2c, #278) checks whether labelled "
            "'emerging-east' PLRs -- eastern-Berlin frontiers that do NOT fit the "
            "top-decile-deprived 'hotspot' shape -- meet a separate, dynamism-aware criterion "
            "instead.\n\n"
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
            "appear at the low end of the status_index distribution. |\n"
        )
        f.write(
            f"| D: Dynamism (D2) agreement (rho) | rho > {THRESHOLD_MSS_RHO}, p < {THRESHOLD_MSS_P} | "
            "Cross-validates gentrification_index.dynamism_index against "
            "int_gentrification_ts.dynamik_index, mirroring Test A for the D2 dimension "
            "(R-B2b, #264). |\n"
        )
        f.write(
            f"| E: Emerging-east recall (R-B2c, #278; STRICT criterion, tightened at "
            f"iteration-2 review) | >= {THRESHOLD_RECALL:.0%} | "
            "Same 50% recall rationale as Tests B/C, applied to the STRICT dynamism-aware "
            "criterion (D1=2 AND D2==1 'improving' AND under_milieuschutz) rather than the "
            "top-decile status_index criterion, matching the R-B2b domain sign-off's literal "
            "wording. An independent reviewer found the originally-implemented loosened "
            "reading (D2<=2, 'non-declining') to be a silent, unilateral loosening that was "
            "nearly vacuous at citywide scale (169/542 = 31% of Berlin PLRs); see "
            '"Open questions for methodology sign-off" below for the full disclosure. |\n\n'
        )

        f.write("### Label semantics\n\n")
        f.write(
            "- **hotspot**: PLR under active gentrification pressure or with documented "
            "high vulnerability (typically D1 status 3–4 = niedrig/sehr_niedrig). "
            "These areas are expected to appear in the top decile (most deprived = "
            "highest status_index). West-Berlin-shaped: deprivation and pressure "
            "coincide. Tested by Test B.\n"
        )
        f.write(
            "- **coldspot**: Stable, affluent outer-city PLR (typically D1 status 1 = hoch). "
            "Expected in the bottom decile (least deprived = lowest status_index).\n"
        )
        f.write(
            "- **mixed**: Transitional area or completed-gentrification PLR. Not "
            "expected to fall clearly in either decile; used for narrative context only.\n"
        )
        f.write(
            "- **emerging-east** (R-B2c, #278): eastern-Berlin (Lichtenberg) gentrification "
            "frontier at mittel status (D1=2) under Milieuschutz protection. Deprivation "
            "and pressure do NOT coincide here (the R-B2b domain sign-off found no "
            "Lichtenberg PLR is both a documented frontier and top-decile deprived) -- "
            "these PLRs are **not** expected in Test B's top decile, and are tested instead "
            "by the separate, dynamism-aware Test E, which (as of the iteration-2 review) "
            "STRICTLY requires D2==1 'improving' dynamism, matching the R-B2b sign-off's "
            "literal wording. Only 1 of the 4 seed PLRs (Roedeliusplatz) meets this strict "
            "reading; the other 3 are D2=2 ('stabil') / `typology_stage`='stable-established' "
            '-- see "Open questions for methodology sign-off" below for the disclosed '
            "trade-off between the strict and a looser reading, and whether those 3 PLRs "
            "belong in a separate, non-gated control class instead.\n\n"
        )

        f.write("---\n\n")
        f.write("## Latest Results\n\n")
        f.write(f"**Run date:** {run_date}\n")
        f.write("**Index period:** latest available `live_data` PLR period\n")
        f.write(
            f"**PLRs in index:** {res_a['n_total']} (status_index not null: {res_a['n_valid']})\n\n"
        )

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

        if res_d is not None:
            f.write("### Test D — Dynamism (D2) agreement (R-B2b, #264)\n\n")
            f.write(
                "Spearman rank correlation between `gentrification_index.dynamism_index` "
                "(live_data variant) and `int_gentrification_ts.dynamik_index` at the latest "
                "MSS edition. Mirrors Test A's design for the D2 (Dynamik) dimension: both "
                "columns carry the same MSS D2 ordinal via different model paths. Design "
                "confirmed by both geo-DS and gentrification-domain-expert "
                "(docs/methodology/R-B2b-geo-signoff.md, R-B2b-domain-signoff.md, both "
                "Verdict: PASS, #264).\n\n"
            )
            if res_d.get("mss_edition"):
                f.write(f"- MSS edition used for cross-validation: {res_d['mss_edition']}\n")
            f.write(f"- n (cross-validated pairs): {res_d['n_paired']}\n")
            f.write(f"- dynamism_index range: {res_d['dynamism_range']}\n")
            f.write(f"- Distinct dynamism classes: {res_d['n_classes']}\n")
            if res_d["rho"] is not None:
                f.write(f"- Spearman rho = **{res_d['rho']:.4f}**, p = {res_d['p']:.4f}\n")
            f.write(f"- Threshold: rho > {THRESHOLD_MSS_RHO}, p < {THRESHOLD_MSS_P}\n")
            f.write(f"- **Result: {_pass_str(res_d['pass'])}**\n\n")
            f.write(f"*{res_d['note']}*\n\n")

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
            f.write(
                f"- Recall = **{res_b['recall']:.2f}** ({res_b['n_in_decile_matched']}/{res_b['n_matched']})\n"
            )
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
            f.write(
                f"- Recall = **{res_c['recall']:.2f}** ({res_c['n_in_decile_matched']}/{res_c['n_matched']})\n"
            )
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

        if res_e is not None:
            f.write("### Test E — Emerging-east recall (dynamism-aware, STRICT) (R-B2c, #278)\n\n")
            f.write(
                "Fraction of labelled `emerging-east` PLRs from `seed_gentrification_ground_truth` "
                "that meet the STRICT dynamism-aware criterion: mittel status (`status_index == 2`) "
                "AND IMPROVING dynamism only (`dynamik_index == 1`) AND under active Milieuschutz "
                "protection (`under_milieuschutz = true`). This **replaces** Test B's top-decile "
                "`status_index` criterion for this label -- run as its own test path, not merged "
                "into Test B's recall (see the diagnostic below for why). Design Option 1 of the "
                "R-B2b domain sign-off's follow-up recommendation "
                "(docs/methodology/R-B2b-domain-signoff.md), with the criterion **tightened at "
                'iteration-2 review** to the SPEC\'s literal "D2 (improving dynamism)" wording -- '
                'see "Open questions for methodology sign-off" below for the full disclosure of '
                "why, and the resulting FAIL.\n\n"
            )
            f.write(f"- n emerging-east PLRs in seed: {res_e['n_emerging_east']}\n")
            f.write(f"- n found in warehouse: {res_e['n_matched']}\n")
            f.write(f"- n meeting criterion: {res_e.get('n_criterion_matched')}\n")
            if res_e.get("recall") is not None:
                f.write(
                    f"- Recall = **{res_e['recall']:.2f}** "
                    f"({res_e['n_criterion_matched']}/{res_e['n_matched']})\n"
                )
            f.write(f"- Threshold: recall >= {THRESHOLD_RECALL}\n")
            f.write(f"- **Result: {_pass_str(res_e['pass'])}**\n\n")

            if "details" in res_e:
                f.write("#### Emerging-east PLR details\n\n")
                f.write(
                    "| PLR ID | Name | D1 status | D2 dynamik | Typology stage | "
                    "Under Milieuschutz | Meets criterion | Source |\n"
                )
                f.write("|---|---|---|---|---|---|---|---|\n")
                for d in res_e["details"]:
                    flag = "Yes" if d["meets_criterion"] else "No"
                    f.write(
                        f"| {d['plr_id']} | {d['plr_name']} | {d['d1_status']} | {d['d2_dynamik']} "
                        f"| {d['typology_stage']} | {d['under_milieuschutz']} | {flag} | {d['source']} |\n"
                    )
                f.write("\n")

        if diag is not None:
            f.write("#### Diagnostic (non-gating): hotspot recall if merged with emerging-east\n\n")
            f.write(
                "This diagnostic is **not** a pass/fail gate and does **not** count toward the "
                "overall result above -- it exists only to make the R-B2b domain sign-off's "
                "prediction empirically checkable: does folding `emerging-east` PLRs into "
                "`hotspot` and testing them against Test B's *unchanged* top-decile "
                "`status_index` criterion inflate or dilute recall?\n\n"
            )
            f.write(f"- Top-decile threshold (status_index): {diag['decile_threshold']}\n")
            if diag.get("hotspot_only_recall") is not None:
                f.write(
                    f"- Hotspot-only recall (current Test B, unchanged): "
                    f"**{diag['hotspot_only_recall']:.2f}** "
                    f"({diag['hotspot_only_n_in_decile']}/{diag['hotspot_only_n']})\n"
                )
            if diag.get("merged_recall") is not None:
                f.write(
                    f"- Hotspot+emerging-east merged recall (hypothetical, NOT implemented): "
                    f"**{diag['merged_recall']:.2f}** "
                    f"({diag['merged_n_in_decile']}/{diag['merged_n']})\n"
                )
            f.write(f"\n*{diag['note']}*\n\n")

        if res_e is not None:
            f.write("---\n\n")
            f.write("## Open questions for methodology sign-off (R-B2c, #278, iteration 2)\n\n")
            f.write(
                "Two open questions from the iteration-2 independent review are surfaced "
                "here explicitly for the geo-DS + gentrification-domain-expert dual sign-off "
                "gate to rule on. Neither has been resolved unilaterally by the coder.\n\n"
            )
            f.write("### Open question 1 — strict vs. loosened D2 criterion for Test E\n\n")
            f.write(
                "The R-B2b domain sign-off's literal recommendation (Item 2, recommendation 1) "
                'reads: *"D2 (improving dynamism) + Milieuschutz + Altbau"*. The first '
                'implementation (iteration 1) read this as "non-declining" (`dynamik_index` '
                "in {1, 2}), which an independent reviewer flagged as a silent, unilateral "
                "loosening with two quantified problems, verified against the live warehouse "
                "(MSS 2025, all 542 Berlin PLRs):\n\n"
            )
            f.write(
                "| Reading | Citywide match count | Match rate | Seed recall |\n"
                "|---|---|---|---|\n"
                "| STRICT (`dynamik_index == 1`, now implemented) | 22 / 542 | 4.1% | "
                "0.25 (1/4) — **FAIL** |\n"
                "| LOOSE (`dynamik_index <= 2`, iteration-1 implementation) | 169 / 542 | "
                "31.2% | 1.00 (4/4) — PASS |\n\n"
            )
            f.write(
                "Under the loose reading, the 169 citywide matches concentrate in the "
                "classic west/inner-city bezirke already covered by the `hotspot`/`mixed` "
                "labels (per the reviewer's bezirk breakdown: Mitte 27, Pankow 26, "
                "Friedrichshain-Kreuzberg 24, Neukölln 23, Tempelhof-Schöneberg 20, "
                "Charlottenburg-Wilmersdorf 20), with only 9 of 169 in Lichtenberg — i.e. "
                "the loose criterion is nearly vacuous as an eastern-frontier-specific "
                "discriminator (it removes only 10 of the 179 mittel-status+Milieuschutz "
                "PLRs from consideration).\n\n"
            )
            f.write(
                "This module now implements the **STRICT** reading, matching the SPEC's "
                "literal wording. Under this reading, only `11300724` Roedeliusplatz "
                "(D1=2, D2=1, `typology_stage`='active-gentrification') meets the criterion; "
                "the other three seed PLRs (`11400927` Victoriastadt/Kaskelkiez, `11400929` "
                "Weitlingkiez, `11300826` Frankfurter Allee Süd) are all D2=2 ('stabil') / "
                "`typology_stage`='stable-established' (ADR-0008 D1xD2 matrix, "
                "`transform/macros/typology_stage.sql`) — the same typology stage label "
                "already used elsewhere in the seed for the *completed*/`mixed` PLR "
                "Kollwitzplatz. Test E recall accordingly drops to **0.25 (1/4)**, below the "
                "0.5 pass threshold — reported honestly as a FAIL, not hidden or re-loosened "
                "to force a pass.\n\n"
            )
            f.write(
                "**Decision needed at sign-off:** the R-B2b domain sign-off's own turnkey "
                "candidate table (docs/methodology/R-B2b-domain-signoff.md) already labelled "
                'Roedeliusplatz "emerging-east (hotspot-by-dynamism)" but the other three '
                '"emerging-east / control" — a distinction the iteration-1 implementation did '
                "not preserve (all four were folded into a single `emerging-east` label tested "
                "uniformly by Test E). Two resolutions are on the table for the geo-DS + "
                "domain-expert to choose between (or propose a third):\n\n"
                "1. **Accept the strict-criterion FAIL as the honest result.** Document that "
                "only Roedeliusplatz currently qualifies as an active (not just watched) "
                "eastern gentrification frontier under the literal SPEC criterion; the other "
                "three remain descriptively interesting (Milieuschutz-protected, mittel "
                "status) but do not (yet) show accelerating dynamism.\n"
                "2. **Re-label the 3 non-archetype PLRs** out of the Test-E-gated "
                "`emerging-east` class into a separate, non-gating control class (the R-B2b "
                "sign-off's design Option 2 — \"an explicitly separate control class... so "
                "Test B's recall denominator is not silently changed\"), leaving `emerging-east` "
                "as a single-PLR archetype class or expanding it only with future strict-"
                "criterion matches.\n\n"
            )
            f.write(
                "### Open question 2 — Altbau (Gründerzeit building stock) criterion "
                "substitution\n\n"
            )
            f.write(
                "The SPEC's Option 1 design lists three criteria: D2 (improving dynamism) + "
                "Milieuschutz + **Altbau** (pre-1919/Gründerzeit building stock). The live "
                "warehouse has no Altbau/building-vintage column at the PLR level, so this "
                "implementation only computationally gates two of the three criteria (D2 + "
                "Milieuschutz). The code asserts — in a code comment only, prior to this "
                'review — that "Milieuschutz designation implies Altbau", i.e. that all '
                "Berlin Soziale-Erhaltungsgebiete are, by definition, established over "
                "documented Altbau-era displacement pressure. Milieuschutz and Altbau/"
                "Gründerzeit building stock are **related but not definitionally identical** "
                "— a Soziale-Erhaltungsgebiet could in principle be designated over "
                "non-Altbau stock. **This substitution has not been blessed by the "
                "gentrification-domain-expert** and is flagged here explicitly, and in "
                "`transform/seeds/schema.yml`, as an open question for domain sign-off, not "
                "a settled methodological fact.\n\n"
            )

        f.write("---\n\n")
        f.write("## Narrative summary\n\n")

        # Auto-generate narrative based on results
        core_tests = [res_a["pass"], res_b["pass"], res_c["pass"]]
        if res_d is not None:
            core_tests.append(res_d["pass"])
        if res_e is not None:
            core_tests.append(res_e["pass"])
        if all(core_tests):
            f.write(
                "All tests passed. The live index shows structural consistency between "
                "D1 status and D2 dynamism (Tests A/D), correctly identifies known "
                "hotspot/coldspot PLRs at the expected tail of the status_index distribution "
                "(Tests B and C), and correctly identifies eastern-Berlin emerging-east "
                "frontiers under the dynamism-aware criterion (Test E, R-B2c). This confirms "
                "the B2 back-test harness is working as intended.\n\n"
            )
        else:
            failed = []
            if not res_a["pass"]:
                failed.append("Test A (MSS agreement)")
            if not res_b["pass"]:
                failed.append("Test B (hotspot recall)")
            if not res_c["pass"]:
                failed.append("Test C (coldspot recall)")
            if res_d is not None and not res_d["pass"]:
                failed.append("Test D (dynamism agreement)")
            if res_e is not None and not res_e["pass"]:
                failed.append("Test E (emerging-east recall)")
            f.write(
                f"One or more tests did not pass: {', '.join(failed)}. "
                "Review the PLR-level detail tables above for specifics. "
                "Possible causes: index pipeline issue (Test A/D), ground-truth seed mismatch "
                "(Tests B/C/E), or a legitimate finding that known hotspots/coldspots/emerging-east "
                "PLRs are no longer classifying as expected under the current MSS edition.\n\n"
            )
            if res_e is not None and not res_e["pass"]:
                f.write(
                    "**Test E FAIL is a disclosed, expected finding, not a pipeline bug**: it "
                    "reflects the strict-criterion tightening made at iteration-2 review (see "
                    '"Open questions for methodology sign-off" above) -- only 1 of the 4 seed '
                    "`emerging-east` PLRs meets the SPEC's literal 'D2 (improving dynamism)' "
                    "criterion. This is left as an open question for the geo-DS + "
                    "domain-expert sign-off to resolve, not silently patched over.\n\n"
                )

        if res_b.get("recall") is not None and res_b["n_matched"] > 0:
            n_completed = sum(1 for d in res_b.get("details", []) if not d["in_top_decile"])
            if n_completed > 0:
                f.write(
                    f"**Completed-gentrification note**: {n_completed} hotspot PLR(s) are "
                    "NOT in the top decile because they have already completed the "
                    "gentrification process (now showing mittel/hoch MSS status). This is "
                    "expected and correct: a gentrified area is no longer vulnerable. "
                    "See `mixed`-labelled PLRs in the seed for documented examples.\n\n"
                )

        if res_e is not None:
            f.write(
                "**Eastern-Berlin framing note (R-B2c, #278):** the `emerging-east` PLRs above "
                "are tracked **descriptively** at mittel MSS status (D1=2) under documented "
                "Milieuschutz protection; only Roedeliusplatz currently also shows strictly "
                "improving (D2=1) dynamism under the tightened Test E criterion, the other "
                "three show stabil (D2=2) dynamism. This is NOT an assertion that any of these "
                "areas are causally destined to displace or complete gentrification -- it "
                "documents a currently observed pressure signal per the cited literature "
                "(Dangschat 1988; Holm & Schulz 2016) and the R-B2b domain sign-off. Any "
                "published-facing (G2/O2) framing of this class must preserve that distinction "
                "and must not overstate Test E's recall (see \"Open questions for methodology "
                'sign-off" above).\n\n'
            )

        f.write("## Sources\n\n")
        f.write("- Döring, T. & Ulbricht, K. (2016): *Gentrification-Hotspots und ")
        f.write("Verdrängungsprozesse in Berlin*. Stadtforschung und Statistik 1/2016.\n")
        f.write("- Holm, A. & Schulz, M. (2016): Gentrification in Berlin: ")
        f.write("Neighbourhood indices and typologies.\n")
        f.write("- Dangschat, J. (1988): Gentrification: Der Verlauf sozialräumlicher ")
        f.write("Veränderungsprozesse in Großstädten (double invasion-succession cycle; ")
        f.write("R-B2c Test E emerging-east criterion).\n")
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
    print(
        f"  mss_df: {len(mss_df)} PLRs (edition: {mss_df['mss_edition'].iloc[0] if len(mss_df) > 0 else 'N/A'})"
    )
    print(f"  ground_truth: {len(gt_df)} PLRs ({gt_df['label'].value_counts().to_dict()})")

    # Run tests
    print("\nRunning Test A: MSS agreement...")
    res_a = test_mss_agreement(index_df, mss_df)
    print(f"  rho={res_a.get('rho')}, p={res_a.get('p')}, result={_pass_str(res_a['pass'])}")

    print("Running Test D: Dynamism (D2) agreement (R-B2b, #264)...")
    res_d = test_dynamism_agreement(index_df, mss_df)
    print(f"  rho={res_d.get('rho')}, p={res_d.get('p')}, result={_pass_str(res_d['pass'])}")

    print("Running Test B: Hotspot recall @ top 10%...")
    res_b = test_hotspot_recall(index_df, gt_df)
    print(f"  recall={res_b.get('recall')}, result={_pass_str(res_b['pass'])}")

    print("Running Test C: Coldspot recall @ bottom 10%...")
    res_c = test_coldspot_recall(index_df, gt_df)
    print(f"  recall={res_c.get('recall')}, result={_pass_str(res_c['pass'])}")

    print("Running Test E: Emerging-east recall (dynamism-aware) (R-B2c, #278)...")
    res_e = test_emerging_east_recall(mss_df, gt_df)
    print(f"  recall={res_e.get('recall')}, result={_pass_str(res_e['pass'])}")

    diag = diagnostic_merged_hotspot_recall(index_df, gt_df)
    print(f"  Diagnostic (non-gating): {diag['note']}")

    # Print and write results
    print_results(res_a, res_b, res_c, res_d, res_e, diag)

    write_backtest_md(res_a, res_b, res_c, res_d, res_e, diag)
    print(f"\nResults written to: {OUTPUT_MD}")


if __name__ == "__main__":
    main()
