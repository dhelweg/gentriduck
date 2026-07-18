-- OA-D7 pass 2 (#240): reads the F2/#34 parquet export directly (same pattern as
-- mart_poi_offering_advantage.sql). Surfaces the nine Offering Advantage calculation methods
-- (ADR-0024, OA-D3/D3b -- nested_lq/global_lq/log_lq/share_diff/shrunk_lq/raw_share/zscore_slq/
-- density/percapita), one row per (area, domain, method) -- already-signed-off values, pure
-- pass-through per mart_poi_oa_methods.sql's own header, not methodology-bearing here.
--
-- Filtered + deduplicated at THIS layer, not a new methodology decision -- purely a client-bundle-
-- size fix (Evidence ships the whole referenced table to the client, same "Evidence ships the
-- whole table" note mart_poi_offering_advantage_map.sql's consumer already flags): the underlying
-- mart's grain is (taxonomy_level x poi_category_h x poi_type_h), so `oa_value` for a given
-- (area, domain, method) at `taxonomy_level = 'domain'` repeats once per category/type leaf under
-- that domain -- selecting the full unfiltered mart here OOM'd `evidence sources` (535k+ rows just
-- from the sibling area-level mart, before this one). This source (a) keeps only `taxonomy_level =
-- 'domain'` (the grain every live chart on /methodology-oa-modes reads -- category/type drill-down
-- is out of this pass's scope, see that page's own header), (b) keeps only `city_code = 'BER'`
-- (also drops a handful of stray non-canonical `city_code` values -- 'berlin', lower-case --
-- observed in the underlying mart at category/type grain; flagged to data-engineer, not fixed
-- here, since this source only ever reads the 'domain' grain those rows may not even affect --
-- see this ticket's PR description), and (c) `select distinct`s away the resulting duplicate rows.
-- No value is altered, aggregated, or re-derived -- every remaining row is copied verbatim from
-- the mart.
select distinct
    city_code,
    snapshot_year,
    area_code,
    area_vintage,
    poi_domain_h,
    weight_variant,
    methodology_variant,
    oa_method,
    oa_value
from read_parquet('../data/serving/mart_poi_oa_methods.parquet')
where city_code = 'BER'
  and taxonomy_level = 'domain'
  and area_vintage = 'lor_2021'
  and weight_variant = 'standard'
  and methodology_variant = 'faithful'
