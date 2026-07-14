# [C-craft-taxonomy] Harmonize craft=* OSM namespace into POI taxonomy

- **Issue:** [#271](https://github.com/dhelweg/gentriduck/issues/271)
- **Tier:** 3 · **Epic:** c · **Labels:** `epic-c,dbt,methodology-bearing`
- **Filed:** 2026-07-14, from the deferred-work audit ([index](./README.md))

---

**Why:** `int_osm_poi_harmonized.sql` carries an explicit unfiled TODO: "craft=* namespace is not in C1 `poi_mapping` — flag PM for a follow-up ticket." Craft POIs (bakeries-as-craft, breweries, ateliers, workshops, etc.) are a recognised amenity/gentrification-adjacent signal that the current taxonomy silently ignores because the C1 `poi_mapping` seed predates them.

**Goal:** Decide whether the `craft=*` OSM namespace should be harmonized into the POI taxonomy, and if so map it into `poi_mapping` / the canonical categories.

**Scope:**
- Inventory which `craft=*` values appear in the ingested OSM data and their volumes.
- geo-DS/domain decision on whether/how they map to canonical categories (some craft values are gentrification-relevant, others not) — this touches `poi_mapping` which feeds the index, so treat as methodology-adjacent.
- If adopted: extend `seed_poi_canonical_category` / `poi_mapping`; confirm no unintended index shift (leakage-guard-style check).

**Acceptance:**
- craft=* inventory documented; mapping decision recorded; if adopted, seed updated + tested with an index-impact check; `uv run poe build` green.

**Gate:** ⚖️ methodology-bearing if the mapping enters `poi_mapping`/index inputs — geo-DS + domain dual gate; otherwise DE pair → reviewer for a pure documentation/no-op decision.

**Deps:** C1/C2 taxonomy (#20/#21, closed). Relates to the OA taxonomy work (#170–#172).

**Source (why this is unfiled work):** `transform/models/intermediate/int_osm_poi_harmonized.sql:23` ("craft=* namespace is not in C1 poi_mapping — flag PM for a follow-up ticket").
