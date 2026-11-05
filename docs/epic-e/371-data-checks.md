# #371 data phase: evidence for the binding data-engineer checks

- **Author:** data-engineer
- **Date:** 2026-11-04
- **Issue:** #371 (methodology-bearing; R-C1 dual gate)
- **Branch:** `feat/371-matched-comparison`
- **Binding inputs:** ADR-0014 Amendment 2026-11-02 (`docs/adr/0014-hamburg-data-sources.md`);
  pre-registration `docs/methodology/371-matched-comparison-preregistration.md` (cited as **PR**),
  §3.2, §3.3 checks 1–5, §3.7 DE checks 1–7, PM decision M3.
- **Status:** pre-results. No matched-panel statistic was computed. Every query below touches
  only outcome components and population counts, never an outcome joined to a predictor.

## 0. Answers at a glance

| Check | Answer | Verdict |
|---|---|---|
| HH S4 SGB II only in 2023/2025? (PR §3.2 item 3) | **Yes.** SGB II only from edition 2019 through 2025. Editions 2016–2018 are SGB III + SGB II. | PASS |
| HH S5 includes SGB XII / AsylbLG? (PR §3.2 item 2, D2) | **No.** S5 = non-employable SGB II beneficiaries (Sozialgeld) under 15, per under-15s, in every edition 2016–2025. | **core-1U is NOT triggered; the T-free construct is core-2** |
| HH S3 includes all SGB II recipients, incl. the unemployed? (§3.7 check 2) | **Yes** (definition): "Anteil der SGB-II-Empfänger/-innen an der Bevölkerung insgesamt", plus AsylbLG from 2019, with no exclusion of the unemployed. A count-level plausibility check is consistent with this except in 2 small Gebiete affected by small-cell noise. | PASS (gap 5 exists; direction A stands) |
| HH bases (§3.7 check 1) | S3: **all residents**, every edition. S4: residents **aged 15 to 65** ("zwischen 15 und 65 Jahren"), every edition. | PASS (Berlin T* base stays all residents) |
| Annex mean row unweighted or city rate? (PR §3.3 check 1) | **Unweighted mean over the scored Gebiete**; the SD is the population SD (ddof = 0). The report's "Hamburg" figures are this same unweighted mean. | recorded; descriptive levels must be labelled "unweighted Gebiet mean" |
| Annex checks 1–5 (PR §3.3) | z moments, share range, precision, header mapping, summe and class-count reproduction all hold. | PASS (5/5) |
| Berlin S1 / S3 bases per edition (§3.7 check 3) | S1: SGB II unemployed per resident **15 to < 65 (MSS 2019)**, **15 to < Regelaltersgrenze (MSS 2021, 2023, 2025)**. S3: non-unemployed SGB II + SGB XII (Kap. 3, 4) recipients per **all residents**, every edition. | PASS |
| EWR age bands staged (§3.7 check 4) | 2018, 2020, 2024, 2025 staged; 2022 interpolated (M3). Σ bands = residents_total exactly in every PLR-year; city totals preserved exactly after crosswalk. | PASS |
| T* plausibility (§3.7 check 5) | 0 violations of T\* ≥ S3 and T\* − S3 ≤ S1 in 2,143 PLR-editions. City T\* within 0.59 pp (2020) and 0.52 pp (2022) of the value implied by the published Berlin S1/S3. | PASS |
| 2022 interpolation flagged (§3.7 check 6) | `is_interpolated` / `derivation` on every 2022 row; tested. | PASS |
| Regelaltersgrenze per date (§3.7 check 7, D9a) | 65 y 7 m / 65 y 9 m / 65 y 11 m / 66 y 0 m; f = 0.292 / 0.375 / 0.458 / 0.500 confirmed. The MSS uses the cohort-dependent Regelaltersgrenze (§ 7a SGB II), not a fixed bound, from MSS 2021. | PASS |

**Design consequence.** Every binding check passes. The **primary design (core-3H with T\*) holds**.
No pre-registered fallback applies: the age bands exist, so `t_star_approx` is not needed, and DE
check 2 passes, so core-3M stays a sensitivity. Because HH S5 excludes AsylbLG, the T-free
construct in the robust-DIFFERS rule is **core-2**, and **core-1U is not added** (PR §3.2, §6.3).

Findings the analysis must know (no design change, see §6): the Hamburg S4 window seam lies outside
the matched windows; the annex precision varies by edition; and the existing Berlin LOR crosswalk is
purely areal, which misallocates some 2018/2020 population (quantified in §4.4).

---

## 1. Hamburg annex: what was ingested

- **Source:** "Sozialmonitoring Integrierte Stadtteilentwicklung, Bericht <E> – Anhang", sheet II
  "Indikatoren", editions 2016–2025, from the ten pinned `daten.transparenz.hamburg.de` URLs in the
  `seed_hh_sozialmonitoring_published_class_counts` description. Licence dl-de/by-2.0, attribution
  "Freie und Hansestadt Hamburg, Behörde für Stadtentwicklung und Wohnen". Edition 2018 uses the
  corrected annex.
- **Script:** `ingestion/hamburg/sozialmonitoring/ingest_hamburg_sozialmonitoring_annex.py`
  (openpyxl, explicit `EDITION_SPECS` per edition; an unmapped edition, a moved code column, a
  changed S3/S4/S5 label or a Gebiet count different from the seed raises). The script's own
  download (`--refresh`) gave files byte-identical to a first `curl` fetch (SHA-256 recorded in the
  parquet column `source_sha256`).
- **Raw files:** `data/raw/hamburg/sozialmonitoring_annex/xlsx/annex_<E>.xlsx` (gitignored). The
  parquet is `data/raw/hamburg/sozialmonitoring_annex/annex_indicators.parquet`, in its own directory
  because `stg_hamburg_sozialmonitoring` globs `sozialmonitoring/*.parquet`.
- **Model:** `stg_hamburg_sozialmonitoring_indicators` (view), 110,747 rows = 8,519 Gebiet-editions
  × 13 indicators (S1–S7, D1–D6):

| Edition | Gebiete | S7 z = 0 cells (handling) | z precision | mean/SD precision | max recovery bound (pp) |
|---|---:|---:|---|---|---:|
| 2016 | 847 | 43 → NULL | 2 decimals | 3 decimals | 0.77 |
| 2017 | 846 | 2 kept | 2 decimals | full | 0.10 |
| 2018 | 848 | 2 kept | 2 decimals | full | 0.10 |
| 2019 | 852 | 6 kept | 2 decimals | 3 decimals | 0.81 |
| 2020 | 850 | 0 | full | full | 0.00 |
| 2021 | 853 | 28 → NULL | 2 decimals | 3 decimals | 0.75 |
| 2022 | 853 | 32 → NULL | 2 decimals | full | 0.10 |
| 2023 | 856 | 34 → NULL | 2 decimals | 3 decimals | 1.13 |
| 2024 | 857 | 39 → NULL | 2 decimals | 3 decimals | 1.03 |
| 2025 | 857 | 39 → NULL | 2 decimals | 3 decimals | 1.04 |

The Gebiet counts equal the published class counts (seed) in every edition.

**Units.** The mean and SD rows are fractions. Example: S3 2025 has mean 0.105, and the 2025 report
says "Im Vergleich zum Vorjahr ging der Anteil von 10,9 % auf 10,5 % zurück" (Bericht 2025, PDF
p. 10). So share = 100 · (mean + z · SD) in %.

**S7 exclusion (revised after DE review, finding 5).** S7 ("bes. Gebietsausschluss") codes
excluded Gebiete as z = 0 in some editions only. Whether the zeros were part of the
standardisation shows in the moments:

| Edition | z = 0 cells | SD(z) with zeros | SD(z) without zeros | Reading |
|---|---:|---:|---:|---|
| 2016 | 43 | 0.975 | 1.001 | exclusion code |
| 2017 | 2 | 1.000 | 1.001 | genuine 0.00 |
| 2018 | 2 | 1.000 | 1.001 | genuine 0.00 |
| 2019 | 6 | 1.000 | 1.004 | genuine 0.00 |
| 2020 | 0 | 1.000 | 1.000 | — |
| 2021–2025 | 28–39 | 0.976–0.983 | 0.999–1.002 | exclusion code |

So the rule is edition-specific: S7 cells with z = 0 in **2016 and 2021–2025** are NULL with
`cell_flag = 's7_zero_exclusion_code'` (215 cells). In **2017–2020** the 10 zeros are kept as genuine
values. (The first version NULLed all 225 zeros, which pushed the 2017–2019 SD to 1.001–1.004.)
Within an exclusion edition a genuine z that rounds to 0.00 cannot be told apart. This affects only
S7, which is context only (PR §3.1).

**Deviation from the ADR-0014 amendment wording (finding 6).** The amendment's "Target" says
"Gebiete below the population threshold are NULL with a flag". The model instead leaves them out:
the annex, like the WFS, contains only scored Gebiete (≥ 300 residents), so a Gebiet below the
threshold has **no row** in that edition. Inventing NULL rows would need a Gebiet frame from
another source and a guess at which unscored Gebiete exist in each edition. **Rationale:** an
absent `(edition_year, gebiet_id)` means "not scored in that edition". The panel code must treat
it exactly that way, i.e. as not part of that edition, never as 0 and never as imputed. The
balanced-panel rule (PR §2.3, §5 below) does this. The ADR text is unchanged; this note records
the deviation.

## 2. Hamburg annex checks (PR §3.3, binding)

All six are also dbt tests (severity error) and pass in `uv run poe build`.

1. **Moments (`test_371_hh_annex_z_moments`).** All 130 edition × indicator cells have
   |mean z| ≤ 0.01 and |SD z − 1| ≤ 0.01. The largest deviations are mean −0.0033 (S7 2025) and SD
   1.0019 (S7 2024); for S3/S4/S5 they are ≤ 0.001 and ≤ 0.0009. With the edition-specific S7
   rule (§1), S7's SD is 0.9997–1.0019 in every edition.
   - **Population SD.** In the full-precision edition 2020, SD(z) with ddof = 0 is 1.0000 exactly
     for S3/S4/S5, and 1.0006 with ddof = 1.
   - **The mean row is the unweighted Gebiet mean, not a city rate.** (a) The mean of z over
     Gebiete is 0 in every edition. The population-weighted mean of z is not: −0.02 to +0.09 for S3/S4/S5. (b) In
     2020, m + z·s lands exactly on the 0.001 grid for every Gebiet and indicator (max deviation
     0.0000), and n·m is an exact multiple of 0.001 in 2017, 2018, 2020 and 2022 for S1, S4 and S5.
     That is the arithmetic signature of an unweighted mean of 3-decimal Gebiet shares. (c) The 2021
     report states S4 "stieg in den 853 betrachteten Statistischen Gebieten … von 3,0 % … auf 3,6 %"
     (Bericht 2021, PDF p. 26–27), which equals the annex mean rows 0.030 (2020) and 0.036 (2021),
     described as a value over the Gebiete. The same report quotes the SGB III rate separately as
     "hamburgweit".
   - **Consequence (PR §3.3).** Harmless for ranks and z-scores. Descriptive Hamburg levels must be
     labelled "unweighted mean over scored Gebiete". Population-weighted means differ by up to
     1.05 pp: for example S5 2019 has mean row 17.5 % and population-weighted 18.55 %.
2. **Share range (`test_371_hh_annex_share_range`).** No recovered share lies outside
   [−0.5, 100.5]: **0 of 59,418** non-excluded status cells, against a FAIL threshold of 0.5 %. Shares slightly
   outside [0, 100] (min −0.17, max 100.22) all lie within the cell's rounding bound, and the test
   asserts exactly that.
3. **Precision.** As tabulated in §1. At two-decimal z, the error is 0.005·s. For S4 (s ≈ 0.024–0.034)
   this is ≤ 0.017 pp, and for S3 (s ≈ 0.09–0.12) ≤ 0.06 pp. The mean and SD are rounded to 3
   decimals in 2016, 2019, 2021 and 2023–2025, which adds up to 0.05 pp + |z|·0.05 pp. The SD rounding
   scales each edition's pp changes by up to ±0.0005/s, i.e. **±1.5–2.1 % for S4** (s = 0.024–0.034)
   and ±0.5 % for S3. PR §3.3 notes that the SD sets the scale of the pp changes. This is the
   size of that uncertainty. It is small, but the analysis should not read differences in S4 change magnitudes smaller than
   about 2 %.
4. **Header mapping (`test_371_hh_annex_core_labels` + script).** Columns are located by the code
   row (S1…S7, D1…D6, "Dynamik-summe") and the long labels, per edition. The exact S3/S4/S5 labels:

   | Editions | S3 | S4 | S5 |
   |---|---|---|---|
   | 2016–2018 | S3 SGB-II-Empfänger/-innen | S4 Arbeitslose | S5 Kinder (unter 15 Jahren) in Mindestsicherung |
   | 2019 | S3 SGB-II- und AsylbLG-Empfänger/-innen | S4 Arbeitslose (SGB II) | S5 … in Mindestsicherung (SGB II) |
   | 2020, 2022–2025 | S3 SGB-II- und AsylbLG-Empfänger/-innen | S4 Arbeitslose | S5 … in Mindestsicherung |
   | 2021 | S3 SGB-II- und AsylbLG-Empfänger/-innen | S4 Arbeitslose (SGB II) | S5 … in Mindestsicherung |

   Unit tests (`tests/ingestion/test_hamburg_sozialmonitoring_annex.py`) show that swapped S3/S4
   columns, a changed S5 label, a wrong Gebiet count, a missing sheet and an unmapped edition all
   raise.
5. **Summe and class counts.**
   - `test_371_hh_annex_summe_reproduction`: ΣS1…S7 equals the Status-summe within 0.03, and
     ΣD1…D6 the Dynamik-summe within 0.02, for all 8,519 Gebiet-editions (exact in 2020).
   - `test_371_hh_annex_gebiet_counts_match_seed`: the per-edition counts equal the seed.
   - `test_371_hh_annex_gebiete_match_wfs`: the Gebiet sets and populations equal the WFS in every
     edition.
   - `test_371_hh_annex_summe_separates_wfs_classes`: the WFS status and Dynamik classes are
     strictly separated by the Summe in coded order in every edition. For example in 2025, hoch is
     ≤ −5.72 and mittel ≥ −5.69, against the published ±5.70.
     This guards the Gebiet join and the class-code order only. It reads the published Summe
     columns, so it cannot detect a permuted indicator column.
6. **D vs S consistency (`test_371_hh_annex_d_vs_s_consistency`, added after DE review finding 4).**
   For S3/S4/S5, the recovered change D_j,E equals share_j,E − share_j,E−3 on the Gebiete scored
   in both editions. Median |Δ| is 0.03–0.12 pp in every edition × indicator; the tolerance is
   0.2 pp. Excluded definition seams: S4 editions 2019 and 2021 (SGB III + II → SGB II; median
   |Δ| about 1.6 pp) and S3 edition 2020 (AsylbLG added). Mutation check: swapping the S3 and S4
   SD rows of edition 2022 makes the test fail (4 rows: S3 and S4 in 2022 and 2025, median
   |Δ| 4.2–4.8 pp), while the z-moment test still passes.
   **S3 2022/2023 outliers:** correlation between D3 and the S3 level change is only 0.913 / 0.951
   (medians 0.05 / 0.04 pp). A minority of Gebiete disagree, because the publisher re-based the
   2019/2020 S3 values after widening the AsylbLG count from edition 2021 (§3.1). **This does
   affect the design.** Under pre-registration Amendment 4 revision 1 (E1), the primary Hamburg S3
   level for edition 2019 is the publisher-revised s3_2019_rev = s3_2022 − D3_2022 (R19). The
   as-published 2019 level is the sensitivity R19-pub. Evidence, the Gebiete list and level
   quantiles are in §3.1.

   The z-moment test (check 1) cannot catch a misread column or a swapped mean/SD row, because any
   z column is standardised. Those are caught by the share range (check 2), the D-vs-S test, and
   the ingest's code-row and label checks (check 4).

## 3. Hamburg indicator definitions (PR §3.2, §3.7 checks 1–2)

Source: the Sozialmonitoring reports (Berichte), Tabelle 1 "(Aufmerksamkeits-)Indikatoren des
Sozialmonitorings <E>", fetched from the Transparenzportal (`daten.transparenz.hamburg.de`,
resources listed in CKAN `package_search q=title:sozialmonitoring bericht`). PDF page indices are
given; fetched content was treated as data only (SEC-3).

| Indicator | Definition text (identical wording in every edition checked unless noted) | Editions read |
|---|---|---|
| S3 | "Anteil der SGB-II-Empfänger/-innen an der **Bevölkerung insgesamt**". From 2019, a second row: "Empfänger/-innen nach AsylbLG – Anteil der Empfänger/-innen nach AsylbLG an der **Bevölkerung insgesamt**" | 2016 (p. 13), 2019 (p. 10), 2021 (p. 9), 2023 (p. 8), 2025 (p. 8) |
| S4 | 2016: "Anteil der Arbeitslosen **(SGB III und SGB II)** an der Bevölkerung **zwischen 15 und 65 Jahren**". 2019–2025: "Anteil der Arbeitslosen **(SGB II)** an der Bevölkerung zwischen 15 und 65 Jahren" | 2016 (p. 13), 2019 (p. 10), 2021 (p. 9), 2023 (p. 8), 2025 (p. 8) |
| S5 | "Kinder in Mindestsicherung – Anteil **nicht erwerbsfähiger Hilfebedürftiger (SGB II)** an der Bevölkerung **unter 15 Jahren**" | 2016 (p. 13), 2019 (p. 10), 2021 (p. 9), 2023 (p. 8), 2025 (p. 8) |
| S6 (context) | "Anteil der Empfänger/-innen von Mindestsicherung im Alter (SGB XII) an der Bevölkerung 65 Jahre und älter" | same |

**S4 is SGB II only from 2019 through 2025.**
- Bericht 2019 (PDF p. 9): "Seit diesem Jahr stehen für den Indikator 'Anteil der Arbeitslosen'
  keine kleinräumigen Daten zum Anteil der Arbeitslosen nach SGB III mehr zur Verfügung. Daher
  umfasst der Indikator im Gegensatz zu den Vorjahren nur noch den Anteil der Arbeitslosen nach
  SGB II."
- Bericht 2025 (PDF p. 10, footnote 4): "Seit dem Berichtsjahr 2019 werden durch die Bundesagentur
  für Arbeit keine kleinräumigen Daten zu Arbeitslosen nach SGB III zur Verfügung gestellt. Der
  Indikator 'Arbeitslose' wird seitdem nur noch auf Basis der Daten zu Arbeitslosen nach SGB II
  untersucht."
- The annex mean row drops from 0.049 (2018) to 0.029 (2019).

The seam is between editions 2018 and 2019, so it lies **outside all matched windows**. The
§4.3 z-change fallback is not triggered for U in W1–W3. It matters only for the `HH/full` panel's
pre-2019 windows; that is outside #371 scope and reported for completeness.

**S4 base.** "zwischen 15 und 65 Jahren". The same report family writes the SGB III rate as
"Bevölkerung im Alter von 15 bis 64 Jahren" (Bericht 2021, PDF p. 27). The base is the residents
aged 15 to under 65 (15–64 completed years), a fixed bound (no Regelaltersgrenze), consistent with
PR §3.1 "15–64". The reports do not write "unter 65" for S4 itself, which is a small residual
ambiguity.

**S5 excludes SGB XII and AsylbLG.** Its numerator is "nicht erwerbsfähige Hilfebedürftige
(SGB II)", the SGB II Sozialgeld recipients, in every edition. The 2019 annex header makes it
explicit: "S5 Kinder (unter 15 Jahren) in Mindestsicherung (SGB II)". "Mindestsicherung" in the
label is a heading, not the scope. **Consequence:** core-2 is the T-free construct. Core-1U is not
added. D2's refugee channel in C is absent in Hamburg, apart from recognised refugees, who are in
SGB II. That makes the W2 statement in PR §4.4, "U (and C, if S5 excludes AsylbLG) rise", the
operative case.

**S3 counts all SGB II recipients, including the unemployed (§3.7 check 2).**
- *Definition.* "Anteil der SGB-II-Empfänger/-innen an der Bevölkerung insgesamt", with no
  restriction, in all editions 2016–2025. Contrast Berlin S3, which is explicitly "Anteil der
  **nicht arbeitslosen** Empfänger/-innen" (MSS Indikatorenblätter, §5). In the BA statistics, SGB II
  recipients are the Leistungsberechtigte: employable (ALG II) and non-employable (Sozialgeld). The
  SGB II unemployed are, by definition, employable Leistungsberechtigte. Hamburg's own S5 is a
  subset of the same population (non-employable SGB II beneficiaries).
- *Supporting text.*
  - Bericht 2019 (PDF p. 9–10): refugees moving from AsylbLG to SGB II after recognition lower
    the AsylbLG share and raise the SGB II share. Both are in S3.
  - Bericht 2021 (PDF p. 8): AsylbLG recipients of "ausschließlich besonderen Leistungen … keine
    Schnittmenge mit den SGB-II-Empfänger/innen bilden". The S3 components are defined as disjoint
    benefit populations, not by labour-market status.
- *Count-level plausibility (necessary condition).* If S3 ⊇ the SGB II unemployed, then in every
  Gebiet S4 · P(15–64) ≤ S3 · P. With P(15–64)/P approximated from the Gebiet's Stadtteil age shares
  (`stg_hamburg_ewr_stadtteil`, 1 − sh65 − sh18 + 3/18 · sh18), the ratio N_S4 / N_S3 is:

  | Edition | Gebiete | median | 99th pct. | Gebiete with N_S4 > N_S3 |
  |---|---:|---:|---:|---:|
  | 2019 | 840 | 0.21 | 0.49 | 0 |
  | 2021 | 841 | 0.26 | 0.64 | 3 |
  | 2025 | 845 | 0.29 | 0.59 | 5 |

  The 2023 Stadtteil age shares (reference year 2022) are missing from `stg_hamburg_ewr_stadtteil`,
  so 2023 was not computed. The violations fall into two groups:
  - **Rounding:** both shares recover to about 0 %. These are 10003 and 67012 in 2021, and 45006,
    4001 and 39005 in 2025.
  - **Genuine:** two small, low-benefit Gebiete with erratic series. 39005 Lokstedt (373–459
    residents) has S4 > S3 in 2021, 2022 and 2023, with S4 jumping 0 → 2.3 → 2.6 → 2.8 → 0 %
    between 2020 and 2024. 67012 Poppenbüttel has S4 > S3 in 2023 to 2025, and S5 goes
    6.4 → 0.1 → 8.3 %.

  This pattern is typical of small-cell disclosure control, not of a definition. Two Gebiete out of
  about 850 cannot carry a K-level result, but the analysis should know about them.
- *Residual.* No report sentence says "einschließlich der Arbeitslosen" explicitly. The
  reports refer to the Sozialmonitoring-Bericht 2014 for the full method, which is hosted on
  `www.hamburg.de`. That host is not on the SEC-3 egress list, so it was not fetched. It could be
  confirmed there if the architect allows the host, or by the maintainer. The evidence above is
  judged sufficient for PASS. Gap 5 exists, and direction A (T\*) corrects it.

**S3 base = all residents** (Bericht 2016 to 2025, Tabelle 1, as quoted above). So under PR §3.7 the
Berlin T\* base stays **all residents**; the under-65 variant is not needed.

### 3.1 S3 base revised by the publisher (AsylbLG counting change, Bericht 2021)

Evidence for pre-registration Amendment 4 §A4.4 and its revision 1 (E1, E3, E4). Gebiete are
identified by ID only. None is labelled a refugee-accommodation site (E3).

Δ = D3_E − (s3_E − s3_E−3), where D3_E is the published 3-year change and s3 the recovered level
share of the same Gebiet in editions E and E−3. A negative Δ means the publisher's D3 starts
from a **higher** E−3 level than the one published in edition E−3: the earlier S3 base was
revised upward.

| Edition E | Gebiete matched | median \|Δ\| (pp) | \|Δ\| > 0.5 pp | of those: upward / downward | Pearson ρ(D3, s3 change) | Spearman ρ |
|---|---:|---:|---:|---|---:|---:|
| 2019 | 845 | 0.042 | **0** | 0 / 0 | 1.000 | 0.999 |
| 2020 | 842 | 0.039 | **59** | 0 / 59 | 0.922 | 0.980 |
| 2021 | 845 | 0.045 | **0** | 0 / 0 | 1.000 | 0.999 |
| 2022 | 850 | 0.047 | **52** | 51 / 1 | 0.913 | 0.981 |
| 2023 | 849 | 0.040 | **44** | 44 / 0 | 0.951 | 0.986 |
| 2024 | 852 | 0.047 | **0** | 0 / 0 | 1.000 | 0.999 |
| 2025 | 852 | 0.033 | **0** | 0 / 0 | 1.000 | 0.999 |

- **2020:** the AsylbLG seam. S3 adds AsylbLG from edition 2019, and the D3 of 2020 runs from
  the edition-2017 base. All 59 have Δ > 0, the opposite sign to 2022/2023. Already excluded from
  `test_371_hh_annex_d_vs_s_consistency`.
- **2022 and 2023:** 52 and 44 Gebiete. All revisions are upward, except one in 2022 (56004,
  Δ = +1.51 pp). These are exactly the two editions whose D3 window starts in edition
  2019 or 2020 and ends after edition 2021. The 2021 D3 (2018 → 2021) and the D3 from 2024 on show
  no revision.
- **Definition note, Sozialmonitoring Bericht 2021 (PDF p. 8):** "Ab diesem Berichtsjahr werden
  Empfänger/innen von Regelleistungen und ausschließlich besonderen Leistungen gemeinsam
  erfasst. Hiermit erweitert sich der betrachtete Personenkreis, da bis zum vergangenen
  Berichtsjahr nur Empfänger/innen von Regelleistungen erfasst wurden …" So from edition 2021
  on, AsylbLG recipients of "ausschließlich besondere Leistungen" are counted. The pattern
  (upward revisions only, only in the 2022 and 2023 windows, none from 2024 on) fits the publisher having recomputed the 2019/2020 base on the widened definition for D3. That
  is an inference from the data, not a publisher statement.
- The table below lists the 58 Gebiete with |Δ| > 0.5 pp in 2022 or 2023, under this
  section's heading "S3 base revised by the publisher":
  - published s3_2019 is the edition-2019 annex value;
  - revised s3_2019_rev = s3_2022 − D3_2022;
  - W1 is editions 2019 → 2021 (published: s3_2021 − s3_2019; revised: s3_2021 − s3_2019_rev);
  - W2 is s3_2023 − s3_2021;
  - all values in %, or pp for changes.

| Gebiet | Δ 2022 | Δ 2023 | s3_2019 published | s3_2019_rev | W1 published | W1 revised | W2 |
|---|---:|---:|---:|---:|---:|---:|---:|
| 2002 | -3.14 | -3.42 | 29.45 | 32.59 | -3.09 | -6.23 | -18.67 |
| 6004 | -13.96 | -15.68 | 54.08 | 68.04 | +21.62 | +7.66 | -8.29 |
| 7003 | — | -0.66 | 17.14 | 17.42 | +13.86 | +13.58 | -0.11 |
| 9001 | -0.54 | — | 16.95 | 17.49 | -3.46 | -4.00 | +9.63 |
| 11008 | -0.69 | — | 20.43 | 21.12 | -4.98 | -5.67 | +1.24 |
| 12004 | -0.69 | -0.78 | 13.85 | 14.53 | +24.16 | +23.47 | -1.12 |
| 13001 | -11.31 | -9.81 | 65.64 | 76.95 | +17.78 | +6.48 | +0.97 |
| 16005 | -3.65 | -3.70 | 33.31 | 36.96 | +1.50 | -2.15 | -0.70 |
| 23001 | -1.73 | — | 25.88 | 27.61 | -3.84 | -5.57 | -3.36 |
| 25001 | -2.77 | -2.66 | 31.43 | 34.20 | +3.90 | +1.13 | +25.65 |
| 25004 | -0.62 | — | 16.20 | 16.81 | -8.68 | -9.30 | -0.27 |
| 25005 | -21.17 | -15.36 | 65.74 | 86.91 | +16.97 | -4.20 | +2.02 |
| 25008 | -1.80 | -1.58 | 28.98 | 30.78 | +3.25 | +1.46 | -4.12 |
| 25011 | -0.51 | — | 19.68 | 20.19 | -0.93 | -1.44 | -1.50 |
| 27008 | -0.94 | -0.89 | 17.51 | 18.45 | +2.57 | +1.63 | -0.07 |
| 28013 | -1.43 | -1.19 | 40.07 | 41.51 | +0.81 | -0.62 | +0.22 |
| 29007 | -0.83 | -1.03 | 26.73 | 27.56 | -1.91 | -2.74 | -11.91 |
| 33001 | -8.06 | -5.98 | 48.91 | 56.97 | +13.20 | +5.14 | -4.24 |
| 39001 | -0.81 | -2.51 | 9.62 | 10.43 | +18.81 | +18.00 | -0.20 |
| 41006 | -2.43 | -1.70 | 23.44 | 25.86 | +6.64 | +4.21 | +1.93 |
| 42004 | — | -0.81 | 4.26 | 4.29 | +44.25 | +44.22 | -8.96 |
| 43015 | -2.28 | -1.97 | 17.89 | 20.17 | +5.49 | +3.21 | -0.37 |
| 46002 | -13.04 | -1.17 | 30.58 | 43.62 | -10.29 | -23.33 | +18.59 |
| 46003 | -3.97 | -12.07 | 23.91 | 27.88 | +41.91 | +37.93 | -3.40 |
| 47001 | -0.80 | -0.80 | 21.65 | 22.45 | +2.04 | +1.23 | -7.78 |
| 48005 | -13.18 | -8.72 | 48.82 | 62.00 | -25.13 | -38.31 | -1.79 |
| 49008 | -0.74 | -0.54 | 10.84 | 11.58 | +1.41 | +0.68 | -0.68 |
| 50005 | -0.52 | — | 15.07 | 15.59 | -1.68 | -2.20 | +4.30 |
| 54002 | -3.66 | -3.86 | 27.01 | 30.67 | +6.77 | +3.11 | -6.55 |
| 56004 | +1.51 | — | 9.52 | 8.01 | -0.57 | +0.95 | -1.93 |
| 56018 | -5.96 | -4.76 | 60.00 | 65.96 | +3.65 | -2.31 | +6.09 |
| 58008 | -1.32 | -1.51 | 32.18 | 33.50 | +1.81 | +0.49 | -0.32 |
| 58011 | -1.34 | -1.30 | 19.39 | 20.74 | +1.72 | +0.38 | +3.56 |
| 60002 | -0.71 | -0.52 | 14.22 | 14.93 | +1.12 | +0.41 | +3.11 |
| 60009 | -1.09 | -1.29 | 40.83 | 41.91 | -0.76 | -1.85 | +2.04 |
| 62008 | -0.61 | -0.58 | 17.61 | 18.22 | +0.72 | +0.11 | -1.87 |
| 63013 | -0.73 | -0.64 | 26.26 | 26.99 | -0.51 | -1.24 | -1.40 |
| 68004 | -1.05 | — | 16.29 | 17.35 | -4.24 | -5.30 | -1.69 |
| 72001 | -0.52 | -0.59 | 12.91 | 13.42 | +1.41 | +0.89 | -0.18 |
| 73009 | -20.10 | -15.10 | 37.91 | 58.01 | +25.53 | +5.43 | -0.25 |
| 74012 | -1.71 | — | 15.73 | 17.44 | -7.90 | -9.61 | -2.35 |
| 74028 | -0.63 | — | 19.02 | 19.65 | +0.14 | -0.50 | +0.30 |
| 74035 | -1.10 | -0.81 | 28.51 | 29.61 | +0.53 | -0.57 | +0.85 |
| 75011 | -0.94 | — | 12.25 | 13.19 | +5.88 | +4.93 | +0.22 |
| 76002 | — | -0.83 | 27.29 | 27.72 | +1.65 | +1.22 | +0.06 |
| 76012 | -0.66 | — | 16.76 | 17.42 | -1.52 | -2.18 | -4.44 |
| 76013 | — | -0.50 | 19.86 | 20.31 | +0.63 | +0.19 | -1.15 |
| 77001 | — | -0.51 | 15.26 | 15.73 | -2.28 | -2.75 | +1.38 |
| 84002 | -5.91 | -4.24 | 75.51 | 81.43 | -11.35 | -17.26 | -10.52 |
| 88003 | -10.56 | -3.50 | 33.12 | 43.68 | +2.52 | -8.04 | +35.55 |
| 89003 | -6.54 | -6.82 | 42.05 | 48.58 | +11.71 | +5.18 | -4.11 |
| 92001 | -0.54 | — | 12.06 | 12.61 | +2.77 | +2.22 | -0.25 |
| 94001 | — | -0.62 | 20.43 | 20.87 | +0.79 | +0.35 | +2.57 |
| 94002 | -0.58 | -0.57 | 14.41 | 14.99 | +1.65 | +1.08 | +1.84 |
| 97001 | -0.55 | — | 18.92 | 19.48 | +3.11 | +2.56 | +2.30 |
| 101003 | -15.08 | -15.85 | 60.28 | 75.36 | +24.89 | +9.82 | -7.33 |
| 103001 | -3.46 | -3.09 | 28.70 | 32.16 | -3.26 | -6.72 | +6.79 |
| 107010 | -1.52 | -1.09 | 32.84 | 34.35 | -1.94 | -3.46 | +4.55 |

A Gebiet with only a 2023 entry was within 0.5 pp in 2022, so its two W1 columns nearly agree.

**Effect on the design (pre-registration Amendment 4, revision 1, E1).** The primary
Hamburg S3 level for edition 2019 is the publisher's re-based value
**s3_2019_rev = s3_2022 − D3_2022 (R19)**, for every balanced Gebiet, not only the 58 listed. The
as-published 2019 level is the sensitivity **"R19-pub"**. W1 = [2019, 2021] would otherwise
straddle the counting change. The same logic as the Berlin backcast (PR §4.2) applies.
- *Coverage:* all 849 balanced Gebiete have both s3_2022 and D3_2022, so the "keep the published
  level" fallback applies to **0** Gebiete.
- *Size:* for the clean Gebiete, R19 is a rounding-level change (median |W1_rev − W1_pub| =
  0.048 pp over the 849). 52 balanced Gebiete (the 2022 set) move by more than 0.5 pp.
- *Level quantiles* (|ΔS3| in pp):

  | Window, Gebiete | median | p90 | p99 | max |
  |---|---:|---:|---:|---:|
  | W2 = s3_2023 − s3_2021, all 852 scored in both | 0.74 | 3.07 | 14.99 | 44.86 |
  | W2, the 849 balanced Gebiete | 0.74 | 3.06 | 13.86 | 44.86 |
  | W1 published (R19-pub), 849 balanced | 0.71 | — | 17.39 | 44.25 |
  | W1 revised (R19, primary), 849 balanced | 0.69 | — | 10.96 | 44.22 |

- *W2 is not claimed to be revision-free:* there is no D3_2026 to test s3_2023 against. Its start
  level s3_2021 checks clean against D3_2024 (0 Gebiete with |Δ| > 0.5 pp in 2024).
- *Guard:* `test_371_hh_annex_d_vs_s_consistency` (§2, check 6) holds the median while
  allowing these outliers, which R19 handles.

Reproduce with `stg_hamburg_sozialmonitoring_indicators`, pairing D3 with S3 by Gebiet and
edition (E, E−3).

## 4. Berlin (PR §3.7 checks 3–7)

### 4.1 S1 and S3 bases (check 3)

Source: SenSBW, *Monitoring Soziale Stadtentwicklung Berlin: Indikatorenblätter*, editions 2019,
2021, 2023 and 2025, fetched from `www.berlin.de` (`/sen/stadt/_assets/stadtdaten/stadtwissen/
monitoring-soziale-stadtentwicklung/bericht-<E>/…`). Printed page = PDF page.

| Edition | S1 (Arbeitslosigkeit) | S3 (Transferbezug) |
|---|---|---|
| MSS 2019 | "Anteil der Arbeitslosen nach SGB II an den **15- bis unter 65-Jährigen** in Prozent" (S. 13). Numerator: SGB II unemployed aged 15 up to the Regelaltersgrenze (§ 7a SGB II); those aged 65+ below it "sind in der Anzahl der Arbeitslosen nach SGB II jeweils enthalten" (S. 13). Denominator 15 to < 65; "im MSS 2019 letztmalig die Regelaltersgrenze 65 Jahre verwendet" (S. 14) | "Anteil der nicht arbeitslosen Empfängerinnen und Empfänger von Transferleistungen nach SGB II und SGB XII an den **Einwohnerinnen und Einwohnern**" (S. 18). Formula ab MSS 2017: non-unemployed ELB + NEF + sonstige LB (SGB II) + HLU Kap. 3 + Grundsicherung Kap. 4 SGB XII (outside institutions), over Einwohner (S. 18–19) |
| MSS 2021 | "Anteil der Arbeitslosen nach SGB II an der Bevölkerung im Alter von **15 Jahren bis unter der Regelaltersgrenze**" (S. 16); denominator "Einwohnerinnen und Einwohner im Alter von 15 Jahren bis unter der Regelaltersgrenze" (S. 17) | Same definition and formula, denominator "Einwohnerinnen und Einwohner" (S. 21–22). The Regelaltersgrenze enters S3 only through the SGB XII Kap. 3 group ("Personen unter der Regelaltersgrenze", S. 22), not the base |
| MSS 2023 | As 2021 (S. 18) | As 2021, "an den Einwohnenden" (S. 26) |
| MSS 2025 | As 2021 (S. 18) | As 2021, "an den Einwohnenden" (S. 26) |

This agrees with PR §3.7 and #360 §2. The MSS 2021 Vorbemerkungen (S. 7) state the reason: "Im MSS
2021 erfolgt die Berechnung nun bezogen auf die Regelaltersgrenze … Davon betroffen sind die
Index-Indikatoren S1 und S3".

### 4.2 Regelaltersgrenze per reference date (check 7, D9a)

**Statute.** § 235 Abs. 2 SGB VI (identical schedule in § 7a Abs. 2 SGB II, which the MSS cites):
born before 1947 → 65; then "wird die Regelaltersgrenze wie folgt angehoben":

| Geburtsjahr | 1953 | 1954 | 1955 | 1956 | 1957 | 1958 | 1959 | 1960 | … | 1963 | 1964+ |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Anhebung um Monate | 7 | 8 | 9 | 10 | 11 | 12 | 14 | 16 | … | 22 | 24 |
| auf Alter | 65 J 7 M | 65 J 8 M | 65 J 9 M | 65 J 10 M | 65 J 11 M | 66 J 0 M | 66 J 2 M | 66 J 4 M | … | 66 J 10 M | 67 |

The statute text (gesetze-im-internet.de) was not fetched: the host is not on the egress list. The
schedule is quoted from the law. The MSS 2019 Indikatorenblätter glossary (S. 55) summarises the
same rule: "Allerdings bleibt die Regelaltersgrenze für vor dem 01.01.1947 Geborene bei 65 Jahren
(§ 235, Abs. 2 SGB VI). Für Personen, die nach dem 31.12.1946 und bis zum 31.12.1963 geboren sind,
erhöht sich die Regelaltersgrenze nach einem festgelegten Satz sukzessive um einen bzw. zwei
Monate. Für alle nach dem 01.01.1964 Geborenen gilt die Regelaltersgrenze 67 Jahre."

**Per date.** At 31.12.Y, the people aged 65 are the cohort born Y − 65. Cohort c reaches its
Regelaltersgrenze in year c + 65 (+ months), so the cohort reaching it in Y is c = Y − 65 for every
Y ≤ 2023. For 2024, cohort 1958 reaches 66 y 0 m in 2024 and cohort 1959 only in 2025:

| Reference date | Cohort | RAG | f = (RAG − 65)/2 | PR value |
|---|---|---|---|---|
| 31.12.2018 | 1953 | 65 y 7 m | 7/24 = 0.292 | ✓ |
| 31.12.2020 | 1955 | 65 y 9 m | 9/24 = 0.375 | ✓ |
| 31.12.2022 | 1957 | 65 y 11 m | 11/24 = 0.458 | ✓ |
| 31.12.2024 | 1958 | 66 y 0 m | 12/24 = 0.500 | ✓ |

**The MSS uses the cohort-dependent bound from MSS 2021 onwards, not a fixed one.**
- MSS 2021 S. 16: "Zu den Arbeitslosen nach den Rechtskreisen SGB II zählen Personen im Alter von
  15 bis zur Erreichung der Regelaltersgrenze entsprechend § 7a SGB II. Die Regelaltersgrenze wird
  schrittweise angehoben (siehe Vorbemerkungen)."
- MSS 2021 Vorbemerkungen S. 7: the "Anhebung der Regelaltersgrenze nach § 7a SGB II von bisher 65
  auf 67 Jahre, die stufenweise bereits seit 2012 in Abhängigkeit des Geburtsjahres erfolgt".
- MSS 2023 S. 18 and MSS 2025 S. 18: the same wording. MSS 2023/2025 S. 13 history table:
  "Vollständige Umsetzung der Regelaltersgrenze bei S1, D1 sowie S3, D3".

The MSS links the BA method note (statistik.arbeitsagentur.de, "Anhebung-Altersgrenze.pdf") for
the exact population computation. That host is not on the egress list and was not fetched. The
PR approximation P^(U) = P(15–<65) + f · P(65–<67), uniform within the 65–67 band, is therefore
unchanged. **No deviation, so no amendment is needed.**

### 4.3 Age bands (check 4) and 2022 interpolation (check 6)

- **Staging.** `stg_berlin_ewr_age_bands` (view) reads the 32 contiguous bands E_E00_01 … E_E95_110
  from the raw EWR matrices (Amt für Statistik Berlin-Brandenburg, CC BY 3.0 DE; existing source):

  | Date | File | Vintage | PLR | Rows | Residents |
  |---|---|---|---:|---:|---:|
  | 31.12.2018 | EWR201812E_Matrix.csv | lor_pre2021 | 447 | 14,304 | 3,748,148 |
  | 31.12.2020 | EWR202012E_Matrix.csv | lor_pre2021 | 448 | 14,336 | 3,769,962 |
  | 31.12.2024 | EWR_L21_202412E_Matrix.csv | lor_2021 | 542 | 17,344 | 3,897,145 |
  | 31.12.2025 | EWR_L21_202512E_Matrix.csv | lor_2021 | 542 | 17,344 | 3,913,644 |

  Σ bands = E_E in **every** row of all four files (`test_371_ewr_age_bands_sum_to_total`).
  - Two PLRs per lor_2021 file are whole-row blank (2024 '') or 'NA' (2025). They are uninhabited
    and staged as 0 with `is_blank_row`. No partially blank row exists.
  - **Publisher code typo:** the 2024 file labels the blank Landweg row `06200318`, which is not a
    LOR 2021 code. It is corrected to `06200418` (`test_371_ewr_age_bands_codes_in_lor`).
    `int_berlin_ewr_plr2021` still carries `06200318` for 2024; it was not touched.
- **LOR 2021.** `int_berlin_ewr_age_bands_plr2021` (table), 542 PLR × 32 bands × 5 dates = 86,720
  rows.
  - 2018 and 2020 go through `seed_lor_crosswalk_2006_to_2021`. Its weights per old PLR sum to
    0.9993–1.0000, so they are **renormalised per old PLR**. With that, the city totals and every
    band's city total are preserved **exactly**: 3,748,148 and 3,769,962. Without renormalisation
    the 2018 total would lose 43 residents.
  - The cost is a deviation from `int_berlin_ewr_plr2021.residents_total` of at most 0.070 % (2.3
    residents) per PLR (`test_371_ewr_age_bands_vs_ewr_plr2021`, warn, passes at 0.1 %). For the
    analysis, use this model's `residents_total` as the population weight whenever bands are used,
    so P^(U) ≤ P holds exactly.
- **2022 (M3).** For each PLR and band, the midpoint of 2020 and 2024. `is_interpolated = TRUE` and
  `derivation = 'linear_interpolation_2020_2024'` on all 17,344 rows and on no other row
  (`test_371_ewr_age_bands_plr2021_totals`). City total 3,833,553.5.
- **Labels and flags (revised after DE review, finding 7).** The crosswalked years carry
  `derivation = 'crosswalk_areal_renormalised'`. The earlier label `…_areal_pop_weighted_…` repeated
  the seed's misleading `mapping_type` (§4.4). `is_blank_row` is now `residents_total = 0` per
  PLR-year. Before, it was an OR over the source rows, which flagged Pankower Tor 2022 as blank
  although it carries 3,148 interpolated residents. In the native years the two definitions agree
  exactly: no non-blank matrix row has 0 residents.

### 4.4 Finding: the existing LOR crosswalk is areal, not population-weighted

This is not a check failure, but it matters for the 2018/2020 weights. The seed's `note` says
"weight = intersection_area / pre2021_plr_area". Its `mapping_type` is `areal_pop_weighted`, but
the weights are purely areal. So residents of an old PLR are spread by area, including onto
uninhabited land.

Two LOR 2021 PLRs have 0 residents in 2024 and 2025 (blank rows, no MSS values) but receive
residents through the crosswalk in 2018 and 2020:

| LOR 2021 PLR | Source old PLR, weight | Residents assigned, 31.12.2020 |
|---|---|---:|
| 03400831 Pankower Tor (former freight yard) | 03040818 (35,738 residents), 0.176 | 6,295 |
| 06200418 Landweg | 06020407 (4,636 residents), 0.766 | 3,801 |

So about 10,100 residents (0.27 % of the city) sit on uninhabited PLRs in 2018 and 2020, and
about 5,000 in the interpolated 2022. They are missing from the neighbouring PLRs where they
actually live (for example 06200419 Thermometersiedlung, which had 4,539 residents in 2024).

How far 2020 (crosswalked) is from 2024 (native) at each grain (revised after DE review,
finding 1). The ratios are computed on child PLRs only: PLRs inhabited at both dates, so Pankower
Tor and Landweg, which cannot enter the balanced panel, are excluded, and BZR totals are summed
over those children. The ratio includes genuine growth of +3.4 % city-wide and new-build quarters,
so it is an upper bound on the artefact:

| Child set | Grain | Units | median P_2020/P_2024 | \|ln ratio\| > ln 1.25 | \|ln ratio\| > ln 1.5 | BZR range |
|---|---|---:|---:|---:|---:|---|
| inhabited at both dates | PLR | 540 | 0.982 | **102** (19 %) | 54 | — |
| inhabited at both dates | **BZR** | 143 | 0.975 | **1** (034008) | 0 | 0.793–1.115 |
| + MSS S1 in 2021/2023/2025 (PR §2.3 frame) | PLR | 535 | 0.981 | 98 | 50 | — |
| + MSS S1 in 2021/2023/2025 (PR §2.3 frame) | **BZR** | 143 | 0.975 | **3** (053008, 122004, 034008) | 1 (053008) | 0.605–1.115 |

The first version of this table summed all PLRs, including the two uninhabited ones. That made
the two affected BZRs look clean, because the misplaced residents stayed inside the BZR total.
On the child set the distortion shows up as follows:

- **BZR 034008 Pankow Süd:** P_2020/P_2024 = **0.793**. The 6,295 residents placed on Pankower Tor
  are missing from its inhabited children.
- **BZR 062004 Ostpreußendamm:** the BZR ratio is unremarkable, but the **weights inside it are
  distorted**. Thermometersiedlung 06200419 has 1,081 residents in 2020 against 4,539 in 2024,
  while its neighbours 06200420–06200423 change by less than 7 %. Its S1 in 2021 is 7.18 %,
  against 2.36–4.47 % for those neighbours. That is a high share on a deflated base, so its
  2018/2020 weight in any population-weighted BZR aggregate is too small by a factor of about 4.
- **The source PLRs stay inside their BZR.** 03040818 puts **99.86 %** of its crosswalk weight
  into BZR 034008 (0.14 % into four neighbouring BZRs). 06020407 puts **100 %** into BZR 062004.
  So the BZR totals of all residents (children plus the uninhabited PLR) are right to within
  0.14 %. What is wrong is the split between the uninhabited PLR and the inhabited children inside
  the BZR, and the weight of each child.
- **053008 Siemensstadt (0.605) and 122004 Tegel-Süd/Flughafensee (0.78)** exceed 25 % only in
  the MSS frame. There, PLRs without MSS values drop out, and the remaining children grew
  strongly (new-build growth is plausible but was not checked individually). Whether that is
  growth or an artefact was not determined.
- **PLR grain:** 102 of the 540 inhabited PLRs (19 %) are more than 25 % off, and 54 more than
  50 %. The MAUP sensitivity in PR §6.5 runs at this grain, and at it the 2018/2020/2022
  populations of split PLRs are unreliable.

The same artefact is already in `int_berlin_ewr_plr2021`, which the PR's §3.4 weights use. It is
pre-existing and was not introduced here. **Impact on the design:**
- T\* at PLR depends only on P^(U)/P. That ratio is an area-weighted mix of old-PLR age
  structures, so it is less sensitive than the counts.
- **BZR totals** for 2018/2020/2022 are right to within 0.14 % for the two affected BZRs. The
  weights of the inhabited children inside BZR 034008 and BZR 062004 are not, and the 034008
  child-set total is about 6,300 residents (18 %) short.
- 2024 and 2025 are native and unaffected.

Recommendation for geo-DS, not done here because it is a gated crosswalk change:
- disclose the artefact for the PLR-grain MAUP rows; or
- use a population-weighted crosswalk for the 2018/2020 counts (for example the existing
  `int_berlin_lor_crosswalk_dominant_pop_2021`, or block-level population).

The 2024-only weight sensitivity that M3 already pre-registers for 2022 covers the BZR weights
in W2.

### 4.5 T\* plausibility (check 5)

The PR §3.7 formula, applied read-only as a check (the construct itself is analysis-phase code):
- T\* = S1 · P^(U)/P + S3;
- P^(U) = P(15–<65) + f · P(65–<67), with f from §4.2;
- bands at 31.12.(E−1) from `int_berlin_ewr_age_bands_plr2021`;
- S1/S3 from `stg_berlin_mss_indicators` (lor_2021); edition 2019 is backcast as
  anteil_2021 − dynamik_2021.

| Edition (bands date) | PLR | T\* < S3 | T\* − S3 > S1 | P^(U)/P min / median / max | T\* min / median / max (%) | city T\* (%) |
|---|---:|---:|---:|---|---|---:|
| 2019 backcast (2018) | 536 | 0 | 0 | 0.465 / 0.669 / 0.843 | 1.13 / 11.89 / 49.48 | 15.08 |
| 2021 (2020) | 536 | 0 | 0 | 0.476 / 0.669 / 0.844 | 1.54 / 11.99 / 48.32 | 14.80 |
| 2023 (2022, interpolated) | 536 | 0 | 0 | 0.504 / 0.675 / 0.853 | 1.80 / 11.37 / 45.30 | 13.92 |
| 2025 (2024) | 535 | 0 | 0 | 0.518 / 0.674 / 0.867 | 1.24 / 11.18 / 45.03 | 13.60 |

No backcast value is negative.

**City level.** The MSS does not publish a Berlin-wide "all SGB II + XII recipients" rate as such.
It does publish the Berlin S1 and S3 (MSS 2023 report, Tabelle 7, S. 23: 31.12.2020 S1 5.3 %,
S3 11.8 %; 31.12.2022 S1 4.6 %, S3 11.3 %). From those and the city P^(U)/P, the published
all-recipients rate is S1_B · P^(U)/P + S3_B:

| Date | Published-derived T\* | PLR-aggregated T\* | Difference | PLR-aggregated S1 / S3 vs published |
|---|---:|---:|---:|---|
| 31.12.2020 | 15.39 | 14.80 | −0.59 pp | 5.20 / 11.28 vs 5.3 / 11.8 |
| 31.12.2022 | 14.44 | 13.92 | −0.52 pp | 4.52 / 10.84 vs 4.6 / 11.3 |

Both are within the ±1 pp tolerance. The gap comes mostly from S3: the PLR-aggregated S3 is about
0.5 pp below the published Berlin S3. That is consistent with the Berlin-wide figure including
recipients the MSS does not assign to a scored PLR (excluded PLRs and the Jobcenter-address
revisions, MSS 2021 S. 17 and 22). For 31.12.2024 the MSS 2025 report was not retrieved: the
guessed URL returned 404 after rate limiting. That check is open but not binding.

## 5. Balanced Hamburg child panel (PR §2.3, DE to report)

- 849 Gebiete are scored in all four editions 2019, 2021, 2023 and 2025.
- 859 are scored in at least one of them, and 857 in 2025.
- So **8 of the 857 scored 2025 Gebiete** (10 of the 859 ever scored) drop out of the balanced
  panel. That is within the PR's expected "< 10" for the 2025 frame.

## 6. Open issues and notes for the analysis phase

1. **Areal crosswalk** (§4.4): flagged for geo-DS, who decides it in the pre-registration
   amendment; nothing is changed here. It affects 2018/2020/2022 population weights in both
   `int_berlin_ewr_plr2021` and the new band model. At BZR grain, child weights inside 034008
   Pankow Süd and 062004 Ostpreußendamm are distorted (BZR totals are right to within 0.14 %). At PLR
   grain, 102 of 540 PLRs are more than 25 % off.
2. **Hamburg precision** (§2.3): the S4 SD is rounded to 3 decimals in the matched editions
   2019/2021/2023/2025, a ±1.5–2.1 % scale uncertainty on S4 pp changes. Rank statistics are not
   affected.
3. **Hamburg descriptive levels** are unweighted Gebiet means (§2.1). They must be labelled that
   way, or recomputed population-weighted from `share` × `population`.
4. **Two noisy Hamburg Gebiete** (39005, 67012) in the S3/S4 plausibility check (§3).
5. `int_berlin_ewr_plr2021` keeps the publisher's 2024 code `06200318` (blank row). It is harmless
   for counts but would miss a join on `06200418`. Not changed here because the model is
   methodology-gated.
6. `stg_hamburg_ewr_stadtteil` has no age shares for reference year 2022 (seen in §3).
7. Optional confirmations behind non-listed hosts: the Hamburg 2014 Methodenbericht
   (`www.hamburg.de`), the BA Altersgrenze note (`statistik.arbeitsagentur.de`) and § 235 SGB VI
   (`gesetze-im-internet.de`). None blocks the design.

## 7. Published outputs unchanged

**Code.** `git diff develop` on this branch adds new files only: two staging models, one
intermediate model, eleven singular tests and one ingestion script. The only edits to existing
files are appended entries in `_sources.yml`, `staging/schema.yml` and `intermediate/schema.yml`,
plus one new step in `ingestion/run_ingest.py`. No existing model, macro or seed changed.
`dbt ls --select stg_hamburg_sozialmonitoring_indicators+ stg_berlin_ewr_age_bands+` lists only the
three new models (and their tests). No existing model, and so no mart, is downstream of them.

**Data.** Develop (`edab62c1`) was built in an isolated git worktree against the same
`data/raw` (and `data/analysis`) through a directory junction, into its own DuckDB. This branch
was built with a full `uv run poe build` (PASS 1238, WARN 2 pre-existing, ERROR 0). All 20 marts
in `transform/models/marts/` were then compared: content hash first, then multiset `EXCEPT ALL`
with doubles rounded to 6 decimals.

| Result | Marts |
|---|---|
| Identical (exact content hash) | `dim_area_geometry`, `fct_gentrification_trajectory`, `fct_poi_development`, `mart_area_amenities`, `mart_area_hierarchy`, `mart_area_rollup_stage_mix`, `mart_mss_area_aggregate`, `mart_ortsteil_plr_crosswalk`, `mart_ortsteil_plr_stage_mix`, `mart_poi_oa_arealevel`, `mart_poi_oa_hotspots` |
| Equal within 1e-6 (floating-point summation order only) | `gentrification_index` (18,833 rows), `fct_gentrification_change`, `mart_area_demographics`, `mart_price_rent_dimension`, `mart_price_rent_dimension_pre2021` |
| Differ, attributable to known build-to-build nondeterminism | `mart_poi_dominance` (4,502 rows; `top_child`, `hhi`, …), `mart_poi_oa_methods` (row count 18,828,463 vs 18,828,241), `mart_poi_offering_advantage` (56 rows), `mart_poi_offering_advantage_map` (1 row) |

The last four were shown to be nondeterministic **on develop itself**: rebuilding their
materialised POI intermediates (`int_poi_offering_advantage`, `int_poi_offering_advantage_methods`,
`int_poi_within_group_dominance`) and the marts in the develop worktree changed all four marts
between two builds of identical code (`mart_poi_oa_methods` 18,828,463 → 18,829,162 rows). This is
the documented phase-A O6 (`zscore_slq` exact NULL guard) and O7 (`top_child` tie-break) behaviour
(`docs/epic-e/354-phase-a-data-prerequisites.md` §8), and it is unrelated to this change.

`mart_poi_oa_hotspots` first differed in every row, because the worktree lacked `data/analysis/`
(the Gi\* parquet that `stg_oa_getis_ord` reads). After junctioning that directory and rebuilding
`stg_oa_getis_ord+`, it is identical.

**Conclusion: published marts are unchanged by this branch.**
