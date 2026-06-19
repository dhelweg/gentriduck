[A3] Ingest Berlin MSS (Monitoring Soziale Stadtentwicklung) Status/Dynamik index

## Why (problem)
The single most authoritative open dataset for this exact problem is missing. Berlin's official
**Monitoring Soziale Stadtentwicklung (MSS)** publishes, per Planungsraum, a **Status index** and a
**Dynamik index** (and a 12-cell Status×Dynamik typology) built from unemployment (SGB II), transfer
benefits and child poverty. It is:
- the **outcome variable the 2018 thesis actually used** (`status_index`/`dynamik_index` in the golden);
- **open** (CC BY / dl-de, via FIS-Broker / fbinter.stadt-berlin.de) and **current** (reports 2021, 2023, 2025);
- the obvious **ground truth** for validating the live index (see B2).

The revival currently substitutes a demographic composite (`int_ewr_socioeco.sql`) with no SES content.

## Goal
MSS Status/Dynamik indices (and their context indicators where available) ingested, staged, and available as
the social-status outcome for A1/A2/B2 — multi-year, city-agnostic per ADR-0005.

## Scope & approach
1. **ADR first** (golden rule #1/#2): architect writes/extends an ADR for the MSS source (endpoint, license,
   vintages, attribution). Likely FIS-Broker WFS layers (e.g. `MSS_<year>`) and/or daten.berlin.de CSVs.
   Confirm license is open and login-free.
2. Ingestion `ingestion/berlin/mss/ingest_mss.py` following the existing EWR/price patterns
   (`ingestion/berlin/ewr/ingest_ewr.py`): download per MSS edition, normalize German number formats, output
   parquet to `data/raw/berlin/mss/`. Handle the 2021 LOR vintage and the <300-resident exclusions MSS applies.
3. Staging `stg_berlin_mss` (per-PLR Status index value+class, Dynamik index value+class, vintage, year),
   mapped to `dim_area`/`dim_city`. Add `_sources.yml` + schema tests (not_null, accepted_values for classes,
   freshness).
4. Intermediate model exposing the MSS social status/dynamik as the index **outcome** for A1.

## Acceptance criteria
- ADR merged; source confirmed free/open/login-free.
- `stg_berlin_mss` builds with tests; covers the available MSS editions (≥ 2013…2025 as published).
- Class values reconcile to MSS published counts for at least one edition (spot-check a few PLRs).
- Available as an outcome for A1 and a back-test target for B2; `uv run poe build` green.

## Gate / sign-off
New data source → architect ADR + maintainer OK. Methodology relevance → geo-DS/domain-expert review.

## Dependencies / relations
Feeds A1, A2, B2. Pairs with A4 (SES building blocks). Uses the #51 crosswalk for cross-vintage continuity.

## References
- MSS reports: berlin.de/sen/sbw/stadtdaten/stadtwissen/monitoring-soziale-stadtentwicklung/
- FIS-Broker layer description: fbinter.stadt-berlin.de/fb_daten/beschreibung/MSS/
- `docs/assessment/2026-06-19-pm-architect-review.md` §2.1, §2.5, §4
