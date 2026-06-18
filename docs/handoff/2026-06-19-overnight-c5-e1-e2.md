# Session handoff — 2026-06-19 evening — C5 completeness-bias + E1/E2 thesis validation

## TL;DR

C4 is merged and live on main. Gate: PASS=258 WARN=0 ERROR=0.
Tonight has two parallel workstreams — run them sequentially (C5 first, then E1+E2):

1. **C5 (#25)** — OSM completeness-bias control: normalize POI growth for mapper-coverage drift
   so `dynamism_score` reflects real change, not OSM growth. Hard prereq before publishing
   dynamism or running E1/E2 regressions on the live-data index.
2. **E1 (#30) + E2 (#31)** — Thesis validation: H1–H3c regressions (scipy/statsmodels) and
   scikit-learn classification on the 2018 golden data, then directional comparison to the thesis.
   Both are now fully unblocked (B4 closed, C4 live).

Also a quick warm-up:
- **#55** — `ingest_mietspiegel.py` parser bug (2017–2023 single-table layout fails)

---

## Warm-up — #55: mietspiegel parser bug [small, standalone]

**File:** `ingestion/berlin/price_rent/ingest_mietspiegel.py`

**Problem:** Parser fails for 2017–2023 Mietspiegel PDFs which use a single unified table layout
instead of the split layout used in 2024/2026.

**Fix:** Add a layout-detection branch to the parser: try the single-table layout first
(2017–2023), fall back to the split-table layout (2024+). Look at the actual PDF structure
with `pdfplumber` to identify the distinguishing marker (e.g. column count or header text).

**Review:** data-engineer-reviewer only.

---

## Task 1 — C5 (#25): OSM completeness-bias control [data-engineer pair + geo-DS]

### Problem

`dynamism_score` in `int_poi_status_dynamism` is built on raw year-over-year POI count deltas.
Berlin's OSM coverage grew significantly between 2008 and 2024 — partly because mappers added
real POIs, partly because mapping *coverage* improved (more streets, more businesses tagged).
Without correction, areas with late or rapid mapping attention look like they're gentrifying
when they're actually just getting mapped.

The geo-DS C4 sign-off explicitly flagged this: "C5 normalisation is a hard prerequisite
before publishing or regressing dynamism."

### Approach (to be confirmed by geo-DS before implementation)

**Option A — POI share normalization (recommended starting point):**
Instead of raw counts, use each PLR's *share* of total Berlin POIs in that year.
`share = plr_poi_count / berlin_total_poi_count` per year.
YoY change in share removes the city-wide coverage-growth trend.
If the share grows, the PLR attracted disproportionately more POIs than Berlin overall —
a real signal, not mapping noise.

**Option B — ohsome coverage denominator (more rigorous, more work):**
Use ohsome API to query OSM edit density (number of changesets per PLR per year) as a proxy
for mapping attention. Normalize POI counts by edit density. Requires a new data source —
consult the system-architect (ADR-0002/ADR-0003) before adopting.

**Recommendation:** Start with Option A. It requires no new data source, is interpretable,
and aligns with how the thesis handled cross-area comparisons (all shares, not raw counts).
The geo-DS should explicitly approve the approach before the data-engineer codes it.

### Implementation (if geo-DS approves Option A)

1. **New model `int_poi_completeness`** (or extend `int_poi_status_dynamism`):
   - Compute `berlin_total_poi_count` per year (sum across all PLRs)
   - Compute `plr_poi_share = plr_poi_count / berlin_total_poi_count`
   - Compute `share_yoy_change = plr_poi_share - LAG(plr_poi_share) OVER (PARTITION BY area_code ORDER BY snapshot_year)`
   - Re-derive `dynamism_score` as z-score of `share_yoy_change` (not raw count delta)

2. **Update `int_poi_status_dynamism`** to use share-based dynamism, OR create a
   `int_poi_status_dynamism_c5` that replaces it after geo-DS approval.

3. **Data-quality anomaly tests** (dbt tests):
   - Alert if any PLR's POI share exceeds 2× its 5-year rolling average (anomalous jump)
   - Alert if Berlin's total POI count drops year-over-year by >5% (data quality issue)
   Add these to `transform/models/intermediate/schema.yml`.

4. **Rebuild downstream:** after updating the model, `uv run poe build` rebuilds
   `fct_gentrification_change` and `gentrification_index` automatically.

### Gate for C5

- geo-DS approves the normalization approach before coding
- `uv run poe build` passes with the new dynamism definition
- Anomaly tests pass (warn severity initially, promote to error after C6)
- geo-DS signs off on `C5-geo-signoff.md` (follow `docs/epic-c/C4-geo-signoff.md` format)

---

## Task 2 — E1 (#30): H1–H3c regressions [data-analyst + geo-DS]

### What the 2018 thesis tested

- **H1:** Areas with high gentrification dynamism have higher rent levels
- **H2:** Gentrification dynamism is positively correlated with foreigners share (early gentrifiers)
- **H3a/b/c:** Specific POI category relationships to gentrification (tourism, gastronomy, services)

The thesis used R (lm/cor) on the 2016/2014 snapshot. Gentriduck re-runs in Python on the
same 2018 golden data (B4), then checks directional agreement.

### Implementation

**Owner: data-analyst agent.** Output: a Python analysis script + markdown findings note.

1. **Script:** `analysis/e1_regressions.py` (create `analysis/` directory if needed)
   - Load `gentrification_index` (variant='standard', period_yyyymm='201612') from DuckDB
   - Load `dim_area` for area metadata
   - Join to get the full PLR-level index table
   - Run scipy/statsmodels OLS regressions for H1–H3c
   - Compute Spearman rank correlations (thesis used rank correlation)
   - Print results table: coefficient, p-value, R², thesis reference value

2. **Comparison:** for each hypothesis, report:
   - Direction match (same sign as thesis): ✓/✗
   - Significance match (p<0.05 both or neither): ✓/✗
   - Magnitude: how close to the thesis coefficient

3. **Output:** `docs/epic-e/E1-regression-findings.md` with a table of results and
   a short narrative (2–3 sentences per hypothesis). Flag any divergences.

**Acceptance:** non-empty regression output; directional comparison documented.

---

## Task 3 — E2 (#31): scikit-learn classification [data-analyst + geo-DS]

### What the 2018 thesis did

Used Weka to classify PLRs into gentrification stages (high/medium/low/none) using the
index components as features. Reported AUC and F-weighted score.

### Implementation

**Owner: data-analyst agent.** Follows E1.

1. **Script:** `analysis/e2_classification.py`
   - Load the same golden PLR data as E1
   - Features: `status_index`, `dynamism_index`, `own_idx_class` (encoded)
   - Target: `dynamism_class` (positive/negative/neutral/stable → encode as binary gentrifying/not)
   - Train a scikit-learn classifier (LogisticRegression or RandomForestClassifier; consult
     ADR — if no ADR exists, system-architect writes one before selecting the model)
   - 5-fold cross-validation; report AUC and F-weighted
   - Compare to thesis AUC/F (from reference goldens or thesis document)

2. **Output:** `docs/epic-e/E2-classification-findings.md`

**Acceptance:** AUC and F-weighted reported; directional comparison to thesis documented.

---

## Agent routing

| Task | Agent | Notes |
|---|---|---|
| #55 mietspiegel parser | data-engineer → reviewer | small warm-up |
| C5 approach | geo-data-scientist first | must approve before DE codes |
| C5 implementation | data-engineer → reviewer → geo-DS sign-off | |
| E1 regressions | data-analyst (+ geo-DS review) | scipy/statsmodels |
| E2 classification | data-analyst (+ geo-DS review) | scikit-learn; check ADR first |

---

## Key files

| File | Task |
|---|---|
| `ingestion/berlin/price_rent/ingest_mietspiegel.py` | #55 |
| `transform/models/intermediate/int_poi_status_dynamism.sql` | C5 |
| `transform/models/intermediate/schema.yml` | C5 (anomaly tests) |
| `analysis/e1_regressions.py` (new) | E1 |
| `analysis/e2_classification.py` (new) | E2 |
| `docs/epic-e/E1-regression-findings.md` (new) | E1 output |
| `docs/epic-e/E2-classification-findings.md` (new) | E2 output |
| `docs/epic-c/C5-geo-signoff.md` (new) | C5 geo-DS gate |

---

## Branch strategy

- **C5 + #55:** one branch `overnight/2026-06-19-c5-mietspiegel`
- **E1 + E2:** one branch `overnight/2026-06-19-e1-e2` (analysis scripts + findings docs)

Open separate PRs so C5 (data-engineering gate) and E1/E2 (analysis gate) can be reviewed
independently.

---

## If capacity runs short

Priority: C5 geo-DS approach approval + #55 fix > E1 regressions > E2 classification.
E1 and E2 are pure analysis — they can't break the build and are easy to restart.
C5 is the infrastructure task; do it first.

---

## Safety checklist

- No new paid/proprietary data sources (Option A requires no new source; Option B needs ADR first).
- All analysis output goes under `docs/` or `analysis/` — no mart schema changes for E1/E2.
- No direct commits to main.
