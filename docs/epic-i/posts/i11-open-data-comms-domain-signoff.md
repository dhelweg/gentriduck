# I11 post 5 ("The open-data story") — gentrification-domain-expert comms sign-off

**Drafts covered:** `i11-open-data-linkedin.md`, `i11-open-data-bluesky.md`
**Source finding:** `web/pages/open-data.md` (already-published, single-gate domain-signed-off,
`docs/epic-i/I6-open-data-domain-signoff.md`, Verdict: PASS 2026-07-10)
**Gate:** ADR-0021 §3 per-post sign-off — domain half. Per both drafts' Step 6, no
geo-data-scientist sign-off is requested; this sign-off confirms that triage call, plus the I6
sign-off's specific binding recommendation on the IFG-adjacent closing paragraph.
**Reviewer:** gentrification-domain-expert
**Date:** 2026-07-11

## Verdict: PASS

## What I checked

1. **Claims trace to the source page exactly.** The OSM login-gate incident, the EWR format-drift
   history (#50/#57/#58), the CKAN 404s (#197), the boundary-reform crosswalk gap, and all six
   standardization-wishlist items are copied faithfully from `web/pages/open-data.md`'s "What was
   hard, concretely" and "What would make it easy" sections — no incident is invented, no severity
   inflated, no fix claimed as already shipped upstream when it is this project's own workaround.
2. **The IFG-adjacent boundary — the specific thing I was asked to re-check.** I re-read my own
   prior `I6-open-data-domain-signoff.md` recommendation: *"If this paragraph is ever shortened for
   a social post (I11), the 'it draws no further conclusion about legislation or policy' clause is
   the one that must survive intact... without it, a shortened version could read as taking a side
   in the IFG debate."* I checked both drafts against this specifically:
   - The **LinkedIn variant omits the IFG-adjacent paragraph entirely** rather than attempting a
     partial restatement. This is the cleanest way to satisfy the recommendation for a
     133-word post — there is no clause to drop incorrectly if the paragraph isn't referenced at
     all, and nothing in the omitted material is load-bearing for this variant's own claim ("data
     that's free and open still has format/discoverability friction; here's one fix").
   - The **Bluesky thread does reference the paragraph** (appropriate for P6, whose persona
     explicitly cares about the open-data-debate framing) and **carries the disclaimer clause over
     in substance, not paraphrased loosely**: "We state that observation and stop there — this
     thread draws no further conclusion about legislation or policy, and neither does the page it
     comes from." This satisfies my prior recommendation correctly — the clause's substance (no
     legislative/policy conclusion drawn) survives, stated as plainly as the source page's own
     wording, not softened into ambiguity or dropped.
   Both handling choices are domain-sound and I confirm neither risks the political-adjacency
   boundary the original I6 sign-off flagged as load-bearing.
3. **No geo-data-scientist trigger — I confirm this triage call is correct.** Neither draft states
   a gentrification-index statistic, indicator value, or trend direction; both are entirely about
   data-sourcing and pipeline-engineering friction, citing public issue numbers (not analysis
   output). ADR-0021 §3's geo trigger does not apply. Correctly triaged as domain-only, consistent
   with the original I6 page sign-off's own finding (point 5: "Displacement/gentrification framing
   guardrails are not engaged... this page makes no gentrification, displacement, or
   status/dynamism claim of any kind").
4. **O3 non-advocacy / O4 factual/non-promotional.** Neither draft campaigns for a specific
   legislative position; both stay in "this project observed X, here's a concrete fix" register,
   consistent with the source page's own experience-report framing and my prior sign-off's finding
   that the page "clears the non-advocacy bar."
5. **"Hard means friction, not that access was wrong" — preserved in both variants.** The LinkedIn
   draft's "the data was always free; finding out it had changed shape wasn't" and the Bluesky
   thread's explicit "none of this is a complaint that the licences are wrong... entirely about
   format, discoverability, and documentation practice" both correctly carry over the source page's
   own pre-emptive caveat against the most likely misreading (a grievance piece about restricted
   access) — this is the single most important caveat for this audience (P6 explicitly includes
   data-publisher readers who could otherwise misread this as an attack on their licensing choices).
6. **No third-party personal data; maintainer not named.** Confirmed in both drafts.
7. **Displacement framing — not applicable.** Neither draft makes any gentrification/displacement
   claim; consistent with the source page's own confirmed scope.

## Risks (non-blocking)

- The Bluesky thread's tweet 6 is the one place across all five I11 posts so far that touches
  political-adjacent subject matter at all (the IFG debate). I re-confirm, independently of my
  original I6 review, that the carried-over disclaimer is sufficient — but flag that any future
  edit to this specific tweet should be run past this same check again, since it is the thread's
  single highest-risk sentence for drift toward advocacy if shortened further (e.g., for a
  character-limited repost).
- Recommend any maintainer edits preserve the LinkedIn variant's choice to omit the IFG paragraph
  entirely, rather than adding a shortened version of it later without re-running this check.

## Recommendations

- Proceed to maintainer hand-off. No geo-data-scientist sign-off required per the confirmed triage
  above. No correction required to either draft.
