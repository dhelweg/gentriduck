# E1c — Matched Berlin–Hamburg comparison of the thesis hypotheses (#371)

> **Generated** by `analysis/thesis_hypothesis_suite.py --panel matched` from `docs/epic-e/matched-comparison-results.csv` and `docs/epic-e/matched-comparison-metadata.json` — do not hand-edit (pre-registration §9.2). Interpretation is left to the reviewers and the analyst.

- **Run:** `run_sha` 332a64f6d460; B = 1999 block-bootstrap draws; seed 42 (Hamburg X8 stream 43); α = 0.05; G = 24 k-means blocks per city.
- **Binding design:** `docs/methodology/371-matched-comparison-preregistration.md` (Revisions 1–3, Amendment 4 and Amendment 4 revision 1), with `docs/methodology/354-355-hypothesis-suite-preregistration.md` (Amendments 1–3) for the shared estimators. Data evidence: `docs/epic-e/371-data-checks.md`.
- **Gate:** methodology-bearing (R-C1). Geo-DS and domain `Verdict: PASS` on these results are required before integration into `develop` or any publication.

## 1. What is matched and what is not

E1c compares the eight thesis hypotheses in Berlin and Hamburg on a matched design. It removes the differences that design can remove: **grain** (Berlin Bezirksregion vs Hamburg Stadtteil, units of about 15,000–26,000 residents and 4–6 km²), **construct** (the same three labour-market and transfer indicators U, T, C in both cities, with Berlin T re-based to all recipients, T\*), **time** (the same editions, reference dates and 2-year windows), **POIs** (the same basket, OA definition, snapshots and feature list) and **claim** (a city difference is a tested, multiplicity-controlled statement). What it cannot remove: the indicator definitions are not identical (§3.2), OSM mapping density differs between the cities (§2.4), the shocks hit the two indicator sets differently (§4.4), and with n ≈ 100–143 units per city the power for city differences is low (§6.4). **A 'no difference detected' is never 'the same'.** The framing stays as in Epic B: a directional comparison, not a replication (pre-registration §1).

**Power (pre-registration §6.4, stated up front).** At n ≈ 130 vs 65 (H1a/H1b), SE(Δρ) ≈ √(1/130 + 1/65) ≈ 0.15 before the design effect, so MDD ≈ 0.42. For the H3 pooled rows (286 vs 198), MDD ≈ 0.26 before the design effect. **X8 can detect only large city differences.** Every interaction row prints its own MDD (2.8 × the bootstrap SE of Δ).

**Robust-DIFFERS rule (§6.3, D1, D8, D10; binding).** A city difference may be **stated** only if X8 gives DIFFERS under the primary **core-3H** **and** in the ≥ 5,000-resident panel, **and** under the T-free construct (core-2, because Hamburg S5 excludes AsylbLG; data checks §3) Δ has the same sign **and** its unadjusted 95% block-bootstrap CI excludes 0 (sensitivity criterion, no BH); **and** its Δ has the same sign under core-3M (sign only). A DIFFERS that fails any condition is reported as "differs only under <condition>; not stated as a city difference". DIFFERS states only that the within-city association differs at the harmonised construct and the matched grain; it does not say that the processes differ. "Same verdict in both cities" is never shown as agreement unless X8 says NO DIFFERENCE DETECTED and the MDD is at most 0.30 (ρ) / 0.10 (AUC); even then it reads "no difference detected", never "the same".

**Scale caveat (R1).** The matched units (15–26k residents) are coarser than the scale at which gentrification is usually observed, so a null here does not rule out a neighbourhood-scale process.

**Binding page wording (R7):** "Welfare receipt is measured slightly differently in the two cities: Berlin's figure, derived from two published indicators, includes social assistance (mainly older and disabled people); Hamburg's includes asylum-seeker benefits. A city difference is only stated if it also appears without this indicator."

**Binding page wording wherever Hamburg change is shown (E9):** "In Hamburg, the welfare indicator includes asylum-seeker benefits. Where the city opens or closes refugee accommodation, an area's figure can change by tens of percentage points without any change among its existing residents. Such changes show where accommodation was placed. We do not read them as neighbourhood decline or improvement."

## 2. Side by side

Primary per city: BH across the city's 8 thesis primaries (T8). City difference: X8, BH across the 8 Δ = θ_BER − θ_HH. ρ: higher K = more disadvantage. *Italic* = "Holds?" (Berlin) / "Matches Berlin 2018?" (Hamburg), P354 §5.6 with Amendments 2–3.

| # | Hypothesis | 2018 thesis | Berlin matched | Hamburg matched | City difference tested |
|---|---|---|---|---|---|
| H1 | Der soziale Status einer Nachbarschaft hängt mit den lokalen Angebotsstrukturen zusammen. | supported | AUC 0.784 [0.692, 0.861], n = 143 (24 blocks), p_BH = 0.0020: **SUPPORTED** (acceptable); *holds* | AUC 0.754 [0.646, 0.844], n = 99 (24 blocks), p_BH = 0.0020: **SUPPORTED** (acceptable); *holds* | **NO DIFFERENCE DETECTED**, Δ 0.030 [-0.099, 0.160], MDD 0.188, p_BH = 0.9035; flags: `maup_flip` |
| H1a | Umgebungen mit vielen Cafés haben einen vergleichsweise hohen sozialen Status. | undecided | ρ -0.249 [-0.452, -0.054], n = 130 (24 blocks), p_BH = 0.0256: **SUPPORTED** (small); *stronger than thesis* | ρ -0.486 [-0.699, -0.190], n = 67 (21 blocks), p_BH = 0.0080: **SUPPORTED** (moderate); *stronger than thesis* | **NO DIFFERENCE DETECTED**, Δ 0.236 [-0.112, 0.528], MDD 0.474, p_BH = 0.5823 |
| H1b | Umgebungen mit vielen Fast Food Geschäften haben einen vergleichsweise niedrigeren sozialen Status. | supported | ρ 0.546 [0.385, 0.686], n = 130 (24 blocks), p_BH = 0.0020: **SUPPORTED** (large); *holds* | ρ 0.682 [0.492, 0.808], n = 67 (21 blocks), p_BH = 0.0020: **SUPPORTED** (large); *holds* | **NO DIFFERENCE DETECTED**, Δ -0.136 [-0.357, 0.102], MDD 0.320, p_BH = 0.5823 |
| H1c | Umgebungen mit vielen Sportmöglichkeiten haben einen vergleichsweise hohen sozialen Status. | undecided | ρ 0.334 [0.119, 0.534], n = 143 (24 blocks), p_BH = 0.0053: **CONTRADICTED** (moderate); *opposite direction (thesis: undecided); consistent with the sign of the thesis's own planning-area OA correlations (Tabelle 6-14)* | ρ 0.168 [-0.088, 0.406], n = 99 (24 blocks), p_BH = 0.4382: **NOT SIGNIFICANT** (small); *consistent (still unclear)* | **NO DIFFERENCE DETECTED**, Δ 0.165 [-0.135, 0.515], MDD 0.464, p_BH = 0.5823 |
| H2 | Die aktuellen lokalen Angebotsstrukturen haben einen Einfluss auf die zukünftige Veränderung des sozialen Status. | undecided | AUC 0.582 [0.521, 0.643], n = 429 (24 blocks), p_BH = 0.0256: **SUPPORTED** (negligible); *consistent (still unclear)*; flags: `small_units_flip;core2_flip;ewr_2022_interpolated` | AUC 0.508 [0.430, 0.575], n = 297 (24 blocks), p_BH = 0.8354: **NOT SIGNIFICANT** (negligible); *consistent (still unclear)* | **NO DIFFERENCE DETECTED**, Δ 0.074 [-0.018, 0.175], MDD 0.137, p_BH = 0.5823; flags: `core3m_flip;ewr_2022_interpolated;w2_only;w24_weight_sensitive` |
| H3a | Die Veränderung des sozialen Status folgt der Veränderung der lokalen Angebotsstruktur, ist diesem also zeitlich nachgelagert. | rejected | ρ 0.036 [-0.092, 0.149], n = 286 (24 blocks), p_BH = 0.6103: **NOT SIGNIFICANT** (negligible); *consistent (rejected)*; flags: `ewr_2022_interpolated` | ρ 0.048 [-0.116, 0.222], n = 198 (24 blocks), p_BH = 0.8137: **NOT SIGNIFICANT** (negligible); *consistent (rejected)* | **NO DIFFERENCE DETECTED**, Δ -0.011 [-0.230, 0.189], MDD 0.302, p_BH = 0.9035; flags: `ewr_2022_interpolated` |
| H3b | Die Veränderung des sozialen Status geht der Veränderung der lokalen Angebotsstruktur voraus. | partly supported | ρ -0.036 [-0.166, 0.082], n = 286 (24 blocks), p_BH = 0.6103: **NOT SIGNIFICANT** (negligible); *not reproduced*; flags: `ewr_2022_interpolated` | ρ -0.071 [-0.236, 0.100], n = 198 (24 blocks), p_BH = 0.7028: **NOT SIGNIFICANT** (negligible); *not reproduced*; flags: `maup_flip` | **NO DIFFERENCE DETECTED**, Δ 0.034 [-0.181, 0.241], MDD 0.304, p_BH = 0.9035; flags: `ewr_2022_interpolated;maup_flip` |
| H3c | Die Veränderung des sozialen Status geschieht zeitgleich mit der Veränderung der lokalen Angebotsstruktur. | undecided | ρ 0.026 [-0.062, 0.132], n = 429 (24 blocks), p_BH = 0.6103: **NOT SIGNIFICANT** (negligible); *consistent (still unclear)*; flags: `ewr_2022_interpolated;maup_flip` | ρ 0.020 [-0.090, 0.144], n = 297 (24 blocks), p_BH = 0.8187: **NOT SIGNIFICANT** (negligible); *consistent (still unclear)*; flags: `maup_flip` | **NO DIFFERENCE DETECTED**, Δ 0.006 [-0.147, 0.153], MDD 0.213, p_BH = 0.9035; flags: `ewr_2022_interpolated;maup_flip` |

New hypotheses (§7; N1 and N2 confirmatory with BH within the pair, N3 exploratory; city differences exploratory and uncorrected):

| # | Hypothesis | Berlin matched | Hamburg matched | City difference (exploratory) |
|---|---|---|---|---|
| N1 | Among neighbourhoods with above-median disadvantage at the pivot, a relative growth of the commercial offering precedes a relative decline in officially measured disadvantage. | NO DATA (n = 142, 19 blocks) | ρ 0.014 [-0.201, 0.235], n = 98 (20 blocks), p_BH = 0.9755: **NOT SIGNIFICANT** (negligible); flags: `small_units_flip` | NO DATA |
| N2 | A relative shift in the gastronomy mix toward cafés precedes a relative decline in officially measured disadvantage. | ρ -0.010 [-0.148, 0.127], n = 243 (24 blocks), p_BH = 0.8604: **NOT SIGNIFICANT** (negligible); flags: `ewr_2022_interpolated` | ρ 0.130 [-0.051, 0.310], n = 126 (21 blocks), p_BH = 0.3322: **NOT SIGNIFICANT** (small) | **NO DIFFERENCE DETECTED**, Δ -0.140 [-0.373, 0.087], MDD 0.325, p = 0.2071 |
| N3 | Relative commercial growth in adjacent neighbourhoods precedes a relative decline in a neighbourhood's officially measured disadvantage, beyond its own commercial growth. | ρ -0.019 [-0.132, 0.104], n = 286 (24 blocks), p_BH = –: **NOT SIGNIFICANT** (negligible); flags: `ewr_2022_interpolated` | ρ -0.055 [-0.214, 0.114], n = 198 (24 blocks), p_BH = –: **NOT SIGNIFICANT** (negligible) | **NO DIFFERENCE DETECTED**, Δ 0.036 [-0.162, 0.240], MDD 0.280, p = 0.7204 |

**Notes on the primary rows** (verbatim from the CSV `notes` column, binding texts omitted):

- BER H1a: significant at FDR 5%, not at family-wise 5%
- BER H2: significant at FDR 5%, not at family-wise 5%
- BER N1: scope (D7): pools inner-city disadvantaged areas with peripheral large estates, public wording 'among the more disadvantaged half of neighbourhoods', never 'gentrifying areas' (PR §7.1); not reported: < 20 blocks
- BER N2: an ordering test, not a warning, forecasting or investment indicator (D5a), described only as 'a shift in the gastronomy mix toward cafés', never as 'fewer fast-food outlets' (D5b)
- BER N3: exploratory (PR §7.3): the spatial lag smooths over the neighbours the block bootstrap keeps together
- HH N1: scope (D7): pools inner-city disadvantaged areas with peripheral large estates, public wording 'among the more disadvantaged half of neighbourhoods', never 'gentrifying areas' (PR §7.1)
- HH N2: an ordering test, not a warning, forecasting or investment indicator (D5a), described only as 'a shift in the gastronomy mix toward cafés', never as 'fewer fast-food outlets' (D5b)
- HH N3: exploratory (PR §7.3): the spatial lag smooths over the neighbours the block bootstrap keeps together
- BER-HH H1: too imprecise to say the cities agree (MDD 0.188 > 0.10)
- BER-HH H1a: too imprecise to say the cities agree (MDD 0.474 > 0.30)
- BER-HH H1b: too imprecise to say the cities agree (MDD 0.320 > 0.30)
- BER-HH H1c: too imprecise to say the cities agree (MDD 0.464 > 0.30)
- BER-HH H2: coincides with the Rechtskreiswechsel asymmetry (W2 only, PR §4.4); too imprecise to say the cities agree (MDD 0.137 > 0.10)
- BER-HH H3a: too imprecise to say the cities agree (MDD 0.302 > 0.30)
- BER-HH H3b: too imprecise to say the cities agree (MDD 0.304 > 0.30)
- BER-HH N1: scope (D7): pools inner-city disadvantaged areas with peripheral large estates, public wording 'among the more disadvantaged half of neighbourhoods', never 'gentrifying areas' (PR §7.1)
- BER-HH N2: an ordering test, not a warning, forecasting or investment indicator (D5a), described only as 'a shift in the gastronomy mix toward cafés', never as 'fewer fast-food outlets' (D5b); too imprecise to say the cities agree (MDD 0.325 > 0.30)
- BER-HH N3: exploratory (PR §7.3): the spatial lag smooths over the neighbours the block bootstrap keeps together

**What FDR means.** Benjamini–Hochberg bounds the expected share of false claims among the rows marked significant in each family (T8 per city, N per city, X8); it does not protect each row. `p_holm` is reported for transparency and does not decide verdicts.

## 3. Validity and consistency checks

### 3.1 K against each city's own index (§3.6)

| Check | Edition / window | ρ | n | Threshold | Result |
|---|---|---|---|---|---|
| BER level | 2021 | 1.000 | 535 | 0.90 | pass |
| BER level | 2023 | 1.000 | 535 | 0.90 | pass |
| BER level | 2025 | 1.000 | 535 | 0.90 | pass |
| BER change | 2021-2023 | 0.995 | 535 | 0.80 | pass |
| BER change | 2023-2025 | 0.989 | 535 | 0.80 | pass |
| HH level | 2019 | 0.968 | 849 | 0.80 | pass |
| HH level | 2021 | 0.968 | 849 | 0.80 | pass |
| HH level | 2023 | 0.962 | 849 | 0.80 | pass |
| HH level | 2025 | 0.964 | 849 | 0.80 | pass |
| HH change (R19) | 2019-2021 | 0.558 | 849 | – | reported |
| HH change (R19) | 2021-2023 | 0.588 | 849 | – | reported |
| HH change (R19) | 2023-2025 | 0.524 | 849 | – | reported |
| HH change (R19pub) | 2019-2021 | 0.539 | 849 | – | reported |
| HH change (R19pub) | 2021-2023 | 0.588 | 849 | – | reported |
| HH change (R19pub) | 2023-2025 | 0.524 | 849 | – | reported |
| BER K vs own classes (matched) | 2021 | 0.882 | 143 | – | reported |
| BER K vs own classes (matched) | 2023 | 0.857 | 143 | – | reported |
| BER K vs own classes (matched) | 2025 | 0.885 | 143 | – | reported |
| HH K vs own classes (matched) | 2019 | 0.901 | 99 | – | reported |
| HH K vs own classes (matched) | 2021 | 0.896 | 99 | – | reported |
| HH K vs own classes (matched) | 2023 | 0.910 | 99 | – | reported |
| HH K vs own classes (matched) | 2025 | 0.906 | 99 | – | reported |
| BER rho(T*, S3) at PLR | 2019 | 0.998 | 535 | – | reported |
| BER rho(T*, S3) at PLR | 2021 | 0.997 | 535 | – | reported |
| BER rho(T*, S3) at PLR | 2023 | 0.997 | 535 | – | reported |
| BER rho(T*, S3) at PLR | 2025 | 0.996 | 535 | – | reported |

Reading (R6): the Berlin level check compares K with the #354 S composite built from overlapping indicators, so ρ ≈ 1 is expected by construction for core-3M; with T\* ≠ S3 the ≥ 0.90 threshold is informative (§3.7 Validity). The informative checks are Hamburg K vs Status-summe and K vs each city's own classes.

Divergence: none of the thresholds failed.

### 3.2 Hamburg z-to-share recovery (§3.3; repeated from data checks §2)

| Edition | Indicator | n | mean z | SD z | share min | share max | outside [−0.5, 100.5] | z / moments precision |
|---|---|---|---|---|---|---|---|---|
| 2019 | S3 | 852 | +0.0000 | 1.0000 | 0.03 | 75.51 | 0 | two_decimals / three_decimals |
| 2019 | S4 | 852 | +0.0010 | 1.0002 | -0.10 | 15.00 | 0 | two_decimals / three_decimals |
| 2019 | S5 | 852 | +0.0000 | 1.0001 | -0.06 | 87.26 | 0 | two_decimals / three_decimals |
| 2021 | S3 | 853 | +0.0000 | 0.9994 | -0.11 | 85.18 | 0 | two_decimals / three_decimals |
| 2021 | S4 | 853 | -0.0000 | 0.9996 | -0.01 | 20.23 | 0 | two_decimals / three_decimals |
| 2021 | S5 | 853 | +0.0001 | 0.9991 | 0.11 | 79.34 | 0 | two_decimals / three_decimals |
| 2023 | S3 | 856 | +0.0001 | 0.9994 | 0.14 | 84.73 | 0 | two_decimals / three_decimals |
| 2023 | S4 | 856 | +0.0001 | 0.9995 | -0.06 | 35.45 | 0 | two_decimals / three_decimals |
| 2023 | S5 | 856 | -0.0001 | 0.9993 | 0.00 | 93.90 | 0 | two_decimals / three_decimals |
| 2025 | S3 | 857 | -0.0001 | 0.9995 | -0.10 | 88.62 | 0 | two_decimals / three_decimals |
| 2025 | S4 | 857 | -0.0000 | 0.9994 | -0.03 | 28.95 | 0 | two_decimals / three_decimals |
| 2025 | S5 | 857 | +0.0002 | 0.9994 | 0.02 | 96.75 | 0 | two_decimals / three_decimals |

Hamburg S4 SD rounding (A4.3): the S4 SD is rounded to 3 decimals in the matched editions, a ±1.5–2.1 % scale uncertainty on S4 pp changes; ranks, AUC and Spearman are invariant. Any U change in pp carries "±2 % scale (annex SD rounding)".

### 3.3 Berlin 2019 backcast (§4.2)

| Comparison | Grain | ρ | n | Expected | Result |
|---|---|---|---|---|---|
| S1 | BZR | 0.992 | 143 | ≥ 0.90 | pass |
| S3 | BZR | 0.994 | 143 | ≥ 0.90 | pass |
| S4 | BZR | 0.989 | 143 | ≥ 0.90 | pass |
| S1_2023 - S1_2021 vs D1_2023 | PLR | 1.000 | 535 | ≥ 0.95 | pass |
| S3_2023 - S3_2021 vs D3_2023 | PLR | 1.000 | 535 | ≥ 0.95 | pass |
| S4_2023 - S4_2021 vs D4_2023 | PLR | 1.000 | 535 | ≥ 0.95 | pass |
| S1_2025 - S1_2023 vs D1_2025 | PLR | 1.000 | 535 | ≥ 0.95 | pass |
| S3_2025 - S3_2023 vs D3_2025 | PLR | 1.000 | 535 | ≥ 0.95 | pass |
| S4_2025 - S4_2023 vs D4_2025 | PLR | 1.000 | 535 | ≥ 0.95 | pass |

The BZR rows compare the backcast (anteil_2021 − dynamik_2021 on LOR 2021) with MSS 2019 crosswalked through `int_berlin_lor_crosswalk_dominant_pop_2021`, both aggregated with 31.12.2018 populations. The PLR rows compare anteil_E − anteil_(E−2) with the published dynamik_E.

Pre-registered descriptive ρ(T\*, S3) at PLR (§3.7 Validity): 2019: 0.998, 2021: 0.997, 2023: 0.997, 2025: 0.996.

## 4. Grain and minimum base

| City | Level | n | min | Q1 | median | Q3 | max | total |
|---|---|---|---|---|---|---|---|---|
| BER | PLR area (km², EPSG:25832) | 535 | 0.13 | 0.52 | 0.81 | 1.68 | 23.76 | 883.80 |
| BER | Bezirksregion area (km², EPSG:25832) | 143 | 0.71 | 2.35 | 4.10 | 7.08 | 43.41 | 892.36 |
| BER | PLR population 31.12.2024 | 535 | 503 | 4894 | 7237 | 9462 | 16901 | 3895504 |
| BER | Bezirksregion population 31.12.2024 | 143 | 4487 | 18247 | 26387 | 34388 | 64657 | 3895504 |
| BER | units < 5,000 residents / single-child units | 2 / 8 | | | | | | |
| HH | Gebiet area (km², EPSG:25832) | 849 | 0.04 | 0.19 | 0.35 | 0.63 | 15.60 | 610.69 |
| HH | Stadtteil area (km², EPSG:25832) | 99 | 0.55 | 2.72 | 5.89 | 9.01 | 35.36 | 721.08 |
| HH | Gebiet population 31.12.2024 | 849 | 311 | 1664 | 2209 | 2912 | 6685 | 1956529 |
| HH | Stadtteil population 31.12.2024 | 99 | 497 | 6486 | 15643 | 29304 | 95114 | 1956529 |
| HH | units < 5,000 residents / single-child units | 22 / 15 | | | | | | |

Share of units whose domain base is at least 10 POIs (§5; A1.1 needs ≥ 20%):

| City / grain / snapshot | Gastronomy | Retail | Services | Entertainment | Sports and Recreation |
|---|---|---|---|---|---|
| BER/fine/2025 | 0.49 | 0.56 | 0.25 | 0.18 | 0.26 |
| BER/matched/2019 | 0.86 | 0.90 | 0.57 | 0.42 | 0.59 |
| BER/matched/2021 | 0.87 | 0.90 | 0.59 | 0.45 | 0.62 |
| BER/matched/2023 | 0.90 | 0.92 | 0.64 | 0.47 | 0.74 |
| BER/matched/2025 | 0.91 | 0.92 | 0.64 | 0.47 | 0.83 |
| HH/fine/2025 | 0.12 | 0.15 | 0.04 | 0.01 | 0.01 |
| HH/matched/2019 | 0.62 | 0.69 | 0.36 | 0.23 | 0.32 |
| HH/matched/2021 | 0.67 | 0.69 | 0.41 | 0.23 | 0.38 |
| HH/matched/2023 | 0.67 | 0.69 | 0.45 | 0.26 | 0.38 |
| HH/matched/2025 | 0.68 | 0.72 | 0.53 | 0.28 | 0.42 |

Common feature lists, matched grain (written to the metadata before any fit): H1 44 categories, H2 42 categories; domains H1 13, H2 13.

Common feature lists, fine grain (written to the metadata before any fit): H1 12 categories, H2 9 categories; domains H1 13, H2 13.

## 5. Sensitivities

All rows below are outside every confirmatory family (uncorrected; P354 §5.4). They cannot change a primary verdict; they set the flags shown in §2.

### Secondary, exploratory and diagnostic rows of the primary run

| City | Hyp | Role | Operationalisation | Estimate [95% CI] | n | Verdict | Flags |
|---|---|---|---|---|---|---|---|
| BER | N3 | exploratory | partial Spearman(Wg(c)_P, dK_F | g(c)_P, dK_P, K_pivot); W = row-standardised queen contiguity of the match... | -0.019 [-0.132, 0.104] | 286 | NOT SIGNIFICANT | ewr_2022_interpolated |
| HH | N3 | exploratory | partial Spearman(Wg(c)_P, dK_F | g(c)_P, dK_P, K_pivot); W = row-standardised queen contiguity of the match... | -0.055 [-0.214, 0.114] | 198 | NOT SIGNIFICANT |  |
| BER | H1 | secondary | domain-level OA 2025 (common domains) => K_2025 > 0 | 0.759 [0.654, 0.855] | 143 | SUPPORTED |  |
| BER | H1 | secondary | commercial-only category OA (4 commercial domains, common list) => K_2025 > 0 | 0.800 [0.716, 0.873] | 143 | SUPPORTED |  |
| BER | H1 | sensitivity | category OA + one base indicator per domain (A1.1 (i)) | 0.778 [0.689, 0.855] | 143 | SUPPORTED |  |
| BER | H1 | sensitivity | category OA, complete-case: base passed in all four commercial domains (A1.1 (ii)) | – [–, –] | 64 | NO DATA |  |
| BER | H1a | sensitivity | Spearman(Gastronomy|Cafe POIs per 1,000 residents (31.12.2024, all children), K_2025), full frame, no base ... | -0.253 [-0.466, -0.033] | 143 | SUPPORTED |  |
| BER | H1b | sensitivity | Spearman(Gastronomy|Fast Food POIs per 1,000 residents (31.12.2024, all children), K_2025), full frame, no ... | 0.122 [-0.069, 0.320] | 143 | NOT SIGNIFICANT |  |
| BER | H1c | sensitivity | Spearman(Sports and Recreation POIs per 1,000 residents (31.12.2024, all children), K_2025), full frame, no... | 0.168 [-0.037, 0.375] | 143 | NOT SIGNIFICANT |  |
| BER | H1c | sensitivity | Spearman(Sport category without table tennis, K_2025); table tennis removed from numerator and parent (D3b) | – [–, –] | 64 | NO DATA |  |
| BER | H1b | sensitivity | Fast Food without döner/kebab types (anti-stigmatisation check, R3) | – [–, –] | 0 | NO DATA |  |
| BER | H2 | secondary | domain-level OA at window start (common domains) => dK_W > 0 | 0.514 [0.439, 0.590] | 429 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | H2 | sensitivity | category OA + one base indicator per domain (A1.1 (i)) | 0.595 [0.538, 0.655] | 429 | SUPPORTED | ewr_2022_interpolated |
| BER | H2 | sensitivity | category OA, complete-case in the four commercial domains (A1.1 (ii)) | – [–, –] | 182 | NO DATA | ewr_2022_interpolated |
| BER | H2 | secondary | H2 incremental: delta AUC of (K at window start + category OA) over K at window start alone | -0.040 [-0.083, 0.009] | 429 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | H2 | exploratory | directional continuity: Spearman(OA basket of the 4 commercial domains at window start, dK_W) | -0.105 [-0.249, 0.011] | 429 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | H2 | sensitivity | H2 window 2019-2021 only | 0.423 [0.313, 0.519] | 143 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | H2 | sensitivity | H2 window 2021-2023 only | 0.743 [0.666, 0.831] | 143 | SUPPORTED | ewr_2022_interpolated |
| BER | H2 | sensitivity | H2 window 2023-2025 only | 0.536 [0.443, 0.627] | 143 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | H3a | sensitivity | H3a with the alternative level control (window_start) | 0.040 [-0.083, 0.147] | 286 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | H3a | sensitivity | H3a at pivot 2021 only | 0.029 [-0.157, 0.210] | 143 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | H3a | sensitivity | H3a at pivot 2023 only | 0.019 [-0.190, 0.206] | 143 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | H3a | sensitivity | pivot difference: rho(pivot 2023) - rho(pivot 2021) (P354 §3.4) | -0.010 [-0.321, 0.271] | 286 | – | ewr_2022_interpolated |
| BER | H3a | secondary | H3a with total-share growth of all POIs (continuity with E1/E5) | -0.142 [-0.268, -0.015] | 286 | SUPPORTED | ewr_2022_interpolated |
| BER | H3a | secondary | H3a with OA-basket change (mean OA of the 4 commercial domains) | 0.087 [-0.039, 0.192] | 286 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | H3a | exploratory | H3a with café-growth cross-lag, g(café C5 share) (P354 R4) | -0.051 [-0.169, 0.067] | 271 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | H3b | sensitivity | H3b with the alternative level control (pivot) | -0.043 [-0.176, 0.082] | 286 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | H3b | sensitivity | H3b at pivot 2021 only | -0.058 [-0.302, 0.213] | 143 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | H3b | sensitivity | H3b at pivot 2023 only | -0.036 [-0.259, 0.176] | 143 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | H3b | sensitivity | pivot difference: rho(pivot 2023) - rho(pivot 2021) (P354 §3.4) | 0.022 [-0.379, 0.365] | 286 | – | ewr_2022_interpolated |
| BER | H3b | secondary | H3b with total-share growth of all POIs (continuity with E1/E5) | -0.109 [-0.211, 0.014] | 286 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | H3b | secondary | H3b with OA-basket change (mean OA of the 4 commercial domains) | 0.051 [-0.111, 0.173] | 286 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | H3b | exploratory | H3b with café-growth cross-lag, g(café C5 share) (P354 R4) | 0.007 [-0.093, 0.124] | 271 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | H3c | secondary | H3c with total-share growth | 0.043 [-0.072, 0.154] | 429 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | H3c | secondary | H3c with OA-basket change | -0.028 [-0.146, 0.094] | 429 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | H3c | sensitivity | H3c window 2019-2021 only | 0.060 [-0.078, 0.181] | 143 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | H3c | sensitivity | H3c window 2021-2023 only | 0.002 [-0.163, 0.194] | 143 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | H3c | sensitivity | H3c window 2023-2025 only | 0.030 [-0.178, 0.231] | 143 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | N1 | exploratory | stratum difference rho(K_pivot above median) - rho(below), H3a form | 0.264 [0.003, 0.503] | 286 | – | ewr_2022_interpolated |
| BER | N1 | exploratory | N1 within the inner half of the city (population-weighted median distance to Alexanderplatz, R2) | – [–, –] | 70 | NO DATA | ewr_2022_interpolated |
| BER | N1 | exploratory | N1 within the outer half of the city (population-weighted median distance to Alexanderplatz, R2) | – [–, –] | 72 | NO DATA | ewr_2022_interpolated |
| BER | N2 | secondary | N2 component: partial Spearman(g(café share within Gastronomy)_P, dK_F | dK_P, K_pivot) (D5b) | 0.050 [-0.102, 0.203] | 237 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | N2 | secondary | N2 component: partial Spearman(g(fast-food share within Gastronomy)_P, dK_F | dK_P, K_pivot) (D5b) | 0.025 [-0.127, 0.173] | 243 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | N2 | sensitivity | N2 at pivot 2021 only (P = W1; the pandemic closed sit-down cafés while takeaway stayed permitted, D5c) | -0.011 [-0.205, 0.178] | 120 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | N2 | sensitivity | N2 without döner/kebab types (354 R4, conditional on the taxonomy) | – [–, –] | 0 | NO DATA | ewr_2022_interpolated |
| BER | H3a | sensitivity | H3a primary without the 15 units in the top decile of OSM total-POI growth 2019-2025 | 0.027 [-0.128, 0.150] | 256 | NOT SIGNIFICANT |  |
| BER | H3b | sensitivity | H3b primary without the 15 units in the top decile of OSM total-POI growth 2019-2025 | -0.034 [-0.163, 0.085] | 256 | NOT SIGNIFICANT |  |
| BER | H3c | sensitivity | H3c primary without the 15 units in the top decile of OSM total-POI growth 2019-2025 | 0.026 [-0.081, 0.147] | 384 | NOT SIGNIFICANT |  |
| BER | H3a | sensitivity | H3a primary without the 15 units in the top decile of population growth 31.12.2018-31.12.2024 | 0.055 [-0.081, 0.177] | 256 | NOT SIGNIFICANT |  |
| BER | H3b | sensitivity | H3b primary without the 15 units in the top decile of population growth 31.12.2018-31.12.2024 | -0.043 [-0.175, 0.092] | 256 | NOT SIGNIFICANT |  |
| BER | H3c | sensitivity | H3c primary without the 15 units in the top decile of population growth 31.12.2018-31.12.2024 | 0.047 [-0.054, 0.160] | 384 | NOT SIGNIFICANT |  |
| HH | H1 | secondary | domain-level OA 2025 (common domains) => K_2025 > 0 | 0.521 [0.437, 0.604] | 99 | NOT SIGNIFICANT |  |
| HH | H1 | secondary | commercial-only category OA (4 commercial domains, common list) => K_2025 > 0 | 0.723 [0.636, 0.791] | 99 | SUPPORTED |  |
| HH | H1 | sensitivity | category OA + one base indicator per domain (A1.1 (i)) | 0.760 [0.651, 0.858] | 99 | SUPPORTED |  |
| HH | H1 | sensitivity | category OA, complete-case: base passed in all four commercial domains (A1.1 (ii)) | – [–, –] | 27 | NO DATA |  |
| HH | H1a | sensitivity | Spearman(Gastronomy|Cafe POIs per 1,000 residents (31.12.2024, all children), K_2025), full frame, no base ... | -0.146 [-0.342, 0.064] | 99 | NOT SIGNIFICANT |  |
| HH | H1b | sensitivity | Spearman(Gastronomy|Fast Food POIs per 1,000 residents (31.12.2024, all children), K_2025), full frame, no ... | 0.207 [0.012, 0.374] | 99 | SUPPORTED |  |
| HH | H1c | sensitivity | Spearman(Sports and Recreation POIs per 1,000 residents (31.12.2024, all children), K_2025), full frame, no... | 0.116 [-0.117, 0.327] | 99 | NOT SIGNIFICANT |  |
| HH | H1c | sensitivity | Spearman(Sport category without table tennis, K_2025); table tennis removed from numerator and parent (D3b) | – [–, –] | 34 | NO DATA |  |
| HH | H1b | sensitivity | Fast Food without döner/kebab types (anti-stigmatisation check, R3) | – [–, –] | 0 | NO DATA |  |
| HH | H2 | secondary | domain-level OA at window start (common domains) => dK_W > 0 | 0.478 [0.426, 0.537] | 297 | NOT SIGNIFICANT |  |
| HH | H2 | sensitivity | category OA + one base indicator per domain (A1.1 (i)) | 0.528 [0.457, 0.586] | 297 | NOT SIGNIFICANT |  |
| HH | H2 | sensitivity | category OA, complete-case in the four commercial domains (A1.1 (ii)) | – [–, –] | 65 | NO DATA |  |
| HH | H2 | secondary | H2 incremental: delta AUC of (K at window start + category OA) over K at window start alone | -0.051 [-0.150, 0.026] | 297 | NOT SIGNIFICANT |  |
| HH | H2 | exploratory | directional continuity: Spearman(OA basket of the 4 commercial domains at window start, dK_W) | -0.078 [-0.176, 0.016] | 297 | NOT SIGNIFICANT |  |
| HH | H2 | sensitivity | H2 window 2019-2021 only | 0.547 [0.461, 0.627] | 99 | NOT SIGNIFICANT |  |
| HH | H2 | sensitivity | H2 window 2021-2023 only | 0.471 [0.330, 0.616] | 99 | NOT SIGNIFICANT |  |
| HH | H2 | sensitivity | H2 window 2023-2025 only | 0.518 [0.406, 0.626] | 99 | NOT SIGNIFICANT |  |
| HH | H3a | sensitivity | H3a with the alternative level control (window_start) | 0.050 [-0.115, 0.226] | 198 | NOT SIGNIFICANT |  |
| HH | H3a | sensitivity | H3a at pivot 2021 only | 0.025 [-0.200, 0.290] | 99 | NOT SIGNIFICANT |  |
| HH | H3a | sensitivity | H3a at pivot 2023 only | 0.054 [-0.124, 0.218] | 99 | NOT SIGNIFICANT |  |
| HH | H3a | sensitivity | pivot difference: rho(pivot 2023) - rho(pivot 2021) (P354 §3.4) | 0.029 [-0.258, 0.279] | 198 | – |  |
| HH | H3a | secondary | H3a with total-share growth of all POIs (continuity with E1/E5) | -0.082 [-0.214, 0.066] | 198 | NOT SIGNIFICANT |  |
| HH | H3a | secondary | H3a with OA-basket change (mean OA of the 4 commercial domains) | 0.062 [-0.035, 0.153] | 198 | NOT SIGNIFICANT |  |
| HH | H3a | exploratory | H3a with café-growth cross-lag, g(café C5 share) (P354 R4) | 0.021 [-0.139, 0.181] | 165 | NOT SIGNIFICANT |  |
| HH | H3b | sensitivity | H3b with the alternative level control (pivot) | -0.052 [-0.224, 0.121] | 198 | NOT SIGNIFICANT |  |
| HH | H3b | sensitivity | H3b at pivot 2021 only | 0.007 [-0.185, 0.199] | 99 | NOT SIGNIFICANT |  |
| HH | H3b | sensitivity | H3b at pivot 2023 only | -0.239 [-0.470, 0.000] | 99 | NOT SIGNIFICANT |  |
| HH | H3b | sensitivity | pivot difference: rho(pivot 2023) - rho(pivot 2021) (P354 §3.4) | -0.245 [-0.532, 0.027] | 198 | – |  |
| HH | H3b | secondary | H3b with total-share growth of all POIs (continuity with E1/E5) | -0.059 [-0.221, 0.110] | 198 | NOT SIGNIFICANT |  |
| HH | H3b | secondary | H3b with OA-basket change (mean OA of the 4 commercial domains) | -0.034 [-0.220, 0.157] | 198 | NOT SIGNIFICANT |  |
| HH | H3b | exploratory | H3b with café-growth cross-lag, g(café C5 share) (P354 R4) | -0.040 [-0.172, 0.096] | 164 | NOT SIGNIFICANT |  |
| HH | H3c | secondary | H3c with total-share growth | -0.094 [-0.196, 0.015] | 297 | NOT SIGNIFICANT |  |
| HH | H3c | secondary | H3c with OA-basket change | 0.088 [0.003, 0.172] | 297 | CONTRADICTED |  |
| HH | H3c | sensitivity | H3c window 2019-2021 only | 0.165 [-0.087, 0.422] | 99 | NOT SIGNIFICANT |  |
| HH | H3c | sensitivity | H3c window 2021-2023 only | -0.105 [-0.256, 0.038] | 99 | NOT SIGNIFICANT |  |
| HH | H3c | sensitivity | H3c window 2023-2025 only | 0.053 [-0.192, 0.295] | 99 | NOT SIGNIFICANT |  |
| HH | N1 | exploratory | stratum difference rho(K_pivot above median) - rho(below), H3a form | -0.083 [-0.355, 0.144] | 198 | – |  |
| HH | N1 | exploratory | N1 within the inner half of the city (population-weighted median distance to Rathausmarkt, R2) | – [–, –] | 42 | NO DATA |  |
| HH | N1 | exploratory | N1 within the outer half of the city (population-weighted median distance to Rathausmarkt, R2) | – [–, –] | 56 | NO DATA |  |
| HH | N2 | secondary | N2 component: partial Spearman(g(café share within Gastronomy)_P, dK_F | dK_P, K_pivot) (D5b) | 0.110 [-0.041, 0.283] | 126 | NOT SIGNIFICANT |  |
| HH | N2 | secondary | N2 component: partial Spearman(g(fast-food share within Gastronomy)_P, dK_F | dK_P, K_pivot) (D5b) | -0.086 [-0.233, 0.087] | 121 | NOT SIGNIFICANT |  |
| HH | N2 | sensitivity | N2 at pivot 2021 only (P = W1; the pandemic closed sit-down cafés while takeaway stayed permitted, D5c) | 0.186 [-0.085, 0.489] | 61 | NOT SIGNIFICANT |  |
| HH | N2 | sensitivity | N2 without döner/kebab types (354 R4, conditional on the taxonomy) | – [–, –] | 0 | NO DATA |  |
| HH | H3a | sensitivity | H3a primary without the 10 units in the top decile of OSM total-POI growth 2019-2025 | 0.068 [-0.105, 0.255] | 178 | NOT SIGNIFICANT |  |
| HH | H3b | sensitivity | H3b primary without the 10 units in the top decile of OSM total-POI growth 2019-2025 | -0.031 [-0.187, 0.126] | 178 | NOT SIGNIFICANT |  |
| HH | H3c | sensitivity | H3c primary without the 10 units in the top decile of OSM total-POI growth 2019-2025 | 0.006 [-0.119, 0.129] | 267 | NOT SIGNIFICANT |  |
| HH | H3a | sensitivity | H3a primary without the 10 units in the top decile of population growth 31.12.2018-31.12.2024 | 0.051 [-0.129, 0.241] | 178 | NOT SIGNIFICANT |  |
| HH | H3b | sensitivity | H3b primary without the 10 units in the top decile of population growth 31.12.2018-31.12.2024 | -0.061 [-0.243, 0.121] | 178 | NOT SIGNIFICANT |  |
| HH | H3c | sensitivity | H3c primary without the 10 units in the top decile of population growth 31.12.2018-31.12.2024 | 0.009 [-0.107, 0.140] | 267 | NOT SIGNIFICANT |  |
| BER-HH | N1 | exploratory | Delta = theta_BER - theta_HH (partial_spearman; H3a restricted to units with K_pivot above the city's media... | – [–, –] | 240 | NO DATA |  |
| BER-HH | N2 | exploratory | Delta = theta_BER - theta_HH (partial_spearman; partial Spearman(Delta r_P, dK_F | dK_P, K_pivot), r = ln((... | -0.140 [-0.373, 0.087] | 369 | NO DIFFERENCE DETECTED |  |
| BER-HH | N3 | exploratory | Delta = theta_BER - theta_HH (partial_spearman; partial Spearman(Wg(c)_P, dK_F | g(c)_P, dK_P, K_pivot); W ... | 0.036 [-0.162, 0.240] | 484 | NO DIFFERENCE DETECTED |  |
| BER-HH | H2 | exploratory | Delta = theta_BER - theta_HH (oof_auc_logit; H2 window 2019-2021 only); independent block bootstraps, BER s... | -0.124 [-0.264, 0.006] | 242 | NO DIFFERENCE DETECTED | amendment3_below_chance |
| BER-HH | H2 | exploratory | Delta = theta_BER - theta_HH (oof_auc_logit; H2 window 2021-2023 only); independent block bootstraps, BER s... | 0.271 [0.111, 0.440] | 242 | DIFFERS | amendment3_below_chance |
| BER-HH | H2 | exploratory | Delta = theta_BER - theta_HH (oof_auc_logit; H2 window 2023-2025 only); independent block bootstraps, BER s... | 0.018 [-0.121, 0.158] | 242 | NO DIFFERENCE DETECTED |  |
| BER-HH | H3c | exploratory | Delta = theta_BER - theta_HH (spearman; H3c window 2019-2021 only); independent block bootstraps, BER seed ... | -0.105 [-0.376, 0.173] | 242 | NO DIFFERENCE DETECTED |  |
| BER-HH | H3c | exploratory | Delta = theta_BER - theta_HH (spearman; H3c window 2021-2023 only); independent block bootstraps, BER seed ... | 0.107 [-0.116, 0.362] | 242 | NO DIFFERENCE DETECTED |  |
| BER-HH | H3c | exploratory | Delta = theta_BER - theta_HH (spearman; H3c window 2023-2025 only); independent block bootstraps, BER seed ... | -0.024 [-0.351, 0.292] | 242 | NO DIFFERENCE DETECTED |  |

### core-3M: Berlin T = S3 (non-unemployed recipients); construct gap 5 applies (§3.2)

| City | Hyp | Role | Operationalisation | Estimate [95% CI] | n | Verdict | Flags |
|---|---|---|---|---|---|---|---|
| BER | H1 | sensitivity | category OA 2025 (44 common fixed features, flagged cells imputed in-fold) => K_2025 > 0; GroupKFold by spa... | 0.784 [0.692, 0.861] | 143 | SUPPORTED |  |
| BER | H1a | sensitivity | Spearman(OA category Cafe 2025, K_2025), min-base flag dropped | -0.253 [-0.451, -0.059] | 130 | SUPPORTED |  |
| BER | H1b | sensitivity | Spearman(OA category Fast Food 2025, K_2025), min-base flag dropped | 0.546 [0.385, 0.686] | 130 | SUPPORTED |  |
| BER | H1c | sensitivity | Spearman(OA domain Sports and Recreation 2025, K_2025), min-base flag dropped | 0.334 [0.118, 0.533] | 143 | CONTRADICTED |  |
| BER | H2 | sensitivity | category OA at window start (42 common fixed features) => dK_W > 0, W1-W3 pooled; GroupKFold by spatial block | 0.641 [0.574, 0.709] | 429 | SUPPORTED | ewr_2022_interpolated |
| BER | H3a | sensitivity | partial Spearman(g(c)_P, dK_F | dK_P, K_pivot), pivots 2021 and 2023 pooled | 0.033 [-0.096, 0.145] | 286 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | H3b | sensitivity | partial Spearman(dK_P, g(c)_F | g(c)_P, K_start(P)), pivots 2021 and 2023 pooled | -0.038 [-0.159, 0.080] | 286 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | H3c | sensitivity | Spearman(g(c)_W, dK_W), same window, W1-W3 pooled | 0.016 [-0.086, 0.131] | 429 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | N1 | sensitivity | H3a restricted to units with K_pivot above the city's median at the pivot (partial Spearman(g(c)_P, dK_F | ... | – [–, –] | 142 | NO DATA | ewr_2022_interpolated |
| BER | N2 | sensitivity | partial Spearman(Delta r_P, dK_F | dK_P, K_pivot), r = ln((Cafe + 0.5) / (Fast Food + 0.5)); units passing ... | -0.002 [-0.151, 0.137] | 243 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | N3 | sensitivity | partial Spearman(Wg(c)_P, dK_F | g(c)_P, dK_P, K_pivot); W = row-standardised queen contiguity of the match... | -0.024 [-0.135, 0.093] | 286 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER-HH | H1 | sensitivity | Delta = theta_BER - theta_HH (oof_auc_logit; category OA 2025 (44 common fixed features, flagged cells impu... | 0.030 [-0.099, 0.160] | 242 | NO DIFFERENCE DETECTED |  |
| BER-HH | H1a | sensitivity | Delta = theta_BER - theta_HH (spearman; Spearman(OA category Cafe 2025, K_2025), min-base flag dropped); in... | 0.233 [-0.113, 0.524] | 197 | NO DIFFERENCE DETECTED |  |
| BER-HH | H1b | sensitivity | Delta = theta_BER - theta_HH (spearman; Spearman(OA category Fast Food 2025, K_2025), min-base flag dropped... | -0.136 [-0.359, 0.103] | 197 | NO DIFFERENCE DETECTED |  |
| BER-HH | H1c | sensitivity | Delta = theta_BER - theta_HH (spearman; Spearman(OA domain Sports and Recreation 2025, K_2025), min-base fl... | 0.166 [-0.135, 0.514] | 242 | NO DIFFERENCE DETECTED |  |
| BER-HH | H2 | sensitivity | Delta = theta_BER - theta_HH (oof_auc_logit; category OA at window start (42 common fixed features) => dK_W... | 0.133 [0.035, 0.238] | 726 | DIFFERS | ewr_2022_interpolated |
| BER-HH | H3a | sensitivity | Delta = theta_BER - theta_HH (partial_spearman; partial Spearman(g(c)_P, dK_F | dK_P, K_pivot), pivots 2021... | -0.015 [-0.239, 0.186] | 484 | NO DIFFERENCE DETECTED | ewr_2022_interpolated |
| BER-HH | H3b | sensitivity | Delta = theta_BER - theta_HH (partial_spearman; partial Spearman(dK_P, g(c)_F | g(c)_P, K_start(P)), pivots... | 0.033 [-0.173, 0.243] | 484 | NO DIFFERENCE DETECTED | ewr_2022_interpolated |
| BER-HH | H3c | sensitivity | Delta = theta_BER - theta_HH (spearman; Spearman(g(c)_W, dK_W), same window, W1-W3 pooled); independent blo... | -0.005 [-0.165, 0.150] | 726 | NO DIFFERENCE DETECTED | ewr_2022_interpolated |

### core-2: U + C, without the transfer indicator (§3.2; the T-free construct, D8)

| City | Hyp | Role | Operationalisation | Estimate [95% CI] | n | Verdict | Flags |
|---|---|---|---|---|---|---|---|
| BER | H1 | sensitivity | category OA 2025 (44 common fixed features, flagged cells imputed in-fold) => K_2025 > 0; GroupKFold by spa... | 0.731 [0.616, 0.827] | 143 | SUPPORTED |  |
| BER | H1a | sensitivity | Spearman(OA category Cafe 2025, K_2025), min-base flag dropped | -0.273 [-0.466, -0.083] | 130 | SUPPORTED |  |
| BER | H1b | sensitivity | Spearman(OA category Fast Food 2025, K_2025), min-base flag dropped | 0.568 [0.412, 0.700] | 130 | SUPPORTED |  |
| BER | H1c | sensitivity | Spearman(OA domain Sports and Recreation 2025, K_2025), min-base flag dropped | 0.340 [0.127, 0.536] | 143 | CONTRADICTED |  |
| BER | H2 | sensitivity | category OA at window start (42 common fixed features) => dK_W > 0, W1-W3 pooled; GroupKFold by spatial block | 0.504 [0.450, 0.565] | 429 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | H3a | sensitivity | partial Spearman(g(c)_P, dK_F | dK_P, K_pivot), pivots 2021 and 2023 pooled | 0.039 [-0.101, 0.158] | 286 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | H3b | sensitivity | partial Spearman(dK_P, g(c)_F | g(c)_P, K_start(P)), pivots 2021 and 2023 pooled | -0.032 [-0.161, 0.086] | 286 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | H3c | sensitivity | Spearman(g(c)_W, dK_W), same window, W1-W3 pooled | 0.039 [-0.047, 0.143] | 429 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | N1 | sensitivity | H3a restricted to units with K_pivot above the city's median at the pivot (partial Spearman(g(c)_P, dK_F | ... | – [–, –] | 142 | NO DATA | ewr_2022_interpolated |
| BER | N2 | sensitivity | partial Spearman(Delta r_P, dK_F | dK_P, K_pivot), r = ln((Cafe + 0.5) / (Fast Food + 0.5)); units passing ... | -0.011 [-0.144, 0.120] | 243 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | N3 | sensitivity | partial Spearman(Wg(c)_P, dK_F | g(c)_P, dK_P, K_pivot); W = row-standardised queen contiguity of the match... | -0.008 [-0.150, 0.132] | 286 | NOT SIGNIFICANT | ewr_2022_interpolated |
| HH | H1 | sensitivity | category OA 2025 (44 common fixed features, flagged cells imputed in-fold) => K_2025 > 0; GroupKFold by spa... | 0.727 [0.600, 0.830] | 99 | SUPPORTED |  |
| HH | H1a | sensitivity | Spearman(OA category Cafe 2025, K_2025), min-base flag dropped | -0.475 [-0.692, -0.178] | 67 | SUPPORTED |  |
| HH | H1b | sensitivity | Spearman(OA category Fast Food 2025, K_2025), min-base flag dropped | 0.672 [0.483, 0.801] | 67 | SUPPORTED |  |
| HH | H1c | sensitivity | Spearman(OA domain Sports and Recreation 2025, K_2025), min-base flag dropped | 0.168 [-0.084, 0.406] | 99 | NOT SIGNIFICANT |  |
| HH | H2 | sensitivity | category OA at window start (42 common fixed features) => dK_W > 0, W1-W3 pooled; GroupKFold by spatial block | 0.511 [0.451, 0.565] | 297 | NOT SIGNIFICANT |  |
| HH | H3a | sensitivity | partial Spearman(g(c)_P, dK_F | dK_P, K_pivot), pivots 2021 and 2023 pooled | 0.022 [-0.146, 0.197] | 198 | NOT SIGNIFICANT |  |
| HH | H3b | sensitivity | partial Spearman(dK_P, g(c)_F | g(c)_P, K_start(P)), pivots 2021 and 2023 pooled | -0.049 [-0.218, 0.133] | 198 | NOT SIGNIFICANT |  |
| HH | H3c | sensitivity | Spearman(g(c)_W, dK_W), same window, W1-W3 pooled | 0.021 [-0.075, 0.126] | 297 | NOT SIGNIFICANT |  |
| HH | N1 | sensitivity | H3a restricted to units with K_pivot above the city's median at the pivot (partial Spearman(g(c)_P, dK_F | ... | -0.058 [-0.297, 0.156] | 98 | NOT SIGNIFICANT |  |
| HH | N2 | sensitivity | partial Spearman(Delta r_P, dK_F | dK_P, K_pivot), r = ln((Cafe + 0.5) / (Fast Food + 0.5)); units passing ... | 0.152 [-0.025, 0.346] | 126 | NOT SIGNIFICANT |  |
| HH | N3 | sensitivity | partial Spearman(Wg(c)_P, dK_F | g(c)_P, dK_P, K_pivot); W = row-standardised queen contiguity of the match... | -0.069 [-0.245, 0.108] | 198 | NOT SIGNIFICANT |  |
| BER-HH | H1 | sensitivity | Delta = theta_BER - theta_HH (oof_auc_logit; category OA 2025 (44 common fixed features, flagged cells impu... | 0.005 [-0.148, 0.163] | 242 | NO DIFFERENCE DETECTED |  |
| BER-HH | H1a | sensitivity | Delta = theta_BER - theta_HH (spearman; Spearman(OA category Cafe 2025, K_2025), min-base flag dropped); in... | 0.201 [-0.143, 0.493] | 197 | NO DIFFERENCE DETECTED |  |
| BER-HH | H1b | sensitivity | Delta = theta_BER - theta_HH (spearman; Spearman(OA category Fast Food 2025, K_2025), min-base flag dropped... | -0.104 [-0.322, 0.134] | 197 | NO DIFFERENCE DETECTED |  |
| BER-HH | H1c | sensitivity | Delta = theta_BER - theta_HH (spearman; Spearman(OA domain Sports and Recreation 2025, K_2025), min-base fl... | 0.172 [-0.133, 0.512] | 242 | NO DIFFERENCE DETECTED |  |
| BER-HH | H2 | sensitivity | Delta = theta_BER - theta_HH (oof_auc_logit; category OA at window start (42 common fixed features) => dK_W... | -0.007 [-0.083, 0.078] | 726 | NO DIFFERENCE DETECTED | ewr_2022_interpolated |
| BER-HH | H3a | sensitivity | Delta = theta_BER - theta_HH (partial_spearman; partial Spearman(g(c)_P, dK_F | dK_P, K_pivot), pivots 2021... | 0.017 [-0.202, 0.221] | 484 | NO DIFFERENCE DETECTED | ewr_2022_interpolated |
| BER-HH | H3b | sensitivity | Delta = theta_BER - theta_HH (partial_spearman; partial Spearman(dK_P, g(c)_F | g(c)_P, K_start(P)), pivots... | 0.018 [-0.201, 0.228] | 484 | NO DIFFERENCE DETECTED | ewr_2022_interpolated |
| BER-HH | H3c | sensitivity | Delta = theta_BER - theta_HH (spearman; Spearman(g(c)_W, dK_W), same window, W1-W3 pooled); independent blo... | 0.017 [-0.118, 0.155] | 726 | NO DIFFERENCE DETECTED | ewr_2022_interpolated |

### size overlap: units with at least 5,000 residents in both cities (§2.2; A4.1)

| City | Hyp | Role | Operationalisation | Estimate [95% CI] | n | Verdict | Flags |
|---|---|---|---|---|---|---|---|
| BER | H1 | sensitivity | category OA 2025 (44 common fixed features, flagged cells imputed in-fold) => K_2025 > 0; GroupKFold by spa... | 0.721 [0.631, 0.802] | 141 | SUPPORTED |  |
| BER | H1a | sensitivity | Spearman(OA category Cafe 2025, K_2025), min-base flag dropped | -0.254 [-0.456, -0.055] | 129 | SUPPORTED |  |
| BER | H1b | sensitivity | Spearman(OA category Fast Food 2025, K_2025), min-base flag dropped | 0.536 [0.373, 0.677] | 129 | SUPPORTED |  |
| BER | H1c | sensitivity | Spearman(OA domain Sports and Recreation 2025, K_2025), min-base flag dropped | 0.334 [0.125, 0.532] | 141 | CONTRADICTED |  |
| BER | H2 | sensitivity | category OA at window start (42 common fixed features) => dK_W > 0, W1-W3 pooled; GroupKFold by spatial block | 0.553 [0.488, 0.616] | 423 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | H3a | sensitivity | partial Spearman(g(c)_P, dK_F | dK_P, K_pivot), pivots 2021 and 2023 pooled | 0.045 [-0.079, 0.157] | 282 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | H3b | sensitivity | partial Spearman(dK_P, g(c)_F | g(c)_P, K_start(P)), pivots 2021 and 2023 pooled | -0.052 [-0.172, 0.057] | 282 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | H3c | sensitivity | Spearman(g(c)_W, dK_W), same window, W1-W3 pooled | 0.032 [-0.054, 0.134] | 423 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | N1 | sensitivity | H3a restricted to units with K_pivot above the city's median at the pivot (partial Spearman(g(c)_P, dK_F | ... | – [–, –] | 140 | NO DATA | ewr_2022_interpolated |
| BER | N2 | sensitivity | partial Spearman(Delta r_P, dK_F | dK_P, K_pivot), r = ln((Cafe + 0.5) / (Fast Food + 0.5)); units passing ... | -0.006 [-0.141, 0.129] | 243 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | N3 | sensitivity | partial Spearman(Wg(c)_P, dK_F | g(c)_P, dK_P, K_pivot); W = row-standardised queen contiguity of the match... | -0.016 [-0.128, 0.103] | 282 | NOT SIGNIFICANT | ewr_2022_interpolated |
| HH | H1 | sensitivity | category OA 2025 (44 common fixed features, flagged cells imputed in-fold) => K_2025 > 0; GroupKFold by spa... | 0.773 [0.641, 0.872] | 77 | SUPPORTED |  |
| HH | H1a | sensitivity | Spearman(OA category Cafe 2025, K_2025), min-base flag dropped | -0.556 [-0.709, -0.321] | 65 | SUPPORTED |  |
| HH | H1b | sensitivity | Spearman(OA category Fast Food 2025, K_2025), min-base flag dropped | 0.729 [0.558, 0.827] | 65 | SUPPORTED |  |
| HH | H1c | sensitivity | Spearman(OA domain Sports and Recreation 2025, K_2025), min-base flag dropped | 0.196 [-0.018, 0.402] | 77 | NOT SIGNIFICANT |  |
| HH | H2 | sensitivity | category OA at window start (42 common fixed features) => dK_W > 0, W1-W3 pooled; GroupKFold by spatial block | 0.496 [0.419, 0.568] | 231 | NOT SIGNIFICANT |  |
| HH | H3a | sensitivity | partial Spearman(g(c)_P, dK_F | dK_P, K_pivot), pivots 2021 and 2023 pooled | -0.025 [-0.158, 0.140] | 154 | NOT SIGNIFICANT |  |
| HH | H3b | sensitivity | partial Spearman(dK_P, g(c)_F | g(c)_P, K_start(P)), pivots 2021 and 2023 pooled | -0.007 [-0.168, 0.144] | 154 | NOT SIGNIFICANT |  |
| HH | H3c | sensitivity | Spearman(g(c)_W, dK_W), same window, W1-W3 pooled | -0.033 [-0.157, 0.087] | 231 | NOT SIGNIFICANT |  |
| HH | N1 | sensitivity | H3a restricted to units with K_pivot above the city's median at the pivot (partial Spearman(g(c)_P, dK_F | ... | – [–, –] | 76 | NO DATA |  |
| HH | N2 | sensitivity | partial Spearman(Delta r_P, dK_F | dK_P, K_pivot), r = ln((Cafe + 0.5) / (Fast Food + 0.5)); units passing ... | 0.149 [-0.022, 0.323] | 123 | NOT SIGNIFICANT |  |
| HH | N3 | sensitivity | partial Spearman(Wg(c)_P, dK_F | g(c)_P, dK_P, K_pivot); W = row-standardised queen contiguity of the match... | 0.020 [-0.153, 0.191] | 154 | NOT SIGNIFICANT |  |
| BER-HH | H1 | sensitivity | Delta = theta_BER - theta_HH (oof_auc_logit; category OA 2025 (44 common fixed features, flagged cells impu... | -0.052 [-0.191, 0.111] | 218 | NO DIFFERENCE DETECTED |  |
| BER-HH | H1a | sensitivity | Delta = theta_BER - theta_HH (spearman; Spearman(OA category Cafe 2025, K_2025), min-base flag dropped); in... | 0.303 [-0.015, 0.558] | 194 | NO DIFFERENCE DETECTED |  |
| BER-HH | H1b | sensitivity | Delta = theta_BER - theta_HH (spearman; Spearman(OA category Fast Food 2025, K_2025), min-base flag dropped... | -0.193 [-0.387, 0.022] | 194 | NO DIFFERENCE DETECTED |  |
| BER-HH | H1c | sensitivity | Delta = theta_BER - theta_HH (spearman; Spearman(OA domain Sports and Recreation 2025, K_2025), min-base fl... | 0.138 [-0.154, 0.442] | 218 | NO DIFFERENCE DETECTED |  |
| BER-HH | H2 | sensitivity | Delta = theta_BER - theta_HH (oof_auc_logit; category OA at window start (42 common fixed features) => dK_W... | 0.057 [-0.038, 0.163] | 654 | NO DIFFERENCE DETECTED | ewr_2022_interpolated;amendment3_below_chance |
| BER-HH | H3a | sensitivity | Delta = theta_BER - theta_HH (partial_spearman; partial Spearman(g(c)_P, dK_F | dK_P, K_pivot), pivots 2021... | 0.070 [-0.136, 0.252] | 436 | NO DIFFERENCE DETECTED | ewr_2022_interpolated |
| BER-HH | H3b | sensitivity | Delta = theta_BER - theta_HH (partial_spearman; partial Spearman(dK_P, g(c)_F | g(c)_P, K_start(P)), pivots... | -0.045 [-0.248, 0.148] | 436 | NO DIFFERENCE DETECTED | ewr_2022_interpolated |
| BER-HH | H3c | sensitivity | Delta = theta_BER - theta_HH (spearman; Spearman(g(c)_W, dK_W), same window, W1-W3 pooled); independent blo... | 0.066 [-0.087, 0.235] | 654 | NO DIFFERENCE DETECTED | ewr_2022_interpolated |

### W24: Berlin 31.12.2024 population weights and age bands for every edition, f per edition (A4.1, E5, E6)

| City | Hyp | Role | Operationalisation | Estimate [95% CI] | n | Verdict | Flags |
|---|---|---|---|---|---|---|---|
| BER | H1 | sensitivity | category OA 2025 (44 common fixed features, flagged cells imputed in-fold) => K_2025 > 0; GroupKFold by spa... | 0.784 [0.692, 0.861] | 143 | SUPPORTED |  |
| BER | H1a | sensitivity | Spearman(OA category Cafe 2025, K_2025), min-base flag dropped | -0.249 [-0.452, -0.054] | 130 | SUPPORTED |  |
| BER | H1b | sensitivity | Spearman(OA category Fast Food 2025, K_2025), min-base flag dropped | 0.546 [0.385, 0.686] | 130 | SUPPORTED |  |
| BER | H1c | sensitivity | Spearman(OA domain Sports and Recreation 2025, K_2025), min-base flag dropped | 0.334 [0.119, 0.534] | 143 | CONTRADICTED |  |
| BER | H2 | sensitivity | category OA at window start (42 common fixed features) => dK_W > 0, W1-W3 pooled; GroupKFold by spatial block | 0.613 [0.548, 0.681] | 429 | SUPPORTED |  |
| BER | H3a | sensitivity | partial Spearman(g(c)_P, dK_F | dK_P, K_pivot), pivots 2021 and 2023 pooled | -0.001 [-0.114, 0.097] | 286 | NOT SIGNIFICANT |  |
| BER | H3b | sensitivity | partial Spearman(dK_P, g(c)_F | g(c)_P, K_start(P)), pivots 2021 and 2023 pooled | -0.024 [-0.143, 0.085] | 286 | NOT SIGNIFICANT |  |
| BER | H3c | sensitivity | Spearman(g(c)_W, dK_W), same window, W1-W3 pooled | 0.017 [-0.073, 0.128] | 429 | NOT SIGNIFICANT |  |
| BER | N1 | sensitivity | H3a restricted to units with K_pivot above the city's median at the pivot (partial Spearman(g(c)_P, dK_F | ... | – [–, –] | 142 | NO DATA |  |
| BER | N2 | sensitivity | partial Spearman(Delta r_P, dK_F | dK_P, K_pivot), r = ln((Cafe + 0.5) / (Fast Food + 0.5)); units passing ... | 0.024 [-0.134, 0.181] | 243 | NOT SIGNIFICANT |  |
| BER | N3 | sensitivity | partial Spearman(Wg(c)_P, dK_F | g(c)_P, dK_P, K_pivot); W = row-standardised queen contiguity of the match... | -0.009 [-0.123, 0.111] | 286 | NOT SIGNIFICANT |  |
| BER-HH | H1 | sensitivity | Delta = theta_BER - theta_HH (oof_auc_logit; category OA 2025 (44 common fixed features, flagged cells impu... | 0.030 [-0.099, 0.160] | 242 | NO DIFFERENCE DETECTED |  |
| BER-HH | H1a | sensitivity | Delta = theta_BER - theta_HH (spearman; Spearman(OA category Cafe 2025, K_2025), min-base flag dropped); in... | 0.236 [-0.112, 0.528] | 197 | NO DIFFERENCE DETECTED |  |
| BER-HH | H1b | sensitivity | Delta = theta_BER - theta_HH (spearman; Spearman(OA category Fast Food 2025, K_2025), min-base flag dropped... | -0.136 [-0.357, 0.102] | 197 | NO DIFFERENCE DETECTED |  |
| BER-HH | H1c | sensitivity | Delta = theta_BER - theta_HH (spearman; Spearman(OA domain Sports and Recreation 2025, K_2025), min-base fl... | 0.165 [-0.135, 0.515] | 242 | NO DIFFERENCE DETECTED |  |
| BER-HH | H2 | sensitivity | Delta = theta_BER - theta_HH (oof_auc_logit; category OA at window start (42 common fixed features) => dK_W... | 0.105 [0.015, 0.213] | 726 | DIFFERS |  |
| BER-HH | H3a | sensitivity | Delta = theta_BER - theta_HH (partial_spearman; partial Spearman(g(c)_P, dK_F | dK_P, K_pivot), pivots 2021... | -0.048 [-0.261, 0.144] | 484 | NO DIFFERENCE DETECTED |  |
| BER-HH | H3b | sensitivity | Delta = theta_BER - theta_HH (partial_spearman; partial Spearman(dK_P, g(c)_F | g(c)_P, K_start(P)), pivots... | 0.046 [-0.158, 0.243] | 484 | NO DIFFERENCE DETECTED |  |
| BER-HH | H3c | sensitivity | Delta = theta_BER - theta_HH (spearman; Spearman(g(c)_W, dK_W), same window, W1-W3 pooled); independent blo... | -0.003 [-0.157, 0.145] | 726 | NO DIFFERENCE DETECTED |  |

### M3: Berlin 2022 aggregation weights from 31.12.2020 only (PM decision M3)

| City | Hyp | Role | Operationalisation | Estimate [95% CI] | n | Verdict | Flags |
|---|---|---|---|---|---|---|---|
| BER | H1 | sensitivity | category OA 2025 (44 common fixed features, flagged cells imputed in-fold) => K_2025 > 0; GroupKFold by spa... | 0.784 [0.692, 0.861] | 143 | SUPPORTED |  |
| BER | H1a | sensitivity | Spearman(OA category Cafe 2025, K_2025), min-base flag dropped | -0.249 [-0.452, -0.054] | 130 | SUPPORTED |  |
| BER | H1b | sensitivity | Spearman(OA category Fast Food 2025, K_2025), min-base flag dropped | 0.546 [0.385, 0.686] | 130 | SUPPORTED |  |
| BER | H1c | sensitivity | Spearman(OA domain Sports and Recreation 2025, K_2025), min-base flag dropped | 0.334 [0.119, 0.534] | 143 | CONTRADICTED |  |
| BER | H2 | sensitivity | category OA at window start (42 common fixed features) => dK_W > 0, W1-W3 pooled; GroupKFold by spatial block | 0.555 [0.492, 0.620] | 429 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | H3a | sensitivity | partial Spearman(g(c)_P, dK_F | dK_P, K_pivot), pivots 2021 and 2023 pooled | 0.007 [-0.120, 0.126] | 286 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | H3b | sensitivity | partial Spearman(dK_P, g(c)_F | g(c)_P, K_start(P)), pivots 2021 and 2023 pooled | -0.021 [-0.152, 0.103] | 286 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | H3c | sensitivity | Spearman(g(c)_W, dK_W), same window, W1-W3 pooled | 0.016 [-0.073, 0.121] | 429 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | N1 | sensitivity | H3a restricted to units with K_pivot above the city's median at the pivot (partial Spearman(g(c)_P, dK_F | ... | – [–, –] | 142 | NO DATA | ewr_2022_interpolated |
| BER | N2 | sensitivity | partial Spearman(Delta r_P, dK_F | dK_P, K_pivot), r = ln((Cafe + 0.5) / (Fast Food + 0.5)); units passing ... | -0.026 [-0.170, 0.119] | 243 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | N3 | sensitivity | partial Spearman(Wg(c)_P, dK_F | g(c)_P, dK_P, K_pivot); W = row-standardised queen contiguity of the match... | -0.001 [-0.133, 0.129] | 286 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER-HH | H1 | sensitivity | Delta = theta_BER - theta_HH (oof_auc_logit; category OA 2025 (44 common fixed features, flagged cells impu... | 0.030 [-0.099, 0.160] | 242 | NO DIFFERENCE DETECTED |  |
| BER-HH | H1a | sensitivity | Delta = theta_BER - theta_HH (spearman; Spearman(OA category Cafe 2025, K_2025), min-base flag dropped); in... | 0.236 [-0.112, 0.528] | 197 | NO DIFFERENCE DETECTED |  |
| BER-HH | H1b | sensitivity | Delta = theta_BER - theta_HH (spearman; Spearman(OA category Fast Food 2025, K_2025), min-base flag dropped... | -0.136 [-0.357, 0.102] | 197 | NO DIFFERENCE DETECTED |  |
| BER-HH | H1c | sensitivity | Delta = theta_BER - theta_HH (spearman; Spearman(OA domain Sports and Recreation 2025, K_2025), min-base fl... | 0.165 [-0.135, 0.515] | 242 | NO DIFFERENCE DETECTED |  |
| BER-HH | H2 | sensitivity | Delta = theta_BER - theta_HH (oof_auc_logit; category OA at window start (42 common fixed features) => dK_W... | 0.047 [-0.047, 0.151] | 726 | NO DIFFERENCE DETECTED | ewr_2022_interpolated |
| BER-HH | H3a | sensitivity | Delta = theta_BER - theta_HH (partial_spearman; partial Spearman(g(c)_P, dK_F | dK_P, K_pivot), pivots 2021... | -0.040 [-0.254, 0.163] | 484 | NO DIFFERENCE DETECTED | ewr_2022_interpolated |
| BER-HH | H3b | sensitivity | Delta = theta_BER - theta_HH (partial_spearman; partial Spearman(dK_P, g(c)_F | g(c)_P, K_start(P)), pivots... | 0.050 [-0.163, 0.260] | 484 | NO DIFFERENCE DETECTED | ewr_2022_interpolated |
| BER-HH | H3c | sensitivity | Delta = theta_BER - theta_HH (spearman; Spearman(g(c)_W, dK_W), same window, W1-W3 pooled); independent blo... | -0.004 [-0.157, 0.143] | 726 | NO DIFFERENCE DETECTED | ewr_2022_interpolated |

### Berlin age-specific denominators as weights: U by P(15 to RAG), C by P(<15) (§3.4)

| City | Hyp | Role | Operationalisation | Estimate [95% CI] | n | Verdict | Flags |
|---|---|---|---|---|---|---|---|
| BER | H1 | sensitivity | category OA 2025 (44 common fixed features, flagged cells imputed in-fold) => K_2025 > 0; GroupKFold by spa... | 0.784 [0.692, 0.861] | 143 | SUPPORTED |  |
| BER | H1a | sensitivity | Spearman(OA category Cafe 2025, K_2025), min-base flag dropped | -0.249 [-0.453, -0.055] | 130 | SUPPORTED |  |
| BER | H1b | sensitivity | Spearman(OA category Fast Food 2025, K_2025), min-base flag dropped | 0.546 [0.386, 0.685] | 130 | SUPPORTED |  |
| BER | H1c | sensitivity | Spearman(OA domain Sports and Recreation 2025, K_2025), min-base flag dropped | 0.332 [0.115, 0.531] | 143 | CONTRADICTED |  |
| BER | H2 | sensitivity | category OA at window start (42 common fixed features) => dK_W > 0, W1-W3 pooled; GroupKFold by spatial block | 0.568 [0.505, 0.631] | 429 | SUPPORTED | ewr_2022_interpolated |
| BER | H3a | sensitivity | partial Spearman(g(c)_P, dK_F | dK_P, K_pivot), pivots 2021 and 2023 pooled | 0.036 [-0.091, 0.151] | 286 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | H3b | sensitivity | partial Spearman(dK_P, g(c)_F | g(c)_P, K_start(P)), pivots 2021 and 2023 pooled | -0.041 [-0.172, 0.080] | 286 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | H3c | sensitivity | Spearman(g(c)_W, dK_W), same window, W1-W3 pooled | 0.021 [-0.066, 0.128] | 429 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | N1 | sensitivity | H3a restricted to units with K_pivot above the city's median at the pivot (partial Spearman(g(c)_P, dK_F | ... | – [–, –] | 142 | NO DATA | ewr_2022_interpolated |
| BER | N2 | sensitivity | partial Spearman(Delta r_P, dK_F | dK_P, K_pivot), r = ln((Cafe + 0.5) / (Fast Food + 0.5)); units passing ... | -0.007 [-0.146, 0.129] | 243 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | N3 | sensitivity | partial Spearman(Wg(c)_P, dK_F | g(c)_P, dK_P, K_pivot); W = row-standardised queen contiguity of the match... | -0.023 [-0.136, 0.101] | 286 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER-HH | H1 | sensitivity | Delta = theta_BER - theta_HH (oof_auc_logit; category OA 2025 (44 common fixed features, flagged cells impu... | 0.030 [-0.099, 0.160] | 242 | NO DIFFERENCE DETECTED |  |
| BER-HH | H1a | sensitivity | Delta = theta_BER - theta_HH (spearman; Spearman(OA category Cafe 2025, K_2025), min-base flag dropped); in... | 0.237 [-0.110, 0.527] | 197 | NO DIFFERENCE DETECTED |  |
| BER-HH | H1b | sensitivity | Delta = theta_BER - theta_HH (spearman; Spearman(OA category Fast Food 2025, K_2025), min-base flag dropped... | -0.136 [-0.359, 0.103] | 197 | NO DIFFERENCE DETECTED |  |
| BER-HH | H1c | sensitivity | Delta = theta_BER - theta_HH (spearman; Spearman(OA domain Sports and Recreation 2025, K_2025), min-base fl... | 0.164 [-0.138, 0.510] | 242 | NO DIFFERENCE DETECTED |  |
| BER-HH | H2 | sensitivity | Delta = theta_BER - theta_HH (oof_auc_logit; category OA at window start (42 common fixed features) => dK_W... | 0.060 [-0.037, 0.161] | 726 | NO DIFFERENCE DETECTED | ewr_2022_interpolated |
| BER-HH | H3a | sensitivity | Delta = theta_BER - theta_HH (partial_spearman; partial Spearman(g(c)_P, dK_F | dK_P, K_pivot), pivots 2021... | -0.011 [-0.229, 0.188] | 484 | NO DIFFERENCE DETECTED | ewr_2022_interpolated |
| BER-HH | H3b | sensitivity | Delta = theta_BER - theta_HH (partial_spearman; partial Spearman(dK_P, g(c)_F | g(c)_P, K_start(P)), pivots... | 0.030 [-0.188, 0.240] | 484 | NO DIFFERENCE DETECTED | ewr_2022_interpolated |
| BER-HH | H3c | sensitivity | Delta = theta_BER - theta_HH (spearman; Spearman(g(c)_W, dK_W), same window, W1-W3 pooled); independent blo... | 0.000 [-0.153, 0.149] | 726 | NO DIFFERENCE DETECTED | ewr_2022_interpolated |

### R19-pub: Hamburg S3 2019 as published (A4 rev. 1 E1)

| City | Hyp | Role | Operationalisation | Estimate [95% CI] | n | Verdict | Flags |
|---|---|---|---|---|---|---|---|
| HH | H2 | sensitivity | category OA at window start (42 common fixed features) => dK_W > 0, W1-W3 pooled; GroupKFold by spatial block | 0.512 [0.430, 0.582] | 297 | NOT SIGNIFICANT |  |
| HH | H3a | sensitivity | partial Spearman(g(c)_P, dK_F | dK_P, K_pivot), pivots 2021 and 2023 pooled | 0.049 [-0.114, 0.223] | 198 | NOT SIGNIFICANT |  |
| HH | H3b | sensitivity | partial Spearman(dK_P, g(c)_F | g(c)_P, K_start(P)), pivots 2021 and 2023 pooled | -0.074 [-0.241, 0.096] | 198 | NOT SIGNIFICANT |  |
| HH | H3c | sensitivity | Spearman(g(c)_W, dK_W), same window, W1-W3 pooled | 0.026 [-0.086, 0.152] | 297 | NOT SIGNIFICANT |  |
| HH | N1 | sensitivity | H3a restricted to units with K_pivot above the city's median at the pivot (partial Spearman(g(c)_P, dK_F | ... | 0.015 [-0.199, 0.235] | 98 | NOT SIGNIFICANT |  |
| HH | N2 | sensitivity | partial Spearman(Delta r_P, dK_F | dK_P, K_pivot), r = ln((Cafe + 0.5) / (Fast Food + 0.5)); units passing ... | 0.130 [-0.048, 0.310] | 126 | NOT SIGNIFICANT |  |
| HH | N3 | sensitivity | partial Spearman(Wg(c)_P, dK_F | g(c)_P, dK_P, K_pivot); W = row-standardised queen contiguity of the match... | -0.054 [-0.212, 0.113] | 198 | NOT SIGNIFICANT |  |
| BER-HH | H2 | sensitivity | Delta = theta_BER - theta_HH (oof_auc_logit; category OA at window start (42 common fixed features) => dK_W... | 0.070 [-0.024, 0.173] | 726 | NO DIFFERENCE DETECTED | ewr_2022_interpolated |
| BER-HH | H3a | sensitivity | Delta = theta_BER - theta_HH (partial_spearman; partial Spearman(g(c)_P, dK_F | dK_P, K_pivot), pivots 2021... | -0.013 [-0.232, 0.188] | 484 | NO DIFFERENCE DETECTED | ewr_2022_interpolated |
| BER-HH | H3b | sensitivity | Delta = theta_BER - theta_HH (partial_spearman; partial Spearman(dK_P, g(c)_F | g(c)_P, K_start(P)), pivots... | 0.037 [-0.177, 0.248] | 484 | NO DIFFERENCE DETECTED | ewr_2022_interpolated |
| BER-HH | H3c | sensitivity | Delta = theta_BER - theta_HH (spearman; Spearman(g(c)_W, dK_W), same window, W1-W3 pooled); independent blo... | 0.000 [-0.154, 0.149] | 726 | NO DIFFERENCE DETECTED | ewr_2022_interpolated |

### core-3M under R19-pub (A4 rev. 1 E2)

| City | Hyp | Role | Operationalisation | Estimate [95% CI] | n | Verdict | Flags |
|---|---|---|---|---|---|---|---|
| BER-HH | H2 | sensitivity | Delta = theta_BER - theta_HH (oof_auc_logit; category OA at window start (42 common fixed features) => dK_W... | 0.129 [0.029, 0.234] | 726 | DIFFERS | ewr_2022_interpolated |
| BER-HH | H3a | sensitivity | Delta = theta_BER - theta_HH (partial_spearman; partial Spearman(g(c)_P, dK_F | dK_P, K_pivot), pivots 2021... | -0.016 [-0.240, 0.182] | 484 | NO DIFFERENCE DETECTED | ewr_2022_interpolated |
| BER-HH | H3b | sensitivity | Delta = theta_BER - theta_HH (partial_spearman; partial Spearman(dK_P, g(c)_F | g(c)_P, K_start(P)), pivots... | 0.036 [-0.170, 0.249] | 484 | NO DIFFERENCE DETECTED | ewr_2022_interpolated |
| BER-HH | H3c | sensitivity | Delta = theta_BER - theta_HH (spearman; Spearman(g(c)_W, dK_W), same window, W1-W3 pooled); independent blo... | -0.010 [-0.169, 0.146] | 726 | NO DIFFERENCE DETECTED | ewr_2022_interpolated |

### dK from within-edition z changes for all indicators (§4.3 sensitivity)

| City | Hyp | Role | Operationalisation | Estimate [95% CI] | n | Verdict | Flags |
|---|---|---|---|---|---|---|---|
| BER | H2 | sensitivity | category OA at window start (42 common fixed features) => dK_W > 0, W1-W3 pooled; GroupKFold by spatial block | 0.542 [0.485, 0.599] | 429 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | H3a | sensitivity | partial Spearman(g(c)_P, dK_F | dK_P, K_pivot), pivots 2021 and 2023 pooled | -0.006 [-0.137, 0.108] | 286 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | H3b | sensitivity | partial Spearman(dK_P, g(c)_F | g(c)_P, K_start(P)), pivots 2021 and 2023 pooled | -0.040 [-0.192, 0.096] | 286 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | H3c | sensitivity | Spearman(g(c)_W, dK_W), same window, W1-W3 pooled | 0.046 [-0.035, 0.140] | 429 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | N1 | sensitivity | H3a restricted to units with K_pivot above the city's median at the pivot (partial Spearman(g(c)_P, dK_F | ... | – [–, –] | 142 | NO DATA | ewr_2022_interpolated |
| BER | N2 | sensitivity | partial Spearman(Delta r_P, dK_F | dK_P, K_pivot), r = ln((Cafe + 0.5) / (Fast Food + 0.5)); units passing ... | -0.033 [-0.182, 0.106] | 243 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | N3 | sensitivity | partial Spearman(Wg(c)_P, dK_F | g(c)_P, dK_P, K_pivot); W = row-standardised queen contiguity of the match... | -0.020 [-0.151, 0.116] | 286 | NOT SIGNIFICANT | ewr_2022_interpolated |
| HH | H2 | sensitivity | category OA at window start (42 common fixed features) => dK_W > 0, W1-W3 pooled; GroupKFold by spatial block | 0.543 [0.477, 0.595] | 297 | NOT SIGNIFICANT |  |
| HH | H3a | sensitivity | partial Spearman(g(c)_P, dK_F | dK_P, K_pivot), pivots 2021 and 2023 pooled | 0.044 [-0.123, 0.219] | 198 | NOT SIGNIFICANT |  |
| HH | H3b | sensitivity | partial Spearman(dK_P, g(c)_F | g(c)_P, K_start(P)), pivots 2021 and 2023 pooled | -0.068 [-0.234, 0.106] | 198 | NOT SIGNIFICANT |  |
| HH | H3c | sensitivity | Spearman(g(c)_W, dK_W), same window, W1-W3 pooled | -0.001 [-0.105, 0.115] | 297 | NOT SIGNIFICANT |  |
| HH | N1 | sensitivity | H3a restricted to units with K_pivot above the city's median at the pivot (partial Spearman(g(c)_P, dK_F | ... | 0.030 [-0.204, 0.259] | 98 | NOT SIGNIFICANT |  |
| HH | N2 | sensitivity | partial Spearman(Delta r_P, dK_F | dK_P, K_pivot), r = ln((Cafe + 0.5) / (Fast Food + 0.5)); units passing ... | 0.113 [-0.065, 0.292] | 126 | NOT SIGNIFICANT |  |
| HH | N3 | sensitivity | partial Spearman(Wg(c)_P, dK_F | g(c)_P, dK_P, K_pivot); W = row-standardised queen contiguity of the match... | -0.040 [-0.202, 0.131] | 198 | NOT SIGNIFICANT |  |
| BER-HH | H2 | sensitivity | Delta = theta_BER - theta_HH (oof_auc_logit; category OA at window start (42 common fixed features) => dK_W... | -0.001 [-0.078, 0.080] | 726 | NO DIFFERENCE DETECTED | ewr_2022_interpolated |
| BER-HH | H3a | sensitivity | Delta = theta_BER - theta_HH (partial_spearman; partial Spearman(g(c)_P, dK_F | dK_P, K_pivot), pivots 2021... | -0.050 [-0.266, 0.158] | 484 | NO DIFFERENCE DETECTED | ewr_2022_interpolated |
| BER-HH | H3b | sensitivity | Delta = theta_BER - theta_HH (partial_spearman; partial Spearman(dK_P, g(c)_F | g(c)_P, K_start(P)), pivots... | 0.028 [-0.199, 0.246] | 484 | NO DIFFERENCE DETECTED | ewr_2022_interpolated |
| BER-HH | H3c | sensitivity | Delta = theta_BER - theta_HH (spearman; Spearman(g(c)_W, dK_W), same window, W1-W3 pooled); independent blo... | 0.047 [-0.091, 0.187] | 726 | NO DIFFERENCE DETECTED | ewr_2022_interpolated |

### MAUP: Berlin PLR / Hamburg Gebiet grain (§6.5)

| City | Hyp | Role | Operationalisation | Estimate [95% CI] | n | Verdict | Flags |
|---|---|---|---|---|---|---|---|
| BER | H1 | sensitivity | category OA 2025 (12 common fixed features, flagged cells imputed in-fold) => K_2025 > 0; GroupKFold by spa... | 0.545 [0.454, 0.640] | 535 | NOT SIGNIFICANT |  |
| BER | H1a | sensitivity | Spearman(OA category Cafe 2025, K_2025), min-base flag dropped | -0.077 [-0.234, 0.039] | 260 | NOT SIGNIFICANT |  |
| BER | H1b | sensitivity | Spearman(OA category Fast Food 2025, K_2025), min-base flag dropped | 0.444 [0.300, 0.578] | 260 | SUPPORTED |  |
| BER | H1c | sensitivity | Spearman(OA domain Sports and Recreation 2025, K_2025), min-base flag dropped | 0.223 [0.096, 0.338] | 535 | CONTRADICTED |  |
| BER | H2 | sensitivity | category OA at window start (9 common fixed features) => dK_W > 0, W1-W3 pooled; GroupKFold by spatial block | 0.582 [0.547, 0.620] | 1605 | SUPPORTED | ewr_2022_interpolated |
| BER | H3a | sensitivity | partial Spearman(g(c)_P, dK_F | dK_P, K_pivot), pivots 2021 and 2023 pooled | 0.001 [-0.060, 0.056] | 1061 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | H3b | sensitivity | partial Spearman(dK_P, g(c)_F | g(c)_P, K_start(P)), pivots 2021 and 2023 pooled | -0.020 [-0.076, 0.035] | 1060 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | H3c | sensitivity | Spearman(g(c)_W, dK_W), same window, W1-W3 pooled | -0.007 [-0.066, 0.053] | 1594 | NOT SIGNIFICANT | ewr_2022_interpolated |
| HH | H1 | sensitivity | category OA 2025 (12 common fixed features, flagged cells imputed in-fold) => K_2025 > 0; GroupKFold by spa... | 0.551 [0.484, 0.603] | 849 | NOT SIGNIFICANT |  |
| HH | H1a | sensitivity | Spearman(OA category Cafe 2025, K_2025), min-base flag dropped | – [–, –] | 99 | NO DATA |  |
| HH | H1b | sensitivity | Spearman(OA category Fast Food 2025, K_2025), min-base flag dropped | – [–, –] | 99 | NO DATA |  |
| HH | H1c | sensitivity | Spearman(OA domain Sports and Recreation 2025, K_2025), min-base flag dropped | 0.148 [0.059, 0.241] | 800 | CONTRADICTED |  |
| HH | H2 | sensitivity | category OA at window start (9 common fixed features) => dK_W > 0, W1-W3 pooled; GroupKFold by spatial block | 0.506 [0.484, 0.531] | 2547 | NOT SIGNIFICANT |  |
| HH | H3a | sensitivity | partial Spearman(g(c)_P, dK_F | dK_P, K_pivot), pivots 2021 and 2023 pooled | 0.001 [-0.046, 0.059] | 1438 | NOT SIGNIFICANT |  |
| HH | H3b | sensitivity | partial Spearman(dK_P, g(c)_F | g(c)_P, K_start(P)), pivots 2021 and 2023 pooled | 0.015 [-0.042, 0.074] | 1419 | NOT SIGNIFICANT |  |
| HH | H3c | sensitivity | Spearman(g(c)_W, dK_W), same window, W1-W3 pooled | -0.005 [-0.056, 0.045] | 2159 | NOT SIGNIFICANT |  |
| BER-HH | H1 | sensitivity | Delta = theta_BER - theta_HH (oof_auc_logit; category OA 2025 (12 common fixed features, flagged cells impu... | -0.007 [-0.106, 0.111] | 1384 | NO DIFFERENCE DETECTED |  |
| BER-HH | H1a | sensitivity | Delta = theta_BER - theta_HH (spearman; Spearman(OA category Cafe 2025, K_2025), min-base flag dropped); in... | – [–, –] | 359 | NO DATA |  |
| BER-HH | H1b | sensitivity | Delta = theta_BER - theta_HH (spearman; Spearman(OA category Fast Food 2025, K_2025), min-base flag dropped... | – [–, –] | 359 | NO DATA |  |
| BER-HH | H1c | sensitivity | Delta = theta_BER - theta_HH (spearman; Spearman(OA domain Sports and Recreation 2025, K_2025), min-base fl... | 0.075 [-0.071, 0.218] | 1335 | NO DIFFERENCE DETECTED |  |
| BER-HH | H2 | sensitivity | Delta = theta_BER - theta_HH (oof_auc_logit; category OA at window start (9 common fixed features) => dK_W ... | 0.077 [0.033, 0.123] | 4152 | DIFFERS | ewr_2022_interpolated |
| BER-HH | H3a | sensitivity | Delta = theta_BER - theta_HH (partial_spearman; partial Spearman(g(c)_P, dK_F | dK_P, K_pivot), pivots 2021... | -0.000 [-0.083, 0.072] | 2499 | NO DIFFERENCE DETECTED | ewr_2022_interpolated |
| BER-HH | H3b | sensitivity | Delta = theta_BER - theta_HH (partial_spearman; partial Spearman(dK_P, g(c)_F | g(c)_P, K_start(P)), pivots... | -0.035 [-0.119, 0.040] | 2479 | NO DIFFERENCE DETECTED | ewr_2022_interpolated |
| BER-HH | H3c | sensitivity | Delta = theta_BER - theta_HH (spearman; Spearman(g(c)_W, dK_W), same window, W1-W3 pooled); independent blo... | -0.002 [-0.080, 0.079] | 3753 | NO DIFFERENCE DETECTED | ewr_2022_interpolated |

### MAUP + W24 at PLR grain (A4.1: W24 at both grains; E6)

| City | Hyp | Role | Operationalisation | Estimate [95% CI] | n | Verdict | Flags |
|---|---|---|---|---|---|---|---|
| BER | H1 | sensitivity | category OA 2025 (12 common fixed features, flagged cells imputed in-fold) => K_2025 > 0; GroupKFold by spa... | 0.545 [0.454, 0.640] | 535 | NOT SIGNIFICANT |  |
| BER | H1a | sensitivity | Spearman(OA category Cafe 2025, K_2025), min-base flag dropped | -0.077 [-0.234, 0.039] | 260 | NOT SIGNIFICANT |  |
| BER | H1b | sensitivity | Spearman(OA category Fast Food 2025, K_2025), min-base flag dropped | 0.444 [0.300, 0.578] | 260 | SUPPORTED |  |
| BER | H1c | sensitivity | Spearman(OA domain Sports and Recreation 2025, K_2025), min-base flag dropped | 0.223 [0.096, 0.338] | 535 | CONTRADICTED |  |
| BER | H2 | sensitivity | category OA at window start (9 common fixed features) => dK_W > 0, W1-W3 pooled; GroupKFold by spatial block | 0.584 [0.549, 0.622] | 1605 | SUPPORTED |  |
| BER | H3a | sensitivity | partial Spearman(g(c)_P, dK_F | dK_P, K_pivot), pivots 2021 and 2023 pooled | 0.001 [-0.060, 0.057] | 1061 | NOT SIGNIFICANT |  |
| BER | H3b | sensitivity | partial Spearman(dK_P, g(c)_F | g(c)_P, K_start(P)), pivots 2021 and 2023 pooled | -0.020 [-0.077, 0.035] | 1060 | NOT SIGNIFICANT |  |
| BER | H3c | sensitivity | Spearman(g(c)_W, dK_W), same window, W1-W3 pooled | -0.007 [-0.066, 0.052] | 1594 | NOT SIGNIFICANT |  |
| BER-HH | H1 | sensitivity | Delta = theta_BER - theta_HH (oof_auc_logit; category OA 2025 (12 common fixed features, flagged cells impu... | -0.007 [-0.106, 0.111] | 1384 | NO DIFFERENCE DETECTED |  |
| BER-HH | H1a | sensitivity | Delta = theta_BER - theta_HH (spearman; Spearman(OA category Cafe 2025, K_2025), min-base flag dropped); in... | – [–, –] | 359 | NO DATA |  |
| BER-HH | H1b | sensitivity | Delta = theta_BER - theta_HH (spearman; Spearman(OA category Fast Food 2025, K_2025), min-base flag dropped... | – [–, –] | 359 | NO DATA |  |
| BER-HH | H1c | sensitivity | Delta = theta_BER - theta_HH (spearman; Spearman(OA domain Sports and Recreation 2025, K_2025), min-base fl... | 0.075 [-0.071, 0.218] | 1335 | NO DIFFERENCE DETECTED |  |
| BER-HH | H2 | sensitivity | Delta = theta_BER - theta_HH (oof_auc_logit; category OA at window start (9 common fixed features) => dK_W ... | 0.078 [0.034, 0.125] | 4152 | DIFFERS |  |
| BER-HH | H3a | sensitivity | Delta = theta_BER - theta_HH (partial_spearman; partial Spearman(g(c)_P, dK_F | dK_P, K_pivot), pivots 2021... | 0.000 [-0.083, 0.072] | 2499 | NO DIFFERENCE DETECTED |  |
| BER-HH | H3b | sensitivity | Delta = theta_BER - theta_HH (partial_spearman; partial Spearman(dK_P, g(c)_F | g(c)_P, K_start(P)), pivots... | -0.035 [-0.120, 0.040] | 2479 | NO DIFFERENCE DETECTED |  |
| BER-HH | H3c | sensitivity | Delta = theta_BER - theta_HH (spearman; Spearman(g(c)_W, dK_W), same window, W1-W3 pooled); independent blo... | -0.002 [-0.080, 0.079] | 3753 | NO DIFFERENCE DETECTED |  |

### G = 16 blocks (§6.2)

| City | Hyp | Role | Operationalisation | Estimate [95% CI] | n | Verdict | Flags |
|---|---|---|---|---|---|---|---|
| BER | H1 | sensitivity | category OA 2025 (44 common fixed features, flagged cells imputed in-fold) => K_2025 > 0; GroupKFold by spa... | 0.784 [0.688, 0.874] | 143 | SUPPORTED |  |
| BER | H1a | sensitivity | Spearman(OA category Cafe 2025, K_2025), min-base flag dropped | -0.249 [-0.473, -0.067] | 130 | SUPPORTED |  |
| BER | H1b | sensitivity | Spearman(OA category Fast Food 2025, K_2025), min-base flag dropped | 0.546 [0.365, 0.684] | 130 | SUPPORTED |  |
| BER | H1c | sensitivity | Spearman(OA domain Sports and Recreation 2025, K_2025), min-base flag dropped | 0.334 [0.117, 0.553] | 143 | CONTRADICTED |  |
| BER | H2 | sensitivity | category OA at window start (42 common fixed features) => dK_W > 0, W1-W3 pooled; GroupKFold by spatial block | 0.582 [0.533, 0.629] | 429 | SUPPORTED | ewr_2022_interpolated |
| BER | H3a | sensitivity | partial Spearman(g(c)_P, dK_F | dK_P, K_pivot), pivots 2021 and 2023 pooled | 0.036 [-0.100, 0.174] | 286 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | H3b | sensitivity | partial Spearman(dK_P, g(c)_F | g(c)_P, K_start(P)), pivots 2021 and 2023 pooled | -0.036 [-0.176, 0.078] | 286 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | H3c | sensitivity | Spearman(g(c)_W, dK_W), same window, W1-W3 pooled | 0.026 [-0.055, 0.123] | 429 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | N1 | sensitivity | H3a restricted to units with K_pivot above the city's median at the pivot (partial Spearman(g(c)_P, dK_F | ... | 0.152 [-0.003, 0.306] | 142 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | N2 | sensitivity | partial Spearman(Delta r_P, dK_F | dK_P, K_pivot), r = ln((Cafe + 0.5) / (Fast Food + 0.5)); units passing ... | -0.010 [-0.138, 0.117] | 243 | NOT SIGNIFICANT | ewr_2022_interpolated |
| HH | H1 | sensitivity | category OA 2025 (44 common fixed features, flagged cells imputed in-fold) => K_2025 > 0; GroupKFold by spa... | 0.754 [0.628, 0.850] | 99 | SUPPORTED |  |
| HH | H1a | sensitivity | Spearman(OA category Cafe 2025, K_2025), min-base flag dropped | -0.486 [-0.695, -0.163] | 67 | SUPPORTED |  |
| HH | H1b | sensitivity | Spearman(OA category Fast Food 2025, K_2025), min-base flag dropped | 0.682 [0.493, 0.772] | 67 | SUPPORTED |  |
| HH | H1c | sensitivity | Spearman(OA domain Sports and Recreation 2025, K_2025), min-base flag dropped | 0.168 [-0.109, 0.402] | 99 | NOT SIGNIFICANT |  |
| HH | H2 | sensitivity | category OA at window start (42 common fixed features) => dK_W > 0, W1-W3 pooled; GroupKFold by spatial block | 0.508 [0.426, 0.586] | 297 | NOT SIGNIFICANT |  |
| HH | H3a | sensitivity | partial Spearman(g(c)_P, dK_F | dK_P, K_pivot), pivots 2021 and 2023 pooled | 0.048 [-0.113, 0.226] | 198 | NOT SIGNIFICANT |  |
| HH | H3b | sensitivity | partial Spearman(dK_P, g(c)_F | g(c)_P, K_start(P)), pivots 2021 and 2023 pooled | -0.071 [-0.247, 0.109] | 198 | NOT SIGNIFICANT |  |
| HH | H3c | sensitivity | Spearman(g(c)_W, dK_W), same window, W1-W3 pooled | 0.020 [-0.088, 0.139] | 297 | NOT SIGNIFICANT |  |
| HH | N1 | sensitivity | H3a restricted to units with K_pivot above the city's median at the pivot (partial Spearman(g(c)_P, dK_F | ... | 0.014 [-0.264, 0.267] | 98 | NOT SIGNIFICANT |  |
| HH | N2 | sensitivity | partial Spearman(Delta r_P, dK_F | dK_P, K_pivot), r = ln((Cafe + 0.5) / (Fast Food + 0.5)); units passing ... | 0.130 [0.017, 0.245] | 126 | CONTRADICTED |  |
| BER-HH | H1 | sensitivity | Delta = theta_BER - theta_HH (oof_auc_logit; category OA 2025 (44 common fixed features, flagged cells impu... | 0.030 [-0.104, 0.194] | 242 | NO DIFFERENCE DETECTED |  |
| BER-HH | H1a | sensitivity | Delta = theta_BER - theta_HH (spearman; Spearman(OA category Cafe 2025, K_2025), min-base flag dropped); in... | 0.236 [-0.135, 0.511] | 197 | NO DIFFERENCE DETECTED |  |
| BER-HH | H1b | sensitivity | Delta = theta_BER - theta_HH (spearman; Spearman(OA category Fast Food 2025, K_2025), min-base flag dropped... | -0.136 [-0.330, 0.090] | 197 | NO DIFFERENCE DETECTED |  |
| BER-HH | H1c | sensitivity | Delta = theta_BER - theta_HH (spearman; Spearman(OA domain Sports and Recreation 2025, K_2025), min-base fl... | 0.165 [-0.160, 0.524] | 242 | NO DIFFERENCE DETECTED |  |
| BER-HH | H2 | sensitivity | Delta = theta_BER - theta_HH (oof_auc_logit; category OA at window start (42 common fixed features) => dK_W... | 0.074 [-0.021, 0.173] | 726 | NO DIFFERENCE DETECTED |  |
| BER-HH | H3a | sensitivity | Delta = theta_BER - theta_HH (partial_spearman; partial Spearman(g(c)_P, dK_F | dK_P, K_pivot), pivots 2021... | -0.011 [-0.247, 0.195] | 484 | NO DIFFERENCE DETECTED |  |
| BER-HH | H3b | sensitivity | Delta = theta_BER - theta_HH (partial_spearman; partial Spearman(dK_P, g(c)_F | g(c)_P, K_start(P)), pivots... | 0.034 [-0.196, 0.247] | 484 | NO DIFFERENCE DETECTED |  |
| BER-HH | H3c | sensitivity | Delta = theta_BER - theta_HH (spearman; Spearman(g(c)_W, dK_W), same window, W1-W3 pooled); independent blo... | 0.006 [-0.132, 0.156] | 726 | NO DIFFERENCE DETECTED |  |

### G = 36 blocks (§6.2)

| City | Hyp | Role | Operationalisation | Estimate [95% CI] | n | Verdict | Flags |
|---|---|---|---|---|---|---|---|
| BER | H1 | sensitivity | category OA 2025 (44 common fixed features, flagged cells imputed in-fold) => K_2025 > 0; GroupKFold by spa... | 0.784 [0.701, 0.860] | 143 | SUPPORTED |  |
| BER | H1a | sensitivity | Spearman(OA category Cafe 2025, K_2025), min-base flag dropped | -0.249 [-0.531, 0.034] | 130 | NOT SIGNIFICANT |  |
| BER | H1b | sensitivity | Spearman(OA category Fast Food 2025, K_2025), min-base flag dropped | 0.546 [0.364, 0.693] | 130 | SUPPORTED |  |
| BER | H1c | sensitivity | Spearman(OA domain Sports and Recreation 2025, K_2025), min-base flag dropped | 0.334 [0.151, 0.509] | 143 | CONTRADICTED |  |
| BER | H2 | sensitivity | category OA at window start (42 common fixed features) => dK_W > 0, W1-W3 pooled; GroupKFold by spatial block | 0.582 [0.529, 0.636] | 429 | SUPPORTED | ewr_2022_interpolated |
| BER | H3a | sensitivity | partial Spearman(g(c)_P, dK_F | dK_P, K_pivot), pivots 2021 and 2023 pooled | 0.036 [-0.074, 0.145] | 286 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | H3b | sensitivity | partial Spearman(dK_P, g(c)_F | g(c)_P, K_start(P)), pivots 2021 and 2023 pooled | -0.036 [-0.179, 0.093] | 286 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | H3c | sensitivity | Spearman(g(c)_W, dK_W), same window, W1-W3 pooled | 0.026 [-0.049, 0.110] | 429 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | N1 | sensitivity | H3a restricted to units with K_pivot above the city's median at the pivot (partial Spearman(g(c)_P, dK_F | ... | 0.152 [0.001, 0.298] | 142 | CONTRADICTED | ewr_2022_interpolated |
| BER | N2 | sensitivity | partial Spearman(Delta r_P, dK_F | dK_P, K_pivot), r = ln((Cafe + 0.5) / (Fast Food + 0.5)); units passing ... | -0.010 [-0.143, 0.136] | 243 | NOT SIGNIFICANT | ewr_2022_interpolated |
| HH | H1 | sensitivity | category OA 2025 (44 common fixed features, flagged cells imputed in-fold) => K_2025 > 0; GroupKFold by spa... | 0.754 [0.664, 0.840] | 99 | SUPPORTED |  |
| HH | H1a | sensitivity | Spearman(OA category Cafe 2025, K_2025), min-base flag dropped | -0.486 [-0.673, -0.200] | 67 | SUPPORTED |  |
| HH | H1b | sensitivity | Spearman(OA category Fast Food 2025, K_2025), min-base flag dropped | 0.682 [0.463, 0.810] | 67 | SUPPORTED |  |
| HH | H1c | sensitivity | Spearman(OA domain Sports and Recreation 2025, K_2025), min-base flag dropped | 0.168 [-0.080, 0.391] | 99 | NOT SIGNIFICANT |  |
| HH | H2 | sensitivity | category OA at window start (42 common fixed features) => dK_W > 0, W1-W3 pooled; GroupKFold by spatial block | 0.508 [0.429, 0.577] | 297 | NOT SIGNIFICANT |  |
| HH | H3a | sensitivity | partial Spearman(g(c)_P, dK_F | dK_P, K_pivot), pivots 2021 and 2023 pooled | 0.048 [-0.112, 0.211] | 198 | NOT SIGNIFICANT |  |
| HH | H3b | sensitivity | partial Spearman(dK_P, g(c)_F | g(c)_P, K_start(P)), pivots 2021 and 2023 pooled | -0.071 [-0.214, 0.074] | 198 | NOT SIGNIFICANT |  |
| HH | H3c | sensitivity | Spearman(g(c)_W, dK_W), same window, W1-W3 pooled | 0.020 [-0.084, 0.130] | 297 | NOT SIGNIFICANT |  |
| HH | N1 | sensitivity | H3a restricted to units with K_pivot above the city's median at the pivot (partial Spearman(g(c)_P, dK_F | ... | 0.014 [-0.239, 0.251] | 98 | NOT SIGNIFICANT |  |
| HH | N2 | sensitivity | partial Spearman(Delta r_P, dK_F | dK_P, K_pivot), r = ln((Cafe + 0.5) / (Fast Food + 0.5)); units passing ... | 0.130 [-0.020, 0.295] | 126 | NOT SIGNIFICANT |  |
| BER-HH | H1 | sensitivity | Delta = theta_BER - theta_HH (oof_auc_logit; category OA 2025 (44 common fixed features, flagged cells impu... | 0.030 [-0.089, 0.151] | 242 | NO DIFFERENCE DETECTED |  |
| BER-HH | H1a | sensitivity | Delta = theta_BER - theta_HH (spearman; Spearman(OA category Cafe 2025, K_2025), min-base flag dropped); in... | 0.236 [-0.165, 0.579] | 197 | NO DIFFERENCE DETECTED |  |
| BER-HH | H1b | sensitivity | Delta = theta_BER - theta_HH (spearman; Spearman(OA category Fast Food 2025, K_2025), min-base flag dropped... | -0.136 [-0.361, 0.119] | 197 | NO DIFFERENCE DETECTED |  |
| BER-HH | H1c | sensitivity | Delta = theta_BER - theta_HH (spearman; Spearman(OA domain Sports and Recreation 2025, K_2025), min-base fl... | 0.165 [-0.132, 0.495] | 242 | NO DIFFERENCE DETECTED |  |
| BER-HH | H2 | sensitivity | Delta = theta_BER - theta_HH (oof_auc_logit; category OA at window start (42 common fixed features) => dK_W... | 0.074 [-0.012, 0.170] | 726 | NO DIFFERENCE DETECTED |  |
| BER-HH | H3a | sensitivity | Delta = theta_BER - theta_HH (partial_spearman; partial Spearman(g(c)_P, dK_F | dK_P, K_pivot), pivots 2021... | -0.011 [-0.207, 0.173] | 484 | NO DIFFERENCE DETECTED |  |
| BER-HH | H3b | sensitivity | Delta = theta_BER - theta_HH (partial_spearman; partial Spearman(dK_P, g(c)_F | g(c)_P, K_start(P)), pivots... | 0.034 [-0.171, 0.231] | 484 | NO DIFFERENCE DETECTED |  |
| BER-HH | H3c | sensitivity | Delta = theta_BER - theta_HH (spearman; Spearman(g(c)_W, dK_W), same window, W1-W3 pooled); independent blo... | 0.006 [-0.133, 0.141] | 726 | NO DIFFERENCE DETECTED |  |

### iid unit bootstrap (§6.2)

| City | Hyp | Role | Operationalisation | Estimate [95% CI] | n | Verdict | Flags |
|---|---|---|---|---|---|---|---|
| BER | H1 | sensitivity | category OA 2025 (44 common fixed features, flagged cells imputed in-fold) => K_2025 > 0; GroupKFold by spa... | 0.784 [0.697, 0.859] | 143 | SUPPORTED |  |
| BER | H1a | sensitivity | Spearman(OA category Cafe 2025, K_2025), min-base flag dropped | -0.249 [-0.430, -0.061] | 130 | SUPPORTED |  |
| BER | H1b | sensitivity | Spearman(OA category Fast Food 2025, K_2025), min-base flag dropped | 0.546 [0.417, 0.664] | 130 | SUPPORTED |  |
| BER | H1c | sensitivity | Spearman(OA domain Sports and Recreation 2025, K_2025), min-base flag dropped | 0.334 [0.170, 0.479] | 143 | CONTRADICTED |  |
| BER | H2 | sensitivity | category OA at window start (42 common fixed features) => dK_W > 0, W1-W3 pooled; GroupKFold by spatial block | 0.582 [0.531, 0.636] | 429 | SUPPORTED | ewr_2022_interpolated |
| BER | H3a | sensitivity | partial Spearman(g(c)_P, dK_F | dK_P, K_pivot), pivots 2021 and 2023 pooled | 0.036 [-0.081, 0.156] | 286 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | H3b | sensitivity | partial Spearman(dK_P, g(c)_F | g(c)_P, K_start(P)), pivots 2021 and 2023 pooled | -0.036 [-0.148, 0.078] | 286 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | H3c | sensitivity | Spearman(g(c)_W, dK_W), same window, W1-W3 pooled | 0.026 [-0.068, 0.116] | 429 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | N1 | sensitivity | H3a restricted to units with K_pivot above the city's median at the pivot (partial Spearman(g(c)_P, dK_F | ... | 0.152 [-0.011, 0.299] | 142 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | N2 | sensitivity | partial Spearman(Delta r_P, dK_F | dK_P, K_pivot), r = ln((Cafe + 0.5) / (Fast Food + 0.5)); units passing ... | -0.010 [-0.139, 0.127] | 243 | NOT SIGNIFICANT | ewr_2022_interpolated |
| HH | H1 | sensitivity | category OA 2025 (44 common fixed features, flagged cells imputed in-fold) => K_2025 > 0; GroupKFold by spa... | 0.754 [0.651, 0.844] | 99 | SUPPORTED |  |
| HH | H1a | sensitivity | Spearman(OA category Cafe 2025, K_2025), min-base flag dropped | -0.486 [-0.674, -0.251] | 67 | SUPPORTED |  |
| HH | H1b | sensitivity | Spearman(OA category Fast Food 2025, K_2025), min-base flag dropped | 0.682 [0.489, 0.811] | 67 | SUPPORTED |  |
| HH | H1c | sensitivity | Spearman(OA domain Sports and Recreation 2025, K_2025), min-base flag dropped | 0.168 [-0.030, 0.360] | 99 | NOT SIGNIFICANT |  |
| HH | H2 | sensitivity | category OA at window start (42 common fixed features) => dK_W > 0, W1-W3 pooled; GroupKFold by spatial block | 0.508 [0.433, 0.579] | 297 | NOT SIGNIFICANT |  |
| HH | H3a | sensitivity | partial Spearman(g(c)_P, dK_F | dK_P, K_pivot), pivots 2021 and 2023 pooled | 0.048 [-0.088, 0.175] | 198 | NOT SIGNIFICANT |  |
| HH | H3b | sensitivity | partial Spearman(dK_P, g(c)_F | g(c)_P, K_start(P)), pivots 2021 and 2023 pooled | -0.071 [-0.210, 0.095] | 198 | NOT SIGNIFICANT |  |
| HH | H3c | sensitivity | Spearman(g(c)_W, dK_W), same window, W1-W3 pooled | 0.020 [-0.096, 0.141] | 297 | NOT SIGNIFICANT |  |
| HH | N1 | sensitivity | H3a restricted to units with K_pivot above the city's median at the pivot (partial Spearman(g(c)_P, dK_F | ... | 0.014 [-0.203, 0.219] | 98 | NOT SIGNIFICANT |  |
| HH | N2 | sensitivity | partial Spearman(Delta r_P, dK_F | dK_P, K_pivot), r = ln((Cafe + 0.5) / (Fast Food + 0.5)); units passing ... | 0.130 [-0.033, 0.290] | 126 | NOT SIGNIFICANT |  |
| BER-HH | H1 | sensitivity | Delta = theta_BER - theta_HH (oof_auc_logit; category OA 2025 (44 common fixed features, flagged cells impu... | 0.030 [-0.095, 0.152] | 242 | NO DIFFERENCE DETECTED |  |
| BER-HH | H1a | sensitivity | Delta = theta_BER - theta_HH (spearman; Spearman(OA category Cafe 2025, K_2025), min-base flag dropped); in... | 0.236 [-0.056, 0.515] | 197 | NO DIFFERENCE DETECTED |  |
| BER-HH | H1b | sensitivity | Delta = theta_BER - theta_HH (spearman; Spearman(OA category Fast Food 2025, K_2025), min-base flag dropped... | -0.136 [-0.318, 0.094] | 197 | NO DIFFERENCE DETECTED |  |
| BER-HH | H1c | sensitivity | Delta = theta_BER - theta_HH (spearman; Spearman(OA domain Sports and Recreation 2025, K_2025), min-base fl... | 0.165 [-0.080, 0.406] | 242 | NO DIFFERENCE DETECTED |  |
| BER-HH | H2 | sensitivity | Delta = theta_BER - theta_HH (oof_auc_logit; category OA at window start (42 common fixed features) => dK_W... | 0.074 [-0.011, 0.167] | 726 | NO DIFFERENCE DETECTED |  |
| BER-HH | H3a | sensitivity | Delta = theta_BER - theta_HH (partial_spearman; partial Spearman(g(c)_P, dK_F | dK_P, K_pivot), pivots 2021... | -0.011 [-0.197, 0.167] | 484 | NO DIFFERENCE DETECTED |  |
| BER-HH | H3b | sensitivity | Delta = theta_BER - theta_HH (partial_spearman; partial Spearman(dK_P, g(c)_F | g(c)_P, K_start(P)), pivots... | 0.034 [-0.149, 0.227] | 484 | NO DIFFERENCE DETECTED |  |
| BER-HH | H3c | sensitivity | Delta = theta_BER - theta_HH (spearman; Spearman(g(c)_W, dK_W), same window, W1-W3 pooled); independent blo... | 0.006 [-0.137, 0.157] | 726 | NO DIFFERENCE DETECTED |  |

### Bezirk cluster bootstrap (§6.2; too few clusters for reliable coverage)

| City | Hyp | Role | Operationalisation | Estimate [95% CI] | n | Verdict | Flags |
|---|---|---|---|---|---|---|---|
| BER | H1 | sensitivity | category OA 2025 (44 common fixed features, flagged cells imputed in-fold) => K_2025 > 0; GroupKFold by spa... | 0.784 [0.688, 0.876] | 143 | SUPPORTED |  |
| BER | H1a | sensitivity | Spearman(OA category Cafe 2025, K_2025), min-base flag dropped | -0.249 [-0.478, -0.008] | 130 | SUPPORTED |  |
| BER | H1b | sensitivity | Spearman(OA category Fast Food 2025, K_2025), min-base flag dropped | 0.546 [0.424, 0.651] | 130 | SUPPORTED |  |
| BER | H1c | sensitivity | Spearman(OA domain Sports and Recreation 2025, K_2025), min-base flag dropped | 0.334 [0.153, 0.495] | 143 | CONTRADICTED |  |
| BER | H2 | sensitivity | category OA at window start (42 common fixed features) => dK_W > 0, W1-W3 pooled; GroupKFold by spatial block | 0.582 [0.521, 0.641] | 429 | SUPPORTED | ewr_2022_interpolated |
| BER | H3a | sensitivity | partial Spearman(g(c)_P, dK_F | dK_P, K_pivot), pivots 2021 and 2023 pooled | 0.036 [-0.085, 0.191] | 286 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | H3b | sensitivity | partial Spearman(dK_P, g(c)_F | g(c)_P, K_start(P)), pivots 2021 and 2023 pooled | -0.036 [-0.164, 0.057] | 286 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | H3c | sensitivity | Spearman(g(c)_W, dK_W), same window, W1-W3 pooled | 0.026 [-0.077, 0.129] | 429 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | N1 | sensitivity | H3a restricted to units with K_pivot above the city's median at the pivot (partial Spearman(g(c)_P, dK_F | ... | 0.152 [-0.017, 0.302] | 142 | NOT SIGNIFICANT | ewr_2022_interpolated |
| BER | N2 | sensitivity | partial Spearman(Delta r_P, dK_F | dK_P, K_pivot), r = ln((Cafe + 0.5) / (Fast Food + 0.5)); units passing ... | -0.010 [-0.156, 0.138] | 243 | NOT SIGNIFICANT | ewr_2022_interpolated |
| HH | H1 | sensitivity | category OA 2025 (44 common fixed features, flagged cells imputed in-fold) => K_2025 > 0; GroupKFold by spa... | 0.754 [0.616, 0.835] | 99 | SUPPORTED |  |
| HH | H1a | sensitivity | Spearman(OA category Cafe 2025, K_2025), min-base flag dropped | -0.486 [-0.684, -0.267] | 67 | SUPPORTED |  |
| HH | H1b | sensitivity | Spearman(OA category Fast Food 2025, K_2025), min-base flag dropped | 0.682 [0.566, 0.777] | 67 | SUPPORTED |  |
| HH | H1c | sensitivity | Spearman(OA domain Sports and Recreation 2025, K_2025), min-base flag dropped | 0.168 [-0.188, 0.535] | 99 | NOT SIGNIFICANT |  |
| HH | H2 | sensitivity | category OA at window start (42 common fixed features) => dK_W > 0, W1-W3 pooled; GroupKFold by spatial block | 0.508 [0.441, 0.568] | 297 | NOT SIGNIFICANT |  |
| HH | H3a | sensitivity | partial Spearman(g(c)_P, dK_F | dK_P, K_pivot), pivots 2021 and 2023 pooled | 0.048 [-0.166, 0.296] | 198 | NOT SIGNIFICANT |  |
| HH | H3b | sensitivity | partial Spearman(dK_P, g(c)_F | g(c)_P, K_start(P)), pivots 2021 and 2023 pooled | -0.071 [-0.204, 0.129] | 198 | NOT SIGNIFICANT |  |
| HH | H3c | sensitivity | Spearman(g(c)_W, dK_W), same window, W1-W3 pooled | 0.020 [-0.028, 0.080] | 297 | NOT SIGNIFICANT |  |
| HH | N1 | sensitivity | H3a restricted to units with K_pivot above the city's median at the pivot (partial Spearman(g(c)_P, dK_F | ... | 0.014 [-0.310, 0.349] | 98 | NOT SIGNIFICANT |  |
| HH | N2 | sensitivity | partial Spearman(Delta r_P, dK_F | dK_P, K_pivot), r = ln((Cafe + 0.5) / (Fast Food + 0.5)); units passing ... | 0.130 [0.004, 0.255] | 126 | CONTRADICTED |  |
| BER-HH | H1 | sensitivity | Delta = theta_BER - theta_HH (oof_auc_logit; category OA 2025 (44 common fixed features, flagged cells impu... | 0.030 [-0.105, 0.179] | 242 | NO DIFFERENCE DETECTED |  |
| BER-HH | H1a | sensitivity | Delta = theta_BER - theta_HH (spearman; Spearman(OA category Cafe 2025, K_2025), min-base flag dropped); in... | 0.236 [-0.073, 0.573] | 197 | NO DIFFERENCE DETECTED |  |
| BER-HH | H1b | sensitivity | Delta = theta_BER - theta_HH (spearman; Spearman(OA category Fast Food 2025, K_2025), min-base flag dropped... | -0.136 [-0.300, 0.012] | 197 | NO DIFFERENCE DETECTED |  |
| BER-HH | H1c | sensitivity | Delta = theta_BER - theta_HH (spearman; Spearman(OA domain Sports and Recreation 2025, K_2025), min-base fl... | 0.165 [-0.244, 0.566] | 242 | NO DIFFERENCE DETECTED |  |
| BER-HH | H2 | sensitivity | Delta = theta_BER - theta_HH (oof_auc_logit; category OA at window start (42 common fixed features) => dK_W... | 0.074 [-0.012, 0.165] | 726 | NO DIFFERENCE DETECTED |  |
| BER-HH | H3a | sensitivity | Delta = theta_BER - theta_HH (partial_spearman; partial Spearman(g(c)_P, dK_F | dK_P, K_pivot), pivots 2021... | -0.011 [-0.285, 0.270] | 484 | NO DIFFERENCE DETECTED |  |
| BER-HH | H3b | sensitivity | Delta = theta_BER - theta_HH (partial_spearman; partial Spearman(dK_P, g(c)_F | g(c)_P, K_start(P)), pivots... | 0.034 [-0.199, 0.207] | 484 | NO DIFFERENCE DETECTED |  |
| BER-HH | H3c | sensitivity | Delta = theta_BER - theta_HH (spearman; Spearman(g(c)_W, dK_W), same window, W1-W3 pooled); independent blo... | 0.006 [-0.115, 0.120] | 726 | NO DIFFERENCE DETECTED |  |

### Berlin BZR vs PGR (§6.5; point estimates only)

| City | Hyp | Role | Operationalisation | Estimate [95% CI] | n | Verdict | Flags |
|---|---|---|---|---|---|---|---|
| BER | H1a | sensitivity | Spearman(OA category Cafe 2025, K_2025), min-base flag dropped | -0.247 [–, –] | 57 | – |  |
| BER | H1b | sensitivity | Spearman(OA category Fast Food 2025, K_2025), min-base flag dropped | 0.562 [–, –] | 57 | – |  |
| BER | H1c | sensitivity | Spearman(OA domain Sports and Recreation 2025, K_2025), min-base flag dropped | 0.370 [–, –] | 58 | – |  |
| BER | H3c | sensitivity | Spearman(g(c)_W, dK_W), same window, W1-W3 pooled | 0.055 [–, –] | 174 | – |  |

### Moran's I of the H3 residuals (§6.2, #365 on the matched panel)

| City | Hyp | Where | n | Moran's I | p_sim | block-mean Moran's I | p_sim |
|---|---|---|---|---|---|---|---|
| BER | H3a | pivot 2021 | 143 | +0.180 | 0.002 | +0.151 | 0.062 |
| BER | H3b | pivot 2021 | 143 | +0.032 | 0.229 | +0.146 | 0.074 |
| BER | H3a | pivot 2023 | 143 | +0.077 | 0.066 | +0.087 | 0.148 |
| BER | H3b | pivot 2023 | 143 | +0.138 | 0.006 | +0.032 | 0.259 |
| BER | H3c | window 2019-2021 | 143 | +0.131 | 0.006 | +0.059 | 0.201 |
| BER | H3c | window 2021-2023 | 143 | +0.319 | 0.001 | +0.234 | 0.027 |
| BER | H3c | window 2023-2025 | 143 | +0.128 | 0.005 | +0.123 | 0.088 |
| HH | H3a | pivot 2021 | 99 | -0.005 | 0.459 | -0.128 | 0.265 |
| HH | H3b | pivot 2021 | 99 | +0.016 | 0.352 | -0.097 | 0.382 |
| HH | H3a | pivot 2023 | 99 | +0.046 | 0.187 | +0.009 | 0.345 |
| HH | H3b | pivot 2023 | 99 | +0.292 | 0.001 | +0.125 | 0.126 |
| HH | H3c | window 2019-2021 | 99 | +0.054 | 0.175 | -0.104 | 0.353 |
| HH | H3c | window 2021-2023 | 99 | +0.030 | 0.265 | -0.064 | 0.427 |
| HH | H3c | window 2023-2025 | 99 | +0.053 | 0.153 | -0.073 | 0.435 |

- **Berlin:** a block-mean Moran's I is significant at 5%, so the blocks are judged too small and the **G = 16 sensitivity is promoted** (§6.2); verdicts still come from G = 24.
- Hamburg: no block-mean Moran's I is significant at 5%.

## 6. Context (no verdict)

Hamburg S1 (children with a migration background) and S7 (school leaving), correlated **with K only** (D4):

| Indicator | Edition | ρ with K | n Stadtteile |
|---|---|---|---|
| S1 | 2019 | 0.905 | 99 |
| S7 | 2019 | 0.895 | 99 |
| S1 | 2021 | 0.906 | 99 |
| S7 | 2021 | 0.833 | 99 |
| S1 | 2023 | 0.888 | 99 |
| S7 | 2023 | 0.832 | 98 |
| S1 | 2025 | 0.862 | 99 |
| S7 | 2025 | 0.840 | 99 |

Share of each matched unit's population under protection in 2024 (§7.4, descriptive; no association with K, dK, OA or any N row is computed, R4):

| City | Units | Units with any protection | median | mean | 90th pct. |
|---|---|---|---|---|---|
| BER | 143 | 67 | 0.000 | 0.172 | 0.643 |
| HH | 99 | 21 | 0.000 | 0.083 | 0.367 |

City levels, population-weighted over the matched units (A4.3 with E8). Both use the same aggregation (weighted by total residents). The indicator definitions still differ (§3.2, R7), so the levels are shown per city with their definitions and are not ranked against each other. Both differ from the official headline figures (Hamburg: unweighted Gebiet mean; Berlin: PLR aggregate about 0.5 pp below the published S3).

| City / edition | U (%) | T\* / T (%) | Berlin S3 / core-3M T (%) | C (%) |
|---|---|---|---|---|
| BER/2019 | 4.01 | 15.07 | 12.33 | 26.43 |
| BER/2021 | 5.14 | 14.80 | 11.28 | 25.29 |
| BER/2023 | 4.49 | 13.91 | 10.83 | 23.15 |
| BER/2025 | 4.86 | 13.60 | 10.25 | 21.61 |
| HH/2019 | 3.02 | 10.36 | 10.36 | 18.55 |
| HH/2021 | 3.72 | 10.51 | 10.51 | 18.41 |
| HH/2023 | 3.69 | 10.57 | 10.57 | 18.68 |
| HH/2025 | 4.12 | 10.39 | 10.39 | 17.06 |

Hamburg T 2019 as published (R19-pub): 10.25 %.

Definitions: Berlin U = SGB II unemployed per resident 15 to the Regelaltersgrenze; T\* = SGB II and SGB XII recipients incl. the unemployed per resident; C = under-15s in SGB II households. Hamburg U = SGB II unemployed per resident 15–64; T = SGB II and AsylbLG recipients per resident; C = non-employable SGB II beneficiaries per under-15 (data checks §3, §4.1).

## 7. Disclosures

### 7.1 Shocks (§4.4, binding)

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
- **Accommodation sites (all windows, mainly W2/W3).** On 31.12.2022, 259 refugee-accommodation
  sites were in use in 170 of 856 Hamburg Gebiete, and 30 of the 37 Gebiete with negative Dynamik in
  2023 contain one (Bericht 2023, PDF pp. 12, 16). Their residents are in the Hamburg population
  counts. Because AsylbLG is in Hamburg T, an opening raises Hamburg K. In Berlin, AsylbLG is in no
  indicator, so registered residents of a new site lower Berlin K through the denominators until
  recognition. Under core-2 both cities show only the denominator effect. Whether residents of the
  Berlin arrival centre at Tegel are registered is unknown. Disclosed, not corrected.
- **W3 (2022 → 2024):** **Bürgergeld** (1 January 2023) widens SGB II access and raises the
  protected assets. **Wohngeld-Plus** (2023) moves some low-income households out of SGB II/XII
  into housing benefit, which lowers T and (depending on S5's scope) C. Both are city-wide, but their
  spatial incidence follows the existing low-income geography. Ukrainian refugee arrivals continue.
- Under rank statistics a uniform city-wide shift is harmless; a shift that follows the existing
  geography is not. Every H2/H3 row that pools windows says so. Per-window rows are reported as
  sensitivities. A city difference that appears only in W2 is flagged "coincides with the
  Rechtskreiswechsel asymmetry".

(Pre-registration §4.4, with the "Local sites" bullet replaced by A4 rev. 1 E9. The data checks
§3 found that Hamburg S5 excludes AsylbLG, so "U (and C) rise" in W2 is the operative case.)

### 7.2 Construct gaps (§3.2, binding)

1. **T differs in scope.** Berlin S3 excludes the unemployed and AsylbLG recipients. Hamburg S3
   includes all SGB II recipients and, from 2019, AsylbLG recipients. Hamburg T therefore loads more
   on refugee accommodation and overlaps more with U (gap 5).
2. **C differs in scope.** Berlin S4 counts SGB II only. Hamburg S5 counts "Mindestsicherung"; the
   data checks (§3) found its numerator is non-employable SGB II beneficiaries (Sozialgeld) under 15
   in every edition, so it excludes SGB XII and AsylbLG. Core-1U is therefore not triggered and the
   T-free construct is core-2.
3. **U denominators differ** (15 to the Regelaltersgrenze in Berlin vs 15–64 in Hamburg). Hamburg S4
   is SGB II only in every matched edition (data checks §3).
4. Because K is z-scored within each city, **it ranks units within a city**. A Berlin and a Hamburg
   unit with the same K are not equally disadvantaged.
5. **Hamburg K double-weights unemployment (gap 5)** under the core-3M sensitivity. The primary
   core-3H corrects it by re-basing Berlin T to all recipients, T\* = (count S3 + count S1) / all
   residents (§3.7).

**Residual differences after the T\* correction (binding disclosure, §3.7).** Berlin T\* counts SGB
II **and SGB XII** recipients, and no AsylbLG. Hamburg T counts SGB II **and AsylbLG** (from 2019),
and no SGB XII. So the U double weighting is gone, but the refugee channel (Hamburg) and the older
and disabled-persons channel (Berlin) remain. U and T\* now overlap in **both** cities in the same
way (the unemployed are in both), so the two cities' K weight unemployment alike.

### 7.3 Berlin population series (A4.1 with E5, binding)

Berlin populations for 31.12.2018 and 31.12.2020 are mapped from LOR 2019 to LOR 2021 by area share, not by population. About 10,100 residents (0.27 %) are assigned to two development sites that had no housing at either date, and are missing from the neighbouring areas where they lived. This shifts the weights inside 2 of 143 Bezirksregionen. Their totals including the two sites are unaffected. Sensitivity W24 uses 2024 populations throughout. Because 2024 populations also reflect real change since 2018 (new housing, refugee arrivals, ageing), a result that changes under W24 is not by itself evidence of the mapping error.

W24 measures fixed-composition change. It does not include population shifts between areas within a unit, which can be part of neighbourhood change (new-build gentrification).

### 7.4 Panels

- Berlin: 535 balanced PLRs (inhabited at 31.12.2018/2020/2022/2024, MSS S1/S3/S4 in 2021/2023/2025) in 143 Bezirksregionen.
- Hamburg: 849 Gebiete scored in all four editions in 99 Stadtteile. The 8 scored-2025 Gebiete outside the balanced panel: 1009, 13002, 14005, 4001, 43005, 53012, 6003, 74004 (10 ever scored: 10003, 1005, 1009, 13002, 14005, 4001, 43005, 53012, 6003, 74004). Gebiete enter or leave scoring by crossing the 300-resident threshold, typically through new-build or the opening or closing of accommodation (O3).
- Gebiete 39005 Lokstedt and 67012 Poppenbüttel are kept in the primary; their values are consistent with small-number effects in the published data (A4.3, O1).
- R19 fallback (s3_2022 or D3_2022 missing, published level kept): 0 Gebiete.

### 7.5 S3 base revised by the publisher (AsylbLG counting change, Bericht 2021)

Every Gebiet with |D3_E − (s_E − s_(E−3))| > 0.5 pp in 2022 or 2023 (A4 rev. 1 E3). The publisher documents a widened AsylbLG count from edition 2021 (Bericht 2021, PDF p. 8); the re-basing of the 2019/2020 values in D3_2022/D3_2023 is inferred from the annex. W2 is not claimed to be revision-free; it is untestable, with a clean start level. Values in % / pp.

| Gebiet | Δ 2022 | Δ 2023 | s3_2019 published | s3_2019_rev | W1 published | W1 revised | W2 | balanced |
|---|---|---|---|---|---|---|---|---|
| 2002 | -3.14 | -3.42 | 29.45 | 32.59 | -3.09 | -6.23 | -18.67 | yes |
| 6004 | -13.96 | -15.68 | 54.08 | 68.04 | +21.62 | +7.66 | -8.29 | yes |
| 7003 | — | -0.66 | 17.14 | 17.42 | +13.86 | +13.58 | -0.11 | yes |
| 9001 | -0.54 | — | 16.95 | 17.49 | -3.46 | -4.00 | +9.63 | yes |
| 11008 | -0.69 | — | 20.43 | 21.12 | -4.98 | -5.67 | +1.24 | yes |
| 12004 | -0.69 | -0.78 | 13.85 | 14.53 | +24.16 | +23.47 | -1.12 | yes |
| 13001 | -11.31 | -9.81 | 65.64 | 76.95 | +17.79 | +6.48 | +0.97 | yes |
| 16005 | -3.65 | -3.70 | 33.31 | 36.96 | +1.50 | -2.15 | -0.70 | yes |
| 23001 | -1.73 | — | 25.88 | 27.61 | -3.84 | -5.57 | -3.36 | yes |
| 25001 | -2.77 | -2.66 | 31.43 | 34.20 | +3.90 | +1.13 | +25.65 | yes |
| 25004 | -0.62 | — | 16.20 | 16.81 | -8.68 | -9.30 | -0.27 | yes |
| 25005 | -21.17 | -15.36 | 65.74 | 86.91 | +16.97 | -4.20 | +2.02 | yes |
| 25008 | -1.80 | -1.58 | 28.98 | 30.78 | +3.25 | +1.46 | -4.12 | yes |
| 25011 | -0.51 | — | 19.68 | 20.19 | -0.93 | -1.44 | -1.50 | yes |
| 27008 | -0.94 | -0.89 | 17.51 | 18.45 | +2.57 | +1.63 | -0.07 | yes |
| 28013 | -1.43 | -1.19 | 40.07 | 41.51 | +0.81 | -0.62 | +0.21 | yes |
| 29007 | -0.83 | -1.03 | 26.73 | 27.56 | -1.91 | -2.74 | -11.91 | yes |
| 33001 | -8.06 | -5.97 | 48.91 | 56.97 | +13.20 | +5.14 | -4.24 | yes |
| 39001 | -0.81 | -2.51 | 9.62 | 10.43 | +18.81 | +18.00 | -0.20 | yes |
| 41006 | -2.43 | -1.70 | 23.44 | 25.86 | +6.64 | +4.21 | +1.93 | yes |
| 42004 | — | -0.81 | 4.26 | 4.29 | +44.25 | +44.22 | -8.96 | yes |
| 43015 | -2.28 | -1.97 | 17.89 | 20.17 | +5.49 | +3.21 | -0.37 | yes |
| 46002 | -13.04 | -1.17 | 30.58 | 43.62 | -10.29 | -23.33 | +18.59 | yes |
| 46003 | -3.97 | -12.07 | 23.91 | 27.88 | +41.91 | +37.93 | -3.40 | yes |
| 47001 | -0.80 | -0.80 | 21.65 | 22.45 | +2.04 | +1.23 | -7.78 | yes |
| 48005 | -13.18 | -8.72 | 48.82 | 62.00 | -25.13 | -38.31 | -1.79 | yes |
| 49008 | -0.74 | -0.54 | 10.84 | 11.58 | +1.41 | +0.68 | -0.68 | yes |
| 50005 | -0.52 | — | 15.07 | 15.59 | -1.68 | -2.20 | +4.29 | yes |
| 54002 | -3.66 | -3.86 | 27.01 | 30.67 | +6.77 | +3.11 | -6.55 | yes |
| 56004 | +1.51 | — | 9.52 | 8.01 | -0.57 | +0.95 | -1.93 | yes |
| 56018 | -5.96 | -4.76 | 60.00 | 65.96 | +3.65 | -2.31 | +6.09 | yes |
| 58008 | -1.32 | -1.51 | 32.18 | 33.50 | +1.81 | +0.49 | -0.32 | yes |
| 58011 | -1.34 | -1.30 | 19.39 | 20.74 | +1.72 | +0.38 | +3.56 | yes |
| 60002 | -0.71 | -0.52 | 14.22 | 14.93 | +1.12 | +0.41 | +3.12 | yes |
| 60009 | -1.09 | -1.29 | 40.83 | 41.91 | -0.76 | -1.85 | +2.04 | yes |
| 62008 | -0.61 | -0.58 | 17.61 | 18.22 | +0.72 | +0.11 | -1.87 | yes |
| 63013 | -0.73 | -0.64 | 26.26 | 26.99 | -0.51 | -1.24 | -1.41 | yes |
| 68004 | -1.05 | — | 16.29 | 17.35 | -4.24 | -5.30 | -1.69 | yes |
| 72001 | -0.52 | -0.59 | 12.91 | 13.42 | +1.41 | +0.89 | -0.18 | yes |
| 73009 | -20.10 | -15.10 | 37.91 | 58.01 | +25.53 | +5.43 | -0.25 | yes |
| 74012 | -1.71 | — | 15.73 | 17.44 | -7.90 | -9.61 | -2.35 | yes |
| 74028 | -0.63 | — | 19.02 | 19.65 | +0.14 | -0.50 | +0.30 | yes |
| 74035 | -1.10 | -0.81 | 28.51 | 29.61 | +0.53 | -0.57 | +0.85 | yes |
| 75011 | -0.94 | — | 12.25 | 13.19 | +5.88 | +4.93 | +0.22 | yes |
| 76002 | — | -0.83 | 27.29 | 27.72 | +1.65 | +1.22 | +0.06 | yes |
| 76012 | -0.66 | — | 16.76 | 17.42 | -1.52 | -2.18 | -4.44 | yes |
| 76013 | — | -0.50 | 19.86 | 20.31 | +0.63 | +0.19 | -1.15 | yes |
| 77001 | — | -0.51 | 15.26 | 15.73 | -2.28 | -2.75 | +1.38 | yes |
| 84002 | -5.91 | -4.24 | 75.51 | 81.43 | -11.35 | -17.26 | -10.52 | yes |
| 88003 | -10.56 | -3.50 | 33.12 | 43.68 | +2.52 | -8.04 | +35.55 | yes |
| 89003 | -6.54 | -6.82 | 42.05 | 48.58 | +11.71 | +5.18 | -4.11 | yes |
| 92001 | -0.54 | — | 12.06 | 12.61 | +2.77 | +2.22 | -0.26 | yes |
| 94001 | — | -0.62 | 20.43 | 20.87 | +0.79 | +0.35 | +2.57 | yes |
| 94002 | -0.58 | -0.57 | 14.41 | 14.99 | +1.65 | +1.08 | +1.84 | yes |
| 97001 | -0.55 | — | 18.92 | 19.48 | +3.12 | +2.56 | +2.30 | yes |
| 101003 | -15.08 | -15.85 | 60.28 | 75.36 | +24.89 | +9.82 | -7.33 | yes |
| 103001 | -3.46 | -3.09 | 28.70 | 32.16 | -3.26 | -6.72 | +6.79 | yes |
| 107010 | -1.52 | -1.09 | 32.84 | 34.35 | -1.94 | -3.46 | +4.54 | yes |

### 7.6 Multiplicity and exploratory rows

395 non-confirmatory rows carry a verdict (secondary, sensitivity, exploratory); at α = 0.05 about 20 would be significant by chance alone; 91 are significant (uncorrected).

Significant under BH but not under Holm ("significant at FDR 5%; not at family-wise 5%"): BER H1a, BER H2.

### 7.7 What E1c must not claim (§10 with A4 rev. 1 E8, binding)

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
- Which city has more unemployment, transfer receipt or child poverty, from the matched U/T/C levels
  (definitions differ, §3.2) (A4 rev. 1 E8).
- Every P354 §9 item.

### 7.8 Deviations and implementation readings

No numbered deviation from the pre-registration was needed. Where the text left an operational detail open, the implementation reads it as follows (for geo-DS/domain ratification):

- **Code placement.** The matched panel lives in `analysis/thesis_matched_panel.py` and runs through the suite's CLI (`analysis/thesis_hypothesis_suite.py --panel matched`, §9.3). The existing `BER/*` and `HH/*` code paths and outputs are untouched.
- **Sensitivity verdicts are uncorrected** (§0 Families; P354 §5.4): per-city sensitivity rows use the unadjusted 95% CI; X8 sensitivity rows read DIFFERS at unadjusted p < 0.05. The robust-DIFFERS condition 'DIFFERS in the ≥ 5,000-resident panel' is evaluated with that standard.
- **Flip flags compare the verdict columns as written** (`small_units_flip`, `core3m_flip`, `core2_flip`, `w24_weight_sensitive`, `r19_revision_sensitive`): the primary's verdict (BH-adjusted) against the sensitivity row's verdict (uncorrected). A primary that is NOT SIGNIFICANT only after BH can therefore carry a flip flag. Sign flags (`maup_flip`, `mapping_driven`, `popgrowth_driven`, and the X8 sign part of `r19_revision_sensitive`) compare the sign of θ − θ0 (Δ for X8).
- **Coarse-cluster sensitivities** (G = 16, Bezirk 12 / 7) use the directional_inference default floor of 5 clusters, because §6.2 requires them to be reported; every confirmatory row keeps the P354 20-cluster floor.
- **R19-pub** is the as-published 2019 level with pp changes (A4.4's original construction); the §4.3 z-change fallback is not applied to it.
- **M3 '2020 only'** swaps the Berlin edition-2023 aggregation weights only; the T\* base of each PLR stays the 2022 interpolation. W24 swaps both (A4.1, E6).
- **Mapping and population-growth diagnostics** (§5, R5/E7): the units in the top decile of OSM total-POI growth 2019–2025 (DHS growth) or of population growth 31.12.2018–31.12.2024 are dropped from the H3a/H3b/H3c primary rows; the outcome is not re-standardised. Berlin growth uses Bezirksregion totals over all child PLRs (E7); Hamburg uses the balanced Gebiete.
- **N1** uses the city's median of K at each pivot edition; the R2 centrality split uses 31.12.2024 populations (A4.1). **N3** computes the spatial lag over all matched units, also inside the ≥ 5,000 run.
- **≥ 5,000 threshold** on the population of the unit's balanced children at 31.12.2024 (Berlin, A4.1) / edition 2025 (Hamburg).
- **Feature lists.** The common lists (A1.1 rule per city, then the intersection) are computed once on the matched units and reused by every matched-grain sensitivity; the fine grain has its own common lists. Both were written to the metadata before any fit.
- **P354 §4.4 Hamburg low-power rule not applied.** It belonged to the class-based Hamburg H2 (4–10% positives); §3.5 replaces that operationalisation with dK > 0 in both cities.
- **Carried-over secondaries.** D4 rows are dropped (§8.1 allow-list: OA, g(c), Δr, Wg(c), K, dK only), published-class rows are not defined at the matched grain, and the POI-derived P354 §5.2 variants (domain/commercial OA, base indicators, per-1k stock, OA basket, total-share and café growth) are kept. Per-1k rows use the population of all children (all PLRs at 31.12.2024; Hamburg Gebiete scored in 2025).
- **Moran's I residuals** are the rank-regression residuals of the outcome on the predictor and the controls (the linear model behind the partial Spearman), per pivot (H3a/H3b) or window (H3c).
- **Protection-zone shares (context, unlinked).** Berlin: Milieuschutz panel, snapshot 2025, areas designated by 2024, overlap fraction × 31.12.2024 population. Hamburg: soziale Erhaltungsverordnungen in force by 31.12.2024, area cover of each Gebiet × edition-2025 population.
- **Regelaltersgrenze f** uses the exact fractions 7/24, 9/24, 11/24, 12/24 (§3.7 prints them rounded to 0.292 / 0.375 / 0.458 / 0.500).
- **Debug runs.** Low-B smoke runs (B = 29 and B = 99) were executed while debugging the code, before the B = 1999 run that produced this file. No design choice was changed after them.

## 8. Reconciliation with the P354 panels

Where a matched verdict differs from the `BER/modern` or `HH/full` verdict, the table names what the matched design changed. It does not imply that the earlier results were wrong.

| City | Hyp | P354 verdict | Matched verdict | What changed |
|---|---|---|---|---|
| BER (BER/modern) | H1 | SUPPORTED | SUPPORTED |  |
| BER (BER/modern) | H1a | NOT SIGNIFICANT | SUPPORTED | grain (PLR → Bezirksregion) and construct (S1+S3+S4 composite → harmonised K with T\*); windows unchanged (W1–W3) |
| BER (BER/modern) | H1b | SUPPORTED | SUPPORTED |  |
| BER (BER/modern) | H1c | CONTRADICTED | CONTRADICTED |  |
| BER (BER/modern) | H2 | SUPPORTED | SUPPORTED |  |
| BER (BER/modern) | H3a | NOT SIGNIFICANT | NOT SIGNIFICANT |  |
| BER (BER/modern) | H3b | NOT SIGNIFICANT | NOT SIGNIFICANT |  |
| BER (BER/modern) | H3c | NOT SIGNIFICANT | NOT SIGNIFICANT |  |
| HH (HH/full) | H1 | NOT SIGNIFICANT | SUPPORTED | grain (Gebiet → Stadtteil), construct (Statusindex/Dynamik classes → harmonised K) and window (3-year Dynamik editions 2016–2025 → 2-year level changes 2019–2025) |
| HH (HH/full) | H1a | SUPPORTED | SUPPORTED |  |
| HH (HH/full) | H1b | SUPPORTED | SUPPORTED |  |
| HH (HH/full) | H1c | CONTRADICTED | NOT SIGNIFICANT | grain (Gebiet → Stadtteil), construct (Statusindex/Dynamik classes → harmonised K) and window (3-year Dynamik editions 2016–2025 → 2-year level changes 2019–2025) |
| HH (HH/full) | H2 | NOT SIGNIFICANT | NOT SIGNIFICANT |  |
| HH (HH/full) | H3a | NOT SIGNIFICANT | NOT SIGNIFICANT |  |
| HH (HH/full) | H3b | NOT SIGNIFICANT | NOT SIGNIFICANT |  |
| HH (HH/full) | H3c | NOT SIGNIFICANT | NOT SIGNIFICANT |  |

