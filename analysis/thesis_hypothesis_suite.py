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
  uv run python analysis/thesis_hypothesis_suite.py --city HH             # both HH panels (#355)

Outputs (§7): docs/epic-e/thesis-hypothesis-suite-results.csv (one CSV for all panels; a run
replaces only its own panels' rows), docs/epic-e/thesis-hypothesis-suite-metadata.json
(fixed feature lists written before any fit, validity check / Hamburg class context,
coverage, coefficients), and the generated findings (never hand-edited):
docs/epic-e/E1b-berlin-hypothesis-suite-findings.md (--city BER) and
docs/epic-h/H-thesis-hypothesis-suite-findings.md (--city HH: HH/full and HH/modern side by
side, phase shifts, §4.5 comparability and construct text, Hamburg shock timing, pivot-2016
caveat, phase-A checks, deviations).
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
FINDINGS_HH = REPO / "docs" / "epic-h" / "H-thesis-hypothesis-suite-findings.md"

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


def hh_shock_notes(s: int, e: int) -> list[str]:
    """§4.3 / D7 Hamburg shock timing, per window. Sozialmonitoring edition E carries data
    as of 31 Dec (E-1) (phase A §3), so window (s, e) spans Dec(s-1) -> Dec(e-1). Binding
    for the windows ending 2022 (pandemic) and 2025 (Rechtskreiswechsel, 2023 reforms); the
    2016-2018 refugee entry into SGB II is the Hamburg counterpart of the #354 thesis-era
    line (domain sign-off 354 C3)."""
    d0, d1 = s - 1, e - 1
    out = []
    if d0 <= 2017 and d1 >= 2016:
        out.append(
            "includes recognised 2015-16 refugees entering SGB II, mainly 2016-2018 (local, "
            "near large accommodation sites; domain sign-off 354 C3)"
        )
    if d0 <= 2020 and d1 >= 2020:
        out.append(
            "includes the 2020-21 pandemic: Dynamik can correlate with gastronomy through "
            "hospitality/culture job losses rather than through a change in who lives there "
            "(§4.3, counterpart of §3.4)"
        )
    if d0 <= 2021 and d1 >= 2022:
        out.append(
            "includes the 1 June 2022 Rechtskreiswechsel (Ukrainian refugees into SGB II; "
            "BA-Statistik 2022)"
        )
    if d0 <= 2022 and d1 >= 2023:
        out.append(
            "includes the 1 Jan 2023 Bürgergeld and Wohngeld-Plus reforms and continuing "
            "refugee entry into SGB II (§4.3, D7)"
        )
    return out


def _hh_shock_map(*chains: tuple[tuple[int, int], ...]) -> dict:
    # tuples of individual notes, so rows spanning several windows can de-duplicate them
    return {w: tuple(hh_shock_notes(*w)) for ch in chains for w in ch if hh_shock_notes(*w)}


# §4.5 / domain review D8e: every Hamburg H1a-c statement names the status construct.
HH_CONSTRUCT_NOTE = (
    "status = Hamburg Sozialmonitoring Statusindex class, a composite of seven indicators "
    "that include the share of children and young people with a migration background and "
    "school-leaving outcomes; an association with it is an association with that composite, "
    "not with any one group (§4.5)"
)
HH_FULL_WINDOWS = ((2013, 2016), (2016, 2019), (2019, 2022), (2022, 2025))
HH_PHASE_CHAINS = (
    ((2011, 2014), (2014, 2017), (2017, 2020), (2020, 2023)),
    ((2012, 2015), (2015, 2018), (2018, 2021), (2021, 2024)),
)
HH_MODERN_WINDOWS = ((2019, 2022), (2022, 2025))

# §3.1 / §4.3: the Dynamik of status edition E covers OSM snapshots [E - span, E].
DYNAMIK_SPAN = {"BER": 2, "HH": 3}
# Year of the level each status-level column refers to (for the §5.8(2) control check).
LEVEL_YEAR_COL = {
    "S_start": "s_start_year",
    "S_cls_start": "s_cls_start_year",
    "S_end": "s_end_year",
    "S_cls_end": "s_end_year",
}
# Data-year columns of each change series on a window row (start, end).
CHANGE_YEAR_COLS = {
    "D": ("d_start_year", "d_end_year"),
    "D_cls": ("d_start_year", "d_end_year"),
    "g_commercial_c5": ("c5_year_s", "c5_year_e"),
    "g_total_c5": ("c5_year_s", "c5_year_e"),
    "g_cafe_c5": ("oa_year_s", "oa_year_e"),
    "d_oa_basket": ("oa_year_s", "oa_year_e"),
}

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
        windows=HH_FULL_WINDOWS,
        pivots=(2016, 2019, 2022),
        h1_edition=2025,
        h1_snapshot=2025,
        h1_status="classes",
        shock_notes=_hh_shock_map(HH_FULL_WINDOWS, *HH_PHASE_CHAINS),
        phase_chains=HH_PHASE_CHAINS,
    ),
    ("HH", "modern"): Panel(
        city="HH",
        panel="modern",
        label="Hamburg pivot 2022 (era-split comparison)",
        vintage="current",
        grain="hh_gebiet",
        cluster_unit="stadtteil",
        windows=HH_MODERN_WINDOWS,
        pivots=(2022,),
        h1_edition=2025,
        h1_snapshot=2025,
        h1_status="classes",
        shock_notes=_hh_shock_map(HH_MODERN_WINDOWS),
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
    for H3c; the H3b start-of-window control dates from <= the predictor window start.

    The arrays must be the DATA years carried on each row (OA / C5 snapshot actually joined,
    status edition behind D and its Dynamik start, the year the level control refers to),
    never the window labels used as merge keys. Rows without a data year carry no value and
    are dropped by every estimator, so they are skipped here.
    """
    ps, pe, os_, oe = (
        np.asarray(a, dtype=float) for a in (pred_start, pred_end, out_start, out_end)
    )
    ok = (
        _years_ok(ps, pe, os_, oe)
        if control_year is None
        else _years_ok(ps, pe, os_, oe, control_year)
    )
    assert ok.any(), f"{kind}: no row carries data years"  # noqa: S101 -- R-C3
    ps, pe, os_, oe = ps[ok], pe[ok], os_[ok], oe[ok]
    if control_year is not None:
        control_year = np.asarray(control_year, dtype=float)[ok]
    if kind in ("H2", "H3a", "H3b"):
        assert np.all(pe <= os_), f"{kind}: predictor window ends after the outcome window starts"  # noqa: S101 -- R-C3
    elif kind == "H3c":
        assert np.all((ps == os_) & (pe == oe)), "H3c: predictor and outcome windows differ"  # noqa: S101 -- R-C3
    if kind == "H3b" and control_year is not None:
        cy = np.asarray(control_year, dtype=float)
        assert np.all(cy <= ps), (  # noqa: S101 -- R-C3
            "H3b: start-of-window control dates after the predictor window start"
        )


def _years_ok(*arrays) -> np.ndarray:
    mask = np.ones(len(np.asarray(arrays[0])), dtype=bool)
    for a in arrays:
        mask &= np.isfinite(np.asarray(a, dtype=float))
    return mask


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


def tie_ceiling(classes: np.ndarray) -> float | None:
    """Highest Spearman any continuous measure can reach against a tied ordinal class.

    The ideal measure orders every area consistently with its class (strictly increasing
    across classes, ties broken arbitrarily within a class); its Spearman with the class is
    the ceiling. Asymptotically sqrt(12 * sum_k p_k (m_k - 1/2)^2), with p_k the class share
    and m_k the class midrank fraction (domain sign-off 354 §3, C2).
    """
    c = np.asarray(classes, dtype=float)
    c = c[np.isfinite(c)]
    if len(c) < 3 or len(np.unique(c)) < 2:
        return None
    ideal = np.empty(len(c))
    ideal[np.argsort(c, kind="stable")] = np.arange(len(c), dtype=float)
    return float(stats.spearmanr(c, ideal).statistic)


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


def oof_diagnostics(x: np.ndarray, y: np.ndarray, groups: np.ndarray, windows: pd.Series) -> dict:
    """#355 review MED 2 (descriptive, no verdict): where an out-of-fold AUC comes from.
    Same deterministic GroupKFold as the primary row; AUC within each test fold and within
    each pooled window, on the pooled out-of-fold scores."""
    y = np.asarray(y).astype(int)
    res = grouped_oof_auc(x, y, groups, n_splits=N_SPLITS)
    if res["auc"] is None:
        return {"pooled_auc": None, "within_fold_auc": [], "per_window_auc": {}}
    oof = res["oof"]
    w = np.asarray(windows)
    return {
        "pooled_auc": res["auc"],
        "within_fold_auc": [auc_score(y[te], oof[te]) for _tr, te in res["folds"]],
        "fold_n_test": [int(len(te)) for _tr, te in res["folds"]],
        "per_window_auc": {
            str(int(e)): auc_score(y[w == e], oof[w == e]) for e in sorted(pd.unique(w))
        },
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
    # Unweighted city means of meaning-named indicators per edition (findings context, C3).
    edition_means: dict = field(default_factory=dict)
    # Hamburg: published class counts per edition (phase A §4 reference seed), to verify
    # in-script that the classes the suite consumes are the published ones (§2.1(4)).
    published_counts: pd.DataFrame | None = None
    # Loader facts reported in the findings (e.g. Hamburg Stadtteil name variants).
    context: dict = field(default_factory=dict)
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
          AND (poi_domain_h = ? OR poi_domain_h = 'Gastronomy')
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
    # §5.8(2) data years: D_E covers [E-2, E] (§3.1); the rebuilt level anteil_E - dynamik_E
    # refers to Dec(E-3), i.e. OSM snapshot E-2 (§3.1).
    status["d_start_year"] = status["edition"] - DYNAMIK_SPAN["BER"]
    status["s_start_year"] = np.where(
        status["S_start_rebuilt"].notna(), status["edition"] - DYNAMIK_SPAN["BER"], np.nan
    )

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
        edition_means={
            "arbeitslose_dynamik": {
                int(k): float(v)
                for k, v in ind[ind["indicator"] == "arbeitslose_dynamik"]
                .groupby("edition")["indicator_value"]
                .mean()
                .items()
            }
        },
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
    # §4.3: the Dynamik of edition E covers [E-3, E]; the level control is looked up per row.
    status["d_start_year"] = status["edition"] - DYNAMIK_SPAN["HH"]
    status["s_start_year"] = np.nan
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
    # §2.1(4) / phase A §4: published class counts (annexes 2016-2025, reference seed).
    pub = con.execute(
        """
        SELECT edition, index_name, expected_code, n_gebiete
        FROM main_seeds.seed_hh_sozialmonitoring_published_class_counts
        ORDER BY edition, index_name, expected_code
        """
    ).df()
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
        published_counts=pub,
        context={
            # §4.2: a Gebiet's Stadtteil label varies across editions for this many Gebiete
            # (spelling variants and renamed Stadtteile); the latest edition decides.
            "n_gebiete_stadtteil_label_varies": int(
                (
                    soz.dropna(subset=["stadtteil_name"])
                    .groupby("area_code")["stadtteil_name"]
                    .nunique()
                    > 1
                ).sum()
            ),
        },
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
    oa_year = sub.groupby("area_code")["snapshot_year"].agg(
        lambda s: float(s.iloc[0]) if s.nunique() == 1 else np.nan
    )
    blocks = [vint.rename("vintage"), oa_year.rename("oa_year")]
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


def _status_start(pdata: PanelData, s: int, e: int) -> dict[str, pd.Series]:
    """Status level at the start of window (s, e): Berlin rebuilt S_(e-2) (§3.1); Hamburg
    class at edition s = e-3 (§4.3). Also the published class at s (secondary). Each level
    comes with the data year it refers to (§5.8(2))."""
    end = _status_at(pdata, e)
    start = _status_at(pdata, s)
    empty = pd.Series(dtype=float)
    cls_start = start["S_cls"].astype(float) if not start.empty else empty
    cls_year = start["edition"].astype(float) if not start.empty else empty
    if pdata.panel.city == "BER":
        lvl, lvl_year = end["S_start_rebuilt"], end["s_start_year"].astype(float)
    else:
        lvl = start["S"] if not start.empty else empty
        lvl_year = cls_year
    return {"lvl": lvl, "lvl_year": lvl_year, "cls": cls_start, "cls_year": cls_year}


def h2_frame(pdata: PanelData, windows: Sequence[tuple[int, int]]) -> pd.DataFrame:
    """H2 pooled area-windows: OA at the window start (prevOSM_stock) -> Dynamik over the
    window (Tabelle 6-16 H2; §5.1)."""
    rows = []
    for s, e in windows:
        end = _status_at(pdata, e)
        if end.empty:
            continue
        st0 = _status_start(pdata, s, e)
        st = pd.DataFrame(
            {
                "D": end["D"],
                "D_cls": end["D_cls"].astype(float),
                "S_start": st0["lvl"].reindex(end.index),
                "S_cls_start": st0["cls"].reindex(end.index),
                # §5.8(2) data years: status edition behind D and its Dynamik start
                "out_start": end["d_start_year"].astype(float),
                "out_end": end["edition"].astype(float),
            }
        )
        wide = oa_wide(pdata, s)
        df = st.join(wide, how="inner").reset_index().rename(columns={"index": "area_code"})
        df["w_start"], df["w_end"] = s, e
        # predictor = OA at the snapshot actually joined (prevOSM_stock)
        df["pred_start"] = df["oa_year"]
        df["pred_end"] = df["oa_year"]
        rows.append(df)
    if not rows:
        return pd.DataFrame()
    out = pd.concat(rows, ignore_index=True)
    out = out.sort_values(["area_code", "w_end"]).reset_index(drop=True)
    assert_temporal_order(
        "H2", out["pred_start"], out["pred_end"], out["out_start"], out["out_end"]
    )
    return _attach_cluster_vintage(pdata, out)


def _basket(wide: pd.DataFrame) -> pd.Series:
    """E1 #168 OA basket: mean domain OA of the four commercial domains (flagged -> NaN)."""
    feats = oa_features(wide, COMMERCIAL_DOMAINS, "dom")
    return feats.mean(axis=1, skipna=False)


def window_rows(pdata: PanelData, windows: Sequence[tuple[int, int]]) -> pd.DataFrame:
    """One row per (area, window) with status change, commercial change and levels."""
    c5 = pdata.c5.assign(c5_year=pdata.c5["snapshot_year"].astype(float)).set_index(
        ["area_code", "snapshot_year"]
    )
    rows = []
    for s, e in windows:
        end = _status_at(pdata, e)
        if end.empty:
            continue
        st0 = _status_start(pdata, s, e)
        df = pd.DataFrame(index=end.index)
        df["D"] = end["D"]
        df["D_cls"] = end["D_cls"].astype(float)
        df["S_end"] = end["S"]
        df["S_cls_end"] = end["S_cls"].astype(float)
        df["S_start"] = st0["lvl"].reindex(df.index)
        df["S_cls_start"] = st0["cls"].reindex(df.index)
        # §5.8(2) data years carried on the row
        df["d_start_year"] = end["d_start_year"].astype(float)
        df["d_end_year"] = end["edition"].astype(float)
        df["s_end_year"] = end["edition"].astype(float)
        df["s_start_year"] = st0["lvl_year"].reindex(df.index)
        df["s_cls_start_year"] = st0["cls_year"].reindex(df.index)
        cs = c5.xs(s, level="snapshot_year") if s in c5.index.get_level_values(1) else None
        ce = c5.xs(e, level="snapshot_year") if e in c5.index.get_level_values(1) else None
        if cs is None or ce is None:
            continue
        cs, ce = cs.reindex(df.index), ce.reindex(df.index)
        # §5.1: DHS growth of the commercial C5 share; total share secondary (§5.2).
        df["g_commercial_c5"] = dhs_growth(cs["commercial_c5_share"], ce["commercial_c5_share"])
        df["g_total_c5"] = dhs_growth(cs["total_c5_share"], ce["total_c5_share"])
        df["vintage_s"], df["vintage_e"] = cs["area_vintage"], ce["area_vintage"]
        df["c5_year_s"], df["c5_year_e"] = cs["c5_year"], ce["c5_year"]
        ws, we = oa_wide(pdata, s), oa_wide(pdata, e)
        df["oa_year_s"] = ws["oa_year"].reindex(df.index) if "oa_year" in ws else np.nan
        df["oa_year_e"] = we["oa_year"].reindex(df.index) if "oa_year" in we else np.nan
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
    """build_cross_lagged (directional_inference, extended §6.1) on window rows.

    Besides the levels it carries the DATA years of both change series on the P and F rows
    and the year each level control refers to, so `assert_cross_lag_order` checks §5.8(2) on
    data, not on the window labels that are the merge key."""
    if rows.empty:
        return pd.DataFrame()
    ds, de = CHANGE_YEAR_COLS[status_col]
    gs, ge = CHANGE_YEAR_COLS[poi_col]
    cl = build_cross_lagged(
        rows,
        k=1,
        time_cols=("w_start", "w_end"),
        delta_cols=(status_col, poi_col),
        level_cols={
            "S_pivot": (s_pivot_col, "p"),
            "S_start": (s_start_col, "p"),
            "S_pivot_year": (LEVEL_YEAR_COL[s_pivot_col], "p"),
            "S_start_year": (LEVEL_YEAR_COL[s_start_col], "p"),
            "d4": ("d4_end", "p"),
            "p_end": ("w_end", "p"),
            "f_start": ("w_start", "f"),
            "status_start_p": (ds, "p"),
            "status_end_p": (de, "p"),
            "status_start_f": (ds, "f"),
            "status_end_f": (de, "f"),
            "poi_start_p": (gs, "p"),
            "poi_end_p": (ge, "p"),
            "poi_start_f": (gs, "f"),
            "poi_end_f": (ge, "f"),
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


def assert_cross_lag_order(cl: pd.DataFrame, which: str, timing: str) -> None:
    """§5.8(2) on a cross_lag_frame, from data years. H3a: POI change over P ends no later
    than the status change over F starts. H3b: status change over P ends no later than the
    POI change over F starts, and the start-of-window level control refers to a year no
    later than the start of the predictor window."""
    if which == "H3a":
        assert_temporal_order(
            "H3a", cl["poi_start_p"], cl["poi_end_p"], cl["status_start_f"], cl["status_end_f"]
        )
    else:
        assert_temporal_order(
            "H3b",
            cl["status_start_p"],
            cl["status_end_p"],
            cl["poi_start_f"],
            cl["poi_end_f"],
            control_year=cl["S_start_year"] if timing == "window_start" else None,
        )


def assert_same_window(rows: pd.DataFrame, poi_col: str, status_col: str) -> None:
    """§5.8(2) H3c: the POI change and the status change span the same data years."""
    gs, ge = CHANGE_YEAR_COLS[poi_col]
    ds, de = CHANGE_YEAR_COLS[status_col]
    assert_temporal_order("H3c", rows[gs], rows[ge], rows[ds], rows[de])


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
        """Shock notes of every window a row spans (§3.4 / §4.3: every row that includes a
        window names its mechanism), each note once, in window order."""
        out: list[str] = []
        for w in windows:
            v = self.p.shock_notes.get(w)
            for n in (v,) if isinstance(v, str) else (v or ()):
                if n not in out:
                    out.append(n)
        return out

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
        x = oa_features(fr, feats, "cat")
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
        xd = oa_features(fr, doms, "dom")
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
        xc = oa_features(fr, comm, "cat")
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
        x = oa_features(fr, feats, "cat")
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
                notes=[cov_note, *([HH_CONSTRUCT_NOTE] if p.city == "HH" else [])],
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
        x = oa_features(fr, feats, "cat")
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
        if p.city == "HH":
            self.meta["h2_oof_diagnostics"] = oof_diagnostics(
                x.to_numpy(float), y.to_numpy(int), fr["cluster"].to_numpy(object), fr["w_end"]
            )
        doms = fixed_feature_list(fr, "dom")
        self.meta["feature_lists"]["H2_domain"] = doms
        xd = oa_features(fr, doms, "dom")
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
            notes=[
                *notes,
                (
                    f"out-of-fold AUC: status level alone {res['auc_base']:.3f}; with the category "
                    f"OA mix {res['auc_full']:.3f}"
                )
                if res.get("auc_base") is not None
                else "AUCs not available",
            ],
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
                xc = oa_features(frc, feats, "cat")
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
        assert_cross_lag_order(cl, which, timing)
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
                    [
                        note,
                        *self.shock_notes(
                            [w for w in p.windows if w[1] in d4_piv or w[0] in d4_piv]
                        ),
                        *self.break_notes(
                            [e for s0, e in p.windows if e in d4_piv or s0 in d4_piv]
                        ),
                    ],
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
                    # #355 review MED 1: the row spans P (ends at pv) and F (starts at pv)
                    [*self.shock_notes([w for w in p.windows if pv in (w[0], w[1])]), *bn],
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
                        else "no detectable pivot heterogeneity (CI includes 0)",
                        *self.shock_notes(p.windows),
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
                            "published-class version (§5.2); rows without a class at the control date drop",
                            *self.shock_notes(p.class_windows),
                            *self.break_notes([e for _s, e in p.class_windows]),
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
                [cut_note, *self.shock_notes(p.windows)],
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
        dcol = "D_cls" if p.city == "HH" else "D"

        def one(poi_col, sub, role, op, nts, outc=status_name, dc=dcol):
            self.guard([poi_col], [], outc)
            assert_same_window(sub, poi_col, dc)
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
                    [
                        "published-class version (§5.2)",
                        *self.shock_notes(p.class_windows),
                        *self.break_notes([e for _s, e in p.class_windows]),
                    ],
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
            shock = self.shock_notes(chain)
            cl = self._prep_cl(rows, "D", "g_commercial_c5")
            if not cl.empty:
                pivots = sorted(int(v) for v in cl["pivot"].unique())
                for which, timing in (("H3a", "pivot"), ("H3b", "window_start")):
                    spec = self._h3_controls(which, timing, False)
                    # Report the pivots that actually carry complete rows: the H3b
                    # start-of-window control at the first pivot needs the status class of
                    # edition pivot - 3, which predates the warehouse's first edition (2013).
                    used = self._complete_pivots(cl, which, spec[0])
                    gap = [pv for pv in pivots if pv not in used]
                    gap_note = (
                        [
                            f"pivot {', '.join(str(v) for v in gap)} has no complete rows: the "
                            "start-of-window status class (edition "
                            f"{', '.join(str(v - DYNAMIK_SPAN['HH']) for v in gap)}) predates the "
                            "first Sozialmonitoring edition in the warehouse (2013)"
                        ]
                        if gap and which == "H3b"
                        else ([f"pivot {gap} has no complete rows"] if gap else [])
                    )
                    self._h3_row(
                        cl,
                        which,
                        "sensitivity",
                        f"{which} phase-shift chain {tag}",
                        spec,
                        "g_commercial_c5",
                        "dynamik_class",
                        used,
                        [
                            "phase-shift sensitivity (§4.3); a result holding on one phase only is fragile",
                            *gap_note,
                            *shock,
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
                notes=["phase-shift sensitivity (§4.3)", *shock],
            )

    @staticmethod
    def _complete_pivots(cl: pd.DataFrame, which: str, controls: Sequence[str]) -> list[int]:
        """Pivots with at least one row where predictor, outcome and controls are finite."""
        x, y = (
            (cl["d_poi_p"], cl["d_status_f"])
            if which == "H3a"
            else (cl["d_status_p"], cl["d_poi_f"])
        )
        cols = [cl["D_P_col"] if c == "D_P" else cl[c] for c in controls]
        ok = _finite_rows(x.to_numpy(float), y.to_numpy(float), *[c.to_numpy(float) for c in cols])
        return sorted(int(v) for v in pd.unique(cl.loc[ok, "pivot"]))

    # -- validity check (§3.2, Berlin) ------------------------------------------

    def run_hh_context(self):
        """Hamburg findings context (no verdict depends on any of it):
        - class counts per edition used, checked against the published annex counts
          (§2.1(4), phase A §4 seed; 2013-2015 have no annex, O3);
        - tie ceilings of the status and Dynamik classes (domain sign-off 354 R5, C2 method);
        - OSM city totals per snapshot for the pivot-2016 caveat (§4.3 R6);
        - Sports-and-Recreation type composition at the H1 snapshot (§1.3)."""
        p, d = self.p, self.d
        # window ends (Dynamik editions), window starts (status-level editions) and the H1
        # edition; starts before the first edition (2011, 2012) have no rows and are skipped.
        eds = {y for w in p.windows for y in w} | {p.h1_edition}
        for chain in p.phase_chains:
            eds |= {y for w in chain for y in w}
        pub = d.published_counts if d.published_counts is not None else pd.DataFrame()
        classes = []
        for e in sorted(eds):
            st = _status_at(d, e)
            if st.empty:
                continue
            sc = st["S_cls"].dropna().astype(int)
            dc = st["D_cls"].dropna().astype(int)
            entry = {
                "edition": int(e),
                "n": int(len(st)),
                "status_counts": {str(k): int((sc == k).sum()) for k in (1, 2, 3, 4)},
                "dynamik_counts": {str(k): int((dc == k).sum()) for k in (1, 2, 3)},
                "ceiling_status": tie_ceiling(sc.to_numpy(float)),
                "ceiling_dynamik": tie_ceiling(dc.to_numpy(float)),
            }
            pe = pub[pub["edition"] == e] if not pub.empty else pub
            if len(pe):
                exp = {
                    (str(r.index_name), str(int(r.expected_code))): int(r.n_gebiete)
                    for r in pe.itertuples()
                }
                got = {("status", k): v for k, v in entry["status_counts"].items()}
                got |= {("dynamik", k): v for k, v in entry["dynamik_counts"].items()}
                entry["matches_published"] = bool(got == exp)
            else:
                entry["matches_published"] = None  # no published annex (2013-2015, O3)
            classes.append(entry)
        self.meta["hh_classes"] = classes
        dom = d.oa[d.oa["oa_level"] == "domain"]
        self.meta["osm_city_totals"] = {
            str(int(y)): int(g["parent_stock_city"].max())
            for y, g in dom.groupby("snapshot_year", sort=True)
        }
        t = d.types[
            (d.types["snapshot_year"] == p.h1_snapshot) & (d.types["poi_domain_h"] == SPORT_DOMAIN)
        ]
        comp = t.groupby(["poi_category_h", "poi_type_h"], sort=True)["poi_count"].sum()
        self.meta["sport_types_h1"] = sorted(
            ([f"{c}|{ty}", int(v)] for (c, ty), v in comp.items()), key=lambda r: (-r[1], r[0])
        )
        self.meta["n_clusters_total"] = int(d.clusters["cluster"].nunique())
        self.meta.update(d.context)

    def run_validity(self):
        if self.p.city == "HH":
            self.run_hh_context()
            return
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
            # C2 (domain sign-off 354): tie ceiling of each published class.
            cs = tie_ceiling(st.loc[ok_s, "S_cls"].to_numpy(float))
            cd = tie_ceiling(st.loc[ok_d, "D_cls"].to_numpy(float))
            shares = st.loc[ok_d, "D_cls"].value_counts(normalize=True).sort_index()
            self.meta["validity"].append(
                {
                    "edition": int(e),
                    "rho_S_status_class": round(float(rs), 4),
                    "n_S": int(ok_s.sum()),
                    "rho_D_dynamik_class": round(float(rd), 4),
                    "n_D": int(ok_d.sum()),
                    "ceiling_S": None if cs is None else round(cs, 4),
                    "ceiling_D": None if cd is None else round(cd, 4),
                    "dynamik_class_shares": {
                        str(int(k)): round(float(v), 4) for k, v in shares.items()
                    },
                    "sources_S": _fmt_status_desc(self.d, e, "S"),
                    "sources_D": _fmt_status_desc(self.d, e, "D"),
                }
            )
        self.meta["mean_arbeitslose_dynamik"] = {
            str(k): round(v, 4)
            for k, v in sorted(self.d.edition_means.get("arbeitslose_dynamik", {}).items())
            if k in eds
        }
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
    if row["estimator"] == "oof_auc_logit" and v == CONTRADICTED:
        # §5.1: CONTRADICTED is impossible for the non-directional H1/H2 AUC tests.
        notes.append(
            "AUC significantly below 0.5; CONTRADICTED is undefined for the non-directional H1/H2"
        )
        v = NOT_SIGNIFICANT
    elif row["estimator"] == "delta_auc" and v == CONTRADICTED:
        # §5.2 H2 incremental is directional (does OA ADD to status level?).
        notes.append("adding OA significantly lowers out-of-fold AUC once status level is included")
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
        if v == NO_DATA and r["estimate"] is not None:
            # C4 (domain sign-off 354): no point estimate below the §5.3 cluster floor.
            r["estimate"], r["effect_label"], r["p_analytic"] = None, "", None
            r["notes"].append(
                "not reported: < 20 clusters"
                if (r["n_clusters"] or 0) < MIN_CLUSTERS
                else "not reported: NO DATA"
            )
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


def _auc_pair(meta: dict) -> str:
    inc = meta.get("h2_incremental") or {}
    if inc.get("auc_base") is None or inc.get("auc_full") is None:
        return "n/a"
    d = inc.get("estimate")
    ci = (
        f" (delta {d:+.3f} [{inc['ci_low']:+.3f}, {inc['ci_high']:+.3f}])"
        if d is not None and inc.get("ci_low") is not None
        else ""
    )
    return f"{inc['auc_base']:.3f} -> {inc['auc_full']:.3f}{ci}"


def _shock_text(meta_th: dict) -> str:
    """§3.4 binding text plus the thesis-era line (domain sign-off 354, C3); the city means
    of Arbeitslosigkeit-Dynamik are computed from the meaning-named indicators."""
    means = meta_th.get("mean_arbeitslose_dynamik") or {}
    mtxt = ", ".join(f"{float(v):+.2f}" for _k, v in sorted(means.items()))
    eds = "/".join(sorted(means))
    line = (
        "- **Thesis era (D_2015, D_2017, D_2019).** People who arrived as refugees in 2015–16 "
        "moved into SGB II after recognition, mainly 2016–2018. That falls inside the D_2017 and "
        "D_2019 windows and affects Transferbezug and Kinderarmut at small-area level near large "
        "accommodation sites. Berlin means show no bump, because labour-market recovery "
        f"dominated (mean Arbeitslosigkeit-Dynamik {mtxt} pp in {eds}), so the effect is local, "
        "not city-wide. The thesis-era H1 level (MSS Dec 2016) contains part of it."
    )
    head, sep, tail = SHOCK_TEXT.partition("\n\nThe warehouse has no")
    return head + "\n" + line + sep + tail


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
        "**H2 incremental with a wholly negative delta-AUC CI: ratified (Amendment 2, geo-DS + "
        "domain, 2026-11-01).** §5.6 maps H2 to 'stronger than thesis' only when the delta-AUC "
        "CI excludes 0, and to 'explained by current status level' when it includes 0; it did "
        "not spell out a CI entirely below 0. Amendment 2 reads 'excludes 0' as ci_low > 0, so a "
        "CI that includes 0 or lies wholly below 0 maps to 'consistent (still unclear): "
        "explained by current status level'. Out-of-fold AUC, status level alone -> status "
        f"level plus the category OA mix: thesis era {_auc_pair(meta_th)}; 2019-2025 "
        f"{_auc_pair(meta_mod)}. The thesis-era incremental row is CONTRADICTED (adding OA "
        "significantly lowers out-of-fold AUC once status level is included), which means no "
        "increment, not an opposite prediction. **This reading was settled after seeing the "
        "low-B smoke run**, so it is not pre-registered; it can only weaken a claim, and it "
        "binds #355 unchanged.",
        "**Hamburg panels not reported here.** The code supports `--city HH` (`HH/full`, "
        "`HH/modern`, phase-shift chains); Hamburg results and findings are #355's (see "
        "`docs/epic-h/H-thesis-hypothesis-suite-findings.md`).",
        "**Shock notes on every row that spans a shock window (#355 review, 2026-11-01; "
        "notes only).** Per-pivot H3a/H3b rows now name the shock notes of both the P and the "
        "F window (before: P only), and the pivot-difference and level-stratified H3a/H3b rows "
        "carry the panel's shock notes (before: none), so the §3.4 sentence 'every pooled row "
        "that includes W1 names this mechanism' holds for every row. In `BER/modern` this adds "
        "the W1 note to the two pivot-difference rows and the four level-stratified rows; no "
        "estimate, CI, p, verdict or Holds? label changes, and `BER/thesis-era` carries no "
        "shock notes, so it is unchanged.",
    ]
    return devs


def _d_validity_text(meta: dict, div: list[str], rows_desc: str) -> str:
    """C2 (domain sign-off 354 §3): D vs the tie ceiling of the three-level Dynamik class."""
    vals = [
        (pk, v)
        for pk in ("thesis-era", "modern")
        for v in meta.get(f"BER/{pk}", {}).get("validity", [])
        if v.get("ceiling_D")
    ]
    ceilings = [v["ceiling_D"] for _pk, v in vals]
    ratios = [v["rho_D_dynamik_class"] / v["ceiling_D"] for _pk, v in vals]
    full = [str(v["edition"]) for (_pk, v), r in zip(vals, ratios, strict=True) if r >= 0.995]
    same_ind = set(full) <= {"2019", "2021"}
    at_ceiling = ""
    if full:
        at_ceiling = f", and exactly 100% in {'/'.join(full)}"
        if same_ind:
            at_ceiling += (
                ", where the official Dynamik index uses the same three indicators (D1/D3/D4; "
                "S2/D2 is vacant in the MSS 2019 and 2021 editions)"
            )
    return (
        f"**Disclosure (§3.2):** the change composite D is below the pre-registered 0.80 "
        f"threshold in {', '.join(div)}. Against a three-class variable with these shares the "
        f"highest attainable Spearman is {min(ceilings):.2f}–{max(ceilings):.2f} (tie ceiling: "
        "the Spearman of the class with an ideal continuous measure that orders every PLR "
        f"consistently with its class). D reaches {100 * min(ratios):.0f}–"
        f"{100 * min(max(ratios), 1.0):.0f}% of it{at_ceiling}. Our change measure follows the "
        "official Dynamik ordering as closely as its three classes allow; the remaining shortfall "
        "in the other editions matches the S2/D2 indicator the official index adds there. The "
        f"pre-registered rule is applied as written: read the published-class rows of {rows_desc} "
        '(role `secondary`, "published-class version") beside the primaries. The H2 class row '
        "is a narrower contrast (Dynamik 'negativ', about one PLR in ten, vs the rest), not a "
        "different measure of change."
    )


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
        "| Panel | Edition | ρ(S, status class) | S judgement | ρ(D, Dynamik class) | D judgement | tie ceiling (Dynamik class) | observed / ceiling | n |"
    )
    a("|---|---|---|---|---|---|---|---|---|")
    div_s, div_d = [], []
    for pk in ("thesis-era", "modern"):
        for v in meta.get(f"BER/{pk}", {}).get("validity", []):
            ok_s = v["rho_S_status_class"] >= 0.80
            ok_d = v["rho_D_dynamik_class"] >= 0.80
            if not ok_s:
                div_s.append(f"{pk} {v['edition']}")
            if not ok_d:
                div_d.append(f"{pk} {v['edition']}")
            js = "≥ 0.80" if ok_s else "below 0.80"
            jd = "≥ 0.80" if ok_d else "below 0.80"
            cd = v.get("ceiling_D")
            ratio = "–" if not cd else f"{100 * v['rho_D_dynamik_class'] / cd:.0f}%"
            a(
                f"| {pk} | {v['edition']} | {v['rho_S_status_class']:.3f} | {js} | {v['rho_D_dynamik_class']:.3f} | {jd} | {_f(cd)} | {ratio} | {v['n_S']} |"
            )
    a("")
    for label, div, rows_desc in (
        ("status composite S", div_s, "H1 family"),
        ("change composite D", div_d, "H2 and H3a-c"),
    ):
        if div and label.startswith("change"):
            a(_d_validity_text(meta, div, rows_desc))
        elif div:
            a(
                f"**Disclosure (§3.2):** the {label} is below the pre-registered 0.80 threshold "
                f"in {', '.join(div)}. The published-class secondary rows of the {rows_desc} "
                '(role `secondary`, "published-class version") must be read beside the primaries '
                "there."
            )
            a("")
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
    a(_shock_text(mt))
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
        est_cell = f"{_f(r['estimate'])} [{_f(r['ci_low'])}, {_f(r['ci_high'])}]"
        if r["verdict"] == NO_DATA:
            est_cell = "– (not reported: NO DATA)"
        a(
            f"| {r['panel']} | {r['hypothesis']} | {r['role']} | {r['operationalisation']} | {est_cell} | {r['n']} | {r['verdict'] or 'descriptive'} | {note} |"
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
        "none changed a rule after results were seen. Item 16 is a notes-only correction from "
        "the #355 review (2026-11-01). None changes a hypothesis, variable, expected sign, "
        "family or verdict rule."
    )
    a("")
    for i, dv in enumerate(_deviations(mm, mt), start=1):
        a(f"{i}. {dv}")
    a("")
    path.write_bytes(("\n".join(L) + "\n").encode("utf-8"))


# ---------------------------------------------------------------------------
# Findings (generated, §7.2) -- Hamburg (#355)
# ---------------------------------------------------------------------------

HH_PANELS = (
    ("full", "Hamburg full chain 2013–2025 (primary)"),
    ("modern", "Hamburg pivot 2022 (era split)"),
)

# §4.4 testability table, Hamburg operationalisation per hypothesis (thesis pairing, Tabelle
# 6-16 / Tabelle 6-1, transferred to Sozialmonitoring classes).
HH_OPS = {
    "H1": (
        "Out-of-fold AUC (5-fold GroupKFold by Stadtteil) of a fixed L2 logit on all category-level "
        "OA passing the A1.1 feature rule; binary status = class {3, 4} vs {1, 2}; edition 2025 × "
        "OSM 2025-01-01",
        "The binary is about 18/82; AUC is threshold-free but has a wider CI",
    ),
    "H1a": (
        "Spearman (mid-ranks) of OA category Cafe vs the four-class status, edition 2025 × OSM "
        "2025; Gastronomy base ≥ 10",
        "Ordinal outcome; the statement names the construct (§4.5)",
    ),
    "H1b": (
        "Spearman of OA category Fast Food vs status class; Gastronomy base ≥ 10",
        "Ordinal outcome; the statement names the construct (§4.5)",
    ),
    "H1c": (
        "Spearman of OA domain Sports and Recreation vs status class; all-domain base ≥ 10",
        "Ordinal outcome; the statement names the construct (§4.5)",
    ),
    "H2": (
        "Out-of-fold AUC, Dynamik_E 'negativ' vs rest (predicts worsening) ~ category OA at "
        "snapshot E−3, pooled over the panel's windows; secondary 'positiv' vs rest (predicts "
        "improvement)",
        "Low power: positives about 4–10% per edition; CI NA or wider than 0.25 → NOT SIGNIFICANT",
    ),
    "H3a": (
        "Partial Spearman(g(commercial C5)_P, Dynamik class_F | Dynamik class_P, status class at "
        "the pivot)",
        "3-year windows (Berlin: 2 years)",
    ),
    "H3b": (
        "Partial Spearman(Dynamik class_P, g(commercial C5)_F | g(commercial C5)_P, status class "
        "at the start of P = edition E−3)",
        "3-year windows (Berlin: 2 years)",
    ),
    "H3c": (
        "Spearman(g(commercial C5)_W, Dynamik class_W), same 3-year window, pooled",
        "Change vs change; read with H3a/H3b (§9)",
    ),
}

HH_COMPARABILITY_TEXT = """Hamburg and Berlin verdicts are **not like-for-like** (pre-registration §4.5, binding text):

1. The monitor construction differs: Hamburg's seven indicators include migration background and
   school leaving.
2. The change window differs (3 vs 2 years).
3. The status measure differs (Hamburg classes vs Berlin continuous composites).
4. The grain differs (Gebiet ≈ 2,200 residents vs PLR ≈ 7,000).
5. The era differs (`HH/full` 2013–2025 vs Berlin modern 2019–2025; `HH/modern` is the era-matched
   comparison).

A diverging verdict is not evidence that the cities' processes differ, **and a matching verdict is
not evidence that they are the same**: with different constructs, agreement can be coincidental.
Because Hamburg's status index includes *Kinder und Jugendliche mit Migrationshintergrund*, a Hamburg
H1b result is partly a fast-food ↔ migrant-children association. Every Hamburg H1a–c statement must
name the construct, so that the result cannot be read as an ethnic rather than a socio-economic
association (2026-10 domain R8).

**No hypothesis is untestable in Hamburg** (§4.4). What is missing is resolution (classes only) and a
2018 baseline, so **a Hamburg result is an out-of-sample transfer test, not a replication.** The
"Holds?" column is therefore named **"Matches Berlin 2018?"** and uses the same labels (§5.6)."""

HH_AUC_TEXT = """The thesis's headline AUCs (Berlin 2018) are not comparable to the suite's (pre-registration §1.2,
binding text D4c). They come from BZR grain for H1, H2 and H3b (137 areas), random 10-fold CV
(§6.2.3), the best of about 19 algorithms (§6.2.4) and up to 85 OA features. The Hamburg suite uses
Gebiet grain, Stadtteil-grouped CV and one pre-specified model, each of which lowers AUC, on a
different city and status construct (§4.5). **No table may set the thesis AUC against a suite AUC as a
measure of weakening.** In place of the thesis's "Features sinnvoll?" column, the ten largest
standardised coefficients (mean over the five training folds) are listed with their signs."""

HH_INDICATOR_SENTENCE = (
    '*"The open Sozialmonitoring report annexes (2016–2025) publish all seven status indicators and '
    "six Dynamik indicators per statistisches Gebiet as z-scores; the WFS used by the warehouse "
    'publishes classes only."* (phase A §5, binding check §2.1(5) / D8g)'
)


# #355 review MED 3: plain names of the domains an OA feature list draws on.
DOMAIN_PHRASE = {
    "Public Space": "public facilities",
    "Mobility": "transport",
    "Tourism": "tourist facilities",
    "Public Service": "public services",
    "Health": "health services",
    "Education": "education",
    "Sports and Recreation": "sport and recreation",
    "Gastronomy": "shops and services",
    "Retail": "shops and services",
    "Services": "shops and services",
    "Entertainment": "shops and services",
}
CAMPAIGN_DOMAINS = ("Mobility", "Public Space")


def _feature_mix(feats: Sequence[str]) -> tuple[str, bool]:
    """('public facilities, transport and tourist facilities', has_commercial) for a fixed
    feature list; the phrase follows the list, so it cannot claim shops it does not hold."""
    doms = sorted({f.split("|")[0] for f in feats})
    phrases: list[str] = []
    for dm in doms:
        ph = DOMAIN_PHRASE.get(dm, dm.lower())
        if ph not in phrases:
            phrases.append(ph)
    if not phrases:
        text = "no category"
    elif len(phrases) == 1:
        text = phrases[0]
    else:
        text = ", ".join(phrases[:-1]) + " and " + phrases[-1]
    return text, any(dm in COMMERCIAL_DOMAINS for dm in doms)


def _hh_construct_sentence(feats: Sequence[str], design: str) -> str:
    mix, has_comm = _feature_mix(feats)
    doms = sorted({f.split("|")[0] for f in feats})
    camp = [dm for dm in doms if dm in CAMPAIGN_DOMAINS]
    what = f"the mix of {mix}"
    if not has_comm:
        what += " (no shop or service category reaches the measurement base at Gebiet grain)"
    out = f"{design} in Hamburg tests {what}: its fixed feature list draws on {', '.join(doms)}."
    if camp:
        out += (
            f" {' and '.join(camp)} are street-furniture and transit classes whose mapping is "
            "campaign-driven, where C5's uniform-coverage assumption is least credible (domain "
            "review D2)."
        )
    return out


def _h2_diag_text(m: dict, mm: dict | None) -> str:
    """#355 review MED 2: fold- and window-level AUC behind a below-chance pooled AUC."""
    dg = m.get("h2_oof_diagnostics") or {}
    folds = [v for v in dg.get("within_fold_auc") or [] if v is not None]
    wins = {k: v for k, v in (dg.get("per_window_auc") or {}).items() if v is not None}
    if not folds:
        return "It is not read as evidence that the OA mix predicts the opposite change."
    fb, wb = sum(v < 0.5 for v in folds), sum(v < 0.5 for v in wins.values())
    consistent = fb == len(folds) and wb == len(wins)
    mdg = (mm or {}).get("h2_oof_diagnostics") or {}
    md = [v for v in mdg.get("within_fold_auc") or [] if v is not None]
    cmp_txt = (
        f" For comparison, the pivot-2022 panel's within-fold AUCs are {min(md):.2f}–{max(md):.2f}."
        if md
        else ""
    )
    fold_txt = " / ".join(f"{v:.3f}" for v in folds)
    win_txt = ", ".join(f"{k} {v:.3f}" for k, v in sorted(wins.items()))
    return (
        f"The shortfall is {'consistent' if consistent else 'not uniform'}: within-fold AUC is "
        f"below 0.5 in {fb} of {len(folds)} Stadtteil folds ({fold_txt}) and per-window AUC in "
        f"{wb} of {len(wins)} windows ({win_txt}).{cmp_txt} It is read as an OA–Dynamik "
        "relationship that is unstable across Stadtteile: a model fitted on the other "
        "Stadtteile ranks the held-out ones slightly the wrong way"
        + (", in every fold and every window" if consistent else "")
        + ". It is not read as evidence that the OA mix predicts the opposite change. The "
        "verdict and label stay as pre-registered; the diagnostics are in the metadata "
        "(`h2_oof_diagnostics`)."
    )


def _hh_cell(r: dict | None) -> str:
    if r is None:
        return "–"
    if r["verdict"] == NO_DATA:
        return f"NO DATA (n = {r['n'] or 0}); *{r['holds']}*"
    name = "AUC" if r["estimator"] == "oof_auc_logit" else "ρ"
    lp = " — low power (§4.4)" if "low power" in r["notes"] else ""
    if "significantly below 0.5" in r["notes"]:
        lp += (
            " — AUC significantly below 0.5, not CONTRADICTED for a non-directional test (§5.1; §4)"
        )
    return (
        f"{name} {_f(r['estimate'])} [{_f(r['ci_low'])}, {_f(r['ci_high'])}], n = {r['n']} "
        f"({r['n_clusters']} Stadtteile), p_BH = {_f(r['p_bh'], 4)}: **{r['verdict']}** "
        f"({r['effect_label']}){lp}; *{r['holds']}*"
    )


def _ci_sig(r: dict) -> int:
    """Sign of an unadjusted-CI significance (+1 above 0, -1 below 0, 0 otherwise)."""
    try:
        lo, hi = float(r["ci_low"]), float(r["ci_high"])
    except (TypeError, ValueError):
        return 0
    return 1 if lo > 0 else (-1 if hi < 0 else 0)


def _hh_phase_reading(sigs: list[int]) -> str:
    k = sum(1 for s in sigs if s)
    if k == 0:
        return "not significant on any phase"
    if k == 1:
        return "**fragile**: significant on one phase only (§4.3)"
    signs = {s for s in sigs if s}
    return f"significant on {k} of {len(sigs)} phases" + (
        " with conflicting signs" if len(signs) > 1 else ", same sign"
    )


def _hh_shock_text() -> str:
    phase_windows = sorted({w for ch in HH_PHASE_CHAINS for w in ch}, key=lambda w: w[1])
    ref = [
        e for s, e in phase_windows if any("2015-16 refugees" in n for n in hh_shock_notes(s, e))
    ]
    pan = [e for s, e in phase_windows if any("pandemic" in n for n in hh_shock_notes(s, e))]
    rkw = [
        e for s, e in phase_windows if any("Rechtskreiswechsel" in n for n in hh_shock_notes(s, e))
    ]
    ref23 = [e for s, e in phase_windows if any("2023" in n for n in hh_shock_notes(s, e))]

    def j(xs: list[int]) -> str:
        return ", ".join(str(x) for x in xs) or "none"

    return f"""No window is shock-free, and the findings must not imply otherwise (pre-registration §4.3, the
Hamburg counterpart of §3.4; domain review D7). Sozialmonitoring edition E carries data as of
31 Dec (E−1) (phase A §3), so the Dynamik of edition E spans Dec (E−4) → Dec (E−1).

- **Window ending 2016 (Dec 2012 → Dec 2015).** The 2015 refugee arrivals begin at its end. Asylum
  seekers are not in SGB II before recognition, so most of their entry into SGB II falls in the next
  window.
- **Window ending 2019 (Dec 2015 → Dec 2018).** People who arrived as refugees in 2015–16 moved into
  SGB II after recognition, mainly 2016–2018 (the Hamburg counterpart of the #354 thesis-era line,
  domain sign-off 354 C3). The effect is local, near large accommodation sites. The 2019 edition also
  changes indicator definitions (S3 adds AsylbLG recipients; S7's school-leaving categories are
  renamed; phase A §5). Whether the 2019 Dynamik is computed on consistent definitions cannot be
  checked from the class-only WFS.
- **Window ending 2022 (Dec 2018 → Dec 2021) contains the pandemic** (binding, §4.3). Pandemic job
  losses hit hospitality, culture and tourism workers, so Dynamik over this window can correlate with
  gastronomy through the labour market rather than through a change in who lives there. Every row
  that includes this window names the mechanism in `notes`.
- **Window ending 2025 (Dec 2021 → Dec 2024) contains the 1 June 2022 Rechtskreiswechsel and the
  1 January 2023 Bürgergeld and Wohngeld-Plus reforms** (binding, §4.3), plus continuing refugee
  entry into SGB II. The Rechtskreiswechsel moved Ukrainian refugees into SGB II (BA-Statistik 2022).
  The reforms changed who counts in the benefit-based indicators, with unknown and possibly opposite
  small-area effects.
- **`HH/modern` contains both the window ending 2022 and the window ending 2025, so it is the most
  shock-exposed panel** (binding, §4.3). Its pivot-2022 cross-lag pairs the pandemic window (P) with
  the Rechtskreiswechsel/reform window (F).
- **H1 cross-section (edition 2025 = Dec 2024 levels)** includes refugee-related SGB II receipt
  concentrated near large accommodation sites. Hamburg's status index also counts children and young
  people with a migration background, so refugee children can move a Gebiet's status class directly.
  This is a modest effect on a level, and it belongs in the limitation line.
- **Phase-shift chains** cross the same shocks at other offsets: the shifted windows ending
  {j(ref)} contain part of the 2016–2018 refugee entry; those ending {j(pan)} contain the pandemic;
  those ending {j(rkw)} contain the Rechtskreiswechsel, and {j(ref23)} also the 2023 reforms. Their
  rows carry the same notes.

The warehouse has no open small-area refugee-accommodation source, so this is disclosed as a
limitation, not corrected."""


def _hh_deviations(records: list[dict], meta: dict) -> list[str]:
    mf = meta.get("HH/full", {})
    devs = [
        "**Inherited from #354 (accepted in `docs/epic-e/354-geo-signoff.md` §1, items 1–3 and "
        "6–10), applied unchanged to Hamburg:** the ADR-0017 min-base rule as a thesis deviation "
        "(N8); N3 (AUC rows need at least 'poor', AUC ≥ 0.60, for the ✓ rule); N4 (an H3a that is "
        "NOT SIGNIFICANT after BH with unadjusted p < 0.05 carries 'nominally significant'); N7 "
        "(one population-weighted row per H1a–c, counted once); fixed feature lists per design "
        "frame (A1.1 rule on each design's own rows, flags only, written to the metadata before "
        "any fit); coefficients as the mean of the five training-fold fits (no full-sample fit, "
        "§5.8(4)); area-windows with DHS growth 0/0 drop; the `form` / `suite_expected_dir` "
        "fields of `THESIS_HYPOTHESES`. N1 and N2 are Berlin-only. Moran's I is a Berlin-only "
        "diagnostic in §8, so its absence is not a deviation here.",
        "**Amendment 2 applies unchanged** (H2 'stronger than thesis' needs ΔAUC ci_low > 0; a CI "
        "that includes 0 or lies wholly below 0 maps to 'consistent (still unclear): explained by "
        "current status level'). It was recorded after the Berlin results and ratified by geo-DS "
        "and domain on 2026-11-01 as binding for #355 and not to be re-opened after the Hamburg "
        "results. Disclosure: a low-B Hamburg smoke run of this code path existed in #354 phase B "
        "(its notes, in `docs/handoff/2026-11-01-hypothesis-suite.md`: H2 low power, H1a/H1b "
        "n ≈ 100, commercial-only H1 row without data). No rule was changed after it.",
        "**Tie-ceiling context (domain sign-off 354 R5).** §10 reports the highest Spearman any "
        "continuous measure can reach against each Sozialmonitoring class variable. It was in the "
        "code before the first Hamburg run on this branch, is context only, and changes no verdict "
        "and no effect label "
        "(the Cohen labels are applied as pre-registered).",
        "**Shock notes on Hamburg rows.** §4.3 requires the Hamburg counterpart of §3.4. Rows that "
        "include the windows ending 2022 (pandemic) or 2025 (Rechtskreiswechsel, 2023 reforms) "
        "carry the mechanism in `notes`, and so do the windows covering the 2016–2018 refugee "
        "entry into SGB II (the counterpart of the #354 thesis-era line, C3). Notes only; no "
        "estimate is affected.",
        "**H2 incremental status level in Hamburg** = the status class at the window start "
        "(edition E−3), the Hamburg analogue of Berlin's S at the window start (§4.3 uses the "
        "same class as the H3b level control). §5.2 does not spell out the Hamburg level.",
        "**Low-power rule on all Hamburg H2 AUC rows.** The §4.4 rule (CI NA or wider than 0.25 → "
        "NOT SIGNIFICANT with a 'low power' note) is applied to the H2 secondary and sensitivity "
        "AUC rows (positiv vs rest, domain level, base indicators, complete-case) as well as to "
        "the primary. The same rule; it can only weaken a claim.",
        "**Stadtteil cluster membership.** A Gebiet's cluster is the Stadtteil named in its "
        f"latest edition. The label varies across editions for {mf.get('n_gebiete_stadtteil_label_varies', '?')} "
        "Gebiete (spelling variants such as 'GroßFlottbek' / 'Groß Flottbek', and Stadtteile "
        "merged or renamed, such as 'Hamm-Nord' / 'Hamm-Mitte' / 'Hamm-Süd' → 'Hamm' (merged)); "
        "the latest edition gives "
        f"{mf.get('n_clusters_total', '?')} clusters. §4.2 names the Stadtteil but not which edition decides.",
        "**Phase-shift chains: first H3b pivot without data.** The H3b window-start control at "
        "pivot 2014 (chain 2014/17/20/23) and 2015 (chain 2015/18/21/24) is the status class of "
        "edition 2011 or 2012, which predates the first Sozialmonitoring edition in the warehouse "
        "(2013). Those H3b phase rows therefore rest on the two later pivots; the row's `pivots` "
        "field lists the pivots actually used. A consequence of the data, not a design change.",
        "**E5 retired on this branch.** §6.3 retires `analysis/e5_hamburg_lead_lag.py` 'once the "
        "suite passes the gate'. This branch removes it from `poe analysis` and puts the pointer "
        "in the E5 findings header, but integration into `develop` is itself gated (R-C1), so E5 "
        "leaves the published pipeline only when the gate passes. The script stays in the "
        "repository, marked superseded, for the audit trail.",
    ]
    devs.append(
        "**Text-only generator additions made after seeing Hamburg results (2026-11-01).** After "
        "the first Hamburg runs on this branch (a B = 49 crash test and the B = 1999 run), the "
        "findings generator gained: the below-chance AUC disclosure (§4 and the next item), the "
        "H1 size sentence (§3), plain reasons for rows without data, and two lookup fixes for "
        "the D3b/R3 sentences in §3. The statistics code, the rows, the verdicts and the labels "
        "are unchanged by them."
    )
    devs.append(
        "**#355 review corrections (data-engineer-reviewer, 2026-11-01), notes and text only.** "
        "(a) Shock notes now reach every row that spans a shock window: per-pivot H3a/H3b rows "
        "name both the P and the F window (before: P only), and the pivot-difference and "
        "level-stratified rows carry the panel's notes (before: none); repeated notes on "
        "phase-shift rows appear once. The same shared-code fix changes `notes` cells of six "
        "`BER/modern` rows (pivot-difference and level-stratified H3a/H3b; E1b findings §12 "
        "item 16). No estimate, CI, p, verdict or label changes in either city. (b) The "
        "below-chance H2 disclosure reports the within-fold and per-window AUCs "
        "(`h2_oof_diagnostics`, descriptive). (c) The H1/H2 wording follows the fixed feature "
        "lists, which hold no shop or service category at Gebiet grain."
    )
    below = [
        r
        for r in records
        if r["city"] == "HH" and r["hypothesis"] == "H2" and "significantly below 0.5" in r["notes"]
    ]
    if below:
        where = ", ".join(f"{r['panel']} {r['role']}" for r in below)
        devs.append(
            f"**H2 out-of-fold AUC significantly below 0.5 ({where}) → NOT SIGNIFICANT.** The "
            "pre-registration writes 'CONTRADICTED impossible' for H1 (§5.1) and makes H2 "
            "non-directional (§1.1, §5.1); the #354 code applies the rule to both AUC tests "
            "(`_verdict_for`, covered for H2 by `test_auc_below_null_is_never_contradicted`). It "
            "binds here for the first time, so it is listed for the reviewers. No rule was changed "
            "after seeing the result."
        )
    nd = [
        r
        for r in records
        if r["city"] == "HH" and r["role"] != "primary" and r["verdict"] == NO_DATA
    ]
    seen = set()
    for r in nd:
        key = (r["hypothesis"], r["operationalisation"])
        if key in seen:
            continue
        seen.add(key)
        panels = sorted(
            {x["panel"] for x in nd if (x["hypothesis"], x["operationalisation"]) == key}
        )
        devs.append(
            f"**{r['hypothesis']} {r['role']} row without data ({', '.join(panels)}):** "
            f"{r['operationalisation']}. Reason: {_no_data_reason(r)}. A consequence of a rule "
            "fixed before any fit (§5.2, §5.3, A1.1); it is not relaxed after seeing the row "
            "(geo sign-off 354 item 12)."
        )
    return devs


def _row_brief(r: dict) -> str:
    """One-phrase summary of a non-primary row for the findings prose."""
    if r["verdict"] == NO_DATA:
        return f"NO DATA ({_no_data_reason(r)})"
    name = "AUC" if r["estimator"] == "oof_auc_logit" else "ρ"
    return (
        f"{name} {_f(r['estimate'])} [{_f(r['ci_low'])}, {_f(r['ci_high'])}], n = {r['n']}, "
        f"{r['verdict']} (unadjusted CI, {r['effect_label'] or '–'})"
    )


def _no_data_reason(r: dict) -> str:
    """Plain reason for a NO DATA row, from its own fields."""
    notes = r["notes"]
    for key in ("not testable", "no feature passes"):
        if key in notes:
            return next(t for t in notes.split("; ") if key in t)
    try:
        n, g = int(r["n"] or 0), int(r["n_clusters"] or 0)
    except ValueError:
        n, g = 0, 0
    if g < MIN_CLUSTERS:
        return (
            f"fewer than {MIN_CLUSTERS} clusters (n = {n} Gebiete in {g} Stadtteile); "
            "§5.3 gives NO DATA"
        )
    return f"no estimate (n = {n})"


def write_hamburg_findings(path: Path, records: list[dict], meta: dict) -> None:
    hh = [r for r in records if r["city"] == "HH"]
    prim = {(r["panel"], r["hypothesis"]): r for r in hh if r["role"] == "primary"}
    ber_prim = {
        r["hypothesis"]: r
        for r in records
        if r["city"] == "BER" and r["panel"] == "modern" and r["role"] == "primary"
    }
    mf = meta.get("HH/full", {})
    h1_feats = mf.get("feature_lists", {}).get("H1_category", [])
    h1_mix, h1_comm = _feature_mix(h1_feats)
    h1_public = (
        'only "the local mix of shops, services and public facilities" (§9).'
        if h1_comm
        else f'only "the mix of {h1_mix}" (§9; no shop or service category in the feature list).'
    )
    sha = next((r["run_sha"] for r in hh), "")
    nboot = next((r["n_boot"] for r in hh), "")
    L: list[str] = []
    a = L.append
    a(
        "# H — Hamburg thesis hypothesis suite (#355): full chain 2013–2025 and pivot 2022, side by side"
    )
    a("")
    a(
        "> **Generated** by `analysis/thesis_hypothesis_suite.py --city HH` — do not hand-edit. "
        "Re-run the script to regenerate (§7.2)."
    )
    a("")
    a(f"- **Run:** `run_sha` {sha}; seed {SEED}; B = {nboot} cluster-bootstrap draws; α = 0.05.")
    a(
        "- **Binding design:** `docs/methodology/354-355-hypothesis-suite-preregistration.md` (rev. 2 + "
        "Amendments 1 and 2; Hamburg: §4, §5, §7.2, §10.3), the domain review "
        "(`docs/methodology/354-355-preregistration-domain-review.md`, D8 Hamburg additions) and the "
        "#354 sign-offs (`docs/epic-e/354-geo-signoff.md`, `354-domain-signoff.md`)."
    )
    a(
        "- **Data:** Sozialmonitoring status and Dynamik **classes** from "
        "`int_hamburg_sozialmonitoring_index` (WFS `de.hh.up:sozialmonitoring`, `statusindex` / "
        "`dynamikindex`; status 1 = hoch … 4 = sehr niedrig, Dynamik 1 = positiv / 2 = stabil / "
        "3 = negativ, so a higher code means more, or growing, disadvantage); OA from "
        "`int_poi_oa_native_panel` (`HH`, `current`, `standard`, zero-filled, min-base flag); "
        "commercial C5 shares from `int_poi_c5_share_native`; D4 (sensitivity only) from "
        "`int_ewr_socioeco_hamburg.ewr_composite`, which excludes `unemployment_share` (#329)."
    )
    a(
        "- **Grain / cluster:** statistisches Gebiet (scored Gebiete, > 300 residents); clusters = "
        f"Stadtteil ({mf.get('n_clusters_total', '?')}), §4.2. Effective N is reported as clusters."
    )
    a(
        "- **Results table:** `docs/epic-e/thesis-hypothesis-suite-results.csv` (`city = HH`, panels "
        "`full` and `modern`); feature lists, coverage, class counts and coefficients: "
        "`docs/epic-e/thesis-hypothesis-suite-metadata.json`."
    )
    a(
        "- **Supersedes** `docs/epic-h/E5-hamburg-lead-lag-findings.md` / `analysis/e5_hamburg_lead_lag.py` "
        "in full (§1.4, §6.3; see §15)."
    )
    a(
        "- **Gate:** methodology-bearing (R-C1): geo-DS and domain `Verdict: PASS` required before "
        "integration into `develop`."
    )
    a("")
    a("## 1. Headline: the eight hypotheses, full chain and pivot 2022 side by side")
    a("")
    a(
        "Primary test per hypothesis (§5.1); significance = Benjamini–Hochberg-adjusted bootstrap p < 0.05 "
        "across the panel's 8 primaries (§5.5). **`HH/full` is the primary family** (maintainer decision "
        "§10.3). **`HH/modern` (pivot 2022) is the era-split comparison** with its own family of 8: it is "
        "not a second confirmatory claim. ρ: a higher class = more disadvantage. *Italic* = "
        '"Matches Berlin 2018?" (§5.6 labels; a transfer test, §4.4).'
    )
    a("")
    a(
        "| Hyp | Thesis verdict (Berlin 2018, Tabelle 6-16) | Hamburg full chain 2013–2025 (primary) | "
        "Hamburg pivot 2022 (era split) |"
    )
    a("|---|---|---|---|")
    for h in PRIMARY_ORDER:
        a(
            f"| {h} | {THESIS_HYPOTHESES[h]['thesis_verdict']} | {_hh_cell(prim.get(('full', h)))} | "
            f"{_hh_cell(prim.get(('modern', h)))} |"
        )
    a("")
    a(
        "The H1 family (H1, H1a–c) uses the same 2025 cross-section in both panels, so its estimates "
        "and CIs are identical; only the BH adjustment differs, because each panel is its own family "
        "of 8."
    )
    a("")
    for pk, label in HH_PANELS:
        m = meta.get(f"HH/{pk}", {})
        if m.get("direction"):
            a(f"- **{label}, H3a/H3b together:** {m['direction']}.")
    a("")
    a(
        "**What FDR means (§5.5).** Within each panel, Benjamini–Hochberg bounds the expected share of "
        "false claims among the rows marked significant; it does not protect each row individually. "
        "`p_holm` (Holm 1979, family-wise) is in the CSV for transparency and does not decide verdicts."
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
        f'Rows labelled "nominally significant" (unadjusted p < 0.05, not significant after BH): '
        f"{', '.join(nominal) if nominal else 'none'}."
    )
    a("")
    a("### Operationalisation, grain and n per hypothesis (§4.4)")
    a("")
    a(
        "| Hyp | Testable | Hamburg operationalisation | Full chain: window, pivots, n (Stadtteile) | "
        "Pivot 2022: window, pivots, n (Stadtteile) | Caveat |"
    )
    a("|---|---|---|---|---|---|")
    for h in PRIMARY_ORDER:
        op, cav = HH_OPS[h]
        cells = []
        for pk in ("full", "modern"):
            r = prim.get((pk, h))
            if r is None:
                cells.append("–")
                continue
            pv = f", pivots {r['pivots'].replace(';', '/')}" if r["pivots"] else ""
            cells.append(f"{r['window']}{pv}; n = {r['n']} ({r['n_clusters']})")
        a(f"| {h} | Yes | {op} | {cells[0]} | {cells[1]} | {cav} |")
    a("")
    a(
        "Grain: statistisches Gebiet for every row; the H3 rows pool area-pivots (H3a/H3b) or "
        "area-windows (H2, H3c), and the Stadtteil cluster bootstrap resamples whole Stadtteile, so "
        "repeated Gebiete across windows stay in one cluster (§4.2)."
    )
    a("")
    a("## 2. Comparability and construct (binding text, §4.5)")
    a("")
    a(HH_COMPARABILITY_TEXT)
    a("")
    a(
        "**Cross-city reading, labels only** (read with the five caveats above; the page design of "
        "§7.2). Berlin 2019–2025 = `BER/modern` (`docs/epic-e/E1b-berlin-hypothesis-suite-findings.md`)."
    )
    a("")
    a(
        "| Hyp | Thesis (Berlin 2018) | Berlin 2019–2025: Holds? | Hamburg full chain: Matches Berlin 2018? | Hamburg pivot 2022: Matches Berlin 2018? |"
    )
    a("|---|---|---|---|---|")
    for h in PRIMARY_ORDER:
        b = ber_prim.get(h)
        f_, m_ = prim.get(("full", h)), prim.get(("modern", h))
        a(
            f"| {h} | {THESIS_HYPOTHESES[h]['thesis_verdict']} | {b['holds'] if b else '–'} | "
            f"{f_['holds'] if f_ else '–'} | {m_['holds'] if m_ else '–'} |"
        )
    a("")
    a("## 3. Notes per hypothesis")
    a("")
    a(
        "Status in every H1a–c sentence below is the **Hamburg Sozialmonitoring Statusindex**: a "
        "composite of seven indicators that include the share of children and young people with a "
        "migration background and school-leaving outcomes (§4.5). An association with it is an "
        "association with that composite, not with any one group."
    )
    a("")
    h1abc_label = {
        "H1a": "café share of the gastronomy mix",
        "H1b": "fast-food share of the gastronomy mix",
        "H1c": "share of sport and recreation facilities among all POIs",
    }
    r_full = {h: prim.get(("full", h)) for h in ("H1a", "H1b", "H1c")}
    for h in ("H1a", "H1b", "H1c"):
        r = r_full[h]
        if r is None:
            continue
        est = (
            "no estimate"
            if r["verdict"] == NO_DATA
            else (f"ρ {_f(r['estimate'])} [{_f(r['ci_low'])}, {_f(r['ci_high'])}]")
        )
        a(
            f"- **{h}: {h1abc_label[h]} vs the Sozialmonitoring status class (a composite including "
            f"migration background and school leaving).** {est}, {r['verdict']} ({r['effect_label'] or '–'}); "
            f"Matches Berlin 2018?: *{r['holds']}*."
        )
    a("")
    for h in ("H1a", "H1b", "H1c"):
        c = mf.get("coverage", {}).get(h)
        if c:
            parent = "gastronomy outlets" if h in ("H1a", "H1b") else "POIs of any domain"
            a(
                f"- **{h} coverage (N5).** Among Gebiete with at least ten {parent} (the parent base "
                f"needed to measure the mix): n retained {c['n_retained']} of {c['n_total']}. "
                f"Retained: {c['retained']}; dropped: {c['dropped']} (classes 3–4 = more "
                "disadvantaged). "
                + (
                    "The result describes these Gebiete, not the whole city."
                    if c["n_retained"] < c["n_total"]
                    else "No Gebiet is dropped, so the result covers the full frame."
                )
            )
    a("")
    a(
        "- **H1a (R2).** In the thesis, the only significant café row was population-weighted stock at "
        "PLR (Pearson −0.14), and the OA rows were null (PLR OA ρ = −0.02). Papachristos et al. (2011) "
        "concerns the *growth* of coffee shops; the café-growth cross-lag is an exploratory row (R4)."
    )
    kebab = [
        r for r in hh if r["panel"] == "full" and "Fast Food without" in r["operationalisation"]
    ]
    a(
        "- **H1b.** A deprivation hypothesis (Pearce et al. 2007, New Zealand), phrased at area level. "
        "The anti-stigmatisation check without döner/kebab types (R3): "
        + (f"{_row_brief(kebab[0])}." if kebab else "not run.")
        + " The H1b wording therefore stays at the fast-food share of the gastronomy mix, with no "
        "ethnic or migrant-economy language."
    )
    sport = mf.get("sport_types_h1") or []
    sport_txt = ", ".join(f"{k.split('|')[1]} {v:,}" for k, v in sport[:4])
    no_tt = [
        r
        for r in hh
        if r["panel"] == "full" and "Sport category without" in r["operationalisation"]
    ]
    a(
        "- **H1c.** The thesis's binding H1c text (§1.3) is in "
        "`docs/epic-e/E1b-berlin-hypothesis-suite-findings.md`; the 0 verdict refers to Berlin. In "
        f'Hamburg\'s OSM 2025, "Sports and Recreation" is again mostly public provision ({sport_txt}). '
        "Playgrounds and outdoor tables are planned public provision, dense in family-heavy estates: a "
        "plausible reason for an association with lower status, not a tested one. The node-only "
        "limitation (#337) probably hits this category hardest. The organised-sport row without table "
        "tennis (D3b): " + (f"{_row_brief(no_tt[0])}." if no_tt else "not run.")
    )
    h1 = prim.get(("full", "H1"))
    if h1 and "nominally significant" in h1["holds"] and h1["effect_label"] == "negligible":
        a(
            f"- **H1 (both panels).** AUC {_f(h1['estimate'])} [{_f(h1['ci_low'])}, "
            f"{_f(h1['ci_high'])}] is significant before but not after BH, so §5.6 labels it 'not "
            "reproduced at the corrected threshold (nominally significant)'. Its size is "
            "'negligible' (AUC < 0.60): even a significant result of this size would map to 'weaker "
            "than thesis'. The label is the pre-registered one; this sentence only gives its size."
        )
    for pk, label in HH_PANELS:
        r = next(
            (
                x
                for x in hh
                if x["panel"] == pk
                and x["hypothesis"] == "H1"
                and x["operationalisation"].startswith("commercial-only")
            ),
            None,
        )
        if r is None:
            continue
        ok = (
            r["verdict"] == SUPPORTED
            and r["effect_label"] in ("poor", "acceptable", "excellent")
            and prim.get((pk, "H1"), {}).get("verdict") == SUPPORTED
        )
        a(
            f"- **H1 public wording ({label}).** Commercial-only H1 row: {_row_brief(r)} → public "
            "text may say " + ('"businesses".' if ok else h1_public)
        )
    a(f"- **What H1 measures in Hamburg.** {_hh_construct_sentence(h1_feats, 'H1')}")
    a("")
    a("## 4. H2: two contrasts and the low-power rule (§4.4)")
    a("")
    a(
        "H2 is non-directional, but its binary target says which change is predicted. The primary predicts "
        "**worsening** (Dynamik 'negativ' vs rest); the pre-registered secondary predicts **improvement** "
        "('positiv' vs rest). Under #358, 'negativ' is filtering, not the gentrification-relevant change. "
        "**Low-power rule (§4.4):** if the CI is NA or wider than 0.25, the row is NOT SIGNIFICANT with a "
        "'low power' note."
    )
    a("")
    for pk, label in HH_PANELS:
        f2 = meta.get(f"HH/{pk}", {}).get("feature_lists", {}).get("H2_category", [])
        a(f"- **What H2 measures ({label}).** {_hh_construct_sentence(f2, 'H2')}")
    a("")
    a("| Edition (Dynamik window) | positiv | stabil | negativ | Gebiete |")
    a("|---|---|---|---|---|")
    full_ends = [e for _s, e in HH_FULL_WINDOWS]
    for c in mf.get("hh_classes", []):
        if c["edition"] in full_ends:
            dc = c["dynamik_counts"]
            a(
                f"| {c['edition']} (Dec {c['edition'] - 4} → Dec {c['edition'] - 1}) | {dc['1']} | "
                f"{dc['2']} | {dc['3']} | {c['n']} |"
            )
    a("")
    a("| Panel | Contrast | AUC [95% CI] | n (positives) | Verdict | Notes |")
    a("|---|---|---|---|---|---|")
    for pk, label in HH_PANELS:
        for r in hh:
            if r["panel"] != pk or r["hypothesis"] != "H2" or r["estimator"] != "oof_auc_logit":
                continue
            if not (r["role"] == "primary" or "positiv (1) vs rest" in r["operationalisation"]):
                continue
            contrast = (
                "negativ vs rest (predicts worsening), primary"
                if r["role"] == "primary"
                else "positiv vs rest (predicts improvement), secondary"
            )
            npos = next(
                (t.split("=")[1] for t in r["notes"].split("; ") if t.startswith("n_pos=")), "?"
            )
            lp = "; ".join(
                t
                for t, k in (
                    ("low power", "low power"),
                    ("AUC significantly below 0.5 (§5.1)", "significantly below 0.5"),
                )
                if k in r["notes"]
            )
            a(
                f"| {label} | {contrast} | {_f(r['estimate'])} [{_f(r['ci_low'])}, {_f(r['ci_high'])}] | "
                f"{r['n']} ({npos}) | {r['verdict']} | {lp} |"
            )
    a("")
    for pk, label in HH_PANELS:
        m = meta.get(f"HH/{pk}", {})
        a(
            f"- **H2 incremental ({label}).** Out-of-fold AUC, status class at the window start alone → "
            f"plus the category OA mix: {_auc_pair(m)}. Amendment 2 applies unchanged: only ci_low > 0 "
            "counts as an increment; otherwise H2 reads 'explained by current status level' when SUPPORTED."
        )
    a("")
    for r in hh:
        if r["hypothesis"] == "H2" and "significantly below 0.5" in r["notes"]:
            a(
                f"- **Below-chance out-of-fold AUC ({r['panel']}, {r['role']}: "
                f"{r['operationalisation'].split(' => ')[-1]}).** AUC {_f(r['estimate'])} "
                f"[{_f(r['ci_low'])}, {_f(r['ci_high'])}] lies wholly below 0.5. H2 is "
                "non-directional (§1.1), so CONTRADICTED is undefined (§5.1, as implemented in #354); "
                "the row is NOT SIGNIFICANT"
                + (" and maps to 'consistent (still unclear)'" if r["role"] == "primary" else "")
                + ". "
                + _h2_diag_text(
                    meta.get(f"HH/{r['panel']}", {}),
                    meta.get("HH/modern", {}) if r["panel"] != "modern" else None,
                )
                + " See §16."
            )
    a("")
    a("## 5. H3a/H3b per pivot and pivot heterogeneity")
    a("")
    a("| Panel | Hyp | Pivot | ρ [95% CI] | n | verdict (CI) |")
    a("|---|---|---|---|---|---|")
    for r in hh:
        if r["operationalisation"].startswith(("H3a at pivot", "H3b at pivot")):
            a(
                f"| {r['panel']} | {r['hypothesis']} | {r['pivots']} | {_f(r['estimate'])} "
                f"[{_f(r['ci_low'])}, {_f(r['ci_high'])}] | {r['n']} | {r['verdict']} |"
            )
    a("")
    for h, d in mf.get("pivot_diff", {}).items():
        a(
            f"- full {h}: ρ(pivot {d['last']}) − ρ(pivot {d['first']}) = {_f(d['estimate'])} "
            f"[{_f(d['ci_low'])}, {_f(d['ci_high'])}] → "
            + (
                "**heterogeneous: the pooled result depends on the window.**"
                if d["heterogeneous"]
                else "no detectable heterogeneity."
            )
        )
    a("- `HH/modern` has one pivot (2022), so no pivot difference exists there.")
    a("")
    a("## 6. Phase-shift sensitivity (§4.3)")
    a("")
    a(
        "The main chain (editions 2016/2019/2022/2025) against the two shifted chains, outside every "
        "family. To compare like with like, significance here is the unadjusted 95% CI excluding 0 on "
        "every phase (the headline uses BH). A result that holds on one phase only is **fragile**."
    )
    a("")
    tags = ["/".join(str(e) for _s, e in ch) for ch in HH_PHASE_CHAINS]
    a(f"| Hyp | 2016/2019/2022/2025 (main) | {tags[0]} | {tags[1]} | Reading |")
    a("|---|---|---|---|---|")
    for h in ("H3a", "H3b", "H3c"):
        main = prim.get(("full", h))
        ph = [
            next(
                (
                    r
                    for r in hh
                    if r["panel"] == "full"
                    and r["hypothesis"] == h
                    and r["operationalisation"] == f"{h} phase-shift chain {t}"
                ),
                None,
            )
            for t in tags
        ]
        cells, sigs = [], []
        for r in (main, *ph):
            if r is None or r["estimate"] in ("", None):
                cells.append("–")
                sigs.append(0)
                continue
            pv = f"; pivots {r['pivots'].replace(';', '/')}" if r["pivots"] else ""
            cells.append(f"{_f(r['estimate'])} [{_f(r['ci_low'])}, {_f(r['ci_high'])}]{pv}")
            sigs.append(_ci_sig(r))
        a(f"| {h} | {cells[0]} | {cells[1]} | {cells[2]} | {_hh_phase_reading(sigs)} |")
    a("")
    a("## 7. Hamburg shock timing (binding, §4.3 / D7)")
    a("")
    a(_hh_shock_text())
    a("")
    a("## 8. Pivot-2016 caveat (R6) and OSM completeness")
    a("")
    tot = mf.get("osm_city_totals", {})
    t25 = tot.get("2025")
    shares = ", ".join(
        f"{y}: {int(tot[y]):,} ({100 * int(tot[y]) / int(t25):.0f}%)"
        for y in ("2013", "2016", "2019", "2022", "2025")
        if y in tot and t25
    )
    a(
        "**Pivot 2016 is the pivot most exposed to OSM completeness artefacts** (pre-registration §4.3, "
        "R6). POIs inside Hamburg's Gebiete in the OA panel, per snapshot, with the share of 2025: "
        f"{shares}. The pivot-2016 P window starts at the 2013 snapshot, while coverage was still "
        "diffusing unevenly across the city. C5 shares and OA are ratio measures, robust to city-wide "
        "growth (index-definition §2.4) but not to spatially uneven mapping diffusion. The full-chain "
        "H3a/H3b primaries pool pivot 2016 with 2019 and 2022; §5 shows each pivot separately, and "
        "`HH/modern` shows pivot 2022 without it. The 2013 status class used as the pivot-2016 H3b "
        "control also rests on an assumed reference date (§9)."
    )
    a("")
    a(
        "## 9. Data prerequisites carried from phase A (`docs/epic-e/354-phase-a-data-prerequisites.md`)"
    )
    a("")
    a(
        "- **Reference date (§2.1(3)).** Edition E carries data as of 31 Dec (E−1), confirmed from the "
        "source metadata for every edition with a published report (2016–2025, phase A §3) and "
        "**assumed** for 2013–2015, which have no published report (O3). It matters for the 2013 "
        "status class (pivot-2016 H3b control; H2 incremental level for the window starting 2013) and "
        "for the 2013–2015 editions in the phase-shift chains."
    )
    a(
        "- **Class ordering (§2.1(4)).** Per-Gebiet agreement with the published report annexes is 100% "
        "for status, Dynamik and population, 2016–2025; the annex Status-summe and Dynamik-summe "
        "order the classes exactly as coded (positiv = falling disadvantage = 1; hoch = least "
        "disadvantage = 1). Guarded by `test_354_hh_sozialmonitoring_published_class_counts` and "
        "`test_354_hh_sozialmonitoring_label_code_consistency`. The table below recounts the classes "
        "the suite consumed and compares them with the published counts in "
        "`seed_hh_sozialmonitoring_published_class_counts`."
    )
    a(f"- **Indicator values (§2.1(5), binding).** {HH_INDICATOR_SENTENCE}")
    a(
        "  The suite therefore runs on classes only (§4.1); the annex z-scores are not ingested. A "
        "continuous composite (the domain-preferred labour-market and transfer core S3–S6) needs an "
        "architect check for the new artefact (phase A O4) and its own sign-off (§4.4). It is a "
        "follow-up, not part of #355."
    )
    a("")
    a(
        "| Edition | hoch | mittel | niedrig | sehr niedrig | positiv | stabil | negativ | Gebiete | = published annex? | "
        "tie ceiling, status | tie ceiling, Dynamik |"
    )
    a("|---|---|---|---|---|---|---|---|---|---|---|---|")
    for c in mf.get("hh_classes", []):
        sc, dc = c["status_counts"], c["dynamik_counts"]
        mp = {True: "yes", False: "**NO**", None: "no annex (O3)"}[c["matches_published"]]
        a(
            f"| {c['edition']} | {sc['1']} | {sc['2']} | {sc['3']} | {sc['4']} | {dc['1']} | {dc['2']} | "
            f"{dc['3']} | {c['n']} | {mp} | {_f(c['ceiling_status'])} | {_f(c['ceiling_dynamik'])} |"
        )
    a("")
    a("## 10. Tie-ceiling context (domain sign-off 354 R5)")
    a("")
    cs = [c["ceiling_status"] for c in mf.get("hh_classes", []) if c["edition"] == 2025]
    cd = [c["ceiling_dynamik"] for c in mf.get("hh_classes", []) if c["edition"] in full_ends]
    a(
        "Against a tied class variable, no continuous measure can reach |ρ| = 1. The ceiling is the "
        "Spearman of the class with an ideal measure that orders every Gebiet consistently with its "
        "class (table above; method of domain sign-off 354 §3). "
        + (f"For the 2025 status class (H1a–c) it is {cs[0]:.2f}. " if cs else "")
        + (
            f"For the Dynamik classes of the main chain (H3a–c outcomes and controls), about 85% "
            f"'stabil', it is {min(cd):.2f}–{max(cd):.2f}. "
            if cd
            else ""
        )
        + "**Context only:** the Cohen effect labels and every verdict are applied as pre-registered, "
        "on the raw ρ. A 'negligible' Hamburg H3 ρ is negligible on an outcome that cannot exceed this "
        "ceiling; it is not rescaled."
    )
    a("")
    a("## 11. AUC comparability and top coefficients (binding text, §1.2)")
    a("")
    a(HH_AUC_TEXT)
    a("")
    for pk, label in HH_PANELS:
        for key in ("H1", "H2"):
            if pk == "modern" and key == "H1":
                continue  # identical to the full-chain H1 (shared 2025 cross-section)
            co = meta.get(f"HH/{pk}", {}).get("coefficients", {}).get(key)
            if co:
                a(
                    f"- **{label} {key}:** "
                    + ", ".join(f"{n.replace('oa_cat:', '')} ({c:+.3f})" for n, c in co)
                )
    a("")
    a(
        "**Fixed feature lists (A1.1)**: a category enters if its min-base flag is unset in ≥ 20% of the "
        "design's included rows; sorted lexicographically. Gebiete are smaller than Berlin PLRs, so "
        "fewer categories pass."
    )
    a("")
    for pk, label in HH_PANELS:
        fl = meta.get(f"HH/{pk}", {}).get("feature_lists", {})
        for k in ("H1_category", "H1_commercial", "H2_category"):
            if k in fl and not (pk == "modern" and k.startswith("H1")):
                a(f"- {label} {k} ({len(fl[k])}): {', '.join(fl[k]) or 'none'}")
    a("")
    a("## 12. Secondary, sensitivity and exploratory rows")
    a("")
    a(
        "None of these can change a headline verdict. They are uncorrected and use the unadjusted 95% "
        "cluster-bootstrap CI (§5.4)."
    )
    a("")
    a("| Panel | Hyp | Role | Operationalisation | Estimate [95% CI] | n | Verdict | Notes |")
    a("|---|---|---|---|---|---|---|---|")
    n_expl = 0
    for r in hh:
        if r["role"] == "primary":
            continue
        if r["verdict"] in (SUPPORTED, CONTRADICTED, NOT_SIGNIFICANT):
            n_expl += 1
        note = r["notes"].replace("|", "/")
        est_cell = f"{_f(r['estimate'])} [{_f(r['ci_low'])}, {_f(r['ci_high'])}]"
        if r["verdict"] == NO_DATA:
            est_cell = "– (not reported: NO DATA)"
        a(
            f"| {r['panel']} | {r['hypothesis']} | {r['role']} | {r['operationalisation']} | {est_cell} | "
            f"{r['n']} | {r['verdict'] or 'descriptive'} | {note} |"
        )
    a("")
    a(
        f"**Exploratory-row tally (§5.5).** {n_expl} non-primary rows carry a verdict across both Hamburg "
        "panels (descriptive and NO DATA rows excluded; the population-weighted row counts once per "
        "H1a–c, N7; the H1 family's non-primary rows appear in both panels). At α = 0.05 about "
        f"{0.05 * n_expl:.1f} would be expected significant by chance alone."
    )
    a("")
    a("## 13. What the suite must not claim (binding text, §9)")
    a("")
    a(MUST_NOT_TEXT)
    a(
        "- Hamburg H1a–c sentences name the construct: status is the Sozialmonitoring Statusindex, which "
        "includes migration background and school leaving (§4.5, §9)."
    )
    a("")
    a("## 14. Limitations")
    a("")
    a(
        "- **Classes only.** The Sozialmonitoring WFS publishes classes, so every Hamburg status variable "
        "is ordinal (index-definition §3.1–3.2: rank methods, no OLS on class codes, no averaging of "
        "classes across Gebiete). There is no Hamburg 2018 baseline."
    )
    a(
        "- **#337 node→way:** every row is POI-based; OSM features mapped as ways are not yet counted "
        "as points. Deferred; disclosed for all rows."
    )
    a(
        "- **OSM completeness:** Hamburg's mapped POIs roughly tripled between 2013 and 2025 (§8). Ratio "
        "measures absorb city-wide growth, not spatially uneven diffusion."
    )
    a(
        "- **D4** (`ewr_composite`) is Stadtteil-grain disaggregated to Gebiete, so it carries about 99 "
        "independent values; `foreigners_share` overlaps the migration-background indicator, so D4 is a "
        "sensitivity only (§4.1)."
    )
    a(
        "- **Indicator definitions** change from the 2019 edition (S3 adds AsylbLG; S4 labelled "
        "'Arbeitslose (SGB II)' in the 2019 and 2021 annexes; S7 categories renamed; phase A §5). The "
        "published classes carry these changes; the class-only WFS cannot show their size."
    )
    a("- **Refugee accommodation:** no open small-area source; disclosed, not corrected (§7).")
    a("")
    a("## 15. E5 superseded")
    a("")
    a(
        "This suite supersedes `docs/epic-h/E5-hamburg-lead-lag-findings.md` and "
        "`analysis/e5_hamburg_lead_lag.py` in full (pre-registration §1.4, §6.3). E5 differenced annual "
        "status classes against a 3-year Dynamik concept, so its annual k = 1 cross-lag used "
        "overlapping Dynamik windows (rejected, §8), and its Section 2 ran OLS on ordinal class codes, "
        "which index-definition §3.2 forbids. Its numbers must not be cited. The script stays in the "
        "repository, marked superseded, for the audit trail; it is no longer part of `poe analysis`, "
        "and the E5 findings header points here."
    )
    a("")
    a("## 16. Deviations from the pre-registration")
    a("")
    a(
        "Dated 2026-11-01. None changes a hypothesis, variable, expected sign, family or verdict rule. "
        "Items that are consequences of fixed rules are listed with the rule that produced them."
    )
    a("")
    for i, dv in enumerate(_hh_deviations(records, meta), start=1):
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
    ap.add_argument(
        "--findings",
        type=Path,
        default=None,
        help="findings path (default: the city's generated findings file, §7.2)",
    )
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
    findings = args.findings or (FINDINGS_BER if args.city == "BER" else FINDINGS_HH)
    if args.city == "BER" and not args.no_findings:
        if {"BER/modern", "BER/thesis-era"} <= set(meta_all):
            write_berlin_findings(findings, [r for r in records if r["city"] == "BER"], meta_all)
            print(f"[suite] wrote {findings}")
        else:
            print(
                "[suite] findings need both BER panels in the metadata; run --city BER without --panel"
            )
    elif args.city == "HH" and not args.no_findings:
        if {"HH/full", "HH/modern"} <= set(meta_all):
            # all records: the cross-city label table reads the BER/modern primaries (§7.2)
            write_hamburg_findings(findings, records, meta_all)
            print(f"[suite] wrote {findings}")
        else:
            print(
                "[suite] findings need both HH panels in the metadata; run --city HH without --panel"
            )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
