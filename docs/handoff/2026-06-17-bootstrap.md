# Session handoff — 2026-06-17 — Bootstrap (Epic A)

A readable record of the bootstrap session so anyone (human or agent) opening this repo can pick up
with full context. The full plan is in [`../PROJECT_PLAN.md`](../PROJECT_PLAN.md); decisions are in
[`../adr/`](../adr/README.md); the live backlog is the **Gentriduck** GitHub Project.

## What this project is
Reviving a 2018 Berlin gentrification master thesis on a modern, **free / open / local-first** stack
(dbt + DuckDB → MotherDuck later), growing into a public, **multi-city** statistics website. Built by
a team of agents (see `.claude/agents/` and `../../CLAUDE.md`).

## Done this session (Epic A foundations)
- **Repo + board:** public repo `dhelweg/gentriduck`; GitHub Project "Gentriduck" with the full A–H
  backlog seeded as 40 issues.
- **Monorepo scaffold:** `transform/` (dbt), `ingestion/`, `web/`, `docs/`, `reference/`, `data/`
  (gitignored), `.claude/`. MIT licence (code) + ODbL note (data). `.gitattributes` (`eol=lf`),
  `.python-version`, `.env.example`.
- **Isolated env (A5):** `uv`-managed `.venv`; dbt 1.11 + dbt-duckdb + spatial; dbt project in
  `transform/` with a repo-local DuckDB profile. `uv run poe debug` passes; `ST_Distance` verified.
- **Quality gate (A7):** `pre-commit` — commit-stage auto-format (sqlfmt, ruff) + lint (sqlfluff),
  push-stage `dbt build`. Verified on real commits/pushes.
- **ADRs:** 0001 stack & monorepo · 0004 governance + governed index definition · 0005 city-agnostic
  data model (`dim_city`/`dim_area` + adapters + parameterized index). Index in `../adr/`.
- **Agent team (A6):** `project-manager`, `system-architect`, `data-engineer` (+ reviewer),
  `geo-data-scientist`, `data-analyst`; skills `de-implement` / `de-review`; conventions in `CLAUDE.md`.
  Web-engineer pair is added at Epic G (task G0).

### Key decisions
- **Free + open only**; no proprietary/internal data. Public repo.
- **Local-first** DuckDB; MotherDuck (free tier) only for hosting later — same dbt models.
- **City-agnostic from day one**, Berlin populated first (ADR-0005).
- **Privacy:** commits use a repo-local GitHub `noreply` identity (no real name / work email in history).
- **Epic B is a *directional* revival** — check whether the 2018 findings still hold; exact
  number-for-number reproduction is **not** required.

## Issue status
- **Closed (8):** A1, A1b, A4, A5, A6, A7, A9, A10.
- **Open in Epic A:** A2 & A3 (ADRs — deliberately deferred *just-in-time* before Epics C/D);
  A8 & A11 (mostly satisfied by the scaffold; finish the "rebuild data" + per-OS README sections once
  ingestion exists).

## Next step
**Epic B** — start with **B0** (inventory what the thesis repo actually provides vs what's missing,
choose a pragmatic input approach), then B1→B6. Recommended to run via the **project-manager** agent
so the coder↔reviewer loop drives it.

## Continuity notes
- This session's raw transcript is kept locally at `.sessions/` (gitignored — never published).
- Project memory is seeded for this repo's project dir, so a fresh session opened here auto-recalls
  the project, the privacy preference, and the guided-execution preference.
