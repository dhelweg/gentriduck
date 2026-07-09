---
title: How it's built — the data pipeline
sidebar_position: 22
---

<!--
  NEW page (#153, Epic G "audience front doors" — data-engineer audience). Restates existing,
  already-published facts (README.md stack section, web/pages/methodology.md §6 completeness-bias
  correction, docs/adr/0012) for a public audience -- no new indicator, weight, method, or data
  source is introduced here, so no methodology gate. Pairs with /how-its-organised (AI-architect
  audience) and productionizes the "⚙️ You build data pipelines" door on the home page.
-->

# How it's built — the data pipeline

This page is for the audience that wants to know **how the numbers get made**: the stack, the data
sources, and the specific correction that keeps a crowd-mapped data source honest. If you want to
know what the *statistics themselves* claim, see [methodology & data
sources](/methodology) instead; if you want the **workflow that builds and ships this pipeline**,
see [how it's organised](/how-its-organised).

## The stack: local-first, free, open

Gentriduck runs entirely on free, open-source tooling — no paid service, no proprietary data, no
account required to reproduce it:

- **[dbt](https://www.getdbt.com/) + [DuckDB](https://duckdb.org/)** — a local, file-based
  analytical database and a SQL transformation framework, run through staging → intermediate →
  marts layers. No cloud data warehouse is required to build the pipeline.
- **Python ([uv](https://docs.astral.sh/uv/))** for ingestion (downloading and parsing the open
  data sources below) and analysis (`scipy` / `scikit-learn` for the regressions and
  classification behind the [thesis re-check](/thesis-recheck)).
- **[Evidence.dev](https://evidence.dev/)** — a free, open-source, SQL-and-markdown static site
  generator — builds this website you're reading, reading the published marts through
  in-browser DuckDB-WASM, with no live database or account behind the scenes.

Every one of these choices is written down: new tools or data sources need an **Architecture
Decision Record (ADR)** — see the [`docs/adr/`
folder](https://github.com/dhelweg/gentriduck/tree/main/docs/adr) — before they're adopted.

## The data sources

All of it is open and requires no signup:

- **OpenStreetMap** — a full crowd-mapped history of points of interest (shops, cafés,
  restaurants, amenities) back to 2008, licensed [ODbL](https://opendatacommons.org/licenses/odbl/1-0/).
- **Berlin's population register (EWR)** and **official social-monitoring reports (MSS)** — the
  socio-economic ground truth: residence duration, age structure, transfer-recipient share, and
  the city's own status/dynamics classification.
- **Bodenrichtwerte / Mietspiegel** — official land-value and rent reference data.
- **LOR / Planungsraum geographies** — the small-area boundaries (a few thousand residents each)
  everything else is aggregated to.

See [methodology & data sources](/methodology) for the full list with citations, and
[attribution & licensing](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-g/G3-attribution-licensing.md)
for the per-source licence text.

## The pipeline, end to end

> **open sources** (OSM history, EWR, MSS, Bodenrichtwerte, Mietspiegel) →
> **ingestion** (Python — download, parse, no manual steps) →
> **staging** (dbt — conform to `dim_city`/`dim_area`) →
> **intermediate** (dbt — POI mapping, spatial join, time-series) →
> **marts** (dbt — gentrification index, price/rent, trajectory) →
> **published parquet** (`data/serving/`) →
> **this website** (DuckDB-WASM, in the browser, no live database)

Every layer is rebuildable from scratch on any machine — `uv run poe refresh` re-runs ingestion,
`dbt build`, and the export in one command; nothing large or raw is committed to the repository
(only small "golden" reference files used to check the rebuild against the original 2018 thesis
output). The full step-by-step is in the [repository
README](https://github.com/dhelweg/gentriduck#rebuilding-the-data).

## A specific worked example: correcting for crowd-mapping bias

OpenStreetMap is crowd-mapped, and its coverage of any Berlin neighbourhood has grown
substantially since 2008 — independent of whether the neighbourhood itself actually changed. A
raw point-of-interest count would mostly measure "how much this area got mapped," not "how much
this area's commercial mix changed." Gentriduck corrects for this by working with each area's
**share** of the citywide point-of-interest count in a given year rather than its raw count: if
citywide mapping coverage grows roughly evenly, the correction cancels out, and only an area
gaining points of interest *faster than the rest of the city* registers as a real signal. It's an
approximation, not a perfect fix — see [methodology & data sources §6](/methodology) for the
caveats — but it's a concrete example of the kind of data-quality problem this pipeline has to
solve, and the correction is itself checked by an independent reviewer and cited to its
methodology document before being trusted, the same as every other step here.

<sub>[Home](/) · [Methodology & data sources](/methodology) · [About this project](/about) · [GitHub repository](https://github.com/dhelweg/gentriduck)</sub>
