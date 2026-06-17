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

The full plan lives in [`docs/PROJECT_PLAN.md`](docs/PROJECT_PLAN.md); architecture decisions are
recorded in [`docs/adr/`](docs/adr/README.md); the live backlog is the **Gentriduck** GitHub
Project board. Epics: **A** foundations · **B** revive the 2018 concept · **C** longitudinal OSM POI
history · **D** price/rent dimension · **E** analysis & ML · **F** serving + MotherDuck ·
**G** public website · **H** multi-city.

## Setup on macOS / Windows / Linux

The repo is checked out and run on **all three** OSes. All commands below go through
[`uv`](https://docs.astral.sh/uv/) so the toolchain stays identical across machines — Python,
dbt and Poe live inside the repo-local `.venv`, never global.

### 1. Install prerequisites (per-OS, once)

| Tool | Why | macOS (Homebrew) | Windows (winget / PowerShell) | Linux (apt / install script) |
|---|---|---|---|---|
| [`uv`](https://docs.astral.sh/uv/getting-started/installation/) | Python + venv + lockfile | `brew install uv` | `winget install --id=astral-sh.uv` *or* `irm https://astral.sh/uv/install.ps1 \| iex` | `curl -LsSf https://astral.sh/uv/install.sh \| sh` |
| [`gh`](https://cli.github.com/) | GitHub issues / PRs / Project board | `brew install gh` | `winget install --id=GitHub.cli` | `sudo apt install gh` *or* see [cli.github.com](https://cli.github.com/) |
| [`duckdb`](https://duckdb.org/docs/installation/) | Optional local CLI for ad-hoc queries against `data/gentriduck.duckdb` | `brew install duckdb` | `winget install --id=DuckDB.cli` *or* download the binary from [duckdb.org](https://duckdb.org/docs/installation/) | Download the binary from [duckdb.org](https://duckdb.org/docs/installation/) |

> The `dbt` CLI is **not** installed globally. `dbt-duckdb` lives only inside the repo's `.venv`
> and is invoked through `uv run poe …`. The repo-local dbt profile (`transform/profiles.yml`)
> is used via `DBT_PROFILES_DIR=transform`; your `~/.dbt/profiles.yml` is never touched.

### 2. Clone & install

```bash
gh repo clone dhelweg/gentriduck     # or: git clone https://github.com/dhelweg/gentriduck
cd gentriduck
uv sync                              # creates .venv and installs locked deps (incl. dev tools)
uv run pre-commit install            # installs commit-stage hooks (format + lint)
uv run pre-commit install --hook-type pre-push  # installs push-stage hook (dbt build + tests)
```

### 3. Verify

```bash
uv run poe debug   # dbt debug — confirms DuckDB + spatial extension load
uv run poe build   # dbt build (currently a no-op until Epic B models land)
```

If `poe debug` reports a successful connection, the toolchain is set up correctly. The same
commands run identically on every OS — line endings are normalised by `.gitattributes`
(`* text=auto eol=lf`).

## Licence

Code: [MIT](LICENSE). Data: under the respective source licences (OSM = ODbL, with attribution).
