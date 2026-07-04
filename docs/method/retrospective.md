# Engineering retrospective

A factual record of significant decisions, what the gate mechanisms caught, and observed
pitfalls. Written to be honest about tradeoffs and what did not work as expected.

Entries are roughly chronological. Append new milestones at the end.

---

## Architecture decisions

### Stack (ADR-0001, Epic A)

The 2018 thesis ran on Hadoop + Hive SQL + Java UDFs + R + Weka. The revival chose dbt +
DuckDB + Python (`scipy`, `scikit-learn`). The key tradeoffs were:

- DuckDB runs local with no server, satisfies the free + open constraint, and handles the data
  volumes (OSM parquets, multi-year EWR CSVs) without needing a distributed system.
- dbt's layered model (staging → intermediate → marts) maps directly onto the thesis's SQL
  pipeline stages, makes lineage visible, and allows independent testing at each layer.
- The spatial extension (`ST_Distance`, `ST_DWithin`) replaced Java UDFs for distance
  calculations — pure SQL, no JVM.
- `uv` for environment isolation means "no global dbt" is enforceable: every command goes
  through `uv run poe <task>`, identical on all three OSes.

The decision to use `pre-commit` hooks (auto-format on commit, `dbt build` on push) rather than
cloud CI was deliberate. It keeps the gate local and free. The acknowledged cost is that "works
on my machine" drift is possible without a clean-checkout cloud check; `uv.lock` pinning and the
push-stage `dbt build` mitigate this.

### City-agnostic model from day one (ADR-0005, Epic A)

The data model uses `dim_city` and a generic `dim_area` hierarchy (city → district → subarea)
from the start, with Berlin mapped onto generic levels and isolated in source adapters. This cost
some upfront complexity (conformed dimensions, the adapter pattern) before any second city was
needed. The rationale was that retrofitting city-agnosticism onto a Berlin-hardcoded schema
after the fact would be far more disruptive than building it in from the start.

This has held. The intermediate and mart models do not reference Berlin by name; adding a second
city in Epic H is expected to be adapter-only work.

### OSM history sourcing (ADR-0002, Epic C)

The ohsome API (HeiGIT) was chosen over the full-history PBF route for the longitudinal POI
database. It is pure-HTTP, fully cross-platform, and avoids the OS-specific `osmium` toolchain.
The tradeoff is dependence on a third-party API rather than a local file; that was accepted
given the free tier, the open-data ethos, and the cross-platform constraint.

### Dual-vintage LOR spatial join (Epic C3, issue #22)

Berlin's LOR administrative geography was revised in 2021 (448 PLRs → 542 PLRs). OSM POI
snapshots before and after 2021 need to be joined against different LOR vintages to avoid a
count discontinuity at the reform year. This was discovered during C3 implementation. The fix —
join pre-2021 snapshots to the 2019 LOR geometry and post-2021 snapshots to the 2021 geometry —
is implemented in the spatial join stage.

### Autonomous merge via `develop` branch (ADR-0011, 2026-06-29)

Originally the PM opened PRs against `main` and the human maintainer merged every one via the
GitHub UI. This created a per-feature human bottleneck that stalled forward progress whenever
the maintainer was unavailable.

ADR-0011 adopted a `develop` integration branch. The PM now merges finished, reviewed work into
`develop` via plain git (no `gh pr merge`) and opens a single weekly `develop → main` PR for
the maintainer to merge. This moved the human gate from per-feature to per-week.

The key constraint to acknowledge honestly: with a single shared GitHub credential, the PM
could push directly to `main`. The protection is behavioral — `gh pr merge` deny-listed,
PM instructed to only touch `develop` — not server-enforced. A dedicated PM identity with
branch protection (ADR-0011 Alternative D) remains the principled hardening path.

---

## What the gates caught

### Methodology gate enforcement (R-C1): the critical role

Before R-C1 the methodology gate was advisory. A reviewer could record `concerns` and work
could merge anyway. The 2026-06-19 PM + architect deep review
(`docs/assessment/2026-06-19-pm-architect-review.md`) found that this had allowed meaningful
drift from the thesis's construct:

- The live index at that point treated POI count as "social status" and POI share-change as
  "social dynamism" — the same concepts the thesis used for the MSS welfare/unemployment index.
  The thesis used POIs as *predictors* of social status; the revival had made them *the index*.
- The committed E1/E2 "thesis validation" scripts tested hypotheses the thesis never made (POI
  correlation with POI-based dynamism) and declared them inconclusive. These were not the thesis
  hypotheses H1–H3c.
- Berlin's MSS (Monitoring Soziale Stadtentwicklung) — the actual ground-truth social index the
  thesis used — was not ingested at all, despite being a free, openly licensed Berlin Open Data
  resource.

R-C1 made the gate mechanical: sign-off files with `Verdict: PASS` are a prerequisite checked
by the PM before `git merge` into `develop`. A missing or `concerns` verdict blocks integration.
The remediation wave (R tickets #64–#84) re-grounded the methodology. The gate now prevents a
repeat of this drift.

The practical lesson: advisory gates are not gates. The only gate that holds under continuous
autonomous operation is one the agent cannot bypass by reasoning.

### Reviewer catching the E1/E2 misframing

During the remediation wave, the data-engineer-reviewer (working from a fresh context) identified
that the E1/E2 analysis scripts tested circular hypotheses: they correlated POI-derived variables
against POI-derived index components and called this "thesis validation". The reviewer flagged
this as a `high`-severity finding. The fix required re-writing E1/E2 against the real thesis
hypotheses (H1–H3c: POI predictors vs. MSS social outcome, with the lead-lag temporal model).

This would not have been caught by the coder's self-check, because the coder had constructed
the analysis within a frame that was internally consistent — just wrong relative to the thesis.
Fresh context is what made the difference.

### ADR gate preventing scope creep

Several mid-task impulses to adopt convenient tools (specific Python libraries, a different
data source) were routed through the architect first. In several cases the architect found that
a simpler approach already available within the existing stack was sufficient, and no new
dependency was added. The gate did its job: "no first tool that works" forced a comparison
before adoption.

### Silent hollow builds on the reviewer's machine (local-first data-presence)

During the R-A1 keystone review (PR #93), the reviewer's machine was missing the MSS source
(gitignored, never transferred from the coder's machine). `uv run poe build` reported green
(`PASS=344 WARN=1 ERROR=0`) because the staging models return empty stubs when their source
parquets are absent, and all dbt tests pass vacuously on empty tables.

The reviewer was checking a warehouse that was hollow at its most important table. The full
account is in `docs/lessons/local-first-data-presence.md`.

The fix: `assert_not_empty` and `assert_min_rows` dbt tests on critical staging models and
keystone intermediate models. These tests now **block** `dbt build` (severity: error) if the
data is absent, which in turn blocks `git push` via the pre-push hook. A machine without the
data can no longer silently ship.

---

## Iteration and throughput observations

### Sequential vs. parallel

One PM session works sequentially: one task In Progress at a time. The model does not attempt
true parallelism because that would require multiple sessions and worktrees, adding coordination
complexity. In practice, the bottleneck has been the human gate (the weekly PR) rather than
the sequential task queue. For a solo maintainer this appears adequate.

If a project has multiple developers who could genuinely work in parallel, the model would need
worktrees and a mechanism to keep the PM's board accounting consistent across concurrent branches.

### Loop cap matters

Without a max-iteration cap on the coder ↔ reviewer loop, a disagreement can cycle
indefinitely, consuming usage without converging. The cap (approximately 3 iterations) forces
escalation to the maintainer or the scientist as a tiebreak. This has the side effect of
surfacing genuine ambiguities early rather than letting them fester in the loop.

### Session-limit awareness

The continuous dev mode PM cannot read Claude subscription limits directly. The session-limit
restart loop (escalating backoff: 60 s → 5 min → 15 min on repeated quick exits) and the
hang watchdog (idle transcript threshold: 900 s default) together handle the two main failure
modes — usage-limit API exits and wedged-but-alive sessions. State is in the board and
`docs/handoff/state.json`, so restarting a session is always safe.

### Board discipline as a correctness invariant

Multiple sessions accumulated silent drift where closed issues remained on the board as
"In Progress" because the PM closed the issue without moving the card. The reconciliation pass
(run at the start and end of every session) exists specifically to catch and repair this drift.
The rule is: the issue state, the board column, and the code must all agree. Moving a card and
closing an issue are a single atomic action, never separate.

### Communication overhead

The coder ↔ reviewer loop produces structured JSON verdicts rather than prose. This makes
verdicts parseable (the PM can check `verdict == "approve"`) and auditable (the finding list is
a record of what was checked). Prose verdicts would require interpretation and are harder to act
on mechanically.

Sign-off files (`*-geo-signoff.md`, `*-domain-signoff.md`) follow the same pattern — a
`Verdict:` field the PM checks by grep. This is intentionally simple; the PM does not parse
complex sign-off prose to decide whether to proceed.

---

## Pitfalls to avoid

**1. Advisory gates are not gates.**
If a gate can be bypassed by reasoning ("the concerns are minor, we'll proceed"), it will be.
Under continuous autonomous operation the agent will reason past it. Gates must be mechanical:
a missing file or a non-`PASS` verdict blocks the action, period.

**2. Fresh reviewer context is not optional.**
A reviewer that has access to the coder's reasoning will tend to follow it rather than check
it. The independent review in Gentriduck works because the reviewer agent starts with no shared
context. If you replicate this model, enforce the context separation.

**3. `dbt build` green does not mean data is present.**
On a local-first project with gitignored data, a staging model that returns empty stubs makes
`dbt build` pass on a machine that has never ingested anything. Add data-presence assertions
(`assert_not_empty`, `assert_min_rows`) on your critical models and wire them to the push gate.
"The build is green" and "the data is here" are separate questions on a local-first stack.

**4. Methodology drift accumulates silently without a construct-validity check.**
Engineering quality (test coverage, code hygiene, lint passing) does not protect against
building the wrong thing. A pipeline can be beautifully implemented and measure something
different from what it claims. An independent domain-expert agent reviewing construct validity
is a different function from a data-engineering reviewer checking correctness. Both are needed
on a methodology-bearing project.

**5. Board drift is silent and accumulates.**
Closed issues stuck in "In Progress", issues created without being put on the board, cards
with no matching issue — all of these are invisible to the backlog scanner and distort
prioritization. The reconciliation pass must run at the start and end of every session, not
just when drift is noticed.

**6. A single shared credential limits enforcement.**
When the agent and the human maintainer share a GitHub identity, branch protection rules on
the main branch cannot distinguish them. The deny list protects `main` behaviorally, but a
sufficiently motivated (or confused) agent could find a path around pattern matching. This is
a real limitation. Document it, do not pretend it does not exist.

**7. Capacity tracking is a proxy, not a measurement.**
The PM cannot read subscription limits. It tracks loop counts and elapsed turns as a proxy
and relies on the restart-on-limit behaviour. A session that burns through capacity on a single
large task can surprise the operator. Setting a per-task loop cap and checking disk headroom
before each task are the available controls.

---

## Milestones (append new entries here)

| Date | Milestone | Notes |
|---|---|---|
| 2026-06-17 | Bootstrap (Epic A) complete | Repo, board, agent team, pre-commit gate, dbt scaffold |
| 2026-06-18 | Epic B (thesis revival) complete | Directional agreement with 2018 findings documented |
| 2026-06-19 | Epic C (OSM POI time series) mostly complete | C1–C5 including completeness-bias correction |
| 2026-06-19 | Remediation wave R initiated | PM + architect deep review found construct-validity drift; #64–#84 filed |
| 2026-06-19 | R-C1 gate made binding | Mechanical sign-off check added; `concerns` now blocks integration |
| 2026-06-19 | ADR-0009 accepted | Superpowers v7 adopted selectively; bespoke domain core unchanged |
| 2026-06-28 | Local-first data-presence lesson documented | `assert_not_empty` / `assert_min_rows` guards added after hollow-build incident |
| 2026-06-29 | ADR-0011 accepted | Autonomous `develop` integration; human gate moves to weekly `develop → main` PR |
| 2026-06-30 | D1c (Strassenverzeichnis → PLR crosswalk) complete | Mietspiegel street index ingestion; `develop` includes Epic R + D wave (#56, #65, #69, #71, #78, #79, #28, #29, #53, #109, #112, #113) |
