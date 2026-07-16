# D3-brw-change Domain Sign-off — BRW change / rent-gap-realisation signal (#263)

- **Author:** gentrification-domain-expert
- **Date:** 2026-07-16
- **Scope:** urban-sociology/housing-policy validity of `int_berlin_brw_trend` — a per-PLR,
  per-year z-scored, percentage year-over-year change in area-weighted Bodenrichtwert
  (`int_berlin_brw_plr`), as an explicit **rent-gap-realisation / upgrading-pressure** signal
  contributing to the D3 price/rent dimension's predictor/lead side (ADR-0008).
- **Artefacts reviewed:** `transform/models/intermediate/int_berlin_brw_trend.sql`,
  `transform/models/intermediate/schema.yml` (new block), `docs/epic-d/d3-price-rent-domain-signoff.md`
  (point D5, the deferral this ticket discharges), and the companion
  `docs/methodology/D3-brw-trend-geo-signoff.md`.
- **Companion gate:** geo-data-scientist statistical sign-off — `PASS` (see above), required
  before the PM may integrate.

## Assessment

### a. Is "BRW rising faster than the citywide PLR average" a defensible rent-gap-realisation proxy?

**Yes, and it is the theoretically cleaner half of the BRW story the original D3 sign-offs already
flagged as the more valuable signal.** Smith's (1979) rent gap is the difference between a parcel's
*potential* capitalised ground rent and its *actually realised* rent under current use; the BRW
*level* (already wired as D3) is one term of that gap (potential/capitalised value), but a level
alone cannot say whether the gap is being *closed* — i.e. whether upgrading pressure is actually
materialising — only that it structurally exists or doesn't. A PLR whose land value is rising
faster than the city average is, by construction, one where that structural precondition is
actively converting into realised value appreciation: exactly the "rent-gap realisation" event
Smith's framework describes, and exactly what my own D3 domain sign-off (point D5) already
identified as "the theory-valuable, separately-built signal." This model builds precisely that,
with no departure from the pre-approved framing.

### b. Is the level-vs-change separation preserved, and is the polarity direction I required at D3 correctly implemented?

**Yes.** My D3 sign-off required that any BRW change signal be built as "an explicit, separately-
polarised change indicator, distinct from the level" — this model does exactly that: it is a
standalone model (`int_berlin_brw_trend`), not a column folded into `int_berlin_brw_plr`, and its
header explicitly states the change-positive polarity (high = upgrading pressure being realised)
is the *opposite* convention from a vulnerability composite. This is the correct direction: rising
land value ahead of current use is an upgrading/pressure signal, and treating it as
vulnerability-positive (as if it were itself a deprivation indicator) would be a category error I
specifically warned against at D3. I confirm no such error is present here.

### c. Percentage-change basis — does converting to a relative measure change the theoretical reading?

**No, and it is the more defensible reading for cross-PLR comparison.** A PLR at a low absolute BRW
base rising the same number of EUR/m² as a high-base PLR represents a materially larger relative
shift in that area's land-value trajectory — precisely the kind of area that rent-gap theory
predicts is a live gentrification frontier (low current value, rapid relative appreciation), as
distinct from an already-expensive area continuing to appreciate in absolute terms from a high
base. The percentage-change basis surfaces the former case correctly rather than letting it be
swamped by absolute-EUR comparisons dominated by already-expensive PLRs. This is theoretically
appropriate, not merely a statistical convenience.

### d. Single-indicator vs. composite framing — is it appropriate that this is NOT yet wired into any composite or the governed index?

**Yes, and for the same reasons already established for the B1 proxies.** `brw_trend` sits on the
predictor/lead side of the index (ADR-0008) rather than the D1/D2 MSS outcome side, and it measures
a fundamentally different mechanism (land-value appreciation) from the B1 displacement proxies
(policy designation, rent/transfer-stress, resident turnover). Blending it into any of those without
an explicit, separately-gated weighting decision would obscure which mechanism drives a combined
score — the same interpretability argument I made for keeping the turnover proxy distinct
(B1-turnover-domain-signoff §c) applies here. I concur with the geo sign-off's Condition C1 that any
future promotion must state the predictor/lead placement and change-positive polarity explicitly,
not simply pool it into an existing composite.

### e. Ecological-fallacy / individual-inference guardrail

Same standard PLR-aggregate caveat as every other signal in this pipeline (G-2,
`index-definition.md` §1.2): a high `brw_trend` describes area-level land-value appreciation
relative to other PLRs, not any specific resident's or building's outcome. Additionally specific to
this construct: land value is not realised rent and not a displacement outcome — a PLR can show
strong `brw_trend` from land speculation, new-build permitting activity, or commercial redevelopment
without any residential displacement occurring at all. This must never be surfaced alone as "this
area is experiencing displacement"; it should be read jointly with low-status/low-Wohnlage context
(as I already required at D3) before any displacement-risk framing is attached.

### f. Back-series depth (2018–2024, 7 change-years)

Benign for now. Seven annual change observations per PLR is a shallow but genuine time series;
sufficient to identify relative year-over-year outliers (the stated purpose here) but too shallow
for any longer-run trend-slope or trajectory-clustering use — flagging this so a future consumer
(e.g. if #260's 7-edition trajectory panel or #258's D5 sub-index ever wants to fold this in) does
not over-read stability/volatility from only seven points.

---

## Verdict

```
Verdict: PASS
```

**Rationale.** The construct directly discharges the exact deferral my own D3 domain sign-off (point
D5) flagged, with no departure from the pre-approved framing: it is built as an explicit, separately
-polarised change indicator (not folded into the level), correctly placed on the predictor/lead side
per ADR-0008, correctly signed as change-positive (opposite the vulnerability convention), and its
interpretive limits (land value ≠ realised rent, not a displacement outcome, shallow back-series
depth) are disclosed rather than hidden. No defect requiring rework.

### Conditions (must be satisfied before this signal is surfaced on any published mart or G2 page)

- **D1 — Never present in isolation as "displacement is happening here."** Any public framing must
  state this measures relative land-value appreciation (a rent-gap-realisation / upgrading-pressure
  proxy), not a measured rent or displacement outcome, per assessment (e) above.
- **D2 — Read jointly with low-status/low-Wohnlage context** before any displacement-risk framing —
  a high `brw_trend` in an already-affluent, high-Wohnlage PLR reads as continued appreciation, not
  an emerging displacement frontier; the theoretically interesting case is high `brw_trend` *and*
  low current status/Wohnlage together (mirrors the D3 domain sign-off's joint-reading requirement).
- **D3 — PLR-level ecological-fallacy caveat** must accompany any public surfacing (inherits G-2;
  no new text required).
- **D4 — State the predictor/lead-side placement and change-positive polarity explicitly** at any
  future integration point (mirrors geo sign-off C1); never blend unsigned into a vulnerability
  composite.
- **D5 — Carry the back-series-depth caveat forward** (only 7 change-years as of this ticket) if
  ever used for trend-slope or trajectory-clustering purposes.

### Recommendations (non-blocking)

- **D6 — When #258 (D5-wire) is picked up**, consider whether a joint `brw_trend` × B1-proxy reading
  (rising land value + rising rent-pressure/turnover in the same PLR) is a stronger combined
  displacement-risk signal than either alone — mirrors B1-rent-pressure-domain Recommendation D4's
  cross-checking spirit — but this is a placement/weighting decision for that ticket's own gate, not
  decided here.

---

*Methodology gate (R-C1): this is the gentrification-domain-expert sign-off, required alongside
the geo-data-scientist `PASS` above before the PM may integrate into `develop`.*

## Sources

- Smith, N. (1979). "Toward a theory of gentrification: a back to the city movement by capital, not
  people." *Journal of the American Planning Association*, 45(4), 538–548. (rent gap /
  rent-gap-realisation)
- `docs/epic-d/d3-price-rent-domain-signoff.md` point D5 (the deferral this ticket discharges)
- `docs/methodology/index-definition.md` §1.2 — ecological-fallacy guardrail (G-2)
- `docs/methodology/D3-brw-trend-geo-signoff.md` — companion statistical sign-off
- `docs/methodology/B1-turnover-domain-signoff.md` — companion single-indicator-vs-composite
  framing precedent
