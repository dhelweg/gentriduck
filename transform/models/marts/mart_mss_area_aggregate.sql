-- mart_mss_area_aggregate.sql
-- #249 (I18-web-b, follow-on to #247/I18-web slice 2): thin display mart exposing
-- int_mss_bzr_aggregate (B10, #120) at BZR and Bezirk grain to the web layer.
--
-- WHY THIS EXISTS (not a new methodology model):
-- int_mss_bzr_aggregate is an INTERMEDIATE model -- the web layer only reads
-- gentriduck_marts.* (export_serving_parquet.py's MART_MODELS glob only picks up
-- transform/models/marts/*.sql). #247's I18-web-geo-signoff.md explicitly deferred
-- rendering MSS status/Dynamik at BZR/Bezirk grain for exactly this reason, AND
-- because int_mss_bzr_aggregate's own header caveats it as "fit for the directional
-- MAUP probe but may mis-stage boundary BZRs/Bezirke" -- approved for a research
-- comparison (B10, #120), not yet asserted fit for public display. This ticket's
-- own geo-DS pass (docs/epic-i/I249-web-b-geo-signoff.md) is exactly that display-
-- fitness check; it does NOT re-review the aggregation formula itself (already
-- signed off under B10/#120) -- see that model's header for the formula citation
-- (Thesis §3.2, pp. 55-56).
--
-- SCOPE: pure pass-through/rename, no new computation.
-- - Berlin only (city_code = 'BER'), matching every other I18-web mart's current scope
-- (Hamburg parity deferred to after H3, #237, same convention as
-- mart_area_demographics).
-- - snapshot_year renamed to reference_year to match mart_area_demographics' column
-- naming convention (both are "the calendar year this area-level snapshot represents"),
-- for a consistent join key across the two marts on I18-web pages.
-- - Only the display-relevant columns are exposed: status_index, dynamik_index,
-- typology_stage, n_plr. status_score/dynamism_score/ewr_composite/demographic
-- shares are intentionally NOT re-exposed here -- mart_area_demographics (#243)
-- already publishes the demographic shares at these same grains, and re-publishing
-- the underlying z-scores here would invite a second, uncurated "index" reading
-- alongside the actual gentrification_index mart (which stays PLR-only, #247
-- geo-signoff item 2). This mart is scoped to the MSS status/Dynamik CLASSIFICATION
-- only, framed with the confidence caveats in I249-web-b-domain-signoff.md.
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('int_mss_bzr_aggregate') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

select
    city_code,
    area_level,
    area_code,
    area_vintage,
    snapshot_year as reference_year,
    status_index,
    dynamik_index,
    typology_stage,
    n_plr
from {{ ref("int_mss_bzr_aggregate") }}
where city_code = 'BER'
