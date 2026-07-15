# I20 (#244/#252/#253) — Mover-framing sign-off: gentrification-domain-expert

**Ticket:** `docs/epic-i/tickets/I20-amenity-insights-movers.md` (parent #244). This is slice 2
(#253)'s hard gate: the request packet is `docs/epic-i/I20-domain-signoff-request.md`.
**Branch:** `feature/253-i20-domain-curation` (diffed against `develop`).
**Reviewer:** gentrification-domain-expert (urban-sociology/housing-policy theory gate — HARD gate
per the I20 SPEC: "domain-expert gates the mover framing... the site informs, it never recommends
or ranks areas to move to; no real-estate-portal language").
**Date:** 2026-07-15.

## Scope of this sign-off

This gate covers the **framing rules and persona text** landing in this slice:
`docs/epic-i/I20-poi-curation-rules.md` and the P7 persona addition in
`docs/epic-i/audience-channel-map.md`. It does **not** cover #254's actual rendered page copy —
per the request packet, this PASS clears the rules and persona framing that #254 must implement
against, and #254's real copy needs a lightweight re-check against the binding conditions below
before it ships (same two-step pattern as I19's data-vs-copy split).

## Verdict: PASS

## What I checked, against the three request-packet questions

**1. Does the P7 persona (§2 of the audience map) state the never-recommend/never-rank boundary
clearly enough to bind #254's copy?**

Yes. The persona's "what alienates them" section states the boundary explicitly as **binding, not
aspirational** — "no 'best areas to move to,' no real-estate-portal register, no framing that could
be read as investment or relocation advice," and names it a hard gate tied to this very sign-off
document. This is stronger and more specific than most persona entries need to be, appropriately
so given the stakes (steering demand toward "up-and-coming" areas is itself a documented
displacement mechanism this project studies — the persona text names this explicitly, which is the
right level of self-awareness for a project of this kind to state in its own working docs).

**2. Do the curation rules' default-display rules (infrastructure counts + dominant cuisine +
district comparison) risk an implicit-recommendation reading?**

Partially — see binding conditions below. The underlying facts (raw counts, a plurality-cuisine
label above a sample-size floor, a same-format district comparison) are themselves neutral: they
are inventory, not evaluation, and the curation-rules doc is explicit that this is "a neutral
inventory," not a scored comparison. But the **word "dominant"** used throughout (§1, §2 of the
curation rules, and the illustrative mock copy in the request packet) is doing more evaluative work
than the underlying `dominant_cuisine`/`dominant_cuisine_share` mart columns require. "Dominant"
in an urban-sociology register carries connotations of desirability/prestige ("the dominant food
culture") that a purely descriptive "most common" does not. This is a low-severity risk — nothing
here ranks *areas* against each other, which is the actual accelerant mechanism the persona
correctly identifies as the hard line — but it is exactly the kind of register drift the request
packet was right to flag, and it is cheap to fix before #254 writes real copy.

**3. Additional "must never appear" phrases for the curation-rules denylist?**

Yes — adding four to the record below, informed by how real-estate/relocation marketing typically
frames neighbourhood "amenity scores":
- Any comparative/superlative area ranking ("best," "top," "most desirable," "up-and-coming",
  "hidden gem") applied to an *area* (as opposed to purely food-scene vocabulary like "most common
  cuisine," which is fine).
- "Livability," "quality of life," or any single blended score/label implying the infrastructure
  block is an aggregate judgment rather than a list of independent facts.
- Investment-adjacent language ("undervalued," "on the rise," "before it gets expensive") — this is
  the single clearest tell of exactly the accelerant framing the SPEC's hard gate exists to prevent.
- Possessive/recommending verbs directed at the reader ("you'll love," "perfect for families,"
  "ideal if you..." ) — these personalize a neutral fact into implied advice.

## Binding conditions for #254 (do not integrate #254 without these)

1. **Replace "dominant cuisine" (the label/heading, user-facing prose) with "most common cuisine"**
   or equivalent clinical phrasing (e.g. "cuisine breakdown: Italian 28%, ..."), matching the
   request packet's own suggested resolution. The underlying `dominant_cuisine` **column/variable
   name** in the mart and curation-rules doc does not need renaming — only reader-facing copy.
2. **District comparison must render as co-equal figures side by side (same units, same format,
   no colour-coded better/worse, no sort/highlight of "above" vs. "below"** the district value) —
   a plain juxtaposition of two counts, not a delta framed as an outcome.
3. **The four denylist phrases/patterns above must not appear anywhere in #254's copy** — add them
   verbatim to `I20-poi-curation-rules.md` as an explicit denylist (or reference this sign-off) so
   the web-engineer has a concrete checklist, not just this prose to re-derive from.
4. **The completeness caveat text (curation rules §3, now geo-DS-confirmed) must render adjacent
   to the infrastructure block on every profile page that shows it** — not just once at the top of
   the page — since each instance of the block is where a reader could otherwise over-read a `0`.
5. Re-consult (lightweight, not a full re-sign-off) on #254's actual rendered copy before it
   integrates, confirming conditions 1-4 were applied — matching the I19 precedent's "separate,
   explicit re-consult on rendered copy" requirement.

## Recommendation

Approve slice 2 (curation rules + P7 persona framing) as-is, with the five binding conditions above
carried forward into #254's implementation and copy re-check. Nothing here blocks #253 from
integrating into `develop` now — #253 ships no reader-facing copy itself.

```json
{
  "verdict": "pass",
  "rationale": "The P7 persona binds the never-recommend/never-rank boundary explicitly and correctly identifies it as a hard gate rather than a style preference. The curation rules present a neutral inventory (raw counts, a sample-floor-gated plurality cuisine label, co-equal district comparison) with no area-ranking mechanism -- the actual accelerant risk the SPEC names. The one register concern is the word 'dominant' in reader-facing copy, which reads more evaluative than the underlying facts warrant; this is corrected via binding conditions for #254 rather than blocking this rules/persona slice, which ships no copy itself.",
  "risks": [
    "'Dominant cuisine' as literal reader-facing phrasing (rather than 'most common') carries mild evaluative/desirability connotations inappropriate for a neutral-inventory framing -- addressed as binding condition 1 for #254.",
    "District comparison rendering could still read as implicit better/worse if #254 adds any visual emphasis (colour, sort, delta framing) not specified in the curation rules -- addressed as binding condition 2."
  ],
  "recommendations": [
    "Apply binding conditions 1-5 in #254's implementation.",
    "Re-consult on #254's actual rendered copy (lightweight, not a full re-sign-off) before that slice integrates, per condition 5."
  ]
}
```
