---
task: H-C1 / #158 — Re-fit C5 completeness-bias correction for Hamburg
author: gentrification-domain-expert
date: 2026-07-10
branch: feature/158-hc1-hamburg-dynamism-refit
---

# Domain sign-off — H-C1 C5 completeness-bias re-validation for Hamburg

- **Branch:** `feature/158-hc1-hamburg-dynamism-refit`
- **Issue / task:** #158 [H-C1].
- **Reviewer:** gentrification-domain-expert (urban-sociology/housing-policy theory gate, R-C1)
- **Paired gate:** geo-data-scientist (statistical-soundness). This is the domain half of the
  R-C1 dual sign-off.
- **Artefacts reviewed:** the full `git diff` on this branch (only two files touched);
  `int_poi_status_dynamism.sql` header addition (documentation-only, no math change);
  `test_c5_poi_share_spike.sql` `total_poi_count >= 30` floor; the geo-DS spike
  `docs/epic-h/158-hc1-geo-spike.md`; the original `docs/epic-c/C5-geo-signoff.md` (premises being
  re-validated); confirmation that `gentrification_index.sql` retains `accepted_values=["BER"]`
  (Hamburg still staged out of every published mart).

## What actually changed (scoping the review)

The diff is 40 lines across two files. `int_poi_status_dynamism.sql` receives **only a documentation
header** recording that C5's two empirical premises were re-checked against Hamburg's own 2008–2026
OSM curve — **no change to normalization, cutoff year, or the z-score math**. The behavioural change
is a single line in the **warn-severity** DQ test `test_c5_poi_share_spike.sql`: a global
`total_poi_count >= 30` floor. The governed `dynamism_score` / `status_score` z-scores and the
published `gentrification_index` mart are untouched, and Hamburg remains excluded from publication.

## a. Does the <30-POI test floor risk systematically excluding small / peripheral, low-amenity-density neighbourhoods from ever registering a real gentrification-precursor signal?

**No — because the floor is on the anomaly *test*, not on the `dynamism_score` that feeds the index.**
This is the crux of the domain question and it resolves cleanly once the two objects are kept
distinct. `test_c5_poi_share_spike` is a warn-severity data-quality tripwire that surfaces PLR/Gebiet-
years for human inspection; it does **not** gate, filter, drop, or down-weight any area's score. A
low-POI Gebiet whose share genuinely doubles still has its `dynamism_score` computed and (once Hamburg
is published) still flows into the index. The geo-DS spike measured this directly: the smallest-POI
bucket (<20 POIs) contributes **zero** >3SD extreme dynamism scores, i.e. the absolute-share z-score
already down-weights small-N areas *on its own*, exactly as C5 risk #2 anticipated. So a real
precursor signal in a small area is not silenced by this floor — the floor only stops the *test* from
crying wolf on mechanical small-denominator ratio swings (a 20→45-POI wiggle tripping a 2× share
ratio). Suppressing false DQ alarms does not suppress signal; if anything, a test that over-fires on
small areas is the thing that would train a human reviewer to ignore small-area flags, so the floor
mildly *protects* attention for genuine small-area anomalies.

There is a real, deeper domain caveat here, but it is **pre-existing and not introduced by this
change**: POI-dynamism as a gentrification *precursor* is inherently an amenity-centric lens (the
retail/gastronomy "boutique-ification" upgrading described by Zukin 2010 and Lees/Slater/Wyly 2008;
Blasius & Dangschat's Aufwertung as gradual recomposition). Neighbourhoods gentrifying through
mechanisms that leave a thin commercial footprint — new-build/`Neubau` displacement, buy-to-let
conversion, privatization of former social housing — may under-register on *any* POI-based indicator
regardless of a count floor. That is a limitation of the indicator's design, not of this floor, and it
is the right thing to carry onto the G2 methodology page. It is **not** a reason to withhold sign-off
on #158, which neither introduces nor worsens that bias.

## b. Does a warn-severity, non-publishing, non-index change raise any domain concern — or is it outside my lane?

**Substantially outside the domain-theory lane, and I confirm no domain concern.** The change alters
neither what an indicator *means* nor how a status/dynamism value is *computed* nor which areas are
published. It is spatial-statistics / data-quality hygiene: making a ratio-based tripwire robust to
Hamburg's finer statistische-Gebiet grain (~941–945 areas, 23.6% carrying <20 POIs) versus Berlin's
coarser PLR grain. The `30` constant is a single global, city-agnostic value — it does **not** encode
a Berlin-vs-Hamburg judgement, so it raises none of the cross-city false-equivalence concerns that
*are* in my lane (cf. the H-C5 Wohnlage two-tier/three-tier non-equivalence question). The domain-
relevant premises it rests on — that Hamburg's coverage curve cold-starts 2009–2013 and stabilizes
~2014–2015 like Berlin's, so the share-based, per-city-partitioned completeness control transfers —
were empirically re-validated on Hamburg's own series rather than assumed, which is exactly the
grounding discipline R-C2 asks for, and the new model header records it with a citation.

## c. Does this ticket touch or imply anything about Milieuschutz / displacement / publication scope?

**No.** I verified the diff does not touch any displacement-zone model, any Wohnlage/rent model, the
Milieuschutz layer, or the publication filter. `gentrification_index.sql` still carries
`city_code accepted_values=["BER"]` and the `published_cities_filter` is unchanged — Hamburg stays
staged out of every published mart. The geo-DS spike is explicit (R4) that widening the index to
include HH is a *separate* methodology-bearing action requiring its own fresh dual sign-off (per
#125); this ticket clears an internal-pipeline blocker and deliberately does **not** authorize that
widening. Nothing here publishes a Hamburg number or makes any displacement claim, descriptive or
causal.

## Forward guidance (non-blocking)

1. When Hamburg dynamism/index does reach publication (the separate #125 gate), the G2 methodology
   page should state the amenity-centric limitation of POI-dynamism explicitly: low-amenity-density
   peripheral Gebiete may under-register precursor signal irrespective of this DQ floor, so absence of
   a POI-dynamism flag is **not** evidence of absence of displacement pressure (the same "not flagged
   ≠ safe" framing established for the Milieuschutz layer in B1).
2. If a future city is onboarded with *both* fine grain *and* high per-area POI density, revisit
   whether a single global `30` still fits — but that is a future-city question, not a #158 blocker.

## Verdict

The change is narrow, documentation-plus-warn-test-only, alters no indicator meaning, no governed
z-score, and publishes no Hamburg number; Hamburg remains staged out of all public marts. It rests on
Hamburg-specific empirical re-validation (not a Berlin assumption transplant) and touches nothing in
the Milieuschutz/displacement/publication-scope domain. The one genuine domain caveat (amenity-centric
under-registration in low-density areas) is pre-existing to the POI-dynamism indicator, not introduced
here, and is captured as forward G2 guidance. No changes requested.

**Verdict: PASS**
