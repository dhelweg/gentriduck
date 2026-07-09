# B1 Domain Sign-off — Berlin turnover / Wohndauer proxy (#70, third slice)

- **Author:** gentrification-domain-expert
- **Date:** 2026-07-09
- **Scope:** urban-sociology/housing-policy validity of `int_berlin_turnover_proxy` — a
  per-PLR, per-year z-scored, sign-negated year-over-year change in
  `residence_duration_5y_share` (EWR DAU5), as a **turnover/displacement proxy** contributing
  to #70's displacement & affordability dimension.
- **Artefacts reviewed:** `transform/models/intermediate/int_berlin_turnover_proxy.sql`,
  `transform/models/intermediate/schema.yml` (new block), `docs/methodology/indicator-semantics.md`
  (the DAU5 sign/change-convention findings this model operationalizes), and the companion
  `docs/methodology/B1-turnover-geo-signoff.md`.
- **Companion gate:** geo-data-scientist statistical sign-off — `PASS` (see above), required
  before the PM may integrate.

## Assessment

### a. Is "falling long-tenure resident share" a defensible turnover/displacement proxy?

**Yes, and it is well-anchored in the displacement literature already cited throughout this
pipeline.** Residential turnover — the rate at which established residents are replaced by new
arrivals — is one of the most direct, non-price observable correlates of displacement pressure in
the gentrification literature (Freeman & Braconi 2004's "succession" framing; Holm 2010's
Bestandsmieter-vs-Neuvermietung distinction already grounding `int_price_rent_wohnlage_mietspiegel`;
Dangschat's invasion-succession cycle already cited in `gentrification_index.sql`). A shrinking
share of 5+-year residents in a PLR, relative to other PLRs that year, is a defensible operational
proxy for "the established population here is being replaced faster than elsewhere" — exactly the
succession/turnover concept these frameworks describe. Unlike the rent-pressure proxy (which
combines two static levels), this construct is explicitly a *change* measure, which is the more
theoretically appropriate lens for turnover specifically — turnover is inherently a rate-of-change
phenomenon, not a level.

### b. Does reusing the thesis's own `dau5_msr * -1` convention (rather than deriving a new one) hold up under scrutiny, or does it inherit any of the thesis's known weaknesses?

**It holds up, with one caveat already flagged by the geo sign-off and correctly scoped as
non-blocking.** The 2018 thesis's negated-DAU5-change convention is a reasonable, literature-
consistent choice, and I concur with reusing it verbatim rather than re-deriving a bespoke formula
— R-C2 grounding is best satisfied by citing an already-audited prior finding, not inventing a new
judgment call for its own sake. The one thing to watch: DAU5 change does not distinguish *why*
long-tenure residents left (displacement due to rent pressure/redevelopment vs. voluntary
relocation, retirement moves, household dissolution, etc.) — a purely demographic explanation for
a falling DAU5 share (e.g., an aging cohort dying/moving to care facilities in a PLR with no
active gentrification dynamic) would score identically to a displacement-driven explanation. This
is a known, general limitation of *any* single-indicator turnover proxy, not a defect specific to
this implementation, and the model's own header already frames it correctly as "a turnover/
displacement signal, not a measured displacement event" — I require that framing be preserved
verbatim at every future surfacing point (mirrors the D1/D2 discipline already established for the
rent-pressure proxy).

### c. Single-indicator vs. composite framing — is it appropriate that this is NOT averaged with anything else at this stage?

**Yes, and it is the more defensible choice for now.** Averaging turnover with, say, the rent-
pressure proxy at this stage would obscure which underlying mechanism (price pressure vs.
succession/replacement) is driving a high combined score — for interpretability and future
sensitivity analysis (ADR-0008's mandate), keeping turnover as a distinct signal until an explicit,
justified integration slice is the right sequencing. I concur with the geo sign-off's Condition C1
that any future promotion must preserve this distinctness (pair with, don't blend into, the other
B1 signals without an explicit justified weighting).

### d. Ecological-fallacy / individual-inference guardrail

Same standard PLR-aggregate caveat as every other composite/proxy in this pipeline (G-2,
`index-definition.md` §1.2): a high `turnover_proxy` describes area-level compositional change, not
any specific resident's outcome — the residents who left may not be a homogeneous "displaced"
population, and the PLR could show high turnover from student-housing or short-let churn unrelated
to gentrification-driven displacement in some neighborhoods. This inherits directly; flagging
because turnover is one of the constructs most likely to be casually over-interpreted as "we can
now measure who got displaced," which it explicitly cannot.

### e. #197 coverage-gap framing (NULL for 2025)

Benign, same reasoning as the geo sign-off: a genuine upstream ingestion gap affecting all PLRs
uniformly for the affected years, not a selection effect correlated with the phenomenon of
interest. No corrective action beyond honest NULL propagation, already done.

---

## Verdict

```
Verdict: PASS
```

**Rationale.** The construct is a well-grounded, literature-consistent turnover/displacement
proxy that correctly reuses the thesis's own already-audited sign convention rather than
introducing a new judgment call, is honestly scoped as a change signal (not a measured
displacement event) with its interpretive limits (demographic vs. displacement-driven turnover
cannot be distinguished by this indicator alone) disclosed rather than hidden, and appropriately
kept distinct from the other B1 signals pending a justified future integration. The #197 coverage
gap is handled honestly. No defect requiring rework.

### Conditions (must be satisfied before this proxy is surfaced on any published mart or G2 page)

- **D1 — Never present in isolation as "these residents were displaced."** Any public framing
  must state this measures *compositional turnover* of the long-tenure population, not a
  displacement event, and cannot distinguish displacement-driven from demographic/voluntary
  turnover (per assessment (b) above).
- **D2 — Preserve the "not a measured displacement event" disclosure** verbatim or equivalently
  at every surface (already true in the current model/schema docs — carry forward to G2).
- **D3 — PLR-level ecological-fallacy caveat** must accompany any public surfacing (inherits G-2;
  no new text required).
- **D4 — Do not blend into a combined B1 score** without an explicit, separately-gated
  justification for the weighting (mirrors geo sign-off C1).

### Recommendations (non-blocking)

- **D5 — When this proxy is eventually integrated** (either into an intermediate B1 sub-index or
  cross-referenced with the rent-pressure proxy / Milieuschutz marker), consider a joint reading:
  PLRs high on *both* turnover and rent-pressure are the strongest candidate signal for active
  displacement dynamics (vs. either alone, which is more ambiguous) — mirrors
  B1-rent-pressure-domain Recommendation D4's cross-checking spirit.

---

*Methodology gate (R-C1): this is the gentrification-domain-expert sign-off, required alongside
the geo-data-scientist `PASS` above before the PM may integrate into `develop`.*

## Sources

- Freeman, L. & Braconi, F. (2004). "Gentrification and Displacement: New York City in the
  1990s" — succession/turnover as a displacement correlate
- Holm, A. (2010). *Wir bleiben alle!* — already cited in `int_price_rent_wohnlage_mietspiegel.sql`
- Dangschat, J. (1988) — invasion-succession cycle, already cited in `gentrification_index.sql`
- `docs/methodology/indicator-semantics.md` (DAU5 sign/change-convention findings)
- `docs/methodology/index-definition.md` §1.2 — ecological-fallacy guardrail (G-2)
- `docs/methodology/B1-turnover-geo-signoff.md` — companion statistical sign-off
- `docs/methodology/B1-rent-pressure-domain-signoff.md` — companion B1 slice, cross-referenced
  framing precedent
