# I14 — PLR deep-dive profile: domain-expert framing sign-off

Ticket: `docs/epic-i/tickets/I14-plr-deepdive-profile.md` (#231)
Branch: `feature/231-i14-plr-profile` (diffed against `develop`)
Gate: ticket-specific gate — "domain-expert framing sign-off on the portrait wording patterns
(`I14-plr-profile-domain-signoff.md`, Verdict: PASS) — small-area characterizations are the
highest-misuse-risk text on the site." Not an R-C1-gated file path (`web/pages/**` is display-only,
no indicator/weight/normalization change), but the ticket imposes this sign-off as a binding
condition of its own acceptance criteria; honoured here in full.
Reviewer: PM session applying the domain criteria established in
`docs/epic-i/I15-oa-review-domain-signoff.md` (the binding OA framing conditions this ticket
inherits) and `docs/methodology/index-definition.md` / `docs/epic-i/storytelling-guide.md`
(stage wording, risk/signal/pressure framing rules) directly against the shipped diff and a full
local `evidence build` of all 556 pages (556 HTML files, incl. all 542 PLR routes).
Date: 2026-07-10

## Verdict: PASS

```json
{
  "verdict": "pass",
  "domain_rationale": "The portrait block is a deterministic template over already-published mart columns (gentrification_index stage/pressure, fct_gentrification_trajectory summary, mart_poi_offering_advantage_map domain mix) -- no new indicator, weight, or normalization; not R-C1-gated. The six stageWording entries map 1:1 onto ADR-0008's typology_stage values (index-definition.md Sec1.5 / lines 109-114) and use risk/signal/pressure language throughout (never \"is gentrifying\"), each paired with a link to /methodology -- satisfies storytelling-guide.md Sec3 rule 5. The improving-vulnerable case is reported as a named, deliberately unresolved tension cell, matching index-definition.md line 117's own framing (\"named tension cell, not a process stage\") rather than forcing it into a false certainty. Trajectory pace bands (status_delta bucketed into gradual/moderate/quickly) are labelled as display heuristics in the header comment, not a new statistical method, and the existing 'improving does not mean good for residents' caveat is preserved verbatim below the BigValues.",
  "i15_binding_conditions_checked": [
    "(a) compositional-not-count framing: OA intro paragraph and radar section frame every domain as 'a compositional read on the local place mix, not a count' and the portrait's mixSentence never states a business count -- satisfied.",
    "(b) symmetric negative framing: pct_vs_baseline is signed, the radar's min scale is fixed at -100% (the true floor given oa_domain >= 0), and the intro paragraph states 'a negative percentage means the opposite, under-representation, shown the same way' -- satisfied.",
    "(c) low-POI-base suppression/flagging: OA_LOW_BASE_THRESHOLD = 5, low-base domains get a dagger marker on the radar axis label plus a dedicated Alert listing counts; the portrait's own mixSentence filters topDomains through the same threshold before naming any domain -- satisfied (brings D-3 forward for the public display, as required).",
    "(d) no bare boosterish 'advantage' on the public number: percentages/axis labels never say 'advantage'; the section keeps its existing, already-linked title as an established term, and the prose explicitly reframes it as 'a descriptive mix/specialization signal, not a value judgment' -- satisfied."
  ],
  "theory_risks": [
    "Portrait prose is necessarily compressed (one sentence per dimension); a reader skimming only the portrait and not the caveats could still walk away with an oversimplified stage read. Mitigated by the immediate methodology link on the stage sentence and the page's existing 'Honest caveats' section, which now explicitly calls out the portrait as display-layer wording over published figures.",
    "District-average comparison lines (status/OA/rent) are simple unweighted means across PLRs in the same Bezirk -- a coarser aggregation than a population-weighted mean, so a Bezirk with a few very small or very large PLRs could show a district line that reads as more/less representative than it is. This mirrors the pre-existing citywide-average convention on /berlin/poi-map, so it is a consistent, not a novel, simplification; flagged here for awareness rather than blocking, since no new statistical claim is made beyond what the existing citywide pattern already established.",
    "The pace-band thresholds (0.4 / 1.2 status-index units) are a display heuristic invented for this ticket with no direct thesis citation for the specific cut points -- acceptable as qualitative flavour text (labelled as such in-code) but should not be read as a validated threshold; noting for the record per R-C2 spirit even though this file sits outside the strict R-C1 gated-path list."
  ],
  "recommendations": [
    "No blocking changes required. Optional follow-up (non-blocking, can be filed if desired): cite the specific pace-band thresholds' provenance (or explicitly label them 'illustrative, not validated') the next time this file is touched, for R-C2-style rigor even though web/pages is not a gated path.",
    "Keep the I15 binding conditions front-of-mind if OA display is ever extended to other pages (e.g. I16) -- this sign-off covers only the /berlin/area/[code] instance."
  ]
}
```

## Narrative

**(1) Does the portrait honour the six-stage typology honestly?** Yes. Cross-checked each of the
six `stageWording` strings against `docs/methodology/index-definition.md` Sec1.5 (the ADR-0008
D1xD2 matrix) line by line: `stable-established`, `pre-gentrification`, `pioneer-signal`,
`active-gentrification`, `consolidation-pressure` all correctly reflect their documented status/
dynamism combination without overstating certainty, and `improving-vulnerable` is explicitly
presented as an unresolved, named tension cell rather than resolved into a false stage — matching
the source doc's own caution (line 117-119: "a named tension cell... reporting the ambiguity
explicitly is better than forcing it into `pioneer-signal`"). Every stage sentence links to
`/methodology` for "what this does and doesn't mean," consistent with `storytelling-guide.md`
Sec3 rule 5 (risk/signal/pressure framing, never a bare causal claim).

**(2) Does the OA display honour the I15 binding conditions?** Yes, all four are verifiably
implemented in the shipped diff (see `i15_binding_conditions_checked` above), not just
described in a code comment. Confirmed by reading the rendered radar section prose, the
`radarMinScale = -100` constant, the `OA_LOW_BASE_THRESHOLD = 5` + dagger-marker + Alert block,
and the absence of the word "advantage" anywhere near a numeric percentage in the built HTML.

**(3) Do the sparse-case degradations avoid overclaiming?** Yes. Verified against a real
uninhabited PLR in the local `evidence build` output (`build/berlin/area/03300515/index.html`)
that the page renders the "classified as uninhabited... figures do not apply here" sentence and
the existing `<Alert>` for "no current stage applies here," rather than silently showing a
misleading null-derived stage. The `<2` trajectory-edition and `oaRows.length === 0` branches
similarly decline to make a claim rather than guessing.

**(4) Is the "Honest caveats" section sufficient?** Yes — it now explicitly names the portrait
as "display-layer wording over already-published mart figures," restates the multi-signed/
descriptive-not-causal OA framing, and keeps the pre-existing status-line-direction and
land-value/rent caveats. This satisfies the ticket's misuse-risk concern at the page level, not
just in isolated sentences.

## Scope of this PASS

Covers the domain-framing correctness of the portrait wording patterns and the OA %-display
integration on `/berlin/area/[code]` only, as shipped in `feature/231-i14-plr-profile` diffed
against `develop`. Does not re-open I15's own OA-formula PASS (unchanged here) and does not
extend to any other page that may reuse this wording pattern in future (e.g. I16) — those would
need their own review.
