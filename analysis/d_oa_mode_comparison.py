"""
analysis/d_oa_mode_comparison.py
=================================
OA-D5 (#240, ADR-0024): the mode-comparison study the D-spine's D2/D3/D3b/D4
tickets built the ingredients for -- "a characterised map of which mode
answers which question, how well, and where each breaks" (#240 issue body),
not "one better OA" (ADR-0017 D3 / never-blend).

Four deliverables, each a separate, clearly-labelled section of the findings
report (`docs/methodology/OA-D5-mode-comparison-findings.md`):

1. **Cross-mode Spearman correlation** -- pairwise rank correlation between
   the seven `int_poi_offering_advantage_methods` columns (nested_lq,
   global_lq, log_lq, share_diff, shrunk_lq, raw_share, zscore_slq), per
   taxonomy level (domain/category/type), Berlin, `weight_variant='standard'`,
   `methodology_variant='faithful'`, pooled across all years/areas. Answers
   "how differently do the seven modes actually rank the same areas".
2. **Per-mode MAUP (PLR-vs-BZR) rank-stability** -- reuses the ALREADY-BUILT
   `int_poi_offering_advantage_arealevel` (OA-D2, #240) roll-up, which only
   carries the nested-LQ (the sole method OA-D2 rolled up per its own
   documented scope -- see that model's header, "Deferred to later D-spine
   tickets... D3: calculation-method columns"). This section therefore
   checks nested_lq's OWN scale-sensitivity (spatial-methods.md §7, r>0.7
   gate, same threshold/method `analysis/a6_maup.py` already uses for
   dynamism_score) and explicitly documents that the other six methods'
   MAUP behaviour is NOT YET CHECKED (rolling them up through area_level is
   an OA-D2-extension follow-on this ticket does not build -- see "Scope
   boundaries honestly disclosed" in the findings doc).
3. **Bandwidth robustness** -- NOT re-run here. `analysis/oa_bandwidth_sweep.py`
   (#274) already produced the definitive {500,1000,1500}m sweep for the
   nested-LQ (the only method with a Gaussian-weighted variant actually
   built in the warehouse at any one time -- see that script's own "DESIGN
   NOTE" on why only one `gaussian_*` bandwidth physically exists per dbt
   build). Extending the sweep to the other six methods would require
   rebuilding `int_poi_offering_advantage_methods` three times per method
   (a `dbt run --vars` cost multiplied by 6), a mechanical but nontrivial
   follow-up explicitly OUT of this ticket's scope -- this script CITES
   `docs/epic-g/G2-oa-bandwidth-sweep-findings.md`'s result rather than
   duplicating or mocking a second computation.
4. **Completeness-contamination gate (OA-D0 geo sign-off Condition C3,
   the ONE gate this ticket must actually run)** -- per (taxonomy level,
   method), Spearman rho between each area's year-over-year DELTA in its
   domain-level oa_value and the city-wide year-over-year DELTA in
   `all_domains_stock_city` (the same "city-wide POI count growth" quantity
   `int_poi_status_dynamism.sql`'s own C5 sign-off already treats as the
   OSM-coverage-growth proxy -- reused here verbatim, no new proxy
   invented). Fail (badge `temporal-unsafe`, NEVER delete the column --
   OA-D0 C3) at |rho| >= 0.3 and p < 0.05. Cross-checked against
   `seed_oa_calculation_methods.csv`'s pre-registered `expected_temporal_safe`
   predictions (raw_share and zscore_slq were predicted to FAIL; the rest
   predicted to PASS) -- this section reports whether the empirical result
   confirms or contradicts each prediction, not just a number.
5. **Golden validation of nested-LQ only** -- nested_lq is the SOLE
   golden-anchored method (`seed_oa_calculation_methods.csv.golden_anchored`
   column; `int_poi_offering_advantage_methods.sql` header note 1). This
   script does not re-derive a new golden comparison -- it reuses
   `analysis/c_three_way_comparison.py`'s already-reviewed, already-published
   Run 1 (faithful oa_mean vs the 2018 golden `status_index`) verbatim
   (same reuse-not-rederive precedent that script itself used for
   `e1_regressions.py`), and explicitly states that the other six methods
   have NO golden anchor to validate against (they are all *new*
   calculation choices with no 2018 thesis precedent -- ADR-0024's whole
   premise) -- so "golden validation of nested-LQ only" is not a limitation
   of this script, it is the correct, honest scope (OA-D0 domain sign-off
   Condition E).

Output: docs/methodology/OA-D5-mode-comparison-findings.md
DB path: $GENTRIDUCK_DB env var or data/gentriduck.duckdb (default).
Dependencies: duckdb, pandas, scipy (all already in pyproject.toml).

Usage:
  uv run python analysis/d_oa_mode_comparison.py

Citations: Openshaw (1984), The Modifiable Areal Unit Problem, CATMOG 38
(MAUP framing, §7 threshold); Isard (1960); Isserman (1977) JAIP; Efron &
Morris (1975) JASA; docs/methodology/spatial-methods.md §7/§11;
docs/methodology/OA-D0-geo-signoff.md Conditions C1-C10;
docs/methodology/OA-D0-domain-signoff.md.
"""

from __future__ import annotations

import os
import sys
from datetime import datetime, timezone
from itertools import combinations
from pathlib import Path

try:
    import duckdb
except ImportError:
    print("ERROR: duckdb not installed. Run: uv sync")
    sys.exit(1)

try:
    import pandas as pd
except ImportError:
    print("ERROR: pandas not installed. Run: uv sync")
    sys.exit(1)

try:
    from scipy import stats
except ImportError:
    print("ERROR: scipy not installed. Run: uv sync")
    sys.exit(1)

# Reuse the already-reviewed Run 1 (faithful nested-LQ vs 2018 golden) verbatim
# (see module docstring, deliverable 5) -- same precedent c_three_way_comparison.py
# itself set by reusing e1_regressions.py rather than re-deriving.
sys.path.insert(0, str(Path(__file__).parent))
import c_three_way_comparison as _c1  # noqa: E402

_env_db = os.environ.get("GENTRIDUCK_DB")
DUCKDB_PATH = (
    Path(_env_db) if _env_db else Path(__file__).parent.parent / "data" / "gentriduck.duckdb"
)
OUTPUT_MD = (
    Path(__file__).parent.parent / "docs" / "methodology" / "OA-D5-mode-comparison-findings.md"
)
SEED_CSV = Path(__file__).parent.parent / "transform" / "seeds" / "seed_oa_calculation_methods.csv"

ALPHA = 0.05
MIN_N = 10
MAUP_THRESHOLD = 0.7  # spatial-methods.md §7, mirrored by every other OA/dynamism MAUP check.
CONTAMINATION_THRESHOLD = 0.3  # OA-D0 geo sign-off Condition C3.

METHODS = ["nested_lq", "global_lq", "log_lq", "share_diff", "shrunk_lq", "raw_share", "zscore_slq"]
LEVELS = ["domain", "category", "type"]


def _table_exists(con: duckdb.DuckDBPyConnection, name: str) -> bool:
    rows = con.execute(
        "SELECT table_name FROM information_schema.tables WHERE table_schema='main'"
    ).fetchall()
    return name in {r[0] for r in rows}


# ---------------------------------------------------------------------------
# 1. Cross-mode Spearman correlation matrix
# ---------------------------------------------------------------------------


def load_methods_level(con: duckdb.DuckDBPyConnection, level: str) -> "pd.DataFrame":
    """One row per distinct taxonomy leaf at `level`'s own grain (deduped,
    since int_poi_offering_advantage_methods fans out over the finer levels
    below the requested one -- e.g. a domain-level row repeats once per
    category/type leaf under that domain; see oa_bandwidth_sweep.py's own
    documented dedup precedent for the identical fan-out issue)."""
    key_cols = {
        "domain": ["poi_domain_h"],
        "category": ["poi_domain_h", "poi_category_h"],
        "type": ["poi_domain_h", "poi_category_h", "poi_type_h"],
    }[level]
    value_cols = ", ".join(f"any_value(oa_{level}_{m}) AS {m}" for m in METHODS)
    sql = f"""
        SELECT
            area_code,
            snapshot_year,
            {", ".join(key_cols)},
            {value_cols}
        FROM int_poi_offering_advantage_methods
        WHERE (lower(city_code) = 'berlin' OR city_code = 'BER')
          AND weight_variant = 'standard'
          AND methodology_variant = 'faithful'
        GROUP BY area_code, snapshot_year, {", ".join(key_cols)}
    """
    return con.execute(sql).df()


def cross_mode_correlation(df: "pd.DataFrame", level: str) -> list[dict]:
    results = []
    for m_a, m_b in combinations(METHODS, 2):
        pair = df[[m_a, m_b]].dropna()
        if len(pair) < MIN_N:
            results.append(
                {
                    "level": level,
                    "method_a": m_a,
                    "method_b": m_b,
                    "rho": None,
                    "p": None,
                    "n": len(pair),
                }
            )
            continue
        rho, p = stats.spearmanr(pair[m_a], pair[m_b])
        results.append(
            {
                "level": level,
                "method_a": m_a,
                "method_b": m_b,
                "rho": round(float(rho), 3),
                "p": round(float(p), 6),
                "n": int(len(pair)),
            }
        )
    return results


# ---------------------------------------------------------------------------
# 2. Per-mode MAUP -- nested_lq only (see module docstring, deliverable 2)
# ---------------------------------------------------------------------------


def run_maup_nested_lq(con: duckdb.DuckDBPyConnection) -> list[dict]:
    if not _table_exists(con, "int_poi_offering_advantage_arealevel"):
        return []
    sql = """
        SELECT area_code, snapshot_year, poi_domain_h, area_level, any_value(oa_domain) AS oa_domain
        FROM int_poi_offering_advantage_arealevel
        WHERE city_code = 'BER'
          AND weight_variant = 'standard'
          AND methodology_variant = 'faithful'
          AND area_level IN ('plr', 'bzr')
          AND oa_domain IS NOT NULL
        GROUP BY area_code, snapshot_year, poi_domain_h, area_level
    """
    df = con.execute(sql).df()
    if df.empty:
        return []
    plr = df[df["area_level"] == "plr"].copy()
    bzr = df[df["area_level"] == "bzr"].copy()
    plr["bzr_code"] = plr["area_code"].str[:6]
    merged = plr.merge(
        bzr,
        left_on=["bzr_code", "snapshot_year", "poi_domain_h"],
        right_on=["area_code", "snapshot_year", "poi_domain_h"],
        suffixes=("_plr", "_bzr"),
    )
    merged = merged.dropna(subset=["oa_domain_plr", "oa_domain_bzr"])
    results = []
    for year, grp in merged.groupby("snapshot_year"):
        if len(grp) < MIN_N:
            continue
        rho, p = stats.spearmanr(grp["oa_domain_plr"], grp["oa_domain_bzr"])
        results.append(
            {
                "snapshot_year": int(year),
                "rho": round(float(rho), 3),
                "p": round(float(p), 6),
                "n": int(len(grp)),
                "fragile": bool(rho < MAUP_THRESHOLD),
            }
        )
    if len(merged) >= MIN_N:
        rho, p = stats.spearmanr(merged["oa_domain_plr"], merged["oa_domain_bzr"])
        results.append(
            {
                "snapshot_year": None,
                "rho": round(float(rho), 3),
                "p": round(float(p), 6),
                "n": int(len(merged)),
                "fragile": bool(rho < MAUP_THRESHOLD),
            }
        )
    return results


# ---------------------------------------------------------------------------
# 4. Completeness-contamination gate (OA-D0 geo sign-off Condition C3)
# ---------------------------------------------------------------------------


def run_contamination_gate(con: duckdb.DuckDBPyConnection) -> list[dict]:
    """Domain-level only (the coverage proxy, all_domains_stock_city, is a
    single city-wide constant per year -- it does not vary by taxonomy level
    or area, so testing all three levels would not add information beyond
    testing domain: category/type share the identical city-wide proxy
    series, only the per-area oa_value side changes, and domain is where
    every method's oa_value is defined most simply). Joins
    int_poi_offering_advantage_methods (the 7 method values) to
    int_poi_offering_advantage (all_domains_stock_city, the coverage-growth
    proxy int_poi_status_dynamism.sql's own C5 sign-off already established)
    on the shared grain key."""
    if not (
        _table_exists(con, "int_poi_offering_advantage_methods")
        and _table_exists(con, "int_poi_offering_advantage")
    ):
        return []
    method_cols = ", ".join(f"any_value(m.oa_domain_{meth}) AS {meth}" for meth in METHODS)
    sql = f"""
        SELECT
            m.area_code,
            m.snapshot_year,
            any_value(o.all_domains_stock_city) AS coverage_proxy,
            {method_cols}
        FROM int_poi_offering_advantage_methods m
        JOIN int_poi_offering_advantage o
            ON m.city_code = o.city_code
            AND m.snapshot_year = o.snapshot_year
            AND m.area_code = o.area_code
            AND m.area_vintage = o.area_vintage
            AND m.poi_domain_h = o.poi_domain_h
            AND m.poi_category_h = o.poi_category_h
            AND m.poi_type_h = o.poi_type_h
            AND m.weight_variant = o.weight_variant
            AND m.methodology_variant = o.methodology_variant
        WHERE (lower(m.city_code) = 'berlin' OR m.city_code = 'BER')
          AND m.weight_variant = 'standard'
          AND m.methodology_variant = 'faithful'
        GROUP BY m.area_code, m.snapshot_year
    """
    df = con.execute(sql).df()
    if df.empty:
        return []
    df = df.sort_values(["area_code", "snapshot_year"])
    deltas = df.copy()
    deltas["coverage_delta"] = deltas.groupby("area_code")["coverage_proxy"].diff()
    for meth in METHODS:
        deltas[f"{meth}_delta"] = deltas.groupby("area_code")[meth].diff()

    results = []
    for meth in METHODS:
        pair = deltas[[f"{meth}_delta", "coverage_delta"]].dropna()
        if len(pair) < MIN_N:
            results.append(
                {"method": meth, "rho": None, "p": None, "n": len(pair), "temporal_unsafe": None}
            )
            continue
        rho, p = stats.spearmanr(pair[f"{meth}_delta"], pair["coverage_delta"])
        temporal_unsafe = bool(abs(rho) >= CONTAMINATION_THRESHOLD and p < ALPHA)
        results.append(
            {
                "method": meth,
                "rho": round(float(rho), 3),
                "p": round(float(p), 6),
                "n": int(len(pair)),
                "temporal_unsafe": temporal_unsafe,
            }
        )
    return results


def load_expected_temporal_safe() -> dict:
    df = pd.read_csv(SEED_CSV)
    return dict(zip(df["oa_method"], df["expected_temporal_safe"]))


# ---------------------------------------------------------------------------
# Report rendering
# ---------------------------------------------------------------------------


def render_report(
    cross_mode: dict[str, list[dict]],
    maup: list[dict],
    contamination: list[dict],
    expected_safe: dict,
    golden: dict | None,
) -> str:
    ts = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    lines = []
    lines.append("# OA-D5 (#240): Cross-Mode Comparison Study\n")
    lines.append(
        f"Generated {ts} by `analysis/d_oa_mode_comparison.py`. Berlin only, "
        "`weight_variant='standard'`, `methodology_variant='faithful'` throughout "
        "(the bandwidth-free, hard point-in-polygon, uncurated variant every other "
        "OA analysis script anchors on -- oa_bandwidth_sweep.py's own precedent). "
        "ADR-0024 D3 never-blend: every figure below is reported per-method, never "
        "averaged/combined across methods.\n"
    )

    lines.append("## 1. Cross-mode Spearman rank correlation\n")
    lines.append(
        "Pairwise rank correlation between the seven calculation methods, pooled "
        "across all years/areas, per taxonomy level. Answers: *how differently do "
        "the seven modes actually rank the same areas?*\n"
    )
    for level in LEVELS:
        rows = cross_mode.get(level, [])
        lines.append(f"### {level.title()} level\n")
        lines.append("| Method A | Method B | rho | p | n |")
        lines.append("|---|---|---|---|---|")
        for r in rows:
            rho_s = f"{r['rho']:.3f}" if r["rho"] is not None else "n/a"
            p_s = f"{r['p']:.4f}" if r["p"] is not None else "n/a"
            lines.append(f"| {r['method_a']} | {r['method_b']} | {rho_s} | {p_s} | {r['n']} |")
        lines.append("")
    lines.append(
        "**Reading this:** `global_lq` is algebraically identical to `nested_lq` at "
        "the domain level by construction (int_poi_offering_advantage_methods.sql "
        "header note 2) -- expect rho=1.000 there; divergence at category/type is "
        "the substantive finding (parent-relative vs city-relative genuinely differ "
        "once you leave the domain level). `log_lq` is a monotonic transform of "
        "`nested_lq` -- expect rho=1.000 at every level (Spearman is rank-invariant "
        "to monotonic transforms; this is a check on the math, not a finding). "
        "`raw_share` and `zscore_slq` are expected to diverge most from the LQ "
        "family since they encode a fundamentally different question (a bare "
        "proportion / a base-aware significance score, not an over/under-"
        "representation ratio) -- low correlation there is *correct*, not a defect.\n"
    )

    lines.append("## 2. Per-mode MAUP (PLR-vs-BZR scale sensitivity)\n")
    lines.append(
        "**Scope boundary (read first):** `int_poi_offering_advantage_arealevel` "
        "(OA-D2) only rolled up `nested_lq` (see that model's own header, "
        '"Deferred to later D-spine tickets... D3: calculation-method columns") '
        "-- the other six methods have NEVER been rolled up through `area_level`, "
        "so their MAUP behaviour is genuinely unknown, not merely unreported here. "
        "Extending the area_level roll-up to all seven methods is an OA-D2/D3 "
        "cross-product follow-up, explicitly out of this ticket's scope. This "
        "section checks nested_lq's own scale-sensitivity only (spatial-methods.md "
        "§7, r>0.7 gate, same method `analysis/a6_maup.py` already applies to "
        "dynamism_score).\n"
    )
    if not maup:
        lines.append("- No data available (int_poi_offering_advantage_arealevel empty).\n")
    else:
        lines.append("| Year | rho | p | n | Fragile? |")
        lines.append("|---|---|---|---|---|")
        for r in maup:
            year_s = "ALL (pooled)" if r["snapshot_year"] is None else str(r["snapshot_year"])
            lines.append(
                f"| {year_s} | {r['rho']:.3f} | {r['p']:.4f} | {r['n']} | "
                f"{'**YES**' if r['fragile'] else 'no'} |"
            )
        lines.append("")
        any_fragile = any(r["fragile"] for r in maup)
        if any_fragile:
            lines.append(
                "**MAUP WARNING:** nested_lq rank correlation drops below the "
                f"{MAUP_THRESHOLD} threshold for at least one year -- per "
                "spatial-methods.md §7, any public PLR-vs-BZR comparison of "
                "nested_lq must flag MAUP instability prominently.\n"
            )
        else:
            lines.append(
                f"nested_lq is MAUP-stable across all years/pooled (all r > "
                f"{MAUP_THRESHOLD}) -- no scale-sensitivity flag required for this "
                "method by the §7 gate.\n"
            )

    lines.append("## 3. Bandwidth robustness\n")
    lines.append(
        "**Not re-run here.** `analysis/oa_bandwidth_sweep.py` (#274) already "
        "produced the definitive {500,1000,1500}m cross-bandwidth rank-correlation "
        "sweep for nested_lq (the only method with a Gaussian-weighted variant "
        "ever materialized in the warehouse at once -- see that script's DESIGN "
        "NOTE). Its result is at "
        "`docs/epic-g/G2-oa-bandwidth-sweep-findings.md` and is CITED, not "
        "duplicated, here. Sweeping the other six methods across bandwidth would "
        "need `int_poi_offering_advantage_methods` rebuilt 3x per method (a "
        "mechanical but nontrivial extension) -- explicitly deferred, not silently "
        "assumed equivalent to nested_lq's result.\n"
    )

    lines.append("## 4. Completeness-contamination gate (OA-D0 geo sign-off Condition C3)\n")
    lines.append(
        "Per-method Spearman rho between each area's year-over-year DELTA in "
        "domain-level `oa_value` and the city-wide year-over-year DELTA in "
        "`all_domains_stock_city` (the OSM-coverage-growth proxy "
        "`int_poi_status_dynamism.sql`'s own C5 sign-off already established -- "
        "reused verbatim, not a new proxy). Fail (badge `temporal-unsafe`, per "
        f"OA-D0 C3 **NEVER delete the column**) at |rho| >= {CONTAMINATION_THRESHOLD} "
        f"and p < {ALPHA}.\n"
    )
    if not contamination:
        lines.append("- No data available.\n")
    else:
        lines.append(
            "| Method | rho | p | n | Empirical result | Pre-registered expectation | Confirmed? |"
        )
        lines.append("|---|---|---|---|---|---|---|")
        for r in contamination:
            if r["rho"] is None:
                lines.append(
                    f"| {r['method']} | n/a | n/a | {r['n']} | insufficient data | - | - |"
                )
                continue
            empirical_safe = not r["temporal_unsafe"]
            expected = expected_safe.get(r["method"])
            expected_bool = bool(expected) if expected is not None else None
            confirmed = (
                "yes" if expected_bool == empirical_safe else "**NO -- prediction contradicted**"
            )
            result_s = "temporal-**UNSAFE**" if r["temporal_unsafe"] else "temporal-safe"
            expected_s = (
                "safe" if expected_bool else ("unsafe" if expected_bool is not None else "n/a")
            )
            lines.append(
                f"| {r['method']} | {r['rho']:.3f} | {r['p']:.4f} | {r['n']} | {result_s} | "
                f"{expected_s} | {confirmed} |"
            )
        lines.append("")

    lines.append("## 5. Golden validation (nested-LQ only)\n")
    lines.append(
        "nested_lq is the SOLE `golden_anchored` method "
        "(`seed_oa_calculation_methods.csv`). This is reused verbatim from "
        "`analysis/c_three_way_comparison.py`'s already-reviewed Run 1 "
        "(faithful `oa_mean` vs the 2018 golden `status_index`), not "
        "re-derived. The other six methods are ADR-0024's NEW calculation "
        "choices with no 2018 thesis precedent to validate against -- this is "
        "not a gap in this study, it is the correct scope (OA-D0 domain "
        "sign-off Condition E).\n"
    )
    if golden is None or golden.get("rho") is None:
        lines.append("- Insufficient data to reproduce Run 1 (see c_three_way_comparison.py).\n")
    else:
        lines.append(
            f"- {golden['label']}: rho={golden['rho']:.3f}, p={golden['p']:.4f}, n={golden['n']} "
            f"(reused verbatim from OA-C.1 #174/#261's Run 1).\n"
        )

    lines.append("## Summary — which mode answers which question\n")
    lines.append(
        "| Method | Question it answers | Unit | Golden-anchored | Empirically temporal-safe |\n"
        "|---|---|---|---|---|"
    )
    for meth in METHODS:
        c_row = next((r for r in contamination if r["method"] == meth), None)
        safe_s = "n/a"
        if c_row and c_row["rho"] is not None:
            safe_s = "**NO**" if c_row["temporal_unsafe"] else "yes"
        golden_s = "yes (sole anchor)" if meth == "nested_lq" else "no (new, ADR-0024)"
        question = {
            "nested_lq": "parent-relative over/under-representation (canonical)",
            "global_lq": "city-relative over/under-representation",
            "log_lq": "symmetric (log-centred) parent-relative representation",
            "share_diff": "parent-relative representation, percentage-point unit",
            "shrunk_lq": "parent-relative representation, small-base-damped",
            "raw_share": "within-group composition, no city normalization",
            "zscore_slq": "is the representation big relative to sample size?",
        }[meth]
        lines.append(f"| {meth} | {question} | - | {golden_s} | {safe_s} |")
    lines.append(
        "\n**Never blend (ADR-0024 D3):** this table is a navigation aid, not a "
        'recommendation to pick one column as "the" OA -- each row answers a '
        "genuinely different question and no combined score is computed anywhere "
        "in this pipeline.\n"
    )
    return "\n".join(lines) + "\n"


def main() -> int:
    if not DUCKDB_PATH.exists():
        print(f"WARN: {DUCKDB_PATH} does not exist. Skipping (data-presence guard).")
        return 0
    con = duckdb.connect(str(DUCKDB_PATH), read_only=True)
    try:
        if not _table_exists(con, "int_poi_offering_advantage_methods"):
            print("WARN: int_poi_offering_advantage_methods not built. Skipping.")
            return 0
        cross_mode = {
            level: cross_mode_correlation(load_methods_level(con, level), level) for level in LEVELS
        }
        maup = run_maup_nested_lq(con)
        contamination = run_contamination_gate(con)
        golden = _c1.run_faithful(con)
    finally:
        con.close()

    expected_safe = load_expected_temporal_safe()
    report = render_report(cross_mode, maup, contamination, expected_safe, golden)
    OUTPUT_MD.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_MD.write_text(report, encoding="utf-8")
    print(f"Wrote {OUTPUT_MD}")

    unsafe = [r["method"] for r in contamination if r.get("temporal_unsafe")]
    if unsafe:
        print(f"COMPLETENESS-CONTAMINATION GATE: temporal-unsafe methods: {unsafe}")
    fragile_years = [r for r in maup if r.get("fragile")]
    if fragile_years:
        print(f"MAUP WARNING: nested_lq fragile for {len(fragile_years)} year(s)/pooled cut(s).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
