"""
tests/analysis/test_directional_inference.py
=============================================
Unit tests for analysis/directional_inference.py -- the cross-lagged H3a/H3b design
and significance-aware verdict scoring introduced 2026-10-26.

The central regression: H3a and H3b used to be computed from the same two arrays
(Spearman with swapped arguments), so they could never disagree. These tests build
synthetic panels where exactly ONE direction is true and assert the two verdicts differ.
"""

from __future__ import annotations

import numpy as np
import pandas as pd
import pytest

from analysis.directional_inference import (
    CONTRADICTED,
    NO_DATA,
    NOT_SIGNIFICANT,
    SUPPORTED,
    build_cross_lagged,
    cluster_bootstrap_ci,
    cross_lagged_tests,
    default_cluster,
    direction_conclusion,
    partial_spearman,
    summarise,
    verdict,
)

N_BOOT = 199  # small for speed; the scripts use 1999


def _panel(effect: str, n_areas: int = 240, seed: int = 0) -> pd.DataFrame:
    """Lead-lag rows (lag_k = 1) over editions 2015 -> 2017 -> 2019.

    effect="h3a": status change in the following window is driven by the PRIOR POI change.
    effect="h3b": POI change in the following window is driven by the PRIOR status change.
    Area codes are 8-digit LOR-style, 4 PLRs per Bezirksregion -> 60 clusters.
    """
    rng = np.random.default_rng(seed)
    s0, d0 = rng.normal(size=n_areas), rng.normal(size=n_areas)
    ds_p, dd_p = rng.normal(size=n_areas), rng.normal(size=n_areas)
    noise_s, noise_d = rng.normal(size=n_areas), rng.normal(size=n_areas)
    ds_f = 0.8 * dd_p + 0.6 * noise_s if effect == "h3a" else noise_s
    dd_f = 0.8 * ds_p + 0.6 * noise_d if effect == "h3b" else noise_d
    s1, d1 = s0 + ds_p, d0 + dd_p
    s2, d2 = s1 + ds_f, d1 + dd_f
    codes = [f"{i // 4:06d}{i % 4:02d}" for i in range(n_areas)]
    rows = []
    for i, code in enumerate(codes):
        rows.append((code, 1, 2015, 2017, s0[i], s1[i], d0[i], d1[i]))
        rows.append((code, 1, 2017, 2019, s1[i], s2[i], d1[i], d2[i]))
    return pd.DataFrame(
        rows,
        columns=[
            "area_code",
            "lag_k",
            "edition_t",
            "edition_tk",
            "status_index_t",
            "status_index_tk",
            "dynamism_score_t",
            "dynamism_score_tk",
        ],
    )


# --- the regression the module exists for -------------------------------------------


@pytest.mark.parametrize("truth", ["h3a", "h3b"])
def test_cross_lagged_separates_the_two_directions(truth: str) -> None:
    cl = build_cross_lagged(_panel(truth), k=1)
    res = cross_lagged_tests(cl, n_boot=N_BOOT)
    v_a = verdict(
        res["H3a"]["rho"], "positive", ci_low=res["H3a"]["ci_low"], ci_high=res["H3a"]["ci_high"]
    )
    v_b = verdict(
        res["H3b"]["rho"], "positive", ci_low=res["H3b"]["ci_low"], ci_high=res["H3b"]["ci_high"]
    )
    if truth == "h3a":
        assert (v_a, v_b) == (SUPPORTED, NOT_SIGNIFICANT)
        assert "H3a" in direction_conclusion(v_a, v_b)
    else:
        assert (v_a, v_b) == (NOT_SIGNIFICANT, SUPPORTED)
        assert "H3b" in direction_conclusion(v_a, v_b)
    # The two directions are different statistics -- never the same number again.
    assert res["H3a"]["rho"] != pytest.approx(res["H3b"]["rho"])


def test_build_cross_lagged_uses_ordered_non_overlapping_windows() -> None:
    cl = build_cross_lagged(_panel("h3a"), k=1)
    assert len(cl) == 240  # one pivot (2017) per area
    assert set(cl["pivot"]) == {2017}
    df = _panel("h3a")
    first = df[(df.area_code == cl.area_code[0]) & (df.edition_t == 2015)].iloc[0]
    second = df[(df.area_code == cl.area_code[0]) & (df.edition_t == 2017)].iloc[0]
    assert cl.d_status_p[0] == pytest.approx(first.status_index_tk - first.status_index_t)
    assert cl.d_status_f[0] == pytest.approx(second.status_index_tk - second.status_index_t)


def test_build_cross_lagged_never_pairs_different_lags() -> None:
    df = _panel("h3a")
    df.loc[df.edition_t == 2017, "lag_k"] = 2  # break the chain
    assert build_cross_lagged(df, k=1).empty


# --- estimator ----------------------------------------------------------------------


def test_partial_spearman_removes_a_shared_driver() -> None:
    rng = np.random.default_rng(1)
    z = rng.normal(size=500)
    x = z + 0.3 * rng.normal(size=500)
    y = z + 0.3 * rng.normal(size=500)
    raw = partial_spearman(x, y)["rho"]
    partial = partial_spearman(x, y, [z])["rho"]
    assert raw > 0.8  # confounded
    # z partialled out. Not exactly 0: the control is removed linearly in RANK space,
    # and ranking makes a linear dependence slightly non-linear, so a strong shared
    # driver leaves a small residual (~0.1 here). The large drop is the property.
    assert abs(partial) < 0.2
    assert raw - abs(partial) > 0.7


def test_partial_spearman_needs_enough_rows() -> None:
    assert partial_spearman(np.arange(5.0), np.arange(5.0))["rho"] is None


def test_cluster_bootstrap_is_deterministic_and_needs_clusters() -> None:
    rng = np.random.default_rng(2)
    x, y = rng.normal(size=200), rng.normal(size=200)
    clusters = np.repeat(np.arange(40), 5)
    a = cluster_bootstrap_ci(x, y, [], clusters, n_boot=N_BOOT, seed=42)
    b = cluster_bootstrap_ci(x, y, [], clusters, n_boot=N_BOOT, seed=42)
    assert a == b
    assert cluster_bootstrap_ci(x, y, [], np.repeat(np.arange(3), 67)[:200], n_boot=N_BOOT)[:2] == (
        None,
        None,
    )


def test_default_cluster_maps_lor_codes() -> None:
    assert default_cluster("08100207") == "081002"  # PLR -> Bezirksregion
    assert default_cluster("081002") == "08"  # BZR -> Bezirk
    assert default_cluster("76024") == "76024"  # anything else: itself


# --- scoring ------------------------------------------------------------------------


def test_verdict_requires_significance() -> None:
    # The old scoring called this a PASS: right sign, p = 0.33.
    assert verdict(-0.0463, "negative", p=0.3348) == NOT_SIGNIFICANT
    assert verdict(-0.20, "negative", p=0.001) == SUPPORTED
    assert verdict(0.15, "negative", p=0.002) == CONTRADICTED
    assert verdict(-0.20, "negative", ci_low=-0.30, ci_high=-0.05) == SUPPORTED
    assert verdict(-0.20, "negative", ci_low=-0.30, ci_high=0.02) == NOT_SIGNIFICANT
    assert verdict(None, "negative", p=0.01) == NO_DATA


def test_summarise_counts_verdicts() -> None:
    s = summarise([SUPPORTED, NOT_SIGNIFICANT, NOT_SIGNIFICANT, CONTRADICTED])
    assert s == "Supported 1/4 · Contradicted 1 · Not significant 2"


def test_missing_d4_control_does_not_drop_the_panel() -> None:
    """Regression (2026-10-26): the 2021-2025 MSS panel pivots on 2023, where EWR (D4) was
    never published. Requiring the control dropped every row and the whole panel came back
    NO DATA. An unavailable control must be skipped (and reported), not fatal."""
    df = _panel("h3a")
    df["ewr_composite_t"] = np.nan
    cl = build_cross_lagged(df, k=1, control_col="ewr_composite_t")
    res = cross_lagged_tests(cl, n_boot=N_BOOT)
    assert res["H3a"]["n"] == 240
    assert res["H3a"]["d4_control"] is False
    df["ewr_composite_t"] = np.random.default_rng(3).normal(size=len(df))
    res = cross_lagged_tests(
        build_cross_lagged(df, k=1, control_col="ewr_composite_t"), n_boot=N_BOOT
    )
    assert res["H3a"]["d4_control"] is True
