-- int_hamburg_sozialmonitoring_index.sql
-- #40 H1 methodology-gated integration slice: numeric-ordinal mapping of
-- Hamburg's Sozialmonitoring Status-Index / Dynamik-Index text labels onto the
-- SAME 1-4 (status) / 1-3 (dynamik) integer scale int_gentrification_ts already
-- consumes for Berlin's MSS (stg_berlin_mss.status_index/dynamik_index) --
-- this is the outcome-variable pillar's half of ADR-0014 open question #5's
-- deferred decision ("any ordinal-to-numeric encoding for cross-city
-- comparison is a methodology decision (R-C1) for a downstream int_*-equivalent
-- Hamburg model, not [the] staging layer" -- stg_hamburg_sozialmonitoring
-- header).
--
-- =============================================================================
-- Mapping rule (methodology-bearing; requires geo-DS + domain-expert sign-off)
-- =============================================================================
-- status_index ('hoch'|'mittel'|'niedrig'|'sehr niedrig' -> 1|2|3|4):
-- Direct ordinal correspondence to Berlin's own MSS status_index polarity
-- (int_gentrification_ts header, "D1 POLARITY NOTE"): 1=hoch(best/least
-- vulnerable) ... 4=sehr niedrig(worst/most vulnerable). Both Berlin's MSS and
-- Hamburg's Sozialmonitoring construct their Status-Index the same conceptual
-- way -- a composite social-status classification into exactly 4 ordered bands
-- with matching German label semantics (hoch/mittel/niedrig + a bottom band) --
-- so a literal 4-band label match is the direct, non-inventive mapping. No
-- numeric distance assumption is implied beyond ordinality (i.e. do not treat
-- "sehr niedrig" as exactly "2x niedrig"; both are ordinal, not interval,
-- scales -- same caveat that already applies to Berlin's own status_index).
--
-- dynamik_index ('positiv'|'stabil'|'negativ' -> 1|2|3):
-- Direct ordinal correspondence to Berlin's MSS dynamik_index (1=positiv,
-- 2=stabil, 3=negativ; stg_berlin_mss header). Both indices use the identical
-- 3-label German ordinal set. CAVEAT (ADR-0014 Pillar 2, "Known
-- non-equivalence"): Hamburg's Dynamik is computed over a 3-YEAR change
-- window vs Berlin's 2-year window, and Hamburg's editions are ANNUAL
-- (2013-2025) vs Berlin's BIENNIAL. The ordinal label and its numeric encoding
-- are comparable in category (an area coded "positiv" is directionally
-- improving in both cities' own methodology), but the underlying observation
-- window differs -- do not treat dynamik_index MAGNITUDE (e.g. in a pooled
-- Berlin+Hamburg regression coefficient) as directly comparable without
-- controlling for edition cadence/window length. This must be surfaced on the
-- G2 methodology page (ADR-0014 consequence: "Two-grain social pillar is a
-- standing methodology note").
--
-- gesamtindex: Hamburg publishes no compact 2-digit numeric code analogous to
-- Berlin's MSS gesamtindex (stg_hamburg_sozialmonitoring header) -- left NULL
-- here rather than fabricated. is_uninhabited (int_gentrification_ts's own
-- flag, driven off gesamtindex IS NULL for Berlin) is instead derived directly
-- from population < the Sozialmonitoring's own >300-resident scoring threshold
-- proxy: a Gebiet absent from a given edition IS the "uninhabited/unscored"
-- signal for Hamburg (stg_hamburg_sozialmonitoring header: "a gebiet below
-- [300 residents] is simply absent for that year, not present-with-nulls").
-- This model does not attempt to backfill absent-Gebiet rows; int_gentrification_ts
-- (Hamburg branch) inner-joins on (area_code, edition) so an absent Gebiet
-- naturally drops out of the panel for that year, the same effective behaviour
-- as Berlin's is_uninhabited=true rows being filtered downstream, just achieved
-- by row absence instead of a NULL flag.
--
-- area_vintage: hard-coded 'current' (Hamburg's single live-WFS geometry
-- edition, ADR-0014 Pillar 1) -- stg_hamburg_sozialmonitoring itself carries no
-- vintage column since Sozialmonitoring Gebiet ids are stable across the
-- 2013-2025 edition range at the source.
--
-- Output grain: (city_code='HH', area_code=Gebiet statgeb id, edition year).
-- Unmapped label values (should not occur if the source vocabulary is stable;
-- defensive NULL rather than a hard failure) surface as NULL status_index /
-- dynamik_index so a downstream row-count/coverage test can catch drift.
--
-- Graceful degradation: returns zero rows when stg_hamburg_sozialmonitoring has
-- no rows.
--
-- dbt_meta_owner: data-engineer
-- geo-ds-sign-off: PASS WITH CONDITIONS (docs/epic-h/H1-geo-signoff.md, 2026-07-01, issue #40)
-- domain-sign-off: PASS WITH CONDITIONS (docs/epic-h/H1-domain-signoff.md, 2026-07-01, issue #40)
-- depends_on: {{ ref('stg_hamburg_sozialmonitoring') }}
{{ config(materialized="table", meta={"dbt_meta_owner": "data-engineer"}) }}

select
    city_code,
    edition,
    area_code,
    'current' as area_vintage,
    stadtteil_name,
    population,
    status_index as status_index_label,
    dynamik_index as dynamik_index_label,
    gesamtindex_label,
    -- Numeric ordinal mapping (see header): 1=hoch/best ... 4=sehr niedrig/worst,
    -- matching Berlin MSS status_index polarity exactly. Trim/lower-case guards
    -- against incidental whitespace/case drift in the source WFS text field.
    case
        lower(trim(status_index))
        when 'hoch'
        then 1
        when 'mittel'
        then 2
        when 'niedrig'
        then 3
        when 'sehr niedrig'
        then 4
    end as status_index,
    -- Numeric ordinal mapping (see header): 1=positiv, 2=stabil, 3=negativ,
    -- matching Berlin MSS dynamik_index exactly (label set is identical).
    case
        lower(trim(dynamik_index))
        when 'positiv'
        then 1
        when 'stabil'
        then 2
        when 'negativ'
        then 3
    end as dynamik_index,
    -- Hamburg publishes no gesamtindex analogue (see header) -- NULL, not
    -- fabricated.
    cast(null as integer) as gesamtindex,
    source_attribution
from {{ ref("stg_hamburg_sozialmonitoring") }}
where area_code is not null
