"""
analysis/d_oa_mode_comparison.py
=================================
OA-D5 (#240, ADR-0024): the mode-comparison study the D-spine's D2/D3/D3b/D4
tickets built the ingredients for -- "a characterised map of which mode
answers which question, how well, and where each breaks" (#240 issue body),
not "one better OA" (ADR-0017 D3 / never-blend).

OA-D5b (#285, 2026-07): extends the original seven-method study to the two
`reference_point='absolute'` methods added after it first ran -- `density`
and `percapita` (both `expected_temporal_safe=false` per
`seed_oa_calculation_methods.csv`). Per #285's binding constraints (ADR-0017
never-blend, restated for this cluster in the #285 issue body):

- `density`/`percapita` are rank-correlated against the seven parent-/city-
  relative methods for INFORMATION only (Spearman is ordinal, not a shared
  scale) -- never plotted, joined, or presented on a shared numeric axis or
  colour scale with the relative-LQ family (this script produces markdown
  tables only, so that hazard does not arise here, but the report text says
  so explicitly for any downstream consumer).
- The completeness-contamination gate (deliverable 4 below) is EXTENDED, not
  reinvented, to also test density/percapita -- same query shape, same
  |rho|>=0.3 & p<0.05 threshold, same reused OSM-coverage-growth proxy. This
  answers "would a year-over-year delta for density/percapita be safe" but
  its PASS/FAIL result alone does not authorize a live delta on the OA-D7
  page: that page's own carried-forward condition additionally requires a
  PER-CELL completeness flag upstream (not yet built for any method), a
  stricter bar than this citywide, per-method test -- see deliverable 4 and
  the findings doc for the full reasoning.
- Getis-Ord Gi* is NOT added here: `seed_oa_calculation_methods.csv` has no
  `getis_ord` row (verified directly against the seed, not assumed) --
  ADR-0025 (its would-be grounding) remains status Proposed. Deliverable 6
  below is a placeholder note, not a computation, so a future ticket that
  registers the method has an obvious place to land its own deliverable
  rather than needing to rediscover the gap.

`reference_point` and `expected_temporal_safe` (the classing this whole
extension turns on) are read directly from `seed_oa_calculation_methods.csv`
at import time (`_load_method_registry` below) -- the relative/absolute
method lists are QUERY-DRIVEN from the seed's own columns, not a hardcoded
method-name list repeated through this script (the #280/R1-F2 precedent this
ticket's issue body explicitly calls back to).

Five (now six, see #6 below) deliverables, each a separate, clearly-labelled
section of the findings report (`docs/methodology/OA-D5-mode-comparison-findings.md`):

1. **Cross-mode Spearman correlation** -- pairwise rank correlation between
   the `int_poi_offering_advantage_methods` columns, per taxonomy level
   (domain/category/type), Berlin, `weight_variant='standard'`,
   `methodology_variant='faithful'`, pooled across all years/areas. Split
   into (1a) the seven-method relative-LQ family (nested_lq, global_lq,
   log_lq, share_diff, shrunk_lq, raw_share, zscore_slq) -- UNCHANGED from
   the original OA-D5 run, same 21 pairs/level -- and (1b) density/percapita
   against that family and against each other -- NEW in #285, informational
   only, never a shared-scale claim.
2. **Per-mode MAUP (PLR-vs-BZR) rank-stability** -- reuses the ALREADY-BUILT
   `int_poi_offering_advantage_arealevel` (OA-D2, #240) roll-up, which only
   carries the nested-LQ (the sole method OA-D2 rolled up per its own
   documented scope -- see that model's header, "Deferred to later D-spine
   tickets... shrunk-LQ, raw share, z-score, Getis-Ord, density, per-capita").
   This section therefore checks nested_lq's OWN scale-sensitivity
   (spatial-methods.md §7, r>0.7 gate, same threshold/method
   `analysis/a6_maup.py` already uses for dynamism_score) and explicitly
   documents that the other eight methods' MAUP behaviour -- including
   density/percapita, still true after #285 -- is NOT YET CHECKED (rolling
   them up through area_level is an OA-D2-extension follow-on this ticket
   does not build).
3. **Bandwidth robustness** -- NOT re-run here. `analysis/oa_bandwidth_sweep.py`
   (#274) already produced the definitive {500,1000,1500}m sweep for the
   nested-LQ (the only method with a Gaussian-weighted variant actually
   built in the warehouse at any one time -- see that script's own "DESIGN
   NOTE" on why only one `gaussian_*` bandwidth physically exists per dbt
   build). Extending the sweep to the other eight methods (including
   density/percapita) would require rebuilding
   `int_poi_offering_advantage_methods` three times per method, a mechanical
   but nontrivial follow-up explicitly OUT of this ticket's scope -- this
   script CITES `docs/epic-g/G2-oa-bandwidth-sweep-findings.md`'s result
   rather than duplicating or mocking a second computation.
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
   predictions -- this section reports whether the empirical result
   confirms or contradicts each prediction, not just a number. #285 EXTENDS
   this gate to density/percapita (predicted unsafe, `reference_point`
   absolute) using the identical query shape already used for the other
   seven methods -- no new proxy, no new threshold, no new join pattern.
5. **Golden validation of nested-LQ only** -- nested_lq is the SOLE
   golden-anchored method (`seed_oa_calculation_methods.csv.golden_anchored`
   column; `int_poi_offering_advantage_methods.sql` header note 1). This
   script does not re-derive a new golden comparison -- it reuses
   `analysis/c_three_way_comparison.py`'s already-reviewed, already-published
   Run 1 (faithful oa_mean vs the 2018 golden `status_index`) verbatim, and
   explicitly states that the other eight methods (unchanged by #285 --
   density/percapita have no golden anchor either) have NO golden anchor to
   validate against -- so "golden validation of nested-LQ only" is not a
   limitation of this script, it is the correct, honest scope (OA-D0 domain
   sign-off Condition E).
6. **Getis-Ord Gi* slot (#285, placeholder only)** -- documents, from the
   seed CSV directly, that no `getis_ord` row exists yet and therefore no
   comparison can be computed; points at ADR-0025 (status: Proposed) as the
   gating decision a future method-registration ticket must clear first.
   This is a NOTE, not a deliverable with numbers -- forcing a Getis-Ord
   comparison in without that slice existing would be exactly the kind of
   unsupported claim OA-D0's sign-offs exist to prevent.

Output: docs/methodology/OA-D5-mode-comparison-findings.md
DB path: $GENTRIDUCK_DB env var or data/gentriduck.duckdb (default).
Dependencies: duckdb, pandas, scipy (all already in pyproject.toml).

Usage:
  uv run python analysis/d_oa_mode_comparison.py
  uv run python analysis/d_oa_mode_comparison.py --city-code HH   # #318: Hamburg
    completeness-contamination gate only (deliverable 4), see docs/methodology/
    OA-D5-mode-comparison-findings.md's Hamburg addendum and #312 geo sign-off
    Condition R4 (docs/epic-h/312-hh-oa-geo-signoff.md).

Citations: Openshaw (1984), The Modifiable Areal Unit Problem, CATMOG 38
(MAUP framing, §7 threshold); Isard (1960); Isserman (1977) JAIP; Efron &
Morris (1975) JASA; docs/methodology/spatial-methods.md §7/§11;
docs/methodology/OA-D0-geo-signoff.md Conditions C1-C10 (C5/C8 density,
C10 per-capita); docs/methodology/OA-D0-domain-signoff.md Condition C
(density/per-capita answer provision/centrality, not offering-advantage;
per-capita's denominator is endogenous to displacement); ADR-0017 D3 /
ADR-0024 D3 (never-blend).
"""

from __future__ import annotations

import argparse
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


# ---------------------------------------------------------------------------
# #285 (R1/F2 precedent, query-driven classing): the relative/absolute method
# split -- and which method is the sole golden anchor -- are read from
# `seed_oa_calculation_methods.csv`'s own `reference_point` / `golden_anchored`
# columns, not hardcoded here. `ALL_METHODS` preserves the seed file's own row
# order (nested_lq, global_lq, log_lq, share_diff, shrunk_lq, raw_share,
# zscore_slq, density, percapita) so the seven-method relative-family output
# is byte-identical to the pre-#285 OA-D5 run (same pairs, same order).
# ---------------------------------------------------------------------------


def _load_method_registry() -> tuple[list[str], list[str], list[str], str, "pd.DataFrame"]:
    df = pd.read_csv(SEED_CSV).set_index("oa_method", drop=False)
    all_methods = list(df.index)
    relative_methods = [m for m in all_methods if df.loc[m, "reference_point"] != "absolute"]
    absolute_methods = [m for m in all_methods if df.loc[m, "reference_point"] == "absolute"]
    golden_rows = df.index[df["golden_anchored"] == True]  # noqa: E712
    golden_method = golden_rows[0] if len(golden_rows) else relative_methods[0]
    if "getis_ord" not in all_methods:
        # #285: verified directly against the seed, not assumed -- see deliverable 6.
        pass
    return all_methods, relative_methods, absolute_methods, golden_method, df


ALL_METHODS, RELATIVE_METHODS, ABSOLUTE_METHODS, GOLDEN_METHOD, METHOD_META = (
    _load_method_registry()
)
GETIS_ORD_REGISTERED = "getis_ord" in ALL_METHODS
LEVELS = ["domain", "category", "type"]

# Pair lists for the two cross-mode correlation deliverables (1a/1b below).
# combinations() over RELATIVE_METHODS reproduces the ORIGINAL seven-method
# OA-D5 pairing (21 pairs/level, same order) exactly -- see
# _load_method_registry's order guarantee above. Note this is a code-path
# guarantee (identical query/pairing), not a data-value guarantee -- the
# warehouse itself changes between report generations as new data is
# ingested/rebuilt, so a re-run's numbers can legitimately differ from a
# previously published findings doc even with zero code change (see render_
# report's own caveat text for deliverable 1a below).
RELATIVE_PAIRS: list[tuple[str, str]] = list(combinations(RELATIVE_METHODS, 2))
# Absolute-vs-relative (informational, never-shared-scale) pairs: each
# absolute method against every relative method, then absolute-vs-absolute
# (density vs percapita) last.
ABSOLUTE_CROSS_PAIRS: list[tuple[str, str]] = [
    (a, r) for a in ABSOLUTE_METHODS for r in RELATIVE_METHODS
] + list(combinations(ABSOLUTE_METHODS, 2))


def _table_exists(con: duckdb.DuckDBPyConnection, name: str) -> bool:
    rows = con.execute(
        "SELECT table_name FROM information_schema.tables WHERE table_schema='main'"
    ).fetchall()
    return name in {r[0] for r in rows}


def _city_filter_sql(city_code: str, alias: str = "") -> tuple[str, list]:
    """SQL WHERE-fragment + duckdb params matching this warehouse's per-city
    `city_code` storage convention. #318 (tooling/reproducibility only, no
    new indicator/weight/normalization): parametrizes the two previously
    Berlin-hardcoded filters below (`load_methods_level`,
    `run_contamination_gate`) so the completeness-contamination gate
    (deliverable 4) is re-runnable for a second city from a single committed
    command -- #312's geo sign-off Condition R4
    (docs/epic-h/312-hh-oa-geo-signoff.md, citing 312-oa-c5-geo-spike.md's own
    R4) flagged the pre-#318 Hamburg numbers as an uncommitted, ad hoc filter
    swap, not yet reproducible from committed code.

    Berlin ('BER', the default -- preserves pre-#318 behavior byte-for-byte)
    keeps its two historical spellings verbatim: 'BER' (most models) and
    lowercase 'berlin' (`int_osm_poi_plr_weighted`'s own convention, also
    matched by `oa_bandwidth_sweep.py`'s identical filter). Any other
    city_code (e.g. 'HH' for Hamburg, `e5_hamburg_lead_lag.py`'s own
    convention) is matched case-insensitively (`upper()` both sides, #318
    review fix -- `--city-code hh` now matches stored 'HH' rows the same way
    Berlin's own filter above already tolerates case), parameter-bound rather
    than f-string-interpolated (the value passed through here is always an
    internal/CLI-controlled city_code, never untrusted external text --
    parameter binding is precautionary hygiene, not a response to a modeled
    threat)."""
    col = f"{alias}.city_code" if alias else "city_code"
    if city_code.upper() == "BER":
        return f"(lower({col}) = 'berlin' OR {col} = 'BER')", []
    # Case-insensitive match, mirroring Berlin's own case-insensitivity above --
    # this warehouse's non-Berlin city_code convention is uppercase (e.g. 'HH',
    # e5_hamburg_lead_lag.py's own convention), so upper() on both sides lets
    # `--city-code hh` (lowercase CLI input) match stored 'HH' rows instead of
    # silently returning zero rows.
    return f"upper({col}) = ?", [city_code.upper()]


# ---------------------------------------------------------------------------
# 1. Cross-mode Spearman correlation matrix
# ---------------------------------------------------------------------------


def load_methods_level(
    con: duckdb.DuckDBPyConnection, level: str, city_code: str = "BER"
) -> "pd.DataFrame":
    """One row per distinct taxonomy leaf at `level`'s own grain (deduped,
    since int_poi_offering_advantage_methods fans out over the finer levels
    below the requested one -- e.g. a domain-level row repeats once per
    category/type leaf under that domain; see oa_bandwidth_sweep.py's own
    documented dedup precedent for the identical fan-out issue). Loads ALL
    nine method columns in one query (#285) -- both the 1a (relative-family)
    and 1b (absolute-vs-relative) correlation passes below reuse this single
    load rather than re-querying per pair-set.

    `city_code` (#318, default 'BER' -- preserves pre-#318 behavior
    byte-for-byte): see `_city_filter_sql` for the per-city filter
    convention."""
    key_cols = {
        "domain": ["poi_domain_h"],
        "category": ["poi_domain_h", "poi_category_h"],
        "type": ["poi_domain_h", "poi_category_h", "poi_type_h"],
    }[level]
    value_cols = ", ".join(f"any_value(oa_{level}_{m}) AS {m}" for m in ALL_METHODS)
    filter_sql, params = _city_filter_sql(city_code)
    sql = f"""
        SELECT
            area_code,
            snapshot_year,
            {", ".join(key_cols)},
            {value_cols}
        FROM int_poi_offering_advantage_methods
        WHERE {filter_sql}
          AND weight_variant = 'standard'
          AND methodology_variant = 'faithful'
        GROUP BY area_code, snapshot_year, {", ".join(key_cols)}
    """
    return con.execute(sql, params).df()


def cross_mode_correlation(
    df: "pd.DataFrame", level: str, pairs: list[tuple[str, str]]
) -> list[dict]:
    results = []
    for m_a, m_b in pairs:
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


def run_contamination_gate(
    con: duckdb.DuckDBPyConnection, methods: list[str], city_code: str = "BER"
) -> list[dict]:
    """Domain-level only (the coverage proxy, all_domains_stock_city, is a
    single city-wide constant per year -- it does not vary by taxonomy level
    or area, so testing all three levels would not add information beyond
    testing domain: category/type share the identical city-wide proxy
    series, only the per-area oa_value side changes, and domain is where
    every method's oa_value is defined most simply). Joins
    int_poi_offering_advantage_methods (the method values, now including
    density/percapita per #285 -- `methods` param) to
    int_poi_offering_advantage (all_domains_stock_city, the coverage-growth
    proxy int_poi_status_dynamism.sql's own C5 sign-off already established)
    on the shared grain key. SAME query shape used for the original seven
    methods -- extended, not reinvented, per #285's own binding instruction.

    `city_code` (#318, default 'BER' -- preserves pre-#318 behavior
    byte-for-byte, same threshold/logic, just which city's rows are queried):
    see `_city_filter_sql`. #312's geo sign-off Condition R4
    (docs/epic-h/312-hh-oa-geo-signoff.md / 312-oa-c5-geo-spike.md's own R4)
    explicitly cautioned that naively dropping the city filter without also
    carrying `city_code` through the delta-computation partition would be a
    latent correctness trap if area_code ever collides across cities (Berlin
    PLR vs Hamburg Gebiet codes do not collide today, verified in that spike,
    but nothing guarantees that forever). This function still queries exactly
    ONE city per call (no filter is dropped here), but the delta groupby key
    below is `(city_code, area_code)`, not `area_code` alone, honoring that
    caution defensively -- harmless today (a single-city result set has only
    one distinct city_code, so the extra key changes no numbers), and correct
    if a future caller ever unions multiple cities' rows before calling this
    function."""
    if not (
        _table_exists(con, "int_poi_offering_advantage_methods")
        and _table_exists(con, "int_poi_offering_advantage")
    ):
        return []
    method_cols = ", ".join(f"any_value(m.oa_domain_{meth}) AS {meth}" for meth in methods)
    filter_sql, params = _city_filter_sql(city_code, alias="m")
    sql = f"""
        SELECT
            m.city_code,
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
        WHERE {filter_sql}
          AND m.weight_variant = 'standard'
          AND m.methodology_variant = 'faithful'
        GROUP BY m.city_code, m.area_code, m.snapshot_year
    """
    df = con.execute(sql, params).df()
    if df.empty:
        return []
    df = df.sort_values(["city_code", "area_code", "snapshot_year"])
    deltas = df.copy()
    deltas["coverage_delta"] = deltas.groupby(["city_code", "area_code"])["coverage_proxy"].diff()
    for meth in methods:
        deltas[f"{meth}_delta"] = deltas.groupby(["city_code", "area_code"])[meth].diff()

    results = []
    for meth in methods:
        pair = deltas[[f"{meth}_delta", "coverage_delta"]].dropna()
        if len(pair) < MIN_N:
            results.append(
                {
                    "method": meth,
                    "rho": None,
                    "p": None,
                    "n": len(pair),
                    "temporal_unsafe": None,
                    "note": "insufficient data (n < MIN_N)",
                }
            )
            continue
        # #285 fix: a Spearman correlation against a CONSTANT coverage_delta
        # (e.g. a method whose exact-year join only ever produces ONE
        # year-over-year transition, as percapita's EWR exact-year match
        # can) is mathematically undefined (SciPy returns NaN with a
        # ConstantInputWarning) -- this must be reported as indeterminate,
        # NEVER silently treated as "passes" (NaN >= threshold is False in
        # Python, which would otherwise mislabel it temporal-safe).
        n_transitions = int(pair["coverage_delta"].nunique())
        if n_transitions < 2:
            results.append(
                {
                    "method": meth,
                    "rho": None,
                    "p": None,
                    "n": int(len(pair)),
                    "temporal_unsafe": None,
                    "note": (
                        f"indeterminate -- only {n_transitions} distinct year-over-year "
                        "transition available (Spearman undefined against a constant)"
                    ),
                }
            )
            continue
        rho, p = stats.spearmanr(pair[f"{meth}_delta"], pair["coverage_delta"])
        if pd.isna(rho):
            results.append(
                {
                    "method": meth,
                    "rho": None,
                    "p": None,
                    "n": int(len(pair)),
                    "temporal_unsafe": None,
                    "note": "indeterminate -- correlation undefined (constant input)",
                }
            )
            continue
        temporal_unsafe = bool(abs(rho) >= CONTAMINATION_THRESHOLD and p < ALPHA)
        results.append(
            {
                "method": meth,
                "rho": round(float(rho), 3),
                "p": round(float(p), 6),
                "n": int(len(pair)),
                "temporal_unsafe": temporal_unsafe,
                "note": None,
            }
        )
    return results


def load_expected_temporal_safe() -> dict:
    return dict(zip(METHOD_META["oa_method"], METHOD_META["expected_temporal_safe"]))


# ---------------------------------------------------------------------------
# Report rendering
# ---------------------------------------------------------------------------


def render_report(
    cross_mode: dict[str, list[dict]],
    cross_mode_absolute: dict[str, list[dict]],
    maup: list[dict],
    contamination: list[dict],
    expected_safe: dict,
    golden: dict | None,
) -> str:
    ts = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    lines = []
    lines.append("# OA-D5 (#240, extended #285): Cross-Mode Comparison Study\n")
    lines.append(
        f"Generated {ts} by `analysis/d_oa_mode_comparison.py`. Berlin only, "
        "`weight_variant='standard'`, `methodology_variant='faithful'` throughout "
        "(the bandwidth-free, hard point-in-polygon, uncurated variant every other "
        "OA analysis script anchors on -- oa_bandwidth_sweep.py's own precedent). "
        "ADR-0024 D3 never-blend: every figure below is reported per-method, never "
        "averaged/combined across methods. **#285 extension:** `density` and "
        "`percapita` (both `reference_point='absolute'`, both "
        "`expected_temporal_safe=false` per `seed_oa_calculation_methods.csv`) are "
        "now included in the cross-mode correlation (§1b, informational only) and "
        "the completeness-contamination gate (§4) -- they were absent from the "
        "original OA-D5 run because they were added to the pipeline afterwards. "
        "They remain excluded from every OTHER deliverable below (MAUP, bandwidth, "
        "golden validation) for the same documented reasons the other six "
        "non-canonical methods are -- see each section.\n"
    )

    lines.append("## 1. Cross-mode Spearman rank correlation\n")
    lines.append(
        "### 1a. The seven relative-family methods (unchanged from the original OA-D5 run)\n"
    )
    lines.append(
        "Pairwise rank correlation between the seven parent-/city-relative calculation "
        "methods, pooled across all years/areas, per taxonomy level. Answers: *how "
        "differently do the seven modes actually rank the same areas?* #285 reuses the "
        "IDENTICAL query/code path the original OA-D5 run used for this table -- this "
        "extension adds density/percapita as a new §1b below, it does not modify this "
        "one. Any numeric drift from a previously published findings doc reflects "
        "ordinary warehouse data refreshes between report generations (new OSM/EWR "
        "ingestion), not a methodology or code change here.\n"
    )
    for level in LEVELS:
        rows = cross_mode.get(level, [])
        lines.append(f"#### {level.title()} level\n")
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

    lines.append(
        "### 1b. Absolute-class methods (density, per-capita) vs. the relative family "
        "-- informational only (#285)\n"
    )
    lines.append(
        "<!-- NEVER BLEND (ADR-0017/ADR-0024 D3, binding): the rho values below are "
        "computed for information -- Spearman is an ordinal statistic, not a shared "
        "scale -- but density/percapita must NEVER be presented on a shared "
        "choropleth colour scale, legend, or numeric axis with the relative-LQ "
        "family, here or anywhere else in this project. This section is a table of "
        "numbers, not a chart, precisely to keep that hazard from arising. -->\n"
    )
    lines.append(
        "`density` and `percapita` are `reference_point='absolute'` "
        "(`seed_oa_calculation_methods.csv`) -- they answer a provision/centrality "
        'question ("how much commerce is here"), not an offering-advantage '
        'question ("is this type over-represented here"), so they form a genuinely '
        "separate class from the seven methods above. A high or low rho here does "
        'not mean the methods "agree" or "disagree" in the §1a sense -- it can '
        "arise simply because busy, dense, well-populated areas also happen to have "
        "typical location quotients, a coincidence of geography, not a validation of "
        "either construct against the other.\n"
    )
    for level in LEVELS:
        rows = cross_mode_absolute.get(level, [])
        lines.append(f"#### {level.title()} level\n")
        lines.append("| Method A | Method B | rho | p | n |")
        lines.append("|---|---|---|---|---|")
        for r in rows:
            rho_s = f"{r['rho']:.3f}" if r["rho"] is not None else "n/a"
            p_s = f"{r['p']:.4f}" if r["p"] is not None else "n/a"
            lines.append(f"| {r['method_a']} | {r['method_b']} | {rho_s} | {p_s} | {r['n']} |")
        lines.append("")

    lines.append("## 2. Per-mode MAUP (PLR-vs-BZR scale sensitivity)\n")
    lines.append(
        "**Scope boundary (read first):** `int_poi_offering_advantage_arealevel` "
        "(OA-D2) only rolled up `nested_lq` (see that model's own header, "
        '"Deferred to later D-spine tickets... shrunk-LQ, raw share, z-score, '
        'Getis-Ord, density, per-capita") '
        "-- the other eight methods, including density/percapita after #285, have "
        "NEVER been rolled up through `area_level`, so their MAUP behaviour is "
        "genuinely unknown, not merely unreported here. Extending the area_level "
        "roll-up to all nine methods is an OA-D2/D3 cross-product follow-up, "
        "explicitly out of this ticket's scope. This section checks nested_lq's own "
        "scale-sensitivity only (spatial-methods.md §7, r>0.7 gate, same method "
        "`analysis/a6_maup.py` already applies to dynamism_score).\n"
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
        "duplicated, here. Sweeping the other eight methods (including "
        "density/percapita after #285) across bandwidth would need "
        "`int_poi_offering_advantage_methods` rebuilt 3x per method (a "
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
        f"and p < {ALPHA}. **#285 extends this to all nine methods**, including "
        "density/percapita, using the identical query shape -- see deliverable 4 "
        "in the module docstring for why a PASS here still would not, by itself, "
        "authorize a live year-over-year delta on the OA-D7 page (a stricter, "
        "per-cell completeness flag is the page's own separate, unbuilt "
        "condition).\n"
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
                note = r.get("note") or "insufficient data"
                lines.append(f"| {r['method']} | n/a | n/a | {r['n']} | {note} | - | - |")
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
        density_row = next((r for r in contamination if r["method"] == "density"), None)
        percapita_row = next((r for r in contamination if r["method"] == "percapita"), None)
        for label, row in (("density", density_row), ("percapita", percapita_row)):
            if row is None or row.get("rho") is None:
                reason = (row or {}).get("note") or "insufficient data"
                reason = reason.removeprefix("indeterminate -- ")
                lines.append(
                    f"**{label}: gate is INDETERMINATE** ({reason}) -- this is NOT "
                    "a pass, and is treated as temporal-unsafe by default (no "
                    "evidence of safety), consistent with the OA-D7 page's "
                    "existing stock-only treatment, which does not change as a "
                    "result of this run.\n"
                )
            elif row["temporal_unsafe"]:
                lines.append(
                    f"**{label}: gate FAILS** (temporal-unsafe) -- confirms the "
                    "pre-registered `expected_temporal_safe=false` prediction. The "
                    "OA-D7 page's existing point-in-time-only treatment for "
                    f"{label} is correct and should not change.\n"
                )
            else:
                lines.append(
                    f"**{label}: gate empirically PASSES** at the citywide, "
                    "per-method level tested here (|rho| stays under "
                    f"{CONTAMINATION_THRESHOLD}) -- this CONTRADICTS the "
                    "pre-registered `expected_temporal_safe=false` prediction, the "
                    "same class of surprise `raw_share`/`zscore_slq` already "
                    "produced in the original OA-D5 run. **This does not, by "
                    "itself, authorize a live year-over-year delta on the OA-D7 "
                    "page**: this is a citywide, per-method check, not the "
                    "per-cell completeness flag that page's own carried-forward "
                    "condition requires (see OA-D7 pass-2 header comment) -- a "
                    "future ticket building that per-cell flag can cite this "
                    "result as supportive evidence, not as a substitute for it.\n"
                )

    lines.append(
        "**Why percapita is indeterminate here, not merely `insufficient data`:** "
        "Berlin's exact-year EWR-to-POI join (`int_poi_offering_advantage_methods.sql` "
        "note 9, OA-D0 geo sign-off C10 -- no nearest-year fallback, and `lor_2021` "
        "area-vintage only) only has a literal year match for `snapshot_year` 2024 "
        "and 2025 in the current warehouse -- a single year-over-year transition, "
        "against which a Spearman correlation is mathematically undefined (there is "
        "no second transition to rank against the first). This is a genuine, narrow "
        "data-coverage limitation, not a bug in this gate -- a future EWR ingestion "
        "covering more reference years (closing the 2021-2023 gap visible in "
        "`int_ewr_socioeco`) would let this test actually run with multiple "
        "transitions.\n"
    )
    lines.append(
        "**Hamburg cross-check (#312, #318):** see "
        "`docs/methodology/OA-D5-hamburg-addendum.md` -- a separate, hand-maintained "
        "file this document's own regeneration never touches (that separation is "
        "itself the #318 review fix: this Berlin-scoped doc is fully overwritten by "
        "every `uv run python analysis/d_oa_mode_comparison.py` run, so the Hamburg "
        "record cannot live as a hand-added section in here without being silently "
        "destroyed by the next routine refresh).\n"
    )

    lines.append("## 5. Golden validation (nested-LQ only)\n")
    lines.append(
        "nested_lq is the SOLE `golden_anchored` method "
        "(`seed_oa_calculation_methods.csv`). This is reused verbatim from "
        "`analysis/c_three_way_comparison.py`'s already-reviewed Run 1 "
        "(faithful `oa_mean` vs the 2018 golden `status_index`), not "
        "re-derived. The other eight methods, including density/percapita, are "
        "new calculation choices with no 2018 thesis precedent to validate "
        "against -- this is not a gap in this study, it is the correct scope "
        "(OA-D0 domain sign-off Condition E).\n"
    )
    if golden is None or golden.get("rho") is None:
        lines.append("- Insufficient data to reproduce Run 1 (see c_three_way_comparison.py).\n")
    else:
        lines.append(
            f"- {golden['label']}: rho={golden['rho']:.3f}, p={golden['p']:.4f}, n={golden['n']} "
            f"(reused verbatim from OA-C.1 #174/#261's Run 1).\n"
        )

    lines.append("## 6. Getis-Ord Gi* slot (#285 -- placeholder, not a computation)\n")
    if GETIS_ORD_REGISTERED:
        lines.append(
            "`seed_oa_calculation_methods.csv` now carries a `getis_ord` row -- this "
            "script has not yet been extended to compute a comparison for it "
            "(the seed row's presence alone does not mean the upstream "
            "hotspot-clustering mart exists or has been validated); a follow-up "
            "ticket should add it to the deliverables above once that mart lands.\n"
        )
    else:
        lines.append(
            "Verified directly against `seed_oa_calculation_methods.csv` (not "
            "assumed): **no `getis_ord` row exists yet.** Getis-Ord Gi* hotspot "
            "clustering needs a Queen-contiguity spatial-weights matrix, not a "
            "plain join, and its ADR ([ADR-0025](https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0025-getis-ord-gistar-esda-mart-handoff.md)) "
            "remains status **Proposed** -- per #285's own framing, this slot is "
            '"gated on that slice existing," and it does not exist yet. This '
            "study does not force a Getis-Ord comparison in; a future "
            "method-registration ticket (ADR-0025 acceptance + the mart it "
            "authorizes) is the correct place to add it, at which point this "
            "script's `ALL_METHODS`/`ABSOLUTE_METHODS` lists (already query-driven "
            "from the seed CSV) will pick it up with no code change beyond "
            "whatever Getis-Ord-specific statistic that future ticket decides is "
            "appropriate (Gi* is a spatial-clustering statistic, not a rank value "
            "-- it may not even be a Spearman-comparable column, a design question "
            "left to that ticket, not pre-judged here).\n"
        )

    lines.append("## Summary — which mode answers which question\n")
    lines.append(
        "| Method | Question it answers | Reference point | Golden-anchored | "
        "Empirically temporal-safe |\n"
        "|---|---|---|---|---|"
    )
    question_by_method = {
        "nested_lq": "parent-relative over/under-representation (canonical)",
        "global_lq": "city-relative over/under-representation",
        "log_lq": "symmetric (log-centred) parent-relative representation",
        "share_diff": "parent-relative representation, percentage-point unit",
        "shrunk_lq": "parent-relative representation, small-base-damped",
        "raw_share": "within-group composition, no city normalization",
        "zscore_slq": "is the representation big relative to sample size?",
        "density": "provision/centrality -- POIs per km2, NOT a location quotient",
        "percapita": "provision/exposure -- POIs per 1,000 residents, NOT a location quotient",
    }
    for meth in ALL_METHODS:
        c_row = next((r for r in contamination if r["method"] == meth), None)
        safe_s = "n/a"
        if c_row and c_row["rho"] is not None:
            safe_s = "**NO**" if c_row["temporal_unsafe"] else "yes"
        golden_s = "yes (sole anchor)" if meth == GOLDEN_METHOD else "no (new, ADR-0024)"
        ref_point = METHOD_META.loc[meth, "reference_point"]
        ref_s = f"**{ref_point}**" if ref_point == "absolute" else ref_point
        question = question_by_method.get(meth, "-")
        lines.append(f"| {meth} | {question} | {ref_s} | {golden_s} | {safe_s} |")
    lines.append(
        "\n**Never blend (ADR-0017/ADR-0024 D3):** this table is a navigation aid, not "
        'a recommendation to pick one column as "the" OA -- each row answers a '
        "genuinely different question and no combined score is computed anywhere "
        "in this pipeline. The two **absolute** rows (density, percapita) are a "
        "genuinely separate class from the seven relative-family rows above them: "
        "they may be rank-correlated for information (§1b) but must never share a "
        "choropleth colour scale, legend, or numeric axis with the relative family.\n"
    )
    return "\n".join(lines) + "\n"


def _print_contamination_gate(city_code: str, contamination: list[dict]) -> list[str]:
    """Plain-text render of the completeness-contamination gate (deliverable 4)
    for a single city -- used by the #318 `--city-code` gate-only CLI path so
    a non-Berlin re-run (e.g. Hamburg, #312) has a committed, single-command
    result without regenerating the Berlin-scoped findings doc (see `main`).
    Returns the list of temporal-unsafe method names (empty if none)."""
    print(f"Completeness-contamination gate (OA-D0 C3) -- city_code={city_code}\n")
    print(f"{'Method':<12}{'rho':>10}{'p':>12}{'n':>8}  Result")
    unsafe = []
    for r in contamination:
        if r["rho"] is None:
            print(f"{r['method']:<12}{'n/a':>10}{'n/a':>12}{r['n']:>8}  {r.get('note')}")
            continue
        result_s = "temporal-UNSAFE" if r["temporal_unsafe"] else "temporal-safe"
        print(f"{r['method']:<12}{r['rho']:>10.3f}{r['p']:>12.4f}{r['n']:>8}  {result_s}")
        if r["temporal_unsafe"]:
            unsafe.append(r["method"])
    return unsafe


def main() -> int:
    # #318: `--city-code` lets the completeness-contamination gate (deliverable
    # 4, "the ONE gate this ticket must actually run" per the module
    # docstring) be re-run for a second city from a single committed command,
    # closing #312 geo sign-off Condition R4 (the pre-#318 Hamburg numbers
    # came from an uncommitted ad hoc filter swap). Default 'BER' is UNCHANGED
    # pre-#318 behavior: the full six-deliverable report, written to the
    # Berlin-scoped OUTPUT_MD. Any other city_code runs ONLY the
    # contamination gate and prints its result -- it does not regenerate
    # OUTPUT_MD, whose narrative text (MAUP §2, bandwidth §3, golden
    # validation §5) is Berlin-specific and out of this ticket's tooling-only
    # scope (issue #318: "no new indicator/weight/normalization" -- a
    # multi-city rewrite of those sections would be exactly that kind of
    # scope creep for a change that should only parametrize which city's
    # data is queried).
    parser = argparse.ArgumentParser(
        description="OA-D5 (#240/#285) mode-comparison study / completeness-contamination gate"
    )
    parser.add_argument(
        "--city-code",
        default="BER",
        help=(
            "City to run against. Default 'BER' (Berlin) runs the full report "
            "(all six deliverables) and writes "
            "docs/methodology/OA-D5-mode-comparison-findings.md. Any other "
            "city_code (e.g. 'HH' for Hamburg) runs ONLY the completeness-"
            "contamination gate (deliverable 4) against that city's data and "
            "prints its result table -- see docs/methodology/"
            "OA-D5-mode-comparison-findings.md's Hamburg addendum (#318)."
        ),
    )
    args = parser.parse_args()
    city_code = args.city_code

    if not DUCKDB_PATH.exists():
        print(f"WARN: {DUCKDB_PATH} does not exist. Skipping (data-presence guard).")
        return 0
    con = duckdb.connect(str(DUCKDB_PATH), read_only=True)
    try:
        if not _table_exists(con, "int_poi_offering_advantage_methods"):
            print("WARN: int_poi_offering_advantage_methods not built. Skipping.")
            return 0

        if city_code.upper() != "BER":
            contamination = run_contamination_gate(con, ALL_METHODS, city_code=city_code)
            if not contamination:
                print(f"WARN: no contamination-gate data for city_code={city_code}. Skipping.")
                return 0
            unsafe = _print_contamination_gate(city_code, contamination)
            if unsafe:
                print(f"\nCOMPLETENESS-CONTAMINATION GATE: temporal-unsafe methods: {unsafe}")
            return 0

        level_dfs = {level: load_methods_level(con, level) for level in LEVELS}
        cross_mode = {
            level: cross_mode_correlation(level_dfs[level], level, RELATIVE_PAIRS)
            for level in LEVELS
        }
        cross_mode_absolute = {
            level: cross_mode_correlation(level_dfs[level], level, ABSOLUTE_CROSS_PAIRS)
            for level in LEVELS
        }
        maup = run_maup_nested_lq(con)
        contamination = run_contamination_gate(con, ALL_METHODS)
        golden = _c1.run_faithful(con)
    finally:
        con.close()

    expected_safe = load_expected_temporal_safe()
    report = render_report(
        cross_mode, cross_mode_absolute, maup, contamination, expected_safe, golden
    )
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
