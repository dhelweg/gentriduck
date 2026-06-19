# Domain-Expert Sign-off: ADR-0008 Multi-dimensional Gentrification Model

- **Scope:** R-A7 #77 — conceptual architecture
- **Reviewer:** gentrification-domain-expert
- **Date:** 2026-06-19
- **Verdict:** PASS WITH CONDITIONS

## Assessment

I reviewed `docs/adr/0008-multi-dimensional-gentrification-model.md` in full, against
`docs/methodology/indicator-semantics.md` (R-A5, §8–§9), `docs/methodology/R-A3-geo-signoff.md`
(MSS outcome conditions), `docs/assessment/2018-thesis-critical-assessment.md`, and the R-A7 ticket.
My remit is *theory fidelity* and *indicator meaning*, not statistical method (the geo-DS gate) nor
implementation.

### Four-dimension structure (D1–D4) — theoretically sound

The predictor/outcome split is the single most important correction this ADR makes, and it is
correct. The 2018 thesis used commercial/amenity dynamics as **predictors** of an official
**social** outcome (Berlin's MSS Status/Dynamik, built on welfare-recipient, unemployment and
child-poverty shares). The live index instead *rebuilt* "Status" and "Dynamism" out of POIs — a
name-collision that silently re-labels a predictor as the outcome (review §2.3 #1). ADR-0008's
Decision 1, which mandates that D1/D2 (MSS outcome) and D3/D4 (POI + EWR predictors) be
**separately computed and separately exposed** and only fused at the composite/typology layer, is
faithful to the thesis construct and to standard composite-indicator practice (OECD/JRC 2008).

- **D1 (Social status, outcome) on the 4-class MSS Status-Index** is the correct anchor. It is the
  Senate's official small-area social classification and the like-for-like reading of the thesis's
  gentrification proxy (Holm 2010; MSS/EWR documentation). Grounding on the published *class*
  rather than re-deriving from raw indicators inherits the Senate's intended cross-edition
  comparability — the right call (R-A3 geo-signoff §c, R4).
- **D2 (Social change, outcome direction) on MSS Dynamik** correctly operationalizes "Dynamik =
  change in benefit-recipient share vs. the city average" (thesis p. 97). The ADR's note that D1⊥D2
  is the Senate's 4×3 matrix working as designed (not a contradiction) is theoretically accurate
  and forestalls a common misreading.
- **D3 (Commercial/amenity, predictor)** is retained *in role* as a feature — never relabelled as a
  "Status"/"Dynamism" outcome. This is the heart of the fix and it is done correctly.
- **D4 (Socio-demographic vulnerability, predictor)** is correctly scoped as *demographic
  composition*, explicitly **not** a socio-economic-status (income/unemployment/transfer) measure,
  with the SES gap flagged for R-A4. The ADR cites the R-A5 audit (all five inputs
  vulnerability-positive after PR #89), which I independently confirm from
  `indicator-semantics.md` §9 (Verdict PASS).

### Lead-lag mandate — correctly operationalizes the thesis finding

The thesis headline (p. 91) is a **temporal order**: social-status change *leads* amenity/POI change
(H3b confirmed; H3a — POI leads status — rejected). This is the empirical signature of Dangschat's
double invasion-succession cycle: the social "invasion" of an incoming pioneer/gentrifier population
*precedes* the visible commercial succession (cafés, boutiques, churn). ADR-0008 §2 makes this a
first-class, *exposed* feature: predictor-at-T vs. outcome-at-T+1…T+k **and** the reverse direction,
with status→amenity expected to dominate, and the relationship surfaced in a mart rather than buried
in an intermediate. The explicit prohibition on a contemporaneous-only blend ("a model that reports
only a contemporaneous score does not satisfy this ADR") is exactly right — a contemporaneous
equal-weighted mean is structurally incapable of expressing the thesis result. The directional
framing matches the critical-assessment doc (§W3) and the geo-signoff. No causal-direction error.

### Invasion-succession typology framing — appropriate for Berlin

Decision 3 (Option C, derived typology) extends Berlin's official MSS Status×Dynamik matrix to the
predictor and future displacement dimensions, classifying each (area, period) into a named stage.
This is the natural Berlin-grounded operationalization of Dangschat's (1988) process model and is
consistent with how Döring & Ulbricht (2016) read hotspots as *stages* of a displacement process
rather than binary states. Deriving the typology *from the separated sub-scores* (not from a
pre-collapsed composite) preserves the predictor/outcome distinction into the public product. The
ADR correctly defers cut-points, cluster method and stage names to R-A1/R-A8 — these are
methodology-note decisions, not architecture.

One framing caution (Condition 1 below): the candidate stage name *"post-displacement"* asserts that
displacement *occurred*, which open data cannot observe directly (the D5 problem). It is an
inference, not a measurement.

### Non-advocacy / transparency stance (Decision 5) — appropriate and necessary

Decision 5 is well-judged and matches the ethical posture this domain requires (Lees/Slater/Wyly on
the politics of gentrification measurement; Holm on Berlin displacement). Hedged evidential language,
published uncertainty (ordinal MSS outcome, ~40% OSM POI completeness, levels-vs-changes EWR
divergence, LOR vintage break, sensitivity spread), and the explicit "displacement is a *proxy* for
involuntary moves, not a speculation signal" framing are all correct. This is the right input to G2.

### D4 endogeneity / circularity — real, partly acknowledged, needs a hard guardrail

This is my principal theory concern. D4's demographic indicators are **not** clean exogenous
"pre-gentrification" markers; several are themselves part of the gentrification process the model
predicts. Concretely:

- A *rising* young-adult (18–35) share and a *falling* foreigners / migration-background /
  long-tenure share are, in the thesis and in Döring–Ulbricht, the **signature of gentrification in
  progress** — i.e. they are early outcome signals, not independent vulnerability causes
  (`indicator-semantics.md` §2, §4). Using their *levels* as a vulnerability predictor and then
  testing them against an MSS *status* outcome risks regressing a partial proxy of the outcome on
  the outcome.
- The R-A5 audit's own §8 condition 3 (levels-vs-changes divergence) is the crux: the thesis used
  YoY *changes*; D4 uses *levels*. A level composite reads "how pre-gentrification is this PLR
  *now*"; a change composite reads "is it gentrifying *this year*." Only the former is a defensible
  *predictor*; the latter would be near-tautological with the outcome and must not be fed into the
  lead-lag predictor block.

ADR-0008 §1 (D4 binding) does acknowledge this ("several demographic variables are themselves
correlated with gentrification") and points to the R-A5 caveats — good. But the ADR leaves it as a
"document the caveat" instruction. Given the index *is* the product, this needs to be a binding
constraint on R-A1, not just a footnote (Condition 2).

### Deferred D5 (displacement) and Milieuschutz as proxy — handled correctly

Reserving D5 as a nullable/absent slot so it can be added in Epic D without a model redefinition or
ADR-0004 contract break is the right architectural move and respects ADR-0005. On the domain
substance: **Milieuschutz (Soziale Erhaltungsgebiete) is an acceptable proxy but a *biased* one and
must never be read as a displacement *measure*.** Designation marks where the Senate has *already
identified* upgrading/displacement pressure and intervened — so it is simultaneously (a) a signal of
pressure and (b) an intervention that *suppresses* the very displacement it flags. It under-covers
early-stage areas not yet designated and over-marks contested-but-protected ones. Combined with
rent-burden and turnover (as the ticket scopes), it is a reasonable *composite pressure* proxy, but
the ADR's existing "D5 is a proxy for involuntary moves, which open data does not directly observe"
(Decision 5) must carry into Epic D's own ADR. No blocking issue at the architecture level; flagged
as advisory Note A for R-B1.

### Theory-level concerns not yet addressed

1. Rent-gap (Smith) has no representation until D5/Epic D lands. The current four dimensions capture
   the *social* and *commercial* faces of gentrification but not the *capital/rent* face that
   drives it in rent-gap theory. This is acceptable for R-A1 (D5 deferred) but the methodology page
   should not claim the model captures the *driver*, only the social outcome and amenity/demographic
   correlates. (Note B.)
2. The typology risks ecological-inference framing: a PLR stage is a small-area aggregate, not a
   statement about individuals. The non-advocacy text should explicitly disclaim individual-level
   reading. (Folded into Condition 1.)

Overall the conceptual architecture is theoretically sound, faithful to the 2018 thesis and to the
Berlin gentrification literature, and corrects the three structural defects the PM+architect review
identified. The conditions below are guardrails for R-A1's methodology note, not architecture
defects — hence PASS WITH CONDITIONS rather than FAIL.

## Conditions / Notes

**Conditions (must be satisfied in R-A1's `docs/methodology/index-definition.md` before R-A1
coding starts; verified at the R-A1 gate):**

1. **Typology stage names must not assert unobserved events.** Any stage implying displacement
   *occurred* (e.g. "post-displacement") must be renamed to a signal/risk framing (e.g.
   "high-displacement-signal") or explicitly documented as an inference, and the typology must carry
   a small-area / no-individual-inference disclaimer. This operationalizes Decision 5 in the public
   product.

2. **D4 must enter the predictor block in a form that is not a proxy of the outcome.** R-A1 must
   either (a) use D4 *levels* strictly as a cross-sectional baseline-vulnerability covariate and keep
   the youthification/turnover *change* signals on the predictor/early-warning side (not silently
   inside the same vulnerability composite that is tested against MSS status), or (b) justify in
   writing, against the sensitivity analysis, that the chosen D4 specification does not induce
   outcome-leakage. The R-A5 levels-vs-changes divergence must be resolved here, not merely noted.

3. **Lead-lag must preserve outcome→predictor as the headline and avoid contemporaneous leakage in
   D4.** When D4 demographic *change* features are included, they must be lagged consistently with
   D3 so the model cannot smuggle a contemporaneous demographic-outcome correlation in as a
   "prediction." The status→amenity dominance (H3b) must be reported as the primary result with
   H3a/H3c as the contrast.

4. **Carry the R-A3 MSS conditions (C1–C4) and R-A5 condition 3 into the R-A1 note explicitly** —
   ordinal treatment of MSS classes, uninhabited-PLR exclusion, no cross-2019/2021 deltas without the
   crosswalk, and the levels-vs-changes / migration-≥2017 documentation. These are referenced by
   ADR-0008 but must be enumerated in the index definition that the gate signs.

**Advisory notes (for the methodology note / G2, non-blocking):**

- **Note A (D5 / Milieuschutz):** Epic D's D5 ADR must state that Milieuschutz is a *biased pressure
  proxy* — it both signals and suppresses displacement and under-covers undesignated early-stage
  areas — and must never be presented as a displacement *count* or *rate*.
- **Note B (rent-gap):** Until D5 lands, the G2 methodology page must not claim the model captures the
  *economic driver* of gentrification (Smith's rent gap); it captures the social outcome (MSS) and
  amenity/demographic correlates. State this scope limit explicitly.
- **Note C (cross-city outcome slot):** The "generic social-status outcome" slot (Decision 1) is
  theoretically clean, but cities lacking an MSS-equivalent will fall back to an SES composite or
  predictor-only — meaning the *outcome construct differs by city*. The G2 page must label which
  cities have an official-monitor outcome vs. a reconstructed one, so cross-city stages are not read
  as identically defined.

## Final Verdict

Verdict: PASS WITH CONDITIONS

The four-dimension predictor/outcome architecture, the mandatory lead-lag structure, the
invasion-succession typology, the sensitivity-analysis requirement, and the non-advocacy stance are
all theoretically grounded and faithful to the 2018 thesis (H3b confirmed / H3a rejected, p. 91),
Dangschat's (1988) double invasion-succession cycle, Döring–Ulbricht (2016), and the Berlin MSS/EWR
framework. The conditions above are guardrails on D4 endogeneity, displacement-event framing, and the
inheritance of prior sign-off conditions that R-A1's methodology note must discharge at the gate —
they do not require any change to the conceptual architecture itself. ADR-0008 may proceed to
Accepted on the basis of this domain sign-off plus the geo-DS sign-off.
