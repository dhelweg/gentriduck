# OA-D8 (#240) — gentrification-domain-expert sign-off

**Verdict: PASS** (with two forward-binding conditions carried to the eventual public-facing
Hamburg OA page, which re-enters the R-C1 gate on its own ticket — none blocking this data-layer
integration).

- **Gate:** R-C1 dual methodology gate, domain-fidelity half (pairs with the OA-D8 geo-signoff by
  `geo-data-scientist` for spatial-method soundness — separate lane, not re-adjudicated here).
- **Artifact under review:** the OA-D8 generalization of the area_level roll-up from Berlin-only to
  city-agnostic (ADR-0005), on feature branch `feature/240-oa-d8-hamburg-validation`
  (tip `88f6d554`, off `develop`):
  - `transform/models/intermediate/int_poi_offering_advantage_arealevel.sql` (substr-prefix →
    `dim_area_hierarchy` edge consumption; per-city leaf via `dim_city.oa_leaf_area_level`),
  - `transform/models/marts/mart_poi_oa_arealevel.sql` (`maup_caveat_required` and
    `area_level_publish_tier` generalized from Berlin literals to per-city / per-level seed lookups),
  - `transform/seeds/seed_dim_area_level.csv` (`publish_tier` column, Hamburg tiers),
  - `transform/seeds/seed_dim_city.csv` (`oa_leaf_area_level` column).
- **Reviewer:** gentrification-domain-expert.
- **Date:** 2026-07-18.
- **Scope of THIS review (my lane):** theory-fidelity, ethics/framing, and city-reusability of the
  first real Hamburg OA rollup — specifically the three forward conditions carried from the OA-D1b
  domain sign-off (`docs/methodology/OA-D1b-domain-signoff.md`, recommendations 1–3). NOT the spatial
  statistics (geo-DS's parallel gate: LQ-last/mass-conservation/MAUP measurement) and NOT the
  engineering verification (data-engineer-reviewer: build/tests clean, fallback figures independently
  recomputed).

---

## Summary judgement

**PASS.** The generalization is faithful, honestly documented, and — critically for a first-second-city
milestone — it publishes nothing: it sets a *re-confirmable* per-city/per-level default carried as
data (`publish_tier`, `oa_leaf_area_level`) and correctly generalizes the two disclosure columns. It
does not pre-commit the eventual public Hamburg page to an inappropriate framing; the substantive
publication decision re-enters this gate at the page ticket. The three OA-D1b forward conditions are
substantively addressed. I attach **two forward-binding conditions** (below) that bind that later page
ticket, not this integration.

I make the **condition-1 call myself** (the task's central question) below rather than defer it to
geo-DS: area-count ratios alone are *not* a sufficient basis for a social-meaning headline
recommendation, but the choice survives because the *domain reality* independently supports it and the
default is explicitly re-confirmable.

---

## Findings against the three OA-D1b forward conditions

### Condition 1 — Hamburg headline scale argued on Hamburg's own terms (the central question)

**The sharp question I was asked to decide:** is "argued from Hamburg's own area-count ratios" a
sufficient basis for designating Stadtteil (`subarea_l1`) as Hamburg's `headline` tier, or does it bake
in an assumption about what a socially meaningful neighborhood unit is in Hamburg without
Hamburg-specific social/administrative grounding (the way Berlin's Bezirk/Ortsteil choices were
informed by Berlin's own administrative history)?

**My call: area-count ratios alone would be INSUFFICIENT — that would be a pure resolution/stability
argument (largely geo-DS's lane), not a social-meaning argument (my lane).** Two of the mart header's
three legs — (a) population-per-unit scale comparability (~18k/Stadtteil vs Berlin BZR ~27k/BZR) and
(b) roll-up stability (~9 Gebiete/Stadtteil damping small-base noise) — are quantitative
resolution-vs-stability arguments. They correctly establish that Stadtteil sits in the same
*resolution band* as Berlin's BZR, but resolution-band membership is not the same claim as "this is the
socially meaningful neighborhood unit." The header's third leg — (c) LEGIBILITY, "Stadtteile are
Hamburg's own well-known, named administrative/cultural units" — is the only leg that reaches
social meaning, and in the header it is **asserted, not sourced.**

**Why this nonetheless PASSES:** the *conclusion* is domain-correct for a reason stronger than what the
header writes down, and I supply that grounding here so it is on record. Hamburg's actual gentrification
and displacement discourse is conducted **precisely at the Stadtteil scale** — St. Pauli, Sternschanze
(Schanzenviertel), Ottensen, and Wilhelmsburg are the named units around which the Hamburg "Recht auf
Stadt" movement, the Gängeviertel occupation, and the Esso-Häuser / St. Pauli conflicts were organized
(Holm on Hamburg; Twickel's *Gentrifidingsbums*; Birke & Holm on Right-to-the-City Hamburg). Stadtteil
is genuinely the Hamburg analogue of the Berlin Kiez/Bezirksregion as a *publicly legible* neighborhood
unit. So the header lands on the structurally analogous rung (as OA-D1b feared it might) but for an
independently valid reason, not by the forbidden "BZR is headline in Berlin, therefore the analogous
rung is headline in Hamburg" analogy — and the header explicitly disavows that analogy, correctly.

**But** the header's grounding for the social-meaning leg is a bare assertion, whereas Berlin's
`headline` (BZR) was both maintainer-confirmed (OA-D0 scope knob #4) and thesis/administrative-history
grounded. So as a **data-layer, re-confirmable default** the basis is sufficient (the seed comment even
flags it as "subject to re-confirmation … before integration"); as a **public social-meaning
recommendation** it is not yet sufficiently grounded. Because this ticket publishes nothing, I pass it
and bind the grounding to the page — see Forward Condition A.

**One substantive domain nuance the header does NOT surface and the page must:** in Hamburg the
*displacement-protection* unit is often **finer than the Stadtteil** — soziale Erhaltungsverordnungen
(Milieuschutz) exist at sub-Stadtteil / partial-Stadtteil granularity (e.g. within Altona-Altstadt,
St. Pauli, Sternschanze, Ottensen), just as Berlin's Milieuschutzgebiete are sub-Bezirk. So Stadtteil is
the right *legibility/headline* scale but is **coarser than the policy scale at which succession is
actually fought.** This is exactly why retaining Gebiete (`subarea_l2`) as `primary` / succession-front
is domain-correct, and it reinforces (not undermines) the tiering — but the page copy must not let a
calm Stadtteil headline imply the sub-Stadtteil policy front is calm.

### Condition 2 — ecological-fallacy / anti-erasure caveats carry through the Hamburg rollup

**Genuinely present and re-derived on Hamburg's own numbers, not copy-pasted — confirmed, and if
anything stronger for Hamburg.**

- `maup_caveat_required` is generalized from the Berlin literal `area_level != 'plr'` to
  `area_level != city.oa_leaf_area_level`, so it fires for every coarser-than-leaf Hamburg row
  (`subarea_l1`, `district`) exactly as it does for Berlin's `bzr`/`pgr`/`bezirk`. Mechanically equal.
- The header is **honest about the asymmetry** rather than papering over it: the MAUP `r>0.7`
  rank-correlation gate has only been *empirically* run for Berlin (OA-D5 PLR-vs-BZR); for Hamburg the
  flag is a *conservative disclosure default* pending a Hamburg-specific re-run. This is the correct
  ethical posture — disclose-by-default on unmeasured fragility rather than claim Hamburg has been
  measured. The schema.yml column doc states this plainly.
- The ecological-fallacy caveat for Hamburg's `district` (Bezirk) is **re-derived on Hamburg's own
  pooling factor** (943/7 ≈ 135 Gebiete per Bezirk vs Berlin's 447/12 ≈ 37 PLR per Bezirk) and correctly
  concluded to apply *at least as strongly* — a genuine computation, not a transplant of Berlin's text.
- The anti-erasure framing ("too thinly observed to characterize," **never** "commercially dead";
  Haklay 2010 VGI-coverage non-neutrality) carries through via the D-3 min-base flags, which are
  recomputed against each city's own rolled-up local base with the same threshold and no
  city-conditional logic. A thin Hamburg Stadtteil flags exactly as a thin Berlin BZR would.

The one gap here is not in *whether* the caveat carries but in *threshold calibration at Hamburg's
finer/smaller units* — see Condition 3 and Forward Condition B.

### Condition 3 — re-check the two fallback Gebiete (90001, 106001) now that they carry real figures

**The figures are correct and unremarkable (independently confirmed by data-engineer-reviewer); the
residual risk is purely one of *display confidence*, and it is real for one of the two.**

- **106001** (one of 13 Gebiete under Stadtteil 02307/Schnelsen; all_domains stock=600; Gastronomy
  `oa_domain`=0.68, inside its 12 siblings' 0.42–1.67 range, near the Stadtteil rollup 0.72): no
  concern. Well-observed, in-range, no fallback-artifact signature. Its Stadtteil headline pools 13
  Gebiete, so no single-cell fragility.

- **90001** (sole Gebiet under Stadtteil 02703/**Gut Moor**): this one warrants a flag. Because it is
  the *only* child of its Stadtteil, the Gebiet→Stadtteil rollup is the **identity** — the Gut Moor
  Stadtteil `headline` figure is computed from a **single, fallback-assigned (nearest-Stadtteil
  `ST_Distance`, not centroid-containment) Gebiet of 16 total POIs.** 16 clears the flat
  `oa_min_poi_base_n=10` floor, so **no `min_base_flag` fires**, and because it is the sole child there
  is no built-in signal that the Stadtteil number is a one-Gebiet rollup. The value itself is *correct*
  (Gut Moor is one of Hamburg's smallest Stadtteile, ~1k residents; 16 POIs is a true property of the
  area, not a crosswalk artifact — DE-reviewer confirmed). But a 16-POI, sole-child, fallback-assigned
  cell displayed at `headline` tier with no caveat badge is **exactly the "16 observations = too thinly
  observed to characterize" case the anti-erasure framing exists for**, and the n=10 floor — calibrated
  for Berlin's larger PLRs — is too low to catch it. This does not make the data wrong; it means a naive
  page render would imply more confidence than 16 fallback-assigned POIs support. See Forward Condition B.

---

## Forward-binding conditions (bind the future public Hamburg OA page ticket, NOT this integration)

Recorded so they enter the acceptance criteria when the Hamburg-facing OA page re-enters the R-C1 gate.
Neither blocks integrating OA-D8 into `develop` — this ticket only sets a re-confirmable data-layer
default and correctly generalizes the disclosure columns.

**A. Ground the Stadtteil-as-headline choice in Hamburg's own social/policy reality before it is
presented publicly as a *neighborhood* recommendation** (not merely a scale-band recommendation). The
data-layer default may stand on the scale/stability ratios; the *public* framing of "headline =
meaningful neighborhood" must cite Hamburg's own displacement/urban-sociology grounding (Stadtteil is
the scale of Hamburg's Recht-auf-Stadt / St. Pauli / Sternschanze / Wilhelmsburg discourse — Holm;
Birke & Holm; Twickel) **and** must note that Hamburg's Milieuschutz displacement-protection front is
often *finer* than the Stadtteil, so a calm Stadtteil headline does not certify a calm sub-Stadtteil
succession front.

**B. Do not let the thin, sole-child, fallback-assigned Gut Moor (90001 → Stadtteil 02703) headline
figure imply unearned confidence.** Because 16 POIs clears the flat `oa_min_poi_base_n=10` floor, the
page must additionally (i) suppress or prominently caveat sole-child / near-floor Stadtteil headline
cells as "too thinly observed to characterize," and/or (ii) surface that this Stadtteil is a
single-Gebiet rollup and that the underlying Gebiet was a boundary-fallback assignment. I also flag to
`geo-data-scientist` (their calibration lane) that a *flat* absolute `n=10` floor tuned to Berlin PLRs
may under-suppress at Hamburg's smaller Gebiete/Stadtteile — worth a Hamburg-specific base-threshold
review at D5/D7 follow-on.

---

## Verdict line (for the PM pre-integration check)

**Verdict: PASS** — OA-D8's Berlin→city-agnostic generalization of the OA area_level rollup is
domain-faithful: it imports no Berlin neighborhood assumption (consumes `dim_area_hierarchy`'s resolved
Hamburg edges, not a substr prefix), its Hamburg `headline`=Stadtteil default lands on a domain-correct
scale for an independently valid reason (Hamburg's gentrification discourse is conducted at Stadtteil
scale), and its ecological-fallacy / MAUP / anti-erasure disclosures are re-derived on Hamburg's own
numbers and are if anything *more* conservative (disclose-by-default on unmeasured Hamburg MAUP
fragility). The two fallback Gebiete carry correct figures. Domain-fidelity gate is satisfied;
integration into `develop` is supported on the domain half, subject to the parallel geo-DS
spatial-soundness sign-off. The two forward conditions (A: ground Stadtteil-as-headline social meaning +
the finer Milieuschutz front; B: guard the thin sole-child Gut Moor headline against unearned
confidence) are forward-carried to the public-page ticket, which re-enters the R-C1 gate.

Grounding (R-C2): ADR-0005 (city-agnostic core, `dim_area`/generic levels, per-city seed config);
ADR-0024 D2/D4; `docs/methodology/OA-D1b-domain-signoff.md` (forward conditions 1–3);
`docs/methodology/OA-D0-domain-signoff.md` Condition D (BZR-headline / ecological-fallacy framing
inherited and re-derived for Hamburg); `docs/methodology/OA-D5-mode-comparison-findings.md` +
spatial-methods.md §7 (MAUP `r>0.7` gate, Berlin-only empirically); Haklay 2010 (VGI coverage
non-neutrality → anti-erasure); Dangschat 1988 (invasion-succession — the Gebiet/succession-front vs
Stadtteil/legibility scale distinction); Smith 1979/1987 (rent-gap — not engaged at this layer); Holm,
Birke & Holm, Twickel (Hamburg Recht-auf-Stadt / Stadtteil-scale displacement discourse, grounding for
Forward Condition A); Hamburg soziale Erhaltungsverordnungen (sub-Stadtteil Milieuschutz front).
