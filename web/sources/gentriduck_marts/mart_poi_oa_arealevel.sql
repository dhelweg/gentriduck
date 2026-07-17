-- OA-D7 pass 2 (#240): reads the F2/#34 parquet export directly (same pattern as
-- mart_poi_offering_advantage.sql). Surfaces the canonical nested-LQ Offering Advantage rolled
-- up to bzr/pgr/bezirk grain (ADR-0024 D2, OA-D2/D6) plus the `maup_caveat_required` and
-- `area_level_publish_tier` disclosure columns this mart computes at the data layer --
-- already-signed-off values, pure pass-through per mart_poi_oa_arealevel.sql's own header, not
-- methodology-bearing here.
--
-- Filtered + deduplicated at THIS layer, not a new methodology decision -- purely a client-bundle-
-- size fix (Evidence ships the whole referenced table to the client): the underlying mart's grain
-- is (area_level x area_vintage x poi_category_h x poi_type_h), so `oa_domain` for a given
-- (area_level, area, domain) repeats once per category/type leaf, and again once per boundary
-- vintage -- selecting the full unfiltered mart (535,977 rows) OOM'd `evidence sources`. This
-- source (a) drops `area_level = 'plr'` (the same canonical nested-LQ PLR figure is already live,
-- at finer category/type grain, via `mart_poi_offering_advantage_map` on `/berlin/poi-map` --
-- re-exposing the full PLR roll-up here would be the single biggest contributor to the row count
-- for a figure already published elsewhere), (b) keeps only `area_vintage = 'lor_2021'` (the
-- current, 2021+ boundary vintage -- the only one the exported bzr/pgr/bezirk choropleth geometry
-- at `web/static/geo/{bzr,pgr,bezirk}_lor2021.geojson` matches; #149's "geometry vintage must
-- match the query vintage" lesson applied up front rather than repeated), (c) keeps only
-- `city_code = 'BER'` (Hamburg has no rows in this mart yet), and (d) `select distinct`s away the
-- resulting category/type duplicate rows. No value is altered, aggregated, or re-derived -- every
-- remaining row is copied verbatim from the mart.
select distinct
    city_code,
    snapshot_year,
    area_level,
    area_code,
    area_vintage,
    poi_domain_h,
    weight_variant,
    methodology_variant,
    oa_domain,
    oa_domain_min_base_flag,
    maup_caveat_required,
    area_level_publish_tier
from read_parquet('../data/serving/mart_poi_oa_arealevel.parquet')
where city_code = 'BER'
  and area_level in ('bzr', 'pgr', 'bezirk')
  and area_vintage = 'lor_2021'
