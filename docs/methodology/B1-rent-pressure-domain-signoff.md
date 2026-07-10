# B1 Domain Sign-off — Berlin rent-pressure / affordability-stress proxy (#70 / ADR-0019 Decision 2)

- **Author:** gentrification-domain-expert
- **Date:** 2026-07-09
- **Scope:** urban-sociology/housing-policy validity of the new
  `int_berlin_rent_pressure_proxy` composite — a per-PLR, per-Wohnlage-snapshot-year mean of
  z-scored modelled rent level (`est_rent_mid`, relative to the citywide/PLR median) and z-scored
  MSS transfer-receipt share (`transferbezug_anteil`) — as an **affordability-stress proxy**
  contributing to #70's displacement & affordability dimension.
- **Artefacts reviewed:** `transform/models/intermediate/int_berlin_rent_pressure_proxy.sql`,
  `transform/models/intermediate/schema.yml` (new block), `docs/adr/0019-berlin-milieuschutz-displacement-source.md`
  (Decision 2, Alternative C), and the companion `docs/methodology/B1-rent-pressure-geo-signoff.md`.
- **Companion gate:** geo-data-scientist statistical sign-off — `PASS` (see above), required before
  the PM may integrate.

## Assessment

### a. Is "rent level relative to median + transfer-receipt share" a defensible affordability-stress construct?

**Yes, as a coarse but honestly-scoped proxy — not as a rent-burden measure.** The literal target
concept (rent-to-income ratio, the standard housing-economics affordability measure) is unavailable:
no PLR-grain income series exists anywhere in this pipeline (ADR-0007's documented gap), and ADR-0019
correctly rejects fabricating one (Alternative C). The substitute construct combines two real,
already-validated signals: (i) where rent sits *relative to the citywide distribution that year*
(a positional, not absolute, rent-pressure signal — appropriate, since Berlin-wide rent inflation
over the panel makes an absolute rent threshold meaningless across years) and (ii) the share of
residents already dependent on SGB II/XII transfers, i.e. a population with the *least* capacity to
absorb rent increases. The combination captures the intuition the displacement literature cares
about — rent pressure lands hardest, and signals gentrification-adjacent risk most sharply, where it
coincides with an already-vulnerable resident base — without claiming to measure a literal ratio it
cannot compute. This is consistent with the thesis's own displacement framing (Holm 2010; Dangschat's
invasion-succession reading of rent-led upgrading pressure on incumbent low-status populations) and
with Döring & Ulbricht's (2016) vulnerability lens already anchoring the R-A4/R-A5 SES work.

### b. Is combining a rent *level* term with an SES *level* term (not a rent *change* or SES *change*) the right framing for "pressure," or does it risk conflating a static deprivation reading with a dynamic risk signal?

**This is the one real conceptual caveat, correctly scoped as a limitation rather than hidden.** A
*static* co-occurrence of high relative rent and high transfer-dependency in the same PLR-year is
not, by itself, evidence that rent is *rising* or that displacement pressure is *increasing* there —
it could equally describe a PLR that has *stably* combined modest rents (still above that year's
median) with structural poverty for a long time, with no active gentrification dynamic at all. The
proxy as built answers "where does affordability stress currently co-locate with vulnerability,"
which is a legitimate and useful *risk-exposure* reading (exactly the kind of policy-relevant marker
Milieuschutz designation itself uses — a current-state risk flag, not a measured trend), but it must
not be presented as a *displacement-in-progress* signal without pairing it with a trend read (e.g.
against `int_gentrification_ts`'s D1/D2 trajectory or the MSS Dynamik indicators already in the
pipeline). The model's own documentation already states this is "an affordability-stress signal, not
a measured displacement event" — I concur with that framing and require it to be preserved verbatim
(or equivalently) at any point this proxy is surfaced.

### c. Ecological-fallacy / individual-inference guardrail

As with every PLR-level composite in this pipeline (G-2 guardrail, `index-definition.md` §1.2), a
high `rent_pressure_proxy` value describes the *area*, not any individual resident's housing
situation — an area can score high while most residents are unaffected renters in long-term
contracts, or low while a minority face acute burden invisible at PLR aggregation. This caveat
inherits directly and needs no new mechanism; flagging it because this is the first B1 slice to
combine a price signal with an SES signal, which invites (incorrectly) reading it as a per-household
burden statement.

### d. Coverage-gap framing (NULL for snapshot_year 2019, 2021)

The domain reading of this gap is benign: it is a genuine MSS `indexind` reporting-window
suspension (2019, 2021 editions), not a methodological choice that biases which *kinds* of areas
are excluded — it is a temporal gap affecting all PLRs uniformly in those two snapshot years, not a
selection effect correlated with the phenomenon being measured. No corrective action is required
beyond what the model already does (propagate NULL rather than impute).

---

## Verdict

```
Verdict: PASS
```

**Rationale.** The construct is a defensible, explicitly-scoped affordability-stress proxy grounded
in the displacement literature already anchoring this pipeline (Holm 2010, Dangschat, Döring &
Ulbricht), correctly avoids fabricating an income series it does not have, and is honestly documented
as a positional/co-occurrence signal rather than a rent-burden ratio or a displacement event. The one
substantive conceptual caveat (static co-occurrence vs. dynamic risk) is already disclosed in the
model's own documentation and is not a defect requiring rework — it is exactly the kind of framing
discipline this gate exists to enforce, and it is satisfied.

### Conditions (must be satisfied before this proxy is surfaced on any published mart or G2 page)

- **D1 — Never present in isolation as "displacement is happening here."** Any public framing must
  pair it with a trend indicator (D1/D2 trajectory, MSS Dynamik) or explicitly label it a
  point-in-time risk-exposure/co-occurrence signal, per assessment (b) above.
- **D2 — Preserve the "not a burden ratio, no income series" disclosure** verbatim or equivalently at
  every surface (this is already true in the current model/schema docs — carry it forward to G2).
- **D3 — PLR-level ecological-fallacy caveat** must accompany any public surfacing (inherits G-2;
  no new text required beyond the pipeline's existing standard disclosure).

### Recommendations (non-blocking)

- **D4 — When this proxy is promoted into an intermediate sub-index or the governed index**, consider
  pairing it with the Milieuschutz policy marker (`stg_berlin_milieuschutz`, ADR-0019 Decision 1) as
  a joint "policy-recognized + statistically-inferred" affordability/displacement view — the two are
  complementary (one is the city's own designation, the other a data-driven proxy) and cross-checking
  them would be a useful internal validity signal (mirrors R-A4 Recommendation R3's spirit).

---

*Methodology gate (R-C1): this is the gentrification-domain-expert sign-off, required alongside the
geo-data-scientist `PASS` above before the PM may integrate into `develop`.*

## Sources

- ADR-0019: `docs/adr/0019-berlin-milieuschutz-displacement-source.md`
- ADR-0007 (documented income-series gap): `docs/adr/0007-berlin-ses-indicators.md`
- Holm, A. (2010). *Wir bleiben alle!* — Bestandsmiete/ortsübliche Vergleichsmiete lagging-bias
  precedent already cited in `int_price_rent_wohnlage_mietspiegel.sql`
- Dangschat, J. (1988) — double invasion-succession cycle, already cited in `gentrification_index.sql`
- Döring, D. & Ulbricht, S. (2016) — vulnerability/displacement-risk lens, already cited in R-A4/R-A5
- `docs/methodology/index-definition.md` §1.2 — ecological-fallacy / PLR-aggregate guardrail (G-2)
- `docs/methodology/B1-rent-pressure-geo-signoff.md` — companion statistical sign-off
