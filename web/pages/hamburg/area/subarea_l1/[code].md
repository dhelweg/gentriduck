---
breadcrumb: "select area_name as breadcrumb from gentriduck_marts.dim_area_geometry where city_code = 'HH' and area_level = 'subarea_l1' and area_code = '${params.code}' limit 1"
---

<!--
  I21-g (#301, parent #284/I21): Hamburg's `headline`-grain (Stadtteil / BZR-equivalent) profile
  page — the Hamburg counterpart of pages/berlin/area/bzr/[code].md, per
  docs/epic-i/I21-ia-restructure-scoping.md §2.2's `headline` row and the route shape decided in
  docs/epic-i/I21-a-route-ruling.md §2/§4 (`/hamburg/area/subarea_l1/[code]`, `subarea_l1` being
  Hamburg's own vocabulary term for the generic `headline` slot).

  Discovered/crawled via pages/hamburg/area/subarea_l1/index.md's 104-row Stadtteil table (a flat
  index, not a chained crawl from the district page — see that index page's own header comment for
  why).

  SCOPE (Track 1 of I21 §4 — structure only, no live data): same discipline as every other page in
  this scaffold — the canonical `headline` section order renders in full, but every substantive
  section shows the shared <NotYetPublished> honest-deferred state rather than a live query.
  area_name IS read from dim_area_geometry (structural — Hamburg's 104 Stadtteile are genuinely
  named in the source data), same "plumbing, not a statistic" precedent as every index page here.

  Hierarchy nav (§2.2 row 8): a `headline` grain has BOTH a parent (district) and children
  (subarea_l2 / Gebiete in this Stadtteil) — mirrors Berlin's BZR page shape. Both edges exist on
  the data layer (district -> subarea_l1 is source-provided; subarea_l2 -> subarea_l1 is the OA-D1b
  spatial crosswalk, #240, geo-DS + domain-expert PASS).

  #302 (I21-h): closes the web-layer wiring gap flagged in the previous version of this comment
  (kept in git history) — both edges are now published via the thin pass-through mart
  mart_area_hierarchy.sql (transform/models/marts/, exported by
  transform/export_serving_parquet.py, registered under
  web/sources/gentriduck_marts/mart_area_hierarchy.sql). Export/wiring only — no re-derivation of
  either edge (see mart_area_hierarchy.sql's own header for the grounding citation back to
  OA-D1b/#240). The "Up:" link and the "Gebiete in this Stadtteil" children table below now query
  that mart for real parent/child codes + names (names joined from dim_area_geometry), replacing
  the previous deferred-state Alerts.
-->

```sql stadtteil_name
select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l1' and area_code = '${params.code}'
limit 1
```

```sql parent_info
-- #302 (I21-h): resolved parent district, via mart_area_hierarchy (thin pass-through of
-- dim_area_hierarchy's hh_l1_to_district CTE, a source-provided WFS attribute -- see that model's
-- header). Joined against dim_area_geometry for the display name.
select
    h.parent_area_code as district_code,
    g.area_name as district_name
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'district' and g.area_code = h.parent_area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l1' and h.area_code = '${params.code}'
limit 1
```

```sql children
-- #302 (I21-h): constituent Gebiete, via mart_area_hierarchy (thin pass-through of
-- dim_area_hierarchy's hh_l2_to_l1 CTE, the OA-D1b/#240 spatial crosswalk -- see that model's
-- header for the method; this query re-derives nothing). Joined against dim_area_geometry for the
-- display name -- structural links only, no statistic (I21-i, #303, publishes real figures).
select
    h.area_code as gebiet_code,
    coalesce(g.area_name, h.area_code) as gebiet_name,
    '/hamburg/area/' || h.area_code as gebiet_link
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'subarea_l2' and g.area_code = h.area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.parent_area_code = '${params.code}'
order by gebiet_name
```

<Hero compact eyebrow="Chapter 3 — The Evidence" title="{stadtteil_name[0] ? stadtteil_name[0].area_name : 'Stadtteil'}" lede="Hamburg's Stadtteil-level (Bezirksregion-equivalent) scaffold — the headline scale between district and statistisches Gebiet. Structural scaffold only (I21-g, #301); no real figures are published yet." />

<!-- #302 (I21-h): real "Up:" link, same #255-precedent value-guarded static-prefix-href pattern
     as pages/berlin/area/[code].md's own Up-link. -->
<p>Up: {#if parent_info[0]?.district_code}<a href="/hamburg/area/district/{parent_info[0].district_code}">{parent_info[0].district_name ?? 'District profile'}</a>{:else}<a href="/hamburg/area/district">District profile</a>{/if} · <a href="/hamburg/area/subarea_l1">all Stadtteile</a> · <a href="/hamburg/area/district">all districts</a></p>

[All Stadtteile](/hamburg/area/subarea_l1) · [Districts](/hamburg/area/district) ·
[Hamburg data hub](/hamburg)

<NotYetPublished pageLevel what="this Stadtteil's status, trajectory, commercial mix, and demographic profile" />

## Social status & trajectory

Once published, this section will show a **distribution** of this Stadtteil's constituent Gebiete's
own stages — never a single re-scored index value for the Stadtteil itself, unless a future ticket
promotes this grain to primary-equivalent scoring (currently out of scope; see
`docs/epic-i/I21-ia-restructure-scoping.md` §2.2's `headline` row).

<NotYetPublished what="a neighbourhood-stage distribution for this Stadtteil" />

## Commercial mix & Offering Advantage

<NotYetPublished what="this Stadtteil's commercial-mix breakdown and Offering Advantage roll-up" />

## Within-group dominance

<NotYetPublished what="within-group dominance figures for this Stadtteil" />

## People & structure

<NotYetPublished what="demographic sums for this Stadtteil" />

## Amenities & everyday infrastructure

<NotYetPublished what="everyday-infrastructure sums for this Stadtteil" />

## Land value & estimated rent

<NotYetPublished what="land value / estimated rent figures for this Stadtteil" />

## Where this area sits

### Gebiete in this Stadtteil

<DataTable data={children} rows=20 link=gebiet_link emptySet="warn" emptyMessage="No constituent Gebiete found for this Stadtteil.">
    <Column id=gebiet_name title="Statistisches Gebiet"/>
</DataTable>

This Stadtteil's parent district is linked above ("Up:") and this list of constituent Gebiete both
come from <code>mart_area_hierarchy</code> (#302, I21-h), a thin pass-through of
<code>dim_area_hierarchy.sql</code>'s <code>hh_l1_to_district</code> (source-provided) and
<code>hh_l2_to_l1</code> (OA-D1b/#240 spatial crosswalk, geo-DS + domain-expert PASS) edges — this
ticket publishes those already-resolved edges to the web layer without re-deciding either method.

## Honest caveats

- **This entire page is a structural scaffold (I21-g, #301).** No section above shows a real
  Hamburg figure — publishing this page's content is a separately-gated follow-up (I21-i, #303).
- **The "Up" link and "Gebiete in this Stadtteil" table are real, not placeholders (#302, I21-h).**
  The underlying parent/child links were resolved and signed off earlier (one source-provided, one
  the OA-D1b/#240 spatial crosswalk); this ticket only publishes them to the web layer.
- See [Hamburg's data hub](/hamburg) for the full, current inventory of what is and isn't published
  for Hamburg, and [methodology & data sources §6](/methodology) for how Hamburg's data differs from
  Berlin's generally.

## Further reading

See the [Hamburg data hub](/hamburg) for what's published today, [Hamburg's map](/hamburg/maps) for
this Stadtteil's constituent areas' already-public gentrification-stage figures, or
[the area-hierarchy reference](/reference/area-hierarchy) for how Hamburg's small-area geography is
structured.

---

<FooterNav />
