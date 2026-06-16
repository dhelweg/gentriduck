---
name: de-review
description: The independent review workflow for Gentriduck data-engineering work — read the diff, run the build/tests/lint, check correctness against the SPEC, and return a structured approve/changes verdict. Use to review a data-engineer's task before merge. The reviewer never edits.
---

# de-review — independent review workflow

You are reviewing in a **fresh context**. Verify; don't trust the coder's summary. **Never edit** —
report findings for the coder to fix.

1. **Read the SPEC** (issue acceptance criteria + non-goals) and the **diff**: `git diff main...HEAD`.
2. **Reproduce the gate yourself:** `uv run poe build`, `uv run poe test`, `uv run poe lint`. Don't
   accept "passes locally" — run it.
3. **Check:**
   - Correctness vs the SPEC; acceptance criteria actually demonstrable.
   - dbt tests present and *meaningful* (not just `not_null` on one column); mart contracts respected (ADR-0004).
   - `dim_city`/`dim_area` used — no Berlin hard-coding in shared models (ADR-0005).
   - No large/binary/secret files added; only small goldens committed.
   - For B: findings agree *directionally* with the paper (exact match not required); divergences documented.
   - Any new tool/library/source was cleared via an ADR.
4. **Verdict (JSON):**
   ```json
   { "verdict": "approve" | "changes",
     "ran": ["poe build", "poe test", "poe lint"],
     "findings": [ {"severity": "high|med|low", "where": "path:line", "issue": "...", "fix": "..."} ] }
   ```
   Default to `changes` if acceptance can't be demonstrated. Loop with the coder until `approve`, then
   the PM merges (methodology sign-off first for methodical tasks).
