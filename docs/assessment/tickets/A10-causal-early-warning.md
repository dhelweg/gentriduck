[A10] Causal / early-warning gentrification design (DiD, event-study) — DEFERRED (tracked) from the focused scope

## Status
**Deferred.** Per the 2026-06-19 "focused conceptual upgrade" decision, formal causal inference is *not* in
the immediate wave — but it is tracked here so the thesis finding **W3** (causal/temporal inference is
suggestive, not identified) has explicit ticket coverage and is not lost. Schedule after R-A8 (#78) and
R-A9 (#79) land and we know the data supports it.

## Why (problem)
The 2018 thesis's lead-lag (social-status change precedes amenity change) is a correlational/temporal
*signal*, not a causally identified effect — inferred from lagged-feature classification over few time
points. To make the public product genuinely useful (an **early-warning** signal) and credible, we should
formalize this once the multi-dimensional index, trajectories, and spatial model exist.

## Goal (when scheduled)
1. An **early-warning indicator**: which precursors now (amenity acceleration, rent acceleration, social
   in-movement, neighbour diffusion from R-A9) predict elevated **displacement risk** at t+k — validated
   out-of-time.
2. A **quasi-experiment** where a real policy shock exists — e.g. **Milieuschutz / soziale Erhaltungsgebiet
   designation** (from R-B1 #70) via **difference-in-differences / event-study**, with spatial controls
   (R-A9) — to move from "signal" toward "effect".

## Scope & approach (deferred — outline)
- Panel design on the 2008–2024 series; event-study around designation dates; DiD with matched controls.
- Out-of-time predictive validation of the early-warning score; calibration + uncertainty.
- Heavy domain-expert + geo-DS involvement; document identifying assumptions honestly (this is hard with
  observational open data — state the limits).

## Acceptance criteria (when undertaken)
- An early-warning score with out-of-time validation, and at least one DiD/event-study on a policy shock,
  with identifying assumptions and limitations documented.
- geo-DS + domain-expert sign-off; methodology written for G2 (#38).

## Gate / sign-off
geo-DS + domain-expert `pass`; grounding rule (R-C2). **Do not start** before R-A8/R-A9; revisit scope then.

## Dependencies / relations
Depends on R-A1/R-A7 (#64/#77), R-A8 (#78), R-A9 (#79), R-B1 (#70, Milieuschutz). Closes thesis finding W3
together with #78/#64.

## References
- `docs/assessment/2018-thesis-critical-assessment.md` (W3)
- `docs/assessment/2026-06-19-pm-architect-review.md` §2.5
- Thesis abstract + §3.2 (process framing); Dangschat (1988)
