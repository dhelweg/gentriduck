# I19-web (#246) — "People & structure" block rendered copy: gentrification-domain-expert re-consult

**Ticket:** `docs/epic-i/tickets/I19-area-demographics-kurzprofil.md` (web slice)
**Branch:** `feature/246-i19-web-people-structure` (diffed against `develop`)
**Reviewer:** gentrification-domain-expert (urban-sociology/housing-policy theory gate)
**Date:** 2026-07-12

## Scope of this re-consult

`I19-domain-signoff.md` (#243, data layer) explicitly deferred this: *"Re-consult specifically on
the rendered wording before the web slice ships — this data-layer PASS does not pre-approve any
specific copy."* This document is that re-consult, scoped to the "People & structure" block added
to `web/pages/berlin/area/[code].md` (PLR level only — the BZR/PGR/Bezirk-level web routes do not
exist yet; filed as a follow-up, #247).

## What I checked, against the five hard conditions recorded in `I19-domain-signoff.md`

1. **No ranking/sorting affordance on `foreigners_share`/`migration_background_share`.** Confirmed:
   both appear as two of twelve plain rows in a single `DataTable`, in the same fixed order as every
   other indicator (population, age bands, sex shares, residence duration). No `sort=` prop, no
   highlighting, no "top N areas" table anywhere in the diff. Compliant.
2. **Always co-presented with structural context.** Confirmed: the table always renders population,
   full age-band breakdown, sex shares, and residence duration alongside the two gated indicators in
   the same block — a reader cannot view either share without the surrounding demographic portrait.
   No standalone `BigValue` isolates either figure. Compliant.
3. **No causal or evaluative language.** Confirmed: the intro paragraph is purely descriptive
   ("this area has N registered residents"), dated (`reference_year`), and sourced ("EWR register").
   No wording like "increasingly diverse," "at risk," or any stage/trend claim tied to these two
   indicators — the block makes no trend claim at all (single latest-year snapshot only), which is
   more conservative than what the gate requires. Compliant.
4. **The ≥2017 `migration_background_share` comparability caveat must be visible.** Confirmed,
   and applied more broadly than the letter of the condition required: the diff renders the caveat
   unconditionally next to the row (marked `†`), even though this block shows only a single-year
   snapshot rather than a trend/time series (the condition as written triggers on "wherever a time
   series or trend claim touches this indicator") — the implementer chose to show it regardless, the
   safer reading. Compliant.
5. **Suppressed/sparse areas must degrade gracefully.** Confirmed: an inline warning `<Alert>`
   renders when `any_indicator_suppressed` is true, telling the reader to treat the figures as
   approximate rather than silently presenting a misleadingly precise number, and rather than hiding
   the row outright (which the mart's own header explicitly said not to do — "flagged, not silently
   smoothed away"). Compliant.

## Additional checks

- **District/Berlin comparison columns** reuse the mart's own already-approved sum-then-recompute
  rollup formula, applied one level further (city) in the display SQL only — not a new statistical
  method, and the comparison itself is presented as plain columns in the same table (not a
  ranking), consistent with condition 1 above.
- **No re-scored index, no new claim about "gentrification" anywhere in this block** — it is a
  population/demographic portrait only, matching the ticket's own framing (Kurzprofil parity, not
  an index extension).
- **Scope is honestly narrower than the ticket's letter** ("every I18 level") — the PLR level is the
  only one with an existing web route; the BZR/PGR/Bezirk web routes are correctly filed as a
  separate ticket (#247) rather than silently rendered with methodology shortcuts to hit the
  broader claim. No objection to this scoping; it is the right call over inventing a rushed
  aggregation display just to claim full-scope completion.

## Recommendation

Approve. No wording changes required before this ships. Carry the five conditions forward
unchanged to #247's BZR/PGR/Bezirk-level rendering when that lands — this re-consult's approval
covers the PLR-level block in this diff only, not a future coarse-grain block (which will also need
its own geo-DS pass on the aggregation rule per `I18-geo-signoff.md`'s explicit scope note).

```json
{
  "verdict": "pass",
  "rationale": "The 'People & structure' block renders foreigners_share and migration_background_share as two of twelve plain table rows, always co-presented with full demographic context, with purely descriptive dated/sourced wording, the >=2017 comparability caveat rendered unconditionally, and graceful degradation for suppressed areas via an inline warning rather than a hidden or falsely precise row. All five hard conditions from the #243 data-layer sign-off are met; scope is honestly limited to the PLR level (the only level with an existing web route), with the BZR/PGR/Bezirk gap correctly filed as a separate ticket (#247) rather than rushed.",
  "risks": [
    "None new in this diff. Carry the same five framing conditions forward to #247's coarse-grain rendering, which will need its own geo-DS pass on the display-layer city rollup as well."
  ],
  "recommendations": [
    "When #247 (BZR/PGR/Bezirk web routes) lands, extend this exact block pattern rather than re-deriving wording from scratch, and re-apply this document's five checks to that diff."
  ]
}
```
