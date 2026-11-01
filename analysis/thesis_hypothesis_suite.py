"""
analysis/thesis_hypothesis_suite.py
===================================
#354 (Berlin modern era) / #355 (Hamburg): the city- and window-parametrised suite that
re-tests all eight hypotheses of the 2018 thesis (H1, H1a, H1b, H1c, H2, H3a, H3b, H3c).

Binding design: docs/methodology/354-355-hypothesis-suite-preregistration.md (rev. 2 plus
Amendment 1 of 2026-10-31, which overrides §5.1 for the H1/H2 min-base handling), with the
domain review's open notes N1-N8 (docs/methodology/354-355-preregistration-domain-review.md).
Every section reference below ("§x.y") is to that pre-registration unless stated otherwise.
Thesis references are to Helweg (2018), Masterarbeit Univ. Hamburg.

What it does (§5-§7)
--------------------
- One confirmatory family of 8 primaries per panel (§5.1), scored with a cluster bootstrap
  (B = 1999, seed 42, §5.3), Benjamini-Hochberg FDR across the 8 (binding, §5.5) plus a
  reported Holm column, significance-aware verdicts (§5.4), effect-size labels and the
  "Holds?" mapping to the thesis verdicts (§5.6).
- Secondary / sensitivity / exploratory rows (§5.2, A1.1, N6, N7), which never change a
  headline verdict and are uncorrected.
- Leakage guards (§5.8) as runtime assertions, and a deterministic output (§5.7, A1.5): two
  runs on the same warehouse give byte-identical CSVs.

Panels (§0, §3, §4.3, §6.5)
---------------------------
  BER/modern      MSS 2021/2023/2025 on LOR 2021; windows [2019,2021] [2021,2023] [2023,2025]
  BER/thesis-era  "re-analysis of the thesis era with current methods": MSS 2015/2017/2019 on
                  LOR pre-2021, H1 family on the thesis's own status_index x OSM 2017
  HH/full         Sozialmonitoring editions 2016/2019/2022/2025 (3-year Dynamik), pivots
                  2016/2019/2022; phase-shift chains as sensitivities
  HH/modern       pivot 2022 only, its own 8-row family (era-split comparison)

Inputs (phase A, docs/epic-e/354-phase-a-data-prerequisites.md): OA from
`int_poi_oa_native_panel` (zero-filled, min-base flag carried; never E1's
`load_oa_category_panel`, A1.2), commercial C5 shares from `int_poi_c5_share_native`, Berlin
status from the #360 meaning-named `stg_berlin_mss_indicators` columns only (S1 + S3 + S4 /
D1 + D3 + D4; no D5 / displacement_subindex, #362), published classes from `stg_berlin_mss`,
Hamburg classes from `int_hamburg_sozialmonitoring_index`.

Usage:
  uv run python analysis/thesis_hypothesis_suite.py --city BER            # both BER panels
  uv run python analysis/thesis_hypothesis_suite.py --city BER --panel modern
  uv run python analysis/thesis_hypothesis_suite.py --city HH --results-csv <scratch.csv> \\
      --metadata-json <scratch.json> --no-findings                       # #355 smoke run

Outputs (§7): docs/epic-e/thesis-hypothesis-suite-results.csv (one CSV for all panels; a run
replaces only its own panels' rows), docs/epic-e/thesis-hypothesis-suite-metadata.json
(fixed feature lists written before any fit, validity check, coverage, coefficients), and
the generated findings docs/epic-e/E1b-berlin-hypothesis-suite-findings.md (never
hand-edited). The Hamburg findings file is #355's.
"""

from __future__ import annotations

import argparse
import csv
import io
import json
import os
import subprocess
import sys
from collections.abc import Sequence
from dataclasses import dataclass, field
from pathlib import Path

import numpy as np
import pandas as pd
from scipy import stats

# Sibling-module import convention (e1_regressions -> directional_inference).
sys.path.insert(0, str(Path(__file__).parent))
from directional_inference import (  # noqa: E402
    ALPHA,
    CONTRADICTED,
    N_BOOT,
    NO_DATA,
    NOT_SIGNIFICANT,
    SEED,
    SUPPORTED,
    auc_score,
    bh_adjust,
    bootstrap_p,
    build_cross_lagged,
    cluster_bootstrap_ci,
    cluster_bootstrap_stat,
    default_cluster,
    direction_conclusion,
    grouped_oof_auc,
    holm_adjust,
    partial_spearman,
    verdict,
)
from e1_regressions import THESIS_HYPOTHESES  # noqa: E402  (single source, §6.2)

REPO = Path(__file__).resolve().parent.parent
_env_db = os.environ.get("GENTRIDUCK_DB")
DUCKDB_PATH = Path(_env_db) if _env_db else REPO / "data" / "gentriduck.duckdb"
RESULTS_CSV = REPO / "docs" / "epic-e" / "thesis-hypothesis-suite-results.csv"
METADATA_JSON = REPO / "docs" / "epic-e" / "thesis-hypothesis-suite-metadata.json"
FINDINGS_BER = REPO / "docs" / "epic-e" / "E1b-berlin-hypothesis-suite-findings.md"

PRIMARY_ORDER = ("H1", "H1a", "H1b", "H1c", "H2", "H3a", "H3b", "H3c")
# §5.3: fewer than 20 clusters -> NO DATA (Cameron, Gelbach & Miller 2008).
MIN_CLUSTERS = 20
# §5.1: 5-fold GroupKFold by cluster.
N_SPLITS = 5
# A1.1: a category enters the fixed feature list if its min-base flag is unset in >= 20% of
# the design's included rows (set from flags only, never from the outcome).
FEATURE_MIN_UNFLAGGED_SHARE = 0.20
# §5.1 / domain review D2: the four commercial consumption domains (the E1 #168 basket).
COMMERCIAL_DOMAINS = ("Entertainment", "Gastronomy", "Retail", "Services")
# §1.3 / §5.1: H1c uses the thesis's own variable, domain "Sports and Recreation" OA
# (Tabelle 6-14, oa_total_d_sport_und_erholung).
SPORT_DOMAIN = "Sports and Recreation"
CAFE_KEY = "Gastronomy|Cafe"
FASTFOOD_KEY = "Gastronomy|Fast Food"
SPORT_KEY = "Sports and Recreation|Sport"
TABLE_TENNIS_TYPE = "Table Tennis"
KEBAB_TOKENS = ("kebab", "döner", "doner", "dürüm")
# §5.2 R1: thesis PLR OA Spearman rho for H1a/H1b/H1c (Tabellen 6-12 to 6-14).
THESIS_FIDELITY_RHO = {"H1a": -0.02, "H1b": 0.27, "H1c": 0.10}
THESIS_AUC_NOTE = {"H1": "AUC 0.87 (BZR, SimpleLogistic)", "H2": "AUC 0.77 (BZR, RandomForest)"}
CSV_COLUMNS = (
    "city",
    "panel",
    "window",
    "pivots",
    "hypothesis",
    "role",
    "operationalisation",
    "predictor",
    "outcome",
    "controls",
    "grain",
    "cluster_unit",
    "n",
    "n_clusters",
    "estimator",
    "estimate",
    "ci_low",
    "ci_high",
    "p_boot",
    "p_bh",
    "p_holm",
    "p_analytic",
    "expected_dir",
    "verdict",
    "effect_label",
    "thesis_verdict",
    "holds",
    "level_control",
    "d4_control",
    "seed",
    "n_boot",
    "run_sha",
    "notes",
)
PANEL_ORDER = (("BER", "modern"), ("BER", "thesis-era"), ("HH", "full"), ("HH", "modern"))


# ---------------------------------------------------------------------------
# Panel configuration (ADR-0005: city specifics live in config, not in logic)
# ---------------------------------------------------------------------------


@dataclass(frozen=True)
class Panel:
    city: str
    panel: str
    label: str
    vintage: str
    grain: str
    cluster_unit: str
    # Change windows as OSM snapshot years (start, end); the end is the status edition whose
    # Dynamik covers the window (§3.1 Berlin, §4.3 Hamburg).
    windows: tuple[tuple[int, int], ...]
    pivots: tuple[int, ...]
    h1_edition: int
    h1_snapshot: int
    # "composite" (Berlin S, §3.2), "thesis_2018" (thesis status_index, §6.5),
    # "classes" (Hamburg, §4.1).
    h1_status: str
    # Berlin published-class secondary rows may use more windows (thesis era: the 2013
    # edition has class Dynamik only, #338 / §6.4).
    class_windows: tuple[tuple[int, int], ...] = ()
    # §3.4 shock notes per window (Berlin W1 mechanism must be named on pooled rows).
    shock_notes: dict = field(default_factory=dict)
    # §4.3 Hamburg phase-shift chains (sensitivities, outside every family).
    phase_chains: tuple[tuple[tuple[int, int], ...], ...] = ()


W1_NOTE = (
    "includes W1 (Dec 2018-Dec 2020, pandemic): W1 Dynamik can correlate with gastronomy "
    "through hospitality/culture job losses rather than upgrading; W2 contains the "
    "bounce-back (§3.4)"
)

PANELS: dict[tuple[str, str], Panel] = {
    ("BER", "modern"): Panel(
        city="BER",
        panel="modern",
        label="2019-2025 (MSS 2021/2023/2025, LOR 2021)",
        vintage="lor_2021",
        grain="plr_2021",
        cluster_unit="bzr",
        windows=((2019, 2021), (2021, 2023), (2023, 2025)),
        pivots=(2021, 2023),
        h1_edition=2025,
        h1_snapshot=2025,
        h1_status="composite",
        class_windows=((2019, 2021), (2021, 2023), (2023, 2025)),
        shock_notes={(2019, 2021): W1_NOTE},
    ),
    ("BER", "thesis-era"): Panel(
        city="BER",
        panel="thesis-era",
        label="re-analysis of the thesis era with current methods (MSS 2015/2017/2019, LOR pre-2021)",
        vintage="lor_pre2021",
        grain="plr_pre2021",
        cluster_unit="bzr",
        windows=((2013, 2015), (2015, 2017), (2017, 2019)),
        pivots=(2015, 2017),
        h1_edition=2017,
        h1_snapshot=2017,
        h1_status="thesis_2018",
        class_windows=((2011, 2013), (2013, 2015), (2015, 2017), (2017, 2019)),
    ),
    ("HH", "full"): Panel(
        city="HH",
        panel="full",
        label="Hamburg full chain (Sozialmonitoring 2016/2019/2022/2025)",
        vintage="current",
        grain="hh_gebiet",
        cluster_unit="stadtteil",
        windows=((2013, 2016), (2016, 2019), (2019, 2022), (2022, 2025)),
        pivots=(2016, 2019, 2022),
        h1_edition=2025,
        h1_snapshot=2025,
        h1_status="classes",
        phase_chains=(
            ((2011, 2014), (2014, 2017), (2017, 2020), (2020, 2023)),
            ((2012, 2015), (2015, 2018), (2018, 2021), (2021, 2024)),
        ),
    ),
    ("HH", "modern"): Panel(
        city="HH",
        panel="modern",
        label="Hamburg pivot 2022 (era-split comparison)",
        vintage="current",
        grain="hh_gebiet",
        cluster_unit="stadtteil",
        windows=((2019, 2022), (2022, 2025)),
        pivots=(2022,),
        h1_edition=2025,
        h1_snapshot=2025,
        h1_status="classes",
    ),
}

# #360 / §2.1(1) / §3.2: Berlin S and D composites are built ONLY from these meaning-named
# columns (S1 Arbeitslosigkeit, S3 Transferbezug, S4 Kinderarmut and their Dynamik D1/D3/D4).
# S2 is excluded (its meaning changes across editions).
BER_STATUS_LEVEL = ("arbeitslose_anteil", "transferbezug_anteil", "kinderarmut_anteil")
BER_STATUS_CHANGE = ("arbeitslose_dynamik", "transferbezug_dynamik", "kinderarmut_dynamik")
MEANING_NAMED_STATUS_INPUTS = {
    "BER": frozenset(BER_STATUS_LEVEL + BER_STATUS_CHANGE),
    "HH": frozenset({"status_index", "dynamik_index"}),
}
# #360 binding input: change values that cross a definition break are flagged
# (docs/epic-c/360-mss-indicator-mapping-evidence.md §3.3; seed_mss_indicator_vocab).
BER_DEFINITION_BREAKS = {
    2017: "D_2017 window (Dec 2014-Dec 2016) crosses the 2016 SGB II statistics revision "
    "(S3/S4 recalculated, MSS 2023 history table p. 13; D3 r = 0.981, D4 r = 0.917 vs level "
    "difference)",
    2019: "D_2019 window (Dec 2016-Dec 2018) crosses the MSS 2019 S1 redefinition (SGB III "
    "removed; recomputed back to 2016 by the publisher, MSS 2019 p. 16; D1 r = 0.953)",
    2021: "D_2021 window (Dec 2018-Dec 2020) crosses the MSS 2021 Regelaltersgrenze change "
    "in the S1/S3 denominators (Indikatorenblaetter MSS 2021, Vorbemerkungen p. 7)",
}
# §5.8(1): explicit allow-lists. POI-side predictor names start with one of these prefixes;
# status-side names are the suite's own composites/classes; context controls per city.
POI_PREFIXES = (
    "oa_cat:",
    "oa_dom:",
    "base:",
    "per1k:",
    "g_commercial_c5",
    "g_total_c5",
    "g_cafe_c5",
    "d_oa_basket",
    "oa_basket",
    "oa_sport_no_tt",
    "oa_fastfood_no_kebab",
)
STATUS_NAMES = frozenset(
    {
        "S",
        "D",
        "S_start",
        "S_pivot",
        "D_P",
        "D_F",
        "S_cls",
        "D_cls",
        "S_cls_start",
        "S_cls_pivot",
        "D_cls_P",
        "D_cls_F",
        "thesis_status_index",
        "status_class",
        "dynamik_class",
    }
)
CONTEXT_ALLOWED = {"BER": frozenset({"ewr_composite"}), "HH": frozenset({"ewr_composite"})}
# Outcome-index inputs and barred constructs, rejected anywhere among predictors/controls:
# Hamburg unemployment_share is a Sozialmonitoring input (#329, §4.1); D5 /
# displacement_subindex is barred until #362; the raw MSS indicators feed the outcome.
FORBIDDEN = {
    "BER": frozenset(
        {
            "displacement_subindex",
            "d5",
            "rent_pressure_proxy",
            *BER_STATUS_LEVEL,
            *BER_STATUS_CHANGE,
        }
    ),
    "HH": frozenset({"unemployment_share", "displacement_subindex", "d5"}),
}


# ---------------------------------------------------------------------------
# Leakage guards (§5.8, R-C3) -- runtime assertions
# ---------------------------------------------------------------------------


def _is_poi(name: str) -> bool:
    return name.startswith(POI_PREFIXES)


def assert_construct_disjoint(
    city: str,
    predictors: Sequence[str],
    controls: Sequence[str],
    outcome: str,
    poi_only_predictors: bool = False,
) -> None:
    """§5.8(1): allow-listed predictors/controls, no outcome-index input among them."""
    allowed_ctx = CONTEXT_ALLOWED[city]
    for name in [*predictors, *controls]:
        base = name.split("@")[0]
        assert base not in FORBIDDEN[city], f"forbidden construct among predictors/controls: {name}"  # noqa: S101 -- R-C3
        assert _is_poi(base) or base in STATUS_NAMES or base in allowed_ctx, (  # noqa: S101 -- R-C3
            f"{name} is not on the {city} predictor/control allow-list"
        )
    if poi_only_predictors:
        for name in predictors:
            assert _is_poi(name.split("@")[0]), f"non-POI predictor in a POI test: {name}"  # noqa: S101 -- R-C3
    assert outcome.split("@")[0] in STATUS_NAMES, f"outcome {outcome} is not a status variable"  # noqa: S101 -- R-C3
    assert not _is_poi(outcome.split("@")[0]), f"POI field used as outcome: {outcome}"  # noqa: S101 -- R-C3


def assert_status_inputs(city: str, columns: Sequence[str]) -> None:
    """§5.8(1): status variables come only from the #360 meaning-named columns, no POI field."""
    allowed = MEANING_NAMED_STATUS_INPUTS[city]
    for col in columns:
        assert col in allowed, f"status input {col} is not a meaning-named {city} column"  # noqa: S101 -- R-C3
        low = col.lower()
        assert not any(t in low for t in ("poi", "oa_", "c5")), f"POI field in status: {col}"  # noqa: S101 -- R-C3


def assert_temporal_order(
    kind: str,
    pred_start: np.ndarray,
    pred_end: np.ndarray,
    out_start: np.ndarray,
    out_end: np.ndarray,
    control_year: np.ndarray | None = None,
) -> None:
    """§5.8(2): predictor window end <= outcome window start (H2, H3a, H3b); identical windows
    for H3c; the H3b start-of-window control dates from <= the predictor window start."""
    ps, pe, os_, oe = (
        np.asarray(a, dtype=float) for a in (pred_start, pred_end, out_start, out_end)
    )
    if kind in ("H2", "H3a", "H3b"):
        assert np.all(pe <= os_), f"{kind}: predictor window ends after the outcome window starts"  # noqa: S101 -- R-C3
    elif kind == "H3c":
        assert np.all((ps == os_) & (pe == oe)), "H3c: predictor and outcome windows differ"  # noqa: S101 -- R-C3
    if kind == "H3b" and control_year is not None:
        cy = np.asarray(control_year, dtype=float)
        assert np.all(cy <= ps), (  # noqa: S101 -- R-C3
            "H3b: start-of-window control dates after the predictor window start"
        )


def assert_single_vintage(panel_vintage: str, *vintages: np.ndarray) -> None:
    """§5.8(5): no delta crosses the LOR boundary; the vintage is asserted per row."""
    for v in vintages:
        vals = set(pd.Series(np.asarray(v)).dropna().astype(str).tolist())
        assert vals <= {panel_vintage}, (  # noqa: S101 -- R-C3
            f"rows from vintage(s) {sorted(vals)} in a {panel_vintage} panel"
        )
        assert not pd.isna(np.asarray(v, dtype=object)).any(), "row without an area vintage"  # noqa: S101 -- R-C3


# ---------------------------------------------------------------------------
# Small statistics helpers
# ---------------------------------------------------------------------------


def dhs_growth(a: np.ndarray, b: np.ndarray) -> np.ndarray:
    """Davis-Haltiwanger-Schuh (1996) symmetric growth g(a, b) = (b - a) / ((a + b) / 2).

    Bounded in [-2, 2] and defined when one endpoint is zero (§5.1). Undefined (NaN) only
    when both endpoints are zero or missing.
    """
    a = np.asarray(a, dtype=float)
    b = np.asarray(b, dtype=float)
    denom = (a + b) / 2.0
    with np.errstate(divide="ignore", invalid="ignore"):
        out = np.where(denom > 0, (b - a) / denom, np.nan)
    return out


def zscore(s: pd.Series) -> pd.Series:
    """Within-edition z-score (population SD; §3.2). The SD convention cancels in ranks."""
    sd = s.std(ddof=0)
    if not np.isfinite(sd) or sd == 0:
        return s * np.nan
    return (s - s.mean()) / sd


def effect_label(estimator: str, estimate: float | None) -> str:
    """§5.4: Cohen (1988) for rho; Hosmer, Lemeshow & Sturdivant (2013) for AUC."""
    if estimate is None or not np.isfinite(estimate):
        return ""
    if estimator == "oof_auc_logit":
        if estimate < 0.60:
            return "negligible"
        if estimate < 0.70:
            return "poor"
        if estimate < 0.80:
            return "acceptable"
        return "excellent"
    if estimator in ("spearman", "partial_spearman"):
        a = abs(estimate)
        if a < 0.10:
            return "negligible"
        if a < 0.30:
            return "small"
        if a < 0.50:
            return "moderate"
        return "large"
    return ""


def _finite_rows(*arrays: np.ndarray) -> np.ndarray:
    mask = np.ones(len(arrays[0]), dtype=bool)
    for a in arrays:
        mask &= np.isfinite(np.asarray(a, dtype=float))
    return mask


def rho_test(
    x: np.ndarray,
    y: np.ndarray,
    controls: Sequence[np.ndarray],
    clusters: np.ndarray,
    n_boot: int,
) -> dict:
    """(Partial) Spearman with a percentile cluster-bootstrap CI and bootstrap p (§5.3)."""
    x = np.asarray(x, dtype=float)
    y = np.asarray(y, dtype=float)
    ctrl = [np.asarray(c, dtype=float) for c in controls]
    clusters = np.asarray(clusters, dtype=object)
    mask = _finite_rows(x, y, *ctrl) & pd.notna(clusters)
    x, y, clusters = x[mask], y[mask], clusters[mask]
    ctrl = [c[mask] for c in ctrl]
    est = partial_spearman(x, y, ctrl)
    lo, hi, g, draws = cluster_bootstrap_ci(
        x, y, ctrl, clusters, n_boot, SEED, ALPHA, min_clusters=MIN_CLUSTERS, return_draws=True
    )
    return {
        "estimate": est["rho"],
        "n": int(mask.sum()),
        "n_clusters": int(len(pd.unique(clusters))),
        "ci_low": lo,
        "ci_high": hi,
        "p_boot": bootstrap_p(draws, 0.0, n_boot) if lo is not None else None,
        "p_analytic": est["p"],
    }


def auc_test(
    x: np.ndarray, y: np.ndarray, groups: np.ndarray, n_boot: int, n_splits: int = N_SPLITS
) -> dict:
    """Grouped-CV out-of-fold AUC of the fixed logit, cluster-bootstrapped over the
    (prediction, label, cluster) triples (§5.1, §5.3)."""
    y = np.asarray(y).astype(int)
    groups = np.asarray(groups, dtype=object)
    res = grouped_oof_auc(x, y, groups, n_splits=n_splits)
    base = {
        "n": int(len(y)),
        "n_clusters": int(len(pd.unique(groups))),
        "n_pos": int(y.sum()),
        "oof": res["oof"],
        "coefs": res["coefs"],
    }
    if res["auc"] is None:
        return {
            **base,
            "estimate": None,
            "ci_low": None,
            "ci_high": None,
            "p_boot": None,
            "p_analytic": None,
        }
    oof = res["oof"]

    def _stat(idx: np.ndarray) -> float | None:
        return auc_score(y[idx], oof[idx])

    lo, hi, _g, draws = cluster_bootstrap_stat(_stat, groups, n_boot, SEED, ALPHA, MIN_CLUSTERS)
    p_mw = stats.mannwhitneyu(oof[y == 1], oof[y == 0], alternative="two-sided").pvalue
    return {
        **base,
        "estimate": res["auc"],
        "ci_low": lo,
        "ci_high": hi,
        "p_boot": bootstrap_p(draws, 0.5, n_boot) if lo is not None else None,
        "p_analytic": float(p_mw),
    }


def delta_auc_test(
    x_base: np.ndarray, x_full: np.ndarray, y: np.ndarray, groups: np.ndarray, n_boot: int
) -> dict:
    """§5.2 H2 incremental: AUC(status level + OA) - AUC(status level), same folds."""
    y = np.asarray(y).astype(int)
    groups = np.asarray(groups, dtype=object)
    rb = grouped_oof_auc(x_base, y, groups, n_splits=N_SPLITS)
    rf = grouped_oof_auc(x_full, y, groups, n_splits=N_SPLITS)
    out = {"n": int(len(y)), "n_clusters": int(len(pd.unique(groups))), "p_analytic": None}
    if rb["auc"] is None or rf["auc"] is None:
        return {**out, "estimate": None, "ci_low": None, "ci_high": None, "p_boot": None}
    ob, of = rb["oof"], rf["oof"]

    def _stat(idx: np.ndarray) -> float | None:
        a, b = auc_score(y[idx], of[idx]), auc_score(y[idx], ob[idx])
        return None if a is None or b is None else a - b

    lo, hi, _g, draws = cluster_bootstrap_stat(_stat, groups, n_boot, SEED, ALPHA, MIN_CLUSTERS)
    return {
        **out,
        "estimate": rf["auc"] - rb["auc"],
        "auc_base": rb["auc"],
        "auc_full": rf["auc"],
        "ci_low": lo,
        "ci_high": hi,
        "p_boot": bootstrap_p(draws, 0.0, n_boot) if lo is not None else None,
    }


def pivot_diff_test(
    x: np.ndarray,
    y: np.ndarray,
    controls: Sequence[np.ndarray],
    pivots: np.ndarray,
    clusters: np.ndarray,
    first: int,
    last: int,
    n_boot: int,
) -> dict:
    """§3.4: rho(pivot `last`) - rho(pivot `first`) with a joint cluster-bootstrap CI."""
    x = np.asarray(x, dtype=float)
    y = np.asarray(y, dtype=float)
    ctrl = [np.asarray(c, dtype=float) for c in controls]
    pv = np.asarray(pivots)
    clusters = np.asarray(clusters, dtype=object)
    mask = _finite_rows(x, y, *ctrl) & pd.notna(clusters) & np.isin(pv, [first, last])
    x, y, pv, clusters = x[mask], y[mask], pv[mask], clusters[mask]
    ctrl = [c[mask] for c in ctrl]

    def _rho_at(idx: np.ndarray, p: int) -> float | None:
        sel = idx[pv[idx] == p]
        return partial_spearman(x[sel], y[sel], [c[sel] for c in ctrl])["rho"]

    def _diff(idx: np.ndarray) -> float | None:
        a, b = _rho_at(idx, last), _rho_at(idx, first)
        return None if a is None or b is None else a - b

    all_idx = np.arange(len(x))
    est = _diff(all_idx)
    lo, hi, g, draws = cluster_bootstrap_stat(_diff, clusters, n_boot, SEED, ALPHA, MIN_CLUSTERS)
    return {
        "estimate": est,
        "n": int(len(x)),
        "n_clusters": int(g),
        "ci_low": lo,
        "ci_high": hi,
        "p_boot": bootstrap_p(draws, 0.0, n_boot) if lo is not None else None,
        "p_analytic": None,
    }


# ---------------------------------------------------------------------------
# Data loading (every load ends in ORDER BY, §5.7)
# ---------------------------------------------------------------------------


@dataclass
class PanelData:
    panel: Panel
    status: pd.DataFrame  # area_code, edition, S, D, S_start_rebuilt, S_cls, D_cls
    h1_status: pd.DataFrame  # area_code, status, S_cls
    oa: pd.DataFrame
    c5: pd.DataFrame
    types: pd.DataFrame
    pop: pd.DataFrame  # area_code, year, residents
    d4: pd.DataFrame  # area_code, year, ewr_composite
    clusters: pd.DataFrame  # area_code, cluster
    source_attrs: dict
    bzr_status: pd.DataFrame | None = None
    _wide_cache: dict = field(default_factory=dict)

    def cluster_of(self, codes: pd.Series) -> pd.Series:
        m = dict(zip(self.clusters["area_code"], self.clusters["cluster"], strict=True))
        return codes.map(m)


def _years_needed(panel: Panel) -> list[int]:
    ys = {panel.h1_snapshot}
    for chain in (panel.windows, panel.class_windows, *panel.phase_chains):
        for s, e in chain:
            ys.update((s, e))
    return sorted(ys)


def _load_oa_c5(
    con, city: str, vintage: str, years: list[int]
) -> tuple[pd.DataFrame, pd.DataFrame]:
    ylist = ", ".join(str(y) for y in years)
    # A1.2: the suite reads int_poi_oa_native_panel (zero-filled, min-base flag carried) for
    # every OA feature; `standard` hard-assignment variant for all rows (A1.3), faithful Run 1
    # (ADR-0017 D4).
    oa = con.execute(
        f"""
        SELECT area_code, snapshot_year, area_vintage, oa_level, poi_domain_h,
               COALESCE(poi_category_h, '') AS poi_category_h, oa_value, oa_min_base_flag,
               level_stock_local, parent_stock_local, level_stock_city, parent_stock_city
        FROM main.int_poi_oa_native_panel
        WHERE city_code = ? AND area_vintage = ? AND weight_variant = 'standard'
          AND methodology_variant = 'faithful' AND snapshot_year IN ({ylist})
        ORDER BY area_code, snapshot_year, oa_level, poi_domain_h, poi_category_h
        """,
        [city, vintage],
    ).df()
    # §5.1: commercial share c_E (C5 share within the four commercial domains) and the
    # total share (secondary), from the dense phase-A model.
    c5 = con.execute(
        f"""
        SELECT area_code, snapshot_year, area_vintage, commercial_c5_share, total_c5_share
        FROM main.int_poi_c5_share_native
        WHERE city_code = ? AND area_vintage = ? AND snapshot_year IN ({ylist})
        ORDER BY area_code, snapshot_year
        """,
        [city, vintage],
    ).df()
    return oa, c5


def _load_types(con, city: str, vintage: str, years: list[int]) -> pd.DataFrame:
    ylist = ", ".join(str(y) for y in years)
    return con.execute(
        f"""
        SELECT area_code, snapshot_year, area_vintage, poi_domain_h, poi_category_h,
               poi_type_h, SUM(poi_count) AS poi_count
        FROM main.int_poi_development_native
        WHERE city_code = ? AND area_vintage = ? AND snapshot_year IN ({ylist})
          AND (poi_domain_h = ? OR poi_category_h = 'Fast Food')
        GROUP BY ALL
        ORDER BY area_code, snapshot_year, poi_domain_h, poi_category_h, poi_type_h
        """,
        [city, vintage, SPORT_DOMAIN],
    ).df()


def load_berlin(con, panel: Panel) -> PanelData:
    years = _years_needed(panel)
    names = BER_STATUS_LEVEL + BER_STATUS_CHANGE
    assert_status_inputs("BER", names)
    in_list = ", ".join(f"'{n}'" for n in names)
    ind = con.execute(
        f"""
        SELECT area_code, edition, indicator, raw_attr, indicator_value
        FROM main.stg_berlin_mss_indicators
        WHERE area_vintage = ? AND indicator IN ({in_list})
        ORDER BY area_code, edition, indicator
        """,
        [panel.vintage],
    ).df()
    source_attrs = {
        f"{int(r.edition)}:{r.indicator}": r.raw_attr
        for r in ind[["edition", "indicator", "raw_attr"]].drop_duplicates().itertuples()
    }
    wide = ind.pivot_table(
        index=["area_code", "edition"],
        columns="indicator",
        values="indicator_value",
        aggfunc="first",
    ).reset_index()
    for n in names:
        if n not in wide:
            wide[n] = np.nan
    wide = wide.sort_values(["area_code", "edition"]).reset_index(drop=True)
    # §3.2: S_E = mean of within-edition z-scores of S1, S3, S4; D_E = same for D1, D3, D4.
    # Window-start level S_(E-2) is rebuilt as anteil_E - dynamik_E per indicator (§3.1),
    # then z-scored within edition E. Higher = worse status / worsening (index-def. §5).
    parts_s, parts_d, parts_b = [], [], []
    for lvl, chg in zip(BER_STATUS_LEVEL, BER_STATUS_CHANGE, strict=True):
        wide[f"z_{lvl}"] = wide.groupby("edition")[lvl].transform(zscore)
        wide[f"z_{chg}"] = wide.groupby("edition")[chg].transform(zscore)
        wide[f"start_{lvl}"] = wide[lvl] - wide[chg]
        wide[f"z_start_{lvl}"] = wide.groupby("edition")[f"start_{lvl}"].transform(zscore)
        parts_s.append(f"z_{lvl}")
        parts_d.append(f"z_{chg}")
        parts_b.append(f"z_start_{lvl}")
    # mean over the three; NaN if any input is missing (all three are populated 2015-2025).
    wide["S"] = wide[parts_s].mean(axis=1, skipna=False)
    wide["D"] = wide[parts_d].mean(axis=1, skipna=False)
    wide["S_start_rebuilt"] = wide[parts_b].mean(axis=1, skipna=False)
    cls = con.execute(
        """
        SELECT area_code, edition, status_index AS S_cls, dynamik_index AS D_cls
        FROM main.stg_berlin_mss
        WHERE area_vintage = ? AND status_index IS NOT NULL
        ORDER BY area_code, edition
        """,
        [panel.vintage],
    ).df()
    status = cls.merge(
        wide[["area_code", "edition", "S", "D", "S_start_rebuilt"]],
        on=["area_code", "edition"],
        how="outer",
    ).sort_values(["area_code", "edition"])
    status = status.reset_index(drop=True)

    if panel.h1_status == "thesis_2018":
        # §6.5: the thesis's own continuous status_index (MSS Dec 2016; higher = worse,
        # §1.3), at PLR grain, joined on the zero-padded raum_id (E1 #200 fix).
        h1 = con.execute(
            """
            SELECT LPAD(raum_id, 8, '0') AS area_code, status_index AS status
            FROM main.stg_thesis_2018_result_plr
            WHERE area_level = 'plr' AND status_index IS NOT NULL
            ORDER BY area_code
            """
        ).df()
        bzr = con.execute(
            """
            SELECT raum_id AS bzr_code, status_index AS status
            FROM main.stg_thesis_2018_result_bzr
            WHERE status_index IS NOT NULL
            ORDER BY bzr_code
            """
        ).df()
    else:
        h1 = status.loc[status["edition"] == panel.h1_edition, ["area_code", "S"]]
        h1 = h1.rename(columns={"S": "status"}).dropna()
        bzr = None
    h1 = h1.merge(
        status.loc[status["edition"] == panel.h1_edition, ["area_code", "S_cls"]],
        on="area_code",
        how="left",
    ).sort_values("area_code")

    ewr = "int_ewr_socioeco" if panel.vintage == "lor_2021" else "int_ewr_socioeco_pre2021"
    ewr_df = con.execute(
        f"""
        SELECT area_code, reference_year AS year, residents_total AS residents, ewr_composite
        FROM main.{ewr}
        WHERE area_vintage = ?
        ORDER BY area_code, year
        """,
        [panel.vintage],
    ).df()
    oa, c5 = _load_oa_c5(con, "BER", panel.vintage, years)
    types = _load_types(con, "BER", panel.vintage, years)
    codes = sorted(set(oa["area_code"]) | set(status["area_code"]))
    clusters = pd.DataFrame({"area_code": codes})
    # §5.3: cluster = Bezirksregion (first 6 digits of the 8-digit PLR code).
    clusters["cluster"] = clusters["area_code"].map(default_cluster)
    return PanelData(
        panel=panel,
        status=status,
        h1_status=h1.reset_index(drop=True),
        oa=oa,
        c5=c5,
        types=types,
        pop=ewr_df[["area_code", "year", "residents"]],
        d4=ewr_df[["area_code", "year", "ewr_composite"]],
        clusters=clusters,
        source_attrs=source_attrs,
        bzr_status=bzr,
    )


def load_hamburg(con, panel: Panel) -> PanelData:
    years = _years_needed(panel)
    assert_status_inputs("HH", ["status_index", "dynamik_index"])
    # §4.1: Sozialmonitoring classes only. Status 1 = hoch ... 4 = sehr niedrig, Dynamik
    # 1 = positiv / 2 = stabil / 3 = negativ (phase A §4 reconciliation; higher = worse).
    soz = con.execute(
        """
        SELECT area_code, edition, status_index AS S_cls, dynamik_index AS D_cls,
               population, stadtteil_name
        FROM main.int_hamburg_sozialmonitoring_index
        WHERE status_index IS NOT NULL
        ORDER BY area_code, edition
        """
    ).df()
    status = soz[["area_code", "edition", "S_cls", "D_cls"]].copy()
    status["S"] = status["S_cls"].astype(float)
    status["D"] = status["D_cls"].astype(float)
    status["S_start_rebuilt"] = np.nan
    h1 = status.loc[status["edition"] == panel.h1_edition, ["area_code", "S", "S_cls"]]
    h1 = h1.rename(columns={"S": "status"}).sort_values("area_code")
    pop = soz.rename(columns={"edition": "year", "population": "residents"})[
        ["area_code", "year", "residents"]
    ]
    # §4.1 / #329: unemployment_share is never selected; D4 = the #329 composite.
    ewr = con.execute(
        """
        SELECT area_code, reference_year AS year, ewr_composite
        FROM main.int_ewr_socioeco_hamburg
        ORDER BY area_code, year
        """
    ).df()
    assert "unemployment_share" not in ewr.columns  # noqa: S101 -- R-C3 §5.8(1)
    oa, c5 = _load_oa_c5(con, "HH", panel.vintage, years)
    types = _load_types(con, "HH", panel.vintage, years)
    # §4.2: cluster = Stadtteil (99); membership from the latest edition per Gebiet.
    cl = (
        soz.dropna(subset=["stadtteil_name"])
        .sort_values(["area_code", "edition"], ascending=[True, False])
        .drop_duplicates("area_code")[["area_code", "stadtteil_name"]]
        .rename(columns={"stadtteil_name": "cluster"})
    )
    codes = pd.DataFrame({"area_code": sorted(set(oa["area_code"]) | set(status["area_code"]))})
    clusters = codes.merge(cl, on="area_code", how="left")
    return PanelData(
        panel=panel,
        status=status.reset_index(drop=True),
        h1_status=h1.reset_index(drop=True),
        oa=oa,
        c5=c5,
        types=types,
        pop=pop,
        d4=ewr,
        clusters=clusters,
        source_attrs={"status": "WFS de.hh.up:sozialmonitoring statusindex / dynamikindex"},
    )


# ---------------------------------------------------------------------------
# Frame builders
# ---------------------------------------------------------------------------


def oa_wide(pdata: PanelData, year: int) -> pd.DataFrame:
    """One row per area for one snapshot: category/domain OA, flags, stocks, vintage."""
    if year in pdata._wide_cache:
        return pdata._wide_cache[year]
    sub = pdata.oa[pdata.oa["snapshot_year"] == year]
    if sub.empty:
        out = pd.DataFrame(index=pd.Index([], name="area_code"))
        pdata._wide_cache[year] = out
        return out
    vint = sub.groupby("area_code")["area_vintage"].agg(lambda s: ";".join(sorted(set(s))))
    dom = sub[sub["oa_level"] == "domain"]
    cat = sub[sub["oa_level"] == "category"].copy()
    cat["key"] = cat["poi_domain_h"] + "|" + cat["poi_category_h"]
    blocks = [vint.rename("vintage")]
    for frame, keycol, tag in ((dom, "poi_domain_h", "dom"), (cat, "key", "cat")):
        for col, prefix in (
            ("oa_value", f"oa_{tag}:"),
            ("oa_min_base_flag", f"flag_{tag}:"),
            ("level_stock_local", f"stock_{tag}:"),
            ("level_stock_city", f"city_{tag}:"),
        ):
            p = frame.pivot(index="area_code", columns=keycol, values=col)
            p.columns = [f"{prefix}{c}" for c in p.columns]
            blocks.append(p)
    allbase = dom.groupby("area_code")["parent_stock_local"].first().rename("stock_all")
    blocks.append(allbase)
    out = pd.concat(blocks, axis=1).sort_index()
    out.index.name = "area_code"
    pdata._wide_cache[year] = out
    return out


def _as_flag(s: pd.Series) -> pd.Series:
    """Min-base flag as bool; a missing flag (entry absent that year) counts as flagged."""
    return s.map(lambda v: True if pd.isna(v) else bool(v)).astype(bool)


def oa_features(wide: pd.DataFrame, keys: Sequence[str], tag: str) -> pd.DataFrame:
    """OA values with flagged cells set to missing (A1.1 cell-level missingness). A key
    absent city-wide that year counts as flagged."""
    vals = wide.reindex(columns=[f"oa_{tag}:{k}" for k in keys])
    flags = wide.reindex(columns=[f"flag_{tag}:{k}" for k in keys]).apply(_as_flag)
    return vals.where(~flags.to_numpy(dtype=bool))


def fixed_feature_list(
    frame: pd.DataFrame, tag: str, domains: Sequence[str] | None = None
) -> list[str]:
    """A1.1: keys whose flag is unset (and value present) in >= 20% of the design rows,
    sorted lexicographically. Depends on flags only, never on the outcome."""
    prefix = f"oa_{tag}:"
    keys = sorted(c[len(prefix) :] for c in frame.columns if c.startswith(prefix))
    if domains is not None:
        keys = [k for k in keys if k.split("|")[0] in domains]
    out = []
    for k in keys:
        ok = frame[f"oa_{tag}:{k}"].notna() & ~_as_flag(frame[f"flag_{tag}:{k}"])
        if len(frame) and ok.mean() >= FEATURE_MIN_UNFLAGGED_SHARE:
            out.append(k)
    return out


def _attach_cluster_vintage(pdata: PanelData, df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()
    df["cluster"] = pdata.cluster_of(df["area_code"])
    return df


def h1_frame(pdata: PanelData, snapshot: int | None = None) -> pd.DataFrame:
    """H1 family cross-section: status at the H1 edition x OA at the H1 snapshot. The inner
    join to the OA panel is the §5.1 D3 guard (areas with >= 1 POI in the slice)."""
    p = pdata.panel
    wide = oa_wide(pdata, snapshot or p.h1_snapshot)
    df = pdata.h1_status.merge(wide, left_on="area_code", right_index=True, how="inner")
    df = df.dropna(subset=["status"]).sort_values("area_code").reset_index(drop=True)
    return _attach_cluster_vintage(pdata, df)


def _status_at(pdata: PanelData, edition: int) -> pd.DataFrame:
    return pdata.status[pdata.status["edition"] == edition].set_index("area_code")


def _status_start(pdata: PanelData, s: int, e: int) -> tuple[pd.Series, pd.Series]:
    """Status level at the start of window (s, e): Berlin rebuilt S_(e-2) (§3.1); Hamburg
    class at edition s = e-3 (§4.3). Also the published class at s (secondary)."""
    end = _status_at(pdata, e)
    start = _status_at(pdata, s)
    cls_start = start["S_cls"].astype(float) if not start.empty else pd.Series(dtype=float)
    if pdata.panel.city == "BER":
        lvl = end["S_start_rebuilt"]
    else:
        lvl = start["S"] if not start.empty else pd.Series(dtype=float)
    return lvl, cls_start


def h2_frame(pdata: PanelData, windows: Sequence[tuple[int, int]]) -> pd.DataFrame:
    """H2 pooled area-windows: OA at the window start (prevOSM_stock) -> Dynamik over the
    window (Tabelle 6-16 H2; §5.1)."""
    rows = []
    for s, e in windows:
        end = _status_at(pdata, e)
        if end.empty:
            continue
        lvl, cls_start = _status_start(pdata, s, e)
        st = pd.DataFrame(
            {
                "D": end["D"],
                "D_cls": end["D_cls"].astype(float),
                "S_start": lvl.reindex(end.index),
                "S_cls_start": cls_start.reindex(end.index),
            }
        )
        wide = oa_wide(pdata, s)
        df = st.join(wide, how="inner").reset_index().rename(columns={"index": "area_code"})
        df["w_start"], df["w_end"] = s, e
        df["pred_start"], df["pred_end"], df["out_start"], df["out_end"] = s, s, s, e
        rows.append(df)
    if not rows:
        return pd.DataFrame()
    out = pd.concat(rows, ignore_index=True)
    out = out.sort_values(["area_code", "w_end"]).reset_index(drop=True)
    return _attach_cluster_vintage(pdata, out)


def _basket(wide: pd.DataFrame) -> pd.Series:
    """E1 #168 OA basket: mean domain OA of the four commercial domains (flagged -> NaN)."""
    feats = oa_features(wide, COMMERCIAL_DOMAINS, "dom")
    return feats.mean(axis=1, skipna=False)


def window_rows(pdata: PanelData, windows: Sequence[tuple[int, int]]) -> pd.DataFrame:
    """One row per (area, window) with status change, commercial change and levels."""
    c5 = pdata.c5.set_index(["area_code", "snapshot_year"])
    rows = []
    for s, e in windows:
        end = _status_at(pdata, e)
        if end.empty:
            continue
        lvl, cls_start = _status_start(pdata, s, e)
        df = pd.DataFrame(index=end.index)
        df["D"] = end["D"]
        df["D_cls"] = end["D_cls"].astype(float)
        df["S_end"] = end["S"]
        df["S_cls_end"] = end["S_cls"].astype(float)
        df["S_start"] = lvl.reindex(df.index)
        df["S_cls_start"] = cls_start.reindex(df.index)
        cs = c5.xs(s, level="snapshot_year") if s in c5.index.get_level_values(1) else None
        ce = c5.xs(e, level="snapshot_year") if e in c5.index.get_level_values(1) else None
        if cs is None or ce is None:
            continue
        cs, ce = cs.reindex(df.index), ce.reindex(df.index)
        # §5.1: DHS growth of the commercial C5 share; total share secondary (§5.2).
        df["g_commercial_c5"] = dhs_growth(cs["commercial_c5_share"], ce["commercial_c5_share"])
        df["g_total_c5"] = dhs_growth(cs["total_c5_share"], ce["total_c5_share"])
        df["vintage_s"], df["vintage_e"] = cs["area_vintage"], ce["area_vintage"]
        ws, we = oa_wide(pdata, s), oa_wide(pdata, e)
        # §5.2 R4: café C5 share = area café count / city café count (same C5 construct).
        cafe_s = ws.get(f"stock_cat:{CAFE_KEY}") / ws.get(f"city_cat:{CAFE_KEY}")
        cafe_e = we.get(f"stock_cat:{CAFE_KEY}") / we.get(f"city_cat:{CAFE_KEY}")
        df["g_cafe_c5"] = dhs_growth(cafe_s.reindex(df.index), cafe_e.reindex(df.index))
        df["d_oa_basket"] = _basket(we).reindex(df.index) - _basket(ws).reindex(df.index)
        # §3.5 / §4.3: D4 (EWR composite) at year e - 1 for the pivot e.
        d4 = pdata.d4[pdata.d4["year"] == e - 1].set_index("area_code")["ewr_composite"]
        df["d4_end"] = d4.reindex(df.index)
        df["w_start"], df["w_end"] = s, e
        df["lag_k"] = 1
        df = df.reset_index().rename(columns={"index": "area_code"})
        rows.append(df)
    if not rows:
        return pd.DataFrame()
    out = pd.concat(rows, ignore_index=True)
    out = out[out["area_code"].isin(pdata.oa["area_code"].unique())]  # D3 guard (§5.1)
    out = out.sort_values(["area_code", "w_end"]).reset_index(drop=True)
    out = _attach_cluster_vintage(pdata, out)
    return out


def cross_lag_frame(
    rows: pd.DataFrame, status_col: str, poi_col: str, s_pivot_col: str, s_start_col: str
) -> pd.DataFrame:
    """build_cross_lagged (directional_inference, extended §6.1) on window rows."""
    if rows.empty:
        return pd.DataFrame()
    cl = build_cross_lagged(
        rows,
        k=1,
        time_cols=("w_start", "w_end"),
        delta_cols=(status_col, poi_col),
        level_cols={
            "S_pivot": (s_pivot_col, "p"),
            "S_start": (s_start_col, "p"),
            "d4": ("d4_end", "p"),
            "p_end": ("w_end", "p"),
            "f_start": ("w_start", "f"),
        },
        cluster_col="cluster",
    )
    if cl.empty:
        return cl
    vint = rows.set_index(["area_code", "w_end"])
    vp = vint["vintage_s"]
    cl["vintage_p_s"] = [
        vp.get((a, p), None) for a, p in zip(cl["area_code"], cl["pivot"], strict=True)
    ]
    ve = rows.set_index(["area_code", "w_start"])["vintage_e"]
    cl["vintage_f_e"] = [
        ve.get((a, p), None) for a, p in zip(cl["area_code"], cl["pivot"], strict=True)
    ]
    return cl.sort_values(["area_code", "pivot"]).reset_index(drop=True)


# ---------------------------------------------------------------------------
# Suite run for one panel
# ---------------------------------------------------------------------------


def _fmt_status_desc(pdata: PanelData, edition: int, kind: str) -> str:
    """Column-level outcome description incl. the #360 source WFS attribute (§7.1)."""
    p = pdata.panel
    if p.city == "HH":
        return (
            f"Sozialmonitoring {'Statusindex' if kind == 'S' else 'Dynamikindex'} class {edition}"
        )
    names = BER_STATUS_LEVEL if kind in ("S", "S_start") else BER_STATUS_CHANGE
    src_ed = edition
    attrs = [pdata.source_attrs.get(f"{src_ed}:{n}", "?") for n in names]
    parts = ", ".join(f"{n}[{a}]" for n, a in zip(names, attrs, strict=True))
    if kind == "S_start":
        return f"S_{edition - 2} rebuilt = mean z(anteil_{edition} - dynamik_{edition}) of {parts}"
    return f"{kind}_{edition} = mean z({parts})"


class SuiteRun:
    def __init__(self, pdata: PanelData, n_boot: int, run_sha: str):
        self.d = pdata
        self.p = pdata.panel
        self.n_boot = n_boot
        self.run_sha = run_sha
        self.rows: list[dict] = []
        self.meta: dict = {
            "city": self.p.city,
            "panel": self.p.panel,
            "label": self.p.label,
            "feature_lists": {},
            "coefficients": {},
            "coverage": {},
            "pivot_diff": {},
            "validity": [],
            "definition_breaks": {},
            "notes": [],
        }

    # -- row bookkeeping -----------------------------------------------------

    def add(
        self,
        hyp: str,
        role: str,
        op: str,
        predictor: str,
        outcome: str,
        controls: str,
        estimator: str,
        res: dict,
        expected_dir: str,
        window: str,
        pivots: str = "",
        level_control: str = "none",
        d4: bool = False,
        notes: Sequence[str] = (),
        descriptive: bool = False,
    ) -> dict:
        row = {
            "city": self.p.city,
            "panel": self.p.panel,
            "window": window,
            "pivots": pivots,
            "hypothesis": hyp,
            "role": role,
            "operationalisation": op,
            "predictor": predictor,
            "outcome": outcome,
            "controls": controls,
            "grain": self.p.grain,
            "cluster_unit": self.p.cluster_unit,
            "n": res.get("n"),
            "n_clusters": res.get("n_clusters"),
            "estimator": estimator,
            "estimate": res.get("estimate"),
            "ci_low": res.get("ci_low"),
            "ci_high": res.get("ci_high"),
            "p_boot": res.get("p_boot"),
            "p_bh": None,
            "p_holm": None,
            "p_analytic": res.get("p_analytic"),
            "expected_dir": expected_dir,
            "verdict": "",
            "effect_label": effect_label(estimator, res.get("estimate")),
            "thesis_verdict": THESIS_HYPOTHESES[hyp]["thesis_verdict"],
            "holds": "",
            "level_control": level_control,
            "d4_control": bool(d4),
            "seed": SEED,
            "n_boot": self.n_boot,
            "run_sha": self.run_sha,
            "notes": list(notes),
            "_descriptive": descriptive,
        }
        self.rows.append(row)
        return row

    def guard(self, predictors, controls, outcome, poi_only=False):
        assert_construct_disjoint(self.p.city, predictors, controls, outcome, poi_only)

    def win_label(self, windows) -> str:
        return f"{windows[0][0]}-{windows[-1][1]}"

    def shock_notes(self, windows) -> list[str]:
        return [self.p.shock_notes[w] for w in windows if w in self.p.shock_notes]

    def break_notes(self, editions) -> list[str]:
        if self.p.city != "BER":
            return []
        out = []
        for e in sorted(set(editions)):
            if e in BER_DEFINITION_BREAKS:
                self.meta["definition_breaks"][str(e)] = BER_DEFINITION_BREAKS[e]
                out.append(f"definition break: {BER_DEFINITION_BREAKS[e]}")
        return out

    # -- H1 family -----------------------------------------------------------

    def _binary_status(self, s: pd.Series) -> pd.Series:
        # §1.2: the thesis split the continuous MSS index at 0 (status_klasse_prj_bi); for
        # Hamburg classes, status {3, 4} vs {1, 2} (§4.4).
        if self.p.h1_status == "classes":
            return (s >= 3).astype(int)
        return (s > 0).astype(int)

    def _auc_row(
        self,
        hyp,
        role,
        op,
        frame,
        x: pd.DataFrame,
        y: pd.Series,
        outcome,
        window,
        notes=(),
        key=None,
        extra_ctrl_names=(),
        descriptive=False,
        groups=None,
        outcome_name=None,
    ):
        names = list(x.columns)
        self.guard(
            names, list(extra_ctrl_names), outcome_name or outcome, poi_only=not extra_ctrl_names
        )
        grp = frame["cluster"] if groups is None else groups
        if not names:
            return self.add(
                hyp,
                role,
                op,
                "none",
                outcome,
                "",
                "oof_auc_logit",
                {"n": int(len(y)), "n_clusters": int(grp.nunique())},
                "nondirectional",
                window,
                notes=[*notes, "no feature passes the A1.1 >= 20% unflagged rule"],
                descriptive=descriptive,
            )
        res = auc_test(x.to_numpy(float), y.to_numpy(int), grp.to_numpy(object), self.n_boot)
        if key and res.get("coefs") is not None:
            mean_coef = res["coefs"].mean(axis=0)
            order = sorted(range(len(names)), key=lambda i: (-abs(mean_coef[i]), names[i]))[:10]
            self.meta["coefficients"][key] = [
                [names[i], round(float(mean_coef[i]), 4)] for i in order
            ]
        pred_desc = f"{len(names)} features ({names[0].split(':')[0]}...)" if names else "none"
        return self.add(
            hyp,
            role,
            op,
            pred_desc,
            outcome,
            ";".join(extra_ctrl_names),
            "oof_auc_logit",
            res,
            "nondirectional",
            window,
            notes=[*notes, f"n_pos={res.get('n_pos')}"],
            descriptive=descriptive,
        )

    def run_h1(self):
        p, d = self.p, self.d
        fr = h1_frame(d)
        assert_single_vintage(p.vintage, fr["vintage"])
        if p.h1_status == "thesis_2018":
            out_desc = "thesis_status_index (stg_thesis_2018_result_plr, MSS Dec 2016)"
            out_name = "thesis_status_index"
        elif p.h1_status == "classes":
            out_desc = _fmt_status_desc(d, p.h1_edition, "S")
            out_name = "status_class"
        else:
            out_desc = _fmt_status_desc(d, p.h1_edition, "S")
            out_name = "S"
        win = f"OSM {p.h1_snapshot} x status {p.h1_edition}"
        y = self._binary_status(fr["status"])
        feats = fixed_feature_list(fr, "cat")
        self.meta["feature_lists"]["H1_category"] = feats
        doms = fixed_feature_list(fr, "dom")
        self.meta["feature_lists"]["H1_domain"] = doms
        self.meta["feature_lists"]["H1_commercial"] = [
            f for f in feats if f.split("|")[0] in COMMERCIAL_DOMAINS
        ]
        x = oa_features(fr, feats, "cat").add_prefix("oa_cat:")
        bin_desc = (
            "binary status (>0 vs <=0)" if p.h1_status != "classes" else "binary {3,4} vs {1,2}"
        )
        self._auc_row(
            "H1",
            "primary",
            f"category OA ({len(feats)} fixed features, flagged cells imputed in-fold) => {bin_desc}",
            fr,
            x,
            y,
            f"{out_desc} -> {bin_desc}",
            win,
            key="H1",
            outcome_name=out_name,
        )
        # §5.2 secondary: domain-level, commercial-only; A1.1 (i) base indicators, (ii)
        # complete-case; Berlin published-class version.
        xd = oa_features(fr, doms, "dom").add_prefix("oa_dom:")
        self._auc_row(
            "H1",
            "secondary",
            "domain-level OA (13 domains) => binary status",
            fr,
            xd,
            y,
            out_name,
            win,
            notes=["a null here reads 'not detected at domain resolution'"],
        )
        comm = self.meta["feature_lists"]["H1_commercial"]
        xc = oa_features(fr, comm, "cat").add_prefix("oa_cat:")
        self._auc_row(
            "H1",
            "secondary",
            "commercial-only category OA (4 commercial domains) => binary status",
            fr,
            xc,
            y,
            out_name,
            win,
            notes=["decides the public 'businesses' wording (§9)"],
        )
        base_doms = sorted({f.split("|")[0] for f in feats})
        xb = x.copy()
        for dom in base_doms:
            xb[f"base:{dom}"] = (
                fr.get(f"stock_dom:{dom}", pd.Series(0.0, index=fr.index)).fillna(0) >= 10
            ).astype(float)
        self._auc_row(
            "H1",
            "sensitivity",
            "category OA + one base indicator per domain (A1.1 (i))",
            fr,
            xb,
            y,
            out_name,
            win,
            notes=["shows how much commercial density adds to structure"],
        )
        cc = np.ones(len(fr), dtype=bool)
        for dom in COMMERCIAL_DOMAINS:
            cc &= (
                fr.get(f"stock_dom:{dom}", pd.Series(0.0, index=fr.index)).fillna(0).to_numpy()
                >= 10
            )
        self._auc_row(
            "H1",
            "sensitivity",
            "category OA, complete-case: base passed in all four commercial domains (A1.1 (ii))",
            fr[cc],
            x[cc],
            y[cc],
            out_name,
            win,
        )
        if p.city == "BER":
            sc = fr["S_cls"].astype(float)
            ok = sc.notna().to_numpy()
            self._auc_row(
                "H1",
                "secondary",
                "category OA => published status class {3,4} vs {1,2}",
                fr[ok],
                x[ok],
                (sc[ok] >= 3).astype(int),
                "S_cls",
                win,
                notes=["published-class version (§5.2)"],
            )
            self.run_h1_bzr()
        # H1a-c
        self.run_h1abc(fr, out_name, out_desc, win)

    def run_h1_bzr(self):
        """§5.2 R7: BZR-grain H1, descriptive (no verdict), Berlin only."""
        p, d = self.p, self.d
        sub = d.oa[
            (d.oa["snapshot_year"] == p.h1_snapshot) & (d.oa["oa_level"] == "category")
        ].copy()
        if sub.empty:
            return
        sub["bzr"] = sub["area_code"].str[:6]
        sub["key"] = sub["poi_domain_h"] + "|" + sub["poi_category_h"]
        g = sub.groupby(["bzr", "key"], sort=True).agg(
            c=("level_stock_local", "sum"),
            dd=("parent_stock_local", "sum"),
            cc=("level_stock_city", "first"),
            dc=("parent_stock_city", "first"),
        )
        with np.errstate(divide="ignore", invalid="ignore"):
            g["oa"] = np.where(g["dd"] > 0, (g["c"] / g["dd"]) / (g["cc"] / g["dc"]), 0.0)
        g["flag"] = g["dd"] < 10
        oa = g["oa"].unstack("key")
        fl = g["flag"].unstack("key").apply(_as_flag)
        oa.columns = [f"oa_cat:{c}" for c in oa.columns]
        fl.columns = [f"flag_cat:{c}" for c in fl.columns]
        wide = pd.concat([oa, fl], axis=1)
        if p.h1_status == "thesis_2018":
            st = d.bzr_status.set_index("bzr_code")["status"]
        else:
            s = d.h1_status[["area_code", "status"]].copy()
            pop = d.pop[d.pop["year"] == p.h1_edition - 1].set_index("area_code")["residents"]
            s["w"] = s["area_code"].map(pop)
            s["bzr"] = s["area_code"].str[:6]
            s = s.dropna()
            s = s[s["w"] > 0]
            st = s.groupby("bzr").apply(
                lambda t: np.average(t["status"], weights=t["w"]), include_groups=False
            )
        fr = wide.join(st.rename("status"), how="inner").dropna(subset=["status"]).sort_index()
        fr = fr.reset_index().rename(columns={"index": "bzr"})
        feats = fixed_feature_list(fr, "cat")
        self.meta["feature_lists"]["H1_bzr"] = feats
        x = oa_features(fr, feats, "cat").add_prefix("oa_cat:")
        y = (fr["status"] > 0).astype(int)
        groups = fr[fr.columns[0]].astype(str).str[:2]
        self._auc_row(
            "H1",
            "exploratory",
            "BZR-grain H1: category OA (summed stocks) => binary status, GroupKFold by Bezirk",
            fr,
            x,
            y,
            "S",
            f"OSM {p.h1_snapshot} x status {p.h1_edition}",
            notes=["descriptive only, no verdict (R7); 12 Bezirk groups < 20 clusters, so no CI"],
            descriptive=True,
            groups=groups,
        )
        self.rows[-1]["grain"] = "bzr"
        self.rows[-1]["cluster_unit"] = "bezirk"

    def _coverage_line(self, keep: np.ndarray, status: pd.Series) -> dict:
        def summ(s: pd.Series) -> str:
            if s.empty:
                return "none"
            if self.p.h1_status == "classes":
                return f"share in status classes 3-4 {100 * (s >= 3).mean():.0f}%"
            return f"median status {s.median():+.2f}, share with status > 0 {100 * (s > 0).mean():.0f}%"

        return {
            "n_retained": int(keep.sum()),
            "n_total": int(len(keep)),
            "retained": summ(status[keep]),
            "dropped": summ(status[~keep]),
        }

    def run_h1abc(self, fr: pd.DataFrame, out_name: str, out_desc: str, win: str):
        p, d = self.p, self.d
        specs = (
            ("H1a", "cat", CAFE_KEY, "negative", "OA category Cafe"),
            ("H1b", "cat", FASTFOOD_KEY, "positive", "OA category Fast Food"),
            ("H1c", "dom", SPORT_DOMAIN, "negative", "OA domain Sports and Recreation"),
        )
        status = fr["status"]
        pop = d.pop[d.pop["year"] == (p.h1_edition if p.city == "HH" else p.h1_edition - 1)]
        pop = pop.set_index("area_code")["residents"].reindex(fr["area_code"]).to_numpy(float)
        for hyp, tag, key, exp, label in specs:
            name = f"oa_{tag}:{key}"
            self.guard([name], [], out_name)
            val = fr.get(name, pd.Series(np.nan, index=fr.index)).astype(float)
            flag = _as_flag(fr.get(f"flag_{tag}:{key}", pd.Series(True, index=fr.index)))
            keep = (~flag & val.notna()).to_numpy()
            cov = self._coverage_line(keep, status)
            self.meta["coverage"][hyp] = cov
            parent = "all domains" if tag == "dom" else key.split("|")[0]
            cov_note = (
                f"coverage (N5): areas with >= 10 POIs in {parent} to measure the mix; "
                f"n retained {cov['n_retained']} of {cov['n_total']}; retained: {cov['retained']}; "
                f"dropped: {cov['dropped']}"
            )
            x = val.where(~flag).to_numpy(float)
            res = rho_test(
                x, status.to_numpy(float), [], fr["cluster"].to_numpy(object), self.n_boot
            )
            self.add(
                hyp,
                "primary",
                f"Spearman({label}, status), min-base flag dropped",
                name,
                out_desc,
                "",
                "spearman",
                res,
                exp,
                win,
                notes=[cov_note],
            )
            # N7: one population-weighted row (thesis "einwohnergewichtet", §5.2 = A1.1 (iii)),
            # full frame, no base rule.
            stock = (
                fr.get(f"stock_{tag}:{key}", pd.Series(np.nan, index=fr.index))
                .fillna(0.0)
                .to_numpy(float)
            )
            with np.errstate(divide="ignore", invalid="ignore"):
                per1k = np.where(pop > 0, 1000.0 * stock / pop, np.nan)
            pname = f"per1k:{key}"
            self.guard([pname], [], out_name)
            res = rho_test(
                per1k, status.to_numpy(float), [], fr["cluster"].to_numpy(object), self.n_boot
            )
            self.add(
                hyp,
                "sensitivity",
                f"Spearman({key} POIs per 1,000 residents, status), full frame, no base rule (population-weighted stock, N7)",
                pname,
                out_name,
                "",
                "spearman",
                res,
                exp,
                win,
                notes=[
                    "population-weighted stock row (thesis 'einwohnergewichtet', §5.2) = A1.1 (iii) per-1k row; counted once (N7)"
                ],
            )
            # N6: thesis-era fidelity row -- zero-filled OA, no base rule, full frame.
            if p.panel == "thesis-era":
                xz = val.fillna(0.0).to_numpy(float)
                res = rho_test(
                    xz, status.to_numpy(float), [], fr["cluster"].to_numpy(object), self.n_boot
                )
                ref = THESIS_FIDELITY_RHO[hyp]
                row = self.add(
                    hyp,
                    "sensitivity",
                    f"Spearman({label}, status), zero-filled OA, no base rule, full frame (R1 fidelity, N6)",
                    name,
                    out_desc,
                    "",
                    "spearman",
                    res,
                    exp,
                    win,
                    notes=[
                        f"R1/N6 fidelity check vs thesis PLR OA rho {ref:+.2f} (Tabellen 6-12..6-14); a gap is a pipeline divergence, not a finding"
                    ],
                )
                est = res["estimate"]
                self.meta.setdefault("fidelity", {})[hyp] = {
                    "thesis": ref,
                    "suite": None if est is None else round(float(est), 4),
                    "n": res["n"],
                }
                _ = row
            if p.city == "BER":
                sc = fr["S_cls"].astype(float).to_numpy()
                res = rho_test(x, sc, [], fr["cluster"].to_numpy(object), self.n_boot)
                self.add(
                    hyp,
                    "secondary",
                    f"Spearman({label}, published status class), min-base flag dropped",
                    name,
                    "S_cls",
                    "",
                    "spearman",
                    res,
                    exp,
                    win,
                    notes=["published-class version (§5.2)"],
                )
        # §5.2 D3b: H1c on the Sport category without table tennis; R3: H1b without the
        # döner/kebab type (if the taxonomy carries it). LQ recomputed from type counts.
        self._modified_category_row(
            fr,
            "H1c",
            SPORT_DOMAIN,
            "Sport",
            (TABLE_TENNIS_TYPE,),
            "oa_sport_no_tt",
            "negative",
            out_name,
            win,
            "Sport category without table tennis (organised/commercial facilities, closer to Powell et al.; D3b)",
        )
        kebab = sorted(
            {
                t
                for t in d.types.loc[
                    (d.types["snapshot_year"] == p.h1_snapshot)
                    & (d.types["poi_category_h"] == "Fast Food"),
                    "poi_type_h",
                ].dropna()
                if any(k in str(t).lower() for k in KEBAB_TOKENS)
            }
        )
        self._modified_category_row(
            fr,
            "H1b",
            "Gastronomy",
            "Fast Food",
            tuple(kebab),
            "oa_fastfood_no_kebab",
            "positive",
            out_name,
            win,
            "Fast Food without döner/kebab types (anti-stigmatisation check, R3)",
        )

    def _modified_category_row(
        self, fr, hyp, domain, category, drop_types, pname, exp, out_name, win, label
    ):
        p, d = self.p, self.d
        if not drop_types:
            types = sorted(
                set(
                    d.types.loc[
                        (d.types["snapshot_year"] == p.h1_snapshot)
                        & (d.types["poi_category_h"] == category),
                        "poi_type_h",
                    ].dropna()
                )
            )
            self.add(
                hyp,
                "sensitivity",
                label,
                pname,
                out_name,
                "",
                "spearman",
                {"n": 0, "n_clusters": 0},
                exp,
                win,
                notes=[
                    f"not testable: the taxonomy carries no matching type at this snapshot ({category} types: {', '.join(types) or 'none'})"
                ],
            )
            return
        t = d.types[d.types["snapshot_year"] == p.h1_snapshot]
        dom_n = t[t["poi_domain_h"] == domain].groupby("area_code")["poi_count"].sum()
        cat_n = (
            t[(t["poi_domain_h"] == domain) & (t["poi_category_h"] == category)]
            .groupby("area_code")["poi_count"]
            .sum()
        )
        drop_n = (
            t[(t["poi_category_h"] == category) & t["poi_type_h"].isin(drop_types)]
            .groupby("area_code")["poi_count"]
            .sum()
        )
        idx = pd.Index(sorted(set(d.oa.loc[d.oa["snapshot_year"] == p.h1_snapshot, "area_code"])))
        dom_n, cat_n, drop_n = (s.reindex(idx).fillna(0.0) for s in (dom_n, cat_n, drop_n))
        # Consistency guard: the unmodified LQ recomputed here must equal the panel's OA.
        with np.errstate(divide="ignore", invalid="ignore"):
            raw = (cat_n / dom_n) / (cat_n.sum() / dom_n.sum())
        panel_oa = oa_wide(d, p.h1_snapshot).get(f"oa_cat:{domain}|{category}")
        if panel_oa is not None:
            both = raw.notna() & (dom_n > 0)
            pv = panel_oa.reindex(idx)[both].to_numpy(float)
            assert np.allclose(raw[both].to_numpy(float), pv, rtol=1e-9, atol=1e-9), (  # noqa: S101 -- R-C3
                f"recomputed {category} LQ differs from int_poi_oa_native_panel"
            )
        num, den = cat_n - drop_n, dom_n - drop_n
        with np.errstate(divide="ignore", invalid="ignore"):
            oa = np.where(den > 0, (num / den) / (num.sum() / den.sum()), 0.0)
        oa = pd.Series(oa, index=idx).where(den >= 10)  # min-base flag on the reduced parent
        x = oa.reindex(fr["area_code"]).to_numpy(float)
        self.guard([pname], [], out_name)
        res = rho_test(
            x, fr["status"].to_numpy(float), [], fr["cluster"].to_numpy(object), self.n_boot
        )
        self.add(
            hyp,
            "sensitivity",
            f"Spearman({label}, status); types removed from numerator and parent: {', '.join(drop_types)}",
            pname,
            out_name,
            "",
            "spearman",
            res,
            exp,
            win,
        )

    # -- H2 ------------------------------------------------------------------

    def run_h2(self):
        p, d = self.p, self.d
        fr = h2_frame(d, p.windows)
        if fr.empty:
            self.add(
                "H2",
                "primary",
                "no H2 frame",
                "",
                "D",
                "",
                "oof_auc_logit",
                {"n": 0},
                "nondirectional",
                self.win_label(p.windows),
            )
            return
        assert_single_vintage(p.vintage, fr["vintage"])
        assert_temporal_order(
            "H2", fr["pred_start"], fr["pred_end"], fr["out_start"], fr["out_end"]
        )
        win = self.win_label(p.windows)
        notes = self.shock_notes(p.windows) + self.break_notes([e for _s, e in p.windows])
        if p.city == "HH":
            ok = fr["D_cls"].notna()
            fr = fr[ok].reset_index(drop=True)
            y = (fr["D_cls"] == 3).astype(int)
            ydesc = "Dynamik class negativ (3) vs rest (predicts worsening)"
            out_name = "dynamik_class"
        else:
            fr = fr[fr["D"].notna()].reset_index(drop=True)
            y = (fr["D"] > 0).astype(int)
            ydesc = "binary D (>0 = worsening vs <=0)"
            out_name = "D"
        feats = fixed_feature_list(fr, "cat")
        self.meta["feature_lists"]["H2_category"] = feats
        x = oa_features(fr, feats, "cat").add_prefix("oa_cat:")
        out_desc = "; ".join(_fmt_status_desc(d, e, "D") for _s, e in p.windows) + f" -> {ydesc}"
        self._auc_row(
            "H2",
            "primary",
            f"category OA at window start ({len(feats)} fixed features) => {ydesc}, pooled windows",
            fr,
            x,
            y,
            out_desc,
            win,
            notes=notes,
            key="H2",
            outcome_name=out_name,
        )
        doms = fixed_feature_list(fr, "dom")
        self.meta["feature_lists"]["H2_domain"] = doms
        xd = oa_features(fr, doms, "dom").add_prefix("oa_dom:")
        self._auc_row(
            "H2",
            "secondary",
            "domain-level OA at window start => binary Dynamik",
            fr,
            xd,
            y,
            out_name,
            win,
            notes=[*notes, "a null here reads 'not detected at domain resolution'"],
        )
        base_doms = sorted({f.split("|")[0] for f in feats})
        xb = x.copy()
        for dom in base_doms:
            xb[f"base:{dom}"] = (
                fr.get(f"stock_dom:{dom}", pd.Series(0.0, index=fr.index)).fillna(0) >= 10
            ).astype(float)
        self._auc_row(
            "H2",
            "sensitivity",
            "category OA + one base indicator per domain (A1.1 (i))",
            fr,
            xb,
            y,
            out_name,
            win,
            notes=notes,
        )
        cc = np.ones(len(fr), dtype=bool)
        for dom in COMMERCIAL_DOMAINS:
            cc &= (
                fr.get(f"stock_dom:{dom}", pd.Series(0.0, index=fr.index)).fillna(0).to_numpy()
                >= 10
            )
        self._auc_row(
            "H2",
            "sensitivity",
            "category OA, complete-case in the four commercial domains (A1.1 (ii))",
            fr[cc],
            x[cc],
            y[cc],
            out_name,
            win,
            notes=notes,
        )
        # §5.2 H2 incremental: binds the "Holds?" mapping (§5.6).
        lvl = fr["S_start"].astype(float)
        ok = lvl.notna().to_numpy()
        self.guard(list(x.columns), ["S_start"], out_name)
        res = delta_auc_test(
            lvl[ok].to_frame().to_numpy(float),
            pd.concat([lvl[ok], x[ok]], axis=1).to_numpy(float),
            y[ok].to_numpy(int),
            fr["cluster"][ok].to_numpy(object),
            self.n_boot,
        )
        self.meta["h2_incremental"] = {
            k: res.get(k) for k in ("estimate", "ci_low", "ci_high", "auc_base", "auc_full")
        }
        self.add(
            "H2",
            "secondary",
            "H2 incremental: delta AUC of (status level at window start + category OA) over status level alone",
            "category OA",
            out_name,
            "S_start",
            "delta_auc",
            res,
            "positive",
            win,
            level_control="window_start",
            notes=notes,
        )
        # §5.2 directional continuity row.
        bask = _basket(fr.set_index("area_code"))
        self.guard(["oa_basket"], [], out_name)
        res = rho_test(
            bask.to_numpy(float),
            (fr["D_cls"] if p.city == "HH" else fr["D"]).to_numpy(float),
            [],
            fr["cluster"].to_numpy(object),
            self.n_boot,
        )
        self.add(
            "H2",
            "exploratory",
            "directional continuity: Spearman(OA basket of 4 commercial domains at window start, status change over the window)",
            "oa_basket",
            out_name,
            "",
            "spearman",
            res,
            "negative",
            win,
            notes=notes,
        )
        if p.city == "BER":
            ok = fr["D_cls"].notna().to_numpy()
            self._auc_row(
                "H2",
                "secondary",
                "category OA => published Dynamik class negativ (3) vs rest",
                fr[ok],
                x[ok],
                (fr["D_cls"][ok] == 3).astype(int),
                "D_cls",
                win,
                notes=[*notes, "published-class version (§5.2)"],
            )
            if p.class_windows and tuple(p.class_windows) != tuple(p.windows):
                frc = h2_frame(d, p.class_windows)
                frc = frc[frc["D_cls"].notna()].reset_index(drop=True)
                xc = oa_features(frc, feats, "cat").add_prefix("oa_cat:")
                self._auc_row(
                    "H2",
                    "secondary",
                    f"category OA => published Dynamik class negativ vs rest, class windows {self.win_label(p.class_windows)} (incl. the class-only 2013 edition, #338)",
                    frc,
                    xc,
                    (frc["D_cls"] == 3).astype(int),
                    "D_cls",
                    self.win_label(p.class_windows),
                    notes=["published-class version (§5.2, §6.4)"],
                )
        else:
            yp = (fr["D_cls"] == 1).astype(int)
            self._auc_row(
                "H2",
                "secondary",
                "category OA at window start => Dynamik class positiv (1) vs rest (predicts improvement)",
                fr,
                x,
                yp,
                "dynamik_class",
                win,
                notes=notes,
            )

    # -- H3 ------------------------------------------------------------------

    def _h3_controls(self, which: str, timing: str, d4: bool, cls: bool = False):
        own = "D_P" if which == "H3a" else "d_poi_p"
        lvl = "S_pivot" if timing == "pivot" else "S_start"
        cols = [own, lvl] + (["control"] if d4 else [])
        names = [
            ("D_cls_P" if cls else "D_P") if which == "H3a" else "g_commercial_c5@P",
            ("S_cls_pivot" if cls else "S_pivot")
            if timing == "pivot"
            else ("S_cls_start" if cls else "S_start"),
        ] + (["ewr_composite"] if d4 else [])
        return cols, names

    def _h3_test(
        self,
        cl: pd.DataFrame,
        which: str,
        controls: list[str],
        ctrl_names: list[str],
        poi_name: str,
        status_name: str,
        timing: str,
    ):
        if which == "H3a":
            x, y = cl["d_poi_p"], cl["d_status_f"]
            pred, outc = f"{poi_name}@P", f"{status_name}@F"
        else:
            x, y = cl["d_status_p"], cl["d_poi_f"]
            pred, outc = f"{status_name}@P", f"{poi_name}@F"
        # construct guard: status-side names map to STATUS_NAMES, POI side to POI_PREFIXES
        self.guard([pred if which == "H3a" else poi_name], ctrl_names, status_name)
        assert_temporal_order(
            which,
            cl["start_p"],
            cl["p_end"],
            cl["f_start"],
            cl["end_f"],
            control_year=cl["start_p"] if (which == "H3b" and timing == "window_start") else None,
        )
        ctrl = [cl["D_P_col"] if c == "D_P" else cl[c] for c in controls]
        return (
            rho_test(
                x.to_numpy(float),
                y.to_numpy(float),
                [c.to_numpy(float) for c in ctrl],
                cl["cluster"].to_numpy(object),
                self.n_boot,
            ),
            pred,
            outc,
        )

    def _prep_cl(self, rows, status_col, poi_col, cls=False):
        cl = cross_lag_frame(
            rows,
            status_col,
            poi_col,
            "S_cls_end" if cls else "S_end",
            "S_cls_start" if cls else "S_start",
        )
        if cl.empty:
            return cl
        assert_single_vintage(self.p.vintage, cl["vintage_p_s"], cl["vintage_f_e"])
        cl["D_P_col"] = cl["d_status_p"]
        return cl

    def _h3_row(
        self,
        cl,
        which,
        role,
        op,
        controls_spec,
        poi_name,
        status_name,
        pivots_used,
        notes,
        timing,
        d4=False,
        cls=False,
    ):
        controls, ctrl_names = controls_spec
        res, pred, outc = self._h3_test(
            cl, which, controls, ctrl_names, poi_name, status_name, timing
        )
        windows = sorted(
            {(int(a), int(b)) for a, b in zip(cl["start_p"], cl["p_end"], strict=True)}
            | {(int(a), int(b)) for a, b in zip(cl["f_start"], cl["end_f"], strict=True)}
        )
        win = self.win_label(windows) if windows else ""
        return self.add(
            which,
            role,
            op,
            pred,
            outc,
            ";".join(ctrl_names),
            "partial_spearman",
            res,
            "ordering",
            win,
            pivots=";".join(str(v) for v in pivots_used),
            level_control=timing,
            d4=d4,
            notes=notes,
        )

    def run_h3(self):
        p, d = self.p, self.d
        rows = window_rows(d, p.windows)
        status_name = "dynamik_class" if p.city == "HH" else "D"
        cl = self._prep_cl(rows, "D", "g_commercial_c5")
        pivots = sorted(int(v) for v in cl["pivot"].unique()) if not cl.empty else []
        pv_str = ";".join(str(v) for v in pivots)
        all_edits = [e for _s, e in p.windows]
        base_notes = self.break_notes(all_edits)
        shock = self.shock_notes(p.windows)
        opn = {
            "H3a": "partial Spearman(g(commercial C5)_P, D_F | D_P, S_pivot)",
            "H3b": "partial Spearman(D_P, g(commercial C5)_F | g(commercial C5)_P, S_start(P))",
        }
        prim_timing = {"H3a": "pivot", "H3b": "window_start"}
        alt_timing = {"H3a": "window_start", "H3b": "pivot"}
        for which in ("H3a", "H3b"):
            if cl.empty:
                self.add(
                    which,
                    "primary",
                    opn[which],
                    "",
                    "",
                    "",
                    "partial_spearman",
                    {"n": 0},
                    "ordering",
                    self.win_label(p.windows),
                )
                continue
            spec = self._h3_controls(which, prim_timing[which], False)
            self._h3_row(
                cl,
                which,
                "primary",
                opn[which] + ", pooled pivots",
                spec,
                "g_commercial_c5",
                status_name,
                pivots,
                shock + base_notes,
                prim_timing[which],
            )
            # alternative level timing (§3.5 sensitivity)
            spec = self._h3_controls(which, alt_timing[which], False)
            self._h3_row(
                cl,
                which,
                "sensitivity",
                f"{which} with the alternative level control ({alt_timing[which]})",
                spec,
                "g_commercial_c5",
                status_name,
                pivots,
                shock + base_notes,
                alt_timing[which],
            )
            # D4 added (§3.5: Berlin pivot 2021 only; Hamburg all pivots). Pivots with < 80%
            # D4 coverage are dropped (the E1 80% rule).
            d4_piv = [pv for pv in pivots if cl.loc[cl["pivot"] == pv, "d4"].notna().mean() >= 0.8]
            if d4_piv:
                cld = cl[cl["pivot"].isin(d4_piv)]
                spec = self._h3_controls(which, prim_timing[which], True)
                cld = cld.assign(control=cld["d4"])
                note = "D4 at pivot-1 (EWR composite)"
                if p.city == "HH":
                    note += "; D4 is Stadtteil-grain, about 99 independent values"
                self._h3_row(
                    cld,
                    which,
                    "sensitivity",
                    f"{which} primary controls + D4",
                    spec,
                    "g_commercial_c5",
                    status_name,
                    d4_piv,
                    [note, *base_notes],
                    prim_timing[which],
                    d4=True,
                )
            else:
                self.add(
                    which,
                    "sensitivity",
                    f"{which} primary controls + D4",
                    "",
                    status_name,
                    "",
                    "partial_spearman",
                    {"n": 0},
                    "ordering",
                    self.win_label(p.windows),
                    notes=["no pivot with D4 coverage >= 80%"],
                    d4=True,
                )
            # per pivot
            for pv in pivots:
                spec = self._h3_controls(which, prim_timing[which], False)
                clp = cl[cl["pivot"] == pv]
                bn = self.break_notes([pv, pv + (p.windows[1][1] - p.windows[1][0])])
                self._h3_row(
                    clp,
                    which,
                    "sensitivity",
                    f"{which} at pivot {pv} only",
                    spec,
                    "g_commercial_c5",
                    status_name,
                    [pv],
                    [*self.shock_notes([w for w in p.windows if w[1] == pv]), *bn],
                    prim_timing[which],
                )
            # pivot difference (§3.4)
            if len(pivots) >= 2:
                controls, ctrl_names = self._h3_controls(which, prim_timing[which], False)
                first, last = pivots[0], pivots[-1]
                x, y = (
                    (cl["d_poi_p"], cl["d_status_f"])
                    if which == "H3a"
                    else (cl["d_status_p"], cl["d_poi_f"])
                )
                ctrl = [cl["D_P_col"] if c == "D_P" else cl[c] for c in controls]
                res = pivot_diff_test(
                    x.to_numpy(float),
                    y.to_numpy(float),
                    [c.to_numpy(float) for c in ctrl],
                    cl["pivot"].to_numpy(),
                    cl["cluster"].to_numpy(object),
                    first,
                    last,
                    self.n_boot,
                )
                het = res["ci_low"] is not None and (res["ci_low"] > 0 or res["ci_high"] < 0)
                self.meta["pivot_diff"][which] = {
                    "first": first,
                    "last": last,
                    "estimate": res["estimate"],
                    "ci_low": res["ci_low"],
                    "ci_high": res["ci_high"],
                    "heterogeneous": bool(het),
                }
                self.add(
                    which,
                    "sensitivity",
                    f"pivot difference: rho(pivot {last}) - rho(pivot {first}) (§3.4)",
                    "",
                    status_name,
                    ";".join(ctrl_names),
                    "partial_spearman_diff",
                    res,
                    "nondirectional",
                    self.win_label(p.windows),
                    pivots=f"{first};{last}",
                    level_control=prim_timing[which],
                    notes=[
                        "heterogeneous across pivots: the pooled estimate depends on the window"
                        if het
                        else "no detectable pivot heterogeneity (CI includes 0)"
                    ],
                    descriptive=True,
                )
            # level-stratified (§5.2 D8d, exploratory; Berlin cut per N1)
            self._stratified(cl, which, prim_timing[which], status_name, pivots)
            # total-share growth (secondary), OA-basket change, café growth (R4)
            for poi_col, label, role in (
                (
                    "g_total_c5",
                    "total-share growth of all POIs (continuity with E1/E5)",
                    "secondary",
                ),
                (
                    "d_oa_basket",
                    "OA-basket change (mean OA of the 4 commercial domains)",
                    "secondary",
                ),
                ("g_cafe_c5", "café-growth cross-lag, g(café C5 share) (R4)", "exploratory"),
            ):
                clx = self._prep_cl(rows, "D", poi_col)
                if clx.empty:
                    continue
                c2, n2 = self._h3_controls(which, prim_timing[which], False)
                n2 = [n.replace("g_commercial_c5", poi_col) for n in n2]
                self._h3_row(
                    clx,
                    which,
                    role,
                    f"{which} with {label}",
                    (c2, n2),
                    poi_col,
                    status_name,
                    pivots,
                    shock + base_notes,
                    prim_timing[which],
                )
            if p.city == "BER":
                clc = self._prep_cl(
                    window_rows(d, p.class_windows), "D_cls", "g_commercial_c5", cls=True
                )
                if not clc.empty:
                    piv_c = sorted(int(v) for v in clc["pivot"].unique())
                    spec = self._h3_controls(which, prim_timing[which], False, cls=True)
                    self._h3_row(
                        clc,
                        which,
                        "secondary",
                        f"{which} on published Dynamik/status classes",
                        spec,
                        "g_commercial_c5",
                        "D_cls",
                        piv_c,
                        [
                            "published-class version (§5.2); rows without a class at the control date drop"
                        ],
                        prim_timing[which],
                        cls=True,
                    )
        self.meta["direction"] = None  # filled after scoring
        _ = pv_str
        self.run_h3c(rows)

    def _stratified(self, cl, which, timing, status_name, pivots):
        p, d = self.p, self.d
        st = cl["S_start"].astype(float)
        if p.city == "HH":
            high = (st == 1).to_numpy()
            cut_note = "high = status class 1 at window start; low/mid = {2,3,4}"
        else:
            # N1: Berlin "high" = S_start at or below the quantile matching the published
            # "hoch" share (status class 1) of the pivot's edition.
            high = np.zeros(len(cl), dtype=bool)
            shares = []
            for pv in pivots:
                ed = d.status[(d.status["edition"] == pv) & d.status["S_cls"].notna()]
                share = float((ed["S_cls"] == 1).mean()) if len(ed) else np.nan
                shares.append(f"{pv}: {100 * share:.1f}%")
                sel = (cl["pivot"] == pv).to_numpy()
                q = np.nanquantile(st[sel], share) if sel.any() and np.isfinite(share) else np.nan
                high |= sel & (st.to_numpy() <= q)
            cut_note = f"high = S_start at/below the published 'hoch' share quantile ({', '.join(shares)}; N1)"
        for name, mask in (
            ("high status", high),
            ("low/mid status", ~high & st.notna().to_numpy()),
        ):
            spec = self._h3_controls(which, timing, False)
            self._h3_row(
                cl[mask],
                which,
                "exploratory",
                f"{which} level-stratified: {name} at window start",
                spec,
                "g_commercial_c5",
                status_name,
                pivots,
                [cut_note],
                timing,
            )

    def run_h3c(self, rows: pd.DataFrame):
        p, d = self.p, self.d
        status_name = "dynamik_class" if p.city == "HH" else "D"
        win = self.win_label(p.windows)
        notes = self.shock_notes(p.windows) + self.break_notes([e for _s, e in p.windows])
        if rows.empty:
            self.add(
                "H3c",
                "primary",
                "no window rows",
                "",
                status_name,
                "",
                "spearman",
                {"n": 0},
                "negative",
                win,
            )
            return
        assert_single_vintage(p.vintage, rows["vintage_s"], rows["vintage_e"])
        assert_temporal_order("H3c", rows["w_start"], rows["w_end"], rows["w_start"], rows["w_end"])
        dcol = "D_cls" if p.city == "HH" else "D"

        def one(poi_col, sub, role, op, nts, outc=status_name, dc=dcol):
            self.guard([poi_col], [], outc)
            res = rho_test(
                sub[poi_col].to_numpy(float),
                sub[dc].to_numpy(float),
                [],
                sub["cluster"].to_numpy(object),
                self.n_boot,
            )
            ws = sorted(
                {(int(a), int(b)) for a, b in zip(sub["w_start"], sub["w_end"], strict=True)}
            )
            self.add(
                "H3c",
                role,
                op,
                f"{poi_col}@W",
                f"{outc}@W",
                "",
                "spearman",
                res,
                "negative",
                self.win_label(ws) if ws else win,
                notes=nts,
            )

        one(
            "g_commercial_c5",
            rows,
            "primary",
            "Spearman(g(commercial C5)_W, status change_W), same window, pooled",
            notes,
        )
        one("g_total_c5", rows, "secondary", "H3c with total-share growth", notes)
        one("d_oa_basket", rows, "secondary", "H3c with OA-basket change", notes)
        for w in p.windows:
            sub = rows[(rows["w_start"] == w[0]) & (rows["w_end"] == w[1])]
            if not sub.empty:
                one(
                    "g_commercial_c5",
                    sub,
                    "sensitivity",
                    f"H3c window {w[0]}-{w[1]} only",
                    self.shock_notes([w]) + self.break_notes([w[1]]),
                )
        if p.city == "BER":
            rc = window_rows(d, p.class_windows)
            if not rc.empty:
                one(
                    "g_commercial_c5",
                    rc,
                    "secondary",
                    "H3c on published Dynamik class",
                    ["published-class version (§5.2)"],
                    outc="D_cls",
                    dc="D_cls",
                )

    def run_phase_chains(self):
        """§4.3 Hamburg phase-shift chains: H3a/H3b/H3c primaries on shifted chains."""
        for chain in self.p.phase_chains:
            rows = window_rows(self.d, chain)
            if rows.empty:
                continue
            tag = "/".join(str(e) for _s, e in chain)
            cl = self._prep_cl(rows, "D", "g_commercial_c5")
            if not cl.empty:
                pivots = sorted(int(v) for v in cl["pivot"].unique())
                for which, timing in (("H3a", "pivot"), ("H3b", "window_start")):
                    spec = self._h3_controls(which, timing, False)
                    self._h3_row(
                        cl,
                        which,
                        "sensitivity",
                        f"{which} phase-shift chain {tag}",
                        spec,
                        "g_commercial_c5",
                        "dynamik_class",
                        pivots,
                        [
                            "phase-shift sensitivity (§4.3); a result holding on one phase only is fragile"
                        ],
                        timing,
                    )
            self.guard(["g_commercial_c5"], [], "dynamik_class")
            res = rho_test(
                rows["g_commercial_c5"].to_numpy(float),
                rows["D_cls"].to_numpy(float),
                [],
                rows["cluster"].to_numpy(object),
                self.n_boot,
            )
            self.add(
                "H3c",
                "sensitivity",
                f"H3c phase-shift chain {tag}",
                "g_commercial_c5@W",
                "dynamik_class@W",
                "",
                "spearman",
                res,
                "negative",
                self.win_label(chain),
                notes=["phase-shift sensitivity (§4.3)"],
            )

    # -- validity check (§3.2, Berlin) ------------------------------------------

    def run_validity(self):
        if self.p.city != "BER":
            return
        eds = sorted({e for _s, e in self.p.windows} | {self.p.h1_edition})
        for e in eds:
            st = _status_at(self.d, e)
            if st.empty or st["S"].notna().sum() == 0:
                continue
            ok_s = st["S"].notna() & st["S_cls"].notna()
            ok_d = st["D"].notna() & st["D_cls"].notna()
            rs = stats.spearmanr(st.loc[ok_s, "S"], st.loc[ok_s, "S_cls"]).statistic
            rd = stats.spearmanr(st.loc[ok_d, "D"], st.loc[ok_d, "D_cls"]).statistic
            self.meta["validity"].append(
                {
                    "edition": int(e),
                    "rho_S_status_class": round(float(rs), 4),
                    "n_S": int(ok_s.sum()),
                    "rho_D_dynamik_class": round(float(rd), 4),
                    "n_D": int(ok_d.sum()),
                    "sources_S": _fmt_status_desc(self.d, e, "S"),
                    "sources_D": _fmt_status_desc(self.d, e, "D"),
                }
            )
        if self.p.h1_status == "thesis_2018":
            th = self.d.h1_status.set_index("area_code")["status"]
            st = _status_at(self.d, self.p.h1_edition)["S"]
            j = pd.concat([th, st], axis=1, join="inner").dropna()
            self.meta["thesis_index_vs_S"] = {
                "edition": self.p.h1_edition,
                "rho": round(float(stats.spearmanr(j.iloc[:, 0], j.iloc[:, 1]).statistic), 4),
                "n": int(len(j)),
            }

    # -- orchestration -------------------------------------------------------

    def run(self) -> list[dict]:
        self.run_validity()
        self.run_h1()
        self.run_h2()
        self.run_h3()
        if self.p.phase_chains:
            self.run_phase_chains()
        score_panel(self.rows, self.p, self.meta)
        return self.rows


# ---------------------------------------------------------------------------
# Scoring (§5.4-§5.6)
# ---------------------------------------------------------------------------


def _theta0(estimator: str) -> float:
    return 0.5 if estimator == "oof_auc_logit" else 0.0


def _verdict_for(row: dict, primary: bool) -> tuple[str, list[str]]:
    est = row["estimate"]
    notes: list[str] = []
    if row["_descriptive"]:
        return "", notes
    if est is None or not np.isfinite(est):
        return NO_DATA, notes
    th = _theta0(row["estimator"])
    hyp = row["hypothesis"]
    exp = THESIS_HYPOTHESES[hyp]["suite_expected_dir"]
    if row["estimator"] == "delta_auc":
        exp = "positive"
    elif row["expected_dir"] in ("positive", "negative"):
        exp = row["expected_dir"]
    if primary:
        if row["p_bh"] is None:
            return NO_DATA, notes
        v = verdict(est - th, exp, p=row["p_bh"])
    else:
        if row["ci_low"] is None:
            return NO_DATA, notes
        v = verdict(est - th, exp, ci_low=row["ci_low"] - th, ci_high=row["ci_high"] - th)
    if row["estimator"] in ("oof_auc_logit", "delta_auc") and v == CONTRADICTED:
        # §5.1: CONTRADICTED is impossible for the non-directional AUC tests.
        notes.append(
            "estimate significantly below the null; CONTRADICTED is undefined for a non-directional test"
        )
        v = NOT_SIGNIFICANT
    return v, notes


def _at_least(row: dict, level: str) -> bool:
    lab = row["effect_label"]
    if row["estimator"] == "oof_auc_logit":
        return lab in ("poor", "acceptable", "excellent")  # N3: at least 'poor' (AUC >= 0.60)
    order = ("negligible", "small", "moderate", "large")
    return lab in order and order.index(lab) >= order.index(level)


def holds_label(row: dict, h2_delta_excludes_zero: bool | None) -> tuple[str, list[str]]:
    """§5.6 "Holds?" mapping (with domain notes N3 and N4)."""
    hyp, v = row["hypothesis"], row["verdict"]
    nominal = v == NOT_SIGNIFICANT and row["p_boot"] is not None and row["p_boot"] < ALPHA
    notes: list[str] = []
    if v == NO_DATA or v == "":
        return "not testable", notes
    if hyp in ("H1", "H1b"):
        if v == SUPPORTED:
            return ("holds" if _at_least(row, "small") else "weaker than thesis"), notes
        if v == CONTRADICTED:
            return "reversed", notes
        if nominal:
            return "not reproduced at the corrected threshold (nominally significant)", notes
        return "not reproduced", notes
    if hyp == "H3b":
        if v == SUPPORTED:
            return "holds", notes
        if v == CONTRADICTED:
            return "ordering present, opposite sign", notes
        if nominal:
            return "not reproduced at the corrected threshold (nominally significant)", notes
        return "not reproduced", notes
    if hyp in ("H1a", "H1c", "H3c"):
        if v == SUPPORTED:
            return (
                "stronger than thesis" if _at_least(row, "small") else "consistent (still unclear)"
            ), notes
        if v == CONTRADICTED:
            lab = "opposite direction (thesis: undecided)"
            if hyp == "H1c":
                lab += "; consistent with the sign of the thesis's own planning-area OA correlations (Tabelle 6-14)"
            return lab, notes
        return "consistent (still unclear)", notes
    if hyp == "H2":
        if v == SUPPORTED and _at_least(row, "poor"):
            if h2_delta_excludes_zero:
                return "stronger than thesis", notes
            return (
                "consistent (still unclear): explained by current status level "
                "(cf. the thesis's 'Scheinkorrelation', §6.3.2.1)"
            ), notes
        return "consistent (still unclear)", notes
    if hyp == "H3a":
        if v == SUPPORTED:
            return "diverges: commerce-first precedence", notes
        if v == CONTRADICTED:
            return "diverges: commerce-first association of opposite sign", notes
        if nominal:
            notes.append("nominally significant (unadjusted p < 0.05; N4)")
        return "consistent (rejected)", notes
    return "", notes


def score_panel(rows: list[dict], panel: Panel, meta: dict) -> None:
    """BH across the 8 primaries (binding) + Holm column; verdicts; holds; notes."""
    prim = [r for r in rows if r["role"] == "primary"]
    hyps = [r["hypothesis"] for r in prim]
    assert sorted(hyps) == sorted(PRIMARY_ORDER), f"primary family is not the 8 hypotheses: {hyps}"  # noqa: S101
    p_bh = bh_adjust([r["p_boot"] for r in prim])
    p_holm = holm_adjust([r["p_boot"] for r in prim])
    for r, a, b in zip(prim, p_bh, p_holm, strict=True):
        r["p_bh"], r["p_holm"] = a, b
    inc = meta.get("h2_incremental") or {}
    h2_delta = None if inc.get("ci_low") is None else bool(inc["ci_low"] > 0)
    for r in rows:
        primary = r["role"] == "primary"
        v, extra = _verdict_for(r, primary)
        r["verdict"] = v
        r["notes"] = [*r["notes"], *extra]
        if primary:
            if (
                r["p_bh"] is not None
                and r["p_bh"] < ALPHA
                and (r["p_holm"] is None or r["p_holm"] >= ALPHA)
            ):
                r["notes"].append("significant at FDR 5%; not at family-wise 5%")
            r["holds"], hn = holds_label(r, h2_delta)
            r["notes"].extend(hn)
            if panel.city == "HH" and r["hypothesis"] == "H2":
                _low_power(r)
        elif panel.city == "HH" and r["hypothesis"] == "H2" and r["estimator"] == "oof_auc_logit":
            _low_power(r)
    # §3.4: heterogeneous pivots -> say so on the pooled primary.
    for which, pdiff in meta.get("pivot_diff", {}).items():
        if pdiff.get("heterogeneous"):
            for r in prim:
                if r["hypothesis"] == which:
                    r["notes"].append(
                        "pooled estimate is heterogeneous across pivots (§3.4): the result depends on the window"
                    )
    v = {r["hypothesis"]: r["verdict"] for r in prim}
    meta["direction"] = direction_conclusion(v.get("H3a", NO_DATA), v.get("H3b", NO_DATA))


def _low_power(r: dict) -> None:
    """§4.4: Hamburg H2 with a NA CI or one wider than 0.25 -> NOT SIGNIFICANT, low power."""
    if r["ci_low"] is None or (r["ci_high"] - r["ci_low"]) > 0.25:
        r["verdict"] = NOT_SIGNIFICANT if r["verdict"] != NO_DATA else NO_DATA
        r["notes"].append("low power (CI NA or wider than 0.25, §4.4)")
        if r["role"] == "primary":
            r["holds"] = "consistent (still unclear)"


# ---------------------------------------------------------------------------
# Output
# ---------------------------------------------------------------------------


def run_sha() -> str:
    """Short HEAD sha; '+dirty' if analysis/ has uncommitted changes (reproducibility)."""
    try:
        sha = subprocess.run(  # noqa: S603 -- fixed git argv, no user input
            ["git", "rev-parse", "--short=12", "HEAD"],  # noqa: S607
            cwd=REPO,
            capture_output=True,
            text=True,
            check=True,
        ).stdout.strip()
        dirty = subprocess.run(  # noqa: S603 -- fixed git argv, no user input
            ["git", "status", "--porcelain", "--", "analysis"],  # noqa: S607
            cwd=REPO,
            capture_output=True,
            text=True,
            check=True,
        ).stdout.strip()
        return sha + ("+dirty" if dirty else "")
    except (OSError, subprocess.CalledProcessError):
        return "unknown"


def _fmt(v, kind: str = "est") -> str:
    if v is None:
        return ""
    if isinstance(v, bool):
        return "true" if v else "false"
    if isinstance(v, (int, np.integer)):
        return str(int(v))
    if isinstance(v, (float, np.floating)):
        if not np.isfinite(v):
            return ""
        return f"{float(v):.6g}" if kind == "p" else f"{float(v):.6f}"
    if isinstance(v, list):
        return "; ".join(str(x) for x in v)
    return str(v)


P_COLS = {"p_boot", "p_bh", "p_holm", "p_analytic"}


def rows_to_records(rows: list[dict]) -> list[dict]:
    out = []
    for r in rows:
        out.append({c: _fmt(r.get(c), "p" if c in P_COLS else "est") for c in CSV_COLUMNS})
    return out


def write_results(records: list[dict], path: Path, panels: Sequence[tuple[str, str]]) -> list[dict]:
    """Replace this run's panels in the shared CSV; keep the others; fixed panel order."""
    existing: list[dict] = []
    if path.exists():
        with path.open(encoding="utf-8", newline="") as f:
            existing = [r for r in csv.DictReader(f) if (r["city"], r["panel"]) not in set(panels)]
    allr = existing + records
    order = {k: i for i, k in enumerate(PANEL_ORDER)}
    allr = sorted(
        enumerate(allr), key=lambda t: (order.get((t[1]["city"], t[1]["panel"]), 99), t[0])
    )
    allr = [r for _i, r in allr]
    buf = io.StringIO()
    w = csv.DictWriter(buf, fieldnames=list(CSV_COLUMNS), lineterminator="\n")
    w.writeheader()
    w.writerows(allr)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(buf.getvalue().encode("utf-8"))
    return allr


def _json_clean(o):
    if isinstance(o, dict):
        return {str(k): _json_clean(v) for k, v in o.items()}
    if isinstance(o, (list, tuple)):
        return [_json_clean(v) for v in o]
    if isinstance(o, (np.floating, float)):
        return None if not np.isfinite(o) else round(float(o), 6)
    if isinstance(o, (np.integer,)):
        return int(o)
    if isinstance(o, (np.bool_,)):
        return bool(o)
    return o


def write_metadata(path: Path, updates: dict) -> dict:
    data = {}
    if path.exists():
        data = json.loads(path.read_text(encoding="utf-8"))
    data.update(_json_clean(updates))
    data = {k: data[k] for k in sorted(data)}
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(
        (json.dumps(data, indent=2, ensure_ascii=False, sort_keys=True) + "\n").encode("utf-8")
    )
    return data


def write_feature_lists_before_fit(path: Path, pdata: PanelData) -> None:
    """A1.1: the fixed feature lists are written to the results metadata before any fit."""
    p = pdata.panel
    fr1 = h1_frame(pdata)
    fr2 = h2_frame(pdata, p.windows)
    lists = {
        "H1_category": fixed_feature_list(fr1, "cat"),
        "H2_category": fixed_feature_list(fr2, "cat") if not fr2.empty else [],
    }
    key = f"{p.city}/{p.panel}"
    data = {}
    if path.exists():
        data = json.loads(path.read_text(encoding="utf-8"))
    entry = data.get(key, {})
    entry["feature_lists_prefit"] = lists
    write_metadata(path, {key: entry})


# ---------------------------------------------------------------------------
# Findings (generated, §7.2) -- Berlin
# ---------------------------------------------------------------------------


def _f(v: str, nd: int = 3) -> str:
    if v in ("", None):
        return "–"
    try:
        return f"{float(v):.{nd}f}"
    except ValueError:
        return str(v)


def _cell(r: dict | None) -> str:
    if r is None:
        return "–"
    if r["verdict"] == NO_DATA:
        return f"NO DATA (n = {r['n'] or 0})"
    est = _f(r["estimate"])
    ci = f"[{_f(r['ci_low'])}, {_f(r['ci_high'])}]"
    name = "AUC" if r["estimator"] == "oof_auc_logit" else "ρ"
    return (
        f"{name} {est} {ci}, n = {r['n']} ({r['n_clusters']} clusters), p_BH = {_f(r['p_bh'], 4)}: "
        f"**{r['verdict']}** ({r['effect_label']}); *{r['holds']}*"
    )


SHOCK_TEXT = """No window is shock-free, and the findings must not imply otherwise (pre-registration §3.4,
binding text).

- **W1 (Dec 2018 → Dec 2020)** contains 2020. Pandemic job losses hit hospitality, culture and tourism
  workers, who plausibly live disproportionately in gastronomy-dense inner-city areas. Berlin mean
  `arbeitslose_dynamik` in 2021 is +1.09 pp, the only positive edition. W1 Dynamik can therefore
  correlate with gastronomy through the labour market rather than through upgrading. **W2 contains
  the bounce-back.** Every pooled H2/H3c row that includes W1 names this mechanism in `notes`.
- **W2 (Dec 2020 → Dec 2022)** covers the pandemic and the **1 June 2022 Rechtskreiswechsel**, which
  moved Ukrainian refugees into SGB II (BA-Statistik 2022).
- **W3 (Dec 2022 → Dec 2024)** is **not** post-shock. It contains (i) continuing refugee entry into
  SGB II after June 2022 and (ii) the **1 January 2023 Bürgergeld and Wohngeld-Plus reforms**. Both
  changed who counts in all three SGB-based indicators, with unknown and possibly opposite small-area
  effects.
- **H1 cross-section (2025 levels)** includes refugee-related SGB II receipt concentrated near large
  accommodation sites. This is a modest effect on a level, and it belongs in the limitation line.

The warehouse has no open small-area refugee-accommodation source, so this is disclosed as a
limitation, not corrected."""

H1C_TEXT = """*"The 2018 thesis rated H1c as undecided. Its correlations between sport and leisure facilities and
the official status index were very small and of mixed sign. At planning-area level, more facilities
went slightly with lower official status; at district-region level, the population-weighted count
went slightly with higher status. The thesis text describes the planning-area result as in line with
the hypothesis; under the index's own sign convention it is not. The 'undecided' verdict is
unaffected. In OpenStreetMap this category consists mostly of playgrounds and public table-tennis
tables."* (pre-registration §1.3, public wording adopted from the domain review §3)

In OSM, "Sports and Recreation" is mostly playgrounds and public table-tennis tables (Berlin 2025:
1,984 table-tennis tables and 868 playgrounds against 375 fitness centres). This is planned public
provision, dense in family-heavy estates: a plausible reason for a wrong-signed association, not a
tested one. The Sport-without-table-tennis sensitivity row (D3b) is reported below."""

AUC_TEXT = """The thesis's headline AUCs are not comparable to the suite's (pre-registration §1.2, binding
text D4c). They come from BZR grain for H1, H2 and H3b (137 areas), random 10-fold CV (§6.2.3), the
best of about 19 algorithms (§6.2.4) and up to 85 OA features. The suite uses PLR grain,
cluster-grouped CV and one pre-specified model, each of which lowers AUC. **No table may set the
thesis AUC against a suite AUC as a measure of weakening.** In place of the thesis's "Features
sinnvoll?" column, the ten largest standardised coefficients (mean over the five training folds) are
listed with their signs."""

COMPARABILITY_TEXT = """**Thesis era vs 2019–2025.** The two Berlin panels are not like-for-like either: they use
different LOR vintages (pre-2021 vs 2021, so no PLR is followed across the seam, index-definition
§2.5), different status measures for the H1 family (the thesis's own MSS 2016 status index vs the
S1+S3+S4 composite of 2025), different indicator definitions (the definition breaks listed below)
and different OSM completeness. The thesis-era panel contains the thesis's own editions, so it is
**not an independent replication** (§6.5); it shows what current methods give on the thesis's data.
A difference between the two columns is a difference between eras *and* methods, not a measured
change in Berlin.

**Berlin vs Hamburg** (pre-registration §4.5, binding text, for any cross-city reading). Hamburg and
Berlin verdicts are **not like-for-like**: (1) the monitor construction differs: Hamburg's seven
indicators include migration background and school leaving; (2) the change window differs (3 vs 2
years); (3) the status measure differs (Hamburg classes vs Berlin continuous composites); (4) the
grain differs (Gebiet ≈ 2,200 residents vs PLR ≈ 7,000); (5) the era differs (`HH/full` 2013–2025 vs
Berlin modern 2019–2025; `HH/modern` is the era-matched comparison). A diverging verdict is not
evidence that the cities' processes differ, **and a matching verdict is not evidence that they are
the same**: with different constructs, agreement can be coincidental."""

MUST_NOT_TEXT = """What these results must not be used to claim (pre-registration §9, binding):

- **No "pressure" wording for Dynamik in either direction (#358).** Dynamik is the "improving /
  worsening official measure of disadvantage". Negative Dynamik is filtering, at most a rent-gap
  precondition (Smith 1979).
- **Status improvement ≠ gentrification.** Measured disadvantage can fall through in-situ labour-market
  gains, children ageing out of child poverty, new-build in-movers, the closure or relocation of
  refugee accommodation, or benefit-rule changes, as well as through compositional upgrading. Public
  text calls the outcome "change in officially measured disadvantage".
- No causal or displacement language. Status-first means that a fall in measured disadvantage precedes
  commercial change, not that anyone was displaced.
- **H3a and H3b are not mutually exclusive.** Both SUPPORTED reads as co-evolution, consistent with
  Dangschat.
- **H3c SUPPORTED means co-movement within one window.** It cannot by itself establish simultaneity and
  is read together with H3a/H3b.
- **H1 public wording** is "the local mix of shops, services and public facilities", unless the
  commercial-only H1 row also holds; only then may it say "businesses".
- Fast-food findings are phrased at area level. H1b is a deprivation hypothesis (Pearce et al. 2007
  is a New Zealand study of fast-food access and deprivation), not a displacement one.
- The thesis's AUCs are not set against suite AUCs (§1.2).
- Hamburg verdicts are transfer tests, not replications (§4.4–4.5)."""


def _deviations(meta_mod: dict, meta_th: dict) -> list[str]:
    devs = [
        "**Min-base rule (ADR-0017) as a thesis deviation (N8).** The thesis computed its OA "
        "correlations on all PLRs with no minimum base. The suite drops H1a–c rows whose parent "
        "base is < 10 POIs and sets flagged cells missing in H1/H2 (Amendment 1 A1.1). This is a "
        "measurement-validity improvement, not a construct change. The R1 fidelity check uses "
        "the unbased N6 rows.",
        "**N3 applied (domain re-check 2026-10-28).** For the AUC-based H1 the §5.6 ✓ rule "
        "\"SUPPORTED and at least 'small'\" is read as \"at least 'poor' (AUC ≥ 0.60)\", as for H2; "
        "otherwise an AUC row has no defined threshold.",
        "**N4 applied.** An H3a primary that is NOT SIGNIFICANT after BH with unadjusted p < 0.05 "
        'carries "nominally significant" in `notes`; the "consistent (rejected)" label stays.',
        '**N1 applied.** The Berlin level-stratified H3a/H3b rows (exploratory) define "high '
        'status" as S at the window start at or below the quantile matching the published '
        '"hoch" share of the pivot\'s edition, instead of S < 0.',
        '**N2 applied as wording.** "PLRs split in 2021 over-represent growth and new-build areas" '
        "(§3.3(1)) is treated as an expectation, not a checked fact; the decision to use native "
        "LOR-2021 counts does not depend on it.",
        "**N7 applied.** The population-weighted stock row (§5.2) and the A1.1 (iii) per-1k row are "
        "one row per H1a–c (H1c kept), counted once in the exploratory tally.",
        '**Fixed feature lists per design frame.** A1.1\'s "per-city/per-panel" ≥ 20% rule is '
        "evaluated on each design's own included rows (H1 cross-section; H2 pooled area-windows; "
        "BZR rows for R7), because the H1 and H2 frames are different snapshots. The rule still "
        "uses flags only, never the outcome; the lists are printed in §6 and were written to "
        "the metadata JSON before any fit.",
        "**Coefficients without a full-sample fit.** The top-10 standardised coefficients (§1.2) "
        "are the mean over the five training-fold fits, so no model is ever fitted on the full "
        "sample (§5.8(4)).",
        "**H3 DHS growth undefined at 0/0.** g(a, b) is undefined when both endpoints are zero "
        "(an area with no commercial POI at both dates); those area-windows drop from the H3 "
        "rows. One zero endpoint is handled as pre-registered (§5.1).",
        "**`THESIS_HYPOTHESES` (§6.2).** H1a and H1c were added and the non-directional (H1, H2) "
        "and ordering (H3a, H3b) forms recorded in new fields (`form`, `suite_expected_dir`). "
        "E1's own `expected_dir` keys are left unchanged so that E1's published output does not "
        "move; the suite reads only the new fields.",
        "**Not implemented: Moran's I on H3 residuals** (§8, a non-gating diagnostic). Left for a "
        "follow-up; it cannot change any verdict.",
    ]
    devs += [
        "**H1c without table tennis (D3b): operationalisation and consequence.** Table tennis is "
        "removed from both the Sport numerator and the Sports-and-Recreation parent, and the "
        "ADR-0017 base rule (parent >= 10) is applied to the reduced parent. Few PLRs reach ten "
        "non-table-tennis sport/recreation POIs, so the row has fewer than 20 clusters and is "
        "NO DATA in both panels (§5.3). The rule was fixed before the row was computed and is not "
        "relaxed after seeing its n.",
        "**H1b without döner/kebab (R3): not testable.** The taxonomy carries only one Fast Food "
        "type ('Other Fast Food') at the H1 snapshots, so no kebab type can be removed; the row is "
        'reported as NO DATA with that reason (§5.2: "if the taxonomy carries it").',
        "**H2 incremental with a wholly negative delta-AUC CI.** §5.6 maps H2 to 'stronger than "
        "thesis' only when the delta-AUC CI excludes 0, and to 'explained by current status "
        "level' when it includes 0. A CI entirely below 0 (OA lowers out-of-fold AUC once status "
        "level is in the model) is read with the second label, because OA then adds nothing "
        "beyond status level; 'stronger than thesis' requires a CI entirely above 0.",
        "**Hamburg panels not reported here.** The code supports `--city HH` (`HH/full`, "
        "`HH/modern`, phase-shift chains); Hamburg results and findings are #355's.",
    ]
    return devs


def write_berlin_findings(path: Path, records: list[dict], meta: dict) -> None:
    rec = {
        (r["panel"], r["hypothesis"], r["role"], r["operationalisation"]): r
        for r in records
        if r["city"] == "BER"
    }
    prim = {
        (r["panel"], r["hypothesis"]): r
        for r in records
        if r["city"] == "BER" and r["role"] == "primary"
    }
    mm, mt = meta.get("BER/modern", {}), meta.get("BER/thesis-era", {})
    sha = next((r["run_sha"] for r in records if r["city"] == "BER"), "")
    nboot = next((r["n_boot"] for r in records if r["city"] == "BER"), "")
    L: list[str] = []
    a = L.append
    a("# E1b — Berlin thesis hypothesis suite (#354): 2019–2025 and the thesis era re-analysed")
    a("")
    a(
        "> **Generated** by `analysis/thesis_hypothesis_suite.py --city BER` — do not hand-edit. "
        "Re-run the script to regenerate (§7.2)."
    )
    a("")
    a(f"- **Run:** `run_sha` {sha}; seed {SEED}; B = {nboot} cluster-bootstrap draws; α = 0.05.")
    a(
        "- **Binding design:** `docs/methodology/354-355-hypothesis-suite-preregistration.md` (rev. 2 + "
        "Amendment 1, 2026-10-31) and the domain review notes N1–N8 "
        "(`docs/methodology/354-355-preregistration-domain-review.md`)."
    )
    a(
        "- **Data:** OA from `int_poi_oa_native_panel` (zero-filled, `standard`, min-base flag; never "
        "E1's `load_oa_category_panel`), commercial C5 shares from `int_poi_c5_share_native` (native "
        "LOR-2021 back-cast for 2019/2020), status composites from the #360 meaning-named "
        "`stg_berlin_mss_indicators` columns (S1 + S3 + S4 / D1 + D3 + D4 only; no D5 / "
        "`displacement_subindex`, #362), published classes from `stg_berlin_mss`."
    )
    a(
        "- **Results table:** `docs/epic-e/thesis-hypothesis-suite-results.csv` (schema §7.1); fixed "
        "feature lists, coverage, validity and coefficients: `docs/epic-e/thesis-hypothesis-suite-metadata.json`."
    )
    a(
        "- **Gate:** methodology-bearing (R-C1): geo-DS and domain `Verdict: PASS` required before "
        "integration into `develop`."
    )
    a("")
    a("## 1. Headline: the eight hypotheses")
    a("")
    a(
        "Primary test per hypothesis (§5.1); significance = Benjamini–Hochberg-adjusted bootstrap p < 0.05 "
        "across the panel's 8 primaries (§5.5). ρ: higher status value = worse status (MSS polarity). "
        '*Italic* = "Holds?" mapping to the thesis verdict (§5.6).'
    )
    a("")
    a("| Hyp | Thesis verdict (Tabelle 6-16) | Thesis era re-analysed (2013–2019) | 2019–2025 |")
    a("|---|---|---|---|")
    for h in PRIMARY_ORDER:
        tv = THESIS_HYPOTHESES[h]["thesis_verdict"]
        a(
            f"| {h} | {tv} | {_cell(prim.get(('thesis-era', h)))} | {_cell(prim.get(('modern', h)))} |"
        )
    a("")
    a(
        "Primary operationalisations: H1 = grouped-CV out-of-fold AUC of a fixed L2 logit on all "
        "category-level OA passing the A1.1 feature rule (binary status, split at 0); H1a/H1b/H1c = "
        "Spearman of status with OA Cafe / OA Fast Food (category) / OA Sports and Recreation (domain); "
        "H2 = out-of-fold AUC of binary Dynamik composite on category OA at the window start, pooled "
        "windows; H3a = partial ρ(g(commercial C5)_P, D_F | D_P, S_pivot); H3b = partial ρ(D_P, "
        "g(commercial C5)_F | g(commercial C5)_P, S at the start of P); H3c = ρ(g(commercial C5)_W, "
        "D_W), same window. Status: thesis era H1 family = the thesis's own MSS-2016 status index × OSM "
        "2017; 2019–2025 H1 family = S composite of MSS 2025 × OSM 2025."
    )
    a("")
    for pk, label in (("modern", "2019–2025"), ("thesis-era", "Thesis era")):
        m = meta.get(f"BER/{pk}", {})
        if m.get("direction"):
            a(f"- **{label}, H3a/H3b together:** {m['direction']}.")
    a("")
    a(
        "**What FDR means (§5.5).** Within each panel, Benjamini–Hochberg bounds the expected share of "
        "false claims among the rows marked significant; it does not protect each row individually. "
        "`p_holm` (Holm 1979, family-wise) is reported in the CSV for transparency and does not decide "
        "verdicts."
    )
    flagged = [
        f"{r['panel']} {r['hypothesis']}"
        for r in prim.values()
        if "not at family-wise" in r["notes"]
    ]
    a(
        f'Primaries significant under BH but not under Holm ("significant at FDR 5%; not at family-wise '
        f'5%"): {", ".join(flagged) if flagged else "none"}.'
    )
    nominal = [
        f"{r['panel']} {r['hypothesis']}"
        for r in prim.values()
        if "nominally significant" in (r["holds"] + r["notes"])
    ]
    a(
        f'Rows labelled "nominally significant" (unadjusted p < 0.05, not significant after BH; the '
        f"thesis applied no multiplicity correction): {', '.join(nominal) if nominal else 'none'}."
    )
    a("")
    a("## 2. Notes per hypothesis")
    a("")
    for pk, label in (("modern", "2019–2025"), ("thesis-era", "Thesis era")):
        m = meta.get(f"BER/{pk}", {})
        a(f"### {label}")
        a("")
        for h in ("H1a", "H1b", "H1c"):
            c = m.get("coverage", {}).get(h)
            if c:
                parent = "gastronomy outlets" if h in ("H1a", "H1b") else "POIs of any domain"
                a(
                    f"- **{h} coverage (N5).** Among neighbourhoods with at least ten {parent} (the "
                    f"parent base needed to measure the mix): n retained {c['n_retained']} of "
                    f"{c['n_total']}. Retained: {c['retained']}; dropped: {c['dropped']}. "
                    + (
                        "The result describes these areas, not the whole city."
                        if c["n_retained"] < c["n_total"]
                        else "No area is dropped, so the result covers the full frame."
                    )
                )
        a("")
    a(
        "- **H1a (R2).** The thesis's only significant café row was population-weighted stock at PLR "
        "(Pearson −0.14; Spearman not significant), and its OA rows were null (PLR OA ρ = −0.02). An "
        'OA-primary result of "consistent (still unclear)" is therefore expected even if nothing '
        "changed. Papachristos et al. (2011) concerns the *growth* of coffee shops; the café-growth "
        "cross-lag is in the exploratory rows (R4)."
    )
    a(
        "- **H1b.** A deprivation hypothesis (Pearce et al. 2007, New Zealand), phrased at area level."
    )
    comm = {
        pk: rec.get(
            (
                pk,
                "H1",
                "secondary",
                "commercial-only category OA (4 commercial domains) => binary status",
            )
        )
        for pk in ("modern", "thesis-era")
    }
    for pk, r in comm.items():
        if r:
            ok = r["verdict"] == SUPPORTED and r["effect_label"] in (
                "poor",
                "acceptable",
                "excellent",
            )
            a(
                f"- **H1 public wording ({pk}).** Commercial-only H1 row: AUC {_f(r['estimate'])} "
                f"[{_f(r['ci_low'])}, {_f(r['ci_high'])}], {r['verdict']} → public text may say "
                + (
                    '"businesses".'
                    if ok and prim.get((pk, "H1"), {}).get("verdict") == SUPPORTED
                    else 'only "the local mix of shops, services and public facilities" (§9).'
                )
            )
    a("")
    a("### H1c in the thesis (binding text, §1.3)")
    a("")
    a(H1C_TEXT)
    a("")
    a("## 3. H3a/H3b per pivot and pivot heterogeneity (§3.4)")
    a("")
    a("| Panel | Hyp | Pivot | ρ [95% CI] | n | verdict (CI) |")
    a("|---|---|---|---|---|---|")
    for r in records:
        if r["city"] == "BER" and r["operationalisation"].startswith(
            ("H3a at pivot", "H3b at pivot")
        ):
            a(
                f"| {r['panel']} | {r['hypothesis']} | {r['pivots']} | {_f(r['estimate'])} [{_f(r['ci_low'])}, {_f(r['ci_high'])}] | {r['n']} | {r['verdict']} |"
            )
    a("")
    for pk in ("modern", "thesis-era"):
        for h, d in meta.get(f"BER/{pk}", {}).get("pivot_diff", {}).items():
            a(
                f"- {pk} {h}: ρ(pivot {d['last']}) − ρ(pivot {d['first']}) = {_f(d['estimate'])} "
                f"[{_f(d['ci_low'])}, {_f(d['ci_high'])}] → "
                + (
                    "**heterogeneous: the pooled result depends on the window.**"
                    if d["heterogeneous"]
                    else "no detectable heterogeneity."
                )
            )
    a("")
    a("## 4. Composite validity check (§3.2, D1d)")
    a("")
    a(
        "Spearman of the continuous composites with the published classes, per edition. Threshold 0.80."
    )
    a("")
    a(
        "| Panel | Edition | ρ(S, status class) | S judgement | ρ(D, Dynamik class) | D judgement | n |"
    )
    a("|---|---|---|---|---|---|---|")
    div_s, div_d = [], []
    for pk in ("thesis-era", "modern"):
        for v in meta.get(f"BER/{pk}", {}).get("validity", []):
            ok_s = v["rho_S_status_class"] >= 0.80
            ok_d = v["rho_D_dynamik_class"] >= 0.80
            if not ok_s:
                div_s.append(f"{pk} {v['edition']}")
            if not ok_d:
                div_d.append(f"{pk} {v['edition']}")
            js = "≥ 0.80" if ok_s else "**below 0.80: diverges**"
            jd = "≥ 0.80" if ok_d else "**below 0.80: diverges**"
            a(
                f"| {pk} | {v['edition']} | {v['rho_S_status_class']:.3f} | {js} | {v['rho_D_dynamik_class']:.3f} | {jd} | {v['n_S']} |"
            )
    a("")
    for label, div, rows_desc in (
        ("status composite S", div_s, "H1 family"),
        ("change composite D", div_d, "H2 and H3a-c"),
    ):
        if div:
            a(
                f"**Disclosure (§3.2):** the {label} diverges from the official classification "
                f"(Spearman < 0.80) in {', '.join(div)}. The published-class secondary rows of the "
                f'{rows_desc} (role `secondary`, "published-class version") must be read beside the '
                "primaries there. Context, not an excuse: the published Dynamik class has three "
                "heavily tied levels (most PLRs are 'stabil'), which caps the attainable rank "
                "correlation, and in 2015/2017 and 2023/2025 the official index also uses S2/D2; "
                "2019 and 2021 have no S2 and still fall below 0.80. The threshold is applied as "
                "pre-registered."
            )
        else:
            a(f"The {label} meets the 0.80 threshold in every edition.")
            a("")
    ti = mt.get("thesis_index_vs_S")
    if ti:
        a("")
        a(
            f"Thesis era: Spearman(thesis status_index, S_{ti['edition']} composite) = {ti['rho']:.3f} (n = {ti['n']})."
        )
    a("")
    a(
        "**Source attributes per composite (#360).** Every composite is built from the meaning-named "
        "columns only; the WFS attribute that feeds each one:"
    )
    a("")
    for pk in ("thesis-era", "modern"):
        for v in meta.get(f"BER/{pk}", {}).get("validity", []):
            a(f"- {pk} {v['edition']}: {v['sources_S']}; {v['sources_D']}.")
    a("")
    a(
        "**Definition breaks (#360 binding input).** Change values that cross a definition break carry a "
        "`definition break` note in the CSV:"
    )
    a("")
    brk = {}
    for pk in ("thesis-era", "modern"):
        brk.update(meta.get(f"BER/{pk}", {}).get("definition_breaks", {}))
    for e in sorted(brk):
        a(f"- {brk[e]}.")
    a(
        "- Levels are never compared across the 2017/2019 S1 seam: S is z-scored within edition (§3.2)."
    )
    a("")
    a("## 5. Shock disclosure (binding text, §3.4)")
    a("")
    a(SHOCK_TEXT)
    a("")
    a("## 6. AUC comparability and top coefficients (binding text, §1.2)")
    a("")
    a(AUC_TEXT)
    a("")
    for pk in ("modern", "thesis-era"):
        for key in ("H1", "H2"):
            co = meta.get(f"BER/{pk}", {}).get("coefficients", {}).get(key)
            if co:
                a(
                    f"- **{pk} {key}:** "
                    + ", ".join(f"{n.replace('oa_cat:', '')} ({c:+.3f})" for n, c in co)
                )
    a("")
    a(
        "**Fixed feature lists (A1.1)** — a category enters if its min-base flag is unset in ≥ 20% of the "
        "design's included rows; sorted lexicographically."
    )
    a("")
    for pk in ("modern", "thesis-era"):
        fl = meta.get(f"BER/{pk}", {}).get("feature_lists", {})
        for k in ("H1_category", "H2_category"):
            if k in fl:
                a(f"- {pk} {k} ({len(fl[k])}): {', '.join(fl[k])}")
    a("")
    a("## 7. Thesis-era fidelity check (R1 with N6)")
    a("")
    a(
        "Unbased OA rows (zero-filled, no minimum base, full frame) against the thesis's PLR OA Spearman "
        "(Tabellen 6-12 to 6-14). A gap is a pipeline divergence, not a finding (Epic B framing)."
    )
    a("")
    a("| Hyp | Thesis PLR OA ρ | Suite (unbased) ρ | n | gap |")
    a("|---|---|---|---|---|")
    for h, v in (mt.get("fidelity") or {}).items():
        gap = "–" if v["suite"] is None else f"{v['suite'] - v['thesis']:+.3f}"
        a(
            f"| {h} | {v['thesis']:+.2f} | {'–' if v['suite'] is None else f'{v["suite"]:+.3f}'} | {v['n']} | {gap} |"
        )
    a("")
    a("## 8. Secondary, sensitivity and exploratory rows")
    a("")
    a(
        "None of these can change a headline verdict. They are uncorrected and use the unadjusted 95% "
        "cluster-bootstrap CI (§5.4)."
    )
    a("")
    a("| Panel | Hyp | Role | Operationalisation | Estimate [95% CI] | n | Verdict | Notes |")
    a("|---|---|---|---|---|---|---|---|")
    n_expl = 0
    for r in records:
        if r["city"] != "BER" or r["role"] == "primary":
            continue
        if r["verdict"] in (SUPPORTED, CONTRADICTED, NOT_SIGNIFICANT):
            n_expl += 1
        note = r["notes"].replace("|", "/")
        a(
            f"| {r['panel']} | {r['hypothesis']} | {r['role']} | {r['operationalisation']} | {_f(r['estimate'])} [{_f(r['ci_low'])}, {_f(r['ci_high'])}] | {r['n']} | {r['verdict'] or 'descriptive'} | {note} |"
        )
    a("")
    a(
        f"**Exploratory-row tally (§5.5).** {n_expl} non-primary rows carry a verdict across both Berlin "
        f"panels (descriptive and NO DATA rows excluded; the population-weighted row counts once per "
        f"H1a–c, N7). At α = 0.05 about {0.05 * n_expl:.1f} would be expected significant by chance alone."
    )
    a("")
    a("## 9. Comparability (binding text)")
    a("")
    a(COMPARABILITY_TEXT)
    a("")
    a("## 10. What the suite must not claim (binding text, §9)")
    a("")
    a(MUST_NOT_TEXT)
    a("")
    a("## 11. Limitations")
    a("")
    a(
        "- **#337 node→way:** every row is POI-based; OSM features mapped as ways are not yet counted "
        "as points. Deferred; disclosed for all rows."
    )
    a(
        "- **OSM completeness** grew over both eras; C5 shares and OA are ratio measures robust to "
        "city-wide growth (index-definition §2.4), not to spatially uneven mapping diffusion."
    )
    a("- **Refugee accommodation:** no open small-area source; disclosed, not corrected (§3.4).")
    a("- **EWR panel (#340 part 2, #341)** is out of scope; E1 §4 remains.")
    a("")
    a("## 12. Deviations from the pre-registration")
    a("")
    a(
        "Dated 2026-10-31/2026-11-01. Items 1-11 were fixed in code before any suite statistic "
        "was computed. Items 12-15 record consequences first seen in a low-B smoke run (an "
        "untestable or thin sensitivity row, a delta-AUC case the mapping does not spell out); "
        "none changed a rule after results were seen. None changes a hypothesis, variable, "
        "expected sign, family or verdict rule."
    )
    a("")
    for i, dv in enumerate(_deviations(mm, mt), start=1):
        a(f"{i}. {dv}")
    a("")
    path.write_bytes(("\n".join(L) + "\n").encode("utf-8"))


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------


def run_panel(
    con, panel: Panel, n_boot: int, sha: str, metadata_path: Path | None
) -> tuple[list[dict], dict]:
    pdata = load_berlin(con, panel) if panel.city == "BER" else load_hamburg(con, panel)
    if metadata_path is not None:
        write_feature_lists_before_fit(metadata_path, pdata)
    run = SuiteRun(pdata, n_boot, sha)
    rows = run.run()
    return rows, run.meta


def main(argv: Sequence[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    ap.add_argument("--city", required=True, choices=["BER", "HH"])
    ap.add_argument("--panel", nargs="*", choices=["modern", "thesis-era", "full"], default=None)
    ap.add_argument("--n-boot", type=int, default=N_BOOT)
    ap.add_argument("--db", type=Path, default=DUCKDB_PATH)
    ap.add_argument("--results-csv", type=Path, default=RESULTS_CSV)
    ap.add_argument("--metadata-json", type=Path, default=METADATA_JSON)
    ap.add_argument("--findings", type=Path, default=FINDINGS_BER)
    ap.add_argument("--no-findings", action="store_true")
    args = ap.parse_args(argv)
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    panels = args.panel or (["modern", "thesis-era"] if args.city == "BER" else ["full", "modern"])
    for pk in panels:
        if (args.city, pk) not in PANELS:
            ap.error(f"panel {pk!r} is not defined for {args.city}")
    import duckdb

    con = duckdb.connect(str(args.db), read_only=True)
    sha = run_sha()
    all_rows, metas = [], {}
    for pk in panels:
        panel = PANELS[(args.city, pk)]
        print(f"[suite] {panel.city}/{panel.panel}: {panel.label}", flush=True)
        rows, meta = run_panel(con, panel, args.n_boot, sha, args.metadata_json)
        prev = {}
        if args.metadata_json.exists():
            prev = json.loads(args.metadata_json.read_text(encoding="utf-8")).get(
                f"{panel.city}/{panel.panel}", {}
            )
        meta["feature_lists_prefit"] = prev.get("feature_lists_prefit", {})
        metas[f"{panel.city}/{panel.panel}"] = meta
        all_rows.extend(rows)
        for r in rows:
            if r["role"] == "primary":
                print(
                    f"  {r['hypothesis']:4s} est={_fmt(r['estimate'])} ci=[{_fmt(r['ci_low'])},{_fmt(r['ci_high'])}] n={r['n']} p_bh={_fmt(r['p_bh'], 'p')} {r['verdict']} | {r['holds']}",
                    flush=True,
                )
    con.close()
    records = write_results(
        rows_to_records(all_rows), args.results_csv, [(args.city, pk) for pk in panels]
    )
    meta_all = write_metadata(args.metadata_json, metas)
    print(f"[suite] wrote {args.results_csv} and {args.metadata_json}")
    if args.city == "BER" and not args.no_findings:
        if {"BER/modern", "BER/thesis-era"} <= set(meta_all):
            write_berlin_findings(
                args.findings, [r for r in records if r["city"] == "BER"], meta_all
            )
            print(f"[suite] wrote {args.findings}")
        else:
            print(
                "[suite] findings need both BER panels in the metadata; run --city BER without --panel"
            )
    elif args.city == "HH":
        print(
            "[suite] Hamburg findings (docs/epic-h/H-thesis-hypothesis-suite-findings.md) are #355's; not written"
        )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
