# OSM extractor fixes (2026-10-26) — before/after evidence

Evidence for the geo-DS and domain sign-off of commit `13fb28ef` (`fix(osm): apply OSM deletions;
restore first-match classification`), as requested by the data-engineer-reviewer pass (finding 1).
Both fixes are in the shared `_MultiYearSnapshotHandler` (`ingestion/berlin/osm/ingest_osm_history.py`),
so they apply to Berlin and Hamburg alike.

**Inputs:** one `germany-internal.osh.pbf` downloaded 2026-10-25 (12,438,422,420 bytes). Three
extractions of it are compared, plus the June 2026 extraction:

| Label | Code | Handler behaviour |
|---|---|---|
| **June** | pre-#252 (June 2026 run) | first-match, deletion-blind |
| **pre-fix** | post-#252, before `13fb28ef` | **last**-match, deletion-blind |
| **fixed** | `13fb28ef` | first-match, deletions applied |

## 1. First-match classification restored

`#252` (I20, 2026-07-12) removed the tag loop's `break` so it could keep scanning for `cuisine`.
That silently turned "first matching tag wins" into "last matching tag wins" for POIs carrying
several mapped tags. Evidence that this, not the `#201` seed change, caused the reclassifications
seen in 2026-10-25's re-extraction: 332 of 338 reclassified 2012–2013 rows moved from an
alphabetically earlier OSM key to a later one (amenity→shop, amenity→tourism), 0 counterexamples,
6 ambiguous. The extractor's tag mapping is a hard-coded dict; `load_poi_mapping` never reads the
seed.

After the fix, against June (both first-match), for every POI present in both:

| Year | Shared POIs | `poi_type` identical |
|---|---|---|
| 2012 | 35,828 | **100.00%** |
| 2013 | 41,665 | **100.00%** |

## 2. Deletions applied

OSM history files carry **no location for a deleted version**. The handler read `n.lon` first, got
`InvalidLocationError` and returned — before its own `if not n.visible: pop(...)` branch could run.
So every hard-deleted POI node stayed in every later snapshot. Deleted versions now fall through
as "not in bbox" and are removed from each snapshot at/after their timestamp; a later visible
version restores the node (tests: `tests/ingestion/test_osm_history_extraction.py`).

Fixed vs pre-fix, same PBF (POIs removed = deleted nodes the old handler kept). The fix only ever
removes: **0 POIs added in every year, both cities.** June-only POIs in 2012 (5,099) equal the
2012 removals exactly — June carried the same ghosts.

| Year | Berlin before | after | removed | % | Hamburg before | after | removed | % |
|---|---|---|---|---|---|---|---|---|
| 2008 | 1,053 | 1,018 | 35 | 3.3 | 843 | 833 | 10 | 1.2 |
| 2009 | 8,245 | 7,634 | 611 | 7.4 | 5,828 | 5,419 | 409 | 7.0 |
| 2010 | 17,797 | 16,112 | 1,685 | 9.5 | 13,583 | 12,148 | 1,435 | 10.6 |
| 2011 | 29,894 | 26,720 | 3,174 | 10.6 | 20,307 | 18,062 | 2,245 | 11.1 |
| 2012 | 40,927 | 35,828 | 5,099 | 12.5 | 25,340 | 22,100 | 3,240 | 12.8 |
| 2013 | 49,341 | 41,665 | 7,676 | 15.6 | 31,844 | 27,333 | 4,511 | 14.2 |
| 2014 | 55,126 | 45,429 | 9,697 | 17.6 | 36,040 | 30,480 | 5,560 | 15.4 |
| 2015 | 61,084 | 49,297 | 11,787 | 19.3 | 39,461 | 33,157 | 6,304 | 16.0 |
| 2016 | 70,285 | 55,603 | 14,682 | 20.9 | 43,634 | 36,615 | 7,019 | 16.1 |
| 2017 | 82,419 | 65,618 | 16,801 | 20.4 | 47,452 | 39,567 | 7,885 | 16.6 |
| 2018 | 91,226 | 72,199 | 19,027 | 20.9 | 50,305 | 41,703 | 8,602 | 17.1 |
| 2019 | 102,672 | 81,154 | 21,518 | 21.0 | 57,313 | 47,656 | 9,657 | 16.8 |
| 2020 | 111,362 | 87,767 | 23,595 | 21.2 | 62,401 | 51,905 | 10,496 | 16.8 |
| 2021 | 125,362 | 99,135 | 26,227 | 20.9 | 66,307 | 55,088 | 11,219 | 16.9 |
| 2022 | 136,011 | 108,004 | 28,007 | 20.6 | 71,085 | 58,449 | 12,636 | 17.8 |
| 2023 | 155,502 | 125,595 | 29,907 | 19.2 | 75,196 | 61,722 | 13,474 | 17.9 |
| 2024 | 177,236 | 145,285 | 31,951 | 18.0 | 80,510 | 66,128 | 14,382 | 17.9 |
| 2025 | 191,354 | 157,455 | 33,899 | 17.7 | 88,026 | 72,882 | 15,144 | 17.2 |
| 2026 | 203,531 | 166,862 | 36,669 | 18.0 | 96,125 | 80,033 | 16,092 | 16.7 |

**Why this matters methodologically.** The ghost share *grows* over time (≈3% → ≈21% in Berlin by
2016), so in every analysis to date part of the measured commercial growth was accumulated
deletions. That biases D3 dynamism, OA trends and every lead-lag test toward "growth" — and it does
so unevenly across areas (more mapping churn → more ghosts).

## 3. Caveat for the reviewers: node → way conversions

The extractor reads **nodes only**. When a mapper redraws a shop node as a building polygon (way),
the node is deleted. Before the fix the ghost node kept such a POI counted — by accident, and
together with every genuinely closed POI. After the fix it disappears like every POI that is mapped
as a way. So the fixed data has one consistent meaning — *POIs mapped as nodes at that date* —
where the old data was an inconsistent mix of live nodes and ghosts of both closures and
conversions. Node→way conversions would plausibly concentrate in later, better-mapped years; the
plateau and slight decline of the removed share after ~2016 is consistent with but does not prove
that. Not quantified here: separating conversions from closures needs the way history, which this
node-only extractor does not read. The existing C5 completeness correction (index-definition.md
§2.4) is the established place where OSM coverage effects are modelled; whether it should account
for node→way migration is the geo-DS's call.

## Downstream

`poe resync` on the fixed data and the re-run of `poe analysis` / `poe backtest` regenerate every
findings document; their changes against the previous editions are the downstream effect of these
two fixes (and of the separate analysis-method fixes on `fix/methodology-evidence-integrity`).
