# Gentrification Domain Expert Sign-off: A9 Spatial-Dynamic Gentrification (#79)

**Reviewer:** gentrification-domain-expert
**Artifact:** analysis/a9_spatial_dynamic.py + docs/methodology/spatial-methods.md (A9 section)
**Issue:** #79 [A9] Spatial-dynamic gentrification (diffusion) + spatial-econometric inference
**Date:** 2026-06-30

---

## Verdict

Verdict: PASS

---

## Scope of review

Assessed from the gentrification-theory and housing-policy perspective:

1. Whether the Dangschat (1988) invasion-succession / diffusion hypothesis is correctly
   operationalized in the diffusion feature (A9.4)
2. Whether the LISA quadrant labels carry appropriate domain meaning and public-safety constraints
3. Whether the spatial-regression specification is consistent with the gentrification-theory
   reading of the index and its predictors
4. Whether the public-labelling guardrails from `spatial-methods-domain-signoff.md` conditions
   1 and 3 are discharged at the A9 output level

---

## Findings

### 1. PASS — Dangschat (1988) invasion-succession contagion is correctly operationalized

The diffusion feature `W * status_index[t-1]` (spatial lag of prior-edition D1 status) as a
predictor of current-edition status is the canonical empirical operationalization of invasion-
succession contagion: if gentrification diffuses from pioneering Kieze, a deprived neighbour
at t−1 (on the displacement-pressure frontier) should raise the focal PLR's deprivation at t.

The polarity note is explicitly carried in both the script and the methodology doc: status_index
is inverse-numeric (higher = more deprived), so **positive** `beta_W_status_prev` supports the
diffusion hypothesis. This is exactly correct given the D1 MSS ordinal coding
(index-definition.md §5). The summary printout in `main()` applies this polarity test and labels
the result `SUPPORTED` / `NOT SUPPORTED` accordingly.

The two edition pairs tested (2021→2023, 2023→2025) are the correct consecutive lor_2021 pairs
available in the current data model. The diffusion hypothesis is a longitudinal claim; testing
it on contemporaneous cross-sections would conflate spatial autocorrelation (Tobler) with
directional contagion. Using lagged status (t−1 → t) is the correct temporal design.

### 2. PASS — LISA quadrant labels carry sound domain interpretation with G-2 guardrail

The methodology doc (§A9.2) provides domain-grounded interpretation of the four quadrant types
in the context of D1 status (inverse-numeric, higher = more deprived):

- HH: deprived PLR surrounded by deprived neighbours → spatial concentration of disadvantage /
  persistent-deprivation Kiez (Mieterschutzgebiet candidates, Milieuschutz pressure zones)
- LL: affluent PLR surrounded by affluent neighbours → stable-established / coldspot cluster
- HL: deprived PLR in affluent surroundings → possible pioneer frontier under pressure
  (the "gentrification frontier" in Dangschat's model: isolated deprivation pockets within
  an encroaching affluent area)
- LH: affluent PLR in deprived surroundings → possible pocket of early gentrification

The HL interpretation as a "pioneer frontier" is the most domain-sensitive: it maps to early-
stage invasion-succession (Dangschat 1988 §2), but is **not** an individual-level or building-
level displacement claim. The methodology doc's G-2 ecological-inference disclaimer
("cluster labels are PLR-level aggregates, not individual displacement statements") and the
public-labelling convention ("spatial concentration of social disadvantage" not "gentrification
hotspot") correctly inherit the condition from `spatial-methods-domain-signoff.md` condition 3
and discharge it at the A9 output level.

### 3. PASS — Spatial regression specification is domain-consistent

The regression `status_index ~ total_poi_count + dynamism_score` is a reasonable reduced-form
proxy for the H1 hypothesis (POI density / commercial-amenity change predicts D1 status
transition). The use of `dynamism_score` (C5-corrected share-change z-score) in place of
`ewr_composite` (currently NULL for lor_2021) is a legitimate adaptation; the script documents
the reason inline. The goal of the spatial regression in A9 is to assess *whether naive OLS
significance holds up after spatial autocorrelation is controlled for* — the precise finding
is whether the H1 relationship survives spatial-robust inference, not to build a definitive
causal model. This framing is appropriate.

The script explicitly licences the OLS-on-ordinal approach as "directional comparison only"
(same as `e1_regressions.py` Spearman rank-correlation tests; index-definition.md §3.2). This
is the correct epistemic posture: betas are interpreted directionally, not as precise effect
estimates from a formal metric regression.

### 4. PASS — Public-labelling guardrails from spatial-methods-domain-signoff.md condition 3
   are discharged at A9 level

Condition 3 from `spatial-methods-domain-signoff.md` (blocking before any public Gi* render)
specified that public-facing Gi* labels must use hedged qualifiers and carry the G-1/G-2
disclaimer. The A9 LISA output is a distinct statistic (Local Moran's I, not Gi*), but the
same ethics principle applies. The methodology doc (§A9.2) explicitly binds public-facing
LISA labels to hedged qualifiers and the G-2 ecological-inference disclaimer. This is correct
and consistent with the domain-expert condition already imposed on Gi* labels.

---

## Conditions

None. The Dangschat diffusion operationalization is theory-faithful, the LISA labels carry
appropriate domain interpretation and public-safety constraints, and the regression framing
is epistemically honest. All domain-relevant conditions from prior sign-offs are discharged
or explicitly inherited.

---

## Carry-forward notes (non-binding; for G2 / future work)

1. **HL interpretation nuance for public communication:** The HL quadrant (deprived PLR in
   affluent surroundings) is theoretically the most legible "gentrification frontier" signal
   in the Dangschat model, but it is also the one most prone to misinterpretation as a
   "target zone" by actors seeking to accelerate displacement. When these are surfaced on G2,
   the methodology page should add a sentence noting that HL status is a *social pressure signal*
   based on aggregate PLR statistics, not a real-estate investment recommendation, and does not
   identify individual residents at risk (G-1 / G-2 combined guardrail).

2. **Diffusion hypothesis and policy interpretation:** A positive and significant
   `beta_W_status_prev` would support the Dangschat diffusion hypothesis and would be a notable
   finding — but it would not, on its own, identify a causal mechanism (demand spillover vs.
   landlord/developer expectation vs. incumbent out-migration). The G2 methodology page should
   flag this interpretive limit clearly when presenting diffusion results.

3. **D5 (Milieuschutz/displacement) as the missing moderator:** Both the LISA clusters and the
   diffusion feature measure *social-change pressure / status transition* — they do not observe
   actual displacement. The Epic D5 dimension (rent-burden, turnover, Milieuschutz) is the
   natural complement that would distinguish PLRs where status improvement coincides with
   displacement from those where it reflects incumbent-led improvement. This remains the
   unfinished item from Epic D, not a gap in A9 itself.
