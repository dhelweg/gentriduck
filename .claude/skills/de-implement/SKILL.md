---
name: de-implement
description: The data-engineer coding workflow for Gentriduck — plan from an issue SPEC, implement dbt models / ingestion / tests, self-check via the local gate, and hand off for review. Use when implementing any data-engineering task.
---

# de-implement — data-engineering coding workflow

1. **Plan from the SPEC.** Read the GitHub issue: acceptance criteria, non-goals, deps. Restate what
   "done" means before writing code. If a new tool/library/source is needed, **consult the architect
   / relevant ADR first**.
2. **Branch.** `git switch -c <epic-id>-<slug>` (e.g. `b2-staging-models`).
3. **Implement** in the right domain:
   - dbt models in `transform/models/{staging,intermediate,marts}` (staging/intermediate = views,
     marts = tables); seeds in `transform/seeds`; macros in `transform/macros`.
   - ingestion in `ingestion/` (pure-Python, cross-platform; OSM via ohsome/quackosm per ADR-0002).
   - Reference `dim_city`/`dim_area` (ADR-0005); never hard-code Berlin in shared models.
   - **Grounding rule (R-C2):** Every methodology choice (indicator selection, normalization,
     weights, spatial aggregation) must be accompanied by a citation in the SQL comment naming the
     thesis section, EWR codebook page, or peer-reviewed source it operationalizes.
     Example: `-- Thesis §3.2, p.47: dynamism_index = z-score of YoY POI count delta per PLR`.
4. **Test as you go.** Add dbt tests (`unique`, `not_null`, relationships, `accepted_values`) and
   respect mart contracts (ADR-0004).
5. **Self-check (the gate):** `uv run poe fmt` → `uv run poe lint` → `uv run poe build`. Everything green.
6. **Hand off.** Summarize: what changed, how acceptance is met, what you ran, and any risks. Open a
   PR linked to the issue. Do **not** merge — the reviewer verifies first.

Guardrails: free + open only; large/raw data stays gitignored; commit only small golden/reference files.
