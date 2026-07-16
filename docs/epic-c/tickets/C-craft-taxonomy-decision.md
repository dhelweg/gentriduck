# C-craft-taxonomy — Inventory & Adoption Decision

- **Issue:** [#271](https://github.com/dhelweg/gentriduck/issues/271)
- **Date:** 2026-07-16
- **Branch:** `feature/271-craft-taxonomy`
- **Decision: DO NOT ADOPT `craft=*` into `poi_mapping`/the index at this time — documented no-op.**
  Per the ticket's own gate framing ("otherwise DE pair → reviewer for a pure
  documentation/no-op decision"), this decision does **not** enter `poi_mapping` or any
  R-C1-gated file, so it does not trigger the geo-DS + domain-expert dual gate. A scoped
  follow-up (below) is filed for a possible future curated subset.

---

## Method

`craft=*` is not in C1's `poi_mapping` tag-extraction dict (`ingest_osm_history.py`'s
`load_poi_mapping()`), so it was never captured in any ingested parquet/warehouse table —
there was no shortcut via the existing warehouse. Inventory required a fresh pass over the
raw source: `data/raw/osm/germany-internal.osh.pbf` (12GB, full German edit history, ADR-0002
Option B), filtered to the Berlin bbox, snapshotted at 2024-01-01T00:00:00Z (matching the
`_MultiYearSnapshotHandler` semantics `ingest_osm_history.py` already uses for real ingestion).

Implementation note (kept for future reuse): a naive pure-Python per-node-version callback
(iterating every node version in the file and checking its tags in Python) measured ~1.3MB/s
against the 12GB file — an infeasible ~150 minute single-pass ETA. Chaining a native
`osmium.filter.KeyFilter("craft")` ahead of the Python handler via `osmium.apply()` (C++-side
tag filtering, so only `craft=*`-tagged node versions ever reach the Python callback) cut this
to ~2 minutes (~100x). No new tool/dependency — `osmium.filter` ships in the already-approved
`osmium` package (ADR-0002). This technique should be the default pattern for any future
one-off raw-history inventory query, and is worth a short note in `ingest_osm_history.py`'s
module docstring if a similar inventory is ever needed again.

## Results (Berlin bbox, 2024-01-01 snapshot)

- **1,731** total `craft=*` POIs (node versions visible at snapshot date, in bbox).
- **138** distinct raw `craft` values.
- For context: the existing (already-adopted) POI base is **160,398** POIs across all domains
  for the same city/year (`fct_poi_development`, `snapshot_year=2024`, `city_code='BER'`,
  `sum(poi_count)`). `craft=*` would add **~1.1%** to the current POI volume if adopted in full.

Top values by volume: `tailor` (132), `photographer` (110), `caterer` (85), `plumber` (84),
`shoemaker` (78), `electrician` (66), `glaziery` (63), `painter` (52), `electronics_repair` (50),
`hvac` (50), `handicraft` (46), `joiner` (45), `metal_construction` (44), `key_cutter` (42),
`carpenter` (39), `locksmith` (36), `builder` (33), `cleaning` (30), `stonemason` (28),
`roofer` (28), `pottery` (26), `atelier` (25), `gardener` (24), `jeweller` (23),
`dressmaker` (23), `upholsterer` (23), `beekeeper` (21), `yes` (21), `printer` (18),
`floorer` (18), `optician` (17), `brewery` (17) ... a long tail of ~100 further values at
≤13 occurrences each, many singletons.

Full raw counts: `docs/epic-c/tickets/C-craft-taxonomy-inventory-2024.json` (committed alongside
this doc for audit trail).

## Data-quality caveats observed (would need cleanup before any adoption)

1. **Semicolon-delimited multi-values**: `hvac;plumber`, `hvac;plumber;tiler`,
   `key_cutter;shoemaker`, `tailor;shoemaker`, `key_cutter;tailor;shoemaker`, etc. — OSM's
   documented multi-value convention for `craft=*`, not present in any currently-adopted
   `poi_mapping` tag, would need new parsing logic.
2. **Near-duplicates / inconsistent casing / typos**: `frame-maker` vs `frame_maker`,
   `jeweller` vs `juweller`, `keycutter,shoemaker` (comma instead of semicolon — a tagging
   error), `printer` vs `print_shop` vs `printers` vs `printing` vs `printmaker`.
3. **Non-craft / junk values**: `yes` (21 occurrences — a boolean placeholder, not a craft
   type), `other`, `workshop`, `souvenir`, `maintenance`, `janitor`, `model`, `oem` — none of
   these describe an actual craft category and would need to be dropped, not mapped.
4. **Free-text outliers**: `"Make-up Artist SFX"`, `"tiledecoration & murals"` — user-entered
   text rather than the standard OSM value vocabulary.

## Methodology assessment (why not adopting now)

1. **Mixed / unclear gentrification relevance.** The existing `seed_poi_canonical_category`
   "Hipster" bucket (`office=coworking` → `gentrification_proxy=true`) sets the bar: it is a
   *lifestyle/amenity* signal theorized to track incoming higher-income, creative-class
   residents (thesis §3.2; Zukin 2010's "artisanal economy" literature on gentrification-coded
   small-batch retail/craft). Only a **minority** of the 138 `craft=*` values plausibly meet
   that bar — creative/artisanal crafts such as `atelier`, `pottery`, `jeweller`, `glassblowing`,
   `bookbinder`, `luthier`, `sculptor`, `photographer`/`photo_studio`, `printmaker`. The
   **majority** of the volume is basic trade/utility crafts — `plumber`, `electrician`, `hvac`,
   `locksmith`, `roofer`, `builder`, `scaffolder`, `carpenter`, `joiner`, `painter`,
   `metal_construction` — which are supply-side infrastructure/repair services present at
   roughly constant density regardless of neighborhood socio-economic trajectory, with no
   established theoretical link to gentrification in the thesis or the cited literature.
   Mapping the whole namespace into one bucket (as a naive "adopt craft=*" would do) would
   inject noise into any composite that treats it as a signal; a curated subset would be
   needed, which is a real methodology-bearing design decision (tier selection, weighting) —
   not a mechanical crosswalk.
2. **Modest volume relative to cost.** At ~1.1% of the current POI base, and with a long tail
   (most distinct values under 5 occurrences), the achievable signal-to-noise improvement from
   adopting even a curated subset is small in the near term.
3. **Adoption cost is a full C1 re-ingestion, not a cheap seed edit.** Unlike a pure
   `seed_poi_canonical_category` addition, `craft=*` tags are not currently captured in *any*
   ingested parquet at all (`load_poi_mapping()`'s dict gates what `ingest_osm_history.py`
   extracts from the `.osh.pbf` in the first place). Adopting any craft value — even a small
   curated subset — requires adding entries to `load_poi_mapping()` **and re-running the full
   multi-year OSM history ingestion** (~75 min/year-worker per the module's own performance
   note; ~2.5–3.5h for the full 2008–2026 range) to backfill it into every existing year's
   parquet, not just forward. That is a disproportionate one-time cost to pay speculatively
   without a specific downstream use (e.g. a new sub-index or site feature) driving the need.

None of the above forecloses adoption — it is a **now vs. later** call given today's evidence,
not a permanent rejection.

## Decision

**Do not adopt `craft=*` into `poi_mapping` / `seed_poi_canonical_category` at this time.**
This is a documented no-op: no `poi_mapping`, `seed_poi_canonical_category`, or any R-C1-gated
file changes. Per the ticket's own gate framing this stays on the DE-pair→reviewer
(non-methodology-bearing) track.

## Follow-up filed

[#275](https://github.com/dhelweg/gentriduck/issues/275) — a scoped future ticket for a
**curated artisanal-craft subset** (not the full namespace): map only the creative/artisanal
`craft=*` values (`atelier`, `pottery`, `jeweller`, `glassblowing`, `bookbinder`, `luthier`,
`sculptor`, `photographer`, `photo_studio`, `printmaker`, and similar) into a new canonical
category, explicitly excluding trade/utility crafts. Filed low-priority/parked — no specific
consumer (sub-index or site feature) currently needs it, so it should wait until one does, per
this ticket's cost-vs-benefit finding above. Genuinely methodology-bearing if picked up (enters
`poi_mapping`), so it will need the full geo-DS + domain dual gate at that time.

## Source

`transform/models/intermediate/int_osm_poi_harmonized.sql:23` ("craft=* namespace is not in C1
poi_mapping — flag PM for a follow-up ticket"), `docs/epic-c/tickets/C-craft-taxonomy.md`.
