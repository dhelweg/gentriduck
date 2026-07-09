# Geo-Data-Scientist Sign-off: OA-A.4 (#168) — Rework `e1_regressions.py` H1–H3c to OA predictors

- **Scope:** OA-A.4 #168 — swap `analysis/e1_regressions.py`'s raw POI-count / C5-dynamism
  predictors for Offering Advantage (OA) location-quotient predictors (`oa_*`/`prev_oa_*`
  construct), full H1–H3c rerun, PLR scale (thesis's own grain).
- **Operationalizes:** thesis pp. 55–56, 91 (H1/H1b/H2/H3a-c); `reference/system/80_result_h1_plr.sql`,
  `80_result_h2_plr.sql` (thesis's own OA-bearing result views); `int_poi_offering_advantage`
  (#166, ADR-0017); geo-DS Condition C-3 from `docs/epic-b/A3-oa-validation-geo-signoff.md` §5.
- **Reviewer:** geo-data-scientist
- **Date:** 2026-07-09
- **Branch:** feature/168-oa-a4-e1-regressions → develop
- **Deliverables reviewed:** `analysis/e1_regressions.py` (`load_oa_category_panel`,
  `load_h1_h2_data`, `load_lead_lag_data`, `test_h1`/`test_h2`/`test_h3` OA rows),
  `docs/epic-e/E1-regression-findings.md` (regenerated).
- **Verdict:** PASS

---

## 1. Predictor construction is correctly grounded

`load_oa_category_panel` pulls from `int_poi_offering_advantage` (`weight_variant='standard'`,
`methodology_variant='faithful'`) and correctly follows **Condition C-3** that I recorded on
A.3 (#167): the H1/H2/H3 "basket" tests use **domain-level** OA (`oa_domain`) for the four
domains the thesis's own upscaling-proxy categories fall under (Gastronomy: cafe/restaurant/
fast-food; Entertainment: bar/nightlife; Services: hairdresser/beauty; Retail: clothing),
falling back to **category-level** OA only for H1b's fast-food-specific test — exactly the
exception C-3 named. `MAX(oa_domain) FILTER (...)` correctly exploits that `oa_domain` is
constant across every (category, type) row sharing a domain (int_poi_offering_advantage.sql's
own window-function construction), so this collapses the sparse per-leaf rows to one value per
domain without double-counting or needing a weighted aggregate.

I re-ran the script before and after this fix (the implementation's first draft used
category-level OA for the whole basket) and the domain-level swap **materially improved**
directional agreement — e.g. H2 (2021–2025 panel) flips from FAIL (positive rho, wrong
direction) to PASS (negative rho, correct direction) at both k=1 and k=2 once domain-level
replaces category-level. This is exactly the C-3 prediction (coarser leaves are less
noise-dominated) borne out empirically, not just theoretically — good confirmation the
condition was correctly specified and correctly applied here.

`oa_mean` (H1) and `oa_mean_t`/`delta_oa_mean_t` (H2/H3) are legitimate scalar aggregates: a
single "OA of everything" is definitionally ~1 (compositional shares sum to the whole), so
there is no natural single-OA analogue of `total_poi_count` — the unweighted mean of the four
upscaling-relevant domains is the correct, literal, non-invented substitute (matches what the
H1 raw-count basket already aggregated across the same named categories).

## 2. H2's "prior OA" mapping to thesis `prev_oa_*` is correct

The thesis's own H2 result view (`80_result_h2_plr.sql`) selects `prev_oa_*` (an *earlier*
edition's OA) predicting the *current* edition's projected status class. `oa_mean_t` at
`edition_t` predicting `delta_status_ordinal` (edition_t → edition_tk) plays exactly that
"prior OA relative to the future status reading" role — the mapping is not a loose analogy, it
is the same temporal relationship the thesis's own view encodes (current predictor, later
outcome).

## 3. H3a-c OA-change tests run alongside, not instead of, the C5-corrected dynamism tests

Correct scoping decision: `delta_dynamism_t` already has its own geo-DS sign-off
(`docs/epic-c/C5-geo-signoff.md`) specifically addressing the OSM-coverage-growth artifact.
`delta_oa_mean_t` is a compositional (location-quotient) change measure — being a ratio against
the same-period city-wide total, it structurally cancels a common city-wide coverage-growth
trend in a similar way to the C5 correction, but via a different, independently-justifiable
mechanism (ratio normalization vs. explicit trend-correction). Reporting both, rather than
replacing one with the other, is the right call: it turns H3a-c into a genuine three-way
robustness check (raw dynamism vs. OA-change) rather than silently swapping out a
previously-signed-off predictor.

## 4. Scope boundary (BZR/Bezirk, EWR) is correctly flagged, not silently dropped

`int_poi_offering_advantage` is built from `fct_poi_development`/`int_osm_poi_plr_weighted`,
both PLR-grain; there is no BZR/Bezirk or EWR-vintage OA table to join against without a new
aggregation model. The findings doc explicitly documents this as a scope boundary (Epic B
directional-divergence, not a defect) rather than papering over it — correct, and consistent
with how A.2/A.3 handled comparable grain gaps.

## 5. Results are directionally mixed — expected, and correctly reported as such

Domain-level OA directional agreement is real but partial: the MSS 2021–2025 panel (the best
ground truth) shows 6/8 OA-tagged H2/H3 rows matching thesis-expected direction (H2 k=1,k=2 and
H3a/H3b at both k both PASS; H3c — simultaneous co-movement, the thesis's own "unclear" result —
FAILs at both k, i.e. the *positive* co-movement direction, consistent with H3c never having a
confirmed direction in the thesis either). H1's OA basket (2018 cross-section, n=92 due to the
sparse OA representation) does not reach significance and the sign flips versus the raw-count
H1 test; H1b (fast-food, category-level) replicates the raw-count H1b finding cleanly (same
direction, stronger significance, rho=0.42 vs 0.14). The pre-2021 (2015–2019, thesis-era
boundary) panel is weaker across the board for both raw and OA predictors alike — consistent
with the much smaller/older OSM coverage in that era already documented by prior tickets, not a
new OA-specific problem. None of this is a red flag: it is exactly the kind of partial,
hypothesis-by-hypothesis directional agreement the Epic B framing anticipates (CLAUDE.md), and
the findings doc reports it plainly rather than cherry-picking.

## Verdict

**PASS.** The OA predictor construction (domain-level primary, category-level fast-food
exception per my own Condition C-3), the H2 prior-OA mapping, and the H3 dual-reporting
alongside the C5-signed-off dynamism tests are all spatial-statistically sound and correctly
grounded in the thesis's own OA-bearing result views. No blocking conditions.
