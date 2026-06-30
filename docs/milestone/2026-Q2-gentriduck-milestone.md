# Gentriduck Milestone: Berlin Gentrification Patterns 2021-2025

**Date:** 2026-Q2 (June 2026)
**Status:** First analytical pass complete; index and trajectory maps produced.

---

## What is Gentriduck?

Gentriduck revives a 2018 Hamburg master thesis — "Measurement of Gentrification in Berlin via Big Data Analytics" — on a modern, free, open-source, local-first stack (dbt + DuckDB + Python). The goal is to check whether the thesis's directional findings hold with current data, extend the analysis longitudinally, and eventually publish a public statistics website covering Berlin's neighbourhood-level social development, with other cities to follow.

---

## What we built

- A dbt + DuckDB warehouse ingesting Berlin Monitoring Soziale Stadt (MSS) data (2021, 2023, 2025 editions) and OpenStreetMap POI snapshots.
- Staging, intermediate, and mart models covering MSS social status (D1), commercial dynamism (D2/D3), and a combined gentrification typology.
- A trajectory mart (`fct_gentrification_trajectory`) classifying all 536 inhabited Planungsraume (PLRs, Berlin's smallest planning unit, mean population 2,000-5,000) across three MSS editions.
- A D1 x D2 typology stage model and an exploratory lead-lag intermediate (`int_mss_lead_lag`).
- Two choropleth maps (SVG + HTML): D1 social status at MSS 2025 and trajectory dominant stage for 2021-2025.
- Reproducible analysis scripts (`analysis/e3_narratives.py`, `analysis/e3_maps.py`) driven by `uv run poe analysis`.

---

## Key findings (Berlin, 2021-2025)

**Source: E3-findings.md (2026-06-29); MSS 2021, 2023, 2025.**

### Trajectory distribution across 536 PLRs

| Trajectory type | PLRs | Share |
|---|---|---|
| Stable-established | 389 | 72.6% |
| Improving | 57 | 10.6% |
| Persistently-deprived | 46 | 8.6% |
| Declining | 44 | 8.2% |

The dominance of "stable-established" (73%) is expected: three biennial snapshots covering four years cannot detect gradual structural change. The 2018 thesis found that only a minority of PLRs show measurable gentrification pressure within any 4-6 year window (Thesis §2.4).

### Strongest social upgrading signal

The five PLRs with the largest D1 improvement (2021-2025) are all in the inner-city ring: Huttenkiez, Lubecker Strasse, and Leopoldplatz in Wedding/Mitte (Bezirk 01, which the 2018 thesis flagged as an emerging-pressure district); Sparrplatz (Sprengelkiez) in the same district; and Schillerpromenade Sud in Neukölln. All showed a two- or one-step D1 improvement (scale: 1 = Hoch/best, 4 = Sehr niedrig/worst).

Sparrplatz/Sprengelkiez is a designated Soziales Erhaltungsgebiet (Milieuschutz, approx. 51 ha) under Berlin Senate protection — the Senate has independently identified upgrading pressure there, which independently corroborates the model's ranking.

**Important caveat.** "Improving" D1 status is not unambiguous evidence of gentrification. A rising area-level status score may reflect new higher-income residents displacing existing ones, incumbent income mobility, or infrastructure investment without displacement. Individual-level attribution is not possible from aggregate PLR data (ecological inference limit, G-2 guardrail).

### Outer-district decline counter-pattern

Three of the five most-declining PLRs are in Marzahn-Hellersdorf (Bezirk 10/11). These are post-socialist Plattenbau (prefabricated panel) housing estates. Their worsening reflects a filtering-down dynamic in outer Grosssiedlungen — a divergence dynamic, not the reverse of gentrification on the same process axis.

### Gentrification remains geographically concentrated

Active-gentrification stage counts were stable across editions: 36 PLRs in 2021, 33 in 2023, 35 in 2025 (approximately 6-7% per edition). This is consistent with the 2018 thesis finding of "island" rather than "wave" gentrification in Berlin (Thesis §3.5).

---

## Methodology and honest limitations

The index measures neighbourhood social composition (D1 MSS status index) and commercial amenity succession (D3 OSM-derived dynamism score). It does not yet incorporate housing-market variables.

**Short time window.** Three MSS editions (2021-2025) are available for the current LOR 2021 boundary. The 2018 thesis used four editions spanning 2013-2019. Decade-scale gentrification arcs cannot be captured yet.

**Missing housing-market dimension.** No rent or land-value data are wired into the index. Gentrification almost by definition involves rent increases (Smith's rent-gap). Mietspiegel (biennial, address-block-level contract rents) and Bodenrichtwert (land value) data are staged and will be incorporated as dimension D5 in a later phase.

**Ecological inference.** All analysis is at PLR level. The index identifies areas where aggregate social composition is changing; it cannot identify who is being displaced or who is arriving.

**Ordinal scale.** D1 and D2 are ordinal indices. Arithmetic comparisons and regression as continuous variables would be inappropriate; all results are directional indicators only.

**Methodology review.** The analysis was reviewed by an independent geo-data-scientist and a gentrification domain expert; both issued PASS WITH CONDITIONS verdicts. All blocking conditions were discharged before this document was produced (E3-geo-signoff.md; E3-domain-signoff.md; commit 4c7ff8c).

---

## Maps

- `data/analysis/e3_map_index.svg` / `.html` — D1 MSS social status by PLR (MSS 2025). Blue = high status (1 = Hoch); red = most deprived (4 = Sehr niedrig).
- `data/analysis/e3_map_trajectory.svg` / `.html` — R-A8 trajectory dominant stage by PLR (2021-2025). Red = active-gentrification; blue = stable-established; amber = pre-gentrification.

Maps are browser-ready SVG and HTML. Source attributions are embedded in each file.

---

## Data sources and attribution

| Source | Use | Licence |
|---|---|---|
| Berlin Monitoring Soziale Stadt (MSS) 2021, 2023, 2025 — Senate Dept. for Urban Development | D1 social status; D2 dynamism; PLR population | Berlin Open Data (dl-de/by-2-0); attribution required |
| OpenStreetMap contributors | D3 commercial POI data | Open Database Licence (ODbL); attribution required; derived data also ODbL |
| Geoportal Berlin / GDI Berlin — LOR 2021 geometries | PLR boundary geometry | CC BY 3.0 DE; attribution required |

OpenStreetMap data: (c) OpenStreetMap contributors, available under the Open Database Licence. See https://www.openstreetmap.org/copyright.

---

## Reproducibility

After data ingestion (`ingestion/`), the full pipeline runs with:

```bash
uv run poe build    # dbt models
uv run poe analysis # analysis scripts + maps
```

All tools and data sources are free and open. The warehouse is a local DuckDB file; no cloud account is required. Repository: [github.com/dhelweg/gentriduck](https://github.com/dhelweg/gentriduck).

---

## Next steps

- **D5 rent/price dimension:** wire in Mietspiegel and Bodenrichtwert to add the housing-market mechanism the index currently lacks.
- **EWR 2021 ingestion:** complete the Einwohnerregister 2021-boundary pipeline to enable covariate-controlled analyses.
- **H3b temporal test:** test the thesis's confirmed finding (social status leads commercial succession) with a correctly specified lead-lag design.
- **Public website (Epic G):** publish index, time-series, and maps as a free public statistics site — Berlin first, city-agnostic by design.
- **Multi-city expansion:** extend to additional cities via the `dim_city`/`dim_area` schema already in place.
