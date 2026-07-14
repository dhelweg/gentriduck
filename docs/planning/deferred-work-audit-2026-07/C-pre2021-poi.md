# [C-pre2021-poi] Extend OSM POI ingestion to pre-2021 vintages

- **Issue:** [#257](https://github.com/dhelweg/gentriduck/issues/257)
- **Tier:** 1 · **Epic:** c · **Labels:** `epic-c,data,dbt`
- **Filed:** 2026-07-14, from the deferred-work audit ([index](./README.md))

---

**Why:** Multiple methodology efforts are blocked on a single missing input: the longitudinal OSM POI series only extends back to the lor_2021 era. The full 7-edition (2008–2024) trajectory panel intended by the project plan, a true same-anchor faithful-vs-improved OA ablation, and an EWR–OA bridge all require POI snapshots at the pre-2021 PLR vintage. This is currently deferred "in a comment, tracked by no issue" across several sign-offs.

**Goal:** Extend OSM POI history ingestion (per ADR-0002) to cover the pre-2021 snapshot years, spatially assigned to the **pre-2021 PLR vintage** (448 PLRs), so downstream longitudinal/OA/EWR work can consume a continuous pre-2021 → 2021 series without a boundary discontinuity.

**Scope:**
- Ingest the agreed pre-2021 snapshot years via the ADR-0002 source; write to `data/raw/berlin/osm/…` alongside the existing vintages.
- Spatially assign pre-2021 snapshots to `lor_2019`/pre-2021 PLR geometry (`ST_Within`), mirroring the dual-vintage join already used at the 2021 boundary (avoids the count discontinuity).
- Extend `fct_poi_development` / the intermediate POI models to carry the pre-2021 rows with correct `area_vintage`.
- Apply the C5 completeness-bias correction to the extended range (re-fit is methodology-bearing where it changes the correction; flag for the gate if so).

**Acceptance:**
- Pre-2021 POI snapshots land and `fct_poi_development` is populated across the extended range with correct `area_vintage`.
- `uv run poe build` green; no regression to the existing lor_2021 series (spot-check counts unchanged for 2021+).
- Completeness-correction behaviour on the extended range documented.

**Gate:** DE pair → reviewer. If the C5 correction is re-fit for the extended range, geo-DS (+ domain) dual gate applies (methodology-bearing).

**Deps:** ADR-0002 (source), the C3 dual-vintage join precedent. **Enables:** the 7-edition trajectory panel and the true OA ablation (both filed separately, depend on this).

**Source (why this is unfiled work):** `docs/methodology/R-A8-geo-signoff.md` (full 7-edition panel "deferred until the POI pipeline is extended to pre-2021 years"); `docs/epic-e/C1-three-way-comparison-findings.md` ("a true same-anchor ablation needs the improved-variant … pipeline extended to `lor_pre2021`/2018 — tracked, not scheduled"); `docs/assessment/2026-06-19-pm-architect-review.md`.
