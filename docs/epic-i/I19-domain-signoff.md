# I19 (#243) — Area demographics (Kurzprofil parity), slice 1 (data: `int_ewr_demographics_wide` +
`mart_area_demographics`): gentrification-domain-expert sign-off

**Ticket:** `docs/epic-i/tickets/I19-area-demographics-kurzprofil.md`
**Branch:** `feature/243-i19-area-demographics-mart` (diffed against `develop`)
**Reviewer:** gentrification-domain-expert (urban-sociology/housing-policy theory gate — HARD gate
per ticket: "domain-expert gates whether and how `foreigners_share`/`migration_background_share`
appear")
**Date:** 2026-07-12

## Scope of this sign-off

Slice 1 only: the data-layer decision of *whether and how* `foreigners_share` and
`migration_background_share` are computed and rolled up in `mart_area_demographics`. **No page
copy, wording, or rendered comparison exists yet in this slice** — there is nothing here that
makes a public-facing statement about an area's population composition. This gate is exercised now
(rather than deferred entirely to the web slice) because the ticket frames it as gating "whether and
how these appear" — the rollup *method* (which areas get a value, at what grain, under what
suppression rule) is itself part of that "how," even before any copy is written.

## Verdict: PASS

## What I checked

1. **No premature claim-making in this diff.** Confirmed `int_ewr_demographics_wide.sql`,
   `mart_area_demographics.sql`, and the two test files contain no page template, no copy, no
   ranking, and no cross-area "worse/better" framing — they are a data pivot and a rollup, both
   read-only against the existing EWR series. Nothing here yet that a reader could misread as a
   verdict about a specific neighborhood's population.
2. **The rollup rule itself does not introduce a stigmatization risk beyond what already exists.**
   `foreigners_share`/`migration_background_share` are already computed and stored at PLR grain in
   `int_ewr_socioeco` today (feeding the index, just not displayed) — this slice does not create a
   new small-area statistic, it re-exposes an existing one for description plus adds coarser
   (BZR/PGR/Bezirk) rollups. Coarser grain, if anything, is **lower** disclosure risk than the
   existing PLR-grain figure already latent in the warehouse, not higher. No objection to the
   rollup computation existing.
3. **Suppression is propagated, not smoothed away** (`any_indicator_suppressed`) — correct: a
   PLR/BZR with a small or suppressed population should not have its share silently computed and
   presented with the same confidence as a large, unsuppressed one. This is a necessary (not yet
   sufficient — see below) precondition for responsible display.
4. **`migration_background_share`'s 2017 methodological break is preserved, not hidden** — the
   mart carries the pre-2017 values (per #197 "surface what exists, don't block") without silently
   collapsing the two non-comparable definitions into one continuous-looking series. Good: hiding a
   definitional break would itself be a form of false precision.
5. **Framing conditions for the web slice (forward-looking, non-blocking here, but ON RECORD per
   the ticket's hard-gate language):**
   - **No ranking/sorting affordance** by `foreigners_share` or `migration_background_share`
     anywhere the web slice ships (no "top N areas by foreign-national share" table, no default
     sort by these columns) — same class of concern as I20's "never recommends/ranks" gate for
     movers.
   - **Always co-present with structural context**, never as a standalone number: age structure,
     residence duration, and (once available) socio-economic composite in the same block, so a
     reader cannot extract "this area has X% foreign nationals" as an isolated, decontextualized
     fact — the Kurzprofil precedent itself always presents these figures inside a fuller
     demographic portrait, not in isolation.
   - **No causal or evaluative language** ("this area is becoming more diverse" / "at risk" /
     etc.) — purely descriptive, dated, sourced (`EWR, vintage YYYY`), same register as the rest of
     the Kurzprofil-style content this ticket models itself on.
   - **The `>= 2017` comparability caveat for `migration_background_share`** must be visible
     wherever a time series or trend claim touches this indicator (geo-DS flagged the same point
     independently — agreed).
   - Re-consult specifically on the rendered wording before the web slice ships, per the ticket's
     "Gate (hard)" instruction — this data-layer PASS does **not** pre-approve any specific copy.

## Recommendation

Approve slice 1 (data layer: computation + rollup of these two indicators, suppression-aware, no
display yet) as-is. Require a **separate, explicit re-consult on rendered copy** before the web
slice (People & structure block) ships — this sign-off's scope is the data decision, not the
eventual page text, matching the split I18's own domain sign-off drew between its slices.

```json
{
  "verdict": "pass",
  "rationale": "Slice 1 is the data-layer computation/rollup of foreigners_share and migration_background_share (already latent at PLR grain in int_ewr_socioeco today) plus coarser BZR/PGR/Bezirk aggregates -- no page copy, ranking, or evaluative framing exists in this diff to review for over-claiming. Suppression is correctly propagated rather than smoothed away, and the pre-2017 migration_background_share definitional break is preserved rather than hidden. Coarser-grain rollups are lower, not higher, disclosure risk than the PLR-grain figure already in the warehouse.",
  "risks": [
    "None in this data-layer slice; conditions recorded forward for the web slice: no ranking/sorting by these indicators, always co-presented with structural context, purely descriptive dated/sourced language, and the >=2017 migration_background_share comparability caveat must be visible wherever used."
  ],
  "recommendations": [
    "Re-consult specifically on rendered People & structure copy before the web slice ships -- this PASS covers the data decision only, not page text."
  ]
}
```
