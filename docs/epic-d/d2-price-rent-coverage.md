# D2 — Price/rent source completeness check

Date: 2026-06-29
Status: COMPLETE (partial — D1c Strassenverzeichnis/address-geocoding path pending; Mietspiegel
table seed is complete and queryable)

Checked by: data-analyst
Ticket: #28

---

## Summary table

| Source | Years available | Spatial grain | Signal type | Parquet on disk | Staging rows |
|--------|----------------|---------------|-------------|-----------------|--------------|
| Bodenrichtwerte (D1a) | 2024 only | ~1,621 BRW zones (city-wide) | Land value EUR/m2 | Yes (3.4 MB) | 1,621 |
| Kauffaelle (D1b) | 2024, 2025 (WFS confirmed) | Block-level points, city-wide | Transaction count (no EUR price) | Not yet downloaded | 0 |
| Mietspiegel table (D1c seed) | 2017, 2019, 2021, 2023, 2024, 2026 | Non-spatial (type-table: age x size x wohnlage) | Net cold rent range EUR/m2/month | Committed seed CSV | 635 |
| Wohnlage classification (D1c WFS) | 2023 (downloaded), 2026 (downloaded) | ~397k–400k address points, city-wide | Residential quality tier (einfach/mittel/gut) | Yes (2x 7.3 MB) | 397,542 (2023 only in staging) |

---

## Findings per source

### D1a — Bodenrichtwerte (land reference values)

- **Years ingested:** 2024 only. The WFS endpoint pattern `gdi.berlin.de/services/wfs/brw<YEAR>`
  supports back-series from 2002 (via BORIS Berlin); individual per-year endpoints exist for each
  completed year. Only the 2024 endpoint was ingested as part of D1 work.
- **Row count:** 1,621 BRW polygon zones across Berlin. These are zone-level polygons (not PLR),
  so downstream aggregation to PLR requires spatial join.
- **Spatial coverage:** City-wide. The nutzung breakdown shows 808 residential zones
  (W - Wohngebiet) of the 1,621 total, plus commercial, mixed-use, agricultural and special-use
  zones.
- **Value range:** EUR 0.60 to 60,000/m2 (median 500 EUR/m2, mean 1,132 EUR/m2). The high
  maximum likely reflects premium Mitte/city-centre zones; the low minimum reflects peripheral
  agricultural or special-use land.
- **Signal type:** Structural land price proxy, not a dwelling rental rate. Reflects plot value,
  not what tenants pay.
- **Gaps:** No 2018 vintage ingested (needed for the Epic B directional revival comparison).
  Historical endpoints for 2017 or 2018 should be discoverable at
  `gdi.berlin.de/services/wfs/brw2018`; this has not been verified. The back-series question
  was flagged as an open question in ADR-0003 (item 5) and remains unresolved.
- **Licence:** dl-de-zero-2.0 (attribution committed in source_attribution column).
- **PLR join:** Not yet done. BRW zones do not align to PLR boundaries; spatial overlay
  aggregation is required before use in the gentrification index.

### D1b — Kauffaelle (property transactions)

- **Years available:** 2024 and 2025 confirmed live at `gdi.berlin.de/services/wfs/kauffaelle_<YEAR>`.
  No WFS endpoint exists for any year prior to 2024 under this URL pattern. This is the
  definitive temporal gap: the source simply does not provide open pre-2024 transaction data.
- **Row count in warehouse:** 0. The ingestion script is implemented and ready but the parquet
  files have not been downloaded. The staging model (`stg_berlin_verkaufte_grundstuecke`) is a
  zero-row typed stub until the ingest runs.
- **Critical finding — no EUR price attributes:** The public WFS exposes only `id` (string) and
  `kauftyp` (string) plus a Point geometry for all 9 sub-market layers. No kaufpreis (EUR price)
  or flaeche (area) attributes are present. Detailed pricing sits behind the fee-based
  Kaufpreissammlung, which is not open. The `kaufpreis_eur` and `flaeche_m2` columns in the
  schema are present but will be null for all ingested rows. This is confirmed and documented in
  ADR-0003 Amendment P-D (cleared condition 1, 2026-06-29).
- **Implication:** Kauffaelle is a **transaction-count / market-churn layer only** (dynamism
  predictor per Smith rent-gap theory). It cannot function as a price signal. Bodenrichtwerte
  remains the only price proxy in the D1 set.
- **Sub-market layers:** 9 per year. The two primary gentrification-relevant layers are
  `c_eigentwhg` (condominium sales) and `i_mehrfamhaus` (multi-family building sales).
- **Spatial grain:** Block-level anonymised points (not PLR). Block-to-PLR aggregation requires
  a spatial join; the methodology for this (ST_Within point-in-polygon, per-PLR count,
  left-join to zero-fill) has geo-DS and domain-expert sign-off with conditions — see
  `docs/epic-d/d1b-kauffaelle-geo-signoff.md` and `docs/epic-d/d1b-kauffaelle-domain-signoff.md`.
- **Temporal coverage gap for D3:** The gentrification index time series runs from at least 2009
  (EWR / OSm-POI data). Kauffaelle only contributes from 2024 onward. It cannot be used as a
  retrospective index component but can be used as a current-period dynamism supplement.
- **Licence:** dl-de-zero-2.0.

### D1c — Mietspiegel (rent index)

This source has two sub-components with very different readiness states.

#### D1c-a — Mietspiegeltabelle (rent table seed, transcribed from PDFs)

- **Status: Complete and queryable.** The `berlin_mietspiegel` seed is committed to the repo and
  surfaced via `stg_berlin_mietspiegel`.
- **Vintages in seed:** 2017, 2019, 2021, 2023, 2024, 2026 — six editions covering the
  Stichtage 01.09.2016 through 01.09.2025.
- **Total rows:** 635 (635 table cells across all vintages).
- **Spatial grain:** Non-spatial. The table is a (vintage x year_built_bucket x size_bucket x
  wohnlage) matrix. It has no geometry; spatial assignment requires the Wohnlage WFS (D1c-b)
  to assign each address a wohnlage tier.
- **Dimensions:** 4 size buckets (under_40, 40_to_60, 60_to_90, 90_plus) x 3 wohnlage tiers
  (einfach, mittel, gut) x 8–12 construction-year buckets (varies by edition).
- **Cell fill rate per vintage:**
  - 2017: 92/96 = 96% (4 sparse cells missing: 1991_2002 under_40 einfach/gut;
    2003_2015 under_40 mittel/gut — thin strata in the original PDF)
  - 2019, 2021, 2023: 89/96 = 93% (7 cells missing per vintage: same under_40 sparse
    strata for 1991_2002 and 2003_2017, plus 1950_1964 90_plus einfach)
  - 2024: 132/132 = 100% (expanded schema with finer construction-year splits)
  - 2026: 144/144 = 100% (one additional construction-year bucket: 2020_2024)
- **Schema change note:** The 2024 edition split the old `1973_1990_west` bucket into
  `1973_1985_west` and `1986_1990_west`, and split `1991_2002` into `1991_2001` and
  `2002_2009` (plus finer recent buckets). Marts joining across vintages must handle this
  bucket heterogeneity.
- **1973_1990_west/_ost split:** Only the 2017 edition separates West Berlin from
  East Berlin Wendewohnungen for this construction period. The 2019+ editions merged these.
  Handle in mart logic.
- **Licence note:** The Mietspiegeltabelle PDFs do not carry an explicit machine-readable
  open-data licence (unlike the Wohnlagen WFS). The repo commits only re-transcribed numeric
  values; PDFs are not redistributed. This is the "soft spot" noted in ADR-0003.

#### D1c-b — Wohnlage WFS (address-level residential quality classification)

- **Status: Partially ingested.** Two vintages downloaded and on disk; one in the dbt staging
  model.
- **Downloaded vintages:** 2023 (397,542 address points) and 2026 (400,505 address points).
  The dbt staging model `stg_berlin_wohnlage` currently reads only the 2023 parquet (hardcoded
  path). The 2026 parquet is on disk but not yet wired into a staging view.
- **Wohnlage distribution (2023):** einfach 111,644 (28%), mittel 213,081 (54%), gut 72,817
  (18%). Total 397,542 addresses.
- **Available vintages not yet ingested:** 2017 (Stichtag 01.09.2016), 2019 (Stichtag
  01.09.2018), 2021 (Stichtag 01.09.2020) — these are confirmed live on GDI Berlin
  (`wohnlagenadr2017`, `wohnlagenadr2019`, `wohnlagenadr2021`). Each takes 5–15 minutes to
  download (~397k features / 796 pages).
- **D1c blocker (#56 still open):** The Strassenverzeichnis PDF parsing and full
  address-geocoding path (to join the Mietspiegeltabelle to spatial units) is not yet
  implemented. The combination of Mietspiegeltabelle + Wohnlage addresses allows assigning a
  specific rent range to each address, but the D3 aggregation model that does this join
  is a D3 deliverable and depends on the D1c WFS being fully ingested (all vintages).
- **Spatial grain:** ~397k–400k individual address points (MultiPoint WKB, EPSG:25833),
  city-wide. PLR coverage should be complete since the Wohnlage dataset is the Senate's
  city-wide classification, but PLR-level completeness has not been formally checked.
- **Licence:** dl-de-zero-2.0.

---

## Gaps and blockers

### Hard data gaps

1. **Bodenrichtwerte back-series (2018 vintage missing).** D1a only has 2024. A 2018 vintage
   is needed for the Epic B directional comparison. The `brw2018` WFS endpoint pattern likely
   exists but has not been probed. Unblocking requires running the ingestion script against
   `https://gdi.berlin.de/services/wfs/brw2018` and adding a `bodenrichtwert_2018.parquet`
   alongside the 2024 file. The staging model needs to be updated to support multiple years.

2. **Kauffaelle parquets not downloaded.** The ingestion script exists and is ready; no data
   on disk yet. Run `uv run python ingestion/berlin/price_rent/ingest_kauffaelle.py --out-dir
   data/raw/berlin/price_rent` to populate. This is a run-time gap, not a code gap.

3. **Kauffaelle temporal gap (pre-2024 structurally missing).** No open WFS exists for property
   transactions before 2024. This is a hard upstream gap — there is no workaround within the
   free + open constraint. Kauffaelle can only contribute to present-day (2024+) analyses.

4. **Wohnlage vintages 2017, 2019, 2021 not ingested.** These are needed for longitudinal
   rent-level estimation (matching each EWR vintage year with the contemporaneous Wohnlage).
   The ingest script supports all three years via `--year` flag; each run takes 5–15 minutes.

5. **stg_berlin_wohnlage is hardcoded to 2023.** The 2026 parquet is on disk but not exposed
   in the staging view. The model needs to be updated to union all available vintages (or to
   accept a year parameter), paralleling the multi-year pattern used in stg_berlin_verkaufte_grundstuecke.

### Blocker: D1c (#56 open)

The Strassenverzeichnis PDF parsing and the full address-to-PLR geocoding pipeline for the
Mietspiegel are not yet implemented. Until this is done:
- The Mietspiegeltabelle seed is queryable but is non-spatial (city/Berlin-wide market
  averages only).
- Spatial assignment of rent ranges to PLRs requires Wohnlage WFS (available) + a PLR
  point-in-polygon count join (D3 work). The Strassenverzeichnis provides the street-level
  address register that cross-walks addresses to PLRs, but it is not strictly required for a
  count-based Wohnlage-per-PLR aggregation — that can be done from the WFS geometry alone.
  The main D1c gap is therefore the missing historical Wohnlage vintages (2017, 2019, 2021),
  not the Strassenverzeichnis itself.

### Methodology conditions binding on D3

- ADR-0003 Amendment P-D, condition 2 (geo-DS PASS WITH CONDITIONS, 2026-06-29): 8 spatial
  conditions for the block-to-PLR Kauffaelle aggregation model must be satisfied in D3.
- ADR-0003 Amendment P-D, condition 1 (domain-expert PASS WITH CONDITIONS, 2026-06-29): 7
  conditions for labelling, segment legibility, temporal disclosure, and causal framing of
  the Kauffaelle dynamism indicator must be satisfied in D3 and G2.

---

## Implications for D3 (index extension)

1. **Price signal for D3 = Bodenrichtwerte only (for now).** The single ingested price proxy
   is the 2024 Bodenrichtwerte land value. Kauffaelle adds transaction-count dynamism (not
   price). Mietspiegel adds a rent benchmark but not a spatially-resolved area-level rent
   series until D1c is completed. Before D3 can build a price/rent dimension into the index,
   either: (a) the 2018 BRW vintage must be ingested and the staging model updated for
   multi-year support, or (b) scope must be limited to the 2024 cross-section only.

2. **Wohnlage-per-PLR aggregation is unblocked for 2023.** The 2023 Wohnlage parquet has
   397,542 address points. A point-in-polygon aggregation to count einfach/mittel/gut
   addresses per PLR can be run in D3. This gives a 2023 Wohnlage composition per PLR which,
   when combined with the Mietspiegel rent table, yields an estimated PLR-level rent range.

3. **Temporal span mismatch.** The EWR socio-economic series runs from ~2009. Bodenrichtwerte
   starts at 2024 (as ingested). Wohnlage is available from 2017 onward (once remaining
   vintages are ingested). Kauffaelle starts at 2024. The price/rent dimension will therefore
   be structurally limited to a cross-sectional analysis (2023/2024) unless BRW back-series
   ingestion is added to D1a scope.

4. **Mietspiegel table is a city-wide benchmark, not an area-level signal.** The seed contains
   market-level averages for all of Berlin. It can indicate how rents shifted over time
   (2017 to 2026 trajectories by housing type) and can be used as a multiplier when a PLR's
   Wohnlage composition is known, but it cannot on its own say "rent in Neukolin PLR X is Y
   EUR/m2." The spatial assignment step (Wohnlage WFS + point-in-polygon to PLR) is the
   critical bridge for D3.

5. **Kauffaelle can serve as a 2024-only dynamism supplement.** Once the parquets are
   downloaded and the block-to-PLR aggregation model is built per D3 conditions, transaction
   counts by teilmarkt (especially c_eigentwhg condominiums) can flag PLRs with high ownership
   turnover in 2024–2025 as a present-day dynamism signal, consistent with the Smith rent-gap
   and Dangschat invasion-succession framing approved in the methodology gate.
