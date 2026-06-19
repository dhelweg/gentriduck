[A8] Longitudinal gentrification trajectory & stage model (2008–2024)

## Why (problem)
Gentrification is a *process* — Dangschat's double invasion-succession cycle (pioneers → gentrifiers →
displacement). The 2018 thesis could only hint at "phase one" because it had two snapshots (2014/2016); its
abstract explicitly frames the result as a possible *first phase*. Gentriduck now has a full **2008–2024**
time series, so we can model each area's **trajectory** and assign a **stage**, instead of publishing a
single contemporaneous score. This is the highest-value payoff of the longitudinal data and a direct
improvement on the 2018 conceptual model.

## Goal
A per-PLR gentrification **trajectory classification** over 2008–2024 that assigns each area a stage
(e.g. stable / early-signal / actively-gentrifying / late-stage/post-displacement), exposed as a mart and
validated against ground truth.

## Scope & approach
1. Build standardized per-PLR time series of the multi-dimensional index (per ADR-0008 R-A7 / R-A1) and its
   components (social status, amenity, rent, displacement).
2. Classify trajectories with a documented method — e.g. **trajectory clustering** (k-means/DTW on
   standardized series), **latent-class growth / group-based trajectory models**, or **sequence analysis** on
   discretized stages. Pick per geo-DS/domain sign-off; report cluster validity.
3. Map clusters to interpretable **gentrification stages** (domain expert names them against the
   invasion-succession framework).
4. Expose `fct_gentrification_trajectory` (area × stage × trajectory metrics) and per-year stage; validate
   against MSS dynamik and the curated hotspots (R-B2 #71) — do known Kieze land in the expected stages?

## Acceptance criteria
- Per-PLR trajectory/stage classification across 2008–2024 with a documented, cited method and validity metrics.
- Stages are interpretable and reconcile with MSS dynamik + the back-test hotspots (R-B2).
- `fct_gentrification_trajectory` mart built with tests; `uv run poe build` green.
- geo-DS + domain-expert sign-off.

## Gate / sign-off
geo-DS (method) + domain-expert (stage interpretation) `pass`. Grounding rule (R-C2) — cite the
trajectory-method literature and the stage framework.

## Dependencies / relations
Depends on R-A7 (#77)/R-A1 (#64) (multi-dim index) and R-A3 (#66) (MSS). Validated by R-B2 (#71). Feeds E3
(#32) narratives and G1/G2 (#37/#38).

## References
- Thesis abstract + §3.2 (Gentrifizierung als Prozess), Dangschat (1988) double invasion-succession
- `docs/assessment/2026-06-19-pm-architect-review.md` §2.5 (conceptual leap)
