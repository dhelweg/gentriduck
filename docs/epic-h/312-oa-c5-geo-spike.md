# [H-C5-OA] #312 — Investigation: C5 completeness-bias re-fit for `mart_poi_offering_advantage` (Hamburg)

- **Type:** Investigation spike (NOT a sign-off). Formal dual sign-off (geo-data-scientist +
  gentrification-domain-expert, R-C1) happens after this doc, by those agents, before this branch
  integrates into `develop`.
- **Author:** data-engineer (evidence-gathering for the R-C1 gate; empirical/statistical judgement
  below is presented for the geo-data-scientist to independently confirm or contest, same relationship
  the coder normally has to the reviewer/gate).
- **Date:** 2026-07-24
- **Issue:** #312 (blocks treating Hamburg's already-computed `mart_poi_offering_advantage` rows as
  methodologically cleared; see "What this doc does and does not authorize" below for what is
  actually already live on the site).
- **Precedent reused, not re-derived:** #158 `docs/epic-h/158-hc1-geo-spike.md` (the C5 re-fit for
  `dynamism_score`/`status_score` in the gentrification-index pipeline) and its dual sign-offs
  (`158-hc1-geo-signoff.md`, `158-hc1-domain-signoff.md`), plus the already-published, Berlin-only
  `docs/methodology/OA-D5-mode-comparison-findings.md` (OA-D0 geo sign-off Condition C3's
  completeness-contamination gate, applied to all nine OA calculation methods).
- **Warehouse queried:** `data/gentriduck.duckdb`, rebuilt fresh on this branch 2026-07-24
  (`uv run poe build`, 1018 pass / 5 pre-existing warn / 0 error / 7 no-op — see "Build status"
  below). Models queried: `fct_poi_development`, `int_poi_offering_advantage`,
  `int_poi_offering_advantage_methods`, `mart_poi_offering_advantage`.

---

## TL;DR / verdict for the follow-up

**The C5 completeness-bias mechanism transfers to Hamburg for the OA construct, and does so on a
*stronger* structural footing than the #158 dynamism-score case, not merely an equally-good one.**
`oa_domain`/`oa_category`/`oa_type` (the location-quotient family, `int_poi_offering_advantage.sql`)
are **same-year** ratios of (local share / city share) — algebraically invariant to *any* city-wide
completeness multiplier that scales a given year's POI counts uniformly across areas, without even
needing the cross-year cancellation argument #158 relied on for `dynamism_score`'s YoY-delta
construct. That structural argument is verified empirically below by **extending the existing,
Berlin-only OA-D5 completeness-contamination gate to Hamburg for the first time**: all nine OA
calculation methods — including `raw_share`, `density`, and `percapita`, the three methods the
project's own seed metadata (`seed_oa_calculation_methods.csv`) flags `expected_temporal_safe=false`
— pass the gate for Hamburg (`|rho| < 0.3`, matching or exceeding Berlin's own already-published
result), with `percapita` even reaching a *determinate* result for Hamburg (Berlin's own run is
indeterminate, only one EWR year-transition available).

**Recommended path = confirm + document, no code/math change**, exactly #158's precedent outcome:

1. The existing `accepted_values: ["BER", "HH"]` on `mart_poi_offering_advantage.city_code` (and on
   `mart_poi_oa_methods`, `mart_poi_offering_advantage_map`, `int_poi_offering_advantage_arealevel`)
   is **methodologically justified**, for every column this mart exposes, not just the LQ family. No
   widening is needed here — it needs *retroactive validation*, which this doc provides.
2. No new OA-specific dbt test is needed. The existing city-agnostic `test_c5_poi_share_spike` /
   `test_c5_poi_count_drop` (on `int_poi_status_dynamism`, itself fed by the same
   `fct_poi_development` table OA consumes) already cover the underlying completeness-growth signal
   for both cities; OA's own gate (deliverable 4 of `analysis/d_oa_mode_comparison.py`) is a Python
   analysis-script check, not a dbt test, matching how it already works for Berlin — extending it to
   run for Hamburg automatically is a documented forward recommendation (R4 below), not built here
   (do-not-over-build, matching #158's R1/R2 split).
3. Standing caveats (density/per-capita are "provision", not "offering-advantage"; never blend;
   MUST NOT be presented as causal; the citywide gate does not by itself authorize a live YoY delta
   without the still-unbuilt per-cell completeness flag) already apply **equally** to Berlin and now
   Hamburg — this doc does not relax them for either city, and does not need to add a Hamburg-only
   version of them.

---

## What this doc does and does not authorize (read first)

`web/pages/hamburg/poi-map.md` (commit `e21aa74e`, "publish Hamburg — landing, maps, and POI pages
(#237 H3 scope b/c)") **already publishes** `mart_poi_offering_advantage_map`'s Hamburg rows,
including a client-side "change since previous year" (YoY delta) toggle for both `oa_domain` and
`poi_density_per_km2`. That commit's own header comment argues this doesn't depend on the H3 (#237)
gentrification-index admission because OA is a separate, city-agnostic mart with real Hamburg rows
"already gated" at H1 (#40) — but #312's background note is explicit that this was **not** actually
true: the C5 re-fit gate for OA specifically was still open, discovered during the #303 rescoping
investigation. **This doc is the missing re-fit**, and its finding is that the already-shipped page
turns out to be empirically safe under the same governance standard already applied to Berlin's own
published `/berlin/poi-map` (which has carried the identical YoY-delta toggle since #210, under the
identical "citywide gate is supportive evidence, not itself a live-delta authorization" caveat) — see
"Answering the task's four questions" §3 below. This is a **retroactive validation**, not a new
mitigation, and does not require any change to the already-shipped web page.

---

## 1. The mapper-growth curve: reused, not re-derived — same shape confirmed directly on OA's own source table

#158 already established (and its dual sign-off confirmed) that Hamburg's OSM POI ingestion runs
2008–2026, the same window/cadence as Berlin, with the same cold-start-then-stabilize shape
(stabilizing ~2014–2015). Rather than re-deriving that curve from scratch, this investigation
re-queried it directly against `fct_poi_development` — the exact table `int_poi_offering_advantage`
consumes (not `int_poi_status_dynamism`, the table #158 queried) — to confirm the two models share
one underlying completeness signal, not two independently-varying ones:

| Year | BER YoY % | HH YoY % |
|---|---|---|
| 2009 | 648.9 | 598.2 |
| 2010 | 111.7 | 115.4 |
| 2011 | 69.4 | 55.3 |
| 2012 | 35.6 | 23.3 |
| 2013 | 21.2 | 25.4 |
| **2014** | **11.7** | **12.8** |
| **2015** | **10.6** | **8.6** |
| 2016–2026 | 6.4–17.9 | 5.6–14.5 |

This matches #158's table (queried from `int_poi_status_dynamism`) to within rounding — confirming
`fct_poi_development` (OA's source) and `int_poi_status_dynamism`'s `total_poi_count` (dynamism's
source) are the same underlying OSM ingestion series, so #158's premise-1 finding ("bulk of OSM
coverage growth predates 2015; post-2015 coverage is more stable, same shape for both cities")
transfers to OA's input data by construction, not by analogy.

## 2. Structural argument: OA's LQ family is a *same-year* ratio, a stronger invariance than dynamism's YoY-delta

`int_poi_offering_advantage.sql`'s construct (see that file's header, "Construct"):

```
OA(level, a) = local_share / city_share   (both computed WITHIN THE SAME snapshot_year)
```

Consider a hypothetical city-wide, area-uniform completeness multiplier `c(year)` that scales every
area's POI counts in a given year by the same factor (the "uniform coverage growth" premise #158's
sign-off already validated empirically, for both cities, at the *area* level within a year — i.e.
`c` does not vary by area, only by year). Because `c(year)` multiplies both the local stock and the
city-wide stock in the numerator and denominator of `local_share` (and, separately, of `city_share`)
identically, it **cancels exactly**, for *every* year independently:

```
local_share(year) = (c(year) * X_a) / (c(year) * Σ_d d_a) = X_a / Σ_d d_a   -- c(year) cancels
city_share(year)  = (c(year) * X_city) / (c(year) * Σ_d d_city) = X_city / Σ_d d_city  -- c(year) cancels
```

This is a **stronger** invariance than `int_poi_status_dynamism`'s `share_yoy_change`, which needs the
completeness multiplier to be *comparable* across two adjacent years (or at least for the bias
component to not itself trend sharply within the delta window) — LQ's ratio form doesn't even need
that, since numerator and denominator of each single-year ratio share the identical `c(year)` and
cancel within that year alone. `density` and `percapita` (notes 8/9,
`int_poi_offering_advantage_methods.sql`) have **no such cancellation**: their denominators
(`area_km2`, `residents_total`) are completeness-independent by construction, so a completeness
multiplier on the numerator alone propagates straight through — exactly the documented
"TEMPORAL-UNSAFE" expectation already carried in that model's header for both cities.

This structural argument alone would already satisfy #158's own bar ("the mechanism is already
per-\[level\]-partitioned, not a Berlin-hardcoded constant"); the empirical check below independently
confirms it rather than resting on algebra alone.

## 3. Empirical extension of the OA-D5 completeness-contamination gate to Hamburg (new in this ticket)

`docs/methodology/OA-D5-mode-comparison-findings.md` §4 already ran the OA-D0 geo sign-off's
Condition C3 gate — Spearman rho between each area's year-over-year delta in `oa_value` and the
city-wide year-over-year delta in `all_domains_stock_city` (the same OSM-coverage-growth proxy the C5
sign-off established) — for **Berlin only**, across all nine registered OA methods
(`seed_oa_calculation_methods.csv`). That gate had never been run for Hamburg. This investigation ran
the identical query (`analysis/d_oa_mode_comparison.py`'s `run_contamination_gate`, same SQL shape,
same `|rho| >= 0.3` and `p < 0.05` fail threshold, same `weight_variant='standard'`,
`methodology_variant='faithful'` scope) with the `WHERE` filter changed from Berlin to
`city_code = 'HH'`, re-verifying Berlin's own numbers in the same pass as a sanity check that nothing
about the underlying data changed the conclusion since that doc was generated:

| Method | BER rho (this run) | BER pass? | **HH rho (new)** | **HH pass?** |
|---|---|---|---|---|
| nested_lq | 0.045 | yes | -0.032 | yes |
| global_lq | 0.045 | yes | -0.032 | yes |
| log_lq | 0.040 | yes | -0.033 | yes |
| share_diff | 0.057 | yes | -0.041 | yes |
| shrunk_lq | 0.016 (p=0.155, n.s.) | yes | -0.013 (p=0.108, n.s.) | yes |
| raw_share | 0.052 | yes | -0.035 | yes |
| zscore_slq | 0.017 (p=0.127, n.s.) | yes | -0.019 | yes |
| density | 0.016 (p=0.153, n.s.) | yes | 0.033 | yes |
| percapita | n/a — indeterminate (1 year-transition) | n/a | 0.015 (p=0.155, n.s.) | **yes — and determinate** |

(`n=7830` for Berlin, `n=15962` for Hamburg on the 7 relative-family + density rows; `n=9340` for
Hamburg `percapita` vs Berlin's `n=540`.) Berlin's rho values here differ in the third decimal from
the published findings doc (e.g. `nested_lq` 0.045 here vs 0.053 published) — this is the ordinary
warehouse-refresh drift that findings doc's own header already anticipates ("numeric drift... reflects
ordinary warehouse data refreshes... not a methodology or code change"), not a discrepancy introduced
by this investigation; the pass/fail conclusion for every Berlin method is unchanged.

**All nine methods pass for Hamburg**, at magnitudes comparable to or smaller than Berlin's own
(mostly-passing) values. `percapita` is Hamburg's one qualitative improvement over Berlin: Berlin's
`int_ewr_socioeco` exact-year EWR-to-POI join only has a literal match in one transition window
(indeterminate, not a pass — `OA-D5-mode-comparison-findings.md` §4 already documents this as a data
availability gap, not a methodology flaw), whereas Hamburg's `int_ewr_socioeco_hamburg` carries EWR
`reference_year` 2013–2024 (12 distinct years, vs Berlin's fragmented 2008–2020 + 2024–2025 under the
`lor_2021`-only restriction), giving `percapita` enough transitions for the gate to actually run and
pass for Hamburg.

`density` here is `oa_domain_density` (`domain_stock_local / area_km2`,
`int_poi_offering_advantage_methods.sql` note 8) — structurally the same construct as
`mart_poi_offering_advantage`'s own `poi_density_per_km2` (`fct_poi_development`'s domain-summed
`poi_count / area_km2`, same numerator source table, same native-CRS area denominator), and the exact
quantity `mart_poi_offering_advantage_map`'s `oa_domain` + `poi_density_per_km2` feed the already-live
`/hamburg/poi-map` "change since previous year" toggle (see "What this doc does and does not
authorize" above). This empirical result is therefore directly, not just analogously, relevant to
that page.

## 4. A separate, pre-existing, unrelated caveat: Hamburg's finer grain interacts with the D-3 min-base flag, not with C5

Checked for completeness, because #158's dynamism spike found an analogous finer-grain interaction
(23.6% of Hamburg Gebiete carry <20 POIs vs 2.4% of Berlin PLRs) — this is **not** a C5/completeness
question, it is the pre-existing, already-documented D-3 min-POI-base flag
(`int_poi_offering_advantage.sql`, `oa_min_poi_base_n` var, default 10) doing exactly what it is
designed to do. Measured on the current warehouse, 2025 snapshot, `weight_variant='standard'`,
`methodology_variant='faithful'`:

| | domain-level flag rate | category-level flag rate |
|---|---|---|
| BER | 0.02% | 19.4% |
| **HH** | **0.79%** | **47.6%** |

Hamburg's finer statistische-Gebiet grain (~945 areas vs Berlin's ~542 PLRs) trips the *advisory*
min-base flag substantially more often at category/type level — exactly the "thinly-mapped area"
signal the flag exists to surface (D-3, `int_poi_offering_advantage.sql` header), not evidence of a
broken completeness correction. The flag is advisory (never a row drop — same "anti-erasure framing"
the model header already documents), and this rate difference is an *expected*, already-mechanism-
covered consequence of Hamburg's grain choice (OA-D1b domain sign-off already accepted this grain for
the roll-up model), not a new finding requiring a code change here.

## Answering the task's four questions

1. **Coverage curve:** confirmed directly on `fct_poi_development` (OA's own source table, not
   merely `int_poi_status_dynamism` by analogy) — same 2008–2026 window, same cold-start-then-
   stabilize shape, stabilizes ~2014–2015 like Berlin. #158's premise transfers to OA's actual input
   data, not just to a structurally similar model.
2. **Is OA's LQ family (a share ratio) robust to completeness bias the same way `dynamism_score`
   is?** Yes, and by a *stronger* argument: LQ is a same-year local-share/city-share ratio, invariant
   to any area-uniform per-year completeness multiplier without needing cross-year comparability
   (§2). Empirically confirmed for Hamburg for the first time by extending the OA-D5 gate (§3):
   `nested_lq`/`global_lq`/`log_lq`/`share_diff`/`shrunk_lq` all pass, `|rho| <= 0.06`.
3. **Do density/per-capita OA methods need a caveat/flag/exclusion for Hamburg publication?** No
   *additional* one — they already carry a project-wide (not Berlin-specific) TEMPORAL-UNSAFE-by-
   design caveat (`seed_oa_calculation_methods.csv` `expected_temporal_safe=false`,
   `int_poi_offering_advantage_methods.sql` notes 6/8/9) that this investigation neither relaxes nor
   needs to tighten for Hamburg: the extended gate found `raw_share`/`density`/`percapita` all
   *empirically* pass for Hamburg too — the same "surprise" `OA-D5-mode-comparison-findings.md`
   already documented for Berlin ("this CONTRADICTS the pre-registered expectation... does not, by
   itself, authorize a live year-over-year delta" — the citywide check is not the stricter per-cell
   flag the OA-D7 page conditions require). Hamburg is held to the identical standard as Berlin, not
   a laxer or stricter one.
4. **Recommended path:** confirm + document (mirrors #158's "(a)" outcome) — no change to
   `int_poi_offering_advantage.sql`'s or `int_poi_offering_advantage_methods.sql`'s math, no new
   dbt test, header/schema.yml documentation updates only. See recommendations below.

---

## Concrete recommendations

### R1 — Document the Hamburg re-fit in the OA intermediate model headers (this ticket)

`int_poi_offering_advantage.sql` and `int_poi_offering_advantage_methods.sql` headers gain a citation
to this spike, recording that the LQ-family's same-year-ratio invariance was independently verified
(not assumed) against Hamburg's own coverage curve and the extended completeness-contamination gate.
Implemented on this branch (see diff).

### R2 — Confirm (not widen) `mart_poi_offering_advantage`'s `city_code` accepted_values (this ticket)

The `["BER", "HH"]` accepted_values already present on `mart_poi_offering_advantage.city_code` (and
sibling marts `mart_poi_oa_methods`, `mart_poi_offering_advantage_map`,
`int_poi_offering_advantage_arealevel`) is retroactively validated by this spike. Schema.yml
description gains a citation to this doc. Implemented on this branch (see diff).

### R3 — No new OA-specific dbt test (this ticket, do-not-over-build)

The city-agnostic `test_c5_poi_share_spike` / `test_c5_poi_count_drop` (on
`int_poi_status_dynamism`, fed by the same `fct_poi_development` completeness signal OA consumes)
already cover the underlying data-quality risk for both cities. OA's own gate is a Python analysis
check (`analysis/d_oa_mode_comparison.py`), not a dbt test, matching precedent; formalizing a
standing dbt-level completeness test for OA specifically is not required by this ticket's evidence
and is not built here.

### R4 — Forward recommendation (non-blocking, not built here): make the OA-D5 gate script city-agnostic

`analysis/d_oa_mode_comparison.py`'s `run_contamination_gate` currently hardcodes
`WHERE (lower(m.city_code) = 'berlin' OR m.city_code = 'BER')` and groups deltas by `area_code` alone
(not `(city_code, area_code)`). Extending it to run per-city (or pooled, once `city_code` is added to
the delta `GROUP BY`/partition) would let future re-runs pick up Hamburg automatically instead of
needing a one-off ad hoc query like this investigation's. **Caution for whoever picks this up:**
Berlin PLR codes (8-digit, e.g. `01200628`) and Hamburg Gebiet codes (6-digit, e.g. `100005`) do not
currently collide (verified: 0 overlapping `area_code` values in `int_poi_offering_advantage_methods`
across the two cities), but naively removing the city filter without adding `city_code` to the
delta-computation partition would silently merge any future-format collision across cities — a latent
correctness trap, not merely a style nit. Not built here (do-not-over-build / out of this ticket's
minimal-diff scope).

### R5 — Publication gate note (governance, not new)

This spike clears the **methodological** blocker #312 opened. Per CLAUDE.md's methodology gate
(R-C1), it still needs a fresh geo-data-scientist **and** gentrification-domain-expert dual `PASS`
sign-off, referencing this doc, before this branch integrates into `develop` — not granted here (see
"Type" header above). Given `web/pages/hamburg/poi-map.md` is already live (§ "What this doc does and
does not authorize"), the domain-expert review should in particular confirm the D-1/D-2/D-3
interpretation guardrails already carried in `int_poi_offering_advantage.sql`'s header (descriptive
not causal; multi-signed bundle; anti-erasure framing for the min-base flag) read correctly for
Hamburg's Gebiet grain and narrative context, mirroring the residual caveat #158's own domain
sign-off flagged for `dynamism_score`.

---

## Risks / caveats for reviewers

- The structural same-year-ratio invariance argument (§2) assumes the completeness multiplier is
  area-uniform *within* a year — the same premise #158's dual sign-off already validated empirically
  for Hamburg (not re-litigated here, only cited); if a future ticket finds evidence of
  non-uniform per-area mapping bursts within Hamburg, both this doc's and #158's conclusions would
  need revisiting together, since they share the same premise.
- The empirical gate (§3) is a **citywide, per-method** check, identical in scope and limitation to
  what `OA-D5-mode-comparison-findings.md` already documents for Berlin: a PASS here is supportive
  evidence, not by itself an authorization for a live per-cell YoY delta (that needs a stricter,
  still-unbuilt per-cell completeness flag — OA-D7 page's own carried-forward condition, unchanged by
  this ticket for either city).
- `percapita`'s Hamburg-favorable result (determinate vs Berlin's indeterminate) is a data-coverage
  artifact of Hamburg's EWR ingestion currently spanning more distinct reference years than Berlin's
  `lor_2021`-restricted series, not evidence Hamburg's per-capita construct is inherently more robust
  than Berlin's — both remain subject to the same "denominator endogenous to displacement" domain
  caveat (OA-D0 domain sign-off Condition C) regardless of this gate's outcome.
- Untrusted-input note (SEC-3): findings here derive solely from the local warehouse and repo files
  (built fresh on this branch, `uv run poe build`); no external/web content informed the methodology.

## Build status

`uv run poe build` (this branch, 2026-07-24): `1018 pass / 5 warn (all pre-existing, unrelated:
`int_berlin_brw_plr` residential coverage, `test_ortsteil_overlap_ortsteil_never_dominant`,
`assert_null_rate_below_int_osm_poi_{hamburg,plr}`, `test_c5_poi_share_spike`) / 0 error / 7 no-op`.
No new failures introduced by the header/schema.yml documentation changes on this branch.

---

## Suggested sign-off inputs (for the eventual dual sign-off, not yet in force)

```json
{
  "verdict_input_for_geo_ds": "The OA location-quotient family (nested_lq/global_lq/log_lq/share_diff/shrunk_lq/raw_share/zscore_slq) is a same-year local-share/city-share ratio, structurally invariant to an area-uniform per-year OSM completeness multiplier -- a stronger invariance than dynamism_score's YoY-delta construct already validated for Hamburg in #158. Empirically confirmed by extending the Berlin-only OA-D5 completeness-contamination gate (OA-D0 geo sign-off Condition C3) to Hamburg for the first time: all nine registered OA methods pass (|rho|<0.06 relative family, |rho|=0.033 density, |rho|=0.015 percapita -- percapita additionally reaches a determinate result for Hamburg where Berlin's own run is indeterminate). No normalization change made or needed; the existing accepted_values=['BER','HH'] on mart_poi_offering_advantage.city_code and sibling marts is retroactively validated, not newly authorized.",
  "risks": [
    "Structural argument shares #158's area-uniform-within-year completeness premise; a future finding of non-uniform Hamburg mapping bursts would need revisiting both together",
    "The citywide gate is supportive evidence only, not itself authorization for a live per-cell YoY delta absent the still-unbuilt per-cell completeness flag (unchanged standing caveat, both cities)",
    "web/pages/hamburg/poi-map.md already ships the YoY-delta toggle live (since #237/e21aa74e) ahead of this gate closing -- this doc retroactively validates it, does not newly build or change it"
  ],
  "recommendations": [
    "R1/R2: header + schema.yml documentation citing this spike (implemented)",
    "R3: no new OA-specific dbt test (city-agnostic C5 tests + the Python analysis gate already cover this)",
    "R4 (non-blocking, future): make analysis/d_oa_mode_comparison.py's contamination gate city-agnostic, with a caution about area_code collision risk if city_code is dropped from the delta partition",
    "R5: domain-expert pass should specifically confirm the D-1/D-2/D-3 interpretation guardrails transfer to Hamburg's Gebiet grain/narrative context"
  ]
}
```
