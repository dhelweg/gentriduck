# I18-web slice 2 (#247) — Bezirk/PGR/BZR coarse profile pages: gentrification-domain-expert sign-off

**Ticket:** #247 (I18-web, follow-on to #242's slice-1)
**Branch:** `feature/247-i18-web-coarse-pages` (diffed against `develop`)
**Reviewer:** gentrification-domain-expert (urban-sociology/housing-policy framing gate)
**Date:** 2026-07-12

## What I checked

1. **No implied district-level "gentrification score."** The pages repeatedly and explicitly state
   that district/PGR/BZR figures are "sums and population-weighted averages... never a separately
   re-scored index," both in an `<Alert>` block near the top of every page and in the model/page
   header comments. The "Neighbourhood stage mix" section is framed as *"a count, not a re-scored
   district-level index"* directly next to the chart. This avoids the failure mode `I18-geo-signoff.md`
   flagged as a risk of coarse-grain pages generally (a reader mistaking an aggregate distribution
   for a single district verdict).
2. **Typology-stage vocabulary is unchanged and consistently linked.** `status_class` values render
   via the same fixed ADR-0008 six-stage vocabulary already used and domain-approved on the PLR
   page (`I14-plr-profile-domain-signoff.md`) — no new stage names, no new plain-language gloss
   introduced here that hasn't already cleared that gate. The stage mix chart links to
   `/methodology` for stage definitions rather than restating them inline (avoids drift risk).
3. **Population/demographic framing carries forward I19's conditions.** These pages surface
   `residents_total`, age bands, and `mean_age_years` only — they deliberately do **not** surface
   `foreigners_share` / `migration_background_share` at this coarse grain (those remain PLR-page-
   only, per `I19-web-domain-signoff.md`'s five conditions, none of which are re-litigated or
   loosened here). Confirmed: no such column is queried or rendered on any of the three new page
   templates. This is the conservative, correct choice — the composition-indicator stigmatization
   risk that gated #243/#246 is not reopened by this diff.
4. **Suppressed-data degradation is honest, not hidden.** Each page shows an inline warning when
   `any_indicator_suppressed` is true ("this district's/area's figures may understate the true
   total"), matching the established pattern rather than silently presenting a falsely-precise
   number.
5. **"Mapped places" (POI) framing stays descriptive, not evaluative.** Counts are presented as a
   category breakdown ("Mapped places by category") with no ranking language ("best," "most
   desirable") and no claim of causality — consistent with the existing PLR page's established,
   already-approved framing that shops/POIs *follow*, not lead, social change.
6. **Breadcrumb copy is neutral and orienting**, not narrative ("Up: Bezirksregion profile," "all
   districts") — no editorializing added at the navigation layer.
7. **MSS status/Dynamik correctly deferred, not stubbed with placeholder language that could be
   misread as a verdict.** No "status: pending" or similar text appears where MSS content would
   eventually go — the section is simply absent from this slice, avoiding any half-finished framing
   a reader could misinterpret.

## Recommendation

Approve. No wording changes required before this ships. When the follow-up MSS-at-BZR ticket
lands, it should get its own domain-expert pass on how a population-weighted-mean-of-ordinals
"status" is described to a lay reader (the model's own header already flags it as an approximation
that may mis-stage boundary areas — that caveat needs to survive into any public-facing copy, not
just the model comment).

```json
{
  "verdict": "pass",
  "rationale": "The new Bezirk/PGR/BZR pages consistently and explicitly frame all coarse-grain figures as sums/population-weighted averages, never a re-scored index, in both a visible Alert block and the stage-mix chart's own caption -- directly addressing the misreading risk I18-geo-signoff.md flagged for this slice. Stage vocabulary is unchanged from the already-approved ADR-0008/I14 six-stage typology (no new gloss introduced). The pages deliberately do not surface foreigners_share/migration_background_share at this grain, carrying forward I19-web-domain-signoff.md's five conditions unchanged rather than reopening that gate. Suppressed-data degradation is honest (inline warning, not hidden). POI/mapped-place framing stays descriptive, consistent with existing approved copy. MSS status/Dynamik is cleanly absent from this slice rather than half-rendered with misleading placeholder text.",
  "risks": [
    "None new in this diff. When MSS-at-BZR is added in a follow-up ticket, its 'population-weighted-mean-of-ordinals may mis-stage boundary areas' caveat (already in the model's own header) needs its own explicit public-facing framing pass, not just a code comment."
  ],
  "recommendations": [
    "Carry the five I19-web-domain-signoff.md conditions forward unchanged to any future coarse-grain demographic extension.",
    "Give the eventual MSS-at-BZR follow-up its own domain-expert pass on lay-reader framing of the population-weighted-ordinal approximation before it renders."
  ]
}
```
