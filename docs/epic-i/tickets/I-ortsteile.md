# [I-ortsteile] Berlin Ortsteile (96 Stadtteile) hierarchy pages

- **Issue:** [#269](https://github.com/dhelweg/gentriduck/issues/269)
- **Tier:** 3 · **Epic:** i · **Labels:** `epic-i,dbt,ui`
- **Filed:** 2026-07-14, from the deferred-work audit ([index](../../planning/deferred-work-audit-2026-07.md))

---

**Why:** I18 (#242) scoped Berlin's 96 Ortsteile (Stadtteile) **explicitly out of scope v1** — "an open question for geo-DS in the sign-off; a follow-up ticket if wanted" — because Ortsteile are a non-LOR geography that does not nest cleanly into the PLR hierarchy. `dim_area_hierarchy.sql` carries the same note ("the Berlin Ortsteil non-nesting case … a follow-up ticket can add this"). Not filed.

**Goal:** Add Berlin Ortsteil-level profile pages (and the underlying `dim_area` rows) for the 96 Stadtteile, resolving the non-nesting relationship to PLRs.

**Scope:**
- Ingest Ortsteil geometry; add Ortsteil `dim_area` rows + the (non-strict) PLR↔Ortsteil relationship (area-overlap crosswalk, since it doesn't nest cleanly).
- Ortsteil profile pages following the I18 template (sums + child-stage distribution only; no re-scored index, consistent with I18 — coarse index is its own ticket).
- Document the non-nesting handling and any PLRs that straddle Ortsteil boundaries.

**Acceptance:**
- Ortsteil `dim_area` rows + crosswalk built with tests; profile pages render for the 96 Ortsteile; non-nesting handling documented; `uv run poe build` green.

**Gate:** DE + web pair → reviewers; geo-DS sign-off on the crosswalk/rollup rules (methodology-adjacent).

**Deps:** I18 (#242, closed), I18-web (#247), `dim_area_hierarchy`. Not blocking anything.

**Source (why this is unfiled work):** `docs/epic-i/tickets/I18-geo-hierarchy-pages.md` ("Berlin 'Stadtteile' (Ortsteile, 96): explicitly out of scope v1 … a follow-up ticket if wanted"); `transform/models/intermediate/dim_area_hierarchy.sql`.
