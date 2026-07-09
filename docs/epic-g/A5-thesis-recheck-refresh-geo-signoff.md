# A5 Geo-Data-Scientist Sign-Off — Thesis-Recheck Page Refresh (OA, Run 1)

- **Task:** #169 [OA-A.5][Site] Refresh thesis-recheck page with faithful OA results (Run 1)
- **Reviews:** `web/pages/thesis-recheck.md`
- **Date:** 2026-07-09
- **Verdict: PASS**

---

## Scope of this review

This page is a **public restatement** of methodology and findings already carrying their own
`Verdict: PASS`: `docs/epic-e/E1-regression-findings.md` (#168, geo-signoff
`docs/epic-b/A4-e1-oa-regressions-geo-signoff.md`) and `docs/epic-b/A3-oa-validation-findings.md`
(#167, geo-signoff `docs/epic-b/A3-oa-validation-geo-signoff.md`). This review checks **fidelity and
honesty of the restatement**, per the #155/G2 precedent — not the underlying OA methodology, which
was gated at its own R-C1 review (ADR-0017, A2/A3/A4 sign-offs).

## Quantitative accuracy check

1. **H1 row** — correctly states raw-count reproduces on thesis-era EWR (unchanged from prior
   edition) and that the OA quotient flips sign on the modern monitor (E1 §1: rho +0.135, "FAIL"
   vs. expected negative). Framed as predictor-dependent, not omitted or spun as a pass.
2. **H1b row** — rho 0.4189 (OA) vs. 0.1364 (raw count), both significant (p<0.001), correctly
   reported as "stronger under OA" — matches E1 §1 exactly.
3. **H2 row** — EWR raw-count reproduction (15/15, §4) and modern MSS panel OA k=1/k=2 (both PASS,
   §2 rows 53/55) are both accurately cited; "both raw count and OA" claim checks out against §2 rows
   52–55 (raw PASS, OA PASS at both lags).
4. **H3a/H3b rows** — the two-year-lag OA revival (rho ‑0.1376, p=0.0014, PASS at k=2, §2 rows
   65–66) versus the raw-count k=2 FAIL (§2 row 64, wrong sign) is stated correctly, including the
   k=1 OA null (§2 rows 59–60, FAIL not significant) so the page does not overclaim a full revival —
   it correctly scopes the revival to k=2 only, and calls out both H3a and H3b as the same
   correlation read symmetrically (accurate: E1 documents identical values for both hypotheses at
   each k, since they share one delta-based test).
5. **H3c row** — correctly reports wrong-signed under both predictors, both significant (§2 rows
   58/61, both "FAIL"/positive vs. expected negative) — accurately flagged as "not rescued by OA,"
   a useful negative-result framing rather than selective reporting.
6. **EWR scope-boundary caveat** — accurately states the EWR same-era panel (§4) has not been
   re-tested with OA yet (E1 §Methodology note: "EWR same-era panel keep their pre-existing
   raw-count/dynamism predictors unchanged — a documented Epic B directional-divergence scope
   boundary"). Correctly flagged as a boundary, not a defect.
7. **A3 cross-link** — the "OA direct validation vs. the 2018 golden" further-reading link
   accurately represents A3's domain-level headline (13/13 domains positive, rho 0.15–0.91,
   `A3-oa-validation-findings.md`), consistent with the page's opening claim that the recomputed
   OA is directionally faithful to the thesis's own numbers.
8. **No selective reporting detected** — the page states the H1 predictor-dependent flip and the
   H3c non-revival plainly rather than omitting the less flattering OA results; consistent with the
   G2 precedent's fidelity standard.

## Issues found

None blocking. One non-blocking suggestion: a future revision could add the exact n (534) for the
k=2 OA revival test inline in the bullet prose (currently only in the caveats section) so a reader
skimming just the "What still matters" section sees the sample size next to the claim.

## Verdict

```json
{
  "verdict": "pass",
  "rationale": "The refreshed thesis-recheck page accurately restates already-approved OA findings (E1-regression-findings.md #168, A3-oa-validation-findings.md #167) without introducing any new statistical or spatial method. Every quantitative claim (H1 predictor-flip, H1b strengthening, H2 agreement, H3a/H3b two-year-lag revival scoped correctly to k=2 only, H3c non-revival, EWR scope boundary) was checked line-by-line against the source findings documents and matches, including the less-flattering results (H1 flip, H3c non-revival, k=1 null).",
  "risks": [
    "The H3a/H3b k=2 OA revival is a single test on one panel (n=534); correctly caveated on-page as suggestive, not confirmatory — re-check if a future OA-EWR bridge or additional MSS edition changes this specific result",
    "EWR same-era panel remains untested with OA; page correctly discloses this as a scope boundary rather than presenting it as resolved"
  ],
  "recommendations": [
    "Add the k=2 OA revival's n (534) inline in the 'What still matters' bullet, not just the caveats section (non-blocking)",
    "Re-run this fidelity check if E1-regression-findings.md or A3-oa-validation-findings.md are revised, or when an EWR-OA bridge closes the current scope boundary"
  ]
}
```
