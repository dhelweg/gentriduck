---
name: we-implement
description: The web-engineer coding workflow for Gentriduck — plan from an issue SPEC, build Evidence.dev pages/components/deploy per ADR-0012, self-check locally, and hand off for review. Use when implementing any web-engineering task under Epic G.
---

# we-implement — web-engineering coding workflow

1. **Plan from the SPEC.** Read the GitHub issue: acceptance criteria, non-goals, deps. Restate what
   "done" means before writing code. If a new tool/library/source beyond ADR-0012's named stack
   (Evidence.dev, Observable Framework fallback, Cloudflare/GitHub Pages) is needed, **consult the
   architect / relevant ADR first**.
2. **Branch.** `git switch -c <epic-id>-<slug>` (e.g. `g1-berlin-stats-site`) off `develop`.
3. **Implement** under `web/` (Evidence.dev project, per ADR-0012 Consequences layout):
   - `pages/` — markdown + SQL pages (data-analyst usually authors content; you own structure).
   - `components/`, `static/` — shared theming/components; `static/` holds the gitignored
     published-parquet bundle (from `uv run poe export-serving`, F2/#34) — never commit it.
   - `sources/`, `evidence.config.yaml` — data-source wiring and deploy/base-path config.
   - Reference `dim_city`/`dim_area` (ADR-0005); parameterize routes/pages by city, never hard-code
     Berlin.
4. **Test as you go.** Build locally (`npm run build` / `evidence build` inside `web/`) and preview
   with the dev server. Confirm the site works with **no MotherDuck token and no account**
   (golden rule #5) — it must run from the local static export alone.
5. **Self-check (the gate):** the local Evidence build succeeds cleanly, the dev server renders the
   changed pages, and deploy config still targets `main` only (ADR-0011).
6. **Hand off.** Summarize: what changed, how acceptance is met, what you ran (with output), and any
   risks. Do **not** merge or deploy — the reviewer verifies first.

Guardrails: free + open only; large/raw data and the published-parquet bundle stay gitignored; the
site must never embed a MotherDuck token or any other secret in client-shipped code.
