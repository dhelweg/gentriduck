# ADR-0014: Hamburg data sources (second city)

- **Status:** Accepted
- **Date:** 2026-07-01
- **Ratified:** 2026-07-01

## Context

**H1** (#40) onboards Hamburg as the second city under the ADR-0005 city-agnostic core, to
validate that expansion is configuration (a new `dim_city` row + adapters + index params), not a
model rewrite. Before the data-engineer ingests anything, per `CLAUDE.md` golden rules #1/#2,
every new source needs an architect-reviewed ADR recording licence, access mechanism, and
city-agnostic mapping — mirroring ADR-0003 (Berlin geographies + price/rent) and ADR-0006
(Berlin MSS).

The **H0 research deliverable** (`docs/epic-h/H1-hamburg-data-landscape.md`, #124, closed
2026-07-01) did the discovery legwork: it confirms that all five Berlin data pillars (OSM POI,
MSS-equivalent social outcome, EWR-equivalent socio-economic predictors, spatial units,
displacement/rent) have open, machine-readable Hamburg analogues, almost entirely funnelled
through one portal (`transparenz.hamburg.de`, the *Transparenzportal*) and one statistics office
(*Statistikamt Nord*). This ADR promotes those findings into a binding source decision, in the
same shape as ADR-0003/0006, so the data-engineer has a committed contract to implement against.

Constraints this ADR must respect (per `CLAUDE.md`, ADR-0001, ADR-0005):

- **Free + open only**; no signup-gated or paid access.
- **Cross-platform**: HTTP-pullable formats (WFS, CSV, GeoJSON, XLSX, GML) over OS-specific
  portal exports.
- **City-agnostic seam (ADR-0005)**: Hamburg-specific concepts (*statistische Gebiete*,
  *Stadtteil*, *Bezirk*, the Sozialmonitoring attention-indicator set) must not leak into shared
  marts — they stay in `ingestion/hamburg/…` and `stg_hamburg_*`, mapped onto generic
  `dim_area`/`dim_city`.
- **Public-product trust (G3)**: every source's licence and required attribution string must be
  recorded now.

## Licence family (all pillars)

Hamburg's open data is overwhelmingly **Datenlizenz Deutschland — Namensnennung 2.0
(`dl-de/by-2.0`)** — i.e. **attribution required**, unlike Berlin's largely `dl-de-zero-2.0`
(no attribution required) sources. `dl-de/by-2.0` is a standard, pre-approved open-licence
family (same family as Berlin's LOR CC BY 3.0 DE / EWR CC BY 3.0 DE, which also require
attribution) — **this does not need a fresh licence-family approval**, but it does mean every
Hamburg source row on the G3 attribution wall carries a mandatory attribution string. OSM stays
**ODbL** (already approved, ADR-0002), unchanged for Hamburg.

## Decision — per pillar

### 1. Geometry / spatial units (LOR-equivalent)

- **Source:** Hamburg Transparenzportal — **"Statistische Gebiete in Hamburg"** dataset
  (statistische Gebiete, ≈941, re-cut over time — 943 as of April 2016), plus the Stadtteil
  (≈104–105) and Bezirk (7) layers from the same portal family.
- **Access:** WFS (GML), WMS, OGC API-Features, GeoJSON/GML bulk download. Anonymous HTTPS, no
  login — same channel shape as ADR-0003's Berlin WFS pattern.
- **Licence:** `dl-de/by-2.0` — attribution: *"Freie und Hansestadt Hamburg, Landesbetrieb
  Geoinformation und Vermessung"*.
- **CRS:** **EPSG:25832** (UTM 32N) — note this differs from Berlin's **EPSG:25833** (UTM 33N).
  The adapter must set the per-city CRS from `dim_city` and transform to WGS84 for the ohsome
  join, exercising the ADR-0005 per-city CRS parameter for the first time.
- **Mapping to `dim_area` (ADR-0005):**

  | Hamburg layer | `dim_area.level` (generic) | Approx. count |
  |---|---|---|
  | Freie und Hansestadt Hamburg | `city` | 1 |
  | Bezirk (7) | `district` | 7 |
  | Stadtteil (~104–105) | `subarea_l1` | ~104–105 |
  | Statistisches Gebiet (~941) | `subarea_l2` | ~941 |

  (Hamburg has one fewer nested level than Berlin's PRG/BZR/PLR three-level split — `subarea_l2`
  is the finest Hamburg grain, left unused at `subarea_l3` for this city. `dim_area` tolerates a
  shallower hierarchy per city by design.)
- **Vintage discipline:** carry a `vintage` tag (943 vs 941) exactly as ADR-0003 does for
  pre-2021/2021 LOR; no crosswalk exists yet — flag as an open condition below.
- **Staging table:** `stg_hamburg_geo` — one row per `(vintage, level, area_id)` with name,
  parent id, geometry. Hamburg-specific field names stay in the adapter.

### 2. Social outcome (MSS-equivalent): Sozialmonitoring Integrierte Stadtteilentwicklung

- **Source:** *Sozialmonitoring Integrierte Stadtteilentwicklung Hamburg* ("…Karte
  Gesamtindex"), published by the *Behörde für Stadtentwicklung und Wohnen (BSW)*. Direct
  conceptual analogue of Berlin's MSS: **Statusindex** (4 classes) × **Dynamikindex** (3 classes,
  *positiv/stabil/negativ*) → **Gesamtindex**, computed from **seven** attention indicators
  (migration-background youth, single-parent children, SGB-II share, unemployment,
  Mindestsicherung for children and for elderly, Schulabschluss).
- **Grain:** 941 statistische Gebiete (scored only where residents > 300, currently 857) — finer
  than Berlin's 542 PLR.
- **Cadence:** **Annual since 2010** — finer than Berlin's biennial MSS; this materially improves
  lead-lag temporal resolution for H1's Hamburg pipeline versus Berlin's.
- **Access:** WFS (GML), WMS, OGC API-Features, plus bulk CSV (~115 MB) / GeoJSON (~224 MB)
  download on the Transparenzportal. Annual report PDFs carry class-distribution tables for
  reconciliation, exactly as ADR-0006 uses the MSS report PDFs.
- **Licence:** `dl-de/by-2.0` — attribution: *"Freie und Hansestadt Hamburg, Behörde für
  Stadtentwicklung und Wohnen"*.
- **Role discipline (ties to R-A1/ADR-0006 precedent):** Sozialmonitoring is the **outcome /
  ground-truth** variable, never a predictor — same rule ADR-0006 establishes for MSS. Do not
  let Hamburg POI dynamism leak into it.
- **Known non-equivalence to flag at G2 (methodology page):** Hamburg's Dynamikindex is a
  **3-year** change window vs Berlin MSS's **2-year** window; the attention-indicator sets differ
  (7 vs Berlin's 3–4) — the derived classes are comparable *in spirit*, not input-for-input.
  Cross-city comparisons of Dynamik *magnitude* must respect this.
- **Staging table:** `stg_hamburg_sozialmonitoring` — `(edition_year, gebiet_id)` → Status class,
  Dynamik class, Gesamtindex. Reconciled against the annual report PDF's class-distribution table
  (hard correctness gate, same discipline as ADR-0006 decision 6).

### 3. Socio-economic predictors (EWR-equivalent)

Two open products at **two different grains** — this is the one genuine design decision H0
flagged, resolved here:

- **Primary: "Regionalstatistische Daten der Stadtteile Hamburgs"** (Transparenzportal) — the
  open, geo-referenced counterpart at **Stadtteil** grain (~104–105). Formats: CSV (zip), GeoJSON
  (zip), GML, OGC API-Features, WFS. Time coverage 2013 onward. Licence `dl-de/by-2.0`
  (attribution: *Statistisches Amt für Hamburg und Schleswig-Holstein*).
- **Richer fallback: Statistikamt Nord "Hamburger Stadtteil-Profile"** — ~70 indicators
  (age/sex/marital status/nationality/migration background/origin region/household type),
  Stadtteil grain, XLSX + PDF, 2013–2024/2025 back series. Same licence family. Used only for
  fields not present in the open Transparenzportal release; budget for the same class of
  data-quality traps Berlin's EWR hit (German decimals, column-rename drift across years,
  cf. #50/#57/#58).
- **Fine-grain (statistische Gebiete) gap:** the openly published fine-grain socio-demographics
  are essentially the Sozialmonitoring's own attention-indicators (a narrower set); full
  EWR-style breadth (residence duration, detailed migration bands, age bands) is **not** located
  as an open per-statistische-Gebiet field — residence duration ("Wohndauer") specifically was
  not found openly at fine grain (Low confidence it exists at all; needs a hands-on DE probe
  before being declared absent).
- **Decision on modelling grain: carry both grains via the `dim_area` hierarchy** (Stadtteil =
  `subarea_l1`, statistische Gebiet = `subarea_l2`), joining EWR-style Stadtteil fields down to
  statistische Gebiete only where a defensible areal/proportional method applies, and documenting
  the resolution mismatch on the methodology page (G2) rather than picking one grain and silently
  discarding the other. This is what ADR-0005's self-referential `dim_area` was built for, and
  avoids prematurely dropping either the Sozialmonitoring's fine resolution or the Stadtteil
  predictors' breadth. **No paid fallback** for the residence-duration gap if it proves absent —
  document as a known Hamburg limitation (golden rule #1).
- **Staging tables:** `stg_hamburg_ewr_stadtteil` (from Regionalstatistische Daten, primary) and,
  if the XLSX fallback is used, `stg_hamburg_ewr_stadtteil_profile` — both at Stadtteil grain,
  long format `(year, stadtteil_id, indicator, value)`, mirroring `stg_berlin_ewr`'s shape.

### 4. Displacement-protection zones (Milieuschutz-equivalent)

- **Source:** *"Soziale Erhaltungsverordnungen — Gebiete in Hamburg"* — the §172 BauGB *soziale
  Erhaltungssatzung* instrument, same legal basis as Berlin's Milieuschutz. ~17 designated areas
  (Mitte, Altona, Eimsbüttel, Wandsbek, Nord).
- **Access:** WFS (GML), GeoJSON, OGC API-Features via Transparenzportal; mirrored on
  data.europa.eu / INSPIRE.
- **Licence:** `dl-de/by-2.0` family (confirm exact attribution string per dataset at ingestion).
- **Open item:** confirm the in-force *date* attribute exists per area (needed for any future
  DiD/event-study à la deferred #80) — Medium confidence, verify at ingestion.
- **Staging table:** `stg_hamburg_displacement_zones` — mirrors the shape Berlin's #70 [B1]
  Milieuschutz staging will use once that (currently `blocked`) ticket lands; if #70 lands first,
  align field names.

### 5. Rent (Mietspiegel-equivalent)

- **Source:** **Hamburger Mietenspiegel** (biennial since 1976; current 2025/2027 cycle) +
  **Wohnlagenverzeichnis** (address/street → Wohnlage crosswalk, analogous to Berlin's Wohnlagen
  WFS).
- **Access:** Transparenzportal lists GML, CSV, GeoJSON, OGC API-Features, XML for the
  Mietenspiegel dataset; PDF brochure for the human-readable table (mirrors Berlin's
  Mietspiegeltabelle treatment in ADR-0003 — re-tabulate into a seed, do not redistribute the
  PDF, if the machine-readable formats don't carry the full rent matrix).
- **Licence:** `dl-de/by-2.0`.
- **Staging tables:** `stg_hamburg_wohnlage` and `stg_hamburg_mietenspiegel` (seed if
  re-tabulation is needed), mirroring `stg_berlin_wohnlage`/`stg_berlin_mietspiegel`.

### 6. OSM POI (unchanged)

- **Source:** ohsome API (`https://api.ohsome.org/v1`, HeiGIT) — global by design, already
  approved (ADR-0002). Hamburg requires **no new adapter mechanics**, only passing Hamburg's
  statistische-Gebiete/Stadtteil polygons instead of Berlin's PLR polygons.
- **Re-fit, don't copy, the C5 completeness-bias correction.** The OSM mapper-community
  completeness curve is city-specific; re-fitting for Hamburg is **methodology-bearing** (touches
  the C5-equivalent normalization) and goes through the geo-DS + domain-expert gate when that
  work lands — this ADR only approves the *source*, not the re-fit methodology.

## Alternatives considered

- **Statistikamt Nord "Meine Region" interactive DB only** — rejected as the *primary* path
  (browser-oriented; the Transparenzportal WFS/CSV/GeoJSON releases are the machine-readable
  equivalent and are preferred, consistent with ADR-0003's WFS-over-portal-browsing precedent).
  Statistikamt Nord XLSX remains the fallback for fields absent from the Transparenzportal.
- **Third-party/community mirrors** — none identified as necessary; Hamburg's Transparenzportal
  is a single well-organized portal (unlike Berlin's split across `daten.berlin.de` +
  `gdi.berlin.de` + FIS-Broker legacy), so no fallback-mirror tier is adopted at this time.
- **Paid data (e.g. commercial rent-transaction feeds)** — **rejected**, out of scope by rule,
  consistent with ADR-0003's P-X rejection for Berlin.

## Consequences

- **`ingestion/hamburg/…` owns all Hamburg-specific quirks**: EPSG:25832, statistische-Gebiete
  vintage, the seven-indicator Sozialmonitoring set, `dl-de/by-2.0` attribution strings. Core
  marts continue to see only `dim_area`/`dim_city` (ADR-0005 seam upheld) — if H1 implementation
  finds it must change a shared/core model, that is an architect escalation, not a silent fix.
- **New attribution-wall rows (G3).** Every Hamburg source requires an attribution string (unlike
  several Berlin sources under `dl-de-zero-2.0`) — the data-driven attribution mechanism ADR-0003
  established already supports this; only new rows are needed, no mechanism change.
- **Two-grain social pillar is a standing methodology note**, not a defect — carried forward to
  the H1 methodology sign-off (geo-DS + domain-expert) and the G2 methodology page once H1 lands.
- **CRS parameter exercised for the first time** (EPSG:25832 vs Berlin's 25833) — a genuine test
  of the ADR-0005 per-city seam; if this leaks into a shared model, escalate.
- **Faithful reproduction is possible.** No pillar requires a proxy or a "drop a dimension"
  decision; every Hamburg equivalent found is free and openly licensed.

## Open questions (deferred to H1 execution / geo-DS+domain sign-off)

1. **Exact WFS feature-type names and CSV column schemas** — Medium confidence per H0; the DE
   must probe `GetCapabilities` and inspect a sample file at ingestion, same as every prior ADR
   in this series.
2. **Statistische-Gebiete 943→941 crosswalk** — does an official crosswalk exist, or must it be
   derived geometrically (spatial overlap), mirroring ADR-0003 open question #3 for Berlin's
   pre-2021→2021 LOR? Decide during H1 implementation.
3. **Residence-duration ("Wohndauer") fine-grain availability** — confirm via a hands-on
   Transparenzportal/Statistikamt-Nord probe whether this exists openly at statistische-Gebiete
   grain before declaring the gap final. No paid fallback regardless of outcome.
4. **Soziale-Erhaltungsverordnung in-force dates** — confirm the attribute exists per area.
5. **Two-grain social pillar reconciliation method** (Stadtteil-down-to-statistische-Gebiet
   join rule) is methodology-bearing — requires geo-DS + domain-expert sign-off when H1's social
   pillar models are built, per `CLAUDE.md` R-C1.

## References

- H0 research deliverable (full source list, confidence levels, per-pillar tables):
  `docs/epic-h/H1-hamburg-data-landscape.md`
- Sozialmonitoring (Transparenzportal, Karte Gesamtindex): <https://suche.transparenz.hamburg.de/dataset/sozialmonitoring-integrierte-stadtteilentwicklung-hamburg-karte-gesamtindex19>
- Sozialmonitoring Bericht 2025 (PDF, reconciliation tables): <https://www.hamburg.de/resource/blob/1125598/974229994b9526e1a86c59c838f97f3c/d-sozialmonitoring-bericht-2025-data.pdf>
- Statistische Gebiete in Hamburg (geometry): <https://suche.transparenz.hamburg.de/dataset/statistische-gebiete-in-hamburg12>
- Regionalstatistische Daten der Stadtteile Hamburgs: <https://suche.transparenz.hamburg.de/dataset/regionalstatistische-daten-der-stadtteile-hamburgs20>
- Hamburger Stadtteil-Profile (Statistikamt Nord XLSX): <https://www.statistik-nord.de/zahlen-fakten/regionalstatistik-datenbanken-und-karten/hamburger-stadtteil-profile-staedtestatistik-fuer-hamburg>
- Soziale Erhaltungsverordnungen — Gebiete in Hamburg: <https://suche.transparenz.hamburg.de/dataset/soziale-erhaltungsverordnungen-gebiete-in-hamburg14>
- Hamburger Mietenspiegel: <https://suche.transparenz.hamburg.de/dataset/hamburger-mietenspiegel31>
- ohsome API (HeiGIT, global OSM history): <https://docs.ohsome.org/ohsome-api/stable/boundaries.html>
- Datenlizenz Deutschland (dl-de): <https://www.govdata.de/dl-de/by-2-0>
