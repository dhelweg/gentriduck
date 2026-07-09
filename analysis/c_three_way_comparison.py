"""
analysis/c_three_way_comparison.py
===================================
OA-C.1 (#174): three-way comparison — faithful (Run 1) vs improved (Run 2) vs the
2018 golden anchor, kept strictly separated per ADR-0017 D3 (never blended into one
score) and the Epic B directional-revival framing (CLAUDE.md — divergences are
documented, not forced into exact reproduction).

**Structural scope limitation (must be read before the results below):** the two
workstreams are NOT evaluated against the same outcome anchor, and this is a
deliberate, disclosed methodological choice, not an oversight:

  * Run 1 (faithful) — `oa_mean` (the unweighted mean of the 4 upscaling-relevant
    domain OAs, ALL POI types, no curation; `int_poi_offering_advantage`,
    `methodology_variant='faithful'`, `weight_variant='standard'`, snapshot_year=2018,
    `area_vintage='lor_pre2021'` — mirrors `analysis/e1_regressions.py`
    `load_oa_category_panel`/`test_h1`) vs the **2018 thesis golden**
    `status_index` (`stg_thesis_2018_result_plr`). Anchor: 2018, `lor_pre2021`,
    436 PLRs.
  * Run 2 (improved) — `status_score_improved` (the causality-tier-weighted amenity
    composite; `gentrification_index`, `variant='improved'`) vs the **current live
    MSS outcome** `status_index` (`gentrification_index`, `variant='live_data'`,
    the D1 MSS social-status ordinal). Anchor: 2021-2025, `lor_2021`.

  The improved predictor (OA-B.1..B.3, #170-#172) is wired **Berlin lor_2021-only**
  (2021-2025) by explicit, scoped decision (`docs/epic-c/B3-oa-weighted-index-geo-
  signoff.md` §2.2) — it was never computed for the 2018/lor_pre2021 vintage, and
  re-deriving the causal-tier seed for the thesis-era taxonomy/period would be its
  own methodology-bearing exercise (out of scope here; tracked as a Run-1/Run-2
  reconciliation follow-up, not silently approximated). So a literal same-anchor,
  same-period ablation ("does curation improve prediction of the SAME 2018 outcome")
  is not computable from the current pipeline. Rather than force a misleading
  same-anchor comparison (e.g. approximating one side), this script reports each
  workstream's own best-available predictor-vs-outcome correlation, on its own
  contemporaneous outcome, and compares them **structurally** (do both show the
  literature-expected direction? how does correlation strength compare?) while
  explicitly flagging that the two rho values are NOT a like-for-like ablation of a
  single fixed outcome — this is itself a substantive finding about the boundary of
  the current revival, reported per the Epic B framing rather than suppressed.

Polarity (both anchors): `status_index` is INVERSE-numeric in both the 2018 golden
and the live MSS D1 ordinal (higher = worse social status; index-definition.md §5;
`gentrification_index.sql` D1 comment). H1's prior (thesis p.55) expects MORE
offering/amenity OA -> BETTER status -> LOWER status_index, i.e. a NEGATIVE
correlation in both workstreams.

Output: docs/epic-e/C1-three-way-comparison-findings.md
DB path: $GENTRIDUCK_DB env var or data/gentriduck.duckdb (default).
Dependencies: duckdb, scipy, numpy (all already in pyproject.toml).

Usage:
  uv run python analysis/c_three_way_comparison.py
"""

from __future__ import annotations

import os
import sys
from datetime import datetime, timezone
from pathlib import Path

try:
    import duckdb
except ImportError:
    print("ERROR: duckdb not installed. Run: uv sync")
    sys.exit(1)

try:
    from scipy import stats
except ImportError:
    print("ERROR: scipy not installed. Run: uv sync")
    sys.exit(1)

# Reuse the already-reviewed, already-published Run 1 (faithful) H1 (OA) computation
# verbatim from analysis/e1_regressions.py (OA-A.4 #168, R-C1 dual-signed-off) rather
# than re-deriving a second, independently-computed number for the same statistic in
# this comparison ticket. While drafting this script an area_code padding bug was
# found in e1_regressions.load_h1_h2_data's merge against the OA panel (raw,
# mixed-length `t.raum_id` vs the 8-char-padded OA table key silently dropped ~79%
# of PLRs from the OA merge, n=436->92) -- filed and fixed as #200
# (analysis/e1_regressions.py's load_h1_h2_data now pads area_code, restoring the
# full n=435 sample). This script automatically picks up the corrected figure by
# reusing e1_regressions.py's function verbatim, with no change needed here.
sys.path.insert(0, str(Path(__file__).parent))
import e1_regressions as _e1  # noqa: E402

_env_db = os.environ.get("GENTRIDUCK_DB")
DUCKDB_PATH = (
    Path(_env_db) if _env_db else Path(__file__).parent.parent / "data" / "gentriduck.duckdb"
)
OUTPUT_MD = Path(__file__).parent.parent / "docs" / "epic-e" / "C1-three-way-comparison-findings.md"

ALPHA = 0.05
MIN_N = 10


def _table_exists(con: duckdb.DuckDBPyConnection, name: str) -> bool:
    rows = con.execute(
        "SELECT table_name FROM information_schema.tables WHERE table_schema='main'"
    ).fetchall()
    return name in {r[0] for r in rows}


def _spearman(x, y, label: str) -> dict:
    n = len(x)
    if n < MIN_N:
        return {"label": label, "n": n, "rho": None, "p": None, "sig": None}
    rho, p = stats.spearmanr(x, y)
    return {"label": label, "n": n, "rho": rho, "p": p, "sig": p < ALPHA}


def _dir(rho) -> str:
    if rho is None:
        return "n/a"
    return "negative" if rho < 0 else ("positive" if rho > 0 else "zero")


def run_faithful(con: duckdb.DuckDBPyConnection) -> dict | None:
    """Run 1: reuse e1_regressions.py's own H1 (OA) computation (oa_mean, faithful,
    all types, vs the 2018 golden status_index) verbatim -- see module docstring for
    why this is reused rather than independently re-derived."""
    if not (
        _table_exists(con, "int_poi_offering_advantage")
        and _table_exists(con, "stg_thesis_2018_result_plr")
    ):
        return None
    df = _e1.load_h1_h2_data(con)
    if df.empty or "oa_mean" not in df.columns:
        return None
    x = df["oa_mean"].values.astype(float)
    y = df["status_index"].values.astype(float)
    r = _e1.run_spearman(x, y, "Spearman(oa_mean, 2018 golden status_index)")
    if r.get("rho") is None:
        return None
    r["anchor"] = "2018 golden (stg_thesis_2018_result_plr)"
    r["vintage"] = "lor_pre2021, snapshot_year=2018"
    r["predictor"] = (
        "oa_mean (faithful, all types, methodology_variant='faithful') -- reused from e1_regressions.py H1 (OA) test verbatim"
    )
    return r


def run_improved(con: duckdb.DuckDBPyConnection) -> dict | None:
    """Run 2: status_score_improved vs current live MSS status_index (same area/period)."""
    if not _table_exists(con, "gentrification_index"):
        return None
    df = con.execute("""
        SELECT
            imp.area_code,
            imp.period_yyyymm,
            imp.status_index AS status_score_improved,
            live.status_index AS live_status_index
        FROM main.gentrification_index imp
        JOIN main.gentrification_index live
            ON imp.area_code = live.area_code
            AND imp.period_yyyymm = live.period_yyyymm
            AND imp.area_level = live.area_level
        WHERE imp.variant = 'improved'
          AND live.variant = 'live_data'
          AND imp.status_index IS NOT NULL
          AND live.status_index IS NOT NULL
    """).df()
    if df.empty:
        return None
    r = _spearman(
        df["status_score_improved"].values.astype(float),
        df["live_status_index"].values.astype(float),
        "Spearman(status_score_improved, live MSS status_index)",
    )
    r["anchor"] = "current live MSS (gentrification_index, variant='live_data')"
    r["vintage"] = f"lor_2021, period {df['period_yyyymm'].min()}-{df['period_yyyymm'].max()}"
    r["predictor"] = "status_score_improved (improved, causality-tier-weighted amenity composite)"
    return r


def render_report(faithful: dict | None, improved: dict | None) -> str:
    ts = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    lines = []
    lines.append("# OA-C.1 Three-Way Comparison (#174): Faithful vs Improved vs 2018 Golden\n")
    lines.append(
        f"Generated {ts} by `analysis/c_three_way_comparison.py`. Anchor rule: ADR-0017 D3 "
        "(faithful/improved never blended into one score); Epic B directional framing "
        "(CLAUDE.md — document divergences, not forced exact reproduction).\n"
    )
    lines.append("## Structural scope limitation (read first)\n")
    lines.append(
        "The improved-variant predictor (`status_score_improved`, OA-B.1–B.3 #170–#172) is wired "
        "**Berlin `lor_2021`-only (2021-2025)** by an explicit, scoped B.3 decision "
        "(`docs/epic-c/B3-oa-weighted-index-geo-signoff.md` §2.2) — it was never computed for the "
        "2018/`lor_pre2021` vintage the thesis golden anchors to. Re-deriving the causal-tier seed "
        "for the thesis-era taxonomy/period would itself be a new methodology-bearing exercise, "
        "not a mechanical extension, and is out of scope for this ticket (tracked as a Run-1/Run-2 "
        "reconciliation follow-up). **A literal same-anchor, same-period ablation is therefore not "
        "computable from the current pipeline.** This report instead evaluates each workstream's "
        "predictor against its own best-available contemporaneous outcome and compares them "
        "*structurally* (expected-direction agreement, relative strength) — this boundary is itself "
        "reported as a substantive finding, per Epic B framing, rather than papered over.\n"
    )
    lines.append("## Run 1 — Faithful (all types, uncurated OA) vs 2018 golden\n")
    if faithful is None or faithful["rho"] is None:
        lines.append(
            "- Insufficient data to compute (n < %d or required tables missing).\n" % MIN_N
        )
    else:
        lines.append(f"- Predictor: {faithful['predictor']}")
        lines.append(f"- Outcome anchor: {faithful['anchor']} ({faithful['vintage']})")
        lines.append(
            f"- {faithful['label']}: rho={faithful['rho']:.3f}, p={faithful['p']:.4f}, n={faithful['n']}"
        )
        lines.append(
            f"- Direction: {_dir(faithful['rho'])} "
            f"({'matches' if faithful['rho'] < 0 else 'DOES NOT match'} the H1 prior — "
            "more offering -> better status -> lower status_index -> expected negative)"
        )
        lines.append(f"- Significant at alpha={ALPHA}: {faithful['sig']}\n")
    lines.append("## Run 2 — Improved (causality-tier-weighted OA) vs current live MSS\n")
    if improved is None or improved["rho"] is None:
        lines.append(
            "- Insufficient data to compute (n < %d or required tables missing).\n" % MIN_N
        )
    else:
        lines.append(f"- Predictor: {improved['predictor']}")
        lines.append(f"- Outcome anchor: {improved['anchor']} ({improved['vintage']})")
        lines.append(
            f"- {improved['label']}: rho={improved['rho']:.3f}, p={improved['p']:.4f}, n={improved['n']}"
        )
        lines.append(
            f"- Direction: {_dir(improved['rho'])} "
            f"({'matches' if improved['rho'] < 0 else 'DOES NOT match'} the H1 prior — expected negative)"
        )
        lines.append(f"- Significant at alpha={ALPHA}: {improved['sig']}\n")
    lines.append("## Run 3 — Comparison (structural, NOT a same-outcome ablation)\n")
    if (
        faithful
        and improved
        and faithful.get("rho") is not None
        and improved.get("rho") is not None
    ):
        f_matches = faithful["rho"] < 0
        i_matches = improved["rho"] < 0
        both_match = f_matches and i_matches
        neither_match = (not f_matches) and (not i_matches)
        neither_significant = not faithful["sig"] and not improved["sig"]
        lines.append(
            f"- Direction vs the H1 prior (expected negative): Run 1 = **{_dir(faithful['rho'])}** "
            f"({'matches' if f_matches else 'does not match'}); Run 2 = **{_dir(improved['rho'])}** "
            f"({'matches' if i_matches else 'does not match'})."
        )
        if both_match:
            headline = (
                "**Both** workstreams independently reproduce the H1-expected (negative) direction."
            )
        elif neither_match:
            headline = (
                "**Neither** workstream shows the H1-expected (negative) direction on its own "
                "available outcome this pass."
            )
        else:
            headline = (
                "The two workstreams **disagree** on direction against their respective outcomes."
            )
        lines.append(f"- {headline}")
        lines.append(
            f"- Statistical significance (alpha={ALPHA}): Run 1 {'significant' if faithful['sig'] else 'NOT significant'} "
            f"(p={faithful['p']:.4f}); Run 2 {'significant' if improved['sig'] else 'NOT significant'} "
            f"(p={improved['p']:.4f})."
            + (
                " **Neither correlation is statistically significant this pass** — read both as "
                "inconclusive on their own outcome, not as confirmed findings in either direction."
                if neither_significant
                else ""
            )
        )
        lines.append(
            f"- Relative strength (NOT a controlled ablation — different outcome, period, vintage, "
            f"taxonomy curation, AND sample size all differ simultaneously): "
            f"|rho| faithful={abs(faithful['rho']):.3f} (n={faithful['n']}) vs "
            f"|rho| improved={abs(improved['rho']):.3f} (n={improved['n']})."
        )
        if faithful["sig"] and f_matches:
            aggregate_summary = (
                "Run 1's aggregate basket shows a significant, H1-expected relationship this pass"
            )
        elif faithful["sig"] and not f_matches:
            aggregate_summary = (
                "Run 1's aggregate basket is statistically significant but in the OPPOSITE direction "
                "from the H1 prior this pass (a significant, wrong-signed result, not a null result)"
            )
        else:
            aggregate_summary = (
                "Run 1's aggregate basket is not statistically significant this pass"
            )
        if improved["sig"] and i_matches:
            improved_summary = (
                "Run 2's aggregate basket shows a significant, H1-expected relationship this pass"
            )
        elif improved["sig"] and not i_matches:
            improved_summary = (
                "Run 2's aggregate basket is statistically significant but in the OPPOSITE direction "
                "from the H1 prior this pass"
            )
        else:
            improved_summary = "Run 2's aggregate basket is not statistically significant this pass"
        lines.append(
            "- **This is not evidence that curation 'improves' or 'worsens' prediction** — the two "
            "rho values are computed against different outcomes over different periods and cannot be "
            'differenced into a predictive-performance delta without confounding "the world/outcome '
            'changed" with "the metric changed" (exactly the confound ADR-0017 D3 exists to prevent). '
            "The comparable, apples-to-apples ablation this ticket's acceptance criterion asks for "
            "requires the Run-1/Run-2 reconciliation follow-up (a lor_pre2021-era improved-variant "
            f"re-tiering) noted above. **As reported this pass: {aggregate_summary}; {improved_summary}.** "
            "Neither result should be read as confirming the H1 prior for the aggregate basket; this "
            "is itself the substantive finding, and is consistent with the already-published, "
            "separately-signed-off caveat that this specific H1 (OA) aggregate test was FAIL in "
            "`docs/epic-e/E1-regression-findings.md` (Run 1) even before this comparison — a "
            "significant-but-wrong-signed result is still a FAIL against the H1 prior, not a "
            "confirmation. Domain-level and category-level OA tests elsewhere in that same findings "
            "doc (H1b, H2, H3a/H3b) DO show significant, expected-direction results — the weak/"
            "wrong-signed aggregate `oa_mean`/`status_score_improved` basket used here is a coarser "
            "summary than those finer-grained tests, not evidence against OA as a construct."
        )
    else:
        lines.append("- Cannot compare: one or both runs returned insufficient data.\n")
    lines.append("\n## Follow-ups\n")
    lines.append(
        "- A true same-anchor ablation needs the improved-variant causal-tier seed and pipeline "
        "extended to `lor_pre2021`/2018 (new methodology-bearing ticket, not mechanical) — tracked, "
        "not scheduled by this ticket.\n"
        "- The bandwidth-fragility publish gate (ADR-0017 C-4) and minimum-POI-base flag (D-3) remain "
        "open obligations on any future public display of either correlation.\n"
    )
    return "\n".join(lines) + "\n"


def main() -> int:
    if not DUCKDB_PATH.exists():
        print(f"WARN: {DUCKDB_PATH} does not exist. Skipping (data-presence guard).")
        return 0
    con = duckdb.connect(str(DUCKDB_PATH), read_only=True)
    try:
        faithful = run_faithful(con)
        improved = run_improved(con)
    finally:
        con.close()

    if faithful is None and improved is None:
        print("WARN: no data available for either run. Skipping report generation.")
        return 0

    report = render_report(faithful, improved)
    OUTPUT_MD.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_MD.write_text(report, encoding="utf-8")
    print(f"Wrote {OUTPUT_MD}")
    if faithful:
        print(f"Run 1 (faithful): rho={faithful['rho']}, p={faithful['p']}, n={faithful['n']}")
    if improved:
        print(f"Run 2 (improved): rho={improved['rho']}, p={improved['p']}, n={improved['n']}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
