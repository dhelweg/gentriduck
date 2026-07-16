-- int_berlin_displacement_subindex.sql
-- #258 (D5-wire): builds the ADR-0008 D5 (displacement/affordability) predictor
-- from the three proxies staged under #70 [B1] -- int_berlin_turnover_proxy,
-- int_berlin_rent_pressure_proxy, int_berlin_milieuschutz_plr_flag -- giving
-- each a real consumer for the first time.
--
-- COVERAGE FINDING (verified at build time, not assumed -- see
-- D5-wire-geo-signoff.md condition C1 for the full check): turnover_proxy
-- (annual EWR panel) and rent_pressure_proxy (irregular Wohnlage WFS
-- editions) have ZERO overlapping lor_2021 years today. turnover_proxy has
-- rows only for reference_year 2009-2020 (the EWR ingestion gap #197 means
-- there is currently no lor_2021 EWR data at all for 2021-2023, and
-- residence_duration_5y_share is NULL for 2024/2025); rent_pressure_proxy's
-- lor_2021 rows exist only for Wohnlage snapshot_year 2023 and 2026. A
-- strict all-or-nothing composite (mirroring int_ewr_socioeco's fixed-tier
-- discipline) would therefore be PERMANENTLY EMPTY given the data as
-- currently ingested -- not a hypothetical risk, a verified fact. This is
-- NOT the same situation as int_ewr_socioeco's two composites (which are
-- each a fixed, mutually exclusive indicator SET for a given era, never a
-- partial subset of one list): turnover_proxy and rent_pressure_proxy are
-- two structurally-independent single proxies with disjoint year coverage
-- by construction (one is EWR-annual, the other is Wohnlage-WFS-edition-
-- irregular), so requiring both here would not express "an honest gap", it
-- would silently make the whole predictor a no-op.
--
-- DESIGN: displacement_subindex is therefore a PARTIAL-AVAILABILITY mean --
-- the average of whichever of {turnover_proxy, rent_pressure_proxy} is
-- non-null for a given (city_code, area_code, area_vintage, year), NULL only
-- when BOTH are null. n_components_available (1 or 2, NULL when 0) and
-- is_partial_availability (n_components_available = 1) are exposed so a
-- consumer can filter to full-coverage rows only if they want the stricter
-- cut. This averages only signals that ARE present -- never imputes a
-- missing one -- so it stays within the no-imputation discipline while
-- remaining non-vacuous given today's real coverage.
--
-- Milieuschutz is still NOT folded into this numeric composite (separate
-- reasoning, see below): int_berlin_milieuschutz_plr_flag explicitly states
-- it does NOT attempt to reconstruct a status *panel* across years -- the
-- WFS exposes only the CURRENT designation set (ADR-0019 Open Question #2).
-- Blending a time-invariant flag into an annual composite would fabricate
-- temporal signal that does not exist in the source, a different (and
-- worse) problem than the partial-availability gap above. under_milieuschutz
-- / milieuschutz_overlap_frac are instead carried through as separate
-- DISCLOSURE-ONLY columns (same current-state value repeats for every year
-- of a given PLR), consistent with the G2 caveat already recorded on that
-- model: "Milieuschutz is a policy marker, not a measured displacement
-- outcome." Consumers must not average or z-score this alongside
-- displacement_subindex as if it were a third annual input -- see
-- D5-wire-geo-signoff.md condition C2.
--
-- Grain: (city_code, area_code, area_vintage, reference_year) -- the UNION
-- of every year either proxy actually covers, not just turnover_proxy's own
-- years (which would silently drop the rent_pressure-only years, i.e. the
-- ONLY years currently populated for lor_2021 given the coverage finding
-- above). Berlin lor_2021-only throughout (both source proxies are lor_2021-
-- only as ingested), same scope constraint as int_berlin_brw_trend
-- (D3-brw-wire, #273).
--
-- rent_pressure_proxy alignment: matched to each spine year via
-- nearest-<=-vintage (the most recent Wohnlage snapshot known as of that
-- year), the same "nearest edition <= year" pattern
-- int_berlin_rent_pressure_proxy itself already uses to match MSS editions
-- to Wohnlage years (geo condition 8 precedent) -- not a new alignment rule
-- invented for this ticket. matched_rent_pressure_snapshot_year is exposed
-- as the audit trail. turnover_proxy is matched by EXACT reference_year
-- (it is already annual, no fuzzy-matching needed).
--
-- Polarity (all pressure/vulnerability-positive, consistent orientation,
-- verified per D5-wire-geo-signoff.md):
-- higher turnover_proxy         = long-tenure residents leaving faster
-- higher rent_pressure_proxy    = above-median rent + above-median
-- transfer-dependency
-- higher displacement_subindex  = higher combined displacement/affordability
-- pressure from whichever signal(s) are
-- available (NULL only when both are null).
-- higher milieuschutz_overlap_frac = more of the PLR is under a Sec. 172
-- BauGB protection designation (a POLICY
-- marker the Senate already associates with
-- displacement risk, not itself evidence that
-- displacement pressure rose this year).
--
-- Not a measured displacement outcome; not wired into the contract-enforced
-- gentrification_index mart (a separate, larger contract-change decision) --
-- consumed by int_gentrification_ts as a new PREDICTOR/lead-side field
-- (ADR-0008), Branch A (lor_2021) only, mirroring D3-brw-wire's own wiring
-- pattern.
--
-- dbt_meta_owner: data-engineer
-- geo-ds-sign-off: PASS (docs/methodology/D5-wire-geo-signoff.md)
-- domain-sign-off: PASS (docs/methodology/D5-wire-domain-signoff.md)
-- depends_on: {{ ref('int_berlin_turnover_proxy') }}
-- depends_on: {{ ref('int_berlin_rent_pressure_proxy') }}
-- depends_on: {{ ref('int_berlin_milieuschutz_plr_flag') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

with
    turnover as (
        select
            city_code,
            area_code,
            area_vintage,
            reference_year,
            turnover_proxy,
            any_endpoint_partial
        from {{ ref("int_berlin_turnover_proxy") }}
    ),

    -- lor_2021 only (see header coverage finding -- lor_pre2021 rows exist
    -- for a different, geometrically incompatible PLR system and must not be
    -- matched against turnover_proxy's lor_2021 area_code space).
    rent_pressure as (
        select city_code, snapshot_year, area_code, area_vintage, rent_pressure_proxy
        from {{ ref("int_berlin_rent_pressure_proxy") }}
        where area_vintage = 'lor_2021'
    ),

    -- Spine: UNION of every (city_code, area_code, area_vintage, year) either
    -- proxy actually covers -- NOT just turnover_proxy's own years (see
    -- header coverage finding: today, turnover_proxy's years and
    -- rent_pressure_proxy's lor_2021 years do not overlap at all, so a
    -- turnover-only spine would silently drop every currently-populated
    -- rent-pressure year).
    year_spine as (
        select city_code, area_code, area_vintage, reference_year as yr
        from turnover
        union
        select city_code, area_code, area_vintage, snapshot_year as yr
        from rent_pressure
    ),

    -- Nearest-<=-vintage match: the most recent Wohnlage snapshot_year known
    -- as of each spine year (mirrors int_berlin_rent_pressure_proxy's own
    -- nearest-<=-edition subquery pattern).
    spine_with_rent_edition as (
        select
            s.*,
            (
                select max(rp2.snapshot_year)
                from rent_pressure as rp2
                where
                    rp2.city_code = s.city_code
                    and rp2.area_vintage = s.area_vintage
                    and rp2.snapshot_year <= s.yr
            ) as matched_rent_pressure_snapshot_year
        from year_spine as s
    ),

    joined as (
        select
            swe.city_code,
            swe.area_code,
            swe.area_vintage,
            swe.yr as reference_year,
            t.turnover_proxy,
            t.any_endpoint_partial,
            swe.matched_rent_pressure_snapshot_year,
            rp.rent_pressure_proxy
        from spine_with_rent_edition as swe
        left join
            turnover as t
            on swe.city_code = t.city_code
            and swe.area_code = t.area_code
            and swe.area_vintage = t.area_vintage
            and swe.yr = t.reference_year
        left join
            rent_pressure as rp
            on swe.city_code = rp.city_code
            and swe.area_code = rp.area_code
            and swe.area_vintage = rp.area_vintage
            and swe.matched_rent_pressure_snapshot_year = rp.snapshot_year
    ),

    -- Milieuschutz: time-invariant, disclosure-only (see header). Joined on
    -- (city_code, area_code, area_vintage) WITHOUT a year key -- the same
    -- current-state flag applies to every reference_year of a given PLR.
    milieuschutz as (
        select
            city_code,
            area_code,
            area_vintage,
            under_milieuschutz,
            milieuschutz_overlap_frac,
            earliest_in_force_date
        from {{ ref("int_berlin_milieuschutz_plr_flag") }}
    )

select
    j.city_code,
    j.area_code,
    j.area_vintage,
    j.reference_year,
    j.turnover_proxy,
    j.rent_pressure_proxy,
    j.matched_rent_pressure_snapshot_year,
    -- Partial-availability mean of whichever of {turnover_proxy,
    -- rent_pressure_proxy} is non-null (see header for why a strict
    -- all-or-nothing rule would be permanently empty given today's real
    -- coverage). NULL only when BOTH are null -- never imputes a missing
    -- signal, only averages present ones.
    case
        when j.turnover_proxy is null and j.rent_pressure_proxy is null
        then null
        when j.turnover_proxy is null
        then j.rent_pressure_proxy
        when j.rent_pressure_proxy is null
        then j.turnover_proxy
        else (j.turnover_proxy + j.rent_pressure_proxy) / 2.0
    end as displacement_subindex,
    (
        (j.turnover_proxy is not null)::int + (j.rent_pressure_proxy is not null)::int
    ) as n_components_available,
    (
        ((j.turnover_proxy is not null)::int + (j.rent_pressure_proxy is not null)::int)
        = 1
    ) as is_partial_availability,
    j.any_endpoint_partial,
    -- Disclosure-only, time-invariant Milieuschutz columns (see header --
    -- deliberately NOT folded into displacement_subindex above).
    coalesce(ms.under_milieuschutz, false) as under_milieuschutz,
    ms.milieuschutz_overlap_frac,
    ms.earliest_in_force_date
from joined as j
left join
    milieuschutz as ms
    on j.city_code = ms.city_code
    and j.area_code = ms.area_code
    and j.area_vintage = ms.area_vintage
