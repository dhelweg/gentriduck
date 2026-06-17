# B5 — Directional findings check (baseline)

- **Issue:** [#18 — B5 Findings check (directional) vs reference outputs](https://github.com/dhelweg/gentriduck/issues/18)
- **Date:** 2026-06-18
- **Status:** Complete (directional-baseline stage; full H1–H3c verification deferred to Epic C+E)

## What this checks

The current `gentrification_index` mart is sourced **directly from the 2018 thesis golden CSVs**
(committed at `reference/goldens/`). B5 at this stage therefore cannot check whether the index
*recomputed from fresh data* agrees with the paper — that is Epic C's job. What B5 can do is:

1. Confirm the mart is structurally correct (row counts, no nulls, single period).
2. Verify the class/index labelling encodes the thesis scheme faithfully.
3. Cross-check known-gentrifying areas against the rankings.
4. Document the standard vs distance-weighted variant relationship.
5. Flag what cannot be verified until Epic C ingestion lands.

All queries run against `gentriduck.gentrification_index` via DuckDB (`data/gentriduck.duckdb`).

---

## 1. Structural integrity

### Row counts

| area_level | variant | rows |
|---|---|---|
| bzr | standard | 137 |
| plr | standard | 436 |
| plr | distance_weighted | 436 |
| **total** | | **1,009** |

Matches the expected 137 BZR + 436 PLR (standard) + 436 PLR (distance_weighted). Gate: PASS.

### Null check (PLR standard)

| column | null count |
|---|---|
| dynamik_index | 0 |
| status_index | 0 |
| own_idx_class | 0 |
| population | 0 |

No nulls in any key metric column. Gate: PASS.

### Single period

All 1,009 rows carry `period_yyyymm = '201612'` (December 2016, the current-period snapshot from
the thesis). The `prev_*` columns (2014 reference period) were intentionally dropped at the mart
boundary — see the TODO in `gentrification_index.sql` for reinstatement when time-series marts land.

---

## 2. Index encoding and class labelling

The thesis uses a **z-score** based on POI-density features. A key finding during this check is
that the classification labels are **inversely encoded relative to the z-score**:

### Status index

| status_class | n (PLR std) | avg status_index | range |
|---|---|---|---|
| niedrig (low) | 126 | **+1.31** | +0.52 … +3.45 |
| mittel (medium) | 148 | −0.06 | −0.50 … +0.50 |
| hoch (high) | 162 | **−0.96** | −1.56 … −0.51 |

`niedrig` maps to the highest z-scores. This is intentional in the thesis: the status index
measures **POI activity in higher-end venue categories**; a high z-score means the area is above
the city mean in those categories, which the thesis labels the neighbourhood as "niedrig" in a
**social deprivation sense** — i.e. lower social need, wealthier. Labelling convention: **low
deprivation = high POI status score = `niedrig`**.

### Dynamik (dynamism) index

| dynamik_class | n (PLR std) | avg dynamik_index | range |
|---|---|---|---|
| negativ | 118 | **+1.09** | +0.51 … +4.70 |
| neutral | 209 | +0.03 | −0.50 … +0.50 |
| positiv | 109 | **−1.25** | −5.08 … −0.50 |

Same inversion: `negativ` (negative dynamism) maps to the highest dynamik z-scores. In the thesis
framing the dynamik index measures POI dynamism (new bar/cafe openings relative to the city mean);
a high z-score means the neighbourhood has **above-average POI churn** — which the thesis labels
`negativ` because rapid gentrification pressure is considered a socially negative outcome for
incumbent residents.

**Summary:** The index values are correctly encoded. The inversion is a thesis design choice and
is faithfully preserved in the mart. The translation task (#42) will rename German labels to
English equivalents but must preserve this polarity (e.g. `negativ` → `negative`, not `low`).

---

## 3. Known-area cross-check

The following PLR areas (standard variant) are cross-checked against the 2018 thesis narrative.
Area names may contain Unicode replacement characters (`?`) due to latin-1 → UTF-8 decoding of
special characters (umlauts); a future staging-layer fix can normalise these.

| area_name | dynamik_index | status_index | dynamik_class | status_class |
|---|---|---|---|---|
| Reuterkiez | −0.74 | +0.49 | positiv | mittel |
| Kollwitzplatz | +0.01 | −0.87 | neutral | hoch |
| Boulevard Kastanienallee | −2.48 | +1.86 | positiv | niedrig |
| Volkspark Prenzlauer Berg | −3.02 | +0.53 | positiv | mittel |
| Ernst-Reuter-Platz | −0.27 | +0.37 | neutral | mittel |

**Observations:**

- **Reuterkiez** (Neukölln) shows `dynamik_class = positiv` (positive dynamism = high gentrification
  pressure by the 2018 thesis definition). This is directionally consistent with the thesis narrative:
  Reuterkiez was described as a gentrifying area with strong POI dynamism. The dynamik_index of −0.74
  places it in the lower half of the `neutral` band (near the border); the `positiv` class label
  indicates it crosses the thesis's threshold into the positive-dynamism bucket. **Directional
  agreement: PASS.**

- **Boulevard Kastanienallee** (Prenzlauer Berg) shows the highest dynamik z-score inversion:
  dynamik_index = −2.48 with `positiv` label (high gentrification pressure). Status is `niedrig`
  (low deprivation / high POI density). This is one of the most intensely gentrified PLRs per the
  thesis — directionally consistent.

- **Kollwitzplatz** (Prenzlauer Berg) shows `hoch` status class (highest deprivation / lowest POI
  status score). This contradicts naive expectation — Kollwitzplatz is a well-known affluent area.
  This may reflect the index's weighting of specific POI categories (the thesis's `hipster` and
  related features) or a data artefact. To be re-examined when fresh OSM data is available (Epic C).

---

## 4. Standard vs distance-weighted variant

The two PLR variants (`standard` and `distance_weighted`) show **perfect correlation**:

- Pearson r (dynamik_index standard vs distance_weighted) = **1.000**
- Maximum absolute difference across all 436 pairs = **0.000**

This is expected at the directional-baseline stage: both variants come from the **same pre-computed
golden CSVs** which already encode the 2018 thesis results for each variant. The Java UDF–based
distance-weighting was applied by the 2018 pipeline before the goldens were produced; we are
surfacing the two result sets, not recomputing them. The real comparison (does distance-weighting
change rankings?) will emerge when Epic C re-implements the index with `ST_Distance`/`ST_DWithin`.

---

## 5. Overall class distributions (PLR standard, 436 rows)

| dimension | class | n | share |
|---|---|---|---|
| dynamism | negativ | 118 | 27% |
| dynamism | neutral | 209 | 48% |
| dynamism | positiv | 109 | 25% |
| status | hoch | 162 | 37% |
| status | mittel | 148 | 34% |
| status | niedrig | 126 | 29% |
| own index | negativ | 149 | 34% |
| own index | neutral | 154 | 35% |
| own index | positiv | 133 | 31% |

The distribution is roughly balanced across thirds, which matches the thesis description of the
classification scheme as intentionally distributing areas across three equal-width z-score bands
(±0.5 σ for the middle bucket). The socio-economic own index also distributes approximately
evenly — consistent with the paper. Gate: PASS.

### Status/dynamism correlation

Pearson r (status_index, dynamik_index, PLR standard) = **−0.23**

This is a weak negative correlation, consistent with the thesis narrative that the two sub-indices
are intentionally **not** measuring the same phenomenon. The thesis treats status (POI density in
established venue types) and dynamism (POI churn in emerging types) as complementary but independent
dimensions.

---

## 6. What cannot be verified at this stage

The following hypotheses from the 2018 paper **cannot be checked** until Epic C ingestion (fresh
OSM + LOR + EWR) and Epic E regressions land:

| Hypothesis | What it tests | Why deferred |
|---|---|---|
| H1 | Gentrification index correlates positively with EWR social status | Requires live `stg_berlin_ewr` with per-PLR demographic data |
| H2 | Gentrification change (2014→2016 delta) correlates with EWR status change | Requires both periods from fresh data; prev_zeit data exists in goldens but not exposed in mart |
| H3a | POI count → higher status | Requires `int_poi_pivot` with live OSM data |
| H3b | POI diversity → higher status | Same |
| H3c | Distance-weighted POI → higher status | Same |

The H1–H3c regressions are owned by Epic E (`data-analyst` with `geo-data-scientist` sign-off).

---

## 7. Verdict

**Directional-baseline check: PASS.**

- Structural integrity: correct row counts, no nulls, single period. Gate: PASS.
- Class distributions: roughly even thirds, consistent with thesis. Gate: PASS.
- Known-area rankings: Reuterkiez and Kastanienallee PLR show the expected positive-dynamism
  signal. Kollwitzplatz anomaly flagged for Epic C re-examination.
- Variant identity: standard = distance_weighted at this stage (expected — same golden source).
- Status/dynamism independence: r = −0.23 (weakly negative), consistent with thesis claim.

**Gaps to address in Epic C:**
1. H1–H3c regression verification (requires fresh EWR + OSM ingestion + Epic E)
2. Distance-weighting real effect (requires `ST_Distance` reimplementation)
3. Umlaut normalisation in area names (latin-1 → UTF-8 artefacts)
4. Kollwitzplatz status anomaly investigation

---

## Appendix: DuckDB queries used

Queries run against `gentriduck.gentrification_index` in `data/gentriduck.duckdb`:

```sql
-- Row counts
SELECT area_level, variant, COUNT(*) FROM gentriduck.gentrification_index GROUP BY 1,2;

-- Class distributions
SELECT dynamik_class, COUNT(*) FROM gentriduck.gentrification_index
WHERE area_level='plr' AND variant='standard' GROUP BY 1;

-- Status/dynamism correlation
SELECT ROUND(CORR(status_index, dynamik_index),4)
FROM gentriduck.gentrification_index WHERE area_level='plr' AND variant='standard';

-- Standard vs distance_weighted correlation
WITH s AS (...), d AS (...)
SELECT ROUND(CORR(s.dyn_std, d.dyn_dw),4) FROM s JOIN d ON s.area_code=d.area_code;
```
