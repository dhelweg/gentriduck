-- int_ewr_socioeco_hamburg.sql
-- #40 H1 methodology-gated integration slice: Hamburg EWR-equivalent composite
-- socio-economic score, the direct city-agnostic analogue of int_ewr_socioeco
-- (Berlin). This is the model that resolves ADR-0014 open question #5 (two-grain
-- reconciliation, Stadtteil -> statistisches Gebiet) and therefore requires the
-- full geo-data-scientist + gentrification-domain-expert sign-off gate (R-C1)
-- before integration into develop.
--
-- STANDING REQUIREMENT (H1 geo-signoff Condition 2, re-homed via #265/H-reg-SE -- see
-- docs/epic-h/EPIC-H-METHODOLOGY.md): this composite is estimated at Stadtteil grain
-- (~104-105
-- areas) and disaggregated onto Gebiet grain (~941-945 areas) below. Any future
-- regression that
-- includes ewr_composite or the z_* columns at Gebiet grain must cluster standard
-- errors at
-- Stadtteil grain (or aggregate the whole spec to Stadtteil grain) and report the
-- effective N
-- honestly (~104, not ~941) -- a change-of-support/MAUP issue, not a stylistic choice.
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
-- reproduced 1:1 -- this model uses the 2 comparable indicators that are both
-- (a) available in the ingested Hamburg source set and (b) genuinely
-- independent D4 predictors: age_under18_share and foreigners_share.
--
-- #329 (2026-07-31) -- unemployment_share EXCLUDED from the D4 composite
-- (predictor/outcome conflation, mirrors ADR-0008's D1/predictor role
-- discipline):
-- Hamburg's D1 outcome variable, the Sozialmonitoring Statusindex/Gesamtindex
-- (ADR-0014 §2, "Social outcome (MSS-equivalent)"), is itself constructed by
-- the city from SEVEN "Aufmerksamkeitsindikatoren" that explicitly include
-- unemployment (migration-background youth, single-parent children, SGB-II
-- share, UNEMPLOYMENT, Mindestsicherung for children and for elderly,
-- Schulabschluss -- see ADR-0014 §2). Including unemployment_share in Hamburg's
-- D4 predictor composite therefore makes D4 partly measure the same underlying
-- construct as D1 -- any Hamburg D4->D1 lead-lag/regression finding
-- (int_hamburg_lead_lag, analysis/e5_hamburg_lead_lag.py) would be partly
-- self-predicting rather than testing an independent predictor->outcome
-- relationship. This is architecturally the SAME conflation ADR-0008 requires
-- D3/D4 predictors to stay free of relative to D1/D2 outcomes (ADR-0008 "four
-- dimensions" table: D4 is a PREDICTOR, D1 is the OUTCOME; they "may only be
-- fused at the composite/typology layer, never silently averaged into one
-- input"). Berlin's own int_ewr_socioeco.sql composite never includes any
-- unemployment/Arbeitslosigkeit indicator for the identical reason: Berlin's
-- `arbeitslose_anteil` lives on the MSS (D1/D2 outcome) side
-- (stg_berlin_mss_indicators, R-A4-geo-signoff.md), never in the EWR (D4
-- predictor) indicator set consumed here -- so Berlin's composite was already
-- structurally immune to this conflation without ever needing an explicit
-- exclusion line; Hamburg's single combined EWR-equivalent source (which
-- happens to publish unemployment_share alongside genuinely independent
-- demographic fields) required this explicit fix instead. Found as a
-- side-finding during #313 (independently flagged by both geo-data-scientist
-- and gentrification-domain-expert in design consultation) and filed
-- separately as #329 so it would not block #313's own scope.
--
-- unemployment_share REMAINS in this model's SELECT list as a plain
-- passthrough/display field (consumed by mart_area_demographics as a
-- standalone descriptive indicator per #313 -- that use is NOT circular, since
-- mart_area_demographics never reads or derives from ewr_composite). Only its
-- role as a D4 composite INPUT is removed; z_unemployment_share (the z-score
-- column) is dropped entirely since nothing downstream should consume it.
--
-- hamburg_ewr_composite = mean(z_age_under18_share, z_foreigners_share),
-- z-scored across all Hamburg Gebiete within a (city_code, reference_year)
-- partition (same NULLIF(stddev,0) degenerate-year guard as int_ewr_socioeco).
-- Higher composite = more socio-economically vulnerable (same
-- vulnerability-positive sign convention as Berlin's ewr_composite; see
-- int_ewr_socioeco header for the sign-flip note applied downstream in
-- int_gentrification_ts).
--
-- Cross-city comparability caveat (binding, mirrors B7's cross-vintage z-score
-- note): Hamburg's composite is z-scored within Hamburg's own ~941-945 Gebiet
-- population; Berlin's is z-scored within Berlin's own PLR population. Both are
-- unit-variance by construction WITHIN their own city, but the underlying
-- indicator SET differs (2 vs 5 indicators; Hamburg omits
-- migration_background_share/residence_duration_5y_share/mean_age_years, and
-- (post-#329) also excludes unemployment_share as a predictor-side conflation
-- risk). Cross-city composite MAGNITUDE comparison is not directly valid
-- without accounting for this -- flagged for the G2 methodology page exactly
-- as ADR-0014's Pillar-2 non-equivalence note requires for Sozialmonitoring.
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
-- geo-ds-sign-off: PASS WITH CONDITIONS (docs/epic-h/H1-geo-signoff.md, 2026-07-01,
-- issue #40)
-- domain-sign-off: PASS WITH CONDITIONS (docs/epic-h/H1-domain-signoff.md,
-- 2026-07-01, issue #40)
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
            ) as z_foreigners_share
        -- #329: z_unemployment_share intentionally NOT computed here.
        -- unemployment_share
        -- is an MSS/Sozialmonitoring D1-outcome attention-indicator (ADR-0014 §2),
        -- not an
        -- independent D4 predictor -- see model header. It stays available raw,
        -- below, as
        -- a passthrough display column only.
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
    -- unemployment_share: raw passthrough display field only (#313
    -- mart_area_demographics
    -- standalone indicator). Deliberately EXCLUDED from ewr_composite below -- #329,
    -- see header (predictor/outcome conflation with Hamburg's D1 Sozialmonitoring
    -- Statusindex, ADR-0014 §2, mirroring Berlin's arbeitslose_anteil exclusion,
    -- ADR-0008).
    unemployment_share,
    is_disaggregated_from_stadtteil,
    z_age_under18_share,
    z_foreigners_share,
    -- Hamburg EWR composite (2-indicator, post-#329; see header for why this differs
    -- from Berlin's 5-indicator composite and from this model's own pre-#329
    -- 3-indicator composite). Higher = more socio-economically vulnerable (same sign
    -- convention as int_ewr_socioeco.ewr_composite).
    (z_age_under18_share + z_foreigners_share) / 2.0 as ewr_composite
from with_z
