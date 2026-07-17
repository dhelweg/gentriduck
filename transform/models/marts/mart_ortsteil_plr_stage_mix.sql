-- mart_ortsteil_plr_stage_mix.sql
-- #269 (I-ortsteile): child-PLR typology-STAGE DISTRIBUTION per Ortsteil --
-- e.g. "6 of 9 PLRs dominantly assigned to this Ortsteil are in stage X" --
-- deliberately NOT a re-scored index at Ortsteil grain, matching I18's
-- explicit "no re-scored index at coarser-than-PLR grain" decision (#247,
-- reaffirmed by #267's declining a coarse-index ticket for BZR/PGR/Bezirk;
-- the same reasoning applies to Ortsteil per this ticket's scope note).
--
-- This is the Ortsteil-grain equivalent of the inline `stage_mix` query every
-- BZR/PGR/Bezirk profile page already runs directly against
-- gentriduck_marts.gentrification_index using
-- `substr(area_code, 1, N) = '${params.code}'` (see e.g.
-- web/pages/berlin/area/bzr/[code].md). Ortsteil cannot use that substr()
-- trick (PLR codes do not encode Ortsteil membership -- the whole reason this
-- ticket exists), so the join instead goes through the DOMINANT PLR->Ortsteil
-- assignment (int_berlin_plr_ortsteil_overlap.is_dominant_ortsteil; see that
-- model's header for the method/straddling-PLR count). Pre-materialized here
-- (rather than left for the web layer to join at page-render time) because
-- the web layer only reads gentriduck_marts.*/data/serving parquet exports,
-- not the intermediate crosswalk table directly.
--
-- Source: gentrification_index (ADR-0004 governed mart), variant='live_data'
-- (the current/live typology, not a thesis-era variant), area_level='plr',
-- city_code='BER' -- same variant/level scope every existing coarse-grain
-- stage-mix chart uses. status_class carries the D1xD2 typology_stage name
-- (ADR-0008); NULL for uninhabited PLRs, bucketed here as an explicit
-- 'uninhabited / no data' label (never silently dropped or zero-filled),
-- same convention as the BZR/PGR/Bezirk pages' inline query.
--
-- Grain: one row per (city_code, ortsteil_area_code, period_yyyymm, typology_stage).
-- A consumer wanting "latest snapshot only" filters
-- period_yyyymm = max(period_yyyymm) themselves (same convention as every
-- other period_yyyymm-keyed mart -- this model does not pick "latest" for
-- them, to stay usable for any future trend view too).
--
-- dbt_meta_owner: data-engineer
-- depends_on: {{ ref('gentrification_index') }}
-- depends_on: {{ ref('int_berlin_plr_ortsteil_overlap') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

with
    plr_stage as (
        select city_code, area_code as plr_area_code, period_yyyymm, status_class
        from {{ ref("gentrification_index") }}
        where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
    ),

    dominant_xw as (
        select plr_area_code, ortsteil_area_code, ortsteil_area_name
        from {{ ref("int_berlin_plr_ortsteil_overlap") }}
        where is_dominant_ortsteil
    ),

    joined as (
        select
            ps.city_code,
            xw.ortsteil_area_code,
            xw.ortsteil_area_name,
            ps.period_yyyymm,
            coalesce(ps.status_class, 'uninhabited / no data') as typology_stage
        from plr_stage as ps
        inner join dominant_xw as xw on ps.plr_area_code = xw.plr_area_code
    )

select
    city_code,
    ortsteil_area_code,
    ortsteil_area_name,
    period_yyyymm,
    typology_stage,
    count(*) as n_plr
from joined
group by
    city_code, ortsteil_area_code, ortsteil_area_name, period_yyyymm, typology_stage
