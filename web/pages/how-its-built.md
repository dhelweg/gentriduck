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

  I3 (#220): re-platformed onto the shared `<Hero>`/`<ChapterLabel>`/`<FooterNav>` components
  (this page previously had a plain `# ` heading and a hand-copied `<sub>` footer line) and given
  an explicit "Honest caveats" + "Where next" section per the I1 template (this page's content
  didn't change — the completeness-bias correction's "approximation, not a perfect fix" caveat
  already existed inline; it is now pulled into its own labelled section rather than trailing the
  prose, per docs/epic-i/storytelling-guide.md §4.4).

  #368 (2026-11): brought in line with the current stack. Maps are the in-repo SVG `PolygonMap`
  (#351; web/components/PolygonMap.svelte, no basemap/tile provider, CARTO dropped); the site
  reads two Evidence sources, `gentriduck_marts` (published parquet) and `gentriduck_findings`
  (committed analysis result tables; web/sources/gentriduck_findings/*.sql); Hamburg sources per
  ADR-0014 incl. its 2026-11-02 annex amendment; the EWR/MSS split follows
  web/pages/methodology.md (EWR is demographic, not a welfare register: evidence-integrity domain
  sign-off); hosting and release per ADR-0012 Amendments A and C and ops/README.md "Deploy".
  Restates existing facts only; no result sentence added.
-->

<Hero compact eyebrow="Chapter 2 — The Revival" title="How it's built — the data pipeline" lede="The stack, the data sources, and the specific correction that keeps a crowd-mapped data source honest — for the audience that wants to know how the numbers get made." />

This page is for the audience that wants to know **how the numbers get made**: the stack, the data
sources, and the specific correction that keeps a crowd-mapped data source honest. If you want to
know what the *statistics themselves* claim, see [methodology & data
sources](/methodology) instead; if you want the **workflow that builds and ships this pipeline**,
see [how it's organised](/how-its-organised).

## The stack: local-first, free, open

Gentriduck runs entirely on free, open-source tooling — no paid service and no proprietary data.
The only account needed to reproduce it is a free OpenStreetMap contributor login for the
full-history download (see [open data](/open-data)):

- **[dbt](https://www.getdbt.com/) + [DuckDB](https://duckdb.org/)** — a local, file-based
  analytical database and a SQL transformation framework, run through staging → intermediate →
  marts layers. No cloud data warehouse is required to build the pipeline.
- **Python ([uv](https://docs.astral.sh/uv/))** for ingestion (downloading and parsing the open
  data sources below) and analysis (`scipy` / `scikit-learn` for the regressions and
  classification behind the [thesis re-check](/thesis-recheck)).
- **[Evidence.dev](https://evidence.dev/)** — a free, open-source, SQL-and-markdown static site
  generator — builds this website you're reading. It reads two data sources, both bundled into the
  static build and queried in your browser by DuckDB-WASM, with no live database or account behind
  the scenes:
  - `gentriduck_marts` — the published dbt marts, exported as parquet files;
  - `gentriduck_findings` — the small, committed result tables of the signed-off analyses (the
    thesis hypothesis suite for both cities, and the matched Berlin–Hamburg comparison), read
    straight from the repository so a page never hand-copies a number.
- **Maps** are drawn by the site's own SVG component (`PolygonMap`) from static GeoJSON files built
  with the site: no basemap, no tile provider, and nothing loaded from another server. (The maps
  used a free CARTO basemap until October 2026, when it started requiring an API key.)
- **Hosting:** the built site is plain static files on GitHub Pages.

Every one of these choices is written down: new tools or data sources need an **Architecture
Decision Record (ADR)** — see the [`docs/adr/`
folder](https://github.com/dhelweg/gentriduck/tree/main/docs/adr) — before they're adopted.

## The data sources

All of it is openly licensed and free; only the OpenStreetMap full-history download needs a free
OSM contributor login (see [open data](/open-data)). The site covers two cities, Berlin and
Hamburg, each read from its own city's official sources:

- **OpenStreetMap** — a full crowd-mapped history of points of interest (shops, cafés,
  restaurants, amenities) back to 2008, for both cities, licensed
  [ODbL](https://opendatacommons.org/licenses/odbl/1-0/).
- **Official social monitoring** — Berlin's MSS and Hamburg's Sozialmonitoring: each city's own
  status and dynamics classification of its small areas, and indicators behind it such as
  unemployment, transfer receipt and child poverty. This is the outcome the analyses model (the
  variable they test against).
- **Population statistics** — Berlin's population register (EWR: age structure, nationality and
  migration background, how long residents have lived at their address) and Hamburg's Stadtteil
  statistics (age structure and nationality, at the coarser Stadtteil level only, not per
  statistisches Gebiet). These are demographic
  snapshots, not social-status measures.
- **Land values and rents** — Bodenrichtwerte, Mietspiegel / Mietenspiegel and Wohnlagen.
- **Small-area geographies** — Berlin's LOR / Planungsräume and Hamburg's statistische Gebiete,
  the boundaries (a few thousand residents each) everything else is aggregated to.

See [methodology & data sources](/methodology) for the full list with citations,
[open data](/open-data) for the source-by-source table, and
[attribution & licensing](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-g/G3-attribution-licensing.md)
for the per-source licence text.

## The pipeline, end to end

> **open sources** (OSM history, social monitoring, population statistics, land values and rents,
> geographies — per city) →
> **ingestion** (Python — download, parse, no manual steps) →
> **staging** (dbt — conform to `dim_city`/`dim_area`) →
> **intermediate** (dbt — POI mapping, spatial join, time-series) →
> **marts** (dbt — gentrification index, price/rent, trajectory) →
> **published parquet** (`data/serving/`) →
> **this website** (DuckDB-WASM, in the browser, no live database)

Analyses such as the [thesis re-check](/thesis-recheck) take a side branch: a deterministic Python
script reads the warehouse and writes a small results table. That table is committed to the
repository and signed off together with the analysis, and the site reads it as its
`gentriduck_findings` source.

Every layer is rebuildable from scratch on any machine — `uv run poe refresh` re-runs ingestion,
`dbt build`, and the export in one command; nothing large or raw is committed to the repository
(only small "golden" reference files used to check the rebuild against the original 2018 thesis
output). The full step-by-step is in the [repository
README](https://github.com/dhelweg/gentriduck#rebuilding-the-data).

There is no live-update path. A data refresh means rebuilding the marts, re-exporting the parquet,
rebuilding the site, and redeploying it. The published site always matches `main`: after
the maintainer merges the weekly release, one command (`uv run poe release-deploy`) rebuilds from
`main` (or reuses a build made from exactly the same tree and inputs), runs a smoke check, and
deploys. A failed check publishes nothing. [How it's organised](/how-its-organised) describes that
release routine.

## A specific worked example: correcting for crowd-mapping bias

OpenStreetMap is crowd-mapped, and its coverage of any Berlin neighbourhood has grown
substantially since 2008 — independent of whether the neighbourhood itself actually changed. A
raw point-of-interest count would mostly measure "how much this area got mapped," not "how much
this area's commercial mix changed." Gentriduck corrects for this by working with each area's
**share** of the citywide point-of-interest count in a given year rather than its raw count: if
citywide mapping coverage grows roughly evenly, the correction cancels out, and only an area
gaining points of interest *faster than the rest of the city* registers as a real signal. It's a
concrete example of the kind of data-quality problem this pipeline has to solve, and the
correction is itself checked by an independent reviewer and cited to its methodology document
before being trusted, the same as every other step here.

## Honest caveats

- **The completeness-bias correction above is an approximation, not a perfect fix.** Coverage did
  not grow perfectly evenly across the city, and already-popular inner-city areas were typically
  mapped earlier than peripheral ones — see [methodology & data sources §6](/methodology) for the
  full statement of this and every other known limitation.
- This page describes **the pipeline**, not the statistics it produces. It makes no claim about
  gentrification, displacement risk, or any specific area — those claims, and their own
  caveats, live on [methodology](/methodology) and the [Berlin](/berlin) and [Hamburg](/hamburg)
  data pages.
- Rebuildability is a design goal, not a guarantee that every historical run is byte-identical:
  upstream open-data sources (OSM, MSS/EWR editions) are occasionally revised or corrected
  upstream, and the pipeline picks up whatever the source currently publishes.

## Where next

- **[How it's organised](/how-its-organised)** — the multi-agent workflow that builds and reviews
  this pipeline (this page's sideways neighbour: same audience door, the process side).
- **[Methodology & data sources](/methodology)** — what the pipeline's output actually claims,
  and where it should not be trusted too far.
- **[Berlin](/berlin)** and **[Hamburg](/hamburg)** data hubs — the maps, time series, and
  per-neighbourhood profiles this pipeline feeds.
- **[GitHub repository](https://github.com/dhelweg/gentriduck)** — every dbt model, seed, and ADR
  referenced above, in full.

---

<FooterNav />
