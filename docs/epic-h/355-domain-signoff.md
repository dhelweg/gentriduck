# #355 domain methodology sign-off — Hamburg thesis hypothesis suite

- **Reviewer:** gentrification-domain-expert (R-C1 domain half, ADR-0011)
- **Date:** 2026-11-01
- **Branch:** `feat/355-hamburg-suite` (ddc9edb2 … 52fd1036 vs `develop`; findings at `run_sha` a86fdd34b10e)
- **Inputs:** `docs/epic-h/H-thesis-hypothesis-suite-findings.md`, the `city = HH` rows of
  `docs/epic-e/thesis-hypothesis-suite-results.csv` (100 rows), the pre-registration §4, §5.6, §9
  and Amendments 1–2, my D8 Hamburg additions and R6 (`354-355-preregistration-domain-review.md`),
  `docs/epic-e/354-phase-a-data-prerequisites.md` §5, and `docs/epic-e/354-domain-signoff.md`.
- **Data access:** I did not open the DB. Every number here comes from the committed CSV, the
  findings and the phase-A evidence document.

Verdict: CONCERNS

There are four text-level changes to the generated findings (C1–C4, §6). They need no
re-analysis and move no verdict or label. The design, the verdict mapping, the comparability text
and most of the §9 guards are sound. Once the regenerated findings carry C1–C4, I re-check those
items only.

```json
{
  "verdict": "concerns",
  "domain_rationale": "All 16 headline cells follow §5.6 under the 'Matches Berlin 2018?' name. The §4.5 comparability text is verbatim, including 'a matching verdict is not evidence that they are the same'. 'Transfer test, not replication' is stated in §2 and §13. The migration-background construct is named in every H1a-c sentence (§3). Shock timing covers all four windows, the refugee entry of 2016-18 and the most shock-exposed status of HH/modern. The findings contain no 'pressure' wording for Dynamik. The below-chance H2 is correctly NOT SIGNIFICANT and read as instability, not as an inverse prediction. Four gaps remain. (1) §13 quotes the generic 'shops, services and public facilities' H1 line, which contradicts §3/§4: Hamburg H1/H2 contain no shop or service category. (2) The 'positiv vs rest (predicts improvement) … SUPPORTED' row has no guard sentence, and §4 calls 'negativ' 'not the gentrification-relevant change', which implies that 'positiv' is. (3) The shock text treats refugee arrivals only as SGB II entry after recognition. Hamburg's D1 is the change in the share of children with a migration background, and S3 counts AsylbLG from 2019, so arrivals move status and Dynamik directly, including the 2022 arrivals from Ukraine. (4) The cross-city table labels Hamburg H1 'not reproduced …' without saying that it is not a business-mix test.",
  "theory_risks": [
    "Hamburg H1/H2 test transport, street furniture and tourist facilities, all campaign-mapped classes (D2). They are not the thesis's Angebotsstruktur, so Hamburg cannot speak to the business-mix claim.",
    "H1a/H1b describe 100 of 857 Gebiete (12%, 40 Stadtteile), the dense gastronomy core. H1a is significant under BH but not Holm.",
    "The status composite includes children with a migration background. A café or fast-food association with it is open to an ethnic misreading, and the anti-stigmatisation check (R3) could not run.",
    "Dynamik classes are about 85-90% 'stabil' (tie ceiling 0.49-0.69), so the H3 nulls rule out only strong orderings.",
    "The 'positiv vs rest' secondary (0.550 negligible / 0.607 poor, uncorrected) has no status-level control. In Berlin, the status level fully explained the H2 link."
  ],
  "recommendations": ["C1-C4 required (§6)", "R1-R4 optional (§7)", "Hamburg page wording per §5"]
}
```

## 1. Theory fidelity of the Hamburg findings text

| Check | Result |
|---|---|
| **Construct named in every H1a–c statement (D8e)** | **Met in the prose.** §3 opens by defining status as the Sozialmonitoring Statusindex (seven indicators, including migration background and school leaving), and each H1a/H1b/H1c bullet repeats it. §13 carries it as a must-not-claim line. The headline tables (§1, §2) are tables, not statements. The page has to carry the definition above its table (§5). |
| **"A matching verdict is not evidence of the same process"** | **Met**, verbatim in §2, with the five caveats. |
| **Shock timing (D7, §4.3)** | **Mostly met.** It covers the window ending 2016 (start of the 2015 arrivals), 2019 (refugee entry into SGB II 2016–18, plus the 2019 definition change), 2022 (pandemic) and 2025 (Rechtskreiswechsel, 2023 Bürgergeld and Wohngeld-Plus). It also states that `HH/modern` is the most shock-exposed panel, gives the H1 2025 level with the migration-background channel, and covers the phase-shift chains. **Gap: the direct migration-background and AsylbLG channel in the Dynamik (C3).** |
| **Transfer test, not replication** | **Met** (§2, §13). The column is named "Matches Berlin 2018?". |
| **§9 must-not-claim, #358** | The §9 list is reproduced, and the findings contain no "pressure" wording for Dynamik. **Two defects:** the generic H1 line (C1), and the "gentrification-relevant" phrase in §4 (C2). |
| **Verdict mapping** | All 16 cells are correct. H1 is BH-n.s. with unadjusted p 0.044, so "not reproduced at the corrected threshold (nominally significant)". H1a is SUPPORTED small against a thesis 0, so "stronger than thesis". H1b holds. H1c is opposite, with the Tabelle 6-14 clause. H2 is n.s., so "consistent (still unclear)". The H2 incremental CIs include 0, but Amendment 2 only binds for a SUPPORTED H2, so the plain label is correct. H3a is "consistent (rejected)" (unadjusted p 0.78 and 0.44, no N4 note). H3b is "not reproduced". H3c is "consistent (still unclear)". |
| **R6 pivot-2016 caveat, D8g indicator-value check, E5 supersession, tie ceiling (354 R5)** | Present (§8, §9, §15, §10). |

## 2. Construct wording for Hamburg H1/H2

**Yes, §13 must change (C1).** At Gebiet grain (about 2,200 residents) no shop, service, gastronomy
or entertainment category passes the A1.1 ≥ 20% rule:
- H1 has 12 features: Mobility (2), Public Space (7), Tourism (3).
- H2 has 9 features: Mobility and Public Space only.
- The commercial-only H1 row has no data.

So Hamburg H1/H2 do not test the thesis's *Angebotsstruktur*. They test street furniture,
transit and tourist infrastructure. These are exactly the campaign-mapped classes that D2 kept out
of H3, and the classes the thesis itself dismissed as having *"keine inhaltliche Relevanz"*
(§6.3.2.2). The binding wording for Hamburg:

- **H1:** "the mix of transport, public facilities and tourist facilities".
- **H2:** "the mix of transport and public facilities".
- **Never** "shops", "services", "businesses" or "commercial mix" for Hamburg H1/H2. "Local
  offering" is acceptable only with the list.

The §3/§4 sentences already say this. §13 is the binding list, and it must not contradict them.
For the cross-city reading, Hamburg H1 is **not a transfer test of the business-mix claim**. The
label "not reproduced …" is correct as a mapping but needs that qualifier wherever it appears
next to Berlin's "holds" (C4).

## 3. The H2 results

**Below-chance primary (full chain, AUC 0.440 [0.397, 0.481]).** The theory reading is
**ratified**: the link between the OA mix and worsening does not carry over between Stadtteile. It
is not an inverse prediction. A domain mechanism supports that reading. The H2 features are
benches, post boxes, recycling points, phones, toilets and transit stops, and their OSM density
follows district mapping campaigns rather than local social structure. An association learned on
one set of Stadtteile then encodes *which Stadtteile were mapped when*, and it would be expected to
fail, or invert, on held-out Stadtteile (R1). The label stays NOT SIGNIFICANT / "consistent (still
unclear)". The public page must never write "the mix predicts the opposite", "predicts
improvement" or "contradicted".

**"Positiv vs rest" secondary (0.550 negligible, full; 0.607 poor, 2019–2025; uncorrected).** This
row must not become "OA predicts improvement". The reasons, which belong in the findings (C2):
1. It is one of 72 uncorrected exploratory rows, with about 3.6 expected significant by chance.
2. It has no status-level control. In Berlin, the status level alone predicted the next change
   better than the mix, and the mix added nothing (Amendment 2). In Hamburg's primary contrast, too,
   the status class alone (0.577) beats status plus mix (0.546).
3. The features are campaign-mapped street furniture and transit (above).
4. "Positiv" means **falling officially measured disadvantage**. That is not gentrification (§9):
   it can come from jobs, children ageing out, new-build in-movers, or refugee accommodation closing
   (which in Hamburg also lowers the migration-background indicator, C3).

The §4 sentence "Under #358, 'negativ' is filtering, not the gentrification-relevant change"
implies that "positiv" *is* the gentrification-relevant change. It must be rephrased (C2).

## 4. H1a wording

The label "stronger than thesis" stands, because BH governs (§5.5). But the public sentence must
carry all four qualifiers:
1. **Coverage:** 100 of 857 Gebiete (about one in eight, 40 Stadtteile) with at least ten
   gastronomy outlets, the dense core. Retained and dropped Gebiete have similar status mixes (17%
   vs 18% in classes 3–4).
2. **Strength and correction:** small (ρ −0.27). It is significant at the 5% false-discovery rate
   across the eight tests, but not under the stricter family-wise test (Holm p 0.06 / 0.07).
3. **Construct:** status is the Sozialmonitoring composite, which includes children with a
   migration background and school-leaving outcomes. The page must not let it read as "cafés where
   few migrants live".
4. **Cross-city:** Berlin 2019–2025 shows no such link (café share is n.s.). A diverging verdict is
   not evidence that the cities' processes differ (§4.5).

Papachristos et al. (2011) concerns café *growth*. This is a stock-share association, so do not
cite it as confirmation.

## 5. Public wording for the Hamburg recheck page

**Columns:** *Hypothesis* · *2018 thesis (Berlin)* · *Berlin today (2019–2025)* · *Hamburg, full
chain 2013–2025* · *Hamburg, 2019–2025 (pivot 2022)*.
- The two Hamburg columns are headed **"Matches Berlin 2018?"**.
- The thesis column shows words only, with no AUC.
- The H1 family uses the same 2025 cross-section in both Hamburg columns. Show it once (merged
  cell) or mark it "same test", so readers do not count it twice.

**Above the table (binding):**
> Hamburg measures social status differently. Its Sozialmonitoring combines seven indicators: the
> share of children with a migration background, children of single parents, SGB II and asylum-seeker
> benefits, unemployment, children and older people on minimum income, and school-leaving outcomes.
> It publishes four status classes and three change classes. A Hamburg result is an association with
> that composite, not with any one indicator or group. Hamburg is an out-of-sample transfer test,
> not a replication. A matching result is not evidence that the same process is at work, and a
> different result is not evidence that it isn't. At Hamburg's small statistical areas (about 2,200
> residents), shops and services are too sparse to measure the local mix, so Hamburg's H1 and H2 use
> transport, public facilities and tourist facilities instead.

| # | Hypothesis | 2018 thesis | Berlin today | Hamburg full chain | Hamburg 2019–2025 |
|---|---|---|---|---|---|
| H1 | Social status is linked to the local mix | Supported | **Holds** (businesses) | **No reliable link**: not a test of shops and services here (transport, public and tourist facilities only) | same test |
| H1a | Many cafés: higher status | Undecided | **Still unclear** | **A small link**: in the densest one in eight areas only | same test |
| H1b | Larger fast-food share of the gastronomy mix: lower status | Supported | **Holds** | **Holds**: in the densest one in eight areas only | same test |
| H1c | Many sport and leisure facilities: higher status | Undecided | **Opposite direction** | **Opposite direction** | same test |
| H2 | Today's mix is linked to the next change in officially measured disadvantage | Unclear | **Still unclear: explained by current status level** | **Still unclear** | **Still unclear** |
| H3a | Commercial change first | Rejected | **Rejected, as in 2018** | **Rejected, as in 2018** | **Rejected, as in 2018** |
| H3b | Change in measured disadvantage first | Tentatively supported | **Not reproduced** | **Not reproduced** | **Not reproduced** |
| H3c | Both in the same period | Undecided | **Still unclear** | **Still unclear** | **Still unclear** |

**Per-row sentences:**
- **H1:** "In Hamburg the test can only use transport, public facilities and tourist facilities.
  Their mix shows no reliable link with the status class (significant only before correction, and
  negligible in size). It says nothing about shops and services, which are too sparse to measure at
  this grain."
- **H1a:** "Among the roughly one in eight statistical areas with at least ten gastronomy outlets,
  cafés make up a larger share of the gastronomy mix where Hamburg's status composite is better. The
  effect is small. It is significant at the 5% false-discovery rate across the eight tests, but not
  under the stricter family-wise test. Berlin today shows no such link, which is not evidence that
  the cities differ."
- **H1b:** "Among the same areas, fast food makes up a larger **share** of the gastronomy mix where
  Hamburg's status composite shows more disadvantage. This is an area-level pattern and a
  deprivation hypothesis. We could not test whether it depends on one type of outlet." No
  döner, kebab, migrant-economy or ethnic wording. Do not single out the migration-background
  indicator as the explanation. Name the composite as a whole.
- **H1c:** "As in Berlin, more sport and leisure facilities go slightly with *more* disadvantage. In
  OpenStreetMap these are mostly public playgrounds and table-tennis tables, provided where many
  families live. A check on organised sport alone had too little data."
- **H2:** "Only the mix of transport and public facilities (stops, benches, post boxes, recycling
  points) can be measured. It shows no reliable link to which areas the monitor classes as
  worsening. Over the full chain, a model trained on some districts ranks the others slightly the
  wrong way, which we read as a relationship that does not carry over between districts, not as a
  reverse prediction. A secondary check on the areas classed as improving shows a weak, uncorrected
  link. It was not tested against the areas' current status, which in Berlin fully explained such
  links, so it is not evidence that these facilities predict improvement. Improvement in measured
  disadvantage is not the same as gentrification."
- **H3 (a–c):** "No detectable ordering between business change and change in officially measured
  disadvantage, in either direction or in the same period. This holds for the full chain, for
  2019–2025, for each starting point and for all three shifted chains. Hamburg's change measure is
  coarse (about nine in ten areas are classed 'stable'), so this rules out only a strong ordering.
  Every window contains shocks: refugee arrivals 2015–18 and 2022, the pandemic, and the 2023
  benefit reforms."
- **Corrections note:** "This replaces an earlier Hamburg timing analysis (E5), which compared
  overlapping change windows. Its conclusion, no ordering in either direction, is unchanged; its
  numbers should no longer be cited."

**Must not appear:** "Hamburg confirms Berlin" for H1b, H1c or H3 (a matching verdict is not
evidence of the same process). "Pressure" for Dynamik. "Business mix" or "shops" for Hamburg
H1/H2. Any thesis AUC next to a suite AUC. Causal or displacement language.

## 6. Required changes (C1–C4) for PASS

Each is a generator template change plus a regeneration. No statistic changes.

- **C1 — §13, H1 line.** Keep the §9 bullet verbatim and append: "**Hamburg (#355):** no shop,
  service, gastronomy or entertainment category reaches the measurement base at Gebiet grain, so
  Hamburg H1 is worded 'the mix of transport, public facilities and tourist facilities' and H2 'the
  mix of transport and public facilities'. Never 'shops', 'services', 'businesses' or 'commercial
  mix' for Hamburg H1/H2 (§3, §4)."
- **C2 — §4, positiv guard and #358 sentence.**
  (a) Replace "Under #358, 'negativ' is filtering, not the gentrification-relevant change." with:
  "Under #358, 'negativ' (growing measured disadvantage) is filtering, at most a rent-gap
  precondition; 'positiv' (falling measured disadvantage) is consistent with, but not evidence of,
  upgrading (§13)."
  (b) After the H2 contrast table, add: "**The 'positiv vs rest' secondary is not evidence that the
  mix predicts improvement.** It is uncorrected (1 of 72 exploratory rows, about 3.6 expected
  significant by chance) and has no status-level control. In the primary contrast, the status class
  alone (0.577) outperforms status plus mix (0.546), and in Berlin the status level fully explained
  the H2 link (Amendment 2). Its features are campaign-mapped transport and street-furniture
  classes, and falling measured disadvantage is not gentrification (§13)."
  (c) In the contrast labels (§1 operationalisation table, §4 table, §12 rows), replace "(predicts
  worsening)" / "(predicts improvement)" with "(target: classed as worsening)" / "(target: classed
  as improving)". This still names the contrast (D8f), but cannot be read as a finding when it sits
  next to "SUPPORTED".
- **C3 — §7, direct refugee channel in Hamburg's indicators.** Add one bullet after the window
  ending 2016: "**Hamburg-specific channel.** Hamburg's D1 is the 3-year change in the share of
  children with a migration background, and from the 2019 edition S3 also counts AsylbLG recipients
  (phase A §5). Refugee arrivals therefore move status and Dynamik directly once they are registered
  as residents, not only through SGB II after recognition. This affects the windows ending 2016 and
  2019 (arrivals 2015–16) and 2025 (arrivals from Ukraine from March 2022, including many children).
  Closing or moving accommodation moves them the other way. The effect is local, near accommodation
  sites." Add the same channel to the row `notes` for rows that span these windows. The current
  notes name SGB II entry only.
- **C4 — Hamburg H1 qualifier in the cross-city readings.** Under the §1 headline table and the §2
  cross-city table, add: "Hamburg H1 is not a transfer test of the business-mix claim: its features
  are transport, public facilities and tourist facilities only (§3, §11), so its label does not set
  Hamburg against Berlin's 'holds' (businesses)."

## 7. Recommendations (non-blocking)

- **R1** In the §4 below-chance paragraph, add the domain mechanism: the H2 features follow
  district mapping campaigns, so an association learned on some Stadtteile can encode mapping
  history and invert on held-out Stadtteile. This is consistent with the instability reading, and it
  is not tested.
- **R2** The pandemic note on Hamburg H2 rows says Dynamik "can correlate with gastronomy". Hamburg
  H2 has no gastronomy feature, so the mechanism applies to H3 (commercial basket) and H1a/b, not to
  H2. Word the H2 note as "can correlate with the local mix through the labour market".
- **R3** Under the §1 headline table, add a one-line status definition (the Sozialmonitoring
  composite, including migration background and school leaving), so that the construct is named
  next to every H1a–c number and not only in §3.
- **R4** Follow-up (already noted as phase A O4): a continuous Hamburg secondary on the
  labour-market and transfer core S3–S6 from the open annex z-scores. That would give Hamburg H1a–c a
  status measure without the migration-background indicator, which is the strongest available
  answer to the ethnic-misreading risk. It needs an architect check and its own sign-off.

## Sources

Helweg (2018) §4.5, §6.2.3, §6.3.1.1, §6.3.2.1–6.3.2.2, Tabellen 6-14, 6-16. Dangschat (1988); Smith
(1979); Döring & Ulbricht (2016); Pearce et al. (2007); Papachristos et al. (2011); Powell et al.
(2006). Freie und Hansestadt Hamburg, *Sozialmonitoring Integrierte Stadtteilentwicklung*, report
annexes 2016–2025 (indicators S1–S7, D1–D6; dl-de/by-2.0), as documented in
`docs/epic-e/354-phase-a-data-prerequisites.md` §5. BA-Statistik (2022), Rechtskreiswechsel.
Project: pre-registration §1.2, §4.3–4.5, §5.1, §5.5–5.6, §9, Amendments 1–2;
`docs/epic-e/354-domain-signoff.md` §3, §5, R5.

---

## Addendum (2026-11-01): Amendment 3, and one agreed page text with the geo-DS

### Amendment 3: ratified

I ratify **Amendment 3 (post-results clarification, 2026-11-01)** as written:
- An AUC primary is SUPPORTED only if AUC > 0.5 and p_BH < 0.05.
- An AUC significantly below 0.5 is NOT SIGNIFICANT, flagged "out-of-fold AUC significantly below
  0.5 (no transferable prediction)".
- The two-sided bootstrap p stands.
- Readings (a), CONTRADICTED, and (b), a one-sided p, are rejected.
- No permutation null is adopted after the fact.

The theory side. H1 and H2 are non-directional in the thesis's own wording ("hängt zusammen",
"haben einen Einfluss"), so there is no hypothesised sign to contradict. The rule only ever
weakens a claim: it keeps Hamburg H1 at NOT SIGNIFICANT and gives the below-chance H2 no
substantive reading. That is the same criterion under which I ratified Amendment 2. The
grouped-CV artefact (Parker, Günter & Bedo 2007) and my campaign-mapping mechanism (§3, R1) are
compatible explanations of the same fact, and neither is tested. The page uses the geo-DS
sentence ("no usable signal, not an opposite effect") and does not claim either mechanism.

### Reconciliation: the Hamburg page follows this list

Where my §5 and the geo-DS §7 differ, the page uses the text below. It supersedes my §5 table cells
and per-row sentences for these rows.

| Row | Agreed text | Difference from my §5 |
|---|---|---|
| Column header | **"Matches Berlin 2018?"** for both Hamburg columns. The H1 family is shown once ("same test", one 2025 cross-section). | None. |
| H1, H2 cell | **Geo-DS text adopted:** "Not comparable: no business category can be measured at Hamburg's small-area grain." Sub-line: "A test on transport, public and tourist facilities found no clear link" (H1) / "…found no transferable prediction" (H2). H2 full chain adds: "Prediction was worse than chance in every held-out district. We read this as no usable signal, not as an opposite effect." | Replaces my "No reliable link: not a test of shops and services here". Geo's leads with non-comparability, which is better. |
| H2, "classed as improving" secondary | **Not shown on the page.** If it is ever mentioned, use my §5 guard verbatim ("weak, uncorrected … not tested against the areas' current status … not evidence that these facilities predict improvement. Improvement in measured disadvantage is not the same as gentrification."). | Geo §7 is silent on it. This is an addition, not a conflict. |
| H1a | **Geo-DS §4 text adopted verbatim**, with the cell label "Stronger than thesis (tentative)". Then **append one clause** after "Berlin's own re-test found no café link": "…, which is not evidence that the two cities differ." | Replaces my "A small link: in the densest one in eight areas only". The added clause is §4.5. |
| H1b | **Geo-DS text adopted**, with two additions: "We could not test whether it depends on one type of outlet." Name the composite as a whole, and do not single out the migration-background indicator as the explanation. "As in Berlin" is acceptable only because the §4.5 "Always" line (agreement is not proof of the same mechanism) sits directly under the table. | The additions are R3/item 13 and D8e. |
| H1c | Geo-DS text ("opposite direction, small, as in Berlin. Mostly playgrounds and public table tennis") plus my sentence "provided where many families live". | Equivalent. |
| H3a–c | Geo-DS text, with two edits. (1) "change in the Sozialmonitoring Dynamik" becomes **"change in officially measured disadvantage (Hamburg's Sozialmonitoring Dynamik class)"**, as §9 requires and to match the Berlin page. (2) Append my shock line: "Every window contains shocks: refugee arrivals 2015–18 and 2022, the pandemic, and the 2023 benefit reforms." | The §9 outcome name and the D7 disclosure on the page. |
| Above the table | My §5 construct paragraph (binding), plus the geo-DS "Always" line. | The geo-DS line is already contained in mine. Keep one. |
| Corrections | My E5 supersession note ("conclusion unchanged; numbers no longer cited"). | Geo §7 is silent on it. Addition. |

### Effect on C1–C4

The verdict is unchanged: **CONCERNS**, with C1–C4 as in §6. One edit to C4 aligns it with the
agreed label. The findings line under the §1 and §2 tables should read: "Hamburg H1 and H2 are
**not comparable** with the thesis's H1/H2: no business category can be measured at Gebiet grain;
their features are transport, public facilities (and, for H1, tourist facilities) only (§3, §11)."
C2 and C3 stand unchanged. They are not covered by the geo-DS conditions: C2 is the positiv guard
and the #358 sentence, and C3 is the direct D1/AsylbLG refugee channel.

---

## Re-check of C1–C4 and R1–R3 (2026-11-02)

Scope: `git show 1ed46268 af6fffe2` and the regenerated
`docs/epic-h/H-thesis-hypothesis-suite-findings.md` at af6fffe2 (`run_sha` 1ed46268d3ed). I did
not open the DB and did not switch branches.

```json
{ "verdict": "pass",
  "domain_rationale": "All seven items are in the generated outputs, worded as requested. A cell-by-cell CSV diff (2458d1d7 -> af6fffe2, 216 rows, run_sha ignored) shows changes only in Hamburg rows: 4 operationalisation and 2 outcome cells (C2c relabel) and 72 notes cells (C3, R2, Amendment 3 flag). There are zero changes to estimate, CI, p, verdict, effect label, holds or n, and no Berlin row changed.",
  "theory_risks": [],
  "recommendations": ["Hamburg page follows the agreed text in the Addendum reconciliation table"] }
```

| Item | Where | Status |
|---|---|---|
| **C1** §13 Hamburg wording line | §13, after the §9 H1 bullet, verbatim. | **Met.** |
| **C2(a)** #358 sentence | §4 lead: "'negativ' … filtering, at most a rent-gap precondition; 'positiv' … consistent with, but not evidence of, upgrading". | **Met.** |
| **C2(b)** positiv guard | §4, bold paragraph after the contrast table, verbatim. It includes the 0.577 vs 0.546 and Amendment 2 points. | **Met.** |
| **C2(c)** contrast labels | §1 operationalisation table, the §4 table and paragraph, §12, and the CSV `operationalisation` (4 rows) and `outcome` (2 rows). They read "target: classed as worsening / improving". | **Met.** Relabelling the CSV too is **fine and preferred**: the CSV is the public artefact, and it now agrees with the findings. These are descriptive text columns, and no statistic or row key changed. |
| **C3** direct refugee channel | §7 bullet ("Hamburg-specific channel": D1, S3 with AsylbLG, windows ending 2016/2019/2025, reverse effect on closure, local), and in the `notes` of every row that spans those windows. | **Met.** |
| **C4** (as edited in the Addendum) | The "not comparable" line under the §1 table (line 30) and under the §2 cross-city table (line 92), verbatim. | **Met.** |
| **R1** campaign-mapping mechanism | In the §4 below-chance paragraph, next to the Parker et al. artefact, as "two compatible explanations … neither is tested". | **Met.** |
| **R2** H2 pandemic note | §7 and the H2 row notes: "with the local mix through the labour market"; gastronomy is kept for H3 and H1a/b. | **Met.** |
| **R3** status definition | One line under the §1 table (line 28). | **Met.** |

The Amendment 3 flag wording ("out-of-fold AUC significantly below 0.5 (no transferable
prediction)") is in the §1 cell, the §4 table and the H2 notes. Deviation 13 discloses the gate
text changes accurately.

**E1b §12 item 16 (Berlin, earlier notes-only change).** It adds the W1 shock notes to 6
`BER/modern` pivot-difference and level-stratified H3a/H3b rows. This is exactly the D7 rule that
every row spanning W1 names the mechanism, now applied to rows that had missed it. The geo-DS
diffed all 116 Berlin rows (`docs/epic-h/355-geo-signoff.md` §5): only `notes` changed, and no
estimate, CI, p, verdict or `holds` value moved. My own diff for these two commits shows no Berlin
change at all. **It does not affect my #354 sign-offs**
(`docs/epic-e/354-domain-signoff.md`, PASS after the C1–C4 re-check) **or the phase C page
sign-off** (`docs/epic-e/354c-page-domain-signoff.md`, PASS). The page reads only primary-row
`holds` and `estimate`, which are unchanged.

Amendment 3 stays ratified.

Verdict: PASS
