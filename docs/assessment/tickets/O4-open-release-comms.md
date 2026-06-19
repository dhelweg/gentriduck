[O4] Open release: reproducible dataset + reusable ingestion tooling + milestone communication artifacts

## Why (problem)
To maximize reuse and reproducibility, the derived dataset should be published under an open licence and the
ingestion tooling should be reusable by others; and the project should produce shareable, accurate summaries
at milestones. Today the marts are local-only and the ingestion is project-internal.

## Goal
A published, openly-licensed dataset (marts) + documented, reusable ingestion tooling + a cadence of shareable
milestone artifacts (maps, before/after, narratives).

## Scope & approach
- **Dataset export** of the published marts with an open licence + full source attribution (OSM ODbL, Berlin
  data licences); document a reproducible regeneration path; coordinate with the serving stack (F1/F2).
- **Reusable tooling:** package the ingestion (OSM history, MSS, EWR, price/rent) as documented modules others
  can run cross-platform (clear inputs/outputs, examples).
- **Communication artifacts:** the data-analyst produces accurate, shareable milestone summaries/visuals
  (building on E3 #32) — factual and transparent, not promotional.

## Acceptance criteria
- Dataset published with licence + attribution + a reproducible regeneration path.
- Ingestion tooling documented for external reuse.
- ≥1 shareable milestone artifact produced; all content factual; no personal/employer content.

## Gate / sign-off
architect (licensing/serving) + DE pair; data-analyst for artifacts; domain-expert checks framing.

## Dependencies / relations
F1/F2 (serving #33/#34), E3 (#32), G3 (#39 licensing/ethics). Cross-cutting output.

## References
- ADR-0003 (source licences), `docs/PROJECT_PLAN.md` Epics F/G
