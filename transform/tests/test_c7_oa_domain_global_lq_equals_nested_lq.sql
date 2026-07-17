-- test_c7_oa_domain_global_lq_equals_nested_lq.sql
-- OA-D3 (#240, ADR-0024): int_poi_offering_advantage_methods.sql documents
-- that oa_domain_global_lq is ALGEBRAICALLY IDENTICAL to oa_domain_nested_lq
-- (a domain's own parent-relative base already IS the all-domains grand
-- total, so the "parent-relative" and "city-relative" LQ forms coincide at
-- the domain level -- they only diverge at category/type, where the
-- parent-relative denominator is the domain and the city-relative
-- denominator is the grand total). This is a documented mathematical
-- identity, not a coincidence of the current data -- enforced here as an
-- error-severity regression guard (OA-D0 geo sign-off C7 "never blend / no
-- consensus column": if this identity ever silently broke, it would mean
-- one of the two formulas had drifted from its documented definition).
--
-- Returns rows where the two values diverge beyond floating tolerance; zero
-- rows = test passes.
select
    city_code,
    snapshot_year,
    area_code,
    area_vintage,
    poi_domain_h,
    weight_variant,
    methodology_variant,
    oa_domain_nested_lq,
    oa_domain_global_lq,
    abs(oa_domain_nested_lq - oa_domain_global_lq) as diff
from {{ ref("int_poi_offering_advantage_methods") }}
where
    oa_domain_nested_lq is not null
    and oa_domain_global_lq is not null
    and abs(oa_domain_nested_lq - oa_domain_global_lq) > 0.01
