# I15 — Offering-Advantage review: gentrification-domain-expert sign-off

Ticket: `docs/epic-i/tickets/I15-oa-calculation-review.md` (#232)
Branch: `feature/232-i15-oa-review` (diffed against `develop`)
Gate: R-C1 dual methodology gate — this is the **domain** half; `geo-data-scientist`
(`I15-oa-review-geo-signoff.md`) covers statistical soundness independently.
Reviewer: gentrification-domain-expert
Date: 2026-07-10

## Verdict: PASS (with binding downstream framing conditions)

```json
{
  "verdict": "pass",
  "domain_rationale": "This branch makes no formula/weight/normalization/spatial-method change to the OA mart (verified: the SQL diff is documentation/citation-only; schema.yml and the A3 findings table are doc-only). The underlying construct — a 3-level nested location quotient of retail/amenity mix, parent-relative, confirmed algebraically identical to the thesis SQL (71_oa.sql / 70_oa_helper.sql, thesis pp. 55-56, 91) and hand-reconciled to floating-point exactness for the bug-report PLR 04200311 and five others — remains a faithful and defensible operationalization of the thesis Offering Advantage. The reported 04200311 symptom is correctly diagnosed as a page-query display defect (leaf-grain rows charted without de-duplication), not a mart or theory defect; oa_domain being constant across a domain's sibling leaves is correct LQ semantics. The model header preserves the domain guardrails I require (D-1 descriptive-not-causal; D-2 multi-signed bundle with vacancy-OA as a Smith rent-gap disinvestment marker). Domain fidelity of the mart and of the review's conclusions holds.",
  "theory_risks": [
    "LQ-as-percentage misreading: 'pct_vs_baseline = (oa-1)*100' turns a *compositional share ratio* into a precise-looking percentage that a lay reader will hear as a count/density claim ('93% more restaurants') rather than 'this domain is ~1.9x its citywide share of the local place mix'. False-precision risk, amplified vs a bare ratio.",
    "Low-POI-base instability (D-3, deferred per ADR-0017 D5): a single POI can swing a leaf's local share, so a '+205%' in a sparse PLR is noise dressed as precision. Going to a precise percentage display makes the missing minimum-base suppression more urgent, not less.",
    "Boosterism / non-advocacy collision (O3/O4): the word 'advantage' plus a positive percentage valorizes exactly the amenity-upscaling (Zukin third-wave retail) that can accompany displacement — risks reading as an 'up-and-coming Kiez, invest here' signal, which D-1 explicitly forbids.",
    "Multi-sign flattening (D-2): presenting a single per-domain '+X%' invites cherry-picking amenity-OA as 'the gentrification number' and mis-signing vacancy-domain OA (which marks the pre-reinvestment trough, the opposite pole).",
    "Live-display distortion today: the current radar plots one point per leaf row, so subtype-rich domains occupy disproportionate radar area and repeat their label — correct numbers, distorted visual weighting — and this is publicly visible now while the fix is deferred to I14."
  ],
  "recommendations": [
    "PASS releases only the doc/citation branch. It does NOT bless the current live radar and does NOT release I14 or I11-post-3 from the framing conditions below — those remain gated as the SPEC states.",
    "Live-display remediation is expected, not optional: either expedite a minimal GROUP BY / DISTINCT-by-domain (or read mart_poi_offering_advantage_map) fix for the radar, or add a short interim caveat, rather than letting the distorting radar sit live indefinitely awaiting I14's full rework. If I14 slips materially, this escalates to the PM.",
    "Binding conditions on I14 before it ships any OA % display: (a) label it as compositional over/under-representation of the *place mix*, never a count; (b) show under-representation symmetrically as negative, do not hide the < baseline side; (c) suppress or clearly flag low-POI-base PLRs before showing a percentage (bring D-3 forward for the public %); (d) avoid the bare word 'advantage' on the public number, or caveat it — this is a descriptive mix indicator, not a desirability score.",
    "Binding conditions on I11 post 3 wording: (a) describe the fix honestly as a chart de-duplication, NOT a 'data correction' — the numbers were always right; overclaiming a data fix is dishonest in the other direction and erodes trust; (b) carry the D-1 descriptive-not-causal caveat; (c) respect D-2 multi-sign — do not sum oa_* and do not present amenity-OA as a standalone 'how gentrified' score; if vacancy-OA appears, explain its opposite (rent-gap) sign; (d) note low-base instability.",
    "For geo-DS (not my gate): confirm the small A3 Spearman-rho drifts in the findings-table diff (e.g. domain 0.765->0.764; sonstiges type 0.787->0.810) are rebuild noise, not a silent recompute — from a domain lens the movers are the residual 'sonstiges' catch-all and best-5 rank swaps, immaterial to interpretation, but the statistical gate should confirm provenance."
  ]
}
```

## Narrative

**(1) Is OA still a defensible operationalization?** Yes. The construct is unchanged and
faithful: a parent-relative 3-level location quotient of the POI/retail composition,
matching the thesis definition column-for-column and hand-reconciled exactly. As theory,
LQ-of-commercial-mix is a standard descriptive read on retail specialization and, at the
amenity end, on the third-wave/boutique retail shift associated with early gentrification
(Zukin 2009; Ley 1996; Dangschat 1988 invasion-succession applied to the retail landscape;
Lees/Slater/Wyly 2008). The model's D-1/D-2 interpretation notes correctly hold it as a
*descriptive* indicator and a *multi-signed bundle* (vacancy-OA as a Smith 1979/1987
rent-gap disinvestment marker at the opposite pole from amenity-OA). The finding that no
formula change was needed is credible and independently reconciled. Domain-valid.

**(2) Is deferring the visible fix to I14 acceptable?** Acceptable, conditionally. The
crucial protection is already in place: the headline amplification (I11 post 3) and any
OA-derived % wording in I14 are gated off until this sign-off, and the SPEC scoped a
page-query-only defect to a web follow-up. So the deferral does not amplify the distortion.
However, the current radar *is* mildly and publicly misleading now — not in its numbers,
which are correct, but in visual weighting (subtype-rich domains get more axes and more
area) and in repeating domain labels. That is a bounded public-honesty issue. I do not
block the doc-only branch over a pre-existing display bug it did not introduce and explicitly
de-scoped — blocking would only delay beneficial R-C2 citation grounding without fixing the
page. Instead I attach the live-display remediation as a firm expectation (recommendation 2):
fix it promptly or caveat it; do not let it ride indefinitely on I14's timeline.

**(3) Is "% vs citywide baseline" honest?** Arithmetically trivial and fine; the risk is
entirely in labeling. `(oa-1)*100` is honest only if it is framed as a *compositional*
over/under-representation of the local place *mix*, shown symmetrically (negatives too),
suppressed/flagged for low-POI-base PLRs, and stripped of boosterish "advantage = good"
connotation. A precise-looking percentage raises the false-precision and non-advocacy stakes
above those of a bare ratio, so the D-3 minimum-base guard and neutral wording become
conditions of shipping it, not nice-to-haves. These are binding on I14 (recommendation 3).

**(4) Wording for I11 post 3 / I14 portrait text.** Because this review found a *display*
bug and *not* a data bug, the single most important honesty point is to describe the fix as a
chart de-duplication, never as "we corrected our numbers" — the OA values were always right.
Beyond that, standard OA guardrails apply: descriptive-not-causal (D-1), respect the
multi-signed bundle and never present amenity-OA as a standalone gentrification score (D-2),
and caveat low-base instability. Binding on I11 post 3 (recommendation 4).

## Scope of this PASS

This PASS covers domain fidelity of (i) the OA mart/formula as unchanged by this branch and
(ii) the review's root-cause and reconciliation conclusions, plus the ADR-0018 R-C2 citation
additions. It explicitly does **not** bless the current live radar and does **not** waive the
binding framing conditions on I14 and I11 post 3, which remain gated per the SPEC. Integration
of this doc-only branch into `develop` is unblocked from the domain side once the
`geo-data-scientist` records its own PASS.
