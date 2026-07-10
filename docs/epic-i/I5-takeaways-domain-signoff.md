# I5 (#222) — Takeaways page: gentrification-domain-expert sign-off

**Ticket:** `docs/epic-i/tickets/I5-takeaways-page.md`
**Branch:** `feature/222-i5-takeaways-page` (diffed against `develop`)
**Reviewer:** gentrification-domain-expert (framing/ethics/policy-misuse check, paired with geo-DS)
**Date:** 2026-07-10
**Scope of this gate:** `web/pages/takeaways.md` (new) + the home-page audience-router card wiring
in `web/pages/index.md`. No indicator, weight, normalization, or spatial method changes — this is
a claims/framing review of a page that *restates* already-signed-off findings for a lay audience.

## Verdict: PASS

The five takeaways are each traceable to a specific, already-gated source (thesis-recheck, the B2
back-test, the ADR-0008 typology, the E4 early-warning findings, and the H1 Hamburg research), the
"what this can NOT tell you" block correctly restates the project's binding displacement/causality
boundaries, and the register matches the non-advocacy / transparency stance (O3) this project has
held throughout Epic I. No claim on this page exceeds what its cited source actually supports.

## What I checked, takeaway by takeaway

1. **Commerce tracks social change (H1b/lead-lag).** Restates `thesis-recheck.md`'s own verdict
   table faithfully — correctly hedges "not a strong [predictor]" and explicitly notes H3c never
   revives, rather than cherry-picking only the positive results. No overclaim.
2. **Small-area monitoring beats district averages.** Grounded in the home page's own back-test
   section (8/8 hotspot recall, 6/6 coldspot recall at PLR grain) and the plain structural fact
   that MSS/commercial data are collected at PLR grain. The inference "a district average would
   flatten this" is a reasonable, non-overreaching restatement of why the grain matters — it does
   not claim a formal district-vs-PLR statistical comparison was run (none was), and the wording
   ("a pattern that a... average would flatten out") is appropriately hedged as illustrative, not a
   tested result.
3. **Six-stage typology vs a single score.** Directly grounded in `index-definition.md` §1.3's
   controlled stage vocabulary, including the correct characterization of `improving-vulnerable` as
   a deliberately-named ambiguity (G-1 guardrail: risk/pressure framing, never a completed-event
   claim) — this is the single most important framing point on the page and it is handled exactly
   right, matching the I1 sign-off's own emphasis on this cell.
4. **Open data + early-warning honesty.** This is the takeaway I scrutinized hardest for
   misuse potential: it reports a **below-chance** out-of-time result plainly, without softening
   ("read as: ... not yet enough ... to reliably predict"). This is exactly the kind of honest
   negative result a policy audience needs — a weaker page would have quietly omitted E4 or led
   only with the back-test's positive result. Correctly cites "NOT A CAUSAL EFFECT" framing
   implicitly by restricting the claim to prediction accuracy, not a causal displacement claim.
5. **What a city needs to publish.** Restates H1's own bottom line (Hamburg had an open equivalent
   of every pillar, but grain mismatches must be checked explicitly) without inventing new claims
   about Hamburg beyond what H1 documented. Correctly framed as a checklist, not an endorsement of
   any specific vendor or dataset.

## "What this can NOT tell you" block — the highest-risk section, reviewed line by line

- **Displacement:** restates G-1/G-2 verbatim in spirit ("risk/pressure/signal language,"
  "consolidation-pressure, not post-displacement," ecological-fallacy warning) — correct and
  necessary for this specific audience (the policy/initiative reader most likely to over-act).
- **Causality:** correctly states every relationship is an association, not a causally-identified
  effect, and explicitly notes the parked DiD/event-study design (#70) rather than implying it was
  attempted. Matches the E4 doc's own "NOT A CAUSAL EFFECT" heading.
- **Early-warning reliability:** consistent with takeaway 4; does not contradict it.
- **Not a thesis replay:** matches the Epic B framing in `docs/PROJECT_PLAN.md` (directional
  revival, not number-for-number reproduction) and links to the page that documents this in detail.

## Register / non-advocacy stance (O3)

The page states findings and their boundaries without promotional language — no "cutting-edge,"
no "peer-review-grade" (the exact phrase I1's own sign-off flagged and had removed). The "actionable
simplicity over MECE precision — but never untrue" register from the SPEC is honoured: sentences are
short and plain, but every one carries a linked, hedged source. This matches the guide's tone rules
(non-advocacy, no self-congratulation on the agent process) already signed off for I1/I3.

## Non-blocking notes

- Takeaway 2's phrase "a pattern that a Bezirk-level (district) average would flatten out" is an
  illustrative inference, not a tested claim — recommend a future revision could soften to "would
  likely flatten out" if this page is revisited, but the current phrasing does not cross into an
  untrue claim and I do not block on it.
- PLR/MSS are explained on first use in the "Honest caveats" section as the SPEC requires; consider
  (non-blocking) moving that explainer above the five takeaways in a future pass, since PLR appears
  in takeaway 2 before its definition — acceptable as written since the definition is one scroll away
  and the term is also explained on the linked `/methodology` page.

```json
{
  "verdict": "pass",
  "rationale": "All five takeaways are faithful restatements of already-gated sources (thesis-recheck, backtest.md, index-definition.md, E4-early-warning-findings.md, H1-hamburg-data-landscape.md); the 'what this can NOT tell you' block correctly restates the binding G-1/G-2 displacement-framing rule and the causal-inference boundary; register matches the O3 non-advocacy stance and the I1-signed-off tone guide (no promotional language, honest negative result reported in takeaway 4 rather than omitted).",
  "risks": [
    "Takeaway 2's district-vs-PLR flattening claim is illustrative rather than a formally tested comparison (adequately hedged, non-blocking).",
    "PLR is used once before its 'Honest caveats' definition (acceptable given the /methodology cross-link)."
  ],
  "recommendations": [
    "Consider softening takeaway 2's flattening claim to 'would likely flatten out' in a future revision.",
    "Consider moving the PLR/MSS term explainer above the takeaways list in a future revision."
  ]
}
```

**Verdict: PASS.** I5 may integrate into `develop` on this framing/ethics gate, pending the paired
geo-data-scientist sign-off on claim-support accuracy.
