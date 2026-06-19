[C3] Bring the analysis layer (`analysis/*.py`) under the gate: deterministic, tested, run in build/CI

## Why (problem)
The analysis scripts (`analysis/e1_regressions.py`, `analysis/e2_classification.py`, future E3/back-test) run
outside `poe build`, have no tests, and write their findings `.md` as a side effect of a manual run
(`e1_regressions.py` writes `OUTPUT_MD`). Wrong results cannot be caught by CI, and outputs can drift from the
code that produced them. This is how the §2.4 misframing reached committed findings docs unchallenged.

## Goal
The analysis layer is reproducible and gated like the dbt models: deterministic, tested, runnable in one command,
and exercised by the local push gate / CI.

## Scope & approach
1. Make scripts deterministic (fixed seeds; pinned inputs from the built DuckDB; no hidden state) and importable
   (functions returning results, thin `__main__`).
2. Add unit/smoke tests (e.g. `pytest`) over the analysis functions on a tiny fixture: shapes, known-sign sanity,
   no-leakage assertions (the E2 Task-B leakage should be a *tested* guard, not just prose).
3. Add a `poe analysis` task and include analysis tests in the push-stage gate (and CI if/when present), so
   `uv run poe build`/gate covers them.
4. Treat generated findings `.md` as build artifacts (regenerated, not hand-edited) or clearly mark provenance.

## Acceptance criteria
- `uv run poe analysis` reproduces E1/E2 (and back-test) deterministically.
- Analysis tests run in the gate and fail on regressions (incl. a leakage guard).
- Findings docs are regenerated from code; provenance noted.
- `uv run poe build` green.

## Gate / sign-off
Architect + data-engineer-reviewer. geo-DS confirms the sanity/leakage tests are meaningful.

## Dependencies / relations
Enables A2 and B2 to run under the gate. Independent of A-group; can start anytime.

## References
- `analysis/e1_regressions.py`, `analysis/e2_classification.py`, `pyproject.toml` (poe tasks)
- `docs/assessment/2026-06-19-pm-architect-review.md` §3 (O3)
