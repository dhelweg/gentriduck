# I20 — POI curation rules ("detail where it matters")

**Ticket:** I20 slice 2 (#253), parent #244. **Author:** PM/data-analyst draft (per the I20 SPEC's
"data-analyst defines and commits" instruction — drafted here ahead of a dedicated data-analyst
agent turn, same sequencing precedent as I9's PM-drafted-first persona map). **Status:** draft,
pending `gentrification-domain-expert` mover-framing sign-off (`I20-domain-signoff.md`) before
#254 (web slice) applies these rules to a rendered page — **this document alone does not clear the
gate**; it defines the display rules the gate will be checked against.

## Why

Maintainer feedback (2026-07-11, restated in the I20 SPEC): stop spamming every area with
equally-weighted, uninteresting POI counts ("number of benches") — show detail where it matters
and what is of interest to a human, especially a prospective mover. This document is the concrete
rule set that operationalizes "detail where it matters" against `mart_area_amenities` (#252)'s
actual columns, so the web slice (#254) has an unambiguous spec to implement against rather than
inventing thresholds ad hoc in a component.

## 1. What ships on a profile page by default (I18 levels: PLR / BZR / PGR / Bezirk)

| Block | Source column(s) | Shown when |
|---|---|---|
| Everyday-infrastructure counts | `n_schools`, `n_kindergartens`, `n_doctors`, `n_dentists`, `n_pharmacies`, `n_supermarkets`, `n_playgrounds`, `n_transit_stops` | Always, at every level — these are the agreed "is everyday infrastructure present" facts the SPEC names explicitly. Zero is a real, informative answer here (e.g. "no supermarket in this PLR") and must render as `0`, not be hidden. |
| Dominant gastro-type | `dominant_cuisine`, `dominant_cuisine_share`, `gastro_poi_with_cuisine_count` | Only when `gastro_poi_with_cuisine_count >= 8` (interestingness threshold, §2) **and** `dominant_cuisine_share >= 0.15` (a "dominant" type must actually be a plurality of a meaningfully sized sample, not one Italian restaurant out of three cuisine-tagged POIs). Below either threshold: render "not enough tagged data to identify a dominant cuisine" (an honest null state), never a misleading single-POI "finding." |
| District comparison | Same columns at the parent `bezirk` row (via the area's own `bezirk_code` prefix, same substr-derivation `mart_area_amenities` itself uses) | Always alongside the area's own figures, for every block above — this is the SPEC's explicit "how does that compare to the district" requirement. |
| Completeness caveat | Text, not a data column (see §3) | Always rendered next to the infrastructure block, every level. |

## 2. Interestingness thresholds (the "detail where it matters" rule)

- **Dominant cuisine, n >= 8.** Chosen as a floor beneath which a single popular restaurant can
  flip the "dominant" label from one visit to the next (e.g. 2/5 = 40% looks decisive but is really
  noise at that sample size). 8 is a judgement call, not derived from a formal power calculation —
  **flagged for geo-DS to confirm or revise** as part of the completeness consult (§3), same as any
  other small-sample display threshold on this project (cf. MSS suppression conventions).
- **Dominant cuisine, share >= 15%.** Guards against a `dominant_cuisine` that is technically the
  mode of a long tail of one-off tags (e.g. "the most common cuisine is `italian` at 3 of 40
  gastro POIs, one more than each of 8 other single-count cuisines") being presented as if it
  meaningfully characterizes the area's food scene.
- **Infrastructure counts have no suppression threshold** — unlike EWR-style population statistics
  (I19), a POI count derived from openly-tagged map data carries no disclosure/privacy risk at any
  count, including zero. The only caveat these need is the completeness one (§3), not a sample-size
  floor.

## 3. Completeness caveat (geo-DS consult, not a full sign-off)

OSM tagging completeness is uneven across categories and areas — a PLR showing `n_doctors = 0` may
genuinely have no doctor's office, or may simply have under-tagged ones. Per the I20 SPEC: "geo-DS
consulted on whether counts need a completeness disclaimer per category... official directories
(e.g. the Berlin school registry) noted as a possible future cross-check ticket — not in scope."

**Standing caveat text (default, pending geo-DS review of this exact wording):**
> "These figures come from OpenStreetMap tagging, not an official registry. A `0` may mean 'none
> here' or 'not yet mapped' — better-mapped areas (typically denser, more central) will show more
> complete counts than less-mapped ones. See [open-data](/open-data) for more on this project's
> data-completeness caveats generally."

This is a **request for geo-DS input**, not itself the completeness sign-off — recorded here so
#254 has a concrete caveat to render even before geo-DS confirms or revises the wording; if geo-DS
flags a category-specific concern (e.g. transit stops being unusually complete vs. doctors being
unusually incomplete, per known OSM Berlin coverage patterns), this section gets a follow-up
revision before #254 integrates.

## 4. Categories demoted from default views ("bench-class" — full data stays in tables/downloads)

Per the SPEC's own framing, everything in `mart_area_amenities` is *already* a deliberately curated
subset — bench/street-furniture-class OSM categories (`Public Space` domain: benches, waste
baskets, recycling bins, mailboxes, phones, toilets — see `poi_domain` values in
`ingest_osm_history.py`'s `load_poi_mapping()`) are **not modeled in `mart_area_amenities` at all**,
by construction, not merely hidden by a display flag. They remain fully queryable in the existing
POI-map/table views (`mart_poi_offering_advantage`, `/poi-map`) for any reader who wants the
complete inventory — this document does not remove or gate access to that data, it only keeps it
out of the *default* profile-page "what matters to a mover" block.

## 5. Explicitly out of scope for this document

- **Mover-framing/ethics review of the copy itself** (whether phrasing like "dominant cuisine"
  reads as a recommendation) — that is the `gentrification-domain-expert` hard gate
  (`I20-domain-signoff.md`), not a curation-rules concern. This document defines *which facts show
  and when*; the domain sign-off reviews *how they're worded* once #254 drafts real page copy.
- **Persona addition to the I9 audience map** — tracked as a separate edit to
  `docs/epic-i/audience-channel-map.md` (see P7 there), not duplicated here.
- **Density/per-capita normalization** — `mart_area_amenities` (#252) ships raw counts only in its
  first slice; if a future revision adds per-km2 or per-1,000-residents normalization, this
  document's thresholds (§2) would need re-deriving against the new units, not reused as-is.

## References

- `docs/epic-i/tickets/I20-amenity-insights-movers.md` (source SPEC)
- `transform/models/marts/mart_area_amenities.sql` (#252 — the data this document curates)
- `docs/epic-i/I19-domain-signoff.md` (precedent for a "no ranking, no isolated stat, always
  co-present with context" style gate on a demographic/descriptive block)
