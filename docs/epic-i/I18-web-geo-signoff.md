# I18-web slice 2 (#247) — Bezirk/PGR/BZR coarse profile pages: geo-data-scientist sign-off

**Ticket:** #247 (I18-web, follow-on to #242's slice-1 `dim_area_hierarchy`)
**Branch:** `feature/247-i18-web-coarse-pages` (diffed against `develop`)
**Reviewer:** geo-data-scientist (spatial/statistical methodology gate)
**Date:** 2026-07-12

## Scope of this pass

`I18-geo-signoff.md` (#242) explicitly deferred this: *"Phase-1 rollup rules... are not yet
implemented in this slice; they still need a geo-DS pass (sum vs. average-of-shares correctness)
before that content renders on any page. Do not treat this sign-off as covering that later
slice."* This is that pass, scoped to the new `/berlin/area/bezirk/[code]`,
`/berlin/area/pgr/[code]`, and `/berlin/area/bzr/[code]` templated pages.

## What I checked

1. **Population/composition figures reuse an already-approved formula, verbatim.** All three pages
   read `mart_area_demographics` at `area_level` `bezirk`/`pgr`/`bzr` directly — the mart's own
   sum-then-recompute rollup (extensive `residents_total` summed; intensive shares/`mean_age_years`
   recomputed from summed numerators) was reviewed and approved in `I19-geo-signoff.md` (#243). No
   new aggregation is introduced or re-derived in the web layer; these pages are pure display of
   pre-computed, already-reviewed mart rows. No objection.
2. **Neighbourhood "stage mix" is a plain COUNT of child PLR rows, not a rescored index.** Each
   page's `stage_mix` query groups `gentrification_index` PLR-grain rows by
   `substr(area_code, 1, N)` and counts by `status_class` (the existing ADR-0008 typology stage).
   This is exactly the constraint `I18-geo-signoff.md` set ("explicitly no re-scored index at
   coarse grain") — confirmed no weighted mean, no z-score, no new composite is computed anywhere
   on these pages. The gentrification_index mart itself still carries `area_level='plr'` rows only
   (verified: no `bzr`/`pgr`/`bezirk` rows exist in `gentrification_index`), so there is no
   temptation path to accidentally read a coarse-grain score that doesn't exist. Correct.
3. **Mapped-place ("POI") counts** are a plain `sum(poi_count)` of `fct_poi_development` PLR rows
   grouped by the same `substr` prefix — an extensive count, correctly summed rather than averaged.
   No new categorization or weighting.
4. **LOR code-prefix derivation reused, not re-invented.** `substr(area_code, 1, 2/4/6)` for
   Bezirk/PGR/BZR is the identical derivation already grounded and tested in
   `dim_area_hierarchy.sql` (#242) and `int_mss_bzr_aggregate.sql` (#120) — re-applied here in the
   web SQL layer for grouping child PLRs, not as a new spatial method. Same vintage caveat applies
   (PGR/BZR code *values* differ across LOR vintages; these pages are Berlin-current (`lor_2021`)
   only, matching every other Berlin web page's existing vintage convention — no cross-vintage
   mixing risk introduced).
5. **`dim_area_geometry` used only for area names**, not geometry/derivation — confirmed the new
   `web/sources/gentriduck_marts/dim_area_geometry.sql` source selects only
   `city_code, area_level, area_code, area_name, area_vintage`, none of which is a spatial/
   statistical computation (pure plumbing, matching that mart's own header). No objection.
6. **MSS status/Dynamik-at-BZR (`int_mss_bzr_aggregate`) correctly NOT rendered in this slice.**
   This was explicit Phase-1 scope per the ticket, but I agree with the implementer's decision to
   defer it: that model is not yet exposed as a mart (web can only read `gentriduck_marts.*`), and
   its own header caveats it as *"fit for the directional MAUP probe but may mis-stage boundary
   BZRs/Bezirke"* — i.e. it was built and approved (B10, #120) for a research comparison, not
   asserted fit for public display. Publishing it on a public profile page needs its own pass on
   display fitness (confidence framing, boundary-mismatch caveat), not just a re-use of the B10
   approval. Filing this as a separate follow-up (rather than rendering it under this slice's
   existing sign-off) is the correct call — same reasoning `I18-geo-signoff.md` itself used to defer
   this whole slice from #242.
7. **Build verification.** `npm run sources` + `npm run build` (Evidence static build) completed
   with **zero SQL/parser/binder errors** across all 12 Bezirk, ~58 PGR, and ~143 BZR generated
   pages (confirmed by directory count and spot-checked HTML: real linked child tables, real
   population figures, e.g. Mitte district: 397,879 residents / 49 constituent PLRs / mean age
   40.0). One real bug was found and fixed during this pass: a `UNION ALL` of five single-row
   `ORDER BY ... LIMIT 1` subqueries is invalid DuckDB SQL when unparenthesized — restructured as a
   `WITH latest AS (...)` CTE selected from five times; re-verified clean on rebuild. The
   `Dataset is empty` warnings remaining in the build log are pre-existing (present before this
   diff too, e.g. sparse/uninhabited-area edge cases on the existing PLR page) — not introduced by
   this slice.
8. **`uv run poe lint`** clean (ruff + sqlfluff) — no dbt model changed in this diff besides the
   new pure-passthrough web source file, which is not a dbt model.

## Risks / notes (non-blocking)

- Breadcrumb navigation is now bidirectional (Bezirk → PGR → BZR → PLR and back), matching the
  ticket's explicit ask; verified in the built HTML that every "Up" link resolves to a real,
  populated parent page at all three new levels plus the existing PLR page's new upward link.
- Bezirk-level pages use the same fixed 12-entry code→name lookup already established on
  `/berlin/area-detail` and `/berlin/area/[code].md` (Bezirk still has no backing `dim_area` row,
  per `dim_area_hierarchy.sql`'s header) — consistent, not a new pattern.
- Ortsteil and Hamburg parity remain correctly out of scope (per #242's existing deferrals).

## Recommendations

- File a follow-up ticket to expose `int_mss_bzr_aggregate` as a proper mart (with its own display-
  fitness geo-DS pass covering the boundary-mismatch caveat) before showing MSS status/Dynamik on
  these coarse pages — do not carry this sign-off forward to that future content.
- When any future page reads a citywide (Berlin-wide) aggregate at these levels, reuse the
  `I19-web-geo-signoff.md`-approved sum(numerator)/sum(weight) formula rather than re-deriving it
  (per that document's own recommendation).

```json
{
  "verdict": "pass",
  "rationale": "All population/composition figures on the new Bezirk/PGR/BZR pages read mart_area_demographics's own already-approved (I19-geo-signoff.md) sum-then-recompute rollup rows verbatim -- no new aggregation is computed in the web layer. Neighbourhood stage-mix is a plain COUNT of child PLR typology_stage values (not a rescored index, honouring I18-geo-signoff.md's explicit constraint), and POI counts are a plain SUM -- both grouped by the already-grounded LOR code-prefix derivation (dim_area_hierarchy.sql, int_mss_bzr_aggregate.sql), not a new spatial method. MSS status/Dynamik-at-BZR was correctly deferred rather than rendered under this sign-off, since int_mss_bzr_aggregate isn't yet exposed as a mart and its own header caveats it as fit for a MAUP research probe, not asserted fit for public display. Static build completed with zero SQL errors across all ~200 new pages after fixing one real UNION-ALL/LIMIT syntax bug found during this pass; bidirectional breadcrumbs verified in built HTML.",
  "risks": [
    "MSS status/Dynamik-at-BZR remains unexposed on these pages pending a follow-up ticket + its own display-fitness pass on int_mss_bzr_aggregate.",
    "Bezirk level still has no backing dim_area row (pre-existing, Epic C); the fixed 12-entry name lookup is a presentation-only workaround, consistent with existing precedent."
  ],
  "recommendations": [
    "File a follow-up ticket to expose int_mss_bzr_aggregate as a mart with its own geo-DS display-fitness pass before rendering MSS content on these pages.",
    "Reuse (not re-derive) the I19-web-geo-signoff.md citywide sum(numerator)/sum(weight) formula if a future citywide comparison is added at these grains."
  ]
}
```
