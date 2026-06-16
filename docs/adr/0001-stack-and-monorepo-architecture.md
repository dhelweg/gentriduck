# ADR-0001: Stack & monorepo architecture

- **Status:** Accepted
- **Date:** 2026-06-17

## Context

Gentriduck revives a 2018 Hadoop/Hive/Java/R/Weka gentrification analysis and grows it into a
public, multi-city statistics website. Constraints: **free and open-source only**, **local-first**,
**reproducible across macOS / Windows / Linux**, and runnable by a team of AI agents. It must scale
from a single laptop to a hosted website without a stack change.

## Decision

**Data stack.** dbt (transformations) on **DuckDB** as a local file warehouse, with the `spatial`
extension for distance/geo work (replacing the original Java UDFs). **MotherDuck** (free tier) is
adopted later only to host/serve the website — the same dbt models run unchanged against it.

**Layering.** dbt models follow staging → intermediate → marts (views → views → tables).

**Python & isolation.** A single dedicated, `uv`-managed virtualenv (`.venv`) holds all Python
deps, including `dbt-duckdb`; nothing is installed globally and the machine's global dbt is never
touched. `uv.lock` + `.python-version` are committed for reproducibility. Everything runs via
`uv run`, fronted by a **`poethepoet`** task runner (`uv run poe <task>`) for OS-identical commands.

**Repo shape — monorepo** with these domains:

| Path | Purpose |
|---|---|
| `transform/` | dbt project (the warehouse logic) |
| `ingestion/` | Python data ingestion (OSM history, Berlin open data) |
| `web/` | public website (added in Epic G) |
| `docs/` | project plan + ADRs |
| `reference/` | original thesis SQL + golden outputs (read-only) |
| `data/` | local artefacts — gitignored, rebuilt from open sources |
| `.claude/` | agent + skill definitions |

**Quality gate.** Local-only (no cloud runners): the `pre-commit` framework auto-formats + lints at
commit (sqlfmt, ruff, sqlfluff) and runs `dbt build` + tests at push. Cross-platform hygiene via
`.gitattributes` (`eol=lf`).

**dbt profile** is kept repo-local (`transform/profiles.yml`) so `~/.dbt` is untouched.

## Consequences

- One language/tool surface (SQL + a little Python), cheap to run, trivially reproducible.
- DuckDB→MotherDuck is a target swap, not a migration.
- No cloud CI means we rely on the push-stage gate + `uv.lock` pinning to catch drift; accepted to
  stay fully free/local.
- Large/raw data and the `.duckdb` file are never committed; each machine rebuilds from open sources.
