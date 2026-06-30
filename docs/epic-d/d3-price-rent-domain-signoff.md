# D3 Price/Rent Dimension — Gentrification Domain Expert Sign-Off

Date: 2026-06-29
Reviewer: gentrification-domain-expert
Ticket: #29

Scope: theory fidelity and public framing of the **price/rent dimension** that D3 adds to the
Gentriduck index from three D1-staged Berlin sources — **Bodenrichtwerte (BRW)** land reference
values, the **Wohnlage** tier composition per PLR (einfach/mittel/gut), and a **modelled
Mietspiegel rent estimate** (Wohnlage composition × Mietspiegeltabelle). This is the R-C1 **domain**
gate, pairing with the geo-data-scientist sign-off (`docs/epic-d/d3-price-rent-geo-signoff.md`),
whose conditions 12 (polarity *meaning*) and 14 (structural-level vs dynamic-signal separation) are
squarely in my lane and which this note discharges from the theory side. Formatting/precedent:
`docs/epic-d/d1b-kauffaelle-domain-signoff.md`.

Grounding read: `gentrification_index.sql`, `int_gentrification_ts.sql` (ADR-0008 lead-lag
architecture; the legacy averaged score it corrected), ADR-0003 §Price/rent (P-A BRW, P-B
Mietspiegel/Wohnlage) and Amendment P-D, and the geo-DS D3 sign-off.

## Verdict: PASS WITH CONDITIONS

The operationalisation is **faithful to the gentrification literature** and the three signals are
correctly understood by the geo sign-off as **structural levels, not dynamic signals**. The single
most important theory point — and the place this dimension can most easily go wrong — is that BRW,
Wohnlage and modelled rent are **state/level descriptors of the housing market**, and the index's
live signal is a **process** (Dangschat's invasion-succession, the lead-lag of POI/market dynamism →
social succession that anchors the 2018 thesis revival, ADR-0008). A level is not a stage of the
process; it is **context**. My conditions make that distinction binding in *meaning*, set the
polarity convention, scope the Kauffälle question, and fix the ethical disclosures required before
land-value scores are published at PLR granularity. They are framing/labelling/placement
conditions, not theory objections — hence PASS WITH CONDITIONS, integratable provided the conditions
are tracked and discharged (CLAUDE.md §Methodology gate).

---

## 1. Theory grounding

**1a. BRW as a rent-gap proxy — partially correct, with a critical level-vs-gap caveat (binding).**

Smith's rent-gap thesis (Smith 1979, *Toward a Theory of Gentrification*; Smith 1996, *The New
Urban Frontier*) defines the engine of gentrification as the **gap** between the **actual** ground
rent capitalised under the current use and the **potential** ground rent under a "higher and better"
use. Gentrification realises that gap through reinvestment. The crucial point for D3: **the rent gap
is a *difference*, not a *level*.** Bodenrichtwerte are an estimate of the **capitalised ground-rent
level** (the *potential*/market land value as appraised by the Gutachterausschuss) — they are one of
the **two terms** in the gap, not the gap itself. We do **not** observe the *actual* ground rent
under current use, so a single-vintage BRW level **cannot** by itself measure rent-gap size.

What BRW *does* legitimately operationalise:
- As a **level**: the **absolute market valuation of land** in a PLR — i.e. how far up the price
  surface an area already sits. This is a *consolidation/desirability* descriptor, not a
  *headroom/gap* descriptor (see §2 polarity).
- As a **change** (`brw_trend`, year-over-year or vintage-over-vintage Δ): a **rising** BRW is the
  closest open-data signal we have to **rent-gap closure in progress** — capital revaluing land
  upward toward its potential is exactly Smith's realisation mechanism. This is the
  theory-valuable signal, and it must be built as an **explicit, separately-polarised change
  indicator** (geo condition 14), never conflated with the level. I concur fully with the geo-DS
  framing here.

Verdict on 1a: BRW is a **sound rent-gap-relevant proxy**, but the literature-faithful reading is
that the **level is the price-surface context** and the **change is the rent-gap-realisation
signal**. Do not label the BRW level "the rent gap". (Condition D1, D5.)

**1b. Wohnlage composition as a residential-quality signal — well-grounded.**

The Berlin *Wohnlage* tiering (einfach/mittel/gut) is the Senate's own institutionalised
residential-quality classification, and residential quality / location prestige is a constitutive
variable in the German gentrification literature. Blasius & Dangschat (1990, *Gentrification: Die
Aufwertung innenstadtnaher Wohnviertel*) define gentrification precisely as the **Aufwertung**
(upgrading) of inner-city residential quarters — Wohnlage is the operational language of that
upgrading. Using the **tier composition per PLR** (the share of einfach/mittel/gut addresses)
rather than a modal label is the theory-correct choice: gentrification is a **gradual recomposition
of the housing stock and its desirability**, and the *mix* — and over vintages the *shift* in the
mix — is the Aufwertung signal. A PLR moving 60%→40% einfach is upgrading even before any tier
flips. (This aligns with geo condition 6.)

The institutional context that makes Wohnlage gentrification-relevant in Berlin specifically is the
**Milieuschutz / Soziale Erhaltungsgebiete** regime (Holm 2010; Bernt 2016 on the politics of
Berlin's Erhaltungssatzungen): low-/mid-Wohnlage inner-city quarters with upgrading pressure are
exactly the areas the city designates for displacement protection. Wohnlage composition is thus a
legible, policy-anchored quality signal. **Grounded — adopt.**

**1c. Modelled Mietspiegel rent estimate — valid as an explicitly-modelled proxy, not observed rent.**

The construction `est_rent_plr = Σ_tier (wohnlage_share_tier × Mietspiegel_rent_mid(tier, fixed
year-built, fixed size))` is a **valid residential-market *proxy*** with two binding qualifications:

- It is a **modelled estimate**, not observed rent paid. The Mietspiegel is a *qualified rent index*
  (ortsübliche Vergleichsmiete) — a legal-administrative reference matrix, **not** a transaction
  ledger. Holding year-built and dwelling-size fixed at one declared representative profile (geo
  condition 9) is the honest way to isolate the Wohnlage signal, but it means the number reflects
  **location quality priced at the Mietspiegel reference**, not what any household actually pays.
  This must be labelled "modelled/estimated net cold rent at a fixed reference dwelling profile",
  never "rent" simpliciter (Condition D6 — mirrors D1b C1).
- It inherits the **Bestandsmiete bias** of the Mietspiegel: the Mietspiegel reflects the
  *ortsübliche Vergleichsmiete* of the existing tenancy stock, which **lags** new-letting/asking
  rents — the very rents that drive displacement (Holm 2010 on the Berlin rental city; ~84% rental
  share). So the estimate is a **conservative, lagging** affordability proxy: it will *understate*
  the pressure at the gentrifying margin. This is a feature for honesty (no overclaim) but a
  limitation to disclose (Condition D7). The estimate is therefore best read as a **structural
  affordability *level*** of the standing stock, not a leading-edge displacement signal.

Net: the modelled rent is a **valid residential-market level proxy** provided it is labelled as
modelled and its lagging/Bestandsmiete character is disclosed.

## 2. Polarity and framing (discharges geo-DS conditions 12 and 14)

**2a. Level-vs-process framing (geo condition 14) — concur, with the theory reason made explicit.**

The live index is built on the **lead-lag process architecture** ADR-0008 installed: D3 POI dynamism
and (D1b) market churn are **leads**; D1/D2 MSS Status/Dynamik social change and D4 EWR demographics
are the **lagging outcome/state**. The legacy `gentrification_score` that ADR-0008 deleted failed
precisely because it **averaged a predictor and an outcome into one number and "lost the lead-lag
relationship"** (int_gentrification_ts header; thesis p. 91, H3b confirmed / H3a rejected). A BRW /
Wohnlage / modelled-rent **level** is neither a lead nor a lag in that process — it is a
**cross-sectional state of the built environment**. Averaging a slow structural level into the
Status×Dynamik typology would reproduce the exact ADR-0008 error from a new direction. **Therefore
(binding, = geo 14): the price/rent levels enter as a baseline/context covariate in the D4-levels
pattern (index-definition §4.6), never blended contemporaneously into the MSS Status×Dynamik
typology, never silently averaged into a single score.** The only price/rent signal that may sit on
the *process* (lead) side is an explicit **BRW change** (`brw_trend`), built and polarised
separately as a rent-gap-realisation predictor (§1a). I co-sign this placement.

**2b. BRW polarity — the *level* is genuinely AMBIGUOUS as a gentrification signal (binding).**

This is the heart of the domain question and I want to be unambiguous: **a high Bodenrichtwert
level does NOT cleanly mean "more gentrified" or "more displacement risk".** It is ambiguous by
construction, because a high land-value level is consistent with **at least three different states**
that gentrification theory treats very differently:

1. **Long-consolidated wealth** (Grunewald, Dahlem, Zehlendorf) — high BRW, high status, *stable*,
   **not gentrifying** and not at displacement risk. This is "old money", the end-state, not the
   process.
2. **Recently gentrified / consolidated** inner-city quarters (parts of Prenzlauer Berg) — high BRW
   reached *through* a completed upgrading cycle; the displacement already happened. High level,
   **low remaining headroom**.
3. **Under active pressure** — where the *trajectory* (rising BRW) matters far more than the level.

The level alone cannot separate (1) from (2) from (3). High BRW = **high price-surface position =
low residual gentrification headroom / already-consolidated**; on the project's vulnerability-positive
convention (index-definition §5) that reads as **LOW socio-demographic vulnerability**, so if pooled
it enters **sign-flipped**. But its more defensible and theory-honest role is **NOT as a vulnerability
score at all** — it is a **rent-gap / price-pressure context covariate** (geo §4, which I endorse).
The displacement-risk content lives in the **change** (rising BRW into a still-low-status, high-share-
einfach PLR = the classic gentrification frontier), not in the static level. **Condition D2:** the
BRW *level* is published as a **price-surface/consolidation context layer**, explicitly captioned as
ambiguous between historic wealth and active pressure; **displacement-risk language attaches only to
the BRW *change* read jointly with low-status/low-Wohnlage context**, never to the level alone.

**2c. Wohnlage composition / %-einfach — it is a VULNERABILITY/headroom indicator, not an outcome
(binding distinction).**

The question "is high-einfach-share a vulnerability indicator or a gentrification OUTCOME indicator?"
has a clear theory answer: **as a cross-sectional level, high %-einfach is a *vulnerability /
upgrading-headroom* indicator (a *precondition*), not a gentrification outcome.** Gentrification in
the Blasius/Dangschat Aufwertung model operates *on* lower-quality inner-city stock — a high einfach
share in an inner-city, well-located PLR is the **raw material** of upgrading and marks a population
**exposed** to it (the Milieuschutz target profile; Holm 2010, Bernt 2016). It becomes an *outcome*
signal only in its **change**: a **falling** einfach share over vintages **is** realised Aufwertung.
So:
- **%-einfach LEVEL → vulnerability/headroom** (precondition; vulnerability-positive sign:
  higher einfach share = higher vulnerability/headroom). Caveat: this is only displacement-relevant
  where it coincides with **locational desirability/pressure** (inner-city, rising BRW). A high
  einfach share in a peripheral, low-demand PLR is just low quality with **no** upgrading pressure —
  do not read it as imminent gentrification. Context-condition this (Condition D3).
- **%-einfach CHANGE (declining) → upgrading outcome** — must be built as an explicit change signal
  if used as such, on the outcome side, never as the level.

Record all three signals' polarity in index-definition §5 before integration (Condition D4); I
co-own the *meaning* of those entries, geo owns the z-score arithmetic.

## 3. Kauffälle dynamism signal

**Defer condominium transaction count to its own predictor; do NOT fold it into D3's price/rent
level dimension.** Reasoning, building on my D1b sign-off (conditions C3, C4, C7):

- **Role mismatch.** D3 as scoped here is a **structural-level price/rent context** dimension (BRW
  level, Wohnlage level, modelled-rent level). Kauffälle condo churn (`c_eigentwhg`) is a
  **dynamism *lead* predictor** (rent-gap *realisation* via transaction; Dangschat ownership-turnover-
  precedes-succession). It belongs on the **process/lead** side with POI dynamism, **not** mixed into
  a level dimension — folding it in would re-blur exactly the lead-vs-state line §2a protects.
- **Temporal disqualification (binding, from D1b C4).** Kauffälle is **2024–2025 only via the open
  WFS** — two years is **not a time series** and not a lead-lag panel. A dynamism predictor in this
  index is intrinsically longitudinal (dynamism at *t* → succession at *t+k*). With two points we
  can publish a **cross-sectional churn snapshot** but **cannot** compute a trend or feed a two-point
  delta into the lead-lag analysis. The D3 price/rent panel, by contrast, is vintage-matched across
  the biennial MSS editions back to 2017 (geo condition 8). Splicing a 2024–2025 snapshot into that
  multi-vintage dimension would be a temporal-coverage mismatch that invites over-reading two years
  as momentum.
- **No EUR price (D1b C1).** Kauffälle carries **no €-value** (counts only). It cannot contribute to
  a *price* dimension at all — it is a **count/velocity** signal. This alone disqualifies it from the
  price/rent *level* construction.
- **Regulatory confound (D1b C6).** 2024–2025 condo volumes are co-determined by Berlin's
  conversion-restriction regime (Milieuschutz / Umwandlungsverordnung / §250 BauGB), so the count is
  not a pure market reading in this exact window.

**Recommendation:** keep `c_eigentwhg` as a **separate, clearly-labelled cross-sectional
"condominium market-churn (conversion-market) snapshot"** indicator on the predictor side, foregrounding
the *Wohnungs-/Teileigentum* segment as the gentrification-relevant one (D1b C3), and **do not** ingest
it into the D3 price/rent level dimension. Its polarity/placement on the lead side returns to me at the
`gentrification_index.sql` PR per D1b C7. (Condition D8.)

## 4. Limitations and ethics

Publishing **land-value-derived scores at PLR granularity** is the most ethically sensitive output in
the project so far, because a "land value / desirability score" map is **directly legible to the
actors who drive displacement** (investors, developers, converting landlords) in a way an abstract
socio-economic index is not. A rent-gap map is, almost by definition, a **target map** unless framed
with care. Required disclosures (binding for the G2 methodology page and O2 whitepaper):

- **D9 — Descriptive, not causal; pressure, not realised displacement.** Carry the standing project
  frame (D1b C2/C5; G-2 ecological-inference guardrail): the price/rent dimension is **descriptive
  tracking of structural housing-market context**, not a causal model and not a measurement of
  displacement. A high land-value or low-affordability PLR is a place under **market pressure / an
  early-warning context for residents and policymakers** — not a verdict that anyone was displaced.
- **D10 — Ecological / PLR-aggregate caveat.** Every price/rent surface carries the existing G-2
  guardrail (gentrification_index.sql header; index-definition §1.2): a PLR-level value is **not** a
  building- or household-level statement; inferring an individual's rent, land value, or displacement
  from a PLR score is an ecological fallacy. BRW is **coarser than PLR** (1,621 zones, area-interpolated)
  — **PLR is the published floor; no sub-PLR land-value grain** (geo condition 16). Do not let the
  area-weighted estimate imply parcel-level precision.
- **D11 — Modelled-estimate honesty.** The modelled rent is labelled "modelled/estimated net cold
  rent at a fixed reference dwelling profile" with the Mietspiegel **Bestandsmiete / lagging** caveat
  (§1c); the fixed year-built/size profile is stated as a **modelling choice, not a measurement** (geo
  condition 9). BRW is labelled a **land reference value**, not a dwelling price (ADR-0003 P-A note).
- **D12 — Milieuschutz / counter-misuse framing (the central ethical point).** Publishing land-value
  and rent-pressure scores at PLR granularity **risks amplifying displacement pressure** if read as a
  shopping list of "undervalued" quarters. Two mitigations, both binding for G2:
  1. **Frame toward the protective use, not the extractive one.** Present the dimension explicitly as
     a tool to **identify quarters that may warrant displacement protection** (candidate Milieuschutz /
     Soziale Erhaltungsgebiete monitoring), aligning with the public-interest purpose of the Berlin
     Erhaltungsrecht (Holm 2010; Bernt 2016) — not as an investment-opportunity surface. State this
     purpose prominently.
  2. **Resolution discipline + rent-gap caveat.** Keep the floor at PLR (D10); never publish a "best
     value-uplift potential" ranking; and state that **a low land-value level is NOT an invitation —
     it is, where it coincides with a vulnerable population, a flag for *protection*.** Explicitly
     disclaim the rent-gap reading as a targeting device (acknowledging the power dynamics: the same
     map serves residents and capital, and we frame for residents).
- **D13 — Comparability breaks disclosed.** The Mietspiegel construction-year-bucket schema drift and
  the 2026→2025 vintage approximation (geo conditions 8, 10), plus the LOR-2021 boundary reform,
  are disclosed on G2 alongside the existing Migrationshintergrund-2017 break — so a level shift is
  not misread as real change.
- **D14 — R-C2 grounding.** Every D3 model header cites its operationalised source: Smith (1979)
  rent gap (BRW level/change), Blasius & Dangschat (1990) Aufwertung (Wohnlage), Holm (2010) /
  Bernt (2016) Milieuschutz/Berlin rental city (Wohnlage/affordability framing), the Mietspiegel
  codebook and Baunutzung class doc, ADR-0003 §Price/rent, and this sign-off.

## Binding conditions for D3 implementation

These are **domain** conditions; they sit alongside the geo-DS's 16 (which I do not restate — I
endorse them) and are tracked/discharged in D3 model headers, index-definition §5, and the G2 page.

1. **D1 — BRW level vs rent gap.** The BRW *level* is the **price-surface/capitalised-ground-rent
   level** (one term of Smith's gap), **not** "the rent gap". The rent-gap-*realisation* signal is
   the BRW **change** (`brw_trend`), built and polarised separately (concurs with geo 14). Label
   accordingly; never call the level "the rent gap".
2. **D2 — BRW level polarity is AMBIGUOUS.** Publish the BRW level as a **price-surface/consolidation
   *context* covariate**, captioned as ambiguous between historic wealth and active pressure. High
   BRW = low residual headroom (sign-flipped if ever pooled, vulnerability-positive §5), but its
   honest role is context, not a vulnerability score. **Displacement-risk language attaches only to
   the BRW *change* read jointly with low-status/low-Wohnlage context**, never to the level alone.
3. **D3 — %-einfach is a vulnerability/headroom PRECONDITION, not an outcome.** The Wohnlage *level*
   (high einfach share) is a vulnerability/upgrading-headroom indicator (vulnerability-positive),
   **only** displacement-relevant where it coincides with locational desirability/pressure (inner-
   city, rising BRW) — context-condition it, do not read peripheral low quality as gentrification.
   The Aufwertung *outcome* is the **declining** einfach share over vintages, built as an explicit
   change signal if used as such.
4. **D4 — Record polarity meaning in index-definition §5** for all three level signals (BRW level,
   Wohnlage composition/%-einfach, modelled rent) before integration; vulnerability-positive
   convention; domain co-signs the meaning, geo the z-score arithmetic (= geo 12).
5. **D5 — BRW change is the theory-valuable, separately-built signal.** Any `brw_trend`/rent-gap
   reading is an **explicit, separately-polarised change indicator** on the predictor/lead side
   (Smith 1979 realisation), distinct from the level (= geo 14, domain-restated).
6. **D6 — Modelled rent labelling.** Always "modelled/estimated net cold rent at a fixed reference
   dwelling profile"; **never** "rent" / "rent paid". The fixed year-built/size profile is a stated
   modelling choice (= geo 9).
7. **D7 — Mietspiegel Bestandsmiete/lagging caveat disclosed.** The modelled rent is a conservative,
   *lagging* affordability **level** of the standing stock (ortsübliche Vergleichsmiete; Holm 2010,
   ~84% rental Berlin), understating leading-edge/new-letting pressure. Disclose on G2.
8. **D8 — Kauffälle condo churn deferred to its own predictor.** Do **not** fold `c_eigentwhg` into
   the D3 price/rent level dimension: role mismatch (lead vs level), no €-value (count only, D1b C1),
   2024–2025-only temporal disqualification (D1b C4), regulatory confound (D1b C6). Keep it a
   separate cross-sectional condominium/conversion-market churn snapshot, segment-legible (D1b C3);
   polarity/placement on the lead side returns at the index PR (D1b C7).
9. **D9 — Descriptive-not-causal; pressure-not-displacement** framing on every price/rent surface
   (G2/O2), with the misuse/power-dynamics note (= D1b C2/C5 extended to price/rent).
10. **D10 — Ecological + resolution discipline.** PLR is the published floor; **no sub-PLR
    land-value grain** (= geo 16); carry the G-2 ecological-fallacy guardrail; do not imply parcel
    precision from the area-weighted BRW estimate.
11. **D11 — Modelled-estimate + land-reference-value honesty** in labels (BRW = land reference
    value, not dwelling price; modelled rent = modelled, not observed).
12. **D12 — Milieuschutz / counter-misuse framing (central).** Frame the dimension toward the
    **protective** public-interest use (candidate Milieuschutz / Soziale Erhaltungsgebiete
    monitoring; Holm 2010, Bernt 2016), **not** as an investment-opportunity surface. No
    "value-uplift potential" ranking. State that a low land value coinciding with a vulnerable
    population is a flag for **protection**, not an invitation. Acknowledge the power dynamics and
    frame for residents. Prominent on G2.
13. **D13 — Disclose comparability breaks** (Mietspiegel bucket drift, 2026→2025 vintage approx,
    LOR-2021 reform) so level shifts are not misread as change (= geo 8, 10; domain-restated for G2).
14. **D14 — R-C2 grounding** in every D3 model header: Smith (1979); Blasius & Dangschat (1990);
    Holm (2010) / Bernt (2016); Mietspiegel codebook + Baunutzung class doc; ADR-0003 §Price/rent;
    this sign-off.

## Domain rationale (machine-readable)

```json
{
  "verdict": "concerns",
  "verdict_label": "PASS WITH CONDITIONS",
  "domain_rationale": "BRW land values, Wohnlage tier composition, and a modelled Mietspiegel rent estimate are literature-faithful STRUCTURAL-LEVEL descriptors of the Berlin housing market (Smith 1979 rent gap; Blasius & Dangschat 1990 Aufwertung; Holm 2010 / Bernt 2016 Milieuschutz). They are CONTEXT/state, not process: they must enter as baseline covariates in the D4-levels pattern, never blended into the MSS Status x Dynamik typology (the ADR-0008 legacy-averaging error). The BRW LEVEL is ambiguous (historic wealth vs consolidated-gentrified vs active pressure) and is a price-surface context covariate, not a vulnerability or rent-gap score; the rent-gap-realisation signal is the BRW CHANGE, built separately. High %-einfach is a vulnerability/headroom PRECONDITION (context-conditioned on locational desirability), an Aufwertung OUTCOME only in its decline. Kauffalle condo churn is deferred to its own lead predictor (count-only, 2024-25, role mismatch). Conditions concern level-vs-process placement, polarity meaning, and the Milieuschutz/counter-misuse ethical framing of PLR-level land-value publication.",
  "theory_risks": [
    "Level-as-process: averaging a slow structural BRW/Wohnlage/rent level into the dynamic Status x Dynamik typology, reproducing the ADR-0008 legacy-averaging error that lost the lead-lag relationship.",
    "BRW-level overclaim: reading a high land-value LEVEL as 'gentrified' / 'displacement risk' when it is ambiguous between historic wealth, completed gentrification, and active pressure; the rent gap is a change/difference, not a level.",
    "Outcome/precondition conflation: reading high %-einfach as a gentrification outcome rather than a vulnerability precondition; or reading peripheral low quality as upgrading pressure absent locational demand.",
    "Modelled-rent realism: presenting a Mietspiegel-modelled, fixed-profile, Bestandsmiete-lagging estimate as observed rent paid or as a leading displacement signal.",
    "Kauffalle misplacement: folding count-only, 2024-25 condo churn into a multi-vintage price/rent LEVEL dimension, mixing a lead with a level and over-reading two years as a trend.",
    "Ethical misuse: a PLR-level land-value/rent-gap map read as an investor target list, amplifying displacement; the same surface serves capital and residents and must be framed for protection (Milieuschutz)."
  ],
  "recommendations": [
    "Enter BRW/Wohnlage/rent LEVELS as baseline/context covariates (D4-levels pattern); never blend into Status x Dynamik (D1, D2, geo-14).",
    "Treat the BRW LEVEL as ambiguous price-surface context; build BRW CHANGE separately as the rent-gap-realisation lead (D2, D5).",
    "Treat high %-einfach as a vulnerability/headroom precondition, context-conditioned on locational desirability; the declining share is the Aufwertung outcome (D3).",
    "Record polarity meaning in index-definition section 5 before integration (D4, geo-12).",
    "Label modelled rent as modelled/fixed-profile/lagging; BRW as land reference value, not dwelling price (D6, D7, D11).",
    "Defer Kauffalle condo churn to its own lead predictor; do not fold into the price/rent level dimension (D8).",
    "Frame G2/O2 descriptive-not-causal, pressure-not-displacement, ecological-fallacy, PLR-floor (D9, D10).",
    "Frame land-value/rent surfaces toward Milieuschutz/protection, never as an investment-opportunity ranking; acknowledge power dynamics (D12).",
    "Disclose Mietspiegel bucket drift, vintage approximation, and LOR-2021 reform on G2 (D13).",
    "Ground every model header in Smith 1979, Blasius & Dangschat 1990, Holm 2010 / Bernt 2016, the codebooks, and this sign-off (D14, R-C2)."
  ],
  "citations": [
    "Smith 1979, Toward a Theory of Gentrification (rent gap = potential minus actual ground rent; realised via reinvestment/transaction; the gap is a difference, not a level)",
    "Smith 1996, The New Urban Frontier",
    "Blasius & Dangschat 1990, Gentrification: Die Aufwertung innenstadtnaher Wohnviertel (Wohnlage/Aufwertung)",
    "Dangschat 1988, invasion-succession (Berlin; lead-lag of capital/ownership vs social succession)",
    "Holm 2010 (Berlin rental city ~84%; Mietspiegel Bestandsmiete/ortsuebliche Vergleichsmiete; Milieuschutz)",
    "Bernt 2016 (politics of Berlin Soziale Erhaltungsgebiete / Erhaltungssatzungen)",
    "ADR-0008 (lead-lag architecture; deletion of the legacy averaged gentrification_score)",
    "ADR-0003 section Price/rent (P-A Bodenrichtwerte, P-B Mietspiegel/Wohnlage); docs/epic-d/d3-price-rent-geo-signoff.md (conditions 12, 14)"
  ]
}
```

## Note on the dual gate

This completes the R-C1 dual gate for D3 together with the geo-DS PASS WITH CONDITIONS. Both
verdicts carry conditions; per CLAUDE.md §Methodology gate, "PASS WITH CONDITIONS" is an
integratable PASS **provided the conditions are tracked and discharged** in the D3 implementation,
index-definition §5, and the G2 page. The PM may integrate D3 on that basis. The binding placement
conditions (D1, D2, D5, D8) and the ethical-framing conditions (D9–D13) must be enforced at every
downstream surface; polarity/placement of any BRW *change* or Kauffälle lead signal returns to me at
the `gentrification_index.sql` PR (the index-integration dual gate).
