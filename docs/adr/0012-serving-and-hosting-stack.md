# ADR-0012: Serving & hosting stack

- **Status:** Accepted
- **Date:** 2026-06-30
- **Accepted:** 2026-06-30 by the maintainer (task F1, #33). No methodology sign-off required —
  this is an architecture/tooling decision, not methodology-bearing work: it touches none of the
  R-C1 paths (no index weights, normalization, or spatial method). The **content** that flows onto
  the site (the methodology page G2, the index itself) remains under the full geo-DS + domain gate
  at its own integration point; this ADR only decides *how marts reach the web*, not *what they say*.

## Context

Epic F (serving) and Epic G (website) need a decided answer to one question: **how do the dbt marts
reach a public, free, open website, and where does it live?** ADR-0001 tentatively named MotherDuck
(free tier) "to host/serve the website" and the PROJECT_PLAN repeatedly pencils in **Evidence.dev**
as the likely web framework — but neither was ever evaluated against alternatives or against the
golden rules in a recorded decision. F1 (#33) is that decision; G0/G1/G2/G3 all depend on it.

The product is a **data-heavy statistics site**: a gentrification index, multi-year time-series,
choropleth maps over Berlin PLR/BZR areas, area drill-downs, plus a methodology page (G2) and an
attribution/ethics page (G3). The data is **aggregate-only, public, and not large** — marts are
per-area, per-year rows (hundreds of areas × ~15 years × a handful of indicators), measured in
**single-digit MB as parquet**, not gigabytes. There is no per-user data, no auth, no write path.

### Constraints this ADR must respect (CLAUDE.md golden rules; ADR-0001; ADR-0011)

- **Free + open-source only; no paid tools or proprietary services** (golden rule #1). MotherDuck is
  permitted *only* on its free tier (10 GB) and *only* if it earns its place.
- **Local-first; the site must be testable locally without a MotherDuck account** (golden rule #5;
  ADR-0001). A contributor with a fresh clone must be able to build and preview the whole site from
  the DuckDB file alone.
- **Cross-platform** (mac / Windows / Linux): the framework and its toolchain must be pure
  Node/JS or pure-Python — no OS-specific build step.
- **Publishes from `main`** (ADR-0011): `main` is the human-gated published branch; the deploy must
  trigger off `main`, and `develop` must be previewable but not the public source of truth.
- **City-agnostic** (ADR-0005): the site reads conformed `dim_city`/`dim_area` marts; nothing in the
  serving layer may bake Berlin in (URLs, page structure, and data loading are parameterized by city).

## Options

### Decision 1 — serving approach

**Option A — Static export (dbt marts → parquet/JSON, bundled into the static build).**
dbt writes the published marts to parquet (and small JSON where convenient); the web build embeds
them; the site is a pure static bundle. With a browser DuckDB-WASM runtime the site can run
**real SQL against those bundled parquet files in the browser** — so "static" does *not* mean
"no interactivity": filtering, drill-down, and ad-hoc aggregation all work client-side. No live
database, no account, no network round-trip, no per-query latency, works offline, trivially cacheable
at the edge. Cost: the published data must fit in the bundle (fine here — single-digit MB) and a
data refresh means a rebuild + redeploy (acceptable; the dataset is a *living but slow-moving*
statistic, refreshed on a cadence, not per-second).

**Option B — MotherDuck-backed (browser queries a live MotherDuck warehouse via its WASM SDK).**
dbt's target becomes MotherDuck (free tier, 10 GB); the browser opens a connection and queries it
live. Enables truly open-ended interactive queries over data too big to ship to the client. Costs:
(1) introduces a **mandatory hosted account + token** as a hard dependency of *viewing the site* —
directly in tension with "local-first" and "free + open only" (the free tier is a revocable
commercial courtesy, not an open guarantee); (2) **a public site cannot safely hold a write/admin
token in the browser** — read-only sharing on the free tier is limited and the security model for an
anonymous public audience is awkward; (3) per-query network latency and a hard dependency on a
third-party service being up; (4) the site **could not be previewed locally without an account**,
breaking golden rule #5. None of this buys anything for *our* data size — our marts comfortably ship
to the client.

### Decision 2 — web framework (free + open-source)

**Evidence.dev** — MIT-licensed, SQL-first BI framework. Analysts author pages as **markdown + SQL**;
it renders charts and maps and **builds to a fully static site**. It is **built on DuckDB**: at build
time it ingests sources (including parquet and the DuckDB file) into parquet, and the resulting site
runs **DuckDB-WASM in the browser** to query those parquet files — i.e. it *is* Option A, with
in-browser SQL, out of the box. First-class dbt/DuckDB fit; the `data-analyst` can author most pages
in SQL + markdown (matching the PROJECT_PLAN frontend-ownership split) with the web-engineer doing
components/theming/deploy. Strongest fit for a data-heavy stats site; lowest custom-code surface.

**Observable Framework** — MIT-licensed, static-site data-app framework (JS/TS + markdown). Extremely
flexible, excellent for bespoke visualizations, also supports DuckDB-WASM and parquet "data loaders."
But it is **JS-first, not SQL-first**: it shifts page-authoring from the analyst (SQL) onto the
web-engineer (JS/TS), inverting the planned ownership split and raising the custom-code/maintenance
burden for what is fundamentally a tabular-stats site. Keep as the escape hatch if a visualization
outgrows Evidence's components.

**Svelte / Next.js + static export** — fully capable and free, but starts from a blank app: every
chart, data-loader, and page is bespoke. Maximum flexibility, maximum build-and-maintain cost, no
SQL-first authoring. Unjustified for this product now.

### Decision 3 — hosting (free)

**GitHub Pages** vs **Cloudflare Pages** — both free and adequate. Cloudflare Pages has a stronger
global edge cache (better for a static, read-mostly site), unlimited bandwidth on the free plan, and
generous limits (25 MiB/file, 20,000 files/site) that comfortably hold our parquet bundle. GitHub
Pages is the zero-extra-account option (the repo already lives on GitHub) but has a softer cache and
a ~1 GB / 100 GB-bandwidth-month soft envelope and base-path quirks for project sites.

## Decision

1. **Serving approach — Option A (static export), decided.** Publish dbt marts to **parquet** (small
   JSON only where a tiny config-like payload is clearer), bundle them into the web build, and serve a
   **pure static site** whose interactivity is provided by **in-browser DuckDB-WASM** querying the
   bundled parquet. No live database is required to view the site.

2. **MotherDuck is NOT adopted for serving; ADR-0001 is updated here.** ADR-0001's tentative
   "MotherDuck to host/serve the website" is **superseded by this ADR**: serving needs no MotherDuck.
   MotherDuck remains an **optional, free-tier-only convenience target for the dbt warehouse itself**
   (F2: `dbt build --target md` for cloud-hosted *building/sharing of the warehouse*, same models per
   ADR-0001) — but it is **never on the path between a visitor and the website**, and the site never
   embeds a MotherDuck token. This keeps golden rule #5 (local-first, no account to preview) intact.

3. **Web framework — Evidence.dev (MIT), decided.** It is the SQL-first, DuckDB-native, static-output
   framework that *is* Option A by construction, matches the analyst-authors-SQL ownership split, and
   minimizes bespoke code. **Observable Framework** is recorded as the sanctioned fallback for any
   bespoke visualization Evidence cannot express; adopting it for a page would be a minor amendment to
   this ADR, not a new tool fight.

4. **Hosting — Cloudflare Pages (free), decided**, for edge caching, unlimited bandwidth, and headroom
   that fit a static-parquet site; **GitHub Pages is the documented fallback** (no extra account) and
   the local `evidence build` / preview server is the always-available offline path. **Deploy from
   `main`** (ADR-0011): the public site builds from `main`; `develop` may produce a **preview
   deployment** (Cloudflare preview branch) but is not the public source of truth.

5. **Why Option A over B, concretely.** Our published marts are single-digit MB — they *ship to the
   client*. Option B would trade away local-first previewing, add a mandatory third-party account and
   an awkward public-token security model, and add per-query latency, in exchange for a "query data too
   big to ship" capability we do not need. Option A is the simplest option that fits — the standing
   architectural preference. If a future dataset genuinely outgrows a client-side bundle (e.g. the
   full longitudinal OSM POI history exposed raw to the browser), revisit with a *hybrid*: keep the
   curated marts static and add a MotherDuck-backed "deep query" page behind its own ADR — without
   making the *core* site depend on an account.

## Consequences

- **`web/` directory layout (implication of this decision; scaffolded later under G0/G1, not here).**
  This ADR only decides the shape; no `web/` code is created now. The implied layout is an Evidence
  project under `web/` (the `web/` domain reserved in ADR-0001):

  ```
  web/
    package.json            # Evidence app + pinned deps (Node toolchain; cross-platform)
    evidence.config.yaml    # data sources, deploy/base-path config
    sources/                # Evidence data-source defs → read the published marts (DuckDB file / parquet)
    pages/                  # markdown + SQL pages: index, time-series, maps, area drill-down,
                            #   methodology (G2), attribution/ethics (G3) — city-parameterized (ADR-0005)
    components/             # shared web-engineer-owned components/theming
    static/                 # published parquet/JSON marts bundle (gitignored; rebuilt from dbt — ADR-0001/0008 data policy)
  ```

  The published-marts bundle is a **build artefact rebuilt from dbt**, so it is **gitignored** like all
  other rebuilt artefacts, per ADR-0001 ("large/raw data is gitignored and rebuilt from open sources");
  only the Evidence source code (pages/components/config) is committed. A `poe` task will wire
  `dbt build` → export marts → `evidence build` (refresh/orchestration is F3's ADR, out of scope here).

- **dbt gains a "publish marts to parquet" step** (F2 territory): the marts that feed the site are
  exported to `web/static/` (or an equivalent staging dir) as parquet. Mechanics — which marts, the
  export task, the refresh cadence — belong to F2/F3, not this ADR.

- **Node toolchain joins the repo** (Evidence is Node-based). It is pure-JS and cross-platform
  (mac/Windows/Linux), satisfies "no OS-specific CLI," and is confined to `web/`; the data stack
  (uv/dbt/DuckDB) is untouched. The web-engineer pair (G0) owns this toolchain.

- **Local-first preview is guaranteed.** A fresh clone can `dbt build` → export → `evidence dev` and
  see the whole site with **no MotherDuck account, no token, offline**. Golden rule #5 holds.

- **Refresh = rebuild + redeploy.** Updating the published statistics is a pipeline rerun + redeploy,
  not a live edit. Acceptable for a slow-moving statistic; the cadence/orchestration is F3's decision.

- **G0–G3 are unblocked.** G0 (web-engineer agent definitions) can be scoped to an Evidence +
  Cloudflare Pages toolchain; G1 builds the Evidence site; G2 (methodology) and G3 (attribution/ethics)
  become Evidence markdown+SQL pages. The frontend-ownership split in PROJECT_PLAN (analyst authors
  SQL+markdown pages; web-engineer does components/theming/deploy) is realized exactly by this choice.

- **ADR-0001 amended-by-supersession on the serving point only.** ADR-0001's "MotherDuck … to
  host/serve the website" clause is superseded here; ADR-0001's warehouse stack (DuckDB local,
  MotherDuck optional free-tier *build* target, same models) otherwise stands unchanged.

- **Reversible.** If Evidence proves limiting, Observable Framework (also static + DuckDB-WASM) is a
  drop-in alternative for the framework decision without revisiting Options A/B or the hosting choice;
  if Cloudflare ever adds friction, GitHub Pages is the documented fallback.

## References

- #33 (F1 tracking issue). PROJECT_PLAN.md Epic F (F1/F2/F3) + Epic G (G0–G3); "Evidence.dev static
  site, free hosting" in the stack-mapping table; frontend-ownership split note.
- ADR-0001 (stack & monorepo — the superseded serving clause; the `web/` domain; "no cloud CI / local
  gate"; data-is-rebuilt-and-gitignored policy), ADR-0005 (city-agnostic core — site is parameterized
  by city), ADR-0011 (publish from `main`; `develop` preview).
- Evidence (MIT, evidence-dev/evidence — static build, DuckDB-WASM in-browser SQL over parquet),
  Observable Framework (MIT — static, DuckDB-WASM; fallback), DuckDB-WASM (in-browser parquet via
  Filesystem/HTTP), Cloudflare Pages free-tier limits (25 MiB/file, 20,000 files, unlimited
  bandwidth), GitHub Pages (fallback host).
