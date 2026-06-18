-- stg_berlin_mietspiegel.sql
-- D1 staging view over the multi-vintage Berliner Mietspiegel seed.
--
-- Source: berlin_mietspiegel seed (transform/seeds/berlin_mietspiegel.csv).
-- Transcribed from official PDFs published by Senatsverwaltung fuer
-- Stadtentwicklung, Bauen und Wohnen Berlin. PDFs not redistributed
-- (ADR-0003 item 11); only transcribed numeric rent values are committed.
--
-- NOTE: ausstattung is NOT a table dimension in the Mietspiegel. All cells
-- represent standard-equipped apartments (mit SH, Bad, IWC). Apartments
-- without these features use fixed footnote deductions from the table value.
--
-- NOTE: The 1973-1990 year_built_bucket is split into _west / _ost because the
-- 2017 table separates West Berlin (incl. West-Staaken as of 1990-10-02) from
-- East Berlin Wendewohnungen. Later editions merge these; handle in marts.
--
-- Output columns:
-- vintage            int32   -- Mietspiegel edition year (2017, 2019, 2021, 2023, 2024)
-- city_code          varchar -- always 'berlin' (ADR-0005)
-- year_built_bucket  varchar -- construction year bucket (e.g. 'pre_1918', '2003_2015')
-- size_bucket        varchar -- apartment size bucket ('under_40', '40_to_60',
-- '60_to_90', '90_plus')
-- wohnlage           varchar -- location tier ('einfach', 'mittel', 'gut')
-- rent_low           double  -- lower bound of 3/4-Spanne (EUR/m2/month)
-- rent_mid           double  -- Mittelwert/Median (EUR/m2/month)
-- rent_high          double  -- upper bound of 3/4-Spanne (EUR/m2/month)
-- source_attribution varchar -- source citation
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
    wohnlage,
    rent_low,
    rent_mid,
    rent_high,
    source as source_attribution
from {{ ref("berlin_mietspiegel") }}
