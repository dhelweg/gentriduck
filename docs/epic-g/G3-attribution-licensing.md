# Gentriduck — Attribution & Licensing Wall (G3, #39)

**Status:** Content draft — compiled from already-approved source ADRs, no new source introduced
**Audience:** the public site visitor / any downstream reuser of the published data
**Depends on / synthesizes:** ADR-0002 (OSM POI history sourcing), ADR-0003 (Berlin geographies +
open price/rent sources), ADR-0006 (Berlin MSS), ADR-0007 (Berlin SES indicators), ADR-0010
(spatial-analysis libraries), ADR-0014 (Hamburg data sources)
**Grounding (R-C2):** every licence/attribution claim below is copied verbatim from the ADR that
recorded it at ingestion time; this page introduces **no new source and no new licence
determination** — it is a public roll-up of decisions already made and cited inline.

This is the **content** deliverable for G3's attribution/licensing half. It will be rendered as the
site's "Data sources & licences" page once the serving stack (F1, #33) is chosen; until then it lives
here as the governed source-of-truth text, and doubles as the licence manifest for the O4 (#83)
dataset-export acceptance criterion ("published with licence + attribution").

---

## 1. Why this page exists

Gentriduck is built entirely from **free, openly licensed data** (CLAUDE.md golden rule 1) — no
paid tool, no proprietary or internal source, ever. Several of those open licences make attribution a
**legal requirement**, not just good practice, and one (OSM's ODbL) makes it a condition of reuse for
any derived product. This page is the single place that lists every source, its licence, and the
exact attribution string we display — so a site visitor (or anyone reusing the published dataset,
per O4 #83) can see, at a glance, what they may do with the numbers and who to credit.

## 2. Licence families in play

| Family | Attribution required? | Used by |
|---|---|---|
| **ODbL** (Open Database Licence) | Yes — mandatory on any derived/published product | OpenStreetMap POI history (all cities) |
| **Datenlizenz Deutschland – Zero – 2.0** (`dl-de-zero-2.0`) | No (public-domain-equivalent), but we credit anyway for transparency | Most Berlin Senate sources: LOR admin geometries (passthrough), Bodenrichtwerte, Wohnlagen, Verkaufte Grundstücke, MSS indizes, SES indicators |
| **Creative Commons BY 3.0 DE** (CC BY 3.0 DE) | Yes | Berlin LOR 2021 base geometry, Berlin EWR (population register) |
| **Datenlizenz Deutschland – Namensnennung 2.0** (`dl-de/by-2.0`) | Yes — Hamburg's default family (unlike Berlin's mostly-zero family) | All Hamburg sources: geometry, Sozialmonitoring, EWR-equivalent, displacement/preservation zones, Wohnlagen/Mietenspiegel |
| **Creative Commons BY 4.0** | Yes | IBB Wohnungsmarktbericht (2024+ editions only) |
| Software (not data) licences: Apache-2.0, BSD-3, LGPL-2.1, BSL-1.0 | Per-package terms, no data-attribution obligation | `ohsome-py`, PySAL, tooling libraries — listed for completeness, not a site-visitor concern |

## 3. Source-by-source attribution table

### OpenStreetMap (both cities)
- **Licence:** ODbL — <https://www.openstreetmap.org/copyright>
- **Attribution:** "© OpenStreetMap contributors"
- **What we derive:** commercial/amenity point-of-interest history (Epic C), via HeiGIT's ohsome
  API and/or Geofabrik `.osh.pbf` extracts (ADR-0002).

### Berlin — administrative geometry (LOR)
- **Licence:** CC BY 3.0 DE
- **Attribution:** "Amt für Statistik Berlin-Brandenburg / Lebensweltlich orientierte Räume (LOR)
  (01.01.2021)"
- **Source:** GDI Berlin WFS (ADR-0003 §G-A)

### Berlin — population register (EWR)
- **Licence:** CC BY 3.0 DE
- **Attribution:** "Amt für Statistik Berlin-Brandenburg"
- **Source:** ADR-0003 Decision 7

### Berlin — MSS (Monitoring Soziale Stadtentwicklung, social-status/dynamik outcome)
- **Licence:** `dl-de-zero-2.0` (no attribution legally required; credited anyway)
- **Attribution:** "Senatsverwaltung für Stadtentwicklung, Bauen und Wohnen Berlin — Monitoring
  Soziale Stadtentwicklung `<edition>`"
- **Source:** ADR-0006 Decision 7; the 2013 edition specifically comes from the Senate's own Excel
  table (`1-sdi_mss2013.xlsx`), same licence.

### Berlin — SES indicators (feeding the MSS outcome)
- **Licence:** `dl-de-zero-2.0`
- **Attribution:** "Senatsverwaltung für Stadtentwicklung, Bauen und Wohnen Berlin — Monitoring
  Soziale Stadtentwicklung `<edition>`" (same source/attribution as MSS; ADR-0007 §6)

### Berlin — Bodenrichtwerte (standard land values) & Verkaufte Grundstücke (transactions)
- **Licence:** `dl-de-zero-2.0` (no attribution legally required; credited anyway)
- **Attribution:** "Senatsverwaltung für Stadtentwicklung, Bauen und Wohnen Berlin /
  Gutachterausschuss" (Bodenrichtwerte); "Gutachterausschuss für Grundstückswerte in Berlin"
  (Verkaufte Grundstücke / Kauffälle)
- **Source:** ADR-0003 §G-D, §G-F

### Berlin — Wohnlagen (residential-quality classification) & Mietspiegel (rent index)
- **Licence:** Wohnlagen geodata is `dl-de-zero-2.0` (free reuse, attribution optional). The
  Mietspiegeltabelle PDF carries no explicit machine-readable open-data licence — we re-tabulate the
  numeric rent matrix ourselves into a governed seed (treating it as **factual data**, not a
  copyrighted redistribution of the PDF) and cite the source; we do **not** redistribute the PDF
  itself (ADR-0003 §G-E, Amendment / Open Q2 note).
- **Attribution:** "Senatsverwaltung für Stadtentwicklung, Bauen und Wohnen Berlin"

### Berlin — IBB Wohnungsmarktbericht
- **Licence:** CC BY 4.0 for 2024+ editions; older editions are cited as reference only and not
  redistributed pending a case-by-case licence check (ADR-0003 §G-C, Open Q2).
- **Attribution:** "Investitionsbank Berlin (IBB) — Wohnungsmarktbericht `<year>`"

### Hamburg — all pillars (geometry, Sozialmonitoring, EWR-equivalent, displacement/preservation
zones, Wohnlagen/Mietenspiegel)
- **Licence:** `dl-de/by-2.0` (Datenlizenz Deutschland – Namensnennung 2.0) — **attribution
  required**, unlike Berlin's largely zero-attribution family (ADR-0014 §"Licence family").
- **Attribution (per pillar, exact strings from ADR-0014):**
  - Geometry: "Freie und Hansestadt Hamburg, Landesbetrieb Geoinformation und Vermessung"
  - Sozialmonitoring: "Freie und Hansestadt Hamburg, Behörde für Stadtentwicklung und Wohnen"
  - EWR-equivalent (Transparenzportal / Statistikamt Nord): "Statistisches Amt für Hamburg und
    Schleswig-Holstein"
  - Displacement/preservation zones and Wohnlagen/Mietenspiegel: `dl-de/by-2.0` family; exact
    per-dataset attribution string confirmed at ingestion time (ADR-0014 §"open item").

## 4. What this means for reuse (site visitors and downstream users)

- **You may** copy, redistribute, and build on any statistic shown on this site or exported from the
  published dataset (O4 #83), including for commercial use, **provided you carry the attribution
  strings above** for the sources that require it (everything except the `dl-de-zero-2.0` items,
  which we still credit voluntarily).
- **OSM-derived figures specifically inherit ODbL's share-alike condition**: if you publish a
  derivative dataset that includes our OSM-derived POI counts, that derivative must itself be ODbL
  (or a compatible licence) and carry the "© OpenStreetMap contributors" credit.
- **We do not redistribute source PDFs** we don't have an explicit machine-readable licence for
  (Mietspiegeltabelle, pre-2024 Wohnungsmarktbericht editions) — only the numeric values we
  re-tabulate ourselves, cited back to the original document.
- Gentriduck's own governed marts, models, and documentation are original work; this page does not
  currently assert a separate licence for that layer (a future site-wide licence choice, e.g.
  CC BY 4.0 for our own text/marts, is an open item for F1/G1 site wiring — not settled here to avoid
  scope creep into hosting decisions still pending maintainer sign-off on #33).

## 5. Software / tooling attribution (informational, not a data-licence obligation)

Listed for completeness — none of these carry a data-attribution requirement for site visitors, but
are credited here per open-source courtesy: `ohsome-py` (Apache-2.0, HeiGIT), `osmium-tool`
(BSL-1.0), `quackosm` (Apache-2.0), PySAL (BSD-3-Clause), `shapely` (BSD-3-Clause).

---

**Publishing this content onto the live site is tracked in G1/F1 (#37/#33); this document is the
governed source-of-truth text until then**, per the same precedent as G2's methodology page (#38).
