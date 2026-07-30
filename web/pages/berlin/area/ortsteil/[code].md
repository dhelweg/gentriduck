---
breadcrumb: "select area_name as breadcrumb from gentriduck_marts.dim_area_geometry where city_code = 'BER' and area_level = 'ortsteil' and area_code = '${params.code}' limit 1"
---

<!--
  #269 (I-ortsteile): Ortsteil (Stadtteil) coarse profile page. Discovered/crawled via
  pages/berlin/area/ortsteil/index.md's full 97-row table (same Evidence "index.md + [param].md"
  templated-page pattern already used for Bezirk -- see that page's own header comment -- and for
  the same reason: the static build only discovers a templated route by crawling a real,
  server-rendered `<a href>`).

  Ortsteil is a NON-LOR Berlin administrative geography (legally defined Bezirk subdivision,
  Berlin Bezirksverwaltungsgesetz Sec.2) that does NOT nest into the PLR/BZR/PGR ladder --
  dim_area_hierarchy.sql resolves Ortsteil<->PLR as a genuine area-overlap crosswalk
  (int_berlin_plr_ortsteil_overlap.sql, geo-DS gated, docs/epic-i/I-ortsteile-geo-signoff.md,
  Verdict: PASS) rather than a code-prefix substr() the way BZR/PGR/Bezirk pages derive their
  PLR children. This page therefore joins through the DOMINANT PLR->Ortsteil assignment
  (mart_ortsteil_plr_crosswalk.is_dominant_ortsteil) wherever the Bezirk/BZR/PGR page template
  would normally use `substr(area_code, 1, N) = '${params.code}'`. Ortsteil -> Bezirk DOES nest
  exactly (a source-provided fact, ingest_ortsteil_geometries.py's module docstring: bezirk_code
  is literally the first 2 characters of the 4-digit Ortsteil area_code) -- safe to derive with a
  plain substr() for the "Up:" link, same as every other level's fixed 12-entry Bezirk lookup.

  Display-only: reads already-published, already-signed-off marts (mart_area_demographics,
  mart_ortsteil_plr_crosswalk, mart_ortsteil_plr_stage_mix -- all #269, geo-DS PASS). No new
  indicator, weight, normalization, or re-scored Ortsteil-grain index (not on the R-C1 gated-file
  list; matches the I18/#247 "no re-scored index above PLR grain" precedent, reaffirmed for
  Ortsteil by the #269 geo-signoff's item 4). MSS status/Dynamik ("Approximate status & change") is
  intentionally NOT shown here -- mart_mss_area_aggregate only covers BZR/Bezirk grain
  (int_mss_bzr_aggregate has no Ortsteil rollup); adding one is out of this ticket's scope.

  BINDING CONDITION (I-ortsteile-geo-signoff.md, "CONDITION... blocking on the public Ortsteil page
  render"): Schlachtensee (0608) and Malchow (1106) are small enclaves that are never the dominant
  assignment for any PLR -- they have zero rows in every PLR-rollup mart. `hasChildren` below gates
  the display of every PLR-rollup section on a live COUNT against mart_ortsteil_plr_crosswalk (not
  a hardcoded 2-code list, so this degrades correctly if the never-dominant set ever changes) and
  renders an explicit, honest empty state instead of a blank/misleading page for these two. Per the
  #255 precedent elsewhere on this site, all queries below run unconditionally (sql fences are
  never nested inside a Svelte {#if}, only the resulting display components are) -- for the two
  enclaves every query below legitimately returns zero rows, and each affected component is swapped
  for an explicit note rather than a generic emptySet fallback.

  Confidence disclosure: mart_ortsteil_plr_crosswalk exposes `overlap_frac_of_plr` (this PLR's
  share of area actually inside this Ortsteil) precisely so a low-confidence dominant assignment
  isn't presented as certain -- the geo-signoff's own risk note flags 24/542 PLRs below 80% dominant
  share. The constituent-PLR table below surfaces this as a column, with an inline alert when this
  Ortsteil has any such PLR.

  #298 (I21-d): relocates the within-group dominance "Live" widget from /methodology-oa-modes §5
  onto this page -- see pages/berlin/area/bezirk/[code].md's header comment for the shared
  rationale. The OA-arealevel widget (§4, /methodology-oa-modes) is intentionally NOT relocated
  here: mart_poi_oa_arealevel's area_level accepted_values (transform/models/marts/schema.yml) is
  ("plr","bzr","pgr","bezirk","subarea_l2","subarea_l1","district") -- Ortsteil is not part of the
  LOR area_level ladder that mart computes over at all (same reason mart_mss_area_aggregate has no
  Ortsteil rollup and this page's "Approximate status & change" section is intentionally omitted,
  per this file's own header note above). Dominance's own PLR-grain children are joined through the
  same dominant-overlap crosswalk (mart_ortsteil_plr_crosswalk.is_dominant_ortsteil) the poi_mix/
  children queries above already use, not a code-prefix substr() -- and the section is gated behind
  the same `hasChildren` enclave guard as every other PLR-rollup section on this page.

  I21-f (#300): template-consolidation pass -- reorders this page's sections into the canonical
  per-level order (docs/epic-i/I21-ia-restructure-scoping.md §2.2): "Neighbourhood stage mix" (now
  "## Social status & trajectory", row 2) moves up to sit right after the Hero/breadcrumb/enclave
  guard, gains a modal/heterogeneity-flag takeaway sentence (same pattern as the Bezirk/BZR/PGR
  pages, see pages/berlin/area/bezirk/[code].md's header comment), and becomes this page's single
  above-the-fold visual. "Mapped places" is wrapped under a "## Commercial mix & Offering Advantage"
  umbrella heading (no OA subsection, per this file's own note above on why OA-arealevel doesn't
  cover Ortsteil). "Within-group dominance across neighbourhoods here" is renamed "## Within-group
  dominance" and "Population & composition" is renamed "## People & structure" (canonical naming, no
  content change) -- both relocated to rows 4/5. The children table is wrapped under a new "## Where
  this area sits" heading (row 8), and new "## Honest caveats" / "## Further reading" sections (rows
  9/10) are added -- this page previously had neither, unlike the PLR template. No Amenities section
  exists at Ortsteil grain (row 6) -- flagged as a follow-up gap in this ticket's final report, not
  built here (out of this ticket's "reorder, not new content" scope). Gate: web-engineer-reviewer
  only (structure/order + one small modal-flag sentence, no methodology).
-->

```sql ortsteil_name
select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'ortsteil' and area_code = '${params.code}'
limit 1
```

```sql bezirk_info
-- Ortsteil -> Bezirk nests EXACTLY (source-provided fact, see header comment) -- safe to derive
-- via substr(), same fixed 12-entry lookup already used by every other area-level page.
select bezirk_code, bezirk_name, '/berlin/area/bezirk/' || bezirk_code as bezirk_link
from (
    select '01' as bezirk_code, 'Mitte' as bezirk_name
    union all select '02', 'Friedrichshain-Kreuzberg'
    union all select '03', 'Pankow'
    union all select '04', 'Charlottenburg-Wilmersdorf'
    union all select '05', 'Spandau'
    union all select '06', 'Steglitz-Zehlendorf'
    union all select '07', 'Tempelhof-Schöneberg'
    union all select '08', 'Neukölln'
    union all select '09', 'Treptow-Köpenick'
    union all select '10', 'Marzahn-Hellersdorf'
    union all select '11', 'Lichtenberg'
    union all select '12', 'Reinickendorf'
) t
where bezirk_code = substr('${params.code}', 1, 2)
```

```sql child_count
-- Gates every PLR-rollup section below. A live count, not a hardcoded 2-code enclave list --
-- see this file's header comment.
select count(*) as n
from gentriduck_marts.mart_ortsteil_plr_crosswalk
where ortsteil_area_code = '${params.code}' and is_dominant_ortsteil
```

```sql demographics
select
    reference_year,
    residents_total,
    age_under18_share,
    age_18_27_share,
    age_27_45_share,
    age_45_65_share,
    age_65plus_share,
    mean_age_years,
    any_indicator_suppressed,
    n_plr
from gentriduck_marts.mart_area_demographics
where city_code = 'BER' and area_level = 'ortsteil' and area_code = '${params.code}'
order by reference_year desc
limit 1
```

```sql age_mix
with latest as (
    select age_under18_share, age_18_27_share, age_27_45_share, age_45_65_share, age_65plus_share
    from gentriduck_marts.mart_area_demographics
    where city_code = 'BER' and area_level = 'ortsteil' and area_code = '${params.code}'
    order by reference_year desc
    limit 1
)
select 'Under 18' as age_band, age_under18_share as share, 1 as sort_order from latest
union all
select '18–27', age_18_27_share, 2 from latest
union all
select '27–45', age_27_45_share, 3 from latest
union all
select '45–65', age_45_65_share, 4 from latest
union all
select '65+', age_65plus_share, 5 from latest
order by sort_order
```

```sql stage_mix
select
    typology_stage as stage,
    n_plr as n_areas
from gentriduck_marts.mart_ortsteil_plr_stage_mix
where city_code = 'BER' and ortsteil_area_code = '${params.code}'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.mart_ortsteil_plr_stage_mix
      where city_code = 'BER'
  )
order by n_areas desc
```

```sql poi_mix
select
    poi.poi_category_h,
    sum(poi.poi_count) as poi_count
from gentriduck_marts.fct_poi_development as poi
inner join
    gentriduck_marts.mart_ortsteil_plr_crosswalk as xw
    on xw.plr_area_code = poi.area_code and xw.is_dominant_ortsteil
where poi.city_code = 'BER' and poi.area_vintage = 'lor_2021'
  and xw.ortsteil_area_code = '${params.code}'
  and poi.snapshot_year = (
      select max(snapshot_year) from gentriduck_marts.fct_poi_development
      where city_code = 'BER' and area_vintage = 'lor_2021'
  )
group by all
order by poi_count desc
```

```sql children
select
    xw.plr_area_code as area_code,
    coalesce(gi.area_name, xw.plr_area_code) as area_name,
    gi.status_class as stage,
    gi.dynamism_class as pressure_trend,
    xw.overlap_frac_of_plr,
    '/berlin/area/' || xw.plr_area_code as area_link
from gentriduck_marts.mart_ortsteil_plr_crosswalk as xw
left join
    gentriduck_marts.gentrification_index as gi
    on
        gi.area_code = xw.plr_area_code
        and gi.variant = 'live_data' and gi.area_level = 'plr' and gi.city_code = 'BER'
        and gi.period_yyyymm = (
            select max(period_yyyymm) from gentriduck_marts.gentrification_index
            where variant = 'live_data' and area_level = 'plr'
        )
where xw.ortsteil_area_code = '${params.code}' and xw.is_dominant_ortsteil
order by (gi.dynamism_class_bi = 'negative') desc, gi.dynamism_index desc
```

```sql dom_suppressed_count
-- #298 (I21-d): disclosed, not silently dropped (OA-D0 domain sign-off Condition B.4) -- same
-- discipline as the /methodology-oa-modes original this table relocates from. Runs unconditionally
-- (#255 precedent) -- returns 0/0 for the two never-dominant enclaves, gated at display time only.
select
    count(*) filter (where d.is_thin_base) as n_suppressed,
    count(*) filter (where not d.is_thin_base) as n_shown
from gentriduck_marts.mart_poi_dominance as d
inner join
    gentriduck_marts.mart_ortsteil_plr_crosswalk as xw
    on xw.plr_area_code = d.area_code and xw.is_dominant_ortsteil
where d.city_code = 'BER'
  and d.is_public_safe = true
  -- area_vintage/weight_variant pinned to avoid double-counting the same PLR across boundary
  -- vintages and weighting schemes -- see pages/berlin/area/bezirk/[code].md's header comment
  -- (#298 finding).
  and d.area_vintage = 'lor_2021'
  and d.weight_variant = 'standard'
  and d.dominance_group = '${inputs.dom_group.value}'
  and d.snapshot_year = ${inputs.dom_year.value}
  and xw.ortsteil_area_code = '${params.code}'
```

```sql dominance_children
-- This Ortsteil's dominantly-assigned constituent PLRs' already-computed dominance rows
-- (mart_poi_dominance is PLR-grain only -- no Ortsteil-level dominance figure exists to relocate).
-- Joined through the SAME dominant-overlap crosswalk (mart_ortsteil_plr_crosswalk.is_dominant_ortsteil)
-- the poi_mix/children queries above already use -- a filter/join, not a new aggregation.
select
    d.area_code,
    coalesce(gi.area_name, d.area_code) as area_name,
    d.hhi,
    d.top_share,
    d.top_child,
    d.top_child_offering_tier,
    d.n_children,
    d.group_stock_local,
    '/berlin/area/' || d.area_code as area_link
from gentriduck_marts.mart_poi_dominance as d
inner join
    gentriduck_marts.mart_ortsteil_plr_crosswalk as xw
    on xw.plr_area_code = d.area_code and xw.is_dominant_ortsteil
left join
    gentriduck_marts.gentrification_index as gi
    on
        gi.area_code = d.area_code and gi.variant = 'live_data' and gi.area_level = 'plr'
        and gi.city_code = 'BER'
        and gi.period_yyyymm = (
            select max(period_yyyymm) from gentriduck_marts.gentrification_index
            where variant = 'live_data' and area_level = 'plr'
        )
where
    d.city_code = 'BER'
    and d.is_public_safe = true
    -- area_vintage/weight_variant pinned (#298 finding, see pages/berlin/area/bezirk/[code].md's
    -- header comment) -- without this, the same PLR resurfaces once per boundary vintage x
    -- weighting scheme.
    and d.area_vintage = 'lor_2021'
    and d.weight_variant = 'standard'
    and d.dominance_group = '${inputs.dom_group.value}'
    and d.snapshot_year = ${inputs.dom_year.value}
    and not d.is_thin_base
    and xw.ortsteil_area_code = '${params.code}'
order by d.hhi desc
limit 15
```

<script>
  // #308: for the drill-down mini map's geoJsonUrl/link base-path prefixing (#144 convention) --
  // see this section's own "## Where this area sits" comment below.
  import { base } from '$app/paths';

  $: hasChildren = child_count?.[0] && Number(child_count[0].n) > 0;
  $: childrenRows = Array.isArray(children) ? children : Array.from(children ?? []);
  $: anyLowConfidence = childrenRows.some((r) => Number(r.overlap_frac_of_plr) < 0.8);

  // I21-f (#300): "Social status & trajectory" row-2 takeaway -- same modal/heterogeneity-flag
  // pattern as pages/berlin/area/bezirk/[code].md's own script (see that file's header comment for
  // the full rationale). Gated on hasChildren -- the two never-dominant enclaves have zero rows in
  // stage_mix_summary too, same as every other PLR-rollup section on this page.
  $: mssMix = stage_mix_summary?.[0];
  $: mssTakeaway = (!hasChildren || !mssMix || mssMix.n_total == null || Number(mssMix.n_total) === 0)
    ? null
    : (() => {
        const nTotal = Number(mssMix.n_total);
        const nAdvanced = Number(mssMix.n_advanced || 0);
        const topShare = mssMix.top_stage_share != null ? Number(mssMix.top_stage_share) : null;
        const majorityClause = (topShare != null && topShare > 0.5)
          ? `<b>${mssMix.top_stage}</b> is the only stage holding a majority (${Math.round(topShare * 100)}%)`
          : 'no single stage holds a majority';
        return `<b>${nAdvanced}</b> of <b>${nTotal}</b> neighbourhoods (Planungsräume) here are classified <b>active-gentrification</b> or <b>pioneer-signal</b>; ${majorityClause} — a distribution across this Ortsteil's own (dominantly-assigned) neighbourhoods, never a single re-scored gentrification-index value for the Ortsteil itself.`;
      })();
</script>

<Hero compact eyebrow="Chapter 3 — The Evidence" title="{ortsteil_name[0] ? ortsteil_name[0].area_name : 'Ortsteil'} — Ortsteil profile" lede="Population, composition, and neighbourhood-stage mix for this Ortsteil (Stadtteil), rolled up from its dominantly-assigned constituent Planungsräume — never a re-scored index at this grain." />

<!-- #255 precedent: guard on the VALUE, static-prefix href inside a one-line {#if} -- see
     pages/berlin/area/[code].md's Up-link comment for the full "undefined"-cascade rationale. -->
<p>Up: {#if bezirk_info[0]?.bezirk_code}<a href="/berlin/area/bezirk/{bezirk_info[0].bezirk_code}">{bezirk_info[0].bezirk_name}</a>{:else}<a href="/berlin/area/bezirk">District profile</a>{/if} · <a href="/berlin/area/ortsteil">all Ortsteile</a> · <a href="/berlin/area/bezirk">all districts</a> · <a href="/berlin/area">full neighbourhood list</a></p>

<!-- #326: same fix as pages/berlin/area/bezirk/[code].md's header comment -- the previous
     `<a href="/berlin/area/[code]">` here was a literal, non-templated `[code]` placeholder left in
     as real HTML, producing a bogus, always-identical `/berlin/area/[code]` crawl target. Fixed by
     pointing at the full neighbourhood list instead. -->
<Alert status="info">
  Ortsteil is a different (non-LOR) Berlin geography from the Planungsraum/Bezirksregion/
  Prognoseraum ladder used elsewhere on this site — it does not nest cleanly into Planungsräume, so
  its constituent-neighbourhood figures below are built from a <b>dominant area-overlap
  assignment</b> (each Planungsraum rolls into the one Ortsteil containing the largest share of its
  area), not a code-prefix match. Figures are <b>sums and population-weighted averages</b> under
  that assignment — never a separately re-scored index. See the
  <a href="/methodology">methodology page</a> for why coarse-grain areas are not re-scored, and any
  neighbourhood's own page in the <a href="/berlin/area">full neighbourhood list</a> for the actual
  gentrification index and trajectory.
</Alert>

{#if !hasChildren}
<Alert status="warning">
  <b>No Planungsraum is predominantly within this Ortsteil's boundary.</b> {ortsteil_name[0] ? ortsteil_name[0].area_name : 'This Ortsteil'} is a small enclave whose area is split across
  neighbouring Planungsräume, each of which has a larger share held by an adjacent Ortsteil — a
  genuine, disclosed consequence of the dominant area-overlap assignment used to build this site's
  Ortsteil rollups (not missing data). See
  <a href="/berlin/area/ortsteil">the full Ortsteil list</a> for the other 95 Ortsteile, or
  {#if bezirk_info[0]?.bezirk_code}<a href="/berlin/area/bezirk/{bezirk_info[0].bezirk_code}">{bezirk_info[0].bezirk_name}'s district profile</a>{:else}<a href="/berlin/area/bezirk">this Ortsteil's district profile</a>{/if}
  for area-level statistics instead.
</Alert>
{/if}


## Social status & trajectory

Every neighbourhood (Planungsraum) dominantly assigned to this Ortsteil, grouped by its current
gentrification stage — a **count**, not a re-scored Ortsteil-level index. See the
[methodology page](/methodology) for what each stage means; see
`docs/epic-i/I-coarse-index-geo-decision.md` / `docs/epic-i/I-coarse-index-domain-decision.md` for
why this project reports a distribution here, never a single re-scored index value, at any grain
coarser than a single Planungsraum.

<!-- `stage_mix` itself is already declared in this page's upfront query block above (not
     re-declared here -- Evidence sql-fence names must be unique per page); only the new
     `stage_mix_summary` rollup is added here, reusing the same mart/filter. -->

```sql stage_mix_summary
-- Modal stage + heterogeneity flag, computed from the SAME stage_mix rows above (no new query
-- logic) -- see pages/berlin/area/bezirk/[code].md's matching query for the full rationale. Runs
-- unconditionally (#255 precedent); returns zero rows for the two never-dominant enclaves, gated at
-- display time only (hasChildren, in this page's <script> block).
with
    mix as (
        select
            typology_stage as stage,
            n_plr as n_areas
        from gentriduck_marts.mart_ortsteil_plr_stage_mix
        where city_code = 'BER' and ortsteil_area_code = '${params.code}'
          and period_yyyymm = (
              select max(period_yyyymm) from gentriduck_marts.mart_ortsteil_plr_stage_mix
              where city_code = 'BER'
          )
    ),
    totals as (select sum(n_areas) as n_total from mix),
    top as (select stage, n_areas from mix order by n_areas desc limit 1),
    advanced as (
        select coalesce(sum(n_areas), 0) as n_advanced
        from mix
        where stage in ('active-gentrification', 'pioneer-signal')
    )
select
    t.n_total,
    top.stage as top_stage,
    top.n_areas as top_stage_n,
    (top.n_areas::double / nullif(t.n_total, 0)) as top_stage_share,
    a.n_advanced,
    (a.n_advanced::double / nullif(t.n_total, 0)) as advanced_share
from totals as t cross join top cross join advanced as a
```

{#if hasChildren}
{#if mssTakeaway}
<p>{@html mssTakeaway}</p>
{/if}
<BarChart data={stage_mix} x=stage y=n_areas title="Neighbourhoods by stage, {ortsteil_name[0] ? ortsteil_name[0].area_name : 'this Ortsteil'}" swapXY=true/>
{:else}
<Alert status="info">No neighbourhood-stage mix for this enclave — see the note above.</Alert>
{/if}

## Commercial mix & Offering Advantage

### Mapped places

{#if hasChildren}
<BarChart data={poi_mix} x=poi_category_h y=poi_count title="Mapped places by category (latest snapshot), {ortsteil_name[0] ? ortsteil_name[0].area_name : 'this Ortsteil'}" swapXY=true/>
{:else}
<Alert status="info">No mapped-place breakdown for this enclave — see the note above.</Alert>
{/if}


## Within-group dominance

{#if hasChildren}
<Alert status="info">
  <b>Dominance is sign-blind</b> — a high concentration figure says only that a group's mix is
  concentrated in the named leading type, never whether that is an up-market or down-market shift.
  Read it alongside each neighbourhood's own status/dynamism trajectory. Cuisine-typed dominance is
  barred from this table (public-safe groups only); see the
  <a href="/methodology-oa-modes">Offering Advantage decoder</a> §5 for the full ethics note.
</Alert>

<Dropdown name="dom_group" title="Business group" defaultValue="gastronomy_category">
  <DropdownOption value="gastronomy_category" valueLabel="Gastronomy (Café / Restaurant / Fast Food)"/>
  <DropdownOption value="retail_category" valueLabel="Retail (12 categories)"/>
  <DropdownOption value="entertainment_category" valueLabel="Entertainment (Bar / Nightlife / Culture / Leisure)"/>
  <DropdownOption value="wellness_curated" valueLabel="Wellness / fitness (curated cross-domain group)"/>
</Dropdown>

<Dropdown name="dom_year" title="Year" defaultValue="2025">
  <DropdownOption value="2025" valueLabel="2025"/>
  <DropdownOption value="2024" valueLabel="2024"/>
  <DropdownOption value="2023" valueLabel="2023"/>
  <DropdownOption value="2022" valueLabel="2022"/>
  <DropdownOption value="2021" valueLabel="2021"/>
  <DropdownOption value="2020" valueLabel="2020"/>
</Dropdown>

<Alert status="info">
  <b>{dom_suppressed_count[0] ? dom_suppressed_count[0].n_suppressed : 0} of {dom_suppressed_count[0] ? (dom_suppressed_count[0].n_suppressed + dom_suppressed_count[0].n_shown) : 0} neighbourhoods here are suppressed below as too thinly observed to characterize</b> — never read that as "commercially dead," only as "too few businesses in this group here to say anything about the mix."
</Alert>

<DataTable data={dominance_children} rows=15 link=area_link emptySet="warn" emptyMessage="No non-suppressed neighbourhoods for this group/year in this Ortsteil.">
    <Column id=area_name title="Neighbourhood (PLR)"/>
    <Column id=hhi title="HHI (higher = more concentrated)" fmt="num2"/>
    <Column id=top_share title="Top-share" fmt="pct1"/>
    <Column id=top_child title="Leading type"/>
    <Column id=n_children title="Types in this group here"/>
    <Column id=group_stock_local title="Group's total POI count here" fmt="num0"/>
</DataTable>
{:else}
<Alert status="info">No within-group dominance figures for this enclave — see the note above.</Alert>
{/if}

<!-- #298 (I21-d): this closing note is intentionally OUTSIDE the {#if hasChildren} block -- it is
     generic interpretive guidance, not enclave-dependent, and keeping prose text outside (rather
     than immediately before) an {:else} boundary avoids a markdown-paragraph/Svelte-block parse
     conflict (mdsvex needs a plain HTML tag or a blank-line-terminated block before {:else}, not an
     inline paragraph -- see /berlin/area/[code].md's population section for the established
     `<p>{#if}...{:else}...{/if}</p>` idiom this page's DataTable/Alert branching can't use directly
     since a <DataTable> can't nest inside a <p>). -->
A high HHI/top-share here says only that a neighbourhood's mix is concentrated in the named leading
type — never, by itself, whether that concentration is an up-market or down-market signal. Compare
against each neighbourhood's own status/dynamism trajectory before drawing any conclusion. See the
[Offering Advantage decoder](/methodology-oa-modes) for the full dominance methodology.


## People & structure

{#if hasChildren}
<BigValue data={demographics} value=residents_total title="Residents (latest EWR year)" fmt="num0" emptySet="warn"/>
<BigValue data={demographics} value=n_plr title="Constituent neighbourhoods (dominant PLR assignment)" emptySet="warn"/>
<BigValue data={demographics} value=mean_age_years title="Mean age (years)" fmt="num1" emptySet="warn"/>

{#if demographics && demographics[0] && demographics[0].any_indicator_suppressed}
<Alert status="warning">
  At least one constituent neighbourhood had a suppressed EWR cell (small-count privacy rule) —
  this Ortsteil's figures may understate the true total.
</Alert>
{/if}

<BarChart data={age_mix} x=age_band y=share title="Age structure, {ortsteil_name[0] ? ortsteil_name[0].area_name : 'this Ortsteil'}" yFmt="pct0"/>
{:else}
<Alert status="info">No population/composition figures for this enclave — see the note above.</Alert>
{/if}


## Where this area sits

<!--
  #308: shared per-area drill-down mini map (web/components/AreaDrilldownMap.svelte). Ortsteil has
  no child level in mart_area_hierarchy (Ortsteil<->PLR is a non-nesting area-overlap crosswalk, not
  a hierarchy edge -- see this page's own header comment) -- grouped with Berlin's PLR page as one of
  the two finest-grain, no-drill-down levels per the #308 issue text. Self-only: this Ortsteil's own
  polygon highlighted for orientation, no clickable children (reuses `ortsteil_self.geojson`, a
  plain per-Ortsteil FeatureCollection -- see web/scripts/export_area_geojson.py).
-->
```sql minimap_areas
-- Name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced name
-- containing a quote character can never break this query's own SQL syntax.
select
    'ortsteil:' || '${params.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${params.code}') as area_name,
    'This area' as role,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'ortsteil' and area_code = '${params.code}'
```

<AreaDrilldownMap
    data={minimap_areas}
    geoJsonUrl={`${base}/geo/ortsteil_self.geojson`}
    title="{ortsteil_name[0] ? ortsteil_name[0].area_name : 'This Ortsteil'}"
/>

### Neighbourhoods (Planungsräume) dominantly assigned to this Ortsteil

{#if hasChildren}
<DataTable data={children} rows=20 link=area_link>
    <Column id=area_name title="Neighbourhood (PLR)"/>
    <Column id=stage title="Stage"/>
    <Column id=pressure_trend title="Pressure trend"/>
    <Column id=overlap_frac_of_plr title="% of PLR within this Ortsteil" fmt="pct0"/>
</DataTable>

{#if anyLowConfidence}
<Alert status="warning">
  At least one neighbourhood above is only <b>partially</b> (under 80% of its own area) within this
  Ortsteil's boundary, but rolls into it entirely under the dominant-assignment rule (its largest
  single-Ortsteil share happens to be here) — see the
  <a href="/methodology">methodology page</a> for why a whole-PLR figure, not a fractional split, is
  used.
</Alert>
{/if}
{:else}
<Alert status="info">No constituent neighbourhoods for this enclave — see the note above.</Alert>
{/if}

## Honest caveats

- **This page never shows a single re-scored gentrification-index value for this Ortsteil** — only
  the distribution of its dominantly-assigned constituent neighbourhoods' (Planungsräume) own
  stages. A population-weighted average of ordinal stage/Dynamik classes would violate this
  project's own "never average ordinal class codes" rule and would describe no actual neighbourhood
  while masking exactly the frontier heterogeneity gentrification tracking depends on (see
  `docs/epic-i/I-coarse-index-geo-decision.md` / `docs/epic-i/I-coarse-index-domain-decision.md`,
  both **decline** the coarse-grain point value).
- **Ortsteil rollups use a dominant area-overlap assignment, not a code-prefix match** — a
  Planungsraum rolls entirely into the one Ortsteil holding the largest share of its area, so a
  neighbourhood only partially within this Ortsteil's boundary can still appear here in full (see
  the confidence disclosure above whenever it renders).
- **No Offering Advantage or MSS status/Dynamik estimate is published at Ortsteil grain** —
  `mart_poi_oa_arealevel`/`mart_mss_area_aggregate` do not cover this non-LOR geography (see this
  page's own header comment). See any constituent neighbourhood's own page for those figures.
- Figures on this page are **sums and population-weighted averages** under the dominant-overlap
  assignment, never observed at the Ortsteil level itself. Land value and estimated rent are only
  published at the individual-neighbourhood grain.
- See [methodology & data sources §6](/methodology) for the full list of project-wide limitations
  (ecological fallacy, no displacement measurement, OSM completeness bias, and more).

## Further reading

See [methodology & data sources](/methodology) for what the index means and why coarser grains are
reported as distributions rather than a re-scored value, [the full Ortsteil list](/berlin/area/ortsteil)
for other Ortsteile, or drill into any of this Ortsteil's own neighbourhoods above for the full
profile, index, and trajectory.


---

<FooterNav />
