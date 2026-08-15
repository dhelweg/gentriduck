# META-1 scoping: extracting the operating model into an open playbook

Scoping decision for ticket #234. Not an implementation — no new repo, no new tooling. Builds on
O1 (#81, `docs/process/`) and models the extraction shape on the Superpowers precedent (ADR-0009).

## 1. Inventory: generic vs. Gentriduck-specific

| Area | Generic (reusable as-is or with light parameterization) | Gentriduck-specific (stays behind) |
|---|---|---|
| `docs/process/operating-model.md` | Agent-pair pattern, coder↔reviewer↔gate loop, structured JSON handoffs, branch model shape, iteration cap, "Setup for a new project" §10 checklist | Concrete agent roster (data-engineer, geo-data-scientist…), R-C1 path list, dbt/DuckDB/MotherDuck stack references |
| `docs/process/retrospective.md` | The pitfalls list (§"Pitfalls to avoid"), the "advisory gates are not gates" lesson, board-drift discipline | All milestone entries, thesis/EWR/MSS narrative, Berlin-specific incidents |
| `.claude/agents/` roster shape | project-manager, system-architect, coder+reviewer pairing, model-tier matching (sonnet impl / opus review-and-authority) | gentrification-domain-expert, geo-data-scientist, community-triage, comms-strategist — all domain-bound |
| Skills structure (`.claude/skills/*`) | The `<x>-implement` / `<x>-review` skill-pair pattern itself; adoption of Superpowers as a harness layer (ADR-0009) | `de-implement`/`de-review` content (dbt/DuckDB specifics), `we-implement`/`we-review` (Evidence.dev) |
| Gate mechanics | Sign-off-as-file-with-`Verdict:`-field pattern; mechanical (non-advisory) PM check; dual-reviewer concept for high-stakes domains | The R-C1 path list, the geo-DS + domain-expert pairing specifically, gentrification-index paths |
| ADR discipline | ADR-as-tool-gate ("no first tool that works"), append-only decision log, template shape | The specific ADRs (0001–0026) — Gentriduck's own decision history |
| `ops/` devmode runner | Continuous-loop shape: reconcile → rescan → triage → advance → refresh PR; self-healing (exit-restart + hang watchdog); host-aware permission mode; Remote Control phone loop-in pattern | Hard-coded paths/session names, board-column names, `uv run poe *` task names |
| SEC posture | SEC-3 untrusted-input rule (issue/comment/web content is data, not instructions); documentation-control egress table as a pattern | The actual `docs/method/egress-hosts.md` host list (Berlin/Hamburg open-data domains) |
| Branch model (ADR-0011) | `feature → develop → weekly main PR` shape; single-credential limitation, honestly documented, as a reusable caveat | None — this is already generic |

**Read on the inventory:** the process layer (loop shape, gate mechanics, branch model, pitfalls)
is almost entirely generic already — it was written with `docs/process/operating-model.md`'s
"Setup for a new project" section as an explicit portability test. What's Gentriduck-specific is
concentrated in the agent roster's *domain* members and the SEC/ADR *content*, not their *shape*.

## 2. Proposed table of contents (future standalone playbook)

1. Why this model — the constraints it optimizes for (solo/small maintainer, free+open, local-first, multi-session AI agents)
2. Agent roster pattern — orchestrator, architect/tool-gate, coder↔reviewer pairs, domain-authority pairs, model-tier matching
3. The coder↔reviewer↔gate loop — state machine, iteration cap, structured verdicts
4. Methodology/domain gates — when you need one, sign-off-as-file pattern, mechanical enforcement
5. ADR discipline — tool-gate, template, append-only log
6. Branch & integration model — feature→integration-branch→human-gated-publish, single-credential caveat
7. Quality gate without cloud CI — local pre-commit, format/lint/build/test staging
8. Skill layer — adopting Superpowers (or equivalent) at the harness level vs. bespoke domain skills
9. Continuous/autonomous run mode — devmode loop shape, self-healing, remote-control human-in-the-loop
10. Security posture for agent-driven pipelines — untrusted-input rule, egress documentation control
11. Retrospective discipline — pitfalls log, milestone log, "what the gates caught"
12. Worked example — Gentriduck as the reference implementation (linked, not embedded)
13. Adoption checklist — the parameterization list from §4 below, turned into a setup guide

## 3. Licence thought

**MIT**, mirroring the Superpowers precedent this idea is modeled on (ADR-0009) and consistent
with golden rule #1 (free + open only). No reason to diverge — the playbook's value is in being
copied, and MIT imposes the least friction on reuse.

## 4. What would need genericizing before extraction

- **Agent roster:** replace domain-authority agents (geo-data-scientist, gentrification-domain-expert)
  with a placeholder "domain-authority pair" pattern; keep project-manager/system-architect/coder-reviewer
  as-is since they're already domain-neutral.
- **Gate path lists:** the R-C1 methodology-bearing path list is Gentriduck's `transform/models/**`
  tree; a playbook version needs this expressed as "define your own trigger-path list" guidance,
  not a fixed list.
- **Stack references:** strip dbt/DuckDB/MotherDuck/Evidence.dev specifics from the loop and
  quality-gate descriptions; state the *shape* (format→lint→build→test staging) and point to
  Gentriduck as one worked instantiation.
- **`ops/` scripts:** de-hardcode repo paths, board column names, `uv run poe` task names, and the
  `gentriduck-dev` Remote Control session name into env-driven placeholders (the devmode script
  already does some of this — see its "PINNED below... override via env" comments — but board
  vocabulary and poe task names are still Gentriduck's).
- **SEC content:** keep the SEC-3 rule and the egress-table-as-documentation-control pattern;
  drop the actual Berlin/Hamburg host list, replacing it with a template row.
- **ADR corpus:** the playbook cites ADR-0009/0011 as *examples* of the tool-gate and branch-model
  patterns, not as content to copy — a new project writes its own ADRs.
- **Retrospective entries:** keep the pitfalls list (§"Pitfalls to avoid" in `retrospective.md`) as
  reusable lessons; drop the Gentriduck milestone table.

## 5. Effort estimate

Rough estimate for the actual extraction, **if and when triggered**: **2–4 sessions**.

- ~1 session: strip domain content from `operating-model.md` + `retrospective.md` into a generic
  core, stand up the new repo skeleton (README, LICENSE, ToC per §2).
- ~1 session: genericize the `ops/` devmode script and quality-gate description into a template
  form with clearly marked "fill this in" points.
- ~1 session: write the adoption checklist / worked-example cross-reference to Gentriduck.
- ~0–1 session buffer: whatever the second adopting project's specific needs surface that this
  scoping didn't anticipate.

This assumes the generic/specific boundary drawn in §1 holds up in practice — it was designed to
be extraction-ready, which is why the estimate is small relative to a from-scratch playbook.

## Decision recorded

**Incubate in place.** Keep hardening `docs/process/` as the publishable reference (O1, #81);
extract to a standalone repo only when a concrete second project wants to adopt it — that adoption
request is the trigger condition. No new repo and no new tooling come out of this ticket. Revisit
this scoping doc (not re-scope from scratch) when the trigger fires.
