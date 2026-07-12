# I18 (#242) — Geo-hierarchy area pages, slice 1 (data: `dim_area_hierarchy` + PGR ingestion): gentrification-domain-expert sign-off

**Ticket:** `docs/epic-i/tickets/I18-geo-hierarchy-pages.md`
**Branch:** `feature/242-i18-geo-hierarchy` (diffed against `develop`)
**Reviewer:** gentrification-domain-expert (urban-sociology/housing-policy theory gate, consulted per
ticket's gate note: "domain-expert consulted on what a BZR/Bezirk profile may *say*")
**Date:** 2026-07-12

## Scope of this sign-off

Slice 1 only: PGR ingestion + `dim_area_hierarchy` parent/child edges. **No page copy, no
index/typology display, and no coarse-grain content exists yet in this slice** — there is nothing
in it that makes a claim about an area's gentrification status. Consulted per the ticket, not
because this slice is itself methodology-bearing in the R-C1 sense.

## Verdict: PASS

## What I checked

1. **No premature claim-making.** Confirmed the diff (`ingest_lor_geometries.py`, `dim_area.sql`,
   `dim_area_hierarchy.sql`, `stg_berlin_lor_pgr.sql`, seeds, tests) contains no page template, no
   copy, and no re-scored index at any grain — matches the ticket's explicit "no coarse-grain index
   anywhere in this ticket" constraint. There is nothing here yet that could over-claim about a
   Bezirk/PGR/BZR the way a Kurzprofil-style page eventually will.
2. **The administrative ladder itself is theory-appropriate.** Bezirk → Prognoseraum → Bezirksregion
   → Planungsraum is Berlin's own official small-area planning hierarchy (the same one the 2018
   thesis and the Senate's own Kurzprofil/Sozialraum publications use) — adopting it as the site's
   navigation ladder doesn't introduce a new areal unit of the domain-expert's own invention; it
   mirrors the source institution's own framing, which is the right default for a "not the official
   Senate typology" site to anchor to.
3. **Ortsteil exclusion is the correct call for now.** Ortsteile are a lived/colloquial spatial unit
   (Kieze) that readers actually think in, but they are explicitly non-administrative for LOR
   purposes and don't nest with PLRs. Deferring them rather than forcing a crosswalk avoids
   asserting a false precision; agree with recording it as an open question rather than quietly
   approximating it.
4. **Flag for the coarse-page slice (forward-looking, non-blocking here):** when Phase-1 content
   (population/EWR sums, MSS-at-BZR, stage-distribution) lands, the copy must be careful to frame
   "3 of 9 PLRs in this BZR are in stage X" as a *distribution*, not imply the BZR itself has "a"
   stage — the ticket's own scope note already says this, and I want it on record from the domain
   side too: aggregated typology talk is exactly where lay readers over-read a single number onto a
   heterogeneous area. This is the thing to check hardest when that slice's sign-off comes up.

## Recommendation

Approve slice 1 as-is. When slice 2 (coarse-page copy/rollup content) is ready, re-consult
specifically on the stage-distribution wording per note 4 above before it renders publicly.

```json
{
  "verdict": "pass",
  "rationale": "Slice 1 is data/hierarchy plumbing only (PGR ingestion + parent/child edges); no page copy, index, or typology claim exists in this diff to review for over-claiming. The adopted administrative ladder (Bezirk/PGR/BZR/PLR) mirrors Berlin's own official small-area planning hierarchy, not an invented unit. Ortsteil is correctly deferred as an open question rather than force-fit via an unreviewed crosswalk.",
  "risks": [
    "None in this slice; flagging forward for slice 2: stage-distribution wording at coarse grain must not imply a BZR/Bezirk itself has 'a' stage."
  ],
  "recommendations": [
    "Re-consult specifically on coarse-page stage-distribution copy before slice 2 (Phase-1 rollup content) renders publicly."
  ]
}
```
