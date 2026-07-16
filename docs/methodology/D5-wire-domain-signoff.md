---
task: D5-wire / #258 — displacement/affordability sub-index, build & wire
author: gentrification-domain-expert
date: 2026-07-16
branch: feature/258-d5-wire
---

# Domain-expert methodology sign-off — D5-wire (`int_berlin_displacement_subindex`)

- **Branch:** `feature/258-d5-wire`
- **Issue / task:** #258 [D5-wire] — build & wire the ADR-0008 D5 displacement/affordability
  predictor.
- **Reviewer:** gentrification-domain-expert (methodology gate, R-C1, pairs with the geo-DS
  sign-off above)
- **Artefacts reviewed:** same as `docs/methodology/D5-wire-geo-signoff.md`, plus
  `docs/methodology/index-definition.md` §0.2, §0.4, §1.8, §5 (the D5 rows just added) and the
  original theory grounding in `docs/adr/0019-berlin-milieuschutz-displacement-source.md` and
  `docs/adr/0008-multi-dimensional-gentrification-model.md`.

## D-1. Does giving these three proxies "a real consumer" actually strengthen the policy-relevance framing, or is it cosmetic?

**Substantively, yes — with an important caveat about current data reality (echoing the geo-DS
review's finding a).** The stated motivation for this ticket ("without D5 the public index reads as
'nice amenities', not 'neighbourhood change with social cost'") is a real and correct diagnosis: D1–D4
alone measure status, direction, commercial succession, and demographic composition, but say nothing
about the *cost* side of change — who is being priced out or protected. Wiring `displacement_subindex`
and the Milieuschutz disclosure columns into `int_gentrification_ts` is a genuine step toward that
framing, not a cosmetic column addition, **but** the honest caveat is that today's populated rows
(2023/2025 editions) are driven almost entirely by `rent_pressure_proxy` alone
(`displacement_subindex_is_partial=true` for effectively all of them, per the geo-DS review) — the
turnover half of the intended "residents leaving + rent rising" story is not yet observable in the
same years, due to the pre-existing EWR gap (#197). This is a real, partial win, not the full
composite the ticket originally imagined, and public framing must say so (see D-3 below).

## D-2. Is the theoretical grounding for combining turnover + rent-pressure sound (Dangschat/Döring-Ulbricht/Smith), and is polarity correct?

**Yes.** `turnover_proxy` operationalizes the thesis's own change convention on
`residence_duration_5y_share` (a falling long-tenure share = established residents leaving faster
than replaced by other long-tenure residents) — this is squarely within Döring & Ulbricht's (2016)
vulnerability/displacement-susceptibility framing already grounding D4, extended here to a *change*
signal rather than a level. `rent_pressure_proxy` combines modelled rent level with MSS
transfer-receipt share — an affordability-stress reading consistent with Holm's (2010) documentation
of Berlin's ~84% rental housing stock, where rent increases translate directly into
displacement pressure for transfer-dependent households, not merely a portfolio-value change for
owner-occupiers. Both proxies are already correctly oriented pressure-positive in their own models
(confirmed by their own prior sign-offs), and `displacement_subindex`'s mean-of-whichever-is-present
construction preserves that orientation without re-flipping anything. I confirm the polarity
direction is consistent with the vulnerability-positive convention used elsewhere in the index (§0.3),
even though this is a predictor, not an outcome (ADR-0008) — the *sign* convention matching is a
readability aid for anyone scanning the table, not a claim that this should be pooled with D1/D2/D4.

## D-3. Is the "not a measured displacement outcome" caveat sufficiently strong, and is the Milieuschutz framing ethically sound?

**Yes, and I want to strengthen one point for the eventual G2 page.** The model header and the
geo-signoff's condition C2 both correctly require that public framing disclose the
single-component-driven nature of most currently-populated rows. I add a domain-side sharpening: G2
copy must not describe `displacement_subindex` using language like "displacement risk score" or
"at-risk area" in isolation — the correct framing is closer to "this area shows [above/below]-average
rent-and-turnover pressure signals, of the kind associated with displacement risk in the academic
literature (Smith 1979 rent-gap; Döring & Ulbricht 2016), but this is not a measurement of actual
displacement." This mirrors the G-1 guardrail already governing typology stage names
(index-definition.md §1.2) and should be applied with equal rigour to this new predictor field, even
though it does not itself feed the typology.

On Milieuschutz: I confirm the ethical framing is correctly preserved and, if anything, improved by
this ticket's implementation. The disclosure-only, never-blended treatment avoids the two failure
modes I would have flagged: (a) treating a Milieuschutz designation as evidence of *worse* conditions
(it is the opposite — it is a protective intervention triggered by *recognized* risk, and Berlin's
Erhaltungsverordnung specifically restricts luxury renovation and conversion to protect existing
tenants), and (b) treating its *absence* as evidence an area is *not* at risk (correctly disclaimed in
`int_berlin_milieuschutz_plr_flag`'s own column comment, and repeated in the schema.yml addition here:
"PLRs without the flag are not thereby 'safe from displacement,' only 'not (yet) formally
protected'"). This is the right ethical stance and I have no changes to request.

## D-4. Does the coverage-gap-driven partial-availability design introduce any distributional bias that would mislead public interpretation?

**A real question, and I checked it.** Since `n_components_available` is effectively always 1 in the
currently-populated (2023/2025) rows (turnover_proxy has no data there), `displacement_subindex` for
those editions is, in practice, a **rebadged `rent_pressure_proxy`**, not a genuinely blended signal.
This is not misleading *as implemented* (the model is honest about it via
`displacement_subindex_is_partial`), but it means the *rent* half of the displacement story currently
dominates the *turnover* half by construction, not by evidence that rent pressure matters more. A
reader unaware of this could over-attribute displacement risk to rent dynamics specifically. I
consider this adequately disclosed by the exposed flag and the geo-DS sign-off's condition C2, and
not a blocking concern, but I record it here so a future G2 author cannot claim it wasn't flagged.

## D-5. Is the "not wired into the typology matrix" scope decision correct from a theory standpoint?

**Yes.** The D1×D2 Status×Dynamik matrix is Berlin's own official invasion-succession reading
(Dangschat 1988; Döring & Ulbricht 2016 as applied via MSS); folding an affordability/turnover
predictor into that matrix without a deliberate, separately-reviewed cut-point and stage-naming
exercise would risk exactly the kind of "conflating a risk signal with a confirmed outcome" error
G-1 already warns against for Milieuschutz specifically. Leaving `displacement_subindex` as a
standalone predictor column (readable alongside, never inside, the typology) is the theoretically
sound, conservative choice, consistent with how `brw_trend` (#273) was handled.

---

## Verdict

```
Verdict: PASS
```

**Rationale.** The theoretical grounding for both proxies is sound and correctly cites the same
literature (Döring & Ulbricht 2016, Smith 1979, Holm 2010) already anchoring the rest of the index.
Polarity is correctly preserved from the source models. The Milieuschutz disclosure-only treatment is
ethically sound and, if anything, an improvement on the prior staged-but-unconsumed state. The
"not a measured outcome" caveat is present and I have strengthened its wording requirement for G2 (see
D-3). The partial-availability design's practical effect — that populated rows are currently a
rebadged rent-pressure signal, not a true blend — is honestly disclosed via
`displacement_subindex_is_partial`, and I flag it explicitly (D-4) so it cannot be silently forgotten
once #197 is fixed and true blending becomes possible. No blocking defect found.

### Conditions (must be satisfied before any public/G2 publication of this field)

- **D-C1 — G2 copy must use "displacement/affordability *pressure signal*", never "displacement risk
  score" or "at-risk area" standalone** (see D-3), matching the same framing discipline already
  required of typology stage names (index-definition.md §1.2 G-1).
- **D-C2 — G2 copy must disclose that most currently-populated rows are single-component
  (`rent_pressure_proxy` alone) via `displacement_subindex_is_partial`**, not a genuine
  turnover+rent-pressure blend (see D-4) — this is a factual, time-bound limitation (tied to #197)
  that must be re-checked and updated once the EWR gap is fixed.
- **D-C3 — Milieuschutz framing on any public page must retain both directions of the "not safe /
  not at-risk" disclaimer** already present in the model's own column comment — neither presence nor
  absence of the flag may be presented as a standalone risk verdict.

### Recommendations (non-blocking)

- **D-R1 — Once #197 is fixed and `turnover_proxy` gains 2021+ coverage**, this sign-off's finding
  D-4 should be re-examined: check whether `n_components_available=2` rows start appearing and
  whether the resulting genuinely-blended signal changes the distribution meaningfully from the
  current rent-pressure-dominated one.
- **D-R2 — Consider, in a future ticket, whether `brw_trend`'s land-value-realisation signal
  (already flagged by its own geo-signoff as a candidate D5 input) would strengthen the "capital
  driver" side of the displacement story once #197 is resolved** — not decided here, matching the
  geo-DS review's own non-blocking recommendation R1.

---

*Methodology gate (R-C1): this domain-expert sign-off pairs with
`docs/methodology/D5-wire-geo-signoff.md`. Both must record `Verdict: PASS` before the PM may
integrate this branch into `develop`.*

## Sources

- Dangschat, J. (1988). Gentrification: Der Wandel innenstadtnaher Wohnviertel. In: J. Friedrichs
  (Hrsg.), *Soziologische Stadtforschung*. (double invasion-succession cycle)
- Döring, T. & Ulbricht, D. (2016). *Gentrification-Hotspots und Verdrängungsprozesse in Berlin*.
  (vulnerability/displacement-susceptibility reading of demographic composition)
- Smith, N. (1979). "Toward a theory of gentrification: a back to the city movement by capital, not
  people." *Journal of the American Planning Association*, 45(4), 538–548. (rent-gap framing)
- Holm, A. (2010). *Wir bleiben alle! Gentrifizierung – Städtische Konflikte um Aufwertung und
  Verdrängung*. (Berlin ~84% rental housing stock; affordability-pressure translation into
  displacement)
- Helweg, D. (2018). [2018 thesis], §3.2 (Gentrifizierung als Prozess), reference for the invasion-
  succession spine this index reconstructs.
- `docs/methodology/D5-wire-geo-signoff.md` (paired statistical/spatial review)
- `docs/adr/0019-berlin-milieuschutz-displacement-source.md`,
  `docs/adr/0008-multi-dimensional-gentrification-model.md`
