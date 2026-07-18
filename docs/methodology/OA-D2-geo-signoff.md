# OA-D2 (#240, ADR-0024) — geo-data-scientist R-C1 sign-off

- **Reviewer:** geo-data-scientist (spatial/statistical methodology gate)
- **Artifact under review:** `int_poi_offering_advantage_arealevel.sql` + its schema.yml entry +
  `test_c1b_oa_arealevel_mass_conservation_invariance.sql` — the area-hierarchy roll-up of the
  faithful nested-LQ (`oa_domain`/`oa_category`/`oa_type`) to `bzr`/`pgr`/`bezirk`, on top of the
  existing PLR-grain `int_poi_offering_advantage`.
- **Date:** 2026-07-17
- **Grounding (R-C2):** `docs/methodology/OA-D0-geo-signoff.md` Conditions C1 (prefix-sum roll-up),
  C2 (stock-first/LQ-last/broadcast-once denominator), C6 (blocking invariance test design);
  `spatial-methods.md` §11.1/§11.3; `int_poi_offering_advantage.sql`; `dim_area_hierarchy.sql`
  (LOR RAUMID prefix nesting, the same derivation reused here).

---

## Verdict: PASS

D2 is a narrow, mechanical execution of conditions I already specified and PASSed in OA-D0 — it does
not introduce a new methodology decision, so this is a conformance review, not a fresh design review.

## What I checked

1. **C1 (prefix-sum, not re-kernel):** `int_poi_offering_advantage_arealevel.sql` sums
   `type_stock_local` — already the mass-conserved output of `int_poi_offering_advantage` — grouped by
   `substr(plr_code, 1, N)` for N = 6/4/2 (bzr/pgr/bezirk). No re-kernelling, no re-touching of
   `fct_poi_development` or `int_osm_poi_plr_weighted`. Confirmed against the model SQL and the LOR
   RAUMID nesting `dim_area_hierarchy.sql` already documents and empirically validates
   (`test_dim_area_hierarchy_lor_vintage_coverage.sql`, `test_dim_area_hierarchy_bezirk_vintage_stable.sql`).
   The prefix-sum is computed within a single `area_vintage` partition (never across the 2021 reform
   seam) — correct.
2. **C2 (broadcast-once city denominator):** the `*_stock_city` columns are carried through via
   `max()` over the group-by (a no-op aggregator on an already-constant value, not a re-derivation) for
   the bzr/pgr/bezirk CTEs, and passed straight through unchanged for the `plr` pass-through rows. The
   LOCAL bases (`category_stock_local`, `domain_stock_local`, `all_domains_stock_local`) are the only
   columns re-windowed, correctly re-partitioned by `(area_level, area_code)` instead of `area_code`
   alone. This is exactly the I15-class-bug guard C2 requires — verified by reading the `with_local_bases`
   CTE: it windows only over `type_stock_local`, never over a `*_stock_city` column.
3. **C6 (blocking test):** `test_c1b_oa_arealevel_mass_conservation_invariance.sql` implements both
   required assertions — (a) `Σ local == city_stock` per level, and (b) `city_stock` identical across
   all four `area_level` values (the specific broadcast-denominator guard). Ran it against the live
   warehouse: **0 violation rows**, confirming the invariant holds in practice, not just by
   construction. Same `abs(diff) > 0.01` float tolerance as the sibling PLR-level C-1 test — consistent.
4. **Bezirk row sanity:** confirmed exactly 12 distinct `bezirk` area codes in the built table (matches
   Berlin's 12 administrative Bezirke) and that `oa_domain` values are plausible (0.76–0.99 range on a
   sample), not degenerate/constant. Row counts scale sensibly across levels
   (plr 290,341 > bzr 144,367 > pgr 79,090 > bezirk 22,179 — monotonically shrinking as expected for a
   coarser grain over the same taxonomy leaves and years).
5. **Scope discipline:** the model correctly restricts itself to `city_code = 'BER'` and defers
   Hamburg (D8, blocked on the unresolved `subarea_l2 -> subarea_l1` edge), the "everything" method set
   (D3), the completeness-contamination gate (C3, a D5 deliverable), the §7 MAUP rank-stability check
   (C5, also D5), and Bezirk dissolved geometry (D6/C8) — all correctly out of scope for D2 and flagged
   as such in the model header rather than silently omitted.

## Minor observations (non-blocking)

- The model computes Bezirk-level LQs with no backing `dim_area`/geometry row yet (as documented) — a
  consumer joining this to `dim_area` for e.g. a name lookup will get NULLs at `bezirk` until D6 lands.
  Not a defect; correctly flagged in both the model header and schema.yml description.
- `oa_category_min_base_flag`/`oa_type_min_base_flag` are (correctly, by construction, mirroring the
  PLR-grain model) identical on every row since both key off `domain_stock_local`. No change needed.

## Untrusted input (SEC-3)

This review consumed only in-repo code, the OA-D0 sign-off docs, and the live warehouse query results —
no external/untrusted content.

**Verdict: PASS**
