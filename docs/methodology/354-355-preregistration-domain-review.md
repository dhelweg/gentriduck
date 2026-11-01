# Pre-registration #354/#355 (thesis hypothesis suite) — Domain Review (R-C1, domain half)

- **Author:** gentrification-domain-expert
- **Date:** 2026-10-28
- **Reviewed:** `docs/methodology/354-355-hypothesis-suite-preregistration.md` (geo-data-scientist,
  2026-10-28, uncommitted, branch `feat/354-berlin-modern-era`). I did not edit it.
- **Method.** (1) I re-read the thesis text: Helweg (2018), §4.5, Tabelle 4-7, Tabelle 6-1, §6.2.3,
  Abbildung 6-3, §6.3.1–6.3.2, Tabellen 6-11 to 6-16. The source is `Helweg_Masterarbeit_final.pdf`
  from the public thesis repository, extracted with `pdftotext -layout`. The extraction scrambles
  columns, so I rebuilt the table rows from the row-label order and checked them against the
  thesis's own prose (§3 below). (2) I ran read-only queries on `data/gentriduck.duckdb` and on the
  raw MSS indicator parquet files. (3) I checked MSS 2023 indicator definitions against berlin.de
  (search result only; the PDFs were rate-limited). Fetched web content was treated as data (SEC-3).
- **Companion gate:** geo-data-scientist (statistical soundness). Items marked *(geo-DS)* are shared
  and need its co-decision.

```json
{
  "verdict": "concerns",
  "domain_rationale": "The architecture is sound and is more faithful to the thesis than anything the project has published so far. It covers all eight hypotheses, uses non-directional classifier tests for H1/H2 as the thesis did, uses non-overlapping Dynamik windows, adds a level control, uses cluster inference with Holm correction, applies the thesis's own 'significant but very small = 0' rule, and frames Hamburg as a transfer test. Four things stop me signing it. (1) The Berlin status composites are built on mislabelled MSS columns: in the warehouse, `kinderarmut_*` is Transferbezug and `alleinerziehende_*` is Kinderarmut. (2) The H3 'POI change' is total-share growth, and two-thirds of that total is benches, recycling containers, bike parking and transit stops. It measures street-furniture mapping, not change in the local offering structure. (3) The H1c variable is mostly playgrounds and public table-tennis tables, and the §1.3 polarity note omits the one significant H1c-consistent row. (4) Several verdict-mapping cells would mislabel an ordering result as 'reversed' or 'rejected'. All four can be fixed in the pre-registration before any code is written.",
  "theory_risks": [
    "MSS indicator labels shifted (s3 = Transferbezug, s4 = Kinderarmut, s2 = Langzeitarbeitslosigkeit / single-parent children): wrong construct names, wrong 'stable core' reasoning, and a downstream defect in int_berlin_rent_pressure_proxy",
    "H3 POI change dominated by street furniture and mobility objects (64% of 2025 POIs; total +58% vs commercial +10% from 2021 to 2025): not Angebotsstruktur, and highly exposed to mapping campaigns",
    "H1c 'sport' = mostly playgrounds and public table-tennis tables in OSM, i.e. public furniture sited in family-dense estates, not Powell-type facilities",
    "Domain-level H1/H2 features net out the within-gastronomy contrast (restaurants vs fast food) that carried the thesis's H1 result",
    "Controlling post-change status level in H3b partly removes the succession mechanism Dangschat posits",
    "Ordering hypotheses (H3a/H3b) scored as sign claims: a significant opposite-sign precedence would be mislabelled 'rejected' or 'reversed'",
    "W3 described as shock-free, but it contains the 1 Jan 2023 Bürgergeld and Wohngeld-Plus reforms and continuing refugee entry into SGB II",
    "Hamburg status includes migration background, so a Hamburg fast-food result risks being read as an ethnic rather than a socio-economic association"
  ],
  "recommendations": ["Required changes D1-D8; non-binding R1-R7; maintainer decisions M1-M4"]
}
```

---

## 1. What is right (keep as is)

- **Scope and test forms.** All eight hypotheses are covered. H1/H2 are tested as non-directional
  classifiers scored by AUC, which matches the thesis's wording ("hängt … zusammen", "haben einen
  Einfluss") and its Tabelle 6-16 test form. This discharges my 2026-10 C2/R7.
- **Outcome.** The suite stays on MSS, not EWR. That is the thesis's outcome (§6.2.3: *"binäre
  Dynamikindex des MSS"*; Tabelle 6-1), and it keeps the 2026-10 C1 discipline.
- **Change measure and windows.** Using each edition's published Dynamik as the change measure is
  the thesis's operationalisation (Tabelle 6-1, "Änderung seit …") and discharges my 2026-10 R1. The
  windows are contiguous and non-overlapping, there are two pivots, and Hamburg steps in 3-year
  intervals. These are the right logical forms for Dangschat's ordering question.
- **H3c.** It is now change against change (thesis: istOSM_new ⇔ istDynamik), which discharges
  2026-10 C3(d).
- **Verdict rule.** The "significant but sehr gering → 0" rule is verified. §6.3.1.1 and the
  Tabelle 6-16 summary apply exactly that to H1a/H1c.
- **Public-claim limits.** §9 carries the 2026-10 R8–R10 discipline.
- **Comparability text.** The Hamburg comparability statement (§4.5) is well formed (additions in D8).

## 2. Hypothesis wording and Tabelle 6-16 mapping — verified, with corrections

The verbatim wording in §1.1 matches §4.5. The verdicts (H1 ✓, H1a 0, H1b ✓, H1c 0, H2 0, H3a ✗,
H3b (✓), H3c 0) match the Tabelle 6-16 glyphs and the summary text. Three fidelity facts the
pre-registration does not state, and which the findings must carry:

1. **The thesis's headline AUCs are not comparable to the suite's.** Abbildung 6-3 shows that the
   best models for H1 (AUC 0.88/0.87), H2 (0.77) and H3b (0.81) were **BZR-grain** (137 areas). H3a's
   best model (0.72) was PLR-distcalc. Each came from **random 10-fold CV** (§6.2.3) and was the
   **best of about 19 algorithms** (§6.2.4). The thesis also used up to 85 OA features at every
   taxonomy level. The suite uses PLR grain, cluster-grouped CV, one pre-specified L2 logistic
   model and domain features. Each of these lowers AUC, so a lower modern AUC is not, by itself,
   evidence of weakening.
2. **The thesis verdict was a judgment, not a threshold.** Tabelle 6-16 combines AUC with
   "Features sinnvoll?" and correlation counts. For H3a the thesis rejected an AUC-0.72 model
   because its features were parking meters, cleaning services, playgrounds, clothing containers
   and table-tennis tables, which have *"keine inhaltliche Relevanz"* (§6.3.2.2). That
   content-plausibility check matters for D2, D3 and D4.
3. **H2 guard.** The thesis itself explained away its only H2 correlation (fast-food OA vs Dynamik,
   −0.30) as a *"Scheinkorrelation"* via status level (§6.3.2.1). The §5.2 ΔAUC interpretation guard
   is therefore the thesis's own reasoning. It should bind the "Holds?" mapping (D5).

## 3. The H1c polarity issue — the finding stands but is incomplete

Rebuilt Tabelle 6-14 (H1c, "Sport und Erholung" vs MSS status index; higher index = worse status):

| Grain | Measure | Pearson r (p) | Spearman ρ (p) |
|---|---|---|---|
| BZR | population-weighted stock | **−0.20 (0.02)** | −0.11 (0.20) |
| PLR | population-weighted stock | −0.07 (0.15) | −0.05 (0.27) |
| PLR-dist | population-weighted stock | −0.04 (0.37) | 0.01 (0.80) |
| BZR | OA | −0.03 (0.74) | 0.09 (0.27) |
| PLR | OA | 0.03 (0.56) | **+0.10 (0.03)** |
| PLR-dist | OA | −0.01 (0.90) | **+0.13 (0.01)** |

The prose of §6.3.1.3 confirms this row assignment. It reports a very small *positive* OA correlation
"nur auf Ebene der Planungsräume … bei der Distanzgewichtung leicht höher", nothing at BZR, and *"auf
Ebene BZR eine entgegengesetzte geringe negative Korrelation nach Pearson"*.

- §6.3.1.1 fixes the polarity: *"Ein negativer Indexwert bedeutet eine geringere Arbeitslosigkeit,
  Kinderarmut"*. The H1a and H1b texts read it correctly. The H1c text reads it backwards: it treats
  the positive OA rows as hypothesis-consistent and calls the negative BZR row "entgegengesetzt".
  The summary then repeats that slip (*"H1a und H1c haben signifikante Korrelationen, die der
  Hypothese entsprechen"*). **The pre-registration is right that a sign slip exists.**
- **It is wrong that "the significant H1c correlations are positive" and that the numbers "point
  against H1c".** The significant rows have **mixed signs**. Two PLR OA Spearman rows (ρ ≈ +0.10 to
  +0.13) go against H1c. One BZR stock Pearson row (r = −0.20) supports it. The thesis's 0 verdict is
  unaffected, and mixed signs justify it even better than "very small".
- **A plausible substantive reason.** In the project's OSM taxonomy, "Sports and Recreation" is
  mostly public furniture. In Berlin 2017, 877 of about 1,595 POIs were playgrounds and 342 were
  table-tennis tables, against 32 fitness centres. In 2025 there were 1,984 table-tennis tables and
  868 playgrounds, against 375 fitness centres. Hamburg 2025 looks the same: 592 playgrounds and 307
  table-tennis tables. Playgrounds and outdoor tables are planned public provision, dense in
  family-heavy post-war and GDR estates where MSS status is lower. That would produce exactly the
  wrong-signed PLR OA association. This is a hypothesis, not a test result, but it means H1c in OSM
  does not measure the commercial or organised facilities that Powell et al. (2006) studied.

**Public wording (proposed, for `/thesis-recheck` and both findings files):** *"The 2018 thesis rated
H1c as undecided. Its correlations between sport and leisure facilities and the official status index
were very small and of mixed sign. At planning-area level, more facilities went slightly with lower
official status; at district-region level, the population-weighted count went slightly with higher
status. The thesis text describes the planning-area result as in line with the hypothesis; under the
index's own sign convention it is not. The 'undecided' verdict is unaffected. In OpenStreetMap this
category consists mostly of playgrounds and public table-tennis tables."*

## 4. Non-directional H1/H2 as grouped-CV AUC — endorsed, with two fidelity fixes

The form is right. CONTRADICTED being impossible for H1/H2 follows from the wording. Grouped CV is a
stricter and better standard than the thesis's random CV. That is a legitimate modernisation, and
it is disclosed under D4. Two domain problems remain:

- **Feature resolution.** The thesis's H1 evidence is *compositional within domains*. Its best
  simple BZR model is restaurant OA (−1.53), social facilities and gambling halls (§6.3.1). The top
  correlations are restaurants −0.45 vs fast food +0.44, German restaurants vs kebab (Tabelle 6-11).
  A domain-level "Gastronomy" OA adds restaurants, cafés and fast food together, which cancels the
  very contrast that carried H1. Domain-only features under-operationalise "Angebotsstruktur" and
  bias H1/H2 toward a null (D4).
- **What the classifier learns.** The 13 domains include Public Service (social facilities, which are
  partly sited *because of* low status, e.g. Quartiersmanagement) and Mobility. The thesis's H1
  features include letterboxes and stops. That is faithful to the thesis. But a SUPPORTED H1 then
  does not license "the local mix of **businesses**" (my own 2026-10 C2 wording) unless a
  commercial-only row also holds (D4, D8).

## 5. Berlin modern window — endorsed, with corrections to the shock disclosure

MSS 2021/2023/2025 on LOR 2021, W1–W3 and pivots 2021/2023 are the right choice. I verified in the
warehouse that the published `*_dynamik` equals `anteil_E − anteil_{E−2}` on LOR 2021 (r = 1.000,
mean absolute deviation 0.003 pp for 2023 and 2025). So the 2021 Dynamik really is the 2018–2020
change on the new geometry, and window-start levels can be rebuilt (D6). Corrections to §3.4 (D7):

- **W3 is not "after the shock".** The 1 June 2022 Rechtskreiswechsel was a step for refugees present
  at that date. Later arrivals, and recognised asylum seekers in general, keep entering SGB II during
  2023–2024. The 1 January 2023 Bürgergeld reform (higher standard rates, waiting periods for assets
  and housing costs) and the Wohngeld-Plus reform (which moves some households out of SGB II) changed
  who counts in all three SGB-based indicators. Their small-area effect is unknown and may differ in
  direction. The text must not imply that W3 is clean.
- **W1 has a sectoral mechanism, not just "noise".** Pandemic job losses in 2020 hit hospitality,
  culture and tourism workers. Plausibly they live disproportionately in inner-city areas with dense
  gastronomy (Berlin mean `arbeitslose_dynamik` 2021 = +1.09 pp, the only positive edition). W1
  Dynamik can therefore correlate with gastronomy OA through the labour market rather than through
  upgrading, and W2 contains the bounce-back. Name this mechanism for H2/H3c pooled rows that
  include W1.
- **H1 cross-section (2025).** Status levels in 2025 include refugee-related SGB II receipt
  concentrated near large accommodation sites. This is a modest effect on a level, but it belongs in
  the limitation line.

## 6. Reconstructed continuous composites vs published classes — endorsed in principle, but the inputs are mislabelled (blocking)

A continuous composite split at 0 is faithful to the thesis (`80_result_full_plr.sql`:
`status_klasse_prj_bi` / `dynamik_klasse_prj_bi` split the metric index at 0), and preferring it over
drift-affected classes is right. **The column labels the composite is built on are wrong.**

Evidence (`stg_berlin_mss_indicators` and raw parquet `raw_attr`):

| Warehouse label (WFS attr) | Editions populated | Mean (range) | ρ with s1 (2025) | What it behaves like |
|---|---|---|---|---|
| `arbeitslose_anteil` (s1) | all | 3.9–7.4 | — | **Arbeitslosigkeit** |
| `transferbezug_anteil` (s2 / s2_x) | **2015, 2017**, 2023, 2025 (not "always null") | 2015–17: 2.0–2.4 (0–6.1); 2023–25: 24–26 (6–50) | 0.52 | **Langzeitarbeitslosigkeit** (≤2017), then **children in single-parent households** (2023+) |
| `kinderarmut_anteil` (s3) | all | 9.9–12.2 (≤45) | 0.95 | **Transferbezug** |
| `alleinerziehende_anteil` (s4) | **all, from 2015** | 20.8–28.4 (0–77) | 0.93 (0.96 with s3) | **Kinderarmut** (under-15s in SGB II) |

Three things together make this high-confidence. (a) The MSS 2025 report quoted in
`R-A4-geo-signoff.md` lists the index indicators in S1–S4 order: *"Arbeitslosigkeit, Kinder/Jugendliche
in alleinerziehenden Haushalten, Transferbezug, Kinderarmut"*. (b) berlin.de's MSS 2023 material
names *"Status 3 – Transferbezug"* and S2 as the new single-parent indicator. (c) An indicator
introduced in 2023 cannot be populated from 2015, as s4 is. The ingestion
(`ingest_mss_indicators.py`, lines 130–138) instead maps s2→transferbezug, s3→kinderarmut and
s4→alleinerziehende. It is still a hypothesis until the DE verifies it against each edition's
Indikatorenheft, but nothing in the data supports the current labels.

Consequences for the pre-registration:
- The composite "arbeitslose + kinderarmut" is in fact **unemployment + transfer receipt**. That is a
  valid MSS core, but §3.2 names it wrongly.
- The reasoning "avoids the `transferbezug` gap" is wrong. Transferbezug (s3) and Kinderarmut (s4)
  are populated in **every** edition from 2015 to 2025. The gap is at S2.
- A **three-indicator core (S1 Arbeitslosigkeit, S3 Transferbezug, S4 Kinderarmut)** is available
  throughout. It *is* the official index set in 2019/2021 and three of four in 2015/2017 and
  2023/2025. It is more faithful than two indicators, and it adds child poverty, the indicator most
  exposed to the 2022 shift.
- **Cross-cutting defect (outside this pre-registration; PM to file).**
  `int_berlin_rent_pressure_proxy` uses `transferbezug_anteil` as "transfer stress". For 2023/2025 that
  column is the share of children in single-parent households, so the D5 `displacement_subindex`
  carries a family-structure indicator labelled as benefit stress. That is a construct and ethics
  problem. `index-definition.md` §4.4/§7.2, the R-A4 sign-offs and ADR-0007's indicator table repeat
  the wrong labels.
- Smaller point for the thesis-era panel: the s1 mean drops 6.16 → 3.89 between the 2017 and 2019
  editions, while the published 2019 Dynamik mean is −0.97. That suggests a definition change at 2019
  (MSS 2023 defines S1 as SGB II unemployment only). Within-edition z-scores and published Dynamik
  are unaffected, but do not compare levels across that seam.

## 7. Hamburg Sozialmonitoring as the MSS analogue; "transfer test, not replication" — endorsed, with additions

Status (4 classes) and Dynamik (3 classes, 3-year window) are the right analogue. Gebiet grain with
Stadtteil clusters is right. "Transfer test, not replication" is the correct framing. The five caveats
are accurate (I re-checked the seven indicators against `H1-domain-signoff.md` §2–3 and ADR-0014 §2).
The Berlin 2023+ index now also contains single-parent children, so the construct gap is migration
background and school leaving. Additions (D8):

- **Ethics of the construct.** Hamburg's status index includes *Kinder und Jugendliche mit
  Migrationshintergrund*. A Hamburg H1b result ("fast food ↔ lower status") is therefore partly a
  fast-food ↔ migrant-children association. The thesis's own kebab correlation (Tabelle 6-11) shows
  how that can be misused (2026-10 R8). Every Hamburg H1a–c statement must name the construct.
- **Symmetry.** §4.5 says a diverging verdict is not evidence that the processes differ. It must
  also say that a **matching verdict is not evidence that they are the same**. With different
  constructs, agreement can be coincidental.
- **Shock timing differs.** Under the E ↔ Dec (E−1) convention, the Hamburg window ending at
  edition 2025 (Dec 2021 → Dec 2024) contains the Rechtskreiswechsel and the 2023 reforms. The
  window ending at 2022 contains the pandemic. §3.4's disclosure is Berlin-only and needs a Hamburg
  counterpart.
- **Hamburg H2 binarisation.** "negativ vs rest" makes the target *decline*. Under #358 that is
  filtering, not the gentrification-relevant change. That is acceptable for a non-directional H2,
  but "positiv vs rest" must be a pre-registered secondary, and the wording must name which change
  is predicted. Positives are about 4–10% per class per edition (2016/19/22/25: positiv 79/31/61/41,
  negativ 85/42/59/44 of about 850).
- **Indicator values.** Make the DE's check of whether the open Sozialmonitoring data carry the
  seven indicator values **binding** (it is currently optional). If they do, a labour-market and
  transfer-core composite (SGB II, Arbeitslose, Kinder in Mindestsicherung, Mindestsicherung im
  Alter) is the domain-preferred secondary for H1a–c. It needs its own sign-off, as §4.4 says.

## 8. Outcome framing vs gentrification theory, including #358

- **The suite's signs are theory-consistent.** It expects *improving* status (falling measured
  disadvantage, lower D) to go with commercial growth. That matches the D1×D2 typology (upgrading
  requires non-negativ Dynamik, index-definition §1.5), Dangschat's double cycle and the thesis's
  H3b evidence (Tabelle 6-15: new bars, pubs, Gaststätten and Vergnügung follow status rises). It
  does **not** match the site's "negative Dynamik = higher pressure" convention, or the phrase in
  index-definition §1.4 calling 3 = negativ "the gentrification-relevant upward-pressure end". That
  is the #358 problem. Negative Dynamik is filtering, at most a rent-gap precondition (Smith 1979).
  The suite must not import that phrase or any "pressure" wording for Dynamik (D8).
- **Improvement ≠ gentrification.** MSS status can improve through in-situ labour-market gains,
  ageing out of child poverty, new-build in-movers, or the closure or relocation of refugee
  accommodation, as well as through compositional upgrading. The suite's outcome is "change in
  officially measured disadvantage". Public text must say so (2026-10 R9 extended).
- **Gentrification is conditional on level; the pooled test is not.** Theory places the
  POI ↔ improvement link in low- and mid-status, susceptible areas (index-definition §1.5, §9;
  Döring & Ulbricht 2016). In high-status areas it means little, and large estates may show
  filtering-down. A city-wide pooled ρ mixes these processes. The thesis pooled, so the pooled
  primary is faithful. A level-stratified secondary must be pre-registered *now*, or it will be
  post hoc later (D8).
- **Rent gap and displacement.** No hypothesis in the suite measures rents, land values or
  displacement, and §9 correctly forbids displacement language. Excluding BRW and Wohnlage (§4.1) is
  right: adding them would change the hypotheses.

---

## Required changes (binding before domain PASS)

All of these are edits to the pre-registration text. D1 also needs a DE verification step. None needs
a result in hand.

**D1 — MSS indicator labels (blocking prerequisite).**
(a) Add a binding DE prerequisite (§2): verify the s1–s4 / d1–d4 meaning per edition against the
official MSS Indikatorenhefte for 2015–2025. State in the findings which WFS attribute feeds each
composite.
(b) Redefine §3.2 by *meaning*, not warehouse label. S_E = mean of within-edition z-scores of
**Arbeitslosigkeit (s1), Transferbezug (s3), Kinderarmut (s4)**, and D_E likewise from d1, d3, d4,
subject to (a). If (a) shows otherwise, use the verified populated core and say why.
(c) Correct §2, §3.2 and §3.3(3): the gap is S2 (Langzeitarbeitslosigkeit ≤2017, suspended 2019/2021,
single-parent children 2023+), not Transferbezug.
(d) Pre-register a validity check: Spearman between rebuilt S and the published status class, and
between rebuilt D and the published Dynamik class, per edition. If either is below 0.80, the
findings must say the composite diverges from the official classification.
(e) Ask the PM to file a separate data-defect issue covering the staging labels,
`int_berlin_rent_pressure_proxy`, index-definition §4.4/§7.2, R-A4 and ADR-0007. It must not be
silently fixed inside the suite branch.

**D2 — H3 commercial-change construct.** §5.1: compute the H3a/H3b/H3c primary POI change as DHS
growth of the area's C5 share **within the commercial consumption domains** (Gastronomy, Retail,
Services, Entertainment, the existing E1 #168 basket), not of all POIs. The reasons: in Berlin 2025,
Public Space (benches 28k, recycling 20k) and Mobility (39k) make up 64% of all POIs. From 2021 to
2025 the total grew 58% while commercial POIs grew 10%. Total-share growth therefore tracks
street-furniture mapping, and the uniform-coverage assumption of C5 is least credible exactly there
*(geo-DS)*. The thesis itself dismissed an H3a model built on such objects (§6.3.2.2). Keep
total-share growth as a secondary (continuity), next to the OA-basket row.

**D3 — H1c variable and the §1.3 note.**
(a) Pin the H1c primary to the thesis's variable: the domain **"Sports and Recreation"** OA, which
corresponds to Tabelle 6-14 `oa_total_d_sport_und_erholung` and allows the thesis-era panel to be
compared number-for-number.
(b) Pre-register a secondary on the **Sport category without table tennis** (organised and commercial
facilities), which is closer to Powell et al.
(c) Rewrite §1.3 as in §3 above: mixed signs, include the BZR stock row (r = −0.20, p = 0.02), and the
0 verdict is unaffected. Adopt the public wording given there, including the composition sentence.

**D4 — H1/H2 feature resolution and AUC comparability.**
(a) H1 and H2 primaries use **category-level** OA (all categories passing the min-base flag,
pre-specified, with no selection outside the CV loop), because the thesis's H1 signal sits within
domains. Domain-level OA becomes a secondary. If the geo-DS objects on statistical grounds, the
alternative is acceptable: keep the domain primary, pre-register the category-level row, and word a
domain-level NOT SIGNIFICANT as "not detected at domain resolution" *(geo-DS)*.
(b) Pre-register a commercial-only H1 secondary (the four commercial domains or their categories).
(c) Binding findings text: thesis AUCs are not comparable (BZR grain, random 10-fold CV, best of about
19 algorithms, 85 OA features). No table may set the thesis AUC against the suite AUC as a measure of
weakening. Report the strongest standardised coefficients with their signs, the analogue of the
thesis's "Features sinnvoll?" column.

**D5 — §5.6 verdict mapping.**
(a) For 0-rows, CONTRADICTED → **"opposite direction (thesis: undecided)"**, not "reversed". For H1c,
add: "consistent with the sign of the thesis's own planning-area OA correlations (Tabelle 6-14)".
(b) H3a CONTRADICTED → **"diverges: commerce-first association of opposite sign"**, not "consistent
(rejected)". H3a/H3b are *ordering* claims (§4.5 wording has no sign), so a significant
opposite-sign precedence is still precedence.
(c) H3b CONTRADICTED → **"ordering present, opposite sign"** (status improvement followed by relative
commercial decline), not "reversed".
(d) ✓/(✓) rows that are NOT SIGNIFICANT after Holm but have unadjusted p < 0.05 → **"not reproduced at
the corrected threshold (nominally significant)"**. The thesis applied no multiplicity correction.
(e) H2 "stronger than thesis" requires the §5.2 ΔAUC CI to exclude 0. Otherwise → **"consistent (still
unclear): explained by current status level"**, citing the thesis's own "Scheinkorrelation" reasoning
(§6.3.2.1).

**D6 — H3b level-control timing** *(geo-DS co-decision)*. For H3b, the theory-relevant confounder is
susceptibility *before* the predictor change (Döring & Ulbricht 2016; 2026-10 domain §2). Status at
the pivot is the *end* of that change (S_pivot ≈ S_start + d_P), so holding it constant removes the
part of the succession effect that runs through the new status level, which is Dangschat's
mechanism. Pre-register **S at the start of the predictor window** as the H3b primary control. It
can be rebuilt as `anteil_E − dynamik_E` (verified exact on LOR 2021, so the 2018 and 2020 levels
are available for both pivots). S at the pivot becomes a sensitivity. H3a keeps S at the pivot,
which is the correct baseline for the outcome's regression to the mean. If the geo-DS prefers
S_pivot as primary, pre-register both, and have the findings state which mechanism each control
removes. Escalate if we disagree.

**D7 — Shock disclosure (§3.4).** Remove the implication that W3 is clean. Name (i) continuing refugee
entry into SGB II after June 2022 and (ii) the 1 Jan 2023 Bürgergeld and Wohngeld-Plus reforms, with
unknown small-area direction. Add the W1 sectoral mechanism (pandemic job losses among hospitality and
culture workers ↔ gastronomy-dense areas, with the W2 bounce-back). Add a one-line H1 (2025 level)
limitation. Add the Hamburg counterpart: the window ending at 2025 contains the Rechtskreiswechsel and
the 2023 reforms; the window ending at 2022 contains the pandemic.

**D8 — Theory framing and the Hamburg additions (§4.4, §4.5, §5.2, §9).**
(a) §9: no "pressure" wording for Dynamik in either direction (#358). Describe Dynamik as
"improving / worsening official measure of disadvantage". Add that status improvement ≠
gentrification, listing the alternative pathways in §8 above.
(b) §9: H3c SUPPORTED means co-movement within one window. It cannot by itself establish
simultaneity and must be read together with H3a/H3b.
(c) §9: H1 public wording is "the local mix of shops, services and public facilities" unless the
D4(b) commercial-only row also holds.
(d) §5.2: pre-register an exploratory **level-stratified H3a/H3b** (status at the window start
low/mid vs high, i.e. Berlin S above/below 0; Hamburg classes {2, 3, 4} vs {1}), reported per stratum
with its CI.
(e) §4.5: add "a matching verdict is not evidence that the process is the same", and that Hamburg's
status construct includes migration background and school-leaving outcomes, so every Hamburg H1a–c
sentence must name the construct.
(f) §4.4: Hamburg H2 adds "positiv vs rest" as a pre-registered secondary, and the wording names the
predicted contrast.
(g) §4.4: the DE check for Sozialmonitoring indicator values becomes binding (follow-up composite
remains optional, with its own sign-off).

## Recommendations (non-binding)

- **R1** Pre-register a fidelity check for the thesis-era panel. The H1a/H1b/H1c PLR OA-Spearman rows
  should land near Tabellen 6-12–6-14 (−0.02, +0.27, +0.10). Report any gap as a pipeline divergence,
  not a finding (Epic B framing).
- **R2** H1a note for the findings: the thesis's only significant café row was *population-weighted
  stock* at PLR (Pearson −0.14; Spearman not significant). The OA rows were null (PLR OA ρ = −0.02).
  An OA-primary "consistent (still unclear)" is therefore the expected result even if nothing changed.
- **R3** Exploratory H1b secondary without the döner/kebab type (if the taxonomy carries it). This is
  an anti-stigmatisation check on whether the association depends on one migrant-economy type.
- **R4** Papachristos et al. (2011) is about *growth* in coffee shops as a gentrification marker. A
  café-share-growth vs Dynamik cross-lag (exploratory) is where that literature predicts a signal; the
  stock-vs-status H1a is the thesis's adaptation.
- **R5** Literature attribution on the public page: Pearce et al. (2007) is a New Zealand study of
  fast-food access and *deprivation*. The thesis text says "USA" and "Verdrängung". Describe H1b as a
  deprivation hypothesis, not a displacement one.
- **R6** *(geo-DS)* Flag Hamburg pivot 2016 (OSM about 37% of 2025 counts, with spatially uneven
  mapping diffusion) as the pivot most exposed to completeness artefacts in the era-split text.
- **R7** Optional BZR-grain sensitivity for H1, which is the thesis's own best-model grain. It is
  descriptive only, given n ≈ 143.

## Maintainer decisions (§10) — domain recommendations

- **M1 Keep the Berlin 2013–2019 reference panel: yes.** It is the like-for-like re-test (2026-10 C1).
  It is the only panel where H1a–c can be compared number-for-number with Tabellen 6-12–6-14, and it
  carries #338 (my 2026-10 R1, the most faithful single test) and #349. Without it, the "thesis vs
  2019–2025" comparison mixes era and method changes. Label it "re-analysis of the thesis era with
  current methods", not an independent replication, because it contains the thesis's own editions.
  D1 applies to it as well.
- **M2 Native 2019–2020 POI counts/OA on LOR 2021: yes, approve.** Pivot 2021 is half the directional
  evidence, and H2 gains its third window. The fallback (dominant weight ≥ 0.99) would drop exactly the
  PLRs that the 2021 revision split. As far as I know, the revision split PLRs mainly to even out
  population size, so those PLRs over-represent growth and new-build areas, where real change
  happens. The DE can check this against the crosswalk. Dropping them would bias the sample toward
  stable areas. With D2, the counts are needed for the commercial domains at minimum.
- **M3 Hamburg: full 2013–2025 chain as primary, with modern pivot 2022 as the pre-registered
  era-split secondary.** This agrees with the geo-DS. A modern-only primary is a single pivot, the
  same defect §8 rejects for Berlin. Its outcome window also carries the 2022–2024 SGB II shifts
  (D7), so it is the most shock-exposed pivot to rely on alone. On the Hamburg recheck page, the
  "Berlin today vs Hamburg" comparison should show the pivot-2022 and H1-2025 rows next to the
  full-chain verdict, so the era difference (caveat 5) is visible.
- **M4 Holm, not BH-FDR.** Each row is an individual public claim about a distinct hypothesis on a
  "does the thesis hold" page, so family-wise protection fits. BH remains right for map-wide local
  statistics, where one map is one family (290-NZ1 sign-offs). Holm is valid under the dependence
  between H1 and H1a–c, which the thesis calls *"Spezialformen der Grundhypothese"*. The condition is
  D5(d): a thesis-✓ row lost only to the correction must be labelled as such, not as "not
  reproduced". The thesis applied no correction, and the public page should not imply it failed a
  test it was never subject to.

## Sources

Helweg (2018) Masterarbeit, §4.5, Tabelle 4-7, Tabelle 6-1, §6.2.3–6.2.4, Abbildung 6-3, §6.3.1–6.3.2,
Tabellen 6-11–6-16; `reference/system/80_result_full_plr.sql`. Dangschat (1988); Döring & Ulbricht
(2016); Smith (1979); Papachristos et al. (2011); Pearce et al. (2007); Powell et al. (2006). SenSBW,
*Monitoring Soziale Stadtentwicklung 2023* (berlin.de report pages; S2/S3 definitions) and the MSS 2025
indicator list as quoted in `docs/methodology/R-A4-geo-signoff.md`. Project: `docs/methodology/index-definition.md`
§1.4–1.5, §2.2, §2.4, §5, §7, §9; `docs/methodology/2026-10-evidence-integrity-domain-signoff.md`;
`docs/epic-h/H1-domain-signoff.md`; `docs/epic-g/353-domain-spotcheck.md`; issue #358;
`ingestion/berlin/mss/ingest_mss_indicators.py`; `transform/models/intermediate/int_berlin_rent_pressure_proxy.sql`.
Read-only queries: `stg_berlin_mss_indicators`, raw `data/raw/berlin/mss/*_indicators.parquet`,
`int_poi_offering_advantage`, `int_hamburg_sozialmonitoring_index`.

Verdict: CONCERNS

---

## Re-check, 2026-10-28 (pre-registration revision 2)

I re-read `354-355-hypothesis-suite-preregistration.md` rev. 2 in full against D1–D8. I also ran one
new read-only query (Berlin MSS status-class shares, 2021–2025). I edited nothing else.

```json
{ "verdict": "pass",
  "domain_rationale": "All eight required changes are adopted as written or better. The status composite is now defined by meaning (S1/S3/S4) behind the #360 prerequisite, with a validity check. H3 measures commercial change. H1c uses the thesis variable with an honest mixed-sign note. H1/H2 use category-level features with a fixed, selection-free classifier. The 'Holds?' mapping treats H3a/H3b as ordering claims. H3b controls pre-change susceptibility. Shock disclosure covers all windows and Hamburg. §9 carries the #358, status-improvement, H1-wording and Hamburg-construct guards. The BH choice is a maintainer decision and is implemented with the Holm column, the FDR sentence and the 'nominally significant' rule. Two small, non-blocking text points remain.",
  "theory_risks": ["Berlin level-stratified split at S = 0 puts about half of PLRs, including many 'mittel' ones, in the 'high' stratum (exploratory rows only)"],
  "recommendations": ["N1 Berlin stratum split", "N2 hedge the LOR-split claim", "N3 'at least small' for AUC rows", "N4 'nominally significant' note on H3a"] }
```

| Item | Where in rev. 2 | Status |
|---|---|---|
| D1 MSS labels | §0, §2 (labels and S2 gap stated), §2.1(1) blocking #360 with meaning-named columns and source attribute, §3.2 S/D = S1/S3/S4 and D1/D3/D4, validity check at 0.80, thesis-era S1 seam, §5.8(1), §6.4 | **Met.** The cross-cutting consequences are correctly left to #360. |
| D2 commercial H3 construct | §0, §2, §5.1 (C5 share within Gastronomy/Retail/Services/Entertainment, with the rationale), §5.2 total-share secondary | **Met.** |
| D3 H1c | §1.3 (rebuilt table, mixed signs, BZR row, verdict unaffected, composition, public wording verbatim), §5.1 domain primary, §5.2 Sport-without-table-tennis secondary | **Met.** |
| D4 H1/H2 features, AUC | §1.2 binding AUC-comparability text and top-10 signed coefficients, §5.1 category-level primary with a fixed L2 spec and no selection or tuning, §5.2 domain-level ("not detected at domain resolution") and commercial-only secondaries, §9 wording tied to the commercial-only row | **Met.** |
| D5 "Holds?" mapping | §1.1 (H3a/H3b as ordering claims), §5.6 rows (a)–(e), applied to Hamburg too | **Met.** It also adds "H3a SUPPORTED → diverges: commerce-first precedence", which is correct. |
| D6 H3b control timing | §3.1, §3.5, §4.3 (Hamburg class at E−3), §5.1, §5.8(2) temporal assertion on the control, §11 geo-DS concurrence | **Met.** |
| D7 shock disclosure | §3.4 (W1 sectoral mechanism and bounce-back, W2, W3 not post-shock with the 2023 reforms, H1 level), §4.3 Hamburg timing | **Met.** |
| D8 framing and Hamburg | §9 (no pressure wording, improvement ≠ gentrification, H3c guard, H1 wording, AUC, construct), §5.2 stratified exploratory rows, §4.5 matching-verdict sentence and construct/ethics text, §4.4 "positiv vs rest" secondary with named contrast, §2.1(5) binding indicator-value check | **Met**, with N1 on the Berlin stratum cut. |
| R1–R7 | §1.1, §1.3, §4.3, §5.2 | All adopted, outside the families. |

**Maintainer decisions.** BH-FDR is binding. Domain does not block on it. The implementation keeps
what matters for public claims: per-panel families, a `p_holm` column, the sentence that FDR does not
protect each row, the "significant at FDR 5%; not at family-wise 5%" flag, and the "nominally
significant" label for thesis-✓ rows. Showing `HH/full` and `HH/modern` side by side, with
`HH/modern` as its own 8-row family labelled as the era-split result, is a faithful way to "do both".
The four-column Hamburg page (thesis / Berlin today / Hamburg full / Hamburg pivot 2022) makes the era
difference visible, as I asked under M3.

**Non-blocking points.** These are text edits the geo-DS can make before implementation. If they are
not made, the implementation records them as deviations. None of them affects a confirmatory verdict.

- **N1 Berlin stratum split (§5.2, D8d).** "S ≥ 0 (low/mid) vs S < 0 (high)" splits at the mean.
  Published Berlin "hoch" is only 14–16% of PLRs (2021: 75/536; 2023: 86/536; 2025: 86/535). An S = 0
  cut therefore puts about half the city, including many "mittel" PLRs, which are the
  active-gentrification cell (index-definition §1.5), in the "high" stratum. This blurs exactly the
  contrast the rows exist to show, and it is inconsistent with Hamburg's correct {1} vs {2, 3, 4}.
  Fix: define Berlin "high" as S_start at or below the quantile matching the "hoch" share of the
  pivot's published edition (about the lowest 15% of S). Keep everything else.
- **N2 Hedge the LOR-split claim (§3.3(1)).** "The PLRs split in 2021 over-represent growth and
  new-build areas" was a qualified expectation in my M2 ("as far as I know … the DE can check"). The
  decision to withdraw the fallback stands either way. Either word it as an expectation, or have the
  DE confirm it from the crosswalk and state the result.
- **N3 AUC vocabulary (§5.6, ✓ row).** "SUPPORTED and at least 'small'" for H1 should read "at least
  'poor' (AUC ≥ 0.60)", as the H2 row already does. Otherwise an AUC row has no defined threshold.
- **N4 H3a nominal significance (§5.6, ✗ row).** For symmetry with D5(d), an H3a row that is NOT
  SIGNIFICANT after BH but has unadjusted p < 0.05 should carry "nominally significant" in `notes`.
  The "consistent (rejected)" label can stay.

Verdict: PASS

---

## Re-check of Amendment 1 (2026-10-31, pre-results)

I read Amendment 1 (A1.1–A1.5) of `354-355-hypothesis-suite-preregistration.md` and
`docs/epic-e/354-phase-a-data-prerequisites.md` §8 (O1–O8). I did not open the warehouse, because
another session is building. Nothing below depends on a new query.

```json
{ "verdict": "pass",
  "domain_rationale": "A1.1 keeps the D4 construct intact. The min-base flag stays a measurement-validity rule for 'offering structure'. Imputing a flagged cell with the training-fold mean, inside the pipeline and before standardisation, gives it exactly zero contribution to the linear score: an area whose structure in a domain cannot be measured is treated as uninformative, not as 'structurally different'. Leaving out missing-indicator columns keeps commercial density out of a structure test. This matches the thesis's own choice to evaluate the hypotheses on OA metrics only (§6.2.3: 'Für die Evaluation der Algorithmen sollen nur OA Kennzahlen einfließen'). Cell-level missingness is the right answer to listwise deletion, which would have limited H1/H2 to the dense commercial core and so selected on a correlate of status. Per-1k density is correctly kept out of the primaries. A1.2 removes the presence-conditioning defect. A1.3–A1.5 have no domain effect.",
  "theory_risks": ["Univariate H1a-c now describe areas with a measurable gastronomy (or sport/recreation) mix, a narrower population than the thesis's 436 PLRs", "Thesis-era fidelity check (R1) would compare a min-base OA with the thesis's unbased OA"],
  "recommendations": ["N5 scope sentence for H1a-c", "N6 unbased OA row for the R1 fidelity check", "N7 one population-weighted row, not two", "N8 min-base listed as a thesis deviation"] }
```

**A1.1 against D4.** D4 asked for category-level OA as the H1/H2 primary, so that within-domain
composition (restaurants vs fast food) can carry the signal, as it did in the thesis. A1.1 keeps
that and settles the remaining ambiguity in a domain-correct way:

- **Structure, not density.** A missing-indicator column would carry the information "this area has
  ≥ 10 POIs in domain X". That is commercial density, which A1.1 rightly says the hypothesis does
  not name. Sensitivity (i) measures what density would add. That is the right place for it,
  because the gap between the primary and (i) is a useful finding in itself.
- **What the imputation means.** Fold-mean imputation followed by standardisation puts a flagged cell
  at 0, so it contributes nothing to the score. A sparse area is therefore classified on the domains
  where its structure *is* measurable. In practice those are often public facilities and mobility.
  That is acceptable under H1's wording, and §9 already makes the public sentence depend on the
  commercial-only row, so no "businesses" claim can come from these areas. In the commercial-only
  secondary, sparse areas carry almost no information and pull the AUC toward 0.5. That is honest:
  no structure was observed there.
- **Feature-list rule.** The ≥ 20%-unflagged rule depends only on flags, never on the outcome, and it
  is fixed before fitting with a lexicographic order. That satisfies the no-selection condition of
  D4(a). The per-city/per-panel list will be shorter for Hamburg's smaller Gebiete, so the findings
  should print it.
- **Complete-case sensitivity (ii)** keeps the restricted, dense-core result visible without making it
  the headline. Reporting the status distribution of retained vs dropped areas is what makes the
  range restriction legible.

**Univariate rows.** Keeping the per-variable base rule for H1a–c is correct for a share-based
construct, and n ≈ 200–260 is enough. It does narrow the population, and the published sentence has
to say so (N5).

**A1.2–A1.5.** A1.2 (read `int_poi_oa_native_panel`, not the E1 loader) closes the
presence-conditioning defect (O2) and is required by §5.1. A1.3 (gaussian mass) affects sensitivity
rows only and is immaterial to rank statistics. A1.4 (`zscore_slq`) and A1.5 (`top_child`) are not
inputs to any suite row. The tightened byte-identical rerun rule is welcome. Filing O1, O6 and O7 as
separate issues is the right disposition. No domain effect.

**Non-blocking points** (text only; apply before phase B or record them as deviations):

- **N5 Scope sentence for H1a–c.** Findings and page text for each category hypothesis must say that
  the population is *areas with enough POIs in the parent domain to measure the mix* (for H1b: "among
  neighbourhoods with at least ten gastronomy outlets"). The text must give n retained / n total, and
  give the retained-vs-dropped status distribution in one line. Without this, readers will take a
  result on about 45% of PLRs to describe the whole city.
- **N6 The R1 fidelity check needs an unbased OA row.** The thesis computed Tabellen 6-12 to 6-14 on
  all 436 PLRs with no minimum base. Comparing them with a min-base OA on 199/436 PLRs mixes pipeline
  divergence with a sample change. Add one thesis-era sensitivity row per H1a–c: zero-filled OA, no
  base rule, full frame. Run the R1 check on that row. The flagged primary stays as pre-registered.
- **N7 One population-weighted row, not two.** A1.1(iii) "per-1k-resident counts for H1a/H1b" is in
  substance the §5.2 "population-weighted stock" row (the thesis's *einwohnergewichtet*), which already
  covers H1a–c. State that they are the same row, keep H1c in it, and count it once in the
  exploratory-row tally.
- **N8 Thesis deviation.** List the min-base rule (ADR-0017) in the findings' deviations section as a
  difference from the thesis's operationalisation, which applied none. This is a measurement-validity
  improvement, not a construct change.

Verdict: PASS
