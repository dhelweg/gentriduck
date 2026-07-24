---
breadcrumb: "select area_name as breadcrumb from gentriduck_marts.dim_area_geometry where city_code = 'HH' and area_level = 'district' and area_code = '${params.code}' limit 1"
---

<!--
  I21-g (#301, parent #284/I21): Hamburg's `context_only`-grain (district / Bezirk-equivalent)
  profile page — the Hamburg counterpart of pages/berlin/area/bezirk/[code].md, per
  docs/epic-i/I21-ia-restructure-scoping.md §2.2's `context_only` row and the route shape decided in
  docs/epic-i/I21-a-route-ruling.md §2/§4 (`/hamburg/area/district/[code]`, `district` being
  Hamburg's own vocabulary term for the generic `context_only` slot).

  Discovered/crawled via pages/hamburg/area/district/index.md's 7-row district table.

  SCOPE (Track 1 of I21 §4 — structure only, no live data): same discipline as
  pages/hamburg/area/[code].md — the canonical `context_only` section order renders in full, but
  every substantive section shows the shared <NotYetPublished> honest-deferred state rather than a
  live query, even for marts that hardcode-restrict to Berlin (mart_area_demographics,
  fct_gentrification_change — see docs/epic-i/I21-web-feasibility.md §5's publish-gate
  footnote) or, as of #314, admit Hamburg rows (fct_gentrification_trajectory) but have no page
  section wired to them yet: a fixed placeholder is used instead of relying on an incidental
  empty/unwired query result, so this page's honesty doesn't depend on which marts happen to be
  city-gated today (see NotYetPublished.svelte's own header comment).
  area_name IS read from dim_area_geometry (structural — Hamburg's 7 districts are genuinely named
  in the source data), the same "plumbing, not a statistic" precedent as the district index page.

  Per §2.2's `context_only` row, this grain would NEVER show a re-scored index value even once
  published (docs/epic-i/I-coarse-index-geo-decision.md / -domain-decision.md, DECLINE) — only a
  distribution + modal/heterogeneity flag, same rule Berlin's own bezirk/pgr/bzr pages already
  follow (see pages/berlin/area/bezirk/[code].md's header comment). Noted here so a future I21-i
  pass knows this page's eventual "Social status" section is a distribution, not a BigValue, even
  once real data is wired in.

  Hierarchy nav (§2.2 row 8): a `context_only` grain has children (subarea_l1 / Stadtteile in this
  district) and no parent (district is Hamburg's coarsest level) — mirrors Berlin bezirk's own
  up-link-less, children-table-only treatment. Hamburg's district -> subarea_l1 edge is
  SOURCE-PROVIDED (the WFS 'bezirk' attribute on the Stadtteil layer, passed through unmodified in
  dim_area_hierarchy.sql's `hh_l1_to_district` CTE — not a derivation, unlike the L2->L1 spatial
  crosswalk).

  #302 (I21-h): closes the web-layer wiring gap flagged in the previous version of this comment
  (kept in git history) — this edge is now published via the thin pass-through mart
  mart_area_hierarchy.sql (transform/models/marts/, exported by
  transform/export_serving_parquet.py, registered under
  web/sources/gentriduck_marts/mart_area_hierarchy.sql). Export/wiring only — no re-derivation (see
  mart_area_hierarchy.sql's own header for the grounding citation). The "Stadtteile in this
  district" table below now queries that mart for real child codes + names (names joined from
  dim_area_geometry), replacing the previous deferred-state Alert.
-->

```sql district_name
select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'district' and area_code = '${params.code}'
limit 1
```

```sql children
-- #302 (I21-h): constituent Stadtteile, via mart_area_hierarchy (thin pass-through of
-- dim_area_hierarchy's hh_l1_to_district CTE, a source-provided WFS attribute -- see that model's
-- header). Joined against dim_area_geometry for the display name -- structural links only, no
-- statistic (I21-i, #303, publishes real figures).
select
    h.area_code as stadtteil_code,
    coalesce(g.area_name, h.area_code) as stadtteil_name,
    '/hamburg/area/subarea_l1/' || h.area_code as stadtteil_link
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'subarea_l1' and g.area_code = h.area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l1' and h.parent_area_code = '${params.code}'
order by stadtteil_name
```

<Hero compact eyebrow="Chapter 3 — The Evidence" title="{district_name[0] ? district_name[0].area_name : 'District'} — district profile" lede="Hamburg's district-level (Bezirk-equivalent) scaffold — the coarsest grain in Hamburg's area hierarchy. Structural scaffold only (I21-g, #301); no real figures are published yet." />

[All districts](/hamburg/area/district) · [Hamburg data hub](/hamburg)

<NotYetPublished pageLevel what="this district's population, gentrification-stage distribution, commercial mix, and demographic sums" />

## Social status & trajectory

Once published, this section will show a **distribution** of this district's constituent
Stadtteile'/Gebiete's own stages — never a single re-scored index value for the district itself
(same rule already governing Berlin's Bezirk/PGR/BZR pages; see
[methodology](/methodology) and `docs/epic-i/I-coarse-index-geo-decision.md`).

<NotYetPublished what="a neighbourhood-stage distribution for this district" />

## Commercial mix & Offering Advantage

<NotYetPublished what="this district's commercial-mix breakdown and Offering Advantage roll-up" />

## Within-group dominance

<NotYetPublished what="within-group dominance figures for this district" />

## People & structure

<NotYetPublished what="demographic sums for this district" />

## Amenities & everyday infrastructure

<NotYetPublished what="everyday-infrastructure sums for this district" />

## Land value & estimated rent

<NotYetPublished what="land value / estimated rent figures for this district" />

## Where this area sits

### Stadtteile in this district

<DataTable data={children} rows=20 link=stadtteil_link emptySet="warn" emptyMessage="No constituent Stadtteile found for this district.">
    <Column id=stadtteil_name title="Stadtteil"/>
</DataTable>

This table comes from <code>mart_area_hierarchy</code> (#302, I21-h), a thin pass-through of
<code>dim_area_hierarchy.sql</code>'s <code>hh_l1_to_district</code> edge (source-provided, the
Hamburg WFS district attribute) — this ticket publishes that already-resolved edge to the web layer
without re-deciding it.

## Honest caveats

- **This entire page is a structural scaffold (I21-g, #301).** No section above shows a real
  Hamburg figure — publishing this page's content is a separately-gated follow-up (I21-i, #303).
- **Even once published, this grain will never show a single re-scored gentrification-index value**
  — only a distribution of its constituent areas' own stages, per the same ruling already governing
  Berlin's Bezirk/PGR/BZR pages (`docs/epic-i/I-coarse-index-geo-decision.md`, DECLINE).
- **The "Stadtteile in this district" table is real, not a placeholder (#302, I21-h).** The
  underlying parent link is source-provided and was already resolved in the data layer; this ticket
  only publishes it to the web layer.
- See [Hamburg's data hub](/hamburg) for the full, current inventory of what is and isn't published
  for Hamburg, and [methodology & data sources §6](/methodology) for how Hamburg's data differs from
  Berlin's generally.

## Further reading

See the [Hamburg data hub](/hamburg) for what's published today, [Hamburg's map](/hamburg/maps) for
this district's constituent areas' already-public gentrification-stage figures, or
[the area-hierarchy reference](/reference/area-hierarchy) for how Hamburg's small-area geography is
structured.

---

<FooterNav />
