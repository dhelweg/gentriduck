# I11 post 6 ("The timeline") — gentrification-domain-expert comms sign-off

**Drafts covered:** `i11-timeline-linkedin.md`, `i11-timeline-bluesky.md`
**Source finding:** `web/pages/timeline.md` (already-published, signed-off site page, I4 #221)
**Gate:** ADR-0021 §3 per-post sign-off — domain half. Per both drafts' Step 6, no
geo-data-scientist sign-off is requested; this sign-off confirms that triage call.
**Reviewer:** gentrification-domain-expert
**Date:** 2026-07-11

## Verdict: PASS

## What I checked

1. **Claims trace to the source page exactly.** Every milestone restated (2018 thesis origin,
   2026-06-17 revival inception/ADR-0001, the 2026-06-19 methodology-remediation review, ADR-0011's
   autonomous integration model, the whitepaper, the 2026-07-09 Hamburg staging) is copied faithfully
   from `web/pages/timeline.md`'s own milestone entries and their linked artifacts (ADRs, issue close
   dates, sign-off documents). No date is invented or derived from `git log`, consistent with the
   source page's own explicit warning against doing so.
2. **No geo-data-scientist trigger — I confirm this triage call is correct.** Neither draft states a
   gentrification-index statistic, indicator value, or trend direction; every claim is a
   project-milestone date or an engineering/governance-process fact (an ADR's existence, a review's
   finding, an issue's close date). ADR-0021 §3's geo trigger does not apply. Correctly triaged as
   domain-only, consistent with how posts 4–5 (also process/data-sourcing narratives with no index
   number) were triaged.
3. **The Hamburg "staged, not launched" caveat — the specific thing both drafts flagged for my
   attention.** I checked this is the single highest-risk overclaim available in this post (it would
   be easy to read "second city" as "second city now live"). Both variants state it correctly:
   the LinkedIn draft's "prove the... design promise... with a second city's data staged end to
   end" and the Bluesky thread's explicit "staged and unpublished for now — proving the design
   promise, not yet a launch" both match the source page's own framing ("staged, unpublished,
   proving the adapter pattern before any second-city launch decision") without softening or
   dropping the "not yet launched" qualifier. Confirmed sufficient in both variants.
4. **The 2026-06-19 methodology-drift beat is compressed correctly, not overclaimed.** Both drafts
   summarize the construct-validity finding ("raw shop-count data was being treated as the
   social-status measure it was only ever supposed to help predict") consistently with how the same
   finding was independently restated and already domain-signed-off in `i11-operating-model-linkedin.md`
   / `i11-operating-model-comms-domain-signoff.md` — no new or inconsistent characterization of that
   finding is introduced here; this post correctly treats it as one beat in a longer arc rather than
   re-litigating the finding's own detail.
5. **O3 non-advocacy.** Both drafts describe this project's own history; neither generalizes into a
   claim about how AI-assisted or multi-agent engineering "should" be practiced elsewhere, and
   neither recommends any policy or legislative position — consistent with this project's standing
   non-advocacy register.
6. **O4 factual/non-promotional.** No superlative about the project's own quality appears in either
   draft ("cutting-edge", "best-in-class", "groundbreaking" do not occur); "grew it into something
   the original thesis never was" (LinkedIn) is a plain structural comparison (multi-city vs.
   single-city, rebuildable vs. not), not a subjective quality claim — an acceptable framing, matching
   this project's factual register throughout its other public pages.
7. **No third-party personal data.** The maintainer's 2018 thesis authorship is already public (the
   thesis itself is linked from `/thesis-recheck`, and `CITATION.cff` already credits it); no other
   individual is named in either draft.
8. **Displacement framing.** Not applicable — neither draft makes any gentrification, displacement,
   or status/dynamism claim; both are entirely project-history and process narrative, consistent
   with the source page's own confirmed scope (it is explicitly the "story of the project," not "of
   the data" — the page's own header note draws this distinction from `/berlin/time-series`).
9. **I13 linkage handled correctly.** Both drafts' Step 1 correctly note this post is the
   milestone/story post (grounded in the already-merged `/timeline` page), distinct from the future
   "Show HN"-style launch-announcement post the audience-channel map names separately under I13.
   Drafting this post does not require I13 (#230, currently `blocked`) to exist or resolve — I
   confirm this is not a premature or unfounded linkage, and no claim in either draft depends on I13.

## Risks (non-blocking)

- If `/timeline` gains its "went public" milestone entry (per the page's own pending `<Alert>`
  note) before either variant is posted, the maintainer should re-read both drafts once for
  currency — neither draft currently references or depends on that future entry, so no correction
  is required now, but a stale "as of today" framing could creep in if posting is delayed by months.
- Tweet 2 of the Bluesky thread is the most information-dense compression of the 2026-06-19 review
  across all six I11 posts; recommend any maintainer edit preserve the "was only ever supposed to
  help predict" clause intact, since it is the phrase doing the work of distinguishing predictor
  from outcome for a reader unfamiliar with the underlying methodology.

## Recommendations

- Proceed to maintainer hand-off. No geo-data-scientist sign-off required per the confirmed triage
  above. No correction required to either draft.
- This is the sixth and final I11 post; with this sign-off recorded, all six I11 posts (2×
  channel variants each) are drafted and sign-off-complete per the ticket's acceptance criteria.
