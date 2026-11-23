# #371 (E1c) matched Berlin–Hamburg comparison: results sign-off (domain)

- **Reviewer:** gentrification-domain-expert
- **Date:** 2026-11-05
- **Reviewed:** `docs/epic-e/E1c-matched-comparison-findings.md`, `matched-comparison-results.csv`
  and `matched-comparison-metadata.json` at `run_sha` 14d20548b5be (B = 1999, DE review APPROVE,
  rerun byte-identical). Also the Amendment 5 correction note (4b3551bf) and the E4 evidence in
  `docs/epic-e/371-data-checks.md` §2 check 6 and §3.1.
- **Measured against:** my binding items for #371:
  - D1–D10 (`docs/methodology/371-preregistration-domain-review.md`);
  - E1–E9 (`371-amendment4-domain-review.md`);
  - F1–F2 and O1–O3 (`371-amendment5-domain-review.md`).
- **Scope:** domain validity and public framing. Statistical soundness is the geo-DS's half of
  the gate.

Verdict: PASS, conditional on R1 and R2 (§5) landing in the regenerated findings. If they land as
worded, no re-check is needed.

```json
{
  "verdict": "pass",
  "domain_rationale": "The findings respect every binding wording item: the D8/D10 statement rule, the E8 no-ranking rule, the E9 accommodation text, the E3 'S3 base revised by the publisher' disclosure without site labels, the O3 N1 wording, the R7 and R1 texts, and the must-not list. No X8 row gives DIFFERS under core-3H, so no city difference is stated. The only 'differs' results are exploratory or sensitivity rows: core-3M H2 and the W2-only H2 row with Hamburg below chance. The core-3M row confirms why gap 5 had to be corrected. The H and N verdicts are framed consistently with the theory once three readings are fixed in the public text. (1) H1/H1a/H1b describe where businesses are, not a gentrification process. (2) Berlin H2 is carried by W2 alone, adds nothing beyond starting status (incremental dAUC -0.040), and vanishes without the transfer indicator. It coincides with the Rechtskreiswechsel and the move of Ukrainian refugees into SGB II, so it is not evidence that the business mix shapes future status. (3) The H3/N nulls are absence of evidence at a coarse grain in shock-dominated windows. Two presentation fixes remain: the bare flip tokens in the side-by-side table, and Amendment 5 missing from the binding-design line.",
  "theory_risks": [
    "Berlin H2 'SUPPORTED' read as 'shops predict which areas decline' (forecast framing, D5a analogue).",
    "H1b read as 'fast food / doener marks poor areas' (stigmatisation, P354 R3).",
    "Berlin H1c read as 'sports facilities indicate deprivation'. The measure is the share of mapped places, which rises where commercial POIs are sparse (outer large estates).",
    "Hamburg change measured here is not Hamburg's official Dynamik (rho 0.52-0.59), and in W2/W3 it carries refugee-accommodation siting (E9)."
  ],
  "required_changes": ["R1 qualifier on flip tokens in the side-by-side table", "R2 Amendment 5 in the binding-design line"],
  "recommendations": ["O1-O3 (§6)"]
}
```

## 1. Binding wording: check by item

| Item | Where in the findings | Status |
|---|---|---|
| **D8/D10 statement rule** (core-3H DIFFERS **and** ≥ 5,000 BH DIFFERS **and** core-2 same sign with unadjusted CI excluding 0 **and** core-3M same sign) | §1, verbatim, including A5.2 | **Met.** No primary X8 row is DIFFERS, so no city difference may be stated, and none is. The exploratory W2-only H2 DIFFERS carries the D6 reading ("differs in transferable discrimination only", `amendment3_below_chance`). |
| **"No difference detected" is never "the same"; MDD rule** | §1; "too imprecise to say the cities agree" on X8 rows with MDD > 0.30 / 0.10 | **Met.** H3c (MDD 0.213) and N3 (0.280) correctly carry no imprecision note. |
| **R7 page wording** | §1, verbatim | **Met.** |
| **R1 scale caveat** | §1 | **Met.** |
| **E8: no level ranking** | §6: levels per city with definitions, "not ranked against each other", divergence from official figures; §7.7 must-not item | **Met.** |
| **E9: accommodation channel** | §1 page wording; §7.1 bullet, verbatim | **Met.** |
| **E3: Gebiete only as "S3 base revised by the publisher"** | §7.5 heading and table; no Gebiet labelled as an accommodation site | **Met.** The §7.4 O3 sentence ("typically through new-build or the opening or closing of accommodation") is generic and does not attribute a cause to any listed ID. That is acceptable. |
| **E5 / A4.1 Berlin population disclosure** | §7.3, verbatim | **Met.** |
| **O3: N1 "could not be tested at this grain"** | §2 table and bullets; N1 city difference = NO DATA | **Met.** |
| **D7: N1 scope wording; D5a/D5b: N2 wording; D4: S1/S7 with K only** | §2 notes, §6 | **Met.** |
| **O1: "sign unstable around zero" is not a substantive flip** | §2 notes: yes. §2 side-by-side cells: bare tokens | **Not met in the headline table (R1).** |

**On O1 / R1.** Because of bare tokens, the side-by-side table shows `small_units_flip` on HH H2, H3a and
H3c and on four X8 rows, where the notes say the change is only a sign change between two
non-significant estimates. A reader of the headline table would take these rows as unstable
findings, and they are not findings at all. The notes are ten lines below, so this does not
mislead the reviewers. But the table is the pre-registered headline (§9.2 item 2) and the template
for the public page. **It must be fixed before any public page is built from it.** Because it is a
generated rendering change with the CSV unchanged, I accept it as a condition of this PASS rather
than a reason for CONCERNS.

**Amendment 5 correction note (4b3551bf): acceptable.** The reading-3 description came from a
B = 29 debug run. In the binding run, A5.1 as written leaves both Berlin H2 flags in place. If
anything, this shows that A5.1 was not tuned to the binding result: it does not remove the flags
it was suspected of removing. The rule is unchanged. The withdrawn sentence was a factual claim
about the outcome, not part of the rule. The findings §7.8 now generates the before → after
disclosure from the two CSVs, which is the safeguard F2 asked for.

**E4 has landed.** The data checks §2, check 6, now reads "This does affect the design" and points
to §3.1. With that, my conditional PASS on Amendment 4 rev. 1 is met.

## 2. Theory fidelity of the readings

**H1, H1a, H1b (both cities SUPPORTED; H1b large).**
- **What they show.** The business mix differs systematically between more and less disadvantaged
  areas: more cafés where disadvantage is lower, more fast food where it is higher. This is the
  well-known status–consumption-infrastructure correlation: local purchasing power, rent levels and
  footfall shape which businesses can operate.
- **What they do not show.** They are cross-sectional, so they describe **where** businesses are,
  not a gentrification *process*. They are consistent with the thesis (H1, H1b hold), and H1a now
  holds at matched grain where the PLR panel missed it. That matches my scale caveat: café
  association is clearer at coarser grain.
- **Fast food.** Any public wording must follow the P354 R3 anti-stigmatisation rule. Fast-food
  density reflects purchasing power, rents and transit footfall, not the residents' worth or the
  "quality" of a neighbourhood.

**H1c, Berlin CONTRADICTED (ρ +0.33); Hamburg not significant.**
- The OA is a location quotient: the **share** of sports and recreation among all mapped places.
- That share rises where commercial POIs are sparse, i.e. in the outer large estates and
  low-density districts, which in Berlin are among the more disadvantaged areas.
- Sports provision there is also largely public (school and district sports grounds), not
  market-led.
- So the reading is "where sports and recreation make up a larger share of mapped places, measured
  disadvantage tends to be higher". It is not a statement about sports provision as such, and it
  is not a mechanism. The thesis premise (sports amenities as an upgrading signal) mixes public
  provision with private fitness. The contradiction is plausibly that compositional effect, and it
  is consistent with the thesis's own planning-area correlations, as the findings note.

**H2, Berlin SUPPORTED (AUC 0.582, "negligible", FDR only).** This needs the most careful framing.
The per-window and secondary rows show:

| Evidence | Value |
|---|---|
| W1 | 0.423 (n.s., below chance) |
| **W2** | **0.743** |
| W3 | 0.536 (n.s.) |
| Under core-2 | 0.504 |
| In the ≥ 5,000 panel | 0.553 (n.s.; only 2 Bezirksregionen dropped) |
| Incremental ΔAUC over K at window start alone | **−0.040** (n.s.) |

So:
1. The signal sits **entirely in W2 (2020→2022)**. That is the window of the Rechtskreiswechsel, in
   which Ukrainian refugees entered SGB II from June 2022. In Berlin they enter T\* (non-unemployed
   SGB II recipients), and their children enter C. They are housed largely along the existing
   low-cost and accommodation geography.
2. It **disappears without the transfer indicator**, i.e. it is carried by the channel that absorbs
   those arrivals.
3. It **adds nothing beyond starting status**. The business mix acts as a proxy for where
   disadvantage already was, not as an independent predictor.

The thesis's H2 claims an *Einfluss* of the business mix on future status. These results do not
support that reading. The P354 "Holds?" label "consistent (still unclear)" is right. Publicly,
Berlin H2 must be presented as weak, confined to 2021–2023 and dependent on the welfare indicator.
It must never be presented as "the business mix predicts change".

**H3a, H3b, H3c, N1, N2, N3 (all not significant; Berlin N1 not testable).** These are absences of
evidence, under four limitations:
- the matched grain is coarse (15–26k residents, R1 scale caveat);
- the windows are dominated by city-wide shocks whose incidence follows the existing low-income
  geography (pandemic in W1, Rechtskreiswechsel and arrivals in W2, Bürgergeld and Wohngeld-Plus
  in W3, §7.1);
- the outcome is *officially measured disadvantage*, which captures displacement-driven upgrading
  only indirectly (P354 §9: improvement ≠ gentrification);
- for Hamburg the change measure correlates only 0.52–0.59 with Hamburg's own Dynamik. That is
  expected, given its narrower indicator set and 2- vs 3-year windows, but it means "Hamburg change"
  here is not Hamburg's official trend.

So "H3b not reproduced" is the correct label. It is not a refutation of the invasion–succession
ordering (Dangschat 1988), which operates at Kiez scale and over longer periods than 2 years.

**X8 (no city difference anywhere).** Correct as framed. The design has power only for large
differences, and most rows are "too imprecise to say the cities agree". Two sensitivity
observations support the design choices:
- **Core-3M** (gap 5 uncorrected) gives an unadjusted H2 difference, and the primary T\* does not.
  That is exactly the artefact D1 and Revision 2 anticipated. The T\* correction did its job.
- **The W2-only exploratory H2 difference** rests on Hamburg being below chance in W2 (D6). Hamburg
  T carries the arrivals from arrival, so it has no W2 Rechtskreiswechsel jump of the kind Berlin
  has. That is the shock asymmetry §4.4 predicted, not a difference in process.

**Reconciliation (§8).** The matched verdicts that differ from P354 are attributed to grain,
construct and window, without implying that the earlier panels were wrong. **Met.**

## 3. Public headline: "Berlin vs Hamburg, like for like"

**Binding headline sentence:**

> "Compared like for like (neighbourhoods of similar size, the same three indicators of poverty and
> unemployment, the same years and the same map data), Berlin and Hamburg show no detectable
> difference in how the local mix of shops and services relates to neighbourhood disadvantage. The
> comparison can only pick up large differences, so this does not mean the two cities are the same."

**Supporting sentences (safe to publish; keep the R7 and E9 page wording on the page as well):**

1. "In each city, areas where cafés make up a larger share of local businesses tend to be less
   disadvantaged, and areas where fast-food outlets do tend to be more disadvantaged. This
   describes where businesses are today. It does not mean that cafés improve an area or that
   fast-food outlets signal a problem: which businesses can survive depends largely on local
   incomes, rents and passing trade."
2. "In neither city did changes in the business mix come before changes in measured disadvantage,
   or follow them, between 2019 and 2025. The areas compared have 15,000–26,000 residents, so
   changes at street or block level may not show up at this scale."
3. "In Berlin, the business mix gave a weak hint of which areas fell behind in 2021–2023 only. It
   disappears without the welfare-receipt indicator and adds nothing to knowing how disadvantaged
   an area already was. That period coincides with refugees from Ukraine entering basic income
   support (Grundsicherung), so we do not read it as an effect of local businesses."
4. "The years covered include the pandemic, the arrival of refugees from Ukraine and the 2023
   benefit reforms. These moved the official indicators in both cities, but not always through the
   same indicator or at the same time."
5. "These results describe patterns in official statistics and open map data. They are not
   forecasts and cannot be used to identify neighbourhoods that will gentrify."

**Must NOT be stated (page, social posts, whitepaper):**

- "Berlin and Hamburg gentrify in the same way" / "the cities are the same" / "both cities show the
  same pattern" as an agreement claim.
- "Berlin and Hamburg differ in …", including any use of the exploratory W2-only H2 row or of
  any sensitivity row (core-3M, W24) that shows a difference.
- Which city is poorer, or has more unemployment, welfare receipt or child poverty (E8). No level
  comparison of OA or K either.
- "Fast food / döner / kiosks are a sign of poverty", or any use of the business mix to locate
  "problem areas" or "up-and-coming areas" for investment.
- "Cafés cause gentrification" or "cafés improve neighbourhoods".
- "Sports facilities are a sign of deprivation" (Berlin H1c), or any reading of H1c about sports
  provision rather than the share of mapped places.
- "The business mix predicts which neighbourhoods will decline or improve" (Berlin H2), or any
  early-warning or forecasting framing.
- "Commercial change does not lead to social change" / "the thesis's ordering hypothesis is
  refuted". Write "not detected at this scale and in these years".
- Berlin N1 "not supported". Write "could not be tested at this grain" (O3).
- "Hamburg's social trend / Dynamik shows …". Our change measure is not Hamburg's official
  Dynamik.
- Naming or mapping individual Hamburg Gebiete as refugee-accommodation sites, or describing
  areas with accommodation as "declining" (E3, E9).
- Hamburg migration background (S1) or school leaving (S7) as an explanation or as a measure of
  disadvantage (D4).
- Anything about displacement, "pressure", or the effect or coverage of protection zones
  (Milieuschutz / soziale Erhaltungsverordnung), including a Berlin–Hamburg comparison of
  protection coverage (#358, §7.4).
- Any count of "significant" exploratory rows (91 of 395) as evidence.

## 4. Data and disclosures

- **Context levels (§6).** They are labelled resident-weighted, not ranked, with definitions and
  the official-figure divergence. Hamburg T 2019 is shown both revised (10.36 %) and as published
  (10.25 %). Fine.
- **§7.5 table.** It gives W1 published vs revised by ID under the revision heading only. 48005
  (W1 −25 pp published, −38 pp revised) and 42004 (+44 pp) illustrate why E9's "tens of
  percentage points" is accurate. They are not named on any page (E3).
- **§3.1 validity.** HH change vs own Dynamik ρ 0.52–0.59, with R19 and R19-pub nearly identical.
  The revision changes W1 little at Gebiet-rank level. That is consistent with my Amendment 4 §6.2
  Stadtteil figures (ρ 0.969).

## 5. Required changes (conditions of this PASS)

- **R1: Flip qualifier in the side-by-side tables (§2 of the findings; DE item already queued).**
  Wherever a flag token in a side-by-side cell was set only by a sign change between two estimates
  that are both non-significant (unadjusted), render it as `<token> (sign unstable around zero)`.
  Example: `small_units_flip (sign unstable around zero)`. Flags set by a difference in unadjusted
  significance stay bare. The CSV `flags` column is unchanged. The page build must use the
  qualified rendering, never the bare token. **Blocking for any public page**; for integration into
  `develop` it is a condition of this PASS.
- **R2: Amendment 5 in the binding-design line (findings header).** In the "Binding design" bullet,
  replace "(Revisions 1–3, Amendment 4 and Amendment 4 revision 1)" with "(Revisions 1–3,
  Amendment 4, Amendment 4 revision 1, and Amendment 5 (post-results-generation, with its
  correction note))".

## 6. Optional

- **O1** Add one generated line after the side-by-side table: "Statement rule (§6.3): no city
  difference is stated; none of the 8 X8 rows gives DIFFERS under core-3H." This makes the outcome
  of the rule explicit rather than inferable.
- **O2** On the page, place the Berlin H2 sentence (§3, bullet 3) wherever the Berlin H2 verdict is
  shown, rather than the bare "SUPPORTED (negligible)".
- **O3** Data checks §2, check 6, writes "because the publisher re-based". For consistency with
  A4 rev. 1, reword it to "because, as inferred from the annex, the publisher re-based …".

Verdict: PASS
