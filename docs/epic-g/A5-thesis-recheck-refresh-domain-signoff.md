# A5 Gentrification-Domain-Expert Sign-Off — Thesis-Recheck Page Refresh (OA, Run 1)

- **Task:** #169 [OA-A.5][Site] Refresh thesis-recheck page with faithful OA results (Run 1)
- **Reviews:** `web/pages/thesis-recheck.md`
- **Date:** 2026-07-09
- **Verdict: PASS**

---

## Scope of this review

Checks that the refreshed page (a) does not overclaim the OA-driven partial revival of H3a/H3b as
a definitive result, (b) keeps the non-advocacy/transparency editorial stance (ADR-0008;
PROJECT_PLAN.md O3) when reporting a *more* favourable finding for the thesis than the previous
edition of this page, and (c) continues to honour the two hard guardrails from
`index-definition.md` §1.2 (no unobserved displacement-event claims; small-area aggregate
disclaimer) that the prior G2 sign-off already established for this page family.

## Theory-and-honesty accuracy check

1. **H3b "revival" framing** — the previous edition of this page reported H3b as "collapses
   sharply" under a raw-count classifier; this revision reports a *partial* revival under the OA
   predictor at a specific lag. The new copy is careful to use "partially revives," "small,
   statistically significant," and explicitly says the result "should be read as suggestive rather
   than conclusive" — this is the correct calibration. A less careful revision could have been
   tempted to declare the thesis's core finding "confirmed after all"; this page does not do that.
2. **Symmetry claim (H3a/H3b share one test)** — the page states H3a and H3b's k=2 results are "the
   same correlation read both ways," which matches the underlying regression design (both draw on
   the same Δdynamism/Δstatus lead-lag pair) and avoids implying two independent confirmations where
   there is one.
3. **H1 predictor-dependent flip disclosed honestly** — the page does not hide that the OA quotient
   itself points the *opposite* direction from the thesis on the modern monitor for H1. This is the
   single most important honesty check for this revision (a swap that could have made the story look
   uniformly better for the thesis, and doesn't) — it passes.
4. **H3c non-revival stated plainly** — "not rescued by OA" is presented as a useful negative result
   rather than downplayed or omitted, consistent with the non-advocacy stance carried over from the
   G2 sign-off.
5. **No new displacement-event or causal-identification claims** — the page continues to frame all
   results as directional/correlational ("directional indicators, consistent with a hypothesis, not
   confirmatory proof," carried in Honest Caveats), and does not newly claim the OA-based lead-lag
   demonstrates a causal succession mechanism. The G-1 guardrail (no displacement occurred/will occur
   claims) is not engaged by this content change — it remains commercial-signal-vs-social-status
   language throughout.
6. **Aggregate-only / ecological-fallacy disclaimer retained** — unchanged from the prior edition,
   still present in Honest Caveats.
7. **EWR scope-boundary framing** — described as "not yet re-tested," not as a limitation of the OA
   method itself; this is an accurate and non-misleading characterization (it is a build-order
   scope decision per E1's own documented boundary, not an admission that OA fails on EWR).

## Issues found

None blocking. No phrasing changes required.

## Verdict

```json
{
  "verdict": "pass",
  "rationale": "The revision reports a partial, favourable-to-the-thesis change (the H3a/H3b two-year-lag OA revival) with the same calibrated, non-advocacy honesty the project applied to the prior, less-favourable finding (the raw-count H3b collapse). The H1 predictor flip and H3c non-revival -- both less flattering results -- are disclosed plainly rather than minimized. No new displacement-event or causal claims are introduced; guardrails from index-definition.md and ADR-0008/O3 are intact.",
  "risks": [
    "A single significant k=2 OA cell could be over-read by a casual reader as 'the classic finding is back'; the page's suggestive-not-conclusive framing and n-scoped caveat mitigate this but should be watched in future revisions"
  ],
  "recommendations": [
    "Re-check this sign-off if a future ticket (e.g. OA-C.1 three-way comparison, #174) adds further OA-vs-raw-count claims to this or a linked page",
    "Keep the same calibration standard (suggestive vs. conclusive) for any future single-cell finding highlighted on this page"
  ]
}
```
