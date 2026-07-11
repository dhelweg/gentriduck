# I11 post 2 ("The back-test") — geo-data-scientist comms sign-off

**Drafts covered:** `i11-backtest-linkedin.md`, `i11-backtest-bluesky.md`
**Gate:** ADR-0021 §3 per-post sign-off — geo half, second in sign-off order (domain PASS already
recorded in `i11-backtest-comms-domain-signoff.md`).
**Reviewer:** geo-data-scientist
**Date:** 2026-07-11

## Verdict: PASS

## What I verified independently against `docs/methodology/backtest.md`

1. **Test B (8/8 hotspot recall) and Test C (6/6 coldspot recall).** Read the backtest doc's Test B
   and Test C tables directly: n=8 hotspot PLRs in the seed, all 8 found in the top decile
   (threshold status_index >= 3.0); n=6 coldspot PLRs, all 6 in the bottom decile (threshold
   status_index <= 1.0). Both drafts' "8/8" and "6/6" figures are exact, not rounded up from a
   lower true count.
2. **Pass thresholds correctly restated.** Both drafts characterize the bar as ">=50% recall" and
   the achieved result as "stronger than the minimum" (LinkedIn) / exceeding chance performance
   (Bluesky, "~10% at a 10% decile"). Confirmed against the doc's own stated rationale table: Test
   B/C threshold is exactly >=50%, with the doc's own note that chance performance at the top/bottom
   decile is ~10%. Both restatements are accurate, not inflated.
3. **Test A framing — this is the specific check I was asked to confirm (per the domain sign-off's
   recommendation).** I agree with the domain-expert's reasoning and confirm it independently from
   the statistics side: Test A computes Spearman rho between `gentrification_index.status_index`
   and `int_gentrification_ts.status_index` — both columns are **directly assigned from the same
   MSS D1 ordinal** via two different model paths (per the backtest doc's own "Polarity convention"
   section and the mart lineage). A near-1.0 rho here reflects **pipeline correctness** (the two
   paths didn't diverge), not an out-of-sample predictive validation. Presenting rho=1.0 in a public
   post without this distinction would materially overstate what was actually tested — a reader
   would reasonably infer "the index predicts documented reality with rho=1.0," which is a
   different and much stronger claim than "two internal computations of the same input agree."
   **Both drafts' handling is statistically correct**: the LinkedIn variant omits Test A entirely
   (the cleaner choice for a short-form, non-technical audience); the Bluesky variant mentions it
   but explicitly labels it a "different kind of evidence" from Tests B/C and states "not conflating
   the two" — this is the accurate framing.
4. **No leakage or circularity in Tests B/C themselves.** The ground-truth seed
   (`seed_gentrification_ground_truth`) labels are drawn from independent literature (Döring &
   Ulbricht 2016, Holm & Schulz 2016) and the 2018 thesis — sources external to the live index's
   own construction — so recall against this seed is a genuine external check, not circular with
   Test A's internal-consistency result. Neither draft conflates the two, consistent with point 3.
5. **No area-level lead-lag/timing claim.** Confirmed both drafts describe a status-classification
   validation (is a known-hotspot area correctly classified as vulnerable *now*), not a claim about
   which area will change *next* or a commercial-change-precedes-social-change timing claim — the
   §4 dual-use gating (which specifically concerns lead-lag predictive signals) does not apply, and
   neither draft phrases the finding in a way that would trigger it.
6. **Displacement/vulnerability polarity correctly applied.** "Most-vulnerable decile" for hotspot
   PLRs and "least-vulnerable"/"stable" for coldspot PLRs matches the backtest doc's stated
   vulnerability-positive polarity (status_index: 1.0=best status ... 4.0=worst/most deprived) —
   neither draft inverts or confuses this convention.

## Risks (non-blocking)

- Sample sizes (n=8, n=6) are small in absolute terms; both drafts state the raw counts rather than
  dressing them as a percentage that could look more authoritative than 8/6 data points warrant —
  this is the correct, conservative choice and I flag it as a strength, not a gap.
- I did not re-run the backtest harness in this review (out of scope for a comms sign-off); I
  verified restatement fidelity against the already-signed-off, versioned doc (last run
  2026-06-29, ALL PASS), consistent with this gate's scope.

## Recommendation

Both drafts may proceed to maintainer hand-off. No numeric or framing correction required.
