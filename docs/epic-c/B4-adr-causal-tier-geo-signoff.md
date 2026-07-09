# Geo-Data-Scientist Sign-off: OA-B.4 (#173) — ADR-0018 causality-first-with-data-confirmation POI selection rule

- **Scope:** OA-B.4 #173 — `docs/adr/0018-causal-tiered-poi-selection.md`, the standalone decision
  record formalizing the 2×2 causality-first-with-data-confirmation rule that OA-B.1 (#170) and OA-B.2
  (#171) already exercised. Verifies the ADR's methods-side content: the two-step ordering is
  structurally enforced (not merely asserted), the D2 2×2 outcome table is a faithful description of
  the B.2 crosstab, and the non-circularity proof (D3) is a valid inference from the empirical evidence
  actually produced. The causal-plausibility content itself (literature grounding of tiers) is
  domain-expert territory, covered separately.
- **Operationalizes:** ADR-0017 D3/D5; `docs/planning/oa-revival-and-methodology-improvement.md`
  §"POI relevance model"; `docs/epic-c/B2-offering-relevance-validation-findings.md` (empirical
  crosstab this ADR formalizes).
- **Reviewer:** geo-data-scientist
- **Date:** 2026-07-09
- **Branch:** feature/173-oa-b4-adr-poi-selection-rule → develop
- **Deliverables reviewed:** `docs/adr/0018-causal-tiered-poi-selection.md`, `docs/adr/README.md`
  (index entry).
- **Verdict:** PASS

---

## 1. Summary

1. **The two-step order (D1) matches what OA-B.1/B.2 actually did, verified against the source
   artifacts, not just the ADR's own prose.** I cross-checked the ADR's claim that OA-B.2's script is
   "read-only with respect to the seed" against `analysis/c_offering_relevance_validation.py`
   (confirmed: the script reads `seed_poi_offering_relevance.csv` and `int_poi_offering_advantage`,
   writes only `docs/epic-c/B2-offering-relevance-validation-findings.md` and a `data_corr` column
   fill — no write path touches `offering_tier`/`offering_weight`). The ADR does not overstate the
   structural guarantee.
2. **The D2 2×2 table and the empirical crosstab it cites are consistent.** I re-derived the four cell
   populations from `B2-offering-relevance-validation-findings.md`'s crosstab (tier-0 correlated=15,
   tier-0 not-correlated=50+51=101, tier≥1 correlated=1+2+4=7, tier≥1 not-correlated/n/a=23+32+19+17+3+14=108)
   and confirm the ADR's "15 tier-0-correlated kept dropped" / "45 tier≥1-unconfirmed kept at theory
   tier" figures are arithmetically consistent with the source table (7 confirmed + 45 unconfirmed
   among non-n/a tier≥1 rows checks out against the source document's own stated splits).
3. **The non-circularity proof (D3) is a valid inference, not overclaimed.** The argument correctly
   identifies that a circular rule would predict near-zero counts in the "disagreement" cells
   (tier-0-yet-correlated, tier≥1-yet-unconfirmed) — and the observed counts (15, 45) are in fact the
   *largest* populated cells, which is the right empirical signature to point to. The ADR appropriately
   frames this as evidence of independence, not formal proof of an unobservable property (correct
   epistemic hedging).
4. **D4's boundary against #80 causal inference is methodologically accurate.** The ADR correctly
   characterizes the Step-2 correlation as a plain cross-sectional Spearman test with no identification
   strategy (no instrument, no control group, no counterfactual), and does not claim it as a causal
   effect estimate anywhere. This is the correct methods-level distinction from DiD/event-study designs.
5. **No new tool/library/data source; no model changed by this ADR itself** — confirmed: this ticket
   touches only `docs/adr/**`, consistent with a pure decision-record ticket. `uv run poe build` is a
   no-op check here (no models changed) but I confirmed no `transform/` file is touched by this branch.
6. **D5's forward-binding requirements are consistent with, not contradicting, the B.3 sign-off's own
   advisory** (`data_corr` remains advisory pending a future gated calibration ticket) — the ADR
   correctly does not silently adopt the B.3 advisory as if already decided.

Verdict: **PASS.**

---

## 2. Methodological assessment

### 2.1 Small-n underpowering is honestly disclosed, not smoothed over

The ADR's Consequences section names the 114/231 n/a nodes and the general small-n PLR-level
correlation-test limitation as an accepted trade-off rather than omitting it. This matches my own
read of the B.2 findings doc, where n/a nodes are explicitly "insufficient PLR-level data for a
non-degenerate read" — the ADR does not claim a stronger empirical confirmation rate than the
underlying data supports.

### 2.2 The rule's asymmetry (D2) is correctly identified as the load-bearing structural property

The ADR is precise that only the bottom-left cell (correlated-but-not-plausible) discards a positive
empirical signal, while both "plausible" cells (top row) keep the node regardless of data outcome.
This is the correct characterization of what prevents the rule from degenerating into pure
correlation-mining, and I confirm it matches the actual seed/script behavior (offering_tier is fixed
in Step 1 and untouched by Step 2's script, per §1.1 above).

### 2.3 No spatial/bandwidth method is re-litigated — appropriately scoped

This ADR is pure taxonomy-selection-rule formalization; it does not touch OA's spatial computation
(LQ formula, kernel, bandwidth — ADR-0017 D1/D2), and I confirm it does not silently amend or
contradict any of those decisions.

---

## 3. Conditions

None blocking, no new conditions.

---

## 4. Risks

1. The non-circularity argument (D3) is an inference from one exercise of the rule (OA-B.1/B.2 on the
   current Berlin taxonomy/snapshot) — it is good evidence, not a formal guarantee that would hold
   under adversarial or repeated re-tiering. D5 partially mitigates by requiring re-tiering to redo
   Step 1 with a fresh citation, not merely re-run Step 2, but this remains a discipline that depends on
   future ticket authors following the ADR rather than a code-enforced invariant (there is no seed-level
   check that a `causal_rationale` citation predates any data-informed edit).
2. Same risk already flagged at B.1/B.2: the ~140 category-inherited (non type-cited) tiers carry less
   individually-cited support, so the "theory" half of the rule is thinner for the taxonomy's long
   tail — this ADR formalizes the rule but does not itself strengthen that citation coverage.

---

## 5. Certification

The ADR accurately formalizes a selection rule that was already exercised (not speculative), its
description of the two-step ordering and the 2×2 outcome table is verified consistent with the source
seed/script/findings artifacts, its non-circularity argument is a valid (appropriately hedged)
inference from the empirical crosstab, and its boundary against #80 causal inference is methodologically
accurate. No new tool/library/data source; no spatial/statistical method re-litigated.

**The PM MAY integrate this into `develop`**, pending the independent `gentrification-domain-expert`
PASS also required by the R-C1 dual gate.

```json
{
  "verdict": "pass",
  "rationale": "ADR-0018 formalizes the causality-first-with-data-confirmation POI selection rule already exercised by OA-B.1/B.2. Verified against source artifacts: analysis/c_offering_relevance_validation.py is read-only with respect to offering_tier/offering_weight (writes only data_corr and the findings doc), confirming D1's structural (not merely asserted) two-step ordering. The D2 2x2 table and its cell counts (15 tier-0-correlated kept dropped, 45 tier>=1-unconfirmed kept at theory tier, 7 tier>=1 confirmed) are arithmetically consistent with docs/epic-c/B2-offering-relevance-validation-findings.md's crosstab. The D3 non-circularity argument is a valid, appropriately-hedged inference: a circular rule would predict near-zero disagreement-cell counts, and the observed 15/45 are in fact the largest populated cells. D4's distinction from #80 causal inference (plain cross-sectional Spearman, no identification strategy, vs DiD/event-study) is methodologically accurate. No new tool/library/data source; no spatial/bandwidth method re-litigated; docs-only change.",
  "risks": [
    "The non-circularity argument is an inference from one exercise of the rule, not a formally enforced invariant -- re-tiering discipline (D5) depends on future ticket authors following the ADR, with no seed-level check that a causal_rationale citation predates a data-informed edit",
    "~140 category-inherited (non type-cited) tiers carry thinner individually-cited theoretical support, a pre-existing risk this ADR formalizes but does not itself strengthen"
  ],
  "recommendations": [
    "Consider a future lightweight seed convention (e.g. a citation-date or rationale-hash column) if re-tiering discipline needs stronger-than-documentary enforcement",
    "OA-C.1 (#174): honor D5's reporting boundary -- present the crosstab as a descriptive theory/data (dis)agreement finding, not as grounds to silently re-tier"
  ]
}
```

---

## Final Verdict

Verdict: PASS
