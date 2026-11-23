# #372 investigation: crosswalked pre-2021 Berlin PLR populations

Read-only investigation, 2026-11-23. Code is from `origin/develop` (74c9be1fe). Data comes from
`data/gentriduck.duckdb` (built from `feat/363-determinism-tests`) and `data/serving/*.parquet`.
`git diff origin/develop` is empty for `stg_berlin_ewr`, `int_berlin_ewr_plr2021`,
`int_ewr_demographics_wide`, `mart_area_demographics`, `seed_lor_crosswalk_2006_to_2021`,
`stg_berlin_ewr_age_bands` and `int_berlin_ewr_age_bands_plr2021`. The live site's
`mart_area_demographics.parquet` (from `/gentriduck/data/manifest.json`) matches the local serving
parquet row for row (0 rows differ on area, year and `residents_total`).

**Headline.** The issue is about counts, but the worse defect is in the shares. For split PLRs,
`int_berlin_ewr_plr2021` scales the pre-2021 intensive indicators (shares, mean age) by the sum of
the forward weights. As a result they are wrong at **every** grain, including Bezirk (§3.3). The
counts are only wrong at PLR and Ortsteil grain. No rendered page shows any pre-2021 value today.

## 1. Where the crosswalked series goes

Lineage: `stg_berlin_ewr` (lor_pre2021, 2008–2020) → `int_berlin_ewr_plr2021` (areal crosswalk;
all rows relabelled `lor_2021`) → `int_ewr_demographics_wide` → `mart_area_demographics`.

`mart_area_demographics` holds **2008–2020 crosswalked rows plus 2024 and 2025 native rows** at
every Berlin grain: plr 542, bzr 143, pgr 58, bezirk 12 and ortsteil 95 per year. That is more than
the 2018/2020 named in the issue. The Ortsteil CTE's `area_vintage = 'lor_2021'` filter does not
exclude anything, because the crosswalk model labels every row `lor_2021`. The mart's header claims
it does.

| Consumer | Pre-2021 crosswalked values? | Rendered? |
|---|---|---|
| `web/pages/berlin/area/[code].md` (PLR, "People & structure") | Reads `mart_area_demographics` | **No.** `demographics_current` and `demographics_table` both pin `max(reference_year)`, which is 2025 |
| `bzr/[code].md`, `pgr/[code].md`, `bezirk/[code].md`, `ortsteil/[code].md` | Same mart | **No.** Every query is `order by reference_year desc limit 1` or `= max(reference_year)` |
| Static data bundle `/gentriduck/data/gentriduck_marts/mart_area_demographics/…/mart_area_demographics.parquet` | **Yes.** The whole table, 2008–2025, every grain | Not rendered, but **publicly downloadable**: DuckDB-WASM fetches the full source table |
| `fct_gentrification_change`, `gentrification_index`, `mart_area_rollup_stage_mix`, `mart_mss_area_aggregate` | **No.** Pre-2021 periods use native `lor_pre2021` codes (447 PLRs, via `int_ewr_socioeco_pre2021`). 2021/2023 population is NULL and 2025 is native | n/a |
| `mart_poi_oa_methods` `percapita` | **No.** Only 2024/2025 rows exist (native) | n/a |
| `int_ewr_socioeco` (crosswalked 2008–2020, `ewr_composite` 2014–2020) → `int_ewr_lead_lag` (E1 regressions), `int_berlin_turnover_proxy`, `analysis/thesis_hypothesis_suite.py` (BER modern panel: `d4_end` at e−1 = **2020** for the 2019→2021 window; `pop` uses 2024 = native) | **Yes**, shares and composite. See §3.3 | Indirectly, through findings. **Out of #372 scope; needs its own gated issue** |

No page computes PLR population growth from this mart.

## 2. What a reader sees today (live site, fetched 2026-11-23)

| PLR | Live page text | Live parquet, 2018 / 2020 / 2024 / 2025 |
|---|---|---|
| 03400831 Pankower Tor | "As of the **2025** EWR register … **0** registered residents", plus the "uninhabited" banner | 6,130 / 6,295 / NULL / 0 |
| 06200418 Landweg | 2025, **0** registered residents | 3,802 / 3,801 / *(no row: typo, §4)* / 0 |
| 06200419 Thermometersiedlung | 2025, **4,496** registered residents | 1,082 / 1,080 / 4,539 / 4,496 |
| BZR 034008, Ortsteil 1204, Bezirk 03, PGR 0340 | "Residents (latest EWR year)" = 37,159 / 10,379 / 428,900 / 95,680, which are the 2025 values | 2020: 35,729 / 14,571 / 410,703 / 91,660 |

There is no population chart or time series on any Berlin page. **The artefacts are not rendered.
They ship only in the downloadable static parquet.** The risk is latent: any future trend chart
would show them.

## 3. Size of the problem

The reference is 2024 native. The age-band series from #371 (`int_berlin_ewr_age_bands_plr2021`) is
**not independent**. It uses the same crosswalk, and its 2020 counts equal this model's to within
renormalisation (6,295.13 vs 6,295.13 for Pankower Tor). Native EWR for 2021–2023 on LOR 2021 was
never published (`ingest_ewr.py`, #197). Ratio P_2020 / P_2024 over units inhabited at both dates.
The ratio includes about 3.4 % real city growth and new-build quarters, so it is an upper bound on
the artefact.

### 3.1 PLR: confirmed

| Comparison | n | median | \|ln r\| > ln 1.25 | \|r − 1\| > 0.25 | \|ln r\| > ln 1.5 |
|---|---:|---:|---:|---:|---:|
| 2020 vs 2024 | 540 | 0.982 | **102** | 89 | 54 |
| 2018 vs 2024 | 540 | 0.980 | 110 | 92 | 57 |
| 2020 vs 2025 | 540 | 0.980 | 105 | 90 | 56 |

**Attribution check.** 321 of 542 target PLRs get ≥ 98 % of their crosswalked mass from whole old
PLRs (weight ≥ 0.95), so they are exact. Only 12 of those 321 (3.7 %) are more than 25 % off: real
growth, e.g. Falkenberg 11100102 at weight 0.999, ratio 0.71. Among the 219 split-affected PLRs,
90 (41 %) are more than 25 % off, and 53 more than 50 %. So about 80 of the 102 are the crosswalk
artefact. In all, 615,070 residents (16.3 % of 2020) are apportioned by area across PLR boundaries.

### 3.2 Aggregated grains: counts mostly cancel, except at Ortsteil

| Grain | n | 2020/2024 range | > 25 % off | Residents split across units (2020) |
|---|---:|---|---:|---|
| BZR | 143 | 0.815–1.115 | 0 (2018: 6, 3 by \|r−1\|) | 14,888 (0.39 %), 8 source PLRs split > 5 % |
| PGR | 58 | 0.874–1.039 | 0 | 3,610 (0.10 %) |
| Bezirk | 12 | 0.929–0.996 | 0 | 158 (0.00 %) |
| **Ortsteil** | 95 | **0.707–1.389** | **2** | 48,780 (1.29 %), 7 source PLRs |

- **Bezirk is exact.** Crosswalked 2018/2020 Bezirk totals match the native `lor_pre2021` Bezirk
  sums to within 20 residents (≤ 0.007 %) in every Bezirk. The city total loses 44 residents
  through slivers.
- **BZR and PGR totals are fine** because the mart sums *all* PLRs, including the uninhabited ones.
  So Pankower Tor's 6,295 stay inside BZR 034008. As #371 found, the split *inside* a BZR is wrong
  (the child-set total of 034008 is about 18 % short). That matters only to consumers that weight
  children, not to the mart's totals. The remaining BZRs below 0.86 (092006, 053007, 082006,
  102004, …) are plausibly new-build growth; this was not checked unit by unit.
- **Ortsteil does not cancel.** Ortsteile are not LOR-nested, and their rollup uses dominant-area
  assignment. **1204 Heiligensee** is +39 % (14,571 vs 10,493): old PLR 12224230 (18,099 residents)
  is split 0.50/0.30 by area into Alt-Heiligensee and Heiligensee Nord (9,073/5,498 vs native
  6,704/3,789). 1104 Falkenberg at 0.71 is real growth (identity mapping).

### 3.3 New, more serious: intensive indicators are mis-scaled at every grain

`int_berlin_ewr_plr2021` computes `SUM(indicator_value * weight)` for **all** indicators. It uses
the forward weight (intersection / *pre-2021* PLR area), which sums to 1 per *source*, not per
*target*. Per target, Σ weight ranges from 0.033 to 2.031, and 243 of 542 deviate by more than
2 %. So every share and the mean age of a split target is multiplied by that sum. The C3 sign-off
calls this an "areal-weighted approximation" and names the correct formula
`SUM(value·residents·weight)/SUM(residents·weight)` (C3-crosswalk-geo-signoff.md §3), but the model
does not implement it.

- Pankower Tor 2020: mean age **7.5 years**, under-18 share 2.9 %, male + female share = **0.176**.
  Thermometersiedlung: mean age 10.6. Across PLRs the 2018/2020 mean age ranges from 1.5 to
  100.7 years, and male + female ranges from 0.03 to 2.03. In 227 PLRs it is more than 5 pp off 1.
  (2024/2025: exactly 1.000.)
- Against the correct population-weighted formula (2020, 542 PLRs), the published values correlate
  only at r = 0.32 (residence 5 y), 0.39 (mean age), 0.42 (under 18), 0.65 (migration) and 0.66
  (foreigners). 215–217 PLRs are more than 10 % off.
- **This does not cancel on aggregation**, because the rollups weight by the (areal) counts.
  Bezirk mean age 2020 as published vs native: Pankow 29.1 vs 41.5, Friedrichshain-Kreuzberg 29.0
  vs 38.9, Mitte 31.8 vs 39.5, Charlottenburg-Wilmersdorf 48.7 vs 46.0. Bezirk male + female
  ranges from 0.70 to 1.07.
- The same values feed `int_ewr_socioeco` (z-scores and `ewr_composite` 2014–2020 exist **only** on
  the crosswalked rows). The consumers are listed in §1, last row. The published index marts are not
  affected (they take pre-2021 values from the native path).

## 4. Publisher typo 06200318

It is **still present** in `int_berlin_ewr_plr2021`. In 2024 the mart has a PLR row `06200318`
(residents NULL) and no `06200418` row. `stg_berlin_ewr_age_bands` corrects it (06200418, 0, blank).
The knock-on effect is that 2024 BZR `n_plr` is 8 for 062003 (should be 7) and 5 for 062004
(should be 6). **Not user-visible on pages**: every page renders 2025 (`/berlin/area/06200318` →
404; 06200418 shows 2025 = 0). It is visible only in the downloadable parquet. Counts are
unaffected because the residents are NULL.

## 5. Options

| Option | Fixes | Cost | Methodology / gate |
|---|---|---|---|
| **(a)** Disclosure only (mart schema doc plus a sentence in the demographics section and on the methodology page) | Nothing in the data. It would have to disclose shares that are wrong by up to 12 years of mean age even at Bezirk grain, which is not defensible | ~0.5 d, web + doc | Domain wording check (I19 precedent). Leaves a trap for any future trend chart and for the parquet |
| **(b)** Suppress pre-2021 rows at **PLR and Ortsteil** grain in `mart_area_demographics`; keep BZR/PGR/Bezirk | Counts at BZR/PGR/Bezirk are validated (§3.2). **But it keeps mis-scaled shares at those grains** unless the §3.3 fix lands first, or the pre-2021 rollup shares are also NULLed | ~0.5–1 d: mart filter, a dbt test (no `plr`/`ortsteil` row with year < 2021), header and schema doc, re-export | The mart is not on the R-C1 list, but its I19 domain sign-off governs what is shown. No rendered change today. Consistent with #371 domain condition 1 (no crosswalked PLR count or growth) |
| **(c)** Gated dasymetric crosswalk: w′_st ∝ reverse_weight_st × P2024_t, normalised per source (Eicher & Brewer 2001; Mennis 2003) | PLR counts: Pankower Tor and Landweg → 0, Thermometersiedlung and Heiligensee corrected. With the §3.3 formula, shares too | ~2–4 d: weight model, change `int_berlin_ewr_plr2021` (and the band model), tests, re-run E1 / hypothesis suite / #371 matched panel, re-sign-off | R-C1 dual gate (gated model) plus possibly an ADR-0017-style method note. All inputs are already ingested (no new source). **Anachronism:** 2024 density puts residents on land that was built only after 2008–2020 (new-build quarters); validation against 2024 would be circular. A contemporaneous ancillary source (block-level population, e.g. the Umweltatlas Einwohnerdichte) would be better but **needs an ADR as a new source** |

## 6. Recommendation

1. **File a separate, high-priority, gated issue now for §3.3.** In `int_berlin_ewr_plr2021`,
   compute the intensive indicators as `SUM(x·P·w)/SUM(P·w)`, with P the source PLR's
   `residents_total` (the formula C3 already approved). Keep counts as `SUM(P·w)`. In the same
   change, apply the 06200318 → 06200418 correction (reuse `stg_berlin_ewr_age_bands`' fix) and
   correct the seed's `areal_pop_weighted` label or document it. Then re-run and re-check
   `int_ewr_lead_lag`/E1, the BER modern hypothesis-suite window 2019→2021 (D4 control),
   `int_berlin_turnover_proxy` and the matched panel. This is methodology-bearing: R-C1 dual gate.
2. **For #372 itself, choose (b)**, with a one-line disclosure in the mart schema and the
   methodology page. Suppress pre-2021 **PLR and Ortsteil** rows (not only PLR, given Heiligensee
   +39 %). Keep pre-2021 BZR/PGR/Bezirk **counts**. Publish their shares only after fix 1. Until
   then, NULL them or drop all pre-2021 rows. Since no page renders pre-2021 values, the cost is low
   and nothing visible changes.
3. **Defer (c).** Open it only if a PLR-level pre-2021 series becomes a product need (for example a
   PLR growth or new-build diagnostic). If so, prefer a contemporaneous block-level ancillary
   source (ADR) over 2024 density.

Reproduction scripts (not committed) are in the session scratchpad, `q11.py`–`q20.py`.
