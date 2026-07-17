---
title: Ortsteile (Stadtteile)
sidebar_position: 7
---

<!--
  #269 (I-ortsteile): crawlable entry point for the 97 Ortsteil (Stadtteil) profile pages, following
  the exact same "index.md + [param].md" templated-page pattern already used for Bezirk
  (pages/berlin/area/bezirk/index.md) and for the 542 PLR pages (pages/berlin/area/index.md) --
  Evidence's static build only discovers a templated route by crawling a real, server-rendered
  `<a href>` (see those pages' own header comments), so this table of all 97 rows is what makes
  every /berlin/area/ortsteil/[code] page buildable at all.

  Ortsteil is a non-LOR Berlin geography (legally defined Bezirk subdivision) that does not nest
  into the PLR/BZR/PGR ladder -- see pages/berlin/area/ortsteil/[code].md's header comment and
  docs/epic-i/I-ortsteile-geo-signoff.md for the dominant PLR<->Ortsteil area-overlap crosswalk this
  site uses instead of a code-prefix match. "Constituent PLRs" below counts each Ortsteil's
  dominantly-assigned Planungsräume (mart_ortsteil_plr_crosswalk) -- 0 for the two small enclaves
  that are never anyone's dominant assignment (Schlachtensee 0608, Malchow 1106; see that page's
  binding-condition handling), disclosed here as a plain 0 in a labelled column (not hidden), so a
  reader browsing this list already sees which Ortsteile have a different page shape before
  clicking through.
-->

<Hero compact eyebrow="Chapter 3 — The Evidence" title="Ortsteile (Stadtteile)" lede="Berlin's 97 Ortsteile — a non-LOR, legally-defined district subdivision distinct from the Planungsraum/Bezirksregion/Prognoseraum ladder used elsewhere on this site." />

Each Ortsteil page shows population and composition sums (never a re-scored index — see the
[methodology page](/methodology)) and how many of its dominantly-assigned constituent neighbourhoods
(Planungsräume) currently sit in each gentrification stage. Two Ortsteile — small enclaves that are
never the largest-share (dominant) assignment for any Planungsraum — show 0 constituent PLRs below
and render an explicit empty state on their own page rather than a misleading zero; see the
[district & area profiles hub](/berlin/area) for the Bezirk/Prognoseraum/Bezirksregion ladder, or the
[full neighbourhood list](/berlin/area) for individual Planungsräume.

```sql ortsteile
select
    o.area_code as ortsteil_code,
    o.area_name as ortsteil_name,
    substr(o.area_code, 1, 2) as bezirk_code,
    coalesce(x.n_plr, 0) as n_plr,
    '/berlin/area/ortsteil/' || o.area_code as ortsteil_link
from gentriduck_marts.dim_area_geometry as o
left join
    (
        select ortsteil_area_code, count(*) as n_plr
        from gentriduck_marts.mart_ortsteil_plr_crosswalk
        where is_dominant_ortsteil
        group by ortsteil_area_code
    ) as x
    on x.ortsteil_area_code = o.area_code
where o.city_code = 'BER' and o.area_level = 'ortsteil'
order by o.area_name
```

<DataTable data={ortsteile} rows=97 search=true link=ortsteil_link>
    <Column id=ortsteil_name title="Ortsteil"/>
    <Column id=bezirk_code title="District code"/>
    <Column id=n_plr title="Constituent PLRs (dominant assignment)"/>
</DataTable>

---

<FooterNav />
