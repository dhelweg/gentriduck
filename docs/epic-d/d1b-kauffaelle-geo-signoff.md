# D1b Kauffälle block→PLR aggregation — Geo-DS sign-off
Date: 2026-06-29
Reviewer: geo-data-scientist
Scope: ADR-0003 Amendment P-D, Open condition 2 — block→PLR areal-interpolation method
for the AKS Kauffälle (transaction-count / market-churn dynamism indicator).
Staging model: `transform/models/staging/stg_berlin_verkaufte_grundstuecke.sql`.

## Verdict: PASS WITH CONDITIONS

The proposed method — `ST_Within` point-in-polygon assignment of block-level Point
transactions to PLR polygons, then a per-(PLR, year, teilmarkt) **count** aggregation
normalised to transaction density — is methodologically sound and is the correct,
defensible choice **for this specific data shape** (anonymised block centroids carrying
no €-value, only a transaction record). It is the same gate-approved pattern already in
use for OSM POIs (`int_osm_poi_plr.sql`, C3 sign-off), simplified by the fact that the
WFS delivers native EPSG:25833 so no `ST_Transform` round-trip is needed. Conditions
below are implementation guardrails, not blockers.

## Findings

### 1. Is `ST_Within` point-in-polygon the right join? — Yes.
Because the public WFS exposes only `id` + `kauftyp` + a Point geometry (condition 1
cleared), this is a **count** aggregation, not a value aggregation. For count data the
correct areal-interpolation operation is simply: assign each point to the polygon that
contains it, then count. There is no mass to redistribute, no intensive/extensive
variable to reweight, so the heavier areal-interpolation machinery (area-weighted
re-aggregation, dasymetric mapping, the distance-decay Gaussian kernel from
`spatial-methods.md` §1) is **not** appropriate here and would over-engineer a clean
containment problem. Point-in-polygon containment is exact and lossless for this case.

Note the term "areal interpolation" in Amendment P-D §Geographic grain is slightly a
misnomer for what is actually needed: the features are points, not blocks-as-areas, so
this is a **point-in-polygon spatial join**, not interpolation between incompatible areal
tessellations. The simpler, exact operation is the right one. (If the Senate ever exposed
true block *polygons* with counts and we needed to split a block straddling two PLRs,
that would become real areal interpolation — out of scope today.)

Use `ST_Within(point, polygon)` (or equivalently `ST_Contains(polygon, point)`); both are
exact in DuckDB `spatial`. No buffer.

### 2. Edge cases the implementation must handle.
- **CRS:** geometries are native **EPSG:25833**; the PLR geometries are also 25833
  (`int_osm_poi_plr.sql:25`). Do the join in 25833 directly — **no `ST_Transform`**.
  Confirm in the ingestion that the WFS Point coordinates are stored axis-correct
  (easting=x, northing=y); a swapped axis silently lands every point in the wrong place,
  so add a sanity assert that x∈~[3.7e5,4.2e5], y∈~[5.79e6,5.84e6] for Berlin in 25833.
- **Boundary points:** a point exactly on a shared PLR edge can match two polygons and
  fan out the row count (double-counting churn). Reuse the C3 deterministic tie-break:
  `QUALIFY ROW_NUMBER() OVER (PARTITION BY transaction_id ORDER BY area_code) = 1`.
  Affects <0.1% in practice but must be deduplicated before the count.
- **NULL / unmatched geometries:** points outside all PLRs (water, forest, airport
  perimeters, or a block centroid that falls in a non-residential void) get
  `area_code = NULL`. Carry the same expected-NULL sentinel as C3
  (`assert_null_rate_below`, warn). Drop NULL-geometry rows before the join; the staging
  model already filters `transaction_id is not null`, but it does **not** filter
  `geometry_wkb is not null` — add that guard at the join step.
- **LOR vintage:** Kauffälle is **2024 + 2025 only**, both post-2021-reform, so the join
  must use the **LOR 2021** (542-PLR) geometry for all rows. Pin this explicitly; do not
  inherit the `snapshot_year <= 2020` pre-2021 branch from the POI model.
- **Empty/zero-transaction PLRs:** density must be defined as 0 (not NULL) for PLRs with
  no transactions in a given (year, teilmarkt) — otherwise the index silently treats
  "no market activity" as "missing", which it is not. Left-join PLRs and coalesce to 0.

### 3. Is transaction-count density a sound market-churn proxy? — Yes, with framing.
Transaction turnover per area per year is a standard **market-dynamism / housing-market
churn** indicator and a recognised *leading* signal in the gentrification literature:
ownership turnover and the realisation of the rent gap precede social succession
(Smith 1979/1996, *rent-gap*; Dangschat 1988, invasion-succession). Sales-volume /
turnover measures are used as gentrification predictors in e.g. the German Kauffälle/
Kaufpreissammlung tradition the thesis itself draws on, and the Amendment P-D theory note
already grounds this (Smith, Dangschat). This is consistent with R-C2.

**Critical framing condition (must be preserved downstream):** count density is a
**predictor / pressure lead**, **NOT a displacement outcome.** A transaction is not a
displacement; ownership change ≠ tenant turnover. Amendment P-D §Theory role states this
explicitly and the index must not read transaction volume as realised displacement
(this is also the G-2 ecological-inference guardrail in `spatial-methods.md` §6). Public
labelling must hedge ("market-churn / transaction intensity", never "displacement").

**Density vs raw count:** normalise by **PLR area_km2** to get transactions/km² so PLRs of
different size are comparable, **but** prefer carrying the **raw count alongside** and
letting the index do its own normalisation (z-score / share). Area-density alone is
sensitive to the denominator (large peripheral PLRs look quiescent purely by size); the
index layer's normalisation (`index-definition.md`) is the right place to fix polarity and
scale. Recommendation: persist `transaction_count` AND `area_km2` AND
`txn_per_km2`; let the index pick. **Do not** divide by population or dwelling stock here
(that conflates churn with stock; keep it geometric).

### 4. Block-level anonymisation and aggregation quality.
Anonymising each transaction to its containing **block centroid** introduces a small,
bounded spatial error: the recorded point is the block, not the parcel. For a **PLR-grain
count**, this is almost entirely harmless — a block is far smaller than a PLR and lies
wholly within one PLR in the overwhelming majority of cases, so the containment assignment
is unaffected. The only residual risk is **boundary-straddling blocks** where the centroid
may fall on the "wrong" side of a PLR line relative to where the actual parcel sat; this is
a handful of transactions per year and is dominated by the count signal. It does **not**
warrant correction at this grain. Two caveats to record:
- This robustness is **specific to the PLR grain.** Do **not** push this data to a finer
  grain (block, hexagon res ≥9) where centroid displacement would bias the result —
  PLR (or coarser BZR for the MAUP check) is the floor.
- **MAUP/edge sensitivity** still applies as for any areal count. The Kauffälle density
  should ride the existing PLR-vs-BZR MAUP robustness check (`spatial-methods.md` §7,
  r>0.7) when it enters the index, rather than getting its own bespoke sweep.

No completeness/coverage-growth bias of the OSM kind (ADR-0008 §5) applies here: the
Kaufpreissammlung is an administrative register of *completed* transactions, not a
crowd-mapped layer, so there is no survivorship/mapping-completeness correction to design.
The relevant coverage caveat is purely **temporal**: only 2024–2025 exist via WFS, so no
back-series and no within-source trend yet — this is a data-availability gap to disclose
(G2), not a methodology defect.

## Recommended aggregation method

```
-- 1. Filter valid points
poi := stg_berlin_verkaufte_grundstuecke WHERE transaction_id IS NOT NULL
                                           AND geometry_wkb IS NOT NULL
-- 2. Spatial join to LOR 2021 PLR (542), native EPSG:25833, NO ST_Transform
joined := ST_Within(ST_GeomFromWKB(geometry_wkb), plr_geom_2021)
          QUALIFY ROW_NUMBER() OVER (PARTITION BY transaction_id
                                     ORDER BY area_code) = 1   -- boundary dedup
-- 3. Count per (area_code, reference_year, teilmarkt)
agg := COUNT(*) AS transaction_count
       GROUP BY area_code, reference_year, teilmarkt
-- 4. Left-join the full PLR x year x teilmarkt frame, COALESCE count -> 0
-- 5. Emit transaction_count, area_km2, txn_per_km2 = transaction_count / area_km2
--    (index layer normalises; do not pre-bake polarity here)
```
Citations to carry in the SQL comment (R-C2): Amendment P-D §Theory role; Smith (1979)
rent-gap; Dangschat (1988) invasion-succession; `spatial-methods.md` §6 G-2 disclaimer.

## Conditions (binding for the dual-gate integration)

1. **Use LOR 2021 geometry only** (2024–2025 are both post-reform); do not branch on the
   pre-2021 vintage. State this in the SQL comment.
2. **No `ST_Transform`** — join in native EPSG:25833; add an axis-order sanity assert on
   the ingested coordinates.
3. **Deterministic boundary dedup** (`QUALIFY ROW_NUMBER() … = 1`) before counting, and a
   `geometry_wkb IS NOT NULL` guard; expected-NULL sentinel as per C3.
4. **Zero, not NULL, for empty PLRs** — left-join the full PLR×year×teilmarkt frame and
   coalesce count to 0.
5. **Persist raw `transaction_count` + `area_km2` + `txn_per_km2`**; let the index layer
   normalise. Do not divide by population/dwelling stock at this layer.
6. **Predictor-not-outcome framing preserved** end-to-end (column comments, mart docs,
   public labels): market churn / transaction intensity, never "displacement". Carry the
   G-2 ecological-inference disclaimer when this feeds a hotspot/index surface.
7. **No sub-PLR grain.** PLR is the floor; block-centroid anonymisation makes finer grains
   biased. Kauffälle rides the existing PLR-vs-BZR MAUP check (§7, r>0.7).
8. **Disclose the 2024–2025-only temporal coverage** in D2 completeness and on the G2
   methodology page; no within-source trend may be claimed until back-years exist.

## Note on the dual gate
This is a methodology-bearing index input. Per `CLAUDE.md` §Methodology gate (R-C1) it also
requires a `gentrification-domain-expert` PASS (predictor-vs-outcome framing, condition 6,
is squarely in their lane) before the PM integrates into `develop`. This geo sign-off
covers spatial method and aggregation correctness only.
