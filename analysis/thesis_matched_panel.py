"""
analysis/thesis_matched_panel.py
================================
#371 (E1c): the matched-grain, harmonised-KPI Berlin-Hamburg panel of the thesis hypothesis
suite. It is run through the suite's own CLI (pre-registration §9.3):

  uv run python analysis/thesis_hypothesis_suite.py --panel matched      # city-less: BER, HH, X8

Binding design: docs/methodology/371-matched-comparison-preregistration.md (cited "PR" below),
including Revisions 1-3 (D1-D10), Amendment 4 (A4.1-A4.4) and "Amendment 4, revision 1"
(E1-E9, O1, the scoped §8.2 exemption), which binds wherever it differs from A4.1-A4.4. Whatever
PR does not change carries over from docs/methodology/354-355-hypothesis-suite-preregistration.md
(cited "P354"), Amendments 1-3 included (PR "Binding rule"). Data evidence:
docs/epic-e/371-data-checks.md (cited "DC").

What the panel is (PR §0)
-------------------------
- Grain: Berlin Bezirksregion (BZR, lor_2021) vs Hamburg Stadtteil, both built bottom-up from a
  balanced child set (Berlin PLRs inhabited in 2018/2020/2022/2024 with MSS values in
  2021/2023/2025; Hamburg Gebiete scored in all four editions 2019/2021/2023/2025: 849, A4.3).
  An absent Hamburg (edition, Gebiet) row means "not scored", never 0 and never imputed (DC §1).
- Status: harmonised core K = mean of within-city, within-edition z-scores of U (unemployment),
  T (transfer receipt) and C (child poverty). Primary core-3H uses Berlin T* = 100 (N_U + N_T) /
  P (§3.7); sensitivities core-3M (Berlin T = S3) and core-2 (U + C, the T-free construct; HH
  S5 excludes AsylbLG, DC §3, so core-1U is not triggered).
- Hamburg S3 for edition 2019 is the publisher's re-based level s3_2022 - D3_2022 (R19, A4 rev. 1
  E1); the as-published level is sensitivity R19-pub.
- Berlin population: ONE series, int_berlin_ewr_age_bands_plr2021.residents_total (A4.2), for
  weights, the T* base and thresholds; asserted in code.
- Inference: spatial block bootstrap, G = 24 k-means blocks per city (PR §6.2), B = 1999, seed
  42; city difference X8 from independent block bootstraps (BER seed 42, HH seed 43, PR §6.3).

Outputs (PR §9, maintainer call M1 -> separate files; the existing suite outputs are not
touched): docs/epic-e/matched-comparison-results.csv, docs/epic-e/matched-comparison-metadata.json
(fixed feature lists and block assignment written before any fit, PR §6.2 / §8.4) and the
generated findings docs/epic-e/E1c-matched-comparison-findings.md (PR §9.2, never hand-edited).
"""

from __future__ import annotations

import csv
import io
import json
import re
import sys
from collections.abc import Callable, Iterable, Sequence
from dataclasses import dataclass, field, replace
from pathlib import Path

import numpy as np
import pandas as pd
from scipy import stats

sys.path.insert(0, str(Path(__file__).parent))
import thesis_hypothesis_suite as S  # noqa: E402  (shared estimators, P354 §5)
from directional_inference import (  # noqa: E402
    ALPHA,
    CONTRADICTED,
    NO_DATA,
    NOT_SIGNIFICANT,
    SEED,
    SUPPORTED,
    auc_score,
    bh_adjust,
    bootstrap_p,
    grouped_oof_auc,
    holm_adjust,
    partial_spearman,
    verdict,
)
from e1_regressions import THESIS_HYPOTHESES  # noqa: E402

REPO = S.REPO
MATCHED_RESULTS_CSV = REPO / "docs" / "epic-e" / "matched-comparison-results.csv"
MATCHED_METADATA_JSON = REPO / "docs" / "epic-e" / "matched-comparison-metadata.json"
MATCHED_FINDINGS = REPO / "docs" / "epic-e" / "E1c-matched-comparison-findings.md"

# PR §0 / §4.1: editions 2019/2021/2023/2025 in both cities; levels as of 31.12.(E-1); windows are
# OSM snapshot years; pivots 2021 and 2023; H1 cross-section edition 2025 x OSM 2025.
EDITIONS = (2019, 2021, 2023, 2025)
WINDOWS = ((2019, 2021), (2021, 2023), (2023, 2025))
PIVOTS = (2021, 2023)
H1_EDITION = 2025
SNAPSHOTS = (2019, 2021, 2023, 2025)
# PR §3.7 D9a (DC §4.2): f = (Regelaltersgrenze - 65) / 2 at the reference date 31.12.Y, from the
# § 235 Abs. 2 SGB VI table (cohorts 1953/1955/1957/1958: +7/+9/+11/+12 months).
RAG_F = {2018: 7 / 24, 2020: 9 / 24, 2022: 11 / 24, 2024: 12 / 24}
# PR §6.2: G = 24 contiguous k-means blocks per city; sensitivities G = 16 and G = 36.
G_PRIMARY = 24
G_SENS = (16, 36)
KMEANS_N_INIT = 10
KMEANS_SEED = 42
N_SPLITS = 5  # P354 §5.1: 5-fold GroupKFold, by spatial block here (PR §6.1)
# PR §6.3: independent bootstrap streams, Berlin seeded 42, Hamburg 43 (X8 only).
SEED_X8 = {"BER": SEED, "HH": 43}
# P354 §5.3 cluster floor for the confirmatory rows. The pre-registered coarse-cluster
# sensitivities (G = 16, Bezirk 12 / 7, PR §6.2) must be reported, so they use the
# directional_inference default floor of 5 and carry the PR §6.2 coverage note.
MIN_BLOCKS = 20
MIN_BLOCKS_SENS = 5
# PR §6.3: MDD = 2.8 x bootstrap SE of Delta (Cohen 1988); imprecision thresholds.
MDD_FACTOR = 2.8
MDD_IMPRECISE = {"rho": 0.30, "auc": 0.10}
# PR §2.2: size-overlap sensitivity; A4.1: Berlin thresholds on native 31.12.2024 population.
MIN_UNIT_POP = 5000
# PR §3.7 / §7.2: N2 empirical-logit continuity correction (Cox 1970).
N2_CC = 0.5
# PR §7.3: k = 4 nearest neighbours as the island fallback for N3's queen weights.
N3_KNN = 4
MORAN_PERMUTATIONS = 999
# PR §5 / P354 §5.1: the four commercial consumption domains, the café / fast-food categories.
COMMERCIAL_DOMAINS = S.COMMERCIAL_DOMAINS
GASTRO = "Gastronomy"
CAFE_KEY, FASTFOOD_KEY, SPORT_DOMAIN = S.CAFE_KEY, S.FASTFOOD_KEY, S.SPORT_DOMAIN
MINBASE_DOMAINS = ("Gastronomy", "Retail", "Services", "Entertainment", "Sports and Recreation")
PRIMARY_ORDER = S.PRIMARY_ORDER
N_ORDER = ("N1", "N2", "N3")
THESIS_WORDS = {"✓": "supported", "(✓)": "partly supported", "0": "undecided", "✗": "rejected"}

# PR §9.1: the P354 §7.1 columns, then the new columns appended at the end.
MATCHED_COLUMNS = (
    *S.CSV_COLUMNS,
    "family",
    "status_construct",
    "estimate_ber",
    "estimate_hh",
    "mdd",
    "n_blocks",
    "definition_fallback",
    "flags",
)
# PR §9.1 flags vocabulary, plus the two tokens of A4 rev. 1 (E1 R19-pub, E5 W24; the domain
# re-check's non-blocking token note), and E7's popgrowth_driven (renamed from newbuild_driven).
FLAG_VOCAB = (
    "small_units_flip",
    "core3m_flip",
    "core2_flip",
    "core1u_flip",
    "t_star_approx",
    "ewr_2022_interpolated",
    "maup_flip",
    "mapping_driven",
    "popgrowth_driven",
    "w2_only",
    "amendment3_below_chance",
    "not_stated_city_difference",
    "w24_weight_sensitive",
    "r19_revision_sensitive",
)
# PR §7: the new hypotheses (no thesis column; expected sign of the partial Spearman).
N_HYPOTHESES = {
    "N1": {
        "wording": "Among neighbourhoods with above-median disadvantage at the pivot, a relative "
        "growth of the commercial offering precedes a relative decline in officially measured "
        "disadvantage.",
        "expected": "negative",
        "confirmatory": True,
    },
    "N2": {
        "wording": "A relative shift in the gastronomy mix toward cafés precedes a relative "
        "decline in officially measured disadvantage.",
        "expected": "negative",
        "confirmatory": True,
    },
    "N3": {
        "wording": "Relative commercial growth in adjacent neighbourhoods precedes a relative "
        "decline in a neighbourhood's officially measured disadvantage, beyond its own "
        "commercial growth.",
        "expected": "negative",
        "confirmatory": False,
    },
}


@dataclass(frozen=True)
class CityCfg:
    """ADR-0005: city specifics live in config, not in the estimators."""

    city: str
    label: str
    unit_level: str
    unit_vintage: str
    child_level: str
    child_vintage: str
    epsg: int
    grain: str
    fine_grain: str
    unit_word: str
    child_word: str
    # PR §7.1 R2: the city-relative centre for the exploratory N1 centrality split.
    centre_name: str
    centre_lon: float
    centre_lat: float


CITY: dict[str, CityCfg] = {
    "BER": CityCfg(
        "BER",
        "Berlin",
        "bzr",
        "lor_2021",
        "plr",
        "lor_2021",
        25833,
        "ber_bzr_2021",
        "plr_2021",
        "Bezirksregion",
        "PLR",
        "Alexanderplatz",
        13.4132,
        52.5219,
    ),
    "HH": CityCfg(
        "HH",
        "Hamburg",
        "subarea_l1",
        "current",
        "subarea_l2",
        "current",
        25832,
        "hh_stadtteil",
        "hh_gebiet",
        "Stadtteil",
        "Gebiet",
        "Rathausmarkt",
        9.9930,
        53.5504,
    ),
}
CITIES = ("BER", "HH")

# ---------------------------------------------------------------------------
# SQL (every load ends in ORDER BY, P354 §5.7). All SQL text the matched panel runs is listed
# here, so the A4.2 single-population guard can check every query (assert_single_berlin_pop).
# ---------------------------------------------------------------------------

BER_POP_MODEL = "int_berlin_ewr_age_bands_plr2021"
BER_LEVEL = ("arbeitslose_anteil", "transferbezug_anteil", "kinderarmut_anteil")
BER_CHANGE = ("arbeitslose_dynamik", "transferbezug_dynamik", "kinderarmut_dynamik")
# #360 meaning: S1 Arbeitslosigkeit, S3 Transferbezug (non-unemployed recipients), S4 Kinderarmut.
BER_CODE = dict(zip(BER_LEVEL, ("S1", "S3", "S4"), strict=True)) | dict(
    zip(BER_CHANGE, ("D1", "D3", "D4"), strict=True)
)
HH_CORE = ("S3", "S4", "S5")  # PR §3.1: T = S3, U = S4, C = S5 (PA §5 numbering)
HH_CONTEXT = ("S1", "S7")  # PR §3.1: context only, never in K (D4)
_IN_BER = ", ".join(f"'{n}'" for n in BER_LEVEL + BER_CHANGE)

SQL: dict[str, str] = {
    "ber_mss": f"""
        SELECT area_code, edition, indicator, raw_attr, indicator_value
        FROM main.stg_berlin_mss_indicators
        WHERE area_vintage = 'lor_2021' AND edition IN (2021, 2023, 2025)
          AND indicator IN ({_IN_BER})
        ORDER BY area_code, edition, indicator
    """,
    # Phase 1 (PR §8.4): presence only -- which PLR x edition x indicator carries a value, and
    # which Gebiet x edition is scored (with its population, a weight, not an outcome).
    "ber_presence": f"""
        SELECT area_code, edition, indicator
        FROM main.stg_berlin_mss_indicators
        WHERE area_vintage = 'lor_2021' AND edition IN (2021, 2023, 2025)
          AND indicator IN ({_IN_BER}) AND indicator_value IS NOT NULL
        ORDER BY area_code, edition, indicator
    """,
    "hh_presence": """
        SELECT gebiet_id AS area_code, edition_year AS edition, population
        FROM main.stg_hamburg_sozialmonitoring_indicators
        WHERE indicator = 'S3' AND edition_year BETWEEN 2016 AND 2025
        ORDER BY area_code, edition
    """,
    "ber_mss_2019_pre": f"""
        SELECT area_code, indicator, indicator_value
        FROM main.stg_berlin_mss_indicators
        WHERE area_vintage = 'lor_pre2021' AND edition = 2019 AND indicator IN ({_IN_BER})
        ORDER BY area_code, indicator
    """,
    "ber_classes": """
        SELECT area_code, edition, status_index
        FROM main.stg_berlin_mss
        WHERE area_vintage = 'lor_2021' AND edition IN (2021, 2023, 2025)
          AND status_index IS NOT NULL
        ORDER BY area_code, edition
    """,
    "ber_bands": f"""
        SELECT plr_id_2021 AS area_code, reference_year, band_code, age_from, age_to,
               residents, residents_total, is_interpolated, derivation
        FROM main.{BER_POP_MODEL}
        WHERE city_code = 'BER' AND reference_year IN (2018, 2020, 2022, 2024)
        ORDER BY area_code, reference_year, age_from
    """,
    "ber_xwalk_dominant": """
        SELECT plr_id_2021, plr_id_pre2021, population_dominance_frac
        FROM main.int_berlin_lor_crosswalk_dominant_pop_2021
        ORDER BY plr_id_2021, plr_id_pre2021
    """,
    "ber_milieuschutz": """
        SELECT area_code, under_milieuschutz, milieuschutz_overlap_frac, designation_year
        FROM main.int_berlin_milieuschutz_event_panel
        WHERE area_vintage = 'lor_2021' AND snapshot_year = 2025
        ORDER BY area_code
    """,
    "hierarchy": """
        SELECT area_code, parent_area_code
        FROM main.dim_area_hierarchy
        WHERE city_code = ? AND area_level = ? AND parent_area_level = ?
        ORDER BY area_code
    """,
    "geometry": """
        SELECT area_code, area_name,
               ST_AsWKB(g) AS geom_wkb,
               ST_X(ST_Centroid(g)) AS cx, ST_Y(ST_Centroid(g)) AS cy,
               ST_Area(ST_Transform(ST_GeomFromGeoJSON(geometry_geojson), 'EPSG:4326',
                       'EPSG:25832', always_xy := true)) / 1e6 AS area_km2
        FROM (
            SELECT area_code, area_name, geometry_geojson,
                   ST_Transform(ST_GeomFromGeoJSON(geometry_geojson), 'EPSG:4326',
                                'EPSG:{epsg}', always_xy := true) AS g
            FROM main.dim_area_geometry
            WHERE city_code = ? AND area_level = ? AND area_vintage = ?
        )
        ORDER BY area_code
    """,
    "centre": """
        SELECT ST_X(p) AS x, ST_Y(p) AS y FROM (
            SELECT ST_Transform(ST_Point(?, ?), 'EPSG:4326', 'EPSG:{epsg}', always_xy := true) AS p
        )
    """,
    "hh_annex": """
        SELECT gebiet_id AS area_code, edition_year AS edition, population, indicator,
               z_score, edition_mean, edition_sd, share, change_pp, cell_flag, z_precision,
               moments_precision, status_summe, dynamik_summe
        FROM main.stg_hamburg_sozialmonitoring_indicators
        WHERE indicator IN ('S1', 'S3', 'S4', 'S5', 'S7', 'D3')
          AND edition_year BETWEEN 2016 AND 2025
        ORDER BY area_code, edition, indicator
    """,
    "hh_classes": """
        SELECT area_code, edition, status_index
        FROM main.int_hamburg_sozialmonitoring_index
        WHERE edition IN (2019, 2021, 2023, 2025) AND status_index IS NOT NULL
        ORDER BY area_code, edition
    """,
    "hh_zone_cover": """
        WITH z AS (
            -- the staged zone WKB is already in EPSG:25832 (ETRS89 / UTM 32N)
            SELECT ST_Union_Agg(ST_GeomFromWKB(geometry_wkb)) AS zg
            FROM main.stg_hamburg_displacement_zones
            WHERE CAST(LEFT(in_force_date, 10) AS DATE) <= DATE '2024-12-31'
        ), g AS (
            SELECT area_code,
                   ST_Transform(ST_GeomFromGeoJSON(geometry_geojson), 'EPSG:4326',
                                'EPSG:25832', always_xy := true) AS gg
            FROM main.dim_area_geometry
            WHERE city_code = 'HH' AND area_level = 'subarea_l2'
        )
        SELECT g.area_code, ST_Area(ST_Intersection(g.gg, z.zg)) / ST_Area(g.gg) AS cover
        FROM g, z
        ORDER BY g.area_code
    """,
    "oa": """
        SELECT area_code, snapshot_year, area_vintage, oa_level, poi_domain_h,
               COALESCE(poi_category_h, '') AS poi_category_h, oa_value, oa_min_base_flag,
               level_stock_local, parent_stock_local, level_stock_city, parent_stock_city
        FROM main.int_poi_oa_native_panel
        WHERE city_code = ? AND area_vintage = ? AND weight_variant = 'standard'
          AND methodology_variant = 'faithful' AND snapshot_year IN (2019, 2021, 2023, 2025)
        ORDER BY area_code, snapshot_year, oa_level, poi_domain_h, poi_category_h
    """,
    "c5": """
        SELECT area_code, snapshot_year, area_vintage, total_poi_count, commercial_poi_count,
               city_total_poi_count, city_commercial_poi_count, total_c5_share,
               commercial_c5_share
        FROM main.int_poi_c5_share_native
        WHERE city_code = ? AND area_vintage = ? AND snapshot_year IN (2019, 2021, 2023, 2025)
        ORDER BY area_code, snapshot_year
    """,
    "types": """
        SELECT area_code, snapshot_year, poi_domain_h, poi_category_h, poi_type_h,
               SUM(poi_count) AS poi_count
        FROM main.int_poi_development_native
        WHERE city_code = ? AND area_vintage = ? AND snapshot_year = 2025
          AND poi_domain_h IN ('Sports and Recreation', 'Gastronomy')
        GROUP BY ALL
        ORDER BY area_code, snapshot_year, poi_domain_h, poi_category_h, poi_type_h
    """,
}

# ---------------------------------------------------------------------------
# Leakage guards (PR §8, P354 §5.8, R-C3) -- runtime assertions
# ---------------------------------------------------------------------------

# A4.2: the only Berlin population series is int_berlin_ewr_age_bands_plr2021.residents_total.
# Any other population-carrying model is rejected wherever the matched panel reads SQL.
FORBIDDEN_BER_POP = (
    r"\bint_berlin_ewr_plr2021\b",
    r"\bint_ewr_socioeco\w*",
    r"\bstg_berlin_ewr\b",
    r"\bmart_area_demographics\b",
    r"\bint_berlin_ewr_socioeco\w*",
)


def assert_single_berlin_pop(sql_texts: Iterable[str]) -> None:
    """A4.2 (Amendment 4): the analysis reads Berlin population from the band model only."""
    for sql in sql_texts:
        for pat in FORBIDDEN_BER_POP:
            assert not re.search(pat, sql), (  # noqa: S101 -- R-C3
                f"A4.2: the matched panel may read Berlin population only from {BER_POP_MODEL}; "
                f"query references {pat!r}"
            )


def assert_pop_source(frame: pd.DataFrame) -> None:
    """A4.2: every Berlin population frame carries its source; only the band model is allowed."""
    assert frame.attrs.get("source") == BER_POP_MODEL, (  # noqa: S101 -- R-C3
        f"A4.2: Berlin population from {frame.attrs.get('source')!r}, not {BER_POP_MODEL}"
    )


def assert_weight_dates(weight_year: int, ref_year: int, sensitivity: str | None) -> None:
    """PR §8.2 (A4 rev. 1, scoped exemption): aggregation weights date from the outcome's own
    reference date, never later. Exempt ONLY for runs tagged sensitivity = 'W24'."""
    if sensitivity == "W24":
        return
    assert weight_year <= ref_year, (  # noqa: S101 -- R-C3
        f"§8.2: weights from {weight_year} post-date the outcome reference date {ref_year}"
    )


# PR §8.2 / A4 rev. 1: the only permitted later-edition inputs for a level. Key: (city,
# indicator, level edition, source edition).
PERMITTED_LATER_INPUTS = {
    ("HH", "S3", 2019, 2022): "s3_2019_rev = s3_2022 - D3_2022 (A4 rev. 1 E1)",
    ("BER", "S1", 2019, 2021): "backcast anteil_2021 - dynamik_2021 (§4.2)",
    ("BER", "S3", 2019, 2021): "backcast anteil_2021 - dynamik_2021 (§4.2)",
    ("BER", "S4", 2019, 2021): "backcast anteil_2021 - dynamik_2021 (§4.2)",
}


def assert_level_provenance(prov: Iterable[tuple[str, str, int, int]]) -> None:
    """PR §8.2: a level may draw on a later edition only through a named, permitted input."""
    for city, ind, edition, source in prov:
        if source > edition:
            assert (city, ind, edition, source) in PERMITTED_LATER_INPUTS, (  # noqa: S101 -- R-C3
                f"§8.2: {city} {ind} level {edition} uses edition {source}, which is not a "
                "permitted later-edition input"
            )


# PR §8.2 / PM decision M3 (recorded in the pre-registration, "PM decisions on the open calls"):
# the Berlin 31.12.2022 bands are linearly interpolated between 2020 and 2024, so the edition-2023
# weights and T* base embed 31.12.2024 data. That is a pre-registered input, listed here by name;
# no other interpolated (later-data) input is permitted. The geo-DS confirms it in the results
# sign-off (review finding 8).
PERMITTED_PREREG_INPUTS = {
    ("BER", "bands", 2022): "M3: 31.12.2022 EWR bands = midpoint of 31.12.2020 and 31.12.2024 "
    "(int_berlin_ewr_age_bands_plr2021, derivation linear_interpolation_2020_2024)",
}


def assert_prereg_inputs(city: str, used: Iterable[tuple[int, bool]]) -> None:
    """PR §8.2: an interpolated band year (which embeds later data) is used only if it is a
    pre-registered input (M3)."""
    for year, interpolated in used:
        if interpolated:
            assert (city, "bands", year) in PERMITTED_PREREG_INPUTS, (  # noqa: S101 -- R-C3
                f"§8.2: interpolated {city} bands for {year} are not a pre-registered input"
            )


def assert_w24_isolated(rows: Sequence[dict]) -> None:
    """A4 rev. 1 §8.2 exemption: W24 rows never feed a primary or BH-corrected row."""
    for r in rows:
        tags = r.get("_tags", set())
        if "W24" in tags:
            assert r["role"] not in ("primary", "interaction"), (  # noqa: S101 -- R-C3
                f"W24 row in role {r['role']}: {r['hypothesis']} {r['operationalisation']}"
            )
            assert r["family"] == "none", (  # noqa: S101 -- R-C3
                f"W24 row in family {r['family']}: {r['hypothesis']}"
            )


def assert_bh_inputs_primary(rows: Sequence[dict]) -> None:
    """A BH family is built only from untagged primary-run rows (no sensitivity, no W24)."""
    for r in rows:
        assert not r.get("_tags"), (  # noqa: S101 -- R-C3
            f"sensitivity-tagged row {sorted(r['_tags'])} entering a BH family: {r['hypothesis']}"
        )


# PR §8.1: the predictor/control allow-list for panel = matched is OA, g(c), Delta r, Wg(c), K and
# dK. The P354 §5.2 POI-side carry-overs (domain/category OA variants, base indicators, per-1k
# stock rows, OA-basket, total/café C5 growth) are POI-derived members of the same family.
MATCHED_POI_PREFIXES = (
    *S.POI_PREFIXES,
    "dr_cafe_ff",
    "g_cafe_in_gastro",
    "g_ff_in_gastro",
    "wg_commercial_c5",
)
MATCHED_STATUS = frozenset({"K", "dK", "K_pivot", "K_start", "dK_P", "dK_F"})
# Hamburg annex indicators and Berlin raw MSS indicators never appear as predictors (R-A1).
ANNEX_NAMES = frozenset(
    {f"S{i}" for i in range(1, 8)}
    | {f"D{i}" for i in range(1, 7)}
    | {"status_summe", "dynamik_summe", "share", "z_score", "change_pp", "population"}
    | set(BER_LEVEL + BER_CHANGE)
)


def assert_matched_construct(
    predictors: Sequence[str], controls: Sequence[str], outcome: str
) -> None:
    """PR §8.1: construct disjointness on the matched panel."""
    for name in [*predictors, *controls]:
        base = name.split("@")[0]
        assert base not in ANNEX_NAMES, f"§8.1: annex/MSS indicator as predictor: {name}"  # noqa: S101 -- R-C3
        assert base.startswith(MATCHED_POI_PREFIXES) or base in MATCHED_STATUS, (  # noqa: S101 -- R-C3
            f"§8.1: {name} is not on the matched allow-list"
        )
    ob = outcome.split("@")[0]
    assert ob in MATCHED_STATUS, f"§8.1: outcome {outcome} is not K/dK"  # noqa: S101 -- R-C3


def assert_k_inputs(city: str, indicators: Sequence[str]) -> None:
    """PR §8.1: Hamburg S1 and S7 never enter K (asserted by column name); K is U, T, C only."""
    allowed = {"BER": {"S1", "S3", "S4"}, "HH": set(HH_CORE)}[city]
    got = set(indicators)
    assert got <= allowed, f"§8.1: {city} K built from {sorted(got - allowed)}"  # noqa: S101 -- R-C3
    assert not (got & set(HH_CONTEXT) and city == "HH"), "§8.1: HH S1/S7 in K"  # noqa: S101 -- R-C3


def assert_balanced(children_by_edition: dict[int, set[str]]) -> None:
    """PR §8.5: every matched unit has the same set of children in all four editions."""
    sets = list(children_by_edition.values())
    assert sets and all(s == sets[0] for s in sets), "§8.5: unbalanced child panel"  # noqa: S101 -- R-C3


# ---------------------------------------------------------------------------
# Pure construction helpers (unit-tested)
# ---------------------------------------------------------------------------


def balanced_children(present: pd.DataFrame, editions: Sequence[int] = EDITIONS) -> list[str]:
    """PR §2.3 / A4.3 / DC §1: children present (scored) in every edition. `present` has one row
    per (area_code, edition) that EXISTS; an absent row means 'not scored in that edition' and
    excludes the child -- it is never filled with 0 or imputed."""
    sub = present[present["edition"].isin(editions)]
    cnt = sub.groupby("area_code")["edition"].nunique()
    return sorted(cnt.index[cnt == len(editions)].tolist())


def recover_share(z, mean, sd) -> np.ndarray:
    """PR §3.3: x_hat = m + z * s per edition and indicator; the annex moments are fractions, so the
    share in % is 100 (m + z s) (DC §1 "Units")."""
    return 100.0 * (
        np.asarray(mean, dtype=float) + np.asarray(z, dtype=float) * np.asarray(sd, dtype=float)
    )


def assert_share_recovery(annex: pd.DataFrame, tol: float = 1e-6) -> None:
    """PR §3.3: the staged `share` of the core indicators is the z-recovered share (contract
    between stg_hamburg_sozialmonitoring_indicators and this panel)."""
    core = annex[annex["indicator"].isin(HH_CORE) & annex["z_score"].notna()]
    rec = recover_share(core["z_score"], core["edition_mean"], core["edition_sd"])
    assert np.allclose(rec, core["share"].to_numpy(float), atol=tol), "§3.3: share != 100 (m + z s)"  # noqa: S101 -- R-C3


def r19_revised_s3(
    s3_2022: pd.Series, d3_2022: pd.Series, s3_2019_pub: pd.Series
) -> tuple[pd.Series, list[str]]:
    """A4 rev. 1 E1: the primary Hamburg S3 level for edition 2019 is the publisher's re-based
    same-definition base s3_2019_rev = s3_2022 - D3_2022 for every balanced Gebiet. Where s3_2022
    or D3_2022 is missing, the published 2019 level is kept and the Gebiet is reported."""
    idx = s3_2019_pub.index
    rev = s3_2022.reindex(idx) - d3_2022.reindex(idx)
    missing = rev.isna()
    rev = rev.where(~missing, s3_2019_pub)
    return rev, sorted(str(i) for i in idx[missing.to_numpy()])


def tstar_plr(s1: np.ndarray, s3: np.ndarray, p_u: np.ndarray, p: np.ndarray) -> np.ndarray:
    """PR §3.7 direction A: T*_i = 100 (N_U + N_T) / P = S1 * P^(U) / P + S3 (in %)."""
    s1, s3, p_u, p = (np.asarray(a, dtype=float) for a in (s1, s3, p_u, p))
    with np.errstate(divide="ignore", invalid="ignore"):
        return np.where(p > 0, s1 * p_u / p + s3, np.nan)


def weighted_mean(x: pd.Series, w: pd.Series, groups: pd.Series) -> pd.Series:
    """PR §3.4: x_u = sum_i w_i x_i / sum_i w_i over the children of u (NaN-safe on x)."""
    ok = x.notna() & w.notna() & (w > 0)
    num = (x.where(ok, 0.0) * w.where(ok, 0.0)).groupby(groups).sum()
    den = w.where(ok, 0.0).groupby(groups).sum()
    return (num / den).where(den > 0)


def zscore(s: pd.Series) -> pd.Series:
    """PR §3.4: unweighted within-city, within-edition z-score (population SD, as P354)."""
    return S.zscore(s)


def dhs_growth(a, b) -> np.ndarray:
    return S.dhs_growth(a, b)


def lq_from_stocks(c: np.ndarray, d: np.ndarray, cc: float, dc: float) -> np.ndarray:
    """ADR-0017 LQ OA recomputed from summed stocks and city totals (PR §5): (c/d)/(cc/dc);
    0 where the local parent stock is 0 (P354 §5.1 zero-fill; the min-base flag drops it)."""
    c = np.asarray(c, dtype=float)
    d = np.asarray(d, dtype=float)
    if not (cc > 0 and dc > 0):
        return np.zeros(len(c))
    with np.errstate(divide="ignore", invalid="ignore"):
        return np.where(d > 0, (c / d) / (cc / dc), 0.0)


def weighted_median(values: np.ndarray, weights: np.ndarray) -> float:
    """Population-weighted median (PR §7.1 R2 centrality split): the smallest value at which the
    cumulative weight reaches half the total."""
    v = np.asarray(values, dtype=float)
    w = np.asarray(weights, dtype=float)
    ok = np.isfinite(v) & np.isfinite(w) & (w > 0)
    v, w = v[ok], w[ok]
    order = np.argsort(v, kind="stable")
    cw = np.cumsum(w[order])
    return float(v[order][np.searchsorted(cw, 0.5 * cw[-1])])


def kmeans_blocks(codes: Sequence[str], xy: np.ndarray, g: int, prefix: str) -> dict[str, str]:
    """PR §6.2: contiguous blocks by k-means (scikit-learn, n_init = 10, random_state = 42) on the
    projected centroids, sorted by area code. The input is geometry only (PR §8.3): no outcome
    can reach the block assignment. Labels are renumbered in order of first appearance."""
    from sklearn.cluster import KMeans

    order = np.argsort(np.asarray(codes, dtype=object), kind="stable")
    codes_s = [codes[i] for i in order]
    xy_s = np.asarray(xy, dtype=float)[order]
    km = KMeans(n_clusters=g, n_init=KMEANS_N_INIT, random_state=KMEANS_SEED)
    lab = km.fit_predict(xy_s)
    remap: dict[int, int] = {}
    for v in lab:
        remap.setdefault(int(v), len(remap) + 1)
    return {c: f"{prefix}{remap[int(v)]:02d}" for c, v in zip(codes_s, lab, strict=True)}


def block_draws(
    stat: Callable[[np.ndarray], float | None], groups: np.ndarray, n_boot: int, seed: int
) -> tuple[np.ndarray, int]:
    """Spatial block bootstrap (PR §6.2; Künsch 1989, Lahiri 2003 ch. 12): resample whole blocks
    with replacement, all their rows (windows, pivots) together. Same RNG stream as
    directional_inference.cluster_bootstrap_stat, but undefined draws stay NaN so that two
    cities' draws can be differenced index by index (PR §6.3)."""
    groups = np.asarray(groups, dtype=object)
    uniq = pd.unique(groups)
    g = len(uniq)
    members = [np.flatnonzero(groups == c) for c in uniq]
    rng = np.random.default_rng(seed)
    out = np.full(n_boot, np.nan)
    for b in range(n_boot):
        pick = rng.integers(0, g, size=g)
        idx = np.concatenate([members[i] for i in pick])
        r = stat(idx)
        if r is not None and np.isfinite(r):
            out[b] = float(r)
    return out, g


def ci_from_draws(
    draws: np.ndarray, g: int, n_boot: int, min_blocks: int
) -> tuple[float | None, float | None]:
    """Percentile CI (P354 §5.3): none below the cluster floor or with < half the draws defined."""
    d = draws[np.isfinite(draws)]
    if g < min_blocks or len(d) < n_boot // 2:
        return None, None
    lo, hi = np.percentile(d, [100 * ALPHA / 2, 100 * (1 - ALPHA / 2)])
    return float(lo), float(hi)


def x8_delta(
    d_ber: np.ndarray, d_hh: np.ndarray, est_ber: float | None, est_hh: float | None, n_boot: int
) -> dict:
    """PR §6.3: Delta = theta_BER - theta_HH from independent block bootstraps; two-sided
    bootstrap p against 0 floored at 1/(B+1); percentile 95% CI; MDD = 2.8 x SE(Delta*)."""
    if est_ber is None or est_hh is None:
        return {"estimate": None, "ci_low": None, "ci_high": None, "p_boot": None, "mdd": None}
    dd = np.asarray(d_ber, dtype=float) - np.asarray(d_hh, dtype=float)
    dd = dd[np.isfinite(dd)]
    if len(dd) < n_boot // 2:
        return {
            "estimate": est_ber - est_hh,
            "ci_low": None,
            "ci_high": None,
            "p_boot": None,
            "mdd": None,
        }
    lo, hi = np.percentile(dd, [100 * ALPHA / 2, 100 * (1 - ALPHA / 2)])
    return {
        "estimate": est_ber - est_hh,
        "ci_low": float(lo),
        "ci_high": float(hi),
        "p_boot": bootstrap_p(dd, 0.0, n_boot),
        "mdd": float(MDD_FACTOR * np.std(dd, ddof=1)),
    }


# ---------------------------------------------------------------------------
# Variants (PR §0, §2.2, §3.2, §3.4, §4.3, §6.5, M3, A4.1, A4 rev. 1)
# ---------------------------------------------------------------------------

CONSTRUCT_COLS = {
    "core3h": ("U", "Tstar", "C"),  # PR §3.7: primary, Berlin T re-based to all recipients
    "core3m": ("U", "T3M", "C"),  # PR §3.2: Revision-1 mixed construct (carries gap 5)
    "core2": ("U", "C"),  # PR §3.2 / D8: the T-free construct (HH S5 excludes AsylbLG, DC §3)
}
CONSTRUCT_LABEL = {
    "core3h": "harmonised_core3h",
    "core3m": "harmonised_core3m",
    "core2": "harmonised_core2",
}
H_SET = frozenset(PRIMARY_ORDER)
E2_SET = frozenset({"H2", "H3a", "H3b", "H3c", "N1", "N2", "N3"})  # A4 rev. 1 E2
ALL_SET = frozenset(PRIMARY_ORDER + N_ORDER)


@dataclass(frozen=True)
class Variant:
    key: str = "primary"
    label: str = "primary"
    construct: str = "core3h"
    weights: str = "primary"  # Berlin: primary | W24 | M3_2020 | agespec
    hh_s3_2019: str = "R19"  # A4 rev. 1 E1: R19 primary | R19pub sensitivity
    min_pop: float | None = None
    dk_method: str = "pp"  # pp | zchange (PR §4.3 sensitivity)
    grain: str = "matched"  # matched | fine (PR §6.5 MAUP) | pgr (Berlin PR §6.5 check)
    cities: tuple[str, ...] = CITIES  # cities whose rows change under the variant
    hyps: frozenset = ALL_SET

    @property
    def tags(self) -> frozenset:
        """Sensitivity tags. 'W24' is the single tag the §8.2 exemption keys on (A4 rev. 1)."""
        if self.key == "primary":
            return frozenset()
        out = {self.key}
        if self.weights == "W24":
            out.add("W24")
        return frozenset(out)

    @property
    def sensitivity(self) -> str | None:
        return "W24" if self.weights == "W24" else (None if self.key == "primary" else self.key)


PRIMARY = Variant()
VARIANTS: tuple[Variant, ...] = (
    Variant(
        "core3m",
        "core-3M: Berlin T = S3 (non-unemployed recipients); construct gap 5 applies (§3.2)",
        construct="core3m",
        cities=("BER",),
    ),
    Variant(
        "core2",
        "core-2: U + C, without the transfer indicator (§3.2; the T-free construct, D8)",
        construct="core2",
    ),
    Variant(
        "ge5000",
        "size overlap: units with at least 5,000 residents in both cities (§2.2; A4.1)",
        min_pop=MIN_UNIT_POP,
    ),
    Variant(
        "W24",
        "W24: Berlin 31.12.2024 population weights and age bands for every edition, f per "
        "edition (A4.1, E5, E6)",
        weights="W24",
        cities=("BER",),
    ),
    Variant(
        "M3_2020",
        "M3: Berlin 2022 aggregation weights from 31.12.2020 only (PM decision M3)",
        weights="M3_2020",
        cities=("BER",),
    ),
    Variant(
        "agespec",
        "Berlin age-specific denominators as weights: U by P(15 to RAG), C by P(<15) (§3.4)",
        weights="agespec",
        cities=("BER",),
    ),
    Variant(
        "R19pub",
        "R19-pub: Hamburg S3 2019 as published (A4 rev. 1 E1)",
        hh_s3_2019="R19pub",
        cities=("HH",),
        hyps=E2_SET,
    ),
    Variant(
        "core3m_R19pub",
        "core-3M under R19-pub (A4 rev. 1 E2)",
        construct="core3m",
        hh_s3_2019="R19pub",
        cities=(),
        hyps=E2_SET,
    ),
    Variant(
        "zchange",
        "dK from within-edition z changes for all indicators (§4.3 sensitivity)",
        dk_method="zchange",
        hyps=E2_SET,
    ),
    Variant("fine", "MAUP: Berlin PLR / Hamburg Gebiet grain (§6.5)", grain="fine", hyps=H_SET),
    Variant(
        "fine_W24",
        "MAUP + W24 at PLR grain (A4.1: W24 at both grains; E6)",
        grain="fine",
        weights="W24",
        cities=("BER",),
        hyps=H_SET,
    ),
)
# PR §6.2: inference-only sensitivities on the primary designs (cannot change a verdict).
# Cluster floor per grouping: the P354 20-block floor wherever it can hold (G = 36, iid); the
# directional_inference default of 5 only for G = 16 and Bezirk (12 / 7), which have fewer than
# 20 clusters by construction (geo readings ruling 4).
INFERENCE_FLOOR = {
    "k16": MIN_BLOCKS_SENS,
    "k36": MIN_BLOCKS,
    "iid": MIN_BLOCKS,
    "bezirk": MIN_BLOCKS_SENS,
}
INFERENCE_SENS = (
    ("k16", "spatial_block_k16"),
    ("k36", "spatial_block_k36"),
    ("iid", "iid"),
    ("bezirk", "bezirk"),
)


# ---------------------------------------------------------------------------
# Loading (read-only; every SQL ends in ORDER BY)
# ---------------------------------------------------------------------------


@dataclass
class CityRaw:
    city: str
    cfg: CityCfg
    child_parent: dict[str, str]  # every child in the unit polygons -> unit (POIs, PR §5)
    balanced: list[str]  # PR §2.3 balanced child set
    unit_bezirk: dict[str, str]
    geom_units: pd.DataFrame
    geom_children: pd.DataFrame
    centre_xy: tuple[float, float]
    oa: pd.DataFrame
    c5: pd.DataFrame
    types: pd.DataFrame
    classes: pd.DataFrame  # area_code, edition, status_index (own index, §3.6)
    status: dict = field(default_factory=dict)
    context: dict = field(default_factory=dict)
    pre: dict = field(default_factory=dict)  # phase 1: population and presence (PR §8.4)


def _q(con, key: str, params: Sequence | None = None, **fmt) -> pd.DataFrame:
    sql = SQL[key].format(**fmt) if fmt else SQL[key]
    assert_single_berlin_pop([sql])
    return con.execute(sql, list(params or [])).df()


def berlin_bands(raw: pd.DataFrame) -> pd.DataFrame:
    """A4.2 / §3.7: per PLR and reference year, P = residents_total and the age aggregates
    P(15-<65), P(65-<67), P(<15) from the narrow EWR bands. Sum of bands = residents_total is
    asserted (DC §4.3 check 4), so P^(U) <= P holds by construction."""
    g = raw.groupby(["area_code", "reference_year"], sort=True)
    tot = g["residents_total"].first()
    sums = g["residents"].sum()
    assert np.allclose(sums.to_numpy(), tot.to_numpy(), atol=1e-6), "A4.2: bands != total"  # noqa: S101 -- R-C3

    def part(mask: pd.Series) -> pd.Series:
        return raw[mask].groupby(["area_code", "reference_year"], sort=True)["residents"].sum()

    out = pd.DataFrame({"P": tot})
    out["P15_65"] = part((raw["age_from"] >= 15) & (raw["age_to"] <= 65)).reindex(out.index)
    out["P65_67"] = part((raw["age_from"] == 65) & (raw["age_to"] == 67)).reindex(out.index)
    out["Pu15"] = part(raw["age_to"] <= 15).reindex(out.index)
    out["interpolated"] = g["is_interpolated"].first().astype(bool)
    out = out.fillna({"P15_65": 0.0, "P65_67": 0.0, "Pu15": 0.0})
    out.attrs["source"] = BER_POP_MODEL
    return out


def _hierarchy(con, cfg: CityCfg, child_level: str, parent_level: str) -> dict[str, str]:
    h = _q(con, "hierarchy", [cfg.city, child_level, parent_level])
    return dict(zip(h["area_code"].astype(str), h["parent_area_code"].astype(str), strict=True))


def load_city(con, city: str) -> CityRaw:
    cfg = CITY[city]
    geom_u = _q(con, "geometry", [city, cfg.unit_level, cfg.unit_vintage], epsg=cfg.epsg)
    geom_c = _q(con, "geometry", [city, cfg.child_level, cfg.child_vintage], epsg=cfg.epsg)
    cx = _q(con, "centre", [cfg.centre_lon, cfg.centre_lat], epsg=cfg.epsg)
    oa = _q(con, "oa", [city, cfg.child_vintage])
    c5 = _q(con, "c5", [city, cfg.child_vintage])
    types = _q(con, "types", [city, cfg.child_vintage])
    hier = _hierarchy(con, cfg, cfg.child_level, cfg.unit_level)
    child_codes = sorted(set(geom_c["area_code"]) | set(oa["area_code"]))
    child_parent = {c: hier[c] for c in child_codes if c in hier}
    if city == "BER":
        # lor_2021 PLR code = BEZ(2) PGR(2) BZR(2) PLR(2); the hierarchy mixes vintages, so the
        # parent of every lor_2021 child is checked against its own code.
        bad = [c for c, p in child_parent.items() if p != c[:6]]
        assert not bad, f"BER hierarchy parent != code[:6]: {bad[:5]}"  # noqa: S101 -- R-C3
        unit_bezirk = {u: u[:2] for u in geom_u["area_code"]}
    else:
        unit_bezirk = _hierarchy(con, cfg, cfg.unit_level, "district")
    raw = CityRaw(
        city=city,
        cfg=cfg,
        child_parent=child_parent,
        balanced=[],
        unit_bezirk=unit_bezirk,
        geom_units=geom_u,
        geom_children=geom_c,
        centre_xy=(float(cx["x"].iloc[0]), float(cx["y"].iloc[0])),
        oa=oa,
        c5=c5,
        types=types,
        classes=pd.DataFrame(),
    )
    # PR §8.4: phase 1 loads only geometry, POIs, populations and presence (which children carry
    # a value or are scored). The balanced child set, the units and the fixed feature lists are
    # fixed from these before any outcome value is loaded (load_status, phase 2).
    if city == "BER":
        _presence_berlin(con, raw)
    else:
        _presence_hamburg(con, raw)
    missing = [c for c in raw.balanced if c not in child_parent]
    assert not missing, f"{city}: balanced children without a parent unit: {missing[:5]}"  # noqa: S101 -- R-C3
    return raw


def load_status(con, raw: CityRaw) -> None:
    """Phase 2 (PR §8.4): the outcome values, after the feature lists were written. The balanced
    set recomputed from the values must equal the phase-1 set."""
    pre_bal = list(raw.balanced)
    if raw.city == "BER":
        _load_berlin_status(con, raw)
    else:
        _load_hamburg_status(con, raw)
    assert raw.balanced == pre_bal, f"{raw.city}: balanced set differs between phases"  # noqa: S101 -- R-C3


def _presence_berlin(con, raw: CityRaw) -> None:
    """PR §2.3: PLRs inhabited at 31.12.2018/2020/2022/2024 with S1/S3/S4 in 2021/2023/2025 and
    D1/D3/D4 in 2021 (for the §4.2 backcast). Also records why each other PLR drops (A5-5)."""
    bands = berlin_bands(_q(con, "ber_bands"))
    assert_pop_source(bands)
    pres = _q(con, "ber_presence")
    have = set(zip(pres["area_code"], pres["edition"], pres["indicator"], strict=True))
    band_codes = set(bands.index.get_level_values(0))
    plrs = sorted(c for c in raw.child_parent if c in band_codes)
    ok, dropped = [], []
    for c in plrs:
        miss_ed = [e for e in (2021, 2023, 2025) if not all((c, e, i) in have for i in BER_LEVEL)]
        miss_d = [i for i in BER_CHANGE if (c, 2021, i) not in have]
        empty = [y for y in (2018, 2020, 2022, 2024) if not bands.loc[(c, y), "P"] > 0]
        if not miss_ed and not miss_d and not empty:
            ok.append(c)
            continue
        reasons = []
        if len(miss_ed) == 3:
            reasons.append("no MSS value in any edition (2021/2023/2025)")
        elif miss_ed:
            reasons.append(f"no MSS values in edition {'/'.join(map(str, miss_ed))}")
        elif miss_d:
            reasons.append("no 2021 Dynamik (no §4.2 backcast)")
        if empty:
            reasons.append(f"uninhabited at 31.12.{'/'.join(map(str, empty))}")
        dropped.append({"plr": c, "reason": ", ".join(reasons)})
    raw.balanced = ok
    raw.pre = {"bands": bands, "dropped_plr": dropped, "n_plr_lor2021": len(plrs)}


def _presence_hamburg(con, raw: CityRaw) -> None:
    """PR §2.3 / A4.3 / DC §1: Gebiete scored in all four editions; an absent row = not scored."""
    pres = _q(con, "hh_presence")
    raw.balanced = balanced_children(pres[["area_code", "edition"]])
    raw.pre = {"hh_pop": pres.set_index(["area_code", "edition"])["population"].astype(float)}


def _load_berlin_status(con, raw: CityRaw) -> None:
    mss = _q(con, "ber_mss")
    attrs = {
        f"{int(r.edition)}:{r.indicator}": r.raw_attr
        for r in mss[["edition", "indicator", "raw_attr"]].drop_duplicates().itertuples()
    }
    wide = mss.pivot_table(
        index=["area_code", "edition"], columns="indicator", values="indicator_value"
    )
    wide = wide.reindex(columns=list(BER_LEVEL + BER_CHANGE)).rename(columns=BER_CODE)
    wide = wide.sort_index()
    # PR §4.2 / P354 §3.1: S_2019 on lor_2021 = anteil_2021 - dynamik_2021, per indicator (on the
    # 2021 geometry and definition, D9b).
    w21 = wide.xs(2021, level="edition")
    back = pd.DataFrame(
        {
            "S1": w21["S1"] - w21["D1"],
            "S3": w21["S3"] - w21["D3"],
            "S4": w21["S4"] - w21["D4"],
        }
    )
    back["edition"] = 2019
    lv = pd.concat(
        [back.reset_index(), wide[["S1", "S3", "S4"]].reset_index()], ignore_index=True
    ).set_index(["area_code", "edition"])
    lv = lv.sort_index()
    bands = raw.pre["bands"]
    assert_pop_source(bands)
    band_codes = set(bands.index.get_level_values(0))
    plrs = sorted(c for c in raw.child_parent if c in band_codes)
    ok = []
    for c in plrs:
        lv_ok = all(
            (c, e) in lv.index and np.isfinite(lv.loc[(c, e), ["S1", "S3", "S4"]].to_numpy()).all()
            for e in EDITIONS
        )
        p_ok = all(
            (c, y) in bands.index and bands.loc[(c, y), "P"] > 0 for y in (2018, 2020, 2022, 2024)
        )
        if lv_ok and p_ok:
            ok.append(c)
    assert_balanced({e: {c for c in ok if (c, e) in lv.index} for e in EDITIONS})
    raw.balanced = ok
    raw.status = {"levels": lv, "changes": wide[["D1", "D3", "D4"]], "bands": bands, "attrs": attrs}
    raw.classes = _q(con, "ber_classes")
    raw.context["mss_2019_pre"] = _q(con, "ber_mss_2019_pre")
    raw.context["xwalk"] = _q(con, "ber_xwalk_dominant")
    raw.context["milieuschutz"] = _q(con, "ber_milieuschutz")
    raw.context["n_plr_mss_all3"] = int(
        sum(all((c, e) in lv.index for e in (2021, 2023, 2025)) for c in plrs)
    )


def _load_hamburg_status(con, raw: CityRaw) -> None:
    an = _q(con, "hh_annex")
    assert_share_recovery(an)
    present = an[an["indicator"] == "S3"][["area_code", "edition"]].drop_duplicates()
    balanced = balanced_children(present)
    wide = an.pivot_table(
        index=["area_code", "edition"], columns="indicator", values="share", dropna=False
    )
    s3rows = an[an["indicator"] == "S3"].set_index(["area_code", "edition"])
    meta = s3rows[["population", "status_summe", "dynamik_summe"]].astype(float)
    d3 = an[an["indicator"] == "D3"].set_index(["area_code", "edition"])["change_pp"]
    wide = wide.join(meta).join(d3.rename("D3chg")).sort_index()
    pp = raw.pre["hh_pop"]
    assert np.allclose(  # noqa: S101 -- R-C3 phase-1 population = phase-2 population
        wide["population"].reindex(pp.index).to_numpy(float), pp.to_numpy(float)
    ), "HH population differs between phases"
    for e in EDITIONS:
        sub = wide.xs(e, level="edition").reindex(balanced)
        assert sub[list(HH_CORE)].notna().all().all(), f"HH {e}: missing S3/S4/S5 share"  # noqa: S101 -- R-C3
        assert (sub["population"] > 0).all(), f"HH {e}: non-positive population"  # noqa: S101 -- R-C3
    assert_balanced(
        {
            e: set(present.loc[present["edition"] == e, "area_code"]) & set(balanced)
            for e in EDITIONS
        }
    )
    pub = wide.xs(2019, level="edition")["S3"].reindex(balanced)
    s22 = wide.xs(2022, level="edition")["S3"]
    d22 = wide.xs(2022, level="edition")["D3chg"]
    rev, missing = r19_revised_s3(s22, d22, pub)
    # A4 rev. 1 E3: every Gebiet with |D3_E - (s_E - s_(E-3))| > 0.5 pp in 2022 or 2023, by ID,
    # with its W1 and W2 S3 change ("S3 base revised by the publisher").
    revised = []
    for e in (2022, 2023):
        a = wide.xs(e, level="edition")
        b = wide.xs(e - 3, level="edition")
        j = pd.DataFrame({"d": a["D3chg"], "se": a["S3"], "ss": b["S3"]}).dropna()
        delta = j["d"] - (j["se"] - j["ss"])
        for g_id, dv in delta[delta.abs() > 0.5].items():
            revised.append((str(g_id), e, float(dv)))
    s21 = wide.xs(2021, level="edition")["S3"]
    s23 = wide.xs(2023, level="edition")["S3"]
    rev_tab = []
    for g_id in sorted({r[0] for r in revised}, key=lambda s: (len(s), s)):
        d = {e: dv for gg, e, dv in revised if gg == g_id}
        p19 = wide["S3"].get((g_id, 2019), np.nan)
        r19 = s22.get(g_id, np.nan) - d22.get(g_id, np.nan)
        rev_tab.append(
            {
                "gebiet": g_id,
                "delta_2022": d.get(2022),
                "delta_2023": d.get(2023),
                "s3_2019_pub": p19,
                "s3_2019_rev": r19,
                "w1_pub": s21.get(g_id, np.nan) - p19,
                "w1_rev": s21.get(g_id, np.nan) - r19,
                "w2": s23.get(g_id, np.nan) - s21.get(g_id, np.nan),
                "balanced": g_id in set(balanced),
            }
        )
    ever = sorted(set(present.loc[present["edition"].isin(EDITIONS), "area_code"]))
    scored25 = set(present.loc[present["edition"] == 2025, "area_code"])
    raw.balanced = balanced
    raw.status = {
        "wide": wide,
        "s3_2019_rev": rev,
        "s3_2019_pub": pub,
        "r19_missing": missing,
        "revised": rev_tab,
        "dropped_2025": sorted(scored25 - set(balanced)),
        "dropped_ever": sorted(set(ever) - set(balanced)),
        "annex_long": an,
    }
    raw.classes = _q(con, "hh_classes")
    raw.context["zone_cover"] = _q(con, "hh_zone_cover")


# ---------------------------------------------------------------------------
# Status construction (PR §3, §3.7, A4, A4 rev. 1)
# ---------------------------------------------------------------------------


def child_status(raw: CityRaw, v: Variant) -> tuple[pd.DataFrame, dict]:
    """Per balanced child and edition: U, T* (core-3H), T3M (core-3M), C and the weights.

    Berlin (PR §3.7, A4.2, A4.1/E6): T*_i = S1_i P^(U)_i / P_i + S3_i with P^(U) = P(15-<65) +
    f P(65-<67), f the edition's Regelaltersgrenze value; the 2019 levels are the §4.2 backcast.
    Hamburg (PR §3.1, §3.3, A4 rev. 1 E1): U = S4, T = S3 (2019: R19 or R19-pub), C = S5, weights
    = the edition's Sozialmonitoring population."""
    info: dict = {"band_years": set(), "provenance": [], "weight_years": {}}
    frames = []
    if raw.city == "BER":
        lv, bands = raw.status["levels"], raw.status["bands"]
        assert_pop_source(bands)
        for e in EDITIONS:
            ref = e - 1
            ry = 2024 if v.weights == "W24" else ref
            if v.weights == "W24":
                wy = 2024
            elif v.weights == "M3_2020" and e == 2023:
                wy = 2020
            else:
                wy = ref
            # PR §8.2 (A4 rev. 1 scoped exemption): no weight or T* base post-dates the outcome.
            assert_weight_dates(wy, ref, v.sensitivity)
            assert_weight_dates(ry, ref, v.sensitivity)
            assert_prereg_inputs(
                "BER",
                [
                    (y, bool(bands.xs(y, level="reference_year")["interpolated"].any()))
                    for y in (ry, wy)
                ],
            )
            f = RAG_F[ref]  # E6: f stays the edition's own value, also under W24
            br = bands.xs(ry, level="reference_year").reindex(raw.balanced)
            bw = bands.xs(wy, level="reference_year").reindex(raw.balanced)
            sub = lv.xs(e, level="edition").reindex(raw.balanced)
            pu_r = br["P15_65"] + f * br["P65_67"]
            df = pd.DataFrame(index=pd.Index(raw.balanced, name="area_code"))
            df["U"] = sub["S1"]
            df["Tstar"] = tstar_plr(sub["S1"], sub["S3"], pu_r, br["P"])
            df["T3M"] = sub["S3"]
            df["C"] = sub["S4"]
            df["wT"] = bw["P"]
            if v.weights == "agespec":
                df["wU"] = bw["P15_65"] + f * bw["P65_67"]
                df["wC"] = bw["Pu15"]
            else:
                df["wU"] = bw["P"]
                df["wC"] = bw["P"]
            df["ratio_PU_P"] = pu_r / br["P"]
            df["edition"] = e
            frames.append(df.reset_index())
            info["band_years"] |= {ry, wy}
            info["weight_years"][e] = wy
            src = 2021 if e == 2019 else e
            info["provenance"] += [("BER", s, e, src) for s in ("S1", "S3", "S4")]
        assert_k_inputs("BER", ("S1", "S3", "S4"))
    else:
        wide = raw.status["wide"]
        for e in EDITIONS:
            sub = wide.xs(e, level="edition").reindex(raw.balanced)
            assert_weight_dates(e - 1, e - 1, v.sensitivity)  # same-edition population
            t = sub["S3"]
            src = e
            if e == 2019 and v.hh_s3_2019 == "R19":
                t = raw.status["s3_2019_rev"].reindex(raw.balanced)
                src = 2022
            df = pd.DataFrame(index=pd.Index(raw.balanced, name="area_code"))
            df["U"] = sub["S4"]
            df["Tstar"] = t
            df["T3M"] = t  # Hamburg T is S3 under core-3H and core-3M alike (PR §3.2)
            df["C"] = sub["S5"]
            df["wU"] = sub["population"]
            df["wT"] = sub["population"]
            df["wC"] = sub["population"]
            df["ratio_PU_P"] = np.nan
            df["edition"] = e
            frames.append(df.reset_index())
            info["weight_years"][e] = e - 1
            info["provenance"] += [("HH", "S3", e, src), ("HH", "S4", e, e), ("HH", "S5", e, e)]
        assert_k_inputs("HH", HH_CORE)
    assert_level_provenance(info["provenance"])
    out = pd.concat(frames, ignore_index=True).set_index(["area_code", "edition"]).sort_index()
    return out, info


def unit_levels(child: pd.DataFrame, parent: dict[str, str]) -> pd.DataFrame:
    """PR §3.4: population-weighted aggregation over the balanced children of each unit. The
    count-sum form of T*_u (PR §3.7) equals the P-weighted mean of T*_i, so one formula serves."""
    c = child.reset_index()
    c["unit"] = c["area_code"].map(parent)
    assert c["unit"].notna().all(), "child without a unit"  # noqa: S101 -- R-C3
    out = []
    for e, g in c.groupby("edition", sort=True):
        key = g["unit"]
        d = pd.DataFrame(
            {
                "U": weighted_mean(g["U"], g["wU"], key),
                "Tstar": weighted_mean(g["Tstar"], g["wT"], key),
                "T3M": weighted_mean(g["T3M"], g["wT"], key),
                "C": weighted_mean(g["C"], g["wC"], key),
            }
        )
        d["edition"] = e
        out.append(d)
    lv = pd.concat(out).rename_axis("unit").reset_index().set_index(["unit", "edition"])
    return lv.sort_index()


def k_scores(levels: pd.DataFrame, construct: str) -> pd.DataFrame:
    """PR §3.4: K_u,E = mean over the construct's indicators of the unweighted within-edition
    z-score over the matched units. Higher K = more disadvantage."""
    cols = CONSTRUCT_COLS[construct]
    parts = []
    for _e, g in levels.groupby(level="edition", sort=True):
        z = pd.DataFrame({f"z_{c}": zscore(g[c]) for c in cols})
        z["K"] = z.mean(axis=1, skipna=False)
        parts.append(z)
    return pd.concat(parts).sort_index()


def dk_scores(levels: pd.DataFrame, construct: str, method: str = "pp") -> pd.DataFrame:
    """PR §3.5: d_j,u,W = x_j,u,end - x_j,u,start (pp of levels); dK_u,W = mean_j z_j(d_j) over
    units within city and window. PR §4.3 sensitivity: d_j = z_end - z_start for all j."""
    cols = CONSTRUCT_COLS[construct]
    parts = []
    for s, e in WINDOWS:
        a = levels.xs(s, level="edition")
        b = levels.xs(e, level="edition")
        units = a.index.intersection(b.index)
        a, b = a.reindex(units), b.reindex(units)
        if method == "zchange":
            d = pd.DataFrame({c: zscore(b[c]) - zscore(a[c]) for c in cols})
        else:
            d = pd.DataFrame({c: b[c] - a[c] for c in cols})
        z = pd.DataFrame({f"d_{c}": d[c] for c in cols})
        z["dK"] = pd.DataFrame({c: zscore(d[c]) for c in cols}).mean(axis=1, skipna=False)
        z["w_start"], z["w_end"] = s, e
        parts.append(z.rename_axis("unit").reset_index())
    return pd.concat(parts, ignore_index=True).set_index(["unit", "w_end"]).sort_index()


# ---------------------------------------------------------------------------
# POIs at the matched grain (PR §5)
# ---------------------------------------------------------------------------

_OA_KEYS = ["snapshot_year", "oa_level", "poi_domain_h", "poi_category_h"]


def aggregate_oa(long: pd.DataFrame, parent: dict[str, str]) -> pd.DataFrame:
    """PR §5: level and parent stocks summed from all children in the unit polygon (not only
    balanced ones); OA recomputed as the ADR-0017 LQ from the summed stocks and the city totals;
    min-base flag recomputed on the summed parent stock (< 10); zero-fill as P354 §5.1."""
    d = long.copy()
    d["unit"] = d["area_code"].map(parent)
    d = d[d["unit"].notna()]
    g = d.groupby(["unit", *_OA_KEYS], sort=True).agg(
        c=("level_stock_local", "sum"),
        dd=("parent_stock_local", "sum"),
        cc=("level_stock_city", "first"),
        dc=("parent_stock_city", "first"),
    )
    g = g.reset_index()
    oa = np.zeros(len(g))
    for _k, idx in g.groupby(_OA_KEYS, sort=True).groups.items():
        sub = g.loc[idx]
        oa[g.index.get_indexer(idx)] = lq_from_stocks(
            sub["c"], sub["dd"], float(sub["cc"].iloc[0]), float(sub["dc"].iloc[0])
        )
    g["oa_value"] = oa
    g["oa_min_base_flag"] = g["dd"] < 10
    return g.rename(
        columns={
            "unit": "area_code",
            "c": "level_stock_local",
            "dd": "parent_stock_local",
            "cc": "level_stock_city",
            "dc": "parent_stock_city",
        }
    )


def assert_lq_reproduces_panel(long: pd.DataFrame) -> None:
    """Consistency guard: the LQ recomputation, applied to the identity map, reproduces the
    panel's own oa_value wherever the local parent base is positive."""
    ident = {c: c for c in long["area_code"].unique()}
    keys = ["area_code", *_OA_KEYS]
    agg = aggregate_oa(long, ident).set_index(keys)
    ref = long.set_index(keys)["oa_value"]
    j = pd.concat([agg["oa_value"].rename("a"), ref.rename("b"), agg["parent_stock_local"]], axis=1)
    j = j[(j["parent_stock_local"] > 0) & j["a"].notna() & j["b"].notna()]
    assert np.allclose(j["a"], j["b"], rtol=1e-9, atol=1e-9), "LQ recomputation != panel OA"  # noqa: S101 -- R-C3


def wide_oa(long: pd.DataFrame, year: int) -> pd.DataFrame:
    """One row per unit for one snapshot, in the column layout of thesis_hypothesis_suite.oa_wide
    (oa_/flag_/stock_/city_ per domain and category, stock_all, oa_year)."""
    sub = long[long["snapshot_year"] == year]
    dom = sub[sub["oa_level"] == "domain"]
    cat = sub[sub["oa_level"] == "category"].copy()
    cat["key"] = cat["poi_domain_h"] + "|" + cat["poi_category_h"]
    blocks = [sub.groupby("area_code")["snapshot_year"].first().astype(float).rename("oa_year")]
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
    blocks.append(dom.groupby("area_code")["parent_stock_local"].first().rename("stock_all"))
    out = pd.concat(blocks, axis=1).sort_index()
    out.index.name = "area_code"
    return out


def aggregate_c5(c5: pd.DataFrame, oa_long: pd.DataFrame, parent: dict[str, str]) -> pd.DataFrame:
    """P354 §5.1 at the matched grain: commercial C5 share c = POIs of the four commercial
    domains / city total (and the total share), plus the café / fast-food / Gastronomy stocks for
    N2 (PR §7.2) and the café C5 share for the P354 R4 cross-lag."""
    d = c5.copy()
    d["unit"] = d["area_code"].map(parent)
    d = d[d["unit"].notna()]
    g = d.groupby(["unit", "snapshot_year"], sort=True).agg(
        total=("total_poi_count", "sum"),
        commercial=("commercial_poi_count", "sum"),
        city_total=("city_total_poi_count", "first"),
        city_commercial=("city_commercial_poi_count", "first"),
    )
    g = g.astype(float)
    g["commercial_share"] = g["commercial"] / g["city_commercial"]
    g["total_share"] = g["total"] / g["city_total"]
    o = oa_long.copy()
    o["unit"] = o["area_code"].map(parent)
    o = o[o["unit"].notna()]

    def stock(level: str, dom: str, cat: str = "") -> tuple[pd.Series, pd.Series]:
        s = o[(o["oa_level"] == level) & (o["poi_domain_h"] == dom) & (o["poi_category_h"] == cat)]
        gg = s.groupby(["unit", "snapshot_year"], sort=True)
        return gg["level_stock_local"].sum(), gg["level_stock_city"].first()

    cafe, cafe_city = stock("category", GASTRO, "Cafe")
    ff, _ = stock("category", GASTRO, "Fast Food")
    gastro, _ = stock("domain", GASTRO)
    g["cafe"] = cafe.reindex(g.index).fillna(0.0)
    g["ff"] = ff.reindex(g.index).fillna(0.0)
    g["gastro"] = gastro.reindex(g.index).fillna(0.0)
    g["cafe_c5"] = g["cafe"] / cafe_city.reindex(g.index)
    return g.rename_axis(["area_code", "snapshot_year"])


# ---------------------------------------------------------------------------
# Grains: matched units, fine-grain children (MAUP), Berlin PGR check
# ---------------------------------------------------------------------------


@dataclass
class Grain:
    city: str
    kind: str  # matched | fine | pgr
    name: str  # CSV grain label (PR §9.1)
    units: list[str]
    parent: dict[str, str]  # balanced child -> unit (status aggregation)
    groups: pd.DataFrame  # index unit: k24, k16, k36, iid, bezirk
    oa_long: pd.DataFrame
    oa_wide: dict[int, pd.DataFrame]
    c5: pd.DataFrame
    types: pd.DataFrame
    pop24: pd.Series  # unit population 31.12.2024 over balanced children (threshold, A4.1)
    pop_all24: pd.Series  # unit population 31.12.2024 over all children (per-1k rows)
    centroids: pd.DataFrame | None = None
    lag: dict[str, list[str]] | None = None  # N3 queen neighbours (row-standardised)
    inner: pd.Series | None = None  # N1 centrality split (R2)
    popgrowth: pd.Series | None = None  # R5 / E7 (2018 -> 2024)
    popgrowth_windows: dict | None = None
    poigrowth: pd.Series | None = None  # PR §5 C5 diagnostic (2019 -> 2025)
    geoms: dict | None = None
    w: object = None  # libpysal weights on the units (Moran, N3)


def _band_pop(raw: CityRaw, year: int) -> pd.Series:
    bands = raw.pre["bands"]
    assert_pop_source(bands)
    return bands.xs(year, level="reference_year")["P"]


def _hh_pop(raw: CityRaw, edition: int) -> pd.Series:
    return raw.pre["hh_pop"].xs(edition, level="edition")


def city_blocks(raw: CityRaw, units: list[str]) -> pd.DataFrame:
    """PR §6.2: block assignment computed once per city from the units' projected centroids
    (EPSG:25833 Berlin, EPSG:25832 Hamburg), geometry only; Bezirk and iid for the sensitivities."""
    gu = raw.geom_units.set_index("area_code").reindex(units)
    assert gu[["cx", "cy"]].notna().all().all(), f"{raw.city}: unit without geometry"  # noqa: S101 -- R-C3
    xy = gu[["cx", "cy"]].to_numpy(float)
    out = pd.DataFrame(index=pd.Index(units, name="unit"))
    out["k24"] = pd.Series(kmeans_blocks(units, xy, G_PRIMARY, f"{raw.city}-B"))
    for g in G_SENS:
        out[f"k{g}"] = pd.Series(kmeans_blocks(units, xy, g, f"{raw.city}-G{g}-"))
    out["iid"] = out.index.to_series()
    out["bezirk"] = out.index.map(raw.unit_bezirk)
    assert out.notna().all().all(), f"{raw.city}: unit without a Bezirk"  # noqa: S101 -- R-C3
    return out


def queen_lag(units: list[str], wkb: dict[str, bytes], cxy: pd.DataFrame):
    """PR §7.3 / ADR-0010 §5: row-standardised queen contiguity from WKB (libpysal, no new
    dependency), k = 4 nearest neighbours for islands and disconnected units."""
    import libpysal.weights as lw
    from shapely import from_wkb

    geoms = [from_wkb(bytes(wkb[u])) for u in units]
    w = lw.Queen.from_iterable(geoms, ids=units)
    islands = [k for k, v in w.neighbors.items() if len(v) == 0]
    if islands:
        knn = lw.KNN.from_array(
            cxy.reindex(units)[["cx", "cy"]].to_numpy(float), k=N3_KNN, ids=units
        )
        neigh = {k: list(v) for k, v in w.neighbors.items()}
        for i in islands:
            neigh[i] = list(knn.neighbors[i])
        w = lw.W(neigh, id_order=units, silence_warnings=True)
    w.transform = "r"
    return (
        w,
        {u: sorted(w.neighbors[u]) for u in units},
        islands,
        dict(zip(units, geoms, strict=True)),
    )


def spatial_lag(values: pd.Series, lag: dict[str, list[str]]) -> pd.Series:
    """Wg(c)_P: row-standardised mean of the neighbours' values (renormalised over finite ones)."""
    out = {}
    for u, nb in lag.items():
        v = values.reindex(nb).to_numpy(float)
        v = v[np.isfinite(v)]
        out[u] = float(v.mean()) if len(v) else np.nan
    return pd.Series(out).reindex(values.index)


def build_grain(raw: CityRaw, kind: str, blocks: pd.DataFrame | None = None) -> Grain:
    city, cfg = raw.city, raw.cfg
    if kind == "matched":
        parent = {c: raw.child_parent[c] for c in raw.balanced}
        poi_parent = dict(raw.child_parent)
        name = cfg.grain
    elif kind == "fine":
        parent = {c: c for c in raw.balanced}
        poi_parent = {c: c for c in raw.balanced}
        name = cfg.fine_grain
    else:  # pgr: Berlin Prognoseraum = PLR code[:4] (PR §6.5 BZR vs PGR check)
        parent = {c: c[:4] for c in raw.balanced}
        poi_parent = {c: c[:4] for c in raw.child_parent}
        name = "ber_pgr_2021"
    units = sorted(set(parent.values()))
    if kind == "matched":
        groups = city_blocks(raw, units)
    elif kind == "fine":
        assert blocks is not None  # noqa: S101 -- children inherit the matched blocks (§6.5)
        groups = blocks.reindex([raw.child_parent[u] for u in units])
        groups.index = pd.Index(units, name="unit")
        groups["iid"] = groups.index.to_series()
    else:
        groups = pd.DataFrame(
            {g: "all" for g in ("k24", "k16", "k36", "iid", "bezirk")},
            index=pd.Index(units, name="unit"),
        )
    if kind == "fine":
        oa_long = raw.oa[raw.oa["area_code"].isin(units)].copy()
    else:
        oa_long = aggregate_oa(raw.oa, poi_parent)
    oa_wide = {y: wide_oa(oa_long, y) for y in SNAPSHOTS}
    c5 = aggregate_c5(raw.c5, raw.oa, poi_parent)
    t = raw.types.copy()
    t["unit"] = t["area_code"].map(poi_parent)
    types = (
        t[t["unit"].notna()]
        .groupby(
            ["unit", "snapshot_year", "poi_domain_h", "poi_category_h", "poi_type_h"], sort=True
        )["poi_count"]
        .sum()
    )
    types = types.reset_index().rename(columns={"unit": "area_code"})
    bal = pd.Series(parent)
    if city == "BER":
        p24 = _band_pop(raw, 2024)
        pop24 = p24.reindex(bal.index).groupby(bal.to_numpy()).sum()
        allc = pd.Series(poi_parent)
        pop_all24 = p24.reindex(allc.index).fillna(0.0).groupby(allc.to_numpy()).sum()
    else:
        p25 = _hh_pop(raw, 2025)
        pop24 = p25.reindex(bal.index).groupby(bal.to_numpy()).sum()
        allc = pd.Series(poi_parent)
        pop_all24 = p25.reindex(allc.index).fillna(0.0).groupby(allc.to_numpy()).sum()
    gr = Grain(
        city=city,
        kind=kind,
        name=name,
        units=units,
        parent=parent,
        groups=groups,
        oa_long=oa_long,
        oa_wide=oa_wide,
        c5=c5,
        types=types,
        pop24=pop24.reindex(units),
        pop_all24=pop_all24.reindex(units),
    )
    tc = c5["total"].unstack("snapshot_year")
    gr.poigrowth = pd.Series(dhs_growth(tc[2019], tc[2025]), index=tc.index).reindex(units)
    if kind == "matched":
        gu = raw.geom_units.set_index("area_code").reindex(units)
        gr.centroids = gu[["cx", "cy"]]
        wkb = dict(zip(raw.geom_units["area_code"], raw.geom_units["geom_wkb"], strict=True))
        gr.w, gr.lag, islands, gr.geoms = queen_lag(units, wkb, gu)
        raw.context["n3_islands"] = islands
        # PR §7.1 R2: inner/outer halves at the population-weighted median distance of unit
        # centroids to the city centre (31.12.2024 populations, A4.1).
        cx, cy = raw.centre_xy
        dist = np.hypot(gu["cx"] - cx, gu["cy"] - cy)
        thr = weighted_median(dist.to_numpy(), gr.pop24.to_numpy())
        gr.inner = pd.Series(dist.to_numpy() <= thr, index=units)
        raw.context["centrality_threshold_m"] = thr
        # PR §5 R5 / A4 rev. 1 E7: population growth per matched unit. Berlin on BZR totals over
        # ALL child PLRs (correct to 0.14 %, DC §4.4); Hamburg over the balanced Gebiete.
        if city == "BER":
            allc = pd.Series({c: p for c, p in raw.child_parent.items()})
            tot = {
                y: _band_pop(raw, y).reindex(allc.index).fillna(0.0).groupby(allc.to_numpy()).sum()
                for y in (2018, 2020, 2022, 2024)
            }
            ends = {
                (2019, 2021): (2018, 2020),
                (2021, 2023): (2020, 2022),
                (2023, 2025): (2022, 2024),
            }
            gr.popgrowth = (tot[2024] / tot[2018] - 1.0).reindex(units)
            gr.popgrowth_windows = {
                f"{s}-{e}": (tot[b] / tot[a] - 1.0).reindex(units)
                for (s, e), (a, b) in ends.items()
            }
        else:
            tot = {
                e: _hh_pop(raw, e).reindex(bal.index).groupby(bal.to_numpy()).sum()
                for e in EDITIONS
            }
            gr.popgrowth = (tot[2025] / tot[2019] - 1.0).reindex(units)
            gr.popgrowth_windows = {
                f"{s}-{e}": (tot[e] / tot[s] - 1.0).reindex(units) for s, e in WINDOWS
            }
    return gr


@dataclass
class Status:
    levels: pd.DataFrame  # (unit, edition): U, Tstar, T3M, C
    K: pd.DataFrame  # (unit, edition): K, z_*
    dK: pd.DataFrame  # (unit, w_end): dK, d_*, w_start
    info: dict
    variant: Variant
    units: list[str]


def make_status(raw: CityRaw, gr: Grain, v: Variant) -> Status:
    child, info = child_status(raw, v)
    if gr.kind == "fine":
        lv = child[["U", "Tstar", "T3M", "C"]].rename_axis(["unit", "edition"]).sort_index()
    else:
        lv = unit_levels(child, gr.parent)
    units = list(gr.units)
    if v.min_pop is not None:
        # PR §2.2: the whole matched panel re-run on units with >= 5,000 residents (A4.1: Berlin
        # native 31.12.2024; Hamburg edition 2025 population, both over the balanced children).
        units = [u for u in units if gr.pop24.get(u, 0.0) >= v.min_pop]
        lv = lv[lv.index.get_level_values("unit").isin(units)]
    return Status(
        levels=lv,
        K=k_scores(lv, v.construct),
        dK=dk_scores(lv, v.construct, v.dk_method),
        info=info,
        variant=v,
        units=units,
    )


# ---------------------------------------------------------------------------
# Designs and the block bootstrap
# ---------------------------------------------------------------------------

_DESIGN_IDS = iter(range(10**9))


@dataclass
class Design:
    kind: str  # rho | auc | dauc | diff
    n: int
    groups: pd.DataFrame
    stat: Callable[[np.ndarray], float | None] | None
    estimate: float | None
    p_analytic: float | None = None
    extra: dict = field(default_factory=dict)
    uid: int = field(default_factory=lambda: next(_DESIGN_IDS))


def _groups_for(gr: Grain, units: Sequence[str]) -> pd.DataFrame:
    return gr.groups.reindex(list(units)).reset_index(drop=True)


def rho_design(x, y, ctrl: Sequence, groups: pd.DataFrame) -> Design:
    x = np.asarray(x, dtype=float)
    y = np.asarray(y, dtype=float)
    cs = [np.asarray(c, dtype=float) for c in ctrl]
    mask = np.isfinite(x) & np.isfinite(y)
    for c in cs:
        mask &= np.isfinite(c)
    mask &= groups["k24"].notna().to_numpy()
    x, y, cs = x[mask], y[mask], [c[mask] for c in cs]
    g = groups[mask].reset_index(drop=True)
    est = partial_spearman(x, y, cs)

    def stat(idx: np.ndarray) -> float | None:
        return partial_spearman(x[idx], y[idx], [c[idx] for c in cs])["rho"]

    return Design("rho", int(mask.sum()), g, stat, est["rho"], est["p"], {"x": x, "y": y, "c": cs})


def diff_design(x, y, ctrl: Sequence, sel_a, sel_b, groups: pd.DataFrame) -> Design:
    """rho(rows sel_a) - rho(rows sel_b) under one joint block bootstrap (P354 §3.4 pivot
    difference; PR §7.1 N1 stratum difference)."""
    x = np.asarray(x, dtype=float)
    y = np.asarray(y, dtype=float)
    cs = [np.asarray(c, dtype=float) for c in ctrl]
    mask = np.isfinite(x) & np.isfinite(y)
    for c in cs:
        mask &= np.isfinite(c)
    a = np.asarray(sel_a, dtype=bool)[mask]
    b = np.asarray(sel_b, dtype=bool)[mask]
    x, y, cs = x[mask], y[mask], [c[mask] for c in cs]
    g = groups[mask].reset_index(drop=True)

    def rho(idx: np.ndarray) -> float | None:
        return partial_spearman(x[idx], y[idx], [c[idx] for c in cs])["rho"]

    def stat(idx: np.ndarray) -> float | None:
        ra, rb = rho(idx[a[idx]]), rho(idx[b[idx]])
        return None if ra is None or rb is None else ra - rb

    return Design("diff", int(mask.sum()), g, stat, stat(np.arange(len(x))))


def auc_design(xdf: pd.DataFrame, y, groups: pd.DataFrame) -> Design | None:
    """P354 §5.1 / A1.1 fixed L2 logit, out-of-fold once under GroupKFold by spatial block
    (PR §6.1, §6.2); the (prediction, label, block) triples are then resampled."""
    if xdf.shape[1] == 0:
        return None
    y = np.asarray(y).astype(int)
    res = grouped_oof_auc(xdf.to_numpy(float), y, groups["k24"].to_numpy(object), N_SPLITS)
    if res["auc"] is None:
        return Design("auc", len(y), groups, None, None, extra={"n_pos": int(y.sum())})
    oof = res["oof"]

    def stat(idx: np.ndarray) -> float | None:
        return auc_score(y[idx], oof[idx])

    p_mw = stats.mannwhitneyu(oof[y == 1], oof[y == 0], alternative="two-sided").pvalue
    names = list(xdf.columns)
    mean_coef = res["coefs"].mean(axis=0)
    order = sorted(range(len(names)), key=lambda i: (-abs(mean_coef[i]), names[i]))[:10]
    return Design(
        "auc",
        len(y),
        groups,
        stat,
        res["auc"],
        float(p_mw),
        {
            "n_pos": int(y.sum()),
            "coefs": [[names[i], round(float(mean_coef[i]), 4)] for i in order],
            "fold_auc": [auc_score(y[te], oof[te]) for _tr, te in res["folds"]],
        },
    )


def dauc_design(xbase: np.ndarray, xfull: np.ndarray, y, groups: pd.DataFrame) -> Design | None:
    """P354 §5.2 H2 incremental: AUC(status level + OA) - AUC(status level), same folds."""
    y = np.asarray(y).astype(int)
    grp = groups["k24"].to_numpy(object)
    rb = grouped_oof_auc(xbase, y, grp, N_SPLITS)
    rf = grouped_oof_auc(xfull, y, grp, N_SPLITS)
    if rb["auc"] is None or rf["auc"] is None:
        return Design("dauc", len(y), groups, None, None)
    ob, of = rb["oof"], rf["oof"]

    def stat(idx: np.ndarray) -> float | None:
        a, b = auc_score(y[idx], of[idx]), auc_score(y[idx], ob[idx])
        return None if a is None or b is None else a - b

    return Design(
        "dauc",
        len(y),
        groups,
        stat,
        rf["auc"] - rb["auc"],
        None,
        {"auc_base": rb["auc"], "auc_full": rf["auc"]},
    )


class Bootstrapper:
    """Caches block-bootstrap draws per (design, grouping, seed), so the BER seed-42 draws of a
    city row are exactly the draws X8 differences (PR §6.3)."""

    def __init__(self, n_boot: int):
        self.n_boot = n_boot
        self.cache: dict = {}

    def draws(self, d: Design, gkey: str, seed: int) -> tuple[np.ndarray, int]:
        k = (d.uid, gkey, seed)
        if k not in self.cache:
            self.cache[k] = block_draws(d.stat, d.groups[gkey].to_numpy(object), self.n_boot, seed)
        return self.cache[k]

    def infer(
        self, d: Design | None, gkey: str = "k24", seed: int = SEED, min_blocks: int = MIN_BLOCKS
    ) -> dict:
        if d is None:
            return {"estimate": None, "n": 0, "n_clusters": 0}
        g_n = int(d.groups[gkey].nunique()) if len(d.groups) else 0
        base = {"n": d.n, "n_clusters": g_n, "p_analytic": d.p_analytic}
        if d.stat is None or d.estimate is None or not np.isfinite(d.estimate):
            return {**base, "estimate": None}
        dr, g = self.draws(d, gkey, seed)
        lo, hi = ci_from_draws(dr, g, self.n_boot, min_blocks)
        theta0 = 0.5 if d.kind == "auc" else 0.0
        fin = dr[np.isfinite(dr)]
        return {
            **base,
            "estimate": float(d.estimate),
            "ci_low": lo,
            "ci_high": hi,
            "p_boot": bootstrap_p(fin, theta0, self.n_boot) if lo is not None else None,
        }


# ---------------------------------------------------------------------------
# Binding notes carried on rows (PR §4.4 with A4 rev. 1 E9, §6.3 R7, §3.2)
# ---------------------------------------------------------------------------

SHOCK_NOTES = {
    (2019, 2021): "W1 (31.12.2018-31.12.2020): pandemic onset; unemployment rises from spring "
    "2020, concentrated in gastronomy, retail and tourism jobs, which links the outcome to the "
    "POI basket through the labour market, not through neighbourhood change (PR §4.4)",
    (2021, 2023): "W2 (31.12.2020-31.12.2022): bounce-back of pandemic unemployment; Ukrainian "
    "arrivals from March 2022 enter Hamburg T at arrival (AsylbLG is in S3), and at the 1 June "
    "2022 Rechtskreiswechsel Hamburg T is unchanged while U and C rise; Berlin U, T* and C rise "
    "from June; the asymmetry is in which indicator carries them (PR §4.4)",
    (2023, 2025): "W3 (31.12.2022-31.12.2024): Bürgergeld (1 Jan 2023) widens SGB II access and "
    "Wohngeld-Plus (2023) moves some households out of SGB II/XII; city-wide, but their incidence "
    "follows the existing low-income geography; Ukrainian arrivals continue (PR §4.4)",
}
POOLED_NOTE = (
    "pooled windows: under rank statistics a uniform city-wide shift is harmless, a shift that "
    "follows the existing geography is not (PR §4.4)"
)
# A4 rev. 1 E9: binding page wording wherever Hamburg change is shown.
HH_ACCOMMODATION_NOTE = (
    "In Hamburg, the welfare indicator includes asylum-seeker benefits. Where the city opens or "
    "closes refugee accommodation, an area's figure can change by tens of percentage points "
    "without any change among its existing residents. Such changes show where accommodation was "
    "placed. We do not read them as neighbourhood decline or improvement."
)
# PR §6.3 R7: binding page wording wherever a city comparison is shown.
R7_WORDING = (
    "Welfare receipt is measured slightly differently in the two cities: Berlin's figure, derived "
    "from two published indicators, includes social assistance (mainly older and disabled "
    "people); Hamburg's includes asylum-seeker benefits. A city difference is only stated if it "
    "also appears without this indicator."
)
R19_NOTE = (
    "Hamburg S3 2019 = the publisher's re-based level s3_2022 - D3_2022 (R19 primary, A4 rev. 1 "
    "E1; Bericht 2021 PDF p. 8 AsylbLG counting change)"
)
EWR22_NOTE = (
    "Berlin 31.12.2022 weights and T* base linearly interpolated between 2020 and 2024 (PM "
    "decision M3; DC §4.3)"
)
COARSE_NOTE = "too few clusters for reliable coverage (PR §6.2); reported only to show how far the coarse-cluster answer differs; cluster floor 5 (directional_inference default)"
G16_NOTE = "G = 16 sensitivity (PR §6.2); cluster floor 5 (directional_inference default), not the P354 floor of 20"
M3_NOTE = "M3 swaps the edition-2023 aggregation weights only; the age bands and P^(U)/P of each PLR stay at the interpolated 31.12.2022 values (geo readings ruling 5)"


def _windows_of(hyp: str) -> tuple[tuple[int, int], ...]:
    if hyp in ("H1", "H1a", "H1b", "H1c"):
        return ()
    return WINDOWS


def _uses_2023(hyp: str) -> bool:
    return hyp not in ("H1", "H1a", "H1b", "H1c")


# ---------------------------------------------------------------------------
# Frames
# ---------------------------------------------------------------------------


def window_frame(gr: Grain, st: Status) -> pd.DataFrame:
    """One row per (unit, window): dK, K at both ends, commercial change g(c) (DHS growth of the
    commercial C5 share, P354 §5.1), the P354 §5.2 POI-change variants, the N2 café/fast-food
    log-ratio change (PR §7.2) and the data years for the §8.2 temporal guards."""
    parts = []
    c5 = gr.c5
    for s, e in WINDOWS:
        d = st.dK.xs(e, level="w_end")
        df = pd.DataFrame(index=pd.Index(d.index, name="unit"))
        df["dK"] = d["dK"]
        df["d_start_year"] = d["w_start"].astype(float)
        df["d_end_year"] = float(e)
        df["K_s"] = st.K.xs(s, level="edition")["K"].reindex(df.index)
        df["K_e"] = st.K.xs(e, level="edition")["K"].reindex(df.index)
        cs = c5.xs(s, level="snapshot_year").reindex(df.index)
        ce = c5.xs(e, level="snapshot_year").reindex(df.index)
        df["c5_year_s"] = np.where(cs["total"].notna(), float(s), np.nan)
        df["c5_year_e"] = np.where(ce["total"].notna(), float(e), np.nan)
        df["g_commercial_c5"] = dhs_growth(cs["commercial_share"], ce["commercial_share"])
        df["g_total_c5"] = dhs_growth(cs["total_share"], ce["total_share"])
        df["g_cafe_c5"] = dhs_growth(cs["cafe_c5"], ce["cafe_c5"])
        ws, we = gr.oa_wide[s], gr.oa_wide[e]
        df["d_oa_basket"] = S._basket(we).reindex(df.index) - S._basket(ws).reindex(df.index)
        rs = np.log((cs["cafe"] + N2_CC) / (cs["ff"] + N2_CC))
        re_ = np.log((ce["cafe"] + N2_CC) / (ce["ff"] + N2_CC))
        df["dr_cafe_ff"] = re_ - rs
        df["gastro_ok"] = (cs["gastro"] >= 10) & (ce["gastro"] >= 10)
        with np.errstate(divide="ignore", invalid="ignore"):
            df["g_cafe_in_gastro"] = dhs_growth(
                cs["cafe"] / cs["gastro"], ce["cafe"] / ce["gastro"]
            )
            df["g_ff_in_gastro"] = dhs_growth(cs["ff"] / cs["gastro"], ce["ff"] / ce["gastro"])
        df["w_start"], df["w_end"] = s, e
        parts.append(df.reset_index())
    out = pd.concat(parts, ignore_index=True)
    return out.sort_values(["unit", "w_end"]).reset_index(drop=True)


def cross_lag(wf: pd.DataFrame, gr: Grain) -> pd.DataFrame:
    """One row per (unit, pivot): P = window ending at the pivot, F = window starting at it
    (PR §6.1). Carries the data years of both series and both level controls (PR §8.2)."""
    parts = []
    for pv in PIVOTS:
        p = wf[wf["w_end"] == pv].set_index("unit")
        f = wf[wf["w_start"] == pv].set_index("unit")
        units = p.index.intersection(f.index)
        p, f = p.reindex(units), f.reindex(units)
        df = pd.DataFrame(index=pd.Index(units, name="unit"))
        df["pivot"] = pv
        for col in ("g_commercial_c5", "g_total_c5", "g_cafe_c5", "d_oa_basket"):
            df[f"{col}_P"] = p[col]
            df[f"{col}_F"] = f[col]
        df["dK_P"], df["dK_F"] = p["dK"], f["dK"]
        df["K_pivot"], df["K_start"] = p["K_e"], p["K_s"]
        df["dr_P"] = p["dr_cafe_ff"]
        df["gastro_ok_P"] = p["gastro_ok"]
        df["g_cafe_in_gastro_P"] = p["g_cafe_in_gastro"]
        df["g_ff_in_gastro_P"] = p["g_ff_in_gastro"]
        df["poi_P_s"], df["poi_P_e"] = p["c5_year_s"], p["c5_year_e"]
        df["poi_F_s"], df["poi_F_e"] = f["c5_year_s"], f["c5_year_e"]
        df["st_P_s"], df["st_P_e"] = p["d_start_year"], p["d_end_year"]
        df["st_F_s"], df["st_F_e"] = f["d_start_year"], f["d_end_year"]
        df["K_start_year"] = p["d_start_year"]
        df["K_pivot_year"] = p["d_end_year"]
        if gr.lag is not None:
            # PR §7.3: Wg(c)_P over the matched panel's queen neighbours (POI-side only).
            s0 = pv - 2
            cs = gr.c5.xs(s0, level="snapshot_year").reindex(gr.units)
            ce = gr.c5.xs(pv, level="snapshot_year").reindex(gr.units)
            g_all = pd.Series(
                dhs_growth(cs["commercial_share"], ce["commercial_share"]), index=gr.units
            )
            df["wg_commercial_c5_P"] = spatial_lag(g_all, gr.lag).reindex(units)
        else:
            df["wg_commercial_c5_P"] = np.nan
        parts.append(df.reset_index())
    out = pd.concat(parts, ignore_index=True)
    return out.sort_values(["unit", "pivot"]).reset_index(drop=True)


def assert_xlag_order(cl: pd.DataFrame, which: str) -> None:
    """PR §8.2: predictor window end <= outcome window start, from the carried data years; the
    H3b start-of-window control dates from <= the predictor window start."""
    if which == "H3b":
        S.assert_temporal_order(
            "H3b",
            cl["st_P_s"],
            cl["st_P_e"],
            cl["poi_F_s"],
            cl["poi_F_e"],
            control_year=cl["K_start_year"],
        )
    else:  # H3a and N1-N3 share the H3a ordering (POI over P -> status over F)
        S.assert_temporal_order("H3a", cl["poi_P_s"], cl["poi_P_e"], cl["st_F_s"], cl["st_F_e"])


# ---------------------------------------------------------------------------
# Hypothesis builder for one city x grain x variant
# ---------------------------------------------------------------------------


class Builder:
    def __init__(self, gr: Grain, st: Status, feats: dict):
        self.gr, self.st, self.feats = gr, st, feats
        self.v = st.variant
        self.lab = CONSTRUCT_LABEL[self.v.construct]
        self.wf = window_frame(gr, st)
        self.cl = cross_lag(self.wf, gr)
        self.out_k = f"K_{self.lab}_{H1_EDITION}"
        self.out_dk = f"dK_{self.lab}"

    # -- helpers ---------------------------------------------------------------

    def spec(self, hyp: str, op: str, estimator: str, **kw) -> dict:
        s = {
            "hyp": hyp,
            "role": "primary",
            "family": "T8" if hyp in PRIMARY_ORDER else ("N" if hyp in ("N1", "N2") else "none"),
            "op": op,
            "predictor": "",
            "outcome": "",
            "controls": "",
            "estimator": estimator,
            "expected_dir": _expected(hyp),
            "window": "",
            "pivots": "",
            "level_control": "none",
            "notes": [],
            "descriptive": False,
        }
        if hyp == "N3":
            s["role"] = "exploratory"
        s.update(kw)
        return s

    def groups(self, units) -> pd.DataFrame:
        return _groups_for(self.gr, units)

    def notes_for(self, windows: Sequence[tuple[int, int]], pooled: bool) -> list[str]:
        out = [SHOCK_NOTES[w] for w in windows]
        if pooled and len(windows) > 1:
            out.append(POOLED_NOTE)
        if self.gr.city == "HH" and windows:
            out.append(HH_ACCOMMODATION_NOTE)
            if (2019, 2021) in windows and self.v.hh_s3_2019 == "R19":
                out.append(R19_NOTE)
        if (
            self.gr.city == "BER"
            and any(e == 2023 for _s, e in windows)
            and 2022 in self.st.info.get("band_years", set())
        ):
            out.append(EWR22_NOTE)
        return out

    def h1_frame(self) -> pd.DataFrame:
        k = self.st.K.xs(H1_EDITION, level="edition")["K"]
        fr = self.gr.oa_wide[H1_EDITION].join(k.rename("K"), how="inner")
        fr = fr[fr["K"].notna() & fr["oa_year"].notna()]
        return fr.loc[[u for u in self.st.units if u in fr.index]]

    def h2_frame(self) -> pd.DataFrame:
        parts = []
        for s, e in WINDOWS:
            d = self.st.dK.xs(e, level="w_end")
            wide = self.gr.oa_wide[s]
            fr = wide.join(d[["dK", "w_start"]], how="inner")
            fr = fr[fr["dK"].notna()].copy()
            fr["out_start"] = fr["w_start"].astype(float)
            fr["out_end"] = float(e)
            fr["w_end"] = e
            parts.append(fr.rename_axis("unit").reset_index())
        out = pd.concat(parts, ignore_index=True).sort_values(["unit", "w_end"])
        out = out.reset_index(drop=True)
        # PR §8.2 / P354 §5.8(2): OA at the snapshot actually joined <= outcome window start.
        S.assert_temporal_order(
            "H2", out["oa_year"], out["oa_year"], out["out_start"], out["out_end"]
        )
        return out

    def _guard(self, preds, ctrls, outcome):
        assert_matched_construct(preds, ctrls, outcome)

    # -- primaries (PR §6.1, §7) ------------------------------------------------

    def core(self, hyps: Iterable[str]) -> dict[str, tuple[dict, Design | None]]:
        hyps = set(hyps)
        out: dict[str, tuple[dict, Design | None]] = {}
        if hyps & {"H1", "H1a", "H1b", "H1c"}:
            fr = self.h1_frame()
            g = self.groups(fr.index)
            y = (fr["K"] > 0).astype(int)
            if "H1" in hyps:
                feats = self.feats["H1_cat"]
                x = S.oa_features(fr, feats, "cat")
                self._guard([f"oa_cat:{k}" for k in feats], [], "K")
                note = _comparability_note(feats)
                out["H1"] = (
                    self.spec(
                        "H1",
                        f"category OA 2025 ({len(feats)} common fixed features, flagged cells "
                        f"imputed in-fold) => K_{H1_EDITION} > 0; GroupKFold by spatial block",
                        "oof_auc_logit",
                        predictor=f"{len(feats)} common category OA features",
                        outcome=f"{self.out_k} > 0",
                        window=str(H1_EDITION),
                        notes=note,
                    ),
                    auc_design(x, y, g),
                )
            for hyp, tag, key, label in (
                ("H1a", "cat", CAFE_KEY, "OA category Cafe"),
                ("H1b", "cat", FASTFOOD_KEY, "OA category Fast Food"),
                ("H1c", "dom", SPORT_DOMAIN, "OA domain Sports and Recreation"),
            ):
                if hyp not in hyps:
                    continue
                name = f"oa_{tag}:{key}"
                self._guard([name], [], "K")
                val = fr.get(name, pd.Series(np.nan, index=fr.index)).astype(float)
                flag = S._as_flag(fr.get(f"flag_{tag}:{key}", pd.Series(True, index=fr.index)))
                x = val.where(~flag)
                out[hyp] = (
                    self.spec(
                        hyp,
                        f"Spearman({label} 2025, K_{H1_EDITION}), min-base flag dropped",
                        "spearman",
                        predictor=name,
                        outcome=self.out_k,
                        window=str(H1_EDITION),
                    ),
                    rho_design(x, fr["K"], [], g),
                )
        if "H2" in hyps:
            fr = self.h2_frame()
            feats = self.feats["H2_cat"]
            x = S.oa_features(fr, feats, "cat")
            self._guard([f"oa_cat:{k}" for k in feats], [], "dK")
            out["H2"] = (
                self.spec(
                    "H2",
                    f"category OA at window start ({len(feats)} common fixed features) => dK_W > 0, "
                    "W1-W3 pooled; GroupKFold by spatial block",
                    "oof_auc_logit",
                    predictor=f"{len(feats)} common category OA features @window start",
                    outcome=f"{self.out_dk} > 0",
                    window="2019-2025",
                    notes=self.notes_for(WINDOWS, True) + _comparability_note(feats),
                ),
                auc_design(x, (fr["dK"] > 0).astype(int), self.groups(fr["unit"])),
            )
        cl = self.cl
        g_cl = self.groups(cl["unit"])
        if "H3a" in hyps:
            assert_xlag_order(cl, "H3a")
            self._guard(["g_commercial_c5@P"], ["dK_P", "K_pivot"], "dK@F")
            out["H3a"] = (
                self.spec(
                    "H3a",
                    "partial Spearman(g(c)_P, dK_F | dK_P, K_pivot), pivots 2021 and 2023 pooled",
                    "partial_spearman",
                    predictor="g_commercial_c5@P",
                    outcome=f"{self.out_dk}@F",
                    controls="dK_P;K_pivot",
                    window="2019-2025",
                    pivots="2021;2023",
                    level_control="pivot",
                    notes=self.notes_for(WINDOWS, True),
                ),
                rho_design(cl["g_commercial_c5_P"], cl["dK_F"], [cl["dK_P"], cl["K_pivot"]], g_cl),
            )
        if "H3b" in hyps:
            assert_xlag_order(cl, "H3b")
            self._guard(["dK@P"], ["g_commercial_c5@P", "K_start"], "dK@P")
            out["H3b"] = (
                self.spec(
                    "H3b",
                    "partial Spearman(dK_P, g(c)_F | g(c)_P, K_start(P)), pivots 2021 and 2023 pooled",
                    "partial_spearman",
                    predictor=f"{self.out_dk}@P",
                    outcome="g_commercial_c5@F",
                    controls="g_commercial_c5@P;K_start",
                    window="2019-2025",
                    pivots="2021;2023",
                    level_control="window_start",
                    notes=self.notes_for(WINDOWS, True),
                ),
                rho_design(
                    cl["dK_P"],
                    cl["g_commercial_c5_F"],
                    [cl["g_commercial_c5_P"], cl["K_start"]],
                    g_cl,
                ),
            )
        if "H3c" in hyps:
            wf = self.wf
            S.assert_temporal_order(
                "H3c", wf["c5_year_s"], wf["c5_year_e"], wf["d_start_year"], wf["d_end_year"]
            )
            self._guard(["g_commercial_c5@W"], [], "dK@W")
            out["H3c"] = (
                self.spec(
                    "H3c",
                    "Spearman(g(c)_W, dK_W), same window, W1-W3 pooled",
                    "spearman",
                    predictor="g_commercial_c5@W",
                    outcome=f"{self.out_dk}@W",
                    window="2019-2025",
                    notes=self.notes_for(WINDOWS, True),
                ),
                rho_design(wf["g_commercial_c5"], wf["dK"], [], self.groups(wf["unit"])),
            )
        if "N1" in hyps:
            assert_xlag_order(cl, "N1")
            above = self.n1_above(cl)
            out["N1"] = (
                self.spec(
                    "N1",
                    "H3a restricted to units with K_pivot above the city's median at the pivot "
                    "(partial Spearman(g(c)_P, dK_F | dK_P, K_pivot)), pivots pooled",
                    "partial_spearman",
                    predictor="g_commercial_c5@P",
                    outcome=f"{self.out_dk}@F",
                    controls="dK_P;K_pivot",
                    window="2019-2025",
                    pivots="2021;2023",
                    level_control="pivot",
                    notes=[
                        "scope (D7): pools inner-city disadvantaged areas with peripheral large "
                        "estates; public wording 'among the more disadvantaged half of "
                        "neighbourhoods', never 'gentrifying areas' (PR §7.1)",
                        *self.notes_for(WINDOWS, True),
                    ],
                ),
                rho_design(
                    cl["g_commercial_c5_P"].where(above),
                    cl["dK_F"],
                    [cl["dK_P"], cl["K_pivot"]],
                    g_cl,
                ),
            )
        if "N2" in hyps:
            assert_xlag_order(cl, "N2")
            self._guard(["dr_cafe_ff@P"], ["dK_P", "K_pivot"], "dK@F")
            ok = cl["gastro_ok_P"].fillna(False).astype(bool)
            out["N2"] = (
                self.spec(
                    "N2",
                    "partial Spearman(Delta r_P, dK_F | dK_P, K_pivot), r = ln((Cafe + 0.5) / "
                    "(Fast Food + 0.5)); units passing the Gastronomy base at both ends of P; "
                    "pivots pooled",
                    "partial_spearman",
                    predictor="dr_cafe_ff@P",
                    outcome=f"{self.out_dk}@F",
                    controls="dK_P;K_pivot",
                    window="2019-2025",
                    pivots="2021;2023",
                    level_control="pivot",
                    notes=[
                        "an ordering test, not a warning, forecasting or investment indicator "
                        "(D5a); described only as 'a shift in the gastronomy mix toward cafés', "
                        "never as 'fewer fast-food outlets' (D5b)",
                        *self.notes_for(WINDOWS, True),
                    ],
                ),
                rho_design(cl["dr_P"].where(ok), cl["dK_F"], [cl["dK_P"], cl["K_pivot"]], g_cl),
            )
        if "N3" in hyps:
            assert_xlag_order(cl, "N3")
            self._guard(["wg_commercial_c5@P"], ["g_commercial_c5@P", "dK_P", "K_pivot"], "dK@F")
            out["N3"] = (
                self.spec(
                    "N3",
                    "partial Spearman(Wg(c)_P, dK_F | g(c)_P, dK_P, K_pivot); W = row-standardised "
                    f"queen contiguity of the matched units, k = {N3_KNN} nearest neighbours for "
                    "islands; pivots pooled",
                    "partial_spearman",
                    predictor="wg_commercial_c5@P",
                    outcome=f"{self.out_dk}@F",
                    controls="g_commercial_c5@P;dK_P;K_pivot",
                    window="2019-2025",
                    pivots="2021;2023",
                    level_control="pivot",
                    notes=[
                        "exploratory (PR §7.3): the spatial lag smooths over the neighbours the "
                        "block bootstrap keeps together",
                        *self.notes_for(WINDOWS, True),
                    ],
                ),
                rho_design(
                    cl["wg_commercial_c5_P"],
                    cl["dK_F"],
                    [cl["g_commercial_c5_P"], cl["dK_P"], cl["K_pivot"]],
                    g_cl,
                ),
            )
        return out

    def n1_above(self, cl: pd.DataFrame) -> pd.Series:
        """PR §7.1: K_pivot above the city's median at that pivot (same rule in both cities)."""
        med = {pv: float(self.st.K.xs(pv, level="edition")["K"].median()) for pv in PIVOTS}
        return cl["K_pivot"] > cl["pivot"].map(med)

    # -- P354 §5.2 secondaries carried over at this grain (PR §6.1) ---------------

    def secondaries(self) -> list[tuple[dict, Design | None]]:
        out: list[tuple[dict, Design | None]] = []
        add = out.append
        fr = self.h1_frame()
        g = self.groups(fr.index)
        y = (fr["K"] > 0).astype(int)
        f1 = self.feats["H1_cat"]
        sec = {"role": "secondary", "family": "none"}
        sen = {"role": "sensitivity", "family": "none"}
        exp_ = {"role": "exploratory", "family": "none"}
        w25 = {"window": str(H1_EDITION), "outcome": self.out_k}
        dom = self.feats["H1_dom"]
        self._guard([f"oa_dom:{k}" for k in dom], [], "K")
        add(
            (
                self.spec(
                    "H1",
                    "domain-level OA 2025 (common domains) => K_2025 > 0",
                    "oof_auc_logit",
                    predictor=f"{len(dom)} common domain OA features",
                    notes=["a null here reads 'not detected at domain resolution'"],
                    **sec,
                    **w25,
                ),
                auc_design(S.oa_features(fr, dom, "dom"), y, g),
            )
        )
        comm = [k for k in f1 if k.split("|")[0] in COMMERCIAL_DOMAINS]
        add(
            (
                self.spec(
                    "H1",
                    "commercial-only category OA (4 commercial domains, common list) => K_2025 > 0",
                    "oof_auc_logit",
                    predictor=f"{len(comm)} commercial category OA features",
                    notes=["decides the public 'businesses' wording (P354 §9)"],
                    **sec,
                    **w25,
                ),
                auc_design(S.oa_features(fr, comm, "cat"), y, g),
            )
        )
        xb = S.oa_features(fr, f1, "cat")
        for d0 in sorted({k.split("|")[0] for k in f1}):
            xb[f"base:{d0}"] = (
                fr.get(f"stock_dom:{d0}", pd.Series(0.0, index=fr.index)).fillna(0) >= 10
            ).astype(float)
        self._guard(list(xb.columns), [], "K")
        add(
            (
                self.spec(
                    "H1",
                    "category OA + one base indicator per domain (A1.1 (i))",
                    "oof_auc_logit",
                    predictor=f"{xb.shape[1]} features",
                    **sen,
                    **w25,
                ),
                auc_design(xb, y, g),
            )
        )
        cc = np.ones(len(fr), dtype=bool)
        for d0 in COMMERCIAL_DOMAINS:
            cc &= (
                fr.get(f"stock_dom:{d0}", pd.Series(0.0, index=fr.index)).fillna(0).to_numpy() >= 10
            )
        add(
            (
                self.spec(
                    "H1",
                    "category OA, complete-case: base passed in all four commercial domains (A1.1 (ii))",
                    "oof_auc_logit",
                    predictor=f"{len(f1)} common category OA features",
                    **sen,
                    **w25,
                ),
                auc_design(S.oa_features(fr, f1, "cat")[cc], y[cc], g[cc].reset_index(drop=True)),
            )
        )
        pop = self.gr.pop_all24.reindex(fr.index).to_numpy(float)
        for hyp, tag, key in (
            ("H1a", "cat", CAFE_KEY),
            ("H1b", "cat", FASTFOOD_KEY),
            ("H1c", "dom", SPORT_DOMAIN),
        ):
            stock = fr.get(f"stock_{tag}:{key}", pd.Series(np.nan, index=fr.index)).fillna(0.0)
            with np.errstate(divide="ignore", invalid="ignore"):
                per1k = np.where(pop > 0, 1000.0 * stock.to_numpy(float) / pop, np.nan)
            self._guard([f"per1k:{key}"], [], "K")
            add(
                (
                    self.spec(
                        hyp,
                        f"Spearman({key} POIs per 1,000 residents (31.12.2024, all children), "
                        "K_2025), full frame, no base rule (population-weighted stock, A1.1 (iii))",
                        "spearman",
                        predictor=f"per1k:{key}",
                        **sen,
                        **w25,
                    ),
                    rho_design(per1k, fr["K"], [], g),
                )
            )
        add(self._no_tt_row(fr, g))
        add(self._no_kebab_row())
        # -- H2 --------------------------------------------------------------------
        h2 = self.h2_frame()
        g2 = self.groups(h2["unit"])
        y2 = (h2["dK"] > 0).astype(int)
        f2 = self.feats["H2_cat"]
        x2 = S.oa_features(h2, f2, "cat")
        n_all = self.notes_for(WINDOWS, True)
        wpool = {"window": "2019-2025", "outcome": f"{self.out_dk} > 0", "notes": n_all}
        d2 = self.feats["H2_dom"]
        self._guard([f"oa_dom:{k}" for k in d2], [], "dK")
        add(
            (
                self.spec(
                    "H2",
                    "domain-level OA at window start (common domains) => dK_W > 0",
                    "oof_auc_logit",
                    predictor=f"{len(d2)} common domain OA features",
                    **sec,
                    **wpool,
                ),
                auc_design(S.oa_features(h2, d2, "dom"), y2, g2),
            )
        )
        xb2 = x2.copy()
        for d0 in sorted({k.split("|")[0] for k in f2}):
            xb2[f"base:{d0}"] = (
                h2.get(f"stock_dom:{d0}", pd.Series(0.0, index=h2.index)).fillna(0) >= 10
            ).astype(float)
        add(
            (
                self.spec(
                    "H2",
                    "category OA + one base indicator per domain (A1.1 (i))",
                    "oof_auc_logit",
                    predictor=f"{xb2.shape[1]} features",
                    **sen,
                    **wpool,
                ),
                auc_design(xb2, y2, g2),
            )
        )
        cc2 = np.ones(len(h2), dtype=bool)
        for d0 in COMMERCIAL_DOMAINS:
            cc2 &= (
                h2.get(f"stock_dom:{d0}", pd.Series(0.0, index=h2.index)).fillna(0).to_numpy() >= 10
            )
        add(
            (
                self.spec(
                    "H2",
                    "category OA, complete-case in the four commercial domains (A1.1 (ii))",
                    "oof_auc_logit",
                    predictor=f"{len(f2)} common category OA features",
                    **sen,
                    **wpool,
                ),
                auc_design(x2[cc2], y2[cc2], g2[cc2].reset_index(drop=True)),
            )
        )
        # P354 §5.2 H2 incremental (binds Holds?, Amendment 2): K at the window start.
        kst = []
        for s, e in WINDOWS:
            ks = self.st.K.xs(s, level="edition")["K"]
            kst.append(h2.loc[h2["w_end"] == e, "unit"].map(ks))
        kstart = pd.concat(kst).reindex(h2.index)
        ok = kstart.notna().to_numpy()
        self._guard(list(x2.columns), ["K_start"], "dK")
        add(
            (
                self.spec(
                    "H2",
                    "H2 incremental: delta AUC of (K at window start + category OA) over K at "
                    "window start alone",
                    "delta_auc",
                    predictor="category OA",
                    controls="K_start",
                    level_control="window_start",
                    expected_dir="positive",
                    **sec,
                    **wpool,
                ),
                dauc_design(
                    kstart[ok].to_frame().to_numpy(float),
                    pd.concat([kstart[ok], x2[ok]], axis=1).to_numpy(float),
                    y2[ok],
                    g2[ok].reset_index(drop=True),
                ),
            )
        )
        bask = S._basket(h2)
        self._guard(["oa_basket"], [], "dK")
        add(
            (
                self.spec(
                    "H2",
                    "directional continuity: Spearman(OA basket of the 4 commercial domains at "
                    "window start, dK_W)",
                    "spearman",
                    predictor="oa_basket",
                    expected_dir="negative",
                    **exp_,
                    **{**wpool, "outcome": f"{self.out_dk}"},
                ),
                rho_design(bask, h2["dK"], [], g2),
            )
        )
        for s, e in WINDOWS:
            m = (h2["w_end"] == e).to_numpy()
            add(
                (
                    self.spec(
                        "H2",
                        f"H2 window {s}-{e} only",
                        "oof_auc_logit",
                        predictor=f"{len(f2)} common category OA features @{s}",
                        outcome=f"{self.out_dk} > 0",
                        window=f"{s}-{e}",
                        notes=self.notes_for(((s, e),), False),
                        **sen,
                    ),
                    auc_design(x2[m], y2[m], g2[m].reset_index(drop=True)),
                )
            )
        # -- H3a / H3b ---------------------------------------------------------------
        cl = self.cl
        gcl = self.groups(cl["unit"])
        piv = {"window": "2019-2025", "pivots": "2021;2023", "notes": n_all}
        h3 = {
            "H3a": (
                lambda c, poi: (c[f"{poi}_P"], c["dK_F"], [c["dK_P"], c["K_pivot"]]),
                lambda c, poi: (c[f"{poi}_P"], c["dK_F"], [c["dK_P"], c["K_start"]]),
                "pivot",
                "window_start",
            ),
            "H3b": (
                lambda c, poi: (c["dK_P"], c[f"{poi}_F"], [c[f"{poi}_P"], c["K_start"]]),
                lambda c, poi: (c["dK_P"], c[f"{poi}_F"], [c[f"{poi}_P"], c["K_pivot"]]),
                "window_start",
                "pivot",
            ),
        }
        for which, (prim, alt, t_prim, t_alt) in h3.items():
            x, yv, ct = alt(cl, "g_commercial_c5")
            add(
                (
                    self.spec(
                        which,
                        f"{which} with the alternative level control ({t_alt})",
                        "partial_spearman",
                        level_control=t_alt,
                        **sen,
                        **piv,
                    ),
                    rho_design(x, yv, ct, gcl),
                )
            )
            for pv in PIVOTS:
                m = (cl["pivot"] == pv).to_numpy()
                x, yv, ct = prim(cl[m], "g_commercial_c5")
                wins = tuple(w for w in WINDOWS if pv in w)
                add(
                    (
                        self.spec(
                            which,
                            f"{which} at pivot {pv} only",
                            "partial_spearman",
                            level_control=t_prim,
                            window=f"{pv - 2}-{pv + 2}",
                            pivots=str(pv),
                            notes=self.notes_for(wins, False),
                            **sen,
                        ),
                        rho_design(x, yv, ct, gcl[m].reset_index(drop=True)),
                    )
                )
            x, yv, ct = prim(cl, "g_commercial_c5")
            add(
                (
                    self.spec(
                        which,
                        "pivot difference: rho(pivot 2023) - rho(pivot 2021) (P354 §3.4)",
                        "partial_spearman_diff",
                        level_control=t_prim,
                        expected_dir="nondirectional",
                        descriptive=True,
                        **sen,
                        **piv,
                    ),
                    diff_design(x, yv, ct, cl["pivot"] == 2023, cl["pivot"] == 2021, gcl),
                )
            )
            for poi, label, role in (
                ("g_total_c5", "total-share growth of all POIs (continuity with E1/E5)", sec),
                ("d_oa_basket", "OA-basket change (mean OA of the 4 commercial domains)", sec),
                ("g_cafe_c5", "café-growth cross-lag, g(café C5 share) (P354 R4)", exp_),
            ):
                x, yv, ct = prim(cl, poi)
                self._guard([f"{poi}@P"], [], "dK")
                add(
                    (
                        self.spec(
                            which,
                            f"{which} with {label}",
                            "partial_spearman",
                            level_control=t_prim,
                            **role,
                            **piv,
                        ),
                        rho_design(x, yv, ct, gcl),
                    )
                )
        # -- H3c -------------------------------------------------------------------
        wf = self.wf
        gwf = self.groups(wf["unit"])
        for poi, label in (
            ("g_total_c5", "H3c with total-share growth"),
            ("d_oa_basket", "H3c with OA-basket change"),
        ):
            add(
                (
                    self.spec(
                        "H3c",
                        label,
                        "spearman",
                        predictor=f"{poi}@W",
                        outcome=f"{self.out_dk}@W",
                        **sec,
                        **{"window": "2019-2025", "notes": n_all},
                    ),
                    rho_design(wf[poi], wf["dK"], [], gwf),
                )
            )
        for s, e in WINDOWS:
            m = (wf["w_end"] == e).to_numpy()
            add(
                (
                    self.spec(
                        "H3c",
                        f"H3c window {s}-{e} only",
                        "spearman",
                        predictor="g_commercial_c5@W",
                        outcome=f"{self.out_dk}@W",
                        window=f"{s}-{e}",
                        notes=self.notes_for(((s, e),), False),
                        **sen,
                    ),
                    rho_design(
                        wf.loc[m, "g_commercial_c5"],
                        wf.loc[m, "dK"],
                        [],
                        gwf[m].reset_index(drop=True),
                    ),
                )
            )
        # -- N1 / N2 secondaries (PR §7.1, §7.2) --------------------------------------
        above = self.n1_above(cl)
        below = ~above & cl["K_pivot"].notna()
        add(
            (
                self.spec(
                    "N1",
                    "stratum difference rho(K_pivot above median) - rho(below), H3a form",
                    "partial_spearman_diff",
                    expected_dir="nondirectional",
                    level_control="pivot",
                    descriptive=True,
                    **exp_,
                    **piv,
                ),
                diff_design(
                    cl["g_commercial_c5_P"],
                    cl["dK_F"],
                    [cl["dK_P"], cl["K_pivot"]],
                    above,
                    below,
                    gcl,
                ),
            )
        )
        inner = cl["unit"].map(self.gr.inner).astype(bool)
        for name, m in (("inner", inner), ("outer", ~inner)):
            sel = (above & m).to_numpy()
            add(
                (
                    self.spec(
                        "N1",
                        f"N1 within the {name} half of the city (population-weighted median "
                        f"distance to {self.gr_cfg().centre_name}, R2)",
                        "partial_spearman",
                        level_control="pivot",
                        **exp_,
                        **piv,
                    ),
                    rho_design(
                        cl["g_commercial_c5_P"].where(sel),
                        cl["dK_F"],
                        [cl["dK_P"], cl["K_pivot"]],
                        gcl,
                    ),
                )
            )
        okg = cl["gastro_ok_P"].fillna(False).astype(bool)
        for col, label in (
            ("g_cafe_in_gastro_P", "g(café share within Gastronomy)_P"),
            ("g_ff_in_gastro_P", "g(fast-food share within Gastronomy)_P"),
        ):
            base = col.removesuffix("_P")
            self._guard([f"{base}@P"], ["dK_P", "K_pivot"], "dK")
            add(
                (
                    self.spec(
                        "N2",
                        f"N2 component: partial Spearman({label}, dK_F | dK_P, K_pivot) (D5b)",
                        "partial_spearman",
                        predictor=f"{base}@P",
                        level_control="pivot",
                        **sec,
                        **piv,
                    ),
                    rho_design(cl[col].where(okg), cl["dK_F"], [cl["dK_P"], cl["K_pivot"]], gcl),
                )
            )
        m = (cl["pivot"] == 2021).to_numpy()
        add(
            (
                self.spec(
                    "N2",
                    "N2 at pivot 2021 only (P = W1; the pandemic closed sit-down cafés while "
                    "takeaway stayed permitted, D5c)",
                    "partial_spearman",
                    level_control="pivot",
                    window="2019-2023",
                    pivots="2021",
                    notes=self.notes_for(WINDOWS[:2], False),
                    **sen,
                ),
                rho_design(
                    cl.loc[m, "dr_P"].where(okg[m]),
                    cl.loc[m, "dK_F"],
                    [cl.loc[m, "dK_P"], cl.loc[m, "K_pivot"]],
                    gcl[m].reset_index(drop=True),
                ),
            )
        )
        add(
            (
                self.spec(
                    "N2",
                    "N2 without döner/kebab types (354 R4, conditional on the taxonomy)",
                    "partial_spearman",
                    **sen,
                    **{**piv, "notes": [self._kebab_note()]},
                ),
                None,
            )
        )
        return out

    def gr_cfg(self) -> CityCfg:
        return CITY[self.gr.city]

    def _kebab_note(self) -> str:
        t = self.gr.types
        types = sorted(set(t.loc[t["poi_category_h"] == "Fast Food", "poi_type_h"].dropna()))
        return (
            "not testable: the taxonomy carries no döner/kebab type "
            f"(Fast Food types at 2025: {', '.join(types) or 'none'})"
        )

    def _no_kebab_row(self):
        t = self.gr.types
        kebab = sorted(
            {
                ty
                for ty in t.loc[t["poi_category_h"] == "Fast Food", "poi_type_h"].dropna()
                if any(k in str(ty).lower() for k in S.KEBAB_TOKENS)
            }
        )
        assert not kebab, "kebab types exist; the R3 row would need implementing"  # noqa: S101
        return (
            self.spec(
                "H1b",
                "Fast Food without döner/kebab types (anti-stigmatisation check, R3)",
                "spearman",
                role="sensitivity",
                family="none",
                window=str(H1_EDITION),
                outcome=self.out_k,
                notes=[self._kebab_note()],
            ),
            None,
        )

    def _no_tt_row(self, fr: pd.DataFrame, g: pd.DataFrame):
        """P354 D3b: Sport category without table tennis, LQ recomputed from type counts with
        table tennis removed from numerator and parent; base rule on the reduced parent."""
        t = self.gr.types
        dom_n = t[t["poi_domain_h"] == SPORT_DOMAIN].groupby("area_code")["poi_count"].sum()
        cat_n = (
            t[(t["poi_domain_h"] == SPORT_DOMAIN) & (t["poi_category_h"] == "Sport")]
            .groupby("area_code")["poi_count"]
            .sum()
        )
        tt_n = (
            t[(t["poi_category_h"] == "Sport") & (t["poi_type_h"] == S.TABLE_TENNIS_TYPE)]
            .groupby("area_code")["poi_count"]
            .sum()
        )
        idx = pd.Index(sorted(set(t["area_code"])))
        dom_n, cat_n, tt_n = (s.reindex(idx).fillna(0.0) for s in (dom_n, cat_n, tt_n))
        raw_lq = pd.Series(lq_from_stocks(cat_n, dom_n, cat_n.sum(), dom_n.sum()), index=idx)
        panel = self.gr.oa_wide[H1_EDITION].get("oa_cat:Sports and Recreation|Sport")
        if panel is not None:
            both = dom_n > 0
            assert np.allclose(  # noqa: S101 -- R-C3 consistency guard
                raw_lq[both].to_numpy(float),
                panel.reindex(idx)[both].to_numpy(float),
                rtol=1e-9,
                atol=1e-9,
            ), "recomputed Sport LQ differs from the matched OA"
        num, den = cat_n - tt_n, dom_n - tt_n
        oa = pd.Series(lq_from_stocks(num, den, num.sum(), den.sum()), index=idx).where(den >= 10)
        self._guard(["oa_sport_no_tt"], [], "K")
        return (
            self.spec(
                "H1c",
                "Spearman(Sport category without table tennis, K_2025); table tennis removed from "
                "numerator and parent (D3b)",
                "spearman",
                role="sensitivity",
                family="none",
                predictor="oa_sport_no_tt",
                outcome=self.out_k,
                window=str(H1_EDITION),
            ),
            rho_design(oa.reindex(fr.index), fr["K"], [], g),
        )

    def diagnostic(self, which: str, drop: set[str], label: str) -> tuple[dict, Design | None]:
        """PR §5 (C5) and R5/E7: the H3 primary with the top-decile units dropped (rows only;
        the outcome is not re-standardised)."""
        cl, wf = self.cl, self.wf
        if which == "H3c":
            m = ~wf["unit"].isin(drop)
            d = rho_design(
                wf.loc[m, "g_commercial_c5"], wf.loc[m, "dK"], [], self.groups(wf.loc[m, "unit"])
            )
        else:
            m = ~cl["unit"].isin(drop)
            c = cl[m]
            if which == "H3a":
                d = rho_design(
                    c["g_commercial_c5_P"],
                    c["dK_F"],
                    [c["dK_P"], c["K_pivot"]],
                    self.groups(c["unit"]),
                )
            else:
                d = rho_design(
                    c["dK_P"],
                    c["g_commercial_c5_F"],
                    [c["g_commercial_c5_P"], c["K_start"]],
                    self.groups(c["unit"]),
                )
        return (
            self.spec(
                which,
                f"{which} primary without the {len(drop)} units in the top decile of {label}",
                "partial_spearman" if which != "H3c" else "spearman",
                role="sensitivity",
                family="none",
                window="2019-2025",
                pivots="" if which == "H3c" else "2021;2023",
                level_control={"H3a": "pivot", "H3b": "window_start"}.get(which, "none"),
                notes=self.notes_for(WINDOWS, True),
            ),
            d,
        )


def _comparability_note(feats: Sequence[str]) -> list[str]:
    """PR §6.5: at a grain where no commercial category passes A1.1 in both cities, H1/H2 test
    transport and public facilities only and are 'not comparable' with the thesis's H1/H2."""
    if any(k.split("|")[0] in COMMERCIAL_DOMAINS for k in feats):
        return []
    return [
        "not comparable: no commercial category passes A1.1 in both cities at this grain "
        f"({len(feats)} common features, none commercial); the measurability of the business mix "
        "is grain-dependent (PR §6.5)"
    ]


def _expected(hyp: str) -> str:
    if hyp in N_HYPOTHESES:
        return N_HYPOTHESES[hyp]["expected"]
    form = THESIS_HYPOTHESES[hyp].get("form")
    if form == "nondirectional":
        return "nondirectional"
    if form == "ordering":
        return "ordering"
    return THESIS_HYPOTHESES[hyp]["suite_expected_dir"]


def top_decile(s: pd.Series, units: Iterable[str]) -> set[str]:
    """PR §5 / R5: the units at or above the 90th percentile of the growth series."""
    v = s.reindex(list(units)).dropna()
    if v.empty:
        return set()
    thr = float(np.quantile(v.to_numpy(float), 0.9))
    return set(v.index[v.to_numpy(float) >= thr])


# ---------------------------------------------------------------------------
# Rows
# ---------------------------------------------------------------------------

DIFFERS = "DIFFERS"
NDD = "NO DIFFERENCE DETECTED"
CLUSTER_UNIT = {
    "k24": "spatial_block_k24",
    "k16": "spatial_block_k16",
    "k36": "spatial_block_k36",
    "iid": "iid",
    "bezirk": "bezirk",
}


@dataclass
class Ctx:
    n_boot: int
    sha: str
    boot: Bootstrapper
    rows: list = field(default_factory=list)


def make_row(
    ctx: Ctx,
    city: str,
    grain: str,
    spec: dict,
    res: dict,
    *,
    variant: Variant,
    kind: str,
    gkey: str = "k24",
    seed: str = "42",
    label_prefix: str = "",
) -> dict:
    hyp = spec["hyp"]
    est = res.get("estimate")
    sens = variant.key != "primary" or gkey != "k24"
    role = spec["role"]
    family = spec["family"]
    if sens and role in ("primary", "interaction"):
        role, family = "sensitivity", "none"
    if sens and role == "exploratory" and variant.key != "primary":
        role, family = "sensitivity", "none"
    n_cl = res.get("n_clusters")
    row = {
        "city": city,
        "panel": "matched",
        "window": spec["window"],
        "pivots": spec["pivots"],
        "hypothesis": hyp,
        "role": role,
        "operationalisation": f"{label_prefix}{spec['op']}",
        "predictor": spec["predictor"],
        "outcome": spec["outcome"],
        "controls": spec["controls"],
        "grain": grain,
        "cluster_unit": CLUSTER_UNIT[gkey],
        "n": res.get("n"),
        "n_clusters": n_cl,
        "estimator": spec["estimator"],
        "estimate": est,
        "ci_low": res.get("ci_low"),
        "ci_high": res.get("ci_high"),
        "p_boot": res.get("p_boot"),
        "p_bh": None,
        "p_holm": None,
        "p_analytic": res.get("p_analytic"),
        "expected_dir": spec["expected_dir"],
        "verdict": "",
        "effect_label": "" if city == "BER-HH" else S.effect_label(spec["estimator"], est),
        "thesis_verdict": THESIS_HYPOTHESES[hyp]["thesis_verdict"] if hyp in PRIMARY_ORDER else "",
        "holds": "",
        "level_control": spec["level_control"],
        "d4_control": False,
        "seed": seed,
        "n_boot": ctx.n_boot,
        "run_sha": ctx.sha,
        "notes": list(spec["notes"]),
        "family": family,
        "status_construct": CONSTRUCT_LABEL[variant.construct],
        "estimate_ber": res.get("estimate_ber"),
        "estimate_hh": res.get("estimate_hh"),
        "mdd": res.get("mdd"),
        "n_blocks": n_cl if gkey.startswith("k") else None,
        "definition_fallback": False,
        "flags": set(),
        "_tags": set(variant.tags),
        "_variant": variant.key,
        "_kind": kind,
        "_gkey": gkey,
        "_descriptive": bool(spec["descriptive"]),
        "_band_years": set(),
    }
    if gkey == "bezirk" or gkey == "k16":
        row["notes"].append(COARSE_NOTE if gkey == "bezirk" else G16_NOTE)
    if variant.key != "primary":
        row["notes"].append(f"sensitivity: {variant.label}")
    if variant.key == "M3_2020":
        row["notes"].append(M3_NOTE)
    ctx.rows.append(row)
    return row


def x8_row(
    ctx: Ctx,
    hyp: str,
    spec: dict,
    d_b: Design | None,
    d_h: Design | None,
    *,
    variant: Variant,
    kind: str,
    role: str,
    family: str,
    gkey: str = "k24",
    min_blocks: int = MIN_BLOCKS,
    label_prefix: str = "",
    grain: str = "ber_bzr_2021;hh_stadtteil",
    band_years: Iterable[int] = (),
) -> dict:
    """PR §6.3: Delta = theta_BER - theta_HH from independent block bootstraps."""
    boot = ctx.boot
    rb = boot.infer(d_b, gkey, SEED_X8["BER"], min_blocks)
    rh = boot.infer(d_h, gkey, SEED_X8["BER"], min_blocks)  # NO DATA check on the city's row
    eb = rb.get("estimate")
    eh = rh.get("estimate")
    res: dict = {
        "estimate_ber": eb,
        "estimate_hh": eh,
        "n": (rb.get("n") or 0) + (rh.get("n") or 0),
        "n_clusters": (rb.get("n_clusters") or 0) + (rh.get("n_clusters") or 0),
    }
    if eb is None or eh is None or rb.get("ci_low") is None or rh.get("ci_low") is None:
        res["estimate"] = None
    else:
        db, _ = boot.draws(d_b, gkey, SEED_X8["BER"])
        dh, _ = boot.draws(d_h, gkey, SEED_X8["HH"])
        res.update(x8_delta(db, dh, eb, eh, ctx.n_boot))
    xspec = {
        **spec,
        "op": f"Delta = theta_BER - theta_HH ({spec['estimator']}; {spec['op']}); independent "
        "block bootstraps, BER seed 42 and HH seed 43 (PR §6.3)",
        "estimator": f"diff_{spec['estimator']}",
        "expected_dir": "nondirectional",
        "role": role,
        "family": family,
        "notes": [R7_WORDING, *[n for n in spec["notes"] if n != HH_ACCOMMODATION_NOTE]]
        + ([HH_ACCOMMODATION_NOTE] if _windows_of(hyp) else []),
    }
    row = make_row(
        ctx,
        "BER-HH",
        grain,
        xspec,
        res,
        variant=variant,
        kind=kind,
        gkey=gkey,
        seed="42;43",
        label_prefix=label_prefix,
    )
    row["holds"] = ""
    row["thesis_verdict"] = ""
    row["_kindx"] = "auc" if spec["estimator"] == "oof_auc_logit" else "rho"
    row["_band_years"] = set(band_years)
    # geo readings ruling 8: `n` / `n_clusters` are the sums; the per-city counts go in notes.
    row["notes"].append(
        f"n_BER={rb.get('n') or 0};n_HH={rh.get('n') or 0};"
        f"clusters_BER={rb.get('n_clusters') or 0};clusters_HH={rh.get('n_clusters') or 0}"
    )
    return row


# ---------------------------------------------------------------------------
# Scoring (P354 §5.4-§5.6 with Amendments 2-3; PR §6.3, §6.6, §7.5)
# ---------------------------------------------------------------------------


# A5.2: "X8 gives DIFFERS ... in the >= 5,000 panel" = BH over that panel's 8 X8 rows, NO DATA
# rows not counted in m. A named sensitivity family, outside every confirmatory family.
GE5000_FAMILY = "X8_ge5000"
N1_NOT_TESTED = (
    "could not be tested at this grain (fewer than 20 occupied blocks, PR §6.2 / P354 §5.3); "
    "never 'not supported' (A5, domain O3)"
)


def assert_bh_inputs_sensitivity(rows: Sequence[dict], tag: str) -> None:
    """A5.2: the named >= 5,000 family holds exactly that panel's X8 rows and nothing else."""
    for r in rows:
        assert r.get("_tags") == {tag} and r["role"] == "sensitivity", (  # noqa: S101 -- R-C3
            f"row outside the {tag} X8 panel in the {GE5000_FAMILY} family: {r['hypothesis']}"
        )


def _verdict_matched(r: dict) -> tuple[str, list[str]]:
    if r["_descriptive"]:
        return "", []
    est = r["estimate"]
    if r["city"] == "BER-HH":
        if est is None or r["ci_low"] is None or r["p_boot"] is None:
            return NO_DATA, []
        p = r["p_bh"] if r["family"] in ("X8", GE5000_FAMILY) else r["p_boot"]
        return (DIFFERS if p < ALPHA else NDD), []
    primary = r["family"] in ("T8", "N")
    if r["hypothesis"] in N_HYPOTHESES:
        if est is None or not np.isfinite(est):
            return NO_DATA, []
        if primary:
            if r["p_bh"] is None:
                return NO_DATA, []
            return verdict(est, "negative", p=r["p_bh"]), []
        if r["ci_low"] is None:
            return NO_DATA, []
        return verdict(est, "negative", ci_low=r["ci_low"], ci_high=r["ci_high"]), []
    return S._verdict_for(r, primary)


def score_matched(rows: list[dict]) -> dict:
    """BH within T8 (per city), N-family (per city) and X8; Holm column; verdicts; Holds?."""
    assert_w24_isolated(rows)
    fams = {}
    for city in CITIES:
        t8 = [r for r in rows if r["city"] == city and r["family"] == "T8"]
        assert sorted(r["hypothesis"] for r in t8) == sorted(PRIMARY_ORDER), "T8 is not the 8"  # noqa: S101
        fams[f"T8/{city}"] = t8
        nf = [r for r in rows if r["city"] == city and r["family"] == "N"]
        assert sorted(r["hypothesis"] for r in nf) == ["N1", "N2"], "N-family is not N1, N2"  # noqa: S101
        fams[f"N/{city}"] = nf
    x8 = [r for r in rows if r["family"] == "X8"]
    assert sorted(r["hypothesis"] for r in x8) == sorted(PRIMARY_ORDER), "X8 is not the 8"  # noqa: S101
    fams["X8"] = x8
    for fam in fams.values():
        assert_bh_inputs_primary(fam)
    ge = [r for r in rows if r["family"] == GE5000_FAMILY]
    if ge:
        assert sorted(r["hypothesis"] for r in ge) == sorted(PRIMARY_ORDER), "ge5000 X8 != 8"  # noqa: S101
        assert_bh_inputs_sensitivity(ge, "ge5000")
        fams[GE5000_FAMILY] = ge
    m_used = {}
    for name, fam in fams.items():
        m_used[name] = sum(r["p_boot"] is not None for r in fam)  # NO DATA rows not in m
        pb = bh_adjust([r["p_boot"] for r in fam])
        ph = holm_adjust([r["p_boot"] for r in fam])
        for r, a, b in zip(fam, pb, ph, strict=True):
            r["p_bh"], r["p_holm"] = a, b
    h2_delta = {}
    for city in CITIES:
        inc = [
            r
            for r in rows
            if r["city"] == city
            and r["_variant"] == "primary"
            and r["estimator"] == "delta_auc"
            and r["_kind"] == "sec"
        ]
        h2_delta[city] = None if not inc or inc[0]["ci_low"] is None else bool(inc[0]["ci_low"] > 0)
    for r in rows:
        v, extra = _verdict_matched(r)
        r["verdict"] = v
        r["notes"].extend(extra)
        if any("Amendment 3" in n for n in extra):
            r["flags"].add("amendment3_below_chance")
        if v == NO_DATA and r["estimate"] is not None and r["city"] != "BER-HH":
            r["estimate"], r["effect_label"], r["p_analytic"] = None, "", None
            r["notes"].append(
                "not reported: < 20 blocks"
                if (r["n_clusters"] or 0) < MIN_BLOCKS
                else "not reported: NO DATA"
            )
        if r["family"] == GE5000_FAMILY:
            r["notes"].append(
                f"verdict from BH over the 8 X8 rows of the >= 5,000 panel, m = "
                f"{m_used[GE5000_FAMILY]} (NO DATA rows not counted), A5.2"
            )
        if r["family"] == "N" and v == NO_DATA:
            r["notes"].append(N1_NOT_TESTED)
        if r["family"] in ("T8", "N", "X8") and r["p_bh"] is not None and r["p_bh"] < ALPHA:
            if r["p_holm"] is None or r["p_holm"] >= ALPHA:
                r["notes"].append("significant at FDR 5%; not at family-wise 5%")
        if r["family"] == "T8":
            r["holds"], hn = S.holds_label(r, h2_delta[r["city"]])
            r["notes"].extend(hn)
    return {"h2_delta_excludes_zero": h2_delta, "bh_family_m": m_used}


def _sign(r: dict | None) -> int | None:
    if r is None or r["estimate"] is None or r["estimate"] == "":
        return None
    th = 0.5 if r["estimator"] == "oof_auc_logit" else 0.0
    if r["city"] == "BER-HH":
        th = 0.0
    v = float(r["estimate"]) - th
    return int(np.sign(v)) if np.isfinite(v) else None


# A5.1: the verdict-defined flip flags, compared on the same unadjusted scale. There is no core-1U
# variant (not triggered: HH S5 excludes AsylbLG, DC §3), so core1u_flip cannot fire.
FLIP_SPECS = (
    ("ge5000", "small_units_flip"),
    ("core3m", "core3m_flip"),
    ("core2", "core2_flip"),
    ("W24", "w24_weight_sensitive"),
    ("R19pub", "r19_revision_sensitive"),
)


def _computable(r: dict | None) -> bool:
    return (
        r is not None
        and r["verdict"] != NO_DATA
        and r["estimate"] not in (None, "")
        and r["p_boot"] is not None
    )


def flip_check(r: dict, c: dict | None) -> tuple[bool, str]:
    """A5.1: flag when (a) the sign changes (AUC rows: AUC - 0.5; X8 rows: Delta) or (b) the
    unadjusted significance (block-bootstrap p < 0.05) differs. Both sides unadjusted. A sign
    change between two unadjusted-non-significant estimates is 'sign unstable around zero'.
    Never set when either side is NO DATA (review finding 3)."""
    if c is None:
        return False, ""
    if not _computable(r):
        return False, "primary not computable"
    if not _computable(c):
        why = "< 20 blocks" if (c["n_clusters"] or 0) < MIN_BLOCKS else "NO DATA"
        return False, f"sensitivity not computable ({why})"
    sr, sc = _sign(r), _sign(c)
    gr_, gc = r["p_boot"] < ALPHA, c["p_boot"] < ALPHA
    sign_change, sig_change = sr != sc, gr_ != gc
    if not (sign_change or sig_change):
        return False, ""
    if sign_change and not gr_ and not gc:
        label = "sign unstable around zero"
    elif sign_change and sig_change:
        label = "sign and unadjusted significance change"
    elif sign_change:
        label = "sign change"
    else:
        label = "unadjusted significance change"
    return True, label


def _is_not_comparable(r: dict | None) -> bool:
    return r is not None and any(str(n).startswith("not comparable") for n in r["notes"])


def _window_uses_2023(r: dict) -> bool:
    """Row-level: does the row's status use edition 2023 (the interpolated 31.12.2022 weights)?"""
    if not _uses_2023(r["hypothesis"]):
        return False
    m = re.fullmatch(r"(\d{4})-(\d{4})", str(r.get("window", "")))
    return True if m is None else int(m.group(1)) <= 2023 <= int(m.group(2))


def _below_chance(r: dict) -> list[str]:
    auc = r["estimator"] == "diff_oof_auc_logit"
    return [
        c
        for c, e in (("Berlin", r["estimate_ber"]), ("Hamburg", r["estimate_hh"]))
        if auc and e is not None and e < 0.5
    ]


def apply_flags(rows: list[dict], meta: dict) -> None:
    """PR §9.1 flags (+ A4 rev. 1 tokens) on the primary rows with the A5.1 flip definition, the
    robust-DIFFERS rule (§6.3, D1/D8/D10 with A5.2) and the D6 below-chance reading on X8, and the
    §3.6 divergence note."""
    idx = {}
    for r in rows:
        key = (r["_variant"], r["_kind"], r["_gkey"], r["city"], r["hypothesis"])
        idx.setdefault(key, r)

    def cp(variant: str, r: dict, kind: str | None = None) -> dict | None:
        return idx.get((variant, kind or r["_kind"], "k24", r["city"], r["hypothesis"]))

    for r in rows:  # D6 first: the W2-only note reads it
        if r["city"] == "BER-HH" and _below_chance(r):
            r["flags"].add("amendment3_below_chance")
    prim = [
        r
        for r in rows
        if r["_variant"] == "primary" and r["_kind"] in ("core", "x8") and r["_gkey"] == "k24"
    ]
    for r in prim:
        hyp, city = r["hypothesis"], r["city"]
        for var, flag in FLIP_SPECS:
            c = cp(var, r)
            if c is None:
                continue
            if r["p_boot"] is not None:
                c["notes"].append(f"primary_p_unadj={r['p_boot']:.6g}")
            hit, label = flip_check(r, c)
            if hit:
                r["flags"].add(flag)
                r["notes"].append(
                    f"{flag}: {label} (primary p_unadj {r['p_boot']:.4g}, sign {_sign(r):+d}; "
                    f"{var} p_unadj {c['p_boot']:.4g}, sign {_sign(c):+d}; A5.1)"
                )
            elif label.startswith("sensitivity not computable"):
                r["notes"].append(f"{flag} not evaluated: {label}")
        c = cp("fine", r)
        if hyp in ("H1", "H2") and _is_not_comparable(c):
            r["notes"].append("MAUP: not comparable (§6.5)")
        elif (
            c is not None and _sign(c) is not None and _sign(r) is not None and _sign(c) != _sign(r)
        ):
            r["flags"].add("maup_flip")
        if city != "BER-HH" and hyp in ("H3a", "H3b", "H3c"):
            for kind, flag in (
                ("diag:mapping", "mapping_driven"),
                ("diag:popgrowth", "popgrowth_driven"),
            ):
                c = idx.get(("primary", kind, "k24", city, hyp))
                if (
                    c is not None
                    and _sign(c) is not None
                    and _sign(r) is not None
                    and _sign(c) != _sign(r)
                ):
                    r["flags"].add(flag)
        if city == "BER-HH" and hyp in ("H2", "H3c"):
            sig, rows_w = {}, {}
            for s_, e_ in WINDOWS:
                c = idx.get(("primary", f"x8win:{s_}-{e_}", "k24", "BER-HH", hyp))
                rows_w[(s_, e_)] = c
                sig[(s_, e_)] = (
                    c is not None
                    and c["ci_low"] is not None
                    and (c["ci_low"] > 0 or c["ci_high"] < 0)
                )
            if sig.get((2021, 2023)) and not sig.get((2019, 2021)) and not sig.get((2023, 2025)):
                r["flags"].add("w2_only")
                note = "coincides with the Rechtskreiswechsel asymmetry (W2 only, PR §4.4)"
                w2 = rows_w[(2021, 2023)]
                if w2 is not None and "amendment3_below_chance" in w2["flags"]:
                    below = " and ".join(_below_chance(w2))
                    note += (
                        f", and in W2 {below} shows no transferable discrimination: it differs in "
                        "transferable discrimination only (Amendment 3, D6)"
                    )
                r["notes"].append(note)
    # ewr_2022_interpolated on every Berlin / X8 row whose status used the 2022 interpolation.
    for r in rows:
        if r["city"] in ("BER", "BER-HH") and r.get("_band_years") and 2022 in r["_band_years"]:
            if _window_uses_2023(r):
                r["flags"].add("ewr_2022_interpolated")
    # X8 reading rules (PR §6.3).
    statement = {}
    for r in [x for x in rows if x["city"] == "BER-HH"]:
        auc = r["estimator"] == "diff_oof_auc_logit"
        below = _below_chance(r)
        if r["verdict"] == NDD and r["mdd"] is not None:
            thr = MDD_IMPRECISE["auc" if auc else "rho"]
            if r["mdd"] > thr:
                r["notes"].append(
                    f"too imprecise to say the cities agree (MDD {r['mdd']:.3f} > {thr:.2f})"
                )
        if r["family"] != "X8":
            continue
        c5, c2, c3 = cp("ge5000", r), cp("core2", r), cp("core3m", r)
        statement[r["hypothesis"]] = {
            "x8_verdict": r["verdict"],
            "ge5000_bh_verdict": None if c5 is None else c5["verdict"],
            "core2_same_sign_ci_excl_0": None
            if c2 is None
            else bool(
                c2["ci_low"] is not None
                and _sign(c2) == _sign(r)
                and (c2["ci_low"] > 0 or c2["ci_high"] < 0)
            ),
            "core3m_same_sign": None if c3 is None else bool(_sign(c3) == _sign(r)),
            "below_chance": below,
            "outcome": "not applicable (no DIFFERS)",
        }
        if r["verdict"] != DIFFERS:
            continue
        if below:
            statement[r["hypothesis"]]["outcome"] = "not stated (D6)"

            r["flags"].add("not_stated_city_difference")
            r["notes"].append(
                f"differs in transferable discrimination: {' and '.join(below)} shows none "
                "(Amendment 3); never stated as a city difference (D6)"
            )
            continue
        fails = []
        c = cp("ge5000", r)
        if c is None or c["verdict"] != DIFFERS:
            fails.append("not DIFFERS after BH in the >= 5,000-resident panel (A5.2)")
        c = cp("core2", r)
        ok2 = (
            c is not None
            and c["ci_low"] is not None
            and _sign(c) == _sign(r)
            and (c["ci_low"] > 0 or c["ci_high"] < 0)
        )
        if not ok2:
            fails.append("core-2 (T-free) Delta not same-signed with a 95% CI excluding 0")
        c = cp("core3m", r)
        if c is None or _sign(c) != _sign(r):
            fails.append("core-3M Delta not same-signed")
        statement[r["hypothesis"]]["outcome"] = "not stated" if fails else "stated"
        if fails:
            r["flags"].add("not_stated_city_difference")
            r["notes"].append(
                "differs only under the primary core-3H at all units ("
                + "; ".join(fails)
                + "); not stated as a city difference (robust-DIFFERS rule, PR §6.3)"
            )
        else:
            r["notes"].append(
                "robust-DIFFERS rule met (PR §6.3: DIFFERS under core-3H and in the >= 5,000 "
                "panel, same-signed core-2 Delta with CI excluding 0, same-signed core-3M Delta); "
                "states only that the within-city association differs at the harmonised construct "
                "and matched grain"
            )
    meta["statement_rule"] = statement
    # PR §3.6: thresholds failed -> every finding of that city carries the divergence note.
    for city, txt in meta.get("validity_divergence", {}).items():
        for r in rows:
            if r["city"] in (city, "BER-HH"):
                r["notes"].append(txt)


# ---------------------------------------------------------------------------
# Orchestration
# ---------------------------------------------------------------------------


# Geo readings ruling 8: the `outcome` column carries the §9.1 tokens with these suffixes.
OUTCOME_SUFFIXES = {
    " > 0": "binary target of an AUC row (H1: K_2025 > 0; H2: dK_W > 0)",
    "@P": "the change over the predictor window P (cross-lag rows)",
    "@F": "the change over the following window F (cross-lag rows)",
    "@W": "the change over the same window W (H3c rows)",
    "_core3m / _core2": "status_construct of a construct sensitivity (§9.1)",
}
FAMILY_DOC = {
    "T8": "per city, the 8 thesis primaries, BH (P354 §5.5)",
    "N": "per city, N1 and N2, BH within the pair (PR §7.5); NO DATA rows not counted in m",
    "X8": "the 8 city differences, BH (PR §6.3)",
    GE5000_FAMILY: "sensitivity family: the 8 X8 rows of the >= 5,000-resident panel, BH with NO "
    "DATA rows not counted in m; used only for the statement rule (A5.2); outside every "
    "confirmatory family",
    "none": "every other row: uncorrected (PR §0, §7.5)",
}
# A5-7 / geo readings ruling 9: what was run before the binding run, and the two later fixes.
# The fix evidence compares the result CSVs of the pre-fix code (0fb5fb00, 8e2e9b4d) with 332a64f6
# at B = 49 (point estimates and n do not depend on B), column by column over all 492 rows.
DISCLOSURES = {
    "debug_runs": [
        {"date": "2026-11-05", "B": 29, "code": "uncommitted pre-0fb5fb00 working tree", "runs": 2},
        {"date": "2026-11-05", "B": 99, "code": "uncommitted pre-0fb5fb00 working tree", "runs": 1},
        {"date": "2026-11-05", "B": 49, "code": "332a64f6", "runs": 2},
        {
            "date": "2026-11-05",
            "B": 1999,
            "code": "0fb5fb00 (superseded, not committed)",
            "runs": 1,
        },
    ],
    "later_fixes": {
        "8e2e9b4d": "Hamburg protection-zone cover read the EPSG:25832 zone WKB as is (was "
        "transformed twice, giving zero cover); descriptive context only",
        "332a64f6": "PR §6.5 'not comparable' note on H1/H2 where no commercial category "
        "survives (fine grain); note text only",
    },
    "fix_evidence": {
        "method": "result CSV of 0fb5fb00 and of 8e2e9b4d vs 332a64f6, all at B = 49, compared "
        "column by column over all 492 rows",
        "rows_differing": {
            "estimate": 0,
            "n": 0,
            "ci_low": 0,
            "ci_high": 0,
            "p_boot": 0,
            "verdict": 0,
            "flags": 0,
            "operationalisation": 0,
            "notes": 10,
        },
        "notes_rows": "the 10 fine-grain H1/H2 rows (city and X8, incl. fine_W24) that gained the "
        "§6.5 'not comparable' note in 332a64f6",
        "sha256_16_of_estimate_and_n": {
            "0fb5fb00": "964b2f7f828e97b3",
            "8e2e9b4d": "964b2f7f828e97b3",
            "332a64f6": "964b2f7f828e97b3",
        },
        "metadata": "8e2e9b4d changes only protection_share_2024 (Hamburg: 0 -> the zone cover)",
    },
}


def prefit_features(grains: dict[str, Grain]) -> dict:
    """PR §5 / §8.4 / A1.1: per city, the categories (and domains) whose min-base flag is unset in
    >= 20% of the design rows -- H1 on the 2025 snapshot, H2 on the window-start snapshots
    jointly -- then the intersection of the two cities, sorted. Flags only, never an outcome."""
    per = {}
    for c, gr in grains.items():
        u = gr.units
        f1 = gr.oa_wide[H1_EDITION].reindex(u)
        f2 = pd.concat([gr.oa_wide[s].reindex(u) for s, _e in WINDOWS], ignore_index=True)
        per[c] = {
            "H1_cat": S.fixed_feature_list(f1, "cat"),
            "H1_dom": S.fixed_feature_list(f1, "dom"),
            "H2_cat": S.fixed_feature_list(f2, "cat"),
            "H2_dom": S.fixed_feature_list(f2, "dom"),
        }
    common = {
        k: sorted(set(per["BER"][k]) & set(per["HH"][k]))
        for k in ("H1_cat", "H1_dom", "H2_cat", "H2_dom")
    }
    return {"per_city": per, "common": common}


def _side_variant(v: Variant, city: str) -> str:
    """Which variant's designs stand in for a city that the variant does not change."""
    explicit = {"core3m_R19pub": {"BER": "core3m", "HH": "R19pub"}, "fine_W24": {"HH": "fine"}}
    if city in explicit.get(v.key, {}):
        return explicit[v.key][city]
    if city in v.cities:
        return v.key
    return "fine" if v.grain == "fine" else "primary"


def run_matched(con, n_boot: int, sha: str, metadata_path: Path | None) -> tuple[list[dict], dict]:
    con.execute("LOAD spatial")
    assert_single_berlin_pop(SQL.values())
    raws = {c: load_city(con, c) for c in CITIES}
    for c in CITIES:
        assert_lq_reproduces_panel(raws[c].oa)
    grains = {c: build_grain(raws[c], "matched") for c in CITIES}
    fine = {c: build_grain(raws[c], "fine", grains[c].groups) for c in CITIES}
    pgr = build_grain(raws["BER"], "pgr")
    feats_m = prefit_features(grains)
    feats_f = prefit_features(fine)
    meta: dict = {
        "feature_lists_prefit": {"matched": feats_m, "fine": feats_f},
        "blocks": {
            c: {
                g: dict(zip(grains[c].groups.index, grains[c].groups[g], strict=True))
                for g in ("k24", "k16", "k36", "bezirk")
            }
            for c in CITIES
        },
    }
    if metadata_path is not None:
        # PR §6.2 / §8.4: block assignment and fixed feature lists written before any outcome
        # value is loaded and before any fit.
        write_matched_metadata(metadata_path, {"prefit": meta}, replace_all=True)
    for c in CITIES:
        load_status(con, raws[c])
    ctx = Ctx(n_boot=n_boot, sha=sha, boot=Bootstrapper(n_boot))
    designs: dict[tuple[str, str], dict] = {}
    builders: dict[tuple[str, str], Builder] = {}
    statuses: dict[tuple[str, str], Status] = {}

    def run_variant(v: Variant):
        for c in CITIES:
            if c not in v.cities and v.key != "primary":
                continue
            gr = fine[c] if v.grain == "fine" else grains[c]
            st = make_status(raws[c], gr, v)
            feats = (feats_f if v.grain == "fine" else feats_m)["common"]
            b = Builder(gr, st, feats)
            builders[(v.key, c)] = b
            statuses[(v.key, c)] = st
            designs[(v.key, c)] = b.core(v.hyps)
            for hyp in [h for h in PRIMARY_ORDER + N_ORDER if h in v.hyps]:
                spec, d = designs[(v.key, c)][hyp]
                row = make_row(
                    ctx,
                    c,
                    gr.name,
                    spec,
                    ctx.boot.infer(d),
                    variant=v,
                    kind="core",
                    label_prefix="" if v.key == "primary" else f"[{v.key}] ",
                )
                row["_band_years"] = set(st.info.get("band_years", set()))
                row["_design"] = d
        for hyp in [h for h in PRIMARY_ORDER if h in v.hyps]:
            sb = designs[(_side_variant(v, "BER"), "BER")][hyp]
            sh = designs[(_side_variant(v, "HH"), "HH")][hyp]
            row = x8_row(
                ctx,
                hyp,
                sb[0],
                sb[1],
                sh[1],
                variant=v,
                kind="x8",
                role="interaction" if v.key == "primary" else "sensitivity",
                family="X8" if v.key == "primary" else "none",
                label_prefix="" if v.key == "primary" else f"[{v.key}] ",
                grain=f"{(fine if v.grain == 'fine' else grains)['BER'].name};"
                f"{(fine if v.grain == 'fine' else grains)['HH'].name}",
                band_years=ber_years(_side_variant(v, "BER")),
            )
            if v.key == "ge5000":
                row["family"] = GE5000_FAMILY  # A5.2: BH within the >= 5,000 panel's X8

    def ber_years(variant_key: str) -> set:
        stb = statuses.get((variant_key, "BER"))
        return set(stb.info.get("band_years", set())) if stb else set()

    run_variant(PRIMARY)
    drop_sets: dict = {}
    # P354 §5.2 secondaries at the matched grain (primary run only).
    for c in CITIES:
        b = builders[("primary", c)]
        for spec, d in b.secondaries():
            row = make_row(
                ctx, c, grains[c].name, spec, ctx.boot.infer(d), variant=PRIMARY, kind="sec"
            )
            row["_band_years"] = set(statuses[("primary", c)].info["band_years"])
        # PR §5 C5 mapping-completeness and R5/E7 population-growth diagnostics.
        gr = grains[c]
        for kind, series, label in (
            ("diag:mapping", gr.poigrowth, "OSM total-POI growth 2019-2025"),
            ("diag:popgrowth", gr.popgrowth, "population growth 31.12.2018-31.12.2024"),
        ):
            drop = top_decile(series, gr.units)
            drop_sets[f"{c}/{kind}"] = {"basis": label, "units": sorted(drop)}
            for hyp in ("H3a", "H3b", "H3c"):
                spec, d = b.diagnostic(hyp, drop, label)
                row = make_row(ctx, c, gr.name, spec, ctx.boot.infer(d), variant=PRIMARY, kind=kind)
                row["notes"].append(f"dropped units: {', '.join(sorted(drop))}")
                row["_band_years"] = set(statuses[("primary", c)].info["band_years"])
    # N1 / N2 / N3 city differences (PR §7.5: exploratory, uncorrected).
    for hyp in N_ORDER:
        sb = designs[("primary", "BER")][hyp]
        sh = designs[("primary", "HH")][hyp]
        x8_row(
            ctx,
            hyp,
            sb[0],
            sb[1],
            sh[1],
            variant=PRIMARY,
            kind="xN",
            role="exploratory",
            family="none",
            band_years=ber_years("primary"),
        )
    # Per-window X8 for H2 / H3c (w2_only flag, PR §4.4).
    for hyp in ("H2", "H3c"):
        per = {}
        for c in CITIES:
            b = builders[("primary", c)]
            per[c] = window_designs(b, hyp)
        for s, e in WINDOWS:
            sb = per["BER"][(s, e)]
            sh = per["HH"][(s, e)]
            x8_row(
                ctx,
                hyp,
                sb[0],
                sb[1],
                sh[1],
                variant=PRIMARY,
                kind=f"x8win:{s}-{e}",
                role="exploratory",
                family="none",
                band_years=ber_years("primary"),
            )
    # PR §6.2 inference sensitivities (G = 16 / 36, iid, Bezirk) on the primary designs.
    for gkey, _cu in INFERENCE_SENS:
        for c in CITIES:
            for hyp in (*PRIMARY_ORDER, "N1", "N2"):
                spec, d = designs[("primary", c)][hyp]
                row = make_row(
                    ctx,
                    c,
                    grains[c].name,
                    spec,
                    ctx.boot.infer(d, gkey, SEED, INFERENCE_FLOOR[gkey]),
                    variant=PRIMARY,
                    kind="core",
                    gkey=gkey,
                    label_prefix=f"[{gkey}] ",
                )
                row["role"], row["family"] = "sensitivity", "none"
                row["_band_years"] = set(statuses[("primary", c)].info["band_years"])
        for hyp in PRIMARY_ORDER:
            sb = designs[("primary", "BER")][hyp]
            sh = designs[("primary", "HH")][hyp]
            x8_row(
                ctx,
                hyp,
                sb[0],
                sb[1],
                sh[1],
                variant=PRIMARY,
                kind="x8",
                role="sensitivity",
                family="none",
                gkey=gkey,
                min_blocks=INFERENCE_FLOOR[gkey],
                label_prefix=f"[{gkey}] ",
                band_years=ber_years("primary"),
            )
    for v in VARIANTS:
        run_variant(v)
    # PR §6.5: Berlin BZR vs PGR for H1a-c and H3c (reported; descriptive, no CI).
    pgr_rows(ctx, raws["BER"], pgr, feats_m["common"])
    extra = checks_and_context(raws, grains, fine, statuses, builders, ctx)
    meta.update(extra)
    meta["diagnostic_drop_sets"] = drop_sets  # geo readings ruling 6
    meta["ge5000_population_dates"] = {  # geo readings ruling 6 / A4.1
        "BER": "31.12.2024, int_berlin_ewr_age_bands_plr2021.residents_total, balanced child PLRs",
        "HH": "edition 2025 Sozialmonitoring population (31.12.2024), balanced Gebiete",
        "n_units_kept": {c: int((grains[c].pop24 >= MIN_UNIT_POP).sum()) for c in CITIES},
    }
    meta["dropped_berlin_plr"] = {  # A5-5 / geo readings ruling 7
        "n_lor2021_plr": raws["BER"].pre["n_plr_lor2021"],
        "n_balanced": len(raws["BER"].balanced),
        "dropped": raws["BER"].pre["dropped_plr"],
    }
    meta["prereg_inputs"] = {
        "later_edition_level_inputs": {
            f"{k[0]} {k[1]} {k[2]} from {k[3]}": v for k, v in PERMITTED_LATER_INPUTS.items()
        },
        "interpolated_inputs": {
            f"{k[0]} {k[1]} {k[2]}": v for k, v in PERMITTED_PREREG_INPUTS.items()
        },
        "note": "The M3 interpolation is a pre-registered input (PM decision M3); the geo-DS "
        "confirms it in the results sign-off (review finding 8).",
    }
    meta["outcome_suffixes"] = OUTCOME_SUFFIXES
    meta["families"] = FAMILY_DOC
    meta["disclosures"] = DISCLOSURES
    sc = score_matched(ctx.rows)
    meta.update(sc)
    apply_flags(ctx.rows, meta)
    meta["coefficients"] = {
        f"{c}/{hyp}": designs[("primary", c)][hyp][1].extra.get("coefs")
        for c in CITIES
        for hyp in ("H1", "H2")
        if designs[("primary", c)][hyp][1] is not None
    }
    meta["fold_auc"] = {
        f"{c}/{hyp}": designs[("primary", c)][hyp][1].extra.get("fold_auc")
        for c in CITIES
        for hyp in ("H1", "H2")
        if designs[("primary", c)][hyp][1] is not None
    }
    return ctx.rows, meta


def window_designs(b: Builder, hyp: str) -> dict[tuple[int, int], tuple[dict, Design | None]]:
    """Per-window primary designs (same estimator) for the W2-only check (PR §4.4)."""
    out = {}
    if hyp == "H3c":
        wf = b.wf
        for s, e in WINDOWS:
            m = (wf["w_end"] == e).to_numpy()
            spec = b.spec(
                "H3c",
                f"H3c window {s}-{e} only",
                "spearman",
                predictor="g_commercial_c5@W",
                outcome=f"{b.out_dk}@W",
                window=f"{s}-{e}",
                notes=b.notes_for(((s, e),), False),
            )
            out[(s, e)] = (
                spec,
                rho_design(
                    wf.loc[m, "g_commercial_c5"], wf.loc[m, "dK"], [], b.groups(wf.loc[m, "unit"])
                ),
            )
    else:
        h2 = b.h2_frame()
        x2 = S.oa_features(h2, b.feats["H2_cat"], "cat")
        y2 = (h2["dK"] > 0).astype(int)
        g2 = b.groups(h2["unit"])
        for s, e in WINDOWS:
            m = (h2["w_end"] == e).to_numpy()
            spec = b.spec(
                "H2",
                f"H2 window {s}-{e} only",
                "oof_auc_logit",
                predictor="common category OA @window start",
                outcome=f"{b.out_dk} > 0",
                window=f"{s}-{e}",
                notes=b.notes_for(((s, e),), False),
            )
            out[(s, e)] = (spec, auc_design(x2[m], y2[m], g2[m].reset_index(drop=True)))
    return out


def pgr_rows(ctx: Ctx, raw: CityRaw, gr: Grain, feats: dict) -> None:
    st = make_status(raw, gr, PRIMARY)
    b = Builder(gr, st, feats)
    core = b.core({"H1a", "H1b", "H1c", "H3c"})
    for hyp in ("H1a", "H1b", "H1c", "H3c"):
        spec, d = core[hyp]
        spec = {
            **spec,
            "role": "sensitivity",
            "family": "none",
            "descriptive": True,
            "notes": [
                *spec["notes"],
                "Berlin BZR vs PGR check (PR §6.5; Openshaw 1984; Fotheringham & Wong 1991): "
                "point estimate only, no CI or verdict",
            ],
        }
        row = make_row(
            ctx,
            "BER",
            gr.name,
            spec,
            {
                "estimate": None if d is None else d.estimate,
                "n": 0 if d is None else d.n,
                "n_clusters": 0,
            },
            variant=PRIMARY,
            kind="pgr",
            label_prefix="[PGR] ",
        )
        row["cluster_unit"] = "none"
        row["_band_years"] = set(st.info.get("band_years", set()))


# ---------------------------------------------------------------------------
# Checks, validity, context and diagnostics (PR §2.1, §3.3, §3.6, §4.2, §5, §6.2, §7.4, §9.2)
# ---------------------------------------------------------------------------


def _desc_row(ctx: Ctx, city: str, grain: str, role: str, op: str, est, n: int, notes=(), hyp="K"):
    spec = {
        "hyp": hyp,
        "role": role,
        "family": "none",
        "op": op,
        "predictor": "",
        "outcome": "",
        "controls": "",
        "estimator": "spearman",
        "expected_dir": "",
        "window": "",
        "pivots": "",
        "level_control": "none",
        "notes": list(notes),
        "descriptive": True,
    }
    row = make_row(
        ctx,
        city,
        grain,
        spec,
        {"estimate": est, "n": n, "n_clusters": None},
        variant=PRIMARY,
        kind=role,
    )
    row["cluster_unit"] = "none"
    row["effect_label"] = ""
    return row


def _rho(a: pd.Series, b: pd.Series) -> tuple[float | None, int]:
    j = pd.concat([a.rename("a"), b.rename("b")], axis=1).dropna()
    if len(j) < 3:
        return None, len(j)
    return float(stats.spearmanr(j["a"], j["b"]).statistic), len(j)


def _q5(v: pd.Series) -> dict:
    v = v.dropna().astype(float)
    if v.empty:
        return {}
    q = np.quantile(v, [0, 0.25, 0.5, 0.75, 1])
    return {
        "n": int(len(v)),
        "min": float(q[0]),
        "q1": float(q[1]),
        "median": float(q[2]),
        "q3": float(q[3]),
        "max": float(q[4]),
        "total": float(v.sum()),
    }


def _rank_resid(y: np.ndarray, xs: Sequence[np.ndarray]) -> np.ndarray:
    ry = stats.rankdata(y)
    design = np.column_stack([np.ones(len(y)), *[stats.rankdata(x) for x in xs]])
    return ry - design @ np.linalg.lstsq(design, ry, rcond=None)[0]


def moran_diagnostics(c: str, gr: Grain, b: Builder) -> list[dict]:
    """PR §6.2 (#365 on the matched panel): global Moran's I of the H3 residuals on the queen
    weights (esda, permutations = 999, seed 42), and Moran's I between block-mean residuals on
    the contiguity of the k = 24 blocks. Residual = rank-regression residual of the outcome on
    the predictor and the controls (the linear model behind the partial Spearman)."""
    import libpysal.weights as lw
    from esda import Moran
    from shapely import union_all

    blocks = gr.groups["k24"]
    bnames = sorted(set(blocks))
    bgeoms = [union_all([gr.geoms[u] for u in gr.units if blocks[u] == bn]) for bn in bnames]
    wb = lw.Queen.from_iterable(bgeoms, ids=bnames)
    wb.transform = "r"
    out = []
    cl, wf = b.cl, b.wf
    cases = []
    for pv in PIVOTS:
        m = cl[cl["pivot"] == pv]
        cases.append(("H3a", f"pivot {pv}", m, "dK_F", ["g_commercial_c5_P", "dK_P", "K_pivot"]))
        cases.append(
            ("H3b", f"pivot {pv}", m, "g_commercial_c5_F", ["dK_P", "g_commercial_c5_P", "K_start"])
        )
    for s, e in WINDOWS:
        m = wf[wf["w_end"] == e]
        cases.append(("H3c", f"window {s}-{e}", m, "dK", ["g_commercial_c5"]))
    for hyp, where, frame, ycol, xcols in cases:
        f = frame.dropna(subset=[ycol, *xcols])
        res = _rank_resid(f[ycol].to_numpy(float), [f[x].to_numpy(float) for x in xcols])
        ids = list(f["unit"])
        wsub = lw.w_subset(gr.w, ids)
        wsub.transform = "r"
        np.random.seed(SEED)  # esda.Moran has no per-call seed (a9_spatial_dynamic convention)
        mi = Moran(res, wsub, permutations=MORAN_PERMUTATIONS)
        bm = pd.Series(res, index=ids).groupby(blocks.reindex(ids).to_numpy()).mean()
        bm = bm.reindex(bnames)
        okb = bm.notna()
        wbs = lw.w_subset(wb, list(bm.index[okb]))
        wbs.transform = "r"
        np.random.seed(SEED)
        mb = Moran(bm[okb].to_numpy(float), wbs, permutations=MORAN_PERMUTATIONS)
        out.append(
            {
                "city": c,
                "hypothesis": hyp,
                "where": where,
                "n": len(ids),
                "moran_I": float(mi.I),
                "p_sim": float(mi.p_sim),
                "block_moran_I": float(mb.I),
                "block_p_sim": float(mb.p_sim),
            }
        )
    return out


def checks_and_context(raws, grains, fine, statuses, builders, ctx: Ctx) -> dict:
    meta: dict = {"validity": [], "validity_divergence": {}}
    st_f = {c: make_status(raws[c], fine[c], PRIMARY) for c in CITIES}
    # -- PR §3.6 validity ---------------------------------------------------------
    rb = raws["BER"]
    lv = rb.status["levels"]
    ch = rb.status["changes"]
    fails: dict[str, list[str]] = {"BER": [], "HH": []}
    for e in (2021, 2023, 2025):
        sub = lv.xs(e, level="edition")[["S1", "S3", "S4"]].dropna()
        s354 = sub.apply(zscore).mean(axis=1)  # the #354 S composite (P354 §3.2)
        k = st_f["BER"].K.xs(e, level="edition")["K"]
        r, n = _rho(k, s354)
        ok = r is not None and r >= 0.90
        meta["validity"].append(
            {"check": "BER level", "edition": e, "rho": r, "n": n, "threshold": 0.90, "pass": ok}
        )
        _desc_row(
            ctx,
            "BER",
            "plr_2021",
            "validity",
            f"§3.6 BER level: Spearman(K at PLR, #354 S composite), edition {e}",
            r,
            n,
            [
                f"threshold 0.90: {'pass' if ok else 'FAIL'}",
                "near-tautological by construction (R6): a pass shows the aggregation code is correct",
            ],
        )
        if not ok:
            fails["BER"].append(f"level {e} rho = {r:.3f}" if r is not None else f"level {e} n/a")
    for s, e in WINDOWS[1:]:
        sub = ch.xs(e, level="edition")[["D1", "D3", "D4"]].dropna()
        d354 = sub.apply(zscore).mean(axis=1)
        dk = st_f["BER"].dK.xs(e, level="w_end")["dK"]
        r, n = _rho(dk, d354)
        ok = r is not None and r >= 0.80
        meta["validity"].append(
            {
                "check": "BER change",
                "window": f"{s}-{e}",
                "rho": r,
                "n": n,
                "threshold": 0.80,
                "pass": ok,
            }
        )
        _desc_row(
            ctx,
            "BER",
            "plr_2021",
            "validity",
            f"§3.6 BER change: Spearman(dK at PLR, #354 D composite), window {s}-{e}",
            r,
            n,
            [f"threshold 0.80: {'pass' if ok else 'FAIL'}"],
        )
        if not ok:
            fails["BER"].append(f"change {s}-{e} rho = {r:.3f}" if r is not None else "change n/a")
    rh = raws["HH"]
    wide = rh.status["wide"]
    for e in EDITIONS:
        k = st_f["HH"].K.xs(e, level="edition")["K"]
        r, n = _rho(k, wide.xs(e, level="edition")["status_summe"])
        ok = r is not None and r >= 0.80
        meta["validity"].append(
            {"check": "HH level", "edition": e, "rho": r, "n": n, "threshold": 0.80, "pass": ok}
        )
        _desc_row(
            ctx,
            "HH",
            "hh_gebiet",
            "validity",
            f"§3.6 HH level: Spearman(K at Gebiet, annex Status-summe), edition {e}",
            r,
            n,
            [f"threshold 0.80: {'pass' if ok else 'FAIL'}"],
        )
        if not ok:
            fails["HH"].append(f"level {e} rho = {r:.3f}" if r is not None else f"level {e} n/a")
    for key, v in (
        ("R19", PRIMARY),
        ("R19pub", replace(PRIMARY, key="R19pub", hh_s3_2019="R19pub")),
    ):
        stv = st_f["HH"] if key == "R19" else make_status(rh, fine["HH"], v)
        for s, e in WINDOWS:
            dk = stv.dK.xs(e, level="w_end")["dK"]
            r, n = _rho(dk, wide.xs(e, level="edition")["dynamik_summe"])
            meta["validity"].append(
                {
                    "check": f"HH change ({key})",
                    "window": f"{s}-{e}",
                    "rho": r,
                    "n": n,
                    "threshold": None,
                    "pass": None,
                }
            )
            _desc_row(
                ctx,
                "HH",
                "hh_gebiet",
                "validity",
                f"§3.6 HH change ({key}): Spearman(dK_W at Gebiet, 3-year Dynamik-summe of edition {e}), window {s}-{e}",
                r,
                n,
                [
                    "reported, no threshold (the windows differ); A4 rev. 1 E2: under R19 and R19-pub"
                ],
            )
    for c in CITIES:
        raw, gr, st = raws[c], grains[c], statuses[("primary", c)]
        cls = raw.classes.set_index(["area_code", "edition"])["status_index"].astype(float)
        child, _info = child_status(raw, PRIMARY)
        for e in sorted(set(raw.classes["edition"])):
            ce = cls.xs(e, level="edition")
            w = child.xs(e, level="edition")["wT"]
            g = pd.Series({u: gr.parent[u] for u in raw.balanced})
            cw = weighted_mean(ce.reindex(g.index), w.reindex(g.index), g)
            r, n = _rho(st.K.xs(e, level="edition")["K"], cw)
            meta["validity"].append(
                {
                    "check": f"{c} K vs own classes (matched)",
                    "edition": int(e),
                    "rho": r,
                    "n": n,
                    "threshold": None,
                    "pass": None,
                }
            )
            _desc_row(
                ctx,
                c,
                gr.name,
                "validity",
                f"§3.6 Spearman(K, population-weighted mean of the own index's status class), edition {e}",
                r,
                n,
                ["reported, no threshold"],
            )
    for e in EDITIONS:
        chb = child_status(rb, PRIMARY)[0].xs(e, level="edition")
        r, n = _rho(chb["Tstar"], chb["T3M"])
        meta["validity"].append(
            {
                "check": "BER rho(T*, S3) at PLR",
                "edition": e,
                "rho": r,
                "n": n,
                "threshold": None,
                "pass": None,
            }
        )
    for c, fl in fails.items():
        if fl:
            meta["validity_divergence"][c] = (
                f"the harmonised core diverges from {CITY[c].label}'s own index ({'; '.join(fl)}); "
                "the domain expert decides whether the H1 family may be shown publicly (PR §3.6)"
            )
    # -- PR §4.2 Berlin backcast check ------------------------------------------------
    pre = rb.context["mss_2019_pre"].pivot_table(
        index="area_code", columns="indicator", values="indicator_value"
    )
    pre = pre.rename(columns=BER_CODE)
    xw = rb.context["xwalk"].set_index("plr_id_2021")["plr_id_pre2021"]
    p18 = _band_pop(rb, 2018)
    g = pd.Series({u: grains["BER"].parent[u] for u in rb.balanced})
    back = lv.xs(2019, level="edition").reindex(g.index)
    meta["backcast_check"] = []
    for ind in ("S1", "S3", "S4"):
        cw = pre[ind].reindex(xw.reindex(g.index).to_numpy())
        cw.index = g.index
        a = weighted_mean(back[ind], p18.reindex(g.index), g)
        bb = weighted_mean(cw, p18.reindex(g.index), g)
        r, n = _rho(a, bb)
        meta["backcast_check"].append(
            {
                "indicator": ind,
                "grain": "BZR",
                "rho": r,
                "n": n,
                "threshold": 0.90,
                "pass": r is not None and r >= 0.90,
            }
        )
    for e in (2023, 2025):
        for ind, dcol in (("S1", "D1"), ("S3", "D3"), ("S4", "D4")):
            a = lv.xs(e, level="edition")[ind] - lv.xs(e - 2, level="edition")[ind]
            r, n = _rho(
                a.reindex(rb.balanced), ch.xs(e, level="edition")[dcol].reindex(rb.balanced)
            )
            meta["backcast_check"].append(
                {
                    "indicator": f"{ind}_{e} - {ind}_{e - 2} vs {dcol}_{e}",
                    "grain": "PLR",
                    "rho": r,
                    "n": n,
                    "threshold": 0.95,
                    "pass": r is not None and r >= 0.95,
                }
            )
    # -- PR §3.3 annex recovery checks (descriptive repeat of DC §2) --------------------
    an = rh.status["annex_long"]
    rec = []
    for (e, ind), gg in an[an["indicator"].isin(HH_CORE) & an["edition"].isin(EDITIONS)].groupby(
        ["edition", "indicator"], sort=True
    ):
        z = gg["z_score"].dropna()
        sh = gg["share"].dropna()
        rec.append(
            {
                "edition": int(e),
                "indicator": ind,
                "n": int(len(z)),
                "mean_z": float(z.mean()),
                "sd_z": float(z.std(ddof=0)),
                "share_min": float(sh.min()),
                "share_max": float(sh.max()),
                "n_outside": int(((sh < -0.5) | (sh > 100.5)).sum()),
                "z_precision": str(gg["z_precision"].iloc[0]),
                "moments_precision": str(gg["moments_precision"].iloc[0]),
            }
        )
    meta["annex_recovery"] = rec
    # -- PR §2.1 grain distributions and §5 min-base table -----------------------------
    gd = {}
    for c in CITIES:
        raw, gr = raws[c], grains[c]
        ga = raw.geom_children.set_index("area_code")["area_km2"]
        ua = raw.geom_units.set_index("area_code")["area_km2"]
        pc = _band_pop(raw, 2024) if c == "BER" else _hh_pop(raw, 2025)
        gd[c] = {
            "child_area_km2": _q5(ga.reindex(raw.balanced)),
            "unit_area_km2": _q5(ua.reindex(gr.units)),
            "child_pop_2024": _q5(pc.reindex(raw.balanced)),
            "unit_pop_2024": _q5(gr.pop24),
            "n_units_lt_5000": int((gr.pop24 < MIN_UNIT_POP).sum()),
            "n_single_child_units": int((pd.Series(gr.parent).value_counts() == 1).sum()),
        }
    meta["grain_distribution"] = gd
    mb = {}
    for c in CITIES:
        for kind, gr in (("matched", grains[c]), ("fine", fine[c])):
            for y in SNAPSHOTS:
                if kind == "fine" and y != H1_EDITION:
                    continue
                w = gr.oa_wide[y].reindex(gr.units)
                mb[f"{c}/{kind}/{y}"] = {
                    d: float(
                        (
                            w.get(f"stock_dom:{d}", pd.Series(0.0, index=w.index)).fillna(0) >= 10
                        ).mean()
                    )
                    for d in MINBASE_DOMAINS
                }
    meta["min_base"] = mb
    # -- A4.3 / E8 population-weighted city levels (shown per city, never ranked) -------
    lvl = {}
    for c in CITIES:
        child, _ = child_status(raws[c], PRIMARY)
        for e in EDITIONS:
            x = child.xs(e, level="edition")
            lvl[f"{c}/{e}"] = {
                col: float((x[col] * x[w]).sum() / x[w].sum())
                for col, w in (("U", "wU"), ("Tstar", "wT"), ("T3M", "wT"), ("C", "wC"))
            }
    pub = rh.status["s3_2019_pub"]
    pop19 = _hh_pop(rh, 2019).reindex(pub.index)
    lvl["HH/2019"]["T_R19pub"] = float((pub * pop19).sum() / pop19.sum())
    meta["city_levels"] = lvl
    # -- §9.2 (6) context: HH S1/S7 with K only (D4), protection shares unlinked (R4) ----
    ctxr = []
    gh = pd.Series({u: grains["HH"].parent[u] for u in rh.balanced})
    for e in EDITIONS:
        x = wide.xs(e, level="edition").reindex(gh.index)
        k = statuses[("primary", "HH")].K.xs(e, level="edition")["K"]
        for ind in HH_CONTEXT:
            agg = weighted_mean(x[ind], x["population"], gh)  # NULL S7 cells drop (A4.3)
            r, n = _rho(k, agg)
            ctxr.append({"indicator": ind, "edition": e, "rho_with_K": r, "n_stadtteile": n})
            _desc_row(
                ctx,
                "HH",
                grains["HH"].name,
                "context",
                f"context: Spearman(HH {ind} population-weighted, K), edition {e}",
                r,
                n,
                [
                    "context only, no verdict; correlated with K only, never with an OA, café or "
                    "fast-food variable (D4); S7 on non-NULL cells (A4.3)"
                ],
            )
    meta["context_s1_s7"] = ctxr
    prot = {}
    ms = rb.context["milieuschutz"].set_index("area_code")
    share_b = np.where(
        ms["under_milieuschutz"].fillna(False).astype(bool)
        & (ms["designation_year"].fillna(0) <= 2024),
        ms["milieuschutz_overlap_frac"].fillna(0.0),
        0.0,
    )
    sb = pd.Series(share_b, index=ms.index)
    gb = pd.Series({u: grains["BER"].parent[u] for u in rb.balanced})
    ub = weighted_mean(sb.reindex(gb.index).fillna(0.0), _band_pop(rb, 2024).reindex(gb.index), gb)
    zc = rh.context["zone_cover"].set_index("area_code")["cover"].fillna(0.0)
    uh = weighted_mean(zc.reindex(gh.index).fillna(0.0), _hh_pop(rh, 2025).reindex(gh.index), gh)
    for c, u in (("BER", ub), ("HH", uh)):
        prot[c] = {
            "n_units": int(u.notna().sum()),
            "n_units_any": int((u > 0).sum()),
            "median": float(u.median()),
            "mean": float(u.mean()),
            "q90": float(u.quantile(0.9)),
        }
    meta["protection_share_2024"] = prot
    # -- PR §5 / R5 / E7 diagnostics: growth per unit and window ---------------------------
    gdg = {}
    for c in CITIES:
        gr = grains[c]
        gdg[c] = {
            "poigrowth_2019_2025": _q5(gr.poigrowth),
            "popgrowth_2018_2024": _q5(gr.popgrowth),
            "popgrowth_windows": {k: _q5(v) for k, v in (gr.popgrowth_windows or {}).items()},
            "popgrowth_plr": "not computed: areal crosswalk (A4 rev. 1 E7)"
            if c == "BER"
            else "n/a",
        }
    meta["growth_diagnostics"] = gdg
    # -- PR §6.2 Moran's I diagnostic ------------------------------------------------------
    meta["moran"] = []
    for c in CITIES:
        meta["moran"] += moran_diagnostics(c, grains[c], builders[("primary", c)])
    meta["moran_blocks_too_small"] = {
        c: any(m["block_p_sim"] < ALPHA for m in meta["moran"] if m["city"] == c) for c in CITIES
    }
    # -- loader facts -----------------------------------------------------------------------
    meta["panel"] = {
        "BER": {
            "balanced_plr": len(rb.balanced),
            "units": len(grains["BER"].units),
            "plr_with_mss_all3": rb.context["n_plr_mss_all3"],
            "n3_islands": rb.context.get("n3_islands", []),
            "centrality_threshold_m": rb.context.get("centrality_threshold_m"),
        },
        "HH": {
            "balanced_gebiete": len(rh.balanced),
            "units": len(grains["HH"].units),
            "dropped_scored_2025": rh.status["dropped_2025"],
            "dropped_ever_scored": rh.status["dropped_ever"],
            "r19_missing": rh.status["r19_missing"],
            "s3_revised_gebiete": rh.status["revised"],
            "n3_islands": rh.context.get("n3_islands", []),
            "centrality_threshold_m": rh.context.get("centrality_threshold_m"),
        },
        "source_attrs_BER": rb.status["attrs"],
    }
    return meta


# ---------------------------------------------------------------------------
# Output (PR §9.1, M1: a separate CSV; byte-identical reruns, P354 §5.7)
# ---------------------------------------------------------------------------


def _flags_str(flags: set[str]) -> str:
    unknown = set(flags) - set(FLAG_VOCAB)
    assert not unknown, f"flag outside the §9.1 vocabulary: {sorted(unknown)}"  # noqa: S101
    return ";".join(f for f in FLAG_VOCAB if f in flags)


def note_clean(n: str) -> str:
    return n.replace("; ", ", ")


def matched_records(rows: list[dict]) -> list[dict]:
    out = []
    for r in rows:
        rec = {}
        for c in MATCHED_COLUMNS:
            v = r.get(c)
            if c == "flags":
                rec[c] = _flags_str(v or set())
            elif c == "notes":
                # notes are joined with "; " in the CSV, so no single note may contain one
                rec[c] = "; ".join(note_clean(n) for n in (v or []))
            else:
                rec[c] = S._fmt(v, "p" if c in S.P_COLS else "est")
        out.append(rec)
    return out


def write_matched_results(records: list[dict], path: Path) -> None:
    buf = io.StringIO()
    w = csv.DictWriter(buf, fieldnames=list(MATCHED_COLUMNS), lineterminator="\n")
    w.writeheader()
    w.writerows(records)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(buf.getvalue().encode("utf-8"))


def write_matched_metadata(path: Path, updates: dict, replace_all: bool = False) -> dict:
    data = {}
    if path.exists() and not replace_all:
        data = json.loads(path.read_text(encoding="utf-8"))
    data.update(S._json_clean(updates))
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(
        (json.dumps(data, indent=2, ensure_ascii=False, sort_keys=True) + "\n").encode("utf-8")
    )
    return data


# ---------------------------------------------------------------------------
# Entry point (called by thesis_hypothesis_suite.main for --panel matched, PR §9.3)
# ---------------------------------------------------------------------------


A5_REFERENCE_COMMIT = "13d9f3ff"  # PR Amendment 5 (F2): the pre-A5 reference result CSV
_REF_PATH = "docs/epic-e/matched-comparison-results.csv"


def reference_records(commit: str = A5_REFERENCE_COMMIT) -> list[dict] | None:
    """The result CSV as of the pre-A5 reference commit (read from git, read-only)."""
    import subprocess

    try:
        txt = subprocess.run(  # noqa: S603 -- fixed git argv, no user input
            ["git", "show", f"{commit}:{_REF_PATH}"],  # noqa: S607
            cwd=REPO,
            capture_output=True,
            check=True,
        ).stdout.decode("utf-8")
    except (OSError, subprocess.CalledProcessError):
        return None
    return list(csv.DictReader(io.StringIO(txt)))


def _statement_of(r: dict) -> str:
    if r["family"] != "X8":
        return ""
    if "robust-DIFFERS rule met" in r["notes"]:
        return "stated"
    if "not stated as a city difference" in r["notes"]:
        return "not stated"
    return "not applicable (no DIFFERS)"


_FLAG_CAUSE = {
    "small_units_flip": "A5.1",
    "core3m_flip": "A5.1",
    "core2_flip": "A5.1",
    "core1u_flip": "A5.1",
    "w24_weight_sensitive": "A5.1",
    "r19_revision_sensitive": "A5.1",
    "maup_flip": "review 1 (§6.5 not comparable)",
    "ewr_2022_interpolated": "review 4 (band-year bookkeeping)",
    "not_stated_city_difference": "A5.2",
}


def a5_changes(records: list[dict], ref: list[dict] | None) -> dict:
    """A5 (F2) / A5-8: every row whose flags, statement-rule outcome, family or verdict changed
    against the reference CSV, before -> after, with the cause of each change."""
    if ref is None:
        return {"reference": A5_REFERENCE_COMMIT, "available": False, "rows": []}

    def key(r: dict) -> tuple:
        return (
            r["city"],
            r["operationalisation"],
            r["grain"],
            r["cluster_unit"],
            r["window"],
            r["pivots"],
        )

    refm = {key(r): r for r in ref}
    out = []
    for r in records:
        o = refm.get(key(r))
        if o is None:
            out.append(
                {
                    "city": r["city"],
                    "hypothesis": r["hypothesis"],
                    "row": r["operationalisation"][:90],
                    "change": "row not in the reference",
                }
            )
            continue
        fb = {f for f in o["flags"].split(";") if f}
        fa = {f for f in r["flags"].split(";") if f}
        ch = {}
        if fb != fa:
            ch["flags"] = {
                "removed": sorted(fb - fa),
                "added": sorted(fa - fb),
                "cause": sorted({_FLAG_CAUSE.get(f, "other") for f in fb ^ fa}),
            }
        if _statement_of(o) != _statement_of(r):
            ch["statement_rule"] = {
                "before": _statement_of(o),
                "after": _statement_of(r),
                "cause": "A5.2",
            }
        if o["family"] != r["family"] or o["verdict"] != r["verdict"]:
            if r["family"] == GE5000_FAMILY:
                cause = "A5.2"
            elif r["cluster_unit"] in ("spatial_block_k36", "iid"):
                cause = "review 5 (floor 20)"
            else:
                cause = "other"
            ch["verdict"] = {
                "family": [o["family"], r["family"]],
                "before": o["verdict"],
                "after": r["verdict"],
                "cause": cause,
            }
        if ch:
            out.append(
                {
                    "city": r["city"],
                    "hypothesis": r["hypothesis"],
                    "row": r["operationalisation"][:90],
                    "cluster_unit": r["cluster_unit"],
                    **ch,
                }
            )
    gone = [k for k in refm if k not in {key(r) for r in records}]
    return {
        "reference": A5_REFERENCE_COMMIT,
        "available": True,
        "rows": out,
        "reference_rows_missing": len(gone),
    }


def main_matched(
    db: Path,
    n_boot: int,
    results_csv: Path = MATCHED_RESULTS_CSV,
    metadata_json: Path = MATCHED_METADATA_JSON,
    findings: Path | None = MATCHED_FINDINGS,
) -> int:
    import duckdb

    con = duckdb.connect(str(db), read_only=True)
    sha = S.run_sha()
    print(
        "[suite] matched panel: Berlin BZR x Hamburg Stadtteil, harmonised core (#371)", flush=True
    )
    rows, meta = run_matched(con, n_boot, sha, metadata_json)
    con.close()
    records = matched_records(rows)
    write_matched_results(records, results_csv)
    for r in rows:
        if r["family"] in ("T8", "N", "X8"):
            print(
                f"  {r['city']:6s} {r['hypothesis']:4s} est={S._fmt(r['estimate'])} "
                f"ci=[{S._fmt(r['ci_low'])},{S._fmt(r['ci_high'])}] p_bh={S._fmt(r['p_bh'], 'p')} "
                f"{r['verdict']} | {r['holds']} | {_flags_str(r['flags'])}",
                flush=True,
            )
    run_meta = {k: v for k, v in meta.items() if k not in ("feature_lists_prefit", "blocks")}
    run_meta["run"] = {"run_sha": sha, "n_boot": n_boot, "seed": SEED, "seed_x8_hh": SEED_X8["HH"]}
    run_meta["a5_changes"] = a5_changes(records, reference_records())
    meta_all = write_matched_metadata(metadata_json, {"run": run_meta})
    print(f"[suite] wrote {results_csv} ({len(records)} rows) and {metadata_json}")
    if findings is not None:
        write_matched_findings(findings, records, meta_all)
        print(f"[suite] wrote {findings}")
    return 0


# ---------------------------------------------------------------------------
# Findings (PR §9.2: generated from the results CSV and metadata, never hand-edited)
# ---------------------------------------------------------------------------

FIRST_PARAGRAPH = (
    "E1c compares the eight thesis hypotheses in Berlin and Hamburg on a matched design. It "
    "removes the differences that design can remove: **grain** (Berlin Bezirksregion vs Hamburg "
    "Stadtteil, units of about 15,000–26,000 residents and 4–6 km²), **construct** (the same three "
    "labour-market and transfer indicators U, T, C in both cities, with Berlin T re-based to all "
    "recipients, T\\*), **time** (the same editions, reference dates and 2-year windows), **POIs** "
    "(the same basket, OA definition, snapshots and feature list) and **claim** (a city difference "
    "is a tested, multiplicity-controlled statement). What it cannot remove: the indicator "
    "definitions are not identical (§3.2), OSM mapping density differs between the cities (§2.4), "
    "the shocks hit the two indicator sets differently (§4.4), and with n ≈ 100–143 units per city "
    "the power for city differences is low (§6.4). **A 'no difference detected' is never 'the "
    "same'.** The framing stays as in Epic B: a directional comparison, not a replication "
    "(pre-registration §1)."
)
POWER_TEXT = (
    "**Power (pre-registration §6.4, stated up front).** At n ≈ 130 vs 65 (H1a/H1b), SE(Δρ) ≈ "
    "√(1/130 + 1/65) ≈ 0.15 before the design effect, so MDD ≈ 0.42. For the H3 pooled rows "
    "(286 vs 198), MDD ≈ 0.26 before the design effect. **X8 can detect only large city "
    "differences.** Every interaction row prints its own MDD (2.8 × the bootstrap SE of Δ)."
)
ROBUST_TEXT = (
    "**Robust-DIFFERS rule (§6.3, D1, D8, D10; binding).** A city difference may be **stated** "
    "only if X8 gives DIFFERS under the primary **core-3H** **and** in the ≥ 5,000-resident panel "
    "(BH over that panel's 8 X8 rows, NO DATA rows not counted in m; Amendment 5, A5.2), "
    "**and** under the T-free construct (core-2, because Hamburg S5 excludes AsylbLG; data checks "
    "§3) Δ has the same sign **and** its unadjusted 95% block-bootstrap CI excludes 0 (sensitivity "
    "criterion, no BH); **and** its Δ has the same sign under core-3M (sign only). A DIFFERS that "
    'fails any condition is reported as "differs only under <condition>; not stated as a city '
    'difference". DIFFERS states only that the within-city association differs at the harmonised '
    'construct and the matched grain; it does not say that the processes differ. "Same verdict in '
    'both cities" is never shown as agreement unless X8 says NO DIFFERENCE DETECTED and the MDD is '
    'at most 0.30 (ρ) / 0.10 (AUC); even then it reads "no difference detected", never "the same".'
)
SCALE_TEXT = (
    "**Scale caveat (R1).** The matched units (15–26k residents) are coarser than the scale at "
    "which gentrification is usually observed, so a null here does not rule out a "
    "neighbourhood-scale process."
)
SHOCK_TEXT_371 = """- **W1 (2018 → 2020):** pandemic onset. Unemployment rises from spring 2020, concentrated in
  gastronomy, retail and tourism jobs. That links the outcome to the POI basket through the labour
  market, not through neighbourhood change (P354 §3.4, W1 mechanism). Refugees who arrived in
  2015–16 continue to move from AsylbLG into SGB II after recognition. In Berlin this raises S3/S4;
  in Hamburg it moves people from AsylbLG to SGB II, both of which are inside S3.
- **W2 (2020 → 2022):** the bounce-back of pandemic unemployment. Ukrainian refugees arriving from
  March 2022 enter Hamburg T at arrival (AsylbLG is in S3 from 2019). At the 1 June 2022 switch
  (**Rechtskreiswechsel**) Hamburg T is unchanged, while U (and C, if S5 excludes AsylbLG) rise.
  Berlin U, T (non-unemployed recipients only) and C rise from June. Both cities' W2 absorb the
  arrivals; the asymmetry is in which indicator carries them and when within the window. This is a
  reason for the core-2 (and, conditionally, core-1U) sensitivity.
- **Accommodation sites (all windows, mainly W2/W3).** On 31.12.2022, 259 refugee-accommodation
  sites were in use in 170 of 856 Hamburg Gebiete, and 30 of the 37 Gebiete with negative Dynamik in
  2023 contain one (Bericht 2023, PDF pp. 12, 16). Their residents are in the Hamburg population
  counts. Because AsylbLG is in Hamburg T, an opening raises Hamburg K. In Berlin, AsylbLG is in no
  indicator, so registered residents of a new site lower Berlin K through the denominators until
  recognition. Under core-2 both cities show only the denominator effect. Whether residents of the
  Berlin arrival centre at Tegel are registered is unknown. Disclosed, not corrected.
- **W3 (2022 → 2024):** **Bürgergeld** (1 January 2023) widens SGB II access and raises the
  protected assets. **Wohngeld-Plus** (2023) moves some low-income households out of SGB II/XII
  into housing benefit, which lowers T and (depending on S5's scope) C. Both are city-wide, but their
  spatial incidence follows the existing low-income geography. Ukrainian refugee arrivals continue.
- Under rank statistics a uniform city-wide shift is harmless; a shift that follows the existing
  geography is not. Every H2/H3 row that pools windows says so. Per-window rows are reported as
  sensitivities. A city difference that appears only in W2 is flagged "coincides with the
  Rechtskreiswechsel asymmetry".

(Pre-registration §4.4, with the "Local sites" bullet replaced by A4 rev. 1 E9. The data checks
§3 found that Hamburg S5 excludes AsylbLG, so "U (and C) rise" in W2 is the operative case.)"""
GAPS_TEXT = """1. **T differs in scope.** Berlin S3 excludes the unemployed and AsylbLG recipients. Hamburg S3
   includes all SGB II recipients and, from 2019, AsylbLG recipients. Hamburg T therefore loads more
   on refugee accommodation and overlaps more with U (gap 5).
2. **C differs in scope.** Berlin S4 counts SGB II only. Hamburg S5 counts "Mindestsicherung"; the
   data checks (§3) found its numerator is non-employable SGB II beneficiaries (Sozialgeld) under 15
   in every edition, so it excludes SGB XII and AsylbLG. Core-1U is therefore not triggered and the
   T-free construct is core-2.
3. **U denominators differ** (15 to the Regelaltersgrenze in Berlin vs 15–64 in Hamburg). Hamburg S4
   is SGB II only in every matched edition (data checks §3).
4. Because K is z-scored within each city, **it ranks units within a city**. A Berlin and a Hamburg
   unit with the same K are not equally disadvantaged.
5. **Hamburg K double-weights unemployment (gap 5)** under the core-3M sensitivity. The primary
   core-3H corrects it by re-basing Berlin T to all recipients, T\\* = (count S3 + count S1) / all
   residents (§3.7).

**Residual differences after the T\\* correction (binding disclosure, §3.7).** Berlin T\\* counts SGB
II **and SGB XII** recipients, and no AsylbLG. Hamburg T counts SGB II **and AsylbLG** (from 2019),
and no SGB XII. So the U double weighting is gone, but the refugee channel (Hamburg) and the older
and disabled-persons channel (Berlin) remain. U and T\\* now overlap in **both** cities in the same
way (the unemployed are in both), so the two cities' K weight unemployment alike."""
A41_TEXT = (
    "Berlin populations for 31.12.2018 and 31.12.2020 are mapped from LOR 2019 to LOR 2021 by area "
    "share, not by population. About 10,100 residents (0.27 %) are assigned to two development sites "
    "that had no housing at either date, and are missing from the neighbouring areas where they "
    "lived. This shifts the weights inside 2 of 143 Bezirksregionen. Their totals including the two "
    "sites are unaffected. Sensitivity W24 uses 2024 populations throughout. Because 2024 "
    "populations also reflect real change since 2018 (new housing, refugee arrivals, ageing), a "
    "result that changes under W24 is not by itself evidence of the mapping error."
)
W24_SENTENCE = (
    "W24 measures fixed-composition change. It does not include population shifts between areas "
    "within a unit, which can be part of neighbourhood change (new-build gentrification)."
)
MUST_NOT_371 = """- "The cities differ in how gentrification works." (DIFFERS is about an association on a
  harmonised construct; §6.3.)
- "The cities are the same." (Never; at most "no difference detected", with the MDD.)
- Anything about displacement, "pressure" or protection-zone effects (#358, §7.4).
- Cross-city comparisons of OA levels or K levels (§2.4, §3.2.4).
- That Hamburg migration background or school leaving explain any result (context only, no test;
  no S1/S7 × OA correlation exists, D4).
- **N2 is not an early-warning or investment signal** (D5a). N2 is never worded as "fewer fast-food
  outlets".
- N1 results are never about "gentrifying areas" (D7).
- A city difference that fails the robust-DIFFERS rule (§6.3, D1), or an AUC difference involving
  a below-chance city (D6), stated as a city difference.
- Which city has more unemployment, transfer receipt or child poverty, from the matched U/T/C levels
  (definitions differ, §3.2) (A4 rev. 1 E8).
- Every P354 §9 item."""
IMPLEMENTATION_READINGS = [
    "**Code placement.** The matched panel lives in `analysis/thesis_matched_panel.py` and runs "
    "through the suite's CLI (`analysis/thesis_hypothesis_suite.py --panel matched`, §9.3). The "
    "existing `BER/*` and `HH/*` code paths and outputs are untouched.",
    "**Load order (§8.4).** Phase 1 loads geometry, POIs, populations and presence only; the "
    "balanced sets, units, blocks and common feature lists are fixed and written to the metadata "
    "before any outcome value (MSS indicators, annex shares) is loaded in phase 2, which asserts "
    "the same balanced sets.",
    "**Sensitivity verdicts are uncorrected** (§0, §7.5; P354 §5.4; ruling 2): per-city "
    "sensitivity rows use the unadjusted 95% CI, X8 sensitivity rows unadjusted p < 0.05. The one "
    "exception is the ≥ 5,000 X8 panel, scored by BH within its 8 rows (family `X8_ge5000`, A5.2), "
    "used only for the statement rule.",
    "**Flip flags follow A5.1** (ruling 3): sign or unadjusted significance, both sides "
    "unadjusted; never set when either side is NO DATA (the row then notes 'not evaluated'); the "
    "compared sensitivity rows carry `primary_p_unadj` in `notes`.",
    "**Cluster floors** (ruling 4): G = 16 and Bezirk (12 / 7) use the directional_inference "
    "default of 5 and say so on every row; G = 36 and iid keep the P354 floor of 20.",
    "**R19-pub** is the as-published 2019 level with pp changes; the general §4.3 z-change view is "
    "the separate z-change sensitivity (ruling 5).",
    "**M3 '2020 only'** swaps the Berlin edition-2023 aggregation weights only; the age bands and "
    "P^(U)/P stay at the interpolated 31.12.2022 values (noted on every M3 row). W24 swaps both "
    "(A4.1, E6). The interpolation itself is a pre-registered input (M3) listed in the §8.2 guard.",
    "**Mapping and population-growth diagnostics** (§5, R5/E7, ruling 6): the units in the top "
    "decile of OSM total-POI growth 2019–2025 (DHS growth) or of population growth "
    "31.12.2018–31.12.2024 are dropped from the H3a/H3b/H3c primary rows; the outcome is not "
    "re-standardised. The dropped IDs are in the metadata. Berlin growth uses Bezirksregion totals "
    "over all child PLRs (E7); Hamburg uses the balanced Gebiete.",
    "**N1** uses the city's median of K at each pivot edition; the R2 centrality split uses "
    "31.12.2024 populations (A4.1). **N3** computes the spatial lag over all matched units, also "
    "inside the ≥ 5,000 run (ruling 6).",
    "**≥ 5,000 threshold** on the population of the unit's balanced children: Berlin 31.12.2024 "
    "(A4.1), Hamburg edition 2025 (ruling 6; dates in the metadata).",
    "**Feature lists.** The common lists (A1.1 rule per city, then the intersection) are computed "
    "once on the matched units and reused by every matched-grain sensitivity; the fine grain has its "
    "own common lists. Where no commercial category survives (the fine grain), H1/H2 read 'not "
    "comparable' (§6.5) and `maup_flip` is not evaluated for them.",
    "**P354 §4.4 Hamburg low-power rule not applied** (ruling 6): it belonged to the class-based "
    "Hamburg H2 (4–10% positives); §3.5 replaces that operationalisation with dK > 0.",
    "**Carried-over secondaries.** D4 rows are dropped (§8.1 allow-list), published-class rows are "
    "not defined at the matched grain, and the POI-derived P354 §5.2 variants are kept. Per-1k rows "
    "use the population of all children (all PLRs at 31.12.2024; Hamburg Gebiete scored in 2025).",
    "**Berlin PLRs** (ruling 7): 535 balanced of the lor_2021 PLRs; every dropped PLR is listed with "
    "its reason in the metadata (`dropped_berlin_plr`).",
    "**X8 bookkeeping** (ruling 8): `n` / `n_clusters` are the sums of both cities; the per-city "
    "values are in `notes` (`n_BER`, `n_HH`, `clusters_BER`, `clusters_HH`); the outcome suffixes "
    "are documented in the metadata (`outcome_suffixes`).",
    "**Moran's I residuals** are the rank-regression residuals of the outcome on the predictor and "
    "the controls (the linear model behind the partial Spearman), per pivot (H3a/H3b) or window "
    "(H3c).",
    "**Protection-zone shares (context, unlinked).** Berlin: Milieuschutz panel, snapshot 2025, "
    "areas designated by 2024, overlap fraction × 31.12.2024 population. Hamburg: soziale "
    "Erhaltungsverordnungen in force by 31.12.2024, area cover of each Gebiet × edition-2025 "
    "population.",
    "**Regelaltersgrenze f** uses the exact fractions 7/24, 9/24, 11/24, 12/24 (ruling 6).",
    "**Debug runs and later fixes** (ruling 9): the low-B runs (B = 29, 49, 99) and the two later "
    "fixes (8e2e9b4d, 332a64f6) are disclosed in the metadata (`disclosures`), with the evidence "
    "that neither fix changed an estimate, n, CI, p, verdict or flag.",
]


def _rf(v: str, nd: int = 3) -> str:
    return S._f(v, nd)


def _cell371(r: dict | None, holds_word: str = "") -> str:
    if r is None:
        return "–"
    if r["verdict"] == NO_DATA:
        if r["family"] == "N":
            return (
                f"NO DATA: could not be tested at this grain (n = {r['n'] or 0}, "
                f"{r['n_clusters'] or 0} of {G_PRIMARY} blocks < 20)"
            )
        return f"NO DATA (n = {r['n'] or 0}, {r['n_clusters'] or 0} blocks)"
    name = "AUC" if r["estimator"] == "oof_auc_logit" else "ρ"
    s = (
        f"{name} {_rf(r['estimate'])} [{_rf(r['ci_low'])}, {_rf(r['ci_high'])}], n = {r['n']} "
        f"({r['n_clusters']} blocks), p_BH = {_rf(r['p_bh'], 4)}: **{r['verdict']}** "
        f"({r['effect_label']})"
    )
    if r["holds"]:
        s += f"; *{r['holds']}*"
    if r["flags"]:
        s += f"; flags: `{r['flags']}`"
    return s


def _xcell(r: dict | None) -> str:
    if r is None:
        return "–"
    if r["verdict"] == NO_DATA:
        return "NO DATA"
    s = (
        f"**{r['verdict']}**, Δ {_rf(r['estimate'])} [{_rf(r['ci_low'])}, {_rf(r['ci_high'])}], "
        f"MDD {_rf(r['mdd'])}"
    )
    if r["p_bh"]:
        s += f", p_BH = {_rf(r['p_bh'], 4)}"
    else:
        s += f", p = {_rf(r['p_boot'], 4)}"
    if r["flags"]:
        s += f"; flags: `{r['flags']}`"
    return s


def _variant_of(r: dict) -> str:
    m = re.match(r"^\[([^\]]+)\] ", r["operationalisation"])
    return m.group(1) if m else "primary"


def write_matched_findings(path: Path, records: list[dict], meta: dict) -> None:
    run = meta.get("run", {})
    rm = run.get("run", {})
    pre = meta.get("prefit", {})
    prim = {
        (r["city"], r["hypothesis"]): r
        for r in records
        if r["family"] in ("T8", "N", "X8")
        or (
            r["city"] == "BER-HH"
            and r["role"] == "exploratory"
            and r["hypothesis"] in N_ORDER
            and _variant_of(r) == "primary"
        )
    }
    prim |= {
        (r["city"], r["hypothesis"]): r
        for r in records
        if r["hypothesis"] == "N3"
        and r["city"] in CITIES
        and _variant_of(r) == "primary"
        and r["role"] == "exploratory"
        and r["operationalisation"].startswith("partial Spearman(Wg")
    }
    L: list[str] = []
    a = L.append
    a("# E1c — Matched Berlin–Hamburg comparison of the thesis hypotheses (#371)")
    a("")
    a(
        "> **Generated** by `analysis/thesis_hypothesis_suite.py --panel matched` from "
        "`docs/epic-e/matched-comparison-results.csv` and `docs/epic-e/matched-comparison-metadata.json` "
        "— do not hand-edit (pre-registration §9.2). Interpretation is left to the reviewers and the "
        "analyst."
    )
    a("")
    a(
        f"- **Run:** `run_sha` {rm.get('run_sha', '')}; B = {rm.get('n_boot', '')} block-bootstrap "
        f"draws; seed {rm.get('seed', '')} (Hamburg X8 stream {rm.get('seed_x8_hh', '')}); α = 0.05; "
        f"G = {G_PRIMARY} k-means blocks per city."
    )
    a(
        "- **Binding design:** `docs/methodology/371-matched-comparison-preregistration.md` "
        "(Revisions 1–3, Amendment 4 and Amendment 4 revision 1), with "
        "`docs/methodology/354-355-hypothesis-suite-preregistration.md` (Amendments 1–3) for the "
        "shared estimators. Data evidence: `docs/epic-e/371-data-checks.md`."
    )
    a(
        "- **Gate:** methodology-bearing (R-C1). Geo-DS and domain `Verdict: PASS` on these results "
        "are required before integration into `develop` or any publication."
    )
    a("")
    a("## 1. What is matched and what is not")
    a("")
    a(FIRST_PARAGRAPH)
    a("")
    a(POWER_TEXT)
    a("")
    a(ROBUST_TEXT)
    a("")
    a(SCALE_TEXT)
    a("")
    a(f'**Binding page wording (R7):** "{R7_WORDING}"')
    a("")
    a(f'**Binding page wording wherever Hamburg change is shown (E9):** "{HH_ACCOMMODATION_NOTE}"')
    a("")
    a("## 2. Side by side")
    a("")
    a(
        "Primary per city: BH across the city's 8 thesis primaries (T8). City difference: X8, BH "
        'across the 8 Δ = θ_BER − θ_HH. ρ: higher K = more disadvantage. *Italic* = "Holds?" '
        '(Berlin) / "Matches Berlin 2018?" (Hamburg), P354 §5.6 with Amendments 2–3.'
    )
    a("")
    a(
        "| # | Hypothesis | 2018 thesis | Berlin matched | Hamburg matched | City difference tested |"
    )
    a("|---|---|---|---|---|---|")
    for h in PRIMARY_ORDER:
        th = THESIS_HYPOTHESES[h]
        a(
            f"| {h} | {th.get('wording_de', '')} | {THESIS_WORDS.get(th['thesis_verdict'], th['thesis_verdict'])} | "
            f"{_cell371(prim.get(('BER', h)))} | {_cell371(prim.get(('HH', h)))} | "
            f"{_xcell(prim.get(('BER-HH', h)))} |"
        )
    a("")
    a(
        "New hypotheses (§7; N1 and N2 confirmatory with BH within the pair, N3 exploratory; city "
        "differences exploratory and uncorrected):"
    )
    a("")
    a("| # | Hypothesis | Berlin matched | Hamburg matched | City difference (exploratory) |")
    a("|---|---|---|---|---|")
    for h in N_ORDER:
        a(
            f"| {h} | {N_HYPOTHESES[h]['wording']} | {_cell371(prim.get(('BER', h)))} | "
            f"{_cell371(prim.get(('HH', h)))} | {_xcell(prim.get(('BER-HH', h)))} |"
        )
    a("")
    mm = meta.get("run", {}).get("bh_family_m", {})
    for c in CITIES:
        nd = [h for h in ("N1", "N2") if prim.get((c, h), {}).get("verdict") == NO_DATA]
        a(
            f"- {CITY[c].label} N-family: BH runs with m = {mm.get(f'N/{c}', '–')}"
            + (
                f" ({', '.join(nd)} is NO DATA and not a test, so it does not count toward m; "
                "A5, geo readings ruling 1)."
                if nd
                else "."
            )
        )
        for h in nd:
            a(
                f"- {CITY[c].label} {h} **could not be tested at this grain**: the units above the "
                "median occupy fewer than 20 of the 24 blocks (PR §6.2 / P354 §5.3 floor). It is "
                "never read as 'not supported' (A5, domain O3). Its inference-sensitivity rows "
                "(G = 16, G = 36, iid, Bezirk) are in §5 under those headings and in the CSV with "
                "`cluster_unit` `spatial_block_k16`, `spatial_block_k36`, `iid` and `bezirk`."
            )
    a("")
    a(
        "**Notes on the primary rows** (verbatim from the CSV `notes` column, binding texts omitted):"
    )
    a("")
    skip = {
        note_clean(n)
        for n in (
            R7_WORDING,
            HH_ACCOMMODATION_NOTE,
            POOLED_NOTE,
            R19_NOTE,
            EWR22_NOTE,
            *SHOCK_NOTES.values(),
        )
    }
    for key in [(c, h) for c in ("BER", "HH", "BER-HH") for h in (*PRIMARY_ORDER, *N_ORDER)]:
        r = prim.get(key)
        if r is None:
            continue
        ns = [n for n in r["notes"].split("; ") if n and n not in skip]
        if ns:
            a(f"- {key[0]} {key[1]}: " + "; ".join(ns))
    a("")
    a(
        "**What FDR means.** Benjamini–Hochberg bounds the expected share of false claims among the "
        "rows marked significant in each family (T8 per city, N per city, X8); it does not protect "
        "each row. `p_holm` is reported for transparency and does not decide verdicts."
    )
    a("")
    a("## 3. Validity and consistency checks")
    a("")
    a("### 3.1 K against each city's own index (§3.6)")
    a("")
    a("| Check | Edition / window | ρ | n | Threshold | Result |")
    a("|---|---|---|---|---|---|")
    for v in meta.get("run", {}).get("validity", []):
        thr = "–" if v.get("threshold") is None else f"{v['threshold']:.2f}"
        res = "reported" if v.get("pass") is None else ("pass" if v["pass"] else "**FAIL**")
        a(
            f"| {v['check']} | {v.get('edition', v.get('window', ''))} | {_rf(v.get('rho'))} | "
            f"{v.get('n')} | {thr} | {res} |"
        )
    a("")
    a(
        "Reading (R6): the Berlin level check compares K with the #354 S composite built from "
        "overlapping indicators, so ρ ≈ 1 is expected by construction for core-3M; with T\\* ≠ S3 "
        "the ≥ 0.90 threshold is informative (§3.7 Validity). The informative checks are Hamburg K "
        "vs Status-summe and K vs each city's own classes."
    )
    div = meta.get("run", {}).get("validity_divergence", {})
    a("")
    a(
        "Divergence: "
        + (
            "; ".join(f"{c}: {t}" for c, t in sorted(div.items()))
            if div
            else "none of the thresholds failed."
        )
    )
    a("")
    a("### 3.2 Hamburg z-to-share recovery (§3.3; repeated from data checks §2)")
    a("")
    a(
        "| Edition | Indicator | n | mean z | SD z | share min | share max | outside [−0.5, 100.5] | z / moments precision |"
    )
    a("|---|---|---|---|---|---|---|---|---|")
    for v in meta.get("run", {}).get("annex_recovery", []):
        a(
            f"| {v['edition']} | {v['indicator']} | {v['n']} | {v['mean_z']:+.4f} | {v['sd_z']:.4f} | "
            f"{v['share_min']:.2f} | {v['share_max']:.2f} | {v['n_outside']} | {v['z_precision']} / {v['moments_precision']} |"
        )
    a("")
    a(
        "Hamburg S4 SD rounding (A4.3): the S4 SD is rounded to 3 decimals in the matched editions, a "
        "±1.5–2.1 % scale uncertainty on S4 pp changes; ranks, AUC and Spearman are invariant. Any U "
        'change in pp carries "±2 % scale (annex SD rounding)".'
    )
    a("")
    a("### 3.3 Berlin 2019 backcast (§4.2)")
    a("")
    a("| Comparison | Grain | ρ | n | Expected | Result |")
    a("|---|---|---|---|---|---|")
    for v in meta.get("run", {}).get("backcast_check", []):
        a(
            f"| {v['indicator']} | {v['grain']} | {_rf(v.get('rho'))} | {v['n']} | ≥ {v['threshold']:.2f} | "
            f"{'pass' if v['pass'] else '**below**'} |"
        )
    a("")
    a(
        "The BZR rows compare the backcast (anteil_2021 − dynamik_2021 on LOR 2021) with MSS 2019 "
        "crosswalked through `int_berlin_lor_crosswalk_dominant_pop_2021`, both aggregated with "
        "31.12.2018 populations. The PLR rows compare anteil_E − anteil_(E−2) with the published "
        "dynamik_E."
    )
    tst = [
        v for v in meta.get("run", {}).get("validity", []) if v["check"].startswith("BER rho(T*")
    ]
    if tst:
        a("")
        a(
            "Pre-registered descriptive ρ(T\\*, S3) at PLR (§3.7 Validity): "
            + ", ".join(f"{v['edition']}: {_rf(v['rho'])}" for v in tst)
            + "."
        )
    a("")
    a("## 4. Grain and minimum base")
    a("")
    a("| City | Level | n | min | Q1 | median | Q3 | max | total |")
    a("|---|---|---|---|---|---|---|---|---|")
    for c, gd in sorted(meta.get("run", {}).get("grain_distribution", {}).items()):
        for key, lab in (
            ("child_area_km2", f"{CITY[c].child_word} area (km², EPSG:25832)"),
            ("unit_area_km2", f"{CITY[c].unit_word} area (km², EPSG:25832)"),
            ("child_pop_2024", f"{CITY[c].child_word} population 31.12.2024"),
            ("unit_pop_2024", f"{CITY[c].unit_word} population 31.12.2024"),
        ):
            q = gd.get(key, {})
            if q:
                nd = 2 if "area" in key else 0
                a(
                    f"| {c} | {lab} | {q['n']} | {q['min']:.{nd}f} | {q['q1']:.{nd}f} | {q['median']:.{nd}f} | "
                    f"{q['q3']:.{nd}f} | {q['max']:.{nd}f} | {q['total']:.{nd}f} |"
                )
        a(
            f"| {c} | units < 5,000 residents / single-child units | {gd.get('n_units_lt_5000')} / "
            f"{gd.get('n_single_child_units')} | | | | | | |"
        )
    a("")
    a("Share of units whose domain base is at least 10 POIs (§5; A1.1 needs ≥ 20%):")
    a("")
    a("| City / grain / snapshot | " + " | ".join(MINBASE_DOMAINS) + " |")
    a("|---|" + "---|" * len(MINBASE_DOMAINS))
    for k, v in sorted(meta.get("run", {}).get("min_base", {}).items()):
        a(f"| {k} | " + " | ".join(f"{v[d]:.2f}" for d in MINBASE_DOMAINS) + " |")
    fl = pre.get("feature_lists_prefit", {})
    for grain in ("matched", "fine"):
        com = fl.get(grain, {}).get("common", {})
        a("")
        a(
            f"Common feature lists, {grain} grain (written to the metadata before any fit): H1 "
            f"{len(com.get('H1_cat', []))} categories, H2 {len(com.get('H2_cat', []))} categories; "
            f"domains H1 {len(com.get('H1_dom', []))}, H2 {len(com.get('H2_dom', []))}."
        )
    a("")
    a("## 5. Sensitivities")
    a("")
    a(
        "All rows below are outside every confirmatory family (uncorrected; P354 §5.4). They cannot "
        "change a primary verdict; they set the flags shown in §2."
    )
    groups: dict[str, list[dict]] = {}
    for r in records:
        if r["family"] in ("T8", "N", "X8") or r["role"] in ("validity", "context"):
            continue
        groups.setdefault(_variant_of(r), []).append(r)
    labels = {v.key: v.label for v in VARIANTS} | {
        "primary": "Secondary, exploratory and diagnostic rows of the primary run",
        "k16": "G = 16 blocks (§6.2)",
        "k36": "G = 36 blocks (§6.2)",
        "iid": "iid unit bootstrap (§6.2)",
        "bezirk": "Bezirk cluster bootstrap (§6.2; too few clusters for reliable coverage)",
        "PGR": "Berlin BZR vs PGR (§6.5; point estimates only)",
    }
    for key in ["primary", *[v.key for v in VARIANTS], "k16", "k36", "iid", "bezirk", "PGR"]:
        rs = groups.get(key, [])
        if not rs:
            continue
        a("")
        a(f"### {labels.get(key, key)}")
        a("")
        a("| City | Hyp | Role | Operationalisation | Estimate [95% CI] | n | Verdict | Flags |")
        a("|---|---|---|---|---|---|---|---|")
        for r in rs:
            op = re.sub(r"^\[[^\]]+\] ", "", r["operationalisation"])
            if len(op) > 110:
                op = op[:107] + "..."
            a(
                f"| {r['city']} | {r['hypothesis']} | {r['role']} | {op} | {_rf(r['estimate'])} "
                f"[{_rf(r['ci_low'])}, {_rf(r['ci_high'])}] | {r['n']} | {r['verdict'] or '–'} | {r['flags']} |"
            )
    a("")
    a("### Moran's I of the H3 residuals (§6.2, #365 on the matched panel)")
    a("")
    a("| City | Hyp | Where | n | Moran's I | p_sim | block-mean Moran's I | p_sim |")
    a("|---|---|---|---|---|---|---|---|")
    for m in meta.get("run", {}).get("moran", []):
        a(
            f"| {m['city']} | {m['hypothesis']} | {m['where']} | {m['n']} | {m['moran_I']:+.3f} | "
            f"{m['p_sim']:.3f} | {m['block_moran_I']:+.3f} | {m['block_p_sim']:.3f} |"
        )
    small = meta.get("run", {}).get("moran_blocks_too_small", {})
    a("")
    for c in CITIES:
        if small.get(c):
            a(
                f"- **{CITY[c].label}:** a block-mean Moran's I is significant at 5%, so the blocks "
                "are judged too small and the **G = 16 sensitivity is promoted** (§6.2); verdicts "
                "still come from G = 24."
            )
        else:
            a(f"- {CITY[c].label}: no block-mean Moran's I is significant at 5%.")
    a("")
    a(
        "G = 16 against G = 24 for the confirmatory rows (§6.2: G = 16 is promoted into the text; "
        "verdicts come from G = 24). The point estimate is identical; only the resampling unit "
        "changes. Compared on the same unadjusted scale (A5.1): rows where the unadjusted "
        "significance (p < 0.05) differs."
    )
    a("")
    g24 = {
        (r["city"], r["operationalisation"]): r for r in records if r["family"] in ("T8", "N", "X8")
    }
    diffs = []
    for r in records:
        if r["cluster_unit"] != "spatial_block_k16":
            continue
        base = g24.get((r["city"], re.sub(r"^\[k16\] ", "", r["operationalisation"])))
        if base is None:
            continue

        def sig(x: dict) -> str:
            if x["p_boot"] in ("", None):
                return "NO DATA"
            return "p < 0.05" if float(x["p_boot"]) < ALPHA else "n.s."

        if sig(r) != sig(base):
            diffs.append(
                f"| {r['city']} | {r['hypothesis']} | {base['verdict']} (p_unadj {_rf(base['p_boot'], 4)}) | "
                f"{r['verdict']} (p {_rf(r['p_boot'], 4)}) |"
            )
    if diffs:
        a("| City | Hyp | G = 24 verdict (BH) | G = 16 verdict (unadjusted) |")
        a("|---|---|---|---|")
        for d in diffs:
            a(d)
    else:
        a("No confirmatory row changes unadjusted significance under G = 16.")
    a("")
    a("## 6. Context (no verdict)")
    a("")
    a(
        "Hamburg S1 (children with a migration background) and S7 (school leaving), correlated **with K only** (D4):"
    )
    a("")
    a("| Indicator | Edition | ρ with K | n Stadtteile |")
    a("|---|---|---|---|")
    for v in meta.get("run", {}).get("context_s1_s7", []):
        a(f"| {v['indicator']} | {v['edition']} | {_rf(v['rho_with_K'])} | {v['n_stadtteile']} |")
    a("")
    a(
        "Share of each matched unit's population under protection in 2024 (§7.4, descriptive; no "
        "association with K, dK, OA or any N row is computed, R4):"
    )
    a("")
    a("| City | Units | Units with any protection | median | mean | 90th pct. |")
    a("|---|---|---|---|---|---|")
    for c, v in sorted(meta.get("run", {}).get("protection_share_2024", {}).items()):
        a(
            f"| {c} | {v['n_units']} | {v['n_units_any']} | {v['median']:.3f} | {v['mean']:.3f} | {v['q90']:.3f} |"
        )
    a("")
    a(
        "City levels, population-weighted over the matched units (A4.3 with E8). Both use the same "
        "aggregation (weighted by total residents). The indicator definitions still differ (§3.2, "
        "R7), so the levels are shown per city with their definitions and are not ranked against "
        "each other. Both differ from the official headline figures (Hamburg: unweighted Gebiet "
        "mean; Berlin: PLR aggregate about 0.5 pp below the published S3)."
    )
    a("")
    a("| City / edition | U (%) | T\\* / T (%) | Berlin S3 / core-3M T (%) | C (%) |")
    a("|---|---|---|---|---|")
    for k, v in sorted(meta.get("run", {}).get("city_levels", {}).items()):
        a(f"| {k} | {v['U']:.2f} | {v['Tstar']:.2f} | {v['T3M']:.2f} | {v['C']:.2f} |")
    lv19 = meta.get("run", {}).get("city_levels", {}).get("HH/2019", {})
    if "T_R19pub" in lv19:
        a("")
        a(f"Hamburg T 2019 as published (R19-pub): {lv19['T_R19pub']:.2f} %.")
    a("")
    a(
        "Definitions: Berlin U = SGB II unemployed per resident 15 to the Regelaltersgrenze; T\\* = "
        "SGB II and SGB XII recipients incl. the unemployed per resident; C = under-15s in SGB II "
        "households. Hamburg U = SGB II unemployed per resident 15–64; T = SGB II and AsylbLG "
        "recipients per resident; C = non-employable SGB II beneficiaries per under-15 (data checks "
        "§3, §4.1)."
    )
    a("")
    a("## 7. Disclosures")
    a("")
    a("### 7.1 Shocks (§4.4, binding)")
    a("")
    a(SHOCK_TEXT_371)
    a("")
    a("### 7.2 Construct gaps (§3.2, binding)")
    a("")
    a(GAPS_TEXT)
    a("")
    a("### 7.3 Berlin population series (A4.1 with E5, binding)")
    a("")
    a(A41_TEXT)
    a("")
    a(W24_SENTENCE)
    a("")
    pan = meta.get("run", {}).get("panel", {})
    hh = pan.get("HH", {})
    ber = pan.get("BER", {})
    a("### 7.4 Panels")
    a("")
    a(
        f"- Berlin: {ber.get('balanced_plr')} balanced PLRs (inhabited at 31.12.2018/2020/2022/2024, "
        f"MSS S1/S3/S4 in 2021/2023/2025) in {ber.get('units')} Bezirksregionen."
    )
    a(
        f"- Hamburg: {hh.get('balanced_gebiete')} Gebiete scored in all four editions in "
        f"{hh.get('units')} Stadtteile. The {len(hh.get('dropped_scored_2025', []))} scored-2025 "
        f"Gebiete outside the balanced panel: {', '.join(hh.get('dropped_scored_2025', []))} "
        f"({len(hh.get('dropped_ever_scored', []))} ever scored: {', '.join(hh.get('dropped_ever_scored', []))}). "
        "Gebiete enter or leave scoring by crossing the 300-resident threshold, typically through "
        "new-build or the opening or closing of accommodation (O3)."
    )
    a(
        "- Gebiete 39005 Lokstedt and 67012 Poppenbüttel are kept in the primary; their values are "
        "consistent with small-number effects in the published data (A4.3, O1)."
    )
    a(
        f"- R19 fallback (s3_2022 or D3_2022 missing, published level kept): {len(hh.get('r19_missing', []))} Gebiete."
    )
    a("")
    a("### 7.5 S3 base revised by the publisher (AsylbLG counting change, Bericht 2021)")
    a("")
    a(
        "Every Gebiet with |D3_E − (s_E − s_(E−3))| > 0.5 pp in 2022 or 2023 (A4 rev. 1 E3). The "
        "publisher documents a widened AsylbLG count from edition 2021 (Bericht 2021, PDF p. 8); the "
        "re-basing of the 2019/2020 values in D3_2022/D3_2023 is inferred from the annex. W2 is not "
        "claimed to be revision-free; it is untestable, with a clean start level. Values in % / pp."
    )
    a("")
    a(
        "| Gebiet | Δ 2022 | Δ 2023 | s3_2019 published | s3_2019_rev | W1 published | W1 revised | W2 | balanced |"
    )
    a("|---|---|---|---|---|---|---|---|---|")
    for v in hh.get("s3_revised_gebiete", []):

        def fz(x):
            return "—" if x is None else f"{x:+.2f}"

        a(
            f"| {v['gebiet']} | {fz(v['delta_2022'])} | {fz(v['delta_2023'])} | {_rf(v['s3_2019_pub'], 2)} | "
            f"{_rf(v['s3_2019_rev'], 2)} | {fz(v['w1_pub'])} | {fz(v['w1_rev'])} | {fz(v['w2'])} | "
            f"{'yes' if v['balanced'] else 'no'} |"
        )
    a("")
    a("### 7.6 Multiplicity and exploratory rows")
    a("")
    scored = [
        r
        for r in records
        if r["family"] not in ("T8", "N", "X8")
        and r["verdict"] in (SUPPORTED, CONTRADICTED, NOT_SIGNIFICANT, DIFFERS, NDD)
    ]
    sig = [r for r in scored if r["verdict"] in (SUPPORTED, CONTRADICTED, DIFFERS)]
    a(
        f"{len(scored)} non-confirmatory rows carry a verdict (secondary, sensitivity, exploratory); "
        f"at α = 0.05 about {0.05 * len(scored):.0f} would be significant by chance alone; "
        f"{len(sig)} are significant (uncorrected)."
    )
    fdr = [
        f"{r['city']} {r['hypothesis']}"
        for r in prim.values()
        if "not at family-wise" in r["notes"]
    ]
    a("")
    a(
        'Significant under BH but not under Holm ("significant at FDR 5%; not at family-wise 5%"): '
        + (", ".join(fdr) if fdr else "none")
        + "."
    )
    a("")
    a("### 7.7 What E1c must not claim (§10 with A4 rev. 1 E8, binding)")
    a("")
    a(MUST_NOT_371)
    a("")
    a("### 7.8 Deviations and implementation readings")
    a("")
    a(
        "**Amendment 5 (post-results-generation, pre-interpretation; binding).** It was written after "
        f"the first binding run (reference result CSV at commit {A5_REFERENCE_COMMIT}) existed. "
        "A5.1 redefines the six verdict-defined flip flags: a sign change (AUC rows: AUC − 0.5; X8: "
        "Δ) or a difference in unadjusted significance, both sides unadjusted; a sign change between "
        'two non-significant estimates is labelled "sign unstable around zero"; `maup_flip`, '
        "`mapping_driven` and `popgrowth_driven` stay sign-only. A5.2 reads the ≥ 5,000 condition of "
        "the statement rule as BH over that panel's 8 X8 rows (NO DATA not in m). Disclosure (A5 F2): "
        "A5.1 removes flags from the row that triggered reading 3 (Berlin H2, `small_units_flip` / "
        "`core2_flip`). Rows whose flags, statement-rule outcome, family or verdict changed against the "
        "reference, before → after, generated from the two CSVs:"
    )
    a("")
    ac = meta.get("run", {}).get("a5_changes", {})
    if not ac.get("available"):
        a(f"- Reference CSV {A5_REFERENCE_COMMIT} not readable from git; no list generated.")
    else:
        a("| City | Hyp | Row | Flags removed | Flags added | Other change | Cause |")
        a("|---|---|---|---|---|---|---|")
        for ch in ac.get("rows", []):
            fl = ch.get("flags", {})
            other = []
            causes = list(fl.get("cause", []))
            if "statement_rule" in ch:
                st = ch["statement_rule"]
                other.append(f"statement rule {st['before']} → {st['after']}")
                causes.append(st["cause"])
            if "verdict" in ch:
                vv = ch["verdict"]
                other.append(f"{vv['family'][0]}/{vv['before']} → {vv['family'][1]}/{vv['after']}")
                causes.append(vv["cause"])
            if "change" in ch:
                other.append(ch["change"])
            op = ch["row"] if len(ch["row"]) <= 70 else ch["row"][:67] + "..."
            a(
                f"| {ch['city']} | {ch['hypothesis']} | {op} | {', '.join(fl.get('removed', [])) or '–'} | "
                f"{', '.join(fl.get('added', [])) or '–'} | {'; '.join(other) or '–'} | "
                f"{', '.join(sorted(set(causes))) or '–'} |"
            )
        a("")
        a(
            f"{len(ac.get('rows', []))} rows changed; reference rows without a counterpart: "
            f"{ac.get('reference_rows_missing', 0)}. Review-finding causes (1: MAUP not comparable; "
            "4: `ewr_2022_interpolated` bookkeeping; 5: cluster floor 20 for G = 36 and iid) are "
            "code-review corrections, listed for completeness."
        )
    a("")
    a(
        "Implementation readings (ruled on in `docs/epic-e/371-implementation-readings-geo.md`, "
        "binding):"
    )
    a("")
    for t in IMPLEMENTATION_READINGS:
        a(f"- {t}")
    a("")
    a("## 8. Reconciliation with the P354 panels")
    a("")
    a(
        "Where a matched verdict differs from the `BER/modern` or `HH/full` verdict, the table names "
        "what the matched design changed. It does not imply that the earlier results were wrong."
    )
    a("")
    old = {}
    if S.RESULTS_CSV.exists():
        with S.RESULTS_CSV.open(encoding="utf-8", newline="") as f:
            for r in csv.DictReader(f):
                if r["role"] == "primary" and (r["city"], r["panel"]) in (
                    ("BER", "modern"),
                    ("HH", "full"),
                ):
                    old[(r["city"], r["hypothesis"])] = r["verdict"]
    changed = {
        "BER": "grain (PLR → Bezirksregion) and construct (S1+S3+S4 composite → harmonised K with T\\*); windows unchanged (W1–W3)",
        "HH": "grain (Gebiet → Stadtteil), construct (Statusindex/Dynamik classes → harmonised K) and window (3-year Dynamik editions 2016–2025 → 2-year level changes 2019–2025)",
    }
    a("| City | Hyp | P354 verdict | Matched verdict | What changed |")
    a("|---|---|---|---|---|")
    for c, pk in (("BER", "BER/modern"), ("HH", "HH/full")):
        for h in PRIMARY_ORDER:
            o = old.get((c, h), "–")
            n = prim.get((c, h), {}).get("verdict", "–")
            a(f"| {c} ({pk}) | {h} | {o} | {n} | {'' if o == n else changed[c]} |")
    a("")
    text = "\n".join(L) + "\n"
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(text.encode("utf-8"))
