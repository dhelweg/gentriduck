# D3-brw-wire Domain Sign-off — wiring `brw_trend` into `int_gentrification_ts` (#273)

- **Author:** gentrification-domain-expert
- **Date:** 2026-07-16
- **Scope:** urban-sociology/housing-policy validity of threading `brw_trend`/`brw_yoy_pct_change`
  (`int_berlin_brw_trend`, #263) through `int_gentrification_ts` as new predictor/lead-side columns
  (Berlin `lor_2021` branch only), discharging D3-brw-trend-domain-signoff Recommendation D6's
  wiring follow-up.
- **Artefacts reviewed:** `transform/models/intermediate/int_gentrification_ts.sql` (new `brw_2021`
  CTE, join, and NULL-cast columns), `transform/models/intermediate/schema.yml` (new column blocks),
  `docs/methodology/index-definition.md` row 475 (updated), and the companion
  `docs/methodology/D3-brw-wire-geo-signoff.md`.
- **Companion gate:** geo-data-scientist statistical sign-off — `PASS` (see above), required before
  the PM may integrate.

## Assessment

### a. Does adding `brw_trend` as a bare predictor column (no new composite, no typology change) preserve the interpretive discipline established at #263?

**Yes.** The wiring adds two new stand-alone columns to `int_gentrification_ts` without touching the
D1×D2 typology (`typology_stage`), the D1/D2 outcome columns, or the D4 `ewr_composite` baseline. No
new arithmetic combines `brw_trend` with any existing column. This is exactly the discipline my own
#263 sign-off (Condition D4) required — "state the predictor/lead-side placement and change-positive
polarity explicitly at any future integration point; never blend unsigned into a vulnerability
composite" — and I confirm no blending has occurred here.

### b. Is the "not yet surfaced on the published `gentrification_index` mart" scope decision sound from a domain standpoint?

**Yes.** `brw_trend` is a single land-value-appreciation indicator, not a status/dynamism-typology
replacement (unlike the OA-B.3 `improved` variant, which substitutes a full alternative predictor
*pair* for the existing D3 POI predictors while still supporting its own typology-adjacent reading).
Forcing a bare change-signal into the mart's `status_index`/`dynamism_index` variant slots would
misrepresent it to public consumers as a status/dynamism-equivalent measure, when it answers a
narrower, different question ("is land value appreciating here, relative to the city, right now").
Leaving it un-published pending a deliberate future contract-extension ticket avoids that
misrepresentation risk. I concur with the geo sign-off's assessment here.

### c. Does the branch-scoping (Berlin `lor_2021` only, explicit `NULL` elsewhere) avoid manufacturing a false impression of coverage?

**Yes.** `int_berlin_brw_trend` has no `lor_pre2021` or Hamburg rows; the wiring correctly casts
`NULL` in `joined_pre2021`/`joined_hamburg` rather than attempting any cross-vintage or cross-city
proxy. This is the right call — Berlin's BRW back-series depth for the pre2021 system and any
Hamburg BRW-equivalent sourcing are both genuinely open, unresolved questions (per the #263
sign-off's own back-series-depth condition D5), and silently backfilling either branch would
overstate this signal's actual coverage to any downstream reader of `int_gentrification_ts`.

### d. Ecological-fallacy / individual-inference and "not a displacement outcome" guardrails — do they travel correctly into the wired columns?

**Yes.** The new `schema.yml` column descriptions restate both: the change-positive polarity warning
(opposite the vulnerability-positive convention of the D1/D2/D4 columns) and the "not a measured rent
or displacement outcome — read jointly with low-status/low-Wohnlage context" caveat from my #263
sign-off (Conditions D1/D2). Since this ticket does not yet surface the column publicly, the G-2
ecological-fallacy caveat travels forward as a condition on any *future* public surfacing rather than
requiring new disclosure text today.

### e. Any new theoretical concern introduced by the wiring itself (as opposed to the underlying signal, already reviewed at #263)?

None. This ticket is purely a placement/threading operation on an already-approved construct; it
introduces no new indicator, weighting, or normalization decision of its own. My review here is
narrowly about whether the *placement* preserves the discipline established at #263 — it does.

---

## Verdict

```
Verdict: PASS
```

**Rationale.** The wiring correctly discharges Recommendation D6 of my own #263 sign-off: `brw_trend`
is threaded into `int_gentrification_ts` as a clean, non-blended predictor/lead-side column pair,
correctly scoped to the Berlin `lor_2021` branch with explicit, honest `NULL` elsewhere (no
manufactured coverage), and the decision to defer any public/mart surfacing to its own future
contract-extension ticket avoids misrepresenting a single land-value-change indicator as a
status/dynamism-typology-equivalent measure. No defect requiring rework.

### Conditions (must be satisfied before `brw_trend` is surfaced on any published mart, dashboard, or G2 page)

- **D1 — Carry forward all five conditions (D1-D5) of the #263 domain sign-off unchanged** — they
  bind at any future public-surfacing point, not just at this wiring step.
- **D2 — Any future `gentrification_index`/dashboard surfacing must not present `brw_trend` as a
  status/dynamism-typology-equivalent measure** — it answers a narrower question (relative land-value
  appreciation) and must be labelled as such, distinct from the D1×D2 MSS typology.

### Recommendations (non-blocking)

- **D3 — When #258 (D5-wire) and/or #260 (R-A8b, 7-edition trajectory panel) are picked up**, the
  joint `brw_trend` × B1-proxy reading flagged at #263 Recommendation D6 remains a live, undecided
  question for those tickets' own gates — not resolved by this wiring step.

---

*Methodology gate (R-C1): this is the gentrification-domain-expert sign-off, required alongside
the geo-data-scientist `PASS` above before the PM may integrate into `develop`.*

## Sources

- `docs/methodology/D3-brw-trend-domain-signoff.md` (Conditions D1-D5, Recommendation D6 — the
  wiring follow-up this ticket discharges)
- `docs/methodology/D3-brw-wire-geo-signoff.md` — companion statistical sign-off
- ADR-0008 (predictor/outcome/covariate placement discipline)
- ADR-0004 (`gentrification_index` governed contract)
- Smith, N. (1979). "Toward a theory of gentrification: a back to the city movement by capital, not
  people." *Journal of the American Planning Association*, 45(4), 538–548.
