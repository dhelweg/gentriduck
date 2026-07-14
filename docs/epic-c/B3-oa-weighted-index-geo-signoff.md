# Geo-Data-Scientist Sign-off: OA-B.3 (#172) — weighted offering-advantage → gentrification_index

- **Scope:** OA-B.3 #172 — `transform/models/intermediate/int_poi_amenity_weighted_base.sql`,
  `int_poi_amenity_weighted_base_2021.sql`, `int_poi_status_dynamism_improved.sql`; the
  `status_score_improved`/`dynamism_score_improved`/`disinvestment_score_improved` columns wired
  into `int_gentrification_ts.sql` (Branch A / lor_2021 only); the `variant='improved'` block added
  to `transform/models/marts/gentrification_index.sql`; `transform/models/intermediate/schema.yml`
  and `transform/models/marts/schema.yml` documentation/contract updates.
- **Operationalizes:** ADR-0017 D2.1 ("weight first, ratio/aggregate last" idiom, here applied to the
  causal-tier weight from OA-B.1 #170 rather than a spatial kernel weight), D-2 (Vacancy kept as a
  separate, oppositely-signed series, never summed into the amenity composite), D3/D4
  (`methodology_variant` discriminator, faithful/improved never blended); the C5 share-normalization
  control (`docs/epic-c/C5-geo-signoff.md`) reused unmodified on the weighted composite;
  `docs/planning/oa-revival-and-methodology-improvement.md` §"Two workstreams"/§"Experimental design".
- **Reviewer:** geo-data-scientist
- **Date:** 2026-07-09
- **Branch:** feature/172-oa-b3-weighted-index → develop
- **Verdict:** PASS

---

## 1. Summary

1. **The tier-weighting construct correctly reuses the established "weight first" idiom.** Rather than
   building a new composite methodology, `int_poi_amenity_weighted_base` applies
   `seed_poi_offering_relevance`'s type-level `offering_weight` (OA-B.1/B.2, #170/#171) to
   `fct_poi_development.poi_count` **before** any aggregation — the same "weight the stock, then form
   the statistic" order ADR-0017 D2.1 already established for the Gaussian spatial kernel in
   `int_osm_poi_plr_weighted`. This is the right structural choice: it keeps the causal-tier curation as
   a pre-aggregation input weight rather than a post-hoc score adjustment, so it composes correctly with
   the existing C5 share-normalization (§2 below) without re-deriving that control.
2. **Vacancy is correctly excluded from the amenity composite and tracked as its own signal.**
   `amenity_weighted_count` explicitly excludes `poi_domain_h = 'Vacancy'`
   (`case when poi_domain_h != 'Vacancy' then weighted_count else 0 end`); `vacancy_weighted_count`
   is accumulated separately and surfaces as its own `disinvestment_score_improved` column, never
   combined with `status_score_improved`/`dynamism_score_improved`. This is the one hard rule
   ADR-0017 D-2 and the seed's own header row for `domain=Vacancy` require (Smith 1979 rent-gap:
   vacancy is the *opposite pole* of amenity-offering, not a diminished version of it), and I confirmed
   by reading both new model files that the two aggregates are computed from disjoint `CASE WHEN`
   branches, not a signed-sum — a structural, not merely documented, separation.
3. **The C5 share-normalization control is correctly re-applied to the weighted composite, not
   bypassed.** `int_poi_status_dynamism_improved` computes `dynamism_score_improved` from
   `amenity_share_yoy_change` (the YoY change in the PLR's *share* of the city-wide weighted total),
   exactly mirroring `int_poi_status_dynamism`'s C5-approved treatment of `share_yoy_change` — this
   was the specific defect the C4 geo-DS sign-off required fixing before any dynamism-style score
   could be published (`docs/epic-c/C5-geo-signoff.md`), and the weighted variant does not
   reintroduce the raw-count-delta version of that bug.
4. **The lor_pre2021→lor_2021 crosswalk is correctly re-derived for the weighted metric, not assumed
   from the unweighted model.** `int_poi_amenity_weighted_base_2021` re-applies
   `seed_lor_crosswalk_2006_to_2021` directly to `amenity_weighted_count`/`vacancy_weighted_count`
   (both still extensive/count-like quantities after tier-weighting, so `count * area-apportionment
   weight` remains exact, same as the unweighted model's treatment of `total_poi_count`) rather than
   incorrectly reusing `int_poi_share_base_2021`'s already-remapped *unweighted* total — a subtle
   but important distinction I checked line-by-line, since conflating the two crosswalk instances
   would have silently mixed an unweighted city total into a weighted share denominator.
5. **The one unmapped taxonomy leaf degrades safely, not silently promotes.** I ran the anti-join
   between `fct_poi_development` and `seed_poi_offering_relevance` (`level='type'`) directly against
   the built warehouse: exactly one leaf (`economy`/`workspace`/`coworking_space`) has no seed match
   (a legacy lower-snake-case label not present in the Title-Case seed, pre-existing taxonomy drift
   unrelated to this ticket) and `coalesce(w.offering_weight, 0)` correctly defaults it to
   tier-0/dropped rather than raising or silently including it at full weight — the conservative,
   documented behaviour the model header specifies. This is a pre-existing, out-of-scope data-quality
   gap (flagged as a risk below), not a defect introduced here.
6. **Verified against a live, green `dbt build`.** `uv run poe build`: 653 pass / 6 pre-existing
   unrelated warnings / 0 errors (confirmed twice, before and after `poe fmt`/`poe lint`). Spot-queried
   `int_poi_status_dynamism_improved` (10,197 rows) and `gentrification_index` (`variant='improved'`,
   1,626 rows, `status_index` range approximately [-0.70, 8.88] as expected for a right-skewed
   count-based z-score with a handful of very POI-dense PLRs, mean ≈ 0 as expected for a per-year
   z-score).

Verdict: **PASS.**

---

## 2. Methodological assessment

### 2.1 The `data_corr` calibration advisory from B2 is NOT implemented here — accepted as an
open advisory, not a blocking condition

The B2 geo-DS sign-off (`docs/epic-c/B2-oa-relevance-validation-geo-signoff.md` §3) recommended that
"OA-B.3 (#172) treat `data_corr` as a continuous calibration signal ... rather than thresholding on
p < 0.05 directly." This implementation uses the pure theory tier weight (`offering_weight`) only;
`data_corr` is not consulted anywhere in the new models. I do **not** block on this: B2's own
recommendation was explicitly advisory, not a scope requirement for B.3, and `offering_weight`
already fully encodes the causality-first tier rule (ADR-0017 D3) which is B.3's actual mandate per
`docs/planning/oa-revival-and-methodology-improvement.md`. Folding in a `data_corr`-based shrink
factor is a legitimate refinement but changes the weighting formula itself (methodology-bearing on
its own terms) and is better scoped as a follow-up ticket than bundled into this integration. I
re-flag it below as a carried-forward advisory for OA-C.1 (#174), which is where the faithful vs.
improved ablation comparison will actually be able to test whether `data_corr`-calibration would have
mattered.

### 2.2 Scope restriction to Berlin lor_2021 (2021+) is correct and clearly bounded

The improved predictor is wired into `int_gentrification_ts` Branch A only (Berlin, lor_2021,
2021-2025); Branch B (lor_pre2021, thesis-era 2015/2017/2019) and Branch C (Hamburg) carry explicit
`NULL` placeholders with inline rationale. This is the right call given time/scope: `
seed_poi_offering_relevance`'s tier weights and citations were authored against Berlin's *current*
taxonomy and literature review (OA-B.1/B.2), not re-derived for the thesis-era 448-PLR system or
Hamburg's OSM taxonomy — extending either would be its own methodology-bearing exercise, not a
mechanical wiring step. The `NULL`s are structural (never backfilled or approximated across the
vintage/city boundary), consistent with the existing "no cross-vintage/cross-city comparison" rule
enforced elsewhere in this model.

### 2.3 `gentrification_index` variant='improved' correctly does not recompute the D1/D2 MSS outcome

The new mart block reuses `status_index`/`dynamism_index` column *slots* to carry
`status_score_improved`/`dynamism_score_improved` (a continuous curated **predictor** z-score) rather
than inventing a new outcome or re-deriving a typology stage from it — `status_class`/
`dynamism_class`/`*_class_bi` are explicitly `NULL` for this variant, and the schema.yml documents
that these values are NOT on the same scale as the `live_data` MSS ordinal and must not be compared
across variants. This correctly keeps D3 (predictor) and D1/D2 (outcome) separated per ADR-0008/R-A1
— the exact conflation R-A1 (#64) was created to fix is not reintroduced here.

### 2.4 `disinvestment_score_improved` z-score stability at low vacancy counts (advisory)

Like every z-score column in this pipeline, `disinvestment_score_improved` returns `NULL` when a
given year's cross-PLR standard deviation is zero or undefined (`NULLIF(STDDEV(...), 0)` guard,
confirmed present) — I observed `NaN`/`NULL` values in the earliest snapshot years in a spot query,
consistent with sparse early-year Vacancy-domain OSM coverage, not a computation defect. Not blocking;
same known limitation as the faithful model's early-year `dynamism_score`.

---

## 3. Conditions

None blocking. One advisory carried forward:

- **Advisory (OA-C.1 #174):** when running the faithful-vs-improved three-way comparison, test whether
  incorporating `data_corr` as a continuous calibration shrink (B2's original recommendation, §2.1)
  measurably changes the improved variant's predictive performance versus the pure theory-tier weight
  used here.

---

## 4. Risks

1. One taxonomy leaf (`economy`/`workspace`/`coworking_space`) has no matching
   `seed_poi_offering_relevance` row and defaults to tier-0/weight-0 (§1.5) — a pre-existing taxonomy
   labelling drift, not introduced by this ticket, but should be reconciled (either a seed row added
   or the harmonization mapping aligned) before OA-C.1's comparison treats the improved composite as
   complete.
2. `data_corr` calibration (§2.1) is not yet incorporated — the improved variant is theory-tier-only
   for now; B2's advisory remains open.
3. The improved predictor is Berlin lor_2021-only (§2.2); any future extension to lor_pre2021 or
   Hamburg needs its own tier-weight review, not a mechanical crosswalk reuse.

---

## 5. Certification

The tier-weighting construct correctly reuses the established "weight first" idiom from ADR-0017
D2.1, Vacancy is structurally (not just documentationally) kept out of the amenity composite per D-2,
the C5 share-normalization control is correctly re-derived rather than bypassed, and the
lor_pre2021→lor_2021 crosswalk is correctly re-applied to the weighted metric rather than reusing the
unweighted model's already-remapped total. The one unmapped taxonomy leaf degrades safely (tier-0,
not silently promoted). Verified on a live, green `dbt build` (653 pass / 0 errors / 6 pre-existing
unrelated warnings).

**The PM MAY integrate this into `develop`**, pending the independent `gentrification-domain-expert`
PASS also required by the R-C1 dual gate.

```json
{
  "verdict": "pass",
  "rationale": "int_poi_amenity_weighted_base/_2021 correctly apply seed_poi_offering_relevance's causal-tier offering_weight to fct_poi_development stock BEFORE aggregation, reusing ADR-0017 D2.1's established 'weight first' idiom (previously used only for the Gaussian spatial kernel). Vacancy is structurally excluded from the amenity composite (disjoint CASE WHEN branches, not a signed sum) and surfaces as its own disinvestment_score_improved column, satisfying ADR-0017 D-2. The C5 share-normalization control is correctly re-derived for the weighted composite (amenity_share_yoy_change mirrors the faithful model's share_yoy_change treatment) rather than reverting to a raw-count-delta computation. The lor_pre2021->lor_2021 crosswalk is independently re-applied to the weighted metric (not borrowed from the unweighted model's already-remapped total), verified line-by-line. int_gentrification_ts wiring is correctly scoped to Berlin lor_2021 only with explicit NULL placeholders (not silent backfill) for lor_pre2021/Hamburg. The gentrification_index 'improved' variant correctly reuses status_index/dynamism_index column slots for a continuous predictor score without recomputing the D1/D2 MSS outcome, keeping status_class/dynamism_class NULL and documented as non-comparable across variants -- the predictor/outcome conflation R-A1 fixed is not reintroduced. Verified on a live dbt build: 653 pass / 0 errors / 6 pre-existing unrelated warnings; poe lint clean. One taxonomy leaf (coworking_space) lacks a seed match and correctly defaults to weight 0 rather than being silently promoted -- a pre-existing, out-of-scope taxonomy-drift gap, not a defect of this ticket.",
  "risks": [
    "One taxonomy leaf (economy/workspace/coworking_space) has no seed_poi_offering_relevance match and defaults to tier-0/weight-0 -- pre-existing taxonomy drift that should be reconciled before OA-C.1 treats the improved composite as complete",
    "B2's data_corr continuous-calibration recommendation is not yet incorporated -- the improved variant is theory-tier-only",
    "The improved predictor is Berlin lor_2021-only; lor_pre2021/Hamburg extension needs its own tier-weight review, not a mechanical crosswalk reuse **(Follow-up now tracked: #261 (OA-ablation) — see `docs/planning/deferred-work-audit-2026-07/README.md`.)**"
  ],
  "recommendations": [
    "OA-C.1 (#174): test whether data_corr-based calibration shrink measurably changes the improved variant's predictive performance vs. the pure theory-tier weight used here",
    "Reconcile the coworking_space taxonomy-label mismatch (seed uses Title Case 'Other/Hipster/Coworking Space'; fct_poi_development carries lower-snake-case 'economy/workspace/coworking_space' for this one leaf) before treating the improved composite as taxonomy-complete"
  ]
}
```

---

## Final Verdict

Verdict: PASS
