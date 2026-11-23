# #363 domain sign-off: determinism tests, restated C-1, C1 regeneration, O7 tie-break

- **Reviewer:** gentrification-domain-expert
- **Date:** 2026-11-23
- **Reviewed:** branch `feat/363-determinism-tests`:
  - a36a23fc0: the ADR-0017 Amendment 2026-11-07 (restated C-1);
  - c74bf263b, 9c3300552, 5cb9e40f1 (O7), 27358574f (C1 regeneration), 2b674f657 (the
    methodology disclosure);
  - context: `docs/epic-c/363-geo-tolerance-note.md`, `int_osm_poi_plr_weighted.sql`,
    `ingestion/berlin/osm/ingest_osm_history.py` (extract bounds), and the `web/pages` that show
    C1 figures and `top_child`.
- **Scope:** domain validity and public framing. Statistical soundness is the geo-DS's half.

Verdict: CONCERNS

The restated invariant is sound and decision B is defensible in theory. Four text items need
fixing (D1–D4), plus one follow-up ticket. If D1–D4 are adopted verbatim, this is PASS without a
re-check.

## 1. ADR-0017 amendment: the restated C-1 and its rationale

- **The invariant sentence: ratified.** It describes exactly what the kernel does. Each
  outside-polygon POI within the bandwidth adds weight 1. The excess is one-sided and integer, with
  a city-agnostic bound. Mass loss, non-integer excess, leaf mismatches and missing counterparts
  stay BLOCKING.
- **The rationale, "for an edge area, what counts is the offering around the corner, whichever
  side of the city boundary it sits on": sound in principle.** A 500 m distance-decay kernel is an
  accessibility measure. Residents of an edge Kiez shop and eat where it is walkable, and the
  municipal boundary does not stop them. Cutting the kernel at the boundary would understate the
  offering of every edge area. That bias would fall on outer-city areas, many of them large estates
  and peripheral low-status areas, so a hard cut would not be neutral either. Decision B fits the
  Kiez-diffusion rationale of the 500 m bandwidth (model header; Döring & Ulbricht 2016).
- **But as written, the rationale over-states what the data contain (D1).** The Berlin POI
  extract is clipped to a **bounding box** around Berlin (`ingest_osm_history.py`:
  lon 13.088–13.761, lat 52.338–52.675). That box hugs Berlin's extreme extents. So:
  - across-boundary POIs enter only where the box extends beyond the city line (mainly the
    "corners", e.g. Kleinmachnow/Teltow, Schönefeld, Falkensee's eastern edge);
  - they are missing at the four extreme edges (far west of Spandau, far north, far east, far
    south).

  "Whichever side of the boundary" therefore holds only partly and unevenly along the edge. The
  outside-polygon POIs also include in-city gaps (water bodies, airport perimeter), not only
  Brandenburg. Both effects are tiny at city level (≤ about 0.1 %), and per area they reach only
  POIs within 500 m of an edge area's representative point. But the ADR should not claim more
  than the data deliver, and the same caveat will apply to Hamburg's extract.
- **Status note.** The amendment is still "Proposed (pending maintainer OK)". This sign-off
  ratifies the text. It does not replace the maintainer's OK.

## 2. The methodology-page disclosure (2b674f657): needs rewording (D2)

The sentence is appended to the paragraph about the **Gaussian Offering Advantage bandwidth
sweep**, whose headline catchment is 1000 m, and then says "the 500 m kernel". Readers will merge
the two. It also says only "just outside the city boundary", misses the in-city gaps, and says "up
to 0.1 %", although the observed maximum is 0.103 % (1 POI, 2008; covered by the 3-POI floor).
And it does not say that this variant is not the published one. The rationale (why it is intended)
is also missing, although the ADR's own Consequences require it ("It also states why this is
intended").

## 3. The regenerated C1 findings (27358574f): public text needs updating (D3)

- **No verdict, sign or framing changes.**
  - Run 1 (faithful vs 2018 golden data) is still significant and wrong-signed: ρ 0.148,
    n 435 → 433.
  - Run 2 (improved vs live MSS) is still not significant: ρ 0.029 → 0.047, p 0.2375 → 0.0610.
  - The same-anchor run B is still not significant: ρ 0.007 → 0.016, p 0.7428.
  - On the common sample, improved ρ = 0.020 (p 0.6852).

  "Weak and not statistically significant" and "essentially no correlation" remain accurate. This
  domain sign-off adds one framing caution: p = 0.061 is near the threshold, so no public text may
  call Run 2 "no association" or "zero". The current page does not.
- **Signed public text cites the old figures.** `web/pages/methodology.md` §7 (its C1 domain
  sign-off carried over unchanged) gives:
  - "n=435" (l. 464, 477, 503);
  - "rho ≈ 0.007" (l. 471);
  - "This comparison was run in July 2026, before the October 2026 OpenStreetMap deletion fix…"
    (l. 465–467). That sentence is now false, because C1 itself has been re-run on corrected
    data.

  No other public page or signed headline cites C1 figures. `E1-regression-findings.md` already
  carries ρ 0.1483, n 433. The C1 geo/domain sign-off files are historical records and stay
  unchanged.

## 4. The O7 tie-break and the public "Leading type" (D4 + follow-up)

O7 is a real improvement in reproducibility. Before it, a tie took an arbitrary row that could
flip between builds and could even pair one label with another child's tier.

**But an alphabetical tie-break is not neutral in meaning.** In gastronomy, "Café" sorts before
"Fast Food" and "Restaurant", so every Café/Fast-Food tie is now shown as "Leading type: Café".
That is systematically the up-market reading, the very association H1a/H1b and the OA-D0 tier
pairing (Condition B.2) are sensitive to. Similar orderings exist in retail and entertainment. The
public "Leading type" column on five Berlin area page templates (`area/[code]`, `bezirk`, `bzr`,
`ortsteil`, `pgr`) shows `top_child` with no tie indicator. Thin-base groups are hidden, but ties
are common at small PLR stocks. The domain view is that a tie means **no single type leads**, and
the page should say so.

- **Now (required, D4):** a disclosure on those pages (text below).
- **Follow-up ticket (recommended, DE + geo-DS + domain):** add a tie flag to the dominance mart,
  for example `n_top_tied` (children at the maximum share at 9 decimals). Render tied cells as
  "Tied (no single leading type)". Make sure `top_child_offering_tier` is not read on tied rows
  (the signed tier pairing, B.2). Until then, the disclosure stands in.

## 5. Required changes

- **D1: ADR-0017 Amendment 2026-11-07, Trigger paragraph.** After "For an edge area, what counts is
  the offering around the corner, whichever side of the city boundary it sits on.", insert:

  > "This holds only as far as the POI extract reaches: the Berlin extract is clipped to a bounding
  > box around the city, so places across the city line are included where that box extends beyond
  > it and missing at the city's extreme edges. Outside-polygon POIs also include in-city gaps such
  > as water bodies and the airport perimeter. Any future city's extract bounds must be stated the
  > same way."

- **D2: `web/pages/methodology.md` l. 571–573.** Replace:

  > "In the distance-weighted variant, places just outside the city boundary but within the 500 m
  > kernel also contribute to nearby areas, so its city totals can exceed the hard counts by up to
  > 0.1 %."

  with:

  > "A separate note on the distance-weighted place counts (500 m kernel; also not used for the
  > figures above): mapped places that lie outside every area, just across the city boundary or on
  > water or airport land, still count towards nearby areas if they are within the kernel's reach.
  > This is intended, because for an area at the edge the offering around the corner matters,
  > whichever side of the boundary it is on. As a result, that variant's city totals can exceed the
  > hard counts by about 0.1 % at most. Places across the boundary are only partly included,
  > because the map data are cut to a box around the city."

- **D3: `web/pages/methodology.md` §7.**
  - l. 464–468. Replace "**statistically significant but wrong-signed** (n=435 areas — same result
    as before, repeated here as the left side of the comparison). This comparison was run in July
    2026, before the October 2026 OpenStreetMap deletion fix; the re-run on corrected data gives the
    same wrong-signed result (rho +0.15, n=433 — see the [E1 regression findings](…))." with:

    > "**statistically significant but wrong-signed** (rho +0.15, n=433 areas — the same result as
    > before, repeated here as the left side of the comparison; re-run in November 2026 on the
    > corrected OpenStreetMap data, matching the [E1 regression findings](…))."

    Keep the existing link target.
  - l. 471: "(rho ≈ 0.007, n=436, not statistically significant)" → "(rho ≈ 0.02, n=436, not
    statistically significant)".
  - l. 477: "n=435)." → "n=433)."
  - l. 503: "(n=435 areas — more of this business basket…" → "(n=433 areas — more of this business
    basket…".

- **D4: "Leading type" disclosure** on `web/pages/berlin/area/[code].md`, `area/bezirk/[code].md`,
  `area/bzr/[code].md`, `area/ortsteil/[code].md` and `area/pgr/[code].md`. Append this sentence to
  the paragraph directly above each dominance table (on `area/[code].md`, after "…(this table
  included)."):

  > "Where two or more types have exactly the same top share, the table names the alphabetically
  > first one; such a tie means that no single type leads, not that the named type dominates."

## 6. Optional

- **O1** Add the same tie sentence to the dominance section (§5) of `/methodology-oa-modes`, so the
  decoder and the tables match.

Verdict: CONCERNS

---

## Re-check (2026-11-23, `feat/363-determinism-tests` @ b28007d19, 76918b1fd)

| Item | Status |
|---|---|
| D1 ADR-0017 amendment, extract-bounds sentence | **Met**, verbatim (b28007d19). |
| D2 methodology-page disclosure | **Met**, verbatim. |
| D3 methodology §7 figures (rho +0.15 / n=433, the November 2026 re-run, rho ≈ 0.02, n=433 twice) | **Met**, verbatim; the E1 link is kept. The DE found no conflict with geo R2. |
| D4 tie sentence on the five Berlin area page types | **Met**, verbatim. On bezirk/bzr/ortsteil/pgr it sits in the "Dominance is sign-blind" Alert directly above the table, which is the paragraph above the table on those pages. On the PLR page it follows "…(this table included)." |
| O1 `/methodology-oa-modes` §5 | Adopted, verbatim. |
| Follow-up tie flag | Filed as #379 and referenced in the page comments. |

Verdict: PASS
