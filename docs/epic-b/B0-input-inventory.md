# B0 — Artifact inventory & pragmatic input sourcing

- **Status:** Accepted (ratified 2026-06-18)
- **Issue:** [#13 — B0 Artifact inventory & pragmatic input sourcing](https://github.com/dhelweg/gentriduck/issues/13)
- **Scope:** Epic B (revive the 2018 concept; **directional** check, not exact reproduction).

## What this is

The 2018 thesis ([masterthesis2018_gentrification](https://github.com/dhelweg/masterthesis2018_gentrification))
was built on **Hive SQL + HDFS + Java UDFs + R + Weka** against an internal Hadoop cluster. The
public thesis repo is **mostly pipeline SQL and processed outputs** — it does **not** ship the raw
inputs (no OSM dumps, no LOR geometries, no EWR extracts). This document inventories what is
present vs missing, and recommends a **pragmatic input strategy** so the Epic B revival can proceed
without recreating 2018 vintage data byte-for-byte (which is impossible — the source Hadoop cluster
no longer exists).

## Inventory

The thesis repo was checked out shallowly for read-only inspection at
`data/raw/mt2018/` (gitignored on this machine; never re-pushed). Counts and sizes captured
2026-06-17.

### What the thesis repo provides

| Path (in mt2018) | Kind | Size | Notes |
|---|---|---|---|
| `system/*.sql` | **Pipeline SQL** (Hive) — 61 files, `10_*` → `99_*` | ~ small | Layered: `10_staging` → `20–25_transform` → `30–38_state` → `40–47_features` → `50–61_lor_idx` → `70–71_oa` → `80–81_results` → `90–99_analysis/DQ`. Hive-specific (`add jar`, `OSM2Hive` `CREATE TEMPORARY FUNCTION`, HDFS paths). Logical reference only — not directly runnable. |
| `data/poi_mapping.csv` | **Golden seed** — POI tag → domain/category/type mapping | 8 KB, 163 rows | Drives all `40_*` feature joins. Re-usable as a dbt seed. |
| `data/full csv exports/20180909_result_full_bzr.csv` | **Golden output** — final index per BZR (Bezirk) | 17 MB total folder | 137 rows of data (one per Bezirk, +header) — every metric the paper reports. |
| `data/full csv exports/20180909_result_full_plr.csv` | **Golden output** — final index per PLR (Planungsraum) | — | 436 PLRs × all metrics. |
| `data/full csv exports/20180909_result_full_plr_distcalc.csv` | **Golden output** — PLR index using POI distance-weighted features (Java UDF) | — | 436 PLRs × all metrics. |
| `data/ready_4_ML/*.arff` | Weka inputs (per-hypothesis: h1, h2, h3a, h3b, h3c × bzr|plr-dc) | 44 MB folder | Useful as reference for **Epic E** (replace Weka with scikit-learn) — not needed for B. |
| `data/ready_4_ML/*.log`, `*.exp` | Weka run logs / experiment specs | — | AUC + F-weighted scores per hypothesis — the **directional comparison target** for Epic E. |
| `data/*.xlsx` (`experimente*`, `osm_poi_state`, `lor_own_idx`, `OSM_POI_MAPPING`, `regressionen_bzr_indexwert`) | Analysis spreadsheets | ~36 MB | Author's working sheets — useful narrative reference, not pipeline inputs. |
| `java udf/lormapper_run1c.jar` + sources | Java UDF — maps OSM coords → LOR area id | 50 MB | Replaced by DuckDB `ST_Within` (ADR-0001). Kept as logical reference. |
| `Helweg_Masterarbeit_final.pdf` + colloquium PDF | The thesis itself | 8 MB | Primary methodology reference. |

### What the thesis repo **does not** provide

| Missing input | Why we need it | Sourced from in Gentriduck |
|---|---|---|
| **Raw OSM POI data** for the 2014/2017 cuts | The 2018 pipeline began from `osmdata` in HDFS, populated by `OSM2Hive` from PBF — that table is not in the public repo. | Re-source via the **ohsome API** (ADR-0002) → fresh historical snapshots; we do **not** try to reconstruct the exact 2014/2017 vintages. |
| **LOR (PRG / BZR / PLR) geometries** | `lormapper` UDF takes coords + LOR polygons → area id. The polygons aren't in the repo. | Re-source via **gdi.berlin.de / FIS-Broker WFS** (ADR-0003). |
| **EWR (Einwohnerregister) per-LOR table** | Every `50_lor_ewr_*` and `51_lor_ewr_einwohnergewichtet*` view reads from a pre-loaded EWR table. The raw EWR extracts (the K11/D2/EE/MH/etc. demographic counts per PLR per year) are not in the repo. | Re-source via **daten.berlin.de** annual EWR per-PLR CSV (ADR-0003). |
| **Bodenrichtwerte / Mietspiegel / Wohnungsmarktbericht** | Not used in the 2018 thesis — added in Epic D. | Per **ADR-0003**. |
| **Cluster bindings** — Hive jars, OSM2Hive jar, OSM2Hive history loader | Hadoop-era infra. | Not re-instated; the 2018 stack is replaced by dbt + DuckDB + ohsome + Berlin WFS. |

## Methodology that **is** preserved by the thesis repo (highly reusable)

Although the **inputs** are missing, the **logic** is fully documented:

1. The **`status_klasse_prj` / `dynamik_klasse_prj` projected-class** scheme from
   `80_result_full_plr.sql` — the operationalisation of "gentrification status × dynamic".
2. The **own index** (`60_lor_own_idx.sql` and friends) — z-score of K11 / DAU5 / DAU10 / Döring–Ulbricht
   sub-indices etc., summed into `own_idx_class` (5 buckets) and `own_idx_class_bi` (binary).
3. The **POI feature pivots** (`45/46/47_*_piv*.sql`) — domain / category / type aggregations per LOR
   area, with and without **distance-weighted** variants.
4. The **hypothesis SQL** (`80_result_h1*.sql` … `80_result_h3c*.sql`) — exactly what columns the
   paper's H1/H2/H3a/H3b/H3c regressions read.
5. The **golden CSVs** themselves — they let us run a **column-level reconciliation** between any
   re-implemented index and the paper's reported numbers, even if the underlying data vintages differ.

## Recommended pragmatic input strategy

> Goal of Epic B is **directional** revival (see `PROJECT_PLAN.md`): do the H1–H3c **conclusions still
> hold** with current open data, and does the index rank Berlin's LORs in a way that matches the
> 2018 ordering qualitatively? **Exact number-for-number reproduction is explicitly not required.**

Three tiers, in order of priority:

### Tier 1 — Reference data (commit to `reference/`)

Land these in the public repo so the directional check is reproducible from a fresh clone:

- `reference/system/*.sql` — all 61 thesis SQL files. **Read-only reference**; we do not run them.
- `reference/poi_mapping.csv` — POI tag mapping (8 KB, 163 rows). Becomes a **dbt seed** later
  (`transform/seeds/seed_poi_mapping.csv`) once Epic B model wiring needs it.
- `reference/result_full_bzr.csv`, `reference/result_full_plr.csv`,
  `reference/result_full_plr_distcalc.csv` — the three golden output CSVs (17 MB). These are the
  **directional comparison targets** for B5/B6 and the input for the Epic E classifier
  comparison.
- `reference/ODbL_LICENCE` — accompanying ODbL notice that ships with the goldens (OSM-derived).
- `reference/README.md` — a short index of what's in the folder and that it is **read-only**.

Sizes are small enough that committing them is fine for a public repo (~17 MB total). The Weka
ARFFs and the Java JAR / xlsx are **not** committed — kept only locally if needed for Epic E.

### Tier 2 — Re-sourced raw inputs (gitignored under `data/raw/`)

These are downloaded per-machine via the future `ingestion/` modules:

- **Berlin LOR geometries** (current + LOR-2021): `gdi.berlin.de` / FIS-Broker WFS → GeoParquet
  → `data/raw/berlin/lor/`.
- **EWR per-PLR socio-economic series**: `daten.berlin.de` annual CSVs → `data/raw/berlin/ewr/`.
- **OSM POI full history**: Geofabrik regional `.osh.pbf` (Germany, OSM contributor login per
  ADR-0002) → `data/raw/osm/germany.osh.pbf`. Processed once with `quackosm` into a
  GeoParquet of POI edit history `(poi_id, valid_from, valid_to, geometry, tags)` →
  `data/raw/osm/berlin_poi_history.parquet`. Annual new/closed counts are **derived** in
  the intermediate layer, not pre-materialised as N snapshot files.
- **EWR per-PLR socio-economic series**: all available vintages from `daten.berlin.de`
  (31 Dec per year, back to earliest available) → `data/raw/berlin/ewr/`.

### Tier 3 — Skip / defer

- **Re-running the original Hive pipeline.** Out of scope: the cluster is gone, the OSM2Hive jar
  is tied to it, and the SQL is not portable enough to be worth porting line-by-line. We re-implement
  the **logic** in dbt + DuckDB models, taking the SQL as a written spec.
- **Reconstructing 2014/2017 vintages of OSM.** Not feasible with the public artefacts; ohsome can
  give us *historical* snapshots but tag drift makes a literal vintage match low-value (see C2/C5).
- **Re-using the Weka ARFFs as inputs.** They're **outputs** of the 2018 pipeline; they become
  Epic E's comparison baseline, not Epic B's input.

## Maintainer decisions (ratified 2026-06-18)

1. **Goldens committed — confirmed.** The three `result_full_*.csv` (~17 MB) stay in
   `reference/`. ODbL attribution covered by the accompanying licence file.

2. **OSM ingestion model — single history file, not per-year snapshots.**
   Download the Geofabrik regional `.osh.pbf` (Germany, via OSM contributor account per
   ADR-0002) once per machine into `data/raw/osm/`. Process it with `quackosm` to extract
   the full POI edit history as `(poi_id, valid_from, valid_to, geometry, tags)` — one row
   per POI *version*. Annual new/closed counts per area are then *derived* in
   `int_poi_development` from those timestamps, not materialised as N separate snapshot files.

   **Why this is better for gentrification analysis:** movement (new + closed POIs per year)
   is the meaningful signal, not a static count at a point in time. The history file captures
   exactly when each POI opened and closed, so annual net change falls out naturally.

   **Staging contract change:** `stg_osm_poi` schema becomes
   `(poi_id, valid_from, valid_to, lat, lon, geometry, domain, category, type, city_code)`
   rather than a `(year, poi_id, ...)` snapshot model. Downstream intermediate models
   compute `COUNT(*) WHERE valid_from <= year_end AND (valid_to IS NULL OR valid_to > year_start)`
   for total stock, and new/closed counts similarly.

3. **EWR — ingest all available years.** Pull every published vintage from `daten.berlin.de`
   (Berlin EWR is semi-annual, 30 Jun + 31 Dec, going back to at least 2010). Pin to the
   **31 December** snapshot per year for the longitudinal series. This gives the full
   time-series context rather than just the 2017/2018 snapshot, matching the ambition of
   showing the full development arc on the public site.

## Next steps (this overnight session, if time)

- **B1** Commit Tier-1 reference data into `reference/`.
- **B2** Stand up `stg_berlin_lor`, `stg_berlin_ewr`, `stg_osm_poi` (skeletons reading future
  parquets — gated behind a "no input" early-exit until the ingestion lands).
- **B3** Intermediate POI mapping + pivot + spatial-distance models (DuckDB `ST_Distance` /
  `ST_DWithin`).
- **B4** First-cut `gentrification_index_*` mart using the goldens **as a seed-driven baseline** so
  the dbt graph builds end-to-end; replace the seed with computed values once the Epic C ingestion
  catches up.

If the inputs aren't available without a new data source, **stop at staging with a clear note** —
no fabricated data.
