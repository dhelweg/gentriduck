# #354 domain methodology sign-off — Berlin thesis hypothesis suite (phases A + B)

- **Reviewer:** gentrification-domain-expert (R-C1 domain half, ADR-0011)
- **Date:** 2026-11-01
- **Branch:** `feat/354-berlin-modern-era`. Reviewed at `run_sha` 3661079aa212, with the findings regenerated at b791dc9b.
- **Inputs:** `docs/epic-e/E1b-berlin-hypothesis-suite-findings.md`, `thesis-hypothesis-suite-results.csv`,
  `thesis-hypothesis-suite-metadata.json`, the pre-registration (rev. 2 + Amendment 1 + Amendment 2),
  my review `docs/methodology/354-355-preregistration-domain-review.md` (D1–D8, N1–N8),
  `docs/epic-e/354-geo-signoff.md`, and `web/pages/thesis-recheck.md`.
- **Data access:** read-only. The warehouse file was held by another process, so the two checks below
  read the raw MSS parquet files (`data/raw/berlin/mss/mss_{E}.parquet`, `mss_{E}_indicators.parquet`)
  into an in-memory DuckDB. Nothing was written.

Verdict: CONCERNS

The concerns are four small, text-level changes to the generated findings and the CSV (§6). None
of them needs a re-analysis, and none moves a verdict. The design, the verdict mapping and the §9
guards are sound. Once the regenerated findings carry C1–C4, I re-check those items only and record
PASS. **Amendment 2 is ratified now, whatever the overall verdict (§2).** That meets condition (a)
of the geo-DS PASS.

```json
{
  "verdict": "concerns",
  "domain_rationale": "All 16 headline cells map to the thesis verdicts exactly as §5.6 (D5) prescribes, under N3 and Amendment 2. The H1c text is verbatim §1.3. The §9 must-not-claim list is reproduced in full, and the findings contain no pressure, displacement or causal wording. N5 coverage lines are present for H1a-c in both panels. The modern shock disclosure is verbatim D7. Item 14 / Amendment 2 is the correct theory reading of the thesis's 'Scheinkorrelation' and is ratified. Four gaps remain. (1) The findings say 'No window is shock-free' but list only the modern windows, so the thesis-era column reads as shock-free. (2) The D-validity disclosure says D 'diverges from the official classification'. In fact the 0.80 threshold is mathematically out of reach against a three-class variable with 76-82% ties (ceiling 0.67-0.75), and D reaches 95-100% of that ceiling. (3) The CSV publishes point estimates and effect labels for NO DATA rows, including a 'large' rho of -0.72 for the Powell-type sport construct on 17 clusters. (4) Item 14 still reads 'pending', and the base and full AUCs behind 'explained by status level' are not printed.",
  "theory_risks": [
    "H1b rests on fast-food SHARE of the gastronomy mix. Fast-food density per resident is n.s. in both panels (0.08, 0.09), so the live page's 'fast-food density' wording is now wrong.",
    "The anti-stigmatisation check (R3) could not run, and in Berlin fast food is largely the doener economy, so H1b text must stay area-level and deprivation-framed.",
    "The H1 discriminating features include provision placed because of need (Public Service|Social, public phones). H1 is an association, not a market 'signal'.",
    "H1c in OSM measures public playgrounds and table-tennis tables (node-only, #337), not Powell et al.'s physical-activity facilities. The Powell-closer row is NO DATA.",
    "The thesis-era 2015-2018 refugee arrivals entering SGB II after recognition sit inside D_2017/D_2019 at small-area level, next to large accommodation sites.",
    "Differences between the two suite columns (e.g. H1 AUC 0.68 -> 0.74) are era plus method, not change in Berlin (findings §9)."
  ],
  "recommendations": ["C1-C4 required (§6)", "R1-R6 non-blocking (§7)", "Public wording per §5, superseding the geo-DS §4 text where marked"]
}
```

## 1. Theory fidelity of the findings text

| Check | Result |
|---|---|
| **Verdict to thesis mapping (§5.6, D5)** | **Correct in all 16 cells.** H1: SUPPORTED, poor or acceptable, so it **holds** (N3, AUC ≥ 0.60). H1a: NOT SIGNIFICANT, so **consistent (still unclear)**. H1b: SUPPORTED, moderate, so **holds**. H1c: CONTRADICTED, so **opposite direction (thesis: undecided)**, with the Tabelle 6-14 clause (D5a). H2: see §2. H3a: NOT SIGNIFICANT, so **consistent (rejected)**. Unadjusted p is 0.49 and 0.96, so the N4 "nominally significant" note correctly does not apply. H3b: NOT SIGNIFICANT, unadjusted p 0.13 and 0.50, so **not reproduced**, not "…at the corrected threshold". H3c: **consistent (still unclear)**. No primary is BH-significant but Holm-non-significant. |
| **§9 must-not-claim** | Reproduced verbatim (findings §10). A scan of the findings for pressure, displacement, cause or drive wording finds only `displacement_subindex`, which is named to say it is *excluded* (#362), and the D7 phrase "rather than through upgrading", which is my own binding text. No "pressure" wording for Dynamik (#358). The outcome is named as change in measured disadvantage. |
| **H1c wording (§1.3)** | Verbatim, including mixed signs, the polarity slip, "verdict unaffected" and the composition sentence. The composition count (1,984 table-tennis tables, 868 playgrounds vs 375 fitness centres) is framed as "plausible, not tested". Correct. |
| **Shock disclosure (D7)** | The modern windows W1–W3 and the H1 2025 level are verbatim §3.4. Every pooled row that contains W1 names the mechanism in `notes`. **Gap: no thesis-era counterpart** (C3). |
| **N5 coverage** | Present for H1a, H1b and H1c in both panels: n retained / n total, retained vs dropped status distribution, and the "describes these areas" sentence. Two cosmetic issues (R1). |
| **N6–N8** | N6 unbased fidelity rows: present. H1b's +0.263 vs +0.27 is the anchor of the revival. H1a (−0.104 vs −0.02) and H1c (+0.175 vs +0.10) show the same sign and are labelled as pipeline divergence. N7: counted once. N8: deviation 1. |
| **H1 "businesses" rule (§9)** | The commercial-only row holds in both panels (0.689 modern, 0.624 thesis era), so "businesses" is permitted for H1, **and for H1 only** (see §5, H2). |

## 2. §12 item 14 / Amendment 2: ratified

**Ruling: I ratify Amendment 2 as written** ("ΔAUC CI excludes 0" means ci_low > 0; a CI that
includes 0 or lies wholly below 0 maps to "consistent (still unclear): explained by current status
level"). I also ratify the thesis-era H2 label.

The theory side, from thesis §6.3.2.1. The thesis did not dismiss its only H2 association as
noise. It called it a *Scheinkorrelation*: today's offering structure and the coming status
change are both functions of the current status level. The only evidence that can defeat that
objection is an increment, meaning OA discriminates future Dynamik *beyond* the level. The
thesis-era numbers show the opposite. Status level alone gives an out-of-fold AUC of 0.767.
Status level plus 29 OA features gives 0.749. OA alone gives 0.617, so the level alone already
outperforms the mix. This is the strongest support for the thesis's own objection that the suite
could have produced. Labelling it "stronger than thesis" would invert the meaning of the
hypothesis test.

On procedure: my D5(e) wording ("exclude 0") was the ambiguous source, and I own that. The
post-results reading moves to the *more conservative* label. It does not inflate any claim, and
the modern panel (ΔAUC −0.004 [−0.015, 0.007]) reaches the same label under the literal rule. A
post-results clarification that can only make a claim weaker is acceptable when it is disclosed,
which it is (Amendment 2, deviation 14). I agree with the geo-DS that it binds #355 unchanged and
is not re-opened after the Hamburg results.

Public consequence: the incremental row's raw verdict "CONTRADICTED" must never appear on the page.
It reads as "OA predicts the opposite", and that is false. It means *no increment*.

## 3. The D composite and the 0.80 threshold

**Domain finding: the threshold could not be met by any measure, and D tracks the official ordering
about as closely as three classes allow.** The published Dynamik class has three levels with heavy
ties. The highest Spearman any continuous variable can reach against it, when it orders every PLR
consistently with the classes, is
ρ_max = √(12 · Σ p_k (m_k − ½)²), where p_k is the class share and m_k the class midrank fraction:

| Edition | class shares positiv / stabil / negativ | ρ_max | observed ρ(D, class) | observed / max |
|---|---|---|---|---|
| 2015 | 0.110 / 0.805 / 0.085 | 0.691 | 0.668 | 0.97 |
| 2017 | 0.112 / 0.778 / 0.110 | 0.726 | 0.691 | 0.95 |
| 2019 | 0.106 / 0.819 / 0.076 | 0.670 | 0.670 | 1.00 |
| 2021 | 0.090 / 0.813 / 0.097 | 0.678 | 0.678 | 1.00 |
| 2023 | 0.136 / 0.767 / 0.097 | 0.739 | 0.708 | 0.96 |
| 2025 | 0.123 / 0.757 / 0.120 | 0.750 | 0.710 | 0.95 |

In 2019 and 2021 the official Dynamik index uses exactly D1/D3/D4, and D reaches the ceiling.
That means no PLR is ordered inconsistently with its class. The small shortfall in 2015/2017 and
2023/2025 is the S2/D2 indicator that the official index adds in those editions. The 0.80
threshold was my D1(d) requirement. I set it without allowing for this tie ceiling, and that
mistake is mine. The pre-registered rule has been applied as written, and I do not re-pass it
after the fact. But the substantive sentence "D diverges from the official classification" is
**not true as a statement about the construct**, and it must not reach the public page in that
form (C2).

What the class rows then mean. The H2 class row is a *different contrast*, not a different measure
of change: "negativ" (about 1 PLR in 10) vs the rest. The composite primary splits D at 0 (about
half the PLRs), and that split is the thesis's own binary target (`dynamik_klasse_prj_bi`). So
"modern H2 class row n.s." means the mix does not pick out the tail of strongest worsening. It
does not mean H2 depends on whose measure of change is used.

**Public wording for H2/H3 given the validity result:** do not say our change measure "diverges"
or is "not the official one". Say "our change measure follows the official Dynamik ordering as
closely as its three classes allow". For H2, name the narrower class contrast (§5). For H3 the
class rows agree with the null primaries. The one exception, the thesis-era H3b class row
(ρ 0.096 [0.023, 0.171], negligible, uncorrected, 1 of about 90 exploratory rows with about 4.5
expected by chance), is listed in the full table and not interpreted. Its sign is the opposite of
the thesis's (✓). So there is no sign that the thesis's H3b result was hidden by the composite.

## 4. H3b: public framing of the reversal

The site says H3b is supported on MSS 2021–2025. The suite says it is not reproduced in either
panel. Framing:

1. **This is a method correction, not a change in Berlin.** The thesis-era re-analysis does not
   reproduce H3b either, so nothing here says "the process faded after 2018". The earlier modern
   result came from one 2023 pivot, no level control, total-POI change, and iid p-values over
   repeated PLRs (geo-DS §5 lists them). Under the pre-registered design (two pivots, control for
   starting level, commercial businesses only, cluster bootstrap, BH) it is not reproduced.
2. **Do not say "the thesis was wrong".** The thesis rated H3b only "eher bestätigt", from one
   BZR classifier with random CV and a best-of-about-19 search. The correct phrase is "not
   reproduced with current methods, in either era".
3. **Name the theory consequence plainly.** The "status first, commerce second" reading that the
   page draws from Dangschat's invasion–succession sequence is no longer supported by any Berlin
   panel. The page must drop every "status first" sentence (the Alert, "Read the columns
   together", "What still matters"). No other page repeats it (grep of `web/pages`, `docs/epic-g`).
4. **One consolidated, dated corrections block.** This is the second correction of this row (the
   October 2026 correction already fixed the identical-correlation test). Readers should see one
   history, not two notes that contradict each other. Text:
   > **Correction (November 2026, #354).** Earlier versions of this page reported that, on
   > Berlin's social monitor for 2021–2025, a fall in officially measured disadvantage came before
   > commercial change (H3b). That came from a simpler test: one time window, no allowance for an
   > area's starting level, and all mapped objects rather than businesses. A re-test whose design
   > was fixed in advance does not reproduce it, for 2021–2025 or for the thesis era. We now report
   > H3b as "not reproduced".
5. **Symmetry.** The same block records the two reversals in the other direction. **H1 now
   holds**: it was "not reproduced by a single-number proxy", because the thesis's multi-feature
   test had not been re-run. **H2 2021–2025** moves from "supported" to "explained by current
   status level". A corrections block that lists only the unfavourable reversal would itself be
   selective.

## 5. Public wording guidance for `/thesis-recheck` (phase C)

**Columns:** *Hypothesis* · *2018 thesis (its own verdict, Tabelle 6-16)* · *Thesis era 2013–2019,
re-analysed with current methods* · *2019–2025*. The thesis column shows **words only, no AUC**
(§1.2). Each suite column leads with the "Holds?" label in plain words. One compact estimate may
follow. Never lead with the raw SUPPORTED/CONTRADICTED verdict, because for H2 that would mislead.
A table footnote is required: "The thesis-era column re-uses the thesis's own data, so it is not an
independent replication. A difference between the two right-hand columns reflects era *and* method
(boundaries, status measure, map completeness), not a measured change in Berlin."

| # | Hypothesis (plain) | 2018 thesis | Thesis era 2013–2019 | 2019–2025 |
|---|---|---|---|---|
| H1 | An area's social status is linked to its local business mix | Supported | **Holds** (AUC 0.68) | **Holds** (AUC 0.74) |
| H1a | Areas with many cafés have higher status | Undecided | **Still unclear** | **Still unclear** |
| H1b | Areas where fast food makes up more of the gastronomy mix have lower status | Supported | **Holds** (ρ 0.47) | **Holds** (ρ 0.44) |
| H1c | Areas with many sport and leisure facilities have higher status | Undecided | **Opposite direction** (thesis: undecided) | **Opposite direction** (thesis: undecided) |
| H2 | Today's mix of shops, services and public facilities is linked to the next change in officially measured disadvantage | Unclear | **Still unclear: explained by the current status level** | **Still unclear: explained by the current status level** |
| H3a | Commercial change comes first; change in measured disadvantage follows | Rejected | **Rejected, as in 2018** | **Rejected, as in 2018** |
| H3b | Change in measured disadvantage comes first; commercial change follows | Tentatively supported | **Not reproduced** | **Not reproduced** |
| H3c | Both change in the same period | Undecided | **Still unclear** | **Still unclear** |

**Defining "status" once, above the table:** "social status as measured by Berlin's Monitoring
Soziale Stadtentwicklung: unemployment, welfare receipt and child poverty. For *change* we say
'change in officially measured disadvantage'. It can fall for many reasons besides gentrification:
jobs, children growing older, new-build residents, refugee accommodation closing, or benefit rule
changes."

**Per-row sentences** (expandable detail):

- **H1:** "The local business mix tells better-off and worse-off planning areas apart better than
  chance, modestly. The full model also includes public facilities, some of which are placed
  *because* of need (social services, for example), so this is an association, not a signal of
  where an area is heading." Do not put the 0.87 thesis AUC next to these numbers.
- **H1a:** "Café share of the gastronomy mix shows no link. As in the thesis, cafés per resident go
  slightly with lower disadvantage (an exploratory check)."
- **H1b:** "Among neighbourhoods with at least ten gastronomy outlets (about half of all planning
  areas), fast food makes up a larger **share** of the gastronomy mix where officially measured
  disadvantage is higher. The number of fast-food outlets per resident shows no clear link." Never
  "fast-food density", never "durable down-signal". It is phrased at area level, as a
  deprivation hypothesis (Pearce et al. 2007, New Zealand). Add: "We could not test whether this
  depends on one type of outlet, because the map data does not tell them apart." No ethnic or
  migrant-economy wording (agrees with geo-DS item 13).
- **H1c:** the binding §1.3 text, then: "In OpenStreetMap this category is mostly public
  playgrounds and table-tennis tables, which are provided where many families live, including large
  estates. Our check on organised sport facilities alone had too little data to report."
- **H2** (**replaces the geo-DS §4 H2 text**; differences explained below): "Today's mix of shops,
  services and public facilities is only weakly linked to how officially measured disadvantage
  changes over the next two years (AUC about 0.61, 'poor'). An area's current level predicts that
  change better on its own, and adding the mix adds nothing. The link is negligible or absent when
  the question is narrowed to the roughly one area in ten that the official monitor classes as
  worsening. This matches the 2018 thesis, which read its own H2 association as a spurious
  correlation running through the current status level."
- **H3** (**adopts the geo-DS §4 H3 text with three edits**): "We find no detectable ordering in
  either direction. Business change did not measurably come before change in officially measured
  disadvantage, nor the other way round, and they did not measurably move together within the same
  period (all effects negligible, |ρ| ≤ 0.06). This holds for both eras, for each window
  separately, and on the official classes. It rules out a strong ordering, not a small one. Every
  window contains shocks and rule changes (pandemic, refugee arrivals entering the benefit
  statistics in 2016–18 and 2022, the 2023 Bürgergeld reform)."

**Where I differ from the geo-DS §4 text (the page follows this sign-off on these points):**

1. *"Neighbourhoods' business mix"* in H2 becomes **"mix of shops, services and public
   facilities"**. The §9 "businesses" licence comes from the H1 commercial-only row. H2 has no
   commercial-only row, and its five largest coefficients include public transport, benches,
   phones and recycling.
2. *"how their social situation changed"* becomes **"change in officially measured disadvantage"**
   (§9, D8a). Likewise, "social change" in the H3 text becomes "change in officially measured
   disadvantage".
3. *"the link nearly disappears when the official Dynamik classes are used instead of our
   continuous change score"* becomes **"narrowed to the roughly one area in ten classed as
   worsening"**. The class row is a different contrast, and the composite matches the official
   ordering up to the tie ceiling (§3).
4. *"most likely a spurious correlation"* becomes **"which the thesis read as a spurious
   correlation…"**. The suite shows no increment beyond level. Calling it spurious is the
   thesis's own interpretation, and the page should attribute it rather than adopt it as a
   finding.
5. H3: add the thesis-era refugee line to the shock sentence (C3).

**Other page items that the suite makes stale:** the "No multiple-comparison correction was
applied" caveat (BH now applies to every headline row, so replace it with the §5.5 FDR sentence).
"The six hypotheses" becomes eight. The H3c "opposite direction on OA" claim goes (now not
significant). The Hamburg sentence comes from E5, which the suite supersedes; leave it until #355
signs off, then replace it. The Alert's "Earlier editions called it a clean replication" goes into
the consolidated corrections block.

## 6. Required changes (C1–C4) for PASS

Each one is a script template or CSV-writer change plus a regeneration. No statistic changes.

- **C1 — Item 14 status.** Findings §12 item 14: replace "pending explicit ratification" with
  "ratified by geo-DS and domain, 2026-11-01 (Amendment 2)". Print the base and full AUCs in the
  H2 incremental row notes and in item 14: thesis era 0.767 → 0.749; modern 0.694 → 0.691. The
  label "explained by current status level" cannot be read without them.
- **C2 — Validity disclosure (findings §4).** Keep the pre-registered statement that D is below
  0.80, but add the per-edition tie ceiling and the observed/ceiling ratio (table in §3, computed
  from the published class shares). Replace "diverges from the official classification" with: "is
  below the pre-registered 0.80 threshold. Against a three-class variable with these shares the
  highest attainable Spearman is 0.67–0.75. D reaches 95–100% of it, and exactly 100% in
  2019/2021, where the official Dynamik index uses the same three indicators." Keep the instruction
  to read the class rows beside the primaries.
- **C3 — Thesis-era shock line (findings §5, D7 parity).** The section opens with "No window is
  shock-free" and then lists only modern windows. Add: "**Thesis era (D_2015, D_2017, D_2019).**
  People who arrived as refugees in 2015–16 moved into SGB II after recognition, mainly 2016–2018.
  That falls inside the D_2017 and D_2019 windows and affects Transferbezug and Kinderarmut at
  small-area level near large accommodation sites. Berlin means show no bump, because labour-market
  recovery dominated (mean Arbeitslosigkeit-Dynamik −0.68, −0.90, −0.97 pp), so the effect is
  local, not city-wide. The thesis-era H1 level (MSS Dec 2016) contains part of it."
- **C4 — NO DATA rows in the CSV.** Rows with `verdict = NO DATA` currently publish `estimate`
  and `effect_label`. Modern H1c without table tennis: −0.716 "large", n = 21, 17 clusters. Thesis
  era: −0.421 "moderate". That is a ready-made misquote ("real sport facilities strongly linked to
  high status") on the Powell-type construct, below the §5.3 cluster floor. Blank `estimate` and
  `effect_label` for NO DATA rows, and put "not reported: < 20 clusters" in `notes`, matching the
  findings table.

## 7. Recommendations (non-blocking)

- **R1** N5 lines: add "(status > 0 = more disadvantaged than the city average)" after the first
  status figure. When at most 1% of areas are dropped (thesis-era H1c, 4 of 436), say
  "essentially the full frame" instead of giving a median for 4 areas.
- **R2** The H1c note in the findings should add that the node-only limitation (#337) probably hits
  this category hardest, because pitches and sports centres are mostly mapped as areas.
- **R3** Public shock text: "rather than through upgrading" becomes "rather than through a change
  in who lives there".
- **R4** Follow-up issue: carry the OSM `cuisine` tag (for example `kebab`) into the taxonomy so
  that the R3 anti-stigmatisation check can run in a later suite run. This uses existing open data
  and adds no source.
- **R5** Hamburg (#355): apply Amendment 2 and the §3 tie-ceiling context to Sozialmonitoring
  classes as well, before results are seen.
- **R6** Pre-registration hygiene (geo-DS, optional): add one sentence to Amendment 2 or a short
  Amendment 3 recording that the 0.80 D-threshold did not account for the tie ceiling, which was
  computed post-results and changes no verdict.

## Sources

Helweg (2018) §4.5, §6.2.3, §6.3.1.1, §6.3.2.1–6.3.2.2, Tabellen 6-12–6-16;
`reference/system/80_result_full_plr.sql` (`dynamik_klasse_prj_bi`). Dangschat (1988); Smith (1979);
Döring & Ulbricht (2016); Pearce et al. (2007); Powell et al. (2006); Papachristos et al. (2011).
SenSBW *Monitoring Soziale Stadtentwicklung* 2015–2025 (published classes; S2/D2 in 2015/2017 and
2023/2025). BA-Statistik on refugee entry into SGB II (2016–2018; Rechtskreiswechsel 2022).
Project: pre-registration §1.2–1.3, §3.2, §3.4, §5.2, §5.5–5.6, §9, Amendments 1–2;
`docs/epic-e/354-geo-signoff.md`.
