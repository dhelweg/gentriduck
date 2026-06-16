# Gentriduck

Reviving a 2018 master thesis — *"Measurement of Gentrification in Berlin via Big Data
Analytics"* — on a modern, local-first, open-source data stack, and growing it into a public
website of **gentrification & social-development statistics** for Berlin (and, later, other cities).

- **Stack:** [dbt](https://www.getdbt.com/) + [DuckDB](https://duckdb.org/) (local) → MotherDuck (later) · Python ([uv](https://docs.astral.sh/uv/))
- **Data:** OpenStreetMap (© OpenStreetMap contributors, ODbL) + Berlin open data — **free & open only**
- **Status:** bootstrapping (Epic A). See the roadmap below.

## Repository layout (monorepo)

| Path | Purpose |
|---|---|
| `transform/` | dbt project (staging → intermediate → marts) |
| `ingestion/` | Python data ingestion (OSM history, Berlin open data) |
| `web/` | public website (added later) |
| `docs/` | project plan + architecture decision records (`docs/adr/`) |
| `reference/` | original thesis SQL + golden output CSVs (read-only reference) |
| `data/` | local data artefacts — **gitignored**, rebuilt from open sources |
| `.claude/` | agent + skill definitions for the agent team |

## Roadmap

The full plan lives in [`docs/PROJECT_PLAN.md`](docs/PROJECT_PLAN.md); the live backlog is the
**Gentriduck** GitHub Project board. Epics: **A** foundations · **B** revive the 2018 concept ·
**C** longitudinal OSM POI history · **D** price/rent dimension · **E** analysis & ML ·
**F** serving + MotherDuck · **G** public website · **H** multi-city.

## Setup

> Detailed per-OS setup (macOS / Windows / Linux) is added in task A11.

Prerequisites: [`uv`](https://docs.astral.sh/uv/), [`gh`](https://cli.github.com/), and the
[`duckdb`](https://duckdb.org/docs/installation/) CLI.

```bash
uv sync                 # create the isolated .venv and install deps
uv run poe build        # run the dbt build (added in A5/A11)
```

## Licence

Code: [MIT](LICENSE). Data: under the respective source licences (OSM = ODbL, with attribution).
