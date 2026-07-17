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

<script>
  $: hasChildren = child_count?.[0] && Number(child_count[0].n) > 0;
  $: childrenRows = Array.isArray(children) ? children : Array.from(children ?? []);
  $: anyLowConfidence = childrenRows.some((r) => Number(r.overlap_frac_of_plr) < 0.8);
</script>

<Hero compact eyebrow="Chapter 3 — The Evidence" title="{ortsteil_name[0] ? ortsteil_name[0].area_name : 'Ortsteil'} — Ortsteil profile" lede="Population, composition, and neighbourhood-stage mix for this Ortsteil (Stadtteil), rolled up from its dominantly-assigned constituent Planungsräume — never a re-scored index at this grain." />

<!-- #255 precedent: guard on the VALUE, static-prefix href inside a one-line {#if} -- see
     pages/berlin/area/[code].md's Up-link comment for the full "undefined"-cascade rationale. -->
<p>Up: {#if bezirk_info[0]?.bezirk_code}<a href="/berlin/area/bezirk/{bezirk_info[0].bezirk_code}">{bezirk_info[0].bezirk_name}</a>{:else}<a href="/berlin/area/bezirk">District profile</a>{/if} · <a href="/berlin/area/ortsteil">all Ortsteile</a> · <a href="/berlin/area/bezirk">all districts</a> · <a href="/berlin/area">full neighbourhood list</a></p>

<Alert status="info">
  Ortsteil is a different (non-LOR) Berlin geography from the Planungsraum/Bezirksregion/
  Prognoseraum ladder used elsewhere on this site — it does not nest cleanly into Planungsräume, so
  its constituent-neighbourhood figures below are built from a <b>dominant area-overlap
  assignment</b> (each Planungsraum rolls into the one Ortsteil containing the largest share of its
  area), not a code-prefix match. Figures are <b>sums and population-weighted averages</b> under
  that assignment — never a separately re-scored index. See the
  <a href="/methodology">methodology page</a> for why coarse-grain areas are not re-scored, and
  <a href="/berlin/area/[code]">any neighbourhood's own page</a> for the actual gentrification
  index and trajectory.
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

## Population & composition

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

## Neighbourhood stage mix

Every neighbourhood (Planungsraum) dominantly assigned to this Ortsteil, grouped by its current
gentrification stage — a **count**, not a re-scored Ortsteil-level index. See the
[methodology page](/methodology) for what each stage means.

{#if hasChildren}
<BarChart data={stage_mix} x=stage y=n_areas title="Neighbourhoods by stage, {ortsteil_name[0] ? ortsteil_name[0].area_name : 'this Ortsteil'}" swapXY=true/>
{:else}
<Alert status="info">No neighbourhood-stage mix for this enclave — see the note above.</Alert>
{/if}

## Mapped places

{#if hasChildren}
<BarChart data={poi_mix} x=poi_category_h y=poi_count title="Mapped places by category (latest snapshot), {ortsteil_name[0] ? ortsteil_name[0].area_name : 'this Ortsteil'}" swapXY=true/>
{:else}
<Alert status="info">No mapped-place breakdown for this enclave — see the note above.</Alert>
{/if}

## Neighbourhoods (Planungsräume) dominantly assigned to this Ortsteil

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

---

<FooterNav />
