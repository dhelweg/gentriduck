# I11 post 3 — "The Offering-Advantage surprise" (fast-food signal story), Bluesky/Mastodon

## Step 1 — grounding

Same sources as the LinkedIn variant — see `i11-oa-fastfood-linkedin.md` Step 1 for the full
citation list and the I15 binding-condition analysis (applies identically here). Additional
technical detail for this more-technical register: `E1-regression-findings.md`'s H1b rows report
both the raw-count test (rho=0.1364, n=436, p=0.0043) and the OA-quotient test (rho=0.3698, n=359,
p<0.0001) — the drop in n (436→359) reflects OA's minimum-data requirements at the PLR level per
`int_poi_offering_advantage`'s build (not a cherry-picked subsample; both are the full available
panel for that predictor), and is disclosed explicitly in tweet 4 below for this technical
audience, rather than only implied by the LinkedIn variant's rounder framing.

## Step 2 — audience/channel

Primary persona: **P3 — urban researchers** (per `docs/epic-i/audience-channel-map.md` §2) —
values the theoretical grounding (H1b as a *contested* proxy in the gentrification literature) and
the methodological detail (why OA, as a location quotient, is a better-specified test of the
thesis's own construct than a raw count). Secondary **P1** (policy), sharing the trustworthiness
read. Channel fit: Bluesky/Mastodon, longer/thread-native, technical register permitted. No
area-level lead-lag claim, no named PLR; standard sign-off order applies (domain-expert first, then
geo-DS, both required — a number is claimed).

## Step 3 — draft (Bluesky/Mastodon variant, thread)

> 1/ Gentrification storytelling loves the artisan-coffee-shop narrative. Our re-test of a 2018
> Berlin thesis's hypotheses turned up something that cuts against it: of everything we tested,
> **fast-food outlets** are the single most robust commercial down-signal for social status — not
> cafés, not boutiques.
>
> 2/ The thesis's own H1b hypothesis (p.55) frames fast-food density as a *contested* proxy for
> low status / displacement pressure in the literature — not a settled claim. We tested it two
> ways: as a raw shop count, and as the thesis's actual predictor, an Offering-Advantage location
> quotient (share of the local retail mix relative to the citywide baseline, not a headcount).
>
> 3/ Result: both directions match the hypothesis and both are statistically significant (raw
> count: rho=0.14, n=436, p=0.004; OA quotient: rho=0.37, n=359, p<0.0001) — and the
> better-specified predictor gets the *stronger* result, not a weaker one. That's the opposite of
> what you'd expect from an artifact or a fluke.
>
> 4/ Honesty check: the n drops from 436 to 359 for the OA test — that's OA's own minimum-data
> requirement at planning-area grain, not a cherry-picked subsample; both are the full available
> panel for that predictor (`docs/epic-e/E1-regression-findings.md`). And this OA number only
> ships now because the OA calculation itself just cleared its own independent methodology review
> (#232) — hand-reconciled to floating-point exactness against the raw source counts first.
>
> 5/ What this is *not*: a causal claim, or "the" gentrification score. It's one descriptive
> indicator in a multi-signed bundle (Offering-Advantage also tracks vacancy and other domains,
> each read differently) — a status/pressure correlate, not a mechanism, and not a stand-alone
> metric.
>
> Full hypothesis table + method: [link to /thesis-recheck?ref=bs-oa-fastfood]

(~230 words across the thread.)

## Step 4 — self-check (ADR-0021 §4)

- **O3 non-advocacy:** describes a research finding and its evidentiary basis; no call to action
  toward any area, business type, or policy.
- **O4 factual/non-promotional:** rho values, n, and p-values are copied verbatim from
  `E1-regression-findings.md`; "the better-specified predictor gets the stronger result" restates
  the actual rho comparison (0.14→0.37), not an invented superlative; the project's own OA review
  is described factually ("just cleared its own independent methodology review"), not promoted as
  a marketing point.
- **No third-party personal data:** aggregate citywide statistics across anonymous planning areas;
  no individual, household, or named business.
- **Maintainer:** not named (not needed for this finding).
- **Displacement framing:** "status/pressure correlate, not a mechanism" (tweet 5) is explicit
  D-1 descriptive-not-causal language, matching I15's binding condition (b).
- **D-2 multi-sign respected:** tweet 5 explicitly names the multi-signed-bundle point (vacancy-OA
  reads oppositely) and states this is not a stand-alone score — satisfies I15's condition (c).
- **I15 condition (a) — no "data correction" framing:** this thread never references the `/area`
  radar display bug I15 diagnosed; it cites only the OA calculation's independent review outcome
  ("cleared its own independent methodology review"), which is accurate and distinct from any
  claim about a data fix.
- **One honest caveat kept in-body, not softened:** tweet 4's n-drop disclosure (436→359) — the
  single most important honesty point for a technical audience likely to notice and question a
  changing sample size across two rows of the same table.

Self-check: **passes** all ADR-0021 §4 rules and all four I15 binding wording conditions as
drafted.

## Step 5 — commit

This file, committed under `docs/epic-i/posts/`. Campaign tag `?ref=bs-oa-fastfood`.

## Step 6 — sign-off request

Requesting **`gentrification-domain-expert`** (first) and **`geo-data-scientist`** (second) —
record `Verdict: PASS` in `i11-oa-fastfood-comms-domain-signoff.md` and
`i11-oa-fastfood-comms-geo-signoff.md` (the same two files cover both this and the LinkedIn
variant, per the posts-1/2 precedent).

## Step 7 — hand-off

Both required sign-offs recorded `Verdict: PASS` — `i11-oa-fastfood-comms-domain-signoff.md` and
`i11-oa-fastfood-comms-geo-signoff.md`. This draft is ready for the maintainer to review and post
manually from their own account (ADR-0021 §2) on their own cadence — no agent posts, schedules, or
holds any platform credential.
