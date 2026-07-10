# [H-C1] #158 — Geo-DS scoping spike: re-fit C5 completeness-bias correction for Hamburg

- **Type:** Investigation spike (NOT a sign-off). Final dual sign-off happens after implementation.
- **Author:** geo-data-scientist
- **Date:** 2026-07-10
- **Issue:** #158 (blocks any "publish Hamburg dynamism/index" work)
- **Warehouse queried:** `data/gentriduck.duckdb` (built 2026-07-10), model
  `int_poi_status_dynamism`, test logic from `test_c5_poi_share_spike.sql`.

---

## TL;DR / verdict for the follow-up

The **core C5 normalization mechanism transfers to Hamburg unchanged**. `dynamism_score` and
`status_score` are z-scores partitioned by `(city_code, snapshot_year)`, so Hamburg is already
scored entirely relative to Hamburg's own distribution — the mechanism is *already* per-city, not a
Berlin-hardcoded number. The two Berlin-specific empirical premises of the C5 sign-off **both hold
for Hamburg** (evidence below).

The 77 Hamburg spike-test flags are **not** evidence that the uniform-coverage assumption is broken
for Hamburg. They are a **grain / small-N artifact** of the fixed `2× rolling-average` *ratio* test:
Hamburg is mapped at a much finer grain (~940 Gebiete vs Berlin's ~542 PLRs) with far fewer POIs per
area, so a ±20-POI random fluctuation trips a 2× *share ratio* that the same fluctuation would never
trip in a POI-dense Berlin PLR.

**Recommended path = (a): a test refinement, not a structurally different normalization.** Add an
absolute-POI-count floor to `test_c5_poi_share_spike` (and apply the same floor idea to any
Hamburg-specific data-quality test). This is **city-agnostic** (helps any fine-grained city), does
**not** touch the governed index math, and is low-risk. No change to `int_poi_status_dynamism`'s
normalization is required or recommended.

---

## Evidence

### 1. Hamburg's coverage-growth curve is the same shape as Berlin's — the "shorter/different series" premise is false

Contrary to the framing in the task, Hamburg is **not** a short/late series. Its ingested POI time
series runs **2008–2026, the same window and annual cadence as Berlin**. City-wide POI count and YoY
growth:

| Year | BER YoY % | HH YoY % |
|---|---|---|
| 2009 | 649 | 598 |
| 2010 | 112 | 115 |
| 2011 | 69 | 55 |
| 2012 | 36 | 23 |
| 2013 | 21 | 25 |
| **2014** | **12** | **13** |
| **2015** | **11** | **9** |
| 2016–2026 | 6–18 | 6–15 |

Both cities show the same "OSM cold-start explosion 2009–2013, then stabilize to a low-single/low-
double-digit growth regime from ~2014–2015." **C5 sign-off premise #1 ("the bulk of OSM coverage
growth predates 2015; post-2015 coverage is more stable") is empirically true for Hamburg as well.**
The stable-window cutoff year does **not** need to change.

### 2. The 77 flags: concentrated in the cold-start era, with a small-N post-2016 tail

Flags by year (total 152: BER 75, HH 77):

- **BER:** 50/75 (67%) fall in 2010–2011 (cold-start). Post-2015 tail is thin except a 2021 blip (6
  rows) = the PLR-2021 vintage-reform boundary artifact (a known, documented Berlin-only effect).
- **HH:** 56/77 in 2011–2016 (cold-start), plus a **persistent ~21-row tail spread evenly across
  2018–2026** (2–4/yr). Hamburg has a single `current` vintage (ADR-0014), so there is no vintage-
  reform blip; the tail is pure small-N noise.

The tail is spread across **67 distinct areas** (only 10 repeat), i.e. it is **not** a systematic
subset of "late-mapped districts" — which is what a genuinely broken uniform-coverage assumption
would look like. It is random small-N churn.

### 3. Small-N is the mechanism — directly measured

At a stable year (2020), fraction of areas with very low POI counts:

| | % areas <20 POIs | % areas <10 POIs |
|---|---|---|
| BER | 2.4% | 0.9% |
| **HH** | **23.6%** | **6.8%** |

Nearly a quarter of Hamburg Gebiete carry <20 POIs. The flagged rows confirm this: post-2016
Hamburg flags have a **median POI count of ~55**, many in the teens/20s (`[13,14,15,20,29,29,40,...]`).
A jump from 20→45 POIs in a fine-grained Gebiet more than doubles its share — mechanically tripping
the 2× test — with no implication about real commercial churn or mapping bias.

### 4. Crucially: the small-N noise lives in the *test*, NOT in `dynamism_score`

The spike test is a **relative ratio** (`share / rolling_avg_share`), which is maximally sensitive to
small denominators. But `dynamism_score` is a z-score of the **absolute** `share_yoy_change`. Tiny
areas have tiny shares, hence tiny absolute share deltas, hence **small** z-scores. Measured on
Hamburg's stable era:

| POI bucket | n | avg \|dynamism_score\| | rows >3 SD |
|---|---|---|---|
| <20 | 2109 | 0.135 | 0 |
| 20–50 | 3528 | 0.295 | 6 |
| 50+ | 3761 | 0.893 | 170 |

The smallest areas contribute **zero** extreme dynamism scores. The z-score normalization already
does exactly what C5 risk #2 anticipated — it down-weights small-N areas. Per-row extreme-value rates
are comparable across cities (HH `>3 SD`: 176/9398 ≈ 1.9%; BER: 104/5420 ≈ 1.9%). **The published
score is well-behaved and city-comparable as-is.** This is why #158 is substantially already resolved
at the normalization level — the finer-grain risk is contained to the warn-severity DQ test.

---

## Answering the task's four questions

1. **Coverage curve:** Same 2008–2026 window and cadence as Berlin; same cold-start-then-stabilize
   shape; stabilizes ~2014–2015 exactly like Berlin. Premise #1 transfers.
2. **The 77 flags:** Cold-start-era majority + a small, evenly-spread, many-distinct-areas tail
   driven by **small-N Gebiet-grain variance** (23.6% of areas <20 POIs). Not year-concentrated
   onboarding artifact; not area-concentrated broken-uniformity; small-N mechanical share swings.
3. **Is the per-city z-score already an adequate re-fit? — Yes, at the normalization level.** Both
   scores partition by `city_code`; Hamburg is scored on its own distribution; the score distribution
   is well-behaved and city-comparable and correctly down-weights small-N areas. #158 does **not**
   require a structurally different normalization.
4. **Recommended path:** **(a)** — a Hamburg-robust (city-agnostic) **test-threshold refinement**,
   plus documentation of the re-fit. Details below.

---

## Concrete recommendation for the data-engineer

### R1 — Add an absolute-POI-count floor to `test_c5_poi_share_spike` (test-only, city-agnostic)

The ratio-only test is grain-dependent and false-alarms on low-POI areas. Add an
absolute-count guard so the test flags only rows that are both *proportionally* and *materially*
anomalous:

```sql
-- existing WHERE, plus:
where rolling_5yr_avg_share > 0
  and plr_poi_share > 2 * rolling_5yr_avg_share
  and total_poi_count >= 30   -- NEW: material-count floor; suppresses small-N ratio noise
```

`total_poi_count` is already a column in `int_poi_status_dynamism`, so no new input is needed.
**Effect (measured):** floor=30 brings the two cities into line — BER 75→47, HH 77→45 — and equalizes
the post-2016 tail (BER 10, HH 15, ≈ proportional to Hamburg's larger area count). The floor is
**not** a Berlin-vs-Hamburg parameter; it is a single global constant that makes the DQ test robust to
grain for *every* city (this is the preferred fix over per-city thresholds).

- Threshold choice: **30** is recommended (roughly Hamburg's stable-era median POI/area and well
  above the small-N noise band; floor=20 leaves BER 57/HH 52, floor=50 over-suppresses to BER 38/HH
  30). The data-engineer should keep it a single named constant/macro so it is auditable, and cite
  this spike (`-- see docs/epic-h/158-hc1-geo-spike.md`) per the R-C2 grounding rule.
- Keep **warn** severity. This remains a DQ tripwire, not a hard gate.

### R2 — Do NOT change `int_poi_status_dynamism` normalization

No structural change (no different cutoff year, no different normalization, no per-city math). The
`(city_code, snapshot_year)` partition is the correct, sufficient re-fit. The optional ±3 SD
winsorization mentioned in the original C5 sign-off is **still optional / non-blocking**; the data
shows small-N areas do not produce the extreme scores, so winsorization is not needed to publish
Hamburg (may be revisited if a future city has both fine grain *and* high per-area density).

### R3 — Documentation deliverable (the actual re-fit artifact)

Update the `int_poi_status_dynamism.sql` header (and the C5 methodology note) to state that the
uniform-coverage assumption and the ~2015 stabilization were **re-validated on Hamburg's own
2008–2026 curve** (cite this spike), and that the completeness-bias control transfers across cities
because it is share-based and per-city-partitioned. Note the finer-grain caveat: at Gebiet grain the
*ratio-based DQ test* (not the score) is grain-sensitive, which R1 addresses.

### R4 — Publication gate (governance, separate from code)

Widening the governed `gentrification_index` `accepted_values` from `["BER"]` to `["BER","HH"]`
(and the `published_cities_filter`) is itself methodology-bearing and needs a **fresh dual sign-off**
(geo-DS + domain), per #125. This spike does **not** authorize that widening; it clears the
methodological blocker for it. Sequence: land R1–R3 → dual sign-off referencing this spike → then the
publication-gate widening PR.

---

## Risks / caveats for reviewers

- The floor constant (30) is an empirical, city-agnostic choice; it should be documented and revisited
  if a city with a materially different POI-density profile is onboarded.
- This spike validates the *statistical mechanism's* transfer. It does **not** re-assess whether
  Hamburg's Gebiete are the right analysis grain for the gentrification *narrative* — that is a
  domain-expert question for the paired sign-off.
- Untrusted-input note (SEC-3): findings here derive solely from the local warehouse and repo files;
  no external/web content informed the methodology.

---

## Suggested sign-off JSON (for the eventual post-implementation dual sign-off, not yet in force)

```json
{
  "verdict": "concerns",
  "rationale": "The C5 share-normalization mechanism transfers to Hamburg unchanged: scores are already partitioned per city_code, Hamburg's 2008-2026 coverage curve stabilizes ~2015 like Berlin's, and the absolute-share z-score correctly down-weights small-N areas. The 77 spike-test flags are a fixed-ratio-test grain artifact (23.6% of Hamburg areas carry <20 POIs), not a broken uniform-coverage assumption. No normalization change is warranted; the DQ test needs a material-count floor.",
  "risks": [
    "Ratio-based spike test is grain-dependent; false-alarms on low-POI Gebiete until a count floor is added",
    "Absolute count floor (30) is an empirical city-agnostic constant needing documentation/revisit for future cities",
    "Score-level transfer validated; grain-appropriateness for the gentrification narrative is a domain-expert call"
  ],
  "recommendations": [
    "R1: add total_poi_count >= 30 floor to test_c5_poi_share_spike (city-agnostic, warn severity)",
    "R2: no change to int_poi_status_dynamism normalization; winsorization remains optional",
    "R3: document Hamburg re-validation of uniform-coverage + 2015 stabilization in the model header (cite this spike)",
    "R4: gentrification_index accepted_values widening to include HH needs a separate fresh dual sign-off (per #125)"
  ]
}
```
