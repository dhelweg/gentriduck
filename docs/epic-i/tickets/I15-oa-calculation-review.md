[I15] Offering-Advantage calculation review + subtype-value bug

## Why (problem)
Maintainer report from the live site: on the area page for PLR `04200311`
(`/gentriduck/area/04200311/`), **all OA values for a type with subtypes are identical** — which
should be near-impossible for a real location quotient at subtype grain. Separately, OA values
surface publicly as coarse 0/1/2-style numbers rather than a continuous quotient. The Offering
Advantage is slated to become a headline finding (I11 post 3) and the basis of the PLR portraits
(I14) — it must be verified before it is amplified.

## Goal
The OA implementation confirmed correct against the thesis definition (or fixed), the subtype
symptom root-caused, and a signed-off statement of what the published OA value means and on what
scale.

## Scope & approach
- **Root-cause the reported symptom first:** reproduce for PLR `04200311`; trace subtype-level
  values through `mart_poi_offering_advantage*` and `int_poi_status_dynamism` and the page query
  in `web/pages/area/[code].md`. Determine whether the fault is mart grain (OA computed at
  domain/type level and fanned out to subtypes), a join, or the page query. If it is page-query
  only, the fix routes to the web-engineer pair (small follow-up ticket); anything mart-level is
  fixed under this ticket's gate by the DE pair.
- **Full review against the thesis definition** (grounding rule R-C2 — cite thesis sections in
  the model SQL): location-quotient formula (numerator/denominator populations), denominator
  choices, causal-tiered POI selection (ADR-0018), temporal handling/vintages, and the **value
  scale** — if the pipeline emits coarse 0/1/2-style values, establish where continuity is lost
  (grain, rounding, binning) and define the corrected published scale. Target public display form:
  **percentage vs the citywide baseline** (consumed by I14).
- Re-run affected dbt tests + the relevant analysis scripts; reconcile a sample of PLRs by hand.

## Acceptance criteria
- The `04200311` symptom is explained in writing and fixed (or shown to be correct with the
  mechanism documented — and then the display must stop implying subtype resolution it lacks).
- OA formula, denominators, tier selection, and scale verified against the thesis definition with
  citations in the model SQL; divergences documented or remediated.
- dbt build + tests green; a small reconciliation note (sample PLRs, expected vs got) committed.

## Gate / sign-off
**Methodology-bearing (R-C1, enforced).** geo-data-scientist AND gentrification-domain-expert
sign-offs (`I15-oa-review-{geo,domain}-signoff.md`, Verdict: PASS) before integration into
`develop`. **Until PASS: I11 post 3 stays blocked and I14 ships no OA-derived wording or %
display.**

## Dependencies / relations
Holds I11 (post 3) and I14 (OA framing). Touches `mart_poi_offering_advantage*`,
`int_poi_status_dynamism` (both on the methodology-bearing list). May spawn a web-side fix ticket.

## References
- `docs/assessment/2026-07-10-storytelling-comms-review.md` (finding 8)
- ADR-0017 (OA revival) · ADR-0018 (causal-tiered POI selection) · thesis OA definition
  (`reference/`, Offering Advantage) · CLAUDE.md §Methodology gate + R-C2
