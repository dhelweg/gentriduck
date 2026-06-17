-- staging: 2018 thesis golden output at PLR level -- distance-weighted POI variant
-- source:   reference/goldens/20180909_result_full_plr_distcalc.csv  (ODbL)
-- encoding: latin-1  (raum_desc contains German umlauts; area names are proper nouns,
-- kept as-is)
-- 436 rows; key columns only.
-- area_level = 'plr', city_code = 'BER', variant = 'distance_weighted'
-- This is the alternate index variant where POI features are weighted by
-- inverse distance to the area centroid (replaced the Java lormapper UDF in
-- the 2018 pipeline; in Gentriduck this will be reproduced via DuckDB
-- ST_Distance / ST_DWithin -- Epic B3/C).
-- Kept as a separate staging model from stg_thesis_2018_result_plr so the two
-- variants remain independently traceable; they are unioned with a 'variant'
-- discriminator column in int_thesis_2018_area_index.
-- German data values are translated to English at this staging boundary:
-- dynamism: positiv->positive, negativ->negative, neutral->neutral, stabil->stable
-- status:   hoch->high, mittel->medium, niedrig->low, sehr niedrig->very low
-- own index: positiv->positive, negativ->negative, neutral->neutral
{{
    config(
        materialized="view",
        meta={"dbt_meta_owner": "data-engineer"},
    )
}}

select
    cast("r.raum_id" as varchar) as raum_id,
    cast("r.raum_desc" as varchar) as raum_desc,
    cast("r.zeit" as integer) as zeit,
    cast("r.prev_zeit" as integer) as prev_zeit,
    cast("r.ew" as double) as ew,
    cast("r.status_summe" as double) as status_sum,
    cast("r.status_index" as double) as status_index,
    case
        cast("r.status_klasse" as varchar)
        when 'hoch'
        then 'high'
        when 'mittel'
        then 'medium'
        when 'niedrig'
        then 'low'
        when 'sehr niedrig'
        then 'very low'
        else cast("r.status_klasse" as varchar)
    end as status_class_raw,
    cast("r.dynamik_summe" as double) as dynamism_sum,
    cast("r.dynamik_index" as double) as dynamism_index,
    case
        cast("r.dynamik_klasse" as varchar)
        when 'positiv'
        then 'positive'
        when 'negativ'
        then 'negative'
        when 'neutral'
        then 'neutral'
        when 'stabil'
        then 'stable'
        else cast("r.dynamik_klasse" as varchar)
    end as dynamism_class_raw,
    case
        cast("r.status_klasse_prj" as varchar)
        when 'hoch'
        then 'high'
        when 'mittel'
        then 'medium'
        when 'niedrig'
        then 'low'
        else cast("r.status_klasse_prj" as varchar)
    end as status_class,
    case
        cast("r.dynamik_klasse_prj" as varchar)
        when 'positiv'
        then 'positive'
        when 'negativ'
        then 'negative'
        when 'neutral'
        then 'neutral'
        else cast("r.dynamik_klasse_prj" as varchar)
    end as dynamism_class,
    case
        cast("r.status_klasse_prj_bi" as varchar)
        when 'hoch'
        then 'high'
        when 'mittel'
        then 'medium'
        when 'niedrig'
        then 'low'
        else cast("r.status_klasse_prj_bi" as varchar)
    end as status_class_bi,
    case
        cast("r.dynamik_klasse_prj_bi" as varchar)
        when 'positiv'
        then 'positive'
        when 'negativ'
        then 'negative'
        when 'neutral'
        then 'neutral'
        else cast("r.dynamik_klasse_prj_bi" as varchar)
    end as dynamism_class_bi,
    case
        cast("r.own_idx_class" as varchar)
        when 'positiv'
        then 'positive'
        when 'negativ'
        then 'negative'
        when 'neutral'
        then 'neutral'
        else cast("r.own_idx_class" as varchar)
    end as own_idx_class,
    case
        cast("r.own_idx_class_bi" as varchar)
        when 'positiv'
        then 'positive'
        when 'negativ'
        then 'negative'
        when 'neutral'
        then 'neutral'
        else cast("r.own_idx_class_bi" as varchar)
    end as own_idx_class_bi,
    'BER' as city_code,
    'plr' as area_level,
    true as is_distance_weighted
from
    read_csv(
        '{{ var("project_root") }}/reference/goldens/20180909_result_full_plr_distcalc.csv',
        encoding = 'latin-1',
        auto_detect = true
    )
