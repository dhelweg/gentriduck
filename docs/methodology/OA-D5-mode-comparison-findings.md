# OA-D5 (#240, extended #285): Cross-Mode Comparison Study

Generated 2026-07-24 22:59 UTC by `analysis/d_oa_mode_comparison.py`. Berlin only, `weight_variant='standard'`, `methodology_variant='faithful'` throughout (the bandwidth-free, hard point-in-polygon, uncurated variant every other OA analysis script anchors on -- oa_bandwidth_sweep.py's own precedent). ADR-0024 D3 never-blend: every figure below is reported per-method, never averaged/combined across methods. **#285 extension:** `density` and `percapita` (both `reference_point='absolute'`, both `expected_temporal_safe=false` per `seed_oa_calculation_methods.csv`) are now included in the cross-mode correlation (§1b, informational only) and the completeness-contamination gate (§4) -- they were absent from the original OA-D5 run because they were added to the pipeline afterwards. They remain excluded from every OTHER deliverable below (MAUP, bandwidth, golden validation) for the same documented reasons the other six non-canonical methods are -- see each section.

## 1. Cross-mode Spearman rank correlation

### 1a. The seven relative-family methods (unchanged from the original OA-D5 run)

Pairwise rank correlation between the seven parent-/city-relative calculation methods, pooled across all years/areas, per taxonomy level. Answers: *how differently do the seven modes actually rank the same areas?* #285 reuses the IDENTICAL query/code path the original OA-D5 run used for this table -- this extension adds density/percapita as a new §1b below, it does not modify this one. Any numeric drift from a previously published findings doc reflects ordinary warehouse data refreshes between report generations (new OSM/EWR ingestion), not a methodology or code change here.

#### Domain level

| Method A | Method B | rho | p | n |
|---|---|---|---|---|
| nested_lq | global_lq | 1.000 | 0.0000 | 74300 |
| nested_lq | log_lq | 1.000 | 0.0000 | 74300 |
| nested_lq | share_diff | 0.886 | 0.0000 | 74300 |
| nested_lq | shrunk_lq | 0.996 | 0.0000 | 74300 |
| nested_lq | raw_share | 0.425 | 0.0000 | 74300 |
| nested_lq | zscore_slq | 0.937 | 0.0000 | 74300 |
| global_lq | log_lq | 1.000 | 0.0000 | 74300 |
| global_lq | share_diff | 0.886 | 0.0000 | 74300 |
| global_lq | shrunk_lq | 0.996 | 0.0000 | 74300 |
| global_lq | raw_share | 0.425 | 0.0000 | 74300 |
| global_lq | zscore_slq | 0.937 | 0.0000 | 74300 |
| log_lq | share_diff | 0.886 | 0.0000 | 74300 |
| log_lq | shrunk_lq | 0.996 | 0.0000 | 74300 |
| log_lq | raw_share | 0.425 | 0.0000 | 74300 |
| log_lq | zscore_slq | 0.937 | 0.0000 | 74300 |
| share_diff | shrunk_lq | 0.875 | 0.0000 | 74300 |
| share_diff | raw_share | 0.441 | 0.0000 | 74300 |
| share_diff | zscore_slq | 0.944 | 0.0000 | 74300 |
| shrunk_lq | raw_share | 0.419 | 0.0000 | 74300 |
| shrunk_lq | zscore_slq | 0.946 | 0.0000 | 74300 |
| raw_share | zscore_slq | 0.425 | 0.0000 | 74300 |

#### Category level

| Method A | Method B | rho | p | n |
|---|---|---|---|---|
| nested_lq | global_lq | 0.632 | 0.0000 | 190428 |
| nested_lq | log_lq | 1.000 | 0.0000 | 190428 |
| nested_lq | share_diff | 0.883 | 0.0000 | 190428 |
| nested_lq | shrunk_lq | 0.967 | 0.0000 | 190428 |
| nested_lq | raw_share | 0.346 | 0.0000 | 190428 |
| nested_lq | zscore_slq | 0.931 | 0.0000 | 187964 |
| global_lq | log_lq | 0.632 | 0.0000 | 190428 |
| global_lq | share_diff | 0.523 | 0.0000 | 190428 |
| global_lq | shrunk_lq | 0.659 | 0.0000 | 190428 |
| global_lq | raw_share | 0.183 | 0.0000 | 190428 |
| global_lq | zscore_slq | 0.641 | 0.0000 | 187964 |
| log_lq | share_diff | 0.883 | 0.0000 | 190428 |
| log_lq | shrunk_lq | 0.967 | 0.0000 | 190428 |
| log_lq | raw_share | 0.346 | 0.0000 | 190428 |
| log_lq | zscore_slq | 0.931 | 0.0000 | 187964 |
| share_diff | shrunk_lq | 0.812 | 0.0000 | 190428 |
| share_diff | raw_share | 0.583 | 0.0000 | 190428 |
| share_diff | zscore_slq | 0.912 | 0.0000 | 187964 |
| shrunk_lq | raw_share | 0.263 | 0.0000 | 190428 |
| shrunk_lq | zscore_slq | 0.943 | 0.0000 | 187964 |
| raw_share | zscore_slq | 0.441 | 0.0000 | 187964 |

#### Type level

| Method A | Method B | rho | p | n |
|---|---|---|---|---|
| nested_lq | global_lq | 0.760 | 0.0000 | 290341 |
| nested_lq | log_lq | 1.000 | 0.0000 | 290341 |
| nested_lq | share_diff | 0.814 | 0.0000 | 290341 |
| nested_lq | shrunk_lq | 0.972 | 0.0000 | 290341 |
| nested_lq | raw_share | 0.215 | 0.0000 | 290341 |
| nested_lq | zscore_slq | 0.934 | 0.0000 | 287890 |
| global_lq | log_lq | 0.760 | 0.0000 | 290341 |
| global_lq | share_diff | 0.567 | 0.0000 | 290341 |
| global_lq | shrunk_lq | 0.780 | 0.0000 | 290341 |
| global_lq | raw_share | 0.087 | 0.0000 | 290341 |
| global_lq | zscore_slq | 0.743 | 0.0000 | 287890 |
| log_lq | share_diff | 0.814 | 0.0000 | 290341 |
| log_lq | shrunk_lq | 0.972 | 0.0000 | 290341 |
| log_lq | raw_share | 0.215 | 0.0000 | 290341 |
| log_lq | zscore_slq | 0.934 | 0.0000 | 287890 |
| share_diff | shrunk_lq | 0.731 | 0.0000 | 290341 |
| share_diff | raw_share | 0.561 | 0.0000 | 290341 |
| share_diff | zscore_slq | 0.878 | 0.0000 | 287890 |
| shrunk_lq | raw_share | 0.118 | 0.0000 | 290341 |
| shrunk_lq | zscore_slq | 0.930 | 0.0000 | 287890 |
| raw_share | zscore_slq | 0.344 | 0.0000 | 287890 |

**Reading this:** `global_lq` is algebraically identical to `nested_lq` at the domain level by construction (int_poi_offering_advantage_methods.sql header note 2) -- expect rho=1.000 there; divergence at category/type is the substantive finding (parent-relative vs city-relative genuinely differ once you leave the domain level). `log_lq` is a monotonic transform of `nested_lq` -- expect rho=1.000 at every level (Spearman is rank-invariant to monotonic transforms; this is a check on the math, not a finding). `raw_share` and `zscore_slq` are expected to diverge most from the LQ family since they encode a fundamentally different question (a bare proportion / a base-aware significance score, not an over/under-representation ratio) -- low correlation there is *correct*, not a defect.

### 1b. Absolute-class methods (density, per-capita) vs. the relative family -- informational only (#285)

<!-- NEVER BLEND (ADR-0017/ADR-0024 D3, binding): the rho values below are computed for information -- Spearman is an ordinal statistic, not a shared scale -- but density/percapita must NEVER be presented on a shared choropleth colour scale, legend, or numeric axis with the relative-LQ family, here or anywhere else in this project. This section is a table of numbers, not a chart, precisely to keep that hazard from arising. -->

`density` and `percapita` are `reference_point='absolute'` (`seed_oa_calculation_methods.csv`) -- they answer a provision/centrality question ("how much commerce is here"), not an offering-advantage question ("is this type over-represented here"), so they form a genuinely separate class from the seven methods above. A high or low rho here does not mean the methods "agree" or "disagree" in the §1a sense -- it can arise simply because busy, dense, well-populated areas also happen to have typical location quotients, a coincidence of geography, not a validation of either construct against the other.

#### Domain level

| Method A | Method B | rho | p | n |
|---|---|---|---|---|
| density | nested_lq | 0.280 | 0.0000 | 74300 |
| density | global_lq | 0.280 | 0.0000 | 74300 |
| density | log_lq | 0.280 | 0.0000 | 74300 |
| density | share_diff | 0.266 | 0.0000 | 74300 |
| density | shrunk_lq | 0.283 | 0.0000 | 74300 |
| density | raw_share | 0.592 | 0.0000 | 74300 |
| density | zscore_slq | 0.274 | 0.0000 | 74300 |
| percapita | nested_lq | 0.313 | 0.0000 | 10695 |
| percapita | global_lq | 0.313 | 0.0000 | 10695 |
| percapita | log_lq | 0.313 | 0.0000 | 10695 |
| percapita | share_diff | 0.295 | 0.0000 | 10695 |
| percapita | shrunk_lq | 0.310 | 0.0000 | 10695 |
| percapita | raw_share | 0.898 | 0.0000 | 10695 |
| percapita | zscore_slq | 0.284 | 0.0000 | 10695 |
| density | percapita | 0.816 | 0.0000 | 10695 |

#### Category level

| Method A | Method B | rho | p | n |
|---|---|---|---|---|
| density | nested_lq | 0.006 | 0.0102 | 190428 |
| density | global_lq | 0.195 | 0.0000 | 190428 |
| density | log_lq | 0.006 | 0.0102 | 190428 |
| density | share_diff | 0.059 | 0.0000 | 190428 |
| density | shrunk_lq | 0.077 | 0.0000 | 190428 |
| density | raw_share | 0.214 | 0.0000 | 190428 |
| density | zscore_slq | 0.135 | 0.0000 | 187964 |
| percapita | nested_lq | 0.091 | 0.0000 | 29793 |
| percapita | global_lq | 0.241 | 0.0000 | 29793 |
| percapita | log_lq | 0.091 | 0.0000 | 29793 |
| percapita | share_diff | 0.160 | 0.0000 | 29793 |
| percapita | shrunk_lq | 0.132 | 0.0000 | 29793 |
| percapita | raw_share | 0.414 | 0.0000 | 29793 |
| percapita | zscore_slq | 0.203 | 0.0000 | 29005 |
| density | percapita | 0.761 | 0.0000 | 29793 |

#### Type level

| Method A | Method B | rho | p | n |
|---|---|---|---|---|
| density | nested_lq | -0.049 | 0.0000 | 290341 |
| density | global_lq | 0.078 | 0.0000 | 290341 |
| density | log_lq | -0.049 | 0.0000 | 290341 |
| density | share_diff | 0.069 | 0.0000 | 290341 |
| density | shrunk_lq | 0.001 | 0.6980 | 290341 |
| density | raw_share | 0.265 | 0.0000 | 290341 |
| density | zscore_slq | 0.107 | 0.0000 | 287890 |
| percapita | nested_lq | 0.006 | 0.2072 | 48445 |
| percapita | global_lq | 0.080 | 0.0000 | 48445 |
| percapita | log_lq | 0.006 | 0.2072 | 48445 |
| percapita | share_diff | 0.180 | 0.0000 | 48445 |
| percapita | shrunk_lq | 0.027 | 0.0000 | 48445 |
| percapita | raw_share | 0.508 | 0.0000 | 48445 |
| percapita | zscore_slq | 0.179 | 0.0000 | 47657 |
| density | percapita | 0.696 | 0.0000 | 48445 |

## 2. Per-mode MAUP (PLR-vs-BZR scale sensitivity)

**Scope boundary (read first):** `int_poi_offering_advantage_arealevel` (OA-D2) only rolled up `nested_lq` (see that model's own header, "Deferred to later D-spine tickets... shrunk-LQ, raw share, z-score, Getis-Ord, density, per-capita") -- the other eight methods, including density/percapita after #285, have NEVER been rolled up through `area_level`, so their MAUP behaviour is genuinely unknown, not merely unreported here. Extending the area_level roll-up to all nine methods is an OA-D2/D3 cross-product follow-up, explicitly out of this ticket's scope. This section checks nested_lq's own scale-sensitivity only (spatial-methods.md §7, r>0.7 gate, same method `analysis/a6_maup.py` already applies to dynamism_score).

| Year | rho | p | n | Fragile? |
|---|---|---|---|---|
| 2008 | 0.727 | 0.0000 | 459 | no |
| 2009 | 0.631 | 0.0000 | 1869 | **YES** |
| 2010 | 0.621 | 0.0000 | 2689 | **YES** |
| 2011 | 0.624 | 0.0000 | 3229 | **YES** |
| 2012 | 0.637 | 0.0000 | 3467 | **YES** |
| 2013 | 0.648 | 0.0000 | 3609 | **YES** |
| 2014 | 0.650 | 0.0000 | 3690 | **YES** |
| 2015 | 0.661 | 0.0000 | 3778 | **YES** |
| 2016 | 0.668 | 0.0000 | 3881 | **YES** |
| 2017 | 0.676 | 0.0000 | 3957 | **YES** |
| 2018 | 0.671 | 0.0000 | 4012 | **YES** |
| 2019 | 0.671 | 0.0000 | 4071 | **YES** |
| 2020 | 0.669 | 0.0000 | 4116 | **YES** |
| 2021 | 0.654 | 0.0000 | 5003 | **YES** |
| 2022 | 0.654 | 0.0000 | 5128 | **YES** |
| 2023 | 0.664 | 0.0000 | 5228 | **YES** |
| 2024 | 0.669 | 0.0000 | 5320 | **YES** |
| 2025 | 0.669 | 0.0000 | 5387 | **YES** |
| 2026 | 0.664 | 0.0000 | 5407 | **YES** |
| ALL (pooled) | 0.662 | 0.0000 | 74300 | **YES** |

**MAUP WARNING:** nested_lq rank correlation drops below the 0.7 threshold for at least one year -- per spatial-methods.md §7, any public PLR-vs-BZR comparison of nested_lq must flag MAUP instability prominently.

## 3. Bandwidth robustness

**Not re-run here.** `analysis/oa_bandwidth_sweep.py` (#274) already produced the definitive {500,1000,1500}m cross-bandwidth rank-correlation sweep for nested_lq (the only method with a Gaussian-weighted variant ever materialized in the warehouse at once -- see that script's DESIGN NOTE). Its result is at `docs/epic-g/G2-oa-bandwidth-sweep-findings.md` and is CITED, not duplicated, here. Sweeping the other eight methods (including density/percapita after #285) across bandwidth would need `int_poi_offering_advantage_methods` rebuilt 3x per method (a mechanical but nontrivial extension) -- explicitly deferred, not silently assumed equivalent to nested_lq's result.

## 4. Completeness-contamination gate (OA-D0 geo sign-off Condition C3)

Per-method Spearman rho between each area's year-over-year DELTA in domain-level `oa_value` and the city-wide year-over-year DELTA in `all_domains_stock_city` (the OSM-coverage-growth proxy `int_poi_status_dynamism.sql`'s own C5 sign-off already established -- reused verbatim, not a new proxy). Fail (badge `temporal-unsafe`, per OA-D0 C3 **NEVER delete the column**) at |rho| >= 0.3 and p < 0.05. **#285 extends this to all nine methods**, including density/percapita, using the identical query shape -- see deliverable 4 in the module docstring for why a PASS here still would not, by itself, authorize a live year-over-year delta on the OA-D7 page (a stricter, per-cell completeness flag is the page's own separate, unbuilt condition).

| Method | rho | p | n | Empirical result | Pre-registered expectation | Confirmed? |
|---|---|---|---|---|---|---|
| nested_lq | 0.046 | 0.0000 | 7830 | temporal-safe | safe | yes |
| global_lq | 0.046 | 0.0000 | 7830 | temporal-safe | safe | yes |
| log_lq | 0.041 | 0.0003 | 7830 | temporal-safe | safe | yes |
| share_diff | 0.049 | 0.0000 | 7830 | temporal-safe | safe | yes |
| shrunk_lq | 0.018 | 0.1171 | 7830 | temporal-safe | safe | yes |
| raw_share | 0.031 | 0.0067 | 7830 | temporal-safe | unsafe | **NO -- prediction contradicted** |
| zscore_slq | 0.014 | 0.2128 | 7830 | temporal-safe | unsafe | **NO -- prediction contradicted** |
| density | -0.010 | 0.3958 | 7830 | temporal-safe | unsafe | **NO -- prediction contradicted** |
| percapita | n/a | n/a | 540 | indeterminate -- only 1 distinct year-over-year transition available (Spearman undefined against a constant) | - | - |

**density: gate empirically PASSES** at the citywide, per-method level tested here (|rho| stays under 0.3) -- this CONTRADICTS the pre-registered `expected_temporal_safe=false` prediction, the same class of surprise `raw_share`/`zscore_slq` already produced in the original OA-D5 run. **This does not, by itself, authorize a live year-over-year delta on the OA-D7 page**: this is a citywide, per-method check, not the per-cell completeness flag that page's own carried-forward condition requires (see OA-D7 pass-2 header comment) -- a future ticket building that per-cell flag can cite this result as supportive evidence, not as a substitute for it.

**percapita: gate is INDETERMINATE** (only 1 distinct year-over-year transition available (Spearman undefined against a constant)) -- this is NOT a pass, and is treated as temporal-unsafe by default (no evidence of safety), consistent with the OA-D7 page's existing stock-only treatment, which does not change as a result of this run.

**Why percapita is indeterminate here, not merely `insufficient data`:** Berlin's exact-year EWR-to-POI join (`int_poi_offering_advantage_methods.sql` note 9, OA-D0 geo sign-off C10 -- no nearest-year fallback, and `lor_2021` area-vintage only) only has a literal year match for `snapshot_year` 2024 and 2025 in the current warehouse -- a single year-over-year transition, against which a Spearman correlation is mathematically undefined (there is no second transition to rank against the first). This is a genuine, narrow data-coverage limitation, not a bug in this gate -- a future EWR ingestion covering more reference years (closing the 2021-2023 gap visible in `int_ewr_socioeco`) would let this test actually run with multiple transitions.

**Hamburg cross-check (#312, #318):** see `docs/methodology/OA-D5-hamburg-addendum.md` -- a separate, hand-maintained file this document's own regeneration never touches (that separation is itself the #318 review fix: this Berlin-scoped doc is fully overwritten by every `uv run python analysis/d_oa_mode_comparison.py` run, so the Hamburg record cannot live as a hand-added section in here without being silently destroyed by the next routine refresh).

## 5. Golden validation (nested-LQ only)

nested_lq is the SOLE `golden_anchored` method (`seed_oa_calculation_methods.csv`). This is reused verbatim from `analysis/c_three_way_comparison.py`'s already-reviewed Run 1 (faithful `oa_mean` vs the 2018 golden `status_index`), not re-derived. The other eight methods, including density/percapita, are new calculation choices with no 2018 thesis precedent to validate against -- this is not a gap in this study, it is the correct scope (OA-D0 domain sign-off Condition E).

- Spearman(oa_mean, 2018 golden status_index): rho=0.148, p=0.0019, n=435 (reused verbatim from OA-C.1 #174/#261's Run 1).

## 6. Getis-Ord Gi* slot (#285 -- placeholder, not a computation)

Verified directly against `seed_oa_calculation_methods.csv` (not assumed): **no `getis_ord` row exists yet.** Getis-Ord Gi* hotspot clustering needs a Queen-contiguity spatial-weights matrix, not a plain join, and its ADR ([ADR-0025](https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0025-getis-ord-gistar-esda-mart-handoff.md)) remains status **Proposed** -- per #285's own framing, this slot is "gated on that slice existing," and it does not exist yet. This study does not force a Getis-Ord comparison in; a future method-registration ticket (ADR-0025 acceptance + the mart it authorizes) is the correct place to add it, at which point this script's `ALL_METHODS`/`ABSOLUTE_METHODS` lists (already query-driven from the seed CSV) will pick it up with no code change beyond whatever Getis-Ord-specific statistic that future ticket decides is appropriate (Gi* is a spatial-clustering statistic, not a rank value -- it may not even be a Spearman-comparable column, a design question left to that ticket, not pre-judged here).

## Summary — which mode answers which question

| Method | Question it answers | Reference point | Golden-anchored | Empirically temporal-safe |
|---|---|---|---|---|
| nested_lq | parent-relative over/under-representation (canonical) | parent-relative | yes (sole anchor) | yes |
| global_lq | city-relative over/under-representation | city-relative | no (new, ADR-0024) | yes |
| log_lq | symmetric (log-centred) parent-relative representation | parent-relative | no (new, ADR-0024) | yes |
| share_diff | parent-relative representation, percentage-point unit | parent-relative | no (new, ADR-0024) | yes |
| shrunk_lq | parent-relative representation, small-base-damped | parent-relative | no (new, ADR-0024) | yes |
| raw_share | within-group composition, no city normalization | parent-relative | no (new, ADR-0024) | yes |
| zscore_slq | is the representation big relative to sample size? | parent-relative | no (new, ADR-0024) | yes |
| density | provision/centrality -- POIs per km2, NOT a location quotient | **absolute** | no (new, ADR-0024) | yes |
| percapita | provision/exposure -- POIs per 1,000 residents, NOT a location quotient | **absolute** | no (new, ADR-0024) | n/a |

**Never blend (ADR-0017/ADR-0024 D3):** this table is a navigation aid, not a recommendation to pick one column as "the" OA -- each row answers a genuinely different question and no combined score is computed anywhere in this pipeline. The two **absolute** rows (density, percapita) are a genuinely separate class from the seven relative-family rows above them: they may be rank-correlated for information (§1b) but must never share a choropleth colour scale, legend, or numeric axis with the relative family.

