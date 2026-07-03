# Gentriduck derived dataset — licence (O4, #83)

This file licenses the **derived dataset** — the published dbt marts (`data/serving/*.parquet`,
also downloadable as a versioned bundle from the repo's GitHub Releases) — as distinct from the
repo's *code*, which is MIT-licensed (see `LICENSE`).

## Licence: Open Database Licence (ODbL) v1.0

The derived dataset is released under the **[Open Database Licence (ODbL) v1.0](https://opendatacommons.org/licenses/odbl/1-0/)**.

**Why ODbL, not a simpler licence (e.g. CC BY 4.0):** the dataset incorporates a substantial
OpenStreetMap-derived component (POI history counts feeding `fct_poi_development` and the
commercial/amenity dimension of `gentrification_index`). OSM's own licence, the ODbL, carries a
**share-alike condition**: any produced/derivative database that includes a substantial extract of
OSM data must itself be published under the ODbL (or a licence the OSM Foundation has approved as
compatible) — see `docs/epic-g/G3-attribution-licensing.md` §4 and
<https://www.openstreetmap.org/copyright>. Rather than attempt to carve the OSM-derived columns out
under a separate licence from the rest of the (mostly `dl-de-zero-2.0` / CC BY) government-source
columns — which would fragment a single joined mart across incompatible terms — we license the
**whole derived dataset** as ODbL. This is the standard, conservative choice used by other
OSM-derived open datasets and satisfies every source licence in play (ODbL's terms are a superset of
what CC BY / `dl-de-zero-2.0` / `dl-de/by-2.0` require for reuse+attribution).

This closes the "open item" flagged in `docs/epic-g/G3-attribution-licensing.md` §4 (deferred there
pending the F1/#33 hosting decision, now resolved — ADR-0012 accepted 2026-07-03).

## What ODbL means for reuse

Per the ODbL, you are free to **copy, distribute, transmit, and adapt** this dataset, including for
commercial purposes, provided you:

1. **Attribute** — carry the per-source attribution strings in
   `docs/epic-g/G3-attribution-licensing.md` §3 (in particular "© OpenStreetMap contributors" for
   the OSM-derived component, plus the relevant Berlin/Hamburg government-source credits).
2. **Share-Alike** — if you publish a produced work that is itself a database (not just a derived
   summary/visualization), it must be under ODbL or a compatible licence.
3. **Keep open** — you may not impose additional restrictions (e.g. DRM) that prevent others
   exercising these same rights.

A visualization, chart, or narrative *built from* this data (a "produced work" under ODbL, e.g. a
map image or a blog post citing a number) is **not** itself subject to share-alike — only
redistributed *databases* are. See the ODbL summary at
<https://opendatacommons.org/licenses/odbl/1-0/> for the full text.

## What is and isn't covered

- **Covered (ODbL):** `data/serving/*.parquet` (the published dbt marts) and any GitHub Release
  bundle of the same.
- **Not covered (MIT, see `LICENSE`):** the dbt models, ingestion scripts, web app code, and all
  other source code in this repository.
- **Not covered (original third-party licences, not redistributed as source PDFs):** the
  Mietspiegeltabelle and pre-2024 Wohnungsmarktbericht editions — we only redistribute the numeric
  values we re-tabulate ourselves (see `docs/epic-g/G3-attribution-licensing.md` §4).

## Reproducible regeneration path

The published parquet snapshot is **not committed to git** (it's rebuilt from open sources, per
CLAUDE.md "local-first" + "large/raw data is gitignored"). To regenerate it yourself from a fresh
clone:

```bash
uv sync
uv run poe refresh   # ADR-0015: deps -> ingest -> build -> export-serving -> export-area-geojson
```

This runs the full pipeline end-to-end: installs dbt packages, ingests every open source
(`ingestion/**`, see `ingestion/README.md`), builds the DuckDB warehouse (`uv run poe build`), and
exports the governed marts to `data/serving/*.parquet` (this file) plus per-area GeoJSON to
`web/static/geo/*.geojson`.

**One documented exception:** `uv run poe refresh` deliberately excludes OSM full-history ingestion
(`poe ingest-osm-berlin` / `poe ingest-osm-hamburg`), which requires a login-gated Geofabrik
OSM-contributor session per ADR-0002 (a deliberate, ratified sourcing decision — see
`docs/adr/0002-osm-poi-history-sourcing.md`). Without it, POI-history-dependent columns are absent
or zero-filled (the pipeline is graceful-degradation-safe throughout); a maintainer with Geofabrik
OSM-contributor access can run those two tasks first to populate `data/raw/osm/**`.

## Where to get it without building it yourself

- **GitHub Releases:** a versioned parquet bundle is attached to
  [github.com/dhelweg/gentriduck/releases](https://github.com/dhelweg/gentriduck/releases) —
  the simplest path if you just want the numbers.
- **The live site** (once deployed per F1/ADR-0012, tracked separately): the same parquet bundle is
  embedded in the static site build and queryable client-side via DuckDB-WASM — no download needed.
