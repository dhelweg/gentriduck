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


# ---------------------------------------------------------------------------
# §5.8(2) on real data years: frames built from a crafted PanelData (review M1)
# ---------------------------------------------------------------------------


def _crafted_panel_data() -> S.PanelData:
    """A tiny BER/modern-shaped PanelData: 40 PLRs in 20 BZRs, snapshots 2019-2025."""
    panel = S.PANELS[("BER", "modern")]
    rng = np.random.default_rng(11)
    codes = [f"{100000 + i // 2:06d}{i % 2:02d}" for i in range(40)]
    status = []
    for ed in (2021, 2023, 2025):
        for c in codes:
            status.append(
                {
                    "area_code": c,
                    "edition": ed,
                    "S": rng.normal(),
                    "D": rng.normal(),
                    "S_start_rebuilt": rng.normal(),
                    "S_cls": float(rng.integers(1, 5)),
                    "D_cls": float(rng.integers(1, 4)),
                    "d_start_year": ed - 2,
                    "s_start_year": float(ed - 2),
                }
            )
    oa, c5 = [], []
    for y in (2019, 2021, 2023, 2025):
        for c in codes:
            for dom in S.COMMERCIAL_DOMAINS:
                oa.append(
                    (
                        c,
                        y,
                        "lor_2021",
                        "domain",
                        dom,
                        "",
                        rng.uniform(0.5, 1.5),
                        False,
                        20.0,
                        80.0,
                        2000.0,
                        8000.0,
                    )
                )
            oa.append(
                (
                    c,
                    y,
                    "lor_2021",
                    "category",
                    "Gastronomy",
                    "Cafe",
                    rng.uniform(0.5, 1.5),
                    False,
                    5.0,
                    20.0,
                    500.0,
                    2000.0,
                )
            )
            c5.append((c, y, "lor_2021", rng.uniform(0.01, 0.05), rng.uniform(0.01, 0.05)))
    oa_cols = [
        "area_code",
        "snapshot_year",
        "area_vintage",
        "oa_level",
        "poi_domain_h",
        "poi_category_h",
        "oa_value",
        "oa_min_base_flag",
        "level_stock_local",
        "parent_stock_local",
        "level_stock_city",
        "parent_stock_city",
    ]
    return S.PanelData(
        panel=panel,
        status=pd.DataFrame(status),
        h1_status=pd.DataFrame({"area_code": codes, "status": rng.normal(size=40), "S_cls": 2.0}),
        oa=pd.DataFrame(oa, columns=oa_cols),
        c5=pd.DataFrame(
            c5,
            columns=[
                "area_code",
                "snapshot_year",
                "area_vintage",
                "commercial_c5_share",
                "total_c5_share",
            ],
        ),
        types=pd.DataFrame(
            columns=[
                "area_code",
                "snapshot_year",
                "area_vintage",
                "poi_domain_h",
                "poi_category_h",
                "poi_type_h",
                "poi_count",
            ]
        ),
        pop=pd.DataFrame(columns=["area_code", "year", "residents"]),
        d4=pd.DataFrame({"area_code": codes, "year": 2020, "ewr_composite": rng.normal(size=40)}),
        clusters=pd.DataFrame({"area_code": codes, "cluster": [c[:6] for c in codes]}),
        source_attrs={},
    )


def test_h2_frame_carries_data_years_and_rejects_a_wrong_oa_snapshot():
    pdata = _crafted_panel_data()
    fr = S.h2_frame(pdata, pdata.panel.windows)
    assert set(fr["pred_end"]) == {2019.0, 2021.0, 2023.0}  # OA snapshot actually joined
    assert set(fr["out_start"]) == {2019.0, 2021.0, 2023.0}  # Dynamik start of edition
    # loader bug simulation: the window-start OA slot holds the window-END snapshot
    bad = _crafted_panel_data()
    bad._wide_cache[2019] = S.oa_wide(bad, 2021)
    with pytest.raises(AssertionError, match="predictor window ends after"):
        S.h2_frame(bad, bad.panel.windows)


def test_cross_lag_guard_fires_on_a_swapped_level_column():
    pdata = _crafted_panel_data()
    rows = S.window_rows(pdata, pdata.panel.windows)
    good = S.cross_lag_frame(rows, "D", "g_commercial_c5", "S_end", "S_start")
    S.assert_cross_lag_order(good, "H3a", "pivot")
    S.assert_cross_lag_order(good, "H3b", "window_start")
    # S_end (published at the pivot) passed as the start-of-window control
    swapped = S.cross_lag_frame(rows, "D", "g_commercial_c5", "S_end", "S_end")
    with pytest.raises(AssertionError, match="start-of-window control"):
        S.assert_cross_lag_order(swapped, "H3b", "window_start")


def test_cross_lag_and_h3c_guards_fire_on_wrong_status_years():
    pdata = _crafted_panel_data()
    rows = S.window_rows(pdata, pdata.panel.windows)
    S.assert_same_window(rows, "g_commercial_c5", "D")
    # status change of the later windows taken from a 4-year span starting before the pivot
    bad = rows.copy()
    bad.loc[bad["w_start"] >= 2021, "d_start_year"] -= 2
    cl = S.cross_lag_frame(bad, "D", "g_commercial_c5", "S_end", "S_start")
    with pytest.raises(AssertionError, match="predictor window ends after"):
        S.assert_cross_lag_order(cl, "H3a", "pivot")
    with pytest.raises(AssertionError, match="windows differ"):
        S.assert_same_window(bad, "g_commercial_c5", "D")


def test_delta_auc_is_directional():
    row = _row("delta_auc", {"estimate": -0.018, "ci_low": -0.035, "ci_high": -0.003}, hyp="H2")
    v, notes = S._verdict_for(row, primary=False)
    assert v == CONTRADICTED
    assert notes == ["adding OA significantly lowers out-of-fold AUC once status level is included"]


# ---------------------------------------------------------------------------
# Domain sign-off C2 / C3 / C4
# ---------------------------------------------------------------------------


def test_tie_ceiling_matches_closed_form_and_untied_case():
    # shares 0.1 / 0.8 / 0.1: midrank fractions 0.05, 0.5, 0.95
    c = np.repeat([1.0, 2.0, 3.0], [100, 800, 100])
    p, m = np.array([0.1, 0.8, 0.1]), np.array([0.05, 0.5, 0.95])
    closed = np.sqrt(12 * np.sum(p * (m - 0.5) ** 2))
    assert S.tie_ceiling(c) == pytest.approx(closed, abs=2e-3)
    assert S.tie_ceiling(np.arange(50.0)) == pytest.approx(1.0)
    assert S.tie_ceiling(np.ones(10)) is None


def test_no_data_rows_publish_no_estimate():
    panel = S.PANELS[("BER", "modern")]
    rows = _primary_family([0.5] * 8, [0.6, 0.0, 0.0, 0.0, 0.6, 0.0, 0.0, 0.0])
    sec = _row("spearman", {"estimate": -0.716, "ci_low": None, "ci_high": None}, hyp="H1c")
    sec.update({"n_clusters": 17, "p_analytic": 0.001})
    assert sec["effect_label"] == "large"
    rows.append(sec)
    S.score_panel(rows, panel, {})
    assert sec["verdict"] == "NO DATA"
    assert sec["estimate"] is None and sec["effect_label"] == "" and sec["p_analytic"] is None
    assert "not reported: < 20 clusters" in sec["notes"]
    rec = S.rows_to_records([dict(sec, **{k: "" for k in S.CSV_COLUMNS if k not in sec})])[0]
    assert rec["estimate"] == "" and rec["effect_label"] == ""


def test_thesis_era_shock_line_uses_computed_means():
    txt = S._shock_text({"mean_arbeitslose_dynamik": {"2015": -0.68, "2017": -0.9, "2019": -0.97}})
    assert "Thesis era (D_2015, D_2017, D_2019)" in txt
    assert "-0.68, -0.90, -0.97 pp" in txt
    assert txt.index("Thesis era") < txt.index("The warehouse has no")


# ---------------------------------------------------------------------------
# #355 Hamburg specifics: forbidden predictors, 3-year Dynamik spacing, class-only
# outcomes, low-power rule, shock timing, end-to-end on a crafted HH panel
# ---------------------------------------------------------------------------


def test_hh_forbidden_predictors_and_controls():
    """§4.1 / #329 / §5.8(1): unemployment_share is a Sozialmonitoring input and is barred
    from every Hamburg predictor and control; so are D5 / displacement_subindex."""
    for bad in ("unemployment_share", "displacement_subindex", "d5"):
        assert bad in S.FORBIDDEN["HH"]
        with pytest.raises(AssertionError, match="forbidden"):
            S.assert_construct_disjoint("HH", [bad], [], "status_class")
        with pytest.raises(AssertionError, match="forbidden"):
            S.assert_construct_disjoint("HH", ["g_commercial_c5"], [bad], "dynamik_class")
        # suffixed names (pivot/window tags) are caught too
        with pytest.raises(AssertionError, match="forbidden"):
            S.assert_construct_disjoint("HH", ["oa_cat:Gastronomy|Cafe"], [f"{bad}@P"], "D")
    # the #329 D4 composite (no unemployment_share) is the only allowed context control
    S.assert_construct_disjoint(
        "HH", ["g_commercial_c5@P"], ["D_P", "S_pivot", "ewr_composite"], "dynamik_class"
    )
    with pytest.raises(AssertionError, match="allow-list"):
        S.assert_construct_disjoint(
            "HH", ["g_commercial_c5"], ["foreigners_share"], "dynamik_class"
        )


def test_hh_status_inputs_are_class_only():
    """§4.1: Hamburg status variables come only from the published classes."""
    S.assert_status_inputs("HH", ["status_index", "dynamik_index"])
    for bad in ("unemployment_share", "arbeitslose_anteil", "status_summe", "oa_basket"):
        with pytest.raises(AssertionError):
            S.assert_status_inputs("HH", [bad])


def test_hh_windows_step_in_three_years():
    """§4.3: Hamburg Dynamik covers 3 years, so every chain steps in contiguous,
    non-overlapping 3-year windows and the pivots are the inner window ends."""
    assert S.DYNAMIK_SPAN["HH"] == 3
    full, modern = S.PANELS[("HH", "full")], S.PANELS[("HH", "modern")]
    assert full.windows == ((2013, 2016), (2016, 2019), (2019, 2022), (2022, 2025))
    assert full.pivots == (2016, 2019, 2022)
    assert modern.windows == ((2019, 2022), (2022, 2025)) and modern.pivots == (2022,)
    for chain in (full.windows, modern.windows, *full.phase_chains):
        assert all(e - s == 3 for s, e in chain)
        assert all(a[1] == b[0] for a, b in zip(chain, chain[1:], strict=False))
    assert [tuple(e for _s, e in ch) for ch in full.phase_chains] == [
        (2014, 2017, 2020, 2023),
        (2015, 2018, 2021, 2024),
    ]
    assert full.h1_edition == full.h1_snapshot == modern.h1_edition == 2025
    assert full.cluster_unit == modern.cluster_unit == "stadtteil"


def test_hh_shock_notes_cover_the_binding_windows():
    """§4.3 / D7: the window ending 2022 contains the pandemic; the window ending 2025 the
    Rechtskreiswechsel and the 2023 reforms; HH/modern carries both."""
    n22, n25 = S.hh_shock_notes(2019, 2022), S.hh_shock_notes(2022, 2025)
    assert any("pandemic" in n for n in n22)
    assert any("Rechtskreiswechsel" in n for n in n25) and any("2023" in n for n in n25)
    assert not any("pandemic" in n for n in n25)
    assert S.hh_shock_notes(2013, 2016) == []
    modern = S.PANELS[("HH", "modern")]
    assert set(modern.shock_notes) == {(2019, 2022), (2022, 2025)}
    # Berlin's shock notes are untouched (only the W1 mechanism note)
    assert set(S.PANELS[("BER", "modern")].shock_notes) == {(2019, 2021)}


def test_hh_low_power_rule():
    """§4.4: Hamburg H2 with a NA CI or one wider than 0.25 -> NOT SIGNIFICANT, low power."""
    wide = {
        "verdict": SUPPORTED,
        "ci_low": 0.50,
        "ci_high": 0.80,
        "notes": [],
        "role": "primary",
        "holds": "x",
    }
    S._low_power(wide)
    assert wide["verdict"] == NOT_SIGNIFICANT and wide["holds"] == "consistent (still unclear)"
    assert any("low power" in n for n in wide["notes"])
    na = {
        "verdict": NOT_SIGNIFICANT,
        "ci_low": None,
        "ci_high": None,
        "notes": [],
        "role": "secondary",
        "holds": "",
    }
    S._low_power(na)
    assert any("low power" in n for n in na["notes"])
    narrow = {
        "verdict": SUPPORTED,
        "ci_low": 0.55,
        "ci_high": 0.70,
        "notes": [],
        "role": "primary",
        "holds": "x",
    }
    S._low_power(narrow)
    assert narrow["verdict"] == SUPPORTED and narrow["notes"] == []


OA_COLS = [
    "area_code",
    "snapshot_year",
    "area_vintage",
    "oa_level",
    "poi_domain_h",
    "poi_category_h",
    "oa_value",
    "oa_min_base_flag",
    "level_stock_local",
    "parent_stock_local",
    "level_stock_city",
    "parent_stock_city",
]
TYPE_COLS = [
    "area_code",
    "snapshot_year",
    "area_vintage",
    "poi_domain_h",
    "poi_category_h",
    "poi_type_h",
    "poi_count",
]


def _crafted_hh_panel_data(key: str = "full", seed: int = 7) -> S.PanelData:
    """A small HH-shaped PanelData: 80 Gebiete in 25 Stadtteile, editions 2013-2025,
    snapshots 2011-2025. Classes only (status 1-4, Dynamik 1-3)."""
    panel = S.PANELS[("HH", key)]
    rng = np.random.default_rng(seed)
    codes = [f"{10000 + i:05d}" for i in range(80)]
    status = []
    for ed in range(2013, 2026):
        for c in codes:
            s_cls = int(rng.choice([1, 2, 3, 4], p=[0.18, 0.64, 0.09, 0.09]))
            d_cls = int(rng.choice([1, 2, 3], p=[0.12, 0.76, 0.12]))
            status.append(
                {
                    "area_code": c,
                    "edition": ed,
                    "S_cls": s_cls,
                    "D_cls": d_cls,
                    "S": float(s_cls),
                    "D": float(d_cls),
                    "S_start_rebuilt": np.nan,
                    "d_start_year": ed - 3,
                    "s_start_year": np.nan,
                }
            )
    doms = ("Gastronomy", "Retail", "Services", "Entertainment", "Public Space", S.SPORT_DOMAIN)
    cats = (
        ("Gastronomy", "Cafe"),
        ("Gastronomy", "Fast Food"),
        ("Public Space", "Bench"),
        ("Public Space", "Recycling"),
    )
    oa, c5 = [], []
    for y in range(2011, 2026):
        for i, c in enumerate(codes):
            tot = 40.0 + i
            for dom in doms:
                oa.append(
                    (c, y, "current", "domain", dom, "", rng.uniform(0.3, 1.7), False)
                    + (8.0, tot, 800.0, 4000.0)
                )
            for dom, cat in cats:
                flagged = dom == "Gastronomy" and i % 5 == 0  # parent base < 10 in 20%
                oa.append(
                    (c, y, "current", "category", dom, cat, rng.uniform(0.0, 2.0), flagged)
                    + (3.0, 12.0, 300.0, 1200.0)
                )
            c5.append((c, y, "current", rng.uniform(0.0, 0.03), rng.uniform(0.005, 0.03)))
    st = pd.DataFrame(status)
    s25 = st[st["edition"] == 2025]
    pub = [(2025, "status", k, int((s25["S_cls"] == k).sum())) for k in (1, 2, 3, 4)]
    pub += [(2025, "dynamik", k, int((s25["D_cls"] == k).sum())) for k in (1, 2, 3)]
    pub.append((2022, "status", 1, -1))  # a deliberate mismatch: must be reported as NO
    h1 = s25[["area_code", "S", "S_cls"]].rename(columns={"S": "status"})
    return S.PanelData(
        panel=panel,
        status=st,
        h1_status=h1.reset_index(drop=True),
        oa=pd.DataFrame(oa, columns=OA_COLS),
        c5=pd.DataFrame(
            c5,
            columns=[
                "area_code",
                "snapshot_year",
                "area_vintage",
                "commercial_c5_share",
                "total_c5_share",
            ],
        ),
        types=pd.DataFrame(columns=TYPE_COLS).astype({"snapshot_year": int, "poi_count": float}),
        pop=pd.DataFrame({"area_code": codes, "year": 2025, "residents": 2000.0}),
        d4=pd.DataFrame(
            [(c, y, float(rng.normal())) for y in range(2012, 2025) for c in codes],
            columns=["area_code", "year", "ewr_composite"],
        ),
        clusters=pd.DataFrame(
            {"area_code": codes, "cluster": [f"Stadtteil {i % 25:02d}" for i in range(80)]}
        ),
        source_attrs={"status": "WFS de.hh.up:sozialmonitoring statusindex / dynamikindex"},
        published_counts=pd.DataFrame(
            pub, columns=["edition", "index_name", "expected_code", "n_gebiete"]
        ),
        context={"n_gebiete_stadtteil_label_varies": 0},
    )


def test_hh_frames_use_three_year_dynamik_and_class_level_controls():
    pdata = _crafted_hh_panel_data()
    fr = S.h2_frame(pdata, pdata.panel.windows)
    # predictor = OA at the window start E-3; outcome = Dynamik of edition E over [E-3, E]
    assert set(fr["out_end"] - fr["out_start"]) == {3.0}
    assert set(fr["pred_end"]) == {2013.0, 2016.0, 2019.0, 2022.0}
    rows = S.window_rows(pdata, pdata.panel.windows)
    # H3b level control = status CLASS at edition E-3, dated E-3 (§4.3)
    assert (rows["s_start_year"] == rows["w_start"]).all()
    assert set(rows["S_start"].dropna().unique()) <= {1.0, 2.0, 3.0, 4.0}
    cl = S.cross_lag_frame(rows, "D", "g_commercial_c5", "S_end", "S_start")
    S.assert_cross_lag_order(cl, "H3b", "window_start")
    assert sorted(cl["pivot"].unique()) == [2016, 2019, 2022]
    # a loader bug that puts the window-END OA in the start slot is caught (§5.8(2))
    bad = _crafted_hh_panel_data()
    bad._wide_cache[2013] = S.oa_wide(bad, 2016)
    with pytest.raises(AssertionError, match="predictor window ends after"):
        S.h2_frame(bad, bad.panel.windows)


def _run_hh(key: str):
    run = S.SuiteRun(_crafted_hh_panel_data(key), n_boot=19, run_sha="test")
    rows = run.run()
    return rows, run.meta


def test_hh_suite_end_to_end_on_crafted_panel():
    rows, meta = _run_hh("full")
    prim = [r for r in rows if r["role"] == "primary"]
    assert sorted(r["hypothesis"] for r in prim) == sorted(S.PRIMARY_ORDER)
    # class-only outcomes, rank / logit estimators only: no OLS anywhere (index-def. §3.2)
    assert {r["estimator"] for r in rows} <= {
        "spearman",
        "partial_spearman",
        "oof_auc_logit",
        "delta_auc",
        "partial_spearman_diff",
    }
    assert {r["grain"] for r in rows} == {"hh_gebiet"}
    assert {r["cluster_unit"] for r in rows} == {"stadtteil"}
    by = {r["hypothesis"]: r for r in prim}
    assert "{3,4} vs {1,2}" in by["H1"]["operationalisation"]
    assert "negativ (3) vs rest (predicts worsening)" in by["H2"]["operationalisation"]
    assert any(
        r["hypothesis"] == "H2"
        and "positiv (1) vs rest (predicts improvement)" in r["operationalisation"]
        for r in rows
    )
    # every Hamburg H1a-c primary names the construct (§4.5)
    for h in ("H1a", "H1b", "H1c"):
        assert S.HH_CONSTRUCT_NOTE in by[h]["notes"]
        assert "Sozialmonitoring Statusindex class 2025" in by[h]["outcome"]
    # the pandemic window note reaches the pooled H2/H3c primaries (§4.3)
    assert any("pandemic" in n for n in by["H2"]["notes"])
    assert any("pandemic" in n for n in by["H3c"]["notes"])
    # phase-chain H3b has no 2014/2015 pivot (class 2011/2012 not in the data)
    ph = [r for r in rows if r["operationalisation"].startswith("H3b phase-shift chain")]
    assert [r["pivots"] for r in ph] == ["2017;2020", "2018;2021"]
    assert all(
        any("predates the first Sozialmonitoring edition" in n for n in r["notes"]) for r in ph
    )
    # D4 rows state the Stadtteil grain
    d4 = [r for r in rows if r["d4_control"]]
    assert d4 and all(any("about 99 independent values" in n for n in r["notes"]) for r in d4)
    # class context: published-count check and tie ceilings
    cls = {c["edition"]: c for c in meta["hh_classes"]}
    assert cls[2025]["matches_published"] is True
    assert cls[2022]["matches_published"] is False
    assert cls[2013]["matches_published"] is None
    assert 0 < cls[2025]["ceiling_dynamik"] < 1


def test_hh_findings_side_by_side_and_deterministic(tmp_path):
    def build(path):
        rows_f, meta_f = _run_hh("full")
        rows_m, meta_m = _run_hh("modern")
        recs = S.rows_to_records(rows_f + rows_m)
        meta = S._json_clean({"HH/full": meta_f, "HH/modern": meta_m})
        S.write_hamburg_findings(path, recs, meta)
        csv_path = path.with_suffix(".csv")
        S.write_results(recs, csv_path, [("HH", "full"), ("HH", "modern")])
        return path.read_bytes(), csv_path.read_bytes()

    (a_md, a_csv), (b_md, b_csv) = build(tmp_path / "a.md"), build(tmp_path / "b.md")
    assert a_md == b_md and a_csv == b_csv  # §5.7 byte-identical reruns
    txt = a_md.decode("utf-8")
    for needle in (
        "Hamburg full chain 2013–2025 (primary) | Hamburg pivot 2022 (era split)",
        "Matches Berlin 2018?",
        "a matching verdict is\nnot evidence that they are the same",
        "Kinder und Jugendliche mit Migrationshintergrund",
        "## 6. Phase-shift sensitivity",
        "## 7. Hamburg shock timing",
        "contains the pandemic",
        "Rechtskreiswechsel",
        "Pivot 2016 is the pivot most exposed to OSM completeness artefacts",
        "WFS used by the warehouse publishes classes only",
        "31 Dec (E−1)",
        "Low-power rule (§4.4)",
        "## 16. Deviations from the pre-registration",
        "e5_hamburg_lead_lag.py",
    ):
        assert needle in txt, needle


def test_e5_retired_from_poe_analysis():
    """§6.3: E5 is superseded: out of `poe analysis`, the HH suite in after BER, and the
    E5 findings keep the generator's pointer to the Hamburg suite findings."""
    import tomllib
    from pathlib import Path

    from analysis import e5_hamburg_lead_lag as e5

    repo = Path(S.__file__).resolve().parent.parent
    pyproject = tomllib.loads((repo / "pyproject.toml").read_text(encoding="utf-8"))
    seq = pyproject["tool"]["poe"]["tasks"]["analysis"]["sequence"]
    assert not any("e5_hamburg_lead_lag" in c for c in seq)
    assert seq.index("python analysis/thesis_hypothesis_suite.py --city BER") < seq.index(
        "python analysis/thesis_hypothesis_suite.py --city HH"
    )
    assert "SUPERSEDED (#355" in e5.SUPERSEDED_NOTICE
    assert "H-thesis-hypothesis-suite-findings.md" in e5.SUPERSEDED_NOTICE
    e5_md = repo / "docs" / "epic-h" / "E5-hamburg-lead-lag-findings.md"
    assert e5.SUPERSEDED_NOTICE.strip() in e5_md.read_text(encoding="utf-8")
