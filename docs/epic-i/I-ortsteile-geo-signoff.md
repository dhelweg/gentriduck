# Geo-Data-Scientist Sign-off: I-ortsteile (#269) — PLR↔Ortsteil area-overlap crosswalk + dominant-assignment rollups

- **Scope:** I-ortsteile #269 — branch `feature/269-ortsteile`, commit `2d5da15d`
  - `transform/models/intermediate/int_berlin_plr_ortsteil_overlap.sql` (new area-overlap crosswalk)
  - `transform/models/marts/mart_area_demographics.sql` (new `ortsteil` rollup level)
  - `transform/models/marts/mart_ortsteil_plr_stage_mix.sql` (new; child-PLR typology-stage distribution)
  - schema/data tests: `test_ortsteil_overlap_{full_coverage,one_dominant_per_plr,ortsteil_never_dominant,weight_conservation}.sql`
- **Reviewer:** geo-data-scientist (spatial/statistical methodology gate, R-C1)
- **Gate:** #269 ticket gate is geo-DS sign-off only on the crosswalk/rollup rules — no domain-expert gate required (geometry/crosswalk question, not gentrification theory).
- **Date:** 2026-07-17
- **Verdict:** PASS

---

## Independent verification (live warehouse `data/gentriduck.duckdb`, not trusting prior review)

| Claim | My independent check | Result |
|---|---|---|
| 631 total crosswalk rows | `count(*)` | **631** — confirmed |
| 542 distinct PLRs, 97 distinct Ortsteile | `count(distinct ...)` | **542 / 97** — confirmed |
| 82 straddling PLRs (>1 non-trivial Ortsteil) | `count(distinct plr) where n_ortsteil_overlaps>1` | **82** (15.1%) — confirmed |
| Dominant confidence 43.6%–100%, avg 97.9% | `min/avg/max(overlap_frac_of_plr) where is_dominant` | **0.436 / 0.979 / 1.000** — confirmed |
| Per-PLR overlap-frac sum 0.994–1.000 | grouped `sum(overlap_frac_of_plr)` | **0.9936 / 1.0000** — confirmed |
| Exactly 2 never-dominant Ortsteile | anti-join vs `stg_berlin_ortsteil` | **0608 Schlachtensee, 1106 Malchow** — confirmed |
| Downstream coverage | distinct ortsteile in `mart_area_demographics`/`mart_ortsteil_plr_stage_mix` | **95 of 97** — the 2 enclaves absent, as expected |
| Low-confidence tail | dominant rows <0.6 / <0.7 / <0.8 | **6 / 16 / 24** (of 542) |
| Aggregate misattribution | non-dominant weight ÷ total weight | **2.11%** of all PLR area-weight |

## Methodology assessment

**(1) Dominant vs fractional apportionment — the right call here.** The data-engineer's core reasoning
holds: a PLR's `residents_total`/`typology_stage` is a whole-unit figure the Amt für Statistik/Senate
publish *for that polygon*, not a hidden splittable substrate. Fractional apportionment would require a
uniform-within-PLR density assumption that is unvalidated (and demonstrably wrong for e.g. half-forested
PLRs) and would manufacture false precision with no sub-PLR ground truth to check against — the correct
distinction from `int_berlin_brw_plr`/`int_berlin_ewr_plr2021`, where the split *is* the best estimate of a
real unobserved sub-polygon quantity. The theoretical merit of fractional weighting for population-weighted
*sums* on ~50/50 splits is real but empirically immaterial here: mean confidence is 97.9%, only 6 PLRs
(1.1%) fall below 60%, and total misattributed area-weight is **2.1%**. Winner-take-all bias is bounded and
small. Crucially, the model exposes the **full** weight table plus `overlap_frac_of_plr`, so a future
consumer that genuinely needs population-weighted apportionment (or wants to flag low-confidence straddlers)
can do so without a schema change — the dominant flag is a documented convenience layer, not a lossy collapse.

**(2) Sliver guard is defensible.** Fraction-only 0.5%-of-PLR-area, with the `int_berlin_brw_plr`
absolute-OR-fraction guard deliberately rejected. The reasoning is scale-correct: PLR and Ortsteil are both
large administrative polygons independently digitized against the same underlying boundary, so an absolute
floor would retain hairline digitization slivers on large (forest) PLRs. The `weight_conservation` test
(per-PLR frac-sum in [0.95, 1.02], observed 0.994–1.000) is a genuine two-sided guard: it would catch both
real area dropped by an over-aggressive guard (sum ≪1) and double-counted overlap (sum >1). No evidence the
threshold discards meaningful overlaps.

**(3) The 2 never-dominant enclaves are a genuine geographic fact, WARN is correct.** Schlachtensee and
Malchow are small Ortsteile whose area is split across PLRs where a larger neighbour always holds the
majority share — a real consequence of dominant assignment, not a bug. WARN (not silent drop, not ERROR) is
the right severity: the condition is expected and disclosed, but it is not a build-breaking data error. The
test header explicitly warns against silent re-baselining if the set grows. **This is my one substantive
condition:** these two Ortsteile currently produce *no* rows in either downstream mart (verified: 95/97), so
their profile pages would render empty/misleading. This is already flagged in the test header for the
web-engineer follow-up; I make it an explicit non-blocking condition below rather than a blocker, since it is
a web-presentation obligation, not a crosswalk-correctness defect.

**(4) "No re-scored index" constraint genuinely respected.** `mart_ortsteil_plr_stage_mix` emits only
`count(*) as n_plr` grouped by `typology_stage` — a distribution of child-PLR stages, no synthetic
Ortsteil-grain point-value index. `mart_area_demographics`'s ortsteil rollup uses the same
extensive-sum/intensive-population-weighted-mean pattern already applied to bzr/pgr/bezirk — no index
re-scoring. Consistent with the #247/#267 precedent against coarse-grain point indices.

## Untrusted-input note (SEC-3)

This review relied only on maintainer-authored SPEC, repo code, and the live warehouse. No web-fetched or
non-maintainer content informed any decision.

---

## Verdict

```json
{
  "verdict": "pass",
  "scope": "I-ortsteile #269 — int_berlin_plr_ortsteil_overlap dominant-assignment crosswalk + mart_area_demographics ortsteil rollup + mart_ortsteil_plr_stage_mix, branch feature/269-ortsteile, commit 2d5da15d",
  "rationale": "Independently re-verified all quantitative claims against the live warehouse (631 rows, 542 PLRs, 97 Ortsteile, 82 straddlers, dominant confidence 0.436-0.979-1.000, per-PLR frac-sum 0.994-1.000, 2 never-dominant enclaves 0608/1106, 95/97 Ortsteile appearing downstream). Dominant (largest-share) assignment is the methodologically correct choice: PLR EWR/typology figures are whole-unit published quantities with no sub-PLR ground truth, so fractional apportionment would fabricate precision under an unvalidated uniform-density assumption; the theoretical accuracy edge of fractional weighting on ~50/50 splits is empirically immaterial (mean confidence 97.9%, only 6 PLRs <60%, total misattributed area-weight 2.1%), and the full weight table + overlap_frac_of_plr are exposed so any future apportioning consumer is unblocked without a schema change. The fraction-only 0.5% sliver guard is scale-appropriate for two large independently-digitized administrative tessellations and is bracketed by a two-sided weight-conservation test. The 2 never-dominant Ortsteile are a genuine dominant-assignment geographic consequence, correctly surfaced at WARN. The no-re-scored-index constraint is genuinely respected (stage_mix emits only a per-stage PLR count; demographics uses the existing extensive-sum/intensive-weighted-mean rollup).",
  "risks": [
    "Winner-take-all bias exists for the low-confidence tail (6 PLRs <60%, 24 <80% dominant share); their full population/typology rolls into a single Ortsteil though a meaningful minority is geographically elsewhere. Bounded (2.1% aggregate) but must not be presented as exact — the exposed overlap_frac_of_plr is the honesty mechanism.",
    "Schlachtensee (0608) and Malchow (1106) produce zero downstream rows under dominant assignment; their Ortsteil profile pages would be empty without explicit handling.",
    "Crosswalk is lor_2021-only and single current-snapshot Ortsteil vintage; a historical Ortsteil view is out of scope and would need its own decision (flagged as open question in the model header)."
  ],
  "recommendations": [
    "CONDITION (non-blocking on develop-integration; blocking on the public Ortsteil page render, Epic G/web-engineer): the web layer must explicitly disclose that Schlachtensee and Malchow have no constituent-PLR rollup under this method rather than rendering a blank/misleading page.",
    "Non-blocking: if an Ortsteil profile ever needs population-accurate figures for a high-straddle Ortsteil, use the already-exposed overlap_frac_of_plr to compute a population-apportioned variant rather than switching the default rollup off dominant.",
    "Non-blocking: keep the never-dominant WARN test's disclosure discipline — if the set grows beyond 2, investigate a WFS edition change or method over-coarseness before re-baselining."
  ]
}
```

**Verdict: PASS** — dominant assignment is the defensible choice for whole-unit PLR rollups, the sliver
guard is scale-appropriate and two-sided-tested, the 2 enclave Ortsteile are a disclosed geographic fact
correctly handled at WARN, and the no-re-scored-index constraint holds. All reviewer numbers independently
re-verified on the live warehouse. May be integrated into `develop`. The one carried condition —
disclosing the 2 empty-enclave Ortsteil pages — binds on the web-engineer render, not on this data layer.
