"""
tests/analysis/test_e1_regressions_determinism.py
=================================================
#364: analysis/e1_regressions.py must give the same bootstrap CIs whatever row order the
warehouse returns. The cluster bootstrap draws clusters in first-appearance order, so the
script (1) ends every SQL load in ORDER BY and (2) sorts each cross-lagged frame on its keys
before the bootstrap. Also guards the Windows cp1252 console fix from the same issue.
"""

from __future__ import annotations

import ast
import io
import sys
from pathlib import Path

import pytest

from analysis import e1_regressions as e1
from analysis.directional_inference import build_cross_lagged, cross_lagged_tests
from tests.analysis.test_directional_inference import _panel

E1_PATH = Path(__file__).resolve().parents[2] / "analysis" / "e1_regressions.py"


def _dataframe_load_queries() -> list[str]:
    """SQL text of every `con.execute(<sql>).df()` call in e1_regressions.py."""
    tree = ast.parse(E1_PATH.read_text(encoding="utf-8"))
    queries = []
    for node in ast.walk(tree):
        # <expr>.df() where <expr> is a call to .execute(...)
        if (
            isinstance(node, ast.Call)
            and isinstance(node.func, ast.Attribute)
            and node.func.attr == "df"
            and isinstance(node.func.value, ast.Call)
            and isinstance(node.func.value.func, ast.Attribute)
            and node.func.value.func.attr == "execute"
        ):
            arg = node.func.value.args[0]
            if isinstance(arg, ast.Constant):
                queries.append(arg.value)
            elif isinstance(arg, ast.JoinedStr):
                queries.append("".join(v.value for v in arg.values if isinstance(v, ast.Constant)))
            else:  # pragma: no cover - a non-literal query would be unverifiable
                pytest.fail(f"non-literal SQL in a DataFrame load at line {node.lineno}")
    return queries


def test_every_dataframe_load_is_ordered() -> None:
    queries = _dataframe_load_queries()
    assert len(queries) >= 7, f"expected the 7 known DataFrame loads, found {len(queries)}"
    unordered = [q.strip()[:80] for q in queries if "ORDER BY" not in q.upper()]
    assert not unordered, f"SQL loads without ORDER BY (#364): {unordered}"


def test_cross_lagged_result_independent_of_row_order() -> None:
    """Same panel, shuffled rows -> identical estimates AND bootstrap CIs after the sort."""
    panel = _panel("h3a")
    shuffled = panel.sample(frac=1.0, random_state=7).reset_index(drop=True)
    cl_a = build_cross_lagged(panel, k=1)
    cl_b = build_cross_lagged(shuffled, k=1)
    # Precondition: the shuffle really reorders the bootstrap input.
    assert cl_a["area_code"].tolist() != cl_b["area_code"].tolist()

    res_a = cross_lagged_tests(e1._sort_cross_lagged(cl_a), seed=e1.SEED, n_boot=199)
    res_b = cross_lagged_tests(e1._sort_cross_lagged(cl_b), seed=e1.SEED, n_boot=199)
    for hyp in ("H3a", "H3b"):
        for key in ("rho", "p", "n", "ci_low", "ci_high", "n_clusters", "p_boot"):
            assert res_a[hyp][key] == res_b[hyp][key], (hyp, key)


def test_force_utf8_console_survives_cp1252(monkeypatch: pytest.MonkeyPatch) -> None:
    raw = io.BytesIO()
    cp1252 = io.TextIOWrapper(raw, encoding="cp1252")
    monkeypatch.setattr(sys, "stdout", cp1252)
    monkeypatch.setattr(sys, "stderr", io.TextIOWrapper(io.BytesIO(), encoding="utf-8"))
    e1._force_utf8_console()
    print("2014→2016 – ok")  # raised UnicodeEncodeError on cp1252 before #364
    sys.stdout.flush()
    assert "2014→2016 – ok" in raw.getvalue().decode("utf-8")
