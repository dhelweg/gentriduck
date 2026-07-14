# I18 (#242) — Geo-hierarchy area pages, slice 1 (data: `dim_area_hierarchy` + PGR ingestion): geo-data-scientist sign-off

**Ticket:** `docs/epic-i/tickets/I18-geo-hierarchy-pages.md`
**Branch:** `feature/242-i18-geo-hierarchy` (diffed against `develop`)
**Reviewer:** geo-data-scientist (spatial/statistical methodology gate, R-C1, ticket-mandated gate)
**Date:** 2026-07-12

## Scope of this sign-off

This is **slice 1** of I18: the data layer only — `pgr` added to `dim_area`/`seed_dim_area_level`,
and the new `dim_area_hierarchy` model deriving parent/child edges for both cities. **Not in this
slice:** the web pages, breadcrumbs, and the Phase-1 coarse-grain rollup content (EWR sums,
`int_mss_bzr_aggregate` BZR read, POI counts, stage-distribution). Those land in a follow-up slice
and need their own review pass before they render publicly — this sign-off does not cover them.

## Verdict: PASS

## What I verified

1. **LOR code-prefix nesting method (R-C2).** Berlin's 8-digit PLR RAUMID scheme nests by
   construction (`BBZRZZLL`); `dim_area_hierarchy.sql`'s substr-based derivation for
   PLR→BZR→PGR→Bezirk is the same derivation `int_mss_bzr_aggregate.sql`'s already-reviewed
   "CODE HIERARCHY" comment documents and uses (B10/#120). No new spatial method introduced — this
   is a re-application of an existing, already-vetted derivation to one more level (PGR).

2. **Found and required a fix for a real data-quality bug.** Initial `uv run poe build` on this
   branch failed `relationships_dim_area_hierarchy_parent_area_code…` with 343 violations. Root
   cause: `int_thesis_2018_area_index` carries some thesis-golden PLR `raum_id`s with the leading
   zero dropped for Bezirk 1-9 (7-char codes, e.g. `'1033102'` not `'01033102'`) — a known,
   already-documented quirk (see that model's own header and `stg_thesis_2018_result_plr_oa.sql`'s
   `lpad` convention) that flows unpadded into `dim_area` (which has no padding step). The fix
   applies `lpad(area_code, 8, '0')` before the PLR→BZR substr, mirroring the existing repo
   convention rather than inventing a new one; scoped to `dim_area_hierarchy.sql` only (does not
   touch `dim_area`/`int_thesis_2018_area_index`'s wider blast radius). Re-ran full
   `uv run poe build`: all 774 nodes, PASS=762 WARN=4 (pre-existing, unrelated) ERROR=0. Re-ran
   `dim_area_hierarchy`'s own test slice + the two new singular tests standalone: all green.

3. **Bezirk-stability empirical check.** `test_dim_area_hierarchy_bezirk_vintage_stable.sql`
   reuses the existing `int_berlin_lor_crosswalk_dominant_2021` (QA-7b/#205) rather than minting a
   new crosswalk, confirming 0/542 mismatches between vintages at the Bezirk digit-prefix — correct
   empirical grounding for the claim in the model header (not asserted un-tested).

4. **Both-vintage coverage check.** `test_dim_area_hierarchy_lor_vintage_coverage.sql` checks the
   nesting against the vintage-tagged staging models directly (not the vintage-collapsed
   `dim_area`), catching a same-vintage code-prefix mismatch or partial ingestion. Correct design —
   more precise than checking the collapsed dimension, which cannot express "same vintage."

5. **Ortsteil (96, non-LOR) correctly out of scope v1**, recorded as an open question rather than
   silently ignored — agreed: Ortsteil boundaries don't nest with PLRs, and picking a
   spatial-containment crosswalk method is itself a MAUP-adjacent decision that needs its own gate.
   No objection to deferring; flag it as a candidate follow-up ticket for the PM backlog, not urgent.

6. **Hamburg edge is source-provided, not derived** (`stg_hamburg_geo`'s WFS `bezirk` property),
   correctly distinguished from the Berlin code-derivation in the model header. `subarea_l2` (Gebiet)
   → `subarea_l1` (Stadtteil) is correctly NOT resolved here — the model's own header documents (with
   a live 2026-07-12 WFS check) that Gebiet IDs don't nest by prefix and the only existing link
   (EWR disaggregation crosswalk) is scoped/signed-off for a different purpose (H1) and doesn't cover
   all ~943 Gebiete. Minting a new geometric crosswalk here would be exactly the kind of new spatial
   method choice this gate exists to catch — correctly flagged as future work, not silently done.

7. **`uv run poe lint`** clean (ruff + sqlfluff).

## Risks / notes (non-blocking)

- PGR/BZR code *values* differ between LOR vintages (2021 reform renumbered them); the model's
  header correctly notes this does NOT affect the derivation itself (each vintage's own code string
  yields its own vintage's parent). Worth keeping in mind when slice 2 builds any cross-vintage
  PGR/BZR display logic.
- The Phase-1 rollup rules (sum-then-recompute for EWR/population, stage-distribution framing,
  `int_mss_bzr_aggregate` reuse at BZR) are **not yet implemented** in this slice — they still need
  a geo-DS pass (sum vs. average-of-shares correctness) before that content renders on any page.
  Do not treat this sign-off as covering that later slice.
- Bezirk itself (`area_level='bezirk'`) still has no backing `dim_area` row (Epic C, pre-existing,
  documented) — `dim_area_hierarchy`'s Bezirk-parent edges correctly point at a code that doesn't
  yet resolve to a dimension row; the relationships test correctly excludes `parent_area_level =
  'bezirk'` for this reason. Not a defect, just a known gap to close later.

## Recommendations

- File slice 2 (coarse-page content + web routes) as its own PR/ticket-slice with its own geo-DS
  pass on the sum-then-recompute rules before anything renders — do not carry this PASS forward to
  that content.
- Consider a small standalone data-quality ticket to fix the unpadded thesis PLR `raum_id`s at the
  source (`int_thesis_2018_area_index.sql`) rather than defensively re-padding in every consumer;
  out of scope here (large blast radius, self-consistent today) but worth tracking. **(Follow-up now tracked: #266 (QA-raumid) — see `docs/planning/deferred-work-audit-2026-07/README.md`.)**

```json
{
  "verdict": "pass",
  "rationale": "dim_area_hierarchy re-applies the already-reviewed LOR code-prefix nesting derivation (int_mss_bzr_aggregate, B10/#120) to one more level (PGR); no new spatial method. Found and fixed a real referential-integrity bug (343 violations) caused by a known, pre-existing unpadded-PLR-code quirk in int_thesis_2018_area_index, scoped to a local lpad fix mirroring the repo's existing convention. Bezirk-vintage-stability and both-vintage-coverage claims are test-verified, not asserted. Ortsteil and Hamburg Gebiet-Stadtteil gaps correctly deferred as open questions rather than silently resolved. Full uv run poe build green (774 nodes, ERROR=0); lint clean.",
  "risks": [
    "Phase-1 rollup rules (EWR sum-then-recompute, MSS BZR reuse, stage-distribution) not yet implemented in this slice; needs its own review before it renders.",
    "Bezirk level still has no backing dim_area row (pre-existing, Epic C); hierarchy edges correctly anticipate this.",
    "PGR/BZR code values differ across LOR vintages; relevant for slice 2's display logic."
  ],
  "recommendations": [
    "Gate slice 2 (coarse-page rollup content + web routes) with its own geo-DS pass before it renders.",
    "Track a follow-up data-quality ticket for the unpadded thesis PLR raum_id source bug (currently defensively worked around, not fixed at source)."
  ]
}
```
