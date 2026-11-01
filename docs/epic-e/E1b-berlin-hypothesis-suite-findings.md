# E1b — Berlin thesis hypothesis suite (#354): 2019–2025 and the thesis era re-analysed

> **Generated** by `analysis/thesis_hypothesis_suite.py --city BER` — do not hand-edit. Re-run the script to regenerate (§7.2).

- **Run:** `run_sha` 3661079aa212; seed 42; B = 1999 cluster-bootstrap draws; α = 0.05.
- **Binding design:** `docs/methodology/354-355-hypothesis-suite-preregistration.md` (rev. 2 + Amendment 1, 2026-10-31) and the domain review notes N1–N8 (`docs/methodology/354-355-preregistration-domain-review.md`).
- **Data:** OA from `int_poi_oa_native_panel` (zero-filled, `standard`, min-base flag; never E1's `load_oa_category_panel`), commercial C5 shares from `int_poi_c5_share_native` (native LOR-2021 back-cast for 2019/2020), status composites from the #360 meaning-named `stg_berlin_mss_indicators` columns (S1 + S3 + S4 / D1 + D3 + D4 only; no D5 / `displacement_subindex`, #362), published classes from `stg_berlin_mss`.
- **Results table:** `docs/epic-e/thesis-hypothesis-suite-results.csv` (schema §7.1); fixed feature lists, coverage, validity and coefficients: `docs/epic-e/thesis-hypothesis-suite-metadata.json`.
- **Gate:** methodology-bearing (R-C1): geo-DS and domain `Verdict: PASS` required before integration into `develop`.

## 1. Headline: the eight hypotheses

Primary test per hypothesis (§5.1); significance = Benjamini–Hochberg-adjusted bootstrap p < 0.05 across the panel's 8 primaries (§5.5). ρ: higher status value = worse status (MSS polarity). *Italic* = "Holds?" mapping to the thesis verdict (§5.6).

| Hyp | Thesis verdict (Tabelle 6-16) | Thesis era re-analysed (2013–2019) | 2019–2025 |
|---|---|---|---|
| H1 | ✓ | AUC 0.677 [0.625, 0.727], n = 436 (137 clusters), p_BH = 0.0013: **SUPPORTED** (poor); *holds* | AUC 0.741 [0.690, 0.789], n = 535 (143 clusters), p_BH = 0.0010: **SUPPORTED** (acceptable); *holds* |
| H1a | 0 | ρ 0.005 [-0.170, 0.185], n = 188 (97 clusters), p_BH = 0.9655: **NOT SIGNIFICANT** (negligible); *consistent (still unclear)* | ρ -0.079 [-0.226, 0.060], n = 260 (104 clusters), p_BH = 0.4354: **NOT SIGNIFICANT** (negligible); *consistent (still unclear)* |
| H1b | ✓ | ρ 0.465 [0.346, 0.574], n = 188 (97 clusters), p_BH = 0.0013: **SUPPORTED** (moderate); *holds* | ρ 0.444 [0.330, 0.536], n = 260 (104 clusters), p_BH = 0.0010: **SUPPORTED** (moderate); *holds* |
| H1c | 0 | ρ 0.174 [0.079, 0.275], n = 432 (137 clusters), p_BH = 0.0020: **CONTRADICTED** (small); *opposite direction (thesis: undecided); consistent with the sign of the thesis's own planning-area OA correlations (Tabelle 6-14)* | ρ 0.224 [0.126, 0.320], n = 535 (143 clusters), p_BH = 0.0010: **CONTRADICTED** (small); *opposite direction (thesis: undecided); consistent with the sign of the thesis's own planning-area OA correlations (Tabelle 6-14)* |
| H2 | 0 | AUC 0.617 [0.578, 0.658], n = 1307 (137 clusters), p_BH = 0.0013: **SUPPORTED** (poor); *consistent (still unclear): explained by current status level (cf. the thesis's 'Scheinkorrelation', §6.3.2.1)* | AUC 0.609 [0.579, 0.637], n = 1607 (143 clusters), p_BH = 0.0010: **SUPPORTED** (poor); *consistent (still unclear): explained by current status level (cf. the thesis's 'Scheinkorrelation', §6.3.2.1)* |
| H3a | ✗ | ρ -0.024 [-0.092, 0.045], n = 864 (137 clusters), p_BH = 0.5591: **NOT SIGNIFICANT** (negligible); *consistent (rejected)* | ρ -0.002 [-0.064, 0.059], n = 1062 (143 clusters), p_BH = 0.9335: **NOT SIGNIFICANT** (negligible); *consistent (rejected)* |
| H3b | (✓) | ρ 0.055 [-0.019, 0.125], n = 864 (137 clusters), p_BH = 0.1708: **NOT SIGNIFICANT** (negligible); *not reproduced* | ρ -0.021 [-0.082, 0.041], n = 1061 (143 clusters), p_BH = 0.5980: **NOT SIGNIFICANT** (negligible); *not reproduced* |
| H3c | 0 | ρ -0.049 [-0.107, 0.012], n = 1299 (137 clusters), p_BH = 0.1697: **NOT SIGNIFICANT** (negligible); *consistent (still unclear)* | ρ -0.020 [-0.073, 0.036], n = 1596 (143 clusters), p_BH = 0.5980: **NOT SIGNIFICANT** (negligible); *consistent (still unclear)* |

Primary operationalisations: H1 = grouped-CV out-of-fold AUC of a fixed L2 logit on all category-level OA passing the A1.1 feature rule (binary status, split at 0); H1a/H1b/H1c = Spearman of status with OA Cafe / OA Fast Food (category) / OA Sports and Recreation (domain); H2 = out-of-fold AUC of binary Dynamik composite on category OA at the window start, pooled windows; H3a = partial ρ(g(commercial C5)_P, D_F | D_P, S_pivot); H3b = partial ρ(D_P, g(commercial C5)_F | g(commercial C5)_P, S at the start of P); H3c = ρ(g(commercial C5)_W, D_W), same window. Status: thesis era H1 family = the thesis's own MSS-2016 status index × OSM 2017; 2019–2025 H1 family = S composite of MSS 2025 × OSM 2025.

- **2019–2025, H3a/H3b together:** no directional evidence either way.
- **Thesis era, H3a/H3b together:** no directional evidence either way.

**What FDR means (§5.5).** Within each panel, Benjamini–Hochberg bounds the expected share of false claims among the rows marked significant; it does not protect each row individually. `p_holm` (Holm 1979, family-wise) is reported in the CSV for transparency and does not decide verdicts.
Primaries significant under BH but not under Holm ("significant at FDR 5%; not at family-wise 5%"): none.
Rows labelled "nominally significant" (unadjusted p < 0.05, not significant after BH; the thesis applied no multiplicity correction): none.

## 2. Notes per hypothesis

### 2019–2025

- **H1a coverage (N5).** Among neighbourhoods with at least ten gastronomy outlets (the parent base needed to measure the mix): n retained 260 of 535. Retained: median status -0.32, share with status > 0 41%; dropped: median status -0.12, share with status > 0 45%. The result describes these areas, not the whole city.
- **H1b coverage (N5).** Among neighbourhoods with at least ten gastronomy outlets (the parent base needed to measure the mix): n retained 260 of 535. Retained: median status -0.32, share with status > 0 41%; dropped: median status -0.12, share with status > 0 45%. The result describes these areas, not the whole city.
- **H1c coverage (N5).** Among neighbourhoods with at least ten POIs of any domain (the parent base needed to measure the mix): n retained 535 of 535. Retained: median status -0.21, share with status > 0 43%; dropped: none. No area is dropped, so the result covers the full frame.

### Thesis era

- **H1a coverage (N5).** Among neighbourhoods with at least ten gastronomy outlets (the parent base needed to measure the mix): n retained 188 of 436. Retained: median status -0.24, share with status > 0 40%; dropped: median status -0.22, share with status > 0 44%. The result describes these areas, not the whole city.
- **H1b coverage (N5).** Among neighbourhoods with at least ten gastronomy outlets (the parent base needed to measure the mix): n retained 188 of 436. Retained: median status -0.24, share with status > 0 40%; dropped: median status -0.22, share with status > 0 44%. The result describes these areas, not the whole city.
- **H1c coverage (N5).** Among neighbourhoods with at least ten POIs of any domain (the parent base needed to measure the mix): n retained 432 of 436. Retained: median status -0.23, share with status > 0 43%; dropped: median status -0.40, share with status > 0 25%. The result describes these areas, not the whole city.

- **H1a (R2).** The thesis's only significant café row was population-weighted stock at PLR (Pearson −0.14; Spearman not significant), and its OA rows were null (PLR OA ρ = −0.02). An OA-primary result of "consistent (still unclear)" is therefore expected even if nothing changed. Papachristos et al. (2011) concerns the *growth* of coffee shops; the café-growth cross-lag is in the exploratory rows (R4).
- **H1b.** A deprivation hypothesis (Pearce et al. 2007, New Zealand), phrased at area level.
- **H1 public wording (modern).** Commercial-only H1 row: AUC 0.689 [0.631, 0.745], SUPPORTED → public text may say "businesses".
- **H1 public wording (thesis-era).** Commercial-only H1 row: AUC 0.624 [0.564, 0.682], SUPPORTED → public text may say "businesses".

### H1c in the thesis (binding text, §1.3)

*"The 2018 thesis rated H1c as undecided. Its correlations between sport and leisure facilities and
the official status index were very small and of mixed sign. At planning-area level, more facilities
went slightly with lower official status; at district-region level, the population-weighted count
went slightly with higher status. The thesis text describes the planning-area result as in line with
the hypothesis; under the index's own sign convention it is not. The 'undecided' verdict is
unaffected. In OpenStreetMap this category consists mostly of playgrounds and public table-tennis
tables."* (pre-registration §1.3, public wording adopted from the domain review §3)

In OSM, "Sports and Recreation" is mostly playgrounds and public table-tennis tables (Berlin 2025:
1,984 table-tennis tables and 868 playgrounds against 375 fitness centres). This is planned public
provision, dense in family-heavy estates: a plausible reason for a wrong-signed association, not a
tested one. The Sport-without-table-tennis sensitivity row (D3b) is reported below.

## 3. H3a/H3b per pivot and pivot heterogeneity (§3.4)

| Panel | Hyp | Pivot | ρ [95% CI] | n | verdict (CI) |
|---|---|---|---|---|---|
| modern | H3a | 2021 | -0.037 [-0.124, 0.049] | 531 | NOT SIGNIFICANT |
| modern | H3a | 2023 | 0.033 [-0.059, 0.118] | 531 | NOT SIGNIFICANT |
| modern | H3b | 2021 | -0.048 [-0.140, 0.043] | 530 | NOT SIGNIFICANT |
| modern | H3b | 2023 | 0.004 [-0.092, 0.097] | 531 | NOT SIGNIFICANT |
| thesis-era | H3a | 2015 | -0.011 [-0.108, 0.087] | 429 | NOT SIGNIFICANT |
| thesis-era | H3a | 2017 | -0.041 [-0.129, 0.055] | 435 | NOT SIGNIFICANT |
| thesis-era | H3b | 2015 | 0.047 [-0.058, 0.157] | 429 | NOT SIGNIFICANT |
| thesis-era | H3b | 2017 | 0.058 [-0.049, 0.153] | 435 | NOT SIGNIFICANT |

- modern H3a: ρ(pivot 2023) − ρ(pivot 2021) = 0.070 [-0.065, 0.192] → no detectable heterogeneity.
- modern H3b: ρ(pivot 2023) − ρ(pivot 2021) = 0.051 [-0.089, 0.191] → no detectable heterogeneity.
- thesis-era H3a: ρ(pivot 2017) − ρ(pivot 2015) = -0.030 [-0.151, 0.096] → no detectable heterogeneity.
- thesis-era H3b: ρ(pivot 2017) − ρ(pivot 2015) = 0.011 [-0.144, 0.150] → no detectable heterogeneity.

## 4. Composite validity check (§3.2, D1d)

Spearman of the continuous composites with the published classes, per edition. Threshold 0.80.

| Panel | Edition | ρ(S, status class) | S judgement | ρ(D, Dynamik class) | D judgement | n |
|---|---|---|---|---|---|---|
| thesis-era | 2015 | 0.865 | ≥ 0.80 | 0.668 | **below 0.80: diverges** | 435 |
| thesis-era | 2017 | 0.853 | ≥ 0.80 | 0.691 | **below 0.80: diverges** | 436 |
| thesis-era | 2019 | 0.849 | ≥ 0.80 | 0.670 | **below 0.80: diverges** | 436 |
| modern | 2021 | 0.823 | ≥ 0.80 | 0.678 | **below 0.80: diverges** | 536 |
| modern | 2023 | 0.821 | ≥ 0.80 | 0.708 | **below 0.80: diverges** | 536 |
| modern | 2025 | 0.809 | ≥ 0.80 | 0.710 | **below 0.80: diverges** | 535 |

The status composite S meets the 0.80 threshold in every edition.

**Disclosure (§3.2):** the change composite D diverges from the official classification (Spearman < 0.80) in thesis-era 2015, thesis-era 2017, thesis-era 2019, modern 2021, modern 2023, modern 2025. The published-class secondary rows of the H2 and H3a-c (role `secondary`, "published-class version") must be read beside the primaries there. Context, not an excuse: the published Dynamik class has three heavily tied levels (most PLRs are 'stabil'), which caps the attainable rank correlation, and in 2015/2017 and 2023/2025 the official index also uses S2/D2; 2019 and 2021 have no S2 and still fall below 0.80. The threshold is applied as pre-registered.

Thesis era: Spearman(thesis status_index, S_2017 composite) = 0.995 (n = 436).

**Source attributes per composite (#360).** Every composite is built from the meaning-named columns only; the WFS attribute that feeds each one:

- thesis-era 2015: S_2015 = mean z(arbeitslose_anteil[s1], transferbezug_anteil[s3], kinderarmut_anteil[s4]); D_2015 = mean z(arbeitslose_dynamik[d1], transferbezug_dynamik[d3], kinderarmut_dynamik[d4]).
- thesis-era 2017: S_2017 = mean z(arbeitslose_anteil[s1], transferbezug_anteil[s3], kinderarmut_anteil[s4]); D_2017 = mean z(arbeitslose_dynamik[d1], transferbezug_dynamik[d3], kinderarmut_dynamik[d4]).
- thesis-era 2019: S_2019 = mean z(arbeitslose_anteil[s1], transferbezug_anteil[s3], kinderarmut_anteil[s4]); D_2019 = mean z(arbeitslose_dynamik[d1], transferbezug_dynamik[d3], kinderarmut_dynamik[d4]).
- modern 2021: S_2021 = mean z(arbeitslose_anteil[s1], transferbezug_anteil[s3], kinderarmut_anteil[s4]); D_2021 = mean z(arbeitslose_dynamik[d1], transferbezug_dynamik[d3], kinderarmut_dynamik[d4]).
- modern 2023: S_2023 = mean z(arbeitslose_anteil[s1], transferbezug_anteil[s3], kinderarmut_anteil[s4]); D_2023 = mean z(arbeitslose_dynamik[d1], transferbezug_dynamik[d3], kinderarmut_dynamik[d4]).
- modern 2025: S_2025 = mean z(arbeitslose_anteil[s1], transferbezug_anteil[s3], kinderarmut_anteil[s4]); D_2025 = mean z(arbeitslose_dynamik[d1], transferbezug_dynamik[d3], kinderarmut_dynamik[d4]).

**Definition breaks (#360 binding input).** Change values that cross a definition break carry a `definition break` note in the CSV:

- D_2017 window (Dec 2014-Dec 2016) crosses the 2016 SGB II statistics revision (S3/S4 recalculated, MSS 2023 history table p. 13; D3 r = 0.981, D4 r = 0.917 vs level difference).
- D_2019 window (Dec 2016-Dec 2018) crosses the MSS 2019 S1 redefinition (SGB III removed; recomputed back to 2016 by the publisher, MSS 2019 p. 16; D1 r = 0.953).
- D_2021 window (Dec 2018-Dec 2020) crosses the MSS 2021 Regelaltersgrenze change in the S1/S3 denominators (Indikatorenblaetter MSS 2021, Vorbemerkungen p. 7).
- Levels are never compared across the 2017/2019 S1 seam: S is z-scored within edition (§3.2).

## 5. Shock disclosure (binding text, §3.4)

No window is shock-free, and the findings must not imply otherwise (pre-registration §3.4,
binding text).

- **W1 (Dec 2018 → Dec 2020)** contains 2020. Pandemic job losses hit hospitality, culture and tourism
  workers, who plausibly live disproportionately in gastronomy-dense inner-city areas. Berlin mean
  `arbeitslose_dynamik` in 2021 is +1.09 pp, the only positive edition. W1 Dynamik can therefore
  correlate with gastronomy through the labour market rather than through upgrading. **W2 contains
  the bounce-back.** Every pooled H2/H3c row that includes W1 names this mechanism in `notes`.
- **W2 (Dec 2020 → Dec 2022)** covers the pandemic and the **1 June 2022 Rechtskreiswechsel**, which
  moved Ukrainian refugees into SGB II (BA-Statistik 2022).
- **W3 (Dec 2022 → Dec 2024)** is **not** post-shock. It contains (i) continuing refugee entry into
  SGB II after June 2022 and (ii) the **1 January 2023 Bürgergeld and Wohngeld-Plus reforms**. Both
  changed who counts in all three SGB-based indicators, with unknown and possibly opposite small-area
  effects.
- **H1 cross-section (2025 levels)** includes refugee-related SGB II receipt concentrated near large
  accommodation sites. This is a modest effect on a level, and it belongs in the limitation line.

The warehouse has no open small-area refugee-accommodation source, so this is disclosed as a
limitation, not corrected.

## 6. AUC comparability and top coefficients (binding text, §1.2)

The thesis's headline AUCs are not comparable to the suite's (pre-registration §1.2, binding
text D4c). They come from BZR grain for H1, H2 and H3b (137 areas), random 10-fold CV (§6.2.3), the
best of about 19 algorithms (§6.2.4) and up to 85 OA features. The suite uses PLR grain,
cluster-grouped CV and one pre-specified model, each of which lowers AUC. **No table may set the
thesis AUC against a suite AUC as a measure of weakening.** In place of the thesis's "Features
sinnvoll?" column, the ten largest standardised coefficients (mean over the five training folds) are
listed with their signs.

- **modern H1:** Services|Funeral (+0.565), Public Space|Phone (+0.498), Public Space|Other (+0.378), Public Service|Social (+0.345), Retail|Tech (+0.333), Services|Beauty (-0.326), Gastronomy|Fast Food (+0.311), Public Space|Post (-0.294), Retail|Other Goods (-0.288), Services|Travel (+0.284)
- **modern H2:** Mobility|Public Transport (+0.427), Public Space|Bench (-0.337), Retail|Food and Drink (-0.335), Public Space|Phone (-0.325), Public Space|Recycling (-0.322), Mobility|Individual (+0.252), Retail|Tech (-0.239), Retail|Workshop (-0.215), Public Service|Bank (-0.188), Public Service|Health (-0.175)
- **thesis-era H1:** Gastronomy|Fast Food (+0.419), Retail|Tech (+0.335), Gastronomy|Restaurant (-0.333), Retail|Print (-0.331), Public Space|Phone (+0.251), Public Space|Toilet (-0.223), Public Space|Mail (-0.216), Public Space|Recycling (+0.186), Retail|Drugstore (-0.177), Retail|Hardware (+0.168)
- **thesis-era H2:** Retail|Drugstore (+0.338), Public Space|Phone (-0.296), Retail|Food and Drink (-0.247), Mobility|Public Transport (+0.228), Public Service|Health (+0.228), Gastronomy|Fast Food (-0.212), Public Service|Bank (+0.207), Public Space|Recycling (-0.186), Public Space|Mail (+0.184), Public Space|Post (-0.171)

**Fixed feature lists (A1.1)** — a category enters if its min-base flag is unset in ≥ 20% of the design's included rows; sorted lexicographically.

- modern H1_category (39): Gastronomy|Cafe, Gastronomy|Fast Food, Gastronomy|Restaurant, Mobility|Individual, Mobility|Public Transport, Public Service|Bank, Public Service|Education, Public Service|Health, Public Service|Other, Public Service|Safety, Public Service|Social, Public Space|Bench, Public Space|Mail, Public Space|Other, Public Space|Phone, Public Space|Post, Public Space|Recycling, Public Space|Toilet, Retail|Art, Retail|Clothing, Retail|Food and Drink, Retail|Hardware, Retail|Medical, Retail|Other Goods, Retail|Print, Retail|Tech, Retail|Toys and Gifts, Retail|Workshop, Services|Beauty, Services|Funeral, Services|Hairdresser, Services|Laundry, Services|Massage, Services|Travel, Sports and Recreation|Recreation, Sports and Recreation|Sport, Tourism|Accommodation, Tourism|Info, Tourism|Sights
- modern H2_category (31): Gastronomy|Cafe, Gastronomy|Fast Food, Gastronomy|Restaurant, Mobility|Individual, Mobility|Public Transport, Public Service|Bank, Public Service|Education, Public Service|Health, Public Service|Other, Public Service|Safety, Public Service|Social, Public Space|Bench, Public Space|Mail, Public Space|Other, Public Space|Phone, Public Space|Post, Public Space|Recycling, Public Space|Toilet, Retail|Art, Retail|Clothing, Retail|Food and Drink, Retail|Hardware, Retail|Medical, Retail|Other Goods, Retail|Print, Retail|Tech, Retail|Toys and Gifts, Retail|Workshop, Tourism|Accommodation, Tourism|Info, Tourism|Sights
- thesis-era H1_category (32): Gastronomy|Cafe, Gastronomy|Fast Food, Gastronomy|Restaurant, Mobility|Individual, Mobility|Public Transport, Public Service|Bank, Public Service|Education, Public Service|Health, Public Service|Other, Public Service|Safety, Public Service|Social, Public Space|Bench, Public Space|Mail, Public Space|Other, Public Space|Phone, Public Space|Post, Public Space|Recycling, Public Space|Toilet, Retail|Art, Retail|Clothing, Retail|Drugstore, Retail|Food and Drink, Retail|Hardware, Retail|Medical, Retail|Other Goods, Retail|Print, Retail|Tech, Retail|Toys and Gifts, Retail|Workshop, Tourism|Accommodation, Tourism|Info, Tourism|Sights
- thesis-era H2_category (29): Gastronomy|Cafe, Gastronomy|Fast Food, Gastronomy|Restaurant, Mobility|Individual, Mobility|Public Transport, Public Service|Bank, Public Service|Education, Public Service|Health, Public Service|Other, Public Service|Safety, Public Service|Social, Public Space|Bench, Public Space|Mail, Public Space|Other, Public Space|Phone, Public Space|Post, Public Space|Recycling, Public Space|Toilet, Retail|Art, Retail|Clothing, Retail|Drugstore, Retail|Food and Drink, Retail|Hardware, Retail|Medical, Retail|Other Goods, Retail|Print, Retail|Tech, Retail|Toys and Gifts, Retail|Workshop

## 7. Thesis-era fidelity check (R1 with N6)

Unbased OA rows (zero-filled, no minimum base, full frame) against the thesis's PLR OA Spearman (Tabellen 6-12 to 6-14). A gap is a pipeline divergence, not a finding (Epic B framing).

| Hyp | Thesis PLR OA ρ | Suite (unbased) ρ | n | gap |
|---|---|---|---|---|
| H1a | -0.02 | -0.104 | 436 | -0.084 |
| H1b | +0.27 | +0.263 | 436 | -0.007 |
| H1c | +0.10 | +0.175 | 436 | +0.075 |

## 8. Secondary, sensitivity and exploratory rows

None of these can change a headline verdict. They are uncorrected and use the unadjusted 95% cluster-bootstrap CI (§5.4).

| Panel | Hyp | Role | Operationalisation | Estimate [95% CI] | n | Verdict | Notes |
|---|---|---|---|---|---|---|---|
| modern | H1 | secondary | domain-level OA (13 domains) => binary status | 0.712 [0.654, 0.768] | 535 | SUPPORTED | a null here reads 'not detected at domain resolution'; n_pos=232 |
| modern | H1 | secondary | commercial-only category OA (4 commercial domains) => binary status | 0.689 [0.631, 0.745] | 535 | SUPPORTED | decides the public 'businesses' wording (§9); n_pos=232 |
| modern | H1 | sensitivity | category OA + one base indicator per domain (A1.1 (i)) | 0.730 [0.682, 0.776] | 535 | SUPPORTED | shows how much commercial density adds to structure; n_pos=232 |
| modern | H1 | sensitivity | category OA, complete-case: base passed in all four commercial domains (A1.1 (ii)) | 0.831 [0.714, 0.931] | 69 | SUPPORTED | n_pos=32 |
| modern | H1 | secondary | category OA => published status class {3,4} vs {1,2} | 0.645 [0.570, 0.718] | 535 | SUPPORTED | published-class version (§5.2); n_pos=93 |
| modern | H1 | exploratory | BZR-grain H1: category OA (summed stocks) => binary status, GroupKFold by Bezirk | 0.790 [–, –] | 143 | descriptive | descriptive only, no verdict (R7); 12 Bezirk groups < 20 clusters, so no CI; n_pos=67 |
| modern | H1a | sensitivity | Spearman(Gastronomy|Cafe POIs per 1,000 residents, status), full frame, no base rule (population-weighted stock, N7) | -0.168 [-0.282, -0.047] | 535 | SUPPORTED | population-weighted stock row (thesis 'einwohnergewichtet', §5.2) = A1.1 (iii) per-1k row; counted once (N7) |
| modern | H1a | secondary | Spearman(OA category Cafe, published status class), min-base flag dropped | -0.126 [-0.262, 0.010] | 260 | NOT SIGNIFICANT | published-class version (§5.2) |
| modern | H1b | sensitivity | Spearman(Gastronomy|Fast Food POIs per 1,000 residents, status), full frame, no base rule (population-weighted stock, N7) | 0.081 [-0.024, 0.184] | 535 | NOT SIGNIFICANT | population-weighted stock row (thesis 'einwohnergewichtet', §5.2) = A1.1 (iii) per-1k row; counted once (N7) |
| modern | H1b | secondary | Spearman(OA category Fast Food, published status class), min-base flag dropped | 0.297 [0.174, 0.402] | 260 | SUPPORTED | published-class version (§5.2) |
| modern | H1c | sensitivity | Spearman(Sports and Recreation POIs per 1,000 residents, status), full frame, no base rule (population-weighted stock, N7) | 0.093 [-0.008, 0.193] | 535 | NOT SIGNIFICANT | population-weighted stock row (thesis 'einwohnergewichtet', §5.2) = A1.1 (iii) per-1k row; counted once (N7) |
| modern | H1c | secondary | Spearman(OA domain Sports and Recreation, published status class), min-base flag dropped | 0.206 [0.107, 0.305] | 535 | CONTRADICTED | published-class version (§5.2) |
| modern | H1c | sensitivity | Spearman(Sport category without table tennis (organised/commercial facilities, closer to Powell et al.; D3b), status); types removed from numerator and parent: Table Tennis | – (not reported: NO DATA) | 21 | NO DATA |  |
| modern | H1b | sensitivity | Fast Food without döner/kebab types (anti-stigmatisation check, R3) | – (not reported: NO DATA) | 0 | NO DATA | not testable: the taxonomy carries no matching type at this snapshot (Fast Food types: Other Fast Food) |
| modern | H2 | secondary | domain-level OA at window start => binary Dynamik | 0.563 [0.532, 0.592] | 1607 | SUPPORTED | includes W1 (Dec 2018-Dec 2020, pandemic): W1 Dynamik can correlate with gastronomy through hospitality/culture job losses rather than upgrading; W2 contains the bounce-back (§3.4); definition break: D_2021 window (Dec 2018-Dec 2020) crosses the MSS 2021 Regelaltersgrenze change in the S1/S3 denominators (Indikatorenblaetter MSS 2021, Vorbemerkungen p. 7); a null here reads 'not detected at domain resolution'; n_pos=841 |
| modern | H2 | sensitivity | category OA + one base indicator per domain (A1.1 (i)) | 0.597 [0.568, 0.625] | 1607 | SUPPORTED | includes W1 (Dec 2018-Dec 2020, pandemic): W1 Dynamik can correlate with gastronomy through hospitality/culture job losses rather than upgrading; W2 contains the bounce-back (§3.4); definition break: D_2021 window (Dec 2018-Dec 2020) crosses the MSS 2021 Regelaltersgrenze change in the S1/S3 denominators (Indikatorenblaetter MSS 2021, Vorbemerkungen p. 7); n_pos=841 |
| modern | H2 | sensitivity | category OA, complete-case in the four commercial domains (A1.1 (ii)) | 0.582 [0.485, 0.671] | 166 | NOT SIGNIFICANT | includes W1 (Dec 2018-Dec 2020, pandemic): W1 Dynamik can correlate with gastronomy through hospitality/culture job losses rather than upgrading; W2 contains the bounce-back (§3.4); definition break: D_2021 window (Dec 2018-Dec 2020) crosses the MSS 2021 Regelaltersgrenze change in the S1/S3 denominators (Indikatorenblaetter MSS 2021, Vorbemerkungen p. 7); n_pos=85 |
| modern | H2 | secondary | H2 incremental: delta AUC of (status level at window start + category OA) over status level alone | -0.004 [-0.015, 0.007] | 1607 | NOT SIGNIFICANT | includes W1 (Dec 2018-Dec 2020, pandemic): W1 Dynamik can correlate with gastronomy through hospitality/culture job losses rather than upgrading; W2 contains the bounce-back (§3.4); definition break: D_2021 window (Dec 2018-Dec 2020) crosses the MSS 2021 Regelaltersgrenze change in the S1/S3 denominators (Indikatorenblaetter MSS 2021, Vorbemerkungen p. 7) |
| modern | H2 | exploratory | directional continuity: Spearman(OA basket of 4 commercial domains at window start, status change over the window) | -0.096 [-0.165, -0.033] | 1600 | SUPPORTED | includes W1 (Dec 2018-Dec 2020, pandemic): W1 Dynamik can correlate with gastronomy through hospitality/culture job losses rather than upgrading; W2 contains the bounce-back (§3.4); definition break: D_2021 window (Dec 2018-Dec 2020) crosses the MSS 2021 Regelaltersgrenze change in the S1/S3 denominators (Indikatorenblaetter MSS 2021, Vorbemerkungen p. 7) |
| modern | H2 | secondary | category OA => published Dynamik class negativ (3) vs rest | 0.525 [0.477, 0.573] | 1607 | NOT SIGNIFICANT | includes W1 (Dec 2018-Dec 2020, pandemic): W1 Dynamik can correlate with gastronomy through hospitality/culture job losses rather than upgrading; W2 contains the bounce-back (§3.4); definition break: D_2021 window (Dec 2018-Dec 2020) crosses the MSS 2021 Regelaltersgrenze change in the S1/S3 denominators (Indikatorenblaetter MSS 2021, Vorbemerkungen p. 7); published-class version (§5.2); n_pos=168 |
| modern | H3a | sensitivity | H3a with the alternative level control (window_start) | -0.002 [-0.063, 0.059] | 1062 | NOT SIGNIFICANT | includes W1 (Dec 2018-Dec 2020, pandemic): W1 Dynamik can correlate with gastronomy through hospitality/culture job losses rather than upgrading; W2 contains the bounce-back (§3.4); definition break: D_2021 window (Dec 2018-Dec 2020) crosses the MSS 2021 Regelaltersgrenze change in the S1/S3 denominators (Indikatorenblaetter MSS 2021, Vorbemerkungen p. 7) |
| modern | H3a | sensitivity | H3a primary controls + D4 | -0.038 [-0.124, 0.049] | 531 | NOT SIGNIFICANT | D4 at pivot-1 (EWR composite); includes W1 (Dec 2018-Dec 2020, pandemic): W1 Dynamik can correlate with gastronomy through hospitality/culture job losses rather than upgrading; W2 contains the bounce-back (§3.4); definition break: D_2021 window (Dec 2018-Dec 2020) crosses the MSS 2021 Regelaltersgrenze change in the S1/S3 denominators (Indikatorenblaetter MSS 2021, Vorbemerkungen p. 7) |
| modern | H3a | sensitivity | H3a at pivot 2021 only | -0.037 [-0.124, 0.049] | 531 | NOT SIGNIFICANT | includes W1 (Dec 2018-Dec 2020, pandemic): W1 Dynamik can correlate with gastronomy through hospitality/culture job losses rather than upgrading; W2 contains the bounce-back (§3.4); definition break: D_2021 window (Dec 2018-Dec 2020) crosses the MSS 2021 Regelaltersgrenze change in the S1/S3 denominators (Indikatorenblaetter MSS 2021, Vorbemerkungen p. 7) |
| modern | H3a | sensitivity | H3a at pivot 2023 only | 0.033 [-0.059, 0.118] | 531 | NOT SIGNIFICANT |  |
| modern | H3a | sensitivity | pivot difference: rho(pivot 2023) - rho(pivot 2021) (§3.4) | 0.070 [-0.065, 0.192] | 1062 | descriptive | no detectable pivot heterogeneity (CI includes 0) |
| modern | H3a | exploratory | H3a level-stratified: high status at window start | -0.064 [-0.222, 0.102] | 160 | NOT SIGNIFICANT | high = S_start at/below the published 'hoch' share quantile (2021: 14.0%, 2023: 16.0%; N1) |
| modern | H3a | exploratory | H3a level-stratified: low/mid status at window start | 0.009 [-0.051, 0.071] | 902 | NOT SIGNIFICANT | high = S_start at/below the published 'hoch' share quantile (2021: 14.0%, 2023: 16.0%; N1) |
| modern | H3a | secondary | H3a with total-share growth of all POIs (continuity with E1/E5) | -0.078 [-0.142, -0.012] | 1071 | SUPPORTED | includes W1 (Dec 2018-Dec 2020, pandemic): W1 Dynamik can correlate with gastronomy through hospitality/culture job losses rather than upgrading; W2 contains the bounce-back (§3.4); definition break: D_2021 window (Dec 2018-Dec 2020) crosses the MSS 2021 Regelaltersgrenze change in the S1/S3 denominators (Indikatorenblaetter MSS 2021, Vorbemerkungen p. 7) |
| modern | H3a | secondary | H3a with OA-basket change (mean OA of the 4 commercial domains) | 0.053 [-0.019, 0.121] | 1063 | NOT SIGNIFICANT | includes W1 (Dec 2018-Dec 2020, pandemic): W1 Dynamik can correlate with gastronomy through hospitality/culture job losses rather than upgrading; W2 contains the bounce-back (§3.4); definition break: D_2021 window (Dec 2018-Dec 2020) crosses the MSS 2021 Regelaltersgrenze change in the S1/S3 denominators (Indikatorenblaetter MSS 2021, Vorbemerkungen p. 7) |
| modern | H3a | exploratory | H3a with café-growth cross-lag, g(café C5 share) (R4) | -0.055 [-0.130, 0.014] | 809 | NOT SIGNIFICANT | includes W1 (Dec 2018-Dec 2020, pandemic): W1 Dynamik can correlate with gastronomy through hospitality/culture job losses rather than upgrading; W2 contains the bounce-back (§3.4); definition break: D_2021 window (Dec 2018-Dec 2020) crosses the MSS 2021 Regelaltersgrenze change in the S1/S3 denominators (Indikatorenblaetter MSS 2021, Vorbemerkungen p. 7) |
| modern | H3a | secondary | H3a on published Dynamik/status classes | 0.037 [-0.016, 0.090] | 1062 | NOT SIGNIFICANT | published-class version (§5.2); rows without a class at the control date drop; includes W1 (Dec 2018-Dec 2020, pandemic): W1 Dynamik can correlate with gastronomy through hospitality/culture job losses rather than upgrading; W2 contains the bounce-back (§3.4); definition break: D_2021 window (Dec 2018-Dec 2020) crosses the MSS 2021 Regelaltersgrenze change in the S1/S3 denominators (Indikatorenblaetter MSS 2021, Vorbemerkungen p. 7) |
| modern | H3b | sensitivity | H3b with the alternative level control (pivot) | -0.030 [-0.094, 0.033] | 1061 | NOT SIGNIFICANT | includes W1 (Dec 2018-Dec 2020, pandemic): W1 Dynamik can correlate with gastronomy through hospitality/culture job losses rather than upgrading; W2 contains the bounce-back (§3.4); definition break: D_2021 window (Dec 2018-Dec 2020) crosses the MSS 2021 Regelaltersgrenze change in the S1/S3 denominators (Indikatorenblaetter MSS 2021, Vorbemerkungen p. 7) |
| modern | H3b | sensitivity | H3b primary controls + D4 | -0.050 [-0.140, 0.041] | 530 | NOT SIGNIFICANT | D4 at pivot-1 (EWR composite); includes W1 (Dec 2018-Dec 2020, pandemic): W1 Dynamik can correlate with gastronomy through hospitality/culture job losses rather than upgrading; W2 contains the bounce-back (§3.4); definition break: D_2021 window (Dec 2018-Dec 2020) crosses the MSS 2021 Regelaltersgrenze change in the S1/S3 denominators (Indikatorenblaetter MSS 2021, Vorbemerkungen p. 7) |
| modern | H3b | sensitivity | H3b at pivot 2021 only | -0.048 [-0.140, 0.043] | 530 | NOT SIGNIFICANT | includes W1 (Dec 2018-Dec 2020, pandemic): W1 Dynamik can correlate with gastronomy through hospitality/culture job losses rather than upgrading; W2 contains the bounce-back (§3.4); definition break: D_2021 window (Dec 2018-Dec 2020) crosses the MSS 2021 Regelaltersgrenze change in the S1/S3 denominators (Indikatorenblaetter MSS 2021, Vorbemerkungen p. 7) |
| modern | H3b | sensitivity | H3b at pivot 2023 only | 0.004 [-0.092, 0.097] | 531 | NOT SIGNIFICANT |  |
| modern | H3b | sensitivity | pivot difference: rho(pivot 2023) - rho(pivot 2021) (§3.4) | 0.051 [-0.089, 0.191] | 1061 | descriptive | no detectable pivot heterogeneity (CI includes 0) |
| modern | H3b | exploratory | H3b level-stratified: high status at window start | -0.129 [-0.316, 0.055] | 160 | NOT SIGNIFICANT | high = S_start at/below the published 'hoch' share quantile (2021: 14.0%, 2023: 16.0%; N1) |
| modern | H3b | exploratory | H3b level-stratified: low/mid status at window start | -0.011 [-0.074, 0.052] | 901 | NOT SIGNIFICANT | high = S_start at/below the published 'hoch' share quantile (2021: 14.0%, 2023: 16.0%; N1) |
| modern | H3b | secondary | H3b with total-share growth of all POIs (continuity with E1/E5) | -0.064 [-0.134, 0.006] | 1071 | NOT SIGNIFICANT | includes W1 (Dec 2018-Dec 2020, pandemic): W1 Dynamik can correlate with gastronomy through hospitality/culture job losses rather than upgrading; W2 contains the bounce-back (§3.4); definition break: D_2021 window (Dec 2018-Dec 2020) crosses the MSS 2021 Regelaltersgrenze change in the S1/S3 denominators (Indikatorenblaetter MSS 2021, Vorbemerkungen p. 7) |
| modern | H3b | secondary | H3b with OA-basket change (mean OA of the 4 commercial domains) | 0.059 [-0.005, 0.124] | 1063 | NOT SIGNIFICANT | includes W1 (Dec 2018-Dec 2020, pandemic): W1 Dynamik can correlate with gastronomy through hospitality/culture job losses rather than upgrading; W2 contains the bounce-back (§3.4); definition break: D_2021 window (Dec 2018-Dec 2020) crosses the MSS 2021 Regelaltersgrenze change in the S1/S3 denominators (Indikatorenblaetter MSS 2021, Vorbemerkungen p. 7) |
| modern | H3b | exploratory | H3b with café-growth cross-lag, g(café C5 share) (R4) | 0.045 [-0.033, 0.120] | 798 | NOT SIGNIFICANT | includes W1 (Dec 2018-Dec 2020, pandemic): W1 Dynamik can correlate with gastronomy through hospitality/culture job losses rather than upgrading; W2 contains the bounce-back (§3.4); definition break: D_2021 window (Dec 2018-Dec 2020) crosses the MSS 2021 Regelaltersgrenze change in the S1/S3 denominators (Indikatorenblaetter MSS 2021, Vorbemerkungen p. 7) |
| modern | H3b | secondary | H3b on published Dynamik/status classes | 0.011 [-0.090, 0.110] | 531 | NOT SIGNIFICANT | published-class version (§5.2); rows without a class at the control date drop; includes W1 (Dec 2018-Dec 2020, pandemic): W1 Dynamik can correlate with gastronomy through hospitality/culture job losses rather than upgrading; W2 contains the bounce-back (§3.4); definition break: D_2021 window (Dec 2018-Dec 2020) crosses the MSS 2021 Regelaltersgrenze change in the S1/S3 denominators (Indikatorenblaetter MSS 2021, Vorbemerkungen p. 7) |
| modern | H3c | secondary | H3c with total-share growth | 0.042 [-0.011, 0.094] | 1607 | NOT SIGNIFICANT | includes W1 (Dec 2018-Dec 2020, pandemic): W1 Dynamik can correlate with gastronomy through hospitality/culture job losses rather than upgrading; W2 contains the bounce-back (§3.4); definition break: D_2021 window (Dec 2018-Dec 2020) crosses the MSS 2021 Regelaltersgrenze change in the S1/S3 denominators (Indikatorenblaetter MSS 2021, Vorbemerkungen p. 7) |
| modern | H3c | secondary | H3c with OA-basket change | -0.038 [-0.090, 0.016] | 1599 | NOT SIGNIFICANT | includes W1 (Dec 2018-Dec 2020, pandemic): W1 Dynamik can correlate with gastronomy through hospitality/culture job losses rather than upgrading; W2 contains the bounce-back (§3.4); definition break: D_2021 window (Dec 2018-Dec 2020) crosses the MSS 2021 Regelaltersgrenze change in the S1/S3 denominators (Indikatorenblaetter MSS 2021, Vorbemerkungen p. 7) |
| modern | H3c | sensitivity | H3c window 2019-2021 only | -0.014 [-0.101, 0.074] | 531 | NOT SIGNIFICANT | includes W1 (Dec 2018-Dec 2020, pandemic): W1 Dynamik can correlate with gastronomy through hospitality/culture job losses rather than upgrading; W2 contains the bounce-back (§3.4); definition break: D_2021 window (Dec 2018-Dec 2020) crosses the MSS 2021 Regelaltersgrenze change in the S1/S3 denominators (Indikatorenblaetter MSS 2021, Vorbemerkungen p. 7) |
| modern | H3c | sensitivity | H3c window 2021-2023 only | -0.023 [-0.117, 0.075] | 532 | NOT SIGNIFICANT |  |
| modern | H3c | sensitivity | H3c window 2023-2025 only | -0.022 [-0.111, 0.066] | 533 | NOT SIGNIFICANT |  |
| modern | H3c | secondary | H3c on published Dynamik class | -0.027 [-0.089, 0.033] | 1596 | NOT SIGNIFICANT | published-class version (§5.2); includes W1 (Dec 2018-Dec 2020, pandemic): W1 Dynamik can correlate with gastronomy through hospitality/culture job losses rather than upgrading; W2 contains the bounce-back (§3.4); definition break: D_2021 window (Dec 2018-Dec 2020) crosses the MSS 2021 Regelaltersgrenze change in the S1/S3 denominators (Indikatorenblaetter MSS 2021, Vorbemerkungen p. 7) |
| thesis-era | H1 | secondary | domain-level OA (13 domains) => binary status | 0.688 [0.635, 0.741] | 436 | SUPPORTED | a null here reads 'not detected at domain resolution'; n_pos=185 |
| thesis-era | H1 | secondary | commercial-only category OA (4 commercial domains) => binary status | 0.624 [0.564, 0.682] | 436 | SUPPORTED | decides the public 'businesses' wording (§9); n_pos=185 |
| thesis-era | H1 | sensitivity | category OA + one base indicator per domain (A1.1 (i)) | 0.659 [0.606, 0.713] | 436 | SUPPORTED | shows how much commercial density adds to structure; n_pos=185 |
| thesis-era | H1 | sensitivity | category OA, complete-case: base passed in all four commercial domains (A1.1 (ii)) | 0.662 [0.439, 0.822] | 44 | NOT SIGNIFICANT | n_pos=18 |
| thesis-era | H1 | secondary | category OA => published status class {3,4} vs {1,2} | 0.680 [0.614, 0.747] | 436 | SUPPORTED | published-class version (§5.2); n_pos=83 |
| thesis-era | H1 | exploratory | BZR-grain H1: category OA (summed stocks) => binary status, GroupKFold by Bezirk | 0.655 [–, –] | 137 | descriptive | descriptive only, no verdict (R7); 12 Bezirk groups < 20 clusters, so no CI; n_pos=61 |
| thesis-era | H1a | sensitivity | Spearman(Gastronomy|Cafe POIs per 1,000 residents, status), full frame, no base rule (population-weighted stock, N7) | -0.133 [-0.251, -0.020] | 436 | SUPPORTED | population-weighted stock row (thesis 'einwohnergewichtet', §5.2) = A1.1 (iii) per-1k row; counted once (N7) |
| thesis-era | H1a | sensitivity | Spearman(OA category Cafe, status), zero-filled OA, no base rule, full frame (R1 fidelity, N6) | -0.104 [-0.216, 0.008] | 436 | NOT SIGNIFICANT | R1/N6 fidelity check vs thesis PLR OA rho -0.02 (Tabellen 6-12..6-14); a gap is a pipeline divergence, not a finding |
| thesis-era | H1a | secondary | Spearman(OA category Cafe, published status class), min-base flag dropped | 0.047 [-0.144, 0.227] | 188 | NOT SIGNIFICANT | published-class version (§5.2) |
| thesis-era | H1b | sensitivity | Spearman(Gastronomy|Fast Food POIs per 1,000 residents, status), full frame, no base rule (population-weighted stock, N7) | 0.092 [-0.021, 0.200] | 436 | NOT SIGNIFICANT | population-weighted stock row (thesis 'einwohnergewichtet', §5.2) = A1.1 (iii) per-1k row; counted once (N7) |
| thesis-era | H1b | sensitivity | Spearman(OA category Fast Food, status), zero-filled OA, no base rule, full frame (R1 fidelity, N6) | 0.263 [0.179, 0.346] | 436 | SUPPORTED | R1/N6 fidelity check vs thesis PLR OA rho +0.27 (Tabellen 6-12..6-14); a gap is a pipeline divergence, not a finding |
| thesis-era | H1b | secondary | Spearman(OA category Fast Food, published status class), min-base flag dropped | 0.399 [0.274, 0.515] | 188 | SUPPORTED | published-class version (§5.2) |
| thesis-era | H1c | sensitivity | Spearman(Sports and Recreation POIs per 1,000 residents, status), full frame, no base rule (population-weighted stock, N7) | 0.025 [-0.080, 0.134] | 436 | NOT SIGNIFICANT | population-weighted stock row (thesis 'einwohnergewichtet', §5.2) = A1.1 (iii) per-1k row; counted once (N7) |
| thesis-era | H1c | sensitivity | Spearman(OA domain Sports and Recreation, status), zero-filled OA, no base rule, full frame (R1 fidelity, N6) | 0.175 [0.081, 0.273] | 436 | CONTRADICTED | R1/N6 fidelity check vs thesis PLR OA rho +0.10 (Tabellen 6-12..6-14); a gap is a pipeline divergence, not a finding |
| thesis-era | H1c | secondary | Spearman(OA domain Sports and Recreation, published status class), min-base flag dropped | 0.108 [0.011, 0.201] | 432 | CONTRADICTED | published-class version (§5.2) |
| thesis-era | H1c | sensitivity | Spearman(Sport category without table tennis (organised/commercial facilities, closer to Powell et al.; D3b), status); types removed from numerator and parent: Table Tennis | – (not reported: NO DATA) | 20 | NO DATA |  |
| thesis-era | H1b | sensitivity | Fast Food without döner/kebab types (anti-stigmatisation check, R3) | – (not reported: NO DATA) | 0 | NO DATA | not testable: the taxonomy carries no matching type at this snapshot (Fast Food types: Other Fast Food) |
| thesis-era | H2 | secondary | domain-level OA at window start => binary Dynamik | 0.621 [0.580, 0.661] | 1307 | SUPPORTED | definition break: D_2017 window (Dec 2014-Dec 2016) crosses the 2016 SGB II statistics revision (S3/S4 recalculated, MSS 2023 history table p. 13; D3 r = 0.981, D4 r = 0.917 vs level difference); definition break: D_2019 window (Dec 2016-Dec 2018) crosses the MSS 2019 S1 redefinition (SGB III removed; recomputed back to 2016 by the publisher, MSS 2019 p. 16; D1 r = 0.953); a null here reads 'not detected at domain resolution'; n_pos=687 |
| thesis-era | H2 | sensitivity | category OA + one base indicator per domain (A1.1 (i)) | 0.623 [0.582, 0.662] | 1307 | SUPPORTED | definition break: D_2017 window (Dec 2014-Dec 2016) crosses the 2016 SGB II statistics revision (S3/S4 recalculated, MSS 2023 history table p. 13; D3 r = 0.981, D4 r = 0.917 vs level difference); definition break: D_2019 window (Dec 2016-Dec 2018) crosses the MSS 2019 S1 redefinition (SGB III removed; recomputed back to 2016 by the publisher, MSS 2019 p. 16; D1 r = 0.953); n_pos=687 |
| thesis-era | H2 | sensitivity | category OA, complete-case in the four commercial domains (A1.1 (ii)) | 0.576 [0.448, 0.702] | 90 | NOT SIGNIFICANT | definition break: D_2017 window (Dec 2014-Dec 2016) crosses the 2016 SGB II statistics revision (S3/S4 recalculated, MSS 2023 history table p. 13; D3 r = 0.981, D4 r = 0.917 vs level difference); definition break: D_2019 window (Dec 2016-Dec 2018) crosses the MSS 2019 S1 redefinition (SGB III removed; recomputed back to 2016 by the publisher, MSS 2019 p. 16; D1 r = 0.953); n_pos=34 |
| thesis-era | H2 | secondary | H2 incremental: delta AUC of (status level at window start + category OA) over status level alone | -0.018 [-0.035, -0.003] | 1307 | CONTRADICTED | definition break: D_2017 window (Dec 2014-Dec 2016) crosses the 2016 SGB II statistics revision (S3/S4 recalculated, MSS 2023 history table p. 13; D3 r = 0.981, D4 r = 0.917 vs level difference); definition break: D_2019 window (Dec 2016-Dec 2018) crosses the MSS 2019 S1 redefinition (SGB III removed; recomputed back to 2016 by the publisher, MSS 2019 p. 16; D1 r = 0.953); adding OA significantly lowers out-of-fold AUC once status level is included |
| thesis-era | H2 | exploratory | directional continuity: Spearman(OA basket of 4 commercial domains at window start, status change over the window) | -0.208 [-0.278, -0.132] | 1280 | SUPPORTED | definition break: D_2017 window (Dec 2014-Dec 2016) crosses the 2016 SGB II statistics revision (S3/S4 recalculated, MSS 2023 history table p. 13; D3 r = 0.981, D4 r = 0.917 vs level difference); definition break: D_2019 window (Dec 2016-Dec 2018) crosses the MSS 2019 S1 redefinition (SGB III removed; recomputed back to 2016 by the publisher, MSS 2019 p. 16; D1 r = 0.953) |
| thesis-era | H2 | secondary | category OA => published Dynamik class negativ (3) vs rest | 0.560 [0.512, 0.610] | 1307 | SUPPORTED | definition break: D_2017 window (Dec 2014-Dec 2016) crosses the 2016 SGB II statistics revision (S3/S4 recalculated, MSS 2023 history table p. 13; D3 r = 0.981, D4 r = 0.917 vs level difference); definition break: D_2019 window (Dec 2016-Dec 2018) crosses the MSS 2019 S1 redefinition (SGB III removed; recomputed back to 2016 by the publisher, MSS 2019 p. 16; D1 r = 0.953); published-class version (§5.2); n_pos=118 |
| thesis-era | H2 | secondary | category OA => published Dynamik class negativ vs rest, class windows 2011-2019 (incl. the class-only 2013 edition, #338) | 0.566 [0.526, 0.610] | 1741 | SUPPORTED | published-class version (§5.2, §6.4); n_pos=168 |
| thesis-era | H3a | sensitivity | H3a with the alternative level control (window_start) | -0.025 [-0.093, 0.043] | 864 | NOT SIGNIFICANT | definition break: D_2017 window (Dec 2014-Dec 2016) crosses the 2016 SGB II statistics revision (S3/S4 recalculated, MSS 2023 history table p. 13; D3 r = 0.981, D4 r = 0.917 vs level difference); definition break: D_2019 window (Dec 2016-Dec 2018) crosses the MSS 2019 S1 redefinition (SGB III removed; recomputed back to 2016 by the publisher, MSS 2019 p. 16; D1 r = 0.953) |
| thesis-era | H3a | sensitivity | H3a primary controls + D4 | -0.021 [-0.088, 0.047] | 864 | NOT SIGNIFICANT | D4 at pivot-1 (EWR composite); definition break: D_2017 window (Dec 2014-Dec 2016) crosses the 2016 SGB II statistics revision (S3/S4 recalculated, MSS 2023 history table p. 13; D3 r = 0.981, D4 r = 0.917 vs level difference); definition break: D_2019 window (Dec 2016-Dec 2018) crosses the MSS 2019 S1 redefinition (SGB III removed; recomputed back to 2016 by the publisher, MSS 2019 p. 16; D1 r = 0.953) |
| thesis-era | H3a | sensitivity | H3a at pivot 2015 only | -0.011 [-0.108, 0.087] | 429 | NOT SIGNIFICANT | definition break: D_2017 window (Dec 2014-Dec 2016) crosses the 2016 SGB II statistics revision (S3/S4 recalculated, MSS 2023 history table p. 13; D3 r = 0.981, D4 r = 0.917 vs level difference) |
| thesis-era | H3a | sensitivity | H3a at pivot 2017 only | -0.041 [-0.129, 0.055] | 435 | NOT SIGNIFICANT | definition break: D_2017 window (Dec 2014-Dec 2016) crosses the 2016 SGB II statistics revision (S3/S4 recalculated, MSS 2023 history table p. 13; D3 r = 0.981, D4 r = 0.917 vs level difference); definition break: D_2019 window (Dec 2016-Dec 2018) crosses the MSS 2019 S1 redefinition (SGB III removed; recomputed back to 2016 by the publisher, MSS 2019 p. 16; D1 r = 0.953) |
| thesis-era | H3a | sensitivity | pivot difference: rho(pivot 2017) - rho(pivot 2015) (§3.4) | -0.030 [-0.151, 0.096] | 864 | descriptive | no detectable pivot heterogeneity (CI includes 0) |
| thesis-era | H3a | exploratory | H3a level-stratified: high status at window start | -0.044 [-0.224, 0.124] | 153 | NOT SIGNIFICANT | high = S_start at/below the published 'hoch' share quantile (2015: 17.9%, 2017: 17.2%; N1) |
| thesis-era | H3a | exploratory | H3a level-stratified: low/mid status at window start | -0.017 [-0.091, 0.059] | 711 | NOT SIGNIFICANT | high = S_start at/below the published 'hoch' share quantile (2015: 17.9%, 2017: 17.2%; N1) |
| thesis-era | H3a | secondary | H3a with total-share growth of all POIs (continuity with E1/E5) | -0.002 [-0.073, 0.071] | 871 | NOT SIGNIFICANT | definition break: D_2017 window (Dec 2014-Dec 2016) crosses the 2016 SGB II statistics revision (S3/S4 recalculated, MSS 2023 history table p. 13; D3 r = 0.981, D4 r = 0.917 vs level difference); definition break: D_2019 window (Dec 2016-Dec 2018) crosses the MSS 2019 S1 redefinition (SGB III removed; recomputed back to 2016 by the publisher, MSS 2019 p. 16; D1 r = 0.953) |
| thesis-era | H3a | secondary | H3a with OA-basket change (mean OA of the 4 commercial domains) | 0.001 [-0.066, 0.069] | 848 | NOT SIGNIFICANT | definition break: D_2017 window (Dec 2014-Dec 2016) crosses the 2016 SGB II statistics revision (S3/S4 recalculated, MSS 2023 history table p. 13; D3 r = 0.981, D4 r = 0.917 vs level difference); definition break: D_2019 window (Dec 2016-Dec 2018) crosses the MSS 2019 S1 redefinition (SGB III removed; recomputed back to 2016 by the publisher, MSS 2019 p. 16; D1 r = 0.953) |
| thesis-era | H3a | exploratory | H3a with café-growth cross-lag, g(café C5 share) (R4) | -0.024 [-0.102, 0.056] | 607 | NOT SIGNIFICANT | definition break: D_2017 window (Dec 2014-Dec 2016) crosses the 2016 SGB II statistics revision (S3/S4 recalculated, MSS 2023 history table p. 13; D3 r = 0.981, D4 r = 0.917 vs level difference); definition break: D_2019 window (Dec 2016-Dec 2018) crosses the MSS 2019 S1 redefinition (SGB III removed; recomputed back to 2016 by the publisher, MSS 2019 p. 16; D1 r = 0.953) |
| thesis-era | H3a | secondary | H3a on published Dynamik/status classes | 0.012 [-0.049, 0.072] | 1290 | NOT SIGNIFICANT | published-class version (§5.2); rows without a class at the control date drop; definition break: D_2017 window (Dec 2014-Dec 2016) crosses the 2016 SGB II statistics revision (S3/S4 recalculated, MSS 2023 history table p. 13; D3 r = 0.981, D4 r = 0.917 vs level difference); definition break: D_2019 window (Dec 2016-Dec 2018) crosses the MSS 2019 S1 redefinition (SGB III removed; recomputed back to 2016 by the publisher, MSS 2019 p. 16; D1 r = 0.953) |
| thesis-era | H3b | sensitivity | H3b with the alternative level control (pivot) | 0.047 [-0.025, 0.116] | 864 | NOT SIGNIFICANT | definition break: D_2017 window (Dec 2014-Dec 2016) crosses the 2016 SGB II statistics revision (S3/S4 recalculated, MSS 2023 history table p. 13; D3 r = 0.981, D4 r = 0.917 vs level difference); definition break: D_2019 window (Dec 2016-Dec 2018) crosses the MSS 2019 S1 redefinition (SGB III removed; recomputed back to 2016 by the publisher, MSS 2019 p. 16; D1 r = 0.953) |
| thesis-era | H3b | sensitivity | H3b primary controls + D4 | 0.058 [-0.012, 0.126] | 864 | NOT SIGNIFICANT | D4 at pivot-1 (EWR composite); definition break: D_2017 window (Dec 2014-Dec 2016) crosses the 2016 SGB II statistics revision (S3/S4 recalculated, MSS 2023 history table p. 13; D3 r = 0.981, D4 r = 0.917 vs level difference); definition break: D_2019 window (Dec 2016-Dec 2018) crosses the MSS 2019 S1 redefinition (SGB III removed; recomputed back to 2016 by the publisher, MSS 2019 p. 16; D1 r = 0.953) |
| thesis-era | H3b | sensitivity | H3b at pivot 2015 only | 0.047 [-0.058, 0.157] | 429 | NOT SIGNIFICANT | definition break: D_2017 window (Dec 2014-Dec 2016) crosses the 2016 SGB II statistics revision (S3/S4 recalculated, MSS 2023 history table p. 13; D3 r = 0.981, D4 r = 0.917 vs level difference) |
| thesis-era | H3b | sensitivity | H3b at pivot 2017 only | 0.058 [-0.049, 0.153] | 435 | NOT SIGNIFICANT | definition break: D_2017 window (Dec 2014-Dec 2016) crosses the 2016 SGB II statistics revision (S3/S4 recalculated, MSS 2023 history table p. 13; D3 r = 0.981, D4 r = 0.917 vs level difference); definition break: D_2019 window (Dec 2016-Dec 2018) crosses the MSS 2019 S1 redefinition (SGB III removed; recomputed back to 2016 by the publisher, MSS 2019 p. 16; D1 r = 0.953) |
| thesis-era | H3b | sensitivity | pivot difference: rho(pivot 2017) - rho(pivot 2015) (§3.4) | 0.011 [-0.144, 0.150] | 864 | descriptive | no detectable pivot heterogeneity (CI includes 0) |
| thesis-era | H3b | exploratory | H3b level-stratified: high status at window start | 0.091 [-0.082, 0.255] | 153 | NOT SIGNIFICANT | high = S_start at/below the published 'hoch' share quantile (2015: 17.9%, 2017: 17.2%; N1) |
| thesis-era | H3b | exploratory | H3b level-stratified: low/mid status at window start | 0.058 [-0.018, 0.137] | 711 | NOT SIGNIFICANT | high = S_start at/below the published 'hoch' share quantile (2015: 17.9%, 2017: 17.2%; N1) |
| thesis-era | H3b | secondary | H3b with total-share growth of all POIs (continuity with E1/E5) | -0.055 [-0.113, 0.007] | 871 | NOT SIGNIFICANT | definition break: D_2017 window (Dec 2014-Dec 2016) crosses the 2016 SGB II statistics revision (S3/S4 recalculated, MSS 2023 history table p. 13; D3 r = 0.981, D4 r = 0.917 vs level difference); definition break: D_2019 window (Dec 2016-Dec 2018) crosses the MSS 2019 S1 redefinition (SGB III removed; recomputed back to 2016 by the publisher, MSS 2019 p. 16; D1 r = 0.953) |
| thesis-era | H3b | secondary | H3b with OA-basket change (mean OA of the 4 commercial domains) | 0.058 [-0.016, 0.134] | 848 | NOT SIGNIFICANT | definition break: D_2017 window (Dec 2014-Dec 2016) crosses the 2016 SGB II statistics revision (S3/S4 recalculated, MSS 2023 history table p. 13; D3 r = 0.981, D4 r = 0.917 vs level difference); definition break: D_2019 window (Dec 2016-Dec 2018) crosses the MSS 2019 S1 redefinition (SGB III removed; recomputed back to 2016 by the publisher, MSS 2019 p. 16; D1 r = 0.953) |
| thesis-era | H3b | exploratory | H3b with café-growth cross-lag, g(café C5 share) (R4) | 0.017 [-0.070, 0.100] | 597 | NOT SIGNIFICANT | definition break: D_2017 window (Dec 2014-Dec 2016) crosses the 2016 SGB II statistics revision (S3/S4 recalculated, MSS 2023 history table p. 13; D3 r = 0.981, D4 r = 0.917 vs level difference); definition break: D_2019 window (Dec 2016-Dec 2018) crosses the MSS 2019 S1 redefinition (SGB III removed; recomputed back to 2016 by the publisher, MSS 2019 p. 16; D1 r = 0.953) |
| thesis-era | H3b | secondary | H3b on published Dynamik/status classes | 0.096 [0.023, 0.171] | 862 | CONTRADICTED | published-class version (§5.2); rows without a class at the control date drop; definition break: D_2017 window (Dec 2014-Dec 2016) crosses the 2016 SGB II statistics revision (S3/S4 recalculated, MSS 2023 history table p. 13; D3 r = 0.981, D4 r = 0.917 vs level difference); definition break: D_2019 window (Dec 2016-Dec 2018) crosses the MSS 2019 S1 redefinition (SGB III removed; recomputed back to 2016 by the publisher, MSS 2019 p. 16; D1 r = 0.953) |
| thesis-era | H3c | secondary | H3c with total-share growth | -0.033 [-0.093, 0.032] | 1307 | NOT SIGNIFICANT | definition break: D_2017 window (Dec 2014-Dec 2016) crosses the 2016 SGB II statistics revision (S3/S4 recalculated, MSS 2023 history table p. 13; D3 r = 0.981, D4 r = 0.917 vs level difference); definition break: D_2019 window (Dec 2016-Dec 2018) crosses the MSS 2019 S1 redefinition (SGB III removed; recomputed back to 2016 by the publisher, MSS 2019 p. 16; D1 r = 0.953) |
| thesis-era | H3c | secondary | H3c with OA-basket change | -0.014 [-0.065, 0.041] | 1280 | NOT SIGNIFICANT | definition break: D_2017 window (Dec 2014-Dec 2016) crosses the 2016 SGB II statistics revision (S3/S4 recalculated, MSS 2023 history table p. 13; D3 r = 0.981, D4 r = 0.917 vs level difference); definition break: D_2019 window (Dec 2016-Dec 2018) crosses the MSS 2019 S1 redefinition (SGB III removed; recomputed back to 2016 by the publisher, MSS 2019 p. 16; D1 r = 0.953) |
| thesis-era | H3c | sensitivity | H3c window 2013-2015 only | -0.019 [-0.110, 0.079] | 429 | NOT SIGNIFICANT |  |
| thesis-era | H3c | sensitivity | H3c window 2015-2017 only | -0.069 [-0.175, 0.041] | 435 | NOT SIGNIFICANT | definition break: D_2017 window (Dec 2014-Dec 2016) crosses the 2016 SGB II statistics revision (S3/S4 recalculated, MSS 2023 history table p. 13; D3 r = 0.981, D4 r = 0.917 vs level difference) |
| thesis-era | H3c | sensitivity | H3c window 2017-2019 only | -0.039 [-0.133, 0.060] | 435 | NOT SIGNIFICANT | definition break: D_2019 window (Dec 2016-Dec 2018) crosses the MSS 2019 S1 redefinition (SGB III removed; recomputed back to 2016 by the publisher, MSS 2019 p. 16; D1 r = 0.953) |
| thesis-era | H3c | secondary | H3c on published Dynamik class | -0.047 [-0.096, 0.002] | 1725 | NOT SIGNIFICANT | published-class version (§5.2); definition break: D_2017 window (Dec 2014-Dec 2016) crosses the 2016 SGB II statistics revision (S3/S4 recalculated, MSS 2023 history table p. 13; D3 r = 0.981, D4 r = 0.917 vs level difference); definition break: D_2019 window (Dec 2016-Dec 2018) crosses the MSS 2019 S1 redefinition (SGB III removed; recomputed back to 2016 by the publisher, MSS 2019 p. 16; D1 r = 0.953) |

**Exploratory-row tally (§5.5).** 90 non-primary rows carry a verdict across both Berlin panels (descriptive and NO DATA rows excluded; the population-weighted row counts once per H1a–c, N7). At α = 0.05 about 4.5 would be expected significant by chance alone.

## 9. Comparability (binding text)

**Thesis era vs 2019–2025.** The two Berlin panels are not like-for-like either: they use
different LOR vintages (pre-2021 vs 2021, so no PLR is followed across the seam, index-definition
§2.5), different status measures for the H1 family (the thesis's own MSS 2016 status index vs the
S1+S3+S4 composite of 2025), different indicator definitions (the definition breaks listed below)
and different OSM completeness. The thesis-era panel contains the thesis's own editions, so it is
**not an independent replication** (§6.5); it shows what current methods give on the thesis's data.
A difference between the two columns is a difference between eras *and* methods, not a measured
change in Berlin.

**Berlin vs Hamburg** (pre-registration §4.5, binding text, for any cross-city reading). Hamburg and
Berlin verdicts are **not like-for-like**: (1) the monitor construction differs: Hamburg's seven
indicators include migration background and school leaving; (2) the change window differs (3 vs 2
years); (3) the status measure differs (Hamburg classes vs Berlin continuous composites); (4) the
grain differs (Gebiet ≈ 2,200 residents vs PLR ≈ 7,000); (5) the era differs (`HH/full` 2013–2025 vs
Berlin modern 2019–2025; `HH/modern` is the era-matched comparison). A diverging verdict is not
evidence that the cities' processes differ, **and a matching verdict is not evidence that they are
the same**: with different constructs, agreement can be coincidental.

## 10. What the suite must not claim (binding text, §9)

What these results must not be used to claim (pre-registration §9, binding):

- **No "pressure" wording for Dynamik in either direction (#358).** Dynamik is the "improving /
  worsening official measure of disadvantage". Negative Dynamik is filtering, at most a rent-gap
  precondition (Smith 1979).
- **Status improvement ≠ gentrification.** Measured disadvantage can fall through in-situ labour-market
  gains, children ageing out of child poverty, new-build in-movers, the closure or relocation of
  refugee accommodation, or benefit-rule changes, as well as through compositional upgrading. Public
  text calls the outcome "change in officially measured disadvantage".
- No causal or displacement language. Status-first means that a fall in measured disadvantage precedes
  commercial change, not that anyone was displaced.
- **H3a and H3b are not mutually exclusive.** Both SUPPORTED reads as co-evolution, consistent with
  Dangschat.
- **H3c SUPPORTED means co-movement within one window.** It cannot by itself establish simultaneity and
  is read together with H3a/H3b.
- **H1 public wording** is "the local mix of shops, services and public facilities", unless the
  commercial-only H1 row also holds; only then may it say "businesses".
- Fast-food findings are phrased at area level. H1b is a deprivation hypothesis (Pearce et al. 2007
  is a New Zealand study of fast-food access and deprivation), not a displacement one.
- The thesis's AUCs are not set against suite AUCs (§1.2).
- Hamburg verdicts are transfer tests, not replications (§4.4–4.5).

## 11. Limitations

- **#337 node→way:** every row is POI-based; OSM features mapped as ways are not yet counted as points. Deferred; disclosed for all rows.
- **OSM completeness** grew over both eras; C5 shares and OA are ratio measures robust to city-wide growth (index-definition §2.4), not to spatially uneven mapping diffusion.
- **Refugee accommodation:** no open small-area source; disclosed, not corrected (§3.4).
- **EWR panel (#340 part 2, #341)** is out of scope; E1 §4 remains.

## 12. Deviations from the pre-registration

Dated 2026-10-31/2026-11-01. Items 1-11 were fixed in code before any suite statistic was computed. Items 12-15 record consequences first seen in a low-B smoke run (an untestable or thin sensitivity row, a delta-AUC case the mapping does not spell out); none changed a rule after results were seen. None changes a hypothesis, variable, expected sign, family or verdict rule.

1. **Min-base rule (ADR-0017) as a thesis deviation (N8).** The thesis computed its OA correlations on all PLRs with no minimum base. The suite drops H1a–c rows whose parent base is < 10 POIs and sets flagged cells missing in H1/H2 (Amendment 1 A1.1). This is a measurement-validity improvement, not a construct change. The R1 fidelity check uses the unbased N6 rows.
2. **N3 applied (domain re-check 2026-10-28).** For the AUC-based H1 the §5.6 ✓ rule "SUPPORTED and at least 'small'" is read as "at least 'poor' (AUC ≥ 0.60)", as for H2; otherwise an AUC row has no defined threshold.
3. **N4 applied.** An H3a primary that is NOT SIGNIFICANT after BH with unadjusted p < 0.05 carries "nominally significant" in `notes`; the "consistent (rejected)" label stays.
4. **N1 applied.** The Berlin level-stratified H3a/H3b rows (exploratory) define "high status" as S at the window start at or below the quantile matching the published "hoch" share of the pivot's edition, instead of S < 0.
5. **N2 applied as wording.** "PLRs split in 2021 over-represent growth and new-build areas" (§3.3(1)) is treated as an expectation, not a checked fact; the decision to use native LOR-2021 counts does not depend on it.
6. **N7 applied.** The population-weighted stock row (§5.2) and the A1.1 (iii) per-1k row are one row per H1a–c (H1c kept), counted once in the exploratory tally.
7. **Fixed feature lists per design frame.** A1.1's "per-city/per-panel" ≥ 20% rule is evaluated on each design's own included rows (H1 cross-section; H2 pooled area-windows; BZR rows for R7), because the H1 and H2 frames are different snapshots. The rule still uses flags only, never the outcome; the lists are printed in §6 and were written to the metadata JSON before any fit.
8. **Coefficients without a full-sample fit.** The top-10 standardised coefficients (§1.2) are the mean over the five training-fold fits, so no model is ever fitted on the full sample (§5.8(4)).
9. **H3 DHS growth undefined at 0/0.** g(a, b) is undefined when both endpoints are zero (an area with no commercial POI at both dates); those area-windows drop from the H3 rows. One zero endpoint is handled as pre-registered (§5.1).
10. **`THESIS_HYPOTHESES` (§6.2).** H1a and H1c were added and the non-directional (H1, H2) and ordering (H3a, H3b) forms recorded in new fields (`form`, `suite_expected_dir`). E1's own `expected_dir` keys are left unchanged so that E1's published output does not move; the suite reads only the new fields.
11. **Not implemented: Moran's I on H3 residuals** (§8, a non-gating diagnostic). Left for a follow-up; it cannot change any verdict.
12. **H1c without table tennis (D3b): operationalisation and consequence.** Table tennis is removed from both the Sport numerator and the Sports-and-Recreation parent, and the ADR-0017 base rule (parent >= 10) is applied to the reduced parent. Few PLRs reach ten non-table-tennis sport/recreation POIs, so the row has fewer than 20 clusters and is NO DATA in both panels (§5.3). The rule was fixed before the row was computed and is not relaxed after seeing its n.
13. **H1b without döner/kebab (R3): not testable.** The taxonomy carries only one Fast Food type ('Other Fast Food') at the H1 snapshots, so no kebab type can be removed; the row is reported as NO DATA with that reason (§5.2: "if the taxonomy carries it").
14. **H2 incremental with a wholly negative delta-AUC CI: pending explicit ratification by geo-DS + domain (post-results clarification of §5.6).** §5.6 maps H2 to 'stronger than thesis' only when the delta-AUC CI excludes 0, and to 'explained by current status level' when it includes 0; it does not spell out a CI entirely below 0. The thesis-era delta AUC is such a case (the row is reported as CONTRADICTED: adding OA significantly lowers out-of-fold AUC once status level is included). The H2 'Holds?' label keeps 'consistent (still unclear): explained by current status level', on the reading that OA then adds nothing beyond status level and 'stronger than thesis' needs a CI entirely above 0. **This reading was settled after seeing the low-B smoke run**, so it is not pre-registered; the gate reviewers decide whether to ratify it.
15. **Hamburg panels not reported here.** The code supports `--city HH` (`HH/full`, `HH/modern`, phase-shift chains); Hamburg results and findings are #355's.

