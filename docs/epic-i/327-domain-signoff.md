---
task: I / #327 — Presentation-philosophy scoping: domain review + takeaways wording sign-off
reviewer: gentrification-domain-expert (independent half of the ticket's joint authorship)
date: 2026-07-31
branch: epic-i/327-presentation-scoping
scope: reviews docs/epic-i/327-presentation-philosophy-scoping.md; signs off web/pages/takeaways.md
---

# Domain review — #327

## 1. Independent review of the scoping doc

**Claim (1) — no live page renders a blended predictor+outcome number: CONFIRMED, and stronger
than stated.** My own grep of `web/pages/**` returns zero hits for `legacy_gentrification_score`,
`gentrification_score`, `gentrification_delta`. I also checked `own_idx_class` (the thesis's *other*
compressed artefact, the EWR/D4 own-index class): it appears only in prose on `methodology.md:295`
and `hamburg/index.md`, never in a query. `ewr_composite`, `rent_pressure_proxy`, `turnover_proxy`
are likewise display-absent. ADR-0008's Option-A residue is genuinely model-layer only.

**Claim (2) — leave the six-stage typology and rollup dominant-stage as-is: THEORETICALLY SOUND.**
A named stage is a *typological* claim, not a metric one, and pairing it with D1/D2 is what makes it
falsifiable by the reader. Dangschat's (1988) double invasion-succession cycle is inherently
two-axis (status level × direction of movement); collapsing it to one number destroys exactly the
distinction — a rent-gap-rich deprived area improving fast (Smith 1979) vs. an affluent stable one —
that the typology exists to preserve. `improving-vulnerable` is the model refusing a clean verdict,
which is the honest move. #267 (no re-scored coarse index) and #310 (composition counterweights on
rollups) already settled this; re-opening it would be regression, not progress.

**Claim (3) — `methodology-oa-modes.md` as house style: APT.** Its "OA is not one number... never
blended into one composite score" is the site's cleanest statement of within-dimension separation.
One nuance for the maintainer: OA is a *predictor-side* (D3) rule. Adopting it as house style must
not be read as licence to blend across D1/D2/D3/D4 provided the components are shown — the
predictor/outcome firewall (ADR-0008) is a stricter, separate constraint.

**Correction — §3 row 4 is factually wrong at the display layer.** The doc calls
`mart_area_demographics` "the one Hamburg-demographics surface that *is* public" showing
`unemployment_share` individually. It is not public: every Hamburg demographics section renders
`<NotYetPublished>` (`hamburg/area/[code].md:280`, `district/[code].md:217`,
`subarea_l1/[code].md:215`), `unemployment_share` appears nowhere in `web/pages/**`, and
`timeline.md:140` states the Hamburg demographics display is still "an open maintainer ruling."
#313's PASS is a *mart*-layer precedent, not a display precedent. This inverts the doc's framing:
the Hamburg demographics display is the one genuinely open display decision, and #327 should inform
how it is built rather than cite it as already-resolved. #329's D-C3/D-C4 conditions are therefore
prospective, not live — still binding, not yet breached.

**Addition — one surface the inventory missed.** `index.md:119–130` renders BigValues "High/Low
gentrification pressure" from `count(*) filter (where dynamism_class_bi = ...)` — a *single* D2
ordinal presented under the site's two-axis construct name, with no D1 alongside in the BigValue
itself. This is the inverse of the doc's multi→one frame (one indicator over-generalised to a
multi-dimensional construct), which is why a compression-only inventory could not catch it.
Theoretically, "pressure" without status level is under-determined. Severity: low — the caption
below decodes it and `top_pressure` pairs both axes — but it belongs on the maintainer's list.

## 2. Sign-off: `web/pages/takeaways.md` wording fix (standalone)

"today's commerce tracks, at a lag, tomorrow's social change" is theoretically accurate. It states
temporal ordering and co-movement, not causation or forecast — the only claim the evidence supports
(E4 out-of-time AUC 0.4445, below chance). Substance is preserved: "today's/tomorrow's" retains the
lead-lag direction Dangschat's ordered sequence requires, and the change removes the tension with
the same paragraph's "not as a stand-alone predictor." Non-blocking nits: "X tracks Y at a lag"
can read as X *following* Y (the today's/tomorrow's anchors resolve it; "moves ahead of" would be
crisper), and line 44 is now 105 chars vs. the file's ~95 prose wrap — reflow if convenient.

## 3. Scoping doc as a co-authored recommendation

Central conclusion — the site's display layer already carries ADR-0008's commitment, and no backlog
of surfaces needs decompressing — is correct and independently verified. Two items above (the row-4
correction, the home-page BigValue) should be recorded alongside it; neither overturns it. This is
not an integration gate for the doc's recommendations, which remain maintainer calls.

```json
{
  "verdict": "pass",
  "domain_rationale": "Verified independently: no public surface blends predictor and outcome into one number; the two live compressed artefacts (six-stage typology, rollup dominant stage) pair their components and are correct under two-axis invasion-succession/rent-gap theory and ADR-0008/#267/#310. The takeaways wording fix moves a forecast claim to a lagged-co-movement claim, which is what the evidence supports.",
  "theory_risks": [
    "Row 4 misstates Hamburg demographics as a live public display; it is NotYetPublished and still an open maintainer ruling, so #327 should govern its design rather than cite it as precedent.",
    "index.md 'High/Low gentrification pressure' BigValues render a single D2 ordinal under a two-axis construct name; 'pressure' is under-determined without status level.",
    "Adopting the OA 'never blend' rule as house style must not be read as permitting cross-dimension blending when components are shown; the predictor/outcome firewall is stricter."
  ],
  "recommendations": [
    "Correct §3 row 4 before presenting to the maintainer; reframe Hamburg demographics as the open decision this ticket informs.",
    "Add the index.md BigValue framing to the maintainer's list (low severity, caption mitigates).",
    "Land the takeaways.md fix now; optionally reflow line 44."
  ]
}
```

Takeaways wording fix verdict: PASS

Scoping doc verdict: READY FOR MAINTAINER REVIEW (with the §3 row-4 correction applied)
