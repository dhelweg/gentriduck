# E3 Findings: Analytical Narratives, Maps, and Over-Time Comparisons

**Produced by:** `analysis/e3_narratives.py`, `analysis/e3_maps.py`
**Data vintage:** MSS 2021, 2023, 2025 (lor_2021 LOR boundary)
**Date:** 2026-06-29

---

## Summary

This document records the key findings from the first full analytical pass over the
Gentriduck gentrification index (2021-2025), covering trajectory patterns across
Berlin's 536 inhabited PLRs (Planungsräume), time-series trends in the D1×D2 MSS
typology, and a preliminary test of the MSS commercial lead-lag hypothesis.

---

## 1. Trajectory patterns (2021-2025)

The R-A8 longitudinal trajectory model classifies all 536 inhabited lor_2021-vintage PLRs
into four trajectory types based on their D1 status_index arc across three MSS editions
(2021, 2023, 2025):

| Trajectory type | PLRs | Share |
|---|---|---|
| stable-established | 389 | 72.6% |
| improving | 57 | 10.6% |
| persistently-deprived | 46 | 8.6% |
| declining | 44 | 8.2% |

The overwhelming dominance of "stable-established" (73%) reflects the short observation
window: three biennial MSS snapshots (4 years total) are insufficient to detect gradual
structural change. This is expected and consistent with the 2018 thesis finding that only
a minority of Berlin PLRs show measurable gentrification pressure within any 4-6 year
window (Thesis §2.4).

### Confidence note

All trajectories are classified as "high" confidence (one PLR as "medium"). This reflects
the mechanical nature of the R-A8 model rather than a meaningful uncertainty gradient --
with only 3 data points, the confidence measure is based solely on internal consistency
of the trajectory direction, not on sample size or effect size.

---

## 2. PLRs with the strongest social upgrading signal (top-5)

PLRs ranked by D1 status_index improvement 2021→2025 (negative delta = D1 ordinal fell =
social upgrading; D1 polarity: 1=hoch/best, 4=sehr_niedrig/worst). The `improving`
trajectory label means measured social composition has moved toward higher-status categories;
it does **not** unambiguously confirm gentrification — the change may also reflect incumbent
income mobility, completed displacement, or infrastructure investment
(index-definition.md §3.5; G-2 guardrail):

| PLR | Area name | Status 2021 | Status 2025 | Delta | Dominant stage |
|---|---|---|---|---|---|
| 01200517 | Huttenkiez | 4 | 2 | -2 | active-gentrification |
| 01200625 | Lubecker Strasse | 4 | 2 | -2 | active-gentrification |
| 01401048 | Leopoldplatz | 4 | 2 | -2 | stable-established |
| 01401047 | Sparrplatz | 3 | 2 | -1 | active-gentrification |
| 08100103 | Schillerpromenade Sud | 3 | 2 | -1 | active-gentrification |

The top two PLRs (Huttenkiez and Lübecker Straße) are in Wedding/Mitte (Bezirk 01),
a district flagged in the 2018 thesis as an area of emerging gentrification pressure.
Leopoldplatz is in the same district. Sparrplatz (Sprengelkiez) and Schillerpromenade
Süd (Neukölln/Britz border) complete the top five — all in the inner-city ring.

**Policy note:** Sparrplatz/Sprengelkiez is a **designated Soziales Erhaltungsgebiet
(Milieuschutz, ~51 ha)** under Berlin Senate protection — the Senate has formally
identified upgrading pressure there, which independently corroborates the model's
ranking. This reframes the top-5 as *policy confirmation*, not speculative targeting
(index-definition.md §1.8; ethical-misuse guard).

A two-step improvement in D1 status (4 to 2) within four years is a strong signal, though
the ordinal scale means the gap between steps is not necessarily uniform. Cross-validation
against rent price data would be needed to confirm residential displacement.

**Caveat (ecological inference):** D1 is a PLR-level aggregate. An improving status
score may reflect new higher-income residents displacing existing ones, or simply
infrastructure investment without displacement. Individual-level attribution is not
possible from this data (G-2 guardrail; index-definition.md §1.2).

---

## 3. Most declining and persistently deprived PLRs (bottom-5)

Areas with the most severe status worsening (positive delta = social decline):

| PLR | Area name | Status 2021 | Status 2025 | Delta | Vulnerable |
|---|---|---|---|---|---|
| 10100104 | Golliner Strasse | 2 | 4 | +2 | yes |
| 10100101 | Marzahn West | 2 | 4 | +2 | yes |
| 11100205 | Wartenberg Sud | 2 | 4 | +2 | yes |
| 05300840 | Nonnendammallee | 2 | 4 | +2 | no |
| 10100103 | Wittenberger Strasse | 2 | 3 | +1 | no |

Three of the five are in Marzahn-Hellersdorf (Bezirk 10/11) — a district not identified
as a gentrification hotspot but showing clear social deterioration over the period.
Nonnendammallee is in Spandau. These findings point to a divergence dynamic: while inner
districts improve, some outer eastern districts are declining.

**Note on the Marzahn-Hellersdorf decline:** The worsening D1 scores here reflect
**filtering-down in post-socialist Plattenbau estates**, not the reverse of gentrification
on a shared axis. These are large-panel housing areas (Großsiedlungen) where social
sorting produces a distinct dynamic — suburban decline — rather than de-gentrification.
The R-A8 model and index-definition.md §1.5 (tension cells) treat `declining` in these
areas as the counter-pole to the invasion-succession cycle, not as a point on the same
trajectory.

---

## 4. D1 x D2 typology stage trends over time

Per-year count of inhabited PLRs by D1×D2 typology stage:

| Year | n | Stable-estab. | Pre-gent. | Active-gent. | Pioneer | Consolidation | Improving-vuln. |
|---|---|---|---|---|---|---|---|
| 2021 | 536 | 370 | 118 | 36 | 8 | 1 | 3 |
| 2023 | 536 | 367 | 96 | 33 | 15 | 3 | 22 |
| 2025 | 535 | 351 | 118 | 35 | 7 | 9 | 15 |

The mean D1 status_index (treated directionally, not as a metric) fell slightly from
2.129 in 2021 to 2.107 in 2025, suggesting a marginal city-wide social status improvement.
However this is an ordinal mean and should not be over-interpreted.

The number of PLRs in "improving-vulnerable" (D1 high deprivation + D2 improving
dynamism) spiked to 22 in 2023 before falling back to 15 in 2025. This may reflect
a temporary uptick in commercial activity in vulnerable areas post-COVID rather than
structural improvement.

Active-gentrification counts remain fairly stable at 33-36 PLRs per edition (~6-7% of
inhabited PLRs), suggesting a structurally persistent but geographically concentrated
gentrification dynamic -- consistent with the 2018 thesis finding of "island" rather
than "wave" gentrification in Berlin (Thesis §3.5).

---

## 5. Exploratory: does Δcommercial dynamism at t associate with social upgrading at t+k?

This section presents an **exploratory descriptive cross-tab only** — it makes no
hypothesis claim. The `int_mss_lead_lag` model allows a directional check in the
amenity→status direction (H3a in the thesis framework). The **thesis rejected H3a**
(Thesis p. 91: "H3a: no significant lead of amenity on status"); the thesis's confirmed
temporal finding is **H3b (status leads amenity)**, the opposite direction. This
cross-tab asks whether a *rising* Δcommercial dynamism at t (predictor: `delta_dynamism_t`)
associates with social *upgrading* (D1 `improved`, i.e. status_index falling) at t+k —
the gentrification-relevant outcome direction (index-definition.md §2.1–§2.2).

At lag_k=1, PLRs ranked by Δdynamism quartile, `improved` transition rate:

| Δdynamism quartile | Improved rate (social upgrading at t+1) | n |
|---|---|---|
| Q1 (lowest Δdynamism) | 4.5% (6/134) | 134 |
| Q2 | 5.2% (7/134) | 134 |
| Q3 | 6.6% (9/134) | 134 |
| Q4 (highest Δdynamism) | 3.0% (4/133) | 133 |

**Q4 improved rate (3.0%) is lower than Q1 (4.5%) — no H3a signal in this window.**
This is consistent with the thesis's rejection of H3a.

Important caveats (all binding — do not interpret this cross-tab inferentially):

- `delta_dynamism_t` is NULL for the first MSS edition (no prior edition), leaving only
  2 usable lag pairs for lor_2021. Statistical power is minimal.
- The D4 EWR socioeconomic covariate (`ewr_composite_t`) is NULL for all lor_2021 rows —
  the cross-tab cannot control for baseline vulnerability.
- All improved rates are low (90%+ of PLRs are stable per edition regardless of dynamism).
- This is an orientation check for a **thesis-rejected hypothesis** (H3a). Do not
  present it as validation of any gentrification lead-lag.

**Conclusion:** No H3a signal detected in the lor_2021 2021–2025 window — consistent
with the thesis finding. The H3b direction (status leads amenity) would require a
differently structured analysis (swap predictor/outcome) and is deferred to Epic D/G2.

---

## 6. Maps

Two choropleth maps were produced:

- `data/analysis/e3_map_index.svg` / `.html`: D1 MSS social status index by PLR at MSS 2025.
  Blue = high status (1=Hoch), red = most deprived (4=Sehr niedrig).
- `data/analysis/e3_map_trajectory.svg` / `.html`: R-A8 trajectory dominant_stage by PLR (2021-2025).
  Red = active-gentrification; blue = stable-established; amber = pre-gentrification.

Maps are produced as SVG + HTML (browser-ready). The `.png` stub files note that
matplotlib is not in `pyproject.toml`; adding it requires ADR-0001 approval. The SVG
files are geometrically correct (WGS84, reprojected from EPSG:25833 via geopandas).

Source attributions are embedded in each SVG:
- LOR geometry: Geoportal Berlin / GDI Berlin, CC BY 3.0 DE
- POI data: OpenStreetMap contributors, ODbL

---

## 7. Limitations and honest caveats

**Short time window.** Only 3 MSS editions (2021-2025) are available for the lor_2021
LOR boundary. The 2018 thesis used pre-2021 LOR boundaries across 2013-2019 (4 editions).
The R-A8 trajectory model cannot yet capture decade-scale gentrification arcs.

**H3a (rejected) lead-lag note.** The exploratory §5 cross-tab tests the amenity→status
direction (H3a), which the 2018 thesis rejected. No H3a signal is detected in the
lor_2021 2021–2025 window, consistent with that rejection. The thesis's confirmed
temporal finding (H3b: status leads amenity) is not directly testable in the current
`int_mss_lead_lag` structure; it is deferred to Epic D/G2 analysis.

**Price and rent data gap.** The index contains no housing price or rent variables —
the Mietspiegel and Bodenrichtwert data are staged but not yet wired into the index mart.
This is the most significant missing dimension: gentrification almost by definition
involves rent increases, and without it the index measures social composition (D1) and
commercial succession (D3) but not the housing-market mechanism (Smith's rent-gap, absent
until D5 per ADR-0008 §0.4). Note the gap has two distinct layers: the Mietspiegel is
biennial and available at the address-block level (contract rents), while the
Bodenrichtwert measures land value rather than rent — both are deferred D5 inputs with
different spatial and temporal resolutions.

**Ecological inference.** All findings are at the PLR level (mean population ~2,000-5,000).
The index cannot identify which residents are being displaced or who the incoming
population is. It identifies areas at risk, not individuals (G-2 guardrail).

**EWR covariate gap.** The D4 EWR socioeconomic composite is NULL for lor_2021 vintage
rows in the lead-lag table, preventing covariate-controlled analysis. This will be
resolved when the EWR 2021+ ingestion pipeline is complete.

**Ordinal misuse risk.** The D1 status_index and D2 dynamik_index are ordinal scales.
Means and standard deviations reported here are directional orientation aids only; they
should not be used for arithmetic comparisons or regression as continuous variables
(R-A3 C2; index-definition.md §3).

---

## 8. Methodology references

- R-A8 longitudinal trajectory model: `fct_gentrification_trajectory`; see `docs/epic-a/R-A8-geo-signoff.md`
- D1×D2 MSS typology: ADR-0008; `index-definition.md §1.5`
- Lead-lag design: `int_mss_lead_lag`; Thesis §4.3 (commercial succession precedes residential displacement)
- G-2 guardrail (ecological inference): `index-definition.md §1.2`
- LOR 2021 boundary: ADR-0003; `ingestion/berlin/lor/ingest_lor_geometries.py`
