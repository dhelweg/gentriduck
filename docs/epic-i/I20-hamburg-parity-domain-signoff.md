# I20 Hamburg parity + "none is named" branch — domain re-consult: gentrification-domain-expert

**Trigger:** condition 5 of `docs/epic-i/I20-domain-signoff.md` (lightweight re-consult on new
reader-facing copy). **Commit reviewed:** `812137d3` ("feat(web): Hamburg area pages show amenities
and most common cuisine").
**Copy in scope:** the "Amenities & everyday infrastructure" block on
`web/pages/hamburg/area/[code].md` (statistisches Gebiet) and
`web/pages/hamburg/area/subarea_l1/[code].md` (Stadtteil), plus the new
`n >= 8 && share < 0.15` cuisine branch on all five amenities pages (those two plus Berlin
`area/[code].md`, `area/bzr/[code].md`, `area/pgr/[code].md`).
**Reviewer:** gentrification-domain-expert. **Date:** 2026-10-27. Files read only; no warehouse query.

## Verdict: PASS with conditions

Verdict: PASS with conditions

## Check against the five I20 conditions

1. **"Most common", not "dominant"** — met. The reader-facing copy says "most common cuisine"
   throughout; `dominant_*` appears only in column names and HTML comments.
2. **Co-equal district comparison** — met. Plain two-column `DataTable` ("This area" / "District
   total"), same units, fixed `sort_order`, no colour, delta or above/below highlight. The
   LEFT join leaves an empty cell when the parent is missing. That is an honest absence, not an
   implied zero.
3. **Denylist** — met. No ranking, livability/quality-of-life, investment-adjacent or
   reader-directed recommending language. The closing "plain inventory, not a recommendation"
   paragraph mirrors Berlin. It negates the "good or bad place to live" framing rather than
   using it, which is acceptable.
4. **Completeness caveat adjacent** — met. The geo-DS-confirmed `Alert` sits directly under the
   table on both Hamburg pages, worded the same as Berlin.
5. **Floors honoured, no cuisine named below them** — met. The named-cuisine branch requires
   `n >= 8 AND share >= 0.15`. The new branch names nothing. The mart's share denominator is
   `gastro_poi_with_cuisine_count` (`mart_area_amenities.sql`), so "none reaches 15% of them"
   is literally correct.

## Hamburg-specific checks

- **"District (Bezirk)" framing** — correct for Hamburg. The seven Bezirke are the official
  administrative tier, and Stadtteile nest wholly within them. "District total" is labelled
  as a total, not an average or benchmark. So the large scale gap between a small Gebiet and a
  Bezirk of about 250-450k residents does not read as a performance comparison.
- **Stadtteil-level display / stigma** — acceptable. Stadtteile are named, publicly recognised
  places, and some carry an established territorial-stigma discourse (e.g. Wilhelmsburg, Veddel,
  Billstedt, Steilshoop). Wilhelmsburg was also the target of state-led upgrading (IBA 2013,
  "Sprung über die Elbe"). Infrastructure counts are neutral facts there. The residual risk is
  that a named cuisine works as an ethnic proxy for residents. That risk is the same one
  already accepted at Berlin PLR level, which are also named places. It is held down by the
  same floors, and neither Hamburg page puts a foreigner/migration indicator next to the line.
  No new condition. See the recommendation below.

## The new "none is named" sentence

The mechanics are right. Separating "plentiful data, no plurality" from "too little data" is
more honest than the old single null state, and it still names nothing below the floor. The one
weak point is the phrase **"no single cuisine stands out"**. "Stands out" is evaluative. A reader
in a mover frame can take it either way: as "unremarkable food scene" or as "diverse /
cosmopolitan food scene". The second reading is a well-known amenity-marketing trope in
gentrification discourse (Zukin's authenticity/consumption critique). The neutral inventory
should express neither value. The sentence already gives the mechanical reason, so the
evaluative clause is not needed.

## Binding conditions (before integration into `develop`)

1. On all five pages, remove "no single cuisine stands out —" from the new branch and keep only
   the mechanical statement, e.g.: "Cuisine is tagged for **{n}** restaurants/cafes here, but no
   single cuisine reaches 15% of them, so none is named." Do not add "diverse", "varied", "mix",
   "eclectic" or similar. This is a wording-only fix, and no further domain re-consult is needed
   once it is applied verbatim or equivalently clinically.

## Non-binding recommendations

- The mart breaks cuisine ties alphabetically (`order by cuisine_count desc, cuisine asc`). So in
  a tie above the floor, "the most common cuisine is X" names one of several co-equal cuisines.
  Consider a follow-up that either suppresses the name on ties or says "one of the most common".
  This is pre-existing and not introduced here.
- The existing named-cuisine line says "% of tagged gastronomy POIs". "% of cuisine-tagged
  restaurants/cafes" would match the denominator exactly. This is pre-existing and cosmetic.
- If a migration/foreigner-share block is later added to Hamburg Stadtteil or Gebiet pages, do not
  place it next to the cuisine line, and re-consult the domain expert.

```json
{
  "verdict": "pass_with_conditions",
  "domain_rationale": "Hamburg Gebiet and Stadtteil amenities blocks apply all five I20 conditions as on the Berlin PLR page. Bezirk framing is correct for Hamburg and the district column is a plain total. Stadtteil-level display adds no stigma risk beyond what the Berlin PLR precedent already accepted. The new plentiful-data/no-plurality branch is a real honesty improvement and names nothing below the floor. Its only flaw is the evaluative clause 'stands out', which invites a value-laden diversity or blandness reading.",
  "theory_risks": [
    "'No single cuisine stands out' can be read as 'diverse/cosmopolitan' (amenity-marketing trope) or 'unremarkable'; both are evaluative.",
    "Named cuisine at Stadtteil level can work as an ethnic proxy in places with territorial-stigma discourse; held down by the floors and by no adjacent migration indicator.",
    "Alphabetical tie-break names one of several co-equal cuisines as 'the most common' (pre-existing)."
  ],
  "recommendations": [
    "Binding: drop 'stands out' from the new branch on all five pages; keep the mechanical 15% wording.",
    "Follow-up: handle cuisine ties explicitly; align the share denominator wording.",
    "Keep migration/foreigner indicators away from the cuisine line; re-consult if that changes."
  ]
}
```
