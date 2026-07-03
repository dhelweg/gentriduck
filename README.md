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
| `docs/` | project plan (`docs/PROJECT_PLAN.md`), architecture decision records (`docs/adr/`), and AI-assisted operating model + engineering retrospective (`docs/method/`) |
| `reference/` | original thesis SQL + golden output CSVs (read-only reference) |
| `data/` | local data artefacts — **gitignored**, rebuilt from open sources |
| `.claude/` | agent + skill definitions for the agent team |
| `ops/` | autonomous-run scripts (continuous dev mode + Remote Control) — see [`ops/README.md`](ops/README.md) |

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

## Rebuilding the data

Gentriduck is **local-first** and **public**. Large or raw artefacts (OSM PBF / history,
`*.duckdb` files, intermediate parquet) are **gitignored** — every machine rebuilds them from
free, openly licensed sources via the Python ingestion in `ingestion/`. Only small **golden /
reference files** (e.g. the 2018 `result_full_*` CSVs, `poi_mapping`) and SQL references live
in `reference/` and are committed for reproducibility / reconciliation.

### What's tracked vs rebuilt

| Path | Tracked in git? | How to (re)create |
|---|---|---|
| `data/raw/` | **no** (gitignored) | Run the ingestion scripts below (downloads from open sources). |
| `data/gentriduck.duckdb` | **no** (gitignored) | `uv run poe build` (re-materialises dbt models from `data/raw/`). |
| `data/serving/*.parquet` | **no** (gitignored) | `uv run poe export-serving` (published marts, ODbL-licensed — see `DATA_LICENSE.md`). |
| `reference/` (SQL, golden CSVs, `poi_mapping`) | **yes** | Committed; treat as read-only reference. |
| `transform/seeds/` (small dim seeds) | **yes** | Committed; loaded by `dbt seed` / `uv run poe build`. |

### Steps

```bash
# 1. Set up the env (one-off, per machine — see Setup section above)
uv sync

# 2. One command, end-to-end (ADR-0015): ingest every open source, build the warehouse,
#    and export the published marts + GeoJSON to data/serving/ and web/static/geo/.
uv run poe refresh

#    Or step by step:
uv run poe ingest          # every ingestion script (see ingestion/README.md for module details)
uv run poe build           # dbt build (staging -> intermediate -> marts) + tests
uv run poe export-serving  # publish marts to data/serving/*.parquet (DATA_LICENSE.md)
uv run poe test            # dbt tests only
```

`uv run poe refresh` deliberately excludes the two OSM full-history tasks
(`poe ingest-osm-berlin` / `poe ingest-osm-hamburg`), which need a login-gated Geofabrik
OSM-contributor session (ADR-0002) — everything else runs with no manual precondition and is
graceful-degradation-safe if a source is temporarily unreachable. See `ingestion/README.md` for
the full module layout, CLI flags, and the reuse design contract, and `DATA_LICENSE.md` for the
published dataset's licence + regeneration path. No proprietary or paid sources are involved — see
the data ADRs (`docs/adr/`) for the source list and licences.

> **Why the split.** Raw OSM history + Berlin EWR can run to many GB; the public repo would
> bloat and the data is freely re-downloadable. Goldens and SQL references are tiny and are
> the basis of the directional reproducibility check in Epic B, so they live in the repo.

## Licence

Code: [MIT](LICENSE). Published derived dataset (`data/serving/*.parquet`): [ODbL v1.0](https://opendatacommons.org/licenses/odbl/1-0/) — see `DATA_LICENSE.md` for the full rationale, reuse terms, and regeneration path; per-source attribution strings are in `docs/epic-g/G3-attribution-licensing.md`.
