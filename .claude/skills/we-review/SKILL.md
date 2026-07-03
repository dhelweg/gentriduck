---
name: we-review
description: The independent review workflow for Gentriduck web-engineering work — read the diff, run the local build/dev server, check it actually renders, and return a structured approve/changes verdict. Use to review a web-engineer's task before merge. The reviewer never edits.
---

# we-review — web-engineering review workflow

You are reviewing in a fresh context. Verify; don't trust the coder's summary. **Never edit** —
report findings for the coder to fix.

1. **Read the SPEC** (issue acceptance criteria + non-goals) and the diff: `git diff develop...HEAD`.
2. **Reproduce the gate yourself:** build the site locally under `web/` (`npm run build` /
   `evidence build`) and start the dev server to confirm the changed pages actually render. Don't
   accept "passes locally" — run it.
3. **Check:**
   - Correctness vs the SPEC; acceptance criteria actually demonstrable by a running build.
   - The site builds and previews with **no MotherDuck token and no network account** (golden
     rule #5, ADR-0012 decision 1) — static export only.
   - `dim_city`/`dim_area` used — no Berlin hard-coding in shared components/page templates
     (ADR-0005).
   - No large/binary/secret files added; the published-parquet bundle (`web/static/` or similar)
     stays gitignored, not committed.
   - Deploy config still targets `main` only (ADR-0011); `develop` may produce a preview build but
     is never wired as the production source.
   - Any new tool/library/source beyond ADR-0012's named stack was cleared via an ADR.
4. **Verdict (JSON):**
   ```json
   { "verdict": "approve" | "changes",
     "ran": ["evidence build", "dev server smoke check"],
     "findings": [ {"severity": "high|med|low", "where": "path:line", "issue": "...", "fix": "..."} ] }
   ```
   Default to `changes` if the build/render can't be demonstrated. Loop with the coder until
   `approve`, then the PM merges.

Content/data correctness is out of scope here — that's the data-analyst's and the methodology
gate's concern for methodology-bearing pages (e.g. G2). This review is about the site **building,
rendering, and staying within the ADR-0012 architecture**.
