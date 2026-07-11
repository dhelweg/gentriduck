# I11 post 2 — "The back-test" (P3/P1 crossover), Bluesky/Mastodon

## Step 1 — grounding

Same source as the LinkedIn variant: `docs/methodology/backtest.md` (see
`i11-backtest-linkedin.md` Step 1 for the full framing note on why Test A's rho=1.0 pipeline-
consistency result is treated differently from Tests B/C's validation results in this draft).

## Step 2 — audience/channel

Primary persona: **P3 — urban researchers**, secondary **P1** (per
`docs/epic-i/audience-channel-map.md` §2 — both value the methodological rigor angle, P3 for the
method itself, P1 for the trustworthiness it implies). Channel fit: Bluesky/Mastodon, longer/more
technical register permitted, thread-native. No area-level lead-lag claim; standard sign-off order
applies.

## Step 3 — draft (Bluesky/Mastodon variant, thread)

> 1/ How do you know a gentrification index is actually reading reality, not just producing
> plausible-looking numbers? You check it against cases you already know the answer to. Here's how
> we back-tested Gentriduck's live index.
>
> 2/ We pulled ~20 Berlin planning areas (PLRs) with documented status from three independent
> sources: peer-reviewed literature (Döring & Ulbricht 2016; Holm & Schulz 2016), the 2018 thesis
> this project revives, and Berlin's own official social monitor (MSS) 2023/2025 class assignments.
> 8 labelled as gentrification hotspots, 6 as long-term stable.
>
> 3/ Test: do the 8 documented hotspots land in the index's most-vulnerable decile, and the 6
> documented stable areas in its least-vulnerable decile? We set >=50% recall as the pass bar
> (chance performance at a 10% decile is ~10%).
>
> 4/ Result: **8/8 hotspots, 6/6 stable areas**, both at the correct tail. Full names, sources, and
> status classes are in the methodology doc — nothing here is a black box.
>
> 5/ What this test does *not* claim: it's a retrospective check against known cases, not a
> forecast. A separate pipeline-consistency check (same MSS ordinal via two independent model
> paths) also passed, confirming internal alignment — worth knowing, but a different kind of
> evidence than the hotspot/coldspot recall above, and we're not conflating the two.
>
> Methodology + every named area: [link to /methodology?ref=bs-backtest]

(~185 words across the thread.)

## Step 4 — self-check (ADR-0021 §4)

- **O3 non-advocacy:** describes a validation methodology, no call to action, no "act on these
  areas" language.
- **O4 factual/non-promotional:** 8/8, 6/6, and the >=50% threshold are copied exactly from the
  backtest doc; Test A is mentioned but explicitly distinguished from Tests B/C rather than
  presented as a stronger validation than it is — avoids the false-precision risk flagged in Step 1.
- **No third-party personal data:** named entities are places (PLRs) and cited published sources,
  not individuals.
- **Maintainer:** not named (not needed).
- **Displacement framing:** "vulnerable"/"stable" language matches the backtest doc's own polarity
  convention; no individual-level displacement claim.
- **One honest caveat kept in-body, not softened:** tweet 5's "not a forecast" distinction, plus
  the explicit "we're not conflating the two" note separating Test A from Tests B/C — this is the
  thread's single most load-bearing honesty point given Test A's rho=1.0 could otherwise be
  mis-read as "the index is 100% accurate."

Self-check: **passes** all ADR-0021 §4 rules as drafted.

## Step 5 — commit

This file, committed under `docs/epic-i/posts/`. Campaign tag `?ref=bs-backtest`.

## Step 6 — sign-off request

Requesting **`gentrification-domain-expert`** (first) and **`geo-data-scientist`** (second) —
record `Verdict: PASS` in `i11-backtest-comms-domain-signoff.md` and
`i11-backtest-comms-geo-signoff.md` (the same two files cover both this and the LinkedIn variant).

## Step 7 — hand-off

Both required sign-offs recorded `Verdict: PASS` — `i11-backtest-comms-domain-signoff.md` and `i11-backtest-comms-geo-signoff.md`. This draft is ready for the maintainer to review and post manually from their own account (ADR-0021 §2) on their own cadence.
