# OA-C.1 Three-Way Comparison (#174): Faithful vs Improved vs 2018 Golden

Generated 2026-07-16 22:15 UTC by `analysis/c_three_way_comparison.py`. Anchor rule: ADR-0017 D3 (faithful/improved never blended into one score); Epic B directional framing (CLAUDE.md — document divergences, not forced exact reproduction).

## Structural scope limitation (read first)

The improved-variant predictor (`status_score_improved`, OA-B.1–B.3 #170–#172) is wired **Berlin `lor_2021`-only (2021-2025)** by an explicit, scoped B.3 decision (`docs/epic-c/B3-oa-weighted-index-geo-signoff.md` §2.2) — it was never computed for the 2018/`lor_pre2021` vintage the thesis golden anchors to. Re-deriving the causal-tier seed for the thesis-era taxonomy/period would itself be a new methodology-bearing exercise, not a mechanical extension, and is out of scope for this ticket (tracked as a Run-1/Run-2 reconciliation follow-up). **A literal same-anchor, same-period ablation is therefore not computable from the current pipeline.** This report instead evaluates each workstream's predictor against its own best-available contemporaneous outcome and compares them *structurally* (expected-direction agreement, relative strength) — this boundary is itself reported as a substantive finding, per Epic B framing, rather than papered over.

## Run 1 — Faithful (all types, uncurated OA) vs 2018 golden

- Predictor: oa_mean (faithful, all types, methodology_variant='faithful') -- reused from e1_regressions.py H1 (OA) test verbatim
- Outcome anchor: 2018 golden (stg_thesis_2018_result_plr) (lor_pre2021, snapshot_year=2018)
- Spearman(oa_mean, 2018 golden status_index): rho=0.148, p=0.0019, n=435
- Direction: positive (DOES NOT match the H1 prior — more offering -> better status -> lower status_index -> expected negative)
- Significant at alpha=0.05: True

## Run 2 — Improved (causality-tier-weighted OA) vs current live MSS

- Predictor: status_score_improved (improved, causality-tier-weighted amenity composite)
- Outcome anchor: current live MSS (gentrification_index, variant='live_data') (lor_2021, period 202112-202512)
- Spearman(status_score_improved, live MSS status_index): rho=0.029, p=0.2375, n=1607
- Direction: positive (DOES NOT match the H1 prior — expected negative)
- Significant at alpha=0.05: False

## Run 3 — Comparison (structural, NOT a same-outcome ablation)

- Direction vs the H1 prior (expected negative): Run 1 = **positive** (does not match); Run 2 = **positive** (does not match).
- **Neither** workstream shows the H1-expected (negative) direction on its own available outcome this pass.
- Statistical significance (alpha=0.05): Run 1 significant (p=0.0019); Run 2 NOT significant (p=0.2375).
- Relative strength (NOT a controlled ablation — different outcome, period, vintage, taxonomy curation, AND sample size all differ simultaneously): |rho| faithful=0.148 (n=435) vs |rho| improved=0.029 (n=1607).
- **This is not evidence that curation 'improves' or 'worsens' prediction** — the two rho values are computed against different outcomes over different periods and cannot be differenced into a predictive-performance delta without confounding "the world/outcome changed" with "the metric changed" (exactly the confound ADR-0017 D3 exists to prevent). The comparable, apples-to-apples ablation this ticket's acceptance criterion asks for requires the Run-1/Run-2 reconciliation follow-up (a lor_pre2021-era improved-variant re-tiering) noted above. **As reported this pass: Run 1's aggregate basket is statistically significant but in the OPPOSITE direction from the H1 prior this pass (a significant, wrong-signed result, not a null result); Run 2's aggregate basket is not statistically significant this pass.** Neither result should be read as confirming the H1 prior for the aggregate basket; this is itself the substantive finding, and is consistent with the already-published, separately-signed-off caveat that this specific H1 (OA) aggregate test was FAIL in `docs/epic-e/E1-regression-findings.md` (Run 1) even before this comparison — a significant-but-wrong-signed result is still a FAIL against the H1 prior, not a confirmation. Domain-level and category-level OA tests elsewhere in that same findings doc (H1b, H2, H3a/H3b) DO show significant, expected-direction results — the weak/wrong-signed aggregate `oa_mean`/`status_score_improved` basket used here is a coarser summary than those finer-grained tests, not evidence against OA as a construct.

## Follow-ups (Part 1, as originally filed by OA-C.1 #174)

- ~~A true same-anchor ablation needs the improved-variant causal-tier seed and pipeline extended to `lor_pre2021`/2018 (new methodology-bearing ticket, not mechanical) — tracked, not scheduled by this ticket.~~ **Done: see Part 2 below (OA-ablation, #261).**
- The bandwidth-fragility publish gate (ADR-0017 C-4) and minimum-POI-base flag (D-3) remain open obligations on any future public display of either correlation.


---

# Part 2 — TRUE same-anchor ablation (OA-ablation, #261)

#261 extended the improved-variant pipeline to the `lor_pre2021`/2018 vintage (`int_poi_status_dynamism_improved_pre2021`; tier-weight review in that model's SQL header concludes `seed_poi_offering_relevance` transfers to the pre-2021 taxonomy **unchanged** — full type-level coverage confirmed, no new weights authored, per the review documented there). Both predictors below are now evaluated against the **identical outcome** (the 2018 golden `status_index`), the **identical snapshot year** (2018), and the **identical area vintage** (`lor_pre2021`) — the literal same-anchor ablation Part 1 could not compute.

## Run A — Faithful (all types, uncurated OA) vs 2018 golden

(Identical query/result to Part 1's Run 1 above — repeated here as the left side of the same-anchor ablation.)

- Spearman(oa_mean, 2018 golden status_index): rho=0.148, p=0.0019, n=435
- Direction: positive

## Run B — Improved (causality-tier-weighted, pre-2021 native) vs 2018 golden

- Predictor: status_score_improved (improved, causality-tier-weighted amenity composite, computed natively at the lor_pre2021/2018 vintage -- #261)
- Outcome anchor: 2018 golden (stg_thesis_2018_result_plr) (lor_pre2021, snapshot_year=2018)
- Spearman(status_score_improved, 2018 golden status_index): rho=0.007, p=0.8785, n=436
- Direction: positive (DOES NOT match the H1 prior — expected negative)
- Significant at alpha=0.05: False

## Run C — True ablation comparison (same outcome, same year, same vintage)

- |rho| faithful=0.148 (n=435) vs |rho| improved=0.007 (n=436). Sample sizes differ by 1 PLR(s) (see Part 1's #200 note on the faithful side's own join; not an artifact of this ablation).
- **curating to the causally-plausible subset (improved) produces a **weaker** correlation with the 2018 golden outcome than the uncurated basket (faithful), on this same-anchor test.**
- Direction vs the H1 prior (expected negative): Run A = **positive**; Run B = **positive**. Neither matches the H1-expected negative direction on this same-anchor test.
- Significance (alpha=0.05): Run A significant (p=0.0019); Run B NOT significant (p=0.8785).
- **Reading this honestly (Epic B framing, no overclaiming):** now that both predictors share the identical outcome/year/vintage, this IS a legitimate ablation delta (unlike Part 1's structural comparison) — but a single snapshot-year, single-city comparison of two rho values, neither near ADR-0018's improved-variant intent of sharpening a *causally-plausible* signal, should still be read as directional evidence, not proof that curation systematically helps or hurts. The improved variant is at best on par with (and numerically closer to a null correlation than) the uncurated basket for this specific test — it does NOT demonstrate the theory-tier curation sharpens the H1 aggregate-basket signal. This is consistent with (not contradicted by) the domain-expert framing that finer-grained, single-category OA tests (H1b fast-food, etc. — `docs/epic-e/E1-regression-findings.md`) remain the strongest evidence for OA as a construct; this aggregate 4-domain-basket-vs-composite comparison was never expected to be the strongest test of either workstream.

## Run D — Strictest cut: identical PLR sample for both predictors

- Common sample (both `oa_mean` and `status_score_improved` non-null): n=435
- On this identical sample: faithful rho=0.148 (p=0.0019) vs improved rho=0.014 (p=0.7681).
- This removes any residual concern that Run A/B's slightly different available-n (rather than the predictor itself) drives the Run C comparison above — the qualitative conclusion (improved is weaker/closer to null, neither matches the H1 prior direction) holds on this strictest cut.

## Standing OA conditions applied to this extension (per #261 scope)

- **Descriptive, not causal (ADR-0017 D-1):** the same-anchor ablation above is a correlational comparison of two descriptive predictors against a contemporaneous outcome; neither Run A nor Run B is a causal claim about what makes an area gentrify.
- **Minimum-POI-base (ADR-0017 D-3):** `int_poi_status_dynamism_improved_pre2021` computes `status_score_improved` from `amenity_weighted_count`, the same tier-weighted stock the existing lor_2021 improved variant uses — any future per-PLR public display of this pre-2021 improved score must apply the same minimum-POI-base flag/suppression convention already applied to the faithful OA map (`mart_poi_offering_advantage_map`, #274).
- **Bandwidth-fragility (ADR-0017 C-4):** does not apply to this extension — `status_score_improved`/`int_poi_amenity_weighted_base` has no distance-kernel/bandwidth parameter (it is a tier-weighted raw-stock composite, not a Gaussian-weighted OA location quotient); the C-4 gate binds on the LQ-based `int_poi_offering_advantage` variant only (see `docs/epic-g/G2-oa-bandwidth-sweep-findings.md`), which this ticket does not touch.
