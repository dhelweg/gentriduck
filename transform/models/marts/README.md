# Marts

Governed, contract-enforced output tables for the Gentriduck warehouse.
Consumers (website, analysis notebooks) read from marts only.

## Available

| Model | Grain | Status |
|---|---|---|
| `gentrification_index` | city × area_level × area_code × period_yyyymm × variant | Active (Epic B golden baseline) |

## Deferred

**`h1` / `h2` / `h3a` / `h3b` / `h3c` marts** — the regression-ready joined
datasets for hypotheses H1–H3c require:
- Fresh POI feature counts per area per period (`stg_osm_poi` → `int_poi_pivot`)
- EWR socio-economic features per area per year (`stg_berlin_ewr`)
- Spatial joins for area assignment (`stg_berlin_lor` → DuckDB `ST_Within`)

None of these inputs have been ingested yet; `stg_osm_poi`, `stg_berlin_lor`,
and `stg_berlin_ewr` are stubs returning zero rows (see `staging/` models).

These marts are unblocked when Epic B2–B4 ingestion lands:
- **B2** `stg_osm_poi` + `stg_berlin_lor` (LOR geometries WFS)
- **B3** `int_poi_mapping`, `int_poi_pivot`, `int_poi_distance`
  (spatial joins via `ST_Distance` / `ST_DWithin`)
- **B4** h1–h3c hypothesis marts

See `docs/epic-b/B0-input-inventory.md` and `docs/PROJECT_PLAN.md` (Epic B backlog).
