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
- **Revision 1 (2026-11-02, pre-results):** addresses the domain review
  `docs/methodology/371-preregistration-domain-review.md` (D1–D7 required, R1–R6 adopted). No
  matched-panel statistic existed before or during this revision. The changes are listed in the
  "Revision log" at the end.
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
| Status construct | **Harmonised core K (primary: core-3H, Revision 2)**: unemployment, transfer receipt and child poverty, population-weighted from PLR/Gebiet. **Berlin T is re-based to all recipients including the unemployed** (T\* = count(S3) + count(S1) over all residents, §3.7), which corrects construct gap 5 instead of only disclosing it. The previous mixed construct (core-3M) and U + C (core-2) are sensitivities. Within each city and edition, each indicator is z-scored over the matched units, and K is the mean of the three z-scores. Higher K means more disadvantage. HH migration background (S1) and school leaving (S7) are reported as context only. |
| Hamburg shares | Recovered from the annex z-scores as share = mean + z·SD per edition (`stg_hamburg_sozialmonitoring_indicators`, pending the ADR-0014 amendment). Every rank statistic depends only on the SD; the mean only matters for descriptive levels (§3.3). |
| Windows | Editions **2019, 2021, 2023, 2025** in both cities. Levels as of 31.12.(E−1) in **both** cities (verified, §4.1). Changes are pp differences of **levels** over W1 = [2019, 2021], W2 = [2021, 2023], W3 = [2023, 2025] (OSM snapshot years). Pivots are **2021** and **2023**. The H1 cross-section is edition 2025 × OSM 2025. Published Dynamik classes are not used. |
| Berlin 2019 level | Backcast on `lor_2021`: S_2019 = anteil_2021 − dynamik_2021 (the P354 §3.1 rule). Checked against crosswalked MSS 2019 on `lor_pre2021` (§4.2). |
| POIs | The same commercial basket (Gastronomy, Retail, Services, Entertainment), the ADR-0017 LQ OA (`standard/faithful`), and snapshots 2019/2021/2023/2025, with stocks summed to the matched grain and OA recomputed there. **The H1/H2 feature list is the intersection of the two cities' A1.1 lists.** |
| Inference | **Spatial block bootstrap**: G = 24 contiguous k-means blocks per city on area centroids (EPSG:25833 / 25832), B = 1999, seed 42. The same blocks are the GroupKFold groups for H1/H2. Sensitivities: G = 16 and G = 36, an iid bootstrap, and Moran's I of the residuals (#365). |
| City difference | For each of the 8 hypotheses, Δ = θ_BER − θ_HH from **independent** block bootstraps in each city. Two-sided bootstrap p. BH across the 8 forms its own family. Verdicts: **DIFFERS** / **NO DIFFERENCE DETECTED** / NO DATA. The minimum detectable difference (MDD) is always reported. |
| Stating a city difference (D1, D2, D8; Revisions 2–3) | A city difference is stated publicly only if X8 gives DIFFERS under the primary **core-3H** **and** in the ≥ 5,000-resident panel, **and** under the T-free construct (core-2 if HH S5 excludes AsylbLG, core-1U if it includes it), Δ has the same sign **and** its unadjusted 95% block-bootstrap CI excludes 0 (sensitivity criterion, no BH); **and** its Δ has the same sign under core-3M (sign only, no significance requirement). Otherwise: "differs only under <condition>; not stated as a city difference" (§3.2, §3.7, §6.3). If the §3.7 fallback makes core-3M primary, the same rule applies with core-3M in place of core-3H. |
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

Excluded from K, reported as **context only** (descriptive correlations **with K only**, no verdict;
D4: no correlation of S1 or S7 with any OA, café or fast-food variable is computed or shown): HH S1 Kinder mit Migrationshintergrund, HH S7 Schulabschlüsse, and also HH S2
(single-parent children) and S6 (Mindestsicherung im Alter), which have no Berlin counterpart in
all four editions. Berlin S2 (single-parent children) exists only from 2023 and is excluded for the
same reason.

### 3.2 Known construct gaps (binding text for the findings)

1. **T differs in scope.** Berlin S3 excludes the unemployed and AsylbLG recipients. Hamburg S3
   includes all SGB II recipients and, from 2019, AsylbLG recipients. Hamburg T therefore loads more
   on refugee accommodation and overlaps more with U (gap 5).
2. **C differs in scope.** Berlin S4 counts SGB II only. Hamburg S5 counts "Mindestsicherung",
   which may include SGB XII and AsylbLG. **The DE must confirm the S5 definition from the annex
   notes before the analysis runs.** Every statement in this document about a refugee channel in C
   is **conditional on that finding** (D2).
3. **U denominators differ** (15 to retirement age vs 15–64). The DE confirms whether Hamburg S4
   remains SGB II only in 2023/2025, or whether it changes to SGB II + III (see §4.3).
4. Because K is z-scored within each city, **it ranks units within a city**. A Berlin and a
   Hamburg unit with the same K are not equally disadvantaged.
5. **Hamburg K double-weights unemployment (D1).** Hamburg T (all SGB II recipients) contains the
   SGB II unemployed who are also in U. Hamburg K therefore weights SGB II unemployment about twice;
   Berlin K (S3 = non-unemployed recipients) does not. K means a different mix in each city even
   after within-city z-scoring. On its own this can produce a DIFFERS for any predictor that relates
   differently to unemployment than to non-employment transfer receipt (for example via pensioner or
   single-parent geography). **Revision 2: corrected in the primary** by re-basing Berlin T to all
   recipients (§3.7). Gap 5 remains in force for the core-3M sensitivity and for the §3.7 fallback.

**Sensitivity "core-3M" (Revision 2):** the Revision 1 mixed construct, with Berlin T = S3
(non-unemployed recipients) and Hamburg T = S3 (all recipients). It carries gap 5.

**Sensitivity "core-2":** K without T (U + C only), described as **"without the transfer
indicator"**. It removes the T scope gap and the U double weighting (gap 5). It removes the refugee
channel only if S5 excludes AsylbLG. A verdict or DIFFERS decision that changes under core-2 is
flagged "depends on the transfer indicator".

**Sensitivity "core-1U" (conditional, D2):** if the DE finds that Hamburg S5 includes AsylbLG, a
U-only construct is added for every primary and X8 row. Core-2 is then not described as "without
the refugee channel".

The primary construct and its derivation are in §3.7.

### 3.7 Harmonised transfer construct T\* (Revision 2, maintainer question, pre-results)

**Question.** Can gap 5 be corrected rather than only disclosed? There are two directions: (A) add
the unemployed to Berlin T, or (B) remove them from Hamburg T. Both have to work in **counts**,
because U and T have different denominators.

**Denominators (R-C2).**
- Berlin S1 Arbeitslosigkeit: SGB II unemployed per resident aged **15–<65** (MSS 2019) or **15 to
  the Regelaltersgrenze** (MSS 2021+). Sources: Indikatorenblätter MSS 2019 S. 13; MSS 2021 S. 16 and
  Vorbemerkungen S. 7; MSS 2023 S. 18; MSS 2025 S. 18 (#360 §2).
- Berlin S3 Transferbezug: non-unemployed recipients of SGB II and SGB XII subsistence benefits per
  **resident** (all ages). Sources: MSS 2019 S. 18; MSS 2021 S. 21; MSS 2023 S. 26; MSS 2025 S. 26
  (#360 §2).
- Hamburg S3: SGB II (plus AsylbLG from 2019) recipients; Hamburg S4: Arbeitslose. Both are per the
  Sozialmonitoring annex and Methodenteil of each edition (PA §5). The exact bases have to be
  confirmed by the DE (checks below).

**(A) Berlin → all recipients: CHOSEN.** Per PLR i and edition E:

- N_U,i = S1_i / 100 · P^(U)_i, where P^(U) is the residents aged 15–<65 (edition 2019 backcast:
  see below) or 15 to the Regelaltersgrenze (2021+);
- N_T,i = S3_i / 100 · P_i (all residents);
- **T\*_i = 100 · (N_U,i + N_T,i) / P_i**.

At matched grain the counts are summed before dividing:
**T\*_u = 100 · Σ_i (N_U,i + N_T,i) / Σ_i P_i**, so the population weighting is exact. The base is
all residents, which matches the documented Berlin S3 base and the expected Hamburg S3 base. If the
DE finds that Hamburg S3 uses residents **under 65** as its base, the Berlin base becomes
P^(<65)_i in both the numerator conversion and the division (same formula, different P).

- **Regelaltersgrenze (D9a):** rule: at reference date 31.12.Y, the upper bound is the
  Regelaltersgrenze of the birth cohort that reaches it in year Y, from the § 235 Abs. 2 SGB VI
  table (cohorts 1947–1958: +1 month per cohort; 1959–1963: +2 months). This gives:

  | Reference date | Cohort | Regelaltersgrenze | f = (RAG − 65) / 2 |
  |---|---|---|---|
  | 31.12.2018 | 1953 | 65 y 7 m | 0.292 |
  | 31.12.2020 | 1955 | 65 y 9 m | 0.375 |
  | 31.12.2022 | 1957 | 65 y 11 m | 0.458 |
  | 31.12.2024 | 1958 | 66 y 0 m | 0.500 |

  P^(U) = P(15–<65) + f · P(65–<67). This assumes a uniform age distribution within the published
  65–67 band; the error is at most a fraction of one single-age cohort. (Revision 2 wrote 66 y 2 m /
  0.583 for 2024; that was wrong and is corrected here.)
- **2019 backcast (D9b):** S1_2019 and S3_2019 are backcast on `lor_2021` as anteil_2021 −
  dynamik_2021 (§4.2), i.e. on the **2021 definition** (15 to the Regelaltersgrenze). So N_U,2019 uses
  P(15–<RAG) at 31.12.2018 on `lor_2021`, with f = 0.292, not P(15–<65). The 2019 definition
  (15–<65) applies only to the crosswalked MSS 2019 values in the §4.2 consistency check.
- **Data availability (verified read-only, 2026-11-02).** The raw EWR matrices
  (`data/raw/berlin/ewr/csv/EWR{YYYY}12E_Matrix.csv`, `EWR_L21_{YYYY}12E_Matrix.csv`; Amt für
  Statistik Berlin-Brandenburg, CC BY 3.0 DE, an existing source under ADR-0003/ADR-0007) carry
  single and narrow age bands, including `E_E15_18`, `E_E60_63`, `E_E63_65` and `E_E65_67`, for
  **31.12.2018, 31.12.2020 and 31.12.2024** (and 2025). The warehouse currently stages only coarse
  shares (`age_under18_share`, `age_18_27_share`, …, `age_65plus_share` in `int_berlin_ewr_plr2021`),
  which cannot form 15–<65. So the DE must stage the needed bands. 2018 and 2020 are on `lor_pre2021`
  and go through the existing PLR-2021 crosswalk; 2024 is native `lor_2021`. **31.12.2022 is missing**
  (#346), so it is linearly interpolated per PLR between 2020 and 2024, as under M3, band by band.
  No new source, so no ADR is needed.

**(B) Hamburg → non-unemployed recipients: REJECTED.** T^nu_i = 100 · (S3_i · P_i − S4_i · P^(15–64)_i) / P_i
would need (1) the Gebiet-level 15–64 population, which Hamburg does not publish at Gebiet grain
(the warehouse has total population per Gebiet, and age shares only per Stadtteil, under-18 and 65+
only, in `stg_hamburg_ewr_stadtteil`); (2) Hamburg S4 to be exactly the SGB II unemployed, which is
documented only for the 2019 and 2021 annexes (PA §5); and (3) a subtraction of two rounded,
z-recovered shares, which can turn negative in small Gebiete. A also leaves Hamburg's published
indicators untouched, so the annex recovery checks (§3.3) stay simple.

**Residual differences after A (binding disclosure).** Berlin T\* counts SGB II **and SGB XII**
recipients, and no AsylbLG. Hamburg T counts SGB II **and AsylbLG** (from 2019), and no SGB XII.
So the U double weighting is gone, but the refugee channel (Hamburg) and the older and
disabled-persons channel (Berlin) remain. U and T\* now overlap in **both** cities in the same way
(the unemployed are in both), so the two cities' K weight unemployment alike.

**DE checks (binding before any analysis).**
1. The Hamburg S3 base (all residents or under-65) and the Hamburg S4 base (15–64) are stated per
   edition 2019–2025 from the annex/Methodenteil text, and quoted in the evidence doc.
2. Hamburg S3 counts **all** SGB II recipients (not only the employable), including the unemployed.
   Otherwise gap 5 does not exist and core-3M becomes primary (see fallback).
3. The Berlin S1 base per edition (15–<65 in 2019; 15–Regelaltersgrenze 2021+) and the S3 base (all
   residents) are confirmed from the Indikatorenblätter pages above.
4. The EWR age bands are staged per PLR for 2018, 2020 and 2024 on `lor_2021`. Σ bands = `residents_total`
   per PLR (exact), and the crosswalk keeps the city totals.
5. Plausibility: T\* ≥ S3 and T\* − S3 ≤ S1 in every PLR-edition (because P^(U) ≤ P). The city-level
   T\* is within ±1 pp of the published Berlin SGB II/XII recipient rate, where one is published.
6. The 2022 interpolation is flagged per row.
7. **Regelaltersgrenze per date (D9a):** the DE quotes the § 235 Abs. 2 SGB VI table and confirms the
   four values above (65 y 7 m, 65 y 9 m, 65 y 11 m, 66 y 0 m; f = 0.292 / 0.375 / 0.458 / 0.500). It
   also confirms that the MSS Indikatorenblätter (2021 S. 16; 2023 and 2025 S. 18) use the
   Regelaltersgrenze of the reference date and not a fixed bound. Any deviation is recorded as an
   amendment before results.
(The Hamburg S4 SGB II-only check from §3.2 item 3 stays binding, but under A it matters only for U,
not for T.)

**Fallback.** If the EWR age bands cannot be staged for any of 2018/2020/2024, P(15–<65) is
approximated from the staged coarse shares as P(18–<65) + (3/18) · P(<18), with the Regelaltersgrenze
slice taken as 0, and the row is flagged `t_star_approx`. If even that is not possible, or DE check 2
fails, **core-3M becomes primary again** with gap 5 disclosed, and the Revision 1 statement rule
applies (§0, §6.3).

**Validity.** §3.6 is computed for core-3H (primary) and core-3M. The Berlin level check against
the #354 S composite is no longer near-tautological for core-3H (T\* ≠ S3), so its ≥ 0.90 threshold
becomes informative. A pre-registered descriptive: ρ(T\*, S3) per edition at PLR.

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

The Hamburg threshold is lower because S1 and S7 are deliberately left out. **Reading (R6):** the
Berlin level check compares K with the #354 S composite, which is built from the same three
indicators, so ρ ≈ 1 is expected by construction; a pass there only shows that the aggregation code
is correct. The informative checks are Hamburg K vs Status-summe and K vs each city's own classes
at matched grain. A pass must not be over-read beyond that. If any threshold
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
- **W2 (2020 → 2022):** the bounce-back of pandemic unemployment. Ukrainian refugees arriving from
  March 2022 enter Hamburg T at arrival (AsylbLG is in S3 from 2019). At the 1 June 2022 switch
  (**Rechtskreiswechsel**) Hamburg T is unchanged, while U (and C, if S5 excludes AsylbLG) rise.
  Berlin U, T (non-unemployed recipients only) and C rise from June. Both cities' W2 absorb the
  arrivals; the asymmetry is in which indicator carries them and when within the window. This is a
  reason for the core-2 (and, conditionally, core-1U) sensitivity.
- **Local sites (all windows, mainly W2/W3):** large arrival and accommodation sites, such as the
  Berlin Ukraine arrival centre at the former Tegel airport (from 2022) and Hamburg's central
  initial reception sites, can move K and dK of a whole matched unit. Whether their residents are in
  the population counts is unknown, so this is disclosed, not corrected (P354 §3.4 rule).
- **W3 (2022 → 2024):** **Bürgergeld** (1 January 2023) widens SGB II access and raises the
  protected assets. **Wohngeld-Plus** (2023) moves some low-income households out of SGB II/XII
  into housing benefit, which lowers T and (depending on S5's scope) C. Both are city-wide, but their spatial incidence
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
- **New-build diagnostic (R5), symmetric with the above:** population growth per matched unit over
  each window is reported. A verdict whose sign reverses when the units in the top decile of
  population growth are dropped is flagged "possibly new-build-driven" (HafenCity, Berlin's new
  quarters).

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
  kept in Δ as estimated, and the row notes Amendment 3. **Below-chance rule (D6):** if either
  city's AUC is below 0.5, a DIFFERS on that row reads "differs in transferable discrimination:
  <city> shows none (Amendment 3)", never "the association differs" or "runs the other way". Such a
  row is never stated as a city difference under the robust-DIFFERS rule.
- **Robust-DIFFERS rule (D1, D8; Revisions 2–3):** a city difference may be **stated** (findings
  headline, any public page) only if X8 gives DIFFERS under the primary **core-3H** **and** in the
  ≥ 5,000-resident panel, **and** under the T-free construct (core-2 if HH S5 excludes AsylbLG, core-1U if it includes it), Δ has the same sign **and** its unadjusted 95% block-bootstrap CI excludes 0 (sensitivity criterion, no BH); **and** its Δ has the same sign under core-3M (sign only, no significance requirement). A DIFFERS that fails any condition is reported as "differs only under <condition>; not
  stated as a city difference". The verdicts themselves stay as defined; this rule governs only what
  may be claimed. If the §3.7 fallback makes core-3M primary, the same rule applies with core-3M in
  place of core-3H (DIFFERS under core-3M and in the ≥ 5,000 panel, plus the same T-free criterion).
- **Binding page wording (R7):** wherever a city comparison is shown: "Welfare receipt is measured
  slightly differently in the two cities: Berlin's figure, derived from two published indicators,
  includes social assistance (mainly older and disabled people); Hamburg's includes asylum-seeker
  benefits. A city difference is only stated if it also appears without this indicator."

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
- **Scope disclosure (D7):** above-median K pools inner-city disadvantaged areas, where
  invasion–succession is expected (Dangschat 1988: *innenstadtnahe Wohnviertel*), with peripheral
  large estates, where it is not. A NOT SIGNIFICANT N1 is therefore weak evidence against the
  model. Public wording: "among the more disadvantaged half of neighbourhoods", never "gentrifying
  areas".
- **Exploratory centrality split (R2):** N1 is also reported within the inner and outer halves of
  each city, split at the population-weighted median distance of unit centroids to the city centre
  (Berlin: Alexanderplatz; Hamburg: Rathausmarkt; a city-relative, symmetric rule fixed now).
  Uncorrected, no verdict.

### 7.2 N2: café-to-fast-food ratio change and later status change (from (c); CONFIRMATORY)

- **Wording:** "A relative shift in the gastronomy mix toward cafés precedes a relative decline in
  officially measured disadvantage." This is an ordering test, like H3a. It is **not** a warning,
  forecasting or investment indicator (D5a; §10).
- **Variable:** r_E = ln((Cafe_E + 0.5) / (FastFood_E + 0.5)), from the matched-grain stocks. The
  continuity correction is the standard empirical-logit one (Cox 1970). The change is Δr_P over the
  pivot window. Only units that pass the Gastronomy base at both ends of P are included.
- **Estimator:** partial Spearman ρ(Δr_P, dK_F | dK_P, K_pivot), pivots pooled.
- **Expected sign:** ρ < 0.
- **Component secondaries (D5b, outside every family):** g(café share within Gastronomy)_P and
  g(fast-food share within Gastronomy)_P, each against dK_F with the same controls. They show which
  side of the ratio carries any N2 result. The döner/kebab-excluded variant stays a sensitivity,
  conditional on the taxonomy carrying it (354 R4, OSM `cuisine`).
- **Wording rule (D5b, binding):** N2 is described only as "a shift in the gastronomy mix toward
  cafés", never as "fewer fast-food outlets" (let alone döner). If the fast-food component carries
  the result, the findings state that it may reflect outlet closures, including of owner-run
  outlets, and is not evidence of improvement. The H1b anti-stigmatisation wording (R3) applies.
- **Pivots (D5c):** a ratio *within* Gastronomy cancels the gastronomy-wide mapping completeness
  (C5) to first order. It does **not** cancel the pandemic: during the 2020–21 lockdowns takeaway
  stayed permitted while sit-down cafés closed, and OSM registers closures with uneven lags. So pivot
  2021 (P = W1) is reported separately, with the W1 mechanism named, beside the pooled primary.
- **Why (D5d):** it combines the thesis's own H1a and H1b variables into one within-domain ratio.
  Papachristos et al. (2011) relate coffee-shop growth to gentrification and crime in Chicago.
  Glaeser, Kim & Luca (2018) relate business openings, including cafés and Starbucks, to house-price
  growth in US cities. Pearce et al. (2007) relate fast-food access to deprivation. This literature
  supports café growth as a marker of **market upgrading**; neither café study tests officially
  measured disadvantage. N2 tests whether the shift precedes a fall in measured disadvantage, which
  is a different construct (improvement ≠ gentrification, P354 §9). P354 §5.2 ran a café-growth
  cross-lag only as exploratory (R4).

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
  neighbourhood's own change is the right unit at all. Theory: Guerrieri, Hartley & Hurst (2013) model
  spillover from adjacent **high-status** areas, which is a status gradient. N3 operationalises the
  general diffusion idea with neighbours' commercial change instead (R3). The spatial lag
  operationalisation follows Anselin (1988).

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
context column** (the share of each matched unit's population under protection in 2024). **No association of
this column with K, dK, OA or any N row is computed or shown (R4)**: the §7.4 reasons apply to a
correlation as much as to a timing test.

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
| `outcome` | `K_harmonised_core3h_2025`, `dK_harmonised_core3h` (sensitivities `_core3m`, `_core2`, `_core1u`) |

New columns, **appended at the end** (empty for existing rows; see maintainer call M1):
`family` (`T8` / `N` / `X8` / `none`), `status_construct` (`harmonised_core3h` / `harmonised_core3m` / `harmonised_core2` / `harmonised_core1u` /
`own_index`), `estimate_ber`, `estimate_hh` (on interaction rows), `mdd`, `n_blocks`,
`definition_fallback` (§4.3, boolean), `flags` (semicolon-separated: `small_units_flip`,
`core3m_flip`, `core2_flip`, `core1u_flip`, `t_star_approx`, `ewr_2022_interpolated`, `maup_flip`, `mapping_driven`, `newbuild_driven`, `w2_only`,
`amendment3_below_chance`, `not_stated_city_difference`).

### 9.2 Findings file (generated, never hand-edited)

`docs/epic-e/E1c-matched-comparison-findings.md` contains:

1. A first paragraph with what is matched, what is not (§1), the power statement (§6.4), the
   robust-DIFFERS rule (§6.3), and the scale caveat (R1): "the matched units (15–26k residents) are
   coarser than the scale at which gentrification is usually observed, so a null here does not rule
   out a neighbourhood-scale process".
2. **The side-by-side table** (the headline):

   | # | Hypothesis | 2018 thesis | Berlin matched | Hamburg matched | City difference tested |
   |---|---|---|---|---|---|
   | H1 … H3c | wording | words only | verdict, effect, Holds? | verdict, effect, Matches Berlin 2018? | DIFFERS / NO DIFFERENCE DETECTED, Δ [CI], MDD |

   followed by an N1–N3 table without the thesis column.
3. The K validity check (§3.6), the Hamburg z-to-share recovery checks (§3.3) and the Berlin
   backcast check (§4.2).
4. Grain distributions (§2.1) and the min-base table (§5).
5. Sensitivities: G = 16/36/iid/Bezirk, the small-unit trim, core-3M, core-2 (and core-1U if triggered),
   z-change dK, per-window rows, the N2 components and pivot 2021, the N1 centrality split, the
   new-build diagnostic (R5),
   MAUP (fine grain and PGR), and the Moran's I diagnostic.
6. Context: HH S1/S7 correlations **with K only** (D4); protection-zone shares, unlinked (R4).
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
- That Hamburg migration background or school leaving explain any result (context only, no test;
  no S1/S7 × OA correlation exists, D4).
- **N2 is not an early-warning or investment signal** (D5a). N2 is never worded as "fewer fast-food
  outlets".
- N1 results are never about "gentrifying areas" (D7).
- A city difference that fails the robust-DIFFERS rule (§6.3, D1), or an AUC difference involving
  a below-chance city (D6), stated as a city difference.
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

---

## Revision log

**Revision 1 (2026-11-02, pre-results): domain review D1–D7 and R1–R6.** No matched-panel
statistic had been computed. The DB was not reopened for this revision.

| Item | Change |
|---|---|
| D1 | §3.2 gap 5 (Hamburg K double-weights SGB II unemployment); robust-DIFFERS rule in §6.3; §9.2(1), §10 |
| D2 | Every C refugee-channel statement conditional on the S5 definition (§3.2, §4.4); conditional core-1U sensitivity; core-2 described as "without the transfer indicator" |
| D3 | W2 shock text replaced; large arrival/accommodation sites disclosed (§4.4) |
| D4 | S1/S7 × OA context correlations removed (§3.1, §9.2, §10); S1/S7 correlate with K only |
| D5 | N2 retitled, "early signal" framing removed; component secondaries and wording rule; pandemic claim corrected, pivot 2021 reported separately; citations corrected (§7.2, §10) |
| D6 | Below-chance AUC reading rule for Δ (§6.3) |
| D7 | N1 scope disclosure and public wording (§7.1) |
| R1–R6 | All adopted: scale caveat (§9.2); N1 centrality split (§7.1); N3 citation (§7.3); protection-zone column unlinked (§7.4); new-build diagnostic (§5); §3.6 reading note |

Geo-DS agrees with every D item, so there is no "Geo-DS response" section.

**Revision 2 (2026-11-02, maintainer question, pre-results): correcting construct gap 5.** No
matched-panel statistic had been computed. The DB was opened read-only for data availability only
(EWR age fields, Hamburg age fields); no outcome was joined to a predictor.

| Item | Change |
|---|---|
| Primary construct | New §3.7: Berlin T re-based to all recipients, T\* = (count S3 + count S1) / all residents, aggregated as count sums (direction A). The primary becomes **core-3H**; the Revision 1 mixed construct (**core-3M**) and **core-2** become sensitivities. |
| Direction B | Rejected: no Gebiet-level 15–64 population in Hamburg, Hamburg S4 SGB II-only documented for 2019/2021 only, and negative differences are possible. |
| Data | Raw EWR matrices carry the age bands 15–18, 63–65, 65–67 for 2018/2020/2024. They must be staged (existing source, no ADR); 2022 is interpolated (M3). |
| DE checks | Six binding checks (§3.7). The fallback is coarse-band approximation, then core-3M primary. |
| Statement rule | §0 and §6.3: DIFFERS under core-3H and in the ≥ 5,000 panel, same sign under core-3M and core-2, plus core-1U if triggered; the Revision 1 rule if the fallback applies. |
| Gap 5 | §3.2: corrected in the primary; still disclosed for core-3M and the fallback. Residual SGB XII vs AsylbLG difference disclosed. |

**Revision 3 (2026-11-02, domain re-check D8/D9, pre-results).** No matched-panel statistic had been
computed, and the DB was not opened for this revision.

| Item | Change |
|---|---|
| D8 | §0 and §6.3: one standard for the transfer-free check. Under the T-free construct (core-2 if HH S5 excludes AsylbLG, core-1U if it includes it), Δ has the same sign and its unadjusted 95% block-bootstrap CI excludes 0 (sensitivity criterion, no BH). The core-3M same-sign condition is kept (sign only). The fallback rule uses the same reading with core-3M as primary. |
| D9a | §3.7: Regelaltersgrenze at 31.12.2024 corrected to 66 y 0 m (cohort 1958, f = 0.500). The rule and all four per-date values are stated; DE check 7 added. |
| D9b | §3.7: the 2019 backcast is on the 2021 definition, so it converts with 15–<RAG at 31.12.2018 (65 y 7 m, f = 0.292). |
| R7 | Public sentence adopted verbatim as binding page wording (§6.3). |
| R8 | Not adopted. Hamburg publishes no 65+ population per Gebiet, so S6 cannot be converted to counts at the grain where T is formed. The Stadtteil-level approximation would add a construct the D8 T-free check already protects against. |

**Amendment 4 (pre-results, 2026-11-05): LOR crosswalk artefact, one Berlin population series,
data-phase notes.** No matched-panel statistic had been computed. The DB was opened read-only to
verify the per-PLR population figures that the data checks report (`docs/epic-e/371-data-checks.md`
§4.4); no outcome was joined to a predictor. Amendment 4 is listed in this log but binds as part of
the pre-registration. Anything it does not change stays as written above.

*A4.1: Areal crosswalk (data checks §4.4).* `seed_lor_crosswalk_2006_to_2021` is labelled
`areal_pop_weighted` but uses purely areal weights. About 10,100 residents in 2018 and 2020 (about
5,000 in the interpolated 2022) land on 03400831 Pankower Tor and 06200418 Landweg, which are
uninhabited in 2024/2025. Verified: 03400831 has 6,295 residents in 2020 and 0 in 2024; 06200418
has 3,801 and 0; 06200419 Thermometersiedlung has 1,081 and 4,539.

- **Matched BZR grain (primary): unchanged, disclose plus one sensitivity.** BZR totals are
  correct, because both source PLRs keep ≥ 99.9 % of their weight inside the same BZR. Neither
  phantom PLR has MSS values, so neither is a balanced child. The artefact therefore only shifts
  *relative* weights among the balanced children of BZR 034008 and 062004 (2 of 143). It affects
  the 2019 and 2021 levels fully and the 2023 level by half. This is a bounded re-weighting inside
  two units, not a level error. Correcting it in the primary would mean changing a signed seed for
  two units, which is not proportionate.
- **New sensitivity "W24" (extends M3).** All Berlin editions (2019, 2021, 2023, 2025) use the
  native 31.12.2024 weights from `int_berlin_ewr_age_bands_plr2021` (`residents_total`,
  reference_year 2024). This applies both to the §3.4 aggregation weights and to the T\* conversion
  factor P^(U)/P in §3.7. W24 replaces the M3 "2024 only" sensitivity: for 2023 the two are the same,
  and W24 extends it to 2019/2021. The M3 "2020 only" sensitivity stays. W24 is reported for every
  primary and for X8, at both grains, as exploratory and uncorrected (§7.5). Reading rule: if a
  matched-grain verdict changes under W24, the row is flagged "weight-sensitive (LOR 2019→2021
  crosswalk)". Because W24 also absorbs genuine 2018–2024 population change (new-build quarters),
  a flag is not attributed to the artefact alone.
- **Dropping the two BZRs is not pre-registered.** W24 covers them and every other split, and a
  separate drop rule would add a forking path without new information.
- **PLR/Gebiet grain (§6.5): no new model; disclose.** At PLR grain, population does **not** enter
  the aggregation: the units are the MSS PLRs themselves, z-scores are unweighted (§3.4), and OA
  depends on POIs only. Population enters only (i) through the ratio P^(U)/P in T\*, which is an
  area-weighted mix of old-PLR age structures and therefore much less distorted than counts
  (data checks §4.4; P^(U)/P range 0.465–0.867), and (ii) through any population threshold. The
  "102 of 540 PLRs > 25 % off" figure concerns counts, which the PLR rows do not use. So the PLR rows
  are not misleading, and a dasymetric crosswalk (Eicher & Brewer 2001; Mennis 2003) is **not** built
  for #371. The question stays open for any future use of crosswalked 2018/2020 Berlin *counts* at
  PLR grain. W24 also runs at PLR grain, where it replaces P^(U)/P with the 2024 ratio.
- **Population thresholds** (for example the ≥ 5,000 panel, if it is applied to Berlin units) use
  native 31.12.2024 population for Berlin.
- **Binding disclosure** (methods note of the results and findings files; DE writes it verbatim):
  "Berlin populations for 31.12.2018 and 31.12.2020 are mapped from LOR 2019 to LOR 2021 by area
  share, not by population. About 10,100 residents (0.27 %) are assigned to two areas that are
  uninhabited in 2024. This shifts the weights inside 2 of 143 Bezirksregionen; Bezirksregion totals
  are unaffected. Sensitivity W24 uses 2024 populations throughout."

*A4.2: One Berlin population series (data checks §4.3).* **Single P:** `residents_total` from
`int_berlin_ewr_age_bands_plr2021` is the only Berlin population series of the matched analysis.
It is used for the §3.4 weights, for the T\* base P and P^(U) (§3.7), for W24 and for thresholds.
This replaces the reference to `int_berlin_ewr_plr2021` in §3.4. `int_berlin_ewr_plr2021` is not
read by the matched analysis. That also removes the risk of a failed join on its 2024 code
`06200318` (data checks §6 item 5).

**Renormalisation accepted.** Per old PLR, the seed weights sum to 0.9993–1.0000. The shortfall is
rounding in the areal intersection, not a real allocation. Rescaling to 1 is the
volume-preserving (pycnophylactic) requirement of areal interpolation (Tobler 1979; Goodchild & Lam
1980). It keeps city totals and band totals exact and moves no PLR by more than 0.07 %. Taking P and
P^(U) from one model also guarantees P^(U) ≤ P by construction. Implementation: the existing warn
test `test_371_ewr_age_bands_vs_ewr_plr2021` (≤ 0.1 %) stays; the analysis code asserts that it
reads only the band model for Berlin population.

*A4.3: Other data-phase notes.*
- **Hamburg descriptive levels.** The annex mean row is an unweighted Gebiet mean. City-level
  descriptive levels are shown for both cities **population-weighted** over the matched units, from
  share × population (Hamburg) and the A4.2 P (Berlin), so the two are comparable. Wherever the
  annex mean row itself is quoted, it is labelled "unweighted mean over scored Gebiete". K, z and all
  hypothesis statistics are unaffected (§3.4 already weights by population).
- **Balanced Hamburg panel: 849 Gebiete**, adopted as the §2.3 child set. The 8 scored-2025
  Gebiete that drop out (10 ever scored) are listed by ID in the methods note. This is within the
  pre-registered expectation (< 10).
- **HH S4 SD rounding** (3 decimals in the matched editions): disclose only. Within an edition, a
  uniform scale error on recovered shares cancels in the z-score over matched units. Across
  editions it bounds pp changes in U to ±1.5–2.1 % in scale. AUC, Spearman and rank statistics are
  invariant. Any U change reported in pp carries the note "±2 % scale (annex SD rounding)". No
  correction.
- **Noisy small Gebiete 39005 Lokstedt and 67012 Poppenbüttel** (S3/S4/S5 series consistent with
  small-cell disclosure control): **kept** in the primary. They have a few hundred residents each
  and enter the Stadtteil by population weight, so their influence is negligible, and excluding
  them would be a data-driven exclusion. Disclosed by ID; no sensitivity.
- **S7 exclusion codes:** the NULL rule (`s7_zero_exclusion_code`) is accepted. S7 is context only
  and never enters K, so per-edition ambiguity has no inferential effect. The context correlation
  with K is computed on non-NULL cells, with n reported per edition.
- **Missing 2022 Hamburg Stadtteil age shares:** these feed only the S4/S3 plausibility check (the
  direction-B check, which was rejected in Revision 2). No primary or sensitivity construct uses
  them. The 2023 row of that check stays "not computed"; disclose and do not backfill.

| Item | Change |
|---|---|
| A4.1 | Areal crosswalk artefact disclosed (binding wording); new sensitivity W24 (2024 weights and P^(U)/P for all Berlin editions, both grains), replacing M3 "2024 only"; no BZR drop rule; no dasymetric model for #371 |
| A4.2 | One Berlin P = `int_berlin_ewr_age_bands_plr2021.residents_total` for §3.4 and §3.7; renormalisation accepted |
| A4.3 | HH levels population-weighted for display, annex row labelled; 849-Gebiete panel adopted; S4 rounding disclosed; 39005/67012 kept; S7 NULL rule accepted; missing HH 2022 age shares have no effect |

Additional references: Tobler, W. R. (1979). Smooth pycnophylactic interpolation for geographical
regions. *JASA* 74(367), 519–530. Goodchild, M. F., & Lam, N. S.-N. (1980). Areal interpolation: a
variant of the traditional spatial problem. *Geo-Processing* 1, 297–312. Eicher, C. L., & Brewer,
C. A. (2001). Dasymetric mapping and areal interpolation. *CaGIS* 28(2), 125–138. Mennis, J. (2003).
Generating surface models of population using dasymetric mapping. *The Professional Geographer*
55(1), 31–42.

*A4.4: Hamburg S3 2019 back-revision (DE reviewer check, read-only, added 2026-11-05, pre-results).* The published Dynamik should satisfy D3_E = s_E − s_{E−3}. It does in 2019, 2021, 2024 and 2025 (ρ ≥ 0.9999, no |Δ| > 0.5 pp). In 2022 (base 2019; ρ 0.913, 52 Gebiete with |Δ| > 0.5 pp) and 2023 (base 2020; ρ 0.951, 44) it fails, and the outliers are concentrated in high-S3 Gebiete with refugee accommodation (for example 25005, 73009, 101003, 6004, 48005, 13001, 46003, 84002). The 2020 failure is the known AsylbLG seam. Because s2021 and s2022 check clean against later D, the likely reading is that the publisher later **revised the 2019 (and 2020) S3 bases**, plausibly through AsylbLG counting at accommodation sites (data checks §3). The levels are not small: W2 |ΔS3| has median 0.74, p90 3.07, p99 15.0 and max 44.9 pp. The affected matched window is therefore **W1 = [2019, 2021]**, which uses the as-published 2019 level. W2 cannot be tested for s2023 (there is no D2026), but its start level s2021 is clean. Decisions:
- **Primary unchanged:** each edition's own published level, as pre-registered.
- **Sensitivity R19:** for **every** balanced Hamburg Gebiet (no data-driven threshold), s3_2019_rev = s3_2022 − D3_2022. For clean Gebiete this is a rounding-level change. Where s3_2022 or D3_2022 is missing, the published 2019 level is kept, and the count of such Gebiete is reported. Stadtteil aggregation and 2019 weights are unchanged (§3.4). T, K, dK for W1, the pooled W1–W3 rows (H2, N2) and X8 are recomputed. Exploratory and uncorrected (§7.5). A verdict or X8 sign that changes is flagged "revision-sensitive (HH S3 2019 back-revision)".
- **Disclosure:** the methods note lists, by ID, every Gebiet with |D3_E − (s_E − s_{E−3})| > 0.5 pp in 2022 or 2023, with its W1 and W2 S3 change. W2 is not claimed to be revision-free; it is untestable, with a clean start level.
- **Relation to core-2:** core-2 (U + C; and core-1U if triggered) does not use S3, so it is unaffected. Through the D8 statement rule, a public city difference already needs a same-sign Δ with a CI excluding 0 under the T-free construct, so the stated claims are bounded. R19 is still required, because the city-level verdicts and the H/N rows are reported under core-3H, where T enters.
- **Data guard:** the DE dbt test (median |Δ| ≤ 0.2 pp per edition × indicator; seams S4 2019/2021 and S3 2020 excluded) is adopted. Medians are 0.033–0.047 pp, so it passes while still allowing the outliers, which are handled by R19 and the disclosure above.

**Amendment 4, revision 1 (pre-results, 2026-11-05): domain review E1–E9.** Source:
`docs/methodology/371-amendment4-domain-review.md` §8 (verdict CONCERNS). No matched-panel statistic
had been computed. Geo-DS adopts E1–E3 and E5–E9 in full and O1. E4 is a provenance task for the DE.
**Where this block differs from A4.1–A4.4 above, this block binds.** The quoted texts are the
binding replacements.

*E1: R19 becomes the primary (A4.4, §4.3).* Geo-DS agrees. The publisher documents the definition
change (Bericht 2021, PDF p. 8), and the revisions run in one direction (51/52 and 44/44 upward). So
the as-published 2019 level sits on the other side of a definition seam. Re-basing it is the same
logic as the Berlin backcast (§4.2).
- A4.4 "Primary unchanged" is replaced by: "**Primary (amended, §4.3 seam):** Hamburg S3 for
  edition 2019 is the publisher's same-definition base s3_2019_rev = s3_2022 − D3_2022 for every
  balanced Gebiet. Bericht 2021 (PDF p. 8) documents that from edition 2021 the AsylbLG part of S3
  counts recipients of Regelleistungen and of ausschließlich besondere Leistungen. W1 would
  otherwise straddle a definition seam. This parallels the Berlin backcast (§4.2)." The A4.4 rule
  for missing s3_2022/D3_2022 (keep the published level, report the count) carries over.
- The A4.4 sensitivity becomes "**Sensitivity R19-pub:** the as-published 2019 level". A verdict or
  X8 sign that changes under it is flagged "revision-sensitive (HH S3 2019 counting change)".
- §4.3 "Known seams" gains: "Hamburg T, 2019 → 2021: AsylbLG counting widened from edition 2021
  (Bericht 2021, PDF p. 8). Neutralised by the publisher's re-based 2019 level s3_2022 − D3_2022
  (A4.4)."
- In A4.4, the phrase "the likely reading is that the publisher later revised … at accommodation
  sites" is replaced by: "the publisher documents a widened AsylbLG count from edition 2021
  (Bericht 2021, PDF p. 8). The re-basing of the 2019/2020 values in D3_2022/D3_2023 is inferred
  from the annex (51/52 and 44/44 revisions upward). The concentration in high-S3 Gebiete is
  consistent with accommodation sites but is not stated by the publisher."
- §8.2 leakage guard: s3_2019_rev uses data from edition 2022. It is still a 31.12.2018 level and
  contains no information about any outcome beyond that level (D3_2022 only links s3_2022 to the
  re-based 2019 base). Like the Berlin backcast, it is listed by name as a permitted later-edition
  input for a level.

*E2: Recompute scope.* Under both versions (primary R19 and R19-pub), compute every row that uses
Hamburg K_2019 or dK_W1: H2, H3a, H3b (dK_P is the predictor at pivot 2021), H3c, N1, N2, N3, X8, the
core-3M rows and the §3.6 Hamburg change check.

*E3: Disclosure by revision, not by site.* The A4.4 disclosure bullet is replaced by: "The methods
note lists, by ID, every Gebiet with |D3_E − (s_E − s_{E−3})| > 0.5 pp in 2022 or 2023, with its W1
and W2 S3 change, under the heading 'S3 base revised by the publisher (AsylbLG counting change,
Bericht 2021)'. Individual Gebiete are not labelled as refugee-accommodation sites in any output.
The accommodation reading is stated only in aggregate, with the publisher's citation. W2 is not
claimed to be revision-free; it is untestable, with a clean start level." In the A4.4 paragraph,
"with refugee accommodation (for example …)" reads "consistent with accommodation sites (confirmed
by the publisher for 48005)".

*E4: Provenance (DE task, referenced only).* The A4.4 evidence goes into
`docs/epic-e/371-data-checks.md`:
- per-edition ρ;
- counts and sign split of |Δ| > 0.5 pp;
- level quantiles;
- the Bericht 2021 PDF p. 8 quote;
- `test_371_hh_annex_d_vs_s_consistency`.

A4.4's citation "data checks §3" then points to that new section. Until that lands, the methodology
gate treats A4.4 as uncited.

*E5: W24 flag and disclosure (A4.1).*
- The flag becomes "**weight-sensitive (2024 population weights)**".
- The binding disclosure is replaced by: "Berlin populations for 31.12.2018 and 31.12.2020 are
  mapped from LOR 2019 to LOR 2021 by area share, not by population. About 10,100 residents (0.27 %)
  are assigned to two development sites that had no housing at either date, and are missing from
  the neighbouring areas where they lived. This shifts the weights inside 2 of 143
  Bezirksregionen. Their totals including the two sites are unaffected. Sensitivity W24 uses 2024
  populations throughout. Because 2024 populations also reflect real change since 2018 (new
  housing, refugee arrivals, ageing), a result that changes under W24 is not by itself evidence of
  the mapping error."
- Added to the W24 bullet: "W24 measures fixed-composition change. It does not include population
  shifts between areas within a unit, which can be part of neighbourhood change (new-build
  gentrification)."
- O4 (a targeted artefact sensitivity inside 034008/062004) is not adopted. With E5's wording, W24
  no longer claims to isolate the artefact, and a third weight variant adds a forking path for two
  units.

*E6: f in W24.* At both grains, "replaces P^(U)/P with the 2024 ratio" reads "P and the age bands
are taken from 31.12.2024 and f stays the edition's own Regelaltersgrenze value (0.292 / 0.375 /
0.458 / 0.500, §3.7)". The age-structure weights are swapped; the U definition at each edition is
not.

*E7: R5 diagnostic (§5, §9.1, A4.1).*
- The flag "possibly new-build-driven" becomes "**possibly population-growth-driven (new-build or
  refugee accommodation)**". The §9.1 column `newbuild_driven` becomes `popgrowth_driven`.
- Added: "Berlin population growth for this diagnostic is computed on BZR totals over **all** child
  PLRs (correct to 0.14 %), not on the balanced-child sum, and it is not computed at PLR grain for
  windows that use 2018/2020/2022 crosswalked counts (reported as 'not computed: areal crosswalk')."
- The A4.1 sentence "Population enters only (i) … and (ii) …" gains "(iii) the R5 diagnostic,
  handled as in §5".

*E8: City levels (A4.3, §10).*
- "so the two are comparable" is replaced by: "so both use the same aggregation (weighted by total
  residents). The indicator definitions still differ (§3.2, R7), so the levels are shown per city
  with their definitions and are not ranked against each other. Both differ from the official
  headline figures (Hamburg: unweighted Gebiet mean; Berlin: PLR aggregate about 0.5 pp below the
  published S3), and the display says so."
- §10 gains: "Which city has more unemployment, transfer receipt or child poverty, from the
  matched U/T/C levels (definitions differ, §3.2)."

*E9: Accommodation channel (§4.4).* The "Local sites" bullet is replaced by: "**Accommodation sites
(all windows, mainly W2/W3).** On 31.12.2022, 259 refugee-accommodation sites were in use in 170
of 856 Hamburg Gebiete, and 30 of the 37 Gebiete with negative Dynamik in 2023 contain one
(Bericht 2023, PDF pp. 12, 16). Their residents are in the Hamburg population counts. Because
AsylbLG is in Hamburg T, an opening raises Hamburg K. In Berlin, AsylbLG is in no indicator, so
registered residents of a new site lower Berlin K through the denominators until recognition.
Under core-2 both cities show only the denominator effect. Whether residents of the Berlin arrival
centre at Tegel are registered is unknown. Disclosed, not corrected." Binding page wording,
wherever Hamburg change is shown: "In Hamburg, the welfare indicator includes asylum-seeker
benefits. Where the city opens or closes refugee accommodation, an area's figure can change by
tens of percentage points without any change among its existing residents. Such changes show
where accommodation was placed. We do not read them as neighbourhood decline or improvement."

*O1 (adopted):* 39005/67012 are described as "consistent with small-number effects in the published
data", never as "errors".

*§8.2 guard exemption (scoped).* The assertion "aggregation weights date from the outcome's own
reference date, never later" stays active for the primary and for every other run. It is exempted
**only** for runs tagged `sensitivity = 'W24'`. That tag is set in one place, and the analysis
asserts that W24 rows never feed a primary or BH-corrected row. W24 deliberately uses later
weights; a 31.12.2024 population is not an outcome variable and carries no outcome label. The
other permitted later-edition input is s3_2019_rev (E1). No other exemption exists.

| Item | Change |
|---|---|
| A4 rev. 1 | E1 R19 becomes primary, R19-pub the sensitivity, §4.3 seam; E2 full recompute list; E3 disclosure by revision; E4 to DE (gate waits on provenance); E5 W24 flag and wording; E6 f unchanged in W24; E7 `popgrowth_driven`, BZR totals over all children; E8 no cross-city level ranking (§10); E9 accommodation channel and page wording; O1 adopted; O4 not adopted; §8.2 guard exemption scoped to W24 and s3_2019_rev |

**Amendment 5 (post-results-generation, pre-interpretation, 2026-11-05).** The binding matched run (B = 1999, commits 0fb5fb00..13d9f3ff)
existed when this amendment was written. The geo-DS did not open the outputs. The DE's
implementation readings were raised while producing that run. One of them (reading 3) described a
specific row pattern (BER H2: primary not significant after BH, sensitivities significant
unadjusted). The PM had seen a verdict summary. The domain ratification was done without opening
the outputs. Each change is justified from the pre-registration text alone (§0, §5, §6.3, §6.5,
§7.5). A5.2 makes the statement rule stricter. Both changes resolve text that was ambiguous before implementation. The
rulings are in `docs/epic-e/371-implementation-readings-geo.md`.

- **A5.1 Definition of a flip.** A sensitivity "flip" flag (`small_units_flip`, `core3m_flip`, `core2_flip`, `core1u_flip`, `w24_weight_sensitive`,
  `r19_revision_sensitive`) is set when either:
  - (a) the point estimate changes sign relative to the primary (for AUC rows the sign is that of AUC − 0.5; for X8 rows that of Δ); or
  - (b) unadjusted significance (p < 0.05, two-sided, block bootstrap) differs between the primary
    and the sensitivity.

  Both sides are compared on the **same, unadjusted** scale. The BH-adjusted primary verdict is never
  compared with an uncorrected sensitivity result. The primary verdict itself is unchanged and stays
  BH-adjusted (T8, N-family, X8). Rationale: a mixed comparison flags rows that differ only by the
  multiplicity correction, not by the data.
- **A5.2 The ≥ 5,000 condition of the statement rule (§0, §6.3).** "X8 gives DIFFERS … in the ≥ 5,000
  panel" means BH over the 8 X8 rows **within the ≥ 5,000 panel**, the same procedure as the primary.
  The T-free condition stays unadjusted, as written ("sensitivity criterion, no BH"). The explicit
  "no BH" on that condition alone shows the contrast was intended. Every other sensitivity stays
  uncorrected (§7.5).
- **A5.1 scope (F1).** `maup_flip`, `mapping_driven` and `popgrowth_driven` stay **sign-only**, as
  defined in §6.5 and §5. The fine grain and the top-decile drops change n substantially, so a change
  in significance there reflects power, not grain or composition.
- **A5.1 labels (domain O1, adopted).** A sign change between two estimates that are both
  non-significant (unadjusted) is labelled "sign unstable around zero", not as a substantive flip.
- **A5.2 m (domain O2, adopted).** NO DATA rows are not tests and do not count toward m in the
  ≥ 5,000-panel X8 BH. This is the same convention as the primary families (for example, Berlin
  N-family m = 1).
- **N1 wording (domain O3, adopted).** Berlin N1 NO DATA is worded "could not be tested at this
  grain", never "not supported".
- **Reference and deviations (F2).** The result CSV as of commit 13d9f3ff is the pre-A5 reference.
  The findings' deviations section (§9.2 item 7) lists A5 as a post-results-generation deviation,
  with every row whose flags or statement-rule outcome changed under A5 (before → after).
  Disclosure: A5.1 removes flags from the row that triggered reading 3 (BER H2,
  `small_units_flip`/`core2_flip`).
- **Correction note (2026-11-05, A5 unchanged).** The reading-3 trigger description ("BER H2
  primary not significant only after BH, sensitivities significant unadjusted") came from a
  **B = 29 debug run**, not the binding B = 1999 run. In the binding run, A5.1 as written does
  **not** remove the BER H2 `small_units_flip`/`core2_flip` flags; both remain. The sentence above,
  "A5.1 removes flags from the row that triggered reading 3", is withdrawn. The rule in A5.1 is
  unchanged and no method changed. The findings (§7.8) generate the A5 before → after disclosure
  from the result rows. The geo-DS did not open the outputs for this note.
