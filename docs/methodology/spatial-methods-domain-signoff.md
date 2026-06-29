# Domain-Expert Sign-off: Spatial Methods (#69)

**Reviewer:** gentrification-domain-expert
**Artifact:** docs/methodology/spatial-methods.md
**Date:** 2026-06-29

## Verdict
Verdict: PASS WITH CONDITIONS

## Summary
The spatial methodology is theory-faithful where it matters most: it operationalizes the thesis's
own distance-weighted variant (the one behind the best H1 model, AUC 0.87, p. 91), and §5's
"C5-share-normalization first, distance-weighting second" rule correctly prevents OSM coverage growth
from being spatially smeared into a false commercial-succession signal — the single most dangerous
domain failure mode. The geo-DS has already discharged the statistical soundness. My two conditions
are both **public-communication / labelling** matters, not method defects: the Gi* output must not be
publicly labelled a bare "gentrification hotspot" (it conflates an amenity/social-change *pressure
signal* with the displacement-*event* framing the G-2 guardrail prohibits), and the 500 m bandwidth
rationale should add one sentence grounding it in gentrification spillover scale, not only in the
generic walkable-catchment literature. Neither blocks DE implementation of the *math*; both bind
before any Gi* output is rendered publicly (G2).

## Findings

1. **PASS — Distance-weighting is theory-faithful to the thesis's leading model.** §1 revives the
   exact construct (`sum(anz * dist_weighted)`, Abb. 5-14) that produced the thesis's best H1 result.
   Replacing un-normalized centroid spread with a mass-conserving Gaussian (§2) is a genuine
   improvement, not a reinterpretation, and the inverse-distance reproduction variant is correctly
   retained for the Epic B directional comparison. No theory drift.

2. **PASS (load-bearing) — §5 C5-before-weighting closes the coverage-bias / false-H3b interaction.**
   This is the domain-critical rule. Distance-weighting raw OSM counts would spatially smear the ~40%
   completeness-growth artefact and bias the lead-lag toward false confirmation of commercial
   succession (`index-definition.md` §2.4). Anchoring the kernel on the C5-corrected
   `dynamism_score` (z-score of `share_yoy_change`, not raw counts) is exactly right and consistent
   with the index definition. This is the finding I would have blocked on had it been absent.

3. **CONDITION (blocking before public render) — Gi* must not be publicly labelled a bare
   "gentrification hotspot" (§6).** §6 motivates Gi* via Döring & Ulbricht's (2016)
   "Gentrification-Hotspots" framing, which is the correct *literature* citation. But what the
   statistic actually detects here is spatial clustering of a **C5-corrected amenity / dimension
   sub-score** — i.e. a *commercial-amenity / social-change pressure* signal, not an observed
   displacement event. Labelling that a "gentrification hotspot" in public output (G2, tooltips, map
   legends, the mart column) collides with `index-definition.md` §1.2 **G-1** (no assertion of an
   unobserved displacement event) and **G-2** (a PLR is a small-area aggregate, not an individual- or
   building-level statement; inferring otherwise is an ecological fallacy). It also risks the precise
   misuse the ethics mandate warns against: a map of "gentrification hotspots" is readable as a
   *target list* by actors who would accelerate displacement. The internal/analysis term may stay
   "Gi* hotspot" (it is the statistic's name); the **public** label must carry a hedging qualifier —
   e.g. "amenity-change hotspot" or "social-change-pressure cluster" — and inherit the G-2 ecological
   -inference disclaimer. This mirrors the discipline already imposed on stage names in
   `index-definition.md` §1.3 (`consolidation-pressure`, not `post-displacement`).

4. **CONDITION (non-blocking, doc) — ground the 500 m bandwidth in spillover scale, not only
   walkable-catchment (§4).** 500 m is defensible as a Dangschat invasion-succession diffusion scale:
   pioneer/commercial succession spills across Kiez boundaries at roughly the pedestrian-Kiez radius,
   and 500 m sits sensibly between a single block and a whole Bezirksregion, sub-PLR for Berlin's
   inner-city grain. The geo-DS's walkable-catchment rationale and the gentrification-spillover
   rationale happen to converge on the same number, which is reassuring. The thesis fixed no numeric
   bandwidth, so there is no reproduction target to honour; the **±50% sweep (250 m / 750 m)
   adequately brackets the plausible spillover scale** — 250 m is roughly intra-Kiez, 750 m reaches
   adjacent Kieze, which is the range invasion-succession theory would expect the kernel to operate
   over. I would not widen the sweep. Condition is only that §4 add one sentence naming the
   gentrification-spillover/Kiez-diffusion rationale alongside the walkable-catchment one (R-C2
   grounding: Dangschat 1988/2000; Döring & Ulbricht 2016), so the default is justified on *process*
   scale and not solely on generic urban-analytics convention.

5. **PASS (non-blocking note) — MAUP §7 and the G2 honesty gate are theory-appropriate.** Reporting
   PLR-vs-BZR ranking correlation with an r > 0.7 publish gate, and surfacing instability prominently
   on G2 rather than hiding it, is the correct ethical posture for a small-area index whose primary
   public risk is over-reading PLR-level precision (`index-definition.md` §0.3, §1.2 G-2). The geo-DS
   sign-off already routes a sub-0.7 result to escalation; from a domain view, a MAUP-fragile index
   that is nonetheless rendered as PLR-stable would be an ethics failure, so I endorse treating that
   threshold as a hard publish gate, not advisory.

6. **PASS (non-blocking note) — keep the "improving / hotspot is not unambiguously positive" caveat
   attached downstream.** Where Gi* clusters of *improving* status or rising amenity feed the G2 page
   or the trajectory mart, they must inherit the `index-definition.md` §3.5 caveat: an improving /
   high-amenity-pressure cluster may reflect completed gentrification *with* displacement, incumbent-
   led improvement, or early pioneer succession — the model cannot distinguish these without D5
   (Milieuschutz + rent-burden + turnover, Epic D). A Gi* hotspot is not, on its own, a "good news"
   or "bad news" label. No change to spatial-methods.md is required for this; it is a carry-forward
   constraint on how §6 output is presented.

## Conditions

1. **[BLOCKING before any public Gi* render — does NOT block #69 DE implementation of the statistic]**
   The Gi* output must not be publicly labelled a bare "gentrification hotspot." Public-facing labels
   (G2, map legends, tooltips, mart column comments) must use a hedged qualifier
   ("amenity-change hotspot" / "social-change-pressure cluster") and carry the `index-definition.md`
   §1.2 G-2 ecological-inference disclaimer. Add a sentence in §6 fixing the public label convention
   and binding it to G-1/G-2. The internal statistic name ("Gi* hotspot") is unaffected.
   **→ DISCHARGED** in the same commit: §6 of `spatial-methods.md` now includes the binding public-
   labelling convention; public label "gentrification hotspot" explicitly prohibited; G-1/G-2
   guardrails cited. Does NOT block #69 DE implementation.

2. **[NON-BLOCKING, doc]** §4 should add one sentence grounding the 500 m default in
   gentrification-spillover / Kiez-diffusion scale (Dangschat 1988/2000; Döring & Ulbricht 2016)
   alongside the existing walkable-catchment rationale (R-C2). The ±50% sweep is judged adequate and
   should not be widened.
   **→ DISCHARGED** in the same commit: §4 of `spatial-methods.md` now cites Dangschat (1988/2000)
   and Döring & Ulbricht (2016) for the gentrification-spillover / Kiez-diffusion rationale; ±50%
   sweep not widened.
