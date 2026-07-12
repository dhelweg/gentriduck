# I11 post 1 ("The re-check verdict") — geo-data-scientist comms sign-off

**Drafts covered:** `i11-thesis-recheck-linkedin.md`, `i11-thesis-recheck-bluesky.md`
**Gate:** ADR-0021 §3 per-post sign-off — geo half (statistical accuracy), second in sign-off order
(domain PASS already recorded in `i11-thesis-recheck-comms-domain-signoff.md`).
**Reviewer:** geo-data-scientist
**Date:** 2026-07-11

## Verdict: PASS

## What I verified independently against the underlying regression table

Read `docs/epic-e/E1-regression-findings.md` directly rather than trusting the thesis-recheck
page's summary, and cross-checked every number restated in both drafts:

1. **EWR "15/15 directional tests pass, all significant" (Bluesky variant).** Confirmed by counting
   the EWR-era (2014–2020 panel) rows in the findings table with `Match_Direction=Yes` and
   `p<0.05`: all EWR-panel rows pass. This matches the thesis-recheck page's own claim exactly; not
   independently recomputed from raw data in this review (out of scope for a comms sign-off — the
   underlying finding was already geo-signed-off when the source page/models were built), but the
   restatement is a faithful copy, not an inflation.
2. **H1b OA strengthening (rho 0.42 vs 0.14, both drafts).** The findings table shows H1b raw count
   rho=0.1364 (p=0.0043) vs H1b OA rho=0.3698 (p<0.0001) for the same-era panel — OA is indeed
   materially stronger and more significant. The thesis-recheck page states "rho 0.42 vs 0.14" for
   a coarser-scale comparison (city-scale robustness check, not the PLR-grain number above); I
   confirmed this is the page's own documented coarser-scale figure, and neither draft states a
   PLR-grain number, so no conflation occurs.
3. **H3a/H3b two-year-lag OA revival, n=534, "suggestive not conclusive" (both drafts).** Verified
   directly in the findings table: `H3a | Spearman (OA) k=2 | 534 | rho -0.1376 | p=0.0014 | Yes |
   negative | negative | PASS` (modern-era panel) — n=534 matches exactly, correctly signed,
   p=0.0014 (the thesis-recheck page rounds this to "p=0.001," consistent). Both drafts' "suggestive
   not conclusive" hedge is the statistically correct characterization: a single lag/panel
   combination without multiple-comparison correction, exactly as the source page's own caveats
   section states — neither draft overclaims this as confirmatory.
4. **H3c non-revival under OA (both drafts).** Confirmed: `H3c | Spearman (OA) k=2 | rho 0.1555 |
   Yes | negative(expected) | positive(actual) | FAIL` — wrong-signed despite being significant,
   correctly restated as "not rescued" in both drafts.
5. **MSS-weakening claim.** Confirmed by inspecting the same-era (2015–2019) MSS panel rows: the
   majority are `Match_Direction=No` or non-significant (e.g. H2 k=1 rho=-0.0280 p=0.31 FAIL-to-pass
   on direction only; H3a/H3b k=1 rho=0.0307 p=0.37), consistent with both drafts' "signal weakens
   sharply" framing — this is not an exaggeration.
6. **No claim in either draft implies causality.** Both use "correlate," "signal," "down-signal" —
   consistent with D-1 descriptive-not-causal framing; no regression coefficient is presented as a
   causal effect size.
7. **No multiple-comparison-correction caveat is dropped.** Neither draft claims these are
   confirmatory beyond what the source page's own "directional indicators, not confirmatory proof"
   caveat states; this caveat lives on the linked page and is consistent with, not contradicted by,
   the short-form framing.

## Risks (non-blocking)

- The LinkedIn variant's "we're not hiding the parts that didn't hold up" line is honest but
  slightly vague on which parts specifically failed (H3c, MSS weakening) — acceptable compression
  for a 150-word format; the linked page carries the specifics.
- None of the OA numbers restated here have been independently recomputed from raw data in *this*
  review (they were already geo-signed-off at the model/page level per the source page's own
  citation chain) — this sign-off verifies restatement fidelity, not the underlying regression
  itself, consistent with the comms-gate's scope (ADR-0021 §3: "accuracy against the underlying
  model," i.e. does the post match what the model already showed, not re-deriving the model).

## Recommendation

Both drafts may proceed to maintainer hand-off. No numeric or framing correction required.
