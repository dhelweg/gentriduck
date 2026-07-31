# Gentriduck

Reviving a 2018 master thesis — *"Measurement of Gentrification in Berlin via Big Data
Analytics"* — on a modern, local-first, open-source data stack. Gentriduck is four things at
once: a public **statistics site** tracking gentrification pressure across Berlin's
neighbourhoods (and, since July 2026, Hamburg's); a **quantified-methodology revival** of that
thesis, re-checked hypothesis by hypothesis against fresh data; a documented **supervised-agent
operating model** — a team of specialised AI agents, coder/reviewer-gated and human-merged, doing
the engineering in the open; and an **open-data case study** in what free, official sources can
and can't support. See [`/about`](web/pages/about.md) for the full story, or jump to *Where to
start* below.

- **Stack:** [dbt](https://www.getdbt.com/) + [DuckDB](https://duckdb.org/) (local) · Python ([uv](https://docs.astral.sh/uv/)), analysis in scipy / scikit-learn · [Evidence.dev](https://evidence.dev/) static site reading published marts via in-browser DuckDB-WASM, hosted free on GitHub / Cloudflare Pages ([ADR-0012](docs/adr/0012-serving-and-hosting-stack.md))
- **Data:** OpenStreetMap history (© OpenStreetMap contributors, ODbL) + Berlin and Hamburg open data — LOR/subarea geographies, population-register socio-economic indicators, Bodenrichtwerte / Mietspiegel price & rent — **free & open only**
- **Status:** Epics **A–F** substantially complete; the Berlin statistics **website (Epic G) is built and soft-launched** (noindex) on GitHub Pages while the Cloudflare Pages primary host is finalised; **multi-city (Epic H) is live for Hamburg** — its city-specific methodology re-fits (OSM completeness-bias correction, trajectory thresholds, an independent annual-cadence lead-lag re-test) are dual-signed-off, and the city now has a public **`/hamburg` hub** (landing, maps, POI map) plus an area-hierarchy page ladder (I21-g/h); Hamburg's price/rent (#303), commercial-mix/Offering-Advantage (#312), and status/trajectory (#314) data are now admitted and rendering on those pages, plus a new Bezirk/PGR/Ortsteil (Berlin) and Stadtteil/district (Hamburg) map granularity selector (#310); only the demographics/change composite — Hamburg's EWR-equivalent has 3 indicators vs Berlin's 5 — remains an honest not-yet-published placeholder, blocked on a maintainer presentation ruling (**#313**); **public communication & storytelling (Epic I)** has revised every site page onto one shared narrative arc, added timeline/takeaways/open-data pages, and (I21, #284) consolidated the area-hierarchy pages onto one canonical template for both cities; the outward-comms machinery is built and its first six posts are drafted and dual-signed-off (ADR-0021, a `comms-strategist` agent + `comms-draft` skill), but **no post has been published yet** — every post is a manual, maintainer-initiated act, and that step hasn't happened. Most of the tracked backlog is done (as of 2026-07). See the roadmap below.

## Where to start, depending on who you are

Mirrors the live site's own audience router (`/` → "Pick your path"); once the site is public
these link to the hosted pages, but the same content lives in `web/pages/` in this repo today:

- **Housing policy / a local initiative** — `web/pages/takeaways.md` (`/takeaways`): ~5
  actionable, true-but-simple findings, each linked to the signed-off evidence behind it.
- **Cities & gentrification research** — `web/pages/methodology.md` (`/methodology`) and
  `web/pages/thesis-recheck.md` (`/thesis-recheck`): the quantified methodology and the
  hypothesis-by-hypothesis re-check of the 2018 thesis.
- **Open data** — `web/pages/open-data.md` (`/open-data`): what open data made possible, concrete
  per-source friction, and standardisation recommendations.
- **Data pipelines / engineering** — `web/pages/how-its-built.md` (`/how-its-built`),
  [`ingestion/README.md`](ingestion/README.md), and `docs/adr/` (linked below).
- **AI-assisted / agent-based development** — `web/pages/how-its-organised.md`
  (`/how-its-organised`) and [`docs/process/`](docs/process/README.md): the agent roster, the
  coder ↔ reviewer ↔ methodology-gate loop, and the engineering retrospective.
- **The project's history** — `web/pages/timeline.md` (`/timeline`): every milestone from the
  2018 thesis to today, dated and source-cited.

## Repository layout (monorepo)

| Path | Purpose |
|---|---|
| `transform/` | dbt project (staging → intermediate → marts) |
| `ingestion/` | Python data ingestion (OSM history, Berlin open data) |
| `web/` | public [Evidence.dev](https://evidence.dev/) statistics website (landing, thesis re-check, time-series, maps, area drill-down, methodology) — see [`web/README.md`](web/README.md) |
| `docs/` | project plan (`docs/PROJECT_PLAN.md`), architecture decision records (`docs/adr/`), and AI-assisted operating model + engineering retrospective (`docs/process/`) |
| `reference/` | original thesis SQL + golden output CSVs (read-only reference) |
| `data/` | local data artefacts — **gitignored**, rebuilt from open sources |
| `.claude/` | agent + skill definitions for the agent team |
| `ops/` | autonomous-run scripts (continuous dev mode + Remote Control) — see [`ops/README.md`](ops/README.md) |

## Roadmap

The full plan lives in [`docs/PROJECT_PLAN.md`](docs/PROJECT_PLAN.md); architecture decisions are
recorded in [`docs/adr/`](docs/adr/README.md) (see the ADR index there for the full, current list —
not repeated here so this line can't go stale); the live backlog is the **Gentriduck** GitHub
Project board. Epics (✓ = substantially complete): **A** foundations ✓ ·
**B** revive the 2018 concept ✓ · **C** longitudinal OSM POI history ✓ · **D** price/rent dimension ✓ ·
**E** analysis & ML ✓ · **F** serving layer ✓ · **G** public website ✓ (built, soft-launched) ·
**H** multi-city (Hamburg is live — `/hamburg` hub with maps + a POI map, plus an area-hierarchy
page ladder (I21-g/h); city-specific methodology re-fits dual-signed-off; price/rent, commercial-mix,
and status/trajectory data are admitted and live; only the demographics/change composite still shows
an honest not-yet-published placeholder, pending a maintainer presentation ruling on **#313**) ·
**I** public communication & storytelling (site revision wave — one narrative arc, city deep-dive
navigation, timeline/takeaways/open-data pages, and the I21 (#284) area-hierarchy template
consolidation for both cities — mostly done, #313 open; the outward-comms wave has an accepted ADR,
a `comms-strategist` agent, and six signed-off draft posts, but the maintainer hasn't published one
yet).

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
uv run poe build   # dbt build — materialises staging → intermediate → marts + runs tests
```

`poe build` needs the ingested raw data first (see *Rebuilding the data* below); on a clean
clone run `uv run poe refresh` for the full end-to-end path. If `poe debug` reports a successful
connection, the toolchain is set up correctly. The same
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
uv run poe verify-data     # ADR-0016: does this machine's ingested data match the committed manifest? (drift check, no build; also runs as a poe refresh pre-flight)
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

## Contributing

Read, fork, and check out freely — this is an open-data / open-source project. Direct backlog
tickets and code merges stay maintainer- and agent-controlled (ADR-0011, ADR-0020); the way to
**propose** a change is the **[community voting board](https://github.com/dhelweg/gentriduck/discussions/categories/ideas)**
(GitHub Discussions "Ideas" category — see the pinned
[guidelines discussion](https://github.com/dhelweg/gentriduck/discussions/213)). Submit a request,
upvote ones you support; requests crossing a vote threshold are screened and, if they pass,
promoted into the backlog as a normal ticket — subject to every existing engineering gate (no
vote count ever buys a bypass). See [ADR-0020](docs/adr/0020-community-contribution-governance-voting-board.md)
for the full governance model. Full policy + how-to: **[CONTRIBUTING.md](CONTRIBUTING.md)**.

## Licence

Code: [MIT](LICENSE). Published derived dataset (`data/serving/*.parquet`): [ODbL v1.0](https://opendatacommons.org/licenses/odbl/1-0/) — see `DATA_LICENSE.md` for the full rationale, reuse terms, and regeneration path; per-source attribution strings are in `docs/epic-g/G3-attribution-licensing.md`.
