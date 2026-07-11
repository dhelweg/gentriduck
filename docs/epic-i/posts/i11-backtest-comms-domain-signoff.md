# I11 post 2 ("The back-test") — gentrification-domain-expert comms sign-off

**Drafts covered:** `i11-backtest-linkedin.md`, `i11-backtest-bluesky.md`
**Source finding:** `docs/methodology/backtest.md` (B2 ground-truth back-test harness, latest run
2026-06-29, ALL PASS)
**Gate:** ADR-0021 §3 per-post sign-off — domain half, first in sign-off order.
**Reviewer:** gentrification-domain-expert
**Date:** 2026-07-11

## Verdict: PASS

## What I checked

1. **Claims trace to the source doc exactly.** The 8/8 hotspot and 6/6 coldspot recall figures,
   the >=50% pass threshold, and the named literature sources (Döring & Ulbricht 2016; Holm &
   Schulz 2016) are copied verbatim from `docs/methodology/backtest.md` Tests B/C. No number is
   inflated or rounded favorably (100% recall is stated as-is, not embellished further).
2. **Test A framing is the correct call, and I specifically probed this.** Both drafts deliberately
   distinguish Test A (a pipeline-consistency check — same MSS ordinal via two model paths, hence a
   near-guaranteed rho≈1.0) from Tests B/C (genuine external validation against independently
   documented areas). The LinkedIn variant omits Test A entirely; the Bluesky variant mentions it
   but explicitly labels it "a different kind of evidence... we're not conflating the two." This is
   domain-sound: presenting rho=1.0 as "the index is 100% accurate" would be a textbook
   false-precision misread (conflating internal pipeline agreement with external ground-truth
   validity) and both drafts correctly avoid it. This is the single most important check for this
   post and both drafts pass it.
3. **O3 non-advocacy / O4 factual.** Neither draft recommends acting on any named area; "8/8
   hotspots landed in the most-vulnerable decile" is presented as a validation result, not a call
   to intervene. No superlative about the project beyond the plain restatement of the pass
   thresholds actually cleared.
4. **Named PLRs are places, not people.** The backtest doc's 14 named areas (e.g. Wannsee,
   Rollberg) are places with a documented, published status (MSS classes, peer-reviewed literature)
   — publishing their names in a validation context is materially different from, and does not
   violate, the no-third-party-personal-data rule (no individual or household is identified).
5. **Displacement framing.** "Most-vulnerable"/"stable" language matches the backtest doc's own
   vulnerability-positive polarity convention (`docs/methodology/index-definition.md` §5); the
   explicit "this isn't a claim the index predicts the future" caveat in the LinkedIn variant, and
   the Bluesky thread's "retrospective check... not a forecast" line, correctly forestall the most
   likely public misreading (that a validation-against-known-cases result is itself a future-risk
   forecast for unlabelled areas).
6. **No area-level lead-lag claim.** Hotspot/coldspot recall is a status-classification validation,
   not a timing claim about commercial change preceding social change — the §4 dual-use note (which
   specifically concerns lead-lag timing signals) does not apply here; standard sign-off order
   confirmed correct.

## Risks (non-blocking)

- Naming specific PLRs (even as places) in a public post that also headlines "gentrification
  pressure" carries a mild version of the §4 dual-use consideration even without a lead-lag timing
  claim — a reader could still treat "these named areas are documented hotspots" as an investment
  signal. This is materially lower risk than a lead-lag claim (it's a static classification, already
  independently published in the cited literature, not a project-original finding), so I do not
  require the P1/P2 dual sign-off order here, but flag it as a reason the drafts correctly avoid
  framing this as "invest here" or similar — which they do.
- Recommend any maintainer edits before posting preserve the "not a forecast" caveat sentence in
  both variants verbatim.

## Recommendations

- Proceed to geo-data-scientist sign-off, with a specific ask to confirm the Test A framing
  decision (Step 1 note in both drafts) is the statistically correct call, not merely a
  convenient one.
