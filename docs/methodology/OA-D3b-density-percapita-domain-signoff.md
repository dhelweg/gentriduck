# gentrification-domain-expert sign-off — OA-D3b remainder: density + per-capita (#280)

**Ticket:** #280 (OA-D3b remainder), sub-slice of #240 (D-spine tracker), ADR-0024.
**Reviewed:** the same density/per-capita slice reviewed by geo-DS in
`OA-D3b-density-percapita-geo-signoff.md`.

## Condition C (from OA-D0 domain sign-off) — the binding requirement this slice must satisfy

OA-D0's domain sign-off already anticipated exactly this build and imposed Condition C: *"density &
per-capita answer provision/centrality questions, not offering-advantage... safe only if
hard-labelled by question and never blended/legend-shared with the LQ family"* and flagged
per-capita's population denominator as **endogenous to displacement**.

- **Labelling mechanism verified**: `seed_oa_calculation_methods.csv`'s `reference_point` column is
  `'absolute'` for both density and percapita (vs. `'parent-relative'`/`'city-relative'` for the six
  LQ-family methods) — this is a real, queryable distinction a consumer can filter on before
  rendering, not just prose. `mart_poi_oa_methods.sql`'s header now carries an explicit "never
  blended/legend-shared with the LQ family" instruction referencing this seed column. **PASS.**
- **Endogeneity caveat**: the model's own header (note 9) and the new schema.yml column
  descriptions both carry the sentence "population denominator is endogenous to displacement...
  caveat travels with every downstream consumer" verbatim. This is the correct place to plant the
  caveat — at the source column, so it cannot be dropped by a later consumer forgetting to re-derive
  it. **PASS.**

## Substantive reading (is the caveat actually true, and does the construct do what it claims?)

- **Density** ("POIs per km²") is a legitimate, standard urban-provision/agglomeration measure
  (retail geography's own "trade density" concept) — it is genuinely a DIFFERENT question from OA's
  offering-advantage ("is this area over/under-supplied RELATIVE to the city"), because density has
  no relative-to-city term at all. A high-density area can have LOW offering-advantage (e.g. a
  generically dense mixed-use core where restaurants are proportionate to the city average) and a
  low-density area can have HIGH offering-advantage (e.g. a sparse but restaurant-specialized
  village high street). Keeping these unblended is the right call and is now enforced by the seed
  label.
- **Per-capita** ("POIs per 1,000 residents") is the more delicate of the two, precisely because of
  the endogeneity: in a gentrifying area, the resident population itself changes (turnover,
  household-size shrinkage from single-occupancy conversions, sometimes net depopulation from
  displacement) *at the same time* commercial offerings shift — so a rising per-capita figure could
  reflect either (a) more amenities moving in, or (b) fewer residents to divide the same amenity count
  by, or both simultaneously and inseparably from this column alone. The model's caveat correctly
  names this ("endogenous to displacement") rather than presenting per-capita as a clean demand
  measure. **No published surface should show per-capita alone without either (i) also showing the
  raw `residents_total` trend alongside it, or (ii) the caveat text in immediate proximity** — this is
  a labelling requirement for whichever future ticket surfaces this column on a mart/page/analysis
  output, not something this intermediate-layer slice itself violates (it does not publish to the
  site).
- **Anti-targeting check**: neither column is finer than the existing type-grain the OA-D0 domain
  sign-off already reviewed (Condition D, "Getis-Ord hotspot maps + full type grain at PLR are the
  displacement-targeting surfaces" caveat) — this slice adds no new taxonomy granularity, only two
  new denominators at the SAME grain already gated. No new anti-targeting review is triggered.
- **Cuisine/ethnic-stigma check (from the OA-D0 dominance ethics clause)**: not applicable here —
  this slice does not touch dominance or restaurant-cuisine typing at all.

## Verdict

**Verdict: PASS.** Density and per-capita are correctly labelled as absolute provision/centrality
readings (not offering-advantage), never blended with the LQ family, and per-capita's
denominator-endogeneity caveat is planted at the source model where no downstream consumer can
drop it. Binding forward condition (non-blocking for this intermediate-layer slice, applies to
whichever ticket next surfaces `oa_*_percapita` on a public mart/page): pair per-capita with either
the raw resident-count trend or the endogeneity caveat text at the point of display.
