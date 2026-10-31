# Pre-registration — thesis hypothesis suite: Berlin modern era (#354) and Hamburg (#355)

- **Author:** geo-data-scientist (methodology authority, R-C1 geo half)
- **Date:** 2026-10-28 (rev. 2, same day, after the domain review)
- **Branch:** `feat/354-berlin-modern-era` (off `develop`)
- **Status:** PRE-REGISTRATION, revision 2. It is written before any code exists and fixes the
  design, the primary tests and the verdict rules. If the implementation deviates from it, the
  deviation must be listed in the findings file under "Deviations from pre-registration", with a
  reason. Silent deviations are a `high` review finding.
- **Revision 2** addresses the domain review `docs/methodology/354-355-preregistration-domain-review.md`
  (Verdict CONCERNS; required changes D1–D8, recommendations R1–R7) and records the maintainer's
  decisions of 2026-10-28 (§10). The geo-DS position on the shared items D4 and D6 is in §11.
- **Gate:** methodology-bearing (`docs/methodology/**`, `analysis/*.py`). The implementation needs
  geo-DS **and** domain `Verdict: PASS` before it is integrated into `develop` (CLAUDE.md R-C1).
  This revision needs a domain re-check against D1–D8.
- **Grounding sources (R-C2):** Helweg (2018) *Untersuchung von Gentrifizierung am Beispiel Berlin
  mittels Big Data Analytics*, Masterarbeit Univ. Hamburg: §4.5 (hypotheses), Tabelle 4-7, Tabelle 6-1
  (data timing per hypothesis), §6.2.3–6.2.4, Abbildung 6-3, §6.3.1–6.3.2 with Tabellen 6-11 to 6-15,
  Tabelle 6-16 (printed p. 78, PDF p. 91). Thesis SQL: `reference/system/80_result_full_plr.sql`,
  `80_result_h*.sql`. Project: `docs/methodology/index-definition.md` (§1.5, §2.2–2.5, §3.2–3.4, §4.3,
  §5, §6, §7, §9), `docs/methodology/2026-10-evidence-integrity-{geo,domain}-signoff.md`,
  `docs/methodology/354-355-preregistration-domain-review.md`, `docs/epic-h/H1-domain-signoff.md`,
  `docs/epic-h/329-hh-d4-conflation-*-signoff.md`, `docs/epic-h/EPIC-H-METHODOLOGY.md`, ADR-0005,
  ADR-0007, ADR-0014, ADR-0017. Issues #337–#341, #349, #358, #360. Literature is cited inline and
  listed in §13.

---

## 0. Decisions at a glance

| Item | Decision |
|---|---|
| Code | One city- and panel-parametrised script `analysis/thesis_hypothesis_suite.py`. Shared statistics live in `analysis/directional_inference.py` (extended, not copied). |
| Panels | `BER/modern` (MSS 2021–2025, LOR 2021); `HH/full` (Sozialmonitoring 2013–2025) with `HH/modern` (pivot 2022) reported side by side; `BER/thesis-era`, labelled **"re-analysis of the thesis era with current methods"** (MSS 2013–2019, LOR pre-2021), which carries #338 and #349. |
| Prerequisites | **#360** (MSS indicator labels corrected by meaning) before any Berlin S/D composite. Native `lor_2021` POI counts and OA for snapshots 2019–2020 (maintainer-approved). Hamburg reference date, Dynamik ordering check, and indicator-value check (§2.1). |
| Berlin modern window | MSS **2021, 2023, 2025**. Three non-overlapping two-year Dynamik windows: W1 = [2019, 2021], W2 = [2021, 2023], W3 = [2023, 2025] (OSM snapshot years). **Pivots 2021 and 2023.** H1 cross-section: MSS 2025 × OSM 2025-01-01. |
| Berlin status measure | Continuous composites by **meaning**: S = Arbeitslosigkeit + Transferbezug + Kinderarmut (MSS S1, S3, S4); D = the same three Dynamik indicators (D1, D3, D4). Built only from the #360-corrected columns, with a validity check against the published classes. Published classes are secondary. |
| Hamburg window | Dynamik covers **3 years**, so the chain steps in 3-year intervals: editions **2016, 2019, 2022, 2025**, giving **pivots 2016, 2019, 2022**. Primary family = full chain. **Pivot 2022 (modern) is reported beside it** as the era-split comparison. H1 cross-section: edition 2025. |
| Hamburg grain | Statistisches Gebiet (≈ 850 scored). **Cluster: Stadtteil (99).** |
| H1 / H2 | Grouped (spatial-block) cross-validated L2 logistic model on **category-level OA**, scored by AUC with a cluster-bootstrap CI against 0.5. Domain-level and commercial-only versions are secondary. |
| H1c variable | The thesis's own: domain **"Sports and Recreation"** OA (Tabelle 6-14, `oa_total_d_sport_und_erholung`). |
| H3 commercial change | Davis–Haltiwanger–Schuh growth of the area's C5 share **within the four commercial consumption domains** (Gastronomy, Retail, Services, Entertainment). Total-share growth is secondary. |
| H3 controls | Outcome's own prior change plus a status level. **H3a: S at the pivot. H3b: S at the start of the predictor window.** The other timing and D4 are sensitivities. |
| Inference | Cluster bootstrap (B = 1999, seed 42). **Benjamini–Hochberg FDR across the 8 primaries within each panel (binding, maintainer decision).** Holm-adjusted p is reported as an extra column. |
| Verdicts | SUPPORTED / CONTRADICTED / NOT SIGNIFICANT / NO DATA, an effect-size label, and a "Holds?" mapping that treats H3a/H3b as ordering claims (§5.6). |
| Out of scope | EWR resident-register panel (#341, #340 part 2), BRW/Wohnlage as hypothesis variables, node→way correction (#337), the cross-cutting MSS label defect outside the suite (#360 scope). |

---

## 1. The eight hypotheses: wording, original operationalisation, verdicts

### 1.1 Verbatim definitions (thesis §4.5)

| ID | Thesis wording (German, verbatim) | Literature cited by the thesis |
|---|---|---|
| H1 | "Der soziale Status einer Nachbarschaft hängt mit den lokalen Angebotsstrukturen zusammen." | — |
| H1a | "Umgebungen mit vielen Cafés haben einen vergleichsweise hohen sozialen Status." | Papachristos et al. (2011) |
| H1b | "Umgebungen mit vielen Fast Food Geschäften haben einen vergleichsweise niedrigeren sozialen Status." | Pearce et al. (2007) |
| H1c | "Umgebungen mit vielen Sportmöglichkeiten haben einen vergleichsweise hohen sozialen Status." | Powell et al. (2006) |
| H2 | "Die aktuellen lokalen Angebotsstrukturen haben einen Einfluss auf die zukünftige Veränderung des sozialen Status." | — |
| H3a | "Die Veränderung des sozialen Status folgt der Veränderung der lokalen Angebotsstruktur, ist diesem also zeitlich nachgelagert." | Dangschat (1988) |
| H3b | "Die Veränderung des sozialen Status geht der Veränderung der lokalen Angebotsstruktur voraus." | Dangschat (1988) |
| H3c | "Die Veränderung des sozialen Status geschieht zeitgleich mit der Veränderung der lokalen Angebotsstruktur." | — |

Three properties drive the test design:
- **H1 and H2 are non-directional** ("hängt zusammen", "haben einen Einfluss").
- **H1a–c are directional.**
- **H3a and H3b are ordering claims with no sign in their wording.** A significant precedence of
  either sign is still precedence (§5.6).

Literature notes for the findings (R4, R5):
- Papachristos et al. (2011) concerns the *growth* of coffee shops as a gentrification marker. The
  thesis's H1a adapts it to café stock vs status. A café-growth cross-lag is therefore pre-registered
  as exploratory (§5.2).
- Pearce et al. (2007) is a New Zealand study of fast-food access and *deprivation*. Describe H1b as
  a deprivation hypothesis, not a displacement one.

### 1.2 How the thesis tested them (Tabelle 6-16, Tabelle 6-1, Abbildung 6-3)

| ID | Pairing (Tabelle 6-16) | Data timing (Tabelle 6-1) | Best model / evidence | Verdict |
|---|---|---|---|---|
| H1 | istOSM_stock ⇔ istStatus | MSS Dec 2016 / OSM Jan 2017 | SimpleLogistic, AUC 0.87, F1 0.79, 8 features with \|r\| > 0.3 (BZR grain) | ✓ |
| H1a | cafés, positive | same as H1 | correlations only (Tabelle 6-12) | 0 |
| H1b | fast food, negative | same as H1 | correlations only (Tabelle 6-13) | ✓ |
| H1c | sport, positive | same as H1 | correlations only (Tabelle 6-14) | 0 |
| H2 | prevOSM_stock ⇔ istDynamik | Dynamik Dec 2014→Dec 2016 / OSM Jan 2015 | RandomForest, AUC 0.77, "eher nein" (BZR) | 0 ("kein klares Bild") |
| H3a | prevOSM_new ⇔ istDynamik | Dynamik 2014→2016 / new POIs Jan 2014 + Jan 2015 | LogiBoost, AUC 0.72, "nein" (PLR-distcalc) | ✗ |
| H3b | istOSM_new ⇔ prevDynamik | Dynamik 2012→2014 / new POIs Jan 2016 + Jan 2017 | Bagging-SimpleLogistic, AUC 0.81, "eher ja" (BZR) | (✓) "eher bestätigt" |
| H3c | istOSM_new ⇔ istDynamik | Dynamik 2014→2016 / new POIs Jan 2016 + Jan 2017 | LogiBoost, AUC 0.71 | 0 |

The thesis's binary targets split the continuous MSS index at 0 (`status_klasse_prj_bi`,
`dynamik_klasse_prj_bi` in `80_result_full_plr.sql`). It modelled Dynamik in binary form because
binary targets always scored better (§6.2.3, citing Venerandi et al. 2015).

**Verdict rule of the thesis.** For H1a/H1c the summary reads: *"H1a und H1c haben signifikante
Korrelationen, die der Hypothese entsprechen aber sehr gering sind"*; the hypothesis *"kann … weder
gestützt noch verworfen werden"* (§6.3.1.1). Significant but very small therefore scores 0. The
verdict was also a judgment, not a threshold. Tabelle 6-16 combines AUC with "Features sinnvoll?"
and correlation counts. H3a's AUC-0.72 model was rejected because its features (parking meters,
playgrounds, table-tennis tables, clothing containers) had *"keine inhaltliche Relevanz"* (§6.3.2.2).
The thesis also explained its only H2 correlation as a *"Scheinkorrelation"* via status level
(§6.3.2.1). §5.6 adopts both rules.

**AUC comparability (binding findings text, D4c).** The thesis's headline AUCs are not comparable to
the suite's. They come from BZR grain for H1, H2 and H3b (137 areas), random 10-fold CV (§6.2.3),
the best of about 19 algorithms (§6.2.4) and up to 85 OA features. The suite uses PLR or Gebiet grain,
cluster-grouped CV and one pre-specified model, each of which lowers AUC. **No table may set the
thesis AUC against a suite AUC as a measure of weakening.** In place of the thesis's "Features
sinnvoll?" column, the findings report the ten largest standardised coefficients with their signs.

### 1.3 H1c in the thesis: mixed signs and a polarity slip in the text (D3c)

The rebuilt Tabelle 6-14 (higher index = worse status; domain review §3):

| Grain | Measure | Pearson r (p) | Spearman ρ (p) |
|---|---|---|---|
| BZR | population-weighted stock | **−0.20 (0.02)** | −0.11 (0.20) |
| PLR | population-weighted stock | −0.07 (0.15) | −0.05 (0.27) |
| PLR-dist | population-weighted stock | −0.04 (0.37) | 0.01 (0.80) |
| BZR | OA | −0.03 (0.74) | 0.09 (0.27) |
| PLR | OA | 0.03 (0.56) | **+0.10 (0.03)** |
| PLR-dist | OA | −0.01 (0.90) | **+0.13 (0.01)** |

The significant rows have **mixed signs**. The PLR OA rows go against H1c and the BZR stock row
supports it. §6.3.1.1 fixes the polarity ("Ein negativer Indexwert bedeutet eine geringere
Arbeitslosigkeit, Kinderarmut"). The H1c prose and the summary read the PLR OA rows as
hypothesis-consistent, which under that polarity they are not. **The 0 verdict is unaffected.** In
OSM, "Sports and Recreation" is mostly playgrounds and public table-tennis tables. In Berlin 2025
there were 1,984 table-tennis tables and 868 playgrounds against 375 fitness centres; Hamburg 2025
has 592 playgrounds and 307 tables. This is planned public provision, dense in family-heavy estates.
That is a plausible reason for the wrong-signed PLR association, not a tested one.

**Public wording (adopted from the domain review §3)** for `/thesis-recheck` and both findings files:
*"The 2018 thesis rated H1c as undecided. Its correlations between sport and leisure facilities and
the official status index were very small and of mixed sign. At planning-area level, more facilities
went slightly with lower official status; at district-region level, the population-weighted count
went slightly with higher status. The thesis text describes the planning-area result as in line with
the hypothesis; under the index's own sign convention it is not. The 'undecided' verdict is
unaffected. In OpenStreetMap this category consists mostly of playgrounds and public table-tennis
tables."*

H1a note for the findings (R2): the thesis's only significant café row was population-weighted
stock at PLR (Pearson −0.14; Spearman not significant), and the OA rows were null (PLR OA ρ = −0.02).
An OA-primary result of "consistent (still unclear)" is therefore expected even if nothing changed.

### 1.4 Current project state (what this supersedes)

- `web/pages/thesis-recheck.md` shows six of the eight hypotheses (#349). H1 is tested only by
  single-number proxies. H2 and H3c are tested on levels or pooled area-years with analytic p-values.
  H3a/H3b rest on a single 2023 pivot with no level control (#339).
- `docs/epic-e/E1-regression-findings.md` §2 (MSS 2021–2025): its H2 rows pool two editions of the
  same PLRs (n = 1071 ≈ 2 × 536) under an iid p-value, which overstates significance, the defect #341
  names for EWR.
- `docs/epic-h/E5-hamburg-lead-lag-findings.md` differences annual status classes against a 3-year
  Dynamik concept. Its Section 2 runs OLS on ordinal class codes, which index-definition §3.2
  forbids. **The suite supersedes E5 in full.**

---

## 2. Data inventory (verified read-only against `data/gentriduck.duckdb`, 2026-10-28)

| Source | Model | Coverage found |
|---|---|---|
| Berlin MSS classes | `stg_berlin_mss` | 2013/15/17/19 on `lor_pre2021` (447 PLR); 2021/23/25 on `lor_2021` (542 PLR; 535–536 inhabited). Dynamik 1 = positiv … 3 = negativ (index-definition §1.5, §5). |
| Berlin MSS indicators | `stg_berlin_mss_indicators` | Indicators from 2015 to 2025; **no 2013 indicators**. **The current labels are wrong (#360):** by data behaviour and the MSS reports, the warehouse's `kinderarmut_*` is S3 Transferbezug, `alleinerziehende_*` is S4 Kinderarmut, and `transferbezug_*` is S2 (Langzeitarbeitslosigkeit until 2017, suspended in 2019/2021, children in single-parent households from 2023). S1 Arbeitslosigkeit is labelled correctly. S1, S3 and S4 (and D1, D3, D4) are populated in every edition 2015–2025. **The gap is at S2.** |
| Berlin MSS lead-lag | `int_mss_lead_lag` | Class pairs: 2021→23 and 2023→25 (k = 1), 2021→25 (k = 2). |
| Berlin OSM | `int_poi_features_pivot`, `int_poi_offering_advantage` | Native `lor_2021` counts and OA for **2021–2026** only; `lor_pre2021` for 2008–2020. |
| Berlin C5 shares | `int_poi_status_dynamism` | `lor_2021` for 2008–2026, but **2019/2020 counts are fractional, i.e. crosswalk-reallocated**. |
| Berlin POI composition | `int_poi_offering_advantage` | Berlin 2025: Public Space plus Mobility make up 64% of POIs. 2021→2025: total +58%, commercial domains +10% (domain review D2). |
| Berlin EWR (D4) | `int_ewr_socioeco` | Full composite 2014–2020 on `lor_2021`; **no composite after 2020**. |
| Hamburg Sozialmonitoring | `int_hamburg_sozialmonitoring_index` | **Annual 2013–2025**, 833–857 scored Gebiete (> 300 residents), 99 Stadtteile. **Classes only** (status 1–4, Dynamik 1 = positiv / 2 = stabil / 3 = negativ). |
| Hamburg OSM | `int_osm_poi_hamburg`, OA `standard/faithful` | 2008–2026; 27k POIs (2013) → 73k (2025); ~940 areas; same taxonomy. |
| Hamburg EWR | `int_ewr_socioeco_hamburg` | Stadtteil grain disaggregated to Gebiet, 2013–2025; **composite null for 2022**; contains `unemployment_share`, a Sozialmonitoring input. |
| Hamburg BRW / Wohnlage | `int_price_rent_brw_wohnlage_combined_hamburg` | One 2025 snapshot; **BRW all null**; Wohnlage good/normal shares only. Not used (§4.1). |
| Snapshot convention | `ingestion/*/osm/*` | OSM snapshot Y = state at Y-01-01T00:00Z. MSS edition E carries data as of 31 Dec (E−1). So edition E ↔ OSM snapshot E, the thesis pairing (MSS Dec 2016 ↔ OSM Jan 2017, Tabelle 6-1). |

### 2.1 Binding prerequisites (data-engineer, before the suite runs)

1. **#360, MSS indicator meaning (blocking for every Berlin S/D variable, all Berlin panels).**
   The DE verifies the s1–s4 / d1–d4 meaning per edition, 2015–2025, against the official MSS
   Indikatorenhefte and fixes the staging mapping. The suite consumes **only meaning-named columns**
   from the corrected staging (e.g. `arbeitslosigkeit_*`, `transferbezug_*`, `kinderarmut_*`,
   `s2_*` with per-edition meaning), never positional or legacy labels. If #360 finds a meaning that
   differs from §3.2, the suite uses the verified populated core and the findings say why. The
   findings state which source WFS attribute feeds each composite. The cross-cutting consequences
   (`int_berlin_rent_pressure_proxy`, index-definition §4.4/§7.2, R-A4, ADR-0007) are handled under
   #360, **not** inside this suite branch.
2. **Native `lor_2021` POI counts and OA for snapshots 2019 and 2020**, by point-in-polygon on the
   existing OSM snapshots (maintainer-approved, §10). At minimum this covers the four commercial
   domains (§5.1) and all categories that H1/H2 use. It goes through normal DE review.
3. **Hamburg reference date.** Confirm whether edition E = data as of 31 Dec (E−1), from the source
   metadata, and state it in the model header.
4. **Hamburg Dynamik ordering.** Run the index-definition §3.4 reconciliation (class counts and the
   label ↔ code check) against a published report before the suite consumes Dynamik.
5. **Hamburg indicator values (binding check, D8g).** Determine whether the open Sozialmonitoring
   data carry the seven indicator values, and record the answer in the Hamburg findings. Building a
   continuous composite from them stays an optional follow-up with its own sign-off (§4.4).
6. **OA zero-fill.** Confirm why E1's H1b OA row had n = 341 of 436, and implement the zero-fill
   rule in §5.1.

---

## 3. Berlin modern-era window (#354)

### 3.1 Choice

**MSS 2021, 2023 and 2025 on LOR 2021. The status-change measure is the Dynamik of each edition.**

The domain review verified that the published `*_dynamik` equals `anteil_E − anteil_{E−2}` on LOR 2021
(r = 1.000; mean absolute deviation 0.003 pp for 2023 and 2025). The three modern editions therefore
give three **contiguous, non-overlapping** status-change windows on the 2021 geometry:

| Window | Dynamik edition | Indicator dates | OSM snapshots |
|---|---|---|---|
| W1 | 2021 | 31.12.2018 → 31.12.2020 | 2019-01-01 → 2021-01-01 |
| W2 | 2023 | 31.12.2020 → 31.12.2022 | 2021-01-01 → 2023-01-01 |
| W3 | 2025 | 31.12.2022 → 31.12.2024 | 2023-01-01 → 2025-01-01 |

Cross-lag pivots are **2021 (P = W1, F = W2)** and **2023 (P = W2, F = W3)**. The H1 family uses
**MSS 2025 × OSM 2025-01-01**. The window-start levels S_2019 and S_2021 are rebuilt exactly as
`anteil_E − dynamik_E` on LOR 2021. That is what makes the H3b start-of-window control (§5.1)
available at both pivots.

**Why not later or earlier.** 2025 is the last MSS edition. Pre-2021 editions sit on the other LOR
vintage and form their own panel (index-definition §2.5, §6.2).

### 3.2 Continuous composites by meaning (primary) vs published classes (secondary)

The thesis used the continuous MSS index and split it at 0 (`80_result_full_plr.sql`). Subject to
#360:

- **S_E** (status level) = mean of within-edition z-scores of **Arbeitslosigkeit (S1),
  Transferbezug (S3), Kinderarmut (S4)**.
- **D_E** (status change over the window ending at E) = mean of within-edition z-scores of **D1, D3
  and D4**.

Higher values mean worse status or worsening, the same polarity as the MSS codes (index-definition §5).

This three-indicator core is populated in every edition 2015–2025. It is the official index set in
2019/2021, and three of four official indicators in 2015/2017 and 2023/2025. **S2 is excluded**
because its meaning changes (Langzeitarbeitslosigkeit until 2017, suspended in 2019/2021,
single-parent children from 2023). Excluding it also removes the 2023 index drift (index-definition
§1.7, break 2) from the primary measures.

**Validity check (D1d, pre-registered).** Per edition, compute Spearman(S, published status class) and
Spearman(D, published Dynamik class). If either is below 0.80, the findings must say that the
composite diverges from the official classification, and the class-based secondary rows must be read
beside the primaries.

**Seam in the thesis-era panel.** The S1 mean drops from 6.16 to 3.89 between the 2017 and 2019
editions while the published 2019 Dynamik mean is −0.97, which suggests a definition change at 2019.
Within-edition z-scores and published Dynamik are unaffected, but **levels are never compared across
that seam.**

### 3.3 Edition seams

1. **LOR 2021 re-cut.** No outcome delta crosses it. The OSM side of W1 uses the native 2019/2020
   `lor_2021` counts from prerequisite §2.1(2). The crosswalk-1:1 fallback is **withdrawn**. The PLRs
   split in 2021 over-represent growth and new-build areas, so dropping them would bias the sample
   toward stable areas (domain review M2).
2. **2023 indicator drift.** It affects only the secondary class rows.
3. **S2 gap** (not a Transferbezug gap). S2 is excluded from the composites (§3.2).

### 3.4 Shock disclosure (binding text for the findings, D7)

No window is shock-free, and the findings must not imply otherwise.

- **W1 (Dec 2018 → Dec 2020)** contains 2020. Pandemic job losses hit hospitality, culture and tourism
  workers, who plausibly live disproportionately in gastronomy-dense inner-city areas. Berlin mean
  `arbeitslose_dynamik` in 2021 is +1.09 pp, the only positive edition. W1 Dynamik can therefore
  correlate with gastronomy through the labour market rather than through upgrading. **W2 contains
  the bounce-back.** Every pooled H2/H3c row that includes W1 must name this mechanism.
- **W2 (Dec 2020 → Dec 2022)** covers the pandemic and the **1 June 2022 Rechtskreiswechsel**, which
  moved Ukrainian refugees into SGB II (BA-Statistik 2022).
- **W3 (Dec 2022 → Dec 2024)** is **not** post-shock. It contains (i) continuing refugee entry into
  SGB II after June 2022 and (ii) the **1 January 2023 Bürgergeld and Wohngeld-Plus reforms**. Both
  changed who counts in all three SGB-based indicators, with unknown and possibly opposite small-area
  effects.
- **H1 cross-section (2025 levels)** includes refugee-related SGB II receipt concentrated near large
  accommodation sites. This is a modest effect on a level, and it belongs in the limitation line.

The suite reports each pivot separately next to the pooled estimate, plus the pivot-2023 minus
pivot-2021 difference with its cluster-bootstrap CI. If that CI excludes 0, the pooled estimate is
reported as heterogeneous, and the headline must say the result depends on the window. The
warehouse has no open small-area refugee-accommodation source, so this is disclosed as a limitation,
not corrected.

### 3.5 Level control and the D4 gap (#339, D6)

D4 (EWR composite) exists at pivot 2021 (EWR 2020) and not at pivot 2023. The level controls therefore
come from S, which is always available (§3.1):

- **H3a primary:** own prior status change + **S at the pivot**. This is the right baseline for the
  outcome's regression to the mean.
- **H3b primary:** own prior POI change + **S at the start of the predictor window** (S_2019 for pivot
  2021, S_2021 for pivot 2023). This captures susceptibility before the status change without
  conditioning on its result (§11).
- **Sensitivities:** H3b with S at the pivot; H3a with S at the window start; each with D4 added
  (pivot 2021 only). The findings state which mechanism each control removes.

### 3.6 Testability, Berlin modern

| Hyp | Testable | Data | Notes |
|---|---|---|---|
| H1 | Yes | MSS 2025 S binary × category-level OA 2025, n ≈ 535, 143 BZR clusters | Thesis-form classifier test |
| H1a | Yes | OA category Cafe 2025 vs S_2025 | |
| H1b | Yes | OA category Fast Food 2025 vs S_2025 | |
| H1c | Yes | OA domain Sports and Recreation 2025 vs S_2025 | |
| H2 | Yes | Category OA at window start (2019, 2021, 2023) → D_2021, D_2023, D_2025 binary; n ≈ 1600 area-windows | 3 windows once prerequisite §2.1(2) exists |
| H3a | Yes | Pivots 2021 and 2023; n ≈ 1070 | |
| H3b | Yes | as H3a | |
| H3c | Yes | W1–W3 same-window pairs; n ≈ 1600 | |

---

## 4. Hamburg operationalisation (#355)

### 4.1 Analogue mapping

| Thesis element | Hamburg analogue | Caveat |
|---|---|---|
| MSS status index | Sozialmonitoring Statusindex (4 classes) | **Classes only.** Seven indicators, including *Kinder/Jugendliche mit Migrationshintergrund* and *Schulabschlüsse* (ADR-0014 §2; H1-domain-signoff §3). Berlin's 2023+ index also contains single-parent children, so the construct gap is migration background and school leaving. |
| MSS Dynamik | Sozialmonitoring Dynamikindex (3 classes) | **3-year window** (Berlin: 2 years). About 85% of areas are "stabil", so there are heavy ties. |
| PLR | Statistisches Gebiet | Finer: ≈ 2,200 residents on average; only areas > 300 residents are scored. |
| BZR (cluster) | Stadtteil (99) | EPIC-H-METHODOLOGY standing requirement (#129) |
| OSM | Hamburg OSM, same taxonomy, OA `standard/faithful` | 2013 counts are about 37% of 2025. C5 shares and OA are ratio measures robust to city-wide growth (index-definition §2.4), but not to spatially uneven mapping diffusion (§4.3, R6). |
| EWR (D4) | Stadtteil profiles, disaggregated | Stadtteil grain. **`unemployment_share` is barred from every predictor and control** (#329). `foreigners_share` overlaps the migration-background indicator, so D4 is a sensitivity only. |
| BRW / Wohnlage | 2025 Wohnlage only; BRW null | **Not used.** No thesis hypothesis involves land value or housing quality. |

### 4.2 Grain, cluster unit, n

- **Grain:** Gebiet, the native outcome grain. Ordinal classes cannot be averaged across Gebiete
  (index-definition §3.1).
- **Cluster:** Stadtteil (99). It absorbs spatial dependence and the repeated areas across pivots.
  Effective N is reported as clusters. For any row that uses Stadtteil-grain D4, the findings say
  the D4 information has about 99 independent values.
- **n:** ≈ 850 Gebiete per cross-section, about 2,500 area-pivots for H3a/H3b on the full chain
  (≈ 850 for pivot 2022 alone), and about 3,400 area-windows for H3c.

### 4.3 Windows

The Hamburg Dynamik for edition E maps to OSM snapshots [E−3, E], pending prerequisite §2.1(3).
Consecutive annual editions have overlapping Dynamik windows, so **the chain steps in 3-year
intervals.**

- **`HH/full` (primary family):** Dynamik editions **2016, 2019, 2022, 2025**, i.e. windows [2013, 2016],
  [2016, 2019], [2019, 2022], [2022, 2025]. **Pivots 2016, 2019, 2022.**
- **`HH/modern` (reported beside it, maintainer decision §10):** pivot 2022 only (P = [2019, 2022],
  F = [2022, 2025]) for H3a/H3b. H2 and H3c use the windows ending 2022 and 2025. The H1 family is
  shared (2025). It is the Hamburg counterpart of Berlin modern. It is a **comparison panel with its
  own complete 8-row table**, shown side by side with `HH/full`. Its p-values are BH-adjusted within
  its own 8 rows, and the findings label it as the era-split result, not a second confirmatory claim.
- **Pivot 2016 caveat (R6):** it is the pivot most exposed to OSM completeness artefacts, because
  coverage was still diffusing unevenly across the city. The era-split text must say so.
- **Phase-shift sensitivity:** chains 2014/17/20/23 and 2015/18/21/24 are run, outside any family. A
  result that holds on only one phase is described as fragile.
- **H1 family:** edition 2025 × OSM 2025-01-01.
- **D4 sensitivity:** EWR at year E−1 per pivot (2015, 2018, 2021, all populated).
- **H3 level controls:** H3a uses the status class at the pivot; H3b uses the status class at the start
  of the predictor window (edition E−3). The alternative timings are sensitivities, as in Berlin.

**Hamburg shock timing (D7).** The window ending at 2025 (Dec 2021 → Dec 2024) contains the
Rechtskreiswechsel and the 2023 Bürgergeld and Wohngeld-Plus reforms. The window ending at 2022 (Dec
2018 → Dec 2021) contains the pandemic. Both appear in `HH/modern`, which is therefore the most
shock-exposed panel. The Hamburg findings carry the counterpart of §3.4.

### 4.4 Testability, Hamburg

| Hyp | Testable | Operationalisation | Caveat |
|---|---|---|---|
| H1 | Yes | Binary status = class {3, 4} vs {1, 2}, 2025, × category-level OA 2025; grouped CV by Stadtteil | The binary is about 18/82; AUC is threshold-free but has a wider CI |
| H1a–c | Yes | OA (Cafe, Fast Food categories; Sports and Recreation domain) 2025 vs status class, Spearman with ties | Ordinal outcome. **Every H1a–c sentence must name the construct** (it includes migration background, §4.5). |
| H2 | Yes, low power | Category OA at E−3 → Dynamik_E binary **"negativ vs rest" (predicts worsening)**; secondary **"positiv vs rest" (predicts improvement)**, both pre-registered, E ∈ {2016, 2019, 2022, 2025} pooled | Positives are about 4–10% per edition (positiv 79/31/61/41, negativ 85/42/59/44 of ≈ 850). If the CI is NA or wider than 0.25, report NOT SIGNIFICANT with a "low power" note. The wording names which change is predicted. |
| H3a | Yes | d_status = Dynamik class (ordinal) | 3-year windows ≠ Berlin's 2 years |
| H3b | Yes | as H3a | |
| H3c | Yes | Same-window commercial growth vs Dynamik class | |

**No hypothesis is untestable in Hamburg.** What is missing is resolution (classes only) and a 2018
baseline, so **a Hamburg result is an out-of-sample transfer test, not a replication.** If check
§2.1(5) finds the seven indicator values, the domain-preferred secondary for H1a–c is a labour-market
and transfer core (SGB II, Arbeitslose, Kinder in Mindestsicherung, Mindestsicherung im Alter). It is
a follow-up with its own sign-off.

### 4.5 Comparability statement (binding text for `docs/epic-h/` and the Hamburg recheck page)

Hamburg and Berlin verdicts are **not like-for-like**:
1. The monitor construction differs: Hamburg's seven indicators include migration background and
   school leaving.
2. The change window differs (3 vs 2 years).
3. The status measure differs (Hamburg classes vs Berlin continuous composites).
4. The grain differs (Gebiet ≈ 2,200 residents vs PLR ≈ 7,000).
5. The era differs (`HH/full` 2013–2025 vs Berlin modern 2019–2025; `HH/modern` is the era-matched
   comparison).

A diverging verdict is not evidence that the cities' processes differ, **and a matching verdict is
not evidence that they are the same**: with different constructs, agreement can be coincidental.
Because Hamburg's status index includes *Kinder und Jugendliche mit Migrationshintergrund*, a Hamburg
H1b result is partly a fast-food ↔ migrant-children association. Every Hamburg H1a–c statement must
name the construct, so that the result cannot be read as an ethnic rather than a socio-economic
association (2026-10 domain R8).

---

## 5. Statistical standards

### 5.1 Primary test per hypothesis (one per panel; this is the confirmatory family)

Notation: g(a, b) = (b − a) / ((a + b) / 2) is the Davis–Haltiwanger–Schuh (1996) symmetric growth
rate, bounded in [−2, 2] and defined when one endpoint is zero. **Commercial share** c_E = the area's
C5 share (index-definition §2.4) of POIs in the four commercial consumption domains **Gastronomy,
Retail, Services and Entertainment** (the E1 #168 basket). The commercial domains are the thesis's
*Angebotsstruktur*. Public Space and Mobility (64% of Berlin 2025 POIs) track street-furniture
mapping campaigns, where C5's uniform-coverage assumption is least credible, and the thesis itself
dismissed such features (§6.3.2.2). Status variables follow §3.2 (Berlin) and §4.1 (Hamburg).
Expected signs follow index-definition §5: higher status code means worse.

| Hyp | Primary estimator | Expected | Notes |
|---|---|---|---|
| H1 | Out-of-fold AUC of an L2-logistic model, binary status ~ **all category-level OA values passing the min-base flag** (fixed list per city, set before fitting); 5-fold **GroupKFold by cluster** | AUC > 0.5 | Thesis form; CONTRADICTED impossible |
| H1a | Spearman ρ(OA category Cafe, status) | ρ < 0 | |
| H1b | Spearman ρ(OA category Fast Food, status) | ρ > 0 | |
| H1c | Spearman ρ(OA **domain Sports and Recreation**, status) | ρ < 0 | Thesis variable (Tabelle 6-14); see §1.3 |
| H2 | Out-of-fold AUC, binary Dynamik_E ~ category-level OA at the window start (prevOSM_stock) | AUC > 0.5 | Non-directional |
| H3a | Partial Spearman ρ(g(c)_P, d_status,F \| d_status,P, S_pivot) | ρ < 0 (ordering claim, §5.6) | Granger-style precedence |
| H3b | Partial Spearman ρ(d_status,P, g(c)_F \| g(c)_P, S_start(P)) | ρ < 0 (ordering claim, §5.6) | Control timing: §3.5, §11 |
| H3c | Spearman ρ(g(c)_W, d_status,W), same window, pooled | ρ < 0 | Change vs change |

**Classifier specification (fixed, no tuning).** Features are standardised inside each training fold
(sklearn `Pipeline`). L2 penalty with C = 1.0, `class_weight="balanced"`, solver `lbfgs`, max_iter
5000. There is no feature selection and no hyperparameter search; the feature list is fixed per city
before any fit. This keeps selection outside the CV loop and prevents optimistic AUC.

**OA zero-fill (binding).** An area with no POI of a category has OA = 0, not a missing value. Areas
are excluded only by the OA minimum-base flag (ADR-0017). This must not condition on presence, as E1's
H1b OA row (n = 341 of 436) appears to have done.

**Exclusions** (index-definition §7): uninhabited or unscored areas; areas with zero POIs in all years
(D3 guard); the S2 indicator (§3.2).

### 5.2 Secondary, sensitivity and exploratory rows (reported, outside every family)

None of these can change a headline verdict.

- Published class versions of every Berlin status variable; the §3.2 validity check.
- **H1/H2 at domain level** (13 domain OA values). A domain-level NOT SIGNIFICANT is worded "not
  detected at domain resolution".
- **H1 commercial-only:** category OA of the four commercial domains only (D4b). It decides the public
  wording (§9).
- H1a–c with population-weighted stock instead of OA (the thesis's "einwohnergewichtet", §6.3.1.1).
  Population: EWR `residents_total` (Berlin), Sozialmonitoring `population` (Hamburg).
- **H1c on the Sport category without table tennis** (organised and commercial facilities, closer to
  Powell et al.) (D3b).
- **H1b without the döner/kebab type**, if the taxonomy carries it (R3). This anti-stigmatisation check
  tests whether the association depends on one migrant-economy type.
- **H3 with total-share growth** of all POIs (continuity with E1/E5), and with the OA-basket change.
- H3a/H3b with the alternative level-control timing, and with D4 (Berlin pivot 2021; Hamburg all
  pivots).
- H3a/H3b per pivot, plus the pivot-difference test (§3.4).
- **Level-stratified H3a/H3b (D8d, exploratory):** strata by status at the window start. Berlin: S ≥ 0
  (low/mid) vs S < 0 (high). Hamburg: classes {2, 3, 4} vs {1}. Each stratum gets its own estimate and
  CI. Theory places the POI ↔ improvement link in susceptible low/mid-status areas
  (index-definition §1.5, §9; Döring & Ulbricht 2016).
- **H2 incremental:** ΔAUC of (status level + category OA) over status level alone, with a
  cluster-bootstrap CI. It binds the "Holds?" mapping (§5.6).
- H2 directional continuity row: ρ(OA basket at the window start, D over the window).
- Hamburg H2 "positiv vs rest" (§4.4). Hamburg phase-shift chains (§4.3).
- **Café-growth cross-lag (R4, exploratory):** H3a/H3b form with g(café share) as the commercial
  series.
- **BZR-grain H1 (R7, descriptive):** the thesis's best-model grain, n ≈ 143, no verdict.
- **Thesis-era fidelity check (R1).** In `BER/thesis-era`, the PLR OA-Spearman rows for H1a/H1b/H1c
  should land near Tabellen 6-12 to 6-14 (−0.02, +0.27, +0.10). A gap is reported as a pipeline
  divergence, not a finding (Epic B framing).

### 5.3 Inference

- **CIs:** percentile cluster bootstrap that resamples whole clusters (`cluster_bootstrap_ci`).
  B = 1999, seed = 42, α = 0.05. Clusters: BZR (143 in `lor_2021`, 137 in `lor_pre2021`) and Stadtteil
  (99). With fewer than 20 clusters the result is NO DATA; cluster-bootstrap coverage is poor with few
  clusters (Cameron, Gelbach & Miller 2008). This affects only stratified rows, if at all.
- **AUC rows:** out-of-fold predictions are computed once with deterministic GroupKFold. The cluster
  bootstrap then resamples the (prediction, label, cluster) triples.
- **Bootstrap p:** p = 2·min(P*(θ* ≤ θ0), P*(θ* ≥ θ0)) with θ0 = 0 (ρ) or 0.5 (AUC), floored at
  1/(B+1). The analytic p from `partial_spearman` is reported for reference only.
- **Rank methods only for ordinal outcomes** (index-definition §3.2). No OLS on class codes. A binary
  logistic outcome is permitted (§3.3). Ties get mid-ranks.

### 5.4 Verdicts and effect sizes

- `verdict()` from `directional_inference.py`, unchanged in logic. A primary row is significant when
  its **BH-adjusted bootstrap p < 0.05** (§5.5). Secondary rows use the unadjusted 95% CI and carry the
  label "exploratory".
- **Effect-size label** (every row): |ρ| < 0.10 "negligible", 0.10–0.29 "small", 0.30–0.49
  "moderate", ≥ 0.50 "large" (Cohen 1988). AUC < 0.60 "negligible", 0.60–0.69 "poor", 0.70–0.79
  "acceptable", ≥ 0.80 "excellent" (Hosmer, Lemeshow & Sturdivant 2013).
- **Sign-only passes are impossible:** a non-significant row is NOT SIGNIFICANT whatever its sign.

### 5.5 Multiple comparisons (binding: Benjamini–Hochberg, maintainer decision 2026-10-28)

- **Family = the 8 primaries of one panel** (`BER/modern`, `BER/thesis-era`, `HH/full`, and
  `HH/modern` as its own family). The Benjamini–Hochberg (1995) step-up procedure controls the false
  discovery rate at q = 0.05. BH is valid under the positive dependence expected between H1 and H1a–c
  (Benjamini & Yekutieli 2001).
- **Holm-adjusted p** (Holm 1979) is reported in an extra column `p_holm`, for transparency. It does
  not decide verdicts.
- **What FDR means for the public page.** Within each panel, BH bounds the expected share of false
  claims among the rows marked significant. It does not protect each row individually. The findings
  carry one sentence saying so, and they flag any primary that is significant under BH but not under
  Holm with the note "significant at FDR 5%; not at family-wise 5%".
- Secondary and exploratory rows are uncorrected. Each findings file states how many exploratory rows
  exist and how many would be expected significant by chance at α = 0.05.

### 5.6 Mapping our verdict to the thesis verdict ("Holds?" column, D5)

| Thesis | Ours → status |
|---|---|
| ✓ (H1, H1b) | SUPPORTED and at least "small" → **holds**. SUPPORTED but negligible → **weaker than thesis**. NOT SIGNIFICANT after BH with unadjusted p < 0.05 → **not reproduced at the corrected threshold (nominally significant)**. NOT SIGNIFICANT otherwise → **not reproduced**. CONTRADICTED → **reversed**. |
| (✓) (H3b) | SUPPORTED → **holds**. NOT SIGNIFICANT after BH with unadjusted p < 0.05 → **not reproduced at the corrected threshold (nominally significant)**. NOT SIGNIFICANT → **not reproduced**. CONTRADICTED → **ordering present, opposite sign** (status improvement followed by relative commercial decline). |
| 0 (H1a, H1c, H3c) | NOT SIGNIFICANT or SUPPORTED-negligible → **consistent (still unclear)**. SUPPORTED at least small → **stronger than thesis**. CONTRADICTED → **opposite direction (thesis: undecided)**. For H1c, also add: "consistent with the sign of the thesis's own planning-area OA correlations (Tabelle 6-14)". |
| 0 (H2) | SUPPORTED at least "poor" **and** the ΔAUC CI excludes 0 → **stronger than thesis**. SUPPORTED with a ΔAUC CI that includes 0 → **consistent (still unclear): explained by current status level**, citing the thesis's "Scheinkorrelation" (§6.3.2.1). NOT SIGNIFICANT or negligible → **consistent (still unclear)**. |
| ✗ (H3a) | NOT SIGNIFICANT → **consistent (rejected)**. SUPPORTED → **diverges: commerce-first precedence**. CONTRADICTED → **diverges: commerce-first association of opposite sign**. |

The negligible-equals-0 rule and the H2 rule are the thesis's own (§6.3.1.1, §6.3.2.1). The
"nominally significant" label applies because the thesis applied no multiplicity correction. The
page must not imply that the thesis failed a test it was never subject to. For Hamburg, the column is
named **"Matches Berlin 2018?"** (a transfer test, §4.4) and uses the same labels.

### 5.7 Determinism (R-C3)

- SEED = 42 and N_BOOT = 1999, imported from `directional_inference.py`.
- **Every SQL load ends in `ORDER BY` (area_code, pivot or window).** `cluster_bootstrap_ci` builds
  cluster membership with `pd.unique`, which follows row order. DuckDB without `ORDER BY` does not
  guarantee order.
- GroupKFold is deterministic given ordered input. Any shuffle uses `random_state = 42`.
- Test: two consecutive runs on the same DB give a byte-identical results CSV.

### 5.8 Leakage guard (R-C3)

The suite asserts, as runtime invariants (`assert` with the `# noqa: S101 -- R-C3` convention):
1. **Construct disjointness.** An explicit allow-list of predictor and control columns per city. No
   outcome-index input appears among predictors or controls (Hamburg `unemployment_share` is
   rejected). No POI field enters a status variable. Berlin status columns must be the #360
   meaning-named ones.
2. **Temporal order.** For H2, H3a and H3b, predictor window end ≤ outcome window start, checked on
   the snapshot years carried in every row. For H3c, the windows must be identical. The H3b
   start-of-window control must date from ≤ the predictor window start.
3. **Grouped CV.** No cluster appears in both train and test folds.
4. **No full-sample preprocessing.** Scalers are fitted inside each training fold.
5. **No crossing of the LOR boundary** within any delta (index-definition §2.5). The vintage is
   asserted per row.

---

## 6. Reuse plan

### 6.1 From `analysis/directional_inference.py` (called, not copied)

| Function | Use in suite | Change needed (backward-compatible, in that module) |
|---|---|---|
| `partial_spearman` | All ρ rows | none |
| `cluster_bootstrap_ci` | All ρ CIs | Add `min_clusters` (default 5 keeps E1/E5 unchanged; suite passes 20) and optionally return the draws for the bootstrap p. |
| `build_cross_lagged` | H3a/H3b frames | Add optional `delta_cols=(status_delta, poi_delta)` for ready-made changes, plus `level_cols` for the pivot and window-start levels. |
| `cross_lagged_tests` | H3a/H3b | Add a per-direction `controls` override (H3a: own-lag + S_pivot; H3b: own-lag + S_start). Keep the 80%-D4 rule as the default for existing callers. |
| `verdict`, `direction_conclusion`, `summarise` | Scoring | `direction_conclusion` gains wording for opposite-sign precedence (§5.6) |
| `default_cluster` | Berlin clusters | none. Hamburg passes `cluster_col = stadtteil_code`. |
| *new* `bootstrap_p`, `bh_adjust`, `holm_adjust` | §5.3, §5.5 | add with unit tests in `tests/analysis/test_directional_inference.py` |
| *new* `grouped_oof_auc` + `leakage_guard_groups` | H1, H2 | add (sklearn is already a dependency) |

### 6.2 From `analysis/e1_regressions.py`

- **`THESIS_HYPOTHESES`** stays the single source of hypothesis text and citations. Add **H1a** and
  **H1c** (wording §1.1, verdict 0, directions §5.1), correct H1/H2 to non-directional, and mark
  H3a/H3b as ordering claims.
- **`load_oa_category_panel`** is reused for OA per category and domain, with zero-fill (§5.1).
- **Not reused:** `load_lead_lag_data`, `run_spearman`, `run_ols` and the e1 table writers. The suite
  has its own city-agnostic loader driven by a `PANELS` config (ADR-0005).

### 6.3 `analysis/e5_hamburg_lead_lag.py`

Superseded. Once the suite passes the gate, remove it from `poe analysis` and replace the E5 findings
header with a pointer to the new Hamburg findings. Its `run_ols_clustered` is not carried over.

### 6.4 Open issues

| Issue | Disposition |
|---|---|
| **#360** MSS indicator labels | **Blocking prerequisite** (§2.1). Fixed by the DE in staging, outside the suite branch. |
| #349 H1a/H1c | **In scope**, in all panels. `/thesis-recheck` moves from six to eight rows. |
| #338 Dynamik as prior status change, 2013–2019 | **In scope** via `BER/thesis-era`: D composites 2015/2017/2019, class Dynamik 2013–2019, pivots 2015 and 2017. The 2013-edition window uses class Dynamik only (secondary). |
| #339 fallback level control | **In scope and generalised** (§3.5). |
| #340 (1) differenced dynamism | **In scope:** replaced by DHS growth of the commercial C5 share. |
| #340 (2), #341 EWR panel | **Deferred** (EWR is not the thesis outcome). They stay open against E1. |
| #337 node→way | Deferred; disclosed on every D3-based row. |
| #358 Dynamik "pressure" convention | Respected: no pressure wording in the suite (§9). |

### 6.5 The `BER/thesis-era` panel ("re-analysis of the thesis era with current methods")

This panel uses the thesis's own continuous `status_index` (`stg_thesis_2018_result_plr`) × OSM 2017
on `lor_pre2021` for the H1 family, so the R1 fidelity check can be made. It uses the `lor_pre2021`
MSS frames and #360-corrected D composites for H2/H3. It contains the thesis's own editions, so it
is **not** an independent replication. Once signed off, it supersedes E1 Sections 1–3 for the
thesis-recheck table. E1 §4 (EWR) remains.

---

## 7. Outputs

### 7.1 Results table (one CSV for all panels)

`docs/epic-e/thesis-hypothesis-suite-results.csv` (committed; small). Columns:

| Column | Content |
|---|---|
| `city` | `BER` / `HH` |
| `panel` | `modern` / `thesis-era` / `full` |
| `window` | e.g. `2019-2025`; for cross-sections the snapshot |
| `pivots` | e.g. `2021;2023` (H3a/H3b) |
| `hypothesis` | H1 … H3c |
| `role` | `primary` / `secondary` / `sensitivity` / `exploratory` |
| `operationalisation` | predictor ⇒ outcome \| controls |
| `predictor`, `outcome`, `controls` | column-level names, including the #360 source attribute for status variables |
| `grain` | `plr_2021`, `plr_pre2021`, `hh_gebiet` |
| `cluster_unit`, `n`, `n_clusters` | |
| `estimator` | `spearman`, `partial_spearman`, `oof_auc_logit` |
| `estimate`, `ci_low`, `ci_high` | 95% cluster-bootstrap |
| `p_boot`, `p_bh`, `p_holm` | adjusted columns for primaries only; `p_bh` decides |
| `p_analytic` | reference only |
| `expected_dir` | `negative` / `positive` / `nondirectional` / `ordering` |
| `verdict` | SUPPORTED / CONTRADICTED / NOT SIGNIFICANT / NO DATA |
| `effect_label` | §5.4 |
| `thesis_verdict` | ✓ / (✓) / 0 / ✗ |
| `holds` | §5.6 label |
| `level_control` | `pivot` / `window_start` / `none` |
| `d4_control` | boolean |
| `seed`, `n_boot`, `run_sha` | |
| `notes` | e.g. low power, nominally significant, W1 mechanism |

### 7.2 Findings files (generated by the script, never hand-edited)

- `docs/epic-e/E1b-berlin-hypothesis-suite-findings.md`: `BER/modern` and `BER/thesis-era`. It
  contains:
  - the 8-row headline table with columns thesis / thesis-era re-analysis / 2019–2025;
  - the per-pivot table and the composite validity check;
  - the shock disclosure (§3.4) and the H1c text (§1.3);
  - the AUC-comparability text and top coefficients (§1.2);
  - the BH/Holm note and a deviations section.
- `docs/epic-h/H-thesis-hypothesis-suite-findings.md`: `HH/full` and `HH/modern` **side by side**,
  plus phase shifts, the comparability and construct statement (§4.5), the Hamburg shock timing, the
  pivot-2016 caveat, the indicator-value check result and a deviations section.
- Pages (web-engineer, separate gate):
  - an eight-row `/thesis-recheck` table;
  - a Hamburg recheck page with columns thesis (Berlin 2018) / Berlin today / Hamburg full chain /
    Hamburg pivot 2022, so the era difference is visible.

### 7.3 Wiring

- Add `python analysis/thesis_hypothesis_suite.py` to `poe analysis`. CLI:
  `--city {BER,HH} --panel {modern,thesis-era,full}`.
- Tests: `tests/analysis/test_thesis_hypothesis_suite.py`.
  - Synthetic panels: known sign → SUPPORTED, reversed sign → CONTRADICTED, noise → NOT SIGNIFICANT.
  - Every §5.8 invariant fires on a crafted violation.
  - BH and Holm match hand-computed cases.
  - DHS growth handles zero endpoints.
  - Determinism: two runs give identical output.

---

## 8. Alternatives considered (briefly)

- **Berlin: class transitions with a single pivot 2023** (status quo). Rejected as primary: one window,
  low resolution, no level control, and drift-affected classes. Kept as a secondary row.
- **Berlin: crosswalk bridge 2019 → 2021.** Rejected: ordinal classes cannot be areally blended
  (index-definition §6.4), and the 2021 Dynamik already supplies the 2018–2020 change.
- **Berlin: crosswalk-1:1 restriction for W1.** Withdrawn (§3.3): it biases toward stable areas.
- **Berlin: EWR panel as the outcome.** Rejected: no composite after 2020, and not the thesis outcome.
- **Two-indicator composite (rev. 1).** Replaced: it rested on mislabelled columns. The three-indicator
  core by meaning is populated throughout (§3.2).
- **Total-POI growth for H3 (rev. 1).** Demoted to secondary (§5.1).
- **Domain-level H1/H2 features (rev. 1).** Demoted to secondary (§11).
- **Hamburg annual k = 1 cross-lag** (E5). Rejected: overlapping Dynamik windows.
- **Hamburg Stadtteil grain.** Rejected: it requires averaging ordinal classes.
- **Ordered logit for H3.** Not the primary. Partial Spearman is signed off (2026-10) and assumption-light.
- **Holm as the binding correction.** Recommended by geo-DS and domain; the maintainer chose BH (§10).
  Holm is kept as a reported column.
- **Conley / spatial-HAC errors.** The cluster bootstrap on nested administrative units is the
  signed-off equivalent. A Moran's I check on H3 residuals is a non-gating diagnostic (Berlin only).

---

## 9. What the suite must not claim (D8)

- **No "pressure" wording for Dynamik in either direction (#358).** Dynamik is the "improving /
  worsening official measure of disadvantage". Negative Dynamik is filtering, at most a rent-gap
  precondition (Smith 1979). The suite does not import index-definition §1.4's "upward-pressure" phrase.
- **Status improvement ≠ gentrification.** Measured disadvantage can fall through in-situ labour-market
  gains, children ageing out of child poverty, new-build in-movers, the closure or relocation of
  refugee accommodation, or benefit-rule changes, as well as through compositional upgrading. Public
  text calls the outcome "change in officially measured disadvantage".
- No causal or displacement language. Status-first means that a fall in measured disadvantage precedes
  commercial change, not that anyone was displaced (2026-10 domain R9; index-definition G-1).
- **H3a and H3b are not mutually exclusive.** Both SUPPORTED reads as co-evolution, consistent with
  Dangschat (2026-10 domain R10).
- **H3c SUPPORTED means co-movement within one window.** It cannot by itself establish simultaneity and
  is read together with H3a/H3b.
- **H1 public wording** is "the local mix of shops, services and public facilities", unless the
  commercial-only H1 row (§5.2) also holds; only then may it say "businesses".
- Fast-food findings are phrased at area level; Hamburg H1a–c sentences name the construct (§4.5).
  H1b is a deprivation hypothesis (§1.1).
- The thesis's AUCs are not set against suite AUCs (§1.2).
- Hamburg verdicts are transfer tests, not replications (§4.4–4.5).

---

## 10. Maintainer decisions (2026-10-28)

1. **Berlin 2013–2019 reference panel: kept.** Label: "re-analysis of the thesis era with current
   methods" (§6.5). #360 applies to it.
2. **Native 2019–2020 POI counts and OA on LOR 2021: approved.** This is prerequisite §2.1(2); the
   crosswalk fallback is withdrawn.
3. **Hamburg: both results are reported, side by side** ("do both, results are interesting"). The full
   2013–2025 chain (`HH/full`, pivots 2016/2019/2022) is the primary family. The modern-only pivot
   2022 (`HH/modern`) is the era-split comparison, with its own complete 8-row table on the same page
   and in the same findings file. This fits the maintainer's wording: both are shown and neither is
   hidden. The primary designation only decides which table carries the Hamburg headline in the
   cross-city comparison.
4. **Multiple-comparison correction: Benjamini–Hochberg FDR (binding).** Holm-adjusted p is reported
   as an extra column. The domain review's labelling rule applies: a thesis-✓ row lost only to the
   correction is labelled "not reproduced at the corrected threshold (nominally significant)" (§5.6).
   Geo-DS and domain both recommended Holm. §5.5 records the interpretive consequence: FDR bounds the
   share of false claims across a panel's table, not each row.

## 11. Geo-DS response to the domain review

- **D1, D2, D3, D5, D7, D8: adopted** as written (sections §2.1, §3.2–3.4, §4, §5.1–5.2, §5.6, §9).
  On D2, I agree on statistical grounds too. Total-share growth is dominated by object classes whose
  mapping is campaign-driven and spatially clustered, which violates the uniform-coverage premise of
  C5 most strongly. The commercial basket gives a cleaner measurement, at the cost of fewer events per
  area. DHS growth handles the resulting zeros.
- **D4 (co-decided): adopted, category-level OA as the H1/H2 primary.** No statistical objection: with
  n ≈ 535–1,600 and several dozen categories, an L2 logistic model with a fixed penalty is
  well-conditioned. What would break validity is selecting features or tuning outside the CV loop, so
  the specification is fixed in advance (§5.1: fixed category list, C = 1.0, no search). Domain level
  becomes a secondary, worded "not detected at domain resolution" if null.
- **D6 (co-decided): adopted, H3b controls S at the start of the predictor window.** I agree with the
  argument. S_pivot = S_start + d_status,P, so with d_status,P as the predictor, controlling S_pivot is
  algebraically close to controlling the predictor's own result. It removes the succession path that
  runs through the new level, and with the rank residualisation it can also induce collider-type
  distortion. S_start captures prior susceptibility without that problem. It is available exactly at
  both Berlin pivots (`anteil − dynamik`) and in Hamburg (class at E−3). H3a keeps S_pivot, which is
  the correct guard against the outcome's regression to the mean. Both alternatives are reported as
  sensitivities, and the findings state which mechanism each control removes. This changes my rev. 1
  position, which used S_pivot for both directions.
- **R1–R7: adopted.** R1 fidelity check, R2 H1a note, R3 kebab-free H1b, R4 café-growth cross-lag,
  R5 Pearce attribution, R6 pivot-2016 caveat, R7 BZR-grain H1. All are outside the confirmatory
  families.

## 12. Still open

- **Prerequisite #360** must close before any Berlin status composite is computed.
- **Domain re-check** of this revision against D1–D8.
- No further maintainer call is needed for the design. If #360 finds that S3/S4 are not Transferbezug
  and Kinderarmut in some edition, the §2.1(1) fallback (verified populated core) applies. That is a
  documented deviation, not a new decision.

## Amendment 1 (2026-10-31, pre-results)

Recorded by geo-DS before any suite result exists (phase A built, phase B not started; no
hypothesis-level statistic has been computed). Trigger: open points O1, O2, O6, O7, O8 in
`docs/epic-e/354-phase-a-data-prerequisites.md` §8. Numbers below are taken from that evidence doc.

**A1.1 (O8) Min-base flag: the measurement rule stays, the multivariate row rule is clarified.**
The flag (parent-domain base ≥ 10, ADR-0017 / #274 D-3) is a *measurement-validity* rule: below
it a category share has too few trials to be read as offering structure. It is not relaxed.
§5.1's wording "areas are excluded only by the min-base flag" was written for a single variable
and is ambiguous for a multi-feature classifier, where listwise deletion would keep only areas
passing every parent base. That would cut n far below the ~200–260 seen for one category and would
restrict H1/H2 to the dense commercial core, i.e. select on a correlate of status (range restriction).
The binding reading from now on:

- **H1a, H1b, H1c (univariate Spearman): unchanged.** Rows with the relevant flag set are dropped
  after zero-fill. H1b keeps 199/436 (2018 frame) and 236–260/541 (2019–2025). With n ≈ 200 a
  two-sided ρ = 0.2 is detected at roughly 80% power at α = 0.05, so the primaries stay informative.
  Counts per 1,000 residents are **not** adopted as the primary: they measure density, not the
  thesis's offering structure (*Angebotsstruktur*), and would change the construct after the domain
  review. They are added as a **sensitivity** row (full frame, no base rule) per category hypothesis.
- **H1, H2 (multivariate AUC): cell-level missingness, not row deletion.** A flagged cell is set to
  missing. Missing cells are filled with the **training-fold mean** by a `SimpleImputer` inside the
  sklearn `Pipeline`, before standardisation, so no information crosses folds. **No missing-indicator
  columns in the primary.** An indicator would add commercial *density* (which domains reach the
  base) to a test of *structure* and inflate AUC by a construct the hypothesis does not name. Rows
  are dropped only by the §5.1 exclusions (uninhabited/unscored, D3 guard).
- **Fixed feature list rule (set from flags only, never from the outcome):** a category enters the
  per-city/per-panel list if its flag is unset in ≥ 20% of the panel's included areas. Labels are
  sorted lexicographically. The list is written to the results metadata before any fit.
- **New sensitivities (outside every family, §5.2):** (i) H1/H2 plus one base-indicator per domain
  (shows how much density adds); (ii) H1/H2 restricted to areas passing the base in all four
  commercial domains (complete-case); (iii) per-1k-resident counts for H1a/H1b. Findings must report
  the n per row and the status distribution of retained vs dropped areas for H1a/H1b.

**A1.2 (O2) Data source.** Confirmed: the suite reads `int_poi_oa_native_panel` (zero-filled, flag
carried) for every OA feature. `load_oa_category_panel` from E1 must not be used for the suite, since
it conditions on presence. Reusing its pivot logic on the new panel is fine (§6.2 updated in that sense).

**A1.3 (O1) Kernel mass conservation.** No effect on the confirmatory family: all primaries use the
`standard` (hard-assignment) variant. `gaussian_500m` appears only in sensitivity rows, where a
+0.05–0.08% city-total excess is immaterial to rank statistics. The vacuous C-1 test is a real defect
and gets its own issue (canonicalise `city_code`; decide outside-polygon mass), not a phase-B blocker.

**A1.4 (O6) `zscore_slq` NULLs.** The suite uses the ADR-0017 primary OA metric (location quotient)
and does **not** read `zscore_slq` or `mart_poi_oa_methods`. No effect. Any future row that uses
`zscore_slq` requires the tolerance fix first (R-C3 determinism).

**A1.5 (O7) Dominance tie-break.** `top_child` / `int_poi_within_group_dominance` is not an input to
any suite row. No effect. Separate fix recommended (deterministic tie-break). §5.7 is tightened: the
script must run twice on the same warehouse and produce byte-identical results CSVs; feature lists,
GroupKFold assignment and bootstrap seeds are derived from sorted keys.

**Materiality.** A1.1's multivariate rule changes the effective H1/H2 sample and adds an imputation
step to the domain-reviewed primary. It does not change hypotheses, variables, expected signs,
families or verdict mapping, but it is material enough that **the domain expert must re-check A1.1**
before phase B integrates. A1.2–A1.5 are clarifications with no design effect.

## 13. References

- Helweg, D. (2018). *Untersuchung von Gentrifizierung am Beispiel Berlin mittels Big Data Analytics.*
  Masterarbeit, Universität Hamburg. §4.5, §6.2.3–6.2.4, §6.3; Tab. 4-7, 6-1, 6-11–6-16; Abb. 6-3.
  Repository `dhelweg/masterthesis2018_gentrification`; SQL in `reference/system/`.
- Benjamini, Y. & Hochberg, Y. (1995). Controlling the false discovery rate. *JRSS B* 57(1).
- Benjamini, Y. & Yekutieli, D. (2001). The control of the false discovery rate in multiple testing
  under dependency. *Annals of Statistics* 29(4).
- Bundesagentur für Arbeit, Statistik (2022). Rechtskreiswechsel ukrainischer Geflüchteter in die
  Grundsicherung (SGB II) zum 1. Juni 2022 — Methodenhinweise.
- Caldas de Castro, M. & Singer, B. H. (2006). Controlling the false discovery rate. *Geographical
  Analysis* 38(2).
- Cameron, A. C., Gelbach, J. B. & Miller, D. L. (2008). Bootstrap-based improvements for inference
  with clustered errors. *Review of Economics and Statistics* 90(3).
- Cohen, J. (1988). *Statistical Power Analysis for the Behavioral Sciences*, 2nd ed.
- Conover, W. J. (1999). *Practical Nonparametric Statistics*, 3rd ed.
- Dangschat, J. (1988). Gentrification: Der Wandel innenstadtnaher Wohnviertel. *KZfSS Sonderheft 29*.
- Davis, S. J., Haltiwanger, J. & Schuh, S. (1996). *Job Creation and Destruction.* MIT Press.
- Döring, C. & Ulbricht, K. (2016). Gentrification-Hotspots und Verdrängungsprozesse in Berlin.
- Holm, S. (1979). A simple sequentially rejective multiple test procedure. *Scand. J. Statistics* 6(2).
- Hosmer, D. W., Lemeshow, S. & Sturdivant, R. X. (2013). *Applied Logistic Regression*, 3rd ed.
- Papachristos, A. V. et al. (2011); Pearce, J. et al. (2007); Powell, L. M. et al. (2006). As cited by
  the thesis for H1a/H1b/H1c.
- SenSBW, *Monitoring Soziale Stadtentwicklung* 2023 and 2025 (indicator definitions S1–S4).
- Smith, N. (1979). Toward a theory of gentrification. *JAPA* 45(4).
- Venerandi, A. et al. (2015). Measuring urban deprivation from user generated content. *CSCW '15*.
