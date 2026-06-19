# ADR-0007: Berlin per-PLR socio-economic status (SES) indicators

- **Status:** Accepted
- **Date:** 2026-06-19

## Context

R-A4 (issue #67) adds the **socio-economic status (SES) indicator layer** to the
gentrification pipeline. It is the third leg of the Epic-A data stand-up, after
R-A3 (#66, MSS Status/Dynamik outcome — ADR-0006) and the already-ingested OSM POI
predictors. Together they let R-A1 build a properly-grounded gentrification model:
**SES + POI inputs → MSS outcome.**

**Why the existing EWR is not enough.** The 2018 thesis used socio-economic inputs from
the *Einwohnerregisterauswertung (EWR)*, which is already ingested (`stg_berlin_ewr` →
`int_ewr_socioeco`, ADR-0003). But the EWR is a *resident-register* extract: it carries
socio-**demographics** (age cohorts, foreign share, migration background, residential
duration) and **does not** carry the "social-status" variables that actually define social
disadvantage:

- transfer-benefit receipt (SGB II/XII — *Bürgergeld* / former Hartz IV),
- unemployment rate per PLR,
- child poverty (SGB II transfer receipt among under-15s),
- children/youth in single-parent households.

These are precisely the indicators the Berlin Senate uses to compute the **MSS
Status-Index and Dynamik-Index** (ADR-0006). We want them at PLR grain as **continuous
variables**, not only as the derived 1–4 Status class. The class is a coarse, ground-truth
*outcome*; the underlying continuous indicators are the *inputs* a model needs to explain
and predict that outcome, and to express social status as a gradient rather than four bins.

**What we need (R-A4 acceptance shape).** A per-`(edition, PLR)` SES table of continuous
social-status indicators, free + openly licensed, HTTP-pullable, at PLR grain, methodologically
aligned with the MSS outcome it feeds.

Constraints this ADR must respect (per `CLAUDE.md`, ADR-0001):

- **Free + open only**; no signup-gated or paid access.
- **No new Python dependency** — R-A4 must reuse the existing ingestion machinery.
- **Cross-platform**: HTTP-pullable formats (WFS/GeoJSON/CSV) over OS-specific exports.
- **City-agnostic seam (ADR-0005)**: "PLR" must not leak into shared marts; the adapter lives
  under `ingestion/berlin/…` and stages to a `stg_berlin_*` table mapping onto generic
  `dim_area` (`subarea_l3`) downstream.

## Decision

**Adopt the MSS WFS `indexind` (index-indicator) layer as the primary, canonical source for
per-PLR SES indicators, ingested per edition — the same WFS channel, adapter mechanics, grain,
and licence already approved for the MSS outcome in ADR-0006.**

ADR-0006 Decision 3 ingested the `indizes` layer (Status/Dynamik/Gesamtindex) as the outcome
and flagged the `indexind` layer as "a secondary, nice-to-have for transparency/cross-checking".
R-A4 **promotes `indexind` to a first-class ingested layer**: it is the methodologically exact
SES input layer for R-A1.

1. **Access method: per-edition WFS, identical to ADR-0006.** Each MSS edition is published as
   a distinct WFS service at the stable URL pattern:

   ```
   https://gdi.berlin.de/services/wfs/mss_<YEAR>
   ```

   with the index-indicator feature type following the pattern:

   ```
   mss_<YEAR>:mss<YEAR>_indexind_<N>
   ```

   where `<N>` is the PLR count for that edition's LOR scheme (447 pre-2021, 542 from 2021).
   WFS 2.0.0, default CRS EPSG:25833, GeoJSON / GML / GeoPackage output — pure HTTP,
   cross-platform, no login. This is the **same WFS endpoint, the same `discover_*` →
   `fetch_*_geojson` → `parse_features` → `write_parquet` adapter mechanics** already
   implemented in `ingestion/berlin/mss/ingest_mss.py` for the `indizes` layer. R-A4 extends
   that adapter (a second feature type per edition), it does **not** add a new dependency or a
   new access pattern.

2. **Indicator set.** The `indexind` layer carries the index indicators the Senate uses to
   compute the Status/Dynamik classes. Per the MSS 2023 report and the MSS index-indicator
   technical description, the **expected** indicators are (continuous, per PLR):

   | Indicator | German term | Editions |
   |---|---|---|
   | Unemployment rate (SGB II) | *Arbeitslosigkeit (nach SGB II)* | all |
   | Transfer-benefit receipt (non-working, SGB II + XII) | *Transferbezug (Nicht-Arbeitslose, SGB II/XII)* | all |
   | Child poverty (SGB II transfer receipt, under-15s) | *Kinderarmut (Transferbezug SGB II der unter 15-Jährigen)* | all |
   | Children/youth in single-parent households | *Kinder/Jugendliche in alleinerziehenden Haushalten* | **2023+** |

   Both **status indicators** (the *level* of each variable) and, where published, the
   **dynamik indicators** (the *change* over the two-snapshot observation window) may be
   present per PLR. The adapter captures whichever value columns the layer exposes; the
   exact attribute names are discovered by probing the WFS (see Decision 5 and Open Q1).

3. **Grain & staging table.** One row per `(edition, plr_id, indicator)` in **long format**
   (mirroring `stg_berlin_ewr`'s `(year, plr_id, indicator, value)` contract, ADR-0003
   Decision 8), staged as **`stg_berlin_mss_indicators`**. Long format is preferred over a wide
   table because the indicator set changes across editions (3 → 4 at 2023, Decision in
   Consequences): a long table absorbs the schema change as data, not a column-count break,
   and lets downstream models filter to a stable indicator subset. Each row carries the
   `lor_vintage` tag (`lor_pre2021` / `lor_2021`) so joins pick the contemporaneous boundary,
   exactly as `stg_berlin_mss` does. Berlin-specific attribute names stay in the adapter; marts
   see generic `dim_area` (`subarea_l3`) joined on `(city='berlin', vintage, area_id)`.

4. **Persist a frozen local snapshot** per edition as Parquet under
   `data/raw/berlin/mss/mss_<YEAR>_indicators.parquet` (gitignored, ADR-0001/A8), rebuilt via
   `uv run poe ingest`. Geometry is not load-bearing (the PLR key joins to `stg_berlin_lor`
   geometry), so the adapter drops geometry and keeps
   `(edition, plr_id, plr_name, lor_vintage, indicator, value, source_attribution)`. dbt
   staging reads only from `data/raw/`. Editions are immutable once published, so the cached
   snapshot is safe.

5. **The DE pair probes the WFS to discover exact attribute names**, exactly as ADR-0006
   Open Q2 did for the `indizes` layer. The `indexind` value columns and their exact spelling
   per edition are **not pinned in this ADR**; the adapter discovers and normalises them, and
   records the per-edition mapping in code. R-A4 ships with a fixed, documented indicator
   vocabulary (the four canonical names above) and maps each edition's raw columns onto it.

6. **Licence: Datenlizenz Deutschland – Zero – 2.0 (`dl-de-zero-2.0`)** — same source, same
   licence as the MSS `indizes` layer (ADR-0006 Decision 7). No attribution is legally
   required; we credit **"Senatsverwaltung für Stadtentwicklung, Bauen und Wohnen Berlin —
   Monitoring Soziale Stadtentwicklung <edition>"** in the `source_attribution` row for the G3
   attribution wall, consistent with ADR-0003 / ADR-0006.

7. **Editions ingested.** The same span as `stg_berlin_mss`: firm **2019, 2021, 2023, 2025**;
   best-effort **2013/2015/2017** where a WFS `indexind` layer exists. The adapter's existing
   firm-vs-best-effort exit semantics apply unchanged.

This satisfies all R-A4 acceptance criteria: free + open licence, no registration, no new
dependency, Python-ingestible via HTTP, PLR grain, and — crucially — **methodological identity
with the MSS outcome** the indicators feed.

## Alternatives considered

### A — MSS `indexind` WFS layer (`mss_<YEAR>:mss<YEAR>_indexind_<N>`) — **CHOSEN**

- **Licence:** `dl-de-zero-2.0`. **Login:** none. **Format:** WFS 2.0.0, GeoJSON. **Grain:** PLR.
- Same endpoint, adapter, grain, and edition cadence as the MSS outcome (ADR-0006); **zero new
  tooling, zero new dependency**. Decisively the strongest fit: the indicators it carries are by
  construction the ones that define the MSS Status/Dynamik classes, so inputs and outcome are
  measured on the same definitions, same vintages, and same boundaries. The only gap (no income)
  is shared by every PLR-grain alternative and by the MSS itself.

### B — Regionaler Sozialstrukturatlas Berlin (RSA / Sozialatlas, via daten.berlin.de)

- **What:** SenSBW social-structure atlas at PLR level — SGB II rates, unemployment, child
  poverty, and some income proxies. **Pro:** broader indicator set than `indexind`. **Con:**
  indicator *definitions* and reference dates need not match the MSS index indicators, so its
  variables would not be on the same footing as the MSS outcome — re-introducing the
  definition-drift problem precisely where we want alignment. Licence would need a separate
  check, and it is a *new* source with its own access path and reconciliation burden.
- **Not adopted as primary.** Kept as a **future enrichment / income-gap fill** (see Open Q2):
  if R-A1 later needs an income proxy that `indexind` lacks, the RSA is the first place to look,
  via its own `stg_berlin_*` adapter and its own ADR amendment — not bolted onto R-A4.

### C — Bundesagentur für Arbeit (BA) open data (regional statistics) — **REJECTED**

- BA publishes unemployment and SGB II receipt with authoritative definitions, but the finest
  routinely published Berlin grain is **Bezirk** (~12 units), not PLR (~447–542). Too coarse for
  small-area gentrification analysis; would force a fabricated disaggregation. The MSS
  `indexind` layer already delivers BA-derived measures *at PLR grain*, computed by the Senate.
  Rejected.

### D — Mikrozensus / Census 2022 — **REJECTED**

- Open data, but most socio-economic tables publish at **Bezirk** (or coarser) grain for
  confidentiality reasons; PLR-grain SES variables are not available. Too coarse. Rejected.

### X — Any paid / proprietary / signup-gated SES dataset — **REJECTED**

- Out of scope by rule (ADR-0001). The official open `indexind` layer fully covers the need.

## Consequences

- **Grain & coverage.** `stg_berlin_mss_indicators` is `(edition, plr_id, indicator)` long
  format → continuous `value`. Coverage tracks `stg_berlin_mss`: firm 2019–2025, best-effort
  2013–2017. One observation per indicator per PLR per edition; each edition encodes the
  two-snapshot observation window that already underpins the Dynamik measure.

- **The 3 → 4 indicator-set change at 2023 — how we handle it.** Editions through 2021 publish
  **3** index indicators (unemployment, transfer receipt, child poverty); editions **2023+ add
  a 4th** (children/youth in single-parent households). The **long-format staging table absorbs
  this as data**: the 4th indicator simply has no rows before 2023. Downstream:
  - For any **cross-edition SES time series** (e.g. an R-A1 trend feature), use the **stable
    3-indicator core** present in *all* editions; treat the 4th indicator as a 2023+-only
    enrichment, never as a silently back-filled zero.
  - A dbt test asserts the indicator vocabulary per edition (3 for ≤2021, 4 for ≥2023) so the
    break is *visible and tested*, not smoothed over. This mirrors ADR-0006's "indicator-definition
    drift is a known discontinuity to document, not smooth over."

- **No income variable — explicit gap.** The `indexind` layer (like the MSS itself) uses
  transfer-receipt and unemployment as *proxies* for social status and **does not include
  income**. This is acceptable for R-A4 because the goal is alignment with the MSS outcome,
  whose own definition excludes income. If R-A1 finds an income gradient material, the fill is
  the RSA/Sozialatlas (Alternative B) under a follow-up ADR — not a scope addition here.

- **Boundary-vintage break, identical to ADR-0006.** Editions through 2019 use the 2017 LOR
  scheme (447 PLR); 2021+ use LOR 2021 (542 PLR). `stg_berlin_mss_indicators` carries
  `lor_vintage` and joins the contemporaneous `stg_berlin_lor` snapshot. Cross-boundary series
  go through the LOR crosswalk (ADR-0003 Open Q3) and are flagged on the methodology page (G2).

- **Pipeline impact — closes the input side.** With `stg_berlin_mss_indicators` (SES inputs) +
  POI predictors (inputs) + `stg_berlin_mss` (outcome), R-A1 has a complete, governed,
  same-source input→outcome stack. Because inputs and outcome share definitions and vintages,
  the grounding story (ADR-0004) is tight: the model explains the Senate's own classes using the
  Senate's own indicators, then extends them with POI dynamism the MSS does not use.

- **Internal cross-check for free.** The Senate computes Status/Dynamik *from* these indicators.
  Ingesting both layers lets the DE pair sanity-check that a PLR's `indexind` profile is
  consistent with its `indizes` class (e.g. high unemployment + high transfer receipt should not
  sit in Status "hoch"). This is a low-cost correctness signal, not a hard gate.

- **No new dependency; same operational risk profile.** R-A4 reuses `ingestion/berlin/mss/`
  machinery (urllib + pyarrow + the existing certifi/shapely-free path; the `indexind` layer is
  ingested attributes-only, so no geometry parsing is required). The only operational risk is
  WFS availability — identical to ADR-0003/0006, mitigated identically by the local Parquet
  snapshot.

- **City-agnostic seam upheld.** SES "index indicators" are a Berlin/MSS-specific concept. The
  adapter and `stg_berlin_mss_indicators` localise them; marts consume them via `dim_area`. A
  second city supplies its own SES equivalents (or none) without touching shared models — and
  the gentrification core must not *require* an MSS-shaped SES input, or it would bake Berlin in.

## Open questions

1. **Exact `indexind` attribute names and value semantics per edition.** Column spellings, and
   whether the layer publishes status-level only or also dynamik-change columns per indicator,
   are discovered by the DE pair probing GetCapabilities + a sample GetFeature (as ADR-0006
   Open Q2 did for `indizes`). The per-edition mapping lives in the adapter, not this ADR.

2. **Income-proxy fill.** If R-A1 determines an income/poverty-income gradient is material,
   evaluate the RSA/Sozialatlas (Alternative B) as a *secondary* `stg_berlin_*` source under a
   follow-up ADR. Out of scope for R-A4.

3. **Whether R-A1 uses raw indicator levels, the dynamik (change) form, or both** as model
   features is a methodology decision for the geo-data-scientist + domain-expert gate (R-C1),
   not this ADR.

4. **Pre-2019 `indexind` WFS availability.** Confirm whether MSS 2013/2015/2017 expose an
   `indexind` layer via `gdi.berlin.de/services/wfs/mss_<YEAR>` or only the report PDFs — decided
   by the DE pair during R-A4, same best-effort treatment as ADR-0006.

## References

- ADR-0006 (Berlin MSS data source — the `indizes`/`indexind` WFS this builds on): `docs/adr/0006-berlin-mss-data-source.md`
- ADR-0003 (Berlin geographies + EWR long-format staging precedent): `docs/adr/0003-berlin-geographies-and-open-price-rent-sources.md`
- Existing MSS WFS adapter (implementation basis for R-A4): `ingestion/berlin/mss/ingest_mss.py`
- MSS index-indicator technical description (PDF): <https://fbinter.stadt-berlin.de/fb_daten/beschreibung/MSS/MSS_Index-Indikatoren__TechnBeschreibung.pdf>
- MSS 2023 report (confirms 3→4 indicator change, single-parent-household children added): <https://www.berlin.de/sen/sbw/stadtdaten/stadtwissen/monitoring-soziale-stadtentwicklung/bericht-2023/>
- MSS 2023 WFS endpoint (`indexind` layer): <https://gdi.berlin.de/services/wfs/mss_2023>
- MSS 2025 WFS GetCapabilities (verify `indexind_542` feature type): <https://gdi.berlin.de/services/wfs/mss_2025?request=GetCapabilities&service=WFS>
- Regionaler Sozialstrukturatlas / Sozialatlas Berlin (Alternative B, future fill): <https://www.berlin.de/sen/gpg/service/gesundheitsberichterstattung/grundlagen/sozialstrukturatlas/>
- Datenlizenz Deutschland Zero 2.0: <https://www.govdata.de/dl-de/zero-2-0>
