# Evidence-integrity fixes — Domain Sign-off (R-C1, domain half)

- **Author:** gentrification-domain-expert
- **Date:** 2026-10-27
- **Branch:** `fix/methodology-evidence-integrity` (stacked on `infra/osm-cuisine-backfill`);
  reviewed as `git log develop..HEAD` (26 commits, head `5d36b5ae`).
- **Scope:** theory fidelity, indicator/outcome validity and public-claim ethics of: the thesis-verdict
  correction (Tabelle 6-16), the cross-lagged H3a/H3b test (`analysis/directional_inference.py`,
  E1/E5), the OSM extractor fixes (`docs/epic-c/OSM-extractor-fixes-2026-10-evidence.md`), back-test
  Test F (`analysis/backtest_index.py`, `docs/methodology/backtest.md`), the rewritten public claims,
  and the BRW stacked-zone fix (`int_berlin_brw_plr`).
- **Method:** read the diffs (`git show` / `git diff develop..HEAD`); re-read the thesis PDF
  (pp. 41–42, 63–64, 70, 86–91 of `Helweg_Masterarbeit_final.pdf`, including the raw glyphs of
  Tabelle 6-16); read-only queries on `data/gentriduck.duckdb` (final corrected build).
- **Companion gate:** geo-data-scientist (statistical soundness). Points marked *(geo-DS)* below are
  shared and flagged for that review; they are not decided here.

```json
{
  "verdict": "concerns",
  "domain_rationale": "The analytical corrections are sound and move the project toward the literature: thesis verdicts now match Tabelle 6-16, H3a/H3b are finally separable, ghost POIs are gone, and the back-test no longer calls a circular check validation. Several public statements remain unfaithful to the thesis or over-claim: EWR is called a 'welfare register' and 'the data the thesis used' (it is neither); H1 is paraphrased as a directional claim the thesis never made; three H3 table cells mis-describe their test; and the home page, takeaways and whitepaper still present the back-test as validation against independent ground truth. All of this is text that can be fixed before integration.",
  "theory_risks": [
    "EWR composite (residence duration, age structure, nationality/migration background) presented as 'social status': fewer migrants read as higher status",
    "Thesis outcome was MSS Status/Dynamik, so the thesis-era MSS panel is the like-for-like re-test, not EWR",
    "H1 tested with a single-number proxy, not the thesis's multi-feature 'offering structure' claim",
    "Dynamism-based cross-lags difference two single-year share-change z-scores: a change in pace, not commercial change",
    "Node-only OSM extraction: a node redrawn as a way reads as a disappearance, not a closure",
    "Milieuschutz targets areas where a displaceable population remains, so pooling consolidation-pressure into 'upgrading' dilutes Test F"
  ],
  "recommendations": ["see Binding conditions C1-C6 and Recommendations R1-R10"]
}
```

(The machine block says `concerns` because the conditions are open. Once C1–C6 are applied the
verdict is the final line of this file. No further domain review is needed if they are applied as
written.)

---

## 1. Thesis verdicts from Tabelle 6-16 — PASS with conditions (C1, C2)

**The verdict column is now faithful.** I checked the raw glyphs of Tabelle 6-16 (PDF p. 91):
H1 ✓, H1b ✓, H2 0, H3a ✗, H3b (✓), H3c 0. The summary text agrees: *"Die Hypothesen H1 und H1b
konnten nachgewiesen werden … H3b ist eher bestätigt, während wenig für die entgegengesetzte
Hypothese H3a spricht. Bei H2 und H3c ergibt sich kein klares Bild."* The new column
(Proven / Proven / Inconclusive / Rejected / "eher bestätigt" / Inconclusive) matches. "Rejected" is a
fair rendering of ✗ together with "wenig spricht für" and "keine inhaltliche Relevanz" (§6.3.2.2).
The old page's four errors (H2, H3a, H3b and H3c all shown as supported) are corrected. The whitepaper,
methodology page and the O4 correction box now agree with the table.

Two fidelity errors remain in the surrounding reporting. They now matter more because the page
explicitly claims to report against the thesis.

**(a) EWR is not the thesis's outcome data, and it is not a welfare register.** The thesis's
target variable was the **MSS index**: Status for H1, binary Dynamik for H2/H3 (§6.2.3: *"Für die
Modellierung der Dynamik soll deshalb der binäre Dynamikindex des MSS verwendet werden"*;
Tabelle 6-1; editions 2013/2015/2017 per Tabelle 4-7). It used EWR (Einwohnerregister = the
*resident* register) as an input to its Döring-&-Ulbricht-style own index. That index was tested as a
target and found unpredictable (Tabellen 6-9/6-10), so it was not used to evaluate the hypotheses.
The project's EWR composite (`int_ewr_socioeco`) is built from foreigners share, migration-background
share, under-18 share, mean age and 5-year residence duration. It contains no welfare, transfer or
income data. Calling it "the welfare-register data the thesis used" is wrong on both counts. It also
tells readers that "commerce and *social status* move together" when the series measures
**population composition**. On a public site, calling a falling migrant share "status improving" is
an ethics problem as well as a construct error. It follows that the thesis's like-for-like re-test
is the **thesis-era MSS panel**. That panel contains the 2013, 2015, 2017 and 2019 editions (verified
in `int_mss_lead_lag`: pivots 2015 and 2017), not "2015–2019" as labelled, and H2, H3a and H3b are
all not significant on it. One fairness caveat belongs with that statement. The re-check measures
status change as a move between the four MSS status classes, while the thesis used the finer MSS
Dynamik index. The null is therefore a lower-powered test, not a clean refutation (see R1).

**(b) H1 is misparaphrased.** The thesis's H1 is non-directional and structural: *"Der soziale
Status einer Nachbarschaft hängt mit den lokalen Angebotsstrukturen zusammen"* (§4.5). It was
"proven" by a multi-feature model (SimpleLogistic, AUC 0.87, 8 features with |r| > 0.3) and by
category correlations of mixed sign (Tabelle 6-11: restaurants with higher status, fast food and
Spielotheken with lower status). The page renders it as "More businesses → higher social standing"
and marks "❌ Does not replicate" on the strength of total POI count and a single four-domain OA
basket. That tests a volume claim the thesis never made. The H1b result, which does replicate, is
itself part of the thesis's H1 evidence.

## 2. Cross-lagged H3a/H3b — PASS with conditions (C3)

**The design is an appropriate operationalisation of the ordering question.** The question in
Dangschat's (1988) double invasion-succession model is whether the social succession precedes the
commercial one. Testing that needs strictly ordered, non-overlapping windows, with each direction
controlling for the outcome's own prior trajectory. This is Granger-style predictive precedence, and
it is the right logical form. The previous symmetric test could not separate the directions at all.
Controlling for the D4 baseline level is theory-correct: in Döring & Ulbricht (2016) susceptibility is
a common precondition of both cycles. Rank-based estimation respects MSS ordinality.
Cluster-bootstrap CIs respect neighbourhood dependence. The pages correctly say
"predictive, not causal".

**The substantive reading is mostly sound, with these domain qualifications:**

- **Co-evolution is not anti-Dangschat.** In the double cycle, pioneer residents draw pioneer
  commerce, which helps attract gentrifiers, who draw upscale commerce. The cycles are coupled and
  interleaved, so bidirectional precedence is what the model predicts at annual resolution. The EWR
  "both directions" result goes against the thesis's *either/or* framing of H3a vs H3b, not against
  the double-cycle theory. The page's "neither clearly leading" wording is acceptable.
- **What MSS "status leads" means.** MSS Status measures concentrations of disadvantage
  (unemployment, transfer receipt, child poverty). It moves when disadvantaged households leave, age
  out or are replaced, which is a late-cycle signal. Pioneer invasion barely registers. The
  2021–2025 H3b result therefore reads as "a fall in measured disadvantage precedes relative
  commercial change". That is consistent with late-phase ordering, and it is **not** evidence of
  displacement (G-1). See R9.
- **The only supportive panel is the weakest-controlled one.** The 2021–2025 pivot (2023) runs
  without the D4 control ("unavailable at the pivot"), and its windows span the pandemic and the
  commercial aftermath (2021 MSS = 2020 data). Area type (inner-city susceptible PLRs) and a
  period-specific shock are both live alternatives. The page says "whether it reflects a real shift
  … or chance cannot be settled" but names neither. (C3b)
- **Mis-described cells.** (i) The 2021–2025 H3a "**contradicted** on raw counts" used C5-corrected
  dynamism, not raw counts. It is also borderline: the CI lower bound is 0.001 and the analytic
  p is 0.065. Bolding it overstates it. (ii) The EWR panel is described as "about the same strength"
  in both directions. At k=2 the thesis-rejected direction is, if anything, the larger (H3a −0.18 vs
  H3b −0.10, overlapping CIs). Also, the EWR cross-lag uses **raw** OSM count changes, contrary to
  index-definition §2.4 and the whitepaper's own lead-lag spec ("C5 … applied before the lead-lag").
  Mapping growth 2014–2020 was concentrated in inner-city areas whose composition also changed
  fastest, so a coverage artefact can feed both directions *(geo-DS)*. (iii) The EWR "H3c supported
  (rho −0.42)" correlates **levels** in the same year (POI count vs composite). That is an H1-type
  cross-sectional association, not "commercial and social change co-occur" (thesis H3c =
  istOSM_new ⇔ istDynamik, i.e. change against change).
- **Construct note on the dynamism variant** *(geo-DS)*. `dynamism_score` is already a z-scored
  year-over-year *share change*. `build_cross_lagged` differences it between editions, so d_poi is a
  change in the **pace** of relative commercial growth (a second difference) and covers only the
  single year ending at each edition. The OA variant (difference of OA levels) is the closer analogue
  of the thesis's `_new`/`_ytd` flows, and it agrees with the dynamism variant on the 2021–2025 H3b
  result. Hamburg's null rests only on the second-difference construct. Not binding, see R2.

The E5 Hamburg write-up is faithful: independent re-test, no assumed outcome, the cadence caveat
kept, and co-movement no longer labelled directional. "Neither timing direction shows up at any lag
from one to three years" is accurate as stated.

## 3. OSM extractor fixes — PASS with condition (C5)

**Removing ghosts is correct and makes D3 more faithful.** The thesis worked from dated OSM
snapshots, which cannot contain deleted features. The improved agreement with the thesis's own OA
values (domain ρ 0.76 → 0.84) independently confirms this. The thesis also extracted **nodes only**
("Filter auf spezielle POI-Nodes"), so node-only extraction is faithful too. First-match
classification restores the taxonomy the thesis and the June build used (100% identical
`poi_type` for shared POIs).

**How "commercial succession" (D3) should now be read.** With ghosts kept, every exit was a
non-event, so D3 measured accumulated *entries*: the invasion half of the commercial cycle without
the succession half. High-churn areas, which are often exactly the gentrifying ones, accumulated the
most ghosts and looked like growth areas. After the fix, D3 is **net relative amenity growth**
(entries minus exits, as a share of the city). That is more honest. It is still not succession in
Dangschat's or Krajewski's sense, which is *replacement* of incumbent businesses. An area can see
total commercial replacement (Kneipe → café) with zero net share change. Public copy should keep
saying "change in the amenity mix / relative amenity growth" and not claim that D3 detects
replacement. A gross entry/exit decomposition is future work (R4).

**Node→way caveat: a real domain concern.** A node that disappears is not a closure. Conversions to
building outlines are likely to concentrate in well-mapped inner-city areas, which are often the
gentrified cores. This biases D3 *downward* exactly where commercial upgrading happens. It can also
mimic "commercial decline", and it attenuates H3b. As long as conversions cannot be told apart from
closures, no surface may present POI disappearance as business closure, and still less as commercial
displacement or a displacement-adjacent signal. I found no current page that does. Today the public
methodology page cannot even warn a reader about it, because its OSM limitation does not say that
counts are point-only (C5). Whether C5 should model node→way migration is the geo-DS's call.

## 4. Test F — Milieuschutz — PASS with condition (C4, last clause)

**Milieuschutz is an appropriate, partially independent reference for *pressure*.** A soziale
Erhaltungsverordnung (§172 Abs. 1 Nr. 2 BauGB) is designated by the Bezirk after studies of three
things: upgrading potential in the building stock, upgrading pressure (rents, conversions,
modernisation) and a resident population at risk of displacement. That is close to the index's
"upgrading pressure" construct, and the designation is not computed from the index. Independence is
partial for the reasons the report already gives: the screening studies use MSS/EWR-type
indicators, and district policy is a strong confounder. Friedrichshain-Kreuzberg, Neukölln, Pankow
and Mitte designate widely, while several outer districts designate sparingly.

**"Weak support" is the right framing, and it is not a displacement claim.** The report says
designation comes from "displacement-pressure studies". It never says displacement is confirmed,
and Test F stays non-gating, so G-1 is respected. I did find one theory-driven reason the OR is
modest. §172 requires that a displaceable population still be present, so already-consolidated
areas are expected to be *under*-designated. The stage-level shares at MSS 2025 confirm this
(read-only query on `int_gentrification_ts`):

| Stage | PLRs | under Milieuschutz |
|---|---|---|
| pioneer-signal | 7 | 6 (86%) |
| active-gentrification | 35 | 22 (63%) |
| consolidation-pressure | 9 | 1 (11%) |
| improving-vulnerable | 15 | 7 (47%) |
| stable-established | 351 | 156 (44%) |
| pre-gentrification | 118 | 39 (33%) |

Pooling consolidation-pressure into "upgrading" dilutes the contrast. The pattern is more
theory-consistent than the pooled OR suggests. The n is small, though, and regrouping now would be a
post-hoc fix. Report this descriptively and pre-register any re-specification before promoting
Test F (R5). One wording issue: the generated header line reads "Independent check (Test F …):
**SUPPORTED**" with no qualifier, while the body correctly says "borderline — weak support". Headers
are what readers quote (C4).

## 5. Rewritten public claims — PASS with conditions (C1–C4, C6)

**What is right:** The pages drop "clean replication". They name the 2021–2025-only support for H3b
and the thesis's own tentativeness, and they keep "directional indicators, not confirmatory proof".
They keep the ecological-fallacy caveat and add clear method and data correction notes. Nothing new
says an area "is gentrifying", and nothing names an area as a displacement case. The O4 correction
box is appropriate: the historical record is kept, flagged and pointed to the current results. The
whitepaper H3b wording ("tentatively supported … only on the 2021–2025 official monitor") matches
E1.

**What over- or under-claims relative to E1 and the corrected back-test:**

- EWR mislabelled and misattributed (§1a), on thesis-recheck, index and takeaways (C1).
- H1 misparaphrased; "❌ Does not replicate" overstated (§1b), including methodology-oa-modes
  ("as a test of H1 ('more commerce, higher status')") (C2).
- H2 "⚠️ Mostly supported": it is not significant on the thesis-era official monitor, which is the
  thesis's own outcome series, so "panel-dependent" is the faithful label (C1e).
- The three H3 cells in §2 (C3).
- **The back-test is still advertised as validation.** This branch corrects `backtest.md` ("The
  gate is not evidence that the index measures gentrification … not independent"), but the home
  page section "Does this agree with what we already know?" still says "independently sourced
  ground truth", "a third, independent cross-check … rho = 1.00" and "the credibility check behind
  the headline numbers". Takeaways §2 and §4 say "passes its own back-test against independent,
  literature-documented ground truth", and the whitepaper §Validation says "validates … against two
  independent references". The home page also calls the top MSS status band
  "gentrification-pressure status". It is the most-deprived class: a susceptibility *precondition*
  (Döring & Ulbricht), not pressure. This conflates cause and outcome, which the index was designed
  to keep apart (C4).
- Whitepaper: "the headline result (H3b dominance)" now pre-states a result the re-test does not
  support in general (C6). methodology.md says Döring & Ulbricht (2016) "confirmed this pattern
  specifically for Berlin". D&U operationalised susceptibility and hotspots for Berlin; they did not
  test the double cycle's ordering (C6).

## 6. BRW stacked-zone averaging — PASS

Averaging differentiated Bodenrichtwerte stacked on one zone is **domain-acceptable** as the
neutral choice when staging lacks the differentiating attributes (GFZ, Gebäudeart/Bauweise,
EFH vs MFH). It is clearly better than the previous double-weighting. The union-based coverage is
correct by construction, and the land value is still framed as a reference value, not a rent or a
displacement outcome (D3-brw-trend sign-off D2). Two domain caveats, neither blocking:

- The mean of an EFH value and an MFH value is the land value of neither. For a rent-gap reading
  (Smith 1979) in Berlin, the relevant value is the multi-family rental stock, where displacement
  happens. The stacked values differ substantially: median spread 35–69% of their mean per year
  2017–2023 (`stg_berlin_bodenrichtwert`, W% zones).
- **Composition break 2021→2022.** Stacked zones intersect ~34 PLRs per year in 2017–2021 and ~116
  in 2022. About 80 PLRs move from a single value to an averaged-differentiated value in that year,
  which adds a residual break to `brw_trend` for 2021→2022. It is far smaller than before the fix,
  but it is not zero. `n_stacked_records` is computed but not exposed on the output, so the affected
  PLR-years cannot currently be disclosed (R6). Only the BRW level is public (area page); the trend
  is internal (`int_gentrification_ts`), so there is no public over-claim today.

---

## Binding conditions

All of these are text or copy edits. They must be applied before integration into `develop`. Where
a findings document is generated, edit the generator strings (`analysis/e1_regressions.py`,
`analysis/backtest_index.py`), not the output. That is data-engineer work, and none of it changes
any statistic.

**C1 — EWR and the thesis's outcome measure.** (`web/pages/thesis-recheck.md`, `web/pages/index.md`,
`web/pages/takeaways.md`, and the EWR section header and data line in
`docs/epic-e/E1-regression-findings.md` via its generator)
- (a) Never call EWR a "welfare register". It is Berlin's resident register (Einwohnerregister).
  Describe the EWR panel's outcome as **resident-register population composition (residence
  duration, age structure, nationality / migration background)**, never as "social status".
- (b) Do not describe the EWR panel as "the data the thesis used". In the "Two studies" table, the
  2018 thesis's social measure is: *"Berlin's official social monitor (MSS Status and Dynamik
  indices, editions 2013–2017); resident-register (EWR) data as context inputs."*
- (c) Relabel the pre-2021 MSS panel **2013–2019** everywhere, and say it includes the thesis's own
  2013/2015/2017 editions, which makes it the like-for-like re-test. State in the alert and in the
  "Read the columns together" bullets that H2, H3a and H3b are not significant there. Add: *"the
  re-check measures change as a move between the four status classes, while the thesis used the
  finer MSS Dynamik index, so this is a lower-powered test, not a clean refutation."*
- (d) Re-word the index.md and takeaways.md sentences "on the welfare-register data the (original
  2018) thesis used, commerce and status move together …" to match (a) to (c).
- (e) H2 verdict cell: "⚠️ Mostly supported, small effects" becomes **"⚠️ Panel-dependent, small
  effects"**.

**C2 — H1 as the thesis stated it.** (`web/pages/thesis-recheck.md`, `web/pages/methodology-oa-modes.md`)
H1 hypothesis cell: *"Social status is related to the local mix of businesses"*. Re-check cell: add
that only a single volume proxy (total POI count) and a single four-domain OA basket were tested,
not the thesis's multi-feature model. Verdict: **"⚠️ Not reproduced by a single-number proxy; the
thesis's multi-feature test was not re-run"**, replacing "❌ Does not replicate". Remove or re-word
the alert sentence *'The original "more businesses, higher status" link (H1) does not replicate'*
and the methodology-oa-modes phrase *'as a test of H1 ("more commerce, higher status")'* to match.

**C3 — H3 table precision.** (`web/pages/thesis-recheck.md`)
- (a) H3a, 2021–2025: replace "**contradicted** on raw counts" with *"a borderline result in the
  opposite direction on the dynamism measure (interval only just excludes zero; p ≈ 0.06)"*, without
  bold.
- (b) Add to the H3b cell or the "modern era" bullet: *"this panel's test runs without the
  baseline-susceptibility (D4) control, which is unavailable at the 2023 pivot, and its windows span
  the pandemic and its aftermath."*
- (c) EWR H3a/H3b: replace "at about the same strength" with *"at similar strength — at the
  two-year lag commerce-first is, if anything, the larger"*. Add that this panel uses raw OSM count
  changes without the completeness correction, so mapping growth may contribute to both directions.
- (d) EWR H3c: mark it **"not a like-for-like test (same-year levels, not co-occurring changes)"**.
  Do not count it as support for "commercial and social change co-occur", and adjust the
  "Same-time co-movement (H3c)" bullet accordingly.

**C4 — Back-test claims match the corrected back-test.** (`web/pages/index.md` section "Does this
agree with what we already know?"; `web/pages/takeaways.md` §2 and §4; `docs/whitepaper/whitepaper.qmd`
§Validation and the static-run paragraph; the `backtest.md` header via `analysis/backtest_index.py`)
- Remove "independently sourced ground truth", "independent cross-check", "validates … against two
  independent references" and "credibility check". State that Tests A/D are pipeline-integrity
  checks (rho = 1 by construction, because the index's status column *is* the MSS class), and that
  hotspot and coldspot labels are partly (2/8) or wholly (6/6) MSS class assignments scored against
  a "top decile" that covers 17% of PLRs.
- Name Test F as the only partially independent check, with weak support.
- Replace "top decile of gentrification-pressure status" with *"the most-deprived MSS status
  band"*.
- Generated header: "Independent check (Test F …): SUPPORTED" becomes *"SUPPORTED (borderline —
  weak support; partially independent)"*.

**C5 — OSM node-only caveat on the public methodology page.** (`web/pages/methodology.md` §6,
OpenStreetMap bullet) Add, in substance: *"Only places mapped as points are counted, as in the 2018
thesis. When a mapper redraws a shop as a building outline it drops out of the count, so a fall in
an area's count is not evidence that businesses closed. Nothing on this site treats a disappearing
point of interest as a closure or as commercial displacement."*

**C6 — Literature attributions.** (`docs/whitepaper/whitepaper.qmd`, `web/pages/methodology.md`)
Whitepaper lead-lag spec: "the headline result (H3b dominance)" becomes *"which direction dominates,
if either"*. methodology.md: "Döring & Ulbricht (2016) confirmed this pattern specifically for
Berlin" becomes *"Döring & Ulbricht (2016) operationalised gentrification susceptibility for
Berlin's planning areas"*. The ordering claim stays attributed to the thesis, tentatively, as it now
is.

## Recommendations (non-binding)

- **R1** Re-run H3b on the 2013–2019 MSS panel using the **MSS Dynamik index** as the prior
  social-change measure. That is the thesis's own operationalisation (§6.2.3, Tabelle 6-1) and the
  most faithful single test the project can run.
- **R2** *(geo-DS)* Replace the second-difference dynamism cross-lag with share-level differences
  over each window, or document it as a "change in pace" construct in E1 and E5. Note that the
  Hamburg null rests only on it.
- **R3** *(geo-DS)* Move the EWR cross-lag onto C5-corrected share changes (index-definition §2.4).
- **R4** Decompose commercial change into gross entries and exits once node→way conversions can be
  separated using way history. Until then D3 means *net relative amenity growth*.
- **R5** Test F: report designation share stage by stage (table in §4). Before any promotion to
  gating, pre-register the theory-driven expectation (pioneer/active over-designated,
  consolidation under-designated) and stratify by Bezirk (e.g. Mantel-Haenszel) for district
  policy. Keep it non-gating.
- **R6** BRW: expose `n_stacked_records` (or a stacked flag) on `int_berlin_brw_plr`, disclose the
  2021→2022 composition break in the D3-price row of index-definition, and later ingest the
  differentiating attributes so the multi-family value can be preferred.
- **R7** The thesis has eight hypotheses (H1, H1a–c, H2, H3a–c). Either say "six of the eight" or add
  H1a/H1c (thesis: significant but very weak, "weder gestützt noch verworfen").
- **R8** takeaways.md: "fast-food turnover" becomes "fast-food presence" (H1b is a stock
  association). Phrase fast-food findings at area level ("areas with more fast-food outlets tend to
  have lower official status scores"). Avoid any reading that stigmatises particular businesses or
  owners (the thesis's own Kebap correlation is the obvious misuse vector).
- **R9** When H3b is discussed, explain that MSS status tracks concentrations of disadvantage, so
  "status leads commerce" means a fall in measured disadvantage precedes commercial change. That is
  not evidence that anyone was displaced (G-1).
- **R10** In future copy, present the double cycle as coupled processes: co-evolution is consistent
  with Dangschat. Avoid framing H3a and H3b as mutually exclusive.

## Sources

Helweg (2018) Masterarbeit, §4.5, §6.2.3, Tabellen 4-7, 6-1, 6-9/6-10, 6-11, 6-16; Dangschat (1988);
Döring & Ulbricht (2016); Smith (1979); Krajewski (2006) on commercial gentrification; §172 Abs. 1
Nr. 2 BauGB; `docs/methodology/index-definition.md` §2.4, §1.3, §5; `docs/epic-e/E1-regression-findings.md`;
`docs/epic-h/E5-hamburg-lead-lag-findings.md`; `docs/methodology/backtest.md`;
`docs/epic-c/OSM-extractor-fixes-2026-10-evidence.md`.

## Conditions closure (project-manager, 2026-10-27)

Applied as written, on `fix/methodology-evidence-integrity`:

- **C1** EWR = resident register / population composition, never "welfare register" or "the data the
  thesis used" (thesis-recheck, index, takeaways, methodology §5, E1 generator, O4 correction box);
  "Two studies" row uses the given wording; pre-2021 MSS panel relabelled 2013–2019 everywhere and
  named the like-for-like re-test with the lower-powered sentence; H2 verdict "Panel-dependent, small
  effects". Commits `75b8e61e` (generators) and the web/claims commit carrying this note.
- **C2** H1 cell, re-check cell and verdict as given; alert sentence and methodology-oa-modes phrase
  re-worded.
- **C3** (a)-(d) applied to the H3a/H3b/H3c cells and the "Read the columns together" / H3c bullets;
  H3c verdict now "Not supported".
- **C4** home-page back-test section, takeaways §2/§4 and whitepaper §Validation + static-run
  paragraph rewritten (integrity checks, label provenance 2/8 and 6/6, 17% band, Test F as the only
  partially independent check, weak support); "most-deprived MSS status band"; backtest.md header via
  the generator.
- **C5** methodology §6 "Only points are counted" bullet, referencing #337.
- **C6** whitepaper "which direction dominates, if either"; methodology D&U attribution.
- Also taken: R8 (fast-food *presence*, area-level phrasing), R9 (status-first = fall in measured
  disadvantage, not displacement). R1-R7 and R10 are filed as backlog issues.

Verdict: PASS with conditions
