# ADR-0003: Berlin geographies + open price/rent sources

- **Status:** Accepted
- **Date:** 2026-06-17
- **Ratified:** 2026-06-18

## Context

Berlin is the first city populated under the city-agnostic core (ADR-0005). Epic B (directional
revival of the 2018 thesis) and Epic D (property & rent dimension) both need a committed list of
**administrative geographies**, **socio-economic** inputs, and **price/rent** signals — all of
which must be **free + openly licensed** and **downloadable without login/signup** per
`CLAUDE.md` and ADR-0001.

Constraints this ADR must respect:

- **Free + open only.** No paid plans, no signup-gated APIs as defaults.
- **Cross-platform** ingestion: HTTP-pullable formats (WFS, CSV, GeoJSON, XLSX, GeoPackage) over
  OS-specific portal exports.
- **City-agnostic seam (ADR-0005).** Berlin's administrative hierarchy must map onto generic
  `dim_area` levels — `city > district > subarea` — *not* leak the names "BZR" / "PLR" into
  shared models. The seam is in the **adapter** under `ingestion/berlin/…` and the staging
  layer (`stg_berlin_*`); the core marts see generic `dim_area`.
- **Public-product trust (G3).** Every source's licence and required attribution must be
  recorded now so the public site can credit them correctly.

The 2018 thesis used Berlin LOR (Lebensweltlich orientierte Räume) — a three-level nested
hierarchy of **Prognoseräume (PRG, 58)**, **Bezirksregionen (BZR, 143)**, and **Planungsräume
(PLR, 542)** — plus the 12 **Bezirke** (boroughs). Since 2021 the LOR layout has been the
"LOR 2021" reform; older publications use the pre-2021 layout. Both vintages are public.

The thesis also used the **Einwohnerregister (EWR)** extracts published by the *Amt für
Statistik Berlin-Brandenburg* as the socio-economic input.

For price/rent the 2018 work did not formally include a price dimension; Epic D adds it. Berlin
publishes three relevant open sources: **Bodenrichtwerte** (annual land values from the
*Gutachterausschuss*), **Mietspiegel** (the qualified rent index from the Senate), and the
**IBB Wohnungsmarktbericht** (annual narrative report). Transactional asking-rent datasets
(immowelt, ImmoScout24, …) are paid/proprietary and therefore out of scope by rule — full stop.

## Options considered (geographies)

Where each source publishes the same underlying LOR geometry, the decision is which
distribution channel to standardise on.

### G-A — FIS-Broker / Geoportal Berlin WFS (`gdi.berlin.de`)

- **Licence:** *LOR 2021* is published as **CC BY 3.0 DE** (attribution: "Amt für Statistik
  Berlin-Brandenburg / Lebensweltlich orientierte Räume (LOR) (01.01.2021)"). Most other layers
  published by the Senate carry **Datenlizenz Deutschland – Zero – 2.0 (dl-de-zero-2.0)**.
- **Login:** None — WFS endpoints are anonymous HTTPS.
- **Format:** OGC WFS (GML/GeoJSON depending on request). Pure HTTP — cross-platform.
- **Stability:** Official source of truth; URLs are reasonably stable but FIS-Broker has had
  intermittent outages historically. The newer `gdi.berlin.de/services/wfs/lor_2021` endpoint
  appears to be the modern path.
- **Risk:** WFS responses can be large; pagination must be respected. Service availability is
  outside our control.

### G-B — daten.berlin.de dataset pages (CSV / GeoJSON / Shapefile downloads)

- **Licence:** Same as G-A (passthrough metadata).
- **Login:** None.
- **Format:** Direct file downloads where the dataset page exposes them; otherwise points at the
  WFS (G-A). For LOR 2021 specifically, the dataset page currently exposes the WFS link rather
  than a flat file download.
- **Risk:** Per-vintage URL slugs change ("`…-01-01-2021-wfs-34c86848`") — must be discovered,
  not guessed.

### G-C — Community mirrors (`rbb-data/berlin-lor`, `m-hoerz/berlin-shapes`, ODIS portal)

- **Licence:** Passthrough — derivatives carry the upstream CC-BY / dl-de attribution.
- **Login:** None.
- **Format:** GeoJSON / TopoJSON / KML / Shapefile — easy to consume.
- **Risk:** Update lag (a mirror lags the official source by months/years); mirror may drift
  from the canonical LOR scheme. Acceptable only as a **fallback** or for cross-checking, not
  as the primary path for a published product.

## Options considered (price/rent)

### P-A — Bodenrichtwerte (Gutachterausschuss / BORIS Berlin / Senate WFS)

- **What:** Reference land values (€/m² of plot) determined annually by the *Gutachterausschuss
  für Grundstückswerte*. Published per reference date `01.01.YYYY` as polygon zones with
  attributes. Going back to 2002 via BORIS; historical 1964–2001 as ATOM/raster.
- **Source:** `daten.berlin.de` dataset pages per year (e.g. `…/bodenrichtwerte-01-01-2024-wfs-…`)
  point at `gdi.berlin.de/services/wfs/brw<YEAR>`.
- **Licence:** **Datenlizenz Deutschland – Zero – 2.0** (no attribution legally required, but
  we will still credit "Senatsverwaltung für Stadtentwicklung, Bauen und Wohnen Berlin /
  Gutachterausschuss" for transparency).
- **Login:** None.
- **Note:** Bodenrichtwerte are *land* values, not dwelling prices — useful as a structural
  signal, not as a direct proxy for what tenants pay.

### P-B — Mietspiegel (qualified rent index, Senate)

- **What:** The official Berlin rent index, biennial historically and annual after the 2023
  reform. Two components are relevant:
  1. The **Mietspiegeltabelle** (PDF) — net cold rent ranges by year-of-construction × dwelling
     size × *Wohnlage* (location quality).
  2. The **Wohnlagen** geodata — the per-address / per-block *Wohnlage* classification
     (`einfach` / `mittel` / `gut`) published as **WFS** at
     `gdi.berlin.de/services/wfs/wohnlagenadr2023` (and analogous endpoints per vintage).
- **Source:** Mietspiegeltabelle PDFs at `mietspiegel.berlin.de`; Wohnlagen WFS via
  `daten.berlin.de` / GovData.
- **Licence:**
  - **Wohnlagen geodata: Datenlizenz Deutschland – Zero – 2.0.** Free reuse, with or without
    attribution.
  - **Mietspiegeltabelle PDFs:** the Senate publishes them for public reuse, but the dataset
    page does **not** carry an explicit machine-readable open-data licence the way the Wohnlagen
    WFS does. Treat the *table values* (numeric matrix of €/m² ranges) as **factual data** that
    we re-tabulate ourselves into a seed; do not redistribute the PDF.
- **Login:** None.

### P-C — IBB Wohnungsmarktbericht / Wohnungsmarktbarometer (Investitionsbank Berlin)

- **What:** Annual narrative report on the Berlin housing market with charts, area summaries,
  and aggregate statistics.
- **Source:** `ibb.de/.../wohnungsmarktbericht/<YEAR>.html` — PDF download.
- **Licence:** Recent editions (2024+) carry a **CC BY 4.0** notice. Older editions: case by
  case; if unclear we cite as a reference only and do not redistribute.
- **Login:** None.
- **Status:** **Reference document, not a structured dataset.** We do not ingest it into the
  warehouse. Analysts (Epic E) and the methodology page (G2) may cite it for context.

### P-D — Verkaufte Grundstücke (Gutachterausschuss / Senate WFS)

> **Superseded by Amendment P-D (2026-06-20, #53).** This entry was written against a *guessed*
> `verkaufte_grundstuecke<YEAR>` endpoint before discovery. The actual confirmed open source is the
> **AKS Kauffälle** at `gdi.berlin.de/services/wfs/kauffaelle_<YEAR>`; see **Amendment P-D** at the
> end of this ADR for the authoritative facts, status, and conditions.

- **What:** Annual dataset of actual registered property transactions in Berlin, from the
  *Kaufpreissammlung* (purchase price collection) maintained by the *Gutachterausschuss für
  Grundstückswerte*. Covers residential transactions by market segment.
- **Source:** `daten.berlin.de` per-year dataset pages pointing at WFS endpoints (e.g.
  `gdi.berlin.de/services/wfs/verkaufte_grundstuecke<YEAR>`).
- **Licence:** **Datenlizenz Deutschland – Zero – 2.0.** No attribution legally required;
  we credit "Gutachterausschuss für Grundstückswerte in Berlin" for transparency.
- **Login:** None.
- **Value:** Unlike Bodenrichtwerte (reference values), these are *actual* sale prices —
  a more direct signal of market activity. Useful as a structural indicator alongside
  Bodenrichtwerte for Epic D.

### P-X — Transactional / asking-rent datasets (ImmoScout24, immowelt, …) — **REJECTED**

- All require paid plans or proprietary scraping with disputed legality. **Out of scope by
  rule, full stop.** Not reconsidered.

## Decision

### Geographies

1. **Standardise on the official WFS (Option G-A) as the primary source** for all three LOR
   levels (PRG, BZR, PLR) and for the 12 Bezirke. The ingestion adapter under
   `ingestion/berlin/geographies/` pulls one snapshot per LOR vintage (currently **LOR 2021**;
   keep the **pre-2021 LOR** snapshot too because Epic B's 2018 reference outputs use it).
2. **Persist a frozen local copy** of each pulled LOR snapshot as **GeoParquet** under
   `data/raw/berlin/geographies/<vintage>/` (gitignored, ADR-0001/A8). Rebuild from WFS via
   `uv run poe ingest`. Small reference fixtures (e.g. centroid CSVs used for golden tests) may
   be committed under `reference/` per ADR-0001.
3. **Community mirrors (G-C) are fallback only.** If FIS-Broker / `gdi.berlin.de` is down for a
   build, the adapter may load a checked-in `data/raw/` artefact previously fetched from the
   official source — it does not silently fall back to a third-party mirror in production.
4. **Mapping to the city-agnostic model (ADR-0005):**

   | Berlin layer | `dim_area.level` (generic) | Approx. count |
   |---|---|---|
   | Land Berlin | `city` | 1 |
   | Bezirk (12) | `district` | 12 |
   | Prognoseraum (PRG) | `subarea_l1` | 58 |
   | Bezirksregion (BZR) | `subarea_l2` | 143 |
   | Planungsraum (PLR) | `subarea_l3` | 542 |

   Staging table: **`stg_berlin_lor`** (one row per `(vintage, level, area_id)` with name,
   parent id, and geometry). Berlin-specific column names (`PLR_ID`, `PRG_NAME`, …) stay in
   the staging adapter; downstream marts see the generic `dim_area` shape only.

### Socio-economic (EWR)

5. **Primary EWR source: `daten.berlin.de` per-vintage datasets** (CSV) authored by the *Amt
   für Statistik Berlin-Brandenburg*, e.g. *"Einwohnerinnen und Einwohner in Berlin in
   LOR-Planungsräumen am 31.12.YYYY"*. Smallest usable area = **PLR**.
6. **Cadence: semi-annual** (30 June and 31 December). For the longitudinal warehouse (Epic C3b)
   we pin to the **31 December** snapshot to get one stable observation per year; the 30 June
   snapshot is optional add-on if Epic E wants mid-year resolution.
7. **Licence:** CC BY 3.0 DE — attribution string: **"Amt für Statistik Berlin-Brandenburg"**.
   Recorded in source metadata for every loaded vintage.
8. Staging table: **`stg_berlin_ewr`** — `(year, plr_id, indicator, value)` long format; the
   exact indicator list (age cohorts, foreign share, migration background, …) is fixed in the
   adapter so dbt models see a stable contract.

### Price/rent

9. **Bodenrichtwerte:** primary, annual. Adopt the per-year WFS endpoint pattern
   `gdi.berlin.de/services/wfs/brw<YEAR>`. Staging table **`stg_berlin_bodenrichtwert`** —
   `(reference_date, geometry, value_eur_per_m2, nutzung, …)`. Licence: **dl-de-zero-2.0**.
10. **Verkaufte Grundstücke:** annual actual transaction prices from the Kaufpreissammlung.
    Staging table **`stg_berlin_verkaufte_grundstuecke`** — `(year, geometry, price_eur,
    segment, …)`. Licence: **dl-de-zero-2.0**.
    *(See Amendment P-D: the concrete source is the AKS Kauffälle WFS; the endpoint and staging
    name above are superseded by the amendment.)*
11. **Mietspiegel:** primary for Epic D, with two ingestion paths because the publication is
    split:
    - **Wohnlagen WFS** → **`stg_berlin_wohnlage`** (`(vintage, address_or_block, wohnlage)`).
      Licence: **dl-de-zero-2.0**.
    - **Mietspiegeltabelle** → **`stg_berlin_mietspiegel`** seed: re-keyed numeric matrix
      (`year_built_bucket × size_bucket × wohnlage → rent_low, rent_mid, rent_high`),
      transcribed from the official PDF into a CSV seed under `transform/seeds/`. The seed is
      a *small reference fixture* (ADR-0001/A8) and is committed; we do not redistribute the
      PDF itself. Source row records "Mietspiegeltabelle <year>, Senatsverwaltung für
      Stadtentwicklung, Bauen und Wohnen Berlin" as attribution.
12. **IBB Wohnungsmarktbericht:** **reference only**. Not ingested. Cited by URL in the
    methodology page (G2) and in narrative analyses (Epic E3).

### Attribution wall (driven by G3)

The public site (Epic G3) will render the following attribution block; the data adapter writes
the source attribution per row so the wall is data-driven rather than hand-maintained:

- Land geometries & LOR: *© Amt für Statistik Berlin-Brandenburg, CC BY 3.0 DE.*
- EWR statistics: *© Amt für Statistik Berlin-Brandenburg, CC BY 3.0 DE.*
- Bodenrichtwerte: *Senatsverwaltung für Stadtentwicklung, Bauen und Wohnen Berlin /
  Gutachterausschuss für Grundstückswerte in Berlin, dl-de-zero-2.0.*
- Wohnlagen Mietspiegel: *Senatsverwaltung für Stadtentwicklung, Bauen und Wohnen Berlin,
  dl-de-zero-2.0.*
- Mietspiegeltabelle (re-tabulated): *Senatsverwaltung für Stadtentwicklung, Bauen und Wohnen
  Berlin — Berliner Mietspiegel <year>.*
- IBB Wohnungsmarktbericht (reference only): *Investitionsbank Berlin, CC BY 4.0 where
  applicable.*

### Cadence summary

| Source | Cadence | Pinned grain |
|---|---|---|
| LOR geometry | When LOR scheme changes (last: 2021) | One snapshot per vintage |
| EWR | Semi-annual (30 Jun / 31 Dec) | 31 Dec, annually |
| Bodenrichtwerte | Annual (01 Jan) | Annual |
| Mietspiegel Wohnlagen | Per Mietspiegel publication (~biennial → annual) | Per publication |
| Mietspiegeltabelle | Per Mietspiegel publication | Per publication |

## Consequences

- **The ingestion adapter under `ingestion/berlin/`** owns three concerns: (a) discovering the
  current per-vintage URL on `daten.berlin.de`, (b) calling the WFS / downloading the CSV,
  (c) materialising GeoParquet / CSV under `data/raw/berlin/`. The seam stays clean — dbt
  staging only reads from `data/raw/`.
- **All marts that join area data use `dim_area`**, never `stg_berlin_lor` directly. The
  ADR-0005 contract is upheld: a future second city simply adds its own `stg_<city>_*` adapter
  and `dim_city` row.
- **The public site can publish.** Every source above is free + open + attribution-compatible
  with a public product. No source needs login, no source is paid.
- **Mietspiegeltabelle is the soft spot.** We commit to **re-tabulating** the numeric values
  ourselves into a seed and citing the PDF; we accept the small manual step as the price of not
  redistributing a PDF whose licence terms are not explicit. The seed is small enough to
  spot-check.
- **WFS service availability is a real operational risk.** Mitigation: snapshots are
  materialised to local GeoParquet on first run and reused on subsequent builds; rebuilds are
  intentional (`uv run poe ingest --refresh`), not happening on every `dbt build`.
- **Pre-2021 LOR coexistence.** Epic B compares against the 2018 reference, which is on the
  pre-2021 LOR scheme. We ingest **both** the pre-2021 and 2021 LOR vintages and keep them as
  parallel `dim_area` snapshots keyed by `vintage`. Time-series joins use the contemporaneous
  vintage; the methodology page (G2) explicitly states the boundary change.
- **Cross-platform stays clean.** Everything is HTTP + standard formats; no Berlin-specific CLI
  is required.

## Open questions

These are deferred to the maintainer's ratification of this ADR and/or to Epic D execution:

1. **FIS-Broker uptime track record.** Quantify outage frequency before committing the public
   site to live WFS calls; currently we mitigate by caching to GeoParquet, but a longer-term
   plan (e.g. a small fetch-and-archive job in F3) may be warranted.
2. **Mietspiegeltabelle licence ambiguity.** The Senate publishes the PDF for free public use
   but does not stamp it with `dl-de-*` or `CC-BY-*`. Our chosen path (re-tabulate values into
   a seed, cite the PDF, do not redistribute the PDF) is conservative — re-examine if/when the
   Senate publishes machine-readable rent index data with an explicit open licence.
3. **LOR 2021 ↔ pre-2021 crosswalk.** Is there an official mapping table from pre-2021 PLR IDs
   to LOR-2021 PLR IDs, or do we need to derive one geometrically (spatial overlap)? If
   derived, document the rule in the methodology page (G2).
4. **EWR indicator set.** The exact list of socio-economic indicators ingested for the
   longitudinal series (Epic C3b) belongs in a methodology note, not this ADR. Default starter
   set: total residents, age cohorts (<6, 6-17, 18-64, 65+), foreign share, migration
   background share — to be confirmed by the geo-data-scientist.
5. **Bodenrichtwerte temporal coverage for the revival.** Backfill is technically available
   from 2002, but Epic B only needs the 2018 vintage and the current vintage for the
   directional check. Epic D's full back-series scope is a separate decision.
6. **Verkaufte Grundstücke temporal coverage.** Available at least from 2024; backfill depth
   for earlier years needs confirming before Epic D begins. *(Now tracked under Amendment P-D
   as AKS Kauffälle; 2024 and 2025 confirmed live.)*

## References

- LOR 2021 dataset page (CC BY 3.0 DE): <https://daten.berlin.de/datensaetze/lebensweltlich-orientierte-raume-lor-01-01-2021-wfs-34c86848>
- LOR 2021 WFS endpoint: <https://gdi.berlin.de/services/wfs/lor_2021>
- LOR concept overview (Senate): <https://www.berlin.de/sen/sbw/stadtdaten/stadtwissen/sozialraumorientierte-planungsgrundlagen/lebensweltlich-orientierte-raeume/>
- LOR statistics overview (AfS Berlin-Brandenburg): <https://www.statistik-berlin-brandenburg.de/meine-region/lebensweltlich-orientierte-raeume-berlin/>
- LOR community mirror (fallback only): <https://github.com/rbb-data/berlin-lor>
- Berlin Bezirksgrenzen (ODIS): <https://daten.odis-berlin.de/de/dataset/bezirksgrenzen/>
- EWR per-PLR dataset (CC BY): <https://daten.berlin.de/datensaetze/einwohnerinnen-und-einwohner-in-berlin-in-lor-planungsraumen-am-31-12-2024>
- EWR publication series (A I 16 - hj, semi-annual): <https://www.statistik-berlin-brandenburg.de/a-i-16-hj/>
- Bodenrichtwerte 2024 WFS dataset page (dl-de-zero-2.0): <https://daten.berlin.de/datensaetze/bodenrichtwerte-01-01-2024-wfs-c2092cb3>
- BORIS Berlin interactive viewer: <https://fbinter.stadt-berlin.de/boris/>
- Mietspiegel landing page: <https://mietspiegel.berlin.de/>
- Mietspiegel archive (2017-2024 PDFs): <https://mietspiegel.berlin.de/berliner-mietspiegel/archiv/>
- Wohnlagen Mietspiegel 2023 WFS (dl-de-zero-2.0): <https://daten.berlin.de/datensaetze/wohnlagen-nach-adressen-zum-berliner-mietspiegel-2023-wfs-b9979169>
- Wohnlagen WFS endpoint: <https://gdi.berlin.de/services/wfs/wohnlagenadr2023>
- IBB Wohnungsmarktbericht (reference only): <https://www.ibb.de/de/ueber-uns/publikationen/wohnungsmarktbericht/2024.html>
- Datenlizenz Deutschland Zero 2.0: <https://www.govdata.de/dl-de/zero-2-0>
- Creative Commons BY 3.0 DE: <https://creativecommons.org/licenses/by/3.0/de/legalcode.de>

---

## Implementation notes (C3, 2026-06-18)

### Canonical storage path

The LOR geometry parquets are written to `data/raw/berlin/lor/` (two files:
`pre2021.parquet` and `lor_2021.parquet`), not the generic
`data/raw/berlin/geographies/<vintage>/` pattern described above. The simpler flat
path is the ratified implementation. The ingestion adapter is at
`ingestion/berlin/lor/ingest_lor_geometries.py`; `stg_berlin_lor` reads from
`data/raw/berlin/lor/*.parquet`.

### Python library: shapely

`shapely>=2.0` is approved for use in the LOR geometry ingestion adapter
(`ingestion/berlin/lor/ingest_lor_geometries.py`). It is used solely to parse
GeoJSON geometry from the GDI Berlin WFS response and serialise it to WKB bytes
for the parquet output. This is a pure-Python, cross-platform, LGPL-2.1-licensed
library listed on PyPI. No alternative in the standard library provides equivalent
WKB serialisation from GeoJSON without a heavy native dependency. Approved by the
system architect under the project's "free, open, cross-platform" rule.

### certifi

`certifi>=2024.0` is approved as the CA bundle for macOS Python `urllib` calls in
all ingestion scripts (workaround for macOS Python not shipping CA certificates).
See `ingestion/berlin/ewr/ingest_ewr.py` for the precedent pattern.

---

## Amendment P-D — AKS Kauffälle (property transactions) (2026-06-20, #53)

- **Status:** **Adopted (conditional)** — open WFS confirmed live; ingestion is **blocked** on the
  two conditions in *Open conditions* below until they are cleared.

This amendment **supersedes and concretises** the abstract "P-D — Verkaufte Grundstücke" entry in
*Options considered (price/rent)* (and the corresponding line 10 of the *Price/rent* decision).
That entry was written against a *guessed* `verkaufte_grundstuecke<YEAR>` endpoint before
discovery; the D1b discovery note (#53, `docs/data/kaufFaelle-discovery.md`) located the **actual**
open source the Senate publishes for registered property transactions: the **AKS Kauffälle**. Where
the placeholder and this amendment differ, **this amendment is authoritative**.

### What

The **AKS Kauffälle** (*Automatisierte Kaufpreissammlung* — registered, completed property
transactions) published by the *Gutachterausschuss für Grundstückswerte in Berlin* as annual open
WFS layers on `gdi.berlin.de`. Three submarkets (*Teilmärkte*) per layer:

- **unbebaute Grundstücke** (undeveloped plots),
- **bebaute Grundstücke** (developed plots),
- **Wohnungs- und Teileigentum** (condominiums) — the **most gentrification-relevant** segment, as
  it tracks the dwelling-ownership market where conversion-driven displacement occurs.

### Source & endpoint

- **WFS service pattern (one service per year):** `gdi.berlin.de/services/wfs/kauffaelle_<YEAR>`.
- **Confirmed live:** **2024** and **2025**. Earlier years are likely available; the ingestion
  adapter must **enumerate years** (each completed year is a separate service) rather than assume a
  single endpoint.
- Discovered via `daten.berlin.de` per-year dataset pages (tag *Immobilienpreise*); see References.
- **Login:** None — anonymous HTTPS WFS, consistent with the other `gdi.berlin.de` sources.

### Licence

- **Datenlizenz Deutschland – Zero – 2.0 (dl-de-zero-2.0)** — public-domain-equivalent, free reuse,
  no attribution legally required. Consistent with the other Senate price layers in this ADR. For
  G3 trust we still credit *"Senatsverwaltung für Stadtentwicklung, Bauen und Wohnen Berlin /
  Gutachterausschuss für Grundstückswerte in Berlin"*.

### Geographic grain

- Transactions are anonymised to the **block (Block / Blocknummer)** the property sits in — **not**
  raw addresses and **not** PLR. The portal's "Geographische Granularität: Berlin" field is the
  coverage extent, not the feature geometry.
- Consequently, use in the city-agnostic index requires **areal interpolation from block to PLR**
  (`subarea_l3` / `dim_area`) before it can join the rest of the warehouse.

### Theory role (D1b)

- Kauffälle is a **predictor / dynamism lead indicator** in the index — rent-gap realisation
  (Smith) and ownership turnover preceding social succession (Dangschat). It complements
  Bodenrichtwerte (P-A; structural, slow land value) with **market churn**.
- It is explicitly **NOT a displacement outcome.** A transaction is not a displacement; ownership
  change ≠ tenant turnover. This framing must be preserved at the methodology gate so the index
  does not read transaction volume as realised displacement.

### Open conditions (block ingestion)

Both must be cleared before the ingestion adapter / dbt models for this source are built:

1. **Price-attribute verification.** Confirm whether the **public** WFS carries per-block features
   with usable €-**price** attributes, or only symbolised / count features without €-values (the
   detailed fee-based *Kaufpreissammlung* sits behind the Gutachterausschuss). This determines
   whether D1b yields a **price** signal or only a **transaction-count / dynamism** signal. If only
   counts are available, fall back to the already-accepted **Bodenrichtwerte (P-A)** as the
   structural price proxy and use Kauffälle purely as a transaction-count dynamism layer.
2. **Geo-DS sign-off on block→PLR interpolation.** The block-level → PLR areal-interpolation method
   is methodology-bearing and requires `geo-data-scientist` sign-off (and, as a methodology-bearing
   index input, the dual gate per `CLAUDE.md` §Methodology gate) before adoption.

### References (P-D amendment)

- D1b discovery note: `docs/data/kaufFaelle-discovery.md`
- Portal listing (tag *Immobilienpreise*): <https://daten.berlin.de/datensaetze?tags=Immobilienpreise>
- Kauffälle 2024 WFS dataset page: <https://daten.berlin.de/datensaetze/kauffalle-2024-bebaute-unbebaute-grundstucke-wohnungs-und-teileigentum-wfs-901314d5>
- Kauffälle 2025 WFS dataset page: <https://daten.berlin.de/datensaetze/kauffalle-2025-bebaute-unbebaute-grundstucke-wohnungs-und-teileigentum-wfs-55c18c0e>
- Kauffälle 2024 WFS GetCapabilities: <https://gdi.berlin.de/services/wfs/kauffaelle_2024?request=GetCapabilities&service=WFS>
- AKS-online (Blockkarte context): <https://www.berlin.de/gutachterausschuss/marktinformationen/aks-online/>
