-- test_358_status_trend_live_data_only.sql
-- #358 (docs/epic-g/358-spec.md Rev. 1 §1/§2; geo review C1/C3):
-- (a) the four #358 columns are live_data-only: every non-live_data row (the 2018
-- thesis variants 'standard'/'distance_weighted' and the 'improved' predictor
-- variant, whose dynamism_class is a POI-dynamism projection, not the official
-- Dynamik) must carry NULL in typology_stage, stage_number, stage_label and
-- status_trend;
-- (b) on live_data rows status_trend must agree with the existing dynamism_class
-- relabel of the same D2 Dynamik ordinal (positive -> Improving, neutral -> Stable,
-- negative -> Worsening, NULL -> No trend on record; index-definition.md §1.4,
-- sign confirmed in docs/epic-g/358-spec-geo-review.md §1).
--
-- Returns rows that VIOLATE the invariant. Zero rows = pass.
select
    city_code,
    area_level,
    area_code,
    period_yyyymm,
    variant,
    dynamism_class,
    typology_stage,
    stage_number,
    stage_label,
    status_trend
from {{ ref("gentrification_index") }}
where
    (
        variant <> 'live_data'
        and (
            typology_stage is not null
            or stage_number is not null
            or stage_label is not null
            or status_trend is not null
        )
    )
    or (
        variant = 'live_data'
        and status_trend is distinct from (
            case
                when dynamism_class is null
                then 'No trend on record'
                when dynamism_class = 'positive'
                then 'Improving'
                when dynamism_class = 'neutral'
                then 'Stable'
                when dynamism_class = 'negative'
                then 'Worsening'
            end
        )
    )
