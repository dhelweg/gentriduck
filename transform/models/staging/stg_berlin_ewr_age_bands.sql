-- stg_berlin_ewr_age_bands.sql
-- #371 (pre-registration docs/methodology/371-matched-comparison-preregistration.md
-- §3.7, DE check 4): narrow EWR age bands per Planungsraum, staged from the raw
-- EWR matrices already on disk. Long format: one row per
-- (reference_year, area_code, band_code).
--
-- Why: the matched comparison needs residents aged 15 to the Regelaltersgrenze
-- per PLR (Berlin MSS S1 denominator, MSS 2021 Indikatorenblaetter S. 16), which
-- the coarse shares in stg_berlin_ewr (age_45_65_share, age_65plus_share, ...)
-- cannot form. The matrices carry the narrow bands E_E15_18, E_E60_63,
-- E_E63_65, E_E65_67 etc. No new source (existing EWR source, ADR-0003 /
-- ADR-0007); the files are the ones ingestion/berlin/ewr/ingest_ewr.py reads.
--
-- Source: Amt fuer Statistik Berlin-Brandenburg, "Einwohnerinnen und Einwohner
-- in Berlin in LOR-Planungsraeumen am 31.12.YYYY" (EWR matrices, Hauptwohnsitz),
-- CC BY 3.0 DE. Files (data/raw/berlin/ewr/csv/, gitignored):
-- 2018: EWR201812E_Matrix.csv     (lor_pre2021, 447 PLR)
-- 2020: EWR202012E_Matrix.csv     (lor_pre2021, 448 PLR)
-- 2024: EWR_L21_202412E_Matrix.csv (lor_2021, 542 PLR)
-- 2025: EWR_L21_202512E_Matrix.csv (lor_2021, 542 PLR)
-- 31.12.2022 is not available (#346); int_berlin_ewr_age_bands_plr2021
-- interpolates it (PM decision M3).
--
-- Bands: the 32 contiguous single/narrow bands E_E00_01 ... E_E95_110 (age_from
-- inclusive, age_to exclusive; E_E95_110 = 95 and older). They partition the
-- population: sum of the 32 bands = E_E (residents_total) in every row of all
-- four files (tested: test_371_ewr_age_bands_sum_to_total).
--
-- Blank rows: the publisher leaves the WHOLE row empty (2024: '') or 'NA'
-- (2025) for the two PLRs without residents (2024: 03400831, 06200318; 2025:
-- 03400831, 06200418). A whole-row blank is an uninhabited PLR, so its counts
-- are 0 and is_blank_row = true. A partially blank row would be a suppression
-- and is NOT coerced: it stays NULL (none exist; tested).
--
-- Publisher code typo (2024 only): the 2024 matrix labels the blank Landweg row
-- '06200318', which is not a LOR 2021 PLR code (stg_berlin_lor). The 2021+
-- MSS layers and the 2025 matrix use '06200418' (Landweg), and the 2024 file
-- has no other '06200418' row. The code is corrected to '06200418' here;
-- test_371_ewr_age_bands_codes_in_lor checks every lor_2021 code against
-- stg_berlin_lor. (int_berlin_ewr_plr2021 still carries '06200318' for 2024;
-- not changed here. Both are blank rows, so no resident count is affected.)
--
-- dbt_meta_owner: data-engineer
{{
    config(
        materialized="view",
        meta={"dbt_meta_owner": "data-engineer"},
    )
}}

{%- set ewr_files = [
    (2018, "EWR201812E_Matrix.csv", "lor_pre2021"),
    (2020, "EWR202012E_Matrix.csv", "lor_pre2021"),
    (2024, "EWR_L21_202412E_Matrix.csv", "lor_2021"),
    (2025, "EWR_L21_202512E_Matrix.csv", "lor_2021"),
] -%}

{%- set bands = [
    ("E_E00_01", 0, 1), ("E_E01_02", 1, 2), ("E_E02_03", 2, 3), ("E_E03_05", 3, 5),
    ("E_E05_06", 5, 6), ("E_E06_07", 6, 7), ("E_E07_08", 7, 8), ("E_E08_10", 8, 10),
    ("E_E10_12", 10, 12), ("E_E12_14", 12, 14), ("E_E14_15", 14, 15),
    ("E_E15_18", 15, 18), ("E_E18_21", 18, 21), ("E_E21_25", 21, 25),
    ("E_E25_27", 25, 27), ("E_E27_30", 27, 30), ("E_E30_35", 30, 35),
    ("E_E35_40", 35, 40), ("E_E40_45", 40, 45), ("E_E45_50", 45, 50),
    ("E_E50_55", 50, 55), ("E_E55_60", 55, 60), ("E_E60_63", 60, 63),
    ("E_E63_65", 63, 65), ("E_E65_67", 65, 67), ("E_E67_70", 67, 70),
    ("E_E70_75", 70, 75), ("E_E75_80", 75, 80), ("E_E80_85", 80, 85),
    ("E_E85_90", 85, 90), ("E_E90_95", 90, 95), ("E_E95_110", 95, 110),
] -%}

{%- set present = [] -%}
{%- if execute -%}
    {%- for year, fname, vintage in ewr_files -%}
        {%- set n = run_query(
            "SELECT count(*) FROM glob('" ~ raw_path("berlin/ewr/csv/" ~ fname) ~ "')"
        ).columns[0][0] -%}
        {%- if n > 0 -%} {%- do present.append((year, fname, vintage)) -%} {%- endif -%}
    {%- endfor -%}
{%- endif %}

{% if present | length > 0 %}

    with
        raw as (
            {% for year, fname, vintage in present %}
                select
                    {{ year }} as reference_year,
                    '{{ vintage }}' as area_vintage,
                    '{{ fname }}' as source_file,
                    {% if year == 2024 %}
                        -- publisher typo, see header
                        case
                            when lpad(trim(raumid), 8, '0') = '06200318'
                            then '06200418'
                            else lpad(trim(raumid), 8, '0')
                        end as area_code,
                    {% else %} lpad(trim(raumid), 8, '0') as area_code,
                    {% endif %}
                    -- whole-row blank = uninhabited PLR (see header)
                    (e_e is null and e_em is null and e_ew is null) as is_blank_row,
                    try_cast(e_e as bigint) as residents_total_raw,
                    {% for code, lo, hi in bands %}
                        try_cast({{ code }} as bigint) as {{ code | lower }}
                        {%- if not loop.last %},{% endif %}
                    {% endfor %}
                from
                    read_csv(
                        '{{ raw_path("berlin/ewr/csv/" ~ fname) }}',
                        delim = ';',
                        header = true,
                        all_varchar = true,
                        nullstr = ['', 'NA']
                    )
                {% if not loop.last %}
                    union all by name
                {% endif %}
            {% endfor %}
        ),

        -- One row per (PLR, band): unnest a list of band structs in the select
        -- list (recursive := true expands the struct fields into columns).
        long as (
            select
                reference_year,
                area_vintage,
                source_file,
                area_code,
                is_blank_row,
                residents_total_raw,
                unnest(
                    [
                        {% for code, lo, hi in bands %}
                            {
                                'band_code':'{{ code }}',
                                'age_from':{{ lo }},
                                'age_to':{{ hi }},
                                'residents_raw':{{ code | lower }}
                            }
                            {%- if not loop.last %},{% endif %}
                        {% endfor %}
                    ],
                    recursive := true
                )
            from raw
        )

    select
        'BER' as city_code,
        reference_year,
        make_date(reference_year, 12, 31) as reference_date,
        area_code,
        area_vintage,
        band_code,
        age_from,
        age_to,
        case when is_blank_row then 0 else residents_raw end as residents,
        case when is_blank_row then 0 else residents_total_raw end as residents_total,
        is_blank_row,
        source_file,
        'Amt fuer Statistik Berlin-Brandenburg / Einwohnerregister Berlin (EWR), CC BY 3.0 DE'
        ' -- https://www.statistik-berlin-brandenburg.de/' as source_attribution
    from long

{% else %}

    -- Zero-row typed stub: no EWR matrix CSVs under data/raw/berlin/ewr/csv/.
    select
        cast(null as varchar) as city_code,
        cast(null as integer) as reference_year,
        cast(null as date) as reference_date,
        cast(null as varchar) as area_code,
        cast(null as varchar) as area_vintage,
        cast(null as varchar) as band_code,
        cast(null as integer) as age_from,
        cast(null as integer) as age_to,
        cast(null as bigint) as residents,
        cast(null as bigint) as residents_total,
        cast(null as boolean) as is_blank_row,
        cast(null as varchar) as source_file,
        cast(null as varchar) as source_attribution
    where false

{% endif %}
