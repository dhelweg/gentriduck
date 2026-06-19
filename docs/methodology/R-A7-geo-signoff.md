# Geo-Data-Scientist Sign-off: ADR-0008 Multi-dimensional Gentrification Model

- **Scope:** R-A7 #77 — conceptual architecture
- **Reviewer:** geo-data-scientist
- **Date:** 2026-06-19
- **Verdict:** PASS WITH CONDITIONS

## Assessment

ADR-0008 is a conceptually sound architecture. It correctly diagnoses the three structural defects of
the status-quo single-z-score blend (predictor/outcome conflation, lost lead-lag, asserted weights)
and chooses a hybrid (separated sub-scores → derived typology + retained backwards-compatible
composite) that fixes all three without forking the ADR-0004 governed definition. My review is of the
*meaning* of the structure, not the implementation (which is R-A1's index-definition note).

**1. Four-dimension structure (D1=MSS Status, D2=MSS Dynamik, D3=POI, D4=EWR) — sound.**
The decisive correction is restoring the predictor↔outcome separation the thesis actually used: the
official MSS social classification is the *outcome* (ground truth), POIs and EWR composition are
*predictors/features*. This directly undoes the §2.3 #1 conflation where "Status"/"Dynamism" had been
rebuilt out of POIs and merely shared the names. Binding D1 to the 4-class MSS Status-Index as the
primary outcome (with the 12-group Gesamtindex and Dynamik as secondary signals) is consistent with
R-A3 geo-signoff R4 and is the citable, governed choice. D4 reuses `ewr_composite` exactly as audited
in R-A5 §9 — all five inputs vulnerability-positive after PR #89 — and the ADR correctly carries the
R-A5 caveats forward (levels-vs-changes divergence; demographic composition is not SES; several
demographic variables are themselves correlated with gentrification). The D5 reserved-slot framing is
the right way to avoid a future redefinition. Nothing here over-claims beyond what the inputs support.

**2. D1↔D2 orthogonality — correctly characterized.** The ADR's statement that D1 (Status) and D2
(Dynamik) are orthogonal axes by construction (the Senate's 4×3 = 12-cell typology) and that a weak
D1↔D2 correlation is the model working as intended, not a contradiction, is statistically correct:
level and direction-of-change are conceptually independent dimensions. This pre-empts a common
misreading and is worth keeping verbatim in the methodology note.

**3. Lead-lag mandate (Decision 2) — well-grounded and the single most important fix.** The thesis's
headline confirmed finding (p. 91: H3b confirmed = social-status change leads amenity/POI change; H3a
rejected) is a *temporal-order* claim that a contemporaneous equal-weighted mean structurally cannot
express. Mandating that the model test predictor↔outcome at offsets `T → T+1…T+k` (k=1…3) in *both*
directions to reproduce the H3a/H3b/H3c contrast, and expose the result in a mart rather than burying
it in an intermediate, is exactly right. Two methodological guardrails I want carried into R-A1
(condition 1 below): the offset test must use *changes* (deltas) on both sides — comparing predictor
level at T to outcome level at T+k will recover spatial cross-section, not temporal precedence — and
the inference must be spatial-autocorrelation-robust (the ADR already routes this to R-A9 #79 / open
question #4, which is the correct home). The directional dominance of status→amenity is a *test
outcome to report*, not an assumption to hard-code; the ADR's "should dominate" phrasing is acceptable
because the reverse direction is also fit.

**4. LOR vintage-break handling — correct and sufficient at the conceptual level.** Decision 2's
third bullet forbids lead-lag deltas crossing the 2019→2021 LOR boundary without the crosswalk and
anchors Epic B's directional revival on the pre-2021 447-PLR editions. This is the faithful import of
R-A3 geo-signoff C4 and is the correct way to avoid comparing non-coterminous units (447→542 PLR
redistricting). It is sufficient for a *conceptual* ADR; the crosswalk mechanics and the exact
within-vintage windows are correctly left to R-A1. I add one note (condition 2): the same vintage
discipline must apply to D3 (POI) deltas and to the derived typology's change-over-time view, not only
to the D1/D2 outcome — the POI base was itself remapped to the 2021 PLR scheme (commit a6176c4), so
R-A1 must state explicitly which side of the break each delta lives on.

**5. Ordinal treatment of MSS Status-Index (D1) — appropriate.** The ADR mandates ordinal-appropriate
methods and explicitly forbids averaging the class codes as if metric (R-A3 C2), and excludes
uninhabited (null-index) PLRs from any fit (R-A3 C3). This is correct: Status (1–4) and Dynamik (1–3)
are ordered classes with non-interval, quantile/expert cut-points. Ordered logit or a binary AUC
framing ("high-status-loss vs not") against the 2018 baseline, computed *within a single LOR vintage*,
is the right toolkit and is consistent with the review's AUC / F-weighted metric expectation. Open
question #5 (confirm the {1,3,5} Dynamik ordering, R-A3 C1) is correctly retained as an R-A1
consumption guardrail — I reiterate it as condition 3 because a reversed Dynamik code would silently
invert the entire lead-lag sign.

**6. Sensitivity analysis (Decision 4) — covers what is needed.** The mandated coverage (per-dimension
weight variation with the implicit 1/3 removed; drop-a-dimension including outcome-only vs
predictor-inclusive; sensitivity to the lead-lag offset k and to typology cut-points/groupings; equal
vs derived weights justified against the analysis, citing OECD/JRC 2008) is the correct minimum set
and closes the §2.3 #5 asserted-weights defect. I would add two items for completeness (condition 4,
advisory-to-required): (a) report typology-assignment *stability* — how many `(area, period)` cells
change stage under reasonable weight/cut-point perturbations, since an unstable typology is the
public-facing risk; and (b) since the composite combines *outcome* dimensions and keeps predictors as
early-warning, the sensitivity analysis must show that combining choice does not silently reintroduce
predictor↔outcome mixing (a guard that the Decision 3.3 separation actually holds numerically).

**7. Spatial-methodology concerns.** The ADR is light on three spatial points that are acceptable to
defer to R-A1/R-A9 but must not be forgotten (condition 5, advisory): (i) **spatial autocorrelation** —
PLR observations are not independent; any regression/lead-lag inference needs spatial-robust standard
errors or an explicit spatial lag/error term (already flagged to R-A9 #79). (ii) **MAUP** — the PLR is
the fixed analysis unit, which constrains generalization; the typology and lead-lag results are
PLR-scale findings and should be labelled as such, not presented as scale-invariant. (iii) **OSM
completeness bias (D3)** — the ADR keeps the C5 correction "in force" and lists the ~40% fill caveat
under the transparency stance, which is the right call; R-A1 must confirm the C5 correction is applied
*before* D3 enters the lead-lag, because uncorrected coverage growth would masquerade as amenity
dynamism and bias the H3b test toward false confirmation. This is the most dangerous unaddressed
interaction and is why I make it explicit.

The non-advocacy/transparency stance (Decision 5) and the city-agnostic parameterized-outcome-slot
constraint (rejecting mandatory MSS input, upholding ADR-0005) are methodologically and ethically
appropriate and need no conditions.

## Conditions / Notes

The architecture is sound; none of these block the ADR being set to Accepted. They are guardrails that
must be tracked into and satisfied by R-A1's `docs/methodology/index-definition.md` before R-A1 coding
starts (per the R-C1 gate).

1. **[Required in R-A1] Lead-lag must operate on changes, both sides, with spatial-robust inference.**
   The offset test must compare predictor *deltas* at T to outcome *deltas* at T+k (and the reverse),
   not levels-to-levels, or it recovers cross-section rather than temporal precedence. Inference must
   be spatial-autocorrelation-robust (route via R-A9 #79). The status→amenity dominance is a reported
   test outcome, not a hard-coded assumption.

2. **[Required in R-A1] Apply the vintage-break discipline to every delta, not just D1/D2.** D3 (POI,
   remapped to 2021 PLR per commit a6176c4) and the typology's change-over-time view must also respect
   the 2019→2021 boundary / crosswalk. R-A1 must state which side of the break each delta lives on.

3. **[Required in R-A1, = R-A3 C1 / open question #5] Confirm the MSS {1,3,5} Dynamik ordering** against
   the published class distribution before consuming it. A reversed/permuted code silently inverts the
   lead-lag sign — high downside, cheap to verify.

4. **[Required in R-A1, extends Decision 4] Add typology-assignment stability and an anti-conflation
   check to the sensitivity analysis.** Report how many `(area, period)` cells change stage under
   weight/cut-point perturbation, and demonstrate numerically that the composite/typology does not
   re-mix predictor and outcome dimensions.

5. **[Advisory, confirm in R-A1/R-A9] Spatial guardrails.** (a) Confirm the C5 OSM completeness
   correction is applied to D3 *before* D3 enters the lead-lag — uncorrected coverage growth would bias
   the H3b test toward false confirmation. (b) Label typology and lead-lag findings as PLR-scale (MAUP);
   do not present as scale-invariant. (c) Use ordinal-appropriate methods for D1/D2 and compute baseline
   metrics (AUC / F-weighted) within a single LOR vintage (R-A3 C2).

6. **[Note, inherited non-blocking] G2 methodology page** must document the EWR levels-vs-changes
   divergence and the `migration_background_share` ≥2017 restriction (R-A5 §9 condition 3), and the
   indicator-definition drift in MSS (3→4 index indicators from 2023; R-A3 R1).

## Final Verdict

Verdict: PASS WITH CONDITIONS
