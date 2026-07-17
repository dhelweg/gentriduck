# OA-D5 (#240): Cross-Mode Comparison Study

Generated 2026-07-17 12:49 UTC by `analysis/d_oa_mode_comparison.py`. Berlin only, `weight_variant='standard'`, `methodology_variant='faithful'` throughout (the bandwidth-free, hard point-in-polygon, uncurated variant every other OA analysis script anchors on -- oa_bandwidth_sweep.py's own precedent). ADR-0024 D3 never-blend: every figure below is reported per-method, never averaged/combined across methods.

## 1. Cross-mode Spearman rank correlation

Pairwise rank correlation between the seven calculation methods, pooled across all years/areas, per taxonomy level. Answers: *how differently do the seven modes actually rank the same areas?*

### Domain level

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

### Category level

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

### Type level

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

## 2. Per-mode MAUP (PLR-vs-BZR scale sensitivity)

**Scope boundary (read first):** `int_poi_offering_advantage_arealevel` (OA-D2) only rolled up `nested_lq` (see that model's own header, "Deferred to later D-spine tickets... D3: calculation-method columns") -- the other six methods have NEVER been rolled up through `area_level`, so their MAUP behaviour is genuinely unknown, not merely unreported here. Extending the area_level roll-up to all seven methods is an OA-D2/D3 cross-product follow-up, explicitly out of this ticket's scope. This section checks nested_lq's own scale-sensitivity only (spatial-methods.md §7, r>0.7 gate, same method `analysis/a6_maup.py` already applies to dynamism_score).

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

**Not re-run here.** `analysis/oa_bandwidth_sweep.py` (#274) already produced the definitive {500,1000,1500}m cross-bandwidth rank-correlation sweep for nested_lq (the only method with a Gaussian-weighted variant ever materialized in the warehouse at once -- see that script's DESIGN NOTE). Its result is at `docs/epic-g/G2-oa-bandwidth-sweep-findings.md` and is CITED, not duplicated, here. Sweeping the other six methods across bandwidth would need `int_poi_offering_advantage_methods` rebuilt 3x per method (a mechanical but nontrivial extension) -- explicitly deferred, not silently assumed equivalent to nested_lq's result.

## 4. Completeness-contamination gate (OA-D0 geo sign-off Condition C3)

Per-method Spearman rho between each area's year-over-year DELTA in domain-level `oa_value` and the city-wide year-over-year DELTA in `all_domains_stock_city` (the OSM-coverage-growth proxy `int_poi_status_dynamism.sql`'s own C5 sign-off already established -- reused verbatim, not a new proxy). Fail (badge `temporal-unsafe`, per OA-D0 C3 **NEVER delete the column**) at |rho| >= 0.3 and p < 0.05.

| Method | rho | p | n | Empirical result | Pre-registered expectation | Confirmed? |
|---|---|---|---|---|---|---|
| nested_lq | 0.040 | 0.0004 | 7830 | temporal-safe | safe | yes |
| global_lq | 0.040 | 0.0004 | 7830 | temporal-safe | safe | yes |
| log_lq | 0.038 | 0.0008 | 7830 | temporal-safe | safe | yes |
| share_diff | 0.052 | 0.0000 | 7830 | temporal-safe | safe | yes |
| shrunk_lq | 0.014 | 0.2115 | 7830 | temporal-safe | safe | yes |
| raw_share | 0.050 | 0.0000 | 7830 | temporal-safe | unsafe | **NO -- prediction contradicted** |
| zscore_slq | 0.016 | 0.1664 | 7830 | temporal-safe | unsafe | **NO -- prediction contradicted** |

## 5. Golden validation (nested-LQ only)

nested_lq is the SOLE `golden_anchored` method (`seed_oa_calculation_methods.csv`). This is reused verbatim from `analysis/c_three_way_comparison.py`'s already-reviewed Run 1 (faithful `oa_mean` vs the 2018 golden `status_index`), not re-derived. The other six methods are ADR-0024's NEW calculation choices with no 2018 thesis precedent to validate against -- this is not a gap in this study, it is the correct scope (OA-D0 domain sign-off Condition E).

- Spearman(oa_mean, 2018 golden status_index): rho=0.148, p=0.0019, n=435 (reused verbatim from OA-C.1 #174/#261's Run 1).

## Summary — which mode answers which question

| Method | Question it answers | Unit | Golden-anchored | Empirically temporal-safe |
|---|---|---|---|---|
| nested_lq | parent-relative over/under-representation (canonical) | - | yes (sole anchor) | yes |
| global_lq | city-relative over/under-representation | - | no (new, ADR-0024) | yes |
| log_lq | symmetric (log-centred) parent-relative representation | - | no (new, ADR-0024) | yes |
| share_diff | parent-relative representation, percentage-point unit | - | no (new, ADR-0024) | yes |
| shrunk_lq | parent-relative representation, small-base-damped | - | no (new, ADR-0024) | yes |
| raw_share | within-group composition, no city normalization | - | no (new, ADR-0024) | yes |
| zscore_slq | is the representation big relative to sample size? | - | no (new, ADR-0024) | yes |

**Never blend (ADR-0024 D3):** this table is a navigation aid, not a recommendation to pick one column as "the" OA -- each row answers a genuinely different question and no combined score is computed anywhere in this pipeline.

