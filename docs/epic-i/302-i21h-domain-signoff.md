# I21-h (#302) — Hamburg subarea-hierarchy crosswalk export: gentrification-domain-expert R-C1 sign-off

- **Reviewer:** gentrification-domain-expert (urban-sociology/housing-policy theory & framing gate, R-C1)
- **Branch:** `feature/302-i21h-hamburg-hierarchy-crosswalk` (commits `7979280a`, `65fde0dc`),
  diffed against `develop`.
- **Date:** 2026-07-24
- **Paired gate:** geo-data-scientist sign-off `docs/epic-i/302-i21h-geo-signoff.md` (Verdict: PASS)
  covers statistical/spatial soundness of the pass-through; this note covers domain validity and the
  public **framing** of the published hierarchy.

## Scope of this sign-off

This is an **export/publication event, not a new spatial method** — confirmed. My gate does **not**
re-adjudicate the OA-D1b `subarea_l2 → subarea_l1` `ST_Within` centroid-in-polygon crosswalk (already
dual-signed PASS at #240 / `docs/methodology/OA-D1b-{geo,domain}-signoff.md`). It covers the one new
domain-facing surface this ticket adds: whether **publishing** Hamburg's administrative hierarchy
(district → Stadtteil → statistisches Gebiet) to the public site — via the newly wired "Up:" links,
children tables, and "Where this area sits" prose on the three Hamburg area-scaffold pages —
accurately represents what these administrative units are, how they nest, and their provenance,
without implying more precision or officialness than warranted, and without misleading a user who
compares Hamburg's grain to Berlin's.

Artifacts reviewed for framing: `web/pages/hamburg/area/[code].md`, `.../subarea_l1/[code].md`,
`.../district/[code].md` (the changed "Up:"/children/"Where this area sits"/"Honest caveats"
sections), cross-checked against `web/pages/reference/area-hierarchy.md`,
`web/pages/methodology.md` §6, and `transform/models/intermediate/dim_area_hierarchy.sql`'s header.

## What I checked

**1. Is Hamburg's administrative hierarchy represented correctly (terms + nesting direction)?**

Yes. The pages use Hamburg's own terminology correctly and consistently — **Statistisches Gebiet**
(`subarea_l2`, finest grain), **Stadtteil** (`subarea_l1`), **Bezirk/District** (coarsest) — with the
nesting direction right in both directions (Gebiet ⊂ Stadtteil ⊂ Bezirk; children tables enumerate
downward, "Up:" links point upward). This matches the site-wide generic-label table in
`reference/area-hierarchy.md` (Bezirk→District, Stadtteil→"Subarea level 1", statistisches
Gebiet→"Subarea level 2") and `dim_area_hierarchy.sql`'s documented ladder. No level is mislabelled or
transposed.

**2. Provenance honesty — is each edge's derivation disclosed, and not overstated as official?**

Yes, and this is the crux of a sound publication here. The pages faithfully distinguish the two
mechanisms:

- **Gebiet → Stadtteil** (`hh_l2_to_l1`) is disclosed everywhere it is rendered as "resolved via the
  OA-D1b (#240) spatial crosswalk" (the `area/[code].md` "Where this area sits" section and the
  `subarea_l1/[code].md` children-provenance note). It is **not** dressed up as a source-provided
  administrative fact.
- **Stadtteil ↔ District** (`hh_l1_to_district`) is correctly disclosed as **source-provided** — "the
  Hamburg WFS district (Bezirk) attribute," passed through unmodified — i.e. a genuine official nesting,
  not a derivation.

This is the correct calibration. Presenting the Gebiet's parent as a clean "Up: [Stadtteil]" link in
the nav bar (with the method disclosed one section down, not inline in the nav) is defensible on
domain grounds: Hamburg's statistische Gebiete are **constructed as subdivisions that nest within a
single Stadtteil by design** — the reason no parent key is present is that the LGV WFS layer omits the
attribute (a bare sequential `statgebiet` id), not that the containment is genuinely ambiguous. The
centroid-in-polygon crosswalk therefore *recovers an intended administrative nesting* rather than
inventing an analytic one, so a clean parent link does not overstate officialness, and the
"resolved via a spatial crosswalk" phrasing keeps the recovery method honest for anyone who reads on.

**3. Does the copy imply more geographic precision than warranted?**

No new overclaim. The three ledes' scale-analogy framing ("Bezirk-equivalent," "Bezirksregion-
equivalent," "the same scale Berlin's Planungsraum profile page covers") is **unchanged from #301
(I21-g)** — it appears as context in this diff, not as an added line — so it was already gated at
I21-g and is out of this ticket's new surface. For completeness I confirm it still reads as an
approximate *scale* analogy (hedged with "-equivalent"/"the same scale"), consistent with
`reference/area-hierarchy.md`'s "(roughly)" qualifier and `methodology.md` §6's "Hamburg's equivalent
is its statistisches Gebiet." I note only that a Gebiet is in fact a somewhat *finer* grain than a
Berlin PLR (~945 Gebiete vs ~542 PLR); the "finest published small-area grain in each city" parallel
the pages actually lean on is the accurate one, and the loose "same scale" phrase is a pre-existing
#301 nicety, not something this ticket introduces or worsens.

**4. Cross-city comparison risk — is the Hamburg grain distinguished from Berlin's LOR/PLR grain?**

Yes. The **new** copy under review stays entirely within Hamburg's own hierarchy and makes no
cross-city equivalence claim, so it introduces no comparison hazard. Site-wide, the distinction is
carried by (a) `reference/area-hierarchy.md`'s explicit statement that Hamburg "does not nest by code
prefix at all" plus its Berlin↔Hamburg equivalence table, and (b) `methodology.md` §6's disclosure that
Hamburg's D4 composite is only Stadtteil-grained and *inherited down* to Gebiete. A user comparing a
Berlin PLR page with a Hamburg Gebiet page is not told the two are administratively identical, only
that each is its city's finest small-area unit — which is accurate.

**5. Berlin edges carried in the same mart.**

The mart is a verbatim pass-through and additionally carries Berlin's LOR prefix-nested
(PLR→BZR→PGR→Bezirk) and Ortsteil→Bezirk edge families (per the geo sign-off's row-count breakdown).
No Berlin page copy changes in this ticket and no Berlin edge is re-derived, so no Berlin-facing
framing is newly published. Nothing to flag on the Berlin side.

## Risks / residuals (non-blocking)

- **Reachable stale-reference contradiction (documentation, tracked I21-j).**
  `reference/area-hierarchy.md` lines 116–123 still state the Gebiet → Stadtteil edge is "**not
  currently resolved**" / "explicitly not yet built" — pre-OA-D1b text. This ticket is the first to
  make the *resolved* edge publicly reachable, so a user could now land on the reference page's "not
  resolved" claim and the Hamburg pages' live parent links and see a contradiction. This is a
  pre-existing staleness (predates this ticket; the edge merged to `develop` at #240), it is
  **disclosed on every affected Hamburg page** with a "treat as stale on this specific point" note and
  a link, and geo-DS logged the same residual. It does not block: the pages under review are
  themselves accurate and proactively self-correct the stale page. **Recommendation:** prioritise the
  I21-j docs-refresh so the two surfaces stop disagreeing publicly.
- **Guardrail for the I21-j fix (domain precision).** When I21-j refreshes the reference page, correct
  *only* the "edge not resolved" claim (lines 116–123). Do **not** also flip line 124–125 ("Hamburg's
  Offering Advantage figures do not currently roll up to a coarser scale the way Berlin's do"): a
  resolved *hierarchy-nav* edge is not the same as OA *aggregation up the ladder*. Per `methodology.md`
  §6 (lines 298–306), Hamburg's D4 composite is Stadtteil-grained and inherited *downward* to Gebiete,
  not rolled up — so the OA-rollup sentence is still true and must not be over-corrected into a false
  "now rolls up" claim.
- **Two fallback Gebiete under the crosswalk** ('90001', '106001') were flagged and accepted at OA-D1b
  (#282). Their parent link is now published like any other; the page-level crosswalk-provenance
  disclosure covers them. No new domain concern.

## Ethics / misuse framing

No concern. This ticket publishes structural geography (which small area sits inside which), not any
status/dynamism, rent, or displacement indicator, and adds no ranking, recommendation, or
"up-and-coming"-style register. It does not create a new accelerant surface (the standing concern for
this project's public outputs). The "Honest caveats" blocks on all three pages remain intact and
continue to state that no real Hamburg figures are published here yet (I21-i, #303).

## Untrusted input (SEC-3)

No non-maintainer issue/comment text or fetched web content was relied on for this sign-off; review
was against repository artifacts only.

```json
{
  "verdict": "pass",
  "domain_rationale": "Export/wiring-only publication of an already-dual-signed hierarchy. The three Hamburg area pages represent Hamburg's district -> Stadtteil -> statistisches Gebiet ladder with correct terminology and nesting direction, and honestly distinguish the source-provided Stadtteil<->Bezirk edge from the OA-D1b spatial-crosswalk Gebiet->Stadtteil edge. Presenting the spatially-recovered parent as a clean 'Up:' link does not overstate officialness because statistische Gebiete nest within a single Stadtteil by administrative design (the WFS merely omits the parent key). No new cross-city equivalence claim is introduced; the finer-than-PLR grain distinction is carried by the reference and methodology pages. No index/status/displacement indicator is published, so no misuse-acceleration surface is added.",
  "theory_risks": [
    "reference/area-hierarchy.md (lines 116-123) still calls the Gebiet->Stadtteil edge 'not currently resolved' -- now a publicly reachable contradiction with the live Hamburg pages; disclosed on-page and tracked to I21-j, non-blocking.",
    "I21-j must correct only the 'edge not resolved' claim, NOT the separate 'OA figures do not roll up to a coarser scale' claim (still true -- D4 is inherited downward, not rolled up); over-correcting would introduce a false capability claim.",
    "The #301 scale-analogy ledes ('same scale as Berlin's Planungsraum') slightly overstate equivalence (a Gebiet is finer than a PLR); pre-existing, out of this ticket's changed surface, and hedged elsewhere -- noted, not blocking."
  ],
  "recommendations": [
    "Prioritise I21-j to refresh reference/area-hierarchy.md so the reference and Hamburg pages stop disagreeing publicly about the L2->L1 edge.",
    "When refreshing that page, scope the fix to the resolved-edge claim only and preserve the OA-rollup caveat (hierarchy nav != OA aggregation).",
    "At I21-i (#303), when real Hamburg figures land, re-confirm the crosswalk-provenance disclosure still renders adjacent to any Gebiet-grain statistic that inherits a Stadtteil-grained value."
  ]
}
```

Verdict: PASS
