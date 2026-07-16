# Geo-Data-Scientist Sign-off: OA-ablation (#261) — improved-OA extended to lor_pre2021 for a true same-anchor ablation

- **Scope:** OA-ablation #261 — branch `feature/261-oa-ablation`, commit `15059189`
  - `transform/models/intermediate/int_poi_status_dynamism_improved_pre2021.sql` (new)
  - `int_gentrification_ts.sql` Branch B (lor_pre2021) improved wiring; `gentrification_index.sql` variant='improved'
  - `analysis/c_three_way_comparison.py` Part 2 (true same-anchor ablation); `docs/epic-e/C1-three-way-comparison-findings.md`
- **Reviewer:** geo-data-scientist (statistical / spatial-methodology gate, R-C1)
- **Discharges:** the B3 sign-off carry-forward (`docs/epic-c/B3-oa-weighted-index-geo-signoff.md` §4 Risk 3:
  "lor_pre2021/Hamburg extension needs its own tier-weight review, not a mechanical crosswalk reuse").
- **Date:** 2026-07-17
- **Verdict:** PASS

---

## Independent verification (live warehouse, not trusting prior reviews)

I re-ran the substantive checks myself against `data/gentriduck.duckdb` and read the model/analysis SQL directly.

| Claim | My independent check | Result |
|---|---|---|
| Full taxonomy coverage (weights transfer, no gap) | Anti-join of all distinct `(domain,category,type)` leaves in `fct_poi_development WHERE area_vintage='lor_pre2021'` (n=120) against `seed_poi_offering_relevance` (level='type') | **0 unmatched** — confirmed |
| Domain composition structurally similar across vintages | Top-5 domains by `sum(poi_count)` per vintage | Same 5 domains (Mobility, Public Space, Retail, Gastronomy, Public Service) both vintages — confirmed |
| Model computes for the ablation year | Row counts by `snapshot_year` | 448 non-null `status_score_improved` for 2010–2020 (2008 partial=200, expected early-OSM sparsity) — confirmed |
| Same-anchor ablation Run B | Recomputed `spearmanr(status_score_improved, 2018 golden status_index)` on the joined sample | **rho=0.0074, p=0.877, n=436** — matches the findings doc exactly |

## Methodology assessment

**(a) Tier-weight-transfers-unchanged is defensible — not merely "coverage exists."** The seed keys on the
**C2-harmonized** taxonomy (`int_osm_poi_harmonized` + `seed_poi_tag_drift`), which exists specifically to
normalize OSM tag-schema drift *across years* to one canonical label set. So the cross-vintage coverage I
verified is not a coincidence — the tag-drift problem B3 worried about is solved *upstream* of this model, not
papered over inside it. The tier judgment is a claim about a retail/consumption **format's** theoretical
mechanism (Zukin 2009; Ley 1996; Dangschat 1988), not about a decade; I confirmed the seed's `causal_rationale`
carries no "modern/today" era-specific framing. Early-year OSM sparsity (C5 completeness bias) is handled by the
identical **share-based** dynamism treatment (`dynamism_score_improved` = z of YoY change in
`amenity_weighted_share`, not raw count — verified in SQL), the same C5 control the faithful pre2021 model
already carries. This is the right, non-mechanical review the B3 note demanded.

**(b) The same-anchor ablation design is valid and reported honestly.** Both predictors are joined against the
*identical* outcome (`stg_thesis_2018_result_plr.status_index`), snapshot_year (2018), and vintage
(`lor_pre2021`) — verified in the Part 2 query. This is a genuine ablation delta, unlike Part 1's cross-anchor
structural comparison. The finding (curation is weaker/closer-to-null: faithful rho=0.148 vs improved rho≈0.007,
holding on the strict common-sample cut n=435) is framed as *directional single-snapshot single-city evidence*,
explicitly not proof that curation systematically helps/hurts, and correctly cross-references the finer-grained
H1b/H2/H3 tests as the stronger OA evidence. No overclaiming. Correlating a within-year z-score against the
golden status_index is legitimate for Spearman (rank-monotone). Consistent with Epic B directional framing.

**(c) Standing OA conditions correctly applied.** D-1 descriptive-not-causal framing present. D-3 correctly
*deferred* (no new per-PLR public display added; the suppression obligation is carried forward for any future map
render). **C-4 bandwidth-fragility genuinely does not apply — I agree:** this model is a z-score of a
tier-weighted raw *stock* (`amenity_weighted_count`), with no distance kernel or bandwidth parameter anywhere in
the SQL. C-4 binds only on the LQ/Gaussian `int_poi_offering_advantage` variant, which this ticket does not touch.

## Untrusted-input note (SEC-3)

This review relied only on maintainer-authored SPEC, repo code/diff, and the live warehouse. No web-fetched or
non-maintainer content informed any methodology decision.

---

## Verdict

```json
{
  "verdict": "pass",
  "scope": "OA-ablation #261 — int_poi_status_dynamism_improved_pre2021 + true same-anchor faithful-vs-improved ablation, branch feature/261-oa-ablation, commit 15059189",
  "rationale": "Independently verified against the live warehouse: (1) the tier-weight-transfers-unchanged conclusion is sound because the seed keys on the C2-harmonized cross-year taxonomy (0/120 pre-2021 leaves unmatched, same top-5 domains both vintages) and the causal tiers encode format mechanism, not decade — the non-mechanical review B3 required, not a crosswalk reuse; early-OSM sparsity is handled by the same C5 share-based dynamism normalization the faithful model uses. (2) The same-anchor ablation is a genuine like-for-like delta (both predictors vs the identical 2018 golden status_index / snapshot_year=2018 / lor_pre2021; I recomputed improved rho=0.0074, p=0.877, n=436), and the finding that curation weakens/nears-null the aggregate signal (faithful 0.148 vs improved ~0.007, holding on the strict n=435 common cut) is reported as directional single-snapshot evidence without overclaiming, cross-referencing the finer-grained H1b tests as the stronger OA evidence. (3) Standing conditions correct: D-1 present, D-3 rightly deferred (no new public display), and C-4 genuinely inapplicable — confirmed no distance-kernel/bandwidth parameter exists in this tier-weighted stock composite.",
  "risks": [
    "The improved status_score_improved is a within-year z-score over the lor_pre2021 population and is NOT cross-vintage/cross-city comparable with the lor_2021 improved z-scores or the live MSS ordinal — correctly documented, must not be differenced across variants.",
    "The ablation is a single snapshot-year, single-city aggregate-basket test; the 'curation is weaker' result is directional, not a general claim about theory-tier curation. Any public methodology-page rendering must retain that framing.",
    "D-3 minimum-POI-base suppression is deferred, not satisfied — it becomes a hard obligation the moment any per-PLR pre-2021 improved score is displayed publicly (Epic O2/G2)."
  ],
  "recommendations": [
    "Non-blocking: when a lor_pre2021 improved score is ever surfaced per-PLR, apply the same min-POI-base flag/suppression convention already on mart_poi_offering_advantage_map (#274).",
    "Non-blocking (carried from B2/B3): a future re-tiering could test whether a data_corr continuous-calibration shrink changes the improved variant's strength on this now-computable same-anchor test."
  ]
}
```

**Verdict: PASS** — the tier-weight review is methodologically defensible (not a mechanical crosswalk), the
same-anchor ablation is valid and honestly reported, and the standing OA conditions (D-1/D-3/C-4) are correctly
applied. Independently re-verified on the live warehouse. OA-ablation #261 may be integrated into `develop` once
the `gentrification-domain-expert` gate is also PASS (R-C1 dual gate).
