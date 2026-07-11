# I11 post 6 — "The timeline" (P4 primary), Bluesky/Mastodon

## Step 1 — grounding

Same source as the LinkedIn variant: `web/pages/timeline.md` (see `i11-timeline-linkedin.md` Step 1
for the full citation chain and the I13-linkage note). This thread restates a slightly longer subset
of the page's own milestones, still verbatim to the source page — no new claim, no number beyond
what the page itself records.

## Step 2 — audience/channel

Primary persona: **P4 — tech & AI practitioners** (per `docs/epic-i/audience-channel-map.md` §2,
whose channel-fit entry names Bluesky/Mastodon as primary for this persona and explicitly lists
"planned timeline (I4)" among the pages that already serve them). Format guidance followed directly:
one real, specific mechanism per beat (the actual gate that caught actual drift), not a vague
"we use AI agents" framing, and no framework/product-comparison claim — this is an account of this
project's own practice, not a pitch that it's better than any alternative. No area-level lead-lag
claim; domain-expert-only sign-off per Step 1's reasoning (same triage as the LinkedIn variant).

## Step 3 — draft (Bluesky/Mastodon variant, thread)

> 1/ In 2018 a master's thesis measured gentrification pressure across Berlin on Hadoop + Hive +
> Java UDFs + R + Weka. In mid-2026 a supervised team of AI agents rebuilt the whole pipeline from
> scratch on dbt + DuckDB — free, local-first, no paid tier — and re-ran the thesis's own tests
> against it.
>
> 2/ The rebuild didn't stay a like-for-like port. A deep review a day later found the early index
> had drifted: raw shop-count data was being treated *as* the social-status measure it was only ever
> supposed to help predict. That review is the reason a mechanical, non-optional sign-off gate
> exists in this project's workflow today — not an aspiration, a merge blocker.
>
> 3/ Ten days later: an autonomous integration model (agents self-merge reviewed work onto an
> internal branch continuously; a human merges the one weekly release PR by hand) replaces
> per-feature review-and-merge cycles that couldn't keep pace with the agent team's own throughput.
>
> 4/ A citable, versioned methodology whitepaper follows, with its own dual sign-off — the same
> discipline applied at document, not just model, granularity.
>
> 5/ Same day: a second city's real data (Hamburg — OSM history, socio-economic indicators, rents)
> is staged end to end on the same city-agnostic schema (`dim_city`/`dim_area`) this project's very
> first ADR wave committed to, before any single line of Berlin-specific logic was written. Staged
> and unpublished for now — proving the design promise, not yet a launch.
>
> 6/ Every date above is cited to a repo artifact (an ADR, an issue close date, a sign-off document)
> — never to `git log`, whose history here is squashed and dated wrong for this purpose. Full,
> cited timeline: [link to /timeline?ref=bs-timeline]

(~230 words across the thread.)

## Step 4 — self-check (ADR-0021 §4)

- **O3 non-advocacy:** an account of this project's own engineering history; no generalized claim
  about how AI-assisted or multi-agent engineering "should" be practiced elsewhere.
- **O4 factual/non-promotional:** every beat (thesis stack, revival rebuild, the drift-and-fix
  review, ADR-0011's autonomous model, the whitepaper, Hamburg staging) is copied from the
  already-signed-off `/timeline` page; no superlative about the project's own quality anywhere
  ("cutting-edge", "best-in-class" do not appear) — tweet 2 states a real, specific caught error
  rather than a generic "we have quality gates" claim, matching P4's own stated "what convinces
  them" criterion.
- **No third-party personal data:** the maintainer's 2018 thesis authorship is already public (the
  thesis, `CITATION.cff`); no other individual named.
- **Maintainer:** referenced only via the already-public thesis-authorship fact.
- **Displacement framing:** not applicable — no gentrification/displacement finding or number
  anywhere in this thread, only project-history milestones and process facts.
- **One honest caveat kept in-body, not softened:** tweet 5's "staged and unpublished for now —
  proving the design promise, not yet a launch" — the single most overclaimable fact in this thread
  (it would be easy to imply Hamburg is already a live second city), stated plainly rather than
  glossed over, matching the source page's own explicit framing exactly.

Self-check: **passes** all ADR-0021 §4 rules as drafted.

## Step 5 — commit

This file, committed under `docs/epic-i/posts/`. Campaign tag `?ref=bs-timeline` follows the same
convention as the LinkedIn variant's `?ref=li-timeline`.

## Step 6 — sign-off request

Requesting **`gentrification-domain-expert`** only — record `Verdict: PASS` in
`i11-timeline-comms-domain-signoff.md` (the same file covers both this and the LinkedIn variant,
since both restate the same underlying milestones with the same claims — no per-channel duplication
of the sign-off artifact). No geo-data-scientist sign-off requested per Step 1's reasoning; the
domain-expert is specifically asked to confirm (a) this triage call and (b) that tweet 5's
"staged, not launched" framing of the Hamburg milestone is not overstated anywhere in this longer
thread variant.

## Step 7 — hand-off

Domain-expert sign-off recorded `Verdict: PASS` in `i11-timeline-comms-domain-signoff.md` (no
geo-data-scientist sign-off required — confirmed by the domain-expert as correctly triaged, per Step
6). This draft is ready for the maintainer to review and post manually from their own account
(ADR-0021 §2) on their own cadence.
