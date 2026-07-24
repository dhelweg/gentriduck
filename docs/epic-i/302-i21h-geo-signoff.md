# I21-h (#302) — Hamburg subarea-hierarchy crosswalk export: geo-data-scientist R-C1 sign-off

- **Reviewer:** geo-data-scientist (spatial/statistical methodology gate, R-C1)
- **Branch:** `feature/302-i21h-hamburg-hierarchy-crosswalk` (commits `7979280a`, `65fde0dc`),
  diffed against `develop`.
- **Date:** 2026-07-24
- **Artifact under review:** new thin pass-through mart
  `transform/models/marts/mart_area_hierarchy.sql` + its `schema.yml` block +
  `web/sources/gentriduck_marts/mart_area_hierarchy.sql` Evidence source, plus wiring of three
  Hamburg area-scaffold pages (`web/pages/hamburg/area/[code].md`, `.../subarea_l1/[code].md`,
  `.../district/[code].md`) to query it for their "Up:"/children hierarchy nav.

## Scope framing

This is an **export/publication event, not a new spatial method**. The gate applies because the
change touches a methodology-bearing surface (a mart publishing a spatial-crosswalk result to the
web layer for the first time), but the underlying method is unchanged. My review verifies exactly
that claim rather than re-adjudicating the crosswalk.

## Findings

1. **No new computation (verified).** `mart_area_hierarchy.sql`'s body is
   `select city_code, area_level, area_code, parent_area_level, parent_area_code from
   {{ ref("dim_area_hierarchy") }}` — a bare projection whose column list is byte-for-byte identical
   to `dim_area_hierarchy.sql`'s own final `select` (line 354). No filter, join, aggregation, CRS
   op, or re-derivation is introduced. The `web/sources/...` file is a pass-through
   `select * from read_parquet(...)`. This is the same "thin display mart" pattern already used by
   `mart_ortsteil_plr_crosswalk` (#269) and `mart_mss_area_aggregate` (#249).

2. **The cited OA-D1b sign-off genuinely exists and was PASS (verified).**
   `docs/methodology/OA-D1b-geo-signoff.md` records `Verdict: PASS` (geo-DS, 2026-07-17) for the
   Hamburg `subarea_l2 → subarea_l1` `ST_Within(centroid, parent_geom)` crosswalk on exactly the
   `hh_l2_geoms` / `hh_l1_geoms` / `hh_l2_centroids` / `hh_l2_primary` / `hh_l2_fallback` /
   `hh_l2_to_l1` CTEs. `docs/methodology/OA-D1b-domain-signoff.md` records `Verdict: PASS`. The dual
   gate for the method was satisfied before it reached `develop`; this ticket does not re-open it.

3. **R-C2 grounding in the new mart header is accurate and sufficient.** The header cites OA-D1b
   (#240, ADR-0024 D4) and defers to `dim_area_hierarchy.sql`'s header for the full method and
   grounding, correctly declares the commit "export/wiring only," and states the grain (one row per
   resolved parent/child edge). This matches the actual model. No uncited methodology change.

4. **Berlin edges are unaffected.** The mart publishes all edge families verbatim (LOR prefix-nested
   PLR→BZR→PGR→Bezirk, Ortsteil→Bezirk, Hamburg subarea_l1→district and subarea_l2→subarea_l1).
   Nothing about Berlin's already-published edges is re-derived, filtered, or changed — they simply
   appear in a mart for the first time via the same pass-through.

5. **Grain / row-count sanity.** The `unique_combination_of_columns(city_code, area_level,
   area_code)` test correctly asserts the edge grain (one parent per child — the model's documented
   invariant, which the Ortsteil↔PLR non-nesting case is deliberately excluded from). The
   reviewer's reported 2532-row breakdown (990+281+117 Berlin LOR + 97 Ortsteil + 104 HH
   subarea_l1→district + 943 HH subarea_l2→subarea_l1) is consistent with the CTE structure: the
   943 HH L2→L1 rows match the OA-D1b spike's 941 primary + 2 fallback = full coverage of the 943
   deduped Gebiete, and the one-parent-per-child grain holds. dbt build 7/7 pass is accepted from
   the data-engineer-reviewer's independent recomputation.

## Risks / residuals (non-blocking)

- The 2 fallback Gebiete ('90001', '106001') and the 6.5 km fallback distance were already flagged
  and accepted under OA-D1b (recommendation tracked in #282). Publishing them to the web layer does
  not change that residual; the affected pages disclose the crosswalk provenance.
- Reference page `reference/area-hierarchy.md` still describes the L2→L1 edge as unresolved (stale
  pre-OA-D1b text). The pages correctly flag this for correction under I21-j. Documentation-only, out
  of this ticket's scope.

## Untrusted input (SEC-3)

No non-maintainer issue/comment text or fetched web content was relied on for this sign-off; review
was against repository artifacts only.

Verdict: PASS
