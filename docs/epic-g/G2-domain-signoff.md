# G2 Gentrification-Domain-Expert Sign-Off — Public Methodology Page

- **Task:** #38 [G2] Public methodology page (content)
- **Reviews:** `docs/epic-g/G2-public-methodology-page.md`
- **Date:** 2026-07-02
- **Verdict: PASS**

---

## Scope of this review

Checks that the public page (a) correctly represents the theoretical framing (Dangschat,
Döring & Ulbricht, Smith), (b) honours the two hard guardrails from `index-definition.md` §1.2
(no unobserved displacement-event claims; small-area aggregate disclaimer), and (c) discloses
limitations honestly rather than overselling the index's certainty — the non-advocacy/transparency
editorial stance (ADR-0008; PROJECT_PLAN.md O3).

## Theory-and-ethics accuracy check

1. **§1 "what it is not"** — states plainly the index is not an individual predictor, not a
   displacement-occurrence claim, and not a policy recommendation, and repeats the ecological-fallacy
   guard (G-2) in plain language. **Correct and sufficiently prominent** (placed first, before any
   methodology detail).
2. **§3 Dangschat / Döring-Ulbricht framing** — accurately summarises the double invasion-succession
   cycle and correctly attributes the "social leads commercial" finding to both the thesis (p. 91) and
   the theoretical literature, without overclaiming causal identification (correctly hedged as a
   "process... with an order" rather than an isolated causal effect — consistent with W3 in the 2018
   critical assessment, tracked separately at #80).
3. **§2 D5 gap disclosure** — the improving-vulnerable tension cell and the "cannot distinguish
   incumbent-led improvement from gentrification-driven displacement" caveat are carried over verbatim
   in spirit from `index-definition.md` §1.3. This is the single most important honesty check for this
   page and it passes.
4. **§10.1 no-displacement-event guard (G-1)** — the page correctly uses "displacement-pressure signal"
   language and explicitly states the model cannot assert displacement *occurred*. No prohibited
   "post-displacement" framing anywhere on the page (checked via full-text scan).
5. **§10.2 rent-gap absence** — correctly discloses that Smith's rent-gap/capital driver is not
   represented in D1–D4, consistent with `index-definition.md` §0.4 Note B.
6. **§9 findings honesty** — the H3b collapse in the modern MSS era, and the "cannot tell from this
   data alone" framing, are presented without minimization or spin. This matches the non-advocacy
   stance (ADR-0008; O3) — the page lets a genuinely ambiguous result stand as ambiguous rather than
   picking the more flattering interpretation.
7. **§10.6 aggregate-only disclaimer** — repeated a second time in the limitations section (in addition
   to §1), appropriately given this is a socially sensitive topic (privacy/ethics framing anticipates
   G3, #39).

## Issues found

None blocking. One phrasing note (non-blocking): "risk/signal/pressure" framing in §10.1 is a direct,
correct restatement of the G-1 guardrail; recommend the eventual G3 privacy/ethics page cross-link
explicitly to this section once #39 is built, so a reader who lands on either page gets the same
guardrail language.

## Verdict

```json
{
  "verdict": "pass",
  "rationale": "The page correctly represents the Dangschat/Doring-Ulbricht theoretical framing, honours both hard guardrails from index-definition.md (no displacement-event claims; small-area aggregate disclaimer, stated twice), discloses the D5/rent-gap gaps plainly, and reports the H3b modern-era collapse without minimization -- consistent with the project's non-advocacy/transparency editorial stance (ADR-0008; PROJECT_PLAN.md O3).",
  "risks": [
    "Page currently stands alone without a direct cross-link to the future G3 privacy/ethics page (#39, not yet built)"
  ],
  "recommendations": [
    "Add a cross-link between this page and the G3 privacy/ethics page once #39 lands",
    "Re-check this sign-off if the D5 displacement dimension (Epic D) changes the improving-vulnerable framing in section 2/10"
  ]
}
```
