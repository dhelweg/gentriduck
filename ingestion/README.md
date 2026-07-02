# `ingestion/` — reusable ingestion tooling

Part of **#83 [O4]** (open release: reproducible dataset + reusable ingestion tooling). This is
the module-by-module reference for anyone (inside or outside the project) who wants to re-run or
reuse the data collection layer independently of the dbt/DuckDB pipeline it feeds.

## Layout

```
ingestion/
  berlin/    — Berlin adapters (first city; ADR-0003 sources)
    lor/            geometries + pre2021→2021 crosswalk
    mss/             MSS (Monitoring Soziale Stadtentwicklung) outcome + indicator layers
    ewr/             EWR (Einwohnerregister) socio-economic time series
    price_rent/      Bodenrichtwerte, Kauffälle, Wohnlage
    mietspiegel/     Mietspiegel + Straßenverzeichnis (PDF-sourced)
    osm/             OSM full-history POI ingestion (manual precondition, see below)
  hamburg/   — Hamburg adapters (second city; ADR-0014 sources, ADR-0005 adapter pattern)
    geo/             Stadtteil/Bezirk geometries
    sozialmonitoring/ Sozialmonitoring outcome variable
    displacement/    Soziale Erhaltungsverordnungen (preservation zones)
    ewr/             Regionalstatistik EWR-equivalent predictors (Stadtteil grain)
    rent/            Wohnlagenverzeichnis + Mietenspiegel
    osm/             OSM full-history POI ingestion (manual precondition, see below)
```

Each city directory is a self-contained **adapter** (ADR-0005): it lands data conformed to the
generic `dim_city`/`dim_area` shape that dbt staging expects, but all city-specific quirks (source
URLs, column names, licence text) live in the adapter, not in shared models. Adding a third city
means adding `ingestion/<city>/` + a `dim_city` row — no changes to `ingestion/berlin` or
`ingestion/hamburg`.

## Running ingestion

**Prerequisite:** `uv sync` (see the repo root `CLAUDE.md` / README for the one-time setup).
All commands below run from the repo root.

### One command, most sources

```bash
uv run poe ingest
```

Runs every ingestion script that has **no manual precondition** — currently all Berlin sources
except OSM, and all Hamburg sources except OSM — in dependency order (e.g. the LOR pre2021→2021
crosswalk runs after the LOR geometries it reads). See the `ingest` task in the repo-root
`pyproject.toml` for the exact, current command list; that file is the single source of truth and
this doc is kept in sync with it.

Output lands under `data/raw/<city>/<source>/*.parquet` (gitignored — rebuildable, not committed;
see ADR-0001/A8). `uv run poe build` (dbt) reads from there.

### OSM POI history (manual precondition — do not run via `poe ingest`)

```bash
uv run poe ingest-osm-berlin
uv run poe ingest-osm-hamburg
```

Per **ADR-0002**, Geofabrik's public download server does **not** publish full-history `.osh.pbf`
files — only the login-gated internal server does, using the maintainer's personal OSM contributor
account. This is a **one-off manual step per machine**, not something a fresh, no-login checkout
can do unattended:

1. Log in to Geofabrik's internal server with an OSM contributor account and download the Germany
   `.osh.pbf` to `data/raw/osm/germany-internal.osh.pbf` (gitignored).
2. Run `uv run poe ingest-osm-berlin` / `-hamburg` to slice it into annual per-city POI parquet
   files under `data/raw/osm/<city>/`.

Without this file present, `int_poi_status_dynamism` / `gentrification_index` simply have zero
rows for that city — every model here is **graceful-degradation-safe**, per the data-presence
guards (#94): a missing source produces an empty, correctly-typed table, not a crash.

### Individual scripts

Every ingestion script is a standalone CLI with `--help`, e.g.:

```bash
uv run python ingestion/berlin/ewr/ingest_ewr.py --help
uv run python ingestion/hamburg/rent/ingest_hamburg_rent.py --dry-run
```

Common flags across scripts (not all scripts have all of them):
- `--out-dir PATH` — output directory for the parquet file(s); defaults match `poe ingest`'s paths.
- `--years` / `--editions` — restrict the vintage range (default: all known).
- `--dry-run` — print what would be fetched/written, with **zero HTTP calls**. Use this to sanity
  check a script (endpoint names, year list) without waiting on the network or writing files.
- `--verbose` — DEBUG-level logging.
- `--url-override` — override a guessed/UNCONFIRMED endpoint for a specific year without a code
  change (several government WFS/CKAN endpoints have moved or been renamed across editions).

Two Mietspiegel scripts (`ingest_mietspiegel.py`, `ingest_strassenverzeichnis.py`) need
`pdfplumber`, deliberately **not** a core dependency (heavy, PDF-parsing-only, used nowhere else).
Run them via `uv run --with pdfplumber python ingestion/berlin/mietspiegel/...` (this is exactly
what `poe ingest` already does for these two — no extra step needed if you use the `poe` task).

## Design contract (what makes these reusable outside this project)

- **Free + open sources only** (CLAUDE.md golden rule #1). Every script's docstring states the
  concrete source, its licence (e.g. `CC BY 3.0 DE`, `dl-de/by-2.0`, `ODbL`), and attribution text
  it writes into a `source_attribution` column.
- **No signup-keyed sources**, with the one ratified exception (OSM full-history via Geofabrik's
  internal server, ADR-0002) — clearly separated from the rest (`ingest-osm-*`, not `ingest`).
- **Cross-platform** (macOS / Windows / Linux) — pure Python + HTTP/CSV/PDF parsing, no OS-specific
  CLI tooling in the default path.
- **Deterministic, idempotent output** — re-running a script overwrites/re-derives the same
  parquet files; nothing depends on run order except the one documented case above (LOR
  crosswalk after LOR geometries).
- **Graceful degradation** — a source being temporarily unreachable (network, moved endpoint)
  produces a logged warning and a skip, not a hard crash; downstream dbt models handle the
  resulting empty/partial table (data-presence guards, #94).
- **UNCONFIRMED endpoints get fixed against live sources, not left as guesses** — several
  Hamburg scripts originally had best-guess WFS endpoint names (#40 H1) that were corrected once
  a real network check was possible (#125 H2); this is normal for open-government WFS/CKAN
  sources, which rename endpoints across editions without notice. `--url-override` exists so a
  reuser hitting a renamed endpoint doesn't need to patch the script.

## Licensing / attribution

Each script's module docstring and each output row's `source_attribution` field states the exact
licence and attribution string required by the source. See
`docs/adr/0003-berlin-geographies-and-open-price-rent-sources.md` and
`docs/adr/0014-hamburg-data-sources.md` for the full per-source licence table.
The public site's attribution page (**#39 [G3]**, not yet built) will surface this to end users;
this doc + the per-script docstrings are the source of truth until then.
