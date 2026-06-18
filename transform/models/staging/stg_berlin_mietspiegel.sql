-- stg_berlin_mietspiegel.sql
-- D1 staging view over the Berliner Mietspiegel 2024 seed.
--
-- Source: berlin_mietspiegel_2024 seed (transform/seeds/berlin_mietspiegel_2024.csv).
-- Transcribed from the official PDF published by Senatsverwaltung fuer
-- Stadtentwicklung, Bauen und Wohnen Berlin. The PDF is not redistributed
-- (ADR-0003 item 11); only the transcribed numeric rent values are committed.
--
-- NOTE: the seed is currently header-only (zero data rows) pending manual
-- transcription. This view passes through with zero rows until the seed is
-- populated. See transform/seeds/berlin_mietspiegel_2024_methodology.md for
-- population instructions.
--
-- Output columns:
-- vintage            int32   -- always 2024
-- city_code          varchar -- always 'berlin' (ADR-0005)
-- year_built_bucket  varchar -- construction year bucket (e.g. 'bis_1918')
-- size_bucket        varchar -- apartment size bucket (e.g. 'unter_40')
-- ausstattung        varchar -- equipment level (einfach/mittel/gehoben)
-- wohnlage           varchar -- location tier (einfach/mittel/gut)
-- rent_low           double  -- lower bound EUR/m2/month
-- rent_mid           double  -- midpoint EUR/m2/month
-- rent_high          double  -- upper bound EUR/m2/month
-- source_attribution varchar -- 'Berliner Mietspiegel 2024, Senatsverwaltung ...'
--
-- dbt_meta_owner: data-engineer
{{
    config(
        materialized="view",
        meta={"dbt_meta_owner": "data-engineer"},
    )
}}

select
    vintage,
    'berlin' as city_code,
    year_built_bucket,
    size_bucket,
    ausstattung,
    wohnlage,
    rent_low,
    rent_mid,
    rent_high,
    source as source_attribution
from {{ ref("berlin_mietspiegel_2024") }}
