# I11 post 1 — "The re-check verdict" (P1/P3 crossover), LinkedIn

## Step 1 — grounding

**Source finding:** `web/pages/thesis-recheck.md` (Epic B/H findings, already signed off — see the
page's own header note citing `docs/epic-g/O4-milestone-B-narrative.md`,
`docs/epic-e/E1-regression-findings.md` #168, `docs/epic-b/A3-oa-validation-findings.md` #167, and
the A5 thesis-recheck refresh geo+domain sign-offs referenced there). No new claim is made in this
draft — every number below is copied verbatim from the page's hypothesis table and "read the
columns together" section. The #200 sample-size correction (n=92 → n=435 for the H1/OA test) is
carried forward exactly as the page states it.

## Step 2 — audience/channel

Primary persona for the LinkedIn variant: **P1 — policy makers/city administration** (per
`docs/epic-i/audience-channel-map.md` §2), secondary overlap with P3 (researchers, whose primary
channel is Bluesky — see the companion `i11-thesis-recheck-bluesky.md` draft). No area-level
lead-lag claim naming a specific PLR is made here (all findings are aggregate, citywide directional
tests), so the standard single-order sign-off applies: domain-expert first, then geo-DS (a number/
trend is claimed, so geo-DS sign-off is required).

## Step 3 — draft (LinkedIn variant, plain-language)

> A 2018 Berlin master's thesis found that shifts in shops, cafés and restaurants track — and
> partly predict — a neighbourhood's social change. In 2026 we rebuilt the whole pipeline from
> scratch on free, open data and re-ran the test.
>
> The short version: it replicates cleanly on the same measure the thesis used. Swap in Berlin's
> more robust *official* social monitor instead, and the signal weakens — real, but fragile. One
> result stands out either way: a rise in fast-food outlets is the clearest, most consistent
> down-signal in the whole dataset, and it gets *stronger*, not weaker, once measured properly (as
> a location quotient, not a raw shop count).
>
> We're not hiding the parts that didn't hold up as cleanly — read the full hypothesis-by-hypothesis
> breakdown, caveats included: [link to /thesis-recheck?ref=li-recheck]

(148 words in the visible post body.)

## Step 4 — self-check (ADR-0021 §4)

- **O3 non-advocacy:** no policy recommendation, no "the city should do X" language — reports a
  finding and its own limits, matching the source page's register exactly.
- **O4 factual/non-promotional:** every claim (replicates on thesis-era data; weakens on the
  official monitor; fast-food signal strengthens under OA) is a direct restatement of the page's
  "read the columns together" section and H1b row; no superlative about the project ("cutting-edge",
  "powerful") appears.
- **No third-party personal data.**
- **Maintainer:** not named in this variant (not needed for this finding; the thesis link itself
  already attributes authorship).
- **Displacement framing:** the fast-food-as-down-signal claim is stated as a status/pressure
  correlate, not a prediction of who gets displaced — matches the source page's register.
- **One honest caveat kept in-body** (not hedged into vagueness, not dropped for length): "we're
  not hiding the parts that didn't hold up as cleanly" — points the reader to the full caveats
  section rather than pretending everything replicated.

Self-check: **passes** all ADR-0021 §4 rules as drafted.

## Step 5 — commit

This file, committed under `docs/epic-i/posts/`, is that commit. Campaign tag `?ref=li-recheck`
follows the I12 ticket's own worked example convention (`?ref=li-recheck`); formal convention
documentation is I12's own scope, not duplicated here.

## Step 6 — sign-off request

Requesting **`gentrification-domain-expert`** (framing/ethics, first) and
**`geo-data-scientist`** (statistical accuracy of the restated findings, second) — record
`Verdict: PASS` (or conditions/FAIL) in `i11-thesis-recheck-comms-domain-signoff.md` and
`i11-thesis-recheck-comms-geo-signoff.md` respectively, per the `comms-draft` skill step 6 and the
standard (non-P1/P2-lead-lag) sign-off order.

## Step 7 — hand-off

Both required sign-offs recorded `Verdict: PASS` — `i11-thesis-recheck-comms-domain-signoff.md` and `i11-thesis-recheck-comms-geo-signoff.md`. This draft is ready for the maintainer to review and post manually from their own account (ADR-0021 §2) on their own cadence — no agent posts, schedules, or holds any platform credential.
