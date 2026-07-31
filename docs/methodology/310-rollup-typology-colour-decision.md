# #310 rollup-typology-colour decision: what "D1 remedy (a)" actually shipped (#325 R-310-6)

**Status:** Recorded, dual-gated (see sign-offs cited below). Not a new methodology-bearing change
by itself — this file documents a decision already made and reviewed on `#310`; it changes no
model, weight, normalization, or spatial method.

**Extends:** [`I-coarse-index-domain-decision.md`](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-i/I-coarse-index-domain-decision.md)
(#267) and [`I249-web-b-domain-signoff.md`](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-i/I249-web-b-domain-signoff.md).
**Full record:** [`310-map-granularity-domain-signoff.md`](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-e/310-map-granularity-domain-signoff.md)
(three review rounds, final `Verdict: PASS`) and [`310-map-granularity-geo-signoff.md`](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-e/310-map-granularity-geo-signoff.md)
(final `Verdict: PASS`).
**Implements in:** `transform/models/marts/mart_area_rollup_stage_mix.sql` (mart; header documents
the mix/dominant-stage construction) and `web/pages/berlin/maps.md` / `web/pages/hamburg/maps.md`
(presentation; this is where the D1 remedy itself lives — see below).

## Why this note exists

`#310` (the map granularity selector) was the **first time this project colours a rollup typology
label citywide, as a public choropleth**, at Bezirk/PGR/Ortsteil grain for Berlin and
Stadtteil/Bezirk grain for Hamburg. That is a real extension of prior practice: the earlier
[#249 / `I249-web-b`](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-i/I249-web-b-domain-signoff.md)
precedent (`mart_mss_area_aggregate`) only permitted a coarse-grain reading on a **per-area profile
page**, hedged with "Estimated"/"approximate" language and an explicit "not the Senate's own
classification" alert — never as the city's headline map. The domain sign-off's Blocking
Condition D1 required this extension to be resolved one of two ways before the map could ship, and
recorded it as a **non-blocking follow-up** (R-310-6) to also write the decision down here rather
than leave it inferable only from the mart's header comment and the two pages' inline caveats. This
file is that write-up.

## What was decided: D1 remedy (a)

The domain sign-off offered two remedies for the coarse-grain-ordinal-mean risk (`status_index` /
`dynamism_index` population-weighted means, which are averages of discrete MSS ordinal class codes
and therefore squarely inside the #267 prohibition if coloured or ranked):

- **(a)** restrict the map's Indicator dropdown at rollup levels to "Gentrification stage" only
  (the categorical mix/dominant-stage surface), leaving the two scalar options available only at
  the finest (PLR / `subarea_l2`) leaf grain — cheaper, and does not touch the #267 prohibition at
  all; or
- **(b)** keep the scalars at rollup grain too, but only under the I249-web-b framing bar verbatim
  (an "Estimated"/"approximate" label, a visible "directional, not authoritative" alert, no
  `order by`), plus a dated, co-signed amendment to `web/pages/methodology.md` §6 and to the #267
  decision doc itself, since (b) narrows that standing prohibition and needs the geo-data-scientist's
  explicit co-sign.

**Remedy (a) was chosen and implemented**, verified independently in the domain re-review (not
merely from the commit message):

- The `<Dropdown name="indicator">` control is only rendered when `!isRollup`; at Bezirk/PGR/Ortsteil
  (Berlin) and Stadtteil/Bezirk (Hamburg) grain the two scalar `<DropdownOption>`s are **not present
  in the UI at all** — removed, not merely relabelled.
- `effectiveIndicator` (`isRollup ? 'status_class' : inputs.indicator.value`) is the single value
  every render path (map fill, legend, colour palette, map title, tooltip) reads at rollup grain, so
  a scalar value stale in Evidence's input store from a prior leaf-grain visit cannot leak into the
  rollup map, its legend, or its palette.
- Both rollup `DataTable` queries dropped `order by dynamism_index desc` in favour of
  `order by area_name`, closing the "**ordered**" half of the #267 prohibition as well as the
  "coloured" half.
- Because remedy (a) does not narrow the #267 prohibition, **no amendment to `web/pages/methodology.md`
  §6 or to `I-coarse-index-domain-decision.md` was required** — the #267 decline of a coloured/ranked
  coarse-grain ordinal-mean index remains in force, unmodified, at every rollup grain on this site.

**Residual, explicitly accepted:** `status_index_weighted_mean` / `dynamism_index_weighted_mean`
still appear as two **unsorted, plainly-labelled diagnostic columns** in the rollup `DataTable`
("mean ordinal class (mean rank), population-weighted where population data is complete and
equal-weighted otherwise" — never "score", never a map colour, never a sort key). The domain
sign-off accepted this as the outer edge of remedy (a)'s own wording ("keeps the mart columns
available for diagnostics"): a coarse-grain central-tendency value is still *published*, but demoted
from headline choropleth to a caveated table column, which is a materially different publication
than what #267 declined.

## The extension that *is* newly permitted: a coloured, citywide categorical rollup

What #310 does newly ship — and what #267/I249-web-b did not previously cover at citywide grain —
is the **categorical** `dominant_stage` (the plurality typology stage among an area's children —
weighted by population where an area's population data is complete, equal-weighted as a flagged
fallback otherwise) as the map's fill colour at every rollup level, on both cities' main maps pages,
not gated to a per-area profile. This is permitted under #267 Recommendation 2 ("close the #267 gap
with a distributional headline … a compact child-typology distribution") and Recommendation 4,
which — under the heading "documented, not endorsed" — permits a coarse scalar *only* where it is an
explicitly-labelled dispersion/composition statistic (its own example: "share of PLRs in
active-gentrification typology") and is "never presented, coloured, or ordered" as the area's
gentrification index, but #310 is the first time that distributional construct is rendered as the
primary citywide map fill rather than only as a supporting table. Three mitigations were required —
and, per the final domain `Verdict: PASS`, are in place — because a plurality-vote choropleth of a
frontier phenomenon (Dangschat 1988/2000 double invasion–succession cycle) is directionally biased
toward the modal, least-acute stage, not neutrally noisy:

1. **Never a standalone label.** The plurality ("dominant") stage is always paired with
   `dominant_share` (so a reader sees it is a plurality, not a majority or a fact about the whole
   area) and `is_dominant_fragile` (flagged whenever fewer than 3 real children contribute), and the
   full stage-mix distribution remains one click/table-row away — see `mart_area_rollup_stage_mix.sql`'s
   header, design points 1–3.
2. **A stated direction, not just a stated method (D3).** Both maps pages' rollup `Alert` and
   "Honest caveats" sections state, in data-independent language, that coarser grains resolve toward
   the most common *and least acute* stage, that a "Stable, established" reading is not evidence
   pressure is absent, and that the finest published grain is where pressure is actually locatable.
3. **A composition counterweight in the same visual unit as the colour (D4).** `acute_stage_share` —
   the combined share of an area in `active-gentrification` + `pioneer-signal` +
   `improving-vulnerable` (Dangschat's invasion phase plus the Döring/Ulbricht vulnerability case) —
   is computed page-side as a plain sum over the mart's own already-published `stage_population_share`
   rows (no mart change, no new index; #267 Recommendation 4's permitted composition statistic) and
   shown next to the dominant-stage colour in both the tooltip and the table on both pages. This is
   what prevents the frontier-inversion misread the domain sign-off's Neukölln/Spandau example
   documents (a "Stable, established" borough with 30.0% of residents in an acute stage, next to a
   non-blue borough with only 14.2%).

## What this note does *not* change

- The #267 decline of a coloured/ranked coarse-grain **ordinal-mean scalar index** stands, in full,
  at every rollup grain on this site — remedy (a) satisfies it by not colouring/ranking the scalars
  at all, not by narrowing it.
- No dbt model, weight, normalization, or spatial method changed as part of writing this note (#325
  scope: docs/copy only).
- This does not reopen `mart_mss_area_aggregate` / I249-web-b, which remains its own,
  separately-gated, per-area-profile-page feature.

## Sources

- `docs/epic-e/310-map-granularity-domain-signoff.md` — full three-round domain review; the D1
  finding is in section (b) ("Is the population-weighted mean … defensible?") and the Blocking
  Conditions list; remedy (a)'s implementation is verified in the "Re-review after fix commit
  `18dfeda3`" section.
- `docs/epic-e/310-map-granularity-geo-signoff.md` — paired statistical/spatial sign-off, final
  `Verdict: PASS`.
- `docs/epic-i/I-coarse-index-domain-decision.md` (#267) — the standing decline this decision
  operates under, left unmodified.
- `docs/epic-i/I249-web-b-domain-signoff.md` — the narrower, per-area-profile-page precedent #310
  goes beyond for the categorical surface.
- `transform/models/marts/mart_area_rollup_stage_mix.sql` — header comment, design points 1–5 (the
  mix/dominant-stage construction) and the WEIGHTING NOTE (population-weighted, with a documented
  equal-weight fallback).
- `web/pages/methodology.md` §6 — the public-facing restatement this note feeds.
