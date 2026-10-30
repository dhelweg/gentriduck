# #360: Berlin MSS index-indicator mapping, verified per edition

- **Author:** data-engineer
- **Date:** 2026-10-28
- **Issue:** #360 (methodology-bearing; geo-DS and domain sign-offs follow review)
- **Branch:** `fix/360-mss-indicator-labels`
- **Trigger:** `gentrification-domain-expert`, #354/#355 pre-registration review, finding 1. The
  warehouse labels for MSS slots S2–S4 looked shifted by one slot.

## 1. Result

The domain expert's reading is confirmed for every edition. The WFS `indexind` attributes
`s1`–`s4` / `d1`–`d4` are the official index-indicator slots S1–S4 / D1–D4. Slots 1, 3 and 4
hold the same construct in every edition. Slot 2 changed meaning twice. The pre-#360 ingestion
used one fixed mapping for all editions (`s2`→`transferbezug`, `s3`→`kinderarmut`,
`s4`→`alleinerziehende`), so every label from S2 to S4 was wrong.

| Slot (WFS attr) | 2013\*, 2015, 2017 | 2019, 2021 | 2023, 2025 |
|---|---|---|---|
| S1 (`s1`) → `arbeitslose_anteil` | Arbeitslosigkeit: unemployed under SGB II **and SGB III** per resident aged 15–<65, % | Arbeitslosigkeit: **SGB II only**, 15–<65 (2019); 15–<Regelaltersgrenze (2021) | Arbeitslosigkeit: SGB II, 15–<Regelaltersgrenze |
| S2 (`s2_x` until 2021, `s2` from 2023) | **Langzeitarbeitslosigkeit** → `langzeitarbeitslose_anteil` (SGB II + III, 15–<65, %) | **vacant**: attribute published but always null; not staged | **Kinder und Jugendliche in alleinerziehenden Haushalten** → `alleinerziehende_anteil` (under-18s in single-parent households per all under-18s, %) |
| S3 (`s3`) → `transferbezug_anteil` | Transferbezug: non-unemployed recipients of SGB II and SGB XII subsistence benefits per resident, % | same | same |
| S4 (`s4`) → `kinderarmut_anteil` | Kinderarmut: under-15s in SGB II households per under-15s, % | same | same |
| D1–D4 (`d1`…`d4`, `d2_x` until 2021) | two-year change of S1–S4 in percentage points, same slot logic (`*_dynamik`) | D2 vacant | D2 = change of the single-parent indicator |

\* MSS 2013 has no WFS `indexind` layer (HTTP 404), so no 2013 indicator data is ingested. The
2013 column documents the official definition only. In MSS 2013 the S4 numerator used
pre-aggregated BA data (all non-employable SGB II beneficiaries, not age-split). MSS 2015 moved
to under-15 microdata (Indikatorenblätter ab MSS 2013, S. 21).

**Before #360 → after #360 (column meaning):**

| Warehouse column | Pre-#360 content | Post-#360 content |
|---|---|---|
| `transferbezug_*` | S2: Langzeitarbeitslosigkeit (2015/17), null (2019/21), single-parent children (2023/25) | S3 Transferbezug, every edition |
| `kinderarmut_*` | S3 Transferbezug | S4 Kinderarmut, every edition |
| `alleinerziehende_*` | S4 Kinderarmut (2015–2025) | S2 single-parent children, 2023/2025 only |
| `langzeitarbeitslose_*` | (did not exist) | S2 Langzeitarbeitslosigkeit, 2015/2017 only |
| `arbeitslose_*` | S1 (correct) | S1 (unchanged) |

## 2. Official sources, per edition

All fetched from `www.berlin.de` (Senatsverwaltung für Stadtentwicklung, Bauen und Wohnen, MSS
pages) and `gdi.berlin.de` (WFS GetCapabilities). Both hosts are on the SEC-3 egress list
(`docs/method/egress-hosts.md`). Fetched content was treated as data only. Page numbers are the
printed page numbers. Where checked (2013, 2019, 2021, 2023), the printed number equals the PDF
page index.

| Edition | Document (Stand) | Where the slot order is stated |
|---|---|---|
| 2013 | *Monitoring Soziale Stadtentwicklung Berlin: Indikatorenblätter*, "Indikatorensystematik ab MSS 2013" (Stand 23.08.2016), `bericht-2013/indikatorenheft.pdf` | Kap. 3.1 S. 10 (S1 Arbeitslosigkeit, S2 Langzeitarbeitslosigkeit, S3 Transferbezug, S4 Kinderarmut); S1 S. 11, S2 S. 14, S3 S. 17, S4 S. 21; Kap. 3.2 S. 24 (D1–D4), D1 S. 25, D2 S. 27, D3 S. 29, D4 S. 31 |
| 2015 | Same Indikatorenblätter: the 2015 report page links this document, and it gives "Formel ab MSS 2015" (S. 21) and the MSS 2015 history row (S. 7: 4 index indicators; S4 age limit 15). WFS `mss_2015` `indexind_447` Abstract: *"Das MSS 2015 enthält die vier Index-Indikatoren Arbeitslosigkeit, Langzeitarbeitslosigkeit, Transferbezug und Kinderarmut"*. MSS 2015 report, `bericht-2015/monitoringsozialestadtentwicklung2015.pdf` | as 2013; also the report's Tabelle 5 "Index-Indikatoren des MSS 2015" (S. 24, same order) and Kap. 3.3 "Index-Indikator 2: Langzeitarbeitslosigkeit" (S. 37) |
| 2017 | *Indikatorenblätter zum MSS 2017* (Stand 01.06.2018), `bericht-2017/mss2017indikatorenblaetter_fortschreibung.pdf`. WFS `mss_2017` Abstract: the same four, in the same order | Kap. 3.1 S. 11; S1 S. 12, S2 Langzeitarbeitslosigkeit S. 16, S3 S. 20, S4 S. 25; Kap. 3.2 S. 29; D1 S. 30, D2 S. 32, D3 S. 34, D4 S. 37 |
| 2019 | *Indikatorenblätter zum MSS 2019* (Stand 02.06.2020), `bericht-2019/mss_indikatorenheft_fortschreibungmss2019.pdf`. WFS `mss_2019` Abstract: *"die drei Index-Indikatoren Arbeitslosigkeit, Transferbezug und Kinderarmut"* | S. 9 history table: *"Reduzierung von S1 und K01 auf die Arbeitslosen nach SGB II; Wegfall von S2 Langzeitarbeitslosigkeit"*. Kap. 3.1 S. 12 keeps the slot numbers (S1, **S3**, **S4**); S1 S. 13, S3 S. 18, S4 S. 23; D1 S. 28, D3 S. 31, D4 S. 34. S1 comment (S. 16): not comparable with earlier editions; recomputed back to 2016 |
| 2021 | *Indikatorenblätter MSS 2021* (Stand 29.07.2022), `bericht-2021/mss_2021_indikatorenheft_fortschreibung_langfassung.pdf` | Kap. 3.1 S. 15 (S1, S3, S4); S1 S. 16, S3 S. 21, S4 S. 27; D1 S. 32, D3 S. 35, D4 S. 38. Vorbemerkungen S. 7: S1 and S3 now computed against the Regelaltersgrenze (65 → 67) |
| 2023 | *Indikatorenblätter MSS 2023* (November 2024), `bericht-2023/langfassung_indikatorenblaetter_mss2023.pdf` | S. 13 history table: *"wie MSS 2021, aber mit neuen S2/D2"*, *"S2/D2 Kinder u. Jugendliche in alleinerziehenden Haushalten, neuer Index-Indikator"*. Kap. 3.1 S. 17 lists S1 Arbeitslosigkeit, **S2 Kinder und Jugendliche in alleinerziehenden Haushalten**, S3 Transferbezug, S4 Kinderarmut; S1 S. 18, S2 S. 23, S3 S. 26, S4 S. 32; D1 S. 37, D2 S. 41, D3 S. 44, D4 S. 48 |
| 2025 | *Indikatorenblätter MSS 2025*, `bericht-2025/langfassung_indikatorenblaetter_mss2025.pdf`. WFS `mss_2025` Abstract: *"die vier Index-Indikatoren Arbeitslosigkeit, Kinder und Jugendliche in alleinerziehenden Haushalten, Transferbezug und Kinderarmut"* | Kap. 3.1 S. 17 (same order as 2023); S1 S. 18, S2 S. 23, S3 S. 26, S4 S. 31; D1 S. 36, D2 S. 40, D3 S. 43, D4 S. 47 |

(The WFS `indexind` Abstracts for 2021 and 2023 describe only the observation window, not the
indicators.)

## 3. Data evidence (raw `data/raw/berlin/mss/*_indicators.parquet`)

### 3.1 Distributions per slot (unweighted PLR means; inhabited PLRs)

| Edition | `s1` mean (max) | `s2`/`s2_x` mean (max) | `s3` mean (max) | `s4` mean (max) |
|---|---|---|---|---|
| 2015 | 7.41 (16.7) | 2.43 (6.1) | 12.17 (45.3) | 28.37 (76.8) |
| 2017 | 6.16 (16.0) | 2.00 (6.0) | 12.23 (43.9) | 26.98 (77.1) |
| 2019 | 3.89 (13.2) | all null | 11.67 (41.9) | 25.56 (77.2) |
| 2021 | 4.97 (17.8) | all null | 10.92 (38.9) | 24.54 (74.7) |
| 2023 | 4.34 (15.3) | 26.35 (50.2) | 10.48 (37.0) | 22.36 (67.9) |
| 2025 | 4.69 (16.9) | 24.00 (46.3) | 9.87 (35.8) | 20.75 (64.5) |

How this reads against the official definitions:
- `s2_x` 2015/2017 is about 2 % with a maximum near 6 %. That fits long-term unemployment per
  resident aged 15–<65. **In all 871 inhabited PLR-editions `s2_x ≤ s1`**, at a mean ratio of
  0.32. The long-term unemployed are a subset of the unemployed with the same denominator
  (S1 S. 11 / S2 S. 14), so this holds by construction. A Transferbezug share could not behave
  like this.
- `s2` 2023/2025 runs from 6 % to 50 %. It is not a benefit share. The level fits the under-18
  single-parent-household share.
- `s3` is 10–12 %, below `s4` (21–28 %) in every edition. That is the expected
  ordering for Transferbezug (whole population) against Kinderarmut (under-15s).
- `s1` drops from 6.16 to 3.89 between 2017 and 2019. That is the documented S1 redefinition
  (SGB III removed, MSS 2019 S. 9/S. 16), not a social change.

### 3.2 Spearman ρ between slots, per edition

| Edition | s1–s2 | s1–s3 | s1–s4 | s2–s3 | s2–s4 | s3–s4 |
|---|---|---|---|---|---|---|
| 2015 | 0.96 | 0.95 | 0.92 | 0.89 | 0.88 | 0.97 |
| 2017 | 0.95 | 0.96 | 0.94 | 0.90 | 0.88 | 0.97 |
| 2019 | – | 0.97 | 0.94 | – | – | 0.97 |
| 2021 | – | 0.96 | 0.94 | – | – | 0.97 |
| 2023 | 0.60 | 0.95 | 0.93 | 0.56 | 0.58 | 0.97 |
| 2025 | 0.60 | 0.95 | 0.94 | 0.54 | 0.57 | 0.97 |

The S2 construct changes between 2017 and 2023, and the data shows it. In 2015/2017 `s2_x`
tracks `s1` at ρ 0.95–0.96, as Langzeitarbeitslosigkeit should. In 2023/2025 `s2` correlates
only about 0.6 with everything else. Family structure is a weaker, differently patterned
correlate of benefit receipt.

### 3.3 Dynamik consistency (`d_k` against `s_k(E) − s_k(E−2)`, same LOR vintage)

| Edition | D1 r | D2 r | D3 r | D4 r |
|---|---|---|---|---|
| 2017 | 0.963 | 1.000 | 0.981 | 0.917 |
| 2019 | 0.953 | – | 1.000 | 1.000 |
| 2023 | 1.000 | – (no 2021 S2) | 1.000 | 1.000 |
| 2025 | 1.000 | 1.000 | 1.000 | 1.000 |

Each `d_k` is the change of its own `s_k`, so the D slots follow the S slots. The deviations
match documented revisions. In 2017, S3/S4 were recalculated after the 2016 SGB II statistics
revision (MSS 2023 history table S. 13). In 2019, S1 was redefined and recomputed back to 2016
(MSS 2019 S. 16).

## 4. Fix

- **Staging maps from the WFS attribute, not the parquet label.** `stg_berlin_mss_indicators`
  inner-joins the raw rows to the new seed **`transform/seeds/seed_mss_indicator_vocab.csv`**
  on `(edition, raw_attr)`. The seed has one row per edition × slot, with the official German
  label, a short definition and the Indikatorenheft chapter/page (R-C2). The vacant 2019/2021
  S2/D2 slot is not in the seed. Two new columns are exposed for traceability: `raw_attr` and
  `official_code`. Existing raw parquets with the legacy labels therefore stage correctly
  without a re-ingest.
- **Ingestion** (`ingestion/berlin/mss/ingest_mss_indicators.py`) now labels slots per edition
  via `canonical_indicator(edition, slot)`. A vacant slot is written with `indicator = null` and
  logs a warning if it ever carries a value. Unit tests:
  `tests/ingestion/test_mss_parsers.py`. These include a check that `canonical_indicator` agrees
  with every row of the dbt seed, and that the vacant 2019/2021 S2/D2 slot maps to None.
- **Column names keep their meaning for consumers.** `transferbezug_anteil` is now actually
  Transferbezug, which is what `int_berlin_rent_pressure_proxy` (D5 "transfer stress") always
  intended. No consumer SQL had to change. Only comments and descriptions were corrected.
- **Tests:**
  - `test_mss_indicators_edition_vocab` (rewritten) runs these checks per edition:
    - (a) the vocabulary equals the seed in both directions;
    - (b) no indicator is all-null;
    - (c) `langzeitarbeitslose_anteil ≤ arbeitslose_anteil` in every PLR;
    - (d) mean `kinderarmut_anteil` > mean `transferbezug_anteil`;
    - (e) mean `arbeitslose_anteil` < mean `transferbezug_anteil`;
    - (f) Spearman ρ(kinderarmut, transferbezug) > 0.9 and ρ(alleinerziehende, transferbezug)
      < 0.8;
    - (g) each `*_dynamik` correlates > 0.9 with the two-year change of its own status slot
      within the same LOR vintage.

    Checks (b) and (d) would have caught the original shift. Checks (e)–(g) were added in
    review. A mutation run against the built warehouse confirmed they catch an s1↔s3 swap in
    2019+, an s2↔s4 swap in 2023/2025, a d3↔d4 swap, and the full pre-#360 shift. The
    unmutated data passes.
  - `test_mss_indicators_raw_attr_mapped` (new) fails if a populated raw attribute has no seed
    mapping.
  - Seed schema tests: uniqueness on `(edition, raw_attr)` and `(edition, indicator)`, plus
    accepted values.

### Consumers found (grep of `transform/`, `analysis/`, `ingestion/`, `web/src`)

| Consumer | Uses | Effect |
|---|---|---|
| `int_berlin_rent_pressure_proxy` | `transferbezug_anteil` as `z_transfer_stress` | Input is now S3 Transferbezug in every edition; coverage gains 2019 and 2021 (§5) |
| `int_berlin_displacement_subindex` (D5) | `rent_pressure_proxy` | Values change for reference years fed by the 2021/2023/2026 Wohnlage snapshots (§5) |
| `int_gentrification_ts` | `displacement_subindex` (predictor-side column) | Same change, Berlin `lor_2021` rows only |
| marts / `web/src` / `analysis/*.py` | none read the MSS indicator columns or `displacement_subindex` | Unchanged (§5) |

`analysis/` has no reader of these columns, including no E1 composite in the committed tree.
The planned #354 suite is not implemented yet. It should build on the corrected labels; the
three-indicator core S1 + S3 + S4 is populated in every edition.

## 5. Impact on published outputs

Method: before the fix, a snapshot of the relevant tables was copied from
`data/gentriduck.duckdb` into a scratch DuckDB. After `uv run poe build` on this branch, every
column was compared row by row on each table's grain keys. Differences ≤ 1e-9 are
floating-point summation-order noise from the parallel build (maximum seen 1e-13) and are
not counted. Spearman ρ is computed over PLRs populated both before and after.

### 5.1 Published marts and site: no change

| Output | Real changes |
|---|---|
| `gentrification_index` (all variants, BER + HH, 18,833 rows) | **0 typology-stage (`status_class`) changes**, 0 `status_index`/`dynamism_index` changes. The D1×D2 stage comes from the MSS *index* layer (`stg_berlin_mss`), which #360 does not touch |
| `fct_gentrification_change`, `fct_gentrification_trajectory`, `mart_area_rollup_stage_mix`, `mart_price_rent_dimension` | 0 |
| Serving parquet / site | no change: `export_serving_parquet.py` exports only marts, and no mart or `web/` page reads `displacement_subindex`, `rent_pressure_proxy` or any MSS indicator column |

The issue describes D5 as "published". In the current tree it is a warehouse predictor column
(`int_gentrification_ts.displacement_subindex`) and is not exported.

### 5.2 `int_berlin_rent_pressure_proxy`

| Vintage | Wohnlage year | MSS ed. | input non-null before → after | proxy non-null before → after | ρ input old vs new | ρ proxy old vs new | mean abs Δ proxy |
|---|---|---|---|---|---|---|---|
| lor_pre2021 | 2017 | 2017 | 436 → 436 | 436 → 436 | 0.901 | 0.865 | 0.191 |
| lor_pre2021 | 2019 | 2019 | 0 → 436 | 0 → 436 | – | – | – |
| lor_2021 | 2021 | 2021 | 0 → 536 | 0 → 536 | – | – | – |
| lor_2021 | 2023 | 2023 | 536 → 536 | 536 → 536 | 0.561 | 0.564 | 0.383 |
| lor_2021 | 2026 | 2025 | 535 → 535 | 535 → 535 | 0.545 | 0.455 | 0.391 |

In 2017 the old input was Langzeitarbeitslosigkeit. It is a close socio-economic correlate of
Transferbezug, so the proxy barely moves (ρ 0.87). In 2023/2026 the old input was the share of
children in single-parent households, and the proxy changes substantially (ρ 0.46–0.56).

### 5.3 `displacement_subindex` (D5; `int_berlin_displacement_subindex`, Berlin lor_2021)

| Reference year | non-null before → after | rows changed | Spearman ρ old vs new | mean abs Δ | PLRs changing D5 quintile | PLRs entering/leaving top decile |
|---|---|---|---|---|---|---|
| 2009–2020 | 542 → 542 | 0 | 1.000 | 0 | 0 | 0 |
| 2021 | 0 → 536 | 536 (newly populated) | – | – | – | – |
| 2023 | 536 → 536 | 536 | 0.564 | 0.383 | 316 of 536 | 66 |
| 2025 (matched to Wohnlage 2023) | 536 → 536 | 536 | 0.564 | 0.383 | 316 of 536 | 66 |
| 2026 | 535 → 535 | 535 | 0.455 | 0.391 | 347 of 535 | 72 |

2009–2020 are turnover-only rows and are unaffected. The partial-availability design is
unchanged: turnover_proxy (2009–2020) and rent_pressure_proxy (2021, 2023, 2026) still do not
overlap.

**`int_gentrification_ts.displacement_subindex` (Berlin):** 2021 goes from 0 to 536 populated
PLRs (`displacement_subindex_is_partial` set on those 536). 2023 and 2025 change in all 536
populated PLRs (ρ 0.564; 316 change quintile). 2013–2019 stay NULL by design (lor_2021 only).
0 typology-stage changes.

## 6. Documents corrected

- `docs/methodology/index-definition.md` §1.7 (4 → 3 → 4 indicator drift), §4.4 and §7.2 (the
  2019/2021 gap is S2, not Transferbezug; the cross-edition core is S1 + S3 + S4), and the
  traceability row for R-A4 C3.
- `docs/adr/0007-berlin-ses-indicators.md`: dated factual-correction header, a per-edition slot
  table under Decision 2, and corrections to the indicator-count history in Decision 3, the
  Consequences and the References. **No decision changed.** The ADR's "stable 3-indicator core
  (unemployment, transfer receipt, child poverty)" was right about the constructs. The
  implementation had attached the labels to the wrong columns.
- `docs/methodology/R-A4-geo-signoff.md`, `docs/methodology/R-A4-domain-signoff.md`: appended
  correction notes. The signed text and verdicts are unchanged.

## 7. Open points for the gate

1. **D5 coverage widens.** `rent_pressure_proxy` is now populated for the 2019
   (`lor_pre2021`) and 2021 (`lor_2021`) Wohnlage snapshots, which were NULL before.
   `displacement_subindex` is lor_2021-only, so it gains reference year 2021 (536 PLRs, all
   rent-pressure-only partial rows). This follows directly from correct labels, but it is new
   predictor coverage that geo-DS/domain should accept explicitly.
2. **Construct of "transfer stress".** S3 counts **non-unemployed** SGB II/XII recipients
   (children, pensioners, people unable to work, "Aufstocker"). Registered unemployed people
   are in S1. The B1 sign-offs described the input as "SGB II/XII transfer-receipt share". That
   is accurate but omits this exclusion. The domain expert may want to confirm S3 alone is the
   intended ability-to-pay input, or whether it should be S1 + S3.
3. **Within-S3 definition breaks.** The 2016 SGB II statistics revision (from MSS 2017) and the
   Regelaltersgrenze correction (from MSS 2021) affect S3 levels. They do not affect the
   within-year z-score used in D5.
4. **Raw parquet labels.** Parquets on disk still carry the legacy `indicator` labels until the
   next `uv run poe ingest` of this source. dbt ignores that column. A re-ingest was not run so
   that the before/after comparison is not confounded by upstream re-publication.
5. **Other signed records that repeated the old labels or coverage.** Dated, append-only
   correction notes were added in review round 1 (2026-10-30); the signed text is unchanged:
   - `B1-rent-pressure-geo-signoff.md` (C2, NULL for 2019/2021);
   - `B1-rent-pressure-domain-signoff.md` (§d);
   - `D5-wire-geo-signoff.md` (lor_2021 years "2023 and 2026");
   - `D5-wire-domain-signoff.md`;
   - `R-A1-geo-signoff.md` and `R-A1-domain-signoff.md` ("transferbezug null → MISSING");
   - `docs/epic-h/H1-domain-signoff.md` (Berlin index-indicator list).

   The superseded drafts `index-definition-*-draft.md` were left as they are. The governed
   `index-definition.md` carries the correction.
