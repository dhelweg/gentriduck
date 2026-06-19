# ADR-0006: Berlin MSS (Monitoring Soziale Stadtentwicklung) data source

- **Status:** Accepted
- **Date:** 2026-06-19

## Context

The **Monitoring Soziale Stadtentwicklung (MSS)** is the Berlin Senate's official
small-area social monitoring system, maintained by the **Senatsverwaltung für
Stadtentwicklung, Bauen und Wohnen (SenSBW)** and produced regularly since 1998. It
classifies every **Planungsraum (PLR)** — the finest level of the Berlin LOR hierarchy
(see ADR-0003) — by two indices:

- a **Status-Index** (the current social situation: 4 classes — *hoch / mittel /
  niedrig / sehr niedrig*), and
- a **Dynamik-Index** (the recent direction of change: 3 classes — *positiv / stabil /
  negativ*).

The two combine into a **Gesamtindex sozialer Ungleichheit / Status-Dynamik-Index**
(12 groups) per PLR. The indices are computed from a small set of **index indicators**
(unemployment, transfer-benefit receipt, child poverty, and — from 2023 — children/youth
in single-parent households), plus a larger set of ~17–20 **context indicators**.

**Why we need it.** The MSS Status/Dynamik index is the **primary ground-truth outcome
variable** for the gentrification revival. The 2018 thesis used the MSS social-status
measure as its main proxy for the social-status change that gentrification represents.
Without it we have inputs (EWR socio-demographics, OSM commercial development, Mietspiegel
rents — all already ingested) but no governed, official **outcome** to re-ground the
gentrification index against. R-A3 (#66) ingests it; R-A1 then re-grounds the index on it.

**What it publishes.** One edition roughly every two years, at PLR grain:

| Edition | Observation window (data status) | Index indicators | LOR scheme / PLR count |
|---|---|---|---|
| MSS 2013 | … | 3 | pre-2021 LOR |
| MSS 2015 | … | 3 | pre-2021 LOR |
| MSS 2017 | … | 3 | pre-2021 LOR (447) |
| MSS 2019 | 31.12.2016 – 31.12.2018 | 3 | **2017 LOR, 447 PLR** |
| MSS 2021 | 31.12.2018 – 31.12.2020 | 3 | **LOR 2021, 542 PLR** |
| MSS 2023 | 31.12.2020 – 31.12.2022 | 4 | LOR 2021, 542 PLR |
| MSS 2025 | 31.12.2022 – 31.12.2024 | 4 | LOR 2021, 542 PLR |

The biennial cadence and the two-snapshot observation window are intrinsic: the Dynamik
index *is* a change measure over the window, so each edition already encodes the
direction-of-change information the thesis cares about.

This is a **new source** not covered by ADR-0003 (which scoped LOR geometry, EWR
socio-demographics, and price/rent). It reuses ADR-0003's `gdi.berlin.de` WFS channel and
the same `dl-de-zero-2.0` licence family, so the access pattern is already familiar to the
ingestion adapter.

Constraints this ADR must respect (per `CLAUDE.md`, ADR-0001):

- **Free + open only**; no signup-gated or paid access.
- **Cross-platform**: HTTP-pullable formats (WFS/GeoJSON/CSV) over OS-specific exports.
- **City-agnostic seam (ADR-0005)**: Berlin "PLR" must not leak into shared marts; the MSS
  adapter lives under `ingestion/berlin/…` and stages to `stg_berlin_mss`, mapping onto
  generic `dim_area` (`subarea_l3`) downstream.

## Decision

**Adopt the official Geoportal Berlin WFS (`gdi.berlin.de/services/wfs/mss_<YEAR>`) as the
primary, canonical source for MSS Status/Dynamik data, ingested per edition.**

1. **Access method: per-edition WFS.** Each edition is published as a distinct WFS service
   following a stable, predictable URL pattern:

   ```
   https://gdi.berlin.de/services/wfs/mss_<YEAR>
   ```

   with feature types following the pattern (confirmed for 2025; analogous per year):

   - `mss_<YEAR>:mss<YEAR>_indizes_<N>` — **the Status, Dynamik and Gesamtindex per PLR**
     (this is the load-bearing layer for R-A3),
   - `mss_<YEAR>:mss<YEAR>_indexind_<N>` — the underlying index indicators per PLR,
   - `mss_<YEAR>:mss<YEAR>_unbewohnt` — uninhabited-area overlay (not ingested),

   where `<N>` is the PLR count for that edition's LOR scheme (447 pre-2021, 542 from 2021).
   The service is WFS 2.0.0, default CRS EPSG:25833, and supports GeoJSON / GML / GeoPackage
   output — pure HTTP, cross-platform, no login. This is the **same WFS channel and the same
   adapter mechanics already approved in ADR-0003** for LOR geometry and Bodenrichtwerte.

2. **Editions ingested.** All editions reachable as WFS — at minimum **2019, 2021, 2023,
   2025**, plus **2013/2015/2017** where a WFS service exists (older editions may only be
   available as WMS or as report PDFs; see Consequences). Per R-A3 the target span is
   **~2013–2025**, accepting that the earliest editions may be partial.

3. **The `indizes` layer is primary.** R-A3 ingests the Status/Dynamik/Gesamtindex layer as
   the outcome variable. The `indexind` (index-indicator) layer is ingested as a secondary,
   nice-to-have for transparency/cross-checking but is **not** required for R-A1
   re-grounding. Context indicators are out of scope for now.

4. **Persist a frozen local snapshot** per edition as Parquet under
   `data/raw/berlin/mss/mss_<YEAR>.parquet` (gitignored, ADR-0001/A8), rebuilt via
   `uv run poe ingest`. Geometry is not load-bearing for the index outcome (the PLR key
   joins to `stg_berlin_lor` geometry), so the adapter may drop geometry and keep
   `(edition, plr_id, status_index, dynamik_index, gesamtindex, …)` — but should retain the
   PLR key and `plr_name` for joinability. dbt staging reads only from `data/raw/`.

5. **Staging table `stg_berlin_mss`.** One row per `(edition, plr_id)` with the official
   Status class, Dynamik class, and combined Gesamtindex group, plus the LOR vintage tag so
   downstream joins pick the contemporaneous boundary. Berlin-specific column names
   (`PLR_ID`, `STATUSINDEX`, …) stay in the adapter; marts see generic `dim_area`
   (`subarea_l3`) joined on `(city='berlin', vintage, area_id)`.

6. **Reconcile to published counts.** Per R-A3, the DE pair validates each ingested edition
   against the official **MSS report** for that year (the Senate publishes a class-distribution
   table — counts of PLR in each Status class, Dynamik class, and Gesamtindex group). A dbt
   test asserts the per-edition class counts match the published report within tolerance; a
   row-count test asserts 447 PLR for pre-2021 editions and 542 for 2021+.

7. **Licence: Datenlizenz Deutschland – Zero – 2.0 (`dl-de-zero-2.0`).** Confirmed on the
   2019, 2023 and 2025 dataset pages. No attribution is legally required, but we credit
   **"Senatsverwaltung für Stadtentwicklung, Bauen und Wohnen Berlin — Monitoring Soziale
   Stadtentwicklung <edition>"** in the source-attribution row for the G3 attribution wall,
   consistent with ADR-0003's data-driven attribution approach.

This satisfies all R-A3 acceptance criteria: free + open licence, no registration,
Python-ingestible via HTTP, and PLR grain.

## Alternatives considered

### A — Per-edition WFS (`gdi.berlin.de/services/wfs/mss_<YEAR>`) — **CHOSEN**

- **Licence:** `dl-de-zero-2.0`. **Login:** none. **Format:** WFS 2.0.0, GeoJSON/GML/
  GeoPackage. **Grain:** PLR, exactly what R-A3 needs.
- Machine-readable, attribute-complete (Status/Dynamik/Gesamtindex are first-class fields),
  and reuses the ADR-0003 adapter mechanics. Strongest fit.

### B — daten.berlin.de WMS layers (`…/services/wms/mss_<YEAR>`)

- WMS is a **map-rendering** service: it returns pixels, not feature attributes. Some
  editions (e.g. MSS 2025 on the portal) link only the WMS dataset page. **Rejected as
  primary** — we need the index *values* per PLR, not a styled image. Note: in practice the
  matching **WFS service still exists** even when only WMS is linked from the portal (verified
  for 2025: `gdi.berlin.de/services/wfs/mss_2025` returns full capabilities with the
  `indizes_542` feature type). So WMS-only portal listings do **not** block Option A; the
  adapter probes the WFS URL pattern directly.

### C — MSS report PDFs (berlin.de `…/monitoring-soziale-stadtentwicklung/bericht-<YEAR>/`)

- The authoritative human-readable report; carries the **class-distribution tables** we
  reconcile against (Decision 6). **Not the ingestion path** — PDF tables are brittle to
  parse and we should not redistribute the PDF. Used as the **validation reference** and a
  fallback for any pre-2019 edition that has no WFS service (re-tabulate the small
  class-count table into a seed, as ADR-0003 does for the Mietspiegeltabelle).

### D — FIS-Broker technical-description / fbinter exports

- The older `fbinter.stadt-berlin.de` MSS pages and technical-description PDFs predate the
  `gdi.berlin.de` migration. **Fallback only** for editions not yet migrated to the modern
  WFS, consistent with ADR-0003's treatment of legacy FIS-Broker.

### X — Any paid / proprietary / signup-gated MSS redistribution — **REJECTED**

- Out of scope by rule. The official open data fully covers the need; no third party is
  required.

## Consequences

- **Grain & coverage.** `stg_berlin_mss` is `(edition, plr_id)` → Status class, Dynamik
  class, Gesamtindex group. Target coverage ~2013–2025 (4 firm WFS editions 2019–2025;
  2013–2017 best-effort via WFS, else report-table seed). One observation per edition; each
  edition already encodes a 2-year change window in its Dynamik index.

- **Boundary-vintage break is the key caveat.** Editions **through 2019 use the 2017 LOR
  scheme (447 PLR)**; editions **2021 onward use LOR 2021 (542 PLR)**. This is the same
  pre-2021 ↔ 2021 LOR discontinuity flagged in ADR-0003. `stg_berlin_mss` therefore carries
  a `lor_vintage` column and joins to the **contemporaneous** `stg_berlin_lor` snapshot. Any
  longitudinal Status/Dynamik series across the 2019→2021 boundary must go through the LOR
  crosswalk (ADR-0003 open question #3) and be flagged on the methodology page (G2). The
  2018 thesis sits on the pre-2021 scheme, so Epic B's directional revival uses the 447-PLR
  editions for the reference comparison.

- **Indicator-definition drift across editions.** The index-indicator set changed: 3
  indicators through 2021, **4 from 2023** (single-parent-household children added). The
  *derived* Status/Dynamik classes remain comparable in spirit but are not computed from an
  identical input set — a known discontinuity to document, not silently smooth over. This is
  acceptable: R-A1 consumes the *published classes* as ground truth, not the raw indicators.

- **Pipeline impact.** `stg_berlin_mss` becomes the official **outcome** variable feeding
  **R-A1** (index re-grounding) — the gentrification index is validated/calibrated against
  the Senate's own social-status classification rather than an ad-hoc construction. This
  strengthens the governed-index story (ADR-0004): the outcome is now an official, citable
  measure.

- **Reconciliation gives a hard correctness gate.** Because the Senate publishes exact PLR
  counts per class per edition, R-A3 has an unusually strong validation target: ingested
  class distributions must match the report. This is a better acceptance test than most
  ingestion tasks get.

- **Operational risk = WFS availability**, identical to ADR-0003. Mitigation is identical:
  snapshot to local Parquet on first run; rebuild is intentional (`uv run poe ingest`), not
  on every `dbt build`. Editions are effectively immutable once published, so a cached
  snapshot is safe.

- **City-agnostic seam upheld.** MSS is a Berlin-specific *outcome* concept. The adapter and
  `stg_berlin_mss` localise it; marts consume it via `dim_area`. A second city would supply
  its own social-status equivalent (or none) without touching shared models — but the
  gentrification index must not *require* an MSS-shaped input, or it would bake Berlin into
  the core. R-A1 should treat MSS as Berlin's *validation/grounding* source, not a mandatory
  global model input.

## Open questions

1. **Pre-2019 WFS availability.** Confirm whether MSS 2013/2015/2017 have live
   `gdi.berlin.de/services/wfs/mss_<YEAR>` services or only WMS/report PDFs. If WFS is
   missing, fall back to a re-tabulated class-distribution seed (Option C) for those years —
   decided by the DE pair during R-A3.
2. **Exact attribute names per edition.** Field names (`STATUSINDEX`, `DYNAMIKINDEX`,
   `GESAMTINDEX`, PLR key) may vary slightly across editions; the adapter normalises them.
   Capture the per-edition mapping in the adapter, not this ADR.
3. **LOR 2017 ↔ LOR 2021 PLR crosswalk** for any cross-boundary MSS time series — shared
   with ADR-0003 open question #3. Defer to the methodology note.
4. **Whether R-A1 uses the 12-group Gesamtindex or the 4-class Status index** as the primary
   grounding target — a methodology decision for the geo-data-scientist, not this ADR.

## References

- MSS overview (SenSBW): <https://www.berlin.de/sen/sbw/stadtdaten/stadtwissen/monitoring-soziale-stadtentwicklung/>
- MSS 2025 report: <https://www.berlin.de/sen/sbw/stadtdaten/stadtwissen/monitoring-soziale-stadtentwicklung/bericht-2025/>
- MSS 2023 report: <https://www.berlin.de/sen/sbw/stadtdaten/stadtwissen/monitoring-soziale-stadtentwicklung/bericht-2023/>
- MSS 2025 WFS service (verified, `indizes_542` feature type): <https://gdi.berlin.de/services/wfs/mss_2025?request=GetCapabilities&service=WFS>
- MSS 2025 dataset page (WMS-linked; WFS exists): <https://daten.berlin.de/datensaetze/monitoring-soziale-stadtentwicklung-mss-2025-wms-39b8b768>
- MSS 2023 WFS dataset page (`dl-de-zero-2.0`): <https://daten.berlin.de/datensaetze/monitoring-soziale-stadtentwicklung-mss-2023-wfs-078ba40c>
- MSS 2023 WFS endpoint: <https://gdi.berlin.de/services/wfs/mss_2023>
- MSS 2021 WFS dataset page: <https://daten.berlin.de/datensaetze/monitoring-soziale-stadtentwicklung-mss-2021-wfs-06b3739f>
- MSS 2019 WFS dataset page (447 PLR, 2017 LOR): <https://daten.berlin.de/datensaetze/monitoring-soziale-stadtentwicklung-mss-2019-wfs-a2e3766d>
- MSS 2019 WFS endpoint: <https://gdi.berlin.de/services/wfs/mss_2019>
- MSS index-indicator technical description (PDF): <https://fbinter.stadt-berlin.de/fb_daten/beschreibung/MSS/MSS_Index-Indikatoren__TechnBeschreibung.pdf>
- Datenlizenz Deutschland Zero 2.0: <https://www.govdata.de/dl-de/zero-2-0>
