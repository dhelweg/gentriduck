-- OA-D7 pass 2 (#240): reads the F2/#34 parquet export directly (same pattern as
-- mart_poi_offering_advantage.sql). Surfaces within-group offering-dominance (HHI/top-share/
-- entropy/evenness, ADR-0024 D3, OA-D4) for the curated dominance groups -- pure pass-through
-- per mart_poi_dominance.sql's own header.
--
-- BINDING (OA-D4 forward condition, OA-D0 domain sign-off Condition B.3, carried onto D7 as a
-- pass-2 gate condition): `is_public_safe = true` is applied HERE, at the source layer -- the
-- strongest point this project has to enforce it, since Evidence bundles a source's full result
-- to the client for any page that queries it reactively. This means the cuisine-typed
-- (`gastronomy_restaurant_cuisine`, `is_public_safe = false`) internal-study-only group never
-- reaches the browser at all, not merely a page-level `WHERE` a future page could omit. Any page
-- reading this source additionally restates `is_public_safe = true` in its own SQL (defence in
-- depth, and so the filter's intent is visible at the point it's used, not only here) -- see
-- `/methodology-oa-modes`'s own query comments. Also restricts to `city_code = 'BER'` (Hamburg
-- coverage isn't published yet, matching every other Berlin-only page on this site) purely for
-- bundle size -- no value is altered, aggregated, or re-derived.
select *
from read_parquet('../data/serving/mart_poi_dominance.parquet')
where is_public_safe = true
  and city_code = 'BER'
