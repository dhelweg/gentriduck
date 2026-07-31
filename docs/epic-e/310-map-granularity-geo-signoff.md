---
task: "#310 — Granularity selector for /berlin/maps and /hamburg/maps (mart_area_rollup_stage_mix)"
author: geo-data-scientist
date: 2026-07-30
branch: feature/310-map-granularity-selector
---

# Geo-DS methodology sign-off — #310 map granularity selector / area rollup stage mix

- **Branch:** `feature/310-map-granularity-selector` (4 commits off `develop`).
- **Scope reviewed:** `transform/models/marts/mart_area_rollup_stage_mix.sql`, its `schema.yml`
  contract, the 4 singular tests (`leaf_coverage`, `dominant_matches_mix`, `shares_sum_to_one`,
  `area_code_in_hierarchy`), and the consuming pages `web/pages/berlin/maps.md` /
  `web/pages/hamburg/maps.md`.
- **Why gated:** new spatial aggregation method over `gentrification_index`'s typology/index
  columns (CLAUDE.md R-C1 "any model that changes indicator weights, normalization, or spatial
  method").
- **Independence:** verdict formed from the diff plus my own warehouse re-run
  (`uv run dbt build --select mart_area_rollup_stage_mix+` from repo root: 27/27 PASS,
  2026-07-30) and direct DuckDB spot-checks of the built mart, not from the model's own prose.

## 1. Population-weighted mean of `status_index` / `dynamism_index` — defensible?

**Yes, with a labelling caveat (Concern C1).**

- **vs. simple mean of areas:** population weighting is the right default here. The unit of
  substantive interest for a gentrification/displacement reading is the *resident*, not the
  polygon; a person-weighted aggregate answers "the status class the average resident of this
  Bezirk lives in", which is the standard construction in person-weighted exposure/segregation
  measurement (Massey & Denton 1988, *Social Forces* 67(2), on P\*-type exposure indices being
  population-weighted by construction). An unweighted mean of PLRs would let a 400-resident
  enclave PLR count as much as a 20,000-resident one — a textbook zoning-effect artefact.
- **vs. re-deriving from raw inputs:** re-deriving D1/D2 at Bezirk grain from raw EWR/MSS inputs is
  *not* available without re-running the MSS classification (whose thresholds are set by the
  publisher at PLR grain and are not defined at coarser grain), so re-derivation would mean
  inventing a new classification — a bigger methodological step than this ticket, and correctly
  out of scope. The model's choice to aggregate the published leaf scores is the conservative one.
- **Ordinality.** `status_index` is the MSS D1 ordinal (1–4) and `dynamism_index` the D2 ordinal
  (1–3) (`gentrification_index.sql` R-A1 header). A weighted mean of an ordinal code is a
  *mean rank*, not an interval-scale score, and the model's own header simultaneously asserts that
  "ADR-0008 forbids averaging ordinal codes as a metric" (design point 1) while doing exactly that
  arithmetic in design point 4. I accept the distinction the model is *actually* drawing — the
  forbidden operation is averaging-then-**re-categorizing** into a typology cell that pretends to
  be a class, and that is genuinely not done here — but the published column and its map legend
  should say "mean ordinal class (mean rank)" rather than imply an interval score. Both pages do
  carry a generic "Social status and dynamism are ordinal, not linear" caveat, which mitigates but
  does not fully cover the rollup-specific case. See **C1**.

## 2. Typology as a categorical distribution rather than a re-derived label

**Sound, and the correct call.** Publishing the full stage mix (`typology_stage` ×
`stage_population_share`) as the primary object, with the plurality label as a *paired* compact
display, is precisely the ecological-fallacy-safe construction:

- It preserves intra-area heterogeneity, so a Bezirk that is half `active-gentrification` and half
  `stable-established` is not collapsed to a single reassuring label (Simpson's-paradox /
  aggregation-bias exposure; Openshaw 1984 on MAUP's zoning effect).
- It avoids the invalid "average two ordinals, re-enter the D1×D2 matrix" path, which would produce
  a typology cell no constituent area actually occupies.
- Explicitly *not* reusing `mart_mss_area_aggregate` / `int_mss_bzr_aggregate` (the single rounded-
  mean re-derived label, gated separately as a MAUP diagnostic) is the right separation; I checked
  that this model shares no code path with it.
- Verified empirically: `shares_sum_to_one` and `dominant_matches_mix` pass, and the mix rows are
  exhaustive per area (the mart's uniqueness key holds).

## 3. `is_dominant_fragile` and the plurality display

**Adequate for `n < 3`, with one residual gap (Concern C3).**

Verified at the latest period (202512), distinct areas:

| city | level | areas | fragile (n<3) | dominant_share < 0.5 | min share |
|---|---|---|---|---|---|
| BER | bezirk | 12 | 0 | 3 | 0.47 |
| BER | pgr | 58 | 1 | 6 | 0.39 |
| BER | ortsteil | 97 | 32 | 8 | 0.40 |
| HH | subarea_l1 | 104 | 27 | 3 | 0.40 |
| HH | district | 7 | 0 | 1 | 0.50 |

The fragility flag is a *count*-based small-sample guard and does its job (33% of Berlin Ortsteile
flagged). But fragility of a plurality also has a *share* dimension that the flag misses: a PGR
whose "dominant" stage holds 39% of the population across 12 PLRs is not small-sample, yet the
label is barely a plurality. This is mitigated — `dominant_share` is unconditionally present in
every tooltip and every table, and the Stage-mix table is always one scroll away — so the user is
never shown a bare label. I therefore treat it as a recommendation, not a blocker (**C3**).

## 4. Missing / uninhabited children — silent bias?

**Handled correctly; no silent bias found.** Reviewed and re-derived:

- Uninhabited leaves (`status_class IS NULL`) get their own visible `'uninhabited / no data'` mix
  bucket but are excluded from the weighted-mean and vote denominators — correct: a NULL score
  cannot contribute to a mean, and imputing one would be fabrication.
- The MEDIUM-B orphan fix (areas with zero contributing leaves get a drawn-but-blank placeholder
  row rather than vanishing) is the right choice: silently omitting an area from a choropleth is a
  *survivorship* presentation bias, since the reader cannot distinguish "no data" from "not part
  of the city". The across-all-periods (not per-period) orphan definition correctly avoids
  flooding the mart with rows for the wrong LOR vintage. I re-derived the claim: exactly 2 Berlin
  Ortsteil + 5 Hamburg subarea_l1 codes, 0 pgr/bezirk/district codes.
- The MEDIUM-C fix is the methodologically important one and is correct: with a per-child
  `coalesce(population, 1)`, partial coverage would have given unknown-population children a weight
  of ~1 against neighbours weighted in the thousands — i.e. near-deletion of the unknowns, an
  informative-missingness bias. Whole-area equal-weighting whenever coverage is partial is the
  honest fallback, and `has_incomplete_population` / `population_coverage_frac` make the
  degradation auditable rather than invisible.
- `leaf_coverage` verifies the partition property (each habitable leaf rolls up through exactly one
  area at each level) — this is the check that would catch double-counting or omission, and it
  passes for every (city, level, period).

**However** — the empirical prevalence matters (Concern C2). At 202512:
Berlin is fully population-weighted (`has_incomplete_population` = 0% at every level), but
**Hamburg is 100% equal-weighted at district level and 97% at Stadtteil level**. The "population-
weighted rollup" headline is currently a Berlin-only fact. To the pages' credit, `hamburg/maps.md`
already says this explicitly in both the rollup alert and the Honest-caveats block, which is why
this is a note rather than a blocker.

## 5. Spatial / OSM-method pitfalls

- **No OSM exposure.** This rollup touches only the MSS/Sozialmonitoring D1/D2 lineage
  (`gentrification_index` live_data). No POI counts, no tag schema, no mapping-completeness bias
  enter this model. The OSM completeness-correction concerns (Epic C5 / OA-D0) are correctly
  untouched here, and the POI map remains a separate page.
- **No new spatial primitive.** Every hop reuses an already-gated crosswalk: Berlin
  plr→bzr→pgr→bezirk by LOR code-prefix nesting via `mart_area_hierarchy` (#302), Ortsteil via the
  #269-gated dominant-overlap assignment, Hamburg subarea_l2→subarea_l1 via the OA-D1b (#240)
  crosswalk. Chaining `mart_area_hierarchy` edges rather than re-deriving `substr()` locally is the
  right call — it inherits that model's vintage-stability tests. No CRS or distance computation is
  introduced.
- **MAUP scale effect is real and partly unmanaged.** Aggregation compresses variance: at 202512
  `status_index_weighted_mean` spans 1.00–3.84 at Ortsteil grain but only 1.62–2.53 at Bezirk
  grain. The `<AreaMap>` for the numeric indicators uses `legendType="scalar"` with **no fixed
  min/max**, so the colour ramp auto-scales to whatever the current selection's range is. Flipping
  the granularity selector therefore re-stretches a 0.9-wide Bezirk range across the same full
  colour spectrum as the 2.8-wide PLR range — the Bezirk map *looks* as polarized as the PLR map
  while showing a third of the spread. That is a scale-effect artefact rendered as if it were a
  finding, on the very feature this ticket ships. This is **C4**, my primary concern.
- **Areal misalignment at Ortsteil.** PLRs do not nest into Ortsteile; the dominant-overlap
  assignment makes a clean partition of PLRs (so no double-counting — `leaf_coverage` confirms),
  but the polygon drawn is the *true* Ortsteil boundary while the value describes the *assigned
  PLR set*, which is a different footprint. That mismatch is documented in
  `int_berlin_plr_ortsteil_overlap` / #269 but is not stated anywhere on `berlin/maps.md`, where
  the Ortsteil option is offered next to the exactly-nesting PGR/Bezirk options with no distinction
  (**C5**). Related and already-documented: the Ortsteil crosswalk is lor_2021-only, so the mart
  has no Ortsteil rows for the four pre-2021 Berlin periods — harmless *for this page* (it pins
  `max(period_yyyymm)`), but it is a live trap for any future period selector.

## Concerns

- **C4 (must fix — blocking):** pin the scalar legend domain for the numeric indicators to the
  ordinal scale (`status_index` 1–4, `dynamism_index` 1–3) on both pages, so switching granularity
  changes the *pattern* but not the colour meaning. If Evidence's `<AreaMap>` cannot take a fixed
  domain, an explicit inline note ("colour range rescales to the selected level; coarser levels are
  less spread than they appear") is an acceptable substitute.
- **C1 (must fix — cheap):** label the rollup-level `status_index` / `dynamism_index` readings as a
  *population-weighted mean ordinal class (mean rank)*, not a score, in the rollup alert on both
  pages — the existing "ordinal, not linear" caveat does not tell the reader that at rollup grain
  the displayed number is itself an average of ordinals.
- **C5 (must fix — cheap):** add one sentence to `berlin/maps.md` noting that Ortsteil values are
  assembled from PLRs by *dominant-overlap assignment* (PLRs do not nest into Ortsteile), so
  Ortsteil figures are approximate to the drawn boundary, unlike PGR/Bezirk which nest exactly.
- **C3 (recommended):** consider extending the fragility signal with a weak-plurality condition
  (e.g. `dominant_share < 0.5`) or reword the existing note to "fragile / weakly dominant".
- **C2 (note, no action):** re-check the "population-weighted" framing if Hamburg's population
  coverage is ever backfilled; today the claim is Berlin-only and the Hamburg page says so.

## Recommendations (non-blocking, future work)

1. Publish a population-weighted **median** class (or "share of population in the two worst status
   classes") alongside the mean — an ordinal-appropriate central-tendency companion that would let
   the pages drop the mean-rank caveat entirely for the headline reading.
2. Consider a within-area **heterogeneity** measure on the mix (e.g. normalized entropy or
   `1 - dominant_share`) as a first-class column — it is the natural MAUP-honesty statistic and the
   mix already contains everything needed to compute it.
3. When a period selector eventually lands on these pages, guard the Ortsteil × pre-2021 empty
   combination explicitly in the UI rather than letting it render an empty map.

## Verification performed

- `uv run dbt build --project-dir transform --profiles-dir transform --select
  mart_area_rollup_stage_mix+` from repo root: **27/27 PASS, 0 WARN, 0 ERROR**.
- Direct DuckDB queries against `data/gentriduck.duckdb` reproducing: area counts per level
  (12/58/97 BER, 104/7 HH), fragility counts, `dominant_share` distribution, `has_incomplete_population`
  prevalence per city/level, and `status_index_weighted_mean` range per level (the C4 evidence).
- No production code edited.

Verdict (initial review, 2026-07-30): PASS WITH CONCERNS

---

# Re-review after fix commit 18dfeda3 (2026-07-30)

Re-verified independently against the diff `git diff da3bcfd4 18dfeda3` (2 files, +489/−124:
`web/pages/berlin/maps.md`, `web/pages/hamburg/maps.md` — no `transform/` change, so §1–§4 of the
original review stand unchanged and the mart is bit-identical to what I tested), a full site
build, and fresh DuckDB re-derivation. I did not take the commit message at its word; each claim
below was checked in the source.

## C4 (was blocking) — RESOLVED

The remedy taken is stronger than the one I asked for: rather than pinning the scalar domain, the
scalar choropleth is **removed at rollup grain**, so there is no auto-scaling legend left to
mislead.

- The `<Dropdown name="indicator">` is now wrapped in `{#if !isRollup} ... {:else} <p>…</p> {/if}`
  on both pages — at rollup grain no `status_index`/`dynamism_index` option is rendered at all.
- The stale-value leak I would have flagged next is genuinely closed, not just named. The guard is
  `$: effectiveIndicator = isRollup ? 'status_class' : inputs.indicator.value;` — an unconditional
  override, not a "reset on change" handler, so a `status_index` value persisted in the Evidence
  input store from a prior PLR view cannot reach the map. I grepped both pages for every remaining
  `inputs.indicator.*` reference: on `berlin/maps.md` they survive only at lines 141/165–173 (a
  comment and the two `effectiveIndicator`/`effectiveIndicatorLabel` definitions themselves, both
  in the `!isRollup` arm of the ternary); on `hamburg/maps.md` only at 118–126, identically. Every
  consumer — `<AreaMap value=/legendType=/colorPalette=/title=>` (berlin 580–583, hamburg
  438–441), the leaf tooltip (berlin 238–240, hamburg 183–185) — reads `effectiveIndicator` /
  `effectiveIndicatorLabel`. The rollup tooltip no longer branches at all: it is hard-wired to
  `{ id: 'stage_label', title: 'Most widespread stage' }`.
- Consequence for the legend: at rollup grain `legendType` is always `'categorical'` with the
  fixed six-stage palette, i.e. colour meaning is now **invariant across granularity switches** —
  exactly the property C4 asked for. A scalar auto-scaled legend remains only at leaf grain
  (PLR / statistisches Gebiet), where there is a single grain and therefore no cross-scale
  comparison to distort. That residual is pre-existing, out of #310's scope, and non-blocking.
- The rollup `<p>` replacement text correctly states *why* (ordinal averaging as a coloured/ranked
  coarse indicator) and where the raw ordinals remain available. No dangling "Social status /
  Dynamism" instructions were left in the how-to-read Alert: both pages now scope that sentence to
  the leaf level ("At the Planungsraum (PLR) level, …" / "At the statistisches Gebiet level, …").

## C1 (was blocking) — RESOLVED

- Both `area_table_rollup` DataTables now title the columns "Social status — population-weighted
  mean ordinal class (mean rank; 1=least deprived … 4=most deprived)" and "Speed of change —
  population-weighted mean ordinal class (mean rank…)". That is the wording I asked for.
- The ranking use is gone: `order by dynamism_index desc` (Berlin) and
  `order by dynamism_index_weighted_mean desc` (Hamburg) are both replaced by `order by area_name`.
  Ordering a citywide table by a mean of ordinals was the strongest implicit interval-scale claim
  on the page, and dropping it matters more than the label change. Both `order by area_name`
  clauses resolve to a valid output alias (`m.area_name` in Hamburg; the `coalesce(...) as
  area_name` Bezirk-name fallback in Berlin) — checked, not assumed.
- A matching Honest-caveats bullet ("…a population-weighted mean ordinal class (a mean rank), not
  a rescaled score…") is present on both pages, so the caveat survives even for a reader who never
  opens the table.

## C5 (was blocking) — RESOLVED, and accurate

`berlin/maps.md` now carries the disclosure in two places: the area-level dropdown option label
("Ortsteil — ~97 traditional neighbourhoods (approximate assignment, see caveats)") and a
Honest-caveats bullet: *"PLRs do not nest cleanly into Ortsteile, so each Ortsteil's figures are
assembled from the PLRs a dominant-overlap rule assigns to it … the drawn polygon is the true
Ortsteil boundary, but the value describes that assigned-PLR set."* I checked this against
`transform/models/intermediate/int_berlin_plr_ortsteil_overlap.sql` (which documents exactly a
largest-overlap-share `is_dominant_ortsteil` assignment with `overlap_frac_of_plr` retained, and
82 straddler PLRs): the page's statement is factually correct, names the right mechanism, and
does not overclaim. Correctly Berlin-only — Hamburg has no analogous non-nesting hop.

## C2 / C3 — no regression; both partially improved

- **C2 (Hamburg equal-weighting):** improved, not weakened. Every "population share" label that
  was an unconditional claim is now conditional ("Most widespread stage's share
  (population-weighted, or equal-weighted — see the incomplete-data column)"), the Stage-mix table
  gained a per-row `has_incomplete_population` column, and Hamburg's page still states plainly
  that its whole rollup surface is currently equal-weighted.
- **C3 (weak plurality):** `is_dominant_fragile` is unchanged (still count-based, `n < 3`), so my
  original recommendation stands as future work. But the new `acute_stage_share` counterweight
  plus the directional "biased toward calm, not neutral" Alert materially reduce the risk a weak
  plurality is read as a confident label. No regression.

## New material added in this commit (reviewed on its own merits)

`acute_stage_share` = population share in `active-gentrification` + `pioneer-signal` +
`improving-vulnerable`, computed page-side as a sum over already-published mix rows. This is a
legitimate composition statistic, not a new index: it does not average ordinals, does not
re-categorize, and is the kind of "share of population in the more acute classes" companion my own
Recommendation 1 asked for. Verified by independent re-derivation at the latest period per
(city, level): mix shares sum to exactly 1.000 for all 278 areas (so the acute subset can neither
double-count nor exceed 1); max acute share 0.30 BER bezirk, 0.72 BER pgr/ortsteil, 0.50 HH
subarea_l1, 0.09 HH district — plausible and consistent with the leaf distribution. The
sparse-mart NULL trap the code comments flag is real and correctly handled: a filtered `SUM` over
zero matching stage rows returns NULL, not 0 (1 BER bezirk, 29 pgr, 67 ortsteil, 75 HH subarea_l1
areas have no acute rows), and the `case when n_habitable_children = 0 then null else
coalesce(..., 0) end` guard converts those to 0 **only** for areas with real children while
preserving genuine NULL for the 2 BER ortsteil + 5 HH subarea_l1 orphans — matching
`dominant_share`'s own convention and exactly the survivorship-honesty position of §4. No
double-counting is possible: the CTE filters to one (city, level, period, variant) before grouping
by `area_code`, and `(that combination, typology_stage)` is the mart's natural key.

The directional "coarse readings resolve toward the most common and *least acute* stage" Alert and
caveat bullet are a correct statement of the MAUP aggregation bias here (plurality voting on a
skewed categorical distribution is directionally, not symmetrically, biased) and are a genuine
improvement over the previous neutral "blurring" framing. The de-jargoning of the Stage-mix table
(`typology_stage` → the same `stage_label` mapping used everywhere else) and the `rows=10` →
`rows=50` cap change are cosmetic and introduce no methodological change.

## Verification performed (re-review)

- Read the full diff for both pages; grepped every remaining `inputs.indicator` reference on both.
- `npm run sources` → exit 0; `npm run build` → **exit 0**, `build/berlin/maps/index.html`
  produced. No errors; the "Dataset is empty" warnings in the log are pre-existing SSR prerender
  warnings on other components, none traceable to the #310 queries. Spot-checked the built HTML:
  the new caveat strings ("mean ordinal class", "dominant-overlap", "acute-pressure") are present,
  and the area-level/indicator dropdown structure renders.
- DuckDB re-derivation of `acute_stage_share` and the share-sum/NULL/orphan behaviour described
  above, against `data/gentriduck.duckdb`.
- No `web/`, `transform/`, or other production file edited by me.

**Residual, non-blocking (carried forward, not gating):** (i) leaf-grain scalar legend still
auto-scales — harmless within a single grain, but worth pinning if a leaf-vs-leaf cross-city
comparison view is ever built; (ii) C3's weak-plurality (`dominant_share < 0.5`) signal remains
unimplemented; (iii) the pre-2021 × Ortsteil empty combination remains a trap for a future period
selector.

Verdict: PASS
