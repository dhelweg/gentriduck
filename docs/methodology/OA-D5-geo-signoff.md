# OA-D5 (#240, ADR-0024) — geo-data-scientist sign-off

**Verdict: PASS**

- **Gate:** R-C1 dual methodology gate, geo/statistical-fidelity half (pairs with `OA-D5-domain-signoff.md`).
- **Artifact under review:** `analysis/d_oa_mode_comparison.py`,
  `docs/methodology/OA-D5-mode-comparison-findings.md` (branch `feature/240-oa-d5-mode-comparison`).
- **Reviewer:** geo-data-scientist.
- **Date:** 2026-07-17.
- **Scope reviewed against:** OA-D0 geo sign-off (`docs/methodology/OA-D0-geo-signoff.md`)
  Conditions C1–C10, and the #240 D5 acceptance criterion ("cross-mode Spearman, per-mode MAUP +
  bandwidth + completeness-contamination gates, golden validation of nested-LQ only").

## Summary judgement

Conforms. This is the comparison study the D-spine's D2/D3/D3b/D4 tickets built the ingredients
for. Each of the four required checks is either genuinely run against the live warehouse or
honestly disclosed as deferred with a specific, non-hand-wavy reason — no check is silently skipped
or mocked.

## Checks performed

1. **Cross-mode Spearman correlation (deliverable 1):** verified the reported `rho=1.000` between
   `nested_lq` and `global_lq` at domain level is not merely a high correlation but an exact
   algebraic identity — spot-checked directly against the live warehouse
   (`max(|oa_domain_nested_lq - oa_domain_global_lq|) = 0.0` over 500k+ rows), confirming
   `int_poi_offering_advantage_methods.sql` header note 2's claim empirically, not just citing it.
   `log_lq`'s rho=1.000 at every level is the expected Spearman-invariance-under-monotonic-transform
   result (correct math check, reported as such in the findings doc, not oversold as a novel
   finding). The category/type-level divergence between `nested_lq` and `global_lq` (rho 0.63–0.76)
   is the real substantive result — parent-relative and city-relative genuinely diverge once you
   leave the domain level, exactly the "answer different questions" premise #240's issue body opens
   with.
2. **MAUP scope honesty (deliverable 2):** correctly limits the PLR-vs-BZR check to `nested_lq`
   only, with an explicit, verifiable reason (`int_poi_offering_advantage_arealevel` — OA-D2 — only
   ever rolled up `nested_lq`, confirmed by re-reading that model's own header). Does not claim or
   imply the other six methods share nested_lq's MAUP behaviour. **Substantive finding:** nested_lq
   is domain-level MAUP-FRAGILE (pooled rho=0.662, every single year 2009–2026 below the 0.7 §7
   threshold, only 2008's thin n=459 passes) — this **discharges the open item flagged in
   `docs/epic-g/G2-oa-publish-gates-geo-signoff.md`** ("OA's own areal-unit robustness is
   uncharacterized... recommend OA-C.1/#174 also carry an explicit PLR-vs-BZR OA rank check"), and
   confirms the fragility that recommendation anticipated. This is a **binding forward condition**
   (see below), not merely a caveat.
3. **Bandwidth scope honesty (deliverable 3):** correctly does not re-run `oa_bandwidth_sweep.py`'s
   sweep — cites it. Verified the stated reason (only one `gaussian_*` bandwidth variant physically
   exists in the warehouse per dbt build) against that script's own DESIGN NOTE; accurate, not an
   excuse to skip a check that was actually feasible cheaply.
4. **Completeness-contamination gate (deliverable 4, the one blocking-style check this ticket must
   run):** the coverage-growth proxy (`all_domains_stock_city` year-over-year delta) is the
   IDENTICAL quantity `int_poi_status_dynamism.sql`'s C5 sign-off already established as the
   OSM-coverage-growth control — correctly reused, not a new invented proxy needing its own
   methodology review. The join key (city_code/snapshot_year/area_code/area_vintage/domain/
   category/type/weight_variant/methodology_variant) matches the shared grain both source models
   already carry — verified no unintended fan-out (n=7830 per method, consistent across all seven,
   confirming the join is 1:1 per area-year, not a cross-product). **Result:** contrary to the
   pre-registered `expected_temporal_safe` predictions in `seed_oa_calculation_methods.csv`,
   `raw_share` and `zscore_slq` were BOTH predicted to fail (`expected_temporal_safe=false`) but
   empirically PASS (rho=0.050, p<0.001 and rho=0.015, p=0.17 respectively, both below the
   |rho|>=0.3 threshold). This is a genuine, reportable finding — the prior theoretical expectation
   that a bare proportion or a base-aware z-score would be exposed to uniform city-wide coverage
   growth turned out not to hold empirically at Berlin's observed (largely uniform post-2015)
   coverage-growth regime. The findings doc reports this as "prediction contradicted", not silently
   overwriting the seed's prior expectation — correct, since changing `expected_temporal_safe` in
   the seed itself would be a separate methodology decision (whether to trust this one empirical
   pass over the a-priori theoretical argument) not requested by this ticket.
5. **Golden validation scope (deliverable 5):** correctly reuses `c_three_way_comparison.py`'s
   `run_faithful()` verbatim (import + call, not a re-implementation) rather than re-deriving a
   second independently-computed number for the same statistic — same reuse-not-rederive precedent
   that script itself set for `e1_regressions.py`. Confirmed the reused rho=0.148/p=0.0019/n=435
   matches the currently-published figure in `docs/epic-e/C1-three-way-comparison-findings.md`
   exactly (no drift). Correctly states the other six methods have no golden anchor to validate
   against, rather than fabricating a comparison — this is ADR-0024's own premise (they are new
   calculation choices with no 2018 precedent), not a gap.
6. **Never-blend (ADR-0024 D3):** every table in the findings doc reports one method per row/column
   — no combined/averaged score is computed anywhere in the script or the doc. The closing "Summary"
   table is explicitly labelled a navigation aid, not a ranking or recommendation.
7. **Build/lint verification:** `uv run ruff check`/`ruff format` clean; `uv run poe lint` clean
   (script is pure Python, touches no dbt models, so no `dbt build` re-run was required — confirmed
   by inspection that no `transform/models/**` file changed in this diff).

## Forward-binding condition (binding for any future public consumer)

Any future site page, mart, or public copy (D6/D7/G2/O2) that displays a PLR-vs-BZR comparison of
`nested_lq` — or, more narrowly, any figure that implicitly relies on nested_lq rankings being
stable across the LOR area-hierarchy scales — **MUST** carry the §7 MAUP-fragility disclosure
(pooled rho=0.662 < 0.7 threshold) prominently, per spatial-methods.md §7's publish-gate wording
("Below 0.7, the index is MAUP-fragile and the methodology page (G2) must say so prominently").
This is a **binding condition on D6/D7**, not merely a caveat to note in passing.

## Grounding (R-C2)

Openshaw (1984), *The Modifiable Areal Unit Problem*, CATMOG 38; Isard (1960); Isserman (1977) JAIP;
Efron & Morris (1975) JASA; `docs/methodology/spatial-methods.md` §7 (MAUP r>0.7 gate), §11
(OA construct); OA-D0 geo/domain sign-offs; `docs/epic-g/G2-oa-publish-gates-geo-signoff.md`
(the open item this ticket discharges).

## Verdict line (for the PM pre-integration check)

**Verdict: PASS** — all four required checks genuinely run or honestly scoped-and-disclosed; one
substantive MAUP-fragility finding surfaced and carried forward as a binding D6/D7 condition; one
contamination-gate prediction-vs-empirical divergence (raw_share/zscore_slq) reported transparently,
not suppressed. Ready for `develop` integration.
