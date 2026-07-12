# I18-web-b (#249) — MSS status/Dynamik at BZR/Bezirk grain: gentrification-domain-expert sign-off

**Ticket:** #249 (I18-web-b, follow-on to #247's deferred MSS-at-BZR content)
**Branch:** `feature/249-i18-web-b-mss-mart` (diffed against `develop`)
**Reviewer:** gentrification-domain-expert (urban-sociology/housing-policy framing gate)
**Date:** 2026-07-12

## What I checked

1. **The specific recommendation `I18-web-domain-signoff.md` left for this follow-up is
   satisfied.** That sign-off said: *"When the follow-up MSS-at-BZR ticket lands, it should get
   its own domain-expert pass on how a population-weighted-mean-of-ordinals 'status' is described
   to a lay reader... that caveat needs to survive into any public-facing copy, not just the model
   comment."* Both new page sections lead with a visible `<Alert status="info">` (not buried in a
   footnote) stating plainly: this is an *approximation*, not the Senate's own classification; the
   Senate's own method can produce a different class for a borderline area than this estimate
   shows; "treat this as directional, not authoritative." This is lay-reader-appropriate language,
   not statistical jargon ("population-weighted mean of ordinals" only appears in the SQL comment
   and this sign-off, never in the rendered page copy) — correct register for a public audience.
2. **No implied authority the data doesn't have.** Section heading is "Approximate status &
   change (district/BZR-level *estimate*)" — "estimate" and "approximate" appear in the heading
   itself, not just the alert body, so a skimming reader who doesn't read the alert text still
   sees the hedge. Every `BigValue` label is prefixed "Estimated" (stage, status index, Dynamik
   index) — three independent places a reader could encounter the number, three independent hedges.
   This meets the bar set by the existing PLR-page precedent (where the *actual*, non-approximated
   `gentrification_index` figures are shown without a hedge, since those are the governed,
   ADR-0004 output) — the contrast in framing strength between "the real index" (PLR) and "an
   estimate of what the real index would show at this grain" (BZR/Bezirk) is the correct signal to
   send, and it is sent consistently.
3. **No stigmatizing indicator is newly surfaced.** This section renders only status
   classification (`status_index`, `dynamik_index`, `typology_stage`) — no raw composition
   indicator (`foreigners_share`, `migration_background_share`) is added or referenced here. The
   I19-web five conditions on those indicators (PLR-page-only) are untouched and not reopened by
   this diff.
4. **Typology-stage vocabulary is unchanged.** `typology_stage` values (`consolidation-pressure`,
   `stable-established`, `active-gentrification`, `pre-gentrification`, `pioneer-signal`,
   `improving-vulnerable`) are the same six ADR-0008 stage names already domain-approved for the
   PLR page (`I14-plr-profile-domain-signoff.md`) and reused verbatim for the coarse-grain "stage
   mix" count in #247 — no new label, no new gloss to separately vet.
5. **No causal or evaluative language.** "Rising pressure" / "stable" framing for the Dynamik axis
   is descriptive of the index's own definition (already established site-wide), not editorialized
   ("gentrifying fast," "at risk," etc. are avoided).
6. **Graceful absence, not a stub, when data is missing.** The `{#if mss && mss[0]}...{:else}` guard
   shows a plain "No ... estimate available for this area" warning rather than a blank chart or a
   misleadingly-precise zero — consistent with the site's established suppressed/missing-data
   pattern.
7. **Grain-appropriate caveat strength.** The BZR section's alert adds BZR-specific wording that
   boundary effects are "more likely to bite" at that finer grain — an accurate framing choice (143
   BZR units vs. 12 Bezirk units means more borderline-classification opportunities at BZR grain),
   not a generic copy-paste across both page templates. This is the kind of grain-sensitive honesty
   this pass exists to check for.

## Recommendation

Approve. The caveat this ticket was specifically created to add is present, in lay-reader
language, in a visually prominent position (a top-of-section Alert plus three independently-hedged
BigValue labels), and correctly differentiated by grain. No stigmatizing indicator is newly
surfaced, and the typology vocabulary is unchanged from its existing domain-approved definition.

```json
{
  "verdict": "pass",
  "rationale": "This ticket exists to satisfy I18-web-domain-signoff.md's specific recommendation that the population-weighted-mean-of-ordinals approximation caveat survive into public-facing copy, not just the SQL comment -- confirmed present, in plain lay-reader language, on both new BZR and Bezirk page sections (Alert block + section heading + three independently-hedged BigValue labels, so a reader encounters the hedge regardless of how much of the page they read). Grain-specific wording (BZR boundary risk called out more strongly than Bezirk) is an accurate, non-generic framing choice. No new stigmatizing indicator (foreigners_share/migration_background_share) is surfaced; the six-stage ADR-0008 typology vocabulary is reused unchanged from its existing domain-approved definition. Missing-data handling degrades gracefully with an honest message rather than a misleading blank/zero.",
  "risks": [
    "None new. Residual risk is the same MAUP/boundary-mismatch limitation the underlying B10/#120 model already carries -- this pass's job was to surface it to lay readers, which it does."
  ],
  "recommendations": [
    "If usage/feedback ever shows readers skipping the Alert and treating the BigValue numbers as authoritative despite the 'Estimated' prefix, consider a stronger UI treatment (e.g. a distinct visual style from the governed PLR-page index values) in a future ticket -- not required to ship this one."
  ]
}
```
