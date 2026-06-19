[O2] Reproducible methodology whitepaper (versioned, citable)

## Why (problem)
The methodology (multi-dimensional index, longitudinal stages, spatial methods, validation) deserves a
rigorous, reproducible, **citable** write-up — deeper than the public G2 methodology page (#38) and suitable
for external/academic scrutiny. None exists yet.

## Goal
A versioned whitepaper/preprint generated **reproducibly from the repo**: data, methods, validation,
limitations, ethics — citable now (CITATION.cff) and archivable later (a free DOI service).

## Scope & approach
- Architect picks a free, reproducible authoring path (e.g. Quarto / LaTeX / markdown→PDF) — ADR if it adds a tool.
- Sections: data sources + licences; methods (ADR-0008 model, spatial inference R-A9, trajectories R-A8);
  validation (R-B2 back-test); limitations; ethics & scope-of-claims.
- One command regenerates all figures/tables from the marts; inputs pinned for reproducibility.
- Add `CITATION.cff`.

## Acceptance criteria
- Whitepaper builds reproducibly from the repo (single command); figures/tables regenerate from marts.
- Covers methods, validation, limitations, ethics; is citable.
- geo-DS **and** domain-expert sign-off.

## Gate / sign-off
Methodology-bearing → geo-DS + domain-expert `pass`; grounding rule (R-C2).

## Dependencies / relations
R-A7/R-A1 (#77/#64), R-A8 (#78), R-A9 (#79), R-B2 (#71), G2 (#38). Cross-cutting output.

## References
- `docs/assessment/2018-thesis-critical-assessment.md`, `docs/assessment/2026-06-19-pm-architect-review.md`
