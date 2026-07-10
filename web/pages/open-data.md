---
title: Open data — what it made possible, and what was hard
sidebar_position: 24
---

<!--
  NEW page (I6, #223 -- Epic I public communication & storytelling). Per the I6 SPEC
  (docs/epic-i/tickets/I6-open-data-experience-page.md): a factual experience report, not
  advocacy -- every friction claim below is traceable to a repo artifact (an ADR, an ingestion
  bug issue, or docs/epic-g/G3-attribution-licensing.md), and the recommendations are specific
  enough for a data publisher to act on. Sourced from ADR-0002 (OSM), ADR-0003 (Berlin
  geographies/price-rent), ADR-0006/0007 (MSS/SES), ADR-0014 (Hamburg), ADR-0016 (drift
  detection), ingestion/README.md, and the closed EWR/LOR/Wohnlage bug issues cited inline
  (#50, #57, #58, #134, #197, #212). Wired into the home audience router's "you care about open
  data" card (web/pages/index.md, I1/I3 placeholder -> real href, per that card's own comment).

  Not methodology-bearing (CLAUDE.md list): no indicator, weight, normalization, or spatial
  method is introduced or changed here -- this restates already-published sourcing/licence facts
  for a public audience, same category as /how-its-built (#153). The one sensitive passage is the
  IFG-adjacent closing paragraph, which is why this page carries a narrower, single-gate
  domain-expert framing check (not the full dual R-C1 gate) -- see
  docs/epic-i/I6-open-data-domain-signoff.md, Verdict: PASS, before merge into develop.
-->

<Hero
  compact
  eyebrow="Chapter 2 — The Revival"
  title="Open data — what it made possible, and what was hard"
  lede="This entire project runs on free, openly licensed data. That is itself a concrete argument for open data's value — and it also surfaced real, specific friction that better publishing practice would remove."
/>

<ChapterLabel>Chapter 2 — The Revival</ChapterLabel>

This page is a factual experience report from the inside of one project, not an advocacy piece:
what open data enabled here, exactly where it was hard to work with, and specific, actionable
recommendations for data publishers. If you want the pipeline itself, see [how it's
built](/how-its-built); if you want the licence terms, see [attribution &amp;
licensing](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-g/G3-attribution-licensing.md).

## What this site runs on

Every source below is free and openly licensed — no paid tool, no proprietary or internal data,
ever (see [attribution &amp;
licensing](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-g/G3-attribution-licensing.md)
for the full per-source table and exact attribution strings).

| Source | What it feeds | Licence |
|---|---|---|
| OpenStreetMap full history | Point-of-interest counts (commercial/amenity mix over time) | ODbL |
| Berlin EWR (population register) | Socio-economic time series (residence duration, age structure, transfer recipients) | CC BY 3.0 DE |
| Berlin MSS (Monitoring Soziale Stadtentwicklung) | The status/dynamism outcome the index is built from | `dl-de-zero-2.0` |
| Berlin LOR / Planungsraum geometries | The small-area boundaries everything is aggregated to | CC BY 3.0 DE |
| Bodenrichtwerte / Verkaufte Grundstücke / Mietspiegel / Wohnlagen | The price/rent dimension | `dl-de-zero-2.0` (geodata); Mietspiegel numeric values re-tabulated, PDF not redistributed |
| Hamburg equivalents (Sozialmonitoring, geometry, EWR-equivalent, Wohnlagen/Mietenspiegel) | The second-city onboarding (Epic H) | `dl-de/by-2.0` |

## What only worked *because* the data is open

- **The whole pipeline is rebuildable from scratch.** `uv run poe refresh` re-runs ingestion,
  `dbt build`, and the export in one command on a fresh checkout — no account, no paid API key,
  no internal dataset. That is only possible because every upstream source is either anonymous
  HTTP (WFS, CSV, GeoJSON) or, for the one exception (OSM full-history), gated by a free
  contributor login rather than a commercial one (see "What was hard" below).
- **The 2018 thesis re-check itself depends on it.** [The 2018 thesis, re-checked](/thesis-recheck)
  compares an eight-year-old academic analysis against a rebuilt pipeline on newer vintages of the
  *same open sources* — a re-check like that is only possible when the original inputs are public
  and re-fetchable, not locked in a one-off institutional dataset.
- **A second city onboarded without a model rewrite.** Hamburg (Epic H) proved the city-agnostic
  data model (ADR-0005) because Hamburg publishes an open equivalent of every Berlin pillar — a
  full OSM history (already global), a small-area social monitor, small-area demographics, and
  price/rent references — under `dl-de/by-2.0` rather than Berlin's mostly-zero-attribution
  family. Open, comparably-shaped data made that comparison possible at all.

## What was hard, concretely

Open does not mean easy. Every item below is a real issue this project hit, not a hypothetical:

- **Login-gated bulk history, even for permissively licensed data.** OSM's own public download
  server does not publish full-history `.osh.pbf` extracts — only Geofabrik's internal server
  does, and only to a logged-in OSM contributor account ([ADR-0002](https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0002-osm-poi-history-sourcing.md)).
  The *data* is ODbL-open; *getting* a full-history extract still required a personal account and
  a manual, one-off download step that a fresh, no-login checkout cannot reproduce unattended
  ([`ingestion/README.md`](https://github.com/dhelweg/gentriduck/blob/main/ingestion/README.md)).
- **CSV format drift with no changelog.** Berlin's EWR (population register) exports changed
  column layout across editions with no announced schema version: the 2015–2020 and 2024 editions
  broke the existing parser outright, and the same source's decimal-separator convention and
  suppressed-value encoding had already caused three separate bugs before that (German comma
  decimals and a missing foreigners column, #50; `fillna(0)` silently corrupting privacy-suppressed
  indicator shares, #57; suppressed `residents_total` stored as `0.0` instead of a proper missing
  value, #58). Each fix needed a human to notice the drift; nothing upstream flagged it.
- **Dataset discovery moves without redirecting.** The CKAN catalogue entries for the 2021–2023 EWR
  editions returned HTTP 404 by the time this project tried to fetch them (#197) — the dataset
  exists, but its catalogue slug had moved with no forwarding link.
- **Boundary reforms with no official crosswalk.** Berlin's 2021 Planungsraum (LOR) boundary
  reform is not accompanied by an official old→new area crosswalk; this project had to build an
  areal-weighted pre2021→2021 correspondence itself to keep the time series continuous (#51, #63),
  and a routine filename-scheme change on the same source silently broke downstream parsing until
  caught ([#134](https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0016-ingested-data-drift-detection.md)).
- **Undocumented categorical semantics.** Berlin's Wohnlage (residential-quality) classification
  publishes an `ohne` ("none") tier alongside its `einfach`/`mittel`/`gut` scale with no codebook
  note on how it should be treated in an average — left un-normalized, it silently dilutes a
  denominator (#212).
- **Numeric tables trapped in PDF.** The Mietspiegel (rent index) is published as a formatted PDF
  table with no machine-readable open-data licence attached, so this project re-tabulates the
  numeric values by hand rather than redistributing the document itself (ADR-0003 §G-E) — a
  standard open-data format (CSV/XLSX with a clear licence) would remove that whole step.
- **WFS-only, ad hoc-named endpoints.** Several price/rent geodata layers (Bodenrichtwerte,
  Verkaufte Grundstücke) are only available as OGC WFS services whose per-year endpoint names had
  to be discovered by guessing a naming convention before the correct one was confirmed
  (ADR-0003 §G-D) — there was no dataset catalogue page listing the actual endpoint.

## What would make it easy — a standardization wishlist

Concrete, specific asks a data publisher could act on directly:

1. **Version and changelog CSV/API schemas.** A one-line "columns changed in the 2024 edition"
   note would have turned three separate bug-hunts (#50, #57, #58, and the 2015-2020/2024 parse
   failures behind #197) into a single documented migration.
2. **Redirect or alias moved catalogue entries** instead of letting old CKAN slugs 404 — a
   dataset's identity should outlive its URL.
3. **Publish boundary-change crosswalks alongside the boundary reform itself**, not leave
   downstream users to reconstruct an areal-weighted correspondence from two independent
   geometries.
4. **Document categorical/suppressed-value semantics explicitly** — what does an "ohne" tier mean
   in an aggregate, what does a suppressed count look like in the file (blank, `NULL`, a sentinel
   value, never a bare `0`)?
5. **No login gate on bulk historical extracts of already-open data.** If the data itself is
   freely licensed, a full-history download should not require a personal contributor account —
   a public, anonymous bulk-download tier (as most day-to-day OSM access already has) removes the
   one manual, unrepeatable step in this entire pipeline.
6. **Prefer a stable, documented data format (CSV/XLSX/API) over a formatted PDF** for anything
   that is fundamentally a numeric table, so it can be reused directly rather than re-tabulated by
   hand.

## What this means for the open-data debate

This project is a small, concrete data point in the ongoing public debate about open-government
data (including the Informationsfreiheitsgesetz and its scope): every result on this site,
including an independent re-check of an eight-year-old academic thesis, was built entirely from
data that German public bodies already publish under free licences, at zero cost, without any
special access request. At the same time, the friction catalogued above — format drift, moved
catalogue entries, undocumented codebooks, one login-gated source — was real engineering cost that
better publishing practice, not more openness in principle, would remove. This page states what
the project observed; it draws no further conclusion about legislation or policy.

## Honest caveats

- **This is one project's experience with two German cities' open-data landscapes**, not a
  systematic audit of open government data generally — the friction catalogued above is real but
  not necessarily representative of every dataset or every publisher.
- **"Hard" here means engineering friction, not that the licences were wrong.** Every source above
  is genuinely free and open; the complaints are about format, discoverability, and documentation,
  not about access being restricted or paid.
- Some of the friction items (#50, #57, #58, #134, #212) are historical — already fixed in this
  pipeline — and are cited here as evidence of the *kind* of problem open data with weak
  publishing practice creates, not as an ongoing defect in this project's output.

## Where next

- **[How it's built](/how-its-built)** — the pipeline these sources feed, end to end.
- **[Attribution &amp; licensing](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-g/G3-attribution-licensing.md)** — every source, its exact licence, and the attribution string it requires.
- **[Methodology &amp; data sources](/methodology)** — what the resulting statistics claim, and
  where they should not be trusted too far.
- **[GitHub repository](https://github.com/dhelweg/gentriduck)** — every ingestion script and ADR
  referenced above, in full.

---

<FooterNav />
