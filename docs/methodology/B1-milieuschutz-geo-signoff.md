---
task: B1 / #70 — Berlin Milieuschutz PLR-flag (fourth slice, first integration slice)
author: geo-data-scientist
date: 2026-07-09
branch: feature/70-b1-milieuschutz-plr-flag
---

# Geo-DS methodology sign-off — Milieuschutz PLR flag (`int_berlin_milieuschutz_plr_flag`)

- **Branch:** `feature/70-b1-milieuschutz-plr-flag`
- **Issue / task:** #70 [B1], fourth slice — scoped down from the full displacement/affordability
  sub-index (which would require compositing three incompatible time grains: static Milieuschutz
  polygons, Wohnlage-snapshot-year `rent_pressure_proxy`, EWR-annual `turnover_proxy`) to a single,
  smaller, honestly-scoped step: resolve the already-staged Milieuschutz polygons onto the PLR grain
  as a disclosure flag.
- **Reviewer:** geo-data-scientist (methodology gate, R-C1)
- **Artefacts reviewed:**
  - `transform/models/intermediate/int_berlin_milieuschutz_plr_flag.sql`
  - `transform/models/staging/stg_berlin_milieuschutz.sql` (city_code canonicalization fix)
  - `transform/models/intermediate/schema.yml` / `transform/models/staging/schema.yml` (new/updated
    test blocks)
  - Cross-reference: `docs/adr/0019-berlin-milieuschutz-displacement-source.md` (source decision +
    Open Questions #1/#2), `transform/models/intermediate/int_osm_poi_plr.sql` (precedent spatial-join
    pattern for the point-in-polygon case, deliberately NOT reused here — see (a))

This model is methodology-bearing under R-C1 ("any model that changes ... spatial method") — it
introduces a new polygon-to-polygon spatial join and a disclosure threshold (or explicit
non-threshold) for the resulting flag. It is not a consumer of `gentrification_index` and does not
touch the contract-enforced mart; the blast radius is one new intermediate model.

## a. Is `ST_Intersects` (rather than `ST_Within`) the correct predicate for this join?

**Yes.** I checked the geometry of the problem directly: Milieuschutz designations are bespoke
Kiez-level polygons independently drawn by the Senate for social-preservation purposes, while PLRs
(Planungsräume) are drawn independently for statistical-reporting purposes — the two boundary
systems are not nested or aligned. Empirically (verified against the actual staged data): of 542
`lor_2021` PLRs, 233 (43%) intersect at least one of the 82 designations, with a mean overlap
fraction of 0.19 (i.e., typically a fifth of a PLR's area, not the whole PLR). Requiring full
containment (`ST_Within` on either side) would systematically undercount — a PLR that is 80% covered
by a Milieuschutz Kiez but crosses a PLR boundary at its edge would be excluded entirely, which is
the wrong answer for "is any part of this neighbourhood under a protective designation." `ST_Intersects`
is therefore the correct predicate. I also considered an area-weighted-majority rule
(`overlap_frac > 0.5`) as the flag definition and rejected it for this slice: a majority threshold
is itself an undocumented methodology choice (why 0.5 and not 0.25?) that the model would have to
invent without grounding. Exposing the raw `under_milieuschutz` (any-overlap) boolean *and* the
continuous `milieuschutz_overlap_frac` lets any future consumer (G2, the web layer) apply its own
threshold transparently, rather than this model silently picking one. This is the right call for a
disclosure-only layer — no threshold decision is smuggled in.

## b. Is the CRS handling correct (no silent reprojection error)?

**Yes.** I independently verified both source geometries are natively `EPSG:25833` — Milieuschutz
per ADR-0019's own confirmation, LOR per `stg_berlin_lor`'s documented native CRS — and confirmed by
running the actual spatial join directly against the built parquet files before this sign-off: it
returns 382 (PLR, designation) intersecting pairs across the 542 `lor_2021` PLRs and all 82
designations are matched by at least one PLR (no orphan designations, which would indicate a CRS
mismatch producing spurious non-overlaps). No `ST_Transform` step is needed or present, which is
correct (an unnecessary transform is itself a source of drift risk, not a safety measure).

## c. Is the "current-state only, not a time series" scoping honest and correctly disclosed?

**Yes.** ADR-0019 Open Question #2 already documented that the WFS exposes only the current
designation set. This model does not attempt to fabricate a historical panel from the
`in_force_date`/`earliest_in_force_date` columns — it exposes `earliest_in_force_date` as an
informational "protected since at least this date" marker only, and the model header explicitly
states it is not a reconstructed status panel. This is the correct, minimal claim: inferring "this
PLR was NOT under Milieuschutz before date X" from the absence of an earlier-designation record
would be an unsupported inference (a designation could have existed and been lifted, or the WFS
simply doesn't carry the history) — the model correctly does not make that claim.

## d. Is keeping this out of `gentrification_index` (rather than adding a column) the right scoping call?

**Yes, for this slice.** `gentrification_index` is a `contract={"enforced": true}` mart (ADR-0004) —
adding a column there is a deliberate, larger contract-change decision requiring its own review, and
blending a *binary policy marker* with the *continuous* D1/D2 MSS status/dynamism indices would
require inventing a normalization/weighting rule not asked for or grounded in this slice's scope.
Publishing `int_berlin_milieuschutz_plr_flag` as an independently queryable disclosure layer (per
#70's own acceptance-criteria fallback: "a component OR a parallel published layer") is the more
honest, smaller step. Compositing with `rent_pressure_proxy`/`turnover_proxy` remains explicitly out
of scope here — those live at fundamentally different time grains (Wohnlage-snapshot-year vs.
EWR-annual vs. static-current-state) and forcing them into one number without a grounded alignment
rule is exactly the risk that caused this ticket to be deferred in a prior cycle.

## Verdict

**Verdict: PASS.** The spatial method, CRS handling, current-state scoping, and mart-boundary
decision are all correctly reasoned and grounded. No changes requested.
