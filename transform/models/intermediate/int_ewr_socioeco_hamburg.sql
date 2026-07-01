-- int_ewr_socioeco_hamburg.sql
-- #40 H1 methodology-gated integration slice: Hamburg EWR-equivalent composite
-- socio-economic score, the direct city-agnostic analogue of int_ewr_socioeco
-- (Berlin). This is the model that resolves ADR-0014 open question #5 (two-grain
-- reconciliation, Stadtteil -> statistisches Gebiet) and therefore requires the
-- full geo-data-scientist + gentrification-domain-expert sign-off gate (R-C1)
-- before integration into develop.
--
-- Implementation note: the Stadtteil -> Gebiet disaggregation JOIN logic lives
-- in int_ewr_socioeco_hamburg_disagg (a separate materialized table), purely to
-- avoid a DuckDB nested-window-function binder limitation (see that model's
-- header, same pattern as int_poi_share_base/int_poi_status_dynamism's C5
-- split). This model reads that table and applies only the z-score windows.
--
-- =============================================================================
-- Two-grain reconciliation method (ADR-0014 open question #5)
-- =============================================================================
-- Hamburg's open EWR-equivalent predictors ("Regionalstatistische Daten der
-- Stadtteile", stg_hamburg_ewr_stadtteil) publish only at Stadtteil grain
-- (~104-105 areas), while Hamburg's outcome variable (Sozialmonitoring,
-- stg_hamburg_sozialmonitoring) and OSM POI predictor (int_osm_poi_hamburg) are
-- at the finer statistisches-Gebiet grain (~941-945 areas) -- Hamburg's
-- PLR-analogue and the grain int_gentrification_ts must ultimately key on.
--
-- No official or geometric Gebiet->Stadtteil code crosswalk is published
-- alongside the geometry pillar (stg_hamburg_geo's parent_area_code is only
-- wired for Stadtteil->Bezirk, not Gebiet->Stadtteil -- see
-- ingest_hamburg_geo.py WFS_LAYERS, "parent_prop": None for statgebiet).
-- However, the already-ingested Sozialmonitoring pillar (ADR-0014 Pillar 2)
-- carries an informational `stadtteil_name` free-text field per statistisches
-- Gebiet (stg_hamburg_sozialmonitoring.stadtteil_name), which the ingestion
-- docstring explicitly flags as "NOT joined; area_code is the join key" for
-- Sozialmonitoring's own purposes -- but it is exactly the crosswalk this model
-- needs. int_ewr_socioeco_hamburg_disagg is the first consumer of that
-- name-join.
--
-- Method chosen (name-matched containment, NOT proportional/areal-weighted
-- disaggregation) -- implemented in int_ewr_socioeco_hamburg_disagg:
-- 1. Build a Gebiet -> Stadtteil crosswalk by matching
-- stg_hamburg_sozialmonitoring.stadtteil_name (per Gebiet, latest edition) to
-- stg_hamburg_geo.area_name (Stadtteil rows, area_level='subarea_l1') via
-- normalized case/whitespace string match. This is a spatial-containment
-- fact (Sozialmonitoring's Gebiet is administratively nested inside its named
-- Stadtteil), not a statistical estimate.
-- 2. Every Gebiet inherits its parent Stadtteil's EWR-equivalent indicator
-- values UNCHANGED (uniform disaggregation) rather than a population- or
-- area-weighted split. Rationale: Hamburg's open Stadtteil release does not
-- publish a Gebiet-level population weight that would make a defensible
-- proportional split possible (ADR-0014 residence-duration gap note; the
-- Statistikamt Nord XLSX fallback was not pulled in this slice either), and
-- inventing weights from an unrelated source (e.g. Sozialmonitoring's own
-- Gebiet population column, stg_hamburg_sozialmonitoring.population) would
-- conflate the outcome variable's population figure with the predictor
-- pillar in a way ADR-0014 Pillar-2's role discipline (outcome vs predictor
-- separation, mirrors ADR-0006 decision 6) explicitly warns against.
-- 3. This means EVERY Gebiet within the same Stadtteil carries an IDENTICAL EWR
-- composite for a given year -- there is no sub-Stadtteil variation in the
-- predictor pillar. This is a known, explicitly documented resolution-loss
-- property of this slice (analogous to a MAUP "upscaling" cost), not a bug.
-- It must be disclosed on the G2 methodology page once this reaches
-- publication and is exactly the design tension ADR-0014's "Decision on
-- modelling grain" section flagged as needing to be surfaced, not silently
-- dropped.
--
-- =============================================================================
-- Composite score construction
-- =============================================================================
-- Mirrors int_ewr_socioeco's z-score methodology (Thesis Sec.4.2: composite =
-- mean z-score of key vulnerability indicators, computed across areas within a
-- city-year so it lands on the same unit-variance scale as Berlin's
-- ewr_composite for the shared ADR-0005 gentrification_index_ts z-score
-- convention -- see int_gentrification_ts header, "same unit-variance scale").
--
-- Hamburg's narrower ingested indicator set (ADR-0014 Pillar 3, this slice:
-- residents_total, residents_male_share, residents_female_share,
-- age_under18_share, age_65plus_share, foreigners_share, unemployment_share --
-- see stg_hamburg_ewr_stadtteil header) does not have a residence-duration or
-- migration-background field (ADR-0014 open question #3: residence duration not
-- confirmed to exist openly at all for Hamburg; migration_background_share was
-- not part of the Stadtteil primary-source column set pulled in the #40 EWR
-- staging slice). The 5-indicator Berlin composite therefore CANNOT be
-- reproduced 1:1 -- this model uses the 3 comparable indicators that exist in
-- both cities' composites: age_under18_share, foreigners_share, and
-- unemployment_share (Hamburg's unemployment_share is a like-for-like
-- vulnerability indicator not present in Berlin's own composite set, added here
-- since it is directly available and Thesis Sec.4.2-consistent as a
-- socio-economic vulnerability marker).
--
-- hamburg_ewr_composite = mean(z_age_under18_share, z_foreigners_share,
-- z_unemployment_share), z-scored across all Hamburg Gebiete within a
-- (city_code, reference_year) partition (same NULLIF(stddev,0) degenerate-year
-- guard as int_ewr_socioeco). Higher composite = more socio-economically
-- vulnerable (same vulnerability-positive sign convention as Berlin's
-- ewr_composite; see int_ewr_socioeco header for the sign-flip note applied
-- downstream in int_gentrification_ts).
--
-- Cross-city comparability caveat (binding, mirrors B7's cross-vintage z-score
-- note): Hamburg's composite is z-scored within Hamburg's own ~941-945 Gebiet
-- population; Berlin's is z-scored within Berlin's own PLR population. Both are
-- unit-variance by construction WITHIN their own city, but the underlying
-- indicator SET differs (3 vs 5 indicators; Hamburg omits
-- migration_background_share/residence_duration_5y_share, includes
-- unemployment_share which Berlin's composite does not). Cross-city composite
-- MAGNITUDE comparison is not directly valid without accounting for this --
-- flagged for the G2 methodology page exactly as ADR-0014's Pillar-2
-- non-equivalence note requires for Sozialmonitoring.
--
-- is_disaggregated_from_stadtteil: TRUE for all rows in this model (every row
-- inherits its value from Stadtteil grain per the reconciliation method above).
-- Downstream consumers should treat within-Stadtteil Gebiet rows as
-- non-independent observations for any statistical test that assumes iid
-- sampling (e.g. do not naively bootstrap Gebiet rows within a Stadtteil).
--
-- Output grain: (city_code='HH', area_code=Gebiet statgeb id,
-- area_vintage='current', reference_year).
--
-- Graceful degradation: returns zero rows when any upstream has no rows.
--
-- dbt_meta_owner: data-engineer
-- geo-ds-sign-off: PASS WITH CONDITIONS (docs/epic-h/H1-geo-signoff.md, 2026-07-01, issue #40)
-- domain-sign-off: PASS WITH CONDITIONS (docs/epic-h/H1-domain-signoff.md, 2026-07-01, issue #40)
-- depends_on: {{ ref('int_ewr_socioeco_hamburg_disagg') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

with
    with_z as (
        select
            *,
            (
                age_under18_share
                - avg(age_under18_share) over (partition by city_code, reference_year)
            ) / nullif(
                stddev(age_under18_share) over (partition by city_code, reference_year),
                0
            ) as z_age_under18_share,
            (
                foreigners_share
                - avg(foreigners_share) over (partition by city_code, reference_year)
            ) / nullif(
                stddev(foreigners_share) over (partition by city_code, reference_year),
                0
            ) as z_foreigners_share,
            (
                unemployment_share
                - avg(unemployment_share) over (partition by city_code, reference_year)
            ) / nullif(
                stddev(unemployment_share) over (
                    partition by city_code, reference_year
                ),
                0
            ) as z_unemployment_share
        from {{ ref("int_ewr_socioeco_hamburg_disagg") }}
        where reference_year is not null
    )

select
    city_code,
    area_code,
    area_vintage,
    reference_year,
    residents_total,
    age_under18_share,
    foreigners_share,
    unemployment_share,
    is_disaggregated_from_stadtteil,
    z_age_under18_share,
    z_foreigners_share,
    z_unemployment_share,
    -- Hamburg EWR composite (3-indicator; see header for why this differs from
    -- Berlin's 5-indicator composite). Higher = more socio-economically
    -- vulnerable (same sign convention as int_ewr_socioeco.ewr_composite).
    (z_age_under18_share + z_foreigners_share + z_unemployment_share)
    / 3.0 as ewr_composite
from with_z
