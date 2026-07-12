# I19-web (#246) — "People & structure" block, district/citywide comparison rendering: geo-data-scientist re-consult

**Ticket:** `docs/epic-i/tickets/I19-area-demographics-kurzprofil.md` (web slice)
**Branch:** `feature/246-i19-web-people-structure` (diffed against `develop`)
**Reviewer:** geo-data-scientist (spatial/statistical methodology gate)
**Date:** 2026-07-12

## Scope of this re-consult

`I19-geo-signoff.md` (#243, data layer) explicitly deferred this: *"The web slice's rollup-adjacent
decisions... are out of scope here and not yet reviewed"* and recommended *"Gate the web slice
(People & structure block, other-data curation) with its own geo-DS pass before it renders."* This
is that pass, scoped to the district/citywide comparison columns added in
`web/pages/berlin/area/[code].md`'s new "People & structure" `DataTable`.

## What I checked

1. **District comparison column** reads `mart_area_demographics` at `area_level='bezirk'` directly
   for the area's own Bezirk code — no new aggregation, this is the mart's own already-approved
   BZR/Bezirk rollup row, read as-is. Correct: no re-derivation of a rollup already reviewed in
   `I19-geo-signoff.md`.
2. **City (Berlin-wide) comparison column** is new to this diff: `mart_area_demographics` has no
   `area_level='city'` row (the mart's levels are `plr`/`bzr`/`pgr`/`bezirk` only, per its own
   header — city-wide was explicitly out of the mart's scope). The display SQL computes it inline
   by summing the 12 Bezirk-level rows and recomputing every share from the summed numerators —
   **the identical formula** already reviewed and approved in `I19-geo-signoff.md` (`sum(share_i *
   residents_total_i) / sum(residents_total_i)`), applied one level further. Confirmed this is not
   a new statistical method: same weight (population), same formula, same "never average shares"
   rule, extensive (`residents_total`) still summed plainly. No objection.
2a. **Correctness check.** Verified algebraically that summing 12 already-population-weighted
   Bezirk rows and recomputing citywide shares from those summed numerators is equivalent to
   directly population-weighting all 542 PLR rows (associativity of the weighted-sum formula — the
   Bezirk rollup's numerator is itself `sum(share_i * residents_total_i)` over its constituent
   PLRs, so summing across all 12 Bezirke reproduces the full-city sum over all PLRs). No double-
   counting or precision loss beyond ordinary floating-point summation order.
3. **`mean_age_years` weighted-average caveat** (flagged as a non-blocking note in `I19-geo-signoff.md`)
   is not further amplified by this extension — the citywide figure is the same class of weighted-
   mean approximation as the Bezirk figure it's built from, no additional caveat needed beyond what
   the data-layer sign-off already noted.
4. **`migration_background_share` ≥2017 caveat**: confirmed rendered inline (see
   `I19-web-domain-signoff.md` finding 4) — satisfies this sign-off's own carried-forward
   recommendation from the data layer.
5. **No PGR-level comparison rendered in this diff** — the block only compares area (PLR) vs.
   district (Bezirk) vs. city; no PGR row is read or displayed. Scope-appropriate: the ticket's
   "district/citywide comparison" language names exactly these two levels, matching I14's existing
   `[code].md` precedent for the status/OA/rent sections already on this page.

## Recommendation

Approve. The citywide comparison is a correctness-verified extension of the already-approved
rollup formula, not a new method. When #247 (BZR/PGR/Bezirk web routes) lands, its own
district/citywide comparisons at those coarser grains should reuse this exact same formula rather
than re-deriving it, and get a quick confirmation note (not necessarily a full new sign-off, since
the formula itself does not change) that the "district" concept at, e.g., PGR grain resolves
correctly (a PGR's "district" is still its Bezirk parent, same digit-prefix derivation already
established).

```json
{
  "verdict": "pass",
  "rationale": "District comparison reads mart_area_demographics's own already-approved Bezirk rollup row directly (no re-derivation). Citywide comparison is new to this diff but reuses the identical sum(numerator)/sum(weight) formula already reviewed in I19-geo-signoff.md, applied one level further by summing the 12 Bezirk rows -- verified algebraically equivalent to directly population-weighting all 542 PLR rows via associativity of the weighted-sum formula, so no new statistical method and no double-counting. The >=2017 migration_background_share caveat (carried forward from the data-layer sign-off) is rendered. No PGR-level comparison is rendered, matching the ticket's stated 'district/citywide' scope.",
  "risks": [
    "None new. mean_age_years remains a weighted-mean approximation (same class already noted non-blocking in I19-geo-signoff.md, not amplified by this extension)."
  ],
  "recommendations": [
    "Reuse this exact formula (not re-derive) for #247's coarser-grain district/citywide comparisons; a lightweight confirmation note is sufficient there rather than a full new review, since the formula is unchanged."
  ]
}
```
