# B2-B4 Progress — overnight session 2026-06-17

**Status:** Epic B baseline dbt graph built and passing. Full `uv run poe build` green.

## What was built tonight

The minimum working dbt graph from committed reference data only (no fabricated data,
no new data sources).

### Seeds (`transform/seeds/`)
- `seed_dim_city.csv` — Berlin (`BER,Berlin,DE`)
- `seed_dim_area_level.csv` — two active levels (`bzr / plr`); `bezirk` deferred to Epic C

### Staging (`transform/models/staging/`)
- `stg_thesis_2018_result_bzr` — 2018 thesis golden at BZR level; 137 rows; latin-1 decoded
- `stg_thesis_2018_result_plr` — 2018 thesis golden at PLR level; 436 rows; latin-1 decoded
- `stg_thesis_2018_result_plr_distcalc` — 2018 thesis golden PLR distance-weighted variant
- `stg_osm_poi` — **STUB** (zero rows; ADR-0002)
- `stg_berlin_lor` — **STUB** (zero rows; ADR-0003)
- `stg_berlin_ewr` — **STUB** (zero rows; ADR-0003)

### Intermediate (`transform/models/intermediate/`)
- `int_thesis_2018_area_index` — union of all three staging models; `variant` discriminator
- `dim_city` — view over `seed_dim_city`
- `dim_area` — distinct area × level; joins `seed_dim_area_level` for `level_name`;
  `parent_area_code` deferred to when `stg_berlin_lor` is populated

### Marts (`transform/models/marts/`)
- `gentrification_index` — governed table mart (ADR-0004 contract enforced);
  grain: `(city_code, area_level, area_code, period_yyyymm, variant)`

**Test count:** 61 dbt tests, all passing.
**Build result:** PASS=73 WARN=0 ERROR=0 SKIP=0 TOTAL=73.

## Blockers / deferred

1. **h1/h2/h3a/h3b/h3c marts** — require `stg_osm_poi` + `stg_berlin_lor` + `stg_berlin_ewr`
   to be populated. These are stubs pending Epic B2 ingestion:
   - B2: `ingestion/berlin/osm/` (ohsome API or fallback PBF — ADR-0002)
   - B2: `ingestion/berlin/geographies/` (LOR WFS — ADR-0003)
   - B3: `int_poi_mapping`, `int_poi_pivot`, `int_poi_distance` (ST_Distance/ST_DWithin)
   - B4: hypothesis marts

2. **`parent_area_code` in `dim_area`** — needs LOR geometry crosswalk from
   `stg_berlin_lor`. Documented in model SQL; deferred to Epic B2/C.

3. **dbt deprecation warnings** — `MissingArgumentsPropertyInGenericTestDeprecation` x10
   (confirmed in latest run). Non-breaking dbt 1.9+ style change: `accepted_values` test
   `values:` parameter should be nested under `arguments:`. Tests pass; cleanup can be done
   before dbt 2.0. Task: change `values: [...]` to `arguments: { values: [...] }` in all
   schema.yml files.

## Path resolver

The staging models resolve the CSV path via:
```sql
read_csv('{{ var("project_root") }}/reference/goldens/...csv', encoding='latin-1', auto_detect=true)
```
where `project_root` defaults to `env_var('PWD', '.')` in `dbt_project.yml`. This works when
`poe build` is run from the repo root (CWD = repo root). Override via
`--vars 'project_root: /absolute/path'` if needed.

## Next steps (Epic C ingestion — ratified 2026-06-18)

B0 decisions updated the OSM strategy — see `docs/epic-b/B0-input-inventory.md`.

1. **Download** Geofabrik Germany `.osh.pbf` into `data/raw/osm/` (OSM contributor login).
2. **Implement** `ingestion/berlin/osm/` — process `.osh.pbf` with `quackosm` into
   `(poi_id, valid_from, valid_to, geometry, tags)` GeoParquet. Update `stg_osm_poi` stub
   to `valid_from`/`valid_to` schema (not `snapshot_year`).
3. **Implement** `ingestion/berlin/geographies/` — LOR WFS (pre-2021 + 2021 vintages) →
   GeoParquet → `data/raw/berlin/geographies/`.
4. **Implement** `ingestion/berlin/ewr/` — all available years (31 Dec per year) from
   `daten.berlin.de` → `data/raw/berlin/ewr/`.
5. **Add intermediate** `int_poi_development` — annual new/closed POI counts per area
   derived from `valid_from`/`valid_to` timestamps.
6. **Add** `int_poi_mapping`, `int_poi_pivot`, `int_poi_distance` (ST_Distance/ST_DWithin).
7. **Add** h1–h3c hypothesis marts.
