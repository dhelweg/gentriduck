---
title: District & area profiles
sidebar_position: 6
---

<!--
  #247 (I18-web slice 2): crawlable entry point for the new Bezirk / Prognoseraum (PGR) /
  Bezirksregion (BZR) profile-page ladder, following the exact same pattern
  pages/berlin/area/index.md already uses for the 542 PLR pages (Evidence's static build only
  discovers a templated route by crawling a real, server-rendered `<a href>` -- see that page's
  header comment). All 12 districts render here at build time, so this page is what makes the
  /berlin/area/bezirk/[code] pages (and, by chained crawl from each district page's own child
  table, every /berlin/area/pgr/[code] and /berlin/area/bzr/[code] page) buildable at all.

  Phase-1 coarse-grain content only -- population/composition sums (mart_area_demographics, #243,
  I19-geo-signoff.md), a distribution of child PLRs over the six ADR-0008 typology_stage values
  (a COUNT, not a re-scored index), and mapped-place counts. Explicitly NO re-scored
  gentrification_index at Bezirk/PGR/BZR grain (I18-geo-signoff.md's scope note) -- see this
  ticket's slice-2 geo-DS sign-off (docs/epic-i/I18-web-geo-signoff.md) for what is/isn't covered.

  MSS status/Dynamik-at-BZR (int_mss_bzr_aggregate) is DEFERRED to a follow-up ticket, not shown
  here: that model isn't yet exposed as a mart, and its own header caveats it "may mis-stage
  boundary BZRs/Bezirke" -- publishing it on a public profile page needs its own geo-DS pass on
  fitness for display, not just fitness for the MAUP probe it was built for (B10, #120). See the
  filed follow-up issue referenced in this ticket's closing comment.
-->

<Hero compact eyebrow="Chapter 3 — The Evidence" title="District & area profiles" lede="Berlin's Bezirke (districts), Prognoseräume, and Bezirksregionen — coarser-grain profiles above the neighbourhood (Planungsraum) level, for readers who want the district or sub-district picture at a glance." />

Each level shows population and composition sums (never a re-scored index — see the
[methodology page](/methodology) for why coarse-grain areas are not re-scored) and how many of
their constituent neighbourhoods currently sit in each gentrification stage. For a single
neighbourhood's full profile, use the [district browse](/berlin/area-detail) or
[full neighbourhood list](/berlin/area) instead.

```sql bezirke
select
    bezirk_code,
    bezirk_name,
    '/berlin/area/bezirk/' || bezirk_code as bezirk_link
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
order by bezirk_code
```

<DataTable data={bezirke} rows=12 link=bezirk_link>
    <Column id=bezirk_code title="Code"/>
    <Column id=bezirk_name title="District"/>
</DataTable>

---

<FooterNav />
