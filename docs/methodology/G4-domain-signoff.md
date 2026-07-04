---
task: G4 / #138 — backfill status_class_bi/dynamism_class_bi for the live_data variant
author: gentrification-domain-expert
date: 2026-07-04
model: transform/models/marts/gentrification_index.sql
---

# Domain-expert sign-off — G4 live_data binary classification backfill

## Framing question this ticket raises

This backfill is the field a first-time visitor will actually read as "is this area under
gentrification pressure" once the site defaults to `live_data` (index.md's headline counts and
"top pressure areas" leaderboard both key off `dynamism_class_bi`/`status_class_bi`). The domain
question is not statistical (that's geo-DS's remit) but **interpretive**: does grouping
`niedrig`/`sehr_niedrig` into one `low`-status bucket, and reading `dynamism_class_bi = negative` as
"high pressure", still match the invasion-succession / double-cycle framing (Dangschat 1988) this
project uses, and avoid overclaiming?

## Assessment

1. **Status bucket grouping (`hoch→high, mittel→medium, {niedrig,sehr_niedrig}→low`).** Consistent
   with the project's existing typology-stage naming
   (`transform/models/intermediate/int_gentrification_ts.sql`'s `typology_case`): D1=3 and D1=4 both
   route to `pioneer-signal`/`pre-gentrification`/`improving-vulnerable` — i.e. the existing typology
   *already* treats niedrig and sehr_niedrig as functionally the same "low-status, gentrification
   relevant" tier, distinguishing them only by D2 direction, not by D1 alone. Collapsing them into one
   `low` bucket for the coarse binary field does not introduce a distinction the typology didn't
   already treat as secondary. No overclaim: `status_class_bi` is presented as a status *level* label,
   not a stage assertion — the stage narrative (typology_stage / `status_class`) is unaffected and
   remains the richer, correctly-hedged field.
2. **Dynamism relabel and the "negative = high pressure" framing.** `web/pages/index.md` and
   `web/pages/maps.md` already carry an explicit polarity-note `<Alert>` ("a negative dynamism class
   means higher gentrification pressure") — this backfill does not change that framing, it makes the
   *existing* framing finally render for `live_data` instead of showing blank/null. The MSS Dynamik
   `negativ` class (worsening benefit-recipient share vs. the city average) is the Senate's own
   *social* dynamik reading (D2, an outcome per ADR-0008 §1), which is a materially better-grounded
   basis for "pressure" language than the thesis-era POI-churn proxy it replaces on the live variant —
   this is a framing *improvement*, not a new risk.
3. **Non-advocacy / evidential-language check (ADR-0008 §5).** The backfilled fields are categorical
   labels over an official, cited social-monitoring class, not a market or speculative signal. The
   "top pressure areas" leaderboard (index.md) already uses hedged framing ("gentrification pressure"
   not "is gentrifying"); this ticket adds no new certainty claim.
4. **Ecological-fallacy guardrail (G-2, index-definition.md §1.2).** Unaffected — these are still
   PLR-level aggregates; the backfill doesn't change grain or add any individual-level inference.

No condition blocks integration. One non-blocking note for the follow-on web-engineer step: when
`index.md`/`maps.md` switch their default to `live_data`, the existing polarity `<Alert>` text should
be reviewed once more (not required for *this* ticket, since the alert already covers the general
polarity direction correctly) to confirm it still reads naturally once `live_data` is the default
rather than a toggle option — tracked under #141 (G6 storytelling refinement), not blocking here.

```
Verdict: PASS
Ref: ADR-0008 §1, §5 (non-advocacy stance); int_gentrification_ts.sql typology_case (existing
niedrig/sehr_niedrig treatment); index-definition.md §1.2 (ecological-fallacy guardrail)
Conditions: none blocking. Non-blocking note carried to #141.
```
