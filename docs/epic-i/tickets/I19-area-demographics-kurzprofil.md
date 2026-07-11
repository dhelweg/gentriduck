[I19] Area demographics & context statistics — Kurzprofil parity (Einwohner, age, structure)

## Why (problem)
Maintainer feedback (2026-07-11): the area pages describe *gentrification evidence* but not the
basic "who lives here" a reader expects first. Berlin's official small-area profiles — the
berlin.de Sozialraum region pages (e.g. Friedrichshain-Kreuzberg / Boxhagener Platz) and the BZR
*Kurzprofil* PDFs (e.g. `kurzprofil_rathaus_yorckstrasse_mit_kid_2017.pdf`) — lead with
Einwohner, age structure, and population composition/dynamics. **The data is already in house:**
`seed_ewr_indicator_meta` catalogues `residents_total`, sex shares, five age-band shares,
`mean_age_years`, `foreigners_share`, `migration_background_share`, and residence-duration shares
per PLR per year — today they only feed the socio-economic composite and are never surfaced
descriptively. Other per-area data we hold (MSS status/Dynamik, Wohnlage, BRW land values,
Mietspiegel, Milieuschutz/displacement flags) is likewise shown only partially.

## Goal
Every area page (all I18 levels) opens with a compact, honest "People & structure" block —
population trend, age structure, residence dynamics — plus the other relevant data we already
hold for that area at that level, on the model of the official Kurzprofile.

## Scope & approach
- **Data — display mart:** a `mart_area_demographics` (name per DE conventions) exposing the EWR
  descriptive indicator time series per PLR **separately from the index inputs** (no change to
  `int_ewr_socioeco` or any weight/normalization — this mart is display-only). DE/EN labels and
  unit metadata joined from `seed_ewr_indicator_meta` (read-only use; the seed itself is on the
  R-C1 gate list and is **not modified** here).
- **Data — rollups to I18 levels:** BZR/PGR/Bezirk values via **sum of raw counts, shares
  recomputed from summed numerators** (never averaging shares); suppressed-value handling
  (cf. #57/#58) propagated, not silently zeroed. Rollup rule gets the same geo-DS check as I18's.
- **Web — "People & structure" block:** on the I14 profile template for every level: Einwohner
  trend line, age-band structure (with district + citywide comparison, per I14's
  context-everywhere rule), residence-duration/dynamics. Explicit vintage label on every figure
  (see #197: EWR refresh for 2015-2020/2021-2024 editions is currently broken upstream — surface
  what exists with its vintage; do **not** block on #197).
- **Web — other-data inventory:** data-analyst audits what else we hold per area/level (MSS
  status + Dynamik, Wohnlage `int_berlin_wohnlage_plr`, BRW, Mietspiegel seed, Milieuschutz/
  displacement flags, POI density) and decides per level what earns a place on the page —
  inventory + decisions committed as `docs/epic-i/I19-area-data-inventory.md`. Editorial
  principle (shared with I20): **detail where it matters, no undifferentiated stat spam.**
- **Framing (hard requirement):** publishing `foreigners_share` / `migration_background_share`
  at small-area grain carries real stigmatization/misuse risk. The domain expert gates *whether*
  and *how* these specific indicators appear (contextualization, no rank-by-migration-share
  affordances, wording patterns) — the same class of gate as I14's portrait wording.

## Acceptance criteria
- Demographics mart built + tested (`uv run poe build` green); reconciliation spot-check of one
  BZR rollup against hand-summed PLR values committed.
- "People & structure" renders at every level with district/citywide context and vintage labels;
  sparse/suppressed areas degrade gracefully; clean Evidence build.
- Inventory doc committed; every displayed statistic traces to a repo model/seed.
- Domain sign-off on composition-indicator framing (`I19-domain-signoff.md`, Verdict: PASS) and
  geo-DS note on the rollup rule recorded **before integration into `develop`**.

## Gate / sign-off
Domain-expert framing gate (enforced, as above) + geo-DS rollup check. DE pair for the mart,
web pair for pages. Not index-methodology-bearing (no weight/normalization/seed change), but the
framing gate is treated as R-C1-equivalent because it is small-area statements about people.

## Dependencies / relations
After I18 (level pages exist — PLR-grain block can land first if I18 lags) and I14 (#231,
template). Soft-depends #197 (vintage coverage). Feeds I5 takeaways links and I20's shared
curation principle. Hamburg parity via the city-agnostic mart once H3 (#237) lands.

## References
- Maintainer feedback 2026-07-11, incl. the two berlin.de format models (Sozialraum region page +
  Kurzprofil PDF) · `transform/seeds/seed_ewr_indicator_meta.csv` · `int_ewr_socioeco.sql`
- `docs/epic-i/tickets/I14-plr-deepdive-profile.md` (template + gate precedent) · #197 (EWR drift)
