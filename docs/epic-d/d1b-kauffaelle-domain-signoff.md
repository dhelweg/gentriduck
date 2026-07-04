# D1b Kauffälle — Domain expert sign-off
Date: 2026-06-29
Reviewer: gentrification-domain-expert
Scope: ADR-0003 Amendment P-D — theory fidelity and public framing of the AKS Kauffälle
(*Automatisierte Kaufpreissammlung*, Gutachterausschuss für Grundstückswerte in Berlin) as a
**market-churn dynamism lead indicator** in the Gentriduck index. R-C1 dual gate, pairing with
the geo-DS sign-off (`docs/epic-d/d1b-kauffaelle-geo-signoff.md`), whose condition 6
("predictor-not-outcome framing preserved end-to-end") is squarely in my lane.
Staging model: `transform/models/staging/stg_berlin_verkaufte_grundstuecke.sql`.

## Verdict: PASS WITH CONDITIONS

The operationalisation — AKS Kauffälle transaction **count / turnover density** per PLR per year
per *Teilmarkt*, used as a **predictor (lead) of gentrification pressure** and explicitly **not**
as a displacement outcome — is faithful to the gentrification literature it cites (Smith's rent-gap;
Dangschat's invasion-succession) and faithful to the lead-lag hypothesis that anchors the 2018
thesis revival. The theory framing in Amendment P-D is correct and well-drawn. My conditions are
about **labelling discipline, segment selection, and disclosure** — they protect the meaning of the
indicator from drift, they are not theory objections.

## Theory-fidelity assessment

### 1. Transaction count as a rent-gap-realisation lead — sound.

Smith's rent-gap thesis (Smith 1979, *Toward a Theory of Gentrification*; Smith 1996, *The New Urban
Frontier*) locates the engine of gentrification in the **gap between the actual ground rent
capitalised under the current use and the potential ground rent under a "higher and better" use**.
The gap is latent until it is *realised* through **reinvestment** — and the moment of realisation is
overwhelmingly a **transaction**: a property changes hands at a price that prices in the potential,
not the actual, rent. Transaction *intensity* in an area is therefore a defensible, literature-grounded
**leading proxy for rent-gap closure in progress**. This is exactly the role Amendment P-D assigns it,
and it is the right one.

Two points keep this honest:
- We have **no €-values** (the public WFS exposes only `id`, `kauftyp`, geometry; price sits behind the
  fee-based Kaufpreissammlung). So we cannot observe the *size* of the rent gap or its *price*
  realisation — only the **frequency of realisation events**. The indicator is "how much capital is
  turning over here", a churn/velocity signal, **not** "how large the rent gap is". The staging model's
  null `kaufpreis_eur`/`flaeche_m2` columns correctly encode this absence rather than imputing it. Good.
- Bodenrichtwerte (ADR-0003 P-A) remain the **structural** price/land-value proxy; Kauffälle adds the
  **velocity** dimension. The two are complementary (slow structural level + fast churn), and neither is
  asked to do the other's job. This division is theory-clean.

### 2. Ownership turnover preceding social succession (Dangschat) — sound, with the right caveat.

Dangschat's (1988) invasion-succession model of Berlin gentrification sequences the process:
**capital/ownership turnover and physical upgrading lead**, and the **change in the social composition
of residents (succession) lags**. Casting Kauffälle (an ownership-market signal) as a *predictor* and
the EWR social-status indicators (residence duration, age bands, foreigners share, socio-economic
status) as the lagging *outcome* reproduces this sequence faithfully and is exactly the lead-lag
structure the 2018 thesis tests (POI/market dynamism as lead, social status as lag). The Kauffälle layer
slots cleanly onto the **lead** side alongside POI dynamism. No mis-signing or cause/outcome conflation
in the index design.

The caveat — already stated correctly in Amendment P-D and geo-DS finding 3 — is the **ecological and
mechanism gap**: in Berlin the dominant displacement *mechanism* is **tenancy**, not ownership
(Holm 2010; Berlin's high rental share ~84%). An ownership transaction is upstream of, and only
probabilistically connected to, tenant displacement: it may precede an *Eigenbedarfskündigung*, a
post-conversion sale of a now-vacant flat, or modernisation-driven rent increases — or it may be a
pure investor-to-investor trade with **zero** tenant impact. **Transaction ≠ displacement;
ownership change ≠ tenant turnover.** Amendment P-D and the geo-DS sign-off both state this; my
conditions below make it binding in labelling and docs so it cannot erode downstream.

### 3. The predictor-vs-outcome distinction is correctly drawn — and is the main risk surface.

The distinction is drawn correctly in ADR text. The **risk is not in the model, it is in the public
surface**, and it is real enough to be the centre of this sign-off:

- **Conflation risk (the dangerous one):** a reader sees "property transactions" on a gentrification
  map and reads it as "displacement happening here" or "these residents were pushed out". That inverts
  a *lead pressure* into a *realised harm* and is precisely the misuse our ethics framing
  (responsibilities §Ethics & framing; geo-DS G-2 ecological-inference disclaimer) exists to prevent.
  A high-churn PLR is a place under **market pressure**, which is an early-warning signal *for residents
  and policymakers* — not a verdict that displacement has occurred.
- **Causal-overclaim risk:** even as a predictor, transaction intensity is **correlational and
  descriptive**, not causal. The methodology page (G2) and whitepaper (O2) must frame this as
  *descriptive tracking of market dynamism*, never as a causal claim that transactions cause
  gentrification or displacement.
- **Mis-segment risk:** the 9 layers are not equally meaningful. *Wohnungs- und Teileigentum* /
  condominiums (`c_eigentwhg` and kin) is the **conversion market** — the segment most tightly coupled to
  displacement-relevant gentrification in the Berlin literature (*Umwandlung* von Miet- in Eigentumswohnungen
  is the classic Berlin displacement channel, the reason *Milieuschutz*/*Soziale Erhaltungsgebiete* exist).
  Bauland (`f_bauland`) and undeveloped-plot churn are **structural/development** signals with a much
  weaker and noisier link to social succession. Pooling all 9 into one undifferentiated "transactions"
  number would muddy the indicator's meaning. The geo-DS aggregation already keys by `teilmarkt`
  (condition 5); my condition C3 makes the *interpretation* of that segmentation binding.

### 4. Temporal coverage (2024–2025 only) — a genuine limitation, not a theory defect.

Two consecutive years is **not a time series** and definitely not a lead-lag panel. The lead-lag
hypothesis is intrinsically **longitudinal** — it asserts that dynamism at *t* predicts status change at
*t+k*. With only 2024 and 2025 we cannot estimate any lead-lag relationship from Kauffälle; we can only
publish a **recent-snapshot cross-section** of market churn. That is legitimate and useful (a current
pressure map), but it must be labelled as such. Worse than uselessness would be **claiming a trend** from
two points or feeding a two-point "change" into the lead-lag analysis as if it were the dynamism series
the thesis used. The geo-DS already flags this (their condition 8); I reinforce it as a domain condition
because the *temptation to over-read two years as momentum* is a theory-fidelity failure, not just a
statistical one. This is a data-availability gap to **disclose**, not a reason to reject the source.

One forward note: because Berlin's *Milieuschutz* areas and the conversion-restriction regime
(*Umwandlungsverordnung* / §250 BauGB) materially changed in this exact 2024–2025 window, even the
two available years are not a clean "natural" market — observed condo-transaction volumes are partly a
function of the regulatory regime. Worth a sentence in G2 so a dip is not misread as "pressure easing".

### 5. EWR sign-conventions / index polarity — not in scope here, flagged for the index gate.

This sign-off covers Kauffälle as an **input**. When this layer enters `gentrification_index.sql` the
polarity must be set so that **higher churn = higher pressure (lead)**, and it must sit on the
**predictor** side, never blended into the EWR **status/outcome** composite (that would re-conflate
lead and lag and destroy the hypothesis). I will co-sign that polarity/weighting decision at the index
PR (dual gate) — it is out of scope for D1b ingestion/staging, which I am signing off here.

## Conditions

Binding for dual-gate integration into `develop`. C1, C2, C6 reinforce the geo-DS condition 6;
the rest are domain-specific.

1. **Labelling discipline (binding, end-to-end).** Every public-facing and internal-doc label for this
   layer uses **"market churn" / "transaction intensity" / "ownership turnover"** — **never**
   "displacement", "evictions", or "residents displaced". This applies to column comments, dbt mart
   `description`s, map legends, the G2 methodology page, and the O2 whitepaper. (= geo-DS condition 6,
   adopted as a domain condition.)

2. **Predictor-not-outcome, stated explicitly wherever it surfaces.** Anywhere Kauffälle appears in
   docs or UI, carry one sentence: *"A transaction is a market-pressure signal that may precede, but
   does not measure, displacement; ownership change is not tenant turnover."* Carry the G-2
   ecological-inference disclaimer when it feeds a hotspot/index surface.

3. **Segment-aware interpretation.** Treat *Wohnungs-/Teileigentum* (condominium/conversion) churn as the
   **gentrification-relevant** lead segment; do not present pooled all-9-*Teilmarkt* totals as "the
   gentrification signal". Bauland/undeveloped-plot churn, if shown, is labelled as a
   development/structural signal, not a social-succession lead. The `teilmarkt` key must survive into any
   surfaced figure so the segment is always legible.

4. **No trend / no lead-lag claim from two years.** With only 2024–2025, publish a **cross-sectional
   pressure snapshot** only. Do **not** compute a Kauffälle trend, do **not** feed a two-point delta into
   the lead-lag analysis, and do **not** describe year-over-year change as "rising/falling pressure".
   State "2024–2025 snapshot; no back-series available via the open WFS" on every surface (reinforces
   geo-DS condition 8).

5. **Descriptive-not-causal framing in G2/O2.** The methodology page and whitepaper must frame Kauffälle
   as **descriptive tracking of market dynamism**, explicitly disclaiming any causal claim that
   transactions cause gentrification or displacement, and acknowledging the power-dynamics misuse risk
   (an early-warning indicator for residents/policy, not a targeting tool).

6. **Regulatory-context caveat (G2).** Note that 2024–2025 condo-transaction volumes are co-determined
   by Berlin's conversion-restriction regime (*Milieuschutz* / *Umwandlungsverordnung* / §250 BauGB), so
   observed volume is not a pure market-pressure reading; a low count may reflect regulation, not absence
   of pressure.

7. **Index-gate handoff.** Polarity (higher churn → higher pressure) and placement strictly on the
   **predictor/lead** side of the index — never merged into the EWR status/outcome composite — to be
   co-signed by me at the `gentrification_index.sql` PR (dual gate). Out of scope for this D1b sign-off.

## Domain rationale (machine-readable)

```json
{
  "verdict": "concerns",
  "verdict_label": "PASS WITH CONDITIONS",
  "domain_rationale": "Kauffälle transaction-count/turnover density is a literature-faithful LEAD predictor of gentrification pressure (Smith rent-gap realisation; Dangschat invasion-succession) and correctly placed on the predictor side of the lead-lag hypothesis, distinct from EWR social-status outcomes. The predictor-not-outcome distinction is drawn correctly in ADR-0003 Amendment P-D. Conditions concern public labelling, segment legibility, two-year temporal honesty, and descriptive-not-causal framing — not the theory of the operationalisation.",
  "theory_risks": [
    "Conflation: public readers reading transaction intensity as realised displacement (inverts lead pressure into realised harm).",
    "Causal overclaim: presenting a descriptive correlational churn proxy as a causal driver of gentrification/displacement.",
    "Segment muddle: pooling all 9 Teilmaerkte hides that condo/conversion churn is the displacement-relevant segment while bauland churn is a structural signal.",
    "Two-year over-read: treating a 2024-2025 delta as a trend or feeding it into the longitudinal lead-lag analysis the thesis requires.",
    "Mechanism gap: ownership churn is upstream of and only probabilistically linked to tenant displacement in a ~84%-rental city (Holm 2010); ownership change is not tenant turnover.",
    "Regulatory confound: Milieuschutz/Umwandlungsverordnung/§250 BauGB co-determine 2024-2025 condo volumes, so low counts may reflect regulation not low pressure."
  ],
  "recommendations": [
    "Use market-churn/transaction-intensity language; never 'displacement' (C1).",
    "Carry the predictor-not-outcome + G-2 ecological-inference sentence wherever it surfaces (C2).",
    "Keep teilmarkt legible; foreground Wohnungs-/Teileigentum as the gentrification-relevant segment (C3).",
    "Publish a cross-sectional snapshot only; no trend/lead-lag from two years (C4).",
    "Frame as descriptive tracking, not causal, in G2/O2, with the misuse/power-dynamics note (C5).",
    "Add the regulatory-context caveat in G2 (C6).",
    "Co-sign index polarity/placement on the predictor side at the index PR (C7)."
  ],
  "citations": [
    "Smith 1979, Toward a Theory of Gentrification (rent-gap, realisation via transaction)",
    "Smith 1996, The New Urban Frontier",
    "Dangschat 1988, invasion-succession (Berlin)",
    "Holm 2010 (Berlin rental city / displacement via tenancy)",
    "ADR-0003 Amendment P-D (Theory role); docs/epic-d/d1b-kauffaelle-geo-signoff.md (condition 6)"
  ]
}
```

## Note on the dual gate

This completes the R-C1 dual gate for D1b together with the geo-DS PASS WITH CONDITIONS. Both
verdicts carry conditions; per `CLAUDE.md` §Methodology gate, "PASS WITH CONDITIONS" is an
integratable PASS **provided the conditions are tracked and discharged** in the D3 aggregation /
index work and on the G2 page. The PM may integrate D1b staging into `develop` on that basis; the
binding labelling/framing conditions (C1, C2, C4, C5, C6) must be enforced at every downstream
surface, and C7 returns to me at the index PR.
