-- staging: 2018 thesis golden output at PLR (Planungsraum) level
-- source:   reference/goldens/20180909_result_full_plr.csv  (ODbL)
-- encoding: latin-1  (raum_desc contains German umlauts)
-- 436 rows; key columns only — full 1722-column CSV not carried forward.
-- area_level = 'plr', city_code = 'BER', variant = 'standard'
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
    cast("r.status_summe" as double) as status_summe,
    cast("r.status_index" as double) as status_index,
    cast("r.status_klasse" as varchar) as status_klasse,
    cast("r.dynamik_summe" as double) as dynamik_summe,
    cast("r.dynamik_index" as double) as dynamik_index,
    cast("r.dynamik_klasse" as varchar) as dynamik_klasse,
    cast("r.status_klasse_prj" as varchar) as status_klasse_prj,
    cast("r.dynamik_klasse_prj" as varchar) as dynamik_klasse_prj,
    cast("r.status_klasse_prj_bi" as varchar) as status_klasse_prj_bi,
    cast("r.dynamik_klasse_prj_bi" as varchar) as dynamik_klasse_prj_bi,
    cast("r.own_idx_class" as varchar) as own_idx_class,
    cast("r.own_idx_class_bi" as varchar) as own_idx_class_bi,
    'BER' as city_code,
    'plr' as area_level
from
    read_csv(
        '{{ var("project_root") }}/reference/goldens/20180909_result_full_plr.csv',
        encoding = 'latin-1',
        auto_detect = true
    )
