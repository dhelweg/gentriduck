[C0] Author a gentrification-domain expert agent (urban-sociology/housing-policy), paired with the geo-DS

## Why (problem)
The methodology failures found in the 2026-06-19 review were **domain-theory** gaps, not statistics gaps: not
recognising that the thesis's Status/Dynamik are Berlin's *social* MSS indices, not knowing the lead-lag was
the thesis's core finding, not knowing the MSS dataset exists, and conflating demographic composition with
socio-economic status. The existing `geo-data-scientist` is scoped to quantitative methods (spatial, leakage,
metrics) and runs at `effort: low` (`.claude/agents/geo-data-scientist.md`). No agent owns gentrification
*theory*, indicator/framing choices, the per-city data landscape, or the public methodology/ethics voice.

Decision (2026-06-19): add a dedicated domain expert that **pairs** with the geo-DS — domain-fidelity ↔
statistical-soundness, mirroring coder↔reviewer.

## Goal
A new agent definition (and a decision on whether it needs its own reviewer) that supplies gentrification-domain
judgement and co-gates methodology-bearing work with the geo-DS.

## Scope & approach
1. Author `.claude/agents/gentrification-analyst.md` (name TBD) with: role, tools (Read/Grep/Glob/Bash/WebFetch/
   WebSearch/Write — no Edit of production code, like geo-DS), `model: opus`, `thinking: true`, **`effort:
   high`** (domain reasoning is the part that failed at low effort).
2. Responsibilities: gentrification theory fidelity (Dangschat invasion-succession, Döring-Ulbricht, rent-gap,
   displacement); indicator and outcome selection; the **per-city open-data landscape** (Berlin: MSS, EWR,
   Milieuschutz, Mietspiegel; future cities at Epic H); public methodology framing and **ethics** (a public
   gentrification index must not become a displacement/speculation accelerator).
3. Output: a domain sign-off JSON (`{ "verdict": "pass"|"concerns", "rationale", "risks", "recommendations" }`),
   parallel to the geo-DS, plus methodology write-ups feeding G2.
4. Update `CLAUDE.md` (agent roster + the coder↔reviewer↔(geo-DS + domain) loop), `docs/PROJECT_PLAN.md`, and
   clarify division of labour vs. geo-DS and `data-analyst`.

## Acceptance criteria
- Agent definition merged; tools/effort/model set as above; no production-code edit rights.
- CLAUDE.md and PROJECT_PLAN reflect the new role and the dual methodology gate.
- Division of labour vs. geo-DS / data-analyst is documented (no overlap ambiguity).
- Decision recorded on whether a paired reviewer is needed now or deferred.

## Gate / sign-off
Architect authors; maintainer approves the roster change. Not itself a gate — C1 makes its verdict binding.

## Dependencies / relations
Enables C1/C2 to reference a domain verdict. Co-owner of A1, A2, A5, A6, B1, G2 (#38), G3 (#39), H (#40).

## References
- `.claude/agents/geo-data-scientist.md`, `.claude/agents/data-analyst.md`
- `docs/assessment/2026-06-19-pm-architect-review.md` §3 (roster decision)
