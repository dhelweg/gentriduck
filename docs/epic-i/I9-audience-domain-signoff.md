# I9 audience personas & channel map — domain-expert framing/misuse check

**Ticket:** I9 (#226), artifact `docs/epic-i/audience-channel-map.md` (merged to `develop` at
`040c0903` *before* a valid gate).
**Reviewer:** gentrification-domain-expert (genuine, independent pass).
**Date:** 2026-07-11
**Scope:** the SPEC's gate — audience-framing accuracy and misuse angles for a public communications
plan about a displacement/gentrification measurement project. Not the full dual R-C1 methodology
gate (no indicator, weight, normalization, or spatial-method change).

**Provenance note — this supersedes a non-independent sign-off.** The prior version of this file
recorded `Verdict: PASS` but was authored inside the same PM session that wrote the map; the PM's
toolset cannot spawn this agent, so that was a self-issued gate, not the independent domain review
the I9 SPEC requires ("Gate: domain-expert reviews audience framing, misuse angles"). This file
replaces it with a genuine independent verdict. Independently verified along the way: ADR-0021 §1
does support the channel/audience overlap attributions; ADR-0021 §3 establishes a per-post
domain-expert sign-off (framing/ethics) in addition to the geo-DS one; the six personas map 1:1 to
the 2026-07-10 review §4 table; the I6 IFG-adjacency precedent is cited accurately.

---

## Verdict: PASS WITH CONDITIONS

The map is largely sound: no real individuals/orgs/contact data, correct risk-vs-pressure register
on most persona sections, and correct inheritance of the I6 IFG-adjacency boundary for P6. But two
substantive domain problems must be addressed before I11 uses this map to draft any area-level post,
and one persona is sociologically flattened in a way that intersects with the first problem. These
are fixable by a bounded patch-forward; they do **not** require reverting `develop` (see "Is develop
safe" below).

## Conditions

### C1 (blocking for area-level drafting) — the dual-use / rent-gap misuse vector is unaddressed, and the map mis-cites the gate that would catch it

The P1 format guidance (lines 62–63) offers, as its worked example, a post reading *"in [area],
commercial turnover picked up two years before the social-status shift,"* routed to **LinkedIn as
the primary channel**, and guards it with *"only if that specific claim clears the **geo-DS**
per-post sign-off."*

Two problems compound here:

1. **This is the thesis's core lead-lag signal — i.e., a rent-gap timing signal — broadcast to the
   most investor-adjacent channel.** POI dynamism leading a social-status shift is precisely a
   *leading indicator that a currently-undervalued area is about to appreciate* (Smith's rent-gap
   mechanism: capital targets areas where the gap between actual and potential ground rent is
   widening — Smith 1979/1987). Published with area-level specificity to a professional network that
   overlaps heavily with real-estate and development professionals, it is exactly the intelligence a
   speculator or landlord wants. This is the well-documented *dual-use problem of gentrification
   early-warning systems*: the same output that helps a planner protect a neighbourhood helps an
   investor time entry into it (Chapple & Zuk, "Forewarned," *Cityscape* 2016). The map's own misuse
   reasoning does not engage this at all, and the prior self-sign-off's misuse point actively claimed
   the document "does not describe or enable" surfacing at-risk areas to outside parties — a claim
   *contradicted by the P1 example the same document contains.* Surfacing a named area's appreciation
   lead-time to a public professional feed is that exact flow.

2. **The example names only the geo-DS per-post gate — omitting the one gate designed to catch this.**
   Per ADR-0021 §3 the *same draft must also clear the `gentrification-domain-expert` per-post
   sign-off*, whose explicit job is framing/ethics and keeping displacement risk/pressure-framed.
   The geo-DS gate covers *statistical soundness* — it does not ask "should we broadcast an
   appreciation-timing signal for a named area to an investor-adjacent audience." By citing only
   geo-DS for the single most displacement-sensitive post type, the map, if propagated to I11 as
   written, would route rent-gap-timing content past the very checkpoint meant to stop it.

**Required fix (bounded):**
- (a) Correct the P1 format example (and any parallel P2 area-level guidance) to require **both**
  per-post sign-offs — the domain/ethics gate (ADR-0021 §3) *and* geo-DS — naming the domain/ethics
  gate first for area-level lead-lag claims.
- (b) Add an explicit dual-use acknowledgment (in §4 Reach tactics or a short misuse note) that
  area-level lead-lag findings are exploitable by rent-gap actors (developers, landlords,
  speculators), that LinkedIn is the channel where that exposure is highest, and that this is a
  standing reason to prefer aggregated/retrospective framing over "area X is heating up now" phrasing
  in outward posts. Ground it in Smith's rent-gap theory and Chapple & Zuk 2016.
- (c) Reconcile the document's misuse stance with (a)/(b) so it no longer asserts the map cannot
  surface at-risk areas outward while simultaneously offering a worked example that does.

### C2 (should-fix, before any P2-targeted post) — P2 sociologically flattens Berlin tenant initiatives

P2 frames *Mieterinitiativen* as apolitical "motivated residents" who "want to know what's happening
in my neighbourhood" and might "cite it to a local council member." In the Berlin context these are
frequently *politically mobilized anti-displacement actors* (the milieu of Kotti & Co, Bizim Kiez,
the *Deutsche Wohnen & Co enteignen* campaign — see Holm 2010 on Berlin *Aufwertung* and organized
tenant resistance). That is not a reason to exclude them — they are a legitimate, arguably primary,
audience — but the map should name the tension rather than sand it off: the project is O3
non-advocacy, yet this audience's *use* of a finding is inherently political, and **the project
cannot control downstream reframing of its findings into campaign material.** That is an accepted,
legitimate use; the map should acknowledge it, not imply P2 is a neutral reader. This intersects
directly with C1: the *same* area-level specificity that serves P2's protective use also serves the
adversarial (predatory) reader — the map currently reasons about the sympathetic reader only.

### Non-blocking — the cadence citation gap is acceptable (I concur with the prior note here)

The SPEC asks for cadence heuristics "grounded in public best-practice sources (WebSearch, cited)."
No WebSearch was available and the doc wrote cadence source-agnostically. Independently assessed: this
is **acceptable, and arguably the better call.** The doc's actual cadence position — "post when there
is a signed-off finding, silence is fine between findings, no promotional cadence target" — is a
*register decision consistent with O3/O4*, not an empirical growth claim needing a citation; importing
growth-hacking cadence advice would sit in *tension* with the non-promotional register. This creates
no framing or misuse risk. The one hygiene follow-up: the *empirical* format claims that ARE stated
as fact (LinkedIn native-text vs. link-only performance; Bluesky/Mastodon thread conventions, lines
64, 112, 194–195) should get 1–2 citations when WebSearch is available — minor, non-blocking.

## What holds (independently confirmed)

1. **No real individuals, organizations-as-targets, or contact data** — every persona is a role-based
   composite. Clears the SPEC constraint.
2. **Risk-vs-pressure register preserved** in P1/P2 findings language ("inferred pressure, never a
   prediction of displacement") — not loosened for a social context.
3. **P6 correctly inherits the I6 IFG-adjacency boundary**, citing `I6-open-data-domain-signoff.md`
   §3 and carrying the "reuse the closing paragraph verbatim" discipline forward. Correct
   prioritization of the most politically sensitive persona.
4. **P4/P5 non-promotional discipline** (hype and framework-comparison listed under "what alienates
   them") — sound, and consistent with O4.
5. **§4's no-engagement-bait rule** is grounded in the personas' own stated aversions, not bolted on.
6. **Channel/audience attributions are faithful to ADR-0021 §1** (verified).

## Theory / framing risks

- **`theory_risks`:**
  - The thesis's lead-lag hypothesis is a rent-gap timing signal; publishing it area-level and outward
    is a textbook dual-use displacement-acceleration vector (Smith rent-gap; Chapple & Zuk 2016). The
    map steers toward it and cites only the statistical gate for it. (C1)
  - Sociological flattening of Berlin *Mieterinitiativen* into apolitical residents obscures the
    non-advocacy tension and the uncontrollable downstream-reframing reality (Holm 2010). (C2)
  - Internal inconsistency: the document's misuse stance is contradicted by its own P1 worked example.

## Recommendations

- Patch-forward the three C1 items and the C2 acknowledgment as a small edit to
  `audience-channel-map.md`; re-request this sign-off on the patched version (or the per-post gate at
  I11 time can enforce C1(a) directly if the map text is corrected).
- Treat this map as authoritative for persona *identity* now, but **not** authoritative for
  area-level P1/P2 *format guidance* until C1 is patched. I11 area-level drafts are blocked on C1.
- When I10's `comms-strategist` lands, it inherits C1/C2 as hard rules, not suggestions.

**Verdict: PASS WITH CONDITIONS**
