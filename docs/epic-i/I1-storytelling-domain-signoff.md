# I1 storytelling spine — domain-expert framing/ethics sign-off

**Ticket:** I1 (#218), branch `feature/218-i1-story-spine-ux`
**Reviewer:** gentrification-domain-expert
**Date:** 2026-07-10
**Scope of this gate:** framing/ethics only — non-advocacy stance (O3/O4), displacement/risk
framing rule, per-audience honesty, and the self-authored home-page "Honest caveats" + "coming
soon" copy. This is *not* an R-C1 methodology-index gate: I1 changes no weights, indicators,
normalization, or spatial method, and the home page's evidence queries are unchanged.

Artifacts reviewed: `docs/epic-i/storytelling-guide.md`, `web/pages/index.md` (this branch),
against the O3/O4 stance in `docs/PROJECT_PLAN.md` and
`docs/assessment/2026-07-10-storytelling-comms-review.md`.

---

## Verdict: PASS

The storytelling guide is a faithful, unusually self-aware operationalization of the non-advocacy /
transparency stance, and the displacement-framing rule is not merely respected but promoted to a
first-class, repeated tone rule. I1 may integrate into `develop`, and I3/I5/I14 may build on this
guide. The PASS carries **one recommended copy fix** (non-blocking, home page) and two watch-items
for the dependent tickets, detailed below.

---

## What holds up well (why this is a PASS, not a bare pass)

1. **Displacement framing is correct everywhere it is touched.** Guide tone rule 5 restates the
   binding rule verbatim ("risk/pressure language only, never a completed-event claim") and rule 4
   keeps the "'improving' is not automatically good news" caveat as non-negotiable. The home page's
   third caveat states the epistemic boundary precisely — open data "cannot observe that a specific
   household was involuntarily displaced" — and every headline uses "gentrification pressure" /
   "displacement risk," never a completed-event claim. This is the single highest-risk framing area
   for this project and the guide handles it better than most published academic dashboards.

2. **The most vulnerable audience is guarded explicitly.** The policy/initiatives route (guide §5.1)
   ends by naming the exact misreading to prevent: "so the takeaway is not mistaken for a
   displacement measurement or a prediction." Pairing the plain-language takeaway with a mandatory
   "what this can NOT tell you" boundary is the right design for the audience most likely to
   over-act on the data.

3. **Non-advocacy is operationalized, not just asserted.** Tone rule 2 gives a concrete
   forbidden-register example ("our cutting-edge AI pipeline delivers unprecedented insight") and
   the correct house voice ("Partly — and that's the interesting part"). Rule 6 bans dramatizing
   the agent workflow. The Chapter-3 framing ("real, but fragile," "that tension, not a clean
   'confirmed' or 'debunked'") is faithful to the actual EWR-vs-MSS divergence and does not
   overclaim the thesis result.

4. **No audience is given a distorted picture.** Researchers are routed to full statistical detail
   and ADRs; the open-data audience is explicitly framed as "experience report — not advocacy";
   every Chapter-3 surface is tethered to `/methodology` as its decoder. No audience card promises
   more certainty than the data supports.

5. **The named-neighbourhood back-test is ethically clear.** The home page names specific "hotspot"
   PLRs (Reuterkiez/Schillerkiez, Wedding, Kreuzberg). I reviewed this for displacement-acceleration
   risk and cleared it: every named area is already documented in cited public literature
   (Döring & Ulbricht 2016; Holm & Schulz 2016) and official MSS 2023 status classes, and the
   framing is method-validation ("does the index recognise what researchers already agree on"),
   not a novel target list. No new locational information is disclosed.

---

## Line-item concerns

### C1 — "peer-review-grade" overclaims and violates the guide's own tone rule (recommended fix)
`web/pages/index.md` line 50 (the Chapter-2 `<Alert>`): *"Curious how a multi-agent system builds a
peer-review-grade statistics site?"* "peer-review-grade" is a self-conferred quality claim — the
site is not peer-reviewed — and it is exactly the promotional register the guide's own tone rules 2
and 6 forbid ("No page should claim the project is impressive"; agents "never dramatized"). Because
the home page is the exemplar that I3 propagates, this adjective should not ship as the template.

- **Actionable fix (web-engineer/data-analyst):** drop "peer-review-grade" — e.g. "Curious how a
  multi-agent system builds a public statistics site?" or "…builds this statistics site under an
  enforced methodology gate?" The latter states the true mechanism (the gate) instead of asserting
  a quality tier.
- **Why non-blocking to the gate:** it is a one-word prose fix, not a false *data/finding* claim,
  and the guide (the primary gated artifact) already prohibits it, so I3 authors have the guardrail.
  I ask that it be corrected on this branch before or at integration rather than deferred silently.

### C2 — watch-item for I4 (timeline): the agent-process chapter is the promotional-risk zone
Guide §1 Chapter 2 endorses telling the process as "a working, documented, adversarial process for
AI-assisted quantitative research that doesn't cut corners." That internal framing is fine, but
"doesn't cut corners" plus the "peer-review-grade" slip (C1) show the AI-process story is where
self-congratulation creeps in. When I4 builds the timeline and I3 revises `how-its-organised`, hold
them to tone rule 6: state what each role/gate *did* (e.g. "the gate caught X"), never adjectives of
quality. Flagging so the dependent tickets watch it; no change required in I1.

## Self-authored home-page copy (web-engineer glue) — cleared
- **"Honest caveats" section** (lines 212–230): plain, specific to this page, nothing untrue.
  Correctly decodes the counter-intuitive sign conventions (negative trend = higher pressure; low
  status = lower deprivation) inline, which is the site's most common misreading risk. Good.
- **"Coming soon" audience cards** (policy → takeaways, open-data → open-data): honest and
  non-promotional. Each describes the *planned* page's real content (including the "what this can
  NOT tell you" boundary for takeaways and the "experience report, not advocacy" scope for
  open-data) without promising it exists yet. "— coming soon" is plain and true. No concern.

---

## Grounding
- O3 non-advocacy / transparency stance and O4 shareable-summary register: `docs/PROJECT_PLAN.md`.
- Displacement-inference boundary: `docs/assessment/2026-07-10-storytelling-comms-review.md` §4
  ("displacement is inferred, never measured, and only risk/pressure framing is allowed").
- Back-test neighbourhood citations verified against Döring & Ulbricht (2016), Holm & Schulz (2016),
  and MSS 2023 status classes as stated on the home page and `docs/methodology/backtest.md`.

**Verdict: PASS** (with recommended fix C1 and watch-item C2). This unblocks I1 integration into
`develop` and lets I3/I5/I14 build on the guide.
