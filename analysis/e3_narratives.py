"""
analysis/e3_narratives.py
=========================
E3 analytical narratives: per-PLR trajectory summaries, time-series stats,
and MSS lead-lag alignment analysis.

Thesis §2.3 defines gentrification as a process of social upgrading; this
script operationalises "upgrading" via the R-A8 longitudinal trajectory model
(fct_gentrification_trajectory) and the D1×D2 MSS typology (fct_gentrification_change).

The gentrification_score column in fct_gentrification_change is the LEGACY
pre-R-A1 formula; it is NULL for the live_data variant. Per-year stats here
use D1 status_index and typology_stage counts instead (R-A1 guidance).

Usage:
  uv run python analysis/e3_narratives.py
"""

from __future__ import annotations

import os
import sys
from pathlib import Path

import duckdb
import pandas as pd

DB_PATH = os.environ.get("GENTRIDUCK_DB", "data/gentriduck.duckdb")
OUT_DIR = Path("data/analysis")


def connect(path: str) -> duckdb.DuckDBPyConnection:
    if not Path(path).exists():
        print(f"ERROR: database not found at {path}", file=sys.stderr)
        sys.exit(1)
    return duckdb.connect(path, read_only=True)


def top_bottom_trajectories(con: duckdb.DuckDBPyConnection) -> pd.DataFrame:
    """
    Top-10 most gentrifying PLRs (improving trajectory, largest status_delta downward
    in numeric terms, i.e. most social-status improvement 2021-2025) and bottom-10
    (declining or persistently-deprived).

    status_delta = status_index_last - status_index_first; negative means numerically
    lower = socially HIGHER status (D1 polarity: 1=hoch/best).
    """
    df = con.execute("""
        SELECT
            t.area_code,
            a.area_name,
            t.trajectory_type,
            t.status_index_first,
            t.status_index_last,
            t.status_delta,
            t.dominant_stage,
            t.trajectory_confidence,
            t.n_editions,
            t.is_persistently_vulnerable,
            t.is_persistently_affluent
        FROM fct_gentrification_trajectory t
        JOIN dim_area a
            ON t.area_code = a.area_code AND t.city_code = a.city_code
        WHERE t.area_vintage = 'lor_2021'
    """).fetchdf()
    return df


def trajectory_stage_distribution(con: duckdb.DuckDBPyConnection) -> pd.DataFrame:
    return con.execute("""
        SELECT
            trajectory_type,
            dominant_stage,
            trajectory_confidence,
            COUNT(*) AS n_plr,
            SUM(CASE WHEN is_persistently_vulnerable THEN 1 ELSE 0 END) AS n_vulnerable,
            SUM(CASE WHEN is_persistently_affluent  THEN 1 ELSE 0 END) AS n_affluent
        FROM fct_gentrification_trajectory
        WHERE area_vintage = 'lor_2021'
        GROUP BY trajectory_type, dominant_stage, trajectory_confidence
        ORDER BY n_plr DESC
    """).fetchdf()


def per_year_stats(con: duckdb.DuckDBPyConnection) -> pd.DataFrame:
    """
    Per-edition snapshot of D1×D2 stage counts. gentrification_score is NULL for the
    live_data variant (pre-R-A1 formula not computed); typology_stage counts are used.
    """
    return con.execute("""
        SELECT
            snapshot_year,
            COUNT(*) FILTER (WHERE NOT is_uninhabited) AS n_inhabited,
            COUNT(*) FILTER (WHERE is_uninhabited)     AS n_uninhabited,
            -- D1 status_index ordinal distribution (1=best, 4=worst)
            ROUND(
                AVG(CAST(status_index AS DOUBLE)) FILTER (WHERE NOT is_uninhabited),
                3
            ) AS mean_status_index,
            ROUND(
                STDDEV(CAST(status_index AS DOUBLE)) FILTER (WHERE NOT is_uninhabited),
                3
            ) AS std_status_index,
            -- Stage counts
            COUNT(*) FILTER (WHERE typology_stage = 'stable-established')     AS n_stable_estab,
            COUNT(*) FILTER (WHERE typology_stage = 'pre-gentrification')     AS n_pre_gent,
            COUNT(*) FILTER (WHERE typology_stage = 'active-gentrification')  AS n_active_gent,
            COUNT(*) FILTER (WHERE typology_stage = 'pioneer-signal')         AS n_pioneer,
            COUNT(*) FILTER (WHERE typology_stage = 'consolidation-pressure') AS n_consolidation,
            COUNT(*) FILTER (WHERE typology_stage = 'improving-vulnerable')   AS n_improving_vuln
        FROM fct_gentrification_change
        WHERE area_vintage = 'lor_2021'
        GROUP BY snapshot_year
        ORDER BY snapshot_year
    """).fetchdf()


def mss_lead_lag_summary(con: duckdb.DuckDBPyConnection) -> pd.DataFrame:
    """
    Exploratory H3a check (amenity→status direction; thesis rejected H3a): does a rise
    in Δdynamism at t associate with social upgrading (status `improved`) at t+k?

    Quartiles on delta_dynamism_t (predictor-side change at t, not the outcome-edition
    level). index-definition.md §2.1–§2.2 (geo condition 1).
    """
    return con.execute("""
        WITH ranked AS (
            SELECT
                lag_k,
                status_transition,
                NTILE(4) OVER (
                    PARTITION BY lag_k ORDER BY delta_dynamism_t
                ) AS dyn_quartile
            FROM int_mss_lead_lag
            WHERE NOT is_pre2021_vintage
              AND status_transition IS NOT NULL
              AND delta_dynamism_t IS NOT NULL
        )
        SELECT
            lag_k,
            dyn_quartile,
            status_transition,
            COUNT(*) AS n
        FROM ranked
        GROUP BY lag_k, dyn_quartile, status_transition
        ORDER BY lag_k, dyn_quartile, status_transition
    """).fetchdf()


def lead_lag_alignment_check(lead_lag: pd.DataFrame) -> dict:
    """
    For lag_k=1: does Q4 (highest Δdynamism at t) show a higher rate of `improved`
    transitions than Q1? `improved` = D1 status_index fell = social upgrading =
    gentrification-relevant direction (D1 polarity: 1=hoch/best; falling number = upgrading).
    -- H3a direction (amenity→status); thesis rejected H3a, so treat as exploratory only.
    """
    k1 = lead_lag[lead_lag["lag_k"] == 1]

    def improved_rate(q: int) -> float:
        grp = k1[k1["dyn_quartile"] == q]
        total = grp["n"].sum()
        improved = grp.loc[grp["status_transition"] == "improved", "n"].sum()
        return improved / total if total > 0 else 0.0

    q1_rate = improved_rate(1)
    q4_rate = improved_rate(4)
    return {
        "lag_k": 1,
        "q1_improved_rate": round(q1_rate, 3),
        "q4_improved_rate": round(q4_rate, 3),
        "direction": "aligned" if q4_rate > q1_rate else "not_aligned",
    }


def build_summary_csv(
    top10: pd.DataFrame,
    bottom10: pd.DataFrame,
    per_year: pd.DataFrame,
    stage_dist: pd.DataFrame,
) -> pd.DataFrame:
    """Combines all outputs into a single long-form CSV for downstream use."""
    frames = []

    for df, section in [(top10, "top10_gentrifying"), (bottom10, "bottom10_stable_or_declining")]:
        tmp = df.copy()
        tmp.insert(0, "section", section)
        frames.append(tmp)

    # per-year wide table as-is
    per_year_out = per_year.copy()
    per_year_out.insert(0, "section", "per_year_stats")
    frames.append(per_year_out)

    stage_dist_out = stage_dist.copy()
    stage_dist_out.insert(0, "section", "trajectory_stage_distribution")
    frames.append(stage_dist_out)

    return pd.concat(frames, ignore_index=True)


def main() -> None:
    con = connect(DB_PATH)
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    print("=" * 70)
    print("E3 Analytical Narratives — Gentriduck gentrification index 2021-2025")
    print("=" * 70)

    # --- Trajectory data ------------------------------------------------
    all_traj = top_bottom_trajectories(con)

    # "Most gentrifying": improving trajectory, sorted by largest negative status_delta
    # (fell most in numeric D1 scale = social upgrading), then by n_editions_improving_stage
    improving = all_traj[all_traj["trajectory_type"] == "improving"].copy()
    improving = improving.sort_values(["status_delta", "dominant_stage"], ascending=[True, True])

    top10 = improving.head(10)

    # "Most stable/declining": persistently-deprived + declining, sorted worst status last
    declining = all_traj[
        all_traj["trajectory_type"].isin(["persistently-deprived", "declining"])
    ].copy()
    declining = declining.sort_values("status_delta", ascending=False)
    bottom10 = declining.head(10)

    print("\n--- TOP-10 MOST GENTRIFYING PLRs (improving trajectory, 2021-2025) ---")
    print(
        top10[
            [
                "area_code",
                "area_name",
                "trajectory_type",
                "status_index_first",
                "status_index_last",
                "status_delta",
                "dominant_stage",
                "trajectory_confidence",
            ]
        ].to_string(index=False)
    )
    print(
        "\nNote: status_delta is D1-ordinal change (negative = social upgrading; 1=hoch/best, 4=sehr_niedrig/worst)."
    )

    print("\n--- BOTTOM-10 MOST STABLE / DECLINING PLRs ---")
    print(
        bottom10[
            [
                "area_code",
                "area_name",
                "trajectory_type",
                "status_index_first",
                "status_index_last",
                "status_delta",
                "dominant_stage",
                "is_persistently_vulnerable",
            ]
        ].to_string(index=False)
    )

    # --- Trajectory stage distribution ----------------------------------
    stage_dist = trajectory_stage_distribution(con)
    total_plr = stage_dist["n_plr"].sum()

    print("\n--- TRAJECTORY STAGE DISTRIBUTION (lor_2021 vintage) ---")
    stage_dist_pct = stage_dist.copy()
    stage_dist_pct["pct"] = (stage_dist_pct["n_plr"] / total_plr * 100).round(1)
    print(stage_dist_pct.to_string(index=False))
    print(f"\nTotal PLRs in lor_2021 vintage: {total_plr}")

    # --- Per-year stats -------------------------------------------------
    per_year = per_year_stats(con)

    print("\n--- PER-YEAR KEY STATS (live_data variant; D1×D2 typology counts) ---")
    print(per_year.to_string(index=False))
    print(
        "\nNote: mean_status_index is D1-ordinal (lower=better). Not metric; shown for directional trend only."
    )

    # --- MSS lead-lag alignment -----------------------------------------
    lead_lag = mss_lead_lag_summary(con)
    alignment = lead_lag_alignment_check(lead_lag)

    print(
        "\n--- EXPLORATORY: Δdynamism_t → D1 status IMPROVEMENT at t+k (H3a direction; thesis rejected) ---"
    )
    print(lead_lag.to_string(index=False))
    print(f"\nExploratory H3a check (lag_k=1, predictor: delta_dynamism_t):")
    print(f"  Q1 (lowest Δdynamism at t) improved rate: {alignment['q1_improved_rate']:.1%}")
    print(f"  Q4 (highest Δdynamism at t) improved rate: {alignment['q4_improved_rate']:.1%}")
    if alignment["direction"] == "aligned":
        print(
            "  Result: Q4 improved rate EXCEEDS Q1 — rising amenity at t associates with "
            "subsequent social upgrading at t+k (H3a direction; exploratory only)."
        )
    else:
        print("  Result: Q4 improved rate does NOT exceed Q1 — no H3a signal in this window.")
    print(
        "  Caveat: delta_dynamism_t is NULL for first edition (no prior); "
        "only 2 lag pairs for lor_2021 vintage; H3a was rejected in the 2018 thesis; "
        "treat as exploratory, not a hypothesis test."
    )

    # --- Save summary CSV -----------------------------------------------
    summary = build_summary_csv(top10, bottom10, per_year, stage_dist)
    out_path = OUT_DIR / "e3_summary.csv"
    summary.to_csv(out_path, index=False)
    print(f"\nSummary CSV saved to: {out_path}")

    print("\n" + "=" * 70)
    print("E3 narratives complete.")
    con.close()


if __name__ == "__main__":
    main()
