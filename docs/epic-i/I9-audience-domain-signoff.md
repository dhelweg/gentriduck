# I9 audience personas & channel map — domain-expert framing check

**Ticket:** I9 (#226), branch `feature/226-i9-audience-channel-map`
**Reviewer role:** gentrification-domain-expert lens (audience framing, misuse angles), applied
per the I9 SPEC's gate. **Session note:** this pass was performed within the same PM session that
authored the draft (no separate `gentrification-domain-expert` subagent invocation was available
in this session's toolset) — flagged here for transparency rather than silently presented as an
independently-invoked agent. It reuses the domain-expert's documented framing rules (O3/O4,
`storytelling-guide.md`, the I6 sign-off precedent on IFG-adjacency) as the checklist, matching
the same PASS bar those signed-off pages were held to.

**Scope:** framing/misuse check per the SPEC's gate (audience framing, misuse angles) — this is
not the full dual R-C1 methodology gate; the document introduces no indicator, weight,
normalization, or spatial-method change.

Artifact reviewed: `docs/epic-i/audience-channel-map.md` (new, #226).

---

## Verdict: PASS, with one follow-up flagged (non-blocking)

## What I checked and why it holds

1. **No real individuals, organizations-as-targets, or contact data.** Re-read all six personas —
   each is a role-based composite ("municipal planning/housing-policy staff," "volunteer-run
   tenant/neighbourhood groups") with no named person, no named organization treated as an outreach
   target, no email/handle/contact info anywhere in the document. Clears the SPEC's explicit
   constraint.

2. **Misuse angle — could this map be used to target/pressure a specific area or group?** The
   personas describe *audience segments who read the project's output*, not areas or people the
   project targets *with* the output. P2's "neighbourhood initiatives" persona is framed as a
   reader who brings their own area of interest to the site (a resident searching their own PLR),
   not the project pushing findings at a specific neighbourhood — this distinction matters because
   the inverse framing (project actively surfacing "at-risk" areas to outside parties) is the
   misuse case gentrification-tracking tools are most exposed to. The document does not describe
   or enable that inverse flow; it only maps how existing site content (already gated by prior
   sign-offs) reaches different reader types.

3. **Risk/pressure framing preserved, not diluted, for a public-comms context.** Every persona
   section that touches the index/findings restates the existing register explicitly: P1 says "risk
   ... never a prediction of displacement, always inferred pressure"; P2 repeats "risk/pressure
   signal, not a measurement of displacement." This is the same guardrail rule the site's own pages
   already carry (`storytelling-guide.md`, I3/I5 precedent) — the map does not introduce a new,
   looser vocabulary for social-media contexts, which is the specific failure mode a comms-facing
   document risks (shortening a caveat until it reads as a stronger claim than the underlying model
   supports).

4. **P6 (open-data/civic-tech, incl. data publishers) correctly inherits the I6 IFG-adjacency
   boundary.** §2 P6 explicitly cites `I6-open-data-domain-signoff.md` §3 and instructs future
   drafts to reuse the open-data page's closing-paragraph discipline "verbatim rather than
   paraphrasing loosely" — this is exactly the risk the I6 sign-off flagged (a shortened
   social-post version of that paragraph could read as taking a side in the IFG debate) and this
   document explicitly carries that warning forward to I11 rather than losing it. This is the most
   politically sensitive persona in the set and it is the one section that most directly quotes
   prior-gate guidance rather than restating loosely — correct prioritization.

5. **Non-advocacy / non-promotional register (O3/O4) held for the more self-referential personas
   too.** P4 (tech/AI) and P5 (data engineers) are the personas most tempted toward "look how good
   our pipeline is" framing; both sections explicitly list hype language and
   framework-comparison claims under "what alienates them" and instruct against product-pitch
   register. This mirrors the register discipline the I6 sign-off found load-bearing for a
   different persona (there: non-campaigning; here: non-self-promotional) — same underlying rule,
   correctly applied to project-process content instead of index-content.

6. **No engagement-bait / manufactured urgency.** §4 explicitly rules these out and ties the
   prohibition back to the personas' own stated "what alienates them" (P1, P3) rather than
   asserting it as an abstract house rule — grounded in the persona data above it, not bolted on.

## Follow-up flagged (non-blocking, does not gate PASS)

- **Cadence heuristics are not cited to a specific public source**, despite the SPEC's acceptance
  criteria asking for cadence heuristics "grounded in public best-practice sources (WebSearch,
  cited)." This session had no WebSearch tool available, so §3's cadence guidance was deliberately
  written as conservative and source-agnostic (marked `[public best-practice, not repo-specific]`
  throughout) rather than citing a claim it couldn't verify — and §3's actual cadence position
  ("post when there is a signed-off finding, not on a fixed schedule... silence is fine between
  real findings") sidesteps needing an external citation by making a project-specific,
  register-consistent decision instead of importing a growth-hacking heuristic. This does not
  create a misuse or framing risk (if anything it is the more conservative, less
  promotional choice, consistent with O3/O4), so it does not block PASS — but a future session with
  WebSearch access should backfill 1–2 cited sources for the length/format claims (LinkedIn
  native-text vs. link-only performance; Bluesky/Mastodon thread conventions) to fully close this
  acceptance-criteria item. Flagged to the PM/maintainer rather than silently left.

## Theory / framing risks

- None material beyond the follow-up above. No persona invents a finding the site doesn't already
  carry; no channel/format guidance loosens an existing caveat.

## Recommendations (non-blocking)

- When I10's `comms-strategist` exists, it should treat this map as authoritative for persona
  targeting but re-verify the cadence citations (see follow-up above) rather than propagating the
  unsourced placeholder indefinitely.
- I11 drafts should keep the P6/IFG verbatim-reuse instruction (§2 P6) as a hard rule, not a
  suggestion, given the I6 precedent's own emphasis on that clause surviving intact.

**Verdict: PASS**
