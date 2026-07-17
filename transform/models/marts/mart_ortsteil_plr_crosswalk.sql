-- mart_ortsteil_plr_crosswalk.sql
-- #269 (I-ortsteile): thin display mart exposing int_berlin_plr_ortsteil_overlap
-- to the web layer -- pure pass-through, no new computation (same "thin display
-- mart" pattern as mart_mss_area_aggregate.sql over int_mss_bzr_aggregate, #249).
--
-- WHY THIS EXISTS: int_berlin_plr_ortsteil_overlap is an INTERMEDIATE model --
-- the web layer only reads gentriduck_marts.* (export_serving_parquet.py's
-- MART_MODELS glob only picks up transform/models/marts/*.sql). This mart lets
-- an Ortsteil profile page:
-- 1. list its constituent PLRs (join this mart, filtered to
-- is_dominant_ortsteil, against gentrification_index on plr_area_code
-- = area_code) -- the "children" table, same role
-- substr(area_code, 1, N) plays for BZR/PGR/Bezirk pages.
-- 2. show straddle/confidence diagnostics (overlap_frac_of_plr,
-- n_ortsteil_overlaps) if a page wants to disclose "this PLR is only
-- ~44% inside this Ortsteil" rather than presenting every dominant
-- assignment as equally certain.
--
-- The area-overlap method + dominant-assignment rule themselves are gated at
-- int_berlin_plr_ortsteil_overlap.sql (geo-DS sign-off required, #269 ticket
-- gate) -- this mart does not re-decide or restate that method, only republishes
-- its output for web consumption.
--
-- Grain: one row per (plr_area_code, ortsteil_area_code) pair with a
-- non-trivial overlap (same grain as int_berlin_plr_ortsteil_overlap).
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('int_berlin_plr_ortsteil_overlap') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

select
    city_code,
    plr_area_code,
    ortsteil_area_code,
    ortsteil_area_name,
    bezirk_code,
    plr_area_m2,
    overlap_area_m2,
    overlap_frac_of_plr,
    is_dominant_ortsteil,
    n_ortsteil_overlaps
from {{ ref("int_berlin_plr_ortsteil_overlap") }}
