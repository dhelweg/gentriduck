# OA-C.1 Three-Way Comparison (#174): Faithful vs Improved vs 2018 Golden

Generated 2026-07-09 08:03 UTC by `analysis/c_three_way_comparison.py`. Anchor rule: ADR-0017 D3 (faithful/improved never blended into one score); Epic B directional framing (CLAUDE.md — document divergences, not forced exact reproduction).

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
- Spearman(status_score_improved, live MSS status_index): rho=0.030, p=0.2371, n=1607
- Direction: positive (DOES NOT match the H1 prior — expected negative)
- Significant at alpha=0.05: False

## Run 3 — Comparison (structural, NOT a same-outcome ablation)

- Direction vs the H1 prior (expected negative): Run 1 = **positive** (does not match); Run 2 = **positive** (does not match).
- **Neither** workstream shows the H1-expected (negative) direction on its own available outcome this pass.
- Statistical significance (alpha=0.05): Run 1 significant (p=0.0019); Run 2 NOT significant (p=0.2371).
- Relative strength (NOT a controlled ablation — different outcome, period, vintage, taxonomy curation, AND sample size all differ simultaneously): |rho| faithful=0.148 (n=435) vs |rho| improved=0.030 (n=1607).
- **This is not evidence that curation 'improves' or 'worsens' prediction** — the two rho values are computed against different outcomes over different periods and cannot be differenced into a predictive-performance delta without confounding "the world/outcome changed" with "the metric changed" (exactly the confound ADR-0017 D3 exists to prevent). The comparable, apples-to-apples ablation this ticket's acceptance criterion asks for requires the Run-1/Run-2 reconciliation follow-up (a lor_pre2021-era improved-variant re-tiering) noted above. **As reported this pass: Run 1's aggregate basket is statistically significant but in the OPPOSITE direction from the H1 prior this pass (a significant, wrong-signed result, not a null result); Run 2's aggregate basket is not statistically significant this pass.** Neither result should be read as confirming the H1 prior for the aggregate basket; this is itself the substantive finding, and is consistent with the already-published, separately-signed-off caveat that this specific H1 (OA) aggregate test was FAIL in `docs/epic-e/E1-regression-findings.md` (Run 1) even before this comparison — a significant-but-wrong-signed result is still a FAIL against the H1 prior, not a confirmation. Domain-level and category-level OA tests elsewhere in that same findings doc (H1b, H2, H3a/H3b) DO show significant, expected-direction results — the weak/wrong-signed aggregate `oa_mean`/`status_score_improved` basket used here is a coarser summary than those finer-grained tests, not evidence against OA as a construct.

## Follow-ups

- A true same-anchor ablation needs the improved-variant causal-tier seed and pipeline extended to `lor_pre2021`/2018 (new methodology-bearing ticket, not mechanical) — tracked, not scheduled by this ticket. **(Follow-up now tracked: #261 (OA-ablation), enabled by #257 (pre-2021 POI ingestion) — see `docs/planning/deferred-work-audit-2026-07/README.md`.)**
- The bandwidth-fragility publish gate (ADR-0017 C-4) and minimum-POI-base flag (D-3) remain open obligations on any future public display of either correlation.

