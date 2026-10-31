{#
  offering_advantage_lq(base_relation)
  ====================================
  #354/#355 phase A (prerequisite §2.1(2)): single source of truth for the
  Offering Advantage (OA) 3-level nested location-quotient arithmetic, moved
  VERBATIM out of int_poi_offering_advantage.sql so that a second model (the
  native LOR-2021 back-cast of OSM snapshots 2019/2020,
  int_berlin_poi_offering_advantage_plr2021_backcast) computes OA with the
  identical formula instead of a fork (pre-registration
  docs/methodology/354-355-hypothesis-suite-preregistration.md §2.1(2), §10.2).

  This macro introduces NO methodology change: the SQL below is the former
  body of int_poi_offering_advantage (CTE `with_bases` + final SELECT),
  statement-for-statement, except that `from combined_base` became
  `from {{ base_relation }}` (one SQL comment line was reworded to match).
  int_poi_offering_advantage after the extraction: compiled SQL
  token-identical to the pre-extraction model; standard rows bit-identical,
  gaussian rows within pre-existing float-summation jitter (evidence
  docs/epic-e/354-phase-a-data-prerequisites.md §7).
  Lint scope: sqlfluff sees only the stub in .sqlfluff, so this macro body is
  NOT covered by sqlfluff (sqlfmt still formats it). The construct, its grounding and its
  interpretation notes stay documented in int_poi_offering_advantage.sql's
  header (R-C2: reference/system/70_oa_helper.sql, 71_oa.sql; thesis
  pp. 55-56, 91; docs/methodology/spatial-methods.md §11; ADR-0017 D1/D2/D4,
  D-3 min-base flag #274).

  Contract: `base_relation` is the name of a CTE (or relation) with columns
  (city_code, snapshot_year, area_code, area_vintage, poi_domain_h,
  poi_category_h, poi_type_h, stock, weight_variant), one row per taxonomy
  leaf per area-year-variant. The macro emits a trailing CTE `with_bases`
  followed by the final SELECT, so the caller writes
      with ..., <base_relation> as (...),
      {{ offering_advantage_lq('<base_relation>') }}
  Every window partitions by (city_code, snapshot_year, area_vintage,
  weight_variant), so a caller that feeds only one (city, year, vintage)
  slice gets exactly the values that slice would get inside a larger union.
#}
{% macro offering_advantage_lq(base_relation) %}
    -- All parent-relative reference bases, computed as window SUMs over
    -- the caller's base relation (combined_base in int_poi_offering_advantage;
    -- same idiom as int_poi_share_base's
    -- berlin_total_poi_count: partition by area_vintage as well as
    -- weight_variant so lor_pre2021/lor_2021 and standard/gaussian_* stocks
    -- are never summed together across an incompatible boundary).
    with_bases as (
        select
            city_code,
            snapshot_year,
            area_code,
            area_vintage,
            poi_domain_h,
            poi_category_h,
            poi_type_h,
            weight_variant,
            -- t_a: this row's own leaf stock (already the finest grain).
            stock as type_stock_local,
            -- t_city: Σ_a t_a for this exact (domain, category, type) triple.
            sum(stock) over (
                partition by
                    city_code,
                    snapshot_year,
                    area_vintage,
                    weight_variant,
                    poi_domain_h,
                    poi_category_h,
                    poi_type_h
            ) as type_stock_city,
            -- c_a: category total within this PLR (sum over types in this
            -- category).
            sum(stock) over (
                partition by
                    city_code,
                    snapshot_year,
                    area_code,
                    area_vintage,
                    weight_variant,
                    poi_domain_h,
                    poi_category_h
            ) as category_stock_local,
            -- c_city: Σ_a c_a city-wide.
            sum(stock) over (
                partition by
                    city_code,
                    snapshot_year,
                    area_vintage,
                    weight_variant,
                    poi_domain_h,
                    poi_category_h
            ) as category_stock_city,
            -- D_a = X_a: domain total within this PLR (sum over
            -- categories/types in this domain). Shared parent base for BOTH
            -- category-level and type-level OA (ADR-0017 D1 -- neither nests
            -- under category).
            sum(stock) over (
                partition by
                    city_code,
                    snapshot_year,
                    area_code,
                    area_vintage,
                    weight_variant,
                    poi_domain_h
            ) as domain_stock_local,
            -- D_city = X_city: Σ_a D_a city-wide.
            sum(stock) over (
                partition by
                    city_code, snapshot_year, area_vintage, weight_variant, poi_domain_h
            ) as domain_stock_city,
            -- Σ_d d_a: all-domains grand total within this PLR (domain-level
            -- parent base).
            sum(stock) over (
                partition by
                    city_code, snapshot_year, area_code, area_vintage, weight_variant
            ) as all_domains_stock_local,
            -- Σ_d d_city: all-domains grand total city-wide.
            sum(stock) over (
                partition by city_code, snapshot_year, area_vintage, weight_variant
            ) as all_domains_stock_city
        from {{ base_relation }}
    )

    select
        city_code,
        snapshot_year,
        area_code,
        area_vintage,
        poi_domain_h,
        poi_category_h,
        poi_type_h,
        weight_variant,
        -- ADR-0017 D4: this ticket builds faithful Run 1 only (all types, no
        -- curation); 'improved' rows are appended by OA-B.1..B.4 (#170-173) --
        -- never blended into this run (ADR-0017 D3).
        'faithful' as methodology_variant,

        -- Raw stocks, exposed for transparency, auditability, and the C-1
        -- invariance test (test_c1_oa_weighted_mass_conservation_invariance.sql
        -- compares *_city columns across weight_variant = 'standard' vs
        -- 'gaussian_%').
        type_stock_local,
        type_stock_city,
        category_stock_local,
        category_stock_city,
        domain_stock_local,
        domain_stock_city,
        all_domains_stock_local,
        all_domains_stock_city,

        -- domain X: OA(X, a) = (X_a / Σ_d d_a) / (X_city / Σ_d d_city)
        -- 71_oa.sql: (d_<domain>_stock / Σd) * oa_helper_total_d_<domain>_stock,
        -- where oa_helper = Σd_city / d_<domain>_city -- algebraically identical
        -- to this ratio-of-shares form (thesis §70/71; spatial-methods.md §11.1).
        (domain_stock_local / nullif(all_domains_stock_local, 0))
        / nullif(domain_stock_city / nullif(all_domains_stock_city, 0), 0) as oa_domain,

        -- category c ⊂ domain D: OA(c, a) = (c_a / D_a) / (c_city / D_city)
        -- 71_oa.sql, e.g. (c_cafe_stock / d_gastronomie_stock) *
        -- oa_helper_gastro_c_cafe_stock, oa_helper = d_gastronomie_city /
        -- c_cafe_city.
        (category_stock_local / nullif(domain_stock_local, 0))
        / nullif(category_stock_city / nullif(domain_stock_city, 0), 0) as oa_category,

        -- type t ⊂ domain D (NOT category -- ADR-0017 D1): OA(t, a) =
        -- (t_a / D_a) / (t_city / D_city). 71_oa.sql, e.g.
        -- (t_restaurant_italiener_stock / d_gastronomie_stock) *
        -- oa_helper_gastro_t_restaurant_italiener_stock, oa_helper =
        -- d_gastronomie_city / t_restaurant_italiener_city.
        (type_stock_local / nullif(domain_stock_local, 0))
        / nullif(type_stock_city / nullif(domain_stock_city, 0), 0) as oa_type,

        -- D-3 min-POI-base flags (#274 discharge -- see header comment above for
        -- the full rationale/threshold derivation). Keyed on each level's OWN
        -- local-share denominator, not a shared/arbitrary cutoff:
        all_domains_stock_local
        < {{ var("oa_min_poi_base_n", 10) }} as oa_domain_min_base_flag,
        domain_stock_local
        < {{ var("oa_min_poi_base_n", 10) }} as oa_category_min_base_flag,
        domain_stock_local < {{ var("oa_min_poi_base_n", 10) }} as oa_type_min_base_flag

    from with_bases
{% endmacro %}
