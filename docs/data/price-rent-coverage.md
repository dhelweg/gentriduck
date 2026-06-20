# Price/Rent Data Coverage — D2 Source Completeness Check (Issue #28)

**Date:** 2026-06-20
**Author:** data-analyst
**Closes:** #28 (Epic D — D2 source completeness/coverage check)

**Scope note:** "D2" in this document refers to the Epic D task (price/rent as a model
dimension), not the index dimension labelled D2 (MSS Dynamik-Index) in the R-A1 re-grounding.
The two naming schemes collided when R-A1 claimed D1-D4 slots. This document uses "Epic-D price/rent
dimension" to avoid ambiguity.

---

## 1. Mietspiegel (Berliner Mietspiegeltabelle + Wohnlagen)

### What is ingested

The Mietspiegel has two separate sub-sources, both ingested.

**a) Mietspiegeltabelle — rent-level matrix**

Published every two years (biennial until 2024, then annual). The dbt seed
`transform/seeds/berlin_mietspiegel.csv` contains 635 rows derived from PDF extraction
(`ingestion/berlin/mietspiegel/ingest_mietspiegel.py`). Staged by `stg_berlin_mietspiegel`.

| Vintage | Stichtag | Rows in seed | Year-built buckets |
|---|---|---|---|
| 2017 | 2016-09-01 | 92 | pre_1918, 1919_1949, 1950_1964, 1965_1972, 1973_1990_west, 1973_1990_ost, 1991_2002, 2003_2015 |
| 2019 | 2018-09-01 | 89 | same scheme as 2017, slight bucket rename |
| 2021 | 2020-09-01 | 89 | same as 2019 |
| 2023 | 2022-09-01 | 89 | same as 2021 |
| 2024 | 2023-09-01 | 132 | 2024 splits 1973-1990 into West sub-buckets + adds 2016_2022 |
| 2026 | 2025-09-01 | 144 | 2026 further splits newest bucket into 2016_2019 / 2020_2024 |

Row dimensionality: `vintage x year_built_bucket x size_bucket x wohnlage`.
Size buckets: under_40, 40_to_60, 60_to_90, 90_plus.
Wohnlage tiers: einfach, mittel, gut.
Fields per cell: rent_low, rent_mid, rent_high (EUR/m2/month, net cold rent).

**b) Wohnlagen nach Adressen — location tier per address**

Published alongside each Mietspiegel edition. Ingested from GDI Berlin WFS
(`ingestion/berlin/price_rent/ingest_wohnlage.py`). Approximately 397,000-401,000 address-level
point features per vintage. Staged by `stg_berlin_wohnlage`.

| Vintage | WFS confirmed | Download status (as of 2026-06-18) |
|---|---|---|
| 2017 | Yes | Pending (script supports it; not yet run) |
| 2019 | Yes | Pending |
| 2021 | Yes | Pending |
| 2023 | Yes | Complete (397,542 rows) |
| 2024 | Yes | Pending |
| 2026 | Yes | Complete (400,505 rows) |

Attributes: wohnlage (einfach/mittel/gut), address_id (schluessel), geometry MultiPoint EPSG:25833.
Licence: dl-de-zero-2.0.

### Geographic level

Both sub-sources are **not at PLR level natively**.

- The Mietspiegeltabelle operates at the city-wide level: it publishes one value matrix for all of
  Berlin, stratified by wohnlage tier (not by PLR). There is no per-PLR rent figure in the table.
- The Wohnlagen data is at address-point level. A PLR-level wohnlage share can be derived by spatial
  join of the address points to PLR polygons — this is planned as task D1c (#56,
  Strassenverzeichnis crosswalk), not yet implemented.

The combination of a) + b) allows constructing a **per-PLR estimated rent range**: assign each PLR
a weighted wohnlage distribution from the address points, then look up the corresponding table cell.
This is an indirect PLR-level signal, not a direct observation.

### Known issues

- The PDF ingestion script (`ingest_mietspiegel.py`) has a parser bug for the 2017-2023 single-table
  layout (produces 0 rows from the PDF). The seed data is correct because it was extracted ad hoc;
  the script-based parquet output would need the single-table parser branch fixed (D1 tech debt,
  noted in handoff 2026-06-18). The committed seed itself is the authoritative source for dbt.
- The D1c crosswalk (address-to-PLR spatial join) has not been built. Until it is, there is no
  PLR-level wohnlage share in the warehouse.

---

## 2. Bodenrichtwerte (Land Reference Values)

### What is ingested

Published annually by the Gutachterausschuss fur Grundstuckswerte in Berlin. Ingested from GDI
Berlin WFS via `ingestion/berlin/price_rent/ingest_bodenrichtwerte.py`. Staged by
`stg_berlin_bodenrichtwert`.

| Vintage | WFS endpoint | Availability | Download status |
|---|---|---|---|
| 2020 | gdi.berlin.de/services/wfs/brw2020 | Confirmed available | Not yet run |
| 2022 | gdi.berlin.de/services/wfs/brw2022 | Confirmed available | Not yet run |
| 2023 | gdi.berlin.de/services/wfs/brw2023 | Confirmed available | Not yet run |
| 2024 | gdi.berlin.de/services/wfs/brw2024 | Confirmed available | Not yet run |

The script currently targets 2024 only and lacks a `--year` parameter. Historical runs require
parametrizing the script first (open item noted in handoff 2026-06-18). Coverage going back to 2002
is documented in ADR-0003 (via BORIS Berlin / annual WFS pattern), but endpoints before 2020 have
not been probed from code.

### Geographic level

Bodenrichtwerte are published as **polygon zones** (BRW zones — Bodenrichtwertzone), not as PLR
areas. A BRW zone reflects a homogeneous land-use and value area as determined by the assessors; its
boundaries do not align with LOR PLR boundaries. To use Bodenrichtwerte at PLR level requires a
spatial overlay (area-weighted average of zone values within each PLR). This overlay has not been
implemented.

### Fields

reference_date (2024-01-01), geometry_wkb (MultiPolygon, EPSG:25833), brw_id, value_eur_per_m2,
nutzung (land use code, e.g. "W - Wohngebiet").

Land use filtering is required: for residential gentrification analysis, only "W - Wohngebiet" zones
are relevant. Non-residential zones (commercial, industrial) would distort a PLR average.

Licence: dl-de-zero-2.0.

### Known limitations

- Bodenrichtwert is a **land value** (EUR/m2 of plot), not a dwelling or rent price. It is a
  structural investment-climate signal, not what tenants pay. ADR-0003 records this explicitly.
- Pre-2020 temporal coverage from code is unverified. BORIS documents availability from 2002, but
  the WFS endpoint naming pattern needs confirming per year before backfilling.
- The Verkaufte Grundstuecke (actual transaction prices, D1b / #53) WFS returned HTTP 404 during
  D1 implementation and remains a stub with zero rows. That data would complement Bodenrichtwerte
  with actual sale prices but is currently unavailable.

---

## 3. Gap Analysis

### Temporal gaps

| Source | Years with data in warehouse | Gap relative to EWR/MSS series |
|---|---|---|
| Mietspiegeltabelle (seed) | 2017, 2019, 2021, 2023, 2024, 2026 | Missing 2008-2015; biennial gaps between editions |
| Wohnlagen WFS | 2023, 2026 (two of six vintages downloaded) | 2017, 2019, 2021, 2024 not yet downloaded |
| Bodenrichtwerte | None yet in warehouse | 2020-2024 confirmed but not ingested |

The MSS (outcome) series runs from 2013 to 2025 in two-year intervals. The EWR (predictor) series
runs from approximately 2008 to 2024 annually. Price/rent data as currently ingested has no overlap
at all with either series for Bodenrichtwerte, and only biennial overlap with MSS for Mietspiegel.

Earliest potential alignment after ingestion: Mietspiegel 2017 (Stichtag 2016-09-01) could align
with MSS 2017 and EWR 2016/2017. Bodenrichtwerte 2020-2024 would align with MSS 2021/2023/2025.

### Geographic (PLR-level) gaps

Neither source publishes data at PLR granularity natively:

- **Mietspiegeltabelle**: city-wide matrix; PLR-level assignment requires the D1c wohnlage crosswalk
  (address-to-PLR spatial join), which is not yet built. Without it, every PLR receives the same
  city-wide table cell for its wohnlage tier — no spatial variation within a tier.
- **Bodenrichtwerte**: polygon zones with non-PLR boundaries. PLR-level values require a spatial
  overlay with area-weighted averaging. Not yet implemented.
- **Wohnlagen**: address-level points that could support a PLR wohnlage share if spatially joined
  to LOR polygons. This join is the prerequisite for making the Mietspiegeltabelle spatially
  variable at PLR level.

In practical terms: **no price/rent signal at PLR level currently exists in the warehouse**.

### Completeness of the instrument

The Mietspiegel's table cells can be sparse where the survey sample is thin: cells with fewer than
50 sampled dwellings in the relevant stratum are either suppressed (marked with asterisks) or have
wide inter-quartile spans. Very old or very new construction in non-standard wohnlage combinations
may have no cell value. This is not tracked in the current seed; cells are assumed populated.

---

## 4. Usability Verdict

**Bodenrichtwerte** — not usable as a predictor in the lead-lag model in the current state.
The data has not been ingested; no PLR-level spatial overlay exists; and once ingested, it would
provide only four annual snapshots (2020-2024), which is too sparse for lead-lag testing that
requires a multi-year gap between predictor and outcome observation. As a cross-sectional control in
a single-year model it is feasible once the spatial overlay is built. Structural signal only (land
value, not rent).

**Mietspiegeltabelle** — usable only as a coarse control variable in its current form. The biennial
series (2017-2026) aligns partially with MSS editions. However, because there is no PLR-level spatial
variation in the table (all PLRs with the same wohnlage tier receive the same value), it cannot
distinguish between PLRs within a tier. It is more accurately described as a city-level rent trend
control than a PLR-level predictor. Its main analytical use for Epic D is to contextualize rent
trends over time (e.g. "how much did the city-wide median rent for pre-1918 stock in middle-tier
wohnlage change between 2017 and 2023?") rather than to drive PLR-level variation.

**Wohnlagen** — once the D1c spatial join is built and all six vintages are downloaded, wohnlage
shares per PLR become available. This is the prerequisite for making Mietspiegel a PLR-varying
signal. The two downloaded vintages (2023, 2026) are already sufficient to construct a single
cross-sectional PLR wohnlage profile; historical profiles require the pending downloads.

**Overall:** In its current state the Epic-D price/rent dimension is not ready to extend the lead-lag
model. It can serve as a cross-sectional descriptive control.

---

## 5. Recommended Next Steps

Listed in priority order for getting to a usable D5 displacement/affordability slot (per R-B1 #70)
or a price/rent covariate in the lead-lag:

1. **Run the Bodenrichtwerte ingestion** (parametrize `ingest_bodenrichtwerte.py` with `--year`,
   run for 2020, 2022, 2023, 2024). Estimated ~15 minutes per vintage. Probes whether pre-2020
   WFS endpoints are accessible.

2. **Download the four missing Wohnlagen vintages** (2017, 2019, 2021, 2024 via
   `ingest_wohnlage.py --year <Y>`). Each run takes 5-15 minutes. These are already scripted and
   confirmed on the WFS.

3. **Build the D1c Wohnlagen-to-PLR crosswalk** (#56): spatial join of Wohnlagen address points
   to LOR PLR polygons, producing a PLR-level wohnlage share per vintage. This is the prerequisite
   for any PLR-level rent signal from the Mietspiegel. Methodology gate applies (spatial method).

4. **Build the Bodenrichtwerte-to-PLR spatial overlay**: area-weighted average of BRW zone values
   within each PLR polygon, filtered to nutzung = "W - Wohngebiet". Methodology gate applies.

5. **Minimum viable price/rent signal for D3/lead-lag model**: with steps 1-4 complete, a PLR-level
   wohnlage-weighted median rent (from Mietspiegeltabelle x wohnlage share) and a PLR-level BRW
   estimate would be available for 2017/2019/2021/2023/2024. This is enough for a cross-sectional
   regression control but still sparse for a panel lead-lag test.

6. **Honest labelling**: any model incorporating Mietspiegel or Bodenrichtwerte should document
   that (a) the Mietspiegel signal is a lookup from survey-estimated market ranges, not direct
   observation of contracted rents; (b) Bodenrichtwerte is a land value, not a dwelling price;
   (c) neither captures tenant displacement directly. The rent-gap and displacement constructs
   (R-B1 #70) require additional data not yet available (e.g. Milieuschutzgebiete boundaries,
   rent-burden estimates).

---

## Sources

- Ingestion scripts: `ingestion/berlin/mietspiegel/ingest_mietspiegel.py`,
  `ingestion/berlin/price_rent/ingest_bodenrichtwerte.py`,
  `ingestion/berlin/price_rent/ingest_wohnlage.py`
- Staging models: `transform/models/staging/stg_berlin_mietspiegel.sql`,
  `transform/models/staging/stg_berlin_bodenrichtwert.sql`,
  `transform/models/staging/stg_berlin_wohnlage.sql`
- Seed: `transform/seeds/berlin_mietspiegel.csv` (635 rows, 6 vintages)
- ADR-0003: Berlin geographies and open price/rent sources
- Session handoff: `docs/handoff/2026-06-18-c3b-ewr-series.md` (Bodenrichtwerte historical note)
- Index definition: `docs/methodology/index-definition.md` (D5 displacement slot, deferred)
