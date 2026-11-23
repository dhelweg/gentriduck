-- test_c1_oa_weighted_mass_conservation_invariance.sql
-- ADR-0017 D5 condition C-1 (BLOCKING), as restated by #363 (maintainer
-- decision B, 2026-11-02; ADR-0017 D5 C-1 amendment; spec:
-- docs/epic-c/363-geo-tolerance-note.md §4-§5; spatial-methods.md §11.1, §11.3).
--
-- Restated invariant: for every city, snapshot year and area vintage, and at
-- every taxonomy level (domain / category / type), the gaussian variant's
-- city-wide stock in int_poi_offering_advantage equals the hard
-- (point-in-polygon, 'standard') stock plus a NON-NEGATIVE WHOLE number of
-- POIs: the POIs outside every area polygon whose kernel reaches an area within
-- the bandwidth (each contributes total weight 1 after kernel normalisation,
-- int_osm_poi_plr_weighted). That edge effect is intended (decision B). The
-- excess is bounded per city x year x vintage, summed over all domains, by
-- max(0.1 % of the hard total, 3 POIs) (note §2: observed +0.025 % to +0.103 %,
-- the 0.103 % being 1 POI on H = 968 in 2008; the 3-POI floor covers tiny years).
--
-- Why this form (note §2): the bound is one-sided because the intended effect
-- can only ADD mass -- any loss is a bug (the old leakage drop, a dropped
-- polygon). It is relative only at the city-year level: per cell, a relative
-- bound would need a floor so large in small cells that it would mean nothing
-- (one POI on H = 90 is +1.1 %), so per cell only the structural checks apply
-- (one-sided, whole-number excess, both leaf sets equal). The whole-number check
-- (|d - round(d)| <= 1e-6) catches any normalisation bug -- weights not summing
-- to 1, half-counted POIs -- regardless of size.
--
-- Hamburg / ADR-0005 (note §3): no gaussian Hamburg variant exists yet, so the
-- checks are scoped to the (city, year, vintage, weight_variant) keys the
-- gaussian variant actually has -- but a gaussian key WITHOUT a standard
-- counterpart is a violation, not a skip, so a new city's gaussian variant
-- cannot pass silently. city_code is canonicalised on both sides
-- (canonical_city_code()); since #363 the kernel macro emits 'BER' itself, so
-- this is an idempotent guard against the vacuous 'BER' vs 'berlin' join that
-- had made the pre-#363 test compare zero rows.
--
-- Replaces the pre-#363 two-sided `abs(weighted - standard) > 0.01` checks.
-- Returns violating rows; zero rows = pass. Error severity (BLOCKING).
{{ config(severity="error") }}

with
    oa as (
        select
            {{ canonical_city_code("city_code") }} as city_code,
            snapshot_year,
            area_vintage,
            weight_variant,
            poi_domain_h,
            poi_category_h,
            poi_type_h,
            type_stock_city,
            category_stock_city,
            domain_stock_city
        from {{ ref("int_poi_offering_advantage") }}
        where weight_variant = 'standard' or weight_variant like 'gaussian_%'
    ),

    -- Every (city, year, vintage) x gaussian bandwidth present.
    gaussian_keys as (
        select distinct city_code, snapshot_year, area_vintage, weight_variant
        from oa
        where weight_variant like 'gaussian_%'
    ),

    -- The standard rows, replicated once per gaussian bandwidth of the same
    -- (city, year, vintage), so each gaussian variant is compared with its own
    -- copy of the hard counts. Restricted to keys that have a gaussian variant
    -- (Hamburg's standard-only rows are out of scope, note §3).
    standard_x as (
        select
            o.city_code,
            o.snapshot_year,
            o.area_vintage,
            g.weight_variant,
            o.poi_domain_h,
            o.poi_category_h,
            o.poi_type_h,
            o.type_stock_city,
            o.category_stock_city,
            o.domain_stock_city
        from oa as o
        inner join
            gaussian_keys as g
            on o.city_code = g.city_code
            and o.snapshot_year = g.snapshot_year
            and o.area_vintage = g.area_vintage
        where o.weight_variant = 'standard'
    ),

    gaussian as (select * from oa where weight_variant like 'gaussian_%'),

    -- One row per city-wide taxonomy leaf, per level and side.
    s_domain as (
        select distinct
            city_code,
            snapshot_year,
            area_vintage,
            weight_variant,
            poi_domain_h as level_value,
            domain_stock_city as stock_city
        from standard_x
    ),
    g_domain as (
        select distinct
            city_code,
            snapshot_year,
            area_vintage,
            weight_variant,
            poi_domain_h as level_value,
            domain_stock_city as stock_city
        from gaussian
    ),
    s_category as (
        select distinct
            city_code,
            snapshot_year,
            area_vintage,
            weight_variant,
            poi_domain_h || ' > ' || poi_category_h as level_value,
            category_stock_city as stock_city
        from standard_x
    ),
    g_category as (
        select distinct
            city_code,
            snapshot_year,
            area_vintage,
            weight_variant,
            poi_domain_h || ' > ' || poi_category_h as level_value,
            category_stock_city as stock_city
        from gaussian
    ),
    s_type as (
        select distinct
            city_code,
            snapshot_year,
            area_vintage,
            weight_variant,
            poi_domain_h
            || ' > '
            || poi_category_h
            || ' > '
            || poi_type_h as level_value,
            type_stock_city as stock_city
        from standard_x
    ),
    g_type as (
        select distinct
            city_code,
            snapshot_year,
            area_vintage,
            weight_variant,
            poi_domain_h
            || ' > '
            || poi_category_h
            || ' > '
            || poi_type_h as level_value,
            type_stock_city as stock_city
        from gaussian
    ),

    -- Coverage full outer join per level (note §5.2): a leaf on one side only
    -- keeps a NULL on the other side and is reported below.
    cells as (
        select
            'domain' as oa_level,
            coalesce(g.city_code, s.city_code) as city_code,
            coalesce(g.snapshot_year, s.snapshot_year) as snapshot_year,
            coalesce(g.area_vintage, s.area_vintage) as area_vintage,
            coalesce(g.weight_variant, s.weight_variant) as weight_variant,
            coalesce(g.level_value, s.level_value) as level_value,
            s.stock_city as standard_value,
            g.stock_city as weighted_value
        from g_domain as g
        full outer join
            s_domain as s
            on g.city_code = s.city_code
            and g.snapshot_year = s.snapshot_year
            and g.area_vintage = s.area_vintage
            and g.weight_variant = s.weight_variant
            and g.level_value = s.level_value
        union all
        select
            'category' as oa_level,
            coalesce(g.city_code, s.city_code) as city_code,
            coalesce(g.snapshot_year, s.snapshot_year) as snapshot_year,
            coalesce(g.area_vintage, s.area_vintage) as area_vintage,
            coalesce(g.weight_variant, s.weight_variant) as weight_variant,
            coalesce(g.level_value, s.level_value) as level_value,
            s.stock_city as standard_value,
            g.stock_city as weighted_value
        from g_category as g
        full outer join
            s_category as s
            on g.city_code = s.city_code
            and g.snapshot_year = s.snapshot_year
            and g.area_vintage = s.area_vintage
            and g.weight_variant = s.weight_variant
            and g.level_value = s.level_value
        union all
        select
            'type' as oa_level,
            coalesce(g.city_code, s.city_code) as city_code,
            coalesce(g.snapshot_year, s.snapshot_year) as snapshot_year,
            coalesce(g.area_vintage, s.area_vintage) as area_vintage,
            coalesce(g.weight_variant, s.weight_variant) as weight_variant,
            coalesce(g.level_value, s.level_value) as level_value,
            s.stock_city as standard_value,
            g.stock_city as weighted_value
        from g_type as g
        full outer join
            s_type as s
            on g.city_code = s.city_code
            and g.snapshot_year = s.snapshot_year
            and g.area_vintage = s.area_vintage
            and g.weight_variant = s.weight_variant
            and g.level_value = s.level_value
    ),

    -- Note §5.2: a leaf missing from either variant.
    leaf_coverage_violations as (
        select
            case
                when standard_value is null
                then 'leaf_missing_in_standard'
                else 'leaf_missing_in_gaussian'
            end as check_name,
            oa_level,
            city_code,
            snapshot_year,
            area_vintage,
            weight_variant,
            level_value,
            standard_value,
            weighted_value
        from cells
        where standard_value is null or weighted_value is null
    ),

    -- Note §5.2: a gaussian (city, year, vintage) with no standard rows at all.
    key_coverage_violations as (
        select
            'gaussian_key_without_standard' as check_name,
            'all' as oa_level,
            g.city_code,
            g.snapshot_year,
            g.area_vintage,
            g.weight_variant,
            cast(null as varchar) as level_value,
            cast(null as double) as standard_value,
            cast(null as double) as weighted_value
        from gaussian_keys as g
        where
            not exists (
                select 1
                from oa as o
                where
                    o.weight_variant = 'standard'
                    and o.city_code = g.city_code
                    and o.snapshot_year = g.snapshot_year
                    and o.area_vintage = g.area_vintage
            )
    ),

    -- Note §5.3, every level: one-sided (no mass loss beyond float noise) and
    -- whole-number excess.
    cell_violations as (
        select
            case
                when weighted_value - standard_value < -1e-6
                then 'negative_excess'
                else 'non_integer_excess'
            end as check_name,
            oa_level,
            city_code,
            snapshot_year,
            area_vintage,
            weight_variant,
            level_value,
            standard_value,
            weighted_value
        from cells
        where
            standard_value is not null
            and weighted_value is not null
            and (
                weighted_value - standard_value < -1e-6
                or abs(
                    (weighted_value - standard_value)
                    - round(weighted_value - standard_value)
                )
                > 1e-6
            )
    ),

    -- Note §5.4: per city x year x vintage, summed over the domain cells.
    city_year_totals as (
        select
            city_code,
            snapshot_year,
            area_vintage,
            weight_variant,
            sum(standard_value) as standard_total,
            sum(weighted_value) as weighted_total
        from cells
        where oa_level = 'domain'
        group by city_code, snapshot_year, area_vintage, weight_variant
    ),

    bound_violations as (
        select
            'city_year_excess_above_bound' as check_name,
            'all_domains' as oa_level,
            city_code,
            snapshot_year,
            area_vintage,
            weight_variant,
            cast(null as varchar) as level_value,
            standard_total as standard_value,
            weighted_total as weighted_value
        from city_year_totals
        where weighted_total - standard_total > greatest(0.001 * standard_total, 3)
    )

select *
from leaf_coverage_violations
union all
select *
from key_coverage_violations
union all
select *
from cell_violations
union all
select *
from bound_violations
