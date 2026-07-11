# I11 post 4 ("The operating model") — gentrification-domain-expert comms sign-off

**Drafts covered:** `i11-operating-model-linkedin.md`, `i11-operating-model-bluesky.md`
**Source findings:** `docs/process/retrospective.md` ("Methodology gate enforcement (R-C1): the
critical role"), `web/pages/how-its-organised.md` (already-published, "Honest caveats" section),
`docs/process/operating-model.md` ("The coder ↔ reviewer ↔ gate loop")
**Gate:** ADR-0021 §3 per-post sign-off — domain half. Per both drafts' Step 6, no
geo-data-scientist sign-off is requested; this sign-off explicitly confirms that triage call.
**Reviewer:** gentrification-domain-expert
**Date:** 2026-07-11

## Verdict: PASS

## What I checked

1. **Claims trace to the source docs exactly.** The advisory-vs-mechanical gate history, the
   description of the pre-R-C1 drift (POI count treated as social status, POI share-change treated
   as social dynamism, when the thesis used POIs only as a *predictor* of a separately measured
   social-status *outcome*), and the note that committed E1/E2 scripts tested hypotheses the thesis
   never made are copied faithfully from `docs/process/retrospective.md`'s "Methodology gate
   enforcement (R-C1)" section — no detail is invented, softened, or overstated beyond that record.
2. **The core theory-fidelity distinction is stated correctly, and this is the specific check in my
   remit.** Both drafts describe the drift as conflating a *predictor* (POI-derived commercial
   dynamism, a lead indicator) with the *outcome* (social status, a lagged, separately measured
   construct) — this is exactly the lead-lag predictor/outcome distinction central to the 2018
   thesis's operationalization (per my own responsibilities: "POI dynamism as a predictor vs. social
   status as an outcome — keep these roles distinct"). Describing this drift publicly, accurately,
   and without minimizing it is itself sound domain framing — it correctly signals to a technical
   audience (P4/P5) that construct validity, not just code correctness, is a real risk this project
   takes seriously, which is a defensible ethics/transparency choice, not a liability.
3. **No geo-data-scientist trigger — I confirm this triage call is correct.** Neither draft states a
   gentrification-index statistic, a specific indicator value, or a trend direction (e.g., no rho,
   no recall count, no PLR-level number). The R-C1 story is a description of a past construct-
   validity failure mode and its process fix, not a restatement of any live model output. ADR-0021
   §3's geo trigger ("wherever the draft claims a number or finding — a stat, an index value, a
   trend direction") does not apply. Correctly triaged as domain-only.
4. **O3 non-advocacy / O4 factual/non-promotional.** Neither draft pitches the agent-team model as
   something others should adopt, nor claims the project's engineering is exceptional in the
   abstract; both frame the R-C1 fix as a specific lesson from a specific failure, consistent with
   `docs/process/operating-model.md`'s own "standalone reference... someone outside this project
   could follow" framing (descriptive, not promotional).
5. **The #200 caveat is restated accurately and not softened.** Both drafts' closing line points to
   the separate, already-public post-publication data-join correction documented on
   `how-its-organised.md` and `/thesis-recheck` (issue #200) as evidence the gate discipline is
   "enforced, not infallible" — this matches `how-its-organised.md`'s own "Honest caveats" section
   verbatim in substance, and is the correct honest caveat for a post whose entire point is "the
   gate works": overclaiming permanence here would itself be the kind of overclaim P4 (and O4)
   explicitly guard against.
6. **No third-party personal data; maintainer not named.** Confirmed — only agent roles (generic)
   and one public issue number are referenced.
7. **Displacement framing — not applicable.** Neither draft makes any gentrification/displacement
   claim; this check is out of scope for this post and both drafts correctly do not introduce one.

## Risks (non-blocking)

- The Bluesky thread's tweet 2 names the specific pre-fix construct error in more technical detail
  than the LinkedIn variant. This is appropriate register-scaling for P4's technical audience per
  the channel/format map, not an inconsistency between variants — the LinkedIn variant's shorter
  restatement does not contradict it, it summarizes the same fact at P5's plainer register.
- Recommend any maintainer edits preserve both drafts' explicit "not a solved-forever" closing
  line verbatim — it is the single most load-bearing honesty point in a post whose subject is "the
  gate caught a real problem."

## Recommendations

- Proceed to maintainer hand-off. No geo-data-scientist sign-off required per the confirmed triage
  above. No correction required to either draft.
