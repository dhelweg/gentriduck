"""
tests/analysis/test_thesis_hypothesis_suite.py
==============================================
Unit tests for analysis/thesis_hypothesis_suite.py (#354/#355), pre-registration §7.3:

- synthetic panels: known sign -> SUPPORTED, reversed sign -> CONTRADICTED, noise -> NOT
  SIGNIFICANT (both for the CI-based secondary scoring and the BH-based primary scoring);
- every §5.8 leakage invariant fires on a crafted violation;
- Benjamini-Hochberg and Holm match hand-computed cases;
- DHS growth handles zero endpoints;
- determinism: the same inputs give byte-identical CSV output.

No warehouse needed: everything runs on synthetic data.
"""

from __future__ import annotations

import numpy as np
import pandas as pd
import pytest

from analysis import thesis_hypothesis_suite as S
from analysis.directional_inference import (
    CONTRADICTED,
    NOT_SIGNIFICANT,
    SUPPORTED,
    assert_fold_local_preprocessing,
    bh_adjust,
    holm_adjust,
    leakage_guard_groups,
    make_logit_pipeline,
)

N_BOOT = 199  # small for speed; the suite uses 1999


# ---------------------------------------------------------------------------
# Synthetic data
# ---------------------------------------------------------------------------


def _xy(effect: float, n: int = 400, seed: int = 0):
    rng = np.random.default_rng(seed)
    x = rng.normal(size=n)
    y = effect * x + rng.normal(size=n)
    clusters = np.array([f"c{i // 8:03d}" for i in range(n)], dtype=object)  # 50 clusters
    return x, y, clusters


def _row(
    estimator: str, res: dict, hyp: str = "H1b", role: str = "secondary", exp: str = "positive"
):
    return {
        "hypothesis": hyp,
        "role": role,
        "estimator": estimator,
        "estimate": res.get("estimate"),
        "ci_low": res.get("ci_low"),
        "ci_high": res.get("ci_high"),
        "p_boot": res.get("p_boot"),
        "p_bh": res.get("p_bh"),
        "p_holm": None,
        "expected_dir": exp,
        "effect_label": S.effect_label(estimator, res.get("estimate")),
        "_descriptive": False,
        "notes": [],
        "verdict": "",
        "holds": "",
    }


# ---------------------------------------------------------------------------
# Synthetic sign -> verdict
# ---------------------------------------------------------------------------


@pytest.mark.parametrize(
    ("effect", "expected"),
    [(0.8, SUPPORTED), (-0.8, CONTRADICTED), (0.0, NOT_SIGNIFICANT)],
)
def test_rho_sign_to_verdict_secondary(effect, expected):
    x, y, cl = _xy(effect)
    res = S.rho_test(x, y, [], cl, N_BOOT)
    assert res["n"] == 400 and res["n_clusters"] == 50
    v, _ = S._verdict_for(_row("spearman", res, exp="positive"), primary=False)
    assert v == expected


@pytest.mark.parametrize(
    ("effect", "expected"),
    [(0.8, SUPPORTED), (-0.8, CONTRADICTED), (0.0, NOT_SIGNIFICANT)],
)
def test_rho_sign_to_verdict_primary_uses_bh_p(effect, expected):
    x, y, cl = _xy(effect, seed=1)
    res = S.rho_test(x, y, [], cl, N_BOOT)
    res["p_bh"] = res["p_boot"]
    v, _ = S._verdict_for(_row("spearman", res, role="primary", exp="positive"), primary=True)
    assert v == expected


def test_auc_test_signal_vs_noise():
    rng = np.random.default_rng(3)
    n = 400
    x = rng.normal(size=(n, 3))
    groups = np.array([f"g{i // 10:02d}" for i in range(n)], dtype=object)  # 40 clusters
    y_sig = (x[:, 0] + 0.5 * rng.normal(size=n) > 0).astype(int)
    y_noise = rng.integers(0, 2, size=n)
    sig = S.auc_test(x, y_sig, groups, N_BOOT)
    noise = S.auc_test(x, y_noise, groups, N_BOOT)
    assert sig["estimate"] > 0.8 and sig["ci_low"] > 0.5
    v, _ = S._verdict_for(_row("oof_auc_logit", sig, hyp="H1"), primary=False)
    assert v == SUPPORTED
    v, _ = S._verdict_for(_row("oof_auc_logit", noise, hyp="H1"), primary=False)
    assert v == NOT_SIGNIFICANT


def test_auc_below_null_is_never_contradicted():
    row = _row("oof_auc_logit", {"estimate": 0.40, "ci_low": 0.35, "ci_high": 0.45}, hyp="H2")
    v, notes = S._verdict_for(row, primary=False)
    assert v == NOT_SIGNIFICANT and notes


def test_fewer_than_20_clusters_is_no_data():
    x, y, _ = _xy(0.8, n=120)
    cl = np.array([f"c{i // 10:02d}" for i in range(120)], dtype=object)  # 12 clusters
    res = S.rho_test(x, y, [], cl, N_BOOT)
    assert res["ci_low"] is None and res["p_boot"] is None
    v, _ = S._verdict_for(_row("spearman", res), primary=False)
    assert v == "NO DATA"


def _primary_family(ps: list[float | None], ests: list[float]) -> list[dict]:
    rows = []
    for h, p, e in zip(S.PRIMARY_ORDER, ps, ests, strict=True):
        est = (
            "oof_auc_logit"
            if h in ("H1", "H2")
            else ("partial_spearman" if h in ("H3a", "H3b") else "spearman")
        )
        exp = S.THESIS_HYPOTHESES[h]["suite_expected_dir"]
        r = _row(
            est,
            {"estimate": e, "ci_low": None, "ci_high": None, "p_boot": p},
            hyp=h,
            role="primary",
            exp=exp,
        )
        r["expected_dir"] = (
            "nondirectional" if h in ("H1", "H2") else ("ordering" if h in ("H3a", "H3b") else exp)
        )
        rows.append(r)
    return rows


def test_score_panel_bh_family_and_holds():
    panel = S.PANELS[("BER", "modern")]
    # H1 strong, H1a nominal only, H1b strong, H1c reversed, H2 ok, H3a nominal, H3b none, H3c none
    ps = [0.0005, 0.04, 0.0005, 0.0005, 0.0005, 0.045, 0.5, 0.9]
    ests = [0.75, -0.05, 0.40, 0.20, 0.62, -0.10, -0.01, 0.0]
    rows = _primary_family(ps, ests)
    meta = {"h2_incremental": {"ci_low": -0.01, "ci_high": 0.02}}
    S.score_panel(rows, panel, meta)
    by = {r["hypothesis"]: r for r in rows}
    assert by["H1"]["verdict"] == SUPPORTED and by["H1"]["holds"] == "holds"
    assert by["H1b"]["holds"] == "holds"
    assert by["H1c"]["verdict"] == CONTRADICTED
    assert "Tabelle 6-14" in by["H1c"]["holds"]
    # H2 SUPPORTED but the delta-AUC CI includes 0 -> explained by status level (§5.6).
    assert (
        by["H2"]["verdict"] == SUPPORTED
        and "explained by current status level" in by["H2"]["holds"]
    )
    # BH m = 8: 0.04 * 8 / 6 > 0.05 -> NOT SIGNIFICANT; H3a carries the N4 note.
    assert by["H3a"]["verdict"] == NOT_SIGNIFICANT
    assert by["H3a"]["holds"] == "consistent (rejected)"
    assert any("nominally significant" in n for n in by["H3a"]["notes"])
    assert by["H3b"]["holds"] == "not reproduced"
    assert meta["direction"] == "no directional evidence either way"


def test_nominal_significance_label_for_thesis_check_rows():
    panel = S.PANELS[("BER", "modern")]
    ps = [0.04, 0.9, 0.9, 0.9, 0.9, 0.9, 0.04, 0.9]
    ests = [0.58, 0.0, 0.0, 0.0, 0.5, 0.0, -0.05, 0.0]
    rows = _primary_family(ps, ests)
    S.score_panel(rows, panel, {})
    by = {r["hypothesis"]: r for r in rows}
    for h in ("H1", "H3b"):
        assert by[h]["verdict"] == NOT_SIGNIFICANT
        assert by[h]["holds"] == "not reproduced at the corrected threshold (nominally significant)"


def test_fdr_but_not_fwer_flag():
    panel = S.PANELS[("BER", "modern")]
    ps = [0.01, 0.012, 0.014, 0.016, 0.018, 0.02, 0.022, 0.9]
    ests = [0.7, -0.3, 0.3, -0.3, 0.7, -0.3, -0.3, 0.0]
    rows = _primary_family(ps, ests)
    S.score_panel(rows, panel, {})
    flagged = [r for r in rows if "significant at FDR 5%; not at family-wise 5%" in r["notes"]]
    assert flagged, "BH-significant primaries that fail Holm must be flagged (§5.5)"


# ---------------------------------------------------------------------------
# BH and Holm against hand-computed cases (§5.5)
# ---------------------------------------------------------------------------


def test_bh_hand_computed():
    # sorted: 0.005 (r1) 0.01 (r2) 0.03 (r3) 0.04 (r4); raw m/r*p: .02 .02 .04 .04
    assert bh_adjust([0.01, 0.04, 0.03, 0.005]) == pytest.approx([0.02, 0.04, 0.04, 0.02])
    # step-up: every adjusted value is min over larger ranks -> all 0.05
    assert bh_adjust([0.01, 0.02, 0.03, 0.04, 0.05]) == pytest.approx([0.05] * 5)
    # capped at 1
    assert bh_adjust([0.9, 0.8]) == pytest.approx([0.9, 0.9])


def test_holm_hand_computed():
    # sorted: 0.005*4=.02, 0.01*3=.03, 0.03*2=.06, 0.04*1=.04 -> running max .02 .03 .06 .06
    assert holm_adjust([0.01, 0.04, 0.03, 0.005]) == pytest.approx([0.03, 0.06, 0.06, 0.02])
    assert holm_adjust([0.5, 0.6]) == pytest.approx([1.0, 1.0])


def test_adjustments_skip_missing():
    assert bh_adjust([0.01, None, 0.04]) == [pytest.approx(0.02), None, pytest.approx(0.04)]
    assert holm_adjust([0.01, float("nan"), 0.04]) == [
        pytest.approx(0.02),
        None,
        pytest.approx(0.04),
    ]
    assert bh_adjust([None, None]) == [None, None]


# ---------------------------------------------------------------------------
# DHS growth (§5.1)
# ---------------------------------------------------------------------------


def test_dhs_zero_endpoints():
    g = S.dhs_growth(
        np.array([0.0, 2.0, 0.0, 1.0, 1.0, np.nan]), np.array([3.0, 0.0, 0.0, 1.0, 3.0, 1.0])
    )
    assert g[0] == pytest.approx(2.0)  # entry from zero
    assert g[1] == pytest.approx(-2.0)  # exit to zero
    assert np.isnan(g[2])  # 0/0 undefined
    assert g[3] == pytest.approx(0.0)
    assert g[4] == pytest.approx(1.0)  # (3 - 1) / 2
    assert np.isnan(g[5])
    assert np.all(np.abs(g[np.isfinite(g)]) <= 2.0)


# ---------------------------------------------------------------------------
# Leakage guards (§5.8): each invariant fires on a crafted violation
# ---------------------------------------------------------------------------


def test_guard1_construct_disjointness():
    S.assert_construct_disjoint("BER", ["oa_cat:Gastronomy|Cafe"], ["S_pivot", "D_P"], "S")
    S.assert_construct_disjoint("HH", ["g_commercial_c5"], ["ewr_composite"], "dynamik_class")
    with pytest.raises(AssertionError, match="forbidden"):
        S.assert_construct_disjoint(
            "HH", ["oa_cat:Gastronomy|Cafe"], ["unemployment_share"], "status_class"
        )
    with pytest.raises(AssertionError, match="forbidden"):
        S.assert_construct_disjoint("BER", ["displacement_subindex"], [], "S")
    with pytest.raises(AssertionError, match="forbidden"):
        S.assert_construct_disjoint("BER", ["oa_cat:Gastronomy|Cafe"], ["kinderarmut_anteil"], "S")
    with pytest.raises(AssertionError, match="allow-list"):
        S.assert_construct_disjoint("BER", ["brw_median"], [], "S")
    with pytest.raises(AssertionError, match="not a status variable"):
        S.assert_construct_disjoint("BER", ["oa_cat:Gastronomy|Cafe"], [], "oa_dom:Retail")
    with pytest.raises(AssertionError, match="non-POI predictor"):
        S.assert_construct_disjoint("BER", ["S_start"], [], "D", poi_only_predictors=True)


def test_guard1_status_inputs_meaning_named():
    S.assert_status_inputs("BER", S.BER_STATUS_LEVEL + S.BER_STATUS_CHANGE)
    with pytest.raises(AssertionError):
        S.assert_status_inputs("BER", ["alleinerziehende_anteil"])  # S2: excluded / legacy label
    with pytest.raises(AssertionError):
        S.assert_status_inputs("BER", ["poi_cafe"])
    with pytest.raises(AssertionError):
        S.assert_status_inputs("HH", ["unemployment_share"])


def test_guard2_temporal_order():
    ok = np.array([2019, 2021])
    S.assert_temporal_order("H2", ok, ok, ok, ok + 2)
    with pytest.raises(AssertionError, match="predictor window ends after"):
        S.assert_temporal_order("H2", [2019], [2021], [2019], [2021])
    with pytest.raises(AssertionError, match="predictor window ends after"):
        S.assert_temporal_order("H3a", [2019], [2023], [2021], [2023])
    with pytest.raises(AssertionError, match="windows differ"):
        S.assert_temporal_order("H3c", [2019], [2021], [2021], [2023])
    with pytest.raises(AssertionError, match="start-of-window control"):
        S.assert_temporal_order("H3b", [2019], [2021], [2021], [2023], control_year=[2021])


def test_guard3_grouped_cv():
    groups = np.array(["a", "a", "b", "b", "c", "c"])
    leakage_guard_groups(groups, [(np.array([0, 1, 2, 3]), np.array([4, 5]))])
    with pytest.raises(AssertionError, match="grouped-CV leak"):
        leakage_guard_groups(groups, [(np.array([0, 2, 3]), np.array([1, 4, 5]))])


def test_guard4_no_full_sample_preprocessing():
    rng = np.random.default_rng(0)
    x = rng.normal(size=(100, 3))
    x[::7, 1] = np.nan
    y = (x[:, 0] > 0).astype(int)
    train = np.arange(70)
    pipe = make_logit_pipeline().fit(x[train], y[train])
    assert_fold_local_preprocessing(pipe, x[train])
    leaky = make_logit_pipeline().fit(x, y)  # fitted on the full sample
    with pytest.raises(AssertionError):
        assert_fold_local_preprocessing(leaky, x[train])


def test_guard5_single_vintage():
    S.assert_single_vintage("lor_2021", np.array(["lor_2021", "lor_2021"], dtype=object))
    with pytest.raises(AssertionError):
        S.assert_single_vintage("lor_2021", np.array(["lor_2021", "lor_pre2021"], dtype=object))
    with pytest.raises(AssertionError):
        S.assert_single_vintage("lor_2021", np.array(["lor_2021", None], dtype=object))


# ---------------------------------------------------------------------------
# Feature-list rule (A1.1) and OA cell missingness
# ---------------------------------------------------------------------------


def test_fixed_feature_list_uses_flags_only_and_sorts():
    fr = pd.DataFrame(
        {
            "oa_cat:Retail|Tech": [1.0, 2.0, 0.0, 1.0, 1.0],
            "flag_cat:Retail|Tech": [False, True, True, True, True],  # 20% unflagged -> in
            "oa_cat:Gastronomy|Cafe": [1.0, 1.0, 1.0, 1.0, 1.0],
            "flag_cat:Gastronomy|Cafe": [False, False, True, True, True],
            "oa_cat:Other|Other": [np.nan] * 5,
            "flag_cat:Other|Other": [None] * 5,  # absent city-wide -> flagged
            "status": [9, 9, 9, 9, 9],
        }
    )
    assert S.fixed_feature_list(fr, "cat") == ["Gastronomy|Cafe", "Retail|Tech"]
    feats = S.oa_features(fr, ["Retail|Tech", "Missing|Key"], "cat")
    assert feats.iloc[0, 0] == 1.0 and feats.iloc[1:, 0].isna().all()
    assert feats.iloc[:, 1].isna().all()


# ---------------------------------------------------------------------------
# Determinism (§5.7, A1.5)
# ---------------------------------------------------------------------------


def _synthetic_rows() -> list[dict]:
    panel = S.PANELS[("BER", "modern")]
    rows = []
    for i, h in enumerate(S.PRIMARY_ORDER):
        x, y, cl = _xy(0.3 if i % 2 else 0.0, seed=i)
        res = S.rho_test(x, y, [], cl, N_BOOT)
        r = _row(
            "spearman", res, hyp=h, role="primary", exp=S.THESIS_HYPOTHESES[h]["suite_expected_dir"]
        )
        r.update(
            {
                "city": "BER",
                "panel": "modern",
                "window": "2019-2025",
                "pivots": "",
                "operationalisation": f"synthetic {h}",
                "predictor": "oa_cat:x",
                "outcome": "S",
                "controls": "",
                "grain": "plr_2021",
                "cluster_unit": "bzr",
                "n": res["n"],
                "n_clusters": res["n_clusters"],
                "p_analytic": res["p_analytic"],
                "thesis_verdict": S.THESIS_HYPOTHESES[h]["thesis_verdict"],
                "level_control": "none",
                "d4_control": False,
                "seed": S.SEED,
                "n_boot": N_BOOT,
                "run_sha": "test",
            }
        )
        rows.append(r)
    S.score_panel(rows, panel, {})
    return rows


def test_determinism_byte_identical_csv(tmp_path):
    a, b = tmp_path / "a.csv", tmp_path / "b.csv"
    S.write_results(S.rows_to_records(_synthetic_rows()), a, [("BER", "modern")])
    S.write_results(S.rows_to_records(_synthetic_rows()), b, [("BER", "modern")])
    assert a.read_bytes() == b.read_bytes()
    # a second write over an existing file replaces the panel's rows and stays identical
    S.write_results(S.rows_to_records(_synthetic_rows()), a, [("BER", "modern")])
    assert a.read_bytes() == b.read_bytes()


def test_determinism_grouped_auc():
    rng = np.random.default_rng(5)
    x = rng.normal(size=(300, 4))
    y = (x[:, 1] + rng.normal(size=300) > 0).astype(int)
    g = np.array([f"g{i // 6:02d}" for i in range(300)], dtype=object)
    r1, r2 = S.auc_test(x, y, g, N_BOOT), S.auc_test(x, y, g, N_BOOT)
    for k in ("estimate", "ci_low", "ci_high", "p_boot"):
        assert r1[k] == r2[k]
    assert np.array_equal(r1["oof"], r2["oof"])


def test_write_results_keeps_other_panels(tmp_path):
    path = tmp_path / "r.csv"
    recs = S.rows_to_records(_synthetic_rows())
    S.write_results(recs, path, [("BER", "modern")])
    other = [dict(r, panel="thesis-era") for r in recs]
    allr = S.write_results(other, path, [("BER", "thesis-era")])
    assert [r["panel"] for r in allr] == ["modern"] * 8 + ["thesis-era"] * 8
