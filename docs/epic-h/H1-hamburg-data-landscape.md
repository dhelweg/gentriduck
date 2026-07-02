# H1 — Hamburg data-landscape research (issue #124, prerequisite for #40 [H1] onboarding)

- **Status:** Research deliverable (documentation only — no code, no dbt models, no methodology gate)
- **Author:** gentrification-domain-expert
- **Date:** 2026-06-30
- **Issue:** [#124](https://github.com/dhelweg/gentriduck/issues/124) · feeds [#40 [H1]] second-city onboarding
- **Scope note:** This file is *not* on the CLAUDE.md methodology-bearing path list. It is a research
  scan to de-risk H1 implementation. The actual adapter design (a new data source per city) **will**
  require ADR(s) and the maintainer's OK before the data-engineer ingests anything (CLAUDE.md golden
  rules #1 and #2).

---

## Executive summary

**Hamburg is a strong, arguably best-case second city.** All five of Berlin's data pillars have a
genuine, open, machine-readable Hamburg equivalent, almost all funnelled through one portal
(`transparenz.hamburg.de`, the Transparenzportal) and one statistics office (Statistikamt Nord).
There is **no pillar without an open equivalent** — so unlike a worst-case city, Hamburg does **not**
force us into a proxy or a "drop a dimension" decision.

The single most important finding for methodology fidelity: **Hamburg's Sozialmonitoring Integrierte
Stadtteilentwicklung is a near-perfect analogue of Berlin's MSS** — same conceptual design
(Status-Index + Dynamik-Index per small area, computed from a small set of social "attention"
indicators), same publishing body type (the Stadtentwicklung authority), and on a comparable fine
grain (941 statistische Gebiete vs Berlin's 542 PLR). It is in fact **better** for Gentriduck's
longitudinal core in one respect: Hamburg publishes it **annually since 2010**, where Berlin's MSS is
**biennial**. This means the lead-lag hypothesis (POI dynamism leads social-status change — the 2018
thesis core finding) can be tested at finer temporal resolution in Hamburg than in Berlin.

**Coverage gap vs Berlin — minor and well-bounded:**

1. **Licence shift, not a blocker.** Hamburg's open data is overwhelmingly
   **Datenlizenz Deutschland — Namensnennung 2.0 (`dl-de/by-2.0`)**, i.e. attribution *required*.
   Berlin's MSS/EWR were largely **`dl-de/zero-2.0`** (no attribution required). Both are free + open
   per golden rule #1 — `dl-de/by-2.0` is a standard open licence — but it means **attribution is
   mandatory** for every Hamburg layer on the G3 attribution wall. This is a documentation obligation,
   not an adoption blocker, and does **not** need an ADR to *use* (it is already an accepted open
   licence family). It does need to be recorded per-source.
2. **EWR-equivalent granularity asymmetry.** Berlin's EWR gives rich per-PLR socio-demographics
   (age bands, migration background, foreigners share, residence duration) at the *finest* grain.
   Hamburg's richest socio-demographic profile set (Statistikamt Nord "Stadtteil-Profile",
   ~70 indicators) is published at **Stadtteil** level (~104–105), one level *coarser* than the 941
   statistische Gebiete that the Sozialmonitoring sits on. The fine-grain (statistische Gebiete)
   socio-demographics that *do* exist openly are a **narrower** set (the Sozialmonitoring's own
   attention-indicators + the "Regionalstatistische Daten" release). So Hamburg's two social pillars
   live at **two different grains** and the H1 implementer must pick the modelling grain deliberately
   (see Pillar 3 + Recommended approach). This is the one genuine design decision, not a gap in
   availability.
3. **Spatial-unit reform analogue.** Berlin had the pre-2021 → LOR-2021 PLR reform (447 → 542),
   handled by a vintage tag + crosswalk (ADR-0003/0006). Hamburg's statistische Gebiete have also
   been re-cut over time (the "943 as of April 2016" figure vs "941" in current editions), so the
   same dual-vintage discipline applies — expect a boundary-vintage caveat, not a surprise.

**Bottom line for the maintainer/architect:** Hamburg is viable for a faithful reproduction of the
full Gentriduck methodology on open data. Recommend proceeding to #40 [H1]. The one decision that
should be surfaced in the H1 ticket before the data-engineer starts is the **social-data modelling
grain** (statistische Gebiete vs Stadtteil) and how the two social pillars reconcile across it.

---

## Per-pillar findings

Confidence levels: **High** = dataset page + licence + access mechanism directly confirmed;
**Medium** = existence and shape confirmed, exact field/format detail to be verified by the DE at
ingestion; **Low** = inferred, needs hands-on probe.

### Pillar 1 — OSM POI (ohsome temporal history)

| Attribute | Finding |
|---|---|
| **What exists** | The public **ohsome API** (`https://api.ohsome.org/v1`, HeiGIT) is **global by design** — it serves aggregates and feature extraction over the *full OSM planet history*. Hamburg is covered identically to Berlin; there is nothing city-specific to procure. |
| **Granularity** | Arbitrary — bounding box, polygon, or GeoJSON FeatureCollection. We pass Hamburg's statistische-Gebiete / Stadtteil polygons (Pillar 4) exactly as we pass Berlin's PLR polygons. |
| **Time coverage** | Full OSM history (≈2007→present), same as Berlin. |
| **Licence** | OSM data = **ODbL** with attribution (already handled project-wide; ADR-0002, PROJECT_PLAN §licensing). ohsome API service itself is free, no key. |
| **Access** | Pure HTTP (cross-platform) — the **identical ingestion path already built for Berlin** in Epic C (ADR-0002). |
| **Confidence** | **High.** This pillar is essentially free for any city; ohsome's whole premise is global OSM-history aggregation. |

**Domain note:** the OSM completeness-bias control (C5) and tag-drift harmonization (C2) developed
for Berlin apply unchanged — but the *magnitude* of completeness growth differs per city/per mapper
community, so the C5 normalization must be **re-fit for Hamburg**, not copied numerically. This is a
methodology-bearing step when it lands (it will go through the geo-DS + domain gate at that point).

### Pillar 2 — MSS-equivalent: Sozialmonitoring Integrierte Stadtteilentwicklung

| Attribute | Finding |
|---|---|
| **What exists** | **Sozialmonitoring Integrierte Stadtteilentwicklung Hamburg** — the Behörde für Stadtentwicklung und Wohnen's (BSW) official small-area social monitor. Conceptually a direct analogue of Berlin's MSS: a **Statusindex** (current social situation) and a **Dynamikindex** (recent direction of change) per small area, combined into a **Gesamtindex**. |
| **Index design** | Built from **seven "attention" indicators**: children/youth with migration background, children of single parents, share of SGB-II recipients, unemployed persons, children in minimum-security (Mindestsicherung), minimum-security in old age, and school-graduation (Schulabschluss). Status classes (4) + Dynamik classes (3, *positiv/stabil/negativ*) — structurally the same shape as Berlin's MSS Status (4) × Dynamik (3). |
| **Granularity** | **941 statistische Gebiete** (avg ~2,200 residents); only those with >300 residents are scored (currently 857). Comparable to Berlin's 542 PLR — actually finer. |
| **Time coverage** | **Annual since 2010** (pilot report 2010, then continuous to 2025). This is *better* than Berlin's biennial MSS for longitudinal/lead-lag work. |
| **Licence** | **`dl-de/by-2.0`** (Datenlizenz Deutschland Namensnennung 2.0) — open, **attribution required**: "Freie und Hansestadt Hamburg, Behörde für Stadtentwicklung und Wohnen". |
| **Access** | Transparenzportal dataset(s) ("…Karte Gesamtindex"): **WFS (GML), WMS, OGC API-Features, plus CSV (~115 MB) and GeoJSON (~224 MB) bulk download**. Pure HTTP, no login. Annual reports (PDF) carry the class-distribution tables for reconciliation, exactly as the Berlin MSS reports do. |
| **Confidence** | **High** on existence/grain/licence/access; **Medium** on the exact per-year CSV schema (column names for status/dynamik class, the area key) — the DE must inspect the CSV/WFS schema at ingestion. |

**Domain note (theory fidelity):** the Sozialmonitoring is, like the MSS, the **outcome / ground-truth**
variable — *not* a predictor. It must occupy the same role in the Hamburg pipeline that MSS occupies in
Berlin's (ADR-0006 consequence: "treat as Berlin's validation/grounding source, not a mandatory global
model input"). The same care applies: do **not** let POI dynamism leak into the social-status outcome.
One subtlety to flag for the methodology gate when H1 lands: the Hamburg Dynamikindex is a **3-year**
change window; Berlin's MSS Dynamik is a **2-year** window. The *direction-of-change* semantics are the
same, but cross-city comparisons of the Dynamik magnitude must respect the different windows.

### Pillar 3 — EWR-equivalent: per-area socio-economic register data (Statistikamt Nord)

This is the pillar with the real design nuance. There are **two** open Hamburg products, at **two grains**:

**(a) Stadtteil-Profile (Statistikamt Nord)** — the *rich* one, *coarse* grain.

| Attribute | Finding |
|---|---|
| **What exists** | "Hamburger Stadtteil-Profile" — ~70 characteristics/indicators per area: population & households, population movements, social structure, housing, infrastructure/traffic. Includes the EWR-style fields we care about: **age, sex, marital status, nationality, migration background, origin regions, household type**. |
| **Granularity** | **~104–105 Stadtteile** (plus 7 Bezirke and Hamburg total). One level **coarser** than the 941 statistische Gebiete. |
| **Time coverage** | Annual; back-data **2013–2024/2025** available (XLSX series). |
| **Format** | **XLSX** + **PDF** + interactive map; also Statistikamt Nord's "Meine Region" online DB. Primary distribution is Statistikamt Nord's own site (XLSX), *not* a clean Transparenzportal WFS. |
| **Licence** | Statistikamt Nord open data is `dl-de/by-2.0` family (attribution to Statistisches Amt für Hamburg und Schleswig-Holstein). Confirm per-file at ingestion. |
| **Confidence** | **High** on existence/variables/grain; **Medium** on machine-readability ergonomics (XLSX parsing, sheet layout drift across years — same class of problem as Berlin's EWR Matrix CSV German-decimal / column-rename bugs, #50/#57/#58). |

**(b) Regionalstatistische Daten der Stadtteile Hamburgs (Transparenzportal)** — *open & geo-joined*, Stadtteil grain.

| Attribute | Finding |
|---|---|
| **What exists** | "Regionalstatistische Daten der Stadtteile Hamburgs" — Bevölkerungs- und Sozialdaten + indicators, **geo-referenced**, on the Transparenzportal (there is a sibling "…der Bezirke Hamburgs" release). The clean, WFS/CSV/GeoJSON-delivered counterpart to (a). |
| **Granularity** | **Stadtteil** (104–105). |
| **Time coverage** | **2013 onward**; current version 2025. |
| **Format** | **CSV (zip), GeoJSON (zip), GML, OGC API-Features, WFS**. This is the machine-friendly path. |
| **Licence** | **`dl-de/by-2.0`** (attribution: Statistisches Amt für Hamburg und Schleswig-Holstein). |
| **Confidence** | **High** on existence/format/licence; **Medium** on exactly which EWR-style fields are in the open release vs only in the richer Stadtteil-Profile XLSX. |

**(c) Fine-grain (statistische Gebiete) socio-demographics** — *narrower* variable set.

At the **statistische-Gebiete** grain, the openly published socio-demographics are essentially the
**Sozialmonitoring attention-indicators** themselves (plus population by age/sex releases). The full
EWR-style breadth (residence duration, detailed migration breakdown, age bands) is published at
**Stadtteil**, not per statistische Gebiet, in the open channels found. **Residence duration
("Wohndauer") specifically was not located as an open per-area field for Hamburg** — this is the
closest thing to a true variable gap and needs a hands-on probe (Low confidence it exists openly at
fine grain).

**Why this matters for theory fidelity:** Berlin's EWR indicators (DAU5/DAU10 = share moved-in within
5/10 years, residence duration, foreigners share, age bands) are *predictor-side* socio-demographic
signals in the thesis, distinct from the MSS *outcome*. If Hamburg's fine-grain socio-demographics are
thinner, the Hamburg index may have **fewer EWR-style predictors** at statistische-Gebiete grain — the
H1 implementer must decide whether to (i) model the social pillars at **Stadtteil** grain to keep the
rich EWR-style set, accepting coarser spatial resolution, or (ii) model at **statistische Gebiete**
grain to match the Sozialmonitoring's resolution, accepting a thinner EWR-style predictor set, or
(iii) carry both grains via the `dim_area` hierarchy (statistische Gebiete = subarea, Stadtteil =
district) and join EWR-style fields down/up as appropriate. **(iii) is the city-agnostic-correct
answer** and what ADR-0005's `dim_area` self-referential hierarchy was built for.

### Pillar 4 — Spatial unit (LOR/PLR equivalent)

| Attribute | Finding |
|---|---|
| **What exists** | Two candidate levels, both with open geometry: **statistische Gebiete** (the fine grain, ≈941; the Sozialmonitoring base) and **Stadtteile** (≈104–105; the Stadtteil-Profile base), under **Bezirke** (7). |
| **Recommended PLR-analogue** | **statistische Gebiete** is the closest analogue to Berlin's PLR (finest scored social-monitoring unit, ~2,200 residents/area like PLR). **Stadtteil ≈ Berlin BZR-ish district level**; **Bezirk ≈ Berlin Bezirk.** This maps cleanly onto `dim_area` (city > Bezirk > Stadtteil > statistische Gebiete). |
| **Area count** | statistische Gebiete: **~941** (943 as of April 2016 — note the re-cut, see vintage caveat). Stadtteile: **~104–105**. Bezirke: **7**. |
| **Time coverage / vintages** | Geometry has been re-cut over time (943 → 941); treat like Berlin's LOR reform — a **vintage tag** on the area + a crosswalk for any cross-vintage time series. |
| **Format** | **WFS (GML), WMS, OGC API-Features, GeoJSON, GML download** via Transparenzportal. (GeoPackage/shapefile not advertised, but GeoJSON/GML are sufficient and cross-platform — same as Berlin.) |
| **Licence** | **`dl-de/by-2.0`** (attribution: Freie und Hansestadt Hamburg / Landesbetrieb Geoinformation und Vermessung). |
| **CRS** | Hamburg geodata default to **EPSG:25832** (UTM 32N) — note: Berlin uses **EPSG:25833** (UTM 33N). Transform to WGS84 for the ohsome join, exactly as Berlin does. **This is a per-city CRS parameter, a good test of the ADR-0005 seam.** |
| **Confidence** | **High** on existence/licence/access/levels; **Medium** on the exact stable WFS feature-type name and the current vintage count (the DE must probe GetCapabilities at ingestion). |

### Pillar 5 — Displacement / Milieuschutz equivalent + Mietspiegel

**5a — Soziale Erhaltungsverordnungen (Milieuschutz analogue):**

| Attribute | Finding |
|---|---|
| **What exists** | "Soziale Erhaltungsverordnungen — Gebiete in Hamburg" — Hamburg's displacement-protection zones (the §172 BauGB *soziale Erhaltungssatzung* instrument, same legal basis as Berlin's Milieuschutz/Soziale Erhaltungsgebiete). ~17 designated areas across Mitte, Altona, Eimsbüttel, Wandsbek, Nord (e.g. St. Pauli, St. Georg, Ottensen, Schanzenviertel, Barmbek). |
| **Granularity** | Polygon per designated area (with effectiveness review every 5 years incl. the Umwandlungsverordnung). |
| **Format** | **WFS (GML), GeoJSON, OGC API-Features** via Transparenzportal; also on data.europa.eu / INSPIRE geoportal. |
| **Licence** | `dl-de/by-2.0` family (confirm on the dataset page at ingestion). |
| **Confidence** | **High** on existence/access; **Medium** on per-area designation *dates* (needed for any DiD / event-study à la deferred R-A10 #80) — verify the attribute carries the in-force date. |

**5b — Hamburger Mietenspiegel (Mietspiegel analogue):**

| Attribute | Finding |
|---|---|
| **What exists** | **Hamburger Mietenspiegel** — biennial since 1976 (current 2025/2027 cycle; 2025 median €9.94/m², ≈568,500 dwellings). Plus the **Wohnlagenverzeichnis** (housing-location directory — the address→Wohnlage crosswalk, analogous to Berlin's Mietspiegel Wohnlagen/street index that D1c parses). |
| **Granularity** | Mietenspiegel table = rent matrix by dwelling type/size/age/location category; Wohnlagenverzeichnis assigns **Wohnlage** (normal/good) per address/street — *not* a per-statistische-Gebiet rent surface out-of-the-box (same as Berlin: needs an address→area crosswalk, cf. D1c #56). |
| **Format** | Transparenzportal lists **GML, CSV, GeoJSON, OAF, XML** for the Mietenspiegel dataset; PDF brochure for the human-readable table. |
| **Licence** | **`dl-de/by-2.0`** (attribution required). Note one related item — the "Vertrag Hamburger Mietenspiegel 2025/2027" — is a *contract* document, not the data; the data dataset itself is the open one. |
| **Confidence** | **Medium-High.** Existence, biennial cadence, formats and licence confirmed; the exact machine-readable rent-table structure and how cleanly the Wohnlagenverzeichnis geocodes need hands-on verification (mirrors Berlin D1/D1c effort). |

---

## Recommended approach for the data-engineer (#40 [H1])

This is the adapter pattern ADR-0005 promised. Suggested order, lowest-risk first:

1. **Geometry first (Pillar 4).** Build `ingestion/hamburg/geo/` to pull statistische Gebiete +
   Stadtteile + Bezirke from the Transparenzportal WFS (GeoJSON/GML), write to
   `data/raw/hamburg/geo/*.parquet`. Map onto `dim_area`: `city='hamburg'` →
   Bezirk (`district`) → Stadtteil → statistische Gebiete (the finest `subarea`). **Set the Hamburg
   `dim_city` CRS to EPSG:25832** (vs Berlin's 25833) — this is the first real exercise of the
   per-city CRS parameter; transform to WGS84 for the ohsome join. Carry a `vintage` tag (943 vs 941).
2. **OSM POI (Pillar 1).** Re-use the Epic-C ohsome ingestion *unchanged* except for the new
   polygons. Re-fit (do **not** copy) the C5 completeness-bias normalization for Hamburg's mapper
   community. The C2 tag harmonization is reusable as-is.
3. **Sozialmonitoring outcome (Pillar 2).** Build `ingestion/hamburg/sozialmonitoring/` analogous to
   `ingestion/berlin/mss/`. Prefer the **WFS/CSV** delivery; persist per-year Parquet under
   `data/raw/hamburg/sozialmonitoring/`. Stage to `stg_hamburg_sozialmonitoring` (one row per
   `(edition_year, gebiet_id)` → Status class, Dynamik class, Gesamtindex). **Reconcile** ingested
   class counts against the annual report PDF's class-distribution table (same hard correctness gate
   ADR-0006 uses for Berlin). Treat strictly as the **outcome/ground-truth**, never a predictor.
4. **Socio-economic predictors (Pillar 3).** Ingest the **Transparenzportal "Regionalstatistische
   Daten der Stadtteile"** (CSV/GeoJSON, open, geo-joined) as the primary EWR-equivalent; fall back to
   Statistikamt Nord **Stadtteil-Profile XLSX** for any richer fields not in the open release. Expect
   the same data-quality traps Berlin's EWR hit (German decimals, suppressed-cell sentinels,
   year-over-year column renames — #50/#57/#58) and budget for them. **Decide the grain explicitly**
   (see the decision point below).
5. **Displacement + rent (Pillar 5).** Soziale Erhaltungsverordnungen polygons (WFS/GeoJSON) → a
   displacement layer analogous to Berlin's Milieuschutz (R-B1 #70). Mietenspiegel + Wohnlagenverzeichnis
   → rent dimension analogous to D1/D1c — budget for the address→area crosswalk effort.

**City-agnostic discipline (golden rule #4 / ADR-0005):** every Hamburg quirk (EPSG:25832, statistische
Gebiete, attention-indicator set, dl-de/by attribution string) stays in `ingestion/hamburg/…` and the
`stg_hamburg_*` staging layer. The shared `int_*`/marts models must keep consuming generic
`dim_area`/`dim_city` — if H1 forces a change to a shared/core model, that is a signal the seam is
leaking and should be escalated to the architect (and would itself become methodology-bearing).

**Attribution (golden rule #1 follow-through):** because Hamburg is `dl-de/by-2.0` (attribution
*required*, unlike Berlin's largely zero-licence MSS), every Hamburg source needs a row in the G3
attribution wall / source-attribution table. Record the exact attribution strings per dataset at
ingestion.

---

## Biggest open questions / risks → maintainer or architect decisions

1. **[DECISION — surface in #40] Social-data modelling grain.** Hamburg's outcome (Sozialmonitoring,
   941 statistische Gebiete) and its rich EWR-style predictors (Stadtteil-Profile, ~104 Stadtteile)
   live at **different grains**, and residence-duration / detailed-age predictors may not exist openly
   at the fine grain. Choose: (a) model social pillars at Stadtteil (rich predictors, coarse), (b) at
   statistische Gebiete (matches outcome resolution, thinner predictors), or (c) **both via `dim_area`
   hierarchy** (recommended; what ADR-0005 was designed for). This shapes every downstream model and
   should be agreed *before* the DE starts. Likely a short methodology note co-signed by geo-DS +
   domain expert, since it affects indicator selection and spatial method.

2. **[CONFIRM — low-risk] Open fine-grain residence-duration / migration-detail availability.** The one
   plausible *variable* gap: Hamburg "Wohndauer" and detailed age/migration bands were not located as
   open per-statistische-Gebiet fields. If they truly don't exist openly at fine grain, the Hamburg
   index either drops those EWR-style predictors at fine grain or sources them at Stadtteil. Needs a
   hands-on Transparenzportal/Statistikamt-Nord probe by the DE. **No paid fallback** — if it's not
   open, it's out (golden rule #1); document the gap rather than buying data.

3. **[ADR likely needed] Per-city source ADR for Hamburg.** Each new source still needs the architect's
   sign-off (golden rules #1/#2). Recommend a single **ADR-00xx "Hamburg data sources"** mirroring
   ADR-0003 (geographies + EWR-equivalent + rent) and ADR-0006 (Sozialmonitoring ≈ MSS), recording:
   the `dl-de/by-2.0` attribution obligation, EPSG:25832, the statistische-Gebiete vintage caveat, and
   the WFS endpoints/feature-types once probed. The *licences themselves are pre-approved* (open family),
   but the **sources** still go through the tool/source gate. This is process, not a blocker.

4. **[METHODOLOGY — for the gate when H1 lands] Cross-city comparability caveats.** Three known
   non-equivalences to document on the methodology page (G2) so Hamburg/Berlin are not naively compared
   number-for-number: (i) Sozialmonitoring Dynamik = **3-year** window vs MSS Dynamik = **2-year**;
   (ii) the **attention-indicator sets differ** (Hamburg's 7 vs Berlin's 3–4 MSS index indicators —
   the derived Status/Dynamik classes are comparable *in spirit*, not in inputs); (iii) C5
   completeness-bias normalization is **re-fit per city**, so absolute POI-growth numbers are not
   cross-city comparable. These are caveats to surface, not problems to "fix".

5. **[LOW risk] WFS endpoint/feature-type stability + CSV schema.** Several exact strings (WFS
   feature-type names, per-year CSV column names, Sozialmonitoring area key, Soziale-Erhaltungs in-force
   dates) are "Medium confidence" — confirmable only by hitting GetCapabilities and inspecting a file.
   Standard ingestion-time verification; not a strategic risk.

**No pillar requires a proxy and no source is paid/closed.** Every Hamburg equivalent found is free and
openly licensed (`dl-de/by-2.0` or OSM ODbL). The only golden-rule-#1 flag is the **attribution
obligation** that `dl-de/by-2.0` adds vs Berlin's zero-licence MSS — handled by recording attribution
per source, not by avoiding the source.

---

## Sources

- Sozialmonitoring (Transparenzportal, Karte Gesamtindex): <https://suche.transparenz.hamburg.de/dataset/sozialmonitoring-integrierte-stadtteilentwicklung-hamburg-karte-gesamtindex19>
- Sozialmonitoring (GovData): <https://www.govdata.de/suche/daten/sozialmonitoring-integrierte-stadtteilentwicklung-hamburg-karte-gesamtindex>
- Sozialmonitoring (MetaVer, edition history): <https://metaver.de/trefferanzeige?docuuid=92BCB98D-47E1-4FC6-858E-7DF6DE9C1FD8>
- Sozialmonitoring Bericht 2025 (PDF, reconciliation tables): <https://www.hamburg.de/resource/blob/1125598/974229994b9526e1a86c59c838f97f3c/d-sozialmonitoring-bericht-2025-data.pdf>
- Statistische Gebiete in Hamburg (geometry, Transparenzportal): <https://suche.transparenz.hamburg.de/dataset/statistische-gebiete-in-hamburg12>
- Regionalstatistische Daten der Stadtteile Hamburgs (open EWR-equivalent): <https://suche.transparenz.hamburg.de/dataset/regionalstatistische-daten-der-stadtteile-hamburgs20>
- Regionalstatistische Daten der Bezirke Hamburgs: <https://suche.transparenz.hamburg.de/dataset/regionalstatistische-daten-der-bezirke-hamburgs-und-hamburg-insgesamt20>
- Hamburger Stadtteil-Profile (Statistikamt Nord, rich socio-demographics XLSX): <https://www.statistik-nord.de/zahlen-fakten/regionalstatistik-datenbanken-und-karten/hamburger-stadtteil-profile-staedtestatistik-fuer-hamburg>
- Hamburger Melderegister (Statistikamt Nord): <https://www.statistik-nord.de/zahlen-fakten/hamburger-melderegister>
- Soziale Erhaltungsverordnungen — Gebiete in Hamburg (Transparenzportal): <https://suche.transparenz.hamburg.de/dataset/soziale-erhaltungsverordnungen-gebiete-in-hamburg14>
- Soziale Erhaltungsverordnungen (BSW overview): <https://www.hamburg.de/politik-und-verwaltung/behoerden/behoerde-fuer-stadtentwicklung-und-wohnen/themen/stadtentwicklung/soziale-erhaltungsverordnungen>
- Hamburger Mietenspiegel (Transparenzportal): <https://suche.transparenz.hamburg.de/dataset/hamburger-mietenspiegel31>
- Hamburger Mietenspiegel 2025 (PDF): <https://www.hamburg.de/resource/blob/1125234/4c27733314ff7c3144a31415cea3924c/d-mietenspiegel-broschuere-2025-data.pdf>
- ohsome API (HeiGIT, global OSM history): <https://docs.ohsome.org/ohsome-api/stable/boundaries.html>
- Transparenzportal Hamburg open data / licence framework: <https://transparenz.hamburg.de/open-data-796518>
- Datenlizenz Deutschland (dl-de): <https://www.govdata.de/dl-de/by-2-0>
