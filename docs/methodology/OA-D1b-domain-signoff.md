# OA-D1b (#240) — gentrification-domain-expert sign-off

**Verdict: PASS**

- **Gate:** R-C1 dual methodology gate, domain-fidelity half (pairs with the OA-D1b geo-signoff by
  `geo-data-scientist` for spatial-method soundness).
- **Artifact under review:** `transform/models/intermediate/dim_area_hierarchy.sql` — the new
  Hamburg `subarea_l2` (statistisches Gebiet) → `subarea_l1` (Stadtteil) spatial parent crosswalk
  (`ST_Within` centroid-in-polygon containment + nearest-Stadtteil `ST_Distance` fallback for 2/943
  boundary-noise Gebiete), on feature branch `feature/240-oa-d1b-hamburg-parent-wiring`
  (tip `0ccffe92`, off `develop`). Supporting: `transform/seeds/seed_dim_area_level.csv`.
- **Reviewer:** gentrification-domain-expert.
- **Date:** 2026-07-17.
- **Scope of THIS review (my lane):** theory-fidelity and city-reusability of building Hamburg's
  area-hierarchy seam from geometry alone (ADR-0005 city-agnostic core, second city). NOT spatial
  statistics (geo-DS's parallel gate) and NOT the already-completed engineering verification
  (data-engineer-reviewer: build/tests clean, 941/943 exact + 2 justified fallbacks independently
  recomputed).

---

## Summary judgement

**PASS, unconditional.** This ticket is pure geographic plumbing: it emits resolved parent/child
*edges* (a crosswalk table), and computes **no gentrification indicator, weight, normalization,
outcome, or claim of its own.** The invasion-succession / rent-gap / displacement machinery
(Dangschat 1988; Smith 1979/1987; Döring-Ulbricht) is not engaged at this layer, so the
theory-fidelity bar is the lower "does this pre-commit future Hamburg work to an inappropriate
framing?" bar — and it does not. I confirm the direction.

The three domain risks I was asked to probe — (1) a geometry-only crosswalk smuggling in a
Berlin-specific idea of "neighborhood," (2) a false Stadtteil ≡ Bezirk/Ortsteil equivalence that
would mislead a future Hamburg index-page reader, and (3) a hidden indicator/outcome claim — are all
**absent**, for the reasons below.

---

## Findings

### 1. No imported Berlin "neighborhood" assumption — the geometry reproduces *Hamburg's own* nesting

The crosswalk assigns each statistisches Gebiet to its containing Stadtteil. Crucially, the Gebiet is
**Hamburg's own finest published statistical subdivision, drawn by the LGV to nest inside
Stadtteile** — it is not an independently-drawn tessellation. So `ST_Within(centroid, Stadtteil)`
does not *invent* a boundary or impose a Berlin definition of what a neighborhood is; it recovers a
containment relationship that Hamburg's statistical office already built into its own geometry. The
"neighborhood" being tracked when OA figures later roll up through this seam is the Hamburg Stadtteil
*as Hamburg defines it*, not a Berlin-analogized construct. No Berlin-specific social-geography
assumption is imported.

This is also why centroid-containment (rather than fractional area-overlap) is domain-appropriate
here and does **not** introduce the misallocation/MAUP bias it would in the Berlin PLR↔Ortsteil case:
because Gebiete nest wholly inside one Stadtteil by construction, a later count-rollup through this
edge preserves Hamburg's own boundaries with no fractional-straddle distortion. The model's header
draws exactly this distinction (vs. `int_berlin_plr_ortsteil_overlap.sql`'s two-independent-
tessellations case), which is the theory-relevant call and it is made correctly.

### 2. No false Stadtteil ≡ Bezirk/Ortsteil equivalence — the city-agnostic abstraction is the defense

The schema keeps the two cities' ladders in **distinct, generically-labelled level slots**, never
collapsing one onto the other:
- Hamburg: `district` (Bezirk, 7) ⊃ `subarea_l1` (Stadtteil, ~104) ⊃ `subarea_l2` (Gebiet, ~945).
- Berlin: `pgr`/`bzr`/`plr` (LOR) and `ortsteil` — separate rows, `seed_dim_area_level.csv` labels
  them explicitly "Generic city-agnostic … (e.g. Hamburg Stadtteil)".

Notably the seed even keeps Hamburg's Stadtteil (`subarea_l1`) and Berlin's Stadtteil-in-name
(`ortsteil`) as **different** levels rather than merging two things that merely share the word
"Stadtteil" — precisely the equivalence trap the task flagged. The header's Berlin↔Hamburg parallel
("the way Berlin's roll up PLR→BZR→PGR→Bezirk") is a **structural** analogy (both are nesting
hierarchies), not a **semantic** one (it never asserts a Stadtteil *means* a Bezirk). ADR-0005's
`dim_area`/generic-level design is doing its job here: it lets the pipeline walk each city's ladder
without hard-coding either city's administrative semantics into shared models.

### 3. No indicator / weight / outcome introduced — confirmed

Every column this model emits is `(city_code, area_level, area_code, parent_area_level,
parent_area_code)`: pure edges. There is no share, LQ, count, weight, normalization, dominance, or
temporal difference. R-C2 grounding is satisfied (the Hamburg CTE cites ADR-0024 D4, the WFS layer
provenance, and the parallel to `int_berlin_plr_ortsteil_overlap.sql`). Nothing here makes, or
pre-commits, an invasion-succession or displacement claim.

---

## Recommendations (forward-carried, NOT blocking this PASS)

These bind the **downstream** Hamburg OA rollup (OA-D8) and any future Hamburg index page, not this
plumbing ticket. Recorded here so they enter the acceptance criteria when those methodology-bearing
tickets re-enter the R-C1 gate:

1. **Do not inherit Berlin's "BZR-is-the-public-headline-scale" default for Hamburg by analogy.**
   The OA-D0/ADR-0024 scale guidance (BZR headline; PLR = succession front but D-3-unstable/highest
   misuse) is grounded in Berlin's specific size/stability profile. Hamburg's Stadtteile differ
   markedly in area and social meaning (a large, low-density outer Stadtteil vs. a small, dense inner
   one are not comparable "units"), so the choice of Hamburg's public headline scale (Stadtteil vs.
   Gebiet vs. Bezirk) must be argued on **Hamburg's own** resolution-vs-stability and
   ecological-fallacy terms when OA-D8 lands — not copy-pasted from Berlin's BZR default.
2. **Carry the ecological-fallacy + anti-erasure caveats through the rollup.** When Gebiet-level OA
   is aggregated to Stadtteil, a coarse Stadtteil figure says nothing about any block within it, and
   thinly-observed Gebiete must read as "too thinly observed to characterize," never "commercially
   dead" (Haklay 2010 VGI-coverage non-neutrality; OA-D0 Condition D). These are OA-D8 conditions,
   surfaced early.
3. **Re-examine the 2 fallback Gebiete when they carry real OA figures.** '90001' and '106001' are
   correctly handled as boundary/digitization noise *for edge assignment*; when they later carry POI
   counts, confirm the assignment doesn't create a materially misleading Stadtteil rollup for those
   two cells (low-risk: both are large, sparsely-built peripheral Gebiete).

---

## Verdict line (for the PM pre-integration check)

**Verdict: PASS** — OA-D1b is a domain-neutral spatial-hierarchy plumbing seam. It imports no
Berlin-specific neighborhood assumption (the geometry recovers Hamburg's own Gebiet⊂Stadtteil
nesting), implies no false Stadtteil ≡ Bezirk/Ortsteil equivalence (distinct city-agnostic level
slots per ADR-0005), and introduces no indicator, weight, or outcome claim. Domain-fidelity gate is
satisfied; integration into `develop` is supported on the domain half, subject to the parallel
geo-DS spatial-soundness sign-off. The three recommendations are forward-carried to OA-D8, which
re-enters the R-C1 gate on its own branch.

Grounding (R-C2): ADR-0005 (city-agnostic core, `dim_area`/generic levels); ADR-0024 D4;
`seed_dim_area_level.csv`; `int_berlin_plr_ortsteil_overlap.sql` (analogous non-nesting crosswalk);
Dangschat 1988 (invasion-succession — not engaged at this layer); Smith 1979/1987 (rent-gap — not
engaged); Haklay 2010 (VGI coverage non-neutrality, forward-carried to OA-D8);
`docs/methodology/OA-D0-domain-signoff.md` (scale/ecological-fallacy conditions inherited downstream).
