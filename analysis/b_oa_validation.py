"""
analysis/b_oa_validation.py
============================
OA-A.3 (#167): direct OA validation — recomputed Offering Advantage (OA-A.2,
int_poi_offering_advantage, methodology_variant='faithful') vs the 2018 thesis's
own OA (reference/goldens/20180909_result_full_plr.csv, staged long-format by
stg_thesis_2018_result_plr_oa.sql).

This is the sharper check the OA revival was built for (docs/planning/
oa-revival-and-methodology-improvement.md): instead of comparing only the final
gentrification index, compare the intermediate OA construct itself, per PLR,
per taxonomy leaf, against the thesis's own 170 oa_*/prev_oa_* columns.

Epic B framing (CLAUDE.md): this is a DIRECTIONAL revival, not exact
reproduction — the primary criterion is rank/sign agreement (Spearman rho),
not point-estimate equality. Divergences are documented, not treated as
failures per se.

Scope decision for this ticket (R-C1 grounding, see docs/epic-b/A3-*-signoff.md):
  - DOMAIN level (13 leaves, thesis columns oa_total_d_*): full validation,
    high confidence in the crosswalk (seed_poi_thesis_taxonomy_crosswalk),
    reported as the headline result.
  - CATEGORY level (27 leaves) and TYPE level (45 leaves): validated wherever
    the thesis golden actually carries that column (only 5 of 13 domains have
    category/type breakdowns in the golden -- gastro, sport, vergnuegung,
    pubserv, waren/dienstleistung categories -- see stg_thesis_2018_result_plr_oa
    header), reported separately, NOT blended into the domain-level headline
    (mirrors the never-blend discipline already used for methodology_variant).
  - One documented crosswalk divergence (KNOWN, not a bug): thesis groups
    "Biergarten" under vergnuegung/Entertainment; current OSM taxonomy
    (seed_poi_mapping.csv) classifies "Beer Garden" under Gastronomy.  The
    crosswalk seed maps this leaf to where OA-A.2 actually computes it
    (Gastronomy) so the join finds real data; flagged for geo-DS/domain review.

Comparison years: golden zeit=201612 (current OA, snapshot_year=2016),
prev_zeit=201412 (lagged OA, snapshot_year=2014) -- both years already
ingested in fct_poi_development / int_osm_poi_plr_weighted (2008-2026).
area_vintage='lor_pre2021' matches the golden's pre-2021 PLR boundaries
(int_thesis_2018_area_index.sql precedent: LPAD(raum_id, 8, '0') = area_code).

Both weight_variant='standard' (hard point-in-polygon) and 'gaussian_500m'
(current default kernel build; the 1000 m headline bandwidth per ADR-0017
D2.3 is a separate rebuild, out of scope for this validation pass -- flagged
as follow-up) are compared independently, never pooled.

Sparse-vs-dense reconciliation (documented in int_poi_offering_advantage.sql
"Sparse representation" note): a taxonomy leaf absent from a PLR in the
recomputed OA (zero POIs of that type) produces no row there, while the
golden's wide pivot zero-fills every column. This script LEFT JOINs the golden
(dense) to the recomputed (sparse) and treats a missing recomputed match as
oa_recomputed = 0 (matching the golden's own zero-fill convention) -- this
reconciliation choice is itself part of the R-C1 review for this ticket.

Output: docs/epic-b/A3-oa-validation-findings.md

Dependencies: duckdb, scipy, numpy (already in pyproject.toml).
DB path: $GENTRIDUCK_DB env var or data/gentriduck.duckdb (default).

Usage:
  uv run python analysis/b_oa_validation.py
"""

from __future__ import annotations

import os
import sys
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

_env_db = os.environ.get("GENTRIDUCK_DB")
DUCKDB_PATH = (
    Path(_env_db) if _env_db else Path(__file__).parent.parent / "data" / "gentriduck.duckdb"
)
OUTPUT_MD = Path(__file__).parent.parent / "docs" / "epic-b" / "A3-oa-validation-findings.md"

WEIGHT_VARIANTS = ["standard", "gaussian_500m"]
# (thesis_zeit_snapshot_year, our_snapshot_year, label)
COMPARISON_PERIODS = [
    ("oa_value", 2016, "current (zeit=201612)"),
    ("prev_oa_value", 2014, "lagged (prev_zeit=201412)"),
]


# ---------------------------------------------------------------------------
# Data loading
# ---------------------------------------------------------------------------


def load_comparison(
    con: duckdb.DuckDBPyConnection, weight_variant: str, golden_col: str, snapshot_year: int
):
    """One row per (level, area_code, thesis_oa_suffix): golden OA vs recomputed OA.

    LEFT JOIN golden (dense, 436 PLR x 85 suffix) -> crosswalk -> recomputed
    (sparse leaf rows). Missing recomputed match = 0 (see module docstring
    "Sparse-vs-dense reconciliation").

    Fan-out guard: for level='domain'/'category', the crosswalk under-constrains
    the join on purpose (a domain has many category/type leaves; a category has
    many type leaves), but oa_domain/oa_category is IDENTICAL across every
    sibling leaf row of int_poi_offering_advantage (same window-function
    partition, ADR-0017 D1) -- so this must GROUP BY + MAX(), not raw-join, or
    n silently balloons past 436 PLRs per suffix (a real bug caught during this
    ticket's implementation: total_d_waren_stock joined to 3670 rows instead of
    436 before this fix).
    """
    query = f"""
        WITH joined AS (
            SELECT
                xw.level,
                xw.thesis_oa_suffix,
                g.area_code,
                g.{golden_col} AS oa_golden,
                CASE xw.level
                    WHEN 'domain' THEN r.oa_domain
                    WHEN 'category' THEN r.oa_category
                    WHEN 'type' THEN r.oa_type
                END AS oa_recomputed_raw
            FROM main.stg_thesis_2018_result_plr_oa g
            JOIN main_seeds.seed_poi_thesis_taxonomy_crosswalk xw
                ON g.thesis_oa_suffix = xw.thesis_oa_suffix
            LEFT JOIN main.int_poi_offering_advantage r
                ON g.area_code = r.area_code
                AND r.area_vintage = 'lor_pre2021'
                AND r.snapshot_year = {snapshot_year}
                AND r.weight_variant = '{weight_variant}'
                AND r.methodology_variant = 'faithful'
                AND r.poi_domain_h = xw.domain_h
                AND (xw.category_h IS NULL OR r.poi_category_h = xw.category_h)
                AND (xw.type_h IS NULL OR r.poi_type_h = xw.type_h)
            WHERE g.oa_value IS NOT NULL
        )
        SELECT
            level,
            thesis_oa_suffix,
            area_code,
            oa_golden,
            COALESCE(MAX(oa_recomputed_raw), 0) AS oa_recomputed
        FROM joined
        GROUP BY level, thesis_oa_suffix, area_code, oa_golden
    """
    return con.execute(query).df()


# ---------------------------------------------------------------------------
# Statistics
# ---------------------------------------------------------------------------


def spearman_by_level(df, level: str) -> dict:
    sub = df[df["level"] == level]
    if len(sub) < 3:
        return {"n": len(sub), "rho": float("nan"), "p": float("nan")}
    rho, p = stats.spearmanr(sub["oa_golden"], sub["oa_recomputed"])
    return {"n": len(sub), "rho": rho, "p": p}


def per_suffix_spearman(df, level: str) -> list[dict]:
    """Per-suffix (across all 436 PLRs) Spearman -- finer-grained than the pooled
    per-level figure, surfaces individual leaves that diverge even if the pooled
    correlation looks fine."""
    out = []
    sub = df[df["level"] == level]
    for suffix, g in sub.groupby("thesis_oa_suffix"):
        if len(g) < 3 or g["oa_golden"].nunique() < 2 or g["oa_recomputed"].nunique() < 2:
            out.append({"suffix": suffix, "n": len(g), "rho": float("nan"), "p": float("nan")})
            continue
        rho, p = stats.spearmanr(g["oa_golden"], g["oa_recomputed"])
        out.append({"suffix": suffix, "n": len(g), "rho": rho, "p": p})
    return sorted(
        out, key=lambda r: (np.isnan(r["rho"]), r["rho"] if not np.isnan(r["rho"]) else 0)
    )


# ---------------------------------------------------------------------------
# Report
# ---------------------------------------------------------------------------


def build_report(con: duckdb.DuckDBPyConnection) -> str:
    lines = [
        "# A3 — OA Direct Validation Findings (#167, OA-A.3)",
        "",
        "Recomputed Offering Advantage (OA-A.2, `int_poi_offering_advantage`, "
        "`methodology_variant='faithful'`) vs the 2018 thesis's own OA "
        "(`reference/goldens/20180909_result_full_plr.csv`, staged by "
        "`stg_thesis_2018_result_plr_oa.sql`). Epic B framing: directional "
        "revival — Spearman rank agreement is the primary criterion, not "
        "point-estimate equality.",
        "",
        "Generated by `analysis/b_oa_validation.py`.",
        "",
    ]

    for weight_variant in WEIGHT_VARIANTS:
        lines.append(f"## Weight variant: `{weight_variant}`")
        lines.append("")
        for golden_col, snapshot_year, label in COMPARISON_PERIODS:
            lines.append(f"### {label} — snapshot_year={snapshot_year}")
            lines.append("")
            df = load_comparison(con, weight_variant, golden_col, snapshot_year)
            if df.empty:
                lines.append(
                    "_No rows — OSM ingestion for this snapshot_year/weight_variant "
                    "not yet built. Rerun after `uv run poe build`._"
                )
                lines.append("")
                continue

            lines.append("| Level | n (PLR x leaf) | Spearman rho | p-value |")
            lines.append("|---|---|---|---|")
            for level in ("domain", "category", "type"):
                r = spearman_by_level(df, level)
                rho_str = f"{r['rho']:.3f}" if not np.isnan(r["rho"]) else "n/a"
                p_str = f"{r['p']:.4f}" if not np.isnan(r["p"]) else "n/a"
                lines.append(f"| {level} | {r['n']} | {rho_str} | {p_str} |")
            lines.append("")

            lines.append("**Domain-level headline** (13 leaves; highest-confidence crosswalk):")
            lines.append("")
            dom_suffix_rhos = per_suffix_spearman(df, "domain")
            lines.append("| thesis domain suffix | n (PLRs) | Spearman rho | p-value |")
            lines.append("|---|---|---|---|")
            for r in dom_suffix_rhos:
                rho_str = f"{r['rho']:.3f}" if not np.isnan(r["rho"]) else "n/a"
                p_str = f"{r['p']:.4f}" if not np.isnan(r["p"]) else "n/a"
                lines.append(f"| {r['suffix']} | {r['n']} | {rho_str} | {p_str} |")
            lines.append("")

            lines.append(
                "**Category/type-level** (finer leaves; lower confidence, secondary "
                "read per this ticket's scope decision — worst/best 5 by rho shown):"
            )
            lines.append("")
            for level in ("category", "type"):
                suf_rhos = per_suffix_spearman(df, level)
                if not suf_rhos:
                    continue
                lines.append(f"_{level}_ — worst 5:")
                for r in suf_rhos[:5]:
                    rho_str = f"{r['rho']:.3f}" if not np.isnan(r["rho"]) else "n/a"
                    lines.append(f"  - `{r['suffix']}`: n={r['n']}, rho={rho_str}")
                lines.append(f"_{level}_ — best 5:")
                for r in suf_rhos[-5:]:
                    rho_str = f"{r['rho']:.3f}" if not np.isnan(r["rho"]) else "n/a"
                    lines.append(f"  - `{r['suffix']}`: n={r['n']}, rho={rho_str}")
                lines.append("")

    lines.append("## Known crosswalk divergences (documented, not defects)")
    lines.append("")
    lines.append(
        "- **Biergarten domain mismatch**: thesis groups `Biergarten` under "
        "`vergnuegung` (Entertainment); current OSM taxonomy classifies "
        "`Beer Garden` under `Gastronomy`. The crosswalk maps to Gastronomy "
        "(where OA-A.2 actually computes it) so the join is non-empty; the "
        "`vergnuegung_t_biergarten_stock` row above is validating a "
        "cross-domain comparison, not a like-for-like leaf. See "
        "`seed_poi_thesis_taxonomy_crosswalk.csv` note column."
    )
    lines.append(
        "- **Sparse (recomputed) vs dense (golden) zero-fill**: a leaf with no "
        "POIs in a PLR is an absent row in `int_poi_offering_advantage` but a "
        "zero-filled column in the golden. This script treats a missing "
        "recomputed match as 0, matching the golden convention — flagged for "
        "R-C1 review as the reconciliation choice for this ticket."
    )
    lines.append(
        "- **Bandwidth**: `gaussian_500m` is the default weighted build in this "
        "warehouse; the OA headline recommendation (ADR-0017 D2.3) is 1000 m — "
        "rebuilding `int_osm_poi_plr_weighted` at 1000 m and rerunning this "
        "validation is a follow-up (not blocking this ticket's domain-level "
        "headline finding)."
    )
    lines.append("")

    return "\n".join(lines)


def main() -> int:
    if not DUCKDB_PATH.exists():
        print(f"ERROR: DuckDB file not found at {DUCKDB_PATH}. Run `uv run poe build` first.")
        return 1

    con = duckdb.connect(str(DUCKDB_PATH), read_only=True)
    report = build_report(con)
    con.close()

    OUTPUT_MD.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_MD.write_text(report)
    print(f"Wrote {OUTPUT_MD}")
    print()
    print(report)
    return 0


if __name__ == "__main__":
    sys.exit(main())
