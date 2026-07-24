---
task: H-C5-OA / #312 — Re-fit C5 completeness-bias correction for mart_poi_offering_advantage (Hamburg)
author: gentrification-domain-expert
date: 2026-07-24
branch: feature/312-hh-oa-completeness-bias-refit
---

# Domain sign-off — #312 C5 completeness-bias re-validation for Hamburg's Offering-Advantage mart

- **Branch:** `feature/312-hh-oa-completeness-bias-refit` (2 commits ahead of `develop`:
  `8cb1a789`, `cbeea879`).
- **Issue / task:** #312 [H-C5-OA].
- **Reviewer:** gentrification-domain-expert (urban-sociology / housing-policy theory gate, R-C1).
- **Paired gate:** geo-data-scientist (statistical-soundness), reviewing the same branch
  independently and in parallel. This is the **domain half** of the R-C1 dual sign-off; I did not
  read or coordinate with the geo-DS verdict and take the math/statistics on trust, per my remit.
- **Artefacts reviewed:** the full `git diff develop..feature/312-hh-oa-completeness-bias-refit`
  (six files); the spike `docs/epic-h/312-oa-c5-geo-spike.md` in full; the header additions to
  `int_poi_offering_advantage.sql` (incl. the pre-existing "Anti-erasure framing" block, #274) and
  `int_poi_offering_advantage_methods.sql`; the `schema.yml` `accepted_values` additions;
  `seed_oa_calculation_methods.csv`; the **already-live** `web/pages/hamburg/poi-map.md` and its
  Berlin sibling `web/pages/berlin/poi-map.md`; `docs/epic-h/H1-hamburg-data-landscape.md` (Hamburg
  socio-spatial structure + data landscape) and the H-C1 precedent
  `docs/epic-h/158-hc1-domain-signoff.md`.

## What actually changed (scoping the review)

No production math changed. The diff is **documentation + one guard-rail test**: header citations to
the #312 spike on both OA intermediate models; `schema.yml` description updates; and the one genuine
behavioural add — `accepted_values: ["BER", "HH"]` on `mart_poi_offering_advantage_map.city_code`,
which (as the spike honestly records) had `not_null` only despite already feeding the live
`/hamburg/poi-map` page. The location-quotient math, the normalization, the D-3 min-base flag, and
the published web page are all untouched. This is the same "confirm + document, no code/math change"
posture #158 landed for `dynamism_score`, applied to the OA construct. My review is therefore about
whether the *meaning* of the OA indicator, and the *publication ethics* of it already being live for
Hamburg, hold up — not the algebra (geo-DS's lane).

## a. Construct validity: is Hamburg OA comparable *in kind* to Berlin OA, given different urban form and mapper communities?

**Yes, in kind.** Offering Advantage is a location quotient — a compositional, *within-city,
same-year* ratio of local share to citywide share. Its meaning ("is domain X over- or
under-represented here relative to this city's own average?") is defined **entirely relative to the
city it is computed on**, and the page correctly enforces this: the Hamburg baseline is
Hamburg-wide, never pooled with Berlin (poi-map.md Alert + methodology §6 rule). So differing urban
form, commercial geography, and mapper-community size between the two cities do **not** make the
*construct* mean something different — a Hamburg OA of 1.4 for Gastronomy means the same *kind* of
thing a Berlin OA of 1.4 does, each against its own city. The H1 data-landscape doc already
established that OSM/ohsome coverage is global and identical in mechanism for both cities, and the
spike re-confirmed Hamburg's coverage curve directly on OA's own source table
(`fct_poi_development`), same cold-start-then-stabilize (~2014–2015) shape as Berlin. Construct
validity transfers.

**One genuine Hamburg-specific domain nuance, which I want on the record (non-blocking).** Hamburg's
socio-spatial structure is *more sharply polarized in space* than Berlin's more mosaic pattern: a
pronounced affluent north-west/Alster–Elbe axis (Eppendorf, Winterhude, Blankenese, Othmarschen,
HafenCity) versus a deprived eastern/southern periphery across the Elbe (Wilhelmsburg, Veddel,
Billstedt, Mümmelmannsberg, Steilshoop) — the well-documented Hamburg "Elbe divide." Under Haklay
(2010), OSM completeness correlates with area advantage, so a city with a **steeper affluence
gradient** can carry a steeper *cross-sectional* under-mapping gradient. This matters because the
algebraic invariance the spike relies on protects against an area-**uniform** per-year completeness
multiplier — it does **not** protect against a *stable cross-sectional* under-mapping bias, which
would depress the local share (and hence the OA level) of a poorly-mapped peripheral Kiez at *every*
year. This is exactly the anti-erasure risk (see (b)), and it is a property of the OA construct
itself, present equally for Berlin, **not introduced or worsened by #312** — but Hamburg's sharper
gradient is a reason to treat the min-base flag + suppression + disclosure as *more* load-bearing
here, not less. This is a G2-methodology-page point, not a #312 blocker (mirrors how #158 flagged
amenity-centrism as pre-existing forward guidance).

Critically, the spike's empirical extension of the completeness-contamination gate is a *temporal*
check (does an area's OA delta track citywide coverage growth) and passes for Hamburg (|rho| ≤ 0.06
for the LQ family) — that is real reassurance, but it addresses the temporal contamination axis, not
the cross-sectional-gradient axis above. The cross-sectional axis is handled instead by the D-3
flag/suppression/disclosure machinery, which #312 leaves intact and which the web page carries (b).

## b. Anti-erasure / equity framing: is Berlin's publication-safety concern adequately carried over for Hamburg?

**Yes, at the disclosure floor set for Berlin — and I confirm it is met, not skipped.** The
`int_poi_offering_advantage.sql` "Anti-erasure framing" block (#274) is explicit that any public,
displacement-adjacent surface displaying the suppression flag "must disclose this half of the
sparsity story" — that under-mapping correlates with poorer/peripheral areas, so a blank/suppressed
cell must not read as "nothing happening." I checked the live Hamburg page against that obligation:

- It suppresses thinly-mapped Gebiete (D-3, same threshold as Berlin) and shows them as an unshaded
  gap, never zero (Alert + "Honest caveats": "a blank cell means 'too thinly observed,' never
  'commercially dead.'"). Good — this is the core anti-erasure protection.
- It states OSM coverage "is not spatially neutral" and cites Haklay 2010.

One **non-blocking** disclosure gap worth flagging: the Hamburg page states the *non-neutrality* but
routes the **directional** half of the anti-erasure point — that it is specifically *poorer/
peripheral* areas that are under-mapped — to the Berlin page by cross-reference ("see the Berlin POI
map's caveats … which applies equally to Hamburg"). The Berlin page states that directionality
inline and twice. Given Hamburg's sharper Elbe socio-spatial divide (point (a)), the case for
restating the directional half **inline on the Hamburg page** is if anything *stronger* than for
Berlin — a reader who lands directly on `/hamburg/poi-map` (a plausible entry point) sees "not
spatially neutral" but not "and it is the lower-income peripheral Kieze that are systematically
under-observed." This does not fall below the Berlin governance floor and is not a merge blocker,
but I recommend it as a small disclosure improvement (see Forward guidance R-D1).

## c. Disclosure adequacy on the live site for a non-technical reader.

**Adequate for the OA (location-quotient) metric; the one soft spot is the density YoY-delta
toggle.** For OA itself, the page's plain-language framing is good: "OA = 1.0 means the city-wide
average," diverging palette centred on 1.0, suppression disclosed, "commercial-side signal, not the
outcome variable" (methodology §1), and the explicit no-pooling rule. A non-technical reader is not
led to over-read OA.

The sharper item is that the page's **"Change since previous year" toggle is available for POI
density**, and density is one of the four temporally-fragile methods (see (d)). The page's
completeness caveat for the time dimension ("growing map-contributor coverage over time inflates
early-year counts … Read the early years cautiously") lives in the *citywide-context* section lower
on the page — not adjacent to the map's development toggle. Because Hamburg's early years carry very
large coverage-growth YoY% (598/115/55/23/25% across 2009–2013, per the spike table), a reader who
toggles density to "change since previous year" for an early year, without scrolling to the citywide
caveat, could read mapper catch-up as real commercial growth. This is **identical to Berlin's
already-live governance** (the same toggle has shipped on `/berlin/poi-map` since #210 under the
same caveat placement), so #312 introduces no new exposure relative to the standard already set — I
therefore do not treat it as blocking, but I flag it as the strongest candidate for a small UI
disclosure improvement, for **both** cities (R-D2). Note this is a data-literacy caveat
(completeness-inflation misread), lower-stakes than the anti-erasure caveat in (b), which is
adequately handled.

## d. Is "four methods empirically-but-not-algebraically safe" an acceptable publication posture?

**Yes — and it is less exposed than the framing implies, because three of the four fragile methods
are not on the public page at all.** Of the four `expected_temporal_safe=false` methods
(`raw_share`, `zscore_slq`, `density`, `percapita`), the live `/hamburg/poi-map` publishes **only
`density`** (`poi_density_per_km2`); `raw_share`, `zscore_slq`, and `percapita` are internal
(`mart_poi_oa_methods` / the D5 comparison), not public-facing here. The headline public OA metric
is `oa_domain` = `nested_lq`, the one method that is *both* algebraically invariant *and*
`golden_anchored=true` in the seed. So the public posture is: publish the algebraically-safe
canonical LQ, plus density (with its temporal caveat), and keep the empirically-but-not-
algebraically-safe experimental methods internal. That is a defensible and appropriately
conservative posture.

For the internal exposure of the fragile methods, "we tested it and it passed" is acceptable
**because it is paired with the honest standing caveat, not offered as a clean bill of health.** The
spike and the `int_poi_offering_advantage_methods.sql` header are explicit that (i) the seed's
`expected_temporal_safe=false` prediction is *not* relaxed by the empirical pass; (ii) the citywide
gate is "supportive evidence only, not itself an authorization for a live per-cell YoY delta" absent
the still-unbuilt per-cell completeness flag; and (iii) density/per-capita remain "provision," not
"offering-advantage," and carry the endogenous-denominator caveat (per-capita's denominator is
itself displacement-sensitive — a real domain hazard the seed grounds to OA-D0 domain Condition C).
That combination — publish only the safe method publicly, keep the fragile ones internal, and refuse
to upgrade an empirical pass into an algebraic guarantee — is exactly the responsible disclosure
posture I would ask for. It does not need a stronger caveat to *merge*; the one improvement I would
ask for over time is R-D2 (surface the density-delta temporal caveat next to the toggle).

## e. Grounding / citation quality (R-C2), from a domain-theory sourcing view.

**Sufficient.** The domain-theory grounding lives where it should — in the model headers and seed:
the anti-erasure framing cites Haklay (2010) *Environment and Planning B* for the coverage/advantage
correlation and grounds the flag semantics to the #274 domain sign-off Condition D1; the seed grounds
each method to its statistical lineage (Isard 1960; Isserman 1977; Efron & Morris 1975; Openshaw
1984 MAUP) and to prior OA/OA-D0 sign-offs; the spike explicitly ties its premise to the
already-signed-off #158 empirical validation of Hamburg's coverage curve rather than asserting it
afresh. The spike is, appropriately, heavier on structural/statistical citation than on
urban-sociology literature — but the OA construct's *domain* grounding (Haklay non-neutrality,
anti-erasure, descriptive-not-causal, provision-vs-offering) already sits in the cited model headers
it points back to, so R-C2 is satisfied for a documentation-only change. The SEC-3 note (findings
derive solely from the local warehouse and repo files, no external/web content informed the
methodology) is present and correct.

## Forward guidance (non-blocking — for G2 / a follow-up web ticket, not a #312 blocker)

- **R-D1.** On `/hamburg/poi-map`, restate the *directional* half of the anti-erasure caveat inline
  (that under-mapping specifically depresses *poorer/peripheral* Kieze), rather than only
  cross-linking Berlin's page — the Berlin page already does this inline, and Hamburg's sharper
  Elbe socio-spatial divide makes the inline statement *more* warranted, not less.
- **R-D2.** For **both** cities, surface the early-year OSM-completeness caveat adjacent to the map's
  "Change since previous year" density toggle (not only in the lower citywide-context section), so a
  reader toggling an early-year density delta cannot miss that coverage growth inflates it.
- **R-D3 (G2 methodology page).** When Hamburg OA/density is described on the public methodology
  page, state that the LQ construct is invariant to *area-uniform* completeness growth but that a
  *stable cross-sectional* under-mapping gradient (steeper in Hamburg's polarized geography) is
  handled by suppression + disclosure, not by the LQ algebra — i.e. absence of an OA signal in a
  peripheral Gebiet is "under-observed," not "nothing happening" (the same "not flagged ≠ safe"
  framing established for the Milieuschutz layer and reaffirmed in the #158 sign-off).

These three are the OA analogues of the amenity-centric forward guidance the #158 domain sign-off
carried; none blocks integration.

## Verdict

`#312` makes **no change to the OA math, normalization, or the published web page**; it adds a
missing `accepted_values` guard-rail and documentation, and its finding is that the
location-quotient construct transfers to Hamburg on a *stronger* (same-year-ratio) footing than the
already-signed-off `dynamism_score` case, empirically re-confirmed via the extended
completeness-contamination gate (geo-DS's independent verification, which I trust for the
statistics). The construct is comparable *in kind* between the two cities; the anti-erasure /
equity concern is carried onto the live Hamburg page at the Berlin governance floor (suppression,
non-neutrality, Haklay, "never commercially dead"); the public posture publishes only the
algebraically-safe canonical LQ (plus density with its temporal caveat) while keeping the
empirically-but-not-algebraically-safe methods internal and un-relaxed; and grounding is sufficient
for a documentation-only change. The three domain concerns I raise — Hamburg's sharper cross-
sectional completeness gradient, the inline directionality of the anti-erasure caveat, and the
density-delta temporal caveat placement — are all **pre-existing to the OA construct and at parity
with already-published Berlin**, captured as non-blocking G2 / web forward guidance, exactly as the
#158 precedent handled its residual caveat. Nothing requires a change before integration.

**Verdict: PASS**
