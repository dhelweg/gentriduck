[I6] Open-data experience page — what open data made possible, and what was hard

## Why (problem)
The project is itself a strong, concrete argument for the value of public open data — the entire
pipeline runs on free, openly licensed sources — and it also surfaced real friction (formats,
portals, vintages, boundary changes) that better standardization would remove. At a time when the
Informationsfreiheitsgesetz is publicly debated, the site says nothing about either. This serves
the open-data goal without turning the site into advocacy.

## Goal
An `/open-data` page: a factual experience report — what open data enabled here, the concrete
friction encountered per source, and specific standardization recommendations for data publishers.

## Scope & approach
- data-engineer supplies the raw material (per-source friction from `ingestion/`, ADR-0002/0003/
  0006/0007/0014, drift handling ADR-0016, the dual-vintage LOR/PLR2021 boundary work);
  data-analyst writes it to the I1 template.
- Structure: what this site runs on (source table with licences — reuse G3 attribution work) →
  what only worked *because* the data is open (rebuildable-from-scratch pipeline, reproducibility,
  the 2018 re-check itself) → what was hard, concretely (per-source: format churn, missing
  machine-readable endpoints, undocumented semantics, vintage/boundary breaks, login-gated bulk
  access) → what would make it easy (a short, specific standardization wishlist) → what this means
  in the current debate (one restrained paragraph, factual, non-advocacy: state what the project
  demonstrates, let readers draw conclusions — O3 stance).
- Cross-link: how-its-built, methodology, the whitepaper, DATA_LICENSE.md.

## Acceptance criteria
- `/open-data` live; every friction claim traceable to a repo artifact (ADR, ingestion doc,
  drift manifest); recommendations concrete enough for a data publisher to act on.
- Framing passes the non-advocacy bar: experience report + recommendations, no campaigning.
- Linked from the home audience router (open-data card, with I3).

## Gate / sign-off
gentrification-domain-expert framing sign-off (`I6-open-data-domain-signoff.md`, Verdict: PASS) —
the IFG-adjacent paragraph is the sensitive part. web-engineer-reviewer for the build.

## Dependencies / relations
After I1. Feeds I11 (an open-data post draws from this page). Relates to O4 (open release) and G3
(attribution).

## References
- `docs/assessment/2026-07-10-storytelling-comms-review.md` (finding 6; §4 audience map)
- ADR-0002/0003/0006/0007/0014/0016 · `ingestion/README.md` · `DATA_LICENSE.md` ·
  `docs/epic-g/G3-attribution-licensing.md` · O3 stance (`docs/PROJECT_PLAN.md`)
