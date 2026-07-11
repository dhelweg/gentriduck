# I11 post 1 — "The re-check verdict" (P3), Bluesky/Mastodon

## Step 1 — grounding

Same source as the LinkedIn variant: `web/pages/thesis-recheck.md`, already signed off (see
`i11-thesis-recheck-linkedin.md` Step 1 for the full citation chain). No new claim beyond that
page's hypothesis table and "read the columns together" section.

## Step 2 — audience/channel

Primary persona: **P3 — urban researchers** (per `docs/epic-i/audience-channel-map.md` §2).
Channel fit: Bluesky/Mastodon primary, thread-friendly, can run longer and more technical, leads
with the honest tension rather than a flattened headline (per the map's P3 format guidance). No
area-level lead-lag claim naming a specific PLR; standard sign-off order applies (domain-expert
first, then geo-DS, since numeric/trend claims are made).

## Step 3 — draft (Bluesky/Mastodon variant, thread)

> 1/ We re-ran a 2018 Berlin gentrification thesis's six hypotheses on a from-scratch, fully open
> pipeline (dbt + DuckDB, free data only). Honest tension, not a clean "confirmed": it replicates
> on the thesis's own welfare-register measure, and weakens on Berlin's more robust official social
> monitor.
>
> 2/ On the original measure (EWR, 2014–2020): all 15 directional tests pass, all significant. That
> holds up cleanly — but it hasn't yet been re-tested with the thesis's own Offering-Advantage
> predictor (a documented scope boundary, not a result).
>
> 3/ Swap in Berlin's official monitor (MSS) instead of the welfare register: the signal weakens
> sharply on most hypotheses. MSS is coarser and biennial — genuinely harder to move with any
> commercial signal, not necessarily evidence the underlying relationship vanished.
>
> 4/ One finding gets *stronger*, not weaker, once measured the way the thesis actually measured it
> (Offering Advantage, a location quotient — not a raw shop count): fast food as a down-signal. Robust
> across data eras and city scales.
>
> 5/ The thesis's headline "social change leads commercial change" claim: a raw-count re-test on
> modern data made it look collapsed. Re-testing with the thesis's own OA predictor brings back a
> small, significant, correctly-signed result at a 2-year lag — suggestive, not conclusive (n=534,
> one specific lag).
>
> 6/ Not every hypothesis is rescued by the better predictor — same-time co-movement stays
> wrong-signed either way. Full hypothesis-by-hypothesis table, every caveat included:
> [link to /thesis-recheck?ref=bs-recheck]

(~185 words across the thread; per-tweet length not separately capped per the I9 map's "no hard
cap" note for this channel.)

## Step 4 — self-check (ADR-0021 §4)

- **O3 non-advocacy:** reports the finding and its own boundaries; no call to action.
- **O4 factual/non-promotional:** every number/direction claim (15/15 EWR tests, MSS weakening,
  OA fast-food strengthening, 2-year-lag revival n=534, H3c non-revival) is copied from the source
  page; no unsupported superlative about the project.
- **No third-party personal data.**
- **Maintainer:** not named (not needed here).
- **Displacement framing:** fast-food-as-down-signal kept as a status correlate, not a
  displacement prediction — matches source page.
- **One honest caveat kept in-body, not softened:** "suggestive, not conclusive (n=534, one
  specific lag)" for the H3a/H3b revival — the single most overclaimable number in this draft, and
  the one most load-bearing to hedge correctly.

Self-check: **passes** all ADR-0021 §4 rules as drafted.

## Step 5 — commit

This file, committed under `docs/epic-i/posts/`. Campaign tag `?ref=bs-recheck` follows the same
I12 worked-example convention as the LinkedIn variant's `?ref=li-recheck`.

## Step 6 — sign-off request

Requesting **`gentrification-domain-expert`** (first) and **`geo-data-scientist`** (second) —
record `Verdict: PASS` in `i11-thesis-recheck-comms-domain-signoff.md` and
`i11-thesis-recheck-comms-geo-signoff.md` (the same two sign-off files cover both this and the
LinkedIn variant, since both restate the same underlying findings with the same claims — no
per-channel duplication of the sign-off artifact).

## Step 7 — hand-off

Both required sign-offs recorded `Verdict: PASS` — `i11-thesis-recheck-comms-domain-signoff.md` and `i11-thesis-recheck-comms-geo-signoff.md`. This draft is ready for the maintainer to review and post manually from their own account (ADR-0021 §2) on their own cadence.
