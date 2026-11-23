-- test_371_hh_annex_core_labels.sql
-- #371 pre-registration §3.3 check 4 (map by header text, not position; the
-- #360 lesson): the harmonised-core indicators carry their documented header
-- text in every edition. S3 = SGB-II recipients, plus AsylbLG from edition 2019
-- (Sozialmonitoring Bericht 2019 S. 9); S4 = Arbeitslose; S5 = Kinder (unter 15
-- Jahren) in Mindestsicherung. The ingestion script already refuses an
-- unexpected label; this guards the warehouse copy.
-- Returns one row per (edition, indicator) with an unexpected label.
{{ config(severity="error") }}

select distinct edition_year, indicator, indicator_label_de
from {{ ref("stg_hamburg_sozialmonitoring_indicators") }}
where
    (
        indicator = 'S3'
        and indicator_label_de != case
            when edition_year >= 2019
            then 'S3 SGB-II- und AsylbLG-Empfänger/-innen'
            else 'S3 SGB-II-Empfänger/-innen'
        end
    )
    or (
        indicator = 'S4'
        and indicator_label_de not in ('S4 Arbeitslose', 'S4 Arbeitslose (SGB II)')
    )
    or (
        indicator = 'S5'
        and indicator_label_de
        not like 'S5 Kinder (unter 15 Jahren) in Mindestsicherung%'
    )
