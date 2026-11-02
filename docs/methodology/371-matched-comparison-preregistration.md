# Pre-registration: matched-grain, harmonised-KPI Berlin–Hamburg comparison of the thesis hypotheses (#371, E1c)

- **Author:** geo-data-scientist
- **Date:** 2026-11-02
- **Issue:** #371 (methodology-bearing; R-C1 dual gate)
- **Status:** PRE-RESULTS. No matched-panel statistic exists when this is written. The data
  inventory in §2 was run read-only against `data/gentriduck.duckdb` and touches only
  descriptives: areas, populations and POI min-base pass rates. No outcome is joined to any
  predictor.
- **Builds on:** `docs/methodology/354-355-hypothesis-suite-preregistration.md` (cited as **P354**),
  including Amendments 1–3; `docs/epic-e/354-*-signoff.md`; `docs/epic-h/355-*-signoff.md` (the
  domain Addendum on the Hamburg construct and the finding that no business category can be
  measured at Gebiet grain); `docs/epic-e/354-phase-a-data-prerequisites.md` §3–5 (cited as
  **PA**); `docs/epic-c/360-mss-indicator-mapping-evidence.md` (cited as **#360**);
  `analysis/thesis_hypothesis_suite.py`.
- **Binding rule:** whatever this document does not change carries over from P354 unchanged. That
  covers the estimators (§5.1), the classifier specification, OA zero-fill and A1.1, the bootstrap
  p, BH-FDR, the effect-size labels, the verdict mapping (§5.6 with Amendments 2 and 3), the §9
  must-not-claim list and #358 wording. Deviations found during implementation are recorded as
  numbered amendments before results are seen, or disclosed as post-results.

---

## 0. Decisions at a glance

| Item | Decision |
|---|---|
| Grain | **Berlin BZR (`lor_2021`, 143)** vs **Hamburg Stadtteil (99 with scored Gebiete)**. Both are built bottom-up from a **balanced** set of PLR/Gebiete: units inhabited/scored in all four editions. |
| Status construct | **Harmonised core K**: unemployment, transfer receipt and child poverty, population-weighted from PLR/Gebiet. Within each city and edition, each indicator is z-scored over the matched units, and K is the mean of the three z-scores. Higher K means more disadvantage. HH migration background (S1) and school leaving (S7) are reported as context only. |
| Hamburg shares | Recovered from the annex z-scores as share = mean + z·SD per edition (`stg_hamburg_sozialmonitoring_indicators`, pending the ADR-0014 amendment). Every rank statistic depends only on the SD; the mean only matters for descriptive levels (§3.3). |
| Windows | Editions **2019, 2021, 2023, 2025** in both cities. Levels as of 31.12.(E−1) in **both** cities (verified, §4.1). Changes are pp differences of **levels** over W1 = [2019, 2021], W2 = [2021, 2023], W3 = [2023, 2025] (OSM snapshot years). Pivots are **2021** and **2023**. The H1 cross-section is edition 2025 × OSM 2025. Published Dynamik classes are not used. |
| Berlin 2019 level | Backcast on `lor_2021`: S_2019 = anteil_2021 − dynamik_2021 (the P354 §3.1 rule). Checked against crosswalked MSS 2019 on `lor_pre2021` (§4.2). |
| POIs | The same commercial basket (Gastronomy, Retail, Services, Entertainment), the ADR-0017 LQ OA (`standard/faithful`), and snapshots 2019/2021/2023/2025, with stocks summed to the matched grain and OA recomputed there. **The H1/H2 feature list is the intersection of the two cities' A1.1 lists.** |
| Inference | **Spatial block bootstrap**: G = 24 contiguous k-means blocks per city on area centroids (EPSG:25833 / 25832), B = 1999, seed 42. The same blocks are the GroupKFold groups for H1/H2. Sensitivities: G = 16 and G = 36, an iid bootstrap, and Moran's I of the residuals (#365). |
| City difference | For each of the 8 hypotheses, Δ = θ_BER − θ_HH from **independent** block bootstraps in each city. Two-sided bootstrap p. BH across the 8 forms its own family. Verdicts: **DIFFERS** / **NO DIFFERENCE DETECTED** / NO DATA. The minimum detectable difference (MDD) is always reported. |
| MAUP | The whole matched design is re-run at PLR/Gebiet with the same blocks, as a sensitivity. |
| New hypotheses | **N1** level-conditional H3a (confirmatory). **N2** café-to-fast-food ratio change precedes status change (confirmatory). **N3** neighbourhood commercial-change spillover via a spatial lag (exploratory). **(d) protection-zone timing is rejected** (§7.4). |
| Families | Per city: **T8** (the 8 thesis primaries, BH as in P354) and **N2-family** (N1, N2; BH within the family). Across cities: **X8** (the 8 interactions, BH). N3, the N1/N2 interactions and every sensitivity are uncorrected and exploratory. |
| Blocking prerequisites | (1) The ADR-0014 amendment is approved and `stg_hamburg_sozialmonitoring_indicators` is ingested and DE-reviewed. (2) The checks in §3.3 and §4 pass. (3) Both sign-offs on this document are PASS. |

---

## 1. Purpose and framing

P354/#355 produced a Berlin suite at PLR grain on the MSS composite, and a Hamburg suite at
Gebiet grain on the seven-indicator Statusindex with 3-year Dynamik classes. Its §4.5 states the
two are **not like-for-like**. They differ in construct (migration background and school leaving
are only in Hamburg), in grain (about 7,200 vs 2,200 residents), in change window (2 vs 3 years)
and in POI measurability (no commercial category passes the min-base at Gebiet grain;
355-domain-signoff §2).

E1c removes the three differences that design can remove, and it tests the city difference
formally:

1. **Grain:** both cities at units of about 15,000–26,000 residents and 4–6 km² (§2).
2. **Construct:** the same three labour-market and transfer indicators in both cities (§3).
3. **Time:** the same editions, the same reference dates and the same 2-year calendar windows (§4).
4. **POIs:** the same basket, OA definition, snapshots and feature list (§5).
5. **Claim:** "differs between cities" becomes a tested, multiplicity-controlled statement (§6.3).

What E1c **cannot** remove, and must say: the indicator definitions are not identical (§3.2);
OSM mapping density differs between the cities (§2.3); the shocks hit the two indicator sets
differently (§4.4); and with n ≈ 100–143 units per city, power for city differences is low
(§6.4). **A "no difference detected" is never "the same".** The framing stays as in Epic B: a
directional comparison, not a replication.

---

## 2. Grain (verified read-only, 2026-11-02)

### 2.1 Area and population distributions

Areas were computed from `dim_area_geometry` and transformed to EPSG:25832 for both cities, so the
two use one metric CRS (only area ratios are compared). Population is Berlin EWR `residents_total`
on 31.12.2024 (`int_berlin_ewr_plr2021`), summed PLR→BZR via `dim_area_hierarchy`, and Hamburg
Sozialmonitoring edition 2025 `population` (31.12.2024), summed over scored Gebiete per Stadtteil.

**Area (km²)**

| Level | n | min | Q1 | median | Q3 | max | total |
|---|---:|---:|---:|---:|---:|---:|---:|
| BER PLR (`lor_2021`) | 542 | 0.13 | 0.52 | 0.81 | 1.67 | 23.8 | 892 |
| **BER BZR (`lor_2021`)** | **143** | 0.71 | 2.35 | **4.10** | 7.08 | 43.4 | 892 |
| HH Gebiet | 943 | 0.04 | 0.19 | 0.36 | 0.68 | 17.5 | 768 |
| **HH Stadtteil** | **104** (99 scored) | 0.55 | 2.73 | **5.94** | 8.98 | 35.4 | 755 |

**Population (31.12.2024)**

| Level | n | min | Q1 | median | Q3 | max | total |
|---|---:|---:|---:|---:|---:|---:|---:|
| BER PLR (inhabited) | 540 | 16 | 4,785 | 7,224 | 9,451 | 16,901 | 3,897,145 |
| **BER BZR** | **143** | 4,487 | 18,247 | **26,387** | 34,388 | 64,657 | 3,897,145 |
| HH Gebiet (scored) | 857 | 311 | 1,642 | 2,197 | 2,892 | 6,685 | 1,962,574 |
| **HH Stadtteil (scored)** | **99** | 497 | 6,859 | **15,643** | 29,304 | 95,780 | 1,962,574 |

Children per parent: BZR has 1–5+ PLR (8 BZR have a single PLR). Stadtteil has 1–40+ Gebiete,
and **14 Stadtteile consist of a single scored Gebiet**.

### 2.2 Reading

BZR and Stadtteil are the closest matched pair the two hierarchies offer. Their median area is
similar (4.1 vs 5.9 km²), and the two grains are on the same order of population (median 26k vs
16k). The alternatives are worse. Berlin PGR (58 units, median 11.7 km²) is coarser than any
Hamburg level. Hamburg Bezirk (7) is far too coarse. Berlin PLR vs Hamburg Gebiet would differ by
a factor of 3 in population.

The match is **imperfect in dispersion**. Hamburg Stadtteile are much more unequal in size: 22 of
99 have fewer than 5,000 residents (13 fewer than 2,500; mostly Vier- und Marschlande and the
Elbe islands), against 1 of 143 BZR. Small units have noisier shares, and in rank statistics
they weigh as much as large ones. So, as a pre-registered **size-overlap sensitivity**, the whole
matched panel is re-run on units with at least 5,000 residents in both cities (HH ≈ 77, BER ≈ 142).
A verdict that flips under this sensitivity is flagged "depends on Hamburg's small Stadtteile".

### 2.3 Balanced child panel

- **Berlin:** PLRs inhabited in all four editions and with an MSS value in 2021/2023/2025 (the
  #354 frame, 541). Their BZR is the parent in `lor_2021`. No LOR boundary is crossed (P354 §5.8.5).
- **Hamburg:** Gebiete scored in **all four** editions 2019/2021/2023/2025. A Gebiet entering or
  leaving the scored set would otherwise create an artificial Stadtteil change. The DE reports the
  number dropped (expected < 10; the scored count runs 852→857).
- A matched unit is included if it has at least one balanced child. The Hamburg Stadtteil key comes
  from `dim_area_hierarchy` (subarea_l2 → subarea_l1). All 857 scored 2025 Gebiete match a parent,
  giving 99 Stadtteile in each of the four editions.

### 2.4 OSM density differs between the cities (disclosure)

At matched grain, the share of units whose domain base is at least 10 (2025) is:

| | Gastronomy | Retail | Services | Entertainment |
|---|---|---|---|---|
| BER BZR | 0.91 | 0.92 | 0.64 | 0.47 |
| HH Stadtteil | 0.67 | 0.72 | 0.53 | 0.27 |

Hamburg's OSM is thinner per unit. LQ-based OA and C5 shares are ratio measures within a city and
are robust to a city-wide density level (P354 §4.1). **Cross-city comparisons of OA *levels* are
not made.** Only within-city associations are compared.

---

## 3. Harmonised KPI core

### 3.1 Indicator mapping

| Core KPI | Berlin MSS (meaning per #360) | Hamburg Sozialmonitoring annex (PA §5 numbering) |
|---|---|---|
| **U: unemployment** | S1 `arbeitslose_anteil`: SGB II unemployed per resident aged 15 to the statutory retirement age (2021+; 15–<65 in 2019), % | **S4 Arbeitslose**: share of residents aged 15–64; labelled "Arbeitslose (SGB II)" in the 2019 and 2021 annexes |
| **T: transfer receipt** | S3 `transferbezug_anteil`: **non-unemployed** recipients of SGB II and SGB XII subsistence benefits per resident, % | **S3 SGB-II-(und AsylbLG-)Empfänger/-innen**: all SGB II recipients, plus AsylbLG from 2019, per resident |
| **C: child poverty** | S4 `kinderarmut_anteil`: under-15s in SGB II households per under-15s, % | **S5 Kinder (unter 15) in Mindestsicherung** |

Excluded from K, reported as **context only** (descriptive correlations with K and with the H1a/H1b
OA, no verdict): HH S1 Kinder mit Migrationshintergrund, HH S7 Schulabschlüsse, and also HH S2
(single-parent children) and S6 (Mindestsicherung im Alter), which have no Berlin counterpart in
all four editions. Berlin S2 (single-parent children) exists only from 2023 and is excluded for the
same reason.

### 3.2 Known construct gaps (binding text for the findings)

1. **T differs in scope.** Berlin S3 excludes the unemployed and AsylbLG recipients. Hamburg S3
   includes all SGB II recipients and, from 2019, AsylbLG recipients. Hamburg T therefore loads more
   on refugee accommodation and overlaps more with U.
2. **C differs in scope.** Berlin S4 counts SGB II only. Hamburg S5 counts "Mindestsicherung",
   which may include SGB XII and AsylbLG. **The DE must confirm the S5 definition from the annex
   notes before the analysis runs.**
3. **U denominators differ** (15 to retirement age vs 15–64). The DE confirms whether Hamburg S4
   remains SGB II only in 2023/2025, or whether it changes to SGB II + III (see §4.3).
4. Because K is z-scored within each city, **it ranks units within a city**. A Berlin and a
   Hamburg unit with the same K are not equally disadvantaged.

**Sensitivity "core-2":** K without T (U + C only). T is the indicator with the largest scope gap
and the most direct refugee channel. A verdict or DIFFERS decision that changes under core-2 is
flagged "depends on the transfer indicator".

### 3.3 Hamburg shares from the annex z-scores

The annex publishes each indicator as z_ij = (x_ij − m_j,E) / s_j,E over the scored Gebiete of
edition E, together with the city mean and SD rows (PA §5). Recovery:

**x̂_ij,E = m_j,E + z_ij,E · s_j,E**

- **Only s matters for inference.** Population-weighted aggregation is linear:
  Σ w_i x̂_i / Σ w_i = m + s · (Σ w_i z_i / Σ w_i). Within an edition, m is a uniform shift for all
  units. Every estimator in this design is a within-city rank statistic or a within-city z-score.
  So m changes no level rank, no change rank and no K. The **SD**, however, scales the pp changes
  differently per edition, so it must be correct.
- **Checks (DE, binding, before any analysis):**
  1. The mean row and SD row match the moments of the z column (mean of z = 0.00 ± 0.01, SD of z =
     1.00 ± 0.01 per indicator and edition). If the published "Hamburg" row is a population-weighted
     city rate rather than the unweighted Gebiet mean, record it. It is harmless for the reason
     above, but the descriptive levels must then be labelled accordingly.
  2. All recovered shares are in [0, 100]. More than 0.5% outside [−0.5, 100.5] is a FAIL.
  3. The precision of the z-scores is recorded. At two decimals, the recovery error is at most
     0.005·s; for s ≈ 3 pp this is 0.015 pp, which is negligible.
  4. S3 = SGB II (+ AsylbLG), S4 = Arbeitslose and S5 = Kinder in Mindestsicherung are mapped by
     the **column header text**, not by position. The test for this mirrors the #360 lesson.
  5. The annex status sums reproduce ΣS1…S7 (PA §5), and the class counts reproduce
     `seed_hh_sozialmonitoring_published_class_counts`. These come from the ADR-0014 amendment tests.

### 3.4 Aggregation to the matched grain

x_u,E = Σ_{i∈u} w_i,E · x_i,E / Σ w_i,E over the balanced children of unit u. Rules:

- **w = total residents at the reference date** 31.12.(E−1). Berlin: EWR `residents_total` for 2018,
  2020 and 2024. Berlin EWR has no **2022** reference year in the warehouse, so 2022 uses the PLR
  mean of 2020 and 2024 (disclosed). Hamburg: Sozialmonitoring `population` of the same edition.
- The ideal weights would be the indicator denominators (residents aged 15–64/67 for U, under-15s
  for C). Hamburg publishes only total population per Gebiet, so **both cities use total residents**
  for symmetry. Berlin-only sensitivity: age-specific EWR denominators for U and C, where EWR carries
  them. This tests how much the approximation matters.
- K_u,E = mean over j ∈ {U, T, C} of z_j(x_u,E). The z-score is computed over the matched units of
  the city in edition E, unweighted, as the MSS and Sozialmonitoring do.

### 3.5 Change outcome

d_j,u,W = x_j,u,end − x_j,u,start in pp (levels, not published Dynamik).
**dK_u,W = mean_j z_j(d_j,u,W)**, with the z-score taken over units within city and window. Higher
dK means relatively growing disadvantage. Binary targets keep the P354 rules: H1 status = K_2025 > 0,
H2 target = dK > 0 ("relative worsening vs rest"), in both cities.

### 3.6 Validity check of K against each city's own index (pre-registered thresholds)

| Check | Grain | Statistic | Pass |
|---|---|---|---|
| BER level | PLR, editions 2021/2023/2025 | Spearman ρ(K computed at PLR, the #354 MSS S composite) | ≥ 0.90 |
| BER change | PLR, W2, W3 | ρ(dK, the #354 Dynamik composite) | ≥ 0.80 |
| HH level | Gebiet, all four editions | ρ(K at Gebiet, annex Status-summe) | ≥ 0.80 |
| HH change | Gebiet, W windows vs the 3-year Dynamik-summe that ends in the same edition | ρ | reported, no threshold (the windows differ) |
| Both | matched grain | ρ(K, the population-weighted mean of the own index's status class) | reported |

The Hamburg threshold is lower because S1 and S7 are deliberately left out. If any threshold
fails, the matched panel still runs, but every finding carries "the harmonised core diverges from
<city>'s own index (ρ = …)", and the domain expert decides whether the H1 family may be shown
publicly. Thresholds are not adjusted after results.

---

## 4. Time windows

### 4.1 Reference dates (verified)

- **Hamburg:** edition E = data as of 31.12.(E−1) (PA §3; CKAN `temporal_coverage_from`, annex
  population headers).
- **Berlin:** MSS 2021 covers 31.12.2018 → 31.12.2020, MSS 2023 covers 31.12.2020 → 31.12.2022, and
  MSS 2025 covers 31.12.2022 → 31.12.2024 (ADR-0006 table, from the SenSBW reports; P354 §3.1). So
  the status level of edition E is as of **31.12.(E−1)**, the same as Hamburg.
- **So the calendar spans are identical:** W1 = 31.12.2018 → 31.12.2020, W2 = 2020 → 2022, W3 =
  2022 → 2024. OSM snapshot Y = state at Y-01-01, so these are OSM windows [2019, 2021],
  [2021, 2023] and [2023, 2025]. Edition E pairs with OSM snapshot E, as the thesis did.

### 4.2 Berlin 2019 level

MSS 2019 is published on `lor_pre2021` (447 PLR). Primary: **S_2019 on `lor_2021` = anteil_2021 −
dynamik_2021**, per indicator. MSS 2021 publishes D1/D3/D4 as the two-year pp change on the 2021
geometry and the 2021 definition, so the backcast is on a consistent geometry and definition.
Consistency check (reported): Spearman ρ(backcast, MSS 2019 crosswalked through
`int_berlin_lor_crosswalk_dominant_pop_2021`) ≥ 0.90 per indicator at BZR. Also reported: the
agreement of anteil_E − anteil_(E−2) with the published dynamik_E for E = 2023 and 2025 (ρ ≥ 0.95
expected). This shows that "level differences" and the published two-year change agree when the
definitions are stable.

### 4.3 Definition seams inside a window

Known seams:
- Berlin U, 2019 → 2021: the age bound changes. This is neutralised by the backcast in §4.2.
- Hamburg T adds AsylbLG **from 2019**, i.e. at the start of W1, so all matched windows are on the
  new definition.
- Hamburg U is labelled "SGB II" in 2019/2021. It must be confirmed for 2023/2025 (§3.2).

**Rule (pre-registered):** if an indicator changes its definition between the two editions of a
window, its d_j for that window is the **change in within-edition z** (z_end − z_start) instead of
the pp change. This is flagged in the row and in the findings. This fallback ranks relative
movement and is immune to level breaks. Sensitivity for every window: dK computed from z changes
for all indicators.

### 4.4 Shock disclosure (binding text for the findings)

- **W1 (2018 → 2020):** pandemic onset. Unemployment rises from spring 2020, concentrated in
  gastronomy, retail and tourism jobs. That links the outcome to the POI basket through the labour
  market, not through neighbourhood change (P354 §3.4, W1 mechanism). Refugees who arrived in
  2015–16 continue to move from AsylbLG into SGB II after recognition. In Berlin this raises S3/S4;
  in Hamburg it moves people from AsylbLG to SGB II, both of which are inside S3.
- **W2 (2020 → 2022):** the bounce-back of pandemic unemployment. The **Rechtskreiswechsel** of
  1 June 2022 moves Ukrainian refugees from AsylbLG to SGB II. This raises Berlin U, T and C wherever
  Ukrainians live. In Hamburg it raises U and C; T changes less, because AsylbLG was already counted.
  **This channel is asymmetric between the cities by construction**, and it is the main reason for
  the core-2 sensitivity.
- **W3 (2022 → 2024):** **Bürgergeld** (1 January 2023) widens SGB II access and raises the
  protected assets. **Wohngeld-Plus** (2023) moves some low-income households out of SGB II/XII
  into housing benefit, which lowers T and C. Both are city-wide, but their spatial incidence
  follows the existing low-income geography. Ukrainian refugee arrivals continue.
- Under rank statistics a uniform city-wide shift is harmless; a shift that follows the existing
  geography is not. Every H2/H3 row that pools windows says so. Per-window rows are reported as
  sensitivities. A city difference that appears only in W2 is flagged "coincides with the
  Rechtskreiswechsel asymmetry".

---

## 5. POIs

- **Source:** `int_poi_oa_native_panel`, `weight_variant = standard`, `methodology_variant =
  faithful`. Berlin `lor_2021`, Hamburg `current`, snapshots 2019/2021/2023/2025.
- **Aggregation:** level and parent stocks are summed from PLR/Gebiet (all children in the polygon,
  not only balanced ones, because POIs are not tied to scoring) to BZR/Stadtteil. OA is recomputed
  at the matched grain as the LQ (ADR-0017) from the summed stocks and the city totals. The min-base
  flag is recomputed on the summed parent stock (≥ 10). Zero-fill as in P354 §5.1.
- **Commercial share c and DHS growth g(c):** as in P354 §5.1, on the four commercial domains at
  the matched grain.

**Min-base check at the coarser grain (verified, share of units with domain base ≥ 10):**

| Snapshot | BER BZR: Gastro / Retail / Services / Entert. / Sport | HH Stadtteil: same |
|---|---|---|
| 2019 | 0.86 / 0.90 / 0.57 / 0.42 / 0.59 | 0.62 / 0.69 / 0.35 / **0.21** / 0.32 |
| 2021 | 0.87 / 0.90 / 0.59 / 0.45 / 0.62 | 0.65 / 0.68 / 0.40 / **0.21** / 0.36 |
| 2023 | 0.90 / 0.92 / 0.64 / 0.47 / 0.74 | 0.64 / 0.69 / 0.45 / 0.25 / 0.37 |
| 2025 | 0.91 / 0.92 / 0.64 / 0.47 / 0.83 | 0.67 / 0.72 / 0.53 / 0.27 / 0.42 |
| *(fine grain 2025, for contrast)* | *PLR: 0.48 / 0.56 / 0.25 / 0.18 / 0.25* | *Gebiet: 0.12 / 0.15 / 0.04 / 0.01 / 0.01* |

**All four commercial domains pass the A1.1 ≥ 20% rule in both cities in every snapshot** at matched
grain. Hamburg Entertainment is marginal (0.21 in 2019/2021). This is the core gain of E1c:
Hamburg H1/H2 can test the business mix (*Angebotsstruktur*) for the first time.

- **Feature list (H1, H2):** the categories that pass A1.1 in **both** cities' matched panels at the
  relevant snapshot (2025 for H1; the window-start snapshots, jointly, for H2). Sorted
  lexicographically, derived from the flags only, and written to the metadata before any fit. If
  Hamburg Entertainment falls below 20% in the final build, it drops out of **both** lists.
- **H1 commercial-only** (P354 §5.2, which decides public wording) is now testable in Hamburg. It
  remains secondary.
- **H1a/H1b:** the parent base is Gastronomy, so n ≈ 130 (BER) and ≈ 62–66 (HH). **H1c:** domain
  Sports and Recreation OA. The DE reports its base pass rate at the matched grain.
- **Mapping-completeness (C5):** the C5 share and OA are within-city ratios. Spatially uneven
  mapping diffusion remains a threat (P354 §4.1, R6). The OSM total-count growth per matched unit
  is reported as a diagnostic. An H3 verdict whose sign reverses when the units in the top decile of
  total-POI growth are dropped is flagged "possibly mapping-driven".

---

## 6. The eight thesis hypotheses at matched grain

### 6.1 Estimators (P354 §5.1, with the matched variables)

| Hyp | Matched primary | Expected |
|---|---|---|
| H1 | Out-of-fold AUC, L2-logit (P354 specification, A1.1 imputation), binary K_2025 > 0 ~ the **common** category OA list 2025; 5-fold GroupKFold by spatial block | AUC > 0.5 (non-directional; Amendment 3 applies) |
| H1a | Spearman ρ(OA Cafe 2025, K_2025) | ρ < 0 |
| H1b | Spearman ρ(OA Fast Food 2025, K_2025) | ρ > 0 |
| H1c | Spearman ρ(OA domain Sports and Recreation 2025, K_2025) | ρ < 0 |
| H2 | Out-of-fold AUC, binary dK_W > 0 ~ common category OA at the window start, W1–W3 pooled; GroupKFold by block | AUC > 0.5 (non-directional; Amendments 2 and 3 apply; the ΔAUC incremental row is kept) |
| H3a | Partial Spearman ρ(g(c)_P, dK_F \| dK_P, K_pivot), pivots 2021 and 2023 pooled | ρ < 0 (ordering) |
| H3b | Partial Spearman ρ(dK_P, g(c)_F \| g(c)_P, K_start(P)) | ρ < 0 (ordering) |
| H3c | Spearman ρ(g(c)_W, dK_W), W1–W3 pooled | ρ < 0 |

Approximate n: cross-section 143 / 99 (H1a/H1b about 130 / 65); H3a/H3b 286 / 198; H2 and H3c
429 / 297. Pooled rows count area-windows, and the block bootstrap resamples whole blocks with all
their windows. All P354 §5.2 secondary rows that are defined at this grain are carried over. The
domain-level H1/H2 and the population-weighted stock rows are kept. The thesis-era fidelity check
and the BZR-grain H1 row are dropped, because the matched panel *is* BZR grain.

### 6.2 Inference: spatial block bootstrap

**Why the P354 cluster bootstrap cannot carry over.** At matched grain the natural cluster above
the unit is the Bezirk: 12 in Berlin and 7 in Hamburg. A cluster bootstrap or cluster-robust
inference with 7–12 clusters has poor coverage (Cameron, Gelbach & Miller 2008; MacKinnon & Webb
2017). The wild cluster bootstrap would partly fix coverage for regression coefficients, but it
does not extend naturally to rank correlations and out-of-fold AUC. Treating BZR/Stadtteile as
independent ignores spatial autocorrelation in K and in OA. That autocorrelation is known to be
strong in both cities, and it would make iid CIs anti-conservative.

**Choice: spatial block bootstrap with data-independent contiguous blocks.** This is the spatial
analogue of the moving-block bootstrap (Künsch 1989; Lahiri 2003, ch. 12, "spatial block
bootstrap"). It is also the standard device for spatially structured cross-validation (Roberts et
al. 2017; Valavi et al. 2019, `blockCV`).

- **Blocks:** k-means (scikit-learn, `n_init = 10`, `random_state = 42`) on the projected centroids
  of the matched units (EPSG:25833 Berlin, EPSG:25832 Hamburg). The centroids are computed from
  geometry only. **G = 24 per city.** Mean block area is 37 km² in Berlin and 31 km² in Hamburg, so
  the two cities get **near-equal block footprints** and equal resampling granularity. Blocks hold
  about 6 BZR or about 4 Stadtteile. G ≥ 20 keeps the P354 `min_clusters = 20` rule. The block
  assignment is computed once per city, sorted by area code, and written to the metadata. The PLR
  and Gebiet children inherit their parent's block (for MAUP, §6.5).
- **Block-size justification:** a block footprint of about 5–6 km across is set to exceed the range
  over which neighbourhood status is autocorrelated beyond adjacent units. As a pre-registered
  diagnostic, the global Moran's I of the H3 residuals is computed on queen weights (ADR-0010
  §5, `esda`, `permutations = 999`, `seed = 42`; this is #365 applied to the matched panel), as well
  as the Moran's I between block-mean residuals. If the second is significant at 5%, the blocks are
  judged too small, and the G = 16 sensitivity is promoted into the findings text (verdicts still
  come from G = 24).
- **CIs and p:** percentile CI, B = 1999, seed = 42. The two-sided bootstrap p is as in P354 §5.3,
  floored at 1/(B+1). AUC rows: out-of-fold predictions once with GroupKFold over blocks, then the
  (prediction, label, block) triples are resampled.
- **Sensitivities (reported, cannot change a verdict):** G = 16, G = 36, an iid unit bootstrap, and
  a **Bezirk cluster bootstrap** (12 / 7 clusters, flagged "too few clusters for reliable
  coverage", reported only to show how far the coarse-cluster answer differs).

**Alternatives considered.** (a) A **label permutation test** within a city does not preserve the
spatial dependence under the null unless it is restricted (toroidal or spin tests; Alexander-Bloch
et al. 2018). Restricted spatial permutations on irregular polygons are not established for
partial rank correlations, so this was rejected as the primary. (b) **Spatial error models**
(`spreg`) give model-based SEs, but they assume a linear Gaussian process on rank-ordered or binary
outcomes, which conflicts with P354 §5.3. (c) A **Moran eigenvector** filter changes the estimand.
The block bootstrap keeps every P354 estimator unchanged and changes only the resampling unit.

### 6.3 City × hypothesis interaction test (new; family X8)

For each hypothesis h:

- **Δ_h = θ_BER,h − θ_HH,h**, with θ the matched primary estimate (ρ or AUC).
- The two cities are independent samples. Δ*_b = θ*_BER,b − θ*_HH,b is computed from **independent**
  block-bootstrap draws in each city (B = 1999; the two cities' streams are seeded 42 and 43 so the
  draws are not paired by index).
- p_Δ = 2·min(P*(Δ* ≤ 0), P*(Δ* ≥ 0)), floored at 1/(B+1). Percentile 95% CI.
- **BH across the 8 Δ** at q = 0.05 (family X8). `p_holm` is reported.
- **Verdict:** **DIFFERS** if p_BH < 0.05; **NO DIFFERENCE DETECTED** otherwise; **NO DATA** if either
  city's primary is NO DATA.
- **MDD** = 2.8 × the bootstrap SE of Δ (80% power, two-sided α = 0.05, normal approximation;
  Cohen 1988). It is printed in every interaction row and in the side-by-side table. A NO DIFFERENCE
  DETECTED with an MDD above 0.30 (ρ) or 0.10 (AUC) carries "too imprecise to say the cities
  agree".
- **Reading rules (binding):** DIFFERS states only that the within-city association differs at the
  harmonised construct and the matched grain. It does **not** say that the processes differ: the
  indicator scopes (§3.2), OSM density (§2.4) and shock incidence (§4.4) all differ. "Same verdict
  in both cities" is **never** shown as agreement unless X8 says NO DIFFERENCE DETECTED **and** the
  MDD is at most 0.30 / 0.10. Even then it reads "no difference detected", never "the same".
- For non-directional AUC rows, Δ compares discrimination, not direction. Below-chance AUCs are
  kept in Δ as estimated, and the row notes Amendment 3.

**Rejected:** a pooled model with a city × predictor interaction term. The two cities' K and OA are
standardised separately, so a pooled rank model would mix two scales. A Fisher-z test on ρ assumes
iid units. The difference of block-bootstrap distributions needs neither assumption.

### 6.4 Power (stated up front)

At n ≈ 130 vs 65 (H1a/H1b), SE(Δρ) ≈ √(1/130 + 1/65) ≈ 0.15 before the design effect, so MDD ≈ 0.42.
For the H3 pooled rows (286 vs 198), MDD ≈ 0.26 before the design effect. **X8 can detect only large
city differences.** The findings must say this in the first paragraph of the comparison section.

### 6.5 MAUP sensitivity

The full design (K, OA, all 8 primaries, X8) is re-run at **Berlin PLR (`lor_2021`) and Hamburg
Gebiet**, using the matched-grain blocks (children inherit them). Reported per hypothesis:
θ_fine, θ_matched and their difference. Expected and to be stated in advance: at Gebiet grain,
Hamburg H1/H2 lose all commercial features (355-domain-signoff §2), so the fine-grain H1/H2 rows
are "not comparable" there. That is a MAUP finding in its own right: **the measurability of the
business mix is grain-dependent.** A matched-grain verdict whose sign reverses at the fine grain is
flagged "grain-dependent (MAUP)". A further check (Berlin only, reported): BZR vs PGR for H1a–c and
H3c (Openshaw 1984; Fotheringham & Wong 1991).

### 6.6 Verdicts and "Holds?"

`verdict()` is unchanged. The P354 §5.6 mapping applies, including Amendments 2 and 3. Berlin
matched uses "Holds?". Hamburg matched uses "Matches Berlin 2018?". The thesis column carries
words only (355-domain Addendum).

---

## 7. New hypotheses (pre-registered before any result)

Selection criteria: (i) each is grounded in published theory; (ii) each is testable with existing
sources at matched grain **in both cities**; (iii) none uses displacement or "pressure" wording
(#358); (iv) none needs a new data source.

### 7.1 N1: level-conditional commercial precedence (from (a); CONFIRMATORY)

- **Wording:** "Among neighbourhoods with above-median disadvantage at the pivot, a relative growth
  of the commercial offering precedes a relative decline in officially measured disadvantage."
- **Estimator:** the H3a partial Spearman ρ(g(c)_P, dK_F | dK_P, K_pivot), restricted to units with
  K_pivot above the city's median (pivots 2021 and 2023 pooled; n ≈ 143 / 99 unit-pivots).
  Secondary (exploratory): the stratum difference ρ_above − ρ_below with its block-bootstrap CI.
- **Expected sign:** ρ < 0.
- **Why:** the invasion–succession model places commercial upgrading and the following status change
  in initially low-status, inner-city areas (Dangschat 1988). Berlin's gentrification hotspots were
  initially disadvantaged areas (Döring & Ulbricht 2016). A pooled H3a dilutes this effect with
  high-status areas, where it is not expected. It also refines the P354 §5.2 level-stratified
  exploratory row: the matched panel pre-registers it as a directional test with a fixed, symmetric
  cut (the median of K, the same rule in both cities). P354 used class-based cuts that were not
  comparable between the cities.
- **Thesis link:** H3a (✗ in 2018) tested unconditionally.

### 7.2 N2: café-to-fast-food ratio as an early signal (from (c); CONFIRMATORY)

- **Wording:** "A relative rise in cafés against fast-food outlets in a neighbourhood's gastronomy
  precedes a relative decline in officially measured disadvantage."
- **Variable:** r_E = ln((Cafe_E + 0.5) / (FastFood_E + 0.5)), from the matched-grain stocks. The
  continuity correction is the standard empirical-logit one (Cox 1970). The change is Δr_P over the
  pivot window. Only units that pass the Gastronomy base at both ends of P are included.
- **Estimator:** partial Spearman ρ(Δr_P, dK_F | dK_P, K_pivot), pivots pooled.
- **Expected sign:** ρ < 0.
- **Why:** it combines the thesis's own H1a and H1b signals (Papachristos et al. 2011, café growth as
  a marker of neighbourhood change; Pearce et al. 2007, fast food and deprivation) into one
  within-domain ratio. Glaeser, Kim & Luca (2018) show that changes in café presence (Yelp,
  Starbucks entries) lead local housing-price and composition changes in US cities. A ratio
  *within* Gastronomy cancels the gastronomy-wide mapping completeness (C5) and the pandemic
  gastronomy shock to first order. That makes it more robust than a café-share growth. P354 §5.2
  ran a café-growth cross-lag only as exploratory (R4).
- **Wording guard:** fast food is a category of outlets, not of people. The H1b anti-stigmatisation
  wording (R3) applies. The döner/kebab-excluded variant is a sensitivity if the taxonomy carries it.

### 7.3 N3: neighbourhood commercial-change spillover (from (b); EXPLORATORY)

- **Wording:** "Relative commercial growth in adjacent neighbourhoods precedes a relative decline in
  a neighbourhood's officially measured disadvantage, beyond its own commercial growth."
- **Variable:** Wg(c)_P, the spatial lag of g(c)_P on **row-standardised queen contiguity** of the
  matched units (ADR-0010 §5; k = 4 nearest neighbours as the fallback for islands and
  disconnected units, which matters for the Hamburg Elbe islands). Built with `libpysal` from WKB,
  with no new dependency.
- **Estimator:** partial Spearman ρ(Wg(c)_P, dK_F | g(c)_P, dK_P, K_pivot), pivots pooled.
- **Expected sign:** ρ < 0.
- **Why exploratory:** the spatial lag smooths over the same neighbours that the block bootstrap
  keeps together, so its inference is the least tested in this design. With about 4 neighbours per
  unit it is also collinear with the unit's own growth. Its role is to show whether a
  neighbourhood's own change is the right unit at all. Theory: upgrading spreads from adjacent,
  already-upgraded areas (Guerrieri, Hartley & Hurst 2013, endogenous gentrification); the spatial
  lag operationalisation follows Anselin (1988).

### 7.4 Rejected: (d) protection-zone timing

The existing sources were checked read-only:
- Hamburg `stg_hamburg_displacement_zones` has 16 soziale Erhaltungsverordnungen. Only **2 came into
  force within the matched windows** (Altona-Nord 2019-06, Eilbek 2020-01). 3 came into force in
  July 2025, after the last window, and 11 before 2019.
- Berlin `int_berlin_milieuschutz_event_panel` has about 300 PLR designation events 2013–2026.

A timing test is therefore **not testable in Hamburg**, so it cannot be a matched comparison. In
addition, designation is selected on the very outcome (the §172 BauGB criteria require evidence of
upgrading potential), which makes any "before/after" reading confounded by design. And the topic
pulls the wording towards displacement (#358). Berlin-only timing stays with the Milieuschutz work
(ADR-0019). It is out of E1c's scope. The protection status is reported only as a **descriptive
context column** (the share of each matched unit's population under protection in 2024).

### 7.5 Families and multiplicity

- **N-family (confirmatory):** N1 and N2, per city, with BH within the 2 (q = 0.05). They are kept
  separate from T8, so the thesis family stays comparable with P354.
- **N1/N2 city differences:** Δ as in §6.3, reported as exploratory (uncorrected). N3 and its Δ are
  exploratory.
- **Verdict mapping for N1/N2:** SUPPORTED / CONTRADICTED / NOT SIGNIFICANT / NO DATA, with the
  effect label. There is no thesis column (they are new). CONTRADICTED wording: "commercial growth
  was followed by a relative rise in measured disadvantage".

---

## 8. Determinism and leakage guards

Carried over from P354 §5.7–5.8, plus:

1. **Construct disjointness (extended):** the predictor/control allow-list for `panel = matched` is
   OA, g(c), Δr, Wg(c), K and dK only. Hamburg annex indicators (`stg_hamburg_sozialmonitoring_indicators`)
   may appear only in K/dK or in context rows, **never as predictors** (R-A1). HH S1 and S7 never
   enter K (asserted by column name).
2. **Temporal order:** for H2, H3a, H3b, N1–N3, the predictor window end is ≤ the outcome window
   start (asserted from the carried snapshot years). The aggregation weights date from the outcome's
   own reference date, never later. The Berlin 2019 backcast uses only MSS 2021 inputs.
3. **Blocks and folds from geometry only:** k-means sees centroids, never outcomes. No unit's block
   appears in both training and test folds (asserted).
4. **Feature list from flags only:** the common list is computed before any outcome is loaded and is
   written to the metadata.
5. **Balanced panel asserted:** every matched unit has the same set of children in all four editions.
6. **Existing results unchanged:** every row of the existing `BER/*` and `HH/*` panels is
   value-identical in its existing columns before and after the matched panel is added (test). Two
   consecutive runs give a byte-identical CSV. Every SQL load ends in `ORDER BY`. SEED = 42 (Hamburg
   stream 43 for X8 only), N_BOOT = 1999.

---

## 9. Outputs

### 9.1 Results CSV rows (`docs/epic-e/thesis-hypothesis-suite-results.csv`, `panel = matched`)

The P354 §7.1 columns are kept with these values:

| Column | Matched-panel value |
|---|---|
| `city` | `BER`, `HH`, or **`BER-HH`** for interaction rows |
| `panel` | `matched` |
| `window` | `2025` (cross-section), `2019-2025` (pooled), or a single window for per-window rows |
| `pivots` | `2021;2023` |
| `hypothesis` | `H1` … `H3c`, `N1`, `N2`, `N3` |
| `role` | `primary` (T8 and N-family), `interaction` (X8), `secondary`, `sensitivity`, `exploratory`, `context`, `validity` |
| `grain` | `ber_bzr_2021`, `hh_stadtteil`; MAUP rows `plr_2021`, `hh_gebiet` |
| `cluster_unit` | `spatial_block_k24` (sensitivities: `_k16`, `_k36`, `iid`, `bezirk`) |
| `n`, `n_clusters` | units (or unit-windows), blocks |
| `estimate`, `ci_low`, `ci_high` | θ; for `BER-HH` rows, Δ = θ_BER − θ_HH |
| `p_boot`, `p_bh`, `p_holm` | BH within T8, N-family or X8, as the row's family |
| `verdict` | as P354; for interaction rows `DIFFERS` / `NO DIFFERENCE DETECTED` / `NO DATA` |
| `holds` | §6.6; empty for N rows and interaction rows |
| `outcome` | `K_harmonised_core3_2025`, `dK_harmonised_core3` (or `_core2`) |

New columns, **appended at the end** (empty for existing rows; see maintainer call M1):
`family` (`T8` / `N` / `X8` / `none`), `status_construct` (`harmonised_core3` / `harmonised_core2` /
`own_index`), `estimate_ber`, `estimate_hh` (on interaction rows), `mdd`, `n_blocks`,
`definition_fallback` (§4.3, boolean), `flags` (semicolon-separated: `small_units_flip`,
`core2_flip`, `maup_flip`, `mapping_driven`, `w2_only`, `amendment3_below_chance`).

### 9.2 Findings file (generated, never hand-edited)

`docs/epic-e/E1c-matched-comparison-findings.md` contains:

1. A first paragraph with what is matched, what is not (§1), and the power statement (§6.4).
2. **The side-by-side table** (the headline):

   | # | Hypothesis | 2018 thesis | Berlin matched | Hamburg matched | City difference tested |
   |---|---|---|---|---|---|
   | H1 … H3c | wording | words only | verdict, effect, Holds? | verdict, effect, Matches Berlin 2018? | DIFFERS / NO DIFFERENCE DETECTED, Δ [CI], MDD |

   followed by an N1–N3 table without the thesis column.
3. The K validity check (§3.6), the Hamburg z-to-share recovery checks (§3.3) and the Berlin
   backcast check (§4.2).
4. Grain distributions (§2.1) and the min-base table (§5).
5. Sensitivities: G = 16/36/iid/Bezirk, the small-unit trim, core-2, z-change dK, per-window rows,
   MAUP (fine grain and PGR), and the Moran's I diagnostic.
6. Context: HH S1/S7 correlations with K and with the H1a/H1b OA; protection-zone shares.
7. The shock disclosure (§4.4), the construct gaps (§3.2), the BH/Holm note, the count of
   exploratory rows with the number expected by chance, and a deviations section.
8. A reconciliation with the P354 panels. Where a matched verdict differs from the BER/modern or
   HH/full verdict, it states which of grain, construct or window was changed. It must not imply
   that the earlier results were wrong.

### 9.3 Wiring

CLI `--panel matched` (city-less: it runs both cities and X8). Tests extend
`tests/analysis/test_thesis_hypothesis_suite.py`: z-to-share recovery on a synthetic sheet; the
population-weighted aggregation; block determinism; independent-stream Δ with a known difference →
DIFFERS and with none → NO DIFFERENCE DETECTED; every new §8 invariant fires on a crafted violation;
existing-row invariance.

---

## 10. What E1c must not claim

- "The cities differ in how gentrification works." (DIFFERS is about an association on a
  harmonised construct; §6.3.)
- "The cities are the same." (Never; at most "no difference detected", with the MDD.)
- Anything about displacement, "pressure" or protection-zone effects (#358, §7.4).
- Cross-city comparisons of OA levels or K levels (§2.4, §3.2.4).
- That Hamburg migration background or school leaving explain any result (context only, no test).
- Every P354 §9 item.

---

## 11. Maintainer calls needed

- **M1: CSV schema.** Append new columns to the shared results CSV, leaving the old rows' values
  unchanged but their bytes changed by empty cells? Or write a separate
  `docs/epic-e/matched-comparison-results.csv` with the superset schema? **Recommendation:** a
  separate CSV, which keeps the existing file byte-identical and the page queries simple.
- **M2: ADR-0014 amendment** (annex indicator ingestion) must be approved before anything runs.
- **M3: Berlin EWR 2022 gap.** Accept PLR-mean interpolation of 2020/2024 for the 2022 aggregation
  weights, or ingest the EWR 31.12.2022 release (an existing source; DE work only)?
  **Recommendation:** ingest 2021–2023 if available; interpolation only as the fallback.
- **M4: Hamburg small Stadtteile.** Keep all 99 in the primary with the ≥ 5,000 trim as sensitivity
  (recommended), or make the trimmed panel primary.

---

## 12. References

- Alexander-Bloch, A. F. et al. (2018). On testing for spatial correspondence between maps of human
  brain structure and function. *NeuroImage* 178.
- Anselin, L. (1988). *Spatial Econometrics: Methods and Models.* Kluwer.
- Bundesagentur für Arbeit, Statistik (2022). Rechtskreiswechsel ukrainischer Geflüchteter in die
  Grundsicherung (SGB II) zum 1. Juni 2022 — Methodenhinweise.
- Cameron, A. C., Gelbach, J. B. & Miller, D. L. (2008). Bootstrap-based improvements for inference
  with clustered errors. *Review of Economics and Statistics* 90(3).
- Cohen, J. (1988). *Statistical Power Analysis for the Behavioral Sciences*, 2nd ed.
- Cox, D. R. (1970). *The Analysis of Binary Data.* Methuen.
- Dangschat, J. (1988). Gentrification: Der Wandel innenstadtnaher Wohnviertel. *KZfSS Sonderheft 29*.
- Döring, C. & Ulbricht, K. (2016). Gentrification-Hotspots und Verdrängungsprozesse in Berlin.
- Fotheringham, A. S. & Wong, D. W. S. (1991). The modifiable areal unit problem in multivariate
  statistical analysis. *Environment and Planning A* 23(7).
- Glaeser, E. L., Kim, H. & Luca, M. (2018). Nowcasting gentrification: using Yelp data to quantify
  neighborhood change. *AEA Papers and Proceedings* 108.
- Guerrieri, V., Hartley, D. & Hurst, E. (2013). Endogenous gentrification and housing price dynamics.
  *Journal of Public Economics* 100.
- Helweg, D. (2018). *Untersuchung von Gentrifizierung am Beispiel Berlin mittels Big Data Analytics.*
  Masterarbeit, Universität Hamburg, §4.5, §6.3.
- Künsch, H. R. (1989). The jackknife and the bootstrap for general stationary observations. *Annals
  of Statistics* 17(3).
- Lahiri, S. N. (2003). *Resampling Methods for Dependent Data.* Springer (ch. 12, spatial data).
- MacKinnon, J. G. & Webb, M. D. (2017). Wild bootstrap inference for wildly different cluster sizes.
  *Journal of Applied Econometrics* 32(2).
- Openshaw, S. (1984). *The Modifiable Areal Unit Problem.* CATMOG 38.
- Papachristos, A. V. et al. (2011); Pearce, J. et al. (2007). As cited by the thesis for H1a/H1b.
- Roberts, D. R. et al. (2017). Cross-validation strategies for data with temporal, spatial,
  hierarchical, or phylogenetic structure. *Ecography* 40(8).
- SenSBW, *Monitoring Soziale Stadtentwicklung* 2019–2025, Indikatorenblätter (S1, S3, S4; #360).
- Freie und Hansestadt Hamburg, BSW, *Sozialmonitoring Integrierte Stadtteilentwicklung*, Berichte und
  Anhänge 2019–2025 (dl-de/by-2.0).
- Valavi, R. et al. (2019). blockCV: an R package for generating spatially or environmentally
  separated folds. *Methods in Ecology and Evolution* 10(2).
- P354 references apply (Benjamini & Hochberg 1995; Benjamini & Yekutieli 2001; Holm 1979; Davis,
  Haltiwanger & Schuh 1996; Hosmer et al. 2013; Parker, Günter & Bedo 2007).

## PM decisions on the open calls (2026-11-02, pre-results)

The maintainer asked for no input except where something blocks. M2 (the ADR-0014 amendment) was put
to the maintainer and **approved** on 2026-11-02. The other calls were not blocking, so the PM took
the recommended option:

- **M1:** matched results go in a **separate** `docs/epic-e/matched-comparison-results.csv`, so the
  existing `thesis-hypothesis-suite-results.csv` stays byte-identical.
- **M3:** Berlin 2022 population weights are **linearly interpolated** between the 2020 and 2024 EWR
  releases. Sensitivity: weights from 2020 only and from 2024 only. Ingesting a 31.12.2022 release was
  not chosen, because the EWR download URLs are currently dead (#346).
- **M4:** the **primary panel keeps all 99 Stadtteile**. Restricting to units with at least 5,000
  residents is a pre-registered sensitivity.
