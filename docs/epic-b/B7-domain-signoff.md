# Domain-Expert Sign-off: B7 (#117) — lor_pre2021 MSS 2015/2017/2019 Panel Extension

- **Scope:** B7 #117 / PR #121 — thesis-era (lor_pre2021) lead-lag panel:
  `int_poi_status_dynamism_pre2021`, `int_ewr_socioeco_pre2021`, the Branch B UNION in
  `int_gentrification_ts`, and E1 Section 3 (`analysis/e1_regressions.py`,
  `docs/epic-e/E1-regression-findings.md`).
- **Reviewer:** gentrification-domain-expert
- **Date:** 2026-06-30
- **Branch:** PR #121 → develop
- **Co-gate:** geo-data-scientist `PASS WITH CONDITIONS` (`docs/epic-b/B7-geo-signoff.md`,
  verdict `concerns`, C-1 … C-5). This is the second half of the R-C1 dual gate.
- **Operationalizes:** ADR-0008 (multi-dimensional model), index-definition.md §2.1–2.4 (lead-lag),
  §6 (LOR vintage discipline), §7.1 (uninhabited exclusion), §9 (invasion-succession map). Epic B
  directional-revival framing (CLAUDE.md §Epic B framing).
- **Verdict:** PASS WITH CONDITIONS

---

## Remit

My gate covers *domain validity*: theory fidelity (Dangschat 1988/2000 double invasion-succession;
Döring & Ulbricht 2016; Smith rent-gap scope; the Berlin MSS/EWR frame, Holm 2010) and *indicator
meaning*. Statistical and spatial soundness is the geo-DS gate, already recorded as
`PASS WITH CONDITIONS` in `B7-geo-signoff.md`. I do not re-adjudicate the geo conditions C-1 … C-5;
I adopt them and add the domain reading where it sharpens or extends them.

I read `B7-geo-signoff.md` in full, `E1-regression-findings.md` (Sections 2–4, divergences,
limitations), `seed_ewr_indicator_meta.csv`, my prior `R-A1-domain-signoff.md`, the `B6` methodology
sign-off, and verified the load-bearing methodology claims against `index-definition.md`
(§2.2, §6, §7.1, §9).

---

## Verification of the load-bearing domain claims

**MSS biennial cadence and the 2-year `Δstatus` window (verified against index-definition.md §2.2 →
thesis p. 97).** The B7 H3a/H3b pre-2021 lead-lag is built on consecutive biennial MSS editions
(2017→2019), a 2-year offset. The thesis itself (p. 97) establishes that the official MSS **Dynamik**
class *already encodes the 2-year status change* — it is the canonical operationalization of "status
change between editions" in the Berlin Senate monitor. So a 2-year inter-edition gap is not an
under-specified lag we invented; it is the native cadence of the instrument the thesis used. The
B7 construction is faithful to that cadence. **Claim confirmed.**

**Uninhabited-PLR exclusion (verified against §7.1 / R-A3 C3).** §7.1 rule 1 mandates that PLRs with
`gesamtindex IS NULL` (WFS sentinel −9999 → null) be excluded from *all* regression, calibration,
lead-lag and metric computation, with the excluded count reported per edition. The geo-signoff
confirms `int_mss_lead_lag` enforces this via `is_uninhabited`. The ~12 excluded PLRs per pre-2021
edition are the *correct* treatment — they have no resident population and no Status/Dynamik outcome.
**Claim confirmed; condition D-2 below makes the count reporting binding for the Epic B headline.**

---

## Domain assessment of the five questions

### Q1 — MSS 2015/2017 as thesis-era comparators across the boundary reform. **Sound.**

MSS 2015 and 2017 are official Berlin Senate *Monitoring Soziale Stadtentwicklung* editions produced
under the **same Status/Dynamik methodology** as 2019/2021 (the z-standardized Status-Index over the
SES core, with Dynamik encoding inter-edition change — `reference/system/50_lor_mss_idx_bzr_idx.sql`;
ADR-0006). The 2021 LOR reform changed *where the boundaries are drawn* (447→542 PLR), not *how social
status is measured*. The two questions — "is the **method** continuous?" and "are the **areal units**
comparable?" — are distinct, and B7 answers them correctly and separately:

- **Method continuity: yes.** Same monitor, same index construction, same SES inputs. Using 2015/2017
  as thesis-era editions is faithful to the instrument the 2018 thesis tested (it used the 2012–2018
  MSS/EWR series on the pre-2021 universe). This is exactly the "anchor the directional revival on the
  pre-2021 447-PLR series" instruction of index-definition.md §6/§7.
- **Areal-unit comparability: handled by isolation, not by bridging.** B7 does **not** areally average
  an MSS class across the boundary break (which §6.3 forbids as a domain error — you cannot
  area-weight an ordinal Status class). Instead it normalizes pre-2021 z-scores *within* the 447-PLR
  population and the geo-signoff verifies a three-layer guard against any 2019→2021 cross-vintage
  comparison. This is the domain-correct posture: the boundary discontinuity is respected by keeping
  each era's analysis self-contained, not by manufacturing a cross-reform delta.

The one domain caveat is the **migration-background break ~2017** documented in
`seed_ewr_indicator_meta.csv` (Mikrozensus redefinition; pre-2017 values not directly comparable).
This is an EWR-indicator issue, not an MSS-Status issue, and B7 routes it correctly (the seed's
`definition_vintage_from=2017` flag governs the EWR baseline, and no B7 H2/H3 test consumes the
migration indicator's pre-2017 level as a longitudinal series). I flag it as condition D-1 so it is
carried into G2 rather than silently absorbed.

### Q2 — Is a 2-year (2017→2019) lag sufficient for the invasion-succession cycle? **Theoretically yes for detection; the near-zero/wrong-sign result is plausible and must not be over-read.**

Dangschat's (1988) double invasion-succession cycle is a *multi-year* social-then-commercial process;
the thesis confirmed H3b (status change *precedes* amenity change) on roughly a 2–4-year window. A
single 2-year inter-edition step is the **shortest** offset at which the social→commercial precedence
could in principle register, and it is the native MSS cadence — so it is an admissible test window,
not an under-specified one. But three domain facts make a near-zero or wrong-sign H3a/H3b result
entirely plausible *without* contradicting the thesis:

1. **Spearman symmetry collapses the directional claim (geo C-1).** I fully endorse the geo-DS reading:
   `Spearman(Δstatus, Δdyn) ≡ Spearman(Δdyn, Δstatus)`, so the MSS H3a/H3b rho is a **co-movement**
   statistic, not a *lead-lag* one. It cannot adjudicate *which cycle leads* — the very content of
   Dangschat's directional claim. A near-zero co-movement rho is not evidence against precedence; it is
   simply silent on it. The directional verdict belongs to the EWR same-era panel (Section 4), where a
   genuine annual k≥1 predictor/outcome offset exists.
2. **One pair, attenuated predictor.** H3a/H3b k=1 rests on a single 2017→2019 pair (n=435; the
   2015→2017 pair lacks `delta_dynamism_t` until the 2013 MSS lands in B8). At the 2-year cadence a
   single step captures only a *thin slice* of a multi-year cycle — Dangschat's process can be well
   underway in a Kiez without the social and commercial deltas aligning within one biennial window.
3. **Predictor measurement error biases toward null (geo C-4).** The C5 share-normalization removes
   city-wide OSM coverage growth but not non-uniform pre-2015 spatial mapping drift; in the ~40%-
   coverage 2015–2019 era this is regression dilution that attenuates the dynamism signal toward zero.

So `rho=+0.057` (n=435, wrong direction, non-significant) is a domain-plausible *non-result*, not a
refutation of the thesis. The correct framing is: the MSS pre-2021 panel is **underpowered and
direction-blind** for H3a/H3b at this cadence; the invasion-succession precedence is neither confirmed
nor refuted here, and the confirmatory weight rests on the EWR same-era lead-lag. Condition D-3 binds
this so it cannot be read as "the thesis fails."

### Q3 — foreigners ↔ migration_background r≈0.93: real social correlation or indicator-design artefact? **Both — and the housing-sociology reading is that it is a real correlation that nonetheless creates an indicator-redundancy problem the D4 set must address.**

This is genuinely a substantive observation, and the answer is not either/or:

- **It reflects a real feature of Berlin's PLR-level population structure.** In the Berlin EWR frame,
  the foreigner share (`Ausländeranteil`, non-German nationals) and the migration-background share
  (`Migrationshintergrund`, includes naturalized citizens and second generation) are *definitionally
  nested* — every foreign national has a migration background, so the migration measure is a
  superset of the foreigner measure. At PLR granularity these two co-vary strongly by construction,
  and the spatial concentration of migrant populations in specific Berlin Kieze (a well-documented
  segregation pattern; Holm 2010) sharpens it further. r≈0.93 is therefore a *real* social correlation,
  not a coding bug.
- **But for the D4 indicator set it is a redundancy problem.** As the geo-signoff notes (C-3), a
  mean-of-5 composite with two near-collinear members *over-weights that single demographic axis* —
  the migration dimension effectively counts ~twice. From a Döring & Ulbricht (2016) standpoint this is
  a design concern: it lets one precondition axis dominate the vulnerability baseline and muddies the
  distinct contributions of tenure (DAU5/DAU10), age structure, and migration. The fix is not to
  delete a real correlate but to **collapse the redundant pair** (use one of the two, or a single
  combined migration axis) so D4 weights the *conceptually distinct* preconditions evenly.
- **Crucially, this does not affect the B7 headline.** No B7 H2/H3 test consumes `ewr_composite` or
  `legacy_gentrification_score`; EWR enters the lead-lag only as a baseline level (§4.3). So this is a
  pre-existing D4 indicator-set question (it predates B7) to be logged for the indicator-set review,
  not a B7 blocker. I record it as condition D-4.

### Q4 — Excluding uninhabited PLRs in the invasion-succession model. **Correct treatment.**

Excluding `gesamtindex IS NULL` PLRs (~12 per pre-2021 edition) is the domain-correct treatment, and
it is *required* by §7.1 / R-A3 C3, not a discretionary choice. The Dangschat invasion-succession
model is, at root, about the turnover of a *resident social population* (pioneers → gentrifiers
displacing incumbents) coupled to a commercial cycle. An uninhabited planning area — a park
(`Volkspark Prenzlauer Berg`-type cell), a rail yard, an industrial or water polygon — has **no
resident population to invade, succeed, or displace** and **no Status/Dynamik outcome**. It is not a
"stage-0 vulnerable area"; it is *outside the population the model is defined over*. Including it would
inject structural missingness (a forced null outcome) into the lead-lag and dilute the resident-area
signal. Exclusion is theoretically necessary, not merely convenient. The only obligation is
transparency: report the excluded count per edition (§7.1 mandates this; geo C-5; my D-2).

### Q5 — Is "weak directional MSS panel support; confirmatory weight rests on EWR same-era" an acceptable Epic B headline? **Yes — this is the honest framing the directional-revival mandate requires, with two binding guardrails.**

The Epic B framing (CLAUDE.md §Epic B framing: *directional revival, not exact reproduction; document
divergences and move on*) does justify proceeding, and the proposed headline is exactly the honest
posture I want to see — provided it is stated with the right structure:

- **Permissible and accurate:** "The thesis-era MSS pre-2021 panel gives **directional PASS on H2**
  (rho negative as expected, the core 'current amenity stock predicts future status worsening'
  relationship) but **weak/non-confirmatory H3a/H3b/H3c** (mostly wrong-sign or non-significant). The
  confirmatory weight for the lead-lag precedence claim rests on the **EWR same-era panel (Section 4,
  15/15 directional, same source and timeframe as the 2018 thesis)**."
- **Two guardrails this headline must respect (both already in the geo conditions, restated as domain
  requirements):**
  - **D-3:** the MSS H3a/H3b numbers are **co-movement, not lead-lag** (Spearman symmetry); no
    "status leads commerce" / "commerce leads status" sentence may be sourced from them. Any precedence
    statement is sourced from the EWR panel only.
  - **D-5 (sign-honesty):** the weak/wrong-sign MSS results must **not** be presented as thesis
    support, and equally must **not** be presented as a *refutation* of the thesis — they are
    underpowered and direction-blind at this cadence (Q2), with predictor attenuation toward null
    (geo C-4). The one significant pre-2021 cell (H3c k=2, rho=+0.104, p=0.031) is **wrong-signed** and
    must be reported as non-confirmatory, never cited as support.

With those two guardrails the headline is not just acceptable — it is the *correct* scientific framing
for a directional revival, and it honors the G-1/G-2 ethics guardrails I gated at R-A1 (descriptive
tracking, not causal/displacement claims; no over-reading of an aggregate small-area signal).

---

## Conditions (PASS WITH CONDITIONS — all are interpretation/labelling guardrails; none blocks integration into `develop`)

These mirror and extend the geo conditions from the domain side. None requires a model rebuild. They
bind before any B7 result reaches a public/G2 artefact.

- **D-1 [Required, labelling].** Carry the **migration-background ~2017 Mikrozensus break**
  (`seed_ewr_indicator_meta.csv` caveat) into the E1 limitations and G2: pre-2017 migration values are
  not directly comparable to post-2017, so no longitudinal migration-share series may cross the 2017
  break uncaveated. (Domain extension of geo C-3.)

- **D-2 [Required].** Report the **uninhabited-PLR excluded count per pre-2021 edition** (~12/edition)
  in the Epic B headline write-up, per §7.1 and the R-A1 C-3 "447 analysed = 448 source − N excluded"
  reconciliation. (Aligns with geo C-5.)

- **D-3 [Required before any published H3 claim].** MSS H3a/H3b (Sections 2 and 3) are **co-movement,
  not temporal precedence** (Spearman symmetry). Every "leads" statement about the
  social↔commercial cycle must be sourced from the **EWR same-era lead-lag (Section 4)**, never from
  the MSS H3a/H3b rho. The Section-4 EWR panel is the adjudicator of Dangschat's directional claim.
  (Adopts geo C-1.)

- **D-4 [Required, indicator-set review].** Log the **foreigners ↔ migration_background r≈0.93
  redundancy** for the D4 indicator-set review: it is a *real* Berlin social correlation (nested
  definitions + spatial segregation, Holm 2010) but it over-weights the migration axis in the mean-of-5
  composite (Döring–Ulbricht precondition balance). Resolution = collapse the redundant pair, not
  delete a real correlate. Pre-existing (predates B7); not a B7 blocker. (Domain reading of geo C-3.)

- **D-5 [Required, framing].** The Epic B / G2 write-up must present the weak/wrong-sign MSS pre-2021
  results as **neither thesis support nor thesis refutation** — they are underpowered and
  direction-blind at the biennial cadence, with C5 predictor attenuation toward null. The single
  significant pre-2021 cell (H3c k=2, wrong-signed) is non-confirmatory and must never be cited as
  support. The headline framing "weak directional MSS support; confirmatory weight on EWR same-era" is
  approved subject to this. (Adopts geo C-2/C-4 from the framing side.)

---

## Risks (domain)

1. A reader takes the MSS H3a/H3b co-movement rho as a confirmation/refutation of Dangschat's
   social→commercial *precedence*, which a symmetric statistic cannot speak to (mitigated by D-3).
2. The weak pre-2021 MSS panel is read as the thesis *failing*, when it is underpowered and
   direction-blind at the 2-year cadence with predictor attenuation toward null (mitigated by D-5).
3. The migration-background 2017 Mikrozensus break is crossed silently in a longitudinal EWR series
   (mitigated by D-1).
4. The r≈0.93 demographic redundancy over-weights the migration precondition axis in any future D4
   composite, distorting the Döring–Ulbricht precondition balance (mitigated by D-4; pre-existing).
5. `legacy_gentrification_score`'s additive-z formula remains theoretically ungrounded (legacy
   diagnostic only, per ADR-0008/R-A1) and not cross-vintage comparable — no B7 test consumes it, but
   it must stay labelled non-comparable (covered by geo C-3 / D-1).

---

## Certification

From the domain-validity perspective, B7 is **theoretically sound and faithful** to the 2018 thesis,
to Dangschat's (1988) double invasion-succession cycle, to Döring & Ulbricht (2016), and to the Berlin
MSS/EWR frame (Holm 2010; ADR-0006/0007). MSS 2015/2017 are method-continuous official Senate editions
correctly used as thesis-era comparators with the boundary break respected by *isolation* (no
forbidden cross-reform areal averaging, §6.3). The biennial 2-year lag is the native MSS cadence the
thesis itself used (p. 97). The uninhabited-PLR exclusion is the theoretically required treatment in an
invasion-succession model of a *resident* population (§7.1 / R-A3 C3). The weak, mostly wrong-sign MSS
pre-2021 results are honestly framed as non-confirmatory, the Spearman-symmetry limitation is
correctly disclosed, and the confirmatory weight for the lead-lag precedence claim correctly rests on
the EWR same-era panel (Section 4, 15/15). All five conditions are documentation/labelling guardrails;
none blocks integration.

With the geo-DS `PASS WITH CONDITIONS` already on record, the **R-C1 dual gate is satisfied**: the PM
**MAY integrate PR #121 into `develop`**, subject to geo C-1 … C-5 and domain D-1 … D-5 being
reflected in the E1 findings / G2 write-up before any B7 result is published.

```json
{
  "verdict": "concerns",
  "domain_rationale": "B7 faithfully mirrors the thesis-era (lor_pre2021) lead-lag panel using method-continuous official MSS 2015/2017 editions; the 2021 boundary reform changed PLR geometry, not the social-monitoring method, and the discontinuity is respected by isolation rather than forbidden cross-reform areal averaging (index-definition.md §6.3). The biennial 2-year inter-edition lag is the native MSS cadence the 2018 thesis itself used (p.97). Excluding uninhabited PLRs (gesamtindex IS NULL, ~12/edition) is the theoretically required treatment in a Dangschat invasion-succession model defined over a resident social population (§7.1/R-A3 C3). The weak, mostly wrong-sign MSS pre-2021 H3a/H3b/H3c results are domain-plausible non-results — Spearman symmetry makes them co-movement not lead-lag, the panel is single-pair/underpowered until B8 ingests 2013 MSS, and C5 predictor attenuation biases toward null — so they neither confirm nor refute the thesis; confirmatory weight for the social->commercial precedence claim correctly rests on the EWR same-era panel (Section 4, 15/15). The foreigners<->migration_background r~0.93 is a real Berlin social correlation (nested definitions + spatial segregation, Holm 2010) that nonetheless over-weights the migration precondition axis in a mean-of-5 composite (Doring-Ulbricht); it is a pre-existing D4 indicator-set question, not a B7 blocker, and no B7 H2/H3 test consumes it. PASS WITH CONDITIONS: all five conditions are documentation/labelling guardrails; none blocks integration into develop. R-C1 dual gate satisfied alongside the geo-DS PASS WITH CONDITIONS.",
  "theory_risks": [
    "MSS H3a/H3b read as Dangschat social->commercial precedence despite Spearman symmetry making them co-movement only (D-3)",
    "Weak/wrong-sign pre-2021 MSS panel misread as thesis refutation when it is underpowered, direction-blind at 2-year cadence, and attenuated toward null by C5 predictor noise (D-5)",
    "migration_background ~2017 Mikrozensus redefinition crossed silently in a longitudinal EWR series (D-1)",
    "foreigners<->migration r~0.93 over-weights the migration precondition axis in any future D4 mean-of-5 composite, distorting Doring-Ulbricht precondition balance (D-4; pre-existing)",
    "legacy_gentrification_score additive-z formula remains theoretically ungrounded and not cross-vintage comparable (legacy diagnostic only; no B7 test consumes it)"
  ],
  "recommendations": [
    "D-1: carry the migration-background ~2017 Mikrozensus break into E1 limitations and G2; no longitudinal migration series crosses 2017 uncaveated",
    "D-2: report uninhabited-PLR excluded count per pre-2021 edition (~12) per the 448-minus-N reconciliation",
    "D-3: report MSS H3a/H3b as co-movement; source any social<->commercial precedence claim from the EWR same-era panel (Section 4) only",
    "D-4: log the foreigners<->migration r~0.93 redundancy for the D4 indicator-set review (collapse the redundant pair, do not delete a real correlate)",
    "D-5: frame the weak/wrong-sign MSS pre-2021 results as neither thesis support nor refutation; never cite the wrong-signed H3c k=2 cell as support; headline 'weak directional MSS support, confirmatory weight on EWR same-era' approved subject to this"
  ]
}
```

---

## Final Verdict

Verdict: PASS WITH CONDITIONS
