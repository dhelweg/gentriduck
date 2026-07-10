[I5] Takeaways page — what this means for cities and initiatives

## Why (problem)
The project's political-audience goal — easy-but-true insight that enables decisions — has no
page. The home audience router serves data, method, and AI readers; a policy maker or a
neighbourhood initiative landing on the site finds rigorous dashboards but no "so what should we
do with this?".

## Goal
A `/takeaways` page: roughly five actionable, true-but-simple takeaways from the work so far —
what the data enabled, what other cities and initiatives can learn, and what is still missing —
in plain language.

## Scope & approach
- data-analyst drafts from **signed-off findings only** (thesis-recheck narrative, backtest
  results, trajectory/stage model, methodology docs); web-engineer builds to the I1 template.
- Register: actionable simplicity over MECE precision — but never untrue. Each takeaway is one
  plain sentence + a short "what the data shows" + a link to the page/methodology behind it.
- Candidate takeaways (draft to be validated at implementation, not pre-committed here): commercial
  change tracks social change and can serve as an early signal; small-area (PLR-level) monitoring
  beats district averages; open data alone can power a working early-warning view; a six-stage
  typology is more decision-useful than a single score; what a city would need to publish for this
  to work there.
- Explicit "what this can NOT tell you" block (no displacement measurement, aggregate-only,
  risk/pressure framing) — the honesty is part of the takeaway.
- Adds the policy/initiatives card to the home audience router (with I3).

## Acceptance criteria
- `/takeaways` live with ~5 takeaways, each grounded in and linked to a signed-off source; the
  "cannot tell you" block present.
- Reading level: understandable without any statistics background; German terms (PLR, MSS)
  explained on first use.
- Dual sign-off recorded before integration.

## Gate / sign-off
**Methodology-bearing framing:** gentrification-domain-expert (framing/ethics/policy-misuse check)
AND geo-data-scientist (each takeaway's claim is supported) — `I5-takeaways-{domain,geo}-signoff.md`
with Verdict: PASS.

## Dependencies / relations
After I1; router wiring with I3; OA-related claims (if any) held on I15.

## References
- `docs/assessment/2026-07-10-storytelling-comms-review.md` (findings 1, 6; §4 audience map)
- `web/pages/thesis-recheck.md` · `docs/methodology/backtest.md` · O3 stance (`docs/PROJECT_PLAN.md`)
