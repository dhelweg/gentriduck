# H3 Geo-Data-Scientist Sign-Off

- **Task:** H3 #237 — Publish Hamburg. Gating decision for part (a): widen the governed public
  mart `transform/models/marts/gentrification_index.sql` from Berlin-only to Berlin+Hamburg by
  flipping `var('published_cities')` to `["BER","HH"]` and widening the `schema.yml` contract
  (`city_code`, `area_level`) accordingly. This is the fresh dual sign-off the #125 maintainer
  comment (2026-07-07) requires for widening a published mart's `accepted_values` beyond `["BER"]`
  — distinct from the H1 pipeline-wiring PASS already on record (`docs/epic-h/H1-geo-signoff.md`).
- **Date:** 2026-07-11
- **Verdict: PASS WITH CONDITIONS**

Publishing Hamburg into `gentrification_index` is **methodologically clean at the mart's own
grain**, because the values this mart actually publishes (the `live_data` D1/D2 MSS-style
Status×Dynamik typology) are carried at Hamburg's **native statistisches-Gebiet resolution** — there
is no MAUP coarsening inside the published numbers themselves. The single MAUP cost H1 flagged
(uniform Stadtteil→Gebiet EWR inheritance) lives entirely in the socio-economic **D4/EWR** layer,
which this mart does **not** carry (`own_idx_class`/`own_idx_class_bi` are NULL for `live_data`; the
EWR composite lives in `fct_gentrification_change`, which correctly stays BER-only). I approve the
contract widening. The one condition that survives is a **publication-time disclosure** (scope c),
which — because #237 is the publish ticket — must land before Hamburg is exposed on the live site.

---

## Verification performed this review (not trusted from the summary)

1. **Crosswalk match-rate condition is durably satisfied, not a one-time measurement.**
   `transform/tests/test_hamburg_gebiet_stadtteil_crosswalk_match_rate.sql` is a **standing dbt data
   test**, re-run this session: `PASS` (1 of 1, `uv run poe test --select
   test_hamburg_gebiet_stadtteil_crosswalk_match_rate`). It returns a failing row whenever
   `match_rate < 0.98` over scored Gebiete, so it re-asserts H1 Condition 1 on **every** build — a
   regression in name normalization or a source refresh that drops matches will break the build, not
   pass silently. Denominator (scored Gebiete) and numerator (Gebiete resolving to a non-NULL EWR
   composite via the crosswalk) are correctly framed; below-threshold/unscored Gebiete are excluded
   as a legitimate coverage gap, not a match failure. H1 Condition 1: **CLOSED and durable.**

2. **Hamburg's published grain confirmed.** In `data/gentriduck.duckdb`, the `live_data` join
   (`int_gentrification_ts` × `dim_area`) yields Hamburg at `area_level = 'subarea_l2'` (943 Gebiete,
   11,020 rows across snapshot years) vs Berlin `plr` (3,414 rows) — consistent with the #125 trail.
   The published typology is at native Gebiet resolution; the ~9× Stadtteil→Gebiet coarsening is
   confined to the EWR layer, which is absent from this mart.

3. **Scope containment confirmed.** `fct_gentrification_change` and `fct_gentrification_trajectory`
   retain `accepted_values: ["BER"]` and their in-SQL `city_code='BER'` filters. That is correct and
   **must be preserved**: those marts carry Berlin-calibrated trajectory/transition thresholds and the
   EWR composite, neither of which is reviewed for Hamburg here. Only `gentrification_index` widens.

---

## Assessment against the three required points

### (1) Crosswalk-match-rate: durably satisfied
Yes — see Verification #1. It is enforced by a build-breaking standing test at the ≥98% bar
(re-confirmed 98.6% against real data per #125, PASS again this session), not a one-off log line.

### (2) Stadtteil-grain MAUP cost — disclosable, with exact substance for the G2 page
H1 Condition 3 required the caveat to survive **verbatim and specifically** into the public
methodology page. The live `web/pages/methodology.md` §6 currently has only a general bullet
("different observation windows… thinner (fewer indicators, coarser geography)"). That is **not
precise enough** to discharge Condition 3. Web-engineer (scope c) must make the following substance
explicit on the methodology page (exact numbers may be phrased for a lay reader, but all five points
must be present and unambiguous):

- **Different areal units → no direct area-to-area cross-city comparison.** Hamburg publishes at the
  **statistisches Gebiet** (~943 areas); Berlin at the **Planungsraum/PLR** (~1,333). These are not
  the same size or construction. A same-named typology stage in the two cities is **not** calibrated
  to an identical underlying threshold (MAUP / modifiable-areal-unit problem, Openshaw 1984).
- **Thinner socio-economic baseline — 3 indicators, not 5.** Hamburg's EWR-style composite uses only
  `age_under18_share`, `foreigners_share`, `unemployment_share`; Berlin uses five. The two cities'
  socio-economic composite **magnitudes are not comparable** and are deliberately kept in separate
  per-city columns — they must never be pooled into a naive shared z-score or regression coefficient.
- **Socio-economic layer is ~9× coarser than the published typology (change-of-support).** Hamburg's
  EWR-style composite is inherited **uniformly from the Stadtteil grain (~104 areas) down to Gebiet
  (~943)**. So while the published Status/Dynamik **typology** is at native Gebiet resolution, any
  socio-economic (EWR) reading for Hamburg is really only **Stadtteil-resolution** — its effective
  number of independent areas is ~104, not ~943 (Gotway & Young 2002). State this grain ceiling
  plainly: **the finest trustworthy grain for Hamburg socio-economic context is the Stadtteil.**
- **Different Dynamik observation window.** Hamburg Sozialmonitoring's Dynamik uses a different
  (shorter / annual-cadence) window than Berlin's biennial MSS; this reinforces that identically
  named stages are not identical thresholds across cities.
- **Single geometry vintage, no historical boundary crosswalk.** Hamburg is published on one
  `current` vintage only; there is no Hamburg equivalent of Berlin's 2021 LOR cross-vintage
  time-comparison handling yet, so within-city long-run boundary-consistent comparison is
  Berlin-only for now.

This is disclosable and honest; none of it undermines publishing the Gebiet-grain typology itself.

### (3) Residual objection to public widening now vs. later
**None that blocks the contract widening (part a).** The published mart carries no EWR/D4 term for
Hamburg, so the MAUP coarsening does not touch any number it exposes. Geo-DS Condition 2 (Stadtteil
SE clustering) is a **regression** concern with no trigger here — no Hamburg regression exists; it is
correctly split to standing ticket #129 and is not implicated by a descriptive typology mart. The
only residual is disclosure: because #237 flips the site to actually show Hamburg, the §6 language
above is a **publication-blocking** condition, not merely a "nice to have later."

---

## Conditions

- **C-H3.1 (does NOT block `develop`-integration of part (a); DOES block public exposure of Hamburg):**
  The five-point substance in (2) above must land in the live `web/pages/methodology.md` before
  Hamburg is visible on the published site. Since #237 is the publish ticket, verify this scope-(c)
  edit is present (and itself dual-signed if it restates governed methodology) before the weekly
  `develop → main` PR that would make Hamburg public. The contract-widening commit (schema part a)
  may integrate into `develop` ahead of it.
- **C-H3.2 (preserve, not new work):** Keep `fct_gentrification_change` and
  `fct_gentrification_trajectory` BER-only. Widening beyond `gentrification_index` needs its own
  sign-off (Berlin-calibrated thresholds + EWR MAUP layer are out of scope here).
- **C-H3.3 (coder note, not a methodology change):** The schema widening for part (a) must add
  `"HH"` to `city_code` `accepted_values` **and** `"subarea_l2"` to `area_level` `accepted_values`
  (Hamburg enters at `subarea_l2`, verified above); the `relationships` test to `dim_city` already
  covers `HH`. The `published_cities` var flip is the publication switch. None of this is an
  indicator/weight/normalization change.

## Notes for the record
- Cross-city non-pooling discipline (H1 §3) still holds: do not let any future ticket compute a naive
  Berlin+Hamburg pooled z-score or pooled coefficient on the socio-economic composite without
  re-deriving from a common indicator subset.
- Condition 2 (Stadtteil SE clustering) remains open in #129 and applies the moment a Hamburg
  E1/E2-equivalent regression is built.

**Verdict: PASS WITH CONDITIONS** (contract widening approved for `develop`; public exposure gated on
C-H3.1)
