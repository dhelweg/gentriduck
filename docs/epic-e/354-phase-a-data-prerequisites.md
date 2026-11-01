# #354/#355 Phase A: data prerequisites for the thesis hypothesis suite

- **Author:** data-engineer
- **Date:** 2026-10-30
- **Branch:** `feat/354-berlin-modern-era`
- **Binding spec:** `docs/methodology/354-355-hypothesis-suite-preregistration.md` (rev. 2) §2, §2.1
  items 2–6, §4.3, §5.1, §10.2. Item 1 (#360) is already integrated.
- **Scope:** data prerequisites only. The suite script (`analysis/thesis_hypothesis_suite.py`) is
  phase B and is not part of this change.
- **Fetched content (SEC-3):** all web content below came from listed hosts
  (`geodienste.hamburg.de`, `suche.transparenz.hamburg.de` and its download host
  `daten.transparenz.hamburg.de`, see `docs/method/egress-hosts.md`). It was parsed as data only.
  Nothing was ingested into the warehouse except the 70-row reference seed in §4.

## 0. Answers at a glance

| Item | Answer |
|---|---|
| 2. Native `lor_2021` POI counts + OA, 2019/2020 | **Built.** Point-in-polygon on the existing OSM snapshots. Integer counts, all 13 domains and all categories and types, both OA weight variants. The suite reads them through the new native panels (§1). They reconcile with the crosswalk at city level to within 0.3 POI (§2). |
| 3. Hamburg reference date | **Confirmed: edition E = data as of 31 Dec (E−1)**, for every edition with a published report (2016–2025). Stated in the `stg_hamburg_sozialmonitoring` and `int_hamburg_sozialmonitoring_index` headers (§3). |
| 4. Hamburg Dynamik ordering | **Reconciled.** Per-Gebiet agreement with the published report annexes is 100% for status, Dynamik and population, 2016–2025. The published index sums order the classes exactly as the warehouse codes them. Two dbt tests guard it (§4). |
| 5. Hamburg indicator values | **The open data carry them, but not in the source we ingest.** The WFS has classes only. The open report annex (XLSX, dl-de/by-2.0) carries all seven status indicators S1–S7 and six Dynamik indicators D1–D6 per Gebiet, 2016–2025, as z-scores plus the city mean and SD (§5). |
| 6. OA zero-fill | **Cause found and rule implemented.** E1's n = 341 of 436 is presence-conditioning: the sparse OA table has no Fast Food row where a PLR has no fast-food POI. `int_poi_oa_native_panel` zero-fills by the §5.1 rule, with exclusion by the min-base flag only. A test guards it (§6). |
| Published marts | **Unchanged** versus the develop baseline (§7). |

---

## 1. What was built (item 2)

### 1.1 Models

| Model | Kind | What it is |
|---|---|---|
| `int_berlin_osm_poi_plr2021_backcast` | table | POI-level re-assignment of snapshots 2019/2020 to LOR-2021 PLRs. It uses the same POIs, taxonomy and join method as `int_osm_poi_plr`: `ST_Within` in EPSG:25833 with the C3-dedup tie-break. The years come from var `berlin_lor2021_backcast_years` (default `[2019, 2020]`). The pre-2021 PLR is kept as `area_code_pre2021`. |
| `int_berlin_poi_development_plr2021_backcast` | table | Back-cast counts with exactly the columns and grain of `fct_poi_development`. |
| `int_berlin_osm_poi_plr2021_backcast_weighted` | table | Gaussian-kernel counts from the **shared** `berlin_poi_kernel_weighted_counts()` macro. Same bandwidth var and same leakage guard as `int_osm_poi_plr_weighted`. |
| `int_berlin_poi_offering_advantage_plr2021_backcast` | table | OA with exactly the shape of `int_poi_offering_advantage`, from the **shared** `offering_advantage_lq()` macro. |
| `int_poi_development_native` | view | Every row is point-in-polygon on its own vintage. It holds all `fct_poi_development` rows (`contemporaneous`) plus the back-cast (`backcast`), with a `geometry_pairing` column. |
| `int_poi_offering_advantage_native` | view | The same union for OA (leaf grain, sparse), with canonical `city_code`. |
| `int_poi_oa_native_panel` | table | **The suite's OA input.** Dense, zero-filled domain- and category-level OA (§6). |
| `int_poi_c5_share_native` | table | Dense C5 shares: `total_c5_share` and the pre-registered commercial share `commercial_c5_share` (c_E, §5.1; var `poi_commercial_domains`). |

**Reuse, not forks.** The OA location-quotient SQL and the kernel SQL were moved **verbatim** out of
`int_poi_offering_advantage` and `int_osm_poi_plr_weighted` into two macros:
`transform/macros/offering_advantage_lq.sql` and `berlin_poi_kernel_weighted_counts.sql`. The
existing models and the back-cast models now call the same SQL. A token-level comparison
(comments excluded) shows that each macro body is identical to the original model body apart from
the documented substitutions: the base relation, the POI/LOR relations and the vintage predicate.
This is the only edit to existing methodology-bearing models, and it does not change their output
(§7).

**Panel use.** Berlin 2019 and 2020 now exist on **both** vintages (`lor_pre2021` contemporaneous,
`lor_2021` back-cast), and `area_vintage` is part of every grain. The suite selects one vintage per
panel: `BER/modern` → `lor_2021` (2019–2025), `BER/thesis-era` → `lor_pre2021`, `HH` → `current`.
That keeps the §5.8(5) guard (no delta across a LOR boundary) satisfiable row by row.

### 1.2 2019/2020 coverage

| | 2019 | 2020 |
|---|---:|---:|
| Berlin POIs in the snapshot (`int_osm_poi_plr`) | 81,154 | 87,767 |
| … inside a LOR-2021 PLR (native back-cast) | 73,415 | 79,356 |
| … inside a pre-2021 PLR (existing) | 73,416 | 79,357 |
| POIs inside a pre-2021 PLR but outside every LOR-2021 PLR | 1 | 1 |
| POIs inside a LOR-2021 PLR but outside every pre-2021 PLR | 0 | 0 |
| LOR-2021 PLRs with ≥ 1 POI (of 542) | 541 | 541 |
| Domains / categories present | 13 / 46 | 13 / 46 |
| Commercial-basket POIs (Gastronomy, Retail, Services, Entertainment) | 22,628 | 23,464 |
| OA leaf rows, `standard` / `gaussian_500m` | 17,302 / 19,961 | 17,812 / 20,532 |

The one PLR without POIs, `06200418`, has none in any snapshot 2019–2026 on `lor_2021` either. It
drops out of every panel by the index-definition §7 rule 4 (D3 guard), as before.

For `BER/modern`, `int_poi_oa_native_panel` therefore holds 541 PLRs × 8 snapshots (2019–2026) ×
(13 domains + 48 domain–category pairs), per weight variant, with no null `oa_value`. The panel
also covers `BER` `lor_pre2021` 2008–2020 (448 PLRs, for `BER/thesis-era`) and `HH` `current`
2008–2026 (942 Gebiete), each densified separately.

## 2. Native vs crosswalk reconciliation (item 2, dbt test)

The crosswalk series replaced for the suite is `int_poi_share_base_2021`: `lor_pre2021` counts ×
`seed_lor_crosswalk_2006_to_2021.weight`, where the weight is intersection_area / pre-2021 area.

**City totals.**

| | 2019 | 2020 |
|---|---:|---:|
| Native back-cast (inside LOR-2021 polygons) | 73,415 | 79,356 |
| Crosswalk-reallocated | 73,415.27 | 79,356.24 |
| Pre-2021 hard total | 73,416 | 79,357 |
| Native − crosswalk | −0.27 | −0.24 |

The difference has two parts.
1. **Weight leakage.** The forward weights sum to 1.000 for 446 of 448 pre-2021 PLRs and to 0.999
   for 2, so the crosswalk total is the pre-2021 total minus about 0.7 POI.
2. **Extent.** One POI per year lies inside the outer extent of the pre-2021 PLRs and outside
   every LOR-2021 polygon.

**Per PLR**, grouped by what the 2021 reform did to the PLR:

| Year | PLR class | PLRs | Native | Crosswalk | Σ\|diff\| | Median \|diff\| | Max \|diff\| | Pearson r |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| 2019 | unchanged (≥ 99% shared, one source) | 287 | 38,625 | 38,638.7 | 161.1 | 0.06 | 8.0 | 0.9999 |
| 2019 | split out of a larger pre-2021 PLR | 194 | 25,620 | 25,511.6 | 6,843.5 | 25.1 | 180.1 | 0.836 |
| 2019 | merged / re-cut | 61 | 9,170 | 9,265.0 | 992.6 | 4.3 | 84.4 | 0.978 |
| 2020 | unchanged | 287 | 41,680 | 41,697.8 | 181.1 | 0.07 | 8.0 | 0.9999 |
| 2020 | split | 194 | 27,634 | 27,543.4 | 7,333.3 | 26.7 | 194.7 | 0.841 |
| 2020 | merged / re-cut | 61 | 10,042 | 10,115.0 | 1,061.6 | 6.1 | 87.1 | 0.980 |

All 542 PLRs: Pearson r = 0.958 (2019) and 0.960 (2020). The crosswalk moves 10.9% and 10.8% of
the POI mass to a different PLR than point-in-polygon does.

**Why the difference is expected.** For unchanged PLRs the two methods agree up to a few POIs on
re-digitised shared boundaries; the largest gap is 8 POIs, in `10300734` and `10400837`. In split
PLRs the areal crosswalk spreads a pre-2021 PLR's POIs in proportion to area. That assumes uniform
POI density inside the old PLR, while point-in-polygon puts each POI where it is. Split PLRs are the
ones the domain review (M2) flags as growth and new-build areas. They are exactly where the
crosswalk is least credible, and the reason the maintainer approved native counts (§10.2).

**Test** `test_354_backcast_native_vs_crosswalk_reconciliation` (severity error) checks four things:
- (a) the back-cast re-assigns exactly the POIs of `int_osm_poi_plr`, with none lost or duplicated;
- (b) city totals agree within 0.1%;
- (c1) each unchanged PLR is within 10 POIs;
- (c2) the unchanged PLRs together are within 1%.

Split and re-cut PLRs are not tested as errors, because their difference is the point of the change.

**Weighted variant.** `test_354_backcast_oa_weighted_mass_conservation` checks the exact mass
identity per year and domain:

weighted total = hard total + POIs outside every polygon but within the bandwidth.

In 2019 that is 73,456 = 73,415 + 41 (see open issue O1).

## 3. Hamburg reference date (item 3)

**Edition E carries data as of 31 Dec (E−1).** Evidence from the source metadata:

| Source | Finding |
|---|---|
| Transparenzportal CKAN records "Sozialmonitoring(-)Bericht E" and "… Bericht E – Anhang", E = 2016–2025 | `temporal_coverage_from` = **(E−1)-12-31** for every one of the 20 records. Example: Bericht 2025 → 2024-12-31; Bericht 2016 → 2015-12-31. |
| Annex records 2018, 2019, 2020 (`notes`) | "Stand der Daten: 31.12.2017" / "31.12.2018" / "31.12.2019". |
| Annex sheet I, population column header | "Bevölkerung 31.12.(E−1)" in all ten editions. The values equal the WFS `bevoelkerung` for **every** Gebiet in every edition, so WFS `jahr` = report edition E. |
| WFS `de.hh.up:sozialmonitoring` (`DescribeFeatureType`) | `jahr` = `berichtsjahr` = E. `jahr_timestamp` = E-01-01 is the report year, not the data date. |
| Annex sheet II, Dynamik labels | The window ends at E−1 and spans 3 years: "D4 Arbeitslose 2015-2012" (E = 2016), "2018-2015" (2019), "2018-2021" (2022), "2021-2024" (2025). |

**Consequence for the suite (pre-registration §4.3).**
- The Dynamik of edition E covers 31.12.(E−4) → 31.12.(E−1), i.e. OSM snapshots **[E−3, E]**. That
  confirms the pending mapping.
- Status class E is the state at 31.12.(E−1), paired with OSM snapshot E, the same pairing as Berlin
  (MSS edition E ↔ OSM snapshot E).

**Limit.** No report or annex is published for 2013–2015; the portal search returns none. For those
three editions the convention is assumed, not shown. It matters only for the `HH/full` H3b
start-of-window control at pivot 2016 (status class 2013).

## 4. Hamburg Dynamik ordering reconciliation (item 4, index-definition §3.4)

**Published reference.** The machine-readable annex of each report 2016–2025 (sheet I "Indizes",
one row per scored Gebiet with Statusindex, Dynamikindex and Gesamtindex). For 2018 the corrected
annex was used ("Anhang korrigiert"; its correction is in sheet II only).

**Class counts** (published annex = WFS = warehouse `int_hamburg_sozialmonitoring_index`):

| Edition | hoch | mittel | niedrig | sehr niedrig | positiv | stabil | negativ | Gebiete |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| 2016 | 156 | 542 | 67 | 82 | 79 | 683 | 85 | 847 |
| 2017 | 158 | 535 | 77 | 76 | 31 | 768 | 47 | 846 |
| 2018 | 151 | 542 | 79 | 76 | 22 | 786 | 40 | 848 |
| 2019 | 149 | 554 | 73 | 76 | 31 | 779 | 42 | 852 |
| 2020 | 141 | 565 | 72 | 72 | 37 | 774 | 39 | 850 |
| 2021 | 143 | 564 | 71 | 75 | 52 | 747 | 54 | 853 |
| 2022 | 159 | 547 | 70 | 77 | 61 | 733 | 59 | 853 |
| 2023 | 153 | 553 | 88 | 62 | 21 | 798 | 37 | 856 |
| 2024 | 161 | 547 | 84 | 65 | 25 | 794 | 38 | 857 |
| 2025 | 163 | 543 | 89 | 62 | 41 | 772 | 44 | 857 |

**Per-Gebiet agreement**, annex vs WFS: all 8,519 Gebiet-editions match on status class, Dynamik
class and population. The 2017 annex writes Dynamik as `+`/`0`/`-`; row by row these map to
positiv (31/31), stabil (768/768) and negativ (47/47).

**Label ↔ code (sign) check.** The annex sheet II gives each Gebiet's Status-summe (sum of the seven
standardised status indicators) and Dynamik-summe (sum of the six change indicators). Higher sums
mean more, or growing, disadvantage. In every edition the classes are separated by the sums in the
coded order:
- hoch < mittel < niedrig < sehr niedrig on Status-summe;
- positiv < stabil < negativ on Dynamik-summe.

For example, 2025: positiv ≤ −3.32, stabil −3.31…+3.31, negativ ≥ +3.79, matching the published
thresholds ±3.31. So **positiv = falling disadvantage = improvement = code 1**, and **hoch = least
disadvantage = code 1**, which is the mapping `int_hamburg_sozialmonitoring_index` uses (#40). The
uncorrected 2018 annex shows overlapping Dynamik-summe ranges; the corrected one separates cleanly.
That is consistent with the publisher's "Korrektur in Tabellenblatt II".

**dbt tests added.**
- `test_354_hh_sozialmonitoring_published_class_counts` (error). For each edition 2016–2025, the
  warehouse count per numeric code must equal the published count for the label that code must
  carry. The published counts are in the new reference seed
  `seed_hh_sozialmonitoring_published_class_counts`: 70 rows, counted from the annexes, with
  `expected_code`. A permuted mapping fails it.
- `test_354_hh_sozialmonitoring_label_code_consistency` (error). Row by row: gesamtindex label =
  "Status ⟨status⟩ - Dynamik ⟨+|0|-⟩", and label → code as above.

Editions 2013–2015 have no published annex. They are covered by the internal label/code test only.

## 5. Hamburg indicator values (item 5, binding check D8g)

**Answer: yes, the open Sozialmonitoring data carry the seven indicator values, but only in the
report annexes, not in the WFS the warehouse ingests.**

- **WFS** `de.hh.up:sozialmonitoring`: attributes are `jahr`, `jahr_timestamp`, `bevoelkerung`,
  `berichtsjahr`, `statgeb`, `stadtteil`, `statusindex`, `dynamikindex`, `gesamtindex` and `geom`.
  That is classes only.
- **Report annex XLSX**, sheet "II Indikatoren", editions 2016–2025, open data under dl-de/by-2.0
  (the report PDFs are CC0). One row per scored Gebiet with:
  - **S1** Kinder mit Migrationshintergrund;
  - **S2** Kinder von Alleinerziehenden;
  - **S3** SGB-II-(und AsylbLG-)Empfänger/-innen;
  - **S4** Arbeitslose;
  - **S5** Kinder (unter 15 Jahren) in Mindestsicherung;
  - **S6** Mindestsicherung im Alter;
  - **S7** Schulabschlüsse;
  - **D1–D6**, the 3-year change of S1–S6 (S7 has no Dynamik indicator);
  - Status-summe and Dynamik-summe.

  All 13 indicators are populated for every scored Gebiet in every edition, 847–857 Gebiete.
  - **Units.** Values are z-scores: each column has mean 0.00 and SD 1.00 over Gebiete, and
    Status-summe equals ΣS1…S7 within rounding for 857/857 Gebiete in 2025 and 847/847 in 2016.
    Each sheet also has the city mean and SD rows, so shares can be recovered as mean + z·SD.
  - **S7 caveat.** S7 is marked "bes. Gebietsausschluss" (special area exclusion); its SD is
    0.97–0.98 because excluded Gebiete appear to carry 0. A follow-up must confirm how exclusions
    are coded.
  - **Definition changes.** S3 adds AsylbLG recipients from 2019. S4 is labelled "Arbeitslose
    (SGB II)" in the 2019 and 2021 annexes. S7's school-leaving categories are renamed in 2019
    (MSA/ESA).
- **2013–2015:** no annex is published, so no indicator values are available for those editions.

**Implication.** The §4.4 domain-preferred labour-market and transfer core for a Hamburg secondary
is available for 2016–2025: SGB II S3, Arbeitslose S4, Kinder in Mindestsicherung S5, Mindestsicherung
im Alter S6. Using it needs:
- (a) a new ingestion of the annex artefact (same publisher and ADR-0014 Pillar 2 source family, but
  a new file type and endpoint, so check with the architect first, golden rule 2);
- (b) its own sign-off (§4.4).

Neither is in phase A scope. For the Hamburg findings, the sentence to record is: *"The open
Sozialmonitoring report annexes (2016–2025) publish all seven status indicators and six Dynamik
indicators per statistisches Gebiet as z-scores; the WFS used by the warehouse publishes classes
only."*

## 6. OA zero-fill (item 6)

**Why E1's H1b OA row had n = 341 of 436.** `analysis/e1_regressions.py` builds `oa_fast_food` as
`MAX(oa_category) FILTER (WHERE poi_category_h = 'Fast Food')` over `int_poi_offering_advantage`.
That table is sparse by design: a taxonomy leaf with zero POIs in an area-year has no row. So the
pivot returns NULL, not 0, for every PLR without a fast-food POI, and `run_spearman` drops NaN pairs.

Reproduced on the current warehouse (thesis 2018 PLR frame, `lor_pre2021`, `standard`):

| PLRs in the H1 frame | 436 |
|---|---:|
| with ≥ 1 fast-food POI (non-null `oa_fast_food`), i.e. the n of E1's row | **341** |
| with gastronomy but no fast food (true OA = 0, dropped) | 77 |
| with no gastronomy at all (OA 0/0, dropped) | 18 |

The test therefore conditioned on presence, which §5.1 forbids.

**Rule implemented**, in `int_poi_oa_native_panel` (model layer), per (city, vintage, weight
variant, methodology variant, year) and per level (domain, category):
- **Areas:** every area with ≥ 1 POI in any snapshot of that slice. Areas that are always empty
  are the §7 rule-4 exclusion anyway.
- **Entries:** every domain, or domain–category pair, present city-wide that year. An entry absent
  from the whole city has an undefined LQ and gets no row that year.
- **Present** in the sparse source → the source `oa_value` and flag, unchanged.
- **Absent** → `oa_value = 0`, `is_zero_filled = true`. With a non-empty parent base this is the
  exact LQ, (0/D_a)/(c_city/D_city) = 0. With an empty parent base (0/0) the row still reads 0, and
  `oa_min_base_flag` is necessarily true, so the flag excludes it, not presence.
- **`oa_min_base_flag`** is the D-3 rule of `int_poi_offering_advantage` (#274): domain level
  all-domains base < `oa_min_poi_base_n`; category level parent-domain base < `oa_min_poi_base_n`
  (default 10).

**Where the suite applies it.** The suite must read `oa_value` from `int_poi_oa_native_panel`. It
must never pivot `int_poi_offering_advantage` with `MAX(...) FILTER`, and it may drop rows only
where `oa_min_base_flag` is true. `load_oa_category_panel` in `e1_regressions.py` (reused per
pre-registration §6.2) must therefore be pointed at this model, or wrapped so it reads from it; that
is a phase-B change.

**Consequence the suite should expect.** In the same 2018 frame, applying the min-base flag
(Gastronomy base ≥ 10) keeps **199 of 436** PLRs for H1b, 4 of them zero-filled. Read from the new panel, the same 2018 frame gives the same
199 (4 zero-filled), so the panel reproduces the hand computation. On LOR 2021 (`standard`), H1b
keeps 236 of 541 PLRs in 2019, 242 in 2021, 256 in 2023 and **260 in 2025** (3–7 of them
zero-filled each year). See open issue O8. The flag, not
zero-fill, is what reduces n, and thin early-year PLRs are hit hardest (#274 note).

**Test** `test_354_oa_native_panel_zero_fill` (severity error) checks four things:
1. density: rows = areas × entries for every slice-year-level;
2. present rows equal the sparse source exactly (value and flag);
3. filled rows read 0 with zero local stock;
4. filled rows with an empty parent base are flagged.

## 7. Published outputs unchanged

Method: a full `uv run poe build` on this branch **before** any change gave the baseline (PASS=1116,
WARN=2, ERROR=0). It produced an order-independent fingerprint (row count + sum of row hashes) of
every relation in `main` and `main_seeds`, plus full copies of every mart and of the two refactored
models. After the change, a second full build was compared against that baseline.

**Build results.** Baseline: PASS=1116, WARN=2, ERROR=0. After the change: PASS=1181, WARN=2,
ERROR=0, with 65 new nodes (8 models, 1 seed, their schema tests and 6 singular tests). The two
warnings are the same pre-existing ones with the same counts: `test_ortsteil_overlap_ortsteil_never_dominant`
2 and `test_c5_poi_share_spike` 115. All six `test_354_*` tests pass.

**Relations.** Of the 121 baseline relations none was removed, and nine new ones were added: the 8
models and the seed. 85 relations have an identical fingerprint. The other 36 have identical row
counts except `mart_poi_oa_methods`; the full list is below. All of the differences come from
non-deterministic floating-point and tie-breaking behaviour that already existed before this
change. The evidence:

1. **Re-running identical code also changes results.** `int_osm_poi_plr_weighted` was built twice
   from the same (post-change) code. 20,206 of 285,824 rows differ in the last bit of
   `weighted_count`. Parallel `SUM` over doubles is order-dependent in DuckDB. The same jitter
   appears in models this change cannot reach: `int_ewr_socioeco`, `int_ewr_socioeco_hamburg`,
   `int_berlin_brw_plr`, `int_berlin_ewr_plr2021`, `int_mss_lead_lag` and others, all with
   identical row counts.
2. **Integer-based outputs are bit-identical.** In `int_poi_offering_advantage` every `standard`
   row (468,406, BER + HH) is bit-identical to the baseline. Only the 285,824 `gaussian_500m` rows
   differ, and only in float columns: max relative difference ≤ 5e-15 on every column, with keys,
   all three min-base flags and NULL patterns identical. `int_osm_poi_plr_weighted`: max relative
   difference 8e-16, integer columns identical.
3. **Published marts match within floating-point tolerance.** After rounding doubles to 1e-9,
   these marts are identical as multisets: `gentrification_index` (18,833 rows),
   `fct_gentrification_change`, `mart_price_rent_dimension` and `mart_price_rent_dimension_pre2021`.
   `mart_area_demographics` is identical at 10 significant digits. A keyed comparison of
   `mart_poi_offering_advantage_map` finds every column within 1e-12 relative, with no flag or key
   change.
4. **`mart_poi_oa_methods` has 638 fewer rows (18,828,328 → 18,827,690).** All of them are
   `zscore_slq` on the `gaussian_500m` variant (category −347, type −291). `UNPIVOT` drops NULLs,
   and `zscore_slq` is NULL when the binomial variance p(1−p) is ≤ 0. Every row whose NULL status
   flipped, 1,095 category and 1,149 type rows in either direction, belongs to a child whose
   city-wide share within its domain is p = 1 up to 4 ulp (|1 − p| ≤ 8.9e-16): a single-child
   domain under the kernel variant. Whether such a cell comes out NULL or as a meaningless huge z
   depends on summation order, in either run (open issue O6).
5. **`mart_poi_dominance`: 3,498 rows have a different `top_child` label.** Every numeric column
   agrees to ≤ 1e-13. In all 3,498 rows the top share is an exact tie, and 2,760 of them are in the
   `standard` variant, whose inputs are bit-identical (point 2). `arg_max(child_label, child_share)`
   picks arbitrarily among ties (open issue O7).

**Conclusion.** No published output changed beyond pre-existing build-to-build non-determinism. The
macro extraction is also token-identical to the original SQL (§1.1). `int_poi_offering_advantage`
and `int_osm_poi_plr_weighted` are the only existing methodology-bearing models touched, as a pure
refactor. The other edits to existing files are header comments in `stg_hamburg_sozialmonitoring`
and `int_hamburg_sozialmonitoring_index` (no SQL change), `.sqlfluff` stubs, and the two schema
files.

Fingerprint-differing relations (36):
- marts: `fct_gentrification_change`, `gentrification_index`, `mart_area_demographics`,
  `mart_poi_dominance`, `mart_poi_oa_methods`, `mart_poi_offering_advantage`,
  `mart_poi_offering_advantage_map`, `mart_price_rent_dimension`, `mart_price_rent_dimension_pre2021`;
- intermediates: `int_berlin_brw_plr`, `int_berlin_brw_trend`, `int_berlin_displacement_subindex`,
  `int_berlin_ewr_plr2021`, `int_berlin_rent_pressure_proxy`, `int_berlin_turnover_proxy`,
  `int_ewr_demographics_wide`, `int_ewr_lead_lag`, `int_ewr_socioeco`, `int_ewr_socioeco_hamburg`,
  `int_ewr_socioeco_pre2021`, `int_gentrification_ts`, `int_hamburg_lead_lag`,
  `int_mss_bzr_aggregate`, `int_mss_lead_lag`, `int_osm_poi_plr_weighted`,
  `int_poi_amenity_weighted_base`, `int_poi_amenity_weighted_base_2021`,
  `int_poi_offering_advantage`, `int_poi_offering_advantage_methods`, `int_poi_share_base_2021`,
  `int_poi_status_dynamism`, `int_poi_status_dynamism_improved`,
  `int_poi_status_dynamism_improved_pre2021`, `int_poi_status_dynamism_pre2021`,
  `int_poi_within_group_dominance`, `int_price_rent_brw_wohnlage_combined`.

Most of these are downstream of EWR/BRW float aggregation and do not depend on the OA or kernel
models at all.

## 8. Open issues found (not fixed here; outside phase-A scope)

- **O1. Gaussian city totals exceed hard totals, and the C-1 invariance test cannot detect it.**
  `int_osm_poi_plr_weighted` gives kernel mass to POIs outside every PLR polygon that lie within the
  bandwidth. Its header says so, but it also claims Σ weighted = hard city total "exactly". Measured
  on the existing rows: 2019 73,452 vs 73,416; 2021 89,636 vs 89,583, i.e. +0.05–0.08%.
  `test_c1_oa_weighted_mass_conservation_invariance` should catch this, but it joins the two variants
  on `city_code`. The gaussian rows carry the legacy `'berlin'` and the standard rows `'BER'`, so the
  join matches **0 rows** and the test passes vacuously. Suggested follow-up, which touches the
  gated OA/kernel models and needs geo-DS review:
  - canonicalise `city_code` in the test;
  - decide whether outside-polygon POIs should get kernel mass;
  - correct either the header claim or the model.

  The new back-cast test checks the exact identity instead, so phase A does not depend on this.
- **O2. `load_oa_category_panel` (E1) conditions on presence** (§6). The published E1 findings
  (H1b OA n = 341; the H2/H3 OA rows use the same pivot) are affected. They are superseded by the
  suite for the thesis-recheck table (pre-registration §6.5), but E1 §1–§3 should get a pointer.
- **O3. Hamburg 2013–2015** have no published annex, so the reference date and class counts for
  those editions are assumed or internally checked only (§3, §4).
- **O4. Annex indicator ingestion** (§5) needs an architect check before a Hamburg continuous
  composite can be built (§4.4 follow-up).
- **O6. `zscore_slq` NULL guard is exact, not tolerant** (`int_poi_offering_advantage_methods`).
  Single-child domains under the kernel variant give p = 1 ± a few ulp. The cell is then NULL in
  one build and a meaningless huge z in the next, so `mart_poi_oa_methods`' row count is not
  reproducible (±hundreds of rows). Suggested fix (gated model): treat |p(1−p)| below a tolerance
  as 0.
- **O7. `top_child` tie-break is non-deterministic** (`int_poi_within_group_dominance`,
  `arg_max(child_label, child_share)`). Thousands of exact ties, so the published `top_child` and
  its tier change between builds. Suggested fix: deterministic tie-break, for example
  `arg_max(child_label, (child_share, child_label))` or a `row_number()` with a label order.
- **O8. The category-level min-base flag halves the H1b sample.** Under the binding §5.1 rule,
  Fast Food OA on LOR 2021 keeps 236–260 of 541 PLRs (2019–2025), and 199 of 436 in the 2018
  thesis frame. That follows from the pre-registered rule (parent Gastronomy base ≥ 10). Geo-DS
  should be aware of it before phase B, because it changes n for every category-level H1/H2
  feature, not only H1b.
- **O5. Shared scratch space.** During this work another session was writing to the same scratch
  directory and reading the same warehouse file. Nothing here depended on it, but a concurrent
  `poe build` from another branch would invalidate a baseline comparison like §7.
