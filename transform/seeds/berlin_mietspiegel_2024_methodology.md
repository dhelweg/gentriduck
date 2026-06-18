# Berlin Mietspiegel 2024 Seed — Methodology and Population Guide

## Source

**Berliner Mietspiegel 2024**
Publisher: Senatsverwaltung fuer Stadtentwicklung, Bauen und Wohnen Berlin
URL: https://mietspiegel.berlin.de/berliner-mietspiegel/archiv/
Licence: Not openly licensed for automated redistribution (PDF publication only).
This seed must NOT include or reproduce the PDF itself — see ADR-0003 item 11.

## Current status

The `berlin_mietspiegel_2024.csv` seed is currently a **header-only stub** (zero data rows).
The Berliner Mietspiegel 2024 is published as a PDF table and is not available via a
machine-readable API or open data portal endpoint. Values must be manually transcribed.

## How to populate

1. Download the Berliner Mietspiegel 2024 PDF from:
   https://mietspiegel.berlin.de/berliner-mietspiegel/archiv/

2. Locate the main rent table (Mietspiegeltabelle). It is structured as a
   matrix: rows = (year_built_bucket, size_bucket, ausstattung),
   columns = wohnlage (einfach / mittel / gut), cells = rent range (low/mid/high EUR/m2).

3. For each cell, add one row to `berlin_mietspiegel_2024.csv` with:
   - `vintage`: integer, always 2024
   - `year_built_bucket`: construction year bucket (see below)
   - `size_bucket`: apartment size bucket (see below)
   - `ausstattung`: equipment level (see below)
   - `wohnlage`: location quality (einfach / mittel / gut)
   - `rent_low`: lower bound of the rent range in EUR/m2 netto-kalt
   - `rent_mid`: midpoint / reference value in EUR/m2 netto-kalt
   - `rent_high`: upper bound of the rent range in EUR/m2 netto-kalt
   - `source`: always "Berliner Mietspiegel 2024, Senatsverwaltung fuer Stadtentwicklung, Bauen und Wohnen Berlin"

## Column definitions

### year_built_bucket
Construction year of the building. Accepted values (match PDF table rows):
- `bis_1918`      — built up to and including 1918
- `1919_1949`     — built 1919–1949
- `1950_1964`     — built 1950–1964
- `1965_1972`     — built 1965–1972
- `1973_1990`     — built 1973–1990
- `1991_2002`     — built 1991–2002
- `ab_2003`       — built from 2003 onwards

### size_bucket
Floor area of the apartment. Accepted values:
- `unter_40`      — under 40 m2
- `40_59`         — 40–59 m2
- `60_89`         — 60–89 m2
- `90_und_mehr`   — 90 m2 and above

### ausstattung
Equipment / fitting level of the apartment. Accepted values:
- `einfach`       — simple fittings
- `mittel`        — medium fittings
- `gehoben`       — high-end fittings

### wohnlage
Location quality tier. Accepted values:
- `einfach`       — simple location
- `mittel`        — medium location
- `gut`           — good location

### rent_low / rent_mid / rent_high
Net cold rent (Nettokaltmiete) in EUR per m2 per month.
The Mietspiegel table gives a range; transcribe:
- `rent_low`  = lower bound of the range
- `rent_mid`  = midpoint / Mittelwert stated in the table
- `rent_high` = upper bound of the range

## Licence and redistribution note

The Berliner Mietspiegel is published by the Senatsverwaltung fuer Stadtentwicklung,
Bauen und Wohnen Berlin. The PDF is available for download but is NOT licensed under
an open data licence that permits automated redistribution of its contents.

Per ADR-0003 item 11, this repository must NOT:
- Commit the PDF itself
- Reproduce the full table in a form that substitutes for the official publication

The seed contains only the numeric values transcribed for the purpose of the
gentrification index calculation (Epic D). Any use of these values should cite the
official source above.
