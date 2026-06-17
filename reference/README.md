# `reference/` — read-only reference from the 2018 thesis

Material copied from
[`dhelweg/masterthesis2018_gentrification`](https://github.com/dhelweg/masterthesis2018_gentrification)
that the Epic B revival uses as **read-only reference** — the original is the thesis of record and
must not be edited. Re-derived material lives under `transform/` and `ingestion/`, never here.

## Contents

| Path | What it is | Size |
|---|---|---|
| `system/*.sql` | The 2018 Hive SQL pipeline (49 files, `10_*` → `99_*`). Internal Hadoop cluster hostnames and account paths have been **redacted** to neutral placeholders (`<hadoop-cluster>`, `<redacted>`) per the project's privacy rule — the redaction does not affect any pipeline logic. Logical reference; **not directly runnable**. |  small |
| `poi_mapping.csv` | The (`domain`, `category`, `type`) POI taxonomy used by the thesis pivots (~163 rows; `;`-delimited). | 6 KB |
| `goldens/20180909_result_full_bzr.csv` | Per-BZR (Bezirk, 12-district level) **golden output** — every index metric the paper reports, one row per Bezirk. Generated 2018-09-09. | 2.5 MB |
| `goldens/20180909_result_full_plr.csv` | Per-PLR (Planungsraum, ~436 rows) **golden output**. | 6.0 MB |
| `goldens/20180909_result_full_plr_distcalc.csv` | Per-PLR golden using **distance-weighted** POI features (replaces the 2018 Java UDF; in Gentriduck implemented via DuckDB `ST_Distance` / `ST_DWithin`). | 9.1 MB |
| `goldens/ODbL_LICENCE` | Open Database License notice shipped with the OSM-derived goldens. | 0.3 KB |

## How this is used

- **B5 / B6 — directional reproducibility:** the goldens are the comparison target for the
  re-implemented index (column-level reconciliation per LOR area). Exact number match is **not**
  required — directional agreement is what Epic B verifies.
- **E1 / E2 — analysis & ML:** the goldens feed the scikit-learn classifier and the
  scipy/statsmodels regressions that replace Weka.
- **B3 / future seed:** the `poi_mapping.csv` is logically the seed for the POI taxonomy join; it
  will be re-keyed (and an OSM-tag → (domain/category/type) mapping added) under
  `transform/seeds/seed_poi_mapping.csv` once Epic B model wiring needs it.

## What's **not** in here (and why)

- **The Weka ARFFs / experiment logs / Java UDF jar / xlsx working sheets.** Kept only on local
  machines (in the gitignored `data/raw/mt2018/`); large and not needed for the directional check.
- **Raw OSM dumps / LOR geometries / EWR tables.** The thesis repo never published these — they
  came from the (now-defunct) internal cluster. Gentriduck re-sources them from open sources per
  **ADR-0002** (OSM history → ohsome) and **ADR-0003** (LOR + EWR + open price/rent).

## Licence

The OSM-derived goldens (`goldens/result_full_*.csv`) are **ODbL** — see `goldens/ODbL_LICENCE`.
Any derived work must carry the OSM attribution. The thesis SQL is included by reference for
documentation purposes; it has no separate licence statement in the upstream repo.
