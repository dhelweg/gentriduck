"""
analysis/c_offering_relevance_validation.py
============================================
OA-B.2 (#171): data-driven confirmation pass over `seed_poi_offering_relevance.csv`
(OA-B.1 #170) -- the causality-first-with-data-confirmation 2x2 (ADR-0017 D3):

    causally plausible | causally implausible
    --------------------+-----------------------
correlated   | keep (confirmed)   | DROP (spurious)
not correlated | keep (theory-only)| drop (as expected)

**Non-circularity rule (binding, ADR-0017 D3 / B1 domain sign-off):** every seed row's
`offering_tier` was set from theory ALONE, before this pass ran. Data here can only
CONFIRM or CALIBRATE *within* a tier -- it can never PROMOTE a tier-0 ("drop") node,
and per the domain sign-off (`docs/epic-b/B1-oa-relevance-seed-domain-signoff.md` §2)
it also never DEMOTES a causally-plausible (tier >= 1) node purely for lacking
significant correlation -- theoretical ambiguity (tier 1) is a legitimate, permanent
home for nodes data cannot decide. This script's role is strictly diagnostic /
confirmatory: it fills `data_corr`, and documents the diagnostic 2x2 crosstab in the
findings report, but does NOT rewrite `offering_tier` or `offering_weight`.

Correlation construct
----------------------
For each seed row (level, poi_domain_h, poi_category_h, poi_type_h), pull the matching
node-level Offering Advantage (`int_poi_offering_advantage`, OA-A.2 #166,
methodology_variant='faithful', weight_variant='standard' -- the bandwidth-free hard
floor per ADR-0017 D2.3, avoiding a kernel-bandwidth confound in this confirmation
pass) at snapshot_year=2016 / area_vintage='lor_pre2021' (matches the golden's own
zeit=201612, OA-A.3 #167 precedent), and Spearman-correlate it, per PLR, against the
thesis's own outcome: `status_index` (`int_thesis_2018_area_index`, variant='standard',
area_level='plr', period_yyyymm=201612) -- the thesis's cross-sectional MSS social-
status index (thesis pp. 55-56; H1 in `analysis/e1_regressions.py`).

Polarity note (index-definition.md §5 / e1_regressions.py D1 POLARITY comment):
`status_index` is INVERSE-numeric -- higher = WORSE (lower) social status. For a
theory-tiered amenity node (tier >= 1, "keep"), the causality-first prior (H1, thesis
p.55) expects OA to correlate NEGATIVELY with status_index (more of this offering ->
better status -> lower status_index). Vacancy is the ONE deliberate opposite-pole
exception (Smith 1979 rent-gap/disinvestment marker, ADR-0017 D-2): its prior is a
POSITIVE correlation with status_index (more vacancy -> worse status). This script
reports raw rho (no sign-flipping) plus a `direction_match` flag against each node's
literature-implied prior sign, so a reader is never left to eyeball inverse polarity.

Fan-out guard (b_oa_validation.py precedent): oa_domain/oa_category are identical
across every sibling leaf row of int_poi_offering_advantage within a PLR (same window-
function partition), so the per-PLR OA pull GROUPs BY + MAX()s rather than raw-joining
-- otherwise n balloons past 436 PLRs for domain/category-level nodes.

Epic B framing (CLAUDE.md): directional, not exact-reproduction -- Spearman rank
agreement (rho, p) is the criterion, and "confirmed" means p < ALPHA in this pass, not
a claim of causal inference (#80 [A10], deferred; see ADR-0017 D3 "causal" = selection
filter, not causal inference).

Output: docs/epic-c/B2-offering-relevance-validation-findings.md
Side effect: transform/seeds/seed_poi_offering_relevance.csv -- `data_corr` column
filled (rho rounded to 3dp; blank "n/a" where n < MIN_N or the OA/outcome pull is
degenerate). No other column is modified.

Dependencies: duckdb, scipy, numpy, pandas (all already in pyproject.toml).
DB path: $GENTRIDUCK_DB env var or data/gentriduck.duckdb (default).

Usage:
  uv run python analysis/c_offering_relevance_validation.py
"""

from __future__ import annotations

import csv
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
SEED_CSV = Path(__file__).parent.parent / "transform" / "seeds" / "seed_poi_offering_relevance.csv"
OUTPUT_MD = (
    Path(__file__).parent.parent
    / "docs"
    / "epic-c"
    / "B2-offering-relevance-validation-findings.md"
)

SNAPSHOT_YEAR = 2016  # matches golden zeit=201612 (OA-A.3 #167 precedent)
AREA_VINTAGE = "lor_pre2021"
WEIGHT_VARIANT = "standard"  # bandwidth-free hard floor -- avoids kernel-bandwidth confound
ALPHA = 0.05
MIN_N = 10  # minimum PLR pairs for a non-degenerate Spearman read

# Vacancy is the ONE ADR-0017 D-2 opposite-pole exception (Smith 1979 rent-gap /
# disinvestment); every other domain follows the amenity-offering H1 prior.
OPPOSITE_POLE_DOMAINS = {"Vacancy"}


# ---------------------------------------------------------------------------
# Data loading
# ---------------------------------------------------------------------------


def load_seed_rows() -> list[dict]:
    with open(SEED_CSV, newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def load_outcome(con: duckdb.DuckDBPyConnection):
    """area_code -> status_index, one row per PLR (436 rows)."""
    return con.execute(
        """
        select area_code, status_index
        from main.int_thesis_2018_area_index
        where area_level = 'plr' and variant = 'standard' and period_yyyymm = 201612
        """
    ).df()


def load_node_oa(con: duckdb.DuckDBPyConnection, row: dict):
    """Per-PLR OA for one seed node, GROUP BY + MAX() to collapse the sibling-leaf
    fan-out (b_oa_validation.py precedent -- oa_domain/oa_category is identical
    across every sibling leaf row sharing the same window-function partition)."""
    level = row["level"]
    oa_col = {"domain": "oa_domain", "category": "oa_category", "type": "oa_type"}[level]

    conds = ["poi_domain_h = ?"]
    params: list = [row["poi_domain_h"]]
    if level in ("category", "type"):
        conds.append("poi_category_h = ?")
        params.append(row["poi_category_h"])
    if level == "type":
        conds.append("poi_type_h = ?")
        params.append(row["poi_type_h"])

    query = f"""
        select area_code, max({oa_col}) as oa_value
        from main.int_poi_offering_advantage
        where methodology_variant = 'faithful'
          and weight_variant = ?
          and snapshot_year = ?
          and area_vintage = ?
          and {" and ".join(conds)}
        group by area_code
    """
    return con.execute(query, [WEIGHT_VARIANT, SNAPSHOT_YEAR, AREA_VINTAGE, *params]).df()


# ---------------------------------------------------------------------------
# Statistics / the 2x2
# ---------------------------------------------------------------------------


def spearman_vs_outcome(oa_df, outcome_df) -> dict:
    if oa_df.empty:
        return {"n": 0, "rho": float("nan"), "p": float("nan")}
    merged = oa_df.merge(outcome_df, on="area_code", how="inner")
    merged = merged.dropna(subset=["oa_value", "status_index"])
    if len(merged) < MIN_N or merged["oa_value"].nunique() < 2:
        return {"n": len(merged), "rho": float("nan"), "p": float("nan")}
    rho, p = stats.spearmanr(merged["oa_value"], merged["status_index"])
    return {"n": len(merged), "rho": rho, "p": p}


def expected_sign(row: dict) -> int:
    """+1 = expect positive rho with status_index, -1 = expect negative.
    Vacancy is the sole opposite-pole domain (ADR-0017 D-2); everything else
    follows the H1 amenity-offering prior (more offering -> better status ->
    lower status_index -> negative rho)."""
    return 1 if row["poi_domain_h"] in OPPOSITE_POLE_DOMAINS else -1


def classify(row: dict, stat: dict) -> dict:
    tier = int(row["offering_tier"])
    rho, p, n = stat["rho"], stat["p"], stat["n"]
    if np.isnan(rho):
        cell = "n/a (insufficient data)"
        correlated = None
        direction_match = None
    else:
        correlated = bool(p < ALPHA)
        direction_match = bool(np.sign(rho) == expected_sign(row)) if correlated else None
        if tier == 0:
            cell = (
                "correlated-but-non-causal (spurious, correctly dropped)"
                if correlated
                else ("not correlated (consistent with drop)")
            )
        else:
            cell = (
                "confirmed (kept)"
                if correlated
                else "not confirmed (kept -- theory-only, non-circularity rule)"
            )
    return {
        "tier": tier,
        "n": n,
        "rho": rho,
        "p": p,
        "correlated": correlated,
        "direction_match": direction_match,
        "cell": cell,
    }


# ---------------------------------------------------------------------------
# Seed rewrite
# ---------------------------------------------------------------------------


def write_seed_with_data_corr(rows: list[dict], results: list[dict]) -> None:
    fieldnames = list(rows[0].keys())
    for row, res in zip(rows, results):
        row["data_corr"] = f"{res['rho']:.3f}" if not np.isnan(res["rho"]) else ""
    with open(SEED_CSV, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)


# ---------------------------------------------------------------------------
# Report
# ---------------------------------------------------------------------------


def node_label(row: dict) -> str:
    parts = [row["poi_domain_h"]]
    if row["poi_category_h"]:
        parts.append(row["poi_category_h"])
    if row["poi_type_h"]:
        parts.append(row["poi_type_h"])
    return " / ".join(parts)


def build_report(rows: list[dict], results: list[dict]) -> str:
    lines = [
        "# B2 — Offering-Relevance Data-Driven Validation Findings (#171, OA-B.2)",
        "",
        "Data-driven confirmation pass over `seed_poi_offering_relevance.csv` "
        "(OA-B.1 #170), applying the ADR-0017 D3 causality-first 2x2: keep "
        "causally-plausible-and-correlated types (confirmed); DROP "
        "correlated-but-not-causal types (spurious, already tier-0 by theory). "
        "**Non-circularity is preserved**: this pass fills `data_corr` and reports "
        "the diagnostic crosstab below; it does NOT rewrite any `offering_tier` or "
        "`offering_weight` value.",
        "",
        f"Construct: per-node Offering Advantage (`int_poi_offering_advantage`, "
        f"`methodology_variant='faithful'`, `weight_variant='{WEIGHT_VARIANT}'`, "
        f"`snapshot_year={SNAPSHOT_YEAR}`, `area_vintage='{AREA_VINTAGE}'`) vs the "
        "2018 thesis outcome `status_index` (`int_thesis_2018_area_index`, "
        "`variant='standard'`, `area_level='plr'`, `period_yyyymm=201612`), "
        f"Spearman rho, alpha={ALPHA}, min n={MIN_N}.",
        "",
        "**Polarity**: `status_index` is inverse-numeric (higher = worse status). "
        "Amenity-offering nodes (all domains except Vacancy) are expected to "
        "correlate NEGATIVELY with `status_index` per the thesis H1 prior "
        "(more offering -> better status -> lower status_index). Vacancy is the "
        "one deliberate opposite-pole exception (Smith 1979 rent-gap/disinvestment, "
        "ADR-0017 D-2): expected POSITIVE correlation.",
        "",
        "Generated by `analysis/c_offering_relevance_validation.py`.",
        "",
        "## Crosstab: theory tier x data confirmation",
        "",
    ]

    crosstab: dict[tuple, int] = {}
    for res in results:
        tier = res["tier"]
        bucket = (
            "n/a"
            if res["correlated"] is None
            else ("correlated" if res["correlated"] else "not correlated")
        )
        crosstab[(tier, bucket)] = crosstab.get((tier, bucket), 0) + 1

    lines.append(
        "| offering_tier | correlated (p<0.05) | not correlated | n/a (insufficient data) |"
    )
    lines.append("|---|---|---|---|")
    for tier in (0, 1, 2, 3):
        c = crosstab.get((tier, "correlated"), 0)
        nc = crosstab.get((tier, "not correlated"), 0)
        na = crosstab.get((tier, "n/a"), 0)
        lines.append(f"| {tier} | {c} | {nc} | {na} |")
    lines.append("")

    spurious = [
        (row, res) for row, res in zip(rows, results) if res["tier"] == 0 and res["correlated"]
    ]
    lines.append(
        f"**Tier-0 nodes correlated-but-non-causal (spurious, correctly dropped per "
        f"the 2x2): {len(spurious)}**"
    )
    lines.append("")
    if spurious:
        lines.append("| node | n | rho | p | direction matches prior? |")
        lines.append("|---|---|---|---|---|")
        for row, res in spurious:
            dm = "yes" if res["direction_match"] else "no"
            lines.append(
                f"| {node_label(row)} | {res['n']} | {res['rho']:.3f} | {res['p']:.4f} | {dm} |"
            )
        lines.append("")

    not_confirmed = [
        (row, res)
        for row, res in zip(rows, results)
        if res["tier"] >= 1 and res["correlated"] is False
    ]
    lines.append(
        f"**Causally-plausible (tier >= 1) nodes NOT empirically confirmed this pass "
        f"(kept per the non-circularity rule -- theory-only, not demoted): "
        f"{len(not_confirmed)}**"
    )
    lines.append("")

    confirmed = [
        (row, res) for row, res in zip(rows, results) if res["tier"] >= 1 and res["correlated"]
    ]
    lines.append(f"**Causally-plausible (tier >= 1) nodes confirmed by data: {len(confirmed)}**")
    lines.append("")
    if confirmed:
        wrong_dir = [(row, res) for row, res in confirmed if res["direction_match"] is False]
        lines.append(
            f"Of these, {len(wrong_dir)} correlate significantly in the OPPOSITE "
            "direction from the literature prior -- flagged for domain-expert review "
            "(does not change tier; a direction-mismatch on a theory-plausible node is "
            "a finding to document, not act on unilaterally):"
        )
        lines.append("")
        if wrong_dir:
            lines.append("| node | tier | n | rho | p |")
            lines.append("|---|---|---|---|---|")
            for row, res in wrong_dir:
                lines.append(
                    f"| {node_label(row)} | {res['tier']} | {res['n']} | {res['rho']:.3f} | {res['p']:.4f} |"
                )
            lines.append("")

    na_rows = [(row, res) for row, res in zip(rows, results) if res["correlated"] is None]
    lines.append(
        f"**n/a (insufficient PLR-level data for a non-degenerate read): {len(na_rows)}** "
        "-- typically leaf types with near-zero city-wide stock in this OSM snapshot; "
        "data_corr left blank, tier unaffected."
    )
    lines.append("")

    return "\n".join(lines)


def main() -> int:
    if not DUCKDB_PATH.exists():
        print(f"ERROR: DuckDB file not found at {DUCKDB_PATH}. Run `uv run poe build` first.")
        return 1

    rows = load_seed_rows()
    con = duckdb.connect(str(DUCKDB_PATH), read_only=True)
    outcome_df = load_outcome(con)

    results = []
    for row in rows:
        oa_df = load_node_oa(con, row)
        stat = spearman_vs_outcome(oa_df, outcome_df)
        results.append(classify(row, stat))
    con.close()

    write_seed_with_data_corr(rows, results)
    print(
        f"Updated {SEED_CSV} (data_corr filled for {sum(1 for r in results if not np.isnan(r['rho']))}/{len(rows)} rows)"
    )

    report = build_report(rows, results)
    OUTPUT_MD.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_MD.write_text(report)
    print(f"Wrote {OUTPUT_MD}")
    print()
    print(report)
    return 0


if __name__ == "__main__":
    sys.exit(main())
