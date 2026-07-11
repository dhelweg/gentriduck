# I11 post 4 — "The operating model" (P5 crossover), LinkedIn

## Step 1 — grounding

**Source findings (all already public, no new claim made in this draft):**
- `docs/process/retrospective.md` "Methodology gate enforcement (R-C1): the critical role" —
  before R-C1 the gate was advisory (`concerns` could still merge); the 2026-06-19 PM + architect
  deep review (`docs/assessment/2026-06-19-pm-architect-review.md`) found the live index had
  drifted from the thesis's construct: POI count was being treated *as* social status and
  POI share-change *as* social dynamism, when the thesis used POIs only as *predictors* of a
  separately measured social-status outcome (MSS). R-C1 made sign-off `Verdict: PASS` files a
  mechanical prerequisite the PM checks before merging into `develop` — a missing or `concerns`
  verdict blocks integration, no judgment call.
- `web/pages/how-its-organised.md` (already-published, signed-off site page) — the same workflow
  description this draft restates, including its own "Honest caveats" section citing issue #200
  (an area-code join bug found and corrected *after* publication) as the concrete, public evidence
  that "enforced" does not mean "infallible."
- `docs/process/operating-model.md` "The coder ↔ reviewer ↔ gate loop" — the mechanical description
  of the four-step gate this draft summarizes (implement → review → dual sign-off → integrate).

No number in this draft is a gentrification-index statistic, index value, or trend direction — it
describes an engineering-process fact (a gate rule and one dated incident), so per ADR-0021 §3 the
geo-data-scientist sign-off is not triggered; domain-expert sign-off is requested for O3/O4
framing/ethics and, specifically, because the POI-as-index-vs-predictor distinction described here
is itself a construct-validity question squarely in the domain-expert's own remit.

## Step 2 — audience/channel

Primary persona for this variant: **P5 — data engineers/analysts** (per
`docs/epic-i/audience-channel-map.md` §2), sharing LinkedIn with P1 per the map's channel table;
secondary overlap with **P4** (tech & AI practitioners), whose primary channel is Bluesky — see the
companion `i11-operating-model-bluesky.md` draft for the more technical, thread-native variant. P5's
"what convinces them" (concrete architecture detail with citations to the ADRs/docs that made each
call, not a stack-name list) fits a short, professional-register account of one real gate catching
one real drift. No area-level lead-lag claim, no PLR named — standard (non-P1/P2-dual-use) sign-off
order applies: domain-expert only, per Step 1's reasoning.

## Step 3 — draft (LinkedIn variant, plain-language)

> A supervised AI agent team builds this project's data pipeline. One specific rule in that setup
> almost failed silently — and the fix is the actual story.
>
> Early on, the methodology gate was advisory: a reviewer could flag "concerns" and the work could
> still ship. A later deep review found this had let real drift accumulate — the live index was
> treating raw shop-count data *as* the social-status measure it was only ever meant to help
> predict. Nobody caught it sooner because nothing forced anyone to stop.
>
> The fix wasn't "review harder." It was making the gate mechanical: a documented sign-off with a
> recorded verdict is now a hard prerequisite before anything merges — missing or qualified, and
> integration blocks, no exception. Advisory gates get reasoned past eventually. Mechanical ones
> don't.
>
> Full workflow, including a later error the same discipline caught *after* publication (we don't
> hide that either): [link to /how-its-organised?ref=li-opmodel]

(148 words in the visible post body.)

## Step 4 — self-check (ADR-0021 §4)

- **O3 non-advocacy:** describes this project's own engineering practice; no claim about how other
  projects or AI agent use "should" be governed generally.
- **O4 factual/non-promotional:** "advisory gates get reasoned past eventually" restates the
  retrospective doc's own stated lesson ("advisory gates are not gates... the agent will reason
  past it"), not an invented claim; no superlative about the project ("cutting-edge",
  "best-in-class") appears anywhere — the only claim of value is about the *lesson learned*, not
  the project's overall quality.
- **No third-party personal data:** describes agent roles and a process rule, no individual named
  besides the maintainer (not named in this variant).
- **Maintainer:** not named in this variant (not needed for this finding).
- **Displacement framing:** not applicable — no gentrification/displacement claim in this draft at
  all.
- **One honest caveat kept in-body, not softened:** the closing line explicitly points to a later
  error the same gate discipline caught *after* publication, rather than presenting the gate as
  having eliminated all error — directly mirrors `how-its-organised.md`'s own "Honest caveats"
  framing (issue #200) instead of contradicting it.

Self-check: **passes** all ADR-0021 §4 rules as drafted.

## Step 5 — commit

This file, committed under `docs/epic-i/posts/`. Campaign tag `?ref=li-opmodel` follows the same
`?ref=li-recheck`/`?ref=li-oa-fastfood` convention used by posts 1–3.

## Step 6 — sign-off request

Requesting **`gentrification-domain-expert`** only — record `Verdict: PASS` in
`i11-operating-model-comms-domain-signoff.md` (covers both this and the companion Bluesky variant,
per the same-findings convention posts 1–3 used). Per Step 1, no geo-data-scientist sign-off is
requested: this draft makes no gentrification-index statistic, value, or trend claim, so ADR-0021
§3's "wherever the draft claims a number or finding" trigger for the geo half does not apply here.
The domain-expert is specifically asked to confirm this triage call (no geo trigger) is correct, not
merely to review O3/O4 framing.

## Step 7 — hand-off

Domain-expert sign-off recorded `Verdict: PASS` in `i11-operating-model-comms-domain-signoff.md` (no geo-data-scientist sign-off required — confirmed by the domain-expert as correctly triaged, per Step 6). This draft is ready for the maintainer to review and post manually from their own account (ADR-0021 §2) on their own cadence.
