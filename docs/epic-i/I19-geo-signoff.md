# I19 (#243) — Area demographics (Kurzprofil parity), slice 1 (data: `int_ewr_demographics_wide` +
`mart_area_demographics`): geo-data-scientist sign-off

**Ticket:** `docs/epic-i/tickets/I19-area-demographics-kurzprofil.md`
**Branch:** `feature/243-i19-area-demographics-mart` (diffed against `develop`)
**Reviewer:** geo-data-scientist (spatial/statistical methodology gate, R-C1, ticket-mandated gate)
**Date:** 2026-07-12

## Scope of this sign-off

**Slice 1** of I19: the data layer only — `int_ewr_demographics_wide` (all 13
`seed_ewr_indicator_meta` indicators pivoted to wide format at PLR grain, display-only) and
`mart_area_demographics` (PLR + rollups to BZR/PGR/Bezirk). **Not in this slice:** the "People &
structure" web block, district/citywide comparison rendering, and the other-data curation pass —
those are follow-up slices per `docs/epic-i/I19-area-data-inventory.md` and need their own review
before they render publicly. This sign-off covers the rollup rule and data-layer correctness only.

## Verdict: PASS

## What I verified

1. **Rollup rule (sum vs. average-of-shares correctness — the exact check the I19 ticket calls
   for, "same geo-DS check as I18's").** Extensive indicator (`residents_total`): plain `SUM`.
   Intensive indicators (all `*_share`, `mean_age_years`): recomputed from summed numerators —
   `sum(share_i * residents_total_i) / sum(residents_total_i)`, which is algebraically the
   population-weighted mean of the PLR shares, **not** the naive `AVG(share_i)` that would
   equal-weight a tiny and a huge PLR. This is the exact rule the ticket specifies ("never average
   shares") and is the same formula already geo-DS-approved for `int_mss_bzr_aggregate.sql`
   (B10/#120) — correctly reused rather than re-invented, and correctly extended one level further
   (PGR) using the same PLR-code-prefix derivation `dim_area_hierarchy`/`int_mss_bzr_aggregate`
   already establish.
2. **Independent reconciliation test, not just "one BZR."** `test_mart_area_demographics_bzr_reconciliation.sql`
   hand-sums every PLR row per BZR/vintage/year *independently of the mart's own rollup CTEs* and
   asserts `residents_total` matches exactly and `foreigners_share` matches to 1e-9 — this is a
   stronger check than the ticket's "one BZR rollup hand-reconciled" floor (it reconciles all
   2,145 BZR-level rows, not one hand-picked example). Ran standalone: PASS.
3. **NULL handling on the weight.** Unlike `int_mss_bzr_aggregate` (which defaults a missing
   `residents_total` weight to `1.0` for score aggregation), this mart correctly does **not**
   coalesce a NULL `residents_total` to a fallback value — a PLR with unknown population is
   excluded from both numerator and denominator sums rather than silently assumed to have
   population 1. Correct call for a demographics-specific mart (a score aggregation and a
   population aggregation have different failure semantics).
4. **Suppression propagation.** `any_indicator_suppressed` is `bool_or`'d up through every rollup
   level — a BZR/PGR/Bezirk with any suppressed constituent PLR is flagged, not silently smoothed
   into an average that hides the gap. Matches the ticket's "sparse/suppressed areas degrade
   gracefully" acceptance criterion.
5. **Separation from the index-gated pivot.** `int_ewr_demographics_wide` is a genuinely separate
   model from `int_ewr_socioeco` (not a refactor of it) — confirmed the diff makes zero changes to
   `int_ewr_socioeco.sql`, any weight, normalization, or `seed_ewr_indicator_meta` row. Full `uv
   run poe build` confirms `gentrification_index`/`int_gentrification_ts` node counts and content
   are unaffected (see run log: 780 PASS / 4 pre-existing unrelated WARN / 0 ERROR across all 791
   nodes).
6. **Live data spot-check.** Queried the built `mart_area_demographics` directly: 12 Bezirk rows
   per year (correct — Berlin has 12 districts), PLR counts per Bezirk in the 36–60 range (matches
   known Berlin PLR distribution), `any_indicator_suppressed=False` on the sampled Bezirk rows for
   a recent year (plausible — suppression is rare at Bezirk grain given large populations).
7. **`uv run poe lint`** clean (ruff + sqlfluff).

## Risks / notes (non-blocking)

- `mean_age_years` is population-weighted-averaged the same way shares are, even though it has no
  natural "numerator" — this is standard practice (matches `int_mss_bzr_aggregate`'s existing
  treatment) but is worth a one-line mention in any future web copy that it's a weighted mean of
  PLR mean-ages, not a re-derived mean over all individual residents (the two are close but not
  numerically identical unless within-PLR age distributions are symmetric — acceptable
  approximation at this spatial scale, same class of approximation the thesis itself used).
- `migration_background_share`'s pre-2017 methodological break (Mikrozensus reform, documented in
  `int_ewr_socioeco.sql`) is inherited unchanged here — the mart carries all years including
  pre-2017, consistent with "surface what exists, don't block" (#197), but the eventual web block
  must carry the same `reference_year >= 2017` comparability caveat `int_ewr_socioeco` documents.
- The web slice's rollup-adjacent decisions (e.g., whether to also roll up Wohlage/MSS to PGR, not
  just BZR/Bezirk as `int_mss_bzr_aggregate` does today) are out of scope here and not yet
  reviewed.

## Recommendations

- File the web slice (People & structure block + other-data curation) as its own PR/ticket-slice
  with its own sign-off pass before anything renders — do not carry this PASS forward to that
  content, same split I18 drew.
- When the web slice ships `migration_background_share`, surface the `>= 2017` comparability
  caveat inline (same wording pattern as `int_ewr_socioeco`'s header).

```json
{
  "verdict": "pass",
  "rationale": "mart_area_demographics reuses the already-reviewed sum(numerator)/sum(weight) rollup rule from int_mss_bzr_aggregate (B10/#120), correctly distinguishing extensive (sum) from intensive (weighted-recompute) indicators and never naively averaging shares. An independent reconciliation test (not just the acceptance criterion's one hand-picked BZR) reconciles all BZR rows against hand-summed PLR values and passes. NULL population weights are correctly excluded rather than defaulted, and suppression is correctly bool_or-propagated up every rollup level. int_ewr_demographics_wide is a genuinely separate, non-gated pivot -- confirmed zero changes to int_ewr_socioeco/gentrification_index; full build green (780 PASS, 4 pre-existing unrelated WARN, 0 ERROR, 791 nodes). Live data spot-check shows plausible Bezirk-level counts.",
  "risks": [
    "mean_age_years weighted-average approximation (standard practice, same as int_mss_bzr_aggregate, non-blocking).",
    "migration_background_share pre-2017 Mikrozensus break inherited unchanged; web slice must carry the >=2017 comparability caveat.",
    "Web-slice rollup extensions (e.g. Wohnlage/MSS to PGR) not yet reviewed."
  ],
  "recommendations": [
    "Gate the web slice (People & structure block, other-data curation) with its own geo-DS pass before it renders.",
    "Carry the migration_background_share >=2017 caveat into the eventual web copy."
  ]
}
```
