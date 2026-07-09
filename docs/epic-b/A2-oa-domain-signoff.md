# Gentrification Domain Expert Sign-off: OA-A.2 (#166) — int_poi_offering_advantage build

- **Scope:** OA-A.2 #166 — the domain-fidelity half of the R-C1 dual gate on the production build of
  `int_poi_offering_advantage`. Validates that the materialized 3-level location quotient still reads,
  in the urban-sociology/housing-policy sense, as the "offering advantage" construct approved at the
  OA-P0.1 spike (`docs/epic-b/P0.1-oa-variant-domain-signoff.md`) and the OA-P0.2 ADR (ADR-0017), and
  that the mass-leakage guard added to discharge condition C-1 does not change that reading.
  Spatial-statistical soundness is covered separately by `docs/epic-b/A2-oa-geo-signoff.md`.
- **Operationalizes:** 2018 thesis OA as a marker of commercial/retail succession
  (`reference/system/70_oa_helper.sql`, `71_oa.sql`; thesis pp. 55–56, 91); Dangschat (1988)
  invasion-succession; Zukin (2009); Lees/Slater/Wyly (2008); Smith (1979/1987) rent-gap/disinvestment
  reading of vacancy; ADR-0017 D1–D5.
- **Reviewer:** gentrification-domain-expert
- **Date:** 2026-07-09
- **Branch:** feature/166-oa-a2-offering-advantage → develop
- **Geo-DS verdict:** PASS (`docs/epic-b/A2-oa-geo-signoff.md`)
- **Verdict:** PASS

---

## 1. Construct validity holds under the production build

The build materializes exactly the construct the OA-P0.1 domain sign-off already approved: a
parent-relative nested LQ (`OA = 1` = represented at the city-wide compositional rate) at domain,
category, and type granularity, computed identically on both the hard point-in-polygon count and the
Gaussian-weighted stock. Nothing about *what is measured* changed between the spike and this build —
OA-A.2 is a faithful implementation ticket, not a new methodological decision — so my construct-validity
findings from the OA-P0.1 sign-off (§1) carry over unchanged: OA reads as the observable "offering" side
of commercial-tenant-mix succession (Dangschat 1988 applied to retail; Zukin 2009 "boutiquing"), usable
as a *lead* predictor of neighborhood change, not a resident-displacement measure itself.

## 2. The mass-leakage guard does not alter the theoretical reading

The one substantive new mechanism introduced by this ticket — the `int_osm_poi_plr_weighted`
mass-leakage guard, fall-back-assigning a POI beyond kernel bandwidth of every PLR to its **hard home
PLR** at weight 1 — is a pure data-completeness fix, not a re-weighting of the offering-advantage
construct itself. It affects only a small number of POIs in Berlin's large, low-density, largely
non-retail PLRs (Tempelhofer Feld, Grunewald, Flughafensee), assigning them to the one PLR they
unambiguously belong to (their point-in-polygon home) rather than dropping them. This slightly
*increases* fidelity for those PLRs' own OA reading (a park-adjacent café near Tempelhofer Feld no
longer vanishes from that PLR's local stock) and has no effect on neighbouring, denser PLRs' OA
readings. I see no construct-validity concern here.

## 3. Sign carried correctly; D-1/D-2 interpretive guardrails preserved in the SQL header

The model's "Interpretation notes" section (which I require verbatim per the OA-P0.1 conditions)
correctly states, in the model's own SQL comments (not left to downstream memory):

- **D-1**: OA is descriptive of early gentrification, not a causal displacement predictor — must never
  be presented as an "up-and-coming Kiez" targeting signal. Framing enforcement is correctly deferred
  to G2/O2/A.5 (#82, #169), not this model.
- **D-2**: OA is a multi-signed bundle — Vacancy-domain OA is a **disinvestment / rent-gap** marker
  (Smith 1979/1987), the *opposite* pole from amenity-domain OA (Gastronomy/Entertainment), and must
  never be summed across types into a single score. This is the correct sign discipline and matches my
  OA-P0.1 finding almost verbatim — good that it is now load-bearing in the code, not just the ADR.
- **D-3** (advisory): compositional LQ instability in low-POI-base PLRs is flagged as deferred
  (suppression to a later ticket), which I agree is the right sequencing — a suppression rule is a
  separate methodological decision (likely geo-DS-led) and should not block this faithful-reproduction
  build.

## 4. Faithful/improved separation preserved

`methodology_variant = 'faithful'` for every row in this ticket, with `'improved'` reserved
(enumerated, unpopulated) for OA-B.1–B.4 (#170–173)'s causal-tier curated weighting. This is the
correct governance: the faithful Run 1 must remain uncurated (all types, no dropping/reweighting) so
it is a clean thesis-fidelity baseline against which the improved run can later be honestly compared —
short-circuiting curation into this ticket (e.g. quietly excluding a "noisy" type) would have been a
firm-rule violation (ADR-0017 D3) and I confirm it did not happen: the model includes every taxonomy
leaf that `fct_poi_development` / `int_osm_poi_plr_weighted` produce, with no `where poi_*_h not in
(...)` exclusion filter anywhere in the SQL.

## 5. Spot-check values consistent with expected sign behaviour

I reviewed the geo-DS spot-check output (large `oa_type` values concentrated in low-base PLR/type
cells) and confirm this is the expected D-3 instability, not a sign or construct error — a single
gastronomy POI opening in an otherwise POI-sparse residential PLR *should* register a large local
over-representation under a compositional LQ; that is exactly the "early signal, easily noisy" property
the domain literature attributes to retail-succession indicators at fine grain, which is why OA is
read as a lead/trend signal aggregated over PLR-years and taxonomy groups, never as a single-cell
verdict.

---

## 6. Conditions

None new. Conditions C-2 (lagged-predictor completeness caveat) and D-3 (low-base suppression,
advisory) from the OA-P0.1 sign-offs remain owed by their respective downstream tickets (OA-A.4 #168,
a later suppression ticket) and are unchanged by this build.

---

## 7. Risks

1. A downstream consumer (dashboard, whitepaper draft) sums or averages raw `oa_*` across
   domains/types without respecting the sign discipline in D-2 — mitigated by the SQL-header guardrail
   and by G2/O2 (#82) framing review still to come.
2. Fine-grain OA cells in low-POI-base PLRs are noisy (D-3) — mitigated by reading OA at aggregated
   PLR-year / taxonomy-group scale for the H1–H3c regressions (OA-A.4 #168), not as isolated cell
   values.
3. This faithful Run 1 will diverge from the 2018 golden for reasons already flagged as methodological
   (finite bandwidth, sparse vs dense representation) rather than implementation defects — Epic B
   directional framing applies (CLAUDE.md), to be documented at OA-A.3 (#167).

---

## 8. Certification

The production `int_poi_offering_advantage` build faithfully implements the construct I already
approved at the OA-P0.1 spike, carries the required D-1/D-2 sign and framing guardrails verbatim in the
model's own SQL comments, correctly maintains the faithful/improved separation (no curation
short-circuit), and the new mass-leakage guard is a data-completeness fix with no bearing on the
theoretical reading. I have no domain-fidelity objection to integrating this into `develop`.

```json
{
  "verdict": "pass",
  "rationale": "int_poi_offering_advantage materializes exactly the parent-relative nested location-quotient construct already approved at OA-P0.1 (domain vs all-domains; category/type vs shared parent domain), which reads as the observable offering/commercial-succession side of gentrification (Dangschat 1988 invasion-succession applied to retail; Zukin 2009 boutiquing) usable as a lead predictor, not a displacement measure. The model's own SQL header carries the required D-1 (descriptive, not causal/targeting) and D-2 (multi-signed bundle -- vacancy-domain OA is a disinvestment/rent-gap marker per Smith 1979/1987, opposite pole from amenity-domain OA, never summed across types) guardrails verbatim, and the faithful/improved separation is correctly preserved with no curation short-circuit (every taxonomy leaf included, methodology_variant='faithful' only, 'improved' reserved for OA-B.1-B.4). The new mass-leakage guard in int_osm_poi_plr_weighted is a data-completeness fix (fall back to hard home PLR at weight 1 for a POI beyond kernel bandwidth of every PLR) with no bearing on the theoretical reading of OA -- it slightly increases fidelity for a handful of large low-density PLRs and does not affect denser PLRs' readings. Large oa_type values observed in low-POI-base cells are the expected, already-documented D-3 compositional instability of a fine-grain LQ, consistent with the literature's early-signal/noisy-at-fine-grain property, not a construct or sign error.",
  "risks": [
    "Downstream reader sums/averages raw oa_* across domains or types, violating the multi-signed-bundle discipline (D-2) -- mitigated by the SQL-header guardrail and pending G2/O2 framing review",
    "Fine-grain OA cells in low-POI-base PLRs are noisy (D-3) -- must be read at aggregated PLR-year/taxonomy-group scale in the OA-A.4 regressions, not as isolated cell values",
    "Faithful Run 1 will diverge from the 2018 golden for already-flagged methodological reasons (finite bandwidth, sparse vs dense representation) -- Epic B directional framing, to document at OA-A.3"
  ],
  "recommendations": [
    "Carry the D-1/D-2 sign/framing guardrails into the G2 methodology page and O2 whitepaper verbatim when OA-A.5 (#169) drafts the public framing",
    "OA-A.4 (#168): read OA at aggregated PLR-year/taxonomy-group scale for the regressions, not single fine-grain cells, given the documented D-3 instability",
    "OA-A.3 (#167): frame any divergence from the 2018 golden as the already-identified methodological divergence (bandwidth, sparse representation), per Epic B framing (CLAUDE.md)"
  ]
}
```

---

## Final Verdict

Verdict: PASS
