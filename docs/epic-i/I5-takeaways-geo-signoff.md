# I5 (#222) — Takeaways page: geo-data-scientist sign-off

**Ticket:** `docs/epic-i/tickets/I5-takeaways-page.md`
**Branch:** `feature/222-i5-takeaways-page` (diffed against `develop`)
**Reviewer:** geo-data-scientist (spatial/statistical claim-support gate, R-C1, paired with domain)
**Date:** 2026-07-10

## Verdict: PASS

Every quantitative claim on `web/pages/takeaways.md` traces to an exact number in an already
gated source document; no statistic is restated inaccurately, rounded misleadingly, or stripped of
a material qualifier. No new model, indicator, weight, or spatial method is introduced — this page
computes nothing and queries no mart directly, so there is no dbt build/test surface to re-run.

## Claim-by-claim verification against source

1. **"correctly signed and statistically significant on both a raw business count and OA... survives
   aggregation to district scale"** — confirmed against `thesis-recheck.md` row H1b ("Significant and
   correctly signed on both raw counts and OA — and stronger under OA (rho 0.42 vs 0.14) — even at
   coarser city scales") and the "What still matters" bullet on fast food. Accurate restatement.
   "Same-time co-movement hypothesis (H3c) never revives" matches row H3c exactly ("wrong-signed on
   the modern monitor under both raw count and OA"). No overclaim.

2. **PLR-grain back-test recovers hotspots/coldspots at top/bottom decile.** Verified against
   `web/pages/index.md`'s own back-test section and `docs/methodology/backtest.md`: 8/8 hotspot
   recall at the top decile, 6/6 coldspot recall at the bottom decile, both exactly as stated. The
   causal-sounding clause "a pattern that a Bezirk-level average would flatten out" is **not** a
   tested statistical claim in this project (no district-level back-test exists to compare against)
   — I flag this the same way the domain sign-off did: it is illustrative reasoning from the
   PLR-vs-Bezirk population-size difference (a Bezirk contains dozens of PLRs, so an area-weighted
   district mean would structurally dilute an 8-PLR hotspot cluster), not an empirical result. The
   page's own wording ("a pattern that... would flatten out") reads as an inference, not a reported
   test outcome, which I judge to be within the SPEC's "actionable simplicity... never untrue"
   register — but recommend, as the domain sign-off also does, a future edit soften this to avoid
   implying a district-level comparison was run. **Non-blocking.**

3. **Six-stage typology, `improving-vulnerable` as a named ambiguity.** Verified against
   `index-definition.md` §1.3's controlled stage list and the `improving-vulnerable` row's own
   process-meaning text ("Could be incumbent-led improvement OR early gentrification; model cannot
   yet distinguish (needs D5)"). Accurate, no overclaim of resolving the ambiguity.

4. **AUC below chance, out-of-time.** Verified the exact figures against
   `docs/epic-e/E4-early-warning-findings.md`: out-of-time AUC = 0.4445 (< 0.5, below chance),
   permutation p = 0.7810 (not significant vs a label-shuffled null), reported as a genuine result
   "not tuned away." The takeaways page's summary ("came back below chance on the held-out data...
   reported as a genuine negative result, not tuned away") is a faithful, non-softened restatement —
   this is the correct way to report a null/negative predictive result and I specifically checked it
   was not quietly omitted or reframed as a partial success. Good practice.

5. **Hamburg pillar-coverage / grain-mismatch finding.** Verified against
   `docs/epic-h/H1-hamburg-data-landscape.md`'s executive summary: "no pillar without an open
   equivalent," and the documented Stadtteil-vs-statistische-Gebiete grain mismatch (Pillar 2 coverage
   gap #2). The takeaways page's restatement ("a genuine, open equivalent of every pillar... but at a
   different small-area grain than its own richest socio-demographic dataset") matches the source
   document's own "one genuine design decision, not a gap in availability" framing exactly. No
   overclaim that Hamburg onboarding is complete (it correctly frames this as onboarding-prerequisite
   research, consistent with H1's own "Research deliverable... no methodology gate" scope note).

## "What this can NOT tell you" — statistical accuracy check

- Ecological-fallacy / small-area-aggregate wording matches G-2 verbatim in spirit.
- Causal-inference boundary is accurate: no DiD/event-study was run in this project to date (#70
  remains parked exactly as stated); every association reported elsewhere on the page is
  correlational or an out-of-time classifier, never a causal estimate.
- "Not a reliable early-warning tool, yet" is consistent with and does not contradict takeaway 4.

## No spatial/statistical method introduced

This page performs no computation, defines no new indicator/weight/normalization, and runs no
spatial query — the R-C1 methodology-bearing trigger here is solely "public claims derived from the
governed index," which is a claim-accuracy review, not a model-correctness review. No dbt build was
required for this ticket's own diff (`web/pages/takeaways.md`, `web/pages/index.md` only); I confirmed
by reading the diff that no `transform/` file changed.

```json
{
  "verdict": "pass",
  "rationale": "Every quantitative/statistical claim on the takeaways page (H1b OA rho, 8/8 and 6/6 backtest recall, index-definition.md typology text, E4 out-of-time AUC=0.4445/p=0.7810, H1 Hamburg pillar-coverage finding) verified word-for-word against its cited, already-gated source document. No claim is overstated, no qualifier is stripped, and the honest negative result (early-warning AUC below chance) is reported plainly rather than softened. No new indicator, weight, normalization, or spatial method is introduced; no transform/ file changed in this diff.",
  "risks": [
    "Takeaway 2's 'a Bezirk average would flatten this out' is illustrative reasoning, not an empirical district-level back-test result (no such test exists in this project) -- adequately hedged as written, non-blocking."
  ],
  "recommendations": [
    "If this page is revisited, soften takeaway 2 to explicitly mark the district-flattening claim as illustrative reasoning rather than a tested comparison."
  ]
}
```

**Verdict: PASS.** I5 may integrate into `develop` on this claim-support gate, alongside the paired
gentrification-domain-expert PASS in `I5-takeaways-domain-signoff.md`.
