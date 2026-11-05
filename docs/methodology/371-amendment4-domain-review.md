# Pre-registration #371, Amendment 4: Domain Review (R-C1, domain half)

- **Reviewer:** gentrification-domain-expert
- **Date:** 2026-11-05
- **Reviewed:** `docs/methodology/371-matched-comparison-preregistration.md`, Amendment 4 (A4.1–A4.4,
  revision log), working tree of branch `feat/371-matched-comparison`. Evidence:
  `docs/epic-e/371-data-checks.md` (§3, §4.3–4.4, §5, §6).
- **Prior state:** my review `371-preregistration-domain-review.md` was PASS after D10. This review
  covers Amendment 4 only. Everything Amendment 4 does not touch stays ratified.
- **Data access (pre-results).** `data/gentriduck.duckdb` was opened read-only once (Hamburg S3/D3
  levels and populations). After that another process held the lock, so the Stadtteil-grain figures
  in §6.2 come from the raw annex parquet
  (`data/raw/hamburg/sozialmonitoring_annex/annex_indicators.parquet`) in an in-memory DuckDB,
  using share = 100·(mean + z·SD). I used **outcome components and populations only**. No predictor
  was loaded and no outcome was joined to a predictor.
- **Sources fetched (SEC-3, data only).** Sozialmonitoring Berichte 2019–2023 from
  `daten.transparenz.hamburg.de` (allow-listed under the ADR-0014 amendment), located through the
  CKAN API on `suche.transparenz.hamburg.de`. I saved them to the session scratchpad and read them
  as text only. Nothing in them was treated as an instruction.

Verdict: CONCERNS

Most of Amendment 4 is right, and my answers to questions 2, 4 and 5 are "yes", each with at most a
wording condition. Two findings change the design.

1. **A4.4.** The publisher documents the S3 back-revision as a definition change. Bericht 2021 says
   that from that report onwards the AsylbLG part of S3 counts recipients of "Regelleistungen und
   ausschließlich besonderen Leistungen", which widens the group counted. So W1 straddles a
   definition seam. Under the pre-registration's own §4.3, the published 2019 level cannot remain
   the primary. **R19 has to become the primary**, and the as-published level becomes the
   sensitivity.
2. **A4.1 and R5.** The W24 flag label and the R5 new-build diagnostic both assign a cause that the
   data cannot support. W24 says "crosswalk" where new-build or refugee arrivals could be the cause.
   R5 says "new-build" where the cause may be the crosswalk (Berlin) or refugee accommodation
   (Hamburg).

There are nine required changes, all text-level (§8). None needs a result.

```json
{
  "verdict": "concerns",
  "domain_rationale": "Amendment 4 handles the Berlin areal-crosswalk artefact proportionately. BZR totals are right, the phantom PLRs are not balanced children, and the PLR-grain outcomes are native MSS lor_2021 values, so no dasymetric model is needed for #371. The single-P choice is consistent with the ratified T* (same EWR source as the MSS denominators; P^(U) <= P by construction). Keeping 39005/67012 is right. Resident-weighted city levels are the right public default, if they are not presented as comparable rates. Two things change the design. (1) The Hamburg S3 2019/2020 revision is a documented definition change: Bericht 2021 (PDF p. 8) widened the AsylbLG count to recipients of exclusively special benefits. The revisions are one-signed (51 of 52 and 44 of 44 upward) and concentrated where AsylbLG recipients make up most residents. The published 2019 level therefore puts W1 across a seam, which §4.3 forbids, and the publisher's own later base (s2022 - D3_2022) is the same-definition fix, parallel to the Berlin backcast (§4.2). R19 must be the primary. (2) Two flags name a cause the data cannot isolate. 'weight-sensitive (LOR crosswalk)' would label new-build or refugee-arrival population change as an artefact. 'possibly new-build-driven' (R5) would label the Berlin crosswalk deficit (BZR 034008, about +26% spurious growth) and Hamburg accommodation openings as new-build.",
  "theory_risks": [
    "Hamburg T change in W2/W3 is substantially an accommodation-siting signal. Bericht 2023: 30 of 37 Gebiete with negative Dynamik contain refugee accommodation, and 170 of 856 Gebiete had a site on 31.12.2022. This reflects where the city placed accommodation, not neighbourhood change.",
    "The accommodation channel has opposite signs in the two cities' core-3H outcome. In Hamburg, AsylbLG is in T, so an opening raises K. In Berlin, AsylbLG is in no indicator, so registered residents only dilute the denominators and K falls. Core-2 is symmetric (denominator dilution in both cities), which is why the D8 T-free condition matters.",
    "W24 changes the estimand to fixed-composition change. Compositional change from new-build is a recognised form of gentrification (Davidson & Lees 2005), so a W24 deviation can be real signal, not artefact.",
    "Labelling individual small Gebiete as refugee-accommodation sites in public outputs could expose residents of identifiable sites to harm."
  ],
  "recommendations": ["E1-E9 required (§8)", "O1-O4 optional (§9)"]
}
```

---

## 1. Q1: The disclosure sentence and W24

**At the two phantom PLRs, the artefact attribution is sound, and new-build cannot explain it.**
To my knowledge, 03400831 Pankower Tor is the former Pankow freight and marshalling yard, and
06200418 Landweg is the former US training ground in Lichterfelde Süd. Both are large brownfield
development sites with no housing stock at either date: 0 residents in 2024 and 2025, and no
residential completions in the windows. 06200419 Thermometersiedlung is an established post-war
large estate. Its 1,081 → 4,539 jump is not new-build growth. The areal crosswalk spread the
residents of old PLR 06020407 over the empty Landweg area. The proof is that residents were
assigned to land without dwellings, so "artefact" is the right word **for these PLRs**.

**W24 does not isolate that artefact, so it must not be read as evidence of it.** W24 replaces each
edition's weights (and P^(U)/P) with the 31.12.2024 ones for every BZR. The difference from the
primary therefore also includes:

- **New-build quarters completed in 2019–2024.** The data checks could not resolve 053008
  Siemensstadt (0.605) or 122004 Tegel-Süd/Flughafensee (0.78).
- **Registered refugee arrivals 2022–2024 and accommodation openings.** These include modular
  accommodation sites, and arrivals around the Tegel arrival centre if they are registered. Much of
  Berlin's +3.4 % growth from 2020 to 2024 is international and refugee in-migration.
- **Ageing.** Cohorts move across the 65 and Regelaltersgrenze bounds, which changes P^(U)/P.
- **The estimand itself.** With fixed 2024 weights, dK becomes a *fixed-composition* change. It
  drops the compositional shift between PLRs inside a BZR. In a BZR where a new-build PLR grows,
  that shift is part of the process of interest (new-build gentrification; Davidson & Lees 2005). A
  W24 deviation can therefore be real signal.

A4.1 already says "a flag is not attributed to the artefact alone". But the flag label it defines,
"weight-sensitive (LOR 2019→2021 crosswalk)", does attribute the deviation to the crosswalk, and the
binding public sentence does not carry the caveat at all. **E5** fixes both. It also corrects
"Bezirksregion totals are unaffected". That is literally true only if the totals include the
uninhabited PLRs. The analysis sums **balanced children**, and on that basis BZR 034008 is about
6,300 residents (18 %) short in 2018 and 2020.

**W24 and the Regelaltersgrenze (E6).** "W24 replaces P^(U)/P with the 2024 ratio." If that ratio is
taken with f = 0.500 (the bound at 31.12.2024) for the 2019 and 2021 editions, the U denominator no
longer matches the edition's legal definition (65 y 7 m and 65 y 9 m). That is the inconsistency D9
removed. W24 should take the 2024 *band populations* and keep each edition's f.

**The same artefact reaches the R5 new-build diagnostic (E7).** A4.1 says that at matched grain
population enters "only" through weights, P^(U)/P and thresholds. It also enters R5 (§5), which I
asked for in the earlier review: "population growth per matched unit over each window", where a top
decile of growth gets the flag "possibly new-build-driven".

- **Berlin.** BZR 034008's balanced-child total grows by about 26 % from 2020 to 2024 by artefact
  alone (ratio 0.793), so it would probably enter the top decile and be labelled new-build. At PLR
  grain, 102 of 540 PLRs are more than 25 % off.
- **Hamburg.** The top decile of population growth contains accommodation openings, not new-build.
  For example, 42004 Eidelstedt grows 623 → 2,172 while S3 goes 4 % → 57 %. Bericht 2023 reports
  +19.9 % population in the 30 accommodation Gebiete with negative Dynamik.

## 2. Q2: 39005 Lokstedt and 67012 Poppenbüttel

**Keeping them in the primary is right.** Both are small Gebiete in affluent Stadtteile. Their series
(S4 0 → 2.3 → 2.6 → 2.8 → 0 %; S5 6.4 → 0.1 → 8.3 %) look like small-number effects (suppression or
rounding by the publisher) at the low end of the distribution. They do not look like a definition
problem. At Stadtteil grain they carry a population weight of a few hundred residents out of tens of
thousands. At Gebiet grain they are 2 of 849 units in rank statistics. Excluding them would be a
data-driven exclusion with no gain in validity. No sensitivity is needed.

One wording point (O1): the methods note should describe their values as "consistent with
small-number effects in the published data", not as "errors" or "noise in the data".

## 3. Q3: City levels population-weighted

**Population (resident) weighting is the right public default.** A reader takes a city figure to mean
"the share of residents". Berlin's own headline figures are resident-based. Hamburg's report
publishes the unweighted Gebiet mean under the label "Hamburg", and that mean over-weights small
Gebiete (S5 2019: 17.5 % unweighted vs 18.55 % weighted). Next to a resident-based Berlin figure, the
unweighted mean would be a hidden method difference.

Two corrections to the A4.3 text (**E8**):

- **"so the two are comparable" overstates it.** Weighting makes the *aggregation* the same. It does
  not make the *indicators* the same. Berlin T\* includes SGB XII, and Hamburg T includes AsylbLG
  (R7). The U bases differ (15 to the Regelaltersgrenze vs 15–65). Both cities weight by total
  residents rather than by each indicator's base, so the figures are resident-weighted means of
  rates, not city rates. §10 already bans cross-city K comparisons. The same has to hold for
  U/T/C levels: they are shown side by side, with their definitions, but no "which city is more
  disadvantaged" statement is made.
- **Readers will check the figures against the official ones.** Both of our figures differ from the
  official headline numbers. Hamburg's official figure is the unweighted mean. Berlin's PLR-aggregated
  S3 is about 0.5 pp below the published Berlin S3 (data checks §4.5). The difference has to be
  stated where the numbers appear.

## 4. Q4: PLR-grain MAUP rows without a dasymetric model

**Acceptable for #371.** The decisive fact is one A4.1 states only indirectly: at PLR grain the
**outcome values themselves are native**. MSS 2021/2023/2025 are published on `lor_2021`, and the
2019 level is backcast from MSS 2021 on `lor_2021` (§4.2). Only P^(U)/P is crosswalked, and as a
ratio it is an area-weighted mix of age structures, not a count. A dasymetric crosswalk (Eicher &
Brewer 2001; Mennis 2003) would correct counts that the PLR rows do not use. It is not proportionate
for a sensitivity that cannot change a verdict.

Conditions for the public framing:

1. **No crosswalked 2018/2020/2022 Berlin population *count or growth* is used at PLR grain.** That
   includes the R5 diagnostic (E7).
2. **The MAUP rows carry the A4.1 disclosure.**

Outside #371 (O2): `mart_area_demographics` re-pivots `int_berlin_ewr_plr2021`. If its pre-2021 years
are on `lor_2021`, the public site may already show, for example, about 6,300 residents on Pankower
Tor in 2020. The PM should open a follow-up issue to check this. It does not block #371.

## 5. Q5: Single P and the ratified T\*

**Consistent, and it strengthens T\*.** The T\* I ratified in Revisions 2–3 is

T\*_u = 100 · Σ_i (S1_i/100 · P^(U)_i + S3_i/100 · P_i) / Σ_i P_i,

with P = all residents and P^(U) = P(15–<65) + f · P(65–<67).

- **Same source as the MSS.** `int_berlin_ewr_age_bands_plr2021.residents_total` is Σ bands = EWR
  E_E, the registered main-residence population from the Amt für Statistik. That is the same source
  the MSS uses for the S1/S3 denominators (Indikatorenblätter, data checks §4.1). So N_T = S3 · P
  reconstructs the MSS numerator on the publisher's own population concept.
- **P^(U) ≤ P by construction.** Taking P and P^(U) from one model guarantees it. That is the DE
  check 5 condition (0 violations in 2,143 PLR-editions).
- **Renormalisation is harmless for meaning.** It moves no PLR by more than 0.07 % and keeps every
  band's city total. This is the volume-preserving property of areal interpolation (Tobler 1979).
- **Hamburg is unaffected.** Its population comes from the same Sozialmonitoring edition.

The only open point is the f used inside W24 (E6, §1).

## 6. Q6: A4.4, the Hamburg S3 2019 back-revision

### 6.1 Is AsylbLG counting at accommodation sites a plausible reading? Yes. The counting change is documented; its local concentration is inferred.

**Publisher's own note, Bericht 2021** (data as of 31.12.2020; PDF p. 8):

> "Für den Indikator SGB-II-Empfänger/innen und AsylbLG-Empfänger/innen ergibt sich im aktuellen
> Berichtsjahr eine geringfügig veränderte Datenbasis. Hintergrund ist die bundesgesetzlich
> umgestellte Erfassung von Leistungen nach AsylbLG. Ab diesem Berichtsjahr werden Empfänger/innen
> von Regelleistungen und ausschließlich besonderen Leistungen gemeinsam erfasst. Hiermit erweitert
> sich der betrachtete Personenkreis, da bis zum vergangenen Berichtsjahr nur Empfänger/innen von
> Regelleistungen erfasst wurden […]. Aufgrund der geringen Fallzahl hinzukommender Personen bleibt
> die Vergleichbarkeit zu den früheren Berichtsjahren gegeben."

(The data checks §3 quote a fragment of this passage but not its consequence for the windows.)

Together with the annex pattern, this makes the reading very likely:

- **The new basis starts with edition 2021.** s2021 and s2022 check clean against D2024 and D2025,
  so edition 2021 is already on the new basis. D3_2022 (base 2019) and D3_2023 (base 2020) fail, so
  the publisher computed those Dynamik values on bases re-estimated under the new counting.
- **The revisions all go one way.** 51 of the 52 Gebiete with |Δ| > 0.5 pp in 2022 are revised
  **upward**, and all 44 in 2023 are. A wider group counted can only raise the count, which is what
  this shows. Random correction or geocoding noise would go both ways.
- **The revisions sit where AsylbLG recipients are most of the population.** These are small
  Gebiete with published S3 levels of 40–85 % (25005, 73009, 101003, 6004, 13001, 84002). Shares like
  that occur only where an accommodation site makes up most of the Gebiet. The publisher confirms
  one case: 48005 Winterhude was "geprägt durch die Flüchtlingsunterkunft Tessenowweg" (Bericht
  2021).
- **The publisher's "geringfügig" holds city-wide only.** The resident-weighted city-wide W1 ΔS3 is
  +0.25 pp as published and +0.14 pp revised. Per Gebiet the revision reaches 21 pp.

Bericht 2022 and 2023 contain no note that the 2019/2020 bases were recomputed. That part is inferred
from the annex, and A4.4 should say so. I could not read the 2014 Methodenbericht (`www.hamburg.de`,
not allow-listed). It is not needed, because the 2021 note is explicit.

### 6.2 R19 must become the primary (E1)

The pre-registration settles this itself. §4.3: "if an indicator changes its definition between the
two editions of a window, its d_j for that window is the change in within-edition z." The publisher
documents exactly such a change between editions 2019 and 2021. A4.4's "primary unchanged: each
edition's own published level" therefore contradicts a binding pre-registered rule. There are two
consistent options:

- **(a) Apply §4.3 as written:** z-change for T in W1. This is a poor fix. The added recipients are
  concentrated in a few accommodation Gebiete, so the seam shifts their *ranks*, not only the city
  level. The z-change fallback is immune only to uniform level breaks.
- **(b) Use the publisher's same-definition base:** s3_2019_rev = s3_2022 − D3_2022, i.e. R19. This
  is the exact analogue of the Berlin solution for the Berlin U seam: "neutralised by the backcast"
  S_2019 = anteil_2021 − dynamik_2021 (§4.2, §4.3). With R19, **both cities' 2019 levels come from a
  later edition's level minus its published Dynamik**. It is also the publisher's latest vintage of
  the 2019 value, which is the usual choice for time-series work with revised official data.

**(b) is the theory-faithful primary.** What I measured (outcome components only):

| Measure (Hamburg, 849 balanced Gebiete → 99 Stadtteile) | Value |
|---|---|
| Stadtteile whose W1 ΔS3 moves by > 0.5 pp / > 1 pp | 12 / 6 |
| Largest shift | Billbrook: W1 ΔS3 **+17.8 pp published vs +6.5 pp revised** |
| W1 ΔS3 sign changes | 5 of 99 |
| Spearman ρ(W1 ΔS3 published, revised), Stadtteil | 0.969 |
| Of the 12 shifted Stadtteile, < 5,000 residents | 7 (Billbrook, Billwerder, Hammerbrook, Neuland, Neuenfelde, Rönneburg, Sinstorf) |

Stadtteile here are grouped by the annex `stadtteil_name`, which approximates the
`dim_area_hierarchy` key.

Under the published primary, Billbrook's W1 change in T is about two-thirds counting change. The
pp-level primary §3.5 relies on is exactly where that matters. The cost of (b) for clean Gebiete is
two rounded published values (median |Δ| 0.05 pp), and no balanced Gebiete lacks s3_2022 or D3_2022
(0 missing).

**Scope.** Every row that uses Hamburg K_2019 or dK_W1 must be computed under both versions.
A4.4's list ("T, K, dK for W1, the pooled W1–W3 rows (H2, N2) and X8") leaves some out:

- **H3b:** dK_P is the *predictor* for pivot 2021.
- **H3a, N1, N2, N3:** dK_P and K_pivot are controls.
- **H3c:** pools W1–W3.
- **§3.6:** the Hamburg change validity check.
- **Core-3M** rows.

Core-2 is unaffected, as A4.4 says correctly.

### 6.3 Public wording on the refugee-accommodation channel (E3, E9)

§4.4's "local sites" bullet is now out of date in three ways, and it misses one mechanism.

1. **Hamburg accommodation residents are in the population counts.** §4.4 says that is "unknown".
   For Hamburg it is not: Bericht 2023 reports that population rose by 19.9 % in the 30
   accommodation Gebiete with negative Dynamik, and the annex populations jump when sites open
   (42004, 74012, 88003). For Berlin, and in particular the Tegel arrival centre, it is still
   unknown.
2. **It is not a few sites.** On 31.12.2022, 259 sites in 170 of 856 Gebiete (19.9 %) were in use
   (Bericht 2023, PDF p. 16, citing the Stabsstelle Flüchtlinge). 30 of the 37 Gebiete with
   negative Dynamik contain such a site (Bericht 2023, PDF p. 12). In Hamburg, a large part of the
   change in T, and so of dK under core-3H, reflects **where the city placed accommodation**. That
   is an administrative siting decision, not neighbourhood change. It is neither gentrification nor
   its reverse.
3. **The mechanism has opposite signs in the two cities' core-3H.** In Hamburg, AsylbLG is in T, so
   an opening raises K. In Berlin, AsylbLG is in no MSS indicator, so registered residents of a new
   site only raise the denominators and K falls, until recognition moves them into SGB II. Under
   core-2 both cities show the same denominator dilution. This is a further reason the D8 T-free
   condition belongs in the robust-DIFFERS rule. No new rule is needed, but the asymmetry must be
   written down.
4. **Ethics.** A public statement that "neighbourhood X declined" because a refugee site opened
   there turns refugees' presence into a decline story (the same hazard as my earlier D4). Listing
   small, identifiable Gebiete as "refugee-accommodation sites" in our own outputs is an inference we
   have not verified, and in Germany it carries a real safety risk for the residents of those sites.
   The by-ID disclosure in A4.4 is right for reproducibility. It should name the *revision*, not the
   *site*.

---

## 7. Other A4.3 items

- **849-Gebiet balanced panel: agreed.** Domain note (O3): Gebiete enter or leave scoring by
  crossing the 300-resident threshold, typically through new-build or the opening or closing of
  accommodation. Say so next to the list of 8 IDs.
- **HH S4 SD rounding, S7 NULL rule, missing HH 2022 age shares:** agreed. None of them carries
  meaning into K or into any public statement.

## 8. Required changes (E1–E9)

Exact wording. Pre-registration section references are to the current file.

- **E1: R19 becomes the primary (A4.4, §4.3).**
  - Replace the A4.4 bullet "**Primary unchanged:** each edition's own published level, as
    pre-registered." with: "**Primary (amended, §4.3 seam):** Hamburg S3 for edition 2019 is the
    publisher's same-definition base s3_2019_rev = s3_2022 − D3_2022 for every balanced Gebiet.
    Bericht 2021 (PDF p. 8) documents that from edition 2021 the AsylbLG part of S3 counts recipients
    of Regelleistungen and of ausschließlich besondere Leistungen. W1 would otherwise straddle a
    definition seam. This parallels the Berlin backcast (§4.2)."
  - Rename the R19 bullet "**Sensitivity R19-pub:** the as-published 2019 level". A verdict or X8
    sign that changes under it is flagged "revision-sensitive (HH S3 2019 counting change)".
  - In §4.3 "Known seams", add: "Hamburg T, 2019 → 2021: AsylbLG counting widened from edition 2021
    (Bericht 2021, PDF p. 8). Neutralised by the publisher's re-based 2019 level s3_2022 − D3_2022
    (A4.4)."
  - In the A4.4 text, replace "the likely reading is that the publisher later revised the 2019 (and
    2020) S3 bases, plausibly through AsylbLG counting at accommodation sites" with "the publisher
    documents a widened AsylbLG count from edition 2021 (Bericht 2021, PDF p. 8). The re-basing of
    the 2019/2020 values in D3_2022/D3_2023 is inferred from the annex (51/52 and 44/44 revisions
    upward). The concentration in high-S3 Gebiete is consistent with accommodation sites but is not
    stated by the publisher."
  - Update the revision-log table row A4.4 to match.
- **E2: Recompute scope (A4.4).** Replace "T, K, dK for W1, the pooled W1–W3 rows (H2, N2) and X8 are
  recomputed" with "every row that uses Hamburg K_2019 or dK_W1 is computed under both versions:
  H2, H3a, H3b (dK_P is the predictor at pivot 2021), H3c, N1, N2, N3, X8, the core-3M rows and the
  §3.6 Hamburg change check".
- **E3: Disclosure by revision, not by site (A4.4).** Replace the disclosure bullet with: "The methods
  note lists, by ID, every Gebiet with |D3_E − (s_E − s_{E−3})| > 0.5 pp in 2022 or 2023, with its W1
  and W2 S3 change, under the heading 'S3 base revised by the publisher (AsylbLG counting change,
  Bericht 2021)'. Individual Gebiete are not labelled as refugee-accommodation sites in any
  output. The accommodation reading is stated only in aggregate, with the publisher's citation. W2
  is not claimed to be revision-free; it is untestable, with a clean start level." In the A4.4
  paragraph, also qualify "with refugee accommodation (for example …)" as "consistent with
  accommodation sites (confirmed by the publisher for 48005)".
- **E4: Provenance (R-C2).** A4.4 cites "data checks §3", but `docs/epic-e/371-data-checks.md`
  contains none of the A4.4 evidence. The DE adds it there: per-edition ρ, counts and sign split of
  |Δ| > 0.5 pp, the level quantiles, the Bericht 2021 PDF p. 8 quote, and the dbt test
  `test_371_hh_annex_d_vs_s_consistency`. Alternatively, A4.4 cites wherever the evidence actually
  is.
- **E5: W24 flag and binding disclosure (A4.1).**
  - Rename the flag "weight-sensitive (LOR 2019→2021 crosswalk)" to "**weight-sensitive (2024
    population weights)**".
  - Replace the binding disclosure with: "Berlin populations for 31.12.2018 and 31.12.2020 are
    mapped from LOR 2019 to LOR 2021 by area share, not by population. About 10,100 residents (0.27 %)
    are assigned to two development sites that had no housing at either date, and are missing from
    the neighbouring areas where they lived. This shifts the weights inside 2 of 143
    Bezirksregionen. Their totals including the two sites are unaffected. Sensitivity W24 uses
    2024 populations throughout. Because 2024 populations also reflect real change since 2018 (new
    housing, refugee arrivals, ageing), a result that changes under W24 is not by itself evidence
    of the mapping error."
  - Add to the W24 bullet: "W24 measures fixed-composition change. It does not include population
    shifts between areas within a unit, which can be part of neighbourhood change (new-build
    gentrification)."
- **E6: f in W24 (A4.1).** Replace "where it replaces P^(U)/P with the 2024 ratio" (and the
  matched-grain equivalent) with "where P and the age bands are taken from 31.12.2024 and f stays
  the edition's own Regelaltersgrenze value (0.292 / 0.375 / 0.458 / 0.500, §3.7)".
- **E7: The R5 new-build diagnostic (§5, A4.1).**
  - Rename the flag "possibly new-build-driven" to "**possibly population-growth-driven (new-build
    or refugee accommodation)**", with `newbuild_driven` renamed to `popgrowth_driven` in §9.1.
  - Add: "Berlin population growth for this diagnostic is computed on BZR totals over **all** child
    PLRs (correct to 0.14 %), not on the balanced-child sum, and it is not computed at PLR grain
    for windows that use 2018/2020/2022 crosswalked counts (reported as 'not computed: areal
    crosswalk')."
  - Update the A4.1 sentence "Population enters only (i) … and (ii) …" to add "(iii) the R5
    diagnostic, handled as in §5".
- **E8: City levels (A4.3, §10).**
  - Replace "so the two are comparable" with "so both use the same aggregation (weighted by total
    residents). The indicator definitions still differ (§3.2, R7), so the levels are shown per city
    with their definitions and are not ranked against each other. Both differ from the official
    headline figures (Hamburg: unweighted Gebiet mean; Berlin: PLR aggregate about 0.5 pp below the
    published S3), and the display says so."
  - Add to §10: "Which city has more unemployment, transfer receipt or child poverty, from the
    matched U/T/C levels (definitions differ, §3.2)."
- **E9: Accommodation channel (§4.4).** Replace the "Local sites" bullet with: "**Accommodation
  sites (all windows, mainly W2/W3).** On 31.12.2022, 259 refugee-accommodation sites were in use in
  170 of 856 Hamburg Gebiete, and 30 of the 37 Gebiete with negative Dynamik in 2023 contain one
  (Bericht 2023, PDF pp. 12, 16). Their residents are in the Hamburg population counts. Because
  AsylbLG is in Hamburg T, an opening raises Hamburg K. In Berlin, AsylbLG is in no indicator, so
  registered residents of a new site lower Berlin K through the denominators until recognition.
  Under core-2 both cities show only the denominator effect. Whether residents of the Berlin
  arrival centre at Tegel are registered is unknown. Disclosed, not corrected." Add as binding page
  wording wherever Hamburg change is shown: "In Hamburg, the welfare indicator includes
  asylum-seeker benefits. Where the city opens or closes refugee accommodation, an area's figure can
  change by tens of percentage points without any change among its existing residents. Such changes
  show where accommodation was placed. We do not read them as neighbourhood decline or
  improvement."

## 9. Optional (non-blocking)

- **O1** 39005/67012: "consistent with small-number effects in the published data", not "errors"
  (§2).
- **O2** PM follow-up issue, outside #371: check whether `mart_area_demographics` publishes crosswalked
  2018/2020 Berlin PLR counts on `lor_2021` (for example Pankower Tor in 2020) (§4).
- **O3** Next to the 8 dropped Gebiete: entering or leaving scoring is typically through new-build or
  accommodation opening or closing (§7).
- **O4** If geo-DS sees value in it: a targeted artefact sensitivity that applies 2024 child weights
  only inside BZR 034008 and 062004 would isolate the crosswalk effect that W24 cannot. Statistical
  call; I do not require it, provided E5 is adopted.

Note for geo-DS, statistical lane: §8.2 asserts "aggregation weights date from the outcome's own
reference date, never later". W24 breaks this by design, so the guard needs an explicit W24 exemption,
or the assertion will fire.

## Sources

- Freie und Hansestadt Hamburg, BSW. *Sozialmonitoring Integrierte Stadtteilentwicklung, Bericht
  2021*, PDF p. 8 (AsylbLG Erfassung), PDF p. 11 (048 005, Flüchtlingsunterkunft Tessenowweg). *Bericht 2023*, PDF p. 12 (30 of
  37 negative Dynamik), p. 16 (259 sites in 170 Gebiete, Exkurs, Tabelle 8). Berichte 2019, 2020
  and 2022 were checked; they contain no note on re-based 2019/2020 values. Transparenzportal,
  dl-de/by-2.0.
- SenSBW, *Monitoring Soziale Stadtentwicklung*, Indikatorenblätter 2019–2025, as quoted in
  `docs/epic-e/371-data-checks.md` §4.1.
- Davidson, M. & Lees, L. (2005). New-build "gentrification" and London's riverside renaissance.
  *Environment and Planning A* 37(7), 1165–1190.
- Tobler, W. R. (1979); Eicher & Brewer (2001); Mennis (2003), as cited in Amendment 4.
- Dangschat, J. (1988); Döring & Ulbricht (2016), as in the pre-registration §12.

Verdict: CONCERNS

---

## Re-check (revision 1), 2026-11-05

Scope: the "Amendment 4, revision 1" block at the end of
`docs/methodology/371-matched-comparison-preregistration.md` (working tree), against E1–E9, O1 and
O4 above. I checked `docs/epic-e/371-data-checks.md` for E4. I did not open the DB.

| Item | Status |
|---|---|
| **E1** R19 primary; R19-pub sensitivity; §4.3 seam; A4.4 reading reworded | **Met**, verbatim. The missing-value rule carries over, as intended. |
| **E2** recompute scope | **Met**, verbatim (H2, H3a, H3b, H3c, N1, N2, N3, X8, core-3M, §3.6). |
| **E3** disclosure by revision, not by site; 48005 qualifier | **Met**, verbatim. |
| **E4** provenance in the data checks | **Open** (see below). |
| **E5** W24 flag, binding disclosure, fixed-composition sentence | **Met**, verbatim. |
| **E6** f unchanged in W24, both grains | **Met**. "The age-structure weights are swapped; the U definition at each edition is not" states it exactly. |
| **E7** `popgrowth_driven`; Berlin BZR totals over all children; not computed at PLR grain from crosswalked counts; "(iii)" | **Met**, verbatim. |
| **E8** city-level wording; §10 no cross-city U/T/C ranking | **Met**, verbatim. |
| **E9** accommodation bullet and binding page wording | **Met**, verbatim. |
| **O1** | Adopted. |

**Additions I did not specify: all accepted.**

- **R19-pub flag** "revision-sensitive (HH S3 2019 counting change)". This is the wording I proposed.
  It names the counting change, not the sites.
- **§8.2 exemption scoped to `sensitivity = 'W24'`**, with the assertion that W24 rows never feed a
  primary or BH-corrected row. Accepted. The W24 rows are fixed-composition sensitivities, and the
  E5 wording already stops them being read as evidence of an artefact.
- **s3_2019_rev as a permitted later-edition input.** Accepted on domain grounds. It is the
  publisher's own estimate of the 31.12.2018 level under the edition-2021 definition, the same
  kind of construction as the Berlin backcast anteil_2021 − dynamik_2021, which is already
  permitted. The only route by which a 2022 value can enter is through rounding of s3_2022 and
  D3_2022 (median |Δ| 0.05 pp on clean Gebiete). That is negligible, and it is not an outcome
  signal.
- **O4 not adopted.** Accepted. With E5, W24 no longer claims to isolate the artefact, and I made O4
  conditional on exactly that.

**E4 is open, and one sentence in the evidence file now contradicts the design.** The data checks
§2, check 6, still says of the S3 2022/2023 outliers: "It has no effect on the design, which uses
levels (PR §3.5), not published Dynamik." Under E1 that is no longer true. The re-based 2019 level
is built from D3_2022, and it changes W1 T for 12 Stadtteile by more than 0.5 pp. When the DE adds
the E4 section, this sentence must be replaced, for example: "Under PR Amendment 4 rev. 1 (E1),
the Hamburg 2019 S3 level used is s3_2022 − D3_2022 (see §3, back-revision)." Until then, the gate
treats A4.4 as uncited, as revision 1 itself states.

**Non-blocking note (implementation, for geo-DS/DE).** The §9.1 `flags` vocabulary does not yet
list tokens for the two new flags, "weight-sensitive (2024 population weights)" and
"revision-sensitive (HH S3 2019 counting change)". Something like `w24_weight_sensitive` and
`r19_revision_sensitive` would keep the CSV in step with the findings text. This does not affect
domain validity.

**Conditional PASS.** On domain validity, Amendment 4 with revision 1 passes. The condition is that
E4 lands in `docs/epic-e/371-data-checks.md`, containing the items revision 1 lists **and** the
correction of the "no effect on the design" sentence above. Once that is in place, the PM may
record this as PASS without another domain re-check. If E4 has not landed, the methodology gate
must treat this verdict as not yet met.

Verdict: PASS (conditional on E4 landing in `docs/epic-e/371-data-checks.md`, including the
correction of the §2 check 6 "no effect on the design" sentence)
